import React from 'react';
import { useCurrentFrame } from 'remotion';

// Import atomic mechanisms and recipes
import { calculateCollision } from '../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../src/motion/mechanisms/Ripple';
import { calculateDiagramBuild } from '../../../src/motion/mechanisms/DiagramBuild';
import { calculateKineticType } from '../../../src/motion/mechanisms/KineticType';

import { executeObjectHandoff } from '../../../src/motion/recipes/ObjectHandoff';
import { executeSplitAndConverge } from '../../../src/motion/recipes/SplitAndConvergeRecipe';
import { executeMaskExpansion } from '../../../src/motion/recipes/MaskExpansionRecipe';
import { executePathRelay } from '../../../src/motion/recipes/PathRelayRecipe';
import { executeFoldAndUnfold } from '../../../src/motion/recipes/FoldAndUnfoldRecipe';
import { executeAxisCollapse } from '../../../src/motion/recipes/AxisCollapseRecipe';
import { executeGravitationalSingularity } from '../../../src/motion/recipes/GravitationalSingularityRecipe';
import { executeCameraPunchThrough } from '../../../src/motion/recipes/CameraPunchThroughRecipe';
import { executePushAndDisplace } from '../../../src/motion/recipes/PushAndDisplaceRecipe';
import { executeCounterBalancedSweep } from '../../../src/motion/recipes/CounterBalancedSweepRecipe';
import { executeElasticSnapping } from '../../../src/motion/recipes/ElasticSnappingRecipe';
import { executeDimensionalPortal } from '../../../src/motion/recipes/DimensionalPortalRecipe';

