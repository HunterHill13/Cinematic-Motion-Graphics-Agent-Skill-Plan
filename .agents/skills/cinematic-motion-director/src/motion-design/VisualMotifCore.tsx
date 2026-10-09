import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface VisualMotifCoreProps {
  stage: 'trapped' | 'kinetic_strike' | 'pore_swarm' | 'wheel_spoke';
  progress?: number; // 0 to 1 progress within shot
  size?: number;
  color?: string;
  glowColor?: string;
  pulseSpeed?: number;
}

/**
 * VisualMotifCore: The unifying visual anchor connecting all shots.
 * In Shot 01: Trapped pulsating energy seed.
 * In Shot 02: Piercing spearhead leading the BH3 missile.
 * In Shot 03: The core rupture kernel dispersing into Cytochrome c.
 * In Shot 04: The heptameric spoke activator locking into Caspase-9.
 */
export const VisualMotifCore: React.FC<VisualMotifCoreProps> = ({
  stage,
  progress = 0,
  size = 40,
  color = '#06b6d4',
  glowColor = 'rgba(6, 182, 212, 0.6)',
  pulseSpeed = 0.08,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle continuous harmonic pulse
  const pulse = Math.sin(frame * pulseSpeed) * 0.12 + 1.0;
  
  // Spring entrance dynamics
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 120 },
  });

  const computedScale = pulse * entrance;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${computedScale})`,
      }}
    >
      {/* Outer Harmonic Energy Ring */}
      <div
        style={{
          position: 'absolute',
          width: size * 1.8,
          height: size * 1.8,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          opacity: 0.4 + Math.sin(frame * 0.1) * 0.2,
          boxShadow: `0 0 25px ${glowColor}`,
          transform: `scale(${1 + Math.sin(frame * 0.06) * 0.15}) rotate(${frame * 0.5}deg)`,
        }}
      />

      {/* Middle Volumetric Halo */}
      <div
        style={{
          position: 'absolute',
          width: size * 1.3,
          height: size * 1.3,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(4px)',
        }}
      />

      {/* Hero Physical Nucleus */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${color} 60%, #0369a1 100%)`,
          boxShadow: `0 0 30px ${color}, inset 0 0 10px rgba(255, 255, 255, 0.8)`,
        }}
      />
    </div>
  );
};
