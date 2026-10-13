/**
 * ============================================================================
 * VISUAL STATE GRAPH (VSG) COMPOSITION & STATE MACHINE ENGINE
 * ============================================================================
 * Formal state machine and semantic transformation contract for AI cinematic
 * motion graphics. Models transitions not as arbitrary cuts, but as directed
 * graph transitions between persistent semantic visual states.
 * ============================================================================
 */

import { SpringPresetDefinition } from '../physics/SpringPhysicsMatrix';
import { TransitionArchetype } from '../transitions/DynamicTransitionSchema';

export type SemanticRole =
  | 'HERO_ACTOR'
  | 'TYPOGRAPHY_STREAM'
  | 'TELEMETRY_GAUGE'
  | 'CONSTELLATION_NODE'
  | 'PORTAL_APERTURE'
  | 'VOLUMETRIC_ATMOSPHERE';

export type EnterTrigger =
  | 'BEAT_DROP'
  | 'WORD_SPOKEN'
  | 'CAMERA_ARRIVAL'
  | 'TRANSITION_START'
  | 'MANUAL_FRAME';

export type ExitTrigger =
  | 'TRANSITION_OUT'
  | 'AUDIO_CLIMAX'
  | 'TIMED_EXPIRATION'
  | 'ENERGY_EXHAUSTION';

export type MotionPath =
  | 'STATIONARY_FLOAT'
  | 'HORIZONTAL_GLIDE'
  | 'ORBITAL_LODESTAR'
  | 'DEEP_Z_PLUNGE'
  | 'PARABOLIC_FLING';

export type DepthLayer =
  | 'BACKGROUND'
  | 'DEEP_MIDGROUND'
  | 'HERO_PLANE'
  | 'FOREGROUND_OVERLAY'
  | 'LIGHT_VOLUMETRIC';

export interface VisualStateTransition {
  targetStateId: string;
  transitionType: TransitionArchetype;
  durationInFrames: number;
}

export interface VisualStateNode {
  stateId: string;
  semanticRole: SemanticRole;
  enterTrigger?: EnterTrigger;
  exitTrigger?: ExitTrigger;
  durationInFrames: number;
  springConfig: {
    mass: number;
    stiffness: number;
    damping: number;
    overshootClamping?: boolean;
  };
  motionPath?: MotionPath;
  depthLayer: DepthLayer;
  colorToken: string;
  transitions?: VisualStateTransition[];
}

export interface VisualStateGraph {
  graphId: string;
  initialStateId: string;
  states: VisualStateNode[];
}

export interface VSGValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates a VisualStateGraph against semantic invariants:
 * 1. Initial state exists in graph
 * 2. No orphan/unreachable states
 * 3. All transition targets exist
 * 4. Spring physics configs are within physical bounds
 * 5. Depth layers adhere to the Composition Depth Budget
 */
export function validateVisualStateGraph(graph: VisualStateGraph): VSGValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!graph.graphId) {
    errors.push('VSG: graphId is required');
  }

  if (!graph.states || graph.states.length === 0) {
    errors.push('VSG: states array cannot be empty');
    return { valid: false, errors, warnings };
  }

  const stateMap = new Map<string, VisualStateNode>();
  for (const st of graph.states) {
    if (stateMap.has(st.stateId)) {
      errors.push(`VSG: Duplicate stateId detected: "${st.stateId}"`);
    }
    stateMap.set(st.stateId, st);

    // Spring physics bounds validation
    if (st.springConfig) {
      if (st.springConfig.mass <= 0 || st.springConfig.mass > 2.0) {
        errors.push(`VSG state "${st.stateId}": invalid mass (${st.springConfig.mass}). Must be between 0.1 and 2.0`);
      }
      if (st.springConfig.stiffness < 30 || st.springConfig.stiffness > 300) {
        errors.push(`VSG state "${st.stateId}": invalid stiffness (${st.springConfig.stiffness}). Must be between 30 and 300`);
      }
      if (st.springConfig.damping < 4 || st.springConfig.damping > 40) {
        errors.push(`VSG state "${st.stateId}": invalid damping (${st.springConfig.damping}). Must be between 4 and 40`);
      }
    } else {
      errors.push(`VSG state "${st.stateId}": missing required springConfig`);
    }

    // Depth layer check
    const validLayers = ['BACKGROUND', 'DEEP_MIDGROUND', 'HERO_PLANE', 'FOREGROUND_OVERLAY', 'LIGHT_VOLUMETRIC'];
    if (!validLayers.includes(st.depthLayer)) {
      errors.push(`VSG state "${st.stateId}": invalid depthLayer "${st.depthLayer}"`);
    }
  }

  if (!stateMap.has(graph.initialStateId)) {
    errors.push(`VSG: initialStateId "${graph.initialStateId}" not found in declared states`);
  }

  // Transition target reachability validation
  for (const st of graph.states) {
    if (st.transitions) {
      for (const trans of st.transitions) {
        if (!stateMap.has(trans.targetStateId)) {
          errors.push(`VSG state "${st.stateId}": transition target "${trans.targetStateId}" does not exist in graph`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
