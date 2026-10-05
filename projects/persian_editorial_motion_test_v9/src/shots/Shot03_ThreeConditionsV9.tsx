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
 * SHOT 03 — THE THREE INDISPENSABLE CONDITIONS
 * V9 Multi-Actor Choreography:
 * - Inherits 3 daughter sparks from Shot 02.
 * - Sequential Strikes:
 *   1. Spark α strikes Criterion 1 «16/20» at frame 40 (cyan punch & shockwave)
 *   2. Spark β strikes Criterion 2 Reticle Stamp at frame 250 (gold stamp impact)
 *   3. Spark γ strikes Criterion 3 «≥6» at frame 470 (emerald punch & 6 sequential dots)
 * - Handoff: The 3 sparks re-fuse into a single intense amber spark, pulling
 *   the horizontal datum rule 90° into the vertical Temporal Wall for Shot 04.
 */
export const Shot03_ThreeConditionsV9: React.FC = () => {
  const frame = useCurrentFrame();

  // Primary Entrance (0 - 30f)
  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // --- CRITERION 1: GPA >= 16 (0 - 230f) ---
  const c1Punch = calculateScalePunch(frame, 40, 1.08, 14);
  const c1Rebound = calculateImpactReaction(frame, 40, 6, 0.5, 0.2, 16);
  const c1Shockwave = calculateShockwave(frame, 40, 210, 26);
  const c1Follower = calculateSecondaryFollower(frame, 40, 4, 18, 15);
  const c1Op = interpolate(frame, [0, 20, 210, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- CRITERION 2: DISCIPLINARY STAMP (230 - 450f) ---
  const c2Punch = calculateScalePunch(frame, 250, 1.07, 14);
  const c2Shockwave = calculateShockwave(frame, 250, 230, 26);
  const c2Follower = calculateSecondaryFollower(frame, 250, 4, 18, 15);
  const c2Op = interpolate(frame, [230, 250, 430, 460], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stampRotation = interpolate(frame, [230, 260], [45, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // --- CRITERION 3: >= 6 ARTICLES (450 - 840f) ---
  const c3Punch = calculateScalePunch(frame, 470, 1.08, 14);
  const c3Shockwave = calculateShockwave(frame, 470, 220, 26);
  const c3Follower = calculateSecondaryFollower(frame, 470, 4, 18, 15);
  const c3Op = interpolate(frame, [450, 470, 820, 850], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spatial Recomposition Handoff to Shot 04 (840 - 870f)
  // Baseline rotates 90° into vertical temporal wall
  const rotationProgress = interpolate(frame, [840, 870], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const ruleRotation = interpolate(rotationProgress, [0, 1], [0, 90]);
  const ruleColor = rotationProgress > 0 ? '#F59E0B' : '#38BDF8';

  // Traveling Motif Trajectory:
  // Phase 1 (0 - 230f): Spark α active at (380, 540)
  // Phase 2 (230 - 450f): Spark β active at (960, 540)
  // Phase 3 (450 - 840f): Spark γ active at (1520, 540)
  // Phase 4 (840 - 870f): Fused spark climbs rotating baseline
  let sparkX = 380;
  let sparkY = 540;
  let sparkColor = '#38BDF8';
  let sparkScale = 1.0;

  if (frame < 230) {
    sparkX = 380;
    sparkY = 540 + c1Rebound;
    sparkScale = c1Punch;
    sparkColor = '#38BDF8';
  } else if (frame < 450) {
    sparkX = 960;
    sparkY = 540;
    sparkScale = c2Punch;
    sparkColor = '#D4AF37';
  } else if (frame < 840) {
    sparkX = 1520;
    sparkY = 540;
    sparkScale = c3Punch;
    sparkColor = '#10B981';
  } else {
    // Re-fused amber spark climbing rotating wall
    sparkX = interpolate(rotationProgress, [0, 1], [1520, 960]);
    sparkY = interpolate(rotationProgress, [0, 1], [540, 360]);
    sparkColor = '#F59E0B';
    sparkScale = 1.25;
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
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.06) 0%, transparent 65%)',
        }}
      />

      {/* LAYER 1: Ambient Grid & Registration Marks */}
      <AmbientGrid color="rgba(56, 189, 248, 0.05)" glowColor="rgba(56, 189, 248, 0.08)" />

      {/* LAYER 2: Rotating Editorial Datum Rule (Actor B) */}
      <div
        style={{
          position: 'absolute',
          top: 540,
          left: '50%',
          width: 1640,
          height: 2,
          backgroundColor: ruleColor,
          boxShadow: `0 0 20px ${ruleColor}`,
          transform: `translate(-50%, -50%) rotate(${ruleRotation}deg)`,
          transformOrigin: '50% 50%',
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 3: The Traveling Motif (Active Criterion Spark) */}
      <TravelingMotif
        x={sparkX}
        y={sparkY}
        scale={sparkScale}
        color={sparkColor}
        glowColor={sparkColor}
        opacity={entrance}
        wakeLength={rotationProgress > 0 ? 32 : 12}
      />

      {/* LAYER 4: Secondary Actors */}
      {/* Criterion 1 Shockwave & Secondary Satellite */}
      {c1Op > 0 && (
        <>
          <ImpactShockwave
            centerX={380}
            centerY={540}
            radius={c1Shockwave.radius}
            opacity={c1Shockwave.opacity}
            color="#38BDF8"
            strokeWidth={c1Shockwave.strokeWidth}
          />
          <OrbitingNode
            centerX={380}
            centerY={540}
            radiusX={130}
            radiusY={110}
            speed={0.035}
            color="#38BDF8"
            opacity={c1Op * 0.8}
          />
          <CoordinateBrackets
            x={380}
            y={540}
            width={240}
            height={240}
            bracketSize={22}
            color="rgba(56, 189, 248, 0.5)"
            opacity={c1Follower.opacity * c1Op}
            scale={c1Punch}
          />
        </>
      )}

      {/* Criterion 2 Shockwave & Secondary Brackets */}
      {c2Op > 0 && (
        <>
          <ImpactShockwave
            centerX={960}
            centerY={540}
            radius={c2Shockwave.radius}
            opacity={c2Shockwave.opacity}
            color="#D4AF37"
            strokeWidth={c2Shockwave.strokeWidth}
          />
          <CoordinateBrackets
            x={960}
            y={540}
            width={260}
            height={260}
            bracketSize={24}
            color="rgba(212, 175, 55, 0.6)"
            opacity={c2Follower.opacity * c2Op}
            scale={c2Punch}
          />
        </>
      )}

      {/* Criterion 3 Shockwave & Micro-Dots */}
      {c3Op > 0 && (
        <>
          <ImpactShockwave
            centerX={1520}
            centerY={540}
            radius={c3Shockwave.radius}
            opacity={c3Shockwave.opacity}
            color="#10B981"
            strokeWidth={c3Shockwave.strokeWidth}
          />
          <OrbitingNode
            centerX={1520}
            centerY={540}
            radiusX={120}
            radiusY={100}
            speed={0.04}
            color="#10B981"
            opacity={c3Op * 0.8}
          />
          <CoordinateBrackets
            x={1520}
            y={540}
            width={220}
            height={220}
            bracketSize={20}
            color="rgba(16, 185, 129, 0.5)"
            opacity={c3Follower.opacity * c3Op}
            scale={c3Punch}
          />
          {/* 6 Sequential Article Indicators along datum */}
          <div
            style={{
              position: 'absolute',
              bottom: 260,
              left: 140,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              opacity: c3Op,
            }}
          >
            {Array.from({ length: 6 }).map((_, idx) => {
              const dotActive = frame >= 470 + idx * 8;
              return (
                <div
                  key={`art-dot-${idx}`}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: dotActive ? '#10B981' : 'rgba(16, 185, 129, 0.2)',
                    boxShadow: dotActive ? '0 0 12px #10B981' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                />
              );
            })}
            <span style={{ fontSize: 14, color: '#10B981', fontWeight: 800, marginLeft: 8, fontFamily: 'monospace' }}>
              6 OF 6 ARTICLES CONFIRMED
            </span>
          </div>
        </>
      )}

      {/* LAYER 5 & 6: Primary Typography & Monumental Entities */}
      {/* Top Header Monolith (Shared Context) */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          right: 140,
          direction: 'rtl',
          opacity: entrance * (1 - rotationProgress),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 10, height: 10, backgroundColor: '#38BDF8' }} />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
            CRITERIA OVERVIEW • شروط سه‌گانه بنیاد ملی نخبگان
          </span>
        </div>
        <h1 style={{ fontSize: 50, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          سه شرط اصلی جهت واجد شرایط بودن
        </h1>
      </div>

      {/* CRITERION 1 STAGE: GPA 16 */}
      {c1Op > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 140px',
            direction: 'rtl',
            opacity: c1Op,
          }}
        >
          <div style={{ flex: 1.2, maxWidth: 900 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#38BDF8', letterSpacing: '2px' }}>
              CRITERION 01 • شرط اول
            </span>
            <h2 style={{ fontSize: 54, fontWeight: 900, color: '#F8FAFC', margin: '14px 0 0 0' }}>
              حداقل معدل کل ۱۶
            </h2>
            <p style={{ fontSize: 24, color: '#94A3B8', marginTop: 14, fontWeight: 500 }}>
              معدل کل نمرات تحصیلی فعلی باید حداقل ۱۶.۰۰ باشد
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              direction: 'ltr',
              transform: `scale(${c1Punch}) translateY(${c1Rebound}px)`,
              userSelect: 'none',
            }}
          >
            <span
              style={{
                fontSize: 220,
                fontWeight: 900,
                color: '#38BDF8',
                lineHeight: 0.8,
                letterSpacing: '-6px',
                textShadow: '0 0 50px rgba(56, 189, 248, 0.45)',
              }}
            >
              16
            </span>
            <span style={{ fontSize: 44, fontWeight: 800, color: '#94A3B8', marginLeft: 16 }}>/ 20</span>
          </div>
        </div>
      )}

      {/* CRITERION 2 STAGE: DISCIPLINARY STAMP */}
      {c2Op > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            direction: 'rtl',
            opacity: c2Op,
          }}
        >
          <div
            style={{
              transform: `scale(${c2Punch}) rotate(${stampRotation}deg)`,
              marginBottom: 30,
              position: 'relative',
            }}
          >
            <svg width={220} height={220} viewBox="0 0 200 200">
              <circle cx={100} cy={100} r={90} fill="none" stroke="rgba(212, 175, 55, 0.3)" strokeWidth={2} />
              <circle cx={100} cy={100} r={80} fill="rgba(8, 16, 34, 0.85)" stroke="#D4AF37" strokeWidth={3} />
              <path d="M 60 100 L 90 130 L 145 75" fill="none" stroke="#D4AF37" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#D4AF37', letterSpacing: '2px' }}>
            CRITERION 02 • شرط دوم
          </span>
          <h2 style={{ fontSize: 50, fontWeight: 900, color: '#F8FAFC', margin: '12px 0 0 0', textAlign: 'center' }}>
            عدم سوء پیشینه و تأییدیه کمیته انضباطی
          </h2>
          <p style={{ fontSize: 22, color: '#94A3B8', marginTop: 12, fontWeight: 500, textAlign: 'center' }}>
            رعایت سنوات مجاز تحصیلی و دارا بودن حسن شهرت اخلاقی و انضباطی
          </p>
        </div>
      )}

      {/* CRITERION 3 STAGE: >= 6 ARTICLES */}
      {c3Op > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 140px',
            direction: 'rtl',
            opacity: c3Op,
          }}
        >
          <div style={{ flex: 1.2, maxWidth: 900 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#10B981', letterSpacing: '2px' }}>
              CRITERION 03 • شرط سوم
            </span>
            <h2 style={{ fontSize: 54, fontWeight: 900, color: '#F8FAFC', margin: '14px 0 0 0' }}>
              کسب امتیاز از حداقل ۶ ماده مختلف
            </h2>
            <p style={{ fontSize: 24, color: '#94A3B8', marginTop: 14, fontWeight: 500 }}>
              تنوع در فعالیت‌های آموزشی، پژوهشی و فناورانه الزامی است
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              direction: 'ltr',
              transform: `scale(${c3Punch})`,
              userSelect: 'none',
            }}
          >
            <span
              style={{
                fontSize: 160,
                fontWeight: 900,
                color: '#10B981',
                lineHeight: 0.8,
                letterSpacing: '-4px',
                textShadow: '0 0 45px rgba(16, 185, 129, 0.45)',
              }}
            >
              ≥6
            </span>
            <span style={{ fontSize: 36, fontWeight: 800, color: '#94A3B8', marginLeft: 16 }}>ماده</span>
          </div>
        </div>
      )}
    </div>
  );
};
