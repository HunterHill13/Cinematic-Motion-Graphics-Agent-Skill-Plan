/**
 * Aspect Ratio Director (v2.1)
 *
 * Defines format-specific cinematography, safe margins, and layout geometry.
 * Aspect ratio is treated as a foundational visual storytelling constraint,
 * not merely an export setting.
 */

export type AspectRatioType = '16:9' | '9:16' | '1:1';

export interface AspectRatioConfig {
  type: AspectRatioType;
  width: number;
  height: number;
  fps: number;
  safeArea: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  cinematography: {
    layoutOrientation: 'horizontal' | 'vertical' | 'radial';
    compositionStyle: string;
    cameraFraming: string;
    maxHorizontalSpread: number; // Max px width for central hero content
    uiOverlaySafeZoneBottom: number; // For TikTok / Reels caption & UI buttons
    uiOverlaySafeZoneTop: number;
  };
}

export const ASPECT_RATIO_CONFIGS: Record<AspectRatioType, AspectRatioConfig> = {
  '16:9': {
    type: '16:9',
    width: 1920,
    height: 1080,
    fps: 30,
    safeArea: {
      top: 60,
      bottom: 80,
      left: 100,
      right: 100,
    },
    cinematography: {
      layoutOrientation: 'horizontal',
      compositionStyle: 'Wider establishing shots, side-by-side comparative nodes, horizontal flow',
      cameraFraming: 'Cinematic wide and medium shots with sweeping horizontal parallax',
      maxHorizontalSpread: 1720,
      uiOverlaySafeZoneBottom: 90,
      uiOverlaySafeZoneTop: 70,
    },
  },
  '9:16': {
    type: '9:16',
    width: 1080,
    height: 1920,
    fps: 30,
    safeArea: {
      top: 180, // Platform header safe zone (Instagram/TikTok status bar)
      bottom: 320, // Platform UI safe zone (captions, like/share icons, sound title)
      left: 70,
      right: 90,
    },
    cinematography: {
      layoutOrientation: 'vertical',
      compositionStyle: 'Vertical stack hierarchy, strong center focal lock, foreground/background depth',
      cameraFraming: 'Tighter vertical framing, vertical tilt reveals, deep z-axis push',
      maxHorizontalSpread: 920,
      uiOverlaySafeZoneBottom: 320,
      uiOverlaySafeZoneTop: 180,
    },
  },
  '1:1': {
    type: '1:1',
    width: 1080,
    height: 1080,
    fps: 30,
    safeArea: {
      top: 80,
      bottom: 90,
      left: 80,
      right: 80,
    },
    cinematography: {
      layoutOrientation: 'radial',
      compositionStyle: 'Centered concentric focus, radial nodes, compact balanced layout',
      cameraFraming: 'Balanced medium close-ups with centered orbit/pull dynamics',
      maxHorizontalSpread: 920,
      uiOverlaySafeZoneBottom: 100,
      uiOverlaySafeZoneTop: 90,
    },
  },
};

export function getAspectRatioConfig(aspectRatio: AspectRatioType = '16:9'): AspectRatioConfig {
  return ASPECT_RATIO_CONFIGS[aspectRatio] || ASPECT_RATIO_CONFIGS['16:9'];
}
