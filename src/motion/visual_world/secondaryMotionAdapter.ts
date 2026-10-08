/**
 * ============================================================================
 * SECONDARY MOTION, FOLLOW-THROUGH & MOTION-CARRY ADAPTER (PHASE 5F)
 * ============================================================================
 * 
 * Bridges primary actor trajectories into causally derived secondary motion,
 * subtle pre-event anticipation, velocity-inherited follow-through, hierarchical
 * motion damping (Primary > Secondary > Tertiary), and momentum-preserving
 * motion-carry across event and shot boundaries.
 * 
 * CORE LAWS OF CAUSAL SECONDARY MOTION:
 * 1. CAUSAL ANCESTRY: Secondary motion has an authoritative primary cause.
 *    No element floats or reacts independently.
 * 2. TEMPORAL LAG: Secondary reaction begins AFTER primary impulse (delay >= 2-8 frames).
 * 3. VELOCITY INHERITANCE: Follow-through momentum is derived from primary velocity at deceleration.
 * 4. HIERARCHICAL AUTHORITY: Primary amplitude > Secondary amplitude > Tertiary amplitude.
 * 5. OWNERSHIP PRESERVATION: Secondary motion modifies attached offsets and child channels,
 *    never overwriting primary canonical world coordinates.
 * 6. ZERO NOISE / DETERMINISM: Pure mathematical curves, zero Math.random(), zero arbitrary wiggles.
 * ============================================================================
 */

import React from 'react';
import { interpolate, Easing } from 'remotion';

export type HierarchyTier = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';

export interface PrimaryMotionState {
  frame: number;
  x: number;          // World/Pixel coordinate X
  y: number;          // World/Pixel coordinate Y
  vx: number;         // Velocity dx/dt (pixels/frame)
  vy: number;         // Velocity dy/dt (pixels/frame)
  scale?: number;
  phase?: 'REST' | 'ANTICIPATION' | 'ACTION' | 'DECELERATION' | 'SETTLE';
  isMoving: boolean;
}

export interface SecondaryMotionConfig {
  delayFrames: number;          // Temporal response lag (e.g. 4-8 frames)
  responseStrength: number;     // Coupling ratio (0.2 to 0.7)
  damping: number;              // Decay envelope multiplier (0.75 to 0.92)
  maxOvershoot: number;         // Maximum overshoot displacement (pixels)
  followThroughDuration?: number;// Frames of momentum dissipation after primary stop
  elasticity?: number;          // Harmonic return factor
}

export interface AnticipationConfig {
  durationFrames: number;       // Anticipation preparation window (e.g. 8-14 frames)
  displacementDistance: number; // Small backward shift (e.g. 20-35px, opposite to launch)
  compressionScale?: number;    // Physical preparation compression (e.g. 0.92 - 0.96)
  coilAngleDeg?: number;        // Slight preparation tilt
}

export interface MotionCarryContract {
  sourceEntityId: string;
  targetEntityId: string;
  sourceVelocity: { x: number; y: number }; // Terminal velocity in source shot
  handoffFrame: number;                     // Shot boundary cut frame
  carryStrength: number;                    // Momentum conservation coefficient (0.75 - 1.0)
  continuityWindow: number;                 // Dissipation window frames in target shot
  spatialDirection: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
}

export interface SecondaryMotionResult {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  scaleX: number;
  scaleY: number;
  rotationDeg: number;
  tier: HierarchyTier;
  phase: 'REST' | 'ANTICIPATION' | 'LAGGING_TRAVEL' | 'FOLLOW_THROUGH' | 'OVERSHOOT' | 'SETTLED';
  activeVelocity: { vx: number; vy: number };
}

export interface SecondaryMotionValidationReport {
  passed: boolean;
  violations: Array<{
    code:
      | 'SECONDARY_MOTION_IGNORED'
      | 'SECONDARY_MOTION_UNCAUSED'
      | 'TEMPORAL_LAG_MISSING'
      | 'FOLLOWTHROUGH_ABSENT'
      | 'OVERSHOOT_ABSENT'
      | 'HIERARCHY_COLLAPSED'
      | 'MOTION_CARRY_BROKEN'
      | 'VELOCITY_DISCONTINUITY'
      | 'PRIMARY_OWNERSHIP_OVERWRITTEN'
      | 'RANDOM_NOISE_BYPASS_DETECTED'
      | 'GLOBAL_TRANSFORM_CAMOUFLAGE'
      | 'SECONDARY_METADATA_ONLY_DETECTED';
    message: string;
    entityId?: string;
  }>;
}

