import React from 'react';
import { Composition } from 'remotion';
import { BandKafPreviewComposition } from './production/BandKafPreviewComposition';
import { Main } from './Main';
import { V28_BounceLab } from './motion/precision_lab/V28_BounceLab';
import { V29_TransformationLab } from './motion/precision_lab/V29_TransformationLab';
import { GoldenQuantumCoreComposition } from './projects/golden_test/GoldenQuantumCoreComposition';
import { Apoptosis916Main } from './projects/apoptosis_cancer_9_16/src/Apoptosis916Main';

/**
 * ============================================================================
 * CONSOLIDATED ROOT COMPOSITION REGISTRY (v40.1 Production Architecture)
 * ============================================================================
 * Minimal, clean production surface:
 * 1. ProductionMaster / V40_KineticMonolithPreview:
 *    Flagship Sovereign Calibration Pavilion & Kinetic Monolith video.
 * 2. DiagnosticFilm:
 *    6-Shot modular cinematic layer stack template.
 * 3. Diagnostic Labs:
 *    Physical bounce dynamics and continuous 2D->3D transformation proofs.
 * ============================================================================
 */
export const Root: React.FC = () => {
  return (
    <>
      {/* 1. Production Master: Band Kaf Kinetic Monolith (1920x1080 @ 30 FPS - 570 Frames / 19.0s) */}
      <Composition
        id="ProductionMaster"
        component={BandKafPreviewComposition}
        durationInFrames={570}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Backward-compatible alias for CLI renders */}
      <Composition
        id="V40KineticMonolithPreview"
        component={BandKafPreviewComposition}
        durationInFrames={570}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Diagnostic Film: 6-Shot Modular Multi-Layer Cinematic Stack (1800 Frames / 60.0s) */}
      <Composition
        id="DiagnosticFilm"
        component={Main}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 3. Diagnostic Lab: Physical Gravitational Bounce & Contact Squash (120 Frames / 4.0s) */}
      <Composition
        id="DiagnosticBounceLab"
        component={V28_BounceLab}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 4. Diagnostic Lab: Continuous 2D -> 3D Topological Transformation (120 Frames / 4.0s) */}
      <Composition
        id="DiagnosticTransformationLab"
        component={V29_TransformationLab}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 5. Golden Test: Quantum Resonator Core (450 Frames @ 30 FPS / 15.0s) */}
      <Composition
        id="GoldenQuantumCore"
        component={GoldenQuantumCoreComposition}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 6. Apoptosis Master Film (9:16 Vertical - 1080x1920 @ 30 FPS) */}
      <Composition
        id="Apoptosis916Main"
        component={Apoptosis916Main}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
