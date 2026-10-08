/**
 * ============================================================================
 * DEPTH PLANNER (PHASE 5C)
 * ============================================================================
 * 
 * Transforms Natural Language Intent into physically grounded, multi-layered
 * 2.5D SpatialDepthContracts.
 * ============================================================================
 */

import {
  SpatialDepthContract,
  EntitySpatialPlacement,
  SpatialRelationship,
  OcclusionIntent,
  SpatialMotionResponse,
  DepthParallaxProfile,
  SpatialCompositionIntentType,
} from './depthSchema';
import { DepthAmbiguityGate } from './depthAmbiguityGate';

export class DepthPlanner {
  /**
   * Computes apparent perspective scale based on normalized depth z:
   * apparentScale = baseScale / (1.0 + z * 0.75)
   */
  public static calculateApparentScale(baseScale: number, z: number): number {
    const clampedZ = Math.max(0.0, Math.min(1.0, z));
    return Math.round((baseScale / (1.0 + clampedZ * 0.75)) * 1000) / 1000;
  }

  /**
   * Canonical Factory: Celestial / Astrophysics Spatial Architecture (e.g. Black Hole)
   */
  public static createCelestialSpatialContract(
    id: string,
    heroEntityId: string = 'black_hole_core',
    accretionEntityId: string = 'accretion_disk',
    jetsEntityId: string = 'plasma_jets',
    backgroundEntityId: string = 'distant_starfield'
  ): SpatialDepthContract {
    const heroZ = 0.45;
    const accretionZ = 0.52;
    const jetsZ = 0.18;
    const bgZ = 0.90;

    const placements: EntitySpatialPlacement[] = [
      {
        entityId: jetsEntityId,
        depthBand: 'FOREGROUND',
        transform: {
          x: -0.15,
          y: -0.2,
          z: jetsZ,
          scale: 0.65,
          rotationZ: -25,
        },
        apparentScale: this.calculateApparentScale(0.65, jetsZ),
        semanticSpatialRole: 'Bipolar plasma exhaust protruding forward into the foreground plane',
      },
      {
        entityId: heroEntityId,
        depthBand: 'HERO_PLANE',
        transform: {
          x: 0.0,
          y: 0.0,
          z: heroZ,
          scale: 1.0,
        },
        apparentScale: this.calculateApparentScale(1.0, heroZ),
        semanticSpatialRole: 'Primary gravitational singularity anchor defining scene center',
      },
      {
        entityId: accretionEntityId,
        depthBand: 'MIDGROUND',
        transform: {
          x: 0.0,
          y: 0.0,
          z: accretionZ,
          scale: 1.35,
          rotationX: 68,
        },
        apparentScale: this.calculateApparentScale(1.35, accretionZ),
        semanticSpatialRole: 'Relativistic plasma disk tilted and surrounding the horizon',
      },
      {
        entityId: backgroundEntityId,
        depthBand: 'DEEP_BACKGROUND',
        transform: {
          x: 0.0,
          y: 0.0,
          z: bgZ,
          scale: 1.8,
        },
        apparentScale: this.calculateApparentScale(1.8, bgZ),
        semanticSpatialRole: 'Distant gravitationally lensed stellar background',
      },
    ];

    const relationships: SpatialRelationship[] = [
      {
        id: `rel_${accretionEntityId}_surrounds_${heroEntityId}`,
        sourceEntityId: accretionEntityId,
        relation: 'SURROUNDS',
        targetEntityId: heroEntityId,
        depthDelta: accretionZ - heroZ,
        description: 'Accretion disk orbits around and encloses the central singularity',
      },
      {
        id: `rel_${jetsEntityId}_infront_${heroEntityId}`,
        sourceEntityId: jetsEntityId,
        relation: 'IN_FRONT_OF',
        targetEntityId: heroEntityId,
        depthDelta: heroZ - jetsZ,
        description: 'Fore-directed relativistic jet beam passes in front of the horizon plane',
      },
      {
        id: `rel_${heroEntityId}_infront_${backgroundEntityId}`,
        sourceEntityId: heroEntityId,
        relation: 'IN_FRONT_OF',
        targetEntityId: backgroundEntityId,
        depthDelta: bgZ - heroZ,
        description: 'Event horizon stands directly between observer and deep starfield',
      },
    ];

    const occlusions: OcclusionIntent[] = [
      {
        id: `occ_${jetsEntityId}_frames_${heroEntityId}`,
        occludingEntityId: jetsEntityId,
        occludedEntityId: heroEntityId,
        type: 'PARTIAL',
        depthDifference: heroZ - jetsZ,
        description: 'Foreground plasma exhaust filament partially overlaps the upper perimeter of the singularity',
      },
    ];

    const parallaxProfile: DepthParallaxProfile = {
      sensitivity: 'STRONG',
      response: 'STRONG',
      depthFactor: 0.85,
      description: 'Strong relativistic spatial depth falloff separating foreground jets from distant starfield',
    };

    const motionResponses: SpatialMotionResponse[] = [
      {
        verb: 'EXPAND',
        entityId: heroEntityId,
        trajectory: 'VOLUMETRIC_RADIAL',
        startZ: heroZ,
        endZ: heroZ - 0.05,
        description: 'Gravitational event horizon swells outward and projects forward in apparent perspective',
      },
      {
        verb: 'COLLAPSE',
        entityId: heroEntityId,
        trajectory: 'AWAY_FROM_VIEWER',
        startZ: heroZ,
        endZ: heroZ + 0.1,
        description: 'Singularity recedes inward into the deep gravitational well',
      },
    ];

    return {
      id,
      compositionIntent: 'ORBITAL_COMPOSITION',
      placements,
      relationships,
      occlusions,
      parallaxProfile,
      motionResponses,
    };
  }