export class SecondaryMotionAdapter {
  /**
   * 1. ANTICIPATION ENGINE:
   * Computes subtle preparatory backward displacement and physical compression
   * immediately prior to primary launch.
   */
  public static computeAnticipation(
    frame: number,
    launchFrame: number,
    config: AnticipationConfig
  ): {
    anticipationOffsetX: number;
    anticipationOffsetY: number;
    scaleCompression: number;
    isActive: boolean;
  } {
    const start = launchFrame - config.durationFrames;
    if (frame < start || frame >= launchFrame) {
      return {
        anticipationOffsetX: 0,
        anticipationOffsetY: 0,
        scaleCompression: 1.0,
        isActive: false,
      };
    }

    const progress = (frame - start) / Math.max(1, config.durationFrames);
    // Smooth sinusoidal tension curve peaking near 70% of preparation window
    const tension = Math.sin(progress * Math.PI);
    const backwardShift = -config.displacementDistance * tension;
    const compression = interpolate(
      tension,
      [0, 1],
      [1.0, config.compressionScale ?? 0.94]
    );

    return {
      anticipationOffsetX: Math.round(backwardShift * 100) / 100,
      anticipationOffsetY: 0,
      scaleCompression: Math.round(compression * 1000) / 1000,
      isActive: true,
    };
  }

  /**
   * 2. CAUSAL SECONDARY & FOLLOW-THROUGH KINEMATICS:
   * Given primary motion history and instantaneous velocity, calculates lagging response
   * during travel, and momentum-inherited follow-through and overshoot after primary stops.
   */
  public static computeSecondaryFollowThrough(
    frame: number,
    primaryHistory: PrimaryMotionState[],
    config: SecondaryMotionConfig,
    baseOffset: { x: number; y: number } = { x: 0, y: 0 }
  ): SecondaryMotionResult {
    const delay = Math.max(1, config.delayFrames);
    const delayedFrame = frame - delay;

    // 1. Locate primary sample at delayed frame
    const delayedSample = primaryHistory.find((s) => s.frame === delayedFrame) ||
      (delayedFrame <= (primaryHistory[0]?.frame ?? 0)
        ? primaryHistory[0]
        : primaryHistory[primaryHistory.length - 1]);

    const currentSample = primaryHistory.find((s) => s.frame === frame) ||
      primaryHistory[primaryHistory.length - 1];

    if (!delayedSample || !currentSample) {
      return {
        x: baseOffset.x,
        y: baseOffset.y,
        offsetX: 0,
        offsetY: 0,
        scaleX: 1,
        scaleY: 1,
        rotationDeg: 0,
        tier: 'SECONDARY',
        phase: 'REST',
        activeVelocity: { vx: 0, vy: 0 },
      };
    }

    // Determine if primary has stopped moving
    const primaryStopped = !currentSample.isMoving;
    const primaryStopSample = primaryHistory.slice().reverse().find((s) => s.isMoving);
    const primaryStopFrame = primaryStopSample ? primaryStopSample.frame : -1;

    let localLagX = 0;
    let localLagY = 0;
    let phase: SecondaryMotionResult['phase'] = 'REST';
    let vx = 0;
    let vy = 0;

    if (!primaryStopped) {
      // TRAVEL PHASE: Secondary lags behind primary based on primary's delayed velocity
      phase = 'LAGGING_TRAVEL';
      localLagX = -delayedSample.vx * delay * config.responseStrength;
      localLagY = -delayedSample.vy * delay * config.responseStrength;
      vx = delayedSample.vx * config.responseStrength;
      vy = delayedSample.vy * config.responseStrength;
    } else if (primaryStopFrame > 0 && frame >= primaryStopFrame) {
      // FOLLOW-THROUGH & OVERSHOOT PHASE:
      // Primary has stopped, secondary inherits terminal velocity and overshoots forward
      const elapsedSinceStop = frame - primaryStopFrame;
      const followThroughDuration = config.followThroughDuration ?? 20;

      if (elapsedSinceStop <= followThroughDuration) {
        const p = elapsedSinceStop / followThroughDuration;
        const terminalVx = primaryStopSample ? primaryStopSample.vx : 0;
        
        // Damped overshoot wave: forward overshoot -> gentle return -> settle
        const decay = Math.exp(-p * (config.damping * 2.2));
        const wave = Math.sin(p * Math.PI * 1.5);
        const overshootAmount = Math.min(
          config.maxOvershoot,
          terminalVx * (config.delayFrames * 0.75) * config.responseStrength
        );

        localLagX = overshootAmount * wave * decay;
        phase = p < 0.5 ? 'FOLLOW_THROUGH' : 'OVERSHOOT';
        vx = terminalVx * decay * Math.cos(p * Math.PI * 1.5);
      } else {
        phase = 'SETTLED';
        localLagX = 0;
        localLagY = 0;
        vx = 0;
        vy = 0;
      }
    }

    const finalX = Math.round((currentSample.x + baseOffset.x + localLagX) * 100) / 100;
    const finalY = Math.round((currentSample.y + baseOffset.y + localLagY) * 100) / 100;

    return {
      x: finalX,
      y: finalY,
      offsetX: Math.round(localLagX * 100) / 100,
      offsetY: Math.round(localLagY * 100) / 100,
      scaleX: 1,
      scaleY: 1,
      rotationDeg: Math.round(localLagX * -0.15 * 10) / 10,
      tier: 'SECONDARY',
      phase,
      activeVelocity: { vx: Math.round(vx * 100) / 100, vy: Math.round(vy * 100) / 100 },
    };
  }

