import React from 'react';
import { Composition } from 'remotion';
import { Apoptosis916Main } from './projects/apoptosis_cancer_9_16/src/Apoptosis916Main';
import { StressTestMain } from './stress-test/StressTestMain';
import { StressTestV31Sequence } from '../projects/stress_test_v3_1/src/StressTestV31Sequence';
import { ReferenceStressTestSequence } from '../projects/reference_stress_test/src/ReferenceStressTestSequence';
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
