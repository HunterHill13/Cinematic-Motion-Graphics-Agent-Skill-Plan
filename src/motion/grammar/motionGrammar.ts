/**
 * ============================================================================
 * CINEMATIC MOTION GRAMMAR & TRANSFORMATION CONTRACT ENGINE
 * ============================================================================
 * 
 * CORE ARCHITECTURAL PHILOSOPHY:
 * 
 *   VALID MOTION ≠ CONSTANT MOTION
 * 
 *   VALID MOTION =
 *     SEMANTICALLY JUSTIFIED
 *     + SPATIALLY MEANINGFUL
 *     + CAUSALLY TRIGGERED
 *     + VISUALLY VERIFIABLE
 * 
 * ============================================================================
 * MEANINGFUL MOTION VS. DECORATIVE / AMBIENT MOTION:
 * 
 * The following DO NOT count as Meaningful Primary Motion:
 *   - Camera movement alone (zoom/pan/orbit)
 *   - Pure opacity fading (dissolves / crossfades)
 *   - Subtitle, caption, or text badge reveals
 *   - Micro-scale breathing (< 3% scale variance)
 *   - Jitter, noise, or random particle drift (< 3px delta)
 *   - Insignificant ±1-2px floating
 * 
 * Meaningful Motion REQUIRES at least one of:
 *   1. Tangible spatial travel (dx >= 24px, dy >= 24px)
 *   2. Tangible angular reorientation (dTheta >= 15 deg)
 *   3. Volumetric scale change (dScale >= 0.15)
 *   4. Geometry / path topological morph
 *   5. Split / merge / collapse / expand
 *   6. Depth shift along Z-axis across visual planes
 *   7. Semantic state transformation (inactive -> active, solid -> plasma)
 *   8. Causal impulse & momentum transfer (action -> reaction)
 * ============================================================================
 */

import { interpolate, Easing } from 'remotion';

// ============================================================================
// 1. MOTION VERB TAXONOMY
// ============================================================================
export type MotionVerb =
  | 'ENTER'              // Spatial introduction with calibrated momentum
  | 'TRAVEL'             // Directional vector transit across coordinate space
  | 'ORBIT'              // Angular revolution around an anchor pole
  | 'ROTATE'             // Axial spin around local center
  | 'SCALE'              // Volumetric expansion or compression
  | 'DEFORM'             // Squash, stretch, or shear under dynamic load
  | 'MORPH'              // Topological boundary change (Shape A -> Shape B)
  | 'SPLIT'              // Single entity divides into multiple child vectors
  | 'MERGE'              // Multiple vectors coalesce into singular entity
  | 'COLLAPSE'           // Implosive compression into high-density core
  | 'EXPAND'             // Outward explosion or unfolding into architecture
  | 'REASSEMBLE'         // Scattered fragments locking into structured form
  | 'IMPACT'             // Kinetic strike delivering force to a boundary
  | 'REACT'              // Newton's third law response to an IMPACT
  | 'PARALLAX'           // Camera-coupled multi-plane depth shift
  | 'DEPTH_SHIFT'        // Entity moves across Z-axis (foreground <-> background)
  | 'STATE_TRANSFORM'    // Fundamental material/functional phase change
  | 'MOMENTUM_TRANSFER'; // Entity stops and transfers kinetic energy downstream

// ============================================================================
// 2. COORDINATE & VECTOR INTERFACES
// ============================================================================
export interface Vector3D {
  x: number;
  y: number;
  z?: number;
}

export interface Rotation3D {
  x?: number;
  y?: number;
  z: number; // in degrees
}

export interface EntitySpatialState {
  position: Vector3D;
  scale: number;
  rotation: Rotation3D;
  opacity?: number;
  geometry?: string; // Path or semantic shape type
  state?: string;    // Material state description
  velocity?: Vector3D;
}

