import { interpolate, Easing } from 'remotion';

export interface CollisionState {
  impactOccurred: boolean;
  displacementY: number;
  squashScaleX: number;
  squashScaleY: number;
  reboundVelocity: number;
}

/**
 * MECHANISM: Collision
 * Physical contact detection with harmonic rebound and squash/stretch response.
 */
export function calculateCollision(
  frame: number,
  impactFrame: number,
  config?: {
    reboundAmplitude?: number;
    decay?: number;
    frequency?: number;
    maxSquash?: number;
  }
): CollisionState {
  const {
    reboundAmplitude = 8,
    decay = 0.22,
    frequency = 0.6,
    maxSquash = 0.12,
  } = config || {};

  if (frame < impactFrame) {
    return {
      impactOccurred: false,
      displacementY: 0,
      squashScaleX: 1,
      squashScaleY: 1,
      reboundVelocity: 0,
    };
  }

  const elapsed = frame - impactFrame;
  const damp = Math.exp(-decay * elapsed);
  const displacementY = reboundAmplitude * damp * Math.sin(frequency * elapsed);

  // Instantaneous squash on first 4 frames, then ringing decay
  let squash = 0;
  if (elapsed < 12) {
    squash = maxSquash * Math.exp(-0.3 * elapsed) * Math.cos(frequency * elapsed);
  }

  const reboundVelocity = reboundAmplitude * damp * Math.cos(frequency * elapsed) * frequency;

  return {
    impactOccurred: true,
    displacementY,
    squashScaleX: 1 + squash,
    squashScaleY: 1 - squash,
    reboundVelocity,
  };
}
