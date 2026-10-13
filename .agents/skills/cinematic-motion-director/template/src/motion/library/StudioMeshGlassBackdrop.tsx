import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface StudioMeshGlassBackdropProps {
  camX?: number;
  camY?: number;
  camZ?: number;
  primaryLightColor?: string;
  accentGlowColor?: string;
}

export const StudioMeshGlassBackdrop: React.FC<StudioMeshGlassBackdropProps> = ({
  camX = 0,
  camY = 0,
  camZ = 0,
  primaryLightColor = '#6366f1',
  accentGlowColor = '#a855f7',
}) => {
  const frame = useCurrentFrame();

  // Organic spotlight drift
  const lightOrbitX1 = Math.sin((frame / 90) * Math.PI) * 120;
  const lightOrbitY1 = Math.cos((frame / 110) * Math.PI) * 80;
  const lightOrbitX2 = Math.cos((frame / 80) * Math.PI) * 100;
  const lightOrbitY2 = Math.sin((frame / 100) * Math.PI) * 70;

  // Parallax offsets (integer rounded for zero jitter)
  const parallaxX = Math.round(-camX * 0.15);
  const parallaxY = Math.round(-camY * 0.15);
  const depthScale = 1 + camZ * 0.0003;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#070a14',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. LIVING VOLUMETRIC MESH GRADIENT */}
      <div
        style={{
          position: 'absolute',
          inset: -250,
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0px) scale(${depthScale})`,
          background: `
            radial-gradient(circle at ${40 + lightOrbitX1 * 0.08}% ${35 + lightOrbitY1 * 0.08}% in oklch, ${primaryLightColor}44 0%, transparent 55%),
            radial-gradient(circle at ${65 + lightOrbitX2 * 0.08}% ${65 + lightOrbitY2 * 0.08}% in oklch, ${accentGlowColor}33 0%, transparent 60%),
            radial-gradient(circle at 50% 50% in oklch, rgba(15, 23, 42, 0.88) 0%, #050811 100%)
          `,
        }}
      />

      {/* 2. SUBTLE OPEN-CANVAS DOT CONSTELLATION FIELD */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.22,
          maskImage: 'radial-gradient(circle at 50% 50%, black 35%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 35%, transparent 80%)',
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="studioDotGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1.4" fill={primaryLightColor} opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#studioDotGrid)" />
        </svg>
      </div>

      {/* 3. SOFT STUDIO VIGNETTE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 58%, rgba(5, 8, 17, 0.82) 100%)',
        }}
      />
    </div>
  );
};
