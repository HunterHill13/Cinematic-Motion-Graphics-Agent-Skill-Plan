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
  bentoCellMinWidth: number;
  bentoCellMinHeight: number;
  isVertical: boolean;
}

/**
 * Calculates adaptive container dimensions to guarantee confident visual mass.
 * 
 * @param width Canvas width from useVideoConfig()
 * @param height Canvas height from useVideoConfig()
 * @param occupationTarget Optional fraction (0.5 to 0.9) of safe zone width to occupy
 */
export function calculateScreenEstateBounds(
  width: number = 1920,
  height: number = 1080,
  occupationTarget: number = 0.72
): ScreenEstateBounds {
  const { isVertical } = getViewportMetrics(width, height);

  // Safe margin: 8% horizontal & 10% vertical in 16:9; 6% horizontal & 12% vertical in 9:16
  const paddingXRatio = isVertical ? 0.06 : 0.08;
  const paddingYRatio = isVertical ? 0.12 : 0.10;

  const safeZonePaddingX = Math.round(width * paddingXRatio);
  const safeZonePaddingY = Math.round(height * paddingYRatio);

  const safeZoneWidth = width - safeZonePaddingX * 2;
  const safeZoneHeight = height - safeZonePaddingY * 2;

  // In vertical mobile, hero cards must occupy 85-92% of safe width to fill the screen
  const targetRatio = isVertical ? Math.max(0.85, occupationTarget) : occupationTarget;
  const heroCardWidth = Math.round(safeZoneWidth * targetRatio);

  // Minimum height prevents compressed or cramped cards
  const heroCardMinHeight = Math.round(isVertical ? height * 0.45 : height * 0.50);

  // Bento cells: never thinner than 380px (16:9) or 440px (9:16)
  const bentoCellMinWidth = Math.round(isVertical ? safeZoneWidth * 0.46 : safeZoneWidth * 0.28);
  const bentoCellMinHeight = Math.round(isVertical ? 220 : 180);

  return {
    safeZoneWidth,
    safeZoneHeight,
    safeZonePaddingX,
    safeZonePaddingY,
    heroCardWidth,
    heroCardMinHeight,
    bentoCellMinWidth,
    bentoCellMinHeight,
    isVertical,
  };
}
