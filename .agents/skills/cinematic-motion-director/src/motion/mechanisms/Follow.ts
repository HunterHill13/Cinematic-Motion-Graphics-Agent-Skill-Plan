import { interpolate, Easing } from 'remotion';

export interface FollowConfig {
  delayFrames?: number;
  damping?: number;
  offset?: { x: number; y: number };
}

export interface FollowState {
  x: number;
  y: number;
  lagProgress: number;
  opacity: number;
}

/**
 * MECHANISM: Follow
 * Secondary actor follows a leader actor with a physical time lag and spring drag.
 */
export function calculateFollow(
  frame: number,
  leaderFrameStart: number,
  leaderDuration: number,
  from: { x: number; y: number },
  to: { x: number; y: number },
  config?: FollowConfig
): FollowState {
  const { delayFrames = 4, offset = { x: 0, y: 0 } } = config || {};
  const effectiveFrame = frame - delayFrames;

  if (effectiveFrame <= leaderFrameStart) {
    return { x: from.x + offset.x, y: from.y + offset.y, lagProgress: 0, opacity: 0 };
  }

  const rawT = Math.min(1, Math.max(0, (effectiveFrame - leaderFrameStart) / Math.max(1, leaderDuration)));
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(rawT);

  const x = interpolate(eased, [0, 1], [from.x, to.x]) + offset.x;
  const y = interpolate(eased, [0, 1], [from.y, to.y]) + offset.y;
  const opacity = interpolate(rawT, [0, 0.2, 1], [0, 0.8, 1]);

  return { x, y, lagProgress: eased, opacity };
}
