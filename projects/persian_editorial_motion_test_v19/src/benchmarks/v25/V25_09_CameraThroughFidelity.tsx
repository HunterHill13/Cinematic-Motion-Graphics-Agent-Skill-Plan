import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateKinematics } from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 09 — CAMERA-THROUGH KINEMATICS
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - Authored camera plunge kinematics (not generic linear scale)
 * - Initial slow acceleration -> high-velocity aperture crossing -> smooth deceleration
 * - Multi-plane depth parallax across 3 portal layers
 */
export const V25_09_CameraThroughFidelity: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Kinematic solver for camera plunge over frames 20 to 120
  const camKine = calculateKinematics(frame, 20, 100, 'FLUID');
  const camScale = interpolate(camKine.position, [0, 1], [1.0, 3.4]);
  const camY = interpolate(camKine.position, [0, 1], [0, -40]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="azure" intensity={0.9} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.09</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>سینماتیک عبور دوربین از روزنه (Camera-Through Kinematics)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Cam Scale: {camScale.toFixed(2)}x • Vel: {camKine.velocity.toFixed(3)} • Accel: {camKine.acceleration.toFixed(2)}
        </div>
      </div>

      {/* Camera Rig Viewport */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${camScale}) translateY(${camY}px)`,
          transformOrigin: '960px 540px',
        }}
      >
        {/* Layer 1: Framing Portal Ring (Z = 0) */}
        <div
          style={{
            position: 'absolute',
            left: 960 - 200,
            top: 540 - 200,
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: `3px solid ${goldColor}`,
            boxShadow: `0 0 45px rgba(212, 175, 55, 0.6)`,
          }}
        />

        {/* Layer 2: Intermediate Ring (Z = -200) */}
        <div
          style={{
            position: 'absolute',
            left: 960 - 120,
            top: 540 - 120,
            width: 240,
            height: 240,
            borderRadius: '50%',
            border: `1.5px solid ${cyanAccent}`,
            opacity: interpolate(camScale, [1.0, 2.5, 3.4], [1, 0.8, 0]),
          }}
        />

        {/* Layer 3: Distant Star Core (Z = -600) */}
        <div
          style={{
            position: 'absolute',
            left: 960 - 30,
            top: 540 - 30,
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: goldColor,
            boxShadow: `0 0 30px #FFF`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
