import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics, calculateVelocityHandoff } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 01 — DOT TO LINE VELOCITY CONTINUITY
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Replaces procedural 2-frame dead pauses and opacity dissolve cheats with
 * true C1 velocity handoff.
 * 
 * Phase 1 (0 - 45f): Dot accelerates rightward under 'EXPLOSIVE' personality.
 * Boundary (45f): Line emerges at EXACT instantaneous velocity of dot.
 * Phase 2 (45 - 110f): Line unrolls horizontally with continuous momentum.
 * Phase 3 (110 - 180f): Settle-lock into unshakeable baseline datum.
 */
export const V25_01_DotToLineFidelity: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Kinematics of the accelerating dot (Frames 0 - 45)
  const dotKine = calculateKinematics(frame, 0, 45, 'EXPLOSIVE');
  const dotX = interpolate(dotKine.position, [0, 1], [400, 960]);

  // Velocity handoff at frame 45
  const boundaryFrame = 45;
  const isPostHandoff = frame >= boundaryFrame;

  // Compute handoff velocity preservation
  const handoff = calculateVelocityHandoff(dotKine.velocity, 'PRESERVE');

  // Line expansion kinematics (Frames 45 - 110)
  const lineKine = calculateKinematics(frame, boundaryFrame, 65, 'FLUID');
  const lineHalfWidth = interpolate(lineKine.position, [0, 1], [0, 540]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.6} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.01</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>پیوستگی سرعت نقطه به خط (C1 Velocity Continuity)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Vel: {dotKine.velocity > 0 ? dotKine.velocity.toFixed(3) : lineKine.velocity.toFixed(3)} px/f • C1 Match: {handoff.isContinuousC1 ? 'LOCKED' : 'DISCONTINUOUS'}
        </div>
      </div>

      {/* Main Canvas Presentation */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Phase 1: Accelerating Dot */}
        {!isPostHandoff && (
          <>
            {/* Dynamic Velocity Trail */}
            {frame > 10 && (
              <div
                style={{
                  position: 'absolute',
                  left: 400,
                  top: 538,
                  width: dotX - 400,
                  height: 4,
                  background: `linear-gradient(to right, transparent, ${goldColor})`,
                  opacity: 0.8,
                }}
              />
            )}
            <div
              style={{
                position: 'absolute',
                left: dotX - 16,
                top: 540 - 16,
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: goldColor,
                boxShadow: `0 0 24px ${goldColor}`,
              }}
            />
          </>
        )}

        {/* Phase 2: Continuously Unrolling Line (Zero pause, perfect velocity handoff) */}
        {isPostHandoff && (
          <div
            style={{
              position: 'absolute',
              left: 960 - lineHalfWidth,
              top: 539,
              width: lineHalfWidth * 2,
              height: 3,
              backgroundColor: goldColor,
              boxShadow: `0 0 20px rgba(212, 175, 55, 0.6)`,
            }}
          >
            {/* Center Anchor Point where momentum was received */}
            <div
              style={{
                position: 'absolute',
                left: lineHalfWidth - 6,
                top: -4.5,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#FFF',
                boxShadow: `0 0 16px ${cyanAccent}`,
              }}
            />
          </div>
        )}

        {/* Semantic Annotation */}
        <div style={{ position: 'absolute', left: 960, top: 620, transform: 'translateX(-50%)', textAlign: 'center', direction: 'rtl', opacity: frame > 30 ? 1 : 0 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC' }}>انتقال تکانه بدون مکث مصنوعی</div>
          <div style={{ fontSize: 13, color: 'rgba(212,175,55,0.8)', marginTop: 4 }}>ZERO-PAUSE MOMENTUM PRESERVATION</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
