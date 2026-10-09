/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: UNIVERSAL SEMANTIC SVG PATH MORPHING ENGINE
 * ============================================================================
 * 
 * Premier studio-grade vector morphology powered by @remotion/paths:
 * 1. Normalized SVG Path Registry: Pre-scaled vector definitions across scientific,
 *    AI, SaaS, and geometric domains (200x200 viewBox).
 * 2. Multi-Keyframe Continuous Morphing: Fluid path interpolation without cuts.
 * 3. Elastic Spring Physics & Angular Momentum Tilt (±6 degrees).
 * 4. Style-Aware Theme Adaptation: Glass, Paper, Blueprint, Neo-Brutalism.
 * 5. Generic Architecture: Reusable for ANY domain, topic, or custom SVG strings.
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { interpolatePath, evolvePath } from '@remotion/paths';
import { quantizeFrameForStopMotion } from '../visual_world/artStyleGate';

export type MorphDomain = 
  | 'science_biomedical'
  | 'ai_future_tech'
  | 'fintech_saas'
  | 'geometry_abstract'
  | 'custom';

export type MorphArtStyle = 
  | 'MODERN_GLASSMORPHIC'
  | 'STOP_MOTION_PAPER'
  | 'TECHNICAL_BLUEPRINT'
  | 'NEO_BRUTALIST';

// ============================================================================
// NORMALIZED 200x200 VECTOR PATH DICTIONARIES
// ============================================================================
export const NORMALIZED_SVG_PATHS = {
  // 1. Quantum Atom (Center 100, 100)
  quantum_atom: 
    'M 100 40 C 135 40 160 65 160 100 C 160 135 135 160 100 160 C 65 160 40 135 40 100 C 40 65 65 40 100 40 Z ' +
    'M 100 65 C 120 65 135 80 135 100 C 135 120 120 135 100 135 C 80 135 65 120 65 100 C 65 80 80 65 100 65 Z',

  // 2. Neural AI Brain (Dual Lobes with Synaptic Arch)
  neural_brain: 
    'M 100 35 C 145 35 175 65 175 105 C 175 140 145 165 100 165 C 55 165 25 140 25 105 C 25 65 55 35 100 35 Z ' +
    'M 100 55 C 125 55 145 75 145 105 C 145 130 125 145 100 145 C 75 145 55 130 55 105 C 55 75 75 55 100 55 Z',

  // 3. Calibration Security Shield
  biotech_shield: 
    'M 100 30 L 165 55 L 165 110 C 165 145 135 170 100 180 C 65 170 35 145 35 110 L 35 55 Z ' +
    'M 100 55 L 145 72 L 145 110 C 145 135 125 152 100 160 C 75 152 55 135 55 110 L 55 72 Z',

  // 4. Cyber Diamond Star
  cyber_diamond: 
    'M 100 25 L 175 100 L 100 175 L 25 100 Z ' +
    'M 100 55 L 145 100 L 100 145 L 55 100 Z',

  // 5. Hexagon CAD Lattice
  cad_hexagon: 
    'M 100 30 L 160 65 L 160 135 L 100 170 L 40 135 L 40 65 Z ' +
    'M 100 55 L 140 78 L 140 122 L 100 145 L 60 122 L 60 78 Z',
};

export interface UniversalPathMorphProps {
  /** Array of SVG path strings (d attribute) to morph through */
  paths?: string[];
  /** Named shapes from registry if paths not provided */
  shapeNames?: Array<keyof typeof NORMALIZED_SVG_PATHS>;
  /** Starting frame of animation */
  startFrame: number;
  /** Total duration in frames across all transitions */
  durationInFrames: number;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Secondary glow color */
  glowColor?: string;
  /** Fill color */
  fillColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Active art style */
  artStyle?: MorphArtStyle;
  style?: React.CSSProperties;
}

