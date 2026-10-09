import { interpolate, Easing } from 'remotion';

export interface KineticTypeState {
  scale: number;
  weightShift: number;
  letterSpacing: number;
  offsetY: number;
  opacity: number;
}

/**
 * MECHANISM: KineticType
 * Editorial dynamic typographic slam with micro-tracking expansion.
 */
export function calculateKineticType(
  frame: number,
  startFrame: number,
  slamFrame: number,
  settleDuration: number = 16,
  initialOffsetY: number = 40
): KineticTypeState {
  if (frame < startFrame) {
    return { scale: 0.9, weightShift: 400, letterSpacing: 0, offsetY: initialOffsetY, opacity: 0 };
  }

  if (frame <= slamFrame) {
    const raw = (frame - startFrame) / Math.max(1, slamFrame - startFrame);
    const eased = Easing.bezier(0.2, 0, 0, 1)(raw);
    return {
      scale: interpolate(eased, [0, 1], [0.92, 1.05]),
      weightShift: interpolate(eased, [0, 1], [400, 900]),
      letterSpacing: interpolate(eased, [0, 1], [0, 2]),
      offsetY: interpolate(eased, [0, 1], [initialOffsetY, 0]),
      opacity: interpolate(raw, [0, 0.3, 1], [0, 0.8, 1]),
    };
  }

  // Settle ringing after slam
  const elapsed = frame - slamFrame;
  const damp = Math.exp(-0.25 * elapsed);
  const settleScale = 1.0 + 0.05 * damp * Math.sin(0.8 * elapsed);
  const letterSpacing = interpolate(Math.min(1, elapsed / settleDuration), [0, 1], [2, 0]);

  return {
    scale: settleScale,
    weightShift: 900,
    letterSpacing,
    offsetY: 0,
    opacity: 1,
  };
}

export interface CounterMotionState {
  primaryOffset: number;
  counterOffset: number;
}

/**
 * MECHANISM: CounterMotion
 * Moves elements in complementary opposing directions to create dynamic visual balance.
 */
export function calculateCounterMotion(
  frame: number,
  startFrame: number,
  duration: number,
  magnitude: number = 60,
  axis: 'horizontal' | 'vertical' = 'horizontal'
): CounterMotionState {
  if (frame <= startFrame) {
    return { primaryOffset: 0, counterOffset: 0 };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(raw);

  return {
    primaryOffset: interpolate(eased, [0, 1], [0, magnitude]),
    counterOffset: interpolate(eased, [0, 1], [0, -magnitude]),
  };
}

export interface OrbitState {
  x: number;
  y: number;
  angle: number;
  scale: number;
  depthZ: number;
}

/**
 * MECHANISM: Orbit
 * Centripetal 3D elliptical circulation around an attractor.
 */
export function calculateOrbit(
  frame: number,
  center: { x: number; y: number },
  radiusX: number = 140,
  radiusY: number = 70,
  speed: number = 0.04,
  startAngle: number = 0
): OrbitState {
  const angle = startAngle + frame * speed;
  const x = center.x + Math.cos(angle) * radiusX;
  const y = center.y + Math.sin(angle) * radiusY;
  // Depth oscillation for 3D faux perspective
  const depthZ = Math.sin(angle);
  const scale = 0.85 + 0.3 * ((depthZ + 1) / 2);

  return { x, y, angle, scale, depthZ };
}

export interface GravityState {
  pullFactor: number;
  displacementX: number;
  displacementY: number;
}

/**
 * MECHANISM: Gravity
 * Exponential inverse-square attraction pulling elements toward a center point.
 */
export function calculateGravity(
  frame: number,
  triggerFrame: number,
  duration: number,
  from: { x: number; y: number },
  attractor: { x: number; y: number }
): GravityState {
  if (frame <= triggerFrame) {
    return { pullFactor: 0, displacementX: 0, displacementY: 0 };
  }

  const raw = Math.min(1, (frame - triggerFrame) / Math.max(1, duration));
  const pullFactor = Easing.bezier(0.7, 0, 0.9, 0)(raw); // Exponential acceleration

  const displacementX = (attractor.x - from.x) * pullFactor;
  const displacementY = (attractor.y - from.y) * pullFactor;

  return { pullFactor, displacementX, displacementY };
}
