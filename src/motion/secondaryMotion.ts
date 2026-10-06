/**
 * V20 MOTION STABILITY & SECONDARY ENGINE
 * 
 * Implements core V20 Motion Stability principles:
 * 1. Safe Breathing Period (enforces >= 60 frames, prevents sub-frame float jitter).
 * 2. Deterministic Settle Lock for Typography & Precision Geometry (REST = strict constant).
 * 3. Bounded Decaying Impact Shake (exponential decay envelope, zero leakage).
 */

import { interpolate } from 'remotion';

export interface IdleBreathingState {
  scale: number;        // 0.99 - 1.01
  translateY: number;   // +/- 1.5px
  glowIntensity: number;// subtle modulation
}

/**
 * Calculates a smooth, deterministic breathing idle micro-motion for non-text ambient actors.
 * Clamps period to safe cinematic intervals (>= 60 frames) to eliminate subpixel float noise.
 * Note: NEVER apply breathing to typography or precision calipers/rulers!
 */
export function calculateIdleBreathing(
  frame: number,
  periodInFrames = 90,
  amplitude = 0.012
): IdleBreathingState {
  // Gracefully handle if caller passed frequency in Hz (e.g., 0.3 Hz -> 100 frames @ 30fps)
  const safePeriod = periodInFrames < 10
    ? Math.max(60, Math.round(30 / Math.max(0.01, periodInFrames)))
    : Math.max(60, periodInFrames);

  const theta = (2 * Math.PI * (frame % safePeriod)) / safePeriod;
  const sinVal = Math.sin(theta);

  const scale = 1.0 + sinVal * amplitude;
  const translateY = sinVal * 1.5;
  const glowIntensity = 0.85 + 0.15 * Math.cos(theta);

  return {
    scale,
    translateY,
    glowIntensity,
  };
}

/**
 * DETERMINISTIC SETTLE LOCK FOR TYPOGRAPHY & PRECISION GEOMETRY (V20)
 * 
 * Guarantees that once an element passes its strike and settle duration,
 * all spatial and scale properties are locked to exact mathematical constants:
 * scale = 1.0, translateY = 0, opacity = 1.0.
 * Eliminates asymptotic spring floating tails and subpixel shimmer.
 */
export interface SettleLockState {
  scale: number;
  translateY: number;
  opacity: number;
  isSettled: boolean;
}

export function calculateSettleLock(
  frame: number,
  strikeFrame: number,
  options?: {
    anticipationFrames?: number;
    settleFrames?: number;
    scalePeak?: number;
    anticipateDip?: number;
  }
): SettleLockState {
  const {
    anticipationFrames = 8,
    settleFrames = 16,
    scalePeak = 1.15,
    anticipateDip = 0.96,
  } = options || {};

  const start = strikeFrame - anticipationFrames;
  const settleEnd = strikeFrame + settleFrames;

  if (frame < start) {
    return { scale: 0.92, translateY: 16, opacity: 0, isSettled: false };
  }

  // Anticipation phase: subtle coil backwards
  if (frame < strikeFrame) {
    const p = (frame - start) / Math.max(1, anticipationFrames);
    const scale = interpolate(p, [0, 0.7, 1], [0.92, anticipateDip, scalePeak]);
    const translateY = interpolate(p, [0, 1], [16, 2]);
    const opacity = interpolate(p, [0, 0.4, 1], [0, 0.9, 1]);
    return { scale, translateY, opacity, isSettled: false };
  }

  // Strike & Settle phase
  if (frame < settleEnd) {
    const p = (frame - strikeFrame) / Math.max(1, settleFrames);
    // Exponential damping curve towards 1.0
    const damp = Math.exp(-p * 3.5);
    const overshoot = Math.sin(p * Math.PI * 2) * (scalePeak - 1.0) * damp;
    const scale = 1.0 + overshoot;
    const translateY = Math.sin(p * Math.PI) * -3 * damp;
    return { scale, translateY, opacity: 1, isSettled: false };
  }

  // HARD SETTLE LOCK: Mathematically exact 1.0, zero variance
  return {
    scale: 1.0,
    translateY: 0,
    opacity: 1,
    isSettled: true,
  };
}

/**
 * BOUNDED DECAYING IMPACT SHAKE (V20)
 * 
 * Provides high-energy event impact with a strict exponential decay envelope.
 * Strictly guarantees shake = 0 once the decay window ends.
 */
export function calculateDecayingImpactShake(
  frame: number,
  impactFrame: number,
  options?: {
    durationFrames?: number;
    amplitude?: number;
    frequency?: number;
  }
): { shakeX: number; shakeY: number; active: boolean } {
  const {
    durationFrames = 10,
    amplitude = 8,
    frequency = 1.6,
  } = options || {};

  if (frame < impactFrame || frame >= impactFrame + durationFrames) {
    return { shakeX: 0, shakeY: 0, active: false };
  }

  const elapsed = frame - impactFrame;
  const decay = Math.exp(-elapsed * 0.45);
  const cycle = elapsed * frequency * Math.PI;

  const shakeX = Math.sin(cycle) * amplitude * decay;
  const shakeY = Math.cos(cycle) * (amplitude * 0.5) * decay;

  return {
    shakeX,
    shakeY,
    active: true,
  };
}

/**
 * Calculates causal secondary reaction to a primary collision or strike event.
 * Secondary reacts slightly after the primary contact with physical damping.
 */
export function calculateCausalSecondaryReaction(
  frame: number,
  primaryImpactFrame: number,
  delayFrames = 3,
  durationFrames = 25
): {
  progress: number;
  expansionScale: number;
  opacity: number;
  active: boolean;
} {
  const start = primaryImpactFrame + delayFrames;
  if (frame < start) {
    return { progress: 0, expansionScale: 1, opacity: 0, active: false };
  }

  const elapsed = frame - start;
  const progress = Math.min(1, elapsed / durationFrames);

  // Quick expansion and gradual decay
  const expansionScale = interpolate(progress, [0, 0.3, 1], [1.0, 1.08, 1.0]);
  const opacity = interpolate(progress, [0, 0.2, 1], [0, 0.8, 0]);

  return {
    progress,
    expansionScale,
    opacity,
    active: progress > 0 && progress < 1,
  };
}

