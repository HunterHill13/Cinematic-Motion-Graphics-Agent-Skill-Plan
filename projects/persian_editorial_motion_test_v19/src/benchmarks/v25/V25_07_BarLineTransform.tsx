import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics, calculateVelocityHandoff } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 07 — BAR CHART TO CONTINUOUS CURVE
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - 4 monolithic bars compressing into 4 apex nodes
 * - Nodes inherit vertical compression velocity to connect into a smooth flight spline
 * - Zero-pause C1 continuous velocity handoff
 */
export const V25_07_BarLineTransform: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  const heights = [220, 360, 290, 420];
  const xPositions = [660, 840, 1020, 1200];

  // Phase 1: Compression of bars into nodes (0 - 60f)
  const compKine = calculateKinematics(frame, 20, 45, 'HEAVY');
  const compProgress = compKine.position;

  // Handoff at frame 65
  const isPostHandoff = frame >= 65;
  const handoff = calculateVelocityHandoff(compKine.velocity, 'PRESERVE');

  // Phase 2: Aerodynamic spline flight (65 - 130f)
  const flightKine = calculateKinematics(frame, 65, 55, 'FLUID');
  const flightProgress = flightKine.position;

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.6} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.07</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>تبدیل ستون به منحنی پیوسته (Bar Chart ↔ Continuous Spline)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Vel Handoff: {handoff.isContinuousC1 ? 'PRESERVED' : 'DISCONTINUOUS'} • Flight: {(flightProgress * 100).toFixed(0)}%
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Foundation line */}
        <div style={{ position: 'absolute', left: 560, top: 720, width: 800, height: 2, backgroundColor: 'rgba(212,175,55,0.4)' }} />

        {/* 4 Bars compressing */}
        {xPositions.map((posX, i) => {
          const currentHeight = interpolate(compProgress, [0, 1], [heights[i], 0]);
          const currentTop = 720 - currentHeight;

          return (
            <div key={i}>
              {!isPostHandoff && (
                <div
                  style={{
                    position: 'absolute',
                    left: posX - 28,
                    top: currentTop,
                    width: 56,
                    height: currentHeight,
                    background: `linear-gradient(to top, rgba(212,175,55,0.15), rgba(56,189,248,0.4))`,
                    border: '1px solid rgba(212,175,55,0.6)',
                  }}
                />
              )}
              {/* Vertex Node */}
              <div
                style={{
                  position: 'absolute',
                  left: posX - 8,
                  top: (!isPostHandoff ? currentTop : 720) - 8,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: goldColor,
                  boxShadow: `0 0 16px ${cyanAccent}`,
                }}
              />
            </div>
          );
        })}

        {/* Connected Flight Spline Curve */}
        {frame >= 50 && (
          <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            <svg width={1920} height={1080}>
              <path
                d={`M 660 ${interpolate(flightProgress, [0, 1], [720, 520])} Q 930 ${interpolate(flightProgress, [0, 1], [720, 360])} 1200 ${interpolate(flightProgress, [0, 1], [720, 520])}`}
                fill="none"
                stroke={cyanAccent}
                strokeWidth={4}
                style={{ filter: `drop-shadow(0 0 20px ${cyanAccent})` }}
              />
            </svg>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
