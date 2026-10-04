import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { seg } from '../../motion/easing';
import { TrackingExpandTitle } from '../../motion/typography';
import { GoldAtmosphereParticles } from '../../motion/particles';

export const Shot01_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Background drift (0.35x parallax)
  const bgDrift = interpolate(frame, [0, 180], [0, -25]);

  // Emblem assembly
  const emblemScale = interpolate(frame, [0, 40], [0.8, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const emblemOp = seg(frame, 0, 30, Easing.out(Easing.quad));
  const emblemRot = interpolate(frame, [0, 180], [0, 8]);

  // Subtitle fade in (f65–f95)
  const subOp = seg(frame, 65, 95, Easing.out(Easing.quad));
  const subY = interpolate(frame, [65, 95], [14, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const badgeOp = seg(frame, 10, 35, Easing.out(Easing.quad));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#050814',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Layer 0: Background Institutional Mesh */}
      <div
        style={{
          position: 'absolute',
          inset: -80,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          transform: `translate3d(0, ${bgDrift}px, 0)`,
        }}
      />

      {/* Layer 1: Midground Core Graphic Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Header Badge */}
        <div
          style={{
            opacity: badgeOp,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
            padding: '6px 20px',
            borderRadius: 20,
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              boxShadow: '0 0 10px #D4AF37',
            }}
          />
          <span style={{ color: '#D4AF37', fontSize: 18, fontWeight: 600 }}>
            وزارت بهداشت، درمان و آموزش پزشکی
          </span>
        </div>

        {/* Vector Emblem */}
        <div
          style={{
            width: 150,
            height: 150,
            marginBottom: 34,
            transform: `scale(${emblemScale})`,
            opacity: emblemOp,
            filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))',
          }}
        >
          <svg viewBox="0 0 140 140" width={150} height={150}>
            <circle
              cx="70"
              cy="70"
              r="62"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              transform={`rotate(${emblemRot} 70 70)`}
            />
            <circle cx="70" cy="70" r="52" fill="rgba(212, 175, 55, 0.08)" stroke="#D4AF37" strokeWidth="2.5" />
            <path
              d="M 70 28 L 74 58 L 98 46 L 78 68 L 108 70 L 78 74 L 98 94 L 74 82 L 70 112 L 66 82 L 42 94 L 62 74 L 32 70 L 62 68 L 42 46 L 66 58 Z"
              fill="#D4AF37"
            />
            <circle cx="70" cy="70" r="13" fill="#050814" stroke="#F9E79F" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Hero Title with Kinetic Tracking Expansion */}
        <TrackingExpandTitle
          words={['بَندِ', '«کاف»', 'آیین‌نامه‌یِ', 'اِستِعدادهایِ', 'دِرَخشان']}
          frame={frame}
          startFrame={25}
          durationFrames={45}
          fontSize={62}
        />

        {/* Subtitle */}
        <div
          style={{
            marginTop: 20,
            direction: 'rtl',
            opacity: subOp,
            transform: `translateY(${subY}px)`,
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 500, color: '#94A3B8' }}>
            دستورالعمل انتخاب دانشجوی پژوهشگر و فناور برجسته کشور
          </span>
        </div>
      </div>

      {/* Layer 2: Foreground Ambient Particles (1.4x parallax) */}
      <GoldAtmosphereParticles count={6} frame={frame} speed={0.4} />
    </div>
  );
};
