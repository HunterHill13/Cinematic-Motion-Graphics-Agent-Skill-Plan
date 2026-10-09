/**
 * V17 PRONUNCIATION RESOLVER
 * 
 * Deterministic preprocessing engine that converts Authoritative Display Text
 * into TTS-specific Pronunciation-Controlled representation.
 * 
 * Invariants:
 * 1. The original Authoritative Narration remains strictly immutable.
 * 2. Word-Boundary Safety: Prevents substring collateral damage across compound nouns.
 * 3. Handles Persian/Arabic orthographic variations:
 *    - Zero-Width Non-Joiner (ZWNJ / \u200c) vs Space (\s)
 *    - Yeh variations (Persian \u06cc vs Arabic \u064a)
 *    - Kaf variations (Persian \u06a9 vs Arabic \u0643)
 *    - Punctuation boundaries (« », ( ), [ ], ،, ؛, ؟, !, ., etc.)
 * 4. Tracks critical proper nouns and flags those requiring audio-level validation.
 */

import { PRONUNCIATION_REGISTRY } from './pronunciationRegistry';
import { ResolutionResult, PronunciationEntry } from './pronunciationTypes';

/**
 * Characters that serve as valid Persian word boundaries.
 */
const PERSIAN_BOUNDARY_CHARS = '[\\s\\u200c\\p{P}\\p{S}^$]';

/**
 * Builds a regex pattern that safely matches a registered Persian term
 * at lexical word boundaries while accommodating ZWNJ/space variations.
 */
function buildSafeTermRegex(term: string): RegExp {
  // Normalize characters in term to allow both Arabic and Persian character variants
  let pattern = term
    .replace(/ی/g, '[یي]')
    .replace(/ی/g, '[یي]')
    .replace(/ک/g, '[کك]')
    .replace(/\u200c/g, '[\\u200c\\s]?'); // Allow optional ZWNJ or space at compound joints

  // Lookbehind for word boundary or start of string
  // Lookahead for word boundary or end of string
  // Using unicode boundary checks compatible with V8 JavaScript RegExp
  return new RegExp(`(^|(?<=[^\\p{L}\\p{M}]))${pattern}((?=[^\\p{L}\\p{M}])|$)`, 'gu');
}

/**
 * Resolves all registered pronunciations in a text for TTS generation.
 * Guarantees that the input displayText is never mutated.
 */
export function resolvePronunciations(authoritativeText: string): ResolutionResult {
  let ttsText = authoritativeText;
  const appliedOverrides: ResolutionResult['appliedOverrides'] = [];
  const criticalTerms: string[] = [];
  let hasCriticalOverrides = false;

  // Process entries sorted by descending term length to prevent shorter substrings
  // from preempting longer compound nouns
  const sortedEntries = Object.entries(PRONUNCIATION_REGISTRY).sort(
    (a, b) => b[0].length - a[0].length
  );

  for (const [term, entry] of sortedEntries) {
    const regex = buildSafeTermRegex(term);
    let matchCount = 0;

    // Count matches before replacement
    const matches = ttsText.match(regex);
    if (matches && matches.length > 0) {
      matchCount = matches.length;
      ttsText = ttsText.replace(regex, entry.tts);

      appliedOverrides.push({
        term,
        replacedWith: entry.tts,
        occurrences: matchCount,
        category: entry.category,
        criticality: entry.criticality,
        audioStatus: entry.audioValidationStatus,
      });

      if (entry.priority === 'critical' || entry.criticality === 'critical-proper-noun') {
        hasCriticalOverrides = true;
        criticalTerms.push(term);
      }
    }
  }

  return {
    ttsText,
    displayText: authoritativeText,
    appliedOverrides,
    hasCriticalOverrides,
    criticalTerms,
  };
}

/**
 * Validates that an on-screen display string does NOT contain any
 * TTS phonetic markers (harakat, tashdid, or foreign pronunciation tags).
 */
export function assertNoPhoneticLeakage(text: string): {
  clean: boolean;
  leaks: string[];
} {
  const leaks: string[] = [];

  // Arabic Harakat range: Fathatan to Sukun (U+064B - U+0652) and Tashdid (U+0651)
  const diacriticPattern = /[\u064B-\u065F]/g;
  const matches = text.match(diacriticPattern);

  if (matches && matches.length > 0) {
    leaks.push(
      `Detected ${matches.length} phonetic diacritic(s) in display text. Display typography must remain in pristine standard Persian calligraphy.`
    );
  }

  // XML / SSML tag leakage check
  if (/<phoneme|<sub|<break/i.test(text)) {
    leaks.push('Detected raw SSML markup tags in display text.');
  }

  return {
    clean: leaks.length === 0,
    leaks,
  };
}
