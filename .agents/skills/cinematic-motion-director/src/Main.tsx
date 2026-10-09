import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BgMesh } from './effects/BgMesh';
import { Grade, Vignette } from './effects/Grade';
import { Grain } from './effects/Grain';
import { CameraRig } from './camera/CameraRig';
import { Shot01_Hook } from './shots/Shot01_Hook';
import { Shot02_BCL2_Evasion } from './shots/Shot02_BCL2_Evasion';
import { Shot03_MOMP_Release } from './shots/Shot03_MOMP_Release';
import { Shot04_Apoptosome } from './shots/Shot04_Apoptosome';
import { Shot05_Execution } from './shots/Shot05_Execution';
import { Shot06_Conclusion } from './shots/Shot06_Conclusion';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#070B14' }}>
      {/* Layer 1: Ambient Background Depth */}
      <BgMesh />

      {/* Layer 2: Camera Rig with Continuous Subtle Movement carrying Scene Life */}
      <CameraRig direction="push" maxScale={1.05}>
        <AbsoluteFill>
          {/* Beat 1: The Malignant Hallmark */}
          <Sequence from={0} durationInFrames={300} name="Shot01_Hook">
            <Shot01_Hook />
          </Sequence>

          {/* Beat 2: BCL-2 Molecular Evasion */}
          <Sequence from={300} durationInFrames={300} name="Shot02_BCL2">
            <Shot02_BCL2_Evasion />
          </Sequence>

          {/* Beat 3: MOMP Outer Membrane Pore Formation */}
          <Sequence from={600} durationInFrames={300} name="Shot03_MOMP">
            <Shot03_MOMP_Release />
          </Sequence>

          {/* Beat 4: Heptameric Apoptosome Pinwheel */}
          <Sequence from={900} durationInFrames={300} name="Shot04_Apoptosome">
            <Shot04_Apoptosome />
          </Sequence>

          {/* Beat 5: Caspase-3 Execution & DNA Cleavage */}
          <Sequence from={1200} durationInFrames={300} name="Shot05_Execution">
            <Shot05_Execution />
          </Sequence>

          {/* Beat 6: Therapeutic Resolution */}
          <Sequence from={1500} durationInFrames={300} name="Shot06_Conclusion">
            <Shot06_Conclusion />
          </Sequence>
        </AbsoluteFill>
      </CameraRig>

      {/* Layer 3: Unifying Color Grade Overlay */}
      <Grade opacity={0.14} />

      {/* Layer 4: Vignette Lens Falloff */}
      <Vignette intensity={0.35} />

      {/* Layer 5: Procedural Film Grain */}
      <Grain opacity={0.04} />
    </AbsoluteFill>
  );
};
