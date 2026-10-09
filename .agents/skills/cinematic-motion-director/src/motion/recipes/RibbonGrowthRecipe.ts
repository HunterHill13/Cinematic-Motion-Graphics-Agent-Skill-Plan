import { interpolate, Easing } from 'remotion';

export interface RibbonGrowthResult {
  pathLength: number;
  strokeDashoffset: number;
  strokeDasharray: number;
  headX: number;
  headY: number;
  width: number;
  opacity: number;
}

/**
 * RECIPE: RibbonGrowth
 * Source Reference: hyperframes / motion-graphics-skills
 * Organic, continuous expansion of a flowing graphic ribbon across the frame.
 * Avoids abrupt pops by using smooth bezier acceleration and leading wave dynamics.
 */
export function executeRibbonGrowth(
  frame: number,
  startFrame: number,
  duration: number = 30,
  totalPathLength: number = 800,
  ribbonWidth: number = 6
): RibbonGrowthResult {
  const rel = frame - startFrame;
  if (rel < 0) {
    return {
      pathLength: totalPathLength,
      strokeDashoffset: totalPathLength,
      strokeDasharray: totalPathLength,
      headX: 0,
      headY: 0,
      width: ribbonWidth,
      opacity: 0,
    };
  }

  const progress = interpolate(rel, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  });

  const currentLength = progress * totalPathLength;
  const strokeDashoffset = totalPathLength * (1 - progress);

  // Subtle wave breathing on the ribbon head
  const headWiggle = Math.sin(rel * 0.2) * 4;

  return {
    pathLength: totalPathLength,
    strokeDashoffset,
    strokeDasharray: totalPathLength,
    headX: currentLength,
    headY: headWiggle,
    width: ribbonWidth,
    opacity: interpolate(rel, [0, 4], [0, 1], { extrapolateRight: 'clamp' }),
  };
}
