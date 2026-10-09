/**
 * ============================================================================
 * CLAUDE MOTION DESIGN SYSTEM: METRIC CARD & DATA INFOGRAPHICS
 * ============================================================================
 * 
 * Signature data visualization components:
 * - Interpolated animated numeric counters (0 -> Target with ease-out)
 * - Spring-loaded horizontal progress fill bars
 * - Circular gauge / donut completion rings
 * - Upward/downward delta badges (+38.4% YoY)
 * - Glassmorphic stat cards
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { GlassContainer } from './GlassContainer';

// ----------------------------------------------------------------------------
// 1. STAT METRIC CARD
// ----------------------------------------------------------------------------
export interface MetricCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  deltaText?: string;
  isPositiveDelta?: boolean;
  accentColor?: string;
  delayFrames?: number;
  durationFrames?: number;
  width?: number;
  height?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  deltaText,
  isPositiveDelta = true,
  accentColor = '#38bdf8',
  delayFrames = 0,
  durationFrames = 45,
  width = 340,
  height = 190,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Numeric count-up animation
  const countProgress = interpolate(
    frame,
    [delayFrames, delayFrames + durationFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const displayNum = (value * countProgress).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  // Delta badge bounce entrance
  const badgeEntrance = spring({
    frame: Math.max(0, frame - (delayFrames + durationFrames * 0.45)),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });

  return (
    <GlassContainer
      width={width}
      height={height}
      delayFrames={delayFrames}
      accentColor={accentColor}
      style={{
        padding: '24px 26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Row: Label & Delta Badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#94a3b8', // slate-400
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {label}
        </span>

        {deltaText && (
          <div
            style={{
              padding: '4px 10px',
              borderRadius: 9999,
              backgroundColor: isPositiveDelta
                ? 'rgba(16, 185, 129, 0.15)'
                : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${
                isPositiveDelta
                  ? 'rgba(16, 185, 129, 0.35)'
                  : 'rgba(239, 68, 68, 0.35)'
              }`,
              color: isPositiveDelta ? '#34d399' : '#f87171',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'system-ui, sans-serif',
              opacity: badgeEntrance,
              transform: `scale(${0.8 + badgeEntrance * 0.2})`,
            }}
          >
            {deltaText}
          </div>
        )}
      </div>

      {/* Hero Metric Number */}
      <div
        style={{
          fontSize: 50,
          fontWeight: 800,
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
          textShadow: `0 0 28px ${accentColor}33`,
        }}
      >
        {prefix && (
          <span style={{ fontSize: 32, color: accentColor, fontWeight: 700 }}>
            {prefix}
          </span>
        )}
        <span>{displayNum}</span>
        {suffix && (
          <span style={{ fontSize: 30, color: '#94a3b8', fontWeight: 600 }}>
            {suffix}
          </span>
        )}
      </div>

      {/* Micro-Progress Bar Fill */}
      <div
        style={{
          width: '100%',
          height: 5,
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.min(100, countProgress * 100)}%`,
            background: `linear-gradient(90deg, ${accentColor}88, ${accentColor})`,
            borderRadius: 3,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
      </div>
    </GlassContainer>
  );
};

// ----------------------------------------------------------------------------
// 2. CIRCULAR DONUT GAUGE
// ----------------------------------------------------------------------------
export interface CircularGaugeProps {
  percentage: number; // 0 - 100
  label: string;
  accentColor?: string;
  size?: number;
  delayFrames?: number;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  percentage,
  label,
  accentColor = '#38bdf8',
  size = 150,
  delayFrames = 10,
}) => {
  const frame = useCurrentFrame();
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = interpolate(
    frame,
    [delayFrames, delayFrames + 50],
    [0, percentage / 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Glowing Animated Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter={`drop-shadow(0 0 8px ${accentColor})`}
          />
        </svg>

        {/* Center Percentage Display */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: size * 0.24,
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>

      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </span>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 3. SPRING BAR CHART VISUALIZER
// ----------------------------------------------------------------------------
export interface BarItem {
  label: string;
  value: number; // percentage 0 - 100
  color?: string;
}

export interface BarChartVisualizerProps {
  items: BarItem[];
  delayFrames?: number;
  width?: number;
}

export const BarChartVisualizer: React.FC<BarChartVisualizerProps> = ({
  items,
  delayFrames = 15,
  width = 720,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {items.map((item, idx) => {
        const itemDelay = delayFrames + idx * 6;
        const progress = spring({
          frame: Math.max(0, frame - itemDelay),
          fps,
          config: { damping: 14, mass: 0.6, stiffness: 120 },
        });

        const barWidth = `${Math.min(100, item.value * progress)}%`;
        const accent = item.color || '#38bdf8';

        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 13,
                fontWeight: 600,
                color: '#cbd5e1',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              <span>{item.label}</span>
              <span style={{ color: accent, fontWeight: 700 }}>
                {Math.round(item.value * progress)}%
              </span>
            </div>

            <div
              style={{
                width: '100%',
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: barWidth,
                  background: `linear-gradient(90deg, ${accent}88, ${accent})`,
                  borderRadius: 5,
                  boxShadow: `0 0 10px ${accent}66`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
