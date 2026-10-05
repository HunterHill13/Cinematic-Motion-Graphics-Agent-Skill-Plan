import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { executeSymmetricFission } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 02 — THE OFFICIAL STATUTE DECREE MONOLITH (V13)
 * Frame Range: 350 - 650 (10.00s @ 30 FPS / 300 frames)
 * - Category: EditorialTypography
 * - Recipe: decree-monolith-reveal
 * - Camera: slow-dolly (1.000 -> 1.015)
 * - Visual Companion: Embossed Heraldic Decree Medallion + Legal Monolith Border
 * - Incoming Carry (T1): Inflow intake from Shot 01 kinetic ray (local 0 - 30f)
 * - Audio Sync: Stamp collision at global f395 (local f45)
 * - Outgoing Carry (T2): Symmetric fission into 3 criteria pillars (local 270 - 300f / global 620 - 650f)
 */
export const Shot02_DecreeV13: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Incoming T1 Intake (local 0 - 30f)
  const incomingCarryWidth = interpolate(localFrame, [0, 30], [200, 1100], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const incomingCarryOpacity = interpolate(localFrame, [0, 20, 35], [0.6, 1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Official Seal Collision at local f = 45 (global f = 395)
  const sealCollision = calculateCollision(localFrame, 45, {
    reboundAmplitude: 12,
    decay: 0.2,
    maxSquash: 0.16,
  });

  // Dual Shockwave Ripples emanating from seal stamp
  const ripple1 = calculateRipple(localFrame, 45, 40, 240);
  const ripple2 = calculateRipple(localFrame, 52, 45, 360);

  // 3. Monolith Border Draw
  const borderDraw = calculateDraw(localFrame, 35, 30, 960);

  // 4. Masked Phrase Reveals for Legal Decree Text
  const decreeHeaderReveal = calculateMaskedPhraseReveal(localFrame, 65, 25);
  const bodyLine1Reveal = calculateMaskedPhraseReveal(localFrame, 90, 25);
  const bodyLine2Reveal = calculateMaskedPhraseReveal(localFrame, 120, 25);

  // 5. Outgoing Transition 02 Carry (Symmetric Fission at local 270 - 300f)
  const t2Fission = executeSymmetricFission(localFrame, 270, 300, {
    centerX: 960,
    leftTargetX: 420,
    rightTargetX: 1500,
  });

  return (
    <CameraGrammarRig mode="slow-dolly" durationInFrames={300} intensity={1.0}>
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

        {/* Incoming T1 Kinetic Ray Morphing into Upper Border (local 0 - 35f) */}
        {localFrame <= 35 && (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: '50%',
              transform: 'translateX(-50%)',
              width: incomingCarryWidth,
              height: 4,
              backgroundColor: '#D4AF37',
              borderRadius: 2,
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.9)',
              opacity: incomingCarryOpacity,
            }}
          />
        )}

        {/* Shockwave Ripples from Seal Impact */}
        {ripple1.active && (
          <div
            style={{
              position: 'absolute',
              left: 960 - ripple1.radius,
              top: 360 - ripple1.radius,
              width: ripple1.radius * 2,
              height: ripple1.radius * 2,
              borderRadius: '50%',
              border: `${ripple1.strokeWidth}px solid rgba(212, 175, 55, 0.6)`,
              opacity: ripple1.opacity,
              pointerEvents: 'none',
            }}
          />
        )}
        {ripple2.active && (
          <div
            style={{
              position: 'absolute',
              left: 960 - ripple2.radius,
              top: 360 - ripple2.radius,
              width: ripple2.radius * 2,
              height: ripple2.radius * 2,
              borderRadius: '50%',
              border: `${ripple2.strokeWidth}px solid rgba(56, 189, 248, 0.5)`,
              opacity: ripple2.opacity,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Top Institutional Classification Bar */}
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
            <span style={{ color: '#D4AF37', fontWeight: 800 }}>مصوبه ابلاغی</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span>بند قانونی جایگزین خدمت تحقیقاتی</span>
          </div>
          <div style={{ color: '#F59E0B', fontWeight: 700 }}>سند رسمی بالادستی</div>
        </div>

        {/* Central Legal Decree Monolith Box (Visual Companion) */}
        <div
          style={{
            position: 'absolute',
            top: 170,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1200,
            height: 680,
            borderRadius: 16,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            border: '1px solid rgba(212, 175, 55, 0.28)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(212, 175, 55, 0.05)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '50px 80px',
            boxSizing: 'border-box',
          }}
        >
          {/* Official Seal Medallion with Collision Dynamics (at f = 45) */}
          <div
            style={{
              position: 'relative',
              width: 130,
              height: 130,
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 35px rgba(212, 175, 55, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translateY(${sealCollision.displacementY}px) scaleX(${sealCollision.squashScaleX}) scaleY(${sealCollision.squashScaleY})`,
              marginBottom: 36,
            }}
          >
            {/* Concentric Decorative Rings inside seal */}
            <div
              style={{
                position: 'absolute',
                inset: 8,
                borderRadius: '50%',
                border: '1px dashed rgba(212, 175, 55, 0.6)',
              }}
            />
            <span style={{ fontSize: 24, fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>
              مصوبه
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', marginTop: 4 }}>
              رسمی
            </span>
          </div>

          {/* Legal Header with MaskedPhraseReveal */}
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                textAlign: 'center',
                letterSpacing: '-0.01em',
                transform: `translateY(${decreeHeaderReveal.translateY}px)`,
                opacity: decreeHeaderReveal.opacity,
              }}
            >
              تصویب‌نامه ستاد کل نیروهای مسلح و بنیاد ملی نخبگان
            </h2>
          </div>

          {/* Decree Body Text Line 1 */}
          <div style={{ overflow: 'hidden', marginBottom: 14 }}>
            <p
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: '#CBD5E1',
                margin: 0,
                lineHeight: 1.7,
                textAlign: 'center',
                transform: `translateY(${bodyLine1Reveal.translateY}px)`,
                opacity: bodyLine1Reveal.opacity,
              }}
            >
              متقاضیان واجد شرایط می‌توانند به جای حضور در یگان‌های نظامی و پادگان‌ها،
            </p>
          </div>

          {/* Decree Body Text Line 2 */}
          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#38BDF8',
                margin: 0,
                lineHeight: 1.7,
                textAlign: 'center',
                transform: `translateY(${bodyLine2Reveal.translateY}px)`,
                opacity: bodyLine2Reveal.opacity,
              }}
            >
              پروژه‌ای تحقیقاتی در راستای حل مسائل اساسی و اولویت‌دار کشور به انجام رسانند.
            </p>
          </div>

          {/* Monolith Architectural Underline Datum */}
          <div
            style={{
              width: borderDraw.progress * 960,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
              marginTop: 40,
              borderRadius: 1,
            }}
          />
        </div>

        {/* Transition 02 Symmetric Fission Visual Guides (local 270 - 300f) */}
        {localFrame >= 270 && (
          <>
            <div
              style={{
                position: 'absolute',
                top: 480,
                left: t2Fission.leftX,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.9)',
                opacity: t2Fission.opacity,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 480,
                left: t2Fission.rightX,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.9)',
                opacity: t2Fission.opacity,
              }}
            />
          </>
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
          <span>استناد به مصوبات شورای عالی انقلاب فرهنگی</span>
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>ماده ۲ ضوابط جایگزین خدمت نخبگی</span>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
