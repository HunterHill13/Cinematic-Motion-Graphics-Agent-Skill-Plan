import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_IntroHookV53 } from './shots/Shot01_IntroHookV53';
import { Shot02_FrameworkDecreeV53 } from './shots/Shot02_FrameworkDecreeV53';
import { Shot03_ThreeConditionsV53 } from './shots/Shot03_ThreeConditionsV53';
import { Shot04_TimeWindowV53 } from './shots/Shot04_TimeWindowV53';
import { Shot05_ThresholdGaugesV53 } from './shots/Shot05_ThresholdGaugesV53';
import { Shot06_OutroActionV53 } from './shots/Shot06_OutroActionV53';

// Total duration: 2361 frames (78.71s @ 30 FPS)
// Shot 1: 0 - 365 (0 - 12.16s)
// Shot 2: 365 - 635 (12.16s - 21.16s)
// Shot 3: 635 - 1475 (21.16s - 49.16s)
// Shot 4: 1475 - 1715 (49.16s - 57.16s)
// Shot 5: 1715 - 2170 (57.16s - 72.33s)
// Shot 6: 2170 - 2361 (72.33s - 78.71s)

// V5.3 CAMERA STABILITY LAW:
// "Animate the graphic before animating the camera."
// 1. Zero perspective drift during explanatory reading.
// 2. Camera stays identity (cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0).
// 3. Crisp motivated micro-push (1.00 -> 1.03) ONLY at major editorial lock milestones.
const CAM_KEYS_V53: CamKey2D[] = [
  // Shot 1: Intro Hook - Identity lock for readability, subtle 2% push into the core question
  { frame: 0, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 200, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 365, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 2: Framework Decree - Pure rock-solid identity lock
  { frame: 366, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 635, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3: 3 Conditions - Rock-solid identity during reading; micro-accent on Condition 3
  { frame: 636, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1035, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1075, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1475, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 4: Time Window - Rock-solid identity
  { frame: 1476, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1715, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 5: Threshold Gauges - Rock-solid identity during metric intake
  { frame: 1716, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1980, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2020, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2170, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6: Outro Sign-off - Stable identity
  { frame: 2171, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2361, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
];

export const PersianEditorialMasterV53: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040711' }}>
      {/* 2.5D Camera Layer with Stable Editorial Movement */}
      <EditorialCamera keys={CAM_KEYS_V53} bg="#040711">
        {/* Shot 1: Baqiyatallah PR Opening & Hook (0 - 365f) */}
        <Sequence from={0} durationInFrames={365}>
          <Shot01_IntroHookV53 />
        </Sequence>

        {/* Shot 2: Directive Decree of Section Kaf, Article 2 (365 - 635f) */}
        <Sequence from={365} durationInFrames={270}>
          <Shot02_FrameworkDecreeV53 />
        </Sequence>

        {/* Shot 3: Three Fundamental Conditions (635 - 1475f) */}
        <Sequence from={635} durationInFrames={840}>
          <Shot03_ThreeConditionsV53 />
        </Sequence>

        {/* Shot 4: Time Window and 1-Year Post-Graduation Limit (1475 - 1715f) */}
        <Sequence from={1475} durationInFrames={240}>
          <Shot04_TimeWindowV53 />
        </Sequence>

        {/* Shot 5: Passing Thresholds Across University Tiers (1715 - 2170f) */}
        <Sequence from={1715} durationInFrames={455}>
          <Shot05_ThresholdGaugesV53 />
        </Sequence>

        {/* Shot 6: Outro Call-to-Action & Sign-off (2170 - 2361f) */}
        <Sequence from={2170} durationInFrames={191}>
          <Shot06_OutroActionV53 />
        </Sequence>
      </EditorialCamera>

      {/* Unified Master Mix with Dedicated Score and -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_3/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};

// 18.0s Proof Composition (540 frames) for Gate Verification
export const ProofOfQualityV53: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040711' }}>
      <EditorialCamera keys={CAM_KEYS_V53.slice(0, 5)} bg="#040711">
        <Sequence from={0} durationInFrames={365}>
          <Shot01_IntroHookV53 />
        </Sequence>
        <Sequence from={365} durationInFrames={175}>
          <Shot02_FrameworkDecreeV53 />
        </Sequence>
      </EditorialCamera>
      <Audio src={staticFile('audio/persian_editorial_v5_3/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
