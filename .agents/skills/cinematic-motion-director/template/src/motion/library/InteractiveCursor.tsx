/**
 * ============================================================================
 * INTERACTIVE CURSOR POINTER (CLAUDE OPUS 5.5 DRIBBLE-STYLE INTERACTION)
 * ============================================================================
 * 
 * Simulates a high-precision digital cursor flight, hover deceleration,
 * click depression, and expanding shockwave ripple (Click Ripple).
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export interface InteractiveCursorProps {
  startFrame?: number;
  clickFrame?: number;
  endFrame?: number;
  targetX?: number;
  targetY?: number;
}

export const InteractiveCursor: React.FC<InteractiveCursorProps> = ({
  startFrame = 55,
  clickFrame = 95,
  endFrame = 118,
  targetX = 960,
  targetY = 430,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  // Position trajectory: Glides smoothly from top-right to target button
  const progress = interpolate(frame, [startFrame, clickFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
  });

  const startX = targetX + 320;
  const startY = targetY - 180;
  const posX = interpolate(progress, [0, 1], [startX, targetX]);
  const posY = interpolate(progress, [0, 1], [startY, targetY]);

  // Click Animation at clickFrame: scale depression and spring release
  const clickScale = interpolate(
    frame,
    [clickFrame - 3, clickFrame, clickFrame + 5, clickFrame + 12],
    [1.0, 0.84, 1.08, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Expanding Click Ripple shockwave
  const rippleActive = frame >= clickFrame && frame <= clickFrame + 24;
  const rippleProgress = interpolate(frame, [clickFrame, clickFrame + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rippleSize = interpolate(rippleProgress, [0, 1], [10, 80]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.3, 1], [0.9, 0.7, 0]);

  // Overall cursor opacity fade-out
  const cursorOpacity = interpolate(
    frame,
    [startFrame, startFrame + 10, endFrame - 10, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 500,
      }}
    >
      {/* Click Ripple Shockwave */}
      {rippleActive && (
        <div
          style={{
            position: 'absolute',
            left: targetX - rippleSize / 2,
            top: targetY - rippleSize / 2,
            width: rippleSize,
            height: rippleSize,
            borderRadius: '50%',
            border: '2px solid rgba(56, 189, 248, 0.9)',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.6), inset 0 0 10px rgba(139, 92, 246, 0.4)',
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* Cursor Body & Luminous Trail */}
      <div
        style={{
          position: 'absolute',
          left: posX,
          top: posY,
          transform: `scale(${clickScale}) translate(-3px, -3px)`,
          opacity: cursorOpacity,
          filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6))',
          transition: 'transform 0.05s ease-out',
        }}
      >
        <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
          <path
            d="M 2 2 L 11 28 L 16 18 L 26 15 Z"
            fill="#ffffff"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Internal neon accent */}
          <path
            d="M 6 7 L 11 22 L 14 16 L 21 14 Z"
            fill="#38bdf8"
            fillOpacity="0.8"
          />
        </svg>

        {/* Dynamic Click Label */}
        {frame >= clickFrame - 8 && frame <= clickFrame + 14 && (
          <div
            style={{
              position: 'absolute',
              left: 28,
              top: 2,
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(14, 165, 233, 0.9)',
              color: '#ffffff',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.5,
              whiteSpace: 'nowrap',
              boxShadow: '0 0 10px rgba(14, 165, 233, 0.6)',
              opacity: interpolate(frame, [clickFrame - 8, clickFrame - 2, clickFrame + 8, clickFrame + 14], [0, 1, 1, 0]),
            }}
          >
            INTERACT
          </div>
        )}
      </div>
    </div>
  );
};
