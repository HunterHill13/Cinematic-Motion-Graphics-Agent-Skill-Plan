/**
 * V17 PRONUNCIATION REGISTRY
 * 
 * Centralized, extensible dictionary of Persian pronunciation overrides with
 * audio-level validation, fallback policies, and critical proper noun locking.
 * 
 * Strict Invariants:
 * 1. DISPLAY TEXT ≠ TTS TEXT ≠ FINAL AUDIO
 * 2. `display`: Pristine Persian orthography shown on screen (ZERO diacritics).
 * 3. `tts`: Phonetically controlled override for speech synthesis.
 * 4. `approvedAudioAsset`: Canonical audio asset path for critical items.
 */

import { PronunciationEntry } from './pronunciationTypes';

export const PRONUNCIATION_REGISTRY: Record<string, PronunciationEntry> = {
  // CRITICAL PROPER NOUN: Institutional University Patron (Golden Requirement)
  'بقیه‌الله': {
    display: 'بقیه‌الله',
    tts: 'بَقیِّةُ‌الله',
    fallbackTts: 'بَقیِّتُ‌الله',
    category: 'institution',
    priority: 'critical',
    criticality: 'critical-proper-noun',
    fallbackPolicy: 'use-approved-asset',
    audioValidationStatus: 'approved-asset-locked',
    approvedAudioAsset: 'public/audio/persian_editorial_v17/approved_baqiyatollah_canonical.wav',
    ipa: 'bæqijjetolˈlɒːh',
    contextText: 'روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند.',
    timeRangeInMaster: {
      startSec: 0.0,
      endSec: 7.05,
    },
    notes: 'Titular patron of Baqiyatallah University of Medical Sciences. Requires tashdid on ya and vocalic elision to prevent neural TTS truncation into "Baqi Allah". Spliced with approved canonical audio asset.',
    testedVariants: [
      'بقیه‌الله',
      'بَقیِّةُ‌الله',
      'بَقیِّتُ‌الله',
      'بَقیّه‌تُ‌الله',
      'بَقیِّه‌تُ الله',
      'بَقیّه‌الله',
    ],
  },

  // HIGH: Statutory Clauses & Regulations
  'بند کاف': {
    display: 'بند کاف',
    tts: 'بندِ کاف',
    category: 'special-term',
    priority: 'high',
    criticality: 'important',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'bænd-e kɒːf',
    contextText: 'دستورالعمل بند کاف، ماده دو از آیین‌نامه استعدادهای درخشان',
    timeRangeInMaster: {
      startSec: 12.6,
      endSec: 15.0,
    },
    notes: 'Statutory Clause Kaaf. Requires explicit ezafe kasra to prevent flat compound reading.',
    testedVariants: ['بند کاف', 'بندِ کاف', 'بندکاف'],
  },

  'استعدادهای درخشان': {
    display: 'استعدادهای درخشان',
    tts: 'استعدادهایِ درخشان',
    category: 'institution',
    priority: 'high',
    criticality: 'important',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'esteʔdɒːdhɒː-je deræxʃɒːn',
    contextText: 'از آیین‌نامه استعدادهای درخشان وزارت بهداشت',
    timeRangeInMaster: {
      startSec: 15.0,
      endSec: 17.5,
    },
    notes: 'Brilliant Talents secretariat. Requires ezafe linking for natural documentary cadence.',
    testedVariants: ['استعدادهای درخشان', 'استعدادهایِ درخشان'],
  },

  'دانشگاه علوم پزشکی': {
    display: 'دانشگاه علوم پزشکی',
    tts: 'دانشگاهِ علومِ پزشکی',
    category: 'institution',
    priority: 'high',
    criticality: 'important',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'dɒːneʃɡɒːh-e oluːm-e pezeʃkiː',
    contextText: 'دانشگاه علوم پزشکی بقیه‌الله',
    timeRangeInMaster: {
      startSec: 2.2,
      endSec: 4.5,
    },
    notes: 'Chained ezafe across institutional compound.',
    testedVariants: ['دانشگاه علوم پزشکی', 'دانشگاهِ علومِ پزشکی'],
  },

  // ARABIC LOANWORDS & SCIENTIFIC NOUNS
  'فارغ‌التحصیلی': {
    display: 'فارغ‌التحصیلی',
    tts: 'فارغ‌ُالتَّحصیلی',
    category: 'arabic-term',
    priority: 'high',
    criticality: 'important',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'fɒːreɣottaɦsiːliː',
    contextText: 'نهایتاً تا یک سال پس از فارغ‌التحصیلی باشد',
    timeRangeInMaster: {
      startSec: 51.5,
      endSec: 54.0,
    },
    notes: 'Arabic solar letter assimilation (Ta) and damma on ghayn.',
    testedVariants: ['فارغ‌التحصیلی', 'فارغ‌ُالتَّحصیلی'],
  },

  'حدنصاب': {
    display: 'حدنصاب',
    tts: 'حدِّ نِصاب',
    category: 'arabic-term',
    priority: 'normal',
    criticality: 'normal',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'hædd-e nesɒːb',
    contextText: 'حدنصاب قبولی، بسته به تیپ دانشگاه و مقطع شما فرق می‌کند',
    timeRangeInMaster: {
      startSec: 56.5,
      endSec: 59.0,
    },
    notes: 'Tashdid on Dal and kasra on Nun.',
    testedVariants: ['حدنصاب', 'حدِّ نِصاب', 'حد نصاب'],
  },

  'آیین‌نامه': {
    display: 'آیین‌نامه',
    tts: 'آیین‌نامه‌',
    category: 'special-term',
    priority: 'normal',
    criticality: 'normal',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'ɒːjiːn-nɒːme',
    contextText: 'شش ماده مختلف آیین‌نامه کسب شود',
    notes: 'Zero-width non-joiner preservation.',
    testedVariants: ['آیین‌نامه', 'آیین نامه'],
  },

  'کمیته انضباطی': {
    display: 'کمیته انضباطی',
    tts: 'کمیته‌یِ انضباطی',
    category: 'special-term',
    priority: 'normal',
    criticality: 'normal',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'komiːte-je enzebɒːtiː',
    contextText: 'و تأییدیه کمیته انضباطی را دریافت کنید',
    notes: 'Explicit ezafe ya-kasra linking.',
    testedVariants: ['کمیته انضباطی', 'کمیته‌یِ انضباطی'],
  },

  'دکترای تخصصی': {
    display: 'دکترای تخصصی',
    tts: 'دکترایِ تخصصی',
    category: 'medical-term',
    priority: 'normal',
    criticality: 'normal',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'doktorɒː-je tæxæssosiː',
    contextText: 'و دکترای تخصصی به صد و سی امتیاز نیاز دارد',
    notes: 'Ezafe linking for PhD medical level.',
    testedVariants: ['دکترای تخصصی', 'دکترایِ تخصصی'],
  },

  'پزشکی عمومی': {
    display: 'پزشکی عمومی',
    tts: 'پزشکیِ عمومی',
    category: 'medical-term',
    priority: 'normal',
    criticality: 'normal',
    fallbackPolicy: 'allow-tts-fallback',
    audioValidationStatus: 'auditory-verified',
    ipa: 'pezeʃkiː-je omuːmiː',
    contextText: 'پزشکی عمومی صد و ده امتیاز',
    notes: 'Ezafe linking for General Medicine.',
    testedVariants: ['پزشکی عمومی', 'پزشکیِ عمومی'],
  },
};

/**
 * Accessor for single term override lookup.
 */
export function getRegisteredPronunciation(term: string): PronunciationEntry | undefined {
  return PRONUNCIATION_REGISTRY[term];
}

/**
 * Returns all registered terms.
 */
export function getAllRegisteredTerms(): string[] {
  return Object.keys(PRONUNCIATION_REGISTRY);
}

/**
 * Returns all critical proper nouns that require mandatory audio validation.
 */
export function getCriticalProperNouns(): PronunciationEntry[] {
  return Object.values(PRONUNCIATION_REGISTRY).filter(
    (e) => e.criticality === 'critical-proper-noun'
  );
}
