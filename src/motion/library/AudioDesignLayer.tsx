/**
 * ============================================================================
 * AUDIO DESIGN LAYER (CLAUDE OPUS 5.5 GRADE SOUND DESIGN)
 * ============================================================================
 * 
 * Synchronizes studio-grade background music (Modern Minimal Tech / Future Beats)
 * and standardized studio sound effects (@remotion/sfx + Kenney UI Audio)
 * to the exact visual transients, cursor interactions, and camera whip-pans.
 * 
 * Principles:
 * 1. Studio BGM: Real rhythmic electronic/synth production with percussion.
 * 2. Pre-Roll Micro-timing: Whooshes and whips start 4-5 frames BEFORE visual
 *    climax so the audio transient apex aligns 100% with the visual cut.
 * 3. Sidechain Ducking: BGM volume smoothly ducks by 40% during transients
 *    and UI interactions, ensuring clean clarity without mud or clipping.
 * 4. Standardized CC0 Audio: Pristine normalized WAV assets (-3dB).
 * ============================================================================
 */

import React from 'react';
import { Audio, Sequence, staticFile, interpolate, useCurrentFrame } from 'remotion';

export type MusicTrackOption = 'brain_dance' | 'tech_live' | 'cipher';

export interface AudioDesignLayerProps {
  durationInFrames?: number;
  bgmVolume?: number;
  track?: MusicTrackOption;
}

const TRACK_FILES: Record<MusicTrackOption, string> = {
  brain_dance: 'music/Brain_Dance.mp3',
  tech_live: 'music/Tech_Live.mp3',
  cipher: 'music/Cipher2.mp3',
};

export const AudioDesignLayer: React.FC<AudioDesignLayerProps> = ({
  durationInFrames = 450,
  bgmVolume = 0.32,
  track = 'brain_dance',
}) => {
  const frame = useCurrentFrame();

  // Dynamic Sidechain Ducking Envelope:
  // - Smooth Fade-in: 0..25 frames
  // - Duck 1 (Frame 90..115): Cursor click & Dutch whip transition -> duck to 60%
  // - Duck 2 (Frame 205..225): 2.5D Isometric card matrix transition -> duck to 65%
  // - Duck 3 (Frame 230..250): 100% Sovereign Calibration Ding -> duck to 55%
  // - Duck 4 (Frame 318..340): Panoramic wide camera pullback & shutter -> duck to 60%
  // - Smooth Fade-out: 415..450 frames
  const currentBgmVolume = interpolate(
    frame,
    [
      0, 25,
      90, 95, 115, 125,
      205, 212, 225, 230,
      232, 238, 250, 260,
      318, 325, 340, 350,
      415, 450
    ],
    [
      0, bgmVolume,
      bgmVolume, bgmVolume * 0.60, bgmVolume * 0.60, bgmVolume,
      bgmVolume, bgmVolume * 0.65, bgmVolume * 0.65, bgmVolume,
      bgmVolume, bgmVolume * 0.55, bgmVolume * 0.55, bgmVolume,
      bgmVolume, bgmVolume * 0.60, bgmVolume * 0.60, bgmVolume,
      bgmVolume, 0
    ],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const selectedTrackSrc = staticFile(TRACK_FILES[track] || TRACK_FILES.brain_dance);

  return (
    <>
      {/* 1. STUDIO-GRADE MODERN MINIMAL TECH / FUTURE BEATS BACKGROUND MUSIC */}
      <Audio
        src={selectedTrackSrc}
        volume={() => currentBgmVolume}
      />

      {/* 2. SFX EVENT 1: Tactile Cursor Click (Kenney UI Sound) - Frame 94 */}
      <Sequence from={94} durationInFrames={30}>
        <Audio
          src={staticFile('sfx/kenney_mouseclick.wav')}
          volume={0.9}
        />
      </Sequence>

      {/* 3. SFX EVENT 2: Act 1 -> Act 2 Camera Whip & Morph Pre-roll - Frame 97 */}
      {/* Starts 5 frames before frame 102 peak so audio apex matches visual cut */}
      <Sequence from={97} durationInFrames={40}>
        <Audio
          src={staticFile('sfx/remotion_whip.wav')}
          volume={0.75}
        />
      </Sequence>

      {/* 4. SFX EVENT 3: Act 2 -> Act 3 2.5D Isometric Tilt Pre-roll - Frame 208 */}
      {/* Remotion Whoosh pre-roll into frame 212 spatial tilt */}
      <Sequence from={208} durationInFrames={45}>
        <Audio
          src={staticFile('sfx/remotion_whoosh.wav')}
          volume={0.7}
        />
      </Sequence>

      {/* 5. SFX EVENT 4: Act 3 Climax 100% Sovereign Calibration Lock - Frame 234 */}
      {/* Remotion Studio Ding chime indicating calibration success */}
      <Sequence from={234} durationInFrames={60}>
        <Audio
          src={staticFile('sfx/remotion_ding.wav')}
          volume={0.85}
        />
      </Sequence>

      {/* 6. SFX EVENT 5: Act 3 -> Act 4 Wide Panoramic Dolly & Optical Shutter - Frame 322 */}
      {/* Remotion Modern Camera Shutter + Air Whoosh */}
      <Sequence from={322} durationInFrames={45}>
        <Audio
          src={staticFile('sfx/remotion_shutter.wav')}
          volume={0.8}
        />
      </Sequence>
      <Sequence from={324} durationInFrames={40}>
        <Audio
          src={staticFile('sfx/remotion_whoosh.wav')}
          volume={0.65}
        />
      </Sequence>
    </>
  );
};
