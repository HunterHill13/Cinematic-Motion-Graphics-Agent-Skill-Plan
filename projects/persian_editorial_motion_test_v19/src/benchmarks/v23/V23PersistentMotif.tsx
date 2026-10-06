import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill, Sequence } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 08 — PERSISTENT MOTIF
 * Duration: 240 frames (8.00s @ 30 FPS)
 * 
 * Flow across 3 distinct scenes with ONE continuous surviving gold motif (#D4AF37):
 * Scene 1 (000 - 080f): Celestial Domain — Radiant Nucleus Dot & Orbits
 *   ➔ Motif stretches into Horizontal Datum Rule (f65 - 80)
 * Scene 2 (080 - 160f): Architectural Domain — Structural Column & Foundation Plinth
 *   ➔ Motif wraps into Radiant Ring (f145 - 160)
 * Scene 3 (160 - 240f): Sovereign Heraldic Domain — 8-Pointed Star Crest & Typographic Resolution
 */
export const V23PersistentMotif: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      {/* Dynamic Ambient Atmosphere keyed to Scene */}
      <CanvasAtmosphereV19
        mood="gold"
        intensity={frame < 80 ? 0.8 : frame < 160 ? 1.0 : 1.2}
      />

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
            BENCHMARK 08
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            موتیف پایدار در سه صحنه دگرگون (Persistent Evolving Motif)
          </span>
        </div>
        <span style={{ color: '#D4AF37', fontSize: 14, fontWeight: 700 }}>
          {frame < 80 && 'صحنه ۱: هسته سماوی و مدارها (Nucleus Dot)'}
          {frame >= 80 && frame < 160 && 'صحنه ۲: ستون معماری و خط افق (Structural Pillar)'}
          {frame >= 160 && 'صحنه ۳: نشان شاهوار هشت‌پر (Heraldic Star Crest)'}
        </span>
      </div>

      {/* ======================================================== */}
      {/* SCENE 1: CELESTIAL REALM (000 - 080f)                    */}
      {/* ======================================================== */}
      {frame < 85 && (
        <Sequence from={0} durationInFrames={85}>
          {(() => {
            const rel = frame;
            const stretchP = interpolate(rel, [55, 78], [0, 1], {
              easing: Easing.bezier(0.7, 0, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const nucleusW = interpolate(stretchP, [0, 1], [32, 1400]);
            const nucleusH = interpolate(stretchP, [0, 1], [32, 3]);
            const orbitOpacity = 1 - stretchP;

            return (
              <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 600, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Orbiting Satellite Rings */}
                  <div
                    style={{
                      position: 'absolute',
                      width: 280,
                      height: 280,
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(56, 189, 248, 0.4)',
                      transform: `rotate(${rel * 0.8}deg)`,
                      opacity: orbitOpacity,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      width: 420,
                      height: 420,
                      borderRadius: '50%',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      transform: `rotate(${-rel * 0.5}deg)`,
                      opacity: orbitOpacity,
                    }}
                  />

                  {/* The Golden Surviving Motif (Nucleus Dot → Line) */}
                  <div
                    style={{
                      position: 'absolute',
                      width: nucleusW,
                      height: nucleusH,
                      borderRadius: interpolate(stretchP, [0, 1], [16, 1.5]),
                      backgroundColor: '#D4AF37',
                      boxShadow: '0 0 40px #D4AF37, 0 0 15px #FFFFFF',
                    }}
                  />
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>
      )}

      {/* ======================================================== */}
      {/* SCENE 2: ARCHITECTURAL MONOLITH REALM (080 - 160f)       */}
      {/* ======================================================== */}
      {frame >= 78 && frame < 165 && (
        <Sequence from={78} durationInFrames={87}>
          {(() => {
            const rel = frame - 78;
            // Line wraps into pillar and curls into ring
            const erectProgress = interpolate(rel, [4, 28], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const curlProgress = interpolate(rel, [55, 78], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const pillarHeight = interpolate(erectProgress, [0, 1], [0, 420]);
            const ringRadius = interpolate(curlProgress, [0, 1], [0, 110]);

            return (
              <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 800, height: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Ground Foundation Plinth (The motif carrier from S1) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 120,
                      width: interpolate(curlProgress, [0, 1], [900, 200]),
                      height: 4,
                      backgroundColor: '#D4AF37',
                      boxShadow: '0 0 20px #D4AF37',
                      opacity: 1 - curlProgress,
                    }}
                  />

                  {/* Vertical Column Body */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 124,
                      width: interpolate(curlProgress, [0, 1], [72, 8]),
                      height: pillarHeight,
                      background: 'linear-gradient(180deg, #FDE047 0%, #D4AF37 50%, #78350F 100%)',
                      boxShadow: '0 0 35px rgba(212, 175, 55, 0.5)',
                      opacity: 1 - curlProgress,
                    }}
                  />

                  {/* Motif Curling into Golden Ring at Column Summit */}
                  {curlProgress > 0.05 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 290,
                        width: ringRadius * 2,
                        height: ringRadius * 2,
                        borderRadius: '50%',
                        border: '3px solid #D4AF37',
                        boxShadow: '0 0 45px #D4AF37',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  )}
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>
      )}

      {/* ======================================================== */}
      {/* SCENE 3: SOVEREIGN HERALDIC REALM (160 - 240f)           */}
      {/* ======================================================== */}
      {frame >= 158 && (
        <Sequence from={158} durationInFrames={82}>
          {(() => {
            const rel = frame - 158;
            const starSettle = calculateSettleLock(rel, 24, {
              anticipationFrames: 6,
              settleFrames: 14,
              scalePeak: 1.15,
            });

            return (
              <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    transform: `scale(${starSettle.scale}) translateY(${starSettle.translateY}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontFamily: 'Vazirmatn, system-ui, sans-serif',
                    direction: 'rtl',
                  }}
                >
                  {/* The Golden Motif as Sovereign 8-Pointed Heraldic Star */}
                  <svg width="240" height="240" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="50" cy="50" r="40" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="25" y="25" width="50" height="50" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
                    <rect x="25" y="25" width="50" height="50" fill="none" stroke="#D4AF37" strokeWidth="1.8" transform="rotate(45 50 50)" />
                    <circle cx="50" cy="50" r="18" fill="rgba(212, 175, 55, 0.2)" stroke="#FDE047" strokeWidth="1.5" />
                    <polygon points="50,33 54,46 67,50 54,54 50,67 46,54 33,50 46,46" fill="#D4AF37" />
                    <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
                  </svg>

                  <span
                    style={{
                      fontSize: 42,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      marginTop: 24,
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 35px rgba(212, 175, 55, 0.7)',
                    }}
                  >
                    پایداری هویت بصری
                  </span>
                  <span style={{ fontSize: 18, color: '#D4AF37', fontWeight: 600, marginTop: 8, letterSpacing: 2 }}>
                    تداوم ادراکی موتیف طلایی در سه عرصه نمادین
                  </span>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
