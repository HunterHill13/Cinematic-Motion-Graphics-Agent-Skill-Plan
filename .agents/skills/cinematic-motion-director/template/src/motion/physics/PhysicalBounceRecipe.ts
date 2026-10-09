/**
 * PHYSICAL BOUNCE & CONTACT DYNAMICS RECIPE (V28)
 * 
 * Implements a physically plausible, motion-design authored bounce:
 * 
 * 1. PARABOLIC GRAVITATIONAL TRAJECTORY:
 *    During airborne flight (fall & ascent), vertical position follows:
 *    y(t) = apexY + 0.5 * g * (t - t_apex)^2
 *    producing true physical acceleration downward and smooth zero-velocity apex transitions.
 * 
 * 2. GEOMETRIC COEFFICIENT OF RESTITUTION (COR):
 *    Subsequent bounce apex heights decay geometrically:
 *    h_{k+1} = h_k * restitution^2
 *    Duration of each bounce scales with sqrt(height), preserving physics timing:
 *    t_{k+1} = t_k * restitution
 * 
 * 3. EXPLICIT CONTACT & SQUASH WINDOW:
 *    At the floor impact boundary, motion transitions from flight to contact compression.
 *    Scale deforms smoothly:
 *    - Flight: velocity-proportional stretch (scaleY > 1.0, scaleX < 1.0)
 *    - Contact: rapid impact squash (scaleY < 1.0, scaleX > 1.0) conserving mass volume (sx * sy = 1)
 *    - Contact Duration: exactly 2 to 3 frames at 30 FPS.
 * 
 * 4. DETERMINISTIC SETTLE-LOCK:
 *    When bounce amplitude falls below settleThreshold, trajectory clamps cleanly
 *    to floor with zero procedural wobble or float.
 */

export interface PhysicalBounceConfig {
  startY: number;           // Initial release Y coordinate (e.g. 200px)
  floorY: number;           // Floor contact plane Y coordinate (e.g. 640px)
  totalDurationFrames: number; // Duration of sequence (e.g. 90f = 3.0s)
  restitution?: number;     // Energy retention coefficient (0.55 - 0.75, default 0.65)
  bounceCount?: number;     // Number of distinct rebounds (default 3 to 4)
  contactFrames?: number;   // Compression duration on floor (default 2 frames)
  maxSquash?: number;       // Peak horizontal expansion on impact (e.g. 0.40 -> scaleX=1.40, scaleY=0.60)
  maxStretch?: number;      // Peak vertical elongation in flight (e.g. 0.20 -> scaleY=1.20, scaleX=0.83)
  settleThreshold?: number; // Distance in px below which ball rests permanently (default 3px)
}

export type BouncePhase =
  | 'RELEASE'
  | 'FALL'
  | 'CONTACT_COMPRESSION'
  | 'REBOUND_LAUNCH'
  | 'ASCENT'
  | 'APEX'
  | 'SETTLE';

export interface PhysicalBounceState {
  y: number;
  scaleX: number;
  scaleY: number;
  velocity: number; // px/frame
  phase: BouncePhase;
  bounceIndex: number;
  isContact: boolean;
  contactProgress: number; // 0.0 to 1.0 during squash
}

interface BounceArc {
  startTime: number;
  endTime: number;
  duration: number;
  peakHeight: number;
  apexTime: number;
  isFirstFall: boolean;
}

/**
 * Precomputes the deterministic bounce arcs based on physical restitution.
 */
function computeBounceArcs(
  totalFallHeight: number,
  totalFrames: number,
  restitution: number,
  maxBounces: number,
  contactFrames: number
): BounceArc[] {
  // First fall duration is half a bounce (from release to first contact)
  // Let T_first = t_0. Subsequent full bounces have duration T_k = 2 * t_0 * (restitution)^k
  // Total time = t_0 + sum_{k=1}^{N} [ (2 * t_0 * e^k) + contactFrames ]
  // We solve for t_0 such that total time fits within totalFrames.
  
  let timeWeight = 1.0; // Initial fall
  let currentRest = restitution;
  for (let i = 1; i <= maxBounces; i++) {
    timeWeight += 2.0 * currentRest;
    currentRest *= restitution;
  }

  const netFlightFrames = Math.max(30, totalFrames - (maxBounces * contactFrames) - 15); // leave 15f for settle
  const t0 = netFlightFrames / timeWeight;

  const arcs: BounceArc[] = [];
  let currentTime = 0;

  // Arc 0: Initial drop
  arcs.push({
    startTime: currentTime,
    endTime: currentTime + t0,
    duration: t0,
    peakHeight: totalFallHeight,
    apexTime: currentTime, // Apex was at release
    isFirstFall: true,
  });
  currentTime += t0 + contactFrames;

  // Subsequent full parabolic bounces
  let currentHeight = totalFallHeight * Math.pow(restitution, 2);
  let currentDuration = 2.0 * t0 * restitution;

  for (let k = 1; k <= maxBounces; k++) {
    if (currentTime >= totalFrames || currentHeight < 2.0) break;

    arcs.push({
      startTime: currentTime,
      endTime: currentTime + currentDuration,
      duration: currentDuration,
      peakHeight: currentHeight,
      apexTime: currentTime + currentDuration * 0.5,
      isFirstFall: false,
    });

    currentTime += currentDuration + contactFrames;
    currentHeight *= Math.pow(restitution, 2);
    currentDuration *= restitution;
  }

  return arcs;
}

