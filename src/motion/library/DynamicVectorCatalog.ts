/**
 * ============================================================================
 * CLAUDE OPUS 5.5 DYNAMIC VECTOR ASSET CATALOG & DOMAIN RESOLVER
 * ============================================================================
 * 
 * High-precision normalized vector paths (viewBox 0 0 200 200) across 6 primary
 * scientific, technical, biomedical, and financial domains.
 * Includes semantic domain keyword resolution for Zero-to-Video automation.
 * ============================================================================
 */

export interface VectorShapeBlueprint {
  id: string;
  nameFa: string;
  domain: 'ai_computing' | 'biomedical_genetics' | 'physics_quantum' | 'fintech_growth' | 'security_defense' | 'cosmic_stellar';
  path: string;
  accentColor: string;
  keywords: string[];
  subLabelFa: string;
}

export const DYNAMIC_VECTOR_CATALOG: Record<string, VectorShapeBlueprint> = {
  NEURAL_SYNAPSE: {
    id: 'NEURAL_SYNAPSE',
    nameFa: 'شبکه سیناپس عصبی',
    domain: 'ai_computing',
    subLabelFa: 'گره‌های پردازش شناختی و هوش مصنوعی',
    accentColor: '#38bdf8',
    keywords: ['هوش مصنوعی', 'یادگیری ماشین', 'شبکه عصبی', 'مدل زبانی', 'کلاد', 'الگوریتم', 'ai', 'neural', 'deep learning'],
    path: 
      'M 100 35 C 145 35 175 65 175 105 C 175 140 145 165 100 165 C 55 165 25 140 25 105 C 25 65 55 35 100 35 Z ' +
      'M 100 55 C 125 55 145 75 145 105 C 145 130 125 145 100 145 C 75 145 55 130 55 105 C 55 75 75 55 100 55 Z',
  },

  DNA_HELIX_ORBIT: {
    id: 'DNA_HELIX_ORBIT',
    nameFa: 'مارپیچ هلیکس ژنتیک',
    domain: 'biomedical_genetics',
    subLabelFa: 'سازه بیومولکولی و توالی‌یابی سلولی',
    accentColor: '#10b981',
    keywords: ['پزشکی', 'ژنتیک', 'سلول', 'بیماری', 'درمان', 'دارو', 'بیوتکنولوژی', 'dna', 'genetics', 'medical', 'pharma'],
    path:
      'M 70 35 C 110 35 130 75 130 100 C 130 125 110 165 70 165 C 90 145 130 125 130 100 C 130 75 90 55 70 35 Z ' +
      'M 130 35 C 90 35 70 75 70 100 C 70 125 90 165 130 165 C 110 145 70 125 70 100 C 70 75 110 55 130 35 Z',
  },

  QUANTUM_ORBITALS: {
    id: 'QUANTUM_ORBITALS',
    nameFa: 'مدارهای کوانتومی',
    domain: 'physics_quantum',
    subLabelFa: 'میدان مغناطیسی و برهم‌نهی اتمی',
    accentColor: '#818cf8',
    keywords: ['کوانتوم', 'فیزیک', 'اتم', 'میدان', 'امواج', 'ذرات', 'انرژی', 'quantum', 'physics', 'energy'],
    path:
      'M 100 40 C 135 40 160 65 160 100 C 160 135 135 160 100 160 C 65 160 40 135 40 100 C 40 65 65 40 100 40 Z ' +
      'M 100 65 C 120 65 135 80 135 100 C 135 120 120 135 100 135 C 80 135 65 120 65 100 C 65 80 80 65 100 65 Z',
  },

  EXPONENTIAL_CHART: {
    id: 'EXPONENTIAL_CHART',
    nameFa: 'شاخص رشد نمایی',
    domain: 'fintech_growth',
    subLabelFa: 'تحلیل صعودی ارزش و شاخص‌های مالی',
    accentColor: '#f59e0b',
    keywords: ['مالی', 'اقتصاد', 'رشد', 'فروش', 'ارز', 'سهام', 'مارکتینگ', 'کسب و کار', 'fintech', 'growth', 'finance'],
    path:
      'M 35 165 L 165 165 L 165 145 L 65 145 L 65 35 L 35 35 Z ' +
      'M 65 130 L 105 90 L 125 110 L 165 50 L 145 50 L 165 50 L 165 70 Z',
  },

  SECURITY_SHIELD: {
    id: 'SECURITY_SHIELD',
    nameFa: 'سپر امنیتی کالیبره',
    domain: 'security_defense',
    subLabelFa: 'حفاظت داده‌ها و راستی‌آزمایی رمزنگاری',
    accentColor: '#06b6d4',
    keywords: ['امنیت', 'سایبری', 'رمزنگاری', 'اعتبارسنجی', 'حفاظت', 'تاییدیه', 'security', 'cyber', 'auth'],
    path:
      'M 100 30 L 165 55 L 165 110 C 165 145 135 170 100 180 C 65 170 35 145 35 110 L 35 55 Z ' +
      'M 100 55 L 145 72 L 145 110 C 145 135 125 152 100 160 C 75 152 55 135 55 110 L 55 72 Z',
  },

  STELLAR_OCTAGRAM: {
    id: 'STELLAR_OCTAGRAM',
    nameFa: 'ستاره طلایی استاندارد',
    domain: 'cosmic_stellar',
    subLabelFa: 'سنجش مرجع و بالاترین رتبه کیفی',
    accentColor: '#fbbf24',
    keywords: ['کیفیت', 'برتر', 'طلایی', 'استاندارد', 'ستاره', 'ممتاز', 'بهترین', 'gold', 'stellar', 'star'],
    path:
      'M 100 25 L 122 75 L 175 75 L 132 106 L 148 158 L 100 126 L 52 158 L 68 106 L 25 75 L 78 75 Z ' +
      'M 100 55 L 112 85 L 145 85 L 118 104 L 128 135 L 100 115 L 72 135 L 82 104 L 55 85 L 88 85 Z',
  },

  CIRCUIT_CHIP: {
    id: 'CIRCUIT_CHIP',
    nameFa: 'تراشه مدار مجتمع',
    domain: 'ai_computing',
    subLabelFa: 'معماری سیلیکونی و شتاب‌دهنده سخت‌افزاری',
    accentColor: '#22c55e',
    keywords: ['سخت افزار', 'تراشه', 'سیلیکون', 'پردازنده', 'gpu', 'cpu', 'chip', 'hardware'],
    path:
      'M 55 55 L 145 55 L 145 145 L 55 145 Z ' +
      'M 75 75 L 125 75 L 125 125 L 75 125 Z ' +
      'M 35 80 L 55 80 M 35 100 L 55 100 M 35 120 L 55 120 ' +
      'M 145 80 L 165 80 M 145 100 L 165 100 M 145 120 L 165 120 ' +
      'M 80 35 L 80 55 M 100 35 L 100 55 M 120 35 L 120 55 ' +
      'M 80 145 L 80 165 M 100 145 L 100 165 M 120 145 L 120 165',
  },
};

