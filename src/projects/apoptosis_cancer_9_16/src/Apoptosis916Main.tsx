import React from 'react';
import { Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { ParticleDrift } from '../../../living-motion/ParticleDrift';
import { Grain } from '../../../effects/Grain';
import { Grade } from '../../../effects/Grade';
import { BgMesh } from '../../../effects/BgMesh';
import { Shot01CancerSurvival916 } from './Shot01_CancerSurvival916';
import { Shot02BH3Inhibition916 } from './Shot02_BH3Inhibition916';
import { Shot03MOMPPuncture916 } from './Shot03_MOMPPuncture916';
import { Shot04Apoptosome916 } from './Shot04_Apoptosome916';

/**
 * v2.2 Apoptosis Master Composition (9:16 Vertical - 1080x1920 @ 30 FPS)
 *
 * Implements:
 * 1. Unified Master Audio Track (Continuous Persian Narration + Ambient Science Music + SFX)
 * 2. Official Remotion TransitionSeries (Eliminates all hard cuts via smooth fade and slide transitions)
 * 3. Living Motion continuous background and breathing micro-dynamics
 */
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
      {/* 1. Unified Continuous Master Audio Stream */}
      <Audio src={staticFile('audio/final_master_mix.mp3')} volume={1.0} />

      {/* 2. Deep Living Environment Mesh & Brownian Particle Field */}
      <BgMesh />
      <ParticleDrift particleCount={45} width={1080} height={1920} driftSpeed={0.8} />

      {/* 3. Official Remotion TransitionSeries (No hard cuts between scenes) */}
      <TransitionSeries>
        {/* Scene 1: Cancer Cell Survival & BCL-2 Shield (225 frames ~ 7.5s) */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <Shot01CancerSurvival916 />
        </TransitionSeries.Sequence>

        {/* Transition 1 -> 2: Smooth Cinematic Crossfade (18 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />

        {/* Scene 2: Targeted Inhibition via BH3 Mimetics (240 frames ~ 8.0s) */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Shot02BH3Inhibition916 />
        </TransitionSeries.Sequence>

        {/* Transition 2 -> 3: Directional Slide Wipe from Bottom (20 frames) */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        {/* Scene 3: MOMP Pore Rupture & Cytochrome c Release (240 frames ~ 8.0s) */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Shot03MOMPPuncture916 />
        </TransitionSeries.Sequence>

        {/* Transition 3 -> 4: Soft Dissolve into Execution Core (18 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />

        {/* Scene 4: Apoptosome Wheel Assembly & Execution (251 frames ~ 8.3s) */}
        <TransitionSeries.Sequence durationInFrames={251}>
          <Shot04Apoptosome916 />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* 4. Master Film Overlays */}
      <Grain opacity={0.05} />
      <Grade opacity={0.15} />
    </div>
  );
};
