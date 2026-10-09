/**
 * ============================================================================
 * CINEMATIC BENCHMARK SCENE (REMOTION COMPOSITION)
 * ============================================================================
 * 
 * Master Remotion component rendering the full 720-frame (24.0s @ 30 FPS)
 * benchmark sequence: "Cellular Collapse → Fragmentation → Reorganization"
 * 
 * Supports Fail-Closed Ablation Modes:
 *   - FULL_SYSTEM (Production Benchmark)
 *   - NO_SECONDARY (Secondary motion, temporal lag, and follow-through collapsed)
 *   - NO_DEPTH (Depth collapsed: all z=0.5, no differential parallax)
 *   - NO_CAMERA (Camera static: zoom=1, x=0, y=0, orbit=0)
 *   - NO_MATERIAL (Material collapsed: flat monochrome graphic #94a3b8)
 *   - NO_LIGHTING (Lighting collapsed: flat neutral ambient white #ffffff)
 *   - NO_CARRY (Momentum carry collapsed: velocity clamped to 0 at handoff)
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame } from 'remotion';
import {
  BENCHMARK_TOTAL_FRAMES,
  BENCHMARK_WIDTH,
  BENCHMARK_HEIGHT,
  BENCHMARK_MATERIALS,
  BENCHMARK_LIGHTING,
} from './cinematicBenchmarkConfig';
import {
  CinematicBenchmarkSceneGraph,
  BenchmarkAblationMode,
  BenchmarkFrameData,
} from './cinematicBenchmarkSceneGraph';
import {
  CinematicCameraAdapter,
  MaterialRenderAdapter,
  LightingRenderAdapter,
  NormalizedLightingState,
  RenderedCameraProjectedElement,
  EntitySpatialPlacement,
  DepthBand,
} from '../visual_world';

export interface CinematicBenchmarkSceneProps {
  mode?: BenchmarkAblationMode;
}

export const CinematicBenchmarkScene: React.FC<CinematicBenchmarkSceneProps> = ({
  mode = 'FULL_SYSTEM',
}) => {
  const frame = useCurrentFrame();

  // 1. Evaluate Scene Graph State at frame t
  const frameData: BenchmarkFrameData = CinematicBenchmarkSceneGraph.evaluateFrame(
    frame,
    mode
  );
  const { camera, entities } = frameData;

  // 2. Resolve Lighting State
  const isNoLighting = mode === 'NO_LIGHTING';
  const lightingState: NormalizedLightingState = isNoLighting
    ? {
        keyIntensity: 0.0,
        keyDirectionAngle: 0,
        keyColor: '#ffffff',
        fillIntensity: 0.0,
        fillColor: '#ffffff',
        rimIntensity: 0.0,
        rimDirectionAngle: 0,
        rimColor: '#ffffff',
        ambientIntensity: 1.0,
        ambientColor: '#ffffff',
        softness: 'VERY_SOFT',
        softnessSpread: 1.0,
        contrastRatio: 1.0,
        emissiveIntensity: 0.0,
        emissiveColor: '#ffffff',
        highlightStrength: 0.0,
        edgeContrast: 0.0,
        surfaceBrightness: 1.0,
      }
    : LightingRenderAdapter.normalizeContract(BENCHMARK_LIGHTING);

  // 3. Resolve Material Styles
  const isNoMaterial = mode === 'NO_MATERIAL';

  const resolveStyle = (
    materialId: string,
    entityId: string,
    motionV: number = 0,
    deformFactor: number = 0,
    compression: number = 0
  ) => {
    if (isNoMaterial) {
      return {
        background: '#64748b',
        border: '1px solid #475569',
        boxShadow: 'none',
        filter: 'none',
        opacity: 0.85,
        borderRadius: '50%',
      } as React.CSSProperties;
    }

    const mat = BENCHMARK_MATERIALS[materialId] || BENCHMARK_MATERIALS['mat_organic_membrane'];
    const res = MaterialRenderAdapter.resolveMaterialStyle(
      mat,
      entityId,
      { velocity: motionV, progress: frame / BENCHMARK_TOTAL_FRAMES },
      { factor: deformFactor, compression },
      { normalizedLighting: lightingState }
    );
    return res.style;
  };

  // 4. Project Entities to Camera Viewport
  const projectEntity = (
    entityId: string,
    rawX: number,
    rawY: number,
    rawZ: number
  ): RenderedCameraProjectedElement => {
    const isNoDepth = mode === 'NO_DEPTH';
    const effectiveZ = isNoDepth ? 0.5 : rawZ;

    let band: DepthBand = 'HERO_PLANE';
    if (effectiveZ < 0.25) band = 'FOREGROUND';
    else if (effectiveZ < 0.40) band = 'MIDGROUND';
    else if (effectiveZ > 0.80) band = 'DEEP_BACKGROUND';
    else if (effectiveZ > 0.60) band = 'BACKGROUND';

    const basePlacement: EntitySpatialPlacement = {
      entityId,
      depthBand: band,
      transform: {
        x: rawX / (BENCHMARK_WIDTH * 0.5),
        y: rawY / (BENCHMARK_HEIGHT * 0.5),
        z: effectiveZ,
        scale: 1.0,
      },
      semanticSpatialRole: `Spatial actor ${entityId}`,
    };

    return CinematicCameraAdapter.projectElement(
      basePlacement,
      camera,
      BENCHMARK_WIDTH,
      BENCHMARK_HEIGHT
    );
  };

  const heroCell = entities['hero_cell'];
  const nucleus = entities['nucleus_core'];
  const extForce = entities['external_force'];
  const vesicles = entities['vesicle_fragments'];
  const filaments = entities['matrix_filaments'];
  const floaters = entities['foreground_floaters'];

  const heroProj = projectEntity('hero_cell', heroCell.x, heroCell.y, heroCell.z);
  const nucleusProj = projectEntity('nucleus_core', nucleus.x, nucleus.y, nucleus.z);
  const forceProj = projectEntity('external_force', extForce.x, extForce.y, extForce.z);
  const vesiclesProj = projectEntity('vesicle_fragments', vesicles.x, vesicles.y, vesicles.z);
  const filamentsProj = projectEntity('matrix_filaments', filaments.x, filaments.y, filaments.z);
  const floatersProj = projectEntity('foreground_floaters', floaters.x, floaters.y, floaters.z);

  // SVG Deformation Path for Hero Cell
  const baseRadius = 140;
  const deform = heroCell.deformationFactor;
  const tension = heroCell.tensionFactor;

  // Elastic organic membrane contour
  const rTop = baseRadius * (1.0 + deform * 0.15 - tension * 0.2);
  const rBottom = baseRadius * (1.0 - deform * 0.1 + tension * 0.1);
  const rLeft = baseRadius * (1.0 - deform * 0.25 - tension * 0.15);
  const rRight = baseRadius * (1.0 + deform * 0.35 + tension * 0.2);

  const heroPath = `
    M 0 ${-rTop}
    C ${rRight * 0.65} ${-rTop * 0.9}, ${rRight} ${-rTop * 0.3}, ${rRight} 0
    C ${rRight} ${rBottom * 0.4}, ${rRight * 0.6} ${rBottom}, 0 ${rBottom}
    C ${-rLeft * 0.6} ${rBottom}, ${-rLeft} ${rBottom * 0.4}, ${-rLeft} 0
    C ${-rLeft} ${-rTop * 0.4}, ${-rLeft * 0.6} ${-rTop * 0.9}, 0 ${-rTop}
    Z
  `;

  // Compute depth blur for matrix and floaters
  const filamentBlur = mode === 'NO_DEPTH' ? 0 : Math.round(filamentsProj.effectiveZ * 6);
  const floaterBlur = mode === 'NO_DEPTH' ? 0 : 4;

  return (
    <div
      style={{
        width: BENCHMARK_WIDTH,
        height: BENCHMARK_HEIGHT,
        backgroundColor: '#030712',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. DEEP BACKGROUND MATRIX (COLLAGEN FILAMENTS - z = 0.88)          */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          position: 'absolute',
          left: filamentsProj.pixelX,
          top: filamentsProj.pixelY,
          width: BENCHMARK_WIDTH,
          height: BENCHMARK_HEIGHT,
          transform: `scale(${filamentsProj.apparentScale})`,
          filter: `blur(${filamentBlur}px)`,
          zIndex: filamentsProj.zIndex,
          pointerEvents: 'none',
          opacity: filaments.opacity,
        }}
      >
        <svg width={BENCHMARK_WIDTH} height={BENCHMARK_HEIGHT}>
          <defs>
            <linearGradient id="fiberGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#312e81" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="fiberGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#1e293b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Intersecting microscopic matrix collagen scaffolding strands */}
          <path
            d="M -200 150 Q 400 450 1100 200 T 2200 650"
            fill="none"
            stroke="url(#fiberGrad1)"
            strokeWidth="32"
          />
          <path
            d="M 100 950 Q 800 600 1300 850 T 2100 350"
            fill="none"
            stroke="url(#fiberGrad1)"
            strokeWidth="24"
          />
          <path
            d="M 600 -100 Q 950 500 850 1200"
            fill="none"
            stroke="url(#fiberGrad2)"
            strokeWidth="48"
          />
          <path
            d="M 1400 -50 Q 1200 550 1600 1150"
            fill="none"
            stroke="url(#fiberGrad2)"
            strokeWidth="36"
          />
          {/* Micro structural nodes */}
          <circle cx="950" cy="500" r="18" fill="#1e1b4b" opacity="0.6" />
          <circle cx="1300" cy="850" r="14" fill="#1e1b4b" opacity="0.5" />
          <circle cx="400" cy="450" r="12" fill="#1e1b4b" opacity="0.4" />
        </svg>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MIDGROUND COMPRESSIVE ENERGY WAVEFRONT (z = 0.32)               */}
      {/* ------------------------------------------------------------------ */}
      {extForce.opacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: forceProj.pixelX,
            top: forceProj.pixelY,
            transform: `translate(-50%, -50%) rotate(${extForce.rotationDeg}deg) scale(${forceProj.apparentScale * extForce.scaleX}, ${forceProj.apparentScale * extForce.scaleY})`,
            zIndex: forceProj.zIndex,
            opacity: extForce.opacity,
            pointerEvents: 'none',
          }}
        >
          <svg width="450" height="350" viewBox="-225 -175 450 350">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#818cf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M -180 -120 Q 0 -60 60 0 Q 0 60 -180 120"
              fill="none"
              stroke="url(#waveGrad)"
              strokeWidth="28"
              strokeLinecap="round"
              filter={isNoMaterial ? undefined : 'drop-shadow(0 0 24px #38bdf8)'}
            />
            <path
              d="M -140 -80 Q 20 -40 75 0 Q 20 40 -140 80"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 3. HERO CELL & MEMBRANE (z = 0.45)                                 */}
      {/* ------------------------------------------------------------------ */}
      {heroCell.opacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: heroProj.pixelX,
            top: heroProj.pixelY,
            transform: `translate(-50%, -50%) rotate(${heroCell.rotationDeg}deg) scale(${heroProj.apparentScale * heroCell.scaleX}, ${heroProj.apparentScale * heroCell.scaleY})`,
            zIndex: heroProj.zIndex,
            opacity: heroCell.opacity,
            pointerEvents: 'none',
          }}
        >
          <svg width="400" height="400" viewBox="-200 -200 400 400">
            <defs>
              <radialGradient id="membraneGrad" cx="35%" cy="35%" r="70%">
                <stop offset="0%" stopColor={isNoMaterial ? '#94a3b8' : '#0369a1'} stopOpacity="0.85" />
                <stop offset="60%" stopColor={isNoMaterial ? '#64748b' : '#0c4a6e'} stopOpacity="0.9" />
                <stop offset="90%" stopColor={isNoMaterial ? '#475569' : '#082f49'} stopOpacity="0.95" />
                <stop offset="100%" stopColor={isNoMaterial ? '#334155' : (tension > 0.4 ? '#f43f5e' : '#38bdf8')} stopOpacity="1.0" />
              </radialGradient>
            </defs>
            <path
              d={heroPath}
              fill="url(#membraneGrad)"
              stroke={isNoMaterial ? '#cbd5e1' : (tension > 0.4 ? '#fb7185' : '#38bdf8')}
              strokeWidth={tension > 0.4 ? 7 : 4}
              filter={isNoMaterial ? undefined : (tension > 0.4 ? 'drop-shadow(0 0 18px #f43f5e)' : 'drop-shadow(0 0 14px #0284c7)')}
            />
          </svg>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. SPLIT DAUGHTER FRAGMENTS (Active in Shots 3, 4, 5, 6, 7)         */}
      {/* ------------------------------------------------------------------ */}
      {heroCell.subEntities?.map((sub) => {
        const subProj = projectEntity(sub.id, sub.x, sub.y, sub.z);
        const isAlpha = sub.id === 'daughter_alpha';
        return (
          <div
            key={sub.id}
            style={{
              position: 'absolute',
              left: subProj.pixelX,
              top: subProj.pixelY,
              transform: `translate(-50%, -50%) scale(${subProj.apparentScale * sub.scale})`,
              zIndex: subProj.zIndex,
              opacity: sub.opacity,
              pointerEvents: 'none',
            }}
          >
            <svg width="280" height="280" viewBox="-140 -140 280 280">
              <defs>
                <radialGradient id={`daughterGrad_${sub.id}`} cx="35%" cy="35%" r="70%">
                  <stop offset="0%" stopColor={isAlpha ? '#38bdf8' : '#818cf8'} stopOpacity="0.9" />
                  <stop offset="70%" stopColor={isAlpha ? '#0284c7' : '#4f46e5'} stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
                </radialGradient>
              </defs>
              <circle
                cx="0"
                cy="0"
                r="85"
                fill={`url(#daughterGrad_${sub.id})`}
                stroke={isAlpha ? '#7dd3fc' : '#c7d2fe'}
                strokeWidth="4"
                filter={isNoMaterial ? undefined : (isAlpha ? 'drop-shadow(0 0 16px #38bdf8)' : 'drop-shadow(0 0 16px #818cf8)')}
              />
              {/* Internal glowing mini-core */}
              <circle
                cx="0"
                cy="0"
                r="32"
                fill="#ffffff"
                opacity="0.85"
                filter={isNoMaterial ? undefined : 'blur(4px)'}
              />
            </svg>
          </div>
        );
      })}

      {/* ------------------------------------------------------------------ */}
      {/* 5. RADIANT PLASMA NUCLEUS (z = 0.48)                               */}
      {/* ------------------------------------------------------------------ */}
      {nucleus.opacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: nucleusProj.pixelX,
            top: nucleusProj.pixelY,
            transform: `translate(-50%, -50%) rotate(${nucleus.rotationDeg}deg) scale(${nucleusProj.apparentScale * nucleus.scaleX}, ${nucleusProj.apparentScale * nucleus.scaleY})`,
            zIndex: nucleusProj.zIndex,
            opacity: nucleus.opacity,
            pointerEvents: 'none',
          }}
        >
          <svg width="240" height="240" viewBox="-120 -120 240 240">
            <defs>
              <radialGradient id="nucGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1.0" />
                <stop offset="45%" stopColor={isNoMaterial ? '#94a3b8' : '#38bdf8'} stopOpacity="0.95" />
                <stop offset="85%" stopColor={isNoMaterial ? '#475569' : '#1d4ed8'} stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
              </radialGradient>
            </defs>
            <circle
              cx="0"
              cy="0"
              r="75"
              fill="url(#nucGrad)"
              filter={isNoMaterial ? undefined : 'drop-shadow(0 0 28px #38bdf8)'}
            />
            {/* Pulsating energy filaments inside nucleus */}
            <path
              d="M -30 0 Q 0 -35 30 0 T 0 35 Z"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="3"
              opacity="0.8"
            />
          </svg>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 6. SECONDARY TRAILING VESICLES (Causal Lag & Follow-Through)      */}
      {/* ------------------------------------------------------------------ */}
      {vesicles.opacity > 0.05 && (
        <div
          style={{
            position: 'absolute',
            left: vesiclesProj.pixelX,
            top: vesiclesProj.pixelY,
            transform: `translate(-50%, -50%) rotate(${vesicles.rotationDeg}deg) scale(${vesiclesProj.apparentScale})`,
            zIndex: vesiclesProj.zIndex,
            opacity: vesicles.opacity,
            pointerEvents: 'none',
          }}
        >
          <svg width="220" height="220" viewBox="-110 -110 220 220">
            {/* Orbiting / trailing micro-vesicles with causal offset */}
            <circle cx="-55" cy="25" r="14" fill="#38bdf8" opacity="0.8" filter={isNoMaterial ? undefined : 'drop-shadow(0 0 8px #38bdf8)'} />
            <circle cx="45" cy="-35" r="10" fill="#818cf8" opacity="0.7" filter={isNoMaterial ? undefined : 'drop-shadow(0 0 6px #818cf8)'} />
            <circle cx="-25" cy="-50" r="8" fill="#e0f2fe" opacity="0.9" />
            <circle cx="35" cy="45" r="12" fill="#0284c7" opacity="0.75" />
          </svg>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 7. FOREGROUND PARTICULATE CURRENTS (z = 0.14)                      */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          position: 'absolute',
          left: floatersProj.pixelX,
          top: floatersProj.pixelY,
          width: BENCHMARK_WIDTH,
          height: BENCHMARK_HEIGHT,
          transform: `scale(${floatersProj.apparentScale})`,
          filter: `blur(${floaterBlur}px)`,
          zIndex: floatersProj.zIndex,
          pointerEvents: 'none',
          opacity: floaters.opacity,
        }}
      >
        <svg width={BENCHMARK_WIDTH} height={BENCHMARK_HEIGHT}>
          <circle cx="280" cy="240" r="32" fill="#38bdf8" opacity="0.25" />
          <circle cx="820" cy="740" r="44" fill="#818cf8" opacity="0.20" />
          <circle cx="1450" cy="380" r="36" fill="#38bdf8" opacity="0.22" />
          <circle cx="1680" cy="880" r="28" fill="#e0f2fe" opacity="0.30" />
        </svg>
      </div>

      {/* Subtle Cinematic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 55%, rgba(2, 6, 23, 0.75) 100%)',
          pointerEvents: 'none',
          zIndex: 200,
        }}
      />
    </div>
  );
};
