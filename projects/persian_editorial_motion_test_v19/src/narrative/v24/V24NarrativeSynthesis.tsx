import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';
import {
  evaluateDirectorAtFrame,
  V24_EDITORIAL_NARRATIVE_PLAN,
  calculatePoseLadder,
} from '../../../../../src/director/AdaptiveDirector';

/**
 * V24 — NARRATIVE SYNTHESIS
 * Duration: 1,080 frames (36.00s @ 30 FPS)
 * Resolution: 1920x1080
 * 
 * An authored, rhythmically balanced editorial motion-graphics piece governed by
 * the Adaptive Director planning engine:
 * 
 * IDEA → VISUAL METAPHOR → MOTION VERB → CHOREOGRAPHY → RHYTHM → TRANSITION → NEXT IDEA
 * 
 * 8 Beats:
 * - Beat 01 (000 - 120f): Genesis / Horizontal Datum (Energy 2, Static Camera)
 * - Beat 02 (120 - 240f): Nucleus Compression & Slingshot Launch (Energy 2, Static Camera)
 * - Beat 03 (240 - 390f): Empirical Data Pillars Build (Energy 3, Slow Camera Push)
 * - Beat 04 (390 - 540f): Kinetic Peak / Dynamic Curve & Orbit Ring (Energy 5, Push)
 * - Beat 05 (540 - 660f): Deep Frozen Silence / Hairline Iris (Energy 1, 75f Hold, Static Camera)
 * - Beat 06 (660 - 810f): Kinetic Typography as Geometry / Slam & Star (Energy 4, Static Camera)
 * - Beat 07 (810 - 960f): Camera Punch-Through Aperture Portal (Energy 4, Camera Through)
 * - Beat 08 (960 - 1080f): Sovereign Resolution & Plinth Settle-Lock (Energy 2, Static Camera)
 */

