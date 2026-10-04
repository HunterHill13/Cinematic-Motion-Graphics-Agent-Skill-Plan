import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { interpolatePath } from '../../motion/morphs';
import { AtmosphereParticles } from '../../motion/particles';

interface Pillar {
  id: string;
  num: string;
  title: string;
  enTitle: string;
  weight: string;
  iconType: 'document' | 'bulb' | 'project' | 'globe';
  color: string;
  angle: number;
}

const PILLARS: Pillar[] = [
  {
    id: 'p1',
    num: '۰۱',
    title: 'مقالات علمی',
    enTitle: 'RESEARCH PAPERS',
    weight: 'ضریب کیفی اصلی',
    iconType: 'document',
    color: '#38BDF8',
    angle: 0,
  },
  {
    id: 'p2',
    num: '۰۲',
    title: 'طرح‌های تحقیقاتی',
    enTitle: 'RESEARCH PROJECTS',
    weight: 'مصوب دانشگاهی',
    iconType: 'project',
    color: '#10B981',
    angle: 90,
  },
  {
    id: 'p3',
    num: '۰۳',
    title: 'اختراعات و نوآوری',
    enTitle: 'PATENTS & INNOVATION',
    weight: 'ثبت قطعی و کاربردی',
    iconType: 'bulb',
    color: '#D4AF37',
    angle: 180,
  },
  {
    id: 'p4',
    num: '۰۴',
    title: 'همایش‌های بین‌المللی',
    enTitle: 'CONFERENCES',
    weight: 'ارائه‌های معتبر جهانی',
    iconType: 'globe',
    color: '#A855F7',
    angle: 270,
  },
];

export const Shot03_Concept: React.FC = () => {
  const frame = useCurrentFrame();

  // Morph single horizontal line (from Shot02 threshold) into interconnected 4-pillar quadrant
  const morphProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Base path: Horizontal baseline line
  const linePath = [
    { x: 300, y: 540 },
    { x: 700, y: 540 },
    { x: 1220, y: 540 },
    { x: 1620, y: 540 },
  ];

  // Target path: A balanced diamond/quadrant loop connecting the 4 pillars
  const quadrantPath = [
    { x: 960, y: 320 }, // Top (Papers)
    { x: 1440, y: 540 }, // Right (Projects)
    { x: 960, y: 760 }, // Bottom (Patents)
    { x: 480, y: 540 }, // Left (Conferences)
  ];

  const currentPoints = interpolatePath(linePath, quadrantPath, morphProgress);
  const pathData = `M ${currentPoints[0].x} ${currentPoints[0].y} L ${currentPoints[1].x} ${currentPoints[1].y} L ${currentPoints[2].x} ${currentPoints[2].y} L ${currentPoints[3].x} ${currentPoints[3].y} Z`;

  // Core title entrance
  const headerOp = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Central core scale & rotation
  const coreScale = interpolate(frame, [25, 60], [0.6, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const coreRotate = interpolate(frame, [0, 300], [0, 360]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040711',
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
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.06) 0%, transparent 65%),
            radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.04) 0%, transparent 50%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px',
        }}
      />
      <AtmosphereParticles count={25} opacity={0.3} />

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
            padding: '6px 16px',
            borderRadius: 999,
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            marginBottom: 12,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D4AF37' }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em' }}>
            معیارهای ارزیابی جامع
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
          چهار محور اصلی محاسبه امتیاز
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: 17, color: '#64748B' }}>
          ترکیب متوازن دستاوردهای پژوهشی و فناورانه بر اساس آیین‌نامه کشوری
        </p>
      </div>

      {/* SVG Kinetic Morphing Grid Lines */}
      <svg
        width={1920}
        height={1080}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <defs>
          <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Morphing Quadrant Outline */}
        <path
          d={pathData}
          fill="rgba(10, 17, 40, 0.3)"
          stroke="url(#morphGrad)"
          strokeWidth={2.5}
          strokeDasharray={morphProgress < 0.9 ? '6,6' : 'none'}
        />

        {/* Diagonal Cross Rays Connecting Center */}
        {morphProgress > 0.4 && (
          <>
            <line
              x1={currentPoints[0].x}
              y1={currentPoints[0].y}
              x2={currentPoints[2].x}
              y2={currentPoints[2].y}
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="1.5"
            />
            <line
              x1={currentPoints[1].x}
              y1={currentPoints[1].y}
              x2={currentPoints[3].x}
              y2={currentPoints[3].y}
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="1.5"
            />
          </>
        )}
      </svg>

      {/* Central Rotating Quantum Nucleus */}
      <div
        style={{
          position: 'absolute',
          top: 540 - 70,
          left: 960 - 70,
          width: 140,
          height: 140,
          borderRadius: '50%',
          transform: `scale(${coreScale})`,
          opacity: morphProgress,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Outer Orbit Ring */}
        <div
          style={{
            position: 'absolute',
            inset: -12,
            borderRadius: '50%',
            border: '2px dashed rgba(212, 175, 55, 0.3)',
            transform: `rotate(${coreRotate}deg)`,
          }}
        />
        {/* Core Shield */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(5, 8, 20, 0.95) 75%)',
            border: '2px solid rgba(212, 175, 55, 0.8)',
            boxShadow: '0 0 35px rgba(212, 175, 55, 0.3)',
          }}
        />
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em' }}>
            مجموع کل
          </span>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC' }}>۱۰۰٪</div>
        </div>
      </div>

      {/* 4 Pillars Quadrant Nodes */}
      {PILLARS.map((p, idx) => {
        const itemDelay = 25 + idx * 8;
        const itemProgress = interpolate(frame, [itemDelay, itemDelay + 25], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });

        // Coordinates based on current points of morph
        const targetPt = currentPoints[idx];

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: targetPt.x,
              top: targetPt.y,
              transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * itemProgress})`,
              opacity: itemProgress,
              width: 320,
              padding: '20px 24px',
              borderRadius: 16,
              background: 'rgba(8, 14, 30, 0.85)',
              backdropFilter: 'blur(16px)',
              border: `1.5px solid ${itemProgress > 0.8 ? p.color : 'rgba(255,255,255,0.1)'}`,
              boxShadow: `0 12px 36px rgba(0,0,0,0.4), 0 0 20px ${p.color}22`,
              direction: 'rtl',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: p.color,
                  fontFamily: 'monospace',
                }}
              >
                {p.num}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {p.enTitle}
              </span>
            </div>

            <div style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC' }}>
              {p.title}
            </div>

            <div
              style={{
                fontSize: 14,
                color: '#CBD5E1',
                paddingTop: 6,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: p.color }} />
              {p.weight}
            </div>
          </div>
        );
      })}
    </div>
  );
};
