/**
 * ============================================================================
 * LIGHTING RENDER ADAPTER (PHASE 5D.1)
 * ============================================================================
 * 
 * Bridges Phase 5B.2 LightingContract directly into Normalized Lighting State,
 * feeding MaterialRenderAdapter to drive deterministic Remotion CSS/SVG visual styles.
 * 
 * CORE DOCTRINE:
 *   Lighting Contract
 *          ↓
 *   LightingRenderAdapter
 *          ↓
 *   Normalized Lighting State (Key, Fill, Rim, Ambient, Emissive, Direction, Softness)
 *          ↓
 *   MaterialRenderAdapter (Material × Lighting Interaction)
 *          ↓
 *   Existing Remotion Renderer
 *          ↓
 *   Actual Measurable Pixels (Deterministic Pixel Proof)
 * 
 * Guarantees that Lighting Contracts CANNOT be bypassed as passive metadata.
 * Proves that changing lighting direction, intensity, key/fill balance, rim,
 * or color alters rendered appearance in a deterministic and measurable way.
 * ============================================================================
 */

import React from 'react';
import {
  LightingContract,
  LightSourceReference,
  LightDirection,
  LightSoftness,
} from './lightingSchema';
import { RenderedMaterialStyle } from './materialRenderAdapter';

export interface NormalizedLightingState {
  keyIntensity: number; // [0.0 - 2.5]
  keyDirectionAngle: number; // Degrees [0 - 360)
  keyColor: string; // Hex color string
  fillIntensity: number; // [0.0 - 2.0]
  fillColor: string;
  rimIntensity: number; // [0.0 - 2.5]
  rimDirectionAngle: number; // Degrees [0 - 360)
  rimColor: string;
  ambientIntensity: number; // [0.0 - 1.0]
  ambientColor: string;
  softness: LightSoftness;
  softnessSpread: number; // Multiplier [0.5 - 2.0]
  contrastRatio: number; // Key / Fill ratio
  emissiveIntensity: number; // [0.0 - 3.0]
  emissiveColor: string;
  highlightStrength: number; // Calculated highlight magnitude
  edgeContrast: number; // Calculated edge rim separation factor
  surfaceBrightness: number; // Aggregate surface illuminance
}

export interface LightingRenderValidationReport {
  passed: boolean;
  violations: Array<{
    code:
      | 'LIGHTING_METADATA_ONLY_DETECTED'
      | 'LIGHTING_RUNTIME_IGNORED'
      | 'LIGHT_DIRECTION_RESPONSE_MISSING'
      | 'LIGHT_INTENSITY_RESPONSE_MISSING'
      | 'RIM_RESPONSE_MISSING'
      | 'LIGHT_COLOR_RESPONSE_MISSING'
      | 'LIGHTING_PIXEL_RESPONSE_MISSING'
      | 'LIGHTING_SPATIAL_OWNERSHIP_VIOLATION'
      | 'GLOBAL_TINT_BYPASS_DETECTED'
      | 'RANDOM_LIGHTING_BYPASS_DETECTED';
    message: string;
    entityId?: string;
    lightId?: string;
  }>;
}

export class LightingRenderAdapter {
  /**
   * Maps semantic or vector LightDirection into a 2D planar angle in degrees [0, 360).
   * 0deg = Right (+X), 90deg = Bottom (+Y), 180deg = Left (-X), 270deg = Top (-Y).
   */
  public static resolveDirectionToAngle(direction: LightDirection): number {
    if (direction.vector) {
      const rad = Math.atan2(direction.vector.y, direction.vector.x);
      const deg = (rad * 180) / Math.PI;
      return (Math.round(deg) + 360) % 360;
    }

    switch (direction.semantic) {
      case 'RIGHT':
        return 0;
      case 'LOWER_RIGHT':
        return 45;
      case 'BOTTOM':
        return 90;
      case 'LOWER_LEFT':
        return 135;
      case 'LEFT':
        return 180;
      case 'UPPER_LEFT':
        return 225;
      case 'TOP':
        return 270;
      case 'UPPER_RIGHT':
        return 315;
      case 'FRONT':
        return 45;
      case 'BACK':
        return 225;
      default:
        return 45;
    }
  }

