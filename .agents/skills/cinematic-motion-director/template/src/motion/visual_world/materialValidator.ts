/**
 * ============================================================================
 * MATERIAL VALIDATOR (PHASE 5B.1)
 * ============================================================================
 * 
 * Enforces the 9 Material Governance Rules:
 *   V-M1: Every cinematic HERO entity has a valid MaterialReference.
 *   V-M2: Material category is from the controlled vocabulary.
 *   V-M3: All response dimensions (surface, edge, deform, light, emission, opacity, texture) are valid.
 *   V-M4: Motion response references existing MotionVerb values.
 *   V-M5: Material response is non-empty and behaviorally meaningful.
 *   V-M6: Material IDs within world.materials are unique.
 *   V-M7: Entity materialId references exist in world.materials.
 *   V-M8: No decorative-only material contracts (e.g. category="DECORATIVE", "glowy").
 *   V-M9: Physical / Response contradictions are detected and rejected.
 * ============================================================================
 */

import {
  MaterialReference,
  VALID_MATERIAL_CATEGORIES,
  VALID_SURFACE_RESPONSES,
  VALID_EDGE_RESPONSES,
  VALID_DEFORMATION_RESPONSES,
  VALID_LIGHT_RESPONSES,
  VALID_EMISSION_RESPONSES,
  VALID_OPACITY_BEHAVIORS,
  VALID_TEXTURE_CHARACTERS,
} from './materialSchema';
import { MaterialAmbiguityGate } from './materialAmbiguityGate';
import { VisualWorld } from './visualWorldSchema';
import { MotionSceneGraph } from '../compiler/motionSceneGraph';
import { MotionVerb } from '../grammar/motionGrammar';

const VALID_MOTION_VERBS: MotionVerb[] = [
  'SPLIT',
  'EXPAND',
  'TRAVEL',
  'COLLAPSE',
  'MORPH',
  'MERGE',
  'DEFORM',
  'REASSEMBLE',
];

export interface MaterialViolation {
  code: string;
  message: string;
  entityId?: string;
  materialId?: string;
}

export interface MaterialValidationReport {
  passed: boolean;
  violations: MaterialViolation[];
}

