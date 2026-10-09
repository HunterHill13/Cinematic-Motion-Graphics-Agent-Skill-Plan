/**
 * ============================================================================
 * CLAUDE OPUS 5.5: CINEMATIC TEMPLATE CATALOG
 * ============================================================================
 * 
 * Master registry of curated, production-grade video template archetypes
 * extracted from top-performing GitHub motion architectures (yihui-dev/awesome-opus5-5-videos).
 * ============================================================================
 */

import { CameraTrajectoryMode } from '../camera/UniversalCameraRig';

export type TemplateId =
  | 'STUDIO_SHOWREEL'
  | 'DARK_GRAPHITE_TECH'
  | 'CONTINUOUS_UI_MORPH'
  | 'QUANTUM_BIO_DEEP_Z';

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
}

export const TEMPLATE_CATALOG: Record<TemplateId, TemplateDefinition> = {
  STUDIO_SHOWREEL: {
    id: 'STUDIO_SHOWREEL',
    titleFa: 'شوکیس استودیویی ۴ پرده‌ای چندسبکی',
    titleEn: 'Universal Multi-Act Studio Showreel',
    descriptionFa: 'روایت ممتد در ۴ پرده‌ی متمایز بصری (گلس‌مورفیک مدرن -> استاپ‌موشن برش کاغذ دستی -> کنسول فنی مهندسی بلوپرینت -> پوستر زرین نئوبروتالیسم) با حرکت پیوسته دوربین ۳بعدی و ذرات نوری نیوتنی.',
    bestForDomains: ['هوش مصنوعی', 'محصولات پرچمدار', 'پلتفرم‌های جامع', 'ارائه‌های استارتاپی', 'سرویس‌های ابری'],
    recommendedCamera: 'PANORAMIC_HORIZONTAL',
    defaultBgm: 'music/Tech_Live.mp3',
    themeStyle: 'MULTI_ACT_STUDIO',
    accentColors: ['#10b981', '#f59e0b', '#38bdf8', '#6366f1'],
  },
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
  },
  CONTINUOUS_UI_MORPH: {
    id: 'CONTINUOUS_UI_MORPH',
    titleFa: 'مورفینگ پیوسته تک‌المان رابط‌کاربری',
    titleEn: 'Continuous UI Morph & Component Stream',
    descriptionFa: 'الهام‌گرفته از استانداردهای دریبل و برترین انیمیشن‌های تعاملی: یک شکل مرکزی پایدار که بدون هیچ برشی به مؤلفه‌های گوناگون UI (کلیک، بارگذار دایره‌ای، اسلایدر کشسانی، چارت و نوتیفیکیشن) تبدیل می‌شود.',
    bestForDomains: ['طراحی رابط کاربری UI/UX', 'اپلیکیشن‌های موبایل', 'امکانات تعاملی', 'داشبوردهای ساده و روان'],
    recommendedCamera: 'DEEP_Z_TUNNEL',
    defaultBgm: 'music/Tech_Live.mp3',
    themeStyle: 'TACTILE_PAPER_AND_CLEAN_UI',
    accentColors: ['#f43f5e', '#fbbf24', '#10b981', '#0ea5e9'],
  },
  QUANTUM_BIO_DEEP_Z: {
    id: 'QUANTUM_BIO_DEEP_Z',
    titleFa: 'سفر در عمق سلولی و کوانتومی',
    titleEn: 'Quantum & Bio Deep-Z Dive',
    descriptionFa: 'غوطه‌وری کامل در عمق فضا (Z-axis): عبور دوربین از درون غشاهای زیستی، ساختارهای هلیکس DNA و ابرهای ذرات کوانتومی به همراه تله‌متری بیوفیزیکی و انکسار نور روی بافت‌های ارگانیک.',
    bestForDomains: ['ژنتیک و بیوتکنولوژی', 'داروسازی و پزشکی', 'فیزیک کوانتوم', 'شبیه‌سازی‌های آکادمیک', 'نانوفناوری'],
    recommendedCamera: 'DEEP_Z_TUNNEL',
    defaultBgm: 'music/Brain_Dance.mp3',
    themeStyle: 'BIO_QUANTUM_DEEP_Z',
    accentColors: ['#10b981', '#d97706', '#06b6d4', '#8b5cf6'],
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

  if (
    lower.includes('پزشک') ||
    lower.includes('دارو') ||
    lower.includes('ژن') ||
    lower.includes('سلول') ||
    lower.includes('dna') ||
    lower.includes('بیو') ||
    lower.includes('کوانتوم') ||
    lower.includes('اتم') ||
    lower.includes('زیست')
  ) {
    return {
      template: TEMPLATE_CATALOG.QUANTUM_BIO_DEEP_Z,
      reasonFa: 'موضوع شامل مفاهیم علمی، سلولی یا کوانتومی است که با سفر در عمق محور Z و شبیه‌سازی ذرات زیستی بیشترین تأثیر بصری را دارد.',
    };
  }

  if (
    lower.includes('برنامه') ||
    lower.includes('کد') ||
    lower.includes('توسعه') ||
    lower.includes('api') ||
    lower.includes('agent') ||
    lower.includes('mcp') ||
    lower.includes('سرور') ||
    lower.includes('کلاود') ||
    lower.includes('داده') ||
    lower.includes('امنیت')
  ) {
    return {
      template: TEMPLATE_CATALOG.DARK_GRAPHITE_TECH,
      reasonFa: 'موضوع فنی و نرم‌افزاری است؛ تم دارک-گرافیت با استریم داده و نمودارهای شاخه‌ای نودها مناسب‌ترین لحن و فضای بصری را خلق می‌کند.',
    };
  }

  if (
    lower.includes('اپ') ||
    lower.includes('رابط') ||
    lower.includes('ui') ||
    lower.includes('ux') ||
    lower.includes('کاربر') ||
    lower.includes('طراحی') ||
    lower.includes('کامپوننت')
  ) {
    return {
      template: TEMPLATE_CATALOG.CONTINUOUS_UI_MORPH,
      reasonFa: 'موضوع بر طراحی و قابلیت‌های محصولی تمرکز دارد؛ مورفینگ تک‌المان ممتد رابط‌کاربری بهترین نمایش جریان نرم‌افزاری را ارائه می‌دهد.',
    };
  }

  // Default flagship
  return {
    template: TEMPLATE_CATALOG.STUDIO_SHOWREEL,
    reasonFa: 'این موضوع یک معرفی پرچمدار و چندوجهی است که شوکیس ۴ پرده‌ای استودیویی با ترکیب استایل‌های مدرن و نئوبروتالیسم به آن غنای بصری کاملی می‌بخشد.',
  };
}
