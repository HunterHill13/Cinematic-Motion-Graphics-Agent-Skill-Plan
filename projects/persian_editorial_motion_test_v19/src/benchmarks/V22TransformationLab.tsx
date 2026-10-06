import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill, Sequence } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../src/motion/secondaryMotion';
import {
  calculateDotLineRibbonMorph,
  calculateRibbonRingTunnelMorph,
  calculateNumeralToPillarMorph,
} from '../../../../src/motion/grammar/transformationGrammar';
import { KineticTypography2 } from '../../../../src/motion/typography/KineticTypography2';

/**
 * V22 TRANSFORMATION LAB (540 frames @ 30 FPS = 18.00s)
 * 
 * Enforces Visual Transformation Grammar & Continuous Visual Causality:
 * One single golden motif (#D4AF37) survives and mutates across all 6 scenes:
 * 
 * Scene 1 (000 - 090f): Dot → Accelerating Line → Sweeping Ribbon
 * Scene 2 (090 - 180f): Ribbon → Wrapped Ring → 3D Perspective Tunnel
 * Scene 3 (180 - 270f): Tunnel Compression → Kinetic Word «پیشگام» → Extracted Baseline
 * Scene 4 (270 - 360f): Baseline → Numeral «۱۶» → Architectural Stone Pillar
 * Scene 5 (360 - 450f): Pillar Summit → Central Node → 6 Orbiting Satellites → Harmonic Ring
 * Scene 6 (450 - 540f): Ring → Trajectory Vector → Camera Pass-Through → Stillness Settle
 */
