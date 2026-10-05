import { interpolate, Easing } from 'remotion';

export interface FoldState {
  rotateX: number;
  rotateY: number;
  perspective: number;
  depthShadow: number;
  opacity: number;
}

/**
 * MECHANISM: Fold
 * 3D isometric or perspective fold along an edge hinge.
 */
export function calculateFold(
  frame: number,
  startFrame: number,
  duration: number,
  axis: 'X' | 'Y' = 'X',
  startAngle: number = 90,
  endAngle: number = 0
): FoldState {
  if (frame <= startFrame) {
    return {
      rotateX: axis === 'X' ? startAngle : 0,
      rotateY: axis === 'Y' ? startAngle : 0,
      perspective: 1200,
      depthShadow: 0.8,
      opacity: 0,
    };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const progress = Easing.bezier(0.16, 1, 0.3, 1)(raw);

  const angle = interpolate(progress, [0, 1], [startAngle, endAngle]);
  const depthShadow = interpolate(progress, [0, 1], [0.8, 0]);
  const opacity = interpolate(raw, [0, 0.1, 1], [0, 0.8, 1]);

  return {
    rotateX: axis === 'X' ? angle : 0,
    rotateY: axis === 'Y' ? angle : 0,
    perspective: 1200,
    depthShadow,
    opacity,
  };
}

export interface CollapseState {
  scaleDimension: number;
  opacity: number;
  isCollapsed: boolean;
}

/**
 * MECHANISM: Collapse
 * Dimensional compression of an axis or geometry down to a line or point.
 */
export function calculateCollapse(
  frame: number,
  startFrame: number,
  duration: number,
  mode: 'toZero' | 'fromZero' = 'toZero'
): CollapseState {
  if (frame < startFrame) {
    return {
      scaleDimension: mode === 'toZero' ? 1 : 0,
      opacity: mode === 'toZero' ? 1 : 0,
      isCollapsed: mode === 'fromZero',
    };
  }

  const raw = Math.min(1, (frame - startFrame) / Math.max(1, duration));
  const progress = Easing.bezier(0.4, 0, 0.2, 1)(raw);

  const scaleDimension = mode === 'toZero'
    ? interpolate(progress, [0, 1], [1, 0])
    : interpolate(progress, [0, 1], [0, 1]);

  const opacity = mode === 'toZero'
    ? interpolate(raw, [0, 0.8, 1], [1, 0.3, 0])
    : interpolate(raw, [0, 0.2, 1], [0, 0.7, 1]);

  return {
    scaleDimension,
    opacity,
    isCollapsed: mode === 'toZero' ? raw >= 1 : raw <= 0,
  };
}
