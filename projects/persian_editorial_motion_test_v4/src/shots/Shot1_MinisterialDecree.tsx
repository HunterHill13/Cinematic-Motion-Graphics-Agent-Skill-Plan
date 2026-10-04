import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { seg } from '../motion/Motion';

/**
 * Shot 1: The Ministerial Decree & Official Emblem
 * Reused from:
 * - TrackingExpandReveal.tsx (typography/type-assembly-moves)
 * - depth-layer-moves (camera/depth-layer-moves)
 * - aesthetic-rules.md R1 (hold >= 1s) & Q5 (single focused hero)
 */

export const Shot1_MinisterialDecree: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Background Grid & Geometry (Layer 0: 0.35x drift)
  const bgDrift = interpolate(frame, [0, 180], [0, -30]);

  // 2. Emblem Assembly (f0–f45)
  const emblemScale = interpolate(frame, [0, 40], [0.8, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const emblemOp = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const emblemRot = interpolate(frame, [0, 180], [0, 8], {
    easing: Easing.linear,
  });

  // 3. Tracking Expand Reveal for Title (f25–f75)
  // Reused mechanics: container has fixed letter-spacing, individual words slide with translateX
  const p = seg(frame, 25, 75, Easing.out(Easing.poly(5)));
  const titleBlur = 10 * (1 - p);
  const titleOp = interpolate(p, [0, 1], [0.2, 1]);
  const titleSx = interpolate(p, [0, 1], [0.94, 1]);
  const settled = frame >= 75;

  // Words in decree title
  const words = ['بَندِ', '«کاف»', 'آیین‌نامه‌یِ', 'اِستِعدادهایِ', 'دِرَخشان'];
  const N = words.length;
  const center = (N - 1) / 2;

  // Subtitle fade in (f65–f95)
  const subOp = seg(frame, 65, 95, Easing.out(Easing.quad));
  const subY = interpolate(frame, [65, 95], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Ministerial Header Badge (f10–f35)
  const badgeOp = seg(frame, 10, 35, Easing.out(Easing.quad));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#050814',
        overflow: 'hidden',
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Layer 0: Background Institutional Mesh (0.35x parallax) */}
      <div
        style={{
          position: 'absolute',
          inset: -100,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          transform: `translate3d(0, ${bgDrift}px, 0)`,
        }}
      />

      {/* Layer 1: Midground Hero Emblem & Decree Typography */}
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
        {/* Institutional Header Badge */}
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
          <span
            style={{
              color: '#D4AF37',
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            وزارت بهداشت، درمان و آموزش پزشکی
          </span>
        </div>

        {/* Vector Emblem (Single Hero Graphic - Q5) */}
        <div
          style={{
            width: 160,
            height: 160,
            marginBottom: 36,
            transform: `scale(${emblemScale})`,
            opacity: emblemOp,
            filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.35))',
          }}
        >
          <svg viewBox="0 0 140 140" width="160" height="160">
            {/* Outer rotating decorative ring */}
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
            {/* Solid ring */}
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="rgba(212, 175, 55, 0.08)"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            {/* Center geometric insignia (Stylized Medical Caduceus / Star of Science) */}
            <path
              d="M 70 28 L 74 58 L 98 46 L 78 68 L 108 70 L 78 74 L 98 94 L 74 82 L 70 112 L 66 82 L 42 94 L 62 74 L 32 70 L 62 68 L 42 46 L 66 58 Z"
              fill="#D4AF37"
            />
            <circle cx="70" cy="70" r="14" fill="#050814" stroke="#F9E79F" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Hero Title with Kinetic Tracking Expansion */}
        <div
          style={{
            display: 'flex',
            direction: 'rtl',
            gap: 20,
            transform: settled ? undefined : `scaleX(${titleSx})`,
            filter: settled ? undefined : `blur(${titleBlur}px)`,
            opacity: settled ? 1 : titleOp,
          }}
        >
          {words.map((word, i) => {
            const offset = (i - center) * 24 * (1 - p);
            const isHighlight = word.includes('کاف') || word.includes('بَندِ');
            return (
              <span
                key={i}
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: isHighlight ? '#F9E79F' : '#F8FAFC',
                  textShadow: isHighlight
                    ? '0 0 30px rgba(212, 175, 55, 0.6)'
                    : '0 4px 24px rgba(0, 0, 0, 0.8)',
                  transform: `translateX(${offset}px)`,
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 20,
            direction: 'rtl',
            opacity: subOp,
            transform: `translateY(${subY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: '#94A3B8',
              letterSpacing: '0.02em',
            }}
          >
            دستورالعمل انتخاب دانشجوی پژوهشگر و فناور برجسته کشور
          </span>
        </div>

        {/* Baseline Vector Lead to Shot 2 */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            width: 1200,
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.4) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Layer 2: Foreground Ambient Golden Particles (1.4x parallax) */}
      {[1, 2, 3, 4, 5, 6].map((idx) => {
        const py = (idx * 160 + frame * 0.4) % 1080;
        const px = (idx * 280) % 1920;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#F9E79F',
              filter: 'blur(1.5px)',
              opacity: 0.35,
            }}
          />
        );
      })}
    </div>
  );
};
