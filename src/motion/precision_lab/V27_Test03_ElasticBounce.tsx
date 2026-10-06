import React from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import {
  evaluatePhysicalBounce,
  PhysicalBounceConfig,
} from '../physics/PhysicalBounceRecipe';

/**
 * V28 PRECISION LAB — TEST 03: PHYSICAL BOUNCE & CONTACT DYNAMICS
 * 
 * Replaces unphysical piecewise Bézier with authoritative parabolic flight arcs,
 * velocity-dependent flight stretch, volume-conserving floor squash (1/scaleY),
 * exact 2-frame contact compression, and deterministic settle locks.
 * 
 * Duration: 90 frames (3.0s @ 30 FPS)
 */

const physicalBounceConfig: PhysicalBounceConfig = {
  startY: 180,
  floorY: 620,
  totalDurationFrames: 80,
  restitution: 0.64,
  bounceCount: 4,
  contactFrames: 2,
  maxSquash: 0.38,
  maxStretch: 0.22,
  settleThreshold: 3,
};

export const V27_Test03_ElasticBounce: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#10B981'; // Upgraded to emerald physical accent

  const evalBounce = evaluatePhysicalBounce(physicalBounceConfig, frame, 0);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '60px 100px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: goldColor, margin: 0 }}>
          V28 PRECISION LAB — TEST 03: PHYSICAL BOUNCE & CONTACT DYNAMICS
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 6 }}>
          Parabolic gravity acceleration, volume-conserving squash/stretch, and floor contact compression (Active: [{evalBounce.phase}])
        </p>

        {/* Stage */}
        <div style={{ position: 'relative', height: 650, marginTop: 60 }}>
          {/* Target Datum / Floor Line */}
          <div
            style={{
              position: 'absolute',
              left: 200,
              right: 200,
              top: physicalBounceConfig.floorY + 30, // ground tangent at base of ball (radius = 30)
              height: 2.5,
              backgroundColor: goldColor,
              boxShadow: `0 0 16px rgba(212, 175, 55, 0.4)`,
            }}
          />
          
          {/* Bouncing Entity with Volume-Conserved Deformation */}
          <div
            style={{
              position: 'absolute',
              left: 960 - 30,
              top: evalBounce.y - 30,
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: cyanAccent,
              boxShadow: `0 0 35px ${cyanAccent}`,
              transform: `scale(${evalBounce.scaleX}, ${evalBounce.scaleY})`,
              transformOrigin: '50% 100%', // Floor-pinned squash
            }}
          />

          {/* Velocity & Position HUD */}
          <div
            style={{
              position: 'absolute',
              right: 200,
              top: 160,
              fontFamily: 'monospace',
              fontSize: 14,
              color: 'rgba(255,255,255,0.7)',
              backgroundColor: 'rgba(4, 6, 10, 0.85)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '16px 20px',
            }}
          >
            <div>Y: {evalBounce.y.toFixed(1)} px</div>
            <div>VELOCITY: {evalBounce.velocity.toFixed(3)} px/f</div>
            <div>SCALE_X: {evalBounce.scaleX.toFixed(3)}</div>
            <div>SCALE_Y: {evalBounce.scaleY.toFixed(3)}</div>
            <div>BOUNCE_INDEX: {evalBounce.bounceIndex}</div>
            <div style={{ color: goldColor, marginTop: 8, fontWeight: 700 }}>
              PHASE: {evalBounce.phase}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
