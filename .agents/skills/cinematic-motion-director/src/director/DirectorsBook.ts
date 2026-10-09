/**
 * Director's Book Data Structure (v2.1)
 *
 * The authoritative creative source of truth for the entire video production.
 */

import { AspectRatioType } from '../aspect-ratio/AspectRatioDirector';
import { ShotChoreography } from '../choreography/ActionChoreographer';

export interface DirectorsBook {
  projectTitle: string;
  conceptSummary: string;
  targetAudience: string;
  aspectRatio: AspectRatioType;
  durationSeconds: number;
  totalFrames: number;

  visualStyle: {
    name: string;
    description: string;
    colorLanguage: {
      dominant60: string; // 60% Canvas / Dark space
      structural30: string; // 30% Structural elements & membranes
      accent10: string; // 10% Energetic focal points & highlights
    };
    typography: {
      headlineFont: string;
      bodyFont: string;
      persianFont: string;
      scaleMultiplier: number;
    };
    lightingLanguage: string;
    motionLanguage: string;
    continuityRules: string[];
  };

  narrativeArc: {
    act1_Hook: string;
    act2_Conflict_Mechanism: string;
    act3_Resolution_Outcome: string;
    emotionalArc: string;
  };

  soundLanguage: {
    narrationDirection: {
      language: string;
      energy: 'calm' | 'confident_documentary' | 'urgent';
      pacing: 'slow' | 'medium_fast' | 'rapid';
      recommendedProvider: string;
    };
    musicDirection: {
      genre: string;
      energy: string;
      tempoBpm: number;
      duckingUnderSpeechDb: number;
      license: string;
    };
    sfxDirection: {
      philosophy: string;
      criticalImpacts: string[];
    };
  };

  shots: ShotChoreography[];
}
