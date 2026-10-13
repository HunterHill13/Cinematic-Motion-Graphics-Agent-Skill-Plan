/**
 * ============================================================================
 * CLAUDE OPUS 5.5: CINEMATIC MASTER TEMPLATE CATALOG (9 PRODUCTION ARCHETYPES)
 * ============================================================================
 * 
 * Master registry of curated, production-grade video template archetypes.
 * Every template provides an end-to-end homogeneous visual world (consistent background,
 * camera grammar, sound design, and color DNA) eliminating the need for disjointed sub-style selection.
 * ============================================================================
 */

import { CameraTrajectoryMode } from '../camera/UniversalCameraRig';
import {
  ARCHETYPE_SPRING_PRESETS,
  SpringPresetDefinition,
} from '../physics/SpringPhysicsMatrix';

export type TemplateId =
  | 'DARK_GRAPHITE_TECH'
  | 'CONTINUOUS_UI_MORPH'
  | 'QUANTUM_BIO_DEEP_Z'
  | 'KINETIC_ARCHITECTURAL_TYPO'
  | 'BENTO_GRID_SAAS'
  | 'FINTECH_TRADING'
  | 'STOP_MOTION_PAPER'
  | 'TECHNICAL_BLUEPRINT'
  | 'NEO_BRUTALIST'
  | 'STUDIO_SHOWREEL';

export interface TemplateOklchPalette {
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  meshGradient: string;
}

export interface TemplateDefinition {
  id: TemplateId;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  bestForDomains: string[];
  recommendedCamera: CameraTrajectoryMode;
  defaultBgm: string;
  themeStyle: string;
  accentColors: string[];
  oklchColors: TemplateOklchPalette;
  springConfig: SpringPresetDefinition;
}

