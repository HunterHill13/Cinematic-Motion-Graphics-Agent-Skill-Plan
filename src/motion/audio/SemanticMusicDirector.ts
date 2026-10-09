/**
 * ============================================================================
 * SEMANTIC MUSIC DIRECTOR & BEAT-GRID QUANTIZATION ENGINE
 * ============================================================================
 * 
 * Inspired by Claude Opus 5.5's code-driven motion design architecture:
 * 1. Semantic Domain Matching: Analyzes script, theme, and keywords to automatically
 *    select the optimal music track, BPM, mood, and SFX palette.
 * 2. Beat-Grid Quantization (Quantized Beat-Snapping):
 *    Calculates frame timing based on musical tempo (BPM) and snaps camera
 *    whip-pans, cursor clicks, and shape morphs directly to the musical beat grid.
 * ============================================================================
 */

export type MusicDomain = 
  | 'ai_future_tech'
  | 'fintech_saas'
  | 'medical_biotech'
  | 'academic_research'
  | 'minimal_chillhop';

export interface MusicProfile {
  id: MusicDomain;
  title: string;
  filename: string;
  bpm: number;
  feel: string;
  duckingAmount: number; // 0.0 - 1.0 (e.g. 0.60 = duck down to 60%)
  sfxPalette: {
    click: string;
    whoosh: string;
    impact: string;
    accent: string;
  };
}

export const MUSIC_PROFILES: Record<MusicDomain, MusicProfile> = {
  ai_future_tech: {
    id: 'ai_future_tech',
    title: 'Brain Dance',
    filename: 'music/Brain_Dance.mp3',
    bpm: 124,
    feel: 'Pulsating futuristic synthwave, cybernetic groove, driving percussion',
    duckingAmount: 0.60,
    sfxPalette: {
      click: 'sfx/kenney_mouseclick.wav',
      whoosh: 'sfx/remotion_whip.wav',
      impact: 'sfx/remotion_whoosh.wav',
      accent: 'sfx/remotion_ding.wav',
    },
  },
  fintech_saas: {
    id: 'fintech_saas',
    title: 'Tech Live',
    filename: 'music/Tech_Live.mp3',
    bpm: 124,
    feel: 'Clean, energetic modern tech backdrop, crisp startup momentum',
    duckingAmount: 0.65,
    sfxPalette: {
      click: 'sfx/kenney_switch.wav',
      whoosh: 'sfx/remotion_whoosh.wav',
      impact: 'sfx/remotion_shutter.wav',
      accent: 'sfx/remotion_ding.wav',
    },
  },
  medical_biotech: {
    id: 'medical_biotech',
    title: 'Scientific Harmonic Arc',
    filename: 'music/candidate_c_cinematic_arc.wav',
    bpm: 92,
    feel: 'Organic evolving harmonic tension, biomedical resonance, cinematic climax',
    duckingAmount: 0.50,
    sfxPalette: {
      click: 'sfx/kenney_mouseclick.wav',
      whoosh: 'sfx/remotion_whoosh.wav',
      impact: 'sfx/remotion_whip.wav',
      accent: 'sfx/remotion_ding.wav',
    },
  },
  academic_research: {
    id: 'academic_research',
    title: 'Cipher',
    filename: 'music/Cipher2.mp3',
    bpm: 150, // 75 half-time
    feel: 'Sophisticated electric piano and strings, deep intellectual curiosity',
    duckingAmount: 0.60,
    sfxPalette: {
      click: 'sfx/kenney_mouseclick.wav',
      whoosh: 'sfx/remotion_whoosh.wav',
      impact: 'sfx/remotion_shutter.wav',
      accent: 'sfx/remotion_ding.wav',
    },
  },
  minimal_chillhop: {
    id: 'minimal_chillhop',
    title: 'Tech Live (Chill)',
    filename: 'music/Tech_Live.mp3',
    bpm: 124,
    feel: 'Relaxed, focus-enhancing electronic texture',
    duckingAmount: 0.70,
    sfxPalette: {
      click: 'sfx/kenney_switch.wav',
      whoosh: 'sfx/remotion_whoosh.wav',
      impact: 'sfx/remotion_shutter.wav',
      accent: 'sfx/remotion_ding.wav',
    },
  },
};

/**
 * Automatically classifies narrative text into the best matching music domain.
 */
export function detectMusicDomain(textOrScript: string): MusicDomain {
  const lower = textOrScript.toLowerCase();

  const keywords: Record<MusicDomain, string[]> = {
    medical_biotech: ['پزشکی', 'درمان', 'سلامت', 'دارو', 'سلول', 'dna', 'ژنوم', 'زیستی', 'medical', 'clinical', 'biology', 'hospital', 'patient'],
    ai_future_tech: ['هوش مصنوعی', 'مدل', 'الگوریتم', 'کلاد', 'کوانتوم', 'سایبر', 'ai', 'neural', 'deep learning', 'future', 'cyber', 'robot', 'automation'],
    fintech_saas: ['مالی', 'بانک', 'داشبورد', 'سرمایه', 'تراکنش', 'saas', 'fintech', 'dashboard', 'analytics', 'growth', 'metrics', 'platform'],
    academic_research: ['دانشگاه', 'تحقیقات', 'مقاله', 'پژوهش', 'کمیته', 'استاد', 'علمی', 'university', 'research', 'paper', 'academic', 'study'],
    minimal_chillhop: ['آرام', 'مینیمال', 'ساده', 'طبیعت', 'تمرکز', 'minimal', 'chill', 'calm'],
  };

  for (const [domain, list] of Object.entries(keywords)) {
    for (const kw of list) {
      if (lower.includes(kw)) {
        return domain as MusicDomain;
      }
    }
  }

  // Default to high-energy ai_future_tech
  return 'ai_future_tech';
}

/**
 * Beat Grid Quantization:
 * Snaps any target frame to the nearest musical beat or subdivision.
 * 
 * @param targetFrame - Raw requested keyframe (e.g. 95)
 * @param bpm - Musical tempo (e.g. 124 BPM)
 * @param fps - Animation framerate (default 30 fps)
 * @param division - Beat subdivision ('1' = whole beat, '0.5' = half beat / 8th note, '0.25' = quarter beat / 16th note, '4' = whole bar)
 * @returns The mathematically quantized frame number.
 */
export function quantizeToBeat(
  targetFrame: number,
  bpm: number = 124,
  fps: number = 30,
  division: 0.25 | 0.5 | 1 | 2 | 4 = 1
): number {
  const framesPerBeat = (60 / bpm) * fps;
  const gridUnitFrames = framesPerBeat * division;
  const nearestIndex = Math.round(targetFrame / gridUnitFrames);
  return Math.round(nearestIndex * gridUnitFrames);
}

/**
 * Returns an array of exact beat frames within a given range.
 */
export function getBeatTimeline(
  startFrame: number,
  endFrame: number,
  bpm: number = 124,
  fps: number = 30
): number[] {
  const framesPerBeat = (60 / bpm) * fps;
  const beats: number[] = [];
  let current = 0;
  while (current <= endFrame) {
    if (current >= startFrame) {
      beats.push(Math.round(current));
    }
    current += framesPerBeat;
  }
  return beats;
}
