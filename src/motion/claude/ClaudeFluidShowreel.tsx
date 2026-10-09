/**
 * ============================================================================
 * CLAUDE FLUID SHOWREEL MASTERPIECE (ONE-TAKE VIRTUAL CAMERA CONTINUITY)
 * ============================================================================
 * 
 * Re-engineered from primary-source analysis of viral Claude Opus 5.5 motion
 * graphics. Solves the sequence-chopping / slideshow defect by executing all
 * narrative acts within ONE continuous, persistent 2.5D/3D coordinate world.
 * 
 * CORE CONTINUITY PILLARS:
 * 1. Virtual One-Take Camera: 6-DOF continuous pan, tilt, pitch & dolly across 450 frames.
 * 2. Living Energy Conduit: A persistent luminous particle/filament that never leaves the
 *    screen, physically guiding the viewer's gaze and triggering every transition.
 * 3. Topological Single-Shape Morphing: Entities compress, unfold, tilt, and dock
 *    without being destroyed or unmounted.
 * ============================================================================
 */

import React from 'react';
import { Composition, interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { AtmosphericBackdrop } from '../library/AtmosphericBackdrop';

export const CLAUDE_FLUID_DURATION = 450; // 15.0s @ 30 FPS
export const CLAUDE_FLUID_FPS = 30;
export const CLAUDE_FLUID_WIDTH = 1920;
export const CLAUDE_FLUID_HEIGHT = 1080;

export const ClaudeFluidShowreelContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. CONTINUOUS 6-DOF VIRTUAL CAMERA CHOREOGRAPHY
  // =========================================================================
  // Act 1 (0..105): Centered hero view with slow dolly-in
  // Transition 1->2 (95..125): Subtle push forward and banking roll
  // Act 2 (105..215): Macro focus on Dribbble morphing interaction
  // Transition 2->3 (210..245): Dramatic 2.5D perspective tilt arc (pitch + yaw)
  // Act 3 (220..335): 3D perspective browser viewport with live drawing sparkline
  // Transition 3->4 (325..360): Wide-angle pull-back dolly revealing grand dual pavilion
  // Act 4 (335..450): Balanced dual-wing completion state (SaaS left, Gauge right)
  
  const camX = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 365, 450],
    [0, 0, 40, 40, -180, -180, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camY = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 365, 450],
    [0, 0, 15, 15, -30, -30, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camZ = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 365, 450],
    [0, 80, 140, 140, 90, 90, -80, -80],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camPitch = interpolate(
    frame,
    [0, 210, 250, 325, 365, 450],
    [0, 0, 12, 12, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camYaw = interpolate(
    frame,
    [0, 210, 250, 325, 365, 450],
    [0, 0, -8, -8, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camRoll = interpolate(
    frame,
    [0, 95, 125, 210, 245, 325, 450],
    [0, 0, -1.8, 0, 1.2, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // =========================================================================
  // 2. THE LIVING ENERGY CONDUIT ("THE RED THREAD")
  // =========================================================================
  // Computes the exact (x, y) coordinates of the leading focal light particle
  let conduitX = 960;
  let conduitY = 540;
  let conduitOpacity = 1;
  let conduitGlow = '#06b6d4';

  if (frame < 95) {
    // Act 1: Orbits the hero badge
    const angle = (frame / 35) * Math.PI * 2;
    conduitX = 960 + Math.cos(angle) * 260;
    conduitY = 430 + Math.sin(angle) * 35;
    conduitGlow = '#38bdf8';
  } else if (frame < 125) {
    // Transition 1->2: Dives into button center to trigger morph
    const t = (frame - 95) / 30;
    conduitX = interpolate(t, [0, 1], [960 + 260, 960], { easing: Easing.out(Easing.cubic) });
    conduitY = interpolate(t, [0, 1], [430, 540], { easing: Easing.out(Easing.cubic) });
    conduitGlow = '#6366f1';
  } else if (frame < 155) {
    // Morph spinner loop
    const angle = ((frame - 125) / 25) * Math.PI * 2;
    conduitX = 960 + Math.cos(angle) * 22;
    conduitY = 540 + Math.sin(angle) * 22;
    conduitGlow = '#a855f7';
  } else if (frame < 220) {
    // Traces across the expanded telemetry card top edge
    const t = (frame - 155) / 65;
    conduitX = interpolate(t, [0, 1], [720, 1200]);
    conduitY = 445;
    conduitGlow = '#10b981';
  } else if (frame < 300) {
    // Act 3: Enters SaaS window and draws the live sparkline chart!
    const chartProgress = interpolate(frame, [225, 295], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.quad),
    });
    conduitX = 540 + chartProgress * 460;
    conduitY = 620 - Math.pow(chartProgress, 0.8) * 160;
    conduitGlow = '#38bdf8';
  } else if (frame < 360) {
    // Transition 3->4: Vaults across to the right side where gauge emerges
    const t = (frame - 300) / 60;
    conduitX = interpolate(t, [0, 1], [1000, 1136], { easing: Easing.inOut(Easing.cubic) });
    conduitY = interpolate(t, [0, 1], [460, 532], { easing: Easing.inOut(Easing.cubic) });
    conduitGlow = '#c084fc';
  } else {
    // Act 4: Orbits precisely along the Circular Precision Gauge rim
    const gaugeAngle = interpolate(frame, [360, 440], [-Math.PI / 2, Math.PI * 2.5], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    conduitX = 1136 + Math.cos(gaugeAngle) * 55;
    conduitY = 532 + Math.sin(gaugeAngle) * 55;
    conduitGlow = '#a855f7';
  }

  // =========================================================================
  // 3. TOPOLOGICAL ENTITY MORPHING DYNAMICS
  // =========================================================================

  // Hero Card 1 (Act 1 Headline & Monolith Frame)
  const act1Opacity = interpolate(frame, [85, 115], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act1Scale = interpolate(frame, [85, 115], [1, 0.65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Act 2 Morphing UI Shape Parameters (One Continuous Box)
  const morphVisible = frame >= 95 && frame < 240;
  const morphFrame = Math.max(0, frame - 100);
  
  // Width & Height continuous curve
  const morphW = interpolate(
    morphFrame,
    [0, 15, 30, 50, 65, 80, 105],
    [280, 280, 64, 64, 72, 72, 540],
    { extrapolateRight: 'clamp' }
  );
  const morphH = interpolate(
    morphFrame,
    [0, 15, 30, 50, 65, 80, 105],
    [64, 64, 64, 64, 72, 72, 210],
    { extrapolateRight: 'clamp' }
  );
  const morphRadius = interpolate(
    morphFrame,
    [0, 15, 30, 80, 105],
    [16, 16, 32, 32, 20],
    { extrapolateRight: 'clamp' }
  );
  const morphOpacity = interpolate(frame, [95, 105, 220, 240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Act 3 SaaS Perspective Window Parameters
  const saasVisible = frame >= 210;
  const saasEntrance = spring({
    frame: Math.max(0, frame - 215),
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });

  // When transitioning to Act 4 (frames 325..365), SaaS window smoothly slides to left flank
  const saasDockX = interpolate(frame, [325, 365], [0, -380], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const saasDockScale = interpolate(frame, [325, 365], [1.0, 0.88], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Act 4 Grand Climax Dual-Wing Components (Frames 335..450)
  const act4Visible = frame >= 335;
  const act4Spring = spring({
    frame: Math.max(0, frame - 338),
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 130 },
  });

  // Real-time sparkline drawn by the living energy conduit
  const sparklineLength = interpolate(frame, [225, 295], [0, 460], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Circular gauge completion arc
  const gaugePercent = interpolate(frame, [355, 430], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#020617',
      }}
    >
      {/* 1. ATMOSPHERIC BACKDROP WITH CONTINUOUS LIGHT SHIFT */}
      <AtmosphericBackdrop
        primaryGlowColor="#38bdf8"
        secondaryGlowColor="#6366f1"
        showGrid={true}
        gridSpeed={0.8}
      />

      {/* 2. THE PERSISTENT VIRTUAL CAMERA STAGE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          transform: `perspective(1400px) translate3d(${-camX}px, ${-camY}px, ${camZ}px) rotateX(${camPitch}deg) rotateY(${camYaw}deg) rotateZ(${camRoll}deg)`,
        }}
      >
        {/* =================================================================== */}
        {/* ACT 1: KINETIC HEADLINE HERO (Frames 0 - 115)                        */}
        {/* =================================================================== */}
        {frame < 120 && (
          <div
            style={{
              position: 'absolute',
              width: 980,
              padding: '48px 56px',
              borderRadius: 24,
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.8), 0 0 80px -20px rgba(56, 189, 248, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 20,
              opacity: act1Opacity,
              transform: `scale(${act1Scale})`,
              pointerEvents: frame > 105 ? 'none' : 'auto',
            }}
          >
            {/* Top specular reflection line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent)',
              }}
            />

            {/* Glowing Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 9999,
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8' }} />
              <span style={{ color: '#f8fafc', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                CLAUDE OPUS 5.5 · ONE-TAKE CONTINUITY
              </span>
            </div>

            {/* Kinetic Radiant Headline */}
            <h1
              style={{
                fontSize: 54,
                lineHeight: 1.15,
                fontWeight: 800,
                margin: 0,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                UNBROKEN FLUIDITY
              </span>{' '}
              THROUGH LIVING MOTION
            </h1>

            <p style={{ color: '#94a3b8', fontSize: 20, margin: 0, maxWidth: 680, lineHeight: 1.5 }}>
              Deterministic React vector execution with seamless virtual camera tracking and zero-cutaway choreography
            </p>
          </div>
        )}

        {/* =================================================================== */}
        {/* ACT 2: DRIBBLE-GRADE SINGLE SHAPE MORPH (Frames 95 - 240)           */}
        {/* =================================================================== */}
        {morphVisible && (
          <div
            style={{
              position: 'absolute',
              width: morphW,
              height: morphH,
              borderRadius: morphRadius,
              background: morphFrame < 45
                ? 'linear-gradient(135deg, #6366f1, #4338ca)'
                : morphFrame < 75
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              border: morphFrame >= 75 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              opacity: morphOpacity,
            }}
          >
            {/* Phase 1: Button text */}
            {morphFrame < 28 && (
              <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 16, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffffff', boxShadow: '0 0 10px #ffffff' }} />
                EXECUTE AUTONOMOUS FLOW
              </div>
            )}

            {/* Phase 2: Rotating Ring Loader */}
            {morphFrame >= 25 && morphFrame < 55 && (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '3px solid rgba(255, 255, 255, 0.2)',
                  borderTopColor: '#ffffff',
                  transform: `rotate(${(morphFrame - 25) * 22}deg)`,
                }}
              />
            )}

            {/* Phase 3: Checkmark Stamp */}
            {morphFrame >= 52 && morphFrame < 80 && (
              <div style={{ color: '#ffffff', fontSize: 32, fontWeight: 800 }}>✓</div>
            )}

            {/* Phase 4: Live Telemetry Card */}
            {morphFrame >= 75 && (
              <div style={{ width: '100%', height: '100%', padding: '22px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                    <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: 15, letterSpacing: '0.04em' }}>TELEMETRY SYNCHRONIZED</span>
                  </div>
                  <span style={{ color: '#06b6d4', fontSize: 12, fontWeight: 700, background: 'rgba(6, 182, 212, 0.15)', padding: '3px 8px', borderRadius: 8 }}>
                    FABRIC 100%
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.04)', padding: 12, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>Stream Rate</div>
                    <div style={{ color: '#ffffff', fontSize: 22, fontWeight: 700, marginTop: 2 }}>
                      {Math.round(interpolate(morphFrame, [80, 105], [0, 1840], { extrapolateRight: 'clamp' }))} msg/s
                    </div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.04)', padding: 12, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>Subframe Jitter</div>
                    <div style={{ color: '#22c55e', fontSize: 22, fontWeight: 700, marginTop: 2 }}>0.00 px</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* ACT 3: 2.5D PERSPECTIVE SAAS DASHBOARD (Frames 210 - 450)           */}
        {/* =================================================================== */}
        {saasVisible && (
          <div
            style={{
              position: 'absolute',
              width: 960,
              height: 520,
              borderRadius: 20,
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.8), 0 0 80px -20px rgba(99, 102, 241, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transform: `translate3d(${saasDockX}px, 0, 0) scale(${saasDockScale * saasEntrance})`,
              opacity: saasEntrance,
            }}
          >
            {/* Top specular shine line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent)',
              }}
            />

            {/* Window Top Chrome Bar */}
            <div
              style={{
                height: 48,
                padding: '0 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '4px 14px',
                  borderRadius: 6,
                  color: '#64748b',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                nexus.orchestrator/v5.5/continuous-stream
              </div>
              <div style={{ width: 50 }} />
            </div>

            {/* Window Content Grid */}
            <div style={{ padding: 24, display: 'flex', gap: 20, flex: 1 }}>
              {/* Chart Main Panel */}
              <div
                style={{
                  flex: 1.4,
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 14,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: 14 }}>Real-Time Inference Velocity</span>
                  <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>+418% vs Baseline</span>
                </div>

                {/* Live SVG Sparkline Chart */}
                <div style={{ flex: 1, marginTop: 12, position: 'relative' }}>
                  <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="fluidSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Fill Path */}
                    <path
                      d={`M 20 180 Q 150 160, 250 110 T 480 30 L 480 200 L 20 200 Z`}
                      fill="url(#fluidSparklineGrad)"
                      opacity={Math.min(1, sparklineLength / 250)}
                    />

                    {/* Neon Glowing Wave Line */}
                    <path
                      d="M 20 180 Q 150 160, 250 110 T 480 30"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth={3.5}
                      strokeDasharray={500}
                      strokeDashoffset={Math.max(0, 500 - sparklineLength * 1.08)}
                      filter="drop-shadow(0 0 8px #6366f1)"
                    />
                  </svg>
                </div>

                {/* Sub-Metrics Footer */}
                <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                  <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: 8 }}>
                    <div style={{ color: '#64748b', fontSize: 11 }}>Inference Speed</div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 17, marginTop: 2 }}>840 tok/s</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.02)', padding: '10px 14px', borderRadius: 8 }}>
                    <div style={{ color: '#64748b', fontSize: 11 }}>Reliability SLA</div>
                    <div style={{ color: '#06b6d4', fontWeight: 700, fontSize: 17, marginTop: 2 }}>99.98%</div>
                  </div>
                </div>
              </div>

              {/* Swarm Status Panel */}
              <div
                style={{
                  flex: 0.9,
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 14,
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: 14 }}>Active Swarm Agents</span>
                {['Code Architect', 'Motion Synthesizer', 'Continuous Director'].map((agent, i) => (
                  <div
                    key={agent}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                      <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 500 }}>{agent}</span>
                    </div>
                    <span style={{ color: '#64748b', fontSize: 11 }}>Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* ACT 4: GRAND CLIMAX & 100% CIRCULAR GAUGE (Frames 335 - 450)        */}
        {/* =================================================================== */}
        {act4Visible && (
          <div
            style={{
              position: 'absolute',
              transform: `translate3d(380px, 0, 0) scale(${act4Spring})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              opacity: act4Spring,
            }}
          >
            {/* Top Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 9999,
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.25)',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
              <span style={{ color: '#f8fafc', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em' }}>
                PRODUCTION CERTIFIED
              </span>
            </div>

            {/* Glowing Dual Cards: 100% Circular Gauge + Motion Standards */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {/* Left Gauge Box */}
              <div
                style={{
                  width: 240,
                  height: 250,
                  borderRadius: 20,
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(168, 85, 247, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <div style={{ position: 'relative', width: 140, height: 140 }}>
                  <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx={70} cy={70} r={55} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth={10} />
                    <circle
                      cx={70}
                      cy={70}
                      r={55}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth={10}
                      strokeDasharray={2 * Math.PI * 55}
                      strokeDashoffset={2 * Math.PI * 55 * (1 - gaugePercent / 100)}
                      strokeLinecap="round"
                      filter="drop-shadow(0 0 10px #a855f7)"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: 28,
                    }}
                  >
                    {Math.round(gaugePercent)}%
                  </div>
                </div>
                <span style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em' }}>
                  SYSTEM QUALITY
                </span>
              </div>

              {/* Right Standard Card */}
              <div
                style={{
                  width: 380,
                  height: 250,
                  borderRadius: 20,
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(6, 182, 212, 0.25)',
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  <div style={{ color: '#ffffff', fontWeight: 800, fontSize: 20, letterSpacing: '-0.01em' }}>
                    CLAUDE FLUID STANDARD
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>
                    ✓ One-Take 6-DOF Virtual Camera<br />
                    ✓ Unbroken living energy conduit<br />
                    ✓ Single persistent 2.5D world space<br />
                    ✓ 0-cutaway continuous momentum
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                    VERIFIED
                  </span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                    100% FLUID
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 4. THE LIVING ENERGY CONDUIT PARTICLES (TOPMOST SCREEN OVERLAY)       */}
      {/* ===================================================================== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Outer radial glow halo */}
        <div
          style={{
            position: 'absolute',
            left: conduitX - 40,
            top: conduitY - 40,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${conduitGlow} 0%, transparent 70%)`,
            filter: 'blur(12px)',
            opacity: 0.85,
          }}
        />

        {/* Core luminous particle bead */}
        <div
          style={{
            position: 'absolute',
            left: conduitX - 7,
            top: conduitY - 7,
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: `0 0 14px 4px ${conduitGlow}, 0 0 28px 8px ${conduitGlow}88`,
          }}
        />
      </div>
    </div>
  );
};

export const ClaudeFluidShowreel: React.FC = () => {
  return (
    <Composition
      id="ClaudeFluidShowreel"
      component={ClaudeFluidShowreelContent}
      durationInFrames={CLAUDE_FLUID_DURATION}
      fps={CLAUDE_FLUID_FPS}
      width={CLAUDE_FLUID_WIDTH}
      height={CLAUDE_FLUID_HEIGHT}
    />
  );
};
