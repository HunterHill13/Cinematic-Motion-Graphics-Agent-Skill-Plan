/**
 * ============================================================================
 * CLAUDE MOTION DESIGN SYSTEM: GLASS CONTAINER
 * ============================================================================
 * 
 * Signature dark-mode glassmorphic container:
 * - Frosted backdrop blur with semi-transparent dark slate tint
 * - Ultra-fine 1px borders with top-edge specular linear-gradient highlight
 * - Native Remotion spring() scale & fade entrance
 * - Subtle inner glow and corner accents
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface GlassContainerProps {
  children: React.ReactNode;
  delayFrames?: number;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  borderColor?: string;
  accentColor?: string;
  className?: string;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  delayFrames = 0,
  width,
  height,
  style = {},
  borderColor = 'rgba(255, 255, 255, 0.12)',
  accentColor = '#38bdf8',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Natural spring entrance
  const entrance = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: {
      damping: 14,
      mass: 0.6,
      stiffness: 120,
    },
  });

  const opacity = Math.min(1, entrance * 1.2);
  const scale = 0.88 + entrance * 0.12;
  const translateY = (1 - entrance) * 25;

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: 20,
        backgroundColor: 'rgba(15, 23, 42, 0.72)', // Slate 900 frosted
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${borderColor}`,
        boxShadow: `
          0 20px 40px -15px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(255, 255, 255, 0.05),
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)
        `,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Top Specular Edge Highlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 20,
          right: 20,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor} 50%, transparent)`,
          opacity: 0.85,
        }}
      />

      {/* Subtle Corner Glow Accent */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      />

      {children}
    </div>
  );
};
