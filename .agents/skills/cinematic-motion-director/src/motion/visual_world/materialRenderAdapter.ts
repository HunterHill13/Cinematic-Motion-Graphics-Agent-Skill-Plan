/**
 * ============================================================================
 * MATERIAL RENDER ADAPTER (PHASE 5D)
 * ============================================================================
 * 
 * Bridges Phase 5B.1 MaterialReference & Material Response Contracts directly
 * into Remotion CSS/SVG visual render styles.
 * 
 * CORE DOCTRINE:
 *   Material Contract
 *          ↓
 *   MaterialRenderAdapter
 *          ↓
 *   Renderer (CSS/SVG Backgrounds, Borders, BoxShadows, Filters, Opacity)
 *          ↓
 *   Actual Measurable Visual Difference (Deterministic Pixel Proof)
 * 
 * Guarantees that Material Language CANNOT be bypassed as passive metadata.
 * Proves that changing material identity alters the rendered visual output,
 * and collapsing materials triggers fail-closed validation violations.
 * ============================================================================
 */

import React from 'react';
import {
  MaterialReference,
  MaterialCategory,
  SurfaceResponse,
  EdgeResponse,
  DeformationResponse,
  EmissionResponse,
  OpacityBehavior,
} from './materialSchema';
import { NormalizedLightingState } from './lightingRenderAdapter';
import { LightSoftness } from './lightingSchema';

export interface MaterialMotionState {
  velocity?: number; // Normalized magnitude [0, 1+]
  directionDegrees?: number; // Direction of motion in degrees [0, 360)
  progress?: number; // Timeline normalized progress [0, 1]
}

export interface MaterialDeformationState {
  compression?: number; // Compression factor [-1, 1], e.g. squish > 0, stretch < 0
  factor?: number; // Deformation intensity [0, 1]
}

export interface MaterialLightContext {
  intensity?: number; // Light intensity multiplier [0, 2]
  angleDegrees?: number; // Primary incident light angle [0, 360)
  color?: string; // Dominant incident light tint
  normalizedLighting?: NormalizedLightingState;
  keyIntensity?: number;
  fillIntensity?: number;
  rimIntensity?: number;
  rimColor?: string;
  rimDirectionAngle?: number;
  softness?: LightSoftness;
  softnessSpread?: number;
  contrastRatio?: number;
  emissiveIntensity?: number;
  emissiveColor?: string;
}

export interface RenderedMaterialStyle {
  entityId: string;
  materialId: string;
  category: MaterialCategory;
  background: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  filter?: string;
  opacity: number;
  backdropFilter?: string;
  // Measurable diagnostic fingerprints for anti-metadata validation
  specularShift: number;
  emissionIntensity: number;
  edgeBlurRadius: number;
  isFlatGraphic: boolean;
  style: React.CSSProperties;
}

export interface MaterialRenderValidationReport {
  passed: boolean;
  violations: Array<{
    code:
      | 'MATERIAL_METADATA_ONLY_DETECTED'
      | 'MATERIAL_COLLAPSE_DETECTED'
      | 'MATERIAL_RUNTIME_IGNORED'
      | 'MATERIAL_FAMILY_DIFFERENTIATION_MISSING'
      | 'MATERIAL_RIGIDITY_VIOLATION'
      | 'MATERIAL_MOTION_RESPONSE_MISSING';
    message: string;
    entityId?: string;
    materialId?: string;
  }>;
}

