/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: DYNAMIC FRESNEL SPECULAR SWEEP RIG
 * ============================================================================
 * 
 * Computes physically-motivated specular reflection highlights on glass cards
 * and vector surfaces driven dynamically by 6-DOF camera angles (Yaw, Pitch, Roll).
 * As the virtual camera rotates, the specular sheen glides across the material,
 * creating premier studio-grade realism (Buck, Ordinary Folk).
 * ============================================================================
 */

import React from 'react';
import { interpolate } from 'remotion';

export interface DynamicFresnelSweepProps {
  /** Current camera yaw rotation in degrees */
  camYaw: number;
  /** Current camera pitch rotation in degrees */
  camPitch?: number;
  /** Current camera roll rotation in degrees */
  camRoll?: number;
  /** Primary specular highlight color (default: pure white) */
  highlightColor?: string;
  /** Maximum specular opacity (default: 0.35) */
  maxIntensity?: number;
  /** Border radius matching parent container */
  borderRadius?: number | string;
  /** Blend mode: 'overlay' | 'screen' | 'soft-light' */
  blendMode?: 'overlay' | 'screen' | 'soft-light';
  style?: React.CSSProperties;
}

export const DynamicFresnelSweep: React.FC<DynamicFresnelSweepProps> = ({
  camYaw,
  camPitch = 0,
  camRoll = 0,
  highlightColor = 'rgba(255, 255, 255, 0.45)',
  maxIntensity = 0.35,
  borderRadius = 'inherit',
  blendMode = 'overlay',
  style = {},
}) => {
  // Dynamically calculate reflection angle based on camera yaw & roll
  const dynamicAngle = (135 + camYaw * 3.2 + camRoll * 2.5) % 360;

  // Calculate sweep coordinate offset (-30% to 130%)
  const sweepOffset = interpolate(camYaw, [-15, 15], [-20, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Calculate Fresnel angle-of-incidence intensity
  const pitchFactor = Math.max(0.2, Math.cos((camPitch * Math.PI) / 180));
  const effectiveIntensity = Math.min(1.0, maxIntensity * pitchFactor);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius,
        pointerEvents: 'none',
        background: `linear-gradient(${dynamicAngle.toFixed(1)}deg, transparent ${Math.max(0, sweepOffset - 22).toFixed(1)}%, ${highlightColor} ${sweepOffset.toFixed(1)}%, transparent ${Math.min(100, sweepOffset + 22).toFixed(1)}%)`,
        opacity: effectiveIntensity,
        mixBlendMode: blendMode,
        zIndex: 4,
        willChange: 'background, opacity',
        ...style,
      }}
    />
  );
};
