/**
 * ============================================================================
 * VISUAL WORLD PLANNER (PHASE 5A)
 * ============================================================================
 * 
 * Translates Natural Language Creative Intent into a complete, validated
 * VisualWorld model and binds it to downstream MotionPlanning.
 * ============================================================================
 */

import {
  VisualWorld,
  VisualEntityIdentity,
  CompositionContract,
  DepthModel,
  ArtDirectionContract,
} from './visualWorldSchema';
import { ArtDirectionAmbiguityGate, VisualDirectionAmbiguityError } from './artDirectionAmbiguityGate';
import { VisualWorldValidator } from './visualWorldValidator';
import { MaterialPlanner } from './materialPlanner';
import { LightingPlanner } from './lightingPlanner';
import { MotionPlanningRequest, RawMotionTransformationPlan } from '../compiler/motionPlanningInterface';

export interface VisualWorldPlanningOptions {
  worldId?: string;
  title?: string;
  aspectRatio?: string;
  isExplicitFlatComposition?: boolean;
}

export class VisualWorldPlanner {
  /**
   * Plans a complete VisualWorld from natural language intent.
   * Fails fast via AmbiguityGate if the intent lacks concrete grounding.
   */
  public static planFromNaturalIntent(
    creativeIntent: string,
    options?: VisualWorldPlanningOptions
  ): VisualWorld {
    // 1. Ambiguity Gate Enforcement
    ArtDirectionAmbiguityGate.validateNaturalIntent(creativeIntent);

    const lower = creativeIntent.toLowerCase();

    // 2. Domain Classification: Astrophysics / Black Hole
    if (
      lower.includes('black hole') ||
      lower.includes('singularity') ||
      lower.includes('accretion') ||
      lower.includes('cosmic') ||
      lower.includes('astrophysics')
    ) {
      return this.buildBlackHoleWorld(creativeIntent, options);
    }

    // 3. Domain Classification: Biomedical / Cellular
    if (
      lower.includes('cell') ||
      lower.includes('cancer') ||
      lower.includes('receptor') ||
      lower.includes('membrane') ||
      lower.includes('molecule') ||
      lower.includes('biomedical')
    ) {
      return this.buildCellularWorld(creativeIntent, options);
    }

    // 4. Domain Classification: Product / Technology
    if (
      lower.includes('device') ||
      lower.includes('product') ||
      lower.includes('interface') ||
      lower.includes('hardware') ||
      lower.includes('tech')
    ) {
      return this.buildTechnologyWorld(creativeIntent, options);
    }

    // 5. Default Grounded Canonical Architecture
    return this.buildGenericGroundedWorld(creativeIntent, options);
  }