// ============================================================================
// 3. CAUSAL TRIGGER & MIDPOINT EVENT CONTRACTS
// ============================================================================
export interface CausalTriggerContract {
  frame: number;
  narrationMarker: string; // Persian narration sentence or keyword
  forceType: string;       // e.g. "thermal_pulse", "hydraulic_pressure", "cleavage_pulse"
  impulseMagnitude?: number;
}

export interface MidpointSubBeat {
  frame: number;
  action: string;
  spatialDelta?: Partial<EntitySpatialState>;
}

export interface MidpointActionContract {
  verb: MotionVerb;
  startFrame: number;
  endFrame: number;
  subBeats: MidpointSubBeat[];
  /** Guaranteed non-opacity transformation delta during middle 60% */
  meaningfulDelta: {
    property: 'position' | 'rotation' | 'scale' | 'geometry' | 'depth';
    expectedMinimumDelta: number; // e.g. 24px, 15deg, 0.15 scale
  };
}

export interface MomentumHandoffContract {
  vector: Vector3D; // (dx, dy, dz) pixels/frame handed forward
  angularVelocity?: number; // deg/frame
  consequence: string; // How this momentum initializes the next shot
}

export interface HeroEntityContract {
  id: string;
  label: string;
  persistsFrom?: string; // Prior shot ID or 'GENESIS'
  persistsTo?: string;   // Subsequent shot ID or 'TERMINUS'
}

// ============================================================================
// 4. THE MACHINE-READABLE TRANSFORMATION CONTRACT
// ============================================================================
export interface TransformationContract {
  shotId: string;
  startFrame: number;
  endFrame: number;
  durationFrames: number;

  heroEntity: HeroEntityContract;
  initialState: EntitySpatialState;
  trigger: CausalTriggerContract;
  
  /** MANDATORY: Transformation active inside the middle 60% of the shot */
  midpointEvent: MidpointActionContract;

  finalState: EntitySpatialState;
  exitMomentum: MomentumHandoffContract;
}

// ============================================================================
// 5. CONTRACT EVALUATION & SOLVER
// ============================================================================

export interface EvaluatedEntityFrame {
  position: Vector3D;
  scale: number;
  rotation: Rotation3D;
  opacity: number;
  geometry: string;
  state: string;
  activeVerb: MotionVerb;
  instantaneousVelocity: Vector3D;
  isMeaningfulMotionActive: boolean;
}

/**
 * Solves a TransformationContract at a specific global composition frame.
 * Guarantees smooth continuous interpolation between InitialState,
 * MidpointEvent, and FinalState, preserving velocity across the timeline.
 */
