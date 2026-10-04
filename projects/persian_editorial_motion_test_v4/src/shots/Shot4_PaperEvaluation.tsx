import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { seg } from '../motion/Motion';

/**
 * Shot 4: Paper Evaluation & Quartile Weighting
 * Reused & adapted from:
 * - OscilloscopeStreamV2.tsx (demos/data/chart-live-moves)
 * - SplitTextStagger.tsx (demos/typography)
 */

export const Shot4_PaperEvaluation: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance
  const titleOp = seg(frame, 10, 35, Easing.out(Easing.quad));

  // Oscilloscope wave math
  const wavePoints: string[] = [];
  const W = 1100;
  const H = 240;
  const baseline = H / 2;
  const progress = seg(frame, 20, 100, Easing.out(Easing.cubic));

  for (let x = 0; x <= W * progress; x += 10) {
    const normX = x / W;
    const freq = 3.5;
    const y = baseline + Math.sin(normX * Math.PI * 2 * freq + frame * 0.08) * (45 * Math.sin(normX * Math.PI));
    wavePoints.push(`${x},${y}`);
  }
  const wavePath = wavePoints.length > 0 ? `M ${wavePoints.join(' L ')}` : '';

  // Quartile Badges Stagger (f60–f110)
  const BADGES = [
    { label: 'Q1 Top 10%', weight: 'ضریب ۳.۰', color: '#10B981', glow: 'rgba(16, 185, 129, 0.4)' },
    { label: 'Q1 Regular', weight: 'ضریب ۲.۵', color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.4)' },
    { label: 'Q2 Journals', weight: 'ضریب ۱.۸', color: '#FBBF24', glow: 'rgba(251, 191, 36, 0.4)' },
    { label: 'Q3 / Scopus', weight: 'ضریب ۱.۰', color: '#94A3B8', glow: 'rgba(148, 163, 184, 0.4)' },
  ];

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
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 70%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: titleOp,
          direction: 'rtl',
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 8 }}>
          شاخص‌های کیفی مقالات — Web of Science & Scopus
        </span>
        <span style={{ fontSize: 38, fontWeight: 800, color: '#F8FAFC' }}>
          اولویت ضریب امتیازدهی بر اساس رتبه چارک مجله (IF & Quartile)
        </span>
      </div>

      {/* Center Oscilloscope Wave Display */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 410,
          width: W,
          height: H,
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: 16,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle internal grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px',
          }}
        />

        {/* Live Vector Oscilloscope Wave */}
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          {wavePath && (
            <path
              d={wavePath}
              fill="none"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))"
            />
          )}
        </svg>

        {/* Metric Label */}
        <div style={{ position: 'absolute', top: 16, right: 20, direction: 'rtl' }}>
          <span style={{ fontSize: 14, color: '#38BDF8', fontWeight: 600 }}>
            روند توزیع ایمپکت فاکتور و ضرایب تأثیر کیفی
          </span>
        </div>
      </div>

      {/* Quartile Stagger Cards */}
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 260,
          right: 260,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          direction: 'rtl',
        }}
      >
        {BADGES.map((b, idx) => {
          const bStart = 60 + idx * 10;
          const bScale = interpolate(frame, [bStart, bStart + 15], [0.85, 1], {
            easing: Easing.out(Easing.back(1.4)),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const bOp = seg(frame, bStart, bStart + 10, Easing.out(Easing.quad));

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: '24px 20px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: `1.5px solid ${b.color}50`,
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${bScale})`,
                opacity: bOp,
                boxShadow: `0 8px 24px ${b.glow}`,
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 800, color: '#F8FAFC', marginBottom: 6 }}>
                {b.label}
              </span>
              <span style={{ fontSize: 18, fontWeight: 700, color: b.color }}>
                {b.weight}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
