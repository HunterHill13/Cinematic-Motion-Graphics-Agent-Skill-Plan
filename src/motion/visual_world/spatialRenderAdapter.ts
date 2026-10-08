/**
 * ============================================================================
 * SPATIAL RENDER ADAPTER (PHASE 5C.1)
 * ============================================================================
 * 
 * Bridges the Phase 5C SpatialDepthContract directly into Remotion DOM/SVG
 * styles, perspective coordinates, apparent scale calculations, and depth-aware
 * layer ordering.
 * 
 * CORE DOCTRINE:
 *   Spatial Contract
 *          ↓
 *   SpatialRenderAdapter
 *          ↓
 *   Renderer (CSS/SVG Transforms, z-index, apparentScale)
 *          ↓
 *   Actual Visual Difference
 * 
 * Ensures that 'z' CANNOT be ignored by the renderer while validators pass.
 * ============================================================================
 */

import React from 'react';
import {
  SpatialDepthContract,
  EntitySpatialPlacement,
  SpatialMotionResponse,
  DepthBand,
  SpatialTransform,
} from './depthSchema';

export interface RenderedSpatialElement {
  entityId: string;
  depthBand: DepthBand;
  numericZ: number;
  baseScale: number;
  apparentScale: number;
  zIndex: number;
  pixelX: number;
  pixelY: number;
  depthOffsetZ: number;
  style: React.CSSProperties;
}

export interface SpatialRenderValidationReport {
  passed: boolean;
  violations: Array<{
    code: 'RENDER_DEPTH_IGNORED' | 'RENDER_SCALE_PROJECTION_IGNORED' | 'RENDER_DEPTH_ORDERING_VIOLATION' | 'SPATIAL_METADATA_ONLY_DETECTED';
    message: string;
    entityId?: string;
  }>;
}

export class SpatialRenderAdapter {
  /**
   * Canonical perspective scale projection formula:
   * apparentScale = baseScale / (1.0 + z * 0.75)
   */
  public static calculateApparentScale(baseScale: number, z: number): number {
    const clampedZ = Math.max(0.0, Math.min(1.0, z));
    return Math.round((baseScale / (1.0 + clampedZ * 0.75)) * 1000) / 1000;
  }

