import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';
import { executeSymmetricFission } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 02 — THE OFFICIAL STATUTE DECREE MONOLITH (V20 STABLE)
 * V20 Motion Stability: Settle-locked legal seal, stable typography,
 * continuous T1 intake, and true T2 symmetric fission handoff.
 * Frame Range: 350 - 650 (Global) / 0 - 300 (Local)
 */
export const Shot02_DecreeV19: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 350;

  // Prosodic speech modulation (rim lighting only, no geometric scale jitter)
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. T1 Intake: Seamless continuity from Shot 01's rotational sweep
  // Divider is already docked at right: 560 with height 940px
  const dividerHeight = 940;

  // 2. Official Seal Collision Lock at local f = 45 (global f = 395)
  // Settles into hard lock by frame 65 (Zero Jitter)
  const sealSettle = calculateSettleLock(localFrame, 45, {
    anticipationFrames: 14,
    settleFrames: 18,
    scalePeak: 1.15,
  });
  const ripple = calculateRipple(localFrame, 45, 40, 260);

  // 3. Typographic Headline Unroll (40 - 75f)
  const headlineProgress = interpolate(localFrame, [40, 75], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Source Decree Line Unroll (75 - 115f)
  const sourceProgress = interpolate(localFrame, [75, 115], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Pathway Summary Unroll (115 - 165f)
  const pathProgress = interpolate(localFrame, [115, 165], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 6. T2 Symmetric Fission Handoff into Shot 03 (local 270 - 300f)
  // Single vertical divider splits into 3 harmonic vertical vectors:
  // right: 640 (Zone 1), right: 1200 (Zone 2), right: 1760 (Zone 3)
  const fission = executeSymmetricFission(localFrame, 270, 300);
  const isFissionActive = localFrame >= 270;

  // Fade out text gently during fission handoff, but KEEP the 3 lines active
  const contentFadeOut = interpolate(localFrame, [275, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Full-Canvas Editorial Atmosphere */}
      <CanvasAtmosphereV19 mood="gold" intensity={1.05} />

      {/* Motivated Camera Tracking */}
      <CameraGrammarRig mode="slow-dolly" durationInFrames={300} intensity={1.0}>
        <AbsoluteFill
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
          }}
        >
          {/* ======================================================== */}
          {/* ASYMMETRICAL EDITORIAL ARCHITECTURE: MONOLITHIC AXIS     */}
          {/* ======================================================== */}
          {!isFissionActive ? (
            /* Unified Authoritative Vertical Divider at x = 560 */
            <div
              style={{
                position: 'absolute',
                top: 70,
                right: 560,
                width: 2.5,
                height: dividerHeight,
                backgroundColor: '#D4AF37',
                boxShadow: `0 0 16px rgba(212, 175, 55, ${prosodicRim * 0.6})`,
              }}
            >
              {/* Architectural Ticks along the divider */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: -8,
                  width: 18,
                  height: 2,
                  backgroundColor: '#D4AF37',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: -8,
                  width: 18,
                  height: 2,
                  backgroundColor: '#D4AF37',
                }}
              />
            </div>
          ) : (
            /* T2 SYMMETRIC FISSION: Splitting into 3 Harmonic Axes */
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 70,
                  right: fission.axis1Right,
                  width: 2,
                  height: 940,
                  backgroundColor: '#D4AF37',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.6)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 70,
                  right: fission.axis2Right,
                  width: 2,
                  height: 940,
                  backgroundColor: '#D4AF37',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.6)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 70,
                  right: fission.axis3Right,
                  width: 2,
                  height: 940,
                  backgroundColor: '#D4AF37',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.6)',
                }}
              />
            </>
          )}

          {/* ======================================================== */}
          {/* RIGHT FLANK (x: 0 to 560): THE OFFICIAL LEGAL SEAL       */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 180,
              transform: `translate(0, -50%) scale(${sealSettle.scale}) translateY(${sealSettle.translateY}px)`,
              opacity: contentFadeOut,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Geometric Octagonal Monolith Crest */}
            <div
              style={{
                position: 'relative',
                width: 200,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer Architectural Wireframe (Stabilized Orientation) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1.5px dashed rgba(212, 175, 55, 0.5)',
                  borderRadius: '50%',
                  transform: 'rotate(45deg)',
                }}
              />

              {/* Inner Solid Gold Medallion */}
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #F59E0B 0%, #D4AF37 60%, #92400E 100%)',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    color: '#07090E',
                    letterSpacing: '-0.02em',
                  }}
                >
                  ماده ۲
                </span>
              </div>

              {/* Collision Ripple Wave */}
              {ripple.active && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: ripple.radius * 2,
                    height: ripple.radius * 2,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    border: '2px solid #D4AF37',
                    opacity: ripple.opacity,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* Seal Annotation Subtitle */}
            <span
              style={{
                marginTop: 20,
                fontSize: 18,
                fontWeight: 700,
                color: '#D4AF37',
                letterSpacing: 1,
              }}
            >
              سند رسمی ابلاغی
            </span>
          </div>

          {/* ======================================================== */}
          {/* LEFT FLANK (x: 620 to 1840): EDITORIAL STATUTORY SPREAD  */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: 140,
              right: 640,
              left: 100,
              bottom: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              opacity: contentFadeOut,
            }}
          >
            {/* Editorial Category Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
                opacity: headlineProgress,
              }}
            >
              <div style={{ width: 10, height: 10, backgroundColor: '#D4AF37', transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#D4AF37' }}>
                چارچوب قانونی ارزیابی نخبگان
              </span>
            </div>

            {/* STATUTORY HEADLINE: «دستورالعمل بند کاف، ماده دو» */}
            <div
              style={{
                opacity: headlineProgress,
                transform: `translateX(${(1 - headlineProgress) * 40}px)`,
                marginBottom: 24,
              }}
            >
              <AutoFitText
                text={AUTHORIZED_CONTENT.shot02.statuteHeadline.text}
                maxFontSize={56}
                minFontSize={36}
                color="#FFFFFF"
                dir="rtl"
                style={{
                  fontWeight: 900,
                  lineHeight: 1.3,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                }}
              />
            </div>

            {/* MINISTERIAL REGULATION SOURCE: «آیین‌نامه استعدادهای درخشان وزارت بهداشت» */}
            <div
              style={{
                opacity: sourceProgress,
                transform: `translateX(${(1 - sourceProgress) * 30}px)`,
                marginBottom: 36,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{ width: 3, height: 28, backgroundColor: '#38BDF8' }} />
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#38BDF8',
                  lineHeight: 1.4,
                }}
              >
                {AUTHORIZED_CONTENT.shot02.decreeSource.text}
              </span>
            </div>

            {/* CORE PATH SUMMARY: «مسیر جامع امتیازدهی به فعالیت‌های علمی و پژوهشی» */}
            <div
              style={{
                opacity: pathProgress,
                transform: `translateY(${(1 - pathProgress) * 24}px)`,
                maxWidth: 1000,
              }}
            >
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  color: '#E2E8F0',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {AUTHORIZED_CONTENT.shot02.decreePathSummary.text}
              </p>
            </div>
          </div>
        </AbsoluteFill>
      </CameraGrammarRig>
    </AbsoluteFill>
  );
};
