/**
 * ============================================================================
 * LIGHTING PLANNER (PHASE 5B.2)
 * ============================================================================
 * 
 * Transforms Natural Language Intent and Material Contracts into structured,
 * physically grounded LightingContracts.
 * ============================================================================
 */

import {
  LightingContract,
  LightSourceReference,
  LightDirectionSemantic,
  LightColorSemantic,
  LightIntensityLevel,
  LightSoftness,
} from './lightingSchema';
import { MaterialCategory } from './materialSchema';
import { LightingAmbiguityGate } from './lightingAmbiguityGate';

export class LightingPlanner {
  /**
   * Canonical Factory: Celestial / Astrophysics Lighting (e.g. Black Hole)
   */
  public static createCelestialLighting(
    id: string,
    heroEntityId: string = 'black_hole_core',
    heroMaterialId: string = 'mat_black_hole_core',
    accretionEntityId?: string
  ): LightingContract {
    const sources: LightSourceReference[] = [
      {
        id: `${id}_cosmic_key`,
        name: 'Distant Starfield Key Light',
        type: 'KEY',
        direction: {
          semantic: 'UPPER_LEFT',
          vector: { x: -0.707, y: -0.707, z: 0.5 },
        },
        intensity: { level: 'MEDIUM', value: 1.0 },
        color: { semantic: 'COOL', hex: '#88C0D0' },
        softness: 'MEDIUM',
        falloff: 'INVERSE_SQUARE',
        targetEntityId: heroEntityId,
      },
      {
        id: `${id}_event_horizon_rim`,
        name: 'Relativistic Photon Ring Rim Light',
        type: 'RIM',
        direction: {
          semantic: 'BACK',
          vector: { x: 0, y: 0, z: -1.0 },
        },
        intensity: { level: 'HIGH', value: 1.8 },
        color: { semantic: 'CYAN', hex: '#70D6FF' },
        softness: 'HARD',
        targetEntityId: heroEntityId,
      },
    ];

    if (accretionEntityId) {
      sources.push({
        id: `${id}_accretion_emissive`,
        name: 'Luminescent Accretion Disk Local Illuminator',
        type: 'EMISSIVE',
        direction: {
          semantic: 'FRONT',
          vector: { x: 0, y: 0, z: 1.0 },
        },
        intensity: { level: 'HIGH', value: 1.7 },
        color: { semantic: 'AMBER', hex: '#FF7A00' },
        softness: 'SOFT',
        emissiveSourceEntityId: accretionEntityId,
        targetEntityId: heroEntityId,
      });
    }

    return {
      id,
      sources,
      ambientProfile: {
        level: 'VERY_LOW',
        value: 0.05,
        color: { semantic: 'COOL', hex: '#05070D' },
        description: 'Deep cosmic vacuum ambient illumination',
      },
      environmentProfile: {
        type: 'DARK_SPACE',
        intensity: 0.1,
        color: { semantic: 'COOL', hex: '#0B0F19' },
        description: 'Relativistically lensed interstellar void',
      },
      materialInteractions: [
        {
          id: `inter_${heroEntityId}_lensing`,
          entityId: heroEntityId,
          materialId: heroMaterialId,
          lightSourceId: `${id}_event_horizon_rim`,
          highlightCharacter: 'NONE',
          shadowCharacter: 'HARD_TERMINATOR',
          rimCharacter: 'RAZOR_RIM',
          description: 'Singularity event horizon absorbs all direct illumination while focusing a razor photon rim around the silhouette',
        },
      ],
      motionResponses: [
        {
          verb: 'EXPAND',
          entityId: heroEntityId,
          lightSourceId: `${id}_event_horizon_rim`,
          description: 'Photon ring circumference expands and intensifies grazing luminance under gravitational shift',
        },
        {
          verb: 'COLLAPSE',
          entityId: heroEntityId,
          lightSourceId: `${id}_event_horizon_rim`,
          description: 'Luminance concentrates toward the focal boundary as horizon diameter contracts',
        },
      ],
      compositionIntent: {
        contrastRatio: 'HIGH_DRAMATIC',
        heroDominanceRatio: 2.2,
      },
    };
  }

