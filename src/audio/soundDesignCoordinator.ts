/**
 * V15 SOUND DESIGN COORDINATOR
 * 
 * Conceptual Triad:
 * VISUAL EVENT + VOICE EVENT + CAUSAL SFX EVENT
 * 
 * Rules:
 * 1. SFX must reinforce visual causality (strike, collision, handoff).
 * 2. SFX must never overpower narration (automated -14dB to -18dB sub-level ducking).
 * 3. Every major kinetic contact has an acoustic anchor.
 */

export interface SfxCue {
  id: string;
  nameFa: string;
  frame: number;
  type: 'impact' | 'whoosh' | 'chime' | 'rumble' | 'click' | 'lock';
  targetDb: number; // e.g. -16dB
  visualAnchor: string;
  description: string;
}

export const V15_SFX_CUES: SfxCue[] = [
  {
    id: 'sfx_shot01_intro_drone',
    nameFa: 'پد بم آغازین',
    frame: 15,
    type: 'rumble',
    targetDb: -22,
    visualAnchor: 'Shot 01 Institutional Attribution Line Draw',
    description: 'Subtle low-frequency atmospheric bed opening',
  },
  {
    id: 'sfx_shot01_keyword_strike',
    nameFa: 'ضربه کلمه کلیدی پژوهشگر',
    frame: 234,
    type: 'impact',
    targetDb: -16,
    visualAnchor: 'Hero Title Keyword Strike Collision',
    description: 'Crisp high-definition kinetic impact under hero title',
  },
  {
    id: 'sfx_t1_underline_whoosh',
    nameFa: 'ووش انتقال خط مبنا T1',
    frame: 350,
    type: 'whoosh',
    targetDb: -18,
    visualAnchor: 'T1 Kinetic Underline Ray Translation Handoff',
    description: 'Controlled smooth directional whoosh',
  },
  {
    id: 'sfx_shot02_seal_collision',
    nameFa: 'کوبش مهر مصوبه رسمی',
    frame: 395,
    type: 'impact',
    targetDb: -14,
    visualAnchor: 'Embossed Scale Medallion Collision Stamp',
    description: 'Heavy institutional seal collision with shockwave ripple',
  },
  {
    id: 'sfx_t2_fission_split',
    nameFa: 'صدای شکافت متقارن T2',
    frame: 620,
    type: 'chime',
    targetDb: -18,
    visualAnchor: 'T2 Symmetric Fission into 3 Column Guides',
    description: 'Crystalline harmonic split tone',
  },
  {
    id: 'sfx_shot03_c1_gpa_chime',
    nameFa: 'قفل تایید معدل ۱۶',
    frame: 855,
    type: 'lock',
    targetDb: -16,
    visualAnchor: 'Column 1 GPA 16 Numeric Lock',
    description: 'Clean affirmative confirmation chime',
  },
  {
    id: 'sfx_shot03_c2_disciplinary_snap',
    nameFa: 'کلیک تایید انضباطی',
    frame: 1035,
    type: 'lock',
    targetDb: -16,
    visualAnchor: 'Column 2 Shield Checkmark Snap',
    description: 'Precision mechanical latch snap',
  },
  {
    id: 'sfx_shot03_c3_articles_swell',
    nameFa: 'طنین تایید مقالات شش ماده',
    frame: 1215,
    type: 'chime',
    targetDb: -16,
    visualAnchor: 'Column 3 Molecule Node Cluster Lock',
    description: 'Harmonic triad completion swell',
  },
  {
    id: 'sfx_t3_axis_collapse',
    nameFa: 'جمع‌شدن محور T3',
    frame: 1450,
    type: 'whoosh',
    targetDb: -18,
    visualAnchor: 'T3 Central Datum Axis Vertical Compression',
    description: 'High-speed linear vacuum collapse whoosh',
  },
  {
    id: 'sfx_shot04_barrier_collision',
    nameFa: 'برخورد گیت سقف زمانی',
    frame: 1575,
    type: 'impact',
    targetDb: -14,
    visualAnchor: 'Month 12 Red Laser Cutoff Barrier Collision',
    description: 'Sharp electronic gate barrier strike',
  },
  {
    id: 'sfx_t4_stage_fold',
    nameFa: 'تاشدن پرسپکتیو T4',
    frame: 1700,
    type: 'whoosh',
    targetDb: -18,
    visualAnchor: 'T4 Planar Stage Fold into Ground Plinth',
    description: 'Deep rotational spatial shift',
  },
  {
    id: 'sfx_shot05_tier1_click',
    nameFa: 'صعود سکوی کارشناسی ۶۵',
    frame: 1914,
    type: 'click',
    targetDb: -16,
    visualAnchor: 'Plinth 1 Rises to 180px with Gold Bevel',
    description: 'Solid mechanical plinth lock',
  },
  {
    id: 'sfx_shot05_tier2_click',
    nameFa: 'صعود سکوی پزشکی عمومی ۱۱۰',
    frame: 2010,
    type: 'click',
    targetDb: -16,
    visualAnchor: 'Plinth 2 Rises to 300px with Cyan Bevel',
    description: 'Solid mechanical plinth lock',
  },
  {
    id: 'sfx_shot05_tier3_chord',
    nameFa: 'صعود سکوی دکتری ۱۳۰',
    frame: 2100,
    type: 'chime',
    targetDb: -14,
    visualAnchor: 'Plinth 3 Rises to 420px Monumental Zenith',
    description: 'Ascending major chord resolution',
  },
  {
    id: 'sfx_t5_singularity_implosion',
    nameFa: 'درهم‌فشردگی سینگولاریتی T5',
    frame: 2155,
    type: 'whoosh',
    targetDb: -16,
    visualAnchor: 'T5 Gravitational Singularity Inflow',
    description: 'Gravitational center pull implosion',
  },
  {
    id: 'sfx_shot06_seal_crest_lock',
    nameFa: 'استقرار نشان زرین پایانی',
    frame: 2195,
    type: 'lock',
    targetDb: -14,
    visualAnchor: 'Heraldic Laurel Wreath Seal Lock',
    description: 'Authoritative sovereign emblem lock',
  },
];

/**
 * Returns any active SFX cues configured for a given frame.
 */
export function getActiveSfxCues(frame: number): SfxCue[] {
  return V15_SFX_CUES.filter((cue) => cue.frame === frame);
}
