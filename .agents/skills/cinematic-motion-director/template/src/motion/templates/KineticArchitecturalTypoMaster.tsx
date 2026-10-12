/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 5: KINETIC ARCHITECTURAL TYPOGRAPHY ("BUILD THE FLOOR")
 * ============================================================================
 *
 * Open-Canvas 3D Kinetic Architectural Choreography:
 * - Zero corner watermarks or HUD clutter
 * - Every typographic beam, cable node, pillar segment, and foundation slab
 *   animates independently via staggered springs (`idx *`) and continuous micro-motion
 * - Structural SVG vectors draw dynamically via `strokeDashoffset`
 * - Subtle Videolancer Ultimate SFX via `<UniversalSoundDirector>` (<= 0.14 volume)
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';

export const KINETIC_TYPO_DURATION = 450; // 15.0s @ 30 FPS
export const KINETIC_TYPO_FPS = 30;
export const KINETIC_TYPO_WIDTH = 1920;
export const KINETIC_TYPO_HEIGHT = 1080;

const ACT1_PHRASES = [
  { text: 'به ما گفتند', accent: '#f4e9d5' },
  { text: 'در تاریکی', accent: '#f2b544' },
  { text: 'منتظر بمانید', accent: '#f4e9d5' },
];

const ACT2_SUSPENSION_NODES = [
  { x: 260, label: 'کشش اول', load: '۴۲ کیلونیوتن' },
  { x: 600, label: 'لنگر مرکزی', load: '۸۸ کیلونیوتن' },
  { x: 940, label: 'کشش دوم', load: '۴۲ کیلونیوتن' },
];

const ACT3_PILLAR_SEGMENTS = [
  { title: 'اراده نخست', metric: 'مقاومت محوری ۱۰۰٪', offsetX: -360 },
  { title: 'ستون مرکزی', metric: 'گشایش فضای عمودی', offsetX: 0 },
  { title: 'تکیه‌گاه پایدار', metric: 'تثبیت سازه کلمات', offsetX: 360 },
];

const ACT4_FOUNDATION_SLABS = [
  { label: 'پیِ نخست: شناخت', flex: 1, color: '#f2b544' },
  { label: 'بستر اصلی: اراده و حرکت', flex: 2, color: '#f4e9d5' },
  { label: 'پیِ نهایی: پیروزی', flex: 1, color: '#f2b544' },
];

export const KineticArchitecturalTypoMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps).lightPulse;
  const breathingPulse = 1 + beatPulse * 0.018;

  // Dynamic Open-Canvas Camera Trajectory (>= 920px travel across acts)
  const camX = interpolate(
    frame,
    [0, 95, 110, 125, 205, 220, 235, 315, 330, 345, 450],
    [0, 0, 460, 0, 0, -460, 0, 0, 460, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camY = interpolate(
    frame,
    [0, 95, 110, 125, 205, 220, 235, 315, 330, 345, 450],
    [0, 0, -40, 0, 0, 45, 0, 0, -35, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camScale = interpolate(
    frame,
    [0, 110, 220, 330, 450],
    [1.0, 1.04, 1.02, 1.05, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const floatWave = (seed: number, amp = 7) =>
    Math.round(Math.sin((frame + seed) * 0.07) * amp);

  // Act window envelope helper
  const actEnvelope = (start: number, end: number) =>
    interpolate(
      frame,
      [start - 10, start + 10, end - 12, end + 8],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

  // Phase 1: Lintel compression
  const lintelSpring = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 13, stiffness: 110 } });
  const compressionScale = interpolate(frame, [35, 95], [1.0, 0.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 2: Suspension cable deflection
  const cableDrop = spring({ frame: Math.max(0, frame - 112), fps, config: { damping: 12, stiffness: 100 } });
  const baselineDeflection = interpolate(cableDrop, [0, 0.7, 1], [0, 48, 22]);

  // Phase 3: Vertical Support Pillar rotation and lift
  const pillarRise = spring({ frame: Math.max(0, frame - 222), fps, config: { damping: 14, stiffness: 110 } });
  const structureAngle = interpolate(pillarRise, [0, 1], [-9, 0]);

  // Phase 4: Platform assembly
  const platformSpring = spring({ frame: Math.max(0, frame - 332), fps, config: { damping: 13, stiffness: 95 } });

  return (
    <div
      style={{
        position: 'relative',
        width: KINETIC_TYPO_WIDTH,
        height: KINETIC_TYPO_HEIGHT,
        backgroundColor: '#0c1712',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* 1. SUBTLE VIDEOLANCER ULTIMATE SFX & BGM DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Cipher2.mp3"
        bgmVolume={0.14}
        themeId="KINETIC_ARCHITECTURAL_TYPO"
      />

      {/* 2. ARCHITECTURAL DRAFTING CANVAS BACKGROUND (ZERO CORNER HUD CLUTTER) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 40%, rgba(20, 48, 36, 0.72) 0%, rgba(12, 23, 18, 0.95) 70%, #08100c 100%),
            linear-gradient(rgba(244, 233, 213, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 233, 213, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 80px 80px, 80px 80px',
        }}
      />

      {/* 3. OPEN-CANVAS 3D ARCHITECTURAL STAGE */}
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
        }}
      >
        {/* ================================================================= */}
        {/* ACT 1: OPEN-CANVAS LINTEL COMPRESSION & VECTOR AXES (0..115)       */}
        {/* ================================================================= */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [0, 12, 96, 114], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            pointerEvents: 'none',
          }}
        >
          {/* Open-Canvas Structural Vector Blueprint Lines */}
          <svg
            width={1600}
            height={700}
            viewBox="0 0 1600 700"
            style={{ position: 'absolute', overflow: 'visible' }}
          >
            <line
              x1={140}
              y1={190}
              x2={1460}
              y2={190}
              stroke="#f2b544"
              strokeWidth={2}
              strokeDasharray="1320"
              strokeDashoffset={Math.round(1320 * (1 - lintelSpring))}
              strokeOpacity={0.55}
            />
            <line
              x1={260}
              y1={110}
              x2={260}
              y2={560}
              stroke="#f4e9d5"
              strokeWidth={1.5}
              strokeDasharray="450"
              strokeDashoffset={Math.round(450 * (1 - lintelSpring))}
              strokeOpacity={0.3}
            />
            <line
              x1={1340}
              y1={110}
              x2={1340}
              y2={560}
              stroke="#f4e9d5"
              strokeWidth={1.5}
              strokeDasharray="450"
              strokeDashoffset={Math.round(450 * (1 - lintelSpring))}
              strokeOpacity={0.3}
            />
          </svg>

          {/* Heavy Architectural Lintel Slab */}
          <div
            style={{
              width: 1180,
              height: 132,
              backgroundColor: '#f2b544',
              color: '#0c1712',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 84,
              fontWeight: 950,
              letterSpacing: -1,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85)',
              borderBottom: '4px solid #ffffff',
              transform: `translate3d(0px, ${Math.round((1 - lintelSpring) * -140 + floatWave(10, 5))}px, 0px) scale(${lintelSpring})`,
            }}
          >
            {sanitizeForDisplay('صـــــــبـــــــر')}
          </div>

          {/* Staggered Spoken Word Nodes Floating Under Compression */}
          <div
            style={{
              display: 'flex',
              gap: 28,
              marginTop: 64,
              transform: `scaleY(${compressionScale})`,
            }}
          >
            {ACT1_PHRASES.map((phrase, idx) => {
              const wordSpring = spring({
                frame: Math.max(0, frame - 16 - idx * 8),
                fps,
                config: { damping: 13, stiffness: 120 },
              });
              const wordFloat = floatWave(idx * 25, 6);
              return (
                <div
                  key={phrase.text}
                  style={{
                    padding: '14px 32px',
                    borderBottom: `2px solid ${phrase.accent}`,
                    fontSize: 40,
                    fontWeight: 900,
                    color: phrase.accent,
                    opacity: wordSpring,
                    transform: `translate3d(0px, ${Math.round((1 - wordSpring) * 45 + wordFloat + idx * 0)}px, 0px) scale(${wordSpring})`,
                  }}
                >
                  {sanitizeForDisplay(phrase.text)}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* ACT 2: SUSPENDED CABLES & DEFLECTED BASELINE (105..225)            */}
        {/* ================================================================= */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: actEnvelope(110, 222),
            pointerEvents: 'none',
          }}
        >
          {/* Dynamic SVG Suspension Cables with strokeDashoffset */}
          <svg width={1200} height={340} viewBox="0 0 1200 340" style={{ position: 'absolute', top: 110, overflow: 'visible' }}>
            <line
              x1={260}
              y1={0}
              x2={260}
              y2={Math.round(210 * cableDrop)}
              stroke="#f2b544"
              strokeWidth={3}
              strokeDasharray="240"
              strokeDashoffset={Math.round(240 * (1 - cableDrop))}
            />
            <line
              x1={600}
              y1={0}
              x2={600}
              y2={Math.round(225 * cableDrop)}
              stroke="#34d399"
              strokeWidth={3}
              strokeDasharray="240"
              strokeDashoffset={Math.round(240 * (1 - cableDrop))}
            />
            <line
              x1={940}
              y1={0}
              x2={940}
              y2={Math.round(210 * cableDrop)}
              stroke="#f2b544"
              strokeWidth={3}
              strokeDasharray="240"
              strokeDashoffset={Math.round(240 * (1 - cableDrop))}
            />
            <path
              d={`M 140 210 Q 600 ${Math.round(210 + baselineDeflection)} 1060 210`}
              fill="none"
              stroke="#f4e9d5"
              strokeWidth={4}
              strokeDasharray="960"
              strokeDashoffset={Math.round(960 * (1 - cableDrop))}
            />
          </svg>

          {/* Suspended Typography Headline on Open Canvas */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 40,
              transform: `translate3d(0px, ${Math.round((1 - cableDrop) * -55 + floatWave(20, 7))}px, 0px) scale(${cableDrop})`,
            }}
          >
            <h2 style={{ fontSize: 68, fontWeight: 950, color: '#f2b544', margin: 0, textShadow: '0 12px 40px rgba(0,0,0,0.85)' }}>
              {sanitizeForDisplay('سنگینیِ این بار')}
            </h2>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#f4e9d5', margin: '12px 0 0 0' }}>
              {sanitizeForDisplay('و ما وزن خاموشی را بر کابل‌های زمان آزمودیم')}
            </p>
          </div>

          {/* Staggered Tension Telemetry Nodes */}
          <div style={{ display: 'flex', gap: 44, marginTop: 68 }}>
            {ACT2_SUSPENSION_NODES.map((node, idx) => {
              const nodeSpring = spring({
                frame: Math.max(0, frame - 124 - idx * 9),
                fps,
                config: { damping: 13, stiffness: 115 },
              });
              return (
                <div
                  key={node.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px 28px',
                    borderTop: '3px solid #f2b544',
                    background: 'rgba(242, 181, 68, 0.08)',
                    opacity: nodeSpring,
                    transform: `translate3d(0px, ${Math.round((1 - nodeSpring) * 40 + floatWave(idx * 30, 6) + idx * 0)}px, 0px) scale(${nodeSpring})`,
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#f4e9d5' }}>
                    {sanitizeForDisplay(node.label)}
                  </span>
                  <span style={{ fontSize: 24, fontWeight: 950, color: '#f2b544', marginTop: 6 }}>
                    {sanitizeForDisplay(node.load)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* ACT 3: PILLAR SUPPORT ROTATION & LIFT (215..335)                   */}
        {/* ================================================================= */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: actEnvelope(220, 332),
            pointerEvents: 'none',
          }}
        >
          {/* SVG Structural Truss & Diagonal Bracing */}
          <svg width={1400} height={600} viewBox="0 0 1400 600" style={{ position: 'absolute', overflow: 'visible' }}>
            <line
              x1={100}
              y1={280}
              x2={1300}
              y2={280}
              stroke="#f4e9d5"
              strokeWidth={8}
              strokeDasharray="1200"
              strokeDashoffset={Math.round(1200 * (1 - pillarRise))}
              transform={`rotate(${structureAngle} 700 280)`}
            />
            <line
              x1={340}
              y1={520}
              x2={700}
              y2={280}
              stroke="#f2b544"
              strokeWidth={3}
              strokeDasharray="460"
              strokeDashoffset={Math.round(460 * (1 - pillarRise))}
            />
            <line
              x1={1060}
              y1={520}
              x2={700}
              y2={280}
              stroke="#f2b544"
              strokeWidth={3}
              strokeDasharray="460"
              strokeDashoffset={Math.round(460 * (1 - pillarRise))}
            />
          </svg>

          {/* Headline */}
          <div
            style={{
              position: 'relative',
              textAlign: 'center',
              zIndex: 10,
              marginBottom: 56,
              transform: `translate3d(0px, ${Math.round((1 - pillarRise) * -40 + floatWave(40, 6))}px, 0px) scale(${pillarRise})`,
            }}
          >
            <h2 style={{ fontSize: 62, fontWeight: 950, color: '#ffffff', margin: 0, textShadow: '0 6px 28px rgba(0,0,0,0.9)' }}>
              {sanitizeForDisplay('سپس یک اراده فضا را شکافت')}
            </h2>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#f2b544', display: 'block', marginTop: 10 }}>
              {sanitizeForDisplay('ستون‌های کلمات سقفِ سنگین را به آسمان افراشتند')}
            </span>
          </div>

          {/* 3 Staggered Rising Pillar Columns on Open Canvas */}
          <div style={{ display: 'flex', gap: 56, alignItems: 'flex-end', zIndex: 10 }}>
            {ACT3_PILLAR_SEGMENTS.map((pillar, idx) => {
              const colSpring = spring({
                frame: Math.max(0, frame - 230 - idx * 10),
                fps,
                config: { damping: 13, stiffness: 115 },
              });
              return (
                <div
                  key={pillar.title}
                  style={{
                    width: 310,
                    padding: '28px 24px',
                    borderLeft: '4px solid #f2b544',
                    borderTop: '2px solid rgba(244, 233, 213, 0.5)',
                    background: 'rgba(12, 23, 18, 0.85)',
                    opacity: colSpring,
                    transform: `translate3d(0px, ${Math.round((1 - colSpring) * 70 + floatWave(idx * 35, 6) + idx * 0)}px, 0px) scale(${colSpring})`,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 950, color: '#f2b544' }}>
                    {sanitizeForDisplay(pillar.title)}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#f4e9d5', marginTop: 8 }}>
                    {sanitizeForDisplay(pillar.metric)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* ACT 4: THE MONUMENTAL FLOOR BELONGS TO US (325..450)               */}
        {/* ================================================================= */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [322, 338, 450], [0, 1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            pointerEvents: 'none',
          }}
        >
          {/* Open-Canvas Architectural Crown Arc */}
          <svg width={1500} height={540} viewBox="0 0 1500 540" style={{ position: 'absolute', overflow: 'visible' }}>
            <path
              d="M 120 440 L 750 80 L 1380 440"
              fill="none"
              stroke="#f2b544"
              strokeWidth={3}
              strokeDasharray="1500"
              strokeDashoffset={Math.round(1500 * (1 - platformSpring))}
              strokeOpacity={0.65}
            />
          </svg>

          {/* Monumental Open-Canvas Manifesto Header */}
          <div
            style={{
              textAlign: 'center',
              transform: `translate3d(0px, ${Math.round((1 - platformSpring) * 45 + floatWave(60, 5))}px, 0px) scale(${platformSpring * (1 + beatPulse * 0.02)})`,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '8px 24px',
                backgroundColor: '#f2b544',
                color: '#0c1712',
                fontSize: 18,
                fontWeight: 950,
                marginBottom: 22,
              }}
            >
              {sanitizeForDisplay('مانیفست نهایی معماری حرکت')}
            </div>

            <h1
              style={{
                fontSize: 74,
                fontWeight: 950,
                color: '#f4e9d5',
                margin: '0 0 18px 0',
                lineHeight: 1.15,
                textShadow: '0 15px 45px rgba(0,0,0,0.9)',
              }}
            >
              {sanitizeForDisplay('اکنون تمام این میدان از آنِ ماست')}
            </h1>

            <p style={{ fontSize: 28, fontWeight: 800, color: '#f2b544', maxWidth: 920, margin: '0 auto' }}>
              {sanitizeForDisplay('بر کلماتی که خود پی، ستون و سقف این بنا را ساختند.')}
            </p>
          </div>

          {/* Staggered Foundation Blocks */}
          <div style={{ display: 'flex', gap: 24, marginTop: 54, width: 1320, justifyContent: 'space-between' }}>
            {ACT4_FOUNDATION_SLABS.map((slab, idx) => {
              const slabSpring = spring({
                frame: Math.max(0, frame - 344 - idx * 9),
                fps,
                config: { damping: 13, stiffness: 115 },
              });
              return (
                <div
                  key={slab.label}
                  style={{
                    flex: slab.flex,
                    padding: '18px 24px',
                    backgroundColor: slab.color,
                    color: '#0c1712',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 950,
                    opacity: slabSpring,
                    transform: `translate3d(0px, ${Math.round((1 - slabSpring) * 45 + floatWave(idx * 20, 4) + idx * 0)}px, 0px) scale(${slabSpring})`,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.75)',
                  }}
                >
                  {sanitizeForDisplay(slab.label)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
