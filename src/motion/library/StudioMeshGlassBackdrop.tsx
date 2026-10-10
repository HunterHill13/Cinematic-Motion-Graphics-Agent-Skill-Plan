/**
 * ============================================================================
 * STUDIO MESH GLASS BACKDROP (UI/UX MORPH / SAAS / DESIGN SYSTEM ARCHETYPE)
 * ============================================================================
 * 
 * High-End Architectural Studio Canvas:
 * - Deep Indigo / Royal Twilight foundation (#090c1b -> #1e1b4b)
 * - Multi-point organic mesh gradient with slow studio spotlight breathing
 * - Floating frosted glass panels & isometric wireframes in 3D parallax depth
 * - Architectural dot-matrix grid with soft radial illumination
 * - Responsive 3D camera parallax (camX, camY, camZ breathing)
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface StudioMeshGlassBackdropProps {
  camX?: number;
  camY?: number;
  camZ?: number;
  primaryLightColor?: string; // default: #6366f1 (indigo)
  accentGlowColor?: string; // default: #a855f7 (purple)
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

  // Parallax offsets
  const parallaxX = -camX * 0.15;
  const parallaxY = -camY * 0.15;
  const depthScale = 1 + (camZ * 0.0003);

  // Floating background glass panel drift
  const floatCard1Y = Math.sin((frame / 70) * Math.PI) * 15;
  const floatCard2Y = Math.cos((frame / 85) * Math.PI) * 18;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#090d1e',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. LIVING ORGANIC MESH GRADIENT */}
      <div
        style={{
          position: 'absolute',
          inset: -250,
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0px) scale(${depthScale})`,
          background: `
            radial-gradient(circle at ${40 + lightOrbitX1 * 0.08}% ${35 + lightOrbitY1 * 0.08}%, rgba(99, 102, 241, 0.22) 0%, transparent 55%),
            radial-gradient(circle at ${65 + lightOrbitX2 * 0.08}% ${65 + lightOrbitY2 * 0.08}%, rgba(168, 85, 247, 0.18) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(30, 27, 75, 0.85) 0%, #070914 100%)
          `,
        }}
      />

      {/* 2. ARCHITECTURAL STUDIO DOT GRID */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          maskImage: 'radial-gradient(circle at 50% 50%, black 35%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 35%, transparent 80%)',
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="studioDotGrid"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="18" cy="18" r="1.5" fill="#818cf8" opacity="0.65" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#studioDotGrid)" />
        </svg>
      </div>

      {/* 3. FLOATING ARCHITECTURAL FROSTED GLASS PANELS (DEPTH PARALLAX) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate3d(${parallaxX * 1.5}px, ${parallaxY * 1.5}px, 0px)`,
        }}
      >
        {/* Left top floating architectural glass card */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '6%',
            width: 320,
            height: 200,
            transform: `translateY(${floatCard1Y}px) rotate(-6deg)`,
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(16px)',
            opacity: 0.45,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.4)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(234, 179, 8, 0.4)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.4)' }} />
          </div>
          <div style={{ width: '60%', height: 10, borderRadius: 5, background: 'rgba(129, 140, 248, 0.2)' }} />
          <div style={{ width: '85%', height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.05)' }} />
          <div style={{ width: '70%', height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.05)' }} />
        </div>

        {/* Right bottom floating architectural wireframe card */}
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '8%',
            width: 360,
            height: 220,
            transform: `translateY(${floatCard2Y}px) rotate(8deg)`,
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(168, 85, 247, 0.02) 100%)',
            border: '1px solid rgba(129, 140, 248, 0.15)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px)',
            opacity: 0.5,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99, 102, 241, 0.2)' }} />
            <div style={{ width: 60, height: 16, borderRadius: 8, background: 'rgba(168, 85, 247, 0.25)' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 80 }}>
            <div style={{ flex: 1, height: '40%', borderRadius: 4, background: 'rgba(99, 102, 241, 0.25)' }} />
            <div style={{ flex: 1, height: '70%', borderRadius: 4, background: 'rgba(129, 140, 248, 0.35)' }} />
            <div style={{ flex: 1, height: '55%', borderRadius: 4, background: 'rgba(168, 85, 247, 0.3)' }} />
            <div style={{ flex: 1, height: '90%', borderRadius: 4, background: 'rgba(99, 102, 241, 0.45)' }} />
          </div>
        </div>
      </div>

      {/* 4. SOFT STUDIO LIGHTING RIM & VIGNETTE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(6, 9, 20, 0.8) 100%)',
        }}
      />
    </div>
  );
};
