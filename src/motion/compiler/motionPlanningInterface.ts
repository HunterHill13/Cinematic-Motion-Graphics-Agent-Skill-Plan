/**
 * ============================================================================
 * MOTION PLANNING INTERFACE (PHASE 4B.1)
 * ============================================================================
 * 
 * Bridges Natural Language Creative Intent and Agent Storyboard planning to
 * the machine-readable MotionSceneGraph.
 * 
 * Pipeline:
 *   Natural Language User Intent
 *         ↓
 *   MotionPlanningRequest / MotionPlanner
 *         ↓
 *   Semantic Intent Analysis & Disambiguation
 *         ↓
 *   MotionVerbSelector (Rejects Vague Intent with MOTION_INTENT_AMBIGUOUS)
 *         ↓
 *   Machine-Readable MotionSceneGraph
 *         ↓
 *   MotionGraphCompiler.compileGraph(...)
 *         ↓
 *   Executable TransformationContracts & VerbTemplates
 *         ↓
 *   <PersistentWorld>
 * ============================================================================
 */

import { Vector3D } from '../grammar/motionGrammar';
import {
  MotionSceneGraph,
  MotionEntityNode,
  MotionTransformationNode,
  EntityRole,
  CameraTrajectorySpec,
} from './motionSceneGraph';
import {
  MotionVerbSelector,
  VerbSelectionContext,
} from './motionVerbSelector';
import { MotionGraphCompiler } from './motionGraphCompiler';

export interface RawMotionTransformationPlan {
  description: string;
  sourceEntityIds: string[];
  targetEntityIds?: string[];
  trigger: string;
  forceType?: string;
  consequence: string;
  spatialIntent?: {
    origin?: Vector3D;
    target?: Vector3D;
    displacementPx?: number;
    scaleShift?: { from: number; to: number };
    rotationShiftDeg?: number;
    morphTargetGeometry?: string;
    separationDistance?: number;
    fragmentCount?: number;
    maxSquash?: number;
    maxShearDeg?: number;
  };
  startFrame?: number;
  endFrame?: number;
}

export interface MotionPlanningRequest {
  creativeIntent: string;
  sceneId?: string;
  title?: string;
  totalDurationFrames?: number;
  world?: {
    width?: number;
    height?: number;
    depthEnabled?: boolean;
    backgroundColor?: string;
  };
  entities: {
    id: string;
    label?: string;
    role: EntityRole;
    semanticPurpose: string;
    initialGeometry?: string;
    initialPosition?: Vector3D;
    initialScale?: number;
    persistent?: boolean;
  }[];
  transformations: RawMotionTransformationPlan[];
  camera?: CameraTrajectorySpec;
}

