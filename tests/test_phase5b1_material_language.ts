/**
 * ============================================================================
 * PHASE 5B.1 TEST SUITE: MATERIAL LANGUAGE & RESPONSE CONTRACT
 * ============================================================================
 * 
 * Verifies:
 *   Positive Tests:
 *     - P1: Black Hole (CELESTIAL / Emissive Accretion / Relativistic)
 *     - P2: Medical Cell (ORGANIC / Soft Body / Viscoelastic Membrane)
 *     - P3: Product / Tech (METAL / Rigid Specular / Anisotropic Alloy)
 *   Negative Tests:
 *     - N1: Missing Hero Material -> V_M1_MISSING_HERO_MATERIAL / MATERIAL_REQUIRED
 *     - N2: Vague Material "premium" -> MATERIAL_DIRECTION_AMBIGUOUS
 *     - N3: Unknown Material Category -> V_M2_INVALID_MATERIAL_CATEGORY
 *     - N4: Unresolved Material ID Reference -> V_M7_UNRESOLVED_MATERIAL_REFERENCE
 *     - N5: Motion Response references invalid MotionVerb -> V_M4_INVALID_MOTION_VERB
 *     - N6: Material has empty / meaningless motion responses -> V_M5_EMPTY_MOTION_RESPONSE
 *     - N7: Duplicate Material ID -> V_M6_DUPLICATE_MATERIAL_ID
 *     - N8: Material / Response Contradiction (METAL + FLUID deform) -> V_M9_MATERIAL_CONTRADICTION
 *     - N9: Decorative-Only Material ("glowy") -> V_M8_DECORATIVE_ONLY_MATERIAL
 *     - N10: Cinematic compilation blocked without valid material -> MATERIAL_REQUIRED
 *   Fresh-Agent Tests:
 *     - Full Natural-Language Planning for Living Cancer Cell
 *     - Vague Buzzword Rejection ("premium and cinematic")
 * ============================================================================
 */

import {
  VisualWorld,
  VisualWorldPlanner,
  VisualWorldValidator,
  MaterialPlanner,
  MaterialValidator,
  MaterialAmbiguityGate,
  MaterialDirectionAmbiguityError,
  MaterialReference,
} from '../src/motion/visual_world';
import {
  MotionPlanner,
} from '../src/motion/compiler/motionPlanningInterface';
import {
  MotionGraphCompiler,
} from '../src/motion/compiler/motionGraphCompiler';

