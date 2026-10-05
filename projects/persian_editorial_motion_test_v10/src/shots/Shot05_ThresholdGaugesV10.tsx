import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { getLocalAcousticTrigger } from '../motion/timing/voiceSync';
import {
  calculateImpactAndRipple,
  calculateGravitationalConvergence,
  calculateRevealAndEscalate,
} from '../motion/recipes';
import { AmbientGridV10 } from '../motion/ambient/AmbientGridV10';
import { TravelingMotifV10 } from '../motion/actors/TravelingMotifV10';
import {
  CoordinateBrackets,
  ShockwaveRing,
} from '../motion/actors/SecondaryActorsV10';

/**
 * SHOT 05 — THE THRESHOLD BENCHMARKS (ASCENDING MONUMENTS)
 * - Duration: 485 frames (local 0 - 485f / global 1700 - 2185f)
 * - Deterministic acoustic synchronization:
 *   1. Tier 1 (65 Points) strike at local frame 214 (global 1914) on spoken «شصت و پنج»
 *   2. Tier 2 (110 Points) strike at local frame 310 (global 2010) on spoken «صد و ده»
 *   3. Tier 3 (130 Points) strike at local frame 400 (global 2100) on spoken «صد و سی»
 * - Standardized Recipe: ImpactAndRipple & GravitationalConvergence
 * - Handoff: Gravitational pull inwards to (960, 540) detonating into Shot 06 crest
 */
