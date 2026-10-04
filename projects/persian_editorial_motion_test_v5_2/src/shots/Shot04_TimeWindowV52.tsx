import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const Shot04_TimeWindowV52: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const calendarScale = interpolate(frame, [10, 45], [0.8, 1], {
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
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
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
          opacity: entrance,
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
          left: 200,
          right: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          transform: `scale(${calendarScale})`,
        }}
      >
        {/* Timeline Gate Graphic */}
        <div
          style={{
            padding: '40px 48px',
            borderRadius: 24,
            background: 'rgba(8, 16, 34, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(245, 158, 11, 0.15)',
            textAlign: 'center',
            direction: 'rtl',
            minWidth: 420,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: '#F59E0B', marginBottom: 12 }}>
            دوران دانشجویی
          </div>
          <div style={{ fontSize: 38, fontWeight: 900, color: '#F8FAFC' }}>
            طول مدت تحصیل
          </div>
          <div style={{ fontSize: 15, color: '#94A3B8', marginTop: 8 }}>
            پذیرش ۱۰۰٪ مدارک و مقالات معتبر
          </div>
        </div>

        <div style={{ fontSize: 36, color: '#F59E0B', fontWeight: 900 }}>+</div>

        {/* 1 Year Post Graduation Extension */}
        <div
          style={{
            padding: '40px 48px',
            borderRadius: 24,
            background: 'rgba(8, 16, 34, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(16, 185, 129, 0.15)',
            textAlign: 'center',
            direction: 'rtl',
            minWidth: 420,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: '#10B981', marginBottom: 12 }}>
            مهلت ارفاقی پس از دانش‌آموختگی
          </div>
          <div style={{ fontSize: 38, fontWeight: 900, color: '#F8FAFC' }}>
            حداکثر تا ۱ سال
          </div>
          <div style={{ fontSize: 15, color: '#94A3B8', marginTop: 8 }}>
            مهلت نهایی ارسال پرونده به دبیرخانه
          </div>
        </div>
      </div>
    </div>
  );
};