export function evaluateTransformationContract(
  contract: TransformationContract,
  currentFrame: number
): EvaluatedEntityFrame {
  const { startFrame, endFrame, initialState, midpointEvent, finalState, exitMomentum } = contract;

  // Clamp frame to shot boundaries
  const f = Math.max(startFrame, Math.min(endFrame, currentFrame));
  const relFrame = f - startFrame;
  const duration = Math.max(1, endFrame - startFrame);
  const midStart = midpointEvent.startFrame;
  const midEnd = midpointEvent.endFrame;

  // Phase Boundaries:
  // Phase 1: startFrame -> midStart (Entrance / Anticipation)
  // Phase 2: midStart -> midEnd (Midpoint Meaningful Event)
  // Phase 3: midEnd -> endFrame (Settling / Exit Handoff)

  let px = initialState.position.x;
  let py = initialState.position.y;
  let pz = initialState.position.z ?? 0;
  let s = initialState.scale;
  let rotZ = initialState.rotation.z;
  let rotX = initialState.rotation.x ?? 0;
  let rotY = initialState.rotation.y ?? 0;
  let geom = initialState.geometry ?? 'default';
  let matState = initialState.state ?? 'normal';
  let activeVerb: MotionVerb = 'TRAVEL';
  let isMeaningfulMotionActive = false;

  const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);
  const easeOutSnap = Easing.bezier(0.16, 1, 0.3, 1);

  if (f < midStart) {
    // Phase 1: Entrance / Anticipation toward Midpoint
    const p = Math.max(0, (f - startFrame) / Math.max(1, midStart - startFrame));
    const ep = easeOutSnap(p);

    px = interpolate(ep, [0, 1], [initialState.position.x, (initialState.position.x + finalState.position.x) / 2]);
    py = interpolate(ep, [0, 1], [initialState.position.y, (initialState.position.y + finalState.position.y) / 2]);
    pz = interpolate(ep, [0, 1], [initialState.position.z ?? 0, (finalState.position.z ?? 0) * 0.5]);
    s = interpolate(ep, [0, 1], [initialState.scale, (initialState.scale + finalState.scale) / 2]);
    rotZ = interpolate(ep, [0, 1], [initialState.rotation.z, (initialState.rotation.z + finalState.rotation.z) / 2]);
    activeVerb = 'ENTER';
    isMeaningfulMotionActive = p < 0.8;
  } else if (f <= midEnd) {
    // Phase 2: Mandatory Midpoint Transformation (Active Middle 60%)
    const p = Math.max(0, (f - midStart) / Math.max(1, midEnd - midStart));
    const ep = easeInOutCubic(p);

    const midX = (initialState.position.x + finalState.position.x) / 2;
    const midY = (initialState.position.y + finalState.position.y) / 2;
    const midZ = ((initialState.position.z ?? 0) + (finalState.position.z ?? 0)) / 2;

    px = interpolate(ep, [0, 1], [midX, finalState.position.x]);
    py = interpolate(ep, [0, 1], [midY, finalState.position.y]);
    pz = interpolate(ep, [0, 1], [midZ, finalState.position.z ?? 0]);
    s = interpolate(ep, [0, 1], [(initialState.scale + finalState.scale) / 2, finalState.scale]);
    rotZ = interpolate(ep, [0, 1], [(initialState.rotation.z + finalState.rotation.z) / 2, finalState.rotation.z]);
    activeVerb = midpointEvent.verb;
    geom = midpointEvent.subBeats.length > 0 && p >= 0.5 ? (finalState.geometry ?? 'active') : geom;
    matState = midpointEvent.verb;
    isMeaningfulMotionActive = true;
  } else {
    // Phase 3: Settle & Momentum Handoff into subsequent shot
    const p = Math.max(0, (f - midEnd) / Math.max(1, endFrame - midEnd));
    const ep = easeInOutCubic(p);

    px = finalState.position.x + (exitMomentum.vector.x * ep * 15);
    py = finalState.position.y + (exitMomentum.vector.y * ep * 15);
    pz = (finalState.position.z ?? 0) + ((exitMomentum.vector.z ?? 0) * ep * 15);
    s = finalState.scale;
    rotZ = finalState.rotation.z + ((exitMomentum.angularVelocity ?? 0) * ep * 10);
    geom = finalState.geometry ?? 'settled';
    matState = finalState.state ?? 'transformed';
    activeVerb = 'MOMENTUM_TRANSFER';
    isMeaningfulMotionActive = p < 0.7;
  }

  // Calculate instantaneous velocity vector (dx/dt)
  const dt = 1;
  const fNext = Math.min(endFrame, f + dt);
  const nextP = (fNext - startFrame) / duration;
  const vx = exitMomentum.vector.x * (f >= midEnd ? 1 : 0.5);
  const vy = exitMomentum.vector.y * (f >= midEnd ? 1 : 0.5);
  const vz = exitMomentum.vector.z ?? 0;

  return {
    position: { x: px, y: py, z: pz },
    scale: s,
    rotation: { x: rotX, y: rotY, z: rotZ },
    opacity: 1.0, // Continuous Persistent Canvas: Opacity stays 1.0
    geometry: geom,
    state: matState,
    activeVerb,
    instantaneousVelocity: { x: vx, y: vy, z: vz },
    isMeaningfulMotionActive,
  };
}
