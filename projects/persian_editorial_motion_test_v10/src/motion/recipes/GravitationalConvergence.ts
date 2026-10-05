import { interpolate, Easing } from 'remotion';

export interface AttractedEntity {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export interface GravitationalConvergenceResult {
  entities: AttractedEntity[];
  centerGlow: number;
  detonationRadius: number;
  detonationOpacity: number;
  hasDetonated: boolean;
}

/**
 * RECIPE 06: GRAVITATIONAL CONVERGENCE
 * Used for climactic structural unification (e.g. Shot 05 -> Shot 06 transition).
 * - Dispersed monoliths are pulled into a central gravitational attractor coordinate.
 * - Acceleration curves inward with an exponential trajectory.
 * - Reaching singularity triggers a radial detonation into the final institutional seal.
 */
export function calculateGravitationalConvergence(
  frame: number,
  startFrame: number,
  detonationFrame: number,
  center: { x: number; y: number },
  initialPositions: Array<{ x: number; y: number }>,
  config?: {
    maxDetonationRadius?: number;
    detonationDuration?: number;
  }
): GravitationalConvergenceResult {
  const {
    maxDetonationRadius = 260,
    detonationDuration = 24,
  } = config || {};

  const convergenceDuration = Math.max(1, detonationFrame - startFrame);
  const rawT = Math.min(1, Math.max(0, (frame - startFrame) / convergenceDuration));
  // Inward gravitational acceleration
  const gravityT = Easing.bezier(0.7, 0, 0.84, 0)(rawT);

  const entities: AttractedEntity[] = initialPositions.map((pos) => {
    if (frame < startFrame) {
      return { x: pos.x, y: pos.y, scale: 1.0, opacity: 1.0 };
    }
    if (frame >= detonationFrame) {
      return { x: center.x, y: center.y, scale: 0, opacity: 0 };
    }

    const x = interpolate(gravityT, [0, 1], [pos.x, center.x]);
    const y = interpolate(gravityT, [0, 1], [pos.y, center.y]);
    const scale = interpolate(gravityT, [0, 1], [1.0, 0.2]);
    const opacity = interpolate(gravityT, [0, 0.8, 1], [1.0, 0.7, 0]);

    return { x, y, scale, opacity };
  });

  // Central glow intensifies as entities approach singularity
  let centerGlow = 0;
  if (frame >= startFrame && frame < detonationFrame) {
    centerGlow = interpolate(rawT, [0, 0.7, 1], [0.1, 0.4, 1.0]);
  }

  // Detonation shockwave upon singularity
  let detonationRadius = 0;
  let detonationOpacity = 0;
  const hasDetonated = frame >= detonationFrame;

  if (hasDetonated && frame <= detonationFrame + detonationDuration) {
    const dProg = (frame - detonationFrame) / detonationDuration;
    const dEased = Easing.bezier(0.1, 0.9, 0.2, 1)(dProg);
    detonationRadius = interpolate(dEased, [0, 1], [10, maxDetonationRadius]);
    detonationOpacity = interpolate(dProg, [0, 0.15, 1], [1.0, 0.8, 0]);
  }

  return {
    entities,
    centerGlow,
    detonationRadius,
    detonationOpacity,
    hasDetonated,
  };
}
