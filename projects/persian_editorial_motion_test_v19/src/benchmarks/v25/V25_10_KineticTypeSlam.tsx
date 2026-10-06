import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 10 — KINETIC TYPOGRAPHY SLAM FIDELITY
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - Coordinated typographic physics (no independent uncoordinated transform stacks)
 * - 'HEAVY' downward trajectory with flight air-stretch
 * - Impact contact with synchronized ground squash and shockwave
 * - Settle-lock into absolute readability
 */
export const V25_10_KineticTypeSlam: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  const kine = calculateKinematics(frame, 15, 60, 'HEAVY');
  const targetY = 540;
  const startY = 160;
  const currentY = interpolate(kine.position, [0, 1], [startY, targetY]);

  // Impact boundary at ~frame 57
  const isPostImpact = frame >= 57;
  const impactAge = Math.max(0, frame - 57);

  let scaleX = 1.0;
  let scaleY = 1.0;
  let letterSpacing = 0;

  if (frame >= 15 && frame < 57) {
    // Air stretch
    scaleX = 0.85;
    scaleY = 1.30;
    letterSpacing = -2;
  } else if (isPostImpact && impactAge < 35) {
    // Ground squash & harmonic decay
    const decay = Math.exp(-impactAge * 0.16);
    const wave = Math.sin(impactAge * 0.5) * decay;
    scaleX = 1.0 + wave * 0.40;
    scaleY = 1.0 - wave * 0.40;
    letterSpacing = interpolate(impactAge, [0, 35], [4, 0]);
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.7} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.10</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>فیزیک ضربه و کشسانی تایپوگرافی (Coordinated Typographic Physics)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Scale: {scaleX.toFixed(2)}x / {scaleY.toFixed(2)}x • Vel: {kine.velocity.toFixed(3)}
        </div>
      </div>

      {/* Baseline Horizon Line */}
      <div style={{ position: 'absolute', left: 400, right: 400, top: targetY + 65, height: 3, backgroundColor: goldColor, boxShadow: `0 0 20px ${goldColor}` }} />

      {/* Impact Shockwave Ring */}
      {isPostImpact && impactAge < 40 && (
        <div
          style={{
            position: 'absolute',
            left: 960 - impactAge * 15,
            top: targetY + 65 - impactAge * 3,
            width: impactAge * 30,
            height: impactAge * 6,
            borderRadius: '50%',
            border: '2px solid rgba(56, 189, 248, 0.8)',
            opacity: interpolate(impactAge, [0, 40], [1, 0]),
          }}
        />
      )}

      {/* Typographic Hero Slam: «شتاب» */}
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: currentY,
          transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
          transformOrigin: 'bottom center',
          textAlign: 'center',
          direction: 'rtl',
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: `${letterSpacing}px`,
            textShadow: '0 8px 40px rgba(0,0,0,0.9), 0 0 40px rgba(212,175,55,0.4)',
          }}
        >
          شتاب
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: cyanAccent, marginTop: 4, letterSpacing: 4 }}>
          COORDINATED MASS SLAM
        </div>
      </div>
    </AbsoluteFill>
  );
};
