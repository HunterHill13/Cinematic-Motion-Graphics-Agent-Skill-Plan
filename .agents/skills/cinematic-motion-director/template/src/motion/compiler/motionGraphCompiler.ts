/**
 * ============================================================================
 * MOTION GRAPH COMPILER (PHASE 4B)
 * ============================================================================
 * 
 * Compiles a machine-readable MotionSceneGraph into fully certified, executable
 * TransformationContracts backed by VerbTemplates and PersistentWorld runtime.
 * 
 * Zero raw JSX animation escape hatches.
 * Enforces Causal State Chains:
 *   STATE A -> TRIGGER -> FORCE -> VERB -> STATE B -> CONSEQUENCE
 * ============================================================================
 */

import {
  TransformationContract,
  Vector3D,
  MotionVerb,
} from '../grammar/motionGrammar';
import {
  createSplitTemplate,
  createExpandTemplate,
  createTravelTemplate,
  createCollapseTemplate,
  createMorphTemplate,
  createMergeTemplate,
  createDeformTemplate,
  createReassembleTemplate,
  ExecutableVerbResult,
} from '../grammar/verbTemplates';
import {
  MotionSceneGraph,
  MotionEntityNode,
  MotionTransformationNode,
  CameraKeyframeSpec,
  MotionGraphValidationResult,
  MotionGraphValidationIssue,
} from './motionSceneGraph';
import { VisualWorldValidator } from '../visual_world/visualWorldValidator';
import { MaterialValidator } from '../visual_world/materialValidator';
import { LightingValidator } from '../visual_world/lightingValidator';
import { DepthValidator } from '../visual_world/depthValidator';

export interface CompiledMotionScene {
  sceneId: string;
  totalDurationFrames: number;
  contracts: TransformationContract[];
  cameraTrajectory: CameraKeyframeSpec[];
  world: {
    width: number;
    height: number;
    depthEnabled: boolean;
    backgroundColor: string;
  };
  entities: MotionEntityNode[];
}

