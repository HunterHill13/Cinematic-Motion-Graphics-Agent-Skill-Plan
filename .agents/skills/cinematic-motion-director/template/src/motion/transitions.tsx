import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';

export type TransitionType =
  | 'push-through'
  | 'whip-pan'
  | 'overexpose-flip'
  | 'black-slam'
  | 'pullback-cool'
  | 'fade';

export interface ShotTransitionProps {
  type: TransitionType;
  /** Duration in frames (typically 12-16 frames) */
  duration?: number;
  /** 'exit' for the outgoing shot, 'entrance' for the incoming shot */
  side: 'exit' | 'entrance';
}

/**
 * ShotTransition - Motion continuity transitions between shots.
 * Prohibits raw naked cuts.
 */
export const ShotTransition: React.FC<ShotTransitionProps> = ({
  type,
  duration = 14,
  side,
}) => {
  const frame = useCurrentFrame();

  if (type === 'fade') {
    const opacity = side === 'exit'
      ? interpolate(frame, [0, duration], [1, 0], { extrapolateRight: 'clamp' })
      : interpolate(frame, [0, duration], [0, 1], { extrapolateRight: 'clamp' });
    return <AbsoluteFill style={{ opacity, pointerEvents: 'none' }} />;
  }

  if (type === 'overexpose-flip') {
    // White flash / overexposure curve
    const flash = side === 'exit'
      ? interpolate(frame, [0, duration], [0, 0.9], { extrapolateRight: 'clamp' })
      : interpolate(frame, [0, duration], [0.9, 0], { extrapolateRight: 'clamp' });

    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#FFFFFF',
          opacity: flash,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (type === 'black-slam') {
    // Hard black impact frame
    const black = side === 'exit'
      ? (frame >= duration - 1 ? 1 : 0)
      : (frame <= 1 ? 1 : 0);

    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#000000',
          opacity: black,
          pointerEvents: 'none',
        }}
      />
    );
  }

  return null;
};
