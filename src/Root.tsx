import React from 'react';
import { Composition } from 'remotion';
import { Apoptosis916Main } from './projects/apoptosis_cancer_9_16/src/Apoptosis916Main';
import { StressTestMain } from './stress-test/StressTestMain';
import { StressTestV31Sequence } from '../projects/stress_test_v3_1/src/StressTestV31Sequence';
import { ReferenceStressTestSequence } from '../projects/reference_stress_test/src/ReferenceStressTestSequence';
import { PersianEditorialSequence } from '../projects/persian_editorial_stress_test/src/PersianEditorialSequence';
import { ProofOfMotionSequence } from '../projects/persian_editorial_motion_test_v3_3/src/ProofOfMotionSequence';
import { PersianEditorialMotionMasterV33 } from '../projects/persian_editorial_motion_test_v3_3/src/PersianEditorialMotionMasterV33';
import { ProofOfQualityV4 } from '../projects/persian_editorial_motion_test_v4/src/ProofOfQualityV4';
import { PersianEditorialMasterV4 } from '../projects/persian_editorial_motion_test_v4/src/PersianEditorialMasterV4';
import { PersianEditorialMasterV51 } from '../projects/persian_editorial_motion_test_v5_1/src/PersianEditorialMasterV51';
import { PersianEditorialMasterV52, ProofOfQualityV52 } from '../projects/persian_editorial_motion_test_v5_2/src/PersianEditorialMasterV52';
import { PersianEditorialMasterV53, ProofOfQualityV53 } from '../projects/persian_editorial_motion_test_v5_3/src/PersianEditorialMasterV53';
import { PersianEditorialMasterV54, ProofOfQualityV54 } from '../projects/persian_editorial_motion_test_v5_4/src/PersianEditorialMasterV54';
import { PersianEditorialMasterV55, ProofOfQualityV55 } from '../projects/persian_editorial_motion_test_v5_5/src/PersianEditorialMasterV55';
import { PersianEditorialMasterV6, ProofOfQualityV6 } from '../projects/persian_editorial_motion_test_v6/src/PersianEditorialMasterV6';
import { PersianEditorialMasterV7, ProofOfQualityV7 } from '../projects/persian_editorial_motion_test_v7/src/PersianEditorialMasterV7';
import { PersianEditorialMasterV8, ProofOfQualityV8 } from '../projects/persian_editorial_motion_test_v8/src/PersianEditorialMasterV8';
import { PersianEditorialMasterV9 } from '../projects/persian_editorial_motion_test_v9/src/PersianEditorialMasterV9';
import { ProofOfQualityV9 } from '../projects/persian_editorial_motion_test_v9/src/ProofOfQualityV9';
import { ProofOfQualityV10 } from '../projects/persian_editorial_motion_test_v10/src/ProofOfQualityV10';
import { PersianEditorialMasterV10 } from '../projects/persian_editorial_motion_test_v10/src/PersianEditorialMasterV10';
import { V11MotionLabGallery } from '../projects/v11_motion_lab/src/V11MotionLabGallery';
import { ProofOfQualityV11 } from '../projects/persian_editorial_motion_test_v11/src/ProofOfQualityV11';
import { PersianEditorialMasterV11 } from '../projects/persian_editorial_motion_test_v11/src/PersianEditorialMasterV11';
import { ProofOfQualityV12 } from '../projects/persian_editorial_motion_test_v12/src/ProofOfQualityV12';
import { PersianEditorialMasterV12 } from '../projects/persian_editorial_motion_test_v12/src/PersianEditorialMasterV12';
import { V13MotionGallery } from '../projects/v13_motion_gallery/src/V13MotionGallery';
import { ProofOfQualityV13 } from '../projects/persian_editorial_motion_test_v13/src/ProofOfQualityV13';
import { PersianEditorialMasterV13 } from '../projects/persian_editorial_motion_test_v13/src/PersianEditorialMasterV13';
import { ProofOfQualityV14 } from '../projects/persian_editorial_motion_test_v14/src/ProofOfQualityV14';
import { PersianEditorialMasterV14 } from '../projects/persian_editorial_motion_test_v14/src/PersianEditorialMasterV14';
import { V14MotionGallery } from '../projects/v14_motion_gallery/src/V14MotionGallery';
import { ProofOfQualityV15 } from '../projects/persian_editorial_motion_test_v15/src/ProofOfQualityV15';
import { PersianEditorialMasterV15 } from '../projects/persian_editorial_motion_test_v15/src/PersianEditorialMasterV15';
import { V15MotionGallery } from '../projects/v15_motion_gallery/src/V15MotionGallery';
import { ProofOfQualityV16 } from '../projects/persian_editorial_motion_test_v16/src/ProofOfQualityV16';
import { PersianEditorialMasterV16 } from '../projects/persian_editorial_motion_test_v16/src/PersianEditorialMasterV16';
import { ProofOfQualityV17 } from '../projects/persian_editorial_motion_test_v17/src/ProofOfQualityV17';
import { PersianEditorialMasterV17 } from '../projects/persian_editorial_motion_test_v17/src/PersianEditorialMasterV17';
import { Benchmark1_KineticTypeSlam } from '../projects/v18_motion_benchmarks/src/Benchmark1_KineticTypeSlam';
import { Benchmark2_DotToLineRibbon } from '../projects/v18_motion_benchmarks/src/Benchmark2_DotToLineRibbon';
import { Benchmark3_ShapeMorphToChart } from '../projects/v18_motion_benchmarks/src/Benchmark3_ShapeMorphToChart';
import { Benchmark4_RingTunnelDepth } from '../projects/v18_motion_benchmarks/src/Benchmark4_RingTunnelDepth';
import { Benchmark5_ClichéVsCinematic } from '../projects/v18_motion_benchmarks/src/Benchmark5_ClichéVsCinematic';
import { V18BenchmarkGallery } from '../projects/v18_motion_benchmarks/src/V18BenchmarkGallery';
import { ProofOfQualityV18 } from '../projects/persian_editorial_motion_test_v18/src/ProofOfQualityV18';
import { PersianEditorialMasterV18 } from '../projects/persian_editorial_motion_test_v18/src/PersianEditorialMasterV18';
import { V18BenchmarkReviewReel } from '../projects/v18_motion_benchmarks/src/V18BenchmarkReviewReel';
import { V18VisualReviewContactSheet } from '../projects/v18_motion_benchmarks/src/V18VisualReviewContactSheet';
import {
  V18MotionSheetB1,
  V18MotionSheetB2,
  V18MotionSheetB3,
  V18MotionSheetB4,
  V18MotionSheetB5,
  V18MotionSheetMaster,
} from '../projects/v18_motion_benchmarks/src/V18MotionContactSheets';
import { PersianEditorialMasterV19 } from '../projects/persian_editorial_motion_test_v19/src/PersianEditorialMasterV19';
import {
  V19MasterFinalContactSheet,
  V19MotionSheetMaster,
} from '../projects/persian_editorial_motion_test_v19/src/V19ReviewSheets';
import { V20MotionStabilityBenchmark } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V20MotionStabilityBenchmark';
import { V20TransitionBenchmark } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V20TransitionBenchmark';
import {
  V20Transition01Sheet,
  V20Transition02Sheet,
  V20Transition03Sheet,
  V20Transition04Sheet,
  V20Transition05Sheet,
} from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V20TransitionFrameSheets';
import {
  V21MotionReviewSequence,
  V21LogoBenchmarkSequence,
} from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V21BenchmarkComps';
import {
  V21Transition01Sheet,
  V21Transition02Sheet,
  V21Transition03Sheet,
  V21Transition04Sheet,
  V21Transition05Sheet,
} from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V21TransitionFrameSheets';
import { V21MasterFinalContactSheet } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V21ContactSheet';
import { V22TransformationLab } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V22TransformationLab';
import { V22KineticTypeLab } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V22KineticTypeLab';
import { V22AssetIntegrationBenchmark } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V22AssetIntegrationBenchmark';
import { V22MotionReview } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V22MotionReview';
import { V22MasterFinalContactSheet } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V22ContactSheet';
import {
  V22Transition01Sheet,
  V22Transition02Sheet,
  V22Transition03Sheet,
  V22Transition04Sheet,
  V22Transition05Sheet,
} from '../projects/persian_editorial_motion_test_v19/src/benchmarks/V22TransitionFrameSheets';
import { V23DotBallBounceText } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23DotBallBounceText';
import { V23LetterformGeometry } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23LetterformGeometry';
import { V23KineticTypeBenchmark } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23KineticTypeBenchmark';
import { V23TrueShapeMorph } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23TrueShapeMorph';
import { V23DataTransformation } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23DataTransformation';
import { V23RibbonLineTunnel } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23RibbonLineTunnel';
import { V23CameraThrough } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23CameraThrough';
import { V23PersistentMotif } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23PersistentMotif';
import { V23MotionRhythm } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23MotionRhythm';
import { V23AssetGeometryBenchmark } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23AssetGeometryBenchmark';
import { V23BenchmarkContactSheet } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23BenchmarkContactSheet';
import { V23TransitionContactSheet } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23TransitionContactSheet';
import { V23MotionReview } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v23/V23MotionReview';
import { V24NarrativeSynthesis } from '../projects/persian_editorial_motion_test_v19/src/narrative/v24/V24NarrativeSynthesis';
import { V24NarrativeContactSheet } from '../projects/persian_editorial_motion_test_v19/src/narrative/v24/V24NarrativeContactSheet';
import { V24TransitionReview } from '../projects/persian_editorial_motion_test_v19/src/narrative/v24/V24TransitionReview';
import { V24MotionReview } from '../projects/persian_editorial_motion_test_v19/src/narrative/v24/V24MotionReview';
import { V25_01_DotToLineFidelity } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_01_DotToLineFidelity';
import { V25_02_HeavyImpact } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_02_HeavyImpact';
import { V25_03_ElasticBounce } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_03_ElasticBounce';
import { V25_04_RigidReconfiguration } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_04_RigidReconfiguration';
import { V25_05_CircleStarMorph } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_05_CircleStarMorph';
import { V25_06_LetterGeometryMorph } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_06_LetterGeometryMorph';
import { V25_07_BarLineTransform } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_07_BarLineTransform';
import { V25_08_RibbonTunnelMotion } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_08_RibbonTunnelMotion';
import { V25_09_CameraThroughFidelity } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_09_CameraThroughFidelity';
import { V25_10_KineticTypeSlam } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_10_KineticTypeSlam';
import { V25_AB_Review } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_AB_Review';
import { V25_MotionContactSheet } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_MotionContactSheet';
import { V25_MorphDiagnosticSheet } from '../projects/persian_editorial_motion_test_v19/src/benchmarks/v25/V25_MorphDiagnosticSheet';
import { V25_5_IntegratedProduction } from '../projects/persian_editorial_motion_test_v19/src/narrative/v25_5/V25_5_IntegratedProduction';
import { V25_5_MigrationAB } from '../projects/persian_editorial_motion_test_v19/src/narrative/v25_5/V25_5_MigrationAB';
import { StudyA_OneObjectThreeTransforms } from './choreography/v26/StudyA_OneObjectThreeTransforms';
import { StudyB_CompositionMigration } from './choreography/v26/StudyB_CompositionMigration';
import { StudyC_TypographyToGeometry } from './choreography/v26/StudyC_TypographyToGeometry';
import { StudyD_PhysicalSceneHandoff } from './choreography/v26/StudyD_PhysicalSceneHandoff';
import { StudyE_CompleteEditorialBeat } from './choreography/v26/StudyE_CompleteEditorialBeat';
import { V27_Test01_HeroTranslation } from './motion/precision_lab/V27_Test01_HeroTranslation';
import { V27_Test02_HeavyImpact } from './motion/precision_lab/V27_Test02_HeavyImpact';
import { V27_Test03_ElasticBounce } from './motion/precision_lab/V27_Test03_ElasticBounce';
import { V27_Test04_ShapeMorph } from './motion/precision_lab/V27_Test04_ShapeMorph';
import { V27_Test05_KineticTypography } from './motion/precision_lab/V27_Test05_KineticTypography';
import { V27_Test06_FullEditorialBeat } from './motion/precision_lab/V27_Test06_FullEditorialBeat';
import { V28_BounceLab } from './motion/precision_lab/V28_BounceLab';
import { V29_TransformationLab } from './motion/precision_lab/V29_TransformationLab';
import { V30_CreativeDirectionLab } from './motion/precision_lab/V30_CreativeDirectionLab';
import { V31_5_ViralStressTest } from './motion/precision_lab/V31_5_ViralStressTest';
import { V32_VisualCausality } from './motion/precision_lab/V32_VisualCausality';
import { V33_VisualPoetry } from './motion/precision_lab/V33_VisualPoetry';
import { V34_MotionChoreography } from './motion/precision_lab/V34_MotionChoreography';
import { V35_ArtDirectedMotion } from './motion/precision_lab/V35_ArtDirectedMotion';
import { V35_5_GeometricIntegrity } from './motion/precision_lab/V35_5_GeometricIntegrity';
import { V36_ShowreelMaster } from './motion/precision_lab/V36_ShowreelMaster';
import { V36_5_BlindShowreel } from './motion/precision_lab/V36_5_BlindShowreel';
import { V36_5_CraftMasterpiece } from './motion/precision_lab/V36_5_CraftMasterpiece';
import { V37_BandMasterpiece } from './motion/precision_lab/V37_BandMasterpiece';
import { V38_ShowreelBenchmark } from './motion/precision_lab/V38_ShowreelBenchmark';
import { V39_BandKafProduction } from './motion/precision_lab/V39_BandKafProduction';
import { Main } from './Main';

