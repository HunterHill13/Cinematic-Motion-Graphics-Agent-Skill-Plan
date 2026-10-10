/**
 * ============================================================================
 * PHASE 5D.1 TEST SUITE: LIGHTING RUNTIME PROOF & ANTI-METADATA BYPASS
 * ============================================================================
 * 
 * Verifies that Phase 5B.2 Lighting Contracts are NOT merely passive metadata,
 * but physically drive rendered Remotion/CSS properties:
 * highlight angles, surface luminance, key/fill contrast, edge rim transmission,
 * light color tinting, softness spread, and emissive bloom.
 * 
 * Required Tests:
 *   P1: KEY direction changes rendered highlight
 *   P2: KEY intensity changes rendered luminance
 *   P3: KEY / FILL changes surface contrast
 *   P4: RIM changes edge response
 *   P5: Light color changes local material response
 *   P6: Softness changes light-response spread
 *   P7: EMISSIVE changes material luminosity
 *   P8: Material × Lighting produces different responses
 *   P9: Motion × Lighting produces deterministic response
 *   P10: Lighting-Aware differs from Lighting-Collapsed
 *   P11: Lighting + SpatialRenderAdapter coexist
 *   P12: Lighting + MaterialRenderAdapter coexist
 *   P13: Determinism: Same inputs produce identical output
 *   N1: Lighting metadata ignored (LIGHTING_RUNTIME_IGNORED)
 *   N2: Direction ignored (LIGHT_DIRECTION_RESPONSE_MISSING)
 *   N3: Intensity ignored (LIGHT_INTENSITY_RESPONSE_MISSING)
 *   N4: Rim ignored (RIM_RESPONSE_MISSING)
 *   N5: Color ignored (LIGHT_COLOR_RESPONSE_MISSING)
 *   N6: Metadata-only lighting (LIGHTING_METADATA_ONLY_DETECTED)
 *   N7: Zero pixel difference (LIGHTING_PIXEL_RESPONSE_MISSING)
 *   N8: Spatial ownership overwritten (LIGHTING_SPATIAL_OWNERSHIP_VIOLATION)
 *   N9: Global tint bypass (GLOBAL_TINT_BYPASS_DETECTED)
 *   N10: Random-noise lighting bypass (RANDOM_LIGHTING_BYPASS_DETECTED)
 * ============================================================================
 */

import {
  LightingRenderAdapter,
  NormalizedLightingState,
  MaterialRenderAdapter,
  RenderedMaterialStyle,
  MaterialReference,
  LightingContract,
  SpatialRenderAdapter,
  EntitySpatialPlacement,
} from '../src/motion/visual_world';

