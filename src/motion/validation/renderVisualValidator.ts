/**
 * ============================================================================
 * RENDER-LEVEL VISUAL MOTION VALIDATOR (PHASE 3.1 HARDENING)
 * ============================================================================
 * 
 * CORE ARCHITECTURAL PRINCIPLE:
 *   VALID MOTION ≠ CONSTANT MOTION
 *   VALID MOTION ≠ ANY NUMERICAL CHANGE
 *   VALID MOTION = SEMANTICALLY JUSTIFIED + SPATIALLY MEANINGFUL + CAUSALLY TRIGGERED
 * 
 * Multi-Signal Visual Evidence Layer:
 *   - Evaluates rendered frame representations across 9 calibrated sample points:
 *     [10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%]
 *   - Calculates Lightweight Optical Flow (Lucas-Kanade/Gradient):
 *     * meanFlowMagnitude (Hero ROI vs Background ROI)
 *     * flowSpatialVariance (Hero ROI vs Background ROI)
 *   - Multi-Signal Camera vs Hero Motion Decoupling:
 *     * Camera moving + Hero static -> CAMERA_CAMOUFLAGE_DETECTED (FAIL)
 *     * Camera moving + Hero moving/transforming -> VALID MOTION (PASS - Test G)
 *   - Global Lighting Trap Detection:
 *     * Uniform brightness shift without structural displacement -> GLOBAL_LIGHTING_TRAP_DETECTED (FAIL - Test H)
 *   - Motion Verb Heuristics:
 *     * SPLIT, EXPAND, TRAVEL, COLLAPSE
 *   - Masks bottom subtitle band (y >= 82% of height).
 * ============================================================================
 */

import { TransformationContract, MotionVerb } from '../grammar/motionGrammar';

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface FrameSample {
  frame: number;
  percent: number;
  pixels: Float32Array; // Luminance values 0.0 to 1.0
  width: number;
  height: number;
}

export interface OpticalFlowStats {
  meanMagnitude: number;
  spatialVariance: number;
  flowDirection: { u: number; v: number };
}

export interface HeroRoiAnalysis {
  samplePercent: number;
  heroForegroundPixelsCount: number;
  heroForegroundDelta: number;
  heroStaticRatio: number;
  backgroundDelta: number;
  subtitleDelta: number;
  bgCoverageRatio: number;

  // Phase 3.1 Optical Flow Metrics
  heroFlow: OpticalFlowStats;
  bgFlow: OpticalFlowStats;
  heroCentroidDisplacement: number;
  heroSpatialAreaRatio: number; // currArea / prevArea
  isGlobalLightingShift: boolean;

  isCameraMoving: boolean;
  isHeroTransformingMeaningfully: boolean;
}

export interface VisualEvidenceReport {
  passed: boolean;
  shotId: string;
  expectedVerb?: MotionVerb;
  samplePointsCount: number;
  middleSamplesCount: number;
  meanMiddleHeroDelta: number;
  meanMiddleHeroStaticRatio: number;
  meanMiddleBgDelta: number;
  meanMiddleSubDelta: number;

  // Phase 3.1 Aggregates
  meanHeroFlowMagnitude: number;
  heroFlowSpatialVariance: number;
  meanBgFlowMagnitude: number;
  bgFlowSpatialVariance: number;
  meanCentroidDisplacement: number;

  cameraCamouflageDetected: boolean;
  subtitleOnlyMotionDetected: boolean;
  backgroundOnlyMotionDetected: boolean;
  middleWindowStaticHoldDetected: boolean;
  globalLightingTrapDetected: boolean;
  verbContractMatch: boolean;
  violations: string[];
  executionTimeMs: number;
}

export class RenderVisualValidator {
  private width: number;
  private height: number;
  private subtitleMaskY: number;

  constructor(width: number = 480, height: number = 270) {
    this.width = width;
    this.height = height;
    this.subtitleMaskY = Math.floor(height * 0.82);
  }

