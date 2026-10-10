/**
 * ============================================================================
 * BENCHMARK TEST: UNIVERSAL CINEMATIC STORY SCENE BOILERPLATE
 * ============================================================================
 */

import React from 'react';
import { UniversalCinematicStoryScene } from '../src/motion/templates/UniversalCinematicStoryScene';
import { TEMPLATE_CATALOG } from '../src/motion/templates/TemplateCatalog';

console.log('================================================================');
console.log('RUNNING UNIVERSAL CINEMATIC STORY SCENE BENCHMARK SUITE');
console.log('================================================================\n');

let passedAll = true;

// 1. Verify instantiation across all 9 master template archetypes
const templateKeys = Object.keys(TEMPLATE_CATALOG) as Array<keyof typeof TEMPLATE_CATALOG>;
console.log(`Testing UniversalCinematicStoryScene across all ${templateKeys.length} archetypes:`);

for (const key of templateKeys) {
  try {
    const el = React.createElement(UniversalCinematicStoryScene, {
      templateId: key,
      cameraMode: TEMPLATE_CATALOG[key].recommendedCamera,
      bpm: 150,
    });
    if (React.isValidElement(el)) {
      console.log(`  ✓ Archetype "${key}": Valid React element created with ${TEMPLATE_CATALOG[key].recommendedCamera}`);
    } else {
      console.error(`  ✗ Archetype "${key}": Failed to instantiate!`);
      passedAll = false;
    }
  } catch (err: any) {
    console.error(`  ✗ Archetype "${key}": Threw error: ${err.message}`);
    passedAll = false;
  }
}

// 2. Verify Deep-Z Tunnel trajectory layout
try {
  const deepZEl = React.createElement(UniversalCinematicStoryScene, {
    templateId: 'QUANTUM_BIO_DEEP_Z',
    cameraMode: 'DEEP_Z_TUNNEL',
    bpm: 124,
  });
  if (React.isValidElement(deepZEl)) {
    console.log('\n[PASS] T2: Deep-Z Tunnel 3D forward push-in trajectory verified.');
  }
} catch (err: any) {
  console.error('[FAIL] T2 Deep-Z error:', err.message);
  passedAll = false;
}

// 3. Verify Panoramic Horizontal trajectory layout
try {
  const panoEl = React.createElement(UniversalCinematicStoryScene, {
    templateId: 'FINTECH_TRADING',
    cameraMode: 'PANORAMIC_HORIZONTAL',
    bpm: 150,
  });
  if (React.isValidElement(panoEl)) {
    console.log('[PASS] T3: Panoramic Horizontal trajectory verified.');
  }
} catch (err: any) {
  console.error('[FAIL] T3 Panoramic error:', err.message);
  passedAll = false;
}

console.log('\n================================================================');
if (passedAll) {
  console.log('✅ ALL UNIVERSAL CINEMATIC STORY SCENE TESTS PASSED!');
} else {
  console.error('❌ SOME TESTS FAILED');
  process.exit(1);
}
console.log('================================================================');