/**
 * Resolves an ordered progression of 4 domain-aligned vector shapes
 * based on input topic and semantic keywords.
 */
export function resolveVectorProgression(topicOrScenario: string): VectorShapeBlueprint[] {
  const normalized = topicOrScenario.toLowerCase();
  const blueprints = Object.values(DYNAMIC_VECTOR_CATALOG);

  // Score each blueprint by keyword match
  const scored = blueprints.map((bp) => {
    let score = 0;
    for (const kw of bp.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        score += 3;
      }
    }
    return { bp, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const matched = scored.filter((s) => s.score > 0).map((s) => s.bp);

  // If we don't have 4 distinct matches, backfill from catalog to form a coherent narrative sequence
  const result: VectorShapeBlueprint[] = [...matched];
  const defaultSequence: Array<keyof typeof DYNAMIC_VECTOR_CATALOG> = [
    'STELLAR_OCTAGRAM',
    'NEURAL_SYNAPSE',
    'QUANTUM_ORBITALS',
    'SECURITY_SHIELD',
  ];

  for (const key of defaultSequence) {
    if (result.length >= 4) break;
    const fallback = DYNAMIC_VECTOR_CATALOG[key];
    if (!result.some((r) => r.id === fallback.id)) {
      result.push(fallback);
    }
  }

  return result.slice(0, 4);
}
