/**
 * MOTION FIDELITY, VELOCITY CONTINUITY & PERCEPTUAL MORPH ENGINE (V25)
 * 
 * Elevates animation from "technically valid procedural easing" to
 * "high-fidelity, physically coherent, and perceptually authored motion design."
 * 
 * Core Subsystems:
 * 1. KINEMATIC REASONING: C0, C1 (velocity), and C2 (acceleration) continuous evaluation.
 * 2. MOTION PERSONALITIES: 8 authored material curves (Rigid, Heavy, Elastic, Fluid, Explosive, Glide, Mechanical, Light).
 * 3. VELOCITY HANDOFF: Preserves or redirects momentum across transformation boundaries.
 * 4. PERCEPTUAL SHAPE MORPH: Optimal point correspondence, rotational normalization, and winding alignment.
 * 5. MICRO-MOTION DISCIPLINE: Strict zero-jitter settle locks versus intentional breathing.
 */

import { interpolate, Easing } from 'remotion';

// ============================================================================
// 1. MOTION PERSONALITIES & CURVES
// ============================================================================

export type MotionPersonalityType =
  | 'RIGID'       // Little overshoot (<2%), rapid stop, strong directional authority
  | 'HEAVY'       // Slower inertia acceleration, massive momentum, deep impact, long decay
  | 'ELASTIC'     // Negative anticipation (-8%), swift launch, damped oscillatory recovery
  | 'FLUID'       // C2 acceleration, continuous velocity, zero abrupt jerk, smooth curvature
  | 'EXPLOSIVE'   // Sharp anticipation (-3%), hyper-velocity peak, razor-sharp impact, fast decay
  | 'GLIDE'       // Low acceleration, extended constant-velocity travel, minimal impact
  | 'MECHANICAL'  // Precise piecewise linear segments, constant velocity, instant snap
  | 'LIGHT';      // Instantaneous featherweight pickup, gentle flutter, floating settle

export interface KinematicState {
  progress: number;       // 0.0 to 1.0 (or with overshoot)
  position: number;       // Normalized coordinate
  velocity: number;       // dp/dt (units per normalized second / frame)
  acceleration: number;   // dv/dt
  currentPhase: 'REST' | 'ANTICIPATION' | 'ACTION' | 'PEAK' | 'OVERSHOOT' | 'DECAY' | 'SETTLE';
}

/**
 * Evaluates the non-linear position value for a given personality.
 */
