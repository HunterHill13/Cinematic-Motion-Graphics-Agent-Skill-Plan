import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { getLocalAcousticTrigger } from '../motion/timing/voiceSync';
import {
  calculateImpactAndRipple,
  calculateTravelAndHandoff,
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
 * SHOT 01 — THE INSTITUTIONAL HOOK & QUESTION (V10 MOTION SYSTEM)
 * - Duration: 380 frames (0 - 380f)
 * - Frame-accurate keyword strike at acoustic frame 234 («دانشجوی پژوهشگر برجسته»)
 * - Standardized Recipe: ImpactAndRipple & TravelAndHandoff
 * - Unbroken kinetic handoff at frame 350-380 to Shot 02
 */
export const Shot01_IntroHookV10: React.FC = () => {
  const frame = useCurrentFrame();

  const KEYWORD_STRIKE_FRAME = getLocalAcousticTrigger(
    'shot01',
    'shot01_researcher_keyword_strike'
  ); // 234

  // Phase 1: University PR Crest & Title reveal (0 - 150f)
  const introReveal = calculateRevealAndEscalate(frame, 0, 0, 0, {
    baselineDuration: 25,
    textDuration: 28,
    textOffset: 25,
  });

  // Phase 2: Question Hook & Golden Keyword (150 - 350f)
  const questionReveal = calculateRevealAndEscalate(frame, 150, 0, 0, {
    baselineDuration: 20,
    textDuration: 24,
    textOffset: 30,
  });

  // Standardized Recipe 02: Impact and Ripple at frame 234
  const impactRipple = calculateImpactAndRipple(frame, KEYWORD_STRIKE_FRAME, {
    entryDuration: 20,
    reboundAmplitude: 6,
    shockwaveMaxRadius: 180,
    shockwaveDuration: 24,
    followerDelay: 4,
  });

  // Traveling Motif Trajectory (Recipe 01: Travel and Handoff across narrative beats):
  // 15 - 45f: Emerges from Crest (1420, 420) down to datum line (1420, 680)
  // 45 - 150f: Glides horizontally along datum (1420 -> 960)
  // 150 - 234f: Rises and targets keyword baseline (960 -> 720, y: 680 -> 610)
  // 234 - 350f: Strikes keyword, creates shockwave & bracket lock
  // 350 - 380f: Accelerates off-screen towards center stage of Shot 02 (Recipe 01 Handoff)
  let sparkX = 1420;
  let sparkY = 420;
  let sparkScale = 1.0;
  let sparkOpacity = 1.0;
  let sparkWake = 0;
  let wakeAngle = 180;

  if (frame < 15) {
    sparkOpacity = 0;
  } else if (frame < 45) {
    const travel = calculateTravelAndHandoff(frame, 15, 45, { x: 1420, y: 420 }, { x: 1420, y: 680 });
    sparkX = travel.x;
    sparkY = travel.y;
    sparkScale = travel.scale;
    sparkOpacity = travel.opacity;
    sparkWake = travel.wakeLength;
    wakeAngle = 90; // moving downwards
  } else if (frame < 150) {
    const travel = calculateTravelAndHandoff(frame, 45, 150, { x: 1420, y: 680 }, { x: 960, y: 680 });
    sparkX = travel.x;
    sparkY = travel.y;
    sparkScale = travel.scale;
    sparkOpacity = travel.opacity;
    sparkWake = travel.wakeLength;
    wakeAngle = 0; // moving leftwards (RTL)
  } else if (frame < KEYWORD_STRIKE_FRAME) {
    const travel = calculateTravelAndHandoff(
      frame,
      150,
      KEYWORD_STRIKE_FRAME,
      { x: 960, y: 680 },
      { x: 720, y: 610 }
    );
    sparkX = travel.x;
    sparkY = travel.y;
    sparkScale = travel.scale;
    sparkOpacity = travel.opacity;
    sparkWake = travel.wakeLength;
    wakeAngle = 330;
  } else if (frame < 350) {
    sparkX = 720;
    sparkY = 610 + impactRipple.primaryY;
    sparkScale = impactRipple.primaryScale;
    sparkOpacity = 1.0;
    sparkWake = 0;
  } else {
    // 350 - 380f: Accelerate leftward for Shot 02 handoff
    const travel = calculateTravelAndHandoff(frame, 350, 380, { x: 720, y: 610 }, { x: -160, y: 610 }, {
      maxWake: 48,
    });
    sparkX = travel.x;
    sparkY = travel.y;
    sparkScale = travel.scale;
    sparkOpacity = travel.opacity;
    sparkWake = travel.wakeLength;
    wakeAngle = 0;
  }

  // Phase Transition Handoff (350 - 380f)
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

      {/* LAYER 1: Ambient Grid & Registration Marks (Role D) */}
      <AmbientGridV10 color="rgba(212, 175, 55, 0.05)" glowColor="rgba(212, 175, 55, 0.08)" />

      {/* LAYER 2: Editorial Datum Rule (Role B) with Physical Baseline Dip Reaction */}
      <div
        style={{
          position: 'absolute',
          top: 680 + impactRipple.baselineDisplacement,
          left: 140,
          right: 140,
          height: 2,
          backgroundColor: '#D4AF37',
          boxShadow: '0 0 16px rgba(212, 175, 55, 0.5)',
          transform: `translateX(${exitShiftX}px)`,
          opacity: exitOp,
        }}
      >
        {/* Localized baseline glow beneath the traveling motif */}
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

      {/* LAYER 3: The Traveling Motif (Role B — Motion Connector) */}
      <TravelingMotifV10
        x={sparkX}
        y={sparkY}
        scale={sparkScale}
        color="#D4AF37"
        glowColor="rgba(212, 175, 55, 0.7)"
        opacity={sparkOpacity}
        wakeLength={sparkWake}
        wakeAngle={wakeAngle}
        morphMode="spark"
      />

      {/* LAYER 4: Secondary Actors (Role C / D) */}
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

      {/* Radial Shockwave Ring on Frame 234 Keyword Strike */}
      <ShockwaveRing
        x={720}
        y={610}
        radius={impactRipple.shockwave.radius}
        opacity={impactRipple.shockwave.opacity}
        color="#D4AF37"
        strokeWidth={impactRipple.shockwave.strokeWidth}
      />

      {/* Coordinate Brackets Framing Keyword Monolith */}
      {frame >= KEYWORD_STRIKE_FRAME && (
        <CoordinateBrackets
          x={720}
          y={610 + impactRipple.follower.y}
          width={640}
          height={110}
          bracketSize={20}
          color="rgba(212, 175, 55, 0.6)"
          opacity={impactRipple.follower.opacity * exitOp}
          scale={impactRipple.follower.scale}
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
              opacity: introReveal.contentOpacity,
              transform: `translateY(${introReveal.contentY}px)`,
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
            <div
              style={{
                opacity: introReveal.contentOpacity,
                transform: `translateY(${introReveal.contentY}px)`,
              }}
            >
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
            /* Part B: Question Hook & Golden Keyword (Acoustic Strike at Frame 234) */
            <div
              style={{
                opacity: questionReveal.contentOpacity,
                transform: `translateY(${questionReveal.contentY}px)`,
              }}
            >
              <h2 style={{ fontSize: 44, fontWeight: 800, color: '#F8FAFC', margin: 0, lineHeight: 1.3 }}>
                آیا می‌دانید چگونه می‌توانید معرفی شوید...
              </h2>
              <div
                style={{
                  marginTop: 20,
                  transform: `scale(${frame >= KEYWORD_STRIKE_FRAME ? impactRipple.primaryScale : 1.0})`,
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
            opacity: introReveal.contentOpacity * (frame < 150 ? 1 : Math.max(0, 1 - (frame - 150) / 25)),
            transform: `translateY(${introReveal.contentY}px) scale(${frame < 150 ? 1 : 0.95})`,
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
