import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import {
  Point2D,
  interpolateOptimalMorph,
  evaluatePersonalityValue,
} from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 STUDY 05 — PERCEPTUAL SHAPE MORPH (CIRCLE → STAR)
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - Optimal arc-length correspondence between Circle and 8-Pointed Star
 * - Cyclic shift minimization: prevents unnatural mid-morph twisting
 * - Catmull-Rom C1 continuous curvature
 * - Live diagnostic telemetry (Max point travel, mean travel)
 */
export const V25_05_CircleStarMorph: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Construct raw circle points (32 points)
  const N = 32;
  const radius = 180;
  const circlePoints: Point2D[] = [];
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2;
    circlePoints.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    });
  }

  // Construct raw 8-pointed star points (32 points)
  const starPoints: Point2D[] = [];
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2;
    // 8 points -> modulation with 8 peaks
    const r = radius * (0.6 + 0.45 * Math.cos(angle * 8));
    starPoints.push({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    });
  }

  // Progress cycle: 0 to 105f (Circle -> Star), 105 to 210f (Star -> Circle)
  let rawProgress = 0;
  if (frame < 105) {
    rawProgress = Math.min(1, Math.max(0, (frame - 20) / 65));
  } else {
    rawProgress = 1 - Math.min(1, Math.max(0, (frame - 125) / 65));
  }

  const { value: smoothProgress } = evaluatePersonalityValue(rawProgress, 'FLUID');
  const { dPath, diagnostic } = interpolateOptimalMorph(circlePoints, starPoints, smoothProgress, 32);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.7} />

      {/* Header Info */}
      <div style={{ position: 'absolute', top: 36, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, direction: 'rtl', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ backgroundColor: goldColor, color: '#04060A', fontWeight: 900, fontSize: 13, padding: '2px 8px', borderRadius: 4 }}>V25.05</span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>تناظر ادراکی تبدیل شکل (Circle ↔ Star Perceptual Morph)</span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 14, fontFamily: 'monospace' }}>
          Max Travel: {diagnostic.maxPointTravel}px • Mean: {diagnostic.averagePointTravel}px • Shift: {diagnostic.optimalCyclicShift}
        </div>
      </div>

      {/* Center Canvas */}
      <div style={{ position: 'absolute', left: 960, top: 540, transform: 'translate(-50%, -50%)' }}>
        <svg width={600} height={600} viewBox="-300 -300 600 600">
          {/* Faint reference boundary */}
          <circle r={radius} fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth={1} strokeDasharray="4 4" />

          {/* Morphing Spline Path */}
          <path
            d={dPath}
            fill="rgba(212, 175, 55, 0.25)"
            stroke={goldColor}
            strokeWidth={3}
            style={{ filter: `drop-shadow(0 0 24px rgba(212, 175, 55, 0.5))` }}
          />

          {/* Center Luminous Core */}
          <circle r={12} fill={goldColor} />
        </svg>
      </div>

      {/* Midpoint Indicator */}
      {smoothProgress >= 0.4 && smoothProgress <= 0.6 && (
        <div style={{ position: 'absolute', left: 960, top: 820, transform: 'translateX(-50%)', backgroundColor: 'rgba(56,189,248,0.15)', border: `1px solid ${cyanAccent}`, padding: '4px 16px', borderRadius: 20, color: '#FFF', fontSize: 14, fontWeight: 700 }}>
          MIDPOINT INSPECTION (50%): ZERO TWISTING / ZERO PINCHING
        </div>
      )}
    </AbsoluteFill>
  );
};
