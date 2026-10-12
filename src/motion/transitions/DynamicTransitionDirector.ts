/**
 * ============================================================================
 * DYNAMIC SCENE TRANSITION DIRECTOR & SPATIAL CHAINING ENGINE (MASTER v2.0)
 * ============================================================================
 * 1. `computeChainedActPositions`: Derives Act i+1's 3D world coordinates
 *    `(posX, posY, posZ)` relative to Act i based on `act[i].transitionOut`.
 *    - `CAMERA_SPATIAL_FLIGHT`: Moves world coordinate by (1420, 0, 0), (0, 920, 0), etc.
 *      so during camera transit BOTH scenes overlap in the 1920x1080 viewport!
 *    - `DEEP_Z_ZOOM_THROUGH`: Moves world coordinate along Z (-1600) while X/Y stay 0.
 *    - `ELEMENT_KINETIC_DISPERSE`, `TOPOLOGICAL_ANCHOR_MORPH`, `KINETIC_LIGHT_SWEEP`:
 *      Zero spatial delta (0, 0, 0)! The camera stays 100% stationary while elements
 *      themselves fling out and pop in!
 * 2. `computeChildTransitionStyle`: Computes per-child staggered exit and arrival
 *    transforms so individual elements inside an act disperse and pop independently.
 * ============================================================================
 */

