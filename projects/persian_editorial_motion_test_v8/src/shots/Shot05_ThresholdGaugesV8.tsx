import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateKineticEntry, calculateScalePunch } from '../primitives/motionPrimitives';

/**
 * SHOT 05 — THE THRESHOLD BENCHMARKS (ASCENDING MONUMENTS)
 * V8 Continuous Motion Performance:
 * - Inherits flattened horizontal datum from Shot 04.
 * - Staggered monumental surges with kinetic entry & scale punch:
 *   65 (Bachelor's) -> 110 (Medicine) -> 130 (PhD).
 * - Impact Reactions & Unified Horizontal Authority.
 * - Handoff: Type B Graphic Convergence — The 3 monoliths collapse inward
 *   towards center (960, 540), compressing into a high-density energy point for Shot 06.
 */
export const Shot05_ThresholdGaugesV8: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Staggered Monumental Surges using V8 Kinetic Entry
  const m65Entry = calculateKineticEntry(frame, 10, 32, 50);
  const m65Punch = calculateScalePunch(frame, 42, 1.08, 12);

  const m110Entry = calculateKineticEntry(frame, 140, 32, 50);
  const m110Punch = calculateScalePunch(frame, 172, 1.08, 12);

  const m130Entry = calculateKineticEntry(frame, 260, 32, 50);
  const m130Punch = calculateScalePunch(frame, 292, 1.09, 14);

  // Subtle breathing micro-motion during hold (295 - 430f)
  const breathingScale = frame >= 295 && frame <= 430
    ? 1.0 + 0.005 * Math.sin(((frame - 295) / 135) * Math.PI * 2)
    : 1.0;

  // Handoff to Shot 6: Type B Graphic Convergence (430 - 485f)
  // All 3 monoliths compress inward towards (960, 540)
  const exitProgress = interpolate(frame, [430, 485], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const exitOp = interpolate(exitProgress, [0, 0.65], [1, 0], { extrapolateRight: 'clamp' });
  const convergenceScale = interpolate(exitProgress, [0, 1], [1, 0.05]);

  // Center energy node ignites as columns collapse (450 - 485f)
  const energyIgnition = interpolate(frame, [445, 485], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Convergence shifts: Tier 1 (left in RTL, right in screen) moves left; Tier 3 moves right
  const tier1ShiftX = interpolate(exitProgress, [0, 1], [0, -320]);
  const tier3ShiftX = interpolate(exitProgress, [0, 1], [0, 320]);

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
          background: 'radial-gradient(ellipse at 50% 60%, rgba(56, 189, 248, 0.06) 0%, transparent 65%)',
        }}
      />

      {/* Main Content Stage */}
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
          transform: `scale(${breathingScale * convergenceScale})`,
          transformOrigin: '50% 50%',
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

        {/* 3 Ascending Typographic Monoliths with Continuous Baseline */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 40,
            marginBottom: 20,
            position: 'relative',
          }}
        >
          {/* TIER 1: Bachelor's (65 Points) */}
          <div
            style={{
              flex: 1,
              transform: `${m65Entry.transform} scale(${m65Punch}) translateX(${tier1ShiftX}px)`,
              opacity: m65Entry.opacity,
              borderTop: '2px solid rgba(56, 189, 248, 0.35)',
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
                  textShadow: '0 0 40px rgba(56, 189, 248, 0.35)',
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
              transform: `${m110Entry.transform} scale(${m110Punch})`,
              opacity: m110Entry.opacity,
              borderTop: '2px solid rgba(212, 175, 55, 0.45)',
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
                  textShadow: '0 0 40px rgba(212, 175, 55, 0.35)',
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
              transform: `${m130Entry.transform} scale(${m130Punch}) translateX(${tier3ShiftX}px)`,
              opacity: m130Entry.opacity,
              borderTop: '2px solid rgba(16, 185, 129, 0.45)',
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
                  textShadow: '0 0 50px rgba(16, 185, 129, 0.4)',
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

      {/* Persistent Baseline inherited from Shot 04 & condensing into Center Point */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: '50%',
          transform: 'translateX(-50%)',
          width: interpolate(exitProgress, [0, 1], [1600, 20]),
          height: 2,
          backgroundColor: '#38BDF8',
          boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
          opacity: interpolate(exitProgress, [0.8, 1], [1, 0]),
          pointerEvents: 'none',
        }}
      />

      {/* High-Density Concentrated Energy Point at (960, 540) */}
      {energyIgnition > 0 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#D4AF37',
            boxShadow: '0 0 40px #D4AF37, 0 0 80px rgba(212, 175, 55, 0.8)',
            opacity: energyIgnition,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
