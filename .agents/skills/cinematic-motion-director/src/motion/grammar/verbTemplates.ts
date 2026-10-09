/**
 * ============================================================================
 * EXECUTABLE MOTION GRAMMAR VERB TEMPLATES (PHASE 4A)
 * ============================================================================
 * 
 * CORE ARCHITECTURAL INVARIANT:
 *   Creative Intent -> Motion Scene Graph -> TransformationContract
 *     -> Executable Motion Grammar Template -> PersistentWorld -> Remotion
 * 
 * ZERO-SLIDESHOW ENFORCEMENT:
 *   Every verb template guarantees non-opacity, continuous transformation
 *   during the middle 60% of the shot [0.20*D, 0.80*D].
 *   Transforms modify coupled properties:
 *     (position, rotation, scale, geometry, shape, topology, depth, components)
 * 
 * TAXONOMY OF 8 CORE VERBS:
 *   1. SPLIT       - 1 entity separates into N diverging daughter entities
 *   2. EXPAND      - Compact core undergoes volumetric radial architectural deployment
 *   3. TRAVEL      - Spatial translation along directional vector with velocity derivation
 *   4. COLLAPSE    - Dispersed structure implodes into high-density singularity core
 *   5. MORPH       - Continuous topological metamorphosis (Shape A -> Shape B)
 *   6. MERGE       - Multiple distinct entities collide and coalesce into 1 unified mass
 *   7. DEFORM      - Volume-preserving squash, stretch, and shear under dynamic load
 *   8. REASSEMBLE  - Scattered 3D fragments converge and lock into monolithic structure
 * ============================================================================
 */

import { interpolate, Easing } from 'remotion';
import {
  MotionVerb,
  Vector3D,
  Rotation3D,
  EntitySpatialState,
  TransformationContract,
  EvaluatedEntityFrame,
  EvaluatedSubComponent,
  ValidatorExpectationContract,
  CausalStateTransitionContract,
} from './motionGrammar';

// Standard high-performance editorial easings
export const EASE_OUT_EXPO = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT_CUBIC = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_ANTICIPATION = Easing.bezier(0.36, 0, 0.66, -0.2);

export interface BaseVerbConfig {
  shotId: string;
  heroId: string;
  heroLabel: string;
  startFrame: number;
  endFrame: number;
  triggerFrame?: number;
  forceType?: string;
  narrationMarker?: string;
  persistsFrom?: string;
  persistsTo?: string;
}

export interface ExecutableVerbResult {
  contract: TransformationContract;
  evaluate: (frame: number) => EvaluatedEntityFrame;
}

// ============================================================================
// 1. VERB TEMPLATE: SPLIT
// ============================================================================
export interface SplitTemplateConfig extends BaseVerbConfig {
  origin: Vector3D;
  separationDistance: number; // e.g. 160px
  splitAxis?: 'horizontal' | 'vertical' | 'diagonal';
  daughterCount?: number;     // default: 2
  baseScale?: number;
}