/**
 * Evaluates the authoritative physical bounce state at any given frame.
 */
export function evaluatePhysicalBounce(
  config: PhysicalBounceConfig,
  frame: number,
  startFrame: number = 0
): PhysicalBounceState {
  const {
    startY,
    floorY,
    totalDurationFrames,
    restitution = 0.65,
    bounceCount = 4,
    contactFrames = 2,
    maxSquash = 0.38,
    maxStretch = 0.22,
    settleThreshold = 3,
  } = config;

  const totalFallHeight = floorY - startY;
  const relFrame = Math.max(0, frame - startFrame);

  // Precompute arcs
  const arcs = computeBounceArcs(totalFallHeight, totalDurationFrames, restitution, bounceCount, contactFrames);

  // Check if settled
  const lastArc = arcs[arcs.length - 1];
  if (relFrame >= lastArc.endTime + contactFrames || lastArc.peakHeight < settleThreshold) {
    return {
      y: floorY,
      scaleX: 1.0,
      scaleY: 1.0,
      velocity: 0,
      phase: 'SETTLE',
      bounceIndex: arcs.length,
      isContact: true,
      contactProgress: 1.0,
    };
  }

  // Find active arc or contact interval
  for (let i = 0; i < arcs.length; i++) {
    const arc = arcs[i];

    // Flight phase
    if (relFrame >= arc.startTime && relFrame < arc.endTime) {
      if (arc.isFirstFall) {
        // Initial fall from release
        const p = (relFrame - arc.startTime) / arc.duration;
        const y = startY + totalFallHeight * Math.pow(p, 2); // Pure gravitational acceleration
        const vel = (2 * totalFallHeight * p) / arc.duration;

        // Stretch proportional to downward velocity
        const stretchFactor = Math.min(maxStretch, (vel / 25) * maxStretch);
        const sy = 1.0 + stretchFactor;
        const sx = 1.0 / sy; // Volume conservation

        return {
          y,
          scaleX: Number(sx.toFixed(4)),
          scaleY: Number(sy.toFixed(4)),
          velocity: Number(vel.toFixed(3)),
          phase: p < 0.1 ? 'RELEASE' : 'FALL',
          bounceIndex: i,
          isContact: false,
          contactProgress: 0,
        };
      } else {
        // Parabolic rebound arc
        const tRel = relFrame - arc.apexTime; // time relative to apex
        const halfT = arc.duration * 0.5;
        const normT = tRel / halfT; // -1 at launch, 0 at apex, +1 at contact

        // y(t) = (floorY - peakHeight) + peakHeight * (normT)^2
        const apexY = floorY - arc.peakHeight;
        const y = apexY + arc.peakHeight * Math.pow(normT, 2);
        const vel = (2 * arc.peakHeight * normT) / halfT;

        // Deformation: stretch during high velocity, relaxed (1.0) near apex
        const speed = Math.abs(vel);
        const stretchFactor = Math.min(maxStretch, (speed / 20) * maxStretch);
        const sy = 1.0 + stretchFactor;
        const sx = 1.0 / sy;

        let phase: BouncePhase = 'ASCENT';
        if (Math.abs(normT) < 0.15) phase = 'APEX';
        else if (normT > 0) phase = 'FALL';
        else phase = 'REBOUND_LAUNCH';

        return {
          y,
          scaleX: Number(sx.toFixed(4)),
          scaleY: Number(sy.toFixed(4)),
          velocity: Number(vel.toFixed(3)),
          phase,
          bounceIndex: i,
          isContact: false,
          contactProgress: 0,
        };
      }
    }

    // Contact compression phase between arcs
    const contactStart = arc.endTime;
    const contactEnd = contactStart + contactFrames;

    if (relFrame >= contactStart && relFrame < contactEnd) {
      const contactP = (relFrame - contactStart) / contactFrames;
      // Parabolic squash envelope: peak squash at midpoint
      const squashWeight = 4 * contactP * (1 - contactP); // 0 -> 1 -> 0
      const energyFactor = arc.peakHeight / totalFallHeight;
      const effectiveSquash = maxSquash * energyFactor * squashWeight;

      const sy = Math.max(0.5, 1.0 - effectiveSquash);
      const sx = 1.0 / sy;

      return {
        y: floorY,
        scaleX: Number(sx.toFixed(4)),
        scaleY: Number(sy.toFixed(4)),
        velocity: 0,
        phase: 'CONTACT_COMPRESSION',
        bounceIndex: i,
        isContact: true,
        contactProgress: contactP,
      };
    }
  }

  // Fallback settle
  return {
    y: floorY,
    scaleX: 1.0,
    scaleY: 1.0,
    velocity: 0,
    phase: 'SETTLE',
    bounceIndex: arcs.length,
    isContact: true,
    contactProgress: 1.0,
  };
}
