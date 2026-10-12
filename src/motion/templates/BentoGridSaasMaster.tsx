/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 6: BENTO GRID SAAS FEATURE MATRIX (OPEN-CANVAS 3D NODES)
 * ============================================================================
 *
 * Open-Canvas 3D Spatial Modular Nodes:
 * - Zero top header HUD clutter & zero CSS transitions
 * - Spatial modular nodes float in open 3D space connected by SVG constellation
 *   conduits (`strokeDashoffset`)
 * - Every internal sub-element (bars, counters, sparklines, status pills, avatars)
 *   animates independently via staggered springs (`idx *`) and continuous micro-motion
 * - Subtle Videolancer Ultimate SFX via `<UniversalSoundDirector>` (<= 0.14 volume)
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';

export const BENTO_GRID_DURATION = 450; // 15.0s @ 30 FPS
export const BENTO_GRID_FPS = 30;
export const BENTO_GRID_WIDTH = 1920;
export const BENTO_GRID_HEIGHT = 1080;

const AGENT_TELEMETRY_PILLS = [
  { label: 'نرخ پاسخ‌دهی', value: '۰.۸ میلی‌ثانیه', color: '#34d399', avatar: 'A1' },
  { label: 'پروتکل ابری', value: 'تراز کامل', color: '#38bdf8', avatar: 'M2' },
  { label: 'ایجنت‌های فعال', value: '۱۲۸ نود موازی', color: '#a855f7', avatar: 'Q9' },
];

const SPARKLINE_BARS = [
  { height: 34, color: '#a855f7' },
  { height: 52, color: '#c084fc' },
  { height: 44, color: '#a855f7' },
  { height: 68, color: '#e879f9' },
  { height: 82, color: '#ec4899' },
  { height: 96, color: '#38bdf8' },
];

const SECURITY_BADGES = [
  { title: 'رمزنگاری کوانتومی', status: 'تأیید شده', accent: '#10b981' },
  { title: 'اندپوینت ایزوله', status: 'فعال · لایه ۳', accent: '#34d399' },
];