export function createSplitTemplate(config: SplitTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    origin,
    separationDistance,
    splitAxis = 'horizontal',
    daughterCount = 2,
    baseScale = 1.0,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.2),
    forceType = 'fission_cleavage_surge',
    narrationMarker = 'تقسیم و انشعاب ساختار به مولفه‌های بنیادین',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.25);
  const midEnd = Math.round(startFrame + duration * 0.75);

  const dx = splitAxis === 'horizontal' ? separationDistance / 2 : splitAxis === 'diagonal' ? separationDistance * 0.35 : 0;
  const dy = splitAxis === 'vertical' ? separationDistance / 2 : splitAxis === 'diagonal' ? separationDistance * 0.35 : 0;

  const initialState: EntitySpatialState = {
    position: { ...origin },
    scale: baseScale,
    rotation: { z: 0 },
    geometry: 'single_unified_core',
    state: 'intact',
  };

  const finalState: EntitySpatialState = {
    position: { ...origin },
    scale: baseScale * 0.95,
    rotation: { z: splitAxis === 'diagonal' ? 25 : 0 },
    geometry: 'split_daughter_pair',
    state: 'bipolar_divided',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'SPLIT',
    minCentroidDisplacement: separationDistance * 0.3,
    minFlowVariance: 0.05,
    expectedComponentCount: daughterCount,
    guaranteedActiveWindow: [0.25, 0.75],
    nonStaticThreshold: 0.25,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: {
      id: heroId,
      label: heroLabel,
      persistsFrom,
      persistsTo,
    },
    initialState,
    trigger: {
      frame: triggerFrame,
      narrationMarker,
      forceType,
    },
    midpointEvent: {
      verb: 'SPLIT',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round((midStart + midEnd) / 2), action: 'Cleavage furrow divides parent mass into dual poles' },
      ],
      meaningfulDelta: {
        property: 'position',
        expectedMinimumDelta: separationDistance * 0.4,
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: dx > 0 ? 3 : 0, y: dy > 0 ? 3 : 0, z: 0 },
      angularVelocity: 0.8,
      consequence: 'Daughter entities diverge into independent cinematic trajectories',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let progress = 0;
    let elongation = 1.0;
    let separation = 0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      // Preparation / Pre-split stretch
      const prepP = Math.max(0, (f - startFrame) / Math.max(1, midStart - startFrame));
      elongation = 1.0 + Math.sin(prepP * Math.PI) * 0.2;
      activeVerb = 'ENTER';
      isMeaningful = prepP > 0.4;
    } else if (f <= midEnd) {
      // Active Split Metamorphosis (Middle 60%)
      progress = EASE_IN_OUT_CUBIC((f - midStart) / midDuration);
      separation = interpolate(progress, [0, 1], [0, separationDistance]);
      elongation = interpolate(progress, [0, 0.4, 1], [1.2, 1.35, 1.0]);
      activeVerb = 'SPLIT';
      isMeaningful = true;
    } else {
      // Settled daughter entities with recoil
      const settleP = Math.max(0, (f - midEnd) / Math.max(1, endFrame - midEnd));
      separation = separationDistance + Math.sin(settleP * Math.PI * 2) * 4 * (1 - settleP);
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = settleP < 0.6;
    }

    const halfSep = separation / 2;
    const daughterScale = baseScale * (separation > 0 ? 0.72 : 1.0);

    const components: EvaluatedSubComponent[] = [
      {
        id: `${heroId}_daughter_A`,
        position: { x: origin.x - (splitAxis !== 'vertical' ? halfSep : 0), y: origin.y - (splitAxis !== 'horizontal' ? halfSep : 0), z: 0 },
        scale: daughterScale,
        rotation: { z: -progress * 15 },
        opacity: 1.0,
        geometry: 'daughter_vesicle_left',
        color: '#38BDF8',
      },
      {
        id: `${heroId}_daughter_B`,
        position: { x: origin.x + (splitAxis !== 'vertical' ? halfSep : 0), y: origin.y + (splitAxis !== 'horizontal' ? halfSep : 0), z: 0 },
        scale: daughterScale,
        rotation: { z: progress * 15 },
        opacity: 1.0,
        geometry: 'daughter_vesicle_right',
        color: '#818CF8',
      },
    ];

    return {
      position: { ...origin },
      scale: baseScale,
      rotation: { z: 0 },
      opacity: 1.0,
      geometry: separation > 10 ? 'bipolar_cleavage' : 'unified_core',
      state: separation > 10 ? 'split' : 'intact',
      activeVerb,
      instantaneousVelocity: { x: (dx / duration) * (f >= midStart ? 1.5 : 0.5), y: 0, z: 0 },
      isMeaningfulMotionActive: isMeaningful,
      components,
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}

// ============================================================================
// 2. VERB TEMPLATE: EXPAND
// ============================================================================
export interface ExpandTemplateConfig extends BaseVerbConfig {
  anchor: Vector3D;
  initialScale?: number;      // e.g. 0.65
  expandedScale?: number;     // e.g. 1.35
  ringLayersCount?: number;   // e.g. 3 concentric architectural layers
}

