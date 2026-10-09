/**
 * VISUAL TRANSFORMATION GRAMMAR (V22)
 * 
 * Replaces mechanical affine positioning ("Object A moves/scales into position B")
 * with physical, semantic metamorphosis ("Object A physically becomes visual idea B").
 * 
 * Core Invariants:
 * 1. IDENTITY PRESERVATION: Viewer tracks "that is the same entity" across topological change.
 * 2. MASS CONSERVATION: Visual mass has somewhere to go (compresses, accelerates, splits, accumulates).
 * 3. MOMENTUM CONSERVATION: Directional kinetic energy transfers into downstream structure.
 * 4. RHYTHMIC CONTRAST: Stillness -> Anticipation -> Velocity Peak -> Impact -> Settle.
 */

import { interpolate, Easing } from 'remotion';

export type TransformationPrimitive =
  | 'dot'
  | 'line'
  | 'arc'
  | 'ribbon'
  | 'ring'
  | 'orbit'
  | 'tunnel'
  | 'mass'
  | 'numeral'
  | 'word'
  | 'baseline'
  | 'pillar'
  | 'monolith'
  | 'node'
  | 'singularity';

export type TransformationTaxonomy =
  | 'DEFORM'        // Change shape while preserving identity
  | 'SPLIT'         // One object divides into harmonic multiple objects
  | 'MERGE'         // Multiple objects coalesce into unified mass
  | 'COLLAPSE'      // Large structure compresses into singular node
  | 'EXPANSION'     // Singular point expands into structured architecture
  | 'TRACE'         // Path draws itself into existence
  | 'WRAP'          // Line/ribbon wraps around target anchor
  | 'RECONFIGURE'   // Sub-elements rearrange into new compositional meaning
  | 'MASK_REVEAL'   // Geometric boundary reveals underlying typography
  | 'CAMERA_PASS';  // Camera trajectory transforms meaning of geometry

export interface TransformationPhaseState {
  rawProgress: number;     // 0 to 1
  easedProgress: number;   // Eased non-linear
  scale: number;
  width: number;
  height: number;
  borderRadius: string;
  rotationDeg: number;
  opacity: number;
  massDensity: number;     // Higher during compression, lower during expansion
  color: string;
  carrierX: number;
  carrierY: number;
}

/**
 * METAMORPHOSIS: DOT → LINE → RIBBON → HORIZON
 * Demonstrates continuous topology deformation preserving directional energy.
 */
export function calculateDotLineRibbonMorph(
  frame: number,
  startFrame: number,
  durationFrames: number = 60
): TransformationPhaseState {
  const duration = Math.max(1, durationFrames);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));

  // Phase 1 (0 - 0.35): Dot compresses and accelerates horizontally into a Line
  // Phase 2 (0.35 - 0.70): Line thickens and curves into an architectural Ribbon
  // Phase 3 (0.70 - 1.00): Ribbon straightens into full-bleed Horizon baseline

  let width = 12;
  let height = 12;
  let borderRadius = '50%';
  let rotationDeg = 0;
  let massDensity = 1.0;

  if (raw < 0.35) {
    const p1 = Easing.bezier(0.7, 0, 0.3, 1)(raw / 0.35);
    width = interpolate(p1, [0, 1], [12, 420]);
    height = interpolate(p1, [0, 1], [12, 3]);
    borderRadius = interpolate(p1, [0, 1], [50, 2]) + 'px';
    massDensity = interpolate(p1, [0, 1], [1.0, 0.4]);
  } else if (raw < 0.70) {
    const p2 = Easing.bezier(0.16, 1, 0.3, 1)((raw - 0.35) / 0.35);
    width = interpolate(p2, [0, 1], [420, 860]);
    height = interpolate(p2, [0, 1], [3, 28]);
    rotationDeg = interpolate(p2, [0, 1], [0, -12]);
    borderRadius = '4px';
    massDensity = interpolate(p2, [0, 1], [0.4, 0.7]);
  } else {
    const p3 = Easing.bezier(0.16, 1, 0.3, 1)((raw - 0.70) / 0.30);
    width = interpolate(p3, [0, 1], [860, 1760]);
    height = interpolate(p3, [0, 1], [28, 2]);
    rotationDeg = interpolate(p3, [0, 1], [-12, 0]);
    borderRadius = '1px';
    massDensity = interpolate(p3, [0, 1], [0.7, 0.3]);
  }

  const opacity = interpolate(raw, [0, 0.08, 1], [0, 1, 1]);
  const scale = 1.0;

  return {
    rawProgress: raw,
    easedProgress: raw,
    scale,
    width,
    height,
    borderRadius,
    rotationDeg,
    opacity,
    massDensity,
    color: '#D4AF37',
    carrierX: 960,
    carrierY: 540,
  };
}

/**
 * METAMORPHOSIS: RIBBON → RING → TUNNEL → SINGULARITY
 * Demonstrates cyclic topological wrapping and gravitational compression.
 */
export function calculateRibbonRingTunnelMorph(
  frame: number,
  startFrame: number,
  durationFrames: number = 75
): {
  progress: number;
  outerRingSize: number;
  tunnelDepth: number;
  ringCount: number;
  singularityScale: number;
  opacity: number;
} {
  const duration = Math.max(1, durationFrames);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));

  // 1. Ribbon wraps into Ring (0 - 0.4)
  const ringSize = interpolate(raw, [0, 0.4], [60, 260], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Ring extends into 3D Tunnel Depth (0.4 - 0.75)
  const tunnelDepth = interpolate(raw, [0.4, 0.75], [0, 1200], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Tunnel compresses into singular gravitational node (0.75 - 1.0)
  const singularityScale = interpolate(raw, [0.75, 1.0], [1.0, 0.02], {
    easing: Easing.bezier(0.7, 0, 0.84, 0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(raw, [0, 0.1, 0.95, 1], [0, 1, 1, 0.9]);

  return {
    progress: raw,
    outerRingSize: ringSize,
    tunnelDepth,
    ringCount: 6,
    singularityScale,
    opacity,
  };
}

/**
 * METAMORPHOSIS: NUMERAL → GEOMETRIC MASS → ARCHITECTURAL PILLAR
 * Demonstrates physical typography: numbers accumulating mass to form structural supports.
 */
export function calculateNumeralToPillarMorph(
  frame: number,
  startFrame: number,
  durationFrames: number = 60
): {
  progress: number;
  textOpacity: number;
  pillarHeight: number;
  pillarWidth: number;
  pillarElevationY: number;
  plinthThickness: number;
} {
  const duration = Math.max(1, durationFrames);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));

  // Numeral holds, then mass extrudes downward to form column
  const textOpacity = interpolate(raw, [0, 0.4, 0.6], [1, 1, 0.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillarHeight = interpolate(raw, [0.2, 0.8], [20, 480], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillarWidth = interpolate(raw, [0.2, 0.8], [90, 160], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pillarElevationY = interpolate(raw, [0.2, 0.8], [0, -120], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const plinthThickness = interpolate(raw, [0.5, 0.95], [2, 14], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return {
    progress: raw,
    textOpacity,
    pillarHeight,
    pillarWidth,
    pillarElevationY,
    plinthThickness,
  };
}
