/**
 * ============================================================================
 * PHASE 5C.1 TEST SUITE: SPATIAL RUNTIME PROOF & ANTI-METADATA BYPASS
 * ============================================================================
 * 
 * Verifies that Phase 5C spatial/depth architecture is NOT merely passive metadata,
 * but physically drives rendered Remotion/CSS properties, apparent scale,
 * layer ordering, occlusion, and dynamic Z-axis motion.
 * 
 * Required Tests:
 *   P1: z changes apparent scale according to canonical formula
 *   P2: z changes layer ordering / occlusion (nearer z has higher z-index)
 *   P3: TOWARD_VIEWER changes rendered spatial appearance (dynamic expansion)
 *   P4: AWAY_FROM_VIEWER changes rendered spatial appearance (dynamic shrinkage)
 *   P5: MULTI_DEPTH_CONVERGENCE preserves distinct multi-plane z trajectories
 *   P6: Real Spatial A/B differs measurably from Depth-Collapsed A/B
 *   N1: Renderer ignores z -> test FAILS with RENDER_DEPTH_IGNORED
 *   N2: Renderer ignores apparentScale -> test FAILS with RENDER_SCALE_PROJECTION_IGNORED
 *   N3: Renderer ignores depth ordering -> test FAILS with RENDER_DEPTH_ORDERING_VIOLATION
 *   N4: Spatial contract exists only as metadata -> test FAILS with SPATIAL_METADATA_ONLY_DETECTED
 * ============================================================================
 */

import {
  SpatialDepthContract,
  EntitySpatialPlacement,
  SpatialMotionResponse,
  SpatialRenderAdapter,
  RenderedSpatialElement,
  DepthPlanner,
  DepthValidator,
} from '../src/motion/visual_world';

