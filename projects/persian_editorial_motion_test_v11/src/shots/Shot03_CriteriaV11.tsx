import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeSplitAndConverge } from '../../../../src/motion/recipes/SplitAndConvergeRecipe';
import { executeSequentialMilestone } from '../../../../src/motion/recipes/SequentialMilestoneRecipe';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 03 — THE THREE PREREQUISITE CRITERIA (V11)
 * Frame Range: 620 - 1450 (Global) / 0 - 830 (Local)
 * - Incoming Carry (T2): SplitAndConverge fission from Article 2 into 3 columns (local 0 - 50f)
 * - Semantic Acoustic Sync:
 *     f654 (local 34f): «سه شرط ضروری»
 *     f855 (local 235f): «حداقل ۱۶» (GPA >= 16)
 *     f1035 (local 415f): «تأییدیه کمیته انضباطی» (Disciplinary Clearance)
 *     f1215 (local 595f): «حداقل از ۶ ماده» (6 Research Articles)
 * - Outgoing Carry (T3): Horizontal cyan datum line prepares for AxisCollapse at local 800 - 830f
 */
export const Shot03_CriteriaV11: React.FC = () => {
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
  // Horizontal cyan rule at bottom of cards; at local f800 - 830, accelerates into AxisCollapse
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
      {/* Background Architectural Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Rail */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 14,
          fontFamily: 'monospace',
          fontSize: 13,
          color: '#64748B',
          letterSpacing: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#0284C7', fontWeight: 700 }}>SEC_03 // CRITERIA FRAMEWORK</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: '#94A3B8' }}>MANDATORY PRE-REQUISITES</span>
        </div>
        <div style={{ color: '#10B981' }}>CONFIRMED: {milestoneData.confirmedCount}/3 CRITERIA</div>
      </div>

      {/* Hero Overview Header: «سه شرط ضروری» */}
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
            fontSize: 48,
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

      {/* TRIPARTITE CRITERIA COLUMNS CONTAINER */}
      <div
        style={{
          position: 'absolute',
          top: 250,
          left: 80,
          right: 80,
          height: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 24,
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
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#38BDF8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                padding: '4px 10px',
                borderRadius: 4,
                display: 'inline-block',
                marginBottom: 20,
              }}
            >
              CRITERION 01 // ACADEMIC
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>
              معدل کل
            </div>
            <div style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
              کسب حداقل نمره معدل کل تحصیلی بر اساس ضوابط آموزشی
            </div>
          </div>

          {/* Value Strike: ۱۶ */}
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
                fontSize: 64,
                fontWeight: 900,
                color: localFrame >= 235 ? '#38BDF8' : '#64748B',
                transform: `scale(${localFrame >= 235 ? 1 + c1Sync.haloIntensity * 0.15 : 1})`,
                transition: 'transform 0.2s ease',
              }}
            >
              حداقل ۱۶
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: localFrame >= 235 ? '#10B981' : '#475569',
              }}
            />
            <span style={{ fontSize: 14, color: localFrame >= 235 ? '#10B981' : '#64748B', fontWeight: 600 }}>
              {localFrame >= 235 ? 'احراز شرط الزامی' : 'در انتظار بررسی'}
            </span>
          </div>
        </div>

        {/* CRITERION 2: Disciplinary Clearance (Center Column) */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${localFrame >= 415 ? 'rgba(245, 158, 11, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 16,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 415 ? '0 16px 40px rgba(245, 158, 11, 0.2)' : 'none',
            transform: `translateY(${interpolate(localFrame, [360, 415], [30, 0], { extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(localFrame, [360, 390], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                padding: '4px 10px',
                borderRadius: 4,
                display: 'inline-block',
                marginBottom: 20,
              }}
            >
              CRITERION 02 // CONDUCT
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>
              تأییدیه انضباطی
            </div>
            <div style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
              عدم سوءپیشینه انضباطی و اخلاقی در دوران تحصیل
            </div>
          </div>

          {/* Value Strike: تأییدیه رسمی */}
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
                fontSize: 38,
                fontWeight: 900,
                color: localFrame >= 415 ? '#F59E0B' : '#64748B',
                lineHeight: 1.4,
              }}
            >
              کمیته انضباطی
            </div>
            <div style={{ fontSize: 18, color: '#CBD5E1', marginTop: 4 }}>
              فاقد محکومیت قطعی
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: localFrame >= 415 ? '#10B981' : '#475569',
              }}
            />
            <span style={{ fontSize: 14, color: localFrame >= 415 ? '#10B981' : '#64748B', fontWeight: 600 }}>
              {localFrame >= 415 ? 'صلاحیت اخلاقی محرز' : 'در انتظار استعلام'}
            </span>
          </div>
        </div>

        {/* CRITERION 3: 6 Research Articles (Left Column) */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${localFrame >= 595 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 16,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 595 ? '0 16px 40px rgba(16, 185, 129, 0.2)' : 'none',
            transform: `translateY(${interpolate(localFrame, [540, 595], [30, 0], { extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(localFrame, [540, 570], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '4px 10px',
                borderRadius: 4,
                display: 'inline-block',
                marginBottom: 20,
              }}
            >
              CRITERION 03 // RESEARCH
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#F1F5F9', marginBottom: 12 }}>
              پوشش مواد آیین‌نامه
            </div>
            <div style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
              کسب امتیاز پژوهشی مؤثر از حداقل مواد قانونی تعریف‌شده
            </div>
          </div>

          {/* Value Strike: ۶ ماده پژوهشی */}
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
                color: localFrame >= 595 ? '#10B981' : '#64748B',
              }}
            >
              حداقل ۶ ماده
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: localFrame >= 595 ? '#10B981' : '#475569',
              }}
            />
            <span style={{ fontSize: 14, color: localFrame >= 595 ? '#10B981' : '#64748B', fontWeight: 600 }}>
              {localFrame >= 595 ? 'تنوع پژوهشی تایید شد' : 'در انتظار احراز'}
            </span>
          </div>
        </div>
      </div>

      {/* CONTINUOUS DATUM RULE (T3 CARRY OBJECT) */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          right: 80,
          left: 80,
          height: 3,
          backgroundColor: '#06B6D4',
          borderRadius: 2,
          boxShadow: '0 0 16px rgba(6, 182, 212, 0.8)',
          transform: `scaleX(${datumLineDraw.progress * datumCollapseScaleX}) rotate(${datumRotationZ}deg)`,
          transformOrigin: 'right center',
        }}
      />

      {/* Bottom Technical Telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#475569',
        }}
      >
        <div>
          ACOUSTIC EVENT: <span style={{ color: '#06B6D4' }}>GLOBAL_F{globalFrame}</span>
        </div>
        <div>
          CARRY CONTRACT T3: {localFrame >= 800 ? 'COLLAPSE_IN_PROGRESS' : 'DATUM_STEADY'}
        </div>
      </div>
    </div>
  );
};
