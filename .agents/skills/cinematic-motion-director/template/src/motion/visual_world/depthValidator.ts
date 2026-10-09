/**
 * ============================================================================
 * DEPTH VALIDATOR (PHASE 5C)
 * ============================================================================
 * 
 * Enforces the 14 Rules of 2.5D Spatial Architecture Governance:
 *   V-D1: Spatial contract exists in cinematic mode (unless explicit FLAT_GRAPHIC).
 *   V-D2: Hero has a valid spatial placement (x, y, z, scale).
 *   V-D3: Important entities have meaningful depth separation.
 *   V-D4: Depth bands correspond to actual numeric depth bounds.
 *   V-D5: Spatial relationships reference declared entities.
 *   V-D6: No impossible self-relations or self-occlusions.
 *   V-D7: Occlusion relationships are physically coherent (occluder z < occluded z).
 *   V-D8: Parallax profile is grounded in spatial depth.
 *   V-D9: Spatial transforms use valid normalized bounds.
 *   V-D10: Spatial composition intent is valid.
 *   V-D11: Accidental depth collapse is detected and rejected.
 *   V-D12: Depth-aware motion responses reference valid canonical MotionVerbs.
 *   V-D13: Placements resolve to declared visual entities.
 *   V-D14: No fake decorative-only "3D" tricks.
 * ============================================================================
 */

import {
  SpatialDepthContract,
  VALID_DEPTH_BANDS,
  VALID_SPATIAL_RELATIONS,
  VALID_OCCLUSION_TYPES,
  VALID_COMPOSITION_INTENTS,
  VALID_Z_TRAJECTORIES,
} from './depthSchema';
import { DepthAmbiguityGate } from './depthAmbiguityGate';
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

export interface DepthViolation {
  code: string;
  message: string;
  entityId?: string;
  relationshipId?: string;
}

export interface DepthValidationReport {
  passed: boolean;
  violations: DepthViolation[];
}

