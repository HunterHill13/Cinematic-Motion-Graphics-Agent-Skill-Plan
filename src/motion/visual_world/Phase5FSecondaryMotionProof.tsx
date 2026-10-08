/**
 * ============================================================================
 * PHASE 5F: SECONDARY MOTION, FOLLOW-THROUGH & MOTION-CARRY PROOF COMPOSITION
 * ============================================================================
 * 
 * 1920x1080 @ 30 FPS - 300 Frames (10.0 seconds)
 * 
 * Demonstrates:
 *   1. Test A: Primary / Secondary Causal Response (Lagging reaction)
 *   2. Test B: Anticipation (Subtle preparatory coil & compression before launch)
 *   3. Test C: Follow-Through & Overshoot (Momentum continuation after primary brake)
 *   4. Test D: Motion Hierarchy (Primary > Secondary > Tertiary with decreasing amplitude)
 *   5. Test E: Motion-Carry (Unbroken velocity conservation across shot handoff)
 * 
 * Supports Fail-Closed Diagnostic Controls:
 *   - REAL_SECONDARY_MOTION (Production proof)
 *   - SECONDARY_COLLAPSED (Negative control: Secondary static)
 *   - ANTICIPATION_COLLAPSED (Negative control: Zero preparation)
 *   - FOLLOWTHROUGH_COLLAPSED (Negative control: Hard clamp on primary stop)
 *   - MOTION_CARRY_COLLAPSED (Negative control: Target starts from rest v=0)
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import {
  SecondaryMotionAdapter,
  PrimaryMotionState,
  SecondaryMotionConfig,
  AnticipationConfig,
  MotionCarryContract,
  HierarchyTier,
} from './secondaryMotionAdapter';
import { MaterialRenderAdapter } from './materialRenderAdapter';
import { MaterialReference } from './materialSchema';
import { LightingRenderAdapter } from './lightingRenderAdapter';
import { LightingContract } from './lightingSchema';

export interface Phase5FSecondaryMotionProofProps {
  mode?:
    | 'REAL_SECONDARY_MOTION'
    | 'SECONDARY_COLLAPSED'
    | 'ANTICIPATION_COLLAPSED'
    | 'FOLLOWTHROUGH_COLLAPSED'
    | 'MOTION_CARRY_COLLAPSED';
}

export const Phase5FSecondaryMotionProof: React.FC<Phase5FSecondaryMotionProofProps> = ({
  mode = 'REAL_SECONDARY_MOTION',
}) => {
  const frame = useCurrentFrame();

  const isSecondaryCollapsed = mode === 'SECONDARY_COLLAPSED';
  const isAnticipationCollapsed = mode === 'ANTICIPATION_COLLAPSED';
  const isFollowThroughCollapsed = mode === 'FOLLOWTHROUGH_COLLAPSED';
  const isMotionCarryCollapsed = mode === 'MOTION_CARRY_COLLAPSED';

  // --------------------------------------------------------------------------
  // MATERIALS & LIGHTING (Reusing Phase 5D & 5D.1 verified styling)
  // --------------------------------------------------------------------------
  const heroMaterial: MaterialReference = {
    id: 'mat_hero_titanium',
    name: 'Hero Specular Monolith',
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

  const secondaryMaterial: MaterialReference = {
    id: 'mat_secondary_energy',
    name: 'Secondary Radiant Wing',
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

  const tertiaryMaterial: MaterialReference = {
    id: 'mat_tertiary_orb',
    name: 'Tertiary Trailing Orb',
    category: 'GLASS',
    surfaceResponse: 'TRANSLUCENT',
    edgeResponse: 'TRANSLUCENT',
    deformationResponse: 'BRITTLE',
    lightResponse: 'REFRACTIVE',
    emission: 'WEAKLY_EMISSIVE',
    opacityBehavior: 'TRANSLUCENT',
    textureCharacter: 'SMOOTH',
    motionResponses: {},
  };

  const lightingContract: LightingContract = {
    id: 'secondary_proof_lighting',
    sources: [
      {
        id: 'key_light',
        type: 'KEY',
        direction: { semantic: 'UPPER_LEFT' },
        intensity: { level: 'HIGH', value: 1.4 },
        color: { semantic: 'NEUTRAL', hex: '#ffffff' },
        softness: 'MEDIUM',
      },
      {
        id: 'rim_light',
        type: 'RIM',
        direction: { semantic: 'BACK' },
        intensity: { level: 'HIGH', value: 1.5 },
        color: { semantic: 'CYAN', hex: '#38bdf8' },
        softness: 'HARD',
      },
    ],
    ambientProfile: { level: 'LOW', value: 0.25, color: { semantic: 'NEUTRAL', hex: '#0f172a' } },
    materialInteractions: [],
    motionResponses: [],
  };

  const normLight = LightingRenderAdapter.normalizeContract(lightingContract, 'hero_carrier');
  const heroMatStyle = MaterialRenderAdapter.resolveMaterialStyle(heroMaterial, 'hero_carrier', {}, {}, { normalizedLighting: normLight });
  const secMatStyle = MaterialRenderAdapter.resolveMaterialStyle(secondaryMaterial, 'secondary_wing', {}, {}, { normalizedLighting: normLight });
  const tertMatStyle = MaterialRenderAdapter.resolveMaterialStyle(tertiaryMaterial, 'tertiary_orb', {}, {}, { normalizedLighting: normLight });

  // --------------------------------------------------------------------------
  // PRIMARY TRAJECTORY SYNTHESIS (Canonical Ground Truth)
  // --------------------------------------------------------------------------
  // Generates complete primary history across all 300 frames for analytical lagging lookup
  const primaryHistory: PrimaryMotionState[] = [];
  for (let f = 0; f <= 300; f++) {
    let x = 400;
    let y = 540;
    let vx = 0;
    let vy = 0;
    let isMoving = false;
    let phase: PrimaryMotionState['phase'] = 'REST';

    if (f < 20) {
      // Phase 1A: Rest
      x = 400;
      vx = 0;
      isMoving = false;
      phase = 'REST';
    } else if (f >= 20 && f < 32) {
      // Phase 1B: Test B - Anticipation Preparation
      phase = 'ANTICIPATION';
      if (!isAnticipationCollapsed) {
        const p = (f - 20) / 12;
        const coil = -Math.sin(p * Math.PI) * 28;
        x = 400 + coil;
        vx = (-Math.cos(p * Math.PI) * 28 * Math.PI) / 12;
        isMoving = true;
      } else {
        x = 400;
        vx = 0;
        isMoving = false;
      }
    } else if (f >= 32 && f < 50) {
      // Phase 1C: Explosive Launch forward
      phase = 'ACTION';
      const p = (f - 32) / 18;
      const eased = Easing.bezier(0.1, 0, 0.2, 1)(p);
      x = interpolate(eased, [0, 1], [400, 720]);
      vx = (720 - 400) / 18;
      isMoving = true;
    } else if (f >= 50 && f < 60) {
      // Hold between tests
      x = 720;
      vx = 0;
      isMoving = false;
      phase = 'REST';
    } else if (f >= 60 && f < 85) {
      // Phase 2: Test A & C - Travel & Sharp Brake at frame 85
      phase = 'ACTION';
      const p = (f - 60) / 25;
      const eased = Easing.bezier(0.4, 0, 0.1, 1)(p);
      x = interpolate(eased, [0, 1], [720, 1200]);
      vx = 22 * (1 - p * 0.4); // High velocity cruise
      isMoving = true;
    } else if (f >= 85 && f < 120) {
      // Hard brake at Frame 85: Hero dead stop
      x = 1200;
      vx = 0;
      isMoving = false;
      phase = 'DECELERATION';
    } else if (f >= 120 && f < 135) {
      // Rest before Hierarchy impulse
      x = 1200;
      vx = 0;
      isMoving = false;
      phase = 'REST';
    } else if (f >= 135 && f < 165) {
      // Phase 3: Test D - Hierarchy impulse (+300px)
      phase = 'ACTION';
      const p = (f - 135) / 30;
      const eased = Easing.bezier(0.2, 0, 0, 1)(p);
      x = interpolate(eased, [0, 1], [1200, 1500]);
      vx = ((1500 - 1200) / 30) * (1 - p);
      isMoving = true;
    } else if (f >= 165 && f < 190) {
      x = 1500;
      vx = 0;
      isMoving = false;
      phase = 'REST';
    } else if (f >= 190 && f < 240) {
      // Phase 4: Test E - Shot A terminal travel approaching right frame edge
      phase = 'ACTION';
      const p = (f - 190) / 50;
      const eased = Easing.bezier(0.3, 0, 0.2, 1)(p);
      x = interpolate(eased, [0, 1], [1500, 1880]);
      vx = 18.0; // Terminal velocity 18px/frame
      isMoving = true;
    } else {
      // Post handoff
      x = 1880;
      vx = 0;
      isMoving = false;
      phase = 'REST';
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

  const primaryCurrent = primaryHistory[frame] || primaryHistory[0];

  // --------------------------------------------------------------------------
  // TEST B: ANTICIPATION EVALUATION
  // --------------------------------------------------------------------------
  const anticipationConfig: AnticipationConfig = {
    durationFrames: 12,
    displacementDistance: 28,
    compressionScale: 0.94,
  };
  const anticipationState = SecondaryMotionAdapter.computeAnticipation(
    frame,
    32,
    anticipationConfig
  );

  const heroRenderScaleX = (!isAnticipationCollapsed && anticipationState.isActive)
    ? anticipationState.scaleCompression
    : 1.0;
  const heroRenderScaleY = (!isAnticipationCollapsed && anticipationState.isActive)
    ? 1.0 / anticipationState.scaleCompression // Volume conservation
    : 1.0;

  // --------------------------------------------------------------------------
  // TEST A & C: SECONDARY FOLLOW-THROUGH & OVERSHOOT
  // --------------------------------------------------------------------------
  const secondaryConfig: SecondaryMotionConfig = {
    delayFrames: 5,
    responseStrength: 0.55,
    damping: 0.85,
    maxOvershoot: 38,
    followThroughDuration: 20,
  };

  const secondaryState = isSecondaryCollapsed
    ? {
        x: primaryCurrent.x + 80,
        y: 540,
        offsetX: 0,
        offsetY: 0,
        scaleX: 1,
        scaleY: 1,
        rotationDeg: 0,
        tier: 'SECONDARY' as HierarchyTier,
        phase: 'REST' as const,
        activeVelocity: { vx: 0, vy: 0 },
      }
    : isFollowThroughCollapsed && frame >= 85
    ? {
        // Clamped dead stop when primary stops (negative control)
        x: 1200 + 80,
        y: 540,
        offsetX: 0,
        offsetY: 0,
        scaleX: 1,
        scaleY: 1,
        rotationDeg: 0,
        tier: 'SECONDARY' as HierarchyTier,
        phase: 'SETTLED' as const,
        activeVelocity: { vx: 0, vy: 0 },
      }
    : SecondaryMotionAdapter.computeSecondaryFollowThrough(
        frame,
        primaryHistory,
        secondaryConfig,
        { x: 80, y: 0 }
      );

  // --------------------------------------------------------------------------
  // TEST D: MOTION HIERARCHY (TERTIARY ELEMENT EVALUATION)
  // --------------------------------------------------------------------------
  const tertiaryConfig: SecondaryMotionConfig = {
    delayFrames: 10,
    responseStrength: 0.22,
    damping: 0.90,
    maxOvershoot: 15,
    followThroughDuration: 28,
  };

  const tertiaryState = isSecondaryCollapsed
    ? {
        x: primaryCurrent.x + 150,
        y: 540,
        offsetX: 0,
        offsetY: 0,
        scaleX: 1,
        scaleY: 1,
        rotationDeg: 0,
        tier: 'TERTIARY' as HierarchyTier,
        phase: 'REST' as const,
        activeVelocity: { vx: 0, vy: 0 },
      }
    : SecondaryMotionAdapter.computeSecondaryFollowThrough(
        frame,
        primaryHistory,
        tertiaryConfig,
        { x: 150, y: 0 }
      );

  // --------------------------------------------------------------------------
  // TEST E: MOTION-CARRY (SHOT A -> SHOT B VELOCITY HANDOFF)
  // --------------------------------------------------------------------------
  const carryContract: MotionCarryContract = {
    sourceEntityId: 'hero_carrier',
    targetEntityId: 'target_receiver',
    sourceVelocity: { x: 18.0, y: 0 },
    handoffFrame: 240,
    carryStrength: 0.90, // 90% momentum handoff
    continuityWindow: 55,
    spatialDirection: 'RIGHT',
  };

  let targetReceiverX = 200;
  let targetReceiverVx = 0;
  let isShotBActive = frame >= 240;

  if (isShotBActive) {
    if (!isMotionCarryCollapsed) {
      // Inherits source velocity continuously
      const carryResult = SecondaryMotionAdapter.computeMotionCarry(
        frame,
        carryContract,
        200
      );
      targetReceiverX = 200 + carryResult.carryOffset;
      targetReceiverVx = carryResult.currentVelocityX;
    } else {
      // COLLAPSED CONTROL: Target starts from dead rest (v=0), slow linear creep
      const elapsed = frame - 240;
      targetReceiverX = 200 + elapsed * 2.0; // Uninherited, disconnected crawl
      targetReceiverVx = 2.0;
    }
  }

  // --------------------------------------------------------------------------
  // DIAGNOSTIC LABELS & PHASE TITLE
  // --------------------------------------------------------------------------
  let activePhaseTitle = 'TEST A: REST & STAGING';
  if (frame >= 20 && frame < 50) {
    activePhaseTitle = 'TEST B: PRE-LAUNCH ANTICIPATION';
  } else if (frame >= 50 && frame < 120) {
    activePhaseTitle = 'TEST A & C: SECONDARY LAGGING & FOLLOW-THROUGH OVERSHOOT';
  } else if (frame >= 120 && frame < 190) {
    activePhaseTitle = 'TEST D: MOTION HIERARCHY (PRIMARY > SECONDARY > TERTIARY)';
  } else if (frame >= 190) {
    activePhaseTitle = 'TEST E: MOTION-CARRY & VELOCITY HANDOFF ACROSS SHOTS';
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#050814',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 1. ARCHITECTURAL CALIBRATION GRID & PIXEL RULER */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
        }}
      >
        <defs>
          <pattern id="rulerGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#94a3b8" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rulerGrid)" />
        {/* Baseline travel vector axis */}
        <line x1="0" y1="540" x2="1920" y2="540" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" />
      </svg>

      {/* 2. DIAGNOSTIC TELEMETRY HEADER */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 48,
          zIndex: 100,
          color: '#f8fafc',
        }}
      >
        <div style={{ fontSize: 13, letterSpacing: '0.15em', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
          Phase 5F • Secondary Motion & Momentum Continuity Engine
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4, letterSpacing: '-0.02em' }}>
          {activePhaseTitle}
        </div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
          Mode: <span style={{ color: mode === 'REAL_SECONDARY_MOTION' ? '#4ade80' : '#f87171', fontWeight: 600 }}>{mode}</span>
          {' | '}Frame: <span style={{ color: '#ffffff', fontWeight: 600 }}>{frame}</span> / 299
        </div>
      </div>

      {/* 3. METRICS HUD TELEMETRY BADGE (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 48,
          zIndex: 100,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: 8,
          padding: '12px 18px',
          color: '#e2e8f0',
          fontSize: 12,
          lineHeight: '1.6',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div>Primary Pos X: <span style={{ color: '#38bdf8', fontWeight: 600 }}>{primaryCurrent.x}px</span> | Vx: <span style={{ color: '#38bdf8' }}>{primaryCurrent.vx}px/f</span></div>
        <div>Secondary Lag: <span style={{ color: '#a855f7', fontWeight: 600 }}>{secondaryState.offsetX}px</span> | Phase: <span style={{ color: '#a855f7' }}>{secondaryState.phase}</span></div>
        <div>Anticipation Shift: <span style={{ color: '#facc15' }}>{anticipationState.anticipationOffsetX}px</span> (Scale: {heroRenderScaleX.toFixed(2)})</div>
        <div>Handoff Velocity: <span style={{ color: '#4ade80' }}>{targetReceiverVx.toFixed(2)}px/f</span></div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 4. PRIMARY HERO ACTOR (hero_carrier)                                   */}
      {/* ---------------------------------------------------------------------- */}
      {!isShotBActive && (
        <div
          style={{
            position: 'absolute',
            left: primaryCurrent.x,
            top: primaryCurrent.y,
            width: 110,
            height: 110,
            transform: `translate(-50%, -50%) scale(${heroRenderScaleX}, ${heroRenderScaleY})`,
            borderRadius: 14,
            ...heroMatStyle.style,
            boxShadow: '0 0 35px rgba(56, 189, 248, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.5)',
            border: '2px solid rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            transition: 'none',
          }}
        >
          <div style={{ textAlign: 'center', color: '#ffffff', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>
            HERO<br />PRIMARY
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 5. SECONDARY ATTACHED WING (secondary_wing - Lags & Follows Through)   */}
      {/* ---------------------------------------------------------------------- */}
      {!isShotBActive && (
        <div
          style={{
            position: 'absolute',
            left: secondaryState.x,
            top: secondaryState.y + 40,
            width: 65,
            height: 65,
            transform: `translate(-50%, -50%) rotate(${secondaryState.rotationDeg}deg)`,
            borderRadius: 10,
            ...secMatStyle.style,
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.4)',
            border: '2px solid rgba(192, 132, 252, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 25,
            transition: 'none',
          }}
        >
          <div style={{ textAlign: 'center', color: '#ffffff', fontSize: 9, fontWeight: 700 }}>
            SEC<br />WING
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 6. TERTIARY TRAILING ORB (tertiary_orb - Hierarchy Echo)               */}
      {/* ---------------------------------------------------------------------- */}
      {!isShotBActive && (
        <div
          style={{
            position: 'absolute',
            left: tertiaryState.x,
            top: tertiaryState.y - 45,
            width: 36,
            height: 36,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            ...tertMatStyle.style,
            boxShadow: '0 0 18px rgba(56, 189, 248, 0.35)',
            border: '1.5px solid rgba(147, 197, 253, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            transition: 'none',
          }}
        >
          <div style={{ color: '#ffffff', fontSize: 8, fontWeight: 700 }}>
            TERT
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* 7. SHOT B TARGET RECEIVER (target_receiver - Motion-Carry Receiver)     */}
      {/* ---------------------------------------------------------------------- */}
      {isShotBActive && (
        <div
          style={{
            position: 'absolute',
            left: targetReceiverX,
            top: 540,
            width: 110,
            height: 110,
            transform: 'translate(-50%, -50%)',
            borderRadius: 14,
            ...heroMatStyle.style,
            boxShadow: '0 0 40px rgba(74, 222, 128, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.5)',
            border: '2px solid rgba(74, 222, 128, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
            transition: 'none',
          }}
        >
          <div style={{ textAlign: 'center', color: '#ffffff', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>
            SHOT B<br />RECEIVER
          </div>
        </div>
      )}

      {/* 8. SHOT BOUNDARY MARKER AT FRAME 240 */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 48,
          color: '#64748b',
          fontSize: 11,
          fontFamily: 'monospace',
        }}
      >
        [CALIBRATION]: Shot A (0-239) → Cut (240) → Shot B (240-300) | Authority: Primary (300px) &gt; Secondary (110px) &gt; Tertiary (42px)
      </div>
    </div>
  );
};
