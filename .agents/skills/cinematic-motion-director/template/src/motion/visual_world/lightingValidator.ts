/**
 * ============================================================================
 * LIGHTING VALIDATOR (PHASE 5B.2)
 * ============================================================================
 * 
 * Enforces the 12 Cardinal Rules of Cinematic Lighting Governance:
 *   V-L1: Lighting contract exists in cinematic mode (unless explicit FLAT_GRAPHIC).
 *   V-L2: At least one meaningful light interaction exists for the HERO entity.
 *   V-L3: Light source IDs are unique and types are valid.
 *   V-L4: Light directions are valid (controlled vocabulary).
 *   V-L5: Intensity values are bounded and valid.
 *   V-L6: Color language is valid.
 *   V-L7: Material references resolve against world.materials.
 *   V-L8: Material/light interactions are meaningful and non-empty.
 *   V-L9: Motion-aware lighting responses reference valid canonical MotionVerbs.
 *   V-L10: No decorative-only glow pretending to be lighting.
 *   V-L11: Physical / Material-Lighting contradictions are detected and rejected.
 *   V-L12: Emissive light contributors must resolve to valid emissive materials.
 * ============================================================================
 */

import {
  LightingContract,
  VALID_LIGHT_TYPES,
  VALID_LIGHT_DIRECTIONS,
  VALID_LIGHT_INTENSITIES,
  VALID_LIGHT_COLORS,
  VALID_HIGHLIGHT_RESPONSES,
  VALID_SHADOW_TERMINATORS,
  VALID_EDGE_RIMS,
} from './lightingSchema';
import { LightingAmbiguityGate } from './lightingAmbiguityGate';
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

export interface LightingViolation {
  code: string;
  message: string;
  lightSourceId?: string;
  materialId?: string;
  entityId?: string;
}

export interface LightingValidationReport {
  passed: boolean;
  violations: LightingViolation[];
}

