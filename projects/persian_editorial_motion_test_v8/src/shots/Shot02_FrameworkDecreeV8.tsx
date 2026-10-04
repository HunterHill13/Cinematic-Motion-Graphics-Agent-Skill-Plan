import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateKineticEntry, calculateScalePunch } from '../primitives/motionPrimitives';

/**
 * SHOT 02 — MONUMENTAL LEGAL DECREE
 * V8 Continuous Motion Performance:
 * - Inherits the accelerated Gold Editorial Rule from Shot 01 seamlessly.
 * - Numeral «۲» slams in with kinetic anticipation and overshoot settle.
 * - Impact Reaction: Decree text displaces dynamically upon Numeral impact.
 * - Handoff: Numeral «۲» compresses into a high-density vector to ignite Criterion 1 in Shot 03.
 */
export const Shot02_FrameworkDecreeV8: React.FC = () => {
  const frame = useCurrentFrame();

  // Inherited entrance from Shot 1 rule momentum (0 - 40f)
  const ruleArrival = interpolate(frame, [0, 30], [1920, 700], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Numeral 2 Kinetic Slam with Overshoot (frame 15 - 50)
  const numEntry = calculateKineticEntry(frame, 15, 35, 60);
  const numPunch = calculateScalePunch(frame, 45, 1.09, 14);

  // Impact Reaction: Headline reacts with 6px vertical bounce on frame 45
  const headlineBounce = frame >= 45 && frame <= 60
    ? -6 * Math.sin(((frame - 45) / 15) * Math.PI)
    : 0;

  const textEntry = calculateKineticEntry(frame, 25, 35, 30);

  // Energy Transfer Handoff to Shot 3 (260 - 300f)
  // Numeral 2 compresses horizontally and accelerates toward left margin
  const exitProgress = interpolate(frame, [260, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const numCompressScaleX = interpolate(exitProgress, [0, 1], [1, 0.1]);
  const numExitShiftX = interpolate(exitProgress, [0, 1], [0, -300]);
  const exitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });

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
      {/* Background Graphic Shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.06) 0%, transparent 60%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 120px',
          direction: 'rtl',
          opacity: exitOp,
        }}
      >
        {/* Right Editorial Typographic Block */}
        <div style={{ flex: 1, maxWidth: 900, transform: `translateY(${headlineBounce}px)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px' }}>
              LEGAL DIRECTIVE • مستند قانونی
            </span>
          </div>

          <h1
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: '#F8FAFC',
              margin: 0,
              lineHeight: 1.2,
              opacity: textEntry.opacity,
              transform: textEntry.transform,
            }}
          >
            بند «ک» ماده ۲
            <br />
            <span style={{ color: '#38BDF8' }}>آیین‌نامه ارتقای اعضای هیئت علمی</span>
          </h1>

          {/* Inherited Gold Editorial Datum Rule */}
          <div
            style={{
              width: ruleArrival,
              maxWidth: 700,
              height: 2,
              backgroundColor: '#D4AF37',
              margin: '28px 0',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.35)',
            }}
          />

          <p style={{ fontSize: 24, color: '#94A3B8', margin: 0, lineHeight: 1.6, fontWeight: 500, opacity: textEntry.opacity }}>
            مصوب شورای هدایت استعدادهای درخشان و وزارت بهداشت، درمان و آموزش پزشکی جهت حمایت از پژوهشگران و فناوران
            برجسته.
          </p>
        </div>

        {/* Left Monumental Typographic Numeral «۲» (Actor C) */}
        <div
          style={{
            transform: `translateX(${numExitShiftX}px) scaleX(${numCompressScaleX}) scale(${numPunch})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: numEntry.opacity,
          }}
        >
          <span
            style={{
              fontSize: 260,
              fontWeight: 900,
              color: 'rgba(212, 175, 55, 0.14)',
              lineHeight: 0.8,
              fontFamily: "'YekanBakh', sans-serif",
              letterSpacing: '-10px',
              userSelect: 'none',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              padding: '20px 50px',
              borderRadius: 32,
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.1)',
            }}
          >
            ۲
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#D4AF37',
              letterSpacing: '3px',
              marginTop: 16,
            }}
          >
            ARTICLE 02 • MATEH 2
          </span>
        </div>
      </div>
    </div>
  );
};
