/**
 * ============================================================================
 * PHASE 5D TEST SUITE: MATERIAL RUNTIME PROOF & ANTI-METADATA BYPASS
 * ============================================================================
 * 
 * Verifies that Phase 5B.1 Material Language & Response Contracts are NOT
 * merely passive metadata, but physically drive rendered Remotion/CSS properties:
 * backgrounds, gradients, borders, shadows, filters, opacity, specular shifts,
 * and emission bloom.
 * 
 * Required Tests:
 *   P1: METAL produces high-contrast specular gradient and rigid geometry
 *   P2: GLASS produces translucent background, frosted blur, and crisp rim
 *   P3: PLASMA produces multi-stop radiant core and high emissive bloom
 *   P4: ORGANIC produces viscoelastic squish deformation under compression
 *   P5: FLAT_GRAPHIC produces pure flat solid color with zero glow/specular
 *   P6: Controlled A/B: Material-Aware differs measurably from Material-Collapsed
 *   P7: Material Swap preserves entity identity while transforming visual surface
 *   P8: Velocity dynamically modulates specular sweep (METAL) and emission (PLASMA)
 *   P9: Rigidity defense: METAL remains rigid under compression while ORGANIC deforms
 *   P10: Coexistence: SpatialRenderAdapter + MaterialRenderAdapter merge cleanly
 *   N1: Collapsed materials trigger MATERIAL_COLLAPSE_DETECTED
 *   N2: Zero rendered elements trigger MATERIAL_METADATA_ONLY_DETECTED
 *   N3: PLASMA without emission triggers MATERIAL_RUNTIME_IGNORED
 *   N4: METAL without specular gradient triggers MATERIAL_RUNTIME_IGNORED
 *   N5: GLASS rendered fully opaque triggers MATERIAL_RUNTIME_IGNORED
 *   N6: FLAT_GRAPHIC rendered with glow triggers MATERIAL_RUNTIME_IGNORED
 *   N7: Pairwise identical families trigger MATERIAL_FAMILY_DIFFERENTIATION_MISSING
 * ============================================================================
 */

import {
  MaterialRenderAdapter,
  RenderedMaterialStyle,
  MaterialReference,
  SpatialRenderAdapter,
  EntitySpatialPlacement,
} from '../src/motion/visual_world';

