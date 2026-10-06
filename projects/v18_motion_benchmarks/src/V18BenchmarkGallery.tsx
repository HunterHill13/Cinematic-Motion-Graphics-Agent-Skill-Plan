import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Benchmark1_KineticTypeSlam } from './Benchmark1_KineticTypeSlam';
import { Benchmark2_DotToLineRibbon } from './Benchmark2_DotToLineRibbon';
import { Benchmark3_ShapeMorphToChart } from './Benchmark3_ShapeMorphToChart';
import { Benchmark4_RingTunnelDepth } from './Benchmark4_RingTunnelDepth';
import { Benchmark5_ClichéVsCinematic } from './Benchmark5_ClichéVsCinematic';

/**
 * V18 BENCHMARK GALLERY
 * Complete sequenced exhibition of V18 motion craft:
 * - 000f - 120f (4.0s): Benchmark 1 - Kinetic Typography Slam
 * - 120f - 240f (4.0s): Benchmark 2 - Geometric Evolution (Dot -> Line -> Ribbon)
 * - 240f - 360f (4.0s): Benchmark 3 - Shape Morph to Data Chart
 * - 360f - 480f (4.0s): Benchmark 4 - Spatial Ring Tunnel Depth
 * - 480f - 630f (5.0s): Benchmark 5 - Cliché vs Cinematic Split Screen
 * Total Duration: 630 frames (21.0s @ 30 FPS)
 */
export const V18BenchmarkGallery: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07090E' }}>
      <Sequence from={0} durationInFrames={120}>
        <Benchmark1_KineticTypeSlam />
      </Sequence>

      <Sequence from={120} durationInFrames={120}>
        <Benchmark2_DotToLineRibbon />
      </Sequence>

      <Sequence from={240} durationInFrames={120}>
        <Benchmark3_ShapeMorphToChart />
      </Sequence>

      <Sequence from={360} durationInFrames={120}>
        <Benchmark4_RingTunnelDepth />
      </Sequence>

      <Sequence from={480} durationInFrames={150}>
        <Benchmark5_ClichéVsCinematic />
      </Sequence>
    </AbsoluteFill>
  );
};