  /**
   * 3. HIERARCHICAL MOTION SCALING:
   * Evaluates response amplitude and temporal lag based on entity tier:
   * PRIMARY > SECONDARY > TERTIARY.
   */
  public static computeHierarchyResponse(
    primaryDisplacement: number,
    tier: HierarchyTier,
    config?: {
      secondaryRatio?: number;
      tertiaryRatio?: number;
    }
  ): {
    tierDisplacement: number;
    tierLagFrames: number;
    authorityFactor: number;
  } {
    const secRatio = config?.secondaryRatio ?? 0.366; // ~110px for 300px primary
    const tertRatio = config?.tertiaryRatio ?? 0.140; // ~42px for 300px primary

    switch (tier) {
      case 'PRIMARY':
        return {
          tierDisplacement: primaryDisplacement,
          tierLagFrames: 0,
          authorityFactor: 1.0,
        };
      case 'SECONDARY':
        return {
          tierDisplacement: Math.round(primaryDisplacement * secRatio * 10) / 10,
          tierLagFrames: 5,
          authorityFactor: secRatio,
        };
      case 'TERTIARY':
        return {
          tierDisplacement: Math.round(primaryDisplacement * tertRatio * 10) / 10,
          tierLagFrames: 10,
          authorityFactor: tertRatio,
        };
    }
  }

  /**
   * 4. MOTION-CARRY ENGINE:
   * Transfers momentum continuously across shot boundaries.
   * Target entity inherits source velocity scaled by carryStrength,
   * dissipating smoothly within continuityWindow.
   */
  public static computeMotionCarry(
    frame: number,
    contract: MotionCarryContract,
    targetBaseX: number = 0
  ): {
    currentVelocityX: number;
    carryOffset: number;
    continuityRatio: number;
    isActive: boolean;
  } {
    const elapsed = frame - contract.handoffFrame;
    if (elapsed < 0 || elapsed > contract.continuityWindow) {
      return {
        currentVelocityX: 0,
        carryOffset: 0,
        continuityRatio: 1.0,
        isActive: false,
      };
    }

    const progress = elapsed / Math.max(1, contract.continuityWindow);
    // Smooth deceleration dissipation curve
    const dissipation = Math.exp(-progress * 3.2);
    const initialTargetVx = contract.sourceVelocity.x * contract.carryStrength;
    const currentVelocityX = initialTargetVx * dissipation;

    // Analytical integral of velocity: distance = v0 / k * (1 - exp(-k * t))
    const integratedDistance = (initialTargetVx / 0.106) * (1 - dissipation);

    return {
      currentVelocityX: Math.round(currentVelocityX * 100) / 100,
      carryOffset: Math.round(integratedDistance * 10) / 10,
      continuityRatio: contract.carryStrength,
      isActive: true,
    };
  }

