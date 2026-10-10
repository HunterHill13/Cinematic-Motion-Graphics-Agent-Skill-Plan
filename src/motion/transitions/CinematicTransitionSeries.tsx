/**
 * ============================================================================
 * CINEMATIC TRANSITION SERIES (@remotion/transitions)
 * ============================================================================
 * 
 * Provides production-grade cinematic act transitions between major scenes/acts:
 * 1. Wipe & Slide (Directional velocity handoffs).
 * 2. Fade / Film Burn (Smooth illumination exposure).
 * 3. Flip & 3D Pivot (For dramatic section reveals).
 * 4. Spring & Linear Timing controls.
 * ============================================================================
 */

import React from 'react';
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { fade } from '@remotion/transitions/fade';
import { flip } from '@remotion/transitions/flip';

export type TransitionStyle =
  | 'slide_horizontal'
  | 'slide_vertical'
  | 'wipe_horizontal'
  | 'fade'
  | 'flip_3d';

export interface ActTransitionConfig {
  style: TransitionStyle;
  durationInFrames: number;
  timingType?: 'spring' | 'linear';
}

/**
 * Returns a configured TransitionSeries.Transition element based on high-level style.
 */
export function createCinematicTransition(config: ActTransitionConfig) {
  const { style, durationInFrames, timingType = 'spring' } = config;

  const timing =
    timingType === 'spring'
      ? springTiming({ config: { damping: 14, stiffness: 180, mass: 0.8 }, durationInFrames })
      : linearTiming({ durationInFrames });

  switch (style) {
    case 'slide_horizontal':
      return (
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={timing}
        />
      );
    case 'slide_vertical':
      return (
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={timing}
        />
      );
    case 'wipe_horizontal':
      return (
        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-left' })}
          timing={timing}
        />
      );
    case 'flip_3d':
      return (
        <TransitionSeries.Transition
          presentation={flip({ direction: 'from-right' })}
          timing={timing}
        />
      );
    case 'fade':
    default:
      return (
        <TransitionSeries.Transition
          presentation={fade()}
          timing={timing}
        />
      );
  }
}

export { TransitionSeries };
