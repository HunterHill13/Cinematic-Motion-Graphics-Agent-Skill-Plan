/**
 * V5.1 Motion Primitives: Kinetic Typography & Number Impact
 * Implements Rule B2 (VO Beat -> Visual Beat) & Rule B14 (Vox-Style Explainer).
 */
import React from 'react';
import { interpolate, Easing } from 'remotion';
import { seg } from './easing';

export const TrackingExpandTitle: React.FC<{
  words: string[];
  frame: number;
  startFrame: number;
  durationFrames?: number;
  fontSize?: number;
  goldIndex?: number;
}> = ({
  words,
  frame,
  startFrame,
  durationFrames = 45,
  fontSize = 58,
  goldIndex = 1,
}) => {
  const p = seg(frame, startFrame, startFrame + durationFrames, Easing.out(Easing.poly(5)));
  const blur = 10 * (1 - p);
  const opacity = interpolate(p, [0, 1], [0.2, 1]);
  const scaleX = interpolate(p, [0, 1], [0.93, 1]);
  const settled = frame >= startFrame + durationFrames;

  const N = words.length;
  const center = (N - 1) / 2;

  return (
    <div
      style={{
        display: 'flex',
        direction: 'rtl',
        gap: 16,
        transform: settled ? undefined : `scaleX(${scaleX})`,
        filter: settled ? undefined : `blur(${blur}px)`,
        opacity: settled ? 1 : opacity,
      }}
    >
      {words.map((word, i) => {
        const offset = (i - center) * 22 * (1 - p);
        const isGold = i === goldIndex || word.includes('کاف');
        return (
          <span
            key={i}
            style={{
              fontSize,
              fontWeight: 800,
              color: isGold ? '#F9E79F' : '#F8FAFC',
              textShadow: isGold
                ? '0 0 28px rgba(212, 175, 55, 0.5)'
                : '0 4px 20px rgba(0, 0, 0, 0.8)',
              transform: `translateX(${offset}px)`,
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

/**
 * VO Beat -> Visual Beat Number Impact
 * e.g., 14.2 -> 15.4 -> 16 -> LOCK
 */
export const NumberImpact: React.FC<{
  steps: number[];
  frame: number;
  startFrame: number;
  stepInterval?: number;
  color?: string;
  suffix?: string;
}> = ({
  steps,
  frame,
  startFrame,
  stepInterval = 6,
  color = '#10B981',
  suffix = 'امتیاز',
}) => {
  const finalIdx = steps.length - 1;
  const currentStepIdx = Math.min(
    finalIdx,
    Math.max(0, Math.floor((frame - startFrame) / stepInterval))
  );
  const currentVal = frame < startFrame ? steps[0] : steps[currentStepIdx];
  const isLocked = currentStepIdx === finalIdx && frame >= startFrame + finalIdx * stepInterval;

  const lockScale = isLocked
    ? interpolate(
        frame - (startFrame + finalIdx * stepInterval),
        [0, 3, 6],
        [1.25, 0.95, 1.0],
        { extrapolateRight: 'clamp' }
      )
    : 1.0;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 8,
        transform: `scale(${lockScale})`,
      }}
    >
      <span
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: isLocked ? color : '#F8FAFC',
          fontVariantNumeric: 'tabular-nums',
          textShadow: isLocked ? `0 0 24px ${color}80` : 'none',
        }}
      >
        {currentVal}
      </span>
      {suffix && (
        <span style={{ fontSize: 20, fontWeight: 700, color, direction: 'rtl' }}>
          {suffix}
        </span>
      )}
    </div>
  );
};
