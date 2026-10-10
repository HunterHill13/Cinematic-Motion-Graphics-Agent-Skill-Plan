/**
 * ============================================================================
 * BIOLUMINESCENT ABYSS BACKDROP (QUANTUM BIO / MEDICINE / GENOMICS ARCHETYPE)
 * ============================================================================
 * 
 * Cinematic Oceanic & Quantum Abyss:
 * - Deep Marine Abyss foundation (#010b08 -> #021a14 -> #042d22)
 * - Drifting organic cellular vesicles & lipid bilayer membranes with undulating walls
 * - Bioluminescent caustic light rays pulsating with organic cadence
 * - Deep-Z camera-coupled spore/quantum particle tunnel: particles zoom past camera
 *   with optical bokeh blur as camZ penetrates through depth (0 -> 4800)
 * - Chromatic emerald/cyan/marine color space
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface BioluminescentAbyssBackdropProps {
  camX?: number;
  camY?: number;
  camZ?: number;
  camRoll?: number;
  camPitch?: number;
  glowColorPrimary?: string; // default: #10b981 (emerald)
  glowColorSecondary?: string; // default: #06b6d4 (cyan)
}

export const BioluminescentAbyssBackdrop: React.FC<BioluminescentAbyssBackdropProps> = ({
  camX = 0,
  camY = 0,
  camZ = 0,
  camRoll = 0,
  camPitch = 0,
  glowColorPrimary = '#10b981',
  glowColorSecondary = '#06b6d4',
}) => {
  const frame = useCurrentFrame();

  // Caustic breathing
  const causticPulse = Math.sin((frame / 40) * Math.PI) * 0.15 + 0.85;

  // Organic membrane undulations
  const membraneWobble1 = Math.sin((frame / 50) * Math.PI) * 12;
  const membraneWobble2 = Math.cos((frame / 65) * Math.PI) * 15;

  // Parallax offsets
  const parallaxX = -camX * 0.1;
  const parallaxY = -camY * 0.1;

  // 24 Deep-Z Floating Spore / Nanoparticle Seeds
  const sporeSeeds = [
    { seedX: 300, seedY: 200, baseZ: 400, size: 8, color: '#34d399' },
    { seedX: 1600, seedY: 300, baseZ: 900, size: 12, color: '#06b6d4' },
    { seedX: 600, seedY: 800, baseZ: 1400, size: 10, color: '#6ee7b7' },
    { seedX: 1400, seedY: 750, baseZ: 1900, size: 14, color: '#10b981' },
    { seedX: 400, seedY: 450, baseZ: 2500, size: 9, color: '#38bdf8' },
    { seedX: 1700, seedY: 600, baseZ: 3100, size: 16, color: '#34d399' },
    { seedX: 950, seedY: 250, baseZ: 3600, size: 11, color: '#a7f3d0' },
    { seedX: 800, seedY: 900, baseZ: 4200, size: 15, color: '#06b6d4' },
    { seedX: 250, seedY: 850, baseZ: 4700, size: 10, color: '#10b981' },
    { seedX: 1500, seedY: 150, baseZ: 800, size: 7, color: '#34d399' },
    { seedX: 1100, seedY: 650, baseZ: 2100, size: 13, color: '#6ee7b7' },
    { seedX: 350, seedY: 700, baseZ: 3300, size: 8, color: '#38bdf8' },
    { seedX: 1300, seedY: 400, baseZ: 1600, size: 11, color: '#10b981' },
    { seedX: 700, seedY: 180, baseZ: 2800, size: 14, color: '#06b6d4' },
    { seedX: 1650, seedY: 850, baseZ: 3900, size: 9, color: '#34d399' },
    { seedX: 500, seedY: 350, baseZ: 4500, size: 12, color: '#a7f3d0' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#010c09',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. DEEP BIOLUMINESCENT VOLUMETRIC GRADIENT */}
      <div
        style={{
          position: 'absolute',
          inset: -200,
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0px) rotate(${camRoll * 0.2}deg)`,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 40%, rgba(4, 45, 34, 0.85) 0%, rgba(2, 22, 16, 0.95) 60%, #010806 100%),
            radial-gradient(circle at 25% 30%, rgba(16, 185, 129, 0.18) 0%, transparent 55%),
            radial-gradient(circle at 75% 70%, rgba(6, 182, 212, 0.14) 0%, transparent 60%)
          `,
        }}
      />

      {/* 2. BIOLUMINESCENT CAUSTIC LIGHT RAYS */}
      <div
        style={{
          position: 'absolute',
          inset: -100,
          opacity: 0.35 * causticPulse,
          maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 80%)',
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="causticBeam" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="400,0 650,0 950,1280 600,1280" fill="url(#causticBeam)" opacity="0.4" />
          <polygon points="1200,0 1450,0 1850,1280 1500,1280" fill="url(#causticBeam)" opacity="0.3" />
          <polygon points="800,0 1000,0 1300,1280 1050,1280" fill="url(#causticBeam)" opacity="0.25" />
        </svg>
      </div>

      {/* 3. FLOATING ORGANIC CELLULAR VESICLES / MEMBRANES */}
      <div
        style={{
          position: 'absolute',
          inset: -150,
          transform: `translate3d(${parallaxX * 1.4}px, ${parallaxY * 1.4}px, 0px)`,
        }}
      >
        <svg width="2220" height="1380" viewBox="0 0 2220 1380" fill="none">
          {/* Top-left undulating lipid vesicle */}
          <path
            d={`
              M 350 ${220 + membraneWobble1}
              C 480 ${180 - membraneWobble2}, 620 ${260 + membraneWobble1}, 650 ${400}
              C 680 ${540 + membraneWobble2}, 540 ${660 - membraneWobble1}, 400 ${640}
              C 260 ${620 + membraneWobble2}, 220 ${480 - membraneWobble1}, 240 ${340}
              Z
            `}
            fill="rgba(16, 185, 129, 0.03)"
            stroke="rgba(52, 211, 153, 0.18)"
            strokeWidth="2.5"
            strokeDasharray="6 8"
          />

          {/* Internal nucleus silhouette */}
          <circle
            cx={440 + membraneWobble2 * 0.5}
            cy={430 + membraneWobble1 * 0.5}
            r="70"
            fill="rgba(6, 182, 212, 0.05)"
            stroke="rgba(6, 182, 212, 0.25)"
            strokeWidth="1.5"
          />

          {/* Bottom-right undulating organic membrane */}
          <path
            d={`
              M 1600 ${850 + membraneWobble2}
              C 1780 ${780 - membraneWobble1}, 1950 ${860 + membraneWobble2}, 1980 ${1020}
              C 2010 ${1180 - membraneWobble2}, 1840 ${1290 + membraneWobble1}, 1680 ${1260}
              C 1520 ${1230 - membraneWobble1}, 1460 ${1080 + membraneWobble2}, 1490 ${960}
              Z
            `}
            fill="rgba(6, 182, 212, 0.03)"
            stroke="rgba(56, 189, 248, 0.18)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        </svg>
      </div>

      {/* 4. DEEP-Z SPORE TUNNEL PARTICLES (PENETRATING Z DEPTH) */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {sporeSeeds.map((spore, idx) => {
          // Relative distance from camera Z
          const relZ = spore.baseZ - (camZ * 0.9);
          // Cyclic wrap-around through 4800 Z-space
          const wrappedZ = ((relZ % 4800) + 4800) % 4800;

          // Camera push-in zoom factor: objects closer to camera (lower wrappedZ) become huge and blur out
          const zDepth = Math.max(50, wrappedZ);
          const scale = interpolate(zDepth, [50, 600, 2400, 4800], [4.5, 2.0, 1.0, 0.35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const opacity = interpolate(zDepth, [50, 300, 3500, 4800], [0, 0.85, 0.5, 0.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const blur = interpolate(zDepth, [50, 400, 1200, 4800], [14, 2, 0, 5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const px = spore.seedX + (Math.sin((frame + idx * 30) / 45) * 20) + (parallaxX * (1 + (1 / (scale + 0.1))));
          const py = spore.seedY + (Math.cos((frame + idx * 25) / 50) * 18) + (parallaxY * (1 + (1 / (scale + 0.1))));

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: px,
                top: py,
                width: spore.size * scale,
                height: spore.size * scale,
                borderRadius: '50%',
                backgroundColor: spore.color,
                boxShadow: `0 0 ${12 * scale}px ${spore.color}`,
                opacity,
                filter: `blur(${blur}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>

      {/* 5. DEEP OCEANIC VIGNETTE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(1, 10, 7, 0.85) 100%)',
        }}
      />
    </div>
  );
};