export const V24NarrativeSynthesis: React.FC = () => {
  const frame = useCurrentFrame();

  // Query Adaptive Director for authoritative authored state at this frame
  const directorState = evaluateDirectorAtFrame(frame, V24_EDITORIAL_NARRATIVE_PLAN);
  const { currentBeat, cameraScale, cameraTranslateX, cameraTranslateY } = directorState;

  // Global visual constants
  const goldColor = '#D4AF37';
  const paleGold = '#F5E6AB';
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
        {frame < 135 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: frame < 115 ? 1 : interpolate(frame, [115, 135], [1, 0]),
            }}
          >
            {/* Center-out horizontal datum line */}
            {(() => {
              const traceProgress = Easing.bezier(0.16, 1, 0.3, 1)(
                Math.min(1, Math.max(0, frame / 50))
              );
              const halfWidth = interpolate(traceProgress, [0, 1], [0, 720]);

              return (
                <div
                  style={{
                    position: 'absolute',
                    top: 620,
                    left: 960 - halfWidth,
                    width: halfWidth * 2,
                    height: 2,
                    backgroundColor: goldColor,
                    boxShadow: `0 0 16px rgba(212, 175, 55, 0.5)`,
                  }}
                >
                  {/* Subtle coordinate ticks */}
                  {[-600, -400, -200, 0, 200, 400, 600].map((offset) => (
                    <div
                      key={offset}
                      style={{
                        position: 'absolute',
                        left: halfWidth + offset,
                        top: -5,
                        width: 1,
                        height: 12,
                        backgroundColor: 'rgba(212, 175, 55, 0.4)',
                        opacity: Math.abs(offset) < halfWidth ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              );
            })()}

            {/* Typography: Still Anchor */}
            {(() => {
              const textOp = interpolate(frame, [25, 55], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const textY = interpolate(frame, [25, 55], [20, 0], {
                easing: Easing.out(Easing.cubic),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <div
                  style={{
                    position: 'absolute',
                    left: 960,
                    top: 550,
                    transform: `translateX(-50%) translateY(${textY}px)`,
                    textAlign: 'center',
                    direction: 'rtl',
                    opacity: textOp,
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: '#F8FAFC',
                      letterSpacing: -0.5,
                      textShadow: '0 4px 24px rgba(0,0,0,0.8)',
                    }}
                  >
                    نقطه آغاز
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'rgba(212, 175, 55, 0.85)',
                      marginTop: 8,
                      letterSpacing: 2,
                    }}
                  >
                    THE GENESIS OF INQUIRY
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 02: NUCLEUS COMPRESSION & SLINGSHOT LAUNCH (120 - 240f)              */}
        {/* ========================================================================= */}
        {frame >= 115 && frame < 255 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 125
                  ? interpolate(frame, [115, 125], [0, 1])
                  : frame > 235
                  ? interpolate(frame, [235, 255], [1, 0])
                  : 1,
            }}
          >
            {(() => {
              const b2Frame = frame - 120;
              // Phase 1 (0-30f): compression & anticipation pullback left
              // Phase 2 (30-65f): slingshot acceleration rightward with stretch
              // Phase 3 (65-120f): settle hold at target position
              let posX = 560;
              let scaleX = 1.0;
              let scaleY = 1.0;
              let trailWidth = 0;

              if (b2Frame < 30) {
                const p = b2Frame / 30;
                const pull = Easing.bezier(0.4, 0, 0.6, 1)(p);
                posX = interpolate(pull, [0, 1], [960, 480]);
                scaleX = interpolate(pull, [0, 1], [1.0, 0.7]);
                scaleY = interpolate(pull, [0, 1], [1.0, 1.3]);
              } else if (b2Frame < 70) {
                const p = (b2Frame - 30) / 40;
                const launch = Easing.bezier(0.12, 0, 0.39, 0)(p);
                posX = interpolate(launch, [0, 1], [480, 1280]);
                scaleX = interpolate(launch, [0, 0.4, 1], [0.7, 1.45, 1.0]);
                scaleY = interpolate(launch, [0, 0.4, 1], [1.3, 0.75, 1.0]);
                trailWidth = interpolate(launch, [0, 0.5, 1], [0, 320, 0]);
              } else {
                const p = Math.min(1, (b2Frame - 70) / 25);
                const settle = calculateSettleLock(b2Frame - 70, 0, { settleFrames: 25 });
                posX = interpolate(p, [0, 1], [1280, 1260]) + settle.translateY;
                scaleX = 1.0;
                scaleY = 1.0;
              }

              return (
                <>
                  {/* Velocity wake trail */}
                  {trailWidth > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: posX - trailWidth,
                        top: 538,
                        width: trailWidth,
                        height: 4,
                        background: `linear-gradient(to right, transparent, ${goldColor})`,
                        opacity: 0.8,
                      }}
                    />
                  )}

                  {/* Golden Nucleus Seed */}
                  <div
                    style={{
                      position: 'absolute',
                      left: posX - 18,
                      top: 540 - 18,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: goldColor,
                      boxShadow: `0 0 28px ${goldColor}, 0 0 60px rgba(212, 175, 55, 0.5)`,
                      transform: `scale(${scaleX}, ${scaleY})`,
                    }}
                  />

                  {/* Dynamic Verb Typography */}
                  {b2Frame > 40 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 480,
                        top: 480,
                        direction: 'rtl',
                        opacity: interpolate(b2Frame, [40, 65], [0, 1], {
                          extrapolateRight: 'clamp',
                        }),
                        transform: `translateX(${interpolate(b2Frame, [40, 75], [-40, 0], {
                          easing: Easing.out(Easing.cubic),
                          extrapolateRight: 'clamp',
                        })}px)`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 52,
                          fontWeight: 900,
                          color: '#F8FAFC',
                          letterSpacing: -1,
                        }}
                      >
                        تمرکز
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: 'rgba(56, 189, 248, 0.9)',
                          marginTop: 6,
                          letterSpacing: 2,
                        }}
                      >
                        CONVERGENT MOMENTUM
                      </div>
                    </div>
                  )}
                </>
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

                  {/* 4 Staggered Monolith Pillars */}
                  {xPositions.map((posX, i) => {
                    const staggerDelay = i * 10;
                    const p = Math.min(1, Math.max(0, (b3Frame - staggerDelay) / 45));
                    const springProgress = Easing.bezier(0.16, 1, 0.3, 1)(p);
                    const currentHeight = interpolate(springProgress, [0, 1], [0, heights[i]]);
                    const topY = 720 - currentHeight;

                    return (
                      <div key={i}>
                        {/* Pillar Body */}
                        <div
                          style={{
                            position: 'absolute',
                            left: posX - 28,
                            top: topY,
                            width: 56,
                            height: currentHeight,
                            background: `linear-gradient(to top, rgba(212, 175, 55, 0.15), rgba(56, 189, 248, 0.4))`,
                            border: '1px solid rgba(212, 175, 55, 0.6)',
                            borderBottom: 'none',
                          }}
                        />

                        {/* Apex Vertex Energy Node */}
                        <div
                          style={{
                            position: 'absolute',
                            left: posX - 8,
                            top: topY - 8,
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: goldColor,
                            boxShadow: `0 0 16px ${cyanAccent}`,
                            opacity: p > 0.1 ? 1 : 0,
                          }}
                        />

                        {/* Analytical Tick Annotations */}
                        {p > 0.8 && (
                          <div
                            style={{
                              position: 'absolute',
                              left: posX - 20,
                              top: topY - 32,
                              color: 'rgba(248, 250, 252, 0.7)',
                              fontSize: 13,
                              fontWeight: 700,
                              fontFamily: 'monospace',
                            }}
                          >
                            +{(heights[i] * 0.42).toFixed(1)}
                          </div>
                        )}
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
        {/* BEAT 04: KINETIC PEAK / DYNAMIC CURVE & ORBIT RING (390 - 540f)            */}
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
              // Phase 1 (0-50f): 4 nodes compress and link into aerodynamic curve
              // Phase 2 (50-110f): curve takes flight, coiling into luminous orbit ring
              // Phase 3 (110-150f): centrifugal expansion at peak energy
              const coilProgress = Easing.bezier(0.16, 1, 0.3, 1)(
                Math.min(1, Math.max(0, b4Frame / 75))
              );
              const rotation = interpolate(b4Frame, [0, 150], [0, 360]);
              const ringRadius = interpolate(coilProgress, [0, 1], [60, 220]);

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
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
        {/* BEAT 05: DEEP FROZEN SILENCE / HAIRLINE IRIS (540 - 660f)                 */}
        {/* ========================================================================= */}
        {frame >= 535 && frame < 675 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity:
                frame < 545
                  ? interpolate(frame, [535, 545], [0, 1])
                  : frame > 655
                  ? interpolate(frame, [655, 675], [1, 0])
                  : 1,
            }}
          >
            {/* The Iris is 100% FROZEN in stillness. Zero drift, zero scale change. */}
            <div
              style={{
                position: 'absolute',
                left: 1220 - 160,
                top: 540 - 160,
                width: 320,
                height: 320,
                borderRadius: '50%',
                border: '1.2px solid rgba(212, 175, 55, 0.85)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.25)',
              }}
            >
              {/* Ultra-pure singular center point */}
              <div
                style={{
                  position: 'absolute',
                  left: 160 - 3,
                  top: 160 - 3,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: goldColor,
                }}
              />
            </div>

            {/* Faint Horizontal Resting Datum */}
            <div
              style={{
                position: 'absolute',
                left: 240,
                right: 240,
                top: 540,
                height: 1,
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
              }}
            />

            {/* Typography: Still Anchor in Quiet Contemplation */}
            <div
              style={{
                position: 'absolute',
                left: 360,
                top: 510,
                direction: 'rtl',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: '#F8FAFC',
                  letterSpacing: -0.5,
                }}
              >
                سکوت ژرف
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(212, 175, 55, 0.75)',
                  marginTop: 8,
                  letterSpacing: 2,
                }}
              >
                THE VOID OF CONTEMPLATION
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BEAT 06: KINETIC TYPOGRAPHY / SLAM & STAR EMBLEM (660 - 810f)             */}
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
              const b6Frame = frame - 660;
              // Phase 1 (0-35f): Word «شتاب» slams from top to baseline with squash/stretch
              // Phase 2 (35-85f): Strokes deconstruct into 8 radial pen vectors
              // Phase 3 (85-150f): 8 vectors rotate & assemble into Compass Star emblem
              let wordY = 540;
              let scaleX = 1.0;
              let scaleY = 1.0;
              let wordOpacity = 1.0;
              let emblemProgress = 0;

              if (b6Frame < 35) {
                const p = b6Frame / 35;
                if (p < 0.7) {
                  // Fall
                  const fp = p / 0.7;
                  wordY = interpolate(fp, [0, 1], [180, 540]);
                  scaleX = 0.85;
                  scaleY = 1.25;
                } else {
                  // Impact squash & rebound
                  const ip = (p - 0.7) / 0.3;
                  scaleX = interpolate(ip, [0, 0.4, 1], [1.35, 0.95, 1.0]);
                  scaleY = interpolate(ip, [0, 0.4, 1], [0.72, 1.05, 1.0]);
                  wordY = 540;
                }
              } else if (b6Frame < 85) {
                wordOpacity = interpolate(b6Frame, [35, 65], [1, 0]);
                emblemProgress = interpolate(b6Frame, [40, 85], [0, 1], {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                });
              } else {
                wordOpacity = 0;
                emblemProgress = 1.0;
              }

              const emblemRotation = interpolate(b6Frame, [40, 150], [0, 90]);

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Baseline Datum */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 360,
                      right: 360,
                      top: 540,
                      height: 2,
                      backgroundColor: 'rgba(212, 175, 55, 0.5)',
                    }}
                  />

                  {/* Impact Shockwave Ring */}
                  {b6Frame >= 25 && b6Frame <= 65 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 960 - (b6Frame - 25) * 12,
                        top: 540 - (b6Frame - 25) * 12,
                        width: (b6Frame - 25) * 24,
                        height: (b6Frame - 25) * 24,
                        borderRadius: '50%',
                        border: '2px solid rgba(56, 189, 248, 0.8)',
                        opacity: interpolate(b6Frame, [25, 65], [1, 0]),
                      }}
                    />
                  )}

                  {/* Typographic Hero Slam: «شتاب» */}
                  {wordOpacity > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 960,
                        top: wordY,
                        transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
                        textAlign: 'center',
                        direction: 'rtl',
                        opacity: wordOpacity,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 88,
                          fontWeight: 900,
                          color: '#F8FAFC',
                          textShadow: '0 4px 30px rgba(0,0,0,0.9)',
                        }}
                      >
                        شتاب
                      </div>
                    </div>
                  )}

                  {/* Assembling Compass Star Emblem */}
                  {emblemProgress > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 960,
                        top: 540,
                        transform: `translate(-50%, -50%) rotate(${emblemRotation}deg)`,
                      }}
                    >
                      <svg width={360} height={360} viewBox="-180 -180 360 360">
                        {/* 8 Radial Ray Spines */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                          const rad = (angle * Math.PI) / 180;
                          const rayLen = interpolate(emblemProgress, [0, 1], [30, 130]);
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
                              strokeWidth={idx % 2 === 0 ? 3 : 1.5}
                              strokeOpacity={emblemProgress}
                            />
                          );
                        })}

                        {/* Central Concentric Rings */}
                        <circle
                          r={interpolate(emblemProgress, [0, 1], [0, 42])}
                          fill="none"
                          stroke={goldColor}
                          strokeWidth={2}
                        />
                        <circle
                          r={interpolate(emblemProgress, [0, 1], [0, 18])}
                          fill={goldColor}
                        />
                      </svg>
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
              // 3 Multi-plane depth rings expanding rapidly past the camera
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
              opacity: interpolate(frame, [955, 970], [0, 1]),
            }}
          >
            {(() => {
              const b8Frame = frame - 960;
              // Authoritative settle lock: snaps to exact integer subpixel coords
              const settle = calculateSettleLock(b8Frame, 0, { settleFrames: 40 });
              const crestY = 380 + settle.translateY;

              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Sovereign 8-Pointed Star Crest */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960,
                      top: crestY,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <svg width={260} height={260} viewBox="-130 -130 260 260">
                      {/* Outer Ring */}
                      <circle
                        r={110}
                        fill="none"
                        stroke={goldColor}
                        strokeWidth={2}
                      />
                      {/* Geometric 8-Pointed Star Path */}
                      <path
                        d="M 0 -95 L 24 -24 L 95 0 L 24 24 L 0 95 L -24 24 L -95 0 L -24 -24 Z"
                        fill="rgba(212, 175, 55, 0.2)"
                        stroke={goldColor}
                        strokeWidth={2.5}
                      />
                      {/* Secondary Interlocking Diamond Star */}
                      <path
                        d="M 0 -68 L 18 -18 L 68 0 L 18 18 L 0 68 L -18 18 L -68 0 L -18 -18 Z"
                        fill="none"
                        stroke={paleGold}
                        strokeWidth={1.5}
                      />
                      {/* Center Golden Core */}
                      <circle r={10} fill={goldColor} />
                    </svg>
                  </div>

                  {/* Polished Architectural Foundation Plinth */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960 - 240,
                      top: 530,
                      width: 480,
                      height: 6,
                      backgroundColor: goldColor,
                      boxShadow: '0 0 24px rgba(212, 175, 55, 0.6)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 960 - 360,
                      top: 536,
                      width: 720,
                      height: 1,
                      backgroundColor: 'rgba(212, 175, 55, 0.4)',
                    }}
                  />

                  {/* Master Typography Resolution */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 960,
                      top: 590,
                      transform: 'translateX(-50%)',
                      textAlign: 'center',
                      direction: 'rtl',
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
                      دانش ماندگار
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: goldColor,
                        marginTop: 10,
                        letterSpacing: 2,
                      }}
                    >
                      کمیته تحقیقات و فناوری دانشجویی
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'rgba(248, 250, 252, 0.6)',
                        marginTop: 12,
                        letterSpacing: 3,
                      }}
                    >
                      ENDURING SCIENTIFIC WISDOM
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
