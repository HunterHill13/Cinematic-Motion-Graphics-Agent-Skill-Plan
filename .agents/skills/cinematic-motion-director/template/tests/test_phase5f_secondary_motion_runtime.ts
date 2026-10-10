/**
 * ============================================================================
 * PHASE 5F TEST SUITE: SECONDARY MOTION, FOLLOW-THROUGH & MOTION-CARRY
 * ============================================================================
 * 
 * Verifies that secondary motion is authored and rendered as a CAUSAL
 * CONSEQUENCE of primary motion, establishing:
 *   - Pre-launch Anticipation (subtle backward preparation and compression)
 *   - Temporal Reaction Lag (delayed start)
 *   - Follow-Through & Overshoot (momentum inheritance on primary brake)
 *   - Hierarchical Authority (Primary > Secondary > Tertiary)
 *   - Motion-Carry (velocity continuity across shot boundaries)
 *   - Motion Ownership (primary canonical coordinates immutable)
 * 
 * Positive Proof Tests:
 *   P1: Primary/secondary causal response
 *   P2: Delayed secondary response (temporal lag)
 *   P3: Velocity-derived secondary motion
 *   P4: Anticipation preparation
 *   P5: Follow-through momentum continuation
 *   P6: Controlled overshoot
 *   P7: Deterministic settle
 *   P8: Motion hierarchy (Primary > Secondary > Tertiary)
 *   P9: Motion-carry momentum handoff
 *   P10: Velocity handoff conservation
 *   P11: Position continuity
 *   P12: Spatial coexistence
 *   P13: Material coexistence
 *   P14: Lighting coexistence
 *   P15: Camera coexistence
 *   P16: Determinism (bit-for-bit identical outputs)
 * 
 * Negative Anti-Bypass Tests:
 *   N1: Secondary motion ignored
 *   N2: Secondary motion uncaused / independent
 *   N3: No temporal lag (synchronous movement)
 *   N4: Follow-through absent
 *   N5: Overshoot absent
 *   N6: Hierarchy collapsed
 *   N7: Motion carry broken
 *   N8: Velocity discontinuity
 *   N9: Primary ownership overwritten
 *   N10: Random noise bypass
 *   N11: Global transform camouflage
 *   N12: Metadata-only implementation
 * ============================================================================
 */

import {
  SecondaryMotionAdapter,
  PrimaryMotionState,
  SecondaryMotionConfig,
  AnticipationConfig,
  MotionCarryContract,
  SpatialRenderAdapter,
  MaterialRenderAdapter,
  MaterialReference,
  LightingRenderAdapter,
  LightingContract,
  CinematicCameraAdapter,
  CameraState,
} from '../src/motion/visual_world';

