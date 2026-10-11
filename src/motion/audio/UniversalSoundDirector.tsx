import React from 'react';
import { Audio, Sequence, staticFile, interpolate, useCurrentFrame } from 'remotion';

export interface SfxCue {
  frame: number;
  type: 'whoosh' | 'impact' | 'click' | 'riser' | 'chime';
  volume?: number;
}

export interface UniversalSoundDirectorProps {
  bgmTrack?: string;
  bgmVolume?: number;
  voiceTrack?: string;
  voiceVolume?: number;
  sfxCues?: SfxCue[];
  duckingRanges?: Array<{ start: number; end: number; depth?: number }>;
}

export const UniversalSoundDirector: React.FC<UniversalSoundDirectorProps> = ({
  bgmTrack = 'music/Tech_Live.mp3',
  bgmVolume = 0.18,
  voiceTrack,
  voiceVolume = 1.0,
  sfxCues = [],
  duckingRanges = [],
}) => {
  const frame = useCurrentFrame();

  // Compute dynamic sidechain ducking volume
  let dynamicBgmVolume = bgmVolume;
  for (const range of duckingRanges) {
    if (frame >= range.start - 10 && frame <= range.end + 15) {
      const depth = range.depth ?? 0.45; // Duck to 45% of base volume
      const ducked = interpolate(
        frame,
        [range.start - 10, range.start, range.end, range.end + 15],
        [bgmVolume, bgmVolume * depth, bgmVolume * depth, bgmVolume],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      dynamicBgmVolume = Math.min(dynamicBgmVolume, ducked);
    }
  }

  // Map SFX types to verified assets in public/sfx/
  const getSfxSrc = (type: SfxCue['type']): string => {
    switch (type) {
      case 'whoosh':
        return 'sfx/whoosh-fast.mp3';
      case 'impact':
        return 'sfx/impact-transition.mp3';
      case 'click':
        return 'sfx/kenney_mouseclick.wav';
      case 'chime':
        return 'sfx/remotion_ding.wav';
      case 'riser':
        return 'sfx/bass-hit-futuristic.mp3';
      default:
        return 'sfx/transition-soft.mp3';
    }
  };

  return (
    <>
      {/* 1. MASTER VOICE TRACK (IF PROVIDED) */}
      {voiceTrack && (
        <Audio src={staticFile(voiceTrack)} volume={voiceVolume} />
      )}

      {/* 2. DYNAMICALLY DUCKED BACKGROUND MUSIC */}
      {bgmTrack && (
        <Audio src={staticFile(bgmTrack)} volume={dynamicBgmVolume} loop />
      )}

      {/* 3. DETERMINISTIC SOUND EFFECT CUES */}
      {sfxCues.map((cue, idx) => (
        <Sequence
          key={`sfx-${cue.type}-${cue.frame}-${idx}`}
          from={Math.max(0, cue.frame)}
          durationInFrames={60}
          layout="none"
        >
          <Audio
            src={staticFile(getSfxSrc(cue.type))}
            volume={cue.volume ?? (cue.type === 'click' ? 0.35 : cue.type === 'impact' ? 0.65 : 0.5)}
          />
        </Sequence>
      ))}
    </>
  );
};
