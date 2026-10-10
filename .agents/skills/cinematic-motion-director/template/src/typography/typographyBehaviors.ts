import { interpolate, Easing } from 'remotion';

export interface TypographyMotionState {
  opacity: number;
  scale: number;
  translateY: number;
  letterSpacing: number;
  clipPath?: string;
  glowIntensity: number;
  weight: number;
}

/**
 * TYPOGRAPHY BEHAVIORS (V13)
 * Reference-driven editorial typography behaviors tailored for Persian RTL script.
 * Zero PowerPoint slide-ins, zero robotic character stuttering.
 */

// 1. Keyword Strike: High impact syllable strike with harmonic settle
export function calculateKeywordStrike(
  frame: number,
  strikeFrame: number,
  config?: { anticipationFrames?: number; settleFrames?: number; scalePeak?: number }
): TypographyMotionState {
  const { anticipationFrames = 12, settleFrames = 18, scalePeak = 1.08 } = config || {};

  if (frame < strikeFrame - anticipationFrames) {
    return {
      opacity: 0,
      scale: 0.95,
      translateY: 20,
      letterSpacing: -0.5,
      glowIntensity: 0,
      weight: 600,
    };
  }

  // Anticipation phase: subtle squeeze & opacity rise
  if (frame < strikeFrame) {
    const p = (frame - (strikeFrame - anticipationFrames)) / anticipationFrames;
    const easeIn = Easing.bezier(0.5, 0, 0.75, 0)(p);
    return {
      opacity: interpolate(easeIn, [0, 1], [0, 0.9]),
      scale: interpolate(easeIn, [0, 1], [0.95, 0.98]),
      translateY: interpolate(easeIn, [0, 1], [15, 2]),
      letterSpacing: interpolate(easeIn, [0, 1], [-0.5, -0.8]),
      glowIntensity: interpolate(easeIn, [0, 1], [0, 0.3]),
      weight: 700,
    };
  }

  // Strike & Settle phase
  const elapsed = frame - strikeFrame;
  const settleProgress = Math.min(1, elapsed / settleFrames);
  const decay = Math.exp(-0.2 * elapsed);
  const harmonic = Math.cos(0.4 * elapsed);

  const scale = 1.0 + (scalePeak - 1.0) * decay * harmonic;
  const translateY = -4 * decay * harmonic;
  const glow = 1.0 * decay;

  return {
    opacity: 1,
    scale,
    translateY,
    letterSpacing: interpolate(settleProgress, [0, 1], [-0.8, 0]),
    glowIntensity: glow,
    weight: 900,
  };
}

// 2. Masked Phrase Reveal: Smooth vertical curtain unmasking
export function calculateMaskedPhraseReveal(
  frame: number,
  startFrame: number,
  duration: number = 24
): TypographyMotionState {
  const rel = frame - startFrame;
  if (rel <= 0) {
    return {
      opacity: 0,
      scale: 1,
      translateY: 35,
      letterSpacing: 0,
      glowIntensity: 0,
      weight: 600,
      clipPath: 'inset(100% 0% 0% 0%)',
    };
  }

  const p = Math.min(1, rel / duration);
  const ease = Easing.bezier(0.16, 1, 0.3, 1)(p);

  return {
    opacity: interpolate(ease, [0, 0.3, 1], [0, 1, 1]),
    scale: 1,
    translateY: interpolate(ease, [0, 1], [35, 0]),
    letterSpacing: 0,
    glowIntensity: 0,
    weight: 600,
    clipPath: `inset(${interpolate(ease, [0, 1], [100, 0])}% 0% 0% 0%)`,
  };
}

// 3. Baseline Travel: Kinetic rule expanding beneath typography
export function calculateBaselineTravel(
  frame: number,
  startFrame: number,
  duration: number = 22
): { progress: number; scaleX: number; opacity: number } {
  const rel = frame - startFrame;
  if (rel <= 0) return { progress: 0, scaleX: 0, opacity: 0 };

  const p = Math.min(1, rel / duration);
  const ease = Easing.bezier(0.2, 0.8, 0.2, 1)(p);

  return {
    progress: ease,
    scaleX: ease,
    opacity: interpolate(ease, [0, 0.2, 1], [0, 1, 1]),
  };
}

// 4. Word Group Reveal: Staggered grouping for phrases
export function calculateWordGroupReveal(
  frame: number,
  groupIndex: number,
  baseStartFrame: number,
  staggerFrames: number = 6
): { opacity: number; translateY: number } {
  const groupStart = baseStartFrame + groupIndex * staggerFrames;
  if (frame < groupStart) return { opacity: 0, translateY: 15 };

  const p = Math.min(1, (frame - groupStart) / 18);
  const ease = Easing.bezier(0.16, 1, 0.3, 1)(p);

  return {
    opacity: interpolate(ease, [0, 1], [0, 1]),
    translateY: interpolate(ease, [0, 1], [15, 0]),
  };
}
