import { interpolate, Easing } from 'remotion';

export type CameraMode =
  | 'locked'
  | 'micro-push'
  | 'micro-pull'
  | 'slow-dolly'
  | 'parallax-drift'
  | 'reframe'
  | 'punch-in'
  | 'continuous';

export interface CameraCurveConfig {
  mode: CameraMode;
  durationInFrames: number;
  startZoom?: number;
  endZoom?: number;
  panX?: [number, number];
  panY?: [number, number];
  tiltDeg?: number;
  depth?: number;
  punchFrame?: number;
  punchIntensity?: number;
  readingWindows?: [number, number][];
  settleFrame?: number;
}

export interface CameraState {
  zoom: number;
  panX: number;
  panY: number;
  tiltDeg: number;
  depth: number;
  transformStyle: string;
}

/**
 * CALCULATE CAMERA GRAMMAR CURVE
 * Enforces V13 Rule: Exactly ONE primary camera curve per shot.
 * Smooth, motivated editorial camera motion inspired by video-talkcraft & video-shotcraft.
 * V21 Choreography 2.0: Supports Reading Holds and Settle Locks for zero font rasterization jitter.
 */
export function calculateCameraGrammar(
  frame: number,
  config: CameraCurveConfig
): CameraState {
  const {
    mode,
    durationInFrames,
    startZoom = 1.0,
    endZoom = 1.03,
    panX = [0, 0],
    panY = [0, 0],
    tiltDeg = 0,
    depth = 1200,
    punchFrame,
    punchIntensity = 0.025,
    readingWindows,
    settleFrame,
  } = config;

  // Determine effective frame considering reading windows or settle lock
  let effectiveFrame = frame;
  if (settleFrame !== undefined && frame >= settleFrame) {
    effectiveFrame = settleFrame;
  } else if (readingWindows && readingWindows.length > 0) {
    for (const [wStart, wEnd] of readingWindows) {
      if (frame >= wStart && frame <= wEnd) {
        effectiveFrame = wStart;
        break;
      }
    }
  }

  const progress = Math.min(1, Math.max(0, effectiveFrame / Math.max(1, durationInFrames)));
  const easeInOut = Easing.bezier(0.25, 0.1, 0.25, 1)(progress);

  let zoom = startZoom;
  let currentPanX = panX[0];
  let currentPanY = panY[0];

  switch (mode) {
    case 'micro-push':
      zoom = interpolate(easeInOut, [0, 1], [startZoom, endZoom]);
      break;

    case 'micro-pull':
      zoom = interpolate(easeInOut, [0, 1], [endZoom, startZoom]);
      break;

    case 'slow-dolly':
      zoom = interpolate(easeInOut, [0, 1], [startZoom, endZoom]);
      currentPanX = interpolate(easeInOut, [0, 1], [panX[0], panX[1]]);
      currentPanY = interpolate(easeInOut, [0, 1], [panY[0], panY[1]]);
      break;

    case 'parallax-drift':
      zoom = interpolate(easeInOut, [0, 1], [startZoom, endZoom]);
      currentPanX = interpolate(easeInOut, [0, 1], [panX[0], panX[1]]);
      break;

    case 'punch-in':
      if (punchFrame !== undefined && frame >= punchFrame) {
        const elapsed = frame - punchFrame;
        const punchProgress = Math.min(1, elapsed / 20);
        const settle = Math.exp(-0.18 * elapsed) * Math.cos(0.5 * elapsed);
        zoom = startZoom + punchIntensity * settle;
      } else {
        zoom = startZoom;
      }
      break;

    case 'continuous':
      zoom = interpolate(easeInOut, [0, 1], [startZoom, endZoom]);
      currentPanX = interpolate(easeInOut, [0, 1], [panX[0], panX[1]]);
      currentPanY = interpolate(easeInOut, [0, 1], [panY[0], panY[1]]);
      break;

    case 'locked':
    default:
      zoom = startZoom;
      break;
  }

  return {
    zoom,
    panX: currentPanX,
    panY: currentPanY,
    tiltDeg,
    depth,
    transformStyle: `scale(${zoom.toFixed(4)}) translate3d(${currentPanX.toFixed(1)}px, ${currentPanY.toFixed(1)}px, 0px) ${tiltDeg !== 0 ? `rotateX(${tiltDeg}deg)` : ''}`,
  };
}
