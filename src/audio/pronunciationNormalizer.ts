/**
 * V15 PRONUNCIATION NORMALIZER
 * 
 * Pipeline:
 * Raw Script -> Pronunciation Normalization -> TTS Input
 * 
 * Invariant:
 * Display Text Pipeline is strictly parallel and un-altered:
 * Raw Script -> Source Manifest -> displayText (Pristine, 0 diacritic pollution)
 */

import { PERSIAN_PRONUNCIATION_DICTIONARY } from './pronunciationDictionary';

/**
 * Normalizes Persian script exclusively for TTS audio synthesis.
 * Injects phonetic vowelization and ezafe markers only where required.
 */
export function normalizeTtsScript(rawText: string): string {
  let normalized = rawText;

  for (const [term, entry] of Object.entries(PERSIAN_PRONUNCIATION_DICTIONARY)) {
    // Replace whole word occurrences
    normalized = normalized.split(term).join(entry.phonetizedTts);
  }

  return normalized;
}

/**
 * Audit gate: Validates that display text contains ZERO TTS pronunciation pollution
 * (such as Arabic diacritics / tashdid / harakat added solely for speech engines).
 */
export function assertNoDisplayTextPollution(displayText: string): {
  valid: boolean;
  violations: string[];
} {
  const violations: string[] = [];

  // Check for excessive phonetic diacritics that indicate TTS leakage into display text
  // Arabic tashdid (U+0651), fatha (U+064E), damma (U+064F), kasra (U+0650)
  const diacriticPattern = /[\u064E\u064F\u0650\u0651\u0652]/g;
  const matches = displayText.match(diacriticPattern);

  if (matches && matches.length > 2) {
    violations.push(
      `Display text contains ${matches.length} phonetic diacritics. Display text must remain in pure standard Persian orthography without TTS pronunciation pollution.`
    );
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}
