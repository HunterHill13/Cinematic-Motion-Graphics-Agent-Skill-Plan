/**
 * ============================================================================
 * DYNAMIC SCENE TRANSITION DIRECTOR (MASTER RUNTIME ENGINE)
 * ============================================================================
 * Orchestrates heterogeneous transitions between acts:
 * - Computes dynamic camera offsets adhering to the Kinetic Agency Law
 * - Calculates exit displacements for internal act elements
 * - Ensures whole integer pixel values to eliminate subpixel jitter
 * ============================================================================
 */

import { interpolate, spring, Easing } from 'remotion';
import {
  ActHandoffTransition,
  TransitionArchetype,
} from './DynamicTransitionSchema';

export interface TransitionState {
  isTransitioning: boolean;
  activeTransition?: ActHandoffTransition;
  progress: number; // 0.0 -> 1.0
  cameraOffset: {
    x: number;
    y: number;
    z: number;
    pitch: number;
    yaw: number;
    roll: number;
  };
  motionBlurPx: number;
  // Kinetic Agency Law: Element-specific transforms
  elementExit: {
    offsetX: number;
    offsetY: number;
    offsetZ: number;
    rotateZ: number;
    scale: number;
    opacity: number;
  };
  // Aperture Reveal progress for Deep-Z zoom
  apertureRevealScale: number;
  fromActId: string;
  toActId: string;
}

export interface ResolvedActTiming {
  actId: string;
  startFrame: number;
  endFrame: number;
  transitionOut?: ActHandoffTransition;
}

export class DynamicTransitionDirector {
  /**
   * Resolves the transition state between acts for the current frame.
   */
  public static computeTransitionState(
    frame: number,
    fps: number,
    acts: ResolvedActTiming[]
  ): TransitionState {
    const defaultState: TransitionState = {
      isTransitioning: false,
      progress: 0,
      cameraOffset: { x: 0, y: 0, z: 0, pitch: 0, yaw: 0, roll: 0 },
      motionBlurPx: 0,
      elementExit: { offsetX: 0, offsetY: 0, offsetZ: 0, rotateZ: 0, scale: 1, opacity: 1 },
      apertureRevealScale: 0,
      fromActId: '',
      toActId: '',
    };

    if (acts.length < 2) return defaultState;

    for (let i = 0; i < acts.length - 1; i++) {
      const fromAct = acts[i];
      const toAct = acts[i + 1];
      const transDuration = fromAct.transitionOut?.durationInFrames ?? 20;

      // Transition starts `transDuration` frames before the act ends
      const transStart = fromAct.endFrame - transDuration;
      const transEnd = fromAct.endFrame;

      if (frame >= transStart && frame <= transEnd) {
        const localFrame = frame - transStart;
        const progress = Math.min(1, Math.max(0, localFrame / transDuration));
        const transition = fromAct.transitionOut ?? {
          archetype: 'ELEMENT_KINETIC_DISPERSE',
          durationInFrames: transDuration,
        };

        return this.evaluateArchetype(
          transition,
          localFrame,
          transDuration,
          progress,
          fps,
          fromAct.actId,
          toAct.actId
        );
      }
    }

    return defaultState;
  }

