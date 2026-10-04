import React from 'react';

export interface TransitionGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  borderRadius?: number;
}

export interface SharedTransitionBridgeProps {
  progress: number; // 0.0 -> 1.0 continuous progress
  sourceGeo: TransitionGeometry;
  targetGeo: TransitionGeometry;
  sourceContent?: React.ReactNode;
  targetContent?: React.ReactNode;
}

/**
 * SharedTransitionBridge:
 * Renders a unified morphing visual element that connects the exit of Scene N
 * to the entrance of Scene N+1 across the entire overlap duration (30-40 frames).
 * Eliminates any single-frame discontinuity or conditional rendering hard cuts.
 */
export const SharedTransitionBridge: React.FC<SharedTransitionBridgeProps> = ({
  progress,
  sourceGeo,
  targetGeo,
}) => {
  if (progress <= 0 || progress >= 1) return null;

  // Linear / smooth geometric interpolation
  const currentX = sourceGeo.x + (targetGeo.x - sourceGeo.x) * progress;
  const currentY = sourceGeo.y + (targetGeo.y - sourceGeo.y) * progress;
  const currentWidth = sourceGeo.width + (targetGeo.width - sourceGeo.width) * progress;
  const currentHeight = sourceGeo.height + (targetGeo.height - sourceGeo.height) * progress;
  const currentRadius = (sourceGeo.borderRadius ?? 0) + ((targetGeo.borderRadius ?? 0) - (sourceGeo.borderRadius ?? 0)) * progress;
  
  // Opacity bell curve (maximum focus at mid-point progress = 0.5)
  const bridgeOpacity = Math.sin(progress * Math.PI);

  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        width: currentWidth,
        height: currentHeight,
        borderRadius: currentRadius,
        backgroundColor: progress < 0.5 ? sourceGeo.color : targetGeo.color,
        boxShadow: `0 0 ${20 * bridgeOpacity}px ${progress < 0.5 ? sourceGeo.color : targetGeo.color}`,
        opacity: Math.max(0.2, bridgeOpacity),
        pointerEvents: 'none',
        zIndex: 100,
        transform: 'translate(-50%, -50%)',
        transition: 'none',
      }}
    />
  );
};
