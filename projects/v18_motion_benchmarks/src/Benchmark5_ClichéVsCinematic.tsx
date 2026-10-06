import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { executeTextMaskReveal } from '../../../src/motion/recipes/TextMaskRevealRecipe';
import { executeCameraPushPull } from '../../../src/motion/recipes/CameraPushPullRecipe';
import { AutoFitText } from '../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * BENCHMARK 5: Cliché (AI Slop) vs. Cinematic Director-Led Motion
 * Split-screen comparison at 1080p:
 * LEFT (0-540px): CLICHÉ / AI TEMPLATE TELLS
 *   - Frosted glass cards (backdrop-filter: blur)
 *   - Neon cyan/purple glow halos
 *   - Subtitle wallpaper (long multi-line sentence)
 *   - Unmotivated perpetual bobbing and rotation
 *   - Card soup
 * RIGHT (540-1080px): CINEMATIC DIRECTOR CRAFT
 *   - Crisp matte surface with high-contrast hierarchy
 *   - Single focal anchor
 *   - Clean 2-word punchy headline through geometric mask (clipPath)
 *   - Motivated slow-push camera
 *   - Dignified physics with zero rubber bounce
 */
export const Benchmark5_ClichéVsCinematic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Right side: Director-led motion
  const camera = executeCameraPushPull(frame, 0, 150, 'slow-push');
  const maskReveal = executeTextMaskReveal(frame, 15, fps, 'bottom-to-top', true);

  // Left side: Cliché unmotivated perpetual bobbing
  const bobbingY = Math.sin(frame * 0.1) * 8;
  const bobbingRot = Math.sin(frame * 0.08) * 1.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#05070A',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ============================================================ */}
      {/* LEFT HALF: THE CLICHÉ / AI SLOP TEMPLATE                     */}
      {/* ============================================================ */}
      <div
        style={{
          width: '50%',
          height: '100%',
          borderRight: '2px dashed #EF4444',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          boxSizing: 'border-box',
          backgroundColor: '#090D16',
        }}
      >
        {/* Cliché Badge */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            backgroundColor: '#991B1B',
            color: '#FEE2E2',
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          ✕ طراحی کلیشه‌ای (AI Template Slop)
        </div>

        {/* Cliché Card Soup with Frosted Blur & Neon Glow */}
        <div
          style={{
            width: 420,
            padding: 30,
            borderRadius: 20,
            background: 'rgba(30, 41, 59, 0.45)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(56, 189, 248, 0.5)',
            boxShadow: '0 0 35px rgba(56, 189, 248, 0.35), 0 0 15px rgba(168, 85, 247, 0.3)',
            transform: `translateY(${bobbingY}px) rotate(${bobbingRot}deg)`,
            textAlign: 'center',
          }}
        >
          {/* Neon Floating Icon */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #06B6D4, #A855F7)',
              margin: '0 auto 16px',
              boxShadow: '0 0 20px #06B6D4',
            }}
          />

          {/* Subtitle Wallpaper: Full spoken sentence on screen */}
          <div style={{ color: '#CBD5E1', fontSize: 18, lineHeight: 1.6, direction: 'rtl' }}>
            ما در این پژوهش دانشگاهی با استفاده از جدیدترین متدهای مدرن هوش مصنوعی و فناوری‌های
            نوآورانه تلاش کردیم تا بتوانیم نرخ آپوپتوز سلول‌های توموری را به حداکثر برسانیم.
          </div>

          <div
            style={{
              marginTop: 16,
              color: '#38BDF8',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            [نقص: متن بیش‌ازحد، افکت شیشه‌ای بی‌دلیل، نوسان دائمی]
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT HALF: CINEMATIC DIRECTOR-LED DESIGN                    */}
      {/* ============================================================ */}
      <div
        style={{
          width: '50%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          boxSizing: 'border-box',
          backgroundColor: '#07090E',
          transform: `scale(${camera.scale})`,
        }}
      >
        {/* Cinematic Badge */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            backgroundColor: '#065F46',
            color: '#D1FAE5',
            padding: '6px 14px',
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          ✓ طراحی کارگردانی‌شده (V18 Cinematic)
        </div>

        {/* Clean Focal Anchor - Matte, High Contrast, Negative Space */}
        <div style={{ width: 440, direction: 'rtl', textAlign: 'right' }}>
          {/* Eyebrow Anchor */}
          <div
            style={{
              color: '#D97706',
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 12,
              letterSpacing: '0.05em',
            }}
          >
            دست‌آورد بالینی // فاز سوم
          </div>

          {/* Hero Mask Reveal Typography */}
          <div
            style={{
              clipPath: maskReveal.clipPath,
              transform: `translateY(${maskReveal.translateY}px)`,
              opacity: maskReveal.opacity,
            }}
          >
            <AutoFitText
              text="مهار آپوپتوز تومور"
              maxFontSize={48}
              color="#F8FAFC"
              dir="rtl"
              style={{ fontWeight: 800, lineHeight: 1.25 }}
            />
          </div>

          {/* Dividing Vector Line (Motivated Geometry) */}
          <div
            style={{
              width: frame >= 30 ? 120 : 0,
              height: 3,
              backgroundColor: '#D97706',
              marginTop: 18,
              marginBottom: 18,
              transition: 'width 0.4s ease-out',
            }}
          />

          {/* Restrained Metric Support */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <AutoFitText
              text="۹۴.۲٪"
              maxFontSize={42}
              color="#F8FAFC"
              isNumeric={true}
              style={{ fontWeight: 800 }}
            />
            <AutoFitText text="پاسخ مثبت درمانی" maxFontSize={18} color="#94A3B8" dir="rtl" />
          </div>

          <div
            style={{
              marginTop: 24,
              color: '#10B981',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            [قوت: کانون تمرکز یکتا، تایپوگرافی ماسک‌شده، فضای منفی اصیل]
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
