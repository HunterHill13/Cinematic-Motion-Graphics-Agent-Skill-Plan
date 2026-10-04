import React from 'react';
import { Composition } from 'remotion';
import { Apoptosis916Main } from './projects/apoptosis_cancer_9_16/src/Apoptosis916Main';
import { Main } from './Main';

export const Root: React.FC = () => {
  return (
    <>
      {/* v2.1 Vertical Master Composition (9:16 - 1080x1920) */}
      <Composition
        id="ApoptosisCancer916"
        component={Apoptosis916Main}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Legacy 16:9 Landscape Composition */}
      <Composition
        id="CinematicExplainer"
        component={Main}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
