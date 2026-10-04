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
