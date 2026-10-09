import React from 'react';
import { useCurrentFrame, AbsoluteFill, spring, interpolate, Easing } from 'remotion';
import {
  AuthoredMotionTrack,
  evaluateAuthoredKeyframeTrack,
  MotionCurves,
} from '../curves/AuthoredKeyframeEngine';
import {
  evaluatePhysicalBounce,
  PhysicalBounceConfig,
} from '../physics/PhysicalBounceRecipe';

/**
 * V28 BOUNCE LABORATORY
 * 
 * Side-by-side objective evaluation of 5 distinct bounce motion models:
 * TEST A: Current V27 Baseline (Authored piecewise Bézier)
 * TEST B: Remotion Spring Mechanism (Natural oscillation around target)
 * TEST C: Multi-Keyframe Stepwise Bounce (Discrete keyframes)
 * TEST D: GSAP CustomBounce Inspired (Parabolic curve without deformation)
 * TEST E: V28 Physical Bounce + Velocity-Aware Squash/Stretch (Primary Candidate)
 * 
 * Specs: 1920x1080 @ 30 FPS, 90 frames (3.0s), fixed camera, minimal clean canvas.
 */

const bounceConfigE: PhysicalBounceConfig = {
  startY: 200,
  floorY: 640,
  totalDurationFrames: 85,
  restitution: 0.64,
  bounceCount: 4,
  contactFrames: 2,
  maxSquash: 0.38,
  maxStretch: 0.22,
  settleThreshold: 3,
};

// Test A track
const trackV27Elastic: AuthoredMotionTrack = {
  id: 'elastic_bounce_test_v27',
  totalDurationFrames: 75,
  profile: 'ELASTIC',
  keyframes: [
    { time: 0.0, role: 'REST', value: 200 },
    { time: 0.15, role: 'ANTICIPATION', value: 160 },
    { time: 0.40, role: 'LAUNCH', value: 640, curve: MotionCurves.impactCurve },
    { time: 0.55, role: 'OVERSHOOT', value: 580 },
    { time: 0.70, role: 'OVERSHOOT', value: 625 },
    { time: 0.85, role: 'DECAY', value: 618 },
    { time: 1.0, role: 'SETTLE', value: 640, curve: MotionCurves.snapSettle },
  ],
};

// Test C track: Explicitly authored multi-keyframe contact points
const trackAuthoredMulti: AuthoredMotionTrack = {
  id: 'authored_multi_kfs',
  totalDurationFrames: 80,
  profile: 'MECHANICAL',
  keyframes: [
    { time: 0.0, role: 'RELEASE', value: 200 },
    { time: 0.22, role: 'IMPACT', value: 640, curve: Easing.in(Easing.quad) },
    { time: 0.25, role: 'PUNCTUATION', value: 640 },
    { time: 0.42, role: 'APEX', value: 380, curve: Easing.out(Easing.quad) },
    { time: 0.58, role: 'IMPACT', value: 640, curve: Easing.in(Easing.quad) },
    { time: 0.60, role: 'PUNCTUATION', value: 640 },
    { time: 0.72, role: 'APEX', value: 520, curve: Easing.out(Easing.quad) },
    { time: 0.84, role: 'IMPACT', value: 640, curve: Easing.in(Easing.quad) },
    { time: 1.0, role: 'SETTLE', value: 640 },
  ],
};

