import React, { createContext, useContext } from 'react';

export interface CinematicRhythmState {
  frame: number;
  fps: number;
  bpm: number;
  beatPulse: number; // 0.0 to 1.0 peak decay per musical beat
  beatProgress: number; // 0.0 to 1.0 continuous saw
  isDownbeat: boolean;
  themeId: string;
}

const defaultRhythm: CinematicRhythmState = {
  frame: 0,
  fps: 30,
  bpm: 124,
  beatPulse: 0,
  beatProgress: 0,
  isDownbeat: false,
  themeId: 'DARK_GRAPHITE_TECH',
};

export const CinematicRhythmContext = createContext<CinematicRhythmState>(defaultRhythm);

export const useCinematicRhythm = (): CinematicRhythmState => {
  return useContext(CinematicRhythmContext);
};

/**
 * Returns a subtle rhythmic scale multiplier (e.g. 1.0 to 1.025)
 * for breathing elements that stay alive without causing visual fatigue.
 */
export const useBeatBreathingScale = (amplitude: number = 0.02): number => {
  const { beatPulse } = useCinematicRhythm();
  return 1 + beatPulse * amplitude;
};
