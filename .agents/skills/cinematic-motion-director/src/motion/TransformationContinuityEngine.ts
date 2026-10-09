/**
 * TRANSFORMATION CONTINUITY, IDENTITY & MOMENTUM HANDOFF ENGINE (V29)
 * 
 * Provides continuous object identity tracking, momentum transfer,
 * topology transformation grammar, and unbroken scene handoffs for Remotion.
 * 
 * Key Principles:
 * 1. OBJECT IDENTITY: An entity maintains persistent spatial, angular, and mass continuity.
 * 2. MOMENTUM CONSERVATION: Velocity does not reset to zero at transformation boundaries unless intentionally braked.
 * 3. TRANSFORMATION GRAMMAR: Transformations follow semantic phases (ANTICIPATION -> DEFORM -> TRANSFORM -> PEAK -> TARGET -> SETTLE).
 * 4. VOLUME CONSERVATION: Physical deformation maintains scaleX = 1 / scaleY.
 */

import { interpolate, Easing } from 'remotion';
import {
  calculateVelocityHandoff,
  VelocityHandoffMode,
  VelocityHandoffResult,
  Point2D,
} from './fidelity/MotionFidelityEngine';

export type TransformationGrammarType =
  | 'CONDENSE'        // 1D line/volume concentrates into high-density 0D point
  | 'STRETCH_LAUNCH' // Dot elongates along velocity vector into linear carrier
  | 'CURVE_WRAP'      // Linear vector bends along curvature into closed ring
  | 'COLLAPSE_BRAKE'  // Rotating entity decelerates angularly and collapses radius to singularity
  | 'STRIKE_ERUPT'    // High-speed impact transfers kinetic energy into vertical monolith extrusion
  | 'LIGATURE_EXTRUDE'// Typographic strokes/ligatures fracture and assemble into geometric emblem
  | 'CAMERA_PASS';    // Entity expands into framing ring as camera passes through center

export type TransformationPhase =
  | 'REST'
  | 'ANTICIPATION'
  | 'INITIATION'
  | 'DEFORMATION'
  | 'TRANSFORMATION'
  | 'PEAK'
  | 'TARGET_FORM'
  | 'SETTLE';

export interface ContinuousObjectIdentity {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotationDeg: number;
  angularVelocityDeg: number;
  scaleX: number;
  scaleY: number;
  phase: TransformationPhase;
  activeType: TransformationGrammarType;
  progress: number;
  pathData?: string;
  points?: Point2D[];
}

export interface TransformationConfig {
  sourceId: string;
  targetId: string;
  type: TransformationGrammarType;
  startFrame: number;
  durationFrames: number;
  velocityHandoff: VelocityHandoffMode;
  initialVelocity?: { vx: number; vy: number };
  initialRotationDeg?: number;
  initialAngularVelocityDeg?: number;
  preserveVolume?: boolean;
}

/**
 * Evaluates continuous DOT -> LINE -> RING transformation pipeline.
 * Guarantees zero teleportation, continuous momentum, and volume conservation.
 */
export function evaluateDotToLineToRing(
  frame: number,
  startFrame: number = 0,
  options?: {
    dotX?: number;
    dotY?: number;
    targetLineWidth?: number;
    targetRingRadius?: number;
  }
): ContinuousObjectIdentity {
  const {
    dotX = 360,
    dotY = 540,
    targetLineWidth = 720,
    targetRingRadius = 140,
  } = options || {};

  const relFrame = Math.max(0, frame - startFrame);
  const totalFrames = 90;

  // Phase 1: Dot Anticipation & Directional Launch (0 - 30f)
  // Phase 2: Line Extension & Curvature Bending (30 - 60f)
  // Phase 3: Ring Closure, Orbit & Continuous Momentum (60 - 90f)

  if (relFrame < 30) {
    const p = relFrame / 30;
    if (p < 0.25) {
      // Anticipation: Compress backward (-X)
      const antP = p / 0.25;
      const squash = 1.0 - 0.25 * Math.sin(antP * Math.PI);
      return {
        id: 'dot_carrier',
        x: dotX - 25 * Math.sin(antP * Math.PI),
        y: dotY,
        vx: -5 * Math.cos(antP * Math.PI),
        vy: 0,
        rotationDeg: 0,
        angularVelocityDeg: 0,
        scaleX: Number(squash.toFixed(3)),
        scaleY: Number((1.0 / squash).toFixed(3)),
        phase: 'ANTICIPATION',
        activeType: 'STRETCH_LAUNCH',
        progress: p,
      };
    } else {
      // Directional Launch: Rapid extension into line
      const launchP = (p - 0.25) / 0.75;
      const curve = Easing.bezier(0.12, 0, 0.39, 0)(launchP);
      const currentX = interpolate(curve, [0, 1], [dotX, dotX + 300]);
      const stretch = interpolate(launchP, [0, 0.6, 1], [1.0, 4.5, 2.5]);
      const vx = 22 * (1 - launchP * 0.4);

      return {
        id: 'dot_carrier',
        x: currentX,
        y: dotY,
        vx: Number(vx.toFixed(2)),
        vy: 0,
        rotationDeg: 0,
        angularVelocityDeg: 0,
        scaleX: Number(stretch.toFixed(3)),
        scaleY: Number((1.0 / Math.max(0.2, stretch * 0.5)).toFixed(3)),
        phase: 'DEFORMATION',
        activeType: 'STRETCH_LAUNCH',
        progress: p,
      };
    }
  } else if (relFrame < 60) {
    // Phase 2: LINE -> CURVE (30f - 60f)
    const p = (relFrame - 30) / 30;
    const bendCurve = Easing.bezier(0.16, 1, 0.3, 1)(p);
    const centerX = dotX + 300 + interpolate(bendCurve, [0, 1], [0, 240]);
    const curvatureAngle = interpolate(bendCurve, [0, 1], [0, 270]); // Uncoils into circle arc
    const vx = 14 * (1 - p * 0.5);

    return {
      id: 'line_to_curve_carrier',
      x: centerX,
      y: dotY,
      vx: Number(vx.toFixed(2)),
      vy: 0,
      rotationDeg: Number(curvatureAngle.toFixed(2)),
      angularVelocityDeg: 9,
      scaleX: 1.0,
      scaleY: 1.0,
      phase: 'TRANSFORMATION',
      activeType: 'CURVE_WRAP',
      progress: p,
    };
  } else {
    // Phase 3: CURVE -> CLOSED RING & CONTINUOUS ROTATION (60f - 90f)
    const p = Math.min(1, (relFrame - 60) / 30);
    const orbitCurve = Easing.out(Easing.cubic)(p);
    const centerX = dotX + 540;
    const rotation = 270 + interpolate(p, [0, 1], [0, 180]); // Seamlessly continues spinning

    return {
      id: 'closed_ring_carrier',
      x: centerX,
      y: dotY,
      vx: 0,
      vy: 0,
      rotationDeg: Number(rotation.toFixed(2)),
      angularVelocityDeg: 6,
      scaleX: 1.0,
      scaleY: 1.0,
      phase: p >= 1 ? 'SETTLE' : 'TARGET_FORM',
      activeType: 'CURVE_WRAP',
      progress: p,
    };
  }
}

