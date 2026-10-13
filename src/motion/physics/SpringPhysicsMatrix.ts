/**
 * ============================================================================
 * CLAUDE OPUS 5.5 ANIMATION TIMING CONTRACT, SPRING PHYSICS MATRIX & DEPTH BUDGET
 * ============================================================================
 * Master registry of tuned, production-grade spring physics, timing ratios,
 * beat-grid synchronization rules, per-archetype spring personalities,
 * and composition 3D depth layer budgets to match Anthropic Claude Opus 5.5.
 * ============================================================================
 */

import { spring } from 'remotion';

export interface SpringPresetDefinition {
  mass: number;
  stiffness: number;
  damping: number;
  overshootClamping?: boolean;
  description: string;
}

/**
 * 1. Standardized Spring Configurations across all visual roles
 */
export const SPRING_PRESETS: Record<string, SpringPresetDefinition> = {
  // Hero Sculptural Elements & 3D Centerpieces
  HERO_SCULPTURE_ENTRANCE: {
    mass: 0.6,
    stiffness: 85,
    damping: 13,
    overshootClamping: false,
    description: 'Hero 3D sculpture entrance: graceful spring with subtle settle overshoot',
  },

  // Kinetic Typography Words / Tokens (Persian-Safe Ligature Stagger)
  TYPOGRAPHY_WORD_STAGGER: {
    mass: 0.5,
    stiffness: 140,
    damping: 15,
    overshootClamping: false,
    description: 'Word-by-word text unroll: crisp, dignified, zero loose oscillation',
  },

  // Status Badges, Chips & Eyebrow Pills
  STATUS_BADGE_PILL: {
    mass: 0.45,
    stiffness: 160,
    damping: 12,
    overshootClamping: false,
    description: 'Small badges & status indicators: snappy pop with instant engagement',
  },

  // Numeric Counters, Metric Visualizers & Impact Stats
  METRIC_COUNTER_OVERSHOOT: {
    mass: 0.85,
    stiffness: 115,
    damping: 12,
    overshootClamping: false,
    description: 'Quantitative milestones: confident weight with slight metric bounce',
  },

  // Constellation Sub-Nodes & Floating Telemetry Badges
  CONSTELLATION_NODE_STAGGER: {
    mass: 0.7,
    stiffness: 125,
    damping: 11,
    overshootClamping: false,
    description: 'Floating orbital sub-nodes: airy, buoyant spatial spring',
  },

  // Transition Directional Exit Fling (Camera Stationary)
  TRANSITION_EXIT_FLING: {
    mass: 0.9,
    stiffness: 130,
    damping: 14,
    overshootClamping: false,
    description: 'Directional kinetic fling: high-momentum whip out on scene handoffs',
  },

  // Elastic Pop & Slam (High-Energy Emphasis)
  ELASTIC_POP_SLAM: {
    mass: 0.75,
    stiffness: 180,
    damping: 9,
    overshootClamping: false,
    description: 'Elastic impact slam: explosive arrival with tangible elasticity',
  },
};

/**
 * 2. Per-Archetype Spring Personalities (The 9 Master Template Physics Contracts)
 * Each template embodies a unique physical world: tactile paper folds behave differently
 * from floating quantum bio-membranes or rigid CAD calipers.
 */
