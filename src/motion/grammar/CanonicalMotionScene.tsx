/**
 * ============================================================================
 * CANONICAL MOTION SCENE (PHASE 4A REFERENCE IMPLEMENTATION)
 * ============================================================================
 * 
 * Demonstrates how a fresh Agent authors a production-grade cinematic sequence
 * using Executable Motion Grammar WITHOUT inventing physics or arbitrary JSX.
 * 
 * Pipeline:
 *   Creative Intent (Scientific/Technological Energy Reactor)
 *   -> TransformationContracts via Verb Templates (EXPAND -> SPLIT -> TRAVEL)
 *   -> PersistentWorld (continuous coordinate space across all 3 shots)
 *   -> PersistentHeroEntity + PersistentSecondaryEntity + PersistentEnvironment
 *   -> Remotion
 * ============================================================================
 */

import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import {
  PersistentWorld,
  PersistentEnvironment,
  PersistentHeroEntity,
  PersistentSecondaryEntity,
  CameraTrajectoryPoint,
} from './PersistentWorld';
import {
  createExpandTemplate,
  createSplitTemplate,
  createTravelTemplate,
} from './verbTemplates';

export const CanonicalMotionScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Define Executable Transformation Contracts via certified Verb Templates
  // Shot 1 (Frames 0 - 200): Energy Core Expansion
  const shot1 = useMemo(() => {
    return createExpandTemplate({
      shotId: 'canonical_shot_01_expand',
      heroId: 'reactor_core',
      heroLabel: 'هسته بیوانرژیک راکتور',
      startFrame: 0,
      endFrame: 200,
      anchor: { x: 960, y: 540, z: 0 },
      initialScale: 0.7,
      expandedScale: 1.35,
      ringLayersCount: 3,
      forceType: 'thermal_ionization_pulse',
      narrationMarker: 'با فعال‌سازی جریان اولیه، هسته مرکزی به ساختار معماری کامل منبسط می‌شود',
      persistsFrom: 'GENESIS',
      persistsTo: 'canonical_shot_02_split',
    });
  }, []);

  // Shot 2 (Frames 200 - 400): Core Fission / Bipolar Split
  const shot2 = useMemo(() => {
    return createSplitTemplate({
      shotId: 'canonical_shot_02_split',
      heroId: 'reactor_core',
      heroLabel: 'هسته بیوانرژیک راکتور',
      startFrame: 200,
      endFrame: 400,
      origin: { x: 960, y: 540, z: 0 },
      separationDistance: 320,
      splitAxis: 'horizontal',
      baseScale: 1.35,
      forceType: 'electromagnetic_cleavage_surge',
      narrationMarker: 'شکافت قطبی، دو جریان مجزا از فازهای مولکولی تولید می‌کند',
      persistsFrom: 'canonical_shot_01_expand',
      persistsTo: 'canonical_shot_03_travel',
    });
  }, []);

  // Shot 3 (Frames 400 - 600): Divergent Daughter Transit / Travel
  const shot3 = useMemo(() => {
    return createTravelTemplate({
      shotId: 'canonical_shot_03_travel',
      heroId: 'reactor_core',
      heroLabel: 'هسته بیوانرژیک راکتور',
      startFrame: 400,
      endFrame: 600,
      from: { x: 960, y: 540, z: 0 },
      to: { x: 1350, y: 380, z: -80 },
      headingTilt: 22,
      baseScale: 1.1,
      forceType: 'pneumatic_acceleration_thrust',
      narrationMarker: 'مولفه‌های فعال با بردار شتاب بالا به پایانه‌های نگه‌دارنده هدایت می‌شوند',
      persistsFrom: 'canonical_shot_02_split',
      persistsTo: 'TERMINUS',
    });
  }, []);

  const contracts = useMemo(() => [shot1.contract, shot2.contract, shot3.contract], [shot1, shot2, shot3]);

  // 2. Camera Trajectory: Smooth decoupled cinematics
  const cameraTrajectory: CameraTrajectoryPoint[] = useMemo(() => [
    { frame: 0, position: { x: 0, y: 0, z: 0 }, zoom: 1.0 },
    { frame: 200, position: { x: 40, y: 20, z: -40 }, zoom: 1.05 },
    { frame: 400, position: { x: -30, y: -20, z: -80 }, zoom: 1.1 },
    { frame: 600, position: { x: 80, y: 40, z: -100 }, zoom: 1.15 },
  ], []);

  // Determine active contract for hero renderer
  const activeContract = useMemo(() => {
    if (frame < 200) return shot1.contract;
    if (frame < 400) return shot2.contract;
    return shot3.contract;
  }, [frame, shot1, shot2, shot3]);

  return (
    <PersistentWorld
      width={1920}
      height={1080}
      contracts={contracts}
      cameraTrajectory={cameraTrajectory}
      style={{ backgroundColor: '#090D16' }}
    >
      {/* A. Persistent 3D Environment Grid */}
      <PersistentEnvironment
        gridSpacing={90}
        gridColor="rgba(56, 189, 248, 0.05)"
        accentPulseColor="rgba(99, 102, 241, 0.12)"
      />

      {/* B. Secondary Entity: Flanking Magnetic Stabilizer Ring */}
      <PersistentSecondaryEntity
        id="stabilizer_ring"
        parentHeroId="reactor_core"
        origin={{ x: 960, y: 540, z: -120 }}
        reactionType="RESONATE"
        intensity={0.6}
      >
        <div
          style={{
            width: 440,
            height: 440,
            borderRadius: '50%',
            border: '2px dashed rgba(56, 189, 248, 0.25)',
            boxShadow: '0 0 35px rgba(56, 189, 248, 0.1)',
          }}
        />
      </PersistentSecondaryEntity>

      {/* C. Persistent Hero Entity: Continuous Metamorphosis */}
      <PersistentHeroEntity
        entityId="reactor_core"
        contract={activeContract}
        render={(state) => {
          // If the verb generated multi-part components (like SPLIT), render them
          if (state.components && state.components.length > 0) {
            return (
              <div style={{ position: 'relative', width: 200, height: 200 }}>
                {state.components.map((comp) => (
                  <div
                    key={comp.id}
                    style={{
                      position: 'absolute',
                      left: comp.position.x - state.position.x + 100,
                      top: comp.position.y - state.position.y + 100,
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${comp.color || '#38BDF8'} 65%, #1E3A8A 100%)`,
                      boxShadow: `0 0 28px ${comp.color || '#38BDF8'}`,
                      transform: `translate(-50%, -50%) rotate(${comp.rotation.z}deg) scale(${comp.scale})`,
                    }}
                  />
                ))}
              </div>
            );
          }

          // Single-body geometric representation
          return (
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #38BDF8 60%, #1D4ED8 100%)',
                boxShadow: '0 0 45px rgba(56, 189, 248, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.6)',
              }}
            />
          );
        }}
      />
    </PersistentWorld>
  );
};
