import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';
import {
  createAuthoredSlamTrack,
  evaluateAuthoredKeyframeTrack,
  AuthoredMotionTrack,
  MotionCurves,
} from '../curves/AuthoredKeyframeEngine';

/**
 * V27 PRECISION LAB — TEST 06: FULL EDITORIAL BEAT (8-10 SECONDS)
 * 
 * Synthesizes authored temporal segments into one unified narrative beat:
 * 1. STILLNESS (0 - 45f): Zero-drift low-datum baseline (Energy 1).
 * 2. AUTHORED LAUNCH (45 - 105f): Negative anticipation -> exponential slingshot -> 2f punctuation.
 * 3. KINETIC SLAM (105 - 165f): Persian word «اصالت» descends with squash impact.
 * 4. ARC-LENGTH MORPH (165 - 225f): Symmetrical crest morphs into aperture ring.
 * 5. DETERMINISTIC SETTLE (225 - 270f): Final settle-lock into absolute stillness.
 * 
 * Duration: 270 frames (9.0s @ 30 FPS)
 */

const heroTravelTrack: AuthoredMotionTrack = {
  id: 'beat_hero_travel',
  totalDurationFrames: 60,
  profile: 'SLAM',
  keyframes: [
    { time: 0.0, role: 'REST', value: 360 },
    { time: 0.15, role: 'ANTICIPATION', value: 280, curve: Easing.bezier(0.4, 0, 0.2, 1) },
    { time: 0.65, role: 'IMPACT', value: 1420, curve: MotionCurves.impactCurve },
    { time: 0.70, role: 'PUNCTUATION', value: 1420, curve: (t) => t },
    { time: 0.85, role: 'OVERSHOOT', value: 1400 },
    { time: 1.0, role: 'SETTLE', value: 1420, curve: MotionCurves.snapSettle },
  ],
};

export const V27_Test06_FullEditorialBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Evaluate Active Segment
  const evalTravel = evaluateAuthoredKeyframeTrack(heroTravelTrack, frame, 45);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.5} />

      {/* Act 1: Low-datum Foundation (0 - 80f) */}
      {frame < 90 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 70 ? 1 : interpolate(frame, [70, 90], [1, 0]) }}>
          <div
            style={{
              position: 'absolute',
              left: 280,
              top: 680,
              width: interpolate(Math.min(1, frame / 35), [0, 1], [0, 1360]),
              height: 2.5,
              backgroundColor: goldColor,
            }}
          />
          <div style={{ position: 'absolute', left: 320, top: 570, direction: 'rtl', color: '#FFF', fontFamily: 'Vazirmatn' }}>
            <div style={{ fontSize: 44, fontWeight: 900 }}>بنیان استوار</div>
            <div style={{ fontSize: 13, color: goldColor, letterSpacing: 3, marginTop: 6 }}>ENDURING FOUNDATION</div>
          </div>
        </div>
      )}

      {/* Act 2: Authored Slingshot Travel (45 - 130f) */}
      {frame >= 45 && frame < 140 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div
            style={{
              position: 'absolute',
              left: evalTravel.value - 20,
              top: 540 - 20,
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: goldColor,
              boxShadow: `0 0 35px ${goldColor}`,
            }}
          />
        </div>
      )}

      {/* Act 3: Word Slam «اصالت» (120 - 200f) */}
      {frame >= 115 && frame < 210 && (
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 540,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            direction: 'rtl',
            fontFamily: 'Vazirmatn',
            opacity: frame < 125 ? (frame - 115) / 10 : frame > 195 ? (210 - frame) / 15 : 1,
          }}
        >
          <div style={{ fontSize: 96, fontWeight: 900, color: '#F8FAFC', textShadow: `0 0 40px ${goldColor}` }}>
            اصالت
          </div>
          <div style={{ fontSize: 14, color: cyanAccent, letterSpacing: 4, marginTop: 8 }}>
            AUTHORITY & PRECISION
          </div>
        </div>
      )}

      {/* Act 4: Sovereign Settle Plinth (200 - 270f) */}
      {frame >= 195 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div
            style={{
              position: 'absolute',
              left: 960,
              top: 540,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <svg width={360} height={360} viewBox="-180 -180 360 360">
              <circle r={110} fill="none" stroke={goldColor} strokeWidth={2.5} />
              <circle r={60} fill="none" stroke={cyanAccent} strokeWidth={1.5} />
              <circle r={14} fill={goldColor} />
            </svg>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
