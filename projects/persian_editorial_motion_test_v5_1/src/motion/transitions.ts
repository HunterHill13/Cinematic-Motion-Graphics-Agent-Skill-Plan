/**
 * V5.1 Motion Primitives: Cinematic Transitions
 * Implements Rule B16: Continuity handoffs over generic crossfades.
 */
import { interpolate, Easing } from 'remotion';

export interface TransitionState {
  progress: number; // 0 -> 1
  lineLength: number;
  cameraOffset: number;
}

export const computeLineCarryHandoff = (
  frame: number,
  startFrame: number,
  duration = 45,
  distance = 1920
): TransitionState => {
  const p = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return {
    progress: p,
    lineLength: p * distance,
    cameraOffset: p * distance,
  };
};
