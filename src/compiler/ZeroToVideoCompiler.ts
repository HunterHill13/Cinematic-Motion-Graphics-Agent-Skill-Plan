/**
 * ============================================================================
 * CLAUDE OPUS 5.5: ZERO-TO-VIDEO SEMANTIC COMPILER
 * ============================================================================
 * 
 * Transforms a single text topic, outline, or scenario into a fully-typed,
 * mathematically quantized VideoManifest.
 * 
 * Computes:
 * 1. Beat-grid timeline locked to 124 BPM (approx 14.5 frames per beat at 30fps).
 * 2. Visual domain matching (AI, Biomedical, Physics, Fintech, Security, Core).
 * 3. 4-Act narrative distribution:
 *    - Act 1: Glassmorphic Monolith & Call-to-Action
 *    - Act 2: Tactile Paper Stepper & Continuous Vector Morph
 *    - Act 3: 2.5D Blueprint Console & Kinetic Bar Chart
 *    - Act 4: Neo-Brutalist Docked Pavilion & Verification Seal
 * 4. Persian typography copy synthesis with professional medical/scientific tone.
 * ============================================================================
 */

import { VectorShapeBlueprint, resolveVectorProgression, DYNAMIC_VECTOR_CATALOG } from '../motion/library/DynamicVectorCatalog';
import { TemplateId, recommendTemplateForTopic, TEMPLATE_CATALOG } from '../motion/templates/TemplateCatalog';
import { CameraTrajectoryMode, Stage3DPosition, UniversalCameraRig } from '../motion/camera/UniversalCameraRig';

export interface KineticBarData {
  label: string;
  value: number;
  color: string;
  unit: string;
}

export interface StatusCardData {
  label: string;
  title: string;
  subtitle: string;
}

export interface SfxCue {
  file: string;
  frame: number;
  volume: number;
  durationInFrames: number;
  description: string;
}

export interface AudioManifest {
  bgmFile: string;
  bgmVolume: number;
  bpm: number;
  sfxCues: SfxCue[];
}

export interface VideoManifest {
  meta: {
    title: string;
    topic: string;
    durationInFrames: number;
    fps: number;
    bpm: number;
    canvasWidth: number;
    canvasHeight: number;
  };
  templateId: TemplateId;
  cameraTrajectory: CameraTrajectoryMode;
  stages3D: {
    act1: Stage3DPosition;
    act2: Stage3DPosition;
    act3: Stage3DPosition;
    act4: Stage3DPosition;
    dock: Stage3DPosition;
  };
  audio: AudioManifest;
  act1: {
    startFrame: number;
    durationInFrames: number;
    badge: string;
    headline: string;
    highlightWord: string;
    subtitle: string;
    buttonText: string;
  };
  act2: {
    startFrame: number;
    durationInFrames: number;
    headerPill: string;
    subtitle: string;
    stages: VectorShapeBlueprint[];
  };
  act3: {
    startFrame: number;
    durationInFrames: number;
    headerTitle: string;
    telemetryLabel: string;
    counterValue: number;
    barChartItems: KineticBarData[];
    statusBarText: string;
    statusCards: StatusCardData[];
  };
  act4: {
    startFrame: number;
    durationInFrames: number;
    stickerBadge: string;
    gaugeValue: number;
    gaugeLabel: string;
    headline: string;
    highlightWord: string;
    subtitle: string;
    verifiedPillText: string;
  };
  cameraKeyframes: {
    act1X: number;
    act2X: number;
    act3X: number;
    act4X: number;
    dockX: number;
  };
}

export interface CompilerInput {
  topic: string;
  customScript?: string;
  durationInSeconds?: number;
  templateId?: TemplateId;
  cameraTrajectory?: CameraTrajectoryMode;
}

