import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { seg } from '../motion/Motion';

/**
 * Shot 7: Grand Assembly & Baqiyatallah Institutional Sign-off
 * Reused & adapted from:
 * - aesthetic-rules.md Q8 ("Press Conference Group Photo")
 * - TrackingExpandReveal (type-assembly-moves)
 */

export const Shot7_GrandAssembly: React.FC = () => {
  const frame = useCurrentFrame();

  // Grand Crest Assembly (f0–f45)
  const crestScale = interpolate(frame, [0, 45], [0.8, 1], {
    easing: Easing.out(Easing.back(1.4)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const crestOp = seg(frame, 0, 30, Easing.out(Easing.quad));
  const crestRot = interpolate(frame, [0, 520], [0, 15]);

  // Four orbiting motifs from earlier shots flying in to form the group photo (aesthetic-rules.md Q8)
  const motifProgress = seg(frame, 20, 65, Easing.out(Easing.cubic));

  // Typographic Reveal (f40–f85)
  const titleOp = seg(frame, 40, 70, Easing.out(Easing.quad));
  const subOp = seg(frame, 65, 95, Easing.out(Easing.quad));

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
      {/* Background Architectural Mesh */}
      <div
        style={{
          position: 'absolute',
          inset: -80,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 65%),
            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* Orbiting Elements from previous shots (aesthetic-rules.md Q8 Group Photo) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Motif 1: Dial / Gauge ring flying in from top-left */}
        <div
          style={{
            position: 'absolute',
            left: interpolate(motifProgress, [0, 1], [100, 360]),
            top: interpolate(motifProgress, [0, 1], [100, 240]),
            opacity: motifProgress * 0.7,
            transform: 'scale(0.7)',
          }}
        >
          <svg width={100} height={100} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 4" />
          </svg>
        </div>

        {/* Motif 2: Ethics Shield flying in from bottom-left */}
        <div
          style={{
            position: 'absolute',
            left: interpolate(motifProgress, [0, 1], [100, 380]),
            bottom: interpolate(motifProgress, [0, 1], [100, 260]),
            opacity: motifProgress * 0.7,
            transform: 'scale(0.7)',
          }}
        >
          <svg width={80} height={80} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        {/* Motif 3: Manuscript Paper flying in from top-right */}
        <div
          style={{
            position: 'absolute',
            right: interpolate(motifProgress, [0, 1], [100, 360]),
            top: interpolate(motifProgress, [0, 1], [100, 240]),
            opacity: motifProgress * 0.7,
            transform: 'scale(0.7)',
          }}
        >
          <svg width={80} height={80} viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
        </div>

        {/* Motif 4: Award Star flying in from bottom-right */}
        <div
          style={{
            position: 'absolute',
            right: interpolate(motifProgress, [0, 1], [100, 380]),
            bottom: interpolate(motifProgress, [0, 1], [100, 260]),
            opacity: motifProgress * 0.7,
            transform: 'scale(0.7)',
          }}
        >
          <svg width={80} height={80} viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        </div>
      </div>

      {/* Central Grand Crest of Baqiyatallah Research Committee */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          direction: 'rtl',
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            marginBottom: 32,
            transform: `scale(${crestScale})`,
            opacity: crestOp,
            filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.5))',
          }}
        >
          <svg viewBox="0 0 160 160" width={180} height={180}>
            {/* Outer Sacred Ring */}
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="8 6"
              transform={`rotate(${crestRot} 80 80)`}
            />
            {/* Core Gold Ring */}
            <circle cx="80" cy="80" r="60" fill="rgba(212, 175, 55, 0.08)" stroke="#D4AF37" strokeWidth="2.5" />
            {/* Central Emblems */}
            <path
              d="M 80 32 L 85 64 L 112 52 L 90 76 L 124 80 L 90 84 L 112 108 L 85 96 L 80 128 L 75 96 L 48 108 L 70 84 L 36 80 L 70 76 L 48 52 L 75 64 Z"
              fill="#D4AF37"
            />
            <circle cx="80" cy="80" r="16" fill="#050814" stroke="#F9E79F" strokeWidth="3" />
          </svg>
        </div>

        {/* Primary Title */}
        <div
          style={{
            opacity: titleOp,
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#F8FAFC',
              margin: 0,
              textShadow: '0 4px 30px rgba(212, 175, 55, 0.4)',
            }}
          >
            کمیته تحقیقات و فناوری دانشجویی
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOp,
            textAlign: 'center',
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#D4AF37',
              letterSpacing: '0.04em',
            }}
          >
            دانشگاه علوم پزشکی بقیه‌الله (عج)
          </span>
        </div>

        {/* Banner Tag */}
        <div
          style={{
            opacity: subOp,
            padding: '10px 32px',
            borderRadius: 30,
            background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.25) 50%, rgba(212, 175, 55, 0.15) 100%)',
            border: '1.5px solid rgba(212, 175, 55, 0.5)',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)',
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: '#F9E79F' }}>
            حامی پژوهشگران و فناوران برجسته سلامت کشور
          </span>
        </div>
      </div>

      {/* Floating golden particles */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
        const py = (idx * 130 + frame * 0.3) % 1080;
        const px = (idx * 240) % 1920;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: '#F9E79F',
              boxShadow: '0 0 10px #D4AF37',
              opacity: 0.4,
            }}
          />
        );
      })}
    </div>
  );
};
