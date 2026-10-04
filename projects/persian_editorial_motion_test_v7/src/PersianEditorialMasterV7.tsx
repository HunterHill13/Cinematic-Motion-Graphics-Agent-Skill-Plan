import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_IntroHookV7 } from './shots/Shot01_IntroHookV7';
import { Shot02_FrameworkDecreeV7 } from './shots/Shot02_FrameworkDecreeV7';
import { Shot03_ThreeConditionsV7 } from './shots/Shot03_ThreeConditionsV7';
import { Shot04_TimeWindowV7 } from './shots/Shot04_TimeWindowV7';
import { Shot05_ThresholdGaugesV7 } from './shots/Shot05_ThresholdGaugesV7';
import { Shot06_OutroActionV7 } from './shots/Shot06_OutroActionV7';

// Total duration: 2361 frames (78.71s @ 30 FPS)
// V7 ART-DIRECTION RESET / BROADCAST EDITORIAL FILM MASTER
// Key Invariants:
// 1. Zero web cards, zero dashboard widgets, zero symmetric pricing tables.
// 2. Bold Swiss typographic hierarchy with extreme scale contrast.
// 3. Deliberate editorial cuts, wipes, and directional transitions.
// 4. Stable editorial camera anchors with purposeful semantic reframing.
// 5. Continuous single Google Gemini-TTS narration stem with -14dB sidechain ducked documentary score.

const CAM_KEYS_V7: CamKey2D[] = [
  // Shot 1: Broadcast Title Hook - Stable anchor
  { frame: 0, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 200, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 350, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 2: Monumental Decree - Stable identity
  { frame: 380, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 620, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3: Three Laws Sequential Impacts - Stable identity with subtle focus on Law 3
  { frame: 650, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1040, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1080, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1460, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 4: Temporal Horizon - Stable identity
  { frame: 1490, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1700, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 5: Ascending Threshold Monoliths - Stable identity
  { frame: 1730, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1980, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2020, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2155, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6: Institutional Resolution - Stable identity
  { frame: 2185, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2361, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
];

export const PersianEditorialMasterV7: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030611' }}>
      <EditorialCamera keys={CAM_KEYS_V7} bg="#030611">
        {/* Shot 1: Baqiyatallah Title Hook (0 - 380f) */}
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV7 />
        </Sequence>

        {/* Shot 2: Directive Decree of Section Kaf, Article 2 (350 - 650f) [30f overlap with Shot 1] */}
        <Sequence from={350} durationInFrames={300}>
          <Shot02_FrameworkDecreeV7 />
        </Sequence>

        {/* Shot 3: Three Indispensable Laws (620 - 1490f) [30f overlap with Shot 2] */}
        <Sequence from={620} durationInFrames={870}>
          <Shot03_ThreeConditionsV7 />
        </Sequence>

        {/* Shot 4: Temporal Horizon & 1-Year Cutoff (1460 - 1730f) [30f overlap with Shot 3] */}
        <Sequence from={1460} durationInFrames={270}>
          <Shot04_TimeWindowV7 />
        </Sequence>

        {/* Shot 5: Ascending Threshold Monoliths (1700 - 2185f) [30f overlap with Shot 4] */}
        <Sequence from={1700} durationInFrames={485}>
          <Shot05_ThresholdGaugesV7 />
        </Sequence>

        {/* Shot 6: Institutional Resolution & Outro (2155 - 2361f) [30f overlap with Shot 5] */}
        <Sequence from={2155} durationInFrames={206}>
          <Shot06_OutroActionV7 />
        </Sequence>
      </EditorialCamera>

      {/* Master Audio Mix with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};

// Gate Verification Proof Composition (540 frames = 18.0s)
export const ProofOfQualityV7: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030611' }}>
      <EditorialCamera keys={CAM_KEYS_V7.slice(0, 5)} bg="#030611">
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV7 />
        </Sequence>
        <Sequence from={350} durationInFrames={190}>
          <Shot02_FrameworkDecreeV7 />
        </Sequence>
      </EditorialCamera>
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
