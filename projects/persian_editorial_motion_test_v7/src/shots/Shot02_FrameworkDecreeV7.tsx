import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

/**
 * SHOT 02 — MONUMENTAL LEGAL DECREE
 * Art Direction: Swiss Typographic / Monumental Editorial Spread (Zero web cards)
 * Left side: Giant numeral «۲» bleeding off frame.
 * Right side: Authoritative decree typographic block anchored by editorial rules.
 */
export const Shot02_FrameworkDecreeV7: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const numScale = interpolate(frame, [0, 45], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ruleWidth = interpolate(frame, [15, 60], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Outgoing Transition (260 - 300f)
  const exitProgress = interpolate(frame, [260, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const exitShiftY = interpolate(exitProgress, [0, 1], [0, -60]);
  const exitOp = interpolate(exitProgress, [0, 0.7], [1, 0], { extrapolateRight: 'clamp' });

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
          opacity: entrance * exitOp,
          transform: `translateY(${exitShiftY}px)`,
        }}
      >
        {/* Right Editorial Typographic Block */}
        <div style={{ flex: 1, maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#D4AF37', letterSpacing: '1.5px' }}>
              LEGAL DIRECTIVE • مستند قانونی
            </span>
          </div>

          <h1 style={{ fontSize: 62, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.2 }}>
            بند «ک» ماده ۲
            <br />
            <span style={{ color: '#38BDF8' }}>آیین‌نامه ارتقای اعضای هیئت علمی</span>
          </h1>

          {/* Editorial Framing Rule */}
          <div
            style={{
              width: `${ruleWidth}%`,
              maxWidth: 700,
              height: 2,
              backgroundColor: '#D4AF37',
              margin: '28px 0',
            }}
          />

          <p style={{ fontSize: 24, color: '#94A3B8', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
            مصوب شورای هدایت استعدادهای درخشان و وزارت بهداشت، درمان و آموزش پزشکی جهت حمایت از پژوهشگران و فناوران
            برجسته.
          </p>
        </div>

        {/* Left Monumental Typographic Numeral «۲» (Macro Scale Contrast) */}
        <div
          style={{
            transform: `scale(${numScale})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.85,
          }}
        >
          <span
            style={{
              fontSize: 260,
              fontWeight: 900,
              color: 'rgba(212, 175, 55, 0.12)',
              lineHeight: 0.8,
              fontFamily: "'YekanBakh', sans-serif",
              letterSpacing: '-10px',
              userSelect: 'none',
              border: '2px solid rgba(212, 175, 55, 0.25)',
              padding: '20px 50px',
              borderRadius: 32,
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