export function runPhase5B1MaterialSuite() {
  console.log('================================================================');
  console.log('RUNNING PHASE 5B.1 MATERIAL LANGUAGE & RESPONSE CONTRACT SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // PART 1: POSITIVE TESTS (P1 - P3)
  // --------------------------------------------------------------------------
  console.log('--- PART 1: POSITIVE MATERIAL ARCHETYPES ---');

  // P1: Celestial / Black Hole
  const blackHoleWorld = VisualWorldPlanner.buildBlackHoleWorld('Supermassive singularity');
  const matReportP1 = MaterialValidator.validate(blackHoleWorld);
  const heroMatP1 = blackHoleWorld.materials?.find((m) => m.id === blackHoleWorld.hero.materialId);
  const passP1 =
    matReportP1.passed &&
    heroMatP1 !== undefined &&
    heroMatP1.category === 'CELESTIAL' &&
    heroMatP1.emission === 'HIGHLY_EMISSIVE' &&
    heroMatP1.motionResponses['EXPAND'] !== undefined;
  console.log(`[Positive P1 - Black Hole CELESTIAL Material]: ${passP1 ? 'PASS' : 'FAIL'}`);
  if (!passP1) {
    console.error('Violations P1:', matReportP1.violations);
    allPassed = false;
  }

  // P2: Medical Cell / ORGANIC
  const cellWorld = VisualWorldPlanner.buildCellularWorld('Mitotic cancer cell');
  const matReportP2 = MaterialValidator.validate(cellWorld);
  const heroMatP2 = cellWorld.materials?.find((m) => m.id === cellWorld.hero.materialId);
  const passP2 =
    matReportP2.passed &&
    heroMatP2 !== undefined &&
    heroMatP2.category === 'ORGANIC' &&
    heroMatP2.deformationResponse === 'SOFT_BODY' &&
    heroMatP2.motionResponses['SPLIT'] !== undefined;
  console.log(`[Positive P2 - Medical Cell ORGANIC Material]: ${passP2 ? 'PASS' : 'FAIL'}`);
  if (!passP2) {
    console.error('Violations P2:', matReportP2.violations);
    allPassed = false;
  }

  // P3: Product / Tech / METAL
  const techWorld = VisualWorldPlanner.buildTechnologyWorld('Precision hardware core');
  const matReportP3 = MaterialValidator.validate(techWorld);
  const heroMatP3 = techWorld.materials?.find((m) => m.id === techWorld.hero.materialId);
  const passP3 =
    matReportP3.passed &&
    heroMatP3 !== undefined &&
    heroMatP3.category === 'METAL' &&
    heroMatP3.deformationResponse === 'RIGID' &&
    heroMatP3.lightResponse === 'SPECULAR' &&
    heroMatP3.motionResponses['TRAVEL'] !== undefined;
  console.log(`[Positive P3 - Product / Tech METAL Material]: ${passP3 ? 'PASS' : 'FAIL'}`);
  if (!passP3) {
    console.error('Violations P3:', matReportP3.violations);
    allPassed = false;
  }

  // --------------------------------------------------------------------------
  // PART 2: NEGATIVE TESTS (N1 - N10)
  // --------------------------------------------------------------------------
  console.log('\n--- PART 2: NEGATIVE TESTS & MATERIAL GOVERNANCE GATES ---');

  // N1: Missing Hero Material
  const worldN1: VisualWorld = {
    ...blackHoleWorld,
    hero: { ...blackHoleWorld.hero, materialId: undefined },
  };
  const reportN1 = MaterialValidator.validate(worldN1);
  const passN1 = !reportN1.passed && reportN1.violations.some((v) => v.code === 'V_M1_MISSING_HERO_MATERIAL');
  console.log(`[Negative N1 - Missing Hero Material]: ${passN1 ? 'PASS (Detected V_M1_MISSING_HERO_MATERIAL)' : 'FAIL'}`);
  if (!passN1) allPassed = false;

  // N2: Vague Material "premium"
  let passN2 = false;
  try {
    MaterialAmbiguityGate.validateNaturalIntent('premium material');
  } catch (err: any) {
    passN2 = err.code === 'MATERIAL_DIRECTION_AMBIGUOUS';
  }
  console.log(`[Negative N2 - Vague Buzzword "premium"]: ${passN2 ? 'PASS (Rejected with MATERIAL_DIRECTION_AMBIGUOUS)' : 'FAIL'}`);
  if (!passN2) allPassed = false;

  // N3: Unknown Material Category
  const invalidMatN3: any = {
    ...heroMatP3,
    category: 'UNOBTANIUM_CRYSTALLINE_UNKNOWN',
  };
  const worldN3: VisualWorld = {
    ...techWorld,
    materials: [invalidMatN3],
  };
  const reportN3 = MaterialValidator.validate(worldN3);
  const passN3 = !reportN3.passed && reportN3.violations.some((v) => v.code === 'V_M2_INVALID_MATERIAL_CATEGORY');
  console.log(`[Negative N3 - Unknown Material Category]: ${passN3 ? 'PASS (Detected V_M2_INVALID_MATERIAL_CATEGORY)' : 'FAIL'}`);
  if (!passN3) allPassed = false;

  // N4: Hero references nonexistent material ID
  const worldN4: VisualWorld = {
    ...techWorld,
    hero: { ...techWorld.hero, materialId: 'non_existent_mat_999' },
  };
  const reportN4 = MaterialValidator.validate(worldN4);
  const passN4 = !reportN4.passed && reportN4.violations.some((v) => v.code === 'V_M7_UNRESOLVED_MATERIAL_REFERENCE');
  console.log(`[Negative N4 - Unresolved Material Reference]: ${passN4 ? 'PASS (Detected V_M7_UNRESOLVED_MATERIAL_REFERENCE)' : 'FAIL'}`);
  if (!passN4) allPassed = false;

  // N5: Motion response references invalid MotionVerb
  const invalidMatN5: MaterialReference = {
    ...heroMatP3!,
    motionResponses: {
      'TELEPORT_WARP': { verb: 'TELEPORT_WARP' as any, description: 'Illegal verb response' },
    },
  };
  const worldN5: VisualWorld = {
    ...techWorld,
    materials: [invalidMatN5],
  };
  const reportN5 = MaterialValidator.validate(worldN5);
  const passN5 = !reportN5.passed && reportN5.violations.some((v) => v.code === 'V_M4_INVALID_MOTION_VERB');
  console.log(`[Negative N5 - Invalid Motion Verb in Response]: ${passN5 ? 'PASS (Detected V_M4_INVALID_MOTION_VERB)' : 'FAIL'}`);
  if (!passN5) allPassed = false;

  // N6: Material has empty motion responses
  const invalidMatN6: MaterialReference = {
    ...heroMatP3!,
    motionResponses: {},
  };
  const worldN6: VisualWorld = {
    ...techWorld,
    materials: [invalidMatN6],
  };
  const reportN6 = MaterialValidator.validate(worldN6);
  const passN6 = !reportN6.passed && reportN6.violations.some((v) => v.code === 'V_M5_EMPTY_MOTION_RESPONSE');
  console.log(`[Negative N6 - Empty Motion Responses]: ${passN6 ? 'PASS (Detected V_M5_EMPTY_MOTION_RESPONSE)' : 'FAIL'}`);
  if (!passN6) allPassed = false;

  // N7: Duplicate Material ID
  const duplicateMat = { ...heroMatP3!, name: 'Duplicate 2' };
  const worldN7: VisualWorld = {
    ...techWorld,
    materials: [heroMatP3!, duplicateMat],
  };
  const reportN7 = MaterialValidator.validate(worldN7);
  const passN7 = !reportN7.passed && reportN7.violations.some((v) => v.code === 'V_M6_DUPLICATE_MATERIAL_ID');
  console.log(`[Negative N7 - Duplicate Material ID]: ${passN7 ? 'PASS (Detected V_M6_DUPLICATE_MATERIAL_ID)' : 'FAIL'}`);
  if (!passN7) allPassed = false;

  // N8: Material Contradiction (METAL + FLUID deformation)
  const contradictoryMatN8: MaterialReference = {
    ...heroMatP3!,
    category: 'METAL',
    deformationResponse: 'FLUID', // Physical impossibility for rigid metal
  };
  const worldN8: VisualWorld = {
    ...techWorld,
    materials: [contradictoryMatN8],
  };
  const reportN8 = MaterialValidator.validate(worldN8);
  const passN8 = !reportN8.passed && reportN8.violations.some((v) => v.code === 'V_M9_MATERIAL_CONTRADICTION');
  console.log(`[Negative N8 - Material Contradiction (METAL + FLUID)]: ${passN8 ? 'PASS (Detected V_M9_MATERIAL_CONTRADICTION)' : 'FAIL'}`);
  if (!passN8) allPassed = false;

  // N9: Decorative-Only Material ("glowy")
  const decorativeMatN9: MaterialReference = {
    ...heroMatP3!,
    name: 'glowy',
  };
  const worldN9: VisualWorld = {
    ...techWorld,
    materials: [decorativeMatN9],
  };
  const reportN9 = MaterialValidator.validate(worldN9);
  const passN9 = !reportN9.passed && reportN9.violations.some((v) => v.code === 'MATERIAL_DIRECTION_AMBIGUOUS' || v.code === 'V_M8_DECORATIVE_ONLY_MATERIAL');
  console.log(`[Negative N9 - Decorative-Only Material]: ${passN9 ? 'PASS (Detected V_M8_DECORATIVE_ONLY_MATERIAL / AMBIGUITY)' : 'FAIL'}`);
  if (!passN9) allPassed = false;

  // N10: Cinematic compilation blocked without valid hero material
  let passN10 = false;
  try {
    const graphWithoutMat = MotionPlanner.planCinematicSceneFromNaturalLanguage(
      'Central singularity accumulates energy and expands radially outwards',
      worldN1 // worldN1 lacks hero material
    );
    MotionGraphCompiler.compileCinematicGraph(graphWithoutMat);
  } catch (err: any) {
    passN10 = err.code === 'MATERIAL_REQUIRED' || err.code === 'MATERIAL_INVALID';
  }
  console.log(`[Negative N10 - Cinematic Compilation Blocked without Material]: ${passN10 ? 'PASS (Rejected with MATERIAL_REQUIRED)' : 'FAIL'}`);
  if (!passN10) allPassed = false;

  // --------------------------------------------------------------------------
  // PART 3: FRESH-AGENT NATURAL-LANGUAGE PLANNING TESTS
  // --------------------------------------------------------------------------
  console.log('\n--- PART 3: FRESH-AGENT NATURAL-LANGUAGE PLANNING ---');

  // Test 1: Grounded Medical Intent
  const complexMedicalIntent =
    'Create a cinematic medical scene where a living cancer cell expands under internal pressure, deforms, splits, and the resulting fragments travel outward. The cell is an organic membrane-like biological object. Its material should visibly behave like soft organic tissue: compression should deform the membrane, rapid movement should stretch the silhouette, and the membrane should retain a soft translucent character.';

  try {
    const plannedWorld = VisualWorldPlanner.planFromNaturalIntent(complexMedicalIntent);
    const plannedGraph = MotionPlanner.planCinematicSceneFromNaturalLanguage(
      complexMedicalIntent,
      plannedWorld
    );
    const compiled = MotionGraphCompiler.compileCinematicGraph(plannedGraph);

    const heroMaterial = plannedWorld.materials?.find((m) => m.id === plannedWorld.hero.materialId);
    const passFresh1 =
      compiled.contracts.length > 0 &&
      heroMaterial !== undefined &&
      heroMaterial.category === 'ORGANIC' &&
      heroMaterial.deformationResponse === 'SOFT_BODY' &&
      heroMaterial.motionResponses['SPLIT'] !== undefined;

    console.log(`[Fresh-Agent Test 1 - Grounded Medical Cell Intent]: ${passFresh1 ? 'PASS' : 'FAIL'}`);
    console.log(`  - Material Category: ${heroMaterial?.category}`);
    console.log(`  - Deformation Response: ${heroMaterial?.deformationResponse}`);
    console.log(`  - Motion Response Verbs: ${Object.keys(heroMaterial?.motionResponses || {}).join(', ')}`);
    console.log(`  - Compiled Contracts: ${compiled.contracts.length}`);

    if (!passFresh1) allPassed = false;
  } catch (err: any) {
    console.error(`FAIL in Fresh-Agent Test 1: ${err.message}`);
    allPassed = false;
  }

  // Test 2: Ungrounded Buzzword Rejection ("Make the object look premium and cinematic")
  let passFresh2 = false;
  try {
    VisualWorldPlanner.planFromNaturalIntent('Make the object look premium and cinematic');
  } catch (err: any) {
    passFresh2 = err.code === 'VISUAL_DIRECTION_AMBIGUOUS' || err.code === 'MATERIAL_DIRECTION_AMBIGUOUS';
  }
  console.log(`[Fresh-Agent Test 2 - Buzzword Rejection ("premium and cinematic")]: ${passFresh2 ? 'PASS (Refused to guess material)' : 'FAIL'}`);
  if (!passFresh2) allPassed = false;

  console.log('\n================================================================');
  if (allPassed) {
    console.log('PHASE 5B.1 MATERIAL SUITE: ALL TESTS PASSED SUCCESSFULLY (100%)');
  } else {
    console.error('PHASE 5B.1 MATERIAL SUITE: ONE OR MORE TESTS FAILED');
    process.exit(1);
  }
  console.log('================================================================');
}

if (require.main === module) {
  runPhase5B1MaterialSuite();
}
