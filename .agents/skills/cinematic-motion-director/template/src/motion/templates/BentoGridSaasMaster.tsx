/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 6: BENTO GRID SAAS FEATURE MATRIX
 * ============================================================================
 * 
 * Inspired by @melvynx & @moritzkremb viral showcases (awesome-opus5-5-videos):
 * - High-end modern SaaS / AI Product showcase organized into modular Bento cells
 * - Staggered dynamic cell expansion, live telemetry gauges, sparklines, and toggles
 * - Seamless camera focus shifts across active grid modules
 * - Studio electronic soundtrack (Tech_Live.mp3 @ 124 BPM) + UI interaction audio
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, staticFile } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';

export const BENTO_GRID_DURATION = 450; // 15.0s @ 30 FPS
export const BENTO_GRID_FPS = 30;
export const BENTO_GRID_WIDTH = 1920;
export const BENTO_GRID_HEIGHT = 1080;

export const BentoGridSaasMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Staggered spring entrances for bento cells
  const cell1Spring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 100 } });
  const cell2Spring = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 100 } });
  const cell3Spring = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 100 } });
  const cell4Spring = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 100 } });

  // Camera focus shift across cells
  // Phase 1 (0..120): Wide overview
  // Phase 2 (120..240): Focus on Cell 1 (Hero Agent)
  // Phase 3 (240..340): Focus on Cell 3 & 4 (Analytics & Speed)
  // Phase 4 (340..450): Pull back to full glory with keynote badge
  const gridScale = interpolate(
    frame,
    [0, 60, 140, 220, 260, 340, 380, 450],
    [0.92, 1.0, 1.08, 1.08, 1.05, 1.05, 1.0, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  const gridPanX = interpolate(
    frame,
    [120, 160, 220, 270, 330, 370],
    [0, -80, -80, 80, 80, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  const activeSlider = interpolate(frame, [150, 220], [20, 96], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const activeGauge = interpolate(frame, [250, 320], [0, 99.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: BENTO_GRID_WIDTH,
        height: BENTO_GRID_HEIGHT,
        backgroundColor: '#070a14',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* 1. STUDIO MESH GLASS BACKDROP */}
      <StudioMeshGlassBackdrop
        camX={gridPanX}
        camY={0}
        camZ={gridScale * 100}
        primaryLightColor="#4f46e5"
        accentGlowColor="#06b6d4"
      />

      {/* 2. TOP HEADER HUD */}
      <div style={{ position: 'absolute', top: 44, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 12px #10b981' }} />
          <span style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc' }}>
            {sanitizeForDisplay('پلتفرم جامع نسل پنجم هوش مصنوعی')}
          </span>
        </div>
        <div style={{ padding: '6px 18px', borderRadius: 999, background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#a5b4fc', fontSize: 14, fontWeight: 800 }}>
          {sanitizeForDisplay('نسخه سازمانی ۳.۲')}
        </div>
      </div>

      {/* 3. THE 4-CELL BENTO GRID MATRIX */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${gridScale}) translate3d(${gridPanX}px, 0px, 0px)`,
          transition: 'transform 0.5s ease',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '820px 540px',
            gridTemplateRows: '390px 270px',
            gap: 24,
            width: 1384,
            height: 684,
          }}
        >
          {/* CELL 1 (HERO AGENT MONITOR) */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 14, 26, 0.95) 100%)',
              borderRadius: 24,
              border: '1.5px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(6, 182, 212, 0.12)',
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transform: `scale(${cell1Spring})`,
              opacity: cell1Spring,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: '#ffffff' }}>
                {sanitizeForDisplay('ارکستراسیون ایجنت‌های خودکار')}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#38bdf8' }}>MCP://LIVE</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 16, fontWeight: 700, color: '#94a3b8' }}>
                <span>{sanitizeForDisplay('توان تخصیص کانتکست موازی')}</span>
                <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 900 }}>{activeSlider.toFixed(1)}%</span>
              </div>
              <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${activeSlider}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8, #06b6d4)', borderRadius: 999 }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>{sanitizeForDisplay('نرخ پاسخ‌دهی')}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#34d399', marginTop: 4 }}>۰.۸ میلی‌ثانیه</div>
              </div>
              <div style={{ flex: 1, padding: 14, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>{sanitizeForDisplay('پروتکل ابری')}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#38bdf8', marginTop: 4 }}>تراز کامل</div>
              </div>
            </div>
          </div>

          {/* CELL 2 (GAUGE PRECISION DIAL) */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: '1 / 2',
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
              borderRadius: 24,
              border: '1.5px solid rgba(168, 85, 247, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${cell2Spring})`,
              opacity: cell2Spring,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: '#c084fc', marginBottom: 12 }}>
              {sanitizeForDisplay('ضریب راستی‌آزمایی داده')}
            </div>
            <div style={{ fontSize: 52, fontWeight: 950, color: '#ffffff', letterSpacing: -1 }}>
              {activeGauge.toFixed(1)}٪
            </div>
            <div style={{ width: '80%', height: 4, background: 'linear-gradient(90deg, #a855f7, #ec4899)', borderRadius: 2, marginTop: 12 }} />
          </div>

          {/* CELL 3 (SECURITY INTEGRATION) */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '2 / 3',
              background: 'rgba(15, 23, 42, 0.85)',
              borderRadius: 24,
              border: '1.5px solid rgba(16, 185, 129, 0.3)',
              padding: '24px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `scale(${cell3Spring})`,
              opacity: cell3Spring,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: 22, fontWeight: 900 }}>
                ✓
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: 19, fontWeight: 900, color: '#f8fafc' }}>
                  {sanitizeForDisplay('استاندارد رمزنگاری کوانتومی')}
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#64748b', fontWeight: 700 }}>
                  {sanitizeForDisplay('تأییدیه اندپوینت‌های ایزوله سازمانی')}
                </p>
              </div>
            </div>
            <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(16, 185, 129, 0.12)', color: '#34d399', fontSize: 13, fontWeight: 800 }}>
              {sanitizeForDisplay('فعال')}
            </div>
          </div>

          {/* CELL 4 (SPEED PULSE TELEMETRY) */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: '2 / 3',
              background: 'rgba(15, 23, 42, 0.85)',
              borderRadius: 24,
              border: '1.5px solid rgba(245, 158, 11, 0.3)',
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transform: `scale(${cell4Spring})`,
              opacity: cell4Spring,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8' }}>
              {sanitizeForDisplay('سرعت رندر فریم سینمایی')}
            </span>
            <div style={{ fontSize: 32, fontWeight: 950, color: '#f59e0b', marginTop: 6 }}>
              {sanitizeForDisplay('۶۰ فریم بر ثانیه')}
            </div>
          </div>
        </div>
      </div>

      {/* STUDIO SOUNDTRACK */}
      <Audio src={staticFile('music/Tech_Live.mp3')} volume={0.8} />
    </div>
  );
};
