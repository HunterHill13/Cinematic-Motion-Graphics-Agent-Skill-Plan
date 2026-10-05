import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV13 } from './shots/Shot01_HookV13';
import { Shot02_DecreeV13 } from './shots/Shot02_DecreeV13';

/**
 * PROOF OF QUALITY V13 (HERO SHOT GATE)
 * Duration: 540 frames (18.0s @ 30 FPS)
 * Contains:
 * - Shot 01: Hook & Canonical Question (0 - 380f)
 * - Transition 01: Kinetic Underline Handoff (350 - 380f)
 * - Shot 02: Statute Decree Monolith (350 - 540f)
 * Invariants:
 * 1. Single-curve Camera Grammar per shot.
 * 2. Visual companion anchoring for every textual statement.
 * 3. 100% pure Persian broadcast typography (Zero English / Zero HUD telemetry).
 * 4. Deterministic acoustic synchronization with Google Gemini-TTS master stem.
 */
export const ProofOfQualityV13: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* Shot 01: The Editorial Hook & Canonical Question (0 - 380f) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV13 />
      </Sequence>

      {/* Shot 02: The Official Statute Decree Monolith (350 - 540f) [30f T1 Carry Inflow Overlap] */}
      <Sequence from={350} durationInFrames={190}>
        <Shot02_DecreeV13 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