export class ZeroToVideoCompiler {
  /**
   * Compiles any topic into a production-ready VideoManifest.
   */
  public static compile(input: CompilerInput): VideoManifest {
    const topic = input.topic.trim();
    const durationSeconds = input.durationInSeconds || 60;
    const fps = 30;
    const totalFrames = durationSeconds * fps;
    const bpm = 124;

    // Resolve 4 domain-aligned vector shapes
    const stages = resolveVectorProgression(topic);

    // Act frame breakdown matching cinematic pacing
    const act1Start = 0;
    const act1Duration = Math.round(totalFrames * 0.17); // ~310 frames
    const act2Start = Math.round(totalFrames * 0.18);   // ~330 frames
    const act2Duration = Math.round(totalFrames * 0.22); // ~400 frames
    const act3Start = Math.round(totalFrames * 0.40);   // ~720 frames
    const act3Duration = Math.round(totalFrames * 0.28); // ~500 frames
    const act4Start = Math.round(totalFrames * 0.68);   // ~1220 frames
    const act4Duration = totalFrames - act4Start;        // ~580 frames

    // Derive domain-specific contextual copy
    const isBiomedical = stages.some((s) => s.domain === 'biomedical_genetics');
    const isFintech = stages.some((s) => s.domain === 'fintech_growth');
    const isPhysics = stages.some((s) => s.domain === 'physics_quantum');

    let heroBadge = 'هوش مصنوعی پیشرفته · اسکیل موشن‌گرافیک سینمایی';
    let heroHighlight = 'سینمایی';
    let heroHeadline = `کارگردانی سینمایی ویدیو در تراز کلاد اوپوس ۵.۵`;
    let heroSubtitle = 'پایان اسلایدهای بی‌روح · انیمیشن پیوسته تک‌پلان با فیزیک اسپرینگ و طراحی صدای استودیویی';
    let heroButton = 'ورود به استودیو سینمایی';

    let act3Header = 'کنسول تله‌متری و تحلیل فضایی (نقشه فنی بلوپرینت)';
    let chartItems: KineticBarData[] = [
      { label: 'کلاد اوپوس', value: 99.4, color: '#38bdf8', unit: '٪' },
      { label: 'سرعت فریم', value: 96.0, color: '#06b6d4', unit: '٪' },
      { label: 'موتور سنتی', value: 64.2, color: '#d97706', unit: '٪' },
    ];
    let counterVal = 99.8;

    let card1Title = 'قفل ضرب‌آهنگ (Beat-Grid)';
    let card1Sub = 'تمپو: ۱۲۴ BPM';
    let card2Title = 'یکان بخ نسخه طلایی';
    let card2Sub = 'تایپوگرافی اصیل و بدون پرش';
    let card3Title = 'تک‌پلان بدون کات (One-Take)';
    let card3Sub = 'جریان ممتد فوکوس';

    if (isBiomedical) {
      heroBadge = 'بیوتکنولوژی و ژنتیک محاسباتی · سیستم سینمایی';
      heroHeadline = `تحلیل بیومولکولی و ژنومیک پیشرفته: ${topic}`;
      heroHighlight = 'ژنومیک';
      heroSubtitle = 'مدل‌سازی سه‌بعدی توالی هلیکس DNA با رندرینگ نوری داینامیک و تله‌متری سلولی';
      heroButton = 'بررسی کاتالوگ زیستی';

      act3Header = 'کنسول بیوانفورماتیک و پایش توالی‌های نوکلئوتیدی';
      chartItems = [
        { label: 'دقت هلیکس', value: 99.7, color: '#10b981', unit: '٪' },
        { label: 'توان تاشدگی', value: 94.8, color: '#38bdf8', unit: '٪' },
        { label: 'روش آزمایشگاهی', value: 71.5, color: '#f59e0b', unit: '٪' },
      ];
      counterVal = 99.9;
      card1Title = 'پایش پیوسته ساختار مولکولی';
      card1Sub = 'پایداری: رده آنزیمی کاتالیزور';
      card2Title = 'بیوداده استاندارد NCBI';
      card2Sub = 'توالی ژنومی با انکسار نوری دقیق';
      card3Title = 'شبیه‌سازی برداری پروتئین';
      card3Sub = 'محاسبات همگرای بیوفیزیکی';
    } else if (isFintech) {
      heroBadge = 'هوش مالی و اقتصاد مقداری · موتور تحلیلی';
      heroHeadline = `تحلیل و مدیریت داده‌های مقداری: ${topic}`;
      heroHighlight = 'مقداری';
      heroSubtitle = 'نمودارهای جنبشی زنده با تقارن داده‌ای و سنجش سودآوری الگوریتمی';
      heroButton = 'مشاهده شاخص‌های مالی';

      act3Header = 'کنسول پایش لحظه‌ای مارکت و ارزش سهام';
      chartItems = [
        { label: 'بازده پرتفوی', value: 98.6, color: '#f59e0b', unit: '٪' },
        { label: 'شاخص آلفا', value: 92.1, color: '#10b981', unit: '٪' },
        { label: 'شاخص بازار', value: 58.4, color: '#94a3b8', unit: '٪' },
      ];
      counterVal = 98.9;
      card1Title = 'محاسبه ریسک با واریانس حداقل';
      card1Sub = 'بتا: ۰.۸۲ (مقاوم در برابر نوسان)';
      card2Title = 'شاخص رشد مرکب سالانه';
      card2Sub = 'سودآوری خطی مداوم';
      card3Title = 'معاملات پربسامد بدون تاخیر';
      card3Sub = 'تراکنش میکروثانیه‌ای';
    }

    // ------------------------------------------------------------------------
    // Template & 6-DOF Multi-Trajectory Camera Resolution
    // ------------------------------------------------------------------------
    const recommended = recommendTemplateForTopic(topic);
    const templateId = input.templateId || recommended.template.id;
    const selectedTemplate = TEMPLATE_CATALOG[templateId] || recommended.template;
    const cameraTrajectory = input.cameraTrajectory || selectedTemplate.recommendedCamera;

    const trajectoryDef = UniversalCameraRig.getTrajectory(cameraTrajectory);

    // ------------------------------------------------------------------------
    // Domain-Matched BGM Selection & Frame-Accurate Scenario SFX Matrix
    // ------------------------------------------------------------------------
    let bgmFile = selectedTemplate.defaultBgm;
    let bgmVolume = 0.75;

    if (isBiomedical) {
      bgmFile = 'music/Brain_Dance.mp3';
      bgmVolume = 0.80;
    } else if (isPhysics) {
      bgmFile = 'music/Cipher2.mp3';
      bgmVolume = 0.70;
    } else if (isFintech) {
      bgmFile = 'music/Tech_Live.mp3';
      bgmVolume = 0.75;
    }

    const sfxCues: SfxCue[] = [
      // Act 1: Interactive cursor approach & mechanical click
      { file: 'sfx/remotion_whip.wav', frame: 215, volume: 0.25, durationInFrames: 15, description: 'Cursor approach' },
      { file: 'sfx/kenney_mouseclick.wav', frame: 219, volume: 0.95, durationInFrames: 30, description: 'Hero CTA button click' },
      { file: 'sfx/remotion_shutter.wav', frame: 220, volume: 0.35, durationInFrames: 25, description: 'Button click resonance' },

      // Act 1 -> Act 2: Dynamic camera whip pan
      { file: 'sfx/remotion_whip.wav', frame: act2Start + 5, volume: 0.8, durationInFrames: 40, description: 'Act 2 whip pan' },

      // Act 2 -> Act 3: 2.5D Isometric blueprint tilt whoosh
      { file: 'sfx/remotion_whoosh.wav', frame: act3Start + 5, volume: 0.75, durationInFrames: 45, description: 'Act 3 blueprint whoosh' },

      // Act 3: Living telemetry data milestone chime
      { file: 'sfx/remotion_ding.wav', frame: act3Start + Math.round(act3Duration * 0.75), volume: 0.85, durationInFrames: 50, description: 'Telemetry chime' },

      // Act 3 -> Act 4: Camera pullback shutter & wide cinematic whoosh
      { file: 'sfx/remotion_shutter.wav', frame: act4Start + 5, volume: 0.85, durationInFrames: 45, description: 'Act 4 pullback shutter' },
      { file: 'sfx/remotion_whoosh.wav', frame: act4Start + 8, volume: 0.7, durationInFrames: 40, description: 'Act 4 wide transition whoosh' },

      // Act 4: Climax golden seal lock
      { file: 'sfx/remotion_ding.wav', frame: act4Start + Math.round(act4Duration * 0.25), volume: 0.95, durationInFrames: 60, description: 'Climax seal lock' },
      { file: 'sfx/bass-hit-futuristic.mp3', frame: act4Start + Math.round(act4Duration * 0.25), volume: 0.60, durationInFrames: 45, description: 'Seal bass impact' },
    ];

    return {
      meta: {
        title: topic,
        topic,
        durationInFrames: totalFrames,
        fps,
        bpm,
        canvasWidth: 1920,
        canvasHeight: 1080,
      },
      templateId,
      cameraTrajectory,
      stages3D: trajectoryDef.stages,
      audio: {
        bgmFile,
        bgmVolume,
        bpm,
        sfxCues,
      },
      act1: {
        startFrame: act1Start,
        durationInFrames: act1Duration,
        badge: heroBadge,
        headline: heroHeadline,
        highlightWord: heroHighlight,
        subtitle: heroSubtitle,
        buttonText: heroButton,
      },
      act2: {
        startFrame: act2Start,
        durationInFrames: act2Duration,
        headerPill: '✂️ استاپ‌موشن برش کاغذ دستی (۱۲ FPS)',
        subtitle: 'مورفینگ پیوسته برداری روی کلاژ',
        stages,
      },
      act3: {
        startFrame: act3Start,
        durationInFrames: act3Duration,
        headerTitle: act3Header,
        telemetryLabel: '+ CAD BENCHMARK TELEMETRY',
        counterValue: counterVal,
        barChartItems: chartItems,
        statusBarText: 'وضعیت سیستم: آماده‌باش تولید سینمایی',
        statusCards: [
          { label: 'موتور صوتی استودیویی', title: card1Title, subtitle: card1Sub },
          { label: 'فونت رسمی فارسی', title: card2Title, subtitle: card2Sub },
          { label: 'پیوستگی جهان سینمایی', title: card3Title, subtitle: card3Sub },
        ],
      },
      act4: {
        startFrame: act4Start,
        durationInFrames: act4Duration,
        stickerBadge: '★ نئوبروتالیسم · استاندارد طلایی ★',
        gaugeValue: 100,
        gaugeLabel: 'کالیبراسیون',
        headline: 'استاندارد کیفی طلایی',
        highlightWord: 'طلایی',
        subtitle: `انطباق ۱۰۰٪ با زبان طراحی موشن‌گرافیک کلاد اوپوس ۵.۵: ${topic}`,
        verifiedPillText: 'تأییدیه استاندارد طلایی استودیو',
      },
      cameraKeyframes: {
        act1X: trajectoryDef.stages.act1.x,
        act2X: trajectoryDef.stages.act2.x,
        act3X: trajectoryDef.stages.act3.x,
        act4X: trajectoryDef.stages.act4.x,
        dockX: trajectoryDef.stages.dock.x,
      },
    };
  }
}
