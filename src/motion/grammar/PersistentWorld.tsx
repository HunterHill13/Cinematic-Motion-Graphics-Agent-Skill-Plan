/**
 * ============================================================================
 * PERSISTENT WORLD CANVAS & ENTITY CONTINUITY CONTAINER
 * ============================================================================
 * 
 * Solves the Remotion <Sequence> Unmount / Slideshow Defect:
 * - In standard Remotion code, stacking isolated <Sequence> tags unmounts DOM nodes,
 *   destroying physics, momentum, and persistent entity identity between scenes.
 * - <PersistentWorld> provides a unified, continuous coordinate root across the
 *   entire video duration.
 * - Entities live in this persistent canvas and smoothly evolve from Shot A to Shot B
 *   via TransformationContract rather than being unmounted and replaced.
 * ============================================================================
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import {
  TransformationContract,
  EvaluatedEntityFrame,
  evaluateTransformationContract,
} from './motionGrammar';

interface PersistentWorldContextValue {
  frame: number;
  width: number;
  height: number;
  activeShotId: string | null;
  contracts: TransformationContract[];
  getEntityState: (entityId: string) => EvaluatedEntityFrame | null;
}

const PersistentWorldContext = createContext<PersistentWorldContextValue | null>(null);

export interface PersistentWorldProps {
  width?: number;
  height?: number;
  contracts: TransformationContract[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const PersistentWorld: React.FC<PersistentWorldProps> = ({
  width = 1920,
  height = 1080,
  contracts,
  children,
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  // Determine current active shot ID based on global frame
  const activeShot = useMemo(() => {
    return contracts.find((c) => frame >= c.startFrame && frame < c.endFrame) || null;
  }, [contracts, frame]);

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
    // If between shots or not strictly active, evaluate closest contract
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
          ...style,
        }}
      >
        {children}
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
// PERSISTENT HERO ENTITY RENDERER
// ============================================================================
export interface PersistentHeroEntityProps {
  entityId: string;
  contract: TransformationContract;
  render: (state: EvaluatedEntityFrame) => React.ReactNode;
}

/**
 * Continuous Hero Entity Renderer:
 * Evaluates the TransformationContract dynamically at the current global frame
 * and applies 3D translation, rotation, and volumetric scaling automatically.
 */
export const PersistentHeroEntity: React.FC<PersistentHeroEntityProps> = ({
  contract,
  render,
}) => {
  const frame = useCurrentFrame();
  const state = useMemo(() => {
    return evaluateTransformationContract(contract, frame);
  }, [contract, frame]);

  const { position, scale, rotation, opacity } = state;
  const z = position.z ?? 0;
  const rotX = rotation.x ?? 0;
  const rotY = rotation.y ?? 0;

  return (
    <div
      data-entity-id={contract.heroEntity.id}
      data-meaningful-active={state.isMeaningfulMotionActive}
      data-verb={state.activeVerb}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `translate3d(-50%, -50%, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotation.z}deg) scale(${scale})`,
        opacity,
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    >
      {render(state)}
    </div>
  );
};
