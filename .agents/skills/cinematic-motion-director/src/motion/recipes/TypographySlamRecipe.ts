import { calculateKineticType } from '../mechanisms/KineticType';
import { calculateCollision } from '../mechanisms/Collision';
import { calculateRipple } from '../mechanisms/Ripple';

export interface TypographySlamResult {
  scale: number;
  weightShift: number;
  letterSpacing: number;
  offsetY: number;
  baselineDisplacement: number;
  shockwave: { active: boolean; radius: number; opacity: number };
  opacity: number;
}

/**
 * RECIPE: TypographySlam
 * Composes: KineticType + Collision + Ripple
 * High-impact headline arrival: Lettering accelerates from offset, slams down
 * on the exact acoustic beat, bounces with squash/stretch, and ripples the baseline.
 */
export function executeTypographySlam(
  frame: number,
  startFrame: number,
  slamFrame: number
): TypographySlamResult {
  const type = calculateKineticType(frame, startFrame, slamFrame, 16, 35);
  const collision = calculateCollision(frame, slamFrame, { reboundAmplitude: 6 });
  const ripple = calculateRipple(frame, slamFrame, 20, 160);

  return {
    scale: type.scale * collision.squashScaleX,
    weightShift: type.weightShift,
    letterSpacing: type.letterSpacing,
    offsetY: type.offsetY + collision.displacementY,
    baselineDisplacement: collision.displacementY,
    shockwave: {
      active: ripple.active,
      radius: ripple.radius,
      opacity: ripple.opacity,
    },
    opacity: type.opacity,
  };
}
