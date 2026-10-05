import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface AmbientGridV10Props {
  color?: string;
  glowColor?: string;
  gridOpacity?: number;
}

/**
 * AMBIENT GRID & STRUCTURAL DEPTH CANVAS (ROLE D — SPATIAL TEXTURE)
 * Museum-grade broadcast engineering register:
 * - 240px Cartesian coordinate grid with micro crosshairs (+)
 * - Margin calibration ticks in all 4 corners with technical registration metadata
 * - Subtle living scanning beam across the deep canvas
 * - Non-intrusive, anti-UI, cinematic depth anchor
 */
export const AmbientGridV10: React.FC<AmbientGridV10Props> = ({
  color = 'rgba(56, 189, 248, 0.05)',
  glowColor = 'rgba(56, 189, 248, 0.03)',
  gridOpacity = 1.0,
}) => {
  const frame = useCurrentFrame();

  // Subtle living scan wave in background (150 frame period)
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
            id="v10-grid-pattern"
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

        <rect width="100%" height="100%" fill="url(#v10-grid-pattern)" />

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
          <path d="M 90 1030 L 70 1030 L 70 1010" fill="none" />
        </g>
      </svg>

      {/* Subtle Living Vertical Scanning Beam */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: scanX,
          width: 80,
          background:
            'linear-gradient(to right, transparent, rgba(56, 189, 248, 0.02), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Engineering Metadata */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Yekan Bakh, sans-serif',
          fontSize: 11,
          letterSpacing: '0.15em',
          color: 'rgba(148, 163, 184, 0.35)',
          textTransform: 'uppercase',
          direction: 'ltr',
        }}
      >
        <span>SYS.SPEC // 1920x1080 @ 30FPS</span>
        <span>ACCREDITATION STANDARDS // DECREE KA-2</span>
        <span>BMSU PROTOCOL // 1403-1404</span>
      </div>

      {/* Bottom Footer Coordinate Datum */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Yekan Bakh, monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'rgba(148, 163, 184, 0.25)',
          direction: 'ltr',
        }}
      >
        <span>SEC.240.CARTESIAN</span>
        <span>FRM.{frame.toString().padStart(4, '0')}</span>
        <span>GEO.COORD.35.7°N 51.4°E</span>
      </div>
    </div>
  );
};
