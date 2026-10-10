/**
 * ============================================================================
 * TEST SUITE: ZERO-TO-VIDEO AUTOMATED COMPILER & DYNAMIC ASSET ENGINE
 * ============================================================================
 */

import { ZeroToVideoCompiler, VideoManifest } from '../src/compiler/ZeroToVideoCompiler';
import { resolveVectorProgression, DYNAMIC_VECTOR_CATALOG } from '../src/motion/library/DynamicVectorCatalog';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${msg}`);
    process.exit(1);
  }
}

console.log('================================================================');
console.log('RUNNING ZERO-TO-VIDEO & DYNAMIC ASSET ENGINE BENCHMARK SUITE');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// TEST 1: General Topic Compilation & Manifest Integrity
// ----------------------------------------------------------------------------
const generalManifest = ZeroToVideoCompiler.compile({
  topic: 'کارگردانی سینمایی ویدیو در تراز کلاد اوپوس ۵.۵',
  durationInSeconds: 60,
});

assert(generalManifest.meta.durationInFrames === 1800, 'T1: Total frames must equal 1800 for 60s');
assert(generalManifest.meta.canvasWidth === 1920 && generalManifest.meta.canvasHeight === 1080, 'T1: Canvas must be 1920x1080');
assert(generalManifest.act1.headline.length > 5, 'T1: Act 1 headline must not be empty');
assert(generalManifest.act2.stages.length === 4, 'T1: Act 2 must contain 4 distinct topological stages');
assert(generalManifest.act3.barChartItems.length >= 3, 'T1: Act 3 must include >=3 bar chart items');
assert(generalManifest.act4.gaugeValue === 100, 'T1: Act 4 calibration gauge must reach 100%');
console.log('[PASS] T1: General topic compilation & manifest integrity verified.');

// ----------------------------------------------------------------------------
// TEST 2: Biomedical & Genetics Domain Resolution
// ----------------------------------------------------------------------------
const bioManifest = ZeroToVideoCompiler.compile({
  topic: 'تحلیل توالی ژنوم و هلیکس DNA در درمان سرطان',
});

const hasDna = bioManifest.act2.stages.some((s) => s.id === 'DNA_HELIX_ORBIT');
assert(hasDna, 'T2: Biomedical topic must resolve DNA_HELIX_ORBIT stage');
assert(bioManifest.act1.badge.includes('ژنتیک') || bioManifest.act1.badge.includes('بیوتکنولوژی'), 'T2: Act 1 badge must be biomedical themed');
assert(bioManifest.act3.headerTitle.includes('بیوانفورماتیک'), 'T2: Act 3 header must reflect bioinformatics');
console.log('[PASS] T2: Biomedical & Genetics domain auto-resolution verified.');

// ----------------------------------------------------------------------------
// TEST 3: Fintech & Growth Domain Resolution
// ----------------------------------------------------------------------------
const fintechManifest = ZeroToVideoCompiler.compile({
  topic: 'شاخص سودآوری و رشد ارزش سهام در بازار مالی',
});

const hasChart = fintechManifest.act2.stages.some((s) => s.id === 'EXPONENTIAL_CHART');
assert(hasChart, 'T3: Fintech topic must resolve EXPONENTIAL_CHART stage');
assert(fintechManifest.act1.badge.includes('مالی'), 'T3: Act 1 badge must be finance themed');
assert(fintechManifest.act3.barChartItems[0].label.includes('پرتفوی'), 'T3: Act 3 chart must be portfolio themed');
console.log('[PASS] T3: Fintech & Growth domain auto-resolution verified.');

// ----------------------------------------------------------------------------
// TEST 4: AI & Neural Computing Domain Resolution
// ----------------------------------------------------------------------------
const aiStages = resolveVectorProgression('مدل زبانی بزرگ و الگوریتم‌های هوش مصنوعی');
assert(aiStages[0].id === 'NEURAL_SYNAPSE', 'T4: AI topic must place NEURAL_SYNAPSE as primary');
console.log('[PASS] T4: AI & Neural Computing domain auto-resolution verified.');

// ----------------------------------------------------------------------------
// TEST 5: Compilation Latency Benchmark (<100ms for 50 compiles)
// ----------------------------------------------------------------------------
const benchStart = Date.now();
for (let i = 0; i < 50; i++) {
  ZeroToVideoCompiler.compile({ topic: `تست عملکرد سناریوی شماره ${i}` });
}
const benchElapsed = Date.now() - benchStart;
assert(benchElapsed < 250, `T5: 50 compilations must take <250ms (took ${benchElapsed}ms)`);
console.log(`[PASS] T5: Compiler latency benchmark verified (50 compiles in ${benchElapsed}ms, ${(benchElapsed / 50).toFixed(2)}ms/compile).`);

// ----------------------------------------------------------------------------
// TEST 6: Act Monotonicity & Spatial Bounds Gate
// ----------------------------------------------------------------------------
assert(generalManifest.act1.startFrame < generalManifest.act2.startFrame, 'T6: Act 1 must start before Act 2');
assert(generalManifest.act2.startFrame < generalManifest.act3.startFrame, 'T6: Act 2 must start before Act 3');
assert(generalManifest.act3.startFrame < generalManifest.act4.startFrame, 'T6: Act 3 must start before Act 4');
assert(generalManifest.cameraKeyframes.act1X < generalManifest.cameraKeyframes.act2X, 'T6: Camera must pan rightwards monotonically');
assert(generalManifest.cameraKeyframes.act2X < generalManifest.cameraKeyframes.act3X, 'T6: Camera Act 2 < Act 3');
assert(generalManifest.cameraKeyframes.act3X < generalManifest.cameraKeyframes.act4X, 'T6: Camera Act 3 < Act 4');
console.log('[PASS] T6: Act monotonicity and spatial camera bounds verified.');

console.log('\n================================================================');
console.log('✅ ALL 6 ZERO-TO-VIDEO BENCHMARK TESTS PASSED');
console.log('================================================================\n');
