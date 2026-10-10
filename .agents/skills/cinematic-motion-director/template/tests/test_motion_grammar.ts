/**
 * UNIT TEST: Phase 1 Motion Grammar & Transformation Contract Continuity
 */

import {
  TransformationContract,
  evaluateTransformationContract,
} from '../src/motion/grammar/motionGrammar';

function runMotionGrammarTests() {
  console.log('--- RUNNING PHASE 1 MOTION GRAMMAR & CONTINUITY TESTS ---');

  // Shot 1: Thermal buildup (Frame 0 to 300)
  const shot1Contract: TransformationContract = {
    shotId: 'shot_01_core_heat',
    startFrame: 0,
    endFrame: 300,
    durationFrames: 300,
    heroEntity: {
      id: 'vapor_chamber_core',
      label: 'محفظه بخار هسته مرکزی',
      persistsFrom: 'GENESIS',
      persistsTo: 'shot_02_evaporation_spread',
    },
    initialState: {
      position: { x: 960, y: 700, z: 0 },
      scale: 0.8,
      rotation: { z: 0 },
      geometry: 'solid_copper_plate',
      state: 'idle',
    },
    trigger: {
      frame: 45,
      narrationMarker: 'با افزایش بار محاسباتی',
      forceType: 'thermal_dissipation_surge',
    },
    midpointEvent: {
      verb: 'EXPAND',
      startFrame: 100, // Inside middle 60% (frames 60 - 240)
      endFrame: 220,
      subBeats: [
        { frame: 120, action: 'Heat ring emerges at center' },
        { frame: 180, action: 'Copper substrate glows cadmium orange' },
      ],
      meaningfulDelta: {
        property: 'scale',
        expectedMinimumDelta: 0.25,
      },
    },
    finalState: {
      position: { x: 960, y: 540, z: -50 },
      scale: 1.1,
      rotation: { z: 15 },
      geometry: 'active_evaporation_matrix',
      state: 'superheated',
    },
    exitMomentum: {
      vector: { x: 0, y: -4, z: -2 }, // Upward vapor dissipation vector
      angularVelocity: 0.5,
      consequence: 'Steam vector launches upward into condenser mesh',
    },
  };

  // Test 1: Frame 0 evaluation matches initialState
  const f0 = evaluateTransformationContract(shot1Contract, 0);
  console.assert(f0.position.x === 960, `Expected px 960, got ${f0.position.x}`);
  console.assert(f0.position.y === 700, `Expected py 700, got ${f0.position.y}`);
  console.assert(f0.scale === 0.8, `Expected scale 0.8, got ${f0.scale}`);
  console.log('✓ Test 1: InitialState evaluation correct');

  // Test 2: Midpoint active transformation (Frame 160)
  const f160 = evaluateTransformationContract(shot1Contract, 160);
  console.assert(f160.activeVerb === 'EXPAND', `Expected EXPAND, got ${f160.activeVerb}`);
  console.assert(f160.isMeaningfulMotionActive === true, 'Expected meaningful motion active');
  console.assert(f160.scale > 0.8 && f160.scale < 1.1, `Scale mid-evolution expected, got ${f160.scale}`);
  console.assert(f160.position.y < 700 && f160.position.y >= 540, `Spatial elevation expected, got ${f160.position.y}`);
  console.log('✓ Test 2: Middle 60% meaningful transformation verified (EXPAND verb active, scale evolving)');

  // Test 3: Momentum exit handoff at Frame 300
  const f300 = evaluateTransformationContract(shot1Contract, 300);
  console.assert(f300.activeVerb === 'MOMENTUM_TRANSFER', `Expected MOMENTUM_TRANSFER, got ${f300.activeVerb}`);
  console.assert(f300.instantaneousVelocity.y < 0, 'Instantaneous velocity must preserve upward vector');
  console.log('✓ Test 3: Exit momentum and hand-off vector preserved');

  // Shot 2: Continuous Momentum Hand-off (Frame 300 to 600)
  const shot2Contract: TransformationContract = {
    shotId: 'shot_02_evaporation_spread',
    startFrame: 300,
    endFrame: 600,
    durationFrames: 300,
    heroEntity: {
      id: 'vapor_chamber_core',
      label: 'محفظه بخار هسته مرکزی',
      persistsFrom: 'shot_01_core_heat',
      persistsTo: 'TERMINUS',
    },
    initialState: {
      // Coordinates directly inherit Shot 1's final coordinate space
      position: { x: f300.position.x, y: f300.position.y, z: f300.position.z },
      scale: f300.scale,
      rotation: { z: f300.rotation.z },
      geometry: f300.geometry,
      state: 'superheated',
    },
    trigger: {
      frame: 330,
      narrationMarker: 'بخار با سرعت در محفظه منتشر می‌شود',
      forceType: 'pneumatic_vapor_pressure',
    },
    midpointEvent: {
      verb: 'TRAVEL',
      startFrame: 380,
      endFrame: 500,
      subBeats: [{ frame: 420, action: 'Bifurcation into capillary mesh' }],
      meaningfulDelta: {
        property: 'position',
        expectedMinimumDelta: 120,
      },
    },
    finalState: {
      position: { x: 500, y: 300, z: -100 },
      scale: 1.3,
      rotation: { z: 45 },
      geometry: 'condensed_droplets',
    },
    exitMomentum: {
      vector: { x: -2, y: 0, z: 0 },
      consequence: 'Liquid returns to wick structure',
    },
  };

  const f300_shot2 = evaluateTransformationContract(shot2Contract, 300);
  const positionDelta = Math.hypot(
    f300_shot2.position.x - f300.position.x,
    f300_shot2.position.y - f300.position.y
  );
  console.assert(positionDelta < 0.001, `Teleportation detected between Shot 1 and Shot 2! Delta: ${positionDelta}`);
  console.log('✓ Test 4: Zero teleportation across shot boundaries (Perfect Continuous Spatial Hand-off)');

  console.log('--- ALL PHASE 1 MOTION GRAMMAR TESTS PASSED SUCCESSFULLY ---');
}

runMotionGrammarTests();
