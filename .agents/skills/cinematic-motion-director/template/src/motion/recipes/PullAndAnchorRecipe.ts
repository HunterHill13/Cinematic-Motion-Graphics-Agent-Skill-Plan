import { calculateDraw, DrawState } from '../mechanisms/Draw';
import { calculateRelay, RelayState } from '../mechanisms/Relay';
import { interpolate, Easing } from 'remotion';

export interface PullAndAnchorResult {
  draw: DrawState;
  relay: RelayState;
  anchorTension: number;
  anchorDisplacement: number;
}

/**
 * RECIPE: PullAndAnchor
 * Composes: Pull + Relay + Draw
 * An anchor guideline draws out dynamically, captures a floating target actor,
 * and pulls it tightly to establish a fixed structural datum.
 */
export function executePullAndAnchor(
  frame: number,
  startFrame: number,
  pullDuration: number,
  anchorLength: number = 300
): PullAndAnchorResult {
  const draw = calculateDraw(frame, startFrame, Math.floor(pullDuration * 0.4), anchorLength);
  const anchorLockFrame = startFrame + Math.floor(pullDuration * 0.4);
  const relay = calculateRelay(frame, anchorLockFrame, 10);

  let anchorTension = 0;
  let anchorDisplacement = 0;

  if (frame >= anchorLockFrame) {
    const raw = Math.min(1, (frame - anchorLockFrame) / Math.max(1, pullDuration * 0.6));
    anchorTension = Easing.bezier(0.16, 1, 0.3, 1)(raw);
    anchorDisplacement = interpolate(anchorTension, [0, 1], [40, 0]);
  }

  return {
    draw,
    relay,
    anchorTension,
    anchorDisplacement,
  };
}
