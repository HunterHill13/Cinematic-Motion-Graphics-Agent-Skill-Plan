import { interpolate, Easing } from 'remotion';

export interface MorphState {
  progress: number;
  width: number;
  height: number;
  borderRadius: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

/**
 * MECHANISM: Morph
 * Geometric interpolation of dimensions, corner radii, and aspect ratios.
 */
export function calculateMorph(
  frame: number,
  startFrame: number,
  duration: number,
  from: { width: number; height: number; borderRadius: number },
  to: { width: number; height: number; borderRadius: number },
  config?: { easing?: (t: number) => number }
): MorphState {
  const { easing = Easing.bezier(0.16, 1, 0.3, 1) } = config || {};

  if (frame <= startFrame) {
    return {
      progress: 0,
      width: from.width,
      height: from.height,
      borderRadius: from.borderRadius,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    };
  }

  const rawT = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const progress = easing(rawT);

  // Anticipation squash and stretch during morph
  const squash = Math.sin(progress * Math.PI) * 0.08;

  return {
    progress,
    width: interpolate(progress, [0, 1], [from.width, to.width]),
    height: interpolate(progress, [0, 1], [from.height, to.height]),
    borderRadius: interpolate(progress, [0, 1], [from.borderRadius, to.borderRadius]),
    scaleX: 1 + squash,
    scaleY: 1 - squash,
    opacity: 1,
  };
}
