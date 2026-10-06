import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { executeTextMaskReveal } from '../../../../src/motion/recipes/TextMaskRevealRecipe';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';
import { executeDatumRuleAxisCollapse } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 03 — TRIPARTITE PREREQUISITE CRITERIA (V20 STABLE)
 * V20 Motion Stability: Settle-locked metrics («۱۶», Caliper, «۶»),
 * zero breathing jitter on columns, stable hexagonal constellation,
 * and continuous datum collapse into Shot 04.
 * Frame Range: 620 - 1480 (Global) / 0 - 860 (Local)
 */
export const Shot03_CriteriaV19: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 620;
  const fps = 30;

  // Prosodic speech modulation (rim lighting only, no geometric scale jitter)
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Header Title Reveal across the upper architectural frieze (0 - 40f)
  const headerReveal = executeTextMaskReveal(localFrame, 10, fps, 'bottom-to-top', true);

  // 2. Three Stepped Graphic Milestone Choreographies with DETERMINISTIC SETTLE LOCKS:
  // -------------------------------------------------------------
  // CRITERION 1: GPA >= 16 (Local f = 45 to 260 / Hit at f = 235)
  // -------------------------------------------------------------
  const c1Entrance = interpolate(localFrame, [40, 75], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c1Counter = interpolate(localFrame, [90, 235], [10, 16], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c1Settle = calculateSettleLock(localFrame, 235, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.15,
  });

  // -------------------------------------------------------------
  // CRITERION 2: Caliper Clearance (Local f = 250 to 450 / Hit at f = 415)
  // -------------------------------------------------------------
  const c2Entrance = interpolate(localFrame, [250, 285], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Precision caliper closure
  const caliperProgress = interpolate(localFrame, [290, 415], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c2Settle = calculateSettleLock(localFrame, 415, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.15,
  });

  // -------------------------------------------------------------
  // CRITERION 3: 6 Orbiting Articles Constellation (Local f = 440 to 800 / Hit at f = 595)
  // -------------------------------------------------------------
  const c3Entrance = interpolate(localFrame, [440, 475], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c3ConstellationProgress = interpolate(localFrame, [480, 595], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const c3Settle = calculateSettleLock(localFrame, 595, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.15,
  });

  // 3. T3 Carry Transition: Collapse into Horizontal Datum Line (local 825 - 860f)
  const t3Collapse = executeDatumRuleAxisCollapse(localFrame, 825, 860);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Full-Canvas Editorial Atmosphere */}
      <CanvasAtmosphereV19 mood="gold" intensity={1.05} />

      {/* Dynamic Parallax Camera Tracking with Stable Reading Windows */}
      <CameraGrammarRig
        mode="parallax-drift"
        durationInFrames={860}
        intensity={1.1}
        readingWindows={[[245, 260], [425, 450], [610, 820]]}
      >
        <AbsoluteFill
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
          }}
        >
          {/* ======================================================== */}
          {/* ARCHITECTURAL HEADER FRIEZE                              */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: 50,
              right: 100,
              left: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: headerReveal.opacity,
              clipPath: headerReveal.clipPath,
              transform: `translateY(${headerReveal.translateY}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <div style={{ width: 40, height: 2, backgroundColor: '#D4AF37' }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#D4AF37', letterSpacing: 2 }}>
                شرایط سه‌گانه ورود به ارزیابی
              </span>
              <div style={{ width: 40, height: 2, backgroundColor: '#D4AF37' }} />
            </div>

            <AutoFitText
              text={AUTHORIZED_CONTENT.shot03.sectionTitle.text}
              maxFontSize={44}
              minFontSize={28}
              color="#F8FAFC"
              textAlign="center"
              dir="rtl"
              style={{ fontWeight: 900 }}
            />
          </div>

          {/* ======================================================== */}
          {/* THREE SPATIAL PLANES (NO CARDS! PURE GRAPHIC GEOMETRY)   */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: 180,
              bottom: 90,
              right: 80,
              left: 80,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              opacity: localFrame >= 825 ? t3Collapse.opacity : 1,
            }}
          >
            {/* ---------------------------------------------------- */}
            {/* ZONE 1 (Right): MONUMENTAL METRIC "۱۶"               */}
            {/* ---------------------------------------------------- */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                opacity: c1Entrance,
                transform: `scale(${c1Settle.scale}) translateY(${c1Settle.translateY}px)`,
              }}
            >
              {/* Subtle architectural vertical axis dividing zone */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 40,
                  bottom: 40,
                  width: 1,
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                }}
              />

              {/* Milestone Tag */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#D4AF37',
                  letterSpacing: 1,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, backgroundColor: '#D4AF37', transform: 'rotate(45deg)' }} />
                <span>{AUTHORIZED_CONTENT.shot03.c1Label.text}</span>
              </div>

              {/* COLOSSAL TYPOGRAPHIC SCULPTURE: "۱۶" */}
              <div
                style={{
                  fontSize: 130,
                  fontWeight: 900,
                  lineHeight: 1,
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #D4AF37 80%, #92400E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: 16,
                  textShadow: `0 0 30px rgba(212, 175, 55, ${prosodicRim * 0.5})`,
                }}
              >
                {Math.round(c1Counter).toLocaleString('fa-IR')}
              </div>

              {/* Title & Rule Explanation */}
              <div style={{ textAlign: 'center', maxWidth: 420 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: '#F8FAFC',
                    marginBottom: 12,
                  }}
                >
                  {AUTHORIZED_CONTENT.shot03.c1Title.text}
                </div>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#94A3B8',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {AUTHORIZED_CONTENT.shot03.c1Summary.text}
                </p>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* ZONE 2 (Center): PRECISION GATE CALIPER              */}
            {/* ---------------------------------------------------- */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                opacity: c2Entrance,
                transform: `scale(${c2Settle.scale}) translateY(${c2Settle.translateY}px)`,
              }}
            >
              {/* Vertical axis divider */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 40,
                  bottom: 40,
                  width: 1,
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                }}
              />

              {/* Milestone Tag */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#38BDF8',
                  letterSpacing: 1,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, backgroundColor: '#38BDF8', transform: 'rotate(45deg)' }} />
                <span>{AUTHORIZED_CONTENT.shot03.c2Label.text}</span>
              </div>

              {/* Precision Caliper Geometry Vector */}
              <div
                style={{
                  width: 180,
                  height: 130,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <svg width="180" height="130" viewBox="0 0 180 130" fill="none">
                  {/* Caliper Upper Beam */}
                  <line
                    x1="20"
                    y1="25"
                    x2="160"
                    y2="25"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Left Jaw */}
                  <line
                    x1={30 + (1 - caliperProgress) * 30}
                    y1="25"
                    x2={30 + (1 - caliperProgress) * 30}
                    y2="105"
                    stroke="#38BDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Right Jaw */}
                  <line
                    x1={150 - (1 - caliperProgress) * 30}
                    y1="25"
                    x2={150 - (1 - caliperProgress) * 30}
                    y2="105"
                    stroke="#38BDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Center Verification Checkmark Lock */}
                  {localFrame >= 415 && (
                    <circle cx="90" cy="65" r="22" fill="#0EA5E9" />
                  )}
                  {localFrame >= 415 && (
                    <path
                      d="M 80 65 L 87 72 L 102 57"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </div>

              {/* Title & Rule Explanation */}
              <div style={{ textAlign: 'center', maxWidth: 420 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: '#F8FAFC',
                    marginBottom: 12,
                  }}
                >
                  {AUTHORIZED_CONTENT.shot03.c2Title.text}
                </div>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#94A3B8',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {AUTHORIZED_CONTENT.shot03.c2Summary.text}
                </p>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* ZONE 3 (Left): 6 ORBITING ARTICLES CONSTELLATION     */}
            {/* ---------------------------------------------------- */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                opacity: c3Entrance,
                transform: `scale(${c3Settle.scale}) translateY(${c3Settle.translateY}px)`,
              }}
            >
              {/* Milestone Tag */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#F59E0B',
                  letterSpacing: 1,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, backgroundColor: '#F59E0B', transform: 'rotate(45deg)' }} />
                <span>{AUTHORIZED_CONTENT.shot03.c3Label.text}</span>
              </div>

              {/* 6 Hexagonal Facets Constellation (Stabilized Orientation) */}
              <div
                style={{
                  width: 180,
                  height: 130,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                {/* Central Key Count "۶" */}
                <div
                  style={{
                    position: 'absolute',
                    fontSize: 68,
                    fontWeight: 900,
                    color: '#F59E0B',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  ۶
                </div>

                {/* 6 Hexagonal Nodes (Crisp Static Angles) */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (i * 60) * (Math.PI / 180);
                  const radius = 50 * c3ConstellationProgress;
                  const nx = Math.cos(angle) * radius;
                  const ny = Math.sin(angle) * radius;
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${nx}px)`,
                        top: `calc(50% + ${ny}px)`,
                        transform: 'translate(-50%, -50%)',
                        width: 12,
                        height: 12,
                        backgroundColor: '#F59E0B',
                        borderRadius: 2,
                        boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
                      }}
                    />
                  );
                })}
              </div>

              {/* Title & Rule Explanation */}
              <div style={{ textAlign: 'center', maxWidth: 420 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: '#F8FAFC',
                    marginBottom: 12,
                  }}
                >
                  {AUTHORIZED_CONTENT.shot03.c3Title.text}
                </div>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#94A3B8',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {AUTHORIZED_CONTENT.shot03.c3Summary.text}
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* T3 CARRY TRANSITION: COLLAPSE TO HORIZONTAL DATUM LINE   */}
          {/* ======================================================== */}
          {localFrame >= 825 && (
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: `translate(-50%, -50%) scaleX(${t3Collapse.scaleX}) scaleY(${t3Collapse.scaleY})`,
                width: 1800,
                height: 4,
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 24px rgba(56, 189, 248, 0.9)',
                opacity: t3Collapse.lineOpacity,
              }}
            />
          )}
        </AbsoluteFill>
      </CameraGrammarRig>
    </AbsoluteFill>
  );
};
