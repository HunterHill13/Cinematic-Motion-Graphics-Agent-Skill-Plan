/**
 * ============================================================================
 * CLAUDE OPUS 5.5 ANIMATION TIMING CONTRACT & SPRING PHYSICS MATRIX
 * ============================================================================
 * Master registry of tuned, production-grade spring physics, timing ratios,
 * and beat-grid synchronization rules to match Anthropic Claude Opus 5.5 motion graphics.
 * ============================================================================
 */

import { spring, SpringConfig } from 'remotion';

export interface SpringPresetDefinition {
  mass: number;
  stiffness: number;
  damping: number;
  description: string;
}

/**
 * Standardized Spring Configurations across all visual layers
 */
export const SPRING_PRESETS: Record<string, SpringPresetDefinition> = {
  // 1. Hero Sculptural Elements & 3D Centerpieces
  HERO_SCULPTURE_ENTRANCE: {
    mass: 0.6,
    stiffness: 85,
    damping: 13,
    description: 'Hero 3D sculpture entrance: graceful spring with subtle settle overshoot',
  },

  // 2. Kinetic Typography Words / Tokens (Persian-Safe Ligature Stagger)
  TYPOGRAPHY_WORD_STAGGER: {
    mass: 0.5,
    stiffness: 140,
    damping: 15,
    description: 'Word-by-word text unroll: crisp, dignified, zero loose oscillation',
  },

  // 3. Status Badges, Chips & Eyebrow Pills
  STATUS_BADGE_PILL: {
    mass: 0.45,
    stiffness: 160,
    damping: 12,
    description: 'Small badges & status indicators: snappy pop with instant engagement',
  },

  // 4. Numeric Counters, Metric Visualizers & Impact Stats
  METRIC_COUNTER_OVERSHOOT: {
    mass: 0.85,
    stiffness: 115,
    damping: 12,
    description: 'Quantitative milestones: confident weight with slight metric bounce',
  },

  // 5. Constellation Sub-Nodes & Floating Telemetry Badges
  CONSTELLATION_NODE_STAGGER: {
    mass: 0.7,
    stiffness: 125,
    damping: 11,
    description: 'Floating orbital sub-nodes: airy, buoyant spatial spring',
  },

  // 6. Transition Directional Exit Fling (Camera Stationary)
  TRANSITION_EXIT_FLING: {
    mass: 0.9,
    stiffness: 130,
    damping: 14,
    description: 'Directional kinetic fling: high-momentum whip out on scene handoffs',
  },

  // 7. Elastic Pop & Slam (High-Energy Emphasis)
  ELASTIC_POP_SLAM: {
    mass: 0.75,
    stiffness: 180,
    damping: 9,
    description: 'Elastic impact slam: explosive arrival with tangible elasticity',
  },
};

/**
 * Standardized Act Lifecycle Timing Ratios
 * Guarantees every narrative act has an organic introduction, long-hold middle focus,
 * and seamless handoff without rush or dead-time.
 */
export const ACT_TIMING_RATIOS = {
  INTRO_RATIO: 0.18, // 18% of act duration: Spring entrances & unrolls
  HOLD_RATIO: 0.68,  // 68% of act duration: Middle 60% continuous micro-motion & narration
  OUTRO_RATIO: 0.14, // 14% of act duration: Transition handoff or camera flight
};

/**
 * Mathematical Beat-Grid Snap Utility (Universal 124/150 BPM quantizer)
 * E.g., 124 BPM at 30 FPS = 14.516 frames per beat.
 */
export function snapToBeat(
  targetFrame: number,
  bpm: number = 124,
  fps: number = 30,
  subdivision: 0.25 | 0.5 | 1 | 2 = 1
): number {
  const framesPerBeat = (60 / bpm) * fps;
  const gridUnit = framesPerBeat * subdivision;
  return Math.round(Math.round(targetFrame / gridUnit) * gridUnit);
}

/**
 * Helper to execute a standardized Remotion spring using the physics matrix
 */
export function executeStandardSpring(
  frame: number,
  fps: number = 30,
  presetKey: keyof typeof SPRING_PRESETS,
  delayFrames: number = 0
): number {
  const preset = SPRING_PRESETS[presetKey] || SPRING_PRESETS.HERO_SCULPTURE_ENTRANCE;
  const localFrame = Math.max(0, frame - delayFrames);
  return spring({
    frame: localFrame,
    fps,
    config: {
      mass: preset.mass,
      stiffness: preset.stiffness,
      damping: preset.damping,
    },
  });
}
