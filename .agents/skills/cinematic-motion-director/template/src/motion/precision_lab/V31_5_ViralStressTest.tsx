import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';

/**
 * V31.5 VIRAL CLAUDE MOTION GRAPHICS STRESS TEST
 * 
 * "The Evolution of a Singular Datum: From 1D Tension to 3D Spatial Geometry and Typographic Consciousness."
 * 
 * Duration: 450 frames (15.0s @ 30 FPS)
 * Canvas: 1920x1080 Full-frame Editorial Motion Graphics
 * 
 * Act I: Tension Datum & Elastic Pluck (0 - 75f)
 * Act II: Dimensional Isometric Monolith (75 - 165f)
 * Act III: Typographic Materialization «خلق» (165 - 255f)
 * Act IV: Frozen Singularity Void & Radial Detonation (255 - 345f)
 * Act V: Sovereign Astrolabe Matrix & Finale «هندسه اندیشه» (345 - 450f)
 */

export const V31_5_ViralStressTest: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';
  const bgDark = '#030508';

  return (
    <AbsoluteFill style={{ backgroundColor: bgDark, overflow: 'hidden', color: '#FFF', fontFamily: 'sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.35} />

      {/* Persistent Subtle Editorial HUD Framing */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 54,
          right: 54,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: 2,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: 14,
          zIndex: 200,
        }}
      >
        <div style={{ color: goldColor, fontWeight: 700 }}>
          STUDIO EXPERIMENTAL — V31.5 VIRAL SHOWREEL
        </div>
        <div>
          SEC: {(frame / 30).toFixed(2)}s | FRAME: {frame} / 450
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACT I: TENSION DATUM & ELASTIC WHIP (Frames 0 - 75)                       */}
      {/* ========================================================================= */}
      {frame < 80 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame > 70 ? (80 - frame) / 10 : 1 }}>
          {(() => {
            // Phase 1 (0-25): Rest state - 1D horizontal hairline datum across center
            // Phase 2 (25-45): Extreme parabolic downward tension pull
            // Phase 3 (45-75): Explosive diagonal whip release
            
            const isRest = frame < 25;
            const isPull = frame >= 25 && frame < 45;
            const isWhip = frame >= 45;

            let pathD = 'M 240 540 Q 960 540 1680 540';
            let headX = 960;
            let headY = 540;
            let headScale = 1.0;

            if (isRest) {
              const restP = Math.min(1, frame / 20);
              pathD = `M ${interpolate(restP, [0, 1], [960, 240])} 540 Q 960 540 ${interpolate(restP, [0, 1], [960, 1680])} 540`;
              headScale = interpolate(restP, [0, 1], [0, 1]);
            } else if (isPull) {
              const pullP = (frame - 25) / 20;
              const pullCurve = Easing.bezier(0.4, 0, 0.2, 1)(pullP);
              const pullY = interpolate(pullCurve, [0, 1], [540, 780]);
              pathD = `M 240 540 Q 960 ${pullY} 1680 540`;
              headY = pullY;
              headScale = interpolate(pullP, [0, 1], [1.0, 1.6]);
            } else if (isWhip) {
              const whipP = Math.min(1, (frame - 45) / 26);
              const whipCurve = Easing.bezier(0.12, 0, 0.39, 0)(whipP);
              headX = interpolate(whipCurve, [0, 1], [960, 1620]);
              headY = interpolate(whipCurve, [0, 1], [780, 260]);
              headScale = interpolate(whipP, [0, 0.3, 1], [1.6, 2.2, 1.0]);
              pathD = `M 240 540 Q ${interpolate(whipP, [0, 1], [960, 1200])} ${interpolate(whipP, [0, 1], [780, 480])} ${headX} ${headY}`;
            }

            return (
              <>
                <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={goldColor}
                    strokeWidth={isWhip ? 3 : 1.5}
                    strokeLinecap="round"
                    strokeOpacity={0.85}
                  />
                  {isWhip && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={cyanAccent}
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeOpacity={0.3}
                    />
                  )}
                </svg>

                {/* Tension Head Seed */}
                <div
                  style={{
                    position: 'absolute',
                    left: headX - 10,
                    top: headY - 10,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#FFF',
                    boxShadow: `0 0 25px ${goldColor}, 0 0 50px ${cyanAccent}`,
                    transform: `scale(${headScale})`,
                  }}
                />

                {/* Minimal Conceptual Typography */}
                {frame >= 25 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 280,
                      top: 400,
                      direction: 'rtl',
                      fontFamily: 'Vazirmatn',
                      opacity: interpolate(frame, [25, 40], [0, 1], { extrapolateRight: 'clamp' }),
                    }}
                  >
                    <div style={{ fontSize: 48, fontWeight: 900, color: '#F8FAFC' }}>کشش اولیه</div>
                    <div style={{ fontSize: 13, color: goldColor, letterSpacing: 4, fontFamily: 'monospace', marginTop: 4 }}>
                      01 / ELASTIC TENSION PLUCK
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACT II: 3D ISOMETRIC WIREFRAME MONOLITH (Frames 70 - 170)                  */}
      {/* The trajectory folds along 3 axes to create real spatial depth.            */}
      {/* ========================================================================= */}
      {frame >= 70 && frame < 175 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 80 ? (frame - 70) / 10 : frame > 165 ? (175 - frame) / 10 : 1 }}>
          {(() => {
            const relF = frame - 75;
            const p = Math.min(1, Math.max(0, relF / 85));
            const tumbleCurve = Easing.bezier(0.16, 1, 0.3, 1)(p);
            
            // 3D Isometric projection math
            const angleY = interpolate(tumbleCurve, [0, 1], [-45, 135]);
            const angleX = interpolate(tumbleCurve, [0, 1], [25, -20]);
            const cubeSize = interpolate(tumbleCurve, [0, 0.4, 1], [80, 240, 210]);
            const posX = interpolate(tumbleCurve, [0, 1], [1620, 960]);
            const posY = interpolate(tumbleCurve, [0, 1], [260, 540]);

            return (
              <div
                style={{
                  position: 'absolute',
                  left: posX,
                  top: posY,
                  transform: 'translate(-50%, -50%)',
                  perspective: 1200,
                }}
              >
                <div
                  style={{
                    width: cubeSize,
                    height: cubeSize,
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${angleX}deg) rotateY(${angleY}deg)`,
                  }}
                >
                  {/* 6 Isometric Planes with hairline wireframes & subtle depth shading */}
                  {[
                    { transform: `translateZ(${cubeSize / 2}px)` },
                    { transform: `rotateY(180deg) translateZ(${cubeSize / 2}px)` },
                    { transform: `rotateY(-90deg) translateZ(${cubeSize / 2}px)` },
                    { transform: `rotateY(90deg) translateZ(${cubeSize / 2}px)` },
                    { transform: `rotateX(90deg) translateZ(${cubeSize / 2}px)` },
                    { transform: `rotateX(-90deg) translateZ(${cubeSize / 2}px)` },
                  ].map((face, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        border: '1.5px solid rgba(212, 175, 55, 0.85)',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(56, 189, 248, 0.04))',
                        boxShadow: 'inset 0 0 25px rgba(212, 175, 55, 0.1)',
                        transform: face.transform,
                      }}
                    >
                      {/* Corner vertex nodes */}
                      <div style={{ position: 'absolute', top: -3, left: -3, width: 6, height: 6, backgroundColor: '#FFF', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: -3, right: -3, width: 6, height: 6, backgroundColor: goldColor, borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', bottom: -3, left: -3, width: 6, height: 6, backgroundColor: cyanAccent, borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', bottom: -3, right: -3, width: 6, height: 6, backgroundColor: '#FFF', borderRadius: '50%' }} />
                    </div>
                  ))}
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    position: 'absolute',
                    top: cubeSize / 2 + 50,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    direction: 'rtl',
                    fontFamily: 'Vazirmatn',
                    width: 400,
                  }}
                >
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#F8FAFC' }}>انعقاد در فضا</div>
                  <div style={{ fontSize: 13, color: goldColor, letterSpacing: 4, fontFamily: 'monospace', marginTop: 4 }}>
                    02 / 3D ISOMETRIC FOLD
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACT III: TYPOGRAPHIC MATERIALIZATION «خلق» (Frames 165 - 260)              */}
      {/* The 3D edges uncoil and trace the calligraphic ligatures of «خلق»          */}
      {/* ========================================================================= */}
      {frame >= 165 && frame < 265 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 175 ? (frame - 165) / 10 : frame > 255 ? (265 - frame) / 10 : 1 }}>
          {(() => {
            const relF = frame - 170;
            const p = Math.min(1, Math.max(0, relF / 45));
            const impactCurve = Easing.bezier(0.16, 1, 0.3, 1)(p);
            
            // Squash and stretch authority
            const scaleX = interpolate(p, [0, 0.3, 0.6, 1], [0.8, 1.15, 0.95, 1.0]);
            const scaleY = interpolate(p, [0, 0.3, 0.6, 1], [1.3, 0.85, 1.05, 1.0]);
            const wordY = interpolate(impactCurve, [0, 1], [380, 520]);

            return (
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Horizontal Baseline Datum */}
                <div
                  style={{
                    position: 'absolute',
                    left: 360,
                    right: 360,
                    top: 560,
                    height: 2,
                    backgroundColor: 'rgba(212, 175, 55, 0.5)',
                  }}
                />

                {/* Impact Shockwave Ring upon Arrival */}
                {relF >= 12 && relF <= 55 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 560 - (relF - 12) * 12,
                      width: (relF - 12) * 24,
                      height: (relF - 12) * 24,
                      borderRadius: '50%',
                      border: '1.5px solid rgba(56, 189, 248, 0.75)',
                      opacity: interpolate(relF, [12, 55], [1, 0]),
                    }}
                  />
                )}

                {/* Hero Persian Word: «خلق» (Creation / Emergence) */}
                <div
                  style={{
                    position: 'absolute',
                    top: wordY,
                    transform: `translateY(-50%) scale(${scaleX}, ${scaleY})`,
                    direction: 'rtl',
                    fontFamily: 'Vazirmatn',
                    fontSize: 140,
                    fontWeight: 900,
                    color: '#F8FAFC',
                    textShadow: '0 8px 45px rgba(0,0,0,0.95), 0 0 40px rgba(212, 175, 55, 0.4)',
                    textAlign: 'center',
                  }}
                >
                  خلق
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 180,
                    textAlign: 'center',
                    direction: 'rtl',
                    fontFamily: 'Vazirmatn',
                  }}
                >
                  <div style={{ fontSize: 14, color: goldColor, letterSpacing: 5, fontFamily: 'monospace' }}>
                    03 / TYPOGRAPHY AS GRAPHIC MATERIAL
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACT IV: THE FROZEN SINGULARITY & RADIAL BREACH (Frames 255 - 350)          */}
      {/* 35 frames of 100% frozen stillness followed by a violent radial breach.    */}
      {/* ========================================================================= */}
      {frame >= 255 && frame < 355 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 265 ? (frame - 255) / 10 : frame > 345 ? (355 - frame) / 10 : 1 }}>
          {(() => {
            const relF = frame - 260; // 0 to 95
            
            // Phase 1 (0-25): Implosion into center singularity
            // Phase 2 (25-60): ABSOLUTE ZERO-DRIFT STILLNESS (35 frames of dead silence!)
            // Phase 3 (60-95): Explosive radial breach outward
            
            const isImplode = relF < 25;
            const isFreeze = relF >= 25 && relF < 60;
            const isDetonate = relF >= 60;

            let irisRadius = 140;
            let irisOpacity = 1.0;
            let coreScale = 1.0;
            let shockwaveRadius = 0;
            let shockwaveOpacity = 0;

            if (isImplode) {
              const p = relF / 25;
              const curve = Easing.bezier(0.16, 1, 0.3, 1)(p);
              irisRadius = interpolate(curve, [0, 1], [400, 120]);
              coreScale = interpolate(curve, [0, 1], [3.0, 1.0]);
            } else if (isFreeze) {
              // 100% DEAD SILENCE - ZERO PIXEL MOVEMENT
              irisRadius = 120;
              irisOpacity = 1.0;
              coreScale = 1.0;
            } else if (isDetonate) {
              const detP = Math.min(1, (relF - 60) / 32);
              const detCurve = Easing.bezier(0.12, 0, 0.39, 0)(detP);
              irisRadius = interpolate(detCurve, [0, 1], [120, 920]);
              irisOpacity = interpolate(detP, [0, 0.4, 1], [1.0, 0.8, 0]);
              coreScale = interpolate(detP, [0, 0.2, 1], [1.0, 4.0, 0]);
              shockwaveRadius = interpolate(detCurve, [0, 1], [0, 980]);
              shockwaveOpacity = interpolate(detP, [0, 0.3, 1], [1.0, 0.5, 0]);
            }

            return (
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Expanding Shockwave Ring */}
                {isDetonate && shockwaveRadius > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: shockwaveRadius * 2,
                      height: shockwaveRadius * 2,
                      borderRadius: '50%',
                      border: '2px solid rgba(56, 189, 248, 0.85)',
                      opacity: shockwaveOpacity,
                      boxShadow: '0 0 45px rgba(56, 189, 248, 0.5)',
                    }}
                  />
                )}

                {/* Precision Hairline Iris */}
                <div
                  style={{
                    position: 'absolute',
                    width: irisRadius * 2,
                    height: irisRadius * 2,
                    borderRadius: '50%',
                    border: '1.2px solid rgba(212, 175, 55, 0.9)',
                    opacity: irisOpacity,
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
                  }}
                />

                {/* Singular Core Node */}
                {coreScale > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#FFF',
                      boxShadow: `0 0 25px ${goldColor}`,
                      transform: `scale(${coreScale})`,
                    }}
                  />
                )}

                {/* Silence Subtitle during frozen hold */}
                {isFreeze && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 160,
                      textAlign: 'center',
                      direction: 'rtl',
                      fontFamily: 'Vazirmatn',
                    }}
                  >
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#F8FAFC' }}>سکوت نقطه صفر</div>
                    <div style={{ fontSize: 13, color: goldColor, letterSpacing: 4, fontFamily: 'monospace', marginTop: 4 }}>
                      04 / 35-FRAME ZERO-VELOCITY HOLD
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ACT V: SOVEREIGN ASTROLABE MATRIX & FINALE «هندسه اندیشه» (Frames 345 - 450) */}
      {/* ========================================================================= */}
      {frame >= 345 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 355 ? (frame - 345) / 10 : 1 }}>
          {(() => {
            const relF = frame - 350;
            const p = Math.min(1, Math.max(0, relF / 50));
            const lockCurve = Easing.bezier(0.16, 1, 0.3, 1)(p);
            
            const matrixScale = interpolate(lockCurve, [0, 1], [0.6, 1.0]);
            const rotation = interpolate(lockCurve, [0, 1], [-45, 0]) + (relF > 50 ? (relF - 50) * 0.15 : 0);
            const radius = 220;

            return (
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Horizontal Baseline Datum Anchor */}
                <div
                  style={{
                    position: 'absolute',
                    left: 280,
                    right: 280,
                    top: 540,
                    height: 1.5,
                    backgroundColor: 'rgba(212, 175, 55, 0.35)',
                  }}
                />

                {/* Multilayer Astrolabe Matrix */}
                <div
                  style={{
                    position: 'absolute',
                    transform: `scale(${matrixScale}) rotate(${rotation}deg)`,
                  }}
                >
                  <svg width={500} height={500} viewBox="-250 -250 500 500">
                    {/* 12 Astrolabe Rays */}
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const angle = (idx / 12) * Math.PI * 2;
                      const len = idx % 3 === 0 ? radius : radius * 0.75;
                      return (
                        <line
                          key={idx}
                          x1={0}
                          y1={0}
                          x2={len * Math.cos(angle)}
                          y2={len * Math.sin(angle)}
                          stroke={idx % 3 === 0 ? goldColor : 'rgba(56, 189, 248, 0.6)'}
                          strokeWidth={idx % 3 === 0 ? 2 : 1}
                          strokeDasharray={idx % 2 === 0 ? 'none' : '4 4'}
                        />
                      );
                    })}

                    {/* Concentric Precision Rings */}
                    <circle r={radius} fill="none" stroke={goldColor} strokeWidth={1.5} />
                    <circle r={radius * 0.7} fill="none" stroke={cyanAccent} strokeWidth={1} strokeDasharray="6 6" />
                    <circle r={radius * 0.4} fill="none" stroke={goldColor} strokeWidth={1.5} />
                    <circle r={14} fill={goldColor} />
                  </svg>
                </div>

                {/* Final Authority Typography */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 120,
                    textAlign: 'center',
                    direction: 'rtl',
                    fontFamily: 'Vazirmatn',
                    opacity: interpolate(relF, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
                  }}
                >
                  <div style={{ fontSize: 52, fontWeight: 900, color: '#F8FAFC', letterSpacing: -1 }}>
                    هندسه اندیشه
                  </div>
                  <div style={{ fontSize: 14, color: goldColor, letterSpacing: 5, fontFamily: 'monospace', marginTop: 6 }}>
                    THE GEOMETRY OF THOUGHT — AUTEUR FINALE
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </AbsoluteFill>
  );
};
