import { interpolate, Easing } from 'remotion';

export interface MilestoneState {
  index: number;
  active: boolean;
  scale: number;
  opacity: number;
  glow: number;
}

export interface RevealAndEscalateResult {
  baselineProgress: number;
  contentOpacity: number;
  contentY: number;
  milestones: MilestoneState[];
}

/**
 * RECIPE 04: REVEAL AND ESCALATE
 * Sequential escalation and structured unveiling.
 * - Draws baseline rule from anchor origin.
 * - Slides and fades editorial typography out of baseline mask.
 * - Escalates discrete milestone indicators sequentially with crisp pop.
 */
export function calculateRevealAndEscalate(
  frame: number,
  startFrame: number,
  milestoneCount: number,
  milestoneInterval: number = 8,
  config?: {
    baselineDuration?: number;
    textDuration?: number;
    textOffset?: number;
  }
): RevealAndEscalateResult {
  const {
    baselineDuration = 18,
    textDuration = 22,
    textOffset = 24,
  } = config || {};

  // 1. Baseline Expansion
  const bRaw = Math.min(1, Math.max(0, (frame - startFrame) / baselineDuration));
  const baselineProgress = Easing.bezier(0.16, 1, 0.3, 1)(bRaw);

  // 2. Typography Reveal
  const textStart = startFrame + 4;
  const tRaw = Math.min(1, Math.max(0, (frame - textStart) / textDuration));
  const tEased = Easing.bezier(0.16, 1, 0.3, 1)(tRaw);
  const contentOpacity = interpolate(tRaw, [0, 0.3, 1], [0, 0.8, 1]);
  const contentY = interpolate(tEased, [0, 1], [textOffset, 0]);

  // 3. Milestone Indicators Escalation
  const milestoneStart = textStart + 10;
  const milestones: MilestoneState[] = Array.from({ length: milestoneCount }).map((_, i) => {
    const trigger = milestoneStart + i * milestoneInterval;
    const active = frame >= trigger;
    if (!active) {
      return { index: i, active: false, scale: 0.5, opacity: 0.2, glow: 0 };
    }

    const elapsed = frame - trigger;
    const pop = Math.min(1, elapsed / 8);
    const popEased = Easing.bezier(0.34, 1.56, 0.64, 1)(pop);
    const scale = interpolate(popEased, [0, 1], [0.5, 1.0]);
    const glow = Math.max(0, Math.exp(-0.25 * elapsed));

    return {
      index: i,
      active: true,
      scale,
      opacity: 1.0,
      glow,
    };
  });

  return {
    baselineProgress,
    contentOpacity,
    contentY,
    milestones,
  };
}
