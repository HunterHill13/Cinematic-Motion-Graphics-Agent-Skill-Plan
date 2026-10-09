/**
 * ============================================================================
 * PHASE 5D MATERIAL RUNTIME PROOF (REMOTION COMPOSITION)
 * ============================================================================
 * 
 * Demonstrates concrete runtime consumption of Phase 5B.1 MaterialReference &
 * Material Response Contracts:
 *   1. Material -> Surface Styling (Distinct CSS backgrounds, borders, shadows)
 *   2. Material -> Motion Response (METAL specular sweep vs PLASMA emission flare)
 *   3. Material -> Deformation Response (ORGANIC viscoelastic squish vs METAL rigidity)
 *   4. Material -> Material Swap (hero_transmutable transitions METAL -> PLASMA without losing identity)
 *   5. Controlled A/B: MATERIAL_AWARE vs MATERIAL_COLLAPSED
 * 
 * Strict Anti-Deception Doctrine:
 *   - Clean, deterministic mathematical styling (zero Math.random())
 *   - No Three.js, WebGL, external engines, Blender, camera moves, PBR shaders
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { MaterialRenderAdapter, RenderedMaterialStyle } from './materialRenderAdapter';
import { MaterialReference, MaterialCategory } from './materialSchema';

export interface MaterialRuntimeProofProps {
  mode?: 'MATERIAL_AWARE' | 'MATERIAL_COLLAPSED';
}

export const Phase5DMaterialRuntimeProof: React.FC<MaterialRuntimeProofProps> = ({
  mode = 'MATERIAL_AWARE',
}) => {
  const frame = useCurrentFrame();
  const isCollapsed = mode === 'MATERIAL_COLLAPSED';

  // --------------------------------------------------------------------------
  // 1. MATERIAL REGISTRY (5 MANDATORY FAMILIES)
  // --------------------------------------------------------------------------
  const materials: Record<string, MaterialReference> = {
    metal: {
      id: 'mat_metal_ref',
      name: 'Polished Titanium Specular',
      category: 'METAL',
      surfaceResponse: 'REFLECTIVE',
      edgeResponse: 'STABLE',
      deformationResponse: 'RIGID',
      lightResponse: 'SPECULAR',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'OPAQUE',
      textureCharacter: 'SMOOTH',
      motionResponses: {},
    },
    glass: {
      id: 'mat_glass_ref',
      name: 'Borosilicate Refractive Glass',
      category: 'GLASS',
      surfaceResponse: 'TRANSLUCENT',
      edgeResponse: 'TRANSLUCENT',
      deformationResponse: 'BRITTLE',
      lightResponse: 'REFRACTIVE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'TRANSLUCENT',
      textureCharacter: 'SMOOTH',
      motionResponses: {},
    },
    plasma: {
      id: 'mat_plasma_ref',
      name: 'Solar Corona Emissive Plasma',
      category: 'PLASMA',
      surfaceResponse: 'GLOSSY',
      edgeResponse: 'GLOWING',
      deformationResponse: 'FLUID',
      lightResponse: 'EMISSIVE',
      emission: 'HIGHLY_EMISSIVE',
      opacityBehavior: 'DENSITY_DRIVEN',
      textureCharacter: 'FLUID',
      motionResponses: {},
    },
    organic: {
      id: 'mat_organic_ref',
      name: 'Viscoelastic Cellular Membrane',
      category: 'ORGANIC',
      surfaceResponse: 'SOFT',
      edgeResponse: 'SOFT',
      deformationResponse: 'VISCOELASTIC',
      lightResponse: 'SUBSURFACE',
      emission: 'WEAKLY_EMISSIVE',
      opacityBehavior: 'TRANSLUCENT',
      textureCharacter: 'MICROTEXTURED',
      motionResponses: {},
    },
    flat: {
      id: 'mat_flat_ref',
      name: 'Technical Blueprint Graphic',
      category: 'FLAT_GRAPHIC',
      surfaceResponse: 'DIFFUSE',
      edgeResponse: 'STABLE',
      deformationResponse: 'RIGID',
      lightResponse: 'DIFFUSE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'OPAQUE',
      textureCharacter: 'SMOOTH',
      motionResponses: {},
    },
  };

  // --------------------------------------------------------------------------
  // 2. TIMELINE PHASES & DYNAMIC STATES
  // --------------------------------------------------------------------------
  let phaseName = 'BASELINE (0-29)';
  let motionVelocity = 0;
  let motionProgress = 0;
  let compressionFactor = 0;
  let heroActiveCategory: MaterialCategory = 'METAL';

  if (frame < 30) {
    phaseName = 'BASELINE COMPARISON';
  } else if (frame >= 30 && frame < 70) {
    phaseName = 'MOTION RESPONSE (VELOCITY)';
    const t = (frame - 30) / 39;
    motionProgress = t;
    // Bell curve velocity pulse peaking at t = 0.5
    motionVelocity = Math.sin(t * Math.PI) * 1.5;
  } else if (frame >= 70 && frame < 110) {
    phaseName = 'DEFORMATION RESPONSE (COMPRESSION)';
    const t = (frame - 70) / 39;
    // Compression pulse squishing then rebounding
    compressionFactor = Math.sin(t * Math.PI) * 0.75;
  } else {
    phaseName = 'MATERIAL SWAP (IDENTITY CONTINUITY)';
    const swapT = Math.min(1, (frame - 110) / 40);
    // Transmutable hero converts from METAL to PLASMA
    heroActiveCategory = swapT > 0.5 ? 'PLASMA' : 'METAL';
    motionVelocity = swapT * 1.0;
  }

  // --------------------------------------------------------------------------
  // 3. RESOLVE ELEMENT STYLES
  // --------------------------------------------------------------------------
  const baseEntities = [
    { id: 'ent_metal', name: 'METAL', x: 260, y: 380, mat: materials.metal },
    { id: 'ent_glass', name: 'GLASS', x: 580, y: 380, mat: materials.glass },
    { id: 'ent_plasma', name: 'PLASMA', x: 960, y: 380, mat: materials.plasma },
    { id: 'ent_organic', name: 'ORGANIC', x: 1340, y: 380, mat: materials.organic },
    { id: 'ent_flat', name: 'FLAT_GRAPHIC', x: 1660, y: 380, mat: materials.flat },
  ];

  // Resolve 5 base entities
  const resolvedBase = baseEntities.map((ent) => {
    if (isCollapsed) {
      // Intentionally collapsed fallback: flat uniform gray box
      return {
        entityId: ent.id,
        materialId: 'collapsed_fallback',
        category: ent.mat.category,
        background: '#475569',
        border: '1px solid #334155',
        borderRadius: '50%',
        boxShadow: 'none',
        filter: 'none',
        opacity: 1.0,
        specularShift: 0,
        emissionIntensity: 0,
        edgeBlurRadius: 0,
        isFlatGraphic: true,
        style: {
          background: '#475569',
          border: '1px solid #334155',
          borderRadius: '50%',
          boxShadow: 'none',
          filter: 'none',
          opacity: 1.0,
        } as React.CSSProperties,
      };
    }

    return MaterialRenderAdapter.resolveMaterialStyle(
      ent.mat,
      ent.id,
      { velocity: motionVelocity, progress: motionProgress },
      { compression: compressionFactor, factor: Math.abs(compressionFactor) },
      { angleDegrees: 45 + motionProgress * 90 }
    );
  });

  // Hero transmutable entity (demonstrates material swap)
  const heroMaterial = heroActiveCategory === 'PLASMA' ? materials.plasma : materials.metal;
  const resolvedHero = isCollapsed
    ? ({
        entityId: 'hero_transmutable',
        materialId: 'collapsed_fallback',
        category: heroActiveCategory,
        background: '#475569',
        border: '1px solid #334155',
        borderRadius: '50%',
        boxShadow: 'none',
        filter: 'none',
        opacity: 1.0,
        specularShift: 0,
        emissionIntensity: 0,
        edgeBlurRadius: 0,
        isFlatGraphic: true,
        style: {
          background: '#475569',
          border: '1px solid #334155',
          borderRadius: '50%',
          boxShadow: 'none',
          filter: 'none',
          opacity: 1.0,
        } as React.CSSProperties,
      } as RenderedMaterialStyle)
    : MaterialRenderAdapter.resolveMaterialStyle(
        heroMaterial,
        'hero_transmutable',
        { velocity: motionVelocity, progress: motionProgress },
        { compression: compressionFactor, factor: Math.abs(compressionFactor) },
        { angleDegrees: 45 + frame }
      );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0e17',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background Architectural Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Diagnostic Header HUD */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase' }}>
            Phase 5D Material Runtime Proof
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4, color: '#f1f5f9' }}>
            {isCollapsed ? 'COLLAPSED BASELINE (METADATA-ONLY FAKE)' : 'MATERIAL-AWARE RUNTIME RENDER'}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>FRAME: {frame} / 180</div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginTop: 4,
              color: isCollapsed ? '#ef4444' : '#10b981',
              backgroundColor: isCollapsed ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              padding: '4px 12px',
              borderRadius: 4,
              display: 'inline-block',
            }}
          >
            PHASE: {phaseName}
          </div>
        </div>
      </div>

      {/* Row 1: 5 Mandatory Material Families Side-by-Side */}
      <div
        style={{
          position: 'absolute',
          top: 170,
          left: 60,
          fontSize: 14,
          letterSpacing: '0.1em',
          color: '#64748b',
          textTransform: 'uppercase',
        }}
      >
        Mandatory Material Families (Identical 160px Base Geometry)
      </div>

      {baseEntities.map((ent, idx) => {
        const resolved = resolvedBase[idx];
        return (
          <div
            key={ent.id}
            style={{
              position: 'absolute',
              left: ent.x,
              top: ent.y,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* The Rendered Material Entity */}
            <div
              style={{
                width: 160,
                height: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...resolved.style,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: ent.mat.category === 'GLASS' ? '#0f172a' : '#ffffff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                }}
              >
                {ent.mat.category}
              </div>
            </div>

            {/* Label and telemetry */}
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#f8fafc' }}>{ent.name}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                {isCollapsed ? 'COLLAPSED' : ent.mat.surfaceResponse}
              </div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
                Emission: {resolved.emissionIntensity.toFixed(1)} | Spec: {resolved.specularShift}°
              </div>
            </div>
          </div>
        );
      })}

      {/* Row 2: Hero Identity Transmutation (Material Swap Demo) */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.1em',
            color: '#64748b',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Identity Continuity & Material Swap (hero_core: {heroActiveCategory})
        </div>

        <div
          style={{
            width: 180,
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...resolvedHero.style,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            HERO CORE
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>
          {frame >= 110
            ? 'MATERIAL SWAP ACTIVE: METAL -> PLASMA (Identity preserved, Surface transmuted)'
            : 'BASELINE HERO: Polished Specular METAL'}
        </div>
      </div>

      {/* Footer telemetry status bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: '#475569',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: 12,
        }}
      >
        <div>Runtime Adapter: MaterialRenderAdapter v1.0</div>
        <div>Velocity: {motionVelocity.toFixed(2)} | Compression: {compressionFactor.toFixed(2)}</div>
        <div>Anti-Metadata Proof: Deterministic Remotion CSS Integration</div>
      </div>
    </AbsoluteFill>
  );
};
