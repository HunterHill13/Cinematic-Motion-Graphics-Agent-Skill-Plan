import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV14 } from './shots/Shot01_HookV14';
import { Shot02_DecreeV14 } from './shots/Shot02_DecreeV14';

/**
 * PROOF OF QUALITY V14 (HERO SHOT GATE)
 * Duration: 540 frames (18.0s @ 30 FPS)
 * Contains:
 * - Shot 01: Hook & Canonical Question (0 - 380f)
 * - Transition 01: Kinetic Underline Handoff (350 - 380f)
 * - Shot 02: Statute Decree Monolith (350 - 540f)
 * 
 * Strict Content Authority Invariants:
 * 1. 100% Source-Authorized Persian Content from V14_CONTENT_MANIFEST.md.
 * 2. ZERO invented phrases, ZERO Latin copy, ZERO HUD/telemetry metadata.
 * 3. Non-textual geometric companions (quadrant brackets + scale medallion).
 * 4. Single-curve Camera Grammar per shot.
 * 5. Deterministic acoustic synchronization with Google Gemini-TTS master stem.
 */
export const ProofOfQualityV14: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* Shot 01: The Editorial Hook & Canonical Question (0 - 380f) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV14 />
      </Sequence>

      {/* Shot 02: The Official Statute Decree Monolith (350 - 540f) [30f T1 Carry Inflow Overlap] */}
      <Sequence from={350} durationInFrames={190}>
        <Shot02_DecreeV14 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
