import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateKineticEntry, calculateScalePunch } from '../primitives/motionPrimitives';

/**
 * SHOT 04 — THE TEMPORAL HORIZON & LEGAL CUTOFF
 * V8 Continuous Motion Performance:
 * - Inherits the rotated vertical wall from Shot 03 seamlessly.
 * - The vertical wall slams down with a sharp physical vibration reaction.
 * - Handoff: The amber wall collapses downward into the horizontal baseline for Shot 05.
 */
export const Shot04_TimeWindowV8: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const wallHeight = interpolate(frame, [15, 45], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Impact Reaction: When wall hits full height at frame 45, text vibrates 4px
  const impactVibration = frame >= 45 && frame <= 55
    ? 4 * Math.sin(((frame - 45) / 10) * Math.PI)
    : 0;

  // Handoff to Shot 5 (235 - 270f)
  // Wall collapses downward and flattens horizontally into the datum line
  const exitProgress = interpolate(frame, [235, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const wallCollapseHeight = interpolate(exitProgress, [0, 1], [100, 0]);
  const horizontalDatumWidth = interpolate(exitProgress, [0, 1], [0, 1600]);
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
      {/* Background Graphic Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 75% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 140px',
          direction: 'rtl',
          opacity: entrance * exitOp,
          transform: `translateX(${impactVibration}px)`,
        }}
      >
        {/* Top Context Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ width: 10, height: 10, backgroundColor: '#F59E0B' }} />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#F59E0B', letterSpacing: '1px' }}>
            محدودیت و مهلت زمانی قانونی
          </span>
        </div>

        <h1 style={{ fontSize: 60, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.25 }}>
          بازه زمانی معتبر جهت پذیرش مدارک
        </h1>
        <p style={{ fontSize: 24, color: '#94A3B8', marginTop: 14, fontWeight: 500, maxWidth: 1100 }}>
          تمام فعالیت‌ها باید مربوط به دوران تحصیل یا حداکثر تا ۱ سال پس از فراغت از تحصیل باشد
        </p>

        {/* Asymmetric Temporal Horizon Division */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 60,
            marginTop: 48,
            height: 240,
            position: 'relative',
          }}
        >
          {/* Phase 1: Study Duration */}
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRight: '3px solid #38BDF8',
              paddingRight: 32,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: '#38BDF8', letterSpacing: '2px' }}>
              PHASE 01 • بازه اصلی
            </span>
            <span style={{ fontSize: 44, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              طول دوره تحصیل
            </span>
            <span style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
              از روز رسمی ثبت‌نام تا تاریخ دفاع نهایی و فارغ‌التحصیلی
            </span>
          </div>

          {/* Dividing Temporal Monolith Wall */}
          <div
            style={{
              width: 3,
              height: `${exitProgress > 0 ? wallCollapseHeight : wallHeight}%`,
              backgroundColor: '#F59E0B',
              boxShadow: '0 0 24px #F59E0B',
              alignSelf: 'center',
            }}
          />

          {/* Phase 2: Strict 1-Year Cutoff */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: 10,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: '#F59E0B', letterSpacing: '2px' }}>
              STRICT CUTOFF • حداکثر مهلت مجاز
            </span>
            <span style={{ fontSize: 44, fontWeight: 900, color: '#F59E0B', marginTop: 8 }}>
              حداکثر ۱ سال پس از فراغت
            </span>
            <span style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
              پس از گذشت ۱۲ ماه، ارسال هرگونه پرونده مسدود خواهد شد
            </span>
          </div>
        </div>
      </div>

      {/* Persistent Actor B: Flattening Horizontal Datum for Shot 05 */}
      {exitProgress > 0.01 && (
        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: '50%',
            transform: 'translateX(-50%)',
            width: horizontalDatumWidth,
            height: 2,
            backgroundColor: '#38BDF8',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
