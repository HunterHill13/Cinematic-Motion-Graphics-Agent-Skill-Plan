import { interpolate, Easing } from 'remotion';

export interface DaughterNode {
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export interface SplitAndConvergeResult {
  nodes: DaughterNode[];
  splitProgress: number;
  trajectoryOpacity: number;
}

/**
 * RECIPE 03: SPLIT AND CONVERGE
 * Transforms a singular kinetic actor into multiple daughter nodes (or converges them).
 * - Division from origin coordinate along radiating bezier vectors.
 * - Draws faint trajectory arcs connecting parent and children.
 * - Synchronizes arrival at distinct destination coordinates.
 */
export function calculateSplitAndConverge(
  frame: number,
  splitFrame: number,
  duration: number,
  origin: { x: number; y: number },
  destinations: Array<{ x: number; y: number }>,
  mode: 'split' | 'converge' = 'split'
): SplitAndConvergeResult {
  const rawT = (frame - splitFrame) / Math.max(1, duration);
  const clampedT = Math.min(1, Math.max(0, rawT));
  const easedT = Easing.bezier(0.16, 1, 0.3, 1)(clampedT);

  const progress = mode === 'split' ? easedT : 1 - easedT;

  const nodes: DaughterNode[] = destinations.map((dest) => {
    const x = interpolate(progress, [0, 1], [origin.x, dest.x]);
    const y = interpolate(progress, [0, 1], [origin.y, dest.y]);
    const scale = interpolate(progress, [0, 0.3, 1], [0.6, 1.1, 1.0]);
    const opacity = interpolate(clampedT, [0, 0.2, 1], [0, 0.9, 1]);

    return { x, y, opacity, scale };
  });

  const trajectoryOpacity = interpolate(clampedT, [0, 0.3, 0.8, 1], [0, 0.5, 0.3, 0]);

  return {
    nodes,
    splitProgress: progress,
    trajectoryOpacity,
  };
}