  private static evaluateArchetype(
    trans: ActHandoffTransition,
    localFrame: number,
    duration: number,
    progress: number,
    fps: number,
    fromActId: string,
    toActId: string
  ): TransitionState {
    switch (trans.archetype) {
      // ----------------------------------------------------------------------
      // TYPE A: CAMERA-DRIVEN SPATIAL FLIGHT (WHIP PAN / CRANE)
      // ----------------------------------------------------------------------
      case 'CAMERA_SPATIAL_FLIGHT': {
        const smoothProgress = interpolate(localFrame, [0, duration], [0, 1], {
          easing: Easing.bezier(0.76, 0.0, 0.24, 1.0),
        });

        const trajectory = trans.cameraFlight?.trajectory ?? 'WHIP_PAN_RIGHT';
        let offsetX = 0;
        let offsetY = 0;
        let roll = 0;

        if (trajectory === 'WHIP_PAN_RIGHT') {
          offsetX = -smoothProgress * 1500;
          roll = Math.sin(smoothProgress * Math.PI) * (trans.cameraFlight?.bankingRollDegrees ?? 3.5);
        } else if (trajectory === 'WHIP_PAN_LEFT') {
          offsetX = smoothProgress * 1500;
          roll = -Math.sin(smoothProgress * Math.PI) * (trans.cameraFlight?.bankingRollDegrees ?? 3.5);
        } else if (trajectory === 'VERTICAL_CRANE_DOWN') {
          offsetY = -smoothProgress * 1100;
        } else if (trajectory === 'VERTICAL_CRANE_UP') {
          offsetY = smoothProgress * 1100;
        }

        const blurPeak = trans.cameraFlight?.peakBlurPixels ?? 14;
        const motionBlurPx = Math.sin(smoothProgress * Math.PI) * blurPeak;

        // Elements remain anchored to world coordinates, with subtle fade at tail
        const elemOpacity = interpolate(smoothProgress, [0, 0.85, 1], [1, 0.4, 0]);

        return {
          isTransitioning: true,
          activeTransition: trans,
          progress: smoothProgress,
          cameraOffset: {
            x: Math.round(offsetX),
            y: Math.round(offsetY),
            z: 0,
            pitch: 0,
            yaw: 0,
            roll: Number(roll.toFixed(2)),
          },
          motionBlurPx: Math.round(motionBlurPx),
          elementExit: { offsetX: 0, offsetY: 0, offsetZ: 0, rotateZ: 0, scale: 1, opacity: elemOpacity },
          apertureRevealScale: 0,
          fromActId,
          toActId,
        };
      }

      // ----------------------------------------------------------------------
      // TYPE B: ELEMENT-DRIVEN KINETIC EXIT & ARRIVAL (CAMERA HOLDS)
      // ----------------------------------------------------------------------
      case 'ELEMENT_KINETIC_DISPERSE': {
        const direction = trans.elementDisperse?.direction ?? 'LEFT';
        const exitSpring = spring({
          frame: localFrame,
          fps,
          config: { damping: 14, stiffness: 130, mass: 0.9 },
        });

        let elemX = 0;
        let elemY = 0;
        let rotZ = 0;

        if (direction === 'LEFT') {
          elemX = -exitSpring * 950;
          rotZ = -exitSpring * 6;
        } else if (direction === 'RIGHT') {
          elemX = exitSpring * 950;
          rotZ = exitSpring * 6;
        } else if (direction === 'UP') {
          elemY = -exitSpring * 650;
        } else if (direction === 'DOWN') {
          elemY = exitSpring * 650;
        } else if (direction === 'RADIAL_BURST') {
          elemX = -exitSpring * 300;
          elemY = -exitSpring * 200;
        }

        const elemOpacity = interpolate(localFrame, [0, duration * 0.75], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        // Kinetic Agency Law: Camera holds stationary!
        return {
          isTransitioning: true,
          activeTransition: trans,
          progress,
          cameraOffset: { x: 0, y: 0, z: 0, pitch: 0, yaw: 0, roll: 0 },
          motionBlurPx: 0,
          elementExit: {
            offsetX: Math.round(elemX),
            offsetY: Math.round(elemY),
            offsetZ: 0,
            rotateZ: Number(rotZ.toFixed(2)),
            scale: 1 - exitSpring * 0.15,
            opacity: elemOpacity,
          },
          apertureRevealScale: 0,
          fromActId,
          toActId,
        };
      }

      // ----------------------------------------------------------------------
      // TYPE C: DEEP-Z PUSH-IN / CRASH ZOOM-THROUGH
      // ----------------------------------------------------------------------
      case 'DEEP_Z_ZOOM_THROUGH': {
        const targetDepth = trans.deepZZoom?.penetrationDepthZ ?? 2400;
        const zoomProgress = interpolate(localFrame, [0, duration], [0, targetDepth], {
          easing: Easing.bezier(0.85, 0.0, 0.15, 1.0),
        });

        const revealScale = interpolate(localFrame, [duration * 0.4, duration], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const elemScale = 1 + (zoomProgress / targetDepth) * 3.5;
        const elemOpacity = interpolate(localFrame, [0, duration * 0.65], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return {
          isTransitioning: true,
          activeTransition: trans,
          progress,
          cameraOffset: {
            x: 0,
            y: 0,
            z: Math.round(zoomProgress),
            pitch: 0,
            yaw: 0,
            roll: 0,
          },
          motionBlurPx: 0,
          elementExit: {
            offsetX: 0,
            offsetY: 0,
            offsetZ: Math.round(zoomProgress * 0.5),
            rotateZ: 0,
            scale: Number(elemScale.toFixed(2)),
            opacity: elemOpacity,
          },
          apertureRevealScale: revealScale,
          fromActId,
          toActId,
        };
      }

      // ----------------------------------------------------------------------
      // TYPE D: TOPOLOGICAL ANCHOR HANDOFF & MORPH
      // ----------------------------------------------------------------------
      case 'TOPOLOGICAL_ANCHOR_MORPH': {
        const morphSpring = spring({
          frame: localFrame,
          fps,
          config: { damping: 18, stiffness: 120, mass: 0.9 },
        });

        // Surrounding elements evacuate while anchor holds and scales
        const elemOpacity = interpolate(localFrame, [0, duration * 0.45], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return {
          isTransitioning: true,
          activeTransition: trans,
          progress: morphSpring,
          cameraOffset: { x: 0, y: 0, z: 0, pitch: 0, yaw: 0, roll: 0 },
          motionBlurPx: 0,
          elementExit: {
            offsetX: 0,
            offsetY: 0,
            offsetZ: 0,
            rotateZ: 0,
            scale: 1,
            opacity: elemOpacity,
          },
          apertureRevealScale: 0,
          fromActId,
          toActId,
        };
      }

      // ----------------------------------------------------------------------
      // TYPE E: KINETIC WIPE / LIGHT SWEEP / SPATIAL SLICE
      // ----------------------------------------------------------------------
      case 'KINETIC_LIGHT_SWEEP': {
        const sliceProgress = interpolate(localFrame, [0, duration], [0, 1], {
          easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        });

        let recoilY = 0;
        if (trans.kineticSlice?.hasRecoilShake && localFrame >= 4 && localFrame <= 7) {
          recoilY = localFrame % 2 === 0 ? 3 : -3;
        }

        const elemOpacity = interpolate(sliceProgress, [0.4, 0.75], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return {
          isTransitioning: true,
          activeTransition: trans,
          progress: sliceProgress,
          cameraOffset: { x: 0, y: recoilY, z: 0, pitch: 0, yaw: 0, roll: 0 },
          motionBlurPx: 0,
          elementExit: {
            offsetX: 0,
            offsetY: 0,
            offsetZ: 0,
            rotateZ: 0,
            scale: 1,
            opacity: elemOpacity,
          },
          apertureRevealScale: 0,
          fromActId,
          toActId,
        };
      }

      default:
        return {
          isTransitioning: false,
          progress: 0,
          cameraOffset: { x: 0, y: 0, z: 0, pitch: 0, yaw: 0, roll: 0 },
          motionBlurPx: 0,
          elementExit: { offsetX: 0, offsetY: 0, offsetZ: 0, rotateZ: 0, scale: 1, opacity: 1 },
          apertureRevealScale: 0,
          fromActId,
          toActId,
        };
    }
  }
}
