import { interpolate, spring, Easing } from 'remotion';
import { MotionPersonality, MotionPhaseConfig } from './types';

/**
 * V19 TEMPORAL MOTION PERSONALITIES
 * Distinct temporal behaviors replacing uniform springs.
 */

export const MOTION_PERSONALITY_PRESETS: Record<MotionPersonality, MotionPhaseConfig> = {
  IMPACT: {
    personality: 'IMPACT',
    durationFrames: 6,
    stiffness: 300,
    damping: 18,
    overshoot: 1.15,
    recoil: 0.18,
    easingCurve: Easing.bezier(0.85, 0, 0.15, 1),
  },
  ELASTIC: {
    personality: 'ELASTIC',
    durationFrames: 18,
    stiffness: 120,
    damping: 10,
    overshoot: 1.08,
    recoil: 0.08,
    easingCurve: Easing.bezier(0.25, 1.25, 0.5, 1),
  },
  GLIDE: {
    personality: 'GLIDE',
    durationFrames: 60,
    stiffness: 40,
    damping: 24,
    overshoot: 1.0,
    recoil: 0.0,
    easingCurve: Easing.bezier(0.16, 1, 0.3, 1),
  },
  BUILD: {
    personality: 'BUILD',
    durationFrames: 90,
    stiffness: 30,
    damping: 28,
    overshoot: 1.0,
    recoil: 0.0,
    easingCurve: Easing.bezier(0.4, 0, 0.2, 1),
  },
  HOLD: {
    personality: 'HOLD',
    durationFrames: 30,
    stiffness: 20,
    damping: 30,
    overshoot: 1.0,
    recoil: 0.0,
    easingCurve: (t: number) => t,
  },
  RELEASE: {
    personality: 'RELEASE',
    durationFrames: 14,
    stiffness: 220,
    damping: 16,
    overshoot: 1.05,
    recoil: 0.0,
    easingCurve: Easing.bezier(0.7, 0, 0.84, 0),
  },
};

/**
 * Evaluates progress and squash/stretch physics for a given phase and local elapsed frames.
 */
export function evaluatePhaseProgress(
  elapsedFrames: number,
  config: MotionPhaseConfig,
  fps: number = 30
): { progress: number; squashX: number; squashY: number } {
  const duration = Math.max(1, config.durationFrames);
  const clampedElapsed = Math.max(0, Math.min(duration, elapsedFrames));
  const rawProgress = clampedElapsed / duration;

  switch (config.personality) {
    case 'IMPACT': {
      // Very fast snap (2-8 frames) with sharp squash on impact and elastic recoil
      const hitProgress = interpolate(rawProgress, [0, 0.4, 1], [0, 1.15, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      // Squash & stretch: compresses in Y, expands in X upon landing
      const impactTime = rawProgress;
      const squashMagnitude = config.recoil ?? 0.18;
      const squashPhase = Math.sin(impactTime * Math.PI * 2) * Math.exp(-impactTime * 3);
      const squashY = 1 - squashMagnitude * squashPhase;
      const squashX = 1 + squashMagnitude * squashPhase;

      return { progress: hitProgress, squashX, squashY };
    }

    case 'ELASTIC': {
      // Spring with distinct overshoot and settling
      const spr = spring({
        frame: clampedElapsed,
        fps,
        config: {
          stiffness: config.stiffness ?? 120,
          damping: config.damping ?? 10,
        },
      });
      const wobble = Math.sin(rawProgress * Math.PI * 3) * 0.05 * (1 - rawProgress);
      return {
        progress: spr,
        squashX: 1 + wobble,
        squashY: 1 - wobble,
      };
    }

    case 'GLIDE': {
      // Majestic, smooth cinematic drift
      const easeFn = config.easingCurve ?? Easing.bezier(0.16, 1, 0.3, 1);
      const progress = easeFn(rawProgress);
      return { progress, squashX: 1, squashY: 1 };
    }

    case 'BUILD': {
      // Measured, progressive accumulation (draw, count, graph construct)
      const easeFn = config.easingCurve ?? Easing.bezier(0.4, 0, 0.2, 1);
      const progress = easeFn(rawProgress);
      return { progress, squashX: 1, squashY: 1 };
    }

    case 'RELEASE': {
      // Fast acceleration exit into next state or off-screen
      const easeFn = config.easingCurve ?? Easing.bezier(0.7, 0, 0.84, 0);
      const progress = easeFn(rawProgress);
      const stretch = 1 + (config.overshoot ? config.overshoot - 1 : 0.05) * progress;
      return {
        progress,
        squashX: stretch,
        squashY: 1 / stretch,
      };
    }

    case 'HOLD':
    default: {
      return { progress: 1.0, squashX: 1, squashY: 1 };
    }
  }
}
