/**
 * ============================================================================
 * PHASE 5A.1 TEST SUITE: VISUAL WORLD HARD-GATE ENFORCEMENT
 * ============================================================================
 * 
 * Verifies that the Phase-5 Cinematic Director Pipeline CANNOT proceed
 * to MotionSceneGraph compilation or planning without a valid, non-ambiguous
 * VisualWorld.
 * 
 * Tests:
 *   [N1] Missing VisualWorld -> VISUAL_WORLD_REQUIRED
 *   [N2] Invalid VisualWorld -> VISUAL_WORLD_INVALID
 *   [N3] Hero Mismatch -> V8_HERO_MISMATCH
 *   [N4] Ambiguous Art Direction -> VISUAL_DIRECTION_AMBIGUOUS
 *   [N5] Direct Motion Bypass Attempt -> VISUAL_WORLD_REQUIRED
 *   [POS] Full Cinematic Pipeline Pass
 *   [BC] Legacy Low-Level API Backward Compatibility
 * ============================================================================
 */

import {
  VisualWorld,
  VisualWorldPlanner,
  VisualWorldValidator,
} from '../src/motion/visual_world';
import {
  MotionPlanner,
  MotionPlanningRequest,
} from '../src/motion/compiler/motionPlanningInterface';
import {
  MotionGraphCompiler,
} from '../src/motion/compiler/motionGraphCompiler';
import {
  MotionSceneGraph,
} from '../src/motion/compiler/motionSceneGraph';
import { AstMotionValidator } from '../src/motion/validation/astMotionValidator';

