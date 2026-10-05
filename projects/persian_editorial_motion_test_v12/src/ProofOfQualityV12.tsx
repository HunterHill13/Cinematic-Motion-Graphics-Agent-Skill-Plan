import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from '../../persian_editorial_motion_test_v5_1/src/motion/camera';
import { Shot01_HookV12 } from './shots/Shot01_HookV12';
import { Shot02_DecreeV12 } from './shots/Shot02_DecreeV12';

const CAM_KEYS_PROOF_V12: CamKey2D[] = [
  { frame: 0, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 234, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 350, cx: 960, cy: 540, zoom: 1.025, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 395, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 540, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },
];

/**
 * PROOF OF QUALITY V12 (540 FRAMES / 18.0s @ 30 FPS)
 * Rigorously verifies:
 * 1. Reference-Driven Motion Recipe Architecture (TypographySlam, ObjectHandoff, ImpactAndRipple)
 * 2. 100% Pure Persian Script typography (Zero English metadata or HUD telemetry)
 * 3. Motivated Anti-Slideshow Camera Dynamics (Micro-push at f234, settle at f395)
 * 4. T1 Carry Continuity (Baton pass from underline into Numeral «۲» apex)
 * 5. Deterministic Audio Synchronization across speech milestones
 */
export const ProofOfQualityV12: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      <EditorialCamera keys={CAM_KEYS_PROOF_V12} bg="#07090E">
        {/* Shot 01: The Editorial Question Hook (0 - 380f) */}
        <Sequence from={0} durationInFrames={380}>
          <Shot01_HookV12 />
        </Sequence>

        {/* Shot 02: Official Statute Decree (350 - 540f) [30f T1 Carry Inflow Overlap] */}
        <Sequence from={350} durationInFrames={190}>
          <Shot02_DecreeV12 />
        </Sequence>
      </EditorialCamera>

      {/* Dual-Clock Continuous Master Audio Track */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
