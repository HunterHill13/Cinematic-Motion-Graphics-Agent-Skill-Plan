import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 02 — HEAVY IMPACT KINEMATICS
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Demonstrates 'HEAVY' motion personality:
 * - Slow inertia takeoff (t^2 delay)
 * - Massive downward acceleration surge
 * - Seismic contact impact with compressive squash
 * - Damped ground vibration decay (zero endless spring float)
 */
export const V25_02_HeavyImpact: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Kinematic solver for 70-frame heavy drop
  const kine = calculateKinematics(frame, 20, 70, 'HEAVY');
  const targetY = 640;
  const startY = 180;
  const currentY = interpolate(kine.position, [0, 1], [startY, targetY]);

  // Impact occurs around frame 69
  const isPostImpact = frame >= 69;
  const impactAge = Math.max(0, frame - 69);

  // Compressive squash / stretch
  let scaleX = 1.0;
  let scaleY = 1.0;
  if (frame >= 20 && frame < 69) {
    // Air stretch
    scaleX = 0.82;
    scaleY = 1.25;
  } else if (isPostImpact && impactAge < 30) {
    // Impact squash & ground vibration
    const decay = Math.exp(-impactAge * 0.18);
    const wave = Math.sin(impactAge * 0.6) * decay;
    scaleX = 1.0 + wave * 0.45;
    scaleY = 1.0 - wave * 0.45;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.7} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.02</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>سینماتیک ضربه سنگین (Heavy Impact & Damped Decay)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Phase: {kine.currentPhase} • Accel: {kine.acceleration.toFixed(2)} • Vel: {kine.velocity.toFixed(3)}
        </div>
      </div>

      {/* Ground Foundation Line */}
      <div style={{ position: 'absolute', left: 480, right: 480, top: targetY + 60, height: 4, backgroundColor: goldColor, boxShadow: `0 0 20px ${goldColor}` }}>
        {/* Foundation Sub-ruler */}
        <div style={{ position: 'absolute', left: -80, right: -80, top: 8, height: 1, backgroundColor: 'rgba(212,175,55,0.3)' }} />
      </div>

      {/* Ground Impact Shockwave Rings */}
      {isPostImpact && impactAge < 45 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 960 - impactAge * 14,
              top: targetY + 60 - impactAge * 3,
              width: impactAge * 28,
              height: impactAge * 6,
              borderRadius: '50%',
              border: '2px solid rgba(56, 189, 248, 0.8)',
              opacity: interpolate(impactAge, [0, 45], [1, 0]),
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 960 - impactAge * 8,
              top: targetY + 60 - impactAge * 2,
              width: impactAge * 16,
              height: impactAge * 4,
              borderRadius: '50%',
              border: `1.5px solid ${goldColor}`,
              opacity: interpolate(impactAge, [0, 40], [1, 0]),
            }}
          />
        </>
      )}

      {/* Heavy Monolithic Mass Block */}
      <div
        style={{
          position: 'absolute',
          left: 960 - 60,
          top: currentY,
          width: 120,
          height: 120,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${goldColor}, #9A7B20)`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.4)`,
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: 'bottom center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#04060A',
          fontWeight: 900,
          fontSize: 32,
        }}
      >
        جِرم
      </div>
    </AbsoluteFill>
  );
};
