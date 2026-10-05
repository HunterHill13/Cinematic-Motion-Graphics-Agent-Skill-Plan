import { calculateTravel } from '../mechanisms/Travel';
import { calculateRelay } from '../mechanisms/Relay';
import { calculateCollision } from '../mechanisms/Collision';

export interface ObjectHandoffResult {
  source: { x: number; y: number; opacity: number };
  destination: { x: number; y: number; opacity: number };
  handoverEnergy: number;
  impactDisplacement: number;
}

/**
 * RECIPE: ObjectHandoff
 * Composes: Travel + Relay + Collision
 * Kinetic velocity baton pass: Source actor moves to contact coordinate,
 * hands off momentum to Destination actor, which rebounds and continues.
 */
export function executeObjectHandoff(
  frame: number,
  startFrame: number,
  handoffFrame: number,
  endFrame: number,
  from: { x: number; y: number },
  contact: { x: number; y: number },
  to: { x: number; y: number }
): ObjectHandoffResult {
  const travelSource = calculateTravel(
    frame,
    startFrame,
    handoffFrame - startFrame,
    from,
    contact
  );

  const relay = calculateRelay(frame, handoffFrame, 8);
  const collision = calculateCollision(frame, handoffFrame, { reboundAmplitude: 6 });

  const travelDest = calculateTravel(
    frame,
    handoffFrame,
    endFrame - handoffFrame,
    contact,
    to
  );

  return {
    source: {
      x: travelSource.x,
      y: travelSource.y,
      opacity: relay.outgoingOpacity,
    },
    destination: {
      x: travelDest.x,
      y: travelDest.y + collision.displacementY,
      opacity: relay.incomingOpacity,
    },
    handoverEnergy: relay.energyTransfer,
    impactDisplacement: collision.displacementY,
  };
}
