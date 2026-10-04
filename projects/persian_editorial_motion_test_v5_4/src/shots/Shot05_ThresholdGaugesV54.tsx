import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

interface ThresholdGauge {
  level: string;
  sub: string;
  points: number;
  steps: number[];
  accent: string;
  timing: number;
}

const THRESHOLDS: ThresholdGauge[] = [
  {
    level: 'کارشناسی (تیپ یک)',
    sub: 'دانشگاه‌های علوم پزشکی تیپ ۱',
    points: 65,
    steps: [30, 50, 65],
    accent: '#38BDF8',
    timing: 10,
  },
  {
    level: 'پزشکی عمومی',
    sub: 'دکتری عمومی و داروسازی/دندان',
    points: 110,
    steps: [70, 95, 110],
    accent: '#D4AF37',
    timing: 140,
  },
  {
    level: 'دکترای تخصصی (Ph.D)',
    sub: 'رشته‌های تخصصی، فوق‌تخصص و فلوشیپ',
    points: 130,
    steps: [90, 115, 130],
    accent: '#10B981',
    timing: 260,
  },
];

export const Shot05_ThresholdGaugesV54: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS TRANSITION T5 TO SHOT 6 (420 - 475f: 55 frames smooth transition window)
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
  const convergeScale = interpolate(exitProgress, [0, 1], [1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const convergeOp = interpolate(exitProgress, [0.6, 1], [1, 0], { extrapolateRight: 'clamp' });

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
            padding: '6px 20px',
            borderRadius: 999,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: 12,
            fontSize: 15,
            fontWeight: 700,
            color: '#38BDF8',
          }}
        >
          جدول حدنصاب‌های قبولی
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          کف امتیازهای لازم برای هر مقطع تحصیلی
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
          نمونه مقادیر حدنصاب طبق جدیدترین شیوه‌نامه مصوب
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 120,
          right: 120,
          bottom: 120,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 32,
          direction: 'rtl',
        }}
      >
        {THRESHOLDS.map((th, idx) => {
          const cardEntry = interpolate(frame, [th.timing, th.timing + 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          const translateY = interpolate(cardEntry, [0, 1], [40, 0]);
          const currentCount = Math.round(
            interpolate(frame, [th.timing + 10, th.timing + 60], [0, th.points], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })
          );

          // Card 0 shifts right (+X), Card 2 shifts left (-X), Card 1 stays in center
          const cardConvergeX = idx === 0 ? -convergeX : idx === 2 ? convergeX : 0;

          return (
            <div
              key={th.level}
              style={{
                flex: 1,
                borderRadius: 24,
                backgroundColor: 'rgba(8, 16, 34, 0.85)',
                backdropFilter: 'blur(16px)',
                border: `2px solid ${th.accent}40`,
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: cardEntry * convergeOp,
                transform: `translateY(${translateY}px) translateX(${cardConvergeX}px) scale(${convergeScale})`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Monolith Top Glow Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 6,
                  backgroundColor: th.accent,
                  boxShadow: `0 0 16px ${th.accent}`,
                }}
              />

              <div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: th.accent,
                    letterSpacing: '0.05em',
                  }}
                >
                  {th.sub}
                </span>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#F8FAFC', margin: '8px 0 24px 0' }}>
                  {th.level}
                </h3>

                {/* Score Number Display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 64,
                      fontWeight: 900,
                      color: th.accent,
                      fontFamily: 'monospace',
                      lineHeight: 1,
                    }}
                  >
                    {currentCount}
                  </span>
                  <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 700 }}>امتیاز</span>
                </div>
              </div>

              {/* Progress Bar Gauge */}
              <div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(currentCount / th.points) * 100}%`,
                      backgroundColor: th.accent,
                      borderRadius: 4,
                      boxShadow: `0 0 12px ${th.accent}`,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 12,
                    fontSize: 13,
                    color: '#64748B',
                  }}
                >
                  <span>کف ورود: ۳۰</span>
                  <span>حدنصاب نهایی: {th.points}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
