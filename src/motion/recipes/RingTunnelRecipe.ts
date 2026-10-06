import { interpolate, Easing } from 'remotion';

export interface TunnelRing {
  radius: number;
  strokeWidth: number;
  opacity: number;
  scale: number;
  zIndex: number;
}

export interface RingTunnelResult {
  rings: TunnelRing[];
  centerFocalOpacity: number;
  cameraZ: number;
}

/**
 * RECIPE: RingTunnel
 * Source Reference: hyperframes (transitions-radial / wireframe-portal)
 * Renders concentric expanding rings creating deep spatial parallax and tunnel illusion.
 * Communicates depth and portal transitions without WebGL or 3D engine overhead.
 */
export function executeRingTunnel(
  frame: number,
  startFrame: number,
  ringCount: number = 5,
  cycleDuration: number = 40,
  maxRadius: number = 700
): RingTunnelResult {
  const rel = frame - startFrame;
  const cameraZ = rel * 1.5;

  const rings: TunnelRing[] = [];
  for (let i = 0; i < ringCount; i++) {
    // Stagger phase offset per ring
    const phase = ((rel + i * (cycleDuration / ringCount)) % cycleDuration) / cycleDuration;
    // Radial expansion curve (accelerating outward toward camera)
    const expansion = Easing.bezier(0.4, 0.0, 0.2, 1)(phase);

    const radius = expansion * maxRadius;
    const scale = 0.2 + expansion * 1.8;
    // Fade in gently near center, peak, and fade out as it approaches camera edge
    const opacity = interpolate(phase, [0, 0.2, 0.7, 1], [0, 0.8, 0.6, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const strokeWidth = interpolate(phase, [0, 1], [1.5, 4], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    rings.push({
      radius,
      strokeWidth,
      opacity,
      scale,
      zIndex: Math.round(expansion * 100),
    });
  }

  // Sort rings by scale so front rings composite properly
  rings.sort((a, b) => a.zIndex - b.zIndex);

  return {
    rings,
    centerFocalOpacity: interpolate(rel, [0, 10], [0, 1], { extrapolateRight: 'clamp' }),
    cameraZ,
  };
}