export function runPhase5A1HardGateSuite() {
  console.log('================================================================');
  console.log('RUNNING PHASE 5A.1 VISUAL WORLD HARD-GATE ENFORCEMENT SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // Helper to create a valid baseline VisualWorld
  const getValidWorld = (): VisualWorld => {
    return VisualWorldPlanner.planFromNaturalIntent(
      'A dense celestial singularity core with accretion plasma ring and gravitational background field.'
    );
  };

  // Helper to create a valid baseline MotionSceneGraph matching getValidWorld()
  const getValidGraph = (world?: VisualWorld): MotionSceneGraph => {
    const heroId = world?.hero?.id || 'dense_singularity_core';
    return {
      sceneId: 'test_cinematic_scene',
      title: 'Test Cinematic Scene',
      totalDurationFrames: 300,
      world: {
        width: 1920,
        height: 1080,
        depthEnabled: true,
        backgroundColor: '#05070D',
      },
      entities: [
        {
          id: heroId,
          label: 'Hero Singularity Core',
          role: 'HERO',
          persistent: true,
          lifecycle: 'PERSIST',
          initialState: {
            position: { x: 960, y: 540, z: 0 },
            scale: 1.0,
            rotation: { z: 0 },
            geometry: 'dense_sphere',
            state: 'intact',
          },
          semanticPurpose: 'Primary gravitational center',
        },
      ],
      transformations: [
        {
          id: 'trans_01',
          shotId: 'shot_01',
          verb: 'EXPAND',
          sourceEntityIds: [heroId],
          startFrame: 0,
          endFrame: 150,
          trigger: {
            frame: 30,
            narrationMarker: 'accumulates gravitational energy',
            forceType: 'gravitational_pulse',
          },
          consequence: {
            description: 'Perimeter expansion',
            exitMomentum: { vector: { x: 0, y: 0, z: 0 }, angularVelocity: 0 },
            spatialResolution: 'perimeter_expansion',
          },
          spatialIntent: {
            origin: { x: 960, y: 540, z: 0 },
            scaleShift: { from: 1.0, to: 1.8 },
          },
        },
      ],
      camera: {
        keyframes: [{ frame: 0, position: { x: 0, y: 0, z: 0 }, zoom: 1.0 }],
        isSubjectCoupled: true,
      },
      continuity: [],
      visualWorld: world,
    };
  };

  // --------------------------------------------------------------------------
  // NEGATIVE TEST N1: Missing VisualWorld -> VISUAL_WORLD_REQUIRED
  // --------------------------------------------------------------------------
  console.log('--- TEST N1: MISSING VISUAL WORLD ---');
  try {
    const graphWithoutWorld = getValidGraph(undefined);
    delete graphWithoutWorld.visualWorld;
    MotionGraphCompiler.compileCinematicGraph(graphWithoutWorld);
    console.error('FAIL: MotionGraphCompiler.compileCinematicGraph did NOT throw on missing visualWorld!');
    allPassed = false;
  } catch (err: any) {
    if (err.code === 'VISUAL_WORLD_REQUIRED') {
      console.log(`[PASS] N1a: compileCinematicGraph blocked with VISUAL_WORLD_REQUIRED`);
    } else {
      console.error(`FAIL: Expected VISUAL_WORLD_REQUIRED, got ${err.code}: ${err.message}`);
      allPassed = false;
    }
  }

  try {
    MotionPlanner.planCinematicScene({
      creativeIntent: 'Core expands',
      entities: [
        { id: 'core', role: 'HERO', semanticPurpose: 'Primary core', persistent: true },
      ],
      transformations: [
        {
          description: 'Core expands',
          sourceEntityIds: ['core'],
          trigger: 'pulse',
          consequence: 'expanded',
        },
      ],
      // visualWorld is intentionally omitted
    });
    console.error('FAIL: MotionPlanner.planCinematicScene did NOT throw on missing visualWorld!');
    allPassed = false;
  } catch (err: any) {
    if (err.code === 'VISUAL_WORLD_REQUIRED') {
      console.log(`[PASS] N1b: planCinematicScene blocked with VISUAL_WORLD_REQUIRED`);
    } else {
      console.error(`FAIL: Expected VISUAL_WORLD_REQUIRED, got ${err.code}: ${err.message}`);
      allPassed = false;
    }
  }

  try {
    MotionPlanner.planCinematicSceneFromNaturalLanguage(
      'Central core expands outward radially',
      undefined as any
    );
    console.error('FAIL: MotionPlanner.planCinematicSceneFromNaturalLanguage did NOT throw on missing visualWorld!');
    allPassed = false;
  } catch (err: any) {
    if (err.code === 'VISUAL_WORLD_REQUIRED') {
      console.log(`[PASS] N1c: planCinematicSceneFromNaturalLanguage blocked with VISUAL_WORLD_REQUIRED`);
    } else {
      console.error(`FAIL: Expected VISUAL_WORLD_REQUIRED, got ${err.code}: ${err.message}`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // NEGATIVE TEST N2: Invalid VisualWorld -> VISUAL_WORLD_INVALID
  // --------------------------------------------------------------------------
  console.log('\n--- TEST N2: INVALID VISUAL WORLD ---');
  try {
    const invalidWorld = getValidWorld();
    delete (invalidWorld as any).depth; // Stripping DepthModel violates V4

    const graph = getValidGraph(invalidWorld);
    MotionGraphCompiler.compileCinematicGraph(graph);
    console.error('FAIL: compileCinematicGraph did NOT throw on invalid VisualWorld!');
    allPassed = false;
  } catch (err: any) {
    if (err.code === 'VISUAL_WORLD_INVALID') {
      console.log(`[PASS] N2: compileCinematicGraph blocked with VISUAL_WORLD_INVALID (V4 depth missing)`);
    } else {
      console.error(`FAIL: Expected VISUAL_WORLD_INVALID, got ${err.code}: ${err.message}`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // NEGATIVE TEST N3: Hero Mismatch -> V8_HERO_MISMATCH
  // --------------------------------------------------------------------------
  console.log('\n--- TEST N3: HERO MISMATCH ---');
  try {
    const world = getValidWorld();
    const graph = getValidGraph(world);
    // Tamper with graph hero ID so it does not match world.hero.id
    graph.entities[0].id = 'unauthorized_different_hero';
    graph.transformations[0].sourceEntityIds = ['unauthorized_different_hero'];

    MotionGraphCompiler.compileCinematicGraph(graph);
    console.error('FAIL: compileCinematicGraph did NOT throw on Hero ID mismatch!');
    allPassed = false;
  } catch (err: any) {
    if (err.code === 'V8_HERO_MISMATCH') {
      console.log(`[PASS] N3: compileCinematicGraph blocked with V8_HERO_MISMATCH`);
    } else {
      console.error(`FAIL: Expected V8_HERO_MISMATCH, got ${err.code}: ${err.message}`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // NEGATIVE TEST N4: Ambiguous Art Direction -> VISUAL_DIRECTION_AMBIGUOUS
  // --------------------------------------------------------------------------
  console.log('\n--- TEST N4: AMBIGUOUS ART DIRECTION ---');
  try {
    const world = getValidWorld();
    // Tamper with artDirection to inject ungrounded buzzword
    world.artDirection.visualStyle = 'cinematic'; // Pure buzzword

    const graph = getValidGraph(world);
    MotionGraphCompiler.compileCinematicGraph(graph);
    console.error('FAIL: compileCinematicGraph did NOT throw on ambiguous art direction!');
    allPassed = false;
  } catch (err: any) {
    if (err.code === 'VISUAL_DIRECTION_AMBIGUOUS') {
      console.log(`[PASS] N4: compileCinematicGraph blocked with VISUAL_DIRECTION_AMBIGUOUS`);
    } else {
      console.error(`FAIL: Expected VISUAL_DIRECTION_AMBIGUOUS, got ${err.code}: ${err.message}`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // NEGATIVE TEST N5: Direct Motion Bypass Attempt -> VISUAL_WORLD_REQUIRED
  // --------------------------------------------------------------------------
  console.log('\n--- TEST N5: DIRECT MOTION BYPASS ATTEMPT ---');
  try {
    // Attempting Phase-4 path: Natural Intent -> MotionPlanner -> compileCinematicGraph
    const rawPhase4Graph = MotionPlanner.planFromNaturalIntent(
      'A glowing central core accumulates energy, expands radially'
    );
    // Graph created without visualWorld attached
    MotionGraphCompiler.compileCinematicGraph(rawPhase4Graph);
    console.error('FAIL: Direct motion bypass was allowed into cinematic compiler!');
    allPassed = false;
  } catch (err: any) {
    if (err.code === 'VISUAL_WORLD_REQUIRED') {
      console.log(`[PASS] N5: Direct motion bypass strictly intercepted with VISUAL_WORLD_REQUIRED`);
    } else {
      console.error(`FAIL: Expected VISUAL_WORLD_REQUIRED, got ${err.code}: ${err.message}`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // POSITIVE TEST: Full Cinematic Director Pipeline
  // --------------------------------------------------------------------------
  console.log('\n--- POSITIVE TEST: FULL CINEMATIC DIRECTOR PIPELINE ---');
  try {
    // 1. Creative Intent -> Visual World Planning
    const visualWorld = VisualWorldPlanner.planFromNaturalIntent(
      'A supermassive black hole with relativistic accretion disk, bipolar plasma jets, and gravitationally lensed stars.'
    );
    // 2. Visual World Validation
    const worldReport = VisualWorldValidator.validate(visualWorld);
    if (!worldReport.passed) {
      throw new Error(`VisualWorld validation failed: ${worldReport.violations[0].message}`);
    }

    // 3. Motion Planning with bound Visual World
    const motionGraph = MotionPlanner.planCinematicSceneFromNaturalLanguage(
      'Central singularity accumulates energy and expands radially outwards',
      visualWorld
    );

    // 4. Cinematic Graph Compilation (Passes through Hard-Gate)
    const compiledScene = MotionGraphCompiler.compileCinematicGraph(motionGraph);

    // 5. AST Motion Validator Verification on PersistentWorld code
    const sampleCode = `
      import React from 'react';
      import { PersistentWorld, PersistentHeroEntity } from '../src/motion/grammar/PersistentWorld';
      // Compiled with MotionGraphCompiler.compileCinematicGraph
      export const CinematicScene = () => (
        <PersistentWorld contracts={compiledScene.contracts}>
          <PersistentHeroEntity contract={compiledScene.contracts[0]} render={(state) => (
            <div style={{ transform: \`translate3d(\${state.position.x}px, \${state.position.y}px, 0px) scale(\${state.scale})\` }}>
              Singularity Core
            </div>
          )} />
        </PersistentWorld>
      );
    `;
    const astReport = new AstMotionValidator('CinematicScene.tsx', sampleCode).validate();

    const isPositiveValid =
      compiledScene.contracts.length > 0 &&
      compiledScene.entities[0].id === visualWorld.hero.id &&
      astReport.passed;

    console.log(`[DEBUG POS]: contracts=${compiledScene.contracts.length}, entityHero=${compiledScene.entities[0]?.id}, worldHero=${visualWorld.hero.id}, astPassed=${astReport.passed}`);
    if (!astReport.passed) {
      console.log('[DEBUG POS AST VIOLATIONS]:', astReport.violations);
    }

    if (isPositiveValid) {
      console.log(`[PASS] POS: Full Cinematic Pipeline completed successfully:`);
      console.log(`       - VisualWorld: "${visualWorld.worldId}" validated (Rules V1-V8)`);
      console.log(`       - Hero ID Bound: "${visualWorld.hero.id}"`);
      console.log(`       - Motion Contracts: ${compiledScene.contracts.length} compiled`);
      console.log(`       - AST Validator: ${astReport.passed ? 'PASSED' : 'FAILED'}`);
    } else {
      console.error('FAIL: Positive pipeline validation checks failed.');
      allPassed = false;
    }
  } catch (err: any) {
    console.error(`FAIL in Positive Test: ${err.message}`);
    allPassed = false;
  }

  // --------------------------------------------------------------------------
  // BACKWARD COMPATIBILITY TEST: Legacy Low-Level API
  // --------------------------------------------------------------------------
  console.log('\n--- BACKWARD COMPATIBILITY TEST: LEGACY LOW-LEVEL API ---');
  try {
    // Calling legacy compileGraph on a graph WITHOUT visualWorld
    const legacyGraph = getValidGraph(undefined);
    delete legacyGraph.visualWorld;
    const compiledLegacy = MotionGraphCompiler.compileGraph(legacyGraph);

    if (compiledLegacy && compiledLegacy.contracts.length === 1) {
      console.log(`[PASS] BC: Legacy compileGraph operates normally without visualWorld (100% backward compatible)`);
    } else {
      console.error('FAIL: Legacy compileGraph failed to compile valid legacy graph.');
      allPassed = false;
    }
  } catch (err: any) {
    console.error(`FAIL in Backward Compatibility Test: ${err.message}`);
    allPassed = false;
  }

  console.log('\n================================================================');
  if (allPassed) {
    console.log('PHASE 5A.1 HARD-GATE SUITE: ALL TESTS PASSED (100%)');
  } else {
    console.error('PHASE 5A.1 HARD-GATE SUITE: ONE OR MORE TESTS FAILED');
    process.exit(1);
  }
  console.log('================================================================');
}

if (require.main === module) {
  runPhase5A1HardGateSuite();
}
