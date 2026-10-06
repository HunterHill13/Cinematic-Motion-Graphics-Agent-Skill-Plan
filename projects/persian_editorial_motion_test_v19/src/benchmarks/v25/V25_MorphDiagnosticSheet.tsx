import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Point2D,
  interpolateOptimalMorph,
} from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 — MORPH DIAGNOSTIC SHEET (4K UHD 3840x2160)
 * Evaluates perceptual shape correspondence across 4 canonical test pairs:
 * 1. Circle ↔ 8-Pointed Star
 * 2. Circle ↔ Rounded Square (Squircle)
 * 3. Rounded Square ↔ 8-Pointed Star
 * 4. Letterform Glyph ↔ Geometric Emblem
 * 
 * Inspects: 0% (Source), 50% (Critical Midpoint), 75%, 100% (Destination).
 */
export const V25_MorphDiagnosticSheet: React.FC = () => {
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';
  const N = 32;
  const radius = 120;

  // 1. Circle Points
  const circlePoints: Point2D[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    circlePoints.push({ x: radius * Math.cos(a), y: radius * Math.sin(a) });
  }

  // 2. Star Points
  const starPoints: Point2D[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r = radius * (0.55 + 0.5 * Math.cos(a * 8));
    starPoints.push({ x: r * Math.cos(a), y: r * Math.sin(a) });
  }

  // 3. Squircle Points
  const squirclePoints: Point2D[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    // Superellipse n=4
    const cosT = Math.cos(a);
    const sinT = Math.sin(a);
    const r = radius / Math.pow(Math.pow(Math.abs(cosT), 4) + Math.pow(Math.abs(sinT), 4), 0.25);
    squirclePoints.push({ x: r * cosT, y: r * sinT });
  }

  const morphPairs = [
    { name: 'Pair 1: Circle → 8-Pointed Star', polyA: circlePoints, polyB: starPoints },
    { name: 'Pair 2: Circle → Squircle', polyA: circlePoints, polyB: squirclePoints },
    { name: 'Pair 3: Squircle → 8-Pointed Star', polyA: squirclePoints, polyB: starPoints },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020306',
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
        fontFamily: 'Vazirmatn, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
          paddingBottom: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#020306',
              fontSize: 22,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 6,
              marginRight: 18,
            }}
          >
            V25 DIAGNOSTIC
          </span>
          <span style={{ color: '#F8FAFC', fontSize: 32, fontWeight: 900 }}>
            PERCEPTUAL MORPH QUALITY & MIDPOINT CORRESPONDENCE (4K UHD)
          </span>
        </div>
        <div style={{ color: cyanAccent, fontSize: 20, fontWeight: 600 }}>
          32-Point Arc-Length Resampling • Winding Normalized • Zero Midpoint Pinching
        </div>
      </div>

      {/* Grid of Morph Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, flex: 1 }}>
        {morphPairs.map((pair, rowIdx) => {
          // Precompute diagnostic
          const { diagnostic: diag50 } = interpolateOptimalMorph(pair.polyA, pair.polyB, 0.5, N);

          return (
            <div
              key={rowIdx}
              style={{
                backgroundColor: '#070A10',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 8,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#F8FAFC', fontSize: 22, fontWeight: 800 }}>
                  {pair.name}
                </span>
                <span style={{ color: cyanAccent, fontSize: 16, fontFamily: 'monospace' }}>
                  Max Travel: {diag50.maxPointTravel}px • Mean Travel: {diag50.averagePointTravel}px • Optimal Shift: {diag50.optimalCyclicShift}
                </span>
              </div>

              {/* 4 Stages: 0%, 50%, 75%, 100% */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                {[0.0, 0.5, 0.75, 1.0].map((stageProgress, stageIdx) => {
                  const { dPath } = interpolateOptimalMorph(pair.polyA, pair.polyB, stageProgress, N);
                  const isMidpoint = stageProgress === 0.5;

                  return (
                    <div
                      key={stageIdx}
                      style={{
                        backgroundColor: '#04060A',
                        border: isMidpoint ? `2px solid ${cyanAccent}` : '1px solid rgba(212,175,55,0.2)',
                        borderRadius: 6,
                        padding: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: isMidpoint ? cyanAccent : '#94A3B8',
                          marginBottom: 8,
                        }}
                      >
                        {stageProgress === 0 ? 'STAGE 0% (SOURCE)' : stageProgress === 0.5 ? 'STAGE 50% (MIDPOINT INSPECTION)' : stageProgress === 0.75 ? 'STAGE 75% (SURGE)' : 'STAGE 100% (TARGET)'}
                      </div>

                      <svg width={260} height={260} viewBox="-150 -150 300 300">
                        <path
                          d={dPath}
                          fill="rgba(212, 175, 55, 0.25)"
                          stroke={isMidpoint ? cyanAccent : goldColor}
                          strokeWidth={2.5}
                          style={{ filter: isMidpoint ? `drop-shadow(0 0 16px ${cyanAccent})` : 'none' }}
                        />
                        <circle r={6} fill={goldColor} />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
