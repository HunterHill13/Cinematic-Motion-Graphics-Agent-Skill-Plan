import { calculateDraw } from '../mechanisms/Draw';
import { calculateReveal } from '../mechanisms/Reveal';
import { calculateFollow } from '../mechanisms/Follow';

export interface DiagramRevealResult {
  baselineDrawProgress: number;
  baselineDashOffset: number;
  headerOpacity: number;
  headerOffsetY: number;
  subnodeFollow: { x: number; y: number; opacity: number };
}

/**
 * RECIPE: DiagramReveal
 * Composes: Draw + Reveal + Follow
 * Progressive schematic unveiling: Vector datum line draws, typography unmasks upwards,
 * and supporting subnodes follow with lagging inertia.
 */
export function executeDiagramReveal(
  frame: number,
  startFrame: number,
  baselineDuration: number,
  pathLength: number,
  nodeOrigin: { x: number; y: number },
  nodeTarget: { x: number; y: number }
): DiagramRevealResult {
  const draw = calculateDraw(frame, startFrame, baselineDuration, pathLength);
  const reveal = calculateReveal(frame, startFrame + 6, 22, 'up', 28);
  const follow = calculateFollow(
    frame,
    startFrame + 8,
    20,
    nodeOrigin,
    nodeTarget,
    { delayFrames: 4 }
  );

  return {
    baselineDrawProgress: draw.progress,
    baselineDashOffset: draw.dashOffset,
    headerOpacity: reveal.opacity,
    headerOffsetY: reveal.offsetY,
    subnodeFollow: {
      x: follow.x,
      y: follow.y,
      opacity: follow.opacity,
    },
  };
}
