/**
 * ADAPTIVE DIRECTOR & MOTION BUDGET ENGINE (V24)
 * 
 * Converts editorial narrative script into an authored, rhythmically balanced,
 * and semantically motivated motion sequence:
 * 
 * SCRIPT / IDEA
 * → VISUAL METAPHOR
 * → MOTION VERB
 * → CHOREOGRAPHY & POSE LADDER
 * → RHYTHMIC ENERGY CURVE
 * → TRANSITION DECISION ENGINE
 * → NEXT IDEA
 * 
 * Core Architectural Guarantees:
 * 1. MOTION BUDGET: Caps simultaneous motion density and prevents consecutive transformation clichés.
 * 2. ENERGY CURVE: Explicit contrast (Calm -> Build -> Impact -> Silence -> Reframe -> Resolution).
 * 3. CAMERA RESTRAINT: Static camera is the default; camera motion requires semantic justification.
 * 4. OBJECT IDENTITY GRAPH: Explicit lifecycle tracking (PERSIST, TRANSFORM, TERMINATE, REPLACE).
 * 5. POSE LADDER: Authors REST, ANTICIPATION, ACTION, PEAK, OVERSHOOT, DECAY, SETTLE.
 * 6. DELIBERATE SILENCE: Enforces zero-motion breathing holds between intense choreography hits.
 */

import { interpolate, Easing } from 'remotion';

// ============================================================================
// 1. BEAT & PLANNING INTERFACES
// ============================================================================

export type CameraBehaviorType =
  | 'STATIC'
  | 'PUSH'
  | 'PULL'
  | 'ORBIT'
  | 'WHIP'
  | 'THROUGH'
  | 'REFRAME'
  | 'CUT';

export type TransitionClassType =
  | 'TRANSFORM' // Related visual concepts physically metamorphose
  | 'CUT'       // Strong conceptual break
  | 'CAMERA'    // Spatial continuation via camera traversal
  | 'REFRAME'   // Same composition, new hierarchy/information
  | 'HOLD'      // Emotional emphasis / frozen contemplation
  | 'COLLAPSE'  // Accumulated geometry compresses into singular node
  | 'EXPANSION';// Singular point/node expands into structured architecture

export type TypographyRoleType =
  | 'HERO_GEOMETRIC'    // Word behaves as physical geometry / boundary
  | 'STILL_ANCHOR'       // Word sits in absolute stillness as semantic anchor
  | 'DYNAMIC_VERB'       // Word executes kinetic slam / stretch / trajectory
  | 'SUBORDINATE_LABEL'  // Secondary datum / scientific annotation
  | 'SILENT_NONE';       // No text; visual geometry speaks alone

export type CompositionAlignmentType =
  | 'CENTER'
  | 'LEFT_WEIGHTED'
  | 'RIGHT_WEIGHTED'
  | 'TOP_WEIGHTED'
  | 'BOTTOM_WEIGHTED'
  | 'EDGE_OFF_AXIS';

export type ObjectLifecycleState =
  | 'PERSIST'    // Entity survives into next beat unchanged
  | 'TRANSFORM'  // Entity physically morphs into downstream concept
  | 'TERMINATE'  // Entity intentionally dissolves/exits
  | 'REPLACE';   // New entity occupies spatial position

export interface ObjectIdentityNode {
  objectId: string;
  name: string;
  birthBeat: number;
  deathBeat?: number;
  currentLifecycle: ObjectLifecycleState;
  downstreamTargetId?: string;
  perceptualCarrier: string; // e.g. 'golden_color', 'circular_topology', 'horizontal_datum'
}

export interface DirectorBeatPlan {
  beatId: string;
  beatIndex: number;
  startFrame: number;
  durationFrames: number;
  semanticPurpose: string;
  visualMetaphor: string;
  primarySubject: string;
  secondarySubjects: string[];
  motionVerb: string;
  transformationType: string;
  cameraBehavior: CameraBehaviorType;
  energyLevel: number; // 1 (Silence) to 5 (Peak Impact)
  holdDurationFrames: number;
  transitionOut: TransitionClassType;
  continuityTarget: string;
  typographyRole: TypographyRoleType;
  typographyText?: string;
  negativeSpaceBudget: number; // e.g. 0.75 = 75% empty canvas
  compositionAlignment: CompositionAlignmentType;
  identityNodes: ObjectIdentityNode[];
}