export class LightingValidator {
  /**
   * Validates the LightingContract within a VisualWorld against motion graph.
   */
  public static validate(
    world: VisualWorld,
    motionGraph?: MotionSceneGraph
  ): LightingValidationReport {
    const violations: LightingViolation[] = [];

    // Flat graphic explicit exception
    const isExplicitFlat =
      world.depth?.isExplicitFlatComposition === true ||
      world.composition?.compositionIntent?.includes('flat_schematic') ||
      world.materials?.some((m) => m.category === 'FLAT_GRAPHIC' && m.id === world.hero?.materialId);

    const lighting = (world as any).lighting as LightingContract | undefined;

    // ------------------------------------------------------------------------
    // V-L1: LIGHTING CONTRACT EXISTS IN CINEMATIC MODE
    // ------------------------------------------------------------------------
    if (!lighting) {
      if (!isExplicitFlat) {
        violations.push({
          code: 'V_L1_MISSING_LIGHTING',
          message: 'VisualWorld does not contain a LightingContract in cinematic mode.',
        });
      }
      return {
        passed: violations.length === 0,
        violations,
      };
    }

    if (lighting.isFlatGraphicOverride || isExplicitFlat) {
      return {
        passed: true,
        violations: [],
      };
    }

    // Run Ambiguity Gate checks on contract
    try {
      LightingAmbiguityGate.validateContract(lighting);
    } catch (err: any) {
      violations.push({
        code: 'LIGHTING_DIRECTION_AMBIGUOUS',
        message: err.message,
      });
    }

    // Material Map for reference resolution
    const materialMap = new Map<string, any>();
    if (world.materials) {
      for (const m of world.materials) {
        materialMap.set(m.id, m);
      }
    }

    // Entity Map for entity resolution
    const entityMap = new Map<string, any>();
    if (world.hero) entityMap.set(world.hero.id, world.hero);
    if (world.secondaryEntities) {
      for (const e of world.secondaryEntities) entityMap.set(e.id, e);
    }
    if (world.tertiaryEntities) {
      for (const e of world.tertiaryEntities) entityMap.set(e.id, e);
    }
    if (world.environmentEntities) {
      for (const e of world.environmentEntities) entityMap.set(e.id, e);
    }

    const lightSourceMap = new Map<string, any>();

    // ------------------------------------------------------------------------
    // V-L3: UNIQUE LIGHT SOURCE IDS & VALID LIGHT SOURCE TYPES
    // ------------------------------------------------------------------------
    const sources = lighting.sources || [];
    for (const src of sources) {
      if (!src.id || src.id.trim().length === 0) {
        violations.push({
          code: 'V_L3_INVALID_LIGHT_ID',
          message: 'Light source must declare a non-empty unique id.',
        });
        continue;
      }

      if (lightSourceMap.has(src.id)) {
        violations.push({
          code: 'V_L3_DUPLICATE_LIGHT_ID',
          message: `Duplicate light source id "${src.id}" detected in LightingContract.`,
          lightSourceId: src.id,
        });
      } else {
        lightSourceMap.set(src.id, src);
      }

      if (!VALID_LIGHT_TYPES.includes(src.type)) {
        violations.push({
          code: 'V_L3_INVALID_LIGHT_TYPE',
          message: `Unknown light type "${src.type}". Must be one of: ${VALID_LIGHT_TYPES.join(', ')}`,
          lightSourceId: src.id,
        });
      }

      // ----------------------------------------------------------------------
      // V-L10: NO DECORATIVE-ONLY LIGHTING
      // ----------------------------------------------------------------------
      if (
        (src as any).type === 'DECORATIVE' ||
        (src as any).glow === true ||
        (src.name && /decorative\s+glow/i.test(src.name))
      ) {
        violations.push({
          code: 'V_L10_DECORATIVE_ONLY_LIGHTING',
          message: `Light source "${src.id}" is a decorative glow effect pretending to be a lighting model.`,
          lightSourceId: src.id,
        });
      }

      // ----------------------------------------------------------------------
      // V-L4: VALID LIGHT DIRECTION
      // ----------------------------------------------------------------------
      if (!src.direction || !VALID_LIGHT_DIRECTIONS.includes(src.direction.semantic)) {
        violations.push({
          code: 'V_L4_INVALID_DIRECTION',
          message: `Invalid direction "${src.direction?.semantic}" for light "${src.id}". Must be one of: ${VALID_LIGHT_DIRECTIONS.join(', ')}`,
          lightSourceId: src.id,
        });
      }

      // ----------------------------------------------------------------------
      // V-L5: VALID INTENSITY
      // ----------------------------------------------------------------------
      if (!src.intensity) {
        violations.push({
          code: 'V_L5_INVALID_INTENSITY',
          message: `Light "${src.id}" missing intensity definition.`,
          lightSourceId: src.id,
        });
      } else {
        if (!VALID_LIGHT_INTENSITIES.includes(src.intensity.level)) {
          violations.push({
            code: 'V_L5_INVALID_INTENSITY',
            message: `Invalid intensity level "${src.intensity.level}" for light "${src.id}". Must be one of: ${VALID_LIGHT_INTENSITIES.join(', ')}`,
            lightSourceId: src.id,
          });
        }
        if (
          typeof src.intensity.value !== 'number' ||
          isNaN(src.intensity.value) ||
          src.intensity.value < 0.0 ||
          src.intensity.value > 2.5
        ) {
          violations.push({
            code: 'V_L5_INVALID_INTENSITY',
            message: `Light "${src.id}" has invalid intensity value ${src.intensity.value}. Must be a finite number between 0.0 and 2.5.`,
            lightSourceId: src.id,
          });
        }
      }

      // ----------------------------------------------------------------------
      // V-L6: VALID COLOR LANGUAGE
      // ----------------------------------------------------------------------
      if (!src.color || !VALID_LIGHT_COLORS.includes(src.color.semantic)) {
        violations.push({
          code: 'V_L6_INVALID_COLOR',
          message: `Invalid color semantic "${src.color?.semantic}" for light "${src.id}". Must be one of: ${VALID_LIGHT_COLORS.join(', ')}`,
          lightSourceId: src.id,
        });
      } else if (src.color.semantic === 'CUSTOM' && (!src.color.hex || !src.color.hex.startsWith('#'))) {
        violations.push({
          code: 'V_L6_INVALID_COLOR',
          message: `Custom color for light "${src.id}" must declare a valid hex string starting with #.`,
          lightSourceId: src.id,
        });
      }

      // ----------------------------------------------------------------------
      // V-L12: EMISSIVE LIGHT CONTRIBUTORS
      // ----------------------------------------------------------------------
      if (src.type === 'EMISSIVE') {
        if (!src.emissiveSourceEntityId) {
          violations.push({
            code: 'V_L12_INVALID_EMISSIVE_SOURCE',
            message: `Light source "${src.id}" of type EMISSIVE must specify an emissiveSourceEntityId.`,
            lightSourceId: src.id,
          });
        } else {
          const entity = entityMap.get(src.emissiveSourceEntityId);
          if (!entity) {
            violations.push({
              code: 'V_L12_INVALID_EMISSIVE_SOURCE',
              message: `Emissive light "${src.id}" references nonexistent entity "${src.emissiveSourceEntityId}".`,
              lightSourceId: src.id,
            });
          } else {
            const mat = entity.materialId ? materialMap.get(entity.materialId) : undefined;
            if (
              !mat ||
              (mat.emission !== 'EMISSIVE' &&
                mat.emission !== 'HIGHLY_EMISSIVE' &&
                mat.category !== 'PLASMA' &&
                mat.category !== 'ENERGY' &&
                mat.category !== 'CELESTIAL')
            ) {
              violations.push({
                code: 'V_L12_INVALID_EMISSIVE_SOURCE',
                message: `Emissive light "${src.id}" references entity "${src.emissiveSourceEntityId}" whose material is not emissive.`,
                lightSourceId: src.id,
              });
            }
          }
        }
      }
    }

    // ------------------------------------------------------------------------
    // V-L7 & V-L8 & V-L11: MATERIAL/LIGHT INTERACTIONS
    // ------------------------------------------------------------------------
    const interactions = lighting.materialInteractions || [];
    let heroHasMeaningfulInteraction = false;

    for (const inter of interactions) {
      if (!inter.id || inter.id.trim().length === 0) {
        violations.push({
          code: 'V_L8_EMPTY_INTERACTION',
          message: 'MaterialLightInteraction must declare a non-empty id.',
        });
      }

      // V-L7: Material reference resolution
      if (!inter.materialId || !materialMap.has(inter.materialId)) {
        violations.push({
          code: 'V_L7_UNRESOLVED_MATERIAL_REF',
          message: `MaterialLightInteraction "${inter.id}" references nonexistent material "${inter.materialId}".`,
          materialId: inter.materialId,
        });
      }

      // Light source reference resolution
      if (!inter.lightSourceId || !lightSourceMap.has(inter.lightSourceId)) {
        violations.push({
          code: 'V_L7_UNRESOLVED_LIGHT_SOURCE',
          message: `MaterialLightInteraction "${inter.id}" references nonexistent light source "${inter.lightSourceId}".`,
          lightSourceId: inter.lightSourceId,
        });
      }

      // V-L8: Meaningful response enums & non-empty description
      if (!VALID_HIGHLIGHT_RESPONSES.includes(inter.highlightCharacter)) {
        violations.push({
          code: 'V_L8_INVALID_INTERACTION_ENUM',
          message: `Invalid highlight character "${inter.highlightCharacter}" in interaction "${inter.id}".`,
        });
      }
      if (!VALID_SHADOW_TERMINATORS.includes(inter.shadowCharacter)) {
        violations.push({
          code: 'V_L8_INVALID_INTERACTION_ENUM',
          message: `Invalid shadow terminator "${inter.shadowCharacter}" in interaction "${inter.id}".`,
        });
      }
      if (!VALID_EDGE_RIMS.includes(inter.rimCharacter)) {
        violations.push({
          code: 'V_L8_INVALID_INTERACTION_ENUM',
          message: `Invalid edge rim "${inter.rimCharacter}" in interaction "${inter.id}".`,
        });
      }
      if (!inter.description || inter.description.trim().length < 5) {
        violations.push({
          code: 'V_L8_EMPTY_INTERACTION',
          message: `MaterialLightInteraction "${inter.id}" must contain a descriptive explanation of light interaction.`,
        });
      }

      // Track Hero interaction
      if (world.hero && (inter.entityId === world.hero.id || inter.materialId === world.hero.materialId)) {
        heroHasMeaningfulInteraction = true;
      }

      // ----------------------------------------------------------------------
      // V-L11: MATERIAL / LIGHT CONTRADICTIONS
      // ----------------------------------------------------------------------
      const mat = inter.materialId ? materialMap.get(inter.materialId) : undefined;
      if (mat) {
        // Contradiction 1: METAL cannot have diffuse wrapping without specular
        if (
          mat.category === 'METAL' &&
          inter.highlightCharacter === 'SOFT_DIFFUSE' &&
          inter.shadowCharacter === 'DIFFUSE_WRAPPING'
        ) {
          violations.push({
            code: 'V_L11_MATERIAL_LIGHT_CONTRADICTION',
            message: `Material "${mat.id}" is METAL but declares purely SOFT_DIFFUSE highlight with DIFFUSE_WRAPPING shadow. Metallic materials require directional specular reflection.`,
            materialId: mat.id,
          });
        }

        // Contradiction 2: GLASS cannot have hard opaque shadow terminator
        if (
          mat.category === 'GLASS' &&
          inter.shadowCharacter === 'HARD_TERMINATOR' &&
          inter.highlightCharacter !== 'TRANSMITTED_SPECULAR'
        ) {
          violations.push({
            code: 'V_L11_MATERIAL_LIGHT_CONTRADICTION',
            message: `Material "${mat.id}" is GLASS but declares HARD_TERMINATOR opaque shadow. Translucent glass produces transmitted or refractive falloff.`,
            materialId: mat.id,
          });
        }

        // Contradiction 3: PLASMA cannot be a reflective mirror with sharp specular
        if (
          mat.category === 'PLASMA' &&
          inter.highlightCharacter === 'SHARP_SPECULAR'
        ) {
          violations.push({
            code: 'V_L11_MATERIAL_LIGHT_CONTRADICTION',
            message: `Material "${mat.id}" is PLASMA but declares SHARP_SPECULAR highlight. Plasma is an ionized emissive volume, not a rigid reflective mirror.`,
            materialId: mat.id,
          });
        }
      }
    }

    // ------------------------------------------------------------------------
    // V-L2: MEANINGFUL LIGHT RELATIONSHIP FOR HERO
    // ------------------------------------------------------------------------
    if (world.hero && !heroHasMeaningfulInteraction) {
      violations.push({
        code: 'V_L2_MISSING_HERO_LIGHTING',
        message: `Hero entity "${world.hero.id}" has no meaningful MaterialLightInteraction declared in LightingContract.`,
        entityId: world.hero.id,
      });
    }

    // ------------------------------------------------------------------------
    // V-L9: MOTION-AWARE LIGHTING RESPONSES REFERENCE CANONICAL MOTION VERBS
    // ------------------------------------------------------------------------
    const motionResponses = lighting.motionResponses || [];
    for (const mr of motionResponses) {
      if (!VALID_MOTION_VERBS.includes(mr.verb)) {
        violations.push({
          code: 'V_L9_INVALID_MOTION_VERB',
          message: `MotionLightingResponse references unknown MotionVerb "${mr.verb}". Must be one of: ${VALID_MOTION_VERBS.join(', ')}`,
        });
      }

      if (!mr.description || mr.description.trim().length < 5) {
        violations.push({
          code: 'V_L9_EMPTY_MOTION_LIGHTING_RESPONSE',
          message: `MotionLightingResponse for verb "${mr.verb}" must provide a descriptive physical response.`,
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }
}
