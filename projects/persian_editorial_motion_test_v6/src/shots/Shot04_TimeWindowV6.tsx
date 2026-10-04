import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

/**
 * SHOT 04 (1460 - 1730f): Legal Time Horizon & 1-Year Cutoff Gate
 * Upgraded in V6:
 * - Replaces simple calendar cards with a continuous vector timeline coordinate axis.
 * - Dynamic light scan animates across "دوران تحصیل" into the strict "+1 Year" boundary.
 * - Calipers collapse inward to sprout the 3 benchmark needles for Shot 5.
 */
export const Shot04_TimeWindowV6: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const timelineProgress = interpolate(frame, [15, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS HANDOFF T4 TO SHOT 5 (215 - 260f: 45 frames smooth transition window)
  const exitProgress = interpolate(frame, [215, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const contentExitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });
  const timelineCollapseWidth = interpolate(exitProgress, [0, 1], [1200, 300], {
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
        fontFamily: "'YekanBakh', 'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 65%),
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
          top: 75,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: entrance * contentExitOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            padding: '6px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            marginBottom: 16,
            fontSize: 15,
            fontWeight: 700,
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <span>محدودیت و مهلت زمانی قانونی</span>
        </div>
        <h1 style={{ fontSize: 46, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          بازه زمانی معتبر جهت پذیرش مدارک و فعالیت‌ها
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
          تمام فعالیت‌ها باید مربوط به دوران تحصیل یا حداکثر تا ۱ سال پس از فراغت از تحصیل باشد
        </p>
      </div>

      {/* Continuous Vector Chronometer & Timeline Horizon */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          left: '50%',
          transform: 'translateX(-50%)',
          width: timelineCollapseWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: entrance,
        }}
      >
        {/* Timeline Axis Track */}
        <div
          style={{
            width: '100%',
            height: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            position: 'relative',
            borderRadius: 2,
          }}
        >
          {/* Active Highlight Sweeping Across Axis */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${timelineProgress * 100}%`,
              height: '100%',
              backgroundColor: '#F59E0B',
              boxShadow: '0 0 20px #F59E0B',
            }}
          />
        </div>

        {/* Timeline Anchors: Start, Graduation, 1-Year Cutoff */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 40,
            direction: 'rtl',
            opacity: contentExitOp,
          }}
        >
          {/* Milestone 1: Study Duration */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(8, 16, 34, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 20,
              padding: '24px 32px',
              minWidth: 320,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
              PERIOD 01 • بازه اول
            </span>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              طول دوره تحصیل
            </span>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 6 }}>
              از روز ثبت‌نام تا تاریخ دفاع نهایی
            </span>
          </div>

          {/* Milestone 2: Graduation Gate (Cutoff Point) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(8, 16, 34, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: 20,
              padding: '24px 32px',
              minWidth: 320,
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.15)',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: '#F59E0B', letterSpacing: '1px' }}>
              MAX LIMIT • حداکثر مهلت مجاز
            </span>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              حداکثر ۱ سال پس از فراغت
            </span>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 6 }}>
              پس از اتمام این ۱ سال، پرونده مسدود می‌شود
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
