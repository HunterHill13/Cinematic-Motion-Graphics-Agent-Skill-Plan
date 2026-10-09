/**
 * ============================================================================
 * MOTION SCENE GRAPH SCHEMA (PHASE 4B)
 * ============================================================================
 * 
 * Machine-readable semantic graph schema connecting Creative Intent to
 * Executable Transformation Contracts and PersistentWorld structures.
 * 
 * Enforces:
 *   - Entity persistence across shot boundaries (No unmount/remount)
 *   - Multi-dimensional causal chains: State A -> Trigger -> Force -> Verb -> State B -> Consequence
 *   - Camera separation: Camera transforms are distinct from Object transformations
 *   - Middle-window transformation guarantee (Middle 60%)
 * ============================================================================
 */

import {
  Vector3D,
  Rotation3D,
  MotionVerb,
  EntitySpatialState,
  TransformationContract,
} from '../grammar/motionGrammar';
import { VisualWorld } from '../visual_world/visualWorldSchema';

export type EntityRole = 'HERO' | 'SECONDARY' | 'ENVIRONMENT';

export type EntityLifecycleAction =
  | 'PERSIST'
  | 'GENESIS'
  | 'TERMINUS'
  | 'SPLIT_FROM'
  | 'MERGE_INTO'
  | 'TRANSFORM_INTO'
  | 'DESTROY'
  | 'REPLACE';

export interface MotionTrigger {
  frame: number;
  narrationMarker: string;
  forceType: string;
  intensity?: number; // 0.0 to 1.0
}

export interface MotionConsequence {
  description: string;
  exitMomentum: {
    vector: Vector3D;
    angularVelocity: number;
  };
  spatialResolution: string;
}

export interface SpatialIntent {
  origin: Vector3D;
  target?: Vector3D;
  scaleShift?: { from: number; to: number };
  rotationShiftDeg?: number;
  morphTargetGeometry?: string;
  separationDistance?: number;
  fragmentCount?: number;
  maxSquash?: number;
  maxShearDeg?: number;
}

export interface MotionEntityNode {
  id: string;
  label: string;
  role: EntityRole;
  parentId?: string;
  persistent: boolean;
  lifecycle: EntityLifecycleAction;
  initialState: EntitySpatialState;
  semanticPurpose: string;
}

export interface MotionTransformationNode {
  id: string;
  shotId: string;
  sourceEntityIds: string[];
  targetEntityIds?: string[];
  verb: MotionVerb;
  startFrame: number;
  endFrame: number;
  trigger: MotionTrigger;
  consequence: MotionConsequence;
  spatialIntent: SpatialIntent;
  contract?: TransformationContract;
}

export interface ContinuityConstraint {
  entityId: string;
  fromShotId: string;
  toShotId: string;
  mustPreservePosition: boolean;
  mustPreserveScale: boolean;
  maxDiscontinuityTolerancePx: number;
}

export interface CameraKeyframeSpec {
  frame: number;
  position: Vector3D;
  zoom?: number;
  pitchDeg?: number;
  yawDeg?: number;
}

export interface CameraTrajectorySpec {
  keyframes: CameraKeyframeSpec[];
  isSubjectCoupled: boolean;
  coupledEntityId?: string;
}

export interface MotionSceneGraph {
  sceneId: string;
  title: string;
  totalDurationFrames: number;
  world: {
    width: number;
    height: number;
    depthEnabled: boolean;
    backgroundColor?: string;
  };
  entities: MotionEntityNode[];
  transformations: MotionTransformationNode[];
  continuity: ContinuityConstraint[];
  camera?: CameraTrajectorySpec;
  visualWorld?: VisualWorld;
}

/**
 * Validation Diagnostic Codes for MotionSceneGraph
 */
export type MotionGraphErrorCode =
  | 'MOTION_GRAPH_MISSING_VERB'
  | 'MOTION_GRAPH_MISSING_TRIGGER'
  | 'MOTION_GRAPH_MISSING_CONSEQUENCE'
  | 'MOTION_GRAPH_STATIC_MIDDLE_WINDOW'
  | 'MOTION_GRAPH_CAMERA_ONLY'
  | 'MOTION_GRAPH_NON_PERSISTENT_HERO'
  | 'MOTION_GRAPH_RAW_MOTION_ESCAPE'
  | 'MOTION_GRAPH_UNRESOLVED_TRANSFORMATION'
  | 'MOTION_INTENT_AMBIGUOUS';

export interface MotionGraphValidationIssue {
  code: MotionGraphErrorCode;
  message: string;
  nodeId?: string;
  entityId?: string;
  shotId?: string;
  frame?: number;
}

export interface MotionGraphValidationResult {
  valid: boolean;
  issues: MotionGraphValidationIssue[];
}
