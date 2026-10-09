/**
 * ============================================================================
 * CANONICAL COMPILER SCENE (PHASE 4B)
 * ============================================================================
 * 
 * Executable Remotion scene generated directly from MotionSceneGraph compilation:
 * 
 * Creative Intent:
 *   "یک هسته کوانتومی بیوانرژیک ابتدا با انبساط ساختار لایه‌ای منبسط می‌شود (EXPAND)،
 *    سپس تحت نیروی برشی به دو وزیکول دوقلو انشعاب می‌یابد (SPLIT)،
 *    و در نهایت وزیکول پیشرو در امتداد گرادیان پتانسیل منتقل می‌شود (TRAVEL)."
 * 
 * Pipeline:
 *   Creative Intent
 *   -> MotionSceneGraph
 *   -> MotionGraphCompiler.compileGraph(...)
 *   -> Compiled Contracts & Verb Templates
 *   -> <PersistentWorld>
 * ============================================================================
 */

import React, { useMemo } from 'react';
import {
  PersistentWorld,
  PersistentHeroEntity,
} from '../grammar/PersistentWorld';
import { MotionSceneGraph } from './motionSceneGraph';
import { MotionGraphCompiler } from './motionGraphCompiler';

export const canonicalCompilerGraph: MotionSceneGraph = {
  sceneId: 'canonical_compiler_quantum_core',
  title: 'هسته کوانتومی پیوسته (Compiler Canonical Sequence)',
  totalDurationFrames: 600,
  world: {
    width: 1920,
    height: 1080,
    depthEnabled: true,
    backgroundColor: '#070A13',
  },
  entities: [
    {
      id: 'quantum_core',
      label: 'هسته کوانتومی پیوسته',
      role: 'HERO',
      persistent: true,
      lifecycle: 'PERSIST',
      initialState: {
        position: { x: 960, y: 540, z: 0 },
        scale: 0.75,
        rotation: { z: 0 },
        geometry: 'dense_core_nucleus',
        state: 'dormant_compressed',
      },
      semanticPurpose: 'Primary metabolic and informational carrier that persists across shots without unmounting.',
    },
  ],
  transformations: [
    {
      id: 'tx_01_expand',
      shotId: 'shot_01_expand',
      sourceEntityIds: ['quantum_core'],
      verb: 'EXPAND',
      startFrame: 0,
      endFrame: 200,
      trigger: {
        frame: 40,
        narrationMarker: 'با فعال‌سازی شار بیوانرژیک در شبکه درون‌سلولی',
        forceType: 'bioenergetic_radial_surge',
        intensity: 0.85,
      },
      consequence: {
        description: 'Outer ring perimeter reaches stable boundary lock at scale 1.4',
        exitMomentum: {
          vector: { x: 0, y: 0, z: -10 },
          angularVelocity: 0.8,
        },
        spatialResolution: 'Anchored at center canvas awaiting fission cleave',
      },
      spatialIntent: {
        origin: { x: 960, y: 540, z: 0 },
        scaleShift: { from: 0.75, to: 1.4 },
      },
    },
    {
      id: 'tx_02_split',
      shotId: 'shot_02_split',
      sourceEntityIds: ['quantum_core'],
      verb: 'SPLIT',
      startFrame: 200,
      endFrame: 400,
      trigger: {
        frame: 240,
        narrationMarker: 'تحت اثر تنش‌های انکساری، ساختار به دو مولفه مستقل انشعاب می‌یابد',
        forceType: 'bipolar_fission_cleavage',
        intensity: 0.95,
      },
      consequence: {
        description: 'Two daughter vesicles separate along horizontal axis by 360px',
        exitMomentum: {
          vector: { x: 14, y: 0, z: 0 },
          angularVelocity: 1.2,
        },
        spatialResolution: 'Bipolar stable daughter configuration',
      },
      spatialIntent: {
        origin: { x: 960, y: 540, z: 0 },
        separationDistance: 360,
        fragmentCount: 2,
      },
    },
    {
      id: 'tx_03_travel',
      shotId: 'shot_03_travel',
      sourceEntityIds: ['quantum_core'],
      verb: 'TRAVEL',
      startFrame: 400,
      endFrame: 600,
      trigger: {
        frame: 440,
        narrationMarker: 'مولفه پیشرو به سوی ترمینال فعال غشایی شتاب می‌گیرد',
        forceType: 'electrochemical_gradient_vector',
        intensity: 0.9,
      },
      consequence: {
        description: 'Vesicle arrives at right membrane target dock (x=1600)',
        exitMomentum: {
          vector: { x: 18, y: 0, z: -5 },
          angularVelocity: 0.5,
        },
        spatialResolution: 'Docked at membrane perimeter',
      },
      spatialIntent: {
        origin: { x: 780, y: 540, z: 0 },
        target: { x: 1600, y: 540, z: 0 },
      },
    },
  ],
  continuity: [
    {
      entityId: 'quantum_core',
      fromShotId: 'shot_01_expand',
      toShotId: 'shot_02_split',
      mustPreservePosition: true,
      mustPreserveScale: false,
      maxDiscontinuityTolerancePx: 0.0,
    },
    {
      entityId: 'quantum_core',
      fromShotId: 'shot_02_split',
      toShotId: 'shot_03_travel',
      mustPreservePosition: false,
      mustPreserveScale: true,
      maxDiscontinuityTolerancePx: 10.0,
    },
  ],
  camera: {
    keyframes: [
      { frame: 0, position: { x: 0, y: 0, z: 0 }, zoom: 1.0 },
      { frame: 200, position: { x: 0, y: 0, z: 40 }, zoom: 1.08 },
      { frame: 400, position: { x: 60, y: 0, z: 20 }, zoom: 1.05 },
      { frame: 600, position: { x: 200, y: 0, z: 0 }, zoom: 1.0 },
    ],
    isSubjectCoupled: true,
    coupledEntityId: 'quantum_core',
  },
};

export const CanonicalCompilerScene: React.FC = () => {
  const compiled = useMemo(() => {
    return MotionGraphCompiler.compileGraph(canonicalCompilerGraph);
  }, []);

  return (
    <PersistentWorld
      contracts={compiled.contracts}
      cameraTrajectory={compiled.cameraTrajectory}
      style={{ backgroundColor: compiled.world.backgroundColor }}
    >
      {compiled.contracts.map((contract) => (
        <PersistentHeroEntity
          key={contract.shotId}
          contract={contract}
          render={(state) => {
            if (state.components && state.components.length > 0) {
              return (
                <div style={{ position: 'relative', width: 200, height: 200 }}>
                  {state.components.map((comp) => (
                    <div
                      key={comp.id}
                      style={{
                        position: 'absolute',
                        left: comp.position.x - contract.initialState.position.x + 100,
                        top: comp.position.y - contract.initialState.position.y + 100,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 30% 30%, #38BDF8, #1E40AF)',
                        boxShadow: '0 0 35px rgba(56, 189, 248, 0.6)',
                        transform: `scale(${comp.scale}) rotate(${comp.rotation.z}deg)`,
                      }}
                    />
                  ))}
                </div>
              );
            }

            return (
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #60A5FA 0%, #2563EB 60%, #1E3A8A 100%)',
                  boxShadow: '0 0 50px rgba(96, 165, 250, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 0 25px #FFFFFF',
                  }}
                />
              </div>
            );
          }}
        />
      ))}
    </PersistentWorld>
  );
};
