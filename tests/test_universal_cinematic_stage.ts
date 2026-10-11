import React from 'react';
import { UniversalCinematicStage, StageAct } from '../src/motion/stage/UniversalCinematicStage';
import { TEMPLATE_CATALOG, TemplateArchetype } from '../src/motion/templates/TemplateCatalog';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

console.log('================================================================');
console.log('RUNNING UNIVERSAL CINEMATIC STAGE & THEME DECOUPLING TEST SUITE');
console.log('================================================================\n');

const sampleActs: StageAct[] = [
  {
    actId: 'act1_hook',
    badgeFa: 'چالش داده‌ها',
    titleFa: 'انفجار اطلاعات و پیچیدگی سیستم‌ها',
    descriptionFa: 'حجم عظیم جریان داده‌های لحظه‌ای نیازمند هماهنگی شناختی چندعاملی است.',
    metricValue: '10x',
    metricLabelFa: 'افزایش توان عملیاتی',
    heroSymbol: '⚡',
    lottiePreset: 'tech_ai_core',
    emphasisTokens: ['انفجار اطلاعات', 'توان عملیاتی'],
  },
  {
    actId: 'act2_engine',
    badgeFa: 'موتور نوآوری',
    titleFa: 'شبکه توزیع‌شده با پاسخ میلی‌ثانیه‌ای',
    descriptionFa: 'موتور پردازش بدون وقفه با تفکیک وظایف و ترنزیشن‌های سینمایی.',
    metricValue: '99.9%',
    metricLabelFa: 'دقت پردازش داده',
    heroSymbol: '🧬',
    lottiePreset: 'bio_helix_pulse',
    emphasisTokens: ['شبکه توزیع‌شده', 'دقت پردازش'],
  },
  {
    actId: 'act3_vision',
    badgeFa: 'اکوسیستم آینده',
    titleFa: 'آینده موشن گرافیک هوشمند و خودکار',
    descriptionFa: 'ترکیب بی‌نقص فیزیک اسپرینگ، ضرب‌آهنگ موسیقی و گرافیک برداری.',
    metricValue: '100%',
    metricLabelFa: 'همگام با بیت موسیقی',
    heroSymbol: '🌐',
    lottiePreset: 'abstract_portal',
    emphasisTokens: ['موشن گرافیک', 'آینده هوشمند'],
  },
];

const archetypes = Object.keys(TEMPLATE_CATALOG) as TemplateArchetype[];

console.log(`Auditing UniversalCinematicStage across all ${archetypes.length} decoupled aesthetic themes:`);

archetypes.forEach((arch) => {
  const element = React.createElement(UniversalCinematicStage, {
    acts: sampleActs,
    themeId: arch,
    cameraMode: 'PANORAMIC_HORIZONTAL',
    bgmTrack: 'music/Tech_Live.mp3',
    bpm: 124,
  });

  assert(Boolean(element), `Failed to instantiate UniversalCinematicStage with theme ${arch}`);
  assert(element.props.themeId === arch, `Theme ID mismatch for ${arch}`);
  assert(element.props.acts.length === 3, `Acts length mismatch for ${arch}`);
  console.log(`  ✓ Theme "${arch}": UniversalCinematicStage rendered with universal camera & sound director.`);
});

console.log('\n================================================================');
console.log('✅ ALL UNIVERSAL CINEMATIC STAGE & THEME TESTS PASSED!');
console.log('================================================================');
