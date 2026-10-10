/**
 * ============================================================================
 * MASTER ARCHETYPE 9: NEO-BRUTALIST HIGH-VOLTAGE
 * ============================================================================
 * 
 * Inspired by modern high-voltage neo-brutalist tech posters and viral punch designs:
 * - High-voltage acid yellow (#FFE600) on stark solid black (#000000)
 * - Heavy architectural borders (4px solid #000000)
 * - Hard, crisp unblurred offset drop shadows (12px 12px 0px #000000)
 * - Aggressive spring slams with kinetic overshoot and sticker slap snaps
 * - Massive 950-weight Yekan Bakh typography with zero hesitation
 * - High-energy, loud, confident, and impossible to ignore
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Audio, staticFile } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { clampFontSize } from '../../typography/responsiveTypography';

export const NEO_BRUTALIST_DURATION = 450; // 15.0s @ 30 FPS
export const NEO_BRUTALIST_FPS = 30;
export const NEO_BRUTALIST_WIDTH = 1920;
export const NEO_BRUTALIST_HEIGHT = 1080;

export const NeoBrutalistMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Phase Timing:
  // Phase 1 (0..110): Mega Acid Slab slams from top with heavy overshoot
  // Phase 2 (110..220): Dual contrasting cards pop into place with 12px hard offset shadows
  // Phase 3 (220..330): Kinetic ticker tape and percentage blocks snap
  // Phase 4 (330..450): Big 100% Starburst Stamp seal slams into the corner

  const slamProgress = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 11, stiffness: 140 } });
  const card1Y = interpolate(slamProgress, [0, 0.7, 1], [-800, 20, 0]);

  const cardsProgress = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12, stiffness: 130 } });
  const tickerProgress = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 13, stiffness: 120 } });
  const stampProgress = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 9, stiffness: 160 } });

  const stampScale = interpolate(stampProgress, [0, 0.7, 1], [3.5, 0.9, 1.0]);
  const stampRot = interpolate(stampProgress, [0, 1], [45, -8]);

  return (
    <div
      style={{
        position: 'relative',
        width: NEO_BRUTALIST_WIDTH,
        height: NEO_BRUTALIST_HEIGHT,
        backgroundColor: '#FFE600',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* Studio Soundtrack: High-voltage Tech Beat */}
      <Audio src={staticFile('music/Tech_Live.mp3')} volume={0.8} />

      {/* Halftone / Dot Grid background for authentic brutalist poster feel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      />

      {/* Top Warning Marquee Strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          backgroundColor: '#000000',
          color: '#FFE600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          fontSize: clampFontSize(24, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
          fontWeight: 900,
          letterSpacing: 2,
          borderBottom: '4px solid #000000',
        }}
      >
        <span>⚡ HIGH-VOLTAGE ARCHITECTURE</span>
        <span>///</span>
        <span>۱۰۰٪ قدرت و کنتراست رادیکال</span>
        <span>///</span>
        <span>ZERO WEAK DESIGNS ⚡</span>
      </div>

      {/* ================================================================= */}
      {/* MAIN NEO-BRUTALIST SLATE                                           */}
      {/* ================================================================= */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          width: 1320,
          minHeight: 640,
          transform: `translate(-50%, calc(-50% + ${card1Y}px)) scale(${beatPulse.scalePulse})`,
          backgroundColor: '#FFFFFF',
          border: '5px solid #000000',
          boxShadow: '16px 16px 0px #000000',
          padding: 56,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Header Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#000000',
              color: '#FFE600',
              padding: '10px 28px',
              fontSize: clampFontSize(26, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
              fontWeight: 950,
              border: '3px solid #000000',
              transform: 'rotate(-2deg)',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.3)',
            }}
          >
            {sanitizeForDisplay('سبک نئوبروتالیسم پرقدرت')}
          </div>

          <div
            style={{
              padding: '8px 20px',
              backgroundColor: '#FFE600',
              color: '#000000',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0px #000000',
              fontSize: clampFontSize(24, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
              fontWeight: 900,
            }}
          >
            {sanitizeForDisplay('کنتراست حداکثری: فعال')}
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ marginTop: 24 }}>
          <h1
            style={{
              fontSize: clampFontSize(84, 'heroTitle', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
              fontWeight: 950,
              color: '#000000',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {sanitizeForDisplay('برندسازی با وضوح و جسارت بی‌رحمانه')}
          </h1>
          <p
            style={{
              fontSize: clampFontSize(34, 'body', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT),
              fontWeight: 700,
              color: '#222222',
              margin: '18px 0 0 0',
              lineHeight: 1.45,
              maxWidth: 1040,
            }}
          >
            {sanitizeForDisplay('حذف کامل سایه‌های تار و شیشه‌های محو؛ خطوط ضخیم مشکی و سایه‌های سخت ۱۲ پیکسلی که چشم‌ها را میخکوب می‌کند.')}
          </p>
        </div>

        {/* 2 Heavy Dual Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 28,
            marginTop: 36,
            opacity: cardsProgress,
            transform: `translateY(${(1 - cardsProgress) * 40}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFE600',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px #000000',
              padding: 24,
            }}
          >
            <div style={{ fontSize: clampFontSize(36, 'cardHeader', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 950, color: '#000000' }}>
              {sanitizeForDisplay('۱. خوانایی فوق‌العاده در موبایل')}
            </div>
            <div style={{ fontSize: clampFontSize(26, 'body', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 700, color: '#111111', marginTop: 10 }}>
              {sanitizeForDisplay('حتی در کوچک‌ترین اندازه نمایشگرها، حروف قطور و پررنگ بدون افت کیفیت دیده می‌شوند.')}
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#00E5FF',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px #000000',
              padding: 24,
            }}
          >
            <div style={{ fontSize: clampFontSize(36, 'cardHeader', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 950, color: '#000000' }}>
              {sanitizeForDisplay('۲. ضرب‌آهنگ محکم و قاطع')}
            </div>
            <div style={{ fontSize: clampFontSize(26, 'body', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 700, color: '#111111', marginTop: 10 }}>
              {sanitizeForDisplay('ترکیب شوک بصری با پالس‌های ریتمیک ۱۲۴ BPM برای ویدیوهای تبلیغاتی و کمپین‌ها.')}
            </div>
          </div>
        </div>

        {/* Bottom Ticker Bar */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTop: '4px solid #000000',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: tickerProgress,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 18, height: 18, backgroundColor: '#000000' }} />
            <span style={{ fontSize: clampFontSize(26, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 900, color: '#000000' }}>
              {sanitizeForDisplay('مساحت ایمن کادر: ۷۲٪ استاندارد طلایی')}
            </span>
          </div>

          <div style={{ fontSize: clampFontSize(28, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 950, color: '#000000' }}>
            {sanitizeForDisplay('READY TO DEPLOY ///')}
          </div>
        </div>

        {/* Big Brutalist Starburst Stamp Slam */}
        {frame >= 330 && (
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              left: 40,
              transform: `scale(${stampScale}) rotate(${stampRot}deg)`,
              backgroundColor: '#FF3366',
              color: '#FFFFFF',
              border: '5px solid #000000',
              boxShadow: '10px 10px 0px #000000',
              padding: '18px 36px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: clampFontSize(44, 'cardHeader', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 950 }}>
              {sanitizeForDisplay('۱۰۰٪ تضمینی')}
            </div>
            <div style={{ fontSize: clampFontSize(22, 'microTelemetry', NEO_BRUTALIST_WIDTH, NEO_BRUTALIST_HEIGHT), fontWeight: 800, marginTop: 4 }}>
              MAXIMUM IMPACT VERIFIED
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
