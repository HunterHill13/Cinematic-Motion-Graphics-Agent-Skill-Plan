import React from 'react';
import { Composition } from 'remotion';
import { BandKafPreviewComposition } from './production/BandKafPreviewComposition';
import { Main } from './Main';
import { V28_BounceLab } from './motion/precision_lab/V28_BounceLab';
import { V29_TransformationLab } from './motion/precision_lab/V29_TransformationLab';
import { GoldenQuantumCoreComposition } from './projects/golden_test/GoldenQuantumCoreComposition';
import { Apoptosis916Main } from './projects/apoptosis_cancer_9_16/src/Apoptosis916Main';
import { CanonicalMotionScene } from './motion/grammar/CanonicalMotionScene';
import { CanonicalCompilerScene } from './motion/compiler/CanonicalCompilerScene';
import {
  VerbTest_SPLIT,
  VerbTest_EXPAND,
  VerbTest_TRAVEL,
  VerbTest_COLLAPSE,
  VerbTest_MORPH,
  VerbTest_MERGE,
  VerbTest_DEFORM,
  VerbTest_REASSEMBLE,
  VerbTest_AntiBypass_FakeSplit,
  VerbTest_DecorativeCamouflage,
} from './motion/grammar/VerbTemplateTestCompositions';
import { Phase5CSpatialRuntimeProof } from './motion/visual_world/Phase5CSpatialRuntimeProof';
import { Phase5DMaterialRuntimeProof } from './motion/visual_world/Phase5DMaterialRuntimeProof';
import { Phase5D1LightingRuntimeProof } from './motion/visual_world/Phase5D1LightingRuntimeProof';
import { Phase5ECameraCompositionProof } from './motion/visual_world/Phase5ECameraCompositionProof';
import { Phase5FSecondaryMotionProof } from './motion/visual_world/Phase5FSecondaryMotionProof';
import { CinematicBenchmarkScene } from './motion/benchmark/CinematicBenchmarkScene';
import { Phase6VisualBenchmark } from './motion/director/Phase6VisualBenchmark';
import { ClaudeMotionBenchmark, CLAUDE_BENCHMARK_FRAMES, CLAUDE_BENCHMARK_WIDTH, CLAUDE_BENCHMARK_HEIGHT } from './motion/claude/ClaudeMotionBenchmark';
import {
  ClaudeOpusShowreelContent,
  CLAUDE_OPUS_SHOWREEL_DURATION,
  CLAUDE_OPUS_SHOWREEL_FPS,
  CLAUDE_OPUS_SHOWREEL_WIDTH,
  CLAUDE_OPUS_SHOWREEL_HEIGHT,
} from './motion/claude/ClaudeOpusShowreel';
import {
  ClaudeFluidShowreelContent,
  CLAUDE_FLUID_DURATION,
  CLAUDE_FLUID_FPS,
  CLAUDE_FLUID_WIDTH,
  CLAUDE_FLUID_HEIGHT,
} from './motion/claude/ClaudeFluidShowreel';

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

      {/* 7. Canonical Motion Scene (Phase 4A Reference: 600 Frames @ 30 FPS / 20.0s) */}
      <Composition
        id="CanonicalMotionScene"
        component={CanonicalMotionScene}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CanonicalCompilerScene"
        component={CanonicalCompilerScene}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 8. Verb Template Render Verifications (Phase 4A.1 Hardening: 100 Frames @ 30 FPS) */}
      <Composition id="VerbTest-SPLIT" component={VerbTest_SPLIT} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-EXPAND" component={VerbTest_EXPAND} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-TRAVEL" component={VerbTest_TRAVEL} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-COLLAPSE" component={VerbTest_COLLAPSE} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-MORPH" component={VerbTest_MORPH} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-MERGE" component={VerbTest_MERGE} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-DEFORM" component={VerbTest_DEFORM} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-REASSEMBLE" component={VerbTest_REASSEMBLE} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-AntiBypass-FakeSplit" component={VerbTest_AntiBypass_FakeSplit} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-DecorativeCamouflage" component={VerbTest_DecorativeCamouflage} durationInFrames={100} fps={30} width={1920} height={1080} />

      {/* 9. Phase 5C.1 Spatial Runtime Proof Compositions (180 Frames @ 30 FPS) */}
      <Composition
        id="Phase5C-RealSpatialProof"
        component={Phase5CSpatialRuntimeProof}
        defaultProps={{ mode: 'REAL_SPATIAL' as const }}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5C-DepthCollapsedProof"
        component={Phase5CSpatialRuntimeProof}
        defaultProps={{ mode: 'DEPTH_COLLAPSED' as const }}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 10. Phase 5D Material Runtime Proof Compositions (180 Frames @ 30 FPS) */}
      <Composition
        id="Phase5D-MaterialProof"
        component={Phase5DMaterialRuntimeProof}
        defaultProps={{ mode: 'MATERIAL_AWARE' as const }}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5D-MaterialCollapsedProof"
        component={Phase5DMaterialRuntimeProof}
        defaultProps={{ mode: 'MATERIAL_COLLAPSED' as const }}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 11. Phase 5D.1 Lighting Runtime Proof Compositions (180 Frames @ 30 FPS) */}
      <Composition
        id="Phase5D1-LightingProof"
        component={Phase5D1LightingRuntimeProof}
        defaultProps={{ mode: 'LIGHTING_AWARE' as const }}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* 12. Phase 5E Camera & Composition Runtime Proof Compositions (300 Frames @ 30 FPS) */}
      <Composition
        id="Phase5E-CameraProof"
        component={Phase5ECameraCompositionProof}
        defaultProps={{ mode: 'SPATIAL_CAMERA' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5E-CameraGlobalTransformProof"
        component={Phase5ECameraCompositionProof}
        defaultProps={{ mode: 'GLOBAL_TRANSFORM' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5E-CameraStaticProof"
        component={Phase5ECameraCompositionProof}
        defaultProps={{ mode: 'STATIC_CAMERA' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 13. Phase 5F Secondary Motion, Follow-Through & Motion-Carry Proof Compositions (300 Frames @ 30 FPS) */}
      <Composition
        id="Phase5F-SecondaryMotionProof"
        component={Phase5FSecondaryMotionProof}
        defaultProps={{ mode: 'REAL_SECONDARY_MOTION' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5F-SecondaryCollapsedProof"
        component={Phase5FSecondaryMotionProof}
        defaultProps={{ mode: 'SECONDARY_COLLAPSED' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5F-AnticipationCollapsedProof"
        component={Phase5FSecondaryMotionProof}
        defaultProps={{ mode: 'ANTICIPATION_COLLAPSED' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5F-FollowThroughCollapsedProof"
        component={Phase5FSecondaryMotionProof}
        defaultProps={{ mode: 'FOLLOWTHROUGH_COLLAPSED' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Phase5F-MotionCarryCollapsedProof"
        component={Phase5FSecondaryMotionProof}
        defaultProps={{ mode: 'MOTION_CARRY_COLLAPSED' as const }}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 14. CINEMATIC BENCHMARK: Full-System Visual Quality Benchmark (720 Frames @ 30 FPS / 24.0s) */}
      <Composition
        id="CinematicBenchmark"
        component={CinematicBenchmarkScene}
        defaultProps={{ mode: 'FULL_SYSTEM' as const }}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Benchmark-NoSecondary"
        component={CinematicBenchmarkScene}
        defaultProps={{ mode: 'NO_SECONDARY' as const }}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Benchmark-NoDepth"
        component={CinematicBenchmarkScene}
        defaultProps={{ mode: 'NO_DEPTH' as const }}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Benchmark-NoCamera"
        component={CinematicBenchmarkScene}
        defaultProps={{ mode: 'NO_CAMERA' as const }}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Benchmark-NoMaterial"
        component={CinematicBenchmarkScene}
        defaultProps={{ mode: 'NO_MATERIAL' as const }}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Benchmark-NoLighting"
        component={CinematicBenchmarkScene}
        defaultProps={{ mode: 'NO_LIGHTING' as const }}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Benchmark-NoCarry"
        component={CinematicBenchmarkScene}
        defaultProps={{ mode: 'NO_CARRY' as const }}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 15. PHASE 6: VISUAL DIRECTOR RESET BENCHMARK (420 Frames @ 30 FPS / 14.0s) */}
      <Composition
        id="Phase6VisualBenchmark"
        component={Phase6VisualBenchmark}
        durationInFrames={420}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 16. CLAUDE MOTION SHOWCASE BENCHMARK (360 Frames @ 30 FPS / 12.0s) */}
      <Composition
        id="ClaudeMotionBenchmark"
        component={ClaudeMotionBenchmark}
        durationInFrames={CLAUDE_BENCHMARK_FRAMES}
        fps={30}
        width={CLAUDE_BENCHMARK_WIDTH}
        height={CLAUDE_BENCHMARK_HEIGHT}
      />

      {/* 17. CLAUDE OPUS 5.5 SHOWREEL MASTERPIECE (450 Frames @ 30 FPS / 15.0s) */}
      <Composition
        id="ClaudeOpusShowreel"
        component={ClaudeOpusShowreelContent}
        durationInFrames={CLAUDE_OPUS_SHOWREEL_DURATION}
        fps={CLAUDE_OPUS_SHOWREEL_FPS}
        width={CLAUDE_OPUS_SHOWREEL_WIDTH}
        height={CLAUDE_OPUS_SHOWREEL_HEIGHT}
      />

      {/* 18. CLAUDE FLUID CONTINUITY MASTERPIECE (450 Frames @ 30 FPS / 15.0s) */}
      <Composition
        id="ClaudeFluidShowreel"
        component={ClaudeFluidShowreelContent}
        durationInFrames={CLAUDE_FLUID_DURATION}
        fps={CLAUDE_FLUID_FPS}
        width={CLAUDE_FLUID_WIDTH}
        height={CLAUDE_FLUID_HEIGHT}
      />
    </>
  );
};
