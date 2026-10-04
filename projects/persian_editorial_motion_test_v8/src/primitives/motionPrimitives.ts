import React from 'react';
import { interpolate, Easing } from 'remotion';

export interface MotionPrimitiveProps {
  frame: number;
  startFrame: number;
  duration?: number;
}

/**
 * Anticipation + Kinetic Entry:
 * Pulls back slightly (-8px) before surging forward with an editorial curve.
 */
export function calculateKineticEntry(
  frame: number,
  startFrame: number,
  duration: number = 25,
  initialOffset: number = 40
): { opacity: number; transform: string; progress: number } {
  const t = (frame - startFrame) / duration;
  const clampedT = Math.max(0, Math.min(1, t));

  if (clampedT <= 0) {
    return { opacity: 0, transform: `translateY(${initialOffset}px)`, progress: 0 };
  }

  // First 20% of duration: slight pull back
  const pullBack = clampedT < 0.2 ? -6 * Math.sin((clampedT / 0.2) * Math.PI) : 0;

  // Main ease
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(clampedT);
  const translateY = interpolate(eased, [0, 1], [initialOffset, 0]) + pullBack;
  const opacity = interpolate(clampedT, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });

  return {
    opacity,
    transform: `translateY(${translateY}px)`,
    progress: eased,
  };
}

/**
 * Scale Punch:
 * Instant impact punch (1.0 -> 1.08 -> 1.0) on semantic arrival.
 */
export function calculateScalePunch(
  frame: number,
  impactFrame: number,
  peakScale: number = 1.08,
  settleDuration: number = 10
): number {
  if (frame < impactFrame) return 1.0;
  const elapsed = frame - impactFrame;
  if (elapsed > settleDuration) return 1.0;

  const t = elapsed / settleDuration;
  // Sine curve decay
  return 1.0 + (peakScale - 1.0) * Math.sin(t * Math.PI) * (1 - t);
}

/**
 * Directional Mask Reveal:
 * Returns clipPath string inset from a chosen direction.
 */
export function calculateDirectionalMask(
  frame: number,
  startFrame: number,
  duration: number = 30,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'right'
): string {
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const hiddenPercent = (1 - progress) * 100;

  switch (direction) {
    case 'right':
      return `inset(0 ${hiddenPercent}% 0 0)`;
    case 'left':
      return `inset(0 0 0 ${hiddenPercent}%)`;
    case 'bottom':
      return `inset(0 0 ${hiddenPercent}% 0)`;
    case 'top':
      return `inset(${hiddenPercent}% 0 0 0)`;
  }
}
