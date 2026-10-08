/**
 * ============================================================================
 * VISUAL WORLD VALIDATOR (PHASE 5A)
 * ============================================================================
 * 
 * Enforces the 8 Cardinal Rules of Visual World Construction:
 *   V1 - Hero Exists (PRIMARY/HERO mandatory)
 *   V2 - Hero Identity Valid (Persistent, identifiable, purposeful)
 *   V3 - Hierarchy Valid (PRIMARY cannot be demoted; Environment priority < Hero)
 *   V4 - Depth Valid (No flat plane collapse unless isExplicitFlatComposition)
 *   V5 - Composition Exists (Explicit composition intent & focal region)
 *   V6 - Art Direction Complete (Grounding over buzzwords)
 *   V7 - Environment Purposeful (More elements != better quality)
 *   V8 - Motion Graph Compatible (Hero alignment between VisualWorld & MotionGraph)
 * ============================================================================
 */

import { VisualWorld, VisualEntityIdentity } from './visualWorldSchema';
import { ArtDirectionAmbiguityGate, VisualDirectionAmbiguityError } from './artDirectionAmbiguityGate';
import { MotionSceneGraph } from '../compiler/motionSceneGraph';

export interface VisualWorldViolation {
  code: string;
  message: string;
  entityId?: string;
}

export interface VisualWorldValidationReport {
  passed: boolean;
  worldId: string;
  violations: VisualWorldViolation[];
  heroResolved: boolean;
  hierarchyLevels: number;
  depthLayersCount: number;
}

