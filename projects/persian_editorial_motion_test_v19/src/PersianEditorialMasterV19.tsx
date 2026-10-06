import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Shot01_HookV19 } from './shots/Shot01_HookV19';
import { Shot02_DecreeV19 } from './shots/Shot02_DecreeV19';
import { Shot03_CriteriaV19 } from './shots/Shot03_CriteriaV19';
import { Shot04_TimeWindowV19 } from './shots/Shot04_TimeWindowV19';
import { Shot05_ThresholdsV19 } from './shots/Shot05_ThresholdsV19';
import { Shot06_OutroV19 } from './shots/Shot06_OutroV19';

/**
 * PERSIAN EDITORIAL MASTER V19
 * True Motion Graphics Transformation: Time-Based Graphic Choreography
 * 
 * Total Duration: 2361 frames (78.70s @ 30 FPS)
 * Resolution: 1920x1080 Landscape Broadcast
 * Master Audio Stem: Canonical Master Mix with Guaranteed «بقیه‌الله» Pronunciation Lock
 * 
 * V19 Core Invariants:
 * 1. HARD BAN on Web/UI Visual Language (zero cards, zero sliders, zero dashboard charts).
 * 2. CANVAS-FIRST STAGING: 1920x1080 full-frame active composition with architectural coordinates.
 * 3. TRUE TRANSFORMATION: A becomes B (physical continuous deformation, zero unmotivated fades).
 * 4. DIFFERENTIATED MOTION PERSONALITIES: IMPACT, ELASTIC, GLIDE, BUILD, HOLD, RELEASE.
 * 5. SEAMLESS TRANSITIONS: Zero accidental black frames across shot boundaries.
 * 6. 100% CONTENT LOCK: All text strictly sourced from AUTHORIZED_CONTENT.
 */
export const PersianEditorialMasterV19: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#06080E' }}>
      {/* SHOT 01: The Editorial Hook & Core Question (0 - 380f / 12.67s) */}
      <Sequence from={0} durationInFrames={380} name="Shot01_Hook">
        <Shot01_HookV19 />
      </Sequence>

      {/* SHOT 02: Statute & Official Regulation Decree (350 - 650f / 10.00s) [30f T1 Carry Inflow] */}
      <Sequence from={350} durationInFrames={300} name="Shot02_Decree">
        <Shot02_DecreeV19 />
      </Sequence>

      {/* SHOT 03: Tripartite Prerequisite Criteria (620 - 1480f / 28.67s) [30f T2 Carry Inflow] */}
      <Sequence from={620} durationInFrames={860} name="Shot03_Criteria">
        <Shot03_CriteriaV19 />
      </Sequence>

      {/* SHOT 04: Temporal Cutoff Window & Legal Deadlines (1450 - 1730f / 9.33s) [30f T3 Carry Inflow] */}
      <Sequence from={1450} durationInFrames={280} name="Shot04_TimeWindow">
        <Shot04_TimeWindowV19 />
      </Sequence>

      {/* SHOT 05: Academic Degree Score Thresholds (1700 - 2185f / 16.17s) [30f T4 Carry Inflow] */}
      <Sequence from={1700} durationInFrames={485} name="Shot05_Thresholds">
        <Shot05_ThresholdsV19 />
      </Sequence>

      {/* SHOT 06: Grand Institutional Outro & Continuation (2155 - 2361f / 6.87s) [30f T5 Carry Inflow] */}
      <Sequence from={2155} durationInFrames={206} name="Shot06_Outro">
        <Shot06_OutroV19 />
      </Sequence>

      {/* Master Audio Track with Automated -14dB Sidechain Ducking & Canonical Pronunciation Lock */}
      <Audio src={staticFile('audio/persian_editorial_v17/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
