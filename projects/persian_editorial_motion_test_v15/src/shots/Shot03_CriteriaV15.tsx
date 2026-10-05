import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeDatumRuleAxisCollapse } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 03 — TRIPARTITE PREREQUISITE CRITERIA DIAGRAM (V15)
 * Director-Led, Content-Locked Reference-Driven Motion
 * Frame Range: 620 - 1480 (Global) / 0 - 860 (Local)
 * - Category: DiagramExplainer
 * - Recipe: tripartite-criteria-diagram
 * - Camera: parallax-drift (1.000 -> 1.020)
 * - Visual Companion: Tripartite Structural Column Cards & Non-Textual SVG Medallions
 * - Dynamics: Idle Breathing Micro-Motion + Causal Secondary Reaction upon each Milestone Strike
 * - Acoustic Sync Milestones:
 *     f654 (local 34f): Criteria speech begins
 *     f855 (local 235f): «معدل کل شانزده» (GPA 16 lock)
 *     f1035 (local 415f): Disciplinary clearance lock
 *     f1215 (local 595f): «۶ ماده مختلف» (Articles / tech activities lock)
 * - Outgoing Carry (T3): Central horizontal datum collapses into timeline axis (local 830 - 860f)
 */
export const Shot03_CriteriaV15: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Header Title Reveal
  const titleOpacity = interpolate(localFrame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [15, 40], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(localFrame, 20, 30, 480);

  // 2. Three Stepped Milestone Confirmations
  // Criterion 1: GPA >= 16 (Local f = 235 / Global f = 855)
  const c1Entrance = Math.min(1, Math.max(0, (localFrame - 45) / 25));
  const c1Lock = calculateKeywordStrike(localFrame, 235, { scalePeak: 1.12 });
  const c1Secondary = calculateCausalSecondaryReaction(localFrame, 235, 3, 24);
  const c1GpaValue = interpolate(localFrame, [160, 235], [12, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Criterion 2: Disciplinary Clearance (Local f = 415 / Global f = 1035)
  const c2Entrance = Math.min(1, Math.max(0, (localFrame - 250) / 25));
  const c2Lock = calculateKeywordStrike(localFrame, 415, { scalePeak: 1.12 });
  const c2Secondary = calculateCausalSecondaryReaction(localFrame, 415, 3, 24);

  // Criterion 3: Scientific Articles / Tech Activity (Local f = 595 / Global f = 1215)
  const c3Entrance = Math.min(1, Math.max(0, (localFrame - 440) / 25));
  const c3Lock = calculateKeywordStrike(localFrame, 595, { scalePeak: 1.12 });
  const c3Secondary = calculateCausalSecondaryReaction(localFrame, 595, 3, 24);

  // V15 Idle Breathing Micro-Motion for columns
  const breathing = calculateIdleBreathing(localFrame, 90, 0.012);

  // Central Connecting Datum Rule
  const datumDraw = calculateDraw(localFrame, 40, 50, 1400);

  // 3. Outgoing Transition 03 Carry (Datum Rule Axis Collapse at local 830 - 860f)
  const t3Collapse = executeDatumRuleAxisCollapse(localFrame, 830, 860);

  return (
    <CameraGrammarRig mode="parallax-drift" durationInFrames={860} intensity={1.0}>
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
            background: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 0: Atmospheric Precision Grid */}
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
              fontSize: 38,
              fontWeight: 800,
              color: '#F8FAFC',
              letterSpacing: '-0.01em',
              marginBottom: 12,
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
            }}
          >
            {AUTHORIZED_CONTENT.shot03.sectionTitle.text}
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

        {/* Layer 2: Central Connecting Horizontal Datum Axis & T3 Outflow Carry */}
        {localFrame < 830 ? (
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: datumDraw.progress * 1400,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.35)',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.3)',
              pointerEvents: 'none',
            }}
          />
        ) : (
          /* Active Transition 03 Carry Collapse Axis */
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: `translate(-50%, -50%) scaleX(${t3Collapse.scaleX}) scaleY(${t3Collapse.scaleY})`,
              width: 1400,
              height: 2,
              backgroundColor: '#D4AF37',
              opacity: t3Collapse.opacity,
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.9)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Layer 3 & 4: Tripartite Milestone Column Cards Container */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            bottom: 80,
            left: 120,
            right: 120,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 32,
            alignItems: 'stretch',
          }}
        >
          {/* ================= COLUMN 1: GPA >= 16 ================= */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.70) 0%, rgba(7, 10, 18, 0.85) 100%)',
              border: `1px solid ${localFrame >= 235 ? '#D4AF37' : 'rgba(255, 255, 255, 0.08)'}`,
              borderRadius: 20,
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backdropFilter: 'blur(16px)',
              boxShadow: localFrame >= 235
                ? '0 16px 40px rgba(212, 175, 55, 0.25), 0 0 30px rgba(212, 175, 55, 0.15)'
                : '0 12px 32px rgba(0, 0, 0, 0.4)',
              transform: `scale(${c1Lock.scale * breathing.scale}) translateY(${breathing.translateY}px)`,
              opacity: c1Entrance,
            }}
          >
            {/* Milestone Badge Label */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                padding: '6px 18px',
                borderRadius: 20,
                marginBottom: 20,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c1Label.text}
            </div>

            {/* Non-Textual Caliper Vector Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: c1Secondary.active ? `0 0 ${16 * c1Secondary.opacity}px rgba(212, 175, 55, 0.8)` : 'none',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M12 8 V32 M28 8 V32" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 14 H28 M12 26 H28" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="20" cy="20" r="4" fill="#D4AF37" />
              </svg>
            </div>

            {/* Metric Lock Score Display (۱۶) */}
            <div
              style={{
                fontSize: 58,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.0,
                marginBottom: 12,
                textShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
              }}
            >
              {Math.round(c1GpaValue).toLocaleString('fa-IR')}
            </div>

            {/* Criterion Title */}
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#F8FAFC',
                marginBottom: 16,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c1Title.text}
            </div>

            {/* Summary Explanation */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: '#94A3B8',
                lineHeight: 1.5,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c1Summary.text}
            </div>
          </div>

          {/* ================= COLUMN 2: DISCIPLINARY CLEARANCE ================= */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.70) 0%, rgba(7, 10, 18, 0.85) 100%)',
              border: `1px solid ${localFrame >= 415 ? '#38BDF8' : 'rgba(255, 255, 255, 0.08)'}`,
              borderRadius: 20,
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backdropFilter: 'blur(16px)',
              boxShadow: localFrame >= 415
                ? '0 16px 40px rgba(56, 189, 248, 0.25), 0 0 30px rgba(56, 189, 248, 0.15)'
                : '0 12px 32px rgba(0, 0, 0, 0.4)',
              transform: `scale(${c2Lock.scale * breathing.scale}) translateY(${breathing.translateY}px)`,
              opacity: c2Entrance,
            }}
          >
            {/* Milestone Badge Label */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#38BDF8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                padding: '6px 18px',
                borderRadius: 20,
                marginBottom: 20,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c2Label.text}
            </div>

            {/* Non-Textual Shield Vector Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: c2Secondary.active ? `0 0 ${16 * c2Secondary.opacity}px rgba(56, 189, 248, 0.8)` : 'none',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 6 L32 11 V20 C32 27 26 33 20 35 C14 33 8 27 8 20 V11 L20 6 Z" stroke="#38BDF8" strokeWidth="2.5" />
                <path d="M15 20 L18 23 L25 16" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Criterion Title */}
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#F8FAFC',
                marginBottom: 16,
                marginTop: 20,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c2Title.text}
            </div>

            {/* Summary Explanation */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: '#94A3B8',
                lineHeight: 1.5,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c2Summary.text}
            </div>
          </div>

          {/* ================= COLUMN 3: ARTICLES & TECH ACTIVITY ================= */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.70) 0%, rgba(7, 10, 18, 0.85) 100%)',
              border: `1px solid ${localFrame >= 595 ? '#10B981' : 'rgba(255, 255, 255, 0.08)'}`,
              borderRadius: 20,
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backdropFilter: 'blur(16px)',
              boxShadow: localFrame >= 595
                ? '0 16px 40px rgba(16, 185, 129, 0.25), 0 0 30px rgba(16, 185, 129, 0.15)'
                : '0 12px 32px rgba(0, 0, 0, 0.4)',
              transform: `scale(${c3Lock.scale * breathing.scale}) translateY(${breathing.translateY}px)`,
              opacity: c3Entrance,
            }}
          >
            {/* Milestone Badge Label */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '6px 18px',
                borderRadius: 20,
                marginBottom: 20,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c3Label.text}
            </div>

            {/* Non-Textual Atom / Research Node Vector Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: c3Secondary.active ? `0 0 ${16 * c3Secondary.opacity}px rgba(16, 185, 129, 0.8)` : 'none',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="5" fill="#10B981" />
                <ellipse cx="20" cy="20" rx="14" ry="6" stroke="#10B981" strokeWidth="2" transform="rotate(30 20 20)" />
                <ellipse cx="20" cy="20" rx="14" ry="6" stroke="#10B981" strokeWidth="2" transform="rotate(-30 20 20)" />
              </svg>
            </div>

            {/* Sub-Metric Label (۶ ماده مختلف) */}
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#10B981',
                marginBottom: 12,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c3ArticleCount.text}
            </div>

            {/* Criterion Title */}
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#F8FAFC',
                marginBottom: 16,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c3Title.text}
            </div>

            {/* Summary Explanation */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: '#94A3B8',
                lineHeight: 1.5,
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c3Summary.text}
            </div>
          </div>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