export class VisualWorldValidator {
  /**
   * Validates a VisualWorld object in isolation or against a MotionSceneGraph.
   */
  public static validate(
    world: VisualWorld,
    motionGraph?: MotionSceneGraph
  ): VisualWorldValidationReport {
    const violations: VisualWorldViolation[] = [];

    // ------------------------------------------------------------------------
    // V1 — HERO EXISTS
    // ------------------------------------------------------------------------
    if (!world.hero || !world.hero.id) {
      violations.push({
        code: 'V1_MISSING_HERO_ENTITY',
        message: 'VisualWorld must define a primary Hero entity with importance PRIMARY and semanticRole HERO.',
      });
    }

    // ------------------------------------------------------------------------
    // V2 — HERO IDENTITY VALID
    // ------------------------------------------------------------------------
    if (world.hero) {
      if (world.hero.importance !== 'PRIMARY' || world.hero.semanticRole !== 'HERO') {
        violations.push({
          code: 'V2_INVALID_HERO_IDENTITY',
          message: `Hero entity "${world.hero.id}" must have importance PRIMARY and semanticRole HERO (received: importance=${world.hero.importance}, role=${world.hero.semanticRole}).`,
          entityId: world.hero.id,
        });
      }

      if (!world.hero.persistence) {
        violations.push({
          code: 'V2_NON_PERSISTENT_HERO',
          message: `Hero entity "${world.hero.id}" must have persistence=true to maintain visual identity across beats.`,
          entityId: world.hero.id,
        });
      }

      if (!world.hero.visualRole || world.hero.visualRole.trim().length === 0) {
        violations.push({
          code: 'V2_MISSING_VISUAL_ROLE',
          message: `Hero entity "${world.hero.id}" must declare an explicit visualRole describing its visual form.`,
          entityId: world.hero.id,
        });
      }

      if (!world.hero.semanticPurpose || world.hero.semanticPurpose.trim().length === 0) {
        violations.push({
          code: 'V2_MISSING_SEMANTIC_PURPOSE',
          message: `Hero entity "${world.hero.id}" must declare an explicit semanticPurpose.`,
          entityId: world.hero.id,
        });
      }
    }

    // ------------------------------------------------------------------------
    // V3 — HIERARCHY VALID
    // ------------------------------------------------------------------------
    const allEntities: VisualEntityIdentity[] = [
      ...(world.hero ? [world.hero] : []),
      ...(world.secondaryEntities || []),
      ...(world.tertiaryEntities || []),
      ...(world.environmentEntities || []),
    ];

    const heroPriority = world.hero?.visualPriority ?? 1;

    for (const env of world.environmentEntities || []) {
      if (env.importance === 'PRIMARY' || env.semanticRole === 'HERO') {
        violations.push({
          code: 'V3_HIERARCHY_INVERSION',
          message: `Environment entity "${env.id}" cannot masquerade as PRIMARY or HERO.`,
          entityId: env.id,
        });
      }

      // Priority Inversion: Lower numerical value = higher visual prominence
      if (env.visualPriority <= heroPriority) {
        violations.push({
          code: 'V3_ENVIRONMENT_PRIORITY_INVERSION',
          message: `Environment entity "${env.id}" visualPriority (${env.visualPriority}) exceeds or equals Hero visualPriority (${heroPriority}). Hero must remain the focal priority.`,
          entityId: env.id,
        });
      }
    }

    // ------------------------------------------------------------------------
    // V4 — DEPTH VALID
    // ------------------------------------------------------------------------
    if (!world.depth) {
      violations.push({
        code: 'V4_MISSING_DEPTH_MODEL',
        message: 'VisualWorld must define an explicit DepthModel.',
      });
    } else {
      const isExplicitFlat = world.depth.isExplicitFlatComposition === true;
      if (!isExplicitFlat) {
        const uniqueLayers = new Set(allEntities.map((e) => e.depthLayer));
        if (uniqueLayers.size <= 1 && allEntities.length > 1) {
          violations.push({
            code: 'V4_FLAT_DEPTH_COLLAPSE',
            message: 'All entities are assigned to a single depth layer without explicit isExplicitFlatComposition=true. Multi-layered depth is required for cinematic visual staging.',
          });
        }
      }
    }

    // ------------------------------------------------------------------------
    // V5 — COMPOSITION EXISTS
    // ------------------------------------------------------------------------
    if (!world.composition) {
      violations.push({
        code: 'V5_MISSING_COMPOSITION_CONTRACT',
        message: 'VisualWorld must define an explicit CompositionContract.',
      });
    } else {
      if (!world.composition.compositionIntent || world.composition.compositionIntent.trim().length === 0) {
        violations.push({
          code: 'V5_EMPTY_COMPOSITION_INTENT',
          message: 'CompositionContract must specify a concrete compositionIntent (e.g. "centered_hero_with_negative_space").',
        });
      }
      if (!world.composition.heroAnchor) {
        violations.push({
          code: 'V5_MISSING_HERO_ANCHOR',
          message: 'CompositionContract must specify a heroAnchor (e.g. CENTER, LEFT_THIRD, RIGHT_THIRD).',
        });
      }
    }

    // ------------------------------------------------------------------------
    // V6 — ART DIRECTION COMPLETE & NON-VAGUE
    // ------------------------------------------------------------------------
    if (!world.artDirection) {
      violations.push({
        code: 'V6_MISSING_ART_DIRECTION',
        message: 'VisualWorld must define a concrete ArtDirectionContract.',
      });
    } else {
      try {
        ArtDirectionAmbiguityGate.validateContract(world.artDirection);
      } catch (err: any) {
        violations.push({
          code: 'V6_AMBIGUOUS_ART_DIRECTION',
          message: err.message || 'ArtDirectionContract failed ambiguity validation.',
        });
      }
    }

    // ------------------------------------------------------------------------
    // V7 — ENVIRONMENT PURPOSEFUL (MORE ELEMENTS ≠ BETTER QUALITY)
    // ------------------------------------------------------------------------
    const envCount = world.environmentEntities ? world.environmentEntities.length : 0;
    const focalCount = 1 + (world.secondaryEntities?.length || 0) + (world.tertiaryEntities?.length || 0);

    for (const env of world.environmentEntities || []) {
      if (!env.semanticPurpose || env.semanticPurpose.trim().length === 0) {
        violations.push({
          code: 'V7_PURPOSELESS_ENVIRONMENT_ELEMENT',
          message: `Environment entity "${env.id}" lacks semantic purpose. Decorative particles without narrative justification are prohibited.`,
          entityId: env.id,
        });
      }
    }

    // Unmotivated clutter gate: excessive environment ratio (> 5x focal actors)
    if (envCount > 8 && envCount > focalCount * 3) {
      violations.push({
        code: 'V7_EXCESSIVE_ENVIRONMENT_CLUTTER',
        message: `VisualWorld contains ${envCount} environment elements against only ${focalCount} focal entities. Rule: MORE ELEMENTS ≠ BETTER CINEMATIC QUALITY.`,
      });
    }

    // ------------------------------------------------------------------------
    // V8 — MOTION GRAPH COMPATIBILITY
    // ------------------------------------------------------------------------
    if (motionGraph) {
      const motionHero = motionGraph.entities.find((e) => e.role === 'HERO');
      if (motionHero && world.hero) {
        if (motionHero.id !== world.hero.id) {
          violations.push({
            code: 'V8_HERO_MISMATCH',
            message: `MotionSceneGraph hero "${motionHero.id}" does not match VisualWorld hero "${world.hero.id}".`,
            entityId: motionHero.id,
          });
        }
      } else if (!motionHero && world.hero) {
        violations.push({
          code: 'V8_MOTION_GRAPH_MISSING_HERO',
          message: `MotionSceneGraph lacks a HERO entity matching VisualWorld hero "${world.hero.id}".`,
        });
      }
    }

    return {
      passed: violations.length === 0,
      worldId: world.worldId || 'unknown_world',
      violations,
      heroResolved: violations.every((v) => v.code !== 'V1_MISSING_HERO_ENTITY' && v.code !== 'V8_HERO_MISMATCH'),
      hierarchyLevels: new Set(allEntities.map((e) => e.importance)).size,
      depthLayersCount: new Set(allEntities.map((e) => e.depthLayer)).size,
    };
  }
}
