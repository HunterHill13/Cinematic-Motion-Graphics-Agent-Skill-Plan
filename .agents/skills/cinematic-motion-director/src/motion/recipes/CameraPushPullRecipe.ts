import { interpolate, Easing } from 'remotion';

export interface CameraTransform {
  scale: number;
  translateX: number;
  translateY: number;
  rotateDeg: number;
}

export type CameraMovementType = 'slow-push' | 'slow-pull' | 'punch-in' | 'orbit-pan';

/**
 * RECIPE: CameraPushPull
 * Source Reference: chief-motion-skill (RULES.md) / motion-graphics-skills (motion-craft.md)
 * Implements motivated cinematic camera movements.
 * Anti-drift invariant: Every camera move must have narrative or spatial purpose.
 * Holds maintain living breathing (1.00 -> 1.04) rather than static paralysis.
 */
export function executeCameraPushPull(
  frame: number,
  startFrame: number,
  duration: number = 60,
  type: CameraMovementType = 'slow-push',
  focalOffset: { x: number; y: number } = { x: 0, y: 0 }
): CameraTransform {
  const rel = frame - startFrame;
  const progress = Math.min(1, Math.max(0, rel / Math.max(1, duration)));

  switch (type) {
    case 'slow-push': {
      // Subtle cinematic drift 1.00 -> 1.05
      const s = interpolate(progress, [0, 1], [1.0, 1.05], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      });
      return {
        scale: s,
        translateX: interpolate(progress, [0, 1], [0, focalOffset.x * 0.05]),
        translateY: interpolate(progress, [0, 1], [0, focalOffset.y * 0.05]),
        rotateDeg: 0,
      };
    }
    case 'slow-pull': {
      // Reveal context 1.05 -> 1.00
      const s = interpolate(progress, [0, 1], [1.05, 1.0], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
      });
      return {
        scale: s,
        translateX: interpolate(progress, [0, 1], [focalOffset.x * 0.05, 0]),
        translateY: interpolate(progress, [0, 1], [focalOffset.y * 0.05, 0]),
        rotateDeg: 0,
      };
    }
    case 'punch-in': {
      // Dramatic emphasis hit on structural beat: 1.00 -> 1.15 in 12 frames
      const punchP = Easing.bezier(0.16, 1, 0.3, 1)(Math.min(1, rel / 14));
      const s = interpolate(punchP, [0, 1], [1.0, 1.18]);
      return {
        scale: s,
        translateX: interpolate(punchP, [0, 1], [0, focalOffset.x]),
        translateY: interpolate(punchP, [0, 1], [0, focalOffset.y]),
        rotateDeg: 0,
      };
    }
    case 'orbit-pan': {
      // Gentle spatial parallax pan
      const panP = Easing.inOut(Easing.quad)(progress);
      return {
        scale: 1.02,
        translateX: interpolate(panP, [0, 1], [-20, 20]),
        translateY: interpolate(panP, [0, 1], [5, -5]),
        rotateDeg: interpolate(panP, [0, 1], [-0.5, 0.5]),
      };
    }
  }
}
