import { interpolate, Easing } from 'remotion';

export interface SplitState {
  progress: number;
  positions: Array<{ x: number; y: number; scale: number; opacity: number }>;
}

/**
 * MECHANISM: Split
 * Separates 1 entity into N daughter entities along defined trajectories.
 */
export function calculateSplit(
  frame: number,
  startFrame: number,
  duration: number,
  origin: { x: number; y: number },
  destinations: Array<{ x: number; y: number }>,
  config?: { easing?: (t: number) => number }
): SplitState {
  const { easing = Easing.bezier(0.16, 1, 0.3, 1) } = config || {};

  if (frame <= startFrame) {
    return {
      progress: 0,
      positions: destinations.map(() => ({ x: origin.x, y: origin.y, scale: 1, opacity: 1 })),
    };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const progress = easing(raw);

  const count = destinations.length;
  const positions = destinations.map((d) => {
    return {
      x: interpolate(progress, [0, 1], [origin.x, d.x]),
      y: interpolate(progress, [0, 1], [origin.y, d.y]),
      scale: interpolate(progress, [0, 0.5, 1], [1, 1 / Math.sqrt(count) * 1.2, 1 / Math.sqrt(count)]),
      opacity: interpolate(raw, [0, 0.1, 1], [0.5, 1, 1]),
    };
  });

  return { progress, positions };
}

export interface MergeState {
  progress: number;
  positions: Array<{ x: number; y: number; scale: number; opacity: number }>;
  centerFlash: number;
}

/**
 * MECHANISM: Merge
 * Converges N entities into a single unified origin coordinate.
 */
export function calculateMerge(
  frame: number,
  startFrame: number,
  duration: number,
  origins: Array<{ x: number; y: number }>,
  target: { x: number; y: number }
): MergeState {
  if (frame <= startFrame) {
    return {
      progress: 0,
      positions: origins.map((o) => ({ x: o.x, y: o.y, scale: 1, opacity: 1 })),
      centerFlash: 0,
    };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const eased = Easing.bezier(0.7, 0, 0.84, 0)(raw); // Gravitational inward curve

  const positions = origins.map((o) => {
    return {
      x: interpolate(eased, [0, 1], [o.x, target.x]),
      y: interpolate(eased, [0, 1], [o.y, target.y]),
      scale: interpolate(eased, [0, 1], [1, 0.2]),
      opacity: interpolate(raw, [0, 0.8, 1], [1, 0.8, 0]),
    };
  });

  let centerFlash = 0;
  if (frame >= startFrame + duration) {
    const elapsed = frame - (startFrame + duration);
    if (elapsed < 16) {
      centerFlash = Math.exp(-0.25 * elapsed);
    }
  }

  return { progress: eased, positions, centerFlash };
}
