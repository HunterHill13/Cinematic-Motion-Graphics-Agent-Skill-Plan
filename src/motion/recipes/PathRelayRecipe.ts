import { calculateDraw } from '../mechanisms/Draw';
import { calculateRelay } from '../mechanisms/Relay';
import { calculateTravel } from '../mechanisms/Travel';

export interface PathRelayResult {
  drawProgress: number;
  drawDashOffset: number;
  beaconPosition: { x: number; y: number; opacity: number };
  relayEnergy: number;
}

/**
 * RECIPE: PathRelay
 * Composes: Draw + Relay + Travel
 * A vector baseline draws from origin to terminus, transfers its kinetic energy
 * at the endpoint to a traveling actor, which launches across the canvas.
 */
export function executePathRelay(
  frame: number,
  startFrame: number,
  pathDuration: number,
  pathLength: number,
  travelDuration: number,
  startPoint: { x: number; y: number },
  relayPoint: { x: number; y: number },
  endPoint: { x: number; y: number }
): PathRelayResult {
  const draw = calculateDraw(frame, startFrame, pathDuration, pathLength);
  const relayFrame = startFrame + pathDuration;
  const relay = calculateRelay(frame, relayFrame, 6);
  const travel = calculateTravel(frame, relayFrame, travelDuration, relayPoint, endPoint);

  return {
    drawProgress: draw.progress,
    drawDashOffset: draw.dashOffset,
    beaconPosition: {
      x: travel.x,
      y: travel.y,
      opacity: relay.incomingOpacity,
    },
    relayEnergy: relay.energyTransfer,
  };
}