  /**
   * Canonical Factory: Cellular / Biomedical Spatial Architecture (e.g. Cancer Cell)
   */
  public static createCellularSpatialContract(
    id: string,
    heroEntityId: string = 'cancer_cell_core',
    nanoparticleEntityId: string = 'drug_nanoparticle',
    receptorEntityId: string = 'membrane_receptors',
    environmentEntityId: string = 'cellular_environment'
  ): SpatialDepthContract {
    const fgZ = 0.18;
    const heroZ = 0.46;
    const nucleusZ = 0.55;
    const bgZ = 0.88;

    const placements: EntitySpatialPlacement[] = [
      {
        entityId: nanoparticleEntityId,
        depthBand: 'FOREGROUND',
        transform: {
          x: 0.45,
          y: -0.3,
          z: fgZ,
          scale: 0.35,
        },
        apparentScale: this.calculateApparentScale(0.35, fgZ),
        semanticSpatialRole: 'Nanoparticle approaching from anterior focal depth',
      },
      {
        entityId: heroEntityId,
        depthBand: 'HERO_PLANE',
        transform: {
          x: 0.0,
          y: 0.0,
          z: heroZ,
          scale: 1.0,
        },
        apparentScale: this.calculateApparentScale(1.0, heroZ),
        semanticSpatialRole: 'Pathological neoplastic cell floating in the midground plane',
      },
      {
        entityId: receptorEntityId,
        depthBand: 'MIDGROUND',
        transform: {
          x: 0.0,
          y: 0.0,
          z: nucleusZ,
          scale: 0.9,
        },
        apparentScale: this.calculateApparentScale(0.9, nucleusZ),
        semanticSpatialRole: 'Internal nuclear / receptor structure positioned slightly posterior',
      },
      {
        entityId: environmentEntityId,
        depthBand: 'DEEP_BACKGROUND',
        transform: {
          x: 0.0,
          y: 0.0,
          z: bgZ,
          scale: 1.6,
        },
        apparentScale: this.calculateApparentScale(1.6, bgZ),
        semanticSpatialRole: 'Receding interstitial matrix and capillary wall',
      },
    ];

    const relationships: SpatialRelationship[] = [
      {
        id: `rel_${nanoparticleEntityId}_infront_${heroEntityId}`,
        sourceEntityId: nanoparticleEntityId,
        relation: 'IN_FRONT_OF',
        targetEntityId: heroEntityId,
        depthDelta: heroZ - fgZ,
        description: 'Drug vehicle travels from foreground toward the cell membrane',
      },
      {
        id: `rel_${heroEntityId}_contains_${receptorEntityId}`,
        sourceEntityId: heroEntityId,
        relation: 'CONTAINS',
        targetEntityId: receptorEntityId,
        depthDelta: nucleusZ - heroZ,
        description: 'Cellular lipid bilayer houses internal receptor core',
      },
      {
        id: `rel_${heroEntityId}_infront_${environmentEntityId}`,
        sourceEntityId: heroEntityId,
        relation: 'IN_FRONT_OF',
        targetEntityId: environmentEntityId,
        depthDelta: bgZ - heroZ,
        description: 'Cell floats prominently separated from background matrix',
      },
    ];

    const occlusions: OcclusionIntent[] = [
      {
        id: `occ_${nanoparticleEntityId}_veils_${heroEntityId}`,
        occludingEntityId: nanoparticleEntityId,
        occludedEntityId: heroEntityId,
        type: 'PARTIAL',
        depthDifference: heroZ - fgZ,
        description: 'Foreground particle passes across anterior boundary of cell silhouette',
      },
    ];

    const parallaxProfile: DepthParallaxProfile = {
      sensitivity: 'BALANCED',
      response: 'LINEAR',
      depthFactor: 0.65,
      description: 'Microscopic fluid depth gradient providing natural biological separation',
    };

    const motionResponses: SpatialMotionResponse[] = [
      {
        verb: 'SPLIT',
        entityId: heroEntityId,
        trajectory: 'MULTI_DEPTH_CONVERGENCE',
        startZ: heroZ,
        endZ: heroZ,
        description: 'Daughter cells divide laterally while protruding slightly toward foreground and midground',
      },
      {
        verb: 'TRAVEL',
        entityId: nanoparticleEntityId,
        trajectory: 'AWAY_FROM_VIEWER',
        startZ: fgZ,
        endZ: heroZ,
        description: 'Nanoparticle descends along z-axis to dock with the cell membrane',
      },
    ];

    return {
      id,
      compositionIntent: 'LAYERED_WORLD',
      placements,
      relationships,
      occlusions,
      parallaxProfile,
      motionResponses,
    };
  }

