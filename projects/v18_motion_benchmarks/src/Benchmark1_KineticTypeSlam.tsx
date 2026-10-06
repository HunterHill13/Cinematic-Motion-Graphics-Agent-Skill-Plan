import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { executeTypographySlam } from '../../../src/motion/recipes/TypographySlamRecipe';
import { executeTextMaskReveal } from '../../../src/motion/recipes/TextMaskRevealRecipe';
import { executeCameraPushPull } from '../../../src/motion/recipes/CameraPushPullRecipe';
import { AutoFitText } from '../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * BENCHMARK 1: Kinetic Typography Slam & Mask Reveal
 * Demonstrates:
 * 1. TextMaskReveal using clipPath (zero font distortion, RTL support).
 * 2. TypographySlam on the acoustic hit frame (frame 30).
 * 3. Elastic volume squash & stretch on impact.
 * 4. Jitter-free tabular numerals.
 * 5. Strictly zero decorative glow or fake frosted glass.
 */
export const Benchmark1_KineticTypeSlam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Camera slow push
  const camera = executeCameraPushPull(frame, 0, 120, 'slow-push');

  // 2. Headline masked reveal (frames 8 -> 28)
  const maskReveal = executeTextMaskReveal(frame, 8, fps, 'bottom-to-top', true);

  // 3. Acoustic slam hit for institutional mark (frame 30)
  const slam = executeTypographySlam(frame, 15, 30);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        direction: 'rtl',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        transform: `scale(${camera.scale})`,
      }}
    >
      {/* Benchmark Label */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 80,
          color: '#94A3B8',
          fontSize: 18,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          borderRight: '3px solid #D97706',
          paddingRight: 12,
        }}
      >
        BENCHMARK 01 // KINETIC TYPOGRAPHY SLAM
      </div>

      {/* Main Eyebrow Reveal */}
      <div
        style={{
          clipPath: maskReveal.clipPath,
          transform: `translateY(${maskReveal.translateY}px)`,
          opacity: maskReveal.opacity,
          marginBottom: 20,
        }}
      >
        <AutoFitText
          text="رویکرد نوین درمان سرطان"
          maxFontSize={32}
          color="#D97706"
          textAlign="center"
          dir="rtl"
        />
      </div>

      {/* Hero Slam Headline */}
      <div
        style={{
          transform: `scale(${slam.scale}) translateY(${slam.offsetY}px)`,
          opacity: slam.opacity,
          letterSpacing: `${slam.letterSpacing}px`,
          textAlign: 'center',
          maxWidth: 900,
        }}
      >
        <AutoFitText
          text="دانشگاه علوم پزشکی بقیه‌الله"
          maxFontSize={64}
          color="#F8FAFC"
          textAlign="center"
          dir="rtl"
          style={{ fontWeight: 800 }}
        />
      </div>

      {/* Baseline Shockwave Vector */}
      {slam.shockwave.active && (
        <div
          style={{
            width: slam.shockwave.radius * 4,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #D97706, transparent)',
            opacity: slam.shockwave.opacity,
            marginTop: 20,
          }}
        />
      )}

      {/* Tabular Numerals Callout */}
      <div
        style={{
          marginTop: 60,
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          opacity: frame >= 45 ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <AutoFitText
          text="۳۵"
          maxFontSize={72}
          color="#F8FAFC"
          isNumeric={true}
          style={{ fontWeight: 900, fontFamily: 'Vazirmatn' }}
        />
        <AutoFitText
          text="مرکز تحقیقاتی تخصصی"
          maxFontSize={24}
          color="#94A3B8"
          dir="rtl"
        />
      </div>
    </AbsoluteFill>
  );
};