export class MaterialRenderAdapter {
  /**
   * Resolves a MaterialReference and its dynamic physics context into
   * deterministic Remotion CSS properties.
   */
  public static resolveMaterialStyle(
    material: MaterialReference,
    entityId: string,
    motionState: MaterialMotionState = {},
    deformationState: MaterialDeformationState = {},
    lightContext: MaterialLightContext = {}
  ): RenderedMaterialStyle {
    const isFlat = material.category === 'FLAT_GRAPHIC' || !!material.isFlatGraphicOverride;

    const velocity = Math.max(0, motionState.velocity ?? 0);
    const progress = Math.max(0, Math.min(1, motionState.progress ?? 0));
    const compression = deformationState.compression ?? 0;
    const deformFactor = Math.max(0, Math.min(1, deformationState.factor ?? 0));

    // Normalize incoming lighting context
    const normLight = lightContext.normalizedLighting;
    const keyInt = normLight?.keyIntensity ?? lightContext.keyIntensity ?? lightContext.intensity ?? 1.0;
    const fillInt = normLight?.fillIntensity ?? lightContext.fillIntensity ?? 0.4;
    const rimInt = normLight?.rimIntensity ?? lightContext.rimIntensity ?? 0.0;
    const rimColor = normLight?.rimColor ?? lightContext.rimColor ?? '#93c5fd';
    const lightCol = normLight?.keyColor ?? lightContext.color ?? '#ffffff';
    const incidentAngle = normLight?.keyDirectionAngle ?? lightContext.angleDegrees ?? 45;
    const softSpread = normLight?.softnessSpread ?? lightContext.softnessSpread ?? 1.0;
    const contrastRatio = normLight?.contrastRatio ?? lightContext.contrastRatio ?? 1.5;
    const emissiveLightInt = normLight?.emissiveIntensity ?? lightContext.emissiveIntensity ?? 0.0;
    const surfaceBrightness = normLight?.surfaceBrightness ?? (keyInt * 0.5 + fillInt * 0.3 + 0.2);

    let background = '#3b82f6';
    let border: string | undefined = undefined;
    let borderRadius: string | undefined = undefined;
    let boxShadow: string | undefined = undefined;
    let filter: string | undefined = undefined;
    let opacity = 1.0;
    let backdropFilter: string | undefined = undefined;
    let specularShift = 0;
    let emissionIntensity = 0;
    let edgeBlurRadius = 0;

    if (isFlat) {
      // FLAT_GRAPHIC: pure flat color, zero gloss, zero emission bloom, crisp flat edges
      background = '#3b82f6';
      border = '2px solid #1d4ed8';
      boxShadow = 'none';
      filter = 'none';
      opacity = 1.0;
      emissionIntensity = 0;
      specularShift = 0;
      edgeBlurRadius = 0;
    } else {
      switch (material.category) {
        case 'METAL': {
          // Dynamic specular highlight rotation based on motion progress & light angle
          specularShift = Math.round((incidentAngle + progress * 90 + velocity * 45) % 360);
          const coreHighlight = lightCol.startsWith('#') ? lightCol : '#ffffff';
          const bandOffset = Math.round(15 * softSpread);
          background = `linear-gradient(${specularShift}deg, #9ca3af 0%, #e5e7eb ${Math.max(10, 35 - bandOffset)}%, ${coreHighlight} 50%, #f3f4f6 ${Math.min(90, 65 + bandOffset)}%, #6b7280 80%, #4b5563 100%)`;
          border = rimInt > 0 ? `1.5px solid ${rimColor}` : '1.5px solid rgba(255, 255, 255, 0.75)';
          const baseMetalShadow = '0 6px 16px rgba(0, 0, 0, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.9)';
          boxShadow = rimInt > 0
            ? `${baseMetalShadow}, inset 0 0 ${Math.round(10 * rimInt)}px ${rimColor}, 0 0 ${Math.round(8 * rimInt)}px ${rimColor}`
            : baseMetalShadow;
          filter = `contrast(${Math.round((1.0 + keyInt * 0.2 + (contrastRatio - 1) * 0.1) * 100) / 100}) brightness(${Math.round((0.65 + surfaceBrightness * 0.4) * 100) / 100})`;
          opacity = 1.0;
          emissionIntensity = 0;
          // RIGID: Zero squish under compression
          borderRadius = '50%';
          break;
        }

        case 'GLASS': {
          // Translucent refraction, subtle specular rim, frosted backdrop
          specularShift = Math.round((incidentAngle + progress * 40) % 360);
          background = `linear-gradient(${specularShift}deg, rgba(255, 255, 255, 0.22) 0%, rgba(200, 225, 255, 0.08) 50%, rgba(255, 255, 255, 0.18) 100%)`;
          border = rimInt > 0 ? `1.5px solid ${rimColor}` : '1.5px solid rgba(255, 255, 255, 0.55)';
          const baseGlassShadow = 'inset 0 0 18px rgba(255, 255, 255, 0.35), 0 8px 32px rgba(15, 23, 42, 0.3)';
          boxShadow = rimInt > 0
            ? `inset 0 0 ${Math.round(18 + rimInt * 12)}px ${rimColor}, 0 0 ${Math.round(rimInt * 16)}px ${rimColor}, 0 8px 32px rgba(15, 23, 42, 0.3)`
            : baseGlassShadow;
          backdropFilter = 'blur(10px)';
          filter = `brightness(${Math.round((0.75 + surfaceBrightness * 0.35) * 100) / 100})`;
          opacity = Math.max(0.45, Math.min(0.92, Math.round((0.82 * (1.0 - fillInt * 0.08)) * 100) / 100));
          emissionIntensity = 0;
          borderRadius = '50%';
          break;
        }

        case 'PLASMA': {
          // Radiant glowing emission core; velocity and emissive lighting increase emission intensity
          emissionIntensity = Math.round((1.4 + velocity * 1.6 + progress * 0.4 + emissiveLightInt * 0.8) * 100) / 100;
          const innerGlow = Math.round(18 * emissionIntensity);
          const midGlow = Math.round(45 * emissionIntensity);
          const outerGlow = Math.round(85 * emissionIntensity);

          background = 'radial-gradient(circle at 50% 50%, #ffffff 0%, #ff8a00 35%, #e11d48 70%, #7e22ce 100%)';
          border = '2px solid rgba(255, 215, 0, 0.9)';
          boxShadow = `0 0 ${innerGlow}px #ff6600, 0 0 ${midGlow}px #ff0055, 0 0 ${outerGlow}px #9333ea, inset 0 0 20px #ffffff`;
          filter = `drop-shadow(0 0 ${Math.round(20 * (1 + emissiveLightInt * 0.4))}px rgba(255, 100, 0, 0.8)) brightness(${Math.min(2.2, Math.round((1.05 + surfaceBrightness * 0.15 + emissionIntensity * 0.15) * 100) / 100)})`;
          opacity = 0.96;
          edgeBlurRadius = 4;
          borderRadius = '50%';
          break;
        }

        case 'ORGANIC': {
          // Viscoelastic soft body with subsurface scattering simulation
          // Deformation modulates border radius into squish / stretch
          if (deformFactor > 0.05 && Math.abs(compression) > 0.05) {
            const hRadius = Math.round(50 + compression * 20);
            const vRadius = Math.round(50 - compression * 20);
            borderRadius = `${hRadius}% ${100 - hRadius}% ${hRadius}% ${100 - hRadius}% / ${vRadius}% ${100 - vRadius}% ${vRadius}% ${100 - vRadius}%`;
          } else {
            borderRadius = '50%';
          }

          const radAngle = (incidentAngle * Math.PI) / 180;
          const centerX = Math.round(50 - Math.cos(radAngle) * 15);
          const centerY = Math.round(50 - Math.sin(radAngle) * 15);
          const highlightCol = lightCol.startsWith('#') ? lightCol : '#86efac';
          const shadowTerminator = contrastRatio >= 2.0 ? '#022c22' : '#065f46';

          background = `radial-gradient(ellipse at ${centerX}% ${centerY}%, ${highlightCol} 0%, #22c55e 35%, #15803d 70%, ${shadowTerminator} 100%)`;
          border = rimInt > 0 ? `2px solid ${rimColor}` : '2px solid rgba(187, 247, 208, 0.8)';
          const baseOrgShadow = 'inset 0 0 22px rgba(187, 247, 208, 0.45), 0 8px 24px rgba(6, 78, 59, 0.4)';
          boxShadow = rimInt > 0
            ? `${baseOrgShadow}, 0 0 ${Math.round(14 * rimInt)}px ${rimColor}`
            : baseOrgShadow;
          filter = `saturate(${Math.round((1.1 + keyInt * 0.1) * 100) / 100}) brightness(${Math.round((0.7 + surfaceBrightness * 0.3) * 100) / 100})`;
          opacity = 0.92;
          emissionIntensity = 0.1;
          break;
        }

        case 'ENERGY': {
          emissionIntensity = Math.round((1.8 + velocity * 1.5) * 100) / 100;
          background = 'radial-gradient(circle, #38bdf8 0%, #0284c7 45%, #1e1b4b 100%)';
          border = '2px solid #7dd3fc';
          boxShadow = `0 0 30px #38bdf8, 0 0 70px #0284c7, inset 0 0 20px #e0f2fe`;
          filter = 'brightness(1.3)';
          opacity = 0.95;
          borderRadius = '50%';
          break;
        }

        case 'SMOKE': {
          background = 'radial-gradient(circle, rgba(148, 163, 184, 0.6) 0%, rgba(71, 85, 105, 0.3) 60%, transparent 100%)';
          border = 'none';
          boxShadow = 'none';
          filter = 'blur(12px)';
          opacity = 0.55;
          edgeBlurRadius = 12;
          borderRadius = '50%';
          break;
        }

        case 'LIQUID': {
          specularShift = Math.round((incidentAngle + progress * 60) % 360);
          background = `linear-gradient(${specularShift}deg, #06b6d4 0%, #0284c7 50%, #0369a1 100%)`;
          border = '1px solid rgba(165, 243, 252, 0.7)';
          boxShadow = 'inset 0 0 16px rgba(165, 243, 252, 0.5), 0 6px 20px rgba(12, 74, 110, 0.4)';
          opacity = 0.88;
          borderRadius = '50%';
          break;
        }

        case 'STONE': {
          background = 'linear-gradient(145deg, #57534e 0%, #44403c 50%, #292524 100%)';
          border = '2px solid #78716c';
          boxShadow = '0 6px 14px rgba(0, 0, 0, 0.6)';
          filter = 'contrast(1.3)';
          opacity = 1.0;
          borderRadius = '16px';
          break;
        }

        case 'CELESTIAL': {
          emissionIntensity = 1.5;
          background = 'radial-gradient(circle, #fef08a 0%, #eab308 30%, #4338ca 75%, #0f172a 100%)';
          border = '2px solid #fef08a';
          boxShadow = '0 0 40px #facc15, 0 0 90px #6366f1, inset 0 0 25px #ffffff';
          filter = 'brightness(1.2)';
          opacity = 0.98;
          borderRadius = '50%';
          break;
        }

        default: {
          background = '#64748b';
          border = '1px solid #475569';
          opacity = 1.0;
          borderRadius = '50%';
          break;
        }
      }
    }

    const style: React.CSSProperties = {
      background,
      opacity,
      ...(border ? { border } : {}),
      ...(borderRadius ? { borderRadius } : {}),
      ...(boxShadow ? { boxShadow } : {}),
      ...(filter ? { filter } : {}),
      ...(backdropFilter ? { backdropFilter, WebkitBackdropFilter: backdropFilter } : {}),
      transition: 'none',
      boxSizing: 'border-box',
    };

    return {
      entityId,
      materialId: material.id,
      category: material.category,
      background,
      border,
      borderRadius,
      boxShadow,
      filter,
      opacity,
      backdropFilter,
      specularShift,
      emissionIntensity,
      edgeBlurRadius,
      isFlatGraphic: isFlat,
      style,
    };
  }

