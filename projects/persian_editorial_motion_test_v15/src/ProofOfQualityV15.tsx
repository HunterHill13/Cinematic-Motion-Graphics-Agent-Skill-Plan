import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV15 } from './shots/Shot01_HookV15';
import { Shot02_DecreeV15 } from './shots/Shot02_DecreeV15';

/**
 * PROOF OF QUALITY V15 (HERO SHOT GATE)
 * Director-Led, Content-Locked Reference-Driven Motion
 * Duration: 540 frames (18.0s @ 30 FPS)
 * 
 * Contains:
 * - Shot 01: Hook & Canonical Question (0 - 380f)
 * - Transition 01: Kinetic Underline Handoff (350 - 380f)
 * - Shot 02: Statute Decree Monolith (350 - 540f)
 * 
 * Director-Led Quality Invariants:
 * 1. 100% Source-Authorized Persian Content from V15_CONTENT_MANIFEST.md.
 * 2. ZERO invented phrases, ZERO Latin copy, ZERO HUD/telemetry metadata.
 * 3. 7-Layer budget hierarchy (max 6 active layers).
 * 4. Non-textual geometric companions (quadrant brackets + scale medallion).
 * 5. Causal secondary reactions & subtle idle breathing micro-motion.
 * 6. Single-curve camera grammar per shot.
 * 7. Frame-accurate acoustic synchronization with Google Gemini-TTS master stem.
 */
export const ProofOfQualityV15: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* Shot 01: The Editorial Hook & Canonical Question (0 - 380f) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV15 />
      </Sequence>

      {/* Shot 02: The Official Statute Decree Monolith (350 - 540f) [30f T1 Carry Inflow Overlap] */}
      <Sequence from={350} durationInFrames={190}>
        <Shot02_DecreeV15 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
