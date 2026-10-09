/**
 * ============================================================================
 * CINEMATIC BENCHMARK CONFIGURATION
 * ============================================================================
 * 
 * Defines the complete VisualWorld, ArtDirectionContract, MaterialReferences,
 * LightingContract, SpatialDepthContract, and Shot Profiles for the benchmark:
 * 
 * NARRATIVE: "Cellular Collapse → Fragmentation → Reorganization"
 * RESOLUTION: 1920x1080 @ 30 FPS, 720 Frames (24.0s)
 * ============================================================================
 */

import {
  VisualWorld,
  ArtDirectionContract,
  MaterialReference,
  LightingContract,
  SpatialDepthContract,
  CameraState,
  SecondaryMotionConfig,
  AnticipationConfig,
  MotionCarryContract,
} from '../visual_world';

export const BENCHMARK_TOTAL_FRAMES = 720;
export const BENCHMARK_FPS = 30;
export const BENCHMARK_WIDTH = 1920;
export const BENCHMARK_HEIGHT = 1080;

/**
 * 8 Authored Narrative Shots across 720 frames (24.0 seconds)
 */
export interface BenchmarkShotDefinition {
  id: string;
  shotNumber: number;
  name: string;
  startFrame: number;
  endFrame: number;
  durationFrames: number;
  durationSeconds: number;
  narrativeBeat: string;
  primaryVisualJob: 'ESTABLISH' | 'ANTICIPATE' | 'RUPTURE' | 'FRAGMENT' | 'TRACK' | 'HANDOFF' | 'REASSEMBLE' | 'SETTLE';
  primaryActor: string;
  cameraMotivation: CameraState['motivation'];
  summary: string;
}

export const BENCHMARK_SHOTS: BenchmarkShotDefinition[] = [
  {
    id: 'SHOT_01',
    shotNumber: 1,
    name: 'Establish Microscopic World',
    startFrame: 0,
    endFrame: 120,
    durationFrames: 120,
    durationSeconds: 4.0,
    narrativeBeat: 'Suspended living cellular organism in balanced microscopic matrix',
    primaryVisualJob: 'ESTABLISH',
    primaryActor: 'hero_cell',
    cameraMotivation: 'ENTER_WORLD',
    summary: 'Subtle microscopic drift. Hero cell breathes with organic membrane oscillation. Deep matrix provides 2.5D spatial depth.',
  },
  {
    id: 'SHOT_02',
    shotNumber: 2,
    name: 'Compression Force Approach & Anticipation',
    startFrame: 120,
    endFrame: 210,
    durationFrames: 90,
    durationSeconds: 3.0,
    narrativeBeat: 'External compression wave impinges; cell exhibits preparatory recoil',
    primaryVisualJob: 'ANTICIPATE',
    primaryActor: 'external_force',
    cameraMotivation: 'EMPHASIZE_EVENT',
    summary: 'Energy wavefront approaches from upper-right. Hero cell undergoes retrograde compression anticipation and membrane tensioning.',
  },
  {
    id: 'SHOT_03',
    shotNumber: 3,
    name: 'Primary Rupture & Nuclear Split',
    startFrame: 210,
    endFrame: 270,
    durationFrames: 60,
    durationSeconds: 2.0,
    narrativeBeat: 'Tension exceeds threshold; membrane ruptures and nucleus splits violently',
    primaryVisualJob: 'RUPTURE',
    primaryActor: 'hero_cell',
    cameraMotivation: 'EMPHASIZE_EVENT',
    summary: 'High-velocity rupture impulse. Camera punctuates impact with rapid focal punch. Nucleus fractures into two polarized bodies.',
  },
  {
    id: 'SHOT_04',
    shotNumber: 4,
    name: 'Fragmentation & Secondary Response',
    startFrame: 270,
    endFrame: 420,
    durationFrames: 150,
    durationSeconds: 5.0,
    narrativeBeat: 'Daughter fragments disperse outward; trailing organelles lag and overshoot',
    primaryVisualJob: 'FRAGMENT',
    primaryActor: 'vesicle_fragments',
    cameraMotivation: 'FOLLOW_HERO',
    summary: 'Primary fragments separate along trajectory. Secondary organelles exhibit causal temporal lag, follow-through overshoot, and micro-vesicle shedding.',
  },
  {
    id: 'SHOT_05',
    shotNumber: 5,
    name: 'Motivated Camera Tracking & Lead Room',
    startFrame: 420,
    endFrame: 480,
    durationFrames: 60,
    durationSeconds: 2.0,
    narrativeBeat: 'Camera tracks dominant daughter fragment with orbital pivot and lead room',
    primaryVisualJob: 'TRACK',
    primaryActor: 'daughter_fragment_alpha',
    cameraMotivation: 'FOLLOW_HERO',
    summary: 'Camera swings dynamically into the flight path, allocating anticipatory lead room and exposing differential parallax against the matrix filaments.',
  },
  {
    id: 'SHOT_06',
    shotNumber: 6,
    name: 'Motion-Carry Velocity Handoff',
    startFrame: 480,
    endFrame: 540,
    durationFrames: 60,
    durationSeconds: 2.0,
    narrativeBeat: 'Fragment momentum is preserved across composition boundary into harmonic basin',
    primaryVisualJob: 'HANDOFF',
    primaryActor: 'daughter_fragment_alpha',
    cameraMotivation: 'CARRY_TRANSITION',
    summary: 'Velocity conservation across the transition boundary. Target fragment carries incoming momentum smoothly without abrupt speed drops.',
  },
  {
    id: 'SHOT_07',
    shotNumber: 7,
    name: 'Harmonic Reorganization & Reassembly',
    startFrame: 540,
    endFrame: 630,
    durationFrames: 90,
    durationSeconds: 3.0,
    narrativeBeat: 'Polarized fragments enter attractive basin; membrane re-knits into higher-order cell',
    primaryVisualJob: 'REASSEMBLE',
    primaryActor: 'hero_cell',
    cameraMotivation: 'REVEAL_CONTEXT',
    summary: 'Magnetic centripetal draw. Separated daughter cores merge back into a reconstituted, higher-density cellular architecture.',
  },
  {
    id: 'SHOT_08',
    shotNumber: 8,
    name: 'Equilibrium Resolution & Settle',
    startFrame: 630,
    endFrame: 720,
    durationFrames: 90,
    durationSeconds: 3.0,
    narrativeBeat: 'Harmonic damping settles residual momentum into stable equilibrium',
    primaryVisualJob: 'SETTLE',
    primaryActor: 'hero_cell',
    cameraMotivation: 'EXIT_WORLD',
    summary: 'Secondary oscillations undergo exponential damping. Stable organic respiration resumes. Camera resolves into tranquil wide perspective.',
  },
];

