/**
 * ============================================================================
 * LIGHTING AMBIGUITY GATE (PHASE 5B.2)
 * ============================================================================
 * 
 * Rejects vague, ungrounded buzzwords ("cinematic lighting", "beautiful lighting",
 * "premium lighting", "dramatic lighting") and prevents decorative glow/drop-shadows
 * from masquerading as a physical/directional lighting contract.
 * ============================================================================
 */

import { LightingContract, LightSourceReference } from './lightingSchema';

export class LightingDirectionAmbiguityError extends Error {
  public readonly code: string = 'LIGHTING_DIRECTION_AMBIGUOUS';

  constructor(message: string) {
    super(`[LIGHTING_DIRECTION_AMBIGUOUS] ${message}`);
    this.name = 'LightingDirectionAmbiguityError';
    Object.setPrototypeOf(this, LightingDirectionAmbiguityError.prototype);
  }
}

export class LightingAmbiguityGate {
  private static readonly VAGUE_LIGHTING_PATTERNS: RegExp[] = [
    /\b(cinematic\s+lighting)\b/i,
    /\b(beautiful\s+lighting)\b/i,
    /\b(premium\s+lighting)\b/i,
    /\b(cool\s+lighting)\b/i,
    /\b(dramatic\s+lighting)\b/i,
    /\b(realistic\s+lighting)\b/i,
    /\b(nice\s+shadows?)\b/i,
    /\b(professional\s+lighting)\b/i,
    /\b(epic\s+lighting)\b/i,
    /\b(glowy\s+lighting)\b/i,
    /\b(awesome\s+lighting)\b/i,
    /\b(great\s+lighting)\b/i,
  ];

  private static readonly GROUNDED_LIGHTING_TOKENS: string[] = [
    'key',
    'fill',
    'rim',
    'ambient',
    'emissive',
    'specular',
    'direction',
    'upper-left',
    'upper-right',
    'lower-left',
    'lower-right',
    'overhead',
    'backlight',
    'highlight',
    'falloff',
    'terminator',
    'subsurface',
    'softness',
    'diffuse',
    'reflection',
    'luminescent',
    'accretion',
  ];

  /**
   * Evaluates natural language intent. If vague buzzwords are used without
   * directional/grounded tokens, throws LightingDirectionAmbiguityError.
   */
  public static validateNaturalIntent(text: string): void {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();

    // Check for purely vague buzzword requests: e.g. "make the scene look cinematic and premium"
    const isPureVagueBuzzword =
      (lower.includes('cinematic') || lower.includes('premium') || lower.includes('dramatic')) &&
      !this.GROUNDED_LIGHTING_TOKENS.some((tok) => lower.includes(tok));

    if (isPureVagueBuzzword) {
      throw new LightingDirectionAmbiguityError(
        `Natural language lighting intent "${trimmed}" relies on abstract buzzwords without directional or physical grounding. Specify key light direction, fill intensity, or material lighting response.`
      );
    }

    for (const pattern of this.VAGUE_LIGHTING_PATTERNS) {
      if (pattern.test(lower)) {
        const hasGroundedToken = this.GROUNDED_LIGHTING_TOKENS.some((tok) => lower.includes(tok));
        if (!hasGroundedToken) {
          throw new LightingDirectionAmbiguityError(
            `Lighting intent contains ambiguous phrase matching ${pattern}. Real lighting requires directional position (e.g. key light from upper-left), intensity, and material interaction.`
          );
        }
      }
    }
  }

  /**
   * Checks whether a lighting contract is purely decorative or ambiguous.
   */
  public static validateContract(contract: LightingContract): void {
    if (!contract.id || contract.id.trim().length === 0) {
      throw new LightingDirectionAmbiguityError('LightingContract id cannot be empty.');
    }

    if (contract.isFlatGraphicOverride) {
      return;
    }

    if (!contract.sources || contract.sources.length === 0) {
      throw new LightingDirectionAmbiguityError('LightingContract must declare at least one light source.');
    }

    // Check for fake decorative lights pretending to be lighting
    for (const src of contract.sources) {
      if (
        (src as any).type === 'DECORATIVE' ||
        (src as any).glow === true ||
        (src.name && /decorative\s+glow/i.test(src.name))
      ) {
        throw new LightingDirectionAmbiguityError(
          `Light source "${src.id}" is a decorative glow effect pretending to be a lighting model. Drop shadows and CSS glows are not lighting systems.`
        );
      }
    }
  }
}