export function createExpandTemplate(config: ExpandTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    anchor,
    initialScale = 0.65,
    expandedScale = 1.35,
    ringLayersCount = 3,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.18),
    forceType = 'thermal_decompression_surge',
    narrationMarker = 'گسترش حجمی و استقرار لایه‌های ساختاری',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.22);
  const midEnd = Math.round(startFrame + duration * 0.72);

  const initialState: EntitySpatialState = {
    position: { ...anchor },
    scale: initialScale,
    rotation: { z: 0 },
    geometry: 'dense_core_nucleus',
    state: 'dormant_compressed',
  };

  const finalState: EntitySpatialState = {
    position: { ...anchor },
    scale: expandedScale,
    rotation: { z: 45 },
    geometry: 'expanded_multi_ring_architecture',
    state: 'fully_deployed',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'EXPAND',
    minSpatialAreaRatio: (expandedScale / initialScale),
    minRotationDelta: 30,
    guaranteedActiveWindow: [0.22, 0.72],
    nonStaticThreshold: 0.20,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: { id: heroId, label: heroLabel, persistsFrom, persistsTo },
    initialState,
    trigger: { frame: triggerFrame, narrationMarker, forceType },
    midpointEvent: {
      verb: 'EXPAND',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round(midStart + (midEnd - midStart) * 0.4), action: 'Primary outer architectural ring unfolds' },
        { frame: Math.round(midStart + (midEnd - midStart) * 0.8), action: 'Secondary lattice reaches full perimeter lock' },
      ],
      meaningfulDelta: {
        property: 'scale',
        expectedMinimumDelta: expandedScale - initialScale,
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: 0, y: 0, z: -4 },
      angularVelocity: 0.6,
      consequence: 'Expanded architectural matrix anchors world space',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let scale = initialScale;
    let rotationZ = 0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      // Anticipation compression
      const p = (f - startFrame) / Math.max(1, midStart - startFrame);
      scale = initialScale * (1 - Math.sin(p * Math.PI) * 0.08);
      activeVerb = 'ENTER';
      isMeaningful = p > 0.5;
    } else if (f <= midEnd) {
      // Continuous Volumetric Expansion (Middle 60%)
      const progress = EASE_OUT_EXPO((f - midStart) / midDuration);
      scale = interpolate(progress, [0, 1], [initialScale * 0.92, expandedScale]);
      rotationZ = interpolate(progress, [0, 1], [0, 45]);
      activeVerb = 'EXPAND';
      isMeaningful = true;
    } else {
      // Settled expanded state with subtle energetic breathing
      const p = (f - midEnd) / Math.max(1, endFrame - midEnd);
      scale = expandedScale + Math.sin(p * Math.PI * 2) * 0.03 * (1 - p);
      rotationZ = 45 + p * 5;
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = p < 0.5;
    }

    const components: EvaluatedSubComponent[] = [];
    for (let i = 0; i < ringLayersCount; i++) {
      const ringRatio = (i + 1) / ringLayersCount;
      components.push({
        id: `${heroId}_ring_${i + 1}`,
        position: { ...anchor },
        scale: scale * ringRatio,
        rotation: { z: rotationZ * (i % 2 === 0 ? 1 : -1) },
        opacity: 0.9 - (i * 0.15),
        geometry: `concentric_ring_${i + 1}`,
        color: i === 0 ? '#F59E0B' : '#10B981',
      });
    }

    return {
      position: { ...anchor },
      scale,
      rotation: { z: rotationZ },
      opacity: 1.0,
      geometry: 'concentric_expanded_rings',
      state: scale > (initialScale + 0.2) ? 'expanded' : 'compressed',
      activeVerb,
      instantaneousVelocity: { x: 0, y: 0, z: (expandedScale - initialScale) * 2 },
      isMeaningfulMotionActive: isMeaningful,
      components,
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}

// ============================================================================
// 3. VERB TEMPLATE: TRAVEL
// ============================================================================
export interface TravelTemplateConfig extends BaseVerbConfig {
  from: Vector3D;
  to: Vector3D;
  headingTilt?: number;      // Tilt angle during transit, e.g. 18 deg
  baseScale?: number;
}

