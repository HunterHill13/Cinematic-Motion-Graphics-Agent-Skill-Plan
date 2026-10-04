import React from 'react';
import { interpolate, Easing } from 'remotion';

interface KineticTextProps {
  text: string;
  frame: number;
  startFrame: number;
  duration?: number;
  style?: React.CSSProperties;
  splitBy?: 'words' | 'chars' | 'line';
  color?: string;
  highlightWords?: string[];
  highlightColor?: string;
}

/**
 * Premium Kinetic Typography component for editorial motion graphics.
 * Features mask reveals, tracking expansion, and motivated word highlighting.
 */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  frame,
  startFrame,
  duration = 25,
  style = {},
  splitBy = 'words',
  color = '#F8FAFC',
  highlightWords = [],
  highlightColor = '#D4AF37',
}) => {
  if (splitBy === 'line') {
    const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

    const translateY = interpolate(progress, [0, 1], [30, 0]);
    const opacity = interpolate(progress, [0, 0.6], [0, 1], { extrapolateRight: 'clamp' });
    const tracking = interpolate(progress, [0, 1], [-1.5, 0]);

    return (
      <div
        style={{
          overflow: 'hidden',
          display: 'inline-block',
          ...style,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            transform: `translateY(${translateY}px)`,
            opacity,
            letterSpacing: `${tracking}px`,
            color,
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  // Word-by-word staggered kinetic reveal
  const words = text.split(' ');
  const staggerFrames = 3;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.3em',
        direction: 'rtl',
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const wordStart = startFrame + idx * staggerFrames;
        const progress = interpolate(frame, [wordStart, wordStart + duration], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });

        const translateY = interpolate(progress, [0, 1], [24, 0]);
        const opacity = interpolate(progress, [0, 0.7], [0, 1], { extrapolateRight: 'clamp' });
        const isHighlighted = highlightWords.includes(word);

        return (
          <span
            key={idx}
            style={{
              overflow: 'hidden',
              display: 'inline-block',
              verticalAlign: 'top',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${translateY}px)`,
                opacity,
                color: isHighlighted ? highlightColor : color,
                fontWeight: isHighlighted ? 900 : style.fontWeight || 700,
                textShadow: isHighlighted ? `0 0 20px ${highlightColor}60` : undefined,
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
