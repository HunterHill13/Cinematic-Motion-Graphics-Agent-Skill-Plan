import { interpolate, Easing } from 'remotion';

export interface SemanticPhraseMetadata {
  id: string;
  phrase: string;
  timestampSec: number;
  acousticFrame: number;
  category: 'hook' | 'statute' | 'criteria' | 'time' | 'threshold' | 'outro';
}

/**
 * Acoustically measured truth table from narration_master.wav (48 kHz / 30 FPS)
 */
export const CANONICAL_PHRASE_TIMELINE: Record<string, SemanticPhraseMetadata> = {
  'دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند': {
    id: 'intro_title',
    phrase: 'دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند',
    timestampSec: 0.0,
    acousticFrame: 0,
    category: 'hook',
  },
  'آیا می‌دانید': {
    id: 'question_start',
    phrase: 'آیا می‌دانید',
    timestampSec: 6.14,
    acousticFrame: 184,
    category: 'hook',
  },
  'دانشجوی پژوهشگر برجسته': {
    id: 'keyword_researcher',
    phrase: 'دانشجوی پژوهشگر برجسته',
    timestampSec: 7.80,
    acousticFrame: 234,
    category: 'hook',
  },
  'بند کاف ماده ۲': {
    id: 'kaaf_art2',
    phrase: 'بند کاف ماده ۲',
    timestampSec: 13.17,
    acousticFrame: 395,
    category: 'statute',
  },
  'آیین‌نامه ارتقای اعضای هیئت علمی': {
    id: 'decree_title',
    phrase: 'آیین‌نامه ارتقای اعضای هیئت علمی',
    timestampSec: 14.50,
    acousticFrame: 435,
    category: 'statute',
  },
  'سه شرط ضروری': {
    id: 'three_conditions_overview',
    phrase: 'سه شرط ضروری',
    timestampSec: 21.81,
    acousticFrame: 654,
    category: 'criteria',
  },
  'حداقل ۱۶': {
    id: 'c1_gpa16',
    phrase: 'حداقل ۱۶',
    timestampSec: 28.50,
    acousticFrame: 855,
    category: 'criteria',
  },
  'تأییدیه کمیته انضباطی': {
    id: 'c2_disciplinary',
    phrase: 'تأییدیه کمیته انضباطی',
    timestampSec: 34.50,
    acousticFrame: 1035,
    category: 'criteria',
  },
  'حداقل از ۶ ماده': {
    id: 'c3_six_articles',
    phrase: 'حداقل از ۶ ماده',
    timestampSec: 40.50,
    acousticFrame: 1215,
    category: 'criteria',
  },
  'بازه زمانی معتبر': {
    id: 'time_window_start',
    phrase: 'بازه زمانی معتبر',
    timestampSec: 49.22,
    acousticFrame: 1476,
    category: 'time',
  },
  'یک سال پس از فارغ‌التحصیلی': {
    id: 'cutoff_1year',
    phrase: 'یک سال پس از فارغ‌التحصیلی',
    timestampSec: 52.50,
    acousticFrame: 1575,
    category: 'time',
  },
  'امتیازات لازم بر اساس مقطع': {
    id: 'tiers_intro',
    phrase: 'امتیازات لازم بر اساس مقطع',
    timestampSec: 57.18,
    acousticFrame: 1715,
    category: 'threshold',
  },
  'شصت و پنج': {
    id: 'tier1_65',
    phrase: 'شصت و پنج',
    timestampSec: 63.80,
    acousticFrame: 1914,
    category: 'threshold',
  },
  'صد و ده': {
    id: 'tier2_110',
    phrase: 'صد و ده',
    timestampSec: 67.00,
    acousticFrame: 2010,
    category: 'threshold',
  },
  'صد و سی': {
    id: 'tier3_130',
    phrase: 'صد و سی',
    timestampSec: 70.00,
    acousticFrame: 2100,
    category: 'threshold',
  },
  'دانشگاه علوم پزشکی بقیه‌الله': {
    id: 'outro_seal_crest',
    phrase: 'دانشگاه علوم پزشکی بقیه‌الله',
    timestampSec: 73.17,
    acousticFrame: 2195,
    category: 'outro',
  },
};

