/**
 * ============================================================================
 * PHASE 5E CAMERA COMPOSITION PROOF (REMOTION COMPOSITION)
 * ============================================================================
 * 
 * Demonstrates concrete runtime consumption of Cinematic Camera Choreography &
 * 2.5D Depth Parallax:
 *   1. Test A: Static Baseline (Control)
 *   2. Test B: Push-In (Depth-aware perspective expansion)
 *   3. Test C: Pull-Out (Reveals surrounding world context)
 *   4. Test D: Camera Orbit (Depth-dependent relative movement around focal hero)
 *   5. Test E: Camera Tracking (Camera follows traveling hero, maintaining framing)
 *   6. Test F: Lead Room (Compositional breathing space ahead of hero motion)
 *   7. Test H: Camera Parallax (Foreground > Hero > Background relative displacement)
 *   8. Test L: Event Punctuation (Deterministic impact punch-in and settle)
 *   9. Test K & J: Motion-Carry & World Exit (Persistent world preservation)
 *  10. Controlled A/B: SPATIAL_CAMERA vs GLOBAL_TRANSFORM vs STATIC_CAMERA
 * 
 * Strict Anti-Deception Doctrine:
 *   - Zero Three.js, WebGL, external engines, Blender, post-processing blur/vignette
 *   - Zero Math.random() noise, zero particles, zero camera vibration/shake
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import {
  CinematicCameraAdapter,
  CameraState,
  CameraMotivation,
  RenderedCameraProjectedElement,
} from './cinematicCameraAdapter';
import { EntitySpatialPlacement } from './depthSchema';
import { MaterialRenderAdapter } from './materialRenderAdapter';
import { LightingRenderAdapter } from './lightingRenderAdapter';
import { MaterialReference } from './materialSchema';
import { LightingContract } from './lightingSchema';

export interface CameraCompositionProofProps {
  mode?: 'SPATIAL_CAMERA' | 'GLOBAL_TRANSFORM' | 'STATIC_CAMERA';
}

export const Phase5ECameraCompositionProof: React.FC<CameraCompositionProofProps> = ({
  mode = 'SPATIAL_CAMERA',
}) => {
  const frame = useCurrentFrame();
  const isGlobalTransform = mode === 'GLOBAL_TRANSFORM';
  const isStaticCamera = mode === 'STATIC_CAMERA';

  // --------------------------------------------------------------------------
  // 1. MATERIAL & LIGHTING SETUP (REUSING EXISTING PROVEN ADAPTERS)
  // --------------------------------------------------------------------------
  const materials: Record<string, MaterialReference> = {
    metal: {
      id: 'mat_hero_metal',
      name: 'Titanium Hero Core',
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
      id: 'mat_satellite_glass',
      name: 'Refractive Secondary Disc',
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
    organic: {
      id: 'mat_fg_organic',
      name: 'Foreground Framing Ring',
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
    stone: {
      id: 'mat_bg_stone',
      name: 'Background Monolith',
      category: 'STONE',
      surfaceResponse: 'MATTE',
      edgeResponse: 'STABLE',
      deformationResponse: 'RIGID',
      lightResponse: 'DIFFUSE',
      emission: 'NON_EMISSIVE',
      opacityBehavior: 'OPAQUE',
      textureCharacter: 'GRAINED',
      motionResponses: {},
    },
  };

  const lightingContract: LightingContract = {
    id: 'camera_lab_lighting',
    sources: [
      {
        id: 'cam_key',
        type: 'KEY',
        direction: { semantic: 'UPPER_LEFT' },
        intensity: { level: 'MEDIUM', value: 1.4 },
        color: { semantic: 'NEUTRAL', hex: '#ffffff' },
        softness: 'MEDIUM',
      },
      {
        id: 'cam_rim',
        type: 'RIM',
        direction: { semantic: 'BACK' },
        intensity: { level: 'HIGH', value: 1.5 },
        color: { semantic: 'CYAN', hex: '#38bdf8' },
        softness: 'HARD',
      },
      {
        id: 'cam_fill',
        type: 'FILL',
        direction: { semantic: 'LOWER_RIGHT' },
        intensity: { level: 'LOW', value: 0.4 },
        color: { semantic: 'NEUTRAL', hex: '#cbd5e1' },
        softness: 'SOFT',
      },
    ],
    ambientProfile: { level: 'LOW', value: 0.2, color: { semantic: 'NEUTRAL', hex: '#1e293b' } },
    materialInteractions: [],
    motionResponses: [],
  };

  const normalizedLighting = LightingRenderAdapter.normalizeContract(lightingContract);

  // --------------------------------------------------------------------------
  // 2. TIMELINE CHOREOGRAPHY & MOTIVATED CAMERA TRAJECTORY
  // --------------------------------------------------------------------------
  let phaseName = 'TEST A: STATIC BASELINE';
  let motivation: CameraMotivation = 'ENTER_WORLD';
  let camX = 0;
  let camY = 0;
  let camZ = 0;
  let camZoom = 1.0;
  let camOrbit = 0;
  let leadRoomX = 0;
  let heroWorldX = 0;
  let heroWorldY = 0;

  if (frame < 20) {
    // Phase 1: Test A - Static Baseline (Frames 0-19)
    phaseName = 'TEST A: STATIC BASELINE (CONTROL)';
    motivation = 'ENTER_WORLD';
  } else if (frame >= 20 && frame < 55) {
    // Phase 2: Test B - Camera Push-In (Frames 20-54)
    phaseName = 'TEST B: CAMERA PUSH-IN (DEPTH PERSPECTIVE)';
    motivation = 'ENTER_WORLD';
    const t = (frame - 20) / 34;
    camZ = interpolate(t, [0, 1], [0.0, 0.22]);
    camZoom = interpolate(t, [0, 1], [1.0, 1.45]);
  } else if (frame >= 55 && frame < 90) {
    // Phase 3: Test C & D - Pull-Out & Orbit (Frames 55-89)
    phaseName = 'TEST D: CAMERA ORBIT (DEPTH PARALLAX PIVOT)';
    motivation = 'ESTABLISH_RELATIONSHIP';
    const t = (frame - 55) / 34;
    camZoom = interpolate(t, [0, 0.4, 1], [1.45, 1.05, 1.0]);
    camZ = interpolate(t, [0, 0.4, 1], [0.22, 0.05, 0.0]);
    // Sinusoidal orbit oscillation around focal hero
    camOrbit = Math.sin(t * Math.PI * 2) * 22; // -22 to +22 deg
  } else if (frame >= 90 && frame < 150) {
    // Phase 4: Test E & F - Hero Traveling with Camera Tracking & Lead Room (Frames 90-149)
    phaseName = 'TEST E & F: TRACKING & LEAD ROOM';
    motivation = 'FOLLOW_HERO';
    const t = (frame - 90) / 59;
    // Hero travels across coordinate space from -0.35 to +0.35
    heroWorldX = interpolate(t, [0, 1], [-0.35, 0.35]);

    if (!isStaticCamera) {
      // Camera actively tracks hero position
      camX = heroWorldX;
      // Lead room gives intentional space in front of hero travel direction (+X)
      leadRoomX = 0.12;
      camZoom = 1.15;
    }
  } else if (frame >= 150 && frame < 210) {
    // Phase 5: Test H & I - Lateral Parallax & Depth Push (Frames 150-209)
    phaseName = 'TEST H: LATERAL CAMERA PARALLAX';
    motivation = 'REVEAL_CONTEXT';
    const t = (frame - 150) / 59;
    // Camera pans laterally from -0.22 to +0.22
    camX = interpolate(t, [0, 1], [-0.22, 0.22]);
    camZoom = 1.1;
  } else if (frame >= 210 && frame < 255) {
    // Phase 6: Test L - Event Punctuation (Frames 210-254)
    phaseName = 'TEST L: EVENT PUNCTUATION (HERO IMPACT)';
    motivation = 'EMPHASIZE_EVENT';
    const t = (frame - 210) / 44;
    // Impact hit occurs around frame 225
    if (frame >= 222 && frame <= 236) {
      const punchT = (frame - 222) / 14;
      const punch = Math.sin(punchT * Math.PI);
      camZoom = 1.0 + punch * 0.16; // Intentional punch-in
      camY = -punch * 0.03;
    } else {
      camZoom = 1.0;
      camY = 0;
    }
  } else {
    // Phase 7: Test K & J - Motion-Carry Transition & World Exit (Frames 255-300)
    phaseName = 'TEST K & J: MOTION-CARRY & WORLD EXIT';
    motivation = 'EXIT_WORLD';
    const t = (frame - 255) / 44;
    camX = interpolate(t, [0, 0.5, 1], [0.0, 0.25, 0.0]);
    camZoom = interpolate(t, [0, 0.5, 1], [1.0, 1.15, 0.82]);
    camZ = interpolate(t, [0, 1], [0.0, -0.15]);
  }

  // Override camera parameters if running in control comparison modes
  if (isStaticCamera) {
    camX = 0;
    camY = 0;
    camZ = 0;
    camZoom = 1.0;
    camOrbit = 0;
    leadRoomX = 0;
  }

  const cameraState: CameraState = {
    x: camX,
    y: camY,
    z: camZ,
    zoom: camZoom,
    orbitAngleDeg: camOrbit,
    focalDepthZ: 0.45,
    leadRoomX,
    motivation,
    progress: frame / 299,
  };

  // --------------------------------------------------------------------------
  // 3. PERSISTENT 2.5D WORLD SPECIFICATION (5 SPATIALLY SEPARATED ENTITIES)
  // --------------------------------------------------------------------------
  const placements: EntitySpatialPlacement[] = [
    {
      entityId: 'deep_bg_stars',
      depthBand: 'DEEP_BACKGROUND',
      transform: { x: 0.0, y: 0.0, z: 0.85, scale: 1.4 },
      semanticSpatialRole: 'Cosmic grid reference plane',
    },
    {
      entityId: 'bg_monolith',
      depthBand: 'BACKGROUND',
      transform: { x: 0.45, y: -0.22, z: 0.70, scale: 0.9 },
      semanticSpatialRole: 'Posterior architectural reference monolith',
    },
    {
      entityId: 'hero_core',
      depthBand: 'HERO_PLANE',
      transform: { x: heroWorldX, y: heroWorldY, z: 0.45, scale: 1.0 },
      semanticSpatialRole: 'Persistent focal hero entity',
    },
    {
      entityId: 'secondary_satellite',
      depthBand: 'HERO_PLANE',
      transform: { x: -0.35, y: 0.18, z: 0.30, scale: 0.75 },
      semanticSpatialRole: 'Translucent refractive satellite disc',
    },
    {
      entityId: 'foreground_aperture',
      depthBand: 'FOREGROUND',
      transform: { x: -0.25, y: -0.18, z: 0.15, scale: 0.85 },
      semanticSpatialRole: 'Anterior framing aperture ring',
    },
  ];

  // --------------------------------------------------------------------------
  // 4. PROJECT ELEMENTS VIA CAMERA ADAPTER
  // --------------------------------------------------------------------------
  let renderedElements: RenderedCameraProjectedElement[];

  if (isGlobalTransform) {
    // CHEAT SIMULATION: A flat global transform container scales and translates everything identically!
    // No depth-dependent parallax or orbit differential!
    renderedElements = placements.map((p) => {
      // Standard static spatial resolution
      const baseEl = CinematicCameraAdapter.projectElement(p, {
        ...cameraState,
        x: 0,
        y: 0,
        z: 0,
        zoom: 1.0,
        orbitAngleDeg: 0,
        leadRoomX: 0,
      });

      // Apply flat uniform container translation & scale
      const uniformShiftX = (camX - leadRoomX) * (1920 / 2) * camZoom;
      const uniformShiftY = camY * (1080 / 2) * camZoom;

      const flatPixelX = Math.round(1920 / 2 + (baseEl.pixelX - 1920 / 2) * camZoom - uniformShiftX);
      const flatPixelY = Math.round(1080 / 2 + (baseEl.pixelY - 1080 / 2) * camZoom - uniformShiftY);
      const flatScale = Math.round(baseEl.apparentScale * camZoom * 1000) / 1000;

      return {
        ...baseEl,
        pixelX: flatPixelX,
        pixelY: flatPixelY,
        apparentScale: flatScale,
        style: {
          ...baseEl.style,
          left: flatPixelX,
          top: flatPixelY,
          transform: `translate3d(-50%, -50%, ${baseEl.depthOffsetZ}px) scale(${flatScale})`,
        },
      };
    });
  } else {
    // TRUE SPATIAL CAMERA: Depth-dependent projection & parallax
    renderedElements = CinematicCameraAdapter.projectAll(placements, cameraState);
  }

  // Material styling mapping
  const materialMap: Record<string, MaterialReference> = {
    deep_bg_stars: materials.stone,
    bg_monolith: materials.stone,
    hero_core: materials.metal,
    secondary_satellite: materials.glass,
    foreground_aperture: materials.organic,
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070a12',
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

      {/* Header HUD */}
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
          zIndex: 2000,
        }}
      >
        <div>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', color: '#94a3b8', textTransform: 'uppercase' }}>
            Phase 5E Cinematic Camera Runtime Proof
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4, color: '#f1f5f9' }}>
            {isGlobalTransform
              ? 'GLOBAL TRANSFORM BYPASS (FLAT 2D SCALE/TRANSLATE)'
              : isStaticCamera
              ? 'STATIC CAMERA BASELINE (CONTROL)'
              : 'DEPTH-AWARE CINEMATIC SPATIAL CAMERA'}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>FRAME: {frame} / 300</div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginTop: 4,
              color: isGlobalTransform ? '#ef4444' : isStaticCamera ? '#f59e0b' : '#10b981',
              backgroundColor: isGlobalTransform
                ? 'rgba(239, 68, 68, 0.1)'
                : isStaticCamera
                ? 'rgba(245, 158, 11, 0.1)'
                : 'rgba(16, 185, 129, 0.1)',
              padding: '4px 12px',
              borderRadius: 4,
              display: 'inline-block',
            }}
          >
            {phaseName}
          </div>
        </div>
      </div>

      {/* Camera Telemetry HUD Bar */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 60,
          right: 60,
          display: 'flex',
          gap: 28,
          fontSize: 13,
          color: '#94a3b8',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          padding: '10px 20px',
          borderRadius: 6,
          border: '1px solid rgba(255, 255, 255, 0.06)',
          zIndex: 2000,
        }}
      >
        <div>MOTIVATION: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{cameraState.motivation}</span></div>
        <div>CAM POS: <span style={{ color: '#f8fafc', fontWeight: 600 }}>({camX.toFixed(2)}, {camY.toFixed(2)}, {camZ.toFixed(2)})</span></div>
        <div>ZOOM: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{camZoom.toFixed(2)}x</span></div>
        <div>ORBIT: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{camOrbit.toFixed(1)}°</span></div>
        <div>LEAD ROOM: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{leadRoomX.toFixed(2)}</span></div>
        <div>HERO WORLD X: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{heroWorldX.toFixed(2)}</span></div>
      </div>

      {/* Render 5 Spatial Entities with Genuine Parallax and Layer Ordering */}
      {renderedElements.map((el) => {
        const mat = materialMap[el.entityId] || materials.stone;
        const matStyle = MaterialRenderAdapter.resolveMaterialStyle(
          mat,
          el.entityId,
          { velocity: Math.abs(heroWorldX) },
          {},
          { normalizedLighting }
        );

        // Merge spatial camera styles with material styles cleanly
        const finalStyle = MaterialRenderAdapter.mergeSpatialAndMaterialStyles(el.style, matStyle.style);

        // Render geometric representation based on role
        let innerContent: React.ReactNode = null;
        let baseWidth = 160;
        let baseHeight = 160;

        if (el.entityId === 'hero_core') {
          baseWidth = 180;
          baseHeight = 180;
          innerContent = (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff' }}>HERO CORE</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>z={el.numericZ} (S={el.apparentScale.toFixed(2)})</div>
            </div>
          );
        } else if (el.entityId === 'foreground_aperture') {
          baseWidth = 240;
          baseHeight = 240;
          innerContent = (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f8fafc' }}>FOREGROUND APERTURE</div>
              <div style={{ fontSize: 10, color: '#6ee7b7' }}>z={el.numericZ} (S={el.apparentScale.toFixed(2)})</div>
            </div>
          );
        } else if (el.entityId === 'secondary_satellite') {
          baseWidth = 140;
          baseHeight = 140;
          innerContent = (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>SECONDARY</div>
              <div style={{ fontSize: 10, color: '#1e293b' }}>z={el.numericZ} (S={el.apparentScale.toFixed(2)})</div>
            </div>
          );
        } else if (el.entityId === 'bg_monolith') {
          baseWidth = 220;
          baseHeight = 320;
          innerContent = (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1' }}>BG MONOLITH</div>
              <div style={{ fontSize: 10, color: '#64748b' }}>z={el.numericZ} (S={el.apparentScale.toFixed(2)})</div>
            </div>
          );
        } else {
          // deep_bg_stars
          baseWidth = 400;
          baseHeight = 400;
          innerContent = (
            <div style={{ textAlign: 'center', marginTop: 80 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>DEEP BACKGROUND PLANE</div>
              <div style={{ fontSize: 11, color: '#334155' }}>z={el.numericZ} (S={el.apparentScale.toFixed(2)})</div>
            </div>
          );
        }

        return (
          <div
            key={el.entityId}
            style={{
              ...finalStyle,
              width: baseWidth,
              height: baseHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {innerContent}
          </div>
        );
      })}

      {/* Footer Status Bar */}
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
          zIndex: 2000,
        }}
      >
        <div>Cinematic Camera Adapter v1.0 | Motivated Choreography Engine</div>
        <div>Depth Parallax: FG ({renderedElements.find(r => r.depthBand === 'FOREGROUND')?.pixelX}px) vs Hero ({renderedElements.find(r => r.depthBand === 'HERO_PLANE')?.pixelX}px) vs BG ({renderedElements.find(r => r.depthBand === 'BACKGROUND')?.pixelX}px)</div>
        <div>Strict Zero-Noise Determinism</div>
      </div>
    </AbsoluteFill>
  );
};
