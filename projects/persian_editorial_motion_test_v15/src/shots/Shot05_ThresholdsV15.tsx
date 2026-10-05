import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeGravitationalSingularity } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 05 — ACADEMIC SCORE THRESHOLD PEDESTALS (V15)
 * Director-Led, Content-Locked Reference-Driven Motion
 * Frame Range: 1700 - 2185 (Global) / 0 - 485 (Local)
 * - Category: DataNumbers
 * - Recipe: score-threshold-pedestals
 * - Camera: continuous (1.000 -> 1.025, cy: 550 -> 530)
 * - Visual Companion: Three Monumental Architectural Plinths (65, 110, 130) + Metallic Score Badges
 * - Dynamics: Idle Breathing Micro-Motion + Causal Secondary Reaction upon each Pedestal Strike
 * - Audio Sync Milestones:
 *     f1914 (local 214f): «کارشناسی ۶۵ امتیاز»
 *     f2010 (local 310f): «پزشکی عمومی ۱۱۰ امتیاز»
 *     f2100 (local 400f): «دکترای تخصصی ۱۳۰ امتیاز»
 * - Outgoing Carry (T5): Gravitational Singularity handoff into Shot 06 (local 455 - 485f)
 */
export const Shot05_ThresholdsV15: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Header Title Reveal
  const titleOpacity = interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [10, 35], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(localFrame, 15, 25, 480);

  // 2. Pedestals Progressive Elevation
  // Pedestal 1: Bachelor (کارشناسی - ۶۵) at local f = 214
  const p1Rise = interpolate(localFrame, [60, 120], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p1Score = interpolate(localFrame, [140, 214], [0, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p1Lock = calculateKeywordStrike(localFrame, 214, { scalePeak: 1.15 });
  const p1Secondary = calculateCausalSecondaryReaction(localFrame, 214, 3, 22);

  // Pedestal 2: Medicine (پزشکی عمومی - ۱۱۰) at local f = 310
  const p2Rise = interpolate(localFrame, [150, 210], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p2Score = interpolate(localFrame, [230, 310], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p2Lock = calculateKeywordStrike(localFrame, 310, { scalePeak: 1.15 });
  const p2Secondary = calculateCausalSecondaryReaction(localFrame, 310, 3, 22);

  // Pedestal 3: PhD (دکترای تخصصی - ۱۳۰) at local f = 400
  const p3Rise = interpolate(localFrame, [240, 300], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p3Score = interpolate(localFrame, [320, 400], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p3Lock = calculateKeywordStrike(localFrame, 400, { scalePeak: 1.15 });
  const p3Secondary = calculateCausalSecondaryReaction(localFrame, 400, 3, 22);

  // V15 Idle Breathing Micro-Motion on pedestals once elevated
  const breathing = calculateIdleBreathing(localFrame, 90, 0.012);

  // Foundation Plinth Stage
  const baseStageProgress = interpolate(localFrame, [0, 40], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Outgoing Transition 05 Carry (Gravitational Singularity at local 455 - 485f)
  const t5Singularity = executeGravitationalSingularity(localFrame, 455, 485);

  return (
    <CameraGrammarRig mode="continuous" durationInFrames={485} intensity={1.0}>
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
        {/* Layer 0: Depth Plane Radial Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 65%, rgba(212, 175, 55, 0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 0: Architectural Vector Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 4: Section Header Title */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 140,
            right: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleSlideY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: '#F8FAFC',
              letterSpacing: '-0.01em',
              marginBottom: 12,
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
            }}
          >
            {AUTHORIZED_CONTENT.shot05.sectionTitle.text}
          </div>
          <div
            style={{
              width: headerDraw.progress * 480,
              height: 3,
              backgroundColor: '#D4AF37',
              borderRadius: 2,
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
            }}
          />
        </div>

        {/* Layer 2: Foundation Plinth Floor Stage */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: baseStageProgress * 1500,
            height: 6,
            backgroundColor: '#D4AF37',
            borderRadius: 3,
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
          }}
        />

        {/* Layer 3 & 4: Three Ascending Monumental Score Pedestals */}
        <div
          style={{
            position: 'absolute',
            bottom: 46,
            left: 180,
            right: 180,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 40,
          }}
        >
          {/* ================= PEDESTAL 1: BACHELOR (65 PTS) ================= */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${p1Lock.scale * breathing.scale}) translateY(${breathing.translateY}px)`,
            }}
          >
            {/* Metric Score Badge */}
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '2px solid rgba(212, 175, 55, 0.6)',
                borderRadius: 20,
                padding: '16px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 20,
                backdropFilter: 'blur(16px)',
                boxShadow: `0 12px 32px rgba(0, 0, 0, 0.5)${p1Secondary.active ? `, 0 0 ${20 * p1Secondary.opacity}px rgba(212, 175, 55, 0.8)` : ''}`,
                opacity: p1Rise,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: '#94A3B8', marginBottom: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier1Degree.text}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontSize: 54,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textShadow: '0 2px 16px rgba(212, 175, 55, 0.5)',
                  }}
                >
                  {Math.round(p1Score).toLocaleString('fa-IR')}
                </span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#D4AF37' }}>
                  {AUTHORIZED_CONTENT.shot05.tier1Unit.text}
                </span>
              </div>
            </div>

            {/* Architectural Column Pillar (Height: 180px) */}
            <div
              style={{
                width: '100%',
                height: p1Rise * 180,
                background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: 'none',
                borderRadius: '16px 16px 0 0',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: '#D4AF37',
                  borderRadius: '16px 16px 0 0',
                }}
              />
            </div>
          </div>

          {/* ================= PEDESTAL 2: MEDICINE (110 PTS) ================= */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${p2Lock.scale * breathing.scale}) translateY(${breathing.translateY}px)`,
            }}
          >
            {/* Metric Score Badge */}
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '2px solid rgba(56, 189, 248, 0.7)',
                borderRadius: 20,
                padding: '16px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 20,
                backdropFilter: 'blur(16px)',
                boxShadow: `0 12px 32px rgba(0, 0, 0, 0.5)${p2Secondary.active ? `, 0 0 ${20 * p2Secondary.opacity}px rgba(56, 189, 248, 0.8)` : ''}`,
                opacity: p2Rise,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: '#38BDF8', marginBottom: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier2Degree.text}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontSize: 54,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textShadow: '0 2px 16px rgba(56, 189, 248, 0.5)',
                  }}
                >
                  {Math.round(p2Score).toLocaleString('fa-IR')}
                </span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#38BDF8' }}>
                  {AUTHORIZED_CONTENT.shot05.tier2Unit.text}
                </span>
              </div>
            </div>

            {/* Architectural Column Pillar (Height: 300px) */}
            <div
              style={{
                width: '100%',
                height: p2Rise * 300,
                background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderBottom: 'none',
                borderRadius: '16px 16px 0 0',
                boxShadow: '0 -4px 24px rgba(56, 189, 248, 0.15)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: '#38BDF8',
                  borderRadius: '16px 16px 0 0',
                  boxShadow: '0 0 16px rgba(56, 189, 248, 0.8)',
                }}
              />
            </div>
          </div>

          {/* ================= PEDESTAL 3: PHD (130 PTS) ================= */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${p3Lock.scale * breathing.scale}) translateY(${breathing.translateY}px)`,
            }}
          >
            {/* Metric Score Badge */}
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                border: '2px solid rgba(16, 185, 129, 0.8)',
                borderRadius: 20,
                padding: '16px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 20,
                backdropFilter: 'blur(16px)',
                boxShadow: `0 12px 32px rgba(0, 0, 0, 0.5)${p3Secondary.active ? `, 0 0 ${20 * p3Secondary.opacity}px rgba(16, 185, 129, 0.8)` : ''}`,
                opacity: p3Rise,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: '#10B981', marginBottom: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier3Degree.text}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontSize: 54,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textShadow: '0 2px 16px rgba(16, 185, 129, 0.5)',
                  }}
                >
                  {Math.round(p3Score).toLocaleString('fa-IR')}
                </span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#10B981' }}>
                  {AUTHORIZED_CONTENT.shot05.tier3Unit.text}
                </span>
              </div>
            </div>

            {/* Architectural Column Pillar (Height: 420px) */}
            <div
              style={{
                width: '100%',
                height: p3Rise * 420,
                background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderBottom: 'none',
                borderRadius: '16px 16px 0 0',
                boxShadow: '0 -4px 30px rgba(16, 185, 129, 0.2)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: '#10B981',
                  borderRadius: '16px 16px 0 0',
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.9)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Layer 6: Outgoing Transition 05 Carry (Gravitational Singularity Collapse) */}
        {localFrame >= 455 && (
          <div
            style={{
              position: 'absolute',
              top: 540,
              left: 960,
              transform: `translate(-50%, -50%) scale(${t5Singularity.scale})`,
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              boxShadow: `0 0 ${t5Singularity.glow}px rgba(212, 175, 55, 1)`,
              opacity: t5Singularity.opacity,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </CameraGrammarRig>
  );
};
