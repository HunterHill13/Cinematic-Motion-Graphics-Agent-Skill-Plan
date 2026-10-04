import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { organicDrift2D, organicNoise1D } from './NoiseField';

export interface LivingCameraRigProps {
  children: React.ReactNode;
  durationInFrames: number;
  initialScale?: number;
  targetScale?: number; // Subtle continuous push/pull (e.g. 1.00 -> 1.045)
  enableHandheldDrift?: boolean;
  driftIntensity?: number; // Pixel drift amplitude
  enableImpulseShake?: boolean;
  shakeAtFrame?: number;
  shakeDecayFrames?: number;
  shakeIntensity?: number;
}

/**
 * LivingCameraRig combines cinematic push/pull with procedural handheld drift
 * and impulse impact damping, replacing rigid linear motion.
 */
export const LivingCameraRig: React.FC<LivingCameraRigProps> = ({
  children,
  durationInFrames,
  initialScale = 1.0,
  targetScale = 1.045,
  enableHandheldDrift = true,
  driftIntensity = 8.0,
  enableImpulseShake = false,
  shakeAtFrame = 0,
  shakeDecayFrames = 15,
  shakeIntensity = 12.0,
}) => {
  const frame = useCurrentFrame();

  // 1. Base cinematic continuous scale push
  const baseScale = interpolate(
    frame,
    [0, Math.max(1, durationInFrames)],
    [initialScale, targetScale],
    { extrapolateRight: 'clamp' }
  );

  // 2. Procedural handheld camera drift (multi-octave continuous noise)
  let driftX = 0;
  let driftY = 0;
  let driftRotate = 0;

  if (enableHandheldDrift) {
    const [dx, dy] = organicDrift2D(frame, { frequency: 0.015, seed: 104 });
    driftX = dx * driftIntensity;
    driftY = dy * driftIntensity;
    driftRotate = organicNoise1D(frame, { frequency: 0.012, seed: 991 }) * 0.35; // Max 0.35 deg
  }

  // 3. Impact impulse shake (e.g. on dramatic beat hits)
  let shakeX = 0;
  let shakeY = 0;

  if (enableImpulseShake && frame >= shakeAtFrame && frame < shakeAtFrame + shakeDecayFrames) {
    const elapsed = frame - shakeAtFrame;
    const decay = interpolate(elapsed, [0, shakeDecayFrames], [1, 0]);
    shakeX = Math.sin(elapsed * 1.8) * shakeIntensity * decay;
    shakeY = Math.cos(elapsed * 2.1) * shakeIntensity * decay;
  }

  const totalTranslateX = driftX + shakeX;
  const totalTranslateY = driftY + shakeY;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transform: `translate3d(${totalTranslateX.toFixed(2)}px, ${totalTranslateY.toFixed(2)}px, 0px) scale(${baseScale.toFixed(4)}) rotate(${driftRotate.toFixed(3)}deg)`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