export const BentoGridSaasMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps).lightPulse;
  const breathingPulse = 1 + beatPulse * 0.016;

  // Staggered spring entrances for open-canvas spatial nodes
  const node1Spring = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 14, stiffness: 105 } });
  const node2Spring = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 14, stiffness: 105 } });
  const node3Spring = spring({ frame: Math.max(0, frame - 36), fps, config: { damping: 14, stiffness: 105 } });
  const node4Spring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 14, stiffness: 105 } });

  // Dynamic Open-Canvas Camera Focus Trajectory (>= 920px range, zero CSS transitions)
  const camX = interpolate(
    frame,
    [0, 80, 130, 210, 260, 340, 390, 450],
    [0, 0, -460, -220, 460, 220, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camY = interpolate(
    frame,
    [0, 80, 130, 210, 260, 340, 390, 450],
    [0, 0, -35, -20, 35, 20, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const gridScale = interpolate(
    frame,
    [0, 60, 140, 220, 260, 340, 390, 450],
    [0.94, 1.0, 1.06, 1.06, 1.04, 1.04, 1.0, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const activeSlider = interpolate(frame, [45, 220], [24, 96.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const activeGauge = interpolate(frame, [60, 320], [18, 99.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const renderFpsCounter = interpolate(frame, [70, 300], [24, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const floatWave = (seed: number, amp = 7) =>
    Math.round(Math.sin((frame + seed) * 0.065) * amp);

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
      {/* 1. SUBTLE VIDEOLANCER ULTIMATE SFX & BGM DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Tech_Live.mp3"
        bgmVolume={0.14}
        themeId="BENTO_GRID_SAAS"
      />

      {/* 2. STUDIO MESH GLASS BACKDROP (ZERO TOP HEADER HUD CLUTTER) */}
      <StudioMeshGlassBackdrop
        camX={camX}
        camY={camY}
        camZ={gridScale * 100}
        primaryLightColor="#4f46e5"
        accentGlowColor="#06b6d4"
      />

      {/* 3. OPEN-CANVAS 3D MODULAR CONSTELLATION STAGE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${gridScale * breathingPulse}) translate3d(${Math.round(camX * 0.35)}px, ${Math.round(camY)}px, 0px)`,
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {/* SVG Constellation Conduits Linking Floating Modular Nodes */}
        <svg
          width={1560}
          height={820}
          viewBox="0 0 1560 820"
          style={{ position: 'absolute', overflow: 'visible', pointerEvents: 'none' }}
        >
          <path
            d="M 480 280 C 760 280, 820 280, 1120 280"
            fill="none"
            stroke="#38bdf8"
            strokeWidth={2.5}
            strokeDasharray="680"
            strokeDashoffset={Math.round(680 * (1 - node2Spring))}
            strokeOpacity={0.5}
          />
          <path
            d="M 480 280 C 480 460, 480 520, 480 620"
            fill="none"
            stroke="#10b981"
            strokeWidth={2.5}
            strokeDasharray="400"
            strokeDashoffset={Math.round(400 * (1 - node3Spring))}
            strokeOpacity={0.5}
          />
          <path
            d="M 1120 280 C 1120 460, 1120 520, 1120 620"
            fill="none"
            stroke="#a855f7"
            strokeWidth={2.5}
            strokeDasharray="400"
            strokeDashoffset={Math.round(400 * (1 - node4Spring))}
            strokeOpacity={0.5}
          />
          <line
            x1={480}
            y1={620}
            x2={1120}
            y2={620}
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="12 10"
            strokeDashoffset={Math.round(-frame * 2)}
            strokeOpacity={0.45}
          />
        </svg>

        {/* SPATIAL NODE MATRIX */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '820px 540px',
            gridTemplateRows: '400px 280px',
            gap: 28,
            width: 1388,
            height: 708,
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* NODE 1: HERO AGENT ORCHESTRATION MONITOR */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '1 / 2',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.86) 0%, rgba(9, 14, 26, 0.92) 100%)',
              borderRadius: 28,
              border: '1.5px solid rgba(56, 189, 248, 0.38)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 40px rgba(6, 182, 212, 0.14)',
              padding: 34,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: node1Spring,
              transform: `translate3d(0px, ${Math.round((1 - node1Spring) * 45 + floatWave(0, 6))}px, 0px) scale(${node1Spring})`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 26, fontWeight: 950, color: '#ffffff' }}>
                {sanitizeForDisplay('ارکستراسیون ایجنت‌های خودکار')}
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#38bdf8',
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'rgba(56, 189, 248, 0.12)',
                }}
              >
                MCP://LIVE_SYNC
              </span>
            </div>

            {/* Dynamic Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 16, fontWeight: 800, color: '#cbd5e1' }}>
                <span>{sanitizeForDisplay('توان تخصیص کانتکست موازی')}</span>
                <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 950 }}>{activeSlider.toFixed(1)}%</span>
              </div>
              <div style={{ width: '100%', height: 14, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${activeSlider}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #38bdf8, #06b6d4)',
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>

            {/* Staggered Sub-Elements: Avatars & Telemetry Pills */}
            <div style={{ display: 'flex', gap: 14 }}>
              {AGENT_TELEMETRY_PILLS.map((pill, idx) => {
                const pillSpring = spring({
                  frame: Math.max(0, frame - 24 - idx * 8),
                  fps,
                  config: { damping: 13, stiffness: 120 },
                });
                return (
                  <div
                    key={pill.label}
                    style={{
                      flex: 1,
                      padding: '14px 16px',
                      borderRadius: 16,
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${pill.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      opacity: pillSpring,
                      transform: `translate3d(0px, ${Math.round((1 - pillSpring) * 30 + floatWave(idx * 18, 4) + idx * 0)}px, 0px) scale(${pillSpring})`,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: `${pill.color}22`,
                        border: `1.5px solid ${pill.color}`,
                        color: pill.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'monospace',
                        fontSize: 13,
                        fontWeight: 900,
                      }}
                    >
                      {pill.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>{sanitizeForDisplay(pill.label)}</div>
                      <div style={{ fontSize: 16, fontWeight: 950, color: pill.color, marginTop: 2 }}>
                        {sanitizeForDisplay(pill.value)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NODE 2: GAUGE PRECISION & STAGGERED SPARKLINE BARS */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: '1 / 2',
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.84) 0%, rgba(15, 23, 42, 0.92) 100%)',
              borderRadius: 28,
              border: '1.5px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65)',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: node2Spring,
              transform: `translate3d(0px, ${Math.round((1 - node2Spring) * -45 + floatWave(25, 6))}px, 0px) scale(${node2Spring})`,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 900, color: '#e9d5ff' }}>
              {sanitizeForDisplay('ضریب راستی‌آزمایی و دقت داده')}
            </div>

            <div style={{ fontSize: 58, fontWeight: 950, color: '#ffffff', letterSpacing: -1 }}>
              {activeGauge.toFixed(1)}٪
            </div>

            {/* Staggered Sparkline Columns */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 105 }}>
              {SPARKLINE_BARS.map((bar, idx) => {
                const barSpring = spring({
                  frame: Math.max(0, frame - 38 - idx * 6),
                  fps,
                  config: { damping: 12, stiffness: 125 },
                });
                return (
                  <div
                    key={`spark-${idx}`}
                    style={{
                      width: 28,
                      height: Math.round(bar.height * barSpring),
                      borderRadius: 8,
                      backgroundColor: bar.color,
                      boxShadow: `0 0 18px ${bar.color}66`,
                      transform: `translate3d(0px, ${Math.round(floatWave(idx * 15, 3) + idx * 0)}px, 0px)`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* NODE 3: QUANTUM SECURITY VERIFICATION PILLS */}
          <div
            style={{
              gridColumn: '1 / 2',
              gridRow: '2 / 3',
              background: 'rgba(15, 23, 42, 0.86)',
              borderRadius: 28,
              border: '1.5px solid rgba(16, 185, 129, 0.38)',
              padding: '26px 34px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: node3Spring,
              transform: `translate3d(0px, ${Math.round((1 - node3Spring) * 45 + floatWave(45, 5))}px, 0px) scale(${node3Spring})`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0, fontSize: 22, fontWeight: 950, color: '#f8fafc' }}>
                {sanitizeForDisplay('استاندارد امنیت و ایزولاسیون سازمانی')}
              </h4>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#34d399' }}>
                {sanitizeForDisplay('حفاظت لحظه‌ای')}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 18 }}>
              {SECURITY_BADGES.map((badge, idx) => {
                const badgeSpring = spring({
                  frame: Math.max(0, frame - 52 - idx * 9),
                  fps,
                  config: { damping: 13, stiffness: 120 },
                });
                return (
                  <div
                    key={badge.title}
                    style={{
                      flex: 1,
                      padding: '16px 20px',
                      borderRadius: 16,
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: `1px solid ${badge.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: badgeSpring,
                      transform: `translate3d(0px, ${Math.round((1 - badgeSpring) * 28 + floatWave(idx * 22, 4) + idx * 0)}px, 0px) scale(${badgeSpring})`,
                    }}
                  >
                    <span style={{ fontSize: 17, fontWeight: 900, color: '#f8fafc' }}>
                      {sanitizeForDisplay(badge.title)}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: badge.accent }}>
                      {sanitizeForDisplay(badge.status)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NODE 4: REALTIME FRAME VELOCITY TELEMETRY */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: '2 / 3',
              background: 'rgba(15, 23, 42, 0.86)',
              borderRadius: 28,
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              padding: '26px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: node4Spring,
              transform: `translate3d(0px, ${Math.round((1 - node4Spring) * 45 + floatWave(65, 6))}px, 0px) scale(${node4Spring})`,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: '#cbd5e1' }}>
              {sanitizeForDisplay('سرعت موتور رندر سینمایی')}
            </span>
            <div style={{ fontSize: 42, fontWeight: 950, color: '#f59e0b' }}>
              {sanitizeForDisplay(`${Math.round(renderFpsCounter)} فریم بر ثانیه`)}
            </div>
            <svg width="100%" height={36} viewBox="0 0 420 36">
              <path
                d="M 0 28 Q 105 4, 210 20 T 420 10"
                fill="none"
                stroke="#f59e0b"
                strokeWidth={3}
                strokeDasharray="460"
                strokeDashoffset={Math.round(460 * (1 - node4Spring))}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
