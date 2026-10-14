import React, { useMemo } from 'react';
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  Img,
} from 'remotion';
import { UniversalCinematicStage, StageAct } from '../stage/UniversalCinematicStage';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';

export const BAQIYATALLAH_UNIVERSAL_DURATION = 2387; // 79.57s @ 30 FPS
export const BAQIYATALLAH_UNIVERSAL_FPS = 30;
export const BAQIYATALLAH_UNIVERSAL_WIDTH = 1920;
export const BAQIYATALLAH_UNIVERSAL_HEIGHT = 1080;

export const BaqiyatallahUniversalStageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous 128 BPM rhythm pulse
  const beatPulse = calculateBeatPulse(frame, 128, fps).lightPulse;
  const pulseGlow = 1 + beatPulse * 0.015;

  // Animated counters synchronized to speech pause windows
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

  // 9 Spatial Acts on Open 3D Canvas with Heterogeneous Multi-Modal Transitions & Dynamic Layouts
  const acts: StageAct[] = useMemo(
    () => [
      // ACT 1: INTRO LOGO & PUBLIC RELATIONS (0.0s - 6.0s | f: 0..180)
      {
        actId: 'act1_pr_intro',
        startFrame: 0,
        endFrame: 180,
        layoutVariant: 'MONUMENTAL_CENTER_HERO',
        textRevealMode: 'MASK_CURTAIN_RISE',
        transitionOut: {
          archetype: 'CAMERA_SPATIAL_FLIGHT',
          durationInFrames: 20,
          cameraFlight: { trajectory: 'WHIP_PAN_RIGHT' },
        },
        badgeFa: 'روابط عمومی کمیته تحقیقات دانشجویی',
        titleFa: 'روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیةالله (عج) تقدیم می‌کند!',
        descriptionFa:
          'راهنمای جامع آیین‌نامه انتخاب دانشجوی پژوهشگر و فناور برجسته کشور',
        emphasisTokens: ['دانشگاه علوم پزشکی بقیةالله'],
        customVisual: (
          <div
            style={{
              width: 250,
              height: 250,
              borderRadius: 36,
              background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)',
              border: '3px solid #06b6d4',
              boxShadow: `0 24px 60px rgba(0, 0, 0, 0.75), 0 0 ${Math.round(40 * pulseGlow)}px rgba(6, 182, 212, 0.5)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 22,
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
        layoutVariant: 'SPLIT_SCULPTURE_RIGHT',
        textRevealMode: 'PERSPECTIVE_3D_FLIP',
        transitionOut: {
          archetype: 'ELEMENT_KINETIC_DISPERSE',
          durationInFrames: 18,
          elementDisperse: { direction: 'LEFT' },
        },
        badgeFa: 'فراخوان ملی استعدادهای درخشان',
        titleFa:
          'آیا می‌دانید چگونه می‌توانید به عنوان دانشجوی پژوهشگر یا فناور برجسته کشور انتخاب شوید؟!',
        descriptionFa:
          'ارزیابی جامع فعالیت‌های علمی، پژوهشی و فناورانه دانشجویان در سطح ملی',
        lottiePreset: 'tech_ai_core',
        emphasisTokens: ['پژوهشگر یا فناور برجسته'],
        constellationNodes: [
          { symbol: '📄', labelFa: 'مقالات ISI و Scopus', valueFa: 'پژوهش اصیل' },
          { symbol: '💡', labelFa: 'طرح‌های فناورانه و اختراع', valueFa: 'نوآوری سلامت' },
          { symbol: '🏆', labelFa: 'کتب و جوایز المپیاد', valueFa: 'افتخارات علمی' },
        ],
      },

      // ACT 3: GUIDELINE BLUEPRINT (13.3s - 21.6s | f: 400..650)
      {
        actId: 'act3_guideline_blueprint',
        startFrame: 400,
        endFrame: 650,
        layoutVariant: 'CONSTELLATION_BENTO_MATRIX',
        textRevealMode: 'ELASTIC_POP_SLAM',
        transitionOut: {
          archetype: 'DEEP_Z_ZOOM_THROUGH',
          durationInFrames: 22,
        },
        badgeFa: 'سند رسمی وزارت بهداشت',
        titleFa:
          'دستورالعمل بند «کاف»، ماده ۲ از آیین‌نامه استعدادهای درخشان وزارت بهداشت',
        descriptionFa: 'مسیر جامع امتیازدهی به فعالیت‌های شماست!',
        metricValue: 'بند «کاف»',
        metricLabelFa: 'ماده ۲ آیین‌نامه استعدادهای درخشان وزارت بهداشت',
        lottiePreset: 'bio_helix_pulse',
        emphasisTokens: ['دستورالعمل بند کاف', 'ماده ۲ آیین‌نامه'],
        constellationNodes: [
          { symbol: '1️⃣', labelFa: 'احراز ۳ شرط اصلی ورود', valueFa: 'گام اول' },
          { symbol: '2️⃣', labelFa: 'توزیع امتیاز در حداقل ۶ ماده', valueFa: 'گام دوم' },
          { symbol: '3️⃣', labelFa: 'کسب حدنصاب امتیاز مقطع', valueFa: 'گام سوم' },
        ],
      },

      // ACT 4: 3 CONDITIONS INTRO + CONDITION 1 GPA >= 16 (21.6s - 33.3s | f: 650..1000)
      {
        actId: 'act4_condition_1_gpa',
        startFrame: 650,
        endFrame: 1000,
        layoutVariant: 'SPLIT_DATA_TERMINAL_LEFT',
        textRevealMode: 'VELOCITY_SKEW_SLIDE',
        transitionOut: {
          archetype: 'TOPOLOGICAL_ANCHOR_MORPH',
          durationInFrames: 18,
        },
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
              width: 250,
              height: 250,
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
              background: 'rgba(15, 23, 42, 0.92)',
              boxShadow: '0 0 45px rgba(16, 185, 129, 0.4)',
            }}
          >
            <span style={{ fontSize: 66, fontWeight: 900, color: '#ffffff' }}>
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
        layoutVariant: 'SPLIT_SCULPTURE_RIGHT',
        textRevealMode: 'MASK_CURTAIN_RISE',
        transitionOut: {
          archetype: 'KINETIC_LIGHT_SWEEP',
          durationInFrames: 16,
        },
        badgeFa: 'شرط دوم از شروط سه‌گانه',
        titleFa:
          'شرط دوم؛ باید در سنوات مجاز تحصیلی باشید و تأییدیه کمیته انضباطی را دریافت کنید.',
        descriptionFa:
          'اشتغال به تحصیل در سقف سنوات قانونی مصوب و گواهی رسمی کمیته انضباطی دانشگاه',
        lottiePreset: 'ui_check_confirm',
        emphasisTokens: ['سنوات مجاز تحصیلی', 'تأییدیه کمیته انضباطی'],
        constellationNodes: [
          { symbol: '⏳', labelFa: 'عدم اتمام سنوات مجاز', valueFa: 'سنوات تحصیلی' },
          { symbol: '🛡️', labelFa: 'تأییدیه رسمی حسن اخلاق', valueFa: 'کمیته انضباطی' },
        ],
      },

      // ACT 6: CONDITION 3 - 6 ARTICLES + MANDATORY PAPER/TECH (41.6s - 55.0s | f: 1250..1650)
      {
        actId: 'act6_condition_3_articles',
        startFrame: 1250,
        endFrame: 1650,
        layoutVariant: 'CONSTELLATION_BENTO_MATRIX',
        textRevealMode: 'PERSPECTIVE_3D_FLIP',
        transitionOut: {
          archetype: 'CAMERA_SPATIAL_FLIGHT',
          durationInFrames: 20,
          cameraFlight: { trajectory: 'VERTICAL_CRANE_UP' },
        },
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
              gap: 16,
              direction: 'rtl',
            }}
          >
            {[
              { num: 'ماده ۱', title: 'مقاله پژوهشی', mandatory: true, icon: '📝' },
              { num: 'ماده ۲', title: 'فعالیت فناورانه', mandatory: true, icon: '🔬' },
              { num: 'ماده ۳', title: 'کتاب تالیف/ترجمه', mandatory: false, icon: '📚' },
              { num: 'ماده ۴', title: 'کنگره و همایش', mandatory: false, icon: '🎤' },
              { num: 'ماده ۵', title: 'طرح تحقیقاتی', mandatory: false, icon: '📊' },
              { num: 'ماده ۶', title: 'جوایز و المپیاد', mandatory: false, icon: '🏅' },
            ].map((m, idx) => {
              const nodeSpring = spring({
                frame: Math.max(0, (frame - 1250) - (20 + idx * 8)),
                fps: 30,
                config: { damping: 14, stiffness: 120, mass: 0.8 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    background: m.mandatory
                      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(239, 68, 68, 0.18) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: m.mandatory
                      ? '2px solid #f59e0b'
                      : '1.5px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: 18,
                    padding: '14px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 6,
                    transform: `translate3d(0px, ${Math.round((1 - nodeSpring) * (idx * 6))}px, 0px) scale(${nodeSpring})`,
                    opacity: nodeSpring,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{m.icon}</span>
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
              );
            })}
          </div>
        ),
      },

      // ACT 7: TIME LIMIT CAUTION (55.0s - 63.3s | f: 1650..1900)
      {
        actId: 'act7_time_limit_caution',
        startFrame: 1650,
        endFrame: 1900,
        layoutVariant: 'MONUMENTAL_CENTER_HERO',
        textRevealMode: 'ELASTIC_POP_SLAM',
        transitionOut: {
          archetype: 'ELEMENT_KINETIC_DISPERSE',
          durationInFrames: 18,
          elementDisperse: { direction: 'RIGHT' },
        },
        badgeFa: 'دقت کنید! بازه زمانی مجاز مدارک',
        titleFa:
          'دقت کنید! تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد.',
        descriptionFa:
          'مدارک خارج از بازه تحصیل یا بیش از یک سال پس از دانش‌آموختگی قابل بررسی نخواهد بود',
        metricValue: '۱ سال',
        metricLabelFa: 'حداکثر مهلت مجاز پس از فارغ‌التحصیلی',
        heroSymbol: '⚠️',
        emphasisTokens: ['دوران تحصیل', 'حداکثر ۱ سال پس از فارغ‌التحصیلی'],
        constellationNodes: [
          { symbol: '🎓', labelFa: 'پذیرش کامل مدارک', valueFa: '۱. طول تحصیل' },
          { symbol: '📜', labelFa: 'آغاز شمارش مهلت', valueFa: '۲. فارغ‌التحصیلی' },
          { symbol: '🛑', labelFa: 'پایان مهلت قانونی', valueFa: '۳. تا ۱ سال بعد' },
        ],
      },

      // ACT 8: SCORE THRESHOLDS - 65, 110, 130 (63.3s - 76.0s | f: 1900..2280)
      {
        actId: 'act8_score_thresholds',
        startFrame: 1900,
        endFrame: 2280,
        layoutVariant: 'SPLIT_DATA_TERMINAL_LEFT',
        textRevealMode: 'VELOCITY_SKEW_SLIDE',
        transitionOut: {
          archetype: 'DEEP_Z_ZOOM_THROUGH',
          durationInFrames: 22,
        },
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
              gap: 24,
              direction: 'rtl',
            }}
          >
            {[
              {
                title: 'کارشناسی (دانشگاه‌های تیپ یک)',
                score: scoreBSc.toFixed(0),
                accent: '#06b6d4',
                active: frame >= 1930 && frame < 2005,
              },
              {
                title: 'پزشکی عمومی',
                score: scoreMed.toFixed(0),
                accent: '#10b981',
                active: frame >= 2005 && frame < 2085,
              },
              {
                title: 'دکترای تخصصی (Ph.D)',
                score: scorePhD.toFixed(0),
                accent: '#f59e0b',
                active: frame >= 2085,
              },
            ].map((tier, idx) => {
              const tierSpring = spring({
                frame: Math.max(0, (frame - 1900) - (16 + idx * 10)),
                fps: 30,
                config: { damping: 14, stiffness: 125, mass: 0.85 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    background: tier.active
                      ? `linear-gradient(135deg, ${tier.accent}26 0%, rgba(15, 23, 42, 0.95) 100%)`
                      : 'rgba(255, 255, 255, 0.05)',
                    border: tier.active
                      ? `2.5px solid ${tier.accent}`
                      : '1.5px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 22,
                    padding: '22px 26px',
                    textAlign: 'center',
                    transform: `translate3d(0px, ${Math.round((1 - tierSpring) * (idx * 8))}px, 0px) scale(${tierSpring})`,
                    opacity: tierSpring,
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: 16,
                      fontWeight: 800,
                      color: tier.accent,
                      marginBottom: 8,
                    }}
                  >
                    {sanitizeForDisplay(tier.title)}
                  </span>
                  <span style={{ fontSize: 44, fontWeight: 900, color: '#ffffff' }}>
                    {tier.score}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#94a3b8',
                      marginTop: 4,
                    }}
                  >
                    {sanitizeForDisplay('حداقل امتیاز الزامی')}
                  </span>
                </div>
              );
            })}
          </div>
        ),
      },

      // ACT 9: OUTRO & CALLOUT (76.0s - 79.57s | f: 2280..2387)
      {
        actId: 'act9_outro_callout',
        startFrame: 2280,
        endFrame: 2387,
        layoutVariant: 'MONUMENTAL_CENTER_HERO',
        textRevealMode: 'MASK_CURTAIN_RISE',
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
                width: 128,
                height: 128,
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
                width: 128,
                height: 128,
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

  return (
    <UniversalCinematicStage
      acts={acts}
      themeId="QUANTUM_BIO_DEEP_Z"
      voiceTrack="audio/baqiyatallah_awards_master_voice.wav"
      bgmTrack="music/Tech_Live.mp3"
      bpm={128}
    />
  );
};
