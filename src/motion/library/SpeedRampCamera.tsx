/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: SPEED RAMP CAMERA & WHIP-SNAP TRANSITION RIG
 * ============================================================================
 * 
 * In premier studio motion graphics:
 * The virtual camera does NOT float on linear cruise control.
 * High-energy pacing is achieved via:
 * 1. Micro-Breathing Holds: Gentle harmonic sine float while focusing on a hero.
 * 2. Rapid Exponential Speed Ramps: Sudden 8-12 frame whip transitions between acts.
 * 3. Directional Motion Blur Shader: High-velocity blur layer at peak snap velocity.
 * 4. Coordinate Skew Shear: Physical camera inertia simulation (skewX / skewY).
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export interface CameraWaypoint {
  frame: number;
  x: number;
  y: number;
  z: number;
  pitch?: number;
  yaw?: number;
  roll?: number;
}

export interface SpeedRampCameraProps {
  children: React.ReactNode;
  waypoints: CameraWaypoint[];
  /** Transition window in frames for speed ramp between waypoints (default: 12) */
  rampDurationFrames?: number;
  /** Enable dynamic directional motion blur at peak velocity */
  enableMotionBlur?: boolean;
  style?: React.CSSProperties;
}

export const SpeedRampCamera: React.FC<SpeedRampCameraProps> = ({
  children,
  waypoints,
  rampDurationFrames = 12,
  enableMotionBlur = true,
  style = {},
}) => {
  const frame = useCurrentFrame();

  if (waypoints.length === 0) {
    return <div style={{ width: '100%', height: '100%', ...style }}>{children}</div>;
  }

  // Find surrounding waypoints
  let currentWaypoint = waypoints[0];
  let nextWaypoint = waypoints[0];

  for (let i = 0; i < waypoints.length - 1; i++) {
    if (frame >= waypoints[i].frame && frame < waypoints[i + 1].frame) {
      currentWaypoint = waypoints[i];
      nextWaypoint = waypoints[i + 1];
      break;
    } else if (frame >= waypoints[waypoints.length - 1].frame) {
      currentWaypoint = waypoints[waypoints.length - 1];
      nextWaypoint = waypoints[waypoints.length - 1];
    }
  }

  // Micro-breathing float during focal hold
  const breatheX = Math.sin(frame * 0.05) * 2.5;
  const breatheY = Math.cos(frame * 0.04) * 1.8;

  let x = currentWaypoint.x;
  let y = currentWaypoint.y;
  let z = currentWaypoint.z;
  let pitch = currentWaypoint.pitch || 0;
  let yaw = currentWaypoint.yaw || 0;
  let roll = currentWaypoint.roll || 0;
  let blurAmount = 0;
  let skewShear = 0;

  if (currentWaypoint !== nextWaypoint) {
    const transitionStart = nextWaypoint.frame - rampDurationFrames;
    if (frame < transitionStart) {
      // Hold phase with micro-breathing
      x = currentWaypoint.x + breatheX;
      y = currentWaypoint.y + breatheY;
      z = currentWaypoint.z;
      pitch = currentWaypoint.pitch || 0;
      yaw = currentWaypoint.yaw || 0;
      roll = currentWaypoint.roll || 0;
    } else {
      // Rapid Speed Ramp Phase (Exponential acceleration curve)
      const t = interpolate(
        frame,
        [transitionStart, nextWaypoint.frame],
        [0, 1],
        {
          easing: Easing.bezier(0.85, 0.0, 0.15, 1.0),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      );

      x = interpolate(t, [0, 1], [currentWaypoint.x, nextWaypoint.x]);
      y = interpolate(t, [0, 1], [currentWaypoint.y, nextWaypoint.y]);
      z = interpolate(t, [0, 1], [currentWaypoint.z, nextWaypoint.z]);
      pitch = interpolate(t, [0, 1], [currentWaypoint.pitch || 0, nextWaypoint.pitch || 0]);
      yaw = interpolate(t, [0, 1], [currentWaypoint.yaw || 0, nextWaypoint.yaw || 0]);
      roll = interpolate(t, [0, 1], [currentWaypoint.roll || 0, nextWaypoint.roll || 0]);

      // Peak velocity calculation at midpoint
      const velocityBell = Math.sin(t * Math.PI); // 0 at start, 1 at midpoint, 0 at end
      const deltaX = nextWaypoint.x - currentWaypoint.x;
      blurAmount = velocityBell * Math.min(12, Math.abs(deltaX) * 0.04);
      skewShear = velocityBell * Math.max(-4, Math.min(4, deltaX * -0.015));
    }
  } else {
    x += breatheX;
    y += breatheY;
  }

  // Camera perspective translation matrix
  const cameraTransform = `perspective(1000px) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg) skewX(${skewShear.toFixed(2)}deg)`;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: cameraTransform,
          transformOrigin: '50% 50%',
          filter: enableMotionBlur && blurAmount > 0.5 ? `blur(${blurAmount.toFixed(1)}px)` : undefined,
          willChange: 'transform, filter',
        }}
      >
        {children}
      </div>
    </div>
  );
};
