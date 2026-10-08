/**
 * ============================================================================
 * CINEMATIC BENCHMARK SCENE GRAPH & TRAJECTORY EVALUATOR
 * ============================================================================
 * 
 * Generates deterministic frame-by-frame kinematic states, camera states,
 * secondary responses, and material/lighting interactions for the 720-frame
 * benchmark sequence.
 * ============================================================================
 */

import { interpolate, Easing } from 'remotion';
import {
  BENCHMARK_TOTAL_FRAMES,
  BENCHMARK_SHOTS,
  BenchmarkShotDefinition,
} from './cinematicBenchmarkConfig';
import {
  CameraState,
} from '../visual_world';

export type BenchmarkAblationMode =
  | 'FULL_SYSTEM'
  | 'NO_SECONDARY'
  | 'NO_DEPTH'
  | 'NO_CAMERA'
  | 'NO_MATERIAL'
  | 'NO_LIGHTING'
  | 'NO_CARRY';

export interface EntityFrameState {
  id: string;
  x: number;
  y: number;
  z: number;
  scaleX: number;
  scaleY: number;
  rotationDeg: number;
  opacity: number;
  vx: number;
  vy: number;
  // Material overrides
  deformationFactor: number;
  emissionFactor: number;
  tensionFactor: number;
  // Sub-components (e.g. split daughter fragments)
  subEntities?: {
    id: string;
    x: number;
    y: number;
    z: number;
    scale: number;
    opacity: number;
  }[];
}

export interface BenchmarkFrameData {
  frame: number;
  currentShot: BenchmarkShotDefinition;
  shotProgress: number;
  camera: CameraState;
  entities: Record<string, EntityFrameState>;
}

export class CinematicBenchmarkSceneGraph {
  /**
   * Evaluates the complete world state at frame t
   */
  public static evaluateFrame(
    frame: number,
    ablation: BenchmarkAblationMode = 'FULL_SYSTEM'
  ): BenchmarkFrameData {
    const clampedFrame = Math.max(0, Math.min(BENCHMARK_TOTAL_FRAMES - 1, frame));

    // 1. Identify active shot
    const currentShot =
      BENCHMARK_SHOTS.find(
        (s) => clampedFrame >= s.startFrame && clampedFrame < s.endFrame
      ) || BENCHMARK_SHOTS[BENCHMARK_SHOTS.length - 1];

    const shotProgress =
      (clampedFrame - currentShot.startFrame) / Math.max(1, currentShot.durationFrames);

    // 2. Evaluate Camera State
    const camera = this.evaluateCamera(clampedFrame, currentShot, ablation);

    // 3. Evaluate Entities
    const entities: Record<string, EntityFrameState> = {
      hero_cell: this.evaluateHeroCell(clampedFrame, ablation),
      nucleus_core: this.evaluateNucleusCore(clampedFrame, ablation),
      external_force: this.evaluateExternalForce(clampedFrame, ablation),
      vesicle_fragments: this.evaluateVesicles(clampedFrame, ablation),
      matrix_filaments: this.evaluateMatrixFilaments(clampedFrame, ablation),
      foreground_floaters: this.evaluateForegroundFloaters(clampedFrame, ablation),
    };

    return {
      frame: clampedFrame,
      currentShot,
      shotProgress,
      camera,
      entities,
    };
  }

