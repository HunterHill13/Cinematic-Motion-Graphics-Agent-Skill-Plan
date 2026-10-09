import { interpolate, Easing } from 'remotion';

export interface TypeOutlineFillResult {
  strokeDashoffset: number;
  strokeDasharray: number;
  fillOpacity: number;
  strokeOpacity: number;
  scale: number;
  isFilled: boolean;
}

/**
 * RECIPE: TypeOutlineFill
 * Source Reference: motion-graphics-skills (kinetic-typography) / hyperframes (mk-specs-list)
 * Vector typography renders first as an architectural wireframe stroke, then floods
 * with solid fill on the exact acoustic beat or emphasis syllable.
 */
export function executeTypeOutlineFill(
  frame: number,
  startFrame: number,
  hitFrame: number,
  totalPerimeter: number = 600
): TypeOutlineFillResult {
  const rel = frame - startFrame;
  const drawDuration = hitFrame - startFrame;

  if (rel < 0) {
    return {
      strokeDashoffset: totalPerimeter,
      strokeDasharray: totalPerimeter,
      fillOpacity: 0,
      strokeOpacity: 0,
      scale: 1,
      isFilled: false,
    };
  }

  // 1. Draw phase (startFrame -> hitFrame)
  const drawP = Math.min(1, Math.max(0, rel / Math.max(1, drawDuration)));
  const easedDraw = Easing.bezier(0.25, 0.1, 0.25, 1.0)(drawP);
  const strokeDashoffset = totalPerimeter * (1 - easedDraw);

  // 2. Hit & Flood phase (hitFrame onwards)
  const isFilled = frame >= hitFrame;
  const floodRel = frame - hitFrame;
  const fillOpacity = isFilled
    ? interpolate(floodRel, [0, 6], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      })
    : 0;

  // Impact micro-accent on flood hit
  const impactPop = isFilled && floodRel >= 0 && floodRel <= 8
    ? Math.sin((floodRel / 8) * Math.PI) * 0.05
    : 0;

  return {
    strokeDashoffset,
    strokeDasharray: totalPerimeter,
    fillOpacity,
    strokeOpacity: isFilled ? Math.max(0, 1 - floodRel / 10) : 1,
    scale: 1 + impactPop,
    isFilled,
  };
}
