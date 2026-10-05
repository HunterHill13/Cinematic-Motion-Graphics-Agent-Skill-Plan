import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeAxisCollapse } from '../../../../src/motion/recipes/AxisCollapseRecipe';
import { executeFoldAndUnfold } from '../../../../src/motion/recipes/FoldAndUnfoldRecipe';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 04 — THE TEMPORAL ELIGIBILITY WINDOW (V11)
 * Frame Range: 1450 - 1700 (Global) / 0 - 250 (Local)
 * - Incoming Carry (T3): Horizontal line completes 90° AxisCollapse into vertical wall
 * - Semantic Acoustic Sync:
 *     f1476 (local 26f): «بازه زمانی معتبر»
 *     f1575 (local 125f): «یک سال پس از فارغ‌التحصیلی»
 * - Motion Recipes: AxisCollapse + FoldAndUnfold
 * - Outgoing Carry (T4): Vertical wall folds 90° forward onto floor datum (local 220 - 250f)
 */
export const Shot04_TimeWindowV11: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 1450;

  // Semantic Acoustic Sync
  const timeStartSync = calculateSyncPhrase(globalFrame, 'بازه زمانی معتبر');
  const cutoffSync = calculateSyncPhrase(globalFrame, 'یک سال پس از فارغ‌التحصیلی');

  // Incoming Carry: AxisCollapse completing into vertical wall
  const axisCollapse = executeAxisCollapse(
    localFrame,
    0,
    30,
    { x: 960, y: 540 },
    480
  );

  // Recipe: FoldAndUnfold for temporal timeline card
  const foldData = executeFoldAndUnfold(localFrame, 25, 35, 30);

  // Timeline axis vector line draw
  const timelineDraw = calculateDraw(localFrame, 45, 40, 840);

  // Outgoing Carry (T4: Vertical Wall Folds 90° forward into stage floor at local 220 - 250f)
  let foldToFloorAngleX = 0;
  let floorPerspectiveZ = 1200;
  if (localFrame >= 220) {
    const rawF = (localFrame - 220) / 30;
    const easeFloor = Easing.bezier(0.7, 0, 0.9, 0.2)(rawF);
    foldToFloorAngleX = interpolate(easeFloor, [0, 1], [0, 85]);
    floorPerspectiveZ = interpolate(easeFloor, [0, 1], [1200, 800]);
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
        perspective: `${floorPerspectiveZ}px`,
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
          <span style={{ color: '#0284C7', fontWeight: 700 }}>SEC_04 // TEMPORAL WINDOW</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: '#94A3B8' }}>DEADLINE SPECIFICATION</span>
        </div>
        <div style={{ color: '#F59E0B' }}>CUTOFF LIMIT: 12 MONTHS MAX</div>
      </div>

      {/* STAGE CONTAINER WITH T4 FORWARD FOLD CAPABILITY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `rotateX(${foldToFloorAngleX}deg)`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.1s linear',
        }}
      >
        {/* Title Header: «بازه زمانی معتبر» */}
        <div
          style={{
            position: 'absolute',
            top: 140,
            right: 80,
            left: 80,
            textAlign: 'center',
            opacity: interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }),
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
            بازه زمانی معتبر
          </div>
          <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 500 }}>
            مهلت قانونی ثبت و ارسال درخواست پرونده
          </div>
        </div>

        {/* HERO CHRONOLOGICAL CARD CONTAINER */}
        <div
          style={{
            position: 'absolute',
            top: 270,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1040,
            height: 480,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 20,
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
            padding: 48,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: foldData.combinedOpacity,
          }}
        >
          {/* Status Label */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                padding: '4px 12px',
                borderRadius: 4,
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              ELIGIBILITY TIMELINE // CHRONO
            </span>
            <span style={{ fontSize: 14, color: '#94A3B8' }}>حداکثر فرصت اقدام پس از فراغت</span>
          </div>

          {/* TIMELINE VISUAL GRAPHIC */}
          <div style={{ position: 'relative', width: '100%', height: 120 }}>
            {/* Timeline Axis Line */}
            <div
              style={{
                position: 'absolute',
                top: 50,
                right: 0,
                left: 0,
                height: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 2,
              }}
            />
            {/* Active Drawing Line */}
            <div
              style={{
                position: 'absolute',
                top: 50,
                right: 0,
                width: `${timelineDraw.progress * 100}%`,
                height: 4,
                backgroundColor: '#F59E0B',
                borderRadius: 2,
                boxShadow: '0 0 16px rgba(245, 158, 11, 0.6)',
              }}
            />

            {/* Point 1: Graduation Day */}
            <div style={{ position: 'absolute', top: 30, right: 20, textAlign: 'center' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: '#0284C7',
                  border: '3px solid #38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 14,
                  margin: '0 auto 8px auto',
                  color: '#FFF',
                }}
              >
                شروع
              </div>
              <div style={{ fontSize: 14, color: '#E2E8F0', fontWeight: 600 }}>فارغ‌التحصیلی</div>
            </div>

            {/* Point 2: 1-Year Cutoff Threshold */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 60,
                textAlign: 'center',
                opacity: interpolate(localFrame, [100, 125], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `scale(${localFrame >= 125 ? 1 + cutoffSync.haloIntensity * 0.1 : 1})`,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  border: '3px solid #EF4444',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 20,
                  color: '#EF4444',
                  margin: '0 auto 8px auto',
                }}
              >
                ۱ سال
              </div>
              <div style={{ fontSize: 16, color: '#EF4444', fontWeight: 700 }}>سقف نهایی مهلت</div>
            </div>
          </div>

          {/* MAIN CUTOFF STRIKE TEXT: «یک سال پس از فارغ‌التحصیلی» */}
          <div
            style={{
              textAlign: 'center',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 12,
              padding: '16px 24px',
            }}
          >
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: localFrame >= 125 ? '#F59E0B' : '#E2E8F0',
                letterSpacing: -0.5,
              }}
            >
              حداکثر تا یک سال پس از فارغ‌التحصیلی
            </div>
          </div>
        </div>
      </div>

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
          ACOUSTIC EVENT: <span style={{ color: '#F59E0B' }}>GLOBAL_F{globalFrame}</span>
        </div>
        <div>
          CARRY CONTRACT T4: {localFrame >= 220 ? 'PLANAR_FOLD_ACTIVE' : 'WALL_VERTICAL'}
        </div>
      </div>
    </div>
  );
};