export function runPhase5C1SpatialRuntimeSuite(): boolean {
  console.log('================================================================');
  console.log('RUNNING PHASE 5C.1 SPATIAL RUNTIME PROOF & ANTI-BYPASS SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // PART 1: POSITIVE RUNTIME TESTS (P1 - P6)
  // --------------------------------------------------------------------------
  console.log('--- PART 1: POSITIVE SPATIAL RUNTIME PROOFS ---');

  // P1: z changes apparent scale
  const scaleZ01 = SpatialRenderAdapter.calculateApparentScale(1.0, 0.10);
  const scaleZ05 = SpatialRenderAdapter.calculateApparentScale(1.0, 0.50);
  const scaleZ09 = SpatialRenderAdapter.calculateApparentScale(1.0, 0.90);
  const passP1 =
    scaleZ01 === 0.930 &&
    scaleZ05 === 0.727 &&
    scaleZ09 === 0.597 &&
    scaleZ01 > scaleZ05 &&
    scaleZ05 > scaleZ09;
  console.log(`[P1 - z Changes Apparent Scale]: ${passP1 ? 'PASS' : 'FAIL'} (z=0.10: ${scaleZ01}, z=0.50: ${scaleZ05}, z=0.90: ${scaleZ09})`);
  if (!passP1) allPassed = false;

  // P2: z changes layer ordering / occlusion
  const fgPlacement: EntitySpatialPlacement = {
    entityId: 'fg_frame',
    depthBand: 'FOREGROUND',
    transform: { x: -0.2, y: -0.15, z: 0.10, scale: 0.8 },
    semanticSpatialRole: 'Foreground framing structure',
  };
  const heroPlacement: EntitySpatialPlacement = {
    entityId: 'hero_core',
    depthBand: 'HERO_PLANE',
    transform: { x: 0.0, y: 0.0, z: 0.50, scale: 1.0 },
    semanticSpatialRole: 'Hero focal plane core',
  };
  const bgPlacement: EntitySpatialPlacement = {
    entityId: 'bg_monolith',
    depthBand: 'BACKGROUND',
    transform: { x: 0.45, y: -0.25, z: 0.90, scale: 1.0 },
    semanticSpatialRole: 'Background datum structure',
  };

  const fgEl = SpatialRenderAdapter.resolveElement(fgPlacement);
  const heroEl = SpatialRenderAdapter.resolveElement(heroPlacement);
  const bgEl = SpatialRenderAdapter.resolveElement(bgPlacement);

  const passP2 =
    fgEl.zIndex > heroEl.zIndex &&
    heroEl.zIndex > bgEl.zIndex &&
    fgEl.zIndex === 900 &&
    heroEl.zIndex === 500 &&
    bgEl.zIndex === 100 &&
    fgEl.depthOffsetZ > heroEl.depthOffsetZ &&
    heroEl.depthOffsetZ > bgEl.depthOffsetZ;
  console.log(`[P2 - z Changes Layer Ordering / Occlusion]: ${passP2 ? 'PASS' : 'FAIL'} (zIndices: FG=${fgEl.zIndex}, Hero=${heroEl.zIndex}, BG=${bgEl.zIndex})`);
  if (!passP2) allPassed = false;

  // P3: TOWARD_VIEWER changes rendered spatial appearance
  const towardMotion: SpatialMotionResponse = {
    verb: 'TRAVEL',
    entityId: 'hero_core',
    trajectory: 'TOWARD_VIEWER',
    startZ: 0.50,
    endZ: 0.12,
    description: 'Hero translates along z-axis toward camera plane',
  };
  const zStartToward = SpatialRenderAdapter.interpolateTrajectoryZ(towardMotion, 0.0);
  const zEndToward = SpatialRenderAdapter.interpolateTrajectoryZ(towardMotion, 1.0);
  const scaleStartToward = SpatialRenderAdapter.calculateApparentScale(1.0, zStartToward);
  const scaleEndToward = SpatialRenderAdapter.calculateApparentScale(1.0, zEndToward);
  const passP3 =
    zStartToward === 0.50 &&
    zEndToward === 0.12 &&
    scaleEndToward > scaleStartToward &&
    scaleStartToward === 0.727 &&
    scaleEndToward === 0.917;
  console.log(`[P3 - TOWARD_VIEWER Expands Apparent Scale]: ${passP3 ? 'PASS' : 'FAIL'} (Start: s=${scaleStartToward}, End: s=${scaleEndToward})`);
  if (!passP3) allPassed = false;

  // P4: AWAY_FROM_VIEWER changes rendered spatial appearance
  const awayMotion: SpatialMotionResponse = {
    verb: 'TRAVEL',
    entityId: 'hero_core',
    trajectory: 'AWAY_FROM_VIEWER',
    startZ: 0.12,
    endZ: 0.85,
    description: 'Hero recedes along z-axis into background plane',
  };
  const zStartAway = SpatialRenderAdapter.interpolateTrajectoryZ(awayMotion, 0.0);
  const zEndAway = SpatialRenderAdapter.interpolateTrajectoryZ(awayMotion, 1.0);
  const scaleStartAway = SpatialRenderAdapter.calculateApparentScale(1.0, zStartAway);
  const scaleEndAway = SpatialRenderAdapter.calculateApparentScale(1.0, zEndAway);
  const passP4 =
    zStartAway === 0.12 &&
    zEndAway === 0.85 &&
    scaleEndAway < scaleStartAway &&
    scaleStartAway === 0.917 &&
    scaleEndAway === 0.611;
  console.log(`[P4 - AWAY_FROM_VIEWER Shrinks Apparent Scale]: ${passP4 ? 'PASS' : 'FAIL'} (Start: s=${scaleStartAway}, End: s=${scaleEndAway})`);
  if (!passP4) allPassed = false;

  // P5: MULTI_DEPTH_CONVERGENCE preserves distinct z trajectories
  const multiDepthContract = DepthPlanner.createMultiDepthReassembleSpatialContract(
    'spatial_multi_p5',
    'hero_monolith',
    ['frag_fg', 'frag_mid', 'frag_bg']
  );
  const sortedAtStart = SpatialRenderAdapter.getDepthSortedElements(multiDepthContract, 1920, 1080, 0.0);
  const sortedAtMid = SpatialRenderAdapter.getDepthSortedElements(multiDepthContract, 1920, 1080, 0.5);
  const sortedAtEnd = SpatialRenderAdapter.getDepthSortedElements(multiDepthContract, 1920, 1080, 1.0);

  const startZSpread = Math.max(...sortedAtStart.map((e) => e.numericZ)) - Math.min(...sortedAtStart.map((e) => e.numericZ));
  const midZSpread = Math.max(...sortedAtMid.map((e) => e.numericZ)) - Math.min(...sortedAtMid.map((e) => e.numericZ));
  const endZSpread = Math.max(...sortedAtEnd.map((e) => e.numericZ)) - Math.min(...sortedAtEnd.map((e) => e.numericZ));

  const passP5 =
    startZSpread >= 0.40 &&
    midZSpread > 0 &&
    midZSpread < startZSpread &&
    endZSpread <= 0.05 && // Converged at hero plane
    sortedAtStart[0].zIndex > sortedAtStart[sortedAtStart.length - 1].zIndex;
  console.log(`[P5 - MULTI_DEPTH_CONVERGENCE Multi-Plane Progression]: ${passP5 ? 'PASS' : 'FAIL'} (Z-Spread: Start=${startZSpread.toFixed(2)}, Mid=${midZSpread.toFixed(2)}, End=${endZSpread.toFixed(2)})`);
  if (!passP5) allPassed = false;

  // P6: Controlled A/B Test (Real Spatial vs Depth Collapsed)
  const realSpatialContract: SpatialDepthContract = {
    id: 'contract_real_spatial',
    compositionIntent: 'LAYERED_WORLD',
    placements: [fgPlacement, heroPlacement, bgPlacement],
    relationships: [
      { id: 'rel_fg_hero', sourceEntityId: 'fg_frame', targetEntityId: 'hero_core', relation: 'IN_FRONT_OF' },
    ],
    occlusions: [
      { id: 'occ_fg_hero', occludingEntityId: 'fg_frame', occludedEntityId: 'hero_core', type: 'PARTIAL', depthDifference: 0.40 },
    ],
    parallaxProfile: { sensitivity: 'STRONG', response: 'STRONG', depthFactor: 0.8 },
    motionResponses: [],
  };

  const collapsedPlacements: EntitySpatialPlacement[] = [
    { ...fgPlacement, transform: { ...fgPlacement.transform, z: 0.50 } },
    { ...heroPlacement, transform: { ...heroPlacement.transform, z: 0.50 } },
    { ...bgPlacement, transform: { ...bgPlacement.transform, z: 0.50 } },
  ];

  const renderedReal = SpatialRenderAdapter.getDepthSortedElements(realSpatialContract);
  const renderedCollapsed = collapsedPlacements.map((p) => SpatialRenderAdapter.resolveElement(p));

  const realScales = renderedReal.map((r) => r.apparentScale);
  const collapsedScales = renderedCollapsed.map((r) => r.apparentScale);

  const realDistinctScales = new Set(realScales).size;
  const collapsedDistinctScales = new Set(collapsedScales).size;

  const realZIndices = renderedReal.map((r) => r.zIndex);
  const collapsedZIndices = renderedCollapsed.map((r) => r.zIndex);

  const passP6 =
    realDistinctScales === 3 &&
    collapsedDistinctScales === 2 && // fg baseScale 0.8 -> 0.582, hero/bg baseScale 1.0 -> 0.727
    realZIndices[0] !== realZIndices[realZIndices.length - 1] &&
    collapsedZIndices.every((z) => z === 500); // All collapsed to zIndex=500
  console.log(`[P6 - Controlled A/B Real vs Collapsed]: ${passP6 ? 'PASS' : 'FAIL'} (Real distinct scales: ${realDistinctScales}, Collapsed z-indices all 500: true)`);
  if (!passP6) allPassed = false;

  // --------------------------------------------------------------------------
  // PART 2: CRITICAL ANTI-BYPASS NEGATIVE TESTS (N1 - N4)
  // --------------------------------------------------------------------------
  console.log('\n--- PART 2: CRITICAL ANTI-BYPASS GOVERNANCE TESTS ---');

  // N1: Renderer ignores z -> test FAILS
  // Control: Renderer sets apparentScale = baseScale without z decay
  const bypassedElementsN1: RenderedSpatialElement[] = renderedReal.map((r) => ({
    ...r,
    apparentScale: r.baseScale, // Disconnected from z!
  }));
  const reportN1 = SpatialRenderAdapter.validateRenderExecution(bypassedElementsN1, realSpatialContract);
  const passN1 =
    !reportN1.passed &&
    reportN1.violations.some((v) => v.code === 'RENDER_DEPTH_IGNORED');
  console.log(`[Negative N1 - Renderer Ignores z Caught & Rejected]: ${passN1 ? 'PASS' : 'FAIL'}`);
  if (!passN1) allPassed = false;

  // N2: Renderer ignores apparentScale formula -> test FAILS
  // Control: Renderer invents arbitrary or faulty scaling
  const bypassedElementsN2: RenderedSpatialElement[] = renderedReal.map((r) => ({
    ...r,
    apparentScale: 0.999, // Faulty scaling
  }));
  const reportN2 = SpatialRenderAdapter.validateRenderExecution(bypassedElementsN2, realSpatialContract);
  const passN2 =
    !reportN2.passed &&
    reportN2.violations.some((v) => v.code === 'RENDER_SCALE_PROJECTION_IGNORED');
  console.log(`[Negative N2 - Unprojected Scale Caught & Rejected]: ${passN2 ? 'PASS' : 'FAIL'}`);
  if (!passN2) allPassed = false;

  // N3: Renderer ignores depth ordering / inverted z-index -> test FAILS
  // Control: Invert z-indices so background is rendered on top of foreground
  const bypassedElementsN3: RenderedSpatialElement[] = [
    { ...renderedReal[0], zIndex: 100 }, // Foreground given low z-index
    { ...renderedReal[1], zIndex: 500 },
    { ...renderedReal[2], zIndex: 900 }, // Background given high z-index
  ];
  const reportN3 = SpatialRenderAdapter.validateRenderExecution(bypassedElementsN3, realSpatialContract);
  const passN3 =
    !reportN3.passed &&
    reportN3.violations.some((v) => v.code === 'RENDER_DEPTH_ORDERING_VIOLATION');
  console.log(`[Negative N3 - Depth Ordering Violation Caught & Rejected]: ${passN3 ? 'PASS' : 'FAIL'}`);
  if (!passN3) allPassed = false;

  // N4: Spatial contract exists only as metadata without affecting DOM styles -> test FAILS
  // Control: Renderer produces 0 elements
  const reportN4 = SpatialRenderAdapter.validateRenderExecution([], realSpatialContract);
  const passN4 =
    !reportN4.passed &&
    reportN4.violations.some((v) => v.code === 'SPATIAL_METADATA_ONLY_DETECTED');
  console.log(`[Negative N4 - Spatial Metadata-Only Caught & Rejected]: ${passN4 ? 'PASS' : 'FAIL'}`);
  if (!passN4) allPassed = false;

  console.log('\n================================================================');
  console.log(`PHASE 5C.1 FINAL RESULT: ${allPassed ? 'ALL TESTS PASSED (100%)' : 'SOME TESTS FAILED'}`);
  console.log('================================================================\n');

  return allPassed;
}

if (require.main === module) {
  const success = runPhase5C1SpatialRuntimeSuite();
  process.exit(success ? 0 : 1);
}
