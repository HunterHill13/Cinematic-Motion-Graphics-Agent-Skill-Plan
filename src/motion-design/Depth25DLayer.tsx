import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface Depth25DLayerProps {
  children: React.ReactNode;
  depthZ: number; // e.g. -200 for deep background, 0 for hero midground, 150 for foreground
  cameraPanX?: number;
  cameraPanY?: number;
  style?: React.CSSProperties;
}

/**
 * Depth25DLayer: Provides realistic 2.5D optical parallax and depth-of-field simulation.
 * Foreground moves faster with subtle defocus; background moves slower with atmospheric haze.
 */
export const Depth25DLayer: React.FC<Depth25DLayerProps> = ({
  children,
  depthZ = 0,
  cameraPanX = 0,
  cameraPanY = 0,
  style,
}) => {
  // Parallax coefficient: positive Z moves faster (closer), negative Z moves slower (further)
  const parallaxFactor = 1.0 + depthZ * 0.002;
  const offsetX = cameraPanX * (parallaxFactor - 1.0);
  const offsetY = cameraPanY * (parallaxFactor - 1.0);

  // Optical defocus simulation
  const blurAmount = Math.max(0, Math.abs(depthZ) * 0.008);
  const opacity = interpolate(depthZ, [-400, 0, 200], [0.65, 1.0, 0.95]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform: `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, ${depthZ}px)`,
        filter: blurAmount > 0.5 ? `blur(${blurAmount.toFixed(1)}px)` : undefined,
        opacity,
        pointerEvents: 'none',
        willChange: 'transform, filter',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
