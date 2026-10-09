import { interpolate, Easing } from 'remotion';

export interface RelayState {
  outgoingOpacity: number;
  incomingOpacity: number;
  outgoingVelocityDecay: number;
  incomingVelocitySurge: number;
  energyTransfer: number;
}

/**
 * MECHANISM: Relay
 * Exact baton handover between two sequential actors.
 */
export function calculateRelay(
  frame: number,
  relayFrame: number,
  windowFrames: number = 8
): RelayState {
  const start = relayFrame - windowFrames / 2;
  const end = relayFrame + windowFrames / 2;

  if (frame <= start) {
    return {
      outgoingOpacity: 1,
      incomingOpacity: 0,
      outgoingVelocityDecay: 1,
      incomingVelocitySurge: 0,
      energyTransfer: 0,
    };
  }

  if (frame >= end) {
    return {
      outgoingOpacity: 0,
      incomingOpacity: 1,
      outgoingVelocityDecay: 0,
      incomingVelocitySurge: 1,
      energyTransfer: 0,
    };
  }

  const t = (frame - start) / windowFrames;
  const energyTransfer = Math.sin(t * Math.PI);

  return {
    outgoingOpacity: interpolate(t, [0, 0.6, 1], [1, 0.4, 0]),
    incomingOpacity: interpolate(t, [0, 0.4, 1], [0, 0.6, 1]),
    outgoingVelocityDecay: 1 - t,
    incomingVelocitySurge: t,
    energyTransfer,
  };
}
