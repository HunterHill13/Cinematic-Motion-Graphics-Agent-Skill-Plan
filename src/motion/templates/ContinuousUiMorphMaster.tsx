/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 3: CONTINUOUS UI MORPH MASTER (SINGLE-ELEMENT DRIBBBLE POLISH)
 * ============================================================================
 * 
 * Inspired by @TheGrootDev motion prompt (yihui-dev/awesome-opus5-5-videos):
 * - One persistent central container that never cuts
 * - Smoothly morphs from button -> circular loader -> interactive card -> stat chart -> confirmation pill
 * - Visible interactive cursor driving clicks, toggles, and state changes
 * - Sound design: Kenney mechanical clicks, switches, and transient chimes
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, Sequence, staticFile } from 'remotion';
import { InteractiveCursor } from '../library/InteractiveCursor';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { MaskedKineticHeadline } from '../library/MaskedKineticTypography';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';

export const CONTINUOUS_UI_DURATION = 450; // 15.0s @ 30 FPS
export const CONTINUOUS_UI_FPS = 30;
export const CONTINUOUS_UI_WIDTH = 1920;
export const CONTINUOUS_UI_HEIGHT = 1080;

export const ContinuousUiMorphMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Phase 1 (0..90): Centered Hero CTA Button
  // Phase 2 (90..180): Circular Scanner & Expansion
  // Phase 3 (180..270): Interactive Slider & Settings Card
  // Phase 4 (270..360): Kinetic Stat Chart
  // Phase 5 (360..450): Confirmation Toast & Reset

  // Morphing Container Dimensions & Radii
  const containerWidth = interpolate(
    frame,
    [0, 80, 110, 170, 200, 260, 290, 360, 390, 440],
    [320, 320, 180, 180, 980, 980, 1260, 1260, 380, 320],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  const containerHeight = interpolate(
    frame,
    [0, 80, 110, 170, 200, 260, 290, 360, 390, 440],
    [80, 80, 180, 180, 520, 520, 600, 600, 80, 80],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0, 1) }
  );

  const containerRadius = interpolate(
    frame,
    [0, 80, 110, 170, 200, 260, 290, 360, 390, 440],
    [40, 40, 90, 90, 24, 24, 24, 24, 40, 40],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Button recoil on click at frame 75
  const clickRecoil = interpolate(frame, [72, 75, 82], [1.0, 0.92, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Camera depth breathing
  const camZ = interpolate(
    frame,
    [0, 80, 180, 280, 380, 450],
    [0, 60, -40, 80, -30, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
  );

  // Spinner rotation in phase 2
  const spinnerRotation = interpolate(frame, [90, 180], [0, 540], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      {/* 1. DEDICATED ARCHITECTURAL STUDIO MESH GLASS BACKDROP */}
      <StudioMeshGlassBackdrop
        camX={0}
        camY={0}
        camZ={camZ}
        primaryLightColor="#6366f1"
        accentGlowColor="#a855f7"
      />

      {/* TOP HEADER BRANDING */}
      <div style={{ position: 'absolute', top: 50, textAlign: 'center', direction: 'rtl', zIndex: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: '#94a3b8', letterSpacing: 1 }}>
          {sanitizeForDisplay('سیستم طراحی تعاملی · مورفینگ پیوسته تک‌المان')}
        </span>
      </div>

      {/* THE SINGLE PERSISTENT MORPHING CONTAINER */}
      <div
        style={{
          width: containerWidth,
          height: containerHeight,
          borderRadius: containerRadius,
          background: frame < 85 ? '#0f172a' : frame < 185 ? '#3b82f6' : '#ffffff',
          border: frame < 185 ? 'none' : '2px solid #e2e8f0',
          boxShadow: '0 25px 60px -10px rgba(15, 23, 42, 0.18), 0 10px 25px -5px rgba(15, 23, 42, 0.1)',
          transform: `scale(${clickRecoil * (1 + beatPulse.scalePulse * 0.4)}) translateZ(${camZ}px)`,
          transition: 'background 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          direction: 'rtl',
        }}
      >
        {/* STATE 1: CTA BUTTON (0..85) */}
        {frame < 85 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#ffffff', fontSize: 20, fontWeight: 900 }}>
            <span>▶</span>
            <span>{sanitizeForDisplay('آغاز اسکن هوشمند')}</span>
          </div>
        )}

        {/* STATE 2: SCANNER LOADER (85..185) */}
        {frame >= 85 && frame < 185 && (
          <div style={{ position: 'relative', width: 90, height: 90 }}>
            <svg width={90} height={90} style={{ transform: `rotate(${spinnerRotation}deg)` }}>
              <circle cx={45} cy={45} r={36} fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth={8} />
              <circle cx={45} cy={45} r={36} fill="none" stroke="#ffffff" strokeWidth={8} strokeDasharray={180} strokeDashoffset={60} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: 20, fontWeight: 900 }}>
              ⚡
            </div>
          </div>
        )}

        {/* STATE 3: INTERACTIVE CONTROLS CARD (185..280) */}
        {frame >= 185 && frame < 280 && (
          <div style={{ width: '100%', height: '100%', padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>
                {sanitizeForDisplay('تنظیمات پارامتریک و دقت مدل')}
              </span>
              <span style={{ padding: '6px 14px', borderRadius: 20, background: '#ecfdf5', color: '#059669', fontSize: 14, fontWeight: 800 }}>
                {sanitizeForDisplay('وضعیت: فعال')}
              </span>
            </div>

            {/* Slider Mockup */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 16, fontWeight: 700, color: '#475569' }}>
                <span>{sanitizeForDisplay('حداکثر توان پردازش موازی')}</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#2563eb' }}>98.5%</span>
              </div>
              <div style={{ height: 16, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${Math.min(98, (frame - 185) * 2.2)}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: 999 }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ flex: 1, padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>{sanitizeForDisplay('تأخیر پاسخ')}</span>
                <p style={{ margin: '4px 0 0 0', fontSize: 20, fontWeight: 900, color: '#0f172a' }}>۱.۴ میلی‌ثانیه</p>
              </div>
              <div style={{ flex: 1, padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <span style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>{sanitizeForDisplay('پایداری اتصال')}</span>
                <p style={{ margin: '4px 0 0 0', fontSize: 20, fontWeight: 900, color: '#10b981' }}>۱۰۰٪ پایدار</p>
              </div>
            </div>
          </div>
        )}

        {/* STATE 4: STAT CHART & TELEMETRY (280..370) */}
        {frame >= 280 && frame < 370 && (
          <div style={{ width: '100%', height: '100%', padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>
              {sanitizeForDisplay('تحلیل ترافیک و بازدهی سامانه')}
            </span>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 280, paddingBottom: 16 }}>
              {[
                { label: 'هفته ۱', val: 65, col: '#94a3b8' },
                { label: 'هفته ۲', val: 78, col: '#38bdf8' },
                { label: 'هفته ۳', val: 92, col: '#3b82f6' },
                { label: 'هفته جاری', val: 99, col: '#10b981' },
              ].map((bar, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 88 }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: bar.col }}>{bar.val}٪</span>
                  <div
                    style={{
                      width: '100%',
                      height: (bar.val / 100) * 190,
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
        )}

        {/* STATE 5: CONFIRMATION TOAST & RESET (370..450) */}
        {frame >= 370 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#ffffff', fontSize: 18, fontWeight: 900 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✔
            </div>
            <span style={{ color: '#0f172a' }}>{sanitizeForDisplay('عملیات با موفقیت تأیید شد')}</span>
          </div>
        )}
      </div>

      {/* INTERACTIVE CURSOR INTERACTING WITH THE MORPHING ELEMENT */}
      <InteractiveCursor
        startFrame={30}
        clickFrame={75}
        endFrame={130}
        targetX={960}
        targetY={540}
      />

      {/* AUDIO LAYER (BGM + Kenney Mechanical SFX) */}
      <Audio src={staticFile('music/Tech_Live.mp3')} volume={0.7} />

      <Sequence from={74} durationInFrames={25}>
        <Audio src={staticFile('sfx/kenney_mouseclick.wav')} volume={0.95} />
      </Sequence>
      <Sequence from={85} durationInFrames={35}>
        <Audio src={staticFile('sfx/remotion_whip.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={185} durationInFrames={30}>
        <Audio src={staticFile('sfx/kenney_switch.wav')} volume={0.9} />
      </Sequence>
      <Sequence from={280} durationInFrames={45}>
        <Audio src={staticFile('sfx/remotion_whoosh.wav')} volume={0.75} />
      </Sequence>
      <Sequence from={365} durationInFrames={50}>
        <Audio src={staticFile('sfx/remotion_ding.wav')} volume={0.95} />
      </Sequence>
    </div>
  );
};