/**
 * Material Language Contracts (Phase 5B.1 / 5D)
 */
export const BENCHMARK_MATERIALS_LIST: MaterialReference[] = [
  {
    id: 'mat_organic_membrane',
    name: 'Elastic Phospholipid Membrane',
    category: 'ORGANIC',
    surfaceResponse: 'SOFT',
    edgeResponse: 'SOFT',
    deformationResponse: 'VISCOELASTIC',
    lightResponse: 'SUBSURFACE',
    emission: 'NON_EMISSIVE',
    opacityBehavior: 'DENSITY_DRIVEN',
    textureCharacter: 'POROUS',
    motionResponses: {
      DEFORM: {
        verb: 'DEFORM',
        description: 'Membrane stretches and squashes while maintaining surface continuity',
        velocityDeformation: 'axial_squash_stretch',
        edgeResponse: 'SOFT',
      },
      SPLIT: {
        verb: 'SPLIT',
        description: 'Critical tension tears lipid bilayer into daughter envelopes',
        edgeResponse: 'FRACTURED',
      },
    },
  },
  {
    id: 'mat_plasma_core',
    name: 'Radiant Plasma Nucleus',
    category: 'PLASMA',
    surfaceResponse: 'GLOSSY',
    edgeResponse: 'GLOWING',
    deformationResponse: 'FLUID',
    lightResponse: 'EMISSIVE',
    emission: 'HIGHLY_EMISSIVE',
    opacityBehavior: 'DENSITY_DRIVEN',
    textureCharacter: 'FLUID',
    motionResponses: {
      SPLIT: {
        verb: 'SPLIT',
        description: 'Nuclear plasma divides along mitotic polar axis',
        emissionResponse: 'HIGHLY_EMISSIVE',
        edgeResponse: 'GLOWING',
      },
      MERGE: {
        verb: 'MERGE',
        description: 'Daughter cores coalesce into single unified radiant nucleus',
        emissionResponse: 'HIGHLY_EMISSIVE',
      },
    },
  },
  {
    id: 'mat_energy_wave',
    name: 'Compressive Energy Wavefront',
    category: 'ENERGY',
    surfaceResponse: 'GLOSSY',
    edgeResponse: 'UNSTABLE',
    deformationResponse: 'FLUID',
    lightResponse: 'EMISSIVE',
    emission: 'HIGHLY_EMISSIVE',
    opacityBehavior: 'TRANSLUCENT',
    textureCharacter: 'STRIATED',
    motionResponses: {
      TRAVEL: {
        verb: 'TRAVEL',
        description: 'Kinetic shock propagates through extracellular medium',
        emissionResponse: 'HIGHLY_EMISSIVE',
      },
    },
  },
  {
    id: 'mat_liquid_vesicle',
    name: 'Refractive Organelle Droplets',
    category: 'LIQUID',
    surfaceResponse: 'WET',
    edgeResponse: 'FLUID',
    deformationResponse: 'ELASTIC',
    lightResponse: 'SPECULAR',
    emission: 'WEAKLY_EMISSIVE',
    opacityBehavior: 'TRANSLUCENT',
    textureCharacter: 'SMOOTH',
    motionResponses: {
      EXPAND: {
        verb: 'EXPAND',
        description: 'Droplets disperse with viscous fluid damping',
      },
    },
  },
  {
    id: 'mat_matrix_filament',
    name: 'Extracellular Collagen Scaffolding',
    category: 'STONE',
    surfaceResponse: 'MATTE',
    edgeResponse: 'STABLE',
    deformationResponse: 'RIGID',
    lightResponse: 'DIFFUSE',
    emission: 'NON_EMISSIVE',
    opacityBehavior: 'OPAQUE',
    textureCharacter: 'FIBROUS',
    motionResponses: {},
  },
  {
    id: 'mat_particulate_floater',
    name: 'Microscopic Cytosolic Particulates',
    category: 'GLASS',
    surfaceResponse: 'TRANSLUCENT',
    edgeResponse: 'TRANSLUCENT',
    deformationResponse: 'BRITTLE',
    lightResponse: 'REFRACTIVE',
    emission: 'NON_EMISSIVE',
    opacityBehavior: 'TRANSLUCENT',
    textureCharacter: 'SMOOTH',
    motionResponses: {},
  },
];