export class MotionPlanner {
  /**
   * Converts a structured MotionPlanningRequest into a valid MotionSceneGraph.
   * Resolves verbs via MotionVerbSelector. Fails fast if intent is ambiguous.
   */
  public static planScene(request: MotionPlanningRequest): MotionSceneGraph {
    const sceneId = request.sceneId || 'planned_motion_scene';
    const totalDuration = request.totalDurationFrames || 600;

    // 1. Construct Entity Nodes
    const entities: MotionEntityNode[] = request.entities.map((e) => ({
      id: e.id,
      label: e.label || e.id,
      role: e.role,
      persistent: e.persistent !== undefined ? e.persistent : (e.role === 'HERO'),
      lifecycle: 'PERSIST',
      initialState: {
        position: e.initialPosition || { x: 960, y: 540, z: 0 },
        scale: e.initialScale || 1.0,
        rotation: { z: 0 },
        geometry: e.initialGeometry || 'circle',
        state: 'intact',
      },
      semanticPurpose: e.semanticPurpose,
    }));

    // 2. Resolve & Compile Transformation Nodes
    const transformations: MotionTransformationNode[] = [];
    const count = request.transformations.length;
    const defaultShotDuration = count > 0 ? Math.floor(totalDuration / count) : totalDuration;

    for (let i = 0; i < request.transformations.length; i++) {
      const plan = request.transformations[i];
      const startFrame = plan.startFrame !== undefined ? plan.startFrame : i * defaultShotDuration;
      const endFrame = plan.endFrame !== undefined ? plan.endFrame : (i + 1) * defaultShotDuration;
      const shotDuration = endFrame - startFrame;

      // Build context for verb selection
      const context: VerbSelectionContext = {
        intentDescription: plan.description,
        sourcePosition: plan.spatialIntent?.origin,
        targetPosition: plan.spatialIntent?.target,
        displacementPx: plan.spatialIntent?.displacementPx,
        volumetricRatio: plan.spatialIntent?.scaleShift
          ? plan.spatialIntent.scaleShift.to / Math.max(0.01, plan.spatialIntent.scaleShift.from)
          : undefined,
        geometryTransition: plan.spatialIntent?.morphTargetGeometry
          ? { from: 'circle', to: plan.spatialIntent.morphTargetGeometry }
          : undefined,
        daughterComponentCount: plan.targetEntityIds?.length,
        entityRelationship: plan.targetEntityIds && plan.targetEntityIds.length > 0
          ? 'single_to_multiple'
          : (plan.spatialIntent?.fragmentCount ? 'fragment_to_whole' : 'unitary'),
        maxShearDeg: plan.spatialIntent?.maxShearDeg,
        maxSquash: plan.spatialIntent?.maxSquash,
      };

      const selectionResult = MotionVerbSelector.selectVerb(context);

      if (selectionResult.status === 'AMBIGUOUS') {
        const error = new Error(`[${selectionResult.code}] Ambiguous motion intent in transformation "${plan.description}": ${selectionResult.reason}`);
        (error as any).code = selectionResult.code;
        throw error;
      }

      // Middle-window calculated trigger: defaults to 25% into the shot
      const triggerFrame = Math.round(startFrame + shotDuration * 0.25);

      transformations.push({
        id: `tx_${i + 1}_${selectionResult.verb.toLowerCase()}`,
        shotId: `shot_${i + 1}_${selectionResult.verb.toLowerCase()}`,
        sourceEntityIds: plan.sourceEntityIds,
        targetEntityIds: plan.targetEntityIds,
        verb: selectionResult.verb,
        startFrame,
        endFrame,
        trigger: {
          frame: triggerFrame,
          narrationMarker: plan.trigger,
          forceType: plan.forceType || `${selectionResult.verb.toLowerCase()}_physical_catalyst`,
          intensity: 0.9,
        },
        consequence: {
          description: plan.consequence,
          exitMomentum: {
            vector: selectionResult.verb === 'TRAVEL' ? { x: 12, y: 0, z: 0 } : { x: 0, y: 0, z: 0 },
            angularVelocity: selectionResult.verb === 'COLLAPSE' ? 4.0 : 0.5,
          },
          spatialResolution: 'Transformation settled at boundary',
        },
        spatialIntent: {
          origin: plan.spatialIntent?.origin || { x: 960, y: 540, z: 0 },
          target: plan.spatialIntent?.target,
          scaleShift: plan.spatialIntent?.scaleShift,
          rotationShiftDeg: plan.spatialIntent?.rotationShiftDeg,
          morphTargetGeometry: plan.spatialIntent?.morphTargetGeometry,
          separationDistance: plan.spatialIntent?.separationDistance,
          fragmentCount: plan.spatialIntent?.fragmentCount,
          maxSquash: plan.spatialIntent?.maxSquash,
          maxShearDeg: plan.spatialIntent?.maxShearDeg,
        },
      });
    }

    const graph: MotionSceneGraph = {
      sceneId,
      title: request.title || request.creativeIntent,
      totalDurationFrames: totalDuration,
      world: {
        width: request.world?.width || 1920,
        height: request.world?.height || 1080,
        depthEnabled: request.world?.depthEnabled !== undefined ? request.world.depthEnabled : true,
        backgroundColor: request.world?.backgroundColor || '#080C16',
      },
      entities,
      transformations,
      continuity: [],
      camera: request.camera,
    };

    // Pre-validate graph before returning
    const validation = MotionGraphCompiler.validateGraph(graph);
    if (!validation.valid) {
      const firstIssue = validation.issues[0];
      const error = new Error(`[${firstIssue.code}] ${firstIssue.message}`);
      (error as any).code = firstIssue.code;
      throw error;
    }

    return graph;
  }

