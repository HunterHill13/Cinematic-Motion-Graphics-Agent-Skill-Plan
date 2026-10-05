/**
 * V15 PRONUNCIATION DICTIONARY
 * 
 * Strict Isolation Invariant:
 * This dictionary is applied ONLY to TTS generation and speech synthesis normalizers.
 * It must NEVER alter:
 * - displayText (on-screen broadcast typography)
 * - V14/V15 content manifest files
 * - source quotations or visual data labels
 * 
 * "Never modify displayed text merely to improve pronunciation."
 */

export interface PronunciationEntry {
  originalTerm: string;
  phonetizedTts: string;
  ipa?: string;
  notes: string;
  selectedVariant: string;
  testedVariants: string[];
}

export const PERSIAN_PRONUNCIATION_DICTIONARY: Record<string, PronunciationEntry> = {
  'بقیه‌الله': {
    originalTerm: 'بقیه‌الله',
    phonetizedTts: 'بَقیِّهُالله',
    ipa: 'bæɢijjetolˈlɒːh',
    notes: 'Requires tashdid on Ya and damma/kasra elision to prevent robotic pausing between Baghiyeh and Allah.',
    selectedVariant: 'بَقیِّهُالله',
    testedVariants: ['بقیه‌الله', 'بَقیهالله', 'بَقیِّهُالله', 'بقیه الله'],
  },
  'بند کاف': {
    originalTerm: 'بند کاف',
    phonetizedTts: 'بندِ کاف',
    ipa: 'bænd-e kɒːf',
    notes: 'Requires explicit ezafe on "band" to prevent flat compound reading.',
    selectedVariant: 'بندِ کاف',
    testedVariants: ['بند کاف', 'بندِ کاف', 'بندکاف'],
  },
  'آیین‌نامه': {
    originalTerm: 'آیین‌نامه',
    phonetizedTts: 'آیین‌نامه‌',
    ipa: 'ɒːjiːn nɒːme',
    notes: 'Standardized zero-width non-joiner preservation.',
    selectedVariant: 'آیین‌نامه‌',
    testedVariants: ['آیین‌نامه', 'آیین نامه'],
  },
  'استعدادهای درخشان': {
    originalTerm: 'استعدادهای درخشان',
    phonetizedTts: 'استعدادهایِ درخشان',
    ipa: 'esteʔdɒːdhɒː-je deræxʃɒːn',
    notes: 'Ezafe linking for fluid editorial narration.',
    selectedVariant: 'استعدادهایِ درخشان',
    testedVariants: ['استعدادهای درخشان', 'استعدادهایِ درخشان'],
  },
};

/**
 * Retrieves phonetized TTS representation for a term if registered,
 * without ever altering the original display text.
 */
export function getPronunciationOverride(term: string): string | undefined {
  return PERSIAN_PRONUNCIATION_DICTIONARY[term]?.phonetizedTts;
}
