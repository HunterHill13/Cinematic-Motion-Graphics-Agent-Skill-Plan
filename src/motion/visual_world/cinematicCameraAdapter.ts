/**
 * ============================================================================
 * CINEMATIC CAMERA ADAPTER (PHASE 5E)
 * ============================================================================
 * 
 * Bridges Cinematic Camera Choreography & Motivations into the 2.5D spatial
 * projection pipeline, converting camera state, depth bands, and focal relationships
 * into depth-dependent parallax, apparent scale, and dynamic composition framing.
 * 
 * CORE DOCTRINE:
 *   World Entity Position (SpatialDepthContract)
 *          ↓
 *   Cinematic Camera State (x, y, z, zoom, orbit, leadRoom, motivation)
 *          ↓
 *   Depth-Dependent Parallax & Camera Projection Model
 *          ↓
 *   SpatialRenderAdapter Integration (Apparent Scale, Stacking z-index, Screen X/Y)
 *          ↓
 *   Material & Lighting Render Adapters
 *          ↓
 *   Actual Visual Pixels (Genuine Parallax & Compositional Hierarchy)
 * 
 * Guarantees that Camera is NOT merely a flat global CSS transform scale/translate.
 * Proves that foreground, hero, and background respond with depth-dependent
 * relative displacement and apparent scale variations.
 * ============================================================================
 */

import React from 'react';
import {
  EntitySpatialPlacement,
  DepthBand,
} from './depthSchema';
import { RenderedSpatialElement, SpatialRenderAdapter } from './spatialRenderAdapter';

export type CameraMotivation =
  | 'FOLLOW_HERO'
  | 'REVEAL_CONTEXT'
  | 'EMPHASIZE_EVENT'
  | 'ENTER_WORLD'
  | 'EXIT_WORLD'
  | 'ESTABLISH_RELATIONSHIP'
  | 'CARRY_TRANSITION';

export interface CameraState {
  x: number; // Camera position X in normalized world coordinates [-1.0, 1.0]
  y: number; // Camera position Y in normalized world coordinates [-1.0, 1.0]
  z: number; // Camera push/pull offset [-0.5, 0.5]
  zoom: number; // Lens framing zoom multiplier [0.5, 3.0]
  orbitAngleDeg: number; // Orbital angle in degrees around focal pivot [-45, 45]
  pitchDeg?: number;
  rollDeg?: number;
  focusEntityId?: string; // Entity ID of focal anchor
  focalDepthZ?: number; // Normalized Z plane of focal pivot (default 0.45 - 0.50)
  leadRoomX?: number; // Visual composition lead room ahead of moving subject
  leadRoomY?: number;
  motivation: CameraMotivation;
  progress: number; // Normalized timeline progress [0, 1]
}

export interface RenderedCameraProjectedElement extends RenderedSpatialElement {
  cameraRelativeX: number;
  cameraRelativeY: number;
  effectiveZ: number;
  parallaxFactor: number;
  orbitDisplacementX: number;
}

export interface CameraRenderValidationReport {
  passed: boolean;
  violations: Array<{
    code:
      | 'CAMERA_RUNTIME_IGNORED'
      | 'CAMERA_GLOBAL_TRANSFORM_BYPASS'
      | 'CAMERA_PARALLAX_MISSING'
      | 'CAMERA_HERO_OWNERSHIP_VIOLATION'
      | 'CAMERA_RANDOM_MOTION_BYPASS'
      | 'CAMERA_MOTIVATION_MISSING'
      | 'CAMERA_SPATIAL_PIPELINE_BYPASS'
      | 'CAMERA_DEPTH_EFFECT_MISSING';
    message: string;
    entityId?: string;
  }>;
}

export class CinematicCameraAdapter {
  /**
   * Evaluates depth-dependent apparent scale under camera push/pull and zoom:
   * apparentScale = (baseScale * zoom) / (1.0 + max(0.02, z - cameraZ) * 0.75)
   */
  public static calculateCameraApparentScale(
    baseScale: number,
    z: number,
    cameraZ: number = 0,
    zoom: number = 1.0
  ): number {
    const effectiveZ = Math.max(0.02, Math.min(1.5, z - cameraZ));
    return Math.round(((baseScale * zoom) / (1.0 + effectiveZ * 0.75)) * 1000) / 1000;
  }

