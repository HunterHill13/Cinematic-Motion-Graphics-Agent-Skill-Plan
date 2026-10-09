/**
 * ============================================================================
 * CLAUDE MOTION SHOWCASE BENCHMARK COMPOSITION
 * ============================================================================
 * 
 * Demonstrates the true "Claude Motion" standard:
 * - Dark-mode glassmorphic aesthetic (Slate-950 / Cyan-400 / Indigo-500)
 * - Native Remotion spring() physics and inline interpolate()
 * - Kinetic Typography with word-by-word stagger cascade
 * - Interactive multi-agent architecture flow diagram with traveling data packets
 * - Real-time animated metric counters and donut progress gauges
 * 
 * Duration: 360 Frames (12.0 Seconds @ 30 FPS, 1920x1080 Landscape)
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, Sequence, spring, interpolate, Easing } from 'remotion';
import {
  AtmosphericBackdrop,
  GlassContainer,
  BadgePill,
  KineticHeadline,
  SubtitleCallout,
  MetricCard,
  CircularGauge,
  FlowDiagram,
  FlowNodeData,
  FlowConnection,
  BarChartVisualizer,
} from '../library';

export const CLAUDE_BENCHMARK_FRAMES = 360;
export const CLAUDE_BENCHMARK_WIDTH = 1920;
export const CLAUDE_BENCHMARK_HEIGHT = 1080;

export const ClaudeMotionBenchmark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --------------------------------------------------------------------------
  // CAMERA DRIFT (Subtle cinematic push-in across the composition)
  // --------------------------------------------------------------------------
  const cameraZoom = interpolate(frame, [0, CLAUDE_BENCHMARK_FRAMES], [1.0, 1.05], {
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        width: CLAUDE_BENCHMARK_WIDTH,
        height: CLAUDE_BENCHMARK_HEIGHT,
        position: 'relative',
        backgroundColor: '#020617',
        overflow: 'hidden',
        transform: `scale(${cameraZoom})`,
        transformOrigin: 'center center',
      }}
    >
      {/* PERSISTENT BACKGROUND ATMOSPHERE */}
      <AtmosphericBackdrop primaryGlowColor="#38bdf8" secondaryGlowColor="#818cf8" />

      {/* ================================================================== */}
      {/* SCENE 1: KINETIC HOOK & TITLE (Frames 0 - 95 / 0.0s - 3.1s)        */}
      {/* ================================================================== */}
      <Sequence from={0} durationInFrames={95}>
        {(() => {
          const sceneExit = interpolate(frame, [80, 95], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.in(Easing.quad),
          });

          return (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '120px 140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                opacity: sceneExit,
                transform: `scale(${0.96 + sceneExit * 0.04})`,
              }}
            >
              <BadgePill
                text="AI COGNITIVE ARCHITECTURE"
                accentColor="#38bdf8"
                delayFrames={6}
                style={{ marginBottom: 28 }}
              />

              <KineticHeadline
                text="AUTONOMOUS REASONING IN MOTION"
                highlightWords={['REASONING', 'MOTION']}
                gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
                fontSize={64}
                delayFrames={12}
                style={{ marginBottom: 24, maxWidth: 1100 }}
              />

              <SubtitleCallout
                text="Deterministic orchestration across federated model endpoints with sub-millisecond multi-agent cognitive routing."
                delayFrames={24}
                fontSize={24}
                style={{ marginBottom: 48 }}
              />

              {/* Status Spec Preview Card */}
              <GlassContainer
                width={520}
                height={80}
                delayFrames={35}
                accentColor="#38bdf8"
                style={{
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#34d399',
                      boxShadow: '0 0 10px #34d399',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#f8fafc',
                      fontFamily: 'system-ui, sans-serif',
                    }}
                  >
                    Neural Cluster: Active (Cluster A-09)
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                  }}
                >
                  0.42ms RTT
                </span>
              </GlassContainer>
            </div>
          );
        })()}
      </Sequence>

      {/* ================================================================== */}
      {/* SCENE 2: INTERACTIVE FLOW DIAGRAM (Frames 90 - 215 / 3.0s - 7.1s)  */}
      {/* ================================================================== */}
      <Sequence from={90} durationInFrames={125}>
        {(() => {
          const localFrame = frame - 90;
          const sceneEntrance = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 120 },
          });
          const sceneExit = interpolate(localFrame, [110, 125], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Sequence-local node activation frames
          const nodes: FlowNodeData[] = [
            {
              id: 'input',
              title: 'Sensory Stream',
              subtitle: 'Raw Multimodal Inputs',
              iconText: '📥',
              color: '#38bdf8',
              x: 320,
              y: 420,
              activationFrame: 5,
            },
            {
              id: 'router',
              title: 'Cognitive Router',
              subtitle: 'Intent & Task Dispatch',
              iconText: '⚙️',
              color: '#818cf8',
              x: 740,
              y: 310,
              activationFrame: 45,
            },
            {
              id: 'neural',
              title: 'Deep Reasoner',
              subtitle: 'Federated Model Core',
              iconText: '🧠',
              color: '#c084fc',
              x: 1180,
              y: 310,
              activationFrame: 85,
            },
            {
              id: 'dispatch',
              title: 'Action Dispatch',
              subtitle: 'Autonomous Execution',
              iconText: '🚀',
              color: '#34d399',
              x: 1600,
              y: 420,
              activationFrame: 115,
            },
          ];

          // Sequence-local connection pulses
          const connections: FlowConnection[] = [
            {
              fromId: 'input',
              toId: 'router',
              startFrame: 10,
              durationFrames: 35,
              color: '#38bdf8',
            },
            {
              fromId: 'router',
              toId: 'neural',
              startFrame: 50,
              durationFrames: 35,
              color: '#818cf8',
            },
            {
              fromId: 'neural',
              toId: 'dispatch',
              startFrame: 90,
              durationFrames: 25,
              color: '#c084fc',
            },
          ];

          return (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '80px 140px',
                opacity: Math.min(sceneEntrance, sceneExit),
                transform: `scale(${0.96 + sceneEntrance * 0.04})`,
              }}
            >
              {/* Scene Header */}
              <div style={{ marginBottom: 32 }}>
                <BadgePill text="PIPELINE EXECUTION" accentColor="#818cf8" delayFrames={0} />
                <h2
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: '#ffffff',
                    fontFamily: 'system-ui, sans-serif',
                    margin: '12px 0 6px 0',
                  }}
                >
                  Federated Multi-Agent Dataflow
                </h2>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: 18 }}>
                  Continuous packet traversal with verification handoffs at each layer.
                </p>
              </div>

              {/* Flow Architecture Diagram */}
              <div style={{ position: 'relative', width: '100%', height: 480 }}>
                <FlowDiagram nodes={nodes} connections={connections} delayFrames={0} />
              </div>

              {/* Real-time Telemetry Status Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <GlassContainer
                  width={840}
                  height={64}
                  delayFrames={20}
                  accentColor="#38bdf8"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '0 32px',
                  }}
                >
                  <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
                    CONCURRENCY: <strong style={{ color: '#ffffff' }}>128 THREADS</strong>
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                  <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
                    STREAM INTEGRITY: <strong style={{ color: '#34d399' }}>100% AUDITED</strong>
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                  <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
                    ROUTING OVERHEAD: <strong style={{ color: '#38bdf8' }}>0.08ms</strong>
                  </span>
                </GlassContainer>
              </div>
            </div>
          );
        })()}
      </Sequence>

      {/* ================================================================== */}
      {/* SCENE 3: METRIC CARDS & DATA VISUALIZER (Frames 210 - 305 / 7.0s)  */}
      {/* ================================================================== */}
      <Sequence from={210} durationInFrames={95}>
        {(() => {
          const localFrame = frame - 210;
          const sceneEntrance = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 120 },
          });
          const sceneExit = interpolate(localFrame, [80, 95], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '80px 140px',
                opacity: Math.min(sceneEntrance, sceneExit),
                transform: `scale(${0.96 + sceneEntrance * 0.04})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Scene Header */}
              <div style={{ marginBottom: 36 }}>
                <BadgePill text="PERFORMANCE BENCHMARKS" accentColor="#34d399" delayFrames={0} />
                <h2
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: '#ffffff',
                    fontFamily: 'system-ui, sans-serif',
                    margin: '12px 0 6px 0',
                  }}
                >
                  Production Reliability & Scale
                </h2>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: 18 }}>
                  Empirically verified metrics under high-throughput concurrent loads.
                </p>
              </div>

              {/* Metric Row 1: 3 Big Stats */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 32,
                  marginBottom: 32,
                }}
              >
                {/* Metric 1 */}
                <MetricCard
                  label="Response Acceleration"
                  value={4.8}
                  suffix="x"
                  decimals={1}
                  deltaText="+82% FASTER"
                  isPositiveDelta={true}
                  accentColor="#38bdf8"
                  delayFrames={4}
                  durationFrames={40}
                  width={360}
                  height={175}
                />

                {/* Metric 2 */}
                <MetricCard
                  label="Precision Accuracy"
                  value={99.9}
                  suffix="%"
                  decimals={1}
                  deltaText="ZERO REGRESS"
                  isPositiveDelta={true}
                  accentColor="#818cf8"
                  delayFrames={10}
                  durationFrames={40}
                  width={360}
                  height={175}
                />

                {/* Metric 3 */}
                <MetricCard
                  label="Throughput Scaling"
                  value={1450}
                  prefix=""
                  suffix=" req/s"
                  decimals={0}
                  deltaText="+34% CAP"
                  isPositiveDelta={true}
                  accentColor="#34d399"
                  delayFrames={16}
                  durationFrames={40}
                  width={360}
                  height={175}
                />

                {/* Donut Gauge */}
                <div
                  style={{
                    padding: '18px 30px',
                    borderRadius: 20,
                    backgroundColor: 'rgba(15, 23, 42, 0.72)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 175,
                    boxSizing: 'border-box',
                  }}
                >
                  <CircularGauge
                    percentage={99.9}
                    label="Uptime SLA"
                    accentColor="#38bdf8"
                    size={115}
                    delayFrames={10}
                  />
                </div>
              </div>

              {/* Metric Row 2: Comparative Resource Optimization Bars */}
              <GlassContainer
                width="100%"
                height={140}
                delayFrames={24}
                accentColor="#818cf8"
                style={{
                  padding: '20px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ maxWidth: 320 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff' }}>
                    Resource Efficiency Breakdown
                  </span>
                  <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#94a3b8' }}>
                    Normalized token consumption compared to monolithic single-prompt loops.
                  </p>
                </div>

                <div style={{ flex: 1, marginLeft: 48 }}>
                  <BarChartVisualizer
                    items={[
                      { label: 'Token Redundancy Elimination', value: 88, color: '#38bdf8' },
                      { label: 'Memory Cache Re-Hit Efficiency', value: 94, color: '#34d399' },
                    ]}
                    delayFrames={26}
                    width={780}
                  />
                </div>
              </GlassContainer>
            </div>
          );
        })()}
      </Sequence>

      {/* ================================================================== */}
      {/* SCENE 4: CLIMAX & PERSISTENT RESOLUTION (Frames 300 - 360 / 10.0s) */}
      {/* ================================================================== */}
      <Sequence from={300} durationInFrames={60}>
        {(() => {
          const localFrame = frame - 300;
          const sceneEntrance = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, mass: 0.6, stiffness: 120 },
          });

          return (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '120px 140px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                opacity: sceneEntrance,
                transform: `scale(${0.94 + sceneEntrance * 0.06})`,
              }}
            >
              <BadgePill
                text="ENTERPRISE READY"
                accentColor="#c084fc"
                delayFrames={0}
                style={{ marginBottom: 28 }}
              />

              <KineticHeadline
                text="THE FUTURE OF AGENTIC MOTION"
                highlightWords={['AGENTIC', 'MOTION']}
                gradientColors={['#c084fc', '#818cf8', '#38bdf8']}
                fontSize={64}
                delayFrames={6}
                style={{ marginBottom: 20, justifyContent: 'center', maxWidth: 1200 }}
              />

              <SubtitleCallout
                text="Transform ideas, complex architectures, and data into captivating motion pictures with code-level precision."
                delayFrames={16}
                fontSize={22}
                style={{ marginBottom: 40, textAlign: 'center' }}
              />

              {/* Action Banner */}
              <GlassContainer
                width={480}
                height={64}
                delayFrames={24}
                accentColor="#38bdf8"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  padding: '12px 24px',
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  Deployed on Google Antigravity & Remotion
                </span>
                <span style={{ fontSize: 18 }}>⚡</span>
              </GlassContainer>
            </div>
          );
        })()}
      </Sequence>
    </div>
  );
};
