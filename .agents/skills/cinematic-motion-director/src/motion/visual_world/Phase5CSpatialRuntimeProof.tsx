/**
 * ============================================================================
 * PHASE 5C.1 SPATIAL RUNTIME PROOF (REMOTION COMPOSITION)
 * ============================================================================
 * 
 * Demonstrates concrete runtime consumption of Phase 5C SpatialDepthContract:
 *   1. Depth -> Apparent Scale (baseScale / (1 + z * 0.75))
 *   2. Depth -> Layer Ordering & Physical Occlusion (Foreground frames Hero)
 *   3. Depth -> TOWARD_VIEWER dynamic apparent scale expansion
 *   4. Depth -> AWAY_FROM_VIEWER dynamic apparent scale shrinkage
 *   5. Depth -> MULTI_DEPTH_CONVERGENCE multi-plane fragment convergence
 *   6. Controlled A/B: Real Spatial vs Depth Collapsed
 * 
 * Strict Zero-Decorations Doctrine:
 *   - Simple solid geometric entities (rectangles, circles, guide rails)
 *   - No particles, no glow, no fake CSS blur/drop-shadow, no camera moves
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { SpatialRenderAdapter } from './spatialRenderAdapter';
import {
  SpatialDepthContract,
  EntitySpatialPlacement,
  SpatialMotionResponse,
} from './depthSchema';

export interface SpatialRuntimeProofProps {
  mode?: 'REAL_SPATIAL' | 'DEPTH_COLLAPSED';
}

export const Phase5CSpatialRuntimeProof: React.FC<SpatialRuntimeProofProps> = ({
  mode = 'REAL_SPATIAL',
}) => {
  const frame = useCurrentFrame();
  const isCollapsed = mode === 'DEPTH_COLLAPSED';

  // --------------------------------------------------------------------------
  // 1. SPATIAL CONTRACT SPECIFICATION
  // --------------------------------------------------------------------------
  // Scene A: Real Spatial (Distinct z depth planes)
  // Scene B: Depth Collapsed (All entities collapsed to z = 0.50)
  const fgZ = isCollapsed ? 0.50 : 0.10;
  const heroZ = 0.50;
  const bgZ = isCollapsed ? 0.50 : 0.75;
  const deepBgZ = isCollapsed ? 0.50 : 0.90;

  // Base spatial placements
  const placements: EntitySpatialPlacement[] = [
    {
      entityId: 'deep_bg_canvas',
      depthBand: 'DEEP_BACKGROUND',
      transform: { x: 0.0, y: 0.0, z: deepBgZ, scale: 1.6 },
      semanticSpatialRole: 'Deep background coordinate plane',
    },
    {
      entityId: 'bg_datum_monolith',
      depthBand: 'BACKGROUND',
      transform: { x: 0.45, y: -0.25, z: bgZ, scale: 1.0 },
      semanticSpatialRole: 'Posterior datum structure providing spatial depth reference',
    },
    {
      entityId: 'hero_core',
      depthBand: 'HERO_PLANE',
      transform: { x: 0.0, y: 0.0, z: heroZ, scale: 1.0 },
      semanticSpatialRole: 'Primary persistent focal hero entity',
    },
    {
      entityId: 'foreground_frame',
      depthBand: 'FOREGROUND',
      transform: { x: -0.20, y: -0.15, z: fgZ, scale: 0.8 },
      semanticSpatialRole: 'Anterior framing geometry physically occluding hero perimeter',
    },
  ];

  // --------------------------------------------------------------------------
  // 2. TIMELINE PHASES & DYNAMIC Z-MOTION
  // --------------------------------------------------------------------------
  let dynamicHeroZ = heroZ;
  let frag1Z = isCollapsed ? 0.50 : 0.15;
  let frag2Z = 0.50;
  let frag3Z = isCollapsed ? 0.50 : 0.85;
  let fragProgress = 0;

  if (frame >= 30 && frame < 80) {
    // Phase 2: TOWARD_VIEWER motion (frames 30 - 79)
    const t = (frame - 30) / 49;
    dynamicHeroZ = isCollapsed ? 0.50 : interpolate(t, [0, 1], [0.50, 0.12]);
  } else if (frame >= 80 && frame < 130) {
    // Phase 3: AWAY_FROM_VIEWER motion (frames 80 - 129)
    const t = (frame - 80) / 49;
    dynamicHeroZ = isCollapsed ? 0.50 : interpolate(t, [0, 1], [0.12, 0.85]);
  } else if (frame >= 130) {
    // Phase 4: MULTI_DEPTH_CONVERGENCE (frames 130 - 180)
    fragProgress = Math.min(1, (frame - 130) / 49);
    if (!isCollapsed) {
      frag1Z = interpolate(fragProgress, [0, 1], [0.15, 0.50]);
      frag2Z = 0.50;
      frag3Z = interpolate(fragProgress, [0, 1], [0.85, 0.50]);
    }
  }

  // --------------------------------------------------------------------------
  // 3. RESOLVE SPATIAL ELEMENTS THROUGH SPATIAL RENDER ADAPTER
  // --------------------------------------------------------------------------
  const deepBgEl = SpatialRenderAdapter.resolveElement(placements[0], 1920, 1080, deepBgZ);
  const bgEl = SpatialRenderAdapter.resolveElement(placements[1], 1920, 1080, bgZ);
  const heroEl = SpatialRenderAdapter.resolveElement(placements[2], 1920, 1080, dynamicHeroZ);
  const fgEl = SpatialRenderAdapter.resolveElement(placements[3], 1920, 1080, fgZ);

  // Convergence fragments for Phase 4
  const frag1Pos = interpolate(fragProgress, [0, 1], [-400, 0]);
  const frag3Pos = interpolate(fragProgress, [0, 1], [400, 0]);

  const frag1Scale = SpatialRenderAdapter.calculateApparentScale(0.5, frag1Z);
  const frag2Scale = SpatialRenderAdapter.calculateApparentScale(0.5, frag2Z);
  const frag3Scale = SpatialRenderAdapter.calculateApparentScale(0.5, frag3Z);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0A0E17',
        overflow: 'hidden',
        perspective: 1200,
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* HUD Telemetry Benchmark */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 40,
          color: '#64748B',
          fontFamily: 'monospace',
          fontSize: 16,
          letterSpacing: 2,
          zIndex: 9999,
        }}
      >
        <div>[PHASE 5C.1 SPATIAL RUNTIME PROOF]</div>
        <div>MODE: {mode}</div>
        <div>FRAME: {frame} / 180</div>
        <div>HERO Z: {dynamicHeroZ.toFixed(3)} | APPARENT SCALE: {heroEl.apparentScale.toFixed(3)}</div>
        <div>FG Z: {fgEl.numericZ.toFixed(3)} (Z-INDEX: {fgEl.zIndex})</div>
        <div>BG Z: {bgEl.numericZ.toFixed(3)} (Z-INDEX: {bgEl.zIndex})</div>
      </div>

      {/* 1. DEEP BACKGROUND CANVAS (Large coordinate grid plane) */}
      <div
        data-entity-id="deep_bg_canvas"
        style={{
          ...deepBgEl.style,
          width: 900,
          height: 600,
          border: '1px dashed #1E293B',
          backgroundColor: '#0F172A',
        }}
      >
        <div style={{ color: '#334155', padding: 20, fontFamily: 'monospace' }}>
          DEEP BACKGROUND (z={deepBgEl.numericZ.toFixed(2)}, scale={deepBgEl.apparentScale.toFixed(2)})
        </div>
      </div>

      {/* 2. BACKGROUND DATUM MONOLITH */}
      <div
        data-entity-id="bg_datum_monolith"
        style={{
          ...bgEl.style,
          width: 320,
          height: 380,
          backgroundColor: '#1E293B',
          border: '2px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94A3B8',
          fontFamily: 'monospace',
          fontWeight: 'bold',
        }}
      >
        BACKGROUND
      </div>

      {/* 3. HERO ENTITY (Central Focal Geometric Box) */}
      {frame < 130 ? (
        <div
          data-entity-id="hero_core"
          style={{
            ...heroEl.style,
            width: 340,
            height: 340,
            backgroundColor: '#0284C7',
            border: '4px solid #38BDF8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          <div>HERO CORE</div>
          <div style={{ fontSize: 13, marginTop: 8, opacity: 0.85 }}>
            z={dynamicHeroZ.toFixed(2)} | s={heroEl.apparentScale.toFixed(3)}
          </div>
        </div>
      ) : (
        /* Phase 4: Multi-depth converging fragments */
        <>
          {/* Fragment 1 (Anterior / Foreground plane) */}
          <div
            data-entity-id="frag_anterior"
            style={{
              position: 'absolute',
              left: 1920 / 2 + frag1Pos,
              top: 1080 / 2 - 80,
              zIndex: Math.round((1 - frag1Z) * 1000),
              transform: `translate(-50%, -50%) scale(${frag1Scale})`,
              width: 140,
              height: 140,
              backgroundColor: '#0EA5E9',
              border: '2px solid #7DD3FC',
              color: '#FFFFFF',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            FRAG 1 (z={frag1Z.toFixed(2)})
          </div>

          {/* Fragment 2 (Midground plane) */}
          <div
            data-entity-id="frag_mid"
            style={{
              position: 'absolute',
              left: 1920 / 2,
              top: 1080 / 2 + 80,
              zIndex: Math.round((1 - frag2Z) * 1000),
              transform: `translate(-50%, -50%) scale(${frag2Scale})`,
              width: 140,
              height: 140,
              backgroundColor: '#0284C7',
              border: '2px solid #38BDF8',
              color: '#FFFFFF',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            FRAG 2 (z={frag2Z.toFixed(2)})
          </div>

          {/* Fragment 3 (Posterior / Background plane) */}
          <div
            data-entity-id="frag_posterior"
            style={{
              position: 'absolute',
              left: 1920 / 2 + frag3Pos,
              top: 1080 / 2 - 80,
              zIndex: Math.round((1 - frag3Z) * 1000),
              transform: `translate(-50%, -50%) scale(${frag3Scale})`,
              width: 140,
              height: 140,
              backgroundColor: '#0369A1',
              border: '2px solid #0284C7',
              color: '#FFFFFF',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            FRAG 3 (z={frag3Z.toFixed(2)})
          </div>
        </>
      )}

      {/* 4. FOREGROUND FRAMING ELEMENT (Anterior guide frame occluding upper-left corner of Hero) */}
      <div
        data-entity-id="foreground_frame"
        style={{
          ...fgEl.style,
          width: 260,
          height: 260,
          backgroundColor: '#F59E0B',
          border: '4px solid #FBBF24',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        <div>FOREGROUND FRAME</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          z={fgEl.numericZ.toFixed(2)} | zIndex={fgEl.zIndex}
        </div>
      </div>
    </AbsoluteFill>
  );
};