  /**
   * Evaluates orbital lateral shift around focal depth plane:
   * Objects in front of focal plane shift opposite to objects behind focal plane.
   */
  public static calculateOrbitDisplacement(
    z: number,
    orbitAngleDeg: number,
    focalDepthZ: number = 0.45
  ): number {
    if (Math.abs(orbitAngleDeg) < 0.01) return 0;
    const rad = (orbitAngleDeg * Math.PI) / 180;
    // (focalDepthZ - z) is positive for foreground, 0 at hero, negative for background
    const depthDelta = focalDepthZ - z;
    return Math.round(Math.sin(rad) * depthDelta * 0.55 * 1000) / 1000;
  }

  /**
   * Projects a single EntitySpatialPlacement through the active CameraState.
   * Distinct depth layers experience different parallax displacements and scaling.
   */
  public static projectElement(
    placement: EntitySpatialPlacement,
    camera: CameraState,
    viewportWidth: number = 1920,
    viewportHeight: number = 1080
  ): RenderedCameraProjectedElement {
    const t = placement.transform;
    const focalZ = camera.focalDepthZ ?? 0.45;

    // 1. Camera-relative effective Z
    const effectiveZ = Math.max(0.02, Math.min(1.5, t.z - camera.z));

    // 2. Orbital displacement based on depth relative to focal plane
    const orbitDisplacementX = this.calculateOrbitDisplacement(t.z, camera.orbitAngleDeg, focalZ);

    // 3. Parallax factor: Nearer objects (z ~ 0.15) shift more than background (z ~ 0.85)
    // Parallax sensitivity: 1.0 + (1.0 - z) * 0.40
    const parallaxFactor = Math.round((1.0 + (1.0 - t.z) * 0.45) * 1000) / 1000;

    // 4. Camera-relative world space offset with lead room (camera looks ahead)
    const effectiveCamX = camera.x + (camera.leadRoomX ?? 0);
    const effectiveCamY = camera.y + (camera.leadRoomY ?? 0);

    const cameraRelativeX = (t.x - effectiveCamX) * parallaxFactor + orbitDisplacementX;
    const cameraRelativeY = (t.y - effectiveCamY) * parallaxFactor;

    // 5. Screen pixel conversion
    const pixelX = Math.round(viewportWidth / 2 + cameraRelativeX * (viewportWidth / 2) * camera.zoom);
    const pixelY = Math.round(viewportHeight / 2 + cameraRelativeY * (viewportHeight / 2) * camera.zoom);

    // 6. Camera apparent scale
    const apparentScale = this.calculateCameraApparentScale(t.scale, t.z, camera.z, camera.zoom);

    // 7. Stacking order and perspective translation
    const clampedZ = Math.max(0.0, Math.min(1.0, effectiveZ));
    const zIndex = Math.round((1.0 - clampedZ) * 1000);
    const depthOffsetZ = Math.round((0.5 - clampedZ) * 600);

    const rotX = (t.rotationX ?? 0) + (camera.pitchDeg ?? 0);
    const rotY = (t.rotationY ?? 0) + camera.orbitAngleDeg;
    const rotZ = (t.rotationZ ?? 0) + (camera.rollDeg ?? 0);

    const style: React.CSSProperties = {
      position: 'absolute',
      left: pixelX,
      top: pixelY,
      zIndex,
      transform: `translate3d(-50%, -50%, ${depthOffsetZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${apparentScale})`,
      transformOrigin: '50% 50%',
      transformStyle: 'preserve-3d',
      willChange: 'transform, z-index',
    };

    return {
      entityId: placement.entityId,
      depthBand: placement.depthBand,
      numericZ: t.z,
      baseScale: t.scale,
      apparentScale,
      zIndex,
      pixelX,
      pixelY,
      depthOffsetZ,
      style,
      cameraRelativeX,
      cameraRelativeY,
      effectiveZ,
      parallaxFactor,
      orbitDisplacementX,
    };
  }

  /**
   * Projects a list of placements and depth-sorts them.
   */
  public static projectAll(
    placements: EntitySpatialPlacement[],
    camera: CameraState,
    viewportWidth: number = 1920,
    viewportHeight: number = 1080
  ): RenderedCameraProjectedElement[] {
    return placements
      .map((p) => this.projectElement(p, camera, viewportWidth, viewportHeight))
      .sort((a, b) => a.numericZ - b.numericZ);
  }

