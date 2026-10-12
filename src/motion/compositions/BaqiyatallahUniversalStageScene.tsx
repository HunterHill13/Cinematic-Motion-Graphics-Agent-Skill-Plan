import React, { useMemo } from 'react';
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from 'remotion';
import { UniversalCinematicStage, StageAct } from '../stage/UniversalCinematicStage';
import { UniversalCameraRig } from '../camera/UniversalCameraRig';
import { UniversalSoundDirector, SfxCue } from '../audio/UniversalSoundDirector';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { LottieGraphic } from '../assets/LottieGraphic';

export const BAQIYATALLAH_UNIVERSAL_DURATION = 2387; // 79.57s @ 30 FPS
export const BAQIYATALLAH_UNIVERSAL_FPS = 30;
export const BAQIYATALLAH_UNIVERSAL_WIDTH = 1920;
export const BAQIYATALLAH_UNIVERSAL_HEIGHT = 1080;

export const BaqiyatallahUniversalStageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous 128 BPM rhythm pulse for bespoke sub-widgets
  const beatPulse = calculateBeatPulse(frame, 128, fps).lightPulse;
  const pulseGlow = 1 + beatPulse * 0.015;

  // Animated counters synchronized to voiceover timestamps
  const gpaCounter = interpolate(frame, [680, 790], [0, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scoreBSc = interpolate(frame, [1930, 1995], [0, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scoreMed = interpolate(frame, [2005, 2075], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scorePhD = interpolate(frame, [2085, 2155], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Custom SFX cues with 4-frame pre-roll whooshes, milestone impacts, and climax riser
  const customSfxCues = useMemo<SfxCue[]>(
    () => [
      { frame: 8, type: 'impact', volume: 0.65 },
      { frame: 24, type: 'chime', volume: 0.45 },
      // Act 2 transition (f: 180)
      { frame: 176, type: 'whoosh', volume: 0.6 },
      { frame: 188, type: 'impact', volume: 0.6 },
      { frame: 205, type: 'click', volume: 0.35 },
      // Act 3 transition (f: 400)
      { frame: 396, type: 'whoosh', volume: 0.6 },
      { frame: 408, type: 'impact', volume: 0.6 },
      { frame: 425, type: 'click', volume: 0.35 },
      // Act 4 transition (f: 650)
      { frame: 646, type: 'whoosh', volume: 0.6 },
      { frame: 658, type: 'impact', volume: 0.65 },
      { frame: 765, type: 'chime', volume: 0.45 },
      // Act 5 transition (f: 1000)
      { frame: 996, type: 'whoosh', volume: 0.6 },
      { frame: 1008, type: 'impact', volume: 0.6 },
      { frame: 1025, type: 'click', volume: 0.35 },
      // Act 6 transition (f: 1250)
      { frame: 1246, type: 'whoosh', volume: 0.6 },
      { frame: 1258, type: 'impact', volume: 0.65 },
      { frame: 1450, type: 'chime', volume: 0.5 },
      // Act 7 transition (f: 1650)
      { frame: 1646, type: 'whoosh', volume: 0.6 },
      { frame: 1658, type: 'impact', volume: 0.65 },
      // Act 8 climax riser & tier hits (f: 1900..2280)
      { frame: 1855, type: 'riser', volume: 0.7 },
      { frame: 1896, type: 'whoosh', volume: 0.65 },
      { frame: 1908, type: 'impact', volume: 0.65 },
      { frame: 2028, type: 'chime', volume: 0.45 },
      { frame: 2108, type: 'chime', volume: 0.5 },
      { frame: 2188, type: 'impact', volume: 0.65 },
      // Act 9 outro (f: 2280)
      { frame: 2276, type: 'whoosh', volume: 0.6 },
      { frame: 2288, type: 'impact', volume: 0.65 },
      { frame: 2305, type: 'chime', volume: 0.45 },
    ],
    []
  );

  // 9 Spatial Acts distributed in 3D Coordinate Space (Zero Bottom Subtitles)
  const acts: StageAct[] = useMemo(
    () => [
      // ACT 1: INTRO LOGO & PUBLIC RELATIONS (0.0s - 6.0s | f: 0..180)
      {
        actId: 'act1_pr_intro',
        startFrame: 0,
        endFrame: 180,
        position: { x: 0, y: 0, z: 0 },
        badgeFa: 'روابط عمومی کمیته تحقیقات دانشجویی',
        titleFa: 'روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیةالله (عج) تقدیم می‌کند!',
        descriptionFa:
          'راهنمای جامع آیین‌نامه انتخاب دانشجوی پژوهشگر و فناور برجسته کشور',
        emphasisTokens: ['دانشگاه علوم پزشکی بقیةالله'],
        customVisual: (
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: 32,
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
              border: '3px solid #06b6d4',
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 ${Math.round(35 * pulseGlow)}px rgba(6, 182, 212, 0.45)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          >
            <Img
              src={staticFile('logos/pr_logo.png')}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        ),
      },

      // ACT 2: INQUIRY HOOK (6.0s - 13.3s | f: 180..400)
      {
        actId: 'act2_inquiry_hook',
        startFrame: 180,
        endFrame: 400,
        position: { x: 1500, y: 680, z: 0 },
        badgeFa: 'فراخوان ملی استعدادهای درخشان',
        titleFa:
          'آیا می‌دانید چگونه می‌توانید به عنوان دانشجوی پژوهشگر یا فناور برجسته کشور انتخاب شوید؟!',
        descriptionFa:
          'ارزیابی جامع فعالیت‌های علمی، پژوهشی و فناورانه دانشجویان در سطح ملی',
        lottiePreset: 'tech_ai_core',
        emphasisTokens: ['پژوهشگر یا فناور برجسته'],
        customBottomRow: (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              marginTop: 8,
            }}
          >
            {[
              { icon: '📄', title: 'پژوهش و مقالات معتبر', sub: 'انتشار علمی در نمایه‌های بین‌المللی' },
              { icon: '💡', title: 'فناوری و ثبت اختراع', sub: 'تولید محصول، پتنت و نوآوری سلامت' },
              { icon: '🏆', title: 'طرح‌ها و جوایز علمی', sub: 'المپیادها، کتب و گرنت‌های پژوهشی' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1.5px solid rgba(6, 182, 212, 0.28)',
                  borderRadius: 20,
                  padding: '16px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 38 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc' }}>
                    {sanitizeForDisplay(item.title)}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#94a3b8', marginTop: 4 }}>
                    {sanitizeForDisplay(item.sub)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      },

      // ACT 3: GUIDELINE BLUEPRINT (13.3s - 21.6s | f: 400..650)
      {
        actId: 'act3_guideline_blueprint',
        startFrame: 400,
        endFrame: 650,
        position: { x: 3000, y: 1360, z: 0 },
        badgeFa: 'سند رسمی وزارت بهداشت',
        titleFa:
          'دستورالعمل بند «کاف»، ماده ۲ از آیین‌نامه استعدادهای درخشان وزارت بهداشت',
        descriptionFa: 'مسیر جامع امتیازدهی به فعالیت‌های شماست!',
        metricValue: 'بند «کاف»',
        metricLabelFa: 'ماده ۲ آیین‌نامه استعدادهای درخشان وزارت بهداشت',
        lottiePreset: 'bio_helix_pulse',
        emphasisTokens: ['دستورالعمل بند کاف', 'ماده ۲ آیین‌نامه'],
        customBottomRow: (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              marginTop: 8,
            }}
          >
            {[
              { step: 'گام اول', label: 'احراز ۳ شرط اصلی ورود', color: '#10b981' },
              { step: 'گام دوم', label: 'توزیع امتیاز در حداقل ۶ ماده', color: '#06b6d4' },
              { step: 'گام سوم', label: 'کسب حدنصاب امتیاز مقطع تحصیلی', color: '#f59e0b' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: `1.5px solid ${s.color}55`,
                  borderRadius: 18,
                  padding: '14px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>
                    {sanitizeForDisplay(s.step)}
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
                    {sanitizeForDisplay(s.label)}
                  </div>
                </div>
                <span style={{ fontSize: 24, color: s.color, fontWeight: 900 }}>0{i + 1}</span>
              </div>
            ))}
          </div>
        ),
      },

      // ACT 4: 3 CONDITIONS INTRO + CONDITION 1 GPA >= 16 (21.6s - 33.3s | f: 650..1000)
      {
        actId: 'act4_condition_1_gpa',
        startFrame: 650,
        endFrame: 1000,
        position: { x: 4500, y: 2040, z: 0 },
        badgeFa: 'اما قبل از محاسبه امتیازها، ۳ شرط اصلی وجود دارد',
        titleFa: 'شرط اول؛ معدل کل شما در مقطع فعلی باید حداقل ۱۶ باشد.',
        descriptionFa:
          'احراز حداقل معدل کل ۱۶ از ۲۰ در مقطع تحصیلی فعلی به عنوان نخستین پیش‌نیاز الزامی',
        metricValue: '۱۶.۰۰',
        metricLabelFa: 'حداقل معدل کل مجاز در مقطع فعلی',
        emphasisTokens: ['۳ شرط اصلی', 'حداقل معدل ۱۶'],
        customVisual: (
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: '50%',
              border: '14px solid rgba(255, 255, 255, 0.08)',
              borderTopColor: '#10b981',
              borderRightColor: '#06b6d4',
              borderBottomColor: gpaCounter >= 10 ? '#10b981' : 'transparent',
              borderLeftColor: gpaCounter >= 15 ? '#06b6d4' : 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(15, 23, 42, 0.9)',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.35)',
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 900, color: '#ffffff' }}>
              {gpaCounter.toFixed(1)}
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>
              {sanitizeForDisplay('حداقل از ۲۰')}
            </span>
          </div>
        ),
      },

      // ACT 5: CONDITION 2 - ACADEMIC YEARS & DISCIPLINARY COMMITTEE (33.3s - 41.6s | f: 1000..1250)
      {
        actId: 'act5_condition_2_years',
        startFrame: 1000,
        endFrame: 1250,
        position: { x: 6000, y: 2720, z: 0 },
        badgeFa: 'شرط دوم از شروط سه‌گانه',
        titleFa:
          'شرط دوم؛ باید در سنوات مجاز تحصیلی باشید و تأییدیه کمیته انضباطی را دریافت کنید.',
        descriptionFa:
          'اشتغال به تحصیل در سقف سنوات قانونی مصوب و گواهی رسمی کمیته انضباطی دانشگاه',
        lottiePreset: 'ui_check_confirm',
        emphasisTokens: ['سنوات مجاز تحصیلی', 'تأییدیه کمیته انضباطی'],
        customBottomRow: (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 8 }}>
            <div
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1.5px solid rgba(6, 182, 212, 0.45)',
                borderRadius: 20,
                padding: '18px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <span style={{ fontSize: 40 }}>⏳</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#ffffff' }}>
                  {sanitizeForDisplay('در سنوات مجاز تحصیلی باشید')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#38bdf8', marginTop: 4 }}>
                  {sanitizeForDisplay('مطابق آیین‌نامه آموزشی مقطع مربوطه')}
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1.5px solid rgba(16, 185, 129, 0.45)',
                borderRadius: 20,
                padding: '18px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <span style={{ fontSize: 40 }}>🛡️</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#ffffff' }}>
                  {sanitizeForDisplay('تأییدیه کمیته انضباطی را دریافت کنید')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#10b981', marginTop: 4 }}>
                  {sanitizeForDisplay('احراز صلاحیت و حسن سلوک دانشجویی')}
                </div>
              </div>
            </div>
          </div>
        ),
      },

      // ACT 6: CONDITION 3 - 6 ARTICLES + MANDATORY PAPER/TECH (41.6s - 55.0s | f: 1250..1650)
      {
        actId: 'act6_condition_3_articles',
        startFrame: 1250,
        endFrame: 1650,
        position: { x: 7500, y: 3400, z: 0 },
        badgeFa: 'شرط سوم از شروط سه‌گانه',
        titleFa: 'شرط سوم؛ امتیازهای شما باید حداقل از ۶ ماده مختلف آیین‌نامه کسب شود؛',
        descriptionFa: 'که حضور مقاله یا فعالیت فناورانه در آن اجباری است!',
        metricValue: '۶ ماده',
        metricLabelFa: 'تنوع الزامی + حضور مقاله یا فعالیت فناورانه (اجباری)',
        lottiePreset: 'abstract_portal',
        emphasisTokens: ['حداقل ۶ ماده مختلف', 'مقاله یا فعالیت فناورانه اجباری'],
        customBottomRow: (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 14,
              marginTop: 8,
            }}
          >
            {[
              { num: 'ماده ۱', title: 'مقاله پژوهشی', mandatory: true, icon: '📝' },
              { num: 'ماده ۲', title: 'فعالیت فناورانه', mandatory: true, icon: '🔬' },
              { num: 'ماده ۳', title: 'کتاب تالیف/ترجمه', mandatory: false, icon: '📚' },
              { num: 'ماده ۴', title: 'کنگره و همایش', mandatory: false, icon: '🎤' },
              { num: 'ماده ۵', title: 'طرح تحقیقاتی', mandatory: false, icon: '📊' },
              { num: 'ماده ۶', title: 'جوایز و المپیاد', mandatory: false, icon: '🏅' },
            ].map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: m.mandatory
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(239, 68, 68, 0.18) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: m.mandatory
                    ? '2px solid #f59e0b'
                    : '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: 16,
                  padding: '12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 26 }}>{m.icon}</span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: m.mandatory ? '#fbbf24' : '#94a3b8',
                  }}
                >
                  {sanitizeForDisplay(m.num)}
                </span>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff' }}>
                  {sanitizeForDisplay(m.title)}
                </span>
                {m.mandatory && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: '#fef08a',
                      background: 'rgba(239, 68, 68, 0.45)',
                      padding: '2px 8px',
                      borderRadius: 999,
                    }}
                  >
                    {sanitizeForDisplay('اجباری')}
                  </span>
                )}
              </div>
            ))}
          </div>
        ),
      },

      // ACT 7: TIME LIMIT CAUTION (55.0s - 63.3s | f: 1650..1900)
      {
        actId: 'act7_time_limit_caution',
        startFrame: 1650,
        endFrame: 1900,
        position: { x: 9000, y: 4080, z: 0 },
        badgeFa: 'دقت کنید! بازه زمانی مجاز مدارک',
        titleFa:
          'دقت کنید! تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد.',
        descriptionFa:
          'مدارک خارج از بازه تحصیل یا بیش از یک سال پس از دانش‌آموختگی قابل بررسی نخواهد بود',
        metricValue: '۱ سال',
        metricLabelFa: 'حداکثر مهلت مجاز پس از فارغ‌التحصیلی',
        heroSymbol: '⚠️',
        emphasisTokens: ['دوران تحصیل', 'حداکثر ۱ سال پس از فارغ‌التحصیلی'],
        customBottomRow: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              borderRadius: 20,
              padding: '18px 32px',
              marginTop: 8,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#38bdf8' }}>
                {sanitizeForDisplay('۱. کل دوران تحصیل')}
              </div>
              <div style={{ fontSize: 15, color: '#cbd5e1', marginTop: 4 }}>
                {sanitizeForDisplay('پذیرش کامل فعالیت‌های پژوهشی')}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                height: 5,
                margin: '0 28px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #38bdf8, #f59e0b, #ef4444)',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fbbf24' }}>
                {sanitizeForDisplay('۲. ایستگاه فارغ‌التحصیلی')}
              </div>
              <div style={{ fontSize: 15, color: '#cbd5e1', marginTop: 4 }}>
                {sanitizeForDisplay('شروع شمارش مهلت ۱ ساله')}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                height: 5,
                margin: '0 28px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#f87171' }}>
                {sanitizeForDisplay('۳. نهایتاً تا ۱ سال پس از آن')}
              </div>
              <div style={{ fontSize: 15, color: '#cbd5e1', marginTop: 4 }}>
                {sanitizeForDisplay('پایان مهلت قانونی ارائه مدارک')}
              </div>
            </div>
          </div>
        ),
      },

      // ACT 8: SCORE THRESHOLDS - 65, 110, 130 (63.3s - 76.0s | f: 1900..2280)
      {
        actId: 'act8_score_thresholds',
        startFrame: 1900,
        endFrame: 2280,
        position: { x: 10500, y: 4760, z: 0 },
        badgeFa: 'حدنصاب قبولی در دانشگاه‌های تیپ یک',
        titleFa: 'حدنصاب قبولی، بسته به تیپ دانشگاه و مقطع شما فرق می‌کند:',
        descriptionFa:
          'برای کارشناسی در دانشگاه‌های تیپ یک ۶۵ امتیاز، پزشکی عمومی ۱۱۰ امتیاز، و دکترای تخصصی به ۱۳۰ امتیاز نیاز دارد!',
        lottiePreset: 'fintech_growth_chart',
        emphasisTokens: ['کارشناسی: ۶۵ امتیاز', 'پزشکی عمومی: ۱۱۰ امتیاز', 'دکترای تخصصی: ۱۳۰ امتیاز'],
        customBottomRow: (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 22,
              marginTop: 8,
            }}
          >
            {/* Tier 1: BSc 65 */}
            <div
              style={{
                background:
                  frame >= 2025 && frame < 2105
                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.28) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                border:
                  frame >= 2025 && frame < 2105
                    ? '2.5px solid #06b6d4'
                    : '1.5px solid rgba(255, 255, 255, 0.14)',
                borderRadius: 22,
                padding: '20px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 19, fontWeight: 800, color: '#38bdf8' }}>
                {sanitizeForDisplay('کارشناسی (دانشگاه‌های تیپ یک)')}
              </div>
              <div style={{ fontSize: 58, fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
                {scoreBSc.toFixed(0)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#06b6d4' }}>
                {sanitizeForDisplay('امتیاز')}
              </div>
            </div>

            {/* Tier 2: General Medicine 110 */}
            <div
              style={{
                background:
                  frame >= 2105 && frame < 2185
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                border:
                  frame >= 2105 && frame < 2185
                    ? '2.5px solid #10b981'
                    : '1.5px solid rgba(255, 255, 255, 0.14)',
                borderRadius: 22,
                padding: '20px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 19, fontWeight: 800, color: '#10b981' }}>
                {sanitizeForDisplay('پزشکی عمومی')}
              </div>
              <div style={{ fontSize: 58, fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
                {scoreMed.toFixed(0)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>
                {sanitizeForDisplay('امتیاز')}
              </div>
            </div>

            {/* Tier 3: PhD 130 */}
            <div
              style={{
                background:
                  frame >= 2185
                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.28) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                border:
                  frame >= 2185
                    ? '2.5px solid #f59e0b'
                    : '1.5px solid rgba(255, 255, 255, 0.14)',
                borderRadius: 22,
                padding: '20px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 19, fontWeight: 800, color: '#fbbf24' }}>
                {sanitizeForDisplay('دکترای تخصصی')}
              </div>
              <div style={{ fontSize: 58, fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
                {scorePhD.toFixed(0)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fbbf24' }}>
                {sanitizeForDisplay('امتیاز نیاز دارد!')}
              </div>
            </div>
          </div>
        ),
      },

      // ACT 9: OUTRO & DUAL LOGOS (76.0s - 79.57s | f: 2280..2387)
      {
        actId: 'act9_outro_dual_logos',
        startFrame: 2280,
        endFrame: 2387,
        position: { x: 12000, y: 5440, z: 0 },
        badgeFa: 'کمیته تحقیقات و فناوری دانشجویی دانشگاه علوم پزشکی بقیةالله (عج)',
        titleFa:
          'در ویدیوهای بعدی، روش کسب این امتیازها را گام‌به‌گام بررسی می‌کنیم. با ما همراه باشید!',
        descriptionFa:
          'دانشگاه علوم پزشکی بقیةالله (عج) • کمیته تحقیقات و فناوری دانشجویی',
        emphasisTokens: ['با ما همراه باشید!'],
        customVisual: (
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                width: 126,
                height: 126,
                borderRadius: 24,
                background: '#ffffff',
                border: '2.5px solid #06b6d4',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('logos/university_logo.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div
              style={{
                width: 126,
                height: 126,
                borderRadius: 24,
                background: '#ffffff',
                border: '2.5px solid #10b981',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
                padding: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('logos/committee_logo.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        ),
      },
    ],
    [frame, gpaCounter, pulseGlow, scoreBSc, scoreMed, scorePhD]
  );

  // Resolve camera trajectory via UniversalCameraRig & UniversalSoundDirector
  const trajectory = UniversalCameraRig.getTrajectory('DIAGONAL_CASCADE');
  const _soundReady = Boolean(UniversalSoundDirector.name);

  return (
    <UniversalCinematicStage
      acts={acts}
      themeId="QUANTUM_BIO_DEEP_Z"
      cameraMode={trajectory.mode}
      voiceTrack="audio/baqiyatallah_awards_master_voice.wav"
      bgmTrack={_soundReady ? 'music/Tech_Live.mp3' : 'music/Tech_Live.mp3'}
      bpm={128}
      customSfxCues={customSfxCues}
      topHeaderTitleFa="دانشگاه علوم پزشکی بقیةالله (عج)"
      topHeaderSubtitleFa="کمیته تحقیقات و فناوری دانشجویی"
      topHeaderBadgeFa="آیین‌نامه استعدادهای درخشان // بند «کاف»، ماده ۲"
      footerTitleFa="روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیةالله (عج) // دستورالعمل بند «کاف»"
    />
  );
};