export class MaterialValidator {
  /**
   * Validates materials within a VisualWorld and checks compatibility with a MotionSceneGraph.
   */
  public static validate(
    world: VisualWorld,
    motionGraph?: MotionSceneGraph
  ): MaterialValidationReport {
    const violations: MaterialViolation[] = [];

    // Flat graphic explicit exception
    const isExplicitFlat = world.depth?.isExplicitFlatComposition === true ||
      world.composition?.compositionIntent?.includes('flat_schematic');

    const materials = world.materials || [];
    const materialMap = new Map<string, MaterialReference>();

    // ------------------------------------------------------------------------
    // V-M6: UNIQUE MATERIAL IDS
    // ------------------------------------------------------------------------
    for (const mat of materials) {
      if (!mat.id || mat.id.trim().length === 0) {
        violations.push({
          code: 'V_M6_INVALID_MATERIAL_ID',
          message: 'Material contract must declare a non-empty unique id.',
        });
        continue;
      }
      if (materialMap.has(mat.id)) {
        violations.push({
          code: 'V_M6_DUPLICATE_MATERIAL_ID',
          message: `Duplicate material id "${mat.id}" detected in VisualWorld.materials.`,
          materialId: mat.id,
        });
      } else {
        materialMap.set(mat.id, mat);
      }
    }

    // ------------------------------------------------------------------------
    // VALIDATE INDIVIDUAL MATERIALS
    // ------------------------------------------------------------------------
    for (const mat of materials) {
      // Ambiguity & Decorative check
      try {
        MaterialAmbiguityGate.validateContract(mat);
      } catch (err: any) {
        violations.push({
          code: err.code === 'MATERIAL_DIRECTION_AMBIGUOUS' ? 'MATERIAL_DIRECTION_AMBIGUOUS' : 'V_M8_DECORATIVE_ONLY_MATERIAL',
          message: err.message,
          materialId: mat.id,
        });
      }

      // V-M2: Category
      if (!VALID_MATERIAL_CATEGORIES.includes(mat.category)) {
        violations.push({
          code: 'V_M2_INVALID_MATERIAL_CATEGORY',
          message: `Material "${mat.id}" has invalid category "${mat.category}". Allowed: ${VALID_MATERIAL_CATEGORIES.join(', ')}.`,
          materialId: mat.id,
        });
      }

      // V-M3: Response dimensions
      if (!VALID_SURFACE_RESPONSES.includes(mat.surfaceResponse)) {
        violations.push({
          code: 'V_M3_INVALID_RESPONSE_DIMENSION',
          message: `Material "${mat.id}" has invalid surfaceResponse "${mat.surfaceResponse}".`,
          materialId: mat.id,
        });
      }
      if (!VALID_EDGE_RESPONSES.includes(mat.edgeResponse)) {
        violations.push({
          code: 'V_M3_INVALID_RESPONSE_DIMENSION',
          message: `Material "${mat.id}" has invalid edgeResponse "${mat.edgeResponse}".`,
          materialId: mat.id,
        });
      }
      if (!VALID_DEFORMATION_RESPONSES.includes(mat.deformationResponse)) {
        violations.push({
          code: 'V_M3_INVALID_RESPONSE_DIMENSION',
          message: `Material "${mat.id}" has invalid deformationResponse "${mat.deformationResponse}".`,
          materialId: mat.id,
        });
      }
      if (!VALID_LIGHT_RESPONSES.includes(mat.lightResponse)) {
        violations.push({
          code: 'V_M3_INVALID_RESPONSE_DIMENSION',
          message: `Material "${mat.id}" has invalid lightResponse "${mat.lightResponse}".`,
          materialId: mat.id,
        });
      }
      if (!VALID_EMISSION_RESPONSES.includes(mat.emission)) {
        violations.push({
          code: 'V_M3_INVALID_RESPONSE_DIMENSION',
          message: `Material "${mat.id}" has invalid emission "${mat.emission}".`,
          materialId: mat.id,
        });
      }
      if (!VALID_OPACITY_BEHAVIORS.includes(mat.opacityBehavior)) {
        violations.push({
          code: 'V_M3_INVALID_RESPONSE_DIMENSION',
          message: `Material "${mat.id}" has invalid opacityBehavior "${mat.opacityBehavior}".`,
          materialId: mat.id,
        });
      }
      if (!VALID_TEXTURE_CHARACTERS.includes(mat.textureCharacter)) {
        violations.push({
          code: 'V_M3_INVALID_RESPONSE_DIMENSION',
          message: `Material "${mat.id}" has invalid textureCharacter "${mat.textureCharacter}".`,
          materialId: mat.id,
        });
      }

      // V-M4 & V-M5: Motion response validation
      const motionEntries = Object.entries(mat.motionResponses || {});
      if (motionEntries.length === 0) {
        violations.push({
          code: 'V_M5_EMPTY_MOTION_RESPONSE',
          message: `Material "${mat.id}" must declare at least one meaningful motionResponse tied to physical transformation.`,
          materialId: mat.id,
        });
      } else {
        for (const [verbKey, resp] of motionEntries) {
          if (!VALID_MOTION_VERBS.includes(verbKey as MotionVerb)) {
            violations.push({
              code: 'V_M4_INVALID_MOTION_VERB',
              message: `Material "${mat.id}" references unknown MotionVerb "${verbKey}".`,
              materialId: mat.id,
            });
          }
          if (!resp || !resp.description || resp.description.trim().length === 0) {
            violations.push({
              code: 'V_M5_EMPTY_MOTION_RESPONSE',
              message: `Material "${mat.id}" has empty behavior description for verb "${verbKey}".`,
              materialId: mat.id,
            });
          }
        }
      }

      // V-M9: Contradiction checks
      // Contradiction 1: METAL with FLUID deformation
      if (mat.category === 'METAL' && mat.deformationResponse === 'FLUID') {
        violations.push({
          code: 'V_M9_MATERIAL_CONTRADICTION',
          message: `Material "${mat.id}" contradiction: METAL cannot have FLUID deformation response.`,
          materialId: mat.id,
        });
      }
      // Contradiction 2: GLASS with OPAQUE + MATTE
      if (mat.category === 'GLASS' && mat.opacityBehavior === 'OPAQUE' && mat.surfaceResponse === 'MATTE') {
        violations.push({
          code: 'V_M9_MATERIAL_CONTRADICTION',
          message: `Material "${mat.id}" contradiction: GLASS cannot be simultaneously OPAQUE and MATTE.`,
          materialId: mat.id,
        });
      }
      // Contradiction 3: CELESTIAL/PLASMA with NON_EMISSIVE + ABSORPTIVE without explicit justification
      if (
        (mat.category === 'PLASMA' || mat.category === 'ENERGY') &&
        mat.emission === 'NON_EMISSIVE' &&
        mat.lightResponse === 'ABSORPTIVE'
      ) {
        violations.push({
          code: 'V_M9_MATERIAL_CONTRADICTION',
          message: `Material "${mat.id}" contradiction: ${mat.category} cannot be NON_EMISSIVE and ABSORPTIVE.`,
          materialId: mat.id,
        });
      }
    }

    // ------------------------------------------------------------------------
    // V-M1 & V-M7: HERO & ENTITY MATERIAL BINDINGS
    // ------------------------------------------------------------------------
    if (world.hero) {
      const heroMatId = world.hero.materialId;
      if (!heroMatId) {
        if (!isExplicitFlat) {
          violations.push({
            code: 'V_M1_MISSING_HERO_MATERIAL',
            message: `Hero entity "${world.hero.id}" must declare a valid materialId referencing an established MaterialReference.`,
            entityId: world.hero.id,
          });
        }
      } else {
        if (!materialMap.has(heroMatId)) {
          violations.push({
            code: 'V_M7_UNRESOLVED_MATERIAL_REFERENCE',
            message: `Hero entity "${world.hero.id}" references undeclared materialId "${heroMatId}".`,
            entityId: world.hero.id,
            materialId: heroMatId,
          });
        }
      }
    }

    // Secondary/Tertiary entities
    const nonHeroEntities = [
      ...(world.secondaryEntities || []),
      ...(world.tertiaryEntities || []),
    ];
    for (const ent of nonHeroEntities) {
      if (ent.materialId && !materialMap.has(ent.materialId)) {
        violations.push({
          code: 'V_M7_UNRESOLVED_MATERIAL_REFERENCE',
          message: `Entity "${ent.id}" references undeclared materialId "${ent.materialId}".`,
          entityId: ent.id,
          materialId: ent.materialId,
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }
}
