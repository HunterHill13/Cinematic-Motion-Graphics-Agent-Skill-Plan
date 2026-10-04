import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { EditorialCamera, CamKey2D } from './motion/camera';
import { Shot01_Hook } from './shots/01_hook/Shot01_Hook';
import { Shot02_Problem } from './shots/02_problem/Shot02_Problem';
import { Shot03_Concept } from './shots/03_concept/Shot03_Concept';
import { Shot04_Data } from './shots/04_data/Shot04_Data';
import { Shot05_Comparison } from './shots/05_comparison/Shot05_Comparison';
import { Shot06_Funnel } from './shots/06_funnel/Shot06_Funnel';
import { Shot07_Conclusion } from './shots/07_conclusion/Shot07_Conclusion';

const MASTER_CAM_KEYS_V51: CamKey2D[] = [
  // Shot 1: Ministerial Decree (0–180f): Slow majestic hold and subtle push
  { frame: 0, cx: 960, cy: 540, zoom: 0.96, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 180, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 2: Score Gauges (180–360f): Dynamic focus across thresholds
  { frame: 200, cx: 960, cy: 540, zoom: 1.0, rotX: 1, rotY: -2, persp: 1400 },
  { frame: 340, cx: 960, cy: 540, zoom: 1.01, rotX: 0, rotY: 1, persp: 1400 },
  { frame: 360, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3: 4 Pillars Quadrant (360–540f): Tracking morph from horizontal line
  { frame: 380, cx: 960, cy: 540, zoom: 0.98, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 540, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 4: Paper Evaluation & Quartiles (540–960f): Oscilloscope pulse tracking
  { frame: 560, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 940, cx: 960, cy: 540, zoom: 1.03, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 5: Ethics Gate & Iris Seal (960–1440f): Security lock and perspective tilt
  { frame: 980, cx: 960, cy: 540, zoom: 1.0, rotX: 1, rotY: 2, persp: 1400 },
  { frame: 1420, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6: Candidate Funnel (1440–1980f): Particle swarm funneling to podium
  { frame: 1460, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 1960, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 7: Grand Assembly & Crest (1980–2500f): Majestic institutional hold
  { frame: 2000, cx: 960, cy: 540, zoom: 0.97, rotX: 0, rotY: 0, persp: 1400 },
  { frame: 2500, cx: 960, cy: 540, zoom: 1.03, rotX: 0, rotY: 0, persp: 1400 },
];

export const PersianEditorialMasterV51: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#040711' }}>
      {/* 2.5D Multiplane Editorial Camera */}
      <EditorialCamera keys={MASTER_CAM_KEYS_V51} bg="#040711">
        {/* Shot 1: Ministerial Decree (0–180f = 6.0s) */}
        <Sequence from={0} durationInFrames={180}>
          <Shot01_Hook />
        </Sequence>

        {/* Shot 2: Score Gauges (180–360f = 6.0s) */}
        <Sequence from={180} durationInFrames={180}>
          <Shot02_Problem />
        </Sequence>

        {/* Shot 3: Line-Carried 4 Pillars (360–540f = 6.0s) */}
        <Sequence from={360} durationInFrames={180}>
          <Shot03_Concept />
        </Sequence>

        {/* Shot 4: Paper Evaluation & Quartiles (540–960f = 14.0s) */}
        <Sequence from={540} durationInFrames={420}>
          <Shot04_Data />
        </Sequence>

        {/* Shot 5: Ethics Gate & Iris Seal (960–1440f = 16.0s) */}
        <Sequence from={960} durationInFrames={480}>
          <Shot05_Comparison />
        </Sequence>

        {/* Shot 6: Candidate Swarm & Funnel (1440–1980f = 18.0s) */}
        <Sequence from={1440} durationInFrames={540}>
          <Shot06_Funnel />
        </Sequence>

        {/* Shot 7: Grand Assembly & Institutional Crest (1980–2500f = 17.33s) */}
        <Sequence from={1980} durationInFrames={520}>
          <Shot07_Conclusion />
        </Sequence>
      </EditorialCamera>

      {/* Manifest-Driven Master Audio Mix (-14dB ducking, mastered stem mix) */}
      <Audio src={staticFile('audio/persian_editorial_v5_1/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
