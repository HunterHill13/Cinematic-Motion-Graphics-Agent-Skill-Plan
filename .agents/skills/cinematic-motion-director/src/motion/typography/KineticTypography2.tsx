import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSettleLock } from '../secondaryMotion';

export interface KineticTypographyProps {
  text: string;
  subtext?: string;
  strikeFrame?: number;
  mode?:
    | 'word_slam'
    | 'tracking_expansion'
    | 'outline_to_fill'
    | 'baseline_extract'
    | 'typographic_stack'
    | 'mask_reveal';
  fontSize?: number;
  color?: string;
  accentColor?: string;
  settleFrames?: number;
  dir?: 'rtl' | 'ltr';
  style?: React.CSSProperties;
}

/**
 * KINETIC TYPOGRAPHY 2.0 (V22)
 * Treats typography as graphic structural material rather than a plain <div>.
 * Guarantees correct Persian RTL shaping, optical alignment, and zero post-settle jitter.
 */
export const KineticTypography2: React.FC<KineticTypographyProps> = ({
  text,
  subtext,
  strikeFrame = 25,
  mode = 'word_slam',
  fontSize = 64,
  color = '#FFFFFF',
  accentColor = '#D4AF37',
  settleFrames = 16,
  dir = 'rtl',
  style,
}) => {
  const frame = useCurrentFrame();

  // Deterministic settle lock (Zero post-settle jitter)
  const settle = calculateSettleLock(frame, strikeFrame, {
    anticipationFrames: 8,
    settleFrames,
    scalePeak: 1.15,
  });

  // Mode 1: Word Slam (Anticipation -> Fast Kinetic Downward Slam -> Hard Settle)
  const slamTranslateY = interpolate(frame, [0, strikeFrame], [-80, 0], {
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slamOpacity = interpolate(frame, [0, strikeFrame - 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Mode 2: Tracking Expansion (Letters start compressed, expand into monumental spacing)
  // Preserves whole-word Persian ligature continuity
  const trackingPx = interpolate(frame, [strikeFrame, strikeFrame + 40], [0, 6], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Mode 3: Outline to Fill (Text begins as pure golden geometric stroke, fills with solid mass)
  const fillProgress = interpolate(frame, [strikeFrame, strikeFrame + 30], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Mode 4: Baseline Extraction (Typography strikes and extrudes its baseline as a continuous carrier)
  const baselineLength = interpolate(frame, [strikeFrame + 10, strikeFrame + 45], [0, 800], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Mode 5: Mask Reveal (Sliding architectural aperture)
  const maskProgress = interpolate(frame, [strikeFrame - 15, strikeFrame + 15], [100, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        direction: dir,
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        position: 'relative',
        ...style,
      }}
    >
      {/* Primary Kinetic Typography Core */}
      <div
        style={{
          position: 'relative',
          transform: `scale(${settle.scale}) translateY(${slamTranslateY + settle.translateY}px)`,
          opacity: slamOpacity,
          clipPath: mode === 'mask_reveal' ? `inset(0% 0% ${maskProgress}% 0%)` : undefined,
          display: 'inline-block',
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight: 900,
            letterSpacing: `${trackingPx}px`,
            color: mode === 'outline_to_fill' ? 'transparent' : color,
            WebkitTextStroke:
              mode === 'outline_to_fill'
                ? `${interpolate(fillProgress, [0, 1], [2, 0])}px ${accentColor}`
                : undefined,
            backgroundImage:
              mode === 'outline_to_fill'
                ? `linear-gradient(to top, ${color} ${fillProgress * 100}%, transparent ${fillProgress * 100}%)`
                : undefined,
            WebkitBackgroundClip: mode === 'outline_to_fill' ? 'text' : undefined,
            textShadow:
              frame >= strikeFrame
                ? `0 4px 30px rgba(0, 0, 0, 0.9), 0 0 24px rgba(212, 175, 55, 0.35)`
                : 'none',
            display: 'block',
            lineHeight: 1.2,
          }}
        >
          {text}
        </span>

        {/* Extracted Architectural Baseline Rule */}
        {mode === 'baseline_extract' && (
          <div
            style={{
              position: 'absolute',
              bottom: -12,
              right: 0,
              height: 2.5,
              width: baselineLength,
              backgroundColor: accentColor,
              boxShadow: `0 0 14px ${accentColor}`,
            }}
          />
        )}
      </div>

      {/* Subtext Secondary Anchor */}
      {subtext && (
        <span
          style={{
            fontSize: Math.round(fontSize * 0.38),
            fontWeight: 600,
            color: '#94A3B8',
            marginTop: 14,
            opacity: interpolate(frame, [strikeFrame + 10, strikeFrame + 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [strikeFrame + 10, strikeFrame + 30], [12, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          {subtext}
        </span>
      )}
    </div>
  );
};
