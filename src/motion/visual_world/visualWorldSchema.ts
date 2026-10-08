/**
 * ============================================================================
 * VISUAL WORLD SCHEMA & ART DIRECTION CONTRACT (PHASE 5A)
 * ============================================================================
 * 
 * Machine-readable semantic visual world contract connecting Creative Intent
 * to Art Direction, Visual Hierarchy, Spatial Depth, and Composition BEFORE
 * Motion Planning commences.
 * 
 * Hierarchy:
 *   CREATIVE INTENT
 *         ↓
 *   VISUAL WORLD / ART DIRECTION (This Module)
 *         ↓
 *   MOTION PLANNING
 *         ↓
 *   MOTION SCENE GRAPH
 *         ↓
 *   REMOTION / JSX
 * ============================================================================
 */

export type SemanticEntityRole = 'HERO' | 'SECONDARY' | 'TERTIARY' | 'ENVIRONMENT';

export type VisualHierarchyRank = 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'ENVIRONMENT';

export type DepthLayer =
  | 'FOREGROUND'
  | 'MIDGROUND'
  | 'HERO_PLANE'
  | 'BACKGROUND'
  | 'DEEP_BACKGROUND';

export type ScaleClass =
  | 'HERO_MONUMENTAL'
  | 'FOCAL'
  | 'SUPPORTING'
  | 'ENVIRONMENTAL'
  | 'ACCENT';

export type HeroAnchor =
  | 'CENTER'
  | 'LEFT_THIRD'
  | 'RIGHT_THIRD'
  | 'TOP'
  | 'BOTTOM'
  | 'GOLDEN_SPIRAL'
  | 'CUSTOM';

export type FocalRegion =
  | 'CENTRAL'
  | 'UPPER_THIRD'
  | 'LOWER_THIRD'
  | 'SPLIT_BILATERAL'
  | 'RADIAL_CONCENTRIC';

export type NegativeSpaceAllocation = 'HIGH' | 'BALANCED' | 'MINIMAL';

export type VisualBalance =
  | 'RADIAL'
  | 'ASYMMETRICAL'
  | 'BILATERAL'
  | 'DYNAMIC_TRIANGULAR';

export type ParallaxIntent = 'STRONG' | 'SUBTLE' | 'STATIC' | 'ISOMETRIC';

export type VisualDensity = 'MINIMAL' | 'MEDIUM' | 'MEDIUM_HIGH' | 'HIGH';

export type DominantTone =
  | 'DARK_CINEMATIC'
  | 'LIGHT_CLINICAL'
  | 'MONOCHROME_TECHNICAL'
  | 'HIGH_CONTRAST';

/**
 * Visual Identity definition for every prominent scene actor.
 */
export interface VisualEntityIdentity {
  id: string;
  label: string;
  semanticRole: SemanticEntityRole;
  visualRole: string; // e.g., "Singularity Gravitational Horizon", "Accretion Disk"
  importance: VisualHierarchyRank; // PRIMARY, SECONDARY, TERTIARY, ENVIRONMENT
  persistence: boolean;
  depthLayer: DepthLayer;
  scaleClass: ScaleClass;
  visualPriority: number; // 1 (highest, primary hero anchor) to 10 (lowest, deep starfield)
  semanticPurpose: string;
  colorCue?: string;
}

/**
 * Explicit multi-layered Depth Model preventing flat 2D collapse.
 */
export interface DepthModel {
  depthLayers: DepthLayer[];
  depthOrder: Record<string, number>; // entityId -> zIndex / layer stack order
  relativeDepth: Record<string, number>; // entityId -> relative depth offset in pixels (-1000 to +1000)
  parallaxIntent?: ParallaxIntent;
  isExplicitFlatComposition?: boolean; // Set true ONLY if explicitly designed as flat schematic
}

/**
 * Composition layout contract enforcing pre-render spatial intention.
 */
export interface CompositionContract {
  compositionIntent: string; // e.g., "centered_hero_with_negative_space"
  heroAnchor: HeroAnchor;
  safeRegion: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  };
  focalRegion: FocalRegion;
  visualBalance: VisualBalance;
  negativeSpace: NegativeSpaceAllocation;
  aspectRatio?: '16:9' | '9:16' | '1:1' | string;
}

/**
 * Color Language specification.
 */
export interface ColorLanguageSpec {
  primaryHue: string;
  secondaryHue: string;
  accentHue?: string;
  dominantTone: DominantTone;
  backgroundHex: string;
}

/**
 * Material Reference (Intent / Semantic token, not rendering shader).
 */
export interface MaterialReferenceSpec {
  entityId: string;
  materialType: string; // e.g., "luminescent_plasma", "matte_lipid_membrane"
  roughness?: number; // 0.0 to 1.0
  translucency?: number; // 0.0 to 1.0
  emissionIntensity?: number; // 0.0 to 2.0
}

/**
 * Lighting Reference (Intent / Directional cue, not 3D shader).
 */
export interface LightingReferenceSpec {
  style: string; // e.g., "rim_accent_with_deep_ambient_shadows"
  keyLightPosition?: { x: number; y: number; z: number };
  rimLightIntensity?: number;
  ambientFillRatio?: number;
}

/**
 * Concrete Art Direction Contract governing the aesthetic and atmospheric grammar.
 */
export interface ArtDirectionContract {
  visualStyle: string; // e.g., "cinematic_scientific", "clinical_biomedical"
  visualDensity: VisualDensity;
  contrastProfile: string; // e.g., "high_hero_low_environment"
  depthProfile: string; // e.g., "layered_2_5d", "isometric_diagrammatic"
  motionCharacter: string; // e.g., "gravitational_continuous", "viscous_cellular"
  visualHierarchy: VisualHierarchyRank[];
  compositionIntent: string;
  atmosphereIntent: string; // e.g., "interstellar_vacuum_with_plasma_haze"
  colorLanguage: ColorLanguageSpec;
  materialLanguage?: MaterialReferenceSpec[];
  lightingLanguage?: LightingReferenceSpec[];
}

/**
 * The Master Visual World Schema: The definitive representation of the visual universe.
 */
export interface VisualWorld {
  worldId: string;
  title: string;
  hero: VisualEntityIdentity;
  secondaryEntities: VisualEntityIdentity[];
  tertiaryEntities: VisualEntityIdentity[];
  environmentEntities: VisualEntityIdentity[];
  composition: CompositionContract;
  depth: DepthModel;
  artDirection: ArtDirectionContract;
}