  /**
   * Anti-Bypass Validator:
   * Inspects rendered elements against CameraState to prove that camera behavior
   * is genuine spatial cinematography, not a flat global transform or fake shake.
   */
  public static validateCameraRenderExecution(
    rendered: RenderedCameraProjectedElement[],
    camera: CameraState,
    baselineRendered?: RenderedCameraProjectedElement[],
    options?: {
      isGlobalTransformComparison?: boolean;
    }
  ): CameraRenderValidationReport {
    const violations: CameraRenderValidationReport['violations'] = [];

    // 1. Mandatory Motivation Gate (Test M)
    const validMotivations: CameraMotivation[] = [
      'FOLLOW_HERO',
      'REVEAL_CONTEXT',
      'EMPHASIZE_EVENT',
      'ENTER_WORLD',
      'EXIT_WORLD',
      'ESTABLISH_RELATIONSHIP',
      'CARRY_TRANSITION',
    ];
    if (!camera.motivation || !validMotivations.includes(camera.motivation)) {
      violations.push({
        code: 'CAMERA_MOTIVATION_MISSING',
        message: `Camera state possesses invalid or missing motivation "${camera.motivation}". Causal motivation is mandatory.`,
      });
    }

    if (rendered.length === 0) {
      violations.push({
        code: 'CAMERA_RUNTIME_IGNORED',
        message: 'Camera adapter produced zero rendered elements.',
      });
      return { passed: false, violations };
    }

    // 2. Parallax & Depth Verification (when camera is panned or orbited)
    if (baselineRendered && baselineRendered.length >= 2) {
      const fgCurr = rendered.find((r) => r.depthBand === 'FOREGROUND');
      const heroCurr = rendered.find((r) => r.depthBand === 'HERO_PLANE');
      const bgCurr = rendered.find((r) => r.depthBand === 'BACKGROUND' || r.depthBand === 'DEEP_BACKGROUND');

      const fgBase = baselineRendered.find((r) => r.depthBand === 'FOREGROUND');
      const heroBase = baselineRendered.find((r) => r.depthBand === 'HERO_PLANE');
      const bgBase = baselineRendered.find((r) => r.depthBand === 'BACKGROUND' || r.depthBand === 'DEEP_BACKGROUND');

      if (fgCurr && heroCurr && bgCurr && fgBase && heroBase && bgBase) {
        const fgDeltaX = Math.abs(fgCurr.pixelX - fgBase.pixelX);
        const heroDeltaX = Math.abs(heroCurr.pixelX - heroBase.pixelX);
        const bgDeltaX = Math.abs(bgCurr.pixelX - bgBase.pixelX);

        // If camera has lateral pan or orbit, foreground MUST move more than background
        if (Math.abs(camera.x) > 0.05 || Math.abs(camera.orbitAngleDeg) > 5) {
          if (options?.isGlobalTransformComparison) {
            // Check for flat global transform cheat (all deltas identical)
            const spread = Math.abs(fgDeltaX - bgDeltaX);
            if (spread < 2.0) {
              violations.push({
                code: 'CAMERA_GLOBAL_TRANSFORM_BYPASS',
                message: 'Global transform detected: Foreground and background shifted by identical pixel offsets. Parallax is absent.',
              });
            }
          } else {
            // In spatial camera: FG displacement must exceed BG displacement
            if (fgDeltaX <= bgDeltaX) {
              violations.push({
                code: 'CAMERA_PARALLAX_MISSING',
                message: `Foreground displacement (${fgDeltaX}px) is less than or equal to background displacement (${bgDeltaX}px). Real parallax is missing.`,
              });
            }
          }
        }

        // Push-In / Depth Push check: If camera pushed in (camera.z > 0 or zoom > 1)
        if (camera.z > 0.1 || camera.zoom > 1.2) {
          const fgScaleRatio = fgCurr.apparentScale / fgBase.apparentScale;
          const bgScaleRatio = bgCurr.apparentScale / bgBase.apparentScale;

          if (fgScaleRatio <= bgScaleRatio) {
            violations.push({
              code: 'CAMERA_DEPTH_EFFECT_MISSING',
              message: `Camera push-in produced uniform or inverted scale growth (FG ratio=${fgScaleRatio}, BG ratio=${bgScaleRatio}). Real depth perspective expansion is missing.`,
            });
          }
        }
      }
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }
}
