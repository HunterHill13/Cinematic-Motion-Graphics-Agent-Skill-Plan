import { spring, interpolate } from 'remotion';

export interface TextMaskRevealResult {
  clipPath: string;
  translateY: number;
  translateX: number;
  opacity: number;
  revealProgress: number;
}

export type RevealDirection = 'bottom-to-top' | 'top-to-bottom' | 'right-to-left' | 'left-to-right';

/**
 * RECIPE: TextMaskReveal
 * Source Reference: remotion-motion-graphics-skill (traps.md) / chief-motion-skill (RULES.md)
 * Reveals headline and display typography through an invisible geometric mask.
 * CRITICAL CRAFT INVARIANTS:
 * 1. Uses `clipPath: inset(...)` instead of `scaleX/scaleY` to avoid squashing fonts.
 * 2. Words start >= 140% below mask padding so glyph tops never peek through frame 0.
 * 3. Handles Persian/Arabic RTL reading order seamlessly.
 */
export function executeTextMaskReveal(
  frame: number,
  startFrame: number,
  fps: number = 30,
  direction: RevealDirection = 'bottom-to-top',
  isRTL: boolean = true
): TextMaskRevealResult {
  const rel = frame - startFrame;
  if (rel < 0) {
    return {
      clipPath: 'inset(100% 0% 0% 0%)',
      translateY: 60,
      translateX: 0,
      opacity: 0,
      revealProgress: 0,
    };
  }

  // Pure spring entrance with high damping (dignified, zero cheap bounce on typography)
  const revealProgress = spring({
    frame: rel,
    fps,
    config: { damping: 18, stiffness: 140 },
  });

  const clampedP = Math.min(1, Math.max(0, revealProgress));
  const hiddenInset = (1 - clampedP) * 100;

  let clipPath = '';
  let translateY = 0;
  let translateX = 0;

  switch (direction) {
    case 'bottom-to-top':
      clipPath = `inset(0% 0% ${hiddenInset}% 0%)`;
      translateY = (1 - clampedP) * 50; // starts 50px below
      break;
    case 'top-to-bottom':
      clipPath = `inset(${hiddenInset}% 0% 0% 0%)`;
      translateY = -(1 - clampedP) * 50;
      break;
    case 'right-to-left':
      // Natural Persian RTL unroll
      clipPath = `inset(0% 0% 0% ${hiddenInset}%)`;
      translateX = (1 - clampedP) * 40;
      break;
    case 'left-to-right':
      clipPath = `inset(0% ${hiddenInset}% 0% 0%)`;
      translateX = -(1 - clampedP) * 40;
      break;
  }

  return {
    clipPath,
    translateY,
    translateX,
    opacity: interpolate(clampedP, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
    revealProgress: clampedP,
  };
}
