export type HudEntry = {
  fromS: string;
  toS: string;
  text: string;
  tech?: string;
  fromOffset?: number;
  toOffset?: number;
  w?: number;
};

export type RailSpec = {
  steps: string[];
  switchS: string[];
  fromS: string;
  toS: string;
};

export const VIDEO = {
  slug: 'apoptosis',
  lang: 'en' as 'zh' | 'en',
  bg: 'dots' as 'stars' | 'dots',
  title: {
    big: 'APOPTOSIS',
    rest: '',
    en: 'Mitochondrial Intrinsic Pathway',
    tagline: 'How Cancer Cells Evade & Succumb to Programmed Cell Death',
  },
  credit: null,
  endingHold: 60,
  builtBy: 'built by Cinematic Motion Director',
  chapterTech: ['Malignant Evasion', 'MOMP Activation', 'Apoptosome Engine', 'Caspase Cascade', 'Targeted Resolution'],
  hud: [
    { fromS: 'S01', toS: 'S01', text: 'Oncogenic Stress', tech: 'Hallmark of Cancer' },
    { fromS: 'S02', toS: 'S02', text: 'BCL-2 Shield', tech: 'BAX Sequestration' },
    { fromS: 'S03', toS: 'S03', text: 'MOMP Breach', tech: 'Cytochrome c Egress' },
    { fromS: 'S04', toS: 'S04', text: 'Apoptosome Assembly', tech: 'Apaf-1 Heptamer' },
    { fromS: 'S05', toS: 'S05', text: 'Caspase Execution', tech: 'DNA Laddering' },
    { fromS: 'S06', toS: 'S06', text: 'BH3 Mimetics', tech: 'Apoptotic Victory' },
  ],
  rail: null as RailSpec | null,
};