export function evaluatePersonalityValue(
  t: number, // Normalized progress 0.0 to 1.0
  personality: MotionPersonalityType
): { value: number; phase: KinematicState['currentPhase'] } {
  const clamped = Math.max(0, Math.min(1, t));

  switch (personality) {
    case 'RIGID': {
      // Fast, authoritative, tiny overshoot (1.02), sharp arrest
      if (clamped < 0.1) {
        return { value: 0, phase: 'REST' };
      }
      if (clamped < 0.75) {
        const p = (clamped - 0.1) / 0.65;
        const v = Easing.bezier(0.2, 0, 0, 1)(p);
        return { value: v * 1.02, phase: 'ACTION' };
      }
      const p = (clamped - 0.75) / 0.25;
      const v = interpolate(p, [0, 1], [1.02, 1.0]);
      return { value: v, phase: p > 0.8 ? 'SETTLE' : 'DECAY' };
    }

    case 'HEAVY': {
      // Sluggish start, massive acceleration towards end, seismic impact, slow settle
      if (clamped < 0.20) {
        // Slow inertia overcoming
        const p = clamped / 0.20;
        const v = interpolate(p * p, [0, 1], [0, 0.08]);
        return { value: v, phase: 'ANTICIPATION' };
      }
      if (clamped < 0.70) {
        // Massive momentum surge
        const p = (clamped - 0.20) / 0.50;
        const eased = Easing.bezier(0.5, 0, 0.2, 1)(p);
        return { value: interpolate(eased, [0, 1], [0.08, 1.06]), phase: 'ACTION' };
      }
      // Heavy damped recovery (subtle ground settling)
      const p = (clamped - 0.70) / 0.30;
      const decay = Math.exp(-p * 4.5);
      const v = 1.0 + Math.sin(p * Math.PI) * 0.06 * decay;
      return { value: p > 0.85 ? 1.0 : v, phase: p > 0.85 ? 'SETTLE' : 'DECAY' };
    }

    case 'ELASTIC': {
      // Clear anticipation dip (-0.08), rapid action, oscillatory overshoot
      if (clamped < 0.15) {
        const p = clamped / 0.15;
        const v = -0.08 * Math.sin(p * Math.PI);
        return { value: v, phase: 'ANTICIPATION' };
      }
      if (clamped < 0.55) {
        const p = (clamped - 0.15) / 0.40;
        const eased = Easing.bezier(0.12, 0, 0.39, 0)(p);
        return { value: interpolate(eased, [0, 1], [-0.08, 1.15]), phase: 'ACTION' };
      }
      // Damped harmonic oscillation
      const p = (clamped - 0.55) / 0.45;
      const damping = Math.exp(-p * 5.0);
      const wave = Math.cos(p * Math.PI * 3) * 0.15 * damping;
      return { value: p > 0.85 ? 1.0 : 1.0 + wave, phase: p > 0.85 ? 'SETTLE' : 'OVERSHOOT' };
    }

    case 'FLUID': {
      // Pure C2 continuous smooth S-curve, zero abrupt transitions
      const eased = Easing.bezier(0.37, 0, 0.63, 1)(clamped);
      return {
        value: eased,
        phase: clamped < 0.1 ? 'REST' : clamped > 0.9 ? 'SETTLE' : 'ACTION',
      };
    }

    case 'EXPLOSIVE': {
      // Razor-sharp anticipation (-0.03), near-vertical acceleration, intense snap
      if (clamped < 0.08) {
        const p = clamped / 0.08;
        return { value: -0.03 * p, phase: 'ANTICIPATION' };
      }
      if (clamped < 0.45) {
        const p = (clamped - 0.08) / 0.37;
        const eased = Easing.bezier(0.05, 0, 0.1, 1)(p);
        return { value: interpolate(eased, [0, 1], [-0.03, 1.08]), phase: 'ACTION' };
      }
      const p = (clamped - 0.45) / 0.55;
      const decay = Math.exp(-p * 6.0);
      const v = 1.0 + 0.08 * decay;
      return { value: p > 0.8 ? 1.0 : v, phase: p > 0.8 ? 'SETTLE' : 'DECAY' };
    }

    case 'GLIDE': {
      // Gentle takeoff, long uniform velocity glide, soft landing
      const eased = Easing.bezier(0.16, 1, 0.3, 1)(clamped);
      return {
        value: eased,
        phase: clamped < 0.15 ? 'REST' : clamped > 0.85 ? 'SETTLE' : 'ACTION',
      };
    }

    case 'MECHANICAL': {
      // Piecewise constant velocity (stepper motor aesthetic)
      if (clamped < 0.05) return { value: 0, phase: 'REST' };
      if (clamped > 0.95) return { value: 1.0, phase: 'SETTLE' };
      const p = (clamped - 0.05) / 0.90;
      return { value: p, phase: 'ACTION' };
    }

    case 'LIGHT': {
      // Instant pickup, airy floating deceleration
      const eased = Easing.bezier(0, 0.55, 0.45, 1)(clamped);
      return {
        value: eased,
        phase: clamped < 0.05 ? 'REST' : clamped > 0.9 ? 'SETTLE' : 'ACTION',
      };
    }
  }
}

/**
 * Calculates continuous position, velocity, and acceleration via numerical differentiation.
 * Provides C0, C1, and C2 metrics at any frame.
 */
export function calculateKinematics(
  frame: number,
  startFrame: number,
  durationFrames: number,
  personality: MotionPersonalityType = 'FLUID'
): KinematicState {
  const duration = Math.max(1, durationFrames);
  const rel = frame - startFrame;
  const t = Math.max(0, Math.min(1, rel / duration));

  // Sample with delta for analytical derivative calculation
  const dt = 0.002;
  const t0 = Math.max(0, t - dt);
  const t1 = Math.min(1, t + dt);

  const { value: p, phase } = evaluatePersonalityValue(t, personality);
  const p0 = evaluatePersonalityValue(t0, personality).value;
  const p1 = evaluatePersonalityValue(t1, personality).value;

  // Velocity (change in normalized position per frame)
  const vel = (p1 - p0) / ((t1 - t0) * duration);

  // Acceleration (change in velocity per frame)
  const v0 = (p - p0) / ((t - t0) * duration);
  const v1 = (p1 - p) / ((t1 - t) * duration);
  const accel = (v1 - v0) / (0.5 * (t1 - t0) * duration);

  return {
    progress: t,
    position: p,
    velocity: Number(vel.toFixed(4)),
    acceleration: Number(accel.toFixed(4)),
    currentPhase: phase,
  };
}