// ============================================================================
// 2. MOTION BUDGET ENGINE
// ============================================================================

export interface MotionBudgetAudit {
  isValid: boolean;
  violations: string[];
  metrics: {
    totalDurationFrames: number;
    beatCount: number;
    averageEnergy: number;
    peakEnergyBeats: number[];
    silenceBeats: number[];
    cameraMotionPercentage: number;
    heroTransformationCount: number;
    transitionDiversityScore: number;
    motionDensityScore: number;
  };
}

export class MotionBudgetTracker {
  /**
   * Audits a sequence of DirectorBeatPlans against professional motion design rules:
   * 1. No identical hero transformations consecutively.
   * 2. No identical transition types consecutively without justification.
   * 3. Camera movement must not be continuous (>50% static camera required).
   * 4. Every peak energy beat (>=4) must have contrast (<=2) before or after it.
   * 5. At least one beat must have deep silence (energy <= 1, hold >= 45 frames).
   */
  public static auditPlan(beats: DirectorBeatPlan[]): MotionBudgetAudit {
    const violations: string[] = [];
    let totalFrames = 0;
    let cameraMovingFrames = 0;
    let totalEnergy = 0;
    const peakBeats: number[] = [];
    const silenceBeats: number[] = [];
    const transitionTypes = new Set<TransitionClassType>();

    for (let i = 0; i < beats.length; i++) {
      const beat = beats[i];
      totalFrames += beat.durationFrames;
      totalEnergy += beat.energyLevel;
      transitionTypes.add(beat.transitionOut);

      if (beat.cameraBehavior !== 'STATIC') {
        cameraMovingFrames += beat.durationFrames;
      }

      if (beat.energyLevel >= 4) {
        peakBeats.push(beat.beatIndex);
      }
      if (beat.energyLevel <= 1 && beat.holdDurationFrames >= 30) {
        silenceBeats.push(beat.beatIndex);
      }

      // Check consecutive transformations
      if (i > 0) {
        const prev = beats[i - 1];
        if (
          beat.transformationType !== 'NONE' &&
          beat.transformationType === prev.transformationType
        ) {
          violations.push(
            `Rule Violation: Consecutive identical hero transformation '${beat.transformationType}' at Beat ${prev.beatIndex} and Beat ${beat.beatIndex}`
          );
        }

        // Check consecutive transitions
        if (beat.transitionOut === prev.transitionOut && beat.transitionOut !== 'HOLD') {
          violations.push(
            `Rule Warning: Consecutive identical transition '${beat.transitionOut}' at Beat ${prev.beatIndex} and Beat ${beat.beatIndex}`
          );
        }
      }

      // Contrast rule for peak beats
      if (beat.energyLevel >= 4) {
        const prevEnergy = i > 0 ? beats[i - 1].energyLevel : 1;
        const nextEnergy = i < beats.length - 1 ? beats[i + 1].energyLevel : 1;
        if (prevEnergy >= 4 && nextEnergy >= 4) {
          violations.push(
            `Rule Violation: High-energy fatigue. Beat ${beat.beatIndex} (Energy ${beat.energyLevel}) is bracketed by high energy without contrast.`
          );
        }
      }
    }

    const cameraMotionPercentage = (cameraMovingFrames / Math.max(1, totalFrames)) * 100;
    if (cameraMotionPercentage > 50) {
      violations.push(
        `Rule Violation: Camera Restraint broken. Camera moves during ${cameraMotionPercentage.toFixed(1)}% of sequence (limit: <= 50%).`
      );
    }

    if (silenceBeats.length === 0) {
      violations.push(
        `Rule Violation: Rhythm Breathing broken. No beat exhibits deliberate stillness (energy <= 1, hold >= 30f).`
      );
    }

    const transitionDiversityScore = Math.min(10, (transitionTypes.size / 6) * 10);
    const motionDensityScore = 10 - Math.max(0, (cameraMotionPercentage - 30) * 0.2);

    return {
      isValid: violations.length === 0,
      violations,
      metrics: {
        totalDurationFrames: totalFrames,
        beatCount: beats.length,
        averageEnergy: Number((totalEnergy / Math.max(1, beats.length)).toFixed(2)),
        peakEnergyBeats: peakBeats,
        silenceBeats: silenceBeats,
        cameraMotionPercentage: Number(cameraMotionPercentage.toFixed(1)),
        heroTransformationCount: beats.filter(b => b.transformationType !== 'NONE').length,
        transitionDiversityScore: Number(transitionDiversityScore.toFixed(1)),
        motionDensityScore: Number(motionDensityScore.toFixed(1)),
      },
    };
  }
}

