import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface AmbientGridProps {
  color?: string;
  glowColor?: string;
  gridOpacity?: number;
}

/**
 * AMBIENT GRID & STRUCTURAL DEPTH CANVAS (LAYER 1)
 * Rich editorial ambient layer:
 * - 240px Cartesian coordinate grid with micro intersection crosshairs (+)
 * - Margin calibration ticks in all 4 corners with technical registration metadata
 * - Subtle living scanning beam across the deep canvas
 * - Non-intrusive, anti-UI, museum-grade broadcast engineering register
 */
export const AmbientGrid: React.FC<AmbientGridProps> = ({
  color = 'rgba(56, 189, 248, 0.06)',
  glowColor = 'rgba(56, 189, 248, 0.04)',
  gridOpacity = 1.0,
}) => {
  const frame = useCurrentFrame();

  // Subtle living scan wave in background (120 frame period)
  const scanX = interpolate(frame % 150, [0, 150], [-200, 2120]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: gridOpacity,
      }}
    >
      {/* SVG Coordinate Grid & Crosshairs */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <pattern
            id="v9-grid-pattern"
            width={240}
            height={240}
            patternUnits="userSpaceOnUse"
          >
            {/* Grid Lines */}
            <path
              d="M 240 0 L 0 0 0 240"
              fill="none"
              stroke={color}
              strokeWidth={1}
            />
            {/* Intersection Crosshairs */}
            <path
              d="M -6 0 L 6 0 M 0 -6 L 0 6"
              fill="none"
              stroke={glowColor}
              strokeWidth={1}
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#v9-grid-pattern)" />

        {/* Margin Calibration Ticks (Top & Bottom) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 240 + i * 200;
          return (
            <React.Fragment key={`tick-${i}`}>
              <line
                x1={x}
                y1={40}
                x2={x}
                y2={48}
                stroke={color}
                strokeWidth={1.5}
              />
              <line
                x1={x}
                y1={1032}
                x2={x}
                y2={1040}
                stroke={color}
                strokeWidth={1.5}
              />
            </React.Fragment>
          );
        })}

        {/* 4 Corner Registration Crosshairs */}
        <g stroke={color} strokeWidth={1.5}>
          {/* Top-Right (RTL Start) */}
          <path d="M 1830 50 L 1850 50 M 1850 50 L 1850 70" fill="none" />
          {/* Top-Left */}
          <path d="M 90 50 L 70 50 M 70 50 L 70 70" fill="none" />
          {/* Bottom-Right */}
          <path d="M 1830 1030 L 1850 1030 M 1850 1030 L 1850 1010" fill="none" />
          {/* Bottom-Left */}
          <path d="M 90 1030 L 70 1030 M 70 1030 L 70 1010" fill="none" />
        </g>
      </svg>

      {/* Living Atmospheric Scan Beam */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: scanX,
          width: 80,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.03) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Technical Editorial Corner Labels (Layer 1 Metadata) */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          right: 90,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: '2px',
          color: 'rgba(148, 163, 184, 0.4)',
          textTransform: 'uppercase',
          direction: 'ltr',
        }}
      >
        REF: BMSU.MED // DIR: ED-V9
      </div>

      <div
        style={{
          position: 'absolute',
          top: 52,
          left: 90,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: '2px',
          color: 'rgba(148, 163, 184, 0.4)',
          textTransform: 'uppercase',
          direction: 'ltr',
        }}
      >
        1920x1080 // 30 FPS // FHD
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 52,
          right: 90,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: '2px',
          color: 'rgba(148, 163, 184, 0.35)',
          textTransform: 'uppercase',
          direction: 'ltr',
        }}
      >
        SRC.DECREE // SEC-K // ART-02
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 52,
          left: 90,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: '2px',
          color: 'rgba(148, 163, 184, 0.35)',
          textTransform: 'uppercase',
          direction: 'ltr',
        }}
      >
        PR.RESEARCH.COMMITTEE
      </div>
    </div>
  );
};
