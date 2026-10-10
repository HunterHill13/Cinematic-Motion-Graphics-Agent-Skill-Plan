/**
 * ============================================================================
 * PHASE 5B.2 TEST SUITE: LIGHTING RESPONSE & CINEMATIC LIGHT LANGUAGE
 * ============================================================================
 * 
 * Verifies:
 *   Positive Archetypes:
 *     - P1: Black Hole (CELESTIAL / Relativistic Rim / Emissive Accretion)
 *     - P2: Medical Cell (ORGANIC / Soft Diffuse / Subsurface Glow)
 *     - P3: Metal Product (METAL / Specular Key / Moving Highlight / Razor Rim)
 *     - P4: Emissive Plasma (PLASMA / Volumetric Local Emitter / Photonic Wake)
 *   Negative Governance:
 *     - N1: Missing lighting contract -> LIGHTING_REQUIRED
 *     - N2: Vague "cinematic lighting" -> LIGHTING_DIRECTION_AMBIGUOUS
 *     - N3: Unknown light type -> V_L3_INVALID_LIGHT_TYPE
 *     - N4: Invalid light direction -> V_L4_INVALID_DIRECTION
 *     - N5: Invalid intensity value -> V_L5_INVALID_INTENSITY
 *     - N6: References nonexistent material -> V_L7_UNRESOLVED_MATERIAL_REF
 *     - N7: Hero has material but no lighting interaction -> V_L2_MISSING_HERO_LIGHTING
 *     - N8: Duplicate light source ID -> V_L3_DUPLICATE_LIGHT_ID
 *     - N9: Decorative glow pretending to be lighting -> V_L10_DECORATIVE_ONLY_LIGHTING
 *     - N10: Motion response references invalid MotionVerb -> V_L9_INVALID_MOTION_VERB
 *     - N11: Obvious material/light contradiction -> V_L11_MATERIAL_LIGHT_CONTRADICTION
 *     - N12: Cinematic compilation without lighting -> blocked with LIGHTING_REQUIRED
 *     - N13: Cinematic compilation with ambiguous lighting -> blocked with LIGHTING_DIRECTION_AMBIGUOUS
 *     - N14: Explicit FLAT_GRAPHIC scene without lighting -> PASS
 *   Fresh-Agent Natural-Language Tests:
 *     - Precision Metallic Product shot with upper-left cool key, soft fill, and rim
 *     - Vague Buzzword Rejection ("Make the scene look cinematic and premium")
 * ============================================================================
 */

import {
  VisualWorld,
  VisualWorldPlanner,
  VisualWorldValidator,
  MaterialPlanner,
  MaterialValidator,
  LightingPlanner,
  LightingValidator,
  LightingAmbiguityGate,
  LightingDirectionAmbiguityError,
  LightingContract,
} from '../src/motion/visual_world';
import {
  MotionPlanner,
} from '../src/motion/compiler/motionPlanningInterface';
import {
  MotionGraphCompiler,
} from '../src/motion/compiler/motionGraphCompiler';