export const UniversalPathMorph: React.FC<UniversalPathMorphProps> = ({
  paths,
  shapeNames = ['quantum_atom', 'neural_brain', 'biotech_shield', 'cyber_diamond'],
  startFrame,
  durationInFrames,
  width = 240,
  height = 240,
  strokeColor = '#10b981',
  glowColor = 'rgba(16, 185, 129, 0.4)',
  fillColor = 'rgba(16, 185, 129, 0.08)',
  strokeWidth = 3,
  artStyle = 'MODERN_GLASSMORPHIC',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Resolve target paths
  const resolvedPaths = paths && paths.length >= 2 
    ? paths 
    : shapeNames.map((name) => NORMALIZED_SVG_PATHS[name] || NORMALIZED_SVG_PATHS.quantum_atom);

  const numTransitions = resolvedPaths.length - 1;
  const framesPerStage = durationInFrames / Math.max(1, numTransitions);

  // Stop-motion quantization if in paper mode
  const effectiveFrame = artStyle === 'STOP_MOTION_PAPER' 
    ? quantizeFrameForStopMotion(frame, 'stop_motion_12fps') 
    : frame;

  const elapsed = Math.max(0, effectiveFrame - startFrame);
  const currentStageIndex = Math.min(numTransitions - 1, Math.floor(elapsed / framesPerStage));
  const stageElapsed = elapsed - (currentStageIndex * framesPerStage);

  // Staggered elastic spring for the morph
  const s = spring({
    frame: stageElapsed,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const clampedProgress = Math.min(1.0, Math.max(0.0, s));

  // Current pair to interpolate
  const pathA = resolvedPaths[currentStageIndex];
  const pathB = resolvedPaths[currentStageIndex + 1];

  let currentD = pathA;
  try {
    currentD = interpolatePath(clampedProgress, pathA, pathB);
  } catch (e) {
    currentD = clampedProgress > 0.5 ? pathB : pathA;
  }

  // Angular momentum kick during transition
  const angularKick = Math.sin(clampedProgress * Math.PI) * (currentStageIndex % 2 === 0 ? 6.5 : -6.5);
  const scalePulse = 1.0 + Math.sin(clampedProgress * Math.PI) * 0.08;

  // Style-specific adaptations
  let renderedStroke = strokeColor;
  let renderedFill = fillColor;
  let renderedShadow = `0 0 16px ${glowColor}`;
  let containerRadius = '16px';
  let containerBg = 'rgba(2, 28, 20, 0.4)';
  let containerBorder = '1px solid rgba(16, 185, 129, 0.3)';

  if (artStyle === 'STOP_MOTION_PAPER') {
    renderedStroke = '#d97706';
    renderedFill = 'rgba(245, 158, 11, 0.12)';
    renderedShadow = '4px 6px 0px rgba(60, 50, 40, 0.3)';
    containerBg = '#fffdfa';
    containerBorder = '1.5px solid rgba(80, 60, 40, 0.35)';
  } else if (artStyle === 'TECHNICAL_BLUEPRINT') {
    renderedStroke = '#38bdf8';
    renderedFill = 'rgba(6, 182, 212, 0.12)';
    renderedShadow = '0 0 14px rgba(56, 189, 248, 0.45)';
    containerBg = 'rgba(4, 20, 36, 0.7)';
    containerBorder = '1px solid #06b6d4';
  } else if (artStyle === 'NEO_BRUTALIST') {
    renderedStroke = '#000000';
    renderedFill = '#f59e0b';
    renderedShadow = '5px 5px 0px #000000';
    containerBg = '#ffffff';
    containerBorder = '3px solid #000000';
    containerRadius = '0px';
  }

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: containerRadius,
        background: containerBg,
        border: containerBorder,
        boxShadow: renderedShadow,
        backdropFilter: 'blur(12px)',
        transform: `rotate(${angularKick.toFixed(2)}deg) scale(${scalePulse.toFixed(3)})`,
        transition: 'none',
        ...style,
      }}
    >
      <svg
        width={width * 0.75}
        height={height * 0.75}
        viewBox="0 0 200 200"
        style={{
          overflow: 'visible',
        }}
      >
        <path
          d={currentD}
          fill={renderedFill}
          stroke={renderedStroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: artStyle === 'MODERN_GLASSMORPHIC' || artStyle === 'TECHNICAL_BLUEPRINT'
              ? `drop-shadow(0 0 8px ${renderedStroke})` 
              : undefined,
          }}
        />
      </svg>
    </div>
  );
};
