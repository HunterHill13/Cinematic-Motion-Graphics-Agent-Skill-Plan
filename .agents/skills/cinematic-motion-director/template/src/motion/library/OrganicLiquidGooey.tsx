/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: ORGANIC LIQUID GOOEY & METABALL PHYSICS ENGINE
 * ============================================================================
 * 
 * Studio-grade liquid elasticity, surface tension, and metaball fusion powered
 * by SVG threshold filtering (feGaussianBlur + feColorMatrix).
 * 
 * 1. Self-contained SVG Gooey Filters with zero browser compositing artifacts.
 * 2. LiquidButtonSquash: Visceral button press squash-and-stretch with dynamic
 *    satellite micro-droplet emission and viscous surface-tension reabsorption.
 * 3. LiquidMitosisCore: Cellular mitotic division (split -> orbit -> viscous fuse)
 *    for hero state badges, vector morph cores, and focal actors.
 * 4. Style-Aware Fluid Shaders:
 *    - MODERN_GLASSMORPHIC: Caustic specular lighting & translucent glass gradients.
 *    - STOP_MOTION_PAPER: 12 FPS frame quantization & textured fibrous cohesion.
 *    - TECHNICAL_BLUEPRINT: CAD ferrofluid contour rings & crosshair coordinates.
 *    - NEO_BRUTALIST: High-contrast ink splat, hard stroke & 0-blur offset.
 * ============================================================================
 */

import React, { useId } from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { quantizeFrameForStopMotion } from '../visual_world/artStyleGate';

export type LiquidArtStyle = 
  | 'MODERN_GLASSMORPHIC'
  | 'STOP_MOTION_PAPER'
  | 'TECHNICAL_BLUEPRINT'
  | 'NEO_BRUTALIST';

// ============================================================================
// 1. REUSABLE SVG GOOEY FILTER
// ============================================================================
export interface LiquidFilterProps {
  id: string;
  blurRadius?: number;
  contrast?: number;
  threshold?: number;
}