  /**
   * Safely merges spatial positioning styles (from SpatialRenderAdapter)
   * with material surface styling without overwriting spatial transform ownership.
   */
  public static mergeSpatialAndMaterialStyles(
    spatialStyle: React.CSSProperties,
    materialStyle: React.CSSProperties
  ): React.CSSProperties {
    return {
      ...materialStyle,
      ...spatialStyle, // Spatial retains left, top, zIndex, transform, transformStyle
      background: materialStyle.background,
      border: materialStyle.border,
      borderRadius: materialStyle.borderRadius ?? spatialStyle.borderRadius,
      boxShadow: materialStyle.boxShadow,
      filter: materialStyle.filter,
      opacity: materialStyle.opacity ?? spatialStyle.opacity,
      backdropFilter: materialStyle.backdropFilter,
    };
  }

  /**
   * Anti-Bypass Validator:
   * Inspects rendered element material styles against the expected material references.
   * Proves that material contracts are actively rendered into CSS/DOM styles rather
   * than left as passive metadata or collapsed to uniform defaults.
   */
  public static validateRenderExecution(
    rendered: RenderedMaterialStyle[],
    expectedMaterials: MaterialReference[],
    options?: {
      allowFlatGraphicFallback?: boolean;
    }
  ): MaterialRenderValidationReport {
    const violations: MaterialRenderValidationReport['violations'] = [];

    if (rendered.length === 0) {
      violations.push({
        code: 'MATERIAL_METADATA_ONLY_DETECTED',
        message: 'Renderer produced zero material elements from the Material registry.',
      });
      return { passed: false, violations };
    }

    // 1. Check for total material collapse (all rendered styles are visually identical)
    if (rendered.length >= 2) {
      const distinctCategories = new Set(rendered.map((r) => r.category));
      if (distinctCategories.size >= 2) {
        const first = rendered[0];
        const allIdentical = rendered.every(
          (r) =>
            r.background === first.background &&
            r.boxShadow === first.boxShadow &&
            r.filter === first.filter &&
            r.opacity === first.opacity
        );
        if (allIdentical) {
          violations.push({
            code: 'MATERIAL_COLLAPSE_DETECTED',
            message: `All ${rendered.length} rendered entities collapsed to identical visual styles despite possessing ${distinctCategories.size} distinct material categories.`,
          });
        }
      }
    }

    // 2. Per-material category verification
    for (const r of rendered) {
      const expected = expectedMaterials.find((m) => m.id === r.materialId || m.category === r.category);
      if (!expected) continue;

      if (expected.category === 'PLASMA') {
        if (!r.boxShadow || r.boxShadow === 'none' || r.emissionIntensity <= 0.2) {
          violations.push({
            code: 'MATERIAL_RUNTIME_IGNORED',
            message: `Entity "${r.entityId}" has PLASMA material but was rendered with non-emissive boxShadow="${r.boxShadow}" and emissionIntensity=${r.emissionIntensity}.`,
            entityId: r.entityId,
            materialId: r.materialId,
          });
        }
      }

      if (expected.category === 'METAL') {
        if (r.background && !r.background.includes('linear-gradient')) {
          violations.push({
            code: 'MATERIAL_RUNTIME_IGNORED',
            message: `Entity "${r.entityId}" has METAL material but was rendered without specular gradient reflection.`,
            entityId: r.entityId,
            materialId: r.materialId,
          });
        }
      }

      if (expected.category === 'GLASS') {
        if (r.opacity >= 0.99) {
          violations.push({
            code: 'MATERIAL_RUNTIME_IGNORED',
            message: `Entity "${r.entityId}" has GLASS material but was rendered fully opaque (opacity=${r.opacity}).`,
            entityId: r.entityId,
            materialId: r.materialId,
          });
        }
      }

      if (expected.category === 'FLAT_GRAPHIC') {
        if (r.boxShadow && r.boxShadow !== 'none') {
          violations.push({
            code: 'MATERIAL_RUNTIME_IGNORED',
            message: `Entity "${r.entityId}" has FLAT_GRAPHIC material but was rendered with non-flat boxShadow="${r.boxShadow}".`,
            entityId: r.entityId,
            materialId: r.materialId,
          });
        }
      }
    }

    // 3. Pairwise differentiation check between mandatory families
    for (let i = 0; i < rendered.length; i++) {
      for (let j = i + 1; j < rendered.length; j++) {
        const a = rendered[i];
        const b = rendered[j];
        if (a.category !== b.category) {
          const isIdentical =
            a.background === b.background &&
            a.boxShadow === b.boxShadow &&
            a.filter === b.filter &&
            a.opacity === b.opacity;

          if (isIdentical) {
            violations.push({
              code: 'MATERIAL_FAMILY_DIFFERENTIATION_MISSING',
              message: `Pairwise differentiation missing between "${a.entityId}" (${a.category}) and "${b.entityId}" (${b.category}): both rendered identical styles.`,
              entityId: a.entityId,
              materialId: a.materialId,
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
