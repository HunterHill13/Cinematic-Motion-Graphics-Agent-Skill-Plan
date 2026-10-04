import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { PageCam2D, CamKey2D } from './camera/PageCam2D';
import { Shot1_MinisterialDecree } from './shots/Shot1_MinisterialDecree';
import { Shot2_ScoreGauges } from './shots/Shot2_ScoreGauges';
import { Shot3_LineCarryPillars } from './shots/Shot3_LineCarryPillars';

const CAM_KEYS: CamKey2D[] = [
  // Shot 1: Solemn forward drift into the ministerial seal
  { frame: 0, cx: 960, cy: 540, zoom: 0.96, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 160, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 180, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },

  // Shot 2: Subtle editorial perspective hold on the four dials
  { frame: 200, cx: 960, cy: 540, zoom: 1.0, rotX: 1, rotY: -2, persp: 1400 },
  { frame: 340, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 1, persp: 1400 },
  { frame: 360, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1400 },

  // Shot 3: Steady track framing the 4 evaluation pillars
  { frame: 380, cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0, persp: 1300 },
  { frame: 540, cx: 960, cy: 540, zoom: 1.02, rotX: 0, rotY: 0, persp: 1300 },
];

export const ProofOfQualityV4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050814' }}>
      {/* 2.5D Camera Space */}
      <PageCam2D keys={CAM_KEYS} bg="#050814">
        {/* Shot 1: Ministerial Decree (0–180f = 0–6s) */}
        <Sequence from={0} durationInFrames={180}>
          <Shot1_MinisterialDecree />
        </Sequence>

        {/* Shot 2: Score Gauges Sweep (180–360f = 6–12s) */}
        <Sequence from={180} durationInFrames={180}>
          <Shot2_ScoreGauges />
        </Sequence>

        {/* Shot 3: Line-Carried Transition & The Four Pillars (360–540f = 12–18s) */}
        <Sequence from={360} durationInFrames={180}>
          <Shot3_LineCarryPillars />
        </Sequence>
      </PageCam2D>

      {/* Synchronized Audio Stem Mix (Voice + Ducked Pulse Score + Foley SFX) */}
      <Audio src={staticFile('audio/persian_editorial_v4/final_mix_proof.wav')} />
    </AbsoluteFill>
  );
};
