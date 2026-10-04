import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { seg } from '../motion/Motion';

/**
 * Shot 6: National Candidate Distribution Swarm
 * Reused & adapted from:
 * - UnitDotSwarmRegroupV2.tsx (demos/data/chart-live-moves)
 */

interface Dot {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  isElite: boolean;
}

// Generate 48 deterministic candidate dots
const DOTS: Dot[] = Array.from({ length: 48 }, (_, i) => {
  const row = Math.floor(i / 12);
  const col = i % 12;
  const startX = 240 + col * 55 + (row % 2) * 20;
  const startY = 320 + row * 60;

  // Elite cluster (top 8 dots move to top podium)
  const isElite = i < 8;
  const targetX = isElite ? 860 + (i % 4) * 50 : 350 + (i % 10) * 45;
  const targetY = isElite ? 360 + Math.floor(i / 4) * 50 : 500 + Math.floor(i / 10) * 45;

  return { id: i, startX, startY, targetX, targetY, isElite };
});

export const Shot6_CandidateSwarm: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOp = seg(frame, 10, 35, Easing.out(Easing.quad));

  // Swarm regrouping progress (f40–f100)
  const regroupProgress = seg(frame, 40, 100, Easing.inOut(Easing.cubic));

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
            radial-gradient(circle at 50% 60%, rgba(212, 175, 55, 0.05) 0%, transparent 70%),
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
          فرآیند غربالگری و انتخاب کشوری
        </span>
        <span style={{ fontSize: 38, fontWeight: 800, color: '#F8FAFC' }}>
          داوری پرونده‌های منتخب در معاونت تحقیقات و فناوری وزارت بهداشت
        </span>
      </div>

      {/* National Funnel Display */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 360,
          right: 360,
          height: 480,
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 20,
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Elite Tier Crown Header */}
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            direction: 'rtl',
          }}
        >
          <div
            style={{
              padding: '6px 20px',
              borderRadius: 20,
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid #D4AF37',
              color: '#F9E79F',
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            برگزیدگان نهایی جشنواره کشوری
          </div>
        </div>

        {/* Dynamic Candidate Dots Swarm */}
        {DOTS.map((d) => {
          const curX = interpolate(regroupProgress, [0, 1], [d.startX, d.targetX]);
          const curY = interpolate(regroupProgress, [0, 1], [d.startY, d.targetY]);
          const glow = d.isElite ? '0 0 12px #D4AF37' : 'none';
          const color = d.isElite ? '#F9E79F' : '#64748B';
          const size = d.isElite ? 12 : 8;

          return (
            <div
              key={d.id}
              style={{
                position: 'absolute',
                left: curX,
                top: curY,
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                boxShadow: glow,
                transition: 'background-color 0.2s',
              }}
            />
          );
        })}

        {/* Tier Annotation Labels */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: 40,
            right: 40,
            display: 'flex',
            justifyContent: 'space-between',
            direction: 'rtl',
            fontSize: 16,
            color: '#94A3B8',
          }}
        >
          <span>مرحله ۱: غربالگری دانشگاهی</span>
          <span>مرحله ۲: ارزیابی تخصصی کمیته کشوری</span>
          <span style={{ color: '#D4AF37', fontWeight: 700 }}>مرحله ۳: معرفی پژوهشگر برجسته</span>
        </div>
      </div>
    </div>
  );
};
