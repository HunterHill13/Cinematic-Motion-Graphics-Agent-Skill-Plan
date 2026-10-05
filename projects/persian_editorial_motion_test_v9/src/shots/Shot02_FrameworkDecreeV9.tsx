import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import {
  calculateKineticEntry,
  calculateImpactReaction,
  calculateShockwave,
  calculateSecondaryFollower,
} from '../motion/reactions/reactionEngine';
import { AmbientGrid } from '../motion/ambient/AmbientGrid';
import { TravelingMotif, MultiSparkCluster } from '../motion/actors/TravelingMotif';
import {
  CoordinateBrackets,
  ConnectorTrack,
  OrbitingNode,
  ImpactShockwave,
} from '../motion/actors/SecondaryActors';

/**
 * SHOT 02 — THE STATUTORY DECREE (SECTION KAF, ARTICLE 2)
 * V9 Multi-Actor Choreography:
 * - Inherits incoming momentum from Shot 01 wipe.
 * - Traveling Motif enters from right void, strikes Numeral «۲» at frame 45,
 *   triggering impact rebound, headline vibration, and radial shockwave.
 * - Orbits Numeral «۲» during 120-frame legal stillness hold.
 * - Handoff: Splits into 3 daughter sparks targeting Shot 03 criteria.
 */
export const Shot02_FrameworkDecreeV9: React.FC = () => {
  const frame = useCurrentFrame();

  // Primary Entrance (0 - 45f)
  const incomingMomentum = interpolate(frame, [0, 30], [280, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const numeralEntry = calculateKineticEntry(frame, 5, 35, 60);
  const headlineEntry = calculateKineticEntry(frame, 20, 30, 35);

  // Reaction: Impact Rebound at frame 45 when Traveling Spark strikes
  const impactRebound = calculateImpactReaction(frame, 45, 7, 0.45, 0.18, 20);
  const shockwave = calculateShockwave(frame, 45, 210, 26);
  const headlineReaction = frame >= 45 && frame <= 60 ? -4 * Math.sin(((frame - 45) / 15) * Math.PI) : 0;
  const followerBrackets = calculateSecondaryFollower(frame, 45, 5, 20, 18);

  // Traveling Motif Trajectory (Local Frames 0 - 300f):
  // 0 - 40f: Enters from right screen boundary (1920 -> 420)
  // 45f: Strikes Numeral «۲» apex at (420, 380)
  // 50 - 240f: Orbits Numeral «۲» in stable elliptical charge
  // 240 - 270f: Splits into 3 daughter sparks (α, β, γ) preparing Shot 03
  let sparkX = 420;
  let sparkY = 380;
  let sparkScale = 1.0;
  let sparkWake = 0;
  let isSplitting = false;

  if (frame < 45) {
    const t = frame / 45;
    sparkX = interpolate(t, [0, 1], [1980, 420], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
    sparkY = interpolate(t, [0, 1], [240, 380], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
    sparkWake = 36;
  } else if (frame < 240) {
    // Elliptical charge orbit around Numeral «۲»
    const orbitAngle = (frame - 45) * 0.04;
    sparkX = 420 + Math.cos(orbitAngle) * 90;
    sparkY = 520 + Math.sin(orbitAngle) * 70;
    sparkWake = 10;
  } else {
    isSplitting = true;
  }

  // Daughter sparks when splitting (240 - 270f)
  const splitProgress = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const daughterSparks = [
    // Spark α -> Criterion 1 (leftward dive)
    { id: 'alpha', x: interpolate(splitProgress, [0, 1], [420, 360]), y: interpolate(splitProgress, [0, 1], [520, 540]), color: '#38BDF8' },
    // Spark β -> Criterion 2 (center target)
    { id: 'beta', x: interpolate(splitProgress, [0, 1], [420, 960]), y: interpolate(splitProgress, [0, 1], [520, 540]), color: '#D4AF37' },
    // Spark γ -> Criterion 3 (rightward dive)
    { id: 'gamma', x: interpolate(splitProgress, [0, 1], [420, 1500]), y: interpolate(splitProgress, [0, 1], [520, 540]), color: '#10B981' },
  ];

  // Exit Handoff to Shot 03 (240 - 270f)
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

      {/* LAYER 1: Ambient Grid & Technical Metadata */}
      <AmbientGrid color="rgba(56, 189, 248, 0.05)" glowColor="rgba(56, 189, 248, 0.08)" />

      {/* LAYER 2: Editorial Datum Rule (Actor B) */}
      <div
        style={{
          position: 'absolute',
          bottom: 220,
          left: 140,
          right: 140,
          height: 2,
          backgroundColor: '#38BDF8',
          boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
          opacity: exitOp,
        }}
      />

      {/* LAYER 3: The Traveling Motif (Single or Daughter Split) */}
      {!isSplitting ? (
        <TravelingMotif
          x={sparkX}
          y={sparkY}
          scale={sparkScale}
          color="#38BDF8"
          glowColor="rgba(56, 189, 248, 0.7)"
          wakeLength={sparkWake}
          wakeAngle={180}
        />
      ) : (
        <MultiSparkCluster sparks={daughterSparks} />
      )}

      {/* LAYER 4: Secondary Actors */}
      {/* Radial Impact Shockwave on Numeral Strike */}
      <ImpactShockwave
        centerX={420}
        centerY={380}
        radius={shockwave.radius}
        opacity={shockwave.opacity}
        color="#38BDF8"
        strokeWidth={shockwave.strokeWidth}
      />

      {/* Secondary Orbiting Satellite */}
      <OrbitingNode
        centerX={420}
        centerY={520}
        radiusX={130}
        radiusY={110}
        speed={0.035}
        color="#38BDF8"
        opacity={frame >= 45 && frame < 240 ? 0.8 : 0}
      />

      {/* Coordinate Brackets Framing Numeral «۲» */}
      <CoordinateBrackets
        x={420}
        y={520}
        width={220}
        height={280}
        bracketSize={24}
        color="rgba(56, 189, 248, 0.5)"
        opacity={followerBrackets.opacity * exitOp}
        scale={1.0}
      />

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
            transform: `translateX(${incomingMomentum}px) translateY(${headlineReaction}px)`,
            opacity: headlineEntry.opacity,
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

        {/* Left Zone: Actor C (Monumental Numeral «۲» with Impact Rebound) */}
        <div
          style={{
            flex: 0.8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: numeralEntry.opacity,
            transform: `translateY(${impactRebound}px)`,
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
