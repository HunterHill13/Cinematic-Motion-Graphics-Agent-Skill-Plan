/**
 * CHOREOGRAPHY 2.0 — SEMANTIC EVENT GRAPH ENGINE
 * 
 * Implements Continuous Visual Causality:
 * Every visual event has a defined physical cause, momentum transfer,
 * reaction envelope, and transition carrier handoff.
 * 
 * Establishes Motion Rhythm 2.0:
 * STILL -> TENSION -> BUILD -> ACCELERATION -> IMPACT -> SILENCE -> TRANSFORMATION -> SETTLE
 */

export type ChoreographyActionType =
  | 'enter'
  | 'travel'
  | 'transform'
  | 'split'
  | 'merge'
  | 'collide'
  | 'reveal'
  | 'assemble'
  | 'collapse'
  | 'expand'
  | 'hold';

export type MotionRhythmPhase =
  | 'STILL'
  | 'TENSION'
  | 'BUILD'
  | 'ACCELERATION'
  | 'IMPACT'
  | 'SILENCE'
  | 'TRANSFORMATION'
  | 'SETTLE';

export interface VisualCarrierObject {
  id: string;
  name: string;
  geometryType: 'datum_line' | 'divider_beam' | 'column_mass' | 'timeline_rail' | 'summit_laser' | 'singularity_node' | 'seal_circle' | 'calligraphy_mark';
  coordinates: {
    x: number | string;
    y: number | string;
    width?: number | string;
    height?: number | string;
  };
}

export interface ChoreographyEvent {
  id: string;
  semanticRole: string;
  shotId: 'Shot01' | 'Shot02' | 'Shot03' | 'Shot04' | 'Shot05' | 'Shot06';
  startFrame: number; // Global frame
  endFrame: number;   // Global frame
  rhythmPhase: MotionRhythmPhase;

  source?: VisualCarrierObject;
  target?: VisualCarrierObject;

  action: ChoreographyActionType;

  anticipationFrames?: number;
  impactFrames?: number;
  settleFrames?: number;

  cameraEffect?: 'push' | 'pull' | 'lock' | 'punch' | 'hold';

  handoff?: {
    carrierName: string;
    targetShot: string;
    geometricInvariant: string;
    transferEnergy: string;
  };
}

/**
 * MASTER CHOREOGRAPHY EVENT GRAPH
 * The authoritative narrative spine of the 2,361-frame film.
 */