export const V22TransformationLab: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />

      {/* Persistent Scene Title Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 14,
          zIndex: 50,
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
            V22 LAB
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            آزمایشگاه تحول پیوسته بصری (Visual Transformation Grammar)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 90 && 'صحنه ۱: نقطه ← خط شتابان ← روبان هندسی'}
          {frame >= 90 && frame < 180 && 'صحنه ۲: روبان ← حلقه بسته ← تونل پرسپکتیو'}
          {frame >= 180 && frame < 270 && 'صحنه ۳: تراکم تکینگی ← واژه «پیشگام» ← خط مبنا'}
          {frame >= 270 && frame < 360 && 'صحنه ۴: خط مبنا ← عدد ۱۶ ← ستون معماری'}
          {frame >= 360 && frame < 450 && 'صحنه ۵: قله ستون ← ۶ گره مداری ← حلقه هماهنگ'}
          {frame >= 450 && 'صحنه ۶: بردار سرعت ← عبور دوربین ← سکون پایانی'}
        </span>
      </div>

      {/* ======================================================== */}
      {/* SCENE 1: DOT → LINE → RIBBON (0 - 90f)                   */}
      {/* ======================================================== */}
      {frame < 90 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const morph = calculateDotLineRibbonMorph(frame, 5, 80);
            return (
              <div
                style={{
                  width: morph.width,
                  height: morph.height,
                  borderRadius: morph.borderRadius,
                  backgroundColor: morph.color,
                  transform: `rotate(${morph.rotationDeg}deg)`,
                  boxShadow: '0 0 24px rgba(212, 175, 55, 0.8), 0 4px 20px rgba(0, 0, 0, 0.9)',
                  opacity: morph.opacity,
                  transition: 'none',
                }}
              />
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ======================================================== */}
      {/* SCENE 2: RIBBON → RING → TUNNEL (90 - 180f)              */}
      {/* ======================================================== */}
      {frame >= 90 && frame < 180 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const morph = calculateRibbonRingTunnelMorph(frame, 90, 85);
            return (
              <div
                style={{
                  position: 'relative',
                  width: 600,
                  height: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${morph.singularityScale})`,
                }}
              >
                {Array.from({ length: 6 }).map((_, idx) => {
                  const depthOffset = (idx / 5) * morph.tunnelDepth;
                  const ringW = Math.max(20, morph.outerRingSize - idx * 28);
                  const ringOpacity = interpolate(idx, [0, 5], [1, 0.25]);

                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        width: ringW,
                        height: ringW,
                        borderRadius: '50%',
                        border: `${Math.max(1, 3 - idx * 0.4)}px solid #D4AF37`,
                        boxShadow: idx === 0 ? '0 0 28px rgba(212, 175, 55, 0.7)' : 'none',
                        transform: `translateZ(${-depthOffset}px)`,
                        opacity: ringOpacity * morph.opacity,
                      }}
                    />
                  );
                })}
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ======================================================== */}
      {/* SCENE 3: WORD «پیشگام» → BASELINE EXTRACTION (180 - 270f) */}
      {/* ======================================================== */}
      {frame >= 180 && frame < 270 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticTypography2
            text="پیشگام"
            subtext="خلق هندسه از متن بدون لرزش پیکسل"
            strikeFrame={198}
            mode="baseline_extract"
            fontSize={84}
            color="#FFFFFF"
            accentColor="#D4AF37"
          />
        </AbsoluteFill>
      )}

      {/* ======================================================== */}
      {/* SCENE 4: BASELINE → NUMERAL «۱۶» → PILLAR (270 - 360f)   */}
      {/* ======================================================== */}
      {frame >= 270 && frame < 360 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const morph = calculateNumeralToPillarMorph(frame, 275, 80);
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  transform: `translateY(${morph.pillarElevationY}px)`,
                }}
              >
                {/* Numeral Mass atop the pillar */}
                <span
                  style={{
                    fontSize: 72,
                    fontWeight: 900,
                    color: '#D4AF37',
                    fontFamily: 'Vazirmatn, system-ui, sans-serif',
                    opacity: morph.textOpacity,
                    marginBottom: 10,
                    textShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
                  }}
                >
                  ۱۶
                </span>

                {/* Extruding Architectural Monolith Pillar */}
                <div
                  style={{
                    width: morph.pillarWidth,
                    height: morph.pillarHeight,
                    backgroundColor: 'rgba(212, 175, 55, 0.25)',
                    border: '2px solid #D4AF37',
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.35)',
                    borderRadius: 4,
                  }}
                />

                {/* Grounding Foundation Plinth */}
                <div
                  style={{
                    width: morph.pillarWidth + 140,
                    height: morph.plinthThickness,
                    backgroundColor: '#D4AF37',
                    boxShadow: '0 0 16px #D4AF37',
                    marginTop: 4,
                  }}
                />
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ======================================================== */}
      {/* SCENE 5: PILLAR SUMMIT → ORBITAL CONSTELLATION (360 - 450f)*/}
      {/* ======================================================== */}
      {frame >= 360 && frame < 450 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const local = frame - 360;
            // 6 nodes expand radially, orbit, and condense into harmonic ring
            const orbitRadius = interpolate(local, [0, 35, 75], [0, 180, 70], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const orbitAngle = interpolate(local, [0, 90], [0, 240]);
            const ringEmerge = interpolate(local, [65, 88], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                style={{
                  position: 'relative',
                  width: 400,
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Central Gravitational Core */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#D4AF37',
                    boxShadow: '0 0 25px #D4AF37',
                  }}
                />

                {/* 6 Orbiting Satellites */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const rad = ((i * 60 + orbitAngle) * Math.PI) / 180;
                  const x = Math.cos(rad) * orbitRadius;
                  const y = Math.sin(rad) * orbitRadius;

                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: '#FDE047',
                        boxShadow: '0 0 14px #FDE047',
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    />
                  );
                })}

                {/* Resulting Harmonic Ring */}
                {ringEmerge > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      border: '2.5px solid #D4AF37',
                      opacity: ringEmerge,
                      boxShadow: '0 0 24px rgba(212, 175, 55, 0.7)',
                    }}
                  />
                )}
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* ======================================================== */}
      {/* SCENE 6: CAMERA PASS-THROUGH & FINAL STILLNESS (450 - 540f) */}
      {/* ======================================================== */}
      {frame >= 450 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const local = frame - 450;
            // Camera passes through aperture, settles into monumental horizon
            const passThroughZoom = interpolate(local, [0, 45], [1.0, 7.0], {
              easing: Easing.bezier(0.7, 0, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const horizonUnfold = interpolate(local, [45, 75], [0, 1400], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const textOpacity = interpolate(local, [55, 80], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            // Settle-lock on frame 520 (local 70) for absolute stillness
            const settle = calculateSettleLock(local, 70, {
              anticipationFrames: 6,
              settleFrames: 14,
              scalePeak: 1.05,
            });

            return (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: local < 45 ? `scale(${passThroughZoom})` : `scale(${settle.scale})`,
                }}
              >
                {local < 45 ? (
                  <div
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      border: '3px solid #D4AF37',
                      boxShadow: '0 0 35px #D4AF37',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      direction: 'rtl',
                      fontFamily: 'Vazirmatn, system-ui, sans-serif',
                      opacity: textOpacity,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 48,
                        fontWeight: 900,
                        color: '#FFFFFF',
                        letterSpacing: 2,
                        textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 24px rgba(212,175,55,0.4)',
                      }}
                    >
                      افق نهایی تحول
                    </span>
                    <div
                      style={{
                        width: horizonUnfold,
                        height: 2.5,
                        backgroundColor: '#D4AF37',
                        boxShadow: '0 0 16px #D4AF37',
                        marginTop: 20,
                      }}
                    />
                    <span style={{ fontSize: 20, color: '#94A3B8', marginTop: 16 }}>
                      سکون کامل و تداوم ساختار بصری
                    </span>
                  </div>
                )}
              </div>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
