import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import {
  createAuthoredSlamTrack,
  evaluateAuthoredKeyframeTrack,
} from '../curves/AuthoredKeyframeEngine';

/**
 * V27 PRECISION LAB — TEST 05: KINETIC TYPOGRAPHY PRECISION
 * 
 * Demonstrates authored Persian typography slam with coordinated
 * Position, Scale, Tracking, and Impact Punctuation:
 * 
 * REST -> ANTICIPATION -> ACCELERATED SLAM -> 3F IMPACT PUNCTUATION -> REBOUND -> SETTLE
 * 
 * Duration: 90 frames (3.0s @ 30 FPS)
 */

const typeSlamTrack = createAuthoredSlamTrack({
  id: 'type_slam_track',
  totalDurationFrames: 60,
  startVal: 160,
  impactVal: 540,
  squashVal: 520,
  settleVal: 540,
  anticipationFrames: 8,
  fallFrames: 16,
  punctuationFrames: 3, // 3-frame impact punctuation lock
});

export const V27_Test05_KineticTypography: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  const evalTrack = evaluateAuthoredKeyframeTrack(typeSlamTrack, frame, 0);

  // Deterministically coordinated scale and tracking based strictly on active role
  let scaleX = 1.0;
  let scaleY = 1.0;
  let letterSpacing = 0;

  if (evalTrack.activeRole === 'ANTICIPATION') {
    scaleX = 0.88;
    scaleY = 1.15;
    letterSpacing = -2;
  } else if (evalTrack.activeRole === 'IMPACT' || evalTrack.activeRole === 'PUNCTUATION') {
    scaleX = 1.48; // Maximum squash at contact
    scaleY = 0.62;
    letterSpacing = 6; // Kinetic tracking expansion on impact
  } else if (evalTrack.activeRole === 'OVERSHOOT') {
    scaleX = 0.94;
    scaleY = 1.06;
    letterSpacing = 1;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '60px 100px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: goldColor, margin: 0 }}>
          V27 PRECISION LAB — TEST 05: KINETIC TYPOGRAPHY PRECISION
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 6 }}>
          Coordinated Position, Scale, Tracking, and 3-Frame Punctuation (Active: [{evalTrack.activeRole}])
        </p>

        {/* Stage */}
        <div style={{ position: 'relative', height: 700, marginTop: 40 }}>
          {/* Baseline Impact Ground */}
          <div style={{ position: 'absolute', left: 400, right: 400, top: 540, height: 3, backgroundColor: goldColor }} />

          {/* Impact Shockwave Ring during punctuation */}
          {(evalTrack.activeRole === 'PUNCTUATION' || evalTrack.activeRole === 'IMPACT') && (
            <div
              style={{
                position: 'absolute',
                left: 960 - 140,
                top: 540 - 25,
                width: 280,
                height: 50,
                borderRadius: '50%',
                border: `2px solid ${cyanAccent}`,
                boxShadow: `0 0 30px ${cyanAccent}`,
              }}
            />
          )}

          {/* Persian Word «شتاب» */}
          <div
            style={{
              position: 'absolute',
              left: 960,
              top: evalTrack.value,
              transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
              textAlign: 'center',
              direction: 'rtl',
              fontFamily: 'Vazirmatn, sans-serif',
            }}
          >
            <div
              style={{
                fontSize: 108,
                fontWeight: 900,
                color: '#F8FAFC',
                letterSpacing: `${letterSpacing}px`,
                textShadow: '0 4px 40px rgba(0,0,0,0.95)',
              }}
            >
              شتاب
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
