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
