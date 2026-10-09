/**
 * ============================================================================
 * CLAUDE MOTION DESIGN SYSTEM: KINETIC TYPOGRAPHY
 * ============================================================================
 * 
 * Signature text animation components:
 * - Word/token spring stagger cascade
 * - Multicolored radiant gradient text spans
 * - Status pills and glowing category badges
 * - Frame-accurate subtitle/caption displays with zero subpixel jitter
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

// ----------------------------------------------------------------------------
// 1. KINETIC BADGE PILL
// ----------------------------------------------------------------------------
export interface BadgePillProps {
  text: string;
  icon?: React.ReactNode;
  accentColor?: string;
  delayFrames?: number;
  style?: React.CSSProperties;
}

export const BadgePill: React.FC<BadgePillProps> = ({
  text,
  icon,
  accentColor = '#38bdf8',
  delayFrames = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        borderRadius: 9999,
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        border: `1px solid ${accentColor}44`,
        boxShadow: `0 0 16px ${accentColor}22`,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 12}px) scale(${0.9 + entrance * 0.1})`,
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {/* Glowing Pulsing Status Dot */}
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: accentColor,
          boxShadow: `0 0 8px ${accentColor}`,
          display: 'inline-block',
        }}
      />
      <span
        style={{
          color: '#f8fafc',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {text}
      </span>
      {icon}
    </div>
  );
};

// ----------------------------------------------------------------------------
// 2. KINETIC HEADLINE (WORD-BY-WORD STAGGER REVEAL)
// ----------------------------------------------------------------------------
export interface KineticHeadlineProps {
  text: string;
  highlightWords?: string[];
  gradientColors?: [string, string, string];
  delayFrames?: number;
  fontSize?: number;
  style?: React.CSSProperties;
  lineHeight?: number;
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  highlightWords = [],
  gradientColors = ['#38bdf8', '#818cf8', '#c084fc'],
  delayFrames = 5,
  fontSize = 52,
  lineHeight = 1.15,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <h1
      style={{
        fontSize,
        lineHeight,
        fontWeight: 800,
        margin: 0,
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${fontSize * 0.28}px`,
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const wordDelay = delayFrames + idx * 3;
        const s = spring({
          frame: Math.max(0, frame - wordDelay),
          fps,
          config: { damping: 13, mass: 0.5, stiffness: 130 },
        });

        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        const wordStyle: React.CSSProperties = isHighlight
          ? {
              backgroundImage: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: `drop-shadow(0 0 24px ${gradientColors[1]}44)`,
            }
          : {
              color: '#f8fafc',
            };

        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              opacity: s,
              transform: `translateY(${(1 - s) * 20}px) scale(${0.92 + s * 0.08})`,
              ...wordStyle,
            }}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
};

// ----------------------------------------------------------------------------
// 3. SUBTITLE CALLOUT
// ----------------------------------------------------------------------------
export interface SubtitleCalloutProps {
  text: string;
  delayFrames?: number;
  fontSize?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const SubtitleCallout: React.FC<SubtitleCalloutProps> = ({
  text,
  delayFrames = 20,
  fontSize = 22,
  color = '#94a3b8', // slate-400
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 110 },
  });

  return (
    <p
      style={{
        margin: 0,
        fontSize,
        lineHeight: 1.5,
        color,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: 780,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 16}px)`,
        ...style,
      }}
    >
      {text}
    </p>
  );
};
