import { interpolate, Easing } from 'remotion';

export interface BarToLinePoint {
  x: number;
  barHeight: number;
  barWidth: number;
  lineY: number;
  barOpacity: number;
}

export interface ChartBarToLineResult {
  points: BarToLinePoint[];
  morphProgress: number; // 0 = 100% bars, 1 = 100% continuous line
  linePathD: string;
  lineOpacity: number;
}

/**
 * RECIPE: ChartBarToLine
 * Source Reference: motion-graphics-skills (animated-chart) / hyperframes
 * Transforms discrete statistical bars into a continuous trendline.
 * Prevents jarring scene wipes when presenting scientific or quantitative progression.
 */
export function executeChartBarToLine(
  frame: number,
  startFrame: number,
  duration: number = 30,
  dataValues: number[], // Normalized 0 to 1
  chartWidth: number = 600,
  chartHeight: number = 240
): ChartBarToLineResult {
  const rel = frame - startFrame;
  const rawP = Math.min(1, Math.max(0, rel / Math.max(1, duration)));
  const morphProgress = Easing.bezier(0.16, 1, 0.3, 1)(rawP);

  const n = dataValues.length;
  const stepX = chartWidth / (n - 1);
  const barWidth = (chartWidth / n) * 0.6;

  const points: BarToLinePoint[] = dataValues.map((val, idx) => {
    const targetY = chartHeight * (1 - val);
    const barH = val * chartHeight;
    // As morph progresses, bars thin out and melt upwards toward target line point
    const currentBarH = interpolate(morphProgress, [0, 1], [barH, 4]);
    const currentBarW = interpolate(morphProgress, [0, 1], [barWidth, 2]);
    const barOpacity = interpolate(morphProgress, [0.6, 1], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return {
      x: idx * stepX,
      barHeight: currentBarH,
      barWidth: currentBarW,
      lineY: targetY,
      barOpacity,
    };
  });

  // Construct SVG path for the continuous line
  const linePathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.lineY}` : `${acc} L ${pt.x} ${pt.lineY}`;
  }, '');

  const lineOpacity = interpolate(morphProgress, [0.2, 0.8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return {
    points,
    morphProgress,
    linePathD,
    lineOpacity,
  };
}
