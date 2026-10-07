import React from 'react';
import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion';

export type TransitionType =
  | 'push-through'
  | 'whip-pan'
  | 'overexpose-flip'
  | 'motion-carry'
  | 'fade'; // DEPRECATED: Emergency fallback only

export interface ShotTransitionProps {
  type: TransitionType;
  /** Duration in frames (typically 12-16 frames) */
  duration?: number;
  /** 'exit' for the outgoing shot, 'entrance' for the incoming shot */
  side: 'exit' | 'entrance';
}

/**
 * ShotTransition (v40.1 Production Standard)
 * 
 * Enforces Motion-Carry & Physical Transition Dynamics:
 * - Generic 'fade' is DEPRECATED and blocked by the ANTI_SLIDESHOW_GATE if used repeatedly.
 * - Transitions must carry physical momentum across scene seams.
 */
export const ShotTransition: React.FC<ShotTransitionProps> = ({
  type,
  duration = 14,
  side,
}) => {
  const frame = useCurrentFrame();

  if (type === 'fade') {
    // WARNING: Triggers S1/S3 Slideshow Signature if repeated.
    const opacity = side === 'exit'
      ? interpolate(frame, [0, duration], [1, 0], { extrapolateRight: 'clamp' })
      : interpolate(frame, [0, duration], [0, 1], { extrapolateRight: 'clamp' });
    return <AbsoluteFill style={{ opacity, pointerEvents: 'none' }} />;
  }

  if (type === 'push-through') {
    // Camera zooms past outgoing entity into incoming core
    const scale = side === 'exit'
      ? interpolate(frame, [0, duration], [1, 1.4], { extrapolateRight: 'clamp' })
      : interpolate(frame, [0, duration], [0.7, 1], { extrapolateRight: 'clamp' });
    const opacity = side === 'exit'
      ? interpolate(frame, [duration - 4, duration], [1, 0], { extrapolateRight: 'clamp' })
      : interpolate(frame, [0, 4], [0, 1], { extrapolateRight: 'clamp' });

    return (
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          opacity,
          pointerEvents: 'none',
        }}
      />
    );
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

  return null;
};
