import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import {
  calculateKineticEntry,
  calculateScalePunch,
  calculateImpactReaction,
  calculateShockwave,
  calculateSecondaryFollower,
} from '../motion/reactions/reactionEngine';
import { AmbientGrid } from '../motion/ambient/AmbientGrid';
import { TravelingMotif } from '../motion/actors/TravelingMotif';
import {
  CoordinateBrackets,
  ConnectorTrack,
  OrbitingNode,
  ImpactShockwave,
} from '../motion/actors/SecondaryActors';

/**
 * SHOT 01 — THE INSTITUTIONAL HOOK & QUESTION
 * V9 Multi-Actor Choreography:
 * - Layer 1: AmbientGrid with 240px Cartesian coordinate grid & registration ticks
 * - Layer 2: Editorial Datum Rule (Actor B) with physical baseline dip reaction
 * - Layer 3: Traveling Motif (Actor M) emerges from Crest jewel, glides along datum,
 *   strikes keyword at frame 210, and accelerates off-screen left at frame 350
 * - Layer 4: Secondary Actors (Coordinate Brackets, Orbiting Nodes, Connector Tracks, Shockwaves)
 * - Layer 5: Primary Actors (Actor A Crest & Keyword Monolith)
 * - Layer 6: Typographic Sculpture (Verbatim Persian script with Swiss scale contrast)
 */
