/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: INERTIAL FOLLOW-THROUGH & SECONDARY PHYSICS RIG
 * ============================================================================
 * 
 * In premier studio motion graphics (Buck, Ordinary Folk, Claude Motion):
 * Parent containers do NOT move in rigid cardboard lockstep with their children.
 * As the parent container moves or rotates, each child element experiences:
 * 1. Inertial Lag: Staggered displacement proportional to child index & mass.
 * 2. Dynamic Counter-Tilt: Subtle rotational drag opposing the vector of motion.
 * 3. Elastic Settle: Damped harmonic oscillation settling back to equilibrium.
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export interface InertialChildProps {
  children: React.ReactNode;
  childIndex: number;
  /** Primary motion progress (0 to 1) or coordinate displacement */
  parentProgress: number;
  /** Velocity or delta of parent movement */
  parentVelocity?: number;
  /** Direction of parent motion: 'x' | 'y' | 'both' */
  axis?: 'x' | 'y' | 'both';
  /** Sensitivity multiplier for the lag effect (default: 1.0) */
  intensity?: number;
  style?: React.CSSProperties;
}

export const InertialChild: React.FC<InertialChildProps> = ({
  children,
  childIndex,
  parentProgress,
  parentVelocity = 0,
  axis = 'x',
  intensity = 1.0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Child-specific staggered spring
  const lagFrames = childIndex * 2.5;
  const childSpring = spring({
    frame: Math.max(0, frame - lagFrames),
    fps,
    config: {
      damping: 14 - Math.min(childIndex * 0.8, 6),
      mass: 0.5 + childIndex * 0.18,
      stiffness: 140 - Math.min(childIndex * 8, 50),
    },
  });

  // Calculate inertial offset based on delta between parent progress and child delayed progress
  const progressLag = (parentProgress - childSpring) * 35 * intensity;
  const velocityLag = parentVelocity * (childIndex + 1) * -0.6 * intensity;
  const totalOffset = progressLag + velocityLag;

  const dragX = axis === 'x' || axis === 'both' ? totalOffset : 0;
  const dragY = axis === 'y' || axis === 'both' ? totalOffset : 0;
  const dragTilt = totalOffset * -0.06; // Counter-tilt in degrees

  return (
    <div
      style={{
        transform: `translate3d(${dragX.toFixed(2)}px, ${dragY.toFixed(2)}px, 0px) rotate(${dragTilt.toFixed(2)}deg)`,
        willChange: 'transform',
        transition: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export interface InertialRigProps {
  children: React.ReactNode;
  parentProgress: number;
  parentVelocity?: number;
  axis?: 'x' | 'y' | 'both';
  intensity?: number;
  style?: React.CSSProperties;
}

export const InertialRig: React.FC<InertialRigProps> = ({
  children,
  parentProgress,
  parentVelocity = 0,
  axis = 'x',
  intensity = 1.0,
  style = {},
}) => {
  return (
    <div style={{ position: 'relative', ...style }}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <InertialChild
            key={index}
            childIndex={index}
            parentProgress={parentProgress}
            parentVelocity={parentVelocity}
            axis={axis}
            intensity={intensity}
          >
            {child}
          </InertialChild>
        );
      })}
    </div>
  );
};