  /**
   * Domain Factory: Astrophysics / Black Hole
   */
  public static buildBlackHoleWorld(
    creativeIntent: string,
    options?: VisualWorldPlanningOptions
  ): VisualWorld {
    const hero: VisualEntityIdentity = {
      id: 'black_hole_core',
      label: 'Gravitational Singularity Core',
      semanticRole: 'HERO',
      visualRole: 'Event horizon with extreme light deflection',
      importance: 'PRIMARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'HERO_MONUMENTAL',
      visualPriority: 1,
      semanticPurpose: 'Primary gravitational center driving scene dynamics',
      colorCue: '#05070D',
      materialId: 'mat_black_hole_core',
    };

    const secondaryEntities: VisualEntityIdentity[] = [
      {
        id: 'accretion_disk',
        label: 'Relativistic Accretion Disk',
        semanticRole: 'SECONDARY',
        visualRole: 'Luminescent orbiting plasma ring',
        importance: 'SECONDARY',
        persistence: true,
        depthLayer: 'MIDGROUND',
        scaleClass: 'FOCAL',
        visualPriority: 2,
        semanticPurpose: 'Visualizes kinetic mass-flow into the singularity',
        colorCue: '#FF7A00',
        materialId: 'mat_accretion_disk',
      },
    ];

    const tertiaryEntities: VisualEntityIdentity[] = [
      {
        id: 'plasma_jets',
        label: 'Relativistic Plasma Jets',
        semanticRole: 'TERTIARY',
        visualRole: 'Bipolar collimated particle exhaust',
        importance: 'TERTIARY',
        persistence: true,
        depthLayer: 'FOREGROUND',
        scaleClass: 'SUPPORTING',
        visualPriority: 3,
        semanticPurpose: 'Conveys extreme axial energy dissipation',
        colorCue: '#70D6FF',
      },
    ];

    const environmentEntities: VisualEntityIdentity[] = [
      {
        id: 'distant_starfield',
        label: 'Gravitationally Lensed Starfield',
        semanticRole: 'ENVIRONMENT',
        visualRole: 'Distorted deep background cosmos',
        importance: 'ENVIRONMENT',
        persistence: true,
        depthLayer: 'DEEP_BACKGROUND',
        scaleClass: 'ENVIRONMENTAL',
        visualPriority: 8,
        semanticPurpose: 'Provides spatial frame-of-reference and highlights lensing',
        colorCue: '#1B243B',
      },
    ];

    const composition: CompositionContract = {
      compositionIntent: 'centered_hero_with_radial_concentric_mass',
      heroAnchor: 'CENTER',
      safeRegion: { xMin: 120, xMax: 1800, yMin: 80, yMax: 1000 },
      focalRegion: 'CENTRAL',
      visualBalance: 'RADIAL',
      negativeSpace: 'HIGH',
      aspectRatio: options?.aspectRatio || '16:9',
    };

    const depth: DepthModel = {
      depthLayers: ['FOREGROUND', 'HERO_PLANE', 'MIDGROUND', 'DEEP_BACKGROUND'],
      depthOrder: {
        plasma_jets: 40,
        black_hole_core: 30,
        accretion_disk: 20,
        distant_starfield: 10,
      },
      relativeDepth: {
        plasma_jets: 250,
        black_hole_core: 0,
        accretion_disk: -180,
        distant_starfield: -850,
      },
      parallaxIntent: 'STRONG',
      isExplicitFlatComposition: false,
    };

    const artDirection: ArtDirectionContract = {
      visualStyle: 'cinematic_scientific',
      visualDensity: 'MEDIUM_HIGH',
      contrastProfile: 'high_hero_low_environment',
      depthProfile: 'deep_volumetric',
      motionCharacter: 'gravitational_continuous',
      visualHierarchy: ['PRIMARY', 'SECONDARY', 'TERTIARY', 'ENVIRONMENT'],
      compositionIntent: 'centered_hero_with_radial_concentric_mass',
      atmosphereIntent: 'interstellar_vacuum_with_relativistic_lensing',
      colorLanguage: {
        primaryHue: 'Deep Singularity Obsidian',
        secondaryHue: 'Superheated Accretion Amber',
        accentHue: 'Relativistic Cherenkov Cyan',
        dominantTone: 'DARK_CINEMATIC',
        backgroundHex: '#030508',
      },
      materialLanguage: [
        { entityId: 'black_hole_core', materialType: 'light_absorbing_singularity', roughness: 0.0, emissionIntensity: 0.0 },
        { entityId: 'accretion_disk', materialType: 'luminescent_plasma', roughness: 0.4, emissionIntensity: 1.8 },
      ],
      lightingLanguage: [
        { style: 'internal_accretion_glow_with_zero_ambient', ambientFillRatio: 0.05 },
      ],
    };

    return {
      worldId: options?.worldId || 'world_black_hole',
      title: options?.title || 'Black Hole Astrodynamics',
      hero,
      secondaryEntities,
      tertiaryEntities,
      environmentEntities,
      composition,
      depth,
      artDirection,
      materials: [
        MaterialPlanner.createCelestialMaterial('mat_black_hole_core', 'Singularity Core Celestial Material'),
        MaterialPlanner.createPlasmaMaterial('mat_accretion_disk', 'Relativistic Accretion Disk Plasma'),
      ],
      lighting: LightingPlanner.createCelestialLighting(
        'lighting_black_hole',
        hero.id,
        hero.materialId!,
        secondaryEntities[0]?.id
      ),
    };
  }