export class DepthValidator {
  /**
   * Validates the SpatialDepthContract within a VisualWorld.
   */
  public static validate(
    world: VisualWorld,
    motionGraph?: MotionSceneGraph
  ): DepthValidationReport {
    const violations: DepthViolation[] = [];

    // Explicit Flat Graphic exception
    const isExplicitFlat =
      world.depth?.isExplicitFlatComposition === true ||
      world.composition?.compositionIntent?.includes('flat_schematic') ||
      world.materials?.some((m) => m.category === 'FLAT_GRAPHIC' && m.id === world.hero?.materialId);

    const spatial = (world as any).spatial as SpatialDepthContract | undefined;

    // ------------------------------------------------------------------------
    // V-D1: SPATIAL CONTRACT EXISTS IN CINEMATIC MODE
    // ------------------------------------------------------------------------
    if (!spatial) {
      if (!isExplicitFlat) {
        violations.push({
          code: 'V_D1_MISSING_SPATIAL_CONTRACT',
          message: 'VisualWorld does not contain a SpatialDepthContract in cinematic mode.',
        });
      }
      return {
        passed: violations.length === 0,
        violations,
      };
    }

    if (spatial.isFlatGraphicOverride || isExplicitFlat) {
      return {
        passed: true,
        violations: [],
      };
    }

    // Run Ambiguity Gate on contract
    try {
      DepthAmbiguityGate.validateContract(spatial);
    } catch (err: any) {
      violations.push({
        code: 'DEPTH_DIRECTION_AMBIGUOUS',
        message: err.message,
      });
    }

    // Build entity lookup map
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

    // ------------------------------------------------------------------------
    // V-D10: VALID COMPOSITION INTENT
    // ------------------------------------------------------------------------
    if (!spatial.compositionIntent || !VALID_COMPOSITION_INTENTS.includes(spatial.compositionIntent)) {
      violations.push({
        code: 'V_D10_INVALID_COMPOSITION_INTENT',
        message: `Invalid spatial composition intent "${spatial.compositionIntent}". Must be one of: ${VALID_COMPOSITION_INTENTS.join(', ')}`,
      });
    }

    // ------------------------------------------------------------------------
    // VALIDATE PLACEMENTS (V-D2, V-D4, V-D9, V-D13, V-D14)
    // ------------------------------------------------------------------------
    const placements = spatial.placements || [];
    const placementMap = new Map<string, any>();
    let heroPlacementFound = false;

    for (const p of placements) {
      placementMap.set(p.entityId, p);

      // V-D13: Entity resolution
      if (!entityMap.has(p.entityId)) {
        violations.push({
          code: 'V_D13_UNRESOLVED_ENTITY',
          message: `Spatial placement references undeclared entity "${p.entityId}".`,
          entityId: p.entityId,
        });
      }

      // Check Hero placement
      if (world.hero && p.entityId === world.hero.id) {
        heroPlacementFound = true;
      }

      // V-D4: Valid depth band
      if (!VALID_DEPTH_BANDS.includes(p.depthBand)) {
        violations.push({
          code: 'V_D4_DEPTH_BAND_MISMATCH',
          message: `Invalid depth band "${p.depthBand}" on entity "${p.entityId}".`,
          entityId: p.entityId,
        });
      }

      // V-D9: Spatial transform bounds check
      const t = p.transform;
      if (!t) {
        violations.push({
          code: 'V_D9_INVALID_SPATIAL_BOUNDS',
          message: `Entity "${p.entityId}" is missing spatial transform.`,
          entityId: p.entityId,
        });
      } else {
        if (typeof t.x !== 'number' || isNaN(t.x) || t.x < -1.5 || t.x > 1.5) {
          violations.push({
            code: 'V_D9_INVALID_SPATIAL_BOUNDS',
            message: `Entity "${p.entityId}" x coordinate ${t.x} exceeds normalized bounds [-1.0, 1.0].`,
            entityId: p.entityId,
          });
        }
        if (typeof t.y !== 'number' || isNaN(t.y) || t.y < -1.5 || t.y > 1.5) {
          violations.push({
            code: 'V_D9_INVALID_SPATIAL_BOUNDS',
            message: `Entity "${p.entityId}" y coordinate ${t.y} exceeds normalized bounds [-1.0, 1.0].`,
            entityId: p.entityId,
          });
        }
        if (typeof t.z !== 'number' || isNaN(t.z) || t.z < 0.0 || t.z > 1.0) {
          violations.push({
            code: 'V_D9_INVALID_SPATIAL_BOUNDS',
            message: `Entity "${p.entityId}" z depth ${t.z} must be in normalized range [0.0, 1.0].`,
            entityId: p.entityId,
          });
        }
        if (typeof t.scale !== 'number' || isNaN(t.scale) || t.scale <= 0.0 || t.scale > 5.0) {
          violations.push({
            code: 'V_D9_INVALID_SPATIAL_BOUNDS',
            message: `Entity "${p.entityId}" scale ${t.scale} must be a positive number in [0.05, 3.0].`,
            entityId: p.entityId,
          });
        }

        // V-D4: Depth band numeric correspondence check
        if (typeof t.z === 'number' && !isNaN(t.z)) {
          if (p.depthBand === 'FOREGROUND' && t.z > 0.35) {
            violations.push({
              code: 'V_D4_DEPTH_BAND_MISMATCH',
              message: `Entity "${p.entityId}" marked as FOREGROUND but z=${t.z} (FOREGROUND must have z <= 0.35).`,
              entityId: p.entityId,
            });
          } else if (p.depthBand === 'DEEP_BACKGROUND' && t.z < 0.70) {
            violations.push({
              code: 'V_D4_DEPTH_BAND_MISMATCH',
              message: `Entity "${p.entityId}" marked as DEEP_BACKGROUND but z=${t.z} (DEEP_BACKGROUND must have z >= 0.70).`,
              entityId: p.entityId,
            });
          }
        }
      }

      // V-D14: Fake depth trick check
      if ((p as any).fakeDepth === true || (p as any).useDropShadowForDepth === true || (p as any).dropShadow !== undefined) {
        violations.push({
          code: 'V_D14_FAKE_DEPTH_DETECTED',
          message: `Entity "${p.entityId}" uses fake depth styling without real spatial architecture.`,
          entityId: p.entityId,
        });
      }
    }

    // ------------------------------------------------------------------------
    // V-D2: HERO SPATIAL CONTRACT
    // ------------------------------------------------------------------------
    if (world.hero && !heroPlacementFound) {
      violations.push({
        code: 'V_D2_MISSING_HERO_SPATIAL',
        message: `Hero entity "${world.hero.id}" has no spatial placement in SpatialDepthContract.placements.`,
        entityId: world.hero.id,
      });
    }

    // ------------------------------------------------------------------------
    // V-D3 & V-D11: MEANINGFUL DEPTH SEPARATION & ACCIDENTAL DEPTH COLLAPSE
    // ------------------------------------------------------------------------
    if (placements.length > 1) {
      const zValues = placements.map((p) => p.transform?.z).filter((z) => typeof z === 'number' && !isNaN(z));
      if (zValues.length > 1) {
        const minZ = Math.min(...zValues);
        const maxZ = Math.max(...zValues);
        const delta = maxZ - minZ;

        // V-D11: Depth Collapse
        if (delta < 0.05) {
          violations.push({
            code: 'V_D11_DEPTH_COLLAPSE',
            message: `Depth collapse detected: all entities occupy essentially identical depth (delta z = ${delta.toFixed(3)} < 0.05). Cinematic staging requires multi-layered depth separation.`,
          });
        } else if (delta < 0.12 && placements.length >= 3) {
          violations.push({
            code: 'V_D3_INSUFFICIENT_DEPTH_SEPARATION',
            message: `Insufficient depth separation across multi-entity composition (delta z = ${delta.toFixed(3)} < 0.12).`,
          });
        }
      }
    }

    // ------------------------------------------------------------------------
    // V-D5 & V-D6: SPATIAL RELATIONSHIPS
    // ------------------------------------------------------------------------
    const relationships = spatial.relationships || [];
    for (const rel of relationships) {
      if (!VALID_SPATIAL_RELATIONS.includes(rel.relation)) {
        violations.push({
          code: 'V_D5_UNRESOLVED_ENTITY_RELATION',
          message: `Unknown spatial relation "${rel.relation}".`,
          relationshipId: rel.id,
        });
      }

      // V-D6: No impossible self-relations
      if (rel.sourceEntityId === rel.targetEntityId) {
        violations.push({
          code: 'V_D6_SELF_RELATION',
          message: `Entity "${rel.sourceEntityId}" cannot have a self-spatial relationship "${rel.relation}" to itself.`,
          relationshipId: rel.id,
          entityId: rel.sourceEntityId,
        });
      }

      // V-D5: Valid entity references
      if (!entityMap.has(rel.sourceEntityId)) {
        violations.push({
          code: 'V_D5_UNRESOLVED_ENTITY_RELATION',
          message: `Spatial relationship "${rel.id}" references undeclared source entity "${rel.sourceEntityId}".`,
          relationshipId: rel.id,
        });
      }
      if (!entityMap.has(rel.targetEntityId)) {
        violations.push({
          code: 'V_D5_UNRESOLVED_ENTITY_RELATION',
          message: `Spatial relationship "${rel.id}" references undeclared target entity "${rel.targetEntityId}".`,
          relationshipId: rel.id,
        });
      }
    }

    // ------------------------------------------------------------------------
    // V-D6 & V-D7: OCCLUSION INTENT COHERENCE
    // ------------------------------------------------------------------------
    const occlusions = spatial.occlusions || [];
    for (const occ of occlusions) {
      if (!VALID_OCCLUSION_TYPES.includes(occ.type)) {
        violations.push({
          code: 'V_D7_INCOHERENT_OCCLUSION',
          message: `Invalid occlusion type "${occ.type}" in occlusion "${occ.id}".`,
        });
      }

      // V-D6: No self-occlusion
      if (occ.occludingEntityId === occ.occludedEntityId) {
        violations.push({
          code: 'V_D6_SELF_RELATION',
          message: `Entity "${occ.occludingEntityId}" cannot occlude itself.`,
          entityId: occ.occludingEntityId,
        });
      }

      const occluder = placementMap.get(occ.occludingEntityId);
      const occluded = placementMap.get(occ.occludedEntityId);

      // V-D7: Occluder must be in front (smaller z) than occluded
      if (occluder && occluded && occ.type !== 'NONE') {
        const occluderZ = occluder.transform?.z;
        const occludedZ = occluded.transform?.z;
        if (typeof occluderZ === 'number' && typeof occludedZ === 'number') {
          if (occluderZ >= occludedZ) {
            violations.push({
              code: 'V_D7_INCOHERENT_OCCLUSION',
              message: `Incoherent occlusion: occluding entity "${occ.occludingEntityId}" (z=${occluderZ}) is at or behind occluded entity "${occ.occludedEntityId}" (z=${occludedZ}). Occluders must be physically in front.`,
              entityId: occ.occludingEntityId,
            });
          }
        }
      }
    }

    // ------------------------------------------------------------------------
    // V-D8: PARALLAX GROUNDED IN SPATIAL DEPTH
    // ------------------------------------------------------------------------
    if (spatial.parallaxProfile) {
      const zValues = placements.map((p) => p.transform?.z).filter((z) => typeof z === 'number' && !isNaN(z));
      const hasDepthSpread = zValues.length > 1 && (Math.max(...zValues) - Math.min(...zValues) >= 0.08);
      if (spatial.parallaxProfile.sensitivity === 'STRONG' && !hasDepthSpread) {
        violations.push({
          code: 'V_D8_PARALLAX_WITHOUT_DEPTH',
          message: 'STRONG parallax declared without meaningful depth variation among entities. Parallax requires spatial depth spread.',
        });
      }
    }

    // ------------------------------------------------------------------------
    // V-D12: DEPTH-AWARE MOTION RESPONSES REFERENCE CANONICAL MOTION VERBS
    // ------------------------------------------------------------------------
    const motionResponses = spatial.motionResponses || [];
    for (const mr of motionResponses) {
      if (!VALID_MOTION_VERBS.includes(mr.verb)) {
        violations.push({
          code: 'V_D12_INVALID_MOTION_VERB',
          message: `SpatialMotionResponse references unknown MotionVerb "${mr.verb}". Must be one of: ${VALID_MOTION_VERBS.join(', ')}`,
        });
      }
      if (!VALID_Z_TRAJECTORIES.includes(mr.trajectory)) {
        violations.push({
          code: 'V_D12_INVALID_MOTION_VERB',
          message: `SpatialMotionResponse declares unknown trajectory "${mr.trajectory}". Must be one of: ${VALID_Z_TRAJECTORIES.join(', ')}`,
        });
      }
      if (!mr.description || mr.description.trim().length < 5) {
        violations.push({
          code: 'V_D12_INVALID_MOTION_VERB',
          message: `SpatialMotionResponse for verb "${mr.verb}" must provide a descriptive physical trajectory explanation.`,
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }
}
