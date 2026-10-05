import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeCounterBalancedSweep } from '../../../../src/motion/recipes/CounterBalancedSweepRecipe';
import { executeGravitationalSingularity } from '../../../../src/motion/recipes/GravitationalSingularityRecipe';

/**
 * SHOT 05 — ACADEMIC DEGREE SCORE THRESHOLDS (V11)
 * Frame Range: 1700 - 2155 (Global) / 0 - 455 (Local)
 * - Incoming Carry (T4): 3 score pedestals rise from ground plane
 * - Semantic Acoustic Sync:
 *     f1715 (local 15f): «امتیازات لازم بر اساس مقطع»
 *     f1914 (local 214f): «۶۵ امتیاز» (Bachelor)
 *     f2010 (local 310f): «۱۱۰ امتیاز» (Master)
 *     f2100 (local 400f): «۱۳۰ امتیاز» (PhD)
 * - Motion Recipes: CounterBalancedSweep + GravitationalSingularity
 * - Outgoing Carry (T5): The 3 score pillars collapse inward into a central gravitational singularity (local 420 - 455f)
 */
export const Shot05_ThresholdsV11: React.FC = () => {
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
  // Pulls the 3 pillars inward toward center stage (x: 960, y: 540)
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
          <span style={{ color: '#0284C7', fontWeight: 700 }}>SEC_05 // SCORE THRESHOLDS</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: '#94A3B8' }}>ACADEMIC DEGREE TIERS</span>
        </div>
        <div style={{ color: '#10B981' }}>EVALUATION MATRIX: 3 DEGREE LEVELS</div>
      </div>

      {/* Header Title: «امتیازات لازم بر اساس مقطع» */}
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
          امتیازات لازم بر اساس مقطع
        </div>
        <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 500 }}>
          حداقل حدنصاب مصوب شورای هدایت استعدادهای درخشان
        </div>
      </div>

      {/* THREE MONUMENTAL PEDESTAL PILLARS */}
      <div
        style={{
          position: 'absolute',
          top: 260,
          left: 80,
          right: 80,
          height: 620,
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
            height: 440,
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
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#38BDF8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                padding: '4px 10px',
                borderRadius: 4,
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              TIER 01 // BACHELOR
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9' }}>مقطع کارشناسی</div>
            <div style={{ fontSize: 16, color: '#94A3B8', marginTop: 8 }}>
              دانشجویان دوره کارشناسی پیوسته و ناپیوسته
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: localFrame >= 214 ? '#38BDF8' : '#64748B',
                lineHeight: 1,
              }}
            >
              ۶۵
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#CBD5E1', marginTop: 8 }}>
              امتیاز پژوهشی
            </div>
          </div>

          <div
            style={{
              height: 4,
              backgroundColor: localFrame >= 214 ? '#38BDF8' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
            }}
          />
        </div>

        {/* PILLAR 2: کارشناسی ارشد -> ۱۱۰ امتیاز */}
        <div
          style={{
            flex: 1,
            height: 520,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `2px solid ${localFrame >= 310 ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 18,
            padding: 32,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 310 ? '0 16px 40px rgba(245, 158, 11, 0.25)' : 'none',
            transform: `translateY(${interpolate(localFrame, [260, 310], [40, 0], { extrapolateRight: 'clamp' })}px) translateX(${localFrame >= 420 ? singularity.entities[1].x - 960 : 0}px) scale(${localFrame >= 420 ? singularity.entities[1].scale : 1})`,
            opacity: localFrame >= 420 ? singularity.entities[1].opacity : 1,
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
                marginBottom: 16,
              }}
            >
              TIER 02 // MASTER
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9' }}>کارشناسی ارشد</div>
            <div style={{ fontSize: 16, color: '#94A3B8', marginTop: 8 }}>
              دانشجویان دوره‌های کارشناسی ارشد ناپیوسته
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: localFrame >= 310 ? '#F59E0B' : '#64748B',
                lineHeight: 1,
              }}
            >
              ۱۱۰
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#CBD5E1', marginTop: 8 }}>
              امتیاز پژوهشی
            </div>
          </div>

          <div
            style={{
              height: 4,
              backgroundColor: localFrame >= 310 ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
            }}
          />
        </div>

        {/* PILLAR 3: دکترای تخصصی -> ۱۳۰ امتیاز */}
        <div
          style={{
            flex: 1,
            height: 600,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: `2px solid ${localFrame >= 400 ? '#10B981' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 18,
            padding: 32,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: localFrame >= 400 ? '0 16px 40px rgba(16, 185, 129, 0.25)' : 'none',
            transform: `translateY(${interpolate(localFrame, [350, 400], [40, 0], { extrapolateRight: 'clamp' })}px) translateX(${localFrame >= 420 ? singularity.entities[2].x - 1520 : 0}px) scale(${localFrame >= 420 ? singularity.entities[2].scale : 1})`,
            opacity: localFrame >= 420 ? singularity.entities[2].opacity : 1,
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
                marginBottom: 16,
              }}
            >
              TIER 03 // DOCTORAL
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9' }}>دکترای تخصصی</div>
            <div style={{ fontSize: 16, color: '#94A3B8', marginTop: 8 }}>
              دکترای عمومی، حرفه‌ای و تخصصی (Ph.D)
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 108,
                fontWeight: 900,
                color: localFrame >= 400 ? '#10B981' : '#64748B',
                lineHeight: 1,
              }}
            >
              ۱۳۰
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#CBD5E1', marginTop: 8 }}>
              امتیاز پژوهشی
            </div>
          </div>

          <div
            style={{
              height: 4,
              backgroundColor: localFrame >= 400 ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Central Singularity Detonation Core (f420 - 455) */}
      {localFrame >= 420 && (
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 540,
            transform: 'translate(-50%, -50%)',
            width: 40 * (1 + singularity.centerSingularityGlow * 3),
            height: 40 * (1 + singularity.centerSingularityGlow * 3),
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 60px #10B981',
            pointerEvents: 'none',
          }}
        />
      )}

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
          ACOUSTIC EVENT: <span style={{ color: '#10B981' }}>GLOBAL_F{globalFrame}</span>
        </div>
        <div>
          CARRY CONTRACT T5: {localFrame >= 420 ? 'SINGULARITY_IMPLODING' : 'PILLARS_MONUMENTAL'}
        </div>
      </div>
    </div>
  );
};
