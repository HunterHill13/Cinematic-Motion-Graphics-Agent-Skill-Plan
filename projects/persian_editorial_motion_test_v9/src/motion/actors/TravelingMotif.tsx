import React from 'react';

export interface TravelingMotifProps {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  glowColor?: string;
  opacity?: number;
  wakeLength?: number;
  wakeAngle?: number; // In degrees, default 180 (moving right, wake trails left)
}

/**
 * THE TRAVELING MOTIF (`ACTOR_M_TRAVELING_SPARK`)
 * The continuous kinetic thread connecting all 6 shots:
 * - High-density 6px core
 * - 16px radiant corona
 * - 40px soft optical bloom
 * - Directional velocity comet wake
 */
export const TravelingMotif: React.FC<TravelingMotifProps> = ({
  x,
  y,
  scale = 1.0,
  color = '#D4AF37',
  glowColor = 'rgba(212, 175, 55, 0.6)',
  opacity = 1.0,
  wakeLength = 24,
  wakeAngle = 180,
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
        zIndex: 50,
      }}
    >
      {/* Directional Velocity Comet Wake */}
      {wakeLength > 0 && (
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
            opacity: 0.7,
            filter: `drop-shadow(0 0 6px ${glowColor})`,
          }}
        />
      )}

      {/* Outer Optical Bloom (40px) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 44,
          height: 44,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(8px)',
          opacity: 0.45,
        }}
      />

      {/* Radiant Mid Corona (16px) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 16,
          height: 16,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 16px ${color}, 0 0 32px ${glowColor}`,
          opacity: 0.9,
        }}
      />

      {/* Dense High-Energy Core (6px) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 6,
          height: 6,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 6px #FFFFFF',
        }}
      />
    </div>
  );
};

interface MultiSparkClusterProps {
  sparks: Array<{
    id: string;
    x: number;
    y: number;
    scale?: number;
    color?: string;
    opacity?: number;
  }>;
}

/**
 * MultiSparkCluster:
 * Renders multiple daughter sparks (e.g., when the motif splits into 3 criterion nodes).
 */
export const MultiSparkCluster: React.FC<MultiSparkClusterProps> = ({ sparks }) => {
  return (
    <>
      {sparks.map((spark) => (
        <TravelingMotif
          key={spark.id}
          x={spark.x}
          y={spark.y}
          scale={spark.scale ?? 1.0}
          color={spark.color ?? '#38BDF8'}
          opacity={spark.opacity ?? 1.0}
          wakeLength={12}
        />
      ))}
    </>
  );
};
