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

export const Shot03_ThreeConditionsV52: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 25], [0, 1], {
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
          opacity: headerOp,
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

      {/* 3 Large Architectural Monolith Columns */}
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
        {CONDITIONS.map((c) => {
          const cardProgress = interpolate(frame, [c.timing, c.timing + 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={c.num}
              style={{
                flex: 1,
                padding: '36px 30px',
                borderRadius: 20,
                background: 'rgba(8, 16, 34, 0.85)',
                backdropFilter: 'blur(20px)',
                border: `1.5px solid ${cardProgress > 0.8 ? c.accent : 'rgba(255,255,255,0.08)'}`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 25px ${c.accent}15`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: cardProgress,
                transform: `translateY(${(1 - cardProgress) * 40}px)`,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: c.accent,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {c.enNum}
                  </span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 8,
                      backgroundColor: `${c.accent}20`,
                      fontSize: 14,
                      fontWeight: 800,
                      color: c.accent,
                    }}
                  >
                    {c.num}
                  </span>
                </div>

                <h2 style={{ fontSize: 26, fontWeight: 900, color: '#F8FAFC', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                  {c.title}
                </h2>

                <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
                  {c.rule}
                </p>
              </div>

              {/* Dynamic Graphic Base */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: 14,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 28, fontWeight: 900, color: c.accent, fontFamily: 'monospace' }}>
                  {c.num === 'شرط اول' ? 'GPA ≥ 16.0' : c.num === 'شرط دوم' ? 'LEGAL DISCIPLINE' : '≥ 6 ARTICLES'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
