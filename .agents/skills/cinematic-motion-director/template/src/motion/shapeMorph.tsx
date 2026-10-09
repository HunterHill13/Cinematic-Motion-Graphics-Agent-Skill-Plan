import React from 'react';
import { interpolate, Easing } from 'remotion';

interface ShapeMorphProps {
  progress: number;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Shape Morph Primitive:
 * Mathematically morphs a circular emblem into an open vector bracket or highway portal.
 */
export const ShapeMorph: React.FC<ShapeMorphProps> = ({
  progress,
  size = 180,
  primaryColor = '#D4AF37',
  secondaryColor = '#38BDF8',
}) => {
  // Clamped 0-1
  const t = Math.max(0, Math.min(1, progress));

  // Circle radius contracts and widens into an elliptical portal
  const rx = interpolate(t, [0, 1], [size * 0.45, size * 0.9], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const ry = interpolate(t, [0, 1], [size * 0.45, size * 0.15], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const strokeDashoffset = interpolate(t, [0, 0.5, 1], [0, 100, 300]);
  const rotation = interpolate(t, [0, 1], [0, 180]);
  const strokeColor = t > 0.5 ? secondaryColor : primaryColor;

  return (
    <svg width={size * 2} height={size} viewBox={`0 0 ${size * 2} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <filter id="morph-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`rotate(${rotation} ${size} ${size / 2})`}>
        <ellipse
          cx={size}
          cy={size / 2}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={strokeColor}
          strokeWidth={3}
          strokeDasharray="12 6"
          strokeDashoffset={strokeDashoffset}
          filter="url(#morph-glow)"
        />
        <circle
          cx={size}
          cy={size / 2}
          r={interpolate(t, [0, 1], [6, 2])}
          fill={secondaryColor}
        />
      </g>
    </svg>
  );
};
