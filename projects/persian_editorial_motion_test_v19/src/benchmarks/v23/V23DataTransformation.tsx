import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 05 — DATA TRANSFORMATION
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Flow:
 * BAR CHART → COMPRESS TO NODES → CONNECT TO POLYLINE → CONTINUOUS TRAJECTORY
 * 
 * Strict Physical Invariant:
 * Bars do NOT fade out. Their vertical mass physically compresses into peak vertices,
 * which link together into a single continuous editorial vector trajectory.
 */
export const V23DataTransformation: React.FC = () => {
  const frame = useCurrentFrame();

  const baselineY = 720;
  const barConfigs = [
    { x: 480, height: 220, label: 'مرحله ۱' },
    { x: 720, height: 380, label: 'مرحله ۲' },
    { x: 960, height: 290, label: 'مرحله ۳' },
    { x: 1200, height: 490, label: 'مرحله ۴' },
    { x: 1440, height: 420, label: 'مرحله ۵' },
  ];

  // Phase 1 (0 - 45f): Bars erect and settle
  const barErect = interpolate(frame, [0, 35], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2 (50 - 95f): Bars compress vertically into top vertex nodes
  const compressProgress = interpolate(frame, [50, 90], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (90 - 135f): Node links draw between vertices
  const connectProgress = interpolate(frame, [90, 125], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (130 - 175f): Trajectory takes flight, shooting into continuous aerodynamic curve
  const flightProgress = interpolate(frame, [130, 165], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (165 - 210f): Trajectory settles into sovereign horizon datum
  const lineSettle = calculateSettleLock(frame, 175, {
    anticipationFrames: 8,
    settleFrames: 14,
    scalePeak: 1.08,
  });

  // Calculate current bar heights (compressing to 8px caps)
  const currentBars = barConfigs.map((bar) => {
    const erectedH = bar.height * barErect;
    const compressedH = interpolate(compressProgress, [0, 1], [erectedH, 8]);
    const topY = baselineY - (compressProgress < 1 ? compressedH : bar.height);
    return {
      ...bar,
      currentHeight: compressedH,
      topY,
    };
  });

  // Build SVG path string for connected line
  const startPt = currentBars[0];
  let polylinePath = `M ${startPt.x} ${startPt.topY}`;
  for (let i = 1; i < currentBars.length; i++) {
    const segP = Math.min(1, Math.max(0, (connectProgress * 4) - (i - 1)));
    const target = currentBars[i];
    const prev = currentBars[i - 1];
    const curX = interpolate(segP, [0, 1], [prev.x, target.x]);
    const curY = interpolate(segP, [0, 1], [prev.topY, target.topY]);
    polylinePath += ` L ${curX} ${curY}`;
  }

  // Smooth continuous aerodynamic curve in Phase 4
  const smoothCurvePath = `M 400 ${baselineY - 140} Q 960 ${baselineY - 580 - flightProgress * 60} 1520 ${baselineY - 360}`;

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.95} />

      {/* Header */}
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
          zIndex: 50,
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
            BENCHMARK 05
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            تحول داده: ستون‌ها → تراکم به گره‌ها → خط سیر پیوسته (Data Transformation)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 50 && 'فاز ۱: شکل‌گیری ستون‌های داده'}
          {frame >= 50 && frame < 90 && 'فاز ۲: فشردگی فیزیکی توده ستون‌ها به گره‌های راس'}
          {frame >= 90 && frame < 130 && 'فاز ۳: اتصال برداری گره‌ها به خط سیر شکسته'}
          {frame >= 130 && 'فاز ۴: تکامل به خط سیر آیرودینامیک پیوسته'}
        </span>
      </div>

      {/* Baseline Floor */}
      <div
        style={{
          position: 'absolute',
          top: baselineY,
          left: 360,
          right: 360,
          height: 2,
          backgroundColor: 'rgba(212, 175, 55, 0.4)',
        }}
      />

      {/* Physical Bars & Nodes */}
      {currentBars.map((bar, i) => {
        const barWidth = 64;
        const opacity = interpolate(compressProgress, [0.8, 1], [1, 0.2]);

        return (
          <React.Fragment key={i}>
            {/* The Bar Mass */}
            <div
              style={{
                position: 'absolute',
                left: bar.x - barWidth / 2,
                top: baselineY - bar.currentHeight,
                width: barWidth,
                height: bar.currentHeight,
                background: 'linear-gradient(180deg, #FDE047 0%, #D4AF37 40%, rgba(120, 53, 15, 0.6) 100%)',
                borderRadius: '4px 4px 0 0',
                border: '1.5px solid #D4AF37',
                borderBottom: 'none',
                boxShadow: '0 0 24px rgba(212, 175, 55, 0.3)',
                opacity,
              }}
            />

            {/* Peak Vertex Node */}
            <div
              style={{
                position: 'absolute',
                left: bar.x,
                top: bar.topY,
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #D4AF37',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 20px #D4AF37, 0 0 10px #FFFFFF',
                opacity: barErect,
                zIndex: 10,
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Connected Vector Polyline (Phase 3 & 4) */}
      {connectProgress > 0 && flightProgress < 0.9 && (
        <svg
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15 }}
          width="1920"
          height="1080"
        >
          <path
            d={polylinePath}
            stroke="#FDE047"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(212, 175, 55, 0.8))',
            }}
          />
        </svg>
      )}

      {/* Aerodynamic Continuous Velocity Curve (Phase 4 & 5) */}
      {flightProgress > 0.1 && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 20,
            transform: `scale(${lineSettle.scale}) translateY(${lineSettle.translateY}px)`,
          }}
          width="1920"
          height="1080"
        >
          <path
            d={smoothCurvePath}
            stroke="#FFFFFF"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity={interpolate(flightProgress, [0.1, 0.4], [0, 1])}
            style={{
              filter: 'drop-shadow(0 0 24px #38BDF8) drop-shadow(0 0 40px rgba(212, 175, 55, 0.9))',
            }}
          />
        </svg>
      )}

      {/* Editorial Trajectory Callout */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        <span style={{ fontSize: 18, color: '#E2E8F0', fontWeight: 600 }}>
          تبدیل ستون‌ها به بردار پیوسته بدون پاک‌شدن عناصر، با حفظ تکانه و جهت دید
        </span>
      </div>
    </AbsoluteFill>
  );
};
