/**
 * V5.1 Motion Primitives: Vector Path & Shape Morphing
 * Implements Rule B10: Object A transforms into Object B without crossfading.
 */
import { lerp } from './easing';

export interface Point2D {
  x: number;
  y: number;
}

/**
 * Interpolates between two equal-length arrays of 2D points.
 */
export const morphPoints = (shapeA: Point2D[], shapeB: Point2D[], progress: number): Point2D[] => {
  const p = Math.max(0, Math.min(1, progress));
  return shapeA.map((ptA, i) => {
    const ptB = shapeB[i] ?? ptA;
    return {
      x: lerp(p, ptA.x, ptB.x),
      y: lerp(p, ptA.y, ptB.y),
    };
  });
};

/**
 * Converts point array into SVG closed polygon path string.
 */
export const pointsToSvgPath = (points: Point2D[]): string => {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  return `M ${first.x.toFixed(2)} ${first.y.toFixed(2)} ` +
    rest.map((pt) => `L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`).join(' ') +
    ' Z';
};

/**
 * Alias for morphPoints for backward-compatibility with vector paths.
 */
export const interpolatePath = morphPoints;