  public evaluateSamples(
    contract: TransformationContract,
    samples: FrameSample[]
  ): VisualEvidenceReport {
    const startTime = Date.now();
    const violations: string[] = [];

    if (samples.length < 9) {
      violations.push(`INSUFFICIENT_SAMPLES: Expected >= 9 samples, received ${samples.length}`);
    }

    const scaleX = this.width / 1920;
    const scaleY = this.height / 1080;

    const initialX = contract.initialState.position.x * scaleX;
    const initialY = contract.initialState.position.y * scaleY;
    const finalX = contract.finalState.position.x * scaleX;
    const finalY = contract.finalState.position.y * scaleY;

    const baseRadius = 35 * Math.max(contract.initialState.scale, contract.finalState.scale);
    const heroRoi: BoundingBox = {
      minX: Math.max(0, Math.min(initialX, finalX) - baseRadius),
      minY: Math.max(0, Math.min(initialY, finalY) - baseRadius),
      maxX: Math.min(this.width - 1, Math.max(initialX, finalX) + baseRadius),
      maxY: Math.min(this.subtitleMaskY - 1, Math.max(initialY, finalY) + baseRadius),
    };

    const analyses: HeroRoiAnalysis[] = [];
    for (let i = 1; i < samples.length; i++) {
      const prev = samples[i - 1];
      const curr = samples[i];
      analyses.push(this.analyzeFramePair(prev, curr, heroRoi));
    }

    // Samples corresponding to middle 60% (30% to 70%)
    const middleAnalyses = analyses.filter((a) => a.samplePercent >= 0.25 && a.samplePercent <= 0.75);

    const meanHeroDelta =
      middleAnalyses.reduce((acc, a) => acc + a.heroForegroundDelta, 0) / Math.max(1, middleAnalyses.length);
    const meanHeroStaticRatio =
      middleAnalyses.reduce((acc, a) => acc + a.heroStaticRatio, 0) / Math.max(1, middleAnalyses.length);
    const meanBgDelta =
      middleAnalyses.reduce((acc, a) => acc + a.backgroundDelta, 0) / Math.max(1, middleAnalyses.length);
    const meanSubDelta =
      middleAnalyses.reduce((acc, a) => acc + a.subtitleDelta, 0) / Math.max(1, middleAnalyses.length);

    const meanHeroFlowMag =
      middleAnalyses.reduce((acc, a) => acc + a.heroFlow.meanMagnitude, 0) / Math.max(1, middleAnalyses.length);
    const heroFlowVariance =
      middleAnalyses.reduce((acc, a) => acc + a.heroFlow.spatialVariance, 0) / Math.max(1, middleAnalyses.length);
    const meanBgFlowMag =
      middleAnalyses.reduce((acc, a) => acc + a.bgFlow.meanMagnitude, 0) / Math.max(1, middleAnalyses.length);
    const bgFlowVariance =
      middleAnalyses.reduce((acc, a) => acc + a.bgFlow.spatialVariance, 0) / Math.max(1, middleAnalyses.length);
    const meanCentroidDisp =
      middleAnalyses.reduce((acc, a) => acc + a.heroCentroidDisplacement, 0) / Math.max(1, middleAnalyses.length);

    // 1. Global Lighting Trap Detection (Test H)
    // Global luminance changes everywhere, but centroid displacement and flow magnitude are near zero
    let globalLightingTrapDetected = false;
    const isLightingShift = middleAnalyses.some((a) => a.isGlobalLightingShift);
    if (isLightingShift && meanCentroidDisp < 1.0 && heroFlowVariance < 0.02) {
      globalLightingTrapDetected = true;
      violations.push(
        'GLOBAL_LIGHTING_TRAP_DETECTED: Uniform screen brightness/lighting delta detected without geometric or centroid displacement.'
      );
    }

    // 2. Camera Camouflage Detection (Multi-Signal Separation)
    // Background is actively moving/flowing, but Hero internal flow and centroid displacement are near-zero
    let cameraCamouflageDetected = false;
    const isBgActive = meanBgDelta >= 0.02 || meanBgFlowMag > 0.4;
    const isHeroStatic = (meanHeroDelta < 0.055 || meanHeroFlowMag < 0.42) && meanCentroidDisp < 1.5;
    if (isBgActive && isHeroStatic) {
      cameraCamouflageDetected = true;
      violations.push(
        'CAMERA_CAMOUFLAGE_DETECTED: Camera movement (pan/zoom) active while Hero foreground displays zero internal transformation.'
      );
    }

    // 3. Subtitle-Only Motion Detection
    let subtitleOnlyMotionDetected = false;
    if (meanSubDelta > 0.008 && meanHeroDelta < 0.035 && meanHeroFlowMag < 0.2) {
      subtitleOnlyMotionDetected = true;
      violations.push(
        'SUBTITLE_ONLY_MOTION_DETECTED: Visual changes active exclusively in the bottom subtitle band while Hero remains static.'
      );
    }

    // 4. Background-Only Particle Animation Detection
    let backgroundOnlyMotionDetected = false;
    const meanBgCoverage =
      middleAnalyses.reduce((acc, a) => acc + a.bgCoverageRatio, 0) / Math.max(1, middleAnalyses.length);
    if (meanBgDelta >= 0.002 && meanBgCoverage < 0.02 && meanHeroDelta < 0.035 && meanHeroFlowMag < 0.2) {
      backgroundOnlyMotionDetected = true;
      violations.push(
        'BACKGROUND_ONLY_MOTION_DETECTED: Background particles or ambient oscillations active while primary Hero entity is motionless.'
      );
    }

    // 5. Middle-Window Static Hold Detection
    let middleWindowStaticHoldDetected = false;
    if ((meanHeroStaticRatio > 0.80 || meanHeroDelta < 0.05) && !globalLightingTrapDetected) {
      middleWindowStaticHoldDetected = true;
      violations.push(
        `MIDDLE_WINDOW_STATIC_HOLD: Hero foreground remained ${Math.round(meanHeroStaticRatio * 100)}% static (mean delta ${meanHeroDelta.toFixed(3)}) during the middle 60% of the shot.`
      );
    }

    // 6. Motion Verb Evidence Heuristics (SPLIT, EXPAND, TRAVEL, COLLAPSE)
    const expectedVerb = contract.midpointEvent.verb;
    let verbContractMatch = true;

    if (expectedVerb === 'SPLIT') {
      // Diverging centroids or high internal flow variance
      if (heroFlowVariance < 0.04 && meanCentroidDisp < 2.0 && !middleWindowStaticHoldDetected) {
        verbContractMatch = false;
        violations.push('VERB_MISMATCH_SPLIT: Declared SPLIT, but insufficient flow variance or component separation observed.');
      }
    } else if (expectedVerb === 'EXPAND') {
      const maxAreaRatio = Math.max(...middleAnalyses.map((a) => a.heroSpatialAreaRatio));
      if (maxAreaRatio < 1.05 && meanHeroDelta < 0.08 && !middleWindowStaticHoldDetected) {
        verbContractMatch = false;
        violations.push('VERB_MISMATCH_EXPAND: Declared EXPAND, but spatial extent did not increase.');
      }
    } else if (expectedVerb === 'TRAVEL') {
      if (meanCentroidDisp < 4.0 && !middleWindowStaticHoldDetected) {
        verbContractMatch = false;
        violations.push('VERB_MISMATCH_TRAVEL: Declared TRAVEL, but net centroid displacement is below threshold.');
      }
    } else if (expectedVerb === 'COLLAPSE') {
      const minAreaRatio = Math.min(...middleAnalyses.map((a) => a.heroSpatialAreaRatio));
      if (minAreaRatio > 0.95 && !middleWindowStaticHoldDetected) {
        verbContractMatch = false;
        violations.push('VERB_MISMATCH_COLLAPSE: Declared COLLAPSE, but spatial extent did not contract.');
      }
    }

    const passed = violations.length === 0;
    const executionTimeMs = Date.now() - startTime;

    return {
      passed,
      shotId: contract.shotId,
      expectedVerb,
      samplePointsCount: samples.length,
      middleSamplesCount: middleAnalyses.length,
      meanMiddleHeroDelta: Number(meanHeroDelta.toFixed(4)),
      meanMiddleHeroStaticRatio: Number(meanHeroStaticRatio.toFixed(4)),
      meanMiddleBgDelta: Number(meanBgDelta.toFixed(4)),
      meanMiddleSubDelta: Number(meanSubDelta.toFixed(4)),
      meanHeroFlowMagnitude: Number(meanHeroFlowMag.toFixed(4)),
      heroFlowSpatialVariance: Number(heroFlowVariance.toFixed(4)),
      meanBgFlowMagnitude: Number(meanBgFlowMag.toFixed(4)),
      bgFlowSpatialVariance: Number(bgFlowVariance.toFixed(4)),
      meanCentroidDisplacement: Number(meanCentroidDisp.toFixed(4)),
      cameraCamouflageDetected,
      subtitleOnlyMotionDetected,
      backgroundOnlyMotionDetected,
      middleWindowStaticHoldDetected,
      globalLightingTrapDetected,
      verbContractMatch,
      violations,
      executionTimeMs,
    };
  }

