import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { NumericImpact } from '../../../../src/motion/numericImpact';

interface MetricColumn {
  level: string;
  sub: string;
  points: number;
  accent: string;
  timing: number;
}

const TIERS: MetricColumn[] = [
  {
    level: 'کارشناسی (تیپ یک)',
    sub: 'دانشگاه‌های علوم پزشکی تیپ ۱',
    points: 65,
    accent: '#38BDF8',
    timing: 10,
  },
  {
    level: 'پزشکی عمومی',
    sub: 'دکتری عمومی، داروسازی و دندان',
    points: 110,
    accent: '#D4AF37',
    timing: 140,
  },
  {
    level: 'دکترای تخصصی (Ph.D)',
    sub: 'رشته‌های تخصصی، فوق‌تخصص و فلوشیپ',
    points: 130,
    accent: '#10B981',
    timing: 260,
  },
];

/**
 * SHOT 05 (1700 - 2185f): Passing Thresholds Across University Tiers
 * Upgraded in V6:
 * - Completely ELIMINATES bulky glass cards.
 * - Replaces with open Kinetic Numeric Monoliths and animated vertical coordinate gauges.
 * - Numbers 65, 110, 130 are massive 78px primary graphic anchors.
 * - Seamless handoff converges the 3 numbers inward into the central seal for Shot 6.
 */
export const Shot05_ThresholdGaugesV6: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS HANDOFF T5 TO SHOT 6 (420 - 475f: 55 frames smooth transition window)
  const exitProgress = interpolate(frame, [420, 475], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const headerExitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });
  const convergeX = interpolate(exitProgress, [0, 1], [0, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const convergeScale = interpolate(exitProgress, [0, 1], [1, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const convergeOp = interpolate(exitProgress, [0.65, 1], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040711',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: entrance * headerExitOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            padding: '6px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            marginBottom: 14,
            fontSize: 15,
            fontWeight: 700,
            color: '#38BDF8',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38BDF8' }} />
          <span>جدول حدنصاب امتیازات مصوب</span>
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          کف امتیازهای لازم برای هر مقطع تحصیلی
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
          نمونه مقادیر حدنصاب طبق جدیدترین شیوه‌نامه مصوب بنیاد ملی نخبگان
        </p>
      </div>

      {/* 3 Kinetic Numeric Monoliths (True Motion Design, No Card Boxes) */}
      <div
        style={{
          position: 'absolute',
          top: 230,
          left: 100,
          right: 100,
          bottom: 110,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 32,
          direction: 'rtl',
        }}
      >
        {TIERS.map((tier, idx) => {
          const tierEntry = interpolate(frame, [tier.timing, tier.timing + 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          // Horizontal convergence calculation for T5 exit
          const columnShiftX = idx === 0 ? -convergeX : idx === 2 ? convergeX : 0;

          // Vertical progress bar height percentage
          const barHeightPercent = interpolate(
            frame,
            [tier.timing + 10, tier.timing + 55],
            [0, (tier.points / 150) * 100],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }
          );

          return (
            <div
              key={tier.level}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 20px',
                position: 'relative',
                opacity: tierEntry * convergeOp,
                transform: `translateX(${columnShiftX}px) scale(${convergeScale})`,
                borderRight: `1px solid ${tier.accent}40`,
                borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Level Title */}
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: tier.accent, letterSpacing: '1px' }}>
                  TIER 0{idx + 1} • حدنصاب مقطع
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC', margin: '6px 0 0 0' }}>
                  {tier.level}
                </h3>
                <span style={{ fontSize: 14, color: '#94A3B8', marginTop: 4, display: 'block' }}>
                  {tier.sub}
                </span>
              </div>

              {/* Central Graphic Gauge: Animated Vertical Rail */}
              <div
                style={{
                  width: 8,
                  height: 160,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  margin: '12px 0',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${barHeightPercent}%`,
                    backgroundColor: tier.accent,
                    boxShadow: `0 0 16px ${tier.accent}`,
                    borderRadius: 4,
                  }}
                />
              </div>

              {/* Massive Kinetic Numeric Anchor */}
              <NumericImpact
                value={tier.points}
                frame={frame}
                startFrame={tier.timing + 5}
                duration={45}
                fontSize={72}
                accentColor={tier.accent}
                suffix=" امتیاز"
                label="کف امتیاز مجاز جهت پذیرش"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
