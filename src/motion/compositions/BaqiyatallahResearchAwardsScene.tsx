import React from 'react';
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Easing,
  staticFile,
  Img,
} from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';
import { UniversalCameraRig } from '../camera/UniversalCameraRig';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';

export const BAQIYATALLAH_AWARDS_DURATION = 2387; // ~79.5s @ 30 FPS
export const BAQIYATALLAH_AWARDS_FPS = 30;
export const BAQIYATALLAH_AWARDS_WIDTH = 1920;
export const BAQIYATALLAH_AWARDS_HEIGHT = 1080;

export const BaqiyatallahResearchAwardsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 124 BPM rhythm grid
  const beatPulse = calculateBeatPulse(frame, 124, fps).lightPulse;
  const breathingPulse = 1.0 + beatPulse * 0.015;

  // Dynamic Camera & Spatial Navigation across Open Canvas (>= 920px range, settles at 0 inside each Act)
  const camX = interpolate(
    frame,
    [0, 170, 180, 195, 390, 400, 415, 640, 650, 665, 990, 1000, 1015, 1240, 1250, 1265, 1640, 1650, 1665, 1890, 1900, 1915, 2270, 2280, 2295, 2387],
    [0, 0, 460, 0, 0, -460, 0, 0, 480, 0, 0, -460, 0, 0, 460, 0, 0, -460, 0, 0, 460, 0, 0, -440, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camY = interpolate(
    frame,
    [0, 170, 180, 195, 640, 650, 665, 1240, 1250, 1265, 1890, 1900, 1915, 2387],
    [0, 0, -35, 0, 0, 35, 0, 0, -35, 0, 0, 35, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camScale = interpolate(
    frame,
    [0, 180, 400, 650, 1000, 1250, 1650, 1900, 2280, 2387],
    [1.0, 1.03, 1.0, 1.04, 1.02, 1.04, 1.01, 1.03, 1.02, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  // Background Music Volume Ducking during speech
  const bgmVolume = interpolate(
    frame,
    [0, 30, 2300, 2360, 2387],
    [0.14, 0.07, 0.07, 0.14, 0.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Live interpolated metrics
  const cond1Gauge = interpolate(frame, [680, 860], [0, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scoreBSc = interpolate(frame, [2010, 2090], [0, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scoreMed = interpolate(frame, [2095, 2175], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scorePhD = interpolate(frame, [2180, 2255], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const floatWave = (phaseOffset: number, amp = 8) =>
    Math.round(Math.sin((frame + phaseOffset) * 0.065) * amp);

  return (
    <div
      style={{
        position: 'relative',
        width: BAQIYATALLAH_AWARDS_WIDTH,
        height: BAQIYATALLAH_AWARDS_HEIGHT,
        backgroundColor: '#070a14',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* 1. MASTER AUDIO & SUBTLE VARIED ULTIMATE SFX DIRECTOR */}
      <UniversalSoundDirector
        voiceTrack="audio/baqiyatallah_awards_master_voice.wav"
        voiceVolume={1.0}
        bgmTrack="music/Tech_Live.mp3"
        bgmVolume={bgmVolume}
        themeId="DARK_GRAPHITE_TECH"
      />

      {/* 2. LIVING STUDIO MESH GLASS BACKDROP (ZERO CORNER HUD CLUTTER) */}
      <StudioMeshGlassBackdrop
        camX={camX}
        camY={camY}
        camZ={camScale * 100}
        primaryLightColor="#0284c7"
        accentGlowColor="#06b6d4"
      />

      {/* 3. OPEN-CANVAS 3D NARRATIVE STAGE (NO OUTER SLIDE BOXES) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${camScale * breathingPulse}) translate3d(${Math.round(camX)}px, ${Math.round(camY)}px, 0px)`,
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          zIndex: 10,
        }}
      >
        {/* ============================================================== */}
        {/* ACT 1: INTRO LOGO & PUBLIC RELATIONS EMBLEM (f: 0..180)        */}
        {/* ============================================================== */}
        {frame < 185 && (() => {
          const logoSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 13, stiffness: 120 } });
          const titleSpring = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 14, stiffness: 130 } });
          const subSpring = spring({ frame: Math.max(0, frame - 26), fps, config: { damping: 15, stiffness: 125 } });
          const actOpacity = interpolate(frame, [0, 16, 162, 182], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: actOpacity,
              }}
            >
              {/* Open-canvas orbital ring + floating logo */}
              <div
                style={{
                  position: 'relative',
                  width: 280,
                  height: 280,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 34,
                  transform: `translate3d(0px, ${Math.round((1 - logoSpring) * -45 + floatWave(0, 8))}px, 0px) scale(${logoSpring})`,
                }}
              >
                <svg width={280} height={280} viewBox="0 0 280 280" style={{ position: 'absolute', inset: 0 }}>
                  <circle
                    cx={140}
                    cy={140}
                    r={132}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    strokeDasharray="22 14"
                    strokeDashoffset={Math.round(-frame * 2)}
                    strokeOpacity={0.7}
                  />
                </svg>
                <div
                  style={{
                    width: 210,
                    height: 210,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, #e0f2fe 100%)',
                    boxShadow: '0 0 60px rgba(6, 182, 212, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                  }}
                >
                  <Img
                    src={staticFile('logos/pr_logo.png')}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 58,
                  fontWeight: 900,
                  color: '#ffffff',
                  transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 35)}px, 0px) scale(${titleSpring})`,
                  opacity: titleSpring,
                  textShadow: '0 8px 32px rgba(0,0,0,0.9), 0 0 30px rgba(6,182,212,0.55)',
                }}
              >
                {sanitizeForDisplay('روابط عمومی کمیته تحقیقات')}
              </h1>

              <p
                style={{
                  margin: '14px 0 0 0',
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#38bdf8',
                  transform: `translate3d(0px, ${Math.round((1 - subSpring) * 28)}px, 0px)`,
                  opacity: subSpring,
                  textShadow: '0 4px 20px rgba(0,0,0,0.85)',
                }}
              >
                {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
              </p>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 2: INQUIRY & CATALYST CONSTELLATION (f: 180..400)          */}
        {/* ============================================================== */}
        {frame >= 175 && frame < 405 && (() => {
          const localF = Math.max(0, frame - 180);
          const badgeS = spring({ frame: localF, fps, config: { damping: 14, stiffness: 130 } });
          const headS = spring({ frame: Math.max(0, localF - 8), fps, config: { damping: 14, stiffness: 120 } });
          const lineDraw = interpolate(localF, [12, 48], [900, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const actOpacity = interpolate(frame, [175, 192, 385, 405], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const pillars = [
            { title: 'مقالات ISI و Scopus', icon: '📄', score: 'پژوهش اصیل' },
            { title: 'طرح‌های فناورانه و اختراع', icon: '💡', score: 'نوآوری سلامت' },
            { title: 'کتاب، گرنت و جوایز', icon: '🏆', score: 'افتخارات علمی' },
          ];

          return (
            <div
              style={{
                position: 'absolute',
                width: 1340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: actOpacity,
              }}
            >
              {/* Floating pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 26px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(6, 182, 212, 0.18)',
                  marginBottom: 24,
                  transform: `translate3d(0px, ${Math.round((1 - badgeS) * -28)}px, 0px) scale(${badgeS})`,
                  opacity: badgeS,
                }}
              >
                <span style={{ fontSize: 28 }}>🌟</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#38bdf8' }}>
                  {sanitizeForDisplay('فراخوان ملی انتخاب نخبگان وزارت بهداشت')}
                </span>
              </div>

              {/* Open-canvas Hero Headline */}
              <h2
                style={{
                  fontSize: 62,
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.38,
                  margin: '0 0 48px 0',
                  textAlign: 'center',
                  transform: `translate3d(0px, ${Math.round((1 - headS) * 36)}px, 0px) scale(${headS})`,
                  opacity: headS,
                  textShadow: '0 10px 36px rgba(0,0,0,0.9), 0 0 32px rgba(56,189,248,0.4)',
                }}
              >
                {sanitizeForDisplay('دانشجوی پژوهشگر یا فناور برجسته کشور')}
              </h2>

              {/* SVG Constellation Connecting Line */}
              <svg width={1100} height={80} viewBox="0 0 1100 80" style={{ position: 'absolute', top: 245, pointerEvents: 'none' }}>
                <path
                  d="M 150 40 Q 550 -10 950 40"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  strokeDasharray={900}
                  strokeDashoffset={Math.round(lineDraw)}
                  strokeOpacity={0.5}
                />
              </svg>

              {/* Staggered Floating Constellation Nodes */}
              <div style={{ display: 'flex', gap: 56, justifyContent: 'center', width: '100%' }}>
                {pillars.map((item, idx) => {
                  const nodeS = spring({
                    frame: Math.max(0, localF - (18 + idx * 12)),
                    fps,
                    config: { damping: 13, stiffness: 125 },
                  });
                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 12,
                        transform: `translate3d(0px, ${Math.round((1 - nodeS) * 44 + floatWave(idx * 22, 7))}px, 0px) scale(${nodeS})`,
                        opacity: nodeS,
                      }}
                    >
                      <div
                        style={{
                          width: 96,
                          height: 96,
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(56,189,248,0.28) 0%, transparent 75%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 54,
                        }}
                      >
                        {item.icon}
                      </div>
                      <span
                        style={{
                          fontSize: 28,
                          fontWeight: 900,
                          color: '#ffffff',
                          textShadow: '0 6px 20px rgba(0,0,0,0.9)',
                        }}
                      >
                        {sanitizeForDisplay(item.title)}
                      </span>
                      <span style={{ fontSize: 20, fontWeight: 700, color: '#38bdf8' }}>
                        {sanitizeForDisplay(item.score)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 3: OPEN-CANVAS GUIDELINE CONSTELLATION (f: 400..650)       */}
        {/* ============================================================== */}
        {frame >= 395 && frame < 655 && (() => {
          const localF = Math.max(0, frame - 400);
          const titleS = spring({ frame: localF, fps, config: { damping: 14, stiffness: 120 } });
          const numS = spring({ frame: Math.max(0, localF - 10), fps, config: { damping: 12, stiffness: 130 } });
          const beamDraw = interpolate(localF, [8, 45], [1000, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const actOpacity = interpolate(frame, [395, 415, 635, 655], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const steps = [
            { step: 'گام اول', label: 'احراز شروط سه‌گانه', icon: '✅', color: '#10b981' },
            { step: 'گام دوم', label: 'توزیع در ۶ ماده آیین‌نامه', icon: '📊', color: '#06b6d4' },
            { step: 'گام سوم', label: 'کسب حدنصاب قبولی مقطع', icon: '🎯', color: '#f59e0b' },
          ];

          return (
            <div
              style={{
                position: 'absolute',
                width: 1420,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 48,
                opacity: actOpacity,
              }}
            >
              {/* Top Spatial Row: Sculptural '3' Monument + Open-Canvas Guideline Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 60 }}>
                <div
                  style={{
                    flex: 1,
                    transform: `translate3d(0px, ${Math.round((1 - titleS) * 34)}px, 0px) scale(${titleS})`,
                    opacity: titleS,
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8', marginBottom: 12 }}>
                    {sanitizeForDisplay('سند رسمی وزارت بهداشت // ماده ۲ بند ک')}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 54,
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1.35,
                      textShadow: '0 8px 30px rgba(0,0,0,0.9)',
                    }}
                  >
                    {sanitizeForDisplay('دستورالعمل بند «کاف»، ماده ۲ آیین‌نامه')}
                  </h3>
                  <p style={{ margin: '16px 0 0 0', fontSize: 28, fontWeight: 600, color: '#cbd5e1', lineHeight: 1.55 }}>
                    {sanitizeForDisplay('مسیر جامع، دقیق و شفاف ارزیابی فعالیت‌های پژوهشی و فناورانه دانشجویان')}
                  </p>
                </div>

                {/* Monumental Open-Canvas Number '3' with Orbital SVG Ring */}
                <div
                  style={{
                    width: 280,
                    height: 280,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translate3d(0px, ${Math.round((1 - numS) * -40 + floatWave(15, 9))}px, 0px) scale(${numS})`,
                    opacity: numS,
                  }}
                >
                  <svg width={280} height={280} viewBox="0 0 280 280" style={{ position: 'absolute', inset: 0 }}>
                    <circle
                      cx={140}
                      cy={140}
                      r={126}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth={3}
                      strokeDasharray={800}
                      strokeDashoffset={Math.round(800 * (1 - numS))}
                    />
                  </svg>
                  <span style={{ fontSize: 96, fontWeight: 900, color: '#ffffff', textShadow: '0 0 40px #0ea5e9', lineHeight: 1 }}>
                    ۳
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8' }}>
                    {sanitizeForDisplay('شرط اساسی ورود')}
                  </span>
                </div>
              </div>

              {/* SVG Connecting Conduit across the 3 Steps */}
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <svg width={1200} height={40} viewBox="0 0 1200 40" style={{ position: 'absolute', top: 28, pointerEvents: 'none' }}>
                  <line
                    x1={140}
                    y1={20}
                    x2={1060}
                    y2={20}
                    stroke="#06b6d4"
                    strokeWidth={3}
                    strokeDasharray={1000}
                    strokeDashoffset={Math.round(beamDraw)}
                    strokeOpacity={0.45}
                  />
                </svg>

                {steps.map((s, i) => {
                  const stepS = spring({
                    frame: Math.max(0, localF - (22 + i * 12)),
                    fps,
                    config: { damping: 13, stiffness: 125 },
                  });
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        zIndex: 2,
                        transform: `translate3d(0px, ${Math.round((1 - stepS) * 38 + floatWave(i * 20, 6))}px, 0px) scale(${stepS})`,
                        opacity: stepS,
                      }}
                    >
                      <div style={{ fontSize: 48 }}>{s.icon}</div>
                      <div style={{ fontSize: 18, color: s.color, fontWeight: 900 }}>{sanitizeForDisplay(s.step)}</div>
                      <div style={{ fontSize: 25, color: '#ffffff', fontWeight: 900, textShadow: '0 4px 18px rgba(0,0,0,0.9)' }}>
                        {sanitizeForDisplay(s.label)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 4: CONDITION 1 - GPA 16 OPEN GAUGE (f: 650..1000)          */}
        {/* ============================================================== */}
        {frame >= 645 && frame < 1005 && (() => {
          const localF = Math.max(0, frame - 650);
          const gaugeS = spring({ frame: localF, fps, config: { damping: 13, stiffness: 115 } });
          const textS = spring({ frame: Math.max(0, localF - 12), fps, config: { damping: 14, stiffness: 125 } });
          const descS = spring({ frame: Math.max(0, localF - 24), fps, config: { damping: 15, stiffness: 120 } });
          const actOpacity = interpolate(frame, [645, 665, 985, 1005], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const arcCircumference = 2 * Math.PI * 145;
          const arcOffset = arcCircumference * (1 - (cond1Gauge / 20));

          return (
            <div
              style={{
                position: 'absolute',
                width: 1320,
                display: 'flex',
                gap: 72,
                alignItems: 'center',
                opacity: actOpacity,
              }}
            >
              {/* Left: Open-Canvas Sculptural SVG Gauge (Zero Box) */}
              <div
                style={{
                  width: 360,
                  height: 360,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `translate3d(0px, ${Math.round((1 - gaugeS) * -40 + floatWave(0, 8))}px, 0px) scale(${gaugeS})`,
                  opacity: gaugeS,
                }}
              >
                <svg width={360} height={360} viewBox="0 0 360 360" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                  <circle cx={180} cy={180} r={145} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={16} />
                  <circle
                    cx={180}
                    cy={180}
                    r={145}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={16}
                    strokeLinecap="round"
                    strokeDasharray={Math.round(arcCircumference)}
                    strokeDashoffset={Math.round(arcOffset)}
                  />
                </svg>
                <span style={{ fontSize: 84, fontWeight: 900, color: '#ffffff', textShadow: '0 0 35px rgba(16,185,129,0.5)' }}>
                  {cond1Gauge.toFixed(1)}
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#10b981' }}>
                  {sanitizeForDisplay('از ۲۰ // حداقل معدل مجاز')}
                </span>
              </div>

              {/* Right: Staggered Open-Canvas Typography */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#10b981',
                    transform: `translate3d(0px, ${Math.round((1 - textS) * 24)}px, 0px)`,
                    opacity: textS,
                  }}
                >
                  {sanitizeForDisplay('● شرط اول از شروط ۳ گانه')}
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: 54,
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1.38,
                    transform: `translate3d(0px, ${Math.round((1 - textS) * 36)}px, 0px) scale(${textS})`,
                    opacity: textS,
                    textShadow: '0 8px 30px rgba(0,0,0,0.9)',
                  }}
                >
                  {sanitizeForDisplay('معدل کل شما در مقطع فعلی باید حداقل ۱۶ باشد')}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#cbd5e1',
                    lineHeight: 1.65,
                    transform: `translate3d(0px, ${Math.round((1 - descS) * 30)}px, 0px)`,
                    opacity: descS,
                    textShadow: '0 4px 18px rgba(0,0,0,0.85)',
                  }}
                >
                  {sanitizeForDisplay('این شرط بدون ارفاق بوده و پیش‌نیاز بررسی پرونده پژوهشی در کلیه مقاطع کارشناسی، پزشکی عمومی و تحصیلات تکمیلی است.')}
                </p>
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 5: CONDITION 2 - YEARS & DISCIPLINE NODES (f: 1000..1250)  */}
        {/* ============================================================== */}
        {frame >= 995 && frame < 1255 && (() => {
          const localF = Math.max(0, frame - 1000);
          const leftS = spring({ frame: localF, fps, config: { damping: 13, stiffness: 120 } });
          const rightS = spring({ frame: Math.max(0, localF - 14), fps, config: { damping: 13, stiffness: 120 } });
          const linkDraw = interpolate(localF, [6, 36], [400, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const actOpacity = interpolate(frame, [995, 1015, 1235, 1255], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div
              style={{
                position: 'absolute',
                width: 1360,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 80,
                opacity: actOpacity,
              }}
            >
              {/* Node 1: Academic Years */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: `translate3d(0px, ${Math.round((1 - leftS) * 45 + floatWave(0, 8))}px, 0px) scale(${leftS})`,
                  opacity: leftS,
                }}
              >
                <div style={{ fontSize: 78, marginBottom: 16 }}>⏳</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 8 }}>
                  {sanitizeForDisplay('بخش اول شرط دوم')}
                </div>
                <h4 style={{ margin: 0, fontSize: 46, fontWeight: 900, color: '#ffffff', textShadow: '0 8px 28px rgba(0,0,0,0.9)' }}>
                  {sanitizeForDisplay('سنوات مجاز تحصیلی')}
                </h4>
                <p style={{ margin: '18px 0 0 0', fontSize: 25, color: '#cbd5e1', lineHeight: 1.6 }}>
                  {sanitizeForDisplay('دانشجو باید در سقف سنوات قانونی مصوب شورای آموزشی دانشگاه در حال تحصیل باشد.')}
                </p>
              </div>

              {/* Central SVG Constellation Bridge */}
              <svg width={180} height={120} viewBox="0 0 180 120" style={{ flexShrink: 0 }}>
                <line
                  x1={10}
                  y1={60}
                  x2={170}
                  y2={60}
                  stroke="#10b981"
                  strokeWidth={4}
                  strokeDasharray={400}
                  strokeDashoffset={Math.round(linkDraw)}
                />
                <circle cx={90} cy={60} r={12} fill="#10b981" />
              </svg>

              {/* Node 2: Disciplinary Committee */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: `translate3d(0px, ${Math.round((1 - rightS) * 45 + floatWave(25, 8))}px, 0px) scale(${rightS})`,
                  opacity: rightS,
                }}
              >
                <div style={{ fontSize: 78, marginBottom: 16 }}>🛡️</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981', marginBottom: 8 }}>
                  {sanitizeForDisplay('بخش دوم شرط دوم')}
                </div>
                <h4 style={{ margin: 0, fontSize: 46, fontWeight: 900, color: '#ffffff', textShadow: '0 8px 28px rgba(0,0,0,0.9)' }}>
                  {sanitizeForDisplay('تأییدیه کمیته انضباطی')}
                </h4>
                <p style={{ margin: '18px 0 0 0', fontSize: 25, color: '#cbd5e1', lineHeight: 1.6 }}>
                  {sanitizeForDisplay('اخذ تأییدیه رسمی حسن اخلاق و عدم وجود محکومیت قطعی انضباطی الزامی است.')}
                </p>
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 6: CONDITION 3 - 6 ARTICLES CONSTELLATION (f: 1250..1650)  */}
        {/* ============================================================== */}
        {frame >= 1245 && frame < 1655 && (() => {
          const localF = Math.max(0, frame - 1250);
          const headS = spring({ frame: localF, fps, config: { damping: 14, stiffness: 125 } });
          const actOpacity = interpolate(frame, [1245, 1265, 1635, 1655], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const articles = [
            { num: 'ماده ۱', name: 'مقاله پژوهشی', icon: '📝', mandatory: true },
            { num: 'ماده ۲', name: 'فعالیت فناورانه', icon: '🔬', mandatory: true },
            { num: 'ماده ۳', name: 'کتاب تخصصی', icon: '📚', mandatory: false },
            { num: 'ماده ۴', name: 'همایش و کنگره', icon: '🎤', mandatory: false },
            { num: 'ماده ۵', name: 'طرح تحقیقاتی', icon: '📊', mandatory: false },
            { num: 'ماده ۶', name: 'جوایز و المپیاد', icon: '🏅', mandatory: false },
          ];

          return (
            <div
              style={{
                position: 'absolute',
                width: 1440,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 44,
                opacity: actOpacity,
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  transform: `translate3d(0px, ${Math.round((1 - headS) * 34)}px, 0px) scale(${headS})`,
                  opacity: headS,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 900, color: '#f59e0b', marginBottom: 10 }}>
                  {sanitizeForDisplay('شرط سوم // حضور مقاله یا فعالیت فناورانه اجباری است')}
                </div>
                <h3 style={{ margin: 0, fontSize: 52, fontWeight: 900, color: '#ffffff', textShadow: '0 8px 30px rgba(0,0,0,0.9)' }}>
                  {sanitizeForDisplay('کسب امتیاز حداقل از ۶ ماده مختلف آیین‌نامه')}
                </h3>
              </div>

              {/* 6 Staggered Floating Constellation Nodes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 28, width: '100%' }}>
                {articles.map((art, idx) => {
                  const itemS = spring({
                    frame: Math.max(0, localF - (14 + idx * 10)),
                    fps,
                    config: { damping: 13, stiffness: 130 },
                  });
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 10,
                        transform: `translate3d(0px, ${Math.round((1 - itemS) * 42 + floatWave(idx * 16, 7))}px, 0px) scale(${itemS})`,
                        opacity: itemS,
                      }}
                    >
                      <div
                        style={{
                          width: 92,
                          height: 92,
                          borderRadius: '50%',
                          background: art.mandatory
                            ? 'radial-gradient(circle, rgba(245,158,11,0.32) 0%, transparent 72%)'
                            : 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, transparent 72%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 46,
                        }}
                      >
                        {art.icon}
                      </div>
                      <span style={{ fontSize: 18, fontWeight: 800, color: art.mandatory ? '#fbbf24' : '#38bdf8' }}>
                        {sanitizeForDisplay(art.num)}
                      </span>
                      <span style={{ fontSize: 22, fontWeight: 900, color: '#ffffff', textShadow: '0 4px 16px rgba(0,0,0,0.9)' }}>
                        {sanitizeForDisplay(art.name)}
                      </span>
                      {art.mandatory && (
                        <span style={{ fontSize: 15, fontWeight: 900, color: '#f87171' }}>
                          {sanitizeForDisplay('★ الزامی')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 7: TIME LIMIT VECTOR TIMELINE (f: 1650..1900)              */}
        {/* ============================================================== */}
        {frame >= 1645 && frame < 1905 && (() => {
          const localF = Math.max(0, frame - 1650);
          const headS = spring({ frame: localF, fps, config: { damping: 14, stiffness: 120 } });
          const lineProgress = interpolate(localF, [14, 52], [1100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const actOpacity = interpolate(frame, [1645, 1665, 1885, 1905], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const milestones = [
            { icon: '🎓', title: 'طول دوران تحصیل', sub: 'پذیرش ۱۰۰٪ مدارک', color: '#38bdf8' },
            { icon: '📜', title: 'تاریخ فارغ‌التحصیلی', sub: 'آغاز مهلت نهایی', color: '#f59e0b' },
            { icon: '🛑', title: 'حداکثر تا ۱ سال بعد', sub: 'پایان مهلت قانونی', color: '#ef4444' },
          ];

          return (
            <div
              style={{
                position: 'absolute',
                width: 1340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 54,
                opacity: actOpacity,
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  transform: `translate3d(0px, ${Math.round((1 - headS) * 34)}px, 0px) scale(${headS})`,
                  opacity: headS,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 900, color: '#fbbf24', marginBottom: 12 }}>
                  {sanitizeForDisplay('⚠️ نکته بسیار مهم و حیاتی')}
                </div>
                <h3 style={{ margin: 0, fontSize: 48, fontWeight: 900, color: '#ffffff', lineHeight: 1.4, textShadow: '0 8px 30px rgba(0,0,0,0.9)' }}>
                  {sanitizeForDisplay('تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد')}
                </h3>
              </div>

              {/* Open-Canvas Vector Timeline with Staggered Milestones */}
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <svg width={1140} height={40} viewBox="0 0 1140 40" style={{ position: 'absolute', top: 32, pointerEvents: 'none' }}>
                  <line
                    x1={120}
                    y1={20}
                    x2={1020}
                    y2={20}
                    stroke="#f59e0b"
                    strokeWidth={4}
                    strokeDasharray={1100}
                    strokeDashoffset={Math.round(lineProgress)}
                  />
                </svg>

                {milestones.map((m, idx) => {
                  const mSpring = spring({
                    frame: Math.max(0, localF - (18 + idx * 14)),
                    fps,
                    config: { damping: 13, stiffness: 125 },
                  });
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 2,
                        transform: `translate3d(0px, ${Math.round((1 - mSpring) * 38 + floatWave(idx * 20, 6))}px, 0px) scale(${mSpring})`,
                        opacity: mSpring,
                      }}
                    >
                      <div style={{ fontSize: 52 }}>{m.icon}</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: m.color, marginTop: 10 }}>
                        {sanitizeForDisplay(m.title)}
                      </div>
                      <div style={{ fontSize: 19, fontWeight: 700, color: '#e2e8f0', marginTop: 4 }}>
                        {sanitizeForDisplay(m.sub)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 8: SCULPTURAL SCORE CONSTELLATION: 65, 110, 130 (f: 1900..2280) */}
        {/* ============================================================== */}
        {frame >= 1895 && frame < 2285 && (() => {
          const localF = Math.max(0, frame - 1900);
          const headS = spring({ frame: localF, fps, config: { damping: 14, stiffness: 120 } });
          const actOpacity = interpolate(frame, [1895, 1915, 2265, 2285], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const tiers = [
            { title: 'مقطع کارشناسی', val: scoreBSc, sub: 'دانشگاه‌های تیپ یک', color: '#06b6d4', active: frame >= 2030 && frame < 2110 },
            { title: 'پزشکی عمومی', val: scoreMed, sub: 'دکتری حرفه‌ای پزشکی', color: '#0ea5e9', active: frame >= 2110 && frame < 2190 },
            { title: 'دکترای تخصصی (Ph.D)', val: scorePhD, sub: 'دستیاری و دکترای تخصصی', color: '#f59e0b', active: frame >= 2190 },
          ];

          return (
            <div
              style={{
                position: 'absolute',
                width: 1420,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 48,
                opacity: actOpacity,
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  transform: `translate3d(0px, ${Math.round((1 - headS) * 32)}px, 0px) scale(${headS})`,
                  opacity: headS,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8', marginBottom: 10 }}>
                  {sanitizeForDisplay('جدول حدنصاب قبولی آیین‌نامه')}
                </div>
                <h3 style={{ margin: 0, fontSize: 50, fontWeight: 900, color: '#ffffff', textShadow: '0 8px 30px rgba(0,0,0,0.9)' }}>
                  {sanitizeForDisplay('حدنصاب قبولی بسته به مقطع تحصیلی (دانشگاه‌های تیپ ۱)')}
                </h3>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', gap: 48 }}>
                {tiers.map((t, idx) => {
                  const tierS = spring({
                    frame: Math.max(0, localF - (16 + idx * 14)),
                    fps,
                    config: { damping: 13, stiffness: 125 },
                  });
                  const activeBoost = t.active ? 1.12 : 1.0;
                  const ringCirc = 2 * Math.PI * 110;
                  const ringOffset = ringCirc * (1 - t.val / 130);

                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transform: `translate3d(0px, ${Math.round((1 - tierS) * 44 + floatWave(idx * 24, 7))}px, 0px) scale(${tierS * activeBoost})`,
                        opacity: tierS,
                      }}
                    >
                      <span style={{ fontSize: 26, fontWeight: 900, color: t.color, marginBottom: 16 }}>
                        {sanitizeForDisplay(t.title)}
                      </span>

                      <div style={{ position: 'relative', width: 240, height: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width={240} height={240} viewBox="0 0 240 240" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                          <circle cx={120} cy={120} r={110} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={12} />
                          <circle
                            cx={120}
                            cy={120}
                            r={110}
                            fill="none"
                            stroke={t.color}
                            strokeWidth={12}
                            strokeLinecap="round"
                            strokeDasharray={Math.round(ringCirc)}
                            strokeDashoffset={Math.round(ringOffset)}
                          />
                        </svg>
                        <span style={{ fontSize: 78, fontWeight: 900, color: '#ffffff', textShadow: `0 0 30px ${t.color}` }}>
                          {t.val.toFixed(0)}
                        </span>
                        <span style={{ fontSize: 20, fontWeight: 800, color: t.color }}>
                          {sanitizeForDisplay('امتیاز')}
                        </span>
                      </div>

                      <span style={{ fontSize: 20, fontWeight: 700, color: '#cbd5e1', marginTop: 16 }}>
                        {sanitizeForDisplay(t.sub)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* ACT 9: OUTRO BOOKEND WITH DUAL LOGOS (f: 2280..2387)           */}
        {/* ============================================================== */}
        {frame >= 2275 && (() => {
          const localF = Math.max(0, frame - 2280);
          const logo1S = spring({ frame: localF, fps, config: { damping: 13, stiffness: 120 } });
          const logo2S = spring({ frame: Math.max(0, localF - 10), fps, config: { damping: 13, stiffness: 120 } });
          const textS = spring({ frame: Math.max(0, localF - 20), fps, config: { damping: 14, stiffness: 125 } });
          const actOpacity = interpolate(frame, [2275, 2298, 2362, 2387], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: actOpacity,
              }}
            >
              <div style={{ display: 'flex', gap: 72, alignItems: 'center', marginBottom: 40 }}>
                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, #e0f2fe 100%)',
                    boxShadow: '0 0 55px rgba(6, 182, 212, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    transform: `translate3d(0px, ${Math.round((1 - logo1S) * -40 + floatWave(0, 7))}px, 0px) scale(${logo1S})`,
                    opacity: logo1S,
                  }}
                >
                  <Img
                    src={staticFile('logos/university_logo.png')}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #ffffff 0%, #dcfce7 100%)',
                    boxShadow: '0 0 55px rgba(16, 185, 129, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    transform: `translate3d(0px, ${Math.round((1 - logo2S) * -40 + floatWave(20, 7))}px, 0px) scale(${logo2S})`,
                    opacity: logo2S,
                  }}
                >
                  <Img
                    src={staticFile('logos/committee_logo.png')}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: 52,
                  fontWeight: 900,
                  color: '#ffffff',
                  transform: `translate3d(0px, ${Math.round((1 - textS) * 32)}px, 0px) scale(${textS})`,
                  opacity: textS,
                  textShadow: '0 8px 30px rgba(0,0,0,0.9)',
                }}
              >
                {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
              </h2>
              <p
                style={{
                  margin: '12px 0 0 0',
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#38bdf8',
                  transform: `translate3d(0px, ${Math.round((1 - textS) * 24)}px, 0px)`,
                  opacity: textS,
                }}
              >
                {sanitizeForDisplay('کمیته تحقیقات و فناوری دانشجویی • با ما همراه باشید!')}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
