import { interpolate, Easing } from 'remotion';

export interface TravelConfig {
  easing?: (t: number) => number;
  maxVelocity?: number;
}

export interface TravelState {
  x: number;
  y: number;
  progress: number;
  velocity: number;
  angle: number; // Angle in degrees along motion vector
}

/**
 * MECHANISM: Travel
 * Smooth vector path translation between two coordinates with velocity derivation.
 */
export function calculateTravel(
  frame: number,
  startFrame: number,
  duration: number,
  from: { x: number; y: number },
  to: { x: number; y: number },
  config?: TravelConfig
): TravelState {
  const { easing = Easing.bezier(0.16, 1, 0.3, 1) } = config || {};

  if (frame <= startFrame) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return { x: from.x, y: from.y, progress: 0, velocity: 0, angle };
  }

  const rawT = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const progress = easing(rawT);

  const x = interpolate(progress, [0, 1], [from.x, to.x]);
  const y = interpolate(progress, [0, 1], [from.y, to.y]);

  // Derivative for instantaneous velocity
  const dt = 1 / Math.max(1, duration);
  const nextProg = easing(Math.min(1, rawT + dt));
  const velocity = (nextProg - progress) * duration;

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { x, y, progress, velocity, angle };
}
