import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface CoordinateBracketsProps {
  x: number;
  y: number;
  width: number;
  height: number;
  bracketSize?: number;
  color?: string;
  opacity?: number;
  scale?: number;
}

/**
 * COORDINATE BRACKETS (SECONDARY ACTOR S1)
 * Minimalist geometric L-brackets `[ ]` framing primary graphic monoliths.
 */
export const CoordinateBrackets: React.FC<CoordinateBracketsProps> = ({
  x,
  y,
  width,
  height,
  bracketSize = 16,
  color = 'rgba(212, 175, 55, 0.4)',
  opacity = 1.0,
  scale = 1.0,
}) => {
  if (opacity <= 0.001) return null;

  const halfW = width / 2;
  const halfH = height / 2;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width,
        height,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Top-Right Bracket */}
        <path
          d={`M ${width - bracketSize} 0 L ${width} 0 L ${width} ${bracketSize}`}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
        />
        {/* Top-Left Bracket */}
        <path
          d={`M ${bracketSize} 0 L 0 0 L 0 ${bracketSize}`}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
        />
        {/* Bottom-Right Bracket */}
        <path
          d={`M ${width - bracketSize} ${height} L ${width} ${height} L ${width} ${height - bracketSize}`}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
        />
        {/* Bottom-Left Bracket */}
        <path
          d={`M ${bracketSize} ${height} L 0 ${height} L 0 ${height - bracketSize}`}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
};

interface ConnectorTrackProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  opacity?: number;
  dashed?: boolean;
}

/**
 * CONNECTOR TRACK (SECONDARY ACTOR S2)
 * Fine vector guide linking numerals to descriptive labels.
 */
export const ConnectorTrack: React.FC<ConnectorTrackProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = 'rgba(56, 189, 248, 0.35)',
  opacity = 1.0,
  dashed = true,
}) => {
  if (opacity <= 0.001) return null;

  const minX = Math.min(startX, endX);
  const minY = Math.min(startY, endY);
  const w = Math.max(Math.abs(endX - startX), 2);
  const h = Math.max(Math.abs(endY - startY), 2);

  const x1 = startX - minX;
  const y1 = startY - minY;
  const x2 = endX - minX;
  const y2 = endY - minY;

  return (
    <svg
      style={{
        position: 'absolute',
        left: minX,
        top: minY,
        width: w,
        height: h,
        pointerEvents: 'none',
        opacity,
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1}
        strokeDasharray={dashed ? '4 6' : undefined}
      />
    </svg>
  );
};

interface OrbitingNodeProps {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY?: number;
  speed?: number; // radians per frame
  initialAngle?: number;
  nodeSize?: number;
  color?: string;
  opacity?: number;
}

/**
 * ORBITING NODE (SECONDARY ACTOR S3)
 * Satellite micro-dot orbiting primary actors with physical secondary motion.
 */
export const OrbitingNode: React.FC<OrbitingNodeProps> = ({
  centerX,
  centerY,
  radiusX,
  radiusY = radiusX,
  speed = 0.04,
  initialAngle = 0,
  nodeSize = 4,
  color = '#D4AF37',
  opacity = 0.8,
}) => {
  const frame = useCurrentFrame();
  const angle = initialAngle + frame * speed;
  const x = centerX + Math.cos(angle) * radiusX;
  const y = centerY + Math.sin(angle) * radiusY;

  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        width: nodeSize,
        height: nodeSize,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
        opacity,
        pointerEvents: 'none',
        zIndex: 40,
      }}
    />
  );
};

interface ImpactShockwaveProps {
  centerX: number;
  centerY: number;
  radius: number;
  opacity: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * IMPACT SHOCKWAVE (SECONDARY ACTOR S4)
 * Radial vector ripple detonated upon semantic impacts.
 */
export const ImpactShockwave: React.FC<ImpactShockwaveProps> = ({
  centerX,
  centerY,
  radius,
  opacity,
  color = '#D4AF37',
  strokeWidth = 1.5,
}) => {
  if (opacity <= 0.001 || radius <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: centerX,
        top: centerY,
        transform: 'translate(-50%, -50%)',
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        border: `${strokeWidth}px solid ${color}`,
        opacity,
        pointerEvents: 'none',
        boxShadow: `0 0 12px ${color}`,
      }}
    />
  );
};
