import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeDatumRuleAxisCollapse } from '../../../../src/transition/carryTransitions';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 03 — TRIPARTITE PREREQUISITE CRITERIA DIAGRAM (V14)
 * Strict Content Authority: 100% Source-Authorized Text
 * Frame Range: 620 - 1480 (Global) / 0 - 860 (Local)
 * - Category: DiagramExplainer
 * - Recipe: tripartite-criteria-diagram
 * - Camera: parallax-drift (1.000 -> 1.020)
 * - Visual Companion: Tripartite Structural Column Cards & Non-Textual SVG Medallions
 * - Acoustic Sync Milestones:
 *     f654 (local 34f): Criteria speech begins
 *     f855 (local 235f): «معدل کل شانزده» (GPA 16 lock)
 *     f1035 (local 415f): Disciplinary clearance lock
 *     f1215 (local 595f): «۶ ماده مختلف» (Articles / tech activities lock)
 * - Outgoing Carry (T3): Central horizontal datum collapses into timeline axis (local 830 - 860f)
 */
export const Shot03_CriteriaV14: React.FC = () => {
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
  const c1GpaValue = interpolate(localFrame, [160, 235], [12, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Criterion 2: Disciplinary Clearance (Local f = 415 / Global f = 1035)
  const c2Entrance = Math.min(1, Math.max(0, (localFrame - 250) / 25));
  const c2Lock = calculateKeywordStrike(localFrame, 415, { scalePeak: 1.12 });

  // Criterion 3: Scientific Articles / Tech Activity (Local f = 595 / Global f = 1215)
  const c3Entrance = Math.min(1, Math.max(0, (localFrame - 440) / 25));
  const c3Lock = calculateKeywordStrike(localFrame, 595, { scalePeak: 1.12 });

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

        {/* Section Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.9)',
              }}
            />
            <h2
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)',
              }}
            >
              {AUTHORIZED_CONTENT.shot03.sectionTitle.text}
            </h2>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.9)',
              }}
            />
          </div>
          <div
            style={{
              width: headerDraw.progress * 480,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Central Connecting Datum Rule Line (f40 - f830) */}
        {localFrame < 830 ? (
          <div
            style={{
              position: 'absolute',
              top: 500,
              left: '50%',
              transform: 'translateX(-50%)',
              width: datumDraw.progress * 1400,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.25)',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.3)',
            }}
          />
        ) : (
          /* Transition 03 Axis Collapse Carry (local 830 - 860f) */
          <div
            style={{
              position: 'absolute',
              top: 500,
              left: '50%',
              transform: `translateX(-50%) scaleX(${t3Collapse.scaleX}) scaleY(${t3Collapse.scaleY})`,
              width: 1400,
              height: 2,
              backgroundColor: '#D4AF37',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)',
              opacity: t3Collapse.opacity,
            }}
          />
        )}

        {/* Tripartite Columns Container */}
        <div
          style={{
            position: 'absolute',
            top: 180,
            left: 120,
            right: 120,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            gap: 32,
            height: 600,
          }}
        >
          {/* ===================== COLUMN 1: GPA >= 16 ===================== */}
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${localFrame >= 235 ? 'rgba(212, 175, 55, 0.6)' : 'rgba(255, 255, 255, 0.08)'}`,
              boxShadow: localFrame >= 235 ? '0 16px 40px rgba(212, 175, 55, 0.15)' : '0 10px 30px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: c1Entrance,
              transform: `translateY(${(1 - c1Entrance) * 30}px) scale(${c1Lock.scale})`,
              transition: 'border 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Companion Icon: Gauge Dial */}
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '2px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>

            {/* Label */}
            <div style={{ fontSize: 18, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>
              {AUTHORIZED_CONTENT.shot03.c1Label.text}
            </div>

            {/* Title */}
            <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginBottom: 20 }}>
              {AUTHORIZED_CONTENT.shot03.c1Title.text}
            </div>

            {/* Big Numeric Threshold: 16 */}
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: localFrame >= 235 ? '#D4AF37' : '#94A3B8',
                marginBottom: 20,
                textShadow: localFrame >= 235 ? '0 0 25px rgba(212, 175, 55, 0.6)' : 'none',
              }}
            >
              {localFrame >= 235 ? AUTHORIZED_CONTENT.shot03.c1ScoreValue.text : Math.round(c1GpaValue)}
            </div>

            {/* Rule Summary */}
            <div style={{ fontSize: 16, fontWeight: 500, color: '#CBD5E1', lineHeight: 1.6, marginTop: 'auto' }}>
              {AUTHORIZED_CONTENT.shot03.c1Summary.text}
            </div>
          </div>

          {/* ===================== COLUMN 2: DISCIPLINARY ===================== */}
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${localFrame >= 415 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.08)'}`,
              boxShadow: localFrame >= 415 ? '0 16px 40px rgba(56, 189, 248, 0.15)' : '0 10px 30px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: c2Entrance,
              transform: `translateY(${(1 - c2Entrance) * 30}px) scale(${c2Lock.scale})`,
              transition: 'border 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Companion Icon: Shield Checkmark */}
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '2px solid #38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>

            {/* Label */}
            <div style={{ fontSize: 18, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>
              {AUTHORIZED_CONTENT.shot03.c2Label.text}
            </div>

            {/* Title */}
            <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginBottom: 20 }}>
              {AUTHORIZED_CONTENT.shot03.c2Title.text}
            </div>

            {/* Clearance SVG Badge */}
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: `2px solid ${localFrame >= 415 ? '#38BDF8' : '#64748B'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: localFrame >= 415 ? '0 0 24px rgba(56, 189, 248, 0.6)' : 'none',
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke={localFrame >= 415 ? '#38BDF8' : '#64748B'}
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Rule Summary */}
            <div style={{ fontSize: 16, fontWeight: 500, color: '#CBD5E1', lineHeight: 1.6, marginTop: 'auto' }}>
              {AUTHORIZED_CONTENT.shot03.c2Summary.text}
            </div>
          </div>

          {/* ===================== COLUMN 3: 6 ARTICLES & DIVERSITY ===================== */}
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: `1px solid ${localFrame >= 595 ? 'rgba(212, 175, 55, 0.6)' : 'rgba(255, 255, 255, 0.08)'}`,
              boxShadow: localFrame >= 595 ? '0 16px 40px rgba(212, 175, 55, 0.15)' : '0 10px 30px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: c3Entrance,
              transform: `translateY(${(1 - c3Entrance) * 30}px) scale(${c3Lock.scale})`,
              transition: 'border 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Companion Icon: Research Molecule / Atom Node */}
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '2px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>

            {/* Label */}
            <div style={{ fontSize: 18, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>
              {AUTHORIZED_CONTENT.shot03.c3Label.text}
            </div>

            {/* Title */}
            <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginBottom: 20 }}>
              {AUTHORIZED_CONTENT.shot03.c3Title.text}
            </div>

            {/* Article Requirement Badge */}
            <div
              style={{
                fontSize: 38,
                fontWeight: 900,
                color: localFrame >= 595 ? '#D4AF37' : '#94A3B8',
                marginBottom: 20,
                textShadow: localFrame >= 595 ? '0 0 25px rgba(212, 175, 55, 0.6)' : 'none',
              }}
            >
              {AUTHORIZED_CONTENT.shot03.c3ArticleCount.text}
            </div>

            {/* Rule Summary */}
            <div style={{ fontSize: 16, fontWeight: 500, color: '#CBD5E1', lineHeight: 1.6, marginTop: 'auto' }}>
              {AUTHORIZED_CONTENT.shot03.c3Summary.text}
            </div>
          </div>
        </div>

        {/* Clean Architectural Frame Footer Bar (Pure Vector Axis, Zero Invented Words) */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: 16,
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D4AF37', opacity: 0.6 }} />
            <div style={{ width: 40, height: 1, backgroundColor: 'rgba(212, 175, 55, 0.3)' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 40, height: 1, backgroundColor: 'rgba(212, 175, 55, 0.3)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D4AF37', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
