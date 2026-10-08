/**
 * ============================================================================
 * PHASE 5A TEST SUITE: VISUAL WORLD SCHEMA & ART DIRECTION CONTRACT
 * ============================================================================
 * 
 * Verifies:
 *   Positive Tests:
 *     - Test A: Black Hole (Astrophysics / Deep Volumetric)
 *     - Test B: Medical Cell (Biomedical / Layered 2.5D)
 *     - Test C: Product / Technology (Industrial / Isometric)
 *   Negative Tests:
 *     - N1: No Hero Exists -> V1_MISSING_HERO_ENTITY
 *     - N2: Pure Buzzword "cinematic" -> VISUAL_DIRECTION_AMBIGUOUS
 *     - N3: Environment Priority Inversion / Excessive Clutter -> V3/V7
 *     - N4: MotionSceneGraph Hero Mismatch -> V8_HERO_MISMATCH
 *     - N5: Flat Depth Collapse -> V4_FLAT_DEPTH_COLLAPSE
 *     - N6: Masked Hero (Environment element posing as hero) -> V2_INVALID_HERO_IDENTITY
 *     - N7: Missing / Empty Composition Contract -> V5_MISSING_COMPOSITION_CONTRACT
 *   Integration Test:
 *     - Natural Intent -> VisualWorldPlanner -> MotionPlanner -> MotionSceneGraph -> MotionGraphCompiler
 * ============================================================================
 */

import {
  VisualWorld,
  VisualWorldPlanner,
  VisualWorldValidator,
  ArtDirectionAmbiguityGate,
  VisualDirectionAmbiguityError,
} from '../src/motion/visual_world';
import { MotionPlanner } from '../src/motion/compiler/motionPlanningInterface';
import { MotionGraphCompiler } from '../src/motion/compiler/motionGraphCompiler';

