import React from 'react';
import { AbsoluteFill } from 'remotion';
import { theme } from '../theme';

/**
 * Color Grade Overlay - Unifies disparate assets into one cohesive aesthetic look.
 * Renders above scene content, beneath grain.
 */
export const Grade: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.hero,
        mixBlendMode: 'soft-light',
        opacity,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.22) 100%)',
      }}
    />
  </AbsoluteFill>
);

/**
 * Vignette - Subtle lens edge darkening directing visual attention inward.
 */
export const Vignette: React.FC<{ intensity?: number }> = ({ intensity = 0.4 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,${intensity}) 100%)`,
      pointerEvents: 'none',
    }}
  />
);