  /**
   * Camera Choreography with motivated pans, pushes, lead room and focal punch
   */
  private static evaluateCamera(
    frame: number,
    shot: BenchmarkShotDefinition,
    ablation: BenchmarkAblationMode
  ): CameraState {
    if (ablation === 'NO_CAMERA') {
      return {
        x: 0,
        y: 0,
        z: 0,
        zoom: 1.0,
        orbitAngleDeg: 0,
        motivation: 'ENTER_WORLD',
        progress: frame / BENCHMARK_TOTAL_FRAMES,
        leadRoomX: 0,
        leadRoomY: 0,
        focalDepthZ: 0.45,
      };
    }

    let x = 0;
    let y = 0;
    let z = 0;
    let zoom = 1.0;
    let orbitAngleDeg = 0;
    let leadRoomX = 0;
    let leadRoomY = 0;

    // Shot 1: Gentle entrance push-in (0 - 120)
    if (frame < 120) {
      const p = frame / 120;
      zoom = interpolate(p, [0, 1], [0.95, 1.05], { easing: Easing.out(Easing.quad) });
      z = interpolate(p, [0, 1], [-0.1, 0.0]);
      orbitAngleDeg = interpolate(p, [0, 1], [-4, 2]);
    }
    // Shot 2: Emphasize approaching force (120 - 210)
    else if (frame < 210) {
      const p = (frame - 120) / 90;
      zoom = interpolate(p, [0, 1], [1.05, 1.18], { easing: Easing.inOut(Easing.quad) });
      x = interpolate(p, [0, 1], [0, 35]); // Camera shifts slightly right toward force
      y = interpolate(p, [0, 1], [0, -20]);
      z = interpolate(p, [0, 1], [0.0, 0.08]);
      orbitAngleDeg = interpolate(p, [0, 1], [2, 6]);
    }
    // Shot 3: Impact & Rupture Focal Punch (210 - 270)
    else if (frame < 270) {
      const p = (frame - 210) / 60;
      // Focal punch at frame 218: rapid punch-in then slight recoil
      const punchP = Math.max(0, Math.min(1, (frame - 210) / 12));
      const recoilP = Math.max(0, Math.min(1, (frame - 222) / 48));
      const punchZoom = interpolate(punchP, [0, 1], [1.18, 1.38], { easing: Easing.out(Easing.cubic) });
      zoom = interpolate(recoilP, [0, 1], [punchZoom, 1.22], { easing: Easing.out(Easing.quad) });
      x = interpolate(p, [0, 1], [35, -25]); // Shifts left as rupture propels daughter Alpha
      y = interpolate(p, [0, 1], [-20, 15]);
      orbitAngleDeg = interpolate(p, [0, 1], [6, -8]);
    }
    // Shot 4: Tracking daughter fragment dispersion (270 - 420)
    else if (frame < 420) {
      const p = (frame - 270) / 150;
      zoom = interpolate(p, [0, 1], [1.22, 1.15]);
      x = interpolate(p, [0, 1], [-25, -70]);
      y = interpolate(p, [0, 1], [15, 30]);
      orbitAngleDeg = interpolate(p, [0, 1], [-8, -14]);
    }
    // Shot 5: Active tracking with lead room & dynamic orbit (420 - 480)
    else if (frame < 480) {
      const p = (frame - 420) / 60;
      zoom = interpolate(p, [0, 1], [1.15, 1.25], { easing: Easing.inOut(Easing.cubic) });
      x = interpolate(p, [0, 1], [-70, -110]);
      y = interpolate(p, [0, 1], [30, 45]);
      // Active lead room ahead of moving fragment
      leadRoomX = interpolate(p, [0, 1], [-30, -65]);
      leadRoomY = interpolate(p, [0, 1], [10, 25]);
      // Significant orbital sweep creating differential parallax
      orbitAngleDeg = interpolate(p, [0, 1], [-14, 12]);
    }
    // Shot 6: Motion-carry transition handoff (480 - 540)
    else if (frame < 540) {
      const p = (frame - 480) / 60;
      zoom = interpolate(p, [0, 1], [1.25, 1.18]);
      x = interpolate(p, [0, 1], [-110, -40]); // Camera tracks momentum re-entering center
      y = interpolate(p, [0, 1], [45, 10]);
      leadRoomX = interpolate(p, [0, 1], [-65, -15]);
      orbitAngleDeg = interpolate(p, [0, 1], [12, 4]);
    }
    // Shot 7: Reveal context for reorganization & reassembly (540 - 630)
    else if (frame < 630) {
      const p = (frame - 540) / 90;
      zoom = interpolate(p, [0, 1], [1.18, 1.05], { easing: Easing.out(Easing.cubic) });
      x = interpolate(p, [0, 1], [-40, 0]);
      y = interpolate(p, [0, 1], [10, 0]);
      orbitAngleDeg = interpolate(p, [0, 1], [4, -2]);
    }
    // Shot 8: Wide resolution & resting equilibrium (630 - 720)
    else {
      const p = (frame - 630) / 90;
      zoom = interpolate(p, [0, 1], [1.05, 1.0], { easing: Easing.out(Easing.quad) });
      x = interpolate(p, [0, 1], [0, 0]);
      y = interpolate(p, [0, 1], [0, 0]);
      orbitAngleDeg = interpolate(p, [0, 1], [-2, 0]);
    }

    return {
      x,
      y,
      z,
      zoom,
      orbitAngleDeg,
      motivation: shot.cameraMotivation,
      progress: (frame - shot.startFrame) / shot.durationFrames,
      leadRoomX,
      leadRoomY,
      focalDepthZ: 0.45,
    };
  }

