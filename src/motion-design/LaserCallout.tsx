import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface LaserCalloutProps {
  label: string;
  sublabel?: string;
  originX: number; // Anchor on target organelle
  originY: number;
  targetX: number; // Text placement position
  targetY: number;
  delayFrames?: number;
  accentColor?: string;
}

/**
 * LaserCallout: Premium vector reticle and leader line replacement for web badges.
 * Features:
 * - Precise SVG animated leader line with hairpin elbow
 * - Pulsing target crosshair ring
 * - Kinetic tracking text with no background boxes or border radiuses
 */
export const LaserCallout: React.FC<LaserCalloutProps> = ({
  label,
  sublabel,
  originX,
  originY,
  targetX,
  targetY,
  delayFrames = 10,
  accentColor = '#06b6d4',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeFrame = Math.max(0, frame - delayFrames);

  // Line drawing spring
  const lineProgress = spring({
    frame: activeFrame,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.5 },
  });

  // Text tracking & opacity spring
  const textSpring = spring({
    frame: Math.max(0, activeFrame - 8),
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Intermediate elbow point for high-end graphic design feel
  const midX = originX + (targetX - originX) * 0.4;
  const midY = originY;

  // Path data
  const totalLength = Math.hypot(midX - originX, midY - originY) + Math.hypot(targetX - midX, targetY - midY);
  const strokeDashoffset = totalLength * (1 - lineProgress);

  const isLeft = targetX < originX;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 40,
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {/* Origin Target Reticle */}
        {lineProgress > 0.05 && (
          <g transform={`translate(${originX}, ${originY})`}>
            <circle
              r={5}
              fill={accentColor}
              style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }}
            />
            <circle
              r={12}
              fill="none"
              stroke={accentColor}
              strokeWidth="1.5"
              strokeDasharray="2 3"
              style={{
                opacity: 0.8,
                transform: `scale(${1 + Math.sin(frame * 0.15) * 0.15})`,
                transformOrigin: '0 0',
              }}
            />
          </g>
        )}

        {/* Vector Leader Line with Elbow */}
        <polyline
          points={`${originX},${originY} ${midX},${midY} ${targetX},${targetY}`}
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray={totalLength}
          strokeDashoffset={strokeDashoffset}
          style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }}
        />
      </svg>

      {/* Typographic Label (NO HTML CARD, PURE TYPOGRAPHY) */}
      <div
        style={{
          position: 'absolute',
          left: targetX,
          top: targetY - 14,
          transform: `translate(${isLeft ? '-100%' : '0'}, -50%) translateY(${(1 - textSpring) * 10}px)`,
          opacity: textSpring,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isLeft ? 'flex-end' : 'flex-start',
          padding: '0 12px',
        }}
      >
        <div
          style={{
            color: '#ffffff',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: 'uppercase',
            textShadow: `0 0 20px ${accentColor}`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              color: accentColor,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 3,
              marginTop: 2,
              opacity: 0.9,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
};