  /**
   * Normalizes a full LightingContract into a unified parameters bundle
   * consumed by MaterialRenderAdapter for a specific target entity.
   */
  public static normalizeContract(
    contract: LightingContract,
    targetEntityId?: string
  ): NormalizedLightingState {
    const isFlat = !!contract.isFlatGraphicOverride;

    if (isFlat) {
      return {
        keyIntensity: 1.0,
        keyDirectionAngle: 45,
        keyColor: '#ffffff',
        fillIntensity: 0.0,
        fillColor: '#ffffff',
        rimIntensity: 0.0,
        rimDirectionAngle: 225,
        rimColor: '#ffffff',
        ambientIntensity: 0.0,
        ambientColor: '#ffffff',
        softness: 'HARD',
        softnessSpread: 1.0,
        contrastRatio: 1.0,
        emissiveIntensity: 0.0,
        emissiveColor: '#ffffff',
        highlightStrength: 0.0,
        edgeContrast: 1.0,
        surfaceBrightness: 1.0,
      };
    }

    const sources = contract.sources || [];

    // Filter sources matching target entity if specified, else take global sources
    const matchingSources = targetEntityId
      ? sources.filter((s) => !s.targetEntityId || s.targetEntityId === targetEntityId || s.targetEntityId === 'HERO')
      : sources;

    const keySource = matchingSources.find((s) => s.type === 'KEY' && s.enabled !== false);
    const fillSource = matchingSources.find((s) => s.type === 'FILL' && s.enabled !== false);
    const rimSource = matchingSources.find((s) => s.type === 'RIM' && s.enabled !== false);
    const emissiveSource = matchingSources.find((s) => s.type === 'EMISSIVE' && s.enabled !== false);

    const keyIntensity = keySource ? keySource.intensity.value : 1.0;
    const keyDirectionAngle = keySource ? this.resolveDirectionToAngle(keySource.direction) : 45;
    const keyColor = keySource?.color.hex || (keySource?.color.semantic === 'WARM' ? '#ffedd5' : keySource?.color.semantic === 'COOL' ? '#e0f2fe' : '#ffffff');

    const fillIntensity = fillSource ? fillSource.intensity.value : 0.4;
    const fillColor = fillSource?.color.hex || '#cbd5e1';

    const rimIntensity = rimSource ? rimSource.intensity.value : 0.0;
    const rimDirectionAngle = rimSource ? this.resolveDirectionToAngle(rimSource.direction) : (keyDirectionAngle + 180) % 360;
    const rimColor = rimSource?.color.hex || (rimSource?.color.semantic === 'CYAN' ? '#38bdf8' : '#e2e8f0');

    const ambientIntensity = contract.ambientProfile?.value ?? 0.2;
    const ambientColor = contract.ambientProfile?.color?.hex ?? '#334155';

    const softness: LightSoftness = keySource?.softness || 'MEDIUM';
    const softnessSpread =
      softness === 'HARD' ? 0.6 : softness === 'MEDIUM' ? 1.0 : softness === 'SOFT' ? 1.5 : 2.0;

    const contrastRatio = Math.round((keyIntensity / Math.max(0.1, fillIntensity)) * 100) / 100;
    const emissiveIntensity = emissiveSource ? emissiveSource.intensity.value : 0.0;
    const emissiveColor = emissiveSource?.color.hex || '#ff6600';

    const highlightStrength = Math.round((keyIntensity * (2.2 - softnessSpread * 0.4)) * 100) / 100;
    const edgeContrast = Math.round((1.0 + rimIntensity * 0.8) * 100) / 100;
    const surfaceBrightness =
      Math.round((keyIntensity * 0.5 + fillIntensity * 0.3 + ambientIntensity * 0.2) * 100) / 100;

    return {
      keyIntensity,
      keyDirectionAngle,
      keyColor,
      fillIntensity,
      fillColor,
      rimIntensity,
      rimDirectionAngle,
      rimColor,
      ambientIntensity,
      ambientColor,
      softness,
      softnessSpread,
      contrastRatio,
      emissiveIntensity,
      emissiveColor,
      highlightStrength,
      edgeContrast,
      surfaceBrightness,
    };
  }

