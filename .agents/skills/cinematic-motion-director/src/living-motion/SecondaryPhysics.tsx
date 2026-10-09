import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';

export interface SecondaryPhysicsProps {
  children: React.ReactNode;
  delayFrames?: number; // Inertial lag behind parent
  stiffness?: number;
  damping?: number;
  style?: React.CSSProperties;
}

/**
 * SecondaryPhysics provides spring-delayed follower dynamics for callouts,
 * badges, connectors, and secondary annotations attached to a hero.
 */
export const SecondaryPhysics: React.FC<SecondaryPhysicsProps> = ({
  children,
  delayFrames = 5,
  stiffness = 110,
  damping = 16,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delayFrames),
    fps,
    config: {
      stiffness,
      damping,
      mass: 0.8,
    },
  });

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 14}px) scale(${0.92 + progress * 0.08})`,
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
