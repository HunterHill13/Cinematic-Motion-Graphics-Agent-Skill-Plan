/**
 * Deterministic Procedural Noise Field for Remotion
 * Provides seed-indexed, multi-octave continuous organic noise.
 * Guarantees 100% deterministic, seek-safe values across render threads.
 */

export interface NoiseOptions {
  seed?: number;
  octaves?: number;
  frequency?: number;
  amplitude?: number;
}

/**
 * Fast seedable pseudo-random hash generator for coordinate pairs.
 */
function hash(n: number): number {
  const sinVal = Math.sin(n) * 43758.5453123;
  return sinVal - Math.floor(sinVal);
}

/**
 * 1D multi-octave organic noise function.
 * Evaluates sum of sinusoids with irrational phase ratios to avoid visible looping.
 */
export function organicNoise1D(frame: number, options: NoiseOptions = {}): number {
  const { seed = 42, octaves = 3, frequency = 0.02, amplitude = 1.0 } = options;
  let total = 0;
  let currentFreq = frequency;
  let currentAmp = amplitude;

  // Multi-octave irrational harmonic series
  const harmonics = [1.0, 2.47, 5.19, 9.83];

  for (let i = 0; i < Math.min(octaves, harmonics.length); i++) {
    const phase = hash(seed * (i + 1) * 17.31) * Math.PI * 2;
    total += Math.sin(frame * currentFreq * harmonics[i] + phase) * currentAmp;
    currentAmp *= 0.45;
  }

  return total;
}

/**
 * 2D vector noise returning [dx, dy] offsets suitable for organic position drift.
 */
export function organicDrift2D(
  frame: number,
  options: NoiseOptions = {}
): [number, number] {
  const s = options.seed ?? 101;
  const dx = organicNoise1D(frame, { ...options, seed: s });
  const dy = organicNoise1D(frame, { ...options, seed: s + 733 });
  return [dx, dy];
}
