/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 9: NEO-BRUTALIST HIGH-CONTRAST MASTER (BOLD RETRO-MODERN)
 * ============================================================================
 *
 * Open-Canvas Radical High-Contrast Neo-Brutalism:
 * - Pure Open-Canvas High-Voltage Space (Zero outer slide box, zero top marquee strip)
 * - Acid yellow background (#FFE600) with retro half-tone dot grid
 * - Skewed high-contrast black/magenta title slabs slamming directly onto the canvas
 * - Open-Canvas SVG Geometric Crosshairs & Animated strokeDashoffset Conduits
 * - Independent staggered spring entrances & continuous floating micro-motion per block
 * - Subtle Videolancer Ultimate SFX via UniversalSoundDirector (<= 0.12 gain)
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { clampFontSize } from '../../typography/responsiveTypography';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';

export const NEO_BRUTALIST_DURATION = 450; // 15.0s @ 30 FPS
export const NEO_BRUTALIST_FPS = 30;
export const NEO_BRUTALIST_WIDTH = 1920;
export const NEO_BRUTALIST_HEIGHT = 1080;

export const NeoBrutalistMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Dynamic Camera Drift (Motivated camera grammar)
  const camX = interpolate(
    frame,
    [0, 110, 220, 330, 450],
    [0, -24, 26, -18, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );
  const camY = interpolate(
    frame,
    [0, 140, 280, 450],
    [0, 18, -20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  // Staggered Springs for Open-Canvas Elements
  const badgeSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 12, stiffness: 140 } });
  const titleSpring = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 13, stiffness: 125 } });
  const subSpring = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14, stiffness: 110 } });
  const conduitProgress = interpolate(frame, [25, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Stamp Slam Spring at frame 330
  const stampSpring = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 10, stiffness: 160 } });
  const stampScale = interpolate(stampSpring, [0, 0.7, 1], [3.2, 0.92, 1.0]);
  const stampRot = interpolate(stampSpring, [0, 1], [-25, 6]);

  const microFloatY = (idx: number, amp = 5) =>
    Math.round(Math.sin((frame + idx * 16) * 0.055) * amp);

  const brutalistCards = [
    {
      badge: 'ماژول ۱: تایپوگرافی سخت',
      title: 'فونت‌های بولد و بدون انعطاف',
      desc: 'حروف سنگین با ضخامت حداکثری و حاشیه‌های برش‌خورده ۴ پیکسلی.',
      metric: 'وزن ۹۵۰ · ULTRA-BLACK',
      accent: '#000000',
      bg: '#ffffff',
      textColor: '#000000',
    },
    {
      badge: 'ماژول ۲: سایه‌های سخت',
      title: 'سایه بدون بلور ۱۲ پیکسلی',
      desc: 'زاویه ۴۵ درجه خالص بدون محوشدگی؛ عمق فیزیکی قطعی و ملموس.',
      metric: 'OFFSET: 12px 12px #000',
      accent: '#ff3366',
      bg: '#ffffff',
      textColor: '#000000',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: NEO_BRUTALIST_WIDTH,
        height: NEO_BRUTALIST_HEIGHT,
        backgroundColor: '#ffe600',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* 1. SUBTLE STUDIO AUDIO VIA UNIVERSAL SOUND DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Cipher2.mp3"
        bgmVolume={0.14}
        themeId="NEO_BRUTALIST"
      />

      {/* 2. ACID HALF-TONE DOT MATRIX BACKGROUND */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px',
          opacity: 0.14,
          pointerEvents: 'none',
        }}
      />

      {/* 3. OPEN-CANVAS 3D NEO-BRUTALIST STAGE (ZERO OUTER SLIDE BOX, ZERO TOP MARQUEE) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate3d(${Math.round(camX)}px, ${Math.round(camY)}px, 0px) scale(${1 + beatPulse.lightPulse * 0.008})`,
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 1440,
            height: 760,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '30px 40px',
            boxSizing: 'border-box',
          }}
        >
          {/* Open-Canvas Brutalist Geometric Crosshairs & Laser Energy Lines */}
          <svg
            width={1440}
            height={760}
            viewBox="0 0 1440 760"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
          >
            {/* Top connecting bar */}
            <line
              x1={40}
              y1={120}
              x2={1400}
              y2={120}
              stroke="#000000"
              strokeWidth={4}
              strokeDasharray="1440"
              strokeDashoffset={Math.round((1 - conduitProgress) * 1440)}
            />
            {/* Geometric diamond accent */}
            <rect
              x={1380}
              y={110}
              width={20}
              height={20}
              fill="#ff3366"
              stroke="#000000"
              strokeWidth={3}
              transform="rotate(45 1390 120)"
            />
            {/* Diagonal brutalist slash line */}
            <line
              x1={120}
              y1={520}
              x2={1320}
              y2={520}
              stroke="#000000"
              strokeWidth={3}
              strokeDasharray="16 12"
              strokeDashoffset={Math.round(-frame * 2.5)}
            />
          </svg>

          {/* Top Header Eyebrow Badges */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transform: `translate3d(0px, ${Math.round((1 - badgeSpring) * -30 + microFloatY(0))}px, 0px)`,
              opacity: badgeSpring,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#000000',
                color: '#ffe600',
                padding: '8px 24px',
                fontSize: clampFontSize(20, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                fontWeight: 950,
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                transform: 'rotate(-2deg)',
              }}
            >
              {sanitizeForDisplay('⚡ سبک نئوبروتالیسم پرقدرت')}
            </div>

            <div
              style={{
                padding: '8px 22px',
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                fontSize: clampFontSize(18, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                fontWeight: 900,
              }}
            >
              {sanitizeForDisplay('کنتراست حداکثری: ۱۰۰٪ فعال')}
            </div>
          </div>

          {/* Hero Headline Area */}
          <div style={{ marginTop: 14 }}>
            <h1
              style={{
                fontSize: clampFontSize(54, 'heroTitle', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                fontWeight: 950,
                color: '#000000',
                margin: 0,
                lineHeight: 1.25,
                transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 32 + microFloatY(1))}px, 0px)`,
                opacity: titleSpring,
              }}
            >
              {sanitizeForDisplay('برندسازی با وضوح و جسارت بی‌رحمانه')}
            </h1>

            <p
              style={{
                fontSize: clampFontSize(22, 'body', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                fontWeight: 800,
                color: '#1a1a1a',
                margin: '10px 0 0 0',
                lineHeight: 1.45,
                maxWidth: 1040,
                transform: `translate3d(0px, ${Math.round((1 - subSpring) * 26 + microFloatY(2))}px, 0px)`,
                opacity: subSpring,
              }}
            >
              {sanitizeForDisplay('حذف کامل سایه‌های محو؛ خطوط ضخیم مشکی و سایه‌های سخت ۱۲ پیکسلی که چشم‌ها را میخکوب می‌کند.')}
            </p>
          </div>

          {/* 2 Staggered Heavy Neo-Brutalist Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 28,
              marginTop: 22,
            }}
          >
            {brutalistCards.map((card, idx) => {
              const cardSpring = spring({
                frame: Math.max(0, frame - 35 - idx * 10),
                fps,
                config: { damping: 13, stiffness: 125 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: card.bg,
                    border: '4px solid #000000',
                    boxShadow: '10px 10px 0px #000000',
                    padding: '26px 32px',
                    position: 'relative',
                    opacity: cardSpring,
                    transform: `translate3d(0px, ${Math.round((1 - cardSpring) * 40 + microFloatY(idx + 3))}px, 0px)`,
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: card.accent,
                      color: card.accent === '#000000' ? '#ffe600' : '#ffffff',
                      padding: '4px 14px',
                      fontSize: clampFontSize(16, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                      fontWeight: 900,
                      marginBottom: 10,
                      border: '2px solid #000000',
                    }}
                  >
                    {sanitizeForDisplay(card.badge)}
                  </div>
                  <h3
                    style={{
                      fontSize: clampFontSize(28, 'cardHeader', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                      fontWeight: 950,
                      color: card.textColor,
                      margin: '6px 0 10px 0',
                    }}
                  >
                    {sanitizeForDisplay(card.title)}
                  </h3>
                  <p
                    style={{
                      fontSize: clampFontSize(18, 'body', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                      fontWeight: 700,
                      color: '#333333',
                      margin: '0 0 16px 0',
                      lineHeight: 1.4,
                    }}
                  >
                    {sanitizeForDisplay(card.desc)}
                  </p>
                  <div
                    style={{
                      fontSize: clampFontSize(16, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
                      fontFamily: 'monospace',
                      fontWeight: 900,
                      color: '#000000',
                      borderTop: '2px solid #000000',
                      paddingTop: 8,
                      direction: 'ltr',
                      textAlign: 'right',
                    }}
                  >
                    {card.metric}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Staggered Slamming Starburst Stamp */}
          {frame >= 310 && (
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 36,
                transform: `scale(${stampScale}) rotate(${stampRot}deg)`,
                backgroundColor: '#ff3366',
                color: '#ffffff',
                border: '4px solid #000000',
                boxShadow: '8px 8px 0px #000000',
                padding: '14px 28px',
                textAlign: 'center',
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: clampFontSize(32, 'cardHeader', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 950 }}>
                {sanitizeForDisplay('۱۰۰٪ تضمینی')}
              </div>
              <div style={{ fontSize: clampFontSize(16, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 900, marginTop: 2 }}>
                MAXIMUM IMPACT VERIFIED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