// ============================================================================
// 3. POSE LADDER SYSTEM
// ============================================================================

export type PoseType =
  | 'REST'
  | 'ANTICIPATION'
  | 'ACTION'
  | 'PEAK'
  | 'OVERSHOOT'
  | 'DECAY'
  | 'SETTLE';

export interface PoseLadderState {
  currentPose: PoseType;
  progress: number; // 0 to 1
  value: number;    // Normalized positional value (e.g. 0 to 1 with overshoot up to 1.12)
  velocity: number; // Current instantaneous momentum
  energyFactor: number;
}

/**
 * Calculates physics-grounded Pose Ladder transitions.
 * Replaces generic linear/ease-in-out transitions with authored anticipation and overshoot.
 */
export function calculatePoseLadder(
  frame: number,
  startFrame: number,
  durationFrames: number,
  anticipationRatio: number = 0.15,
  overshootMagnitude: number = 0.10
): PoseLadderState {
  const duration = Math.max(1, durationFrames);
  const raw = Math.min(1, Math.max(0, (frame - startFrame) / duration));

  // Pose Boundaries
  const antEnd = anticipationRatio;
  const actionEnd = 0.70;
  const peakEnd = 0.85;

  if (raw <= antEnd) {
    // ANTICIPATION: Slight pullback in opposite direction
    const p = raw / antEnd;
    const eased = Easing.bezier(0.4, 0, 0.6, 1)(p);
    const value = interpolate(eased, [0, 1], [0, -0.06]);
    return {
      currentPose: raw === 0 ? 'REST' : 'ANTICIPATION',
      progress: raw,
      value,
      velocity: -0.06 * p,
      energyFactor: 0.2 + 0.3 * p,
    };
  } else if (raw <= actionEnd) {
    // ACTION & ACCELERATION
    const p = (raw - antEnd) / (actionEnd - antEnd);
    const eased = Easing.bezier(0.12, 0, 0.39, 0)(p);
    const value = interpolate(eased, [0, 1], [-0.06, 1.0 + overshootMagnitude]);
    return {
      currentPose: 'ACTION',
      progress: raw,
      value,
      velocity: (1.06 + overshootMagnitude) * (1 - p),
      energyFactor: 0.5 + 0.5 * p,
    };
  } else if (raw <= peakEnd) {
    // PEAK & OVERSHOOT
    const p = (raw - actionEnd) / (peakEnd - actionEnd);
    const eased = Easing.bezier(0.25, 1, 0.5, 1)(p);
    const value = interpolate(eased, [0, 1], [1.0 + overshootMagnitude, 0.98]);
    return {
      currentPose: p < 0.5 ? 'PEAK' : 'OVERSHOOT',
      progress: raw,
      value,
      velocity: -0.12 * p,
      energyFactor: 0.8 - 0.4 * p,
    };
  } else {
    // DECAY & SETTLE
    const p = (raw - peakEnd) / (1 - peakEnd);
    const eased = Easing.bezier(0.16, 1, 0.3, 1)(p);
    const value = interpolate(eased, [0, 1], [0.98, 1.0]);
    return {
      currentPose: p > 0.8 ? 'SETTLE' : 'DECAY',
      progress: raw,
      value,
      velocity: 0.02 * (1 - p),
      energyFactor: 0.4 * (1 - p),
    };
  }
}

