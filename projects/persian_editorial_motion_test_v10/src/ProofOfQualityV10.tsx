import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_IntroHookV10 } from './shots/Shot01_IntroHookV10';
import { Shot02_FrameworkDecreeV10 } from './shots/Shot02_FrameworkDecreeV10';

const CAM_KEYS_PROOF_V10: CamKey2D[] = [
  { frame: 0, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 200, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 350, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 380, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 540, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
];

/**
 * PROOF OF QUALITY V10 (HERO PROOF — 540 FRAMES / 18.0s)
 * Verifies the V10 Hybrid Motion System:
 * - Deterministic acoustic synchronization (Frame 234 strike on «دانشجوی پژوهشگر برجسته» & Frame 45 on «۲»)
 * - Standardized Motion Recipes: ImpactAndRipple, TravelAndHandoff, SplitAndConverge, RevealAndEscalate
 * - Strict 4-Role Semantic Hierarchy (Narrative Actor, Motion Connector, State Indicator, Spatial Texture)
 * - Zero accidental/decorative motion — every motion serves a clear narrative purpose
 * - Verbatim Canonical Script & Dual-Clock Gemini-TTS narration
 */
export const ProofOfQualityV10: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030611' }}>
      <EditorialCamera keys={CAM_KEYS_PROOF_V10} bg="#030611">
        {/* Shot 1: Institutional Hook (0 - 380f) */}
        <Sequence from={0} durationInFrames={380}>
          <Shot01_IntroHookV10 />
        </Sequence>

        {/* Shot 2: Directive Decree of Section Kaf, Article 2 (350 - 540f) */}
        <Sequence from={350} durationInFrames={190}>
          <Shot02_FrameworkDecreeV10 />
        </Sequence>
      </EditorialCamera>

      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
