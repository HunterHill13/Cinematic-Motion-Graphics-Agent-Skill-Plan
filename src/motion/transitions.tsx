import React from 'react';
import { interpolate, Easing } from 'remotion';

export interface TransitionBoundaryConfig {
  fromFrame: number;
  durationInFrames: number;
  type: 'morph' | 'beam_continuation' | 'spatial_shift' | 'card_convergence';
}

export interface TransitionState {
  progress: number;
  isTransitioning: boolean;
  sourceOpacity: number;
  targetOpacity: number;
}

/**
 * Calculates continuous unified transition state across two overlapping scenes.
 * Guarantees zero hard cuts: Scene A and Scene B evaluate the same progress curve.
 */
export function calculateTransitionState(
  currentFrame: number,
  boundaryStart: number,
  duration: number = 35,
  easing: (t: number) => number = Easing.bezier(0.4, 0, 0.2, 1)
): TransitionState {
  const rawProgress = (currentFrame - boundaryStart) / duration;
  const clampedProgress = Math.max(0, Math.min(1, rawProgress));
  const progress = easing(clampedProgress);

  return {
    progress,
    isTransitioning: rawProgress >= 0 && rawProgress <= 1,
    sourceOpacity: 1 - progress,
    targetOpacity: progress,
  };
}

/**
 * Shared Morph Line / Beam element used for Motivated Object Continuity
 */
export const ContinuityBeam: React.FC<{
  progress: number;
  yPosition?: number;
  color?: string;
}> = ({ progress, yPosition = 500, color = '#38BDF8' }) => {
  if (progress <= 0 || progress >= 1) return null;

  const width = interpolate(progress, [0, 1], [40, 1600], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = Math.sin(progress * Math.PI);

  return (
    <div
      style={{
        position: 'absolute',
        top: yPosition,
        left: '50%',
        transform: 'translateX(-50%)',
        width,
        height: 4,
        backgroundColor: color,
        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}80`,
        opacity,
        borderRadius: 2,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
};
