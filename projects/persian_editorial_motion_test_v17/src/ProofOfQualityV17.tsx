import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV17 } from './shots/Shot01_HookV17';
import { Shot02_DecreeV17 } from './shots/Shot02_DecreeV17';

/**
 * PROOF OF QUALITY V17 (HERO SHOT GATE)
 * Audio Reliability, Pronunciation Lock & Prosody-Driven Cinematic Polish
 * Duration: 540 frames (18.0s @ 30 FPS)
 * 
 * Contains:
 * - Shot 01: Hook & Institutional Attribution (0 - 380f)
 *   Featuring pristine Persian typography for «دانشگاه علوم پزشکی بقیه‌الله»
 *   Coupled with CANONICAL PRONUNCIATION (/bæqijjetolˈlɒːh/) in Master Audio
 * - Transition 01: Kinetic Underline Handoff (350 - 380f)
 * - Shot 02: Statute Decree Monolith (350 - 540f)
 * 
 * V17 Directorial Invariants:
 * 1. DISPLAY TEXT ≠ TTS TEXT ≠ FINAL AUDIO (3 independent validation layers).
 * 2. 100% Source-Authorized Persian Content (ADD SHAPE, NOT WORD).
 * 3. Prosody-Driven Motion: Anticipation pre-motion & settle damping tuned to narrator delivery.
 * 4. Master Audio references V17 canonical ducked broadcast stem.
 */
export const ProofOfQualityV17: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* Shot 01: The Editorial Hook & Institutional Attribution (0 - 380f) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV17 />
      </Sequence>

      {/* Shot 02: The Official Statute Decree Monolith (350 - 540f) [30f T1 Carry Inflow Overlap] */}
      <Sequence from={350} durationInFrames={190}>
        <Shot02_DecreeV17 />
      </Sequence>

      {/* V17 Master Audio Track with Canonical Pronunciation Lock */}
      <Audio src={staticFile('audio/persian_editorial_v17/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
