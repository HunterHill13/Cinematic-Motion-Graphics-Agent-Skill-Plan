import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { executePlanarStageFold } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 04 — TEMPORAL CUTOFF & LEGAL CALENDAR (V13)
 * Frame Range: 1450 - 1730 (Global) / 0 - 280 (Local)
 * - Category: TimelineProcess
 * - Recipe: temporal-cutoff-timeline
 * - Camera: slow-dolly (1.000 -> 1.020)
 * - Visual Companion: 12-Month Chronological Tick Ruler + Red Barrier Gate
 * - Audio Sync: Barrier strike at global f1575 (local f125)
 * - Outgoing Carry (T4): Planar stage fold into base plinth (local 250 - 280f / global 1700 - 1730f)
 */
export const Shot04_TimeWindowV13: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Header Title Reveal
  const titleOpacity = interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [10, 35], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(localFrame, 15, 25, 480);

  // 2. Timeline Axis Travel (Month 0 to Month 12)
  const timelineProgress = interpolate(localFrame, [35, 125], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Cutoff Barrier Collision at local f = 125 (global f = 1575)
  const barrierCollision = calculateCollision(localFrame, 125, {
    reboundAmplitude: 14,
    decay: 0.22,
    maxSquash: 0.18,
  });

  // 4. Warning and Explanatory Text Reveals
  const warningReveal = calculateMaskedPhraseReveal(localFrame, 130, 24);
  const portalNoticeReveal = calculateMaskedPhraseReveal(localFrame, 155, 24);

  // 5. Outgoing Transition 04 Carry (Planar Stage Fold at local 250 - 280f)
  const t4Fold = executePlanarStageFold(localFrame, 250, 280);

  return (
    <CameraGrammarRig mode="slow-dolly" durationInFrames={280} intensity={1.0}>
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
            <span style={{ color: '#EF4444', fontWeight: 800 }}>مهلت زمانی قانونی</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span>بازه مجاز ثبت مدارک در سامانه</span>
          </div>
          <div style={{ color: '#F59E0B', fontWeight: 700 }}>سقف انقضای پرونده</div>
        </div>

        {/* Section Header Title */}
        <div
          style={{
            position: 'absolute',
            top: 150,
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
            گاه‌شمار قانونی ثبت درخواست و سقف مهلت مجاز
          </h2>
          <div
            style={{
              width: headerDraw.progress * 480,
              height: 2,
              backgroundColor: 'rgba(239, 68, 68, 0.5)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Central Visual Companion: 12-Month Chronological Ruler Gate */}
        <div
          style={{
            position: 'absolute',
            top: 290,
            left: '50%',
            transform: `translateX(-50%) perspective(1200px) rotateX(${localFrame >= 250 ? t4Fold.rotateX : 0}deg) translateY(${localFrame >= 250 ? t4Fold.translateY : 0}px)`,
            width: 1400,
            height: 380,
            borderRadius: 16,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            padding: '40px 60px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: localFrame >= 250 ? t4Fold.opacity : 1,
          }}
        >
          {/* Milestone Labels above ruler */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: '#38BDF8',
                  boxShadow: '0 0 12px #38BDF8',
                }}
              />
              <span style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8' }}>
                تاریخ فراغت از تحصیل
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#EF4444' }}>
                سقف مجاز: حداکثر ۱ سال (۱۲ ماه)
              </span>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  boxShadow: '0 0 12px #EF4444',
                }}
              />
            </div>
          </div>

          {/* Chronological Track & Progress Bar */}
          <div style={{ position: 'relative', width: '100%', margin: '40px 0' }}>
            {/* Background Rail */}
            <div
              style={{
                width: '100%',
                height: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                position: 'relative',
              }}
            >
              {/* Luminous Active Progress Fill */}
              <div
                style={{
                  width: `${timelineProgress * 100}%`,
                  height: '100%',
                  backgroundColor: '#D4AF37',
                  borderRadius: 4,
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.9)',
                }}
              />

              {/* 12 Monthly Ticks */}
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    right: `${(i / 12) * 100}%`,
                    top: -12,
                    width: 2,
                    height: 32,
                    backgroundColor: i === 0 || i === 12 ? '#EF4444' : 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 38,
                      right: -10,
                      fontSize: 12,
                      color: i === 12 ? '#EF4444' : '#64748B',
                      fontWeight: i === 12 ? 800 : 500,
                    }}
                  >
                    {i === 0 ? 'شروع' : `ماه ${i}`}
                  </span>
                </div>
              ))}

              {/* Month 12 Cutoff Barrier Gate (Slam impact at f = 125) */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: -60,
                  width: 6,
                  height: 128,
                  backgroundColor: '#EF4444',
                  borderRadius: 3,
                  boxShadow: '0 0 25px rgba(239, 68, 68, 1)',
                  transform: `translateY(${localFrame >= 125 ? barrierCollision.displacementY : 0}px)`,
                }}
              />
            </div>
          </div>

          {/* Bottom Clarification Blocks */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
            {/* Warning Box */}
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 10,
                padding: '16px 20px',
                opacity: warningReveal.opacity,
                transform: `translateY(${warningReveal.translateY}px)`,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: '#EF4444', marginBottom: 6 }}>
                اخطار انقضای فرصت قانونی
              </div>
              <div style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.6 }}>
                در صورت عدم ثبت در موعد ۱۲ ماهه، امکان استفاده از این تسهیلات برای همیشه سلب خواهد شد
              </div>
            </div>

            {/* Portal Registration Box */}
            <div
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: 10,
                padding: '16px 20px',
                opacity: portalNoticeReveal.opacity,
                transform: `translateY(${portalNoticeReveal.translateY}px)`,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', marginBottom: 6 }}>
                سامانه ثبت نام بنیاد نخبگان
              </div>
              <div style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.6 }}>
                بارگذاری کامل دانشنامه و مدارک پژوهشی در سامانه سینا پیش از اتمام مهلت یک‌ساله
              </div>
            </div>
          </div>
        </div>

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
          <span>تقویم زمان‌بندی اعلام فراخوان‌های سالانه</span>
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>محدودیت زمانی غیرقابل تمدید</span>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
