import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

export interface EntranceProps {
  children: React.ReactNode;
  delay?: number;
  type?: 'rise' | 'scale' | 'slideLeft' | 'fade';
  style?: React.CSSProperties;
}

/**
 * Premium Entrance - Combines spring opacity, translation, and scale.
 * Eliminates cheap single-property linear fades.
 */
export const Entrance: React.FC<EntranceProps> = ({
  children,
  delay = 0,
  type = 'rise',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: theme.spring.smooth,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  let transform = '';

  switch (type) {
    case 'rise':
      const y = interpolate(progress, [0, 1], [40, 0]);
      const s = interpolate(progress, [0, 1], [0.94, 1]);
      transform = `translateY(${y}px) scale(${s})`;
      break;
    case 'scale':
      const scaleVal = interpolate(progress, [0, 1], [0.8, 1]);
      transform = `scale(${scaleVal})`;
      break;
    case 'slideLeft':
      const x = interpolate(progress, [0, 1], [60, 0]);
      transform = `translateX(${x}px)`;
      break;
    case 'fade':
      transform = 'none';
      break;
  }

  return (
    <div
      style={{
        opacity,
        transform,
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