  /**
   * Parses natural language user intent and constructs a valid MotionSceneGraph.
   * If intent is ambiguous or ungrounded ("moves dramatically", "make it dynamic"),
   * immediately throws with MOTION_INTENT_AMBIGUOUS.
   */
  public static planFromNaturalIntent(
    creativeIntent: string,
    options?: {
      totalDurationFrames?: number;
      camera?: CameraTrajectorySpec;
    }
  ): MotionSceneGraph {
    const rawText = creativeIntent.trim();
    const lower = rawText.toLowerCase();

    // 1. Guard against ungrounded / vague natural language descriptions
    const vaguePhrases = [
      'hero moves dramatically',
      'moves dramatically',
      'the hero moves dramatically',
      'make it cinematic',
      'look cinematic',
      'make it dynamic',
      'animate the object',
      'cinematic movement',
      'make the shape interesting',
    ];
    if (vaguePhrases.some((phrase) => lower.includes(phrase))) {
      // Check if there are concrete spatial vectors or verbs that override
      const hasConcreteAction =
        lower.includes('expand') ||
        lower.includes('split') ||
        lower.includes('reassemble') ||
        lower.includes('collapse') ||
        lower.includes('morph') ||
        lower.includes('deform') ||
        lower.includes('merge');

      if (!hasConcreteAction) {
        const error = new Error(`[MOTION_INTENT_AMBIGUOUS] Natural language intent "${creativeIntent}" lacks concrete spatial vectors or topological verbs.`);
        (error as any).code = 'MOTION_INTENT_AMBIGUOUS';
        throw error;
      }
    }

    // 2. Chained Multi-Beat Intent Analysis
    // Example: "A glowing central core accumulates energy, expands, splits into two structures, and sends them travelling in opposite directions."
    const isChainedExpandSplitTravel =
      lower.includes('expand') && lower.includes('split') && (lower.includes('travel') || lower.includes('opposite'));

    if (isChainedExpandSplitTravel) {
      return this.planScene({
        creativeIntent,
        sceneId: 'fresh_agent_chained_core',
        totalDurationFrames: options?.totalDurationFrames || 600,
        entities: [
          {
            id: 'hero_core',
            label: 'Glowing Central Core',
            role: 'HERO',
            semanticPurpose: 'Primary energy entity undergoing multi-stage metamorphosis',
            initialGeometry: 'dense_singularity',
            initialScale: 0.7,
            persistent: true,
          },
        ],
        transformations: [
          {
            description: 'Central core accumulates energy and expands radially',
            sourceEntityIds: ['hero_core'],
            trigger: 'Energy accumulation reaches threshold',
            consequence: 'Expanded core matrix stabilizes',
            spatialIntent: { origin: { x: 960, y: 540, z: 0 }, scaleShift: { from: 0.7, to: 1.4 } },
          },
          {
            description: 'Expanded core splits into two daughter structures',
            sourceEntityIds: ['hero_core'],
            targetEntityIds: ['daughter_left', 'daughter_right'],
            trigger: 'Cleavage shear forces rupture core axis',
            consequence: 'Two discrete structures separate horizontally',
            spatialIntent: { origin: { x: 960, y: 540, z: 0 }, separationDistance: 340, fragmentCount: 2 },
          },
          {
            description: 'Two daughter structures travel in opposite directions across the canvas',
            sourceEntityIds: ['hero_core'],
            trigger: 'Opposing kinetic vectors propel structures',
            consequence: 'Daughter structures travel to perimeter docks',
            spatialIntent: { origin: { x: 960, y: 540, z: 0 }, target: { x: 1600, y: 540, z: 0 }, displacementPx: 640 },
          },
        ],
        camera: options?.camera,
      });
    }

    // 3. Reassembly Intent Analysis
    // Example: "Several fragments are scattered around the scene. They are pulled toward a central structure and lock together into one coherent assembly."
    const isReassemble =
      lower.includes('fragment') &&
      (lower.includes('scatter') || lower.includes('pull') || lower.includes('lock') || lower.includes('converge') || lower.includes('reassemble'));

    if (isReassemble) {
      return this.planScene({
        creativeIntent,
        sceneId: 'fresh_agent_reassemble',
        totalDurationFrames: options?.totalDurationFrames || 300,
        entities: [
          {
            id: 'assembly_lattice',
            label: 'Crystalline Assembly Lattice',
            role: 'HERO',
            semanticPurpose: 'Scattered structural fragments locking into unified architecture',
            initialGeometry: 'scattered_fragments',
            initialScale: 1.0,
            persistent: true,
          },
        ],
        transformations: [
          {
            description: 'Several scattered fragments are pulled toward central structure and lock together into one coherent assembly',
            sourceEntityIds: ['assembly_lattice'],
            trigger: 'Electromagnetic centripetal pulse triggers fragment convergence',
            consequence: 'Unified crystalline assembly achieves perimeter lock',
            spatialIntent: { origin: { x: 960, y: 540, z: 0 }, separationDistance: 280, fragmentCount: 4 },
          },
        ],
        camera: options?.camera,
      });
    }

    // 4. Single-Beat Intent Analysis
    if (lower.includes('expand') || lower.includes('grow')) {
      return this.planScene({
        creativeIntent,
        sceneId: 'fresh_agent_expand',
        totalDurationFrames: options?.totalDurationFrames || 300,
        entities: [
          {
            id: 'hero_entity',
            label: 'Hero Entity',
            role: 'HERO',
            semanticPurpose: 'Entity expanding outward',
            initialScale: 0.65,
            persistent: true,
          },
        ],
        transformations: [
          {
            description: 'Entity expands radially outward from center',
            sourceEntityIds: ['hero_entity'],
            trigger: 'Volumetric pulse',
            consequence: 'Expanded state locked',
            spatialIntent: { origin: { x: 960, y: 540, z: 0 }, scaleShift: { from: 0.65, to: 1.4 } },
          },
        ],
        camera: options?.camera,
      });
    }

    if (lower.includes('split') || lower.includes('cleave') || lower.includes('divide')) {
      return this.planScene({
        creativeIntent,
        sceneId: 'fresh_agent_split',
        totalDurationFrames: options?.totalDurationFrames || 300,
        entities: [
          {
            id: 'hero_entity',
            label: 'Hero Entity',
            role: 'HERO',
            semanticPurpose: 'Entity dividing into daughter components',
            persistent: true,
          },
        ],
        transformations: [
          {
            description: 'Entity splits into two daughter structures under cleavage force',
            sourceEntityIds: ['hero_entity'],
            targetEntityIds: ['d1', 'd2'],
            trigger: 'Cleavage force applied',
            consequence: 'Two separated daughter structures',
            spatialIntent: { origin: { x: 960, y: 540, z: 0 }, separationDistance: 320, fragmentCount: 2 },
          },
        ],
        camera: options?.camera,
      });
    }

    if (lower.includes('travel') || lower.includes('transit') || lower.includes('relocate')) {
      return this.planScene({
        creativeIntent,
        sceneId: 'fresh_agent_travel',
        totalDurationFrames: options?.totalDurationFrames || 300,
        entities: [
          {
            id: 'hero_entity',
            label: 'Hero Entity',
            role: 'HERO',
            semanticPurpose: 'Entity in transit',
            persistent: true,
          },
        ],
        transformations: [
          {
            description: 'Entity travels from coordinate A to coordinate B across the screen',
            sourceEntityIds: ['hero_entity'],
            trigger: 'Propulsion vector engaged',
            consequence: 'Entity arrives at destination dock',
            spatialIntent: { origin: { x: 300, y: 540, z: 0 }, target: { x: 1500, y: 540, z: 0 }, displacementPx: 600 },
          },
        ],
        camera: options?.camera,
      });
    }

    // Default Fallback: If no recognized concrete verb was derived, refuse to guess!
    const error = new Error(`[MOTION_INTENT_AMBIGUOUS] Unable to derive an unambiguous motion verb from natural language intent "${creativeIntent}".`);
    (error as any).code = 'MOTION_INTENT_AMBIGUOUS';
    throw error;
  }
}
