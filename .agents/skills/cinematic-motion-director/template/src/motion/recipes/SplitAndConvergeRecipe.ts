import { calculateSplit, calculateMerge } from '../mechanisms/Split';

export interface SplitAndConvergeRecipeResult {
  phase: 'split' | 'hold' | 'merge';
  nodes: Array<{ x: number; y: number; scale: number; opacity: number }>;
  centerFlash: number;
}

/**
 * RECIPE: SplitAndConverge
 * Composes: Split + Travel + Merge
 * Single unified actor separates into daughter nodes, holds across a duration,
 * then gravitationally merges back into a single authority point.
 */
export function executeSplitAndConverge(
  frame: number,
  splitFrame: number,
  splitDuration: number,
  mergeFrame: number,
  mergeDuration: number,
  origin: { x: number; y: number },
  destinations: Array<{ x: number; y: number }>
): SplitAndConvergeRecipeResult {
  if (frame < mergeFrame) {
    const split = calculateSplit(frame, splitFrame, splitDuration, origin, destinations);
    return {
      phase: frame < splitFrame + splitDuration ? 'split' : 'hold',
      nodes: split.positions,
      centerFlash: 0,
    };
  }

  const merge = calculateMerge(frame, mergeFrame, mergeDuration, destinations, origin);
  return {
    phase: 'merge',
    nodes: merge.positions,
    centerFlash: merge.centerFlash,
  };
}
