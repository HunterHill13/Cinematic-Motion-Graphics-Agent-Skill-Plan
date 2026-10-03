import React from 'react';
import { Entrance } from './Entrance';

export interface StaggeredProps {
  children: React.ReactNode[];
  startFrame?: number;
  staggerFrames?: number;
  type?: 'rise' | 'scale' | 'slideLeft';
}

/**
 * Staggered - Coordinates child element entrances with 3-6 frame offsets.
 * Nothing in a professional video enters simultaneously.
 */
export const Staggered: React.FC<StaggeredProps> = ({
  children,
  startFrame = 0,
  staggerFrames = 4,
  type = 'rise',
}) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Entrance key={index} delay={startFrame + index * staggerFrames} type={type}>
          {child}
        </Entrance>
      ))}
    </>
  );
};
