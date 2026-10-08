/**
 * ============================================================================
 * LIGHTING SCHEMA & CINEMATIC LIGHT LANGUAGE CONTRACT (PHASE 5B.2)
 * ============================================================================
 * 
 * Defines the semantic lighting language, structured light sources, spatial
 * directional relationships, material-to-light interactions, and motion-aware
 * lighting responses.
 * 
 * Pipeline Integration:
 *   Creative Intent
 *         ↓
 *   VisualWorld (Materials + Lighting Contract)
 *         ↓
 *   MaterialValidator (Phase 5B.1)
 *         ↓
 *   LightingValidator (Phase 5B.2 - Enforces V-L1 to V-L12)
 *         ↓
 *   MotionPlanner & MotionSceneGraph
 *         ↓
 *   MotionGraphCompiler.compileCinematicGraph (Hard-gated)
 * ============================================================================
 */

import { Vector3D, MotionVerb } from '../grammar/motionGrammar';

export type LightSourceType =
  | 'KEY'
  | 'FILL'
  | 'RIM'
  | 'AMBIENT'
  | 'EMISSIVE'
  | 'ENVIRONMENT'
  | 'PRACTICAL';

export type LightDirectionSemantic =
  | 'UPPER_LEFT'
  | 'UPPER_RIGHT'
  | 'LOWER_LEFT'
  | 'LOWER_RIGHT'
  | 'LEFT'
  | 'RIGHT'
  | 'TOP'
  | 'BOTTOM'
  | 'FRONT'
  | 'BACK'
  | 'CUSTOM';

export type LightIntensityLevel =
  | 'VERY_LOW'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'VERY_HIGH';

export type LightColorSemantic =
  | 'NEUTRAL'
  | 'WARM'
  | 'COOL'
  | 'CYAN'
  | 'BLUE'
  | 'MAGENTA'
  | 'RED'
  | 'AMBER'
  | 'GREEN'
  | 'CUSTOM';

export type LightSoftness =
  | 'HARD'
  | 'MEDIUM'
  | 'SOFT'
  | 'VERY_SOFT';

export type LightFalloff =
  | 'LINEAR'
  | 'INVERSE_SQUARE'
  | 'SMOOTH_STEP'
  | 'NONE';

export interface LightDirection {
  semantic: LightDirectionSemantic;
  vector?: Vector3D; // Normalized directional vector e.g. { x: -0.707, y: -0.707, z: 0.5 }
}

export interface LightIntensity {
  level: LightIntensityLevel;
  value: number; // Normalized numerical value [0.0 - 2.5]
}

export interface LightColor {
  semantic: LightColorSemantic;
  hex?: string; // e.g. '#E0F2FE'
  temperatureK?: number; // e.g. 6500
}

/**
 * Structured Light Source Reference.
 */
export interface LightSourceReference {
  id: string;
  name?: string;
  type: LightSourceType;
  direction: LightDirection;
  intensity: LightIntensity;
  color: LightColor;
  softness: LightSoftness;
  falloff?: LightFalloff;
  targetEntityId?: string; // Specific entity target or 'HERO'
  emissiveSourceEntityId?: string; // Entity ID if type === 'EMISSIVE'
  enabled?: boolean;
}

export interface AmbientLightProfile {
  level: LightIntensityLevel;
  value: number; // [0.0 - 1.0]
  color: LightColor;
  description?: string;
}

export interface EnvironmentLightProfile {
  type: 'DARK_SPACE' | 'CLINICAL_CLEAN' | 'WARM_STUDIO' | 'HIGH_CONTRAST' | 'GRADIENT';
  intensity: number;
  color: LightColor;
  description?: string;
}

export interface LightingCompositionIntent {
  contrastRatio?: 'HIGH_DRAMATIC' | 'BALANCED_STUDIO' | 'LOW_DIFFUSE';
  mood?: string;
  heroDominanceRatio?: number; // Ratio of hero illuminance to background illuminance
}

