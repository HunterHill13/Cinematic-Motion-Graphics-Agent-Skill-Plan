import { Easing } from 'remotion';

/**
 * MOTION TOKENS: Centralized Motion Grammar & Easing Curves
 * Follows "Animate the graphic before animating the camera" & Editorial Motion principles.
 */

export const MOTION_DURATIONS = {
  micro: 10,   // Quick highlight flashes, glow bursts
  short: 20,   // Eyebrow badges, tag reveals
  medium: 35,  // Card entrances, title declarations
  long: 50,    // Multi-element sequence handoffs, progress gauges
  hero: 70,    // Major milestone transformations
  transitionOverlap: 30, // Default cross-scene temporal overlap window
};

export const MOTION_EASINGS = {
  // Editorial Ease: Rapid initial acceleration with a dignified long deceleration tail
  editorial: Easing.bezier(0.16, 1, 0.3, 1),
  // Snappy: For metrics, tags, badges
  snappy: Easing.bezier(0.25, 1, 0.5, 1),
  // Soft / Ambient: For subtle breathing and glow modulation
  soft: Easing.bezier(0.4, 0, 0.2, 1),
  // Hand-off / Exit: Smooth continuous exit without sudden stops
  handoff: Easing.bezier(0.4, 0, 0.2, 1),
  // Linear / Uniform: For continuous rotating gears and clock ticks
  linear: Easing.linear,
};

export interface MotionHierarchyLayer {
  level: 'primary' | 'secondary' | 'ambient';
  purpose: string;
}

export const MOTION_RULES = {
  // Primary: The main subject the viewer must comprehend (titles, numbers, monoliths)
  primaryMaxTranslationPx: 40,
  // Secondary: Supporting labels, indicators, divider beams
  secondaryMaxTranslationPx: 20,
  // Ambient: Subtle background grid, 1-2px breathing, no visual competition
  ambientMaxScaleOffset: 0.015,
};
