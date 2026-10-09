/**
 * ============================================================================
 * MATERIAL PLANNER (PHASE 5B.1)
 * ============================================================================
 * 
 * Bridges Natural Language Creative Intent and Entity Identity to structured
 * MaterialReference contracts.
 * 
 * Enforces:
 *   - Grounded physical substance deduction
 *   - Rejection of ungrounded aesthetic buzzwords via MaterialAmbiguityGate
 *   - Automatic generation of motion-aware response contracts for existing MotionVerbs
 * ============================================================================
 */

import {
  MaterialReference,
  MaterialCategory,
  MotionVerbMaterialResponse,
} from './materialSchema';
import { MaterialAmbiguityGate, MaterialDirectionAmbiguityError } from './materialAmbiguityGate';
import { VisualEntityIdentity } from './visualWorldSchema';
import { MotionVerb } from '../grammar/motionGrammar';

export class MaterialPlanner {
  /**
   * Plans or infers a MaterialReference for a given VisualEntityIdentity.
   */
  public static planMaterialForEntity(
    entity: VisualEntityIdentity,
    contextPrompt?: string
  ): MaterialReference {
    const combinedText = `${contextPrompt || ''} ${entity.label} ${entity.visualRole} ${entity.semanticPurpose}`.trim();

    // 1. Ambiguity Gate Check: Guard against buzzword-only prompts
    if (contextPrompt) {
      MaterialAmbiguityGate.validateNaturalIntent(contextPrompt);
    }

    // 2. Infer Category from Semantic Text
    const category = this.inferCategoryFromText(combinedText);
    if (!category) {
      throw new MaterialDirectionAmbiguityError(
        `Unable to infer an unambiguous material category for entity "${entity.id}" ("${entity.label}"). Must explicitly declare a recognized material substance.`
      );
    }

    const materialId = `mat_${entity.id}`;

    switch (category) {
      case 'CELESTIAL':
        return this.createCelestialMaterial(materialId, `${entity.label} Celestial Substrate`);
      case 'ORGANIC':
        return this.createOrganicCellMaterial(materialId, `${entity.label} Organic Tissue`);
      case 'METAL':
        return this.createMetalMaterial(materialId, `${entity.label} Metallic Structure`);
      case 'PLASMA':
        return this.createPlasmaMaterial(materialId, `${entity.label} Plasma Ionized Medium`);
      case 'ENERGY':
        return this.createEnergyMaterial(materialId, `${entity.label} Coherent Energy Flux`);
      case 'LIQUID':
        return this.createLiquidMaterial(materialId, `${entity.label} Viscous Liquid`);
      case 'GLASS':
        return this.createGlassMaterial(materialId, `${entity.label} Refractive Glass`);
      case 'STONE':
        return this.createStoneMaterial(materialId, `${entity.label} Mineral Stone`);
      case 'SMOKE':
        return this.createSmokeMaterial(materialId, `${entity.label} Dispersed Smoke`);
      case 'FLAT_GRAPHIC':
        return this.createFlatGraphicMaterial(materialId, `${entity.label} Flat Schematic`);
      default:
        return this.createMetalMaterial(materialId, `${entity.label} Substrate`);
    }
  }

  /**
   * Controlled semantic inference from physical tokens.
   */
  public static inferCategoryFromText(text: string): MaterialCategory | null {
    const lower = text.toLowerCase();

    // Rejection of purely abstract words without substance
    if (
      lower.includes('premium') ||
      lower.includes('cinematic') ||
      lower.includes('cool') ||
      lower.includes('realistic')
    ) {
      const hasSubstance =
        lower.includes('metal') ||
        lower.includes('cell') ||
        lower.includes('plasma') ||
        lower.includes('singularity') ||
        lower.includes('black hole') ||
        lower.includes('liquid') ||
        lower.includes('glass') ||
        lower.includes('stone') ||
        lower.includes('smoke') ||
        lower.includes('energy');

      if (!hasSubstance) {
        return null;
      }
    }

    if (
      lower.includes('black hole') ||
      lower.includes('singularity') ||
      lower.includes('gravitational') ||
      lower.includes('celestial') ||
      lower.includes('accretion')
    ) {
      return 'CELESTIAL';
    }

    if (
      lower.includes('cell') ||
      lower.includes('cancer') ||
      lower.includes('membrane') ||
      lower.includes('tissue') ||
      lower.includes('biological') ||
      lower.includes('lipid') ||
      lower.includes('organic')
    ) {
      return 'ORGANIC';
    }

    if (
      lower.includes('metal') ||
      lower.includes('steel') ||
      lower.includes('titanium') ||
      lower.includes('aluminum') ||
      lower.includes('hardware') ||
      lower.includes('device') ||
      lower.includes('hull') ||
      lower.includes('chassis') ||
      lower.includes('spacecraft') ||
      lower.includes('mechanical')
    ) {
      return 'METAL';
    }

    if (lower.includes('plasma') || lower.includes('ionized') || lower.includes('corona')) {
      return 'PLASMA';
    }

    if (lower.includes('energy') || lower.includes('laser') || lower.includes('beam') || lower.includes('pulse')) {
      return 'ENERGY';
    }

    if (lower.includes('liquid') || lower.includes('fluid') || lower.includes('water') || lower.includes('droplet')) {
      return 'LIQUID';
    }

    if (lower.includes('glass') || lower.includes('lens') || lower.includes('crystal') || lower.includes('optic')) {
      return 'GLASS';
    }

    if (lower.includes('stone') || lower.includes('rock') || lower.includes('asteroid') || lower.includes('mineral')) {
      return 'STONE';
    }

    if (lower.includes('smoke') || lower.includes('vapor') || lower.includes('gas') || lower.includes('cloud')) {
      return 'SMOKE';
    }

    if (lower.includes('diagram') || lower.includes('schematic') || lower.includes('flat')) {
      return 'FLAT_GRAPHIC';
    }

    return null;
  }

