import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

/**
 * SHOT 01 — IDENTITY CREST & EDITORIAL HOOK
 * Art Direction: Broadcast Title Sequence (Direction B: Kinetic Editorial Poster)
 * Zero generic UI cards, zero centered templates. Bold typographic rhythm and deliberate asymmetry.
 */
export const Shot01_IntroHookV7: React.FC = () => {
  const frame = useCurrentFrame();

  // Part 1: Baqiyatallah Institutional Identity (0 - 165f)
  const part1Op = interpolate(frame, [145, 165], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const crestReveal = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleX = interpolate(frame, [15, 50], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Part 2: Editorial Question Hook (155 - 380f)
  const part2Progress = interpolate(frame, [160, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Decisive Editorial Cut / Outgoing Transition (350 - 380f)
  const exitProgress = interpolate(frame, [350, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const exitMask = interpolate(exitProgress, [0, 1], [0, 100]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#030611',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', sans-serif",
        clipPath: exitProgress > 0 ? `inset(0 ${exitMask}% 0 0)` : undefined,
      }}
    >
      {/* Background Atmosphere: Monochromatic Editorial Shadowing */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 80% at 80% 40%, rgba(212, 175, 55, 0.07) 0%, transparent 60%)',
        }}
      />

      {/* PART 1: Broadcast Title Sequence (0 - 165f) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 140px',
          direction: 'rtl',
          opacity: part1Op,
        }}
      >
        {/* Left Typographic Monolith */}
        <div style={{ transform: `translateX(${titleX}px)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 36, height: 2, backgroundColor: '#D4AF37' }} />
            <span style={{ fontSize: 16, fontWeight: 800, color: '#D4AF37', letterSpacing: '2px' }}>
              OFFICIAL BROADCAST • کمیته تحقیقات و فناوری
            </span>
          </div>

          <h1 style={{ fontSize: 64, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.15 }}>
            دانشگاه علوم پزشکی
            <br />
            <span style={{ color: '#D4AF37' }}>بقیة‌الله (عج)</span>
          </h1>

          <p style={{ fontSize: 22, color: '#94A3B8', marginTop: 18, fontWeight: 500 }}>
            روابط عمومی کمیته تحقیقات و فناوری دانشجویی تقدیم می‌کند
          </p>
        </div>

        {/* Right Architectural Seal (Clean Macro Geometry) */}
        <div style={{ opacity: crestReveal, transform: `scale(${0.85 + crestReveal * 0.15})` }}>
          <svg width={260} height={260} viewBox="0 0 260 260">
            <circle cx={130} cy={130} r={115} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth={2} />
            <circle cx={130} cy={130} r={95} fill="rgba(8, 16, 34, 0.6)" stroke="#D4AF37" strokeWidth={3} />
            <path
              d="M 130 65 C 150 85 165 110 130 150 C 95 110 110 85 130 65 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth={3.5}
            />
            <circle cx={130} cy={130} r={10} fill="#38BDF8" />
          </svg>
        </div>
      </div>

      {/* PART 2: Asymmetric Poster Hook (155 - 380f) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 140px',
          direction: 'rtl',
          opacity: part2Progress,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{ width: 10, height: 10, backgroundColor: '#38BDF8' }} />
          <span style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
            راهنمای جامع آیین‌نامه نخبگان
          </span>
        </div>

        <h1
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: '#F8FAFC',
            margin: 0,
            lineHeight: 1.25,
            maxWidth: 1200,
          }}
        >
          آیا می‌دانید چگونه می‌توانید به‌عنوان{' '}
          <span
            style={{
              color: '#D4AF37',
              borderBottom: '3px solid #D4AF37',
              paddingBottom: 4,
            }}
          >
            دانشجوی پژوهشگر برجسته
          </span>
          <br />
          از تسهیلات بنیاد ملی نخبگان بهره‌مند شوید؟
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40 }}>
          <div style={{ width: 48, height: 2, backgroundColor: '#64748B' }} />
          <span style={{ fontSize: 16, color: '#64748B', fontWeight: 600 }}>
            ضوابط اجرایی، شروط سه‌گانه و حدنصاب‌های مصوب
          </span>
        </div>
      </div>
    </div>
  );
};
