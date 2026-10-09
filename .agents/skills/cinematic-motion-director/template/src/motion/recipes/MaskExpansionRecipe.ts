import { calculateMask } from '../mechanisms/Reveal';
import { calculateZoomThrough } from '../mechanisms/CameraThrough';

export interface MaskExpansionResult {
  clipPath: string;
  zoomScale: number;
  revealedOpacity: number;
}

/**
 * RECIPE: MaskExpansion
 * Composes: Mask + ZoomThrough + Reveal
 * A circular or rectangular optical aperture expands outward while zooming into deeper layers.
 */
export function executeMaskExpansion(
  frame: number,
  startFrame: number,
  duration: number,
  center: { x: number; y: number } = { x: 960, y: 540 }
): MaskExpansionResult {
  const mask = calculateMask(frame, startFrame, duration, 1600, center);
  const zoom = calculateZoomThrough(frame, startFrame, duration, 1.4);

  return {
    clipPath: mask.clipPath,
    zoomScale: zoom.scale,
    revealedOpacity: mask.opacity,
  };
}
