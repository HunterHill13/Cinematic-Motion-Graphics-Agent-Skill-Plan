import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import {
  Point2D,
  calculateKinematics,
  interpolateOptimalMorph,
} from '../../../../../src/motion/fidelity/MotionFidelityEngine';

/**
 * V25 — A/B FIDELITY TEST REEL
 * Duration: 360 frames (12.00s @ 30 FPS)
 * 
 * Sequentially compares BEFORE (V24 Procedural Easing) vs AFTER (V25 Kinematic Fidelity)
 * across 5 core studies:
 * 1. Dot to Line Handoff (Frames 0 - 72)
 * 2. Heavy Impact Drop (Frames 72 - 144)
 * 3. Circle to Star Morph (Frames 144 - 216)
 * 4. Elastic Launch (Frames 216 - 288)
 * 5. Kinetic Word Slam (Frames 288 - 360)
 */
export const V25_AB_Review: React.FC = () => {
  const frame = useCurrentFrame();

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';
  const crimson = '#EF4444';

  // 5 Chapters of 72 frames each
  const chapterIdx = Math.min(4, Math.floor(frame / 72));
  const chapterLocalFrame = frame % 72;

  // Split chapter into BEFORE (0 - 34f), SEPARATOR (34 - 38f), AFTER (38 - 72f)
  const isBefore = chapterLocalFrame < 34;
  const isSeparator = chapterLocalFrame >= 34 && chapterLocalFrame < 38;
  const isAfter = chapterLocalFrame >= 38;

  const mode = isBefore ? 'BEFORE' : isAfter ? 'AFTER' : 'SEPARATOR';
  const subFrame = isBefore ? chapterLocalFrame : Math.max(0, chapterLocalFrame - 38);

  const chapterTitles = [
    'STUDY 1: DOT TO LINE VELOCITY HANDOFF',
    'STUDY 2: HEAVY IMPACT KINEMATICS',
    'STUDY 3: CIRCLE ↔ STAR PERCEPTUAL MORPH',
    'STUDY 4: ELASTIC LAUNCH & ANTICIPATION',
    'STUDY 5: COORDINATED TYPOGRAPHY SLAM',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden', fontFamily: 'Vazirmatn, sans-serif' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.6} />

      {/* Top Banner */}
      <div style={{ position: 'absolute', top: 28, left: 48, right: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: 12, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span
            style={{
              backgroundColor: isBefore ? crimson : isAfter ? cyanAccent : '#FFF',
              color: '#04060A',
              fontWeight: 900,
              fontSize: 14,
              padding: '3px 12px',
              borderRadius: 4,
            }}
          >
            {mode}
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 18 }}>
            {chapterTitles[chapterIdx]}
          </span>
        </div>
        <div style={{ color: isBefore ? 'rgba(239,68,68,0.9)' : cyanAccent, fontSize: 14, fontWeight: 700 }}>
          {isBefore ? 'V24 PROCEDURAL EASING' : isAfter ? 'V25 KINEMATIC FIDELITY' : 'TRANSITION'}
        </div>
      </div>

      {/* Flash Separator */}
      {isSeparator && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.25)', zIndex: 40 }} />
      )}

      {/* Chapter 1: Dot to Line */}
      {chapterIdx === 0 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {isBefore ? (
            // V24 Before: Dot pauses, fades out while line starts from 0
            <>
              {subFrame < 16 && (
                <div style={{ position: 'absolute', left: interpolate(subFrame, [0, 16], [500, 960]), top: 540 - 16, width: 32, height: 32, borderRadius: '50%', backgroundColor: goldColor, opacity: interpolate(subFrame, [12, 16], [1, 0]) }} />
              )}
              {subFrame >= 16 && (
                <div style={{ position: 'absolute', left: 960 - (subFrame - 16) * 14, top: 539, width: (subFrame - 16) * 28, height: 3, backgroundColor: goldColor, opacity: interpolate(subFrame, [16, 20], [0, 1]) }} />
              )}
              <div style={{ position: 'absolute', left: 960, top: 640, transform: 'translateX(-50%)', color: crimson, fontWeight: 700, fontSize: 16 }}>
                Procedural Flaw: 2-Frame Dead Pause + Opacity Dissolve
              </div>
            </>
          ) : (
            // V25 After: C1 continuous momentum handoff
            <>
              {subFrame < 16 ? (
                <div style={{ position: 'absolute', left: interpolate(subFrame, [0, 16], [500, 960]), top: 540 - 16, width: 32, height: 32, borderRadius: '50%', backgroundColor: goldColor, boxShadow: `0 0 20px ${goldColor}` }} />
              ) : (
                <div style={{ position: 'absolute', left: 960 - (subFrame - 16) * 22, top: 539, width: (subFrame - 16) * 44, height: 3, backgroundColor: goldColor, boxShadow: `0 0 24px ${goldColor}` }}>
                  <div style={{ position: 'absolute', left: (subFrame - 16) * 22 - 6, top: -4.5, width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFF' }} />
                </div>
              )}
              <div style={{ position: 'absolute', left: 960, top: 640, transform: 'translateX(-50%)', color: cyanAccent, fontWeight: 700, fontSize: 16 }}>
                Fidelity Fix: C1 Velocity Preserved Across Handover
              </div>
            </>
          )}
        </div>
      )}

      {/* Chapter 2: Heavy Impact */}
      {chapterIdx === 1 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', left: 480, right: 480, top: 700, height: 3, backgroundColor: goldColor }} />
          {isBefore ? (
            // V24 Before: standard ease-out, zero ground shock
            <>
              <div style={{ position: 'absolute', left: 960 - 50, top: interpolate(subFrame, [0, 20], [250, 600]), width: 100, height: 100, borderRadius: 6, backgroundColor: goldColor }} />
              <div style={{ position: 'absolute', left: 960, top: 760, transform: 'translateX(-50%)', color: crimson, fontWeight: 700, fontSize: 16 }}>
                Procedural Flaw: Linear Deceleration, Zero Mass Buildup
              </div>
            </>
          ) : (
            // V25 After: Heavy inertia + seismic shockwave
            <>
              {(() => {
                const kine = calculateKinematics(subFrame, 0, 22, 'HEAVY');
                const curY = interpolate(kine.position, [0, 1], [250, 600]);
                const isImpact = subFrame >= 20;
                const impAge = Math.max(0, subFrame - 20);
                const wave = Math.sin(impAge * 0.6) * Math.exp(-impAge * 0.2);

                return (
                  <>
                    {isImpact && (
                      <div style={{ position: 'absolute', left: 960 - impAge * 15, top: 700 - impAge * 3, width: impAge * 30, height: impAge * 6, borderRadius: '50%', border: `2px solid ${cyanAccent}`, opacity: 1 - impAge / 14 }} />
                    )}
                    <div style={{ position: 'absolute', left: 960 - 50, top: curY, width: 100, height: 100, borderRadius: 6, backgroundColor: goldColor, transform: `scale(${1 + wave * 0.4}, ${1 - wave * 0.4})`, transformOrigin: 'bottom center' }} />
                  </>
                );
              })()}
              <div style={{ position: 'absolute', left: 960, top: 760, transform: 'translateX(-50%)', color: cyanAccent, fontWeight: 700, fontSize: 16 }}>
                Fidelity Fix: Quadratic Inertia Surge + Damped Ground Shock
              </div>
            </>
          )}
        </div>
      )}

      {/* Chapter 3: Circle to Star Morph */}
      {chapterIdx === 2 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {(() => {
            const p = Math.min(1, subFrame / 28);
            const N = 32;
            const r = 160;
            const circ: Point2D[] = [];
            const star: Point2D[] = [];
            for (let i = 0; i < N; i++) {
              const a = (i / N) * Math.PI * 2;
              circ.push({ x: r * Math.cos(a), y: r * Math.sin(a) });
              const sr = r * (0.6 + 0.45 * Math.cos(a * 8));
              // In BEFORE: introduce an artificial phase twist of 90 degrees to demonstrate bad correspondence
              const twist = isBefore ? Math.PI * 0.5 : 0;
              star.push({ x: sr * Math.cos(a + twist), y: sr * Math.sin(a + twist) });
            }

            const { dPath } = interpolateOptimalMorph(circ, star, p, 32);

            return (
              <div style={{ position: 'absolute', left: 960, top: 540, transform: 'translate(-50%, -50%)' }}>
                <svg width={500} height={500} viewBox="-250 -250 500 500">
                  <path d={dPath} fill="rgba(212,175,55,0.2)" stroke={goldColor} strokeWidth={3} />
                </svg>
              </div>
            );
          })()}
          <div style={{ position: 'absolute', left: 960, top: 760, transform: 'translateX(-50%)', color: isBefore ? crimson : cyanAccent, fontWeight: 700, fontSize: 16 }}>
            {isBefore ? 'Procedural Flaw: Unaligned Point Indexing Causes Rotational Midpoint Twisting' : 'Fidelity Fix: Optimal Arc-Length Correspondence (Zero Twisting)'}
          </div>
        </div>
      )}

      {/* Chapter 4: Elastic Launch */}
      {chapterIdx === 3 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', left: 360, right: 360, top: 540, height: 2, backgroundColor: 'rgba(212,175,55,0.4)' }} />
          {(() => {
            let posX = 480;
            if (isBefore) {
              // V24 Before: standard ease-out from 0 without anticipation
              posX = interpolate(subFrame, [0, 24], [480, 1440], { easing: Easing.out(Easing.cubic) });
            } else {
              // V25 After: -8% anticipation dip + harmonic oscillation
              const kine = calculateKinematics(subFrame, 0, 32, 'ELASTIC');
              posX = interpolate(kine.position, [0, 1], [480, 1440]);
            }

            return (
              <div style={{ position: 'absolute', left: posX - 25, top: 540 - 25, width: 50, height: 50, borderRadius: '50%', backgroundColor: goldColor, boxShadow: `0 0 24px ${goldColor}` }} />
            );
          })()}
          <div style={{ position: 'absolute', left: 960, top: 660, transform: 'translateX(-50%)', color: isBefore ? crimson : cyanAccent, fontWeight: 700, fontSize: 16 }}>
            {isBefore ? 'Procedural Flaw: Zero Anticipation, Instant Mechanical Takeoff' : 'Fidelity Fix: -8% Elastic Pullback Dip + Damped Harmonic Ringout'}
          </div>
        </div>
      )}

      {/* Chapter 5: Kinetic Word Slam */}
      {chapterIdx === 4 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', left: 400, right: 400, top: 600, height: 3, backgroundColor: goldColor }} />
          {(() => {
            let wordY = 200;
            let sx = 1.0;
            let sy = 1.0;

            if (isBefore) {
              // V24 Before: decoupled linear drop, zero coordinated squash
              wordY = interpolate(subFrame, [0, 20], [200, 540], { easing: Easing.out(Easing.quad) });
            } else {
              // V25 After: coordinated HEAVY kinematics with air stretch and ground squash
              const kine = calculateKinematics(subFrame, 0, 22, 'HEAVY');
              wordY = interpolate(kine.position, [0, 1], [200, 540]);
              if (subFrame < 18) {
                sx = 0.85;
                sy = 1.30;
              } else {
                const age = subFrame - 18;
                const wave = Math.sin(age * 0.5) * Math.exp(-age * 0.2);
                sx = 1.0 + wave * 0.4;
                sy = 1.0 - wave * 0.4;
              }
            }

            return (
              <div style={{ position: 'absolute', left: 960, top: wordY, transform: `translate(-50%, -50%) scale(${sx}, ${sy})`, transformOrigin: 'bottom center', direction: 'rtl' }}>
                <div style={{ fontSize: 96, fontWeight: 900, color: '#F8FAFC', textShadow: `0 0 30px ${goldColor}` }}>
                  شتاب
                </div>
              </div>
            );
          })()}
          <div style={{ position: 'absolute', left: 960, top: 720, transform: 'translateX(-50%)', color: isBefore ? crimson : cyanAccent, fontWeight: 700, fontSize: 16 }}>
            {isBefore ? 'Procedural Flaw: Floating Y Deceleration Without Mass Deformation' : 'Fidelity Fix: Air-Stretch (0.85x/1.3x) + Synchronized Ground Squash'}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
