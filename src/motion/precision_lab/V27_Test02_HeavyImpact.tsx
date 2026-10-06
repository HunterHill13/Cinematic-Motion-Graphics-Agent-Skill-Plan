import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import {
  createAuthoredSlamTrack,
  evaluateAuthoredKeyframeTrack,
} from '../curves/AuthoredKeyframeEngine';

/**
 * V27 PRECISION LAB — TEST 02: HEAVY IMPACT & VISUAL PUNCTUATION
 * 
 * Demonstrates the crucial difference between:
 * - OVER-SMOOTHED (continuous easing where impact is smeared out)
 * - AUTHORED PUNCTUATION (anticipation -> explosive fall -> 2-frame hard punctuation hold -> rebound -> settle)
 * 
 * Duration: 90 frames (3.0s @ 30 FPS)
 */

const slamTrack = createAuthoredSlamTrack({
  id: 'heavy_slam_test',
  totalDurationFrames: 60,
  startVal: 180,
  impactVal: 620,
  squashVal: 600,
  settleVal: 620,
  anticipationFrames: 8,
  fallFrames: 16,
  punctuationFrames: 3, // Crucial 3f hold on impact
});

export const V27_Test02_HeavyImpact: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // 1. Over-smoothed baseline
  const pOver = Math.min(1, frame / 40);
  const yOver = interpolate(pOver, [0, 1], [180, 620]);
  const scaleYOver = interpolate(pOver, [0, 0.7, 0.85, 1], [1.0, 1.2, 0.8, 1.0]);

  // 2. V27 Authored Keyframe Slam
  const evalSlam = evaluateAuthoredKeyframeTrack(slamTrack, frame, 0);
  
  // Coordinated scale linked strictly to role
  let scaleX = 1.0;
  let scaleY = 1.0;
  if (evalSlam.activeRole === 'ANTICIPATION') {
    scaleX = 0.9;
    scaleY = 1.1;
  } else if (evalSlam.activeRole === 'IMPACT' || evalSlam.activeRole === 'PUNCTUATION') {
    scaleX = 1.45;
    scaleY = 0.65; // Deep impact compression
  } else if (evalSlam.activeRole === 'OVERSHOOT') {
    scaleX = 0.96;
    scaleY = 1.04;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '60px 100px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: goldColor, margin: 0 }}>
          V27 PRECISION LAB — TEST 02: HEAVY IMPACT & PUNCTUATION
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginTop: 6 }}>
          Left: Over-smoothed smearing  |  Right: Authored Impact with 3-frame Punctuation Hold
        </p>

        {/* Comparison Stage */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 80, height: 700 }}>
          {/* Left: Over-smoothed */}
          <div style={{ position: 'relative', width: 400, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ color: '#EF4444', fontWeight: 800, fontSize: 14 }}>
              BASELINE: OVER-SMOOTHED (SMEARED)
            </div>
            {/* Impact Datum */}
            <div style={{ position: 'absolute', left: 40, right: 40, top: 620, height: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
            {/* Sphere */}
            <div
              style={{
                position: 'absolute',
                left: 200 - 30,
                top: yOver - 30,
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                transform: `scale(1, ${scaleYOver})`,
              }}
            />
          </div>

          {/* Right: V27 Authored Keyframes */}
          <div style={{ position: 'relative', width: 400, borderLeft: '1px solid rgba(56,189,248,0.3)' }}>
            <div style={{ color: cyanAccent, fontWeight: 800, fontSize: 14 }}>
              V27: AUTHORED SLAM [{evalSlam.activeRole}]
            </div>
            {/* Impact Datum */}
            <div style={{ position: 'absolute', left: 40, right: 40, top: 620, height: 3, backgroundColor: goldColor }} />
            
            {/* Shockwave during punctuation */}
            {evalSlam.activeRole === 'PUNCTUATION' && (
              <div
                style={{
                  position: 'absolute',
                  left: 200 - 80,
                  top: 620 - 20,
                  width: 160,
                  height: 40,
                  borderRadius: '50%',
                  border: `2px solid ${cyanAccent}`,
                }}
              />
            )}

            {/* Sphere */}
            <div
              style={{
                position: 'absolute',
                left: 200 - 30,
                top: evalSlam.value - 30,
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: goldColor,
                transform: `scale(${scaleX}, ${scaleY})`,
                boxShadow: `0 0 35px ${goldColor}`,
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