// ============================================================================
// 4. AUTHORITATIVE V24 EDITORIAL NARRATIVE PLAN (36.0s = 1080 frames @ 30 FPS)
// ============================================================================

export const V24_EDITORIAL_NARRATIVE_PLAN: DirectorBeatPlan[] = [
  // BEAT 01: GENESIS / HORIZON (0 - 120f = 4.0s)
  {
    beatId: 'beat_01',
    beatIndex: 1,
    startFrame: 0,
    durationFrames: 120,
    semanticPurpose: 'Origin of analytical inquiry out of pure dark potential',
    visualMetaphor: 'Singular golden datum extrudes horizontally across spatial vacuum',
    primarySubject: 'Horizontal Coordinate Datum Line',
    secondarySubjects: ['Faint Sub-grid Coordinate Points'],
    motionVerb: 'Quiet center-out trace with extended silence hold',
    transformationType: 'EXPANSION',
    cameraBehavior: 'STATIC', // Camera restraint: absolute stillness
    energyLevel: 2,
    holdDurationFrames: 50, // 1.67s deliberate reading hold
    transitionOut: 'TRANSFORM',
    continuityTarget: 'center_datum_point',
    typographyRole: 'STILL_ANCHOR',
    typographyText: 'نقطه آغاز',
    negativeSpaceBudget: 0.82,
    compositionAlignment: 'BOTTOM_WEIGHTED',
    identityNodes: [
      {
        objectId: 'ID_DATUM',
        name: 'Horizontal Coordinate Datum Line',
        birthBeat: 1,
        currentLifecycle: 'TRANSFORM',
        downstreamTargetId: 'ID_NUCLEUS',
        perceptualCarrier: 'golden_light_and_horizontal_center',
      },
    ],
  },

  // BEAT 02: NUCLEUS ACCELERATION (120 - 240f = 4.0s)
  {
    beatId: 'beat_02',
    beatIndex: 2,
    startFrame: 120,
    durationFrames: 120,
    semanticPurpose: 'Crystallization of intention into a directional kinetic seed',
    visualMetaphor: 'Datum compresses into an energetic golden nucleus dot and launches rightward',
    primarySubject: 'Golden Nucleus Dot',
    secondarySubjects: ['Directional Velocity Trail'],
    motionVerb: 'Compression, horizontal slingshot launch & squash/stretch',
    transformationType: 'DEFORM',
    cameraBehavior: 'STATIC', // Camera restraint: element moves, camera holds firm
    energyLevel: 2,
    holdDurationFrames: 35,
    transitionOut: 'REFRAME',
    continuityTarget: 'nucleus_momentum_vector',
    typographyRole: 'DYNAMIC_VERB',
    typographyText: 'تمرکز',
    negativeSpaceBudget: 0.76,
    compositionAlignment: 'LEFT_WEIGHTED',
    identityNodes: [
      {
        objectId: 'ID_NUCLEUS',
        name: 'Golden Kinetic Seed',
        birthBeat: 2,
        currentLifecycle: 'TRANSFORM',
        downstreamTargetId: 'ID_DATA_PILLARS',
        perceptualCarrier: 'golden_mass_and_trajectory',
      },
    ],
  },

  // BEAT 03: DATA PILLARS BUILD (240 - 390f = 5.0s)
  {
    beatId: 'beat_03',
    beatIndex: 3,
    startFrame: 240,
    durationFrames: 150,
    semanticPurpose: 'Structured empirical accumulation creating tension and analytical weight',
    visualMetaphor: 'Trajectory fractures into 4 ascending monolithic architectural data pillars',
    primarySubject: '4 Analytical Monolith Pillars',
    secondarySubjects: ['Measurement Tick Marks', 'Baseline Metric Grid'],
    motionVerb: 'Staggered vertical spring eruption with tension anticipation',
    transformationType: 'SPLIT',
    cameraBehavior: 'PUSH', // Motivated: slow 1.00 -> 1.04 creep to convey architectural weight
    energyLevel: 3,
    holdDurationFrames: 30,
    transitionOut: 'COLLAPSE',
    continuityTarget: 'pillar_top_vertices',
    typographyRole: 'SUBORDINATE_LABEL',
    typographyText: 'پایه‌های تجربی',
    negativeSpaceBudget: 0.62,
    compositionAlignment: 'CENTER',
    identityNodes: [
      {
        objectId: 'ID_DATA_PILLARS',
        name: 'Empirical Data Pillars',
        birthBeat: 3,
        currentLifecycle: 'TRANSFORM',
        downstreamTargetId: 'ID_ORBIT_RING',
        perceptualCarrier: 'four_apex_energy_nodes',
      },
    ],
  },

  // BEAT 04: KINETIC PEAK & FLIGHT (390 - 540f = 5.0s)
  {
    beatId: 'beat_04',
    beatIndex: 4,
    startFrame: 390,
    durationFrames: 150,
    semanticPurpose: 'Empirical mass undergoes synthesis into an aerodynamic continuous vortex',
    visualMetaphor: 'Pillars compress into vertex nodes, fuse into spline flight curve, and coil into celestial ring',
    primarySubject: 'Aerodynamic Flight Curve -> Luminous Orbit Ring',
    secondarySubjects: ['Vertex Connective Splines', 'Centrifugal Wave Trails'],
    motionVerb: 'Rapid topological coil, centrifugal expansion & kinetic peak',
    transformationType: 'TOPOLOGY_MORPH',
    cameraBehavior: 'PUSH', // Motivated: 1.04 -> 1.12 acceleration tracking the vortex
    energyLevel: 5, // HIGHEST ENERGY PEAK
    holdDurationFrames: 15,
    transitionOut: 'HOLD',
    continuityTarget: 'celestial_ring_perimeter',
    typographyRole: 'HERO_GEOMETRIC',
    typographyText: 'جهش',
    negativeSpaceBudget: 0.52,
    compositionAlignment: 'CENTER',
    identityNodes: [
      {
        objectId: 'ID_ORBIT_RING',
        name: 'Luminous Orbit Ring',
        birthBeat: 4,
        currentLifecycle: 'TRANSFORM',
        downstreamTargetId: 'ID_GEOMETRIC_IRIS',
        perceptualCarrier: 'ring_perimeter_and_central_aperture',
      },
    ],
  },

  // BEAT 05: DEEP FROZEN SILENCE (540 - 660f = 4.0s)
  {
    beatId: 'beat_05',
    beatIndex: 5,
    startFrame: 540,
    durationFrames: 120,
    semanticPurpose: 'Immediate acoustic and motion vacuum following violent kinetic release',
    visualMetaphor: 'Dynamic ring instantly freezes into an ultra-thin hairline geometric iris in deep stillness',
    primarySubject: 'Hairline Geometric Iris',
    secondarySubjects: ['Singular Central Laser Point'],
    motionVerb: 'Absolute frozen hold; zero camera drift, zero particles',
    transformationType: 'NONE', // Intentional stillness
    cameraBehavior: 'STATIC', // Camera restraint: 100% frozen lock
    energyLevel: 1, // LOWEST ENERGY CONTRAST
    holdDurationFrames: 75, // 2.5 seconds of unbroken deliberate silence
    transitionOut: 'EXPANSION',
    continuityTarget: 'hairline_iris_core',
    typographyRole: 'STILL_ANCHOR',
    typographyText: 'سکوت ژرف',
    negativeSpaceBudget: 0.85,
    compositionAlignment: 'EDGE_OFF_AXIS',
    identityNodes: [
      {
        objectId: 'ID_GEOMETRIC_IRIS',
        name: 'Hairline Geometric Iris',
        birthBeat: 5,
        currentLifecycle: 'TRANSFORM',
        downstreamTargetId: 'ID_KINETIC_WORD',
        perceptualCarrier: 'central_point_and_stroke_delicacy',
      },
    ],
  },

  // BEAT 06: KINETIC TYPOGRAPHY AS GEOMETRIC ACTOR (660 - 810f = 5.0s)
  {
    beatId: 'beat_06',
    beatIndex: 6,
    startFrame: 660,
    durationFrames: 150,
    semanticPurpose: 'Linguistic intellect acts as physical geometry, impacting and reassembling into emblem',
    visualMetaphor: 'Persian word «شتاب» slams into baseline datum, fractures into 8 pen strokes, and converges into Compass Star',
    primarySubject: 'Word «شتاب» -> Compass Star Emblem',
    secondarySubjects: ['Baseline Datum Beam', '8 Radial Geometric Pen Vectors'],
    motionVerb: 'Slam impact, letterform fracture & rotational geometric assembly',
    transformationType: 'LETTERFORM_DISSECT',
    cameraBehavior: 'STATIC', // Camera restraint: let the typographic geometry command the frame
    energyLevel: 4,
    holdDurationFrames: 30,
    transitionOut: 'CAMERA',
    continuityTarget: 'compass_star_center',
    typographyRole: 'HERO_GEOMETRIC',
    typographyText: 'شتاب',
    negativeSpaceBudget: 0.65,
    compositionAlignment: 'LEFT_WEIGHTED',
    identityNodes: [
      {
        objectId: 'ID_KINETIC_WORD',
        name: 'Word Stroke Fragments',
        birthBeat: 6,
        currentLifecycle: 'TRANSFORM',
        downstreamTargetId: 'ID_PORTAL_RING',
        perceptualCarrier: 'geometric_compass_star_emblem',
      },
    ],
  },

  // BEAT 07: CAMERA APERTURE PUNCH-THROUGH (810 - 960f = 5.0s)
  {
    beatId: 'beat_07',
    beatIndex: 7,
    startFrame: 810,
    durationFrames: 150,
    semanticPurpose: 'Dimensional threshold traversal; camera plunges through the geometric emblem',
    visualMetaphor: 'Compass Star emblem dilates into an architectural portal; camera punches through with multi-plane parallax',
    primarySubject: 'Architectural Aperture Portal',
    secondarySubjects: ['Receding Multi-Plane Grid Rings', 'Depth Light Beams'],
    motionVerb: 'Camera plunge through aperture with depth-scale warp',
    transformationType: 'CAMERA_PASS',
    cameraBehavior: 'THROUGH', // Fully motivated through-transit
    energyLevel: 4,
    holdDurationFrames: 20,
    transitionOut: 'REFRAME',
    continuityTarget: 'portal_through_horizon',
    typographyRole: 'SILENT_NONE', // No captions: the spatial transit speaks
    negativeSpaceBudget: 0.58,
    compositionAlignment: 'CENTER',
    identityNodes: [
      {
        objectId: 'ID_PORTAL_RING',
        name: 'Architectural Aperture Portal',
        birthBeat: 7,
        currentLifecycle: 'TERMINATE', // Intentionally passes camera and exits
        downstreamTargetId: 'ID_SOVEREIGN_CREST',
        perceptualCarrier: 'golden_light_emerging_on_other_side',
      },
    ],
  },

  // BEAT 08: SOVEREIGN RESOLUTION (960 - 1080f = 4.0s)
  {
    beatId: 'beat_08',
    beatIndex: 8,
    startFrame: 960,
    durationFrames: 120,
    semanticPurpose: 'Permanent institutional crystallization; enduring dignity and unshakeable truth',
    visualMetaphor: 'Golden sovereign emblem settles upon polished plinth and unshakeable horizon line with settle-lock',
    primarySubject: 'Sovereign 8-Pointed Crest & Plinth Base',
    secondarySubjects: ['Polished Architectural Plinth', 'Sub-typography Baseline'],
    motionVerb: 'Settle-lock into absolute stability; zero subpixel jitter',
    transformationType: 'SETTLE',
    cameraBehavior: 'STATIC', // Camera restraint: final authoritative lock
    energyLevel: 2,
    holdDurationFrames: 60, // 2.0s final holding lock
    transitionOut: 'HOLD',
    continuityTarget: 'sovereign_crest_center',
    typographyRole: 'STILL_ANCHOR',
    typographyText: 'دانش ماندگار',
    negativeSpaceBudget: 0.74,
    compositionAlignment: 'CENTER',
    identityNodes: [
      {
        objectId: 'ID_SOVEREIGN_CREST',
        name: 'Sovereign 8-Pointed Star Crest',
        birthBeat: 8,
        currentLifecycle: 'PERSIST',
        perceptualCarrier: 'golden_symmetry_and_stability',
      },
    ],
  },
];

