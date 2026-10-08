/**
 * ============================================================================
 * MATERIAL AMBIGUITY GATE (PHASE 5B.1)
 * ============================================================================
 * 
 * Enforces concrete material vocabulary and rejects vague aesthetic buzzwords
 * ("premium", "cinematic", "realistic", "cool", "futuristic", "glowy") when used
 * without concrete physical substance, surface, or deformation grounding.
 * ============================================================================
 */

import { MaterialReference, VALID_MATERIAL_CATEGORIES } from './materialSchema';

export class MaterialDirectionAmbiguityError extends Error {
  public code = 'MATERIAL_DIRECTION_AMBIGUOUS';

  constructor(message: string) {
    super(`[MATERIAL_DIRECTION_AMBIGUOUS] ${message}`);
    this.name = 'MaterialDirectionAmbiguityError';
  }
}

export const VAGUE_MATERIAL_PHRASES = [
  'premium',
  'premium material',
  'cinematic',
  'cinematic material',
  'beautiful',
  'beautiful material',
  'cool',
  'cool material',
  'high quality',
  'high quality material',
  'realistic',
  'realistic material',
  'futuristic',
  'futuristic material',
  'glowy',
  'glowy material',
  'shiny',
  'shiny material',
  'fancy',
  'good material',
];

export class MaterialAmbiguityGate {
  /**
   * Evaluates natural language material intent.
   * Throws MaterialDirectionAmbiguityError if the prompt consists of vague buzzwords
   * without concrete material grounding.
   */
  public static validateNaturalIntent(intent: string): void {
    const trimmed = (intent || '').trim();
    if (!trimmed) {
      throw new MaterialDirectionAmbiguityError(
        'Material description is empty. An explicit material category or concrete physical grounding is required.'
      );
    }

    const lower = trimmed.toLowerCase();

    // Rejection 1: Exact vague phrase match
    const isVagueOnly = VAGUE_MATERIAL_PHRASES.some(
      (vague) => lower === vague || lower === `${vague}.` || lower === `${vague}!`
    );
    if (isVagueOnly) {
      throw new MaterialDirectionAmbiguityError(
        `Material intent "${intent}" is purely abstract and lacks concrete substance, surface, or deformation parameters.`
      );
    }

    // Rejection 2: Vague keyword without concrete physical substance tokens
    const hasVagueToken = VAGUE_MATERIAL_PHRASES.some((vague) => lower.includes(vague));
    if (hasVagueToken) {
      const hasSubstanceToken =
        lower.includes('plasma') ||
        lower.includes('metal') ||
        lower.includes('steel') ||
        lower.includes('iron') ||
        lower.includes('organic') ||
        lower.includes('cell') ||
        lower.includes('tissue') ||
        lower.includes('membrane') ||
        lower.includes('glass') ||
        lower.includes('energy') ||
        lower.includes('smoke') ||
        lower.includes('liquid') ||
        lower.includes('water') ||
        lower.includes('fluid') ||
        lower.includes('stone') ||
        lower.includes('rock') ||
        lower.includes('celestial') ||
        lower.includes('singularity') ||
        lower.includes('accretion') ||
        lower.includes('diagram');

      if (!hasSubstanceToken) {
        throw new MaterialDirectionAmbiguityError(
          `Material description "${intent}" relies on vague aesthetic buzzwords without concrete material grounding.`
        );
      }
    }
  }

  /**
   * Validates a MaterialReference contract to prevent empty or decorative-only definitions.
   */
  public static validateContract(contract: MaterialReference): void {
    if (!contract) {
      throw new MaterialDirectionAmbiguityError('Material contract is null or undefined.');
    }

    // Check category validity
    if (!contract.category || !VALID_MATERIAL_CATEGORIES.includes(contract.category)) {
      throw new MaterialDirectionAmbiguityError(
        `Material category "${(contract as any).category}" is unrecognized or empty. Must be one of: ${VALID_MATERIAL_CATEGORIES.join(', ')}.`
      );
    }

    // Check name / description for buzzword camouflage
    const nameLower = (contract.name || '').toLowerCase().trim();
    if (VAGUE_MATERIAL_PHRASES.includes(nameLower)) {
      throw new MaterialDirectionAmbiguityError(
        `Material name "${contract.name}" is an ungrounded buzzword.`
      );
    }

    // Decorative-only detection
    if (
      (contract as any).category === 'DECORATIVE' ||
      nameLower.includes('decorative only') ||
      nameLower === 'glowy'
    ) {
      throw new MaterialDirectionAmbiguityError(
        'Decorative-only material contracts are prohibited. Materials must define physical substance and motion responses.'
      );
    }
  }
}
