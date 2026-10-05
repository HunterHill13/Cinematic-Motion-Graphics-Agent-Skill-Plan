import React from 'react';

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
 * COORDINATE BRACKETS (ROLE D / C)
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
 * CONNECTOR TRACK (ROLE B — MOTION CONNECTOR)
 * Fine vector guide linking numerals to descriptive labels.
 */
export const ConnectorTrack: React.FC<ConnectorTrackProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = 'rgba(56, 189, 248, 0.3)',
  opacity = 1.0,
  dashed = true,
}) => {
  if (opacity <= 0.001) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
      }}
      width={1920}
      height={1080}
    >
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      {/* Anchor Terminals */}
      <circle cx={startX} cy={startY} r={2.5} fill={color} />
      <circle cx={endX} cy={endY} r={2.5} fill={color} />
    </svg>
  );
};

interface ShockwaveRingProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * SHOCKWAVE RING (PHYSICAL IMPACT FEEDBACK)
 * Expands radially upon graphic impacts.
 */
export const ShockwaveRing: React.FC<ShockwaveRingProps> = ({
  x,
  y,
  radius,
  opacity,
  strokeWidth = 1.5,
  color = '#D4AF37',
}) => {
  if (opacity <= 0.001 || radius <= 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
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

interface OfficialReticleStampProps {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
  verified?: boolean;
}

/**
 * OFFICIAL RETICLE STAMP (ROLE C / A — STATE INDICATOR / NARRATIVE ACTOR)
 * Precision circular disciplinary verification reticle with rotatable ticks and checkmark.
 */
export const OfficialReticleStamp: React.FC<OfficialReticleStampProps> = ({
  x,
  y,
  scale = 1.0,
  opacity = 1.0,
  verified = true,
}) => {
  if (opacity <= 0.001) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 140,
        height: 140,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg width={140} height={140} viewBox="0 0 140 140">
        {/* Outer Circular Ring */}
        <circle
          cx={70}
          cy={70}
          r={64}
          fill="none"
          stroke={verified ? '#38BDF8' : 'rgba(148, 163, 184, 0.4)'}
          strokeWidth={1.5}
          strokeDasharray="6 4"
        />
        {/* Inner Solid Ring */}
        <circle
          cx={70}
          cy={70}
          r={56}
          fill="none"
          stroke={verified ? '#38BDF8' : 'rgba(148, 163, 184, 0.4)'}
          strokeWidth={1.5}
        />
        {/* Calibration Ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 70 + Math.cos(angle) * 56;
          const y1 = 70 + Math.sin(angle) * 56;
          const x2 = 70 + Math.cos(angle) * 62;
          const y2 = 70 + Math.sin(angle) * 62;
          return (
            <line
              key={`reticle-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={verified ? '#38BDF8' : 'rgba(148, 163, 184, 0.4)'}
              strokeWidth={1.2}
            />
          );
        })}
        {/* Checkmark or Verification Cross */}
        {verified && (
          <path
            d="M 46 72 L 62 88 L 96 52"
            fill="none"
            stroke="#38BDF8"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};