  /**
   * Domain Factory: Biomedical / Cell
   */
  public static buildCellularWorld(
    creativeIntent: string,
    options?: VisualWorldPlanningOptions
  ): VisualWorld {
    const hero: VisualEntityIdentity = {
      id: 'cancer_cell_core',
      label: 'Neoplastic Cell Core',
      semanticRole: 'HERO',
      visualRole: 'Irregular lipid bilayer with mutating chromatin mass',
      importance: 'PRIMARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'HERO_MONUMENTAL',
      visualPriority: 1,
      semanticPurpose: 'Hero pathological agent undergoing mitotic and cytotoxic changes',
      colorCue: '#9E2A2B',
      materialId: 'mat_cancer_cell_core',
    };

    const secondaryEntities: VisualEntityIdentity[] = [
      {
        id: 'drug_nanoparticle',
        label: 'Targeted Drug Nanocarrier',
        semanticRole: 'SECONDARY',
        visualRole: 'Engineered synthetic vehicle approaching membrane',
        importance: 'SECONDARY',
        persistence: true,
        depthLayer: 'MIDGROUND',
        scaleClass: 'FOCAL',
        visualPriority: 2,
        semanticPurpose: 'Therapeutic antagonist executing molecular docking',
        colorCue: '#48CAE4',
      },
    ];

    const tertiaryEntities: VisualEntityIdentity[] = [
      {
        id: 'surface_receptor',
        label: 'Overexpressed Surface Glycoprotein',
        semanticRole: 'TERTIARY',
        visualRole: 'Transmembrane receptor site',
        importance: 'TERTIARY',
        persistence: true,
        depthLayer: 'FOREGROUND',
        scaleClass: 'SUPPORTING',
        visualPriority: 3,
        semanticPurpose: 'Binding substrate for molecular handoff',
        colorCue: '#FFB703',
      },
    ];

    const environmentEntities: VisualEntityIdentity[] = [
      {
        id: 'extracellular_matrix',
        label: 'Extracellular Fluid & Collagen Matrix',
        semanticRole: 'ENVIRONMENT',
        visualRole: 'Turbid microenvironmental suspension',
        importance: 'ENVIRONMENT',
        persistence: true,
        depthLayer: 'DEEP_BACKGROUND',
        scaleClass: 'ENVIRONMENTAL',
        visualPriority: 7,
        semanticPurpose: 'Biological context providing hydrodynamic resistance',
        colorCue: '#111D2B',
      },
    ];

    const composition: CompositionContract = {
      compositionIntent: 'hero_left_with_antagonist_interaction_right',
      heroAnchor: 'LEFT_THIRD',
      safeRegion: { xMin: 100, xMax: 1820, yMin: 80, yMax: 1000 },
      focalRegion: 'SPLIT_BILATERAL',
      visualBalance: 'ASYMMETRICAL',
      negativeSpace: 'BALANCED',
      aspectRatio: options?.aspectRatio || '16:9',
    };

    const depth: DepthModel = {
      depthLayers: ['FOREGROUND', 'HERO_PLANE', 'MIDGROUND', 'DEEP_BACKGROUND'],
      depthOrder: {
        surface_receptor: 40,
        cancer_cell_core: 30,
        drug_nanoparticle: 20,
        extracellular_matrix: 10,
      },
      relativeDepth: {
        surface_receptor: 120,
        cancer_cell_core: 0,
        drug_nanoparticle: -90,
        extracellular_matrix: -450,
      },
      parallaxIntent: 'SUBTLE',
      isExplicitFlatComposition: false,
    };

    const artDirection: ArtDirectionContract = {
      visualStyle: 'clinical_biomedical',
      visualDensity: 'MEDIUM',
      contrastProfile: 'high_hero_low_environment',
      depthProfile: 'layered_2_5d',
      motionCharacter: 'viscous_cellular',
      visualHierarchy: ['PRIMARY', 'SECONDARY', 'TERTIARY', 'ENVIRONMENT'],
      compositionIntent: 'hero_left_with_antagonist_interaction_right',
      atmosphereIntent: 'subcellular_turbid_medium_with_depth_diffusion',
      colorLanguage: {
        primaryHue: 'Cytotoxic Crimson',
        secondaryHue: 'Therapeutic Electric Cyan',
        accentHue: 'Receptor Amber',
        dominantTone: 'DARK_CINEMATIC',
        backgroundHex: '#080E18',
      },
      materialLanguage: [
        { entityId: 'cancer_cell_core', materialType: 'translucent_lipid_membrane', roughness: 0.6, translucency: 0.4 },
        { entityId: 'drug_nanoparticle', materialType: 'metallic_synthetic_polymer', roughness: 0.2, emissionIntensity: 0.8 },
      ],
      lightingLanguage: [
        { style: 'darkfield_microscopy_rim_illumination', rimLightIntensity: 1.4, ambientFillRatio: 0.12 },
      ],
    };

    return {
      worldId: options?.worldId || 'world_cancer_cell',
      title: options?.title || 'Targeted Nanomedicine in Oncology',
      hero,
      secondaryEntities,
      tertiaryEntities,
      environmentEntities,
      composition,
      depth,
      artDirection,
      materials: [
        MaterialPlanner.createOrganicCellMaterial('mat_cancer_cell_core', 'Neoplastic Cell Organic Membrane'),
      ],
      lighting: LightingPlanner.createCellularLighting(
        'lighting_cancer_cell',
        hero.id,
        hero.materialId!
      ),
    };
  }