export const Shot05_ThresholdGaugesV10: React.FC = () => {
  const frame = useCurrentFrame();

  const TIER1_STRIKE_FRAME = getLocalAcousticTrigger('shot05', 'shot05_tier1_65_strike'); // 214
  const TIER2_STRIKE_FRAME = getLocalAcousticTrigger('shot05', 'shot05_tier2_110_strike'); // 310
  const TIER3_STRIKE_FRAME = getLocalAcousticTrigger('shot05', 'shot05_tier3_130_strike'); // 400

  const headerReveal = calculateRevealAndEscalate(frame, 15, 0, 0, {
    baselineDuration: 25,
    textDuration: 28,
  });

  // Recipe 02: Sequential Pillar Impacts & Harmonic Rebounds
  const t1Impact = calculateImpactAndRipple(frame, TIER1_STRIKE_FRAME, {
    entryDuration: 24,
    reboundAmplitude: 7,
    shockwaveMaxRadius: 180,
    shockwaveDuration: 24,
    followerDelay: 4,
  });

  const t2Impact = calculateImpactAndRipple(frame, TIER2_STRIKE_FRAME, {
    entryDuration: 24,
    reboundAmplitude: 7,
    shockwaveMaxRadius: 190,
    shockwaveDuration: 24,
    followerDelay: 4,
  });

  const t3Impact = calculateImpactAndRipple(frame, TIER3_STRIKE_FRAME, {
    entryDuration: 24,
    reboundAmplitude: 8,
    shockwaveMaxRadius: 210,
    shockwaveDuration: 24,
    followerDelay: 4,
  });

  // Subtle breathing hold (405 - 455f)
  const breathingScale = frame >= 405 && frame <= 455
    ? 1.0 + 0.005 * Math.sin(((frame - 405) / 50) * Math.PI * 2)
    : 1.0;

  // Recipe 06: Gravitational Convergence (455 - 485f)
  const convergence = calculateGravitationalConvergence(
    frame,
    455,
    485,
    { x: 960, y: 540 },
    [
      { x: 360, y: 720 },
      { x: 960, y: 720 },
      { x: 1560, y: 720 },
    ]
  );

  const exitOp = interpolate(frame, [455, 480], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Traveling Motif Trajectory:
  // Baseline igniter moving along floor datum:
  // 0 - 214f: Moves towards Pillar 1 anchor (140 -> 360, y: 940)
  // 214 - 310f: Moves towards Pillar 2 anchor (360 -> 960, y: 940)
  // 310 - 400f: Moves towards Pillar 3 anchor (960 -> 1560, y: 940)
  // 400 - 455f: Sits at center baseline (960, 940)
  // 455 - 485f: Attractor moves to center (960, 540) with growing singularity glow
  let sparkX = 960;
  let sparkY = 940;
  let sparkColor = '#38BDF8';
  let sparkScale = 1.0;

  if (frame < TIER1_STRIKE_FRAME) {
    sparkX = interpolate(frame, [0, TIER1_STRIKE_FRAME], [140, 360]);
    sparkColor = '#38BDF8';
  } else if (frame < TIER2_STRIKE_FRAME) {
    sparkX = interpolate(frame, [TIER1_STRIKE_FRAME, TIER2_STRIKE_FRAME], [360, 960]);
    sparkColor = '#D4AF37';
  } else if (frame < TIER3_STRIKE_FRAME) {
    sparkX = interpolate(frame, [TIER2_STRIKE_FRAME, TIER3_STRIKE_FRAME], [960, 1560]);
    sparkColor = '#10B981';
  } else if (frame < 455) {
    sparkX = 960;
    sparkY = 940;
    sparkColor = '#D4AF37';
  } else {
    sparkX = 960;
    sparkY = interpolate(frame, [455, 485], [940, 540]);
    sparkColor = '#D4AF37';
    sparkScale = interpolate(frame, [455, 485], [1.0, 2.0]);
  }

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
          background: 'radial-gradient(ellipse at 50% 60%, rgba(56, 189, 248, 0.06) 0%, transparent 65%)',
        }}
      />

      {/* LAYER 1: Ambient Grid & Registration Marks (Role D) */}
      <AmbientGridV10 color="rgba(56, 189, 248, 0.05)" glowColor="rgba(56, 189, 248, 0.08)" />

      {/* LAYER 2: Persistent Baseline Datum (Role B) */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: '50%',
          transform: 'translateX(-50%)',
          width: interpolate(frame, [455, 485], [1600, 20], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          height: 2,
          backgroundColor: '#38BDF8',
          boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
          opacity: exitOp,
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 3: The Traveling Motif (Attractor Mode during convergence) */}
      <TravelingMotifV10
        x={sparkX}
        y={sparkY}
        scale={sparkScale}
        color={sparkColor}
        glowColor={sparkColor}
        opacity={1.0}
        wakeLength={frame >= 455 ? 0 : 16}
        morphMode={frame >= 455 ? 'attractor' : 'spark'}
      />

      {/* High-Density Singularity Glow at (960, 540) */}
      {convergence.centerGlow > 0 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#D4AF37',
            boxShadow: '0 0 40px #D4AF37, 0 0 80px rgba(212, 175, 55, 0.85)',
            opacity: convergence.centerGlow,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* LAYER 4: Secondary Actors & Shockwaves */}
      {/* Tier 1 Shockwave & Brackets */}
      {frame >= TIER1_STRIKE_FRAME && (
        <>
          <ShockwaveRing
            x={360}
            y={720}
            radius={t1Impact.shockwave.radius}
            opacity={t1Impact.shockwave.opacity}
            color="#38BDF8"
            strokeWidth={t1Impact.shockwave.strokeWidth}
          />
          <CoordinateBrackets
            x={360}
            y={720 + t1Impact.follower.y}
            width={380}
            height={240}
            bracketSize={20}
            color="rgba(56, 189, 248, 0.45)"
            opacity={t1Impact.follower.opacity * exitOp}
            scale={t1Impact.follower.scale}
          />
        </>
      )}

      {/* Tier 2 Shockwave & Brackets */}
      {frame >= TIER2_STRIKE_FRAME && (
        <>
          <ShockwaveRing
            x={960}
            y={720}
            radius={t2Impact.shockwave.radius}
            opacity={t2Impact.shockwave.opacity}
            color="#D4AF37"
            strokeWidth={t2Impact.shockwave.strokeWidth}
          />
          <CoordinateBrackets
            x={960}
            y={720 + t2Impact.follower.y}
            width={380}
            height={240}
            bracketSize={20}
            color="rgba(212, 175, 55, 0.45)"
            opacity={t2Impact.follower.opacity * exitOp}
            scale={t2Impact.follower.scale}
          />
        </>
      )}

      {/* Tier 3 Shockwave & Brackets */}
      {frame >= TIER3_STRIKE_FRAME && (
        <>
          <ShockwaveRing
            x={1560}
            y={720}
            radius={t3Impact.shockwave.radius}
            opacity={t3Impact.shockwave.opacity}
            color="#10B981"
            strokeWidth={t3Impact.shockwave.strokeWidth}
          />
          <CoordinateBrackets
            x={1560}
            y={720 + t3Impact.follower.y}
            width={380}
            height={240}
            bracketSize={20}
            color="rgba(16, 185, 129, 0.45)"
            opacity={t3Impact.follower.opacity * exitOp}
            scale={t3Impact.follower.scale}
          />
        </>
      )}

      {/* LAYER 5 & 6: Primary Typography & Content Monolith */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 140px',
          direction: 'rtl',
          opacity: headerReveal.contentOpacity * exitOp,
          transform: `scale(${breathingScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* Header Block */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, backgroundColor: '#38BDF8' }} />
            <span style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', letterSpacing: '1.5px' }}>
              MINIMUM THRESHOLDS • حدنصاب‌های مصوب
            </span>
            <span style={{ fontSize: 13, color: 'rgba(148, 163, 184, 0.5)', fontFamily: 'monospace' }}>
              [BMN-SCORE-TIERS]
            </span>
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
            کف امتیازهای لازم برای هر مقطع تحصیلی
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
            ارقام رسمی اعلام‌شده در شیوه‌نامه اجرایی بنیاد ملی نخبگان
          </p>
        </div>

        {/* 3 Ascending Typographic Monoliths with Continuous Lineage */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 40,
            marginBottom: 20,
            position: 'relative',
          }}
        >
          {/* TIER 1: Bachelor's (65 Points) — Acoustic Strike Frame 214 */}
          <div
            style={{
              flex: 1,
              transform: `scale(${frame >= TIER1_STRIKE_FRAME ? t1Impact.primaryScale : 0.95}) translateY(${t1Impact.primaryY}px)`,
              opacity: frame >= TIER1_STRIKE_FRAME - 24 ? t1Impact.primaryOpacity : 0.3,
              borderTop: '2px solid rgba(56, 189, 248, 0.35)',
              paddingTop: 24,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
              TIER 01 • کارشناسی تیپ ۱
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 12, direction: 'ltr' }}>
              <span
                style={{
                  fontSize: 140,
                  fontWeight: 900,
                  color: '#38BDF8',
                  lineHeight: 0.8,
                  letterSpacing: '-5px',
                  textShadow: '0 0 40px rgba(56, 189, 248, 0.35)',
                }}
              >
                65
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#94A3B8', marginLeft: 12 }}>امتیاز</span>
            </div>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 12, display: 'block' }}>
              دانشگاه‌های علوم پزشکی تیپ یک
            </span>
          </div>

          {/* TIER 2: General Medicine (110 Points) — Acoustic Strike Frame 310 */}
          <div
            style={{
              flex: 1,
              transform: `scale(${frame >= TIER2_STRIKE_FRAME ? t2Impact.primaryScale : 0.95}) translateY(${t2Impact.primaryY}px)`,
              opacity: frame >= TIER2_STRIKE_FRAME - 24 ? t2Impact.primaryOpacity : 0.3,
              borderTop: '2px solid rgba(212, 175, 55, 0.45)',
              paddingTop: 24,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#D4AF37', letterSpacing: '1px' }}>
              TIER 02 • پزشکی، دندان، داروسازی
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 12, direction: 'ltr' }}>
              <span
                style={{
                  fontSize: 155,
                  fontWeight: 900,
                  color: '#D4AF37',
                  lineHeight: 0.8,
                  letterSpacing: '-5px',
                  textShadow: '0 0 40px rgba(212, 175, 55, 0.35)',
                }}
              >
                110
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#94A3B8', marginLeft: 12 }}>امتیاز</span>
            </div>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 12, display: 'block' }}>
              دکتری حرفه‌ای و پزشکی عمومی
            </span>
          </div>

          {/* TIER 3: Ph.D. / Specialty (130 Points) — Acoustic Strike Frame 400 */}
          <div
            style={{
              flex: 1,
              transform: `scale(${frame >= TIER3_STRIKE_FRAME ? t3Impact.primaryScale : 0.95}) translateY(${t3Impact.primaryY}px)`,
              opacity: frame >= TIER3_STRIKE_FRAME - 24 ? t3Impact.primaryOpacity : 0.3,
              borderTop: '2px solid rgba(16, 185, 129, 0.45)',
              paddingTop: 24,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#10B981', letterSpacing: '1px' }}>
              TIER 03 • دکتری تخصصی و فلوشیپ
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 12, direction: 'ltr' }}>
              <span
                style={{
                  fontSize: 175,
                  fontWeight: 900,
                  color: '#10B981',
                  lineHeight: 0.8,
                  letterSpacing: '-6px',
                  textShadow: '0 0 50px rgba(16, 185, 129, 0.4)',
                }}
              >
                130
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#94A3B8', marginLeft: 12 }}>امتیاز</span>
            </div>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 12, display: 'block' }}>
              Ph.D، دستیاری و فوق‌تخصص
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
