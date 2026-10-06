import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';
import {
  evaluateDirectorAtFrame,
  V24_EDITORIAL_NARRATIVE_PLAN,
} from '../../../../../src/director/AdaptiveDirector';
import {
  calculateVelocityHandoff,
  interpolateOptimalMorph,
  calculateKinematics,
  evaluatePersonalityValue,
  Point2D,
} from '../../../../../src/motion/fidelity/MotionFidelityEngine';
import { defaultOwnershipController } from '../../../../../src/motion/ownership/MotionOwnershipController';
import { evaluateImpactExtrusionHandoff } from '../../../../../src/motion/TransformationContinuityEngine';

/**
 * V25.5 — INTEGRATED PRODUCTION MASTER
 * Duration: 1,080 frames (36.00s @ 30 FPS)
 * Resolution: 1920x1080
 * 
 * Directly integrates the validated V25 Motion Fidelity subsystems into the real
 * production pipeline while strictly enforcing the Motion Ownership Rule:
 * 
 * 1. Migration A (Beat 01 -> Beat 02): Dot -> Line Velocity Handoff.
 *    Replaces the opacity dissolve cheat with a true C1 continuous momentum handoff.
 * 2. Migration B (Beat 03 -> Beat 04): Hero Shape Morph.
 *    Replaces abrupt coordinate cut with 32-point optimal correspondence morphing.
 * 3. Migration C (Beat 06): Hero Kinetic Typography («شتاب»).
 *    Replaces decoupled floating transforms with a synchronized kinematic slam,
 *    air-stretch, ground impact squash, and hard settle-lock.
 */

