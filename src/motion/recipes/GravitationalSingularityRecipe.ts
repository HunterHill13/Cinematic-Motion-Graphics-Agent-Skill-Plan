import { calculateGravity } from '../mechanisms/KineticType';
import { calculateMerge } from '../mechanisms/Split';
import { calculateRipple } from '../mechanisms/Ripple';

export interface GravitationalSingularityResult {
  entities: Array<{ x: number; y: number; scale: number; opacity: number }>;
  centerSingularityGlow: number;
  detonationShockwave: { active: boolean; radius: number; opacity: number };
  isDetonated: boolean;
}

/**
 * RECIPE: GravitationalSingularity
 * Composes: Gravity + Merge + Ripple
 * Multiple dispersed monoliths are pulled into a central gravitational singularity coordinate,
 * culminating in a flash detonation and shockwave ring.
 */
export function executeGravitationalSingularity(
  frame: number,
  startFrame: number,
  singularityFrame: number,
  center: { x: number; y: number },
  initialPositions: Array<{ x: number; y: number }>
): GravitationalSingularityResult {
  const duration = Math.max(1, singularityFrame - startFrame);
  const merge = calculateMerge(frame, startFrame, duration, initialPositions, center);
  const ripple = calculateRipple(frame, singularityFrame, 24, 280);

  return {
    entities: merge.positions,
    centerSingularityGlow: merge.centerFlash,
    detonationShockwave: {
      active: ripple.active,
      radius: ripple.radius,
      opacity: ripple.opacity,
    },
    isDetonated: frame >= singularityFrame,
  };
}