export const ARCHETYPE_SPRING_PRESETS: Record<string, SpringPresetDefinition> = {
  DARK_GRAPHITE_TECH: {
    mass: 0.6,
    stiffness: 90,
    damping: 14,
    overshootClamping: false,
    description: 'Dark Graphite: High-tech keynote launch glide with polished damping',
  },
  CONTINUOUS_UI_MORPH: {
    mass: 0.55,
    stiffness: 120,
    damping: 16,
    overshootClamping: false,
    description: 'Continuous UI: Viscous Dribbble/Linear fluid single-element morphing',
  },
  QUANTUM_BIO_DEEP_Z: {
    mass: 0.65,
    stiffness: 75,
    damping: 9,
    overshootClamping: false,
    description: 'Quantum Bio: Underdamped, buoyant bio-cellular resonance and floating drift',
  },
  KINETIC_ARCHITECTURAL_TYPO: {
    mass: 0.9,
    stiffness: 140,
    damping: 18,
    overshootClamping: true,
    description: 'Architectural Typo: Heavy structural masonry lintel impact with dead stop',
  },
  BENTO_GRID_SAAS: {
    mass: 0.5,
    stiffness: 130,
    damping: 15,
    overshootClamping: false,
    description: 'Bento Grid: Clean Apple/Linear modular SaaS tile spring physics',
  },
  FINTECH_TRADING: {
    mass: 0.45,
    stiffness: 170,
    damping: 13,
    overshootClamping: false,
    description: 'FinTech Trading: Ultra-rapid Wall Street tick reaction and orderbook snap',
  },
  STOP_MOTION_PAPER: {
    mass: 0.8,
    stiffness: 210,
    damping: 28,
    overshootClamping: true,
    description: 'Stop-Motion Paper: High-damping tactile papercraft fold with zero oscillation',
  },
  TECHNICAL_BLUEPRINT: {
    mass: 0.5,
    stiffness: 160,
    damping: 22,
    overshootClamping: true,
    description: 'Technical Blueprint: Engineering CAD drafting snap, dead-stop mechanical settle',
  },
  NEO_BRUTALIST: {
    mass: 0.75,
    stiffness: 190,
    damping: 8,
    overshootClamping: false,
    description: 'Neo-Brutalist: High-voltage punch with aggressive rebound elasticity',
  },
  STUDIO_SHOWREEL: {
    mass: 0.6,
    stiffness: 85,
    damping: 13,
    overshootClamping: false,
    description: 'Universal Showreel: Balanced flagship studio showcase curve',
  },
};

/**
 * 3. Composition 3D Depth Layer Budget (Max 5 Discrete Depth Planes)
 * Controls Z-spacing and blur budgets to prevent performance degradation or depth collapse.
 */
export interface DepthPlaneSpec {
  plane: 'BACKGROUND' | 'DEEP_MIDGROUND' | 'HERO_PLANE' | 'FOREGROUND_OVERLAY' | 'LIGHT_VOLUMETRIC';
  zMin: number;
  zMax: number;
  maxBlurPx: number;
  description: string;
}

export const COMPOSITION_DEPTH_BUDGET: Record<string, DepthPlaneSpec> = {
  BACKGROUND: {
    plane: 'BACKGROUND',
    zMin: -600,
    zMax: -300,
    maxBlurPx: 8,
    description: 'Atmospheric backdrop grid, sky stars, horizon mesh',
  },
  DEEP_MIDGROUND: {
    plane: 'DEEP_MIDGROUND',
    zMin: -250,
    zMax: -50,
    maxBlurPx: 3,
    description: 'Secondary constellation conduits and inactive acts',
  },
  HERO_PLANE: {
    plane: 'HERO_PLANE',
    zMin: 0,
    zMax: 0,
    maxBlurPx: 0,
    description: 'Active focal actors, headlines, metrics (100% sharp focus, blur=0)',
  },
  FOREGROUND_OVERLAY: {
    plane: 'FOREGROUND_OVERLAY',
    zMin: 50,
    zMax: 150,
    maxBlurPx: 4,
    description: 'Passing orbital particles, telemetry calipers, HUD framing accents',
  },
  LIGHT_VOLUMETRIC: {
    plane: 'LIGHT_VOLUMETRIC',
    zMin: 200,
    zMax: 350,
    maxBlurPx: 14,
    description: 'Volumetric laser blades, light sweeps, specular lens flares',
  },
};

/**
 * Standardized Act Lifecycle Timing Ratios
 */
export const ACT_TIMING_RATIOS = {
  INTRO_RATIO: 0.18, // 18% of act duration: Spring entrances & unrolls
  HOLD_RATIO: 0.68,  // 68% of act duration: Middle 68% continuous micro-motion & narration
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
 * Helper to execute a standardized Remotion spring using either a visual role preset
 * or an archetype-specific preset.
 */
export function executeStandardSpring(
  frame: number,
  fps: number = 30,
  presetKey: keyof typeof SPRING_PRESETS | keyof typeof ARCHETYPE_SPRING_PRESETS,
  delayFrames: number = 0
): number {
  const preset =
    SPRING_PRESETS[presetKey] ||
    ARCHETYPE_SPRING_PRESETS[presetKey] ||
    SPRING_PRESETS.HERO_SCULPTURE_ENTRANCE;

  const localFrame = Math.max(0, frame - delayFrames);
  return spring({
    frame: localFrame,
    fps,
    config: {
      mass: preset.mass,
      stiffness: preset.stiffness,
      damping: preset.damping,
      overshootClamping: preset.overshootClamping ?? false,
    },
  });
}
