import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_IntroHookV54 } from './shots/Shot01_IntroHookV54';
import { Shot02_FrameworkDecreeV54 } from './shots/Shot02_FrameworkDecreeV54';
import { Shot03_ThreeConditionsV54 } from './shots/Shot03_ThreeConditionsV54';
import { Shot04_TimeWindowV54 } from './shots/Shot04_TimeWindowV54';
import { Shot05_ThresholdGaugesV54 } from './shots/Shot05_ThresholdGaugesV54';
import { Shot06_OutroActionV54 } from './shots/Shot06_OutroActionV54';

// Total duration: 2361 frames (78.71s @ 30 FPS)
// V5.4 OVERLAPPING TIMELINE ARCHITECTURE (Zero Hard-Cuts):
// Shot 1: from 0, duration 380 frames (active exit from 335 to 380)
// Shot 2: from 350, duration 300 frames (active entrance from 350 to 385, active exit from 620 to 650)
// Shot 3: from 620, duration 870 frames (active entrance from 620 to 650, active exit from 1450 to 1490)
// Shot 4: from 1460, duration 270 frames (active entrance from 1460 to 1490, active exit from 1700 to 1730)
// Shot 5: from 1700, duration 485 frames (active entrance from 1700 to 1730, active exit from 2150 to 2185)
// Shot 6: from 2155, duration 206 frames (active entrance from 2155 to 2185 to 2361)

const CAM_KEYS_V54: CamKey2D[] = [
  // Shot 1: Intro Hook - Identity lock for readability, subtle 2% push into the core question
  { frame: 0, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 200, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 350, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 2: Framework Decree - Pure rock-solid identity lock
  { frame: 380, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 620, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3: 3 Conditions - Rock-solid identity during reading; micro-accent on Condition 3
  { frame: 650, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1035, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1075, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1460, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 4: Time Window - Rock-solid identity
  { frame: 1490, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1700, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 5: Threshold Gauges - Rock-solid identity during metric intake
  { frame: 1730, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1980, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2020, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2155, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6: Outro Sign-off - Stable identity
  { frame: 2185, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2361, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
];

export const PersianEditorialMasterV54: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040711' }}>
      {/* 2.5D Camera Layer with Stable Editorial Movement */}
      <EditorialCamera keys={CAM_KEYS_V54} bg="#040711">
        {/* Shot 1: Baqiyatallah PR Opening & Hook (0 - 380f) */}
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV54 />
        </Sequence>

        {/* Shot 2: Directive Decree of Section Kaf, Article 2 (350 - 650f) [30f overlap with Shot 1] */}
        <Sequence from={350} durationInFrames={300}>
          <Shot02_FrameworkDecreeV54 />
        </Sequence>

        {/* Shot 3: Three Fundamental Conditions (620 - 1490f) [30f overlap with Shot 2] */}
        <Sequence from={620} durationInFrames={870}>
          <Shot03_ThreeConditionsV54 />
        </Sequence>

        {/* Shot 4: Time Window and 1-Year Post-Graduation Limit (1460 - 1730f) [30f overlap with Shot 3] */}
        <Sequence from={1460} durationInFrames={270}>
          <Shot04_TimeWindowV54 />
        </Sequence>

        {/* Shot 5: Passing Thresholds Across University Tiers (1700 - 2185f) [30f overlap with Shot 4] */}
        <Sequence from={1700} durationInFrames={485}>
          <Shot05_ThresholdGaugesV54 />
        </Sequence>

        {/* Shot 6: Outro Call-to-Action & Sign-off (2155 - 2361f) [30f overlap with Shot 5] */}
        <Sequence from={2155} durationInFrames={206}>
          <Shot06_OutroActionV54 />
        </Sequence>
      </EditorialCamera>

      {/* Master Mix with Continuous Narration and -14dB Sidechain Ducked Score */}
      <Audio src={staticFile('audio/persian_editorial_v5_4/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};

// Gate Verification Proof Composition (540 frames = 18.0s)
export const ProofOfQualityV54: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040711' }}>
      <EditorialCamera keys={CAM_KEYS_V54.slice(0, 5)} bg="#040711">
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV54 />
        </Sequence>
        <Sequence from={350} durationInFrames={190}>
          <Shot02_FrameworkDecreeV54 />
        </Sequence>
      </EditorialCamera>
      <Audio src={staticFile('audio/persian_editorial_v5_4/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
