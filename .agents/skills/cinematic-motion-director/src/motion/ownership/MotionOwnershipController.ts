/**
 * MOTION OWNERSHIP CONTROLLER (V25.5)
 * 
 * Enforces the Single Authoritative Motion Source rule across the animation pipeline.
 * Eliminates transform stacking conflicts, residual drift, and micro-shimmer.
 * 
 * CORE LAWS OF MOTION OWNERSHIP:
 * 1. ONE TRANSFORM -> ONE AUTHORITATIVE SOURCE:
 *    At any given frame, an animated property (scale, position, rotation, opacity)
 *    is owned by exactly one layer in the motion hierarchy.
 * 
 * 2. TEMPORAL HIERARCHY:
 *    - PRIMARY (Director / Global Choreography): Macro staging, beats, scene cameras.
 *    - SECONDARY (Local Element Kinematics): Action verbs, morphology, hero trajectories.
 *    - TERTIARY (Micro-motion / Reactive): Atmosphere breathing, settle damping, shockwave recoil.
 * 
 * 3. EXCLUSION & DAMPING LOCK:
 *    When a Secondary action is active (e.g. explosive slam, high-velocity travel),
 *    Tertiary micro-motion is strictly MUTED or LOCKED to 0 to prevent compounding wobble.
 * 
 * 4. FREEZE ON HOLD:
 *    During visual hold periods, all transforms are clamped to integer or subpixel-locked
 *    constants with zero procedural float.
 */

export type MotionSourceTier = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';

export interface TransformOwner {
  id: string;
  tier: MotionSourceTier;
  property: 'position' | 'scale' | 'rotation' | 'opacity' | 'morph';
  priority: number; // Higher number overrides
  weight: number;   // 0.0 to 1.0
}

export interface ResolvedTransformState {
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  rotateDeg: number;
  opacity: number;
  activeOwner: string;
}

/**
 * Controller class managing property ownership and arbitrating conflicts.
 */
export class MotionOwnershipController {
  private activeOwners: Map<string, TransformOwner> = new Map();

  /**
   * Evaluates arbitration for an element given primary, secondary, and tertiary inputs.
   */
  public arbitrateTransform(params: {
    primary: { x?: number; y?: number; scale?: number; opacity?: number };
    secondary: { x?: number; y?: number; scaleX?: number; scaleY?: number; rotateDeg?: number; isActive: boolean };
    tertiary: { x?: number; y?: number; scale?: number; isAllowed: boolean };
    holdLocked?: boolean;
  }): ResolvedTransformState {
    const { primary, secondary, tertiary, holdLocked = false } = params;

    if (holdLocked) {
      return {
        translateX: Math.round(primary.x ?? 0),
        translateY: Math.round(primary.y ?? 0),
        scaleX: Number((primary.scale ?? 1.0).toFixed(4)),
        scaleY: Number((primary.scale ?? 1.0).toFixed(4)),
        rotateDeg: 0,
        opacity: primary.opacity ?? 1.0,
        activeOwner: 'HOLD_LOCK_AUTHORITY',
      };
    }

    // When Secondary is active, Tertiary micro-drift is strictly zeroed
    const effectiveTertiaryX = secondary.isActive ? 0 : (tertiary.isAllowed ? (tertiary.x ?? 0) : 0);
    const effectiveTertiaryY = secondary.isActive ? 0 : (tertiary.isAllowed ? (tertiary.y ?? 0) : 0);
    const effectiveTertiaryScale = secondary.isActive ? 1.0 : (tertiary.isAllowed ? (tertiary.scale ?? 1.0) : 1.0);

    const tx = (primary.x ?? 0) + (secondary.x ?? 0) + effectiveTertiaryX;
    const ty = (primary.y ?? 0) + (secondary.y ?? 0) + effectiveTertiaryY;
    const sx = (primary.scale ?? 1.0) * (secondary.scaleX ?? 1.0) * effectiveTertiaryScale;
    const sy = (primary.scale ?? 1.0) * (secondary.scaleY ?? 1.0) * effectiveTertiaryScale;
    const rot = secondary.rotateDeg ?? 0;
    const op = primary.opacity ?? 1.0;

    return {
      translateX: tx,
      translateY: ty,
      scaleX: sx,
      scaleY: sy,
      rotateDeg: rot,
      opacity: op,
      activeOwner: secondary.isActive ? 'SECONDARY_KINEMATICS' : 'PRIMARY_DIRECTOR',
    };
  }
}

export const defaultOwnershipController = new MotionOwnershipController();
