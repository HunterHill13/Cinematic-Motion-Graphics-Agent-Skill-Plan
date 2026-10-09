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
import { quantizeToBeat, calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { loadYekanBakhFonts } from '../../fonts/yekanBakh';
import { CURATED_COLOR_PALETTES } from '../visual_world/colorPaletteGate';
import { APPROVED_ART_STYLES, ArtStyleDefinition, quantizeFrameForStopMotion } from '../visual_world/artStyleGate';
import { deriveAtmosphere } from '../visual_world/AtmosphereThemeDeriver';
import { MaskedKineticHeadline } from '../library/MaskedKineticTypography';
import { InertialRig } from '../library/InertialFollowThrough';
import { DynamicFresnelSweep } from '../library/DynamicFresnelSweep';
import { StyleAwareAtmosphereLayer } from '../library/StyleAwareAtmosphereLayer';
import { KineticBarChart, KineticMetricCounter } from '../library/KineticDataViz';
import { LiquidButtonSquash } from '../library/OrganicLiquidGooey';
import { NewtonianAttractorSwarm } from '../library/NewtonianAttractorSwarm';

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
  // 1. CONTINUOUS 6-DOF VIRTUAL CAMERA TRACKING (INFINITE SPATIAL CANVAS)
  // =========================================================================
  // Act 1 Center: X = 0 (Sovereign Glassmorphic Monolith)
  // Act 2 Center: X = 1800 (Artisanal Stop-Motion Paper & Morphing Core)
  // Act 3 Center: X = 3600 (Technical Blueprint CAD Console)
  // Act 4 & Docked Center: X = 4200 (Symmetrically frames Act 3 at 3720 and Act 4 at 4480)
  let camX = 0;
  if (frame < 280) {
    camX = 0;
  } else if (frame < 370) {
    camX = interpolate(frame, [280, 370], [0, 1800], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame < 690) {
    camX = 1800;
  } else if (frame < 780) {
    camX = interpolate(frame, [690, 780], [1800, 3600], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame < 1190) {
    camX = 3600;
  } else if (frame < 1280) {
    camX = interpolate(frame, [1190, 1280], [3600, 4200], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else {
    camX = 4200;
  }

  const camY = interpolate(
    frame,
    [0, 280, 370, 690, 780, 1190, 1280, 1800],
    [0, 0, 10, 10, -10, -10, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camZ = interpolate(
    frame,
    [0, 280, 370, 690, 780, 1190, 1280, 1800],
    [0, 40, 60, 60, 160, 160, -50, -50],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camPitch = interpolate(
    frame,
    [0, 280, 370, 690, 780, 1190, 1280, 1800],
    [0, 1.5, 4, 4, -1.8, -1.8, -1.5, -1.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camYaw = interpolate(
    frame,
    [0, 280, 370, 690, 780, 1190, 1280, 1800],
    [0, 0, -3, -3, 2.2, 2.2, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Dynamic Cinematic Banking Roll during Dolly Transitions (±3.5 degrees)
  let camRoll = 0;
  if (frame >= 280 && frame <= 370) {
    camRoll = interpolate(frame, [280, 325, 370], [0, -3.5, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.quad),
    });
  } else if (frame >= 690 && frame <= 780) {
    camRoll = interpolate(frame, [690, 735, 780], [0, 3.5, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.quad),
    });
  } else if (frame >= 1190 && frame <= 1280) {
    camRoll = interpolate(frame, [1190, 1235, 1280], [0, -2.5, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.quad),
    });
  }

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

  // Audio-Reactive Beat Kick Impulse (124 BPM Future Beats) - Softened for silky, subtle pulse
  const { scalePulse } = calculateBeatPulse(frame, 124, fps, isSpeaking ? 0.002 : 0.0045);

  // =========================================================================
  // 3. INFINITE SPATIAL CANVAS VISIBILITY & SPRINGS
  // =========================================================================
  const act1Entrance = spring({
    fps,
    frame,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  // Distance-weighted continuous opacity falloff (eliminates abrupt pop-outs at Sec 12 & Sec 26!)
  const act1DistanceOpacity = interpolate(camX, [0, 800, 1400], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act2DistanceOpacity = interpolate(camX, [600, 1400, 2200, 3100], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act3DistanceOpacity = interpolate(camX, [2400, 3200, 4200], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act1Visible = camX < 1450;
  const act2Visible = camX > 550 && camX < 3150;
  const act3Visible = camX > 2300;
  const act4Visible = camX > 3500;

  const act3Entrance = spring({
    fps,
    frame: frame - 680,
    config: { damping: 14, mass: 0.9, stiffness: 110 },
  });

  // In Act 4 docked pavilion, Act 3 slides smoothly from X=3600 to X=3949 and scales to 0.70
  const act3X = interpolate(frame, [1190, 1280], [3600, 3949], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const saasDockScale = interpolate(frame, [1190, 1280], [1.0, 0.68], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act4Spring = spring({
    fps,
    frame: frame - 1190,
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
            transform: `translate3d(${-camX}px, ${-camY}px, ${camZ}px) rotateX(${camPitch}deg) rotateY(${camYaw}deg) rotateZ(${camRoll}deg) skewX(${speedRampSkew}deg) scale(${scalePulse.toFixed(4)})`,
            filter: speedRampBlur > 0.5 ? `blur(${speedRampBlur.toFixed(1)}px)` : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ================================================================= */}
          {/* ACT 1: SOVEREIGN INTRO MONOLITH & INTERACTION (0..360)             */}
          {/* ================================================================= */}
          {act1Visible && (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: act1Entrance * act1DistanceOpacity,
                transform: `translate3d(0px, 0px, 40px) scale(${0.92 + act1Entrance * 0.08})`,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  padding: '44px 50px',
                  borderRadius: 24,
                  background: 'rgba(6, 28, 20, 0.65)',
                  border: '1.5px solid rgba(16, 185, 129, 0.35)',
                  boxShadow: '0 30px 70px rgba(0, 0, 0, 0.75), 0 0 45px rgba(16, 185, 129, 0.2)',
                  backdropFilter: 'blur(24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 1380,
                  maxWidth: '94vw',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                {/* Dynamic Angle-Driven Specular Sweep Rig */}
                <DynamicFresnelSweep
                  camYaw={camYaw}
                  camRoll={camRoll}
                  camPitch={camPitch}
                  borderRadius={24}
                  highlightColor="rgba(110, 231, 183, 0.35)"
                  maxIntensity={0.4}
                />

                <InertialRig
                  parentProgress={act1Entrance}
                  parentVelocity={(act1Entrance - interpolate(frame, [0, 60], [0, 1])) * 20}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
                >
                {/* Badge Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 28px',
                    borderRadius: 999,
                    background: 'rgba(2, 44, 34, 0.75)',
                    border: '1.5px solid rgba(16, 185, 129, 0.4)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 0 24px rgba(16, 185, 129, 0.25)',
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 12px #10b981',
                    }}
                  />
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#ecfdf5' }}>
                    {sanitizeForDisplay('هوش مصنوعی پیشرفته · اسکیل موشن‌گرافیک سینمایی')}
                  </span>
                </div>

                {/* Title with Masked Overflow Stencil Reveal */}
                <MaskedKineticHeadline
                  text="کارگردانی سینمایی ویدیو در تراز کلاد اوپوس ۵.۵"
                  highlightWords={['سینمایی', 'اوپوس', '۵.۵']}
                  gradientColors={['#ffffff', '#6ee7b7', '#10b981']}
                  delayFrames={15}
                  fontSize={54}
                  fontWeight={950}
                  direction="rtl"
                  style={{ marginBottom: 20, justifyContent: 'center', width: '100%' }}
                />

                {/* Subtitle with Masked Stagger Reveal */}
                <MaskedKineticHeadline
                  text="پایان اسلایدهای بی‌روح · انیمیشن پیوسته تک‌پلان با فیزیک اسپرینگ و طراحی صدای استودیویی"
                  highlightWords={['اسلایدهای']}
                  delayFrames={35}
                  fontSize={26}
                  fontWeight={500}
                  color="#94a3b8"
                  direction="rtl"
                  style={{ marginBottom: 44, maxWidth: 1120, justifyContent: 'center' }}
                />

                {/* Interactive Target Button with Viscous Liquid Squash & Satellite Droplets */}
                <LiquidButtonSquash
                  clickFrame={219}
                  width={280}
                  height={66}
                  primaryColor="#10b981"
                  accentColor="#f59e0b"
                  artStyle="MODERN_GLASSMORPHIC"
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 44px',
                      borderRadius: 18,
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(245, 158, 11, 0.18))',
                      border: '1.5px solid rgba(16, 185, 129, 0.5)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(16, 185, 129, 0.3)',
                      transform: `scale(${buttonScale})`,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: '#f59e0b',
                        boxShadow: '0 0 14px #f59e0b',
                      }}
                    />
                    <span style={{ fontSize: 20, fontWeight: 800, color: '#f0fdf4' }}>
                      {sanitizeForDisplay('ورود به استودیو سینمایی')}
                    </span>
                  </div>
                </LiquidButtonSquash>
              </InertialRig>
              </div>

              {/* Newtonian Attractor Swarm (Gravitational Attraction to CTA) */}
              <NewtonianAttractorSwarm
                attractorX={0}
                attractorY={180}
                particleCount={20}
                theme="MODERN_GLASSMORPHIC"
                clickFrame={219}
                beatPulse={scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 2: STOP-MOTION PAPER CUTOUT & LISSAJOUS ORBIT (X = 1800)      */}
          {/* ================================================================= */}
          {act2Visible && (
            <div
              style={{
                position: 'absolute',
                opacity: act2DistanceOpacity,
                transform: `translate3d(1800px, 0px, 50px) rotate(${Math.sin(stopMotionFrame * 0.15) * 0.7}deg)`,
                pointerEvents: 'none',
              }}
            >
              {/* Physical Paper Cutout Card Container (Scaled to 1420x660) */}
              <div
                style={{
                  position: 'relative',
                  width: 1420,
                  height: 660,
                  background: '#fefdfa',
                  borderRadius: '6px',
                  border: '3px solid rgba(80, 60, 40, 0.25)',
                  boxShadow: '10px 16px 0px rgba(60, 50, 40, 0.28), 20px 32px 0px rgba(60, 50, 40, 0.12)',
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
                    top: -14,
                    right: 70,
                    width: 95,
                    height: 32,
                    background: 'rgba(255, 238, 185, 0.85)',
                    border: '1px solid rgba(220, 200, 140, 0.6)',
                    transform: 'rotate(14deg)',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                    zIndex: 10,
                  }}
                />
                {/* Physical Kraft Tape on Top Left Corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: 70,
                    width: 95,
                    height: 32,
                    background: 'rgba(255, 238, 185, 0.85)',
                    border: '1px solid rgba(220, 200, 140, 0.6)',
                    transform: 'rotate(-10deg)',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                    zIndex: 10,
                  }}
                />

                {/* Tactile Paper Header Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 22,
                    right: 36,
                    background: '#1b4332',
                    padding: '8px 26px',
                    borderRadius: 6,
                    boxShadow: '2px 4px 0px rgba(0,0,0,0.2)',
                    fontSize: 16,
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
                    top: 26,
                    left: 36,
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#4b5563',
                    zIndex: 5,
                  }}
                >
                  {sanitizeForDisplay('مورفینگ پیوسته برداری روی کلاژ')}
                </div>

                {/* Trigonometric Lissajous Gold Wire Orbit */}
                <svg
                  width={1400}
                  height={600}
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: 10,
                    overflow: 'visible',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  <LissajousOrbit cx={700} cy={300} size={520} color="#d97706" glowColor="rgba(217, 119, 6, 0.35)" />
                </svg>

                {/* Vector Morph Card in Forest Green & Amber */}
                <div style={{ position: 'relative', zIndex: 3, marginTop: 36 }}>
                  <PersianVectorMorphCard
                    startFrame={340}
                    durationInFrames={370}
                    width={1360}
                    height={560}
                    glowColor="#2d6a4f"
                  />
                </div>
              </div>

              {/* Newtonian Attractor Swarm orbiting SVG Morph Core */}
              <NewtonianAttractorSwarm
                attractorX={-320}
                attractorY={30}
                particleCount={20}
                theme="STOP_MOTION_PAPER"
                beatPulse={scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 3: TECHNICAL BLUEPRINT 2.5D ISOMETRIC CONSOLE (X = 3600)      */}
          {/* ================================================================= */}
          {act3Visible && (
            <div
              style={{
                position: 'absolute',
                width: 1540,
                height: 740,
                opacity: act3Entrance * act3DistanceOpacity,
                transform: `translate3d(${act3X}px, 0px, 60px) scale(${saasDockScale})`,
                direction: 'rtl',
              }}
            >
              {/* CAD Dimension Top Ruler Guide */}
              <div
                style={{
                  position: 'absolute',
                  top: -32,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  color: '#38bdf8',
                  letterSpacing: '0.05em',
                  background: 'rgba(6, 182, 212, 0.12)',
                  padding: '4px 16px',
                  border: '1px dashed rgba(6, 182, 212, 0.5)',
                  borderRadius: 3,
                }}
              >
                <span>|◀ 0.00 mm</span>
                <span>◀────────────── CAD DIMENSION: 1540.00 mm (ISOMETRIC PROJECTION) ──────────────▶</span>
                <span>1540.00 mm ▶|</span>
              </div>

              {/* Blueprint Window Container */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(4, 20, 36, 0.94)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderRadius: 6,
                  border: '2px solid #06b6d4',
                  boxShadow: '0 35px 90px -15px rgba(0, 0, 0, 0.9), 0 0 45px rgba(6, 182, 212, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Dynamic Specular Sweep Rig on Blueprint Console */}
                <DynamicFresnelSweep
                  camYaw={camYaw}
                  camRoll={camRoll}
                  camPitch={camPitch}
                  borderRadius={6}
                  highlightColor="rgba(56, 189, 248, 0.35)"
                  maxIntensity={0.35}
                />

                {/* CAD Blueprint Header */}
                <div
                  style={{
                    height: 56,
                    borderBottom: '1.5px solid rgba(6, 182, 212, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 28px',
                    background: 'rgba(6, 32, 54, 0.8)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#06b6d4' }} />
                    <span style={{ fontSize: 13, fontFamily: 'monospace', color: '#38bdf8', marginRight: 12 }}>[CAD_DRAWING: REV 5.5]</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f0fdfa', letterSpacing: '0.02em' }}>
                    {sanitizeForDisplay('کنسول تله‌متری و تحلیل فضایی (نقشه فنی بلوپرینت)')}
                  </div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 10px #06b6d4' }} />
                </div>

                {/* Console Body */}
                <div style={{ flex: 1, padding: 30, display: 'flex', gap: 28 }}>
                  {/* Metric Visualizer Area */}
                  <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        height: 305,
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 6,
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        padding: 22,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 14, color: '#38bdf8', fontFamily: 'monospace' }}>+ CAD BENCHMARK TELEMETRY</span>
                        <KineticMetricCounter
                          value={99.8}
                          decimals={1}
                          prefix="+"
                          suffix="٪"
                          startFrame={750}
                          durationFrames={40}
                          fontSize={24}
                          color="#38bdf8"
                          artStyle="TECHNICAL_BLUEPRINT"
                        />
                      </div>

                      {/* Studio Kinetic Bar Chart */}
                      <KineticBarChart
                        items={[
                          { label: 'کلاد اوپوس', value: 99.4, color: '#38bdf8', unit: '٪' },
                          { label: 'سرعت فریم', value: 96.0, color: '#06b6d4', unit: '٪' },
                          { label: 'موتور سنتی', value: 64.2, color: '#d97706', unit: '٪' },
                        ]}
                        startFrame={750}
                        staggerFrames={5}
                        height={180}
                        artStyle="TECHNICAL_BLUEPRINT"
                        direction="rtl"
                      />
                    </div>

                    {/* Status Bar */}
                    <div
                      style={{
                        padding: '16px 24px',
                        background: 'rgba(6, 32, 54, 0.7)',
                        borderRadius: 6,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: 17, color: '#cbd5e1', fontWeight: 600 }}>
                        {sanitizeForDisplay('وضعیت سیستم: آماده‌باش تولید سینمایی')}
                      </span>
                      <span style={{ fontSize: 16, color: '#06b6d4', fontWeight: 800 }}>
                        ● پایدار
                      </span>
                    </div>
                  </div>

                  {/* Right Agent Status Cards */}
                  <div style={{ flex: 0.85, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div
                      style={{
                        padding: '18px 22px',
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 6,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                      }}
                    >
                      <div style={{ fontSize: 14, color: '#38bdf8', fontWeight: 600 }}>موتور صوتی استودیویی</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', marginTop: 6 }}>
                        {sanitizeForDisplay('قفل ضرب‌آهنگ (Beat-Grid)')}
                      </div>
                      <div style={{ fontSize: 16, color: '#f59e0b', marginTop: 6, fontWeight: 700 }}>
                        تمپو: ۱۲۴ BPM
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '18px 22px',
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 6,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                      }}
                    >
                      <div style={{ fontSize: 14, color: '#38bdf8', fontWeight: 600 }}>فونت رسمی فارسی</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', marginTop: 6 }}>
                        {sanitizeForDisplay('یکان بخ نسخه طلایی')}
                      </div>
                      <div style={{ fontSize: 16, color: '#06b6d4', marginTop: 6, fontWeight: 700 }}>
                        تایپوگرافی اصیل و بدون پرش
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '18px 22px',
                        background: 'rgba(2, 14, 26, 0.85)',
                        borderRadius: 6,
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                      }}
                    >
                      <div style={{ fontSize: 14, color: '#38bdf8', fontWeight: 600 }}>پیوستگی جهان سینمایی</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', marginTop: 6 }}>
                        {sanitizeForDisplay('تک‌پلان بدون کات (One-Take)')}
                      </div>
                      <div style={{ fontSize: 16, color: '#38bdf8', marginTop: 6, fontWeight: 700 }}>
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
                    left: 28,
                    right: 28,
                    height: 32,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    opacity: 0.85,
                  }}
                >
                  <svg width="100%" height="32" viewBox="0 0 1480 32">
                    <ParametricWaveformStream x={0} y={16} width={1480} amplitude={10} color="#06b6d4" />
                  </svg>
                </div>
              </div>

              {/* Newtonian Attractor Swarm in Technical Blueprint Cyan/Azure */}
              <NewtonianAttractorSwarm
                attractorX={-280}
                attractorY={-20}
                particleCount={20}
                theme="TECHNICAL_BLUEPRINT"
                beatPulse={scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 4: NEO-BRUTALIST GRAPHIC POSTER & CALIBRATION (X = 4754)      */}
          {/* ================================================================= */}
          {act4Visible && (
            <div
              style={{
                position: 'absolute',
                width: 520,
                height: 640,
                opacity: act4Spring,
                transform: `translate3d(4754px, 0px, 60px) scale(${act4Spring * 0.85})`,
                background: '#ffffff',
                borderRadius: 14,
                border: '4px solid #000000',
                boxShadow: '14px 14px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 36,
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
                  padding: '8px 22px',
                  borderRadius: 6,
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: 900,
                  marginBottom: 24,
                  transform: 'rotate(-3deg)',
                }}
              >
                {sanitizeForDisplay('★ نئوبروتالیسم · استاندارد طلایی ★')}
              </div>

              {/* Neo-Brutalist Circular Gauge */}
              <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 26 }}>
                <svg width={200} height={200} style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx={100} cy={100} r={82} fill="none" stroke="#e5e7eb" strokeWidth={18} />
                  <circle
                    cx={100}
                    cy={100}
                    r={82}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={18}
                    strokeDasharray={515}
                    strokeDashoffset={515 - (515 * gaugeValue) / 100}
                    strokeLinecap="square"
                  />
                  {/* Heavy Black Outline Circle */}
                  <circle cx={100} cy={100} r={92} fill="none" stroke="#000000" strokeWidth={3.5} />
                  <circle cx={100} cy={100} r={72} fill="none" stroke="#000000" strokeWidth={3.5} />
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
                  <span style={{ fontSize: 54, fontWeight: 950, color: '#000000', letterSpacing: '-0.02em' }}>
                    {gaugeValue}٪
                  </span>
                  <span style={{ fontSize: 16, color: '#b45309', fontWeight: 800 }}>
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
                fontSize={34}
                fontWeight={950}
                color="#000000"
                direction="rtl"
                style={{ marginBottom: 12, justifyContent: 'center' }}
              />
              <MaskedKineticHeadline
                text="انطباق ۱۰۰٪ با زبان طراحی موشن‌گرافیک کلاد اوپوس ۵.۵"
                highlightWords={['اوپوس']}
                delayFrames={1255}
                fontSize={16}
                fontWeight={700}
                color="#374151"
                direction="rtl"
                style={{ marginBottom: 24, maxWidth: 440, justifyContent: 'center' }}
              />

              {/* Verified Sticker Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 26px',
                  borderRadius: 8,
                  background: '#10b981',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  color: '#ffffff',
                  fontSize: 16,
                  fontWeight: 900,
                  transform: 'rotate(2deg)',
                }}
              >
                <span>✔</span>
                <span>{sanitizeForDisplay('تأییدیه استاندارد طلایی استودیو')}</span>
              </div>

              {/* Newtonian Attractor Swarm in Neo-Brutalist High Voltage */}
              <NewtonianAttractorSwarm
                attractorX={0}
                attractorY={-40}
                particleCount={18}
                theme="NEO_BRUTALIST"
                beatPulse={scalePulse}
              />
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
        targetY={668}
      />

      {/* 5. STYLE-AWARE ATMOSPHERIC TEXTURE & DEPTH PARTICLES */}
      <StyleAwareAtmosphereLayer camX={camX} camY={camY} />
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
      {/* SFX 1: Cursor Click Tri-Layer Impact (Anticipation + Mechanical Click + Resonance) */}
      <Sequence from={215} durationInFrames={15}>
        <Audio src={staticFile('sfx/remotion_whip.wav')} volume={0.25} />
      </Sequence>
      <Sequence from={219} durationInFrames={30}>
        <Audio src={staticFile('sfx/kenney_mouseclick.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={220} durationInFrames={25}>
        <Audio src={staticFile('sfx/remotion_shutter.wav')} volume={0.35} />
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
