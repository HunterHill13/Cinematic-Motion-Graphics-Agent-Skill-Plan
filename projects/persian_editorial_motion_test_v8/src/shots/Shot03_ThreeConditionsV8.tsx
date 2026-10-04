import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateKineticEntry, calculateScalePunch } from '../primitives/motionPrimitives';

/**
 * SHOT 03 — THE THREE INDISPENSABLE LAWS
 * V8 Continuous Motion Performance:
 * - Inherits compressed energy of Article 2, detonating Numeral «16».
 * - Seamless migration from Criterion 1 -> Criterion 2 -> Criterion 3.
 * - Handoff: The ground baseline rotates 90 degrees into the Temporal Wall of Shot 04.
 */
export const Shot03_ThreeConditionsV8: React.FC = () => {
  const frame = useCurrentFrame();

  // Condition 1: GPA 16 (0 - 200f)
  const c1Punch = calculateScalePunch(frame, 15, 1.09, 14);
  const c1Op = interpolate(frame, [0, 20, 180, 200], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c1ShiftX = interpolate(frame, [180, 200], [0, -100]);

  // Condition 2: Term & Disciplinary (185 - 420f)
  const c2StampPunch = calculateScalePunch(frame, 210, 1.15, 16);
  const c2Op = interpolate(frame, [190, 215, 400, 420], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Condition 3: 6 Categories (405 - 870f)
  const c3Punch = calculateScalePunch(frame, 430, 1.09, 14);
  const c3Op = interpolate(frame, [410, 435], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spatial Recomposition Handoff to Shot 4 (820 - 870f)
  // Horizontal datum rule rotates 90deg to become the temporal dividing wall
  const exitProgress = interpolate(frame, [820, 870], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const wallRotate = interpolate(exitProgress, [0, 1], [0, 90]);
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
          transform: `translateX(${c1ShiftX}px)`,
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
        <div style={{ transform: `scale(${c1Punch})`, display: 'flex', alignItems: 'baseline', direction: 'ltr' }}>
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

        {/* Graphic Stamp Stamp Reticle with Impact Punch */}
        <div style={{ transform: `scale(${c2StampPunch})` }}>
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
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

        {/* Giant Numeral «۶» with Punch */}
        <div style={{ transform: `scale(${c3Punch})`, display: 'flex', alignItems: 'baseline', direction: 'ltr' }}>
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

      {/* Persistent Actor B: Rotating Axis Rule for Spatial Recomposition */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transformOrigin: 'center center',
          transform: `translateX(-50%) rotate(${wallRotate}deg)`,
          width: 700,
          height: 3,
          backgroundColor: '#F59E0B',
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
          opacity: exitProgress > 0.01 ? 1 : 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