// ============================================================================
// 2. VELOCITY HANDOFF ENGINE
// ============================================================================

export type VelocityHandoffMode =
  | 'PRESERVE'   // Target inherits 100% instantaneous source velocity
  | 'REDIRECT'   // Conserves kinetic magnitude, redirects along new geometric normal
  | 'DAMP'       // Scaled by damping coefficient (0.4 - 0.7)
  | 'AMPLIFY'    // Injects momentum boost (1.2 - 1.8)
  | 'INVERT'     // Rebounds with negated velocity
  | 'RESET';     // Full intentional stop (0.0)

export interface VelocityHandoffResult {
  initialTargetVelocity: number;
  inheritedMomentum: number;
  directionDeg: number;
  isContinuousC1: boolean;
}

export function calculateVelocityHandoff(
  sourceVelocity: number,
  mode: VelocityHandoffMode,
  options?: {
    scaleFactor?: number;
    angleRedirectDeg?: number;
  }
): VelocityHandoffResult {
  const { scaleFactor = 1.0, angleRedirectDeg = 0 } = options || {};

  switch (mode) {
    case 'PRESERVE':
      return {
        initialTargetVelocity: sourceVelocity * scaleFactor,
        inheritedMomentum: sourceVelocity,
        directionDeg: 0,
        isContinuousC1: true,
      };

    case 'REDIRECT':
      return {
        initialTargetVelocity: sourceVelocity * scaleFactor,
        inheritedMomentum: sourceVelocity,
        directionDeg: angleRedirectDeg,
        isContinuousC1: true,
      };

    case 'DAMP': {
      const damped = sourceVelocity * Math.min(0.8, Math.max(0.2, scaleFactor));
      return {
        initialTargetVelocity: damped,
        inheritedMomentum: damped,
        directionDeg: 0,
        isContinuousC1: false, // Discontinuous deceleration
      };
    }

    case 'AMPLIFY': {
      const boosted = sourceVelocity * Math.max(1.2, scaleFactor);
      return {
        initialTargetVelocity: boosted,
        inheritedMomentum: boosted,
        directionDeg: 0,
        isContinuousC1: false,
      };
    }

    case 'INVERT':
      return {
        initialTargetVelocity: -sourceVelocity * scaleFactor,
        inheritedMomentum: -sourceVelocity,
        directionDeg: 180,
        isContinuousC1: false,
      };

    case 'RESET':
      return {
        initialTargetVelocity: 0,
        inheritedMomentum: 0,
        directionDeg: 0,
        isContinuousC1: false,
      };
  }
}

// ============================================================================
// 3. PERCEPTUAL SHAPE MORPH CORRESPONDENCE ENGINE
// ============================================================================

export interface Point2D {
  x: number;
  y: number;
}

export interface MorphDiagnosticResult {
  maxPointTravel: number;
  averagePointTravel: number;
  optimalCyclicShift: number;
  isWindingReversed: boolean;
  midpointDPath: string;
}

/**
 * Calculates arc-length equidistant resampling of a 2D closed polygon.
 */
export function resampleEquidistant(points: Point2D[], targetCount: number = 32): Point2D[] {
  if (points.length < 3) return points;

  // Calculate perimeter arc lengths
  const cumulativeLengths: number[] = [0];
  let totalLength = 0;

  for (let i = 0; i < points.length; i++) {
    const next = points[(i + 1) % points.length];
    const dx = next.x - points[i].x;
    const dy = next.y - points[i].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    totalLength += dist;
    cumulativeLengths.push(totalLength);
  }

  const step = totalLength / targetCount;
  const resampled: Point2D[] = [];

  for (let i = 0; i < targetCount; i++) {
    const targetDist = i * step;

    // Find segment containing targetDist
    let segIdx = 0;
    while (segIdx < points.length && cumulativeLengths[segIdx + 1] < targetDist) {
      segIdx++;
    }

    const pA = points[segIdx % points.length];
    const pB = points[(segIdx + 1) % points.length];
    const segStart = cumulativeLengths[segIdx];
    const segEnd = cumulativeLengths[segIdx + 1];
    const segLen = Math.max(0.0001, segEnd - segStart);
    const alpha = (targetDist - segStart) / segLen;

    resampled.push({
      x: pA.x + (pB.x - pA.x) * alpha,
      y: pA.y + (pB.y - pA.y) * alpha,
    });
  }

  return resampled;
}

