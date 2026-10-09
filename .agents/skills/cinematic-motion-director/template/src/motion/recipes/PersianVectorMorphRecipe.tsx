/**
 * ============================================================================
 * PERSIAN VECTOR MORPH RECIPE (CLAUDE OPUS 5.5 GRADE)
 * ============================================================================
 * 
 * Implements genuine SVG path/vector morphing using @remotion/paths's
 * interpolatePath function, combined with Yekan Bakh typography and
 * frosted glassmorphism art direction.
 * 
 * Transitions topologically between:
 * 1. Iranian Scientific Octagram (ستاره هشت‌پر علمی و سازمانی)
 * 2. Neural AI Synaptic Core (مغز عصبی و ماتریس سیناپسی)
 * 3. Quantum Telemetry Wave (موج و تله‌متری داده‌های کوانتومی)
 * 4. Sovereign Precision Shield (سپر صیانت و مهر کالیبراسیون)
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { interpolatePath, evolvePath } from '@remotion/paths';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';

// 200x200 Coordinate Space SVG Paths
export const PATH_OCTAGRAM = 'M 100 15 L 122 68 L 180 50 L 152 100 L 180 150 L 122 132 L 100 185 L 78 132 L 20 150 L 48 100 L 20 50 L 78 68 Z';
export const PATH_NEURAL = 'M 100 20 C 145 20 180 55 180 100 C 180 145 145 180 100 180 C 55 180 20 145 20 100 C 20 55 55 20 100 20 Z';
export const PATH_WAVE = 'M 25 50 C 60 20 90 80 125 50 C 160 20 175 40 185 60 C 190 90 190 140 175 160 C 150 175 50 175 25 160 C 10 140 10 70 25 50 Z';
export const PATH_SHIELD = 'M 100 15 C 150 15 185 35 185 85 C 185 140 145 175 100 190 C 55 175 15 140 15 85 C 15 35 50 15 100 15 Z';
export const PATH_CHECKMARK = 'M 72 102 L 92 122 L 134 78';

export interface PersianVectorMorphProps {
  startFrame?: number;
  width?: number;
  height?: number;
  glowColor?: string;
}

export const PersianVectorMorphCard: React.FC<PersianVectorMorphProps> = ({
  startFrame = 0,
  width = 620,
  height = 340,
  glowColor = '#38bdf8',
}) => {
  const currentFrame = useCurrentFrame();
  const relFrame = Math.max(0, currentFrame - startFrame);

  // 4 Stages across 150 frames (approx 5.0 seconds @ 30 FPS):
  // Stage 0 (0..35): Octagram (نشان علمی)
  // Stage 1 (35..75): Morphing -> Neural Core (مغز عصبی)
  // Stage 2 (75..115): Morphing -> Quantum Wave (تحلیل موج)
  // Stage 3 (115..150): Morphing -> Sovereign Shield (سپر کالیبراسیون)
  
  let currentD = PATH_OCTAGRAM;
  let activeStageIndex = 0;
  let stageTitle = 'نشان علمی و هندسی کمیته';
  let stageBadge = 'مرحله ۱: نشان سازمانی';
  let stageDetail = 'هندسه برداری کالیبره شده با تقارن هشت‌گانه';
  let activeColor = '#06b6d4';

  if (relFrame < 35) {
    currentD = PATH_OCTAGRAM;
    activeStageIndex = 0;
    stageTitle = 'نشان علمی و هندسی کمیته';
    stageBadge = 'مرحله ۱: نشان سازمانی';
    stageDetail = 'هندسه برداری کالیبره شده با تقارن هشت‌گانه';
    activeColor = '#06b6d4';
  } else if (relFrame < 75) {
    const t = interpolate(relFrame, [35, 65], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    currentD = interpolatePath(t, PATH_OCTAGRAM, PATH_NEURAL);
    activeStageIndex = 1;
    stageTitle = 'شبکه عصبی پردازش هوشمند';
    stageBadge = 'مرحله ۲: موتور تانسوری';
    stageDetail = 'تبدیل پیوسته بردارها به ماتریس سیناپسی هوش مصنوعی';
    activeColor = '#8b5cf6';
  } else if (relFrame < 115) {
    const t = interpolate(relFrame, [75, 105], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    currentD = interpolatePath(t, PATH_NEURAL, PATH_WAVE);
    activeStageIndex = 2;
    stageTitle = 'تحلیل تله‌متری و امواج کوانتومی';
    stageBadge = 'مرحله ۳: تله‌متری پیوسته';
    stageDetail = 'پایش بلادرنگ نرخ فریم، دقت محاسبات و همگرایی داده‌ها';
    activeColor = '#3b82f6';
  } else {
    const t = interpolate(relFrame, [115, 140], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    currentD = interpolatePath(t, PATH_WAVE, PATH_SHIELD);
    activeStageIndex = 3;
    stageTitle = 'سپر کالیبراسیون و اعتبار نهایی';
    stageBadge = 'مرحله ۴: استاندارد طلایی';
    stageDetail = 'تأییدیه ۱۰۰٪ انطباق کیفی با استانداردهای کلاد اوپوس';
    activeColor = '#10b981';
  }

  // Checkmark evolve for Stage 3
  const checkProgress = interpolate(relFrame, [125, 148], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const checkEvolve = evolvePath(checkProgress, PATH_CHECKMARK);

  // Neural pulse rotation & glow
  const rotation = interpolate(relFrame, [0, 150], [0, 360]);
  const pulseScale = 1 + Math.sin(relFrame / 6) * 0.04;

  return (
    <div
      style={{
        width,
        height,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px ${activeColor}33`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row-reverse', // RTL Primary layout
        alignItems: 'center',
        padding: '24px 32px',
        gap: 32,
        direction: 'rtl',
        fontFamily: "'YekanBakh', 'Yekan Bakh', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Specular Edge Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)`,
          opacity: 0.8,
        }}
      />

      {/* LEFT (in RTL): SVG MORPHING CANVAS */}
      <div
        style={{
          width: 210,
          height: 210,
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ambient Radial Backlight */}
        <div
          style={{
            position: 'absolute',
            width: 170,
            height: 170,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${activeColor}44 0%, transparent 70%)`,
            transform: `scale(${pulseScale})`,
            transition: 'background 0.4s ease',
          }}
        />

        {/* Concentric Decorative Rings */}
        <svg
          width="210"
          height="210"
          viewBox="0 0 210 210"
          style={{
            position: 'absolute',
            inset: 0,
            transform: `rotate(${rotation * 0.2}deg)`,
          }}
        >
          <circle
            cx="105"
            cy="105"
            r="94"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle
            cx="105"
            cy="105"
            r="80"
            fill="none"
            stroke={activeColor}
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>

        {/* MAIN MORPHING SVG PATH */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          style={{
            position: 'relative',
            zIndex: 2,
            filter: `drop-shadow(0 0 16px ${activeColor}88)`,
          }}
        >
          <defs>
            <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor={activeColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={activeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Morphing Base Shape */}
          <path
            d={currentD}
            fill="url(#fillGrad)"
            stroke="url(#morphGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Neural Synapses Overlay (Active in Stage 1) */}
          {activeStageIndex === 1 && (
            <g opacity={Math.min(1, (relFrame - 35) / 15)}>
              <circle cx="100" cy="100" r="14" fill={activeColor} fillOpacity="0.6" />
              <circle cx="70" cy="70" r="6" fill="#ffffff" />
              <circle cx="130" cy="70" r="6" fill="#ffffff" />
              <circle cx="70" cy="130" r="6" fill="#ffffff" />
              <circle cx="130" cy="130" r="6" fill="#ffffff" />
              <line x1="70" y1="70" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="130" y1="70" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="70" y1="130" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="130" y1="130" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
            </g>
          )}

          {/* Sovereign Checkmark (Active in Stage 3) */}
          {activeStageIndex === 3 && (
            <path
              d={PATH_CHECKMARK}
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={checkEvolve.strokeDasharray}
              strokeDashoffset={checkEvolve.strokeDashoffset}
              style={{
                filter: 'drop-shadow(0 0 10px #10b981)',
              }}
            />
          )}
        </svg>
      </div>

      {/* RIGHT (in RTL): PERSIAN LABELS & LIVE TELEMETRY */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'right',
        }}
      >
        {/* Stage Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div
            style={{
              padding: '4px 14px',
              borderRadius: 20,
              background: `${activeColor}22`,
              border: `1px solid ${activeColor}66`,
              color: activeColor,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            {sanitizeForDisplay(stageBadge)}
          </div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: activeColor,
              boxShadow: `0 0 10px ${activeColor}`,
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#f8fafc',
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {sanitizeForDisplay(stageTitle)}
        </div>

        {/* Detail */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: '#94a3b8',
            marginBottom: 18,
            lineHeight: 1.6,
          }}
        >
          {sanitizeForDisplay(stageDetail)}
        </div>

        {/* Live Metrics Row */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            paddingTop: 14,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>نرخ فریم برداری</div>
            <div style={{ fontSize: 15, color: '#e2e8f0', fontWeight: 700 }}>۶۰ fps روان</div>
          </div>
          <div style={{ width: 1, height: 32, background: 'rgba(255, 255, 255, 0.1)' }} />
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>خطای برداری</div>
            <div style={{ fontSize: 15, color: '#10b981', fontWeight: 700 }}>۰.۰۰ (بی‌نقص)</div>
          </div>
          <div style={{ width: 1, height: 32, background: 'rgba(255, 255, 255, 0.1)' }} />
          <div>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>پیوستگی مسیر</div>
            <div style={{ fontSize: 15, color: activeColor, fontWeight: 700 }}>۱۰۰٪ مداوم</div>
          </div>
        </div>
      </div>
    </div>
  );
};
