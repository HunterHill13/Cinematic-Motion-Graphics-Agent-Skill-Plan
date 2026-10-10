/**
 * ============================================================================
 * PHASE 5C TEST SUITE: DEPTH, SPATIAL LAYERING & 2.5D SCENE ARCHITECTURE
 * ============================================================================
 * 
 * Verifies:
 *   Positive Archetypes:
 *     - P1: Celestial / Black Hole (Singularity hero, accretion disk, foreground jet, deep cosmic background)
 *     - P2: Medical Cell (Mitotic cancer cell hero, posterior receptor core, anterior nanoparticle)
 *     - P3: Metal Product (Chassis hero, interior processor, front optics framing, background pedestal)
 *     - P4: Multi-Depth Reassemble (Multi-depth fragment convergence along Z-axis)
 *   Negative Governance:
 *     - N1: Missing spatial contract -> SPATIAL_REQUIRED / V_D1_MISSING_SPATIAL_CONTRACT
 *     - N2: Hero entity missing spatial placement -> V_D2_MISSING_HERO_SPATIAL
 *     - N3: Depth collapse: all entities at identical z -> V_D11_DEPTH_COLLAPSE / DEPTH_COLLAPSE_DETECTED
 *     - N4: Depth band mismatch (e.g. FOREGROUND at z=0.85) -> V_D4_DEPTH_BAND_MISMATCH
 *     - N5: Spatial relationship references nonexistent entity -> V_D5_UNRESOLVED_ENTITY_RELATION
 *     - N6: Impossible self-relation or self-occlusion -> V_D6_SELF_RELATION
 *     - N7: Incoherent physical occlusion (deeper object occluding nearer object) -> V_D7_INCOHERENT_OCCLUSION
 *     - N8: Parallax active without depth separation -> V_D8_PARALLAX_WITHOUT_DEPTH
 *     - N9: Invalid spatial bounds (z > 1.0 or scale < 0.05) -> V_D9_INVALID_SPATIAL_BOUNDS
 *     - N10: Vague buzzwords ("make it 3D", "add depth") -> DEPTH_DIRECTION_AMBIGUOUS
 *     - N11: Fake depth styling (CSS drop shadow pretending to be 3D) -> V_D14_FAKE_DEPTH_DETECTED
 *     - N12: Motion response references invalid MotionVerb -> V_D12_INVALID_MOTION_VERB
 *     - N13: Cinematic compilation without spatial contract -> blocked with SPATIAL_REQUIRED
 *     - N14: Explicit FLAT_GRAPHIC scene without spatial contract -> PASS
 *   Fresh-Agent Natural-Language Tests:
 *     - Multi-depth medical cancer cell scenario planned from text and compiled
 *     - Vague buzzword prompt ("Make the scene feel more 3D and immersive") rejected
 * ============================================================================
 */

import {
  VisualWorld,
  VisualWorldPlanner,
  VisualWorldValidator,
  MaterialPlanner,
  DepthPlanner,
  DepthValidator,
  DepthAmbiguityGate,
  DepthDirectionAmbiguityError,
  SpatialDepthContract,
  calculateApparentScale,
} from '../src/motion/visual_world';
import {
  MotionPlanner,
} from '../src/motion/compiler/motionPlanningInterface';
import {
  MotionGraphCompiler,
} from '../src/motion/compiler/motionGraphCompiler';

