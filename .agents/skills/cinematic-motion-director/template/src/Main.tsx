import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BgMesh } from './effects/BgMesh';
import { Grade, Vignette } from './effects/Grade';
import { Grain } from './effects/Grain';
import { CameraRig } from './camera/CameraRig';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14' }}>
      {/* Layer 1: Ambient Background */}
      <BgMesh />

      {/* Layer 2: Camera & Scene Shots */}
      <CameraRig direction="push" maxScale={1.05}>
        <AbsoluteFill>
          {/* Dynamic shot components will be mounted here */}
        </AbsoluteFill>
      </CameraRig>

      {/* Layer 3: Color Grade */}
      <Grade opacity={0.14} />

      {/* Layer 4: Vignette */}
      <Vignette intensity={0.35} />

      {/* Layer 5: Procedural Film Grain */}
      <Grain opacity={0.04} />
    </AbsoluteFill>
  );
};