export const V28_BounceLab: React.FC = () => {
  const frame = useCurrentFrame();

  // Floor coordinate
  const floorY = 640;
  const startY = 200;

  // ==========================================
  // MODEL A: Current V27 Baseline
  // ==========================================
  const evalA = evaluateAuthoredKeyframeTrack(trackV27Elastic, frame, 0);
  const yA = evalA.value;
  const sxA = 1.0;
  const syA = 1.0;

  // ==========================================
  // MODEL B: Remotion Spring
  // ==========================================
  const springProgress = spring({
    frame,
    fps: 30,
    config: {
      damping: 7,
      mass: 0.8,
      stiffness: 75,
      overshootClamping: false,
    },
  });
  // Invert spring so it bounces off floor (simulate floor collision by reflecting overshoot)
  const rawSpringY = interpolate(springProgress, [0, 1], [startY, floorY]);
  // Floor reflection (bounce clamp)
  const yB = rawSpringY > floorY ? floorY - (rawSpringY - floorY) : rawSpringY;
  const sxB = 1.0;
  const syB = 1.0;

  // ==========================================
  // MODEL C: Authored Multi-Keyframe
  // ==========================================
  const evalC = evaluateAuthoredKeyframeTrack(trackAuthoredMulti, frame, 0);
  const yC = evalC.value;
  const sxC = evalC.activeRole === 'PUNCTUATION' ? 1.3 : 1.0;
  const syC = evalC.activeRole === 'PUNCTUATION' ? 0.7 : 1.0;

  // ==========================================
  // MODEL D: CustomBounce Inspired (Parabolic, no squash)
  // ==========================================
  const evalD = evaluatePhysicalBounce({ ...bounceConfigE, maxSquash: 0, maxStretch: 0 }, frame, 0);
  const yD = evalD.y;
  const sxD = 1.0;
  const syD = 1.0;

  // ==========================================
  // MODEL E: Physical Bounce + Velocity-Aware Squash/Stretch (Primary)
  // ==========================================
  const evalE = evaluatePhysicalBounce(bounceConfigE, frame, 0);
  const yE = evalE.y;
  const sxE = evalE.scaleX;
  const syE = evalE.scaleY;

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif' }}>
      {/* Title & Diagnostic Header */}
      <div style={{ padding: '40px 80px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#D4AF37', margin: 0 }}>
          V28 BOUNCE LABORATORY — PHYSICAL MOTION & CONTACT DYNAMICS
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>
          Evaluating 5 distinct bounce models: Flight trajectory, contact duration, and synchronized deformation.
        </p>
      </div>

      {/* Shared Horizontal Floor Line */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          top: floorY + 24, // ground tangent at base of ball (radius = 24)
          height: 3,
          backgroundColor: 'rgba(212, 175, 55, 0.7)',
          boxShadow: '0 0 16px rgba(212, 175, 55, 0.3)',
        }}
      />

      {/* 5 Vertical Comparison Lanes */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-around', paddingTop: 120 }}>
        {/* Lane A: V27 Current */}
        <BounceColumn
          title="A — V27 Current"
          sub="Piecewise Bézier Track"
          y={yA}
          scaleX={sxA}
          scaleY={syA}
          color="#EF4444"
          phase={evalA.activeRole}
          vel={evalA.velocity}
        />

        {/* Lane B: Remotion Spring */}
        <BounceColumn
          title="B — Remotion Spring"
          sub="Oscillatory Spring Target"
          y={yB}
          scaleX={sxB}
          scaleY={syB}
          color="#F59E0B"
          phase="SPRING"
          vel={0}
        />

        {/* Lane C: Authored Multi-Keyframe */}
        <BounceColumn
          title="C — Authored KFs"
          sub="Discrete Semantic Segments"
          y={yC}
          scaleX={sxC}
          scaleY={syC}
          color="#8B5CF6"
          phase={evalC.activeRole}
          vel={evalC.velocity}
        />

        {/* Lane D: CustomBounce Inspired */}
        <BounceColumn
          title="D — CustomBounce"
          sub="Parabolic Decay Only"
          y={yD}
          scaleX={sxD}
          scaleY={syD}
          color="#38BDF8"
          phase={evalD.phase}
          vel={evalD.velocity}
        />

        {/* Lane E: V28 Physical Bounce + Squash/Stretch */}
        <BounceColumn
          title="E — Physical Bounce"
          sub="Parabolic + Velocity Squash"
          y={yE}
          scaleX={sxE}
          scaleY={syE}
          color="#10B981"
          phase={evalE.phase}
          vel={evalE.velocity}
          isHero
        />
      </div>

      {/* Bottom HUD Metrics */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 60,
          right: 60,
          backgroundColor: 'rgba(4, 6, 10, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'monospace',
          fontSize: 13,
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        <div>FRAME: {frame} / 90 (30 FPS)</div>
        <div style={{ color: '#10B981', fontWeight: 700 }}>
          MODEL E STATE: Y={yE.toFixed(1)} px | SX={sxE.toFixed(2)} SY={syE.toFixed(2)} | V={evalE.velocity.toFixed(2)} px/f | [{evalE.phase}]
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BounceColumn: React.FC<{
  title: string;
  sub: string;
  y: number;
  scaleX: number;
  scaleY: number;
  color: string;
  phase: string;
  vel: number;
  isHero?: boolean;
}> = ({ title, sub, y, scaleX, scaleY, color, phase, vel, isHero }) => {
  const radius = 24;

  return (
    <div style={{ width: 280, position: 'relative', textAlign: 'center' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color }}>{title}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{sub}</div>

      {/* Phase Badge */}
      <div
        style={{
          display: 'inline-block',
          marginTop: 8,
          padding: '2px 8px',
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.06)',
          fontSize: 10,
          fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        [{phase}]
      </div>

      {/* Travelling Bouncing Ball */}
      <div
        style={{
          position: 'absolute',
          left: 140 - radius,
          top: y - 120 - radius, // Offset container paddingTop (120px) so y corresponds to absolute canvas Y
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          backgroundColor: color,
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: '50% 100%', // Floor contact squash from base
          boxShadow: isHero ? `0 0 25px ${color}` : 'none',
        }}
      />
    </div>
  );
};
