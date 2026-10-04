import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { PageCam2D, CamKey2D } from './camera/PageCam2D';
import { Shot1_MinisterialDecree } from './shots/Shot1_MinisterialDecree';
import { Shot2_ScoreGauges } from './shots/Shot2_ScoreGauges';
import { Shot3_LineCarryPillars } from './shots/Shot3_LineCarryPillars';
import { Shot4_PaperEvaluation } from './shots/Shot4_PaperEvaluation';
import { Shot5_EthicsGate } from './shots/Shot5_EthicsGate';
import { Shot6_CandidateSwarm } from './shots/Shot6_CandidateSwarm';
import { Shot7_GrandAssembly } from './shots/Shot7_GrandAssembly';

const MASTER_CAM_KEYS: CamKey2D[] = [
  // Shot 1 (0–180): Slow solemn drift into ministerial seal
  { frame: 0, cx: 960, cy: 540, zoom: 0.96, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 180, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 2 (180–360): Editorial perspective hold on dials
  { frame: 200, cx: 960, cy: 540, zoom: 1.0, rotX: 1, rotY: -2, persp: 1400 },
  { frame: 340, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 1, persp: 1400 },
  { frame: 360, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3 (360–540): Tracking line carry and 4 pillars framing
  { frame: 380, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 540, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 4 (540–960): Oscilloscope scientific stream track
  { frame: 560, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 940, cx: 960, cy: 540, zoom: 1.03, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 5 (960–1440): Ethics gate perspective focus
  { frame: 980, cx: 960, cy: 540, zoom: 1.0, rotX: 1, rotY: 2, persp: 1400 },
  { frame: 1420, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 6 (1440–1980): National candidate distribution swarm
  { frame: 1460, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 1960, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 7 (1980–2500): Grand assembly and institutional sign-off hold
  { frame: 2000, cx: 960, cy: 540, zoom: 0.97, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 2500, cx: 960, cy: 540, zoom: 1.03, rotX: 0, rotY: 0, persp: 1300 },
];

export const PersianEditorialMasterV4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050814' }}>
      {/* 2.5D Multiplane Camera Space */}
      <PageCam2D keys={MASTER_CAM_KEYS} bg="#050814">
        {/* Shot 1: Ministerial Decree (0–180f = 6.0s) */}
        <Sequence from={0} durationInFrames={180}>
          <Shot1_MinisterialDecree />
        </Sequence>

        {/* Shot 2: Score Gauges (180–360f = 6.0s) */}
        <Sequence from={180} durationInFrames={180}>
          <Shot2_ScoreGauges />
        </Sequence>

        {/* Shot 3: Line-Carried Pillars (360–540f = 6.0s) */}
        <Sequence from={360} durationInFrames={180}>
          <Shot3_LineCarryPillars />
        </Sequence>

        {/* Shot 4: Paper Evaluation & Quartiles (540–960f = 14.0s) */}
        <Sequence from={540} durationInFrames={420}>
          <Shot4_PaperEvaluation />
        </Sequence>

        {/* Shot 5: Ethics Gate & Compliance (960–1440f = 16.0s) */}
        <Sequence from={960} durationInFrames={480}>
          <Shot5_EthicsGate />
        </Sequence>

        {/* Shot 6: Candidate Swarm & National Funnel (1440–1980f = 18.0s) */}
        <Sequence from={1440} durationInFrames={540}>
          <Shot6_CandidateSwarm />
        </Sequence>

        {/* Shot 7: Grand Assembly & Institutional Sign-off (1980–2500f = 17.33s) */}
        <Sequence from={1980} durationInFrames={520}>
          <Shot7_GrandAssembly />
        </Sequence>
      </PageCam2D>

      {/* Full Master Audio Stem Mix */}
      <Audio src={staticFile('audio/persian_editorial_v4/final_master_mix.wav')} />
    </AbsoluteFill>
  );
};
