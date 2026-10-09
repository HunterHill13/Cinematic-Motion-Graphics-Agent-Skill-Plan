import { interpolate, Easing } from 'remotion';

export interface RippleState {
  active: boolean;
  radius: number;
  opacity: number;
  strokeWidth: number;
}

/**
 * MECHANISM: Ripple
 * Expands radial concentric rings upon kinetic impact.
 */
export function calculateRipple(
  frame: number,
  triggerFrame: number,
  duration: number = 24,
  maxRadius: number = 180,
  maxStroke: number = 2.5
): RippleState {
  if (frame < triggerFrame || frame > triggerFrame + duration) {
    return { active: false, radius: 0, opacity: 0, strokeWidth: 0 };
  }

  const raw = (frame - triggerFrame) / duration;
  const eased = Easing.bezier(0.1, 0.9, 0.2, 1)(raw);

  return {
    active: true,
    radius: interpolate(eased, [0, 1], [4, maxRadius]),
    opacity: interpolate(raw, [0, 0.15, 1], [1, 0.8, 0]),
    strokeWidth: interpolate(raw, [0, 1], [maxStroke, 0.5]),
  };
}
