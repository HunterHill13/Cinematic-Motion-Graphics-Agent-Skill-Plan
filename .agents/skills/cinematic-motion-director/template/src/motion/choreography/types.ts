import { Easing } from 'remotion';

/**
 * V19 MOTION CHOREOGRAPHY ABSTRACTION
 * State -> Transformation -> Causality -> Handoff
 */

export type SemanticRole =
  | 'anchor'
  | 'emphasis'
  | 'transition'
  | 'transformation'
  | 'support'
  | 'background';

export type MotionPersonality =
  | 'IMPACT'
  | 'ELASTIC'
  | 'GLIDE'
  | 'BUILD'
  | 'HOLD'
  | 'RELEASE';

export interface VisualState {
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
  rotationDeg?: number;
  opacity?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  custom?: Record<string, number | string>;
}

export interface MotionPhaseConfig {
  personality: MotionPersonality;
  durationFrames: number;
  stiffness?: number;
  damping?: number;
  overshoot?: number;
  recoil?: number;
  easingCurve?: (t: number) => number;
}

export interface Trajectory {
  pathType: 'linear' | 'arc' | 'bezier' | 'orbital';
  controlPoints?: { x: number; y: number }[];
  tension?: number;
}

export interface HandoffContract {
  targetId: string;
  relationship: 'becomes' | 'pulls' | 'pushes' | 'reveals' | 'carries';
  momentumTransfer?: number; // 0.0 to 1.0
}

export interface ChoreographyEvent {
  id: string;
  semanticRole: SemanticRole;
  startFrame: number;
  endFrame: number;
  fromState: VisualState;
  toState: VisualState;
  anticipation?: MotionPhaseConfig;
  action: MotionPhaseConfig;
  impact?: MotionPhaseConfig;
  settle?: MotionPhaseConfig;
  trajectory?: Trajectory;
  transformTarget?: string;
  handoff?: HandoffContract;
}

export interface EvaluatedChoreographyState {
  current: VisualState;
  activePhase: MotionPersonality;
  progress: number;
  phaseProgress: number;
  squashScaleX: number;
  squashScaleY: number;
  isCompleted: boolean;
  isStarted: boolean;
}
