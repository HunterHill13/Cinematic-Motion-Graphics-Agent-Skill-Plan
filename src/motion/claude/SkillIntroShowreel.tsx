/**
 * ============================================================================
 * SKILL INTRO SHOWREEL (60-SECOND CINEMATIC MASTERPIECE)
 * ============================================================================
 * 
 * 60.0s (1800 frames @ 30 FPS) One-Take Showcase introducing the skill:
 * 1. Palette: Deep Emerald & Cyber Gold (Scientific & AI Research Aesthetic)
 * 2. 6-DOF Virtual Camera tracking across 4 narrative acts without any stage wipe.
 * 3. Topological SVG Path Morphing & Trigonometric Lissajous Parametric Orbit.
 * 4. 2.5D Isometric SaaS Glass Console with Living Telemetry Waveform Stream.
 * 5. Two-Stage Persian Voice Narration with Dynamic Sidechain BGM Ducking.
 * 6. Beat-Grid Quantization (124 BPM) & Studio-Normalized Remotion/Kenney SFX.
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, Sequence, staticFile } from 'remotion';
import { AtmosphericBackdrop } from '../library/AtmosphericBackdrop';
import { PersianVectorMorphCard } from '../recipes/PersianVectorMorphRecipe';
import { InteractiveCursor } from '../library/InteractiveCursor';
import { ForegroundBokehLayer } from '../library/ForegroundBokehLayer';
import { LissajousOrbit, ParametricWaveformStream } from '../library/ProceduralGenerativeMotifs';
import { quantizeToBeat } from '../audio/SemanticMusicDirector';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { loadYekanBakhFonts } from '../../fonts/yekanBakh';
import { CURATED_COLOR_PALETTES } from '../visual_world/colorPaletteGate';
import { APPROVED_ART_STYLES, ArtStyleDefinition, quantizeFrameForStopMotion } from '../visual_world/artStyleGate';
import { deriveAtmosphere } from '../visual_world/AtmosphereThemeDeriver';

if (typeof window !== 'undefined') {
  loadYekanBakhFonts().catch((e) => console.warn('Font load warning:', e));
}

export const SKILL_INTRO_DURATION = 1800; // 60.0s @ 30 FPS
export const SKILL_INTRO_FPS = 30;
export const SKILL_INTRO_WIDTH = 1920;
export const SKILL_INTRO_HEIGHT = 1080;

const PALETTE = CURATED_COLOR_PALETTES.biotech_medical[0]; // Deep Emerald & Cyber Gold

export const SkillIntroShowreelContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // GATE 0.6: ACT-BY-ACT ART STYLE RESOLUTION & ATMOSPHERE DERIVATION
  // =========================================================================
  // Act 1 (0..330): MODERN_GLASSMORPHIC
  // Act 2 (330..720): STOP_MOTION_PAPER (Tactile paper cutout & 12fps judder)
  // Act 3 (720..1220): TECHNICAL_BLUEPRINT (CAD drafting grid & calipers)
  // Act 4 (1220..1800): NEO_BRUTALIST (High-voltage borders & 100% gold seal)
  let currentStyle: ArtStyleDefinition = APPROVED_ART_STYLES.MODERN_GLASSMORPHIC;
  if (frame >= 330 && frame < 720) {
    currentStyle = APPROVED_ART_STYLES.STOP_MOTION_PAPER;
  } else if (frame >= 720 && frame < 1220) {
    currentStyle = APPROVED_ART_STYLES.TECHNICAL_BLUEPRINT;
  } else if (frame >= 1220) {
    currentStyle = APPROVED_ART_STYLES.NEO_BRUTALIST;
  }

  const atmosphere = deriveAtmosphere(PALETTE, currentStyle);
  const stopMotionFrame = quantizeFrameForStopMotion(frame, 'stop_motion_12fps');

  // =========================================================================
  // 1. CONTINUOUS 6-DOF VIRTUAL CAMERA TRACKING
  // =========================================================================
  const camX = interpolate(
    frame,
    [0, 320, 360, 720, 760, 1200, 1260, 1800],
    [0, 0, 35, 35, -170, -170, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camY = interpolate(
    frame,
    [0, 320, 360, 720, 760, 1200, 1260, 1800],
    [0, 0, 15, 15, -25, -25, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camZ = interpolate(
    frame,
    [0, 320, 360, 720, 760, 1200, 1260, 1800],
    [0, 60, 130, 130, 90, 90, -85, -85],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camPitch = interpolate(
    frame,
    [0, 320, 360, 720, 760, 1200, 1260, 1800],
    [0, 2, 7, 7, -10, -10, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camYaw = interpolate(
    frame,
    [0, 320, 360, 720, 760, 1200, 1260, 1800],
    [0, 0, -4, -4, 15, 15, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Dynamic Dutch Roll on transitions
  const camRoll = interpolate(
    frame,
    [320, 350, 370, 710, 740, 770, 1210, 1245, 1280],
    [0, -2.6, 0, 0, 2.4, 0, 0, -2.1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // =========================================================================
  // 2. DYNAMIC AUDIO & DUCKING ENVELOPE (124 BPM Future Beats + Gemini Voice)
  // =========================================================================
  // Measured clean Google Gemini Audio segments:
  // Act 1: 30..260 (Voice 1, ~7.4s)
  // Act 2: 370..610 (Voice 2, ~7.9s)
  // Act 3: 770..980 (Voice 3, ~6.9s)
  // Act 4: 1260..1500 (Voice 4, ~7.7s)
  const isSpeaking =
    (frame >= 30 && frame <= 260) ||
    (frame >= 370 && frame <= 610) ||
    (frame >= 770 && frame <= 980) ||
    (frame >= 1260 && frame <= 1500);

  const baseBgm = isSpeaking ? 0.16 : 0.32;
  const currentBgmVolume = interpolate(
    frame,
    [0, 30, 1750, 1800],
    [0, baseBgm, baseBgm, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // =========================================================================
  // 3. ACT-SPECIFIC VISIBILITY & TRANSITION SPRINGS
  // =========================================================================
  const act1Opacity = interpolate(frame, [0, 30, 320, 360], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act2Visible = frame >= 330 && frame <= 780;
  const act2Opacity = interpolate(frame, [330, 365, 715, 770], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act3Visible = frame >= 720 && frame <= 1800;
  const act3Entrance = spring({
    fps,
    frame: frame - 720,
    config: { damping: 14, mass: 0.9, stiffness: 110 },
  });

  // Act 3 docks left when Act 4 appears (frame 1220)
  const saasDockX = interpolate(frame, [1220, 1270], [0, -380], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const saasDockScale = interpolate(frame, [1220, 1270], [1.0, 0.88], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act4Visible = frame >= 1220;
  const act4Spring = spring({
    fps,
    frame: frame - 1220,
    config: { damping: 13, mass: 0.85, stiffness: 120 },
  });

  const gaugeValue = Math.min(100, Math.floor(interpolate(frame, [1240, 1370], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })));

  // Button recoil on click at frame 220
  const isButtonClicked = frame >= 220 && frame < 240;
  const buttonScale = isButtonClicked
    ? spring({
        fps,
        frame: frame - 220,
        config: { damping: 10, mass: 0.4, stiffness: 220 },
      }) * 0.1 + 0.9
    : 1.0;

  return (
    <div
      style={{
        width: SKILL_INTRO_WIDTH,
        height: SKILL_INTRO_HEIGHT,
        background: atmosphere.backgroundCss,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'YekanBakh', 'Yekan Bakh', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        direction: 'rtl',
        transition: 'background 0.5s ease',
      }}
    >
      {/* 1. ATMOSPHERIC BACKDROP (HARMONIZED RADIUS & GRID) */}
      <AtmosphericBackdrop
        primaryGlowColor={atmosphere.radialGlow1.color}
        secondaryGlowColor={atmosphere.radialGlow2.color}
        showGrid={true}
        gridSpeed={0.6}
      />

      {/* 2. 6-DOF VIRTUAL CAMERA STAGE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 1920,
            height: 1080,
            transformStyle: 'preserve-3d',
            transform: `translate3d(${-camX}px, ${-camY}px, ${camZ}px) rotateX(${camPitch}deg) rotateY(${camYaw}deg) rotateZ(${camRoll}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ================================================================= */}
          {/* ACT 1: SOVEREIGN INTRO MONOLITH & INTERACTION (0..360)             */}
          {/* ================================================================= */}
          {frame < 365 && (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: act1Opacity,
                transform: 'translateZ(40px)',
              }}
            >
              {/* Badge Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 24px',
                  borderRadius: 999,
                  background: 'rgba(2, 44, 34, 0.75)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 0 24px rgba(16, 185, 129, 0.25)',
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 12px #10b981',
                  }}
                />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#ecfdf5' }}>
                  {sanitizeForDisplay('هوش مصنوعی پیشرفته · اسکیل موشن‌گرافیک سینمایی')}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: 58,
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: 0,
                  marginBottom: 16,
                  lineHeight: 1.25,
                  textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)',
                  background: 'linear-gradient(135deg, #ffffff 40%, #6ee7b7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {sanitizeForDisplay('کارگردانی سینمایی ویدیو در تراز کلاد اوپوس ۵.۵')}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: '#94a3b8',
                  maxWidth: 820,
                  margin: 0,
                  marginBottom: 40,
                  lineHeight: 1.6,
                }}
              >
                {sanitizeForDisplay('پایان اسلایدهای بی‌روح · انیمیشن پیوسته تک‌پلان با فیزیک اسپرینگ و طراحی صدای استودیویی')}
              </p>

              {/* Interactive Target Button */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 36px',
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(245, 158, 11, 0.15))',
                  border: '1.5px solid rgba(16, 185, 129, 0.45)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(16, 185, 129, 0.3)',
                  transform: `scale(${buttonScale})`,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#f59e0b',
                    boxShadow: '0 0 14px #f59e0b',
                  }}
                />
                <span style={{ fontSize: 18, fontWeight: 800, color: '#f0fdf4' }}>
                  {sanitizeForDisplay('ورود به استودیو سینمایی')}
                </span>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 2: STOP-MOTION PAPER CUTOUT & LISSAJOUS ORBIT (330..780)      */}
          {/* ================================================================= */}
          {act2Visible && (
            <div
              style={{
                position: 'absolute',
                opacity: act2Opacity,
                transform: `translateZ(50px) rotate(${Math.sin(stopMotionFrame * 0.15) * 0.6}deg)`,
                pointerEvents: 'none',
                filter: 'drop-shadow(6px 10px 0px rgba(2, 26, 20, 0.45)) drop-shadow(12px 18px 0px rgba(2, 26, 20, 0.2))',
              }}
            >
              {/* Paper Header Badge Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: -46,
                  right: 20,
                  background: '#f8faf5',
                  padding: '6px 18px',
                  borderRadius: 4,
                  border: '1.5px solid rgba(2, 26, 20, 0.6)',
                  boxShadow: '3px 3px 0px rgba(2, 26, 20, 0.6)',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#021a14',
                  zIndex: 2,
                }}
              >
                {sanitizeForDisplay('✂️ استاپ‌موشن برش کاغذ و کلاژ برداری (۱۲ FPS)')}
              </div>

              {/* Trigonometric Lissajous Orbit in Cyber Gold */}
              <svg
                width={740}
                height={380}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  overflow: 'visible',
                  pointerEvents: 'none',
                }}
              >
                <LissajousOrbit cx={370} cy={190} size={330} color="#f59e0b" glowColor="rgba(245, 158, 11, 0.45)" />
              </svg>
              <PersianVectorMorphCard
                startFrame={340}
                width={740}
                height={380}
                glowColor="#10b981"
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 3: TECHNICAL BLUEPRINT 2.5D ISOMETRIC CONSOLE (720..1800)     */}
          {/* ================================================================= */}
          {act3Visible && (
            <div
              style={{
                position: 'absolute',
                width: 780,
                height: 490,
                opacity: act3Entrance,
                transform: `translate3d(${saasDockX}px, 0px, 60px) scale(${saasDockScale})`,
                background: 'rgba(2, 22, 36, 0.92)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderRadius: 8,
                border: '1.5px solid rgba(6, 182, 212, 0.8)',
                boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(6, 182, 212, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                direction: 'rtl',
              }}
            >
              {/* CAD Blueprint Header */}
              <div
                style={{
                  height: 52,
                  borderBottom: '1px solid rgba(6, 182, 212, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 24px',
                  background: 'rgba(3, 30, 48, 0.65)',
                }}
              >
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#06b6d4' }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f0fdfa', letterSpacing: '0.02em' }}>
                  {sanitizeForDisplay('کنسول تله‌متری و تحلیل فضایی (نقشه فنی بلوپرینت)')}
                </div>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 8px #06b6d4' }} />
              </div>

              {/* Console Body */}
              <div style={{ flex: 1, padding: 24, display: 'flex', gap: 20 }}>
                {/* Metric Visualizer Area */}
                <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      height: 190,
                      background: 'rgba(1, 16, 28, 0.7)',
                      borderRadius: 6,
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      padding: 16,
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>+ CAD STABILITY METRIC</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#06b6d4' }}>+۹۹.۸٪ پایداری</span>
                    </div>

                    {/* Animated Sparkline */}
                    <svg width="100%" height="110" style={{ marginTop: 14 }}>
                      <path
                        d="M 10 90 Q 90 20 180 60 T 360 30"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        style={{ filter: 'drop-shadow(0 0 10px #06b6d4)' }}
                      />
                      <circle cx={180 + Math.sin(frame * 0.08) * 40} cy={50} r={6} fill="#f59e0b" style={{ filter: 'drop-shadow(0 0 8px #f59e0b)' }} />
                    </svg>
                  </div>

                  {/* Status Bar */}
                  <div
                    style={{
                      padding: '12px 18px',
                      background: 'rgba(3, 30, 48, 0.6)',
                      borderRadius: 6,
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 13, color: '#cbd5e1' }}>
                      {sanitizeForDisplay('وضعیت سیستم: آماده‌باش تولید سینمایی')}
                    </span>
                    <span style={{ fontSize: 12, color: '#06b6d4', fontWeight: 700 }}>
                      ● پایدار
                    </span>
                  </div>
                </div>

                {/* Right Agent Status Cards */}
                <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(1, 16, 28, 0.75)',
                      borderRadius: 6,
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#38bdf8' }}>موتور صوتی استودیویی</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>
                      {sanitizeForDisplay('قفل ضرب‌آهنگ (Beat-Grid)')}
                    </div>
                    <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 4, fontWeight: 600 }}>
                      تمپو: ۱۲۴ BPM
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(1, 16, 28, 0.75)',
                      borderRadius: 6,
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#38bdf8' }}>فونت رسمی فارسی</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>
                      {sanitizeForDisplay('یکان بخ نسخه طلایی')}
                    </div>
                    <div style={{ fontSize: 12, color: '#06b6d4', marginTop: 4, fontWeight: 600 }}>
                      تایپوگرافی اصیل و بدون پرش
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(1, 16, 28, 0.75)',
                      borderRadius: 6,
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#38bdf8' }}>پیوستگی جهان سینمایی</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>
                      {sanitizeForDisplay('تک‌پلان بدون کات (One-Take)')}
                    </div>
                    <div style={{ fontSize: 12, color: '#38bdf8', marginTop: 4, fontWeight: 600 }}>
                      جریان ممتد فوکوس
                    </div>
                  </div>
                </div>
              </div>

              {/* Living Procedural Telemetry Stream */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 24,
                  right: 24,
                  height: 28,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  opacity: 0.8,
                }}
              >
                <svg width="100%" height="28" viewBox="0 0 730 28">
                  <ParametricWaveformStream x={0} y={14} width={730} amplitude={8} color="#06b6d4" />
                </svg>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 4: NEO-BRUTALIST CALIBRATION GAUGE & MILESTONE (1220..1800)   */}
          {/* ================================================================= */}
          {act4Visible && (
            <div
              style={{
                position: 'absolute',
                width: 440,
                height: 490,
                opacity: act4Spring,
                transform: `translate3d(380px, 0px, 60px) scale(${act4Spring})`,
                background: '#04281e',
                borderRadius: 16,
                border: '3.5px solid #021a14',
                boxShadow: '8px 8px 0px #021a14, 0 0 40px rgba(245, 158, 11, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 32,
                direction: 'rtl',
                textAlign: 'center',
              }}
            >
              {/* Neo-Brutalist Badge Header */}
              <div
                style={{
                  background: '#fef08a',
                  border: '2px solid #021a14',
                  boxShadow: '3px 3px 0px #021a14',
                  padding: '4px 14px',
                  borderRadius: 6,
                  color: '#021a14',
                  fontSize: 12,
                  fontWeight: 900,
                  marginBottom: 16,
                }}
              >
                {sanitizeForDisplay('⚡ نئوبروتالیسم · استاندارد طلایی')}
              </div>

              {/* Circular Gauge */}
              <div style={{ position: 'relative', width: 170, height: 170, marginBottom: 24 }}>
                <svg width={170} height={170} style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx={85} cy={85} r={72} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth={12} />
                  <circle
                    cx={85}
                    cy={85}
                    r={72}
                    fill="none"
                    stroke="url(#emeraldGoldGrad)"
                    strokeWidth={12}
                    strokeDasharray={452}
                    strokeDashoffset={452 - (452 * gaugeValue) / 100}
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.6))' }}
                  />
                  <defs>
                    <linearGradient id="emeraldGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 44, fontWeight: 900, color: '#ffffff' }}>
                    {gaugeValue}٪
                  </span>
                  <span style={{ fontSize: 13, color: '#f59e0b', fontWeight: 700 }}>
                    {sanitizeForDisplay('کالیبراسیون')}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0' }}>
                {sanitizeForDisplay('استاندارد کیفی طلایی')}
              </h3>
              <p style={{ fontSize: 14, color: '#94a3b8', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                {sanitizeForDisplay('انطباق ۱۰۰٪ با زبان طراحی موشن‌گرافیک کلاد اوپوس ۵.۵')}
              </p>

              {/* Verified Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 18px',
                  borderRadius: 999,
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#6ee7b7',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                <span>✔</span>
                <span>{sanitizeForDisplay('تأییدیه کمیته تحقیقاتی و فناوری')}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. SIMULATED INTERACTIVE CURSOR POINTER (ACT 1 INTERACTION) */}
      <InteractiveCursor
        startFrame={150}
        clickFrame={220}
        endFrame={290}
        targetX={960}
        targetY={440}
      />

      {/* 5. FOREGROUND SHALLOW DEPTH-OF-FIELD OPTICAL BOKEH */}
      <ForegroundBokehLayer camX={camX} camY={camY} />

      {/* ===================================================================== */}
      {/* 6. NATIVE REMOTION AUDIO LAYER (BGM + 4-ACT VOICE + BEAT-ALIGNED SFX) */}
      {/* ===================================================================== */}
      {/* A) Continuous Future Beats Music (124 BPM) */}
      <Audio
        src={staticFile('music/Brain_Dance.mp3')}
        volume={() => currentBgmVolume}
      />

      {/* B) Two-Stage Persian Voice Narration Segments */}
      <Sequence from={30} durationInFrames={250}>
        <Audio src={staticFile('audio/intro_shot_1.mp3')} volume={1.0} />
      </Sequence>
      <Sequence from={370} durationInFrames={330}>
        <Audio src={staticFile('audio/intro_shot_2.mp3')} volume={1.0} />
      </Sequence>
      <Sequence from={770} durationInFrames={410}>
        <Audio src={staticFile('audio/intro_shot_3.mp3')} volume={1.0} />
      </Sequence>
      <Sequence from={1260} durationInFrames={460}>
        <Audio src={staticFile('audio/intro_shot_4.mp3')} volume={1.0} />
      </Sequence>

      {/* C) Frame-Accurate Beat-Aligned Studio Sound Effects */}
      {/* SFX 1: Cursor Click (Frame 219) */}
      <Sequence from={219} durationInFrames={30}>
        <Audio src={staticFile('sfx/kenney_mouseclick.wav')} volume={0.9} />
      </Sequence>

      {/* SFX 2: Act 1 -> Act 2 Camera Whip Pre-roll (Frame 335) */}
      <Sequence from={335} durationInFrames={40}>
        <Audio src={staticFile('sfx/remotion_whip.wav')} volume={0.8} />
      </Sequence>

      {/* SFX 3: Act 2 -> Act 3 2.5D Isometric Tilt Pre-roll (Frame 725) */}
      <Sequence from={725} durationInFrames={45}>
        <Audio src={staticFile('sfx/remotion_whoosh.wav')} volume={0.75} />
      </Sequence>

      {/* SFX 4: Act 3 Telemetry Chime (Frame 1120) */}
      <Sequence from={1120} durationInFrames={50}>
        <Audio src={staticFile('sfx/remotion_ding.wav')} volume={0.8} />
      </Sequence>

      {/* SFX 5: Act 3 -> Act 4 Wide Camera Pullback & Shutter (Frame 1225) */}
      <Sequence from={1225} durationInFrames={45}>
        <Audio src={staticFile('sfx/remotion_shutter.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={1228} durationInFrames={40}>
        <Audio src={staticFile('sfx/remotion_whoosh.wav')} volume={0.7} />
      </Sequence>

      {/* SFX 6: Act 4 Climax 100% Milestone Lock (Frame 1365) */}
      <Sequence from={1365} durationInFrames={60}>
        <Audio src={staticFile('sfx/remotion_ding.wav')} volume={0.95} />
      </Sequence>
    </div>
  );
};