  /**
   * Hero Cell Membrane kinematics (Primary Actor)
   */
  private static evaluateHeroCell(
    frame: number,
    ablation: BenchmarkAblationMode
  ): EntityFrameState {
    const noSecondary = ablation === 'NO_SECONDARY';
    const noCarry = ablation === 'NO_CARRY';
    const noDepth = ablation === 'NO_DEPTH';

    let x = 0;
    let y = 0;
    let z = noDepth ? 0.5 : 0.45;
    let scaleX = 1.0;
    let scaleY = 1.0;
    let rotationDeg = 0;
    let opacity = 1.0;
    let vx = 0;
    let vy = 0;
    let deformationFactor = 0.0;
    let emissionFactor = 0.1;
    let tensionFactor = 0.0;

    let subEntities: EntityFrameState['subEntities'] = undefined;

    // Shot 1: Biological respiration drift (0 - 120)
    if (frame < 120) {
      const drift = Math.sin((frame / 30) * Math.PI) * 4;
      y = drift;
      // Respiration pulsation
      const breath = Math.sin((frame / 40) * Math.PI) * 0.035;
      scaleX = 1.0 + breath;
      scaleY = 1.0 - breath * 0.5;
      deformationFactor = Math.abs(breath) * 2;
    }
    // Shot 2: Incoming compression & anticipation coil (120 - 210)
    else if (frame < 210) {
      const approachP = (frame - 120) / 90;
      // Anticipation occurs frames 185 - 210 (25 frames before rupture)
      if (frame >= 185 && !noSecondary) {
        const anticP = (frame - 185) / 25;
        // Backward pullback away from incoming force vector
        x = interpolate(anticP, [0, 1], [0, -26], { easing: Easing.in(Easing.quad) });
        y = interpolate(anticP, [0, 1], [0, 14], { easing: Easing.in(Easing.quad) });
        // Compression along force diagonal (squash and stretch)
        scaleX = interpolate(anticP, [0, 1], [1.0, 0.86]);
        scaleY = interpolate(anticP, [0, 1], [1.0, 1.18]);
        rotationDeg = interpolate(anticP, [0, 1], [0, -7]);
        deformationFactor = interpolate(anticP, [0, 1], [0.1, 0.85]);
        tensionFactor = anticP;
      } else {
        // Subtle drift prior to anticipation
        x = approachP * -3;
        y = approachP * 2;
        deformationFactor = approachP * 0.2;
      }
    }
    // Shot 3: Primary Rupture & Nuclear Split (210 - 270)
    else if (frame < 270) {
      // Rupture occurs violently at frame 215
      if (frame >= 215) {
        const burstP = (frame - 215) / 45;
        // Daughter Alpha moves left-down
        const alphaX = interpolate(burstP, [0, 1], [-26, -160], { easing: Easing.out(Easing.cubic) });
        const alphaY = interpolate(burstP, [0, 1], [14, 75], { easing: Easing.out(Easing.cubic) });
        // Daughter Beta moves right-up
        const betaX = interpolate(burstP, [0, 1], [-26, 130], { easing: Easing.out(Easing.cubic) });
        const betaY = interpolate(burstP, [0, 1], [14, -60], { easing: Easing.out(Easing.cubic) });

        subEntities = [
          { id: 'daughter_alpha', x: alphaX, y: alphaY, z: noDepth ? 0.5 : 0.44, scale: 0.72, opacity: 1.0 },
          { id: 'daughter_beta', x: betaX, y: betaY, z: noDepth ? 0.5 : 0.46, scale: 0.65, opacity: 1.0 },
        ];

        // Primary parent membrane ruptures into fragments
        opacity = interpolate(burstP, [0, 0.4], [1.0, 0.15]);
        scaleX = interpolate(burstP, [0, 1], [0.86, 1.45]);
        scaleY = interpolate(burstP, [0, 1], [1.18, 0.6]);
        deformationFactor = 1.0;
        emissionFactor = interpolate(burstP, [0, 0.3, 1], [0.2, 1.0, 0.4]);
      } else {
        x = -26;
        y = 14;
        scaleX = 0.86;
        scaleY = 1.18;
        tensionFactor = 1.0;
      }
    }
    // Shot 4: Fragmentation & Dispersion (270 - 420)
    else if (frame < 420) {
      const p = (frame - 270) / 150;
      // Daughter Alpha trajectory
      const alphaX = interpolate(p, [0, 1], [-160, -290], { easing: Easing.out(Easing.quad) });
      const alphaY = interpolate(p, [0, 1], [75, 110], { easing: Easing.out(Easing.quad) });
      // Daughter Beta trajectory
      const betaX = interpolate(p, [0, 1], [130, 240], { easing: Easing.out(Easing.quad) });
      const betaY = interpolate(p, [0, 1], [-60, -95], { easing: Easing.out(Easing.quad) });

      opacity = 0.1;
      subEntities = [
        { id: 'daughter_alpha', x: alphaX, y: alphaY, z: noDepth ? 0.5 : 0.44, scale: 0.72, opacity: 1.0 },
        { id: 'daughter_beta', x: betaX, y: betaY, z: noDepth ? 0.5 : 0.46, scale: 0.65, opacity: 1.0 },
      ];
      vx = -1.2;
      vy = 0.3;
    }
    // Shot 5: Tracking Alpha & orbital flight (420 - 480)
    else if (frame < 480) {
      const p = (frame - 420) / 60;
      // Fragment Alpha exits toward handoff coordinate
      const alphaX = interpolate(p, [0, 1], [-290, -380], { easing: Easing.inOut(Easing.quad) });
      const alphaY = interpolate(p, [0, 1], [110, 135]);
      // Velocity vector at exit: vx approx -1.5 px/f
      vx = -1.5;
      vy = 0.4;

      const betaX = interpolate(p, [0, 1], [240, 290]);
      const betaY = interpolate(p, [0, 1], [-95, -115]);

      subEntities = [
        { id: 'daughter_alpha', x: alphaX, y: alphaY, z: noDepth ? 0.5 : 0.44, scale: 0.72, opacity: 1.0 },
        { id: 'daughter_beta', x: betaX, y: betaY, z: noDepth ? 0.5 : 0.46, scale: 0.65, opacity: 0.7 },
      ];
      opacity = 0.05;
    }
    // Shot 6: Motion-carry transition handoff (480 - 540)
    else if (frame < 540) {
      const p = (frame - 480) / 60;
      let alphaX = 0;
      let alphaY = 0;

      if (noCarry) {
        // Clamped to 0 at handoff (negative control)
        alphaX = interpolate(p, [0, 1], [-380, -380]);
        alphaY = 135;
        vx = 0;
      } else {
        // Conserved incoming momentum: continues traveling then turns inward toward center
        alphaX = interpolate(p, [0, 1], [-380, -220], { easing: Easing.out(Easing.quad) });
        alphaY = interpolate(p, [0, 1], [135, 70], { easing: Easing.out(Easing.quad) });
        vx = interpolate(p, [0, 1], [-1.4, -0.6]);
      }

      const betaX = interpolate(p, [0, 1], [290, 180]);
      const betaY = interpolate(p, [0, 1], [-115, -50]);

      subEntities = [
        { id: 'daughter_alpha', x: alphaX, y: alphaY, z: noDepth ? 0.5 : 0.44, scale: 0.72, opacity: 1.0 },
        { id: 'daughter_beta', x: betaX, y: betaY, z: noDepth ? 0.5 : 0.46, scale: 0.65, opacity: 0.8 },
      ];
      opacity = 0.1;
    }
    // Shot 7: Reorganization & Reassembly (540 - 630)
    else if (frame < 630) {
      const p = (frame - 540) / 90;
      // Daughter fragments drawn centripetally to origin
      const alphaX = interpolate(p, [0, 1], [-220, 0], { easing: Easing.inOut(Easing.cubic) });
      const alphaY = interpolate(p, [0, 1], [70, 0], { easing: Easing.inOut(Easing.cubic) });
      const betaX = interpolate(p, [0, 1], [180, 0], { easing: Easing.inOut(Easing.cubic) });
      const betaY = interpolate(p, [0, 1], [-50, 0], { easing: Easing.inOut(Easing.cubic) });

      // Re-knitting parent membrane reforms
      opacity = interpolate(p, [0, 0.7, 1], [0.1, 0.8, 1.0]);
      scaleX = interpolate(p, [0, 1], [1.3, 1.05]);
      scaleY = interpolate(p, [0, 1], [0.7, 1.02]);
      deformationFactor = interpolate(p, [0, 0.5, 1], [0.8, 0.4, 0.05]);
      emissionFactor = interpolate(p, [0, 0.5, 1], [0.6, 0.9, 0.2]);

      subEntities = [
        { id: 'daughter_alpha', x: alphaX, y: alphaY, z: noDepth ? 0.5 : 0.44, scale: interpolate(p, [0, 1], [0.72, 0.1]), opacity: interpolate(p, [0.7, 1], [0.8, 0.0]) },
        { id: 'daughter_beta', x: betaX, y: betaY, z: noDepth ? 0.5 : 0.46, scale: interpolate(p, [0, 1], [0.65, 0.1]), opacity: interpolate(p, [0.7, 1], [0.8, 0.0]) },
      ];
    }
    // Shot 8: Resolution & Stable Equilibrium (630 - 720)
    else {
      const p = (frame - 630) / 90;
      // Exponential damping into equilibrium
      const damp = Math.exp(-p * 3.5);
      const settleBreath = Math.sin((frame / 35) * Math.PI) * 0.025 * (noSecondary ? 1.0 : (0.2 + 0.8 * damp));
      scaleX = 1.0 + settleBreath;
      scaleY = 1.0 - settleBreath * 0.5;
      x = 0;
      y = Math.sin((frame / 45) * Math.PI) * 2;
      opacity = 1.0;
      deformationFactor = 0.02;
      emissionFactor = 0.15;
    }

    return {
      id: 'hero_cell',
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotationDeg,
      opacity,
      vx,
      vy,
      deformationFactor,
      emissionFactor,
      tensionFactor,
      subEntities,
    };
  }