  /**
   * Domain Factory: Product / Technology
   */
  public static buildTechnologyWorld(
    creativeIntent: string,
    options?: VisualWorldPlanningOptions
  ): VisualWorld {
    const hero: VisualEntityIdentity = {
      id: 'device_core',
      label: 'Precision Hardware Core',
      semanticRole: 'HERO',
      visualRole: 'Monolithic computational chassis with sharp chamfered geometry',
      importance: 'PRIMARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'HERO_MONUMENTAL',
      visualPriority: 1,
      semanticPurpose: 'Physical centerpiece demonstrating engineering precision',
      colorCue: '#E0E1DD',
      materialId: 'mat_device_core',
    };

    const secondaryEntities: VisualEntityIdentity[] = [
      {
        id: 'interface_hologram',
        label: 'Kinetic Holographic Interface',
        semanticRole: 'SECONDARY',
        visualRole: 'Floating optical rings and telemetry arcs',
        importance: 'SECONDARY',
        persistence: true,
        depthLayer: 'MIDGROUND',
        scaleClass: 'FOCAL',
        visualPriority: 2,
        semanticPurpose: 'Conveys data throughput and reactive user interface',
        colorCue: '#00F5D4',
      },
    ];

    const tertiaryEntities: VisualEntityIdentity[] = [];

    const environmentEntities: VisualEntityIdentity[] = [
      {
        id: 'isometric_spatial_grid',
        label: 'Architectural Coordinate Datum',
        semanticRole: 'ENVIRONMENT',
        visualRole: 'Perspective grid rails establishing coordinate space',
        importance: 'ENVIRONMENT',
        persistence: true,
        depthLayer: 'DEEP_BACKGROUND',
        scaleClass: 'ENVIRONMENTAL',
        visualPriority: 9,
        semanticPurpose: 'Provides orthographic calibration benchmarks',
        colorCue: '#1B263B',
      },
    ];

    const composition: CompositionContract = {
      compositionIntent: 'centered_hero_with_isometric_negative_space',
      heroAnchor: 'CENTER',
      safeRegion: { xMin: 150, xMax: 1770, yMin: 100, yMax: 980 },
      focalRegion: 'CENTRAL',
      visualBalance: 'DYNAMIC_TRIANGULAR',
      negativeSpace: 'HIGH',
      aspectRatio: options?.aspectRatio || '16:9',
    };

    const depth: DepthModel = {
      depthLayers: ['HERO_PLANE', 'MIDGROUND', 'DEEP_BACKGROUND'],
      depthOrder: {
        device_core: 30,
        interface_hologram: 20,
        isometric_spatial_grid: 10,
      },
      relativeDepth: {
        device_core: 0,
        interface_hologram: -120,
        isometric_spatial_grid: -600,
      },
      parallaxIntent: 'ISOMETRIC',
      isExplicitFlatComposition: false,
    };

    const artDirection: ArtDirectionContract = {
      visualStyle: 'industrial_tech',
      visualDensity: 'MEDIUM',
      contrastProfile: 'high_hero_low_environment',
      depthProfile: 'isometric_diagrammatic',
      motionCharacter: 'inertial_machined_precision',
      visualHierarchy: ['PRIMARY', 'SECONDARY', 'ENVIRONMENT'],
      compositionIntent: 'centered_hero_with_isometric_negative_space',
      atmosphereIntent: 'minimalist_cleanroom_vacuum',
      colorLanguage: {
        primaryHue: 'Anodized Titanium Platinum',
        secondaryHue: 'Holographic Emerald Teal',
        accentHue: 'Machined Orange Accent',
        dominantTone: 'DARK_CINEMATIC',
        backgroundHex: '#0B0F19',
      },
      materialLanguage: [
        { entityId: 'device_core', materialType: 'anodized_matte_aluminum', roughness: 0.15, emissionIntensity: 0.0 },
      ],
      lightingLanguage: [
        { style: 'studio_three_point_with_specular_edge_kicker', rimLightIntensity: 1.6, ambientFillRatio: 0.18 },
      ],
    };

    return {
      worldId: options?.worldId || 'world_tech_device',
      title: options?.title || 'Industrial Device Engineering',
      hero,
      secondaryEntities,
      tertiaryEntities,
      environmentEntities,
      composition,
      depth,
      artDirection,
      materials: [
        MaterialPlanner.createMetalMaterial('mat_device_core', 'Precision Hardware Metal Chassis'),
      ],
      lighting: LightingPlanner.createMetalLighting(
        'lighting_device_core',
        hero.id,
        hero.materialId!
      ),
    };
  }

