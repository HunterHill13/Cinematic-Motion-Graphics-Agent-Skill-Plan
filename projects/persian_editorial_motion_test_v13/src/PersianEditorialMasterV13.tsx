import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV13 } from './shots/Shot01_HookV13';
import { Shot02_DecreeV13 } from './shots/Shot02_DecreeV13';
import { Shot03_CriteriaV13 } from './shots/Shot03_CriteriaV13';
import { Shot04_TimeWindowV13 } from './shots/Shot04_TimeWindowV13';
import { Shot05_ThresholdsV13 } from './shots/Shot05_ThresholdsV13';
import { Shot06_OutroV13 } from './shots/Shot06_OutroV13';

/**
 * PERSIAN EDITORIAL MASTER V13
 * Total Duration: 2361 frames (78.71s @ 30 FPS)
 * 
 * Invariants:
 * 1. Reference-Driven Shot Library Selection Engine (8 categories, typed recipes).
 * 2. Dedicated Single-Curve Camera Grammar Rig per shot.
 * 3. Functional Visual Companions anchoring every textual claim (Anti-Naked Text).
 * 4. Multi-Level Carry Transitions across all 5 shot boundaries (Average score >= 0.75).
 * 5. 100% Pure Persian Script typography (Zero English HUD labels, telemetry, or debug strings).
 * 6. Deterministic 24/24 audio synchronization with Google Gemini-TTS master narration stem.
 * 7. Broadcast Full HD 1920x1080 @ 30 FPS.
 */
export const PersianEditorialMasterV13: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* Shot 01: Prologue & Editorial Hook (0 - 380f / 12.67s) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV13 />
      </Sequence>

      {/* Shot 02: Statute Decree Monolith (350 - 650f / 10.00s) [30f T1 Carry Inflow Overlap] */}
      <Sequence from={350} durationInFrames={300}>
        <Shot02_DecreeV13 />
      </Sequence>

      {/* Shot 03: Three Prerequisite Criteria (620 - 1480f / 28.67s) [30f T2 Carry Inflow Overlap] */}
      <Sequence from={620} durationInFrames={860}>
        <Shot03_CriteriaV13 />
      </Sequence>

      {/* Shot 04: Temporal Window & Cutoff Calendar (1450 - 1730f / 9.33s) [30f T3 Carry Inflow Overlap] */}
      <Sequence from={1450} durationInFrames={280}>
        <Shot04_TimeWindowV13 />
      </Sequence>

      {/* Shot 05: Academic Degree Score Threshold Pedestals (1700 - 2185f / 16.17s) [30f T4 Carry Inflow Overlap] */}
      <Sequence from={1700} durationInFrames={485}>
        <Shot05_ThresholdsV13 />
      </Sequence>

      {/* Shot 06: Grand Institutional Seal Outro (2155 - 2361f / 6.87s) [30f T5 Carry Inflow Overlap] */}
      <Sequence from={2155} durationInFrames={206}>
        <Shot06_OutroV13 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
