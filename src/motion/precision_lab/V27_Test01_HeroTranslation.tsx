import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import {
  AuthoredMotionTrack,
  evaluateAuthoredKeyframeTrack,
  MotionCurves,
} from '../curves/AuthoredKeyframeEngine';

/**
 * V27 PRECISION LAB — TEST 01: HERO TRANSLATION COMPARISON
 * 
 * Compares 4 velocity profiles over identical distance (X=360 -> X=1560, dx=1200px) and duration (60f):
 * 1. LINEAR: Mechanical, abrupt start/stop
 * 2. GENERIC EASE: Standard easeInOut (floaty, weak deceleration)
 * 3. V25 CURVE: Explosive kinematic curve
 * 4. V27 AUTHORED KEYFRAME: Anticipation (-40px) -> Launch -> Cruise -> Punctuation -> Settle
 */

const trackV27Authored: AuthoredMotionTrack = {
  id: 'hero_trans_v27',
  totalDurationFrames: 60,
  profile: 'SLAM',
  keyframes: [
    { time: 0.0, role: 'REST', value: 360 },
    { time: 0.12, role: 'ANTICIPATION', value: 320, curve: Easing.bezier(0.4, 0, 0.2, 1) },
    { time: 0.65, role: 'IMPACT', value: 1560, curve: MotionCurves.impactCurve },
    { time: 0.70, role: 'PUNCTUATION', value: 1560, curve: (t) => t }, // 3-frame hold
    { time: 0.82, role: 'OVERSHOOT', value: 1572, curve: Easing.bezier(0.16, 1, 0.3, 1) },
    { time: 1.0, role: 'SETTLE', value: 1560, curve: MotionCurves.snapSettle },
  ],
};

export const V27_Test01_HeroTranslation: React.FC = () => {
  const frame = useCurrentFrame();
  const fClamped = Math.min(60, frame);

  // 1. Linear
  const xLinear = interpolate(fClamped, [0, 60], [360, 1560]);

  // 2. Generic Ease
  const xGeneric = interpolate(fClamped, [0, 60], [360, 1560], {
    easing: Easing.inOut(Easing.cubic),
  });

  // 3. V25 Explosive
  const xV25 = interpolate(
    Easing.bezier(0.12, 0, 0.39, 0)(fClamped / 60),
    [0, 1],
    [360, 1560]
  );

  // 4. V27 Authored Keyframe Track
  const evalV27 = evaluateAuthoredKeyframeTrack(trackV27Authored, frame, 0);

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '60px 100px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: goldColor, margin: 0 }}>
          V27 PRECISION LAB — TEST 01: HERO TRANSLATION
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 6 }}>
          Evaluating 1200px displacement across 4 velocity profiles
        </p>

        {/* 4 Lanes */}
        <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 60 }}>
          {/* Lane 1: Linear */}
          <Lane label="1. LINEAR (MECHANICAL)" posX={xLinear} color="#EF4444" vel={20} />

          {/* Lane 2: Generic Ease */}
          <Lane label="2. GENERIC BEZIER (FLOATY)" posX={xGeneric} color="#F59E0B" vel={0} />

          {/* Lane 3: V25 Explosive */}
          <Lane label="3. V25 EXPLOSIVE (UNSEGMENTED)" posX={xV25} color="#8B5CF6" vel={0} />

          {/* Lane 4: V27 Authored Keyframes */}
          <Lane
            label="4. V27 AUTHORED KEYFRAME (ANTICIPATION → LAUNCH → PUNCTUATION → SETTLE)"
            posX={evalV27.value}
            color={cyanAccent}
            vel={evalV27.velocity}
            activeRole={evalV27.activeRole}
            isHero
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Lane: React.FC<{
  label: string;
  posX: number;
  color: string;
  vel: number;
  activeRole?: string;
  isHero?: boolean;
}> = ({ label, posX, color, vel, activeRole, isHero }) => {
  return (
    <div style={{ position: 'relative', height: 80, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: 1 }}>
        {label} {activeRole && <span style={{ color, marginLeft: 12 }}>[{activeRole}]</span>}
      </div>
      {/* Track Base */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 40,
          height: isHero ? 3 : 1.5,
          backgroundColor: isHero ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255,255,255,0.2)',
        }}
      />
      {/* Travelling Hero Sphere */}
      <div
        style={{
          position: 'absolute',
          left: posX - 180 - 18,
          top: 40 - 18,
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: isHero ? `0 0 25px ${color}` : 'none',
        }}
      />
    </div>
  );
};
