import { calculatePush } from '../mechanisms/Push';
import { calculateCollision } from '../mechanisms/Collision';
import { calculateFollow } from '../mechanisms/Follow';

export interface PushAndDisplaceResult {
  pusherX: number;
  outgoingTargetX: number;
  displacement: number;
  impactSquash: number;
  followerLagY: number;
}

/**
 * RECIPE: PushAndDisplace
 * Composes: Push + Collision + Follow
 * Actor A drives across canvas, collides with Actor B, and physically drives it out of frame.
 */
export function executePushAndDisplace(
  frame: number,
  startFrame: number,
  contactFrame: number,
  endFrame: number,
  startX: number = -200,
  contactX: number = 960,
  exitDistance: number = 1200
): PushAndDisplaceResult {
  const push = calculatePush(frame, startFrame, contactFrame, endFrame, startX, contactX, exitDistance);
  const collision = calculateCollision(frame, contactFrame, { reboundAmplitude: 5 });
  const follow = calculateFollow(frame, contactFrame, 20, { x: 0, y: 12 }, { x: 0, y: 0 });

  return {
    pusherX: push.pusherX,
    outgoingTargetX: push.targetX,
    displacement: push.displacement,
    impactSquash: collision.squashScaleX,
    followerLagY: follow.y,
  };
}