export type HighlightResponseCharacter =
  | 'SHARP_SPECULAR'
  | 'SOFT_DIFFUSE'
  | 'TRANSMITTED_SPECULAR'
  | 'GLAZING_FRESNEL'
  | 'NONE';

export type ShadowTerminatorCharacter =
  | 'HARD_TERMINATOR'
  | 'SOFT_GRADIENT'
  | 'DIFFUSE_WRAPPING'
  | 'MINIMAL_SHADOW'
  | 'NONE';

export type EdgeRimResponseCharacter =
  | 'RAZOR_RIM'
  | 'SOFT_HALO'
  | 'SUBSURFACE_GLOW'
  | 'FRESNEL_GRAZING'
  | 'NONE';

/**
 * Semantic coupling between a Material and a Light Source.
 */
export interface MaterialLightInteraction {
  id: string;
  entityId: string;
  materialId: string;
  lightSourceId: string;
  highlightCharacter: HighlightResponseCharacter;
  shadowCharacter: ShadowTerminatorCharacter;
  rimCharacter: EdgeRimResponseCharacter;
  description: string;
}

/**
 * Causal response of lighting to a canonical MotionVerb.
 */
export interface MotionLightingResponse {
  verb: MotionVerb;
  entityId: string;
  lightSourceId: string;
  highlightDisplacement?: string;
  trailingResponse?: string;
  intensityModulation?: string;
  shadowDisplacement?: string;
  description: string;
}

/**
 * Master semantic Lighting Contract.
 */
export interface LightingContract {
  id: string;
  sources: LightSourceReference[];
  ambientProfile: AmbientLightProfile;
  environmentProfile?: EnvironmentLightProfile;
  materialInteractions: MaterialLightInteraction[];
  motionResponses: MotionLightingResponse[];
  compositionIntent?: LightingCompositionIntent;
  isFlatGraphicOverride?: boolean;
}

export const VALID_LIGHT_TYPES: LightSourceType[] = [
  'KEY',
  'FILL',
  'RIM',
  'AMBIENT',
  'EMISSIVE',
  'ENVIRONMENT',
  'PRACTICAL',
];

export const VALID_LIGHT_DIRECTIONS: LightDirectionSemantic[] = [
  'UPPER_LEFT',
  'UPPER_RIGHT',
  'LOWER_LEFT',
  'LOWER_RIGHT',
  'LEFT',
  'RIGHT',
  'TOP',
  'BOTTOM',
  'FRONT',
  'BACK',
  'CUSTOM',
];

export const VALID_LIGHT_INTENSITIES: LightIntensityLevel[] = [
  'VERY_LOW',
  'LOW',
  'MEDIUM',
  'HIGH',
  'VERY_HIGH',
];

export const VALID_LIGHT_COLORS: LightColorSemantic[] = [
  'NEUTRAL',
  'WARM',
  'COOL',
  'CYAN',
  'BLUE',
  'MAGENTA',
  'RED',
  'AMBER',
  'GREEN',
  'CUSTOM',
];

export const VALID_LIGHT_SOFTNESSES: LightSoftness[] = [
  'HARD',
  'MEDIUM',
  'SOFT',
  'VERY_SOFT',
];

export const VALID_HIGHLIGHT_RESPONSES: HighlightResponseCharacter[] = [
  'SHARP_SPECULAR',
  'SOFT_DIFFUSE',
  'TRANSMITTED_SPECULAR',
  'GLAZING_FRESNEL',
  'NONE',
];

export const VALID_SHADOW_TERMINATORS: ShadowTerminatorCharacter[] = [
  'HARD_TERMINATOR',
  'SOFT_GRADIENT',
  'DIFFUSE_WRAPPING',
  'MINIMAL_SHADOW',
  'NONE',
];

export const VALID_EDGE_RIMS: EdgeRimResponseCharacter[] = [
  'RAZOR_RIM',
  'SOFT_HALO',
  'SUBSURFACE_GLOW',
  'FRESNEL_GRAZING',
  'NONE',
];
