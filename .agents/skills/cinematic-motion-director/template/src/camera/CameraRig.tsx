import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface CameraRigProps {
  children: React.ReactNode;
  /** Motivated camera action: 'crane-reveal' | 'impact-absorb' | 'focus-push' | 'static-lock' */
  action?: 'crane-reveal' | 'impact-absorb' | 'focus-push' | 'static-lock';
  /** Focal depth for perspective rendering */
  depth?: number;
  /** Frame at which physical impact occurs, triggering seismic micro-shock */
  impactFrame?: number;
}

/**
 * CameraRig (v40.1 Production Standard)
 * 
 * Enforces the Single Authoritative Motion Doctrine:
 * 1. Camera moves ONLY when motivated by narrative scale or physical impact.
 * 2. Unmotivated sinusoidal breathing or generic continuous 1.05 zooms are BANNED.
 * 3. Supports 3-frame seismic shock recoil on mass impact.
 */
export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  action = 'static-lock',
  depth = 1200,
  impactFrame,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  let scale = 1.0;
  let offsetY = 0;

  if (action === 'crane-reveal') {
    // Motivated crane pull-back expanding spatial view
    scale = interpolate(frame, [0, durationInFrames], [1.08, 1.0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (action === 'focus-push') {
    // Deliberate focus push-in toward active hero transformation
    scale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // 3-Frame Seismic Shock Recoil
  if (impactFrame !== undefined && frame >= impactFrame && frame <= impactFrame + 6) {
    const shockRel = frame - impactFrame;
    if (shockRel === 0) offsetY = 6;
    else if (shockRel === 1) offsetY = -3;
    else if (shockRel === 2) offsetY = 1;
    else offsetY = 0;
  }

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
          transform: `scale(${scale}) translateY(${offsetY}px)`,
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