  /**
   * Radiant Plasma Nucleus Kinematics
   */
  private static evaluateNucleusCore(
    frame: number,
    ablation: BenchmarkAblationMode
  ): EntityFrameState {
    const noSecondary = ablation === 'NO_SECONDARY';
    const noDepth = ablation === 'NO_DEPTH';

    let x = 0;
    let y = 0;
    let z = noDepth ? 0.5 : 0.48;
    let scaleX = 0.45;
    let scaleY = 0.45;
    let opacity = 1.0;
    let emissionFactor = 0.85;

    // Temporal lag behind hero cell during shot 1 & 2
    if (frame < 120) {
      // 4 frame lag
      const lagFrame = Math.max(0, frame - 4);
      y = Math.sin((lagFrame / 30) * Math.PI) * 3;
    } else if (frame < 210) {
      if (frame >= 185 && !noSecondary) {
        // Nucleus resists compression initially then compresses
        const p = (frame - 185) / 25;
        x = interpolate(p, [0, 1], [0, -18]);
        scaleX = interpolate(p, [0, 1], [0.45, 0.38]);
        scaleY = interpolate(p, [0, 1], [0.45, 0.52]);
        emissionFactor = interpolate(p, [0, 1], [0.85, 1.2]);
      }
    } else if (frame < 540) {
      // During split/fragmentation, nucleus is carried within daughter cores
      opacity = 0.1;
    } else if (frame < 630) {
      // Cores fuse back into unified radiant nucleus
      const p = (frame - 540) / 90;
      opacity = interpolate(p, [0.3, 1], [0.1, 1.0]);
      scaleX = interpolate(p, [0.3, 1], [0.2, 0.48]);
      scaleY = interpolate(p, [0.3, 1], [0.2, 0.48]);
      emissionFactor = interpolate(p, [0.3, 1], [1.3, 0.9]);
    } else {
      scaleX = 0.46;
      scaleY = 0.46;
      emissionFactor = 0.88;
    }

    return {
      id: 'nucleus_core',
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotationDeg: frame * 0.4,
      opacity,
      vx: 0,
      vy: 0,
      deformationFactor: 0.1,
      emissionFactor,
      tensionFactor: 0,
    };
  }

