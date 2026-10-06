import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 06 — LETTERFORM TO GEOMETRY MORPH
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - Persian letterform «پ» deconstructing into 8 geometric pen stroke vectors
 * - Reassembling into 8-pointed star emblem
 * - Reversing back into typography with C1 continuous velocity
 */
export const V25_06_LetterGeometryMorph: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Cycle: 0-105f (Letter -> Emblem), 105-210f (Emblem -> Letter)
  const isReverse = frame >= 105;
  const cycleFrame = isReverse ? frame - 105 : frame;
  const kine = calculateKinematics(cycleFrame, 15, 65, 'FLUID');
  const morphProgress = isReverse ? 1 - kine.position : kine.position;

  const letterOpacity = interpolate(morphProgress, [0, 0.4], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const emblemProgress = interpolate(morphProgress, [0.3, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const emblemRotation = interpolate(morphProgress, [0, 1], [0, 90]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.6} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.06</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>تبدیل حرف فارسی به نماد هندسی (Letterform ↔ Emblem)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Morph: {(morphProgress * 100).toFixed(1)}% • State: {kine.currentPhase}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 960, top: 540, transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        {/* Letterform «پ» */}
        {letterOpacity > 0 && (
          <div style={{ opacity: letterOpacity, direction: 'rtl' }}>
            <div style={{ fontSize: 180, fontWeight: 900, color: '#F8FAFC', textShadow: `0 0 30px ${goldColor}` }}>
              پ
            </div>
          </div>
        )}

        {/* 8 Radial Geometry Vectors assembling into star */}
        {emblemProgress > 0 && (
          <div style={{ transform: `rotate(${emblemRotation}deg)` }}>
            <svg width={360} height={360} viewBox="-180 -180 360 360">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const len = interpolate(emblemProgress, [0, 1], [40, 140]);
                return (
                  <line
                    key={idx}
                    x1={0}
                    y1={0}
                    x2={len * Math.cos(rad)}
                    y2={len * Math.sin(rad)}
                    stroke={idx % 2 === 0 ? goldColor : cyanAccent}
                    strokeWidth={idx % 2 === 0 ? 3 : 1.5}
                    opacity={emblemProgress}
                  />
                );
              })}
              <circle r={interpolate(emblemProgress, [0, 1], [0, 40])} fill="none" stroke={goldColor} strokeWidth={2} />
              <circle r={interpolate(emblemProgress, [0, 1], [0, 16])} fill={goldColor} />
            </svg>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