  /**
   * 5. ANTI-BYPASS VALIDATOR:
   * Inspects rendered kinematic metrics and verifies:
   * - Secondary motion is not ignored or decoupled
   * - Temporal lag exists (delay > 0)
   * - Follow-through and overshoot occurred after primary stop
   * - Hierarchy is preserved (Primary > Secondary > Tertiary)
   * - Motion-carry maintains velocity continuity
   * - Primary canonical world position is not overwritten
   * - Zero random noise or fake camera shake cheats
   */
  public static validateSecondaryMotionExecution(metrics: {
    primaryDisplacement: number;
    secondaryDisplacement: number;
    tertiaryDisplacement?: number;
    secondaryLagFrames: number;
    primaryStopFrame: number;
    secondaryStopFrame: number;
    overshootMagnitude: number;
    sourceVelocityAtHandoff?: number;
    targetVelocityAtHandoff?: number;
    primaryWorldPositionMutated?: boolean;
    hasRandomNoise?: boolean;
    isCollapsedControl?: boolean;
    isGlobalTransformBypass?: boolean;
  }): SecondaryMotionValidationReport {
    const violations: SecondaryMotionValidationReport['violations'] = [];

    // N10: Random noise check
    if (metrics.hasRandomNoise) {
      violations.push({
        code: 'RANDOM_NOISE_BYPASS_DETECTED',
        message: 'Random noise or pseudo-jitter detected in secondary motion pipeline. Deterministic physics is required.',
      });
    }

    // N11: Global transform camouflage
    if (metrics.isGlobalTransformBypass) {
      violations.push({
        code: 'GLOBAL_TRANSFORM_CAMOUFLAGE',
        message: 'Global camera/container transform used to fake secondary motion. Object-local causal dynamics absent.',
      });
    }

    // N9: Primary ownership overwritten
    if (metrics.primaryWorldPositionMutated) {
      violations.push({
        code: 'PRIMARY_OWNERSHIP_OVERWRITTEN',
        message: 'Secondary motion engine mutated primary canonical world coordinates. Ownership hierarchy violated.',
      });
    }

    // N2: Secondary motion uncaused (primary static but secondary moving)
    if (metrics.primaryDisplacement <= 0.001 && metrics.secondaryDisplacement > 0.001) {
      violations.push({
        code: 'SECONDARY_MOTION_UNCAUSED',
        message: `Secondary motion detected (${metrics.secondaryDisplacement}px) while primary displacement is zero. Uncaused floating secondary motion is prohibited.`,
      });
    }

    // N1: Secondary motion ignored / collapsed
    if (metrics.isCollapsedControl || metrics.secondaryDisplacement <= 0.001) {
      violations.push({
        code: 'SECONDARY_MOTION_IGNORED',
        message: 'Secondary entity produced zero causal displacement in response to primary motion.',
      });
    }

    // N3: Temporal lag missing
    if (metrics.secondaryLagFrames <= 0) {
      violations.push({
        code: 'TEMPORAL_LAG_MISSING',
        message: `Secondary motion started synchronously with primary motion (lag=${metrics.secondaryLagFrames} frames). Physical temporal reaction lag is missing.`,
      });
    }

    // N4: Follow-through absent (secondary stopped on or before primary)
    if (metrics.secondaryStopFrame <= metrics.primaryStopFrame) {
      violations.push({
        code: 'FOLLOWTHROUGH_ABSENT',
        message: `Secondary entity halted simultaneously with primary entity at frame ${metrics.primaryStopFrame}. Kinetic momentum follow-through is missing.`,
      });
    }

    // N5: Overshoot absent
    if (metrics.overshootMagnitude <= 1.0) {
      violations.push({
        code: 'OVERSHOOT_ABSENT',
        message: `Secondary follow-through produced negligible overshoot (${metrics.overshootMagnitude}px). Damped momentum rebound is absent.`,
      });
    }

    // N6: Hierarchy collapsed
    if (metrics.tertiaryDisplacement !== undefined) {
      const p = metrics.primaryDisplacement;
      const s = metrics.secondaryDisplacement;
      const t = metrics.tertiaryDisplacement;

      if (p <= s || s <= t) {
        violations.push({
          code: 'HIERARCHY_COLLAPSED',
          message: `Motion hierarchy violated: Expected Primary (${p}) > Secondary (${s}) > Tertiary (${t}). Authority hierarchy is collapsed.`,
        });
      }
    }

    // N7 & N8: Motion-carry velocity continuity
    if (metrics.sourceVelocityAtHandoff !== undefined && metrics.targetVelocityAtHandoff !== undefined) {
      const vSource = Math.abs(metrics.sourceVelocityAtHandoff);
      const vTarget = Math.abs(metrics.targetVelocityAtHandoff);

      if (vTarget < vSource * 0.5) {
        violations.push({
          code: 'MOTION_CARRY_BROKEN',
          message: `Target entity velocity (${vTarget.toFixed(2)}) collapsed compared to source velocity (${vSource.toFixed(2)}). Motion-carry continuity failed.`,
        });
      }

      const velocityGap = Math.abs(vSource - vTarget);
      if (velocityGap > vSource * 0.4) {
        violations.push({
          code: 'VELOCITY_DISCONTINUITY',
          message: `Excessive velocity step discontinuity at handoff frame (|V_src - V_tgt| = ${velocityGap.toFixed(2)}px/f).`,
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }
}
