import { calculateCollision } from '../mechanisms/Collision';
import { calculateRipple } from '../mechanisms/Ripple';
import { calculateFollow } from '../mechanisms/Follow';

export interface ImpactAndRippleRecipeResult {
  displacementY: number;
  squashScaleX: number;
  squashScaleY: number;
  ripple: { active: boolean; radius: number; opacity: number; strokeWidth: number };
  follower: { y: number; opacity: number };
}

/**
 * RECIPE: ImpactAndRipple
 * Composes: Collision + Ripple + Follow
 * A monumental actor strikes the stage: registers physical collision rebound and squash,
 * detonates radial shockwave ripples, and causes framing brackets to follow with lag.
 */
export function executeImpactAndRipple(
  frame: number,
  impactFrame: number,
  config?: {
    reboundAmplitude?: number;
    rippleMaxRadius?: number;
    followerDelay?: number;
  }
): ImpactAndRippleRecipeResult {
  const { reboundAmplitude = 8, rippleMaxRadius = 200, followerDelay = 4 } = config || {};

  const collision = calculateCollision(frame, impactFrame, { reboundAmplitude });
  const ripple = calculateRipple(frame, impactFrame, 24, rippleMaxRadius);
  const follower = calculateFollow(
    frame,
    impactFrame,
    18,
    { x: 0, y: 16 },
    { x: 0, y: 0 },
    { delayFrames: followerDelay }
  );

  return {
    displacementY: collision.displacementY,
    squashScaleX: collision.squashScaleX,
    squashScaleY: collision.squashScaleY,
    ripple,
    follower: { y: follower.y, opacity: follower.opacity },
  };
}
