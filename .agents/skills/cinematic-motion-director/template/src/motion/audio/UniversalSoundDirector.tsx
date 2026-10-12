import React from 'react';
import { Audio, staticFile, interpolate, useCurrentFrame } from 'remotion';

/**
 * ============================================================================
 * UNIVERSAL SOUND DIRECTOR (CLEAN BGM & NARRATION ENGINE - ZERO RANDOM SFX)
 * ============================================================================
 *
 * Sound Effects (SFX) have been completely removed per studio direction:
 * - Eliminates random, artificial or distracting foley clicks/whooshes
 * - Pure focus on crystal-clear voiceover narration & musical ambience
 * - Frame-accurate sidechain ducking so BGM never overpowers spoken words
 * ============================================================================
 */

export interface SfxCue {
  frame: number;
  type?: string;
  customSrc?: string;
  volume?: number;
}

export interface UniversalSoundDirectorProps {
  bgmTrack?: string;
  bgmVolume?: number;
  voiceTrack?: string;
  voiceVolume?: number;
  themeId?: string;
  /** Deprecated & Ignored: Sound Effects are completely removed from production */
  sfxCues?: SfxCue[];
  duckingRanges?: Array<{ start: number; end: number; depth?: number }>;
}

export const UniversalSoundDirector: React.FC<UniversalSoundDirectorProps> = ({
  bgmTrack = 'music/Tech_Live.mp3',
  bgmVolume = 0.14,
  voiceTrack,
  voiceVolume = 1.0,
  duckingRanges = [],
}) => {
  const frame = useCurrentFrame();

  // Compute dynamic sidechain ducking volume so BGM never masks narration
  let dynamicBgmVolume = bgmVolume;
  for (const range of duckingRanges) {
    if (frame >= range.start - 10 && frame <= range.end + 15) {
      const depth = range.depth ?? 0.42;
      const ducked = interpolate(
        frame,
        [range.start - 10, range.start, range.end, range.end + 15],
        [bgmVolume, bgmVolume * depth, bgmVolume * depth, bgmVolume],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      dynamicBgmVolume = Math.min(dynamicBgmVolume, ducked);
    }
  }

  return (
    <>
      {/* 1. MASTER VOICE TRACK (IF PROVIDED) */}
      {voiceTrack && <Audio src={staticFile(voiceTrack)} volume={voiceVolume} />}

      {/* 2. DYNAMICALLY DUCKED BACKGROUND MUSIC (NO RANDOM SFX) */}
      {bgmTrack && <Audio src={staticFile(bgmTrack)} volume={dynamicBgmVolume} loop />}
    </>
  );
};