  /**
   * Canonical Factory: Product / Technology Spatial Architecture (e.g. Precision Device)
   */
  public static createMetalSpatialContract(
    id: string,
    heroEntityId: string = 'device_core',
    chassisEntityId: string = 'device_chassis',
    framingEntityId: string = 'assembly_rail',
    backgroundEntityId: string = 'studio_canvas'
  ): SpatialDepthContract {
    const fgZ = 0.22;
    const heroZ = 0.48;
    const chassisZ = 0.58;
    const bgZ = 0.85;

    const placements: EntitySpatialPlacement[] = [
      {
        entityId: framingEntityId,
        depthBand: 'FOREGROUND',
        transform: {
          x: -0.65,
          y: 0.4,
          z: fgZ,
          scale: 0.5,
          rotationZ: 15,
        },
        apparentScale: this.calculateApparentScale(0.5, fgZ),
        semanticSpatialRole: 'Foreground precision guide rail framing lower-left composition',
      },
      {
        entityId: heroEntityId,
        depthBand: 'HERO_PLANE',
        transform: {
          x: 0.0,
          y: 0.0,
          z: heroZ,
          scale: 1.0,
        },
        apparentScale: this.calculateApparentScale(1.0, heroZ),
        semanticSpatialRole: 'Primary precision hardware device at center stage',
      },
      {
        entityId: chassisEntityId,
        depthBand: 'MIDGROUND',
        transform: {
          x: 0.25,
          y: 0.1,
          z: chassisZ,
          scale: 0.85,
        },
        apparentScale: this.calculateApparentScale(0.85, chassisZ),
        semanticSpatialRole: 'Structural mounting chassis supporting hero hardware',
      },
      {
        entityId: backgroundEntityId,
        depthBand: 'BACKGROUND',
        transform: {
          x: 0.0,
          y: 0.0,
          z: bgZ,
          scale: 1.5,
        },
        apparentScale: this.calculateApparentScale(1.5, bgZ),
        semanticSpatialRole: 'Clean dark studio cyclorama wall',
      },
    ];

    const relationships: SpatialRelationship[] = [
      {
        id: `rel_${framingEntityId}_infront_${heroEntityId}`,
        sourceEntityId: framingEntityId,
        relation: 'IN_FRONT_OF',
        targetEntityId: heroEntityId,
        depthDelta: heroZ - fgZ,
        description: 'Lower rail provides compositional depth framing in front of device',
      },
      {
        id: `rel_${chassisEntityId}_connected_${heroEntityId}`,
        sourceEntityId: chassisEntityId,
        relation: 'CONNECTED_TO',
        targetEntityId: heroEntityId,
        depthDelta: chassisZ - heroZ,
        description: 'Chassis attaches behind primary core housing',
      },
      {
        id: `rel_${heroEntityId}_infront_${backgroundEntityId}`,
        sourceEntityId: heroEntityId,
        relation: 'IN_FRONT_OF',
        targetEntityId: backgroundEntityId,
        depthDelta: bgZ - heroZ,
        description: 'Device stands distinct from dark backdrop',
      },
    ];

    const occlusions: OcclusionIntent[] = [
      {
        id: `occ_${framingEntityId}_frames_${heroEntityId}`,
        occludingEntityId: framingEntityId,
        occludedEntityId: heroEntityId,
        type: 'FRAMING',
        depthDifference: heroZ - fgZ,
        description: 'Framing rail brackets corner without obscuring focal hardware display',
      },
    ];

    const parallaxProfile: DepthParallaxProfile = {
      sensitivity: 'BALANCED',
      response: 'LINEAR',
      depthFactor: 0.7,
      description: 'Industrial studio camera staging with crisp layer stratification',
    };

    const motionResponses: SpatialMotionResponse[] = [
      {
        verb: 'TRAVEL',
        entityId: heroEntityId,
        trajectory: 'PLANAR_XY',
        startZ: heroZ,
        endZ: heroZ,
        description: 'Device translates along linear inspection vector maintaining precise focal distance',
      },
      {
        verb: 'REASSEMBLE',
        entityId: heroEntityId,
        trajectory: 'MULTI_DEPTH_CONVERGENCE',
        startZ: heroZ + 0.15,
        endZ: heroZ,
        description: 'Modular alloy components converge from distinct z-depth planes into rigid lock',
      },
    ];

    return {
      id,
      compositionIntent: 'HERO_DOMINANT',
      placements,
      relationships,
      occlusions,
      parallaxProfile,
      motionResponses,
    };
  }

