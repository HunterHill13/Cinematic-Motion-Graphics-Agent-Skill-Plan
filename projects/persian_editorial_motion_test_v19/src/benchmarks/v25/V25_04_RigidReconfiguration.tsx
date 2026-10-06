import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 04 — RIGID RECONFIGURATION
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Demonstrates 'RIGID' motion personality:
 * - High directional authority
 * - Rapid linear travel with tiny overshoot (< 2%)
 * - Crisp, instant arrest into architectural structure (zero rubberiness)
 */
export const V25_04_RigidReconfiguration: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  const kine = calculateKinematics(frame, 20, 50, 'RIGID');

  // 4 Architectural Corner Brackets reconfiguring from scatter to box
  const boxSize = 420;
  const scatterOffset = interpolate(kine.position, [0, 1], [300, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.6} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.04</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>آرایش صلب و توقف قاطع (Rigid Structural Reconfiguration)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Phase: {kine.currentPhase} • Overshoot: 1.02x • Hard Arrest: {kine.currentPhase === 'SETTLE' ? 'LOCKED' : 'ACTIVE'}
        </div>
      </div>

      {/* Structural Framing Grid */}
      <div style={{ position: 'absolute', left: 960, top: 540, transform: 'translate(-50%, -50%)', width: boxSize, height: boxSize }}>
        {/* Top-Left Bracket */}
        <div style={{ position: 'absolute', left: -scatterOffset, top: -scatterOffset, width: 80, height: 80, borderTop: `3px solid ${goldColor}`, borderLeft: `3px solid ${goldColor}` }} />
        {/* Top-Right Bracket */}
        <div style={{ position: 'absolute', right: -scatterOffset, top: -scatterOffset, width: 80, height: 80, borderTop: `3px solid ${goldColor}`, borderRight: `3px solid ${goldColor}` }} />
        {/* Bottom-Left Bracket */}
        <div style={{ position: 'absolute', left: -scatterOffset, bottom: -scatterOffset, width: 80, height: 80, borderBottom: `3px solid ${goldColor}`, borderLeft: `3px solid ${goldColor}` }} />
        {/* Bottom-Right Bracket */}
        <div style={{ position: 'absolute', right: -scatterOffset, bottom: -scatterOffset, width: 80, height: 80, borderBottom: `3px solid ${goldColor}`, borderRight: `3px solid ${goldColor}` }} />

        {/* Center Plinth Core */}
        <div
          style={{
            position: 'absolute',
            inset: 60,
            border: '1px solid rgba(212,175,55,0.4)',
            backgroundColor: 'rgba(212,175,55,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            direction: 'rtl',
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: '#F8FAFC' }}>قاطعیت سازه‌ای</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