export const Shot01_IntroHookV9: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Institutional Monolith (0 - 150f)
  const crestEntry = calculateKineticEntry(frame, 0, 35, 30);
  const titleEntry = calculateKineticEntry(frame, 15, 30, 25);

  // Phase 2: Question Hook & Golden Keyword (150 - 350f)
  const questionEntry = calculateKineticEntry(frame, 150, 30, 30);
  const keyPhraseScale = calculateScalePunch(frame, 210, 1.08, 14);

  // Reactions: Baseline dip and radial shockwave upon frame 210 strike
  const baselineDip = calculateImpactReaction(frame, 210, 5, 0.45, 0.2, 16);
  const shockwave = calculateShockwave(frame, 210, 190, 26);
  const followerBrackets = calculateSecondaryFollower(frame, 210, 4, 18, 15);

  // Traveling Motif Trajectory:
  // 15 - 45f: Emerges from Crest (1420, 420) and drops to datum (1420, 680)
  // 45 - 150f: Glides horizontally along datum (1420 -> 960)
  // 150 - 210f: Moves to strike position above keyword (960 -> 720, y: 680 -> 610)
  // 210 - 350f: Vibrates in place with radiant aura on keyword
  // 350 - 380f: Accelerates off-screen left (720 -> -150)
  let sparkX = 1420;
  let sparkY = 420;
  let sparkScale = 1.0;
  let sparkOpacity = 1.0;
  let sparkWake = 12;

  if (frame < 15) {
    sparkOpacity = 0;
  } else if (frame < 45) {
    const t = (frame - 15) / 30;
    sparkY = interpolate(t, [0, 1], [420, 680], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
    sparkWake = 16;
  } else if (frame < 150) {
    const t = (frame - 45) / 105;
    sparkX = interpolate(t, [0, 1], [1420, 960], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
    sparkY = 680;
    sparkWake = 20;
  } else if (frame < 210) {
    const t = (frame - 150) / 60;
    sparkX = interpolate(t, [0, 1], [960, 720], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
    sparkY = interpolate(t, [0, 1], [680, 610], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
    sparkWake = 24;
  } else if (frame < 350) {
    sparkX = 720;
    sparkY = 610;
    sparkScale = keyPhraseScale;
    sparkWake = 0;
  } else {
    // 350 - 380f: Accelerate off-screen left
    const t = (frame - 350) / 30;
    sparkX = interpolate(t, [0, 1], [720, -180], { easing: Easing.bezier(0.4, 0, 0.2, 1) });
    sparkY = 610;
    sparkWake = 48;
  }

  // Phase Transition Handoff (350 - 380f)
  // Datum line accelerates leftward, wiping text into the left void
  const exitProgress = interpolate(frame, [350, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const exitShiftX = interpolate(exitProgress, [0, 1], [0, -1920]);
  const exitOp = interpolate(exitProgress, [0, 0.7], [1, 0], { extrapolateRight: 'clamp' });

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
          background: 'radial-gradient(circle at 75% 45%, rgba(212, 175, 55, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* LAYER 1: Ambient Grid & Registration Marks */}
      <AmbientGrid color="rgba(212, 175, 55, 0.05)" glowColor="rgba(212, 175, 55, 0.08)" />

      {/* LAYER 2: Editorial Datum Rule (Actor B) with Impact Dip Reaction */}
      <div
        style={{
          position: 'absolute',
          top: 680 + baselineDip,
          left: 140,
          right: 140,
          height: 2,
          backgroundColor: '#D4AF37',
          boxShadow: '0 0 16px rgba(212, 175, 55, 0.5)',
          transform: `translateX(${exitShiftX}px)`,
          opacity: exitOp,
        }}
      >
        {/* Localized baseline glow beneath the traveling spark */}
        <div
          style={{
            position: 'absolute',
            left: Math.max(0, sparkX - 140 - 60),
            top: -2,
            width: 120,
            height: 6,
            background: 'radial-gradient(ellipse at 50% 50%, #FFFFFF 0%, #D4AF37 50%, transparent 100%)',
            filter: 'blur(2px)',
            opacity: frame >= 45 && frame < 350 ? 0.9 : 0,
          }}
        />
      </div>

      {/* LAYER 3: The Traveling Motif (Actor M) */}
      <TravelingMotif
        x={sparkX}
        y={sparkY}
        scale={sparkScale}
        color="#D4AF37"
        glowColor="rgba(212, 175, 55, 0.7)"
        opacity={sparkOpacity}
        wakeLength={sparkWake}
        wakeAngle={180}
      />

      {/* LAYER 4: Secondary Actors */}
      {/* Orbiting Satellite around Crest */}
      <OrbitingNode
        centerX={1420}
        centerY={420}
        radiusX={115}
        radiusY={115}
        speed={0.03}
        color="#D4AF37"
        opacity={frame < 150 ? 0.75 : 0}
      />

      {/* Connector Track from Crest to Datum Line */}
      {frame >= 25 && frame < 150 && (
        <ConnectorTrack
          startX={1420}
          startY={535}
          endX={1420}
          endY={680}
          color="rgba(212, 175, 55, 0.3)"
          dashed={true}
        />
      )}

      {/* Radial Shockwave on Key Phrase Strike */}
      <ImpactShockwave
        centerX={720}
        centerY={610}
        radius={shockwave.radius}
        opacity={shockwave.opacity}
        color="#D4AF37"
        strokeWidth={shockwave.strokeWidth}
      />

      {/* Coordinate Brackets Framing Keyword Monolith */}
      {frame >= 200 && (
        <CoordinateBrackets
          x={720}
          y={610}
          width={640}
          height={110}
          bracketSize={20}
          color="rgba(212, 175, 55, 0.6)"
          opacity={followerBrackets.opacity * exitOp}
          scale={keyPhraseScale}
        />
      )}

      {/* LAYER 5 & 6: Primary Graphic Entities & Typographic Sculpture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 140px',
          direction: 'rtl',
          transform: `translateX(${exitShiftX}px)`,
          opacity: exitOp,
        }}
      >
        {/* Right Zone: Primary Headline & Question Monolith */}
        <div style={{ flex: 1.4, maxWidth: 1050 }}>
          {/* Eyebrow Context */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
              opacity: titleEntry.opacity,
              transform: titleEntry.transform,
            }}
          >
            <div style={{ width: 10, height: 10, backgroundColor: '#D4AF37' }} />
            <span style={{ fontSize: 16, fontWeight: 800, color: '#D4AF37', letterSpacing: '1px' }}>
              OFFICIAL BROADCAST • کمیته تحقیقات و فناوری
            </span>
            <span style={{ fontSize: 13, color: 'rgba(148, 163, 184, 0.5)', fontFamily: 'monospace' }}>
              [BMSU-RES-2026]
            </span>
          </div>

          {frame < 150 ? (
            /* Part A: Institutional Title */
            <div style={{ opacity: titleEntry.opacity, transform: titleEntry.transform }}>
              <h1 style={{ fontSize: 60, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.25 }}>
                دانشگاه علوم پزشکی
                <br />
                <span style={{ color: '#D4AF37' }}>بقیة‌الله (عج)</span>
              </h1>
              <p style={{ fontSize: 24, color: '#94A3B8', marginTop: 14, fontWeight: 500 }}>
                روابط عمومی کمیته تحقیقات و فناوری دانشجویی تقدیم می‌کند
              </p>
            </div>
          ) : (
            /* Part B: Question Hook & Golden Keyword */
            <div style={{ opacity: questionEntry.opacity, transform: questionEntry.transform }}>
              <h2 style={{ fontSize: 44, fontWeight: 800, color: '#F8FAFC', margin: 0, lineHeight: 1.3 }}>
                آیا می‌دانید چگونه می‌توانید معرفی شوید...
              </h2>
              <div
                style={{
                  marginTop: 20,
                  transform: `scale(${keyPhraseScale})`,
                  transformOrigin: 'right center',
                  display: 'inline-block',
                }}
              >
                <span
                  style={{
                    fontSize: 58,
                    fontWeight: 900,
                    color: '#D4AF37',
                    lineHeight: 1.2,
                    textShadow: '0 0 32px rgba(212, 175, 55, 0.45)',
                  }}
                >
                  به عنوان دانشجوی پژوهشگر برجسته؟
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Left Zone: Actor A (University PR Crest) */}
        <div
          style={{
            opacity: crestEntry.opacity * (frame < 150 ? 1 : Math.max(0, 1 - (frame - 150) / 25)),
            transform: `${crestEntry.transform} scale(${frame < 150 ? 1 : 0.95})`,
            marginLeft: 40,
            position: 'relative',
          }}
        >
          <svg width={230} height={230} viewBox="0 0 200 200">
            <circle cx={100} cy={100} r={92} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth={1.5} />
            <circle cx={100} cy={100} r={80} fill="rgba(8, 16, 34, 0.85)" stroke="#D4AF37" strokeWidth={3} />
            <circle cx={100} cy={100} r={65} fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeDasharray="6 4" strokeWidth={1} />
            <path
              d="M 100 45 C 118 62 130 85 100 120 C 70 85 82 62 100 45 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth={3}
            />
            {/* Center Jewel */}
            <circle cx={100} cy={100} r={8} fill="#10B981" />
          </svg>
        </div>
      </div>
    </div>
  );
};
