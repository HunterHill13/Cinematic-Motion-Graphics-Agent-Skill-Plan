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
  /** Disable angular tilt to keep typography strictly horizontal */
  disableTilt?: boolean;
  style?: React.CSSProperties;
}

export const InertialChild: React.FC<InertialChildProps> = ({
  children,
  childIndex,
  parentProgress,
  parentVelocity = 0,
  axis = 'x',
  intensity = 1.0,
  disableTilt = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Child-specific staggered spring
  const lagFrames = childIndex * 2.0;
  const childSpring = spring({
    frame: Math.max(0, frame - lagFrames),
    fps,
    config: {
      damping: 15,
      mass: 0.6 + childIndex * 0.1,
      stiffness: 150,
    },
  });

  // Inertial offset: strictly clamped to prevent breaking container layouts
  // Also decays cleanly to 0 as animation settles (within 45 frames)
  const settleEnvelope = Math.max(0, 1 - Math.max(0, frame - 50) / 25);
  const progressLag = (parentProgress - childSpring) * 16 * intensity * settleEnvelope;
  const velocityLag = parentVelocity * (childIndex + 1) * -0.3 * intensity * settleEnvelope;
  const totalOffset = progressLag + velocityLag;

  // Clamped translation within safe [-8px, 8px] window
  const clampedX = Math.max(-8, Math.min(8, totalOffset));
  const clampedY = Math.max(-8, Math.min(8, totalOffset));

  const dragX = axis === 'x' || axis === 'both' ? clampedX : 0;
  const dragY = axis === 'y' || axis === 'both' ? clampedY : 0;
  // Angular tilt is strictly 0 when disableTilt=true, or clamped to [-1.2deg, 1.2deg]
  const dragTilt = disableTilt ? 0 : Math.max(-1.2, Math.min(1.2, totalOffset * -0.04));

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
