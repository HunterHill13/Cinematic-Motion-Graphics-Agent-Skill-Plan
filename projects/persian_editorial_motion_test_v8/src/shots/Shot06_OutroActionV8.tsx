import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateKineticEntry, calculateScalePunch } from '../primitives/motionPrimitives';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & SIGN-OFF
 * V8 Continuous Motion Performance:
 * - Inherits the high-density energy point at (960, 540) from Shot 05.
 * - Explodes outward into Actor A (Baqiyatallah PR Crest) with elastic settle.
 * - Directional reveal of authoritative institutional sign-off typography.
 * - Settle hold into deliberate stillness as the score resolves.
 */
export const Shot06_OutroActionV8: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance of the Shot
  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Re-emergence of Actor A (Crest) from the concentrated energy point
  const crestExpansion = interpolate(frame, [5, 45], [0.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const crestPunch = calculateScalePunch(frame, 45, 1.08, 14);

  // Outer ring radiance pulse on lock
  const ringPulse = interpolate(frame, [45, 75], [1, 1.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const ringPulseOp = interpolate(frame, [45, 75], [0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typography kinetic reveals
  const titleEntry = calculateKineticEntry(frame, 35, 30, 35);
  const subtitleEntry = calculateKineticEntry(frame, 55, 30, 25);

  // Divider expansion
  const dividerWidth = interpolate(frame, [50, 80], [0, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Breathing micro-motion during final hold (80 - 206f)
  const breathing = frame >= 80
    ? 1.0 + 0.003 * Math.sin(((frame - 80) / 60) * Math.PI)
    : 1.0;

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
          transform: `scale(${breathing})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* Authoritative Crest Container */}
        <div
          style={{
            transform: `scale(${crestExpansion * crestPunch})`,
            marginBottom: 36,
            position: 'relative',
          }}
        >
          {/* Radial shockwave pulse on crest lock */}
          {frame >= 45 && (
            <div
              style={{
                position: 'absolute',
                inset: -20,
                borderRadius: '50%',
                border: '2px solid #D4AF37',
                transform: `scale(${ringPulse})`,
                opacity: ringPulseOp,
                pointerEvents: 'none',
              }}
            />
          )}

          <svg width={200} height={200} viewBox="0 0 200 200">
            <circle cx={100} cy={100} r={90} fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth={2} />
            <circle cx={100} cy={100} r={75} fill="rgba(8, 16, 34, 0.85)" stroke="#D4AF37" strokeWidth={3} />
            <path
              d="M 100 50 C 115 65 125 85 100 115 C 75 85 85 65 100 50 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth={3}
            />
            <circle cx={100} cy={100} r={8} fill="#10B981" />
          </svg>
        </div>

        {/* Text Monolith */}
        <div style={{ textAlign: 'center', maxWidth: 1100 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: '#D4AF37',
              letterSpacing: '2px',
              display: 'block',
              opacity: titleEntry.opacity,
            }}
          >
            پایان قسمت اول • ادامه در قسمت‌های بعد
          </span>

          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#F8FAFC',
              margin: '14px 0 0 0',
              lineHeight: 1.3,
              transform: titleEntry.transform,
              opacity: titleEntry.opacity,
            }}
          >
            روابط عمومی کمیته تحقیقات و فناوری دانشجویی
            <br />
            <span style={{ color: '#38BDF8' }}>دانشگاه علوم پزشکی بقیة‌الله (عج)</span>
          </h1>

          <div
            style={{
              width: dividerWidth,
              height: 2,
              backgroundColor: '#D4AF37',
              margin: '24px auto',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)',
            }}
          />

          <p
            style={{
              fontSize: 22,
              color: '#94A3B8',
              margin: 0,
              fontWeight: 500,
              transform: subtitleEntry.transform,
              opacity: subtitleEntry.opacity,
            }}
          >
            جهت مطالعه متن کامل آیین‌نامه و دریافت مشاوره‌های تکمیلی، به روابط عمومی کمیته مراجعه فرمایید.
          </p>
        </div>
      </div>
    </div>
  );
};
