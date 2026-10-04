import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { KineticText } from '../../../../src/motion/kineticType';

/**
 * SHOT 06 (2155 - 2361f): Outro Call-to-Action & Grand Assembly
 * Upgraded in V6:
 * - Inherits the converging energy from Shot 5.
 * - Re-assembles the Baqiyatallah PR crest with kinetic authority.
 * - Concludes the film with kinetic typography and balanced negative space.
 */
export const Shot06_OutroActionV6: React.FC = () => {
  const frame = useCurrentFrame();

  // Receives convergence from Shot 5: crest emerges from condensed point (0 - 45f)
  const entrance = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const crestScale = interpolate(frame, [0, 45], [0.6, 1.0], {
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
        {/* Golden University Crest */}
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
              padding: '6px 22px',
              borderRadius: 999,
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D4AF37' }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#D4AF37' }}>ادامه در قسمت‌های بعدی</span>
          </div>

          <h1 style={{ fontSize: 48, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.35 }}>
            روابط عمومی کمیته تحقیقات و فناوری دانشجویی
            <br />
            <span style={{ color: '#38BDF8' }}>دانشگاه علوم پزشکی بقیة‌الله (عج)</span>
          </h1>

          <p style={{ fontSize: 22, color: '#94A3B8', marginTop: 16 }}>
            جهت مطالعه آیین‌نامه کامل و ارسال مدارک، به کانال اطلاع‌رسانی مراجعه فرمایید
          </p>
        </div>
      </div>
    </div>
  );
};
