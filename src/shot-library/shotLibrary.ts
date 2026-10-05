import { CameraMode } from '../camera/cameraGrammar';

export type ShotCategory =
  | 'OpeningHook'
  | 'EditorialTypography'
  | 'DiagramExplainer'
  | 'DataNumbers'
  | 'TimelineProcess'
  | 'Comparison'
  | 'MultiObject'
  | 'HeroInstitutional';

export interface ShotRecipe {
  id: string;
  category: ShotCategory;
  nameFa: string;
  purpose: string;
  suitableFor: string[];
  avoidWhen: string[];
  energy: 'quiet' | 'controlled' | 'medium' | 'high' | 'hero';
  durationRange: [number, number]; // in frames @ 30fps
  visualCompanionRequired: boolean;
  cameraMode: CameraMode;
  motionMechanisms: string[];
  typographyBehavior: string[];
  transitionCompatibility: string[];
  audioBehavior: string[];
  knownPitfalls: string[];
  implementation: string;
}

export const V13_SHOT_RECIPES: Record<string, ShotRecipe> = {
  // A. Opening / Hook
  'hook-typography-slam': {
    id: 'hook-typography-slam',
    category: 'OpeningHook',
    nameFa: 'ضربه تایپوگرافی افتتاحیه',
    purpose: 'Narrative ignition on the hero title/question with high acoustic authority.',
    suitableFor: ['opening question', 'key title', 'provocative premise'],
    avoidWhen: ['routine paragraph', 'dense explanation'],
    energy: 'high',
    durationRange: [180, 420],
    visualCompanionRequired: true,
    cameraMode: 'micro-push',
    motionMechanisms: ['Draw', 'Travel', 'Collision'],
    typographyBehavior: ['KeywordStrike', 'BaselineTravel'],
    transitionCompatibility: ['KineticUnderlineHandoff', 'ObjectHandoff'],
    audioBehavior: ['AnticipationLetterSqueeze', 'ContactSyllableStrike', 'HarmonicSettle'],
    knownPitfalls: ['Overshooting too aggressively into screen edges', 'Slide-in feeling'],
    implementation: 'TypographySlamRecipe + MarkerUnderline + Architectural Brackets',
  },

  // B. Editorial Typography & Official Decree
  'decree-monolith-reveal': {
    id: 'decree-monolith-reveal',
    category: 'EditorialTypography',
    nameFa: 'رونمایی مونولیت مصوبه قانونی',
    purpose: 'Presents authoritative governmental/institutional decree with dignified gravity.',
    suitableFor: ['official article', 'legal statute', 'executive regulation'],
    avoidWhen: ['dynamic action scene', 'numeric comparison'],
    energy: 'controlled',
    durationRange: [200, 360],
    visualCompanionRequired: true,
    cameraMode: 'slow-dolly',
    motionMechanisms: ['Relay', 'Collision', 'Ripple', 'Draw'],
    typographyBehavior: ['MaskedPhraseReveal', 'WeightShift'],
    transitionCompatibility: ['ObjectHandoff', 'SymmetricFission'],
    audioBehavior: ['StatuteSlam', 'AcousticRings'],
    knownPitfalls: ['Making the seal look like a sci-fi radar HUD', 'Overcrowding text'],
    implementation: 'ObjectHandoff + ImpactAndRipple + Embossed Heraldic Medallion',
  },

  // C. Diagram / Explainer
  'tripartite-criteria-diagram': {
    id: 'tripartite-criteria-diagram',
    category: 'DiagramExplainer',
    nameFa: 'دیاگرام ساختاری شرایط سه‌گانه',
    purpose: 'Visualizes 3 prerequisite criteria with distinct visual companions and stepped milestone confirmation.',
    suitableFor: ['3 requirements', 'framework branching', 'prerequisite gates'],
    avoidWhen: ['single keyword', 'quick conclusion'],
    energy: 'medium',
    durationRange: [600, 950],
    visualCompanionRequired: true,
    cameraMode: 'parallax-drift',
    motionMechanisms: ['Split', 'Converge', 'Draw', 'Ripple'],
    typographyBehavior: ['WordGroupReveal', 'NumericMeterReveal'],
    transitionCompatibility: ['SymmetricFission', 'DatumRuleAxisCollapse'],
    audioBehavior: ['SteppedMilestoneTriggers', 'ConfirmationChimes'],
    knownPitfalls: ['Placing naked text without gauges/seals/grids', 'Unequal column heights'],
    implementation: 'SplitAndConverge + SequentialMilestone + Tripartite Visual Companions',
  },

  // D. Timeline / Process
  'temporal-cutoff-timeline': {
    id: 'temporal-cutoff-timeline',
    category: 'TimelineProcess',
    nameFa: 'گاه‌شمار مهلت قانونی و سقف مجاز',
    purpose: 'Demonstrates chronological graduation day, elapsed duration, and strict deadline barrier.',
    suitableFor: ['deadlines', 'time windows', 'expiry boundaries', 'process progress'],
    avoidWhen: ['non-temporal concepts', 'pure hierarchy'],
    energy: 'controlled',
    durationRange: [180, 320],
    visualCompanionRequired: true,
    cameraMode: 'slow-dolly',
    motionMechanisms: ['Fold', 'Collapse', 'Travel', 'Draw'],
    typographyBehavior: ['DirectionalSlide', 'MaskedPhraseReveal'],
    transitionCompatibility: ['DatumRuleAxisCollapse', 'PlanarStageFold'],
    audioBehavior: ['TimelineProgressDraw', 'CutoffBarrierStrike'],
    knownPitfalls: ['Making it look like an audio waveform', 'Failing to highlight the 1-year cutoff'],
    implementation: 'AxisCollapse + FoldAndUnfold + 12-Month Chronological Ruler Gate',
  },

  // E. Data / Quantitative Comparison
  'score-threshold-pedestals': {
    id: 'score-threshold-pedestals',
    category: 'DataNumbers',
    nameFa: 'پایه‌های پلکانی حدنصاب امتیازات',
    purpose: 'Physically compares 3 academic degree tiers (65, 110, 130) on rising architectural pedestals.',
    suitableFor: ['numeric scores', 'degree tiers', 'quantitative requirements'],
    avoidWhen: ['qualitative text', 'single concept'],
    energy: 'high',
    durationRange: [350, 520],
    visualCompanionRequired: true,
    cameraMode: 'continuous',
    motionMechanisms: ['Push', 'Draw', 'Collision', 'Ripple'],
    typographyBehavior: ['AscendingNumericImpact', 'WeightShift'],
    transitionCompatibility: ['PlanarStageFold', 'GravitationalSingularity'],
    audioBehavior: ['TierAscensionSwells', 'TripleScoreStrikes'],
    knownPitfalls: ['Equal pedestal heights hiding relative scale', 'Number clipping'],
    implementation: 'CounterBalancedSweep + KineticType + Monumental Plinths',
  },

  // F. Hero / Institutional Outro
  'heraldic-institutional-seal': {
    id: 'heraldic-institutional-seal',
    category: 'HeroInstitutional',
    nameFa: 'نشان زرین دانشگاه و پایان‌بندی سازمانی',
    purpose: 'Grand prestigious institutional conclusion with heraldic crest, laurel wreath, and dignified freeze.',
    suitableFor: ['university outro', 'official credits', 'formal certification'],
    avoidWhen: ['opening hook', 'educational detail'],
    energy: 'hero',
    durationRange: [180, 240],
    visualCompanionRequired: true,
    cameraMode: 'micro-pull',
    motionMechanisms: ['Pull', 'Draw', 'Ripple'],
    typographyBehavior: ['HeraldicTitleSnap', 'WordGroupReveal'],
    transitionCompatibility: ['GravitationalSingularity', 'MasterResolveFreeze'],
    audioBehavior: ['SingularityCoreDetonation', 'SustainedMasterFade'],
    knownPitfalls: ['Cyberpunk particle overload', 'Lack of dignified whitespace'],
    implementation: 'GravitationalSingularity + DimensionalPortal + ElasticSnapping + Gold Laurels',
  },
};