  // --------------------------------------------------------------------------
  // CANONICAL MATERIAL FACTORIES
  // --------------------------------------------------------------------------

  public static createCelestialMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'CELESTIAL',
      surfaceResponse: 'DIFFUSE',
      edgeResponse: 'GLOWING',
      deformationResponse: 'VISCOELASTIC',
      lightResponse: 'EMISSIVE',
      emission: 'HIGHLY_EMISSIVE',
      opacityBehavior: 'DENSITY_DRIVEN',
      textureCharacter: 'FLUID',
      semanticNotes: 'Deep relativistic singularity surrounded by intense photo-emissive relativistic disk.',
      motionResponses: {
        EXPAND: {
          verb: 'EXPAND',
          description: 'Gravitational expansion increases peripheral emission and accelerates orbital accretion velocity.',
          emissionResponse: 'HIGHLY_EMISSIVE',
          edgeResponse: 'UNSTABLE',
        },
        COLLAPSE: {
          verb: 'COLLAPSE',
          description: 'Singularity contraction concentrates core density and intensifies event horizon light bending.',
          emissionResponse: 'EMISSIVE',
          edgeResponse: 'GLOWING',
        },
        TRAVEL: {
          verb: 'TRAVEL',
          description: 'Transit generates relativistic Doppler-shifted beaming on advancing edge.',
          edgeResponse: 'GLOWING',
        },
      },
    };
  }

  public static createOrganicCellMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'ORGANIC',
      surfaceResponse: 'TRANSLUCENT',
      edgeResponse: 'SOFT',
      deformationResponse: 'SOFT_BODY',
      lightResponse: 'SUBSURFACE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'TRANSLUCENT',
      textureCharacter: 'MICROTEXTURED',
      semanticNotes: 'Viscoelastic biological lipid membrane with subsurface cellular scattering.',
      motionResponses: {
        EXPAND: {
          verb: 'EXPAND',
          description: 'Volumetric expansion stretches lipid bilayer, increasing translucency and edge tension.',
          edgeResponse: 'TRANSLUCENT',
          surfaceModulation: 'membrane_thinning',
        },
        SPLIT: {
          verb: 'SPLIT',
          description: 'Cleavage furrow indents membrane with viscous furrow necking and surface blebbing.',
          edgeResponse: 'UNSTABLE',
          velocityDeformation: 'furrow_constriction',
        },
        DEFORM: {
          verb: 'DEFORM',
          description: 'Shear stress causes viscoelastic ellipsoid flattening with volume conservation.',
          edgeResponse: 'SOFT',
          velocityDeformation: 'viscoelastic_squash',
        },
        TRAVEL: {
          verb: 'TRAVEL',
          description: 'Translational motion elicits rearward trailing membrane elongation.',
          edgeResponse: 'SOFT',
        },
      },
    };
  }

  public static createMetalMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'METAL',
      surfaceResponse: 'REFLECTIVE',
      edgeResponse: 'STABLE',
      deformationResponse: 'RIGID',
      lightResponse: 'SPECULAR',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'OPAQUE',
      textureCharacter: 'SMOOTH',
      semanticNotes: 'Machined brushed alloy with anisotropic specular highlights and rigid structural integrity.',
      motionResponses: {
        TRAVEL: {
          verb: 'TRAVEL',
          description: 'Rigid body spatial relocation shifts specular highlight vectors across curvature without geometry deformation.',
          edgeResponse: 'STABLE',
        },
        EXPAND: {
          verb: 'EXPAND',
          description: 'Mechanical expansion engages calibrated telescoping seams and modular lock points.',
          edgeResponse: 'STABLE',
        },
        DEFORM: {
          verb: 'DEFORM',
          description: 'High impact induces plastic strain and localized surface micro-faceting.',
          edgeResponse: 'FRACTURED',
        },
      },
    };
  }

  public static createPlasmaMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'PLASMA',
      surfaceResponse: 'TRANSLUCENT',
      edgeResponse: 'UNSTABLE',
      deformationResponse: 'FLUID',
      lightResponse: 'EMISSIVE',
      emission: 'HIGHLY_EMISSIVE',
      opacityBehavior: 'DENSITY_DRIVEN',
      textureCharacter: 'FLUID',
      motionResponses: {
        TRAVEL: {
          verb: 'TRAVEL',
          description: 'High velocity translation creates trailing ionized wake and filamentary instability.',
          edgeResponse: 'UNSTABLE',
          emissionResponse: 'HIGHLY_EMISSIVE',
        },
        EXPAND: {
          verb: 'EXPAND',
          description: 'Volumetric thermal surge amplifies core radiant emission and expands turbulent perimeter.',
          emissionResponse: 'HIGHLY_EMISSIVE',
        },
      },
    };
  }

  public static createEnergyMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'ENERGY',
      surfaceResponse: 'TRANSLUCENT',
      edgeResponse: 'GLOWING',
      deformationResponse: 'FLUID',
      lightResponse: 'EMISSIVE',
      emission: 'HIGHLY_EMISSIVE',
      opacityBehavior: 'DENSITY_DRIVEN',
      textureCharacter: 'SMOOTH',
      motionResponses: {
        EXPAND: {
          verb: 'EXPAND',
          description: 'Energy pulse expands radially with wavefront harmonic rings.',
          emissionResponse: 'HIGHLY_EMISSIVE',
        },
      },
    };
  }

  public static createLiquidMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'LIQUID',
      surfaceResponse: 'WET',
      edgeResponse: 'FLUID',
      deformationResponse: 'FLUID',
      lightResponse: 'SPECULAR',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'TRANSLUCENT',
      textureCharacter: 'FLUID',
      motionResponses: {
        MERGE: {
          verb: 'MERGE',
          description: 'Coalescence blends meniscus boundaries through surface tension minimization.',
          edgeResponse: 'FLUID',
        },
        SPLIT: {
          verb: 'SPLIT',
          description: 'Droplet fission necks down capillary filament prior to daughter separation.',
          edgeResponse: 'FLUID',
        },
      },
    };
  }

  public static createGlassMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'GLASS',
      surfaceResponse: 'GLOSSY',
      edgeResponse: 'TRANSLUCENT',
      deformationResponse: 'BRITTLE',
      lightResponse: 'REFRACTIVE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'TRANSLUCENT',
      textureCharacter: 'SMOOTH',
      motionResponses: {
        TRAVEL: {
          verb: 'TRAVEL',
          description: 'Translation moves internal caustic refraction patterns and environment reflections.',
          edgeResponse: 'TRANSLUCENT',
        },
      },
    };
  }

  public static createStoneMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'STONE',
      surfaceResponse: 'MATTE',
      edgeResponse: 'STABLE',
      deformationResponse: 'BRITTLE',
      lightResponse: 'DIFFUSE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'OPAQUE',
      textureCharacter: 'GRAINED',
      motionResponses: {
        COLLAPSE: {
          verb: 'COLLAPSE',
          description: 'Brittle failure fractures mineral matrix into geometric rubble fragments.',
          edgeResponse: 'FRACTURED',
        },
      },
    };
  }

  public static createSmokeMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'SMOKE',
      surfaceResponse: 'DIFFUSE',
      edgeResponse: 'SOFT',
      deformationResponse: 'PARTICULATE',
      lightResponse: 'ABSORPTIVE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'VOLUME_DRIVEN',
      textureCharacter: 'POROUS',
      motionResponses: {
        EXPAND: {
          verb: 'EXPAND',
          description: 'Particulate plume diffuses outward lowering optical density and softening boundary.',
          edgeResponse: 'SOFT',
        },
      },
    };
  }

  public static createFlatGraphicMaterial(id: string, name: string): MaterialReference {
    return {
      id,
      name,
      category: 'FLAT_GRAPHIC',
      surfaceResponse: 'MATTE',
      edgeResponse: 'STABLE',
      deformationResponse: 'RIGID',
      lightResponse: 'DIFFUSE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'OPAQUE',
      textureCharacter: 'SMOOTH',
      isFlatGraphicOverride: true,
      motionResponses: {
        TRAVEL: {
          verb: 'TRAVEL',
          description: '2D diagrammatic translation across schematic plane.',
          edgeResponse: 'STABLE',
        },
      },
    };
  }
}
