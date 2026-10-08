/**
 * ============================================================================
 * SEMANTIC MOTION VERB SELECTOR (PHASE 4B)
 * ============================================================================
 * 
 * Maps Creative Intent and entity state transitions to one of the 8 canonical
 * Motion Verbs without arbitrary LLM guesswork or raw keyword hallucinations.
 * 
 * Evaluates:
 *   - Semantic intent description
 *   - Entity structural relationship (single-to-multiple, multiple-to-single, etc.)
 *   - Spatial vector displacement (origin -> destination)
 *   - Volumetric ratio (target scale / source scale)
 *   - Topological geometry shift (fromGeometry -> toGeometry)
 *   - Elastic deformation / shear parameters
 * 
 * CRITICAL RULE:
 *   If an intent is vague (e.g. "the hero moves dramatically", "element changes"),
 *   DO NOT GUESS A RANDOM VERB. It MUST fail-fast with MOTION_INTENT_AMBIGUOUS.
 * ============================================================================
 */

import { MotionVerb, EntitySpatialState, Vector3D } from '../grammar/motionGrammar';
import { MotionGraphErrorCode } from './motionSceneGraph';

export interface VerbSelectionContext {
  intentDescription: string;
  sourceState?: Partial<EntitySpatialState>;
  targetState?: Partial<EntitySpatialState>;
  sourcePosition?: Vector3D;
  targetPosition?: Vector3D;
  entityRelationship?: 'single_to_multiple' | 'multiple_to_single' | 'unitary' | 'fragment_to_whole';
  daughterComponentCount?: number;
  originCount?: number;
  geometryTransition?: { from: string; to: string };
  displacementPx?: number;
  volumetricRatio?: number; // target / source scale
  maxShearDeg?: number;
  maxSquash?: number;
  isDeformationElastic?: boolean;
}

export interface VerbSelectionSuccess {
  status: 'RESOLVED';
  verb: MotionVerb;
  confidence: number;
  rationale: string;
}

export interface VerbSelectionAmbiguity {
  status: 'AMBIGUOUS';
  code: 'MOTION_INTENT_AMBIGUOUS';
  reason: string;
  candidateVerbs?: MotionVerb[];
}

export type VerbSelectionResult = VerbSelectionSuccess | VerbSelectionAmbiguity;

const VAGUE_INTENT_PATTERNS = [
  /^the hero moves dramatically$/i,
  /^hero moves dramatically$/i,
  /^moves dramatically$/i,
  /^hero moves$/i,
  /^moves$/i,
  /^the hero moves$/i,
  /^element changes$/i,
  /^hero appears and moves$/i,
  /^dynamic movement$/i,
  /^smooth motion$/i,
  /^moves around$/i,
];

export class MotionVerbSelector {
  public static selectVerb(context: VerbSelectionContext): VerbSelectionResult {
    const rawIntent = context.intentDescription.trim();
    const lowerIntent = rawIntent.toLowerCase();

    // 1. Detect Vague / Ambiguous Intent Patterns
    const isVaguePattern = VAGUE_INTENT_PATTERNS.some((p) => p.test(rawIntent));
    const hasConcreteSpatialData =
      (context.displacementPx !== undefined && context.displacementPx > 50) ||
      (context.sourcePosition && context.targetPosition) ||
      (context.volumetricRatio !== undefined && Math.abs(context.volumetricRatio - 1.0) > 0.15) ||
      (context.geometryTransition && context.geometryTransition.from !== context.geometryTransition.to) ||
      (context.daughterComponentCount !== undefined && context.daughterComponentCount >= 2) ||
      (context.originCount !== undefined && context.originCount >= 2) ||
      (context.maxShearDeg !== undefined && context.maxShearDeg > 8);

    if (isVaguePattern && !hasConcreteSpatialData) {
      return {
        status: 'AMBIGUOUS',
        code: 'MOTION_INTENT_AMBIGUOUS',
        reason: `Ambiguous intent description "${rawIntent}" lacks concrete spatial vectors, volumetric deltas, or topological transitions. Cannot guess a verb.`,
        candidateVerbs: ['TRAVEL', 'EXPAND', 'DEFORM', 'COLLAPSE'],
      };
    }

    // 2. Structural & Multi-Component Verbs: REASSEMBLE, MERGE, SPLIT
    // REASSEMBLE: Multiple scattered fragments converging into structured assembly or lattice
    if (
      context.entityRelationship === 'fragment_to_whole' ||
      lowerIntent.includes('reassemble') ||
      lowerIntent.includes('scatter') ||
      lowerIntent.includes('fragment') ||
      lowerIntent.includes('lock together') ||
      lowerIntent.includes('coherent assembly') ||
      lowerIntent.includes('crystalline lattice') ||
      lowerIntent.includes('assemble from fragments') ||
      lowerIntent.includes('بازسازی قطعات') ||
      lowerIntent.includes('تجمع ذرات')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'REASSEMBLE',
        confidence: 0.95,
        rationale: 'Scattered structural fragments coalesce and dock into unified geometry.',
      };
    }

