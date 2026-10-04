import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

/**
 * SHOT 05 — THE THRESHOLD BENCHMARKS (ASCENDING MONUMENTS)
 * Art Direction: Ascending Typographic Monoliths with Extreme Scale Contrast
 * Zero dashboard bars. Zero cards.
 * 65 (Bachelor's) -> 110 (Medicine) -> 130 (PhD) rise like monumental typographic pillars directly on the canvas.
 */
export const Shot05_ThresholdGaugesV7: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Staggered Monumental Rises
  const p65Rise = interpolate(frame, [10, 45], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const p65Op = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });

  const p110Rise = interpolate(frame, [140, 175], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const p110Op = interpolate(frame, [140, 165], [0, 1], { extrapolateRight: 'clamp' });

  const p130Rise = interpolate(frame, [260, 295], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const p130Op = interpolate(frame, [260, 285], [0, 1], { extrapolateRight: 'clamp' });

  // Outgoing Transition (430 - 485f)
  const exitProgress = interpolate(frame, [430, 485], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

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
          background: 'radial-gradient(ellipse at 50% 60%, rgba(56, 189, 248, 0.05) 0%, transparent 60%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 140px',
          direction: 'rtl',
          opacity: entrance * exitOp,
        }}
      >
        {/* Header Block */}
        <div>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', letterSpacing: '1.5px' }}>
            MINIMUM THRESHOLDS • حدنصاب‌های مصوب
          </span>
          <h1 style={{ fontSize: 56, fontWeight: 900, color: '#F8FAFC', margin: '8px 0 0 0' }}>
            کف امتیازهای لازم برای هر مقطع تحصیلی
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
            ارقام رسمی اعلام‌شده در شیوه‌نامه اجرایی بنیاد ملی نخبگان
          </p>
        </div>

        {/* 3 Ascending Typographic Monoliths (Extreme Scale Contrast) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 40,
            marginBottom: 20,
          }}
        >
          {/* TIER 1: Bachelor's (65 Points) */}
          <div
            style={{
              flex: 1,
              transform: `translateY(${p65Rise}px)`,
              opacity: p65Op,
              borderTop: '2px solid rgba(56, 189, 248, 0.3)',
              paddingTop: 24,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
              TIER 01 • کارشناسی تیپ ۱
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 12, direction: 'ltr' }}>
              <span
                style={{
                  fontSize: 140,
                  fontWeight: 900,
                  color: '#38BDF8',
                  lineHeight: 0.8,
                  letterSpacing: '-5px',
                  textShadow: '0 0 40px rgba(56, 189, 248, 0.3)',
                }}
              >
                65
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#94A3B8', marginLeft: 12 }}>امتیاز</span>
            </div>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 12, display: 'block' }}>
              دانشگاه‌های علوم پزشکی تیپ یک
            </span>
          </div>

          {/* TIER 2: General Medicine (110 Points) */}
          <div
            style={{
              flex: 1,
              transform: `translateY(${p110Rise}px)`,
              opacity: p110Op,
              borderTop: '2px solid rgba(212, 175, 55, 0.4)',
              paddingTop: 24,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#D4AF37', letterSpacing: '1px' }}>
              TIER 02 • پزشکی، دندان، داروسازی
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 12, direction: 'ltr' }}>
              <span
                style={{
                  fontSize: 155,
                  fontWeight: 900,
                  color: '#D4AF37',
                  lineHeight: 0.8,
                  letterSpacing: '-5px',
                  textShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
                }}
              >
                110
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#94A3B8', marginLeft: 12 }}>امتیاز</span>
            </div>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 12, display: 'block' }}>
              دکتری حرفه‌ای و پزشکی عمومی
            </span>
          </div>

          {/* TIER 3: Ph.D. / Specialty (130 Points) */}
          <div
            style={{
              flex: 1,
              transform: `translateY(${p130Rise}px)`,
              opacity: p130Op,
              borderTop: '2px solid rgba(16, 185, 129, 0.4)',
              paddingTop: 24,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#10B981', letterSpacing: '1px' }}>
              TIER 03 • دکتری تخصصی و فلوشیپ
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 12, direction: 'ltr' }}>
              <span
                style={{
                  fontSize: 175,
                  fontWeight: 900,
                  color: '#10B981',
                  lineHeight: 0.8,
                  letterSpacing: '-6px',
                  textShadow: '0 0 50px rgba(16, 185, 129, 0.35)',
                }}
              >
                130
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#94A3B8', marginLeft: 12 }}>امتیاز</span>
            </div>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 12, display: 'block' }}>
              Ph.D، دستیاری و فوق‌تخصص
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
