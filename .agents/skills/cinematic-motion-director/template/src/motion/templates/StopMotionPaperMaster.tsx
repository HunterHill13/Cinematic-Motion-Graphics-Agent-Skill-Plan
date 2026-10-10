/**
 * ============================================================================
 * MASTER ARCHETYPE 7: STOP-MOTION TACTILE PAPER CUTOUT
 * ============================================================================
 * 
 * Inspired by classic artisanal motion design and viral paper craft explainers:
 * - Tactile paper fiber background (#EBE6DF) with simulated fiber specks
 * - 12 FPS stepped quantization ("on twos") giving authentic hand-crafted stop-motion cadence
 * - Physical kraft tape strips with translucent adhesive highlights
 * - Cutout paper cards with authentic directional paper drop shadows
 * - Hand-stamped seal badges and organic scissors-cut aesthetic
 * - Zero digital gloss, zero artificial glow - 100% physical tactile warmth
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Audio, staticFile } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { clampFontSize } from '../../typography/responsiveTypography';

export const STOP_MOTION_DURATION = 450; // 15.0s @ 30 FPS
export const STOP_MOTION_FPS = 30;
export const STOP_MOTION_WIDTH = 1920;
export const STOP_MOTION_HEIGHT = 1080;

export const StopMotionPaperMaster: React.FC = () => {
  const rawFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quantize motion to 12 FPS stepped stop-motion cadence ("on twos")
  const stepInterval = 2.5;
  const frame = Math.floor(rawFrame / stepInterval) * stepInterval;

  const beatPulse = calculateBeatPulse(rawFrame, 124, fps);

  // Stepped Spring helper for authentic stop-motion jitter
  const steppedSpring = (delay: number, damping = 12, stiffness = 130) => {
    const s = spring({ frame: Math.max(0, frame - delay), fps: 12, config: { damping, stiffness } });
    return Math.round(s * 20) / 20; // quantize values to eliminate subpixel smoothness
  };

  // Phase Timing:
  // Phase 1 (0..110): Paper card drops from above with kraft tape affixing it
  // Phase 2 (110..220): Three cardboard cutout badges unfold with hand-stamped ink
  // Phase 3 (220..330): Metric slider made of paper rule with torn marker indicator
  // Phase 4 (330..450): Big red wax/paper stamp slams down: "تأییدیه ۱۰۰٪ فیزیکی"

  const card1Progress = steppedSpring(10, 10, 110);
  const card1Y = interpolate(card1Progress, [0, 1], [-600, 0]);
  const card1Rot = interpolate(card1Progress, [0, 1], [14, -1.8]);

  const badgeProgress = steppedSpring(115, 11, 120);
  const metricProgress = steppedSpring(225, 12, 110);
  const stampProgress = steppedSpring(335, 8, 160);
  const stampScale = interpolate(stampProgress, [0, 0.7, 1], [3.2, 0.95, 1.0]);
  const stampOpacity = interpolate(stampProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <div
      style={{
        position: 'relative',
        width: STOP_MOTION_WIDTH,
        height: STOP_MOTION_HEIGHT,
        backgroundColor: '#EBE6DF',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* Studio Soundtrack: Ambient melodic pulse */}
      <Audio src={staticFile('music/Cipher2.mp3')} volume={0.8} />

      {/* Tactile Paper Texture specks & fibers */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          backgroundImage: `radial-gradient(#4a3e2d 1px, transparent 1px), radial-gradient(#8c7b64 1px, #EBE6DF 1px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0, 24px 24px',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle paper vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 160px rgba(70, 50, 25, 0.18)',
          pointerEvents: 'none',
        }}
      />

      {/* ================================================================= */}
      {/* MAIN CARDBOARD CUTOUT SLATE                                        */}
      {/* ================================================================= */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1380,
          height: 690,
          transform: `translate(-50%, calc(-50% + ${card1Y * 0.4}px)) rotate(${card1Rot * 0.7}deg) scale(${beatPulse.scalePulse})`,
          backgroundColor: '#FAF7F2',
          borderRadius: 10,
          border: '2px solid rgba(80, 65, 45, 0.25)',
          boxShadow: '0 25px 50px rgba(60, 45, 30, 0.16), 0 6px 12px rgba(60, 45, 30, 0.08)',
          padding: '34px 44px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Kraft Tape Top-Right */}
        <div
          style={{
            position: 'absolute',
            top: -12,
            right: 48,
            width: 130,
            height: 32,
            backgroundColor: 'rgba(212, 178, 126, 0.88)',
            transform: 'rotate(-3deg)',
            boxShadow: '0 2px 4px rgba(50, 35, 20, 0.2)',
            borderLeft: '2px dashed rgba(160, 130, 85, 0.5)',
            borderRight: '2px dashed rgba(160, 130, 85, 0.5)',
          }}
        />

        {/* Kraft Tape Top-Left */}
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: 54,
            width: 120,
            height: 30,
            backgroundColor: 'rgba(212, 178, 126, 0.85)',
            transform: 'rotate(4deg)',
            boxShadow: '0 2px 4px rgba(50, 35, 20, 0.2)',
            borderLeft: '2px dashed rgba(160, 130, 85, 0.5)',
            borderRight: '2px dashed rgba(160, 130, 85, 0.5)',
          }}
        />

        {/* Header Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              padding: '6px 18px',
              backgroundColor: '#D9534F',
              color: '#FFFFFF',
              borderRadius: 4,
              fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 800,
              boxShadow: '2px 2px 0px rgba(0,0,0,0.15)',
              transform: 'rotate(-1deg)',
            }}
          >
            {sanitizeForDisplay('روایت استاپ‌موشن دستی')}
          </div>
          <div
            style={{
              fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              color: '#7A6B56',
              fontWeight: 700,
            }}
          >
            {sanitizeForDisplay('نرخ فریم ۱۲ FPS • بافت طبیعی کاغذ کرافت')}
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ marginTop: 12 }}>
          <h1
            style={{
              fontSize: clampFontSize(50, 'heroTitle', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 950,
              color: '#2B231A',
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {sanitizeForDisplay('خلق هویت بصری ارگانیک و فیزیکی')}
          </h1>
          <p
            style={{
              fontSize: clampFontSize(22, 'body', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 600,
              color: '#5C4E3D',
              margin: '8px 0 0 0',
              lineHeight: 1.4,
              maxWidth: 980,
            }}
          >
            {sanitizeForDisplay('ترکیب برش‌های کاغذی لایه‌لایه، سایه‌های فیزیکی نرم و حس لمس‌شدنیِ یک کلاژ واقعی.')}
          </p>
        </div>

        {/* 3 Physical Cutout Feature Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginTop: 18,
            opacity: badgeProgress,
            transform: `translateY(${(1 - badgeProgress) * 20}px)`,
          }}
        >
          {[
            { num: '۰۱', title: 'بافت کاغذ فیبردار', desc: 'سایه‌اندازی طبیعی لایه‌ها روی بوم کرافت', color: '#FFFDF9' },
            { num: '۰۲', title: 'حرکت پلکانی ۱۲ فریم', desc: 'ریتم اصیل انیمیشن دستی بدون یکنواختی دیجیتال', color: '#F7F3EB' },
            { num: '۰۳', title: 'چسب و استامپ جوهری', desc: 'جزئیات ارگانیک نوار چسب و مهرهای برجسته', color: '#FFFDF9' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: item.color,
                borderRadius: 6,
                padding: '16px 22px',
                border: '1.5px dashed rgba(100, 80, 55, 0.35)',
                boxShadow: '0 6px 14px rgba(70, 50, 30, 0.08)',
                transform: `rotate(${idx === 1 ? '1deg' : idx === 2 ? '-1.2deg' : '0.6deg'})`,
              }}
            >
              <div
                style={{
                  fontSize: clampFontSize(20, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                  fontWeight: 900,
                  color: '#D9534F',
                }}
              >
                {item.num}
              </div>
              <div
                style={{
                  fontSize: clampFontSize(24, 'cardHeader', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                  fontWeight: 800,
                  color: '#2B231A',
                  marginTop: 4,
                }}
              >
                {sanitizeForDisplay(item.title)}
              </div>
              <div
                style={{
                  fontSize: clampFontSize(18, 'body', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                  fontWeight: 600,
                  color: '#6B5A46',
                  marginTop: 4,
                  lineHeight: 1.35,
                }}
              >
                {sanitizeForDisplay(item.desc)}
              </div>
            </div>
          ))}
        </div>

        {/* Paper Ruler Progress Metric */}
        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: '2px solid rgba(100, 80, 55, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: metricProgress,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#27AE60',
                boxShadow: '0 0 0 3px rgba(39, 174, 96, 0.25)',
              }}
            />
            <span
              style={{
                fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                fontWeight: 700,
                color: '#4A3E2D',
              }}
            >
              {sanitizeForDisplay('کالیبراسیون زاویه و فیزیک کاغذی: فعال')}
            </span>
          </div>

          <div
            style={{
              fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 800,
              color: '#8C775D',
            }}
          >
            {sanitizeForDisplay('ESTATE: ۷۰٪ مساحت امن کادر')}
          </div>
        </div>

        {/* Giant Red Ink Stamp (Phase 4 Slam) */}
        {frame >= 330 && (
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 36,
              transform: `scale(${stampScale}) rotate(-10deg)`,
              opacity: stampOpacity,
              border: '4px double #C0392B',
              borderRadius: 10,
              padding: '12px 28px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 6px 18px rgba(192, 57, 43, 0.25)',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            <div
              style={{
                color: '#C0392B',
                fontSize: clampFontSize(28, 'cardHeader', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                fontWeight: 950,
                letterSpacing: 1,
              }}
            >
              {sanitizeForDisplay('✓ تأیید اصالت ۱۰۰٪')}
            </div>
            <div
              style={{
                color: '#962D22',
                fontSize: clampFontSize(16, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              {sanitizeForDisplay('AUTHENTIC TACTILE COLLAGE')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
