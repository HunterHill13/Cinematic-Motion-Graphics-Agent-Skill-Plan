export interface CarryContract {
  transitionId: string;
  sourceShot: string;
  destShot: string;
  boundaryFrame: number;
  carryObject: string;
  sourceState: string;
  transformation: string;
  destinationState: string;
  velocityDirection: 'leftward' | 'rightward' | 'downward' | 'inward-singularity' | 'forward-push';
  cameraRelation: 'follow' | 'lead' | 'through' | 'counter';
  audioAnchor: string;
  properties: {
    actorSurvives: boolean;        // Weight 0.20
    positionLineage: number;       // Weight 0.15 (0.0 to 1.0)
    velocityMatch: number;         // Weight 0.15 (0.0 to 1.0)
    massConservation: number;      // Weight 0.15 (0.0 to 1.0)
    semanticTransformation: number;// Weight 0.15 (0.0 to 1.0)
    cameraContinuity: number;       // Weight 0.10 (0.0 to 1.0)
    energyContinuity: number;       // Weight 0.10 (0.0 to 1.0)
  };
}

/**
 * FORMAL V11 TRANSITION CARRY REGISTRY
 * Defines explicit continuity contracts across all 5 shot boundaries in the film.
 */
export const V11_TRANSITION_CARRIES: CarryContract[] = [
  {
    transitionId: 't1_hook_to_decree',
    sourceShot: 'Shot 01 (Hook)',
    destShot: 'Shot 02 (Decree)',
    boundaryFrame: 350,
    carryObject: 'Active Kinetic Underline & Motive Impulse',
    sourceState: 'Horizontal gold underline beneath keyphrase',
    transformation: 'Leftward sweep accelerating into Numeral «۲» apex',
    destinationState: 'Impact rebound and framing bracket of Article 2',
    velocityDirection: 'leftward',
    cameraRelation: 'follow',
    audioAnchor: '«بند کاف ماده ۲»',
    properties: {
      actorSurvives: true,
      positionLineage: 0.90,
      velocityMatch: 0.85,
      massConservation: 0.85,
      semanticTransformation: 0.95,
      cameraContinuity: 0.80,
      energyContinuity: 0.90,
    },
  },
  {
    transitionId: 't2_decree_to_criteria',
    sourceShot: 'Shot 02 (Decree)',
    destShot: 'Shot 03 (Criteria)',
    boundaryFrame: 620,
    carryObject: 'Article 2 Legal Entity',
    sourceState: 'Singular Numeral «۲» monolith',
    transformation: 'SplitAndConverge: Triad division into 3 prerequisite branches',
    destinationState: '3 independent criteria targets (GPA, Conduct, 6 Articles)',
    velocityDirection: 'rightward',
    cameraRelation: 'lead',
    audioAnchor: '«سه شرط ضروری»',
    properties: {
      actorSurvives: true,
      positionLineage: 0.85,
      velocityMatch: 0.80,
      massConservation: 0.90,
      semanticTransformation: 0.95,
      cameraContinuity: 0.85,
      energyContinuity: 0.85,
    },
  },
  {
    transitionId: 't3_criteria_to_timewindow',
    sourceShot: 'Shot 03 (Criteria)',
    destShot: 'Shot 04 (Time Window)',
    boundaryFrame: 1450,
    carryObject: 'Criteria Baseline Datum Rule',
    sourceState: 'Horizontal cyan accreditation datum plane',
    transformation: 'AxisCollapse: 90° rotation into vertical deadline wall',
    destinationState: 'Vertical amber temporal divider monolith',
    velocityDirection: 'downward',
    cameraRelation: 'follow',
    audioAnchor: '«یک سال پس از فارغ‌التحصیلی»',
    properties: {
      actorSurvives: true,
      positionLineage: 0.95,
      velocityMatch: 0.90,
      massConservation: 0.90,
      semanticTransformation: 1.00,
      cameraContinuity: 0.85,
      energyContinuity: 0.85,
    },
  },
  {
    transitionId: 't4_timewindow_to_thresholds',
    sourceShot: 'Shot 04 (Time Window)',
    destShot: 'Shot 05 (Thresholds)',
    boundaryFrame: 1700,
    carryObject: 'Temporal Boundary Wall',
    sourceState: 'Vertical amber cutoff barrier',
    transformation: 'FoldAndUnfold: Forward 90° planar fold flattening into ground datum',
    destinationState: 'Horizontal floor plane supporting 3 score monoliths',
    velocityDirection: 'downward',
    cameraRelation: 'follow',
    audioAnchor: '«امتیازات لازم بر اساس مقطع»',
    properties: {
      actorSurvives: true,
      positionLineage: 0.90,
      velocityMatch: 0.85,
      massConservation: 0.85,
      semanticTransformation: 0.90,
      cameraContinuity: 0.80,
      energyContinuity: 0.80,
    },
  },
  {
    transitionId: 't5_thresholds_to_outro',
    sourceShot: 'Shot 05 (Thresholds)',
    destShot: 'Shot 06 (Outro)',
    boundaryFrame: 2155,
    carryObject: '3 Academic Score Monoliths (65, 110, 130)',
    sourceState: 'Dispersed 3-column monumental architecture',
    transformation: 'GravitationalSingularity: Inward convergence into central singularity',
    destinationState: 'Permanent emerald core jewel inside Institutional Crest',
    velocityDirection: 'inward-singularity',
    cameraRelation: 'through',
    audioAnchor: '«دانشگاه علوم پزشکی بقیه‌الله»',
    properties: {
      actorSurvives: true,
      positionLineage: 0.95,
      velocityMatch: 0.90,
      massConservation: 0.95,
      semanticTransformation: 1.00,
      cameraContinuity: 0.90,
      energyContinuity: 0.95,
    },
  },
];