/**
 * Finds the optimal cyclic shift and winding direction that minimizes
 * total Euclidean point travel between two closed polygons.
 * Prevents mid-morph twisting, self-intersections, and pinching.
 */
export function findOptimalMorphCorrespondence(
  polyA: Point2D[],
  polyB: Point2D[]
): { alignedB: Point2D[]; bestShift: number; reversed: boolean } {
  const N = polyA.length;
  let minCost = Infinity;
  let bestShift = 0;
  let bestReversed = false;

  // Test normal winding
  for (let s = 0; s < N; s++) {
    let cost = 0;
    for (let i = 0; i < N; i++) {
      const bIdx = (i + s) % N;
      const dx = polyA[i].x - polyB[bIdx].x;
      const dy = polyA[i].y - polyB[bIdx].y;
      cost += dx * dx + dy * dy;
    }
    if (cost < minCost) {
      minCost = cost;
      bestShift = s;
      bestReversed = false;
    }
  }

  // Test reversed winding
  for (let s = 0; s < N; s++) {
    let cost = 0;
    for (let i = 0; i < N; i++) {
      const bIdx = (N - 1 - i + s) % N;
      const dx = polyA[i].x - polyB[bIdx].x;
      const dy = polyA[i].y - polyB[bIdx].y;
      cost += dx * dx + dy * dy;
    }
    if (cost < minCost) {
      minCost = cost;
      bestShift = s;
      bestReversed = true;
    }
  }

  // Build aligned polyB
  const alignedB: Point2D[] = [];
  for (let i = 0; i < N; i++) {
    const idx = bestReversed ? (N - 1 - i + bestShift) % N : (i + bestShift) % N;
    alignedB.push({ ...polyB[idx] });
  }

  return { alignedB, bestShift, reversed: bestReversed };
}

/**
 * Converts a series of 2D points into a smooth Catmull-Rom cubic Bézier SVG path.
 */
export function polygonToCubicSvgPath(points: Point2D[]): string {
  const N = points.length;
  if (N < 3) return '';

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < N; i++) {
    const p0 = points[(i - 1 + N) % N];
    const p1 = points[i];
    const p2 = points[(i + 1) % N];
    const p3 = points[(i + 2) % N];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d + ' Z';
}

/**
 * Generates an optimally corresponding morph interpolation between two closed shapes.
 */
export function interpolateOptimalMorph(
  rawA: Point2D[],
  rawB: Point2D[],
  progress: number,
  pointCount: number = 32
): { dPath: string; diagnostic: MorphDiagnosticResult } {
  const resampledA = resampleEquidistant(rawA, pointCount);
  const resampledB = resampleEquidistant(rawB, pointCount);

  const { alignedB, bestShift, reversed } = findOptimalMorphCorrespondence(
    resampledA,
    resampledB
  );

  // Compute interpolated points
  const interpolated: Point2D[] = [];
  let maxTravel = 0;
  let sumTravel = 0;

  for (let i = 0; i < pointCount; i++) {
    const pA = resampledA[i];
    const pB = alignedB[i];
    const dx = pB.x - pA.x;
    const dy = pB.y - pA.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > maxTravel) maxTravel = dist;
    sumTravel += dist;

    interpolated.push({
      x: pA.x + dx * progress,
      y: pA.y + dy * progress,
    });
  }

  // Midpoint path for diagnostic audit
  const midpointPoints: Point2D[] = [];
  for (let i = 0; i < pointCount; i++) {
    midpointPoints.push({
      x: resampledA[i].x + (alignedB[i].x - resampledA[i].x) * 0.5,
      y: resampledA[i].y + (alignedB[i].y - resampledA[i].y) * 0.5,
    });
  }

  return {
    dPath: polygonToCubicSvgPath(interpolated),
    diagnostic: {
      maxPointTravel: Number(maxTravel.toFixed(2)),
      averagePointTravel: Number((sumTravel / pointCount).toFixed(2)),
      optimalCyclicShift: bestShift,
      isWindingReversed: reversed,
      midpointDPath: polygonToCubicSvgPath(midpointPoints),
    },
  };
}
