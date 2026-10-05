import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeGravitationalSingularity } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 05 — ACADEMIC SCORE THRESHOLD PEDESTALS (V13)
 * Frame Range: 1700 - 2185 (Global) / 0 - 485 (Local)
 * - Category: DataNumbers
 * - Recipe: score-threshold-pedestals
 * - Camera: continuous (1.000 -> 1.025, cy: 550 -> 530)
 * - Visual Companion: Three Monumental Architectural Plinths (65, 110, 130) + Score Badges
 * - Audio Sync Milestones:
 *     f1914 (local 214f): «کارشناسی ۶۵ امتیاز»
 *     f2010 (local 310f): «کارشناسی ارشد ۱۱۰ امتیاز»
 *     f2100 (local 400f): «دکتری تخصصی ۱۳۰ امتیاز»
 * - Outgoing Carry (T5): Gravitational Singularity handoff into Shot 06 (local 455 - 485f)
 */
export const Shot05_ThresholdsV13: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Header Title Reveal
  const titleOpacity = interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [10, 35], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(localFrame, 15, 25, 480);

  // 2. Pedestals Progressive Elevation
  // Pedestal 1: Bachelor (کارشناسی - ۶۵) at local f = 214
  const p1Rise = interpolate(localFrame, [60, 120], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p1Score = interpolate(localFrame, [140, 214], [0, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p1Lock = calculateKeywordStrike(localFrame, 214, { scalePeak: 1.15 });

  // Pedestal 2: Master (ارشد - ۱۱۰) at local f = 310
  const p2Rise = interpolate(localFrame, [150, 210], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p2Score = interpolate(localFrame, [230, 310], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p2Lock = calculateKeywordStrike(localFrame, 310, { scalePeak: 1.15 });

  // Pedestal 3: PhD (دکتری تخصصی - ۱۳۰) at local f = 400
  const p3Rise = interpolate(localFrame, [240, 300], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p3Score = interpolate(localFrame, [320, 400], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p3Lock = calculateKeywordStrike(localFrame, 400, { scalePeak: 1.15 });

  // Base Foundation Plinth Draw
  const plinthDraw = calculateDraw(localFrame, 30, 45, 1400);

  // 3. Outgoing Transition 05 Carry (Gravitational Singularity at local 455 - 485f)
  const t5Singularity = executeGravitationalSingularity(localFrame, 455, 485);

  return (
    <CameraGrammarRig mode="continuous" durationInFrames={485} intensity={1.0}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#07090E',
          color: '#F8FAFC',
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
          overflow: 'hidden',
        }}
      >
        {/* Background Atmospheric Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
            pointerEvents: 'none',
          }}
        />

        {/* Top Institutional Header */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: 16,
            fontSize: 15,
            color: '#94A3B8',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: '#D4AF37', fontWeight: 800 }}>جدول حدنصاب امتیازات</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span>تفکیک بر حسب مقاطع تحصیلی دانشگاهی</span>
          </div>
          <div style={{ color: '#10B981', fontWeight: 700 }}>معیار نهایی پذیرش</div>
        </div>

        {/* Section Header Title */}
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 140,
            right: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleSlideY}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: '#FFFFFF',
              margin: '0 0 10px 0',
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            حدنصاب امتیازات نخبگی بر اساس مقطع تحصیلی
          </h2>
          <div
            style={{
              width: headerDraw.progress * 480,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Central Visual Companion: Three Rising Architectural Plinths */}
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: '50%',
            transform: `translateX(-50%) scale(${localFrame >= 455 ? t5Singularity.scale : 1})`,
            transformOrigin: 'center center',
            width: 1300,
            height: 600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 60,
            opacity: localFrame >= 455 ? t5Singularity.opacity : 1,
          }}
        >
          {/* Base Horizontal Foundation Datum */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: plinthDraw.progress * 1300,
              height: 8,
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
              borderRadius: 4,
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
            }}
          />

          {/* Pedestal 1 (Right): Bachelor (کارشناسی - ۶۵ امتیاز) */}
          <div
            style={{
              position: 'relative',
              width: 320,
              height: 240 * p1Rise,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              border: localFrame >= 214 ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: '4px solid #38BDF8',
              borderRadius: '12px 12px 0 0',
              boxShadow: localFrame >= 214 ? '0 0 35px rgba(56, 189, 248, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(14px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 20px',
              boxSizing: 'border-box',
              transform: `scale(${localFrame >= 214 ? p1Lock.scale : 1})`,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>
                مقطع دانشگاهی
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#F8FAFC' }}>کارشناسی</div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 9, 14, 0.75)',
                borderRadius: 12,
                padding: '12px 24px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              <div style={{ fontSize: 46, fontWeight: 900, color: '#38BDF8', lineHeight: 1 }}>
                {p1Score.toFixed(0)}
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, fontWeight: 600 }}>
                امتیاز حدنصاب
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
              کف امتیاز ارزیابی
            </div>
          </div>

          {/* Pedestal 2 (Center): Master (کارشناسی ارشد - ۱۱۰ امتیاز) */}
          <div
            style={{
              position: 'relative',
              width: 340,
              height: 360 * p2Rise,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              border: localFrame >= 310 ? '2px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: '4px solid #D4AF37',
              borderRadius: '12px 12px 0 0',
              boxShadow: localFrame >= 310 ? '0 0 45px rgba(212, 175, 55, 0.35)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(14px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '28px 20px',
              boxSizing: 'border-box',
              transform: `scale(${localFrame >= 310 ? p2Lock.scale : 1})`,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>
                مقطع دانشگاهی
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC' }}>
                کارشناسی ارشد
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 9, 14, 0.75)',
                borderRadius: 12,
                padding: '14px 28px',
                border: '1px solid rgba(212, 175, 55, 0.35)',
              }}
            >
              <div style={{ fontSize: 52, fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>
                {p2Score.toFixed(0)}
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, fontWeight: 600 }}>
                امتیاز حدنصاب
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
              کف امتیاز ارزیابی
            </div>
          </div>

          {/* Pedestal 3 (Left): PhD (دکتری تخصصی - ۱۳۰ امتیاز) */}
          <div
            style={{
              position: 'relative',
              width: 360,
              height: 480 * p3Rise,
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              border: localFrame >= 400 ? '2px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: '4px solid #10B981',
              borderRadius: '12px 12px 0 0',
              boxShadow: localFrame >= 400 ? '0 0 50px rgba(16, 185, 129, 0.35)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(14px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '32px 24px',
              boxSizing: 'border-box',
              transform: `scale(${localFrame >= 400 ? p3Lock.scale : 1})`,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>
                مقطع دانشگاهی
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#F8FAFC' }}>
                دکتری تخصصی
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 9, 14, 0.75)',
                borderRadius: 12,
                padding: '16px 32px',
                border: '1px solid rgba(16, 185, 129, 0.35)',
              }}
            >
              <div style={{ fontSize: 58, fontWeight: 900, color: '#10B981', lineHeight: 1 }}>
                {p3Score.toFixed(0)}
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, fontWeight: 600 }}>
                امتیاز حدنصاب
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
              کف امتیاز ارزیابی
            </div>
          </div>
        </div>

        {/* Gravitational Singularity Core Flash (local 455 - 485f) */}
        {localFrame >= 455 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              boxShadow: `0 0 ${t5Singularity.glow}px #D4AF37`,
              opacity: t5Singularity.opacity,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Footer Ground Datum */}
        <div
          style={{
            position: 'absolute',
            bottom: 70,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: '#64748B',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 14,
          }}
        >
          <span>شیوه‌نامه محاسبه امتیازات فعالیت‌های نخبگانی</span>
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>مصوب شورای هدایت استعدادهای درخشان</span>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