export interface SyncPhraseConfig {
  phrase: keyof typeof CANONICAL_PHRASE_TIMELINE | string;
  role?: 'primary-reveal' | 'statute-slam' | 'criterion-strike' | 'cutoff-lock' | 'tier-surge' | 'seal-detonate';
  shotStartFrame?: number;
  anticipationFrames?: number;
  contactOffsetFrames?: number;
  reactionFrames?: number;
  settleFrames?: number;
}

export interface SyncPhraseState {
  phraseId: string;
  phase: 'idle' | 'anticipation' | 'contact' | 'reaction' | 'settled';
  currentPhase: 'idle' | 'anticipation' | 'contact' | 'reaction' | 'settled';
  globalContactFrame: number;
  localContactFrame: number;
  intensity: number; // Peaks at 1.0 on contact frame
  haloIntensity: number;
  scaleMultiplier: number;
  displacementY: number;
  impactDisplacement: number;
  opacity: number;
  progress: number; // 0.0 -> 1.0 across full gesture
}

/**
 * SEMANTIC WORD/PHRASE AUDIO SYNCHRONIZATION ENGINE
 * Derives visual physical gestures deterministically from actual acoustic narration timestamps.
 */
export function calculateSyncPhrase(
  currentFrame: number,
  configOrPhrase: SyncPhraseConfig | string
): SyncPhraseState {
  const config: SyncPhraseConfig = typeof configOrPhrase === 'string'
    ? { phrase: configOrPhrase }
    : configOrPhrase;

  const {
    phrase,
    shotStartFrame = 0,
    anticipationFrames = 4,
    contactOffsetFrames = 0,
    reactionFrames = 12,
    settleFrames = 10,
  } = config;

  const metadata = CANONICAL_PHRASE_TIMELINE[phrase];
  const globalContact = (metadata ? metadata.acousticFrame : 0) + contactOffsetFrames;
  const localContact = globalContact - shotStartFrame;

  // Frame relative to local contact
  const rel = currentFrame - localContact;

  const makeState = (
    phase: 'idle' | 'anticipation' | 'contact' | 'reaction' | 'settled',
    intensity: number,
    scaleMultiplier: number,
    displacementY: number,
    opacity: number,
    progress: number
  ): SyncPhraseState => ({
    phraseId: metadata ? metadata.id : 'unknown',
    phase,
    currentPhase: phase,
    globalContactFrame: globalContact,
    localContactFrame: localContact,
    intensity,
    haloIntensity: intensity,
    scaleMultiplier,
    displacementY,
    impactDisplacement: displacementY,
    opacity,
    progress,
  });

  if (rel < -anticipationFrames) {
    return makeState('idle', 0, 0.95, 15, 0, 0);
  }

  // Anticipation phase (pulls back slightly, builds tension)
  if (rel < 0) {
    const t = (rel + anticipationFrames) / Math.max(1, anticipationFrames);
    const eased = Easing.bezier(0.2, 0, 0.8, 1)(t);
    return makeState(
      'anticipation',
      t * 0.7,
      0.95 - 0.03 * Math.sin(t * Math.PI),
      interpolate(eased, [0, 1], [15, 2]),
      interpolate(t, [0, 1], [0, 0.9]),
      t * 0.3
    );
  }

  // Exact contact frame (strike impact)
  if (rel === 0) {
    return makeState('contact', 1.0, 1.08, 0, 1.0, 0.35);
  }

  // Reaction phase (damped harmonic rebound)
  if (rel <= reactionFrames) {
    const t = rel / reactionFrames;
    const damp = Math.exp(-0.25 * rel);
    const displacementY = -5 * damp * Math.sin(0.7 * rel);
    const scale = 1.0 + 0.08 * damp * Math.cos(0.7 * rel);
    return makeState(
      'reaction',
      (1 - t) * 0.9,
      scale,
      displacementY,
      1.0,
      0.35 + t * 0.45
    );
  }

  // Settle phase (smooth rest)
  const settleElapsed = rel - reactionFrames;
  if (settleElapsed <= settleFrames) {
    const t = settleElapsed / settleFrames;
    return makeState('settled', 0, 1.0, 0, 1.0, 0.8 + t * 0.2);
  }

  return makeState('settled', 0, 1.0, 0, 1.0, 1.0);
}
