import React, { useMemo } from 'react';
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Easing,
  Audio,
  staticFile,
  Img,
} from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';

export const BAQIYATALLAH_AWARDS_DURATION = 2387; // ~79.5s @ 30 FPS
export const BAQIYATALLAH_AWARDS_FPS = 30;
export const BAQIYATALLAH_AWARDS_WIDTH = 1920;
export const BAQIYATALLAH_AWARDS_HEIGHT = 1080;

export const BaqiyatallahResearchAwardsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 124 BPM rhythm grid
  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Dynamic Camera & Spatial Navigation across Acts
  const camX = interpolate(
    frame,
    [0, 180, 240, 400, 480, 650, 720, 1000, 1060, 1250, 1320, 1650, 1720, 1900, 1980, 2280, 2340],
    [0, 0, 120, 120, 0, 0, -80, -80, 80, 80, 0, 0, 0, 0, 0, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camY = interpolate(
    frame,
    [0, 180, 400, 650, 720, 1000, 1060, 1250, 1320, 1650, 1720, 1900, 1980, 2280],
    [0, 0, 0, 0, -40, -40, -40, -40, 40, 40, 0, 0, -20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camScale = interpolate(
    frame,
    [0, 180, 400, 650, 1000, 1250, 1650, 1900, 2280, 2387],
    [1.0, 1.03, 1.0, 1.05, 1.05, 1.04, 1.02, 1.0, 1.02, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  // Background Music Volume Ducking during speech
  const bgmVolume = interpolate(
    frame,
    [0, 30, 2300, 2360, 2387],
    [0.18, 0.08, 0.08, 0.16, 0.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Spring animations for various scenes
  const introSpring = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, stiffness: 100 } });
  const hookSpring = spring({ frame: Math.max(0, frame - 185), fps, config: { damping: 14, stiffness: 100 } });
  const bentoGridSpring = spring({ frame: Math.max(0, frame - 405), fps, config: { damping: 14, stiffness: 100 } });
  const cond1Gauge = interpolate(frame, [720, 880], [0, 16], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cond2Spring = spring({ frame: Math.max(0, frame - 1010), fps, config: { damping: 14, stiffness: 100 } });
  const cond3Spring = spring({ frame: Math.max(0, frame - 1260), fps, config: { damping: 14, stiffness: 100 } });
  const cautionSpring = spring({ frame: Math.max(0, frame - 1660), fps, config: { damping: 14, stiffness: 100 } });
  const scoresSpring = spring({ frame: Math.max(0, frame - 1910), fps, config: { damping: 14, stiffness: 100 } });
  const outroSpring = spring({ frame: Math.max(0, frame - 2285), fps, config: { damping: 14, stiffness: 100 } });

  // Score counters for Act 8
  const scoreBSc = interpolate(frame, [2030, 2100], [0, 65], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scoreMed = interpolate(frame, [2110, 2180], [0, 110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scorePhD = interpolate(frame, [2190, 2260], [0, 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      {/* 1. MASTER AUDIO TRACKS */}
      <Audio src={staticFile('audio/baqiyatallah_awards_master_voice.wav')} volume={1.0} />
      <Audio src={staticFile('music/Tech_Live.mp3')} volume={bgmVolume} loop />

      {/* 2. LIVING STUDIO MESH GLASS BACKDROP */}
      <StudioMeshGlassBackdrop
        camX={camX}
        camY={camY}
        camZ={camScale * 100}
        primaryLightColor="#0284c7"
        accentGlowColor="#06b6d4"
      />

      {/* 3. PERSISTENT TOP HUD & BRANDING */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 70,
          right: 70,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#06b6d4',
              boxShadow: '0 0 14px #06b6d4',
            }}
          />
          <span style={{ fontSize: 24, fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.5px' }}>
            {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
          </span>
          <span style={{ color: '#0ea5e9', fontSize: 20, fontWeight: 700 }}>•</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#94a3b8' }}>
            {sanitizeForDisplay('کمیته تحقیقات و فناوری دانشجویی')}
          </span>
        </div>

        <div
          style={{
            padding: '8px 22px',
            borderRadius: 999,
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(2, 132, 199, 0.25) 100%)',
            border: '1.5px solid rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            fontSize: 16,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38bdf8' }} />
          {sanitizeForDisplay('آیین‌نامه استعدادهای درخشان // بند «کاف»')}
        </div>
      </div>

      {/* 4. MAIN NARRATIVE STAGE WITH 3D CAMERA TRAVEL */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${camScale}) translate3d(${camX}px, ${camY}px, 0px)`,
          transition: 'transform 0.4s ease-out',
          zIndex: 10,
        }}
      >
        {/* ============================================================== */}
        {/* ACT 1: INTRO LOGO & PUBLIC RELATIONS EMBLEM (f: 0..180)        */}
        {/* ============================================================== */}
        {frame < 185 && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${introSpring})`,
              opacity: interpolate(frame, [0, 20, 160, 180], [0, 1, 1, 0]),
            }}
          >
            <div
              style={{
                width: 250,
                height: 250,
                borderRadius: 40,
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                border: '2.5px solid rgba(56, 189, 248, 0.8)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(6, 182, 212, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                marginBottom: 32,
              }}
            >
              <Img
                src={staticFile('logos/pr_logo.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                borderRadius: 24,
                padding: '16px 40px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#ffffff',
                  textShadow: '0 4px 20px rgba(6,182,212,0.6)',
                }}
              >
                {sanitizeForDisplay('روابط عمومی کمیته تحقیقات')}
              </h1>
              <p style={{ margin: '8px 0 0 0', fontSize: 26, fontWeight: 700, color: '#38bdf8' }}>
                {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 2: INQUIRY & CATALYST (f: 180..400)                        */}
        {/* ============================================================== */}
        {frame >= 175 && frame < 405 && (
          <div
            style={{
              position: 'absolute',
              width: 1200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${hookSpring})`,
              opacity: interpolate(frame, [175, 195, 385, 405], [0, 1, 1, 0]),
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 14, 26, 0.95) 100%)',
                border: '2px solid rgba(56, 189, 248, 0.4)',
                borderRadius: 32,
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.7), 0 0 60px rgba(2, 132, 199, 0.25)',
                padding: '50px 60px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 24px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid rgba(6, 182, 212, 0.5)',
                  marginBottom: 28,
                }}
              >
                <span style={{ fontSize: 26 }}>🌟</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8' }}>
                  {sanitizeForDisplay('فراخوان ملی انتخاب نخبگان وزارت بهداشت')}
                </span>
              </div>

              <h2
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.45,
                  margin: '0 0 36px 0',
                }}
              >
                {sanitizeForDisplay('دانشجوی پژوهشگر یا فناور برجسته کشور')}
              </h2>

              {/* Research & Tech Iconic Grid */}
              <div style={{ display: 'flex', gap: 28, justifyContent: 'center', width: '100%' }}>
                {[
                  { title: 'مقالات ISI و Scopus', icon: '📄', score: 'پژوهش اصیل' },
                  { title: 'طرح‌های فناورانه و اختراع', icon: '💡', score: 'نوآوری سلامت' },
                  { title: 'کتاب، گرنت و جوایز', icon: '🏆', score: 'افتخارات علمی' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 20,
                      padding: 24,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 44 }}>{item.icon}</span>
                    <span style={{ fontSize: 22, fontWeight: 800, color: '#f8fafc' }}>
                      {sanitizeForDisplay(item.title)}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 600, color: '#38bdf8' }}>
                      {sanitizeForDisplay(item.score)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 3: THE BENTO GRID BLUEPRINT (f: 400..650)                  */}
        {/* ============================================================== */}
        {frame >= 395 && frame < 655 && (
          <div
            style={{
              position: 'absolute',
              width: 1400,
              transform: `scale(${bentoGridSpring})`,
              opacity: interpolate(frame, [395, 415, 635, 655], [0, 1, 1, 0]),
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '840px 520px',
                gridTemplateRows: '320px 240px',
                gap: 24,
                width: '100%',
              }}
            >
              {/* Bento Cell 1: Law & Guideline Master Card */}
              <div
                style={{
                  gridColumn: '1 / 2',
                  gridRow: '1 / 2',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 14, 26, 0.98) 100%)',
                  borderRadius: 28,
                  border: '1.5px solid rgba(56, 189, 248, 0.4)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(6, 182, 212, 0.15)',
                  padding: 36,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8' }}>
                      {sanitizeForDisplay('سند رسمی وزارت بهداشت، درمان و آموزش پزشکی')}
                    </span>
                    <span style={{ padding: '4px 14px', borderRadius: 999, background: 'rgba(56,189,248,0.15)', color: '#38bdf8', fontSize: 14, fontWeight: 700 }}>
                      ماده ۲ // بند ک
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: '#ffffff', lineHeight: 1.4 }}>
                    {sanitizeForDisplay('دستورالعمل بند «کاف»، ماده ۲ آیین‌نامه')}
                  </h3>
                  <p style={{ margin: '12px 0 0 0', fontSize: 24, fontWeight: 600, color: '#94a3b8', lineHeight: 1.5 }}>
                    {sanitizeForDisplay('مسیر جامع، دقیق و شفاف ارزیابی و امتیازدهی به تمامی فعالیت‌های پژوهشی و فناورانه دانشجویان')}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '12px 18px' }}>
                    <div style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>{sanitizeForDisplay('مرجع تصویب')}</div>
                    <div style={{ fontSize: 18, color: '#f8fafc', fontWeight: 800 }}>{sanitizeForDisplay('وزارت بهداشت')}</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '12px 18px' }}>
                    <div style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>{sanitizeForDisplay('جامعه هدف')}</div>
                    <div style={{ fontSize: 18, color: '#f8fafc', fontWeight: 800 }}>{sanitizeForDisplay('دانشجویان و نخبگان')}</div>
                  </div>
                </div>
              </div>

              {/* Bento Cell 2: Strategic Pillars Indicator */}
              <div
                style={{
                  gridColumn: '2 / 3',
                  gridRow: '1 / 2',
                  background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
                  borderRadius: 28,
                  border: '1.5px solid rgba(56, 189, 248, 0.3)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, color: '#38bdf8' }}>{sanitizeForDisplay('پیش‌نیازهای ورود')}</div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 72, fontWeight: 900, color: '#ffffff', textShadow: '0 0 30px #0ea5e9' }}>۳</span>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#cbd5e1' }}>{sanitizeForDisplay('شرط اساسی و الزامی')}</div>
                </div>
                <div style={{ fontSize: 16, color: '#94a3b8', textAlign: 'center' }}>
                  {sanitizeForDisplay('پیش از ورود به جدول امتیازها')}
                </div>
              </div>

              {/* Bento Cell 3: Process Telemetry */}
              <div
                style={{
                  gridColumn: '1 / 3',
                  gridRow: '2 / 3',
                  background: 'rgba(15, 23, 42, 0.85)',
                  borderRadius: 24,
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                  padding: '24px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                {[
                  { step: 'گام اول', label: 'احراز شروط سه‌گانه', icon: '✅', color: '#10b981' },
                  { step: 'گام دوم', label: 'توزیع در ۶ ماده آیین‌نامه', icon: '📊', color: '#06b6d4' },
                  { step: 'گام سوم', label: 'کسب حدنصاب قبولی مقطع', icon: '🎯', color: '#f59e0b' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontSize: 36 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, color: s.color, fontWeight: 800 }}>{sanitizeForDisplay(s.step)}</div>
                      <div style={{ fontSize: 20, color: '#f8fafc', fontWeight: 800 }}>{sanitizeForDisplay(s.label)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 4: CONDITION 1 - GPA 16 (f: 650..1000)                     */}
        {/* ============================================================== */}
        {frame >= 645 && frame < 1005 && (
          <div
            style={{
              position: 'absolute',
              width: 1200,
              display: 'flex',
              gap: 36,
              alignItems: 'center',
              opacity: interpolate(frame, [645, 665, 985, 1005], [0, 1, 1, 0]),
            }}
          >
            {/* Left: Circular Metric Visualizer */}
            <div
              style={{
                width: 440,
                height: 440,
                borderRadius: 36,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(16, 185, 129, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: '50%',
                  border: '14px solid rgba(255, 255, 255, 0.08)',
                  borderTopColor: '#10b981',
                  borderRightColor: '#10b981',
                  borderBottomColor: cond1Gauge >= 12 ? '#10b981' : 'transparent',
                  borderLeftColor: cond1Gauge >= 16 ? '#10b981' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 35px rgba(16, 185, 129, 0.3)',
                }}
              >
                <span style={{ fontSize: 68, fontWeight: 900, color: '#ffffff' }}>
                  {cond1Gauge.toFixed(1)}
                </span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#94a3b8' }}>از ۲۰</span>
              </div>
              <div style={{ marginTop: 24, fontSize: 20, fontWeight: 800, color: '#10b981' }}>
                {sanitizeForDisplay('حداقل معدل کل مجاز')}
              </div>
            </div>

            {/* Right: Explanatory Card */}
            <div
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.9)',
                borderRadius: 36,
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                padding: '48px 50px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 18px',
                  borderRadius: 999,
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#10b981',
                  fontSize: 18,
                  fontWeight: 800,
                  width: 'fit-content',
                }}
              >
                شرط اول از شروط ۳ گانه
              </div>

              <h3 style={{ margin: 0, fontSize: 44, fontWeight: 900, color: '#ffffff', lineHeight: 1.4 }}>
                {sanitizeForDisplay('معدل کل شما در مقطع فعلی باید حداقل ۱۶ باشد')}
              </h3>

              <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#94a3b8', lineHeight: 1.6 }}>
                {sanitizeForDisplay('این شرط بدون ارفاق بوده و شرط اولیه برای بررسی پرونده پژوهشی در کلیه مقاطع کارشناسی، پزشکی عمومی و تحصیلات تکمیلی است.')}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 5: CONDITION 2 - YEARS & DISCIPLINE (f: 1000..1250)        */}
        {/* ============================================================== */}
        {frame >= 995 && frame < 1255 && (
          <div
            style={{
              position: 'absolute',
              width: 1300,
              display: 'flex',
              gap: 36,
              transform: `scale(${cond2Spring})`,
              opacity: interpolate(frame, [995, 1015, 1235, 1255], [0, 1, 1, 0]),
            }}
          >
            {/* Sub-Card 1: Academic Years */}
            <div
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 14, 26, 0.98) 100%)',
                borderRadius: 32,
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: 50, marginBottom: 16 }}>⏳</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#38bdf8', marginBottom: 8 }}>بخش اول شرط دوم</div>
                <h4 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: '#ffffff' }}>
                  {sanitizeForDisplay('سنوات مجاز تحصیلی')}
                </h4>
                <p style={{ margin: '16px 0 0 0', fontSize: 22, color: '#94a3b8', lineHeight: 1.6 }}>
                  {sanitizeForDisplay('دانشجو باید در سقف سنوات قانونی مصوب شورای آموزشی دانشگاه در حال تحصیل باشد.')}
                </p>
              </div>

              <div
                style={{
                  padding: '12px 20px',
                  borderRadius: 16,
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  fontSize: 18,
                  fontWeight: 800,
                  textAlign: 'center',
                }}
              >
                {sanitizeForDisplay('عدم اتمام سنوات مجاز تحصیلی')}
              </div>
            </div>

            {/* Sub-Card 2: Disciplinary Committee */}
            <div
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 14, 26, 0.98) 100%)',
                borderRadius: 32,
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: 50, marginBottom: 16 }}>🛡️</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981', marginBottom: 8 }}>بخش دوم شرط دوم</div>
                <h4 style={{ margin: 0, fontSize: 36, fontWeight: 900, color: '#ffffff' }}>
                  {sanitizeForDisplay('تأییدیه کمیته انضباطی')}
                </h4>
                <p style={{ margin: '16px 0 0 0', fontSize: 22, color: '#94a3b8', lineHeight: 1.6 }}>
                  {sanitizeForDisplay('اخذ تأییدیه رسمی حسن اخلاق و عدم وجود محکومیت قطعی انضباطی الزامی است.')}
                </p>
              </div>

              <div
                style={{
                  padding: '12px 20px',
                  borderRadius: 16,
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#10b981',
                  fontSize: 18,
                  fontWeight: 800,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                <span>✓</span>
                <span>{sanitizeForDisplay('تأییدیه کمیته انضباطی دانشگاه')}</span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 6: CONDITION 3 - 6 ARTICLES & MANDATORY TECH (f: 1250..1650)*/}
        {/* ============================================================== */}
        {frame >= 1245 && frame < 1655 && (
          <div
            style={{
              position: 'absolute',
              width: 1350,
              transform: `scale(${cond3Spring})`,
              opacity: interpolate(frame, [1245, 1265, 1635, 1655], [0, 1, 1, 0]),
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 14, 26, 0.98) 100%)',
                borderRadius: 36,
                border: '2px solid rgba(56, 189, 248, 0.4)',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.7)',
                padding: '44px 50px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#f59e0b' }}>شرط سوم از شروط ۳ گانه</span>
                  <h3 style={{ margin: '6px 0 0 0', fontSize: 38, fontWeight: 900, color: '#ffffff' }}>
                    {sanitizeForDisplay('کسب امتیاز حداقل از ۶ ماده مختلف آیین‌نامه')}
                  </h3>
                </div>

                <div
                  style={{
                    padding: '10px 24px',
                    borderRadius: 999,
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1.5px solid rgba(239, 68, 68, 0.5)',
                    color: '#f87171',
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  {sanitizeForDisplay('حضور مقاله یا فعالیت فناورانه: اجباری!')}
                </div>
              </div>

              {/* 6 Article Matrix Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 28 }}>
                {[
                  { num: 'ماده ۱', name: 'مقاله پژوهشی', icon: '📝', mandatory: true },
                  { num: 'ماده ۲', name: 'فعالیت فناورانه', icon: '🔬', mandatory: true },
                  { num: 'ماده ۳', name: 'کتاب تخصصی', icon: '📚', mandatory: false },
                  { num: 'ماده ۴', name: 'همایش و کنگره', icon: '🎤', mandatory: false },
                  { num: 'ماده ۵', name: 'طرح تحقیقاتی', icon: '📊', mandatory: false },
                  { num: 'ماده ۶', name: 'جوایز و المپیاد', icon: '🏅', mandatory: false },
                ].map((art, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: art.mandatory
                        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: art.mandatory ? '2px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 18,
                      padding: 18,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{art.icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: art.mandatory ? '#f59e0b' : '#94a3b8' }}>
                      {sanitizeForDisplay(art.num)}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#f8fafc' }}>
                      {sanitizeForDisplay(art.name)}
                    </span>
                    {art.mandatory && (
                      <span style={{ fontSize: 13, fontWeight: 900, color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.2)', padding: '2px 8px', borderRadius: 6 }}>
                        الزامی
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 16,
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  fontSize: 20,
                  color: '#cbd5e1',
                  fontWeight: 600,
                }}
              >
                <span style={{ color: '#f59e0b', fontSize: 24 }}>⚠️</span>
                <span>
                  {sanitizeForDisplay('امتیازات شما نمی‌تواند تنها از یک یا دو بخش باشد؛ تنوع در حداقل ۶ ماده به همراه مقاله یا فناوری الزامی است.')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 7: TIME LIMIT CAUTION (f: 1650..1900)                      */}
        {/* ============================================================== */}
        {frame >= 1645 && frame < 1905 && (
          <div
            style={{
              position: 'absolute',
              width: 1200,
              transform: `scale(${cautionSpring})`,
              opacity: interpolate(frame, [1645, 1665, 1885, 1905], [0, 1, 1, 0]),
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.8) 100%)',
                borderRadius: 36,
                border: '2px solid rgba(245, 158, 11, 0.6)',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.7), 0 0 60px rgba(245, 158, 11, 0.2)',
                padding: '48px 56px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 24px',
                  borderRadius: 999,
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1.5px solid rgba(245, 158, 11, 0.5)',
                  color: '#fbbf24',
                  fontSize: 22,
                  fontWeight: 900,
                  marginBottom: 24,
                }}
              >
                <span>⚠️</span>
                <span>{sanitizeForDisplay('نکته بسیار مهم و حیاتی!')}</span>
              </div>

              <h3 style={{ margin: 0, fontSize: 46, fontWeight: 900, color: '#ffffff', lineHeight: 1.45 }}>
                {sanitizeForDisplay('دقت کنید! تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد.')}
              </h3>

              {/* Timeline graphic */}
              <div
                style={{
                  marginTop: 40,
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 24,
                  padding: '24px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div style={{ textAlign: 'center', zIndex: 2 }}>
                  <div style={{ fontSize: 28 }}>🎓</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8', marginTop: 6 }}>{sanitizeForDisplay('طول دوران تحصیل')}</div>
                  <div style={{ fontSize: 15, color: '#94a3b8' }}>{sanitizeForDisplay('پذیرش ۱۰۰٪ مدارک')}</div>
                </div>

                <div style={{ flex: 1, height: 6, background: 'linear-gradient(90deg, #38bdf8, #f59e0b)', margin: '0 30px', borderRadius: 999 }} />

                <div style={{ textAlign: 'center', zIndex: 2 }}>
                  <div style={{ fontSize: 28 }}>📜</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#f59e0b', marginTop: 6 }}>{sanitizeForDisplay('تاریخ فارغ‌التحصیلی')}</div>
                  <div style={{ fontSize: 15, color: '#94a3b8' }}>{sanitizeForDisplay('آغاز مهلت نهایی')}</div>
                </div>

                <div style={{ flex: 1, height: 6, background: 'linear-gradient(90deg, #f59e0b, #ef4444)', margin: '0 30px', borderRadius: 999 }} />

                <div style={{ textAlign: 'center', zIndex: 2 }}>
                  <div style={{ fontSize: 28 }}>🛑</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#ef4444', marginTop: 6 }}>{sanitizeForDisplay('حداکثر تا ۱ سال بعد')}</div>
                  <div style={{ fontSize: 15, color: '#94a3b8' }}>{sanitizeForDisplay('پایان مهلت قانونی')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 8: THRESHOLD SCORE MATRIX: 65, 110, 130 (f: 1900..2280)    */}
        {/* ============================================================== */}
        {frame >= 1895 && frame < 2285 && (
          <div
            style={{
              position: 'absolute',
              width: 1400,
              transform: `scale(${scoresSpring})`,
              opacity: interpolate(frame, [1895, 1915, 2265, 2285], [0, 1, 1, 0]),
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 20px',
                  borderRadius: 999,
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  fontSize: 18,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                جدول حدنصاب قبولی آیین‌نامه
              </div>
              <h3 style={{ margin: 0, fontSize: 44, fontWeight: 900, color: '#ffffff' }}>
                {sanitizeForDisplay('حدنصاب قبولی بسته به مقطع تحصیلی (دانشگاه‌های تیپ ۱)')}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {/* Tier 1: BSc */}
              <div
                style={{
                  background: frame >= 2030 && frame < 2110
                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 14, 26, 0.95) 100%)',
                  borderRadius: 28,
                  border: frame >= 2030 && frame < 2110
                    ? '2.5px solid #06b6d4'
                    : '1.5px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: frame >= 2030 && frame < 2110
                    ? '0 25px 60px rgba(6, 182, 212, 0.3)'
                    : '0 20px 50px rgba(0, 0, 0, 0.5)',
                  padding: 36,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: frame >= 2030 && frame < 2110 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 12 }}>
                  {sanitizeForDisplay('مقطع کارشناسی')}
                </span>
                <span style={{ fontSize: 72, fontWeight: 900, color: '#ffffff' }}>
                  {scoreBSc.toFixed(0)}
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8', marginBottom: 20 }}>
                  {sanitizeForDisplay('امتیاز')}
                </span>
                <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${(scoreBSc / 130) * 100}%`, height: '100%', background: '#06b6d4', borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 16, color: '#94a3b8', marginTop: 16 }}>
                  {sanitizeForDisplay('دانشگاه‌های تیپ یک')}
                </span>
              </div>

              {/* Tier 2: General Medicine */}
              <div
                style={{
                  background: frame >= 2110 && frame < 2190
                    ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 14, 26, 0.95) 100%)',
                  borderRadius: 28,
                  border: frame >= 2110 && frame < 2190
                    ? '2.5px solid #0ea5e9'
                    : '1.5px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: frame >= 2110 && frame < 2190
                    ? '0 25px 60px rgba(14, 165, 233, 0.3)'
                    : '0 20px 50px rgba(0, 0, 0, 0.5)',
                  padding: 36,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: frame >= 2110 && frame < 2190 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 800, color: '#0ea5e9', marginBottom: 12 }}>
                  {sanitizeForDisplay('پزشکی عمومی')}
                </span>
                <span style={{ fontSize: 72, fontWeight: 900, color: '#ffffff' }}>
                  {scoreMed.toFixed(0)}
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#0ea5e9', marginBottom: 20 }}>
                  {sanitizeForDisplay('امتیاز')}
                </span>
                <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${(scoreMed / 130) * 100}%`, height: '100%', background: '#0ea5e9', borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 16, color: '#94a3b8', marginTop: 16 }}>
                  {sanitizeForDisplay('دکتری حرفه‌ای پزشکی')}
                </span>
              </div>

              {/* Tier 3: Specialty & PhD */}
              <div
                style={{
                  background: frame >= 2190
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 14, 26, 0.95) 100%)',
                  borderRadius: 28,
                  border: frame >= 2190
                    ? '2.5px solid #f59e0b'
                    : '1.5px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: frame >= 2190
                    ? '0 25px 60px rgba(245, 158, 11, 0.35)'
                    : '0 20px 50px rgba(0, 0, 0, 0.5)',
                  padding: 36,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transform: frame >= 2190 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 800, color: '#fbbf24', marginBottom: 12 }}>
                  {sanitizeForDisplay('دکترای تخصصی (Ph.D)')}
                </span>
                <span style={{ fontSize: 72, fontWeight: 900, color: '#ffffff' }}>
                  {scorePhD.toFixed(0)}
                </span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#fbbf24', marginBottom: 20 }}>
                  {sanitizeForDisplay('امتیاز')}
                </span>
                <div style={{ width: '100%', height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${(scorePhD / 130) * 100}%`, height: '100%', background: '#f59e0b', borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 16, color: '#94a3b8', marginTop: 16 }}>
                  {sanitizeForDisplay('دستیاری و دکترای تخصصی')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 9: OUTRO WITH DUAL LOGOS (f: 2280..2387)                   */}
        {/* ============================================================== */}
        {frame >= 2275 && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${outroSpring})`,
              opacity: interpolate(frame, [2275, 2300, 2360, 2387], [0, 1, 1, 0]),
            }}
          >
            {/* Dual Logos side by side */}
            <div style={{ display: 'flex', gap: 60, alignItems: 'center', marginBottom: 36 }}>
              {/* Right: Baqiyatallah Medical University Logo */}
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 36,
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.5) 100%)',
                  border: '2px solid rgba(56, 189, 248, 0.5)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(6, 182, 212, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                }}
              >
                <Img
                  src={staticFile('logos/university_logo.png')}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Left: Research Committee Logo */}
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 36,
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(16, 185, 129, 0.3) 100%)',
                  border: '2px solid rgba(16, 185, 129, 0.5)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 24,
                }}
              >
                <Img
                  src={staticFile('logos/committee_logo.png')}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
                borderRadius: 24,
                padding: '20px 50px',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              }}
            >
              <h2 style={{ margin: 0, fontSize: 44, fontWeight: 900, color: '#ffffff' }}>
                {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
              </h2>
              <p style={{ margin: '10px 0 0 0', fontSize: 24, fontWeight: 700, color: '#38bdf8' }}>
                {sanitizeForDisplay('کمیته تحقیقات و فناوری دانشجویی • با ما همراه باشید!')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