  /**
   * Canonical Factory: Multi-Depth Spatial Reassembly
   */
  public static createMultiDepthReassembleSpatialContract(
    id: string,
    heroEntityId: string = 'hero_monolith',
    fragmentIds: string[] = ['frag_fg', 'frag_mid', 'frag_bg']
  ): SpatialDepthContract {
    const targetZ = 0.50;
    const placements: EntitySpatialPlacement[] = [
      {
        entityId: heroEntityId,
        depthBand: 'HERO_PLANE',
        transform: { x: 0.0, y: 0.0, z: targetZ, scale: 1.0 },
        apparentScale: this.calculateApparentScale(1.0, targetZ),
        semanticSpatialRole: 'Target assembled monolith structure',
      },
      {
        entityId: fragmentIds[0],
        depthBand: 'FOREGROUND',
        transform: { x: -0.4, y: -0.3, z: 0.20, scale: 0.6 },
        apparentScale: this.calculateApparentScale(0.6, 0.20),
        semanticSpatialRole: 'Anterior fragment converging from foreground plane',
      },
      {
        entityId: fragmentIds[1],
        depthBand: 'MIDGROUND',
        transform: { x: 0.35, y: 0.25, z: 0.52, scale: 0.75 },
        apparentScale: this.calculateApparentScale(0.75, 0.52),
        semanticSpatialRole: 'Lateral fragment converging within midground plane',
      },
      {
        entityId: fragmentIds[2],
        depthBand: 'BACKGROUND',
        transform: { x: 0.1, y: -0.4, z: 0.78, scale: 0.9 },
        apparentScale: this.calculateApparentScale(0.9, 0.78),
        semanticSpatialRole: 'Posterior fragment converging forward from background plane',
      },
    ];

    const relationships: SpatialRelationship[] = [
      {
        id: `rel_${fragmentIds[0]}_infront_${heroEntityId}`,
        sourceEntityId: fragmentIds[0],
        relation: 'IN_FRONT_OF',
        targetEntityId: heroEntityId,
        depthDelta: targetZ - 0.20,
        description: 'Anterior fragment begins in front of final target plane',
      },
      {
        id: `rel_${fragmentIds[2]}_behind_${heroEntityId}`,
        sourceEntityId: fragmentIds[2],
        relation: 'BEHIND',
        targetEntityId: heroEntityId,
        depthDelta: 0.78 - targetZ,
        description: 'Posterior fragment begins behind final target plane',
      },
    ];

    return {
      id,
      compositionIntent: 'DEPTH_CORRIDOR',
      placements,
      relationships,
      occlusions: [],
      parallaxProfile: {
        sensitivity: 'STRONG',
        response: 'STRONG',
        depthFactor: 0.9,
      },
      motionResponses: [
        {
          verb: 'REASSEMBLE',
          entityId: heroEntityId,
          trajectory: 'MULTI_DEPTH_CONVERGENCE',
          startZ: 0.78,
          endZ: targetZ,
          description: 'Fragments converge along multi-depth 3D vectors into single unified monolith',
        },
        {
          verb: 'REASSEMBLE',
          entityId: fragmentIds[0],
          trajectory: 'AWAY_FROM_VIEWER',
          startZ: 0.20,
          endZ: targetZ,
          description: 'Anterior fragment moves deeper along z-axis to assemble into hero',
        },
        {
          verb: 'REASSEMBLE',
          entityId: fragmentIds[1] || 'frag_mid',
          trajectory: 'PLANAR_XY',
          startZ: targetZ,
          endZ: targetZ,
          description: 'Midground fragment maintains hero focal plane during assembly',
        },
        {
          verb: 'REASSEMBLE',
          entityId: fragmentIds[2] || 'frag_bg',
          trajectory: 'TOWARD_VIEWER',
          startZ: 0.78,
          endZ: targetZ,
          description: 'Posterior fragment moves forward along z-axis to assemble into hero',
        },
      ],
    };
  }

