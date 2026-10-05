/**
 * V15 SEMANTIC BEAT SYSTEM
 * 
 * Based on the video-talkcraft and video-shotcraft semantic beat architecture.
 * "A semantic beat describes what the viewer should understand, not merely a timestamp."
 * 
 * "Only introduce new visual elements at semantic beat boundaries."
 * "A beat has only ONE primary hero actor; when its statement concludes, it makes way."
 */

export type SemanticIntent =
  | 'introduce'
  | 'emphasize'
  | 'compare'
  | 'explain'
  | 'quantify'
  | 'qualify'
  | 'transition'
  | 'conclude';

export type LayerId =
  | 'L0_Background'
  | 'L1_Atmosphere'
  | 'L2_Structure'
  | 'L3_PrimarySubject'
  | 'L4_Typography'
  | 'L5_SecondaryReaction'
  | 'L6_TransitionCarrier';

export interface SemanticBeat {
  id: string;
  shotId: 'Shot01' | 'Shot02' | 'Shot03' | 'Shot04' | 'Shot05' | 'Shot06';
  startFrame: number;
  endFrame: number;
  displayText: string;
  ttsText: string;
  intent: SemanticIntent;
  emphasisKeywords: string[];
  
  // Visual Hierarchy Quadrant
  primaryVisual: string;
  secondaryVisual: string;
  structuralVisual: string;
  atmosphericVisual: string;
  
  // Layer Budget Allocation
  activeLayers: LayerId[];
  
  // Camera & Motion Direction
  cameraMode: 'micro-push' | 'slow-dolly' | 'parallax-drift' | 'continuous' | 'micro-pull';
  motionRecipe: string;
  sfxCue?: string;
  transitionRole?: 'carry-out' | 'carry-in' | 'static-anchor';
}

