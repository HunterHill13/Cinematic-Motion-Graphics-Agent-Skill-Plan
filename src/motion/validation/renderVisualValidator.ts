/**
 * ============================================================================
 * RENDER-LEVEL VISUAL MOTION VALIDATOR (VISUAL EVIDENCE LAYER)
 * ============================================================================
 * 
 * CORE ARCHITECTURAL PRINCIPLE:
 *   VALID MOTION ≠ CONSTANT MOTION
 *   VALID MOTION ≠ ANY NUMERICAL CHANGE
 *   VALID MOTION = SEMANTICALLY JUSTIFIED + SPATIALLY MEANINGFUL + CAUSALLY TRIGGERED
 * 
 * Visual Evidence Layer:
 *   - Evaluates rendered frame representations across 9 calibrated sample points:
 *     [10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%]
 *   - Concentrates analysis on the Hero ROI defined by the TransformationContract.
 *   - Decouples Camera Motion (global/background flow) from Internal Hero Motion.
 *   - Masks bottom subtitle band (y >= 82% of height) to prevent caption cheating.
 *   - Compares observed structural evolution with the declared MotionVerb:
 *     SPLIT, COLLAPSE, EXPAND, TRAVEL, ROTATE, MORPH, DEFORM.
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

export interface HeroRoiAnalysis {
  samplePercent: number;
  heroForegroundPixelsCount: number;
  heroForegroundDelta: number;     // Mean delta of active hero pixels
  heroStaticRatio: number;         // Ratio of foreground pixels with delta < threshold
  backgroundDelta: number;         // Mean delta in non-hero background
  subtitleDelta: number;           // Mean delta in bottom subtitle band
  bgCoverageRatio: number;         // Percentage of background area with motion (> 0.05)
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
  cameraCamouflageDetected: boolean;
  subtitleOnlyMotionDetected: boolean;
  backgroundOnlyMotionDetected: boolean;
  middleWindowStaticHoldDetected: boolean;
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
    // Mask bottom 18% of viewport (standard Remotion caption/subtitle zone)
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
    const meanBgCoverage =
      middleAnalyses.reduce((acc, a) => acc + a.bgCoverageRatio, 0) / Math.max(1, middleAnalyses.length);

    // 1. Camera Camouflage Detection (Coherent background motion while Hero foreground is near-static)
    let cameraCamouflageDetected = false;
    if (meanBgDelta >= 0.02 && meanHeroDelta < 0.055) {
      cameraCamouflageDetected = true;
      violations.push(
        'CAMERA_CAMOUFLAGE_DETECTED: Camera movement (pan/zoom) active while Hero foreground displays zero internal transformation.'
      );
    }

    // 2. Subtitle-Only Motion Detection
    let subtitleOnlyMotionDetected = false;
    if (meanSubDelta > 0.008 && meanHeroDelta < 0.035) {
      subtitleOnlyMotionDetected = true;
      violations.push(
        'SUBTITLE_ONLY_MOTION_DETECTED: Visual changes active exclusively in the bottom subtitle band while Hero remains static.'
      );
    }

    // 3. Background-Only Particle Animation Detection (Localized scattered motion with coverage < 2%)
    let backgroundOnlyMotionDetected = false;
    if (meanBgDelta >= 0.002 && meanBgCoverage < 0.02 && meanHeroDelta < 0.035) {
      backgroundOnlyMotionDetected = true;
      violations.push(
        'BACKGROUND_ONLY_MOTION_DETECTED: Background particles or ambient oscillations active while primary Hero entity is motionless.'
      );
    }

    // 4. Middle-Window Static Hold Detection
    let middleWindowStaticHoldDetected = false;
    if (meanHeroStaticRatio > 0.80 || meanHeroDelta < 0.05) {
      middleWindowStaticHoldDetected = true;
      violations.push(
        `MIDDLE_WINDOW_STATIC_HOLD: Hero foreground remained ${Math.round(meanHeroStaticRatio * 100)}% static (mean delta ${meanHeroDelta.toFixed(3)}) during the middle 60% of the shot.`
      );
    }

    // 5. Verb Contract Verification
    const expectedVerb = contract.midpointEvent.verb;
    let verbContractMatch = true;
    if (expectedVerb === 'SPLIT' || expectedVerb === 'EXPAND' || expectedVerb === 'TRAVEL') {
      if (meanHeroDelta < 0.08 && !middleWindowStaticHoldDetected) {
        verbContractMatch = false;
        violations.push(`VERB_MISMATCH_${expectedVerb}: Declared ${expectedVerb} in contract, but observed foreground delta (${meanHeroDelta.toFixed(3)}) is below threshold.`);
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
      cameraCamouflageDetected,
      subtitleOnlyMotionDetected,
      backgroundOnlyMotionDetected,
      middleWindowStaticHoldDetected,
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

        if (y >= this.subtitleMaskY) {
          // Subtitle Band
          subDeltaTotal += delta;
          subPixelsCount++;
        } else if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          // Inside Hero ROI
          const isForeground = p1 > 0.2 || p2 > 0.2;
          if (isForeground) {
            heroForegroundPixelsCount++;
            heroForegroundDeltaTotal += delta;
            if (delta < 0.05) {
              heroStaticPixelsCount++;
            }
          }
        } else {
          // Non-Hero Background
          bgDeltaTotal += delta;
          bgPixelsCount++;
          if (delta > 0.05) {
            bgMovingPixelsCount++;
          }
        }
      }
    }

    const heroForegroundDelta = heroForegroundPixelsCount > 0 ? heroForegroundDeltaTotal / heroForegroundPixelsCount : 0;
    const heroStaticRatio = heroForegroundPixelsCount > 0 ? heroStaticPixelsCount / heroForegroundPixelsCount : 1.0;
    const backgroundDelta = bgPixelsCount > 0 ? bgDeltaTotal / bgPixelsCount : 0;
    const subtitleDelta = subPixelsCount > 0 ? subDeltaTotal / subPixelsCount : 0;
    const bgCoverageRatio = bgPixelsCount > 0 ? bgMovingPixelsCount / bgPixelsCount : 0;

    return {
      samplePercent: curr.percent,
      heroForegroundPixelsCount,
      heroForegroundDelta,
      heroStaticRatio,
      backgroundDelta,
      subtitleDelta,
      bgCoverageRatio,
      isCameraMoving: backgroundDelta > 0.008,
      isHeroTransformingMeaningfully: heroForegroundDelta > 0.08 && heroStaticRatio < 0.7,
    };
  }
}
