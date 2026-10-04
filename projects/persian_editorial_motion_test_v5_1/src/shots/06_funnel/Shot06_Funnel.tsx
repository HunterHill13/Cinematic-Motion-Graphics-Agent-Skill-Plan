import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { AtmosphereParticles } from '../../motion/particles';

interface StepCard {
  level: string;
  stage: string;
  role: string;
  badge: string;
  color: string;
  points: string;
}

const FUNNEL_STEPS: StepCard[] = [
  {
    level: 'مرحله اول',
    stage: 'کمیته تحقیقات دانشجویی دانشگاه',
    role: 'غربالگری پرونده‌ها و صحت‌سنجی اولیه مدارک پژوهشی',
    badge: 'ارزیابی دانشگاهی',
    color: '#38BDF8',
    points: '۱۰۰٪ داوطلبان',
  },
  {
    level: 'مرحله دوم',
    stage: 'شورای استعداد درخشان دانشگاه',
    role: 'تأیید حدنصاب آموزشی و اخلاقی طبق ماده ۲',
    badge: 'فیلتر آموزشی',
    color: '#D4AF37',
    points: 'برگزیدگان مرحله ۱',
  },
  {
    level: 'مرحله سوم (نهایی)',
    stage: 'معاونت تحقیقات و فناوری وزارت بهداشت',
    role: 'داوری ملی متمرکز و اعطای نشان پژوهشگر برجسته کشور',
    badge: 'تأییدیه کشوری',
    color: '#10B981',
    points: 'نخبگان برتر سلامت',
  },
];

export const Shot06_Funnel: React.FC = () => {
  const frame = useCurrentFrame();

  // Header entrance
  const headerOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Dynamic Funnel Polygon Morph: Particles converging through 3 stages
  const funnelProgress = interpolate(frame, [15, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Procedural swarm of candidate dots condensing from wide to narrow
  const dots = [];
  for (let i = 0; i < 36; i++) {
    // Initial dispersed positions
    const angle = (i / 36) * Math.PI * 2;
    const initialR = 180 + (i % 5) * 25;
    const initX = 380 + Math.cos(angle) * initialR;
    const initY = 560 + Math.sin(angle) * (initialR * 0.7);

    // Final focused podium position
    const targetX = 380 + ((i % 6) - 2.5) * 18;
    const targetY = 540 + (Math.floor(i / 6) - 3) * 14;

    const curX = interpolate(funnelProgress, [0, 1], [initX, targetX]);
    const curY = interpolate(funnelProgress, [0, 1], [initY, targetY]);

    dots.push({ x: curX, y: curY, idx: i });
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040715',
        overflow: 'hidden',
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix & Subtle Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 50%, rgba(56, 189, 248, 0.06) 0%, transparent 65%),
            radial-gradient(circle at 75% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 54px 54px, 54px 54px',
        }}
      />
      <AtmosphereParticles count={24} opacity={0.3} />

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
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: 12,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D4AF37' }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em' }}>
            فرآیند ارزیابی و غربالگری کشوری
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
          از کمیته دانشگاه تا نشان نهایی وزارت بهداشت
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: 17, color: '#94A3B8' }}>
          مسیر دقیق تصاعدی پرونده‌های پژوهشگران جهت احراز رتبه ممتاز ملی
        </p>
      </div>

      {/* Left-Side Funnel Particles / Convergence Graphic */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 100,
          width: 560,
          height: 580,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={560} height={580} style={{ position: 'absolute', inset: 0 }}>
          {/* Conical Funnel Guidelines */}
          <line x1={120} y1={280} x2={380} y2={480} stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1={440} y1={280} x2={380} y2={480} stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Focal Target Circle */}
          <circle
            cx={380}
            cy={540}
            r={55}
            fill="rgba(16, 185, 129, 0.1)"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Converging Candidate Dots */}
          {dots.map((d) => (
            <circle
              key={d.idx}
              cx={d.x}
              cy={d.y}
              r={funnelProgress > 0.8 ? 4 : 3}
              fill={d.idx % 2 === 0 ? '#38BDF8' : '#D4AF37'}
              opacity={0.75}
            />
          ))}
        </svg>

        <div
          style={{
            position: 'absolute',
            bottom: 20,
            textAlign: 'center',
            direction: 'rtl',
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 800, color: '#D4AF37' }}>
            غربالگری چندمرحله‌ای نخبگان
          </div>
          <div style={{ fontSize: 12, color: '#64748B' }}>
            NATIONAL SELECTION FUNNEL
          </div>
        </div>
      </div>

      {/* Right-Side 3-Step Process Track */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          right: 120,
          width: 820,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          direction: 'rtl',
        }}
      >
        {FUNNEL_STEPS.map((step, idx) => {
          const cardDelay = 20 + idx * 12;
          const cardProgress = interpolate(frame, [cardDelay, cardDelay + 25], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={step.level}
              style={{
                padding: '24px 28px',
                borderRadius: 18,
                background: 'rgba(8, 16, 34, 0.85)',
                backdropFilter: 'blur(16px)',
                border: `1.5px solid ${cardProgress > 0.8 ? step.color : 'rgba(255,255,255,0.08)'}`,
                boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 24px ${step.color}15`,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                opacity: cardProgress,
                transform: `translateX(${(1 - cardProgress) * -40}px)`,
              }}
            >
              {/* Step Number Circle */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: `${step.color}18`,
                  border: `2px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 900,
                  color: step.color,
                  flexShrink: 0,
                }}
              >
                ۰{idx + 1}
              </div>

              {/* Step Information */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC' }}>
                    {step.stage}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: step.color,
                      padding: '3px 10px',
                      borderRadius: 6,
                      backgroundColor: `${step.color}20`,
                      border: `1px solid ${step.color}40`,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>
                <div style={{ fontSize: 15, color: '#94A3B8', marginBottom: 6 }}>
                  {step.role}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: step.color }}>
                  {step.points}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
