/**
 * RESPONSIVE TYPOGRAPHY & HARD LEGIBILITY ENGINE
 * 
 * Enforces uncompromising readability across all resolutions and aspect ratios (16:9 landscape, 9:16 vertical reels, 1:1 square).
 * Prevents "Small Floating Box Syndrome" and guarantees every text, metric, and subtitle meets
 * broadcast-grade physical readability standards.
 */

export interface LegibilityFloorSpec {
  microTelemetry: number; // Badges, status pills, small metadata
  body: number;           // Explanatory copy, card descriptions
  subtitle: number;       // Spoken narration subtitles
  cardHeader: number;     // Card titles, feature headers
  heroTitle: number;      // Main scene declarations, section headers
  kineticWord: number;    // Giant kinetic impact words, hero numbers
}

/**
 * Standard broadcast minimum font sizes (in pixels).
 * No text rendered by this studio may ever fall below these absolute floors.
 */
export const LEGIBILITY_FLOORS_16_9: LegibilityFloorSpec = {
  microTelemetry: 13,
  body: 16,
  subtitle: 24,
  cardHeader: 22,
  heroTitle: 36,
  kineticWord: 84,
};

/**
 * Vertical 9:16 mobile screens require ~1.15x - 1.25x scale
 * because viewing distance on phones and narrow width demand punchier typographic mass.
 */
export const LEGIBILITY_FLOORS_9_16: LegibilityFloorSpec = {
  microTelemetry: 15,
  body: 18,
  subtitle: 28,
  cardHeader: 26,
  heroTitle: 44,
  kineticWord: 96,
};

export type TypographyRole = keyof LegibilityFloorSpec;

/**
 * Calculates adaptive viewport scale factor and aspect ratio multipliers.
 */
export function getViewportMetrics(width: number, height: number): {
  isVertical: boolean;
  aspectRatio: number;
  scaleFactor: number;
  floors: LegibilityFloorSpec;
} {
  const aspectRatio = width / height;
  const isVertical = aspectRatio < 1.0; // 9:16 or portrait

  // Reference width: 1920 for landscape, 1080 for vertical
  const referenceWidth = isVertical ? 1080 : 1920;
  const scaleFactor = Math.max(0.75, Math.min(2.5, width / referenceWidth));
  const floors = isVertical ? LEGIBILITY_FLOORS_9_16 : LEGIBILITY_FLOORS_16_9;

  return {
    isVertical,
    aspectRatio,
    scaleFactor,
    floors,
  };
}

/**
 * Clamps and scales any font size so it NEVER falls below the minimum legibility floor.
 * 
 * @param requestedSize The preferred font size in CSS pixels
 * @param role The semantic role of the typography (e.g. 'body', 'heroTitle', 'cardHeader')
 * @param width Canvas width from useVideoConfig()
 * @param height Canvas height from useVideoConfig()
 * @returns Clamped, safe, high-legibility integer font size
 */
export function clampFontSize(
  requestedSize: number,
  role: TypographyRole = 'body',
  width: number = 1920,
  height: number = 1080
): number {
  const { floors, scaleFactor } = getViewportMetrics(width, height);
  const floor = floors[role];

  // Apply resolution scaling, but enforce the strict floor
  const scaled = requestedSize * scaleFactor;
  return Math.round(Math.max(floor, scaled));
}

/**
 * Formats multi-line Persian text with optimal editorial leading (line-height)
 * preventing collision between ascenders, descenders, and accent marks.
 */
export function getPersianLineHeight(role: TypographyRole = 'body'): number {
  switch (role) {
    case 'kineticWord':
    case 'heroTitle':
      return 1.25; // Tight for massive display text
    case 'cardHeader':
      return 1.35;
    case 'subtitle':
      return 1.45;
    case 'body':
    case 'microTelemetry':
    default:
      return 1.55; // Generous leading for Persian reading ease
  }
}
