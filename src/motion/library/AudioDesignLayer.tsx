/**
 * ============================================================================
 * AUDIO DESIGN LAYER (CLAUDE OPUS 5.5 GRADE SOUND DESIGN)
 * ============================================================================
 * 
 * Synchronizes background music (BGM) and precise sound effects (SFX) to
 * the exact visual transients and camera whip-pans of the Remotion timeline.
 * 
 * Features:
 * 1. Background Music: Continuous scientific ambient pulse with automated
 *    fade-in, volume ducking, and fade-out.
 * 2. Transitional SFX: High-frequency whooshes, click ripples, and sub-bass impacts
 *    locked to exact frame boundaries via Remotion's <Sequence> and <Audio>.
 * ============================================================================
 */

import React from 'react';
import { Audio, Sequence, staticFile, interpolate, useCurrentFrame } from 'remotion';

export interface AudioDesignLayerProps {
  durationInFrames?: number;
  bgmVolume?: number;
}

export const AudioDesignLayer: React.FC<AudioDesignLayerProps> = ({
  durationInFrames = 450,
  bgmVolume = 0.28,
}) => {
  const frame = useCurrentFrame();

  // BGM Volume Envelope: Fade In (0..30), Duck slightly during macro morph (95..220), Fade Out (420..450)
  const currentBgmVolume = interpolate(
    frame,
    [0, 30, 95, 120, 210, 240, 410, 450],
    [0, bgmVolume, bgmVolume * 0.75, bgmVolume * 0.75, bgmVolume, bgmVolume, bgmVolume, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* 1. CONTINUOUS SCIENTIFIC AMBIENT BACKGROUND MUSIC */}
      <Audio
        src={staticFile('music/scientific_ambient_pulse.wav')}
        volume={() => currentBgmVolume}
      />

      {/* 2. SFX EVENT 1: Act 1 -> Act 2 Camera Whip & Cursor Dive (Frame 90) */}
      <Sequence from={90} durationInFrames={45}>
        <Audio
          src={staticFile('sfx/whoosh-fast.mp3')}
          volume={0.65}
        />
      </Sequence>

      {/* 3. SFX EVENT 2: Cursor Button Click & Morph Initiation (Frame 98) */}
      <Sequence from={98} durationInFrames={40}>
        <Audio
          src={staticFile('sfx/transition-soft.mp3')}
          volume={0.85}
        />
      </Sequence>

      {/* 4. SFX EVENT 3: Act 2 -> Act 3 2.5D Isometric Tilt Transition (Frame 210) */}
      <Sequence from={210} durationInFrames={45}>
        <Audio
          src={staticFile('sfx/whoosh-fast.mp3')}
          volume={0.6}
        />
      </Sequence>

      {/* 5. SFX EVENT 4: Act 3 -> Act 4 Wide Pull-Back Dolly Arc (Frame 325) */}
      <Sequence from={325} durationInFrames={45}>
        <Audio
          src={staticFile('sfx/impact-transition.mp3')}
          volume={0.55}
        />
      </Sequence>

      {/* 6. SFX EVENT 5: Act 4 Climax 100% Sovereign Calibration Gauge Lock (Frame 405) */}
      <Sequence from={405} durationInFrames={45}>
        <Audio
          src={staticFile('sfx/bass-hit-futuristic.mp3')}
          volume={0.9}
        />
      </Sequence>
    </>
  );
};
