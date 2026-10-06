import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { executeTextMaskReveal } from '../../../../src/motion/recipes/TextMaskRevealRecipe';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';
import { executeGravitationalSingularity } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 05 — ACADEMIC DEGREE SCORE THRESHOLDS (V19)
 * True Motion Graphics Transformation: Single Evolving Sculptural Ascendance (65 → 110 → 130)
 * HARD BAN on Dashboard Bar Charts! A monumental typographic hierarchy with dynamic summit vectors.
 * Frame Range: 1700 - 2185 (Global) / 0 - 485 (Local)
 */
export const Shot05_ThresholdsV19: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 1700;
  const fps = 30;

  // Prosodic speech modulation
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Header Title Reveal (0 - 35f)
  const headerReveal = executeTextMaskReveal(localFrame, 10, fps, 'bottom-to-top', true);

  // 2. Progressive Monolith Elevations & Numeric Strikes
  // -------------------------------------------------------------
  // TIER 1: BACHELOR (۶۵) at local f = 160
  // -------------------------------------------------------------
  const t1Rise = interpolate(localFrame, [40, 120], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t1Counter = interpolate(localFrame, [70, 160], [0, 65], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t1Strike = calculateKeywordStrike(localFrame, 160, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.15,
  });
  const t1Secondary = calculateCausalSecondaryReaction(localFrame, 160, 4, 22);

  // -------------------------------------------------------------
  // TIER 2: GENERAL MEDICINE (۱۱۰) at local f = 290
  // -------------------------------------------------------------
  const t2Rise = interpolate(localFrame, [160, 240], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t2Counter = interpolate(localFrame, [190, 290], [0, 110], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t2Strike = calculateKeywordStrike(localFrame, 290, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.16,
  });
  const t2Secondary = calculateCausalSecondaryReaction(localFrame, 290, 4, 22);

  // -------------------------------------------------------------
  // TIER 3: PHD / SPECIALTY (۱۳۰) at local f = 390
  // -------------------------------------------------------------
  const t3Rise = interpolate(localFrame, [280, 360], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t3Counter = interpolate(localFrame, [310, 390], [0, 130], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t3Strike = calculateKeywordStrike(localFrame, 390, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.18,
  });
  const t3Secondary = calculateCausalSecondaryReaction(localFrame, 390, 4, 22);

  // 3. Connecting Summit Vector (Draws across summits: 65 -> 110 -> 130)
  const summitVectorProgress = interpolate(localFrame, [360, 420], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Living Idle Breathing (continuous life)
  const breathing = calculateIdleBreathing(localFrame, 0.3, 0.008);

  // 5. T5 Carry Transition: Gravitational Singularity (local 450 - 485f)
  const t5Singularity = executeGravitationalSingularity(localFrame, 450, 485);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Full-Canvas Editorial Atmosphere */}
      <CanvasAtmosphereV19 mood="gold" intensity={1.1} />

      {/* Ascending Camera Crane Movement */}
      <CameraGrammarRig mode="continuous" durationInFrames={485} intensity={1.1}>
        <AbsoluteFill
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
          }}
        >
          {/* ======================================================== */}
          {/* SECTION HEADER FRIEZE                                    */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: 55,
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
                حداقل امتیازات لازم بر حسب مقطع
              </span>
              <div style={{ width: 40, height: 2, backgroundColor: '#D4AF37' }} />
            </div>

            <AutoFitText
              text={AUTHORIZED_CONTENT.shot05.sectionTitle.text}
              maxFontSize={44}
              minFontSize={28}
              color="#F8FAFC"
              textAlign="center"
              dir="rtl"
              style={{ fontWeight: 900 }}
            />
          </div>

          {/* ======================================================== */}
          {/* SINGLE EVOLVING MONUMENTAL ARCHITECTURE (65 → 110 → 130) */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              right: 120,
              left: 120,
              height: 700,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              transform:
                localFrame >= 450
                  ? `scale(${t5Singularity.scale})`
                  : undefined,
              opacity: localFrame >= 450 ? t5Singularity.opacity : 1,
            }}
          >
            {/* SVG Connecting Summit Ascendance Line */}
            {localFrame >= 360 && (
              <svg
                width="1680"
                height="700"
                viewBox="0 0 1680 700"
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                }}
              >
                {/* Diagonal line connecting summits: x1=1440, y1=480 (Bachelor); x2=840, y2=330 (Medicine); x3=240, y3=180 (PhD) */}
                <path
                  d="M 1440 480 L 840 330 L 240 180"
                  stroke="#D4AF37"
                  strokeWidth="3.5"
                  strokeDasharray="1400"
                  strokeDashoffset={1400 * (1 - summitVectorProgress)}
                  fill="none"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.8))',
                  }}
                />
              </svg>
            )}

            {/* ---------------------------------------------------- */}
            {/* MONOLITH 1: BACHELOR (۶۵ امتیاز)                     */}
            {/* ---------------------------------------------------- */}
            <div
              style={{
                width: 440,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${t1Strike.scale * breathing.scale * (1 + (t1Secondary.expansionScale - 1) * 0.4)})`,
              }}
            >
              {/* Monumental Numeral "۶۵" */}
              <div
                style={{
                  fontSize: 82,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  marginBottom: 12,
                  textShadow: `0 0 24px rgba(212, 175, 55, ${prosodicRim * 0.5})`,
                }}
              >
                {Math.round(t1Counter).toLocaleString('fa-IR')}
                <span style={{ fontSize: 24, fontWeight: 700, color: '#D4AF37', marginRight: 8 }}>
                  {AUTHORIZED_CONTENT.shot05.tier1Unit.text}
                </span>
              </div>

              {/* Degree Title */}
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#CBD5E1',
                  marginBottom: 20,
                }}
              >
                {AUTHORIZED_CONTENT.shot05.tier1Degree.text}
              </div>

              {/* Sculptural Architectural Pillar (Height: 220px) */}
              <div
                style={{
                  width: '100%',
                  height: t1Rise * 220,
                  background: 'linear-gradient(180deg, #1E293B 0%, #0B1120 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.4)',
                  borderBottom: 'none',
                  borderRadius: '16px 16px 0 0',
                  boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.6)',
                  position: 'relative',
                }}
              >
                {/* Luminous Top Crown Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    height: 4,
                    backgroundColor: '#D4AF37',
                    borderRadius: '16px 16px 0 0',
                  }}
                />
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* MONOLITH 2: GENERAL MEDICINE (۱۱۰ امتیاز)            */}
            {/* ---------------------------------------------------- */}
            <div
              style={{
                width: 440,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${t2Strike.scale * breathing.scale * (1 + (t2Secondary.expansionScale - 1) * 0.4)})`,
              }}
            >
              {/* Monumental Numeral "۱۱۰" */}
              <div
                style={{
                  fontSize: 94,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  marginBottom: 12,
                  textShadow: `0 0 28px rgba(212, 175, 55, ${prosodicRim * 0.6})`,
                }}
              >
                {Math.round(t2Counter).toLocaleString('fa-IR')}
                <span style={{ fontSize: 26, fontWeight: 700, color: '#D4AF37', marginRight: 8 }}>
                  {AUTHORIZED_CONTENT.shot05.tier2Unit.text}
                </span>
              </div>

              {/* Degree Title */}
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: '#CBD5E1',
                  marginBottom: 20,
                }}
              >
                {AUTHORIZED_CONTENT.shot05.tier2Degree.text}
              </div>

              {/* Sculptural Architectural Pillar (Height: 370px) */}
              <div
                style={{
                  width: '100%',
                  height: t2Rise * 370,
                  background: 'linear-gradient(180deg, #1E293B 0%, #0B1120 100%)',
                  border: '1.5px solid rgba(212, 175, 55, 0.5)',
                  borderBottom: 'none',
                  borderRadius: '16px 16px 0 0',
                  boxShadow: '0 -4px 36px rgba(0, 0, 0, 0.7)',
                  position: 'relative',
                }}
              >
                {/* Luminous Top Crown Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    height: 4,
                    backgroundColor: '#D4AF37',
                    borderRadius: '16px 16px 0 0',
                  }}
                />
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* MONOLITH 3: PHD / SPECIALTY (۱۳۰ امتیاز)             */}
            {/* ---------------------------------------------------- */}
            <div
              style={{
                width: 440,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${t3Strike.scale * breathing.scale * (1 + (t3Secondary.expansionScale - 1) * 0.4)})`,
              }}
            >
              {/* Colossal Numeral "۱۳۰" */}
              <div
                style={{
                  fontSize: 106,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  marginBottom: 12,
                  textShadow: `0 0 36px rgba(212, 175, 55, ${prosodicRim * 0.8})`,
                }}
              >
                {Math.round(t3Counter).toLocaleString('fa-IR')}
                <span style={{ fontSize: 28, fontWeight: 700, color: '#D4AF37', marginRight: 8 }}>
                  {AUTHORIZED_CONTENT.shot05.tier3Unit.text}
                </span>
              </div>

              {/* Degree Title */}
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#CBD5E1',
                  marginBottom: 20,
                }}
              >
                {AUTHORIZED_CONTENT.shot05.tier3Degree.text}
              </div>

              {/* Sculptural Architectural Pillar (Height: 520px) */}
              <div
                style={{
                  width: '100%',
                  height: t3Rise * 520,
                  background: 'linear-gradient(180deg, #334155 0%, #0F172A 100%)',
                  border: '2px solid #D4AF37',
                  borderBottom: 'none',
                  borderRadius: '16px 16px 0 0',
                  boxShadow: '0 -6px 48px rgba(212, 175, 55, 0.25)',
                  position: 'relative',
                }}
              >
                {/* Luminous Top Crown Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    height: 5,
                    backgroundColor: '#D4AF37',
                    borderRadius: '16px 16px 0 0',
                  }}
                />
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </CameraGrammarRig>
    </AbsoluteFill>
  );
};
