/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 5: KINETIC ARCHITECTURAL TYPOGRAPHY ("BUILD THE FLOOR")
 * ============================================================================
 * 
 * Inspired by @Gdgtify's viral masterpiece "BUILD THE FLOOR" (awesome-opus5-5-videos):
 * - A miniature spoken-word manifesto staged entirely through architectural typography
 * - Words assign structural roles: Lintel, Suspension Load, Pillar Support, Platform
 * - The final declaration physically stands on the architecture earlier words built
 * - Monumental high-contrast typography (Yekan Bakh Fat / 950 weight)
 * - Deep architectural slate (#0d1d16) with subtle construction ruler markings
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, staticFile } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';

export const KINETIC_TYPO_DURATION = 450; // 15.0s @ 30 FPS
export const KINETIC_TYPO_FPS = 30;
export const KINETIC_TYPO_WIDTH = 1920;
export const KINETIC_TYPO_HEIGHT = 1080;

export const KineticArchitecturalTypoMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Phase Timing:
  // Phase 1 (0..105): "به ما گفتند صبر کنید." - Typographic compression under heavy beam
  // Phase 2 (105..215): "و ما وزن انتظار را سنجیدیم." - Suspended cables and deflected baseline
  // Phase 3 (215..325): "سپس یک اراده فضا را گشود." - Vertical support pillar lifting the frame
  // Phase 4 (325..450): "اکنون میدان از آن ماست." - Ground platform locking into place

  // Phase 1: Lintel compression
  const lintelY = interpolate(frame, [0, 50, 100], [-100, 180, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const compressionScale = interpolate(frame, [50, 100], [1.0, 0.92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Phase 2: Suspension cable deflection
  const cableDrop = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12, stiffness: 100 } });
  const baselineDeflection = interpolate(cableDrop, [0, 0.7, 1], [0, 45, 20]);

  // Phase 3: Vertical Support Pillar rotation and lift
  const pillarRise = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 14, stiffness: 110 } });
  const structureAngle = interpolate(pillarRise, [0, 1], [-8, 0]);

  // Phase 4: Platform assembly
  const platformSpring = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 13, stiffness: 95 } });

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
      {/* 1. ARCHITECTURAL DRAFTING CANVAS & RULER MARKS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 40%, rgba(20, 48, 36, 0.7) 0%, rgba(12, 23, 18, 0.95) 70%, #08100c 100%),
            linear-gradient(rgba(244, 233, 213, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 233, 213, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 80px 80px, 80px 80px',
        }}
      />

      {/* Top architectural ruler tick marks */}
      <div style={{ position: 'absolute', top: 0, left: 60, right: 60, height: 24, borderBottom: '1px solid rgba(242, 181, 68, 0.25)', display: 'flex', justifyContent: 'space-between', opacity: 0.6 }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} style={{ width: 1, height: i % 5 === 0 ? 14 : 6, backgroundColor: '#f2b544' }} />
        ))}
      </div>

      {/* Structural Metadata Watermark */}
      <div style={{ position: 'absolute', bottom: 32, right: 64, fontFamily: 'monospace', fontSize: 13, color: 'rgba(244, 233, 213, 0.35)', letterSpacing: 2, direction: 'ltr' }}>
        ARCH_STRUCT // SPEC_OPUS_5.5 · FRAME_ID: {frame}
      </div>

      {/* =================================================================== */}
      {/* ACT 1: LINTEL COMPRESSION (0..110)                                   */}
      {/* =================================================================== */}
      {frame < 120 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [95, 115], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          {/* Heavy Architectural Lintel Block */}
          <div
            style={{
              position: 'absolute',
              top: lintelY,
              width: 1400,
              height: 140,
              backgroundColor: '#f2b544',
              color: '#0c1712',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 88,
              fontWeight: 950,
              letterSpacing: -1,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
              borderBottom: '4px solid #ffffff',
            }}
          >
            {sanitizeForDisplay('صـــــــبـــــــر')}
          </div>

          {/* Compressed Spoken Sub-phrase */}
          <div
            style={{
              marginTop: 180,
              fontSize: 38,
              fontWeight: 800,
              color: '#f4e9d5',
              transform: `scaleY(${compressionScale})`,
              letterSpacing: 0.5,
            }}
          >
            {sanitizeForDisplay('به ما گفتند در تاریکی منتظر بمانید.')}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ACT 2: SUSPENDED CABLES & DEFLECTED BASELINE (105..225)              */}
      {/* =================================================================== */}
      {frame >= 105 && frame < 230 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [105, 115, 210, 225], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          {/* Suspension Cables */}
          <svg width="1200" height="260" style={{ position: 'absolute', top: 120 }}>
            <line x1="300" y1="0" x2="300" y2={180 * cableDrop} stroke="#f2b544" strokeWidth="2.5" strokeDasharray="4 4" />
            <line x1="900" y1="0" x2="900" y2={180 * cableDrop} stroke="#f2b544" strokeWidth="2.5" strokeDasharray="4 4" />
            <path
              d={`M 150 200 Q 600 ${200 + baselineDeflection} 1050 200`}
              fill="none"
              stroke="#f4e9d5"
              strokeWidth="4"
            />
          </svg>

          {/* Suspended Word Load */}
          <div
            style={{
              transform: `translateY(${interpolate(cableDrop, [0, 1], [-60, 20])}px)`,
              background: 'rgba(242, 181, 68, 0.12)',
              border: '2px solid #f2b544',
              padding: '24px 64px',
              borderRadius: 8,
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 style={{ fontSize: 64, fontWeight: 950, color: '#f2b544', margin: 0 }}>
              {sanitizeForDisplay('سنگینیِ این بار')}
            </h2>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#f4e9d5', margin: '12px 0 0 0', textAlign: 'center' }}>
              {sanitizeForDisplay('و ما وزن خاموشی را آزمودیم.')}
            </p>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ACT 3: PILLAR SUPPORT ROTATION & LIFT (215..335)                     */}
      {/* =================================================================== */}
      {frame >= 215 && frame < 340 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [215, 225, 320, 335], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          {/* Angled Beam */}
          <div
            style={{
              width: 1300,
              height: 12,
              backgroundColor: '#f4e9d5',
              transform: `rotate(${structureAngle}deg)`,
              position: 'absolute',
              boxShadow: '0 0 25px rgba(244, 233, 213, 0.4)',
            }}
          />

          {/* Vertical Support Pillar */}
          <div
            style={{
              position: 'absolute',
              bottom: 220,
              left: 450,
              width: 80,
              height: 400 * pillarRise,
              backgroundColor: '#f2b544',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              writingMode: 'vertical-rl',
              color: '#0c1712',
              fontSize: 32,
              fontWeight: 950,
              letterSpacing: 2,
            }}
          >
            {sanitizeForDisplay('ستون')}
          </div>

          <div style={{ position: 'relative', textAlign: 'center', zIndex: 10 }}>
            <h2 style={{ fontSize: 58, fontWeight: 950, color: '#ffffff', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              {sanitizeForDisplay('سپس یک اراده فضا را شکافت')}
            </h2>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#f2b544' }}>
              {sanitizeForDisplay('نخستین ستون برای ساختن تکیه‌گاه استوار')}
            </span>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ACT 4: THE MONUMENTAL FLOOR BELONGS TO US (325..450)                 */}
      {/* =================================================================== */}
      {frame >= 325 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: platformSpring,
          }}
        >
          {/* Monumental Platform Built by Words */}
          <div
            style={{
              width: 1400,
              padding: '60px 48px',
              backgroundColor: '#f4e9d5',
              color: '#0c1712',
              borderRadius: 4,
              boxShadow: '0 40px 120px rgba(0, 0, 0, 0.95), 0 0 60px rgba(242, 181, 68, 0.3)',
              textAlign: 'center',
              transform: `scale(${platformSpring * (1 + beatPulse.scalePulse * 0.2)})`,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '6px 20px',
                backgroundColor: '#0c1712',
                color: '#f2b544',
                fontSize: 16,
                fontWeight: 900,
                marginBottom: 20,
                letterSpacing: 1,
              }}
            >
              {sanitizeForDisplay('مانیفست نهایی')}
            </div>

            <h1
              style={{
                fontSize: 68,
                fontWeight: 950,
                color: '#0c1712',
                margin: '0 0 16px 0',
                lineHeight: 1.15,
                letterSpacing: -1,
              }}
            >
              {sanitizeForDisplay('اکنون تمام این میدان از آنِ ماست')}
            </h1>

            <p style={{ fontSize: 24, fontWeight: 700, color: '#4a5b51', maxWidth: 880, margin: '0 auto' }}>
              {sanitizeForDisplay('بر کلماتی که خود پی، ستون و سقف این بنا را ساختند.')}
            </p>
          </div>

          {/* Foundation Blocks */}
          <div style={{ display: 'flex', gap: 16, marginTop: 24, width: 1400, justifyContent: 'space-between' }}>
            <div style={{ flex: 1, height: 20, backgroundColor: '#f2b544', opacity: 0.8 }} />
            <div style={{ flex: 2, height: 20, backgroundColor: '#f2b544' }} />
            <div style={{ flex: 1, height: 20, backgroundColor: '#f2b544', opacity: 0.8 }} />
          </div>
        </div>
      )}

      {/* STUDIO SOUNDTRACK */}
      <Audio src={staticFile('music/Cipher2.mp3')} volume={0.8} />
    </div>
  );
};
