import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeSplitAndConverge } from '../../../../src/motion/recipes/SplitAndConvergeRecipe';
import { executeSequentialMilestone } from '../../../../src/motion/recipes/SequentialMilestoneRecipe';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 03 — THE THREE PREREQUISITE CRITERIA (V12)
 * Frame Range: 620 - 1450 (Global) / 0 - 830 (Local)
 * - Level 3 Archetype: Structural Diagram & Sequential Milestone
 * - Level 2 Recipe: SplitAndConverge + SequentialMilestone + DiagramReveal
 * - 100% Pure Persian Script typography (Zero English metadata)
 * - Incoming Carry (T2): Symmetrical fission from Article 2 into 3 prerequisite columns
 * - Acoustic Sync Milestones:
 *     f654 (local 34f): «سه شرط ضروری»
 *     f855 (local 235f): «حداقل ۱۶» (GPA >= 16)
 *     f1035 (local 415f): «تأییدیه کمیته انضباطی» (Disciplinary Clearance)
 *     f1215 (local 595f): «حداقل از ۶ ماده» (6 Research Articles)
 * - Outgoing Carry (T3): Horizontal cyan datum line prepares for AxisCollapse at local 800 - 830f
 */
export const Shot03_CriteriaV12: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 620;

  // Acoustic event sync
  const overviewSync = calculateSyncPhrase(globalFrame, 'سه شرط ضروری');
  const c1Sync = calculateSyncPhrase(globalFrame, 'حداقل ۱۶');
  const c2Sync = calculateSyncPhrase(globalFrame, 'تأییدیه کمیته انضباطی');
  const c3Sync = calculateSyncPhrase(globalFrame, 'حداقل از ۶ ماده');

  // Incoming Carry: SplitAndConverge from center origin to 3 column offsets
  const splitData = executeSplitAndConverge(
    localFrame,
    0,
    45,
    900,
    30,
    { x: 0, y: 0 },
    [
      { x: 500, y: 0 },  // Column 1 (Right)
      { x: 0, y: 0 },    // Column 2 (Center)
      { x: -500, y: 0 }, // Column 3 (Left)
    ]
  );

  // Sequential Milestone Recipe managing the 3 criteria confirmations
  const milestoneData = executeSequentialMilestone(
    localFrame,
    235,
    3,
    180
  );

  // Header Title Reveal: «سه شرط ضروری»
  const titleOpacity = interpolate(localFrame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [15, 40], [30, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });

  // Outgoing Carry (T3 Baseline Datum Line)
  const datumLineDraw = calculateDraw(localFrame, 40, 60, 1600);
  let datumRotationZ = 0;
  let datumCollapseScaleX = 1;

  if (localFrame >= 800) {
    const rawC = (localFrame - 800) / 30;
    const easeCollapse = Easing.bezier(0.7, 0, 0.9, 0.2)(rawC);
    datumRotationZ = interpolate(easeCollapse, [0, 1], [0, -35]);
    datumCollapseScaleX = interpolate(easeCollapse, [0, 1], [1, 0.7]);
  }

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
          <span style={{ color: '#0284C7', fontWeight: 700 }}>شرایط سه‌گانه احراز صلاحیت</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span>معیارهای مصوب آیین‌نامه کشوری</span>
        </div>
        <div style={{ color: '#10B981', fontWeight: 600 }}>
          {milestoneData.confirmedCount === 3
            ? 'تکمیل هر ۳ شرط الزامی است'
            : `تأیید مرحله‌ای: ${milestoneData.confirmedCount} از ۳ شرط`}
        </div>
      </div>

      {/* Hero Overview Header: «سه شرط ضروری» (Role A: Narrative) */}
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
          سه شرط ضروری
        </div>
        <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 500 }}>
          الزامات بنیادین ارزیابی پرونده پژوهشگر
        </div>
      </div>

      {/* TRIPARTITE CRITERIA COLUMNS CONTAINER (Role B: Structural) */}
      <div
        style={{
          position: 'absolute',
          top: 250,
          left: 100,
          right: 100,
          height: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 28,
        }}
      >
        {/* CRITERION 1: GPA >= 16 (Right Column) */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${localFrame >= 235 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 16,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 235 ? '0 16px 40px rgba(56, 189, 248, 0.2)' : 'none',
            transform: `translateY(${interpolate(localFrame, [180, 235], [30, 0], { extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(localFrame, [180, 210], [0, 1], { extrapolateRight: 'clamp' }),
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
                marginBottom: 20,
              }}
            >
              شرط اول • وضعیت آموزشی
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>
              معدل کل تحصیلی
            </div>
            <div style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
              کسب حداقل نمره معدل کل تحصیلی در مقطع جاری
            </div>
          </div>

          {/* Visual Companion: Precision Numeric Gauge */}
          <div
            style={{
              textAlign: 'center',
              padding: '24px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: localFrame >= 235 ? '#38BDF8' : '#64748B',
                transform: `scale(${localFrame >= 235 ? 1 + c1Sync.haloIntensity * 0.15 : 1})`,
              }}
            >
              حداقل ۱۶
            </div>
            <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
              از حداکثر نمره ۲۰
            </div>
          </div>

          <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center' }}>
            بر اساس سوابق رسمی آموزشی
          </div>
        </div>

        {/* CRITERION 2: Disciplinary Clearance (Center Column) */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${localFrame >= 415 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 16,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 415 ? '0 16px 40px rgba(16, 185, 129, 0.2)' : 'none',
            transform: `translateY(${interpolate(localFrame, [360, 415], [30, 0], { extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(localFrame, [360, 390], [0, 1], { extrapolateRight: 'clamp' }),
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
                marginBottom: 20,
              }}
            >
              شرط دوم • صلاحیت عمومی
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>
              تأییدیه انضباطی
            </div>
            <div style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
              فاقد هرگونه محکومیت یا سوءسابقه انضباطی دانشگاه
            </div>
          </div>

          {/* Visual Companion: Official Wax Seal / Stamp */}
          <div
            style={{
              textAlign: 'center',
              padding: '24px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                border: `3px dashed ${localFrame >= 415 ? '#10B981' : '#475569'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${localFrame >= 415 ? 0 : 45}deg) scale(${localFrame >= 415 ? 1 + c2Sync.haloIntensity * 0.2 : 0.9})`,
                backgroundColor: localFrame >= 415 ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: localFrame >= 415 ? '#10B981' : '#64748B',
                }}
              >
                تأیید شد
              </span>
            </div>
            <div style={{ fontSize: 14, color: '#64748B', marginTop: 10 }}>
              کمیته انضباطی دانشگاه
            </div>
          </div>

          <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center' }}>
            استعلام مستقیم از مراجع ذی‌صلاح
          </div>
        </div>

        {/* CRITERION 3: 6 Research Articles (Left Column) */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${localFrame >= 595 ? 'rgba(245, 158, 11, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 16,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 595 ? '0 16px 40px rgba(245, 158, 11, 0.2)' : 'none',
            transform: `translateY(${interpolate(localFrame, [540, 595], [30, 0], { extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(localFrame, [540, 570], [0, 1], { extrapolateRight: 'clamp' }),
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
                marginBottom: 20,
              }}
            >
              شرط سوم • برونداد علمی
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>
              تنوع پژوهشی
            </div>
            <div style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
              کسب امتیاز از محورها و حوزه‌های مختلف علمی
            </div>
          </div>

          {/* Visual Companion: 6 Research Article Nodes Grid */}
          <div
            style={{
              textAlign: 'center',
              padding: '24px 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: localFrame >= 595 ? '#F59E0B' : '#64748B',
                transform: `scale(${localFrame >= 595 ? 1 + c3Sync.haloIntensity * 0.15 : 1})`,
              }}
            >
              حداقل ۶ ماده
            </div>
            <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>
              از آیین‌نامه ارتقای اعضای هیئت علمی
            </div>
          </div>

          <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center' }}>
            مقالات، طرح‌ها، نوآوری و کنگره‌ها
          </div>
        </div>
      </div>

      {/* OUTGOING CARRY DATUM LINE (T3 Motif) */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 100,
          right: 100,
          height: 4,
          backgroundColor: '#0284C7',
          borderRadius: 2,
          boxShadow: '0 0 16px rgba(2, 132, 199, 0.8)',
          transform: `scaleX(${datumLineDraw.progress * datumCollapseScaleX}) rotate(${datumRotationZ}deg)`,
          transformOrigin: 'right center',
        }}
      />

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
        <div>ضوابط بند ک ماده ۲ • مستندات پرونده</div>
        <div>ارزیابی همزمان هر ۳ معیار الزامی است</div>
      </div>
    </div>
  );
};
