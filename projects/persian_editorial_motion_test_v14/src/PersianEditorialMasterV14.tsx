import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV14 } from './shots/Shot01_HookV14';
import { Shot02_DecreeV14 } from './shots/Shot02_DecreeV14';
import { Shot03_CriteriaV14 } from './shots/Shot03_CriteriaV14';
import { Shot04_TimeWindowV14 } from './shots/Shot04_TimeWindowV14';
import { Shot05_ThresholdsV14 } from './shots/Shot05_ThresholdsV14';
import { Shot06_OutroV14 } from './shots/Shot06_OutroV14';

/**
 * PERSIAN EDITORIAL MASTER V14
 * Content-Locked Reference-Driven Cinematic Motion System
 * 
 * Total Duration: 2361 frames (78.71s @ 30 FPS)
 * Resolution: 1920x1080 Landscape
 * Master Audio Stem: Google Gemini-TTS (public/audio/persian_editorial_v5_5/final_master_mix.wav)
 * 
 * Strict Content Authority Invariants:
 * 1. 100% of visible textual elements originate from V14_CONTENT_MANIFEST.md.
 * 2. ZERO invented titles, ZERO English HUD labels, ZERO developer telemetry.
 * 3. Non-textual visual companions anchoring every textual statement.
 * 4. Single-curve camera grammar per shot.
 * 5. Deterministic acoustic synchronization with 0-frame milestone convergence.
 * 6. High-order carry continuity across all 5 shot boundaries (T1 - T5).
 */
export const PersianEditorialMasterV14: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* SHOT 01: The Editorial Hook & Core Question (0 - 380f / 12.67s) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV14 />
      </Sequence>

      {/* SHOT 02: Statute & Official Regulation Decree (350 - 650f / 10.00s) [30f T1 Carry Inflow] */}
      <Sequence from={350} durationInFrames={300}>
        <Shot02_DecreeV14 />
      </Sequence>

      {/* SHOT 03: Tripartite Prerequisite Criteria Diagram (620 - 1480f / 28.67s) [30f T2 Carry Inflow] */}
      <Sequence from={620} durationInFrames={860}>
        <Shot03_CriteriaV14 />
      </Sequence>

      {/* SHOT 04: Temporal Cutoff Window & Educational Deadlines (1450 - 1730f / 9.33s) [30f T3 Carry Inflow] */}
      <Sequence from={1450} durationInFrames={280}>
        <Shot04_TimeWindowV14 />
      </Sequence>

      {/* SHOT 05: Academic Degree Score Threshold Pedestals (1700 - 2185f / 16.17s) [30f T4 Carry Inflow] */}
      <Sequence from={1700} durationInFrames={485}>
        <Shot05_ThresholdsV14 />
      </Sequence>

      {/* SHOT 06: Grand Institutional Outro & Series Continuation (2155 - 2361f / 6.87s) [30f T5 Carry Inflow] */}
      <Sequence from={2155} durationInFrames={206}>
        <Shot06_OutroV14 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
