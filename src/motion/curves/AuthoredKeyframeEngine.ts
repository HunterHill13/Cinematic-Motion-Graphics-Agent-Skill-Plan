/**
 * AUTHORED KEYFRAME & TEMPORAL CURVE ENGINE (V27)
 * 
 * Provides fine-grained, segment-based trajectory control:
 * 
 * Keyframe Role
 *  → Anticipation / Launch / Cruise / Impact / Punctuation / Settle
 *  → Calibrated Velocity Profiles
 *  → Arc-length Temporal Parameterization
 *  → Coordinated Transform Composition
 */

import { interpolate, Easing } from 'remotion';

export type KeyframeRoleType =
  | 'REST'
  | 'ANTICIPATION'
  | 'LAUNCH'
  | 'CRUISE'
  | 'PEAK'
  | 'IMPACT'
  | 'PUNCTUATION'
  | 'OVERSHOOT'
  | 'DECAY'
  | 'SETTLE'
  | 'HOLD';

export type MotionCurveProfileType =
  | 'IMPACT'      // Short anticipation, rapid acceleration, razor-sharp arrival, 2f punctuation, controlled settle
  | 'SLAM'        // Near-still start, aggressive launch, peak velocity, controlled overshoot, hard settle
  | 'GLIDE'       // Gentle pickup, stable constant velocity, smooth deceleration without bounce
  | 'ELASTIC'     // Deep anticipation, snappy launch, damped oscillatory recovery
  | 'MECHANICAL'  // Piecewise linear velocity, crisp instantaneous snaps, zero fake softness
  | 'HEAVY'       // High inertia pickup, massive momentum, compression at contact, restrained rebound
  | 'FLOAT';      // Featherweight, near-zero acceleration, gentle drift (secondary only)

export interface MotionKeyframe<T = number> {
  time: number; // 0.0 to 1.0 (relative duration of motion)
  role: KeyframeRoleType;
  value: T;
  curve?: (t: number) => number;
}

export interface AuthoredMotionTrack {
  id: string;
  totalDurationFrames: number;
  profile: MotionCurveProfileType;
  keyframes: MotionKeyframe<number>[];
}

/**
 * Built-in Calibrated Curves
 */
export const MotionCurves = {
  // Impact Profile: razor-sharp arrival
  impactCurve: Easing.bezier(0.5, 0, 0.75, 0),
  
  // Snap Settle: rapid arrest with microscopic overshoot
  snapSettle: Easing.bezier(0.16, 1, 0.3, 1),
  
  // High-inertia launch
  heavyLaunch: Easing.bezier(0.4, 0, 0.2, 1),
  
  // Precision mechanical glide
  linearGlide: (t: number) => t,
};

/**
 * Evaluates an authored multi-segment keyframe track at a given frame.
 */
export function evaluateAuthoredKeyframeTrack(
  track: AuthoredMotionTrack,
  frame: number,
  startFrame: number = 0
): {
  value: number;
  velocity: number;
  acceleration: number;
  activeRole: KeyframeRoleType;
} {
  const rel = frame - startFrame;
  const t = Math.max(0, Math.min(1, rel / Math.max(1, track.totalDurationFrames)));

  const kfs = track.keyframes;
  if (kfs.length === 0) {
    return { value: 0, velocity: 0, acceleration: 0, activeRole: 'REST' };
  }
  if (kfs.length === 1 || t <= kfs[0].time) {
    return { value: kfs[0].value, velocity: 0, acceleration: 0, activeRole: kfs[0].role };
  }
  if (t >= kfs[kfs.length - 1].time) {
    const last = kfs[kfs.length - 1];
    return { value: last.value, velocity: 0, acceleration: 0, activeRole: last.role };
  }

  // Find active segment [k0, k1]
  let segIdx = 0;
  while (segIdx < kfs.length - 1 && kfs[segIdx + 1].time < t) {
    segIdx++;
  }

  const k0 = kfs[segIdx];
  const k1 = kfs[segIdx + 1];

  const segDuration = Math.max(0.0001, k1.time - k0.time);
  const segAlpha = (t - k0.time) / segDuration;

  // Apply segment curve
  const curveFn = k0.curve ?? MotionCurves.snapSettle;
  const curvedAlpha = curveFn(Math.max(0, Math.min(1, segAlpha)));

  const val = interpolate(curvedAlpha, [0, 1], [k0.value, k1.value]);

  // Numerical velocity & acceleration
  const dt = 0.002;
  const tPrev = Math.max(0, t - dt);
  const tNext = Math.min(1, t + dt);
  
  const valPrev = interpolate(
    curveFn(Math.max(0, Math.min(1, (tPrev - k0.time) / segDuration))),
    [0, 1],
    [k0.value, k1.value]
  );
  const valNext = interpolate(
    curveFn(Math.max(0, Math.min(1, (tNext - k0.time) / segDuration))),
    [0, 1],
    [k0.value, k1.value]
  );

  const vel = (valNext - valPrev) / ((tNext - tPrev) * track.totalDurationFrames);
  const accel = ((valNext - val) - (val - valPrev)) / Math.pow(dt * track.totalDurationFrames, 2);

  return {
    value: Number(val.toFixed(4)),
    velocity: Number(vel.toFixed(4)),
    acceleration: Number(accel.toFixed(4)),
    activeRole: segAlpha > 0.8 ? k1.role : k0.role,
  };
}

/**
 * Creates an authored track for high-velocity slams with intentional punctuation.
 */
export function createAuthoredSlamTrack(params: {
  id: string;
  totalDurationFrames: number;
  startVal: number;
  impactVal: number;
  squashVal: number;
  settleVal: number;
  anticipationFrames?: number;
  fallFrames?: number;
  punctuationFrames?: number;
}): AuthoredMotionTrack {
  const {
    id,
    totalDurationFrames: T,
    startVal,
    impactVal,
    squashVal,
    settleVal,
    anticipationFrames = 6,
    fallFrames = 18,
    punctuationFrames = 2,
  } = params;

  const tAnti = anticipationFrames / T;
  const tImpact = (anticipationFrames + fallFrames) / T;
  const tPunctuation = (anticipationFrames + fallFrames + punctuationFrames) / T;
  const tSquash = (anticipationFrames + fallFrames + punctuationFrames + 6) / T;

  return {
    id,
    totalDurationFrames: T,
    profile: 'SLAM',
    keyframes: [
      { time: 0, role: 'REST', value: startVal },
      { time: tAnti, role: 'ANTICIPATION', value: startVal - (impactVal - startVal) * 0.08, curve: Easing.bezier(0.4, 0, 0.2, 1) },
      { time: tImpact, role: 'IMPACT', value: impactVal, curve: MotionCurves.impactCurve },
      { time: tPunctuation, role: 'PUNCTUATION', value: impactVal, curve: (t) => t }, // Strict 2f hold
      { time: tSquash, role: 'OVERSHOOT', value: squashVal, curve: Easing.bezier(0.12, 0, 0.39, 0) },
      { time: 1.0, role: 'SETTLE', value: settleVal, curve: MotionCurves.snapSettle },
    ],
  };
}
