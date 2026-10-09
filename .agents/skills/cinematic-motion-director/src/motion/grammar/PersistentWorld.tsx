/**
 * ============================================================================
 * PERSISTENT WORLD CANVAS & ENTITY CONTINUITY CONTAINER (PHASE 4A)
 * ============================================================================
 * 
 * CORE ARCHITECTURAL INVARIANT:
 *   World persists across shot boundaries.
 *   Entities persist unless a transformation explicitly destroys/replaces them.
 * 
 * STRUCTURE:
 *   PersistentWorld
 *    ├── PersistentCamera
 *    ├── PersistentHeroEntity
 *    ├── PersistentSecondaryEntities
 *    └── PersistentEnvironment
 * 
 * SOLVES THE REMOTION <Sequence> SLIDESHOW DEFECT:
 *   - Completely eliminates independent unmounting across shot transitions.
 *   - The entire video timeline executes within one continuous 3D coordinate space.
 *   - Camera trajectories and Hero transformations remain decoupled.
 * ============================================================================
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate, Easing } from 'remotion';
import {
  TransformationContract,
  EvaluatedEntityFrame,
  evaluateTransformationContract,
  Vector3D,
} from './motionGrammar';

// ============================================================================
// CONTEXT & STATE INTERFACES
// ============================================================================
export interface CameraTrajectoryPoint {
  frame: number;
  position: Vector3D;
  zoom?: number;
  pitchDeg?: number;
  yawDeg?: number;
}

export interface PersistentWorldContextValue {
  frame: number;
  width: number;
  height: number;
  activeShotId: string | null;
  contracts: TransformationContract[];
  getEntityState: (entityId: string) => EvaluatedEntityFrame | null;
  cameraPosition: Vector3D;
  cameraZoom: number;
}

const PersistentWorldContext = createContext<PersistentWorldContextValue | null>(null);

// ============================================================================
// ROOT CONTAINER: <PersistentWorld>
// ============================================================================
export interface PersistentWorldProps {
  width?: number;
  height?: number;
  contracts: TransformationContract[];
  cameraTrajectory?: CameraTrajectoryPoint[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const PersistentWorld: React.FC<PersistentWorldProps> = ({
  width = 1920,
  height = 1080,
  contracts,
  cameraTrajectory = [],
  children,
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  // Determine current active shot ID based on global frame
  const activeShot = useMemo(() => {
    return contracts.find((c) => frame >= c.startFrame && frame < c.endFrame) || null;
  }, [contracts, frame]);

  // Compute camera position & zoom across trajectory keyframes
  const cameraState = useMemo(() => {
    if (cameraTrajectory.length === 0) {
      return { position: { x: 0, y: 0, z: 0 }, zoom: 1.0, pitch: 0, yaw: 0 };
    }

    if (cameraTrajectory.length === 1) {
      const pt = cameraTrajectory[0];
      return {
        position: pt.position,
        zoom: pt.zoom ?? 1.0,
        pitch: pt.pitchDeg ?? 0,
        yaw: pt.yawDeg ?? 0,
      };
    }

    // Find surrounding trajectory keyframes
    let prev = cameraTrajectory[0];
    let next = cameraTrajectory[cameraTrajectory.length - 1];

    for (let i = 0; i < cameraTrajectory.length - 1; i++) {
      if (frame >= cameraTrajectory[i].frame && frame <= cameraTrajectory[i + 1].frame) {
        prev = cameraTrajectory[i];
        next = cameraTrajectory[i + 1];
        break;
      }
    }

    const duration = Math.max(1, next.frame - prev.frame);
    const p = Math.min(1, Math.max(0, (frame - prev.frame) / duration));
    const ep = Easing.bezier(0.65, 0, 0.35, 1)(p);

    const cx = interpolate(ep, [0, 1], [prev.position.x, next.position.x]);
    const cy = interpolate(ep, [0, 1], [prev.position.y, next.position.y]);
    const cz = interpolate(ep, [0, 1], [prev.position.z ?? 0, next.position.z ?? 0]);
    const zoom = interpolate(ep, [0, 1], [prev.zoom ?? 1.0, next.zoom ?? 1.0]);
    const pitch = interpolate(ep, [0, 1], [prev.pitchDeg ?? 0, next.pitchDeg ?? 0]);
    const yaw = interpolate(ep, [0, 1], [prev.yawDeg ?? 0, next.yawDeg ?? 0]);

    return { position: { x: cx, y: cy, z: cz }, zoom, pitch, yaw };
  }, [cameraTrajectory, frame]);

  // Map of evaluated entities for the current frame
  const entityStates = useMemo(() => {
    const map = new Map<string, EvaluatedEntityFrame>();
    for (const contract of contracts) {
      if (frame >= contract.startFrame && frame <= contract.endFrame) {
        const evaluated = evaluateTransformationContract(contract, frame);
        map.set(contract.heroEntity.id, evaluated);
      }
    }
    return map;
  }, [contracts, frame]);

  const getEntityState = (entityId: string): EvaluatedEntityFrame | null => {
    if (entityStates.has(entityId)) {
      return entityStates.get(entityId)!;
    }
    const entityContract = contracts.find((c) => c.heroEntity.id === entityId);
    if (entityContract) {
      return evaluateTransformationContract(entityContract, frame);
    }
    return null;
  };

  const contextValue: PersistentWorldContextValue = {
    frame,
    width,
    height,
    activeShotId: activeShot ? activeShot.shotId : null,
    contracts,
    getEntityState,
    cameraPosition: cameraState.position,
    cameraZoom: cameraState.zoom,
  };

  return (
    <PersistentWorldContext.Provider value={contextValue}>
      <AbsoluteFill
        className={className}
        style={{
          width,
          height,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          ...style,
        }}
      >
        {/* World 3D Viewport Rig with Camera Coupling */}
        <div
          data-role="world-camera-rig"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `translate3d(${-cameraState.position.x}px, ${-cameraState.position.y}px, ${cameraState.position.z}px) rotateX(${cameraState.pitch}deg) rotateY(${cameraState.yaw}deg) scale(${cameraState.zoom})`,
            transformOrigin: '50% 50%',
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </AbsoluteFill>
    </PersistentWorldContext.Provider>
  );
};