  /**
   * Compressive Kinetic Energy Wavefront
   */
  private static evaluateExternalForce(
    frame: number,
    ablation: BenchmarkAblationMode
  ): EntityFrameState {
    const noDepth = ablation === 'NO_DEPTH';

    let x = 600;
    let y = -400;
    let opacity = 0.0;
    let scaleX = 1.0;
    let scaleY = 1.0;

    // Active primarily in Shot 2 & beginning of Shot 3 (Frames 120 - 240)
    if (frame >= 110 && frame <= 250) {
      const p = (frame - 110) / 105;
      x = interpolate(p, [0, 1], [550, -40], { easing: Easing.in(Easing.cubic) });
      y = interpolate(p, [0, 1], [-350, 25], { easing: Easing.in(Easing.cubic) });
      opacity = interpolate(frame, [110, 140, 215, 245], [0, 0.95, 1.0, 0]);
      scaleX = interpolate(p, [0, 1], [0.6, 1.3]);
      scaleY = interpolate(p, [0, 1], [1.4, 0.8]);
    }

    return {
      id: 'external_force',
      x,
      y,
      z: noDepth ? 0.5 : 0.32,
      scaleX,
      scaleY,
      rotationDeg: -35,
      opacity,
      vx: -4.5,
      vy: 2.8,
      deformationFactor: 0.5,
      emissionFactor: 1.5,
      tensionFactor: 0,
    };
  }

