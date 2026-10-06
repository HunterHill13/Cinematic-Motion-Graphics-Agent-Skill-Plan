import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { interpolateOptimalMorph, Point2D } from '../fidelity/MotionFidelityEngine';
import { evaluateAuthoredKeyframeTrack, AuthoredMotionTrack, MotionCurves } from '../curves/AuthoredKeyframeEngine';

/**
 * V27 PRECISION LAB — TEST 04: ARC-LENGTH TEMPORAL SHAPE MORPH
 * 
 * Compares:
 * 1. LINEAR TIME MORPH: Corners round immediately, stalls at midpoint, sudden snap.
 * 2. ARC-LENGTH CALIBRATED MORPH: Perceptual constant speed with crisp punctuation at destination.
 * 
 * Duration: 90 frames (3.0s @ 30 FPS)
 */

const morphTemporalTrack: AuthoredMotionTrack = {
  id: 'morph_tempo_track',
  totalDurationFrames: 60,
  profile: 'GLIDE',
  keyframes: [
    { time: 0.0, role: 'REST', value: 0.0 },
    { time: 0.15, role: 'LAUNCH', value: 0.1, curve: (t) => Math.pow(t, 2) },
    { time: 0.70, role: 'CRUISE', value: 0.85, curve: (t) => t },
    { time: 0.85, role: 'PUNCTUATION', value: 1.0, curve: MotionCurves.snapSettle },
    { time: 1.0, role: 'SETTLE', value: 1.0 },
  ],
};

export const V27_Test04_ShapeMorph: React.FC = () => {
  const frame = useCurrentFrame();
  const fClamped = Math.min(60, frame);

  // Raw Polygon Rect
  const polyRect: Point2D[] = [
    { x: -140, y: -90 },
    { x: 140, y: -90 },
    { x: 140, y: 90 },
    { x: -140, y: 90 },
  ];

  // Raw Polygon Star (10 points)
  const polyStar: Point2D[] = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const r = i % 2 === 0 ? 150 : 70;
    return {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    };
  });

  // 1. Uncalibrated Linear Parameter
  const linearProgress = fClamped / 60;
  const morphedLinear = interpolateOptimalMorph(polyRect, polyStar, linearProgress, 32);

  // 2. Arc-length Calibrated Parameter
  const evalTrack = evaluateAuthoredKeyframeTrack(morphTemporalTrack, frame, 0);
  const morphedCalibrated = interpolateOptimalMorph(polyRect, polyStar, evalTrack.value, 32);

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '60px 100px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: goldColor, margin: 0 }}>
          V27 PRECISION LAB — TEST 04: ARC-LENGTH TEMPORAL SHAPE MORPH
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 6 }}>
          Left: Linear Parameterization (Midpoint Stall)  |  Right: Arc-Length Calibrated (Uniform Perceptual Speed)
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 100 }}>
          {/* Left: Linear */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#EF4444', fontWeight: 700, fontSize: 14, marginBottom: 40 }}>
              LINEAR (t = {(linearProgress).toFixed(2)})
            </div>
            <svg width={400} height={400} viewBox="-200 -200 400 400">
              <path d={morphedLinear.dPath} fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth={2.5} />
            </svg>
          </div>

          {/* Right: Calibrated */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: cyanAccent, fontWeight: 700, fontSize: 14, marginBottom: 40 }}>
              ARC-LENGTH CALIBRATED (t = {evalTrack.value.toFixed(2)}) [{evalTrack.activeRole}]
            </div>
            <svg width={400} height={400} viewBox="-200 -200 400 400">
              <path d={morphedCalibrated.dPath} fill="rgba(56, 189, 248, 0.2)" stroke={cyanAccent} strokeWidth={2.5} />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
