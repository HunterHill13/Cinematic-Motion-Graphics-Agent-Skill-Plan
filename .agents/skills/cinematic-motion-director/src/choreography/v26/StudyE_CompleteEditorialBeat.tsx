import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../motion/secondaryMotion';
import { calculateVelocityHandoff } from '../../motion/fidelity/MotionFidelityEngine';

/**
 * STUDY E: COMPLETE 10-SECOND EDITORIAL CHOREOGRAPHY BEAT
 * 
 * Synthesizes all Visual Choreography disciplines into a unified 300-frame (10.0s) sequence:
 * 1. STILLNESS (0 - 45f): Asymmetric datum line and contemplation hold (Energy 1).
 * 2. TENSION & BUILD (45 - 90f): Datum curls into an off-center vortex tension node (Energy 2 -> 3).
 * 3. KINEMATIC IMPACT (90 - 150f): Slingshot release across frame, camera pans laterally (Energy 5).
 * 4. TYPOGRAPHIC METAMORPHOSIS (150 - 220f): Hero word «تحول» emerges, fractures into rays (Energy 4).
 * 5. CAMERA THROUGH & SETTLE (220 - 300f): Motivated camera push through aperture into plinth rest (Energy 2).
 * 
 * Duration: 300 frames (10.0s @ 30 FPS)
 */

export const StudyE_CompleteEditorialBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Master Energy Curve & Camera Grammar
  let cameraScale = 1.0;
  let cameraTx = 0;

  if (frame < 90) {
    cameraScale = 1.0;
    cameraTx = 0;
  } else if (frame < 180) {
    const p = (frame - 90) / 90;
    cameraScale = interpolate(p, [0, 1], [1.0, 1.08]);
    cameraTx = interpolate(p, [0, 1], [0, -80]);
  } else {
    const p = (frame - 180) / 120;
    cameraScale = interpolate(p, [0, 1], [1.08, 1.15]);
    cameraTx = interpolate(p, [0, 1], [-80, 0]);
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={frame >= 90 && frame <= 180 ? 0.8 : 0.4} />

      {/* Motivated Camera Rig */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale}) translateX(${cameraTx}px)`,
          transformOrigin: '960px 540px',
        }}
      >
        {/* ACT 1: STILLNESS & DATUM (0 - 90f) */}
        {frame < 110 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: frame < 85 ? 1 : interpolate(frame, [85, 110], [1, 0]),
            }}
          >
            {/* Low-third Asymmetric Horizontal Datum */}
            <div
              style={{
                position: 'absolute',
                left: 360,
                top: 680,
                width: interpolate(Math.min(1, frame / 40), [0, 1], [0, 1200]),
                height: 2,
                backgroundColor: goldColor,
                boxShadow: `0 0 16px rgba(212, 175, 55, 0.4)`,
              }}
            />
            {/* Contemplative Subtext */}
            <div
              style={{
                position: 'absolute',
                left: 360,
                top: 620,
                direction: 'rtl',
                color: '#FFF',
                fontFamily: 'Vazirmatn, sans-serif',
                opacity: interpolate(frame, [15, 40], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              <div style={{ fontSize: 38, fontWeight: 900 }}>سکوت بنیادین</div>
              <div style={{ fontSize: 13, color: goldColor, marginTop: 4, letterSpacing: 2 }}>
                FOUNDATIONAL STILLNESS
              </div>
            </div>
          </div>
        )}

        {/* ACT 2: SLINGSHOT & KINETIC RELEASE (90 - 180f) */}
        {frame >= 85 && frame < 200 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {(() => {
              const rel = frame - 90;
              let posX = 480;
              let scaleX = 1.0;
              let scaleY = 1.0;

              if (rel < 25) {
                // Negative pullback left
                const p = rel / 25;
                posX = interpolate(p, [0, 1], [480, 320]);
                scaleX = 0.75;
                scaleY = 1.3;
              } else if (rel < 70) {
                // Slingshot flight rightward
                const p = (rel - 25) / 45;
                posX = interpolate(p, [0, 1], [320, 1380], { easing: Easing.bezier(0.12, 0, 0.39, 0) });
                scaleX = interpolate(p, [0, 0.4, 1], [0.75, 1.5, 1.0]);
                scaleY = interpolate(p, [0, 0.4, 1], [1.3, 0.7, 1.0]);
              } else {
                // Impact deceleration
                posX = 1380;
              }

              return (
                <div
                  style={{
                    position: 'absolute',
                    left: posX - 20,
                    top: 540 - 20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: goldColor,
                    transform: `scale(${scaleX}, ${scaleY})`,
                    boxShadow: `0 0 35px ${goldColor}`,
                  }}
                />
              );
            })()}
          </div>
        )}

        {/* ACT 3: TYPOGRAPHY AS GRAPHIC MATERIAL («تحول») (160 - 260f) */}
        {frame >= 150 && frame < 270 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 165
                  ? interpolate(frame, [150, 165], [0, 1])
                  : frame > 250
                  ? interpolate(frame, [250, 270], [1, 0])
                  : 1,
            }}
          >
            {(() => {
              const rel = frame - 160;
              const slamP = Math.min(1, rel / 25);
              const wordScale = interpolate(slamP, [0, 0.6, 1], [1.4, 0.88, 1.0]);

              return (
                <div
                  style={{
                    position: 'absolute',
                    left: 960,
                    top: 540,
                    transform: `translate(-50%, -50%) scale(${wordScale})`,
                    textAlign: 'center',
                    direction: 'rtl',
                    fontFamily: 'Vazirmatn, sans-serif',
                  }}
                >
                  <div
                    style={{
                      fontSize: 104,
                      fontWeight: 900,
                      color: '#F8FAFC',
                      textShadow: `0 0 50px rgba(212, 175, 55, 0.8)`,
                    }}
                  >
                    تحول
                  </div>
                  <div style={{ fontSize: 16, color: cyanAccent, marginTop: 8, letterSpacing: 4 }}>
                    METAMORPHOSIS & RECONFIGURATION
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ACT 4: APERTURE PORTAL & RESOLUTION SETTLE (250 - 300f) */}
        {frame >= 240 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {(() => {
              const rel = frame - 250;
              const settle = calculateSettleLock(rel, 0, { settleFrames: 25 });
              const portalScale = interpolate(Math.min(1, rel / 40), [0, 1], [0.4, 1.0]);

              return (
                <div
                  style={{
                    position: 'absolute',
                    left: 960,
                    top: 540 + settle.translateY,
                    transform: `translate(-50%, -50%) scale(${portalScale})`,
                  }}
                >
                  <svg width={400} height={400} viewBox="-200 -200 400 400">
                    <circle r={120} fill="none" stroke={goldColor} strokeWidth={2.5} />
                    <circle r={70} fill="none" stroke={cyanAccent} strokeWidth={1.5} />
                    <circle r={14} fill={goldColor} />
                  </svg>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
