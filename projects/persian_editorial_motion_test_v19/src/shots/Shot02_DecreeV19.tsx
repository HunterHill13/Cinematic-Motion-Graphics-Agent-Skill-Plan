import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * SHOT 02 — THE OFFICIAL STATUTE DECREE MONOLITH (V19)
 * True Motion Graphics Transformation: Asymmetrical Editorial Broadside
 * Replaces the web card box with full-frame architectural editorial layout.
 * Frame Range: 350 - 650 (Global) / 0 - 300 (Local)
 */
export const Shot02_DecreeV19: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 350;

  // Prosodic speech modulation
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. T1 Intake: Incoming beam locks as an architectural vertical divider (local 0 - 35f)
  const dividerHeight = interpolate(localFrame, [0, 30], [0, 940], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Official Seal Collision Lock at local f = 45 (global f = 395)
  const sealCollision = calculateCollision(localFrame, 45, {
    reboundAmplitude: 12,
    decay: 0.22,
    maxSquash: 0.16,
  });
  const sealScale = interpolate(localFrame, [10, 45], [0.2, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ripple = calculateRipple(localFrame, 45, 40, 260);
  const sealSecondary = calculateCausalSecondaryReaction(localFrame, 45, 4, 24);

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

  // 6. Living Idle Motion (continuous rotation & breath)
  const sealRotation = (localFrame * 0.2) % 360;
  const breathing = calculateIdleBreathing(localFrame, 0.32, 0.008);

  // 7. T2 Symmetric Fission Handoff into Shot 03 (local 270 - 300f)
  // The single divider splits into 3 harmonic vertical vectors
  const fissionProgress = interpolate(localFrame, [270, 300], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const isFissionActive = localFrame >= 270;

  // Split positions: center (560), left (340), right (1580), center target (960)
  const axisLeftX = interpolate(fissionProgress, [0, 1], [560, 340]);
  const axisCenterX = interpolate(fissionProgress, [0, 1], [560, 960]);
  const axisRightX = interpolate(fissionProgress, [0, 1], [560, 1580]);

  // Overall shot fade out during fission handoff
  const contentFadeOut = interpolate(localFrame, [280, 300], [1, 0.1], {
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
                  right: axisLeftX,
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
                  right: axisCenterX,
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
                  right: axisRightX,
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
              transform: `translate(0, -50%) scale(${sealScale * sealCollision.squashScaleX * breathing.scale * (1 + (sealSecondary.expansionScale - 1) * 0.5)}) translateY(${sealCollision.displacementY}px)`,
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
              {/* Outer Rotating Architectural Wireframe */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1.5px dashed rgba(212, 175, 55, 0.5)',
                  borderRadius: '50%',
                  transform: `rotate(${sealRotation}deg)`,
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
