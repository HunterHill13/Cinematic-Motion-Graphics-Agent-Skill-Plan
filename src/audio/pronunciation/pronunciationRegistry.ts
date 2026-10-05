/**
 * V16 PRONUNCIATION REGISTRY
 * 
 * Centralized, extensible dictionary of Persian pronunciation overrides.
 * 
 * Strict Invariant:
 * Every entry defines both:
 * 1. `display`: The authoritative Persian orthographic form shown on screen.
 * 2. `tts`: The phonetic override sent exclusively to speech synthesis engines.
 * 
 * "DISPLAY TEXT ≠ TTS TEXT"
 */

import { PronunciationEntry } from './pronunciationTypes';

export const PRONUNCIATION_REGISTRY: Record<string, PronunciationEntry> = {
  // CRITICAL: Institutional University Patron
  'بقیه‌الله': {
    display: 'بقیه‌الله',
    tts: 'بَقیِّةُ‌الله',
    fallbackTts: 'بَقیِّتُ‌الله',
    category: 'institution',
    priority: 'critical',
    ipa: 'bæqijjetolˈlɒːh',
    notes: 'Titular patron of Baqiyatallah University of Medical Sciences. Requires tashdid on ya and vocalic elision to prevent neural TTS truncation into "Baqi Allah".',
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
    ipa: 'bænd-e kɒːf',
    notes: 'Statutory Clause Kaaf. Requires explicit ezafe kasra to prevent flat compound reading.',
    testedVariants: ['بند کاف', 'بندِ کاف', 'بندکاف'],
  },

  'استعدادهای درخشان': {
    display: 'استعدادهای درخشان',
    tts: 'استعدادهایِ درخشان',
    category: 'institution',
    priority: 'high',
    ipa: 'esteʔdɒːdhɒː-je deræxʃɒːn',
    notes: 'Brilliant Talents secretariat. Requires ezafe linking for natural documentary cadence.',
    testedVariants: ['استعدادهای درخشان', 'استعدادهایِ درخشان'],
  },

  'دانشگاه علوم پزشکی': {
    display: 'دانشگاه علوم پزشکی',
    tts: 'دانشگاهِ علومِ پزشکی',
    category: 'institution',
    priority: 'high',
    ipa: 'dɒːneʃɡɒːh-e oluːm-e pezeʃkiː',
    notes: 'Chained ezafe across institutional compound.',
    testedVariants: ['دانشگاه علوم پزشکی', 'دانشگاهِ علومِ پزشکی'],
  },

  // ARABIC LOANWORDS & SCIENTIFIC NOUNS
  'فارغ‌التحصیلی': {
    display: 'فارغ‌التحصیلی',
    tts: 'فارغ‌ُالتَّحصیلی',
    category: 'arabic-term',
    priority: 'high',
    ipa: 'fɒːreɣottaɦsiːliː',
    notes: 'Arabic solar letter assimilation (Ta) and damma on ghayn.',
    testedVariants: ['فارغ‌التحصیلی', 'فارغ‌ُالتَّحصیلی'],
  },

  'حدنصاب': {
    display: 'حدنصاب',
    tts: 'حدِّ نِصاب',
    category: 'arabic-term',
    priority: 'normal',
    ipa: 'hædd-e nesɒːb',
    notes: 'Tashdid on Dal and kasra on Nun.',
    testedVariants: ['حدنصاب', 'حدِّ نِصاب', 'حد نصاب'],
  },

  'آیین‌نامه': {
    display: 'آیین‌نامه',
    tts: 'آیین‌نامه‌',
    category: 'special-term',
    priority: 'normal',
    ipa: 'ɒːjiːn-nɒːme',
    notes: 'Zero-width non-joiner preservation.',
    testedVariants: ['آیین‌نامه', 'آیین نامه'],
  },

  'کمیته انضباطی': {
    display: 'کمیته انضباطی',
    tts: 'کمیته‌یِ انضباطی',
    category: 'special-term',
    priority: 'normal',
    ipa: 'komiːte-je enzebɒːtiː',
    notes: 'Explicit ezafe ya-kasra linking.',
    testedVariants: ['کمیته انضباطی', 'کمیته‌یِ انضباطی'],
  },

  'دکترای تخصصی': {
    display: 'دکترای تخصصی',
    tts: 'دکترایِ تخصصی',
    category: 'medical-term',
    priority: 'normal',
    ipa: 'doktorɒː-je tæxæssosiː',
    notes: 'Ezafe linking for PhD medical level.',
    testedVariants: ['دکترای تخصصی', 'دکترایِ تخصصی'],
  },

  'پزشکی عمومی': {
    display: 'پزشکی عمومی',
    tts: 'پزشکیِ عمومی',
    category: 'medical-term',
    priority: 'normal',
    ipa: 'pezeʃkiː-je omuːmiː',
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