import { interpolate, spring, Easing } from 'remotion';
import {
  ActHandoffTransition,
  ActLayoutVariant,
  TextRevealMode,
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
  elementExit: {
    offsetX: number;
    offsetY: number;
    offsetZ: number;
    rotateZ: number;
    scale: number;
    opacity: number;
  };
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

export interface ChainedActCoordinate {
  posX: number;
  posY: number;
  posZ: number;
  prevPosX: number;
  prevPosY: number;
  prevPosZ: number;
  transitionIn?: ActHandoffTransition;
  transitionOut: ActHandoffTransition;
  layoutVariant: ActLayoutVariant;
  textRevealMode: TextRevealMode;
}

export const LAYOUT_ROTATION: ActLayoutVariant[] = [
  'SPLIT_SCULPTURE_RIGHT',
  'MONUMENTAL_CENTER_HERO',
  'SPLIT_DATA_TERMINAL_LEFT',
  'CONSTELLATION_BENTO_MATRIX',
];

export const TEXT_REVEAL_ROTATION: TextRevealMode[] = [
  'MASK_CURTAIN_RISE',
  'PERSPECTIVE_3D_FLIP',
  'ELASTIC_POP_SLAM',
  'VELOCITY_SKEW_SLIDE',
];

export function computeChainedActPositions<
  T extends {
    position?: { x: number; y: number; z: number };
    transitionOut?: ActHandoffTransition;
    layoutVariant?: ActLayoutVariant;
    textRevealMode?: TextRevealMode;
  }
>(acts: T[], defaultTransitions: ActHandoffTransition[]): ChainedActCoordinate[] {
  const results: ChainedActCoordinate[] = [];
  let currX = 0;
  let currY = 0;
  let currZ = 0;

  for (let i = 0; i < acts.length; i++) {
    const act = acts[i];
    const transitionOut =
      act.transitionOut ?? defaultTransitions[i % defaultTransitions.length];
    const transitionIn = i > 0 ? results[i - 1].transitionOut : undefined;

    const prevPosX = i > 0 ? results[i - 1].posX : 0;
    const prevPosY = i > 0 ? results[i - 1].posY : 0;
    const prevPosZ = i > 0 ? results[i - 1].posZ : 0;

    const posX = Math.round(act.position?.x ?? currX);
    const posY = Math.round(act.position?.y ?? currY);
    const posZ = Math.round(act.position?.z ?? currZ);

    const layoutVariant =
      act.layoutVariant ?? LAYOUT_ROTATION[i % LAYOUT_ROTATION.length];
    const textRevealMode =
      act.textRevealMode ?? TEXT_REVEAL_ROTATION[i % TEXT_REVEAL_ROTATION.length];

    results.push({
      posX,
      posY,
      posZ,
      prevPosX,
      prevPosY,
      prevPosZ,
      transitionIn,
      transitionOut,
      layoutVariant,
      textRevealMode,
    });

    // Advance world coordinates for Act i+1 strictly according to Act i's transitionOut!
    switch (transitionOut.archetype) {
      case 'CAMERA_SPATIAL_FLIGHT': {
        const traj = transitionOut.cameraFlight?.trajectory ?? 'WHIP_PAN_RIGHT';
        if (traj === 'WHIP_PAN_RIGHT') {
          currX = posX + 1420;
        } else if (traj === 'WHIP_PAN_LEFT') {
          currX = posX - 1420;
        } else if (traj === 'VERTICAL_CRANE_DOWN') {
          currY = posY + 920;
        } else if (traj === 'VERTICAL_CRANE_UP') {
          currY = posY - 920;
        } else if (traj === 'DIAGONAL_GLIDE') {
          currX = posX + 1280;
          currY = posY + 680;
        }
        break;
      }
      case 'DEEP_Z_ZOOM_THROUGH': {
        currZ = posZ - 1600;
        break;
      }
      case 'ELEMENT_KINETIC_DISPERSE':
      case 'TOPOLOGICAL_ANCHOR_MORPH':
      case 'KINETIC_LIGHT_SWEEP':
      default: {
        // Stationary camera! Next act occupies the exact same 3D stage coordinates.
        currX = posX;
        currY = posY;
        currZ = posZ;
        break;
      }
    }
  }

  return results;
}

export interface ChildKineticTransform {
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  opacity: number;
  clipPath?: string;
}

/**
 * Computes per-child staggered kinetic entrance and exit transforms so that:
 * - During `ELEMENT_KINETIC_DISPERSE`, individual children fling out in staggered
 *   order (`childIndex * 3` frames) and pop in with elastic overshoot on the next scene.
 * - During `CAMERA_SPATIAL_FLIGHT`, children hold their spatial position at 100%
 *   solid opacity so BOTH outgoing and incoming scenes are simultaneously visible
 *   in the camera viewport as the camera glides across!
 * - During `DEEP_Z_ZOOM_THROUGH`, children expand radially outward like an opening portal.
 * - During `TOPOLOGICAL_ANCHOR_MORPH`, the hero visual/anchor (childIndex === 0)
 *   performs a 3D core flip while context items scale cleanly.
 * - During `KINETIC_LIGHT_SWEEP`, a diagonal clip-path wipe reveals/conceals the act.
 */
export function computeChildTransitionStyle(
  childIndex: number,
  frame: number,
  actStart: number,
  actEnd: number,
  fps: number,
  transitionIn?: ActHandoffTransition,
  transitionOut?: ActHandoffTransition
): ChildKineticTransform {
  let offsetX = 0;
  let offsetY = 0;
  let offsetZ = 0;
  let rotateX = 0;
  let rotateY = 0;
  let rotateZ = 0;
  let scale = 1;
  let opacity = 1;
  let clipPath: string | undefined = undefined;

  const outDur = transitionOut?.durationInFrames ?? 20;
  const outStart = actEnd - outDur;

  // 1. EVALUATE EXIT CHOREOGRAPHY (when frame is near actEnd)
  if (transitionOut && frame >= outStart) {
    const exitLocal = frame - outStart;
    const staggeredExitFrame = Math.max(0, exitLocal - childIndex * 3);

    switch (transitionOut.archetype) {
      case 'CAMERA_SPATIAL_FLIGHT': {
        // Co-Presence Law: Keep outgoing scene 100% solid while camera pans away
        // so both outgoing and incoming scenes are visible in the viewport together!
        opacity = interpolate(frame, [actEnd + 10, actEnd + 22], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        break;
      }
      case 'ELEMENT_KINETIC_DISPERSE': {
        const dir = transitionOut.elementDisperse?.direction ?? 'LEFT';
        const flingProgress = interpolate(staggeredExitFrame, [0, 14], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.55, 0.0, 0.85, 0.35),
        });
        if (dir === 'LEFT') {
          offsetX = Math.round(-flingProgress * (1150 + childIndex * 140));
          offsetY = Math.round((childIndex % 2 === 0 ? -1 : 1) * flingProgress * 85);
          rotateZ = Number((-flingProgress * (8 + childIndex * 2)).toFixed(2));
        } else if (dir === 'RIGHT') {
          offsetX = Math.round(flingProgress * (1150 + childIndex * 140));
          rotateZ = Number((flingProgress * (8 + childIndex * 2)).toFixed(2));
        } else if (dir === 'UP') {
          offsetY = Math.round(-flingProgress * (820 + childIndex * 90));
        } else if (dir === 'DOWN') {
          offsetY = Math.round(flingProgress * (820 + childIndex * 90));
        } else {
          // RADIAL_BURST
          const angle = (childIndex * Math.PI) / 2.5 + 0.4;
          offsetX = Math.round(Math.cos(angle) * flingProgress * 960);
          offsetY = Math.round(Math.sin(angle) * flingProgress * 680);
          scale = Number((1 - flingProgress * 0.45).toFixed(2));
        }
        opacity = interpolate(staggeredExitFrame, [0, 10, 14], [1, 0.7, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        break;
      }
      case 'DEEP_Z_ZOOM_THROUGH': {
        const zoomP = interpolate(exitLocal, [0, outDur], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.7, 0, 0.2, 1),
        });
        // Focal portal expansion: child 0 (hero visual) opens wide, text flies past camera
        scale = Number((1 + zoomP * (childIndex === 0 ? 3.4 : 2.1)).toFixed(2));
        offsetZ = Math.round(zoomP * 650);
        opacity = interpolate(zoomP, [0, 0.65, 1], [1, 0.85, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        break;
      }
      case 'TOPOLOGICAL_ANCHOR_MORPH': {
        const morphP = interpolate(staggeredExitFrame, [0, 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        if (childIndex === 0) {
          // Hero anchor spins 180deg in 3D to morph into next scene's core
          rotateY = Number((morphP * 180).toFixed(1));
          scale = Number((1 + Math.sin(morphP * Math.PI) * 0.35).toFixed(2));
          opacity = interpolate(morphP, [0, 0.8, 1], [1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
        } else {
          scale = Number((1 - morphP * 0.65).toFixed(2));
          offsetY = Math.round(morphP * -95);
          opacity = interpolate(morphP, [0, 0.6], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
        }
        break;
      }
      case 'KINETIC_LIGHT_SWEEP': {
        const wipeP = interpolate(exitLocal, [0, outDur], [0, 100], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        clipPath = `polygon(${Math.round(wipeP)}% 0%, 100% 0%, 100% 100%, ${Math.round(wipeP)}% 100%)`;
        opacity = wipeP >= 99 ? 0 : 1;
        break;
      }
    }
  }

  // 2. EVALUATE ENTRANCE CHOREOGRAPHY FROM PREVIOUS TRANSITION (when frame is near actStart)
  const inDur = transitionIn?.durationInFrames ?? 20;
  if (transitionIn && frame <= actStart + inDur + 12) {
    const enterLocal = frame - (actStart - Math.floor(inDur * 0.35));
    const staggeredEnterFrame = Math.max(0, enterLocal - childIndex * 4);

    switch (transitionIn.archetype) {
      case 'CAMERA_SPATIAL_FLIGHT': {
        // Incoming scene is ALREADY present on the canvas as the camera pans into it!
        opacity = Math.min(
          opacity,
          interpolate(frame, [actStart - 22, actStart - 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        );
        break;
      }
      case 'ELEMENT_KINETIC_DISPERSE': {
        // Staggered elastic POP onto the stationary stage after previous elements disperse
        const popSpring = spring({
          frame: Math.max(0, frame - actStart - childIndex * 4),
          fps,
          config: { damping: 10, stiffness: 170, mass: 0.75 },
        });
        const popScale = interpolate(popSpring, [0, 1], [0.15, 1]);
        const popY = Math.round((1 - popSpring) * (110 + childIndex * 25));
        scale = Number((scale * popScale).toFixed(2));
        offsetY += popY;
        opacity = Math.min(opacity, Math.min(1, popSpring * 1.4));
        break;
      }
      case 'DEEP_Z_ZOOM_THROUGH': {
        // Emerges from deep background (scale 0.25 -> 1.0) as camera dives through aperture
        const emergeSpring = spring({
          frame: Math.max(0, frame - (actStart - 6) - childIndex * 3),
          fps,
          config: { damping: 14, stiffness: 130, mass: 0.85 },
        });
        scale = Number((scale * interpolate(emergeSpring, [0, 1], [0.22, 1])).toFixed(2));
        offsetZ += Math.round((1 - emergeSpring) * -750);
        opacity = Math.min(opacity, emergeSpring);
        break;
      }
      case 'TOPOLOGICAL_ANCHOR_MORPH': {
        const morphInSpring = spring({
          frame: Math.max(0, frame - actStart - childIndex * 3),
          fps,
          config: { damping: 12, stiffness: 150, mass: 0.8 },
        });
        if (childIndex === 0) {
          rotateY += Number(((1 - morphInSpring) * -180).toFixed(1));
        } else {
          offsetX += Math.round((1 - morphInSpring) * (childIndex % 2 === 0 ? 180 : -180));
        }
        scale = Number((scale * morphInSpring).toFixed(2));
        opacity = Math.min(opacity, morphInSpring);
        break;
      }
      case 'KINETIC_LIGHT_SWEEP': {
        const sweepInP = interpolate(frame, [actStart - outDur, actStart], [0, 100], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        if (frame < actStart) {
          clipPath = `polygon(0% 0%, ${Math.round(sweepInP)}% 0%, ${Math.round(sweepInP)}% 100%, 0% 100%)`;
        }
        break;
      }
    }
  }

  return {
    offsetX: Math.round(offsetX),
    offsetY: Math.round(offsetY),
    offsetZ: Math.round(offsetZ),
    rotateX,
    rotateY,
    rotateZ,
    scale,
    opacity,
    clipPath,
  };
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
      case 'CAMERA_SPATIAL_FLIGHT': {
        const smoothProgress = interpolate(localFrame, [0, duration], [0, 1], {
          easing: Easing.bezier(0.76, 0.0, 0.24, 1.0),
        });

        const trajectory = trans.cameraFlight?.trajectory ?? 'WHIP_PAN_RIGHT';
        let offsetX = 0;
        let offsetY = 0;
        let roll = 0;

        if (trajectory === 'WHIP_PAN_RIGHT') {
          offsetX = -smoothProgress * 180;
          roll = Math.sin(smoothProgress * Math.PI) * (trans.cameraFlight?.bankingRollDegrees ?? 3.5);
        } else if (trajectory === 'WHIP_PAN_LEFT') {
          offsetX = smoothProgress * 180;
          roll = -Math.sin(smoothProgress * Math.PI) * (trans.cameraFlight?.bankingRollDegrees ?? 3.5);
        } else if (trajectory === 'VERTICAL_CRANE_DOWN') {
          offsetY = -smoothProgress * 140;
        } else if (trajectory === 'VERTICAL_CRANE_UP') {
          offsetY = smoothProgress * 140;
        }

        const blurPeak = trans.cameraFlight?.peakBlurPixels ?? 8;
        const motionBlurPx = Math.sin(smoothProgress * Math.PI) * blurPeak;

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
          // Co-Presence Law: opacity stays 1.0 during camera pan so both scenes are seen together!
          elementExit: { offsetX: 0, offsetY: 0, offsetZ: 0, rotateZ: 0, scale: 1, opacity: 1 },
          apertureRevealScale: 0,
          fromActId,
          toActId,
        };
      }

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

        const elemOpacity = interpolate(localFrame, [0, duration * 0.85], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

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

      case 'DEEP_Z_ZOOM_THROUGH': {
        const targetDepth = trans.deepZZoom?.penetrationDepthZ ?? 1600;
        const zoomProgress = interpolate(localFrame, [0, duration], [0, targetDepth * 0.25], {
          easing: Easing.bezier(0.85, 0.0, 0.15, 1.0),
        });

        const revealScale = interpolate(localFrame, [duration * 0.35, duration], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const elemScale = 1 + (localFrame / duration) * 2.4;
        const elemOpacity = interpolate(localFrame, [0, duration * 0.75], [1, 0], {
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

      case 'TOPOLOGICAL_ANCHOR_MORPH': {
        const morphSpring = spring({
          frame: localFrame,
          fps,
          config: { damping: 18, stiffness: 120, mass: 0.9 },
        });

        const elemOpacity = interpolate(localFrame, [0, duration * 0.7], [1, 0], {
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

      case 'KINETIC_LIGHT_SWEEP': {
        const sliceProgress = interpolate(localFrame, [0, duration], [0, 1], {
          easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        });

        let recoilY = 0;
        if (trans.kineticSlice?.hasRecoilShake && localFrame >= 4 && localFrame <= 7) {
          recoilY = localFrame % 2 === 0 ? 3 : -3;
        }

        const elemOpacity = interpolate(sliceProgress, [0.55, 0.95], [1, 0], {
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
