import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV15 } from './shots/Shot01_HookV15';
import { Shot02_DecreeV15 } from './shots/Shot02_DecreeV15';
import { Shot03_CriteriaV15 } from './shots/Shot03_CriteriaV15';
import { Shot04_TimeWindowV15 } from './shots/Shot04_TimeWindowV15';
import { Shot05_ThresholdsV15 } from './shots/Shot05_ThresholdsV15';
import { Shot06_OutroV15 } from './shots/Shot06_OutroV15';

/**
 * PERSIAN EDITORIAL MASTER V15
 * Director-Led, Content-Locked Reference-Driven Cinematic Motion System
 * 
 * Total Duration: 2361 frames (78.71s @ 30 FPS)
 * Resolution: 1920x1080 Landscape
 * Master Audio Stem: Google Gemini-TTS (public/audio/persian_editorial_v5_5/final_master_mix.wav)
 * 
 * Core Architectural Mandates:
 * 1. 100% of visible textual elements originate strictly from V15_CONTENT_MANIFEST.md.
 * 2. ZERO invented titles, ZERO English HUD labels, ZERO developer telemetry.
 * 3. 7-Layer complexity budget hierarchy (max 6 active layers per beat).
 * 4. Causal secondary reactions & subtle idle breathing micro-motion.
 * 5. Single-curve camera grammar per shot.
 * 6. Deterministic acoustic synchronization with 0-frame milestone convergence.
 * 7. OneTake carry continuity across all 5 shot boundaries (T1 - T5).
 */
export const PersianEditorialMasterV15: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      {/* SHOT 01: The Editorial Hook & Core Question (0 - 380f / 12.67s) */}
      <Sequence from={0} durationInFrames={380}>
        <Shot01_HookV15 />
      </Sequence>

      {/* SHOT 02: Statute & Official Regulation Decree (350 - 650f / 10.00s) [30f T1 Carry Inflow] */}
      <Sequence from={350} durationInFrames={300}>
        <Shot02_DecreeV15 />
      </Sequence>

      {/* SHOT 03: Tripartite Prerequisite Criteria Diagram (620 - 1480f / 28.67s) [30f T2 Carry Inflow] */}
      <Sequence from={620} durationInFrames={860}>
        <Shot03_CriteriaV15 />
      </Sequence>

      {/* SHOT 04: Temporal Cutoff Window & Educational Deadlines (1450 - 1730f / 9.33s) [30f T3 Carry Inflow] */}
      <Sequence from={1450} durationInFrames={280}>
        <Shot04_TimeWindowV15 />
      </Sequence>

      {/* SHOT 05: Academic Degree Score Threshold Pedestals (1700 - 2185f / 16.17s) [30f T4 Carry Inflow] */}
      <Sequence from={1700} durationInFrames={485}>
        <Shot05_ThresholdsV15 />
      </Sequence>

      {/* SHOT 06: Grand Institutional Outro & Series Continuation (2155 - 2361f / 6.87s) [30f T5 Carry Inflow] */}
      <Sequence from={2155} durationInFrames={206}>
        <Shot06_OutroV15 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking */}
      <Audio src={staticFile('audio/persian_editorial_v5_5/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
