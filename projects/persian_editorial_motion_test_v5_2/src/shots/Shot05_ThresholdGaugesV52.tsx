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

export const Shot05_ThresholdGaugesV52: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040711',
        overflow: 'hidden',
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
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
          opacity: entrance,
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
          امتیاز لازم بر اساس مقطع تحصیلی و تیپ دانشگاه
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
          حداقل امتیازات مصوب وزارت بهداشت جهت ورود پرونده به داوری متمرکز کشوری
        </p>
      </div>

      {/* Three Precision Gauges / Metric Monoliths */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 140,
          right: 140,
          bottom: 120,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 36,
          direction: 'rtl',
        }}
      >
        {THRESHOLDS.map((t) => {
          const itemProgress = interpolate(frame, [t.timing, t.timing + 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          // Step animation for number
          const currentScore = interpolate(
            frame,
            [t.timing, t.timing + 10, t.timing + 20, t.timing + 30],
            [0, t.steps[0], t.steps[1], t.points],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
          );

          return (
            <div
              key={t.level}
              style={{
                flex: 1,
                padding: '36px 30px',
                borderRadius: 22,
                background: 'rgba(8, 16, 34, 0.85)',
                backdropFilter: 'blur(20px)',
                border: `1.5px solid ${itemProgress > 0.8 ? t.accent : 'rgba(255,255,255,0.08)'}`,
                boxShadow: `0 20px 45px rgba(0,0,0,0.5), 0 0 30px ${t.accent}20`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: itemProgress,
                transform: `translateY(${(1 - itemProgress) * 40}px)`,
              }}
            >
              <div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC', marginBottom: 8 }}>
                  {t.level}
                </div>
                <div style={{ fontSize: 15, color: '#94A3B8' }}>
                  {t.sub}
                </div>
              </div>

              {/* Numerical Lock Value */}
              <div
                style={{
                  padding: '28px 20px',
                  borderRadius: 16,
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 64, fontWeight: 900, color: t.accent, fontFamily: 'monospace', lineHeight: 1 }}>
                  {Math.round(currentScore)}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#CBD5E1', marginTop: 12 }}>
                  حداقل امتیاز الزامی
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
