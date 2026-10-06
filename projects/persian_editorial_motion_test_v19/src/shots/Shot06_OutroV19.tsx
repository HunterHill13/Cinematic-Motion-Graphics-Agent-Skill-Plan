import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { executeTextMaskReveal } from '../../../../src/motion/recipes/TextMaskRevealRecipe';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';
import { InstitutionalEndCard } from '../../../../src/branding/InstitutionalLogos';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & MASTER OUTRO (V21 CHOREOGRAPHY 2.0)
 * V21 Choreography: Singularity detonation, canonical «بقیه‌الله» pronunciation lock,
 * and Unified Institutional End Card (University + Student Research Committee).
 * Frame Range: 2155 - 2361 (Global) / 0 - 206 (Local)
 */
export const Shot06_OutroV19: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 2155;
  const fps = 30;

  // Prosodic speech modulation (rim lighting only, no geometric scale jitter)
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Singularity Detonation from incoming Shot 05 node (0 - 20f)
  // Explodes outward from 0.05 to 1.3
  const burstExpansion = interpolate(localFrame, [0, 20], [0.05, 1.3], {
    easing: Easing.bezier(0.1, 1, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Collision Lock & DETERMINISTIC SETTLE LOCK on Frame 40 (global 2195)
  // Settles into hard lock by frame 60 (Zero Jitter)
  const crestSettle = calculateSettleLock(localFrame, 40, {
    anticipationFrames: 14,
    settleFrames: 20,
    scalePeak: 1.15,
  });
  const ripple = calculateRipple(localFrame, 40, 50, 360);

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

  // Transition to Final Institutional End Card (125 - 206f)
  const outroContentFade = interpolate(localFrame, [120, 135], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Full-Canvas Editorial Atmosphere (Golden Radiance) */}
      <CanvasAtmosphereV19 mood="gold" intensity={1.15} />

      {/* Majestic Pull Camera Rig with Settle Lock on Frame 150 for Final End Card */}
      <CameraGrammarRig
        mode="micro-pull"
        durationInFrames={206}
        intensity={1.05}
        settleFrame={150}
      >
        <AbsoluteFill
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
          }}
        >
          {/* ======================================================== */}
          {/* PHASE 1: NARRATIVE OUTRO RESOLUTION (0 - 130f)           */}
          {/* ======================================================== */}
          {localFrame < 135 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: outroContentFade,
              }}
            >
              {/* Radial Geometric Construction Rays (0 - 45f Detonation) */}
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
                {Array.from({ length: 12 }).map((_, i) => {
                  const deg = i * 30;
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

              {/* Monumental Heraldic Institutional Crest */}
              <div
                style={{
                  position: 'absolute',
                  top: '32%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${localFrame < 20 ? burstExpansion : crestSettle.scale}) translateY(${localFrame < 20 ? 0 : crestSettle.translateY}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
                  <div
                    style={{
                      position: 'absolute',
                      inset: 12,
                      borderRadius: '50%',
                      border: '1.5px dashed #D4AF37',
                      transform: 'rotate(-45deg)',
                    }}
                  />
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
                    <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
                      <rect x="22" y="22" width="56" height="56" fill="#07090E" rx="4" />
                      <rect
                        x="22"
                        y="22"
                        width="56"
                        height="56"
                        fill="#07090E"
                        rx="4"
                        transform="rotate(45 50 50)"
                      />
                      <circle cx="50" cy="50" r="16" fill="#D4AF37" />
                      <circle cx="50" cy="50" r="10" fill="#FDE047" />
                    </svg>
                  </div>
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

              {/* Master Institutional Typography Resolution */}
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
            </div>
          )}

          {/* ======================================================== */}
          {/* PHASE 2: UNIFIED INSTITUTIONAL END CARD (125 - 206f)     */}
          {/* Settle-locked from frame 150 - 206 (2.5s absolute hold)   */}
          {/* ======================================================== */}
          <InstitutionalEndCard startFrame={125} settleFrame={150} />
        </AbsoluteFill>
      </CameraGrammarRig>
    </AbsoluteFill>
  );
};
