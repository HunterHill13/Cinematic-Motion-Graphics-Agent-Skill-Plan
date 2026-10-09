import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export type EntranceType =
  | 'fadeUp'
  | 'fadeDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleReveal'
  | 'overshootPop'
  | 'maskReveal'
  | 'springBounce';

export interface MotionEntranceProps {
  children: React.ReactNode;
  type?: EntranceType;
  delayFrames?: number;
  durationFrames?: number;
  overshoot?: boolean;
  style?: React.CSSProperties;
}

/**
 * MotionEntrance: Motion-Design Entrance with Anticipation, Overshoot, and Settle.
 * Replaces raw opacity 0 -> 1 with designed physical choreography.
 */
export const MotionEntrance: React.FC<MotionEntranceProps> = ({
  children,
  type = 'overshootPop',
  delayFrames = 0,
  durationFrames = 25,
  overshoot = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayFrames);

  // Core spring with natural mass and bounce damping
  const springProgress = spring({
    frame: adjustedFrame,
    fps,
    config: overshoot
      ? { stiffness: 120, damping: 12, mass: 0.8 }
      : { stiffness: 90, damping: 16, mass: 1.0 },
  });

  const opacity = interpolate(adjustedFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  let transform = '';

  switch (type) {
    case 'overshootPop': {
      const scale = interpolate(springProgress, [0, 1], [0.35, 1.0]);
      transform = `scale(${scale})`;
      break;
    }
    case 'fadeUp': {
      const translateY = interpolate(springProgress, [0, 1], [60, 0]);
      transform = `translateY(${translateY}px)`;
      break;
    }
    case 'fadeDown': {
      const translateY = interpolate(springProgress, [0, 1], [-60, 0]);
      transform = `translateY(${translateY}px)`;
      break;
    }
    case 'slideRight': {
      const translateX = interpolate(springProgress, [0, 1], [-120, 0]);
      transform = `translateX(${translateX}px)`;
      break;
    }
    case 'slideLeft': {
      const translateX = interpolate(springProgress, [0, 1], [120, 0]);
      transform = `translateX(${translateX}px)`;
      break;
    }
    case 'scaleReveal': {
      const scale = interpolate(springProgress, [0, 1], [0, 1]);
      transform = `scale(${scale})`;
      break;
    }
    case 'springBounce': {
      const scale = interpolate(springProgress, [0, 1], [0.2, 1.0]);
      const rotate = interpolate(springProgress, [0, 1], [-8, 0]);
      transform = `scale(${scale}) rotate(${rotate}deg)`;
      break;
    }
    default:
      transform = 'none';
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
