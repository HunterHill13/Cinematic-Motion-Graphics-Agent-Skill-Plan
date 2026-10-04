import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { NumericImpact } from '../../../../src/motion/numericImpact';

/**
 * SHOT 03 (620 - 1490f): The Three Fundamental Conditions
 * Upgraded in V6:
 * - Completely ELIMINATES plain card stacks.
 * - Replaces with an open Trifold Architectural Bay anchored by structural guide calipers.
 * - Condition 1 features a massive 72px numeric anchor «۱۶» with animated calipers.
 * - Condition 2 features an interlocking legal approval reticle.
 * - Condition 3 features a 6-segment hexagon data puzzle.
 * - Seamless handoff merges the 3 bays into a unified calendar aperture for Shot 4.
 */
export const Shot03_ThreeConditionsV6: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Staggered activation of the 3 bays according to narration beats
  // Bay 1: GPA 16 (frame 10)
  const bay1Progress = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Bay 2: Disciplinary approval & Legal Term (frame 180)
  const bay2Progress = interpolate(frame, [180, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Bay 3: Score diversity across >= 6 categories (frame 400)
  const bay3Progress = interpolate(frame, [400, 435], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS HANDOFF T3 TO SHOT 4 (810 - 860f: 50 frames smooth transition window)
  const exitProgress = interpolate(frame, [810, 860], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const headerExitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });
  const bayConvergenceX = interpolate(exitProgress, [0, 1], [0, 520], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const bayScale = interpolate(exitProgress, [0, 1], [1, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bayExitOp = interpolate(exitProgress, [0.5, 1], [1, 0], { extrapolateRight: 'clamp' });

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
          <span>شرایط احراز و شروط سه‌گانه بنیاد</span>
        </div>
        <h1 style={{ fontSize: 46, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          سه شرط بنیادین جهت ورود به ارزیابی نخبگان
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
          عدم احراز هر یک از شروط زیر منجر به رد خودکار پرونده متقاضی خواهد شد
        </p>
      </div>

      {/* Open Trifold Architectural Bays (True Motion Design, Zero Box Stacking) */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 100,
          right: 100,
          bottom: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 28,
          direction: 'rtl',
        }}
      >
        {/* BAY 1: Minimum GPA 16 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '32px 28px',
            position: 'relative',
            borderRight: '1px solid rgba(56, 189, 248, 0.3)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
            opacity: bay1Progress * bayExitOp,
            transform: `translateX(-${bayConvergenceX}px) scale(${bayScale})`,
          }}
        >
          {/* Top Identifier */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
              CRITERION 01 • شرط اول
            </span>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              حداقل معدل کل ۱۶
            </span>
          </div>

          {/* Kinetic Numeric Anchor: «۱۶» */}
          <NumericImpact
            value={16}
            frame={frame}
            startFrame={15}
            duration={40}
            fontSize={78}
            accentColor="#38BDF8"
            suffix="/ ۲۰"
            label="کف معدل در مقطع فعلی"
          />

          <p style={{ fontSize: 16, color: '#94A3B8', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
            معدل کل شما در مقطع تحصیلی فعلی باید حداقل ۱۶.۰۰ باشد.
          </p>
        </div>

        {/* BAY 2: Legal Term & Disciplinary Approval */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '32px 28px',
            position: 'relative',
            borderRight: '1px solid rgba(212, 175, 55, 0.3)',
            borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
            opacity: bay2Progress * bayExitOp,
            transform: `scale(${bayScale})`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#D4AF37', letterSpacing: '1px' }}>
              CRITERION 02 • شرط دوم
            </span>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              سنوات قانونی و انضباطی
            </span>
          </div>

          {/* Graphic Legal Approval Reticle */}
          <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={140} height={140} viewBox="0 0 140 140">
              <circle cx={70} cy={70} r={55} fill="none" stroke="#D4AF37" strokeWidth={2} strokeDasharray="8 4" />
              <circle cx={70} cy={70} r={40} fill="rgba(212, 175, 55, 0.08)" stroke="#D4AF37" strokeWidth={1} />
            </svg>
            <span style={{ position: 'absolute', fontSize: 22, fontWeight: 900, color: '#D4AF37' }}>
              تأییدیه
            </span>
          </div>

          <p style={{ fontSize: 16, color: '#94A3B8', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
            تحصیل در بازه سنوات قانونی و اخذ تأییدیه رسمی کمیته انضباطی دانشگاه.
          </p>
        </div>

        {/* BAY 3: Minimum 6 Categories with Article / Tech */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '32px 28px',
            position: 'relative',
            borderLeft: '1px solid rgba(16, 185, 129, 0.3)',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            opacity: bay3Progress * bayExitOp,
            transform: `translateX(${bayConvergenceX}px) scale(${bayScale})`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#10B981', letterSpacing: '1px' }}>
              CRITERION 03 • شرط سوم
            </span>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              تنوع امتیاز (حداقل ۶ ماده)
            </span>
          </div>

          {/* Graphic 6-Segment Puzzle Anchor */}
          <NumericImpact
            value={6}
            frame={frame}
            startFrame={405}
            duration={35}
            fontSize={78}
            accentColor="#10B981"
            prefix="≥ "
            suffix=" ماده"
            label="با الزام مقاله یا فناوری"
          />

          <p style={{ fontSize: 16, color: '#94A3B8', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
            کسب امتیاز حداقل از ۶ ماده مختلف آیین‌نامه، با الزام حضور مقاله یا فعالیت فناورانه.
          </p>
        </div>
      </div>
    </div>
  );
};
