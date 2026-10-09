import { calculateCollapse } from '../mechanisms/Fold';
import { calculateFold } from '../mechanisms/Fold';
import { calculateTravel } from '../mechanisms/Travel';

export interface AxisCollapseResult {
  rotationAngle: number;
  axisLength: number;
  beaconPosition: { x: number; y: number };
  isReoriented: boolean;
}

/**
 * RECIPE: AxisCollapse
 * Composes: Collapse + Fold + Travel
 * A vertical wall or divider line collapses, rotates 90° into a horizontal datum floor,
 * and carries an active beacon downward along the falling edge.
 */
export function executeAxisCollapse(
  frame: number,
  startFrame: number,
  duration: number,
  pivot: { x: number; y: number },
  initialHeight: number = 240
): AxisCollapseResult {
  const fold = calculateFold(frame, startFrame, duration, 'X', 0, 90);
  const collapse = calculateCollapse(frame, startFrame, duration, 'toZero');
  const travel = calculateTravel(
    frame,
    startFrame,
    duration,
    { x: pivot.x, y: pivot.y - initialHeight / 2 },
    { x: pivot.x, y: pivot.y + 200 }
  );

  return {
    rotationAngle: fold.rotateX,
    axisLength: initialHeight * (1 - collapse.scaleDimension),
    beaconPosition: { x: travel.x, y: travel.y },
    isReoriented: collapse.isCollapsed,
  };
}
