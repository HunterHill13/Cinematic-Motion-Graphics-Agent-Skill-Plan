/**
 * ============================================================================
 * DEPTH & SPATIAL LAYERING SCHEMA (PHASE 5C)
 * ============================================================================
 * 
 * Defines the 2.5D spatial coordinate contract, depth bands, spatial relationships,
 * occlusion intent, depth-aware scale projections, and depth-aware motion responses.
 * 
 * Hierarchy:
 *   Creative Intent
 *         ↓
 *   VisualWorld (Materials + Lighting + Spatial Contract)
 *         ↓
 *   MaterialValidator (Phase 5B.1)
 *         ↓
 *   LightingValidator (Phase 5B.2)
 *         ↓
 *   DepthValidator (Phase 5C - Enforces V-D1 to V-D14)
 *         ↓
 *   MotionPlanner & MotionSceneGraph
 *         ↓
 *   MotionGraphCompiler.compileCinematicGraph (Hard-gated)
 * ============================================================================
 */

import { MotionVerb } from '../grammar/motionGrammar';
import { DepthLayer } from './visualWorldSchema';

export type DepthBand = DepthLayer; // 'FOREGROUND' | 'MIDGROUND' | 'HERO_PLANE' | 'BACKGROUND' | 'DEEP_BACKGROUND'

export interface SpatialTransform {
  x: number; // Normalized horizontal position [-1.0, 1.0], 0 = center
  y: number; // Normalized vertical position [-1.0, 1.0], 0 = center
  z: number; // Normalized depth position [0.0, 1.0], 0 = nearest foreground, 1 = deep background
  scale: number; // Base spatial scale [0.05, 3.0]
  rotationX?: number; // Optional 2.5D tilt in degrees [-180, 180]
  rotationY?: number; // Optional 2.5D yaw in degrees [-180, 180]
  rotationZ?: number; // Planar rotation in degrees [-360, 360]
}

export interface EntitySpatialPlacement {
  entityId: string;
  depthBand: DepthBand;
  transform: SpatialTransform;
  apparentScale?: number; // Calculated perspective scale: scale / (1 + z)
  semanticSpatialRole: string; // e.g. "Primary central focal anchor", "Framing foreground occlusion"
}

export type SpatialRelationType =
  | 'IN_FRONT_OF'
  | 'BEHIND'
  | 'BESIDE'
  | 'ABOVE'
  | 'BELOW'
  | 'SURROUNDS'
  | 'INTERSECTS'
  | 'CONTAINS'
  | 'ORBITAL_AROUND'
  | 'CONNECTED_TO';

export interface SpatialRelationship {
  id: string;
  sourceEntityId: string;
  relation: SpatialRelationType;
  targetEntityId: string;
  depthDelta?: number; // targetZ - sourceZ (positive means target is farther back)
  description?: string;
}

export type OcclusionType =
  | 'FULL'
  | 'PARTIAL'
  | 'TRANSLUCENT_VEILING'
  | 'FRAMING'
  | 'NONE';

export interface OcclusionIntent {
  id: string;
  occludingEntityId: string;
  occludedEntityId: string;
  type: OcclusionType;
  depthDifference: number; // occludedZ - occludingZ (must be > 0 for physical occlusion)
  description?: string;
}

export type ParallaxSensitivity = 'STRONG' | 'BALANCED' | 'SUBTLE' | 'STATIC';

export interface DepthParallaxProfile {
  sensitivity: ParallaxSensitivity;
  response: 'LINEAR' | 'SUBTLE' | 'STRONG';
  depthFactor: number; // Normalized responsiveness multiplier derived from depth
  description?: string;
}

export type ZMotionTrajectory =
  | 'TOWARD_VIEWER'
  | 'AWAY_FROM_VIEWER'
  | 'PLANAR_XY'
  | 'MULTI_DEPTH_CONVERGENCE'
  | 'VOLUMETRIC_RADIAL';

export interface SpatialMotionResponse {
  verb: MotionVerb;
  entityId: string;
  trajectory: ZMotionTrajectory;
  startZ: number;
  endZ: number;
  description: string;
}

export type SpatialCompositionIntentType =
  | 'HERO_DOMINANT'
  | 'DEPTH_CORRIDOR'
  | 'LAYERED_WORLD'
  | 'CENTERED_STAGE'
  | 'DIAGONAL_DEPTH'
  | 'ORBITAL_COMPOSITION'
  | 'ENVIRONMENTAL_IMMERSION'
  | 'FLAT_SCHEMATIC';

/**
 * Master semantic Spatial & Depth Contract (Phase 5C).
 */
export interface SpatialDepthContract {
  id: string;
  compositionIntent: SpatialCompositionIntentType;
  placements: EntitySpatialPlacement[];
  relationships: SpatialRelationship[];
  occlusions: OcclusionIntent[];
  parallaxProfile: DepthParallaxProfile;
  motionResponses: SpatialMotionResponse[];
  isFlatGraphicOverride?: boolean;
}

export const VALID_DEPTH_BANDS: DepthBand[] = [
  'FOREGROUND',
  'MIDGROUND',
  'HERO_PLANE',
  'BACKGROUND',
  'DEEP_BACKGROUND',
];

export const VALID_SPATIAL_RELATIONS: SpatialRelationType[] = [
  'IN_FRONT_OF',
  'BEHIND',
  'BESIDE',
  'ABOVE',
  'BELOW',
  'SURROUNDS',
  'INTERSECTS',
  'CONTAINS',
  'ORBITAL_AROUND',
  'CONNECTED_TO',
];

export const VALID_OCCLUSION_TYPES: OcclusionType[] = [
  'FULL',
  'PARTIAL',
  'TRANSLUCENT_VEILING',
  'FRAMING',
  'NONE',
];

export const VALID_COMPOSITION_INTENTS: SpatialCompositionIntentType[] = [
  'HERO_DOMINANT',
  'DEPTH_CORRIDOR',
  'LAYERED_WORLD',
  'CENTERED_STAGE',
  'DIAGONAL_DEPTH',
  'ORBITAL_COMPOSITION',
  'ENVIRONMENTAL_IMMERSION',
  'FLAT_SCHEMATIC',
];

export const VALID_Z_TRAJECTORIES: ZMotionTrajectory[] = [
  'TOWARD_VIEWER',
  'AWAY_FROM_VIEWER',
  'PLANAR_XY',
  'MULTI_DEPTH_CONVERGENCE',
  'VOLUMETRIC_RADIAL',
];
