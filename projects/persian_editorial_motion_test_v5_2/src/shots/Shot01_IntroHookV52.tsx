import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const Shot01_IntroHookV52: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance deceleration
  const titleOp = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const sealScale = interpolate(frame, [0, 45], [0.8, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const questionOp = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ringRot = (frame * 0.4) % 360;

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
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Part 1: Baqiyatallah PR Opening (0-170f) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: interpolate(frame, [150, 175], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ transform: `scale(${sealScale})`, marginBottom: 32, position: 'relative' }}>
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle
              cx={90}
              cy={90}
              r={80}
              fill="none"
              stroke="rgba(212, 175, 55, 0.3)"
              strokeWidth="2"
              strokeDasharray="6 6"
              style={{ transformOrigin: '90px 90px', transform: `rotate(${ringRot}deg)` }}
            />
            <circle cx={90} cy={90} r={65} fill="rgba(8, 16, 32, 0.9)" stroke="#D4AF37" strokeWidth="2.5" />
            <path
              d="M 90 45 C 105 60 115 75 90 105 C 65 75 75 60 90 45 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
            />
            <circle cx={90} cy={90} r={8} fill="#38BDF8" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', direction: 'rtl', opacity: titleOp }}>
          <span style={{ fontSize: 18, color: '#D4AF37', fontWeight: 700, letterSpacing: '0.1em' }}>
            روابط عمومی کمیته تحقیقات و فناوری دانشجویی
          </span>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: '#F8FAFC', margin: '12px 0 0 0' }}>
            دانشگاه علوم پزشکی بقیه‌الله (عج)
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 12 }}>
            تقدیم می‌کند
          </p>
        </div>
      </div>

      {/* Part 2: Hook Question (170-360f) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: questionOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            padding: '8px 24px',
            borderRadius: 999,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: 24,
            fontSize: 16,
            fontWeight: 700,
            color: '#38BDF8',
          }}
        >
          پرسش ملی پژوهشگران
        </div>
        <h2
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: '#F8FAFC',
            textAlign: 'center',
            maxWidth: 1200,
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          چگونه به عنوان <span style={{ color: '#D4AF37' }}>دانشجوی پژوهشگر یا فناور برجسته کشور</span> انتخاب شویم؟!
        </h2>
      </div>
    </div>
  );
};
