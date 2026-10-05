import { interpolate, Easing } from 'remotion';

export interface ImpactAndRippleResult {
  primaryY: number;
  primaryScale: number;
  primaryOpacity: number;
  baselineDisplacement: number;
  shockwave: {
    radius: number;
    opacity: number;
    strokeWidth: number;
  };
  follower: {
    y: number;
    opacity: number;
    scale: number;
  };
}

/**
 * RECIPE 02: IMPACT AND RIPPLE
 * Used when a primary graphic monolith (Numeral, Stamp, Seal) strikes the canvas.
 * - Primary actor settles with authoritative deceleration.
 * - Supporting baseline exhibits damped harmonic rebound.
 * - Vector shockwave ring radiates outwards and fades.
 * - Subordinate framing brackets follow with a 4-frame delay.
 */
export function calculateImpactAndRipple(
  frame: number,
  impactFrame: number,
  config?: {
    entryDuration?: number;
    initialY?: number;
    reboundAmplitude?: number;
    reboundDecay?: number;
    reboundFreq?: number;
    shockwaveMaxRadius?: number;
    shockwaveDuration?: number;
    followerDelay?: number;
  }
): ImpactAndRippleResult {
  const {
    entryDuration = 20,
    initialY = -50,
    reboundAmplitude = 8,
    reboundDecay = 0.18,
    reboundFreq = 0.5,
    shockwaveMaxRadius = 140,
    shockwaveDuration = 22,
    followerDelay = 4,
  } = config || {};

  // 1. Primary Actor Motion
  let primaryY = 0;
  let primaryScale = 1.0;
  let primaryOpacity = 1.0;

  if (frame < impactFrame) {
    const entryProgress = Math.max(0, (frame - (impactFrame - entryDuration)) / entryDuration);
    const eased = Easing.bezier(0.2, 0, 0, 1)(entryProgress);
    primaryY = interpolate(eased, [0, 1], [initialY, 0]);
    primaryScale = interpolate(eased, [0, 1], [0.92, 1.0]);
    primaryOpacity = interpolate(eased, [0, 0.4, 1], [0, 0.8, 1]);
  } else {
    // Settle with slight overshoot micro-spring
    const t = frame - impactFrame;
    if (t < 12) {
      const settle = Math.exp(-0.35 * t) * Math.sin(0.6 * t);
      primaryY = settle * 3;
      primaryScale = 1.0 + settle * 0.03;
    }
  }

  // 2. Baseline Damped Harmonic Displacement
  let baselineDisplacement = 0;
  if (frame >= impactFrame) {
    const elapsed = frame - impactFrame;
    if (elapsed < 24) {
      baselineDisplacement =
        reboundAmplitude * Math.exp(-reboundDecay * elapsed) * Math.sin(reboundFreq * elapsed);
    }
  }

  // 3. Shockwave Radiation
  let shockwave = { radius: 0, opacity: 0, strokeWidth: 0 };
  if (frame >= impactFrame && frame <= impactFrame + shockwaveDuration) {
    const prog = (frame - impactFrame) / shockwaveDuration;
    const easedProg = Easing.bezier(0.1, 0.9, 0.2, 1)(prog);
    shockwave = {
      radius: interpolate(easedProg, [0, 1], [6, shockwaveMaxRadius]),
      opacity: interpolate(prog, [0, 0.15, 1], [0.9, 0.6, 0]),
      strokeWidth: interpolate(prog, [0, 1], [2.5, 0.5]),
    };
  }

  // 4. Secondary Follower (Brackets/Ticks) with delay
  let follower = { y: 15, opacity: 0, scale: 0.95 };
  const followerStart = impactFrame + followerDelay;
  if (frame >= followerStart) {
    const fProg = Math.min(1, (frame - followerStart) / 16);
    const easedF = Easing.bezier(0.16, 1, 0.3, 1)(fProg);
    follower = {
      y: interpolate(easedF, [0, 1], [15, 0]),
      opacity: interpolate(fProg, [0, 0.4, 1], [0, 0.8, 1]),
      scale: interpolate(easedF, [0, 1], [0.95, 1.0]),
    };
  }

  return {
    primaryY,
    primaryScale,
    primaryOpacity,
    baselineDisplacement,
    shockwave,
    follower,
  };
}
