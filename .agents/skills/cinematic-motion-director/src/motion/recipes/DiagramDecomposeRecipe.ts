import { calculateDiagramDecompose } from '../mechanisms/DiagramBuild';
import { calculateTravel } from '../mechanisms/Travel';
import { calculateCounterMotion } from '../mechanisms/KineticType';

export interface DiagramDecomposeResult {
  fragments: Array<{ x: number; y: number; rotate: number; opacity: number }>;
  counterBalanceShift: number;
}

/**
 * RECIPE: DiagramDecompose
 * Composes: DiagramDecompose + Travel + CounterMotion
 * Breaks apart an established structured diagram, sending shards radially outward
 * while shifting foreground typography in counter-motion.
 */
export function executeDiagramDecompose(
  frame: number,
  startFrame: number,
  duration: number,
  fragmentCount: number = 6
): DiagramDecomposeResult {
  const decomp = calculateDiagramDecompose(frame, startFrame, duration, fragmentCount, 140);
  const counter = calculateCounterMotion(frame, startFrame, duration, 50, 'horizontal');

  return {
    fragments: decomp.fragmentOffsets,
    counterBalanceShift: counter.counterOffset,
  };
}