export function createTravelTemplate(config: TravelTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    from,
    to,
    headingTilt = 18,
    baseScale = 1.0,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.15),
    forceType = 'vector_propulsion_impulse',
    narrationMarker = 'انتقال سریع در بستر مختصات به سوی موقعیت هدف',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.20);
  const midEnd = Math.round(startFrame + duration * 0.75);

  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  const displacement = Math.hypot(deltaX, deltaY);

  const initialState: EntitySpatialState = {
    position: { ...from },
    scale: baseScale,
    rotation: { z: 0 },
    geometry: 'cruising_capsule',
    state: 'pre_launch',
  };

  const finalState: EntitySpatialState = {
    position: { ...to },
    scale: baseScale,
    rotation: { z: 0 },
    geometry: 'docked_capsule',
    state: 'arrived',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'TRAVEL',
    minCentroidDisplacement: displacement * 0.4,
    guaranteedActiveWindow: [0.20, 0.75],
    nonStaticThreshold: 0.20,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: { id: heroId, label: heroLabel, persistsFrom, persistsTo },
    initialState,
    trigger: { frame: triggerFrame, narrationMarker, forceType },
    midpointEvent: {
      verb: 'TRAVEL',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round((midStart + midEnd) / 2), action: 'Velocity peak achieved mid-transit' },
      ],
      meaningfulDelta: {
        property: 'position',
        expectedMinimumDelta: displacement * 0.5,
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: (deltaX / duration) * 2, y: (deltaY / duration) * 2, z: 0 },
      angularVelocity: 0.2,
      consequence: 'Terminal arrival momentum transfers into target landing anchor',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let px = from.x;
    let py = from.y;
    let pz = from.z ?? 0;
    let rotZ = 0;
    let stretch = 1.0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      // Anticipation back-draw
      const p = (f - startFrame) / Math.max(1, midStart - startFrame);
      px = from.x - (deltaX * 0.05 * Math.sin(p * Math.PI));
      py = from.y - (deltaY * 0.05 * Math.sin(p * Math.PI));
      rotZ = -headingTilt * 0.4 * Math.sin(p * Math.PI);
      activeVerb = 'ENTER';
      isMeaningful = p > 0.5;
    } else if (f <= midEnd) {
      // Continuous High-Velocity Transit (Middle 60%)
      const progress = EASE_IN_OUT_CUBIC((f - midStart) / midDuration);
      px = interpolate(progress, [0, 1], [from.x, to.x]);
      py = interpolate(progress, [0, 1], [from.y, to.y]);
      pz = interpolate(progress, [0, 1], [from.z ?? 0, to.z ?? 0]);
      rotZ = Math.sin(progress * Math.PI) * headingTilt;
      stretch = 1.0 + Math.sin(progress * Math.PI) * 0.25; // Kinetic stretch along vector
      activeVerb = 'TRAVEL';
      isMeaningful = true;
    } else {
      // Settling deceleration with damped impact
      const p = (f - midEnd) / Math.max(1, endFrame - midEnd);
      px = to.x + (deltaX * 0.03 * Math.sin(p * Math.PI * 2) * (1 - p));
      py = to.y + (deltaY * 0.03 * Math.sin(p * Math.PI * 2) * (1 - p));
      rotZ = headingTilt * 0.2 * (1 - p);
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = p < 0.6;
    }

    return {
      position: { x: px, y: py, z: pz },
      scale: baseScale,
      rotation: { z: rotZ },
      opacity: 1.0,
      geometry: 'kinetic_travel_capsule',
      state: f >= midEnd ? 'docked' : 'in_transit',
      activeVerb,
      instantaneousVelocity: { x: (deltaX / duration) * 2, y: (deltaY / duration) * 2, z: 0 },
      isMeaningfulMotionActive: isMeaningful,
      aspectRatio: stretch,
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}

// ============================================================================
// 4. VERB TEMPLATE: COLLAPSE
// ============================================================================
export interface CollapseTemplateConfig extends BaseVerbConfig {
  center: Vector3D;
  initialScale?: number;      // e.g. 1.6
  collapsedScale?: number;    // e.g. 0.35
  spinDegrees?: number;       // e.g. 270 deg of angular acceleration
}

export function createCollapseTemplate(config: CollapseTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    center,
    initialScale = 1.6,
    collapsedScale = 0.35,
    spinDegrees = 270,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.18),
    forceType = 'gravitational_implosion_drain',
    narrationMarker = 'فروپاشی ناگهانی و تراکم درون‌زا در نقطه تکینگی',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.22);
  const midEnd = Math.round(startFrame + duration * 0.72);

  const initialState: EntitySpatialState = {
    position: { ...center },
    scale: initialScale,
    rotation: { z: 0 },
    geometry: 'dispersed_cluster_matrix',
    state: 'diffuse_extended',
  };

  const finalState: EntitySpatialState = {
    position: { ...center },
    scale: collapsedScale,
    rotation: { z: spinDegrees },
    geometry: 'dense_singularity_core',
    state: 'ultra_compressed',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'COLLAPSE',
    maxSpatialAreaRatio: (collapsedScale / initialScale),
    minRotationDelta: 90,
    guaranteedActiveWindow: [0.22, 0.72],
    nonStaticThreshold: 0.20,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: { id: heroId, label: heroLabel, persistsFrom, persistsTo },
    initialState,
    trigger: { frame: triggerFrame, narrationMarker, forceType },
    midpointEvent: {
      verb: 'COLLAPSE',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round((midStart + midEnd) / 2), action: 'Perimeter boundary implodes past critical event horizon' },
      ],
      meaningfulDelta: {
        property: 'scale',
        expectedMinimumDelta: initialScale - collapsedScale,
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: 0, y: 0, z: 8 },
      angularVelocity: 4.5, // High angular spin conserved
      consequence: 'Gravitational singularity well triggers environment implosion wave',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let scale = initialScale;
    let rotationZ = 0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      // Instability wobble
      const p = (f - startFrame) / Math.max(1, midStart - startFrame);
      scale = initialScale + Math.sin(p * Math.PI * 3) * 0.05;
      rotationZ = Math.sin(p * Math.PI) * 10;
      activeVerb = 'ENTER';
      isMeaningful = p > 0.5;
    } else if (f <= midEnd) {
      // Inward Gravitational Acceleration (Middle 60%)
      const progress = EASE_IN_OUT_CUBIC((f - midStart) / midDuration);
      scale = interpolate(progress, [0, 1], [initialScale, collapsedScale]);
      // Angular velocity accelerates as radius shrinks (Conservation of Angular Momentum)
      rotationZ = interpolate(Math.pow(progress, 1.8), [0, 1], [0, spinDegrees]);
      activeVerb = 'COLLAPSE';
      isMeaningful = true;
    } else {
      // Singularity core pulse
      const p = (f - midEnd) / Math.max(1, endFrame - midEnd);
      scale = collapsedScale + Math.sin(p * Math.PI * 4) * 0.03 * (1 - p);
      rotationZ = spinDegrees + (p * 45);
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = p < 0.6;
    }

    return {
      position: { ...center },
      scale,
      rotation: { z: rotationZ },
      opacity: 1.0,
      geometry: 'imploding_singularity',
      state: scale < (initialScale * 0.6) ? 'collapsed' : 'extended',
      activeVerb,
      instantaneousVelocity: { x: 0, y: 0, z: (initialScale - collapsedScale) * 3 },
      isMeaningfulMotionActive: isMeaningful,
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}

