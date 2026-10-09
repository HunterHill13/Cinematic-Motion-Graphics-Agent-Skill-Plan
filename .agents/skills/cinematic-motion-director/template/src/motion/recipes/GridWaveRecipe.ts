import { interpolate } from 'remotion';

export interface GridPoint {
  col: number;
  row: number;
  x: number;
  y: number;
  displacementY: number;
  scale: number;
  opacity: number;
}

export interface GridWaveResult {
  points: GridPoint[];
  waveProgress: number;
}

/**
 * RECIPE: GridWave
 * Source Reference: motion-graphics-skills / hyperframes (weight-wave)
 * Propagates an epicenter shockwave or rhythmic ripple across a structured matrix.
 * Visualizes computational rigor, network topology, and systemic response.
 */
export function executeGridWave(
  frame: number,
  startFrame: number,
  cols: number = 8,
  rows: number = 5,
  spacing: number = 50,
  waveSpeed: number = 2.5
): GridWaveResult {
  const rel = frame - startFrame;
  const centerCol = (cols - 1) / 2;
  const centerRow = (rows - 1) / 2;

  const points: GridPoint[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const distFromCenter = Math.sqrt(
        Math.pow(c - centerCol, 2) + Math.pow(r - centerRow, 2)
      );

      // Distance delay: wave reaches outer points later
      const delay = distFromCenter * 3.5;
      const pointTime = Math.max(0, rel - delay);

      // Damped sine pulse
      const wavePhase = pointTime * 0.25;
      const waveActive = pointTime > 0 && pointTime < 24;
      const amplitude = waveActive
        ? Math.sin(wavePhase) * Math.exp(-pointTime * 0.12) * 20
        : 0;

      const scale = 1 + (amplitude / 20) * 0.4;
      const opacity = interpolate(distFromCenter, [0, 5], [0.9, 0.4], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      points.push({
        col: c,
        row: r,
        x: (c - centerCol) * spacing,
        y: (r - centerRow) * spacing,
        displacementY: amplitude,
        scale,
        opacity,
      });
    }
  }

  return {
    points,
    waveProgress: Math.min(1, Math.max(0, rel / 30)),
  };
}
