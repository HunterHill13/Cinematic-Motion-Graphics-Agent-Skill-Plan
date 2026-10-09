/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: MASKED KINETIC TYPOGRAPHY
 * ============================================================================
 * 
 * Signature studio-grade text reveal mechanics:
 * 1. Masked Overflow Bounding Box: Words slide out from an invisible clipping floor.
 * 2. Angular Staggered Spring: Words arrive with a subtle 3-5 deg rotational twist.
 * 3. Persian Medical & Technical Glyph Protection via sanitizeForDisplay.
 * 4. Radiant Gradient Highlighting and High-Contrast Accessibility.
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';

export interface MaskedKineticHeadlineProps {
  text: string;
  highlightWords?: string[];
  gradientColors?: [string, string, string];
  delayFrames?: number;
  staggerFrames?: number;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number;
  color?: string;
  direction?: 'rtl' | 'ltr';
  style?: React.CSSProperties;
}

export const MaskedKineticHeadline: React.FC<MaskedKineticHeadlineProps> = ({
  text,
  highlightWords = [],
  gradientColors = ['#10b981', '#06b6d4', '#f59e0b'],
  delayFrames = 0,
  staggerFrames = 3,
  fontSize = 44,
  lineHeight = 1.25,
  fontWeight = 900,
  color = '#ffffff',
  direction = 'rtl',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split into tokens/words
  const sanitized = sanitizeForDisplay(text);
  const words = sanitized.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${fontSize * 0.24}px`,
        direction,
        justifyContent: direction === 'rtl' ? 'flex-start' : 'flex-start',
        lineHeight,
        fontFamily: YEKAN_BAKH_FONT,
        margin: 0,
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const wordDelay = delayFrames + idx * staggerFrames;
        const s = spring({
          frame: Math.max(0, frame - wordDelay),
          fps,
          config: { damping: 14, mass: 0.6, stiffness: 160 },
        });

        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );

        const wordStyle: React.CSSProperties = isHighlight
          ? {
              backgroundImage: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
            }
          : {
              color,
            };

        // Masked clipping math:
        // Outer wrapper has overflow: hidden. Inner span translates from 120% below floor up to 0%.
        const translateY = (1 - s) * 125; // in %
        const rotate = (1 - s) * (direction === 'rtl' ? -4 : 4); // subtle dynamic kick
        const opacity = interpolate(s, [0, 0.25, 1], [0, 1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
              paddingTop: '0.08em',
              paddingBottom: '0.12em',
              lineHeight: 1.15,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize,
                fontWeight,
                letterSpacing: '-0.02em',
                transform: `translate3d(0, ${translateY}%, 0) rotate(${rotate}deg)`,
                opacity,
                willChange: 'transform, opacity',
                ...wordStyle,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};
