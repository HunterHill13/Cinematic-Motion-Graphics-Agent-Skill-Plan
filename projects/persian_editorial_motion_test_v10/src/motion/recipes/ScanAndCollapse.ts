import { interpolate, Easing } from 'remotion';

export interface ScanAndCollapseResult {
  beaconX: number;
  wallImpact: boolean;
  barrierFlash: number;
  axisRotation: number;
  collapseProgress: number;
  wallDisplacement: number;
}

/**
 * RECIPE 05: SCAN AND COLLAPSE
 * Used for temporal barriers, deadline cutoffs, and dimensional coordinate collapse.
 * - Scanning beacon scans across the legal timeline.
 * - Impacts the terminal barrier wall (1-year cutoff) precisely on the acoustic trigger.
 * - Collapses axis from vertical barrier into horizontal floor plane.
 */
export function calculateScanAndCollapse(
  frame: number,
  scanStart: number,
  impactFrame: number,
  collapseStart: number,
  config?: {
    startX?: number;
    wallX?: number;
    collapseDuration?: number;
  }
): ScanAndCollapseResult {
  const {
    startX = 1500,
    wallX = 960,
    collapseDuration = 24,
  } = config || {};

  // 1. Scan Phase
  let beaconX = startX;
  let wallImpact = frame >= impactFrame;
  let barrierFlash = 0;
  let wallDisplacement = 0;

  if (frame < impactFrame) {
    const sRaw = Math.min(1, Math.max(0, (frame - scanStart) / (impactFrame - scanStart)));
    const sEased = Easing.bezier(0.2, 0.8, 0.2, 1)(sRaw);
    beaconX = interpolate(sEased, [0, 1], [startX, wallX]);
  } else {
    beaconX = wallX;
    // Barrier impact flash and vibration
    const elapsed = frame - impactFrame;
    if (elapsed < 16) {
      barrierFlash = Math.exp(-0.25 * elapsed);
      wallDisplacement = 6 * Math.exp(-0.3 * elapsed) * Math.sin(0.8 * elapsed);
    }
  }

  // 2. Collapse Phase
  let axisRotation = 0;
  let collapseProgress = 0;

  if (frame >= collapseStart) {
    const cRaw = Math.min(1, (frame - collapseStart) / collapseDuration);
    collapseProgress = Easing.bezier(0.16, 1, 0.3, 1)(cRaw);
    // 0 deg vertical to 90 deg horizontal plane
    axisRotation = interpolate(collapseProgress, [0, 1], [0, 90]);
  }

  return {
    beaconX,
    wallImpact,
    barrierFlash,
    axisRotation,
    collapseProgress,
    wallDisplacement,
  };
}
