/**
 * ============================================================================
 * TEST SUITE: RESPONSIVE TYPOGRAPHY & HARD LEGIBILITY ENGINE BENCHMARK
 * ============================================================================
 */

import {
  clampFontSize,
  getViewportMetrics,
  LEGIBILITY_FLOORS_16_9,
  LEGIBILITY_FLOORS_9_16,
  getPersianLineHeight,
} from '../src/typography/responsiveTypography';
import { calculateScreenEstateBounds } from '../src/motion/layout/responsiveLayout';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${msg}`);
    process.exit(1);
  }
}

console.log('================================================================');
console.log('RUNNING RESPONSIVE TYPOGRAPHY & HARD LEGIBILITY BENCHMARK SUITE');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// TEST 1: 16:9 Landscape Viewport Metrics & Floors
// ----------------------------------------------------------------------------
const m169 = getViewportMetrics(1920, 1080);
assert(!m169.isVertical, 'T1: 1920x1080 must be identified as landscape');
assert(m169.scaleFactor === 1.0, 'T1: 1920x1080 scale factor must be 1.0');
assert(m169.floors.body === 16, 'T1: 16:9 body floor must be 16px');
assert(m169.floors.heroTitle === 36, 'T1: 16:9 heroTitle floor must be 36px');
assert(m169.floors.microTelemetry === 13, 'T1: 16:9 microTelemetry floor must be 13px');
console.log('[PASS] T1: 16:9 Landscape viewport metrics & floors verified.');

// ----------------------------------------------------------------------------
// TEST 2: 9:16 Vertical Mobile Viewport Metrics & Elevated Floors
// ----------------------------------------------------------------------------
const m916 = getViewportMetrics(1080, 1920);
assert(m916.isVertical, 'T2: 1080x1920 must be identified as vertical');
assert(m916.floors.body === 18, 'T2: 9:16 body floor must be elevated to 18px for mobile');
assert(m916.floors.heroTitle === 44, 'T2: 9:16 heroTitle floor must be elevated to 44px for mobile');
assert(m916.floors.microTelemetry === 15, 'T2: 9:16 microTelemetry floor must be 15px');
console.log('[PASS] T2: 9:16 Vertical Mobile viewport metrics & elevated mobile floors verified.');

// ----------------------------------------------------------------------------
// TEST 3: clampFontSize Auto-Upgrades Tiny Font Violations
// ----------------------------------------------------------------------------
// An agent writes 10px body text in 16:9 -> must be clamped up to 16px
const clamped1 = clampFontSize(10, 'body', 1920, 1080);
assert(clamped1 === LEGIBILITY_FLOORS_16_9.body, `T3: Expected ${LEGIBILITY_FLOORS_16_9.body}, got ${clamped1}`);

// An agent writes 11px badge in 9:16 -> must be clamped up to 15px
const clamped2 = clampFontSize(11, 'microTelemetry', 1080, 1920);
assert(clamped2 === LEGIBILITY_FLOORS_9_16.microTelemetry, `T3: Expected ${LEGIBILITY_FLOORS_9_16.microTelemetry}, got ${clamped2}`);

// Generous sizes are preserved without reduction
const generousHero = clampFontSize(85, 'heroTitle', 1920, 1080);
assert(generousHero === 85, 'T3: Generous font sizes must be preserved');
console.log('[PASS] T3: clampFontSize guarantees font size never falls below hard floors.');

// ----------------------------------------------------------------------------
// TEST 4: Persian Leading (line-height) Standards
// ----------------------------------------------------------------------------
assert(getPersianLineHeight('body') >= 1.5, 'T4: Body text leading must be >= 1.5 for Persian ascenders');
assert(getPersianLineHeight('subtitle') >= 1.4, 'T4: Subtitle leading must be >= 1.4');
assert(getPersianLineHeight('heroTitle') === 1.25, 'T4: Hero display leading must be 1.25');
console.log('[PASS] T4: Persian leading rules verified.');

// ----------------------------------------------------------------------------
// TEST 5: Screen-Estate Occupation Bounds (Anti-Small-Box Protection)
// ----------------------------------------------------------------------------
const bounds169 = calculateScreenEstateBounds(1920, 1080);
assert(bounds169.heroCardWidth >= 1920 * 0.55, 'T5: Landscape hero card must occupy >= 55% of canvas');
assert(bounds169.heroCardMinHeight >= 1080 * 0.45, 'T5: Landscape hero card min height must be >= 45%');

const bounds916 = calculateScreenEstateBounds(1080, 1920);
assert(bounds916.heroCardWidth >= bounds916.safeZoneWidth * 0.85, 'T5: Vertical hero card must occupy >= 85% of safe zone');
console.log('[PASS] T5: Screen-estate occupation bounds verified.');

// ----------------------------------------------------------------------------
// TEST 6: Vertical Screen-Estate Ceiling (Anti-Overflow & Margin Protection)
// ----------------------------------------------------------------------------
assert(bounds169.heroCardMaxHeight <= 1080 * 0.68, 'T6: Landscape hero card max height must be <= 68% of viewport');
assert(bounds169.safeZonePaddingY >= 1080 * 0.10, 'T6: Vertical safe margin must be >= 10% on top and bottom');
console.log('[PASS] T6: Vertical screen-estate ceiling & margin clearance verified.');

console.log('\n================================================================');
console.log('✅ ALL RESPONSIVE TYPOGRAPHY & HARD LEGIBILITY TESTS PASSED!');
console.log('================================================================');
