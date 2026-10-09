import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface LiveProps {
  children: React.ReactNode;
  /** Frame at which this element yields to the next hero element */
  demoteAt?: number;
  /** Duration of the yielding transition (default 15 frames = 0.5s) */
  demoteDuration?: number;
  /** Target scale when demoted (default 0.92) */
  demoteScale?: number;
  /** Target opacity when demoted (default 0.35) */
  demoteOpacity?: number;
  /** Target blur when demoted (default 3px) */
  demoteBlur?: number;
  style?: React.CSSProperties;
}

/**
 * Live / Hand-off State Machine (forming -> resolved -> handing-off -> gone).
 * Prevents screen clutter when a new subject enters: smoothly scales down, dims,
 * and blurs the previous subject so attention shifts naturally.
 */
export const Live: React.FC<LiveProps> = ({
  children,
  demoteAt = Infinity,
  demoteDuration = 15,
  demoteScale = 0.92,
  demoteOpacity = 0.35,
  demoteBlur = 3,
  style,
}) => {
  const frame = useCurrentFrame();

  let scale = 1.0;
  let opacity = 1.0;
  let blur = 0;

  if (frame >= demoteAt) {
    const p = Math.min(1, Math.max(0, (frame - demoteAt) / demoteDuration));
    scale = interpolate(p, [0, 1], [1.0, demoteScale]);
    opacity = interpolate(p, [0, 1], [1.0, demoteOpacity]);
    blur = interpolate(p, [0, 1], [0, demoteBlur]);
  }

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        transition: 'none',
        willChange: 'transform, opacity, filter',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
