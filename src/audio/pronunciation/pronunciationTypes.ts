/**
/**
 * V16 PRONUNCIATION SYSTEM - TYPES
 * 
 * Defines the core schemas for the deterministic Persian pronunciation pipeline.
 * Enforces strict separation: DISPLAY TEXT ≠ TTS TEXT.
 */

export type PronunciationCategory =
  | 'proper-noun'
  | 'institution'
  | 'arabic-term'
  | 'medical-term'
  | 'abbreviation'
  | 'special-term';

export type PronunciationPriority = 'critical' | 'high' | 'normal';

export interface PronunciationEntry {
  /** The pristine, authorized human-readable display string */
  display: string;
  /** The experimentally validated pronunciation-controlled representation for TTS */
  tts: string;
  /** Semantic linguistic category */
  category: PronunciationCategory;
  /** Priority level for audit enforcement */
  priority: PronunciationPriority;
  /** International Phonetic Alphabet target transcription */
  ipa?: string;
  /** Directorial notes explaining why this override is required */
  notes?: string;
  /** List of alternative candidate variants tested across TTS engines */
  testedVariants?: string[];
  /** Optional secondary fallback representation if engine rejects primary */
  fallbackTts?: string;
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
  }>;
  /** Flag indicating whether any critical priority terms were resolved */
  hasCriticalOverrides: boolean;
}

export interface PronunciationAuditReport {
  totalTermsRegistered: number;
  criticalTermsCount: number;
  allTermsValid: boolean;
  zeroDisplayLeakage: boolean;
  issues: string[];
}