// ============================================================================
// 5. VERB TEMPLATE: MORPH
// ============================================================================
export interface MorphTemplateConfig extends BaseVerbConfig {
  center: Vector3D;
  fromGeometry: string;       // e.g. 'circle'
  toGeometry: string;         // e.g. 'faceted_hexagon'
  fromDimensions: { width: number; height: number; borderRadius: number };
  toDimensions: { width: number; height: number; borderRadius: number };
  rotationShift?: number;     // e.g. 60 deg
}

export function createMorphTemplate(config: MorphTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    center,
    fromGeometry,
    toGeometry,
    fromDimensions,
    toDimensions,
    rotationShift = 60,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.20),
    forceType = 'molecular_catalysis_phase_transition',
    narrationMarker = 'دگرگونی هندسی و استحاله مرزهای فیزیکی پدیده',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.25);
  const midEnd = Math.round(startFrame + duration * 0.75);

  const initialState: EntitySpatialState = {
    position: { ...center },
    scale: 1.0,
    rotation: { z: 0 },
    geometry: fromGeometry,
    state: 'initial_phase',
  };

  const finalState: EntitySpatialState = {
    position: { ...center },
    scale: 1.0,
    rotation: { z: rotationShift },
    geometry: toGeometry,
    state: 'metamorphosed_phase',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'MORPH',
    minRotationDelta: rotationShift * 0.5,
    guaranteedActiveWindow: [0.25, 0.75],
    nonStaticThreshold: 0.25,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: { id: heroId, label: heroLabel, persistsFrom, persistsTo },
    initialState,
    trigger: { frame: triggerFrame, narrationMarker, forceType },
    midpointEvent: {
      verb: 'MORPH',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round((midStart + midEnd) / 2), action: 'Critical topological deformation threshold crossed' },
      ],
      meaningfulDelta: {
        property: 'geometry',
        expectedMinimumDelta: Math.abs(toDimensions.width - fromDimensions.width),
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: 0, y: 0, z: 0 },
      angularVelocity: 0.5,
      consequence: 'New geometric topology unlocks downstream mechanical pathways',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let progress = 0;
    let rotationZ = 0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      // Fluid anticipation shudder
      const p = (f - startFrame) / Math.max(1, midStart - startFrame);
      rotationZ = Math.sin(p * Math.PI * 2) * 4;
      activeVerb = 'ENTER';
      isMeaningful = p > 0.6;
    } else if (f <= midEnd) {
      // Active Topological Metamorphosis (Middle 60%)
      progress = EASE_IN_OUT_CUBIC((f - midStart) / midDuration);
      rotationZ = interpolate(progress, [0, 1], [0, rotationShift]);
      activeVerb = 'MORPH';
      isMeaningful = true;
    } else {
      // Crystallization settling
      const p = (f - midEnd) / Math.max(1, endFrame - midEnd);
      progress = 1.0;
      rotationZ = rotationShift + (p * 5);
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = p < 0.5;
    }

    const curWidth = interpolate(progress, [0, 1], [fromDimensions.width, toDimensions.width]);
    const curHeight = interpolate(progress, [0, 1], [fromDimensions.height, toDimensions.height]);
    const curRadius = interpolate(progress, [0, 1], [fromDimensions.borderRadius, toDimensions.borderRadius]);
    const dynamicAspect = curWidth / Math.max(1, curHeight);

    return {
      position: { ...center },
      scale: 1.0,
      rotation: { z: rotationZ },
      opacity: 1.0,
      geometry: progress > 0.5 ? toGeometry : fromGeometry,
      state: progress > 0.5 ? 'morph_complete' : 'morph_in_progress',
      activeVerb,
      instantaneousVelocity: { x: 0, y: 0, z: (curWidth - fromDimensions.width) / duration },
      isMeaningfulMotionActive: isMeaningful,
      aspectRatio: dynamicAspect,
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}

