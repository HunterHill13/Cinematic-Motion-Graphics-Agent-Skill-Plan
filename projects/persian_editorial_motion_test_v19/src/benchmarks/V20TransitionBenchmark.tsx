import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import {
  executeKineticUnderlineHandoff,
  executeSymmetricFission,
  executeDatumRuleAxisCollapse,
  executePlanarStageFold,
  executeGravitationalSingularity,
} from '../../../../src/transition/carryTransitions';

/**
 * V20 TRANSITION BENCHMARK
 * 
 * Tests and verifies all 5 narrative shot boundary transitions:
 * - Segment 1 (f0 - f60):   T1 (S01 -> S02): Horizontal Laser Beam sweeps 90deg to Vertical Divider
 * - Segment 2 (f60 - f120):  T2 (S02 -> S03): Vertical Divider splits into 3 Harmonic Column Axes
 * - Segment 3 (f120 - f180): T3 (S03 -> S04): Columns Collapse into 1800px Continuous Horizontal Rail
 * - Segment 4 (f180 - f240): T4 (S04 -> S05): Timeline Rail docks into Foundation Plinth
 * - Segment 5 (f240 - f300): T5 (S05 -> S06): Summit Vector collapses into Singularity Node Detonation
 * 
 * Frame overlays, carrier telemetry, and classification badges included.
 */
