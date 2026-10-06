import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 01 — DOT → BALL → BOUNCE → TEXT
 * Duration: 180 frames (6.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - Mass conservation in motion
 * - Velocity-driven squash & stretch
 * - Realistic gravitational bounce timing
 * - Physical metamorphosis of bouncing mass into typography
 * - Extrusion of baseline carrier into subsequent scene state
 */
export const V23DotBallBounceText: React.FC = () => {
  const frame = useCurrentFrame();

  // Floor datum line Y coordinate
  const floorY = 720;
  const centerX = 960;

  // Phase 1 (0 - 30f): Small dot enters from left, accelerates, stretches horizontally
  const enterProgress = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dotX = interpolate(enterProgress, [0, 1], [150, centerX]);
  const dotY = interpolate(enterProgress, [0, 0.7, 1], [300, 320, 240]);
  const streakStretch = interpolate(enterProgress, [0, 0.6, 1], [1, 4.5, 1]);

  // Phase 2 (30 - 55f): Arc ascension & mass accumulation into ball
  const ballFormProgress = interpolate(frame, [30, 55], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ballSize = interpolate(ballFormProgress, [0, 1], [12, 84]);

  // Phase 3 (55 - 75f): Drop to Impact 1 at floorY
  const drop1Progress = interpolate(frame, [55, 75], [0, 1], {
    easing: Easing.bezier(0.55, 0, 1, 0.45), // gravity acceleration
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const drop1Y = interpolate(drop1Progress, [0, 1], [240, floorY - ballSize / 2]);

  // Impact 1 Squash & Stretch (75 - 82f)
  const impact1Progress = interpolate(frame, [75, 78, 83], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const squash1X = 1 + impact1Progress * 0.75;
  const squash1Y = 1 - impact1Progress * 0.55;

  // Phase 4 (83 - 105f): Bounce 1 rebound to peak y=460 and drop to Impact 2
  let bounce1Y = drop1Y;
  let currentSquashX = squash1X;
  let currentSquashY = squash1Y;

  if (frame >= 83 && frame < 95) {
    const rebound1 = interpolate(frame, [83, 95], [0, 1], {
      easing: Easing.bezier(0, 0.55, 0.45, 1), // deceleration to apex
    });
    bounce1Y = interpolate(rebound1, [0, 1], [floorY - ballSize / 2, 440]);
    currentSquashX = 0.85; // vertical stretch in flight
    currentSquashY = 1.25;
  } else if (frame >= 95 && frame < 108) {
    const drop2 = interpolate(frame, [95, 108], [0, 1], {
      easing: Easing.bezier(0.55, 0, 1, 0.45), // drop to floor
    });
    bounce1Y = interpolate(drop2, [0, 1], [440, floorY - ballSize / 2]);
    currentSquashX = 0.88;
    currentSquashY = 1.18;
  } else if (frame >= 108 && frame < 114) {
    // Impact 2 squash
    const imp2 = interpolate(frame, [108, 110, 114], [0, 1, 0]);
    bounce1Y = floorY - ballSize / 2 + imp2 * 8;
    currentSquashX = 1 + imp2 * 0.45;
    currentSquashY = 1 - imp2 * 0.35;
  } else if (frame >= 114 && frame < 135) {
    // Final ascension toward center (y=540) where it morphs into text
    const finalAscent = interpolate(frame, [114, 132], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    bounce1Y = interpolate(finalAscent, [0, 1], [floorY - ballSize / 2, 540]);
    currentSquashX = interpolate(finalAscent, [0, 1], [1, 1]);
    currentSquashY = interpolate(finalAscent, [0, 1], [1, 1]);
  } else if (frame >= 135) {
    bounce1Y = 540;
    currentSquashX = 1;
    currentSquashY = 1;
  }

  // Shockwave ring on floor impact at f75
  const shockwave1 = interpolate(frame, [75, 95], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwave1Radius = shockwave1 * 220;
  const shockwave1Opacity = (1 - shockwave1) * 0.8;

  // Phase 5 (125 - 150f): Morph Ball → Persian Typographic Word «جهش»
  const morphProgress = interpolate(frame, [125, 145], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ballOpacity = 1 - morphProgress;
  const textOpacity = morphProgress;

  // Typographic settle lock at f145
  const textSettle = calculateSettleLock(frame, 145, {
    anticipationFrames: 8,
    settleFrames: 14,
    scalePeak: 1.15,
  });

  // Phase 6 (150 - 180f): Extrude structural baseline datum rule out from word
  const baselineLength = interpolate(frame, [150, 175], [0, 780], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />

      {/* Header Label */}
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
            BENCHMARK 01
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            نقطه → گوی → جهش کشسانی → کلمه (Dot → Ball → Bounce → Text)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 75 && 'فاز ۱: شتاب و سقوط گرانشی'}
          {frame >= 75 && frame < 125 && 'فاز ۲: اصابت به زمین، فشردگی و بازگشت (Squash & Stretch)'}
          {frame >= 125 && 'فاز ۳: تبدیل توده فیزیکی به تایپوگرافی و استخراج خط مبنا'}
        </span>
      </div>

      {/* Floor Datum Ground Line */}
      <div
        style={{
          position: 'absolute',
          top: floorY,
          left: 100,
          right: 100,
          height: 1.5,
          backgroundColor: 'rgba(212, 175, 55, 0.35)',
        }}
      />

      {/* Impact 1 Shockwave Ring */}
      {frame >= 75 && frame < 95 && (
        <div
          style={{
            position: 'absolute',
            top: floorY,
            left: centerX,
            width: shockwave1Radius * 2,
            height: 18,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2px solid #D4AF37',
            opacity: shockwave1Opacity,
            boxShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
          }}
        />
      )}

      {/* The Metamorphic Physical Actor (Dot/Ball) */}
      {frame < 145 && (
        <div
          style={{
            position: 'absolute',
            left: frame < 30 ? dotX : centerX,
            top: frame < 30 ? dotY : bounce1Y,
            width: ballSize * (frame < 30 ? streakStretch : currentSquashX),
            height: ballSize * (frame < 30 ? 1 / streakStretch : currentSquashY),
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle at 35% 35%, #FDE047 0%, #D4AF37 55%, #78350F 100%)',
            boxShadow: '0 0 35px rgba(212, 175, 55, 0.7), 0 12px 24px rgba(0, 0, 0, 0.8)',
            opacity: ballOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* The Resulting Typographic Word «جهش» (Metamorphosed from the ball) */}
      {frame >= 125 && (
        <div
          style={{
            position: 'absolute',
            left: centerX,
            top: 540,
            transform: `translate(-50%, -50%) scale(${textSettle.scale}) translateY(${textSettle.translateY}px)`,
            opacity: textOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
          }}
        >
          <span
            style={{
              fontSize: 104,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 8px 30px rgba(0, 0, 0, 0.9)',
              lineHeight: 1,
            }}
          >
            جهش
          </span>

          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#D4AF37',
              marginTop: 12,
              letterSpacing: 2,
            }}
          >
            انتقال تکانه فیزیکی به هندسه کلمه
          </span>

          {/* Extruded Structural Baseline Datum Rule */}
          <div
            style={{
              marginTop: 20,
              width: baselineLength,
              height: 2.5,
              background: 'linear-gradient(90deg, rgba(212, 175, 55, 0) 0%, #D4AF37 50%, rgba(212, 175, 55, 0) 100%)',
              boxShadow: '0 0 16px #D4AF37',
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
