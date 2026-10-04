/**
 * Action Choreography & Semantic Motion Engine (v2.1)
 *
 * Defines structured actions that translate narration meaning into
 * physical, purposeful motion. No motion exists merely to look cool.
 */

export type SemanticMotionType =
  | 'growth'
  | 'increase'
  | 'decrease'
  | 'activation'
  | 'inhibition'
  | 'connection'
  | 'separation'
  | 'transformation'
  | 'sequential_propagation'
  | 'danger'
  | 'discovery'
  | 'travel'
  | 'push_in'
  | 'hold';

export interface ChoreographedAction {
  id: string;
  startSec: number;
  endSec: number;
  type: SemanticMotionType;
  target: string;
  narrativeReason: string;
  visualFocalPoint: string;
  reactionTarget?: string;
  intensity?: number; // 0.0 to 1.0
}

export interface ShotChoreography {
  shotId: string;
  purpose: string;
  viewerUnderstanding: string;
  viewerFeeling: string;
  durationSec: number;
  narrationBounds: {
    startSec: number;
    endSec: number;
  };
  actions: ChoreographedAction[];
}

export const SEMANTIC_MOTION_RULES: Record<
  SemanticMotionType,
  { visualEffect: string; motionDynamics: string }
> = {
  growth: {
    visualEffect: 'Radial expansion, scale scale 1.0 -> 1.25',
    motionDynamics: 'Gentle deceleration spring (damping: 24, stiffness: 80)',
  },
  increase: {
    visualEffect: 'Upward translation + scale amplification',
    motionDynamics: 'Snappy upward acceleration',
  },
  decrease: {
    visualEffect: 'Contraction / downward descent / opacity falloff',
    motionDynamics: 'Gentle dampening',
  },
  activation: {
    visualEffect: 'Intense core luminescence, expansion halo, ripple wave',
    motionDynamics: 'Fast impulse shockwave followed by breathing resonance',
  },
  inhibition: {
    visualEffect: 'Desaturation, scale reduction (0.92), blur filter (3px), barrier line',
    motionDynamics: 'Rigid suppression and freeze',
  },
  connection: {
    visualEffect: 'Flowing electric vector line connecting node A to B',
    motionDynamics: 'Directed continuous flow along path',
  },
  separation: {
    visualEffect: 'Bifurcation, divergence into opposite quadrants',
    motionDynamics: 'Elastic repulsion',
  },
  transformation: {
    visualEffect: 'Morphing geometry, color grade phase shift',
    motionDynamics: 'Smooth non-linear phase transition',
  },
  sequential_propagation: {
    visualEffect: 'Cascade ripple activating downstream nodes in domino sequence',
    motionDynamics: 'Staggered delays (e.g. 6 frames per node)',
  },
  danger: {
    visualEffect: 'Chromatic aberration pulse, warning accent tint, rapid micro-shake',
    motionDynamics: 'High tension impulse oscillation',
  },
  discovery: {
    visualEffect: 'Atmospheric focus pull, spotlight reveal, halo glow',
    motionDynamics: 'Slow majestic pan and push',
  },
  travel: {
    visualEffect: 'Directed vector translation with trailing secondary wake',
    motionDynamics: 'Anticipation -> velocity peak -> elastic landing',
  },
  push_in: {
    visualEffect: 'Camera/Canvas zoom scale +10% towards subject',
    motionDynamics: 'Cinematic slow push (cubic-bezier 0.16, 1, 0.3, 1)',
  },
  hold: {
    visualEffect: 'Intentional stillness with sub-perceptual ambient breathing',
    motionDynamics: 'Zero translational motion, micro-breathing only',
  },
};
