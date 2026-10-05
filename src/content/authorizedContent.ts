/**
 * V14 AUTHORIZED CONTENT REGISTRY
 * 
 * Strict Content Authority Rule:
 * Every text literal rendered in V14 production must originate from this file.
 * The Content Layer is LOCKED. Every string is directly traceable to the official
 * script source (projects/persian_editorial_motion_test_v5_2/text/tts_input.txt).
 * 
 * ZERO invented words, ZERO fake metadata, ZERO decorative typography.
 */

export interface ContentEntry {
  id: string;
  text: string;
  source: 'narration' | 'source_document' | 'official_requirement';
  shotUsage: ('Shot01' | 'Shot02' | 'Shot03' | 'Shot04' | 'Shot05' | 'Shot06' | 'Gallery')[];
  description: string;
}

export const AUTHORIZED_CONTENT = {
  // Shot 01: The Editorial Hook & Core Question
  shot01: {
    introPresenter: {
      id: 'shot01_intro_presenter',
      text: 'روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند',
      source: 'narration',
      shotUsage: ['Shot01'],
      description: 'Opening institutional presentation attribution directly from narration line 1',
    },
    hookQuestionLead: {
      id: 'shot01_hook_question_lead',
      text: 'آیا می‌دانید چگونه می‌توانید به عنوان',
      source: 'narration',
      shotUsage: ['Shot01'],
      description: 'First line of the central narrative inquiry',
    },
    heroTitle: {
      id: 'shot01_hero_title',
      text: 'دانشجوی پژوهشگر یا فناور برجسته کشور',
      source: 'narration',
      shotUsage: ['Shot01', 'Gallery'],
      description: 'Primary thematic title and acoustic keyword strike phrase',
    },
    hookQuestionSuffix: {
      id: 'shot01_hook_question_suffix',
      text: 'انتخاب شوید و از تسهیلات ویژه آن بهره‌مند گردید؟',
      source: 'narration',
      shotUsage: ['Shot01'],
      description: 'Closing resolution of the opening question',
    },
  },

  // Shot 02: Statute & Official Regulation Decree
  shot02: {
    statuteHeadline: {
      id: 'shot02_statute_headline',
      text: 'دستورالعمل بند کاف، ماده دو',
      source: 'narration',
      shotUsage: ['Shot02', 'Gallery'],
      description: 'Official statutory article heading directly from narration line 3',
    },
    decreeSource: {
      id: 'shot02_decree_source',
      text: 'آیین‌نامه استعدادهای درخشان وزارت بهداشت',
      source: 'narration',
      shotUsage: ['Shot02'],
      description: 'Authoritative ministerial regulation source from narration line 3',
    },
    decreePathSummary: {
      id: 'shot02_decree_path_summary',
      text: 'مسیر جامع امتیازدهی به فعالیت‌های علمی و پژوهشی',
      source: 'narration',
      shotUsage: ['Shot02'],
      description: 'Core functional definition of the regulation',
    },
  },

  // Shot 03: Tripartite Prerequisite Criteria
  shot03: {
    sectionTitle: {
      id: 'shot03_section_title',
      text: 'سه شرط اصلی پیش از محاسبه امتیازها',
      source: 'narration',
      shotUsage: ['Shot03', 'Gallery'],
      description: 'Header introduction to the 3 criteria from narration line 4',
    },
    c1Label: {
      id: 'shot03_c1_label',
      text: 'شرط اول',
      source: 'narration',
      shotUsage: ['Shot03'],
      description: 'First milestone label',
    },
    c1Title: {
      id: 'shot03_c1_title',
      text: 'حداقل معدل کل',
      source: 'narration',
      shotUsage: ['Shot03', 'Gallery'],
      description: 'Criterion 1 category',
    },
    c1ScoreValue: {
      id: 'shot03_c1_score_value',
      text: '۱۶',
      source: 'narration',
      shotUsage: ['Shot03', 'Gallery'],
      description: 'Criterion 1 GPA numeric threshold',
    },
    c1Summary: {
      id: 'shot03_c1_summary',
      text: 'معدل کل در مقطع فعلی باید حداقل شانزده باشد',
      source: 'narration',
      shotUsage: ['Shot03'],
      description: 'Criterion 1 rule explanation from narration line 5',
    },
    c2Label: {
      id: 'shot03_c2_label',
      text: 'شرط دوم',
      source: 'narration',
      shotUsage: ['Shot03'],
      description: 'Second milestone label',
    },
    c2Title: {
      id: 'shot03_c2_title',
      text: 'سنوات مجاز و تأییدیه انضباطی',
      source: 'narration',
      shotUsage: ['Shot03', 'Gallery'],
      description: 'Criterion 2 category',
    },
    c2Summary: {
      id: 'shot03_c2_summary',
      text: 'حضور در سنوات مجاز تحصیلی و دریافت تأییدیه کمیته انضباطی',
      source: 'narration',
      shotUsage: ['Shot03'],
      description: 'Criterion 2 rule explanation from narration line 6',
    },
    c3Label: {
      id: 'shot03_c3_label',
      text: 'شرط سوم',
      source: 'narration',
      shotUsage: ['Shot03'],
      description: 'Third milestone label',
    },
    c3Title: {
      id: 'shot03_c3_title',
      text: 'تنوع فعالیت‌ها و حضور مقاله',
      source: 'narration',
      shotUsage: ['Shot03', 'Gallery'],
      description: 'Criterion 3 category',
    },
    c3ArticleCount: {
      id: 'shot03_c3_article_count',
      text: '۶ ماده مختلف',
      source: 'narration',
      shotUsage: ['Shot03', 'Gallery'],
      description: 'Criterion 3 requirement of 6 different regulation articles',
    },
    c3Summary: {
      id: 'shot03_c3_summary',
      text: 'کسب امتیاز حداقل از شش ماده مختلف با اجباری بودن مقاله یا فعالیت فناورانه',
      source: 'narration',
      shotUsage: ['Shot03'],
      description: 'Criterion 3 rule explanation from narration line 7',
    },
  },

  // Shot 04: Temporal Cutoff Window & Educational Deadlines
  shot04: {
    sectionTitle: {
      id: 'shot04_section_title',
      text: 'بازه زمانی معتبر ثبت مدارک',
      source: 'narration',
      shotUsage: ['Shot04', 'Gallery'],
      description: 'Header introduction to time restriction from narration line 8',
    },
    timelineStartPoint: {
      id: 'shot04_timeline_start_point',
      text: 'دوران تحصیل',
      source: 'narration',
      shotUsage: ['Shot04', 'Gallery'],
      description: 'Start of eligible academic activity window',
    },
    timelineCutoffLabel: {
      id: 'shot04_timeline_cutoff_label',
      text: 'حداکثر تا یک سال پس از فارغ‌التحصیلی',
      source: 'narration',
      shotUsage: ['Shot04', 'Gallery'],
      description: 'Strict legal deadline threshold from narration line 8',
    },
    timelineWarningText: {
      id: 'shot04_timeline_warning_text',
      text: 'تمام مدارک باید مربوط به دوران تحصیل یا نهایتاً تا یک سال پس از فارغ‌التحصیلی باشد',
      source: 'narration',
      shotUsage: ['Shot04'],
      description: 'Critical warning statement directly from narration line 8',
    },
  },

  // Shot 05: Academic Degree Score Threshold Pedestals
  shot05: {
    sectionTitle: {
      id: 'shot05_section_title',
      text: 'حدنصاب قبولی بر حسب مقطع تحصیلی دانشگاه‌های تیپ یک',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'Section header from narration line 9',
    },
    tier1Degree: {
      id: 'shot05_tier1_degree',
      text: 'کارشناسی',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'Bachelor degree level from narration line 10',
    },
    tier1Score: {
      id: 'shot05_tier1_score',
      text: '۶۵',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'Bachelor required score (شصت و پنج)',
    },
    tier1Unit: {
      id: 'shot05_tier1_unit',
      text: 'امتیاز',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'Score unit label',
    },
    tier2Degree: {
      id: 'shot05_tier2_degree',
      text: 'پزشکی عمومی',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'General Medicine degree level from narration line 11',
    },
    tier2Score: {
      id: 'shot05_tier2_score',
      text: '۱۱۰',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'General Medicine required score (صد و ده)',
    },
    tier2Unit: {
      id: 'shot05_tier2_unit',
      text: 'امتیاز',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'Score unit label',
    },
    tier3Degree: {
      id: 'shot05_tier3_degree',
      text: 'دکترای تخصصی',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'PhD/Specialty degree level from narration line 12',
    },
    tier3Score: {
      id: 'shot05_tier3_score',
      text: '۱۳۰',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'PhD required score (صد و سی)',
    },
    tier3Unit: {
      id: 'shot05_tier3_unit',
      text: 'امتیاز',
      source: 'narration',
      shotUsage: ['Shot05', 'Gallery'],
      description: 'Score unit label',
    },
  },

  // Shot 06: Grand Institutional Outro & Series Continuation
  shot06: {
    institutionTitle: {
      id: 'shot06_institution_title',
      text: 'کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله',
      source: 'narration',
      shotUsage: ['Shot06', 'Gallery'],
      description: 'Host research institution name from narration line 1 & 13',
    },
    continuationSubtitle: {
      id: 'shot06_continuation_subtitle',
      text: 'در ویدیوهای بعدی، روش کسب این امتیازها را گام به گام بررسی می‌کنیم',
      source: 'narration',
      shotUsage: ['Shot06', 'Gallery'],
      description: 'Continuation promise directly from narration line 13',
    },
    callToAction: {
      id: 'shot06_call_to_action',
      text: 'با ما همراه باشید',
      source: 'narration',
      shotUsage: ['Shot06', 'Gallery'],
      description: 'Closing call to action directly from narration line 13',
    },
  },
} as const;

/**
 * Flat list of all permitted exact text strings for preflight validation.
 */
export function getAllAuthorizedStrings(): string[] {
  const strings: string[] = [];

  function extractStrings(obj: any) {
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val && typeof val === 'object') {
        if ('text' in val && typeof val.text === 'string') {
          strings.push(val.text);
        } else {
          extractStrings(val);
        }
      }
    }
  }

  extractStrings(AUTHORIZED_CONTENT);
  return Array.from(new Set(strings));
}
