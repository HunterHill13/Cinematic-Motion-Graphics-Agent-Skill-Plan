/**
 * ============================================================================
 * DEPTH AMBIGUITY GATE (PHASE 5C)
 * ============================================================================
 * 
 * Rejects vague, ungrounded buzzwords ("make it 3D", "add depth", "more dimensional",
 * "cinematic depth", "make it pop", "super 3D") and prevents fake depth tricks
 * (e.g. drop-shadow, blur, scale pulse pretending to be spatial architecture).
 * ============================================================================
 */

import { SpatialDepthContract } from './depthSchema';

export class DepthDirectionAmbiguityError extends Error {
  public readonly code: string = 'DEPTH_DIRECTION_AMBIGUOUS';

  constructor(message: string) {
    super(`[DEPTH_DIRECTION_AMBIGUOUS] ${message}`);
    this.name = 'DepthDirectionAmbiguityError';
    Object.setPrototypeOf(this, DepthDirectionAmbiguityError.prototype);
  }
}

export class DepthAmbiguityGate {
  private static readonly VAGUE_DEPTH_PATTERNS: RegExp[] = [
    /\b(make\s+it\s+(?:more\s+)?3d)\b/i,
    /\b(add\s+depth)\b/i,
    /\b(more\s+dimensional)\b/i,
    /\b(cinematic\s+depth)\b/i,
    /\b(make\s+it\s+immersive)\b/i,
    /\b(make\s+it\s+pop)\b/i,
    /\b(super\s+3d)\b/i,
    /\b(cool\s+depth)\b/i,
    /\b(awesome\s+depth)\b/i,
    /\b(feel\s+more\s+3d)\b/i,
  ];

  private static readonly GROUNDED_SPATIAL_TOKENS: string[] = [
    'foreground',
    'midground',
    'background',
    'deep background',
    'in front of',
    'behind',
    'occlude',
    'framing',
    'parallax',
    'layer',
    'depth plane',
    'z-axis',
    'toward viewer',
    'away from viewer',
    'corridor',
    'depth corridor',
    'spatial',
    'orbit',
    'surround',
  ];

  /**
   * Evaluates natural language intent. If vague buzzwords are used without
   * grounded spatial tokens, throws DepthDirectionAmbiguityError.
   */
  public static validateNaturalIntent(text: string): void {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();

    // Pure vague buzzword check (e.g. "make the scene feel more 3D and immersive")
    const isPureVagueBuzzword =
      (lower.includes('3d') || lower.includes('immersive') || lower.includes('pop') || lower.includes('depth')) &&
      !this.GROUNDED_SPATIAL_TOKENS.some((tok) => lower.includes(tok));

    if (isPureVagueBuzzword) {
      throw new DepthDirectionAmbiguityError(
        `Natural language depth intent "${trimmed}" relies on abstract buzzwords without concrete spatial layering. Specify foreground/midground/background positions, occlusion, or z-axis motion.`
      );
    }

    for (const pattern of this.VAGUE_DEPTH_PATTERNS) {
      if (pattern.test(lower)) {
        const hasGroundedToken = this.GROUNDED_SPATIAL_TOKENS.some((tok) => lower.includes(tok));
        if (!hasGroundedToken) {
          throw new DepthDirectionAmbiguityError(
            `Spatial intent contains ambiguous phrase matching ${pattern}. Real 2.5D depth requires explicit entity placement across depth bands (foreground, midground, background) and spatial relationships.`
          );
        }
      }
    }
  }

  /**
   * Checks whether a spatial contract relies on fake depth or lacks grounding.
   */
  public static validateContract(contract: SpatialDepthContract): void {
    if (!contract.id || contract.id.trim().length === 0) {
      throw new DepthDirectionAmbiguityError('SpatialDepthContract id cannot be empty.');
    }

    if (contract.isFlatGraphicOverride) {
      return;
    }

    if (!contract.placements || contract.placements.length === 0) {
      throw new DepthDirectionAmbiguityError('SpatialDepthContract must declare entity placements.');
    }

    // Check for fake depth tricks masquerading as spatial architecture
    for (const p of contract.placements) {
      if (
        (p as any).fakeDepth === true ||
        (p.semanticSpatialRole && /fake\s+depth|css\s+blur\s+only|drop-shadow\s+only/i.test(p.semanticSpatialRole))
      ) {
        throw new DepthDirectionAmbiguityError(
          `Entity "${p.entityId}" declares fake depth styling pretending to be a spatial architecture. Drop-shadows and blurs alone do not constitute a 2.5D spatial model.`
        );
      }
    }
  }
}
