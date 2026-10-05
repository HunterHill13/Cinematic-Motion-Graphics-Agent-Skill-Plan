/**
 * V17 PROSODIC MOTION HOOK & EVALUATOR
 * 
 * Computes frame-accurate spring physics, anticipation dips, and settle damping
 * dynamically modulated by the narrator's vocal stress and pitch contour.
 */

import { interpolate, Easing } from 'remotion';
import { getProsodicBeatForFrame } from './prosodicBeatRegistry';
import { ProsodicState } from './prosodicBeatTypes';

/**
 * Evaluates prosodic state at a given global timeline frame.
 */
export function evaluateProsodicState(frame: number): ProsodicState | null {
  const beat = getProsodicBeatForFrame(frame);
  if (!beat) return null;

  const duration = beat.endFrame - beat.startFrame;
  const frameInBeat = frame - beat.startFrame;
  const beatProgress = Math.min(1.0, Math.max(0.0, frameInBeat / duration));

  const isAnticipationPhase = frameInBeat < beat.anticipationFrames;
  const isSettlePhase = frameInBeat > beat.anticipationFrames && frameInBeat < beat.anticipationFrames + 20;

  // Modulate scale curve: subtle pre-motion dip during anticipation, explosive peak, damped settle
  let modulatedScale = 1.0;
  if (isAnticipationPhase && beat.anticipationFrames > 0) {
    // Subtle compression / anticipation dip (-1.5%)
    modulatedScale = interpolate(
      frameInBeat,
      [0, beat.anticipationFrames],
      [1.0, 0.985],
      { easing: Easing.bezier(0.4, 0, 0.6, 1) }
    );
  } else if (isSettlePhase) {
    const settleProgress = (frameInBeat - beat.anticipationFrames) / 20;
    // Spring overshoot toward scalePeakMultiplier and settling back to 1.0
    const damp = Math.exp(-settleProgress * (1.0 / (beat.settleDamping || 0.8)));
    const wave = Math.cos(settleProgress * Math.PI * 2.5);
    const overshoot = (beat.scalePeakMultiplier - 1.0) * damp * wave;
    modulatedScale = 1.0 + overshoot;
  } else {
    modulatedScale = 1.0;
  }

  // Rim light pulse during primary stress
  const rimIntensity = beat.vocalStress === 'primary-stress'
    ? beat.materialResponse.rimLightIntensity * (isSettlePhase ? 1.2 : 1.0)
    : beat.materialResponse.rimLightIntensity;

  return {
    currentBeat: beat,
    frameInBeat,
    beatProgress,
    isAnticipationPhase,
    isSettlePhase,
    modulatedScale,
    rimIntensity,
  };
}
