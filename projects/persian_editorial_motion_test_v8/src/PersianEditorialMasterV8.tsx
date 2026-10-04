import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_IntroHookV8 } from './shots/Shot01_IntroHookV8';
import { Shot02_FrameworkDecreeV8 } from './shots/Shot02_FrameworkDecreeV8';
import { Shot03_ThreeConditionsV8 } from './shots/Shot03_ThreeConditionsV8';
import { Shot04_TimeWindowV8 } from './shots/Shot04_TimeWindowV8';
import { Shot05_ThresholdGaugesV8 } from './shots/Shot05_ThresholdGaugesV8';
import { Shot06_OutroActionV8 } from './shots/Shot06_OutroActionV8';

// Total duration: 2361 frames (78.71s @ 30 FPS)
// V8 CONTINUOUS MOTION CHOREOGRAPHY UPGRADE
// Core Invariants:
// 1. ONE CONTINUOUS VISUAL PERFORMANCE: Unbroken kinetic lineage across all shots.
// 2. Persistent Visual Actors:
//    - Actor A: PR Crest (Shot 1 -> Point -> Shot 6)
//    - Actor B: Editorial Datum Rule (sweeps Shot 1 -> anchors Shot 2 -> rotates in Shot 3 -> becomes Temporal Wall in Shot 4 -> flattens into baseline for Shot 5)
//    - Actor C: Primary Numeral Forms (slam 2 -> transfer 16 -> surge 65/110/130 -> condense to point)
// 3. 100% Canonical Persian Script text immutability.
// 4. Single continuous Google Gemini-TTS speech stem with -14dB sidechain ducked documentary score.
// 5. Zero return to SaaS/UI cards, symmetric pricing tables, or floating navbar pills.

const CAM_KEYS_V8: CamKey2D[] = [
  // Shot 1: Anticipation & Question Hook
  { frame: 0, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 200, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 350, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 2: Monumental Legal Decree
  { frame: 380, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 620, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3: Three Sequential Criteria Impacts
  { frame: 650, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1040, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1080, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1460, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 4: Temporal Wall & Legal Horizon
  { frame: 1490, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1700, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 5: Ascending Threshold Monoliths
  { frame: 1730, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1980, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2020, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2155, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6: Institutional Resolution & Outro
  { frame: 2185, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2361, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
];

export const PersianEditorialMasterV8: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030611' }}>
      <EditorialCamera keys={CAM_KEYS_V8} bg="#030611">
        {/* Shot 1: Baqiyatallah Title Hook (0 - 380f) */}
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV8 />
        </Sequence>

        {/* Shot 2: Directive Decree of Section Kaf, Article 2 (350 - 650f) [30f kinetic lineage overlap] */}
        <Sequence from={350} durationInFrames={300}>
          <Shot02_FrameworkDecreeV8 />
        </Sequence>

        {/* Shot 3: Three Indispensable Laws (620 - 1490f) [30f energy transfer overlap] */}
        <Sequence from={620} durationInFrames={870}>
          <Shot03_ThreeConditionsV8 />
        </Sequence>

        {/* Shot 4: Temporal Horizon & 1-Year Cutoff (1460 - 1730f) [30f spatial rotation overlap] */}
        <Sequence from={1460} durationInFrames={270}>
          <Shot04_TimeWindowV8 />
        </Sequence>

        {/* Shot 5: Ascending Threshold Monoliths (1700 - 2185f) [30f baseline flattening overlap] */}
        <Sequence from={1700} durationInFrames={485}>
          <Shot05_ThresholdGaugesV8 />
        </Sequence>

        {/* Shot 6: Institutional Resolution & Outro (2155 - 2361f) [30f graphic convergence overlap] */}
        <Sequence from={2155} durationInFrames={206}>
          <Shot06_OutroActionV8 />
        </Sequence>
      </EditorialCamera>

      {/* Master Audio Mix with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};

// Gate Verification Proof Composition (540 frames = 18.0s)
export const ProofOfQualityV8: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030611' }}>
      <EditorialCamera keys={CAM_KEYS_V8.slice(0, 5)} bg="#030611">
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV8 />
        </Sequence>
        <Sequence from={350} durationInFrames={190}>
          <Shot02_FrameworkDecreeV8 />
        </Sequence>
      </EditorialCamera>
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
