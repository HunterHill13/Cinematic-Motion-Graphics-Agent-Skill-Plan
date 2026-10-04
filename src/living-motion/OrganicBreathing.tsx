import React from 'react';
import { useCurrentFrame } from 'remotion';
import { organicNoise1D } from './NoiseField';

export interface OrganicBreathingProps {
  children: React.ReactNode;
  amplitude?: number; // Micro-scale expansion factor, e.g. 0.012 for 1.2%
  frequency?: number; // Breathing frequency
  seed?: number;
  enableGlow?: boolean;
  glowColor?: string;
  style?: React.CSSProperties;
}

/**
 * OrganicBreathing ensures on-screen hero elements never remain statically frozen.
 * Applies a smooth, non-periodic micro-scale and breathing glow during the hold state.
 */
export const OrganicBreathing: React.FC<OrganicBreathingProps> = ({
  children,
  amplitude = 0.012,
  frequency = 0.035,
  seed = 77,
  enableGlow = false,
  glowColor = 'rgba(16, 185, 129, 0.25)',
  style,
}) => {
  const frame = useCurrentFrame();

  // Primary smooth breathing cycle + subtle micro-noise disturbance
  const noise = organicNoise1D(frame, { seed, frequency, amplitude: 1.0 });
  const scale = 1.0 + noise * amplitude;
  const rotation = noise * 0.4; // Subtle 0.4deg organic tilt

  const glowFilter = enableGlow
    ? `drop-shadow(0 0 ${12 + noise * 6}px ${glowColor})`
    : undefined;

  return (
    <div
      style={{
        display: 'inline-block',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        filter: glowFilter,
        willChange: 'transform, filter',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
