/**
 * VISUAL CONCEPT DIRECTOR & ART DIRECTION INTELLIGENCE (V30)
 * 
 * Sits ABOVE motion fidelity and transformation engines.
 * Responsible for generating, evaluating, and selecting high-concept
 * visual ideas before any interpolation or animation code runs.
 * 
 * Pipeline:
 * BRIEF / MEANING
 *  ↓
 * VISUAL METAPHOR
 *  ↓
 * 3 DIVERGENT CONCEPTUAL DIRECTIONS
 *  ↓
 * ART DIRECTOR SELECTION (Evaluating clarity, surprise, continuity, economy)
 *  ↓
 * CHOREOGRAPHIC PLAN & MOTION SPECIFICATION
 */

export interface VisualConcept {
  id: string;
  semanticMeaning: string;
  visualMetaphor: string;
  primaryObject: string;
  motionVerb: string;
  transformationIdea: string;
  compositionIdea: string;
  emotionalQuality: string;
  surpriseMechanism: string;
  negativeSpaceStrategy: string;
  reasonForMotion: string;
  intentionalStillnessFrames: number;
  antiClichéRule: string;
}

export interface DirectionEvaluation {
  directionId: string;
  concept: VisualConcept;
  scoreSemanticClarity: number; // 1 - 10
  scoreOriginality: number;     // 1 - 10
  scoreVisualEconomy: number;   // 1 - 10
  scoreContinuityPotential: number; // 1 - 10
  scoreSurpriseValue: number;   // 1 - 10
  totalScore: number;
  selectionRationale: string;
}

export interface ArtDirectionDecision {
  beatIndex: number;
  selectedConcept: VisualConcept;
  rejectedAlternatives: Array<{ id: string; rejectionReason: string }>;
  selectionWhy: string;
}

/**
 * Registry of curated Art Direction decisions for core beats.
 */
export const V30_ART_DIRECTION_REGISTRY: Record<string, ArtDirectionDecision> = {
  BEAT_02_ACCELERATION: {
    beatIndex: 2,
    selectedConcept: {
      id: 'DIRECTION_B_NEGATIVE_SPACE_SLIT',
      semanticMeaning: 'Potential energy releasing into piercing directional velocity',
      visualMetaphor: 'A singular mass cuts through canvas fabric, creating a luminous spatial seam',
      primaryObject: 'Kinetic Razor Seed',
      motionVerb: 'SLICE_AND_UNFURL',
      transformationIdea: 'Seed compresses along flight normal, carving a negative-space void that splits the canvas',
      compositionIdea: 'Asymmetric diagonal trajectory from bottom-left (320, 680) to top-right (1440, 360)',
      emotionalQuality: 'Electrifying, precise, authoritative',
      surpriseMechanism: 'Instead of an ornamental particle trail, the canvas itself fractures open along the line of flight',
      negativeSpaceStrategy: '82% dark void; the incision provides the only structural light',
      reasonForMotion: 'To visually prove that velocity is not decorative motion, but spatial reorganization',
      intentionalStillnessFrames: 12,
      antiClichéRule: 'No video-game particle streaks or glowing speed lines',
    },
    rejectedAlternatives: [
      {
        id: 'DIRECTION_A_SLINGSHOT_PROJECTILE',
        rejectionReason: 'Standard anticipation pullback and launch. Looks like a generic projectile or physics demo.',
      },
      {
        id: 'DIRECTION_C_RADIAL_EXPLOSION',
        rejectionReason: 'Uncontrolled particle dispersion. Clutters negative space and lacks directional continuity.',
      },
    ],
    selectionWhy:
      'Direction B treats motion as a tool that alters canvas geography. It eliminates decorative trails while heightening spatial drama through negative space choreography.',
  },

  BEAT_03_EMPIRICAL_FOUNDATION: {
    beatIndex: 3,
    selectedConcept: {
      id: 'DIRECTION_C_TECTONIC_MONOLITHS_AND_SHADOW_VOID',
      semanticMeaning: 'Rigorous empirical pillars forming structured intellectual architecture',
      visualMetaphor: 'Architectural monoliths rising to carve precise corridors of negative space',
      primaryObject: 'Brutalist Precision Pillars',
      motionVerb: 'TECTONIC_ERUPT_AND_LOCK',
      transformationIdea: 'Kinetic shockwave from Beat 02 cuts into baseline datum, causing monolithic pylons to elevate',
      compositionIdea: 'Asymmetrical rule-of-thirds cadence (600, 780, 1020, 1340) with varied optical weights',
      emotionalQuality: 'Monumental, enduring, unshakeable',
      surpriseMechanism: 'The negative space between the pillars forms an inverted Roman Romanesque archway',
      negativeSpaceStrategy: 'Void between pillars acts as the primary figure; solid bars act as ground',
      reasonForMotion: 'To establish weight, gravitational authority, and foundational certainty',
      intentionalStillnessFrames: 24,
      antiClichéRule: 'NO INFOGRAPHIC BAR LABELS, NO DATA TICK MARKS, NO PERCENTAGE SIGNS',
    },
    rejectedAlternatives: [
      {
        id: 'DIRECTION_A_SAAS_BAR_CHART',
        rejectionReason: 'Bar chart with numbers (+151.2). Resembles a SaaS marketing dashboard rather than cinematic motion design.',
      },
      {
        id: 'DIRECTION_B_NETWORK_NODES',
        rejectionReason: 'Floating interconnected dots and lines. Generic tech cliché with zero physical presence.',
      },
    ],
    selectionWhy:
      'Direction C eliminates all infographic UI clichés, treating the empirical foundation as monumental architecture where negative space does the primary compositional work.',
  },

  BEAT_06_TYPOGRAPHIC_DISSECTION: {
    beatIndex: 6,
    selectedConcept: {
      id: 'DIRECTION_A_ANATOMICAL_LIGATURE_FRACTURE',
      semanticMeaning: 'Intellectual conviction: Persian typography possesses physical vector mass that unlocks navigation',
      visualMetaphor: 'Word «اصالت» strikes baseline; its anatomical letterform strokes unfold into a navigational compass star',
      primaryObject: 'Persian Calligraphic Skeleton',
      motionVerb: 'FRACTURE_AND_REASSEMBLE',
      transformationIdea: 'Vertical stems of «الف» and «ل» become cardinal axes; dot becomes radiant navigational core',
      compositionIdea: 'Hero typography at optical center (960, 520) anchoring an expansive 75% negative void',
      emotionalQuality: 'Sovereign, cerebral, profound',
      surpriseMechanism: 'The compass star is not an external logo; it is the physical typography uncoiled into geometry',
      negativeSpaceStrategy: 'Clean deep obsidian canvas; pristine vector linework',
      reasonForMotion: 'To demonstrate that language and geometric truth are identical structural phenomena',
      intentionalStillnessFrames: 18,
      antiClichéRule: 'No arbitrary letter warping or illegible gelatinous morphing; glyphs remain pristine until structural fracture',
    },
    rejectedAlternatives: [
      {
        id: 'DIRECTION_B_TEXT_FADE_AND_LOGO_ENTER',
        rejectionReason: 'Word fades out, star fades in. Zero conceptual connection between word and emblem.',
      },
      {
        id: 'DIRECTION_C_EXPLOSIVE_TEXT_SHATTER',
        rejectionReason: 'Arbitrary 3D text explosion. Chaotic debris destroys editorial restraint.',
      },
    ],
    selectionWhy:
      'Direction A honors Persian typography as structural architecture, turning the literal anatomy of the glyph into the navigational geometry of the sequence.',
  },
};