export const usePersistentWorld = (): PersistentWorldContextValue => {
  const ctx = useContext(PersistentWorldContext);
  if (!ctx) {
    throw new Error('usePersistentWorld must be used within a <PersistentWorld> container');
  }
  return ctx;
};

// ============================================================================
// CAMERA ABSTRACTION: <PersistentCamera>
// ============================================================================
export interface PersistentCameraProps {
  children?: React.ReactNode;
}

export const PersistentCamera: React.FC<PersistentCameraProps> = ({ children }) => {
  return <>{children}</>;
};

// ============================================================================
// PERSISTENT HERO ENTITY RENDERER
// ============================================================================
export interface PersistentHeroEntityProps {
  entityId?: string;
  contract: TransformationContract;
  render: (state: EvaluatedEntityFrame) => React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Continuous Hero Entity Renderer:
 * Evaluates the TransformationContract dynamically at the current global frame
 * and applies 3D translation, rotation, and volumetric scaling automatically.
 * Supports multi-part daughter entities from SPLIT / MERGE / REASSEMBLE.
 */
export const PersistentHeroEntity: React.FC<PersistentHeroEntityProps> = ({
  entityId,
  contract,
  render,
  style,
}) => {
  const resolvedId = entityId || contract.heroEntity.id;
  const frame = useCurrentFrame();
  const state = useMemo(() => {
    return evaluateTransformationContract(contract, frame);
  }, [contract, frame]);

  const { position, scale, rotation, opacity, shearDeg } = state;
  const z = position.z ?? 0;
  const rotX = rotation.x ?? 0;
  const rotY = rotation.y ?? 0;
  const shear = shearDeg ? `skewX(${shearDeg}deg)` : '';

  return (
    <div
      data-entity-id={resolvedId}
      data-meaningful-active={state.isMeaningfulMotionActive}
      data-verb={state.activeVerb}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `translate3d(-50%, -50%, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotation.z}deg) scale(${scale}) ${shear}`,
        opacity,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {render(state)}
    </div>
  );
};

// ============================================================================
// SECONDARY ENTITIES: <PersistentSecondaryEntity>
// ============================================================================
export interface PersistentSecondaryEntityProps {
  id: string;
  parentHeroId?: string;
  origin: Vector3D;
  reactionType?: 'DISPLACE' | 'ORBIT' | 'ABSORB' | 'RECOIL' | 'RESONATE';
  intensity?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const PersistentSecondaryEntity: React.FC<PersistentSecondaryEntityProps> = ({
  id,
  parentHeroId,
  origin,
  reactionType = 'RESONATE',
  intensity = 0.5,
  children,
  style,
}) => {
  const { frame, getEntityState } = usePersistentWorld();

  const reactionOffset = useMemo(() => {
    if (!parentHeroId) return { dx: 0, dy: 0, dz: 0, scale: 1.0 };
    const heroState = getEntityState(parentHeroId);
    if (!heroState) return { dx: 0, dy: 0, dz: 0, scale: 1.0 };

    if (reactionType === 'DISPLACE') {
      const dist = Math.hypot(origin.x - heroState.position.x, origin.y - heroState.position.y);
      const push = Math.max(0, 1 - dist / 500) * intensity * 40;
      const angle = Math.atan2(origin.y - heroState.position.y, origin.x - heroState.position.x);
      return { dx: Math.cos(angle) * push, dy: Math.sin(angle) * push, dz: 0, scale: 1.0 };
    }

    if (reactionType === 'ORBIT') {
      const angle = (frame * 0.05 * intensity);
      const radius = 120 * intensity;
      return { dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius, dz: 0, scale: 1.0 };
    }

    if (reactionType === 'RESONATE') {
      const shake = Math.sin(frame * 0.4) * (heroState.isMeaningfulMotionActive ? intensity * 8 : 1);
      return { dx: 0, dy: shake, dz: 0, scale: 1.0 + (shake * 0.02) };
    }

    return { dx: 0, dy: 0, dz: 0, scale: 1.0 };
  }, [frame, parentHeroId, origin, reactionType, intensity, getEntityState]);

  return (
    <div
      data-secondary-id={id}
      data-reaction-type={reactionType}
      style={{
        position: 'absolute',
        left: origin.x + reactionOffset.dx,
        top: origin.y + reactionOffset.dy,
        transform: `translate3d(-50%, -50%, ${(origin.z ?? 0) + reactionOffset.dz}px) scale(${reactionOffset.scale})`,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// ENVIRONMENT: <PersistentEnvironment>
// ============================================================================
export interface PersistentEnvironmentProps {
  gridSpacing?: number;
  gridColor?: string;
  accentPulseColor?: string;
  depthPlanesCount?: number;
  children?: React.ReactNode;
}

export const PersistentEnvironment: React.FC<PersistentEnvironmentProps> = ({
  gridSpacing = 80,
  gridColor = 'rgba(255, 255, 255, 0.04)',
  accentPulseColor = 'rgba(56, 189, 248, 0.08)',
  depthPlanesCount = 2,
  children,
}) => {
  const { width, height } = usePersistentWorld();

  return (
    <div
      data-role="persistent-environment"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
      }}
    >
      {/* Background Depth Planes */}
      {Array.from({ length: depthPlanesCount }).map((_, idx) => {
        const depthZ = -200 * (idx + 1);
        return (
          <div
            key={`depth-plane-${idx}`}
            style={{
              position: 'absolute',
              width: width * 1.5,
              height: height * 1.5,
              left: -width * 0.25,
              top: -height * 0.25,
              transform: `translate3d(0, 0, ${depthZ}px)`,
              backgroundImage: `radial-gradient(circle at 50% 50%, ${accentPulseColor} 0%, transparent 70%), linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
              backgroundSize: `100% 100%, ${gridSpacing}px ${gridSpacing}px, ${gridSpacing}px ${gridSpacing}px`,
              opacity: 0.8 - idx * 0.3,
            }}
          />
        );
      })}
      {children}
    </div>
  );
};