export function runPhase5B2LightingSuite(): boolean {
  console.log('================================================================');
  console.log('RUNNING PHASE 5B.2 LIGHTING RESPONSE & LIGHT LANGUAGE SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // PART 1: POSITIVE TESTS (P1 - P4)
  // --------------------------------------------------------------------------
  console.log('--- PART 1: POSITIVE LIGHTING ARCHETYPES ---');

  // P1: Celestial / Black Hole
  const blackHoleWorld = VisualWorldPlanner.buildBlackHoleWorld('Supermassive singularity');
  const lightReportP1 = LightingValidator.validate(blackHoleWorld);
  const heroInteractionP1 = blackHoleWorld.lighting?.materialInteractions.find(
    (i) => i.entityId === blackHoleWorld.hero.id
  );
  const passP1 =
    lightReportP1.passed &&
    blackHoleWorld.lighting !== undefined &&
    blackHoleWorld.lighting.sources.some((s) => s.type === 'RIM') &&
    blackHoleWorld.lighting.sources.some((s) => s.type === 'EMISSIVE') &&
    heroInteractionP1?.rimCharacter === 'RAZOR_RIM';
  console.log(`[Positive P1 - Black Hole CELESTIAL Lighting]: ${passP1 ? 'PASS' : 'FAIL'}`);
  if (!passP1) {
    console.error('Violations P1:', lightReportP1.violations);
    allPassed = false;
  }

  // P2: Medical Cell / ORGANIC
  const cellWorld = VisualWorldPlanner.buildCellularWorld('Mitotic cancer cell');
  const lightReportP2 = LightingValidator.validate(cellWorld);
  const heroInteractionP2 = cellWorld.lighting?.materialInteractions.find(
    (i) => i.entityId === cellWorld.hero.id
  );
  const passP2 =
    lightReportP2.passed &&
    cellWorld.lighting !== undefined &&
    heroInteractionP2?.highlightCharacter === 'SOFT_DIFFUSE' &&
    heroInteractionP2?.rimCharacter === 'SUBSURFACE_GLOW';
  console.log(`[Positive P2 - Medical Cell ORGANIC Lighting]: ${passP2 ? 'PASS' : 'FAIL'}`);
  if (!passP2) {
    console.error('Violations P2:', lightReportP2.violations);
    allPassed = false;
  }

  // P3: Metal Product / METAL
  const techWorld = VisualWorldPlanner.buildTechnologyWorld('Precision hardware core');
  const lightReportP3 = LightingValidator.validate(techWorld);
  const heroInteractionP3 = techWorld.lighting?.materialInteractions.find(
    (i) => i.entityId === techWorld.hero.id
  );
  const passP3 =
    lightReportP3.passed &&
    techWorld.lighting !== undefined &&
    heroInteractionP3?.highlightCharacter === 'SHARP_SPECULAR' &&
    heroInteractionP3?.shadowCharacter === 'HARD_TERMINATOR' &&
    techWorld.lighting.sources.some((s) => s.type === 'KEY' && s.direction.semantic === 'UPPER_LEFT');
  console.log(`[Positive P3 - Product / Tech METAL Lighting]: ${passP3 ? 'PASS' : 'FAIL'}`);
  if (!passP3) {
    console.error('Violations P3:', lightReportP3.violations);
    allPassed = false;
  }

  // P4: Emissive Plasma / PLASMA
  const plasmaLighting = LightingPlanner.createPlasmaLighting(
    'lighting_plasma_test',
    'plasma_hero',
    'mat_plasma_core'
  );
  const plasmaWorld: VisualWorld = {
    ...VisualWorldPlanner.buildGenericGroundedWorld('Ionized plasma core discharge'),
    worldId: 'world_plasma_test',
    hero: {
      id: 'plasma_hero',
      label: 'Ionized Plasma Core',
      semanticRole: 'HERO',
      visualRole: 'Self-luminous high energy discharge',
      importance: 'PRIMARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'HERO_MONUMENTAL',
      visualPriority: 1,
      semanticPurpose: 'Primary emitter of energy',
      materialId: 'mat_plasma_core',
    },
    materials: [
      MaterialPlanner.createPlasmaMaterial('mat_plasma_core', 'High Energy Plasma Stream'),
    ],
    lighting: plasmaLighting,
  };
  const lightReportP4 = LightingValidator.validate(plasmaWorld);
  const passP4 =
    lightReportP4.passed &&
    plasmaWorld.lighting?.sources.some((s) => s.type === 'EMISSIVE' && s.emissiveSourceEntityId === 'plasma_hero') === true;
  console.log(`[Positive P4 - Emissive Plasma Local Illuminator]: ${passP4 ? 'PASS' : 'FAIL'}`);
  if (!passP4) {
    console.error('Violations P4:', lightReportP4.violations);
    allPassed = false;
  }

  // --------------------------------------------------------------------------
  // PART 2: NEGATIVE TESTS (N1 - N14)
  // --------------------------------------------------------------------------
  console.log('\n--- PART 2: NEGATIVE GOVERNANCE TESTS ---');

  // N1: Missing lighting contract
  const worldWithoutLighting = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  delete (worldWithoutLighting as any).lighting;
  const repN1 = LightingValidator.validate(worldWithoutLighting);
  const passN1 = !repN1.passed && repN1.violations.some((v) => v.code === 'V_L1_MISSING_LIGHTING');
  console.log(`[Negative N1 - Missing Lighting Contract]: ${passN1 ? 'PASS' : 'FAIL'}`);
  if (!passN1) allPassed = false;

  // N2: Vague "cinematic lighting"
  let passN2 = false;
  try {
    LightingAmbiguityGate.validateNaturalIntent('The scene uses cinematic lighting and beautiful shadows');
  } catch (err: any) {
    passN2 = err.code === 'LIGHTING_DIRECTION_AMBIGUOUS' || err instanceof LightingDirectionAmbiguityError;
  }
  console.log(`[Negative N2 - Vague "cinematic lighting" Rejection]: ${passN2 ? 'PASS' : 'FAIL'}`);
  if (!passN2) allPassed = false;

  // N3: Unknown light type
  const worldInvalidLightType = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  (worldInvalidLightType.lighting!.sources[0] as any).type = 'MAGICAL_RAY';
  const repN3 = LightingValidator.validate(worldInvalidLightType);
  const passN3 = !repN3.passed && repN3.violations.some((v) => v.code === 'V_L3_INVALID_LIGHT_TYPE');
  console.log(`[Negative N3 - Unknown Light Type Rejection]: ${passN3 ? 'PASS' : 'FAIL'}`);
  if (!passN3) allPassed = false;

  // N4: Invalid light direction
  const worldInvalidDirection = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  (worldInvalidDirection.lighting!.sources[0].direction as any).semantic = 'FOURTH_DIMENSION';
  const repN4 = LightingValidator.validate(worldInvalidDirection);
  const passN4 = !repN4.passed && repN4.violations.some((v) => v.code === 'V_L4_INVALID_DIRECTION');
  console.log(`[Negative N4 - Invalid Light Direction Rejection]: ${passN4 ? 'PASS' : 'FAIL'}`);
  if (!passN4) allPassed = false;

  // N5: Invalid intensity
  const worldInvalidIntensity = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  worldInvalidIntensity.lighting!.sources[0].intensity.value = 99.9; // Exceeds 2.5
  const repN5 = LightingValidator.validate(worldInvalidIntensity);
  const passN5 = !repN5.passed && repN5.violations.some((v) => v.code === 'V_L5_INVALID_INTENSITY');
  console.log(`[Negative N5 - Invalid Intensity Value Rejection]: ${passN5 ? 'PASS' : 'FAIL'}`);
  if (!passN5) allPassed = false;

  // N6: References nonexistent material
  const worldUnresolvedMat = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  worldUnresolvedMat.lighting!.materialInteractions[0].materialId = 'mat_nonexistent_ghost';
  const repN6 = LightingValidator.validate(worldUnresolvedMat);
  const passN6 = !repN6.passed && repN6.violations.some((v) => v.code === 'V_L7_UNRESOLVED_MATERIAL_REF');
  console.log(`[Negative N6 - Unresolved Material Reference Rejection]: ${passN6 ? 'PASS' : 'FAIL'}`);
  if (!passN6) allPassed = false;

  // N7: Hero has material but no meaningful lighting interaction
  const worldNoHeroLighting = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  worldNoHeroLighting.lighting!.materialInteractions = []; // Wipe interactions
  const repN7 = LightingValidator.validate(worldNoHeroLighting);
  const passN7 = !repN7.passed && repN7.violations.some((v) => v.code === 'V_L2_MISSING_HERO_LIGHTING');
  console.log(`[Negative N7 - Hero Missing Lighting Interaction]: ${passN7 ? 'PASS' : 'FAIL'}`);
  if (!passN7) allPassed = false;

  // N8: Duplicate light source IDs
  const worldDuplicateLightId = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  worldDuplicateLightId.lighting!.sources.push({
    ...worldDuplicateLightId.lighting!.sources[0],
  });
  const repN8 = LightingValidator.validate(worldDuplicateLightId);
  const passN8 = !repN8.passed && repN8.violations.some((v) => v.code === 'V_L3_DUPLICATE_LIGHT_ID');
  console.log(`[Negative N8 - Duplicate Light Source ID Rejection]: ${passN8 ? 'PASS' : 'FAIL'}`);
  if (!passN8) allPassed = false;

  // N9: Decorative glow pretending to be lighting
  const worldDecorativeGlow = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  (worldDecorativeGlow.lighting!.sources[0] as any).glow = true;
  const repN9 = LightingValidator.validate(worldDecorativeGlow);
  const passN9 = !repN9.passed && repN9.violations.some((v) => v.code === 'V_L10_DECORATIVE_ONLY_LIGHTING');
  console.log(`[Negative N9 - Decorative Glow Rejection]: ${passN9 ? 'PASS' : 'FAIL'}`);
  if (!passN9) allPassed = false;

  // N10: Motion response references nonexistent MotionVerb
  const worldInvalidMotionVerb = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  (worldInvalidMotionVerb.lighting!.motionResponses[0] as any).verb = 'DANCE_WILDLY';
  const repN10 = LightingValidator.validate(worldInvalidMotionVerb);
  const passN10 = !repN10.passed && repN10.violations.some((v) => v.code === 'V_L9_INVALID_MOTION_VERB');
  console.log(`[Negative N10 - Unknown MotionVerb In Lighting Response]: ${passN10 ? 'PASS' : 'FAIL'}`);
  if (!passN10) allPassed = false;

  // N11: Obvious material/light contradiction (METAL with purely SOFT_DIFFUSE and DIFFUSE_WRAPPING)
  const worldContradiction = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
  worldContradiction.lighting!.materialInteractions[0].highlightCharacter = 'SOFT_DIFFUSE';
  worldContradiction.lighting!.materialInteractions[0].shadowCharacter = 'DIFFUSE_WRAPPING';
  const repN11 = LightingValidator.validate(worldContradiction);
  const passN11 = !repN11.passed && repN11.violations.some((v) => v.code === 'V_L11_MATERIAL_LIGHT_CONTRADICTION');
  console.log(`[Negative N11 - Material / Lighting Contradiction Rejection]: ${passN11 ? 'PASS' : 'FAIL'}`);
  if (!passN11) allPassed = false;

  // N12: Cinematic compilation without lighting blocked with LIGHTING_REQUIRED
  let passN12 = false;
  try {
    const worldWithoutLightForCompile = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
    delete (worldWithoutLightForCompile as any).lighting;
    const graph = MotionPlanner.planCinematicSceneFromNaturalLanguage(
      'Device travels across screen from left to right',
      worldWithoutLightForCompile
    );
    MotionGraphCompiler.compileCinematicGraph(graph);
  } catch (err: any) {
    passN12 = err.code === 'LIGHTING_REQUIRED' || (err as any).violationCode === 'V_L1_MISSING_LIGHTING';
  }
  console.log(`[Negative N12 - compileCinematicGraph Rejects Missing Lighting]: ${passN12 ? 'PASS' : 'FAIL'}`);
  if (!passN12) allPassed = false;

  // N13: Cinematic compilation with ambiguous lighting blocked with LIGHTING_DIRECTION_AMBIGUOUS
  let passN13 = false;
  try {
    const worldAmbiguousLighting = VisualWorldPlanner.buildTechnologyWorld('Hardware chassis');
    (worldAmbiguousLighting.lighting!.sources[0] as any).type = 'DECORATIVE';
    const graph = MotionPlanner.planCinematicSceneFromNaturalLanguage(
      'Device travels across screen from left to right',
      worldAmbiguousLighting
    );
    MotionGraphCompiler.compileCinematicGraph(graph);
  } catch (err: any) {
    passN13 =
      err.code === 'LIGHTING_DIRECTION_AMBIGUOUS' ||
      (err as any).violationCode === 'LIGHTING_DIRECTION_AMBIGUOUS';
  }
  console.log(`[Negative N13 - compileCinematicGraph Rejects Ambiguous Lighting]: ${passN13 ? 'PASS' : 'FAIL'}`);
  if (!passN13) allPassed = false;

  // N14: Explicit FLAT_GRAPHIC scene passes without cinematic lighting
  const flatWorld = VisualWorldPlanner.buildGenericGroundedWorld('Schematic diagram', {
    isExplicitFlatComposition: true,
  });
  delete (flatWorld as any).lighting; // No lighting
  const repN14 = LightingValidator.validate(flatWorld);
  const passN14 = repN14.passed;
  console.log(`[Negative N14 - Explicit FLAT_GRAPHIC Bypasses Cinematic Lighting]: ${passN14 ? 'PASS' : 'FAIL'}`);
  if (!passN14) allPassed = false;

  // --------------------------------------------------------------------------
  // PART 3: FRESH-AGENT NATURAL-LANGUAGE PLANNING
  // --------------------------------------------------------------------------
  console.log('\n--- PART 3: FRESH-AGENT NATURAL-LANGUAGE PLANNING ---');

  const productShotIntent =
    'Create a cinematic product shot of a polished metal device. ' +
    'The device is the persistent hero. ' +
    'Use a strong cool key light from the upper-left, ' +
    'a softer fill from the opposite side, ' +
    'and a subtle rim light separating the device from the dark environment. ' +
    'As the device rotates, its specular highlight should travel across the surface. ' +
    'The lighting should emphasize the metallic material rather than simply making the entire object brighter.';

  // Fresh-agent planning path
  const freshWorld = VisualWorldPlanner.buildTechnologyWorld(productShotIntent);
  // Enhance lighting using explicit intent
  freshWorld.lighting = LightingPlanner.planLightingFromText(
    productShotIntent,
    freshWorld.hero.id,
    freshWorld.hero.materialId!,
    'METAL'
  );

  const freshBinding = VisualWorldPlanner.bindToMotionPlanningRequest(freshWorld, [
    {
      description: 'Device translates forward while specular highlight sweeps across alloy face',
      sourceEntityIds: [freshWorld.hero.id],
      trigger: 'actuator rotation starts at frame 10',
      forceType: 'pneumatic_drive',
      consequence: 'displacement along primary axis',
      startFrame: 0,
      endFrame: 100,
    },
  ]);

  const freshGraph = MotionPlanner.planCinematicSceneFromNaturalLanguage(
    productShotIntent,
    freshWorld
  );
  const compiledFresh = MotionGraphCompiler.compileCinematicGraph(freshGraph);

  const passFreshAgent =
    compiledFresh.contracts.length > 0 &&
    freshWorld.lighting.sources[0].direction.semantic === 'UPPER_LEFT' &&
    freshWorld.lighting.sources[0].color.semantic === 'COOL' &&
    freshWorld.lighting.materialInteractions[0].highlightCharacter === 'SHARP_SPECULAR';

  console.log(`[Fresh-Agent NL Cinematic Scene Planning]: ${passFreshAgent ? 'PASS' : 'FAIL'}`);
  if (!passFreshAgent) allPassed = false;

  // Ambiguous Fresh-Agent Rejection
  let passAmbiguousFresh = false;
  try {
    LightingAmbiguityGate.validateNaturalIntent('Make the scene look cinematic and premium.');
  } catch (err: any) {
    passAmbiguousFresh = err.code === 'LIGHTING_DIRECTION_AMBIGUOUS';
  }
  console.log(`[Ambiguous Fresh-Agent Rejection]: ${passAmbiguousFresh ? 'PASS' : 'FAIL'}`);
  if (!passAmbiguousFresh) allPassed = false;

  console.log('\n================================================================');
  console.log(`FINAL RESULT: ${allPassed ? 'ALL TESTS PASSED (100%)' : 'SOME TESTS FAILED'}`);
  console.log('================================================================\n');

  return allPassed;
}

if (require.main === module) {
  const success = runPhase5B2LightingSuite();
  process.exit(success ? 0 : 1);
}
