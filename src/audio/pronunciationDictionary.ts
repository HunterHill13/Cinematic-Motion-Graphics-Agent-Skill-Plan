/**
 * V16 PRONUNCIATION DICTIONARY (BACKWARD-COMPATIBLE ADAPTER)
 * 
 * Re-exports and bridges to the dedicated V16 Pronunciation Architecture:
 * - `src/audio/pronunciation/pronunciationTypes.ts`
 * - `src/audio/pronunciation/pronunciationRegistry.ts`
 * - `src/audio/pronunciation/pronunciationResolver.ts`
 * 
 * Strict Invariant:
 * DISPLAY TEXT ≠ TTS TEXT.
 * Never alter displayText or visible broadcast typography.
 */

import {
  PRONUNCIATION_REGISTRY,
  getRegisteredPronunciation,
} from './pronunciation/pronunciationRegistry';

export interface PronunciationEntry {
  originalTerm: string;
  phonetizedTts: string;
  ipa?: string;
  notes: string;
  selectedVariant: string;
  testedVariants: string[];
}

export const PERSIAN_PRONUNCIATION_DICTIONARY: Record<string, PronunciationEntry> = Object.fromEntries(
  Object.entries(PRONUNCIATION_REGISTRY).map(([key, val]) => [
    key,
    {
      originalTerm: val.display,
      phonetizedTts: val.tts,
      ipa: val.ipa,
      notes: val.notes || '',
      selectedVariant: val.tts,
      testedVariants: val.testedVariants || [val.display, val.tts],
    },
  ])
);

/**
 * Retrieves phonetized TTS representation for a term if registered.
 */
export function getPronunciationOverride(term: string): string | undefined {
  return PRONUNCIATION_REGISTRY[term]?.tts;
}
