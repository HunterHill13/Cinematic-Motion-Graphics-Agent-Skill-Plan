import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const Shot04_TimeWindowV54: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const calendarScale = interpolate(frame, [10, 45], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS TRANSITION T4 TO SHOT 5 (215 - 260f: 45 frames smooth transition window)
  const exitProgress = interpolate(frame, [215, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const contentExitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });
  const cardExitWidth = interpolate(exitProgress, [0, 1], [960, 400], {
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
          top: 80,
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
            padding: '6px 20px',
            borderRadius: 999,
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            marginBottom: 16,
            fontSize: 15,
            fontWeight: 700,
            color: '#F59E0B',
          }}
        >
          محدودیت و مهلت زمانی قانونی
        </div>
        <h1 style={{ fontSize: 46, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          بازه زمانی معتبر جهت پذیرش مدارک
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
          تمام فعالیت‌ها باید مربوط به دوران تحصیل یا حداکثر تا ۱ سال پس از فراغت از تحصیل باشد
        </p>
      </div>

      {/* Visual Timeline & Calendar Gate */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${calendarScale})`,
        }}
      >
        {/* Timeline Gate Graphic */}
        <div
          style={{
            width: cardExitWidth,
            padding: '40px 48px',
            borderRadius: 24,
            background: 'rgba(8, 16, 34, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            direction: 'rtl',
            opacity: contentExitOp,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              ⏱️
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#F8FAFC' }}>سقف زمانی ثبت مدارک</div>
              <div style={{ fontSize: 16, color: '#F59E0B', fontWeight: 700 }}>قاعده یک‌ساله فراغت از تحصیل</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              padding: '24px 32px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#64748B' }}>مرحله اول</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#38BDF8', marginTop: 4 }}>دوران دانشجویی</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>فعالیت‌های حین تحصیل</div>
            </div>

            <div style={{ flex: 1, margin: '0 24px', position: 'relative' }}>
              <div style={{ height: 4, backgroundColor: 'rgba(245, 158, 11, 0.3)', borderRadius: 2 }} />
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#F59E0B',
                  boxShadow: '0 0 12px #F59E0B',
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#64748B' }}>فرصت نهایی</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F59E0B', marginTop: 4 }}>حداکثر ۱ سال</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>پس از تاریخ دانش‌آموختگی</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
