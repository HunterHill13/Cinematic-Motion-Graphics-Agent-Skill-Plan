import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { seg } from '../motion/Motion';

/**
 * Shot 3: Line-Carried Transition & The Four Pillars
 * Reused & adapted from:
 * - LineCarryTransition.tsx (_research/video-shotcraft/demos/transition/line-carry-transition/)
 * - Continuous vector line drawing boundary, zero slideshow cuts
 */

interface Pillar {
  title: string;
  weight: string;
  desc: string;
  icon: (color: string) => React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    title: 'مقالات علمی',
    weight: 'بیشترین ضریب',
    desc: 'نمایه در WoS، PubMed، Scopus با اولویت مقالات Q1',
    icon: (c) => (
      <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'اختراعات و نوآوری',
    weight: 'ارزش فناورانه',
    desc: 'ثبت اختراع معتبر داخلی، پتنت بین‌المللی و محصول سلامت',
    icon: (c) => (
      <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: 'طرح‌های پژوهشی',
    weight: 'اثربخشی بالینی',
    desc: 'همکاری در طرح‌های پایان‌یافته مصوب شورای پژوهشی',
    icon: (c) => (
      <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      </svg>
    ),
  },
  {
    title: 'همایش‌ها و جوایز',
    weight: 'ارائه علمی',
    desc: 'مقالات برگزیده در کنگره‌های معتبر ملی و بین‌المللی',
    icon: (c) => (
      <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
];

export const Shot3_LineCarryPillars: React.FC = () => {
  const frame = useCurrentFrame();

  // Line carry animation (reused logic from LineCarryTransition.tsx)
  // Phase 1: Line shoots across from left to right (f0–f30)
  const lineExtend = interpolate(frame, [0, 30], [0, 1720], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Frame boundary perimeter box grows (f25–f55)
  const boxHeight = interpolate(frame, [25, 55], [0, 620], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title fade (f35–f60)
  const titleOp = seg(frame, 35, 60, Easing.out(Easing.quad));

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
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%),
            linear-gradient(rgba(212, 175, 55, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* Top Header */}
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
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#D4AF37',
            letterSpacing: '0.1em',
            marginBottom: 6,
          }}
        >
          ارزیابی جامع مستندات علمی
        </span>
        <span style={{ fontSize: 38, fontWeight: 800, color: '#F8FAFC' }}>
          چهار محور اصلی محاسبه امتیازات نهایی
        </span>
      </div>

      {/* Kinetic Line-Carried Outer Boundary Box */}
      <div
        style={{
          position: 'absolute',
          top: 170,
          left: 100,
          width: 1720,
          height: 640,
          pointerEvents: 'none',
        }}
      >
        {/* Top Horizontal Vector Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: lineExtend,
            height: 2,
            background: 'linear-gradient(90deg, #D4AF37, #38BDF8)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
          }}
        />

        {/* Right Vertical Drop */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 2,
            height: boxHeight,
            background: '#38BDF8',
          }}
        />

        {/* Left Vertical Drop */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 2,
            height: boxHeight,
            background: '#D4AF37',
          }}
        />

        {/* Bottom Horizontal Return Line */}
        <div
          style={{
            position: 'absolute',
            bottom: 640 - boxHeight,
            left: 0,
            width: lineExtend,
            height: 2,
            background: 'rgba(212, 175, 55, 0.4)',
          }}
        />
      </div>

      {/* The 4 Pillars Staggered Bloom (f45–f90) */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 140,
          right: 140,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 24,
          direction: 'rtl',
        }}
      >
        {PILLARS.map((p, idx) => {
          const itemStart = 45 + idx * 8;
          const itemScale = interpolate(frame, [itemStart, itemStart + 16], [0.85, 1], {
            easing: Easing.out(Easing.back(1.5)),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const itemOp = seg(frame, itemStart, itemStart + 12, Easing.out(Easing.quad));

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                padding: '36px 24px',
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.9) 100%)',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                borderRadius: 18,
                transform: `scale(${itemScale})`,
                opacity: itemOp,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Pillar Number Watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 16,
                  fontSize: 32,
                  fontWeight: 900,
                  color: 'rgba(212, 175, 55, 0.12)',
                }}
              >
                0{idx + 1}
              </div>

              {/* Icon Container */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                {p.icon('#D4AF37')}
              </div>

              {/* Title */}
              <span style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 8 }}>
                {p.title}
              </span>

              {/* Tag / Weight */}
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#38BDF8',
                  background: 'rgba(56, 189, 248, 0.1)',
                  padding: '4px 12px',
                  borderRadius: 12,
                  marginBottom: 16,
                }}
              >
                {p.weight}
              </span>

              {/* Description */}
              <span style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
                {p.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Institutional Footer Seal */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          opacity: seg(frame, 70, 100, Easing.out(Easing.quad)),
        }}
      >
        <span style={{ fontSize: 16, color: '#64748B', direction: 'rtl' }}>
          آیین‌نامه استعدادهای درخشان — کمیته کشوری تحقیقات دانشجویی
        </span>
      </div>
    </div>
  );
};
