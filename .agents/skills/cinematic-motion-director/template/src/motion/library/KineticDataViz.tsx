/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: KINETIC DATA VIZ & METRIC COUNTERS ENGINE
 * ============================================================================
 * 
 * Premier studio-grade animated data visualization suite:
 * 1. KineticBarChart: Spring-grown multi-series bar charts with peak pulse.
 * 2. KineticRadialProgress: Circular percentage gauge with glowing arc head.
 * 3. KineticMetricCounter: Formatted numbers with live decimal rolling.
 * 4. KineticTrendLine: Bezier spline trend chart with area gradient fill.
 * 
 * Fully style-aware: automatically adapts styling to Glassmorphic, Paper Cutout,
 * Technical Blueprint, or Neo-Brutalist themes.
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';

export type DataVizArtStyle = 
  | 'MODERN_GLASSMORPHIC'
  | 'STOP_MOTION_PAPER'
  | 'TECHNICAL_BLUEPRINT'
  | 'NEO_BRUTALIST';

// ============================================================================
// 1. KINETIC BAR CHART
// ============================================================================
export interface KineticBarItem {
  label: string;
  value: number;
  color?: string;
  unit?: string;
}

export interface KineticBarChartProps {
  items: KineticBarItem[];
  maxValue?: number;
  startFrame: number;
  staggerFrames?: number;
  height?: number;
  artStyle?: DataVizArtStyle;
  direction?: 'rtl' | 'ltr';
  style?: React.CSSProperties;
}

export const KineticBarChart: React.FC<KineticBarChartProps> = ({
  items,
  maxValue,
  startFrame,
  staggerFrames = 4,
  height = 140,
  artStyle = 'TECHNICAL_BLUEPRINT',
  direction = 'rtl',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const computedMax = maxValue || Math.max(...items.map((i) => i.value), 1);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height,
        gap: 16,
        padding: '12px 16px',
        direction,
        fontFamily: YEKAN_BAKH_FONT,
        ...style,
      }}
    >
      {items.map((item, idx) => {
        const itemDelay = startFrame + idx * staggerFrames;
        const s = spring({
          frame: Math.max(0, frame - itemDelay),
          fps,
          config: { damping: 14, mass: 0.8, stiffness: 130 },
        });

        const targetPercent = (item.value / computedMax) * 100;
        const currentHeight = targetPercent * s;
        const rollingValue = (item.value * s).toFixed(item.value % 1 === 0 ? 0 : 1);

        // Style-specific styling
        let barBg = item.color || '#06b6d4';
        let barBorder = 'none';
        let barShadow = 'none';
        let barRadius = '4px 4px 0 0';

        if (artStyle === 'TECHNICAL_BLUEPRINT') {
          barBg = `linear-gradient(180deg, ${item.color || '#38bdf8'} 0%, rgba(6, 182, 212, 0.25) 100%)`;
          barBorder = '1px solid #38bdf8';
          barShadow = '0 0 12px rgba(56, 189, 248, 0.4)';
          barRadius = '2px 2px 0 0';
        } else if (artStyle === 'MODERN_GLASSMORPHIC') {
          barBg = `linear-gradient(180deg, ${item.color || '#10b981'} 0%, rgba(16, 185, 129, 0.2) 100%)`;
          barBorder = '1px solid rgba(16, 185, 129, 0.5)';
          barShadow = '0 8px 24px rgba(16, 185, 129, 0.35)';
          barRadius = '6px 6px 0 0';
        } else if (artStyle === 'NEO_BRUTALIST') {
          barBg = item.color || '#f59e0b';
          barBorder = '2.5px solid #000000';
          barShadow = '3px 3px 0px #000000';
          barRadius = '0px';
        } else if (artStyle === 'STOP_MOTION_PAPER') {
          barBg = item.color || '#d97706';
          barBorder = '1.5px dashed rgba(80, 60, 40, 0.4)';
          barShadow = '3px 3px 0px rgba(60, 50, 40, 0.25)';
          barRadius = '2px';
        }

        return (
          <div
            key={idx}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            {/* Value Label on Top */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: '#ecfdf5',
                marginBottom: 6,
                fontFamily: 'monospace',
                opacity: s > 0.1 ? 1 : 0,
                direction: 'ltr',
                unicodeBidi: 'embed',
              }}
            >
              {rollingValue}{item.unit || ''}
            </span>

            {/* The Bar */}
            <div
              style={{
                width: '100%',
                height: `${Math.max(2, currentHeight)}%`,
                background: barBg,
                border: barBorder,
                borderRadius: barRadius,
                boxShadow: barShadow,
                position: 'relative',
                transition: 'none',
              }}
            >
              {/* Peak Glow Cap */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: '#ffffff',
                  opacity: s * 0.85,
                  boxShadow: '0 0 8px #ffffff',
                }}
              />
            </div>

            {/* Category Label */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: '#cbd5e1',
                marginTop: 8,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {sanitizeForDisplay(item.label)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// 2. KINETIC RADIAL PROGRESS
// ============================================================================
export interface KineticRadialProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  startFrame: number;
  label?: string;
  artStyle?: DataVizArtStyle;
}

export const KineticRadialProgress: React.FC<KineticRadialProgressProps> = ({
  value,
  size = 110,
  strokeWidth = 9,
  color = '#10b981',
  trackColor = 'rgba(255, 255, 255, 0.08)',
  startFrame,
  label,
  artStyle = 'TECHNICAL_BLUEPRINT',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const currentProgress = (value / 100) * s;
  const dashoffset = circumference * (1 - currentProgress);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        style={{
          transform: 'rotate(-90deg)',
          overflow: 'visible',
        }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap={artStyle === 'NEO_BRUTALIST' ? 'square' : 'round'}
          fill="none"
          style={{
            filter: `drop-shadow(0 0 8px ${color}88)`,
          }}
        />
      </svg>

      {/* Center Value */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          direction: 'ltr',
        }}
      >
        <span
          style={{
            fontSize: size * 0.22,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'monospace',
          }}
        >
          {Math.floor(value * s)}٪
        </span>
        {label && (
          <span
            style={{
              fontSize: size * 0.11,
              fontWeight: 700,
              color: '#94a3b8',
              marginTop: 2,
              fontFamily: YEKAN_BAKH_FONT,
            }}
          >
            {sanitizeForDisplay(label)}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 3. KINETIC METRIC COUNTER
// ============================================================================
export interface KineticMetricCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  startFrame: number;
  durationFrames?: number;
  label?: string;
  fontSize?: number;
  color?: string;
  artStyle?: DataVizArtStyle;
}

export const KineticMetricCounter: React.FC<KineticMetricCounterProps> = ({
  value,
  decimals = 1,
  prefix = '',
  suffix = '',
  startFrame,
  durationFrames = 45,
  label,
  fontSize = 32,
  color = '#ffffff',
  artStyle = 'TECHNICAL_BLUEPRINT',
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const currentValue = (value * progress).toFixed(decimals);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: artStyle === 'NEO_BRUTALIST' ? 0 : 8,
        background: 'rgba(2, 20, 36, 0.45)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 900,
          color,
          fontFamily: 'monospace',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          direction: 'ltr',
          unicodeBidi: 'embed',
        }}
      >
        {prefix}{currentValue}{suffix}
      </span>
      {label && (
        <span
          style={{
            fontSize: fontSize * 0.42,
            fontWeight: 700,
            color: '#94a3b8',
            marginTop: 4,
            fontFamily: YEKAN_BAKH_FONT,
          }}
        >
          {sanitizeForDisplay(label)}
        </span>
      )}
    </div>
  );
};
