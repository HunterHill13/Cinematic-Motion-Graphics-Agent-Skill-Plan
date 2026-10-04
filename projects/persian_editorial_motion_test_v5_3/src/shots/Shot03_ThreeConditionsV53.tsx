import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

interface ConditionCard {
  num: string;
  enNum: string;
  title: string;
  rule: string;
  accent: string;
  timing: number;
}

const CONDITIONS: ConditionCard[] = [
  {
    num: 'شرط اول',
    enNum: 'CRITERION 01',
    title: 'حداقل معدل کل ۱۶',
    rule: 'معدل کل شما در مقطع تحصیلی فعلی باید حداقل ۱۶.۰۰ باشد.',
    accent: '#38BDF8',
    timing: 10,
  },
  {
    num: 'شرط دوم',
    enNum: 'CRITERION 02',
    title: 'سنوات مجاز و تأییدیه انضباطی',
    rule: 'تحصیل در بازه سنوات قانونی و اخذ تأییدیه رسمی کمیته انضباطی دانشگاه.',
    accent: '#D4AF37',
    timing: 180,
  },
  {
    num: 'شرط سوم',
    enNum: 'CRITERION 03',
    title: 'تنوع امتیاز از حداقل ۶ ماده',
    rule: 'کسب امتیاز حداقل از ۶ ماده مختلف آیین‌نامه، با الزام حضور مقاله یا فعالیت فناورانه.',
    accent: '#10B981',
    timing: 400,
  },
];

export const Shot03_ThreeConditionsV53: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // CONTINUITY TRANSITION TO SHOT 4 (810 - 840f)
  // Condition 1 & 2 fade out, while Condition 3 expands and shifts into the central Time Gate position
  const exitProgress = interpolate(frame, [810, 840], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });

  const cards12Op = interpolate(exitProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' });
  const card3ShiftX = interpolate(exitProgress, [0, 1], [0, 560], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const headerExitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });

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
            radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.06) 0%, transparent 65%),
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
          opacity: headerOp * headerExitOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            padding: '6px 20px',
            borderRadius: 999,
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: 12,
            fontSize: 15,
            fontWeight: 700,
            color: '#D4AF37',
          }}
        >
          پیش‌شرط‌های بنیادین
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          ۳ شرط اصلی پیش از محاسبه امتیازها
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
          شروط ورود به ارزیابی کارشناسی بر اساس مفاد مصرح آیین‌نامه کشوری
        </p>
      </div>

      {/* 3 Architectural Monolith Columns */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 120,
          right: 120,
          bottom: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 32,
          direction: 'rtl',
        }}
      >
        {CONDITIONS.map((c, i) => {
          const cardEntry = interpolate(frame, [c.timing, c.timing + 35], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          const translateY = interpolate(cardEntry, [0, 1], [40, 0]);
          const isThird = i === 2;
          const currentOp = isThird ? cardEntry : cardEntry * cards12Op;
          const currentTransform = isThird
            ? `translateY(${translateY}px) translateX(${card3ShiftX}px)`
            : `translateY(${translateY}px)`;

          return (
            <div
              key={c.enNum}
              style={{
                flex: 1,
                borderRadius: 24,
                backgroundColor: 'rgba(8, 16, 34, 0.85)',
                backdropFilter: 'blur(16px)',
                border: `2px solid ${c.accent}40`,
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: currentOp,
                transform: currentTransform,
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
                  backgroundColor: c.accent,
                  boxShadow: `0 0 16px ${c.accent}`,
                }}
              />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: c.accent,
                      letterSpacing: '0.08em',
                      fontFamily: 'monospace',
                    }}
                  >
                    {c.enNum}
                  </span>
                  <div
                    style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      backgroundColor: `${c.accent}15`,
                      border: `1px solid ${c.accent}30`,
                      fontSize: 13,
                      fontWeight: 700,
                      color: c.accent,
                    }}
                  >
                    {c.num}
                  </div>
                </div>

                <h3 style={{ fontSize: 28, fontWeight: 900, color: '#F8FAFC', margin: '0 0 16px 0', lineHeight: 1.3 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                  {c.rule}
                </p>
              </div>

              {/* Status Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: c.accent,
                    boxShadow: `0 0 8px ${c.accent}`,
                  }}
                />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>شرط الزامی ورود</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