  /**
   * Canonical Factory: Cellular / Biomedical Lighting (e.g. Cancer Cell)
   */
  public static createCellularLighting(
    id: string,
    heroEntityId: string = 'cancer_cell_core',
    heroMaterialId: string = 'mat_cancer_cell_core'
  ): LightingContract {
    return {
      id,
      sources: [
        {
          id: `${id}_diffuse_key`,
          name: 'Microscopy Oblique Key Light',
          type: 'KEY',
          direction: {
            semantic: 'UPPER_LEFT',
            vector: { x: -0.6, y: -0.6, z: 0.5 },
          },
          intensity: { level: 'MEDIUM', value: 1.1 },
          color: { semantic: 'WARM', hex: '#FFF3E0' },
          softness: 'SOFT',
          falloff: 'SMOOTH_STEP',
          targetEntityId: heroEntityId,
        },
        {
          id: `${id}_cellular_fill`,
          name: 'Transmitted Cytosolic Fill Light',
          type: 'FILL',
          direction: {
            semantic: 'LOWER_RIGHT',
            vector: { x: 0.6, y: 0.6, z: 0.3 },
          },
          intensity: { level: 'LOW', value: 0.4 },
          color: { semantic: 'COOL', hex: '#E0F7FA' },
          softness: 'VERY_SOFT',
          targetEntityId: heroEntityId,
        },
      ],
      ambientProfile: {
        level: 'LOW',
        value: 0.25,
        color: { semantic: 'NEUTRAL', hex: '#1E293B' },
        description: 'Biomedical laboratory darkfield background illuminance',
      },
      environmentProfile: {
        type: 'CLINICAL_CLEAN',
        intensity: 0.3,
        color: { semantic: 'COOL', hex: '#0F172A' },
        description: 'Fluorescent confocal transmission environment',
      },
      materialInteractions: [
        {
          id: `inter_${heroEntityId}_membrane`,
          entityId: heroEntityId,
          materialId: heroMaterialId,
          lightSourceId: `${id}_diffuse_key`,
          highlightCharacter: 'SOFT_DIFFUSE',
          shadowCharacter: 'DIFFUSE_WRAPPING',
          rimCharacter: 'SUBSURFACE_GLOW',
          description: 'Soft lipid bilayer scatters incident beam internally producing gentle diffuse gradients and subtle subsurface glow',
        },
      ],
      motionResponses: [
        {
          verb: 'SPLIT',
          entityId: heroEntityId,
          lightSourceId: `${id}_diffuse_key`,
          description: 'Cleavage furrow deepens shadow gradient while daughter membranes produce dual subsurface highlights',
        },
        {
          verb: 'DEFORM',
          entityId: heroEntityId,
          lightSourceId: `${id}_diffuse_key`,
          description: 'Viscoelastic amoeboid protrusion redistributes soft highlight across fluctuating surface curvature',
        },
      ],
      compositionIntent: {
        contrastRatio: 'BALANCED_STUDIO',
        heroDominanceRatio: 1.5,
      },
    };
  }

