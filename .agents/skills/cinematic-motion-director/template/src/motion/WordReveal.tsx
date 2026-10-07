import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

export interface WordRevealProps {
  text: string;
  delay?: number;
  framesPerWord?: number;
  highlightWordIndex?: number;
  highlightColor?: string;
  style?: React.CSSProperties;
}

/**
 * WordReveal - Reveals typography word-by-word.
 * 
 * WARNING & ANTI-PATTERN ALERT:
 * - This component must NEVER be used as the primary visual event of a beat.
 * - Relying on word bouncing to animate a static card triggers SLIDESHOW SIGNATURE S3.
 * - In cinematic motion design, text should be revealed via physical world mechanics
 *   (mechanical shutters, structural baselines, or laser engraving).
 * - Use WordReveal strictly for subordinate subtitle tracks if needed.
 */
export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  delay = 0,
  framesPerWord = 3,
  highlightWordIndex,
  highlightColor,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.28em',
        fontFamily: theme.fonts.hero,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const p = spring({
          frame: frame - delay - i * framesPerWord,
          fps,
          config: theme.spring.snappy,
        });

        const isHighlight = highlightWordIndex === i;
        const color = isHighlight ? (highlightColor || theme.colors.hero) : 'inherit';

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`,
              color,
              textShadow: isHighlight ? `0 0 35px ${color}` : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
