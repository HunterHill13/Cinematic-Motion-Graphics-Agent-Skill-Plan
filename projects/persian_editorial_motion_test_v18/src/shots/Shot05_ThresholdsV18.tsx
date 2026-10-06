import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeGravitationalSingularity } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { executeTextMaskReveal } from '../../../../src/motion/recipes/TextMaskRevealRecipe';
import { executeDotToLine } from '../../../../src/motion/recipes/DotToLineRecipe';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * SHOT 05 — ACADEMIC SCORE THRESHOLD PEDESTALS (V18)
 * Reference-Integrated, Content-Locked, Anti-Cliché Motion Engineering
 * Frame Range: 1700 - 2185 (Global) / 0 - 485 (Local)
 * 
 * V18 Recipe Upgrades:
 * - TextMaskReveal for header entrance
 * - DotToLine for header underline
 * - AutoFitText with tabular-nums for numeric pedestals (65, 110, 130)
 * - Anti-Cliché: Zero backdropFilter blur; solid monolithic architectural plinths
 * - Restrained editorial palette (Gold / Sky / Platinum Amber)
 */
export const Shot05_ThresholdsV18: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 1700;
  const fps = 30;

  // V18 Prosody-Driven Motion modulation
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Header Title Reveal with TextMaskReveal & DotToLine
  const headerReveal = executeTextMaskReveal(localFrame, 10, fps, 'bottom-to-top', true);
  const headerRule = executeDotToLine(localFrame, 15, fps, 480, 2);

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

  // Idle Breathing Micro-Motion on pedestals once elevated
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
        {/* Layer 0: Depth Plane Subtle Radial Grounding */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 65%, rgba(212, 175, 55, ${0.06 * prosodicRim}) 0%, transparent 65%)`,
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

        {/* Layer 4: Section Header Title (Masked Reveal) */}
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
            opacity: headerReveal.opacity,
            clipPath: headerReveal.clipPath,
            transform: `translateY(${headerReveal.translateY}px)`,
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
              width: headerRule.lineWidth,
              height: 2,
              backgroundColor: '#D4AF37',
              borderRadius: 1,
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
            height: 4,
            backgroundColor: '#D4AF37',
            borderRadius: 2,
            boxShadow: `0 0 24px rgba(212, 175, 55, ${0.5 * prosodicRim})`,
          }}
        />

        {/* Layer 3 & 4: Three Ascending Monumental Score Pedestals */}
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            left: 180,
            right: 180,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 40,
            transform: localFrame >= 455 ? `scale(${t5Singularity.scale})` : undefined,
            opacity: localFrame >= 455 ? t5Singularity.opacity : 1,
          }}
        >
          {/* ================= PEDESTAL 1: BACHELOR (65 PTS) ================= */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${p1Lock.scale * breathing.scale * (localFrame >= 214 ? prosodicScale : 1.0)}) translateY(${breathing.translateY}px)`,
            }}
          >
            {/* Metric Score Badge (Solid Architectural Surface) */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#0E131F',
                border: `1px solid rgba(212, 175, 55, ${0.6 * prosodicRim})`,
                borderRadius: 16,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 20,
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)',
                opacity: p1Rise,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: '#94A3B8', marginBottom: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier1Degree.text}
              </div>
              <div style={{ height: 60, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <AutoFitText
                  text={Math.round(p1Score).toLocaleString('fa-IR')}
                  maxFontSize={52}
                  minFontSize={32}
                  color="#FFFFFF"
                  isNumeric={true}
                  style={{ fontWeight: 900 }}
                />
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
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: '#D4AF37',
                  borderRadius: '12px 12px 0 0',
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
              transform: `scale(${p2Lock.scale * breathing.scale * (localFrame >= 310 ? prosodicScale : 1.0)}) translateY(${breathing.translateY}px)`,
            }}
          >
            {/* Metric Score Badge */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#0E131F',
                border: `1px solid rgba(56, 189, 248, ${0.7 * prosodicRim})`,
                borderRadius: 16,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 20,
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)',
                opacity: p2Rise,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: '#38BDF8', marginBottom: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier2Degree.text}
              </div>
              <div style={{ height: 60, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <AutoFitText
                  text={Math.round(p2Score).toLocaleString('fa-IR')}
                  maxFontSize={52}
                  minFontSize={32}
                  color="#FFFFFF"
                  isNumeric={true}
                  style={{ fontWeight: 900 }}
                />
                <span style={{ fontSize: 18, fontWeight: 600, color: '#38BDF8' }}>
                  {AUTHORIZED_CONTENT.shot05.tier2Unit.text}
                </span>
              </div>
            </div>

            {/* Architectural Column Pillar (Height: 270px) */}
            <div
              style={{
                width: '100%',
                height: p2Rise * 270,
                background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: 'none',
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: '#38BDF8',
                  borderRadius: '12px 12px 0 0',
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
              transform: `scale(${p3Lock.scale * breathing.scale * (localFrame >= 400 ? prosodicScale : 1.0)}) translateY(${breathing.translateY}px)`,
            }}
          >
            {/* Metric Score Badge */}
            <div
              style={{
                width: '100%',
                backgroundColor: '#0E131F',
                border: `1px solid rgba(212, 175, 55, ${0.7 * prosodicRim})`,
                borderRadius: 16,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 20,
                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)',
                opacity: p3Rise,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: '#D4AF37', marginBottom: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier3Degree.text}
              </div>
              <div style={{ height: 60, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <AutoFitText
                  text={Math.round(p3Score).toLocaleString('fa-IR')}
                  maxFontSize={52}
                  minFontSize={32}
                  color="#FFFFFF"
                  isNumeric={true}
                  style={{ fontWeight: 900 }}
                />
                <span style={{ fontSize: 18, fontWeight: 600, color: '#D4AF37' }}>
                  {AUTHORIZED_CONTENT.shot05.tier3Unit.text}
                </span>
              </div>
            </div>

            {/* Architectural Column Pillar (Height: 360px) */}
            <div
              style={{
                width: '100%',
                height: p3Rise * 360,
                background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: 'none',
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: '#D4AF37',
                  borderRadius: '12px 12px 0 0',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