export const TEMPLATE_CATALOG: Record<TemplateId, TemplateDefinition> = {
  DARK_GRAPHITE_TECH: {
    id: 'DARK_GRAPHITE_TECH',
    titleFa: 'پرچمدار تکنولوژی و کد دارک-گرافیت',
    titleEn: 'Dark Graphite Developer Launch',
    descriptionFa: 'تمپلیت لوکس کنفرانس‌های فنی (مشابه لانچ فیلم TanStack AI): بوم تیره گرافیتی، نودهای ارتباطی شبکه، استریم متحرک کدها و متغیرها، و نمایش ابزارهای Agentic و MCP با انیمیشن‌های دقیق و تیز.',
    bestForDomains: ['توسعه‌دهندگان', 'ابزارهای برنامه‌نویسی', 'ایجنت‌های هوش مصنوعی', 'داده‌های مقداری', 'معماری نرم‌افزار'],
    recommendedCamera: 'DIAGONAL_CASCADE',
    defaultBgm: 'music/Cipher2.mp3',
    themeStyle: 'DARK_GRAPHITE_TECH',
    accentColors: ['#06b6d4', '#10b981', '#3b82f6', '#f43f5e'],
    oklchColors: {
      primary: 'oklch(0.72 0.17 215)',
      secondary: 'oklch(0.68 0.20 255)',
      accent: 'oklch(0.74 0.18 160)',
      highlight: 'oklch(0.68 0.24 15)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.72 0.17 215 / 0.25) 0%, oklch(0.68 0.20 255 / 0.10) 45%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.DARK_GRAPHITE_TECH,
  },
  CONTINUOUS_UI_MORPH: {
    id: 'CONTINUOUS_UI_MORPH',
    titleFa: 'مورفینگ پیوسته تک‌المان رابط‌کاربری و گلاسمورفیسم',
    titleEn: 'Continuous UI Morph & Component Stream',
    descriptionFa: 'الهام‌گرفته از استانداردهای دریبل و برترین انیمیشن‌های تعاملی: یک شکل مرکزی پایدار که بدون هیچ برشی به مؤلفه‌های گوناگون UI (کلیک، بارگذار دایره‌ای، اسلایدر کشسانی، چارت و نوتیفیکیشن) تبدیل می‌شود.',
    bestForDomains: ['طراحی رابط کاربری UI/UX', 'اپلیکیشن‌های موبایل', 'امکانات تعاملی', 'داشبوردهای ساده و روان'],
    recommendedCamera: 'DEEP_Z_TUNNEL',
    defaultBgm: 'music/Tech_Live.mp3',
    themeStyle: 'TACTILE_PAPER_AND_CLEAN_UI',
    accentColors: ['#f43f5e', '#fbbf24', '#10b981', '#0ea5e9'],
    oklchColors: {
      primary: 'oklch(0.65 0.24 15)',
      secondary: 'oklch(0.82 0.18 85)',
      accent: 'oklch(0.75 0.17 160)',
      highlight: 'oklch(0.70 0.18 230)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.65 0.24 15 / 0.22) 0%, oklch(0.82 0.18 85 / 0.08) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.CONTINUOUS_UI_MORPH,
  },
  QUANTUM_BIO_DEEP_Z: {
    id: 'QUANTUM_BIO_DEEP_Z',
    titleFa: 'سفر در عمق سلولی و کوانتومی (Deep-Z)',
    titleEn: 'Quantum & Bio Deep-Z Dive',
    descriptionFa: 'غوطه‌وری کامل در عمق فضا (Z-axis): عبور دوربین از درون غشاهای زیستی، ساختارهای هلیکس DNA و ابرهای ذرات کوانتومی به همراه تله‌متری بیوفیزیکی و انکسار نور روی بافت‌های ارگانیک.',
    bestForDomains: ['ژنتیک و بیوتکنولوژی', 'داروسازی و پزشکی', 'فیزیک کوانتوم', 'شبیه‌سازی‌های آکادمیک', 'نانوفناوری'],
    recommendedCamera: 'DEEP_Z_TUNNEL',
    defaultBgm: 'music/Brain_Dance.mp3',
    themeStyle: 'BIO_QUANTUM_DEEP_Z',
    accentColors: ['#10b981', '#d97706', '#06b6d4', '#8b5cf6'],
    oklchColors: {
      primary: 'oklch(0.75 0.18 160)',
      secondary: 'oklch(0.70 0.19 65)',
      accent: 'oklch(0.72 0.17 215)',
      highlight: 'oklch(0.65 0.24 300)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.75 0.18 160 / 0.25) 0%, oklch(0.65 0.24 300 / 0.12) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.QUANTUM_BIO_DEEP_Z,
  },
  KINETIC_ARCHITECTURAL_TYPO: {
    id: 'KINETIC_ARCHITECTURAL_TYPO',
    titleFa: 'تایپوگرافی معماری و مانیفست کینتیک',
    titleEn: 'Kinetic Architectural Manifesto',
    descriptionFa: 'مانیفست‌های کلامی غول‌آسا ("BUILD THE FLOOR"): تبدیل کلمات به ستون‌ها، تیرها و پلتفرم‌های ساختاری؛ کنتراست حداکثری سیاه و سفید با پرش‌های ریتمیک ناگهانی.',
    bestForDomains: ['مانیفست برند', 'معرفی شعارهای سازمانی', 'تیزرهای انگیزشی و پرانرژی', 'افتتاحیه کنفرانس‌ها'],
    recommendedCamera: 'PANORAMIC_HORIZONTAL',
    defaultBgm: 'music/Cipher2.mp3',
    themeStyle: 'ARCHITECTURAL_TYPO',
    accentColors: ['#f59e0b', '#ffffff', '#10b981', '#64748b'],
    oklchColors: {
      primary: 'oklch(0.82 0.18 85)',
      secondary: 'oklch(0.98 0 0)',
      accent: 'oklch(0.75 0.17 160)',
      highlight: 'oklch(0.55 0.05 240)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.82 0.18 85 / 0.22) 0%, oklch(0.55 0.05 240 / 0.08) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.KINETIC_ARCHITECTURAL_TYPO,
  },
  BENTO_GRID_SAAS: {
    id: 'BENTO_GRID_SAAS',
    titleFa: 'بنتو گرید ماژولار و کنسول ابری (Bento Grid SaaS)',
    titleEn: 'Bento Grid Modular SaaS Feature Matrix',
    descriptionFa: 'چیدمان مدرن سلول‌های بنتو: نمایش ماتریس قابلیت‌های محصول ابری، اسپارک‌لاین‌های زنده، نشان‌های تله‌متری متالیک و پن متمرکز روی کارت‌ها.',
    bestForDomains: ['محصولات نرم‌افزاری SaaS', 'داشبوردهای آماری و تحلیلی', 'معرفی فیچرهای چندگانه', 'B2B پلتفرم‌ها'],
    recommendedCamera: 'DIAGONAL_CASCADE',
    defaultBgm: 'music/Tech_Live.mp3',
    themeStyle: 'BENTO_GRID_SAAS',
    accentColors: ['#10b981', '#8b5cf6', '#06b6d4', '#f59e0b'],
    oklchColors: {
      primary: 'oklch(0.75 0.18 160)',
      secondary: 'oklch(0.65 0.24 300)',
      accent: 'oklch(0.72 0.17 215)',
      highlight: 'oklch(0.82 0.18 85)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.72 0.17 215 / 0.24) 0%, oklch(0.65 0.24 300 / 0.12) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.BENTO_GRID_SAAS,
  },
  FINTECH_TRADING: {
    id: 'FINTECH_TRADING',
    titleFa: 'ترمینال معاملاتی و فین‌تک (FinTech Trading)',
    titleEn: 'FinTech Trading Terminal & Market Depth',
    descriptionFa: 'نمایشگر وال‌استریت: کندل‌استیک‌های نئونی، امواج عمق نقدینگی دفترچه سفارشات، تیکر زنده قیمت‌ها و اسکیو عمق شبیه‌ساز مانیتورهای تریدینگ.',
    bestForDomains: ['صرافی و کریپتو', 'معاملات الگوریتمی', 'بانکداری و فین‌تک', 'سیستم‌های آنالیز مالی و بازار سرمایه'],
    recommendedCamera: 'PANORAMIC_HORIZONTAL',
    defaultBgm: 'music/Brain_Dance.mp3',
    themeStyle: 'FINTECH_TRADING',
    accentColors: ['#00e676', '#ff1744', '#ffd600', '#00e5ff'],
    oklchColors: {
      primary: 'oklch(0.75 0.20 150)',
      secondary: 'oklch(0.62 0.25 25)',
      accent: 'oklch(0.72 0.17 215)',
      highlight: 'oklch(0.82 0.18 85)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.75 0.20 150 / 0.22) 0%, oklch(0.62 0.25 25 / 0.10) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.FINTECH_TRADING,
  },
  STOP_MOTION_PAPER: {
    id: 'STOP_MOTION_PAPER',
    titleFa: 'استاپ‌موشن کلاژ و برش دستی کاغذ (Stop-Motion Paper)',
    titleEn: 'Tactile Stop-Motion Paper Craft & Collage',
    descriptionFa: 'حس نوستالژیک و ارگانیک کاردستی: بافت فیبر مقوا و کاغذ کرافت، انیمیشن روان با فیزیک ارتجاعی ۳۰ فریم بر ثانیه، نوارهای چسب نیمه‌شفاف و مهرهای فیزیکی استامپ‌شده.',
    bestForDomains: ['محتوای آموزشی صمیمی', 'استوری‌تلینگ برندهای خلاق', 'پادکست‌ها و معرفی کتاب', 'توضیحات مفاهیم پیچیده به زبان ساده'],
    recommendedCamera: 'PANORAMIC_HORIZONTAL',
    defaultBgm: 'music/Cipher2.mp3',
    themeStyle: 'STOP_MOTION_PAPER',
    accentColors: ['#d9534f', '#27ae60', '#d4b27e', '#4a3e2d'],
    oklchColors: {
      primary: 'oklch(0.75 0.14 55)',
      secondary: 'oklch(0.82 0.14 85)',
      accent: 'oklch(0.65 0.16 25)',
      highlight: 'oklch(0.96 0.02 90)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.75 0.14 55 / 0.18) 0%, oklch(0.82 0.14 85 / 0.08) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.STOP_MOTION_PAPER,
  },
  TECHNICAL_BLUEPRINT: {
    id: 'TECHNICAL_BLUEPRINT',
    titleFa: 'نقشه فنی و بلوپرینت مهندسی (Technical Blueprint)',
    titleEn: 'Engineering CAD Blueprint & Isometric Schematics',
    descriptionFa: 'دقت مطلق ریاضی و رسم‌فنی: بوم تیره سورمه‌ای با شبکه خط‌کش میلی‌متری فیروزه‌ای، خطوط ابعادی کولیس، مختصات مهندسی و تله‌متری مونواسپیس.',
    bestForDomains: ['مهندسی مکانیک و عمران', 'زیرساخت شبکه و سخت‌افزار', 'استانداردها و ایزوها', 'شبیه‌سازی‌های دقیق فنی'],
    recommendedCamera: 'DIAGONAL_CASCADE',
    defaultBgm: 'music/Brain_Dance.mp3',
    themeStyle: 'TECHNICAL_BLUEPRINT',
    accentColors: ['#00e5ff', '#00ffcc', '#38bdf8', '#0ea5e9'],
    oklchColors: {
      primary: 'oklch(0.78 0.15 220)',
      secondary: 'oklch(0.65 0.18 245)',
      accent: 'oklch(0.98 0 0)',
      highlight: 'oklch(0.80 0.16 85)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.78 0.15 220 / 0.25) 0%, oklch(0.65 0.18 245 / 0.12) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.TECHNICAL_BLUEPRINT,
  },
  NEO_BRUTALIST: {
    id: 'NEO_BRUTALIST',
    titleFa: 'نئوبروتالیسم پرقدرت و پرانرژی (Neo-Brutalist Punch)',
    titleEn: 'High-Voltage Neo-Brutalist Poster & Motion',
    descriptionFa: 'طراحی جسور و میخکوب‌کننده: زرد پرولتاژ اسیدی با مشکی غلیظ، خطوط دورگیری ضخیم ۴ پیکسلی، سایه‌های سخت ۱۲ پیکسلی، برچسب‌های استیکری و جهش‌های ارتجاعی تند.',
    bestForDomains: ['کمپین‌های تبلیغاتی و پروموشن', 'استارتاپ‌های ساختارشکن', 'رویدادهای فناوری و هکاتون‌ها', 'محتوای وایرال شبکه‌های اجتماعی'],
    recommendedCamera: 'PANORAMIC_HORIZONTAL',
    defaultBgm: 'music/Tech_Live.mp3',
    themeStyle: 'NEO_BRUTALIST',
    accentColors: ['#ffe600', '#000000', '#00e5ff', '#ff3366'],
    oklchColors: {
      primary: 'oklch(0.88 0.20 95)',
      secondary: 'oklch(0.60 0.28 15)',
      accent: 'oklch(0.15 0.01 260)',
      highlight: 'oklch(0.98 0 0)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.88 0.20 95 / 0.35) 0%, oklch(0.60 0.28 15 / 0.15) 50%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.NEO_BRUTALIST,
  },
  STUDIO_SHOWREEL: {
    id: 'STUDIO_SHOWREEL',
    titleFa: 'شوکیس پرچمدار استودیو (Universal Studio Showreel)',
    titleEn: 'Universal Multi-Act Studio Showreel',
    descriptionFa: 'روایت ممتد در ۴ پرده‌ی پیوسته با حرکت پیوسته دوربین ۳بعدی، ذرات نوری نیوتنی، و ترنزیشن‌های دینامیک.',
    bestForDomains: ['ارائه‌های کلان', 'شوکیس قابلیت‌های چندگانه استودیو'],
    recommendedCamera: 'PANORAMIC_HORIZONTAL',
    defaultBgm: 'music/Tech_Live.mp3',
    themeStyle: 'MULTI_ACT_STUDIO',
    accentColors: ['#10b981', '#f59e0b', '#38bdf8', '#6366f1'],
    oklchColors: {
      primary: 'oklch(0.72 0.17 215)',
      secondary: 'oklch(0.68 0.20 255)',
      accent: 'oklch(0.74 0.18 160)',
      highlight: 'oklch(0.82 0.18 85)',
      meshGradient: 'radial-gradient(ellipse at center in oklch, oklch(0.72 0.17 215 / 0.25) 0%, oklch(0.68 0.20 255 / 0.10) 45%, transparent 75%)',
    },
    springConfig: ARCHETYPE_SPRING_PRESETS.STUDIO_SHOWREEL,
  },
};

/**
 * Helper to recommend a template and camera trajectory based on topic analysis.
 */
export function recommendTemplateForTopic(topic: string): {
  template: TemplateDefinition;
  reasonFa: string;
} {
  const lower = topic.toLowerCase();

  if (lower.includes('کاغذ') || lower.includes('کلاژ') || lower.includes('آموزش') || lower.includes('ساده') || lower.includes('کاردستی') || lower.includes('کودک')) {
    return {
      template: TEMPLATE_CATALOG.STOP_MOTION_PAPER,
      reasonFa: 'موضوع ماهیت آموزشی، داستانی یا صمیمی دارد؛ تمپلیت استاپ‌موشن کاغذی با بافت کرافت و فیزیک روان ۳۰ فریم بر ثانیه بیشترین گرما و پذیرش مخاطب را ایجاد می‌کند.',
    };
  }

  if (lower.includes('نقشه') || lower.includes('مهندس') || lower.includes('معمار') || lower.includes('زیرساخت') || lower.includes('cad') || lower.includes('سخت‌افزار')) {
    return {
      template: TEMPLATE_CATALOG.TECHNICAL_BLUEPRINT,
      reasonFa: 'موضوع فنی، مهندسی و ساختاری است؛ تمپلیت بلوپرینت CAD با خطوط میلی‌متری و ابعاد دقیق، حس اقتدار علمی و مهندسی بالایی دارد.',
    };
  }

  if (lower.includes('تبلیغ') || lower.includes('کمپین') || lower.includes('تخفیف') || lower.includes('انرژی') || lower.includes('فروش') || lower.includes('وایرال')) {
    return {
      template: TEMPLATE_CATALOG.NEO_BRUTALIST,
      reasonFa: 'موضوع نیازمند شوک بصری، انرژی انفجاری و جذب آنی نگاه است؛ تمپلیت نئوبروتالیسم با رنگ اسیدی و سایه‌های سخت ۱۲ پیکسلی بیشترین درگیری را ایجاد می‌کند.',
    };
  }

  if (lower.includes('مالی') || lower.includes('ترید') || lower.includes('ارز') || lower.includes('بورس') || lower.includes('قیمت') || lower.includes('معامل') || lower.includes('کریپتو')) {
    return {
      template: TEMPLATE_CATALOG.FINTECH_TRADING,
      reasonFa: 'موضوع مالی و سرمایه‌گذاری است؛ تمپلیت فین‌تک با نمودارهای شمعی، تیکر زنده و عمق سفارشات اختصاصاً برای این حوزه خلق شده است.',
    };
  }

  if (lower.includes('پزشک') || lower.includes('دارو') || lower.includes('ژن') || lower.includes('سلول') || lower.includes('dna') || lower.includes('بیو') || lower.includes('کوانتوم')) {
    return {
      template: TEMPLATE_CATALOG.QUANTUM_BIO_DEEP_Z,
      reasonFa: 'موضوع شامل مفاهیم علمی، سلولی یا کوانتومی است که با سفر در عمق محور Z و شبیه‌سازی ذرات زیستی بیشترین تأثیر بصری را دارد.',
    };
  }

  if (lower.includes('برنامه') || lower.includes('کد') || lower.includes('توسعه') || lower.includes('api') || lower.includes('agent') || lower.includes('mcp')) {
    return {
      template: TEMPLATE_CATALOG.DARK_GRAPHITE_TECH,
      reasonFa: 'موضوع توسعه نرم‌افزار و ابزارهای هوش مصنوعی است؛ تمپلیت دارک-گرافیت با استریم داده و نمودارهای شاخه‌ای مناسب‌ترین لحن و فضای بصری را دارد.',
    };
  }

  if (lower.includes('saas') || lower.includes('داشبورد') || lower.includes('مدیریت') || lower.includes('پنل') || lower.includes('ویژگی') || lower.includes('امکانات')) {
    return {
      template: TEMPLATE_CATALOG.BENTO_GRID_SAAS,
      reasonFa: 'موضوع نیازمند معرفی شفاف مجموعه‌ای از قابلیت‌هاست؛ تمپلیت بنتو گرید مدرن هر قابلیت را در یک سلول شیک و متحرک قاب‌بندی می‌کند.',
    };
  }

  if (lower.includes('اپ') || lower.includes('رابط') || lower.includes('ui') || lower.includes('ux') || lower.includes('موبایل')) {
    return {
      template: TEMPLATE_CATALOG.CONTINUOUS_UI_MORPH,
      reasonFa: 'موضوع بر طراحی و قابلیت‌های تعاملی تمرکز دارد؛ مورفینگ تک‌المان ممتد رابط‌کاربری بهترین نمایش جریان نرم‌افزاری را ارائه می‌دهد.',
    };
  }

  if (lower.includes('مانیفست') || lower.includes('شعار') || lower.includes('انگیز') || lower.includes('بیانیه') || lower.includes('هدف')) {
    return {
      template: TEMPLATE_CATALOG.KINETIC_ARCHITECTURAL_TYPO,
      reasonFa: 'موضوع بیانیه‌ای قدرتمند و ماندگار است؛ تایپوگرافی معماری با حرکات کوبنده روی ساختار کلمات، پیام را به اوج نفوذ می‌رساند.',
    };
  }

  return {
    template: TEMPLATE_CATALOG.DARK_GRAPHITE_TECH,
    reasonFa: 'تمپلیت لوکس دارک-گرافیت یک استاندارد طلایی و همه کاره است که بیشترین هماهنگی را با موضوعات مدرن دارد.',
  };
}
