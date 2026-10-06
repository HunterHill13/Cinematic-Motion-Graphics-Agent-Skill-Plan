import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { executeTextMaskReveal } from '../../../../src/motion/recipes/TextMaskRevealRecipe';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & MASTER OUTRO (V19)
 * True Motion Graphics Transformation: Singularity Detonation → Radial Rays → Heraldic Seal Assembly
 * Replaces the small static medal with a full-canvas broadcast-grade closing identity.
 * Frame Range: 2155 - 2361 (Global) / 0 - 206 (Local)
 */
export const Shot06_OutroV19: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 2155;
  const fps = 30;

  // Prosodic speech modulation
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Singularity Detonation & Radial Ray Burst (0 - 40f)
  // Explodes outward, then snaps inward to form the crest
  const burstExpansion = interpolate(localFrame, [0, 20], [0.05, 1.4], {
    easing: Easing.bezier(0.1, 1, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const crestAssemblyProgress = interpolate(localFrame, [20, 42], [1.4, 1.0], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const crestEffectiveScale = localFrame < 20 ? burstExpansion : crestAssemblyProgress;

  // 2. Collision Lock on Frame 40 (global 2195)
  const crestCollision = calculateCollision(localFrame, 40, {
    reboundAmplitude: 14,
    decay: 0.24,
    maxSquash: 0.16,
  });
  const ripple = calculateRipple(localFrame, 40, 50, 360);
  const crestSecondary = calculateCausalSecondaryReaction(localFrame, 40, 4, 24);

  // 3. Typographic Reveals
  // Institutional Title Strike (45 - 80f)
  const titleProgress = interpolate(localFrame, [45, 80], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Continuation Subtitle Reveal (85 - 130f)
  const subtitleReveal = executeTextMaskReveal(localFrame, 85, fps, 'bottom-to-top', true);

  // Final Call to Action Reveal (135 - 175f)
  const ctaReveal = executeTextMaskReveal(localFrame, 135, fps, 'bottom-to-top', true);

  // 4. Continuous Living Idle Motion (Rotation and Breath)
  const ringRotation = (localFrame * 0.25) % 360;
  const breathing = calculateIdleBreathing(localFrame, 0.28, 0.008);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Full-Canvas Editorial Atmosphere (Golden Radiance) */}
      <CanvasAtmosphereV19 mood="gold" intensity={1.15} />

      {/* Majestic Pull Camera Rig */}
      <CameraGrammarRig mode="micro-pull" durationInFrames={206} intensity={1.05}>
        <AbsoluteFill
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
          }}
        >
          {/* ======================================================== */}
          {/* RADIAL GEOMETRIC RAYS & ORBITAL ARCS (0 - 45f Detonation)*/}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              height: 500,
              pointerEvents: 'none',
            }}
          >
            {/* 12 Radiating Geometric Construction Rays */}
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30 + ringRotation;
              const rayLength = interpolate(localFrame, [0, 25, 45], [20, 240, 130], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const rayOpacity = interpolate(localFrame, [0, 25, 55], [0.8, 1, 0.25], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: rayLength,
                    height: 1.5,
                    backgroundColor: '#D4AF37',
                    opacity: rayOpacity,
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: '0% 50%',
                  }}
                />
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* MONUMENTAL HERALDIC INSTITUTIONAL CREST (Assembly)       */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${crestEffectiveScale * crestCollision.squashScaleX * breathing.scale * (1 + (crestSecondary.expansionScale - 1) * 0.4)}) translateY(${crestCollision.displacementY}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Outer Laurel / Architectural Ring */}
            <div
              style={{
                position: 'relative',
                width: 260,
                height: 260,
                borderRadius: '50%',
                border: '2px solid rgba(212, 175, 55, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 40px rgba(212, 175, 55, ${0.4 * prosodicRim})`,
              }}
            >
              {/* Concentric Dashed Compass Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 12,
                  borderRadius: '50%',
                  border: '1.5px dashed #D4AF37',
                  transform: `rotate(${ringRotation * -1}deg)`,
                }}
              />

              {/* Core Solid Gold Medallion */}
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #FBBF24 0%, #D4AF37 55%, #78350F 100%)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 2px 6px rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Eight-Pointed Star Geometric Emblem */}
                <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
                  {/* Square 1 */}
                  <rect x="22" y="22" width="56" height="56" fill="#07090E" rx="4" />
                  {/* Square 2 (Rotated 45deg) */}
                  <rect
                    x="22"
                    y="22"
                    width="56"
                    height="56"
                    fill="#07090E"
                    rx="4"
                    transform="rotate(45 50 50)"
                  />
                  {/* Center Golden Core */}
                  <circle cx="50" cy="50" r="16" fill="#D4AF37" />
                  <circle cx="50" cy="50" r="10" fill="#FDE047" />
                </svg>
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
          </div>

          {/* ======================================================== */}
          {/* HERO INSTITUTIONAL TYPOGRAPHY RESOLUTION                  */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '52%',
              right: 120,
              left: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Master Institutional Title */}
            <div
              style={{
                opacity: titleProgress,
                transform: `scale(${interpolate(titleProgress, [0, 1], [0.92, 1])}) translateY(${(1 - titleProgress) * 24}px)`,
                marginBottom: 20,
                width: '100%',
              }}
            >
              <AutoFitText
                text={AUTHORIZED_CONTENT.shot06.institutionTitle.text}
                maxFontSize={48}
                minFontSize={30}
                color="#FFFFFF"
                textAlign="center"
                dir="rtl"
                style={{
                  fontWeight: 900,
                  textShadow: `0 0 30px rgba(212, 175, 55, ${prosodicRim * 0.6}), 0 4px 20px rgba(0, 0, 0, 0.9)`,
                }}
              />
            </div>

            {/* Continuation Promise Subtitle */}
            <div
              style={{
                clipPath: subtitleReveal.clipPath,
                transform: `translateY(${subtitleReveal.translateY}px)`,
                opacity: subtitleReveal.opacity,
                marginBottom: 28,
                maxWidth: 1100,
              }}
            >
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#CBD5E1',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {AUTHORIZED_CONTENT.shot06.continuationSubtitle.text}
              </p>
            </div>

            {/* Concluding Call to Action */}
            <div
              style={{
                clipPath: ctaReveal.clipPath,
                transform: `translateY(${ctaReveal.translateY}px)`,
                opacity: ctaReveal.opacity,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div style={{ width: 40, height: 2, backgroundColor: '#D4AF37' }} />
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: '#D4AF37',
                  letterSpacing: '-0.01em',
                }}
              >
                {AUTHORIZED_CONTENT.shot06.callToAction.text}
              </span>
              <div style={{ width: 40, height: 2, backgroundColor: '#D4AF37' }} />
            </div>
          </div>
        </AbsoluteFill>
      </CameraGrammarRig>
    </AbsoluteFill>
  );
};
