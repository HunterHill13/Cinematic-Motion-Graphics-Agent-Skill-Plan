import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface CameraRigProps {
  children: React.ReactNode;
  /** Direction: 'push' zooms 1.00 -> 1.05; 'pull' zooms 1.05 -> 1.00 */
  direction?: 'push' | 'pull' | 'static';
  /** Max scale multiplier (default 1.05 for subtle breathing) */
  maxScale?: number;
  /** Tilt angle in degrees for cinematic feel */
  tiltDeg?: number;
  /** 2.5D focal depth offset */
  depth?: number;
}

/**
 * CameraRig - Eliminates the static stage look by ensuring continuous,
 * subtle cinematic camera movement (1.00 -> 1.04-1.06) carrying scene life.
 */
export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  direction = 'push',
  maxScale = 1.05,
  tiltDeg = 0,
  depth = 1000,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  let scale = 1.0;
  if (direction === 'push') {
    scale = interpolate(frame, [0, durationInFrames], [1.0, maxScale], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (direction === 'pull') {
    scale = interpolate(frame, [0, durationInFrames], [maxScale, 1.0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  const rotX = tiltDeg !== 0 ? `rotateX(${tiltDeg}deg)` : '';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        perspective: `${depth}px`,
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) ${rotX}`,
          transformOrigin: 'center center',
          transition: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};
