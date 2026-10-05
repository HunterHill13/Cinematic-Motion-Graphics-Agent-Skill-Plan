import React from 'react';

export interface TravelingMotifV10Props {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  glowColor?: string;
  opacity?: number;
  wakeLength?: number;
  wakeAngle?: number; // In degrees, default 180 (wake trails opposite to direction)
  morphMode?: 'spark' | 'beacon' | 'attractor' | 'jewel';
}

/**
 * THE MORPHING TRAVELING MOTIF (ROLE B — MOTION CONNECTOR)
 * The kinetic lineage thread running unbroken across all 6 shots.
 * Adapts its physical form and role:
 * - 'spark': High-density core with directional velocity comet wake (Shots 1-3)
 * - 'beacon': Focused pulse scanning along coordinate axes (Shot 4)
 * - 'attractor': High-energy gravitational pull coordinate (Shot 5)
 * - 'jewel': Permanent faceted emerald jewel locking the institutional crest (Shot 6)
 */
export const TravelingMotifV10: React.FC<TravelingMotifV10Props> = ({
  x,
  y,
  scale = 1.0,
  color = '#D4AF37',
  glowColor = 'rgba(212, 175, 55, 0.6)',
  opacity = 1.0,
  wakeLength = 24,
  wakeAngle = 180,
  morphMode = 'spark',
}) => {
  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        pointerEvents: 'none',
        zIndex: 60,
      }}
    >
      {/* 1. Directional Velocity Comet Wake (active in spark mode) */}
      {morphMode === 'spark' && wakeLength > 0 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: wakeLength,
            height: 2,
            background: `linear-gradient(to right, ${color}, transparent)`,
            transformOrigin: '0% 50%',
            transform: `rotate(${wakeAngle}deg)`,
            opacity: 0.75,
            filter: `drop-shadow(0 0 6px ${glowColor})`,
          }}
        />
      )}

      {/* 2. Outer Radiant Optical Bloom */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: morphMode === 'jewel' ? 52 : 44,
          height: morphMode === 'jewel' ? 52 : 44,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(10px)',
          opacity: morphMode === 'jewel' ? 0.7 : 0.45,
        }}
      />

      {/* 3. Radiant Mid Corona */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: morphMode === 'beacon' ? 20 : 16,
          height: morphMode === 'beacon' ? 20 : 16,
          transform: 'translate(-50%, -50%)',
          borderRadius: morphMode === 'jewel' ? '20%' : '50%',
          backgroundColor: color,
          boxShadow: `0 0 16px ${color}, 0 0 32px ${glowColor}`,
          opacity: 0.95,
        }}
      />

      {/* 4. High-Energy Core */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: morphMode === 'jewel' ? 10 : 6,
          height: morphMode === 'jewel' ? 10 : 6,
          transform: 'translate(-50%, -50%)',
          borderRadius: morphMode === 'jewel' ? '2px' : '50%',
          backgroundColor: morphMode === 'jewel' ? '#10B981' : '#FFFFFF',
          boxShadow: `0 0 8px #FFFFFF`,
        }}
      />

      {/* 5. Beacon Ring (if in beacon mode) */}
      {morphMode === 'beacon' && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 32,
            height: 32,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: `1.5px solid ${color}`,
            boxShadow: `0 0 10px ${glowColor}`,
            opacity: 0.8,
          }}
        />
      )}
    </div>
  );
};
