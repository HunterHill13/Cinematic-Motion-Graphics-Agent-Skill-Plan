import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV16 } from './shots/Shot01_HookV16';
import { Shot02_DecreeV16 } from './shots/Shot02_DecreeV16';

/**
 * PROOF OF QUALITY V16 (HERO SHOT GATE)
 * Deterministic Pronunciation Pipeline & Cinematic Polish
 * Duration: 540 frames (18.0s @ 30 FPS)
 * 
 * Contains:
 * - Shot 01: Hook & Institutional Attribution (0 - 380f)
 *   Featuring pristine Persian typography for «دانشگاه علوم پزشکی بقیه‌الله»
 * - Transition 01: Kinetic Underline Handoff (350 - 380f)
 * - Shot 02: Statute Decree Monolith (350 - 540f)
 * 
 * V16 Directorial Invariants:
 * 1. DISPLAY TEXT ≠ TTS TEXT.
 * 2. 100% Source-Authorized Persian Content.
 * 3. ZERO invented phrases, ZERO Latin copy, ZERO HUD/telemetry metadata.
 * 4. 7-Layer budget hierarchy (max 6 active layers).
 * 5. Causal secondary reactions & subtle idle breathing micro-motion.
 * 6. Single-curve continuous camera grammar per shot.
 * 7. Rock-solid acoustic synchronization with master audio mix.
 */
export const ProofOfQualityV16: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* Shot 01: The Editorial Hook & Institutional Attribution (0 - 380f) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV16 />
      </Sequence>

      {/* Shot 02: The Official Statute Decree Monolith (350 - 540f) [30f T1 Carry Inflow Overlap] */}
      <Sequence from={350} durationInFrames={190}>
        <Shot02_DecreeV16 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
