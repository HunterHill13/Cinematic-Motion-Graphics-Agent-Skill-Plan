/**
 * ============================================================================
 * MATERIAL SCHEMA & RESPONSE CONTRACT (PHASE 5B.1)
 * ============================================================================
 * 
 * Defines the semantic material language and causal material-to-motion response
 * contract. Objects are not generic SVG vectors; their material identity dictates
 * how their surface, edge, deformation, light, and emission visually respond
 * to physical MotionVerbs.
 * 
 * Pipeline Integration:
 *   Creative Intent
 *         ↓
 *   VisualWorld (Materials Registry + Entity Material IDs)
 *         ↓
 *   MaterialValidator (Enforces V-M1 to V-M9)
 *         ↓
 *   MotionPlanner & MotionSceneGraph
 *         ↓
 *   MotionGraphCompiler.compileCinematicGraph (Hard-gated)
 * ============================================================================
 */

import { MotionVerb } from '../grammar/motionGrammar';

export type MaterialCategory =
  | 'PLASMA'
  | 'METAL'
  | 'ORGANIC'
  | 'GLASS'
  | 'ENERGY'
  | 'SMOKE'
  | 'LIQUID'
  | 'STONE'
  | 'CELESTIAL'
  | 'FLAT_GRAPHIC';

export type SurfaceResponse =
  | 'SOFT'
  | 'RIGID'
  | 'GLOSSY'
  | 'MATTE'
  | 'WET'
  | 'TRANSLUCENT'
  | 'REFLECTIVE'
  | 'DIFFUSE';

export type EdgeResponse =
  | 'STABLE'
  | 'SOFT'
  | 'GLOWING'
  | 'FLUID'
  | 'FRACTURED'
  | 'TRANSLUCENT'
  | 'UNSTABLE';

export type DeformationResponse =
  | 'RIGID'
  | 'ELASTIC'
  | 'VISCOELASTIC'
  | 'FLUID'
  | 'BRITTLE'
  | 'SOFT_BODY'
  | 'PARTICULATE';

export type LightResponse =
  | 'DIFFUSE'
  | 'SPECULAR'
  | 'SUBSURFACE'
  | 'EMISSIVE'
  | 'REFRACTIVE'
  | 'ABSORPTIVE';

export type EmissionResponse =
  | 'NON_EMISSIVE'
  | 'WEAKLY_EMISSIVE'
  | 'EMISSIVE'
  | 'HIGHLY_EMISSIVE';

export type OpacityBehavior =
  | 'OPAQUE'
  | 'TRANSLUCENT'
  | 'FADING'
  | 'DENSITY_DRIVEN'
  | 'VOLUME_DRIVEN';

export type TextureCharacter =
  | 'SMOOTH'
  | 'MICROTEXTURED'
  | 'GRAINED'
  | 'FLUID'
  | 'STRIATED'
  | 'POROUS'
  | 'FIBROUS';

/**
 * Causal response of a material to a specific MotionVerb.
 */
export interface MotionVerbMaterialResponse {
  verb: MotionVerb;
  description: string;
  velocityDeformation?: string;
  emissionResponse?: EmissionResponse;
  edgeResponse?: EdgeResponse;
  surfaceModulation?: string;
}

/**
 * Master semantic Material Contract.
 */
export interface MaterialReference {
  id: string;
  name: string;
  category: MaterialCategory;
  surfaceResponse: SurfaceResponse;
  edgeResponse: EdgeResponse;
  deformationResponse: DeformationResponse;
  lightResponse: LightResponse;
  emission: EmissionResponse;
  opacityBehavior: OpacityBehavior;
  textureCharacter: TextureCharacter;
  motionResponses: Record<string, MotionVerbMaterialResponse>; // keyed by MotionVerb
  semanticNotes?: string;
  isFlatGraphicOverride?: boolean;
}

export const VALID_MATERIAL_CATEGORIES: MaterialCategory[] = [
  'PLASMA',
  'METAL',
  'ORGANIC',
  'GLASS',
  'ENERGY',
  'SMOKE',
  'LIQUID',
  'STONE',
  'CELESTIAL',
  'FLAT_GRAPHIC',
];

export const VALID_SURFACE_RESPONSES: SurfaceResponse[] = [
  'SOFT',
  'RIGID',
  'GLOSSY',
  'MATTE',
  'WET',
  'TRANSLUCENT',
  'REFLECTIVE',
  'DIFFUSE',
];

export const VALID_EDGE_RESPONSES: EdgeResponse[] = [
  'STABLE',
  'SOFT',
  'GLOWING',
  'FLUID',
  'FRACTURED',
  'TRANSLUCENT',
  'UNSTABLE',
];

export const VALID_DEFORMATION_RESPONSES: DeformationResponse[] = [
  'RIGID',
  'ELASTIC',
  'VISCOELASTIC',
  'FLUID',
  'BRITTLE',
  'SOFT_BODY',
  'PARTICULATE',
];

export const VALID_LIGHT_RESPONSES: LightResponse[] = [
  'DIFFUSE',
  'SPECULAR',
  'SUBSURFACE',
  'EMISSIVE',
  'REFRACTIVE',
  'ABSORPTIVE',
];

export const VALID_EMISSION_RESPONSES: EmissionResponse[] = [
  'NON_EMISSIVE',
  'WEAKLY_EMISSIVE',
  'EMISSIVE',
  'HIGHLY_EMISSIVE',
];

export const VALID_OPACITY_BEHAVIORS: OpacityBehavior[] = [
  'OPAQUE',
  'TRANSLUCENT',
  'FADING',
  'DENSITY_DRIVEN',
  'VOLUME_DRIVEN',
];

export const VALID_TEXTURE_CHARACTERS: TextureCharacter[] = [
  'SMOOTH',
  'MICROTEXTURED',
  'GRAINED',
  'FLUID',
  'STRIATED',
  'POROUS',
  'FIBROUS',
];
