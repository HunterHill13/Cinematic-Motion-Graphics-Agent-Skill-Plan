/**
 * ============================================================================
 * CLAUDE PERSIAN SHOWREEL MASTERPIECE (ONE-TAKE CONTINUOUS PERSIAN MOTION)
 * ============================================================================
 * 
 * The ultimate Persian showcase combining:
 * 1. 6-DOF Virtual Camera continuity without any slideshow cuts.
 * 2. Real SVG Vector Path Morphing via @remotion/paths (Star -> Brain -> Wave -> Shield).
 * 3. Pristine Persian Typography with authentic Yekan Bakh weights and RTL layout.
 * 4. Living Energy Conduit ("The Red Thread") traversing all 4 acts continuously.
 * 5. High-end Glassmorphic Art Direction matching viral Claude Opus 5.5 motion designs.
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { AtmosphericBackdrop } from '../library/AtmosphericBackdrop';
import { PersianVectorMorphCard } from '../recipes/PersianVectorMorphRecipe';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { loadYekanBakhFonts } from '../../fonts/yekanBakh';

// Load Yekan Bakh fonts at module initialization
if (typeof window !== 'undefined') {
  loadYekanBakhFonts().catch((e) => console.warn('Font load warning:', e));
}

export const CLAUDE_PERSIAN_DURATION = 450; // 15.0s @ 30 FPS
export const CLAUDE_PERSIAN_FPS = 30;
export const CLAUDE_PERSIAN_WIDTH = 1920;
export const CLAUDE_PERSIAN_HEIGHT = 1080;

export const ClaudePersianShowreelContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. CONTINUOUS 6-DOF VIRTUAL CAMERA
  // =========================================================================
  const camX = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 365, 450],
    [0, 0, 30, 30, -160, -160, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camY = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 365, 450],
    [0, 0, 15, 15, -25, -25, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camZ = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 365, 450],
    [0, 70, 130, 130, 85, 85, -80, -80],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camPitch = interpolate(
    frame,
    [0, 210, 250, 325, 365, 450],
    [0, 0, 12, 12, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camYaw = interpolate(
    frame,
    [0, 210, 250, 325, 365, 450],
    [0, 0, -8, -8, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camRoll = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 450],
    [0, 0, -1.5, 0, 1.2, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // =========================================================================
  // 2. LIVING ENERGY CONDUIT ("THE PERSIAN THREAD")
  // =========================================================================
  let conduitX = 960;
  let conduitY = 540;
  let conduitGlow = '#06b6d4';

  if (frame < 95) {
    // Act 1: Orbits the hero Persian emblem
    const angle = (frame / 35) * Math.PI * 2;
    conduitX = 960 + Math.cos(angle) * 280;
    conduitY = 440 + Math.sin(angle) * 40;
    conduitGlow = '#38bdf8';
  } else if (frame < 125) {
    // Transition 1->2: Dives into the vector morphing center
    const t = (frame - 95) / 30;
    conduitX = interpolate(t, [0, 1], [960 + 280, 960], { easing: Easing.out(Easing.cubic) });
    conduitY = interpolate(t, [0, 1], [440, 540], { easing: Easing.out(Easing.cubic) });
    conduitGlow = '#8b5cf6';
  } else if (frame < 155) {
    // Act 2: Traces the circular perimeter of the morphing shape
    const angle = ((frame - 125) / 25) * Math.PI * 2;
    conduitX = 960 + Math.cos(angle) * 35;
    conduitY = 540 + Math.sin(angle) * 35;
    conduitGlow = '#a855f7';
  } else if (frame < 220) {
    // Traces across the morph card upper rim
    const t = (frame - 155) / 65;
    conduitX = interpolate(t, [0, 1], [650, 1270]);
    conduitY = 440;
    conduitGlow = '#10b981';
  } else if (frame < 300) {
    // Act 3: Enters SaaS window and draws the live telemetry sparkline!
    const chartProgress = interpolate(frame, [225, 295], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    });
    conduitX = 540 + chartProgress * 460;
    conduitY = 620 - Math.pow(chartProgress, 0.8) * 160;
    conduitGlow = '#38bdf8';
  } else if (frame < 360) {
    // Transition 3->4: Vaults across 2.5D space to the sovereign gauge
    const t = (frame - 300) / 60;
    conduitX = interpolate(t, [0, 1], [1000, 1140], { easing: Easing.inOut(Easing.cubic) });
    conduitY = interpolate(t, [0, 1], [460, 535], { easing: Easing.inOut(Easing.cubic) });
    conduitGlow = '#c084fc';
  } else {
    // Act 4: Locks into orbital calibration path around circular gauge
    const gaugeAngle = interpolate(frame, [360, 440], [-Math.PI / 2, Math.PI * 2.5], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    conduitX = 1140 + Math.cos(gaugeAngle) * 60;
    conduitY = 535 + Math.sin(gaugeAngle) * 60;
    conduitGlow = '#10b981';
  }

  // =========================================================================
  // 3. ACT-SPECIFIC VISUAL STATES
  // =========================================================================

  // Act 1: Sovereign Persian Hero Monolith (0..115)
  const act1Opacity = interpolate(frame, [85, 115], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act1Scale = interpolate(frame, [85, 115], [1, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Act 2: Persian Vector Morphing Recipe (95..240)
  const morphVisible = frame >= 95 && frame < 240;
  const morphOpacity = interpolate(frame, [95, 110, 220, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const morphScale = interpolate(frame, [95, 110, 220, 240], [0.85, 1, 1, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Act 3: SaaS Isometric Control Center (210..450)
  const saasVisible = frame >= 210;
  const saasEntrance = spring({
    frame: Math.max(0, frame - 215),
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });

  // When transitioning to Act 4 (325..365), SaaS console smoothly slides to right flank (RTL aesthetic)
  const saasDockX = interpolate(frame, [325, 365], [0, -380], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const saasDockScale = interpolate(frame, [325, 365], [1.0, 0.88], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Act 4: Grand Sovereign Dual-Wing Calibration Climax (335..450)
  const act4Visible = frame >= 335;
  const act4Spring = spring({
    frame: Math.max(0, frame - 338),
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 130 },
  });

  const gaugePercent = interpolate(frame, [355, 430], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const sparklineLength = interpolate(frame, [225, 295], [0, 460], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#020617',
        fontFamily: "'YekanBakh', 'Yekan Bakh', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        direction: 'rtl',
      }}
    >
      {/* 1. ATMOSPHERIC BACKDROP */}
      <AtmosphericBackdrop
        primaryGlowColor="#38bdf8"
        secondaryGlowColor="#6366f1"
        showGrid={true}
        gridSpeed={0.8}
      />

      {/* 2. PERSISTENT 6-DOF CAMERA STAGE */}
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
          {/* ACT 1: SOVEREIGN PERSIAN HERO MONOLITH (0..115)                   */}
          {/* ================================================================= */}
          {frame < 125 && (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                opacity: act1Opacity,
                transform: `scale(${act1Scale}) translateZ(40px)`,
                pointerEvents: 'none',
              }}
            >
              {/* Persian Floating Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 24px',
                  borderRadius: 30,
                  background: 'rgba(30, 41, 59, 0.75)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.25)',
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#38bdf8',
                    boxShadow: '0 0 12px #38bdf8',
                  }}
                />
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#e0f2fe',
                    letterSpacing: 0.5,
                  }}
                >
                  {sanitizeForDisplay('هوش مصنوعی پیشرفته · نسل پنجم کلاد اوپوس')}
                </span>
              </div>

              {/* Grand Persian Title */}
              <h1
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: 0,
                  marginBottom: 16,
                  lineHeight: 1.25,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                  background: 'linear-gradient(135deg, #ffffff 40%, #93c5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {sanitizeForDisplay('معماری موشن‌گرافیک سینمایی')}
              </h1>

              {/* Persian Subtitle */}
              <p
                style={{
                  fontSize: 21,
                  fontWeight: 400,
                  color: '#94a3b8',
                  maxWidth: 780,
                  margin: 0,
                  marginBottom: 36,
                  lineHeight: 1.6,
                }}
              >
                {sanitizeForDisplay('پیوستگی کامل دوربین یکپارچه، مورفینگ برداری و آرت‌استایل اختصاصی')}
              </p>

              {/* Decorative Metric Ticker */}
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: '12px 32px',
                  borderRadius: 16,
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>پیوستگی دوربین</div>
                  <div style={{ fontSize: 16, color: '#38bdf8', fontWeight: 800 }}>تک‌پلان (One-Take)</div>
                </div>
                <div style={{ width: 1, height: 32, background: 'rgba(255, 255, 255, 0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>موتور مورفینگ</div>
                  <div style={{ fontSize: 16, color: '#8b5cf6', fontWeight: 800 }}>برداری SVG Path</div>
                </div>
                <div style={{ width: 1, height: 32, background: 'rgba(255, 255, 255, 0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>تایپوگرافی سازمانی</div>
                  <div style={{ fontSize: 16, color: '#10b981', fontWeight: 800 }}>یکان بخ (Yekan Bakh)</div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 2: GENUINE SVG VECTOR MORPHING RECIPE (95..240)               */}
          {/* ================================================================= */}
          {morphVisible && (
            <div
              style={{
                position: 'absolute',
                opacity: morphOpacity,
                transform: `scale(${morphScale}) translateZ(50px)`,
                pointerEvents: 'none',
              }}
            >
              <PersianVectorMorphCard
                startFrame={95}
                width={700}
                height={350}
                glowColor="#38bdf8"
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 3 & 4: 2.5D ISOMETRIC SAAS GLASS CONSOLE (210..450)           */}
          {/* ================================================================= */}
          {saasVisible && (
            <div
              style={{
                position: 'absolute',
                width: 780,
                height: 480,
                opacity: saasEntrance,
                transform: `translate3d(${saasDockX}px, 0px, 60px) scale(${saasDockScale})`,
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                borderRadius: 24,
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 45px rgba(56, 189, 248, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                direction: 'rtl',
              }}
            >
              {/* Window Header */}
              <div
                style={{
                  height: 52,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 24px',
                  background: 'rgba(30, 41, 59, 0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 10px #10b981',
                    }}
                  />
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc' }}>
                    {sanitizeForDisplay('سامانه پایش هوشمند کمیته تحقیقات و فناوری')}
                  </span>
                </div>
                {/* Window Window Controls */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                </div>
              </div>

              {/* Console Body */}
              <div style={{ flex: 1, padding: 24, display: 'flex', gap: 20 }}>
                {/* Left Telemetry Grid (in RTL) */}
                <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Real-time Sparkline Area */}
                  <div
                    style={{
                      flex: 1,
                      background: 'rgba(2, 6, 23, 0.6)',
                      borderRadius: 16,
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      padding: 16,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>
                        {sanitizeForDisplay('نمودار شار تله‌متری سینماتیک')}
                      </span>
                      <span style={{ fontSize: 13, color: '#38bdf8', fontWeight: 700 }}>
                        +۹۹.۴٪ بازدهی
                      </span>
                    </div>

                    {/* SVG Sparkline Graph */}
                    <svg width="100%" height="160" viewBox="0 0 460 160" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 140 Q 80 130 140 100 T 260 70 T 360 30 L 460 20"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3.5"
                        strokeDasharray="460"
                        strokeDashoffset={460 - sparklineLength}
                        style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))' }}
                      />
                    </svg>
                  </div>

                  {/* Status Bar */}
                  <div
                    style={{
                      padding: '12px 18px',
                      background: 'rgba(30, 41, 59, 0.5)',
                      borderRadius: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 13, color: '#cbd5e1' }}>
                      {sanitizeForDisplay('وضعیت سیستم: آماده‌باش تولید و تدوین')}
                    </span>
                    <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700 }}>
                      ● پایدار
                    </span>
                  </div>
                </div>

                {/* Right Agent Status Cards (in RTL) */}
                <div style={{ flex: 0.9, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(15, 23, 42, 0.65)',
                      borderRadius: 14,
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#64748b' }}>ایجنت پردازش فضایی</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>
                      {sanitizeForDisplay('عمق ۲.۵ بعدی و هماهنگی زاویه')}
                    </div>
                    <div style={{ fontSize: 12, color: '#38bdf8', marginTop: 4, fontWeight: 600 }}>
                      نرخ تطابق: ۹۹.۸٪
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(15, 23, 42, 0.65)',
                      borderRadius: 14,
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#64748b' }}>موتور فونت فارسی</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>
                      {sanitizeForDisplay('یکان بخ نسخه طلایی')}
                    </div>
                    <div style={{ fontSize: 12, color: '#10b981', marginTop: 4, fontWeight: 600 }}>
                      بدون پرش، بدون اعراب‌گذاری
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(15, 23, 42, 0.65)',
                      borderRadius: 14,
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#64748b' }}>پیوستگی پلان</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>
                      {sanitizeForDisplay('تک‌پلان بدون کات (One-Take)')}
                    </div>
                    <div style={{ fontSize: 12, color: '#a855f7', marginTop: 4, fontWeight: 600 }}>
                      انرژی ممتد فوکوس
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 4: SOVEREIGN CALIBRATION GAUGE & MILESTONE (335..450)          */}
          {/* ================================================================= */}
          {act4Visible && (
            <div
              style={{
                position: 'absolute',
                width: 440,
                height: 480,
                opacity: act4Spring,
                transform: `translate3d(380px, 0px, 60px) scale(${act4Spring})`,
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                borderRadius: 24,
                border: '1px solid rgba(56, 189, 248, 0.25)',
                boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 50px rgba(16, 185, 129, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 32,
                textAlign: 'center',
                direction: 'rtl',
              }}
            >
              {/* Sovereign Circular Gauge */}
              <div style={{ position: 'relative', width: 170, height: 170, marginBottom: 24 }}>
                <svg width="170" height="170" viewBox="0 0 170 170">
                  {/* Track Circle */}
                  <circle
                    cx="85"
                    cy="85"
                    r="68"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="10"
                  />
                  {/* Active Gradient Meter */}
                  <circle
                    cx="85"
                    cy="85"
                    r="68"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 68}`}
                    strokeDashoffset={`${2 * Math.PI * 68 * (1 - gaugePercent / 100)}`}
                    transform="rotate(-90 85 85)"
                    style={{ filter: 'drop-shadow(0 0 14px rgba(16, 185, 129, 0.7))' }}
                  />
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="60%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Gauge Text */}
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
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    {Math.round(gaugePercent)}٪
                  </span>
                  <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700, marginTop: 4 }}>
                    {sanitizeForDisplay('کالیبراسیون')}
                  </span>
                </div>
              </div>

              {/* Title & Seal Details */}
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#f8fafc',
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                {sanitizeForDisplay('استاندارد کیفی طلایی')}
              </h2>

              <p
                style={{
                  fontSize: 14,
                  color: '#94a3b8',
                  margin: 0,
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                {sanitizeForDisplay('انطباق ۱۰۰٪ با زبان طراحی موشن‌گرافیک کلاد اوپوس ۵.۵')}
              </p>

              <div
                style={{
                  padding: '8px 20px',
                  borderRadius: 20,
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#34d399',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {sanitizeForDisplay('✓ تأییدیه رسمی کمیته تحقیقات')}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* THE PERSISTENT LIVING ENERGY CONDUIT ("THE PERSIAN THREAD")       */}
          {/* ================================================================= */}
          <div
            style={{
              position: 'absolute',
              left: conduitX - 16,
              top: conduitY - 16,
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: conduitGlow,
              boxShadow: `0 0 35px 12px ${conduitGlow}, 0 0 60px 24px ${conduitGlow}66`,
              filter: 'blur(1px)',
              pointerEvents: 'none',
              transform: 'translateZ(90px)',
              transition: 'background 0.2s ease, box-shadow 0.2s ease',
              zIndex: 999,
            }}
          >
            {/* Ultra-bright white hot core */}
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 14px 4px #ffffff',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
