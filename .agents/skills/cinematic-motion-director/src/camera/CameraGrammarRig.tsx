import React from 'react';
import { useCurrentFrame } from 'remotion';
import { CameraCurveConfig, CameraMode, calculateCameraGrammar } from './cameraGrammar';

export interface CameraGrammarRigProps {
  children: React.ReactNode;
  config?: CameraCurveConfig;
  mode?: CameraMode;
  durationInFrames?: number;
  intensity?: number;
  depth?: number;
  readingWindows?: [number, number][];
  settleFrame?: number;
  style?: React.CSSProperties;
}

/**
 * CameraGrammarRig Component
 * Wraps a shot with a single, motivated cinematic camera curve.
 * Supports both full `config` object and convenient shorthand props (`mode`, `durationInFrames`, etc.).
 */
export const CameraGrammarRig: React.FC<CameraGrammarRigProps> = ({
  children,
  config,
  mode = 'micro-push',
  durationInFrames = 300,
  intensity = 1.0,
  depth = 1200,
  readingWindows,
  settleFrame,
  style,
}) => {
  const frame = useCurrentFrame();

  const finalConfig: CameraCurveConfig = config ?? {
    mode,
    durationInFrames,
    depth,
    readingWindows,
    settleFrame,
    startZoom: mode === 'micro-pull' ? 1.0 + 0.025 * intensity : 1.0,
    endZoom: mode === 'micro-push' ? 1.0 + 0.025 * intensity : mode === 'micro-pull' ? 1.0 : 1.015,
  };

  const cam = calculateCameraGrammar(frame, finalConfig);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        perspective: `${cam.depth}px`,
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: cam.transformStyle,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};