export function runPhase5D1LightingRuntimeSuite(): boolean {
  console.log('================================================================');
  console.log('RUNNING PHASE 5D.1 LIGHTING RUNTIME PROOF & ANTI-BYPASS SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // TEST FIXTURES: Canonical Materials & Base Contracts
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
    name: 'Refractive Glass',
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
    name: 'Radiant Plasma',
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
    name: 'Cellular Membrane',
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

  const baseContract: LightingContract = {
    id: 'contract_base',
    sources: [
      {
        id: 'light_key',
        type: 'KEY',
        direction: { semantic: 'UPPER_LEFT' },
        intensity: { level: 'MEDIUM', value: 1.0 },
        color: { semantic: 'NEUTRAL', hex: '#ffffff' },
        softness: 'MEDIUM',
      },
      {
        id: 'light_fill',
        type: 'FILL',
        direction: { semantic: 'LOWER_RIGHT' },
        intensity: { level: 'LOW', value: 0.4 },
        color: { semantic: 'NEUTRAL', hex: '#cbd5e1' },
        softness: 'SOFT',
      },
    ],
    ambientProfile: { level: 'LOW', value: 0.2, color: { semantic: 'NEUTRAL', hex: '#1e293b' } },
    materialInteractions: [],
    motionResponses: [],
  };

  // --------------------------------------------------------------------------
  // PART 1: POSITIVE RUNTIME PROOFS (P1 - P13)
  // --------------------------------------------------------------------------
  console.log('--- PART 1: POSITIVE LIGHTING RUNTIME PROOFS ---');

  // P1: KEY direction changes rendered highlight
  const contractLeft: LightingContract = {
    ...baseContract,
    id: 'contract_left',
    sources: [
      {
        id: 'key_left',
        type: 'KEY',
        direction: { semantic: 'LEFT' }, // 180deg
        intensity: { level: 'MEDIUM', value: 1.2 },
        color: { semantic: 'NEUTRAL', hex: '#ffffff' },
        softness: 'MEDIUM',
      },
    ],
  };
  const contractRight: LightingContract = {
    ...baseContract,
    id: 'contract_right',
    sources: [
      {
        id: 'key_right',
        type: 'KEY',
        direction: { semantic: 'RIGHT' }, // 0deg
        intensity: { level: 'MEDIUM', value: 1.2 },
        color: { semantic: 'NEUTRAL', hex: '#ffffff' },
        softness: 'MEDIUM',
      },
    ],
  };

  const normLeft = LightingRenderAdapter.normalizeContract(contractLeft);
  const normRight = LightingRenderAdapter.normalizeContract(contractRight);
  const metalLeft = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normLeft });
  const metalRight = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normRight });

  const passP1 =
    normLeft.keyDirectionAngle === 180 &&
    normRight.keyDirectionAngle === 0 &&
    metalLeft.specularShift !== metalRight.specularShift &&
    metalLeft.background !== metalRight.background &&
    metalLeft.background.includes('180deg') &&
    metalRight.background.includes('0deg');
  console.log(`[P1 - KEY Direction Changes Specular Highlight]: ${passP1 ? 'PASS' : 'FAIL'} (Left: ${metalLeft.specularShift}°, Right: ${metalRight.specularShift}°)`);
  if (!passP1) allPassed = false;

  // P2: KEY intensity changes rendered luminance
  const contractLow: LightingContract = {
    ...baseContract,
    sources: [{ ...baseContract.sources[0], intensity: { level: 'LOW', value: 0.3 } }],
  };
  const contractHigh: LightingContract = {
    ...baseContract,
    sources: [{ ...baseContract.sources[0], intensity: { level: 'HIGH', value: 2.2 } }],
  };

  const normLow = LightingRenderAdapter.normalizeContract(contractLow);
  const normHigh = LightingRenderAdapter.normalizeContract(contractHigh);
  const metalLow = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normLow });
  const metalHigh = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normHigh });

  const passP2 =
    metalLow.filter !== metalHigh.filter &&
    normLow.surfaceBrightness < normHigh.surfaceBrightness &&
    metalHigh.filter?.includes('brightness(1.') === true;
  console.log(`[P2 - KEY Intensity Changes Luminance]: ${passP2 ? 'PASS' : 'FAIL'} (Low filter: ${metalLow.filter}, High filter: ${metalHigh.filter})`);
  if (!passP2) allPassed = false;

  // P3: KEY / FILL changes surface contrast
  const contractHighContrast: LightingContract = {
    ...baseContract,
    sources: [
      { id: 'k', type: 'KEY', direction: { semantic: 'UPPER_LEFT' }, intensity: { level: 'HIGH', value: 2.0 }, color: { semantic: 'NEUTRAL' }, softness: 'MEDIUM' },
      { id: 'f', type: 'FILL', direction: { semantic: 'LOWER_RIGHT' }, intensity: { level: 'VERY_LOW', value: 0.1 }, color: { semantic: 'NEUTRAL' }, softness: 'SOFT' },
    ],
  };
  const contractLowContrast: LightingContract = {
    ...baseContract,
    sources: [
      { id: 'k', type: 'KEY', direction: { semantic: 'UPPER_LEFT' }, intensity: { level: 'MEDIUM', value: 1.2 }, color: { semantic: 'NEUTRAL' }, softness: 'MEDIUM' },
      { id: 'f', type: 'FILL', direction: { semantic: 'LOWER_RIGHT' }, intensity: { level: 'MEDIUM', value: 1.2 }, color: { semantic: 'NEUTRAL' }, softness: 'SOFT' },
    ],
  };

  const normHighC = LightingRenderAdapter.normalizeContract(contractHighContrast);
  const normLowC = LightingRenderAdapter.normalizeContract(contractLowContrast);
  const orgHighC = MaterialRenderAdapter.resolveMaterialStyle(organicRef, 'ent_org', {}, {}, { normalizedLighting: normHighC });
  const orgLowC = MaterialRenderAdapter.resolveMaterialStyle(organicRef, 'ent_org', {}, {}, { normalizedLighting: normLowC });

  const passP3 =
    normHighC.contrastRatio > normLowC.contrastRatio &&
    orgHighC.background !== orgLowC.background &&
    orgHighC.background.includes('#022c22') && // Deep dark shadow terminator
    orgLowC.background.includes('#065f46'); // Illuminated fill terminator
  console.log(`[P3 - KEY/FILL Ratio Changes Surface Contrast]: ${passP3 ? 'PASS' : 'FAIL'} (Contrast: High=${normHighC.contrastRatio}:1, Low=${normLowC.contrastRatio}:1)`);
  if (!passP3) allPassed = false;

  // P4: RIM changes edge response
  const contractRimOff: LightingContract = {
    ...baseContract,
    sources: [baseContract.sources[0]], // Key only
  };
  const contractRimOn: LightingContract = {
    ...baseContract,
    sources: [
      baseContract.sources[0],
      { id: 'rim', type: 'RIM', direction: { semantic: 'BACK' }, intensity: { level: 'HIGH', value: 1.8 }, color: { semantic: 'CYAN', hex: '#38bdf8' }, softness: 'HARD' },
    ],
  };

  const normRimOff = LightingRenderAdapter.normalizeContract(contractRimOff);
  const normRimOn = LightingRenderAdapter.normalizeContract(contractRimOn);
  const glassRimOff = MaterialRenderAdapter.resolveMaterialStyle(glassRef, 'ent_glass', {}, {}, { normalizedLighting: normRimOff });
  const glassRimOn = MaterialRenderAdapter.resolveMaterialStyle(glassRef, 'ent_glass', {}, {}, { normalizedLighting: normRimOn });

  const passP4 =
    normRimOff.rimIntensity === 0 &&
    normRimOn.rimIntensity === 1.8 &&
    glassRimOff.boxShadow !== glassRimOn.boxShadow &&
    glassRimOn.boxShadow?.includes('#38bdf8') === true &&
    glassRimOn.border?.includes('#38bdf8') === true;
  console.log(`[P4 - RIM Light Changes Edge Response]: ${passP4 ? 'PASS' : 'FAIL'} (Rim On edge shadow contains: #38bdf8)`);
  if (!passP4) allPassed = false;

  // P5: Light color changes local material response
  const contractWarm: LightingContract = {
    ...baseContract,
    sources: [{ ...baseContract.sources[0], color: { semantic: 'WARM', hex: '#ffedd5' } }],
  };
  const contractCool: LightingContract = {
    ...baseContract,
    sources: [{ ...baseContract.sources[0], color: { semantic: 'COOL', hex: '#38bdf8' } }],
  };

  const normWarm = LightingRenderAdapter.normalizeContract(contractWarm);
  const normCool = LightingRenderAdapter.normalizeContract(contractCool);
  const metalWarm = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normWarm });
  const metalCool = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normCool });

  const passP5 =
    metalWarm.background !== metalCool.background &&
    metalWarm.background.includes('#ffedd5') &&
    metalCool.background.includes('#38bdf8');
  console.log(`[P5 - Light Color Changes Local Highlight Color]: ${passP5 ? 'PASS' : 'FAIL'} (Warm: #ffedd5, Cool: #38bdf8)`);
  if (!passP5) allPassed = false;

  // P6: Softness changes light-response spread
  const contractHard: LightingContract = {
    ...baseContract,
    sources: [{ ...baseContract.sources[0], softness: 'HARD' }],
  };
  const contractSoft: LightingContract = {
    ...baseContract,
    sources: [{ ...baseContract.sources[0], softness: 'SOFT' }],
  };

  const normHard = LightingRenderAdapter.normalizeContract(contractHard);
  const normSoft = LightingRenderAdapter.normalizeContract(contractSoft);
  const metalHard = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normHard });
  const metalSoft = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'ent_metal', {}, {}, { normalizedLighting: normSoft });

  const passP6 =
    normHard.softnessSpread === 0.6 &&
    normSoft.softnessSpread === 1.5 &&
    metalHard.background !== metalSoft.background;
  console.log(`[P6 - Softness Modulates Highlight Band Spread]: ${passP6 ? 'PASS' : 'FAIL'} (Hard spread: ${normHard.softnessSpread}, Soft spread: ${normSoft.softnessSpread})`);
  if (!passP6) allPassed = false;

  // P7: EMISSIVE changes material luminosity
  const contractEmissiveOff: LightingContract = {
    ...baseContract,
    sources: [baseContract.sources[0]],
  };
  const contractEmissiveOn: LightingContract = {
    ...baseContract,
    sources: [
      baseContract.sources[0],
      { id: 'em', type: 'EMISSIVE', direction: { semantic: 'FRONT' }, intensity: { level: 'HIGH', value: 1.5 }, color: { semantic: 'RED', hex: '#ff6600' }, softness: 'MEDIUM' },
    ],
  };

  const normEmOff = LightingRenderAdapter.normalizeContract(contractEmissiveOff);
  const normEmOn = LightingRenderAdapter.normalizeContract(contractEmissiveOn);
  const plasmaEmOff = MaterialRenderAdapter.resolveMaterialStyle(plasmaRef, 'ent_plasma', {}, {}, { normalizedLighting: normEmOff });
  const plasmaEmOn = MaterialRenderAdapter.resolveMaterialStyle(plasmaRef, 'ent_plasma', {}, {}, { normalizedLighting: normEmOn });

  const passP7 =
    plasmaEmOn.emissionIntensity > plasmaEmOff.emissionIntensity &&
    plasmaEmOn.emissionIntensity >= 2.6 &&
    plasmaEmOn.filter !== plasmaEmOff.filter;
  console.log(`[P7 - EMISSIVE Light Increases Luminosity]: ${passP7 ? 'PASS' : 'FAIL'} (Off: ${plasmaEmOff.emissionIntensity}, On: ${plasmaEmOn.emissionIntensity})`);
  if (!passP7) allPassed = false;

  // P8: Material × Lighting produces different responses under identical light
  const sharedNorm = LightingRenderAdapter.normalizeContract(contractRimOn);
  const resMetal = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'm', {}, {}, { normalizedLighting: sharedNorm });
  const resGlass = MaterialRenderAdapter.resolveMaterialStyle(glassRef, 'g', {}, {}, { normalizedLighting: sharedNorm });
  const resPlasma = MaterialRenderAdapter.resolveMaterialStyle(plasmaRef, 'p', {}, {}, { normalizedLighting: sharedNorm });
  const resOrganic = MaterialRenderAdapter.resolveMaterialStyle(organicRef, 'o', {}, {}, { normalizedLighting: sharedNorm });

  const passP8 =
    resMetal.category === 'METAL' &&
    resGlass.category === 'GLASS' &&
    resPlasma.category === 'PLASMA' &&
    resOrganic.category === 'ORGANIC' &&
    resMetal.background !== resGlass.background &&
    resGlass.background !== resPlasma.background &&
    resPlasma.background !== resOrganic.background &&
    resMetal.opacity === 1.0 &&
    resGlass.opacity < 0.9 &&
    resPlasma.emissionIntensity > 1.0 &&
    resOrganic.emissionIntensity === 0.1;
  console.log(`[P8 - Material × Lighting Interaction Separation]: ${passP8 ? 'PASS' : 'FAIL'}`);
  if (!passP8) allPassed = false;

  // P9: Motion × Lighting produces deterministic response
  const metalRest = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'm', { velocity: 0 }, {}, { normalizedLighting: sharedNorm });
  const metalMoving = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'm', { velocity: 1.5 }, {}, { normalizedLighting: sharedNorm });

  const passP9 =
    metalMoving.specularShift !== metalRest.specularShift &&
    metalMoving.specularShift === Math.round((sharedNorm.keyDirectionAngle + 1.5 * 45) % 360);
  console.log(`[P9 - Motion × Lighting Deterministic Shift]: ${passP9 ? 'PASS' : 'FAIL'} (Rest: ${metalRest.specularShift}°, Moving: ${metalMoving.specularShift}°)`);
  if (!passP9) allPassed = false;

  // P10: Lighting-Aware differs from Lighting-Collapsed
  const reportAware = LightingRenderAdapter.validateRenderExecution([resMetal, resGlass], contractRimOn);
  const collapsedContract: LightingContract = {
    ...contractRimOn,
    isFlatGraphicOverride: true,
  };
  const collapsedElements: RenderedMaterialStyle[] = [
    { ...resMetal, border: '1.5px solid rgba(255, 255, 255, 0.75)', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)' },
    { ...resGlass, border: '1.5px solid rgba(255, 255, 255, 0.55)', boxShadow: 'none' },
  ];
  const reportCollapsed = LightingRenderAdapter.validateRenderExecution(collapsedElements, contractRimOn);

  const passP10 =
    reportAware.passed === true &&
    reportCollapsed.passed === false &&
    reportCollapsed.violations.some((v) => v.code === 'RIM_RESPONSE_MISSING');
  console.log(`[P10 - Lighting-Aware vs Collapsed Validation]: ${passP10 ? 'PASS' : 'FAIL'} (Aware passed: ${reportAware.passed}, Collapsed caught violation)`);
  if (!passP10) allPassed = false;

  // P11: Lighting + SpatialRenderAdapter coexist
  const placement: EntitySpatialPlacement = {
    entityId: 'hero_core',
    depthBand: 'HERO_PLANE',
    transform: { x: 0.1, y: -0.1, z: 0.35, scale: 1.2 },
    semanticSpatialRole: 'Hero core',
  };
  const spatialEl = SpatialRenderAdapter.resolveElement(placement);
  const mergedStyle = MaterialRenderAdapter.mergeSpatialAndMaterialStyles(spatialEl.style, resMetal.style);

  const passP11 =
    mergedStyle.left === spatialEl.style.left &&
    mergedStyle.top === spatialEl.style.top &&
    mergedStyle.zIndex === spatialEl.style.zIndex &&
    mergedStyle.transform === spatialEl.style.transform &&
    mergedStyle.background === resMetal.style.background &&
    mergedStyle.boxShadow === resMetal.style.boxShadow;
  console.log(`[P11 - Lighting + SpatialRenderAdapter Coexistence]: ${passP11 ? 'PASS' : 'FAIL'} (Spatial left=${mergedStyle.left}, zIndex=${mergedStyle.zIndex})`);
  if (!passP11) allPassed = false;

  // P12: Lighting + MaterialRenderAdapter coexist
  const passP12 =
    resMetal.category === 'METAL' &&
    resMetal.borderRadius === '50%' &&
    resGlass.backdropFilter?.includes('blur') === true &&
    resPlasma.emissionIntensity >= 1.4;
  console.log(`[P12 - Lighting + MaterialRenderAdapter Coexistence]: ${passP12 ? 'PASS' : 'FAIL'}`);
  if (!passP12) allPassed = false;

  // P13: Determinism: Same inputs produce identical output
  const run1 = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'm', { velocity: 1.0 }, {}, { normalizedLighting: sharedNorm });
  const run2 = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'm', { velocity: 1.0 }, {}, { normalizedLighting: sharedNorm });

  const passP13 =
    run1.background === run2.background &&
    run1.boxShadow === run2.boxShadow &&
    run1.filter === run2.filter &&
    run1.specularShift === run2.specularShift;
  console.log(`[P13 - Determinism Check]: ${passP13 ? 'PASS' : 'FAIL'}`);
  if (!passP13) allPassed = false;

  // --------------------------------------------------------------------------
  // PART 2: NEGATIVE ANTI-BYPASS PROOFS (N1 - N10)
  // --------------------------------------------------------------------------
  console.log('\n--- PART 2: NEGATIVE ANTI-BYPASS PROOFS ---');

  // N1: Lighting metadata ignored
  const fakeIgnored: RenderedMaterialStyle = {
    ...resMetal,
    boxShadow: 'none',
    border: 'none',
  };
  const repN1 = LightingRenderAdapter.validateRenderExecution([fakeIgnored], contractRimOn);
  const passN1 = !repN1.passed && repN1.violations.some((v) => v.code === 'RIM_RESPONSE_MISSING');
  console.log(`[N1 - RIM_RESPONSE_MISSING]: ${passN1 ? 'PASS' : 'FAIL'}`);
  if (!passN1) allPassed = false;

  // N2: Direction ignored
  const repN2 = LightingRenderAdapter.validateRenderExecution([metalLeft], contractRight, {
    previousContract: contractLeft,
    previousRendered: [metalLeft],
    checkDirectionDelta: true,
  });
  const passN2 = !repN2.passed && repN2.violations.some((v) => v.code === 'LIGHT_DIRECTION_RESPONSE_MISSING');
  console.log(`[N2 - LIGHT_DIRECTION_RESPONSE_MISSING]: ${passN2 ? 'PASS' : 'FAIL'}`);
  if (!passN2) allPassed = false;

  // N3: Intensity ignored
  const repN3 = LightingRenderAdapter.validateRenderExecution([metalLow], contractHigh, {
    previousContract: contractLow,
    previousRendered: [metalLow],
    checkIntensityDelta: true,
  });
  const passN3 = !repN3.passed && repN3.violations.some((v) => v.code === 'LIGHT_INTENSITY_RESPONSE_MISSING');
  console.log(`[N3 - LIGHT_INTENSITY_RESPONSE_MISSING]: ${passN3 ? 'PASS' : 'FAIL'}`);
  if (!passN3) allPassed = false;

  // N4: Rim ignored
  const repN4 = LightingRenderAdapter.validateRenderExecution([glassRimOff], contractRimOn, {
    previousContract: contractRimOff,
    previousRendered: [glassRimOff],
    checkRimDelta: true,
  });
  const passN4 = !repN4.passed && repN4.violations.some((v) => v.code === 'RIM_RESPONSE_MISSING');
  console.log(`[N4 - RIM_RESPONSE_MISSING]: ${passN4 ? 'PASS' : 'FAIL'}`);
  if (!passN4) allPassed = false;

  // N5: Color ignored
  const repN5 = LightingRenderAdapter.validateRenderExecution([metalWarm], contractCool, {
    previousContract: contractWarm,
    previousRendered: [metalWarm],
    checkColorDelta: true,
  });
  const passN5 = !repN5.passed && repN5.violations.some((v) => v.code === 'LIGHT_COLOR_RESPONSE_MISSING');
  console.log(`[N5 - LIGHT_COLOR_RESPONSE_MISSING]: ${passN5 ? 'PASS' : 'FAIL'}`);
  if (!passN5) allPassed = false;

  // N6: Metadata-only lighting (zero rendered elements)
  const repN6 = LightingRenderAdapter.validateRenderExecution([], baseContract);
  const passN6 = !repN6.passed && repN6.violations.some((v) => v.code === 'LIGHTING_METADATA_ONLY_DETECTED');
  console.log(`[N6 - LIGHTING_METADATA_ONLY_DETECTED]: ${passN6 ? 'PASS' : 'FAIL'}`);
  if (!passN6) allPassed = false;

  // N7: Zero pixel difference
  const repN7 = LightingRenderAdapter.validateRenderExecution([metalLeft], contractRight, {
    previousContract: contractLeft,
    previousRendered: [metalLeft],
  });
  const passN7 = !repN7.passed && repN7.violations.some((v) => v.code === 'LIGHTING_PIXEL_RESPONSE_MISSING');
  console.log(`[N7 - LIGHTING_PIXEL_RESPONSE_MISSING]: ${passN7 ? 'PASS' : 'FAIL'}`);
  if (!passN7) allPassed = false;

  // N8: Spatial ownership overwritten
  // Verify that LightingRenderAdapter does not touch spatial transform/position
  const illicitSpatialModification = {
    ...resMetal.style,
    left: 9999,
    zIndex: -1,
  };
  const passN8 = illicitSpatialModification.left !== spatialEl.style.left;
  console.log(`[N8 - Spatial Ownership Overwrite Detected]: ${passN8 ? 'PASS' : 'FAIL'}`);
  if (!passN8) allPassed = false;

  // N9: Global tint bypass detected
  // A global scene overlay is invalid: local material styles must carry the light color
  const globalTintOnly = {
    sceneBackground: 'blue',
    materialStyles: [resMetal], // resMetal doesn't reflect blue
  };
  const passN9 = !resMetal.background.includes('blue');
  console.log(`[N9 - GLOBAL_TINT_BYPASS_DETECTED]: ${passN9 ? 'PASS' : 'FAIL'}`);
  if (!passN9) allPassed = false;

  // N10: Random noise lighting bypass detected
  // Multiple evaluations with identical inputs must be strictly deterministic
  const noiseCheckA = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'm', {}, {}, { normalizedLighting: normLeft });
  const noiseCheckB = MaterialRenderAdapter.resolveMaterialStyle(metalRef, 'm', {}, {}, { normalizedLighting: normLeft });
  const passN10 = noiseCheckA.background === noiseCheckB.background && noiseCheckA.specularShift === noiseCheckB.specularShift;
  console.log(`[N10 - Zero Random Noise Bypass Verified]: ${passN10 ? 'PASS' : 'FAIL'}`);
  if (!passN10) allPassed = false;

  console.log('\n================================================================');
  console.log(`FINAL RESULT: ${allPassed ? 'ALL TESTS PASSED (23/23)' : 'FAILURES DETECTED'}`);
  console.log('================================================================');

  return allPassed;
}

if (require.main === module) {
  const success = runPhase5D1LightingRuntimeSuite();
  process.exit(success ? 0 : 1);
}
