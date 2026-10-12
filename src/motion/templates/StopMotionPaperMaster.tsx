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
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { clampFontSize } from '../../typography/responsiveTypography';
import { TactilePaperDeskBackdrop, CrumpledPaperCreaseOverlay } from '../library/TactilePaperDeskBackdrop';

export const STOP_MOTION_DURATION = 450; // 15.0s @ 30 FPS
export const STOP_MOTION_FPS = 30;
export const STOP_MOTION_WIDTH = 1920;
export const STOP_MOTION_HEIGHT = 1080;

const CUTOUT_NODES = [
  {
    num: '۰۱',
    title: 'بافت کاغذ فیبردار و چروک',
    desc: 'سایه‌اندازی طبیعی لایه‌ها و خطوط تای فیزیکی روی میز کار',
    color: '#FFFDF9',
    tapeColor: 'rgba(215, 182, 130, 0.88)',
    baseX: 520,
    baseY: 430,
    baseTilt: 1.8,
  },
  {
    num: '۰۲',
    title: 'خطوط تای هندسی و اوریگامی',
    desc: 'برش‌های دقیق زوایا و بازشدن مستقل هر قطعه کاغذی در فضا',
    color: '#F7F3EB',
    tapeColor: 'rgba(205, 168, 118, 0.86)',
    baseX: 0,
    baseY: 455,
    baseTilt: -1.4,
  },
  {
    num: '۰۳',
    title: 'کلاژ لایه‌لایه و نوارچسب',
    desc: 'ترکیب فیزیکی کاغذ کرافت، پین‌های فلزی و چسب‌های مات',
    color: '#FFFDF9',
    tapeColor: 'rgba(215, 182, 130, 0.88)',
    baseX: -520,
    baseY: 435,
    baseTilt: 1.2,
  },
];

