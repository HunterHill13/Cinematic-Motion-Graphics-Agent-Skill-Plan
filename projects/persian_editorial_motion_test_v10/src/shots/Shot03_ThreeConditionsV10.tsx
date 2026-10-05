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
  ShockwaveRing,
  OfficialReticleStamp,
} from '../motion/actors/SecondaryActorsV10';

/**
 * SHOT 03 — THE THREE INDISPENSABLE CONDITIONS (V10 MOTION SYSTEM)
 * - Duration: 870 frames (local 0 - 870f / global 620 - 1490f)
 * - Deterministic acoustic synchronization:
 *   1. GPA 16 strike at local frame 235 (global 855) on spoken «حداقل شانزده»
 *   2. Disciplinary stamp strike at local frame 415 (global 1035) on spoken «تأییدیه کمیته انضباطی»
 *   3. 6 Articles strike at local frame 595 (global 1215) on spoken «حداقل از شش ماده»
 * - Standardized Motion Recipes: ImpactAndRipple, RevealAndEscalate
 * - Handoff: 90° baseline rotation into the vertical temporal barrier of Shot 04
 */
export const Shot03_ThreeConditionsV10: React.FC = () => {
  const frame = useCurrentFrame();

  const C1_STRIKE_FRAME = getLocalAcousticTrigger('shot03', 'shot03_criterion1_gpa16_strike'); // 235
  const C2_STRIKE_FRAME = getLocalAcousticTrigger('shot03', 'shot03_criterion2_disciplinary_strike'); // 415
  const C3_STRIKE_FRAME = getLocalAcousticTrigger('shot03', 'shot03_criterion3_articles_strike'); // 595

  // Primary Entrance (0 - 40f)
  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // --- CRITERION 1: GPA >= 16 (Local 160 - 380f) ---
  const c1Impact = calculateImpactAndRipple(frame, C1_STRIKE_FRAME, {
    entryDuration: 25,
    reboundAmplitude: 7,
    shockwaveMaxRadius: 210,
    shockwaveDuration: 24,
    followerDelay: 4,
  });
  const c1Op = interpolate(frame, [160, 190, 370, 395], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- CRITERION 2: DISCIPLINARY STAMP (Local 380 - 560f) ---
  const c2Impact = calculateImpactAndRipple(frame, C2_STRIKE_FRAME, {
    entryDuration: 22,
    reboundAmplitude: 6,
    shockwaveMaxRadius: 220,
    shockwaveDuration: 24,
    followerDelay: 4,
  });
  const c2Op = interpolate(frame, [380, 405, 545, 570], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stampRotation = interpolate(frame, [380, C2_STRIKE_FRAME], [45, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // --- CRITERION 3: >= 6 ARTICLES (Local 560 - 820f) ---
  const c3Impact = calculateImpactAndRipple(frame, C3_STRIKE_FRAME, {
    entryDuration: 25,
    reboundAmplitude: 7,
    shockwaveMaxRadius: 220,
    shockwaveDuration: 24,
    followerDelay: 4,
  });
  const c3Escalate = calculateRevealAndEscalate(frame, C3_STRIKE_FRAME, 6, 8, {
    baselineDuration: 20,
    textDuration: 22,
  });
  const c3Op = interpolate(frame, [560, 585, 800, 830], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Spatial Recomposition Handoff to Shot 04 (830 - 870f) ---
  const rotationProgress = interpolate(frame, [830, 870], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const ruleRotation = interpolate(rotationProgress, [0, 1], [0, 90]);
  const ruleColor = rotationProgress > 0 ? '#F59E0B' : '#38BDF8';

  // Active Traveling Motif coordinates across the 3 criteria
  let sparkX = 380;
  let sparkY = 540;
  let sparkColor = '#38BDF8';
  let sparkScale = 1.0;

  if (frame < 380) {
    sparkX = 380;
    sparkY = 540 + c1Impact.baselineDisplacement;
    sparkScale = frame >= C1_STRIKE_FRAME ? c1Impact.primaryScale : 1.0;
    sparkColor = '#38BDF8';
  } else if (frame < 560) {
    sparkX = 960;
    sparkY = 480 + c2Impact.baselineDisplacement;
    sparkScale = frame >= C2_STRIKE_FRAME ? c2Impact.primaryScale : 1.0;
    sparkColor = '#D4AF37';
  } else if (frame < 830) {
    sparkX = 1520;
    sparkY = 540 + c3Impact.baselineDisplacement;
    sparkScale = frame >= C3_STRIKE_FRAME ? c3Impact.primaryScale : 1.0;
    sparkColor = '#10B981';
  } else {
    // 830 - 870f: Climbing rotating baseline for temporal wall handoff
    sparkX = interpolate(rotationProgress, [0, 1], [1520, 960]);
    sparkY = interpolate(rotationProgress, [0, 1], [540, 540]);
    sparkScale = 1.2;
    sparkColor = '#F59E0B';
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
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.07) 0%, transparent 65%)',
        }}
      />

      {/* LAYER 1: Ambient Grid & Registration Marks (Role D) */}
      <AmbientGridV10 color="rgba(56, 189, 248, 0.05)" glowColor="rgba(56, 189, 248, 0.08)" />

      {/* LAYER 2: Editorial Datum Rule (Role B) with 90° Axis Rotation Handoff */}
      <div
        style={{
          position: 'absolute',
          top: 540,
          left: 140,
          right: 140,
          height: 2,
          backgroundColor: ruleColor,
          boxShadow: `0 0 16px ${ruleColor}`,
          transform: `rotate(${ruleRotation}deg)`,
          transformOrigin: '50% 50%',
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 3: The Traveling Motif (Role B) */}
      <TravelingMotifV10
        x={sparkX}
        y={sparkY}
        scale={sparkScale}
        color={sparkColor}
        glowColor={sparkColor}
        opacity={entrance}
        wakeLength={rotationProgress > 0 ? 32 : 12}
        morphMode="spark"
      />

      {/* LAYER 4: Secondary Actors & Shockwaves */}
      {/* Criterion 1 Shockwave & Brackets */}
      {c1Op > 0 && (
        <>
          <ShockwaveRing
            x={380}
            y={540}
            radius={c1Impact.shockwave.radius}
            opacity={c1Impact.shockwave.opacity}
            color="#38BDF8"
            strokeWidth={c1Impact.shockwave.strokeWidth}
          />
          {frame >= C1_STRIKE_FRAME && (
            <CoordinateBrackets
              x={380}
              y={540 + c1Impact.follower.y}
              width={240}
              height={240}
              bracketSize={22}
              color="rgba(56, 189, 248, 0.5)"
              opacity={c1Impact.follower.opacity * c1Op}
              scale={c1Impact.follower.scale}
            />
          )}
        </>
      )}

      {/* Criterion 2 Shockwave & Stamp */}
      {c2Op > 0 && (
        <>
          <ShockwaveRing
            x={960}
            y={480}
            radius={c2Impact.shockwave.radius}
            opacity={c2Impact.shockwave.opacity}
            color="#D4AF37"
            strokeWidth={c2Impact.shockwave.strokeWidth}
          />
          {frame >= C2_STRIKE_FRAME && (
            <CoordinateBrackets
              x={960}
              y={480 + c2Impact.follower.y}
              width={260}
              height={260}
              bracketSize={24}
              color="rgba(212, 175, 55, 0.6)"
              opacity={c2Impact.follower.opacity * c2Op}
              scale={c2Impact.follower.scale}
            />
          )}
        </>
      )}

      {/* Criterion 3 Shockwave & 6 Sequential Article Indicators */}
      {c3Op > 0 && (
        <>
          <ShockwaveRing
            x={1520}
            y={540}
            radius={c3Impact.shockwave.radius}
            opacity={c3Impact.shockwave.opacity}
            color="#10B981"
            strokeWidth={c3Impact.shockwave.strokeWidth}
          />
          {frame >= C3_STRIKE_FRAME && (
            <CoordinateBrackets
              x={1520}
              y={540 + c3Impact.follower.y}
              width={220}
              height={220}
              bracketSize={20}
              color="rgba(16, 185, 129, 0.5)"
              opacity={c3Impact.follower.opacity * c3Op}
              scale={c3Impact.follower.scale}
            />
          )}

          {/* 6 Sequential Article Confirmation Indicators (Recipe 04) */}
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
            {c3Escalate.milestones.map((m) => (
              <div
                key={`art-dot-${m.index}`}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: m.active ? '#10B981' : 'rgba(16, 185, 129, 0.2)',
                  boxShadow: m.active ? '0 0 12px #10B981' : 'none',
                  transform: `scale(${m.scale})`,
                  transition: 'transform 0.15s ease',
                }}
              />
            ))}
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

      {/* CRITERION 1 STAGE: GPA 16 (Acoustic Strike Frame 235) */}
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
              transform: `scale(${frame >= C1_STRIKE_FRAME ? c1Impact.primaryScale : 1.0}) translateY(${c1Impact.baselineDisplacement}px)`,
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

      {/* CRITERION 2 STAGE: DISCIPLINARY STAMP (Acoustic Strike Frame 415) */}
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
              transform: `scale(${frame >= C2_STRIKE_FRAME ? c2Impact.primaryScale : 1.0}) rotate(${stampRotation}deg)`,
              marginBottom: 30,
              position: 'relative',
            }}
          >
            <OfficialReticleStamp
              x={0}
              y={0}
              scale={1.3}
              opacity={1.0}
              verified={frame >= C2_STRIKE_FRAME}
            />
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

      {/* CRITERION 3 STAGE: >= 6 ARTICLES (Acoustic Strike Frame 595) */}
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
              transform: `scale(${frame >= C3_STRIKE_FRAME ? c3Impact.primaryScale : 1.0})`,
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