  /**
   * Canonical Factory: Metal / Product Lighting (e.g. Precision Device)
   */
  public static createMetalLighting(
    id: string,
    heroEntityId: string = 'metal_device_hero',
    heroMaterialId: string = 'mat_metal_device_hero'
  ): LightingContract {
    return {
      id,
      sources: [
        {
          id: `${id}_studio_key`,
          name: 'Directional Specular Key Light',
          type: 'KEY',
          direction: {
            semantic: 'UPPER_LEFT',
            vector: { x: -0.7, y: -0.7, z: 0.5 },
          },
          intensity: { level: 'HIGH', value: 1.4 },
          color: { semantic: 'COOL', hex: '#E0F2FE' },
          softness: 'MEDIUM',
          falloff: 'INVERSE_SQUARE',
          targetEntityId: heroEntityId,
        },
        {
          id: `${id}_studio_fill`,
          name: 'Contrasting Low-Intensity Fill Light',
          type: 'FILL',
          direction: {
            semantic: 'LOWER_RIGHT',
            vector: { x: 0.7, y: 0.7, z: 0.3 },
          },
          intensity: { level: 'LOW', value: 0.35 },
          color: { semantic: 'NEUTRAL', hex: '#64748B' },
          softness: 'SOFT',
          targetEntityId: heroEntityId,
        },
        {
          id: `${id}_studio_rim`,
          name: 'Razor Separation Rim Light',
          type: 'RIM',
          direction: {
            semantic: 'BACK',
            vector: { x: 0, y: -0.5, z: -0.866 },
          },
          intensity: { level: 'MEDIUM', value: 0.9 },
          color: { semantic: 'COOL', hex: '#BAE6FD' },
          softness: 'HARD',
          targetEntityId: heroEntityId,
        },
      ],
      ambientProfile: {
        level: 'VERY_LOW',
        value: 0.1,
        color: { semantic: 'NEUTRAL', hex: '#0B0F17' },
        description: 'Controlled studio environment preventing washed-out metallic blacks',
      },
      environmentProfile: {
        type: 'WARM_STUDIO',
        intensity: 0.2,
        color: { semantic: 'NEUTRAL', hex: '#020617' },
        description: 'High-contrast studio cyclorama',
      },
      materialInteractions: [
        {
          id: `inter_${heroEntityId}_specular`,
          entityId: heroEntityId,
          materialId: heroMaterialId,
          lightSourceId: `${id}_studio_key`,
          highlightCharacter: 'SHARP_SPECULAR',
          shadowCharacter: 'HARD_TERMINATOR',
          rimCharacter: 'RAZOR_RIM',
          description: 'Polished metallic surface produces tightly focused specular hot spot with crisp falloff and clean edge separation',
        },
      ],
      motionResponses: [
        {
          verb: 'TRAVEL',
          entityId: heroEntityId,
          lightSourceId: `${id}_studio_key`,
          highlightDisplacement: 'Specular highlight sweeps across the metallic face in opposition to positional translation',
          description: 'Specular reflection continuously tracks incident angle across the geometry as object translates and rotates',
        },
        {
          verb: 'DEFORM',
          entityId: heroEntityId,
          lightSourceId: `${id}_studio_key`,
          description: 'Curvature modification distorts specular reflection bands across the metallic shell',
        },
      ],
      compositionIntent: {
        contrastRatio: 'HIGH_DRAMATIC',
        heroDominanceRatio: 2.0,
      },
    };
  }

  /**
   * Canonical Factory: Plasma / Energy Lighting
   */
  public static createPlasmaLighting(
    id: string,
    heroEntityId: string = 'plasma_core',
    heroMaterialId: string = 'mat_plasma_core'
  ): LightingContract {
    return {
      id,
      sources: [
        {
          id: `${id}_core_emissive`,
          name: 'Ionized Plasma Core Emitter',
          type: 'EMISSIVE',
          direction: {
            semantic: 'FRONT',
            vector: { x: 0, y: 0, z: 1.0 },
          },
          intensity: { level: 'VERY_HIGH', value: 2.0 },
          color: { semantic: 'CYAN', hex: '#00F0FF' },
          softness: 'VERY_SOFT',
          emissiveSourceEntityId: heroEntityId,
          targetEntityId: heroEntityId,
        },
        {
          id: `${id}_ambient_fill`,
          name: 'Dissipative Energy Fill Light',
          type: 'FILL',
          direction: {
            semantic: 'BACK',
            vector: { x: 0, y: 0, z: -1.0 },
          },
          intensity: { level: 'LOW', value: 0.3 },
          color: { semantic: 'BLUE', hex: '#1E40AF' },
          softness: 'SOFT',
        },
      ],
      ambientProfile: {
        level: 'VERY_LOW',
        value: 0.08,
        color: { semantic: 'BLUE', hex: '#030712' },
        description: 'Vacuum absorption surrounding high-energy plasma discharge',
      },
      materialInteractions: [
        {
          id: `inter_${heroEntityId}_emission`,
          entityId: heroEntityId,
          materialId: heroMaterialId,
          lightSourceId: `${id}_core_emissive`,
          highlightCharacter: 'NONE',
          shadowCharacter: 'MINIMAL_SHADOW',
          rimCharacter: 'SUBSURFACE_GLOW',
          description: 'Self-luminous plasma emitter casts volumetric internal illumination and outer corona glow',
        },
      ],
      motionResponses: [
        {
          verb: 'EXPAND',
          entityId: heroEntityId,
          lightSourceId: `${id}_core_emissive`,
          description: 'Ionization expansion creates volumetric irradiance flare and increases local illumination radius',
        },
        {
          verb: 'TRAVEL',
          entityId: heroEntityId,
          lightSourceId: `${id}_core_emissive`,
          trailingResponse: 'Photon emission wake trails behind the traveling plasma entity',
          description: 'Kinetic translation leaves a dissipative luminance tail along the motion vector',
        },
      ],
      compositionIntent: {
        contrastRatio: 'HIGH_DRAMATIC',
        heroDominanceRatio: 2.5,
      },
    };
  }