export const BENCHMARK_MATERIALS: Record<string, MaterialReference> = Object.fromEntries(
  BENCHMARK_MATERIALS_LIST.map((m) => [m.id, m])
);

/**
 * Lighting Contract (Phase 5B.2 / 5D.1)
 */
export const BENCHMARK_LIGHTING: LightingContract = {
  id: 'light_cellular_microscope',
  sources: [
    {
      id: 'light_key_cyan',
      name: 'Microscopic Key Illuminator',
      type: 'KEY',
      direction: { semantic: 'UPPER_LEFT' },
      intensity: { level: 'HIGH', value: 1.25 },
      color: { semantic: 'CYAN', hex: '#38bdf8' },
      softness: 'MEDIUM',
      targetEntityId: 'hero_cell',
      enabled: true,
    },
    {
      id: 'light_fill_indigo',
      name: 'Extracellular Fill Light',
      type: 'FILL',
      direction: { semantic: 'LOWER_RIGHT' },
      intensity: { level: 'MEDIUM', value: 0.55 },
      color: { semantic: 'BLUE', hex: '#818cf8' },
      softness: 'SOFT',
      targetEntityId: 'hero_cell',
      enabled: true,
    },
    {
      id: 'light_rim_crimson',
      name: 'Membrane Stress Rim Light',
      type: 'RIM',
      direction: { semantic: 'LOWER_LEFT' },
      intensity: { level: 'HIGH', value: 0.88 },
      color: { semantic: 'RED', hex: '#f43f5e' },
      softness: 'HARD',
      targetEntityId: 'hero_cell',
      enabled: true,
    },
  ],
  ambientProfile: {
    level: 'LOW',
    value: 0.18,
    color: { semantic: 'NEUTRAL', hex: '#030712' },
  },
  materialInteractions: [
    {
      id: 'inter_membrane_key',
      entityId: 'hero_cell',
      materialId: 'mat_organic_membrane',
      lightSourceId: 'light_key_cyan',
      highlightCharacter: 'SOFT_DIFFUSE',
      shadowCharacter: 'DIFFUSE_WRAPPING',
      rimCharacter: 'SUBSURFACE_GLOW',
      description: 'Subsurface illumination through phospholipid membrane',
    },
    {
      id: 'inter_plasma_emissive',
      entityId: 'nucleus_core',
      materialId: 'mat_plasma_core',
      lightSourceId: 'light_key_cyan',
      highlightCharacter: 'NONE',
      shadowCharacter: 'MINIMAL_SHADOW',
      rimCharacter: 'SOFT_HALO',
      description: 'Self-luminous radiant plasma nucleus',
    },
  ],
  motionResponses: [
    {
      verb: 'DEFORM',
      entityId: 'hero_cell',
      lightSourceId: 'light_rim_crimson',
      intensityModulation: 'tension_correlated_flare',
      description: 'Rim highlight sharpens as membrane tension increases',
    },
  ],
};