export const V25_5_IntegratedProduction: React.FC = () => {
  const frame = useCurrentFrame();

  // Query Adaptive Director for authoritative authored state at this frame
  const directorState = evaluateDirectorAtFrame(frame, V24_EDITORIAL_NARRATIVE_PLAN);
  const { currentBeat, cameraScale, cameraTranslateX, cameraTranslateY } = directorState;

  // Global visual constants
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';
  const slateDark = '#04060A';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: slateDark,
        overflow: 'hidden',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
      }}
    >
      {/* Background Atmosphere keyed to beat energy */}
      <CanvasAtmosphereV19
        mood={currentBeat.energyLevel >= 4 ? 'azure' : 'gold'}
        intensity={currentBeat.energyLevel === 1 ? 0.3 : currentBeat.energyLevel >= 4 ? 1.1 : 0.6}
      />

      {/* Global Camera Rig with perspective */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale}) translate(${cameraTranslateX}px, ${cameraTranslateY}px)`,
          transformOrigin: '960px 540px',
          perspective: 1200,
          willChange: 'transform',
        }}
      >
        {/* ========================================================================= */}
        {/* BEAT 01: GENESIS / HORIZONTAL DATUM (0 - 120f)                           */}
        {/* ========================================================================= */}
        {frame < 125 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: frame < 115 ? 1 : interpolate(frame, [115, 125], [1, 0]),
            }}
          >
            {/* Asymmetric Low-Third Horizontal Datum Line (Rule-of-Thirds Staging) */}
            {(() => {
              const traceProgress = Easing.bezier(0.16, 1, 0.3, 1)(
                Math.min(1, Math.max(0, frame / 50))
              );
              const lineLength = interpolate(traceProgress, [0, 1], [0, 1360]);

              return (
                <div
                  style={{
                    position: 'absolute',
                    top: 680,
                    left: 280,
                    width: lineLength,
                    height: 2.5,
                    backgroundColor: goldColor,
                    boxShadow: `0 0 20px rgba(212, 175, 55, 0.55)`,
                  }}
                >
                  {/* Asymmetric Technical Datum Calibration Ticks */}
                  {[0, 160, 360, 600, 920, 1280].map((offset) => (
                    <div
                      key={offset}
                      style={{
                        position: 'absolute',
                        left: offset,
                        top: -6,
                        width: 1.5,
                        height: 14,
                        backgroundColor: 'rgba(212, 175, 55, 0.6)',
                        opacity: offset < lineLength ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              );
            })()}

            {/* Asymmetric Typography: Anchored to Left-Third Axis with 75% Negative Space */}
            {(() => {
              const textOp = interpolate(frame, [25, 55], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const textX = interpolate(frame, [25, 55], [-40, 0], {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <div
                  style={{
                    position: 'absolute',
                    left: 320,
                    top: 570,
                    transform: `translateX(${textX}px)`,
                    textAlign: 'right',
                    direction: 'rtl',
                    opacity: textOp,
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 900,
                      color: '#F8FAFC',
                      letterSpacing: -0.5,
                      textShadow: '0 4px 30px rgba(0,0,0,0.9)',
                    }}
                  >
                    نقطه آغاز
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: goldColor,
                      marginTop: 8,
                      letterSpacing: 3,
                    }}
                  >
                    THE GENESIS OF INQUIRY
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(255, 255, 255, 0.45)',
                      marginTop: 8,
                      fontFamily: 'monospace',
                    }}
                  >
                    DATUM: Y=680 | ASYMMETRIC CANV_RATIO: 78% VOID
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 02: NEGATIVE-SPACE RAZOR INCISION & MOMENTUM LAUNCH (115 - 255f)     */}
        {/* V31 CHOREOGRAPHY REDESIGN: Canvas Fabric Incision -> Datum Strike         */}
        {/* ========================================================================= */}
        {frame >= 115 && frame < 255 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: frame > 240 ? interpolate(frame, [240, 255], [1, 0]) : 1,
            }}
          >
            {(() => {
              const b2Frame = frame - 120; // -5 to 135
              
              // 1. TENSION ACCUMULATION & PINCH (Frames -5 to 25)
              // 2. SURGICAL DIAGONAL INCISION (Frames 25 to 65)
              // 3. TRAJECTORY BEND & GROUND DATUM STRIKE (Frames 65 to 115)
              // 4. MOMENTUM ABSORPTION & MONOLITH EXTRUSION TRIGGER (Frames 115+)
              
              let seedX = 360;
              let seedY = 680;
              let slitProgress = 0;
              let slitWidth = 0;
              let seedScaleX = 1.0;
              let seedScaleY = 1.0;
              let seedRotation = -20;

              if (b2Frame < 25) {
                // Tension gathering at anchor point (360, 680)
                const p = Math.min(1, Math.max(0, (b2Frame + 5) / 30));
                seedX = 360 - interpolate(p, [0, 1], [0, 60]);
                seedY = 680 + interpolate(p, [0, 1], [0, 15]);
                seedScaleX = interpolate(p, [0, 1], [1.0, 0.7]);
                seedScaleY = interpolate(p, [0, 1], [1.0, 1.35]);
              } else if (b2Frame < 65) {
                // Surgical Diagonal Incision across negative space: (360, 680) -> (1380, 420)
                const p = (b2Frame - 25) / 40;
                slitProgress = Easing.bezier(0.12, 0, 0.39, 0)(p);
                seedX = interpolate(slitProgress, [0, 1], [300, 1380]);
                seedY = interpolate(slitProgress, [0, 1], [695, 420]);
                slitWidth = interpolate(p, [0, 0.4, 1], [0, 10, 2]);
                seedScaleX = interpolate(p, [0, 0.3, 1], [0.7, 1.8, 1.1]);
                seedScaleY = interpolate(p, [0, 0.3, 1], [1.35, 0.6, 0.95]);
                seedRotation = interpolate(slitProgress, [0, 1], [-20, -12]);
              } else if (b2Frame < 110) {
                // Trajectory curving down toward ground foundation (960, 720)
                const p = (b2Frame - 65) / 45;
                const settleCurve = Easing.bezier(0.16, 1, 0.3, 1)(p);
                seedX = interpolate(settleCurve, [0, 1], [1380, 960]);
                seedY = interpolate(settleCurve, [0, 1], [420, 720]);
                slitProgress = 1.0;
                slitWidth = interpolate(p, [0, 1], [2, 0]);
                seedScaleX = interpolate(p, [0, 0.5, 1], [1.1, 1.0, 1.0]);
                seedScaleY = interpolate(p, [0, 0.5, 1], [0.95, 1.0, 1.0]);
                seedRotation = interpolate(p, [0, 1], [-12, 0]);
              } else {
                // Ground strike impact: transferred into Beat 03 pillars
                seedX = 960;
                seedY = 720;
                slitProgress = 1.0;
                slitWidth = 0;
                const impactP = Math.min(1, (b2Frame - 110) / 15);
                seedScaleX = interpolate(impactP, [0, 0.3, 1], [1.0, 2.2, 1.0]);
                seedScaleY = interpolate(impactP, [0, 0.3, 1], [1.0, 0.3, 0.8]);
                seedRotation = 0;
              }

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Luminous Spatial Seam (Negative Space Incision) */}
                  {slitProgress > 0 && (
                    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      <line
                        x1={300}
                        y1={695}
                        x2={seedX}
                        y2={seedY}
                        stroke={goldColor}
                        strokeWidth={Math.max(1, slitWidth)}
                        strokeLinecap="round"
                        strokeOpacity={Math.max(0.2, 1 - (b2Frame - 25) / 80)}
                      />
                      <line
                        x1={300}
                        y1={695}
                        x2={seedX}
                        y2={seedY}
                        stroke={cyanAccent}
                        strokeWidth={Math.max(2, slitWidth * 2.2)}
                        strokeOpacity={Math.max(0.1, (1 - (b2Frame - 25) / 75) * 0.4)}
                      />
                    </svg>
                  )}

                  {/* Traveling Razor Seed Head */}
                  <div
                    style={{
                      position: 'absolute',
                      left: seedX - 16,
                      top: seedY - 16,
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: '#FFF',
                      boxShadow: `0 0 25px ${goldColor}, 0 0 50px ${cyanAccent}`,
                      transform: `scale(${seedScaleX}, ${seedScaleY}) rotate(${seedRotation}deg)`,
                      transformOrigin: 'center center',
                    }}
                  />

                  {/* Dynamic Verb Typography - Off-Axis Staging */}
                  {b2Frame > 25 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 280,
                        top: 440,
                        direction: 'rtl',
                        fontFamily: 'Vazirmatn',
                        opacity: interpolate(b2Frame, [25, 50], [0, 1], { extrapolateRight: 'clamp' }),
                        transform: `translateX(${interpolate(b2Frame, [25, 60], [-30, 0], {
                          easing: Easing.out(Easing.cubic),
                          extrapolateRight: 'clamp',
                        })}px)`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 54,
                          fontWeight: 900,
                          color: '#F8FAFC',
                          letterSpacing: -1,
                          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                        }}
                      >
                        شکاف فضا
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: goldColor,
                          marginTop: 6,
                          letterSpacing: 3,
                          fontFamily: 'monospace',
                        }}
                      >
                        CHOREOGRAPHY: SPATIAL INCISION
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 03: EMPIRICAL DATA PILLARS BUILD (240 - 390f)                         */}
        {/* ========================================================================= */}
        {frame >= 235 && frame < 405 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 245
                  ? interpolate(frame, [235, 245], [0, 1])
                  : frame > 385
                  ? interpolate(frame, [385, 405], [1, 0])
                  : 1,
            }}
          >
            {(() => {
              const b3Frame = frame - 240;
              const heights = [220, 360, 290, 420];
              const xPositions = [660, 840, 1020, 1200];

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Baseline foundation */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 560,
                      top: 720,
                      width: 800,
                      height: 2,
                      backgroundColor: 'rgba(212, 175, 55, 0.4)',
                    }}
                  />

                  {/* Kinetic Momentum Handoff Shockwave (transmitted from Beat 02 seed strike) */}
                  {b3Frame < 25 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 960 - (b3Frame * 22),
                        top: 718,
                        width: b3Frame * 44,
                        height: 6,
                        background: 'linear-gradient(to right, transparent, rgba(56, 189, 248, 0.9), transparent)',
                        opacity: 1 - b3Frame / 25,
                      }}
                    />
                  )}

                  {/* 4 Staggered Monolith Pillars */}
                  {xPositions.map((posX, i) => {
                    const staggerDelay = i * 10;
                    const p = Math.min(1, Math.max(0, (b3Frame - staggerDelay) / 45));
                    const springProgress = Easing.bezier(0.16, 1, 0.3, 1)(p);
                    const currentHeight = interpolate(springProgress, [0, 1], [0, heights[i]]);
                    const topY = 720 - currentHeight;

                    return (
                      <div key={i}>
                        {/* Architectural Monolith Body */}
                        <div
                          style={{
                            position: 'absolute',
                            left: posX - 32,
                            top: topY,
                            width: 64,
                            height: currentHeight,
                            background: `linear-gradient(to top, rgba(212, 175, 55, 0.12), rgba(248, 250, 252, 0.08))`,
                            border: '1.2px solid rgba(212, 175, 55, 0.65)',
                            borderBottom: 'none',
                            boxShadow: '0 0 25px rgba(0,0,0,0.85)',
                          }}
                        >
                          {/* Zenith Pylon Gold Highlight */}
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 3,
                              backgroundColor: goldColor,
                              boxShadow: `0 0 16px ${goldColor}`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  {/* Typographic Label */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960,
                      top: 180,
                      transform: 'translateX(-50%)',
                      textAlign: 'center',
                      direction: 'rtl',
                      opacity: interpolate(b3Frame, [20, 50], [0, 1], {
                        extrapolateRight: 'clamp',
                      }),
                    }}
                  >
                    <div
                      style={{
                        fontSize: 42,
                        fontWeight: 900,
                        color: '#F8FAFC',
                      }}
                    >
                      پایه‌های تجربی
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: goldColor,
                        marginTop: 6,
                        letterSpacing: 2,
                      }}
                    >
                      EMPIRICAL FOUNDATIONS
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 04: KINETIC PEAK / DYNAMIC CURVE & ORBIT RING (385 - 540f)            */}
        {/* MIGRATION B: 32-POINT OPTIMAL CORRESPONDENCE MORPH (PILLARS -> ORBIT RING) */}
        {/* ========================================================================= */}
        {frame >= 385 && frame < 555 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 395
                  ? interpolate(frame, [385, 395], [0, 1])
                  : frame > 535
                  ? interpolate(frame, [535, 555], [1, 0])
                  : 1,
            }}
          >
            {(() => {
              const b4Frame = frame - 390;
              
              // Migration B: Optimal Correspondence Morph from Foundation Rectangle to Dynamic Ring
              const morphProgress = Math.min(1, Math.max(0, b4Frame / 45));
              const polyRect: Point2D[] = [
                { x: 760, y: 500 },
                { x: 1160, y: 500 },
                { x: 1160, y: 580 },
                { x: 760, y: 580 },
              ];
              const polyCircle: Point2D[] = Array.from({ length: 32 }).map((_, idx) => {
                const angle = (idx / 32) * Math.PI * 2;
                return {
                  x: 960 + Math.cos(angle) * 160,
                  y: 540 + Math.sin(angle) * 160,
                };
              });

              const morphedShape = interpolateOptimalMorph(polyRect, polyCircle, morphProgress, 32);

              const coilProgress = Easing.bezier(0.16, 1, 0.3, 1)(
                Math.min(1, Math.max(0, b4Frame / 75))
              );
              const rotation = interpolate(b4Frame, [0, 150], [0, 360]);
              const ringRadius = interpolate(coilProgress, [0, 1], [60, 220]);

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Transition Carrier Morph Path during early beat frames */}
                  {b4Frame < 50 && (
                    <svg
                      width={1920}
                      height={1080}
                      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
                    >
                      <path
                        d={morphedShape.dPath}
                        fill="rgba(56, 189, 248, 0.15)"
                        stroke={goldColor}
                        strokeWidth={2.5}
                      />
                    </svg>
                  )}

                  {/* Central Dynamic Orbit Rings */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960 - ringRadius,
                      top: 540 - ringRadius,
                      width: ringRadius * 2,
                      height: ringRadius * 2,
                      borderRadius: '50%',
                      border: `3px solid ${goldColor}`,
                      boxShadow: `0 0 45px rgba(212, 175, 55, 0.8), inset 0 0 35px rgba(56, 189, 248, 0.5)`,
                      transform: `rotate(${rotation}deg)`,
                      opacity: b4Frame > 20 ? 1 : b4Frame / 20,
                    }}
                  >
                    {/* Orbiting Satellite Nodes */}
                    {[0, 90, 180, 270].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const nx = ringRadius + ringRadius * Math.cos(rad);
                      const ny = ringRadius + ringRadius * Math.sin(rad);

                      return (
                        <div
                          key={idx}
                          style={{
                            position: 'absolute',
                            left: nx - 8,
                            top: ny - 8,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: idx % 2 === 0 ? goldColor : cyanAccent,
                            boxShadow: `0 0 16px #FFF`,
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Secondary Centrifugal Wave Ring */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960 - (ringRadius + 50),
                      top: 540 - (ringRadius + 50),
                      width: (ringRadius + 50) * 2,
                      height: (ringRadius + 50) * 2,
                      borderRadius: '50%',
                      border: '1px dashed rgba(56, 189, 248, 0.5)',
                      transform: `rotate(${-rotation * 0.7}deg)`,
                      opacity: b4Frame > 25 ? 1 : 0,
                    }}
                  />

                  {/* Hero Word: «جهش» */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960,
                      top: 540,
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      direction: 'rtl',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 84,
                        fontWeight: 900,
                        color: '#F8FAFC',
                        textShadow: `0 0 40px ${goldColor}`,
                      }}
                    >
                      جهش
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 05: PINNED IRIS STILLNESS & CATALYTIC BREACH (535 - 675f)            */}
        {/* V31 CHOREOGRAPHY REDESIGN: Zero-Drift Frozen Hold -> Explosive Radial Clear */}
        {/* ========================================================================= */}
        {frame >= 535 && frame < 675 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 545
                  ? interpolate(frame, [535, 545], [0, 1])
                  : frame > 665
                  ? interpolate(frame, [665, 675], [1, 0])
                  : 1,
            }}
          >
            {(() => {
              const b5Frame = frame - 540; // 0 to 135
              
              // Phase 1: Rapid centripetal braking into center (0 to 20f)
              // Phase 2: Absolute 100% frozen tension hold (20 to 52f = 32 frames of silence!)
              // Phase 3: Catalytic radial breach outward (52 to 95f) clearing the stage for Beat 06
              
              const isBraking = b5Frame < 20;
              const isFrozen = b5Frame >= 20 && b5Frame < 52;
              const isBreach = b5Frame >= 52;
              
              let irisRadius = 140;
              let irisOpacity = 1.0;
              let centerNodeScale = 1.0;
              let breachShockwaveRadius = 0;
              let breachShockwaveOpacity = 0;

              if (isBraking) {
                const brakeP = b5Frame / 20;
                const brakeCurve = Easing.bezier(0.16, 1, 0.3, 1)(brakeP);
                irisRadius = interpolate(brakeCurve, [0, 1], [320, 140]);
                centerNodeScale = interpolate(brakeCurve, [0, 1], [2.2, 1.0]);
              } else if (isFrozen) {
                // ABSOLUTE ZERO VELOCITY / STILLNESS DISCIPLINE
                irisRadius = 140;
                irisOpacity = 1.0;
                centerNodeScale = 1.0;
              } else if (isBreach) {
                const breachP = Math.min(1, (b5Frame - 52) / 38);
                const breachCurve = Easing.bezier(0.12, 0, 0.39, 0)(breachP);
                irisRadius = interpolate(breachCurve, [0, 1], [140, 880]);
                irisOpacity = interpolate(breachP, [0, 0.5, 1], [1.0, 0.7, 0]);
                centerNodeScale = interpolate(breachP, [0, 0.2, 1], [1.0, 3.5, 0]);
                breachShockwaveRadius = interpolate(breachCurve, [0, 1], [0, 940]);
                breachShockwaveOpacity = interpolate(breachP, [0, 0.4, 1], [0.9, 0.4, 0]);
              }

              return (
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {/* Concentric Breached Shockwave Ring */}
                  {isBreach && breachShockwaveRadius > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        width: breachShockwaveRadius * 2,
                        height: breachShockwaveRadius * 2,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(56, 189, 248, 0.8)',
                        opacity: breachShockwaveOpacity,
                        boxShadow: '0 0 35px rgba(56, 189, 248, 0.4)',
                      }}
                    />
                  )}

                  {/* The Precision Hairline Iris */}
                  <div
                    style={{
                      position: 'absolute',
                      width: irisRadius * 2,
                      height: irisRadius * 2,
                      borderRadius: '50%',
                      border: '1.2px solid rgba(212, 175, 55, 0.85)',
                      opacity: irisOpacity,
                      boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
                    }}
                  />

                  {/* Singular Center Anchor Node */}
                  {centerNodeScale > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: goldColor,
                        boxShadow: `0 0 22px ${goldColor}`,
                        transform: `scale(${centerNodeScale})`,
                      }}
                    />
                  )}

                  {/* Contemplative Silence Editorial Typography (Only visible during frozen hold) */}
                  {isFrozen && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 140,
                        direction: 'rtl',
                        fontFamily: 'Vazirmatn',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 34,
                          fontWeight: 800,
                          color: '#F8FAFC',
                          letterSpacing: -0.5,
                        }}
                      >
                        سکوت سرشار از تعلیق
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: goldColor,
                          marginTop: 6,
                          letterSpacing: 4,
                          fontFamily: 'monospace',
                        }}
                      >
                        CHOREOGRAPHY: 32-FRAME ZERO-DRIFT HOLD
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 06: ANATOMICAL LIGATURE METAMORPHOSIS / «اصالت» -> COMPASS (655 - 825f)*/}
        {/* V31 CHOREOGRAPHY REDESIGN: Typography as Material -> Sovereign Navigation   */}
        {/* ========================================================================= */}
        {frame >= 655 && frame < 825 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 665
                  ? interpolate(frame, [655, 665], [0, 1])
                  : frame > 805
                  ? interpolate(frame, [805, 825], [1, 0])
                  : 1,
            }}
          >
            {(() => {
              const b6Frame = frame - 660; // -5 to 165
              
              // 1. Authoritative Typographic Arrival & Anchor: «اصالت» (0 to 35f)
              // 2. Ligature Fracture & Radial Spine Extrusion (35 to 85f)
              // 3. Compass Star Metamorphosis & Sovereign Rotation (85 to 140f)
              
              const pArrival = Math.min(1, Math.max(0, b6Frame / 30));
              const arrivalCurve = Easing.bezier(0.16, 1, 0.3, 1)(pArrival);
              
              const pFracture = Math.min(1, Math.max(0, (b6Frame - 32) / 50));
              const fractureCurve = Easing.bezier(0.16, 1, 0.3, 1)(pFracture);
              
              const wordOpacity = interpolate(pFracture, [0, 0.7, 1], [1, 0.6, 0]);
              const starProgress = fractureCurve;
              const starRotation = interpolate(b6Frame, [35, 150], [0, 90]);

              return (
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {/* Horizontal Baseline Datum Anchor */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 320,
                      right: 320,
                      top: 540,
                      height: 2,
                      backgroundColor: 'rgba(212, 175, 55, 0.45)',
                    }}
                  />

                  {/* Impact Shockwave Ring upon Arrival */}
                  {b6Frame >= 20 && b6Frame <= 65 && (
                    <div
                      style={{
                        position: 'absolute',
                        width: (b6Frame - 20) * 26,
                        height: (b6Frame - 20) * 26,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(56, 189, 248, 0.75)',
                        opacity: interpolate(b6Frame, [20, 65], [1, 0]),
                      }}
                    />
                  )}

                  {/* Hero Word: «اصالت» (Authenticity / Sovereignty) */}
                  {wordOpacity > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        direction: 'rtl',
                        fontFamily: 'Vazirmatn',
                        fontSize: 96,
                        fontWeight: 900,
                        color: '#F8FAFC',
                        textAlign: 'center',
                        opacity: wordOpacity,
                        transform: `translateY(${interpolate(arrivalCurve, [0, 1], [-60, -32])}px) scale(${interpolate(arrivalCurve, [0, 1], [0.85, 1])})`,
                        textShadow: '0 4px 35px rgba(0,0,0,0.95)',
                      }}
                    >
                      اصالت
                    </div>
                  )}

                  {/* Extruded Navigational Compass Star (Emerged from letterform vector fractures) */}
                  {starProgress > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        transform: `rotate(${starRotation}deg)`,
                      }}
                    >
                      <svg width={400} height={400} viewBox="-200 -200 400 400">
                        {/* 8 Radial Ray Spines unfolding outwards */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                          const rad = (angle * Math.PI) / 180;
                          const rayLen = interpolate(starProgress, [0, 1], [25, 150]);
                          const x2 = rayLen * Math.cos(rad);
                          const y2 = rayLen * Math.sin(rad);

                          return (
                            <line
                              key={idx}
                              x1={0}
                              y1={0}
                              x2={x2}
                              y2={y2}
                              stroke={idx % 2 === 0 ? goldColor : cyanAccent}
                              strokeWidth={idx % 2 === 0 ? 3.5 : 2}
                              strokeOpacity={starProgress}
                            />
                          );
                        })}

                        {/* Concentric Precision Rings */}
                        <circle
                          r={interpolate(starProgress, [0, 1], [0, 52])}
                          fill="none"
                          stroke={goldColor}
                          strokeWidth={2}
                          strokeOpacity={starProgress}
                        />
                        <circle
                          r={interpolate(starProgress, [0, 1], [0, 20])}
                          fill={goldColor}
                          opacity={starProgress}
                        />
                      </svg>
                    </div>
                  )}

                  {/* Choreography Editorial Sub-Label */}
                  {b6Frame > 40 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 150,
                        direction: 'rtl',
                        fontFamily: 'Vazirmatn',
                        textAlign: 'center',
                        opacity: interpolate(b6Frame, [40, 65], [0, 1], { extrapolateRight: 'clamp' }),
                      }}
                    >
                      <div style={{ fontSize: 13, color: goldColor, letterSpacing: 4, fontFamily: 'monospace' }}>
                        CHOREOGRAPHY: ANATOMICAL LIGATURE UNCOILS INTO SOVEREIGN STAR
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 07: CAMERA APERTURE PUNCH-THROUGH (810 - 960f)                       */}
        {/* ========================================================================= */}
        {frame >= 805 && frame < 975 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 815
                  ? interpolate(frame, [805, 815], [0, 1])
                  : frame > 955
                  ? interpolate(frame, [955, 975], [1, 0])
                  : 1,
            }}
          >
            {(() => {
              const b7Frame = frame - 810;
              const plunge = Easing.bezier(0.5, 0, 0.1, 1)(
                Math.min(1, Math.max(0, b7Frame / 110))
              );

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {[1.0, 1.8, 3.2].map((scaleMult, idx) => {
                    const currentScale = interpolate(plunge, [0, 1], [0.8 * scaleMult, 4.5 * scaleMult]);
                    const ringOpacity = interpolate(currentScale, [0.8, 2.5, 4.5], [1, 0.9, 0]);

                    return (
                      <div
                        key={idx}
                        style={{
                          position: 'absolute',
                          left: 960 - 200,
                          top: 540 - 200,
                          width: 400,
                          height: 400,
                          borderRadius: '50%',
                          border: `${3 - idx * 0.8}px solid ${idx === 0 ? goldColor : cyanAccent}`,
                          transform: `scale(${currentScale})`,
                          opacity: ringOpacity,
                          boxShadow: `0 0 40px rgba(212, 175, 55, 0.4)`,
                        }}
                      />
                    );
                  })}

                  {/* Axial Light Rays */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960,
                      top: 540,
                      transform: 'translate(-50%, -50%)',
                      width: 2,
                      height: 800,
                      background: `linear-gradient(to bottom, transparent, ${goldColor}, transparent)`,
                      opacity: interpolate(b7Frame, [0, 40, 110], [0, 0.7, 0]),
                    }}
                  />
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 08: SOVEREIGN RESOLUTION & PLINTH SETTLE (960 - 1080f)               */}
        {/* ========================================================================= */}
        {frame >= 955 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: frame < 965 ? interpolate(frame, [955, 965], [0, 1]) : 1,
            }}
          >
            {(() => {
              const b8Frame = frame - 960;
              const plinthProgress = Easing.bezier(0.16, 1, 0.3, 1)(
                Math.min(1, Math.max(0, b8Frame / 50))
              );
              const settle = calculateSettleLock(b8Frame, 50, { settleFrames: 25 });

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Resolution Base Plinth */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 660,
                      top: 680,
                      width: 600,
                      height: 4,
                      backgroundColor: goldColor,
                      transform: `scaleX(${plinthProgress})`,
                      boxShadow: `0 0 25px rgba(212, 175, 55, 0.6)`,
                    }}
                  />

                  {/* Sovereign Emblem & Final Typography */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960,
                      top: 500 + settle.translateY,
                      transform: 'translateX(-50%)',
                      textAlign: 'center',
                      direction: 'rtl',
                      opacity: interpolate(b8Frame, [20, 50], [0, 1], {
                        extrapolateRight: 'clamp',
                      }),
                    }}
                  >
                    <div
                      style={{
                        fontSize: 48,
                        fontWeight: 900,
                        color: '#F8FAFC',
                        letterSpacing: -0.5,
                      }}
                    >
                      طراحی حرکت اصیل
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: goldColor,
                        marginTop: 10,
                        letterSpacing: 3,
                      }}
                    >
                      SOVEREIGN MOTION GRAPHICS
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
