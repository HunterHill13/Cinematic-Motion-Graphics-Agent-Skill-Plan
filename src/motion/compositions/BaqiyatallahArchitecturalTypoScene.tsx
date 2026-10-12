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
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';
import { UniversalCameraRig } from '../camera/UniversalCameraRig';

export const ARCH_TYPO_DURATION = 2387; // ~79.5s @ 30 FPS
export const ARCH_TYPO_FPS = 30;
export const ARCH_TYPO_WIDTH = 1920;
export const ARCH_TYPO_HEIGHT = 1080;

export const BaqiyatallahArchitecturalTypoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 150 BPM architectural kinetic pulse
  const beatPulse = calculateBeatPulse(frame, 150, fps).lightPulse;
  const archPulse = 1 + beatPulse * 0.012;

  // Background Music Volume Ducking
  const bgmVolume = interpolate(
    frame,
    [0, 30, 2300, 2360, 2387],
    [0.16, 0.07, 0.07, 0.14, 0.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Dynamic Camera tracking along architectural datum line
  const camX = interpolate(
    frame,
    [0, 180, 240, 400, 480, 650, 720, 1000, 1060, 1250, 1320, 1650, 1720, 1900, 1980, 2280],
    [0, 350, -450, 400, 0, -420, 480, -350, 420, -380, 0, 450, -400, 0, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const camY = interpolate(
    frame,
    [0, 180, 400, 650, 720, 1000, 1060, 1250, 1320, 1650, 1720, 1900, 1980, 2280],
    [0, 0, 0, 0, -30, -30, -30, -30, 30, 30, 0, 0, -30, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const camScale = interpolate(
    frame,
    [0, 180, 400, 650, 1000, 1250, 1650, 1900, 2280, 2387],
    [1.0, 1.02, 1.0, 1.04, 1.03, 1.03, 1.02, 1.0, 1.02, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
  );

  const _rigReady = Boolean(UniversalCameraRig);

  // Architectural Springs
  const lintel1Y = interpolate(frame, [0, 45], [-120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const hookSpring = spring({ frame: Math.max(0, frame - 185), fps, config: { damping: 14, stiffness: 110 } });
  const statuteDrop = spring({ frame: Math.max(0, frame - 405), fps, config: { damping: 13, stiffness: 95 } });
  const cond1Gauge = interpolate(frame, [720, 880], [0, 16], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cond2Spring = spring({ frame: Math.max(0, frame - 1010), fps, config: { damping: 14, stiffness: 105 } });
  const cond3Spring = spring({ frame: Math.max(0, frame - 1260), fps, config: { damping: 14, stiffness: 100 } });
  const cautionSpring = spring({ frame: Math.max(0, frame - 1660), fps, config: { damping: 13, stiffness: 95 } });
  const podiumSpring = spring({ frame: Math.max(0, frame - 1910), fps, config: { damping: 14, stiffness: 100 } });
  const outroSpring = spring({ frame: Math.max(0, frame - 2285), fps, config: { damping: 14, stiffness: 100 } });

  // Score counters for Podium
  const scoreBSc = interpolate(frame, [2030, 2100], [0, 65], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scoreMed = interpolate(frame, [2110, 2180], [0, 110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scorePhD = interpolate(frame, [2190, 2260], [0, 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Podium Heights with stable minimum foundation
  const bscHeight = interpolate(scoreBSc, [0, 65], [260, 320]);
  const medHeight = interpolate(scoreMed, [0, 110], [260, 390]);
  const phdHeight = interpolate(scorePhD, [0, 130], [260, 470]);

  return (
    <div
      style={{
        position: 'relative',
        width: ARCH_TYPO_WIDTH,
        height: ARCH_TYPO_HEIGHT,
        backgroundColor: '#0a1017',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* 1. MASTER AUDIO & UNIVERSAL SOUND DIRECTOR */}
      <UniversalSoundDirector
        voiceTrack="audio/baqiyatallah_awards_master_voice.wav"
        voiceVolume={1.0}
        bgmTrack="music/Cipher2.mp3"
        bgmVolume={bgmVolume}
        sfxCues={[
          { frame: 176, type: 'whoosh' },
          { frame: 188, type: 'impact' },
          { frame: 396, type: 'whoosh' },
          { frame: 408, type: 'impact' },
          { frame: 646, type: 'whoosh' },
          { frame: 996, type: 'whoosh' },
          { frame: 1246, type: 'whoosh' },
          { frame: 1646, type: 'whoosh' },
          { frame: 1896, type: 'whoosh' },
          { frame: 2276, type: 'riser' },
        ]}
      />

      {/* 2. ARCHITECTURAL BLUEPRINT CANVAS & RULER TICKS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 45%, rgba(15, 30, 45, 0.8) 0%, rgba(10, 16, 23, 0.98) 75%, #05080c 100%),
            linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 70px 70px, 70px 70px',
        }}
      />

      {/* Top Architectural Drafting Ruler */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 60,
          right: 60,
          height: 28,
          borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          opacity: 0.7,
          zIndex: 25,
        }}
      >
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 1,
              height: i % 5 === 0 ? 18 : 8,
              backgroundColor: i % 5 === 0 ? '#f59e0b' : 'rgba(56, 189, 248, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Persistent Technical Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 70,
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#38bdf8',
          letterSpacing: 2,
          direction: 'ltr',
          zIndex: 30,
        }}
      >
        SPEC // BND_KAF_SEC02 · BMSU_RES_COMMITTEE · {_rigReady ? `FRAME_${frame}` : ''}
      </div>

      {/* Top Brand Tag */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 70,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 30,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: '0 0 10px #f59e0b' }} />
        <span style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc' }}>
          {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
        </span>
        <span style={{ color: '#0ea5e9', fontSize: 16 }}>•</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#94a3b8' }}>
          {sanitizeForDisplay('کمیته تحقیقات و فناوری')}
        </span>
      </div>

      {/* 3. MAIN ARCHITECTURAL STAGE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${camScale * archPulse}) translate3d(${Math.round(camX)}px, ${Math.round(camY)}px, 0px)`,
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          zIndex: 10,
        }}
      >
        {/* ============================================================== */}
        {/* ACT 1: THE PROLOGUE MONUMENT & PR EMBLEM (f: 0..180)           */}
        {/* ============================================================== */}
        {frame < 185 && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `translateY(${lintel1Y}px)`,
              opacity: interpolate(frame, [0, 20, 160, 180], [0, 1, 1, 0]),
            }}
          >
            {/* Monumental Medallion */}
            <div
              style={{
                width: 250,
                height: 250,
                borderRadius: 36,
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                border: '3px solid #f59e0b',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(245, 158, 11, 0.3)',
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

            {/* Heavy Architectural Lintel Beam */}
            <div
              style={{
                background: '#f59e0b',
                color: '#0a1017',
                padding: '16px 56px',
                borderRadius: 8,
                fontSize: 52,
                fontWeight: 950,
                letterSpacing: -1,
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                textAlign: 'center',
                borderBottom: '4px solid #ffffff',
              }}
            >
              {sanitizeForDisplay('روابط عمومی کمیته تحقیقات')}
            </div>

            {/* Sub-datum line */}
            <div
              style={{
                marginTop: 18,
                fontSize: 28,
                fontWeight: 800,
                color: '#38bdf8',
                letterSpacing: 1,
              }}
            >
              {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 2: ARCHITECTURAL MANIFESTO QUESTION (f: 180..400)          */}
        {/* ============================================================== */}
        {frame >= 175 && frame < 405 && (
          <div
            style={{
              position: 'absolute',
              width: 1400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${hookSpring})`,
              opacity: interpolate(frame, [175, 195, 385, 405], [0, 1, 1, 0]),
            }}
          >
            {/* Caliper Bracket Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontFamily: 'monospace',
                fontSize: 20,
                color: '#f59e0b',
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              <span>[ 01 // CRITERIA HOOK ]</span>
              <div style={{ width: 140, height: 2, backgroundColor: '#f59e0b' }} />
              <span>MINISTRY OF HEALTH</span>
            </div>

            {/* Monumental Architectural Headline */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '2.5px solid rgba(56, 189, 248, 0.5)',
                borderRadius: 24,
                padding: '48px 64px',
                textAlign: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(6, 182, 212, 0.2)',
                width: '100%',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 58,
                  fontWeight: 950,
                  color: '#ffffff',
                  lineHeight: 1.4,
                }}
              >
                {sanitizeForDisplay('دانشجوی پژوهشگر یا فناور برجسته کشور')}
              </h2>

              <div style={{ margin: '24px auto', width: 300, height: 4, background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }} />

              {/* 3 Structural Badges */}
              <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                {[
                  { label: 'مقالات اصیل و نمایه‌شده', code: 'SEC_01 // PAPERS' },
                  { label: 'نوآوری و اختراعات سلامت', code: 'SEC_02 // TECH' },
                  { label: 'جوایز، المپیاد و کتب', code: 'SEC_03 // AWARDS' },
                ].map((b, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: 12,
                      padding: '18px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#f59e0b' }}>{b.code}</span>
                    <span style={{ fontSize: 22, fontWeight: 800, color: '#f8fafc' }}>{sanitizeForDisplay(b.label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 3: THE STATUTE MONOLITH (f: 400..650)                      */}
        {/* ============================================================== */}
        {frame >= 395 && frame < 655 && (
          <div
            style={{
              position: 'absolute',
              width: 1350,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${statuteDrop})`,
              opacity: interpolate(frame, [395, 415, 635, 655], [0, 1, 1, 0]),
            }}
          >
            {/* Monumental Lintel Block */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                color: '#0a1017',
                padding: '24px 48px',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ fontSize: 44, fontWeight: 950 }}>
                {sanitizeForDisplay('دستورالعمل بند «کاف»، ماده ۲ آیین‌نامه')}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, background: '#0a1017', color: '#f59e0b', padding: '6px 16px', borderRadius: 8 }}>
                STATUTE // REF-02
              </span>
            </div>

            {/* Architectural Foundation Wall */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '2px solid rgba(245, 158, 11, 0.4)',
                borderTop: 'none',
                borderRadius: '0 0 24px 24px',
                padding: '44px 56px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
              }}
            >
              <p style={{ margin: 0, fontSize: 32, fontWeight: 800, color: '#f8fafc', lineHeight: 1.6 }}>
                {sanitizeForDisplay('آیین‌نامه استعدادهای درخشان وزارت بهداشت، درمان و آموزش پزشکی؛ مسیر جامع و رسمی سنجش امتیازات و احراز صلاحیت نخبگی دانشجویان علوم پزشکی.')}
              </p>

              <div style={{ marginTop: 32, display: 'flex', gap: 20 }}>
                <div style={{ flex: 1, borderLeft: '3px solid #38bdf8', paddingLeft: 16 }}>
                  <div style={{ fontSize: 16, color: '#64748b', fontWeight: 800 }}>مرجع ارزیابی</div>
                  <div style={{ fontSize: 22, color: '#38bdf8', fontWeight: 900 }}>وزارت بهداشت و بنیاد نخبگان</div>
                </div>
                <div style={{ flex: 1, borderLeft: '3px solid #10b981', paddingLeft: 16 }}>
                  <div style={{ fontSize: 16, color: '#64748b', fontWeight: 800 }}>ساختار امتیازدهی</div>
                  <div style={{ fontSize: 22, color: '#10b981', fontWeight: 900 }}>تفکیک در ۶ ماده مختلف</div>
                </div>
                <div style={{ flex: 1, borderLeft: '3px solid #f59e0b', paddingLeft: 16 }}>
                  <div style={{ fontSize: 16, color: '#64748b', fontWeight: 800 }}>پیش‌شرط محاسبه</div>
                  <div style={{ fontSize: 22, color: '#f59e0b', fontWeight: 900 }}>۳ شرط اساسی اولیه</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 4: THE PILLAR 1: GPA THRESHOLD (f: 650..1000)              */}
        {/* ============================================================== */}
        {frame >= 645 && frame < 1005 && (
          <div
            style={{
              position: 'absolute',
              width: 1300,
              display: 'flex',
              gap: 40,
              alignItems: 'center',
              opacity: interpolate(frame, [645, 665, 985, 1005], [0, 1, 1, 0]),
            }}
          >
            {/* Monumental Metric Tower */}
            <div
              style={{
                width: 440,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '3px solid #10b981',
                borderRadius: 24,
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 0 50px rgba(16, 185, 129, 0.3)',
              }}
            >
              <div style={{ fontFamily: 'monospace', fontSize: 16, color: '#10b981', letterSpacing: 2 }}>
                PILLAR_01 // GPA_CRITERIA
              </div>
              <div style={{ fontSize: 92, fontWeight: 950, color: '#ffffff', margin: '14px 0', textShadow: '0 0 30px #10b981' }}>
                {cond1Gauge.toFixed(1)}
              </div>
              <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${(cond1Gauge / 20) * 100}%`, height: '100%', backgroundColor: '#10b981', borderRadius: 999 }} />
              </div>
              <div style={{ marginTop: 18, fontSize: 22, fontWeight: 900, color: '#10b981' }}>
                {sanitizeForDisplay('حداقل معدل کل: ۱۶')}
              </div>
            </div>

            {/* Explanation Monolith */}
            <div
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.95)',
                border: '2px solid rgba(56, 189, 248, 0.4)',
                borderRadius: 24,
                padding: '44px 50px',
              }}
            >
              <span style={{ background: '#10b981', color: '#0a1017', fontSize: 16, fontWeight: 950, padding: '4px 14px', borderRadius: 6 }}>
                شرط اول از شروط ۳ گانه
              </span>
              <h3 style={{ margin: '18px 0 14px 0', fontSize: 44, fontWeight: 950, color: '#ffffff', lineHeight: 1.35 }}>
                {sanitizeForDisplay('معدل کل شما در مقطع فعلی باید حداقل ۱۶ باشد.')}
              </h3>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 600, color: '#94a3b8', lineHeight: 1.6 }}>
                {sanitizeForDisplay('این حدنصاب شرط پایه ورود به محاسبات آیین‌نامه است؛ بدون احراز معدل ۱۶، امکان بررسی پرونده در هیچ مقطعی وجود ندارد.')}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 5: PILLAR 2: YEARS & DISCIPLINE (f: 1000..1250)            */}
        {/* ============================================================== */}
        {frame >= 995 && frame < 1255 && (
          <div
            style={{
              position: 'absolute',
              width: 1350,
              display: 'flex',
              gap: 36,
              transform: `scale(${cond2Spring})`,
              opacity: interpolate(frame, [995, 1015, 1235, 1255], [0, 1, 1, 0]),
            }}
          >
            {/* Sub-Pillar 1 */}
            <div
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '2.5px solid rgba(56, 189, 248, 0.5)',
                borderRadius: 24,
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#38bdf8' }}>PILLAR_02 // PART_A</span>
                <h4 style={{ margin: '14px 0 12px 0', fontSize: 38, fontWeight: 950, color: '#ffffff' }}>
                  {sanitizeForDisplay('سنوات مجاز تحصیلی')}
                </h4>
                <p style={{ margin: 0, fontSize: 22, color: '#94a3b8', lineHeight: 1.6 }}>
                  {sanitizeForDisplay('دانشجو باید در سقف سنوات قانونی مصوب شورای آموزشی دانشگاه در حال تحصیل باشد.')}
                </p>
              </div>
              <div style={{ marginTop: 24, padding: '12px 20px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', fontSize: 18, fontWeight: 800, textAlign: 'center', borderRadius: 10 }}>
                {sanitizeForDisplay('عدم اتمام سنوات مجاز تحصیلی')}
              </div>
            </div>

            {/* Sub-Pillar 2 */}
            <div
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '2.5px solid rgba(16, 185, 129, 0.5)',
                borderRadius: 24,
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#10b981' }}>PILLAR_02 // PART_B</span>
                <h4 style={{ margin: '14px 0 12px 0', fontSize: 38, fontWeight: 950, color: '#ffffff' }}>
                  {sanitizeForDisplay('تأییدیه کمیته انضباطی')}
                </h4>
                <p style={{ margin: 0, fontSize: 22, color: '#94a3b8', lineHeight: 1.6 }}>
                  {sanitizeForDisplay('اخذ تأییدیه رسمی حسن اخلاق و عدم وجود محکومیت قطعی انضباطی الزامی است.')}
                </p>
              </div>
              <div style={{ marginTop: 24, padding: '12px 20px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', color: '#10b981', fontSize: 18, fontWeight: 800, textAlign: 'center', borderRadius: 10 }}>
                {sanitizeForDisplay('تأییدیه کمیته انضباطی دانشگاه')}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 6: PILLAR 3: 6 ARTICLES & MANDATORY TECH (f: 1250..1650)   */}
        {/* ============================================================== */}
        {frame >= 1245 && frame < 1655 && (
          <div
            style={{
              position: 'absolute',
              width: 1400,
              transform: `scale(${cond3Spring})`,
              opacity: interpolate(frame, [1245, 1265, 1635, 1655], [0, 1, 1, 0]),
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '2.5px solid #f59e0b',
                borderRadius: 28,
                padding: '40px 50px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                  <span style={{ fontFamily: 'monospace', fontSize: 15, color: '#f59e0b' }}>PILLAR_03 // SIX_ARTICLES_RULE</span>
                  <h3 style={{ margin: '6px 0 0 0', fontSize: 40, fontWeight: 950, color: '#ffffff' }}>
                    {sanitizeForDisplay('کسب امتیاز حداقل از ۶ ماده مختلف آیین‌نامه')}
                  </h3>
                </div>

                <div style={{ background: '#ef4444', color: '#ffffff', padding: '8px 24px', borderRadius: 8, fontSize: 18, fontWeight: 950 }}>
                  حضور مقاله یا فعالیت فناورانه: اجباری!
                </div>
              </div>

              {/* 6-Column Architectural Facade */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                  { col: 'ماده ۱', title: 'مقاله پژوهشی', mandatory: true },
                  { col: 'ماده ۲', title: 'فعالیت فناورانه', mandatory: true },
                  { col: 'ماده ۳', title: 'کتاب تخصصی', mandatory: false },
                  { col: 'ماده ۴', title: 'همایش و کنگره', mandatory: false },
                  { col: 'ماده ۵', title: 'طرح تحقیقاتی', mandatory: false },
                  { col: 'ماده ۶', title: 'جوایز و المپیاد', mandatory: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: item.mandatory ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: item.mandatory ? '2px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 12,
                      padding: 18,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 900, color: item.mandatory ? '#f59e0b' : '#38bdf8' }}>
                      {sanitizeForDisplay(item.col)}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#ffffff' }}>
                      {sanitizeForDisplay(item.title)}
                    </span>
                    {item.mandatory && (
                      <span style={{ fontSize: 13, fontWeight: 950, color: '#ef4444', background: 'rgba(239,68,68,0.2)', padding: '2px 6px', borderRadius: 4 }}>
                        الزامی
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px 20px', borderRadius: 10, fontSize: 19, color: '#cbd5e1', fontWeight: 600 }}>
                {sanitizeForDisplay('تأکید آیین‌نامه: امتیازات باید متوازن و متنوع از حداقل ۶ بخش باشد و مقاله یا فناوری در آن حضور قطعی داشته باشد.')}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 7: CRUCIAL TIME LIMIT (f: 1650..1900)                      */}
        {/* ============================================================== */}
        {frame >= 1645 && frame < 1905 && (
          <div
            style={{
              position: 'absolute',
              width: 1300,
              transform: `scale(${cautionSpring})`,
              opacity: interpolate(frame, [1645, 1665, 1885, 1905], [0, 1, 1, 0]),
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 27, 75, 0.95) 100%)',
                border: '3px solid #f59e0b',
                borderRadius: 28,
                padding: '44px 56px',
                textAlign: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(245, 158, 11, 0.25)',
              }}
            >
              <div style={{ background: '#f59e0b', color: '#0a1017', fontSize: 18, fontWeight: 950, padding: '4px 18px', borderRadius: 6, display: 'inline-block', marginBottom: 20 }}>
                توجه و دقت بسیار مهم!
              </div>

              <h3 style={{ margin: 0, fontSize: 48, fontWeight: 950, color: '#ffffff', lineHeight: 1.4 }}>
                {sanitizeForDisplay('دقت کنید! تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد.')}
              </h3>

              {/* Architectural Datum Ruler Timeline */}
              <div
                style={{
                  marginTop: 40,
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 16,
                  padding: '24px 36px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#38bdf8' }}>{sanitizeForDisplay('دوران تحصیل')}</div>
                  <div style={{ fontSize: 15, color: '#94a3b8' }}>{sanitizeForDisplay('مدارک معتبر')}</div>
                </div>

                <div style={{ flex: 1, height: 4, background: 'linear-gradient(90deg, #38bdf8, #f59e0b)', margin: '0 28px' }} />

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#f59e0b' }}>{sanitizeForDisplay('تاریخ فارغ‌التحصیلی')}</div>
                  <div style={{ fontSize: 15, color: '#94a3b8' }}>{sanitizeForDisplay('نقطه مرجع سنجش')}</div>
                </div>

                <div style={{ flex: 1, height: 4, background: 'linear-gradient(90deg, #f59e0b, #ef4444)', margin: '0 28px' }} />

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#ef4444' }}>{sanitizeForDisplay('حداکثر تا ۱ سال بعد')}</div>
                  <div style={{ fontSize: 15, color: '#94a3b8' }}>{sanitizeForDisplay('پایان مهلت قانونی')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 8: MONUMENTAL STEPPED PODIUM (f: 1900..2280)               */}
        {/* ============================================================== */}
        {frame >= 1895 && frame < 2285 && (
          <div
            style={{
              position: 'absolute',
              width: 1400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${podiumSpring})`,
              opacity: interpolate(frame, [1895, 1915, 2265, 2285], [0, 1, 1, 0]),
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 16, color: '#38bdf8' }}>THRESHOLD_MATRIX // TIER_ONE_UNIVERSITIES</span>
              <h3 style={{ margin: '8px 0 0 0', fontSize: 46, fontWeight: 950, color: '#ffffff' }}>
                {sanitizeForDisplay('حدنصاب قبولی، بسته به تیپ دانشگاه و مقطع شما فرق میکند:')}
              </h3>
            </div>

            {/* 3 Stepped Architectural Podiums */}
            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', width: '100%', height: 480, justifyContent: 'center' }}>
              {/* Podium 1: BSc */}
              <div
                style={{
                  width: 380,
                  height: bscHeight,
                  background: 'linear-gradient(180deg, #0284c7 0%, #0c1723 100%)',
                  border: '2.5px solid #38bdf8',
                  borderRadius: '20px 20px 0 0',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 -10px 40px rgba(56, 189, 248, 0.25)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>{sanitizeForDisplay('کارشناسی')}</div>
                  <div style={{ fontSize: 15, color: '#bae6fd' }}>{sanitizeForDisplay('دانشگاه‌های تیپ یک')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 64, fontWeight: 950, color: '#ffffff' }}>{scoreBSc.toFixed(0)}</span>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#38bdf8' }}>{sanitizeForDisplay('امتیاز')}</div>
                </div>
              </div>

              {/* Podium 2: General Medicine */}
              <div
                style={{
                  width: 380,
                  height: medHeight,
                  background: 'linear-gradient(180deg, #0ea5e9 0%, #081a2e 100%)',
                  border: '2.5px solid #0ea5e9',
                  borderRadius: '20px 20px 0 0',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 -15px 50px rgba(14, 165, 233, 0.3)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#ffffff' }}>{sanitizeForDisplay('پزشکی عمومی')}</div>
                  <div style={{ fontSize: 15, color: '#bae6fd' }}>{sanitizeForDisplay('دکتری حرفه‌ای')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 72, fontWeight: 950, color: '#ffffff' }}>{scoreMed.toFixed(0)}</span>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0ea5e9' }}>{sanitizeForDisplay('امتیاز')}</div>
                </div>
              </div>

              {/* Podium 3: Specialty & PhD */}
              <div
                style={{
                  width: 380,
                  height: phdHeight,
                  background: 'linear-gradient(180deg, #f59e0b 0%, #1f1807 100%)',
                  border: '3px solid #f59e0b',
                  borderRadius: '20px 20px 0 0',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 -20px 60px rgba(245, 158, 11, 0.4)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 950, color: '#ffffff' }}>{sanitizeForDisplay('دکترای تخصصی')}</div>
                  <div style={{ fontSize: 15, color: '#fef3c7' }}>{sanitizeForDisplay('Ph.D و دستیاری تخصصی')}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 80, fontWeight: 950, color: '#ffffff' }}>{scorePhD.toFixed(0)}</span>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#f59e0b' }}>{sanitizeForDisplay('امتیاز')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 9: OUTRO & DUAL LOGOS (f: 2280..2387)                      */}
        {/* ============================================================== */}
        {frame >= 2275 && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${outroSpring})`,
              opacity: interpolate(frame, [2275, 2300, 2360, 2387], [0, 1, 1, 0]),
            }}
          >
            {/* Dual Logos in crisp white pedestals */}
            <div style={{ display: 'flex', gap: 60, alignItems: 'center', marginBottom: 36 }}>
              {/* Right: Baqiyatallah Medical University Logo */}
              <div
                style={{
                  width: 240,
                  height: 240,
                  borderRadius: 36,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                  border: '3px solid #f59e0b',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(245, 158, 11, 0.35)',
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
                  width: 240,
                  height: 240,
                  borderRadius: 36,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                  border: '3px solid #10b981',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(16, 185, 129, 0.35)',
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
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 14, 26, 0.98) 100%)',
                border: '2px solid rgba(56, 189, 248, 0.5)',
                borderRadius: 20,
                padding: '20px 56px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              <h2 style={{ margin: 0, fontSize: 44, fontWeight: 950, color: '#ffffff' }}>
                {sanitizeForDisplay('دانشگاه علوم پزشکی بقیةالله (عج)')}
              </h2>
              <p style={{ margin: '8px 0 0 0', fontSize: 24, fontWeight: 800, color: '#38bdf8' }}>
                {sanitizeForDisplay('کمیته تحقیقات و فناوری دانشجویی • با ما همراه باشید!')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
