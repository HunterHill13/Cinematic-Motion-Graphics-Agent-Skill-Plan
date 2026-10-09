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
import { MaskedKineticHeadline } from '../library/MaskedKineticTypography';
import { InertialRig } from '../library/InertialFollowThrough';

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

  // Kinetic Speed Ramp Peak Velocity Blur & Coordinate Skew
  const isWhip1 = frame >= 325 && frame <= 355;
  const isWhip2 = frame >= 715 && frame <= 745;
  const isWhip3 = frame >= 1215 && frame <= 1245;
  let speedRampBlur = 0;
  let speedRampSkew = 0;

  if (isWhip1) {
    const p = interpolate(frame, [325, 340, 355], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    speedRampBlur = p * 6.5;
    speedRampSkew = p * -1.8;
  } else if (isWhip2) {
    const p = interpolate(frame, [715, 730, 745], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    speedRampBlur = p * 7.5;
    speedRampSkew = p * 2.2;
  } else if (isWhip3) {
    const p = interpolate(frame, [1215, 1230, 1245], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    speedRampBlur = p * 8.0;
    speedRampSkew = p * -1.9;
  }

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
  const act1Entrance = spring({
    fps,
    frame,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

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
            transform: `translate3d(${-camX}px, ${-camY}px, ${camZ}px) rotateX(${camPitch}deg) rotateY(${camYaw}deg) rotateZ(${camRoll}deg) skewX(${speedRampSkew}deg)`,
            filter: speedRampBlur > 0.5 ? `blur(${speedRampBlur.toFixed(1)}px)` : undefined,
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
                transform: `translateZ(40px) scale(${0.92 + act1Entrance * 0.08})`,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  padding: '48px 60px',
                  borderRadius: 24,
                  background: 'rgba(6, 28, 20, 0.65)',
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  boxShadow: '0 30px 70px rgba(0, 0, 0, 0.75), 0 0 45px rgba(16, 185, 129, 0.2)',
                  backdropFilter: 'blur(24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: 960,
                }}
              >
                <InertialRig parentProgress={act1Entrance} parentVelocity={(act1Entrance - interpolate(frame, [0, 60], [0, 1])) * 20}>
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

                {/* Title with Masked Overflow Stencil Reveal */}
                <MaskedKineticHeadline
                  text="کارگردانی سینمایی ویدیو در تراز کلاد اوپوس ۵.۵"
                  highlightWords={['سینمایی', 'اوپوس', '۵.۵']}
                  gradientColors={['#ffffff', '#6ee7b7', '#10b981']}
                  delayFrames={15}
                  fontSize={56}
                  fontWeight={950}
                  direction="rtl"
                  style={{ marginBottom: 18, justifyContent: 'center' }}
                />

                {/* Subtitle with Masked Stagger Reveal */}
                <MaskedKineticHeadline
                  text="پایان اسلایدهای بی‌روح · انیمیشن پیوسته تک‌پلان با فیزیک اسپرینگ و طراحی صدای استودیویی"
                  highlightWords={['اسلایدهای']}
                  delayFrames={35}
                  fontSize={22}
                  fontWeight={500}
                  color="#94a3b8"
                  direction="rtl"
                  style={{ marginBottom: 40, maxWidth: 840, justifyContent: 'center' }}
                />

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
              </InertialRig>
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
                transform: `translateZ(50px) rotate(${Math.sin(stopMotionFrame * 0.15) * 0.7}deg)`,
                pointerEvents: 'none',
              }}
            >
              {/* Physical Paper Cutout Card Container */}
              <div
                style={{
                  position: 'relative',
                  width: 760,
                  height: 410,
                  background: '#fefdfa',
                  borderRadius: '4px',
                  border: '2px solid rgba(80, 60, 40, 0.25)',
                  boxShadow: '8px 12px 0px rgba(60, 50, 40, 0.28), 16px 24px 0px rgba(60, 50, 40, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  direction: 'rtl',
                }}
              >
                {/* Physical Kraft Tape on Top Right Corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    right: 40,
                    width: 75,
                    height: 26,
                    background: 'rgba(255, 238, 185, 0.85)',
                    border: '1px solid rgba(220, 200, 140, 0.6)',
                    transform: 'rotate(14deg)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                    zIndex: 10,
                  }}
                />
                {/* Physical Kraft Tape on Top Left Corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: 40,
                    width: 75,
                    height: 26,
                    background: 'rgba(255, 238, 185, 0.85)',
                    border: '1px solid rgba(220, 200, 140, 0.6)',
                    transform: 'rotate(-10deg)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                    zIndex: 10,
                  }}
                />

                {/* Tactile Paper Header Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 28,
                    background: '#1b4332',
                    padding: '6px 20px',
                    borderRadius: 4,
                    boxShadow: '2px 3px 0px rgba(0,0,0,0.2)',
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#f0fdf4',
                    zIndex: 5,
                  }}
                >
                  {sanitizeForDisplay('✂️ استاپ‌موشن برش کاغذ دستی (۱۲ FPS)')}
                </div>

                {/* Paper Subtitle */}
                <div
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 28,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#4b5563',
                    zIndex: 5,
                  }}
                >
                  {sanitizeForDisplay('مورفینگ پیوسته برداری روی کلاژ')}
                </div>

                {/* Trigonometric Lissajous Gold Wire Orbit */}
                <svg
                  width={740}
                  height={340}
                  style={{
                    position: 'absolute',
                    top: 35,
                    left: 10,
                    overflow: 'visible',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <LissajousOrbit cx={370} cy={170} size={300} color="#d97706" glowColor="rgba(217, 119, 6, 0.35)" />
                </svg>

                {/* Vector Morph Card in Forest Green & Amber */}
                <div style={{ position: 'relative', zIndex: 3, marginTop: 30 }}>
                  <PersianVectorMorphCard
                    startFrame={340}
                    width={700}
                    height={320}
                    glowColor="#2d6a4f"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 3: TECHNICAL BLUEPRINT 2.5D ISOMETRIC CONSOLE (720..1800)     */}
          {/* ================================================================= */}
          {act3Visible && (
            <div
              style={{
                position: 'absolute',
                width: 820,
                height: 520,
                opacity: act3Entrance,
                transform: `translate3d(${saasDockX}px, 0px, 60px) scale(${saasDockScale})`,
                direction: 'rtl',
              }}
            >
              {/* CAD Dimension Top Ruler Guide */}
              <div
                style={{
                  position: 'absolute',
                  top: -28,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: '#38bdf8',
                  letterSpacing: '0.05em',
                  background: 'rgba(6, 182, 212, 0.12)',
                  padding: '3px 12px',
                  border: '1px dashed rgba(6, 182, 212, 0.5)',
                  borderRadius: 2,
                }}
              >
                <span>|◀ 0.00 mm</span>
                <span>◀────────────── CAD DIMENSION: 820.00 mm (ISOMETRIC PROJECTION) ──────────────▶</span>
                <span>820.00 mm ▶|</span>
              </div>

              {/* Blueprint Window Container */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(4, 20, 36, 0.94)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: 4,
                  border: '2px solid #06b6d4',
                  boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(6, 182, 212, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* CAD Blueprint Header */}
                <div
                  style={{
                    height: 50,
                    borderBottom: '1.5px solid rgba(6, 182, 212, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    background: 'rgba(6, 32, 54, 0.8)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#06b6d4' }} />
                    <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#38bdf8', marginRight: 10 }}>[CAD_DRAWING: REV 5.5]</span>
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
                        height: 200,
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 4,
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        padding: 16,
                        position: 'relative',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: '#38bdf8', fontFamily: 'monospace' }}>+ CAD STABILITY TELEMETRY</span>
                        <span style={{ fontSize: 14, fontWeight: 800, color: '#06b6d4' }}>+۹۹.۸٪ پایداری</span>
                      </div>

                      {/* Animated Sparkline */}
                      <svg width="100%" height="120" style={{ marginTop: 10 }}>
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
                        background: 'rgba(6, 32, 54, 0.7)',
                        borderRadius: 4,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
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
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 4,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
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
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 4,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
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
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 4,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
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
                    bottom: 8,
                    left: 24,
                    right: 24,
                    height: 28,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    opacity: 0.85,
                  }}
                >
                  <svg width="100%" height="28" viewBox="0 0 770 28">
                    <ParametricWaveformStream x={0} y={14} width={770} amplitude={8} color="#06b6d4" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 4: NEO-BRUTALIST GRAPHIC POSTER & CALIBRATION (1220..1800)    */}
          {/* ================================================================= */}
          {act4Visible && (
            <div
              style={{
                position: 'absolute',
                width: 460,
                height: 520,
                opacity: act4Spring,
                transform: `translate3d(380px, 0px, 60px) scale(${act4Spring})`,
                background: '#ffffff',
                borderRadius: 12,
                border: '4px solid #000000',
                boxShadow: '12px 12px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 32,
                direction: 'rtl',
                textAlign: 'center',
              }}
            >
              {/* Neo-Brutalist Sticker Badge (Rotated) */}
              <div
                style={{
                  background: '#fef08a',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  padding: '6px 18px',
                  borderRadius: 4,
                  color: '#000000',
                  fontSize: 13,
                  fontWeight: 900,
                  marginBottom: 20,
                  transform: 'rotate(-3deg)',
                }}
              >
                {sanitizeForDisplay('★ نئوبروتالیسم · استاندارد طلایی ★')}
              </div>

              {/* Neo-Brutalist Circular Gauge */}
              <div style={{ position: 'relative', width: 170, height: 170, marginBottom: 24 }}>
                <svg width={170} height={170} style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx={85} cy={85} r={70} fill="none" stroke="#e5e7eb" strokeWidth={16} />
                  <circle
                    cx={85}
                    cy={85}
                    r={70}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={16}
                    strokeDasharray={440}
                    strokeDashoffset={440 - (440 * gaugeValue) / 100}
                    strokeLinecap="square"
                  />
                  {/* Heavy Black Outline Circle */}
                  <circle cx={85} cy={85} r={79} fill="none" stroke="#000000" strokeWidth={3} />
                  <circle cx={85} cy={85} r={61} fill="none" stroke="#000000" strokeWidth={3} />
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
                  <span style={{ fontSize: 46, fontWeight: 950, color: '#000000', letterSpacing: '-0.02em' }}>
                    {gaugeValue}٪
                  </span>
                  <span style={{ fontSize: 13, color: '#b45309', fontWeight: 800 }}>
                    {sanitizeForDisplay('کالیبراسیون')}
                  </span>
                </div>
              </div>

              {/* Title in Heavy Black with Masked Overflow Reveal */}
              <MaskedKineticHeadline
                text="استاندارد کیفی طلایی"
                highlightWords={['طلایی']}
                gradientColors={['#000000', '#b45309', '#f59e0b']}
                delayFrames={1240}
                fontSize={28}
                fontWeight={950}
                color="#000000"
                direction="rtl"
                style={{ marginBottom: 8, justifyContent: 'center' }}
              />
              <MaskedKineticHeadline
                text="انطباق ۱۰۰٪ با زبان طراحی موشن‌گرافیک کلاد اوپوس ۵.۵"
                highlightWords={['اوپوس']}
                delayFrames={1255}
                fontSize={14}
                fontWeight={700}
                color="#374151"
                direction="rtl"
                style={{ marginBottom: 20, maxWidth: 360, justifyContent: 'center' }}
              />

              {/* Verified Sticker Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 6,
                  background: '#10b981',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  color: '#ffffff',
                  fontSize: 14,
                  fontWeight: 900,
                  transform: 'rotate(2deg)',
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