  /**
   * Organelle Vesicles with Causal Temporal Lag and Follow-Through Overshoot
   */
  private static evaluateVesicles(
    frame: number,
    ablation: BenchmarkAblationMode
  ): EntityFrameState {
    const noSecondary = ablation === 'NO_SECONDARY';
    const noDepth = ablation === 'NO_DEPTH';

    let lagOffsetX = 0;
    let lagOffsetY = 0;
    let followThroughX = 0;

    if (!noSecondary && frame >= 215 && frame <= 420) {
      // Primary daughter alpha is moving left with high velocity
      const p = (frame - 215) / 205;
      const primaryVx = interpolate(p, [0, 0.3, 1], [-22, -8, -1.2]);

      // Temporal lag offset: delta = -lagFrames * primaryVx * coupling
      lagOffsetX = -primaryVx * 6 * 0.55;

      // Follow through when decelerating (frames 330 - 390)
      if (frame >= 330) {
        const ftP = Math.min(1, (frame - 330) / 35);
        followThroughX = Math.sin(ftP * Math.PI) * 24; // Surges forward past core
      }
    }

    return {
      id: 'vesicle_fragments',
      x: lagOffsetX + followThroughX,
      y: lagOffsetY,
      z: noDepth ? 0.5 : 0.46,
      scaleX: 1.0,
      scaleY: 1.0,
      rotationDeg: frame * 1.2,
      opacity: frame >= 215 ? 0.9 : 0.4,
      vx: 0,
      vy: 0,
      deformationFactor: 0.2,
      emissionFactor: 0.4,
      tensionFactor: 0,
    };
  }

  /**
   * Deep Matrix Filaments (Deep Background z=0.88)
   */
  private static evaluateMatrixFilaments(
    frame: number,
    ablation: BenchmarkAblationMode
  ): EntityFrameState {
    const noDepth = ablation === 'NO_DEPTH';

    return {
      id: 'matrix_filaments',
      x: Math.sin((frame / 80) * Math.PI) * 8,
      y: Math.cos((frame / 90) * Math.PI) * 5,
      z: noDepth ? 0.5 : 0.88,
      scaleX: 1.0,
      scaleY: 1.0,
      rotationDeg: frame * 0.05,
      opacity: 0.55,
      vx: 0.1,
      vy: 0.05,
      deformationFactor: 0.0,
      emissionFactor: 0.0,
      tensionFactor: 0,
    };
  }

  /**
   * Foreground Floaters (Foreground z=0.14)
   */
  private static evaluateForegroundFloaters(
    frame: number,
    ablation: BenchmarkAblationMode
  ): EntityFrameState {
    const noDepth = ablation === 'NO_DEPTH';

    // Fast drifting foreground particulates
    const cycle = (frame * 1.8) % 2400 - 1200;

    return {
      id: 'foreground_floaters',
      x: cycle,
      y: Math.sin((frame / 25) * Math.PI) * 25,
      z: noDepth ? 0.5 : 0.14,
      scaleX: 1.2,
      scaleY: 1.2,
      rotationDeg: frame * 0.8,
      opacity: 0.65,
      vx: 1.8,
      vy: 0.4,
      deformationFactor: 0.0,
      emissionFactor: 0.1,
      tensionFactor: 0,
    };
  }
}
