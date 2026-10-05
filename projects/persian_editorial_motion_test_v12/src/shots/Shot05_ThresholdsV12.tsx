import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeCounterBalancedSweep } from '../../../../src/motion/recipes/CounterBalancedSweepRecipe';
import { executeGravitationalSingularity } from '../../../../src/motion/recipes/GravitationalSingularityRecipe';

/**
 * SHOT 05 — ACADEMIC DEGREE SCORE THRESHOLDS (V12)
 * Frame Range: 1700 - 2155 (Global) / 0 - 455 (Local)
 * - Level 3 Archetype: Quantitative Comparison & Crescendo Pedestals
 * - Level 2 Recipe: CounterBalancedSweep + GravitationalSingularity
 * - 100% Pure Persian Script typography (Zero English metadata)
 * - Incoming Carry (T4): 3 score pedestals rise from ground plane
 * - Semantic Acoustic Sync:
 *     f1715 (local 15f): «امتیازات لازم بر اساس مقطع»
 *     f1914 (local 214f): «۶۵ امتیاز» (Bachelor)
 *     f2010 (local 310f): «۱۱۰ امتیاز» (Master)
 *     f2100 (local 400f): «۱۳۰ امتیاز» (PhD)
 * - Outgoing Carry (T5): The 3 score pillars collapse inward into a central gravitational singularity (local 420 - 455f)
 */
