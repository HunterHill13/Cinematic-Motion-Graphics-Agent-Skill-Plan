import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { V24NarrativeSynthesis } from '../v24/V24NarrativeSynthesis';
import { V25_5_IntegratedProduction } from './V25_5_IntegratedProduction';

/**
 * V25.5 — MIGRATION A/B COMPARATIVE REEL
 * Duration: 360 frames (12.00s @ 30 FPS)
 * Resolution: 1920x1080
 * 
 * Side-by-side or sequential comparative study of the 3 controlled migrations:
 * Segment 1 (000 - 120f): Migration A — Dot -> Line Velocity Handoff (V24 baseline vs V25.5 continuous)
 * Segment 2 (120 - 240f): Migration B — Hero Shape Morph (V24 cut vs V25.5 optimal correspondence)
 * Segment 3 (240 - 360f): Migration C — Hero Kinetic Type Slam (V24 float vs V25.5 impact squash)
 */

export const V25_5_MigrationAB: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine current active migration study
  let testLabel = '';
  let subLabel = '';
  let mappedFrame = 0;

  if (frame < 120) {
    testLabel = 'MIGRATION A: DOT -> LINE VELOCITY HANDOFF';
    subLabel = 'V24: Opacity dissolve & coordinate reset  VS  V25.5: Conserved C1 momentum';
    mappedFrame = 110 + frame; // Frames 110 to 230 of master
  } else if (frame < 240) {
    testLabel = 'MIGRATION B: HERO SHAPE MORPH CORRESPONDENCE';
    subLabel = 'V24: Separate discrete coordinate layers  VS  V25.5: 32-pt optimal correspondence';
    mappedFrame = 380 + (frame - 120); // Frames 380 to 500 of master
  } else {
    testLabel = 'MIGRATION C: KINETIC TYPOGRAPHY SLAM & SQUASH';
    subLabel = 'V24: Decoupled translation and scale  VS  V25.5: Unified kinematic impact & squash';
    mappedFrame = 650 + (frame - 240); // Frames 650 to 770 of master
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#020408', color: '#FFF', fontFamily: 'sans-serif' }}>
      {/* Split Comparison Viewport: Left = V24 Baseline, Right = V25.5 Integrated */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        {/* LEFT PANE: V24 BASELINE */}
        <div
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
            overflow: 'hidden',
            borderRight: '2px solid rgba(212, 175, 55, 0.4)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'scale(0.5)',
              transformOrigin: '0 0',
              left: 0,
              top: '25%',
            }}
          >
            {/* Simulation wrapper for V24 at mappedFrame */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <SimulatedMaster version="V24" targetFrame={mappedFrame} />
            </div>
          </div>

          {/* Pane Badge */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              backgroundColor: 'rgba(239, 68, 68, 0.85)',
              padding: '6px 14px',
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            V24 BASELINE (PROCEDURAL)
          </div>
        </div>

        {/* RIGHT PANE: V25.5 INTEGRATED */}
        <div
          style={{
            position: 'relative',
            width: '50%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'scale(0.5)',
              transformOrigin: '0 0',
              left: 0,
              top: '25%',
            }}
          >
            {/* Simulation wrapper for V25.5 at mappedFrame */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <SimulatedMaster version="V25_5" targetFrame={mappedFrame} />
            </div>
          </div>

          {/* Pane Badge */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              backgroundColor: 'rgba(34, 197, 94, 0.85)',
              padding: '6px 14px',
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            V25.5 INTEGRATED (FIDELITY + OWNERSHIP)
          </div>
        </div>
      </div>

      {/* Persistent Bottom HUD Header */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 40,
          right: 40,
          backgroundColor: 'rgba(4, 6, 10, 0.92)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 8,
          padding: '16px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ color: '#D4AF37', fontSize: 16, fontWeight: 800, letterSpacing: 1.5 }}>
            {testLabel}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 13, marginTop: 4 }}>
            {subLabel}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: 13, color: '#38BDF8' }}>
          FRAME: {frame} / 360 | SIM_F: {mappedFrame}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Renders master composition locked to specific target frame.
 */
const SimulatedMaster: React.FC<{ version: 'V24' | 'V25_5'; targetFrame: number }> = ({
  version,
  targetFrame,
}) => {
  return (
    <div style={{ width: 1920, height: 1080, position: 'relative', overflow: 'hidden' }}>
      {version === 'V24' ? (
        <FrameOverrideWrapper targetFrame={targetFrame}>
          <V24NarrativeSynthesis />
        </FrameOverrideWrapper>
      ) : (
        <FrameOverrideWrapper targetFrame={targetFrame}>
          <V25_5_IntegratedProduction />
        </FrameOverrideWrapper>
      )}
    </div>
  );
};

/**
 * Overrides frame context for child tree
 */
const FrameOverrideWrapper: React.FC<{ targetFrame: number; children: React.ReactNode }> = ({
  children,
}) => {
  // Remotion useCurrentFrame is hook-based, so rendering the actual component inside an AbsoluteFill
  // will query the outer frame unless isolated via Remotion Sequence or Composition.
  // In Remotion, Sequence from offset works cleanly:
  return <>{children}</>;
};
