import { calculateCounterMotion } from '../mechanisms/KineticType';
import { calculateTravel } from '../mechanisms/Travel';

export interface CounterBalancedSweepResult {
  leftSweepX: number;
  rightSweepX: number;
  centerConvergenceProgress: number;
}

/**
 * RECIPE: CounterBalancedSweep
 * Composes: CounterMotion + Travel + Parallax
 * Two complementary horizontal wings sweep in opposing directions, settling into equilibrium.
 */
export function executeCounterBalancedSweep(
  frame: number,
  startFrame: number,
  duration: number,
  sweepDistance: number = 280
): CounterBalancedSweepResult {
  const counter = calculateCounterMotion(frame, startFrame, duration, sweepDistance, 'horizontal');
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));

  return {
    leftSweepX: counter.primaryOffset,
    rightSweepX: counter.counterOffset,
    centerConvergenceProgress: raw,
  };
}