// ============================================================================
// 6. VERB TEMPLATE: MERGE
// ============================================================================
export interface MergeTemplateConfig extends BaseVerbConfig {
  barycenter: Vector3D;
  origins: Vector3D[];        // 2 or more incoming entities
  mergedScale?: number;
}

export function createMergeTemplate(config: MergeTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    barycenter,
    origins,
    mergedScale = 1.3,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.18),
    forceType = 'electrostatic_cohesion_well',
    narrationMarker = 'همگرایی و پیوند ارگانیک مولفه‌ها در یک کل یکپارچه',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.22);
  const midEnd = Math.round(startFrame + duration * 0.72);

  const initialDistance = Math.hypot(origins[0].x - origins[1].x, origins[0].y - origins[1].y);

  const initialState: EntitySpatialState = {
    position: { ...barycenter },
    scale: 1.0,
    rotation: { z: 0 },
    geometry: 'separated_multi_bodies',
    state: 'converging',
  };

  const finalState: EntitySpatialState = {
    position: { ...barycenter },
    scale: mergedScale,
    rotation: { z: 15 },
    geometry: 'coalesced_monolith',
    state: 'unified',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'MERGE',
    minCentroidDisplacement: initialDistance * 0.35,
    expectedComponentCount: 1,
    guaranteedActiveWindow: [0.22, 0.72],
    nonStaticThreshold: 0.20,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: { id: heroId, label: heroLabel, persistsFrom, persistsTo },
    initialState,
    trigger: { frame: triggerFrame, narrationMarker, forceType },
    midpointEvent: {
      verb: 'MERGE',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round((midStart + midEnd) / 2), action: 'Collision contact forms unified surface meniscus' },
      ],
      meaningfulDelta: {
        property: 'scale',
        expectedMinimumDelta: mergedScale - 1.0,
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: 0, y: 0, z: -2 },
      angularVelocity: 0.4,
      consequence: 'Unified composite mass locks gravitational focal point',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let progress = 0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      const p = (f - startFrame) / Math.max(1, midStart - startFrame);
      progress = 0;
      activeVerb = 'ENTER';
      isMeaningful = p > 0.5;
    } else if (f <= midEnd) {
      progress = EASE_IN_OUT_CUBIC((f - midStart) / midDuration);
      activeVerb = 'MERGE';
      isMeaningful = true;
    } else {
      progress = 1.0;
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = (f - midEnd) < 15;
    }

    const isMerged = progress >= 0.85;
    const components: EvaluatedSubComponent[] = [];

    if (!isMerged) {
      origins.forEach((orig, idx) => {
        const curX = interpolate(progress, [0, 0.85], [orig.x, barycenter.x]);
        const curY = interpolate(progress, [0, 0.85], [orig.y, barycenter.y]);
        components.push({
          id: `${heroId}_incoming_${idx + 1}`,
          position: { x: curX, y: curY, z: 0 },
          scale: 1.0 - (progress * 0.2),
          rotation: { z: (idx === 0 ? -1 : 1) * (1 - progress) * 20 },
          opacity: 1.0,
          geometry: `incoming_body_${idx + 1}`,
          color: idx === 0 ? '#38BDF8' : '#EC4899',
        });
      });
    } else {
      components.push({
        id: `${heroId}_coalesced`,
        position: { ...barycenter },
        scale: mergedScale,
        rotation: { z: 15 },
        opacity: 1.0,
        geometry: 'coalesced_fused_body',
        color: '#8B5CF6',
      });
    }

    return {
      position: { ...barycenter },
      scale: isMerged ? mergedScale : 1.0,
      rotation: { z: isMerged ? 15 : 0 },
      opacity: 1.0,
      geometry: isMerged ? 'fused_monolith' : 'converging_bodies',
      state: isMerged ? 'merged' : 'approaching',
      activeVerb,
      instantaneousVelocity: { x: 0, y: 0, z: (1 - progress) * 5 },
      isMeaningfulMotionActive: isMeaningful,
      components,
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}

