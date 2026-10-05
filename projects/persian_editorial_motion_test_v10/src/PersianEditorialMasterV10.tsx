import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_IntroHookV10 } from './shots/Shot01_IntroHookV10';
import { Shot02_FrameworkDecreeV10 } from './shots/Shot02_FrameworkDecreeV10';
import { Shot03_ThreeConditionsV10 } from './shots/Shot03_ThreeConditionsV10';
import { Shot04_TimeWindowV10 } from './shots/Shot04_TimeWindowV10';
import { Shot05_ThresholdGaugesV10 } from './shots/Shot05_ThresholdGaugesV10';
import { Shot06_OutroActionV10 } from './shots/Shot06_OutroActionV10';

// Total duration: 2361 frames (78.71s @ 30 FPS)
// V10 HYBRID MOTION-SYSTEM UPGRADE MASTER COMPOSITION
// Invariants:
// 1. More designed motion, not more motion: every graphic motion serves a narrative role.
// 2. Deterministic frame-accurate audio synchronization across all 13 acoustic events (delta <= +-2 frames).
// 3. Standardized Motion Recipes: TravelAndHandoff, ImpactAndRipple, SplitAndConverge, RevealAndEscalate, ScanAndCollapse, GravitationalConvergence.
// 4. Strict 4-Role Semantic Hierarchy: Narrative Actor (A), Motion Connector (B), State Indicator (C), Spatial Texture (D).
// 5. 100% Verbatim Canonical Persian Script text immutability.
// 6. Google Gemini-TTS speech stem with automated -14dB sidechain ducking.
// 7. Full HD 1920x1080 @ 30 FPS YouTube 16:9 Landscape.

const CAM_KEYS_V10: CamKey2D[] = [
  // Shot 1: Anticipation & Question Hook (0 - 380f)
  { frame: 0, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 200, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 350, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 2: Monumental Legal Decree (350 - 650f)
  { frame: 380, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 620, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3: Three Sequential Criteria Strikes (620 - 1490f)
  { frame: 650, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1040, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1080, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1460, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 4: Temporal Wall & Legal Horizon (1460 - 1730f)
  { frame: 1490, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1700, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 5: Ascending Threshold Monoliths (1700 - 2185f)
  { frame: 1730, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 1980, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2020, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2155, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6: Institutional Resolution & Outro (2155 - 2361f)
  { frame: 2185, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2361, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
];

export const PersianEditorialMasterV10: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030611' }}>
      <EditorialCamera keys={CAM_KEYS_V10} bg="#030611">
        {/* Shot 1: Baqiyatallah Title Hook & Question (0 - 380f) */}
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV10 />
        </Sequence>

        {/* Shot 2: Directive Decree of Section Kaf, Article 2 (350 - 650f) [30f kinetic lineage overlap] */}
        <Sequence from={350} durationInFrames={300}>
          <Shot02_FrameworkDecreeV10 />
        </Sequence>

        {/* Shot 3: Three Indispensable Laws (620 - 1490f) [30f energy transfer overlap] */}
        <Sequence from={620} durationInFrames={870}>
          <Shot03_ThreeConditionsV10 />
        </Sequence>

        {/* Shot 4: Temporal Horizon & 1-Year Cutoff (1460 - 1730f) [30f spatial rotation overlap] */}
        <Sequence from={1460} durationInFrames={270}>
          <Shot04_TimeWindowV10 />
        </Sequence>

        {/* Shot 5: Ascending Threshold Monoliths (1700 - 2185f) [30f baseline flattening overlap] */}
        <Sequence from={1700} durationInFrames={485}>
          <Shot05_ThresholdGaugesV10 />
        </Sequence>

        {/* Shot 6: Institutional Resolution & Outro (2155 - 2361f) [30f gravitational convergence overlap] */}
        <Sequence from={2155} durationInFrames={206}>
          <Shot06_OutroActionV10 />
        </Sequence>
      </EditorialCamera>

      {/* Master Audio Mix with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