export const LiquidGooeyFilter: React.FC<LiquidFilterProps> = ({
  id,
  blurRadius = 12,
  contrast = 19,
  threshold = -9,
}) => {
  return (
    <svg 
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurRadius} result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${threshold}`}
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

// ============================================================================
// 2. LIQUID BUTTON SQUASH & SATELLITE DROPLET EMISSION
// ============================================================================
export interface LiquidButtonSquashProps {
  children?: React.ReactNode;
  clickFrame: number;
  width?: number;
  height?: number;
  primaryColor?: string;
  accentColor?: string;
  artStyle?: LiquidArtStyle;
  style?: React.CSSProperties;
}

export const LiquidButtonSquash: React.FC<LiquidButtonSquashProps> = ({
  children,
  clickFrame,
  width = 240,
  height = 56,
  primaryColor = '#3b82f6',
  accentColor = '#06b6d4',
  artStyle = 'MODERN_GLASSMORPHIC',
  style,
}) => {
  const rawFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const filterId = useId().replace(/:/g, '_') + '_btn_goo';

  const frame = artStyle === 'STOP_MOTION_PAPER' 
    ? quantizeFrameForStopMotion(rawFrame, 'stop_motion_12fps') 
    : rawFrame;

  // Frame relative to click
  const relFrame = frame - clickFrame;

  // Spring squash & stretch
  let scaleX = 1;
  let scaleY = 1;
  let dropletProgress = 0;

  if (relFrame >= 0 && relFrame < 60) {
    // Initial squash
    const squashSpring = spring({
      fps,
      frame: relFrame,
      config: { damping: 12, mass: 0.5, stiffness: 220 },
    });
    // Overshoot curve
    scaleX = interpolate(squashSpring, [0, 0.3, 0.7, 1], [1, 1.14, 0.96, 1]);
    scaleY = interpolate(squashSpring, [0, 0.3, 0.7, 1], [1, 0.84, 1.04, 1]);

    // Satellite droplets shoot out and retract with surface tension
    dropletProgress = interpolate(relFrame, [0, 8, 22], [0, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Droplet parameters (4 cardinal satellite droplets)
  const dropletRadius = 7;
  const maxDistance = 34;

  const dropletOffsets = [
    { x: 0, y: -maxDistance * dropletProgress }, // Top
    { x: maxDistance * dropletProgress * 1.2, y: 0 }, // Right
    { x: 0, y: maxDistance * dropletProgress }, // Bottom
    { x: -maxDistance * dropletProgress * 1.2, y: 0 }, // Left
  ];

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scaleX}, ${scaleY})`,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      <LiquidGooeyFilter id={filterId} blurRadius={artStyle === 'TECHNICAL_BLUEPRINT' ? 8 : 12} />

      {/* Fluid Gooey Layer Behind Children */}
      {relFrame >= 0 && relFrame < 26 && (
        <svg
          style={{
            position: 'absolute',
            width: width + 100,
            height: height + 100,
            left: -50,
            top: -50,
            pointerEvents: 'none',
            filter: `url(#${filterId})`,
            zIndex: 0,
          }}
          viewBox={`0 0 ${width + 100} ${height + 100}`}
        >
          <defs>
            <radialGradient id={`${filterId}_grad`} cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor={accentColor} stopOpacity={0.9} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0.95} />
            </radialGradient>
          </defs>

          {/* Central fluid membrane */}
          <rect
            x={50}
            y={50}
            width={width}
            height={height}
            rx={height / 2}
            fill={artStyle === 'NEO_BRUTALIST' ? primaryColor : `url(#${filterId}_grad)`}
            opacity={0.85}
          />

          {/* Satellite viscous droplets */}
          {dropletOffsets.map((offset, i) => (
            <circle
              key={i}
              cx={50 + width / 2 + offset.x}
              cy={50 + height / 2 + offset.y}
              r={dropletRadius * (1 - dropletProgress * 0.2)}
              fill={artStyle === 'NEO_BRUTALIST' ? accentColor : `url(#${filterId}_grad)`}
            />
          ))}
        </svg>
      )}

      {/* Button Children Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// 3. LIQUID MITOSIS CORE (HERO CELLULAR DIVISION & VISCOUS FUSION)
// ============================================================================
export interface LiquidMitosisCoreProps {
  size?: number;
  splitProgress: number; // 0 = Single Core, 1 = Full Mitotic Orbit, 0 = Coalesced
  primaryColor?: string;
  accentColor?: string;
  artStyle?: LiquidArtStyle;
  style?: React.CSSProperties;
}

export const LiquidMitosisCore: React.FC<LiquidMitosisCoreProps> = ({
  size = 280,
  splitProgress,
  primaryColor = '#6366f1',
  accentColor = '#06b6d4',
  artStyle = 'MODERN_GLASSMORPHIC',
  style,
}) => {
  const rawFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const filterId = useId().replace(/:/g, '_') + '_mitosis_goo';

  const frame = artStyle === 'STOP_MOTION_PAPER' 
    ? quantizeFrameForStopMotion(rawFrame, 'stop_motion_12fps') 
    : rawFrame;

  const center = size / 2;
  const coreRadius = size * 0.18;
  const orbitDistance = size * 0.26 * splitProgress;
  const daughterRadius = coreRadius * (0.45 + 0.35 * splitProgress);

  // Subtle natural fluid wobble
  const wobbleX = Math.sin(frame * 0.08) * 3;
  const wobbleY = Math.cos(frame * 0.08) * 3;
  const orbitAngle = frame * 0.04;

  // Compute 3 satellite daughter droplets
  const daughters = [
    {
      cx: center + Math.cos(orbitAngle) * orbitDistance + wobbleX,
      cy: center + Math.sin(orbitAngle) * orbitDistance + wobbleY,
      r: daughterRadius,
    },
    {
      cx: center + Math.cos(orbitAngle + (2 * Math.PI) / 3) * orbitDistance - wobbleX,
      cy: center + Math.sin(orbitAngle + (2 * Math.PI) / 3) * orbitDistance + wobbleY,
      r: daughterRadius * 0.85,
    },
    {
      cx: center + Math.cos(orbitAngle + (4 * Math.PI) / 3) * orbitDistance + wobbleY,
      cy: center + Math.sin(orbitAngle + (4 * Math.PI) / 3) * orbitDistance - wobbleX,
      r: daughterRadius * 0.9,
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <LiquidGooeyFilter 
        id={filterId} 
        blurRadius={artStyle === 'TECHNICAL_BLUEPRINT' ? 10 : 16} 
        contrast={22}
        threshold={-10}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          filter: `url(#${filterId})`,
          overflow: 'visible',
        }}
      >
        <defs>
          <radialGradient id={`${filterId}_core_grad`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.95} />
            <stop offset="35%" stopColor={accentColor} stopOpacity={0.9} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity={0.95} />
          </radialGradient>
        </defs>

        {/* Central Mother Drop */}
        <circle
          cx={center + wobbleX}
          cy={center + wobbleY}
          r={coreRadius * (1 - splitProgress * 0.25)}
          fill={artStyle === 'NEO_BRUTALIST' ? primaryColor : `url(#${filterId}_core_grad)`}
        />

        {/* Mitotic Daughter Droplets */}
        {daughters.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={artStyle === 'NEO_BRUTALIST' ? accentColor : `url(#${filterId}_core_grad)`}
          />
        ))}
      </svg>

      {/* Blueprint Mode CAD Vector Overlays */}
      {artStyle === 'TECHNICAL_BLUEPRINT' && (
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          <circle
            cx={center}
            cy={center}
            r={coreRadius * 1.5}
            fill="none"
            stroke={accentColor}
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.4}
          />
          <line
            x1={center - coreRadius * 1.8}
            y1={center}
            x2={center + coreRadius * 1.8}
            y2={center}
            stroke={accentColor}
            strokeWidth={0.75}
            opacity={0.3}
          />
          <line
            x1={center}
            y1={center - coreRadius * 1.8}
            x2={center}
            y2={center + coreRadius * 1.8}
            stroke={accentColor}
            strokeWidth={0.75}
            opacity={0.3}
          />
        </svg>
      )}

      {/* Neo-Brutalist Hard Outline Offset */}
      {artStyle === 'NEO_BRUTALIST' && (
        <div
          style={{
            position: 'absolute',
            width: size * 0.45,
            height: size * 0.45,
            border: '3px solid #000000',
            borderRadius: '50%',
            transform: 'translate(4px, 4px)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
