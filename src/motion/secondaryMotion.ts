/**
 * V15 SECONDARY & IDLE MOTION ENGINE
 * 
 * Implements two vital cinematic motion principles:
 * 1. Causal Secondary Motion:
 *    PRIMARY EVENT -> SECONDARY REACTION -> ENVIRONMENT REACTION
 *    (Never stack unrelated simultaneous effects; secondary motion must be causally triggered).
 * 
 * 2. Deterministic Idle Micro-Motion ("Breathing" state):
 *    Subtle 1–2% breathing oscillation (0.2Hz - 0.5Hz sine wave) on primary graphic actors
 *    so the composition feels alive without clutter or frantic distraction.
 */

import { interpolate } from 'remotion';

export interface IdleBreathingState {
  scale: number;        // 0.99 - 1.01
  translateY: number;   // +/- 1.5px
  glowIntensity: number;// subtle modulation
}

/**
 * Calculates a smooth, deterministic breathing idle micro-motion for hero actors.
 * @param frame Current animation frame
 * @param periodInFrames Oscillation period (default 90 frames = 3.0s @ 30 FPS)
 * @param amplitude Scale variance (default 0.015 = 1.5%)
 */
export function calculateIdleBreathing(
  frame: number,
  periodInFrames = 90,
  amplitude = 0.015
): IdleBreathingState {
  const theta = (2 * Math.PI * (frame % periodInFrames)) / periodInFrames;
  const sinVal = Math.sin(theta);

  const scale = 1.0 + sinVal * amplitude;
  const translateY = sinVal * 2.0; // 2px vertical drift
  const glowIntensity = 0.8 + 0.2 * Math.cos(theta);

  return {
    scale,
    translateY,
    glowIntensity,
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