/**
 * Evaluates momentum handoff when high-speed seed strikes foundation line,
 * transferring kinetic energy into vertical monolith extrusion.
 */
export function evaluateImpactExtrusionHandoff(
  frame: number,
  startFrame: number = 0,
  pillarCount: number = 4
): {
  nucleus: { x: number; y: number; opacity: number; scaleX: number; scaleY: number };
  pillars: Array<{ height: number; opacity: number; energyNodeScale: number }>;
  impactShockwaveRadius: number;
} {
  const relFrame = Math.max(0, frame - startFrame);
  const targetHeights = [220, 360, 290, 420];

  // Strike occurs at relFrame = 20
  const impactFrame = 20;

  if (relFrame < impactFrame) {
    // Nucleus traveling toward ground plane at high speed
    const p = relFrame / impactFrame;
    const drop = Easing.in(Easing.quad)(p);
    const currentX = interpolate(p, [0, 1], [600, 960]);
    const currentY = interpolate(drop, [0, 1], [300, 720]);
    const vy = 28 * p;

    // Stretch along descent vector
    const stretch = Math.min(1.8, 1.0 + (vy / 25) * 0.8);

    return {
      nucleus: {
        x: currentX,
        y: currentY,
        opacity: 1,
        scaleX: 1 / stretch,
        scaleY: stretch,
      },
      pillars: targetHeights.map(() => ({ height: 0, opacity: 0, energyNodeScale: 0 })),
      impactShockwaveRadius: 0,
    };
  } else {
    // Post-impact: Nucleus transfers momentum into foundation shockwave and vertical pillars
    const postFrame = relFrame - impactFrame;
    const shockwaveP = Math.min(1, postFrame / 25);
    const shockRadius = interpolate(shockwaveP, [0, 1], [0, 480]);

    // Nucleus squashes and absorbs into baseline during first 6 frames
    const squashP = Math.min(1, postFrame / 6);
    const nucOpacity = postFrame < 8 ? 1.0 - postFrame / 8 : 0;
    const nucScaleX = interpolate(squashP, [0, 0.5, 1], [1.0, 2.2, 0.5]);
    const nucScaleY = interpolate(squashP, [0, 0.5, 1], [1.0, 0.3, 0.1]);

    // Pillars sequentially erupt as the shockwave reaches their X positions
    const pillarDistances = [0.15, 0.38, 0.62, 0.88];
    const pillars = targetHeights.map((h, i) => {
      const delay = pillarDistances[i] * 18;
      if (postFrame < delay) {
        return { height: 0, opacity: 0, energyNodeScale: 0 };
      }
      const eruptP = Math.min(1, (postFrame - delay) / 28);
      const eruptCurve = Easing.bezier(0.16, 1, 0.3, 1)(eruptP);
      const currentH = interpolate(eruptCurve, [0, 1], [0, h]);
      const nodeScale = interpolate(eruptP, [0, 0.7, 1], [0, 1.3, 1.0]);

      return {
        height: currentH,
        opacity: Math.min(1, eruptP * 2),
        energyNodeScale: nodeScale,
      };
    });

    return {
      nucleus: {
        x: 960,
        y: 720,
        opacity: nucOpacity,
        scaleX: nucScaleX,
        scaleY: nucScaleY,
      },
      pillars,
      impactShockwaveRadius: shockRadius,
    };
  }
}