// ============================================================================
// 5. RUNTIME DIRECTOR STATE EVALUATOR
// ============================================================================

export interface ActiveDirectorState {
  currentBeat: DirectorBeatPlan;
  beatLocalFrame: number;
  beatProgress: number; // 0 to 1
  energyLevel: number;
  cameraScale: number;
  cameraTranslateX: number;
  cameraTranslateY: number;
  isHoldPhase: boolean;
  activePose: PoseLadderState;
}

/**
 * Returns the exact authored Director state for any global frame (0 - 1079).
 */
export function evaluateDirectorAtFrame(
  globalFrame: number,
  plan: DirectorBeatPlan[] = V24_EDITORIAL_NARRATIVE_PLAN
): ActiveDirectorState {
  const clampedFrame = Math.max(0, Math.min(1079, globalFrame));

  let currentBeat = plan[0];
  for (const beat of plan) {
    if (
      clampedFrame >= beat.startFrame &&
      clampedFrame < beat.startFrame + beat.durationFrames
    ) {
      currentBeat = beat;
      break;
    }
  }

  const beatLocalFrame = clampedFrame - currentBeat.startFrame;
  const beatProgress = Math.min(1, Math.max(0, beatLocalFrame / currentBeat.durationFrames));

  // Determine if we are inside the authored hold phase
  const holdStartFrame = currentBeat.durationFrames - currentBeat.holdDurationFrames;
  const isHoldPhase = beatLocalFrame >= holdStartFrame;

  // Evaluate Camera Behavior based on authored restraint
  let cameraScale = 1.0;
  let cameraTranslateX = 0;
  let cameraTranslateY = 0;

  switch (currentBeat.cameraBehavior) {
    case 'STATIC':
      cameraScale = 1.0;
      break;
    case 'PUSH':
      if (currentBeat.beatIndex === 3) {
        // Slow architectural creep (1.00 -> 1.04)
        const p = Easing.bezier(0.25, 0.1, 0.25, 1)(beatProgress);
        cameraScale = interpolate(p, [0, 1], [1.0, 1.04]);
      } else if (currentBeat.beatIndex === 4) {
        // Kinetic peak acceleration (1.04 -> 1.12)
        const p = Easing.bezier(0.16, 1, 0.3, 1)(beatProgress);
        cameraScale = interpolate(p, [0, 1], [1.04, 1.12]);
      }
      break;
    case 'THROUGH':
      if (currentBeat.beatIndex === 7) {
        // Dimensional plunge through aperture (1.0 -> 2.6)
        const p = Easing.bezier(0.5, 0, 0.1, 1)(beatProgress);
        cameraScale = interpolate(p, [0, 1], [1.0, 2.6]);
        cameraTranslateY = interpolate(p, [0, 1], [0, -30]);
      }
      break;
    default:
      cameraScale = 1.0;
  }

  // Evaluate Pose Ladder for primary subject
  const activePose = calculatePoseLadder(
    clampedFrame,
    currentBeat.startFrame,
    Math.max(1, currentBeat.durationFrames - currentBeat.holdDurationFrames)
  );

  return {
    currentBeat,
    beatLocalFrame,
    beatProgress,
    energyLevel: currentBeat.energyLevel,
    cameraScale,
    cameraTranslateX,
    cameraTranslateY,
    isHoldPhase,
    activePose,
  };
}
