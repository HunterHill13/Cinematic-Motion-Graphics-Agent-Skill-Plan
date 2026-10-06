import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 03 — ELASTIC BOUNCE & HARMONIC RECOVERY
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Demonstrates 'ELASTIC' motion personality:
 * - Negative anticipation dip (-8%)
 * - Rapid slingshot launch
 * - Harmonic damped oscillation (3 visible wave cycles)
 * - Exact non-asymptotic settle
 */
export const V25_03_ElasticBounce: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  const kine = calculateKinematics(frame, 20, 80, 'ELASTIC');
  const startX = 480;
  const targetX = 1440;
  const currentX = interpolate(kine.position, [0, 1], [startX, targetX]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.6} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.03</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>پرتاب کشسان و نوسان میرا (Elastic Harmonic Bounce)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Phase: {kine.currentPhase} • Pos: {kine.position.toFixed(2)} • Vel: {kine.velocity.toFixed(3)}
        </div>
      </div>

      {/* Elastic Horizon Track */}
      <div style={{ position: 'absolute', left: 360, right: 360, top: 540, height: 2, backgroundColor: 'rgba(212,175,55,0.4)' }}>
        {/* Origin Reticle */}
        <div style={{ position: 'absolute', left: startX - 360 - 15, top: -14, width: 30, height: 30, borderRadius: '50%', border: '1px dashed rgba(212,175,55,0.5)' }} />
        {/* Target Reticle */}
        <div style={{ position: 'absolute', left: targetX - 360 - 20, top: -19, width: 40, height: 40, borderRadius: '50%', border: `1.5px solid ${cyanAccent}` }} />
      </div>

      {/* Elastic Kinetic Ball */}
      <div
        style={{
          position: 'absolute',
          left: currentX - 25,
          top: 540 - 25,
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: goldColor,
          boxShadow: `0 0 28px ${goldColor}, 0 0 60px rgba(56, 189, 248, 0.4)`,
        }}
      />

      {/* Dynamic Verb Typography */}
      <div style={{ position: 'absolute', left: 960, top: 640, transform: 'translateX(-50%)', textAlign: 'center', direction: 'rtl' }}>
        <div style={{ fontSize: 32, fontWeight: 900, color: '#F8FAFC' }}>جهش کشسان با میرایی هارمونیک</div>
        <div style={{ fontSize: 14, color: goldColor, marginTop: 4 }}>HARMONIC RECOVERY OSCILLATION</div>
      </div>
    </AbsoluteFill>
  );
};
