import { interpolate } from 'remotion';
import {
  ChoreographyEvent,
  EvaluatedChoreographyState,
  VisualState,
  MotionPersonality,
} from './types';
import { evaluatePhaseProgress, MOTION_PERSONALITY_PRESETS } from './motionPhases';

/**
 * V19 CHOREOGRAPHY ENGINE
 * Evaluates state transitions, causal transformations, and handoffs across time.
 */

export function evaluateChoreographyEvent(
  frame: number,
  event: ChoreographyEvent,
  fps: number = 30
): EvaluatedChoreographyState {
  const { startFrame, endFrame, fromState, toState } = event;
  const totalDuration = Math.max(1, endFrame - startFrame);

  if (frame < startFrame) {
    return {
      current: { ...fromState },
      activePhase: 'HOLD',
      progress: 0,
      phaseProgress: 0,
      squashScaleX: 1,
      squashScaleY: 1,
      isCompleted: false,
      isStarted: false,
    };
  }

  if (frame >= endFrame) {
    return {
      current: { ...toState },
      activePhase: 'HOLD',
      progress: 1,
      phaseProgress: 1,
      squashScaleX: 1,
      squashScaleY: 1,
      isCompleted: true,
      isStarted: true,
    };
  }

  const elapsed = frame - startFrame;
  const globalProgress = elapsed / totalDuration;

  // Determine sub-phase breakdown
  const actionConfig = event.action || MOTION_PERSONALITY_PRESETS.ELASTIC;
  const anticipationConfig = event.anticipation;
  const impactConfig = event.impact;
  const settleConfig = event.settle;

  let activePhase: MotionPersonality = actionConfig.personality;
  let phaseProgress = 0;
  let squashScaleX = 1;
  let squashScaleY = 1;

  const antDur = anticipationConfig?.durationFrames ?? 0;
  const actDur = actionConfig.durationFrames;
  const impDur = impactConfig?.durationFrames ?? 0;
  const setDur = settleConfig?.durationFrames ?? 0;

  const phaseTotal = Math.max(1, antDur + actDur + impDur + setDur);

  if (anticipationConfig && elapsed < antDur) {
    // In anticipation phase: subtle reverse motion / tension coil
    activePhase = anticipationConfig.personality;
    const res = evaluatePhaseProgress(elapsed, anticipationConfig, fps);
    phaseProgress = res.progress;
    squashScaleX = res.squashX;
    squashScaleY = res.squashY;
  } else if (impactConfig && elapsed >= antDur + actDur && elapsed < antDur + actDur + impDur) {
    // In impact phase
    activePhase = impactConfig.personality;
    const phaseElapsed = elapsed - (antDur + actDur);
    const res = evaluatePhaseProgress(phaseElapsed, impactConfig, fps);
    phaseProgress = res.progress;
    squashScaleX = res.squashX;
    squashScaleY = res.squashY;
  } else if (settleConfig && elapsed >= antDur + actDur + impDur) {
    // In settle phase
    activePhase = settleConfig.personality;
    const phaseElapsed = elapsed - (antDur + actDur + impDur);
    const res = evaluatePhaseProgress(phaseElapsed, settleConfig, fps);
    phaseProgress = res.progress;
    squashScaleX = res.squashX;
    squashScaleY = res.squashY;
  } else {
    // In action phase
    activePhase = actionConfig.personality;
    const phaseElapsed = elapsed - antDur;
    const res = evaluatePhaseProgress(phaseElapsed, actionConfig, fps);
    phaseProgress = res.progress;
    squashScaleX = res.squashX;
    squashScaleY = res.squashY;
  }

  // Interpolate spatial and visual properties between fromState and toState
  const t = Math.max(0, Math.min(1, globalProgress));
  // Apply non-linear interpolation guided by the active action personality
  const curveResult = evaluatePhaseProgress(elapsed, actionConfig, fps);
  const effectiveT = Math.max(0, Math.min(1, curveResult.progress));

  const interpNum = (from?: number, to?: number, fallback: number = 0) => {
    const f = from ?? fallback;
    const end = to ?? fallback;
    return f + (end - f) * effectiveT;
  };

  const current: VisualState = {
    x: interpNum(fromState.x, toState.x, 0),
    y: interpNum(fromState.y, toState.y, 0),
    scaleX: interpNum(fromState.scaleX, toState.scaleX, 1) * squashScaleX,
    scaleY: interpNum(fromState.scaleY, toState.scaleY, 1) * squashScaleY,
    rotationDeg: interpNum(fromState.rotationDeg, toState.rotationDeg, 0),
    opacity: interpNum(fromState.opacity, toState.opacity, 1),
    width: interpNum(fromState.width, toState.width, 0),
    height: interpNum(fromState.height, toState.height, 0),
    strokeWidth: interpNum(fromState.strokeWidth, toState.strokeWidth, 1),
    custom: { ...fromState.custom, ...toState.custom },
  };

  return {
    current,
    activePhase,
    progress: globalProgress,
    phaseProgress,
    squashScaleX,
    squashScaleY,
    isCompleted: false,
    isStarted: true,
  };
}
