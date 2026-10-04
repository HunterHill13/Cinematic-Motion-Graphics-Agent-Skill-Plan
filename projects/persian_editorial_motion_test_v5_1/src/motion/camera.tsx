/**
 * V5.1 Motion Primitives: 2.5D Editorial Camera System
 * Enforces Rule B11 (Camera + Object Interaction) & aesthetic-rules.md Q3 (Zero handheld shake).
 */
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export interface CamKey2D {
  frame: number;
  cx: number;
  cy: number;
  zoom: number;
  rotX?: number; // pitch
  rotY?: number; // yaw
  rotZ?: number; // roll
  persp?: number; // perspective in px
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const EditorialCamera: React.FC<{
  keys: CamKey2D[];
  children?: React.ReactNode;
  bg?: string;
  blur?: number;
  ease?: (t: number) => number;
}> = ({
  keys,
  children,
  bg = '#050814',
  blur = 0,
  ease = Easing.bezier(0.33, 0, 0.15, 1),
}) => {
  const frame = useCurrentFrame();

  let a = keys[0];
  let b = keys[keys.length - 1];

  for (let i = 0; i < keys.length - 1; i++) {
    if (frame >= keys[i].frame && frame <= keys[i + 1].frame) {
      a = keys[i];
      b = keys[i + 1];
      break;
    }
  }

  const t =
    a.frame === b.frame
      ? 1
      : interpolate(frame, [a.frame, b.frame], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: ease,
        });

  const cx = lerp(a.cx, b.cx, t);
  const cy = lerp(a.cy, b.cy, t);
  const zoom = lerp(a.zoom, b.zoom, t);
  const rotX = lerp(a.rotX ?? 0, b.rotX ?? 0, t);
  const rotY = lerp(a.rotY ?? 0, b.rotY ?? 0, t);
  const rotZ = lerp(a.rotZ ?? 0, b.rotZ ?? 0, t);
  const persp = lerp(a.persp ?? 1400, b.persp ?? 1400, t);

  return (
    <AbsoluteFill style={{ overflow: 'hidden', backgroundColor: bg }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: `${persp * zoom}px`,
          perspectiveOrigin: '960px 540px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 1920,
            height: 1080,
            transform: `translate3d(${960 - cx * zoom}px, ${540 - cy * zoom}px, 0px) scale3d(${zoom}, ${zoom}, 1) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
            transformOrigin: '960px 540px',
            transformStyle: 'preserve-3d',
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
