import React from 'react';
import { interpolate, Easing } from 'remotion';

interface NumericImpactProps {
  value: number;
  frame: number;
  startFrame: number;
  duration?: number;
  accentColor?: string;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  label?: string;
}

/**
 * Numeric Impact Primitive:
 * Elevates data from static text into a primary graphic anchor with animated counters and vector caliper brackets.
 */
export const NumericImpact: React.FC<NumericImpactProps> = ({
  value,
  frame,
  startFrame,
  duration = 45,
  accentColor = '#38BDF8',
  prefix = '',
  suffix = '',
  fontSize = 68,
  label = '',
}) => {
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const displayCount = Math.round(progress * value);
  const scale = interpolate(progress, [0, 0.8, 1], [0.85, 1.05, 1.0]);
  const opacity = interpolate(progress, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });
  const bracketExpand = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: '12px 24px',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Dynamic Vector Calipers (Top & Bottom) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${bracketExpand * 100}%`,
          maxWidth: 180,
          height: 2,
          backgroundColor: accentColor,
          boxShadow: `0 0 12px ${accentColor}`,
          opacity: 0.8,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          direction: 'ltr',
          fontFamily: "'YekanBakh', 'Vazirmatn', sans-serif",
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {prefix && (
          <span style={{ fontSize: fontSize * 0.4, color: '#94A3B8', marginRight: 6 }}>{prefix}</span>
        )}
        <span
          style={{
            fontSize,
            color: '#F8FAFC',
            textShadow: `0 0 25px ${accentColor}80`,
            letterSpacing: '-1px',
          }}
        >
          {displayCount}
        </span>
        {suffix && (
          <span style={{ fontSize: fontSize * 0.4, color: accentColor, marginLeft: 6, fontWeight: 700 }}>
            {suffix}
          </span>
        )}
      </div>

      {label && (
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#94A3B8',
            marginTop: 10,
            direction: 'rtl',
            letterSpacing: '0.5px',
          }}
        >
          {label}
        </span>
      )}

      {/* Bottom Caliper */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${bracketExpand * 60}%`,
          maxWidth: 120,
          height: 1.5,
          backgroundColor: accentColor,
          opacity: 0.6,
        }}
      />
    </div>
  );
};
