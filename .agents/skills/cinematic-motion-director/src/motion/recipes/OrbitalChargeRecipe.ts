import { calculateOrbit, OrbitState } from '../mechanisms/KineticType';
import { calculateTravel, TravelState } from '../mechanisms/Travel';
import { calculateReveal, RevealState } from '../mechanisms/Reveal';

export interface OrbitalChargeResult {
  orbit: OrbitState;
  travel: TravelState;
  reveal: RevealState;
  chargeEnergy: number;
}

/**
 * RECIPE: OrbitalCharge
 * Composes: Orbit + Travel + Reveal
 * Satellites orbit a central attractor while accumulating charge,
 * collapsing into a linear vector impulse that triggers a primary reveal.
 */
export function executeOrbitalCharge(
  frame: number,
  orbitStart: number,
  collapseFrame: number,
  duration: number,
  center: { x: number; y: number },
  target: { x: number; y: number }
): OrbitalChargeResult {
  const orbit = calculateOrbit(frame, center, 120, 60, 0.08);
  const travel = calculateTravel(
    frame,
    collapseFrame,
    duration,
    { x: orbit.x, y: orbit.y },
    target
  );
  const reveal = calculateReveal(frame, collapseFrame + duration * 0.7, duration * 0.5, 'up', 30);

  const chargeEnergy = frame < collapseFrame 
    ? Math.min(1, (frame - orbitStart) / Math.max(1, collapseFrame - orbitStart))
    : 1.0;

  return {
    orbit,
    travel,
    reveal,
    chargeEnergy,
  };
}