export const Shot05_ThresholdsV12: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 1700;

  // Semantic Acoustic Sync
  const introSync = calculateSyncPhrase(globalFrame, 'امتیازات لازم بر اساس مقطع');
  const t1Sync = calculateSyncPhrase(globalFrame, 'شصت و پنج');
  const t2Sync = calculateSyncPhrase(globalFrame, 'صد و ده');
  const t3Sync = calculateSyncPhrase(globalFrame, 'صد و سی');

  // Counter balanced sweep for rising pillars
  const sweep = executeCounterBalancedSweep(localFrame, 20, 60, 180);

  // Outgoing Carry (T5: Gravitational Singularity at local f420 - 455 / global f2120 - 2155)
  const singularity = executeGravitationalSingularity(
    localFrame,
    420,
    455,
    { x: 960, y: 540 },
    [
      { x: 400, y: 540 },  // Pillar 1
      { x: 960, y: 540 },  // Pillar 2
      { x: 1520, y: 540 }, // Pillar 3
    ]
  );

  // Header Title Reveal
  const titleOpacity = interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [10, 35], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#07090E',
        color: '#F8FAFC',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        direction: 'rtl',
        overflow: 'hidden',
      }}
    >
      {/* Background Architectural Grid (Role D: Atmospheric) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Institutional Header (Role B: Structural) */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 16,
          fontSize: 14,
          color: '#94A3B8',
          fontWeight: 500,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#0284C7', fontWeight: 700 }}>حدنصاب امتیازات مصوب</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span>تفکیک بر اساس مقاطع تحصیلی</span>
        </div>
        <div style={{ color: '#10B981', fontWeight: 600 }}>جدول ارزیابی ۳ مقطع دانشگاهی</div>
      </div>

      {/* Header Title: «امتیازات لازم بر اساس مقطع» (Role A: Narrative) */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          right: 80,
          left: 80,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleSlideY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: '#F8FAFC',
            letterSpacing: -0.5,
            marginBottom: 8,
          }}
        >
          امتیازات لازم بر اساس مقطع
        </div>
        <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 500 }}>
          حداقل حدنصاب مصوب شورای هدایت استعدادهای درخشان
        </div>
      </div>

      {/* THREE MONUMENTAL PEDESTAL PILLARS (Role B: Structural) */}
      <div
        style={{
          position: 'absolute',
          top: 250,
          left: 100,
          right: 100,
          height: 630,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 32,
        }}
      >
        {/* PILLAR 1: کارشناسی -> ۶۵ امتیاز */}
        <div
          style={{
            flex: 1,
            height: 450,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `2px solid ${localFrame >= 214 ? '#38BDF8' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 18,
            padding: 32,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 214 ? '0 16px 40px rgba(56, 189, 248, 0.25)' : 'none',
            transform: `translateY(${interpolate(localFrame, [160, 214], [40, 0], { extrapolateRight: 'clamp' })}px) translateX(${localFrame >= 420 ? singularity.entities[0].x - 400 : 0}px) scale(${localFrame >= 420 ? singularity.entities[0].scale : 1})`,
            opacity: localFrame >= 420 ? singularity.entities[0].opacity : 1,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#38BDF8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                padding: '4px 12px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              سطح اول • دوره کارشناسی
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9' }}>مقطع کارشناسی</div>
            <div style={{ fontSize: 16, color: '#94A3B8', marginTop: 8 }}>
              دانشجویان دوره کارشناسی پیوسته و ناپیوسته
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: localFrame >= 214 ? '#38BDF8' : '#64748B',
                lineHeight: 1,
                transform: `scale(${localFrame >= 214 ? 1 + t1Sync.haloIntensity * 0.12 : 1})`,
              }}
            >
              ۶۵
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#CBD5E1', marginTop: 8 }}>
              امتیاز پژوهشی
            </div>
          </div>

          <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center' }}>
            کسب حداقل ۶۵ امتیاز کل
          </div>
        </div>

        {/* PILLAR 2: کارشناسی ارشد -> ۱۱۰ امتیاز */}
        <div
          style={{
            flex: 1,
            height: 520,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `2px solid ${localFrame >= 310 ? '#10B981' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 18,
            padding: 32,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 310 ? '0 16px 40px rgba(16, 185, 129, 0.25)' : 'none',
            transform: `translateY(${interpolate(localFrame, [260, 310], [40, 0], { extrapolateRight: 'clamp' })}px) translateX(${localFrame >= 420 ? singularity.entities[1].x - 960 : 0}px) scale(${localFrame >= 420 ? singularity.entities[1].scale : 1})`,
            opacity: localFrame >= 420 ? singularity.entities[1].opacity : 1,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '4px 12px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              سطح دوم • کارشناسی ارشد
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9' }}>کارشناسی ارشد</div>
            <div style={{ fontSize: 16, color: '#94A3B8', marginTop: 8 }}>
              دانشجویان دوره‌های کارشناسی ارشد ناپیوسته
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 92,
                fontWeight: 900,
                color: localFrame >= 310 ? '#10B981' : '#64748B',
                lineHeight: 1,
                transform: `scale(${localFrame >= 310 ? 1 + t2Sync.haloIntensity * 0.12 : 1})`,
              }}
            >
              ۱۱۰
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#CBD5E1', marginTop: 8 }}>
              امتیاز پژوهشی
            </div>
          </div>

          <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center' }}>
            کسب حداقل ۱۱۰ امتیاز کل
          </div>
        </div>

        {/* PILLAR 3: دکتری تخصصی -> ۱۳۰ امتیاز */}
        <div
          style={{
            flex: 1,
            height: 590,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `2px solid ${localFrame >= 400 ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 18,
            padding: 32,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 400 ? '0 16px 40px rgba(245, 158, 11, 0.3)' : 'none',
            transform: `translateY(${interpolate(localFrame, [350, 400], [40, 0], { extrapolateRight: 'clamp' })}px) translateX(${localFrame >= 420 ? singularity.entities[2].x - 1520 : 0}px) scale(${localFrame >= 420 ? singularity.entities[2].scale : 1})`,
            opacity: localFrame >= 420 ? singularity.entities[2].opacity : 1,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                padding: '4px 12px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              سطح سوم • دکترای تخصصی
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9' }}>دکترای تخصصی</div>
            <div style={{ fontSize: 16, color: '#94A3B8', marginTop: 8 }}>
              دستیاری، دکتری تخصصی و دکتری عمومی
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: localFrame >= 400 ? '#F59E0B' : '#64748B',
                lineHeight: 1,
                transform: `scale(${localFrame >= 400 ? 1 + t3Sync.haloIntensity * 0.12 : 1})`,
              }}
            >
              ۱۳۰
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#CBD5E1', marginTop: 8 }}>
              امتیاز پژوهشی
            </div>
          </div>

          <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center' }}>
            کسب حداقل ۱۳۰ امتیاز کل
          </div>
        </div>
      </div>

      {/* Bottom Editorial Footnote (Role B: Structural - Pure Persian) */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 13,
          color: '#64748B',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: 14,
        }}
      >
        <div>امتیازات بر اساس جدول فعالیت‌های پژوهشی آیین‌نامه محاسبه می‌گردد</div>
        <div>دستورالعمل اجرایی گزینش استعدادهای درخشان</div>
      </div>
    </div>
  );
};