  /**
   * Generic Grounded Fallback
   */
  public static buildGenericGroundedWorld(
    creativeIntent: string,
    options?: VisualWorldPlanningOptions
  ): VisualWorld {
    const hero: VisualEntityIdentity = {
      id: 'hero_actor',
      label: 'Primary Subject',
      semanticRole: 'HERO',
      visualRole: 'Central focal subject of transformation',
      importance: 'PRIMARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'HERO_MONUMENTAL',
      visualPriority: 1,
      semanticPurpose: 'Main focus of narrative progression',
      colorCue: '#FFFFFF',
    };

    const environmentEntities: VisualEntityIdentity[] = [
      {
        id: 'ambient_depth_canvas',
        label: 'Spatial Background Environment',
        semanticRole: 'ENVIRONMENT',
        visualRole: 'Contextual field grounding the subject',
        importance: 'ENVIRONMENT',
        persistence: true,
        depthLayer: 'DEEP_BACKGROUND',
        scaleClass: 'ENVIRONMENTAL',
        visualPriority: 9,
        semanticPurpose: 'Contextual grounding',
        colorCue: '#0A0E17',
      },
    ];

    const composition: CompositionContract = {
      compositionIntent: 'centered_hero_with_balanced_staging',
      heroAnchor: 'CENTER',
      safeRegion: { xMin: 120, xMax: 1800, yMin: 80, yMax: 1000 },
      focalRegion: 'CENTRAL',
      visualBalance: 'BILATERAL',
      negativeSpace: 'BALANCED',
      aspectRatio: options?.aspectRatio || '16:9',
    };

    const depth: DepthModel = {
      depthLayers: ['HERO_PLANE', 'DEEP_BACKGROUND'],
      depthOrder: {
        hero_actor: 20,
        ambient_depth_canvas: 10,
      },
      relativeDepth: {
        hero_actor: 0,
        ambient_depth_canvas: -500,
      },
      parallaxIntent: 'SUBTLE',
      isExplicitFlatComposition: false,
    };

    const artDirection: ArtDirectionContract = {
      visualStyle: 'cinematic_scientific',
      visualDensity: 'MEDIUM',
      contrastProfile: 'high_hero_low_environment',
      depthProfile: 'layered_2_5d',
      motionCharacter: 'gravitational_continuous',
      visualHierarchy: ['PRIMARY', 'ENVIRONMENT'],
      compositionIntent: 'centered_hero_with_balanced_staging',
      atmosphereIntent: 'clean_spatial_canvas',
      colorLanguage: {
        primaryHue: 'Clean Polar White',
        secondaryHue: 'Deep Space Navy',
        dominantTone: 'DARK_CINEMATIC',
        backgroundHex: '#080C14',
      },
    };

    const heroMaterial = MaterialPlanner.planMaterialForEntity(hero, creativeIntent);
    hero.materialId = heroMaterial.id;

    const lighting = options?.isExplicitFlatComposition
      ? LightingPlanner.createFlatGraphicLighting('lighting_flat_graphic')
      : LightingPlanner.planLightingFromText(creativeIntent, hero.id, heroMaterial.id, heroMaterial.category);

    return {
      worldId: options?.worldId || 'world_generic',
      title: options?.title || 'Generic Visual World',
      hero,
      secondaryEntities: [],
      tertiaryEntities: [],
      environmentEntities,
      composition,
      depth,
      artDirection,
      materials: [heroMaterial],
      lighting,
    };
  }

