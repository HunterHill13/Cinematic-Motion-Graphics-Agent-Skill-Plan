import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const Shot06_OutroActionV53: React.FC = () => {
  const frame = useCurrentFrame();

  // Receives convergence from Shot 5: seal emerges from condensed point (0 - 35f)
  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const crestScale = interpolate(frame, [0, 40], [0.5, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ringRot = (frame * 0.35) % 360;

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
            radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.1) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Grand Assembly Sign-off */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: entrance,
          direction: 'rtl',
        }}
      >
        {/* Crest */}
        <div style={{ transform: `scale(${crestScale})`, marginBottom: 32 }}>
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
            <circle cx={90} cy={90} r={8} fill="#10B981" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 1000 }}>
          <div
            style={{
              padding: '6px 20px',
              borderRadius: 999,
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'inline-block',
              marginBottom: 16,
              fontSize: 15,
              fontWeight: 700,
              color: '#D4AF37',
            }}
          >
            ادامه در قسمت‌های بعد
          </div>

          <h1 style={{ fontSize: 48, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.3 }}>
            بررسی گام‌به‌گام روش کسب امتیازها در ویدیوهای بعدی
          </h1>

          <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 14 }}>
            کمیته تحقیقات و فناوری دانشجویی دانشگاه علوم پزشکی بقیه‌الله (عج)
          </p>
        </div>
      </div>
    </div>
  );
};
