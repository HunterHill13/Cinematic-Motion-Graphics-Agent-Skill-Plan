import React from 'react';
import { AbsoluteFill } from 'remotion';

/**
 * Procedural Film Grain - Zero asset files, SVG turbulence filter.
 */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.045 }) => {
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E")`;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: noise,
        opacity,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
      }}
    />
  );
};
