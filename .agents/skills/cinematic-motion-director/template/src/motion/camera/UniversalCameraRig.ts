/**
 * ============================================================================
 * 6-DOF MULTI-TRAJECTORY CAMERA RIG ENGINE (UNIVERSAL STUDIO RIG)
 * ============================================================================
 * 
 * Provides true 3D spatial camera trajectories:
 * 1. PANORAMIC_HORIZONTAL: Smooth horizontal tracking (0 -> 4300 X)
 * 2. VERTICAL_ELEVATOR: Dramatic vertical crane/elevator glide (0 -> 3000 Y)
 * 3. DIAGONAL_CASCADE: 45-degree multi-axis cascade with dynamic banking roll
 * 4. DEEP_Z_TUNNEL: True 3D forward push-in/dolly penetrating through depth (Z: 0 -> 4800)
 * 5. DYNAMIC_COMPOSITE: Hybrid cinematic combining diagonal, push-in, and wide pullback
 * ============================================================================
 */

import { interpolate, Easing } from 'remotion';

export type CameraTrajectoryMode =
  | 'PANORAMIC_HORIZONTAL'
  | 'VERTICAL_ELEVATOR'
  | 'DIAGONAL_CASCADE'
  | 'DEEP_Z_TUNNEL'
  | 'DYNAMIC_COMPOSITE';

export interface Stage3DPosition {
  x: number;
  y: number;
  z: number;
  scale?: number;
  pitch?: number;
  yaw?: number;
  roll?: number;
}

export interface CameraState6DOF {
  camX: number;
  camY: number;
  camZ: number;
  camPitch: number;
  camYaw: number;
  camRoll: number;
  camZoom: number;
  motionBlur: number;
}

export interface TrajectoryDefinition {
  mode: CameraTrajectoryMode;
  label: string;
  description: string;
  stages: {
    act1: Stage3DPosition;
    act2: Stage3DPosition;
    act3: Stage3DPosition;
    act4: Stage3DPosition;
    dock: Stage3DPosition;
  };
  computeCamera: (frame: number, totalFrames?: number) => CameraState6DOF;
  getStageVisibility: (stageIndex: 1 | 2 | 3 | 4, cam: CameraState6DOF) => {
    visible: boolean;
    opacity: number;
    depthScale: number;
  };
}

export class UniversalCameraRig {
  /**
   * Resolves the trajectory layout and motion curves for any camera mode.
   */
  public static getTrajectory(mode: CameraTrajectoryMode = 'PANORAMIC_HORIZONTAL'): TrajectoryDefinition {
    switch (mode) {
      case 'DEEP_Z_TUNNEL':
        return this.createDeepZTunnelTrajectory();
      case 'VERTICAL_ELEVATOR':
        return this.createVerticalElevatorTrajectory();
      case 'DIAGONAL_CASCADE':
        return this.createDiagonalCascadeTrajectory();
      case 'DYNAMIC_COMPOSITE':
        return this.createDynamicCompositeTrajectory();
      case 'PANORAMIC_HORIZONTAL':
      default:
        return this.createHorizontalTrajectory();
    }
  }