export const V15_SEMANTIC_BEATS: SemanticBeat[] = [
  // ==================== SHOT 01: THE HOOK ====================
  {
    id: 'beat_01_presenter_intro',
    shotId: 'Shot01',
    startFrame: 0,
    endFrame: 165,
    displayText: 'روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند',
    ttsText: 'روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بَقیِّهُالله تقدیم می‌کند',
    intent: 'introduce',
    emphasisKeywords: ['کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله'],
    primaryVisual: 'Official Institutional Attribution Typography Block',
    secondaryVisual: 'Golden Luminous Anchor Dot',
    structuralVisual: '420px Horizontal Baseline Rule Draw',
    atmosphericVisual: 'Radial Spotlight (50% 45%, rgba(212,175,55,0.07))',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L4_Typography'],
    cameraMode: 'micro-push',
    motionRecipe: 'hook-typography-slam',
    sfxCue: 'sfx_sub_bass_rumble',
  },
  {
    id: 'beat_02_hook_question_lead',
    shotId: 'Shot01',
    startFrame: 165,
    endFrame: 230,
    displayText: 'آیا می‌دانید چگونه می‌توانید به عنوان',
    ttsText: 'آیا می‌دانید چگونه می‌توانید به عنوان',
    intent: 'introduce',
    emphasisKeywords: ['چگونه می‌توانید'],
    primaryVisual: 'Provocative Lead-In Question Typography',
    secondaryVisual: 'Architectural Framing Brackets (Quadrant Top/Bottom)',
    structuralVisual: '90px Architectural Vector Grid',
    atmosphericVisual: 'Breathing Radial Glow (1% scale idle)',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L4_Typography'],
    cameraMode: 'micro-push',
    motionRecipe: 'hook-typography-slam',
  },
  {
    id: 'beat_03_hero_keyword_strike',
    shotId: 'Shot01',
    startFrame: 230,
    endFrame: 350,
    displayText: 'دانشجوی پژوهشگر یا فناور برجسته کشور',
    ttsText: 'دانشجوی پژوهشگر یا فناور برجسته کشور',
    intent: 'emphasize',
    emphasisKeywords: ['دانشجوی پژوهشگر یا فناور برجسته کشور'],
    primaryVisual: 'Hero Title Collision Strike (scale 1.14 -> 1.00)',
    secondaryVisual: 'Glowing Golden Kinetic Underline Ray (880px draw)',
    structuralVisual: 'Architectural Quadrant Brackets Highlight',
    atmosphericVisual: 'Golden Particle Aura Drift',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'micro-push',
    motionRecipe: 'hook-typography-slam',
    sfxCue: 'sfx_hero_keyword_impact',
  },
  {
    id: 'beat_04_t1_underline_handoff',
    shotId: 'Shot01',
    startFrame: 350,
    endFrame: 380,
    displayText: 'انتخاب شوید و از تسهیلات ویژه آن بهره‌مند گردید؟',
    ttsText: 'انتخاب شوید و از تسهیلات ویژه آن بهره‌مند گردید؟',
    intent: 'transition',
    emphasisKeywords: ['تسهیلات ویژه'],
    primaryVisual: 'Kinetic Underline Ray Translation Handoff (x: 960 -> -200)',
    secondaryVisual: 'Resolving Question Suffix Fade',
    structuralVisual: 'Frame Boundary Horizon Warp',
    atmosphericVisual: 'Light Streak Directional Motion Blur',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L4_Typography', 'L6_TransitionCarrier'],
    cameraMode: 'micro-push',
    motionRecipe: 'hook-typography-slam',
    sfxCue: 'sfx_transition_whoosh_light',
    transitionRole: 'carry-out',
  },

  // ==================== SHOT 02: THE DECREE MONOLITH ====================
  {
    id: 'beat_05_statute_collision',
    shotId: 'Shot02',
    startFrame: 350,
    endFrame: 430,
    displayText: 'دستورالعمل بند کاف، ماده دو',
    ttsText: 'دستورالعمل بند کاف، ماده دو',
    intent: 'introduce',
    emphasisKeywords: ['بند کاف', 'ماده دو'],
    primaryVisual: 'Embossed Double-Ring Medallion (Scale of Justice Vector Collision)',
    secondaryVisual: 'Concentric Gold Shockwave Ripples (45f impact)',
    structuralVisual: 'Frosted Glass Plaque Monolith Border Expansion (1240x700)',
    atmosphericVisual: 'Central Beam Glow (rgba(212,175,55,0.08))',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'slow-dolly',
    motionRecipe: 'decree-monolith-reveal',
    sfxCue: 'sfx_heavy_stamp_collision',
    transitionRole: 'carry-in',
  },
  {
    id: 'beat_06_decree_source_path',
    shotId: 'Shot02',
    startFrame: 430,
    endFrame: 620,
    displayText: 'آیین‌نامه استعدادهای درخشان وزارت بهداشت مسیر جامع امتیازدهی به فعالیت‌های علمی و پژوهشی',
    ttsText: 'آیین‌نامه استعدادهای درخشان وزارت بهداشت مسیر جامع امتیازدهی به فعالیت‌های علمی و پژوهشی',
    intent: 'explain',
    emphasisKeywords: ['استعدادهای درخشان وزارت بهداشت', 'امتیازدهی'],
    primaryVisual: 'Cyan Ministerial Source Title + Clean Paragraph Mask Reveal',
    secondaryVisual: 'Embossed Scale Medallion Idle Breathing (0.5Hz micro-oscillation)',
    structuralVisual: 'Monolith Architectural Base Rule (960px)',
    atmosphericVisual: 'Deep Void Gradient Drift',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography'],
    cameraMode: 'slow-dolly',
    motionRecipe: 'decree-monolith-reveal',
  },
  {
    id: 'beat_07_t2_symmetric_fission',
    shotId: 'Shot02',
    startFrame: 620,
    endFrame: 650,
    displayText: 'سه شرط اصلی پیش از محاسبه امتیازها',
    ttsText: 'سه شرط اصلی پیش از محاسبه امتیازها',
    intent: 'transition',
    emphasisKeywords: ['سه شرط اصلی'],
    primaryVisual: 'Symmetric Fission of Medallion into Dual Outward Guide Nodes',
    secondaryVisual: 'Center Column Pre-Form Membrane',
    structuralVisual: 'Monolith Plaque Demarcation Lines',
    atmosphericVisual: 'Lateral Energy Dispersion',
    activeLayers: ['L0_Background', 'L2_Structure', 'L6_TransitionCarrier'],
    cameraMode: 'slow-dolly',
    motionRecipe: 'decree-monolith-reveal',
    sfxCue: 'sfx_energy_fission_split',
    transitionRole: 'carry-out',
  },

  // ==================== SHOT 03: TRIPARTITE CRITERIA ====================
  {
    id: 'beat_08_criteria_section_header',
    shotId: 'Shot03',
    startFrame: 620,
    endFrame: 750,
    displayText: 'سه شرط اصلی پیش از محاسبه امتیازها',
    ttsText: 'سه شرط اصلی پیش از محاسبه امتیازها',
    intent: 'introduce',
    emphasisKeywords: ['سه شرط اصلی'],
    primaryVisual: 'Section Title with Dual Gold Sentinel Markers',
    secondaryVisual: 'Tripartite Scaffold Ghost Columns',
    structuralVisual: 'Connecting Central Datum Axis (1400px draw)',
    atmosphericVisual: 'Atmospheric Architectural Grid (90px)',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L4_Typography'],
    cameraMode: 'parallax-drift',
    motionRecipe: 'tripartite-criteria-diagram',
    transitionRole: 'carry-in',
  },
  {
    id: 'beat_09_criterion1_gpa_lock',
    shotId: 'Shot03',
    startFrame: 750,
    endFrame: 950,
    displayText: 'شرط اول حداقل معدل کل ۱۶ معدل کل در مقطع فعلی باید حداقل شانزده باشد',
    ttsText: 'شرط اول حداقل معدل کل ۱۶ معدل کل در مقطع فعلی باید حداقل شانزده باشد',
    intent: 'quantify',
    emphasisKeywords: ['حداقل معدل کل', '۱۶'],
    primaryVisual: 'Column 1 GPA 16 Numeric Strike & Golden Border Lock',
    secondaryVisual: 'Circular Gauge Dial SVG Pulse',
    structuralVisual: 'Column 1 Frosted Plinth Base',
    atmosphericVisual: 'Focused Gold Backlight behind Column 1',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'parallax-drift',
    motionRecipe: 'tripartite-criteria-diagram',
    sfxCue: 'sfx_numeric_lock_chime',
  },
  {
    id: 'beat_10_criterion2_disciplinary_lock',
    shotId: 'Shot03',
    startFrame: 950,
    endFrame: 1120,
    displayText: 'شرط دوم سنوات مجاز و تأییدیه انضباطی حضور در سنوات مجاز تحصیلی و دریافت تأییدیه کمیته انضباطی',
    ttsText: 'شرط دوم سنوات مجاز و تأییدیه انضباطی حضور در سنوات مجاز تحصیلی و دریافت تأییدیه کمیته انضباطی',
    intent: 'qualify',
    emphasisKeywords: ['سنوات مجاز', 'تأییدیه انضباطی'],
    primaryVisual: 'Column 2 Shield Checkmark Lock & Cyan Luminescence',
    secondaryVisual: 'Concentric Cyan Validation Halo',
    structuralVisual: 'Column 2 Frosted Plinth Base',
    atmosphericVisual: 'Column 1 Enters Muted Supporting State (50% luminance)',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'parallax-drift',
    motionRecipe: 'tripartite-criteria-diagram',
    sfxCue: 'sfx_shield_checkmark_snap',
  },
  {
    id: 'beat_11_criterion3_articles_lock',
    shotId: 'Shot03',
    startFrame: 1120,
    endFrame: 1450,
    displayText: 'شرط سوم تنوع فعالیت‌ها و حضور مقاله ۶ ماده مختلف کسب امتیاز حداقل از شش ماده مختلف با اجباری بودن مقاله یا فعالیت فناورانه',
    ttsText: 'شرط سوم تنوع فعالیت‌ها و حضور مقاله ۶ ماده مختلف کسب امتیاز حداقل از شش ماده مختلف با اجباری بودن مقاله یا فعالیت فناورانه',
    intent: 'explain',
    emphasisKeywords: ['۶ ماده مختلف', 'مقاله', 'فعالیت فناورانه'],
    primaryVisual: 'Column 3 Molecule Node Cluster Lock & 6 Articles Badge',
    secondaryVisual: 'Three-Column Harmonized Triad Equilibrium',
    structuralVisual: 'Full Tripartite Horizontal Alignment Axis',
    atmosphericVisual: 'Golden Balanced Triad Glow',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'parallax-drift',
    motionRecipe: 'tripartite-criteria-diagram',
    sfxCue: 'sfx_triad_completion_swell',
  },
  {
    id: 'beat_12_t3_axis_collapse',
    shotId: 'Shot03',
    startFrame: 1450,
    endFrame: 1480,
    displayText: 'بازه زمانی معتبر ثبت مدارک',
    ttsText: 'بازه زمانی معتبر ثبت مدارک',
    intent: 'transition',
    emphasisKeywords: ['بازه زمانی'],
    primaryVisual: 'Datum Axis Vertical Compression (scaleY: 1 -> 0.02, scaleX: 1.4)',
    secondaryVisual: 'Columns Dissolve into Pure Spatial Vector',
    structuralVisual: 'Timeline Horizon Axis',
    atmosphericVisual: 'Horizontal Linear Acceleration Light',
    activeLayers: ['L0_Background', 'L2_Structure', 'L6_TransitionCarrier'],
    cameraMode: 'parallax-drift',
    motionRecipe: 'tripartite-criteria-diagram',
    sfxCue: 'sfx_axis_collapse_whoosh',
    transitionRole: 'carry-out',
  },

  // ==================== SHOT 04: TEMPORAL CUTOFF ====================
  {
    id: 'beat_13_timeline_chronological_travel',
    shotId: 'Shot04',
    startFrame: 1450,
    endFrame: 1575,
    displayText: 'بازه زمانی معتبر ثبت مدارک دوران تحصیل',
    ttsText: 'بازه زمانی معتبر ثبت مدارک دوران تحصیل',
    intent: 'introduce',
    emphasisKeywords: ['دوران تحصیل'],
    primaryVisual: '12-Month Chronological Tick Ruler with Luminous Cyan Travel Fill',
    secondaryVisual: 'Start Point Label «دوران تحصیل» Cyan Glow',
    structuralVisual: '12 Geometric Month Ticks (Vector, Zero Text)',
    atmosphericVisual: 'Subtle Horizontal Speed Trails',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography'],
    cameraMode: 'slow-dolly',
    motionRecipe: 'temporal-cutoff-timeline',
    transitionRole: 'carry-in',
  },
  {
    id: 'beat_14_cutoff_barrier_collision',
    shotId: 'Shot04',
    startFrame: 1575,
    endFrame: 1700,
    displayText: 'حداکثر تا یک سال پس از فارغ‌التحصیلی تمام مدارک باید مربوط به دوران تحصیل یا نهایتاً تا یک سال پس از فارغ‌التحصیلی باشد',
    ttsText: 'حداکثر تا یک سال پس از فارغ‌التحصیلی تمام مدارک باید مربوط به دوران تحصیل یا نهایتاً تا یک سال پس از فارغ‌التحصیلی باشد',
    intent: 'emphasize',
    emphasisKeywords: ['حداکثر تا یک سال پس از فارغ‌التحصیلی'],
    primaryVisual: 'Red Laser Barrier Collision & Hexagon Warning Shield Strike',
    secondaryVisual: 'Strict Deadline Red Label Reveal + Warning Callout Box',
    structuralVisual: 'Perpendicular Stop Barrier Plane',
    atmosphericVisual: 'Red Volumetric Alert Ambient Wave (rgba(239,68,68,0.06))',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'slow-dolly',
    motionRecipe: 'temporal-cutoff-timeline',
    sfxCue: 'sfx_barrier_collision_alert',
  },
  {
    id: 'beat_15_t4_planar_stage_fold',
    shotId: 'Shot04',
    startFrame: 1700,
    endFrame: 1730,
    displayText: 'حدنصاب قبولی بر حسب مقطع تحصیلی دانشگاه‌های تیپ یک',
    ttsText: 'حدنصاب قبولی بر حسب مقطع تحصیلی دانشگاه‌های تیپ یک',
    intent: 'transition',
    emphasisKeywords: ['حدنصاب قبولی'],
    primaryVisual: '3D Perspective Fold of Timeline Ruler (rotateX: 0 -> 60deg, translateY: 120px)',
    secondaryVisual: 'Transformation from Timeline Axis into Ground Architectural Plinth',
    structuralVisual: 'Perspective Horizon Plane',
    atmosphericVisual: 'Depth Dimming',
    activeLayers: ['L0_Background', 'L2_Structure', 'L6_TransitionCarrier'],
    cameraMode: 'slow-dolly',
    motionRecipe: 'temporal-cutoff-timeline',
    sfxCue: 'sfx_perspective_fold_tilt',
    transitionRole: 'carry-out',
  },

  // ==================== SHOT 05: SCORE THRESHOLDS ====================
  {
    id: 'beat_16_thresholds_section_intro',
    shotId: 'Shot05',
    startFrame: 1700,
    endFrame: 1850,
    displayText: 'حدنصاب قبولی بر حسب مقطع تحصیلی دانشگاه‌های تیپ یک',
    ttsText: 'حدنصاب قبولی بر حسب مقطع تحصیلی دانشگاه‌های تیپ یک',
    intent: 'introduce',
    emphasisKeywords: ['حدنصاب قبولی', 'دانشگاه‌های تیپ یک'],
    primaryVisual: 'Header Title with Dual Gold Sentinel Markers',
    secondaryVisual: 'Architectural Ground Datum Baseline Rule (1200px)',
    structuralVisual: 'Three Ascending Foundation Beds',
    atmosphericVisual: 'Radial Spotlight on Stage Base',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L4_Typography'],
    cameraMode: 'continuous',
    motionRecipe: 'score-threshold-pedestals',
    transitionRole: 'carry-in',
  },
  {
    id: 'beat_17_tier1_bachelor_65',
    shotId: 'Shot05',
    startFrame: 1850,
    endFrame: 1960,
    displayText: 'کارشناسی ۶۵ امتیاز',
    ttsText: 'کارشناسی ۶۵ امتیاز',
    intent: 'quantify',
    emphasisKeywords: ['کارشناسی', '۶۵'],
    primaryVisual: 'Pedestal 1 Rises to 180px with Gold Bevel + Numeric Strike 65',
    secondaryVisual: 'Gold Metric Unit Badge «امتیاز»',
    structuralVisual: 'Pedestal 1 Frosted Monolith Body',
    atmosphericVisual: 'Gold Ground Illumination',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'continuous',
    motionRecipe: 'score-threshold-pedestals',
    sfxCue: 'sfx_pedestal_rise_click',
  },
  {
    id: 'beat_18_tier2_medicine_110',
    shotId: 'Shot05',
    startFrame: 1960,
    endFrame: 2050,
    displayText: 'پزشکی عمومی ۱۱۰ امتیاز',
    ttsText: 'پزشکی عمومی ۱۱۰ امتیاز',
    intent: 'quantify',
    emphasisKeywords: ['پزشکی عمومی', '۱۱۰'],
    primaryVisual: 'Pedestal 2 Rises to 300px with Cyan Bevel + Numeric Strike 110',
    secondaryVisual: 'Cyan Metric Unit Badge «امتیاز»',
    structuralVisual: 'Pedestal 2 Frosted Monolith Body',
    atmosphericVisual: 'Cyan Stage Glow',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'continuous',
    motionRecipe: 'score-threshold-pedestals',
    sfxCue: 'sfx_pedestal_rise_click',
  },
  {
    id: 'beat_19_tier3_phd_130',
    shotId: 'Shot05',
    startFrame: 2050,
    endFrame: 2155,
    displayText: 'دکترای تخصصی ۱۳۰ امتیاز',
    ttsText: 'دکترای تخصصی ۱۳۰ امتیاز',
    intent: 'quantify',
    emphasisKeywords: ['دکترای تخصصی', '۱۳۰'],
    primaryVisual: 'Pedestal 3 Rises to 420px Monumental Zenith + Numeric Strike 130',
    secondaryVisual: 'Triple Plinth Ascending Monumental Chord',
    structuralVisual: 'Complete Three-Tier Stadium Architecture',
    atmosphericVisual: 'Warm Golden Monumental Toplight',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'continuous',
    motionRecipe: 'score-threshold-pedestals',
    sfxCue: 'sfx_major_chord_lock',
  },
  {
    id: 'beat_20_t5_gravitational_singularity',
    shotId: 'Shot05',
    startFrame: 2155,
    endFrame: 2185,
    displayText: 'کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله',
    ttsText: 'کمیته تحقیقات دانشگاه علوم پزشکی بَقیِّهُالله',
    intent: 'transition',
    emphasisKeywords: ['کمیته تحقیقات'],
    primaryVisual: 'Gravitational Singularity Collapse of Three Light Vectors into Origin',
    secondaryVisual: 'Luminous Central Core Compression (scale: 1 -> 0.08, glow: 45px)',
    structuralVisual: 'Stage Horizon Dissolution',
    atmosphericVisual: 'Radial Gravitational Inflow',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L6_TransitionCarrier'],
    cameraMode: 'continuous',
    motionRecipe: 'score-threshold-pedestals',
    sfxCue: 'sfx_singularity_implode',
    transitionRole: 'carry-out',
  },

  // ==================== SHOT 06: INSTITUTIONAL OUTRO ====================
  {
    id: 'beat_21_heraldic_crest_reveal',
    shotId: 'Shot06',
    startFrame: 2155,
    endFrame: 2230,
    displayText: 'کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله',
    ttsText: 'کمیته تحقیقات دانشگاه علوم پزشکی بَقیِّهُالله',
    intent: 'introduce',
    emphasisKeywords: ['کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله'],
    primaryVisual: 'Grand Heraldic Emblem Expansion (Singularity -> Golden Laurel Wreath Seal)',
    secondaryVisual: 'Concentric Dual Golden Shockwave Ripples (f40 collision)',
    structuralVisual: 'Filigree Gold Orbit Ring (0.3 deg/f rotation)',
    atmosphericVisual: 'Warm Golden Sovereign Halo (rgba(212,175,55,0.1))',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography', 'L5_SecondaryReaction'],
    cameraMode: 'micro-pull',
    motionRecipe: 'heraldic-institutional-seal',
    sfxCue: 'sfx_heraldic_seal_lock',
    transitionRole: 'carry-in',
  },
  {
    id: 'beat_22_outro_continuation_promise',
    shotId: 'Shot06',
    startFrame: 2230,
    endFrame: 2317,
    displayText: 'در ویدیوهای بعدی، روش کسب این امتیازها را گام به گام بررسی می‌کنیم با ما همراه باشید',
    ttsText: 'در ویدیوهای بعدی، روش کسب این امتیازها را گام به گام بررسی می‌کنیم با ما همراه باشید',
    intent: 'conclude',
    emphasisKeywords: ['گام به گام بررسی می‌کنیم', 'با ما همراه باشید'],
    primaryVisual: 'Continuation Promise Subtitle in Radiant Cyan + Golden CTA Badge',
    secondaryVisual: 'Heraldic Laurel Wreath Subtle Breathing Micro-Motion',
    structuralVisual: 'Architectural Footer Datum & Milestone Coordinates',
    atmosphericVisual: 'Atmospheric Deep Void & Golden Stardust Ambient',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography'],
    cameraMode: 'micro-pull',
    motionRecipe: 'heraldic-institutional-seal',
  },
  {
    id: 'beat_23_master_resolve_freeze',
    shotId: 'Shot06',
    startFrame: 2317,
    endFrame: 2361,
    displayText: 'کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله با ما همراه باشید',
    ttsText: 'کمیته تحقیقات دانشگاه علوم پزشکی بَقیِّهُالله با ما همراه باشید',
    intent: 'conclude',
    emphasisKeywords: ['با ما همراه باشید'],
    primaryVisual: 'Crystal-Clear Post-Narration Stillness & Authoritative Resolution',
    secondaryVisual: 'Filigree Orbit Ultra-Slow Drift',
    structuralVisual: 'Complete Balanced Sovereign Architecture',
    atmosphericVisual: 'Delicate Golden Embers',
    activeLayers: ['L0_Background', 'L1_Atmosphere', 'L2_Structure', 'L3_PrimarySubject', 'L4_Typography'],
    cameraMode: 'micro-pull',
    motionRecipe: 'heraldic-institutional-seal',
    transitionRole: 'static-anchor',
  },
];

/**
 * Lookup semantic beat active at a specific absolute master timeline frame.
 */
export function getActiveSemanticBeat(frame: number): SemanticBeat | undefined {
  return V15_SEMANTIC_BEATS.find((b) => frame >= b.startFrame && frame < b.endFrame);
}

/**
 * Retrieve all semantic beats for a specific shot.
 */
export function getBeatsForShot(shotId: SemanticBeat['shotId']): SemanticBeat[] {
  return V15_SEMANTIC_BEATS.filter((b) => b.shotId === shotId);
}
