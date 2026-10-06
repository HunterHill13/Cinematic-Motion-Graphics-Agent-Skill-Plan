import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill, Sequence } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { KineticTypography2 } from '../../../../src/motion/typography/KineticTypography2';

/**
 * V22 KINETIC TYPE LAB (360 frames @ 30 FPS = 12.00s)
 * 
 * Demonstrates Persian typography as graphic geometry:
 * - Beat 1 (000 - 090f): Word Slam («برگزیده») with decaying impact settle
 * - Beat 2 (090 - 180f): Tracking Expansion («استعداد درخشان») with whole-word ligature integrity
 * - Beat 3 (180 - 270f): Outline → Fill («نخبه کشوری») architectural metallization
 * - Beat 4 (270 - 360f): Typography as Structure («دانشگاه علوم پزشکی» extrudes baseline carrier)
 */
export const V22KineticTypeLab: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#06080E', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.95} />

      {/* Lab Header */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 14,
          zIndex: 50,
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 13,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            TYPE LAB
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            آزمایشگاه تایپوگرافی کینتیک ۲.۰ (Kinetic Typography 2.0)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 90 && 'ضرباهنگ ۱: فرود ضربه‌ای کلمه (Word Slam)'}
          {frame >= 90 && frame < 180 && 'ضرباهنگ ۲: گسترش فاصله حروف (Tracking Expansion)'}
          {frame >= 180 && frame < 270 && 'ضرباهنگ ۳: تبدیل خط پیرامونی به توده توپر (Outline → Fill)'}
          {frame >= 270 && 'ضرباهنگ ۴: استخراج خط مبنای ساختاری (Baseline Extraction)'}
        </span>
      </div>

      {/* Beat 1: Word Slam (0 - 90f) */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticTypography2
            text="برگزیده"
            subtext="فرود دینامیک و قفل استوار بدون لرزش"
            strikeFrame={24}
            mode="word_slam"
            fontSize={92}
            color="#FFFFFF"
            accentColor="#D4AF37"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Beat 2: Tracking Expansion (90 - 180f) */}
      <Sequence from={90} durationInFrames={90}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticTypography2
            text="استعداد درخشان"
            subtext="حفظ ساختار حروف متصل زبان فارسی"
            strikeFrame={20}
            mode="tracking_expansion"
            fontSize={76}
            color="#F8FAFC"
            accentColor="#38BDF8"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Beat 3: Outline → Fill (180 - 270f) */}
      <Sequence from={180} durationInFrames={90}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticTypography2
            text="نخبه کشوری"
            subtext="تکامل خط برداری به ماده متالیک"
            strikeFrame={18}
            mode="outline_to_fill"
            fontSize={84}
            color="#FFFFFF"
            accentColor="#D4AF37"
          />
        </AbsoluteFill>
      </Sequence>

      {/* Beat 4: Baseline Extraction (270 - 360f) */}
      <Sequence from={270} durationInFrames={90}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticTypography2
            text="دانشگاه علوم پزشکی"
            subtext="تبدیل خط مبنای متن به حامل پیوسته صحنه"
            strikeFrame={22}
            mode="baseline_extract"
            fontSize={72}
            color="#FFFFFF"
            accentColor="#D4AF37"
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
