/**
 * VISUAL CHOREOGRAPHER & ART DIRECTION ENGINE (V26)
 * 
 * Elevates motion design from "animating placed UI elements" to
 * authored visual choreography:
 * 
 * Narrative Beat
 *  → Visual Metaphor
 *  → Choreography Plan
 *  → Transformation Chain (A -> B -> C)
 *  → Asymmetric Spatial Composition & Focal Migration
 *  → Motion Hierarchy & Energy Curve
 *  → Kinematic Motion Profile
 *  → Render
 * 
 * CORE RESPONSIBILITY:
 * Does NOT render directly. Authors the semantic, spatial, and temporal choreography plan.
 */

export type VisualMetaphorType =
  | 'COMPRESSION_AND_RELEASE'       // Acceleration: clustered mass compresses, slingshots through corridor
  | 'SEED_TO_EXPANDING_NETWORK'     // Growth: singular geometric node extrudes into structured matrix
  | 'MONOLITH_TO_VORTEX'            // Transformation: rigid architectural mass folds into dynamic flow
  | 'COLLISION_AND_RECONFIGURATION'  // Conflict: opposing vector rays collide, fracture, and assemble
  | 'LETTERFORM_AS_GEOMETRY'        // Intellect: Persian typography acts as physical vector structure
  | 'FROZEN_EQUILIBRIUM'            // Contemplation: extreme silence, hairline iris, locked negative space
  | 'THRESHOLD_TRAVERSAL';          // Transcendence: aperture dilation and motivated camera-through

export type SpatialCompositionType =
  | 'CENTER_DELIBERATE'             // Used only with intentional symmetry
  | 'LEFT_THIRD_ASYMMETRIC'         // Hero at 30% X; 70% negative space breathing right
  | 'RIGHT_THIRD_ASYMMETRIC'        // Hero at 70% X; 30% negative space breathing left
  | 'BOTTOM_ANCHOR_PANORAMA'        // Low datum line (Y=720), expansive top void
  | 'DIAGONAL_VECTOR_SPLIT'         // Dynamic diagonal axis driving gaze across corners
  | 'DYNAMIC_MIGRATING';            // Focal point travels over duration of beat

export type NegativeSpaceStrategy =
  | 'VAST_VOID'      // >= 80% negative space (sacred, contemplative, high tension)
  | 'BALANCED_CANVAS'// 60% - 75% negative space (focused editorial clarity)
  | 'DENSE_CLUSTER'; // 40% - 55% negative space (structured analytical complexity)

export type TransformationStepType =
  | 'ORIGIN'
  | 'DEFORM'
  | 'SPLIT'
  | 'TRAVEL'
  | 'FUSE'
  | 'RECONFIGURE'
  | 'TERMINATE';

export interface TransformationChainNode {
  stepId: string;
  type: TransformationStepType;
  relativeStart: number; // 0.0 to 1.0 within beat
  relativeDuration: number;
  carrierDescription: string;
  sourceGeometry: string;
  targetGeometry: string;
}

export interface FocalPointCoordinate {
  x: number; // 0 to 1920
  y: number; // 0 to 1080
}

export interface VisualChoreographyBeatPlan {
  beatId: string;
  semanticPurpose: string;
  visualMetaphor: VisualMetaphorType;
  primarySubject: string;
  secondarySubjects: string[];
  
  // Spatial & Framing Art Direction
  spatialComposition: SpatialCompositionType;
  focalPointStart: FocalPointCoordinate;
  focalPointEnd: FocalPointCoordinate;
  negativeSpaceStrategy: NegativeSpaceStrategy;
  negativeSpaceRatio: number; // e.g. 0.78
  
  // Motion & Transformation
  motionVerb: string;
  transformationChain: TransformationChainNode[];
  energyProfile: {
    startEnergy: number; // 1 to 5
    peakEnergy: number;
    endEnergy: number;
    silenceHoldFrames: number;
  };
  
  // Camera & Typography Art Direction
  cameraBehavior: {
    type: 'STATIC_LOCK' | 'MOTIVATED_PUSH' | 'LATERAL_TRACK' | 'PUNCH_THROUGH' | 'EDITORIAL_REFRAME';
    startFocal: FocalPointCoordinate;
    targetFocal: FocalPointCoordinate;
    startScale: number;
    targetScale: number;
    reason: string;
  };
  typographyRole: {
    text: string;
    englishSubtext?: string;
    behavior: 'GRAPHIC_EXTRUSION' | 'VECTOR_SLAM' | 'STILL_MONOLITH' | 'SUBORDINATE_AXIS_LABEL' | 'SILENT';
    participatesInMorph: boolean;
  };
  transitionStrategy: {
    type: 'CONTINUOUS_MASS_HANDOFF' | 'TOPOLOGICAL_METAMORPHOSIS' | 'CAMERA_PORTAL' | 'CLEAN_HOLD';
    continuityTarget: string;
  };
}

/**
 * Visual Choreographer engine class
 */
export class VisualChoreographer {
  /**
   * Evaluates the interpolated focal point and camera parameters at any local beat frame.
   */
  public static evaluateChoreographyAtProgress(
    plan: VisualChoreographyBeatPlan,
    progress: number // 0.0 to 1.0
  ): {
    currentFocalPoint: FocalPointCoordinate;
    cameraScale: number;
    cameraTranslateX: number;
    cameraTranslateY: number;
    activeTransformStep: TransformationChainNode | null;
  } {
    const p = Math.max(0, Math.min(1, progress));

    // Focal point migration
    const fx = plan.focalPointStart.x + (plan.focalPointEnd.x - plan.focalPointStart.x) * p;
    const fy = plan.focalPointStart.y + (plan.focalPointEnd.y - plan.focalPointStart.y) * p;

    // Camera re-framing
    const camScale = plan.cameraBehavior.startScale + (plan.cameraBehavior.targetScale - plan.cameraBehavior.startScale) * p;
    
    // Pan camera to offset focal point migration if tracking
    let camTx = 0;
    let camTy = 0;
    if (plan.cameraBehavior.type === 'LATERAL_TRACK' || plan.cameraBehavior.type === 'MOTIVATED_PUSH') {
      camTx = (960 - fx) * (camScale - 1.0) * 0.5;
      camTy = (540 - fy) * (camScale - 1.0) * 0.5;
    }

    // Identify active transformation step
    let activeStep: TransformationChainNode | null = null;
    for (const step of plan.transformationChain) {
      if (p >= step.relativeStart && p <= step.relativeStart + step.relativeDuration) {
        activeStep = step;
        break;
      }
    }

    return {
      currentFocalPoint: { x: fx, y: fy },
      cameraScale: Number(camScale.toFixed(4)),
      cameraTranslateX: Number(camTx.toFixed(2)),
      cameraTranslateY: Number(camTy.toFixed(2)),
      activeTransformStep: activeStep,
    };
  }
}
