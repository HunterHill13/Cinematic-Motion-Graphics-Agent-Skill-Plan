import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

/**
 * BgMesh - Animated subtle radial gradient spheres. Never flat backgrounds.
 */
export const BgMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 60) * 45;
  const d2 = Math.cos(frame / 75) * 35;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.base, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          width: 1400,
          height: 1400,
          borderRadius: '50%',
          top: -500,
          left: -350 + d1,
          filter: 'blur(70px)',
          background: `radial-gradient(circle, ${theme.colors.hero}26, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1100,
          height: 1100,
          borderRadius: '50%',
          bottom: -450,
          right: -300 - d2,
          filter: 'blur(80px)',
          background: `radial-gradient(circle, ${theme.colors.accent}1F, transparent 68%)`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