  /**
   * Maps normalized spatial placement into screen-space pixel coordinates,
   * perspective depth offset, apparent scale, and stacking z-index.
   */
  public static resolveElement(
    placement: EntitySpatialPlacement,
    viewportWidth: number = 1920,
    viewportHeight: number = 1080,
    overrideZ?: number
  ): RenderedSpatialElement {
    const t = placement.transform;
    const effectiveZ = overrideZ !== undefined ? overrideZ : t.z;
    const clampedZ = Math.max(0.0, Math.min(1.0, effectiveZ));

    // Screen pixel conversion
    const pixelX = Math.round(viewportWidth / 2 + t.x * (viewportWidth / 2));
    const pixelY = Math.round(viewportHeight / 2 + t.y * (viewportHeight / 2));

    // Canonical apparent scale
    const apparentScale = this.calculateApparentScale(t.scale, clampedZ);

    // Stacking index: nearer objects (z close to 0) possess higher z-index
    const zIndex = Math.round((1.0 - clampedZ) * 1000);

    // 2.5D perspective translation in pixels (for CSS preserve-3d)
    const depthOffsetZ = Math.round((0.5 - clampedZ) * 600);

    const rotX = t.rotationX ?? 0;
    const rotY = t.rotationY ?? 0;
    const rotZ = t.rotationZ ?? 0;

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
      numericZ: clampedZ,
      baseScale: t.scale,
      apparentScale,
      zIndex,
      pixelX,
      pixelY,
      depthOffsetZ,
      style,
    };
  }

  /**
   * Evaluates dynamic Z-motion trajectory across normalized progress t in [0, 1].
   */
  public static interpolateTrajectoryZ(
    response: SpatialMotionResponse,
    progress: number
  ): number {
    const p = Math.max(0.0, Math.min(1.0, progress));
    return response.startZ + p * (response.endZ - response.startZ);
  }

  /**
   * Computes depth-ordered rendered elements for a contract.
   * Elements with smaller z (closer to viewer) receive higher zIndex and render
   * predictably on top, guaranteeing physical occlusion.
   */
  public static getDepthSortedElements(
    contract: SpatialDepthContract,
    viewportWidth: number = 1920,
    viewportHeight: number = 1080,
    progress: number = 0
  ): RenderedSpatialElement[] {
    const motionMap = new Map<string, SpatialMotionResponse>();
    if (contract.motionResponses) {
      for (const mr of contract.motionResponses) {
        motionMap.set(mr.entityId, mr);
      }
    }

    const resolved = contract.placements.map((p) => {
      let activeZ = p.transform.z;
      const motion = motionMap.get(p.entityId);
      if (motion) {
        activeZ = this.interpolateTrajectoryZ(motion, progress);
      }
      return this.resolveElement(p, viewportWidth, viewportHeight, activeZ);
    });

    // Sort by numericZ ascending (smaller z = nearer = higher zIndex)
    return resolved.sort((a, b) => a.numericZ - b.numericZ);
  }

  /**
   * Anti-Bypass Validator:
   * Inspects rendered elements to certify that the renderer actually consumed
   * and manifested the spatial contract (apparent scale differences, layer ordering,
   * z-index differentiation) rather than ignoring z as passive metadata.
   */
  public static validateRenderExecution(
    rendered: RenderedSpatialElement[],
    contract: SpatialDepthContract
  ): SpatialRenderValidationReport {
    const violations: SpatialRenderValidationReport['violations'] = [];

    if (contract.isFlatGraphicOverride) {
      return { passed: true, violations: [] };
    }

    if (rendered.length === 0) {
      violations.push({
        code: 'SPATIAL_METADATA_ONLY_DETECTED',
        message: 'Renderer produced zero spatial elements from SpatialDepthContract.',
      });
      return { passed: false, violations };
    }

    // 1. Apparent scale projection verification
    const zSpread = Math.max(...rendered.map((r) => r.numericZ)) - Math.min(...rendered.map((r) => r.numericZ));
    if (zSpread >= 0.10) {
      // Check if apparent scale reflects z
      for (const el of rendered) {
        const expected = this.calculateApparentScale(el.baseScale, el.numericZ);
        if (Math.abs(el.apparentScale - expected) > 0.005) {
          violations.push({
            code: 'RENDER_SCALE_PROJECTION_IGNORED',
            message: `Entity "${el.entityId}" rendered apparentScale ${el.apparentScale} does not match expected depth-projected scale ${expected}.`,
            entityId: el.entityId,
          });
        }
        // Check if renderer lazily used baseScale without z decay
        if (Math.abs(el.apparentScale - el.baseScale) < 0.001 && el.numericZ > 0.15) {
          violations.push({
            code: 'RENDER_DEPTH_IGNORED',
            message: `Entity "${el.entityId}" at z=${el.numericZ} was rendered with unprojected baseScale=${el.baseScale}. Renderer is ignoring z depth.`,
            entityId: el.entityId,
          });
        }
      }
    }

    // 2. Layer ordering & z-index verification
    for (let i = 0; i < rendered.length; i++) {
      for (let j = i + 1; j < rendered.length; j++) {
        const nearer = rendered[i];
        const farther = rendered[j];
        if (farther.numericZ - nearer.numericZ >= 0.05) {
          if (nearer.zIndex <= farther.zIndex) {
            violations.push({
              code: 'RENDER_DEPTH_ORDERING_VIOLATION',
              message: `Nearer entity "${nearer.entityId}" (z=${nearer.numericZ}, zIndex=${nearer.zIndex}) has lower or equal z-index than farther entity "${farther.entityId}" (z=${farther.numericZ}, zIndex=${farther.zIndex}).`,
              entityId: nearer.entityId,
            });
          }
        }
      }
    }

    // 3. Occlusion intent physical check
    if (contract.occlusions && contract.occlusions.length > 0) {
      for (const occ of contract.occlusions) {
        const occluder = rendered.find((r) => r.entityId === occ.occludingEntityId);
        const occluded = rendered.find((r) => r.entityId === occ.occludedEntityId);
        if (occluder && occluded) {
          if (occluder.zIndex <= occluded.zIndex) {
            violations.push({
              code: 'RENDER_DEPTH_ORDERING_VIOLATION',
              message: `Occlusion intent "${occ.id}" requires "${occluder.entityId}" to occlude "${occluded.entityId}", but occluder zIndex (${occluder.zIndex}) <= occluded zIndex (${occluded.zIndex}).`,
              entityId: occluder.entityId,
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
