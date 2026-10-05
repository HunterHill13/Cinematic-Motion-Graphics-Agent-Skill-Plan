import { calculateFold } from '../mechanisms/Fold';
import { calculateCameraThrough } from '../mechanisms/CameraThrough';

export interface SpatialReorientationResult {
  perspectiveTiltX: number;
  perspectiveTiltY: number;
  cameraZoom: number;
  isOriented: boolean;
}

/**
 * RECIPE: SpatialReorientation
 * Composes: Fold + Collapse + CameraThrough
 * Reorients the 2D Cartesian stage into dynamic 3D editorial perspective.
 */
export function executeSpatialReorientation(
  frame: number,
  startFrame: number,
  duration: number
): SpatialReorientationResult {
  const fold = calculateFold(frame, startFrame, duration, 'X', 0, 25);
  const cam = calculateCameraThrough(frame, startFrame, duration);

  return {
    perspectiveTiltX: fold.rotateX,
    perspectiveTiltY: fold.rotateY,
    cameraZoom: cam.zoom,
    isOriented: frame >= startFrame + duration,
  };
}
