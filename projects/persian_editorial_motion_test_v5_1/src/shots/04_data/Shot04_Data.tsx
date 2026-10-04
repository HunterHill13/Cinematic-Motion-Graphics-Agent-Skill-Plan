import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { AtmosphereParticles } from '../../motion/particles';
import { NumberImpact } from '../../motion/typography';

interface QuartileTier {
  tier: string;
  badge: string;
  coefficient: string;
  sub: string;
  accent: string;
  steps: number[];
  basePoints: number;
}

const QUARTILES: QuartileTier[] = [
  {
    tier: 'Q1 / Top Tier',
    badge: 'ISI / Web of Science',
    coefficient: 'ضریب ۲.۵',
    sub: 'مجلات چارک اول نمایه شده در JCR',
    accent: '#38BDF8',
    steps: [1.0, 1.8, 2.5],
    basePoints: 25,
  },
  {
    tier: 'Q2 / High Impact',
    badge: 'Scopus / PubMed',
    coefficient: 'ضریب ۲.۰',
    sub: 'مجلات چارک دوم بین‌المللی',
    accent: '#10B981',
    steps: [1.0, 1.5, 2.0],
    basePoints: 20,
  },
  {
    tier: 'Q3 & Q4',
    badge: 'Peer-Reviewed Index',
    coefficient: 'ضریب ۱.۲',
    sub: 'مجلات چارک‌های سوم و چهارم معتبر',
    accent: '#D4AF37',
    steps: [0.8, 1.0, 1.2],
    basePoints: 12,
  },
];

export const Shot04_Data: React.FC = () => {
  const frame = useCurrentFrame();

  // Header entrance
  const headerOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Oscilloscope wave math: dynamic sine pulse running through the background
  const wavePoints = [];
  const waveWidth = 1920;
  const numSamples = 60;
  const t = frame * 0.08;

  for (let i = 0; i <= numSamples; i++) {
    const x = (i / numSamples) * waveWidth;
    // Modulate amplitude around center (y = 540)
    const envelope = Math.sin((i / numSamples) * Math.PI);
    const y = 540 + Math.sin(i * 0.4 - t) * 60 * envelope;
    wavePoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const wavePath = `M ${wavePoints.join(' L ')}`;

  // Radar circular scan angle
  const scanAngle = (frame * 2.5) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040817',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Editorial Grid & Scan Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 70%),
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />
      <AtmosphereParticles count={20} opacity={0.35} />

      {/* Background Oscilloscope Wave */}
      <svg
        width={1920}
        height={1080}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <path
          d={wavePath}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          filter="drop-shadow(0 0 10px rgba(56, 189, 248, 0.5))"
        />

        {/* Radar Ring in Center */}
        <circle
          cx={960}
          cy={540}
          r={280}
          fill="none"
          stroke="rgba(56, 189, 248, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <circle
          cx={960}
          cy={540}
          r={180}
          fill="none"
          stroke="rgba(212, 175, 55, 0.15)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: headerOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px',
            borderRadius: 999,
            backgroundColor: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: 12,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38BDF8' }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#38BDF8', letterSpacing: '0.08em' }}>
            کیفیت‌سنجی مقالات و نمایه مجلات
          </span>
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 42,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: '-0.02em',
          }}
        >
          ضرایب برتر مجلات Web of Science و Q1
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: 17, color: '#94A3B8' }}>
          بیشترین ارزش امتیازی بر اساس چارک‌بندی رسمی JCR و نمایه‌های استنادی معتبر
        </p>
      </div>

      {/* Three Quartile High-Tech Glass Displays */}
      <div
        style={{
          position: 'absolute',
          top: 260,
          left: 120,
          right: 120,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 32,
        }}
      >
        {QUARTILES.map((q, idx) => {
          const cardDelay = 20 + idx * 12;
          const cardProgress = interpolate(frame, [cardDelay, cardDelay + 25], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={q.tier}
              style={{
                flex: 1,
                padding: '36px 30px',
                borderRadius: 20,
                background: 'rgba(8, 16, 36, 0.82)',
                backdropFilter: 'blur(20px)',
                border: `1.5px solid ${cardProgress > 0.8 ? q.accent : 'rgba(255,255,255,0.1)'}`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 30px ${q.accent}20`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                direction: 'rtl',
                opacity: cardProgress,
                transform: `translateY(${(1 - cardProgress) * 40}px)`,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: q.accent,
                      padding: '4px 12px',
                      borderRadius: 8,
                      backgroundColor: `${q.accent}15`,
                      border: `1px solid ${q.accent}40`,
                    }}
                  >
                    {q.badge}
                  </span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC' }}>
                    {q.tier}
                  </span>
                </div>

                <div style={{ fontSize: 16, color: '#94A3B8', marginBottom: 28, lineHeight: 1.6 }}>
                  {q.sub}
                </div>
              </div>

              {/* Number Impact Progression */}
              <div
                style={{
                  padding: '24px 20px',
                  borderRadius: 14,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <NumberImpact
                  steps={q.steps}
                  frame={frame}
                  startFrame={cardDelay + 10}
                  stepInterval={8}
                  color={q.accent}
                  suffix="برابر"
                />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', marginTop: 8 }}>
                  {q.coefficient}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
