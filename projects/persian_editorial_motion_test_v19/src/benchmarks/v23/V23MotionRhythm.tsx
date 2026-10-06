import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock, calculateDecayingImpactShake } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 09 — MOTION RHYTHM & DELIBERATE SILENCE
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Strict Elements Constraint:
 * 1. ONE Geometric Object: Radiant Precision Compass Ring
 * 2. ONE Typographic Element: «ضرباهنگ» (Rhythm)
 * 3. ONE Background: Atmospheric Deep Canvas (#050811)
 * 
 * Choreography Timing:
 * - 000 - 018f: Pure Stillness / Silence
 * - 018 - 036f: Heavy Anticipation (Tension Pullback)
 * - 036 - 048f: Violent Acceleration
 * - 048f: Seismic Impact & Overshoot
 * - 049 - 068f: Decaying Secondary Elastic Motion
 * - 068 - 120f: DELIBERATE SILENCE / HOLD (52 frames = 1.73s of frozen tension)
 * - 120 - 150f: Secondary Emergence of Typography
 * - 150 - 210f: Rigid Final Coordinate Settle Lock
 */
export const V23MotionRhythm: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Anticipation (18 - 36f): Pull back to left with scale compression
  let posX = 0;
  let scaleX = 1.0;
  let scaleY = 1.0;
  let ringOpacity = 1.0;

  if (frame < 18) {
    // Pure initial stillness
    posX = 0;
    scaleX = 1.0;
    scaleY = 1.0;
  } else if (frame < 36) {
    // Tension Pullback
    const antP = interpolate(frame, [18, 36], [0, 1], {
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
    posX = interpolate(antP, [0, 1], [0, -140]);
    scaleX = interpolate(antP, [0, 1], [1.0, 0.82]);
    scaleY = interpolate(antP, [0, 1], [1.0, 1.15]);
  } else if (frame < 48) {
    // Violent Acceleration forward across screen
    const accP = interpolate(frame, [36, 48], [0, 1], {
      easing: Easing.bezier(0.85, 0, 0.15, 1),
    });
    posX = interpolate(accP, [0, 1], [-140, 0]);
    scaleX = interpolate(accP, [0, 0.7, 1], [0.82, 1.45, 1.0]);
    scaleY = interpolate(accP, [0, 0.7, 1], [1.15, 0.75, 1.0]);
  } else if (frame >= 48 && frame < 68) {
    // Post-Impact decaying harmonic oscillation
    const osc = calculateDecayingImpactShake(frame, 48, {
      durationFrames: 20,
      amplitude: 24,
    });
    const settle = calculateSettleLock(frame, 48, {
      anticipationFrames: 0,
      settleFrames: 18,
      scalePeak: 1.28,
    });
    posX = osc.shakeX * 0.4;
    scaleX = settle.scale;
    scaleY = settle.scale;
  } else {
    // Absolute Settle Lock (Zero subpixel movement)
    posX = 0;
    scaleX = 1.0;
    scaleY = 1.0;
  }

  // Impact Shockwave at f48
  const shockwave = interpolate(frame, [48, 68], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockOpacity = (1 - shockwave) * 0.85;

  // Typographic Reveal after the 52-frame Silence (f120 - 150)
  const typeReveal = interpolate(frame, [124, 150], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const typeSettle = calculateSettleLock(frame, 150, {
    anticipationFrames: 6,
    settleFrames: 12,
    scalePeak: 1.1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.95} />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 12,
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 13,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            BENCHMARK 09
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            ضرباهنگ حرکتی، سکوت ممتد و قفل نهایی (Authored Motion Rhythm & Silence)
          </span>
        </div>
        <span style={{ color: '#D4AF37', fontSize: 14, fontWeight: 700 }}>
          {frame < 18 && '۱. سکوت آغازین (Stillness)'}
          {frame >= 18 && frame < 36 && '۲. تنش و پس‌کشیدگی عمیق (Heavy Anticipation)'}
          {frame >= 36 && frame < 48 && '۳. شتاب خشونت‌بار (Violent Acceleration)'}
          {frame >= 48 && frame < 68 && '۴. اصابت زلزله‌وار و نوسان میرا (Impact & Decay)'}
          {frame >= 68 && frame < 120 && '۵. سکوت ممتد تعمدی (Deliberate Silence / Hold - 52 Frames)'}
          {frame >= 120 && '۶. بیداری ثانویه تایپوگرافی و قفل ابدی (Final Lock)'}
        </span>
      </div>

      {/* The Single Geometric Object: Precision Compass Ring */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${posX}px), -50%) scale(${scaleX}, ${scaleY})`,
          width: 320,
          height: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Shockwave Emitter at f48 */}
        {frame >= 48 && frame < 68 && (
          <div
            style={{
              position: 'absolute',
              width: 320 + shockwave * 400,
              height: 320 + shockwave * 400,
              borderRadius: '50%',
              border: '2px solid #D4AF37',
              opacity: shockOpacity,
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)',
            }}
          />
        )}

        <svg width="320" height="320" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="38" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
          {/* Compass Ticks */}
          <line x1="50" y1="4" x2="50" y2="12" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="50" y1="88" x2="50" y2="96" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="4" y1="50" x2="12" y2="50" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="88" y1="50" x2="96" y2="50" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="50" r="14" fill="rgba(212, 175, 55, 0.2)" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
        </svg>
      </div>

      {/* The Single Typographic Element: «ضرباهنگ» */}
      {frame >= 120 && (
        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
            direction: 'rtl',
            opacity: typeReveal,
            transform: `scale(${typeSettle.scale}) translateY(${typeSettle.translateY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textShadow: '0 0 35px rgba(212, 175, 55, 0.7)',
            }}
          >
            ضرباهنگ
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#D4AF37',
              marginTop: 8,
              letterSpacing: 3,
            }}
          >
            آهنگ‌سازی بصری با مکث‌های تعمدی و انضباط سکوت
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