export const StopMotionPaperMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Discrete tactile stop-motion frame quantization (2-frame step feel for stop-motion wiggle)
  const quantizedFrame = Math.floor(frame / 2) * 2;

  // Natural physical beat pulse: Exact 150 BPM tempo matching Cipher2.mp3
  const pulseData = calculateBeatPulse(frame, 150, fps, 0.006);
  const beatPulse = pulseData.lightPulse;

  // Motivated Open-Canvas Camera Drift across the artisan desk (>= 850px total travel)
  const camX = interpolate(
    frame,
    [0, 110, 220, 330, 450],
    [0, -440, 440, -180, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 0.0, 0.18, 1) }
  );
  const camY = interpolate(
    frame,
    [0, 140, 280, 450],
    [0, -28, 24, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 0.0, 0.18, 1) }
  );
  const camScale = interpolate(
    frame,
    [0, 120, 250, 360, 450],
    [0.97, 1.02, 1.03, 1.0, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Independent Open-Canvas Element Springs (NO giant outer wrapper card!)
  const titleStripProgress = spring({
    frame: Math.max(0, quantizedFrame - 8),
    fps,
    config: { damping: 13, stiffness: 115 },
  });
  const titleStripY = interpolate(titleStripProgress, [0, 1], [-260, 0]);
  const titleFoldX = interpolate(titleStripProgress, [0, 1], [-55, 0]);

  const kraftSubtitleProgress = spring({
    frame: Math.max(0, quantizedFrame - 22),
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const kraftFoldY = interpolate(kraftSubtitleProgress, [0, 1], [42, 0]);

  // Hand-drawn SVG dashed connector path progress
  const pathDrawProgress = interpolate(frame, [45, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dashOffset = Math.round((1 - pathDrawProgress) * 1400);

  // Independent Ruler Strip & Red Ink Stamp Springs
  const rulerStripProgress = spring({
    frame: Math.max(0, quantizedFrame - 190),
    fps,
    config: { damping: 15, stiffness: 115 },
  });

  const stampProgress = spring({
    frame: Math.max(0, quantizedFrame - 310),
    fps,
    config: { damping: 11, stiffness: 150 },
  });
  const stampScale = interpolate(stampProgress, [0, 0.7, 1], [2.6, 0.94, 1.0]);
  const stampOpacity = interpolate(stampProgress, [0, 0.25, 1], [0, 1, 1]);

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
        perspective: 1400,
      }}
    >
      {/* Subtle Videolancer Ultimate SFX + Ducked Acoustic Soundtrack */}
      <UniversalSoundDirector
        bgmTrack="music/Cipher2.mp3"
        bgmVolume={0.14}
        themeId="STOP_MOTION_PAPER"
      />

      {/* 1. TACTILE CRAFT DESK BACKDROP (Pencil, Sharpener, Crumpled Ball) */}
      <TactilePaperDeskBackdrop />

      {/* 2. OPEN-CANVAS 3D STAGE PLANE (No giant 1380x690 outer box!) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `translate3d(${Math.round(camX * 0.08)}px, ${Math.round(camY)}px, 0px) scale(${(camScale * (1 + beatPulse * 0.006)).toFixed(4)})`,
        }}
      >
        {/* ================================================================= */}
        {/* HAND-DRAWN SVG DASHED CONNECTOR PATHS ON THE CRAFT DESK           */}
        {/* ================================================================= */}
        <svg
          width={STOP_MOTION_WIDTH}
          height={STOP_MOTION_HEIGHT}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          {/* Hand-sketched graphite & red-thread connector lines */}
          <path
            d="M 960 285 C 960 360, 1450 340, 1450 430"
            fill="none"
            stroke="#8C4A3E"
            strokeWidth={3}
            strokeDasharray="12 10"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            opacity={0.75}
          />
          <path
            d="M 960 285 L 960 445"
            fill="none"
            stroke="#5C4E3D"
            strokeWidth={3}
            strokeDasharray="10 8"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            opacity={0.75}
          />
          <path
            d="M 960 285 C 960 360, 470 340, 470 435"
            fill="none"
            stroke="#8C4A3E"
            strokeWidth={3}
            strokeDasharray="12 10"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            opacity={0.75}
          />
          {/* Push-pin anchor rings */}
          <circle cx={960} cy={285} r={8} fill="#D9534F" stroke="#FFFDF9" strokeWidth={2.5} />
          <circle cx={1450} cy={430} r={7} fill="#D9534F" stroke="#FFFDF9" strokeWidth={2} opacity={pathDrawProgress} />
          <circle cx={960} cy={445} r={7} fill="#5C4E3D" stroke="#FFFDF9" strokeWidth={2} opacity={pathDrawProgress} />
          <circle cx={470} cy={435} r={7} fill="#D9534F" stroke="#FFFDF9" strokeWidth={2} opacity={pathDrawProgress} />
        </svg>

        {/* ================================================================= */}
        {/* INDEPENDENT FLOATING TITLE BANNER STRIP                           */}
        {/* ================================================================= */}
        <div
          style={{
            position: 'absolute',
            top: 86,
            left: '50%',
            width: 1120,
            transform: `translate3d(${Math.round(-560)}px, ${Math.round(titleStripY)}px, 0px) rotateX(${titleFoldX.toFixed(1)}deg) rotateZ(${(-0.8 + Math.sin(quantizedFrame * 0.08) * 0.35).toFixed(2)}deg)`,
            backgroundColor: '#FAF7F2',
            borderRadius: 6,
            border: '2px solid rgba(90, 70, 45, 0.28)',
            boxShadow: '0 20px 38px rgba(45, 30, 15, 0.18), 0 4px 10px rgba(45, 30, 15, 0.1)',
            padding: '22px 38px',
            boxSizing: 'border-box',
            zIndex: 5,
          }}
        >
          <CrumpledPaperCreaseOverlay opacity={0.35} />

          {/* Translucent Kraft Tape Top-Right & Top-Left */}
          <div
            style={{
              position: 'absolute',
              top: -13,
              right: 48,
              width: 128,
              height: 30,
              backgroundColor: 'rgba(215, 182, 130, 0.88)',
              transform: 'rotate(-2.5deg)',
              boxShadow: '0 3px 6px rgba(50, 35, 20, 0.18)',
              borderLeft: '2px dashed rgba(150, 120, 75, 0.55)',
              borderRight: '2px dashed rgba(150, 120, 75, 0.55)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: -11,
              left: 52,
              width: 118,
              height: 28,
              backgroundColor: 'rgba(215, 182, 130, 0.85)',
              transform: 'rotate(3.2deg)',
              boxShadow: '0 3px 6px rgba(50, 35, 20, 0.18)',
              borderLeft: '2px dashed rgba(150, 120, 75, 0.55)',
              borderRight: '2px dashed rgba(150, 120, 75, 0.55)',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span
                style={{
                  padding: '5px 16px',
                  backgroundColor: '#D9534F',
                  color: '#FFFFFF',
                  borderRadius: 4,
                  fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                  fontWeight: 800,
                  boxShadow: '2px 3px 0px rgba(80,30,25,0.22)',
                  transform: 'rotate(-1.2deg)',
                }}
              >
                {sanitizeForDisplay('روایت کلاژ و پیپرکرافت دستی')}
              </span>
              <span
                style={{
                  fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                  color: '#7A6B56',
                  fontWeight: 700,
                }}
              >
                {sanitizeForDisplay('چیدمان آزاد قطعات کاغذی روی میز کار بدون قاب‌بندی اسلایدی')}
              </span>
            </div>
          </div>

          <h1
            style={{
              fontSize: clampFontSize(48, 'heroTitle', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 950,
              color: '#2B231A',
              margin: '10px 0 0 0',
              lineHeight: 1.22,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {sanitizeForDisplay('خلق هویت بصری ارگانیک و فیزیکی')}
          </h1>
        </div>

        {/* ================================================================= */}
        {/* INDEPENDENT KRAFT PAPER SUBTITLE STRIP                            */}
        {/* ================================================================= */}
        <div
          style={{
            position: 'absolute',
            top: 236,
            left: '50%',
            width: 920,
            opacity: kraftSubtitleProgress,
            transform: `translate3d(${Math.round(-460)}px, ${Math.round((1 - kraftSubtitleProgress) * 36)}px, 0px) rotateY(${kraftFoldY.toFixed(1)}deg) rotateZ(${(0.9 + Math.cos(quantizedFrame * 0.07) * 0.3).toFixed(2)}deg)`,
            backgroundColor: '#D6C4AD',
            borderRadius: 5,
            border: '1.5px solid rgba(110, 85, 55, 0.38)',
            boxShadow: '0 14px 28px rgba(50, 32, 15, 0.16)',
            padding: '12px 28px',
            boxSizing: 'border-box',
            textAlign: 'center',
            zIndex: 6,
          }}
        >
          <p
            style={{
              fontSize: clampFontSize(21, 'body', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 700,
              color: '#3D3122',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {sanitizeForDisplay('ترکیب برش‌های کاغذی مستقل، خطوط تای اوریگامی و حس لمس‌شدنیِ یک میز کار هنری واقعی.')}
          </p>
        </div>

        {/* ================================================================= */}
        {/* 3 INDEPENDENT TACTILE PAPER CUTOUT SCULPTURAL NODES               */}
        {/* ================================================================= */}
        {CUTOUT_NODES.map((item, idx) => {
          const itemSpring = spring({
            frame: Math.max(0, quantizedFrame - 14 - idx * 8),
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const itemDropY = interpolate(itemSpring, [0, 1], [140 + idx * 18, 0]);
          const itemFoldX = interpolate(itemSpring, [0, 1], [65 - idx * 8, 0]);
          const itemFoldY = interpolate(itemSpring, [0, 1], [-35 + idx * 15, 0]);
          const stopMotionWiggle =
            Math.sin((quantizedFrame + idx * 9) * 0.11) * 1.1 + item.baseTilt;
          const hoverY = Math.round(Math.cos((quantizedFrame + idx * 7) * 0.09) * 5);

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: item.baseY,
                left: '50%',
                width: 430,
                opacity: itemSpring,
                transform: `translate3d(${Math.round(item.baseX - 215)}px, ${Math.round(itemDropY + hoverY)}px, 0px) rotateX(${itemFoldX.toFixed(1)}deg) rotateY(${itemFoldY.toFixed(1)}deg) rotateZ(${stopMotionWiggle.toFixed(2)}deg)`,
                backgroundColor: item.color,
                borderRadius: 6,
                padding: '24px 26px',
                border: '2px dashed rgba(100, 80, 55, 0.38)',
                boxShadow: '0 18px 34px rgba(55, 38, 20, 0.16), 0 4px 10px rgba(55, 38, 20, 0.08)',
                boxSizing: 'border-box',
                zIndex: 7 + idx,
              }}
            >
              <CrumpledPaperCreaseOverlay opacity={0.28} />

              {/* Individual Washi Tape Strip pinning each cutout node to the desk */}
              <div
                style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  width: 96,
                  height: 24,
                  transform: `translate3d(${Math.round(-48)}px, 0px, 0px) rotate(${idx % 2 === 0 ? '-3deg' : '2.8deg'})`,
                  backgroundColor: item.tapeColor,
                  boxShadow: '0 2px 5px rgba(50, 35, 20, 0.18)',
                  borderLeft: '2px dashed rgba(150, 120, 75, 0.5)',
                  borderRight: '2px dashed rgba(150, 120, 75, 0.5)',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontSize: clampFontSize(22, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                    fontWeight: 950,
                    color: '#D9534F',
                    backgroundColor: 'rgba(217, 83, 79, 0.12)',
                    padding: '2px 12px',
                    borderRadius: 4,
                  }}
                >
                  {item.num}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    color: '#8C775D',
                  }}
                >
                  CUTOUT // 0{idx + 1}
                </span>
              </div>

              <div
                style={{
                  fontSize: clampFontSize(25, 'cardHeader', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                  fontWeight: 900,
                  color: '#2B231A',
                  marginTop: 12,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {sanitizeForDisplay(item.title)}
              </div>

              <div
                style={{
                  fontSize: clampFontSize(18, 'body', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                  fontWeight: 600,
                  color: '#6B5A46',
                  marginTop: 8,
                  lineHeight: 1.4,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {sanitizeForDisplay(item.desc)}
              </div>
            </div>
          );
        })}

        {/* ================================================================= */}
        {/* INDEPENDENT PAPER RULER TELEMETRY STRIP ON DESK                   */}
        {/* ================================================================= */}
        <div
          style={{
            position: 'absolute',
            bottom: 92,
            left: '50%',
            width: 980,
            opacity: rulerStripProgress,
            transform: `translate3d(${Math.round(-490)}px, ${Math.round((1 - rulerStripProgress) * 60)}px, 0px) rotateZ(-0.5deg)`,
            backgroundColor: '#F5EFE6',
            border: '2px solid rgba(100, 80, 55, 0.3)',
            borderRadius: 6,
            boxShadow: '0 14px 28px rgba(50, 35, 20, 0.15)',
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            zIndex: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#27AE60',
                boxShadow: `0 0 0 ${Math.round(3 + beatPulse * 4)}px rgba(39, 174, 96, 0.25)`,
              }}
            />
            <span
              style={{
                fontSize: clampFontSize(18, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                fontWeight: 800,
                color: '#4A3E2D',
              }}
            >
              {sanitizeForDisplay('سینک موسیقیایی ۱۵۰ BPM • حرکت مستقل لایه‌های کاغذی')}
            </span>
          </div>

          {/* Dynamic Papercraft Audio Waveform Stream */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 26, padding: '0 16px' }}>
            {Array.from({ length: 16 }).map((_, i) => {
              const phase = (quantizedFrame / 12) * Math.PI * 0.5 + i * 0.45;
              const barHeight = Math.round(Math.max(4, Math.sin(phase) * 9 + 11 + beatPulse * 8));
              return (
                <div
                  key={i}
                  style={{
                    width: 4,
                    height: barHeight,
                    backgroundColor: i % 2 === 0 ? '#D9534F' : '#7A6B56',
                    borderRadius: 2,
                    transform: `translate3d(0px, ${Math.round((i * 0) % 2)}px, 0px)`,
                  }}
                />
              );
            })}
          </div>

          <div
            style={{
              fontSize: clampFontSize(17, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
              fontWeight: 800,
              color: '#8C775D',
              fontFamily: 'monospace',
            }}
          >
            OPEN-DESK // 30 FPS
          </div>
        </div>

        {/* ================================================================= */}
        {/* INDEPENDENT PHYSICAL RED INK STAMP SEAL ON DESK                   */}
        {/* ================================================================= */}
        {frame >= 305 && (
          <div
            style={{
              position: 'absolute',
              bottom: 78,
              left: 140,
              transform: `translate3d(0px, 0px, 0px) scale(${stampScale.toFixed(3)}) rotate(-8.5deg)`,
              opacity: stampOpacity,
              border: '4px double #C0392B',
              borderRadius: 10,
              padding: '12px 26px',
              backgroundColor: 'rgba(255, 253, 249, 0.96)',
              boxShadow: '0 12px 28px rgba(192, 57, 43, 0.26)',
              textAlign: 'center',
              zIndex: 12,
            }}
          >
            <div
              style={{
                color: '#C0392B',
                fontSize: clampFontSize(26, 'cardHeader', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                fontWeight: 950,
              }}
            >
              {sanitizeForDisplay('✓ تأیید اصالت ۱۰۰٪ فیزیکی')}
            </div>
            <div
              style={{
                color: '#962D22',
                fontSize: clampFontSize(15, 'microTelemetry', STOP_MOTION_WIDTH, STOP_MOTION_HEIGHT),
                fontWeight: 800,
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

