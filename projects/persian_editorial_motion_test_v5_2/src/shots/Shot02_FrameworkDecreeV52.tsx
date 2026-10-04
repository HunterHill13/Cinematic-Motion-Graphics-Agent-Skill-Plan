import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const Shot02_FrameworkDecreeV52: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const pathProgress = interpolate(frame, [25, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
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
            radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.08) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Header Eyebrow & Decree Title */}
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
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: 16,
            fontSize: 15,
            fontWeight: 700,
            color: '#D4AF37',
          }}
        >
          وزارت بهداشت، درمان و آموزش پزشکی
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          دستورالعمل بند «کاف» ماده ۲
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
          آیین‌نامه استعدادهای درخشان — مسیر جامع امتیازدهی به فعالیت‌های علمی
        </p>
      </div>

      {/* Vector Progression Highway */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          left: 160,
          right: 160,
          height: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={1600} height={360} viewBox="0 0 1600 360">
          {/* Background track line */}
          <line x1={100} y1={180} x2={1500} y2={180} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="4" />
          {/* Animated active energy beam */}
          <line
            x1={100}
            y1={180}
            x2={100 + pathProgress * 1400}
            y2={180}
            stroke="#38BDF8"
            strokeWidth="5"
            strokeLinecap="round"
            filter="drop-shadow(0 0 12px #38BDF8)"
          />

          {/* Node 1: Start */}
          <circle cx={100} cy={180} r={16} fill="#040711" stroke="#38BDF8" strokeWidth="4" />
          <circle cx={100} cy={180} r={6} fill="#F8FAFC" />

          {/* Node 2: Decree Core */}
          <circle cx={800} cy={180} r={28} fill="#040711" stroke="#D4AF37" strokeWidth="4" />
          <circle cx={800} cy={180} r={10} fill="#D4AF37" />

          {/* Node 3: Recognition */}
          <circle cx={1500} cy={180} r={16} fill="#040711" stroke="#10B981" strokeWidth="4" />
          <circle cx={1500} cy={180} r={6} fill="#10B981" />
        </svg>

        {/* Labels under nodes */}
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 80px', direction: 'rtl' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8' }}>ثبت درخواست</div>
            <div style={{ fontSize: 13, color: '#64748B' }}>پرتال استعداد درخشان</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#D4AF37' }}>محاسبه جامع شاخص‌ها</div>
            <div style={{ fontSize: 14, color: '#94A3B8' }}>مستندسازی پژوهشی و فناورانه</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#10B981' }}>احراز رتبه برتر</div>
            <div style={{ fontSize: 13, color: '#64748B' }}>معرفی به مراجع ملی</div>
          </div>
        </div>
      </div>
    </div>
  );
};
