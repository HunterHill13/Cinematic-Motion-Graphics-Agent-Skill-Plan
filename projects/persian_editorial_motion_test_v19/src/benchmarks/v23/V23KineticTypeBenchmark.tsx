import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill, Sequence } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock, calculateDecayingImpactShake } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 03 — KINETIC TYPOGRAPHY
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Demonstrates:
 * - Slam (Fast downward plunge with stretch and impact)
 * - Split (Symmetric directional divergence)
 * - Scatter & Assemble (Centrifugal dispersal and magnetic snap-back)
 * - Outline → Fill (Wireframe stroke metallization)
 * - Deliberate Silence / Hold (Restraint and breathing pause)
 * - Preservation of Persian cursive RTL ligature continuity
 */
export const V23KineticTypeBenchmark: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.95} />

      {/* Benchmark Header */}
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
            BENCHMARK 03
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            تایپوگرافی کینتیک و افعال حرکتی (Kinetic Motion Verbs & Ligature Integrity)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 50 && 'فعل ۱: فرود ضربه‌ای و کشیدگی (Slam & Stretch)'}
          {frame >= 50 && frame < 100 && 'فعل ۲: شکافت متقارن و گسترش تراکینگ (Split & Track)'}
          {frame >= 100 && frame < 150 && 'فعل ۳: پراکندگی گریز از مرکز و همگرایی مجدد (Scatter & Assemble)'}
          {frame >= 150 && 'فعل ۴: تبدیل خط پیرامونی به توپر، مکث سکوت و قفل نهایی (Silence & Hold)'}
        </span>
      </div>

      {/* ======================================================== */}
      {/* VERB 1: SLAM & STRETCH — «شتاب» (000 - 050f)              */}
      {/* ======================================================== */}
      {frame < 52 && (
        <Sequence from={0} durationInFrames={52}>
          {(() => {
            const strikeF = 18;
            const settle = calculateSettleLock(frame, strikeF, {
              anticipationFrames: 6,
              settleFrames: 14,
              scalePeak: 1.25,
            });
            const slamY = interpolate(frame, [0, strikeF], [-300, 0], {
              easing: Easing.bezier(0.7, 0, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const stretchY = interpolate(frame, [0, strikeF * 0.7, strikeF], [1, 1.5, 1]);
            const stretchX = interpolate(frame, [0, strikeF * 0.7, strikeF], [1, 0.75, 1]);

            // Exit (42 - 50f): upward acceleration into next verb
            const exitP = interpolate(frame, [42, 50], [0, 1], {
              easing: Easing.bezier(0.7, 0, 1, 0.5),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    transform: `translateY(${slamY - exitP * 120}px) scale(${settle.scale * stretchX * (1 - exitP * 0.3)}, ${settle.scale * stretchY})`,
                    opacity: (frame < strikeF ? interpolate(frame, [0, 8], [0, 1]) : 1) * (1 - exitP),
                    fontFamily: 'Vazirmatn, system-ui, sans-serif',
                    textAlign: 'center',
                    direction: 'rtl',
                  }}
                >
                  <span
                    style={{
                      fontSize: 130,
                      fontWeight: 900,
                      color: '#F8FAFC',
                      textShadow: '0 0 45px rgba(212, 175, 55, 0.7)',
                    }}
                  >
                    شتاب
                  </span>
                  <div style={{ marginTop: 8, color: '#D4AF37', fontSize: 20, fontWeight: 700, letterSpacing: 4 }}>
                    VERB: SLAM & STRETCH
                  </div>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>
      )}

      {/* ======================================================== */}
      {/* VERB 2: SPLIT & TRACKING EXPANSION — «شکافت» (050 - 100f) */}
      {/* ======================================================== */}
      {frame >= 50 && frame < 102 && (
        <Sequence from={50} durationInFrames={52}>
          {(() => {
            const rel = frame - 50;
            const splitProgress = interpolate(rel, [10, 35], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const splitDistance = splitProgress * 180;
            const trackingExpansion = interpolate(rel, [12, 40], [0, 14], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const exitP = interpolate(rel, [42, 50], [0, 1], {
              easing: Easing.bezier(0.7, 0, 1, 0.5),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    width: 900,
                    height: 250,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Vazirmatn, system-ui, sans-serif',
                    opacity: 1 - exitP,
                  }}
                >
                  {/* Left Word Half */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '50%',
                      transform: `translateX(${splitDistance}px)`,
                      fontSize: 110,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: `${trackingExpansion}px`,
                      textShadow: '0 0 35px rgba(212, 175, 55, 0.5)',
                    }}
                  >
                    شـکـ
                  </div>

                  {/* Central Golden Division Axis */}
                  <div
                    style={{
                      width: 2.5,
                      height: interpolate(splitProgress, [0, 1], [0, 160]),
                      backgroundColor: '#D4AF37',
                      boxShadow: '0 0 20px #D4AF37',
                      opacity: splitProgress,
                    }}
                  />

                  {/* Right Word Half */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: `translateX(${-splitDistance}px)`,
                      fontSize: 110,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: `${trackingExpansion}px`,
                      textShadow: '0 0 35px rgba(212, 175, 55, 0.5)',
                    }}
                  >
                    ـافـت
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      color: '#D4AF37',
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: 4,
                    }}
                  >
                    VERB: SPLIT & TRACKING EXPANSION
                  </div>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>
      )}

      {/* ======================================================== */}
      {/* VERB 3: SCATTER & ASSEMBLE — «پژوهش» (100 - 150f)         */}
      {/* ======================================================== */}
      {frame >= 100 && frame < 152 && (
        <Sequence from={100} durationInFrames={52}>
          {(() => {
            const rel = frame - 100;
            // 0 - 20f: scattered outward; 20 - 38f: snap into assembly; 38 - 50f: settle
            const assembleProgress = interpolate(rel, [16, 36], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const settle = calculateSettleLock(rel, 36, {
              anticipationFrames: 4,
              settleFrames: 10,
              scalePeak: 1.18,
            });
            const scatterRadius = (1 - assembleProgress) * 320;

            const exitP = interpolate(rel, [45, 51], [0, 1], {
              easing: Easing.bezier(0.7, 0, 1, 0.5),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    width: 700,
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${settle.scale * (1 - exitP * 0.2)})`,
                    opacity: 1 - exitP,
                    fontFamily: 'Vazirmatn, system-ui, sans-serif',
                  }}
                >
                  {/* Surrounding constellation nodes collapsing inward */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const ang = (i * 45) * (Math.PI / 180);
                    const nx = Math.cos(ang) * scatterRadius;
                    const ny = Math.sin(ang) * scatterRadius;
                    return (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: `calc(50% + ${nx}px)`,
                          top: `calc(50% + ${ny}px)`,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#D4AF37',
                          opacity: 1 - assembleProgress,
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    );
                  })}

                  <div
                    style={{
                      fontSize: 120,
                      fontWeight: 900,
                      color: '#F8FAFC',
                      textShadow: '0 0 40px rgba(56, 189, 248, 0.5), 0 0 20px rgba(212, 175, 55, 0.6)',
                      direction: 'rtl',
                    }}
                  >
                    پژوهش
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      color: '#38BDF8',
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: 4,
                    }}
                  >
                    VERB: SCATTER & MAGNETIC ASSEMBLE
                  </div>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>
      )}

      {/* ======================================================== */}
      {/* VERB 4: OUTLINE → FILL & SILENCE/HOLD (150 - 210f)       */}
      {/* ======================================================== */}
      {frame >= 150 && (
        <Sequence from={150} durationInFrames={60}>
          {(() => {
            const rel = frame - 150;
            // 0 - 22f: Outline to solid fill; 22 - 50f: Absolute STILLNESS & HOLD (Silence)
            const fillProgress = interpolate(rel, [6, 24], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const settle = calculateSettleLock(rel, 24, {
              anticipationFrames: 6,
              settleFrames: 12,
              scalePeak: 1.1,
            });

            return (
              <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    transform: `scale(${settle.scale}) translateY(${settle.translateY}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontFamily: 'Vazirmatn, system-ui, sans-serif',
                    direction: 'rtl',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    {/* Outline Layer */}
                    <span
                      style={{
                        fontSize: 140,
                        fontWeight: 900,
                        color: 'transparent',
                        WebkitTextStroke: '2px #D4AF37',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      تحول
                    </span>

                    {/* Solid Metallized Fill Layer */}
                    <span
                      style={{
                        position: 'absolute',
                        inset: 0,
                        fontSize: 140,
                        fontWeight: 900,
                        color: '#FFFFFF',
                        opacity: fillProgress,
                        letterSpacing: '-0.02em',
                        textShadow: '0 0 50px rgba(212, 175, 55, 0.8), 0 8px 30px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      تحول
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: 18,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      opacity: fillProgress,
                    }}
                  >
                    <div style={{ width: 40, height: 1.5, backgroundColor: '#D4AF37' }} />
                    <span style={{ color: '#D4AF37', fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>
                      VERB: OUTLINE → SOLID FILL + DELIBERATE SILENCE (26f HOLD)
                    </span>
                    <div style={{ width: 40, height: 1.5, backgroundColor: '#D4AF37' }} />
                  </div>
                </div>
              </AbsoluteFill>
            );
          })()}
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
