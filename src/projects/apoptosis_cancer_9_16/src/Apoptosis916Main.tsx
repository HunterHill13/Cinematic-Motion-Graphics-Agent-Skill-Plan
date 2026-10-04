import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { ParticleDrift } from '../../../living-motion/ParticleDrift';
import { Grain } from '../../../effects/Grain';
import { Grade } from '../../../effects/Grade';
import { BgMesh } from '../../../effects/BgMesh';
import { Shot01CancerSurvival916 } from './Shot01_CancerSurvival916';
import { Shot02BH3Inhibition916 } from './Shot02_BH3Inhibition916';
import { Shot03MOMPPuncture916 } from './Shot03_MOMPPuncture916';
import { Shot04Apoptosome916 } from './Shot04_Apoptosome916';

export const Apoptosis916Main: React.FC = () => {
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: '#090d16',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* L6: Deep Environment Mesh & Floating Particle Drift */}
      <BgMesh />
      <ParticleDrift particleCount={45} width={1080} height={1920} driftSpeed={0.8} />

      {/* Shot 1: Cancer Survival & BCL-2 Shield (0 - 150 frames / 5s) */}
      <Sequence from={0} durationInFrames={150}>
        <Audio src={staticFile('shot_1.mp3')} volume={1.0} />
        <Shot01CancerSurvival916 />
      </Sequence>

      {/* Shot 2: BH3 Peptides Inhibit BCL-2 (150 - 360 frames / 7s) */}
      <Sequence from={150} durationInFrames={210}>
        <Audio src={staticFile('shot_2.mp3')} volume={1.0} />
        <Shot02BH3Inhibition916 />
      </Sequence>

      {/* Shot 3: MOMP Pore Rupture & Cytochrome c Release (360 - 600 frames / 8s) */}
      <Sequence from={360} durationInFrames={240}>
        <Audio src={staticFile('shot_3.mp3')} volume={1.0} />
        <Shot03MOMPPuncture916 />
      </Sequence>

      {/* Shot 4: Apoptosome Assembly & Caspase Execution (600 - 900 frames / 10s) */}
      <Sequence from={600} durationInFrames={300}>
        <Audio src={staticFile('shot_4.mp3')} volume={1.0} />
        <Shot04Apoptosome916 />
      </Sequence>

      {/* L7: Master Film Treatment Overlays */}
      <Grain opacity={0.05} />
      <Grade opacity={0.15} />
    </div>
  );
};
