/**
 * V17 PRONUNCIATION SYSTEM - TYPES
 * 
 * Defines the core schemas for the deterministic Persian pronunciation pipeline
 * with audio-level validation, approved audio asset fallback, and criticality tiers.
 * 
 * Invariants:
 * 1. DISPLAY TEXT ≠ TTS TEXT ≠ FINAL AUDIO (3 distinct validation layers)
 * 2. Visible Persian typography remains 100% pristine standard Persian (0 diacritics).
 * 3. Phonetization is restricted strictly to TTS synthesis.
 * 4. Critical proper nouns must have verified audio or approved audio asset fallback.
 */

export type PronunciationCategory =
  | 'proper-noun'
  | 'institution'
  | 'arabic-term'
  | 'medical-term'
  | 'abbreviation'
  | 'special-term';

export type PronunciationPriority = 'critical' | 'high' | 'normal';

/**
 * Criticality level defining strictness of audio validation:
 * - 'critical-proper-noun': Must have verified audio or approved asset. Fails build if unresolved.
 * - 'important': Recommended verification; emits warning if unverified.
 * - 'normal': Standard phonetic override without blocking gate.
 */
export type CriticalityLevel = 'critical-proper-noun' | 'important' | 'normal';

/**
 * Fallback policy if neural TTS engine mispronounces or degrades:
 * - 'use-approved-asset': Splice pre-recorded/approved canonical audio asset into stem.
 * - 'allow-tts-fallback': Attempt secondary phonetized TTS representation.
 * - 'fail-loudly': Throw build-time error and abort render.
 */
export type FallbackPolicy =
  | 'use-approved-asset'
  | 'allow-tts-fallback'
  | 'fail-loudly';

/**
 * Status of audio verification:
 * - 'unvalidated': String transform only, audio not yet checked.
 * - 'candidate-generated': Audio candidate synthesized and saved for review.
 * - 'auditory-verified': Human or automated acoustic validation passed.
 * - 'approved-asset-locked': Canonical audio asset locked into master audio stream.
 */
export type AudioValidationStatus =
  | 'unvalidated'
  | 'candidate-generated'
  | 'auditory-verified'
  | 'approved-asset-locked';

export interface PronunciationEntry {
  /** The pristine, authorized human-readable display string */
  display: string;
  /** The experimentally validated pronunciation-controlled representation for TTS */
  tts: string;
  /** Semantic linguistic category */
  category: PronunciationCategory;
  /** Priority level for audit enforcement */
  priority: PronunciationPriority;
  /** Criticality classification (V17 extension) */
  criticality: CriticalityLevel;
  /** Fallback policy if TTS fails (V17 extension) */
  fallbackPolicy: FallbackPolicy;
  /** Current validation status of the audio layer (V17 extension) */
  audioValidationStatus: AudioValidationStatus;
  /** Path to approved canonical audio asset if fallback policy requires it */
  approvedAudioAsset?: string;
  /** International Phonetic Alphabet target transcription */
  ipa?: string;
  /** Directorial notes explaining why this override is required */
  notes?: string;
  /** List of alternative candidate variants tested across TTS engines */
  testedVariants?: string[];
  /** Optional secondary fallback representation if engine rejects primary */
  fallbackTts?: string;
  /** Contextual sentence in which this term appears in narration */
  contextText?: string;
  /** Approximate time boundary in master audio (seconds) */
  timeRangeInMaster?: {
    startSec: number;
    endSec: number;
  };
}

export interface ResolutionResult {
  /** The resulting TTS text after all overrides have been safely applied */
  ttsText: string;
  /** The original unchanged display text */
  displayText: string;
  /** List of terms that were matched and replaced */
  appliedOverrides: Array<{
    term: string;
    replacedWith: string;
    occurrences: number;
    category: PronunciationCategory;
    criticality: CriticalityLevel;
    audioStatus: AudioValidationStatus;
  }>;
  /** Flag indicating whether any critical priority terms were resolved */
  hasCriticalOverrides: boolean;
  /** List of critical terms that require audio verification */
  criticalTerms: string[];
}

export interface PronunciationAuditReport {
  totalTermsRegistered: number;
  criticalTermsCount: number;
  allTermsValid: boolean;
  zeroDisplayLeakage: boolean;
  audioVerifiedCount: number;
  issues: string[];
}
