import { interpolate, Easing } from 'remotion';

/**
 * REACTION ENGINE — Physical Causality & Secondary Motion Physics
 * Implements damped harmonic oscillation, follower inertia, and radial shockwaves.
 */

/**
 * Damped Harmonic Oscillator Reaction:
 * When a heavy graphic monolith strikes the stage, supporting baselines
 * and adjacent elements displace and rebound according to:
 * Δy(t) = A * e^(-λt) * sin(ωt)
 */
export function calculateImpactReaction(
  frame: number,
  impactFrame: number,
  amplitude: number = 6,
  frequency: number = 0.5,
  decay: number = 0.18,
  duration: number = 18
): number {
  if (frame < impactFrame) return 0;
  const elapsed = frame - impactFrame;
  if (elapsed > duration) return 0;

  // Damped sinusoidal oscillation
  return amplitude * Math.exp(-decay * elapsed) * Math.sin(frequency * elapsed);
}

/**
 * Staggered Secondary Follower Reaction:
 * Attached secondary actors (nodes, brackets, ticks) react with a 4–8 frame
 * physical delay behind primary actor impacts.
 */
export function calculateSecondaryFollower(
  frame: number,
  triggerFrame: number,
  delay: number = 4,
  duration: number = 20,
  initialOffset: number = 20
): { transform: string; opacity: number } {
  const effectiveStart = triggerFrame + delay;
  if (frame < effectiveStart) {
    return { transform: `translateY(${initialOffset}px)`, opacity: 0 };
  }

  const progress = interpolate(frame, [effectiveStart, effectiveStart + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const translateY = interpolate(progress, [0, 1], [initialOffset, 0]);
  const opacity = interpolate(progress, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });

  return {
    transform: `translateY(${translateY}px)`,
    opacity,
  };
}

/**
 * Radial Shockwave Ring Expansion:
 * High-velocity impacts detonate a crisp vector shockwave ring that expands and decays.
 */
export function calculateShockwave(
  frame: number,
  impactFrame: number,
  maxRadius: number = 160,
  duration: number = 24
): { radius: number; opacity: number; strokeWidth: number } {
  if (frame < impactFrame || frame > impactFrame + duration) {
    return { radius: 0, opacity: 0, strokeWidth: 0 };
  }

  const progress = (frame - impactFrame) / duration;
  const eased = Easing.bezier(0.1, 0.9, 0.2, 1)(progress);

  const radius = interpolate(eased, [0, 1], [4, maxRadius]);
  const opacity = interpolate(progress, [0, 0.2, 1], [0.9, 0.7, 0]);
  const strokeWidth = interpolate(progress, [0, 1], [3, 0.5]);

  return { radius, opacity, strokeWidth };
}

/**
 * Anticipation & Kinetic Entry:
 * Pulls back slightly (-6px) before surging with editorial bezier ease.
 */
export function calculateKineticEntry(
  frame: number,
  startFrame: number,
  duration: number = 26,
  initialOffset: number = 40
): { opacity: number; transform: string; progress: number } {
  const t = (frame - startFrame) / duration;
  const clampedT = Math.max(0, Math.min(1, t));

  if (clampedT <= 0) {
    return { opacity: 0, transform: `translateY(${initialOffset}px)`, progress: 0 };
  }

  // Anticipation: first 18% of duration pulls back slightly
  const pullBack = clampedT < 0.18 ? -5 * Math.sin((clampedT / 0.18) * Math.PI) : 0;
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(clampedT);
  const translateY = interpolate(eased, [0, 1], [initialOffset, 0]) + pullBack;
  const opacity = interpolate(clampedT, [0, 0.35], [0, 1], { extrapolateRight: 'clamp' });

  return {
    opacity,
    transform: `translateY(${translateY}px)`,
    progress: eased,
  };
}

/**
 * Scale Punch:
 * Instant semantic arrival punch (1.0 -> peakScale -> 1.0) with sine decay.
 */
export function calculateScalePunch(
  frame: number,
  impactFrame: number,
  peakScale: number = 1.08,
  settleDuration: number = 12
): number {
  if (frame < impactFrame) return 1.0;
  const elapsed = frame - impactFrame;
  if (elapsed > settleDuration) return 1.0;

  const t = elapsed / settleDuration;
  return 1.0 + (peakScale - 1.0) * Math.sin(t * Math.PI) * (1 - t);
}
