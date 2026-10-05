import { interpolate, Easing } from 'remotion';

export interface PushState {
  pusherX: number;
  targetX: number;
  contactFrame: number;
  displacement: number;
  compression: number;
}

/**
 * MECHANISM: Push
 * Actor A translates across screen, contacts Actor B, and physically displaces it.
 */
export function calculatePush(
  frame: number,
  startFrame: number,
  contactFrame: number,
  endFrame: number,
  pusherStartX: number,
  contactX: number,
  finalDisplacement: number
): PushState {
  if (frame < contactFrame) {
    const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, contactFrame - startFrame)));
    const pusherX = interpolate(Easing.bezier(0.2, 0, 0, 1)(raw), [0, 1], [pusherStartX, contactX]);
    return {
      pusherX,
      targetX: contactX,
      contactFrame,
      displacement: 0,
      compression: 0,
    };
  }

  const pushDuration = Math.max(1, endFrame - contactFrame);
  const rawPush = Math.min(1, (frame - contactFrame) / pushDuration);
  const pushEased = Easing.bezier(0.16, 1, 0.3, 1)(rawPush);

  const displacement = interpolate(pushEased, [0, 1], [0, finalDisplacement]);
  const compression = Math.sin(rawPush * Math.PI) * 0.15;

  return {
    pusherX: contactX + displacement,
    targetX: contactX + displacement,
    contactFrame,
    displacement,
    compression,
  };
}

export interface PullState {
  tetherTension: number;
  targetOffset: number;
  snapProgress: number;
}

/**
 * MECHANISM: Pull
 * Actor A extends a tension tether to Actor B and pulls it into position with elastic snap.
 */
export function calculatePull(
  frame: number,
  tetherStartFrame: number,
  pullStartFrame: number,
  snapFrame: number,
  initialDistance: number
): PullState {
  if (frame < pullStartFrame) {
    const tension = Math.min(1, Math.max(0, (frame - tetherStartFrame) / Math.max(1, pullStartFrame - tetherStartFrame)));
    return { tetherTension: tension, targetOffset: initialDistance, snapProgress: 0 };
  }

  const duration = Math.max(1, snapFrame - pullStartFrame);
  const raw = Math.min(1, (frame - pullStartFrame) / duration);
  const elastic = Easing.bezier(0.34, 1.56, 0.64, 1)(raw);

  const targetOffset = interpolate(elastic, [0, 1], [initialDistance, 0]);
  const tetherTension = 1 - raw;

  return {
    tetherTension,
    targetOffset,
    snapProgress: raw,
  };
}