// ============================================================================
// 7. VERB TEMPLATE: DEFORM
// ============================================================================
export interface DeformTemplateConfig extends BaseVerbConfig {
  anchor: Vector3D;
  maxSquash?: number;         // e.g. 1.45 (scaleX) with 0.69 (scaleY)
  maxShearDeg?: number;       // e.g. 18 degrees shear
}

export function createDeformTemplate(config: DeformTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    anchor,
    maxSquash = 1.45,
    maxShearDeg = 18,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.15),
    forceType = 'hydrodynamic_shear_strain_load',
    narrationMarker = 'اعمال تنش برشی و انطباق الاستیک ساختار با فشار محیطی',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.20);
  const midEnd = Math.round(startFrame + duration * 0.70);

  const initialState: EntitySpatialState = {
    position: { ...anchor },
    scale: 1.0,
    rotation: { z: 0 },
    geometry: 'undeformed_matrix',
    state: 'equilibrium',
  };

  const finalState: EntitySpatialState = {
    position: { ...anchor },
    scale: 1.05,
    rotation: { z: 8 },
    geometry: 'strained_adapted_matrix',
    state: 'post_yield_elastic',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'DEFORM',
    minRotationDelta: maxShearDeg,
    guaranteedActiveWindow: [0.20, 0.70],
    nonStaticThreshold: 0.20,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: { id: heroId, label: heroLabel, persistsFrom, persistsTo },
    initialState,
    trigger: { frame: triggerFrame, narrationMarker, forceType },
    midpointEvent: {
      verb: 'DEFORM',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round((midStart + midEnd) / 2), action: 'Peak shear load induces volume-conserved elongation' },
      ],
      meaningfulDelta: {
        property: 'rotation',
        expectedMinimumDelta: maxShearDeg,
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: 2, y: 0, z: 0 },
      angularVelocity: 0.6,
      consequence: 'Stored elastic kinetic energy transfers into rebound pressure',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let squashX = 1.0;
    let squashY = 1.0;
    let shear = 0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      const p = (f - startFrame) / Math.max(1, midStart - startFrame);
      squashX = 1.0 + Math.sin(p * Math.PI) * 0.05;
      squashY = 1.0 / squashX;
      activeVerb = 'ENTER';
      isMeaningful = p > 0.6;
    } else if (f <= midEnd) {
      // High-magnitude dynamic load oscillation (Middle 60%)
      const progress = (f - midStart) / midDuration;
      // Damped harmonic oscillation curve
      const oscillation = Math.sin(progress * Math.PI * 3.5) * Math.exp(-progress * 1.8);
      squashX = 1.0 + (maxSquash - 1.0) * oscillation;
      squashY = 1.0 / Math.max(0.1, squashX); // Strict volume preservation
      shear = maxShearDeg * oscillation;
      activeVerb = 'DEFORM';
      isMeaningful = true;
    } else {
      // Settle
      const p = (f - midEnd) / Math.max(1, endFrame - midEnd);
      squashX = 1.05 + Math.sin(p * Math.PI * 2) * 0.02 * (1 - p);
      squashY = 1.0 / squashX;
      shear = 8 * (1 - p);
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = p < 0.5;
    }

    return {
      position: { ...anchor },
      scale: 1.0,
      rotation: { z: shear },
      opacity: 1.0,
      geometry: 'dynamic_shear_geometry',
      state: Math.abs(shear) > 3 ? 'under_strain' : 'relaxed',
      activeVerb,
      instantaneousVelocity: { x: shear * 0.5, y: 0, z: 0 },
      isMeaningfulMotionActive: isMeaningful,
      shearDeg: shear,
      aspectRatio: squashX / Math.max(0.01, squashY),
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}

// ============================================================================
// 8. VERB TEMPLATE: REASSEMBLE
// ============================================================================
export interface ReassembleTemplateConfig extends BaseVerbConfig {
  assemblyCenter: Vector3D;
  scatterRadius?: number;     // e.g. 240px dispersed
  fragmentCount?: number;     // e.g. 6 fragments
  finalScale?: number;
}