  private analyzeFramePair(
    prev: FrameSample,
    curr: FrameSample,
    roi: BoundingBox
  ): HeroRoiAnalysis {
    const W = this.width;
    const H = this.height;

    let heroForegroundDeltaTotal = 0;
    let heroForegroundPixelsCount = 0;
    let heroStaticPixelsCount = 0;

    let bgDeltaTotal = 0;
    let bgPixelsCount = 0;
    let bgMovingPixelsCount = 0;

    let subDeltaTotal = 0;
    let subPixelsCount = 0;

    // Centroid accumulators
    let prevCxNum = 0, prevCyNum = 0, prevMass = 0;
    let currCxNum = 0, currCyNum = 0, currMass = 0;

    // Lighting check: compare mean delta across entire frame vs variance of delta
    let globalDeltaSum = 0;
    let globalDeltaSqSum = 0;
    const totalSampledPixels = W * H;

    const minX = Math.floor(roi.minX);
    const maxX = Math.ceil(roi.maxX);
    const minY = Math.floor(roi.minY);
    const maxY = Math.ceil(roi.maxY);

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = y * W + x;
        const p1 = prev.pixels[idx];
        const p2 = curr.pixels[idx];
        const delta = Math.abs(p2 - p1);

        globalDeltaSum += delta;
        globalDeltaSqSum += delta * delta;

        if (y >= this.subtitleMaskY) {
          subDeltaTotal += delta;
          subPixelsCount++;
        } else if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          const isForeground = p1 > 0.2 || p2 > 0.2;
          if (isForeground) {
            heroForegroundPixelsCount++;
            heroForegroundDeltaTotal += delta;
            if (delta < 0.05) heroStaticPixelsCount++;

            prevCxNum += x * p1;
            prevCyNum += y * p1;
            prevMass += p1;

            currCxNum += x * p2;
            currCyNum += y * p2;
            currMass += p2;
          }
        } else {
          bgDeltaTotal += delta;
          bgPixelsCount++;
          if (delta > 0.05) bgMovingPixelsCount++;
        }
      }
    }

    // Global lighting check: high mean delta with near-zero spatial variance
    const meanGlobalDelta = globalDeltaSum / totalSampledPixels;
    const varianceGlobalDelta = (globalDeltaSqSum / totalSampledPixels) - (meanGlobalDelta * meanGlobalDelta);
    const isGlobalLightingShift = meanGlobalDelta > 0.04 && varianceGlobalDelta < 0.002;

    const heroForegroundDelta = heroForegroundPixelsCount > 0 ? heroForegroundDeltaTotal / heroForegroundPixelsCount : 0;
    const heroStaticRatio = heroForegroundPixelsCount > 0 ? heroStaticPixelsCount / heroForegroundPixelsCount : 1.0;
    const backgroundDelta = bgPixelsCount > 0 ? bgDeltaTotal / bgPixelsCount : 0;
    const subtitleDelta = subPixelsCount > 0 ? subDeltaTotal / subPixelsCount : 0;
    const bgCoverageRatio = bgPixelsCount > 0 ? bgMovingPixelsCount / bgPixelsCount : 0;

    // Centroid displacement
    const prevCx = prevMass > 0 ? prevCxNum / prevMass : (minX + maxX) / 2;
    const prevCy = prevMass > 0 ? prevCyNum / prevMass : (minY + maxY) / 2;
    const currCx = currMass > 0 ? currCxNum / currMass : (minX + maxX) / 2;
    const currCy = currMass > 0 ? currCyNum / currMass : (minY + maxY) / 2;
    const heroCentroidDisplacement = Math.hypot(currCx - prevCx, currCy - prevCy);
    const heroSpatialAreaRatio = prevMass > 0 ? currMass / prevMass : 1.0;

    // Optical Flow in Hero ROI and Background ROI
    const heroFlow = this.calculateOpticalFlowInRegion(prev, curr, minX, minY, maxX, maxY);
    const bgFlow = this.calculateOpticalFlowInRegion(prev, curr, 10, 10, W - 10, this.subtitleMaskY - 10, roi);

    return {
      samplePercent: curr.percent,
      heroForegroundPixelsCount,
      heroForegroundDelta,
      heroStaticRatio,
      backgroundDelta,
      subtitleDelta,
      bgCoverageRatio,
      heroFlow,
      bgFlow,
      heroCentroidDisplacement,
      heroSpatialAreaRatio,
      isGlobalLightingShift,
      isCameraMoving: backgroundDelta > 0.008 || bgFlow.meanMagnitude > 0.3,
      isHeroTransformingMeaningfully: heroForegroundDelta > 0.08 && heroStaticRatio < 0.7,
    };
  }

  /**
   * Lightweight Gradient-based Optical Flow
   */
  private calculateOpticalFlowInRegion(
    prev: FrameSample,
    curr: FrameSample,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    excludeRoi?: BoundingBox
  ): OpticalFlowStats {
    const W = this.width;
    let sumMag = 0;
    let sumU = 0;
    let sumV = 0;
    let count = 0;
    const mags: number[] = [];

    const step = 4;
    for (let y = minY + 1; y < maxY - 1; y += step) {
      for (let x = minX + 1; x < maxX - 1; x += step) {
        if (excludeRoi && x >= excludeRoi.minX && x <= excludeRoi.maxX && y >= excludeRoi.minY && y <= excludeRoi.maxY) {
          continue;
        }

        const idx = y * W + x;
        const p1 = prev.pixels[idx];
        const p2 = curr.pixels[idx];

        // Spatial gradients
        const dx = (prev.pixels[idx + 1] - prev.pixels[idx - 1]) * 0.5;
        const dy = (prev.pixels[(y + 1) * W + x] - prev.pixels[(y - 1) * W + x]) * 0.5;
        const dt = p2 - p1;

        const gradMagSq = dx * dx + dy * dy;
        if (gradMagSq > 0.002) {
          const u = -(dt * dx) / (gradMagSq + 0.01);
          const v = -(dt * dy) / (gradMagSq + 0.01);
          const mag = Math.min(10, Math.hypot(u, v));

          sumMag += mag;
          sumU += u;
          sumV += v;
          mags.push(mag);
          count++;
        }
      }
    }

    const meanMagnitude = count > 0 ? sumMag / count : 0;
    const meanU = count > 0 ? sumU / count : 0;
    const meanV = count > 0 ? sumV / count : 0;

    let variance = 0;
    if (mags.length > 5) {
      variance = mags.reduce((acc, m) => acc + Math.pow(m - meanMagnitude, 2), 0) / mags.length;
    }

    return {
      meanMagnitude,
      spatialVariance: variance,
      flowDirection: { u: meanU, v: meanV },
    };
  }
}
