/**
 * ============================================================================
 * FOREGROUND SHALLOW DEPTH-OF-FIELD BOKEH LAYER
 * ============================================================================
 * 
 * Simulates extreme foreground out-of-focus optics (f/1.4 prime lens bokeh).
 * Elements move with 1.4x - 1.6x differential parallax speed relative to
 * camera flight, establishing unambiguous spatial layering.
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface ForegroundBokehLayerProps {
  camX?: number;
  camY?: number;
}

export const ForegroundBokehLayer: React.FC<ForegroundBokehLayerProps> = ({
  camX = 0,
  camY = 0,
}) => {
  const frame = useCurrentFrame();

  // Multi-plane bokeh orbs with differential parallax coordinates
  const particles = [
    { baseX: 200, baseY: 180, size: 140, color: '#38bdf8', blur: 16, opacity: 0.22, parallaxFactor: 1.5, driftSpeed: 0.15 },
    { baseX: 1680, baseY: 320, size: 180, color: '#818cf8', blur: 20, opacity: 0.18, parallaxFactor: 1.6, driftSpeed: -0.12 },
    { baseX: 420, baseY: 850, size: 210, color: '#a855f7', blur: 24, opacity: 0.25, parallaxFactor: 1.4, driftSpeed: 0.18 },
    { baseX: 1540, baseY: 880, size: 160, color: '#06b6d4', blur: 18, opacity: 0.20, parallaxFactor: 1.55, driftSpeed: -0.14 },
    { baseX: 960, baseY: 980, size: 240, color: '#10b981', blur: 28, opacity: 0.16, parallaxFactor: 1.7, driftSpeed: 0.08 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 800,
      }}
    >
      {particles.map((p, idx) => {
        const drift = Math.sin((frame * p.driftSpeed * Math.PI) / 60) * 25;
        const x = p.baseX - camX * p.parallaxFactor + drift;
        const y = p.baseY - camY * p.parallaxFactor + drift * 0.5;

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: x - p.size / 2,
              top: y - p.size / 2,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              filter: `blur(${p.blur}px)`,
              opacity: p.opacity,
              transform: 'translateZ(140px)',
            }}
          />
        );
      })}
    </div>
  );
};
