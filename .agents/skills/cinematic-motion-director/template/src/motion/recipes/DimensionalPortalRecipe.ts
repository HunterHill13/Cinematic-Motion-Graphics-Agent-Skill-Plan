import { calculateReveal, RevealState } from '../mechanisms/Reveal';
import { calculateZoomThrough, ZoomThroughState } from '../mechanisms/CameraThrough';
import { calculateMorph, MorphState } from '../mechanisms/Morph';

export interface DimensionalPortalResult {
  reveal: RevealState;
  zoom: ZoomThroughState;
  morph: MorphState;
  portalRadius: number;
}

/**
 * RECIPE: DimensionalPortal
 * Composes: Mask + ZoomThrough + Morph
 * Creates an expanding dimensional portal that morphs from an icon or badge
 * into a full-bleed window through which the next shot is unveiled.
 */
export function executeDimensionalPortal(
  frame: number,
  startFrame: number,
  duration: number
): DimensionalPortalResult {
  const reveal = calculateReveal(frame, startFrame, duration, 'up', 0);
  const zoom = calculateZoomThrough(frame, startFrame, duration, 7.5);
  const morph = calculateMorph(
    frame,
    startFrame,
    duration,
    { width: 120, height: 120, borderRadius: 60 },
    { width: 1920, height: 1080, borderRadius: 0 }
  );

  return {
    reveal,
    zoom,
    morph,
    portalRadius: morph.borderRadius,
  };
}
