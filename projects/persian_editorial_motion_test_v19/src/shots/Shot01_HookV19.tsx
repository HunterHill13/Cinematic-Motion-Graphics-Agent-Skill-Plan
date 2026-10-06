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
import { executeKineticUnderlineHandoff } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 01 — THE EDITORIAL HOOK & CORE QUESTION (V19)
 * True Motion Graphics Transformation: Time-Based Graphic Choreography
 * Replaces centered isolated text with full-canvas architectural staging.
 * Frame Range: 0 - 380 (12.67s @ 30 FPS)
 */
export const Shot01_HookV19: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Spoken Prosody Dual-Clock state
  const prosodic = evaluateProsodicState(frame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Initial Architectural Grid Horizon (0 - 45f)
  const horizonUnroll = interpolate(frame, [0, 25], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Attribution Header Reveal (15 - 45f)
  const introMask = executeTextMaskReveal(frame, 15, fps, 'bottom-to-top', true);

  // 3. Sequential Transition out of Attribution (140 - 170f)
  const attributionExitProgress = interpolate(frame, [140, 168], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.84, 0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const attributionVisible = frame < 170;

  // 4. Central Question Lead Arrival (172 - 210f)
  const questionLeadProgress = interpolate(frame, [172, 205], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Hero Keyword Strike & Seismic Impact on frame 234
  const heroStrikeFrame = 234;
  const heroStrike = calculateKeywordStrike(frame, heroStrikeFrame, {
    anticipationFrames: 8,
    settleFrames: 16,
    scalePeak: 1.15,
  });

  // Causal Secondary Reaction along the coordinate datum
  const secondaryReaction = calculateCausalSecondaryReaction(frame, heroStrikeFrame, 4, 22);

  // 6. Question Suffix Entrance (250 - 280f)
  const suffixProgress = interpolate(frame, [250, 280], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 7. Living Idle Breath (Never frozen)
  const breathing = calculateIdleBreathing(frame, 0.3, 0.008);

  // 8. T1 Carry Transition: Accelerating Golden Structural Beam (350 - 380f)
  const carryT1 = executeKineticUnderlineHandoff(frame, 350, 380, {
    startX: 140,
    endX: 1960,
    initialWidth: 1640,
    terminalWidth: 1920,
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Layer 0: Full-Canvas Editorial Atmosphere */}
      <CanvasAtmosphereV19 mood="gold" intensity={1.0} />

      {/* Layer 1: Motivated Camera Movement (Glide Push + Subtle Diagonal Angle) */}
      <CameraGrammarRig mode="micro-push" durationInFrames={380} intensity={1.1}>
        <AbsoluteFill
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
          }}
        >
          {/* ======================================================== */}
          {/* ARCHITECTURAL HORIZON DATUM (Full-bleed active line)      */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: 80,
              right: 80,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.3)',
              transform: `scaleX(${horizonUnroll})`,
              transformOrigin: 'right center',
            }}
          >
            {/* Left & Right Coordinate Tick Markers */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: -6,
                width: 2,
                height: 14,
                backgroundColor: '#D4AF37',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: -6,
                width: 2,
                height: 14,
                backgroundColor: '#D4AF37',
              }}
            />
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: INSTITUTIONAL ATTRIBUTION (0 - 170f)          */}
          {/* ======================================================== */}
          {attributionVisible && (
            <div
              style={{
                position: 'absolute',
                top: '44%',
                left: 120,
                right: 120,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 1 - attributionExitProgress,
                transform: `translateY(${attributionExitProgress * -30}px) scale(${1 - attributionExitProgress * 0.05})`,
              }}
            >
              <div
                style={{
                  clipPath: introMask.clipPath,
                  transform: `translateY(${introMask.translateY}px)`,
                  opacity: introMask.opacity,
                  width: '100%',
                }}
              >
                {/* Asymmetrical Badge / Lead Line */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ width: 40, height: 1.5, backgroundColor: '#D4AF37' }} />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#D4AF37',
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                    }}
                  >
                    اطلاعیه رسمی دانشگاهی
                  </span>
                  <div style={{ width: 40, height: 1.5, backgroundColor: '#D4AF37' }} />
                </div>

                {/* Hero Institutional Title */}
                <AutoFitText
                  text={AUTHORIZED_CONTENT.shot01.introPresenter.text}
                  maxFontSize={42}
                  minFontSize={28}
                  color="#F8FAFC"
                  textAlign="center"
                  dir="rtl"
                  style={{
                    fontWeight: 900,
                    lineHeight: 1.5,
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.8)',
                  }}
                />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 2: CENTRAL QUESTION & HERO IMPACT (170 - 380f)   */}
          {/* ======================================================== */}
          {frame >= 170 && (
            <div
              style={{
                position: 'absolute',
                top: '24%',
                left: 100,
                right: 100,
                bottom: '18%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Question Lead Line */}
              <div
                style={{
                  opacity: questionLeadProgress,
                  transform: `translateY(${(1 - questionLeadProgress) * 24}px)`,
                  marginBottom: 20,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 600,
                    color: '#94A3B8',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {AUTHORIZED_CONTENT.shot01.hookQuestionLead.text}
                </span>
              </div>

              {/* MONUMENTAL HERO TITLE WITH KEYWORD STRIKE (f234) */}
              {frame >= heroStrikeFrame - 8 && (
                <div
                  style={{
                    width: '100%',
                    transform: `scale(${heroStrike.scale * (1 + (secondaryReaction.expansionScale - 1) * 0.4) * breathing.scale * prosodicScale}) translateY(${heroStrike.translateY}px)`,
                    opacity: heroStrike.opacity,
                    textAlign: 'center',
                    marginBottom: 28,
                  }}
                >
                  <AutoFitText
                    text={AUTHORIZED_CONTENT.shot01.heroTitle.text}
                    maxFontSize={66}
                    minFontSize={38}
                    color="#FFFFFF"
                    textAlign="center"
                    dir="rtl"
                    style={{
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      textShadow: `0 0 32px rgba(212, 175, 55, ${prosodicRim * 0.5}), 0 8px 30px rgba(0, 0, 0, 0.9)`,
                    }}
                  />
                </div>
              )}

              {/* Question Suffix Resolution */}
              {frame >= 248 && (
                <div
                  style={{
                    opacity: suffixProgress,
                    transform: `translateY(${(1 - suffixProgress) * 20}px)`,
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 500,
                      color: '#E2E8F0',
                      lineHeight: 1.6,
                    }}
                  >
                    {AUTHORIZED_CONTENT.shot01.hookQuestionSuffix.text}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* SEISMIC IMPACT RIPPLE ALONG THE HORIZON (f234)           */}
          {/* ======================================================== */}
          {frame >= 234 && frame <= 270 && (
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: (frame - 234) * 45,
                height: 4,
                backgroundColor: '#D4AF37',
                opacity: Math.max(0, 1 - (frame - 234) / 36),
                borderRadius: 2,
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.8)',
              }}
            />
          )}

          {/* ======================================================== */}
          {/* T1 CARRY TRANSITION: ACCELERATING STRUCTURAL BEAM        */}
          {/* ======================================================== */}
          {frame >= 345 && (
            <div
              style={{
                position: 'absolute',
                left: carryT1.x,
                top: '52%',
                width: carryT1.width,
                height: 5,
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 24px rgba(212, 175, 55, 0.9)',
                borderRadius: 3,
                opacity: carryT1.opacity,
              }}
            />
          )}
        </AbsoluteFill>
      </CameraGrammarRig>
    </AbsoluteFill>
  );
};
