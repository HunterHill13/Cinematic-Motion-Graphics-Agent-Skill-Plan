import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';
import { V30_ART_DIRECTION_REGISTRY } from '../../director/VisualConceptDirector';

/**
 * V30 CREATIVE DIRECTION LABORATORY
 * 
 * Replaces generic mathematical benchmarks with 4 full-frame, cinematic motion studies
 * executing pure creative direction principles:
 * 
 * STUDY 01: NEGATIVE SPACE SEAM (Motion as Spatial Incision) [Frames 0 - 60]
 * STUDY 02: TECTONIC MONOLITHS & ARCHITECTURAL VOID (No UI data bars) [Frames 60 - 120]
 * STUDY 03: TYPOGRAPHY BECOMES NAVIGATION (Anatomical stroke fracture) [Frames 120 - 180]
 * STUDY 04: DELIBERATE STILLNESS & CATALYTIC ERUPTION [Frames 180 - 240]
 * 
 * Specs: 1920x1080 @ 30 FPS, 240 frames (8.0s), Full-frame cinematic canvas.
 */

export const V30_CreativeDirectionLab: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', color: '#FFF', fontFamily: 'sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.4} />

      {/* Persistent Subtle Top Editorial HUD */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 64,
          right: 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          paddingBottom: 16,
          zIndex: 100,
        }}
      >
        <div style={{ color: goldColor, fontWeight: 700, letterSpacing: 2 }}>
          V30 CREATIVE DIRECTION LABORATORY — IDEA FIRST
        </div>
        <div>
          FRAME: {frame} / 240 (30 FPS) | {
            frame < 60 ? 'STUDY 01: NEGATIVE SPACE SEAM' :
            frame < 120 ? 'STUDY 02: TECTONIC MONOLITHS' :
            frame < 180 ? 'STUDY 03: TYPOGRAPHY AS GEOMETRY' :
            'STUDY 04: STILLNESS & ERUPTION'
          }
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STUDY 01: NEGATIVE SPACE INCISION (0 - 60f)                                */}
      {/* Motion is not a decorative particle streak; it slices the canvas fabric.  */}
      {/* ========================================================================= */}
      {frame < 65 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame > 55 ? (65 - frame) / 10 : 1 }}>
          {(() => {
            const p = Math.min(1, Math.max(0, frame / 45));
            const sliceCurve = Easing.bezier(0.12, 0, 0.39, 0)(p);
            
            // Traveling razor seed slicing diagonally across canvas
            const seedX = interpolate(sliceCurve, [0, 1], [320, 1440]);
            const seedY = interpolate(sliceCurve, [0, 1], [680, 360]);

            // Seam width opens behind the incision
            const slitWidth = interpolate(p, [0, 0.5, 1], [0, 12, 2]);
            const slitOpacity = interpolate(p, [0, 0.3, 1], [0, 1, 0.85]);

            return (
              <>
                {/* Luminous Spatial Seam (Negative space fracture) */}
                <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <line
                    x1={320}
                    y1={680}
                    x2={seedX}
                    y2={seedY}
                    stroke={goldColor}
                    strokeWidth={slitWidth}
                    strokeLinecap="round"
                    strokeOpacity={slitOpacity}
                  />
                  {/* Subtle ethereal glow halo inside the incision */}
                  <line
                    x1={320}
                    y1={680}
                    x2={seedX}
                    y2={seedY}
                    stroke={cyanAccent}
                    strokeWidth={slitWidth * 2.5}
                    strokeOpacity={slitOpacity * 0.3}
                  />
                </svg>

                {/* Razor Seed Head */}
                {p < 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: seedX - 10,
                      top: seedY - 10,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: '#FFF',
                      boxShadow: `0 0 30px ${goldColor}, 0 0 60px ${cyanAccent}`,
                      transform: 'scale(1.4, 0.7) rotate(-22deg)',
                    }}
                  />
                )}

                {/* Editorial Sub-Title */}
                <div style={{ position: 'absolute', left: 320, top: 740, direction: 'rtl', fontFamily: 'Vazirmatn' }}>
                  <div style={{ fontSize: 38, fontWeight: 900, color: '#F8FAFC' }}>شکاف فضا</div>
                  <div style={{ fontSize: 13, color: goldColor, letterSpacing: 3, marginTop: 4 }}>
                    MOTION AS SPATIAL INCISION
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDY 02: TECTONIC MONOLITHS & ARCHITECTURAL VOID (60 - 120f)              */}
      {/* Replaces SaaS bar charts with brutalist monoliths framing negative space.  */}
      {/* ========================================================================= */}
      {frame >= 55 && frame < 125 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 65 ? (frame - 55) / 10 : frame > 115 ? (125 - frame) / 10 : 1 }}>
          {(() => {
            const relF = frame - 60;
            const p = Math.min(1, Math.max(0, relF / 40));
            const monolithHeights = [320, 520, 440, 600];
            const monolithX = [540, 780, 1020, 1260];

            return (
              <>
                {/* Horizontal Baseline Datum */}
                <div
                  style={{
                    position: 'absolute',
                    left: 400,
                    right: 400,
                    top: 760,
                    height: 2.5,
                    backgroundColor: 'rgba(212, 175, 55, 0.5)',
                  }}
                />

                {/* 4 Architectural Monoliths */}
                {monolithX.map((x, i) => {
                  const delay = i * 6;
                  const colP = Math.min(1, Math.max(0, (relF - delay) / 30));
                  const erupt = Easing.bezier(0.16, 1, 0.3, 1)(colP);
                  const currentH = interpolate(erupt, [0, 1], [0, monolithHeights[i]]);
                  const topY = 760 - currentH;

                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: x - 36,
                        top: topY,
                        width: 72,
                        height: currentH,
                        background: 'linear-gradient(to top, rgba(212, 175, 55, 0.1), rgba(248, 250, 252, 0.08))',
                        border: '1px solid rgba(212, 175, 55, 0.65)',
                        borderBottom: 'none',
                        boxShadow: '0 0 30px rgba(0,0,0,0.8)',
                      }}
                    >
                      {/* Subtle Zenith Pylon Highlight */}
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
                  );
                })}

                {/* Editorial Typography */}
                <div style={{ position: 'absolute', left: 960, top: 100, transform: 'translateX(-50%)', textAlign: 'center', direction: 'rtl', fontFamily: 'Vazirmatn' }}>
                  <div style={{ fontSize: 44, fontWeight: 900, color: '#F8FAFC' }}>معماری تجربی</div>
                  <div style={{ fontSize: 13, color: goldColor, letterSpacing: 4, marginTop: 6 }}>
                    TECTONIC MONOLITHS — ZERO UI CLICHÉS
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDY 03: TYPOGRAPHY AS STRUCTURAL GEOMETRY (120 - 180f)                   */}
      {/* Anatomical strokes of «اصالت» fracture and unfold into a compass star.    */}
      {/* ========================================================================= */}
      {frame >= 115 && frame < 185 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 125 ? (frame - 115) / 10 : frame > 175 ? (185 - frame) / 10 : 1 }}>
          {(() => {
            const relF = frame - 120;
            const p = Math.min(1, Math.max(0, relF / 45));
            const wordOp = p < 0.35 ? 1 : interpolate(p, [0.35, 0.65], [1, 0]);
            const starP = interpolate(p, [0.3, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const starCurve = Easing.bezier(0.16, 1, 0.3, 1)(starP);
            const rot = interpolate(starCurve, [0, 1], [0, 90]);

            return (
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Baseline Anchor */}
                <div
                  style={{
                    position: 'absolute',
                    left: 480,
                    right: 480,
                    top: 540,
                    height: 2,
                    backgroundColor: 'rgba(212, 175, 55, 0.4)',
                  }}
                />

                {/* Calligraphic Hero Word: «اصالت» */}
                {wordOp > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      direction: 'rtl',
                      fontFamily: 'Vazirmatn',
                      fontSize: 92,
                      fontWeight: 900,
                      color: '#FFF',
                      opacity: wordOp,
                      transform: `translateY(-30px) scale(${interpolate(p, [0, 0.35], [1, 1.05])})`,
                    }}
                  >
                    اصالت
                  </div>
                )}

                {/* Extruded Compass Star Structure */}
                {starP > 0 && (
                  <svg width={360} height={360} viewBox="-180 -180 360 360" style={{ transform: `rotate(${rot}deg)` }}>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const len = interpolate(starCurve, [0, 1], [20, 140]);
                      return (
                        <line
                          key={idx}
                          x1={0}
                          y1={0}
                          x2={len * Math.cos(rad)}
                          y2={len * Math.sin(rad)}
                          stroke={idx % 2 === 0 ? goldColor : cyanAccent}
                          strokeWidth={idx % 2 === 0 ? 3 : 1.5}
                          strokeOpacity={starP}
                        />
                      );
                    })}
                    <circle r={interpolate(starCurve, [0, 1], [0, 48])} fill="none" stroke={goldColor} strokeWidth={2} />
                    <circle r={12} fill={goldColor} />
                  </svg>
                )}

                {/* Editorial Subtitle */}
                <div style={{ position: 'absolute', bottom: 160, textAlign: 'center', direction: 'rtl', fontFamily: 'Vazirmatn' }}>
                  <div style={{ fontSize: 14, color: goldColor, letterSpacing: 4 }}>
                    STRUCTURAL ANATOMY UNCOILS INTO NAVIGATION
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDY 04: DELIBERATE STILLNESS & CATALYTIC ERUPTION (180 - 240f)          */}
      {/* Extreme contemplative hold followed by a sharp authoritative transition.  */}
      {/* ========================================================================= */}
      {frame >= 175 && (
        <div style={{ position: 'absolute', inset: 0, opacity: frame < 185 ? (frame - 175) / 10 : 1 }}>
          {(() => {
            const relF = frame - 180;
            // First 30 frames are absolute frozen stillness (tension hold)
            // Last 30 frames execute an explosive concentric expansion
            const isHold = relF < 28;
            const eruptP = Math.max(0, (relF - 28) / 32);
            const eruptCurve = Easing.bezier(0.12, 0, 0.39, 0)(eruptP);

            const irisRadius = isHold ? 140 : interpolate(eruptCurve, [0, 1], [140, 720]);
            const irisOpacity = isHold ? 1 : interpolate(eruptCurve, [0, 0.7, 1], [1, 0.8, 0]);

            return (
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Hairline Iris */}
                <div
                  style={{
                    position: 'absolute',
                    width: irisRadius * 2,
                    height: irisRadius * 2,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(212, 175, 55, 0.85)',
                    opacity: irisOpacity,
                    boxShadow: '0 0 24px rgba(212, 175, 55, 0.3)',
                  }}
                />

                {/* Singular Center Node */}
                <div
                  style={{
                    position: 'absolute',
                    width: isHold ? 6 : 14,
                    height: isHold ? 6 : 14,
                    borderRadius: '50%',
                    backgroundColor: goldColor,
                    boxShadow: `0 0 20px ${goldColor}`,
                  }}
                />

                {/* Sub-label during tension hold */}
                {isHold && (
                  <div style={{ position: 'absolute', bottom: 120, direction: 'rtl', fontFamily: 'Vazirmatn', textAlign: 'center' }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#F8FAFC' }}>سکوت سرشار از تعلیق</div>
                    <div style={{ fontSize: 13, color: goldColor, letterSpacing: 3, marginTop: 4 }}>
                      30-FRAME TENSION HOLD (ZERO-DRIFT DISCIPLINE)
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

    </AbsoluteFill>
  );
};
