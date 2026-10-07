/**
 * SYNTHETIC RENDER-LEVEL TEST FIXTURES (TESTS A THROUGH F)
 * 
 * Generates 9 calibrated frame samples [10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%]
 * with mathematically accurate pixel representations of the visual failure/success modes.
 */

import { FrameSample } from '../../src/motion/validation/renderVisualValidator';
import { TransformationContract } from '../../src/motion/grammar/motionGrammar';

const W = 480;
const H = 270;
const SAMPLE_PERCENTS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

export const baseContract: TransformationContract = {
  shotId: 'shot_render_test',
  startFrame: 0,
  endFrame: 300,
  durationFrames: 300,
  heroEntity: {
    id: 'hero_core',
    label: 'هسته آزمایش رندر',
    persistsFrom: 'GENESIS',
    persistsTo: 'TERMINUS',
  },
  initialState: {
    position: { x: 960, y: 540, z: 0 },
    scale: 1.0,
    rotation: { z: 0 },
  },
  trigger: {
    frame: 30,
    narrationMarker: 'با شروع فرآیند',
    forceType: 'thermal_pulse',
  },
  midpointEvent: {
    verb: 'SPLIT',
    startFrame: 90,
    endFrame: 210,
    subBeats: [{ frame: 150, action: 'Bifurcation' }],
    meaningfulDelta: {
      property: 'position',
      expectedMinimumDelta: 120,
    },
  },
  finalState: {
    position: { x: 960, y: 540, z: 0 },
    scale: 1.2,
    rotation: { z: 45 },
  },
  exitMomentum: {
    vector: { x: 5, y: 0, z: 0 },
    consequence: 'Carries energy to next shot',
  },
};

function drawRect(buffer: Float32Array, x: number, y: number, w: number, h: number, val: number) {
  const minX = Math.max(0, Math.floor(x));
  const maxX = Math.min(W - 1, Math.floor(x + w));
  const minY = Math.max(0, Math.floor(y));
  const maxY = Math.min(H - 1, Math.floor(y + h));

  for (let r = minY; r <= maxY; r++) {
    for (let c = minX; c <= maxX; c++) {
      buffer[r * W + c] = val;
    }
  }
}

/**
 * TEST A: Camera Zoom + Hero Static
 */
export function generateTestA_CameraZoomHeroStatic(): FrameSample[] {
  return SAMPLE_PERCENTS.map((pct) => {
    const pixels = new Float32Array(W * H);
    // Background grid lines scaling dynamically (camera zoom)
    const zoom = 1.0 + pct * 0.15;
    for (let gx = 20; gx < W - 20; gx += 40) {
      const x = gx * zoom;
      if (Math.abs(x - W / 2) > 35) {
        drawRect(pixels, x, 10, 3, 200, 0.45);
      }
    }
    for (let gy = 20; gy < 200; gy += 40) {
      const y = gy * zoom;
      if (Math.abs(y - H / 2) > 35) {
        drawRect(pixels, 10, y, W - 20, 3, 0.45);
      }
    }
    // Hero remains 100% static in foreground
    drawRect(pixels, W / 2 - 25, H / 2 - 25, 50, 50, 0.9);
    return { frame: Math.round(pct * 300), percent: pct, pixels, width: W, height: H };
  });
}

/**
 * TEST B: Camera Pan + Hero Static
 */
export function generateTestB_CameraPanHeroStatic(): FrameSample[] {
  return SAMPLE_PERCENTS.map((pct) => {
    const pixels = new Float32Array(W * H);
    // Background grid panning horizontally
    const panOffset = pct * 60;
    for (let gx = 0; gx < W + 60; gx += 40) {
      const x = (gx + panOffset) % W;
      if (Math.abs(x - W / 2) > 35) {
        drawRect(pixels, x, 10, 4, 200, 0.45);
      }
    }
    // Hero remains 100% static in center
    drawRect(pixels, W / 2 - 25, H / 2 - 25, 50, 50, 0.9);
    return { frame: Math.round(pct * 300), percent: pct, pixels, width: W, height: H };
  });
}

