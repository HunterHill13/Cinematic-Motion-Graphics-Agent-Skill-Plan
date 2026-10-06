import { interpolate, Easing } from 'remotion';

export type CarryLevel = 'level1-object' | 'level2-spatial' | 'level3-semantic';

export interface CarryTransitionConfig {
  id: string;
  level: CarryLevel;
  startFrame: number;
  durationInFrames: number;
  fromCoords: { x: number; y: number };
  toCoords: { x: number; y: number };
  rotationDeg?: [number, number];
  scaleRange?: [number, number];
  opacityRange?: [number, number];
}

export interface CarryTransitionState {
  progress: number;
  x: number;
  y: number;
  rotationDeg: number;
  scale: number;
  opacity: number;
  active: boolean;
}

/**
 * CALCULATE MULTI-LEVEL CARRY TRANSITION (V13)
 * Guarantees physical and semantic causality across shot boundaries.
 */
export function calculateCarryTransition(
  frame: number,
  config: CarryTransitionConfig
): CarryTransitionState {
  const {
    startFrame,
    durationInFrames,
    fromCoords,
    toCoords,
    rotationDeg = [0, 0],
    scaleRange = [1, 1],
    opacityRange = [1, 1],
  } = config;

  if (frame < startFrame) {
    return {
      progress: 0,
      x: fromCoords.x,
      y: fromCoords.y,
      rotationDeg: rotationDeg[0],
      scale: scaleRange[0],
      opacity: opacityRange[0],
      active: false,
    };
  }

  const elapsed = frame - startFrame;
  const progress = Math.min(1, elapsed / Math.max(1, durationInFrames));
  const ease = Easing.bezier(0.65, 0, 0.35, 1)(progress);

  const x = interpolate(ease, [0, 1], [fromCoords.x, toCoords.x]);
  const y = interpolate(ease, [0, 1], [fromCoords.y, toCoords.y]);
  const rot = interpolate(ease, [0, 1], [rotationDeg[0], rotationDeg[1]]);
  const scale = interpolate(ease, [0, 1], [scaleRange[0], scaleRange[1]]);
  const opacity = interpolate(progress, [0, 1], [opacityRange[0], opacityRange[1]]);

  return {
    progress,
    x,
    y,
    rotationDeg: rot,
    scale,
    opacity,
    active: progress > 0 && progress < 1,
  };
}

/**
 * T1: Kinetic Sweep Handoff (S01 -> S02)
 * Horizontal horizon datum sweeps and rotates 90deg clockwise to become the vertical divider at right: 560.
 */
export function executeKineticUnderlineHandoff(
  frame: number,
  startFrame: number,
  endFrame: number,
  options?: { startX?: number; endX?: number; initialWidth?: number; terminalWidth?: number }
) {
  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.16, 1, 0.3, 1)(raw);

  // Rotation from 0 (horizontal) to 90deg (vertical)
  const rotationDeg = interpolate(ease, [0, 1], [0, 90]);
  // Translation to align with Shot 02 vertical divider at right: 560
  const topPercent = interpolate(ease, [0, 1], [52, 48]);
  const length = interpolate(ease, [0, 1], [1760, 940]);
  const opacity = interpolate(raw, [0, 0.8, 1], [1, 1, 0.95]);

  // Backward-compatible properties for v15-v18
  const x = interpolate(ease, [0, 1], [options?.startX ?? 960, options?.endX ?? -200]);
  const width = interpolate(ease, [0, 0.7, 1], [
    options?.initialWidth ?? 820,
    (options?.initialWidth ?? 820) * 1.5,
    options?.terminalWidth ?? 1400,
  ]);

  return { progress: raw, rotationDeg, topPercent, length, opacity, x, width };
}

/**
 * T2: Symmetric Fission (S02 -> S03)
 * Vertical divider at right: 560 splits into 3 harmonic vertical column axes:
 * Axis 1 (Zone 1): right 640
 * Axis 2 (Zone 2): right 1200
 * Axis 3 (Zone 3): right 1760
 */
export function executeSymmetricFission(
  frame: number,
  startFrame: number,
  endFrame: number,
  options?: { centerX?: number; leftTargetX?: number; rightTargetX?: number }
) {
  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.2, 0.8, 0.2, 1)(raw);

  const axis1Right = interpolate(ease, [0, 1], [560, 640]);
  const axis2Right = interpolate(ease, [0, 1], [560, 1200]);
  const axis3Right = interpolate(ease, [0, 1], [560, 1760]);
  const opacity = interpolate(raw, [0, 0.2, 1], [0.8, 1, 1]);

  // Backward-compatible properties for v15-v18
  const leftX = interpolate(ease, [0, 1], [options?.centerX ?? 960, options?.leftTargetX ?? 420]);
  const rightX = interpolate(ease, [0, 1], [options?.centerX ?? 960, options?.rightTargetX ?? 1500]);

  return { progress: raw, axis1Right, axis2Right, axis3Right, leftX, rightX, opacity };
}

/**
 * T3: Datum Rule Axis Collapse (S03 -> S04)
 * The 3 columns and caliper collapse vertically onto the horizontal baseline rule at y = 520,
 * which seamlessly matches Shot 04's timeline rail.
 */
export function executeDatumRuleAxisCollapse(
  frame: number,
  startFrame: number,
  endFrame: number
) {
  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.16, 1, 0.3, 1)(raw);

  const scaleY = interpolate(ease, [0, 0.7, 1], [1, 0.05, 0.005]);
  const scaleX = interpolate(ease, [0, 1], [1, 1.0]);
  const lineOpacity = interpolate(raw, [0, 0.5, 1], [0, 0.8, 1]);
  const contentOpacity = interpolate(raw, [0, 0.6, 1], [1, 0.2, 0]);

  return { progress: raw, scaleX, scaleY, lineOpacity, contentOpacity, opacity: lineOpacity };
}

/**
 * T4: Foundation Plinth Dock (S04 -> S05)
 * Horizontal timeline rail lowers to y = 760 and thickens into the foundation plinth for Shot 05.
 */
export function executePlanarStageFold(
  frame: number,
  startFrame: number,
  endFrame: number
) {
  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.25, 1, 0.5, 1)(raw);

  const translateY = interpolate(ease, [0, 1], [0, 240]);
  const plinthHeight = interpolate(ease, [0, 1], [4, 16]);
  const rotateX = interpolate(ease, [0, 1], [0, 60]);
  const opacity = interpolate(raw, [0, 0.8, 1], [1, 1, 0.95]);

  return { progress: raw, translateY, plinthHeight, rotateX, opacity };
}

/**
 * T5: Gravitational Singularity (S05 -> S06)
 * Diagonal summit vector collapses all vertices into the singularity node at (960, 345).
 */
export function executeGravitationalSingularity(
  frame: number,
  startFrame: number,
  endFrame: number
) {
  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const easeIn = Easing.bezier(0.7, 0, 0.9, 0.2)(raw);

  const scale = interpolate(easeIn, [0, 0.85, 1], [1, 0.08, 0]);
  const singularitySize = interpolate(easeIn, [0, 0.6, 1], [0, 12, 28]);
  const singularityOpacity = interpolate(raw, [0, 0.3, 0.8, 1], [0, 0.6, 1, 1]);
  const glow = interpolate(easeIn, [0, 0.7, 1], [0, 25, 45]);

  return { progress: raw, scale, singularitySize, singularityOpacity, glow, opacity: singularityOpacity };
}


