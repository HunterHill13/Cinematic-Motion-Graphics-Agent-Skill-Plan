import { interpolate, Easing } from 'remotion';

export interface ShapeMorphResult {
  width: number;
  height: number;
  borderRadius: number;
  scaleX: number;
  scaleY: number;
  rotationDeg: number;
  opacity: number;
  progress: number;
}

/**
 * RECIPE: ShapeMorph
 * Source Reference: chief-motion-skill / motion-graphics-skills
 * Transforms geometry seamlessly (Circle -> Card -> Wide Container).
 * Incorporates physical squash & stretch anticipation without rubbery overshoots.
 */
export function executeShapeMorph(
  frame: number,
  startFrame: number,
  duration: number = 24,
  from: { width: number; height: number; borderRadius: number },
  to: { width: number; height: number; borderRadius: number }
): ShapeMorphResult {
  const rel = frame - startFrame;
  if (rel < 0) {
    return {
      width: from.width,
      height: from.height,
      borderRadius: from.borderRadius,
      scaleX: 1,
      scaleY: 1,
      rotationDeg: 0,
      opacity: 1,
      progress: 0,
    };
  }

  const rawP = Math.min(1, Math.max(0, rel / Math.max(1, duration)));
  // High-leverage cubic bezier curve
  const progress = Easing.bezier(0.16, 1, 0.3, 1)(rawP);

  // Elastic volume preservation: as it stretches, it squashes temporarily
  const squashFactor = Math.sin(progress * Math.PI) * 0.06;

  return {
    width: interpolate(progress, [0, 1], [from.width, to.width]),
    height: interpolate(progress, [0, 1], [from.height, to.height]),
    borderRadius: interpolate(progress, [0, 1], [from.borderRadius, to.borderRadius]),
    scaleX: 1 + squashFactor,
    scaleY: 1 - squashFactor,
    rotationDeg: interpolate(progress, [0, 1], [0, 0]),
    opacity: 1,
    progress,
  };
}
