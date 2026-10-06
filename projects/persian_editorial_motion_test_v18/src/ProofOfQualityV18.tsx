import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV18 } from './shots/Shot01_HookV18';
import { Shot02_DecreeV18 } from './shots/Shot02_DecreeV18';

/**
 * PROOF OF QUALITY V18 (HERO SHOT GATE)
 * Reference-Integrated, Content-Locked, Anti-Cliché Motion Engineering
 * Duration: 540 frames (18.0s @ 30 FPS)
 * 
 * Contains:
 * - Shot 01: Hook & Institutional Attribution (0 - 380f)
 *   Featuring TextMaskReveal, DotToLine, SequentialSwap for pristine Persian typography:
 *   «دانشگاه علوم پزشکی بقیه‌الله»
 *   Coupled with CANONICAL PRONUNCIATION (/bæqijjetolˈlɒːh/) in Master Audio
 * - Transition 01: Kinetic Underline Handoff (350 - 380f)
 * - Shot 02: Statute Decree Monolith (350 - 540f)
 * 
 * V18 Directorial Invariants:
 * 1. SEARCH BEFORE AUTHORING: Composed from V18 atomic recipes.
 * 2. DIAGNOSE BEFORE DECORATING: Clean spring physics; zero fake glow or frosted glass clutter.
 * 3. 100% Source-Authorized Persian Content (ADD SHAPE, NOT WORD).
 * 4. Master Audio references canonical EBU R128 stem mix with /bæqijjetolˈlɒːh/ lock.
 */
export const ProofOfQualityV18: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* Shot 01: The Editorial Hook & Institutional Attribution (0 - 380f) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV18 />
      </Sequence>

      {/* Shot 02: The Official Statute Decree Monolith (350 - 540f) [30f T1 Carry Inflow Overlap] */}
      <Sequence from={350} durationInFrames={190}>
        <Shot02_DecreeV18 />
      </Sequence>

      {/* V18 Master Audio Track with Canonical Pronunciation Lock */}
      <Audio src={staticFile('audio/persian_editorial_v17/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
