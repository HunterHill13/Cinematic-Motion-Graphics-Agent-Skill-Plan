import React from 'react';
import { Composition } from 'remotion';
import { StressTestV31Sequence } from './src/StressTestV31Sequence';

export const StressTestV31Root: React.FC = () => {
  return (
    <Composition
      id="StressTestV31"
      component={StressTestV31Sequence}
      durationInFrames={360} // 12 seconds @ 30 FPS
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
