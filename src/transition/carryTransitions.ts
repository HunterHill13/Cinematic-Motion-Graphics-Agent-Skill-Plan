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
 * T1: Kinetic Underline Handoff
 * Handoff from Shot 01 underline ray to Shot 02 upper monolith border.
 */
export function executeKineticUnderlineHandoff(
  frame: number,
  startFrame: number,
  endFrame: number,
  options?: { startX?: number; endX?: number; initialWidth?: number; terminalWidth?: number }
) {
  const {
    startX = 960,
    endX = -200,
    initialWidth = 820,
    terminalWidth = 1400,
  } = options || {};

  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.7, 0, 0.9, 0.2)(raw);

  const x = interpolate(ease, [0, 1], [startX, endX]);
  const width = interpolate(ease, [0, 0.7, 1], [initialWidth, initialWidth * 1.5, terminalWidth]);
  const opacity = interpolate(raw, [0, 0.8, 1], [1, 1, 0.85]);

  return { progress: raw, x, width, opacity };
}

/**
 * T2: Symmetric Fission
 * Seal from Shot 02 splits outward into 3 structural pillars for Shot 03.
 */
export function executeSymmetricFission(
  frame: number,
  startFrame: number,
  endFrame: number,
  options?: { centerX?: number; leftTargetX?: number; rightTargetX?: number }
) {
  const {
    centerX = 960,
    leftTargetX = 420,
    rightTargetX = 1500,
  } = options || {};

  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.2, 0.8, 0.2, 1)(raw);

  const leftX = interpolate(ease, [0, 1], [centerX, leftTargetX]);
  const rightX = interpolate(ease, [0, 1], [centerX, rightTargetX]);
  const opacity = interpolate(raw, [0, 0.3, 1], [0, 1, 1]);

  return { progress: raw, leftX, rightX, opacity };
}

/**
 * T3: Datum Rule Axis Collapse
 * Center datum from Shot 03 pillars collapses into horizontal timeline axis for Shot 04.
 */
export function executeDatumRuleAxisCollapse(
  frame: number,
  startFrame: number,
  endFrame: number
) {
  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.16, 1, 0.3, 1)(raw);

  const scaleY = interpolate(ease, [0, 0.6, 1], [1, 0.05, 0.02]);
  const scaleX = interpolate(ease, [0, 1], [1, 1.4]);
  const opacity = interpolate(raw, [0, 0.8, 1], [1, 1, 0.9]);

  return { progress: raw, scaleX, scaleY, opacity };
}

/**
 * T4: Planar Stage Fold
 * Horizontal timeline axis folds in perspective to form base plinth for Shot 05.
 */
export function executePlanarStageFold(
  frame: number,
  startFrame: number,
  endFrame: number
) {
  const duration = Math.max(1, endFrame - startFrame);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const ease = Easing.bezier(0.25, 1, 0.5, 1)(raw);

  const rotateX = interpolate(ease, [0, 1], [0, 60]);
  const translateY = interpolate(ease, [0, 1], [0, 120]);
  const opacity = interpolate(raw, [0, 0.8, 1], [1, 1, 0.9]);

  return { progress: raw, rotateX, translateY, opacity };
}

/**
 * T5: Gravitational Singularity
 * Pedestals from Shot 05 collapse to center and expand as Golden Crest in Shot 06.
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
  const glow = interpolate(easeIn, [0, 0.7, 1], [0, 25, 45]);
  const opacity = interpolate(raw, [0, 0.85, 1], [1, 1, 0]);

  return { progress: raw, scale, glow, opacity };
}
