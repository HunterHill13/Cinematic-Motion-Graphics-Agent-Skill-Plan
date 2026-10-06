import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 02 — LETTERFORM → GEOMETRY
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Flow:
 * text («پ»)
 * → outline (vector stroke)
 * → geometric fragments (8 segmented vector paths + 3 dots)
 * → reorganize
 * → become a geometric object (Hexagonal Compass Star)
 * → return to typography (reverse assembly + hard settle lock).
 */
export const V23LetterformGeometry: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 -> 2 (0 - 40f): Solid Text to Outline
  const outlineProgress = interpolate(frame, [30, 60], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (60 - 110f): Fragmentation into 6 hexagonal perimeter facets + 3 dot nodes
  const fragmentProgress = interpolate(frame, [60, 105], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (105 - 150f): Settle into Hexagonal Star Emblem
  const emblemSettle = calculateSettleLock(frame, 130, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.12,
  });

  // Phase 5 (155 - 195f): Reassemble back into Letterform
  const reassembleProgress = interpolate(frame, [155, 190], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Final typography settle lock (f195)
  const finalSettle = calculateSettleLock(frame, 195, {
    anticipationFrames: 6,
    settleFrames: 12,
    scalePeak: 1.14,
  });

  // Blend forward & return: effective morph coordinate factor (0 = text, 1 = hexagon)
  let morphT = fragmentProgress;
  if (frame >= 155) {
    morphT = 1 - reassembleProgress;
  }

  // 6 Hexagonal Vertices (Radius 140px centered at 0,0)
  const hexRadius = 140;
  const hexPoints = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * 60 - 30) * (Math.PI / 180);
    return {
      x: hexRadius * Math.cos(angle),
      y: hexRadius * Math.sin(angle),
    };
  });

  // 6 Letterform Source Points for the body of «پ» (boat curve)
  const letterBodyPoints = [
    { x: 140, y: -40 },
    { x: 120, y: 20 },
    { x: 40, y: 35 },
    { x: -40, y: 35 },
    { x: -120, y: 20 },
    { x: -140, y: -40 },
  ];

  // 3 Dots Coordinates
  // In letter: triangle below base
  const dotLetterPos = [
    { x: 0, y: 80 },
    { x: -26, y: 110 },
    { x: 26, y: 110 },
  ];
  // In hexagon: inner orbital satellites
  const dotHexPos = [
    { x: 0, y: -50 },
    { x: -45, y: 35 },
    { x: 45, y: 35 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.95} />

      {/* Benchmark Header */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 12,
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 13,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            BENCHMARK 02
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            حرف → کالبد هندسی → بازآرایی → بازگشت (Letterform → Geometry → Reassemble)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 60 && 'فاز ۱: تبدیل حرف «پ» از توپر به خط پیرامونی (Outline)'}
          {frame >= 60 && frame < 155 && 'فاز ۲: تجزیه ساختار و بازآرایی به نشان شش‌ضلعی هندسی'}
          {frame >= 155 && 'فاز ۳: بازگشت قطعات به ساختار اولیه و قفل پایدار'}
        </span>
      </div>

      {/* Main Transformation Canvas */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${frame < 155 ? emblemSettle.scale : finalSettle.scale}) translateY(${frame < 155 ? emblemSettle.translateY : finalSettle.translateY}px)`,
          width: 500,
          height: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="480" height="480" viewBox="-240 -240 480 480" fill="none">
          {/* Interpolated Facet Edges between Letter Curve and Hexagon */}
          {hexPoints.map((target, idx) => {
            const nextIdx = (idx + 1) % hexPoints.length;
            const source = letterBodyPoints[idx];
            const sourceNext = letterBodyPoints[nextIdx];

            const curX1 = interpolate(morphT, [0, 1], [source.x, target.x]);
            const curY1 = interpolate(morphT, [0, 1], [source.y, target.y]);
            const curX2 = interpolate(morphT, [0, 1], [sourceNext.x, hexPoints[nextIdx].x]);
            const curY2 = interpolate(morphT, [0, 1], [sourceNext.y, hexPoints[nextIdx].y]);

            return (
              <line
                key={`edge-${idx}`}
                x1={curX1}
                y1={curY1}
                x2={curX2}
                y2={curY2}
                stroke="#D4AF37"
                strokeWidth={interpolate(morphT, [0, 1], [4.5, 2.5])}
                strokeLinecap="round"
                opacity={0.9}
              />
            );
          })}

          {/* Radiating geometric rays when settled in hexagon state */}
          {morphT > 0.4 && (
            <g opacity={(morphT - 0.4) / 0.6}>
              <circle cx="0" cy="0" r="170" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="0" cy="0" r="60" stroke="#38BDF8" strokeWidth="1.2" opacity="0.6" />
              {hexPoints.map((p, i) => (
                <line key={`ray-${i}`} x1="0" y1="0" x2={p.x} y2={p.y} stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
              ))}
            </g>
          )}

          {/* 3 Physical Dots / Nodes */}
          {dotLetterPos.map((dotL, i) => {
            const dotH = dotHexPos[i];
            const curX = interpolate(morphT, [0, 1], [dotL.x, dotH.x]);
            const curY = interpolate(morphT, [0, 1], [dotL.y, dotH.y]);
            const dotRadius = interpolate(morphT, [0, 1], [10, 7]);

            return (
              <g key={`dot-${i}`}>
                <circle
                  cx={curX}
                  cy={curY}
                  r={dotRadius}
                  fill="#D4AF37"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <circle
                  cx={curX}
                  cy={curY}
                  r={dotRadius * 2}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  opacity={morphT * 0.7}
                />
              </g>
            );
          })}
        </svg>

        {/* Text Solid Core Fade (Only in Phase 1 and Final Settle) */}
        {(frame < 45 || frame > 185) && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -58%)',
              fontFamily: 'Vazirmatn, system-ui, sans-serif',
              fontSize: 220,
              fontWeight: 900,
              color: '#FFFFFF',
              opacity: frame < 45 ? 1 - outlineProgress : interpolate(frame, [185, 200], [0, 1]),
              textShadow: '0 0 40px rgba(212, 175, 55, 0.6)',
              pointerEvents: 'none',
            }}
          >
            پ
          </div>
        )}
      </div>

      {/* Subtitle Annotation */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        <span style={{ fontSize: 20, color: '#E2E8F0', fontWeight: 600 }}>
          انتقال هویت از خطاطی به چندضلعی منتظم در سطح وکتورهای هندسی
        </span>
      </div>
    </AbsoluteFill>
  );
};
