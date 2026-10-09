import { interpolate, Easing } from 'remotion';

export interface CameraThroughState {
  zoom: number;
  panX: number;
  panY: number;
  perspective: number;
  exitApertureOpacity: number;
}

/**
 * MECHANISM: CameraThrough
 * Pushes the camera forward through an aperture or frame boundary into the next scene.
 */
export function calculateCameraThrough(
  frame: number,
  startFrame: number,
  duration: number,
  targetPoint: { x: number; y: number } = { x: 960, y: 540 }
): CameraThroughState {
  if (frame <= startFrame) {
    return { zoom: 1.0, panX: 0, panY: 0, perspective: 1400, exitApertureOpacity: 1 };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  // Exponential push in the final 30% of movement
  const eased = Easing.bezier(0.7, 0, 0.3, 1)(raw);

  const zoom = interpolate(eased, [0, 1], [1.0, 3.5]);
  const panX = interpolate(eased, [0, 1], [0, -(targetPoint.x - 960) * 1.5]);
  const panY = interpolate(eased, [0, 1], [0, -(targetPoint.y - 540) * 1.5]);
  const exitApertureOpacity = interpolate(raw, [0.7, 1], [1, 0]);

  return { zoom, panX, panY, perspective: 1400, exitApertureOpacity };
}

export interface ZoomThroughState {
  scale: number;
  opacity: number;
  blur: number;
}

/**
 * MECHANISM: ZoomThrough
 * Subject scales aggressively toward the viewer until passing the camera plane.
 */
export function calculateZoomThrough(
  frame: number,
  startFrame: number,
  duration: number,
  maxScale: number = 8.0
): ZoomThroughState {
  if (frame <= startFrame) {
    return { scale: 1.0, opacity: 1.0, blur: 0 };
  }

  const raw = Math.min(1, Math.max(0, (frame - startFrame) / Math.max(1, duration)));
  const eased = Easing.bezier(0.5, 0, 0.1, 1)(raw);

  const scale = interpolate(eased, [0, 1], [1.0, maxScale]);
  const opacity = interpolate(raw, [0, 0.7, 1], [1, 0.8, 0]);
  const blur = interpolate(raw, [0.6, 1], [0, 16]);

  return { scale, opacity, blur };
}

export interface ParallaxState {
  layerOffsets: number[];
}

/**
 * MECHANISM: Parallax
 * Calculates differential translation offsets for multi-depth layers.
 */
export function calculateParallax(
  baseOffset: number,
  depthMultipliers: number[] = [0.2, 0.5, 1.0, 1.6]
): ParallaxState {
  return {
    layerOffsets: depthMultipliers.map((m) => baseOffset * m),
  };
}
