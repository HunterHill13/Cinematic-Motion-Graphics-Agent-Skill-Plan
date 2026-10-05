import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateImpactReaction } from '../motion/reactions/reactionEngine';
import { AmbientGrid } from '../motion/ambient/AmbientGrid';
import { TravelingMotif } from '../motion/actors/TravelingMotif';
import { CoordinateBrackets, ConnectorTrack } from '../motion/actors/SecondaryActors';

/**
 * SHOT 04 — THE TEMPORAL HORIZON & LEGAL CUTOFF
 * V9 Multi-Actor Choreography:
 * - Inherits the rotated vertical wall from Shot 03.
 * - Traveling Motif rides vertically along the amber wall as a scanning beacon.
 * - Impact vibration when wall hits full height at frame 45.
 * - Asymmetric tension: Obsidian study duration vs. Amber 1-year cutoff.
 * - Handoff: Traveling Motif rides wall downward as it collapses and flattens
 *   horizontally into the baseline datum for Shot 05.
 */
export const Shot04_TimeWindowV9: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const wallHeight = interpolate(frame, [15, 45], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Impact Vibration when wall hits full height at frame 45
  const impactVibration = frame >= 45 && frame <= 55
    ? 4 * Math.sin(((frame - 45) / 10) * Math.PI)
    : 0;

  // Handoff to Shot 5 (235 - 270f)
  // Amber wall collapses downward and flattens horizontally into datum line
  const exitProgress = interpolate(frame, [235, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const wallCollapseHeight = interpolate(exitProgress, [0, 1], [100, 0]);
  const horizontalDatumWidth = interpolate(exitProgress, [0, 1], [0, 1600]);
  const exitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });

  // Traveling Motif Trajectory:
  // Rides vertically along the amber wall (y: 420 <-> 660)
  // At 235 - 270f: Rides wall downward to ground line (y: 660 -> 940)
  let sparkX = 960;
  let sparkY = 540;
  let sparkColor = '#F59E0B';

  if (frame < 235) {
    const cycle = (frame % 80) / 80;
    sparkY = 440 + Math.sin(cycle * Math.PI * 2) * 100;
  } else {
    sparkY = interpolate(exitProgress, [0, 1], [540, 940], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
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
          background: 'radial-gradient(ellipse at 75% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* LAYER 1: Ambient Grid & Registration Marks */}
      <AmbientGrid color="rgba(245, 158, 11, 0.05)" glowColor="rgba(245, 158, 11, 0.08)" />

      {/* LAYER 2: Dividing Temporal Monolith Wall */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 3,
          height: `${exitProgress > 0 ? wallCollapseHeight * 2.4 : wallHeight * 2.4}px`,
          backgroundColor: '#F59E0B',
          boxShadow: '0 0 24px #F59E0B',
          pointerEvents: 'none',
        }}
      />

      {/* Persistent Flattening Horizontal Datum for Shot 05 */}
      {exitProgress > 0.01 && (
        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: '50%',
            transform: 'translateX(-50%)',
            width: horizontalDatumWidth,
            height: 2,
            backgroundColor: '#38BDF8',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* LAYER 3: The Traveling Motif (Scanning Temporal Beacon) */}
      <TravelingMotif
        x={sparkX}
        y={sparkY}
        scale={1.15}
        color={sparkColor}
        glowColor="rgba(245, 158, 11, 0.7)"
        opacity={entrance}
        wakeLength={18}
        wakeAngle={90}
      />

      {/* LAYER 4: Secondary Actors */}
      {/* Brackets around Phase 1 (Study Duration) */}
      <CoordinateBrackets
        x={580}
        y={540}
        width={520}
        height={220}
        bracketSize={20}
        color="rgba(56, 189, 248, 0.4)"
        opacity={entrance * exitOp}
      />

      {/* Brackets around Phase 2 (Strict 1-Year Cutoff) */}
      <CoordinateBrackets
        x={1340}
        y={540}
        width={500}
        height={220}
        bracketSize={20}
        color="rgba(245, 158, 11, 0.5)"
        opacity={entrance * exitOp}
      />

      {/* Horizontal Connector Tracks linking phases across the wall */}
      {frame >= 45 && (
        <ConnectorTrack
          startX={850}
          startY={540}
          endX={1070}
          endY={540}
          color="rgba(245, 158, 11, 0.3)"
          dashed={true}
        />
      )}

      {/* LAYER 5 & 6: Primary Typography & Content Monolith */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 140px',
          direction: 'rtl',
          opacity: entrance * exitOp,
          transform: `translateX(${impactVibration}px)`,
        }}
      >
        {/* Top Context Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ width: 10, height: 10, backgroundColor: '#F59E0B' }} />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#F59E0B', letterSpacing: '1px' }}>
            محدودیت و مهلت زمانی قانونی
          </span>
          <span style={{ fontSize: 13, color: 'rgba(148, 163, 184, 0.5)', fontFamily: 'monospace' }}>
            [LIMIT-TIME-1YR]
          </span>
        </div>

        <h1 style={{ fontSize: 60, fontWeight: 900, color: '#F8FAFC', margin: 0, lineHeight: 1.25 }}>
          بازه زمانی معتبر جهت پذیرش مدارک
        </h1>
        <p style={{ fontSize: 24, color: '#94A3B8', marginTop: 14, fontWeight: 500, maxWidth: 1100 }}>
          تمام فعالیت‌ها باید مربوط به دوران تحصیل یا حداکثر تا ۱ سال پس از فراغت از تحصیل باشد
        </p>

        {/* Asymmetric Temporal Horizon Division */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 60,
            marginTop: 48,
            height: 240,
            position: 'relative',
          }}
        >
          {/* Phase 1: Study Duration */}
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRight: '3px solid #38BDF8',
              paddingRight: 32,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: '#38BDF8', letterSpacing: '2px' }}>
              PHASE 01 • بازه اصلی
            </span>
            <span style={{ fontSize: 44, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              طول دوره تحصیل
            </span>
            <span style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
              از روز رسمی ثبت‌نام تا تاریخ دفاع نهایی و فارغ‌التحصیلی
            </span>
          </div>

          {/* Spacer for Center Temporal Monolith Wall */}
          <div style={{ width: 40 }} />

          {/* Phase 2: Strict 1-Year Cutoff */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: 10,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: '#F59E0B', letterSpacing: '2px' }}>
              STRICT CUTOFF • حداکثر مهلت مجاز
            </span>
            <span style={{ fontSize: 44, fontWeight: 900, color: '#F59E0B', marginTop: 8 }}>
              حداکثر ۱ سال پس از فراغت
            </span>
            <span style={{ fontSize: 18, color: '#94A3B8', marginTop: 8 }}>
              پس از گذشت ۱۲ ماه، ارسال هرگونه پرونده مسدود خواهد شد
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
