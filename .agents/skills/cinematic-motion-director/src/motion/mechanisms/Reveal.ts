import { interpolate, Easing } from 'remotion';

export interface RevealState {
  progress: number;
  clipPath: string;
  opacity: number;
  offsetY: number;
}

/**
 * MECHANISM: Reveal
 * Directional linear unmasking with synchronized sliding offset.
 */
export function calculateReveal(
  frame: number,
  startFrame: number,
  duration: number,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  initialOffset: number = 30
): RevealState {
  if (frame <= startFrame) {
    return {
      progress: 0,
      clipPath: direction === 'up' ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
      opacity: 0,
      offsetY: direction === 'up' ? initialOffset : -initialOffset,
    };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const progress = Easing.bezier(0.16, 1, 0.3, 1)(raw);

  let clipPath = 'inset(0 0 0 0)';
  if (direction === 'up') {
    const insetBottom = interpolate(progress, [0, 1], [100, 0]);
    clipPath = `inset(0 0 ${insetBottom}% 0)`;
  } else if (direction === 'down') {
    const insetTop = interpolate(progress, [0, 1], [100, 0]);
    clipPath = `inset(${insetTop}% 0 0 0)`;
  } else if (direction === 'left') {
    const insetRight = interpolate(progress, [0, 1], [100, 0]);
    clipPath = `inset(0 ${insetRight}% 0 0)`;
  } else if (direction === 'right') {
    const insetLeft = interpolate(progress, [0, 1], [100, 0]);
    clipPath = `inset(0 0 0 ${insetLeft}%)`;
  }

  const offsetY = interpolate(progress, [0, 1], [initialOffset, 0]);
  const opacity = interpolate(raw, [0, 0.2, 1], [0, 0.8, 1]);

  return { progress, clipPath, opacity, offsetY };
}

export interface MaskState {
  clipPath: string;
  radius: number;
  opacity: number;
}

/**
 * MECHANISM: Mask
 * Circular iris or rectangular aperture scaling to reveal underlying content.
 */
export function calculateMask(
  frame: number,
  startFrame: number,
  duration: number,
  maxRadius: number = 1400,
  center: { x: number; y: number } = { x: 960, y: 540 }
): MaskState {
  if (frame <= startFrame) {
    return {
      clipPath: `circle(0px at ${center.x}px ${center.y}px)`,
      radius: 0,
      opacity: 0,
    };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(raw);
  const radius = interpolate(eased, [0, 1], [0, maxRadius]);

  return {
    clipPath: `circle(${radius}px at ${center.x}px ${center.y}px)`,
    radius,
    opacity: interpolate(raw, [0, 0.05, 1], [0, 1, 1]),
  };
}
