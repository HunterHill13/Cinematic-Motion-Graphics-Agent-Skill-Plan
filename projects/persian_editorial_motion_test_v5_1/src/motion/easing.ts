/**
 * V5.1 Motion Primitives: Easing & Kinematic Interpolation
 * Reused and adapted from _research/video-shotcraft/demos/_fixtures/Motion.tsx
 */

export const E = {
  linear: (t: number) => t,
  inQuad: (t: number) => t * t,
  outQuad: (t: number) => t * (2 - t),
  inOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  inCubic: (t: number) => t * t * t,
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  outQuint: (t: number) => 1 - Math.pow(1 - t, 5),
  inQuart: (t: number) => t * t * t * t,
  outExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inExpo: (t: number) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  outBack: (t: number, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
  inBack: (t: number, s = 1.70158) => (s + 1) * t * t * t - s * t * t,
  poly: (power: number) => (t: number) => Math.pow(t, power),
  outPoly: (power: number) => (t: number) => 1 - Math.pow(1 - t, power),
};

export const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val));

export const lerp = (t: number, a: number, b: number) => a + (b - a) * t;

/**
 * Normalized clamped segment progress with easing.
 * Core primitive for all timeline choreography.
 */
export const seg = (
  t: number,
  t0: number,
  t1: number,
  ease: (x: number) => number = E.linear
): number => {
  if (t0 === t1) return t >= t1 ? 1 : 0;
  const progress = clamp((t - t0) / (t1 - t0), 0, 1);
  return ease(progress);
};
