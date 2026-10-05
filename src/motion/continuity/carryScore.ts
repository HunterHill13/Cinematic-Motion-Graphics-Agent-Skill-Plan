import { CarryContract, V11_TRANSITION_CARRIES } from './carryContract';

export interface TransitionCarryScore {
  transitionId: string;
  sourceShot: string;
  destShot: string;
  boundaryFrame: number;
  carryObject: string;
  transformation: string;
  score: number; // 0.00 - 1.00
  passed: boolean; // score >= 0.75
  flagged: boolean; // score < 0.50 (hard continuity failure)
  dimensionScores: {
    actorSurvives: number;
    positionLineage: number;
    velocityMatch: number;
    massConservation: number;
    semanticTransformation: number;
    cameraContinuity: number;
    energyContinuity: number;
  };
}

export interface CarryAuditReport {
  transitions: TransitionCarryScore[];
  averageScore: number;
  targetThreshold: number; // 0.75
  flagCount: number;
  allPassed: boolean;
}

export const CARRY_WEIGHTS = {
  actorSurvives: 0.20,
  positionLineage: 0.15,
  velocityMatch: 0.15,
  massConservation: 0.15,
  semanticTransformation: 0.15,
  cameraContinuity: 0.10,
  energyContinuity: 0.10,
};

export function evaluateCarryContract(contract: CarryContract): TransitionCarryScore {
  const p = contract.properties;
  const actorScore = p.actorSurvives ? 1.0 : 0.0;
  
  const score = (
    actorScore * CARRY_WEIGHTS.actorSurvives +
    p.positionLineage * CARRY_WEIGHTS.positionLineage +
    p.velocityMatch * CARRY_WEIGHTS.velocityMatch +
    p.massConservation * CARRY_WEIGHTS.massConservation +
    p.semanticTransformation * CARRY_WEIGHTS.semanticTransformation +
    p.cameraContinuity * CARRY_WEIGHTS.cameraContinuity +
    p.energyContinuity * CARRY_WEIGHTS.energyContinuity
  );

  return {
    transitionId: contract.transitionId,
    sourceShot: contract.sourceShot,
    destShot: contract.destShot,
    boundaryFrame: contract.boundaryFrame,
    carryObject: contract.carryObject,
    transformation: contract.transformation,
    score: Number(score.toFixed(4)),
    passed: score >= 0.75,
    flagged: score < 0.50,
    dimensionScores: {
      actorSurvives: actorScore,
      positionLineage: p.positionLineage,
      velocityMatch: p.velocityMatch,
      massConservation: p.massConservation,
      semanticTransformation: p.semanticTransformation,
      cameraContinuity: p.cameraContinuity,
      energyContinuity: p.energyContinuity,
    },
  };
}

export function auditV11Carries(contracts: CarryContract[] = V11_TRANSITION_CARRIES): CarryAuditReport {
  const transitions = contracts.map(evaluateCarryContract);
  const totalScore = transitions.reduce((sum, t) => sum + t.score, 0);
  const averageScore = Number((totalScore / transitions.length).toFixed(4));
  const flagCount = transitions.filter(t => t.flagged).length;
  const allPassed = transitions.every(t => t.passed) && averageScore >= 0.75;

  return {
    transitions,
    averageScore,
    targetThreshold: 0.75,
    flagCount,
    allPassed,
  };
}