  // --------------------------------------------------------------------------
  // 1. PANORAMIC HORIZONTAL TRAJECTORY
  // --------------------------------------------------------------------------
  private static createHorizontalTrajectory(): TrajectoryDefinition {
    const stages = {
      act1: { x: 0, y: 0, z: 0 },
      act2: { x: 1500, y: 0, z: 0 },
      act3: { x: 3000, y: 0, z: 60 },
      act4: { x: 4300, y: 0, z: 60 },
      dock: { x: 3650, y: 0, z: -180 },
    };

    return {
      mode: 'PANORAMIC_HORIZONTAL',
      label: 'افقی پانوراما (Horizontal Panoramic)',
      description: 'ردیابی ممتد در طول محور افقی با کادربندی‌های دقیق و حرکت پیوسته بدون کات',
      stages,
      computeCamera: (frame: number, totalFrames: number = 1800) => {
        const f = totalFrames === 1800 ? frame : (frame / totalFrames) * 1800;
        const camX = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 1500, 1500, 3000, 3000, 4300, 4300, 4300],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        );
        const camY = 0;
        const camZ = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 50, 50, 80, 80, 60, 60, 60],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
        );
        const camRoll = interpolate(
          f,
          [270, 305, 340, 680, 715, 750, 1180, 1215, 1250],
          [0, -2.5, 0, 0, 3.0, 0, 0, -2.0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camPitch = interpolate(
          f,
          [0, 270, 340, 750, 1250, 1800],
          [1.5, 1.5, -1.0, 2.0, 0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camYaw = interpolate(
          f,
          [0, 270, 340, 750, 1250, 1800],
          [-2.0, -2.0, 1.5, -2.5, 0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const velocity = Math.abs(interpolate(f + 1, [0, 1800], [0, 4300]) - interpolate(f, [0, 1800], [0, 4300]));
        return { camX, camY, camZ, camPitch, camYaw, camRoll, camZoom: 1.0, motionBlur: velocity * 0.1 };
      },
      getStageVisibility: (stageIndex, cam) => {
        let visible = false;
        let opacity = 1.0;
        if (stageIndex === 1) {
          visible = cam.camX < 1450;
          opacity = interpolate(cam.camX, [0, 800, 1400], [1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 2) {
          visible = cam.camX > 550 && cam.camX < 3150;
          opacity = interpolate(cam.camX, [600, 1400, 2200, 3100], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 3) {
          visible = cam.camX > 2300;
          opacity = interpolate(cam.camX, [2400, 3200, 4200], [0, 1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 4) {
          visible = cam.camX > 3500;
          opacity = interpolate(cam.camX, [3500, 4100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        }
        return { visible, opacity, depthScale: 1.0 };
      },
    };
  }

  // --------------------------------------------------------------------------
  // 2. VERTICAL ELEVATOR TRAJECTORY
  // --------------------------------------------------------------------------
  private static createVerticalElevatorTrajectory(): TrajectoryDefinition {
    const stages = {
      act1: { x: 0, y: 0, z: 0 },
      act2: { x: 0, y: 1100, z: 40 },
      act3: { x: 0, y: 2200, z: 80 },
      act4: { x: 0, y: 3300, z: 100 },
      dock: { x: 0, y: 2750, z: -160 },
    };

    return {
      mode: 'VERTICAL_ELEVATOR',
      label: 'عمودی کرین/آسانسوری (Vertical Elevator)',
      description: 'حرکت باشکوه دوربین از بالا به پایین شبیه نمای کرین سینمایی با شیب‌های ملایم پیتچ',
      stages,
      computeCamera: (frame: number, totalFrames: number = 1800) => {
        const f = totalFrames === 1800 ? frame : (frame / totalFrames) * 1800;
        const camX = 0;
        const camY = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 1100, 1100, 2200, 2200, 3300, 2750, 2750],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        );
        const camZ = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 40, 40, 80, 80, 100, -160, -160],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
        );
        const camPitch = interpolate(
          f,
          [270, 305, 340, 680, 715, 750, 1180, 1215, 1250],
          [0, 3.5, 0, 0, -3.0, 0, 0, 2.5, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camYaw = 0;
        const camRoll = interpolate(
          f,
          [270, 340, 680, 750],
          [0, -1.5, 0, 1.5],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return { camX, camY, camZ, camPitch, camYaw, camRoll, camZoom: 1.0, motionBlur: 0 };
      },
      getStageVisibility: (stageIndex, cam) => {
        let visible = false;
        let opacity = 1.0;
        if (stageIndex === 1) {
          visible = cam.camY < 1000;
          opacity = interpolate(cam.camY, [0, 600, 1000], [1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 2) {
          visible = cam.camY > 400 && cam.camY < 2100;
          opacity = interpolate(cam.camY, [450, 1100, 1700, 2100], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 3) {
          visible = cam.camY > 1600;
          opacity = interpolate(cam.camY, [1700, 2200, 3200], [0, 1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 4) {
          visible = cam.camY > 2600;
          opacity = interpolate(cam.camY, [2600, 3200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        }
        return { visible, opacity, depthScale: 1.0 };
      },
    };
  }

  // --------------------------------------------------------------------------
  // 3. DIAGONAL CASCADE TRAJECTORY
  // --------------------------------------------------------------------------
  private static createDiagonalCascadeTrajectory(): TrajectoryDefinition {
    const stages = {
      act1: { x: 0, y: 0, z: 0 },
      act2: { x: 1400, y: 750, z: 50 },
      act3: { x: 2800, y: 1500, z: 100 },
      act4: { x: 4000, y: 2200, z: 140 },
      dock: { x: 3400, y: 1850, z: -180 },
    };

    return {
      mode: 'DIAGONAL_CASCADE',
      label: 'آبشاری اریب (Diagonal Cascade)',
      description: 'حرکت همزمان در محورهای افقی و عمودی با زاویه ۴۵ درجه و چرخش بانکینگ پویا',
      stages,
      computeCamera: (frame: number, totalFrames: number = 1800) => {
        const f = totalFrames === 1800 ? frame : (frame / totalFrames) * 1800;
        const camX = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 1400, 1400, 2800, 2800, 4000, 4000, 4000],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        );
        const camY = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 750, 750, 1500, 1500, 2200, 2200, 2200],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        );
        const camZ = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 50, 50, 100, 100, 140, 140, 140],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
        );
        const camRoll = interpolate(
          f,
          [270, 305, 340, 680, 715, 750, 1180, 1215, 1250, 1400, 1800],
          [0, -4.0, 0, 0, 4.5, 0, 0, -3.0, 0, 0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camPitch = interpolate(
          f,
          [0, 340, 750, 1250, 1400, 1800],
          [1.0, -1.5, 1.5, -1.0, 0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camYaw = interpolate(
          f,
          [0, 340, 750, 1250, 1400, 1800],
          [-2.0, 2.0, -2.5, 1.5, 0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return { camX, camY, camZ, camPitch, camYaw, camRoll, camZoom: 1.0, motionBlur: 0 };
      },
      getStageVisibility: (stageIndex, cam) => {
        let visible = false;
        let opacity = 1.0;
        if (stageIndex === 1) {
          visible = cam.camX < 1300;
          opacity = interpolate(cam.camX, [0, 700, 1300], [1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 2) {
          visible = cam.camX > 500 && cam.camX < 2700;
          opacity = interpolate(cam.camX, [500, 1400, 2100, 2700], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 3) {
          visible = cam.camX > 2000 && cam.camX < 3600;
          opacity = interpolate(cam.camX, [2100, 2800, 3200, 3600], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 4) {
          visible = cam.camX > 3200;
          opacity = interpolate(cam.camX, [3200, 3800], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        }
        return { visible, opacity, depthScale: 1.0 };
      },
    };
  }

  // --------------------------------------------------------------------------
  // 4. DEEP-Z TUNNEL (PUSH-IN INTO DEPTH)
  // --------------------------------------------------------------------------
  private static createDeepZTunnelTrajectory(): TrajectoryDefinition {
    // Act 2 is behind Act 1 (Z = 1600), Act 3 is behind Act 2 (Z = 3200), etc.
    const stages = {
      act1: { x: 0, y: 0, z: 0 },
      act2: { x: 0, y: 0, z: 1600 },
      act3: { x: 0, y: 0, z: 3200 },
      act4: { x: 0, y: 0, z: 4800 },
      dock: { x: 0, y: 0, z: 4200 },
    };

    return {
      mode: 'DEEP_Z_TUNNEL',
      label: 'نفوذ در عمق سه‌بعدی (Deep-Z Push-In Tunnel)',
      description: 'پرواز مستقیم دوربین به عمق فضا (Z-axis)؛ پرده‌های بعدی در پشت پرده فعلی ظاهر شده و دوربین از مرکز آنها عبور می‌کند',
      stages,
      computeCamera: (frame: number, totalFrames: number = 1800) => {
        const f = totalFrames === 1800 ? frame : (frame / totalFrames) * 1800;
        const camX = 0;
        const camY = 0;
        // Camera moves forward continuously into Z
        const camZ = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 1600, 1600, 3200, 3200, 4800, 4800, 4800],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        );
        // Subtle banking and rotation as we dive through portals
        const camRoll = interpolate(
          f,
          [270, 305, 340, 680, 715, 750, 1180, 1215, 1250],
          [0, 6.0, 0, 0, -6.5, 0, 0, 4.0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camPitch = interpolate(
          f,
          [270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, -2.5, 0, 2.5, 0, -1.5, 0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camYaw = interpolate(
          f,
          [270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 3.0, 0, -3.0, 0, 2.0, 0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return { camX, camY, camZ, camPitch, camYaw, camRoll, camZoom: 1.0, motionBlur: 0 };
      },
      getStageVisibility: (stageIndex, cam) => {
        let visible = false;
        let opacity = 1.0;
        let depthScale = 1.0;

        const stageZ = (stageIndex - 1) * 1600;
        const relZ = stageZ - cam.camZ;

        // When camera pushes through the stage, stage scales up and dissolves
        if (relZ < -200) {
          visible = false;
          opacity = 0;
        } else if (relZ <= 0) {
          // Camera is currently passing through
          visible = true;
          opacity = interpolate(relZ, [-200, 0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          depthScale = interpolate(relZ, [-200, 0], [1.6, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (relZ < 1800) {
          // Approaching stage
          visible = true;
          opacity = interpolate(relZ, [0, 1200, 1800], [1, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          depthScale = 1.0;
        } else {
          visible = false;
          opacity = 0;
        }

        return { visible, opacity, depthScale };
      },
    };
  }

  // --------------------------------------------------------------------------
  // 5. DYNAMIC COMPOSITE (HYBRID CINEMATIC)
  // --------------------------------------------------------------------------
  private static createDynamicCompositeTrajectory(): TrajectoryDefinition {
    const stages = {
      act1: { x: 0, y: 0, z: 0 },
      act2: { x: 1200, y: 600, z: 200 },
      act3: { x: 1200, y: 600, z: 1800 }, // Behind Act 2!
      act4: { x: 2600, y: 0, z: 1900 },
      dock: { x: 2200, y: 200, z: 1600 },
    };

    return {
      mode: 'DYNAMIC_COMPOSITE',
      label: 'ترکیبی پویا (Dynamic Composite)',
      description: 'حرکت هیبریدی هوشمند: گذار اریب در پرده اول، نفوذ در عمق سه‌بعدی به داخل کنسول پرده دو، و زوم‌بک نهایی',
      stages,
      computeCamera: (frame: number, totalFrames: number = 1800) => {
        const f = totalFrames === 1800 ? frame : (frame / totalFrames) * 1800;
        const camX = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 1200, 1200, 1200, 1200, 2600, 2200, 2200],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        );
        const camY = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 600, 600, 600, 600, 0, 200, 200],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
        );
        const camZ = interpolate(
          f,
          [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
          [0, 0, 200, 200, 1800, 1800, 1900, 1600, 1600],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
        );
        const camRoll = interpolate(
          f,
          [270, 305, 340, 680, 715, 750, 1180, 1215, 1250],
          [0, -3.5, 0, 0, 5.0, 0, 0, -2.5, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camPitch = interpolate(
          f,
          [0, 340, 750, 1250, 1800],
          [1.0, -1.0, 2.0, -1.0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const camYaw = interpolate(
          f,
          [0, 340, 750, 1250, 1800],
          [-2.0, 1.5, -2.0, 2.0, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return { camX, camY, camZ, camPitch, camYaw, camRoll, camZoom: 1.0, motionBlur: 0 };
      },
      getStageVisibility: (stageIndex, cam) => {
        let visible = true;
        let opacity = 1.0;
        let depthScale = 1.0;
        if (stageIndex === 1) {
          visible = cam.camX < 1100;
          opacity = interpolate(cam.camX, [0, 600, 1100], [1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 2) {
          const relZ = 200 - cam.camZ;
          visible = cam.camX > 400 && relZ > -300;
          if (relZ <= 0) {
            opacity = interpolate(relZ, [-300, 0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            depthScale = interpolate(relZ, [-300, 0], [1.5, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          } else {
            opacity = interpolate(cam.camX, [400, 1200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          }
        } else if (stageIndex === 3) {
          visible = cam.camZ > 800;
          opacity = interpolate(cam.camZ, [800, 1600], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (stageIndex === 4) {
          visible = cam.camX > 1600;
          opacity = interpolate(cam.camX, [1600, 2400], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        }
        return { visible, opacity, depthScale };
      },
    };
  }
}
