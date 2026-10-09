import { interpolate, spring, Easing } from 'remotion';

export interface SwapElementState {
  opacity: number;
  translateY: number;
  scale: number;
  isVisible: boolean;
}

export interface SequentialSwapResult {
  outgoing: SwapElementState;
  incoming: SwapElementState;
  activeTarget: 'outgoing' | 'gap' | 'incoming';
}

/**
 * RECIPE: SequentialSwap
 * Source Reference: chief-motion-skill (RULES.md: Sequential Swaps)
 * Swaps two lines or visual elements sequentially.
 * NON-NEGOTIABLE RULE:
 * The outgoing line is fully gone before the incoming one lands.
 * At most one frame of overlap is allowed, with outgoing line >= 95% gone.
 * Eliminates double-exposed captions and muddy collisions.
 */
export function executeSequentialSwap(
  frame: number,
  exitStartFrame: number,
  exitDuration: number = 8,
  incomingDelay: number = 2, // Brief gap of stillness between outgoing and incoming
  fps: number = 30
): SequentialSwapResult {
  const enterStartFrame = exitStartFrame + exitDuration + incomingDelay;

  // 1. Outgoing Element
  let outOpacity = 1;
  let outTranslateY = 0;
  let outScale = 1;
  let outVisible = true;

  if (frame >= exitStartFrame) {
    const exitP = Math.min(1, Math.max(0, (frame - exitStartFrame) / exitDuration));
    const easedExit = Easing.in(Easing.quad)(exitP);
    outOpacity = 1 - easedExit;
    outTranslateY = -easedExit * 30; // lifts upward through mask
    outScale = 1 - easedExit * 0.05;
    if (exitP >= 1) {
      outVisible = false;
      outOpacity = 0;
    }
  }

  // 2. Incoming Element
  let inOpacity = 0;
  let inTranslateY = 30; // arrives from below
  let inScale = 0.95;
  let inVisible = false;

  if (frame >= enterStartFrame) {
    inVisible = true;
    const enterRel = frame - enterStartFrame;
    const springP = spring({
      frame: enterRel,
      fps,
      config: { damping: 16, stiffness: 140 },
    });
    inOpacity = interpolate(springP, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });
    inTranslateY = (1 - springP) * 30;
    inScale = 0.95 + springP * 0.05;
  }

  const activeTarget: 'outgoing' | 'gap' | 'incoming' =
    frame < exitStartFrame + exitDuration
      ? 'outgoing'
      : frame < enterStartFrame
      ? 'gap'
      : 'incoming';

  return {
    outgoing: {
      opacity: outOpacity,
      translateY: outTranslateY,
      scale: outScale,
      isVisible: outVisible,
    },
    incoming: {
      opacity: inOpacity,
      translateY: inTranslateY,
      scale: inScale,
      isVisible: inVisible,
    },
    activeTarget,
  };
}
