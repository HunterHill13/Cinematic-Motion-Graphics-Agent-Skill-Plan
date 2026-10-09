import { spring } from 'remotion';

export interface ScatterParticle {
  id: number;
  currentX: number;
  currentY: number;
  currentScale: number;
  currentOpacity: number;
  rotationDeg: number;
}

export interface ScatterReassembleResult {
  particles: ScatterParticle[];
  isSettled: boolean;
  phase: 'scatter' | 'reassemble' | 'hold';
}

/**
 * RECIPE: ScatterReassemble
 * Source Reference: hyperframes (transitions-destruction / scatter) / motion-graphics-skills
 * Elements explode/scatter outwards under impulse, then reassemble into ordered layout.
 * Visualizes synthesis from chaos, multi-source evidence collation, and convergence.
 */
export function executeScatterReassemble(
  frame: number,
  startFrame: number,
  fps: number = 30,
  targetPositions: Array<{ x: number; y: number }>,
  scatterRadius: number = 300
): ScatterReassembleResult {
  const rel = frame - startFrame;
  const reassembleFrame = 14;

  const particles: ScatterParticle[] = targetPositions.map((target, idx) => {
    // Deterministic angle based on index
    const angle = (idx / targetPositions.length) * Math.PI * 2;
    const scatterX = Math.cos(angle) * (scatterRadius + (idx % 3) * 40);
    const scatterY = Math.sin(angle) * (scatterRadius + (idx % 2) * 40);

    let currentX: number;
    let currentY: number;
    let currentScale: number;
    let currentOpacity: number;
    let rotationDeg: number;

    if (rel < reassembleFrame) {
      // Phase 1: Rapid outward explosion/scatter (0 -> 10 frames)
      const explodeProgress = spring({
        frame: rel,
        fps,
        config: { damping: 10, stiffness: 220 },
      });
      currentX = scatterX * explodeProgress;
      currentY = scatterY * explodeProgress;
      currentScale = 0.5 + explodeProgress * 0.7;
      currentOpacity = Math.min(1, rel * 0.25);
      rotationDeg = explodeProgress * 45 * (idx % 2 === 0 ? 1 : -1);
    } else {
      // Phase 2: Snap back into structured target positions
      const snapProgress = spring({
        frame: rel - reassembleFrame,
        fps,
        config: { damping: 14, stiffness: 140 },
      });
      currentX = scatterX + (target.x - scatterX) * snapProgress;
      currentY = scatterY + (target.y - scatterY) * snapProgress;
      currentScale = 1.2 - snapProgress * 0.2;
      currentOpacity = 1;
      rotationDeg = (1 - snapProgress) * 45 * (idx % 2 === 0 ? 1 : -1);
    }

    return {
      id: idx,
      currentX,
      currentY,
      currentScale,
      currentOpacity,
      rotationDeg,
    };
  });

  const isSettled = rel > reassembleFrame + 20;
  const phase = rel < reassembleFrame ? 'scatter' : isSettled ? 'hold' : 'reassemble';

  return {
    particles,
    isSettled,
    phase,
  };
}
