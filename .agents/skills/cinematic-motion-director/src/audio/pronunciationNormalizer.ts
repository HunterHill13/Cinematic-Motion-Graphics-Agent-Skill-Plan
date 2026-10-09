/**
 * V16 PRONUNCIATION NORMALIZER (BACKWARD-COMPATIBLE ADAPTER)
 * 
 * Bridges to the V16 Word-Boundary Safe Pronunciation Resolver:
 * `src/audio/pronunciation/pronunciationResolver.ts`
 * 
 * Invariants:
 * 1. Raw Script -> Pronunciation Resolver -> TTS Input (Controlled Phonetization)
 * 2. Raw Script -> Source Manifest -> displayText (Pristine Standard Persian, 0 Diacritics)
 */

import {
  resolvePronunciations,
  assertNoPhoneticLeakage,
} from './pronunciation/pronunciationResolver';

/**
 * Normalizes Persian script exclusively for TTS audio synthesis.
 * Uses word-boundary-safe matching across registered institutional terms.
 */
export function normalizeTtsScript(rawText: string): string {
  const result = resolvePronunciations(rawText);
  return result.ttsText;
}

/**
 * Audit gate: Validates that display text contains ZERO TTS pronunciation pollution
 * (such as Arabic diacritics / tashdid / harakat added solely for speech engines).
 */
export function assertNoDisplayTextPollution(displayText: string): {
  valid: boolean;
  violations: string[];
} {
  const leakage = assertNoPhoneticLeakage(displayText);
  return {
    valid: leakage.clean,
    violations: leakage.leaks,
  };
}