export function runPhase5ASuite() {
  console.log('================================================================');
  console.log('RUNNING PHASE 5A VISUAL WORLD & ART DIRECTION TEST SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // PART 1: POSITIVE TESTS
  // --------------------------------------------------------------------------
  console.log('--- PART 1: POSITIVE TEST FIXTURES ---');

  // Test A: Black Hole
  const blackHoleWorld = VisualWorldPlanner.planFromNaturalIntent(
    'A supermassive black hole with relativistic accretion disk, bipolar plasma jets, and gravitationally lensed stars.'
  );
  const reportA = VisualWorldValidator.validate(blackHoleWorld);
  const passA = reportA.passed && reportA.violations.length === 0 && reportA.heroResolved;
  console.log(`[Positive Test A - Black Hole]: ${passA ? 'PASS' : 'FAIL'}`);
  if (!passA) {
    console.error('Violations A:', reportA.violations);
    allPassed = false;
  }

  // Test B: Medical Cell
  const cellWorld = VisualWorldPlanner.planFromNaturalIntent(
    'Cancer cell core with surface glycoproteins targeted by synthetic drug nanoparticles in turbid extracellular medium.'
  );
  const reportB = VisualWorldValidator.validate(cellWorld);
  const passB = reportB.passed && reportB.violations.length === 0 && reportB.heroResolved;
  console.log(`[Positive Test B - Medical Cell]: ${passB ? 'PASS' : 'FAIL'}`);
  if (!passB) {
    console.error('Violations B:', reportB.violations);
    allPassed = false;
  }

  // Test C: Product / Technology
  const techWorld = VisualWorldPlanner.planFromNaturalIntent(
    'Precision industrial device chassis surrounded by kinetic interface rings and an architectural spatial coordinate grid.'
  );
  const reportC = VisualWorldValidator.validate(techWorld);
  const passC = reportC.passed && reportC.violations.length === 0 && reportC.heroResolved;
  console.log(`[Positive Test C - Product / Tech]: ${passC ? 'PASS' : 'FAIL'}`);
  if (!passC) {
    console.error('Violations C:', reportC.violations);
    allPassed = false;
  }

  // --------------------------------------------------------------------------
  // PART 2: NEGATIVE TESTS
  // --------------------------------------------------------------------------
  console.log('\n--- PART 2: NEGATIVE TESTS & AMBIGUITY GATES ---');

  // N1: No Hero Exists
  const invalidWorldN1 = { ...blackHoleWorld, hero: undefined as any };
  const reportN1 = VisualWorldValidator.validate(invalidWorldN1);
  const passN1 = !reportN1.passed && reportN1.violations.some((v) => v.code === 'V1_MISSING_HERO_ENTITY');
  console.log(`[Negative Test N1 - Missing Hero]: ${passN1 ? 'PASS (Detected V1_MISSING_HERO_ENTITY)' : 'FAIL'}`);
  if (!passN1) allPassed = false;

  // N2: Pure Buzzword "make it cinematic"
  let passN2 = false;
  try {
    VisualWorldPlanner.planFromNaturalIntent('make it cinematic');
  } catch (err: any) {
    passN2 = err.code === 'VISUAL_DIRECTION_AMBIGUOUS';
  }
  console.log(`[Negative Test N2 - Vague Buzzword "cinematic"]: ${passN2 ? 'PASS (Rejected with VISUAL_DIRECTION_AMBIGUOUS)' : 'FAIL'}`);
  if (!passN2) allPassed = false;

  // N3: Environment Priority Inversion (Environment priority <= Hero priority)
  const invalidWorldN3: VisualWorld = {
    ...blackHoleWorld,
    environmentEntities: [
      {
        id: 'aggressive_particles',
        label: 'Prominent Space Dust',
        semanticRole: 'ENVIRONMENT',
        visualRole: 'Unmotivated foreground particles',
        importance: 'ENVIRONMENT',
        persistence: false,
        depthLayer: 'FOREGROUND',
        scaleClass: 'ENVIRONMENTAL',
        visualPriority: 1, // Violates priority: equals hero priority (1)
        semanticPurpose: 'Dust',
      },
    ],
  };
  const reportN3 = VisualWorldValidator.validate(invalidWorldN3);
  const passN3 = !reportN3.passed && reportN3.violations.some((v) => v.code === 'V3_ENVIRONMENT_PRIORITY_INVERSION');
  console.log(`[Negative Test N3 - Priority Inversion]: ${passN3 ? 'PASS (Detected V3_ENVIRONMENT_PRIORITY_INVERSION)' : 'FAIL'}`);
  if (!passN3) allPassed = false;

  // N4: Hero Mismatch between MotionSceneGraph and VisualWorld
  const motionGraphN4 = MotionPlanner.planFromNaturalIntent(
    'A central glowing core expands radially outward from center.',
    { visualWorld: blackHoleWorld }
  );
  // Intentionally tamper with motion graph hero to mismatch visual world hero
  const tamperedGraphN4 = {
    ...motionGraphN4,
    entities: motionGraphN4.entities.map((e) => (e.role === 'HERO' ? { ...e, id: 'completely_different_hero' } : e)),
  };
  const reportN4 = VisualWorldValidator.validate(blackHoleWorld, tamperedGraphN4);
  const passN4 = !reportN4.passed && reportN4.violations.some((v) => v.code === 'V8_HERO_MISMATCH');
  console.log(`[Negative Test N4 - Hero Mismatch]: ${passN4 ? 'PASS (Detected V8_HERO_MISMATCH)' : 'FAIL'}`);
  if (!passN4) allPassed = false;

  // N5: Flat Depth Collapse (All entities on HERO_PLANE with isExplicitFlatComposition=false)
  const invalidWorldN5: VisualWorld = {
    ...cellWorld,
    depth: {
      ...cellWorld.depth,
      isExplicitFlatComposition: false,
    },
    hero: { ...cellWorld.hero, depthLayer: 'HERO_PLANE' },
    secondaryEntities: cellWorld.secondaryEntities.map((e) => ({ ...e, depthLayer: 'HERO_PLANE' })),
    tertiaryEntities: cellWorld.tertiaryEntities.map((e) => ({ ...e, depthLayer: 'HERO_PLANE' })),
    environmentEntities: cellWorld.environmentEntities.map((e) => ({ ...e, depthLayer: 'HERO_PLANE' })),
  };
  const reportN5 = VisualWorldValidator.validate(invalidWorldN5);
  const passN5 = !reportN5.passed && reportN5.violations.some((v) => v.code === 'V4_FLAT_DEPTH_COLLAPSE');
  console.log(`[Negative Test N5 - Flat Depth Collapse]: ${passN5 ? 'PASS (Detected V4_FLAT_DEPTH_COLLAPSE)' : 'FAIL'}`);
  if (!passN5) allPassed = false;

  // N6: Masked Hero (Hero configured as ENVIRONMENT)
  const invalidWorldN6: VisualWorld = {
    ...blackHoleWorld,
    hero: {
      ...blackHoleWorld.hero,
      semanticRole: 'ENVIRONMENT',
      importance: 'ENVIRONMENT',
    },
  };
  const reportN6 = VisualWorldValidator.validate(invalidWorldN6);
  const passN6 = !reportN6.passed && reportN6.violations.some((v) => v.code === 'V2_INVALID_HERO_IDENTITY');
  console.log(`[Negative Test N6 - Masked Hero Entity]: ${passN6 ? 'PASS (Detected V2_INVALID_HERO_IDENTITY)' : 'FAIL'}`);
  if (!passN6) allPassed = false;

  // N7: Missing / Empty Composition Contract
  const invalidWorldN7: VisualWorld = {
    ...blackHoleWorld,
    composition: {
      ...blackHoleWorld.composition,
      compositionIntent: '',
    },
  };
  const reportN7 = VisualWorldValidator.validate(invalidWorldN7);
  const passN7 = !reportN7.passed && reportN7.violations.some((v) => v.code === 'V5_EMPTY_COMPOSITION_INTENT');
  console.log(`[Negative Test N7 - Empty Composition Intent]: ${passN7 ? 'PASS (Detected V5_EMPTY_COMPOSITION_INTENT)' : 'FAIL'}`);
  if (!passN7) allPassed = false;

  // --------------------------------------------------------------------------
  // PART 3: INTEGRATION TEST
  // --------------------------------------------------------------------------
  console.log('\n--- PART 3: FULL PIPELINE INTEGRATION TEST ---');
  console.log('Testing: Natural Intent -> VisualWorldPlanner -> MotionPlanner -> MotionSceneGraph -> MotionGraphCompiler');

  const intent = 'Black hole singularity core accumulates mass, expands volumetric event horizon, splits into binary companion cores, and travels apart.';
  
  // 1. Plan Visual World
  const plannedWorld = VisualWorldPlanner.planFromNaturalIntent(intent);
  const worldValidation = VisualWorldValidator.validate(plannedWorld);
  if (!worldValidation.passed) {
    console.error('Visual world planning failed:', worldValidation.violations);
    allPassed = false;
  }

  // 2. Plan Motion with bound Visual World
  const motionGraph = MotionPlanner.planFromNaturalIntent(intent, {
    visualWorld: plannedWorld,
    totalDurationFrames: 600,
  });

  // Verify VisualWorld is attached and matches Hero
  const passIntegrationWorldAttachment = motionGraph.visualWorld !== undefined && motionGraph.visualWorld.hero.id === plannedWorld.hero.id;
  const passHeroRoleMatch = motionGraph.entities.some((e) => e.id === plannedWorld.hero.id && e.role === 'HERO');

  // 3. Compile Graph to Executable Contracts
  const compiled = MotionGraphCompiler.compileGraph(motionGraph);
  const passCompiledContracts = compiled.contracts.length > 0;

  const passIntegration =
    worldValidation.passed &&
    passIntegrationWorldAttachment &&
    passHeroRoleMatch &&
    passCompiledContracts;

  console.log(`[Integration Test - Full Pipeline]: ${passIntegration ? 'PASS' : 'FAIL'}`);
  console.log(`  - Visual World Valid: ${worldValidation.passed}`);
  console.log(`  - Visual World Attached to Motion Graph: ${passIntegrationWorldAttachment}`);
  console.log(`  - Hero Identity Bound (${plannedWorld.hero.id}): ${passHeroRoleMatch}`);
  console.log(`  - Motion Contracts Compiled (${compiled.contracts.length} contracts): ${passCompiledContracts}`);

  if (!passIntegration) allPassed = false;

  console.log('\n================================================================');
  if (allPassed) {
    console.log('PHASE 5A TEST SUITE: ALL TESTS PASSED SUCCESSFULLY (100%)');
  } else {
    console.error('PHASE 5A TEST SUITE: FAILURES ENCOUNTERED');
    process.exit(1);
  }
  console.log('================================================================');
}

if (require.main === module) {
  runPhase5ASuite();
}