/**
 * TEST C: Subtitle Animation + Hero Static
 */
export function generateTestC_SubtitleAnimationHeroStatic(): FrameSample[] {
  return SAMPLE_PERCENTS.map((pct) => {
    const pixels = new Float32Array(W * H);
    // Static background
    drawRect(pixels, 20, 20, 440, 180, 0.15);
    // Hero 100% static
    drawRect(pixels, W / 2 - 25, H / 2 - 25, 50, 50, 0.9);
    // Subtitle band actively changing words
    const subWidth = 80 + (pct * 240);
    drawRect(pixels, 60, 230, subWidth, 25, 0.85);
    return { frame: Math.round(pct * 300), percent: pct, pixels, width: W, height: H };
  });
}

/**
 * TEST D: Background Particle Animation + Hero Static
 */
export function generateTestD_BackgroundParticlesHeroStatic(): FrameSample[] {
  return SAMPLE_PERCENTS.map((pct) => {
    const pixels = new Float32Array(W * H);
    // Static canvas base
    drawRect(pixels, 20, 20, 440, 180, 0.1);
    // Hero 100% static
    drawRect(pixels, W / 2 - 25, H / 2 - 25, 50, 50, 0.9);
    // Background particles (micro-dots 4x4) flying around strictly in the background
    for (let p = 0; p < 25; p++) {
      const px = (p * 18 + pct * 90) % (W - 30);
      const py = (p * 12 + pct * 60) % 180;
      // Ensure particles don't overlap Hero ROI
      if (Math.abs(px - W / 2) > 95 || Math.abs(py - H / 2) > 95) {
        drawRect(pixels, px, py, 4, 4, 0.55);
      }
    }
    return { frame: Math.round(pct * 300), percent: pct, pixels, width: W, height: H };
  });
}

/**
 * TEST E: Hero Genuine Middle Transformation (PASS)
 */
export function generateTestE_HeroGenuineTransformation(): FrameSample[] {
  return SAMPLE_PERCENTS.map((pct) => {
    const pixels = new Float32Array(W * H);
    drawRect(pixels, 20, 20, 440, 180, 0.1);

    if (pct < 0.3) {
      // Phase 1: Unified Core
      drawRect(pixels, W / 2 - 25, H / 2 - 25, 50, 50, 0.9);
    } else if (pct <= 0.7) {
      // Phase 2: Active Middle SPLIT (Divergence into two separating cores)
      const spread = (pct - 0.25) * 80;
      drawRect(pixels, W / 2 - 25 - spread, H / 2 - 20, 30, 40, 0.95);
      drawRect(pixels, W / 2 + 5 + spread, H / 2 - 20, 30, 40, 0.95);
    } else {
      // Phase 3: Settled Transformed State
      drawRect(pixels, W / 2 - 65, H / 2 - 20, 30, 40, 0.9);
      drawRect(pixels, W / 2 + 45, H / 2 - 20, 30, 40, 0.9);
    }
    return { frame: Math.round(pct * 300), percent: pct, pixels, width: W, height: H };
  });
}

/**
 * TEST F: Hero Entrance/Exit Only, Middle Static (FAIL)
 */
export function generateTestF_HeroEntranceExitHold(): FrameSample[] {
  return SAMPLE_PERCENTS.map((pct) => {
    const pixels = new Float32Array(W * H);
    drawRect(pixels, 20, 20, 440, 180, 0.1);

    let heroY = H / 2;
    if (pct <= 0.2) {
      // Entrance
      heroY = (H / 2) + (0.2 - pct) * 120;
    } else if (pct >= 0.8) {
      // Exit
      heroY = (H / 2) - (pct - 0.8) * 120;
    } else {
      // DEAD STATIC HOLD in middle 60%
      heroY = H / 2;
    }
    drawRect(pixels, W / 2 - 25, heroY - 25, 50, 50, 0.9);
    return { frame: Math.round(pct * 300), percent: pct, pixels, width: W, height: H };
  });
}
