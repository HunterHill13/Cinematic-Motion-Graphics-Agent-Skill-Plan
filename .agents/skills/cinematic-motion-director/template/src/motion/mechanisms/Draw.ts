import { interpolate, Easing } from 'remotion';

export interface DrawState {
  progress: number;
  dashOffset: number;
  opacity: number;
}

/**
 * MECHANISM: Draw
 * Progressive vector line or stroke drawing using SVG strokeDashoffset.
 */
export function calculateDraw(
  frame: number,
  startFrame: number,
  duration: number,
  pathLength: number,
  config?: { easing?: (t: number) => number }
): DrawState {
  const { easing = Easing.bezier(0.16, 1, 0.3, 1) } = config || {};

  if (frame <= startFrame) {
    return { progress: 0, dashOffset: pathLength, opacity: 0 };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const progress = easing(raw);
  const dashOffset = interpolate(progress, [0, 1], [pathLength, 0]);
  const opacity = interpolate(raw, [0, 0.1, 1], [0, 1, 1]);

  return { progress, dashOffset, opacity };
}