export class MotionGraphCompiler {
  /**
   * Pre-compilation Validation Gate
   */
  public static validateGraph(graph: MotionSceneGraph): MotionGraphValidationResult {
    const issues: MotionGraphValidationIssue[] = [];

    // 1. Verify Entity Integrity
    const heroEntities = graph.entities.filter((e) => e.role === 'HERO');
    if (heroEntities.length === 0) {
      issues.push({
        code: 'MOTION_GRAPH_NON_PERSISTENT_HERO',
        message: 'Scene graph must declare at least one primary HERO entity.',
      });
    }

    const entityMap = new Map<string, MotionEntityNode>();
    for (const entity of graph.entities) {
      entityMap.set(entity.id, entity);
    }

    // 2. Verify HERO persistence across entire graph duration
    for (const hero of heroEntities) {
      if (!hero.persistent && hero.lifecycle === 'PERSIST') {
        issues.push({
          code: 'MOTION_GRAPH_NON_PERSISTENT_HERO',
          entityId: hero.id,
          message: `Hero entity "${hero.id}" is marked non-persistent without explicit causal termination lifecycle.`,
        });
      }
    }

    // 3. Verify Transformations: Causal Chain, Verb, Trigger, Consequence, Middle-Window
    if (!graph.transformations || graph.transformations.length === 0) {
      issues.push({
        code: 'MOTION_GRAPH_UNRESOLVED_TRANSFORMATION',
        message: 'MotionSceneGraph has zero transformation nodes. Slideshow detected.',
      });
    }

    for (const node of graph.transformations) {
      // 3a. Verb presence
      if (!node.verb) {
        issues.push({
          code: 'MOTION_GRAPH_MISSING_VERB',
          nodeId: node.id,
          shotId: node.shotId,
          message: `Transformation node "${node.id}" has no motion verb assigned.`,
        });
      }

      // 3b. Trigger presence
      if (!node.trigger || !node.trigger.narrationMarker || !node.trigger.forceType) {
        issues.push({
          code: 'MOTION_GRAPH_MISSING_TRIGGER',
          nodeId: node.id,
          shotId: node.shotId,
          message: `Transformation node "${node.id}" violates causal law: missing narrationMarker or physical forceType in trigger.`,
        });
      }

      // 3c. Consequence presence
      if (!node.consequence || !node.consequence.exitMomentum || !node.consequence.spatialResolution) {
        issues.push({
          code: 'MOTION_GRAPH_MISSING_CONSEQUENCE',
          nodeId: node.id,
          shotId: node.shotId,
          message: `Transformation node "${node.id}" violates causal law: missing downstream exitMomentum or spatialResolution.`,
        });
      }

      // 3d. Entity Reference Resolution
      for (const srcId of node.sourceEntityIds) {
        if (!entityMap.has(srcId)) {
          issues.push({
            code: 'MOTION_GRAPH_UNRESOLVED_TRANSFORMATION',
            nodeId: node.id,
            entityId: srcId,
            message: `Transformation node "${node.id}" references undeclared entity id "${srcId}".`,
          });
        }
      }

      // 3e. Middle-Window Requirement
      const shotDuration = Math.max(1, node.endFrame - node.startFrame);
      const midStart = node.startFrame + shotDuration * 0.20;
      const midEnd = node.startFrame + shotDuration * 0.80;

      // Trigger must activate before or at start of middle window
      if (node.trigger && node.trigger.frame > midEnd) {
        issues.push({
          code: 'MOTION_GRAPH_STATIC_MIDDLE_WINDOW',
          nodeId: node.id,
          shotId: node.shotId,
          message: `Transformation trigger occurs at frame ${node.trigger.frame}, past middle 60% window (${Math.round(midStart)}-${Math.round(midEnd)}).`,
        });
      }
    }

    // 4. Camera Separation vs Hero Motion Check
    if (graph.camera && graph.camera.keyframes.length > 1) {
      // Check if camera moves while all hero nodes are static during that window
      const hasAnyHeroTransformation = graph.transformations.some((t) => {
        const sourceHeroes = t.sourceEntityIds.some((id) => entityMap.get(id)?.role === 'HERO');
        return sourceHeroes;
      });

      if (!hasAnyHeroTransformation) {
        issues.push({
          code: 'MOTION_GRAPH_CAMERA_ONLY',
          message: 'Camera trajectory moves across scene, but zero hero transformations are scheduled. Camera movement cannot substitute for hero transformation.',
        });
      }
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  /**
   * Compiles MotionSceneGraph into Executable Contracts & Templates
   */
  public static compileGraph(graph: MotionSceneGraph): CompiledMotionScene {
    const validation = this.validateGraph(graph);
    if (!validation.valid) {
      const errList = validation.issues.map((i) => `[${i.code}] ${i.message}`).join('\n');
      throw new Error(`Failed to compile MotionSceneGraph "${graph.sceneId}":\n${errList}`);
    }

    const compiledContracts: TransformationContract[] = [];

    for (const node of graph.transformations) {
      const primaryHero = graph.entities.find((e) => node.sourceEntityIds.includes(e.id) && e.role === 'HERO')
        || graph.entities.find((e) => node.sourceEntityIds.includes(e.id))
        || graph.entities[0];

      const templateResult = this.compileTransformationNode(node, primaryHero);
      compiledContracts.push(templateResult.contract);
      node.contract = templateResult.contract;
    }

    const cameraKeyframes = graph.camera?.keyframes || [
      { frame: 0, position: { x: 0, y: 0, z: 0 }, zoom: 1.0 },
    ];

    return {
      sceneId: graph.sceneId,
      totalDurationFrames: graph.totalDurationFrames,
      contracts: compiledContracts,
      cameraTrajectory: cameraKeyframes,
      world: {
        width: graph.world.width,
        height: graph.world.height,
        depthEnabled: graph.world.depthEnabled,
        backgroundColor: graph.world.backgroundColor || '#0A0E1A',
      },
      entities: graph.entities,
    };
  }

  /**
   * ========================================================================
   * PHASE-5 CINEMATIC DIRECTOR PIPELINE COMPILER (HARD-GATED)
   * ========================================================================
   * 
   * Strict architectural gate for Cinematic Director execution:
   *   1. Requires non-null visualWorld (VISUAL_WORLD_REQUIRED)
   *   2. Enforces VisualWorldValidator rules V1-V8 (VISUAL_WORLD_INVALID / V8_HERO_MISMATCH)
   *   3. Enforces Hero identity consistency: VisualWorld.hero.id === MotionSceneGraph.hero.id
   *   4. Enforces non-ambiguous ArtDirection
   * 
   * Low-level legacy compiler (compileGraph) remains callable only for historical
   * Phase 1-4B low-level unit tests.
   */
  public static compileCinematicGraph(graph: MotionSceneGraph): CompiledMotionScene {
    if (!graph.visualWorld) {
      const error = new Error(
        '[VISUAL_WORLD_REQUIRED] Cinematic Director pipeline requires a validated VisualWorld before MotionSceneGraph compilation. Cannot proceed with motion without an established Visual World.'
      );
      (error as any).code = 'VISUAL_WORLD_REQUIRED';
      throw error;
    }

    const worldReport = VisualWorldValidator.validate(graph.visualWorld, graph);
    if (!worldReport.passed) {
      // Prioritize specific semantic error codes if present
      const heroMismatch = worldReport.violations.find((v) => v.code === 'V8_HERO_MISMATCH');
      const ambiguity = worldReport.violations.find((v) => v.code === 'V6_AMBIGUOUS_ART_DIRECTION' || v.code === 'VISUAL_DIRECTION_AMBIGUOUS');
      const targetViolation = heroMismatch || ambiguity || worldReport.violations[0];

      let mappedCode = 'VISUAL_WORLD_INVALID';
      if (targetViolation.code === 'V8_HERO_MISMATCH') {
        mappedCode = 'V8_HERO_MISMATCH';
      } else if (targetViolation.code === 'VISUAL_DIRECTION_AMBIGUOUS' || targetViolation.code === 'V6_AMBIGUOUS_ART_DIRECTION') {
        mappedCode = 'VISUAL_DIRECTION_AMBIGUOUS';
      }

      const error = new Error(`[${mappedCode}] VisualWorld violation in cinematic pipeline: ${targetViolation.message}`);
      (error as any).code = mappedCode;
      (error as any).violationCode = targetViolation.code;
      throw error;
    }

    // 2. Material Governance & Hero Material Hard-Gate (Phase 5B.1)
    const materialReport = MaterialValidator.validate(graph.visualWorld, graph);
    if (!materialReport.passed) {
      const heroMissing = materialReport.violations.find((v) => v.code === 'V_M1_MISSING_HERO_MATERIAL');
      const ambiguity = materialReport.violations.find((v) => v.code === 'MATERIAL_DIRECTION_AMBIGUOUS');
      const targetViolation = heroMissing || ambiguity || materialReport.violations[0];

      let mappedCode = 'MATERIAL_INVALID';
      if (targetViolation.code === 'V_M1_MISSING_HERO_MATERIAL') {
        mappedCode = 'MATERIAL_REQUIRED';
      } else if (targetViolation.code === 'MATERIAL_DIRECTION_AMBIGUOUS') {
        mappedCode = 'MATERIAL_DIRECTION_AMBIGUOUS';
      }

      const error = new Error(`[${mappedCode}] Material violation in cinematic pipeline: ${targetViolation.message}`);
      (error as any).code = mappedCode;
      (error as any).violationCode = targetViolation.code;
      throw error;
    }

    // 3. Lighting Governance & Hero Lighting Hard-Gate (Phase 5B.2)
    const lightingReport = LightingValidator.validate(graph.visualWorld, graph);
    if (!lightingReport.passed) {
      const missingLighting = lightingReport.violations.find((v) => v.code === 'V_L1_MISSING_LIGHTING');
      const heroMissingLighting = lightingReport.violations.find((v) => v.code === 'V_L2_MISSING_HERO_LIGHTING');
      const ambiguity = lightingReport.violations.find((v) => v.code === 'LIGHTING_DIRECTION_AMBIGUOUS');
      const targetViolation = missingLighting || heroMissingLighting || ambiguity || lightingReport.violations[0];

      let mappedCode = 'LIGHTING_INVALID';
      if (targetViolation.code === 'V_L1_MISSING_LIGHTING' || targetViolation.code === 'V_L2_MISSING_HERO_LIGHTING') {
        mappedCode = 'LIGHTING_REQUIRED';
      } else if (targetViolation.code === 'LIGHTING_DIRECTION_AMBIGUOUS') {
        mappedCode = 'LIGHTING_DIRECTION_AMBIGUOUS';
      }

      const error = new Error(`[${mappedCode}] Lighting violation in cinematic pipeline: ${targetViolation.message}`);
      (error as any).code = mappedCode;
      (error as any).violationCode = targetViolation.code;
      throw error;
    }

    // 4. Spatial Depth Governance & 2.5D Layering Hard-Gate (Phase 5C)
    const depthReport = DepthValidator.validate(graph.visualWorld, graph);
    if (!depthReport.passed) {
      const missingSpatial = depthReport.violations.find((v) => v.code === 'V_D1_MISSING_SPATIAL_CONTRACT');
      const heroMissing = depthReport.violations.find((v) => v.code === 'V_D2_MISSING_HERO_SPATIAL');
      const depthCollapse = depthReport.violations.find((v) => v.code === 'V_D11_DEPTH_COLLAPSE');
      const ambiguity = depthReport.violations.find((v) => v.code === 'DEPTH_DIRECTION_AMBIGUOUS');
      const targetViolation = missingSpatial || heroMissing || depthCollapse || ambiguity || depthReport.violations[0];

      let mappedCode = 'SPATIAL_INVALID';
      if (targetViolation.code === 'V_D1_MISSING_SPATIAL_CONTRACT' || targetViolation.code === 'V_D2_MISSING_HERO_SPATIAL') {
        mappedCode = 'SPATIAL_REQUIRED';
      } else if (targetViolation.code === 'V_D11_DEPTH_COLLAPSE') {
        mappedCode = 'DEPTH_COLLAPSE_DETECTED';
      } else if (targetViolation.code === 'DEPTH_DIRECTION_AMBIGUOUS') {
        mappedCode = 'DEPTH_DIRECTION_AMBIGUOUS';
      }

      const error = new Error(`[${mappedCode}] Spatial depth violation in cinematic pipeline: ${targetViolation.message}`);
      (error as any).code = mappedCode;
      (error as any).violationCode = targetViolation.code;
      throw error;
    }

    // Delegate to core compiler once Visual World, Material, Lighting, and Spatial contracts are certified
    return this.compileGraph(graph);
  }

  /**
   * Compiles an individual TransformationNode into the corresponding VerbTemplate
   */
  public static compileTransformationNode(
    node: MotionTransformationNode,
    hero: MotionEntityNode
  ): ExecutableVerbResult {
    const { verb, shotId, startFrame, endFrame, trigger, consequence, spatialIntent } = node;

    switch (verb) {
      case 'SPLIT': {
        return createSplitTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          origin: spatialIntent.origin,
          separationDistance: spatialIntent.separationDistance ?? 320,
          splitAxis: 'horizontal',
          daughterCount: spatialIntent.fragmentCount ?? 2,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      case 'EXPAND': {
        const fromScale = spatialIntent.scaleShift?.from ?? hero.initialState.scale ?? 0.65;
        const toScale = spatialIntent.scaleShift?.to ?? 1.4;
        return createExpandTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          anchor: spatialIntent.origin,
          initialScale: fromScale,
          expandedScale: toScale,
          ringLayersCount: 3,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      case 'TRAVEL': {
        const toPos = spatialIntent.target ?? {
          x: spatialIntent.origin.x + (spatialIntent.separationDistance ?? 700),
          y: spatialIntent.origin.y,
          z: spatialIntent.origin.z,
        };
        return createTravelTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          from: spatialIntent.origin,
          to: toPos,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      case 'COLLAPSE': {
        const fromScale = spatialIntent.scaleShift?.from ?? hero.initialState.scale ?? 1.6;
        const toScale = spatialIntent.scaleShift?.to ?? 0.35;
        return createCollapseTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          center: spatialIntent.origin,
          initialScale: fromScale,
          collapsedScale: toScale,
          spinDegrees: spatialIntent.rotationShiftDeg ?? 360,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      case 'MORPH': {
        return createMorphTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          center: spatialIntent.origin,
          fromGeometry: hero.initialState.geometry || 'circle',
          toGeometry: spatialIntent.morphTargetGeometry || 'hexagonal_monolith',
          fromDimensions: { width: 120, height: 120, borderRadius: 60 },
          toDimensions: { width: 260, height: 130, borderRadius: 16 },
          rotationShift: spatialIntent.rotationShiftDeg ?? 45,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      case 'MERGE': {
        const originA: Vector3D = { x: spatialIntent.origin.x - 350, y: spatialIntent.origin.y, z: 0 };
        const originB: Vector3D = { x: spatialIntent.origin.x + 350, y: spatialIntent.origin.y, z: 0 };
        return createMergeTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          barycenter: spatialIntent.origin,
          origins: [originA, originB],
          mergedScale: spatialIntent.scaleShift?.to ?? 1.4,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      case 'DEFORM': {
        return createDeformTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          anchor: spatialIntent.origin,
          maxSquash: spatialIntent.maxSquash ?? 1.5,
          maxShearDeg: spatialIntent.maxShearDeg ?? 22,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      case 'REASSEMBLE': {
        return createReassembleTemplate({
          shotId,
          heroId: hero.id,
          heroLabel: hero.label,
          startFrame,
          endFrame,
          assemblyCenter: spatialIntent.origin,
          scatterRadius: spatialIntent.separationDistance ?? 280,
          fragmentCount: spatialIntent.fragmentCount ?? 4,
          finalScale: spatialIntent.scaleShift?.to ?? 1.3,
          triggerFrame: trigger.frame,
          forceType: trigger.forceType,
          narrationMarker: trigger.narrationMarker,
        });
      }

      default: {
        throw new Error(`Unsupported motion verb: "${verb}"`);
      }
    }
  }
}
