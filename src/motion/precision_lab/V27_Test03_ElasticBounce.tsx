import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import {
  AuthoredMotionTrack,
  evaluateAuthoredKeyframeTrack,
  MotionCurves,
} from '../curves/AuthoredKeyframeEngine';

/**
 * V27 PRECISION LAB — TEST 03: ELASTIC BOUNCE & DAMPED DECAY
 * 
 * Tests multi-harmonic damped oscillation with deterministic settle locks.
 * Prevents continuous procedural float / eternal wobbling.
 * 
 * Duration: 90 frames (3.0s @ 30 FPS)
 */

const elasticTrack: AuthoredMotionTrack = {
  id: 'elastic_bounce_test',
  totalDurationFrames: 75,
  profile: 'ELASTIC',
  keyframes: [
    { time: 0.0, role: 'REST', value: 200 },
    { time: 0.15, role: 'ANTICIPATION', value: 160 },
    { time: 0.40, role: 'LAUNCH', value: 640, curve: MotionCurves.impactCurve },
    { time: 0.55, role: 'OVERSHOOT', value: 580 },
    { time: 0.70, role: 'OVERSHOOT', value: 625 },
    { time: 0.85, role: 'DECAY', value: 618 },
    { time: 1.0, role: 'SETTLE', value: 620, curve: MotionCurves.snapSettle }, // Deterministic clamp
  ],
};

export const V27_Test03_ElasticBounce: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  const evalElastic = evaluateAuthoredKeyframeTrack(elasticTrack, frame, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '60px 100px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: goldColor, margin: 0 }}>
          V27 PRECISION LAB — TEST 03: ELASTIC BOUNCE & SETTLE
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 6 }}>
          Authored multi-phase harmonic decay with absolute settle-lock (Active: [{evalElastic.activeRole}])
        </p>

        {/* Stage */}
        <div style={{ position: 'relative', height: 650, marginTop: 60 }}>
          {/* Target Datum */}
          <div style={{ position: 'absolute', left: 200, right: 200, top: 620, height: 2, backgroundColor: 'rgba(212,175,55,0.4)' }} />
          
          {/* Oscillating Entity */}
          <div
            style={{
              position: 'absolute',
              left: 960 - 30,
              top: evalElastic.value - 30,
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: cyanAccent,
              boxShadow: `0 0 30px ${cyanAccent}`,
            }}
          />

          {/* Velocity & Position HUD */}
          <div
            style={{
              position: 'absolute',
              right: 200,
              top: 200,
              fontFamily: 'monospace',
              fontSize: 14,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <div>Y: {evalElastic.value.toFixed(1)} px</div>
            <div>VELOCITY: {evalElastic.velocity.toFixed(3)} px/f</div>
            <div>ACCEL: {evalElastic.acceleration.toFixed(4)}</div>
            <div style={{ color: goldColor, marginTop: 8 }}>PHASE: {evalElastic.activeRole}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