/**
 * Spatial Depth Contract (Phase 5C / 5C.1)
 */
export const BENCHMARK_SPATIAL_CONTRACT: SpatialDepthContract = {
  id: 'spatial_cellular_realm',
  compositionIntent: 'LAYERED_WORLD',
  placements: [
    {
      entityId: 'foreground_floaters',
      depthBand: 'FOREGROUND',
      transform: { x: 0.25, y: -0.20, z: 0.14, scale: 1.2 },
      semanticSpatialRole: 'Framing foreground particulate currents',
    },
    {
      entityId: 'external_force',
      depthBand: 'MIDGROUND',
      transform: { x: 0.50, y: -0.40, z: 0.32, scale: 1.1 },
      semanticSpatialRole: 'Impinging kinetic energy wavefront',
    },
    {
      entityId: 'hero_cell',
      depthBand: 'HERO_PLANE',
      transform: { x: 0.0, y: 0.0, z: 0.45, scale: 1.0 },
      semanticSpatialRole: 'Primary central cellular organism',
    },
    {
      entityId: 'nucleus_core',
      depthBand: 'HERO_PLANE',
      transform: { x: 0.0, y: 0.0, z: 0.48, scale: 0.95 },
      semanticSpatialRole: 'Internal nuclear organelle',
    },
    {
      entityId: 'vesicle_fragments',
      depthBand: 'HERO_PLANE',
      transform: { x: 0.0, y: 0.0, z: 0.46, scale: 1.0 },
      semanticSpatialRole: 'Trailing secondary organelle droplets',
    },
    {
      entityId: 'matrix_filaments',
      depthBand: 'DEEP_BACKGROUND',
      transform: { x: 0.0, y: 0.0, z: 0.88, scale: 0.75 },
      semanticSpatialRole: 'Deep collagen extracellular scaffolding',
    },
  ],
  relationships: [
    {
      id: 'rel_nucleus_inside_cell',
      sourceEntityId: 'nucleus_core',
      relation: 'CONTAINS',
      targetEntityId: 'hero_cell',
      depthDelta: 0.03,
    },
  ],
  occlusions: [
    {
      id: 'occ_floaters_veil_hero',
      occludingEntityId: 'foreground_floaters',
      occludedEntityId: 'hero_cell',
      type: 'TRANSLUCENT_VEILING',
      depthDifference: 0.31,
    },
  ],
  parallaxProfile: {
    sensitivity: 'BALANCED',
    response: 'LINEAR',
    depthFactor: 0.65,
  },
  motionResponses: [
    {
      verb: 'SPLIT',
      entityId: 'hero_cell',
      trajectory: 'PLANAR_XY',
      startZ: 0.45,
      endZ: 0.45,
      description: 'Bilateral fission across hero Z plane',
    },
  ],
};

/**
 * Art Direction Contract (Phase 5A)
 */
export const BENCHMARK_ART_DIRECTION: ArtDirectionContract = {
  visualStyle: 'cinematic_scientific',
  visualDensity: 'MEDIUM',
  contrastProfile: 'high_hero_low_environment',
  depthProfile: 'layered_2_5d',
  motionCharacter: 'viscous_cellular',
  visualHierarchy: ['PRIMARY', 'SECONDARY', 'TERTIARY', 'ENVIRONMENT'],
  compositionIntent: 'centered_hero_with_balanced_space',
  atmosphereIntent: 'deep_fluid_cytomatrix_with_bioluminescent_nodes',
  colorLanguage: {
    primaryHue: '#38bdf8',
    secondaryHue: '#818cf8',
    accentHue: '#f43f5e',
    dominantTone: 'DARK_CINEMATIC',
    backgroundHex: '#030712',
  },
};

/**
 * Complete VisualWorld Specification
 */
