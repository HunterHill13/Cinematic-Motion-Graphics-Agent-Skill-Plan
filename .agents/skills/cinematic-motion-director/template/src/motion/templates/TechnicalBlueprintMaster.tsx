/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 8: TECHNICAL BLUEPRINT MASTER (CAD SCHEMATIC ANIMATION)
 * ============================================================================
 *
 * Authentic Architectural & Mechanical Blueprint Open Canvas:
 * - Pure Open-Canvas CAD Drafting Space (Zero corner watermarks or outer box wrappers)
 * - Laser cyan coordinate grid with dynamic drafting crosshairs
 * - Open-Canvas SVG Animated strokeDashoffset dimension conduits & rotating wireframe gears
 * - Independent staggered spring entrances & continuous floating micro-motion per module
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

export const BLUEPRINT_DURATION = 450; // 15.0s @ 30 FPS
export const BLUEPRINT_FPS = 30;
export const BLUEPRINT_WIDTH = 1920;
export const BLUEPRINT_HEIGHT = 1080;

export const TechnicalBlueprintMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Dynamic CAD Drafting Camera Drift
  const camX = interpolate(
    frame,
    [0, 110, 220, 330, 450],
    [0, 18, -22, 14, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );
  const camY = interpolate(
    frame,
    [0, 140, 280, 450],
    [0, -16, 18, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  // Staggered Springs for Open-Canvas Elements
  const headerSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 14, stiffness: 115 } });
  const titleSpring = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 14, stiffness: 110 } });
  const subSpring = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 14, stiffness: 105 } });
  const conduitProgress = interpolate(frame, [20, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lockProgress = spring({ frame: Math.max(0, frame - 310), fps, config: { damping: 11, stiffness: 140 } });

  const microFloatY = (idx: number, amp = 5) =>
    Math.round(Math.sin((frame + idx * 16) * 0.055) * amp);

  const blueprintModules = [
    { tag: 'SECTION A-A', title: 'شبکه خط‌کش برداری CAD', val: '۱۹۲۰ × ۱۰۸۰ px', metric: 'دقت ۱۰۰٪ برداری', color: '#00e5ff' },
    { tag: 'SECTION B-B', title: 'تله‌متری فرکانسی کوانتایز', val: '۱۲۴.۰۰ BPM', metric: 'سینک دقیق ضرباهنگ', color: '#38bdf8' },
    { tag: 'SECTION C-C', title: 'ضریب اطمینان تنش سازه', val: 'k = ۱.۴۵', metric: 'پایداری ساختاری', color: '#00e5ff' },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: BLUEPRINT_WIDTH,
        height: BLUEPRINT_HEIGHT,
        backgroundColor: '#020d1a',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* 1. SUBTLE STUDIO AUDIO VIA UNIVERSAL SOUND DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Cipher2.mp3"
        bgmVolume={0.14}
        themeId="TECHNICAL_BLUEPRINT"
      />

      {/* 2. PROCEDURAL CAD DRAFTING GRID BACKDROP */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.18) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.18) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '180px 180px',
        }}
      />
      {/* Studio Workbench Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(2, 24, 48, 0.4) 0%, rgba(1, 8, 16, 0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. OPEN-CANVAS 3D CAD SCHEMATIC FIELD (ZERO OUTER BOX WRAPPER, ZERO CORNER CROSSHAIRS) */}
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
          {/* Open-Canvas SVG CAD Alignment Beams & Dynamic Caliper Rings */}
          <svg
            width={1440}
            height={760}
            viewBox="0 0 1440 760"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
          >
            {/* Horizontal dimension beam */}
            <line
              x1={40}
              y1={130}
              x2={1400}
              y2={130}
              stroke="rgba(0, 229, 255, 0.45)"
              strokeWidth={1.5}
              strokeDasharray="1440"
              strokeDashoffset={Math.round((1 - conduitProgress) * 1440)}
            />
            {/* Dimension calipers at ends */}
            <line x1={40} y1={118} x2={40} y2={142} stroke="#00e5ff" strokeWidth={2} opacity={conduitProgress} />
            <line x1={1400} y1={118} x2={1400} y2={142} stroke="#00e5ff" strokeWidth={2} opacity={conduitProgress} />

            {/* Rotating CAD Gear / Rotor Wireframe */}
            <g transform={`translate(1260, 320) rotate(${Math.round(frame * 0.8)})`}>
              <circle cx={0} cy={0} r={110} fill="none" stroke="rgba(0, 229, 255, 0.3)" strokeWidth={1.5} strokeDasharray="12 8" />
              <circle cx={0} cy={0} r={70} fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth={1.2} />
              <line x1={-110} y1={0} x2={110} y2={0} stroke="rgba(0, 229, 255, 0.3)" strokeWidth={1} />
              <line x1={0} y1={-110} x2={0} y2={110} stroke="rgba(0, 229, 255, 0.3)" strokeWidth={1} />
            </g>

            {/* Connecting Diagonal Laser Conduits */}
            <path
              d="M 120 540 C 440 460, 960 460, 1320 540"
              fill="none"
              stroke="#00e5ff"
              strokeWidth={2}
              strokeDasharray="1200"
              strokeDashoffset={Math.round((1 - conduitProgress) * 1200)}
              strokeOpacity={0.4}
            />
          </svg>

          {/* Top Technical Drafting Eyebrow Strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0, 229, 255, 0.3)',
              paddingBottom: 14,
              transform: `translate3d(0px, ${Math.round((1 - headerSpring) * -24 + microFloatY(0))}px, 0px)`,
              opacity: headerSpring,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: '#00e5ff',
                  boxShadow: '0 0 10px #00e5ff',
                }}
              />
              <span
                style={{
                  fontSize: clampFontSize(18, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                  fontWeight: 800,
                  color: '#00e5ff',
                  letterSpacing: 1,
                }}
              >
                {sanitizeForDisplay('نقشه مهندسی و بلوپرینت محاسباتی')}
              </span>
            </div>

            <div
              style={{
                fontFamily: 'monospace',
                fontSize: clampFontSize(16, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                color: 'rgba(0, 229, 255, 0.85)',
                direction: 'ltr',
              }}
            >
              SYS.REV: 5.5-CAD // TOLERANCE: ±0.01mm
            </div>
          </div>

          {/* Blueprint Hero Title Area */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontSize: clampFontSize(18, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                fontWeight: 700,
                color: 'rgba(0, 229, 255, 0.8)',
                marginBottom: 6,
                transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 18 + microFloatY(1))}px, 0px)`,
                opacity: titleSpring,
              }}
            >
              {sanitizeForDisplay('بخش اول: معماری مقیاس‌پذیر سیستم‌های محاسباتی')}
            </div>

            <h1
              style={{
                fontSize: clampFontSize(52, 'heroTitle', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                fontWeight: 950,
                color: '#f0fdfa',
                margin: 0,
                lineHeight: 1.25,
                textShadow: '0 0 25px rgba(0, 229, 255, 0.35)',
                transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 26 + microFloatY(2))}px, 0px)`,
                opacity: titleSpring,
              }}
            >
              {sanitizeForDisplay('طراحی دقیق و محاسباتی بلوپرینت')}
            </h1>

            <p
              style={{
                fontSize: clampFontSize(22, 'body', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                fontWeight: 600,
                color: '#94a3b8',
                margin: '8px 0 0 0',
                lineHeight: 1.45,
                maxWidth: 1040,
                transform: `translate3d(0px, ${Math.round((1 - subSpring) * 24 + microFloatY(3))}px, 0px)`,
                opacity: subSpring,
              }}
            >
              {sanitizeForDisplay('تراز خطوط ایزومتریک، پایش داده‌های ابعادی و کالیبراسیون بدون خطای مؤلفه‌های زیرساخت.')}
            </p>
          </div>

          {/* 3 Staggered Isometric Dimension Modules */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 22,
            }}
          >
            {blueprintModules.map((item, idx) => {
              const moduleSpring = spring({
                frame: Math.max(0, frame - 35 - idx * 9),
                fps,
                config: { damping: 13, stiffness: 120 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(4, 28, 54, 0.75)',
                    border: '1px solid rgba(0, 229, 255, 0.4)',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 229, 255, 0.1)',
                    padding: '18px 24px',
                    position: 'relative',
                    opacity: moduleSpring,
                    transform: `translate3d(0px, ${Math.round((1 - moduleSpring) * 36 + microFloatY(idx + 4))}px, 0px)`,
                  }}
                >
                  {/* Glowing Corner tick */}
                  <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, backgroundColor: '#00e5ff', boxShadow: '0 0 8px #00e5ff' }} />
                  <div
                    style={{
                      fontSize: clampFontSize(16, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                      fontFamily: 'monospace',
                      color: 'rgba(0, 229, 255, 0.75)',
                    }}
                  >
                    {item.tag}
                  </div>
                  <div
                    style={{
                      fontSize: clampFontSize(24, 'cardHeader', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                      fontWeight: 900,
                      color: '#ffffff',
                      marginTop: 6,
                    }}
                  >
                    {sanitizeForDisplay(item.title)}
                  </div>
                  <div
                    style={{
                      fontSize: clampFontSize(28, 'cardHeader', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                      fontWeight: 950,
                      fontFamily: 'monospace',
                      color: item.color,
                      margin: '6px 0',
                    }}
                  >
                    {item.val}
                  </div>
                  <div
                    style={{
                      fontSize: clampFontSize(16, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                      color: '#67e8f9',
                      fontWeight: 700,
                    }}
                  >
                    {sanitizeForDisplay(item.metric)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Staggered Engineering Approval Seal Stamp */}
          {frame >= 290 && (
            <div
              style={{
                position: 'absolute',
                bottom: 30,
                left: 40,
                transform: `scale(${lockProgress}) translate3d(0px, ${microFloatY(7, 3)}px, 0px)`,
                border: '2px solid #00e5ff',
                padding: '10px 22px',
                backgroundColor: 'rgba(4, 25, 48, 0.95)',
                boxShadow: '0 0 25px rgba(0, 229, 255, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                zIndex: 10,
              }}
            >
              <div style={{ width: 12, height: 12, backgroundColor: '#00e5ff', transform: 'rotate(45deg)' }} />
              <div>
                <div
                  style={{
                    fontSize: clampFontSize(22, 'cardHeader', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                    fontWeight: 900,
                    color: '#ffffff',
                  }}
                >
                  {sanitizeForDisplay('تأییدیه مهندسی CAD')}
                </div>
                <div
                  style={{
                    fontSize: clampFontSize(16, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                    fontFamily: 'monospace',
                    color: '#00e5ff',
                    direction: 'ltr',
                  }}
                >
                  APPROVED // ZERO TOLERANCE ERR
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
