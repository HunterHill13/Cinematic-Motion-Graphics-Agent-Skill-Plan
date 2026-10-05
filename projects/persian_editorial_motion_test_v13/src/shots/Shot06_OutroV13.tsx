import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike, calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & MASTER OUTRO (V13)
 * Frame Range: 2155 - 2361 (Global) / 0 - 206 (Local)
 * - Category: HeroInstitutional
 * - Recipe: heraldic-institutional-seal
 * - Camera: micro-pull (1.025 -> 1.000, dignified release)
 * - Visual Companion: Grand Heraldic Crest + Dual Laurel Branches + Gold Orbit
 * - Audio Sync: Crest seats at global f2195 (local f40), speech ends at f2317 (local f162)
 * - Final Master Resolve: Dignified crystal-clear stillness until f2361
 */
export const Shot06_OutroV13: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Inward Singularity Expansion into Golden Core (local 0 - 40f)
  const coreExpansion = interpolate(localFrame, [0, 40], [0.1, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Heraldic Crest Collision Lock at local f = 40 (global f = 2195)
  const crestCollision = calculateCollision(localFrame, 40, {
    reboundAmplitude: 10,
    decay: 0.22,
    maxSquash: 0.12,
  });

  // Dual Golden Shockwave Ripples
  const ripple1 = calculateRipple(localFrame, 40, 45, 320);
  const ripple2 = calculateRipple(localFrame, 48, 50, 460);

  // 3. Laurel Branches & Ring Draw
  const laurelDraw = calculateDraw(localFrame, 45, 35, 600);
  const orbitRotation = (localFrame * 0.3) % 360;

  // 4. Hero Outro Typography Reveals
  const titleStrike = calculateKeywordStrike(localFrame, 65, { scalePeak: 1.12 });
  const subtitleReveal = calculateMaskedPhraseReveal(localFrame, 90, 28);
  const sloganReveal = calculateMaskedPhraseReveal(localFrame, 120, 28);

  return (
    <CameraGrammarRig mode="micro-pull" durationInFrames={206} intensity={1.0}>
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

        {/* Ambient Persian Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 200,
            fontWeight: 900,
            color: 'rgba(212, 175, 55, 0.025)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          ایران اسلامی
        </div>

        {/* Shockwave Ripples from Crest Seat */}
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
            <span style={{ color: '#D4AF37', fontWeight: 800 }}>بنیاد ملی نخبگان</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span>ستاد کل نیروهای مسلح جمهوری اسلامی ایران</span>
          </div>
          <div style={{ color: '#D4AF37', fontWeight: 700 }}>اعتلای علمی کشور</div>
        </div>

        {/* Central Heraldic Institutional Crest (Visual Companion) */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: '50%',
            transform: `translateX(-50%) translateY(${crestCollision.displacementY}px) scale(${coreExpansion})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Grand Heraldic Medallion with Rotating Orbit Ring */}
          <div
            style={{
              position: 'relative',
              width: 170,
              height: 170,
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.6), inset 0 0 30px rgba(212, 175, 55, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Outer Rotating Filigree Orbit */}
            <div
              style={{
                position: 'absolute',
                inset: -14,
                borderRadius: '50%',
                border: '1.5px dashed rgba(212, 175, 55, 0.5)',
                transform: `rotate(${orbitRotation}deg)`,
              }}
            />

            {/* Inner Laurel Wreath Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: '50%',
                border: '2px solid rgba(212, 175, 55, 0.7)',
                opacity: laurelDraw.progress,
              }}
            />

            {/* Core Emblem Text */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>
                نخبگان
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', marginTop: 4 }}>
                ایران
              </div>
            </div>
          </div>

          {/* Hero Outro Title */}
          <div
            style={{
              marginTop: 40,
              textAlign: 'center',
              transform: `scale(${titleStrike.scale})`,
              opacity: titleStrike.opacity,
            }}
          >
            <h1
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.02em',
                textShadow: '0 4px 30px rgba(212, 175, 55, 0.35)',
              }}
            >
              پروژه جایگزین خدمت نخبگی
            </h1>
          </div>

          {/* Subtitle Line with MaskedPhraseReveal */}
          <div style={{ overflow: 'hidden', marginTop: 14 }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#CBD5E1',
                margin: 0,
                transform: `translateY(${subtitleReveal.translateY}px)`,
                opacity: subtitleReveal.opacity,
              }}
            >
              گامی ماندگار در مسیر اعتلای علمی و حل مسائل اساسی کشور
            </p>
          </div>

          {/* Institutional Slogan */}
          <div style={{ overflow: 'hidden', marginTop: 10 }}>
            <p
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: '#D4AF37',
                margin: 0,
                letterSpacing: '0.04em',
                transform: `translateY(${sloganReveal.translateY}px)`,
                opacity: sloganReveal.opacity,
              }}
            >
              آینده‌سازان ایران اسلامی
            </p>
          </div>

          {/* Horizontal Golden Resolution Datum */}
          <div
            style={{
              width: 500 * laurelDraw.progress,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.5)',
              marginTop: 28,
              borderRadius: 1,
            }}
          />
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
          <span>پایگاه اطلاع‌رسانی بنیاد ملی نخبگان و مرکز امور نخبگان نیروهای مسلح</span>
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>پایان برنامه • سال ۱۴۰۳</span>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