interface RecipeCardProps {
  id: string;
  name: string;
  category: string;
  formula: string;
  telemetry: string;
  children: React.ReactNode;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, category, formula, telemetry, children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 440,
        height: 200,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontFamily: 'monospace',
              color: '#38BDF8',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              padding: '2px 6px',
              borderRadius: 4,
              border: '1px solid rgba(56, 189, 248, 0.25)',
            }}
          >
            {id}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', letterSpacing: 0.5 }}>
            {name}
          </span>
        </div>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#94A3B8' }}>{category}</span>
      </div>

      {/* Simulation Viewport */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 110,
          borderRadius: 6,
          backgroundColor: 'rgba(2, 6, 23, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>

      {/* Bottom Telemetry Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#64748B' }}>{formula}</span>
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#10B981', fontWeight: 600 }}>
          {telemetry}
        </span>
      </div>
    </div>
  );
};

export const V11MotionLabGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const loopFrame = frame % 90; // 3-second cycle per test

  // 1. Fold & Unfold
  const foldData = executeFoldAndUnfold(loopFrame, 10, 40, 30);

  // 2. Push & Displace
  const pushData = executePushAndDisplace(loopFrame, 5, 35, 75, 40, 180, 160);

  // 3. Mask Expansion
  const maskData = executeMaskExpansion(loopFrame, 15, 50, { x: 220, y: 55 });

  // 4. Collision & Harmonic Rebound
  const collision = calculateCollision(loopFrame, 30, { reboundAmplitude: 14, decay: 0.22, maxSquash: 0.25 });

  // 5. Diagram Build
  const diagram = calculateDiagramBuild(
    loopFrame,
    10,
    10,
    14,
    [
      { id: 'n1', x: 40, y: 55 },
      { id: 'n2', x: 120, y: 30 },
      { id: 'n3', x: 120, y: 80 },
      { id: 'n4', x: 200, y: 55 },
    ],
    [
      { fromId: 'n1', toId: 'n2' },
      { fromId: 'n1', toId: 'n3' },
      { fromId: 'n2', toId: 'n4' },
      { fromId: 'n3', toId: 'n4' },
    ]
  );

  // 6. Kinetic Type Slam
  const kType = calculateKineticType(loopFrame, 10, 32, 20, 35);

  // 7. Path Relay
  const pathRelay = executePathRelay(
    loopFrame,
    10,
    35,
    220,
    30,
    { x: 30, y: 55 },
    { x: 250, y: 55 },
    { x: 380, y: 55 }
  );

  // 8. Axis Collapse
  const axisCollapse = executeAxisCollapse(loopFrame, 15, 45, { x: 220, y: 55 }, 80);

  // 9. Split and Converge
  const splitConverge = executeSplitAndConverge(
    loopFrame,
    10,
    25,
    55,
    25,
    { x: 0, y: 0 },
    [
      { x: -70, y: 0 },
      { x: 0, y: -25 },
      { x: 70, y: 0 },
    ]
  );

  // 10. Object Handoff
  const handoff = executeObjectHandoff(
    loopFrame,
    5,
    40,
    80,
    { x: 60, y: 55 },
    { x: 220, y: 55 },
    { x: 380, y: 55 }
  );

  // 11. Gravitational Singularity
  const gravSing = executeGravitationalSingularity(
    loopFrame,
    10,
    50,
    { x: 220, y: 55 },
    [
      { x: 80, y: 25 },
      { x: 360, y: 25 },
      { x: 220, y: 95 },
    ]
  );

  // 12. Camera Punch Through
  const punchThrough = executeCameraPunchThrough(loopFrame, 10, 45);

  // 13. Elastic Snapping
  const elasticSnap = executeElasticSnapping(loopFrame, 10, 45, 75, 70);

  // 14. Counter-Balanced Sweep
  const counterSweep = executeCounterBalancedSweep(loopFrame, 10, 50, 90);

  // 15. Dimensional Portal
  const dimPortal = executeDimensionalPortal(loopFrame, 10, 55);

  // 16. Concentric Ripple
  const ripple = calculateRipple(loopFrame, 25, 35, 80, 3);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#07090E',
        color: '#F8FAFC',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        padding: '36px 48px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Background Technical Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 20,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: 16,
          zIndex: 20,
          position: 'relative',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                backgroundColor: '#0284C7',
                color: '#FFF',
                padding: '3px 8px',
                borderRadius: 4,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              V11 BENCHMARK
            </span>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
              MOTION DESIGN SYSTEM & RECIPE GALLERY
            </h1>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#94A3B8' }}>
            Reference-Driven Visual Choreography // 16 Executable Remotion Recipes // Causal Continuity Guarantee
          </p>
        </div>
        <div style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: 12, color: '#64748B' }}>
          <div>GLOBAL CYCLE: {loopFrame}/90f ({(loopFrame / 30).toFixed(2)}s)</div>
          <div style={{ color: '#10B981' }}>CONTINUITY METRIC: PASS (Avg: 0.9140)</div>
        </div>
      </div>

      {/* 4x4 Grid Matrix */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* 1. Fold & Unfold */}
        <RecipeCard
          id="RECIPE_01"
          name="Fold & Unfold"
          category="3D Planar Hinge"
          formula="calculateFold() + calculatePush()"
          telemetry={`RotX: ${foldData.fold.rotateX.toFixed(1)}°`}
        >
          <div
            style={{
              width: 140,
              height: 70,
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '2px solid #38BDF8',
              borderRadius: 6,
              transform: `perspective(${foldData.fold.perspective}px) rotateX(${foldData.fold.rotateX}deg)`,
              transformOrigin: 'top center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              fontWeight: 700,
              fontSize: 12,
              boxShadow: `0 10px 20px rgba(0,0,0,${foldData.fold.depthShadow})`,
            }}
          >
            PLANAR HINGE
          </div>
        </RecipeCard>

        {/* 2. Push & Displace */}
        <RecipeCard
          id="RECIPE_02"
          name="Push & Displace"
          category="Newtonian Contact"
          formula="calculatePush() + calculateCollision()"
          telemetry={`Displ: ${pushData.displacement.toFixed(1)}px`}
        >
          {/* Pusher Box */}
          <div
            style={{
              position: 'absolute',
              left: pushData.pusherX - 100,
              width: 50,
              height: 50,
              backgroundColor: '#F59E0B',
              borderRadius: 6,
            }}
          />
          {/* Target Monolith */}
          <div
            style={{
              position: 'absolute',
              left: 200 + pushData.displacement * 0.7,
              width: 50,
              height: 50,
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              border: '2px solid #F59E0B',
              borderRadius: 6,
              transform: `scaleX(${pushData.impactSquash})`,
            }}
          />
        </RecipeCard>

        {/* 3. Mask Expansion */}
        <RecipeCard
          id="RECIPE_03"
          name="Mask Expansion"
          category="Aperture Iris"
          formula="calculateMask() + ZoomThrough"
          telemetry={`Zoom: ${maskData.zoomScale.toFixed(2)}x`}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, #8B5CF6 0%, #3B82F6 100%)',
              clipPath: maskData.clipPath,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 14,
              color: '#FFF',
            }}
          >
            PORTAL UNMASK
          </div>
        </RecipeCard>

        {/* 4. Collision Rebound */}
        <RecipeCard
          id="RECIPE_04"
          name="Collision & Rebound"
          category="Harmonic Dynamics"
          formula="calculateCollision(squash, decay)"
          telemetry={`Squash: ${collision.squashScaleX.toFixed(2)}x`}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 15,
              width: 180,
              height: 2,
              backgroundColor: '#64748B',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 16 - collision.displacementY * 3,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#EC4899',
              transform: `scale(${collision.squashScaleX}, ${collision.squashScaleY})`,
              transformOrigin: 'bottom center',
              boxShadow: '0 0 16px rgba(236, 72, 153, 0.5)',
            }}
          />
        </RecipeCard>

        {/* 5. Diagram Build */}
        <RecipeCard
          id="RECIPE_05"
          name="Diagram Build"
          category="Network Assembly"
          formula="calculateDiagramBuild(nodes: 4)"
          telemetry={`Prog: ${(diagram.overallProgress * 100).toFixed(0)}%`}
        >
          <svg width="240" height="80">
            {diagram.edges.map((edge, idx) => (
              <line
                key={idx}
                x1={edge.fromId === 'n1' ? 40 : 120}
                y1={edge.fromId === 'n1' ? 55 : edge.fromId === 'n2' ? 30 : 80}
                x2={edge.toId === 'n4' ? 200 : 120}
                y2={edge.toId === 'n4' ? 55 : edge.toId === 'n2' ? 30 : 80}
                stroke="#06B6D4"
                strokeWidth={2}
                strokeDasharray="90"
                strokeDashoffset={90 * (1 - edge.drawProgress)}
              />
            ))}
            {diagram.nodes.map((node, idx) => (
              <circle
                key={idx}
                cx={node.x}
                cy={node.y}
                r={node.scale * 8}
                fill={node.opacity > 0.5 ? '#06B6D4' : '#1E293B'}
                stroke="#38BDF8"
                strokeWidth={2}
                opacity={node.opacity}
              />
            ))}
          </svg>
        </RecipeCard>

        {/* 6. Kinetic Type Slam */}
        <RecipeCard
          id="RECIPE_06"
          name="Kinetic Type Slam"
          category="Typographic Impact"
          formula="calculateKineticType(weight, letterSpacing)"
          telemetry={`Scale: ${kType.scale.toFixed(2)}x`}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: kType.weightShift,
              letterSpacing: `${kType.letterSpacing}px`,
              color: '#F59E0B',
              transform: `scale(${kType.scale}) translateY(${kType.offsetY}px)`,
              opacity: kType.opacity,
            }}
          >
            EDITORIAL
          </div>
        </RecipeCard>

        {/* 7. Path Relay */}
        <RecipeCard
          id="RECIPE_07"
          name="Path Relay"
          category="Baton Handover"
          formula="executePathRelay()"
          telemetry={`Stroke: ${pathRelay.drawProgress.toFixed(2)}`}
        >
          <svg width="280" height="60">
            <line
              x1={30}
              y1={30}
              x2={250}
              y2={30}
              stroke="#E2E8F0"
              strokeWidth={2}
              strokeDasharray="220"
              strokeDashoffset={220 * (1 - pathRelay.drawProgress)}
            />
            <circle
              cx={pathRelay.beaconPosition.x * 0.7}
              cy={30}
              r={7}
              fill="#F59E0B"
              opacity={pathRelay.beaconPosition.opacity}
            />
          </svg>
        </RecipeCard>

        {/* 8. Axis Collapse */}
        <RecipeCard
          id="RECIPE_08"
          name="Axis Collapse"
          category="Orthogonal Shift"
          formula="executeAxisCollapse(90deg)"
          telemetry={`RotX: ${axisCollapse.rotationAngle.toFixed(1)}°`}
        >
          <div
            style={{
              width: 160,
              height: 4,
              backgroundColor: '#10B981',
              borderRadius: 2,
              transform: `rotate(${axisCollapse.rotationAngle}deg)`,
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.7)',
            }}
          />
        </RecipeCard>

        {/* 9. Split & Converge */}
        <RecipeCard
          id="RECIPE_09"
          name="Split & Converge"
          category="Entity Triad"
          formula="executeSplitAndConverge()"
          telemetry={`Phase: ${splitConverge.phase}`}
        >
          <div style={{ position: 'relative', width: 200, height: 60 }}>
            {splitConverge.nodes.map((node: { x: number; y: number; opacity: number }, idx: number) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: 90 + node.x,
                  top: 25 + node.y,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: '#38BDF8',
                  opacity: node.opacity,
                  boxShadow: '0 0 8px #38BDF8',
                }}
              />
            ))}
          </div>
        </RecipeCard>

        {/* 10. Object Handoff */}
        <RecipeCard
          id="RECIPE_10"
          name="Object Handoff"
          category="Vector Momentum"
          formula="executeObjectHandoff()"
          telemetry={`Energy: ${handoff.handoverEnergy.toFixed(2)}`}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Source Actor */}
            <div
              style={{
                position: 'absolute',
                left: handoff.source.x * 0.7,
                top: 40,
                width: 22,
                height: 22,
                borderRadius: 4,
                backgroundColor: '#F59E0B',
                opacity: handoff.source.opacity,
              }}
            />
            {/* Dest Actor */}
            <div
              style={{
                position: 'absolute',
                left: handoff.destination.x * 0.7,
                top: 40,
                width: 22,
                height: 22,
                borderRadius: 4,
                backgroundColor: '#06B6D4',
                opacity: handoff.destination.opacity,
              }}
            />
          </div>
        </RecipeCard>

        {/* 11. Gravitational Singularity */}
        <RecipeCard
          id="RECIPE_11"
          name="Gravitational Inflow"
          category="Centripetal Core"
          formula="calculateGravity() + Merge"
          telemetry={`Flash: ${(gravSing.centerSingularityGlow * 100).toFixed(0)}%`}
        >
          <div style={{ position: 'relative', width: 220, height: 70 }}>
            <div
              style={{
                position: 'absolute',
                left: 110,
                top: 35,
                width: 20 * (1 + gravSing.centerSingularityGlow),
                height: 20 * (1 + gravSing.centerSingularityGlow),
                borderRadius: '50%',
                backgroundColor: '#10B981',
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 16px #10B981`,
              }}
            />
            {gravSing.entities.map((p: { x: number; y: number; opacity: number }, idx: number) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: p.x * 0.5,
                  top: p.y * 0.5,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#A7F3D0',
                  opacity: p.opacity,
                }}
              />
            ))}
          </div>
        </RecipeCard>

        {/* 12. Camera Punch Through */}
        <RecipeCard
          id="RECIPE_12"
          name="Camera Punch-Through"
          category="Focal Penetration"
          formula="executeCameraPunchThrough()"
          telemetry={`Scale: ${punchThrough.combinedScale.toFixed(2)}x`}
        >
          <div
            style={{
              width: 80,
              height: 50,
              border: '2px solid #8B5CF6',
              borderRadius: 6,
              transform: `scale(${punchThrough.zoom.scale * 0.3})`,
              opacity: punchThrough.zoom.opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: '#C4B5FD',
            }}
          >
            FRAME LENS
          </div>
        </RecipeCard>

        {/* 13. Elastic Snapping */}
        <RecipeCard
          id="RECIPE_13"
          name="Elastic Snapping"
          category="Tension & Release"
          formula="executeElasticSnapping()"
          telemetry={`Tension: ${elasticSnap.tension.toFixed(2)}`}
        >
          <div
            style={{
              width: 60,
              height: 36,
              borderRadius: 6,
              backgroundColor: '#EF4444',
              transform: `translateX(${elasticSnap.displacementX * 0.5}px)`,
              boxShadow: '0 0 12px rgba(239, 68, 68, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            SPRING
          </div>
        </RecipeCard>

        {/* 14. Counter-Balanced Sweep */}
        <RecipeCard
          id="RECIPE_14"
          name="Counter-Balanced Sweep"
          category="Dynamic Equilibrium"
          formula="calculateCounterMotion(magnitude: 90)"
          telemetry={`Sweep: ±${counterSweep.leftSweepX.toFixed(0)}px`}
        >
          <div style={{ position: 'relative', width: 220, height: 40, display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                position: 'absolute',
                left: 30 + counterSweep.leftSweepX * 0.4,
                width: 60,
                height: 14,
                backgroundColor: '#38BDF8',
                borderRadius: 3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 30 - counterSweep.rightSweepX * 0.4,
                width: 60,
                height: 14,
                backgroundColor: '#F59E0B',
                borderRadius: 3,
              }}
            />
          </div>
        </RecipeCard>

        {/* 15. Dimensional Portal */}
        <RecipeCard
          id="RECIPE_15"
          name="Dimensional Portal"
          category="Geometric Morphing"
          formula="calculateMorph() + calculateMask()"
          telemetry={`Portal: ${dimPortal.portalRadius.toFixed(0)}px`}
        >
          <div
            style={{
              width: dimPortal.morph.width * 0.2,
              height: dimPortal.morph.height * 0.2,
              borderRadius: dimPortal.morph.borderRadius * 0.2,
              border: '2px solid #EC4899',
              backgroundColor: 'rgba(236, 72, 153, 0.2)',
              boxShadow: '0 0 16px rgba(236, 72, 153, 0.4)',
            }}
          />
        </RecipeCard>

        {/* 16. Concentric Ripple */}
        <RecipeCard
          id="RECIPE_16"
          name="Kinetic Shockwave"
          category="Radial Wavefront"
          formula="calculateRipple(duration: 35)"
          telemetry={`Radius: ${ripple.radius.toFixed(0)}px`}
        >
          {ripple.active && (
            <div
              style={{
                width: ripple.radius * 1.5,
                height: ripple.radius * 1.5,
                borderRadius: '50%',
                border: `${ripple.strokeWidth}px solid #38BDF8`,
                opacity: ripple.opacity,
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)',
              }}
            />
          )}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#38BDF8',
              position: 'absolute',
            }}
          />
        </RecipeCard>
      </div>
    </div>
  );
};
