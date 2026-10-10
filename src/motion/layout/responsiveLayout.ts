/**
 * RESPONSIVE SCREEN-ESTATE OCCUPATION & CONTAINER SCALING ENGINE
 * 
 * Enforces that hero cards, bento cells, and telemetry monoliths occupy a confident,
 * balanced proportion of the viewport (60% - 85% safe zone width), completely eliminating
 * the "Small Floating Box Syndrome" where tiny elements get lost in a massive dark void.
 */

import { getViewportMetrics } from '../../typography/responsiveTypography';

export interface ScreenEstateBounds {
  safeZoneWidth: number;
  safeZoneHeight: number;
  safeZonePaddingX: number;
  safeZonePaddingY: number;
  heroCardWidth: number;
  heroCardMinHeight: number;
  heroCardMaxHeight: number;
  bentoCellMinWidth: number;
  bentoCellMinHeight: number;
  isVertical: boolean;
}

/**
 * Calculates adaptive container dimensions to guarantee confident visual mass
 * while strictly preserving at least 12%-15% breathing room on top and bottom.
 * 
 * @param width Canvas width from useVideoConfig()
 * @param height Canvas height from useVideoConfig()
 * @param occupationTarget Optional fraction (0.5 to 0.85) of safe zone width to occupy
 */
export function calculateScreenEstateBounds(
  width: number = 1920,
  height: number = 1080,
  occupationTarget: number = 0.73
): ScreenEstateBounds {
  const { isVertical } = getViewportMetrics(width, height);

  // Safe margin: 7% horizontal & 12% vertical in 16:9; 6% horizontal & 10% vertical in 9:16
  const paddingXRatio = isVertical ? 0.06 : 0.07;
  const paddingYRatio = isVertical ? 0.10 : 0.12;

  const safeZonePaddingX = Math.round(width * paddingXRatio);
  const safeZonePaddingY = Math.round(height * paddingYRatio);

  const safeZoneWidth = width - safeZonePaddingX * 2;
  const safeZoneHeight = height - safeZonePaddingY * 2;

  // In vertical mobile, hero cards must occupy 88-92% of safe width to fill the screen
  const targetRatio = isVertical ? Math.max(0.88, occupationTarget) : occupationTarget;
  const heroCardWidth = Math.round(safeZoneWidth * targetRatio);

  // Golden Mean height envelope: ~660px - 700px in 1080p landscape (61% - 65% of viewport)
  // Guarantees elements never overflow outside while eliminating excessive empty margins
  const heroCardMinHeight = Math.round(isVertical ? height * 0.50 : height * 0.60);
  const heroCardMaxHeight = Math.round(isVertical ? height * 0.70 : height * 0.65);

  // Bento cells: never thinner than 400px (16:9) or 440px (9:16)
  const bentoCellMinWidth = Math.round(isVertical ? safeZoneWidth * 0.46 : safeZoneWidth * 0.30);
  const bentoCellMinHeight = Math.round(isVertical ? 220 : 190);

  return {
    safeZoneWidth,
    safeZoneHeight,
    safeZonePaddingX,
    safeZonePaddingY,
    heroCardWidth,
    heroCardMinHeight,
    heroCardMaxHeight,
    bentoCellMinWidth,
    bentoCellMinHeight,
    isVertical,
  };
}
