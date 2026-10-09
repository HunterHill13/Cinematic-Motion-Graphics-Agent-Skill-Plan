/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: INFINITE SPATIAL CANVAS ARCHITECTURE
 * ============================================================================
 * 
 * True one-take continuous 3D world canvas. Eliminates isolated sequence
 * chopping, opacity 0 unmounting, and static slideshow cards.
 * 
 * 1. InfiniteSpatialCanvas: Global 3D coordinate space with 6-DOF virtual camera.
 * 2. SpatialEntity: World-anchored scene nodes positioned at absolute (worldX, worldY, worldZ).
 * 3. Perspective Foreshortening & Multi-Plane Parallax: Out-of-focus scenes
 *    remain physically co-present in the 3D world as the camera glides between them.
 * 4. Universal Architecture: Works across any topic, script, or narrative structure.
 * ============================================================================
 */

import React from 'react';

export interface InfiniteSpatialCanvasProps {
  camX: number;
  camY: number;
  camZ: number;
  camPitch?: number; // rotateX in degrees
  camYaw?: number;   // rotateY in degrees
  camRoll?: number;  // rotateZ in degrees
  perspective?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const InfiniteSpatialCanvas: React.FC<InfiniteSpatialCanvasProps> = ({
  camX,
  camY,
  camZ,
  camPitch = 0,
  camYaw = 0,
  camRoll = 0,
  perspective = 1200,
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        ...style,
      }}
    >
      {/* 3D World Stage with Inverse Virtual Camera Transform */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
          transform: `
            translate3d(${-camX}px, ${-camY}px, ${-camZ}px)
            rotateX(${camPitch}deg)
            rotateY(${camYaw}deg)
            rotateZ(${camRoll}deg)
          `,
          transformOrigin: '0 0 0',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export interface SpatialEntityProps {
  worldX: number;
  worldY?: number;
  worldZ?: number;
  pitch?: number;
  yaw?: number;
  roll?: number;
  scale?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SpatialEntity: React.FC<SpatialEntityProps> = ({
  worldX,
  worldY = 0,
  worldZ = 0,
  pitch = 0,
  yaw = 0,
  roll = 0,
  scale = 1,
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transformStyle: 'preserve-3d',
        transform: `
          translate3d(${worldX}px, ${worldY}px, ${worldZ}px)
          rotateX(${pitch}deg)
          rotateY(${yaw}deg)
          rotateZ(${roll}deg)
          scale(${scale})
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
