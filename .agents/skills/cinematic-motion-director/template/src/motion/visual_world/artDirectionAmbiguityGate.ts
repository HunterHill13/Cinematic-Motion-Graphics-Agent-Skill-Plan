/**
 * ============================================================================
 * ART DIRECTION AMBIGUITY GATE (PHASE 5A)
 * ============================================================================
 * 
 * Enforces concrete aesthetic and visual grammar:
 *   Rejects vague adjectives ("cinematic", "premium", "cool", "beautiful", "dynamic")
 *   when used without concrete contrast, depth, color, or compositional grounding.
 * ============================================================================
 */

import { ArtDirectionContract } from './visualWorldSchema';

export class VisualDirectionAmbiguityError extends Error {
  public code = 'VISUAL_DIRECTION_AMBIGUOUS';

  constructor(message: string) {
    super(`[VISUAL_DIRECTION_AMBIGUOUS] ${message}`);
    this.name = 'VisualDirectionAmbiguityError';
  }
}

export const VAGUE_AESTHETIC_PHRASES = [
  'cinematic',
  'make it cinematic',
  'look cinematic',
  'premium',
  'make it premium',
  'beautiful',
  'make it beautiful',
  'dynamic',
  'make it dynamic',
  'cool',
  'make it cool',
  'high quality',
  'make it high quality',
  'awesome',
  'make it look good',
  'aesthetic',
];

export class ArtDirectionAmbiguityGate {
  /**
   * Assesses a natural language art direction prompt.
   * Throws VisualDirectionAmbiguityError if the prompt is purely vague buzzwords
   * without concrete visual or environmental grounding.
   */
  public static validateNaturalIntent(intent: string): void {
    const lower = intent.trim().toLowerCase();

    // Check if the prompt consists exclusively of vague words
    const isVagueOnly = VAGUE_AESTHETIC_PHRASES.some(
      (vague) => lower === vague || lower === `${vague}.` || lower === `${vague}!`
    );

    if (isVagueOnly) {
      throw new VisualDirectionAmbiguityError(
        `Creative intent "${intent}" is purely abstract and lacks concrete visual style, contrast, depth, or atmospheric parameters.`
      );
    }

    // Check for vague statements lacking concrete tokens
    const hasVagueToken = VAGUE_AESTHETIC_PHRASES.some((vague) => lower.includes(vague));
    if (hasVagueToken) {
      const hasConcreteVisualToken =
        lower.includes('contrast') ||
        lower.includes('depth') ||
        lower.includes('color') ||
        lower.includes('lighting') ||
        lower.includes('black hole') ||
        lower.includes('cell') ||
        lower.includes('device') ||
        lower.includes('stars') ||
        lower.includes('accretion') ||
        lower.includes('plasma') ||
        lower.includes('membrane') ||
        lower.includes('scientific') ||
        lower.includes('biomedical') ||
        lower.includes('industrial') ||
        lower.includes('diagram') ||
        lower.includes('minimal') ||
        lower.includes('dark') ||
        lower.includes('light');

      if (!hasConcreteVisualToken) {
        throw new VisualDirectionAmbiguityError(
          `Creative intent "${intent}" relies on vague aesthetic buzzwords without concrete visual grounding or subject hierarchy.`
        );
      }
    }
  }

  /**
   * Validates an ArtDirectionContract against emptiness or buzzword masquerading.
   */
  public static validateContract(contract: ArtDirectionContract): void {
    const styleLower = (contract.visualStyle || '').trim().toLowerCase();
    const contrastLower = (contract.contrastProfile || '').trim().toLowerCase();
    const depthLower = (contract.depthProfile || '').trim().toLowerCase();

    // Rejection 1: Isolated buzzword as visualStyle
    if (VAGUE_AESTHETIC_PHRASES.includes(styleLower)) {
      throw new VisualDirectionAmbiguityError(
        `visualStyle "${contract.visualStyle}" is an ambiguous buzzword. Must specify concrete style (e.g., "cinematic_scientific", "clinical_biomedical", "industrial_tech").`
      );
    }

    // Rejection 2: Missing or purely vague contrast
    if (!contrastLower || VAGUE_AESTHETIC_PHRASES.includes(contrastLower)) {
      throw new VisualDirectionAmbiguityError(
        `contrastProfile "${contract.contrastProfile}" must specify a concrete contrast ratio (e.g., "high_hero_low_environment", "balanced_midtones").`
      );
    }

    // Rejection 3: Missing or purely vague depth
    if (!depthLower || VAGUE_AESTHETIC_PHRASES.includes(depthLower)) {
      throw new VisualDirectionAmbiguityError(
        `depthProfile "${contract.depthProfile}" must specify a concrete depth strategy (e.g., "layered_2_5d", "isometric_diagrammatic", "deep_volumetric").`
      );
    }

    // Rejection 4: Missing or invalid color language
    if (!contract.colorLanguage || !contract.colorLanguage.primaryHue || !contract.colorLanguage.backgroundHex) {
      throw new VisualDirectionAmbiguityError(
        'ArtDirectionContract must declare an explicit ColorLanguageSpec with primaryHue, secondaryHue, and backgroundHex.'
      );
    }
  }
}
