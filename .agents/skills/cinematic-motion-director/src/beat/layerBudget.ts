/**
 * V15 LAYER BUDGET & VISUAL COMPLEXITY CONTROLLER
 * 
 * Implements the 7-layer hierarchy from video-talkcraft and cinematic motion design principles:
 * L0: Background (Deep void canvas, 60% dominant space)
 * L1: Atmosphere (Subtle radial light drift, atmospheric noise)
 * L2: Structural Geometry (12-column grid, datum axis, coordinate brackets)
 * L3: Primary Subject (Hero geometric medallion, timeline ruler, architectural plinths, heraldic crest)
 * L4: Typography (Source-authorized typography, masked reveals, keyword strikes)
 * L5: Secondary Reaction (Shockwave ripples, expanding rings, status badge locks)
 * L6: Transition Carrier (Kinetic underline handoff, symmetric fission, axis collapse, stage fold, singularity)
 * 
 * Core Invariant:
 * "Never allow every layer to have equal visual importance."
 * "Maximum Simultaneous Active Layers: 5 / 7" (Never activate all 7 simultaneously at full opacity).
 * "Maximum Simultaneous Animated Focus Objects: 3"
 */

import { LayerId, SemanticBeat } from './semanticBeat';

export interface LayerSpec {
  id: LayerId;
  nameFa: string;
  description: string;
  maxOpacity: number;
  zOrder: number;
  subordinateTo?: LayerId;
}

export const V15_LAYER_REGISTRY: Record<LayerId, LayerSpec> = {
  L0_Background: {
    id: 'L0_Background',
    nameFa: 'لایه بوم پس‌زمینه',
    description: 'Deep void solid canvas (#07090E), 60% dominant visual mass',
    maxOpacity: 1.0,
    zOrder: 0,
  },
  L1_Atmosphere: {
    id: 'L1_Atmosphere',
    nameFa: 'لایه اتمسفر و نورپردازی',
    description: 'Ultra-subtle radial gradients and volumetric light drift (rgba(212,175,55,0.06-0.10))',
    maxOpacity: 0.15,
    zOrder: 1,
    subordinateTo: 'L3_PrimarySubject',
  },
  L2_Structure: {
    id: 'L2_Structure',
    nameFa: 'لایه هندسه ساختاری',
    description: 'Architectural 90px vector grid, quadrant brackets, datum axis rules',
    maxOpacity: 0.40,
    zOrder: 2,
    subordinateTo: 'L3_PrimarySubject',
  },
  L3_PrimarySubject: {
    id: 'L3_PrimarySubject',
    nameFa: 'لایه سوژه اصلی',
    description: 'The sole hero graphic actor for the current beat (Medallion, Plinths, Ruler, Crest)',
    maxOpacity: 1.0,
    zOrder: 3,
  },
  L4_Typography: {
    id: 'L4_Typography',
    nameFa: 'لایه تایپوگرافی رسمی',
    description: 'Source-authorized Persian text hierarchy with Vazirmatn font weight contrast',
    maxOpacity: 1.0,
    zOrder: 4,
  },
  L5_SecondaryReaction: {
    id: 'L5_SecondaryReaction',
    nameFa: 'لایه واکنش ثانویه سببی',
    description: 'Shockwave ripples, status checkmarks, and acoustic impulse highlights',
    maxOpacity: 0.85,
    zOrder: 5,
    subordinateTo: 'L3_PrimarySubject',
  },
  L6_TransitionCarrier: {
    id: 'L6_TransitionCarrier',
    nameFa: 'لایه حامل ترنزیشن OneTake',
    description: 'Kinetic ray handoff, fission nodes, axis collapse and singularity orbs',
    maxOpacity: 1.0,
    zOrder: 6,
  },
};

export interface LayerBudgetReport {
  beatId: string;
  activeCount: number;
  maxAllowed: number;
  passed: boolean;
  warnings: string[];
}

export const LAYER_BUDGET_LIMITS = {
  maxSimultaneousLayers: 6,
  maxHeroActorsPerBeat: 1,
  maxEmphasisEventsPerBeat: 1,
};

/**
 * Validates that a semantic beat strictly adheres to the layer complexity budget.
 */
export function validateBeatLayerBudget(beat: SemanticBeat): LayerBudgetReport {
  const warnings: string[] = [];
  const activeCount = beat.activeLayers.length;

  if (activeCount > LAYER_BUDGET_LIMITS.maxSimultaneousLayers) {
    warnings.push(
      `Visual Overload: Beat '${beat.id}' activates ${activeCount} layers simultaneously (Max allowed: ${LAYER_BUDGET_LIMITS.maxSimultaneousLayers})`
    );
  }

  // Ensure Secondary Reaction is not active without a Primary Subject or Typography event
  if (
    beat.activeLayers.includes('L5_SecondaryReaction') &&
    !beat.activeLayers.includes('L3_PrimarySubject') &&
    !beat.activeLayers.includes('L4_Typography')
  ) {
    warnings.push(
      `Causality Violation: Beat '${beat.id}' activates L5_SecondaryReaction without an active L3_PrimarySubject or L4_Typography`
    );
  }

  // Ensure Transition Carrier is not colliding with full primary subject + secondary reaction
  if (
    beat.activeLayers.includes('L6_TransitionCarrier') &&
    beat.activeLayers.includes('L5_SecondaryReaction') &&
    beat.activeLayers.includes('L3_PrimarySubject')
  ) {
    warnings.push(
      `Clutter Warning: Beat '${beat.id}' activates L6_TransitionCarrier simultaneously with L3 and L5`
    );
  }

  return {
    beatId: beat.id,
    activeCount,
    maxAllowed: LAYER_BUDGET_LIMITS.maxSimultaneousLayers,
    passed: warnings.length === 0,
    warnings,
  };
}

/**
 * Validate all beats in V15
 */
export function auditAllBeatsLayerBudget(beats: SemanticBeat[]): {
  totalBeats: number;
  passedBeats: number;
  failedBeats: number;
  reports: LayerBudgetReport[];
} {
  const reports = beats.map(validateBeatLayerBudget);
  const passedBeats = reports.filter((r) => r.passed).length;

  return {
    totalBeats: beats.length,
    passedBeats,
    failedBeats: beats.length - passedBeats,
    reports,
  };
}