export const MASTER_CHOREOGRAPHY_EVENTS: ChoreographyEvent[] = [
  // ==================== SHOT 01: THE HOOK & PR LOGO STING (0 - 380f) ====================
  {
    id: 'ev_01_pr_logo_signal',
    semanticRole: 'Quiet canvas receives subtle geometric crosshair and gold signal node',
    shotId: 'Shot01',
    startFrame: 0,
    endFrame: 30,
    rhythmPhase: 'TENSION',
    action: 'enter',
    anticipationFrames: 10,
    cameraEffect: 'lock',
  },
  {
    id: 'ev_02_pr_logo_sting_lock',
    semanticRole: 'Public Relations institutional emblem reveals and locks firmly during narration',
    shotId: 'Shot01',
    startFrame: 30,
    endFrame: 140,
    rhythmPhase: 'SETTLE',
    action: 'hold',
    settleFrames: 15,
    cameraEffect: 'lock',
  },
  {
    id: 'ev_03_pr_logo_carrier_unfold',
    semanticRole: 'PR logo perimeter ring unfolds into horizontal datum line across screen',
    shotId: 'Shot01',
    startFrame: 140,
    endFrame: 170,
    rhythmPhase: 'TRANSFORMATION',
    action: 'transform',
    source: {
      id: 'pr_ring',
      name: 'PR Seal Ring',
      geometryType: 'seal_circle',
      coordinates: { x: '50%', y: '44%', width: 220, height: 220 },
    },
    target: {
      id: 'datum_line',
      name: 'Editorial Datum Horizon',
      geometryType: 'datum_line',
      coordinates: { x: 80, y: '52%', width: 1760, height: 2 },
    },
    cameraEffect: 'push',
  },
  {
    id: 'ev_04_hook_question_lead',
    semanticRole: 'Question lead typography reveals along the active datum line',
    shotId: 'Shot01',
    startFrame: 172,
    endFrame: 230,
    rhythmPhase: 'BUILD',
    action: 'reveal',
    cameraEffect: 'hold',
  },
  {
    id: 'ev_05_hero_keyword_strike',
    semanticRole: 'Hero title slams with explosive acoustic impact and locks into stone stability',
    shotId: 'Shot01',
    startFrame: 230,
    endFrame: 350,
    rhythmPhase: 'IMPACT',
    action: 'collide',
    impactFrames: 6,
    settleFrames: 16,
    cameraEffect: 'punch',
  },
  {
    id: 'ev_06_t1_rotational_sweep',
    semanticRole: 'Horizontal datum line accelerates and sweeps 90 deg into vertical divider beam',
    shotId: 'Shot01',
    startFrame: 350,
    endFrame: 380,
    rhythmPhase: 'ACCELERATION',
    action: 'transform',
    source: {
      id: 'datum_rule',
      name: 'Shot 01 Datum Rule',
      geometryType: 'datum_line',
      coordinates: { x: 80, y: '52%', width: 1760, height: 2 },
    },
    target: {
      id: 'vertical_beam',
      name: 'Shot 02 Divider Beam',
      geometryType: 'divider_beam',
      coordinates: { x: 1360, y: 70, width: 3, height: 940 },
    },
    handoff: {
      carrierName: 'Rotational Datum Rule',
      targetShot: 'Shot02',
      geometricInvariant: 'Sweeps 90deg clockwise from y=52% to right:560px',
      transferEnergy: 'Kinetic rotational momentum carries into statute decree intake',
    },
    cameraEffect: 'pull',
  },

  // ==================== SHOT 02: OFFICIAL REGULATION DECREE (350 - 650f) ====================
  {
    id: 'ev_07_t1_divider_intake',
    semanticRole: 'Continuous intake of vertical divider beam from Shot 01 sweep',
    shotId: 'Shot02',
    startFrame: 350,
    endFrame: 380,
    rhythmPhase: 'BUILD',
    action: 'assemble',
    cameraEffect: 'hold',
  },
  {
    id: 'ev_08_decree_seal_strike',
    semanticRole: 'Statutory decree seal and article headline strike and settle firmly',
    shotId: 'Shot02',
    startFrame: 380,
    endFrame: 500,
    rhythmPhase: 'IMPACT',
    action: 'collide',
    settleFrames: 20,
    cameraEffect: 'lock',
  },
  {
    id: 'ev_09_decree_reading_hold',
    semanticRole: 'Reading hold for legal article decree; complete stillness for reading',
    shotId: 'Shot02',
    startFrame: 500,
    endFrame: 620,
    rhythmPhase: 'SETTLE',
    action: 'hold',
    cameraEffect: 'lock',
  },
  {
    id: 'ev_10_t2_symmetric_fission',
    semanticRole: 'Vertical divider beam splits into 3 parallel axes for criteria columns',
    shotId: 'Shot02',
    startFrame: 620,
    endFrame: 650,
    rhythmPhase: 'TRANSFORMATION',
    action: 'split',
    handoff: {
      carrierName: '3-Axis Divider Fission',
      targetShot: 'Shot03',
      geometricInvariant: 'Right: 560px splits into Right: 640px, 1200px, 1760px',
      transferEnergy: 'Symmetric fission creates 3-column architectural scaffolding',
    },
    cameraEffect: 'push',
  },

  // ==================== SHOT 03: TRIPARTITE PREREQUISITE CRITERIA (620 - 1480f) ====================
  {
    id: 'ev_11_criteria_column_intake',
    semanticRole: '3-column vertical grid expands from incoming fission lines',
    shotId: 'Shot03',
    startFrame: 620,
    endFrame: 680,
    rhythmPhase: 'BUILD',
    action: 'assemble',
    cameraEffect: 'hold',
  },
  {
    id: 'ev_12_criterion_1_growth',
    semanticRole: 'Criterion 1 (Academic Excellence) grows with kinetic numeral 1 and locks',
    shotId: 'Shot03',
    startFrame: 680,
    endFrame: 900,
    rhythmPhase: 'SETTLE',
    action: 'hold',
    cameraEffect: 'lock',
  },
  {
    id: 'ev_13_criterion_2_growth',
    semanticRole: 'Criterion 2 (Research Output) grows with kinetic numeral 2 and locks',
    shotId: 'Shot03',
    startFrame: 900,
    endFrame: 1150,
    rhythmPhase: 'SETTLE',
    action: 'hold',
    cameraEffect: 'lock',
  },
  {
    id: 'ev_14_criterion_3_growth',
    semanticRole: 'Criterion 3 (Ethics & Innovation) grows with kinetic numeral 3 and locks',
    shotId: 'Shot03',
    startFrame: 1150,
    endFrame: 1420,
    rhythmPhase: 'SETTLE',
    action: 'hold',
    cameraEffect: 'lock',
  },
  {
    id: 'ev_15_t3_datum_collapse',
    semanticRole: '3 column masses compress vertically down onto continuous baseline rule',
    shotId: 'Shot03',
    startFrame: 1420,
    endFrame: 1480,
    rhythmPhase: 'TRANSFORMATION',
    action: 'collapse',
    handoff: {
      carrierName: 'Baseline Datum Collapse',
      targetShot: 'Shot04',
      geometricInvariant: 'Columns flatten to y=520px horizontal rule (width: 1800px)',
      transferEnergy: 'Mass compression accumulates into rigid linear timeline rail',
    },
    cameraEffect: 'pull',
  },

  // ==================== SHOT 04: TEMPORAL CUTOFF WINDOW (1450 - 1730f) ====================
  {
    id: 'ev_16_timeline_rail_intake',
    semanticRole: 'Continuous intake of 1800px horizontal rail from Shot 03 collapse',
    shotId: 'Shot04',
    startFrame: 1450,
    endFrame: 1500,
    rhythmPhase: 'BUILD',
    action: 'assemble',
    cameraEffect: 'hold',
  },
  {
    id: 'ev_17_cutoff_deadline_slam',
    semanticRole: 'Cutoff barrier slams with decaying impact shake on frame 1575',
    shotId: 'Shot04',
    startFrame: 1550,
    endFrame: 1680,
    rhythmPhase: 'IMPACT',
    action: 'collide',
    impactFrames: 8,
    settleFrames: 24,
    cameraEffect: 'punch',
  },
  {
    id: 'ev_18_t4_plinth_dock',
    semanticRole: 'Horizontal timeline rail descends to y=760px and thickens into plinth',
    shotId: 'Shot04',
    startFrame: 1680,
    endFrame: 1730,
    rhythmPhase: 'TRANSFORMATION',
    action: 'transform',
    handoff: {
      carrierName: 'Plinth Foundation Dock',
      targetShot: 'Shot05',
      geometricInvariant: 'Rail descends from y=520px to y=760px, thickening to 6px',
      transferEnergy: 'Horizontal momentum docks down into monolithic foundation mass',
    },
    cameraEffect: 'push',
  },

  // ==================== SHOT 05: ACADEMIC SCORE THRESHOLDS (1700 - 2185f) ====================
  {
    id: 'ev_19_monolith_plinth_intake',
    semanticRole: 'Continuous intake of 6px foundation plinth supporting 3 monoliths',
    shotId: 'Shot05',
    startFrame: 1700,
    endFrame: 1760,
    rhythmPhase: 'BUILD',
    action: 'assemble',
    cameraEffect: 'hold',
  },
  {
    id: 'ev_20_monolith_threshold_reading',
    semanticRole: 'Reading hold for 3 monolith thresholds (Ph.D, Master, Bachelor)',
    shotId: 'Shot05',
    startFrame: 1760,
    endFrame: 2120,
    rhythmPhase: 'SETTLE',
    action: 'hold',
    cameraEffect: 'lock',
  },
  {
    id: 'ev_21_t5_laser_singularity_collapse',
    semanticRole: 'Summit laser vectors converge at (960, 345) compressing into high-density singularity',
    shotId: 'Shot05',
    startFrame: 2120,
    endFrame: 2185,
    rhythmPhase: 'ACCELERATION',
    action: 'collapse',
    handoff: {
      carrierName: 'Gravitational Singularity',
      targetShot: 'Shot06',
      geometricInvariant: 'Summit vectors compress to singular point at (960, 345)',
      transferEnergy: 'Gravitational compression triggers outward heraldic detonation',
    },
    cameraEffect: 'push',
  },

  // ==================== SHOT 06: INSTITUTIONAL OUTRO & FINAL LOCKUP (2155 - 2361f) ====================
  {
    id: 'ev_22_singularity_detonation',
    semanticRole: 'Singularity node detonates into heraldic rays and institutional crest',
    shotId: 'Shot06',
    startFrame: 2155,
    endFrame: 2195,
    rhythmPhase: 'IMPACT',
    action: 'expand',
    impactFrames: 10,
    settleFrames: 20,
    cameraEffect: 'pull',
  },
  {
    id: 'ev_23_university_title_strike',
    semanticRole: 'Baqiyatallah University master title strikes with canonical pronunciation lock',
    shotId: 'Shot06',
    startFrame: 2195,
    endFrame: 2280,
    rhythmPhase: 'SETTLE',
    action: 'hold',
    settleFrames: 20,
    cameraEffect: 'lock',
  },
  {
    id: 'ev_24_dual_institutional_lockup',
    semanticRole: 'Narrative energy resolves into unified University and Research Committee lockup',
    shotId: 'Shot06',
    startFrame: 2280,
    endFrame: 2361,
    rhythmPhase: 'SETTLE',
    action: 'assemble',
    settleFrames: 15,
    cameraEffect: 'lock',
  },
];

export function getEventsForShot(shotId: ChoreographyEvent['shotId']): ChoreographyEvent[] {
  return MASTER_CHOREOGRAPHY_EVENTS.filter((ev) => ev.shotId === shotId);
}

export function getActiveEventForFrame(frame: number): ChoreographyEvent | undefined {
  return MASTER_CHOREOGRAPHY_EVENTS.find(
    (ev) => frame >= ev.startFrame && frame < ev.endFrame
  );
}

/**
 * Checks if the current global frame is within a designated reading hold window.
 * When true, cameras and layouts MUST lock to avoid font rasterization jitter.
 */
export function isReadingHoldWindow(globalFrame: number): boolean {
  const ev = getActiveEventForFrame(globalFrame);
  return ev?.rhythmPhase === 'SETTLE' || ev?.action === 'hold';
}
