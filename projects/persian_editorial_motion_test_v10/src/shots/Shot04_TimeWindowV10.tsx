import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { getLocalAcousticTrigger } from '../motion/timing/voiceSync';
import {
  calculateScanAndCollapse,
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
 * SHOT 04 — THE TEMPORAL HORIZON & LEGAL CUTOFF (V10 MOTION SYSTEM)
 * - Duration: 270 frames (local 0 - 270f / global 1460 - 1730f)
 * - Frame-accurate strike at local frame 115 (global 1575) on spoken «یک سال پس از فارغ‌التحصیلی»
 * - Standardized Recipe: Recipe 05 ScanAndCollapse
 * - Handoff: Vertical wall collapses into horizontal floor plane at frames 235 - 270
 */
export const Shot04_TimeWindowV10: React.FC = () => {
  const frame = useCurrentFrame();

  const CUTOFF_STRIKE_FRAME = getLocalAcousticTrigger('shot04', 'shot04_cutoff_1year_strike'); // 115

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Standardized Recipe 05: Scan and Collapse
  const scanCollapse = calculateScanAndCollapse(
    frame,
    16,
    CUTOFF_STRIKE_FRAME,
    235,
    {
      startX: 400,
      wallX: 960,
      collapseDuration: 25,
    }
  );

  const textReveal = calculateRevealAndEscalate(frame, 10, 0, 0, {
    baselineDuration: 20,
    textDuration: 25,
  });

  // Vertical wall growth from frame 15 to 45
  const wallHeight = interpolate(frame, [15, 45], [0, 240], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Handoff to Shot 05 (235 - 270f)
  const exitProgress = scanCollapse.collapseProgress;
  const wallCollapseHeight = interpolate(exitProgress, [0, 1], [240, 0]);
  const horizontalDatumWidth = interpolate(exitProgress, [0, 1], [0, 1600]);
  const exitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });

  // Traveling Motif coordinates:
  // 16 - 115f: Scans along temporal timeline (x: 400 -> 960)
  // 115 - 235f: Locked at wall (960, 540) pulsating as amber sentinel
  // 235 - 270f: Rides collapsing wall downward to floor datum (960, 540 -> 940)
  let sparkX = 960;
  let sparkY = 540;
  let sparkScale = 1.0;

  if (frame < CUTOFF_STRIKE_FRAME) {
    sparkX = scanCollapse.beaconX;
    sparkY = 540;
    sparkScale = 1.1;
  } else if (frame < 235) {
    sparkX = 960;
    sparkY = 540 + Math.sin((frame - CUTOFF_STRIKE_FRAME) * 0.1) * 30;
    sparkScale = 1.0 + scanCollapse.barrierFlash * 0.3;
  } else {
    sparkX = 960;
    sparkY = interpolate(exitProgress, [0, 1], [540, 940], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    sparkScale = 1.0;
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

      {/* LAYER 1: Ambient Grid & Registration Marks (Role D) */}
      <AmbientGridV10 color="rgba(245, 158, 11, 0.05)" glowColor="rgba(245, 158, 11, 0.08)" />

      {/* LAYER 2: Dividing Temporal Monolith Wall (Role B / A) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translateX(${scanCollapse.wallDisplacement}px)`,
          width: 3,
          height: `${exitProgress > 0 ? wallCollapseHeight : wallHeight}px`,
          backgroundColor: '#F59E0B',
          boxShadow: `0 0 ${scanCollapse.barrierFlash > 0 ? 36 : 24}px #F59E0B`,
          pointerEvents: 'none',
        }}
      />

      {/* Persistent Horizontal Datum flattening for Shot 05 */}
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

      {/* LAYER 3: The Traveling Motif (Scanning Beacon) */}
      <TravelingMotifV10
        x={sparkX}
        y={sparkY}
        scale={sparkScale}
        color="#F59E0B"
        glowColor="rgba(245, 158, 11, 0.75)"
        opacity={entrance}
        wakeLength={18}
        wakeAngle={90}
        morphMode="beacon"
      />

      {/* LAYER 4: Secondary Actors & Brackets */}
      {/* Cutoff Barrier Impact Shockwave */}
      {scanCollapse.barrierFlash > 0.01 && (
        <ShockwaveRing
          x={960}
          y={540}
          radius={interpolate(1 - scanCollapse.barrierFlash, [0, 1], [10, 160])}
          opacity={scanCollapse.barrierFlash}
          color="#F59E0B"
          strokeWidth={2}
        />
      )}

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
          opacity: textReveal.contentOpacity * exitOp,
          transform: `translateX(${scanCollapse.wallDisplacement}px)`,
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

          {/* Phase 2: Strict 1-Year Cutoff (Acoustic Strike Frame 115) */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: 10,
              transform: `scale(${frame >= CUTOFF_STRIKE_FRAME ? 1.03 : 1.0})`,
              transition: 'transform 0.2s ease',
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
