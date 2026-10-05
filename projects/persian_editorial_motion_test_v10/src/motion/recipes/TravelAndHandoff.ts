import { interpolate, Easing } from 'remotion';

export interface TravelAndHandoffResult {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  velocity: number;
  wakeLength: number;
  handoffEnergy: number; // 0 to 1, peaks at destination arrival
}

/**
 * RECIPE 01: TRAVEL AND HANDOFF
 * Continuous kinetic motion along vector trajectories.
 * - Interpolates position between start and end coordinates with editorial bezier easing.
 * - Dynamically calculates instantaneous velocity and stretches directional comet wake.
 * - Transfers kinetic energy to target actor upon arrival (handoff energy pulse).
 */
export function calculateTravelAndHandoff(
  frame: number,
  startFrame: number,
  endFrame: number,
  from: { x: number; y: number },
  to: { x: number; y: number },
  config?: {
    easing?: (t: number) => number;
    baseScale?: number;
    maxWake?: number;
  }
): TravelAndHandoffResult {
  const {
    easing = Easing.bezier(0.16, 1, 0.3, 1),
    baseScale = 1.0,
    maxWake = 32,
  } = config || {};

  if (frame < startFrame) {
    return {
      x: from.x,
      y: from.y,
      scale: 0,
      opacity: 0,
      velocity: 0,
      wakeLength: 0,
      handoffEnergy: 0,
    };
  }

  const duration = Math.max(1, endFrame - startFrame);
  const rawProgress = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const progress = easing(rawProgress);

  const x = interpolate(progress, [0, 1], [from.x, to.x]);
  const y = interpolate(progress, [0, 1], [from.y, to.y]);

  // Velocity profile (highest in the middle, decays to 0)
  const dt = 1 / duration;
  const nextRaw = Math.min(1, rawProgress + dt);
  const nextProg = easing(nextRaw);
  const velocity = Math.max(0, (nextProg - progress) * duration);

  const wakeLength = velocity * maxWake;
  const opacity = interpolate(rawProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 1]);
  const scale = baseScale * (1 + velocity * 0.2);

  // Handoff energy peaks in the last 4 frames of travel and decays over 12 frames
  let handoffEnergy = 0;
  if (frame >= endFrame - 4) {
    const elapsedSinceArrival = frame - endFrame;
    if (elapsedSinceArrival >= 0 && elapsedSinceArrival < 12) {
      handoffEnergy = Math.exp(-0.3 * elapsedSinceArrival);
    } else if (elapsedSinceArrival < 0) {
      handoffEnergy = interpolate(elapsedSinceArrival, [-4, 0], [0.5, 1]);
    }
  }

  return {
    x,
    y,
    scale,
    opacity,
    velocity,
    wakeLength,
    handoffEnergy,
  };
}