  /**
   * Binds a validated VisualWorld to a downstream MotionPlanningRequest.
   * Converts Visual Entities into Motion Entities with matching IDs and roles.
   */
  public static bindToMotionPlanningRequest(
    world: VisualWorld,
    transformations: RawMotionTransformationPlan[],
    options?: { sceneId?: string; title?: string; totalDurationFrames?: number }
  ): MotionPlanningRequest {
    // Validate world first
    const report = VisualWorldValidator.validate(world);
    if (!report.passed) {
      throw new Error(
        `[VISUAL_WORLD_INVALID] Cannot bind to MotionPlanningRequest: ${report.violations.map((v) => v.message).join('; ')}`
      );
    }

    const allVisualEntities: VisualEntityIdentity[] = [
      world.hero,
      ...world.secondaryEntities,
      ...world.tertiaryEntities,
      ...world.environmentEntities,
    ];

    return {
      creativeIntent: `Visual World: ${world.title} [${world.artDirection.visualStyle}]`,
      sceneId: options?.sceneId || world.worldId,
      title: options?.title || world.title,
      totalDurationFrames: options?.totalDurationFrames || 600,
      world: {
        width: 1920,
        height: 1080,
        depthEnabled: world.depth.parallaxIntent !== 'STATIC' && !world.depth.isExplicitFlatComposition,
        backgroundColor: world.artDirection.colorLanguage.backgroundHex,
      },
      entities: allVisualEntities.map((ve) => ({
        id: ve.id,
        label: ve.label,
        role: ve.semanticRole === 'HERO' ? 'HERO' : (ve.semanticRole === 'ENVIRONMENT' ? 'ENVIRONMENT' : 'SECONDARY'),
        semanticPurpose: ve.semanticPurpose,
        initialGeometry: 'circle',
        initialPosition: {
          x: ve.depthLayer === 'HERO_PLANE' ? 960 : (ve.semanticRole === 'SECONDARY' ? 1280 : 960),
          y: 540,
          z: world.depth.relativeDepth[ve.id] || 0,
        },
        initialScale: ve.scaleClass === 'HERO_MONUMENTAL' ? 1.0 : (ve.scaleClass === 'FOCAL' ? 0.65 : 0.4),
        persistent: ve.persistence,
      })),
      transformations,
      visualWorld: world,
    };
  }
}
