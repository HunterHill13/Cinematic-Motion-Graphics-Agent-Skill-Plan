/**
 * ============================================================================
 * GRAPHITE CIRCUIT BACKDROP (ENGINEERING / AI / HARDWARE / CLOUD ARCHETYPE)
 * ============================================================================
 * 
 * Cinematic Dark Graphite & Circuit Telemetry Backdrop:
 * - Obsidian Graphite carbon foundation (#07090e -> #0d121f)
 * - 45° and 90° PCB bus traces with live flowing data-packet photons
 * - Multi-layer 3D parallax responsive to camera coordinates (camX, camY, roll, pitch)
 * - Hardware telemetry HUD glyphs (BUS_CLK, REG_0x8F, 124_BPM, CHIP_ALIGN)
 * - Microchip pin array footprints and technical CAD grid lines
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface GraphiteCircuitBackdropProps {
  camX?: number;
  camY?: number;
  camZ?: number;
  camRoll?: number;
  camPitch?: number;
  accentColor?: string; // default: #06b6d4 (cyan)
  secondaryColor?: string; // default: #10b981 (emerald)
}

export const GraphiteCircuitBackdrop: React.FC<GraphiteCircuitBackdropProps> = ({
  camX = 0,
  camY = 0,
  camZ = 0,
  camRoll = 0,
  camPitch = 0,
  accentColor = '#06b6d4',
  secondaryColor = '#10b981',
}) => {
  const frame = useCurrentFrame();

  // Multi-layer 3D Parallax offsets
  const deepParallaxX = -camX * 0.08;
  const deepParallaxY = -camY * 0.08;
  const midParallaxX = -camX * 0.22;
  const midParallaxY = -camY * 0.22;

  // Flowing data packets traveling along PCB traces
  const packetOffset1 = (frame * 3.5) % 800;
  const packetOffset2 = ((frame + 60) * 4.2) % 950;
  const packetOffset3 = ((frame + 120) * 3.0) % 700;

  // Pulse intensity
  const pulseOpacity = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1],
    [0.35, 0.75]
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#07090e',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. DEEP CARBON RADIAL GLOW & LIGHTING VIGNETTE */}
      <div
        style={{
          position: 'absolute',
          inset: -200,
          transform: `translate3d(${deepParallaxX}px, ${deepParallaxY}px, 0px) rotate(${camRoll * 0.15}deg)`,
          background: `
            radial-gradient(ellipse 65% 55% at 50% 35%, rgba(13, 27, 46, 0.75) 0%, rgba(7, 10, 18, 0.95) 70%, #05070a 100%),
            radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 45%)
          `,
        }}
      />

      {/* 2. ISOMETRIC TECHNICAL CAD GRID (DEEP LAYER) */}
      <div
        style={{
          position: 'absolute',
          inset: -100,
          transform: `translate3d(${deepParallaxX * 1.2}px, ${deepParallaxY * 1.2}px, 0px)`,
          opacity: 0.22,
          maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="graphiteCadGrid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="0.8"
              />
              <circle cx="0" cy="0" r="1.5" fill={accentColor} opacity="0.6" />
              <path
                d="M 32 30 L 32 34 M 30 32 L 34 32"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#graphiteCadGrid)" />
        </svg>
      </div>

      {/* 3. PCB BUS TRACES & FLOWING DATA PACKETS (MID LAYER) */}
      <div
        style={{
          position: 'absolute',
          inset: -150,
          transform: `translate3d(${midParallaxX}px, ${midParallaxY}px, 0px) rotate(${camRoll * 0.3}deg)`,
          opacity: 0.65,
        }}
      >
        <svg width="2220" height="1380" viewBox="0 0 2220 1380" fill="none">
          {/* Main bus trace paths (45 & 90 degree circuit lines) */}
          <g stroke="rgba(56, 189, 248, 0.22)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Top-left circuit network */}
            <path d="M 120 150 L 450 150 L 580 280 L 980 280 L 1040 340 L 1400 340" />
            <path d="M 280 80 L 360 80 L 440 160 L 720 160" />
            <path d="M 450 150 L 450 240 L 510 300" />
            
            {/* Bottom-right circuit network */}
            <path d="M 800 1200 L 1100 1200 L 1250 1050 L 1750 1050 L 1880 920 L 2100 920" />
            <path d="M 1250 1050 L 1250 940 L 1380 810 L 1650 810" />
            <path d="M 1500 1150 L 1620 1150 L 1720 1050" />

            {/* Microchip pin clusters */}
            <rect x="710" y="145" width="24" height="30" rx="3" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" />
            <rect x="1640" y="795" width="28" height="30" rx="3" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" />
          </g>

          {/* Solder junction nodes */}
          <g fill={accentColor} opacity="0.75">
            <circle cx="450" cy="150" r="3.5" />
            <circle cx="580" cy="280" r="3.5" />
            <circle cx="980" cy="280" r="3.5" />
            <circle cx="1040" cy="340" r="3.5" />
            <circle cx="1250" cy="1050" r="3.5" />
            <circle cx="1750" cy="1050" r="3.5" />
            <circle cx="1880" cy="920" r="3.5" />
          </g>

          {/* Flowing Data-Packet Photons (Laser energy traveling through traces) */}
          <circle
            cx={interpolate(packetOffset1, [0, 330, 460, 800], [120, 450, 580, 980], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            cy={interpolate(packetOffset1, [0, 330, 460, 800], [150, 150, 280, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            r="4"
            fill="#ffffff"
            filter="drop-shadow(0 0 8px #06b6d4)"
            opacity={pulseOpacity}
          />
          <circle
            cx={interpolate(packetOffset2, [0, 300, 450, 950], [800, 1100, 1250, 1750], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            cy={interpolate(packetOffset2, [0, 300, 450, 950], [1200, 1200, 1050, 1050], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            r="4.5"
            fill="#34d399"
            filter="drop-shadow(0 0 10px #10b981)"
            opacity={pulseOpacity}
          />
          <circle
            cx={interpolate(packetOffset3, [0, 120, 240, 700], [280, 360, 440, 720], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            cy={interpolate(packetOffset3, [0, 120, 240, 700], [80, 80, 160, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            r="3"
            fill="#38bdf8"
            filter="drop-shadow(0 0 6px #38bdf8)"
          />

          {/* Telemetry HUD Glyphs & Corner Brackets */}
          <g fill="rgba(148, 163, 184, 0.4)" fontFamily="monospace" fontSize="11" letterSpacing="1">
            <text x="140" y="130">SYS_BUS // 0x4F09</text>
            <text x="140" y="145">TRACE_CLK: 124.0 BPM</text>
            <text x="1890" y="900">NODE_ACK: STABLE</text>
            <text x="1890" y="915">LATENCY: 1.2MS</text>
          </g>

          {/* Technical Corner Brackets */}
          <g stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" fill="none">
            <path d="M 60 90 L 60 60 L 90 60" />
            <path d="M 2160 90 L 2160 60 L 2130 60" />
            <path d="M 60 1290 L 60 1320 L 90 1320" />
            <path d="M 2160 1290 L 2160 1320 L 2130 1320" />
          </g>
        </svg>
      </div>

      {/* 4. FOREGROUND AMBIENT OPTICAL PARTICLES */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(5, 7, 10, 0.75) 100%)',
        }}
      />
    </div>
  );
};
