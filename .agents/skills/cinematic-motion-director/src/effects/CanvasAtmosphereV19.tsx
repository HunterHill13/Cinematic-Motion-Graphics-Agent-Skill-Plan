import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export interface CanvasAtmosphereProps {
  mood?: 'gold' | 'azure' | 'crimson' | 'neutral';
  intensity?: number;
}

/**
 * V19 FULL-CANVAS EDITORIAL ATMOSPHERE
 * Replaces empty black void with an architectural, structured layout space.
 * Engages the entire 1920x1080 frame with subtle coordinate lines and radial depth.
 */
export const CanvasAtmosphereV19: React.FC<CanvasAtmosphereProps> = ({
  mood = 'gold',
  intensity = 1.0,
}) => {
  const frame = useCurrentFrame();

  // Subtle ambient breathing in depth plane
  const breathe = Math.sin(frame * 0.02) * 0.08;

  let glowColor = 'rgba(212, 175, 55, 0.07)'; // default gold
  let secondaryColor = 'rgba(245, 158, 11, 0.03)';

  if (mood === 'azure') {
    glowColor = 'rgba(14, 165, 233, 0.08)';
    secondaryColor = 'rgba(56, 189, 248, 0.04)';
  } else if (mood === 'crimson') {
    glowColor = 'rgba(239, 68, 68, 0.08)';
    secondaryColor = 'rgba(220, 38, 38, 0.03)';
  } else if (mood === 'neutral') {
    glowColor = 'rgba(148, 163, 184, 0.05)';
    secondaryColor = 'rgba(100, 116, 139, 0.02)';
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#06080E', overflow: 'hidden', pointerEvents: 'none' }}>
      {/* 1. Deep Spatial Radial Field */}
      <div
        style={{
          position: 'absolute',
          inset: -100,
          background: `radial-gradient(ellipse 65% 55% at 50% 45%, ${glowColor} 0%, ${secondaryColor} 45%, transparent 75%)`,
          opacity: (0.9 + breathe) * intensity,
        }}
      />

      {/* 2. Precision Architectural Vector Grid (120px coordinates) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.022) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.022) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* 3. Subtle Corner Framing Guides (Broadcast Safe Editorial Marks) */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, opacity: 0.25 }}
      >
        {/* Top-Left crosshair */}
        <path d="M 60 75 L 60 60 L 75 60" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        {/* Top-Right crosshair */}
        <path d="M 1860 75 L 1860 60 L 1845 60" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        {/* Bottom-Left crosshair */}
        <path d="M 60 1005 L 60 1020 L 75 1020" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        {/* Bottom-Right crosshair */}
        <path d="M 1860 1005 L 1860 1020 L 1845 1020" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
        {/* Micro-coordinate datum markers */}
        <circle cx="960" cy="60" r="1.5" fill="rgba(212, 175, 55, 0.5)" />
        <circle cx="960" cy="1020" r="1.5" fill="rgba(212, 175, 55, 0.5)" />
        <circle cx="60" cy="540" r="1.5" fill="rgba(212, 175, 55, 0.5)" />
        <circle cx="1860" cy="540" r="1.5" fill="rgba(212, 175, 55, 0.5)" />
      </svg>

      {/* 4. Peripheral Vignette (Subtle natural optical falloff) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(3, 5, 8, 0.6) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
