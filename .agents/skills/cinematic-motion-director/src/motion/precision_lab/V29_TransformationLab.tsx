import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import {
  evaluateDotToLineToRing,
  evaluateImpactExtrusionHandoff,
  ContinuousObjectIdentity,
} from '../TransformationContinuityEngine';
import {
  interpolateOptimalMorph,
  Point2D,
} from '../fidelity/MotionFidelityEngine';

/**
 * V29 TRANSFORMATION LABORATORY
 * 
 * Demonstrates and validates the core V29 objectives:
 * TEST 01: Dot -> Line -> Ring (Identity & Topology continuity)
 * TEST 02: Momentum & Kinetic Energy Transfer (Seed strike -> Vertical pillar extrusion)
 * TEST 03: Authored Topology Morph vs Rubber Morph
 * TEST 04: Typographic Ligature Extraction -> Geometric Compass Star
 * 
 * Specs: 1920x1080 @ 30 FPS, 120 frames (4.0s).
 */

export const V29_TransformationLab: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';
  const emeraldAccent = '#10B981';

  // TEST 01: Canonical Dot -> Line -> Ring Sequence
  const test01Entity = evaluateDotToLineToRing(frame, 0, {
    dotX: 200,
    dotY: 340,
    targetLineWidth: 480,
    targetRingRadius: 100,
  });

  // TEST 02: Kinetic Energy Transfer (Seed strike -> 4 Pillars)
  const test02Result = evaluateImpactExtrusionHandoff(frame, 10, 4);

  // TEST 03: Authored Morph vs Procedural Rubber Morph (Circle -> Star)
  const morphP = Math.min(1, Math.max(0, (frame - 20) / 45));
  const polyCircle: Point2D[] = Array.from({ length: 32 }).map((_, idx) => {
    const angle = (idx / 32) * Math.PI * 2;
    return {
      x: 320 + Math.cos(angle) * 70,
      y: 840 + Math.sin(angle) * 70,
    };
  });
  const polyStar: Point2D[] = Array.from({ length: 32 }).map((_, idx) => {
    const angle = (idx / 32) * Math.PI * 2;
    const r = idx % 2 === 0 ? 85 : 35;
    return {
      x: 320 + Math.cos(angle) * r,
      y: 840 + Math.sin(angle) * r,
    };
  });
  const authoredMorph = interpolateOptimalMorph(polyCircle, polyStar, morphP, 32);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', color: '#FFF', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* Laboratory Title Header */}
      <div style={{ padding: '32px 60px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: goldColor, margin: 0 }}>
              V29 TRANSFORMATION CONTINUITY & MOMENTUM LABORATORY
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4, margin: 0 }}>
              Testing unbroken object identity, kinetic momentum handoff, and authored topology grammar.
            </p>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: emeraldAccent, backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '6px 14px', borderRadius: 6, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            FRAME: {frame} / 120 (30 FPS)
          </div>
        </div>
      </div>

      {/* Grid Layout of Studies */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: 'calc(1080px - 105px)', padding: '24px 60px', gap: 24 }}>
        
        {/* =================================================================== */}
        {/* PANEL 1: CANONICAL DOT -> LINE -> RING CONTINUOUS TRANSFORMATION    */}
        {/* =================================================================== */}
        <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.02)', padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#F8FAFC' }}>
            STUDY 01: DOT → LINE → RING (Unbroken Identity)
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
            Directional stretch launch, curve bending, and continuous angular rotation.
          </div>

          <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: 'monospace', fontSize: 11, color: goldColor }}>
            [{test01Entity.phase}] | VX={test01Entity.vx} | ROT={test01Entity.rotationDeg}°
          </div>

          {/* Test 01 Visual Entity */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {test01Entity.activeType === 'STRETCH_LAUNCH' && (
              <div
                style={{
                  position: 'absolute',
                  left: test01Entity.x - 16,
                  top: 220 - 16,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: goldColor,
                  boxShadow: `0 0 25px ${goldColor}`,
                  transform: `scale(${test01Entity.scaleX}, ${test01Entity.scaleY})`,
                }}
              />
            )}

            {test01Entity.activeType === 'CURVE_WRAP' && (
              <div
                style={{
                  position: 'absolute',
                  left: test01Entity.x - 70,
                  top: 220 - 70,
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: `3px solid ${goldColor}`,
                  boxShadow: `0 0 30px rgba(212, 175, 55, 0.6)`,
                  transform: `rotate(${test01Entity.rotationDeg}deg)`,
                }}
              >
                {/* Orbit satellite showing continuous angular momentum */}
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    left: 70 - 8,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: cyanAccent,
                    boxShadow: '0 0 12px #FFF',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* PANEL 2: MOMENTUM HANDOFF (SEED STRIKE -> VERTICAL PILLAR ERUPTION)  */}
        {/* =================================================================== */}
        <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.02)', padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#F8FAFC' }}>
            STUDY 02: KINETIC STRIKE → PILLAR EXTRUSION
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
            High-speed seed strikes foundation, transferring momentum into sequential pillar eruption.
          </div>

          {/* Foundation Ground Line */}
          <div
            style={{
              position: 'absolute',
              left: 60,
              right: 60,
              top: 360,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
            }}
          />

          {/* Traveling / Impacting Nucleus */}
          {test02Result.nucleus.opacity > 0 && (
            <div
              style={{
                position: 'absolute',
                left: test02Result.nucleus.x - 14 - 450,
                top: test02Result.nucleus.y - 14 - 360,
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: goldColor,
                boxShadow: `0 0 20px ${goldColor}`,
                transform: `scale(${test02Result.nucleus.scaleX}, ${test02Result.nucleus.scaleY})`,
                opacity: test02Result.nucleus.opacity,
              }}
            />
          )}

          {/* 4 Erupting Pillars */}
          <div style={{ position: 'absolute', left: 80, right: 80, top: 360, display: 'flex', justifyContent: 'space-around' }}>
            {test02Result.pillars.map((pillar, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: 44,
                  height: pillar.height * 0.55,
                  transform: 'translateY(-100%)',
                  background: 'linear-gradient(to top, rgba(212, 175, 55, 0.2), rgba(56, 189, 248, 0.5))',
                  border: '1.5px solid rgba(212, 175, 55, 0.7)',
                  borderBottom: 'none',
                  opacity: pillar.opacity,
                }}
              >
                {/* Apex Energy Node */}
                <div
                  style={{
                    position: 'absolute',
                    top: -6,
                    left: 22 - 6,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: goldColor,
                    transform: `scale(${pillar.energyNodeScale})`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* PANEL 3: AUTHORED TOPOLOGY MORPH (CIRCLE -> STAR WITH SYMMETRY)      */}
        {/* =================================================================== */}
        <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.02)', padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#F8FAFC' }}>
            STUDY 03: AUTHORED MORPH CORRESPONDENCE
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
            Arc-length equidistant resampling & cyclic shift alignment avoids rubber-blob pinching.
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
            <svg width={260} height={260} viewBox="220 740 200 200">
              <path
                d={authoredMorph.dPath}
                fill="rgba(56, 189, 248, 0.2)"
                stroke={goldColor}
                strokeWidth={2.5}
              />
            </svg>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PANEL 4: PERSIAN TYPOGRAPHY LIGATURE FRACTURE -> EMBLEM GEOMETRY    */}
        {/* =================================================================== */}
        <div style={{ position: 'relative', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.02)', padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#F8FAFC' }}>
            STUDY 04: TYPOGRAPHIC LIGATURE DISSECTION → EMBLEM
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
            Word «اصالت» preserves ligature proportions until clean radial ray extrusion.
          </div>

          {(() => {
            const typoP = Math.min(1, Math.max(0, (frame - 30) / 50));
            const wordOp = typoP < 0.4 ? 1 : interpolate(typoP, [0.4, 0.7], [1, 0]);
            const emblemP = interpolate(typoP, [0.35, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const rot = interpolate(emblemP, [0, 1], [0, 90]);

            return (
              <div style={{ position: 'relative', height: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Word «اصالت» */}
                {wordOp > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      direction: 'rtl',
                      fontFamily: 'Vazirmatn',
                      fontSize: 54,
                      fontWeight: 900,
                      color: '#FFF',
                      opacity: wordOp,
                    }}
                  >
                    اصالت
                  </div>
                )}

                {/* Extruded Compass Emblem */}
                {emblemP > 0 && (
                  <svg width={180} height={180} viewBox="-90 -90 180 180" style={{ transform: `rotate(${rot}deg)` }}>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const len = interpolate(emblemP, [0, 1], [15, 75]);
                      return (
                        <line
                          key={idx}
                          x1={0}
                          y1={0}
                          x2={len * Math.cos(rad)}
                          y2={len * Math.sin(rad)}
                          stroke={idx % 2 === 0 ? goldColor : cyanAccent}
                          strokeWidth={2}
                          strokeOpacity={emblemP}
                        />
                      );
                    })}
                    <circle r={interpolate(emblemP, [0, 1], [0, 24])} fill="none" stroke={goldColor} strokeWidth={1.5} />
                    <circle r={6} fill={goldColor} />
                  </svg>
                )}
              </div>
            );
          })()}
        </div>

      </div>
    </AbsoluteFill>
  );
};