    // MERGE: Multiple separate origins coalescing into single barycenter mass
    if (
      context.entityRelationship === 'multiple_to_single' ||
      (context.originCount !== undefined && context.originCount >= 2) ||
      lowerIntent.includes('merge') ||
      lowerIntent.includes('coalesc') ||
      lowerIntent.includes('fuse') ||
      lowerIntent.includes('fusion') ||
      lowerIntent.includes('converging masses') ||
      lowerIntent.includes('ادغام') ||
      lowerIntent.includes('پیوستن')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'MERGE',
        confidence: 0.94,
        rationale: 'Independent upstream bodies accelerate toward mutual barycenter and fuse.',
      };
    }

    // SPLIT: Single entity dividing into 2+ daughter vectors
    if (
      context.entityRelationship === 'single_to_multiple' ||
      (context.daughterComponentCount !== undefined && context.daughterComponentCount >= 2) ||
      lowerIntent.includes('split') ||
      lowerIntent.includes('cleave') ||
      lowerIntent.includes('bifurcat') ||
      lowerIntent.includes('divide') ||
      lowerIntent.includes('fission') ||
      lowerIntent.includes('انشعاب') ||
      lowerIntent.includes('تقسیم')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'SPLIT',
        confidence: 0.95,
        rationale: 'Entity divides into daughter components with outward bilateral displacement.',
      };
    }

    // 3. Volumetric Verbs: EXPAND vs COLLAPSE
    // EXPAND: Outward radial scaling or concentric ring deployment
    if (
      (context.volumetricRatio !== undefined && context.volumetricRatio >= 1.2) ||
      lowerIntent.includes('expand') ||
      lowerIntent.includes('grow') ||
      lowerIntent.includes('inflate') ||
      lowerIntent.includes('unfold') ||
      lowerIntent.includes('scale up') ||
      lowerIntent.includes('گسترش') ||
      lowerIntent.includes('بزرگ')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'EXPAND',
        confidence: 0.96,
        rationale: 'Volumetric expansion outward from anchor center with perimeter scaling.',
      };
    }

    // COLLAPSE: Inward contraction toward central singularity
    if (
      (context.volumetricRatio !== undefined && context.volumetricRatio <= 0.8) ||
      lowerIntent.includes('collapse') ||
      lowerIntent.includes('shrink') ||
      lowerIntent.includes('contract') ||
      lowerIntent.includes('implod') ||
      lowerIntent.includes('singularity') ||
      lowerIntent.includes('فروپاشی') ||
      lowerIntent.includes('انقباض')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'COLLAPSE',
        confidence: 0.95,
        rationale: 'Volumetric contraction inward toward central gravitational anchor.',
      };
    }

    // 4. Topological Verb: MORPH
    if (
      (context.geometryTransition && context.geometryTransition.from !== context.geometryTransition.to) ||
      lowerIntent.includes('morph') ||
      lowerIntent.includes('shape shift') ||
      lowerIntent.includes('becomes another') ||
      lowerIntent.includes('metamorph') ||
      lowerIntent.includes('transmute') ||
      lowerIntent.includes('تغییر شکل') ||
      lowerIntent.includes('دگرگونی')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'MORPH',
        confidence: 0.94,
        rationale: 'Boundary perimeter vertices dynamically interpolate into new geometry.',
      };
    }

    // 5. Elastic Distortion Verb: DEFORM
    if (
      context.isDeformationElastic ||
      (context.maxShearDeg !== undefined && context.maxShearDeg >= 12) ||
      (context.maxSquash !== undefined && context.maxSquash >= 1.25) ||
      lowerIntent.includes('deform') ||
      lowerIntent.includes('squash') ||
      lowerIntent.includes('shear') ||
      lowerIntent.includes('bend') ||
      lowerIntent.includes('elastic') ||
      lowerIntent.includes('warp') ||
      lowerIntent.includes('تغییر فرم') ||
      lowerIntent.includes('کشسانی')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'DEFORM',
        confidence: 0.93,
        rationale: 'Entity matrix experiences non-affine shear/squash under kinetic pressure.',
      };
    }

    // 6. Spatial Translation Verb: TRAVEL
    const hasDisplacement =
      (context.displacementPx !== undefined && context.displacementPx >= 120) ||
      (context.sourcePosition &&
        context.targetPosition &&
        Math.hypot(
          context.targetPosition.x - context.sourcePosition.x,
          context.targetPosition.y - context.sourcePosition.y
        ) >= 120);

    if (
      hasDisplacement ||
      lowerIntent.includes('travel') ||
      lowerIntent.includes('transit') ||
      lowerIntent.includes('relocat') ||
      lowerIntent.includes('traverse') ||
      lowerIntent.includes('from a to b') ||
      lowerIntent.includes('انتقال') ||
      lowerIntent.includes('حرکت مکانی')
    ) {
      return {
        status: 'RESOLVED',
        verb: 'TRAVEL',
        confidence: 0.95,
        rationale: 'Significant continuous spatial centroid displacement across the screen plane.',
      };
    }

    // 7. Fallback for Ambiguous / Unresolvable Intent
    return {
      status: 'AMBIGUOUS',
      code: 'MOTION_INTENT_AMBIGUOUS',
      reason: `Could not uniquely classify intent "${rawIntent}" into any of the 8 canonical motion verbs. Upstream planner must provide explicit spatial coordinates, volumetric ratios, or entity relationship.`,
      candidateVerbs: ['TRAVEL', 'EXPAND', 'DEFORM', 'SPLIT'],
    };
  }
}
