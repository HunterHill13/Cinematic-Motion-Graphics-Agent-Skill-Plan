import { interpolate, spring, Easing } from 'remotion';

export interface DotToLineResult {
  dotScale: number;
  dotOpacity: number;
  lineWidth: number;
  lineHeight: number;
  lineProgress: number; // 0 to 1
  originX: number;
  originY: number;
  isLineActive: boolean;
}

/**
 * RECIPE: DotToLine
 * Source Reference: motion-graphics-skills / hyperframes
 * Transforms a concentrated focal point (dot) into an expansive line vector.
 * Physics: Dot squashes with anticipation, launches right/left, and unrolls into a path.
 */
export function executeDotToLine(
  frame: number,
  startFrame: number,
  fps: number = 30,
  targetLength: number = 400,
  thickness: number = 4
): DotToLineResult {
  const relFrame = frame - startFrame;
  if (relFrame < 0) {
    return {
      dotScale: 0,
      dotOpacity: 0,
      lineWidth: 0,
      lineHeight: thickness,
      lineProgress: 0,
      originX: 0,
      originY: 0,
      isLineActive: false,
    };
  }

  // 1. Dot pops in (Frames 0 - 8)
  const dotPop = spring({
    frame: relFrame,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  // 2. Unroll trigger at frame 10
  const unrollStart = 10;
  const isLineActive = relFrame >= unrollStart;
  const lineProgress = isLineActive
    ? interpolate(relFrame, [unrollStart, unrollStart + 16], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      })
    : 0;

  // Dot fades / dissolves into the line origin
  const dotOpacity = isLineActive
    ? interpolate(relFrame, [unrollStart, unrollStart + 6], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : dotPop;

  const lineWidth = lineProgress * targetLength;

  return {
    dotScale: dotPop,
    dotOpacity,
    lineWidth,
    lineHeight: thickness,
    lineProgress,
    originX: 0,
    originY: 0,
    isLineActive,
  };
}