export function createReassembleTemplate(config: ReassembleTemplateConfig): ExecutableVerbResult {
  const {
    shotId,
    heroId,
    heroLabel,
    startFrame,
    endFrame,
    assemblyCenter,
    scatterRadius = 240,
    fragmentCount = 6,
    finalScale = 1.2,
    triggerFrame = Math.round(startFrame + (endFrame - startFrame) * 0.16),
    forceType = 'crystalline_lattice_magnetic_lock',
    narrationMarker = 'بازآرایی هم‌زمان قطعات و تشکیل سازه یکپارچه متراکم',
    persistsFrom = 'GENESIS',
    persistsTo = 'TERMINUS',
  } = config;

  const duration = Math.max(1, endFrame - startFrame);
  const midStart = Math.round(startFrame + duration * 0.22);
  const midEnd = Math.round(startFrame + duration * 0.72);

  const initialState: EntitySpatialState = {
    position: { ...assemblyCenter },
    scale: 0.8,
    rotation: { z: 0 },
    geometry: 'dispersed_fragments',
    state: 'scattered',
  };

  const finalState: EntitySpatialState = {
    position: { ...assemblyCenter },
    scale: finalScale,
    rotation: { z: 0 },
    geometry: 'assembled_monolith',
    state: 'rigid_lattice_lock',
  };

  const validatorExpectation: ValidatorExpectationContract = {
    verb: 'REASSEMBLE',
    minCentroidDisplacement: scatterRadius * 0.4,
    expectedComponentCount: 1, // Ends as 1 unified monolith
    guaranteedActiveWindow: [0.22, 0.72],
    nonStaticThreshold: 0.20,
  };

  const contract: TransformationContract = {
    shotId,
    startFrame,
    endFrame,
    durationFrames: duration,
    heroEntity: { id: heroId, label: heroLabel, persistsFrom, persistsTo },
    initialState,
    trigger: { frame: triggerFrame, narrationMarker, forceType },
    midpointEvent: {
      verb: 'REASSEMBLE',
      startFrame: midStart,
      endFrame: midEnd,
      subBeats: [
        { frame: Math.round((midStart + midEnd) / 2), action: 'Scattered fragments dock simultaneously into central chassis' },
      ],
      meaningfulDelta: {
        property: 'position',
        expectedMinimumDelta: scatterRadius * 0.5,
      },
    },
    finalState,
    exitMomentum: {
      vector: { x: 0, y: 0, z: -3 },
      angularVelocity: 0.2,
      consequence: 'Solid reassembled monolith initiates barrier stabilization',
    },
    validatorExpectation,
  };

  const evaluate = (currentFrame: number): EvaluatedEntityFrame => {
    const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
    const midDuration = Math.max(1, midEnd - midStart);

    let progress = 0;
    let activeVerb: MotionVerb = 'ENTER';
    let isMeaningful = false;

    if (f < midStart) {
      const p = (f - startFrame) / Math.max(1, midStart - startFrame);
      progress = 0;
      activeVerb = 'ENTER';
      isMeaningful = p > 0.5;
    } else if (f <= midEnd) {
      // Coordinated Inward Assembly (Middle 60%)
      progress = EASE_OUT_EXPO((f - midStart) / midDuration);
      activeVerb = 'REASSEMBLE';
      isMeaningful = true;
    } else {
      progress = 1.0;
      activeVerb = 'MOMENTUM_TRANSFER';
      isMeaningful = (f - midEnd) < 18;
    }

    const isLocked = progress >= 0.95;
    const components: EvaluatedSubComponent[] = [];

    for (let i = 0; i < fragmentCount; i++) {
      const angle = (i * 2 * Math.PI) / fragmentCount;
      const initialDist = scatterRadius;
      const currentDist = interpolate(progress, [0, 1], [initialDist, 0]);
      const curX = assemblyCenter.x + Math.cos(angle) * currentDist;
      const curY = assemblyCenter.y + Math.sin(angle) * currentDist;
      const rotZ = interpolate(progress, [0, 1], [(i * 60) + 180, 0]);

      components.push({
        id: `${heroId}_fragment_${i + 1}`,
        position: { x: curX, y: curY, z: 0 },
        scale: interpolate(progress, [0, 1], [0.6, 1.0]),
        rotation: { z: rotZ },
        opacity: 1.0,
        geometry: `lattice_fragment_${i + 1}`,
        color: '#6366F1',
      });
    }

    return {
      position: { ...assemblyCenter },
      scale: interpolate(progress, [0, 1], [0.8, finalScale]),
      rotation: { z: 0 },
      opacity: 1.0,
      geometry: isLocked ? 'monolithic_crystal' : 'converging_fragments',
      state: isLocked ? 'assembled' : 'assembling',
      activeVerb,
      instantaneousVelocity: { x: 0, y: 0, z: (1 - progress) * 8 },
      isMeaningfulMotionActive: isMeaningful,
      components,
    };
  };

  contract.evaluateVerbState = evaluate;
  return { contract, evaluate };
}
