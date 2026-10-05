import { calculateDraw } from '../mechanisms/Draw';
import { calculateReveal } from '../mechanisms/Reveal';
import { calculateFollow } from '../mechanisms/Follow';

export interface MilestoneState {
  index: number;
  active: boolean;
  scale: number;
  glow: number;
}

export interface SequentialMilestoneResult {
  axisProgress: number;
  milestones: MilestoneState[];
  confirmedCount: number;
}

/**
 * RECIPE: SequentialMilestone
 * Composes: Draw + Reveal + Follow
 * A series of legal or score milestones ignite in a rhythmic cadence along an axis.
 */
export function executeSequentialMilestone(
  frame: number,
  startFrame: number,
  count: number,
  interval: number = 8
): SequentialMilestoneResult {
  const draw = calculateDraw(frame, startFrame, count * interval, 1000);

  let confirmed = 0;
  const milestones: MilestoneState[] = Array.from({ length: count }).map((_, i) => {
    const trigger = startFrame + i * interval;
    const active = frame >= trigger;
    if (active) confirmed++;

    const elapsed = frame - trigger;
    const pop = active ? Math.min(1, elapsed / 6) : 0;
    const scale = active ? 1.0 + 0.3 * Math.exp(-0.3 * elapsed) : 0.4;
    const glow = active ? Math.max(0, Math.exp(-0.2 * elapsed)) : 0;

    return { index: i, active, scale, glow };
  });

  return {
    axisProgress: draw.progress,
    milestones,
    confirmedCount: confirmed,
  };
}
