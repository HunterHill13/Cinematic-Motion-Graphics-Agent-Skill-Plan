/**
 * ============================================================================
 * MASTER ARCHETYPE 7: TACTILE PAPER CRAFT & ARTISAN DESK MASTER
 * ============================================================================
 * 
 * Inspired by tactile paper-craft explainers, artisanal physical studio setups,
 * and high-craft stationery design:
 * - Rich artisan workbench with drafting cutting grid, wood pulp fibers, and directional warm studio lighting
 * - Physical desk artifacts: Hand-crafted wooden drafting pencil, aluminum sharpener with curled wood shavings,
 *   crumpled paper ball, steel paperclip, and pinned torn kraft scrap
 * - Multi-layer paper slate with genuine crumpled creases & origami fold lines (کاغذ چروک‌خورده و له‌شده)
 * - Pure 30 FPS smooth physics-driven motion (no unnatural frame stuttering)
 * - Physical kraft tape strips with translucent adhesive highlights
 * - Hand-stamped seal badges and organic physical warmth
 * - Zero digital gloss, zero artificial glow - 100% tangible physical papercraft
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Audio, staticFile } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { clampFontSize } from '../../typography/responsiveTypography';
import { TactilePaperDeskBackdrop, CrumpledPaperCreaseOverlay } from '../library/TactilePaperDeskBackdrop';

export const STOP_MOTION_DURATION = 450; // 15.0s @ 30 FPS
export const STOP_MOTION_FPS = 30;
export const STOP_MOTION_WIDTH = 1920;
export const STOP_MOTION_HEIGHT = 1080;

export const StopMotionPaperMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Natural physical beat pulse: Exact 150 BPM tempo matching Cipher2.mp3
  // 150 BPM @ 30 FPS = exactly 12 frames per quarter note, 24 frames per half-time snare/kick hit
  const beatPulse = calculateBeatPulse(frame, 150, fps, 0.006);

  // Smooth 30 FPS Organic Physics Springs snapped to musical downbeats
  const card1Progress = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const card1Y = interpolate(card1Progress, [0, 1], [-700, 0]);
  const card1Rot = interpolate(card1Progress, [0, 1], [10, -1.2]);

  const badgeProgress = spring({
    frame: Math.max(0, frame - 108),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const metricProgress = spring({
    frame: Math.max(0, frame - 216),
    fps,
    config: { damping: 15, stiffness: 115 },
  });

  const stampProgress = spring({
    frame: Math.max(0, frame - 324),
    fps,
    config: { damping: 11, stiffness: 150 },
  });
  const stampScale = interpolate(stampProgress, [0, 0.7, 1], [3.0, 0.95, 1.0]);
  const stampOpacity = interpolate(stampProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <div
      style={{
        position: 'relative',
        width: STOP_MOTION_WIDTH,
        height: STOP_MOTION_HEIGHT,
        backgroundColor: '#E4DDD2',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* Studio Soundtrack: Ambient acoustic melodic pulse */}
      <Audio src={staticFile('music/Cipher2.mp3')} volume={0.8} />

      {/* =================================================================== */}
      {/* 1. TACTILE CRAFT DESK BACKDROP (Pencil, Sharpener, Crumpled Ball)   */}
      {/* =================================================================== */}
      <TactilePaperDeskBackdrop />

      {/* =================================================================== */}
      {/* 2. UNDERLYING KRAFT PAPER BACKING SHEET (Multi-Layer Depth)         */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1390,
          height: 695,
          transform: `translate(-50%, calc(-50% + ${card1Y * 0.38}px)) rotate(${card1Rot * 0.4 + 1.8}deg) scale(${beatPulse.scalePulse})`,
          backgroundColor: '#D6C4AD',
          borderRadius: 8,
          border: '1.5px solid rgba(110, 85, 55, 0.3)',
          boxShadow: '0 28px 55px rgba(50, 32, 15, 0.22), 0 6px 14px rgba(50, 32, 15, 0.1)',
          pointerEvents: 'none',
        }}
      >
        {/* Subtle fiber grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.25,
            backgroundImage: `radial-gradient(#5a422b 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* =================================================================== */}
      {/* 3. MAIN CARDBOARD & COTTON PAPER SLATE                              */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1380,
          height: 690,
          transform: `translate(-50%, calc(-50% + ${card1Y * 0.4}px)) rotate(${card1Rot * 0.6}deg) scale(${beatPulse.scalePulse})`,
          backgroundColor: '#FAF7F2',
          borderRadius: 10,
          border: '2px solid rgba(90, 70, 45, 0.22)',
          boxShadow: '0 25px 50px rgba(50, 35, 20, 0.18), 0 6px 14px rgba(50, 35, 20, 0.08)',
          padding: '34px 44px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Real Crumpled Paper Creases & Origami Fold Lines */}
        <CrumpledPaperCreaseOverlay opacity={0.4} />

        {/* Kraft Tape Top-Right */}
        <div
          style={{
            position: 'absolute',
            top: -12,
            right: 56,
            width: 140,
            height: 34,
            backgroundColor: 'rgba(215, 182, 130, 0.88)',
            transform: 'rotate(-2.5deg)',
            boxShadow: '0 3px 6px rgba(50, 35, 20, 0.22)',
            borderLeft: '2px dashed rgba(150, 120, 75, 0.55)',
            borderRight: '2px dashed rgba(150, 120, 75, 0.55)',
            zIndex: 10,
          }}
        />

        {/* Kraft Tape Top-Left */}
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: 64,
            width: 130,
            height: 32,
            backgroundColor: 'rgba(215, 182, 130, 0.85)',
            transform: 'rotate(3.5deg)',
            boxShadow: '0 3px 6px rgba(50, 35, 20, 0.22)',
            borderLeft: '2px dashed rgba(150, 120, 75, 0.55)',
            borderRight: '2px dashed rgba(150, 120, 75, 0.55)',
            zIndex: 10,
          }}
        />

        {/* Header Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 2 }}>
          <div
            style={{
              padding: '6px 18px',
              backgroundColor: '#D9534F',
              color: '#FFFFFF',
              borderRadius: 4,
              fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 800,
              boxShadow: '2px 3px 0px rgba(80,30,25,0.2)',
              transform: 'rotate(-1deg)',
            }}
          >
            {sanitizeForDisplay('روایت کلاژ و پیپرکرافت دستی')}
          </div>
          <div
            style={{
              fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              color: '#7A6B56',
              fontWeight: 700,
            }}
          >
            {sanitizeForDisplay('بافت فیزیکی کاغذ کرافت • چین‌وچروک و خطوط تای اوریگامی')}
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ marginTop: 12, position: 'relative', zIndex: 2 }}>
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
            {sanitizeForDisplay('ترکیب برش‌های کاغذی لایه‌لایه، خطوط تای اوریگامی و حس لمس‌شدنیِ یک میز کار هنری واقعی.')}
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
            position: 'relative',
            zIndex: 2,
          }}
        >
          {[
            { num: '۰۱', title: 'بافت کاغذ فیبردار و چروک', desc: 'سایه‌اندازی طبیعی لایه‌ها و خطوط تای فیزیکی', color: '#FFFDF9' },
            { num: '۰۲', title: 'خطوط تای هندسی و چروک', desc: 'برش‌های دقیق زوایا و تاشدگی‌های ظریف کاغذ', color: '#F7F3EB' },
            { num: '۰۳', title: 'کلاژ لایه‌لایه و نوارچسب', desc: 'ترکیب فیزیکی کاغذ کرافت و چسب‌های مات', color: '#FFFDF9' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: item.color,
                borderRadius: 6,
                padding: '16px 22px',
                border: '1.5px dashed rgba(100, 80, 55, 0.35)',
                boxShadow: '0 8px 18px rgba(70, 50, 30, 0.1)',
                transform: `rotate(${idx === 1 ? '1deg' : idx === 2 ? '-1.2deg' : '0.6deg'})`,
                position: 'relative',
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
            borderTop: '2px solid rgba(100, 80, 55, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: metricProgress,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#27AE60',
                boxShadow: `0 0 0 ${3 + beatPulse.lightPulse * 4}px rgba(39, 174, 96, 0.25)`,
                transition: 'box-shadow 0.1s ease',
              }}
            />
            <span
              style={{
                fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                fontWeight: 700,
                color: '#4A3E2D',
              }}
            >
              {sanitizeForDisplay('سینک موسیقیایی ۱۵۰ BPM • تپش هماهنگ با بیت')}
            </span>
          </div>

          {/* Dynamic Papercraft Audio Waveform Stream */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 26, padding: '0 16px' }}>
            {Array.from({ length: 18 }).map((_, i) => {
              const phase = (frame / 12) * Math.PI * 0.5 + i * 0.45;
              const barHeight = Math.max(4, Math.sin(phase) * 9 + 11 + beatPulse.lightPulse * 8);
              return (
                <div
                  key={i}
                  style={{
                    width: 3.5,
                    height: barHeight,
                    backgroundColor: i % 2 === 0 ? '#D9534F' : '#7A6B56',
                    borderRadius: 2,
                    opacity: 0.75 + (i % 3) * 0.08,
                  }}
                />
              );
            })}
          </div>

          <div
            style={{
              fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 800,
              color: '#8C775D',
              fontFamily: 'monospace',
            }}
          >
            TEMPO: 150 BPM // 30 FPS
          </div>
        </div>

        {/* Giant Red Ink Stamp (Phase 4 Slam) */}
        {frame >= 320 && (
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 36,
              transform: `scale(${stampScale}) rotate(-9deg)`,
              opacity: stampOpacity,
              border: '4px double #C0392B',
              borderRadius: 10,
              padding: '12px 28px',
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              boxShadow: '0 8px 24px rgba(192, 57, 43, 0.3)',
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
              {sanitizeForDisplay('✓ تأیید اصالت ۱۰۰٪ فیزیکی')}
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
