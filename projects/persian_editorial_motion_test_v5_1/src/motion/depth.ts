/**
 * V5.1 Motion Primitives: Multiplane Depth Architecture
 * Implements Rule B12: 3-Plane Parallax Hierarchy
 */

export interface DepthPlaneConfig {
  parallaxFactor: number;
  blurPx: number;
  opacity: number;
}

export const DEPTH_PLANES = {
  // Layer 0: Deep background grid & celestial coordinates
  background: {
    parallaxFactor: 0.35,
    blurPx: 2.0,
    opacity: 0.85,
  },
  // Layer 1: Core narrative subject & sharp typography
  midground: {
    parallaxFactor: 0.70,
    blurPx: 0.0,
    opacity: 1.0,
  },
  // Layer 2: Passing foreground lens accents & kinetic particles
  foreground: {
    parallaxFactor: 1.40,
    blurPx: 3.0,
    opacity: 0.40,
  },
};

export const computeParallaxOffset = (
  baseOffset: number,
  plane: keyof typeof DEPTH_PLANES
): number => {
  return baseOffset * DEPTH_PLANES[plane].parallaxFactor;
};
