import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { V23DotBallBounceText } from './V23DotBallBounceText';
import { V23TrueShapeMorph } from './V23TrueShapeMorph';
import { V23DataTransformation } from './V23DataTransformation';
import { V23RibbonLineTunnel } from './V23RibbonLineTunnel';

/**
 * V23 MOTION REVIEW (360 frames @ 30 FPS = 12.00s)
 * Compiles the 4 standout visual language breakthrough highlights:
 * - Part 1 (000 - 090f): Dot → Ball → Ground Squash & Stretch Bounce (Benchmark 01)
 * - Part 2 (090 - 180f): True 24-Point Cubic Bézier Shape Morph Loop (Benchmark 04)
 * - Part 3 (180 - 270f): Physical Bar Data Compression into Continuous Trajectory (Benchmark 05)
 * - Part 4 (270 - 360f): Ribbon Waves Fold into 3D Tunnel & Camera Pass-Through (Benchmark 06)
 */
export const V23MotionReview: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#030508' }}>
      {/* Highlight 1: Dot to Ball to Bounce (frames 50 to 140 of B01) */}
      <Sequence from={0} durationInFrames={90} name="H1_DotBallBounce">
        <Sequence from={-50}>
          <V23DotBallBounceText />
        </Sequence>
      </Sequence>

      {/* Highlight 2: True Shape Morph (frames 60 to 150 of B04) */}
      <Sequence from={90} durationInFrames={90} name="H2_TrueShapeMorph">
        <Sequence from={-60}>
          <V23TrueShapeMorph />
        </Sequence>
      </Sequence>

      {/* Highlight 3: Data Transformation (frames 70 to 160 of B05) */}
      <Sequence from={180} durationInFrames={90} name="H3_DataTransformation">
        <Sequence from={-70}>
          <V23DataTransformation />
        </Sequence>
      </Sequence>

      {/* Highlight 4: Ribbon Tunnel & Camera Through (frames 100 to 190 of B06) */}
      <Sequence from={270} durationInFrames={90} name="H4_RibbonTunnelCamera">
        <Sequence from={-100}>
          <V23RibbonLineTunnel />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