export function runPhase5DMaterialRuntimeSuite(): boolean {
  console.log('================================================================');
  console.log('RUNNING PHASE 5D MATERIAL RUNTIME PROOF & ANTI-BYPASS SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // TEST FIXTURES: Canonical 5 Mandatory Families
  // --------------------------------------------------------------------------
  const metalRef: MaterialReference = {
    id: 'mat_metal',
    name: 'Titanium Specular',
    category: 'METAL',
    surfaceResponse: 'REFLECTIVE',
    edgeResponse: 'STABLE',
    deformationResponse: 'RIGID',
    lightResponse: 'SPECULAR',
    emission: 'NON_EMISSIVE',
    opacityBehavior: 'OPAQUE',
    textureCharacter: 'SMOOTH',
    motionResponses: {},
  };

  const glassRef: MaterialReference = {
    id: 'mat_glass',
    name: 'Silica Glass',
    category: 'GLASS',
    surfaceResponse: 'TRANSLUCENT',
    edgeResponse: 'TRANSLUCENT',
    deformationResponse: 'BRITTLE',
    lightResponse: 'REFRACTIVE',
    emission: 'NON_EMISSIVE',
    opacityBehavior: 'TRANSLUCENT',
    textureCharacter: 'SMOOTH',
    motionResponses: {},
  };

  const plasmaRef: MaterialReference = {
    id: 'mat_plasma',
    name: 'Corona Plasma',
    category: 'PLASMA',
    surfaceResponse: 'GLOSSY',
    edgeResponse: 'GLOWING',
    deformationResponse: 'FLUID',
    lightResponse: 'EMISSIVE',
    emission: 'HIGHLY_EMISSIVE',
    opacityBehavior: 'DENSITY_DRIVEN',
    textureCharacter: 'FLUID',
    motionResponses: {},
  };

  const organicRef: MaterialReference = {
    id: 'mat_organic',
    name: 'Cellular Lipid Membrane',
    category: 'ORGANIC',
    surfaceResponse: 'SOFT',
    edgeResponse: 'SOFT',
    deformationResponse: 'VISCOELASTIC',
    lightResponse: 'SUBSURFACE',
    emission: 'WEAKLY_EMISSIVE',
    opacityBehavior: 'TRANSLUCENT',
    textureCharacter: 'MICROTEXTURED',
    motionResponses: {},
  };

  const flatRef: MaterialReference = {
    id: 'mat_flat',
    name: 'Schematic Graphic',
    category: 'FLAT_GRAPHIC',
    surfaceResponse: 'DIFFUSE',
    edgeResponse: 'STABLE',
    deformationResponse: 'RIGID',
    lightResponse: 'DIFFUSE',
    emission: 'NON_EMISSIVE',
    opacityBehavior: 'OPAQUE',
    textureCharacter: 'SMOOTH',
    motionResponses: {},
  };

  const allRefs = [metalRef, glassRef, plasmaRef, organicRef, flatRef];

  // --------------------------------------------------------------------------
  // PART 1: POSITIVE RUNTIME PROOFS (P1 - P10)
  // --------------------------------------------------------------------------
  console.log('--- PART 1: POSITIVE MATERIAL RUNTIME PROOFS ---');

  // P1: METAL specular gradient & rigidity
  const metalStyle = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal');
  const passP1 =
    metalStyle.category === 'METAL' &&
    metalStyle.background.includes('linear-gradient') &&
    metalStyle.opacity === 1.0 &&
    metalStyle.emissionIntensity === 0 &&
    metalStyle.borderRadius === '50%';
  console.log(`[P1 - METAL Specular Gradient & Rigidity]: ${passP1 ? 'PASS' : 'FAIL'} (gradient: ${metalStyle.background.slice(0, 32)}...)`);
  if (!passP1) allPassed = false;

  // P2: GLASS translucency & backdrop filter
  const glassStyle = MaterialRenderAdapter.resolveMaterialStyle(glassRef, 'ent_glass');
  const passP2 =
    glassStyle.category === 'GLASS' &&
    glassStyle.opacity < 0.95 &&
    glassStyle.opacity > 0.5 &&
    glassStyle.backdropFilter?.includes('blur') === true &&
    glassStyle.emissionIntensity === 0;
  console.log(`[P2 - GLASS Translucency & Frosted Refraction]: ${passP2 ? 'PASS' : 'FAIL'} (opacity: ${glassStyle.opacity}, backdropFilter: ${glassStyle.backdropFilter})`);
  if (!passP2) allPassed = false;

  // P3: PLASMA radiant core & emission bloom
  const plasmaStyle = MaterialRenderAdapter.resolveMaterialStyle(plasmaRef, 'ent_plasma');
  const passP3 =
    plasmaStyle.category === 'PLASMA' &&
    plasmaStyle.emissionIntensity >= 1.0 &&
    plasmaStyle.boxShadow?.includes('px') === true &&
    plasmaStyle.background.includes('radial-gradient');
  console.log(`[P3 - PLASMA Radiant Core & Emission Bloom]: ${passP3 ? 'PASS' : 'FAIL'} (emissionIntensity: ${plasmaStyle.emissionIntensity}, boxShadow stops present)`);
  if (!passP3) allPassed = false;

  // P4: ORGANIC viscoelastic deformation under compression
  const organicUncompressed = MaterialRenderAdapter.resolveMaterialStyle(organicRef, 'ent_organic');
  const organicCompressed = MaterialRenderAdapter.resolveMaterialStyle(
    organicRef,
    'ent_organic',
    {},
    { compression: 0.5, factor: 0.5 }
  );
  const passP4 =
    organicUncompressed.borderRadius === '50%' &&
    organicCompressed.borderRadius !== '50%' &&
    organicCompressed.borderRadius?.includes('%') === true &&
    organicCompressed.category === 'ORGANIC';
  console.log(`[P4 - ORGANIC Viscoelastic Deformation Under Compression]: ${passP4 ? 'PASS' : 'FAIL'} (compressed radius: ${organicCompressed.borderRadius})`);
  if (!passP4) allPassed = false;

  // P5: FLAT_GRAPHIC pure flat solid color, zero glow/specular
  const flatStyle = MaterialRenderAdapter.resolveMaterialStyle(flatRef, 'ent_flat');
  const passP5 =
    flatStyle.category === 'FLAT_GRAPHIC' &&
    flatStyle.isFlatGraphic === true &&
    flatStyle.boxShadow === 'none' &&
    flatStyle.filter === 'none' &&
    flatStyle.emissionIntensity === 0 &&
    flatStyle.specularShift === 0;
  console.log(`[P5 - FLAT_GRAPHIC Zero Glow/Specular Pure Flat]: ${passP5 ? 'PASS' : 'FAIL'} (boxShadow: ${flatStyle.boxShadow}, filter: ${flatStyle.filter})`);
  if (!passP5) allPassed = false;

  // P6: Controlled A/B: Material-Aware differs measurably from Collapsed
  const renderedAware = [
    metalStyle,
    glassStyle,
    plasmaStyle,
    organicUncompressed,
    flatStyle,
  ];
  const renderedCollapsed: RenderedMaterialStyle[] = allRefs.map((ref) => ({
    entityId: `ent_${ref.category.toLowerCase()}`,
    materialId: 'collapsed_fallback',
    category: ref.category,
    background: '#475569',
    border: '1px solid #334155',
    borderRadius: '50%',
    boxShadow: 'none',
    filter: 'none',
    opacity: 1.0,
    specularShift: 0,
    emissionIntensity: 0,
    edgeBlurRadius: 0,
    isFlatGraphic: true,
    style: { background: '#475569' },
  }));

  const validationAware = MaterialRenderAdapter.validateRenderExecution(renderedAware, allRefs);
  const validationCollapsed = MaterialRenderAdapter.validateRenderExecution(renderedCollapsed, allRefs);

  const passP6 =
    validationAware.passed === true &&
    validationCollapsed.passed === false &&
    validationCollapsed.violations.some((v) => v.code === 'MATERIAL_COLLAPSE_DETECTED');
  console.log(`[P6 - Controlled A/B Validation Separation]: ${passP6 ? 'PASS' : 'FAIL'} (Aware passed: ${validationAware.passed}, Collapsed caught violation: ${validationCollapsed.violations[0]?.code})`);
  if (!passP6) allPassed = false;

  // P7: Material Swap: Preserves identity while transforming surface
  const heroBefore = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'hero_core');
  const heroAfter = MaterialRenderAdapter.resolveMaterialStyle(plasmaRef, 'hero_core');
  const passP7 =
    heroBefore.entityId === heroAfter.entityId &&
    heroBefore.category === 'METAL' &&
    heroAfter.category === 'PLASMA' &&
    heroBefore.background !== heroAfter.background &&
    heroBefore.emissionIntensity === 0 &&
    heroAfter.emissionIntensity >= 1.0;
  console.log(`[P7 - Material Swap Surface Transformation & Identity Preservation]: ${passP7 ? 'PASS' : 'FAIL'} (entityId: ${heroBefore.entityId}, category: ${heroBefore.category} -> ${heroAfter.category})`);
  if (!passP7) allPassed = false;

  // P8: Velocity dynamically modulates specular sweep (METAL) and emission (PLASMA)
  const metalRest = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', { velocity: 0, progress: 0 });
  const metalMoving = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', { velocity: 1.5, progress: 0.5 });
  const plasmaRest = MaterialRenderAdapter.resolveMaterialStyle(plasmaRef, 'ent_plasma', { velocity: 0 });
  const plasmaMoving = MaterialRenderAdapter.resolveMaterialStyle(plasmaRef, 'ent_plasma', { velocity: 1.5 });

  const passP8 =
    metalMoving.specularShift !== metalRest.specularShift &&
    plasmaMoving.emissionIntensity > plasmaRest.emissionIntensity;
  console.log(`[P8 - Velocity Modulates Specular Sweep & Emission Flare]: ${passP8 ? 'PASS' : 'FAIL'} (Metal shift: ${metalRest.specularShift}° -> ${metalMoving.specularShift}°, Plasma emission: ${plasmaRest.emissionIntensity} -> ${plasmaMoving.emissionIntensity})`);
  if (!passP8) allPassed = false;

  // P9: Rigidity defense: METAL remains rigid under compression
  const metalCompressed = MaterialRenderAdapter.resolveMaterialStyle(
    metalRef,
    'ent_metal',
    {},
    { compression: 0.75, factor: 0.75 }
  );
  const passP9 =
    metalCompressed.borderRadius === '50%' &&
    organicCompressed.borderRadius !== '50%';
  console.log(`[P9 - Rigidity Defense (METAL 50% vs ORGANIC squish)]: ${passP9 ? 'PASS' : 'FAIL'} (METAL: ${metalCompressed.borderRadius}, ORGANIC: ${organicCompressed.borderRadius})`);
  if (!passP9) allPassed = false;

  // P10: SpatialRenderAdapter + MaterialRenderAdapter clean merge
  const spatialPlacement: EntitySpatialPlacement = {
    entityId: 'hero_core',
    depthBand: 'HERO_PLANE',
    transform: { x: 0.1, y: -0.2, z: 0.35, scale: 1.2 },
    semanticSpatialRole: 'Primary hero focal object',
  };
  const spatialElement = SpatialRenderAdapter.resolveElement(spatialPlacement);
  const mergedStyle = MaterialRenderAdapter.mergeSpatialAndMaterialStyles(
    spatialElement.style,
    metalStyle.style
  );

  const passP10 =
    mergedStyle.left === spatialElement.style.left &&
    mergedStyle.top === spatialElement.style.top &&
    mergedStyle.zIndex === spatialElement.style.zIndex &&
    mergedStyle.transform === spatialElement.style.transform &&
    mergedStyle.background === metalStyle.style.background &&
    mergedStyle.boxShadow === metalStyle.style.boxShadow;
  console.log(`[P10 - Spatial & Material Style Composition]: ${passP10 ? 'PASS' : 'FAIL'} (left=${mergedStyle.left}, zIndex=${mergedStyle.zIndex}, background=${(mergedStyle.background as string).slice(0, 20)}...)`);
  if (!passP10) allPassed = false;

  // --------------------------------------------------------------------------
  // PART 2: NEGATIVE ANTI-BYPASS PROOFS (N1 - N7)
  // --------------------------------------------------------------------------
  console.log('\n--- PART 2: NEGATIVE ANTI-BYPASS PROOFS ---');

  // N1: Collapsed materials
  const reportN1 = MaterialRenderAdapter.validateRenderExecution(renderedCollapsed, allRefs);
  const passN1 =
    !reportN1.passed &&
    reportN1.violations.some((v) => v.code === 'MATERIAL_COLLAPSE_DETECTED');
  console.log(`[N1 - MATERIAL_COLLAPSE_DETECTED]: ${passN1 ? 'PASS' : 'FAIL'}`);
  if (!passN1) allPassed = false;

  // N2: Zero rendered elements
  const reportN2 = MaterialRenderAdapter.validateRenderExecution([], allRefs);
  const passN2 =
    !reportN2.passed &&
    reportN2.violations.some((v) => v.code === 'MATERIAL_METADATA_ONLY_DETECTED');
  console.log(`[N2 - MATERIAL_METADATA_ONLY_DETECTED]: ${passN2 ? 'PASS' : 'FAIL'}`);
  if (!passN2) allPassed = false;

  // N3: PLASMA without emission
  const fakePlasma: RenderedMaterialStyle = {
    ...plasmaStyle,
    boxShadow: 'none',
    emissionIntensity: 0,
  };
  const reportN3 = MaterialRenderAdapter.validateRenderExecution([fakePlasma], [plasmaRef]);
  const passN3 =
    !reportN3.passed &&
    reportN3.violations.some((v) => v.code === 'MATERIAL_RUNTIME_IGNORED');
  console.log(`[N3 - PLASMA Without Emission Triggers MATERIAL_RUNTIME_IGNORED]: ${passN3 ? 'PASS' : 'FAIL'}`);
  if (!passN3) allPassed = false;

  // N4: METAL without specular gradient
  const fakeMetal: RenderedMaterialStyle = {
    ...metalStyle,
    background: '#888888',
  };
  const reportN4 = MaterialRenderAdapter.validateRenderExecution([fakeMetal], [metalRef]);
  const passN4 =
    !reportN4.passed &&
    reportN4.violations.some((v) => v.code === 'MATERIAL_RUNTIME_IGNORED');
  console.log(`[N4 - METAL Without Specular Triggers MATERIAL_RUNTIME_IGNORED]: ${passN4 ? 'PASS' : 'FAIL'}`);
  if (!passN4) allPassed = false;

  // N5: GLASS rendered fully opaque
  const fakeGlass: RenderedMaterialStyle = {
    ...glassStyle,
    opacity: 1.0,
  };
  const reportN5 = MaterialRenderAdapter.validateRenderExecution([fakeGlass], [glassRef]);
  const passN5 =
    !reportN5.passed &&
    reportN5.violations.some((v) => v.code === 'MATERIAL_RUNTIME_IGNORED');
  console.log(`[N5 - GLASS Rendered Fully Opaque Triggers MATERIAL_RUNTIME_IGNORED]: ${passN5 ? 'PASS' : 'FAIL'}`);
  if (!passN5) allPassed = false;

  // N6: FLAT_GRAPHIC rendered with glow
  const fakeFlat: RenderedMaterialStyle = {
    ...flatStyle,
    boxShadow: '0 0 20px #3b82f6',
  };
  const reportN6 = MaterialRenderAdapter.validateRenderExecution([fakeFlat], [flatRef]);
  const passN6 =
    !reportN6.passed &&
    reportN6.violations.some((v) => v.code === 'MATERIAL_RUNTIME_IGNORED');
  console.log(`[N6 - FLAT_GRAPHIC With Glow Triggers MATERIAL_RUNTIME_IGNORED]: ${passN6 ? 'PASS' : 'FAIL'}`);
  if (!passN6) allPassed = false;

  // N7: Pairwise identical families
  const identicalA: RenderedMaterialStyle = {
    ...metalStyle,
    entityId: 'ent_a',
    category: 'METAL',
  };
  const identicalB: RenderedMaterialStyle = {
    ...metalStyle,
    entityId: 'ent_b',
    category: 'GLASS',
  };
  const reportN7 = MaterialRenderAdapter.validateRenderExecution(
    [identicalA, identicalB],
    [metalRef, glassRef]
  );
  const passN7 =
    !reportN7.passed &&
    reportN7.violations.some((v) => v.code === 'MATERIAL_FAMILY_DIFFERENTIATION_MISSING');
  console.log(`[N7 - Pairwise Identical Families Triggers MATERIAL_FAMILY_DIFFERENTIATION_MISSING]: ${passN7 ? 'PASS' : 'FAIL'}`);
  if (!passN7) allPassed = false;

  console.log('\n================================================================');
  console.log(`FINAL RESULT: ${allPassed ? 'ALL TESTS PASSED (17/17)' : 'FAILURES DETECTED'}`);
  console.log('================================================================');

  return allPassed;
}

if (require.main === module) {
  const success = runPhase5DMaterialRuntimeSuite();
  process.exit(success ? 0 : 1);
}
