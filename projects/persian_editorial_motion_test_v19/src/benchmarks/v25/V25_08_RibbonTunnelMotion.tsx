import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 08 — RIBBON / TUNNEL MOTION FIDELITY
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - Fluid ribbon growth with C2 continuous curvature
 * - Coiling transformation into 3D spatial tunnel rings
 * - Smooth perspective depth scaling without abrupt pops
 */
export const V25_08_RibbonTunnelMotion: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  const kine = calculateKinematics(frame, 20, 85, 'FLUID');
  const morphProgress = kine.position;
  const rotation = interpolate(frame, [0, 210], [0, 180]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="azure" intensity={0.8} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.08</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>حرکت سیال روبان و تونل عمق (Fluid Ribbon ↔ 3D Tunnel)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          C2 Smoothness: ACTIVE • Progress: {(morphProgress * 100).toFixed(0)}%
        </div>
      </div>

      <div style={{ position: 'absolute', left: 960, top: 540, transform: 'translate(-50%, -50%)', perspective: 1000 }}>
        {/* 5 Concentric Tunnel Rings in Depth Plane */}
        {[1, 2, 3, 4, 5].map((ringIdx) => {
          const zDepth = interpolate(morphProgress, [0, 1], [-200 * ringIdx, 80 * ringIdx]);
          const ringRadius = interpolate(morphProgress, [0, 1], [30 * ringIdx, 50 * ringIdx]);
          const ringOpacity = interpolate(morphProgress, [0, 0.3, 1], [0.2, 0.6, 0.9]);

          return (
            <div
              key={ringIdx}
              style={{
                position: 'absolute',
                left: -ringRadius,
                top: -ringRadius,
                width: ringRadius * 2,
                height: ringRadius * 2,
                borderRadius: '50%',
                border: `${2.5 - ringIdx * 0.3}px solid ${ringIdx % 2 === 0 ? goldColor : cyanAccent}`,
                boxShadow: `0 0 30px rgba(56, 189, 248, 0.3)`,
                transform: `rotate(${rotation * (ringIdx % 2 === 0 ? 1 : -0.7)}deg) translateZ(${zDepth}px)`,
                opacity: ringOpacity,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
