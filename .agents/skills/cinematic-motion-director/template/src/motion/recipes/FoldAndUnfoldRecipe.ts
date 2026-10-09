import { calculateFold, FoldState } from '../mechanisms/Fold';
import { calculatePush, PushState } from '../mechanisms/Push';
import { calculateReveal, RevealState } from '../mechanisms/Reveal';

export interface FoldAndUnfoldResult {
  fold: FoldState;
  push: PushState;
  reveal: RevealState;
  combinedOpacity: number;
}

/**
 * RECIPE: FoldAndUnfold
 * Composes: Fold + Push + Reveal
 * A surface folds along a geometric hinge, pushes an adjacent container,
 * and reveals the new contextual plane in full perspective.
 */
export function executeFoldAndUnfold(
  frame: number,
  startFrame: number,
  foldDuration: number,
  revealDuration: number
): FoldAndUnfoldResult {
  const fold = calculateFold(frame, startFrame, foldDuration, 'X', 90, 0);
  const push = calculatePush(
    frame,
    startFrame,
    startFrame + Math.floor(foldDuration * 0.5),
    startFrame + foldDuration,
    0,
    100,
    160
  );
  const reveal = calculateReveal(
    frame,
    startFrame + Math.floor(foldDuration * 0.4),
    revealDuration,
    'up',
    40
  );

  return {
    fold,
    push,
    reveal,
    combinedOpacity: Math.min(1, fold.opacity * reveal.opacity * 1.2),
  };
}
