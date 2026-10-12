/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 3: CONTINUOUS UI MORPH MASTER (SINGLE-ELEMENT DRIBBBLE POLISH)
 * ============================================================================
 *
 * Inspired by @TheGrootDev motion prompt (yihui-dev/awesome-opus5-5-videos):
 * - One persistent central container that never cuts on an Open 3D Canvas
 * - Open-Canvas SVG Orbital Rings & Animated strokeDashoffset Energy Conduits
 * - Smoothly morphs from button -> circular loader -> interactive card -> stat chart -> confirmation pill
 * - Independent staggered spring entrances & continuous floating micro-motion for all stage children
 * - Subtle Videolancer Ultimate SFX via UniversalSoundDirector (<= 0.12 gain, zero CSS transitions)
 * ============================================================================
 */

import React from 'react';
import { interpolate, interpolateColors, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { InteractiveCursor } from '../library/InteractiveCursor';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';

export const CONTINUOUS_UI_DURATION = 450; // 15.0s @ 30 FPS
export const CONTINUOUS_UI_FPS = 30;
export const CONTINUOUS_UI_WIDTH = 1920;
export const CONTINUOUS_UI_HEIGHT = 1080;

export const ContinuousUiMorphMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Morphing Container Dimensions & Radii
  const containerWidth = Math.round(
    interpolate(
      frame,
      [0, 80, 110, 170, 200, 260, 290, 360, 390, 440],
      [320, 320, 180, 180, 980, 980, 1260, 1260, 380, 320],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0, 1) }
    )
  );

  const containerHeight = Math.round(
    interpolate(
      frame,
      [0, 80, 110, 170, 200, 260, 290, 360, 390, 440],
      [80, 80, 180, 180, 520, 520, 600, 600, 80, 80],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0, 1) }
    )
  );

  const containerRadius = Math.round(
    interpolate(
      frame,
      [0, 80, 110, 170, 200, 260, 290, 360, 390, 440],
      [40, 40, 90, 90, 24, 24, 24, 24, 40, 40],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    )
  );

  // Frame-accurate interpolated background color (Zero CSS transition)
  const containerBg = interpolateColors(
    frame,
    [0, 80, 92, 178, 192, 450],
    ['#0f172a', '#0f172a', '#3b82f6', '#3b82f6', '#ffffff', '#ffffff']
  );

  // Button recoil on click at frame 75
  const clickRecoil = interpolate(frame, [72, 75, 82], [1.0, 0.92, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera depth breathing
  const camZ = Math.round(
    interpolate(
      frame,
      [0, 80, 180, 280, 380, 450],
      [0, 60, -40, 80, -30, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
    )
  );

  // Spinner rotation in phase 2
  const spinnerRotation = interpolate(frame, [90, 180], [0, 540], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Open-canvas conduit draw animation
  const conduitOffset = Math.round(
    interpolate(frame, [0, 90, 185, 280, 370, 450], [720, 360, 0, 240, 0, 180], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const microFloatY = (idx: number, amp = 6) =>
    Math.round(Math.sin((frame + idx * 18) * 0.05) * amp);

  return (
    <div
      style={{
        position: 'relative',
        width: CONTINUOUS_UI_WIDTH,
        height: CONTINUOUS_UI_HEIGHT,
        backgroundColor: '#090d1e',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. SUBTLE STUDIO AUDIO VIA UNIVERSAL SOUND DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Tech_Live.mp3"
        bgmVolume={0.14}
        themeId="CONTINUOUS_UI_MORPH"
      />

      {/* 2. DEDICATED ARCHITECTURAL STUDIO MESH GLASS BACKDROP (ZERO CORNER HUD CLUTTER) */}
      <StudioMeshGlassBackdrop
        camX={0}
        camY={0}
        camZ={camZ}
        primaryLightColor="#6366f1"
        accentGlowColor="#a855f7"
      />

      {/* 3. OPEN-CANVAS 1440x760 SPATIAL FIELD WITH ORBITAL RINGS & CONDUITS */}
      <div
        style={{
          position: 'relative',
          width: 1440,
          height: 760,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Open-Canvas SVG Orbital Rings & Energy Conduits Around the Morphing Actor */}
        <svg
          width={1440}
          height={760}
          viewBox="0 0 1440 760"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
        >
          <circle
            cx={720}
            cy={380}
            r={340}
            fill="none"
            stroke="rgba(99, 102, 241, 0.32)"
            strokeWidth={1.6}
            strokeDasharray="18 14"
            strokeDashoffset={Math.round(-frame * 1.9)}
          />
          <circle
            cx={720}
            cy={380}
            r={430}
            fill="none"
            stroke="rgba(168, 85, 247, 0.22)"
            strokeWidth={1.2}
            strokeDasharray="10 20"
            strokeDashoffset={Math.round(frame * 1.4)}
          />
          <path
            d="M 120 380 C 420 120, 1020 640, 1320 380"
            fill="none"
            stroke="#818cf8"
            strokeWidth={2}
            strokeDasharray={720}
            strokeDashoffset={conduitOffset}
            strokeOpacity={0.45}
          />
          <circle cx={120} cy={380} r={6} fill="#6366f1" opacity={0.75} />
          <circle cx={1320} cy={380} r={6} fill="#a855f7" opacity={0.75} />
        </svg>

        {/* THE SINGLE PERSISTENT MORPHING HERO ACTOR */}
        <div
          style={{
            width: containerWidth,
            height: containerHeight,
            borderRadius: containerRadius,
            backgroundColor: containerBg,
            border: frame < 185 ? 'none' : '2px solid #e2e8f0',
            boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.28), 0 0 50px rgba(99, 102, 241, 0.22)',
            transform: `translate3d(0px, ${microFloatY(0, 4)}px, ${camZ}px) scale(${clickRecoil * (1 + beatPulse.scalePulse * 0.4)})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            direction: 'rtl',
          }}
        >
          {/* STATE 1: CTA BUTTON (0..85) */}
          {frame < 85 && (() => {
            const iconSpring = spring({ frame: Math.max(0, frame - 0 * 8), fps, config: { damping: 13, stiffness: 120 } });
            const labelSpring = spring({ frame: Math.max(0, frame - 1 * 8), fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffffff', fontSize: 20, fontWeight: 900 }}>
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translate3d(0px, ${Math.round((1 - iconSpring) * 16 + microFloatY(1, 3))}px, 0px) scale(${iconSpring})`,
                    opacity: iconSpring,
                  }}
                >
                  ▶
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translate3d(0px, ${Math.round((1 - labelSpring) * 18 + microFloatY(2, 3))}px, 0px) scale(${labelSpring})`,
                    opacity: labelSpring,
                  }}
                >
                  {sanitizeForDisplay('آغاز اسکن هوشمند')}
                </span>
              </div>
            );
          })()}

          {/* STATE 2: SCANNER LOADER (85..185) */}
          {frame >= 85 && frame < 185 && (() => {
            const stageStart = 85;
            const ringSpring = spring({ frame: Math.max(0, frame - stageStart - 0 * 8), fps, config: { damping: 13, stiffness: 120 } });
            const boltSpring = spring({ frame: Math.max(0, frame - stageStart - 1 * 8), fps, config: { damping: 12, stiffness: 130 } });
            return (
              <div
                style={{
                  position: 'relative',
                  width: 90,
                  height: 90,
                  transform: `translate3d(0px, ${Math.round((1 - ringSpring) * 20 + microFloatY(1, 4))}px, 0px) scale(${ringSpring})`,
                  opacity: ringSpring,
                }}
              >
                <svg width={90} height={90} style={{ transform: `rotate(${spinnerRotation}deg)` }}>
                  <circle cx={45} cy={45} r={36} fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth={8} />
                  <circle
                    cx={45}
                    cy={45}
                    r={36}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={8}
                    strokeDasharray={180}
                    strokeDashoffset={60}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: 20,
                    fontWeight: 900,
                    transform: `translate3d(0px, ${microFloatY(2, 3)}px, 0px) scale(${boltSpring})`,
                    opacity: boltSpring,
                  }}
                >
                  ⚡
                </div>
              </div>
            );
          })()}

          {/* STATE 3: INTERACTIVE CONTROLS CARD (185..280) */}
          {frame >= 185 && frame < 280 && (() => {
            const stageStart = 185;
            const headSpring = spring({ frame: Math.max(0, frame - stageStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const sliderSpring = spring({ frame: Math.max(0, frame - stageStart - 1 * 8), fps, config: { damping: 14, stiffness: 115 } });
            const controlMetrics = [
              { label: 'تأخیر پاسخ', value: '۱.۴ میلی‌ثانیه', color: '#0f172a' },
              { label: 'پایداری اتصال', value: '۱۰۰٪ پایدار', color: '#10b981' },
            ];

            return (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '40px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transform: `translate3d(0px, ${Math.round((1 - headSpring) * 24 + microFloatY(0, 4))}px, 0px) scale(${headSpring})`,
                    opacity: headSpring,
                  }}
                >
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>
                    {sanitizeForDisplay('تنظیمات پارامتریک و دقت مدل')}
                  </span>
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      background: '#ecfdf5',
                      color: '#059669',
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    {sanitizeForDisplay('وضعیت: فعال')}
                  </span>
                </div>

                {/* Slider Mockup */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - sliderSpring) * 26 + microFloatY(1, 4))}px, 0px) scale(${sliderSpring})`,
                    opacity: sliderSpring,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 12,
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#475569',
                    }}
                  >
                    <span>{sanitizeForDisplay('حداکثر توان پردازش موازی')}</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#2563eb' }}>98.5%</span>
                  </div>
                  <div style={{ height: 16, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
                    <div
                      style={{
                        width: `${Math.min(98, (frame - 185) * 2.2)}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14 }}>
                  {controlMetrics.map((metric, idx) => (
                    <div
                      key={metric.label}
                      style={{
                        flex: 1,
                        padding: 16,
                        background: '#f8fafc',
                        borderRadius: 12,
                        border: '1px solid #e2e8f0',
                        textAlign: 'center',
                        transform: `translate3d(0px, ${Math.round(
                          (1 - spring({ frame: Math.max(0, frame - stageStart - 16 - idx * 8), fps, config: { damping: 14, stiffness: 120 } })) * 28 +
                            Math.sin((frame + idx * 18) * 0.05) * 6
                        )}px, 0px)`,
                        opacity: spring({ frame: Math.max(0, frame - stageStart - 16 - idx * 8), fps, config: { damping: 14, stiffness: 120 } }),
                      }}
                    >
                      <span style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>{sanitizeForDisplay(metric.label)}</span>
                      <p style={{ margin: '4px 0 0 0', fontSize: 20, fontWeight: 900, color: metric.color }}>
                        {sanitizeForDisplay(metric.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* STATE 4: STAT CHART & TELEMETRY (280..370) */}
          {frame >= 280 && frame < 370 && (() => {
            const stageStart = 280;
            const titleSpring = spring({ frame: Math.max(0, frame - stageStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const chartBars = [
              { label: 'هفته ۱', val: 65, col: '#94a3b8' },
              { label: 'هفته ۲', val: 78, col: '#38bdf8' },
              { label: 'هفته ۳', val: 92, col: '#3b82f6' },
              { label: 'هفته جاری', val: 99, col: '#10b981' },
            ];

            return (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  padding: '40px 48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#0f172a',
                    transform: `translate3d(0px, ${Math.round((1 - titleSpring) * -22 + microFloatY(0, 4))}px, 0px) scale(${titleSpring})`,
                    opacity: titleSpring,
                  }}
                >
                  {sanitizeForDisplay('تحلیل ترافیک و بازدهی سامانه')}
                </span>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 280, paddingBottom: 16 }}>
                  {chartBars.map((bar, idx) => (
                    <div
                      key={bar.label}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        width: 88,
                        transform: `translate3d(0px, ${Math.round(
                          (1 - spring({ frame: Math.max(0, frame - stageStart - 6 - idx * 8), fps, config: { damping: 13, stiffness: 120 } })) * 32 +
                            Math.sin((frame + idx * 18) * 0.05) * 6
                        )}px, 0px)`,
                        opacity: spring({ frame: Math.max(0, frame - stageStart - 6 - idx * 8), fps, config: { damping: 13, stiffness: 120 } }),
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 900, color: bar.col }}>{bar.val}٪</span>
                      <div
                        style={{
                          width: '100%',
                          height: Math.round(
                            (bar.val / 100) *
                              190 *
                              spring({ frame: Math.max(0, frame - stageStart - 6 - idx * 8), fps, config: { damping: 13, stiffness: 120 } })
                          ),
                          background: bar.col,
                          borderRadius: 10,
                          boxShadow: '0 8px 16px rgba(0,0,0,0.06)',
                        }}
                      />
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#64748b' }}>{sanitizeForDisplay(bar.label)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* STATE 5: CONFIRMATION TOAST & RESET (370..450) */}
          {frame >= 370 && (() => {
            const stageStart = 370;
            const checkSpring = spring({ frame: Math.max(0, frame - stageStart - 0 * 8), fps, config: { damping: 12, stiffness: 130 } });
            const textSpring = spring({ frame: Math.max(0, frame - stageStart - 1 * 8), fps, config: { damping: 14, stiffness: 120 } });

            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#ffffff', fontSize: 18, fontWeight: 900 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translate3d(0px, ${Math.round((1 - checkSpring) * 16 + microFloatY(1, 3))}px, 0px) scale(${checkSpring})`,
                    opacity: checkSpring,
                  }}
                >
                  ✔
                </div>
                <span
                  style={{
                    color: '#0f172a',
                    transform: `translate3d(0px, ${Math.round((1 - textSpring) * 18 + microFloatY(2, 3))}px, 0px) scale(${textSpring})`,
                    opacity: textSpring,
                  }}
                >
                  {sanitizeForDisplay('عملیات با موفقیت تأیید شد')}
                </span>
              </div>
            );
          })()}
        </div>
      </div>

      {/* 4. INTERACTIVE CURSOR INTERACTING WITH THE MORPHING ELEMENT */}
      <InteractiveCursor
        startFrame={30}
        clickFrame={75}
        endFrame={130}
        targetX={960}
        targetY={540}
      />
    </div>
  );
};