export function runPhase5CDepthSuite(): boolean {
  console.log('================================================================');
  console.log('RUNNING PHASE 5C DEPTH, SPATIAL LAYERING & 2.5D ARCHITECTURE SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // PART 1: POSITIVE TESTS (P1 - P4)
  // --------------------------------------------------------------------------
  console.log('--- PART 1: POSITIVE SPATIAL DEPTH ARCHETYPES ---');

  // P1: Celestial / Black Hole Spatial Structure
  const blackHoleWorld = VisualWorldPlanner.buildBlackHoleWorld('Supermassive singularity');
  const spatialReportP1 = DepthValidator.validate(blackHoleWorld);
  const heroPlacementP1 = blackHoleWorld.spatial?.placements.find(
    (p: any) => p.entityId === blackHoleWorld.hero.id
  );
  const hasForegroundJet = blackHoleWorld.spatial?.placements.some(
    (p: any) => p.depthBand === 'FOREGROUND'
  );
  const hasBackgroundCosmic = blackHoleWorld.spatial?.placements.some(
    (p: any) => p.depthBand === 'DEEP_BACKGROUND'
  );
  const passP1 =
    spatialReportP1.passed &&
    blackHoleWorld.spatial !== undefined &&
    heroPlacementP1?.depthBand === 'HERO_PLANE' &&
    heroPlacementP1.transform.z >= 0.40 &&
    heroPlacementP1.transform.z <= 0.60 &&
    hasForegroundJet === true &&
    hasBackgroundCosmic === true;
  console.log(`[Positive P1 - Black Hole 2.5D Celestial Spatial Structure]: ${passP1 ? 'PASS' : 'FAIL'}`);
  if (!passP1) {
    console.error('Violations P1:', spatialReportP1.violations);
    allPassed = false;
  }

  // P2: Medical Cell Spatial Structure
  const cellWorld = VisualWorldPlanner.buildCellularWorld('Mitotic cancer cell');
  const spatialReportP2 = DepthValidator.validate(cellWorld);
  const heroPlacementP2 = cellWorld.spatial?.placements.find(
    (p: any) => p.entityId === cellWorld.hero.id
  );
  const fgPlacement = cellWorld.spatial?.placements.find(
    (p: any) => p.depthBand === 'FOREGROUND'
  );
  const midPlacement = cellWorld.spatial?.placements.find(
    (p: any) => p.entityId !== cellWorld.hero.id && p.depthBand === 'MIDGROUND'
  );
  const containsRelation = cellWorld.spatial?.relationships.find(
    (r: any) => r.relation === 'CONTAINS' && r.sourceEntityId === cellWorld.hero.id
  );
  const passP2 =
    spatialReportP2.passed &&
    cellWorld.spatial !== undefined &&
    heroPlacementP2?.depthBand === 'HERO_PLANE' &&
    fgPlacement !== undefined &&
    fgPlacement.transform.z < (heroPlacementP2?.transform.z ?? 1) &&
    containsRelation !== undefined;
  console.log(`[Positive P2 - Medical Cell Spatial Internal/External Layering]: ${passP2 ? 'PASS' : 'FAIL'}`);
  if (!passP2) {
    console.error('Violations P2:', spatialReportP2.violations);
    allPassed = false;
  }

  // P3: Metal Product / Precision Hardware
  const techWorld = VisualWorldPlanner.buildTechnologyWorld('Precision hardware core');
  const spatialReportP3 = DepthValidator.validate(techWorld);
  const heroPlacementP3 = techWorld.spatial?.placements.find(
    (p: any) => p.entityId === techWorld.hero.id
  );
  const framingGuide = techWorld.spatial?.placements.find(
    (p: any) => p.depthBand === 'FOREGROUND'
  );
  const framingOcclusion = techWorld.spatial?.occlusions.find(
    (o: any) => o.type === 'FRAMING' && o.occludedEntityId === techWorld.hero.id
  );
  const passP3 =
    spatialReportP3.passed &&
    techWorld.spatial !== undefined &&
    heroPlacementP3?.depthBand === 'HERO_PLANE' &&
    framingGuide !== undefined &&
    framingOcclusion !== undefined;
  console.log(`[Positive P3 - Precision Hardware Spatial Assembly Layering]: ${passP3 ? 'PASS' : 'FAIL'}`);
  if (!passP3) {
    console.error('Violations P3:', spatialReportP3.violations);
    allPassed = false;
  }

  // P4: Multi-Depth Converging Reassemble
  const multiDepthSpatial = DepthPlanner.createMultiDepthReassembleSpatialContract(
    'spatial_multi_test',
    'hero_monolith',
    ['frag_front', 'frag_mid', 'frag_deep']
  );
  const multiDepthWorld: VisualWorld = {
    ...VisualWorldPlanner.buildGenericGroundedWorld('Converging metal alloy fragments reassemble into monolithic core'),
    worldId: 'world_multi_depth_test',
    hero: {
      id: 'hero_monolith',
      label: 'Converged Monolith Core',
      semanticRole: 'HERO',
      visualRole: 'Reassembled focal monolith',
      importance: 'PRIMARY',
      persistence: true,
      depthLayer: 'HERO_PLANE',
      scaleClass: 'HERO_MONUMENTAL',
      visualPriority: 1,
      semanticPurpose: 'Reassembled primary structure',
      materialId: 'mat_solid_alloy',
    },
    secondaryEntities: [
      {
        id: 'frag_front',
        label: 'Anterior Fragment',
        semanticRole: 'SECONDARY',
        visualRole: 'Foreground fragment converging toward hero',
        importance: 'SECONDARY',
        persistence: true,
        depthLayer: 'FOREGROUND',
        scaleClass: 'SUPPORTING',
        visualPriority: 2,
        semanticPurpose: 'Converging fragment',
        materialId: 'mat_solid_alloy',
      },
      {
        id: 'frag_mid',
        label: 'Midground Fragment',
        semanticRole: 'SECONDARY',
        visualRole: 'Midground fragment converging toward hero',
        importance: 'SECONDARY',
        persistence: true,
        depthLayer: 'MIDGROUND',
        scaleClass: 'SUPPORTING',
        visualPriority: 3,
        semanticPurpose: 'Converging fragment',
        materialId: 'mat_solid_alloy',
      },
      {
        id: 'frag_deep',
        label: 'Posterior Fragment',
        semanticRole: 'SECONDARY',
        visualRole: 'Deep background fragment converging toward hero',
        importance: 'SECONDARY',
        persistence: true,
        depthLayer: 'DEEP_BACKGROUND',
        scaleClass: 'SUPPORTING',
        visualPriority: 4,
        semanticPurpose: 'Converging fragment',
        materialId: 'mat_solid_alloy',
      },
    ],
    materials: [
      MaterialPlanner.createMetalMaterial('mat_solid_alloy', 'Monolithic Solid Alloy'),
    ],
    spatial: multiDepthSpatial,
  };
  const spatialReportP4 = DepthValidator.validate(multiDepthWorld);
  const motionResponseP4 = multiDepthWorld.spatial?.motionResponses.find(
    (m: any) => m.verb === 'REASSEMBLE' && m.trajectory === 'MULTI_DEPTH_CONVERGENCE'
  );
  const apparentScaleCalculated = calculateApparentScale(1.0, 0.2); // Foreground -> scale > 0.8
  const apparentScaleDeep = calculateApparentScale(1.0, 0.8); // Deep -> scale smaller
  const passP4 =
    spatialReportP4.passed &&
    multiDepthWorld.spatial !== undefined &&
    motionResponseP4 !== undefined &&
    apparentScaleCalculated > apparentScaleDeep;
  console.log(`[Positive P4 - Multi-Depth Convergence Spatial Contract]: ${passP4 ? 'PASS' : 'FAIL'}`);
  if (!passP4) {
    console.error('Violations P4:', spatialReportP4.violations);
    allPassed = false;
  }

  // --------------------------------------------------------------------------
  // PART 2: NEGATIVE TESTS (N1 - N14)
  // --------------------------------------------------------------------------
  console.log('\n--- PART 2: NEGATIVE GOVERNANCE TESTS ---');

  // N1: Missing spatial contract
  const worldWithoutSpatial = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  delete (worldWithoutSpatial as any).spatial;
  const repN1 = DepthValidator.validate(worldWithoutSpatial);
  const passN1 = !repN1.passed && repN1.violations.some((v: any) => v.code === 'V_D1_MISSING_SPATIAL_CONTRACT');
  console.log(`[Negative N1 - Missing Spatial Contract]: ${passN1 ? 'PASS' : 'FAIL'}`);
  if (!passN1) allPassed = false;

  // N2: Hero entity missing spatial placement
  const worldNoHeroSpatial = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  worldNoHeroSpatial.spatial!.placements = worldNoHeroSpatial.spatial!.placements.filter(
    (p: any) => p.entityId !== worldNoHeroSpatial.hero.id
  );
  const repN2 = DepthValidator.validate(worldNoHeroSpatial);
  const passN2 = !repN2.passed && repN2.violations.some((v: any) => v.code === 'V_D2_MISSING_HERO_SPATIAL');
  console.log(`[Negative N2 - Hero Missing Spatial Placement]: ${passN2 ? 'PASS' : 'FAIL'}`);
  if (!passN2) allPassed = false;

  // N3: Depth collapse: all entities at identical z
  const worldDepthCollapse = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  for (const p of worldDepthCollapse.spatial!.placements) {
    p.transform.z = 0.50; // Collapse all to identical depth
  }
  const repN3 = DepthValidator.validate(worldDepthCollapse);
  const passN3 = !repN3.passed && repN3.violations.some((v: any) => v.code === 'V_D11_DEPTH_COLLAPSE');
  console.log(`[Negative N3 - Depth Collapse Rejection]: ${passN3 ? 'PASS' : 'FAIL'}`);
  if (!passN3) allPassed = false;

  // N4: Depth band mismatch (declared FOREGROUND but numeric z is 0.85)
  const worldBandMismatch = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  worldBandMismatch.spatial!.placements[0].depthBand = 'FOREGROUND';
  worldBandMismatch.spatial!.placements[0].transform.z = 0.85; // Violates FOREGROUND range [0.0, 0.35]
  const repN4 = DepthValidator.validate(worldBandMismatch);
  const passN4 = !repN4.passed && repN4.violations.some((v: any) => v.code === 'V_D4_DEPTH_BAND_MISMATCH');
  console.log(`[Negative N4 - Depth Band Mismatch Rejection]: ${passN4 ? 'PASS' : 'FAIL'}`);
  if (!passN4) allPassed = false;

  // N5: Spatial relationship references nonexistent entity
  const worldUnresolvedRelation = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  worldUnresolvedRelation.spatial!.relationships.push({
    id: 'rel_ghost_test',
    sourceEntityId: worldUnresolvedRelation.hero.id,
    targetEntityId: 'phantom_nonexistent_entity',
    relation: 'IN_FRONT_OF',
    depthDelta: 0.15,
  });
  const repN5 = DepthValidator.validate(worldUnresolvedRelation);
  const passN5 = !repN5.passed && repN5.violations.some((v: any) => v.code === 'V_D5_UNRESOLVED_ENTITY_RELATION');
  console.log(`[Negative N5 - Unresolved Spatial Relationship Entity]: ${passN5 ? 'PASS' : 'FAIL'}`);
  if (!passN5) allPassed = false;

  // N6: Impossible self-relation or self-occlusion
  const worldSelfRelation = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  worldSelfRelation.spatial!.relationships.push({
    id: 'rel_self_test',
    sourceEntityId: worldSelfRelation.hero.id,
    targetEntityId: worldSelfRelation.hero.id,
    relation: 'BEHIND',
    depthDelta: 0.10,
  });
  const repN6 = DepthValidator.validate(worldSelfRelation);
  const passN6 = !repN6.passed && repN6.violations.some((v: any) => v.code === 'V_D6_SELF_RELATION');
  console.log(`[Negative N6 - Self-Relation / Self-Occlusion Rejection]: ${passN6 ? 'PASS' : 'FAIL'}`);
  if (!passN6) allPassed = false;

  // N7: Incoherent physical occlusion (deeper object occluding nearer object)
  const worldIncoherentOcclusion = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  const chassisP = worldIncoherentOcclusion.spatial!.placements.find((p: any) => p.entityId === worldIncoherentOcclusion.hero.id)!;
  const guideP = worldIncoherentOcclusion.spatial!.placements.find((p: any) => p.entityId === 'assembly_rail')!;
  chassisP.transform.z = 0.30;
  guideP.transform.z = 0.80; // Guide is deeper (farther away)
  worldIncoherentOcclusion.spatial!.occlusions = [
    {
      id: 'occ_incoherent',
      occludingEntityId: 'assembly_rail',
      occludedEntityId: worldIncoherentOcclusion.hero.id,
      type: 'PARTIAL',
      depthDifference: -0.50, // Incoherent: occluding is deeper than occluded
    },
  ];
  const repN7 = DepthValidator.validate(worldIncoherentOcclusion);
  const passN7 = !repN7.passed && repN7.violations.some((v: any) => v.code === 'V_D7_INCOHERENT_OCCLUSION');
  console.log(`[Negative N7 - Incoherent Physical Occlusion Rejection]: ${passN7 ? 'PASS' : 'FAIL'}`);
  if (!passN7) allPassed = false;

  // N8: Parallax active without depth separation
  const worldParallaxWithoutDepth = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  for (const p of worldParallaxWithoutDepth.spatial!.placements) {
    p.transform.z = 0.50; // Collapse all to identical depth
    p.depthBand = 'HERO_PLANE';
  }
  worldParallaxWithoutDepth.spatial!.parallaxProfile = {
    sensitivity: 'STRONG',
    response: 'STRONG',
    depthFactor: 0.85,
  };
  const repN8 = DepthValidator.validate(worldParallaxWithoutDepth);
  const passN8 = !repN8.passed && repN8.violations.some((v: any) => v.code === 'V_D8_PARALLAX_WITHOUT_DEPTH');
  console.log(`[Negative N8 - Parallax Without Depth Separation Rejection]: ${passN8 ? 'PASS' : 'FAIL'}`);
  if (!passN8) allPassed = false;

  // N9: Invalid spatial bounds (z > 1.0)
  const worldInvalidBounds = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  worldInvalidBounds.spatial!.placements[0].transform.z = 1.85; // Exceeds [0, 1]
  const repN9 = DepthValidator.validate(worldInvalidBounds);
  const passN9 = !repN9.passed && repN9.violations.some((v: any) => v.code === 'V_D9_INVALID_SPATIAL_BOUNDS');
  console.log(`[Negative N9 - Invalid Spatial Bounds Rejection]: ${passN9 ? 'PASS' : 'FAIL'}`);
  if (!passN9) allPassed = false;

  // N10: Vague buzzwords ("make it 3D", "add depth")
  let passN10 = false;
  try {
    DepthAmbiguityGate.validateNaturalIntent('Make the scene look 3D and cinematic');
  } catch (err: any) {
    passN10 = err.code === 'DEPTH_DIRECTION_AMBIGUOUS' || err instanceof DepthDirectionAmbiguityError;
  }
  console.log(`[Negative N10 - Vague "make it 3D" Buzzword Rejection]: ${passN10 ? 'PASS' : 'FAIL'}`);
  if (!passN10) allPassed = false;

  // N11: Fake depth styling (CSS drop shadow pretending to be 3D)
  const worldFakeDepth = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  (worldFakeDepth.spatial!.placements[0] as any).dropShadow = '10px 10px 5px black';
  const repN11 = DepthValidator.validate(worldFakeDepth);
  const passN11 = !repN11.passed && repN11.violations.some((v: any) => v.code === 'V_D14_FAKE_DEPTH_DETECTED');
  console.log(`[Negative N11 - Fake Depth Styling Trick Rejection]: ${passN11 ? 'PASS' : 'FAIL'}`);
  if (!passN11) allPassed = false;

  // N12: Motion response references invalid MotionVerb
  const worldInvalidMotionVerb = VisualWorldPlanner.buildTechnologyWorld('Precision device');
  (worldInvalidMotionVerb.spatial!.motionResponses[0] as any).verb = 'FLOAT_AROUND_MAGICAL';
  const repN12 = DepthValidator.validate(worldInvalidMotionVerb);
  const passN12 = !repN12.passed && repN12.violations.some((v: any) => v.code === 'V_D12_INVALID_MOTION_VERB');
  console.log(`[Negative N12 - Invalid MotionVerb In Spatial Response Rejection]: ${passN12 ? 'PASS' : 'FAIL'}`);
  if (!passN12) allPassed = false;

  // N13: Cinematic compilation without spatial contract blocked with SPATIAL_REQUIRED
  let passN13 = false;
  try {
    const worldWithoutSpatialForCompile = VisualWorldPlanner.buildTechnologyWorld('Precision device');
    delete (worldWithoutSpatialForCompile as any).spatial;
    const graph = MotionPlanner.planCinematicSceneFromNaturalLanguage(
      'Device travels across screen from left to right',
      worldWithoutSpatialForCompile
    );
    MotionGraphCompiler.compileCinematicGraph(graph);
  } catch (err: any) {
    passN13 = err.code === 'SPATIAL_REQUIRED' || (err as any).violationCode === 'V_D1_MISSING_SPATIAL_CONTRACT';
  }
  console.log(`[Negative N13 - compileCinematicGraph Rejects Missing Spatial]: ${passN13 ? 'PASS' : 'FAIL'}`);
  if (!passN13) allPassed = false;

  // N14: Explicit FLAT_GRAPHIC scene passes without spatial contract
  const flatWorld = VisualWorldPlanner.buildGenericGroundedWorld('Technical wiring diagram', {
    isExplicitFlatComposition: true,
  });
  delete (flatWorld as any).spatial; // No spatial contract
  const repN14 = DepthValidator.validate(flatWorld);
  const passN14 = repN14.passed;
  console.log(`[Negative N14 - Explicit FLAT_GRAPHIC Bypasses Spatial Gate]: ${passN14 ? 'PASS' : 'FAIL'}`);
  if (!passN14) allPassed = false;

  // --------------------------------------------------------------------------
  // PART 3: FRESH-AGENT NATURAL-LANGUAGE PLANNING
  // --------------------------------------------------------------------------
  console.log('\n--- PART 3: FRESH-AGENT NATURAL-LANGUAGE PLANNING ---');

  const medicalCellIntent =
    'Create a spatial 2.5D medical animation of an active cancer cell undergoing mitosis. ' +
    'The cell body is the persistent hero in the midground hero plane. ' +
    'The cell nucleus is located posteriorly inside the cell in the background layer. ' +
    'Delicate cytoskeletal filaments extend anteriorly into the foreground, framing the focal structure. ' +
    'A dense extracellular fluid matrix recedes into the deep background. ' +
    'As mitotic division begins, the nucleus divides and reassembles across multi-depth planes, ' +
    'maintaining continuous parallax and physical spatial layering.';

  // Fresh-agent planning path
  const freshCellWorld = VisualWorldPlanner.buildCellularWorld(medicalCellIntent);
  freshCellWorld.spatial = DepthPlanner.planSpatialContractFromText(
    medicalCellIntent,
    freshCellWorld.hero.id,
    [
      freshCellWorld.secondaryEntities[0].id,
      freshCellWorld.tertiaryEntities[0].id,
    ],
    freshCellWorld.environmentEntities[0].id
  );

  const freshBinding = VisualWorldPlanner.bindToMotionPlanningRequest(freshCellWorld, [
    {
      description: 'Mitotic spindle divides chromosome clusters along anteroposterior spatial axis',
      sourceEntityIds: [freshCellWorld.hero.id, freshCellWorld.secondaryEntities[0].id],
      trigger: 'anaphase trigger at frame 15',
      forceType: 'microtubule_tension',
      consequence: 'bilateral separation with depth divergence',
      startFrame: 0,
      endFrame: 120,
    },
  ]);

  const freshGraph = MotionPlanner.planCinematicSceneFromNaturalLanguage(
    medicalCellIntent,
    freshCellWorld
  );
  const compiledFresh = MotionGraphCompiler.compileCinematicGraph(freshGraph);

  const passFreshAgent =
    compiledFresh.contracts.length > 0 &&
    freshCellWorld.spatial !== undefined &&
    freshCellWorld.spatial.placements.some((p: any) => p.depthBand === 'FOREGROUND') &&
    freshCellWorld.spatial.placements.some((p: any) => p.depthBand === 'MIDGROUND' || p.depthBand === 'HERO_PLANE') &&
    freshCellWorld.spatial.placements.some((p: any) => p.depthBand === 'BACKGROUND' || p.depthBand === 'DEEP_BACKGROUND') &&
    freshCellWorld.spatial.relationships.length > 0;

  console.log(`[Fresh-Agent NL Spatial Scene Planning & Compilation]: ${passFreshAgent ? 'PASS' : 'FAIL'}`);
  if (!passFreshAgent) allPassed = false;

  // Ambiguous Fresh-Agent Rejection
  let passAmbiguousFresh = false;
  try {
    DepthAmbiguityGate.validateNaturalIntent('Make the scene feel more 3D and immersive.');
  } catch (err: any) {
    passAmbiguousFresh = err.code === 'DEPTH_DIRECTION_AMBIGUOUS';
  }
  console.log(`[Ambiguous Fresh-Agent Rejection]: ${passAmbiguousFresh ? 'PASS' : 'FAIL'}`);
  if (!passAmbiguousFresh) allPassed = false;

  console.log('\n================================================================');
  console.log(`FINAL RESULT: ${allPassed ? 'ALL TESTS PASSED (100%)' : 'SOME TESTS FAILED'}`);
  console.log('================================================================\n');

  return allPassed;
}

if (require.main === module) {
  const success = runPhase5CDepthSuite();
  process.exit(success ? 0 : 1);
}
