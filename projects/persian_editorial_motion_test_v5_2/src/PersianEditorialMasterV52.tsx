import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_IntroHookV52 } from './shots/Shot01_IntroHookV52';
import { Shot02_FrameworkDecreeV52 } from './shots/Shot02_FrameworkDecreeV52';
import { Shot03_ThreeConditionsV52 } from './shots/Shot03_ThreeConditionsV52';
import { Shot04_TimeWindowV52 } from './shots/Shot04_TimeWindowV52';
import { Shot05_ThresholdGaugesV52 } from './shots/Shot05_ThresholdGaugesV52';
import { Shot06_OutroActionV52 } from './shots/Shot06_OutroActionV52';

// Total duration: 2361 frames (78.71s @ 30 FPS)
// Shot 1: 0 - 365 (0 - 12.16s)
// Shot 2: 365 - 635 (12.16s - 21.16s)
// Shot 3: 635 - 1475 (21.16s - 49.16s)
// Shot 4: 1475 - 1715 (49.16s - 57.16s)
// Shot 5: 1715 - 2170 (57.16s - 72.33s)
// Shot 6: 2170 - 2361 (72.33s - 78.71s)

const CAM_KEYS_V52: CamKey2D[] = [
  // Shot 1: Intro Hook
  { frame: 0, cx: 960, cy: 540, zoom: 0.96, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 340, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 365, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 2: Framework Decree
  { frame: 375, cx: 960, cy: 540, zoom: 0.98, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 620, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 635, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 3: 3 Conditions (Architectural drift)
  { frame: 650, cx: 960, cy: 540, zoom: 1.0, rotX: 1, rotY: -2, persp: 1400 },
  { frame: 1450, cx: 960, cy: 540, zoom: 1.03, rotX: 0, rotY: 1, persp: 1400 },
  { frame: 1475, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 4: Time Window
  { frame: 1490, cx: 960, cy: 540, zoom: 0.98, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 1700, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 1715, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 5: Threshold Gauges
  { frame: 1730, cx: 960, cy: 540, zoom: 1.0, rotX: 1, rotY: 2, persp: 1400 },
  { frame: 2150, cx: 960, cy: 540, zoom: 1.03, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2170, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6: Outro Sign-off
  { frame: 2180, cx: 960, cy: 540, zoom: 0.97, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2361, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
];

export const PersianEditorialMasterV52: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040711' }}>
      {/* 2.5D Camera Layer */}
      <EditorialCamera keys={CAM_KEYS_V52} bg="#040711">
        {/* Shot 1: Baqiyatallah PR Opening & Hook (0 - 365f) */}
        <Sequence from={0} durationInFrames={365}>
          <Shot01_IntroHookV52 />
        </Sequence>

        {/* Shot 2: Directive Decree of Section Kaf, Article 2 (365 - 635f) */}
        <Sequence from={365} durationInFrames={270}>
          <Shot02_FrameworkDecreeV52 />
        </Sequence>

        {/* Shot 3: Three Fundamental Conditions (635 - 1475f) */}
        <Sequence from={635} durationInFrames={840}>
          <Shot03_ThreeConditionsV52 />
        </Sequence>

        {/* Shot 4: Time Window and 1-Year Post-Graduation Limit (1475 - 1715f) */}
        <Sequence from={1475} durationInFrames={240}>
          <Shot04_TimeWindowV52 />
        </Sequence>

        {/* Shot 5: Passing Thresholds Across University Tiers (1715 - 2170f) */}
        <Sequence from={1715} durationInFrames={455}>
          <Shot05_ThresholdGaugesV52 />
        </Sequence>

        {/* Shot 6: Outro Call-to-Action & Sign-off (2170 - 2361f) */}
        <Sequence from={2170} durationInFrames={191}>
          <Shot06_OutroActionV52 />
        </Sequence>
      </EditorialCamera>

      {/* Unified Master Mix with Automated Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_2/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};

// 18.0s Proof Composition (540 frames) for Gate 6
export const ProofOfQualityV52: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040711' }}>
      <EditorialCamera keys={CAM_KEYS_V52.slice(0, 4)} bg="#040711">
        <Sequence from={0} durationInFrames={365}>
          <Shot01_IntroHookV52 />
        </Sequence>
        <Sequence from={365} durationInFrames={175}>
          <Shot02_FrameworkDecreeV52 />
        </Sequence>
      </EditorialCamera>
      <Audio src={staticFile('audio/persian_editorial_v5_2/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