/**
 * RECIPE SELECTION & SCORING ENGINE (V13)
 * Evaluates semantic candidate fit rather than inventing random animations.
 */
export function scoreRecipeForShot(
  recipe: ShotRecipe,
  context: {
    semanticIntent: string;
    hasNumericData: boolean;
    hasTemporalAspect: boolean;
    hasTripartiteStructure: boolean;
    isInstitutional: boolean;
    previousRecipeId?: string;
  }
): number {
  let score = 0.5;

  if (context.semanticIntent === 'hook' && recipe.category === 'OpeningHook') score += 0.35;
  if (context.semanticIntent === 'decree' && recipe.category === 'EditorialTypography') score += 0.35;
  if (context.hasTripartiteStructure && recipe.category === 'DiagramExplainer') score += 0.40;
  if (context.hasTemporalAspect && recipe.category === 'TimelineProcess') score += 0.40;
  if (context.hasNumericData && recipe.category === 'DataNumbers') score += 0.40;
  if (context.isInstitutional && recipe.category === 'HeroInstitutional') score += 0.35;

  // Repetition penalty: reduce score if exactly the same recipe was used in immediate prior shot
  if (context.previousRecipeId === recipe.id) {
    score -= 0.30;
  }

  return Math.min(1.0, Math.max(0.0, score));
}
