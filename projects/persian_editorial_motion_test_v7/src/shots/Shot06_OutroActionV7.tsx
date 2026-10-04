import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & SIGN-OFF
 * Art Direction: Editorial Title Monolith / Official Sign-off
 */
export const Shot06_OutroActionV7: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const crestScale = interpolate(frame, [0, 45], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

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
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 65%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 120px',
          direction: 'rtl',
          opacity: entrance,
        }}
      >
        {/* Authoritative Crest */}
        <div style={{ transform: `scale(${crestScale})`, marginBottom: 36 }}>
          <svg width={200} height={200} viewBox="0 0 200 200">
            <circle cx={100} cy={100} r={90} fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth={2} />
            <circle cx={100} cy={100} r={75} fill="rgba(8, 16, 34, 0.8)" stroke="#D4AF37" strokeWidth={3} />
            <path
              d="M 100 50 C 115 65 125 85 100 115 C 75 85 85 65 100 50 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth={3}
            />
            <circle cx={100} cy={100} r={8} fill="#10B981" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 1100 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#D4AF37', letterSpacing: '2px' }}>
            پایان قسمت اول • ادامه در قسمت‌های بعد
          </span>

          <h1 style={{ fontSize: 52, fontWeight: 900, color: '#F8FAFC', margin: '14px 0 0 0', lineHeight: 1.3 }}>
            روابط عمومی کمیته تحقیقات و فناوری دانشجویی
            <br />
            <span style={{ color: '#38BDF8' }}>دانشگاه علوم پزشکی بقیة‌الله (عج)</span>
          </h1>

          <div
            style={{
              width: 120,
              height: 2,
              backgroundColor: '#D4AF37',
              margin: '24px auto',
            }}
          />

          <p style={{ fontSize: 22, color: '#94A3B8', margin: 0, fontWeight: 500 }}>
            جهت مطالعه متن کامل آیین‌نامه و دریافت مشاوره‌های تکمیلی، به روابط عمومی کمیته مراجعه فرمایید.
          </p>
        </div>
      </div>
    </div>
  );
};
