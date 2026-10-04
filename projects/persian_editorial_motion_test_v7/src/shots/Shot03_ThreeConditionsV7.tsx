import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

/**
 * SHOT 03 — THE THREE INDISPENSABLE LAWS
 * Art Direction: Sequential Full-Screen Graphic Impacts (Zero SaaS 3-column table cards)
 * Synchronized to narration beats:
 * - 0 - 200f: Condition 1 (GPA 16 Monolith)
 * - 200 - 420f: Condition 2 (Legal Term & Disciplinary Reticle)
 * - 420 - 870f: Condition 3 (6 Categories Graphic Hexagon)
 */
export const Shot03_ThreeConditionsV7: React.FC = () => {
  const frame = useCurrentFrame();

  // Condition 1: GPA 16 (0 - 200f)
  const c1Op = interpolate(frame, [0, 25, 175, 200], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c1Scale = interpolate(frame, [0, 30], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Condition 2: Term & Disciplinary (185 - 420f)
  const c2Op = interpolate(frame, [190, 220, 395, 420], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c2Scale = interpolate(frame, [190, 225], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Condition 3: 6 Categories (405 - 870f)
  const c3Op = interpolate(frame, [410, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c3Scale = interpolate(frame, [410, 445], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Global exit (820 - 870f)
  const exitProgress = interpolate(frame, [820, 870], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const globalExitOp = interpolate(exitProgress, [0, 0.8], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#030611',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', sans-serif",
      }}
    >
      {/* Background Graphic Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 65%)',
        }}
      />

      {/* Persistent Scene Context Header */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 120,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          direction: 'rtl',
        }}
      >
        <div style={{ width: 8, height: 8, backgroundColor: '#D4AF37' }} />
        <span style={{ fontSize: 16, fontWeight: 800, color: '#D4AF37', letterSpacing: '1px' }}>
          شروط سه‌گانه بنیاد ملی نخبگان
        </span>
      </div>

      {/* CONDITION 1 HERO IMPACT (GPA 16) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 140px',
          direction: 'rtl',
          opacity: c1Op,
          pointerEvents: c1Op > 0.01 ? 'auto' : 'none',
        }}
      >
        <div style={{ maxWidth: 850 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8', letterSpacing: '2px' }}>
            FIRST CRITERION • شرط اول
          </span>
          <h1 style={{ fontSize: 72, fontWeight: 900, color: '#F8FAFC', margin: '12px 0 20px 0', lineHeight: 1.15 }}>
            حداقل معدل کل ۱۶
          </h1>
          <p style={{ fontSize: 26, color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
            معدل کل شما در مقطع تحصیلی فعلی باید حداقل ۱۶.۰۰ باشد.
          </p>
        </div>

        {/* Extreme Scale Typographic Number */}
        <div style={{ transform: `scale(${c1Scale})`, display: 'flex', alignItems: 'baseline', direction: 'ltr' }}>
          <span
            style={{
              fontSize: 220,
              fontWeight: 900,
              color: '#38BDF8',
              lineHeight: 0.8,
              textShadow: '0 0 50px rgba(56, 189, 248, 0.35)',
              letterSpacing: '-6px',
            }}
          >
            16
          </span>
          <span style={{ fontSize: 48, fontWeight: 800, color: '#64748B', marginLeft: 16 }}>/ 20</span>
        </div>
      </div>

      {/* CONDITION 2 HERO IMPACT (Legal Term & Disciplinary Approval) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 140px',
          direction: 'rtl',
          opacity: c2Op,
          pointerEvents: c2Op > 0.01 ? 'auto' : 'none',
        }}
      >
        <div style={{ maxWidth: 850 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#D4AF37', letterSpacing: '2px' }}>
            SECOND CRITERION • شرط دوم
          </span>
          <h1 style={{ fontSize: 72, fontWeight: 900, color: '#F8FAFC', margin: '12px 0 20px 0', lineHeight: 1.15 }}>
            سنوات مجاز و تأییدیه انضباطی
          </h1>
          <p style={{ fontSize: 26, color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
            تحصیل در بازه سنوات قانونی و اخذ تأییدیه رسمی کمیته انضباطی دانشگاه.
          </p>
        </div>

        {/* Graphic Stamp Stamp Reticle */}
        <div style={{ transform: `scale(${c2Scale})` }}>
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 900, color: '#D4AF37' }}>تأییدیه</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8', marginTop: 6 }}>کمیته انضباطی</span>
          </div>
        </div>
      </div>

      {/* CONDITION 3 HERO IMPACT (6 Categories Diversity) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 140px',
          direction: 'rtl',
          opacity: c3Op * globalExitOp,
          pointerEvents: c3Op > 0.01 ? 'auto' : 'none',
        }}
      >
        <div style={{ maxWidth: 850 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#10B981', letterSpacing: '2px' }}>
            THIRD CRITERION • شرط سوم
          </span>
          <h1 style={{ fontSize: 72, fontWeight: 900, color: '#F8FAFC', margin: '12px 0 20px 0', lineHeight: 1.15 }}>
            تنوع امتیاز از حداقل ۶ ماده
          </h1>
          <p style={{ fontSize: 26, color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
            کسب امتیاز حداقل از ۶ ماده مختلف آیین‌نامه، با الزام حضور مقاله یا فعالیت فناورانه.
          </p>
        </div>

        {/* Giant Numeral «۶» */}
        <div style={{ transform: `scale(${c3Scale})`, display: 'flex', alignItems: 'baseline', direction: 'ltr' }}>
          <span
            style={{
              fontSize: 220,
              fontWeight: 900,
              color: '#10B981',
              lineHeight: 0.8,
              textShadow: '0 0 50px rgba(16, 185, 129, 0.35)',
              letterSpacing: '-6px',
            }}
          >
            ≥6
          </span>
          <span style={{ fontSize: 44, fontWeight: 800, color: '#94A3B8', marginLeft: 16 }}>ماده</span>
        </div>
      </div>
    </div>
  );
};
