/**
 * ============================================================================
 * CLAUDE MOTION DESIGN SYSTEM: ATMOSPHERIC BACKDROP
 * ============================================================================
 * 
 * Provides the signature modern tech motion backdrop:
 * - Deep multi-layered radial spotlighting (slate-950 / indigo-950)
 * - Animated perspective tech gridlines with pulse ripples
 * - Ambient floating micro-particles and glowing bokeh
 * - Vignette and lens depth framing
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface AtmosphericBackdropProps {
  primaryGlowColor?: string; // default: #38bdf8 (cyan)
  secondaryGlowColor?: string; // default: #6366f1 (indigo)
  showGrid?: boolean;
  gridSpeed?: number;
}

export const AtmosphericBackdrop: React.FC<AtmosphericBackdropProps> = ({
  primaryGlowColor = '#38bdf8',
  secondaryGlowColor = '#6366f1',
  showGrid = true,
  gridSpeed = 1.0,
}) => {
  const frame = useCurrentFrame();

  // Subtle floating spotlight coordinate shifts
  const lightShiftX = Math.sin((frame / 60) * Math.PI) * 40;
  const lightShiftY = Math.cos((frame / 75) * Math.PI) * 25;

  // Grid vertical travel offset
  const gridOffsetY = (frame * 1.5 * gridSpeed) % 60;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#020617', // Slate 950 deep base
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. Volumetric Radial Spotlights */}
      <div
        style={{
          position: 'absolute',
          inset: -150,
          background: `
            radial-gradient(circle at ${50 + lightShiftX * 0.1}% ${35 + lightShiftY * 0.1}%, rgba(30, 27, 75, 0.55) 0%, rgba(15, 23, 42, 0.85) 50%, rgba(2, 6, 23, 0.98) 100%),
            radial-gradient(circle at ${30 - lightShiftX * 0.08}% ${70 - lightShiftY * 0.08}%, rgba(12, 74, 110, 0.25) 0%, transparent 60%)
          `,
        }}
      />

      {/* 2. Perspective Technical Grid */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.18,
            maskImage: 'radial-gradient(circle at 50% 45%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 20%, transparent 75%)',
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="techGridPattern"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(0, ${gridOffsetY})`}
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                <circle cx="0" cy="0" r="1.5" fill="#38bdf8" opacity="0.9" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#techGridPattern)" />
          </svg>
        </div>
      )}

      {/* 3. Ambient Floating Constellation Particles */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%">
          {[
            { x: 250, y: 180, r: 2.5, d: 45 },
            { x: 520, y: 320, r: 1.8, d: 60 },
            { x: 840, y: 150, r: 3.0, d: 50 },
            { x: 1150, y: 280, r: 2.0, d: 70 },
            { x: 1450, y: 190, r: 3.2, d: 55 },
            { x: 1720, y: 360, r: 2.2, d: 65 },
            { x: 380, y: 720, r: 2.8, d: 80 },
            { x: 720, y: 840, r: 2.0, d: 75 },
            { x: 1200, y: 760, r: 2.6, d: 60 },
            { x: 1580, y: 820, r: 3.5, d: 90 },
          ].map((pt, i) => {
            const floatY = Math.sin((frame / pt.d) * Math.PI * 2) * 12;
            const floatX = Math.cos((frame / (pt.d * 1.2)) * Math.PI * 2) * 8;
            const opacity = interpolate(
              Math.sin((frame / (pt.d * 0.8)) * Math.PI),
              [-1, 1],
              [0.3, 0.85]
            );
            return (
              <circle
                key={i}
                cx={pt.x + floatX}
                cy={pt.y + floatY}
                r={pt.r}
                fill={i % 2 === 0 ? primaryGlowColor : secondaryGlowColor}
                opacity={opacity}
                filter="drop-shadow(0 0 6px rgba(56, 189, 248, 0.8))"
              />
            );
          })}
        </svg>
      </div>

      {/* 4. Cinematic Lens Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(2, 6, 23, 0.75) 100%)',
        }}
      />
    </div>
  );
};