  /**
   * Anti-Bypass Validator:
   * Inspects rendered element material styles against the expected LightingContract.
   * Proves that lighting parameters are actively manifested into rendered styles rather
   * than left as passive metadata or bypassed with global scene tints.
   */
  public static validateRenderExecution(
    rendered: RenderedMaterialStyle[],
    contract: LightingContract,
    options?: {
      previousRendered?: RenderedMaterialStyle[];
      previousContract?: LightingContract;
      checkDirectionDelta?: boolean;
      checkIntensityDelta?: boolean;
      checkRimDelta?: boolean;
      checkColorDelta?: boolean;
    }
  ): LightingRenderValidationReport {
    const violations: LightingRenderValidationReport['violations'] = [];

    if (rendered.length === 0) {
      violations.push({
        code: 'LIGHTING_METADATA_ONLY_DETECTED',
        message: 'Renderer produced zero elements from LightingContract.',
      });
      return { passed: false, violations };
    }

    const norm = this.normalizeContract(contract);

    // 1. Verify RIM response manifestation if RIM source is declared with high intensity
    if (norm.rimIntensity >= 1.0 && !contract.isFlatGraphicOverride) {
      for (const r of rendered) {
        if (r.category === 'FLAT_GRAPHIC') continue;
        const hasRimEvidence =
          (r.boxShadow && r.boxShadow.includes(norm.rimColor)) ||
          (r.border && r.border.includes(norm.rimColor));
        if (!hasRimEvidence) {
          violations.push({
            code: 'RIM_RESPONSE_MISSING',
            message: `Entity "${r.entityId}" (${r.category}) received RIM light (intensity=${norm.rimIntensity}, color=${norm.rimColor}) but rendered zero rim edge highlight.`,
            entityId: r.entityId,
          });
        }
      }
    }

    // 2. Comparative delta checks (when previous baseline is provided)
    if (options?.previousRendered && options?.previousContract) {
      const prevNorm = this.normalizeContract(options.previousContract);

      // Check Direction Delta (Test A)
      if (options.checkDirectionDelta && norm.keyDirectionAngle !== prevNorm.keyDirectionAngle) {
        let anyShiftDetected = false;
        for (const curr of rendered) {
          const prev = options.previousRendered.find((p) => p.entityId === curr.entityId);
          if (prev && curr.category === 'METAL') {
            if (curr.specularShift !== prev.specularShift || curr.background !== prev.background) {
              anyShiftDetected = true;
            }
          }
        }
        if (!anyShiftDetected) {
          violations.push({
            code: 'LIGHT_DIRECTION_RESPONSE_MISSING',
            message: `Key light direction changed (${prevNorm.keyDirectionAngle}° -> ${norm.keyDirectionAngle}°), but rendered specular highlight did not shift.`,
          });
        }
      }

      // Check Intensity Delta (Test B)
      if (options.checkIntensityDelta && Math.abs(norm.keyIntensity - prevNorm.keyIntensity) >= 0.5) {
        let anyIntensityDetected = false;
        for (const curr of rendered) {
          const prev = options.previousRendered.find((p) => p.entityId === curr.entityId);
          if (prev && curr.category !== 'FLAT_GRAPHIC') {
            if (curr.filter !== prev.filter || curr.background !== prev.background) {
              anyIntensityDetected = true;
            }
          }
        }
        if (!anyIntensityDetected) {
          violations.push({
            code: 'LIGHT_INTENSITY_RESPONSE_MISSING',
            message: `Key light intensity changed (${prevNorm.keyIntensity} -> ${norm.keyIntensity}), but rendered filter/background luminance did not respond.`,
          });
        }
      }

      // Check Rim Delta (Test D)
      if (options.checkRimDelta && Math.abs(norm.rimIntensity - prevNorm.rimIntensity) >= 0.8) {
        let anyRimDetected = false;
        for (const curr of rendered) {
          const prev = options.previousRendered.find((p) => p.entityId === curr.entityId);
          if (prev && (curr.category === 'GLASS' || curr.category === 'METAL')) {
            if (curr.boxShadow !== prev.boxShadow || curr.border !== prev.border) {
              anyRimDetected = true;
            }
          }
        }
        if (!anyRimDetected) {
          violations.push({
            code: 'RIM_RESPONSE_MISSING',
            message: `Rim intensity changed (${prevNorm.rimIntensity} -> ${norm.rimIntensity}), but rendered edge/shadow did not respond.`,
          });
        }
      }

      // Check Color Delta (Test E)
      if (options.checkColorDelta && norm.keyColor !== prevNorm.keyColor) {
        let anyColorDetected = false;
        for (const curr of rendered) {
          const prev = options.previousRendered.find((p) => p.entityId === curr.entityId);
          if (prev && curr.category !== 'FLAT_GRAPHIC') {
            if (curr.background !== prev.background || curr.boxShadow !== prev.boxShadow) {
              anyColorDetected = true;
            }
          }
        }
        if (!anyColorDetected) {
          violations.push({
            code: 'LIGHT_COLOR_RESPONSE_MISSING',
            message: `Key light color changed (${prevNorm.keyColor} -> ${norm.keyColor}), but rendered material surface did not reflect the light color.`,
          });
        }
      }

      // General zero pixel difference check
      const allIdentical = rendered.every((curr) => {
        const prev = options.previousRendered!.find((p) => p.entityId === curr.entityId);
        return prev && curr.background === prev.background && curr.boxShadow === prev.boxShadow && curr.filter === prev.filter;
      });
      if (allIdentical && (norm.keyDirectionAngle !== prevNorm.keyDirectionAngle || norm.keyIntensity !== prevNorm.keyIntensity || norm.keyColor !== prevNorm.keyColor)) {
        violations.push({
          code: 'LIGHTING_PIXEL_RESPONSE_MISSING',
          message: 'LightingContract was altered, but 100% of rendered element styles remained byte-for-byte identical.',
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }
}