  /**
   * Canonical Factory: Explicit Flat Graphic Override
   */
  public static createFlatGraphicLighting(id: string): LightingContract {
    return {
      id,
      sources: [],
      ambientProfile: {
        level: 'HIGH',
        value: 1.0,
        color: { semantic: 'NEUTRAL', hex: '#FFFFFF' },
        description: 'Flat uniform schematic illumination',
      },
      materialInteractions: [],
      motionResponses: [],
      isFlatGraphicOverride: true,
    };
  }

  /**
   * Plans a complete LightingContract from Natural Language intent.
   * If intent is ambiguous or ungrounded, fails fast via LightingAmbiguityGate.
   */
  public static planLightingFromText(
    intentText: string,
    heroEntityId: string,
    heroMaterialId: string,
    materialCategory?: MaterialCategory
  ): LightingContract {
    // 1. Ambiguity Gate Verification
    LightingAmbiguityGate.validateNaturalIntent(intentText);

    const lower = intentText.toLowerCase();

    // 2. Directional Cue Extraction
    let keyDirection: LightDirectionSemantic = 'UPPER_LEFT';
    if (lower.includes('upper-left') || lower.includes('upper left')) {
      keyDirection = 'UPPER_LEFT';
    } else if (lower.includes('upper-right') || lower.includes('upper right')) {
      keyDirection = 'UPPER_RIGHT';
    } else if (lower.includes('lower-left') || lower.includes('lower left')) {
      keyDirection = 'LOWER_LEFT';
    } else if (lower.includes('lower-right') || lower.includes('lower right')) {
      keyDirection = 'LOWER_RIGHT';
    } else if (lower.includes('top') || lower.includes('overhead')) {
      keyDirection = 'TOP';
    } else if (lower.includes('bottom')) {
      keyDirection = 'BOTTOM';
    } else if (lower.includes('left')) {
      keyDirection = 'LEFT';
    } else if (lower.includes('right')) {
      keyDirection = 'RIGHT';
    }

    // 3. Color Cue Extraction
    let keyColor: LightColorSemantic = 'COOL';
    if (lower.includes('warm') || lower.includes('amber')) {
      keyColor = 'WARM';
    } else if (lower.includes('cyan')) {
      keyColor = 'CYAN';
    } else if (lower.includes('magenta')) {
      keyColor = 'MAGENTA';
    } else if (lower.includes('neutral') || lower.includes('white')) {
      keyColor = 'NEUTRAL';
    } else if (lower.includes('cool') || lower.includes('blue')) {
      keyColor = 'COOL';
    }

    // 4. Dispatch based on Material Archetype
    if (materialCategory === 'METAL' || lower.includes('metal') || lower.includes('alloy') || lower.includes('polished')) {
      const contract = this.createMetalLighting('planned_metal_lighting', heroEntityId, heroMaterialId);
      // Align direction and color with explicit text
      contract.sources[0].direction.semantic = keyDirection;
      contract.sources[0].color.semantic = keyColor;
      return contract;
    }

    if (materialCategory === 'ORGANIC' || lower.includes('cell') || lower.includes('tissue') || lower.includes('membrane')) {
      const contract = this.createCellularLighting('planned_cellular_lighting', heroEntityId, heroMaterialId);
      contract.sources[0].direction.semantic = keyDirection;
      return contract;
    }

    if (materialCategory === 'PLASMA' || lower.includes('plasma') || lower.includes('energy') || lower.includes('flame')) {
      return this.createPlasmaLighting('planned_plasma_lighting', heroEntityId, heroMaterialId);
    }

    if (materialCategory === 'CELESTIAL' || lower.includes('black hole') || lower.includes('singularity')) {
      return this.createCelestialLighting('planned_celestial_lighting', heroEntityId, heroMaterialId);
    }

    // Default: Grounded 3-point cinematic lighting
    const contract = this.createMetalLighting('planned_cinematic_lighting', heroEntityId, heroMaterialId);
    contract.sources[0].direction.semantic = keyDirection;
    contract.sources[0].color.semantic = keyColor;
    return contract;
  }
}
