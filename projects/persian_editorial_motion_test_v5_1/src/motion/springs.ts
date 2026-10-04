/**
 * V5.1 Motion Primitives: Physics Spring Models & Presets
 */

export interface SpringConfig {
  mass: number;
  damping: number;
  stiffness: number;
  overshootClamping?: boolean;
}

export const SPRING_PRESETS = {
  // Snappy institutional lock (quick settle, minimal bounce)
  snappy: { mass: 0.8, damping: 14, stiffness: 160 },
  // Smooth documentary ease
  gentle: { mass: 1.2, damping: 18, stiffness: 120 },
  // Metric overshoot for dial sweeps and badge pops
  overshoot: { mass: 1.0, damping: 10, stiffness: 140 },
  // Micro-interaction bounce
  bouncy: { mass: 0.6, damping: 8, stiffness: 180 },
};

/**
 * Analytical damped harmonic oscillator
 * Returns value in [0, 1] as t goes from 0 upwards (t in seconds).
 */
export const springValue = (
  t: number,
  config: SpringConfig = SPRING_PRESETS.snappy
): number => {
  if (t <= 0) return 0;
  const { mass, damping, stiffness } = config;
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(mass * stiffness));

  if (zeta < 1) {
    // Underdamped (subtle oscillation)
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    const envelope = Math.exp(-zeta * w0 * t);
    return 1 - envelope * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
  } else {
    // Critically damped / Overdamped
    return 1 - (1 + w0 * t) * Math.exp(-w0 * t);
  }
};