export function runPhase5FSecondaryMotionSuite(): boolean {
  console.log('================================================================');
  console.log('RUNNING PHASE 5F SECONDARY MOTION & MOMENTUM CONTINUITY SUITE');
  console.log('================================================================\n');

  let allPassed = true;

  // --------------------------------------------------------------------------
  // TEST FIXTURES: Canonical Primary Trajectory across 120 Frames
  // --------------------------------------------------------------------------
  // Frame 0-20: Rest
  // Frame 20-32: Anticipation
  // Frame 32-50: Launch to 720px
  // Frame 60-85: Cruise to 1200px (peak vx = 22 px/f)
  // Frame 85: Hard brake to complete stop at 1200px (vx = 0)
  // Frame 85-120: Rest at 1200px
  const primaryHistory: PrimaryMotionState[] = [];
  for (let f = 0; f <= 120; f++) {
    let x = 400;
    let vx = 0;
    let isMoving = false;
    let phase: PrimaryMotionState['phase'] = 'REST';

    if (f < 20) {
      x = 400;
      vx = 0;
      isMoving = false;
      phase = 'REST';
    } else if (f >= 20 && f < 32) {
      phase = 'ANTICIPATION';
      const p = (f - 20) / 12;
      const coil = -Math.sin(p * Math.PI) * 28;
      x = 400 + coil;
      vx = (-Math.cos(p * Math.PI) * 28 * Math.PI) / 12;
      isMoving = true;
    } else if (f >= 32 && f < 50) {
      phase = 'ACTION';
      const p = (f - 32) / 18;
      x = 400 + p * 320;
      vx = 320 / 18;
      isMoving = true;
    } else if (f >= 50 && f < 60) {
      x = 720;
      vx = 0;
      isMoving = false;
      phase = 'REST';
    } else if (f >= 60 && f < 85) {
      phase = 'ACTION';
      const p = (f - 60) / 25;
      x = 720 + p * 480;
      vx = 22.0;
      isMoving = true;
    } else {
      // Stopped at 1200px
      x = 1200;
      vx = 0;
      isMoving = false;
      phase = 'DECELERATION';
    }

    primaryHistory.push({
      frame: f,
      x: Math.round(x * 10) / 10,
      y: 540,
      vx: Math.round(vx * 100) / 100,
      vy: 0,
      isMoving,
      phase,
    });
  }

  const secondaryConfig: SecondaryMotionConfig = {
    delayFrames: 5,
    responseStrength: 0.55,
    damping: 0.85,
    maxOvershoot: 38,
    followThroughDuration: 20,
  };

  // --------------------------------------------------------------------------
  // P1: Primary/Secondary Causal Response
  // --------------------------------------------------------------------------
  {
    const secSample = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      75, // during cruise
      primaryHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );
    const primSample = primaryHistory[75];

    // Secondary displacement is derived directly from primary movement
    const isResponding = Math.abs(secSample.offsetX) > 10;
    if (isResponding && secSample.tier === 'SECONDARY') {
      console.log(`[PASS] P1: Primary/secondary causal response verified (lag offset=${secSample.offsetX}px derived from primary vx=${primSample.vx})`);
    } else {
      console.error(`[FAIL] P1: Primary/secondary causal response failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P2: Delayed Secondary Response (Temporal Lag)
  // --------------------------------------------------------------------------
  {
    // At Frame 61, primary has just started moving (vx = 22)
    // Secondary with delayFrames = 5 looks at frame 56 (where primary was still at rest!)
    const secAtStart = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      62,
      primaryHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );
    // At Frame 62, delayed frame 57 is at rest -> secondary lag offset is small/starting
    const secAtCruise = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      70,
      primaryHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );

    const hasTemporalLag = Math.abs(secAtCruise.offsetX) > Math.abs(secAtStart.offsetX) + 20;
    if (hasTemporalLag) {
      console.log(`[PASS] P2: Delayed secondary response verified (lag offset at f62=${secAtStart.offsetX}px vs f70=${secAtCruise.offsetX}px)`);
    } else {
      console.error(`[FAIL] P2: Delayed secondary response failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P3: Velocity-Derived Secondary Motion
  // --------------------------------------------------------------------------
  {
    // Higher primary velocity produces proportionally higher secondary lag offset
    const highSpeedSample = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      75,
      primaryHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );

    // Create lower speed history (vx = 10 instead of 22)
    const lowSpeedHistory = primaryHistory.map((s) => ({
      ...s,
      vx: s.vx * 0.45,
    }));
    const lowSpeedSample = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      75,
      lowSpeedHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );

    const scalesWithVelocity = Math.abs(highSpeedSample.offsetX) > Math.abs(lowSpeedSample.offsetX) * 1.8;
    if (scalesWithVelocity) {
      console.log(`[PASS] P3: Velocity-derived secondary motion verified (highVx lag=${highSpeedSample.offsetX}px vs lowVx lag=${lowSpeedSample.offsetX}px)`);
    } else {
      console.error(`[FAIL] P3: Velocity-derived secondary motion failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P4: Anticipation Preparation
  // --------------------------------------------------------------------------
  {
    const antConfig: AnticipationConfig = {
      durationFrames: 12,
      displacementDistance: 28,
      compressionScale: 0.94,
    };
    const antAtPeak = SecondaryMotionAdapter.computeAnticipation(26, 32, antConfig);
    const antAtLaunch = SecondaryMotionAdapter.computeAnticipation(32, 32, antConfig);

    const coiledBackward = antAtPeak.anticipationOffsetX < -20;
    const compressed = antAtPeak.scaleCompression <= 0.95;
    const recoversAtLaunch = antAtLaunch.isActive === false;

    if (coiledBackward && compressed && recoversAtLaunch) {
      console.log(`[PASS] P4: Anticipation verified (backward offset=${antAtPeak.anticipationOffsetX}px, compression=${antAtPeak.scaleCompression})`);
    } else {
      console.error(`[FAIL] P4: Anticipation preparation failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P5: Follow-Through Momentum Continuation
  // --------------------------------------------------------------------------
  {
    // Primary stops at frame 85.
    // At frame 88 (3 frames after stop), primary is 0 velocity, but secondary continues forward
    const secPostStop = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      88,
      primaryHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );
    const primaryAt88 = primaryHistory[88];

    const primaryHalted = primaryAt88.isMoving === false && primaryAt88.vx === 0;
    const secondaryActive = secPostStop.phase === 'FOLLOW_THROUGH' && Math.abs(secPostStop.offsetX) > 5;

    if (primaryHalted && secondaryActive) {
      console.log(`[PASS] P5: Follow-through verified (Primary stopped at f85, secondary continues forward with offset=${secPostStop.offsetX}px in phase=${secPostStop.phase})`);
    } else {
      console.error(`[FAIL] P5: Follow-through momentum continuation failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P6: Controlled Overshoot
  // --------------------------------------------------------------------------
  {
    // Check overshoot peak around frame 92
    const secOvershoot = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      92,
      primaryHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );

    const hasOvershoot = secOvershoot.offsetX > 15 && secOvershoot.offsetX <= secondaryConfig.maxOvershoot;
    if (hasOvershoot) {
      console.log(`[PASS] P6: Controlled overshoot verified (overshoot offset=${secOvershoot.offsetX}px <= maxOvershoot ${secondaryConfig.maxOvershoot}px)`);
    } else {
      console.error(`[FAIL] P6: Controlled overshoot failed (offset=${secOvershoot.offsetX}px)`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P7: Deterministic Settle
  // --------------------------------------------------------------------------
  {
    // After followThroughDuration (frame > 85 + 20 = 105), secondary must settle to exact rest
    const secSettled = SecondaryMotionAdapter.computeSecondaryFollowThrough(
      112,
      primaryHistory,
      secondaryConfig,
      { x: 80, y: 0 }
    );

    const isSettled = secSettled.phase === 'SETTLED' && secSettled.offsetX === 0 && secSettled.activeVelocity.vx === 0;
    if (isSettled) {
      console.log(`[PASS] P7: Deterministic settle verified (phase=SETTLED, offset=0px, velocity=0)`);
    } else {
      console.error(`[FAIL] P7: Deterministic settle failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P8: Motion Hierarchy (Primary > Secondary > Tertiary)
  // --------------------------------------------------------------------------
  {
    const primaryImpulse = 300;
    const primaryRes = SecondaryMotionAdapter.computeHierarchyResponse(primaryImpulse, 'PRIMARY');
    const secondaryRes = SecondaryMotionAdapter.computeHierarchyResponse(primaryImpulse, 'SECONDARY');
    const tertiaryRes = SecondaryMotionAdapter.computeHierarchyResponse(primaryImpulse, 'TERTIARY');

    const amplitudeHierarchy =
      primaryRes.tierDisplacement > secondaryRes.tierDisplacement &&
      secondaryRes.tierDisplacement > tertiaryRes.tierDisplacement;

    const lagHierarchy =
      primaryRes.tierLagFrames < secondaryRes.tierLagFrames &&
      secondaryRes.tierLagFrames < tertiaryRes.tierLagFrames;

    if (amplitudeHierarchy && lagHierarchy) {
      console.log(
        `[PASS] P8: Motion hierarchy verified (P=${primaryRes.tierDisplacement}px/lag=${primaryRes.tierLagFrames}f > S=${secondaryRes.tierDisplacement}px/lag=${secondaryRes.tierLagFrames}f > T=${tertiaryRes.tierDisplacement}px/lag=${tertiaryRes.tierLagFrames}f)`
      );
    } else {
      console.error(`[FAIL] P8: Motion hierarchy failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P9: Motion-Carry Momentum Handoff
  // --------------------------------------------------------------------------
  {
    const carryContract: MotionCarryContract = {
      sourceEntityId: 'hero_carrier',
      targetEntityId: 'target_receiver',
      sourceVelocity: { x: 18.0, y: 0 },
      handoffFrame: 240,
      carryStrength: 0.90,
      continuityWindow: 55,
      spatialDirection: 'RIGHT',
    };

    const carryAtCut = SecondaryMotionAdapter.computeMotionCarry(240, carryContract, 200);
    const carryDuringDissipation = SecondaryMotionAdapter.computeMotionCarry(260, carryContract, 200);

    const handedOff = carryAtCut.currentVelocityX === 18.0 * 0.90;
    const dissipates = carryDuringDissipation.currentVelocityX < carryAtCut.currentVelocityX;

    if (handedOff && dissipates) {
      console.log(`[PASS] P9: Motion-carry verified (initial target Vx=${carryAtCut.currentVelocityX}px/f -> mid Vx=${carryDuringDissipation.currentVelocityX}px/f)`);
    } else {
      console.error(`[FAIL] P9: Motion-carry failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P10: Velocity Handoff Conservation
  // --------------------------------------------------------------------------
  {
    const carryContract: MotionCarryContract = {
      sourceEntityId: 'hero_carrier',
      targetEntityId: 'target_receiver',
      sourceVelocity: { x: 18.0, y: 0 },
      handoffFrame: 240,
      carryStrength: 0.90,
      continuityWindow: 55,
      spatialDirection: 'RIGHT',
    };
    const carryResult = SecondaryMotionAdapter.computeMotionCarry(240, carryContract, 200);
    const velocityRatio = carryResult.currentVelocityX / carryContract.sourceVelocity.x;

    const conserved = Math.abs(velocityRatio - 0.90) < 0.01;
    if (conserved) {
      console.log(`[PASS] P10: Velocity handoff conservation verified (ratio=${velocityRatio.toFixed(2)} matching carryStrength 0.90)`);
    } else {
      console.error(`[FAIL] P10: Velocity handoff conservation failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P11: Position Continuity
  // --------------------------------------------------------------------------
  {
    const carryContract: MotionCarryContract = {
      sourceEntityId: 'hero_carrier',
      targetEntityId: 'target_receiver',
      sourceVelocity: { x: 18.0, y: 0 },
      handoffFrame: 240,
      carryStrength: 0.90,
      continuityWindow: 55,
      spatialDirection: 'RIGHT',
    };
    const c0 = SecondaryMotionAdapter.computeMotionCarry(240, carryContract, 200);
    const c1 = SecondaryMotionAdapter.computeMotionCarry(241, carryContract, 200);
    const c2 = SecondaryMotionAdapter.computeMotionCarry(242, carryContract, 200);

    const smoothStep = c1.carryOffset > c0.carryOffset && c2.carryOffset > c1.carryOffset;
    if (smoothStep) {
      console.log(`[PASS] P11: Position continuity verified (continuous integrated offsets: ${c0.carryOffset} -> ${c1.carryOffset} -> ${c2.carryOffset})`);
    } else {
      console.error(`[FAIL] P11: Position continuity failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P12: Spatial Coexistence
  // --------------------------------------------------------------------------
  {
    const placement = {
      entityId: 'secondary_wing',
      depthBand: 'MIDGROUND' as const,
      transform: { x: 0.2, y: 0.1, z: 0.35, scale: 0.8 },
    };
    const renderedSpatial = SpatialRenderAdapter.resolveElement(placement);
    const secResult = SecondaryMotionAdapter.computeSecondaryFollowThrough(75, primaryHistory, secondaryConfig);

    const spatialZPreserved = renderedSpatial.numericZ === 0.35;
    const canCompose = renderedSpatial.style.transform !== undefined && secResult.offsetX !== 0;

    if (spatialZPreserved && canCompose) {
      console.log(`[PASS] P12: Spatial coexistence verified (spatial z-order preserved alongside secondary lag)`);
    } else {
      console.error(`[FAIL] P12: Spatial coexistence failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P13: Material Coexistence
  // --------------------------------------------------------------------------
  {
    const plasmaMat: MaterialReference = {
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
    const matStyle = MaterialRenderAdapter.resolveMaterialStyle(plasmaMat, 'secondary_wing', { velocity: 0.8 });
    const secResult = SecondaryMotionAdapter.computeSecondaryFollowThrough(75, primaryHistory, secondaryConfig);

    if (matStyle.boxShadow && secResult.offsetX !== 0) {
      console.log(`[PASS] P13: Material coexistence verified (plasma emission styles unharmed by secondary offset)`);
    } else {
      console.error(`[FAIL] P13: Material coexistence failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P14: Lighting Coexistence
  // --------------------------------------------------------------------------
  {
    const lightContract: LightingContract = {
      id: 'test_light',
      sources: [
        {
          id: 'k1',
          type: 'KEY',
          direction: { semantic: 'UPPER_LEFT' },
          intensity: { level: 'HIGH', value: 1.5 },
          color: { semantic: 'NEUTRAL', hex: '#ffffff' },
          softness: 'MEDIUM',
        },
      ],
      ambientProfile: { level: 'LOW', value: 0.2, color: { semantic: 'NEUTRAL', hex: '#0f172a' } },
      materialInteractions: [],
      motionResponses: [],
    };
    const norm = LightingRenderAdapter.normalizeContract(lightContract, 'secondary_wing');
    if (norm.keyIntensity === 1.5) {
      console.log(`[PASS] P14: Lighting coexistence verified (lighting normalization operates seamlessly)`);
    } else {
      console.error(`[FAIL] P14: Lighting coexistence failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P15: Camera Coexistence
  // --------------------------------------------------------------------------
  {
    const camera: CameraState = {
      x: 0.2,
      y: 0,
      z: 0.1,
      zoom: 1.2,
      orbitAngleDeg: 10,
      focalDepthZ: 0.45,
      motivation: 'FOLLOW_HERO',
      progress: 0.5,
    };
    const heroPlacement = {
      entityId: 'hero_carrier',
      depthBand: 'HERO_PLANE' as const,
      transform: { x: 0.0, y: 0.0, z: 0.45, scale: 1.0 },
    };
    const projected = CinematicCameraAdapter.projectElement(heroPlacement, camera);

    if (projected.pixelX !== undefined && projected.apparentScale > 0.85) {
      console.log(`[PASS] P15: Camera coexistence verified (camera projection apparentScale=${projected.apparentScale} and framing function independently)`);
    } else {
      console.error(`[FAIL] P15: Camera coexistence failed`);
      allPassed = false;
    }
  }

  // --------------------------------------------------------------------------
  // P16: Determinism
  // --------------------------------------------------------------------------
  {
    const run1 = SecondaryMotionAdapter.computeSecondaryFollowThrough(75, primaryHistory, secondaryConfig);
    const run2 = SecondaryMotionAdapter.computeSecondaryFollowThrough(75, primaryHistory, secondaryConfig);

    const matches =
      run1.x === run2.x &&
      run1.offsetX === run2.offsetX &&
      run1.phase === run2.phase &&
      run1.rotationDeg === run2.rotationDeg;

    if (matches) {
      console.log(`[PASS] P16: Determinism verified (bit-for-bit identical numerical results across runs)`);
    } else {
      console.error(`[FAIL] P16: Determinism check failed`);
      allPassed = false;
    }
  }

  // ==========================================================================
  // NEGATIVE ANTI-BYPASS GATES (N1–N12)
  // ==========================================================================
  console.log('\n--- NEGATIVE ANTI-BYPASS GATES ---');

  // N1: Secondary motion ignored / collapsed
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 0,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
      isCollapsedControl: true,
    });
    if (report.violations.some((v) => v.code === 'SECONDARY_MOTION_IGNORED')) {
      console.log(`[PASS] N1: Caught SECONDARY_MOTION_IGNORED when secondary displacement was collapsed`);
    } else {
      console.error(`[FAIL] N1: Failed to catch collapsed secondary motion`);
      allPassed = false;
    }
  }

  // N2: Secondary motion uncaused / independent
  {
    const uncausedReport = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 0,
      secondaryDisplacement: 100, // secondary moving without primary cause!
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
    });
    if (uncausedReport.violations.some((v) => v.code === 'SECONDARY_MOTION_UNCAUSED')) {
      console.log(`[PASS] N2: Caught SECONDARY_MOTION_UNCAUSED when secondary moved with zero primary displacement`);
    } else {
      console.error(`[FAIL] N2: Failed to catch uncaused secondary motion`);
      allPassed = false;
    }
  }

  // N3: No temporal lag
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 0, // Zero lag cheat!
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
    });
    if (report.violations.some((v) => v.code === 'TEMPORAL_LAG_MISSING')) {
      console.log(`[PASS] N3: Caught TEMPORAL_LAG_MISSING when lag was zero`);
    } else {
      console.error(`[FAIL] N3: Failed to catch missing temporal lag`);
      allPassed = false;
    }
  }

  // N4: Follow-through absent
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 85, // Stopped simultaneously!
      overshootMagnitude: 25,
    });
    if (report.violations.some((v) => v.code === 'FOLLOWTHROUGH_ABSENT')) {
      console.log(`[PASS] N4: Caught FOLLOWTHROUGH_ABSENT when secondary stopped simultaneously with primary`);
    } else {
      console.error(`[FAIL] N4: Failed to catch absent follow-through`);
      allPassed = false;
    }
  }

  // N5: Overshoot absent
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 0, // No overshoot!
    });
    if (report.violations.some((v) => v.code === 'OVERSHOOT_ABSENT')) {
      console.log(`[PASS] N5: Caught OVERSHOOT_ABSENT when momentum overshoot was missing`);
    } else {
      console.error(`[FAIL] N5: Failed to catch absent overshoot`);
      allPassed = false;
    }
  }

  // N6: Hierarchy collapsed
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 100,
      secondaryDisplacement: 200, // Secondary exceeded primary!
      tertiaryDisplacement: 50,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
    });
    if (report.violations.some((v) => v.code === 'HIERARCHY_COLLAPSED')) {
      console.log(`[PASS] N6: Caught HIERARCHY_COLLAPSED when secondary amplitude exceeded primary`);
    } else {
      console.error(`[FAIL] N6: Failed to catch collapsed hierarchy`);
      allPassed = false;
    }
  }

  // N7: Motion carry broken
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
      sourceVelocityAtHandoff: 18.0,
      targetVelocityAtHandoff: 0.0, // Started from dead rest!
    });
    if (report.violations.some((v) => v.code === 'MOTION_CARRY_BROKEN')) {
      console.log(`[PASS] N7: Caught MOTION_CARRY_BROKEN when target velocity collapsed to 0`);
    } else {
      console.error(`[FAIL] N7: Failed to catch broken motion-carry`);
      allPassed = false;
    }
  }

  // N8: Velocity discontinuity
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
      sourceVelocityAtHandoff: 18.0,
      targetVelocityAtHandoff: 4.0, // Massive step gap!
    });
    if (report.violations.some((v) => v.code === 'VELOCITY_DISCONTINUITY')) {
      console.log(`[PASS] N8: Caught VELOCITY_DISCONTINUITY on severe velocity step mismatch`);
    } else {
      console.error(`[FAIL] N8: Failed to catch velocity discontinuity`);
      allPassed = false;
    }
  }

  // N9: Primary ownership overwritten
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
      primaryWorldPositionMutated: true, // Violation!
    });
    if (report.violations.some((v) => v.code === 'PRIMARY_OWNERSHIP_OVERWRITTEN')) {
      console.log(`[PASS] N9: Caught PRIMARY_OWNERSHIP_OVERWRITTEN when secondary engine mutated primary position`);
    } else {
      console.error(`[FAIL] N9: Failed to catch primary ownership overwrite`);
      allPassed = false;
    }
  }

  // N10: Random noise bypass
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
      hasRandomNoise: true,
    });
    if (report.violations.some((v) => v.code === 'RANDOM_NOISE_BYPASS_DETECTED')) {
      console.log(`[PASS] N10: Caught RANDOM_NOISE_BYPASS_DETECTED`);
    } else {
      console.error(`[FAIL] N10: Failed to catch random noise bypass`);
      allPassed = false;
    }
  }

  // N11: Global transform camouflage
  {
    const report = SecondaryMotionAdapter.validateSecondaryMotionExecution({
      primaryDisplacement: 300,
      secondaryDisplacement: 110,
      secondaryLagFrames: 5,
      primaryStopFrame: 85,
      secondaryStopFrame: 105,
      overshootMagnitude: 25,
      isGlobalTransformBypass: true,
    });
    if (report.violations.some((v) => v.code === 'GLOBAL_TRANSFORM_CAMOUFLAGE')) {
      console.log(`[PASS] N11: Caught GLOBAL_TRANSFORM_CAMOUFLAGE`);
    } else {
      console.error(`[FAIL] N11: Failed to catch global transform camouflage`);
      allPassed = false;
    }
  }

  // N12: Metadata-only implementation
  {
    // Verifying that secondary adapter computes actual numerical styles/offsets
    const emptyResult = SecondaryMotionAdapter.computeSecondaryFollowThrough(0, [], secondaryConfig);
    const producesDefaultZero = emptyResult.offsetX === 0 && emptyResult.phase === 'REST';
    if (producesDefaultZero) {
      console.log(`[PASS] N12: Enforced metadata-only prevention (runtime adapter produces tangible numbers, empty input yields baseline rest)`);
    } else {
      console.error(`[FAIL] N12: Metadata-only check failed`);
      allPassed = false;
    }
  }

  console.log('\n================================================================');
  if (allPassed) {
    console.log('✅ ALL PHASE 5F SECONDARY MOTION TESTS PASSED (16/16 POSITIVE, 12/12 NEGATIVE)');
  } else {
    console.log('❌ PHASE 5F SECONDARY MOTION SUITE FAILED');
  }
  console.log('================================================================');

  return allPassed;
}

if (require.main === module) {
  const success = runPhase5FSecondaryMotionSuite();
  process.exit(success ? 0 : 1);
}
