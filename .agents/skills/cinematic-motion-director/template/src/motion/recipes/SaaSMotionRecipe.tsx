import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface SaaSMotionProps {
  appName?: string;
  headline?: string;
  tagline?: string;
  delayFrames?: number;
}

/**
 * SaaSMotionRecipe: Professional SaaS product launch frame with 2.5D perspective
 */
export const SaaSMotionRecipe: React.FC<SaaSMotionProps> = ({
  appName = 'NEXUS CLOUD AI',
  headline = 'Scale Your Intelligence',
  tagline = 'Autonomous Multi-Agent Orchestration at Enterprise Speed',
  delayFrames = 0,
}) => {
  const globalFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frame = Math.max(0, globalFrame - delayFrames);

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 100 },
  });

  // Perspective tilt & float
  const floatY = Math.sin(frame * 0.05) * 6;
  const rotateX = interpolate(frame, [0, 60], [12, 4], { extrapolateRight: 'clamp' });
  const rotateY = interpolate(frame, [0, 60], [-8, -2], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1200,
        position: 'relative',
      }}
    >
      {/* Top Header & Tagline */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 32,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          translate: `0px ${interpolate(frame, [0, 20], [-20, 0], { extrapolateRight: 'clamp' })}px`,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#818cf8',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            marginBottom: 12,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#818cf8', boxShadow: '0 0 8px #818cf8' }} />
          {appName}
        </div>
        <h2
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 44,
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 18,
            color: '#94a3b8',
            margin: '8px 0 0 0',
          }}
        >
          {tagline}
        </p>
      </div>

      {/* 2.5D SaaS Window Mockup */}
      <div
        style={{
          width: 960,
          height: 520,
          borderRadius: 20,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.8), 0 0 80px -20px rgba(99, 102, 241, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${floatY}px) scale(${enterSpring})`,
          position: 'relative',
        }}
      >
        {/* Specular top highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
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
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <div
            style={{
              padding: '4px 16px',
              borderRadius: 6,
              background: 'rgba(255, 255, 255, 0.04)',
              color: '#64748b',
              fontSize: 12,
              fontFamily: 'monospace',
            }}
          >
            nexus.ai/app/dashboard
          </div>
          <div style={{ width: 40 }} />
        </div>

        {/* Main Interface Layout */}
        <div style={{ flex: 1, display: 'flex', padding: 24, gap: 24 }}>
          {/* Left Column: Visual Metrics */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Realtime Chart */}
            <div
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 600 }}>Active Agent Throughput</span>
                <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>+418% vs Baseline</span>
              </div>

              {/* Animated SVG Sparkline / Area Chart */}
              <div style={{ flex: 1, position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,140 Q100,120 180,90 T350,50 T500,20 L500,160 L0,160 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M0,140 Q100,120 180,90 T350,50 T500,20"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Mini Metrics Row */}
            <div style={{ display: 'flex', gap: 16, height: 90 }}>
              <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.05)', padding: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Inference Speed</div>
                <div style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, marginTop: 4 }}>
                  {Math.round(interpolate(frame, [15, 45], [0, 840], { extrapolateRight: 'clamp' }))} tok/s
                </div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.05)', padding: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>Reliability SLA</div>
                <div style={{ color: '#06b6d4', fontSize: 20, fontWeight: 700, marginTop: 4 }}>99.98%</div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Agent Tasks Feed */}
          <div
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <span style={{ color: '#cbd5e1', fontSize: 14, fontWeight: 600 }}>Active Swarms</span>
            {['Code Architect', 'Security Auditor', 'Performance Benchmarker'].map((agent, i) => (
              <div
                key={agent}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: interpolate(frame, [20 + i * 10, 35 + i * 10], [0, 1], { extrapolateRight: 'clamp' }),
                  translate: `0px ${interpolate(frame, [20 + i * 10, 35 + i * 10], [10, 0], { extrapolateRight: 'clamp' })}px`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ color: '#f1f5f9', fontSize: 12, fontWeight: 500 }}>{agent}</span>
                </div>
                <span style={{ color: '#64748b', fontSize: 10 }}>Running</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
