import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { getLocalAcousticTrigger } from '../motion/timing/voiceSync';
import {
  calculateImpactAndRipple,
  calculateTravelAndHandoff,
  calculateSplitAndConverge,
  calculateRevealAndEscalate,
} from '../motion/recipes';
import { AmbientGridV10 } from '../motion/ambient/AmbientGridV10';
import { TravelingMotifV10 } from '../motion/actors/TravelingMotifV10';
import {
  CoordinateBrackets,
  ConnectorTrack,
  ShockwaveRing,
} from '../motion/actors/SecondaryActorsV10';

/**
 * SHOT 02 — THE STATUTORY DECREE (SECTION KAF, ARTICLE 2)
 * - Duration: 300 frames (local 0 - 300f / global 350 - 650f)
 * - Frame-accurate strike at local frame 45 (global 395) on spoken «بند کاف» & «۲»
 * - Standardized Recipe: ImpactAndRipple, TravelAndHandoff, and SplitAndConverge
 * - Unbroken kinetic handoff: splits into 3 daughter nodes targeting Shot 03 criteria
 */
export const Shot02_FrameworkDecreeV10: React.FC = () => {
  const frame = useCurrentFrame();

  const NUMERAL_STRIKE_FRAME = getLocalAcousticTrigger(
    'shot02',
    'shot02_numeral_kaaf_strike'
  ); // 45

  // Incoming momentum from Shot 01 wipe
  const incomingMomentum = interpolate(frame, [0, 30], [280, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Reveal typography
  const textReveal = calculateRevealAndEscalate(frame, 15, 0, 0, {
    baselineDuration: 20,
    textDuration: 25,
    textOffset: 25,
  });

  // Recipe 02: Impact and Ripple at local frame 45
  const impactRipple = calculateImpactAndRipple(frame, NUMERAL_STRIKE_FRAME, {
    entryDuration: 20,
    reboundAmplitude: 7,
    shockwaveMaxRadius: 210,
    shockwaveDuration: 24,
    followerDelay: 4,
  });

  // Recipe 01 & Traveling Motif Trajectory:
  // 0 - 45f: Enters with velocity from right boundary (1920 -> 420, y: 240 -> 380)
  // 45f: Strikes Numeral «۲» apex, triggering shockwave and bracket settle
  // 50 - 240f: Stable elliptical charge orbit around Numeral «۲»
  // 240 - 270f: Recipe 03 SplitAndConverge into 3 daughter nodes for Shot 03
  let sparkX = 420;
  let sparkY = 380;
  let sparkScale = 1.0;
  let sparkOpacity = 1.0;
  let sparkWake = 0;
  let wakeAngle = 180;
  const isSplitting = frame >= 240;

  if (frame < NUMERAL_STRIKE_FRAME) {
    const travel = calculateTravelAndHandoff(
      frame,
      0,
      NUMERAL_STRIKE_FRAME,
      { x: 1980, y: 240 },
      { x: 420, y: 380 },
      { maxWake: 36 }
    );
    sparkX = travel.x;
    sparkY = travel.y;
    sparkScale = travel.scale;
    sparkOpacity = travel.opacity;
    sparkWake = travel.wakeLength;
    wakeAngle = 190;
  } else if (frame < 240) {
    const orbitAngle = (frame - NUMERAL_STRIKE_FRAME) * 0.04;
    sparkX = 420 + Math.cos(orbitAngle) * 90;
    sparkY = 520 + Math.sin(orbitAngle) * 70;
    sparkScale = 1.0;
    sparkOpacity = 1.0;
    sparkWake = 10;
    wakeAngle = ((orbitAngle + Math.PI / 2) * 180) / Math.PI;
  }

  // Recipe 03: Split and Converge at frames 240 - 270
  const splitResult = calculateSplitAndConverge(
    frame,
    240,
    30,
    { x: 420, y: 520 },
    [
      { x: 360, y: 540 }, // Target Node 1: GPA 16
      { x: 960, y: 540 }, // Target Node 2: Disciplinary Stamp
      { x: 1500, y: 540 }, // Target Node 3: 6 Articles
    ],
    'split'
  );

  // Exit handoff to Shot 03 (240 - 270f)
  const exitProgress = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const exitOp = interpolate(exitProgress, [0, 0.7], [1, 0], { extrapolateRight: 'clamp' });
  const compressionScale = interpolate(exitProgress, [0, 1], [1, 0.1]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#030611',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', sans-serif",
      }}
    >
      {/* LAYER 0: Deep Atmospheric Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 25% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* LAYER 1: Ambient Grid & Technical Metadata (Role D) */}
      <AmbientGridV10 color="rgba(56, 189, 248, 0.05)" glowColor="rgba(56, 189, 248, 0.08)" />

      {/* LAYER 2: Editorial Datum Rule (Role B) with Physical Baseline Rebound */}
      <div
        style={{
          position: 'absolute',
          bottom: 220 + impactRipple.baselineDisplacement,
          left: 140,
          right: 140,
          height: 2,
          backgroundColor: '#38BDF8',
          boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
          opacity: exitOp,
        }}
      />

      {/* LAYER 3: The Traveling Motif (Role B — Single Spark or 3 Daughter Nodes) */}
      {!isSplitting ? (
        <TravelingMotifV10
          x={sparkX}
          y={sparkY}
          scale={sparkScale}
          color="#38BDF8"
          glowColor="rgba(56, 189, 248, 0.7)"
          opacity={sparkOpacity}
          wakeLength={sparkWake}
          wakeAngle={wakeAngle}
          morphMode="spark"
        />
      ) : (
        <>
          {splitResult.nodes.map((node, idx) => {
            const colors = ['#38BDF8', '#D4AF37', '#10B981'];
            return (
              <TravelingMotifV10
                key={`daughter-${idx}`}
                x={node.x}
                y={node.y}
                scale={node.scale}
                color={colors[idx]}
                glowColor={colors[idx]}
                opacity={node.opacity * exitOp}
                wakeLength={12}
                wakeAngle={idx === 0 ? 180 : idx === 1 ? 90 : 0}
                morphMode="spark"
              />
            );
          })}
        </>
      )}

      {/* LAYER 4: Secondary Actors (Role C / D) */}
      {/* Radial Impact Shockwave on Frame 45 Numeral Strike */}
      <ShockwaveRing
        x={420}
        y={380}
        radius={impactRipple.shockwave.radius}
        opacity={impactRipple.shockwave.opacity}
        color="#38BDF8"
        strokeWidth={impactRipple.shockwave.strokeWidth}
      />

      {/* Coordinate Brackets Framing Numeral «۲» */}
      {frame >= NUMERAL_STRIKE_FRAME && (
        <CoordinateBrackets
          x={420}
          y={520 + impactRipple.follower.y}
          width={220}
          height={280}
          bracketSize={24}
          color="rgba(56, 189, 248, 0.5)"
          opacity={impactRipple.follower.opacity * exitOp}
          scale={impactRipple.follower.scale}
        />
      )}

      {/* Connector Track from Numeral «۲» to Decree Headline */}
      {frame >= 35 && frame < 240 && (
        <ConnectorTrack
          startX={540}
          startY={520}
          endX={780}
          endY={480}
          color="rgba(56, 189, 248, 0.3)"
          dashed={true}
        />
      )}

      {/* LAYER 5 & 6: Primary Graphic Entities & Typographic Monolith */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 140px',
          direction: 'rtl',
          transform: `scale(${compressionScale})`,
          transformOrigin: '25% 50%',
          opacity: exitOp,
        }}
      >
        {/* Right Zone: Official Decree Typographic Monolith */}
        <div
          style={{
            flex: 1.4,
            maxWidth: 1050,
            transform: `translateX(${incomingMomentum}px)`,
            opacity: textReveal.contentOpacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, backgroundColor: '#38BDF8' }} />
            <span style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
              LEGAL DIRECTIVE • مستند قانونی
            </span>
            <span style={{ fontSize: 13, color: 'rgba(148, 163, 184, 0.5)', fontFamily: 'monospace' }}>
              [MOH-RES-ART2-KAF]
            </span>
          </div>

          <h1 style={{ fontSize: 62, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.25 }}>
            بند «ک» ماده ۲
            <br />
            <span style={{ color: '#38BDF8' }}>آیین‌نامه ارتقای اعضای هیئت علمی</span>
          </h1>

          <p style={{ fontSize: 24, color: '#94A3B8', marginTop: 18, fontWeight: 500, lineHeight: 1.6 }}>
            مصوب شورای هدایت استعدادهای درخشان و وزارت بهداشت، درمان و آموزش پزشکی
            جهت حمایت از پژوهشگران و فناوران برجسته.
          </p>
        </div>

        {/* Left Zone: Actor A (Monumental Numeral «۲» with Impact Rebound) */}
        <div
          style={{
            flex: 0.8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: frame >= NUMERAL_STRIKE_FRAME ? impactRipple.primaryOpacity : 0.4,
            transform: `translateY(${impactRipple.primaryY}px)`,
          }}
        >
          <div
            style={{
              width: 220,
              height: 280,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(8, 16, 34, 0.7)',
              border: '2px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 0 35px rgba(56, 189, 248, 0.2)',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontSize: 240,
                fontWeight: 900,
                color: '#38BDF8',
                lineHeight: 1,
                userSelect: 'none',
                textShadow: '0 0 40px rgba(56, 189, 248, 0.45)',
              }}
            >
              ۲
            </span>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#38BDF8',
              letterSpacing: '2px',
              marginTop: 14,
              fontFamily: 'monospace',
            }}
          >
            ARTICLE 02 • MATEH 2
          </span>
        </div>
      </div>
    </div>
  );
};