  /**
   * Canonical Factory: Explicit Flat Graphic Override
   */
  public static createFlatGraphicSpatialContract(id: string): SpatialDepthContract {
    return {
      id,
      compositionIntent: 'FLAT_SCHEMATIC',
      placements: [],
      relationships: [],
      occlusions: [],
      parallaxProfile: {
        sensitivity: 'STATIC',
        response: 'SUBTLE',
        depthFactor: 0.0,
      },
      motionResponses: [],
      isFlatGraphicOverride: true,
    };
  }

  /**
   * Plans a complete SpatialDepthContract from natural language intent.
   * If intent is ambiguous or ungrounded, fails fast via DepthAmbiguityGate.
   */
  public static planSpatialContractFromText(
    creativeIntent: string,
    heroEntityId: string,
    secondaryEntityIds: string[] = [],
    backgroundEntityId: string = 'spatial_environment'
  ): SpatialDepthContract {
    // 1. Ambiguity Gate Enforcement
    DepthAmbiguityGate.validateNaturalIntent(creativeIntent);

    const lower = creativeIntent.toLowerCase();

    // 2. Domain classification
    if (lower.includes('black hole') || lower.includes('singularity') || lower.includes('accretion')) {
      return this.createCelestialSpatialContract(
        'planned_celestial_spatial',
        heroEntityId,
        secondaryEntityIds[0] || 'accretion_disk',
        secondaryEntityIds[1] || 'plasma_jets',
        backgroundEntityId
      );
    }

    if (lower.includes('cell') || lower.includes('cancer') || lower.includes('membrane') || lower.includes('biological')) {
      return this.createCellularSpatialContract(
        'planned_cellular_spatial',
        heroEntityId,
        secondaryEntityIds[0] || 'drug_nanoparticle',
        secondaryEntityIds[1] || 'membrane_receptors',
        backgroundEntityId
      );
    }

    if (lower.includes('reassemble') || lower.includes('fragments converge') || lower.includes('multi-depth')) {
      return this.createMultiDepthReassembleSpatialContract(
        'planned_reassemble_spatial',
        heroEntityId,
        secondaryEntityIds.length >= 3 ? secondaryEntityIds : ['frag_fg', 'frag_mid', 'frag_bg']
      );
    }

    // Default: Grounded Product / Device Spatial Architecture
    return this.createMetalSpatialContract(
      'planned_metal_spatial',
      heroEntityId,
      secondaryEntityIds[0] || 'device_chassis',
      secondaryEntityIds[1] || 'assembly_rail',
      backgroundEntityId
    );
  }
}

export const calculateApparentScale = DepthPlanner.calculateApparentScale;
