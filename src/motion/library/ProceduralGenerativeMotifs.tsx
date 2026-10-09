/**
 * ============================================================================
 * PROCEDURAL GENERATIVE VISUAL MOTIFS (CLAUDE OPUS 5.5 MATHEMATICAL ART)
 * ============================================================================
 * 
 * Implements living, code-driven mathematical geometry:
 * 1. LissajousOrbit: Trigonometric multi-frequency parametric curve knot with glowing nodes.
 * 2. ParametricWaveformStream: Dynamic harmonic wave superposition (biomedical/data telemetry).
 * 3. KineticGridMatrix: Perspective-warped coordinate grid with pulsing crosshair intersections.
 * ============================================================================
 */

import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

// ============================================================================
// 1. LISSAJOUS PARAMETRIC ORBIT
// ============================================================================
export interface LissajousOrbitProps {
  cx?: number;
  cy?: number;
  size?: number;
  color?: string;
  glowColor?: string;
  pointsCount?: number;
  freqA?: number;
  freqB?: number;
  delta?: number;
}

export const LissajousOrbit: React.FC<LissajousOrbitProps> = ({
  cx = 960,
  cy = 540,
  size = 280,
  color = '#38bdf8',
  glowColor = 'rgba(56, 189, 248, 0.45)',
  pointsCount = 90,
  freqA = 3,
  freqB = 4,
  delta = Math.PI / 2,
}) => {
  const frame = useCurrentFrame();
  const time = frame * 0.028;

  const pathData = useMemo(() => {
    let d = '';
    const points: [number, number][] = [];

    for (let i = 0; i <= pointsCount; i++) {
      const theta = (i / pointsCount) * Math.PI * 2;
      const x = (size / 2) * Math.sin(freqA * theta + delta + time);
      const y = (size / 2) * Math.sin(freqB * theta);
      points.push([x, y]);
      if (i === 0) {
        d += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      } else {
        d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
    }
    return { d, leadPoint: points[Math.floor(points.length * ((time * 0.5) % 1))] || points[0] };
  }, [pointsCount, size, freqA, freqB, delta, time]);

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      {/* Outer ambient blur */}
      <path
        d={pathData.d}
        fill="none"
        stroke={glowColor}
        strokeWidth={6}
        style={{ filter: 'blur(8px)', opacity: 0.7 }}
      />
      {/* Sharp core trajectory */}
      <path
        d={pathData.d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray="4 2"
        style={{ opacity: 0.85 }}
      />
      {/* Leading celestial photon bead */}
      {pathData.leadPoint && (
        <circle
          cx={pathData.leadPoint[0]}
          cy={pathData.leadPoint[1]}
          r={5}
          fill="#ffffff"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      )}
    </g>
  );
};

// ============================================================================
// 2. PARAMETRIC WAVEFORM STREAM (BIOMEDICAL / DATA HARMONICS)
// ============================================================================
export interface ParametricWaveformStreamProps {
  x?: number;
  y?: number;
  width?: number;
  amplitude?: number;
  color?: string;
  speed?: number;
  harmonics?: number;
}

export const ParametricWaveformStream: React.FC<ParametricWaveformStreamProps> = ({
  x = 0,
  y = 0,
  width = 700,
  amplitude = 28,
  color = '#22d3ee',
  speed = 0.08,
  harmonics = 3,
}) => {
  const frame = useCurrentFrame();
  const t = frame * speed;

  const d = useMemo(() => {
    const steps = 80;
    let path = '';
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const px = progress * width;
      // Multi-harmonic superposition: base + 2nd overtone + 3rd micro-flutter
      const py =
        amplitude * Math.sin(progress * Math.PI * 4 + t) *
        Math.sin(progress * Math.PI) + // Envelope dampening at edges
        (amplitude * 0.35) * Math.sin(progress * Math.PI * 8 - t * 1.5) * Math.sin(progress * Math.PI);

      if (i === 0) {
        path += `M ${px.toFixed(1)} ${py.toFixed(1)}`;
      } else {
        path += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
      }
    }
    return path;
  }, [width, amplitude, t]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 10px ${color})`,
          opacity: 0.9,
        }}
      />
    </g>
  );
};

// ============================================================================
// 3. KINETIC COORDINATE GRID MATRIX
// ============================================================================
export interface KineticGridMatrixProps {
  width?: number;
  height?: number;
  spacing?: number;
  color?: string;
}

export const KineticGridMatrix: React.FC<KineticGridMatrixProps> = ({
  width = 1920,
  height = 1080,
  spacing = 120,
  color = 'rgba(56, 189, 248, 0.08)',
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.6 + 0.4 * Math.sin(frame * 0.05);

  const lines = useMemo(() => {
    const vLines: number[] = [];
    const hLines: number[] = [];
    for (let x = 0; x <= width; x += spacing) vLines.push(x);
    for (let y = 0; y <= height; y += spacing) hLines.push(y);
    return { vLines, hLines };
  }, [width, height, spacing]);

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: pulse,
      }}
    >
      {lines.vLines.map((x) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="2 4"
        />
      ))}
      {lines.hLines.map((y) => (
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="2 4"
        />
      ))}
    </svg>
  );
};
