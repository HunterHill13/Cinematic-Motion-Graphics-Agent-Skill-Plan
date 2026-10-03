import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { theme } from './theme';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="CinematicVideo"
        component={Main}
        durationInFrames={1800} // 60s @ 30fps default
        fps={theme.layout.fps}
        width={theme.layout.width}
        height={theme.layout.height}
      />
      {/* Pilot Composition (first 20s = 600 frames) */}
      <Composition
        id="PilotPreview"
        component={Main}
        durationInFrames={600}
        fps={theme.layout.fps}
        width={theme.layout.width}
        height={theme.layout.height}
      />
    </>
  );
};
