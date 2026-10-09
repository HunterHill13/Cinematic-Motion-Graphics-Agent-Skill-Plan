import {
  calculateCameraThrough,
  calculateZoomThrough,
  calculateParallax,
  CameraThroughState,
  ZoomThroughState,
  ParallaxState,
} from '../mechanisms/CameraThrough';

export interface CameraPunchThroughResult {
  camera: CameraThroughState;
  zoom: ZoomThroughState;
  parallax: ParallaxState;
  combinedScale: number;
}

/**
 * RECIPE: CameraPunchThrough
 * Composes: CameraThrough + ZoomThrough + Parallax
 * Extreme dynamic camera dive passing through a framing focal element,
 * with differentiated parallax depth layers and aperture blowout.
 */
export function executeCameraPunchThrough(
  frame: number,
  startFrame: number,
  duration: number,
  targetPoint: { x: number; y: number } = { x: 960, y: 540 }
): CameraPunchThroughResult {
  const camera = calculateCameraThrough(frame, startFrame, duration, targetPoint);
  const zoom = calculateZoomThrough(frame, startFrame, duration, 6.0);
  const parallax = calculateParallax(camera.panX, [0.3, 0.7, 1.2, 2.0]);

  return {
    camera,
    zoom,
    parallax,
    combinedScale: camera.zoom * zoom.scale * 0.5,
  };
}