export const Root: React.FC = () => {
  return (
    <>
      {/* v2.1 Vertical Master Composition (9:16 - 1080x1920) */}
      <Composition
        id="ApoptosisCancer916"
        component={Apoptosis916Main}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* v3.1 Physical Motion Design Stress Test (10s @ 30 FPS = 300 frames) */}
      <Composition
        id="StressTest10s"
        component={StressTestMain}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* v3.1 Dedicated Project Stress Test Sequence (12s @ 30 FPS = 360 frames) */}
      <Composition
        id="StressTestV31"
        component={StressTestV31Sequence}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* v3.2 Reference Stress Test (20s @ 30 FPS = 600 frames) */}
      <Composition
        id="ReferenceStressTest"
        component={ReferenceStressTestSequence}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Persian Real Editorial Stress Test (83.3s @ 30 FPS = 2500 frames) */}
      <Composition
        id="PersianEditorialStressTest"
        component={PersianEditorialSequence}
        durationInFrames={2500}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* v3.3 Proof of Motion (24.0s = 720 frames @ 30 FPS) */}
      <Composition
        id="ProofOfMotionV33"
        component={ProofOfMotionSequence}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* v3.3 Persian Editorial Motion Master (83.3s = 2500 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV33"
        component={PersianEditorialMotionMasterV33}
        durationInFrames={2500}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* v4.1 Reuse-First Proof of Quality (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV4"
        component={ProofOfQualityV4}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v4.1 Full 83.3s Persian Editorial Master (2500 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV4"
        component={PersianEditorialMasterV4}
        durationInFrames={2500}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.1 Claude-Level Persian Editorial Master (2500 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV51"
        component={PersianEditorialMasterV51}
        durationInFrames={2500}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.2 Gate 6 Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV52"
        component={ProofOfQualityV52}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.2 Production-Grade Persian Editorial Master (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV52"
        component={PersianEditorialMasterV52}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.3 Gate Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV53"
        component={ProofOfQualityV53}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.3 Polished Persian Editorial Master (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV53"
        component={PersianEditorialMasterV53}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.4 Seamless Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV54"
        component={ProofOfQualityV54}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.4 Seamless Persian Editorial Master (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV54"
        component={PersianEditorialMasterV54}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.5 Reference-Driven Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV55"
        component={ProofOfQualityV55}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v5.5 Reference-Driven Persian Editorial Master (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV55"
        component={PersianEditorialMasterV55}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v6 True Motion Design Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV6"
        component={ProofOfQualityV6}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v6 True Motion Design Master (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV6"
        component={PersianEditorialMasterV6}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v7 Broadcast Editorial Film Proof (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV7"
        component={ProofOfQualityV7}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v7 Broadcast Editorial Film Master (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV7"
        component={PersianEditorialMasterV7}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v8 Continuous Motion Choreography Proof (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV8"
        component={ProofOfQualityV8}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v8 Continuous Motion Choreography Master (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV8"
        component={PersianEditorialMasterV8}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v9 Living World Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV9"
        component={ProofOfQualityV9}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v9 Living World Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV9"
        component={PersianEditorialMasterV9}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v10 Hybrid Motion System Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV10"
        component={ProofOfQualityV10}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v10 Hybrid Motion System Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV10"
        component={PersianEditorialMasterV10}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v11 Reference-Driven Motion Recipe Laboratory Gallery (450 frames @ 30 FPS = 15s) */}
      <Composition
        id="V11MotionLab"
        component={V11MotionLabGallery}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v11 Reference-Driven Motion System Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV11"
        component={ProofOfQualityV11}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v11 Reference-Driven Motion System Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV11"
        component={PersianEditorialMasterV11}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v12 Reference-Driven Motion System Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV12"
        component={ProofOfQualityV12}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v12 Reference-Driven Motion System Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV12"
        component={PersianEditorialMasterV12}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v13 Reference-Driven Motion Gallery (450 frames @ 30 FPS = 15s) */}
      <Composition
        id="V13MotionGallery"
        component={V13MotionGallery}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v13 Reference-Driven Motion System Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV13"
        component={ProofOfQualityV13}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v13 Reference-Driven Motion System Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV13"
        component={PersianEditorialMasterV13}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v14 Content-Locked Reference-Driven Motion System Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV14"
        component={ProofOfQualityV14}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v14 Content-Locked Reference-Driven Motion System Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV14"
        component={PersianEditorialMasterV14}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v14 Content-Locked Reference-Driven Motion Gallery (450 frames @ 30 FPS = 15s) */}
      <Composition
        id="V14MotionGallery"
        component={V14MotionGallery}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v15 Director-Led Content-Locked Motion System Proof Composition (18.0s = 540 frames @ 30 FPS) */}
      <Composition
        id="ProofOfQualityV15"
        component={ProofOfQualityV15}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v15 Director-Led Content-Locked Motion System Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV15"
        component={PersianEditorialMasterV15}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v15 Director-Led Motion Gallery (450 frames @ 30 FPS = 15s) */}
      <Composition
        id="V15MotionGallery"
        component={V15MotionGallery}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v16 Hero Shot Gate Quality Proof (540 frames @ 30 FPS = 18s) */}
      <Composition
        id="ProofOfQualityV16"
        component={ProofOfQualityV16}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v16 Deterministic Pronunciation Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV16"
        component={PersianEditorialMasterV16}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v17 Hero Shot Gate Quality Proof (540 frames @ 30 FPS = 18s) */}
      <Composition
        id="ProofOfQualityV17"
        component={ProofOfQualityV17}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* v17 Critical Pronunciation & Prosody-Driven Master Composition (2361 frames @ 30 FPS) */}
      <Composition
        id="PersianEditorialMasterV17"
        component={PersianEditorialMasterV17}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 BENCHMARK 1: Kinetic Typography Slam (120 frames @ 30 FPS = 4.0s) */}
      <Composition
        id="Benchmark1-KineticTypeSlam"
        component={Benchmark1_KineticTypeSlam}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 BENCHMARK 2: Geometric Evolution Dot-Line-Ribbon (120 frames @ 30 FPS = 4.0s) */}
      <Composition
        id="Benchmark2-DotToLineRibbon"
        component={Benchmark2_DotToLineRibbon}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 BENCHMARK 3: Shape Morph to Data Chart (120 frames @ 30 FPS = 4.0s) */}
      <Composition
        id="Benchmark3-ShapeMorphToChart"
        component={Benchmark3_ShapeMorphToChart}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 BENCHMARK 4: Spatial Ring Tunnel Depth (120 frames @ 30 FPS = 4.0s) */}
      <Composition
        id="Benchmark4-RingTunnelDepth"
        component={Benchmark4_RingTunnelDepth}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 BENCHMARK 5: Cliché vs Cinematic Split Screen (150 frames @ 30 FPS = 5.0s) */}
      <Composition
        id="Benchmark5-ClicheVsCinematic"
        component={Benchmark5_ClichéVsCinematic}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 BENCHMARK GALLERY (630 frames @ 30 FPS = 21.0s) */}
      <Composition
        id="V18BenchmarkGallery"
        component={V18BenchmarkGallery}
        durationInFrames={630}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 Hero Shot Gate Quality Proof (540 frames @ 30 FPS = 18.0s) */}
      <Composition
        id="ProofOfQualityV18"
        component={ProofOfQualityV18}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 Reference-Integrated Persian Editorial Master Composition (2361 frames @ 30 FPS = 78.71s) */}
      <Composition
        id="PersianEditorialMasterV18"
        component={PersianEditorialMasterV18}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 Benchmark Review Reel (990 frames @ 30 FPS = 33.0s) */}
      <Composition
        id="V18BenchmarkReview"
        component={V18BenchmarkReviewReel}
        durationInFrames={990}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V18 Visual Review Master Contact Sheet (3840x2160 4K UHD) */}
      <Composition
        id="V18VisualReviewContactSheet"
        component={V18VisualReviewContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* V18 Motion Contact Sheets (1920x1080) */}
      <Composition
        id="V18MotionSheetB1"
        component={V18MotionSheetB1}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V18MotionSheetB2"
        component={V18MotionSheetB2}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V18MotionSheetB3"
        component={V18MotionSheetB3}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V18MotionSheetB4"
        component={V18MotionSheetB4}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V18MotionSheetB5"
        component={V18MotionSheetB5}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V18MotionSheetMaster"
        component={V18MotionSheetMaster}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V19 True Motion Graphics Master Composition (2361 frames @ 30 FPS = 78.71s) */}
      <Composition
        id="PersianEditorialMasterV19"
        component={PersianEditorialMasterV19}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V19 Master Final Contact Sheet (3840x2160 4K UHD) */}
      <Composition
        id="V19MasterFinalContactSheet"
        component={V19MasterFinalContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* V19 Motion Sheet Master (1920x1080) */}
      <Composition
        id="V19MotionSheetMaster"
        component={V19MotionSheetMaster}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V20 Motion Stability Benchmark (180 frames @ 30 FPS = 6.00s) */}
      <Composition
        id="V20MotionStabilityBenchmark"
        component={V20MotionStabilityBenchmark}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V20 Transition Integrity Benchmark (300 frames @ 30 FPS = 10.00s) */}
      <Composition
        id="V20TransitionBenchmark"
        component={V20TransitionBenchmark}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V20 Transition Frame Sheets (1920x1080) */}
      <Composition
        id="V20Transition01Sheet"
        component={V20Transition01Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V20Transition02Sheet"
        component={V20Transition02Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V20Transition03Sheet"
        component={V20Transition03Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V20Transition04Sheet"
        component={V20Transition04Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V20Transition05Sheet"
        component={V20Transition05Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V20 Master Final Composition (2361 frames @ 30 FPS = 78.71s) */}
      <Composition
        id="V20MasterFinal"
        component={PersianEditorialMasterV19}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V20 Master Final Contact Sheet (3840x2160 4K UHD) */}
      <Composition
        id="V20MasterFinalContactSheet"
        component={V19MasterFinalContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ======================================================== */}
      {/* V21 CHOREOGRAPHY 2.0 & INSTITUTIONAL BRANDING BENCHMARKS */}
      {/* ======================================================== */}
      {/* V21 Motion Review: Benchmarks A, B, C, D (360 frames @ 30 FPS = 12.00s) */}
      <Composition
        id="V21MotionReview"
        component={V21MotionReviewSequence}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V21 Logo Benchmark: PR Sting & Final End Card (300 frames @ 30 FPS = 10.00s) */}
      <Composition
        id="V21LogoBenchmark"
        component={V21LogoBenchmarkSequence}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V21 Transition Benchmark (300 frames @ 30 FPS = 10.00s) */}
      <Composition
        id="V21TransitionBenchmark"
        component={V20TransitionBenchmark}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V21 Stability Benchmark (180 frames @ 30 FPS = 6.00s) */}
      <Composition
        id="V21StabilityBenchmark"
        component={V20MotionStabilityBenchmark}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V21 Transition Frame Sheets (1920x1080) */}
      <Composition
        id="V21Transition01Sheet"
        component={V21Transition01Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V21Transition02Sheet"
        component={V21Transition02Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V21Transition03Sheet"
        component={V21Transition03Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V21Transition04Sheet"
        component={V21Transition04Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V21Transition05Sheet"
        component={V21Transition05Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V21 Master Final Narrative Composition (2361 frames @ 30 FPS = 78.71s) */}
      <Composition
        id="V21MasterFinal"
        component={PersianEditorialMasterV19}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V21 Master Final Contact Sheet (3840x2160 4K UHD) */}
      <Composition
        id="V21MasterFinalContactSheet"
        component={V21MasterFinalContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ======================================================== */}
      {/* V22 VISUAL TRANSFORMATION GRAMMAR & KINETIC TYPOGRAPHY   */}
      {/* ======================================================== */}
      {/* V22 Transformation Lab (540 frames @ 30 FPS = 18.00s) */}
      <Composition
        id="V22TransformationLab"
        component={V22TransformationLab}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V22 Kinetic Typography Lab (360 frames @ 30 FPS = 12.00s) */}
      <Composition
        id="V22KineticTypeLab"
        component={V22KineticTypeLab}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V22 Asset Integration Benchmark (300 frames @ 30 FPS = 10.00s) */}
      <Composition
        id="V22AssetIntegrationBenchmark"
        component={V22AssetIntegrationBenchmark}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V22 Motion Review (360 frames @ 30 FPS = 12.00s) */}
      <Composition
        id="V22MotionReview"
        component={V22MotionReview}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V22 Transition Boundary Sheets (1920x1080) */}
      <Composition
        id="V22Transition01Sheet"
        component={V22Transition01Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V22Transition02Sheet"
        component={V22Transition02Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V22Transition03Sheet"
        component={V22Transition03Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V22Transition04Sheet"
        component={V22Transition04Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V22Transition05Sheet"
        component={V22Transition05Sheet}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V22 Master Final Narrative Composition (2361 frames @ 30 FPS = 78.71s) */}
      <Composition
        id="V22MasterFinal"
        component={PersianEditorialMasterV19}
        durationInFrames={2361}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V22 Master Final Contact Sheet (3840x2160 4K UHD) */}
      <Composition
        id="V22MasterFinalContactSheet"
        component={V22MasterFinalContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ======================================================== */}
      {/* V23 VISUAL LANGUAGE BENCHMARKS & ADVANCED CHOREOGRAPHY   */}
      {/* ======================================================== */}

      {/* Benchmark 01: Dot -> Ball -> Bounce -> Text (180 frames @ 30 FPS = 6.00s) */}
      <Composition
        id="V23-DotBallBounceText"
        component={V23DotBallBounceText}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 02: Letterform -> Geometry (210 frames @ 30 FPS = 7.00s) */}
      <Composition
        id="V23-LetterformGeometry"
        component={V23LetterformGeometry}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 03: Kinetic Typography (210 frames @ 30 FPS = 7.00s) */}
      <Composition
        id="V23-KineticType"
        component={V23KineticTypeBenchmark}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 04: True Shape Morph (240 frames @ 30 FPS = 8.00s) */}
      <Composition
        id="V23-ShapeMorph"
        component={V23TrueShapeMorph}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 05: Data Transformation (210 frames @ 30 FPS = 7.00s) */}
      <Composition
        id="V23-DataTransform"
        component={V23DataTransformation}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 06: Ribbon / Line Field Tunnel (240 frames @ 30 FPS = 8.00s) */}
      <Composition
        id="V23-RibbonTunnel"
        component={V23RibbonLineTunnel}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 07: Ring / Camera Through (210 frames @ 30 FPS = 7.00s) */}
      <Composition
        id="V23-CameraThrough"
        component={V23CameraThrough}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 08: Persistent Motif (240 frames @ 30 FPS = 8.00s) */}
      <Composition
        id="V23-PersistentMotif"
        component={V23PersistentMotif}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 09: Motion Rhythm (210 frames @ 30 FPS = 7.00s) */}
      <Composition
        id="V23-MotionRhythm"
        component={V23MotionRhythm}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Benchmark 10: Asset -> Geometry (210 frames @ 30 FPS = 7.00s) */}
      <Composition
        id="V23-AssetGeometry"
        component={V23AssetGeometryBenchmark}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V23 Benchmark Contact Sheet (3840x2160 4K UHD) */}
      <Composition
        id="V23-BenchmarkContactSheet"
        component={V23BenchmarkContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* V23 Transition Contact Sheet (3840x2160 4K UHD) */}
      <Composition
        id="V23-TransitionContactSheet"
        component={V23TransitionContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* V23 Motion Review (360 frames @ 30 FPS = 12.00s) */}
      <Composition
        id="V23-MotionReview"
        component={V23MotionReview}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ======================================================== */}
      {/* V24 ADAPTIVE CHOREOGRAPHY & NARRATIVE SYNTHESIS          */}
      {/* ======================================================== */}

      {/* V24 Narrative Synthesis Master (1,080 frames @ 30 FPS = 36.00s) */}
      <Composition
        id="V24-NarrativeSynthesis"
        component={V24NarrativeSynthesis}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V24 Narrative Contact Sheet (4K UHD 3840x2160) */}
      <Composition
        id="V24-NarrativeContactSheet"
        component={V24NarrativeContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* V24 Transition Review (4K UHD 3840x2160) */}
      <Composition
        id="V24-TransitionReview"
        component={V24TransitionReview}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* V24 Motion Review Reel (360 frames @ 30 FPS = 12.00s) */}
      <Composition
        id="V24-MotionReview"
        component={V24MotionReview}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ======================================================== */}
      {/* V25 MOTION FIDELITY & TEMPORAL PRECISION LAB             */}
      {/* ======================================================== */}

      <Composition
        id="V25-DotToLineFidelity"
        component={V25_01_DotToLineFidelity}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-HeavyImpact"
        component={V25_02_HeavyImpact}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-ElasticBounce"
        component={V25_03_ElasticBounce}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-RigidReconfiguration"
        component={V25_04_RigidReconfiguration}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-CircleStarMorph"
        component={V25_05_CircleStarMorph}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-LetterGeometryMorph"
        component={V25_06_LetterGeometryMorph}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-BarLineTransform"
        component={V25_07_BarLineTransform}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-RibbonTunnelMotion"
        component={V25_08_RibbonTunnelMotion}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-CameraThroughFidelity"
        component={V25_09_CameraThroughFidelity}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-KineticTypeSlam"
        component={V25_10_KineticTypeSlam}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-ABReview"
        component={V25_AB_Review}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V25-MotionContactSheet"
        component={V25_MotionContactSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="V25-MorphDiagnosticSheet"
        component={V25_MorphDiagnosticSheet}
        durationInFrames={1}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ======================================================== */}
      {/* V25.5 PRODUCTION INTEGRATION & AUDIT                     */}
      {/* ======================================================== */}

      {/* V24 Production Baseline Alias */}
      <Composition
        id="V24-ProductionBaseline"
        component={V24NarrativeSynthesis}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V25.5 Integrated Production Master */}
      <Composition
        id="V25-5-Integrated"
        component={V25_5_IntegratedProduction}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V25.5 Migration A/B Comparative Reel */}
      <Composition
        id="V25-5-MigrationAB"
        component={V25_5_MigrationAB}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ======================================================== */}
      {/* V26 VISUAL CHOREOGRAPHY BENCHMARK STUDIES                */}
      {/* ======================================================== */}

      {/* Study A: One Object, Three Transformations (180f = 6.0s) */}
      <Composition
        id="V26-StudyA-OneObjectThreeTransforms"
        component={StudyA_OneObjectThreeTransforms}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Study B: Composition Migration & Asymmetric Framing (180f = 6.0s) */}
      <Composition
        id="V26-StudyB-CompositionMigration"
        component={StudyB_CompositionMigration}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Study C: Persian Typography as Graphic Material (180f = 6.0s) */}
      <Composition
        id="V26-StudyC-TypographyToGeometry"
        component={StudyC_TypographyToGeometry}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Study D: Physical Scene Handoff (180f = 6.0s) */}
      <Composition
        id="V26-StudyD-PhysicalSceneHandoff"
        component={StudyD_PhysicalSceneHandoff}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Study E: Complete 10s Editorial Choreography Beat (300f = 10.0s) */}
      <Composition
        id="V26-StudyE-CompleteEditorialBeat"
        component={StudyE_CompleteEditorialBeat}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V26 Redesigned Master Composition Alias */}
      <Composition
        id="V26-ChoreographedMaster"
        component={V25_5_IntegratedProduction}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ======================================================== */}
      {/* V27 MOTION PRECISION & KEYFRAME CRAFT LAB                */}
      {/* ======================================================== */}

      {/* Test 01: Hero Translation (60f = 2.0s) */}
      <Composition
        id="V27-Test01-HeroTranslation"
        component={V27_Test01_HeroTranslation}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 02: Heavy Impact & Punctuation (90f = 3.0s) */}
      <Composition
        id="V27-Test02-HeavyImpact"
        component={V27_Test02_HeavyImpact}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 03: Elastic Bounce (90f = 3.0s) */}
      <Composition
        id="V27-Test03-ElasticBounce"
        component={V27_Test03_ElasticBounce}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 04: Shape Morph Arc-Length (90f = 3.0s) */}
      <Composition
        id="V27-Test04-ShapeMorph"
        component={V27_Test04_ShapeMorph}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 05: Kinetic Typography Precision (90f = 3.0s) */}
      <Composition
        id="V27-Test05-KineticTypography"
        component={V27_Test05_KineticTypography}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Test 06: Full Editorial Beat (270f = 9.0s) */}
      <Composition
        id="V27-Test06-FullEditorialBeat"
        component={V27_Test06_FullEditorialBeat}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V27 Production Master with Crafted Curves */}
      <Composition
        id="V27-KeyframeCraftedMaster"
        component={V25_5_IntegratedProduction}
        durationInFrames={1080}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V28 Precision Bounce Laboratory & Comparison */}
      <Composition
        id="V28-BounceLab"
        component={V28_BounceLab}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V28-Bounce-30fps"
        component={V28_BounceLab}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V28-Bounce-60fps"
        component={V28_BounceLab}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="V28-Bounce-120fps"
        component={V28_BounceLab}
        durationInFrames={360}
        fps={120}
        width={1920}
        height={1080}
      />

      {/* V29 Transformation Continuity & Momentum Laboratory */}
      <Composition
        id="V29-TransformationLab"
        component={V29_TransformationLab}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="V29-Transformation-60fps"
        component={V29_TransformationLab}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* V30 Creative Direction Laboratory */}
      <Composition
        id="V30-CreativeDirectionLab"
        component={V30_CreativeDirectionLab}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V31.5 Viral Claude Motion Graphics Stress Test */}
      <Composition
        id="V31-5-ViralStressTest"
        component={V31_5_ViralStressTest}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V32 Visual Causality & Shot-to-Shot Continuity Composition */}
      <Composition
        id="V32-VisualCausality"
        component={V32_VisualCausality}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V33 Visual Poetry & Nonlinear Transformation Composition */}
      <Composition
        id="V33-VisualPoetry"
        component={V33_VisualPoetry}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V34 Motion Choreography & Kinetic Continuity Composition */}
      <Composition
        id="V34-MotionChoreography"
        component={V34_MotionChoreography}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V35 Visual Art Direction, Materiality & Spatial Depth Master */}
      <Composition
        id="V35-ArtDirectedMotion"
        component={V35_ArtDirectedMotion}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V35.5 Geometric Integrity, Transform Discipline & Composition Master */}
      <Composition
        id="V35-5-GeometricIntegrity"
        component={V35_5_GeometricIntegrity}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V36 Showreel Director Pass Master */}
      <Composition
        id="V36-ShowreelMaster"
        component={V36_ShowreelMaster}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V36.5 Blind Showreel Stress Test Master */}
      <Composition
        id="V36-5-BlindShowreel"
        component={V36_5_BlindShowreel}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V36.5 Craft Test — Micro-Sequence Motion Polish Master */}
      <Composition
        id="V36-5-CraftMasterpiece"
        component={V36_5_CraftMasterpiece}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V37 Masterpiece — Biomedical & Advanced Neuroscience Day (BAND) */}
      <Composition
        id="V37-BandMasterpiece"
        component={V37_BandMasterpiece}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V38 Benchmark — Ben Kaufman Showreel Benchmark */}
      <Composition
        id="V38-ShowreelBenchmark"
        component={V38_ShowreelBenchmark}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V39 Production — Ben Kaufman Full Video Production (Band K) */}
      <Composition
        id="V39-BandKafProduction"
        component={V39_BandKafProduction}
        durationInFrames={2755}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Legacy 16:9 Landscape Composition */}
      <Composition
        id="CinematicExplainer"
        component={Main}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
