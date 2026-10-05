import { calculateCollision, CollisionState } from '../mechanisms/Collision';
import { calculateRipple, RippleState } from '../mechanisms/Ripple';
import { interpolate, Easing } from 'remotion';

export interface ElasticSnappingResult {
  tension: number;
  displacementX: number;
  collision: CollisionState;
  ripple: RippleState;
  snapProgress: number;
}

/**
 * RECIPE: ElasticSnapping
 * Composes: Pull (Tension) + Collision + Ripple
 * Elements pull against a virtual elastic constraint until reaching release threshold,
 * then snap back with high-frequency harmonic oscillation and shockwave ripple.
 */
export function executeElasticSnapping(
  frame: number,
  pullStart: number,
  snapFrame: number,
  settleFrame: number,
  maxPullDistance: number = 80
): ElasticSnappingResult {
  let displacementX = 0;
  let tension = 0;
  let snapProgress = 0;

  if (frame < snapFrame) {
    const raw = Math.min(1, Math.max(0, (frame - pullStart) / Math.max(1, snapFrame - pullStart)));
    tension = Easing.bezier(0.4, 0, 0.8, 0.2)(raw);
    displacementX = tension * maxPullDistance;
  } else {
    tension = 0;
    const snapDuration = Math.max(1, settleFrame - snapFrame);
    const rawSnap = Math.min(1, (frame - snapFrame) / snapDuration);
    snapProgress = Easing.bezier(0.16, 1, 0.3, 1)(rawSnap);
    
    // Snapping back with damped oscillation
    const elapsed = frame - snapFrame;
    const decay = Math.exp(-0.25 * elapsed);
    const oscillation = Math.cos(elapsed * 0.8) * decay;
    displacementX = (1 - snapProgress) * maxPullDistance * oscillation;
  }

  const collision = calculateCollision(frame, snapFrame, {
    reboundAmplitude: 12,
    decay: 0.25,
    maxSquash: 0.18,
  });

  const ripple = calculateRipple(frame, snapFrame, 20, 140, 2);

  return {
    tension,
    displacementX,
    collision,
    ripple,
    snapProgress,
  };
}