export const BENCHMARK_VISUAL_WORLD: VisualWorld = {
  worldId: 'world_cellular_collapse_benchmark',
  title: 'Microscopic Cellular Realm',
  hero: {
    id: 'hero_cell',
    label: 'Primary Living Cell',
    semanticRole: 'HERO',
    visualRole: 'Primary Cellular Membrane',
    importance: 'PRIMARY',
    persistence: true,
    depthLayer: 'HERO_PLANE',
    scaleClass: 'FOCAL',
    visualPriority: 1,
    semanticPurpose: 'Hero organism undergoing collapse, rupture and reassembly',
    materialId: 'mat_organic_membrane',
  },
  secondaryEntities: [
    {
      id: 'nucleus_core',
      label: 'Radiant Plasma Nucleus',
      semanticRole: 'SECONDARY',
      visualRole: 'Cell Nucleus & Genetic Core',
      importance: 'SECONDARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'SUPPORTING',
      visualPriority: 2,
      semanticPurpose: 'Radiant core dividing and reuniting',
      materialId: 'mat_plasma_core',
    },
    {
      id: 'external_force',
      label: 'Compressive Wavefront',
      semanticRole: 'SECONDARY',
      visualRole: 'External Kinetic Force Vector',
      importance: 'SECONDARY',
      persistence: false,
      depthLayer: 'MIDGROUND',
      scaleClass: 'SUPPORTING',
      visualPriority: 3,
      semanticPurpose: 'Incoming compression force precipitating collapse',
      materialId: 'mat_energy_wave',
    },
    {
      id: 'vesicle_fragments',
      label: 'Organelle Vesicles',
      semanticRole: 'SECONDARY',
      visualRole: 'Trailing Cytosolic Droplets',
      importance: 'SECONDARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'SUPPORTING',
      visualPriority: 4,
      semanticPurpose: 'Secondary lagging and follow-through response',
      materialId: 'mat_liquid_vesicle',
    },
  ],
  tertiaryEntities: [
    {
      id: 'foreground_floaters',
      label: 'Cytoplasmic Particulates',
      semanticRole: 'TERTIARY',
      visualRole: 'Veiling Micro-particulates',
      importance: 'TERTIARY',
      persistence: true,
      depthLayer: 'FOREGROUND',
      scaleClass: 'ACCENT',
      visualPriority: 7,
      semanticPurpose: 'Parallax and depth cues in near camera zone',
      materialId: 'mat_particulate_floater',
    },
  ],
  environmentEntities: [
    {
      id: 'matrix_filaments',
      label: 'Collagen Scaffolding',
      semanticRole: 'ENVIRONMENT',
      visualRole: 'Extracellular Deep Matrix',
      importance: 'ENVIRONMENT',
      persistence: true,
      depthLayer: 'DEEP_BACKGROUND',
      scaleClass: 'ENVIRONMENTAL',
      visualPriority: 9,
      semanticPurpose: 'Stable contextual framework with deep parallax',
      materialId: 'mat_matrix_filament',
    },
  ],
  composition: {
    compositionIntent: 'centered_hero_with_negative_space',
    heroAnchor: 'CENTER',
    safeRegion: { xMin: 0.05, xMax: 0.95, yMin: 0.05, yMax: 0.95 },
    focalRegion: 'CENTRAL',
    visualBalance: 'DYNAMIC_TRIANGULAR',
    negativeSpace: 'BALANCED',
    aspectRatio: '16:9',
  },
  depth: {
    depthLayers: ['FOREGROUND', 'MIDGROUND', 'HERO_PLANE', 'BACKGROUND', 'DEEP_BACKGROUND'],
    depthOrder: {
      foreground_floaters: 100,
      external_force: 75,
      hero_cell: 50,
      nucleus_core: 48,
      vesicle_fragments: 49,
      matrix_filaments: 10,
    },
    relativeDepth: {
      foreground_floaters: -350,
      external_force: -150,
      hero_cell: 0,
      nucleus_core: 20,
      vesicle_fragments: 10,
      matrix_filaments: 450,
    },
    parallaxIntent: 'STRONG',
  },
  artDirection: BENCHMARK_ART_DIRECTION,
  materials: BENCHMARK_MATERIALS_LIST,
  lighting: BENCHMARK_LIGHTING,
  spatial: BENCHMARK_SPATIAL_CONTRACT,
};

/**
 * Secondary Motion, Anticipation, & Follow-Through Contract (Phase 5F)
 */
export const BENCHMARK_SECONDARY_MOTION_CONFIG: SecondaryMotionConfig = {
  delayFrames: 6,
  responseStrength: 0.55,
  damping: 0.82,
  maxOvershoot: 32,
  followThroughDuration: 24,
  elasticity: 0.58,
};

export const BENCHMARK_ANTICIPATION_CONFIG: AnticipationConfig = {
  durationFrames: 25,
  displacementDistance: 28,
  compressionScale: 0.88,
  coilAngleDeg: -7,
};

export const BENCHMARK_MOTION_CARRY_CONFIG: MotionCarryContract = {
  sourceEntityId: 'daughter_fragment_alpha',
  targetEntityId: 'daughter_fragment_alpha',
  sourceVelocity: { x: -14.5, y: 4.2 },
  handoffFrame: 480,
  carryStrength: 0.92,
  continuityWindow: 60,
  spatialDirection: 'LEFT',
};