export const V20TransitionBenchmark: React.FC = () => {
  const frame = useCurrentFrame();

  // Active Transition Segment: 0, 1, 2, 3, 4
  const segmentIndex = Math.min(4, Math.floor(frame / 60));
  const segmentLocalFrame = frame % 60;

  // Segment metadata
  const segments = [
    {
      id: 'T1',
      title: 'T1: S01 → S02 ROTATIONAL SWEEP HANDOFF',
      carrier: 'Carrier: Golden Laser Beam (Horizontal → Vertical)',
      classification: 'TRUE TRANSFORMATION',
      from: 'Shot 01 Horizon Datum (y: 52%, x: 80-1840)',
      to: 'Shot 02 Vertical Divider (right: 560, top: 70, h: 940)',
    },
    {
      id: 'T2',
      title: 'T2: S02 → S03 SYMMETRIC FISSION HANDOFF',
      carrier: 'Carrier: Architectural Vertical Spine (1 Axis → 3 Axes)',
      classification: 'TRUE TRANSFORMATION',
      from: 'Shot 02 Single Vertical Divider (right: 560)',
      to: 'Shot 03 Tripartite Columns (right: 640, 1200, 1760)',
    },
    {
      id: 'T3',
      title: 'T3: S03 → S04 DATUM RULE COLLAPSE',
      carrier: 'Carrier: Structural Mass → Continuous Horizontal Rail',
      classification: 'STRUCTURAL MORPH & HANDOFF',
      from: 'Shot 03 Tripartite Columns & Caliper Frame',
      to: 'Shot 04 Continuous 1800px Chronological Trajectory Rail (y: 520)',
    },
    {
      id: 'T4',
      title: 'T4: S04 → S05 FOUNDATION PLINTH DOCK',
      carrier: 'Carrier: Timeline Rail → Base Plinth Foundation',
      classification: 'SPATIAL HANDOFF & DOCK',
      from: 'Shot 04 Chronological Rail & Barrier (y: 520)',
      to: 'Shot 05 Monolith Foundation Base Plinth (y: 760, h: 16)',
    },
    {
      id: 'T5',
      title: 'T5: S05 → S06 GRAVITATIONAL SINGULARITY DETONATION',
      carrier: 'Carrier: Summit Vector Points → Detonation Origin Node',
      classification: 'TRUE TRANSFORMATION',
      from: 'Shot 05 Summit Laser Triangle (65 → 110 → 130)',
      to: 'Shot 06 Cosmic Singularity Origin at (960, 345) & Crest Burst',
    },
  ];

  const currentSegment = segments[segmentIndex];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        direction: 'rtl',
        color: '#FFFFFF',
      }}
    >
      {/* Upper HUD Telemetry */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          paddingBottom: 16,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#D4AF37' }}>
            V20 TRANSITION INTEGRITY BENCHMARK
          </span>
          <span style={{ fontSize: 16, color: '#94A3B8' }}>
            Frame: {frame} / 300 (Local: {segmentLocalFrame}/60)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#38BDF8',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              padding: '4px 12px',
              borderRadius: 4,
              border: '1px solid #38BDF8',
            }}
          >
            {currentSegment.classification}
          </span>
          <span
            style={{
              fontSize: 14,
              color: '#F59E0B',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              padding: '4px 12px',
              borderRadius: 4,
              border: '1px solid #F59E0B',
            }}
          >
            {currentSegment.carrier}
          </span>
        </div>
      </div>

      {/* Transition Context Subtitle */}
      <div
        style={{
          position: 'absolute',
          top: 95,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          color: '#94A3B8',
          fontSize: 14,
          zIndex: 100,
        }}
      >
        <span>FROM: {currentSegment.from}</span>
        <span>TO: {currentSegment.to}</span>
      </div>

      {/* ======================================================== */}
      {/* SEGMENT 1: T1 ROTATIONAL SWEEP (f0 - f60)                */}
      {/* ======================================================== */}
      {segmentIndex === 0 && (() => {
        const t1 = executeKineticUnderlineHandoff(segmentLocalFrame, 10, 45);
        return (
          <AbsoluteFill>
            {/* Target Docking Ghost Guideline */}
            <div
              style={{
                position: 'absolute',
                top: 70,
                right: 560,
                width: 2.5,
                height: 940,
                border: '1px dashed rgba(212, 175, 55, 0.3)',
              }}
            />

            {/* Sweeping Laser Beam Carrier */}
            <div
              style={{
                position: 'absolute',
                top: `${t1.topPercent}%`,
                right: interpolate(t1.progress, [0, 1], [80, 560]),
                width: 2.5,
                height: t1.length,
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 24px rgba(212, 175, 55, 1)',
                transformOrigin: 'right top',
                transform: `rotate(${t1.rotationDeg}deg)`,
                opacity: t1.opacity,
              }}
            />
          </AbsoluteFill>
        );
      })()}

      {/* ======================================================== */}
      {/* SEGMENT 2: T2 SYMMETRIC FISSION (f60 - f120)             */}
      {/* ======================================================== */}
      {segmentIndex === 1 && (() => {
        const fission = executeSymmetricFission(segmentLocalFrame, 10, 45);
        return (
          <AbsoluteFill>
            {/* 3 Harmonic Column Axes splitting from right: 560 */}
            <div
              style={{
                position: 'absolute',
                top: 70,
                right: fission.axis1Right,
                width: 2,
                height: 940,
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 16px rgba(212, 175, 55, 0.8)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 70,
                right: fission.axis2Right,
                width: 2,
                height: 940,
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.8)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 70,
                right: fission.axis3Right,
                width: 2,
                height: 940,
                backgroundColor: '#F59E0B',
                boxShadow: '0 0 16px rgba(245, 158, 11, 0.8)',
              }}
            />
          </AbsoluteFill>
        );
      })()}

      {/* ======================================================== */}
      {/* SEGMENT 3: T3 DATUM COLLAPSE (f120 - f180)               */}
      {/* ======================================================== */}
      {segmentIndex === 2 && (() => {
        const collapse = executeDatumRuleAxisCollapse(segmentLocalFrame, 10, 45);
        return (
          <AbsoluteFill>
            {/* 3 collapsing column proxies */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: `translate(-50%, -50%) scaleX(${collapse.scaleX}) scaleY(${collapse.scaleY})`,
                width: 1800,
                height: 400,
                border: '2px solid rgba(56, 189, 248, 0.4)',
                backgroundColor: 'rgba(56, 189, 248, 0.05)',
                opacity: collapse.contentOpacity,
              }}
            />

            {/* Continuous 1800px Rail Line that emerges from the collapse */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1800,
                height: 4,
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 20px rgba(56, 189, 248, 1)',
                opacity: collapse.lineOpacity,
              }}
            />
          </AbsoluteFill>
        );
      })()}

      {/* ======================================================== */}
      {/* SEGMENT 4: T4 FOUNDATION DOCK (f180 - f240)              */}
      {/* ======================================================== */}
      {segmentIndex === 3 && (() => {
        const fold = executePlanarStageFold(segmentLocalFrame, 10, 45);
        return (
          <AbsoluteFill>
            {/* Timeline Rail moving from y: 520 down to y: 760 and expanding to plinth */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: `translate(-50%, ${fold.translateY}px)`,
                width: 1680,
                height: fold.plinthHeight,
                backgroundColor: '#D4AF37',
                borderRadius: 4,
                boxShadow: '0 0 24px rgba(212, 175, 55, 0.9)',
                opacity: fold.opacity,
              }}
            />

            {/* Ghost Monolith Foundations emerging */}
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                left: 120,
                right: 120,
                display: 'flex',
                justifyContent: 'space-between',
                opacity: fold.progress,
              }}
            >
              <div style={{ width: 440, height: 40, border: '1px dashed #D4AF37' }} />
              <div style={{ width: 440, height: 40, border: '1px dashed #D4AF37' }} />
              <div style={{ width: 440, height: 40, border: '1px dashed #D4AF37' }} />
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* ======================================================== */}
      {/* SEGMENT 5: T5 SINGULARITY DETONATION (f240 - f300)       */}
      {/* ======================================================== */}
      {segmentIndex === 4 && (() => {
        const sing = executeGravitationalSingularity(segmentLocalFrame, 10, 35);
        const burstExpansion = interpolate(segmentLocalFrame, [35, 55], [0.1, 1.3], {
          easing: Easing.bezier(0.1, 1, 0.2, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const isBurst = segmentLocalFrame >= 35;

        return (
          <AbsoluteFill>
            {/* Collapsing Singularity Node at (960, 345) */}
            {!isBurst ? (
              <div
                style={{
                  position: 'absolute',
                  top: '32%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: sing.singularitySize,
                  height: sing.singularitySize,
                  borderRadius: '50%',
                  backgroundColor: '#D4AF37',
                  boxShadow: '0 0 32px rgba(212, 175, 55, 1)',
                  opacity: sing.singularityOpacity,
                }}
              />
            ) : (
              /* Detonating Rays & Heraldic Ring from the Exact Same Node */
              <div
                style={{
                  position: 'absolute',
                  top: '32%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${burstExpansion})`,
                  width: 240,
                  height: 240,
                  borderRadius: '50%',
                  border: '2px solid #D4AF37',
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: 140, height: 140, borderRadius: '50%', backgroundColor: '#D4AF37' }} />
              </div>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};
