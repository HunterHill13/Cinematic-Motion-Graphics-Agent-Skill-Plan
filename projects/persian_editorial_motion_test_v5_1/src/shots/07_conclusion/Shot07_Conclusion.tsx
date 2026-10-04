import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { AtmosphereParticles } from '../../motion/particles';

export const Shot07_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();

  // Grand assembly entrance: Golden Crest scales and focuses
  const crestScale = interpolate(frame, [0, 45], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const crestOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Concentric halo rings rotation
  const ringRotate = (frame * 0.4) % 360;
  const innerRingRotate = -(frame * 0.6) % 360;

  // Typography staggered entrance
  const titleOp = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const subOp = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const badgeOp = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#030612',
        overflow: 'hidden',
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix & Warm Majestic Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 45%, rgba(212, 175, 55, 0.12) 0%, transparent 65%),
            radial-gradient(circle at 50% 90%, rgba(56, 189, 248, 0.05) 0%, transparent 50%),
            linear-gradient(rgba(212, 175, 55, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />
      <AtmosphereParticles count={35} opacity={0.4} />

      {/* Central Majestic Emblem & Logo Assembly */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${crestScale})`,
          opacity: crestOpacity,
        }}
      >
        {/* Kinetic Rotating Halo Circles */}
        <div
          style={{
            position: 'relative',
            width: 240,
            height: 240,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          {/* Outer Sunburst Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -20,
              borderRadius: '50%',
              border: '2px dashed rgba(212, 175, 55, 0.3)',
              transform: `rotate(${ringRotate}deg)`,
            }}
          />

          {/* Inner Geometric Shield */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(212, 175, 55, 0.5)',
              transform: `rotate(${innerRingRotate}deg)`,
            }}
          />

          {/* Center Emblem Glass Disc */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(8, 14, 30, 0.95) 75%)',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.4), inset 0 0 25px rgba(212, 175, 55, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Academic Caduceus / Flame Crest Motif */}
            <svg width={100} height={100} viewBox="0 0 100 100">
              <path
                d="M 50 15 C 65 35 75 55 50 85 C 25 55 35 35 50 15 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))"
              />
              <circle cx={50} cy={50} r={12} fill="#F8FAFC" />
              <path
                d="M 30 50 Q 50 70 70 50"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Grand Typography Stack */}
        <div style={{ textAlign: 'center', direction: 'rtl', maxWidth: 1100 }}>
          <div
            style={{
              opacity: titleOp,
              transform: `translateY(${(1 - titleOp) * 20}px)`,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#D4AF37',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: 12,
              }}
            >
              دانشگاه علوم پزشکی بقیه‌الله (عج)
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: 52,
                fontWeight: 900,
                color: '#F8FAFC',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              کمیته تحقیقات و فناوری دانشجویی
            </h1>
          </div>

          <div
            style={{
              marginTop: 18,
              opacity: subOp,
              transform: `translateY(${(1 - subOp) * 20}px)`,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 22,
                color: '#94A3B8',
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              حامی و پیشران پژوهشگران، فناوران و نخبگان برجسته نظام سلامت کشور
            </p>
          </div>

          {/* Verification Footnote Badges */}
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
              opacity: badgeOp,
              transform: `translateY(${(1 - badgeOp) * 20}px)`,
            }}
          >
            <div
              style={{
                padding: '8px 24px',
                borderRadius: 999,
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                fontSize: 14,
                fontWeight: 700,
                color: '#D4AF37',
              }}
            >
              بند «کاف» ماده ۲ آیین‌نامه استعدادهای درخشان
            </div>
            <div
              style={{
                padding: '8px 24px',
                borderRadius: 999,
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: 14,
                fontWeight: 700,
                color: '#38BDF8',
              }}
            >
              معاونت تحقیقات و فناوری وزارت بهداشت
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
