import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export interface KineticTextProps {
  text: string;
  delayFrames?: number;
  highlightWord?: string;
  highlightColor?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number;
  direction?: 'rtl' | 'ltr';
  style?: React.CSSProperties;
}

/**
 * KineticText: Word-by-word kinetic typography with staggered reveal,
 * baseline dynamics, and semantic highlighting.
 */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delayFrames = 0,
  highlightWord,
  highlightColor = '#10b981',
  textColor = '#ffffff',
  fontSize = 36,
  fontWeight = 700,
  direction = 'rtl',
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
        justifyContent: 'center',
        direction,
        gap: '10px 14px',
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const wordDelay = delayFrames + idx * 3; // 3 frames stagger per word
        const adjustedFrame = Math.max(0, frame - wordDelay);

        const wordSpring = spring({
          frame: adjustedFrame,
          fps,
          config: { stiffness: 140, damping: 14 },
        });

        const opacity = interpolate(adjustedFrame, [0, 4], [0, 1], {
          extrapolateRight: 'clamp',
        });
        const translateY = interpolate(wordSpring, [0, 1], [24, 0]);
        const scale = interpolate(wordSpring, [0, 1], [0.85, 1.0]);

        const isHighlight =
          highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());

        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              fontSize,
              fontWeight,
              color: isHighlight ? highlightColor : textColor,
              textShadow: isHighlight
                ? `0 0 24px ${highlightColor}`
                : '0 2px 8px rgba(0,0,0,0.4)',
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              willChange: 'transform, opacity',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
