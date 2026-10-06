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
import { executePlanarStageFold } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 04 — TEMPORAL CUTOFF & LEGAL CALENDAR (V19)
 * True Motion Graphics Transformation: Full-Bleed Kinetic Horizon & Physical Monolith Collision
 * HARD BAN on Slider UI and Dashboard Cards! A physical temporal trajectory colliding with an immovable barrier.
 * Frame Range: 1450 - 1730 (Global) / 0 - 280 (Local)
 */
export const Shot04_TimeWindowV19: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 1450;
  const fps = 30;

  // Spoken Prosody Dual-Clock state
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Header Reveal (0 - 35f)
  const headerReveal = executeTextMaskReveal(localFrame, 10, fps, 'bottom-to-top', true);

  // 2. Full-Canvas Chronological Horizon Expansion (20 - 45f)
  const horizonWidth = interpolate(localFrame, [20, 45], [0, 1800], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. High-Velocity Kinetic Pulse Trajectory (35 - 125f)
  // Travels right-to-left from "دوران تحصیل" to Month 12 Cutoff
  const pulseProgress = interpolate(localFrame, [35, 125], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Physical Collision at local f = 125 (global f = 1575)
  const barrierCollision = calculateCollision(localFrame, 125, {
    reboundAmplitude: 16,
    decay: 0.24,
    maxSquash: 0.18,
  });
  const ripple = calculateRipple(localFrame, 125, 45, 280);
  const barrierSecondary = calculateCausalSecondaryReaction(localFrame, 125, 4, 24);

  // 5. Warning & Explanatory Text Reveals (135 - 175f)
  const warningProgress = interpolate(localFrame, [135, 175], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 6. Living Idle Breath
  const breathing = calculateIdleBreathing(localFrame, 0.3, 0.008);

  // 7. T4 Carry Transition: 3D Planar Stage Fold into Shot 05 (local 250 - 280f)
  const t4Fold = executePlanarStageFold(localFrame, 250, 280);

  // Collision screen shake (at f = 125 to 135)
  const screenShakeX =
    localFrame >= 125 && localFrame <= 135
      ? Math.sin((localFrame - 125) * Math.PI * 2) * (135 - localFrame) * 0.8
      : 0;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Full-Canvas Editorial Atmosphere (Crimson Tint for Deadline Urgency) */}
      <CanvasAtmosphereV19 mood="crimson" intensity={1.1} />

      {/* Motivated Camera Tracking */}
      <CameraGrammarRig mode="slow-dolly" durationInFrames={280} intensity={1.0}>
        <AbsoluteFill
          style={{
            direction: 'rtl',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
            transform: `translateX(${screenShakeX}px)`,
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
              <div style={{ width: 40, height: 2, backgroundColor: '#EF4444' }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#EF4444', letterSpacing: 2 }}>
                محدودیت زمانی قانونی
              </span>
              <div style={{ width: 40, height: 2, backgroundColor: '#EF4444' }} />
            </div>

            <AutoFitText
              text={AUTHORIZED_CONTENT.shot04.sectionTitle.text}
              maxFontSize={46}
              minFontSize={30}
              color="#F8FAFC"
              textAlign="center"
              dir="rtl"
              style={{ fontWeight: 900 }}
            />
          </div>

          {/* ======================================================== */}
          {/* MONUMENTAL CHRONOLOGICAL TRACK (Full-Bleed Across Canvas)*/}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              top: '46%',
              right: 100,
              left: 100,
              height: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transform:
                localFrame >= 250
                  ? `perspective(800px) rotateX(${t4Fold.rotateX}deg) translateY(${t4Fold.translateY}px)`
                  : undefined,
              opacity: localFrame >= 250 ? t4Fold.opacity : 1,
            }}
          >
            {/* Top Milestones Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              {/* Origin Epoch Milestone (Right Flank) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div style={{ width: 14, height: 14, backgroundColor: '#38BDF8', borderRadius: 2 }} />
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: '#38BDF8',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {AUTHORIZED_CONTENT.shot04.timelineStartPoint.text}
                </span>
              </div>

              {/* Target Cutoff Milestone Monolith (Left Flank) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  transform: `scale(${localFrame >= 125 ? barrierCollision.squashScaleX * (1 + (barrierSecondary.expansionScale - 1) * 0.4) : 1})`,
                }}
              >
                <div style={{ width: 14, height: 14, backgroundColor: '#EF4444', borderRadius: 2 }} />
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: '#EF4444',
                    letterSpacing: '-0.02em',
                    textShadow: `0 0 24px rgba(239, 68, 68, ${prosodicRim * 0.7})`,
                  }}
                >
                  {AUTHORIZED_CONTENT.shot04.timelineCutoffLabel.text}
                </span>
              </div>
            </div>

            {/* Base Chronological Rail Line */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              {/* Active Luminous Kinetic Path */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: `${pulseProgress * 100}%`,
                  height: 4,
                  backgroundColor: '#38BDF8',
                  borderRadius: 2,
                  boxShadow: `0 0 20px rgba(56, 189, 248, ${0.8 * prosodicRim})`,
                }}
              />

              {/* High-Velocity Kinetic Pulse Head */}
              <div
                style={{
                  position: 'absolute',
                  top: -6,
                  right: `calc(${pulseProgress * 100}% - 8px)`,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: localFrame >= 125 ? '#EF4444' : '#FFFFFF',
                  boxShadow: `0 0 16px ${localFrame >= 125 ? '#EF4444' : '#38BDF8'}`,
                }}
              />

              {/* 13 Architectural Monthly Ticks (0 to 12) */}
              {Array.from({ length: 13 }).map((_, i) => {
                const rightPos = (i / 12) * 100;
                const isPassed = pulseProgress >= i / 12;
                const isFinal = i === 12;

                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      right: `${rightPos}%`,
                      top: isFinal ? -24 : -10,
                      width: isFinal ? 4 : 2,
                      height: isFinal ? 52 : 24,
                      backgroundColor: isFinal
                        ? '#EF4444'
                        : isPassed
                        ? '#38BDF8'
                        : 'rgba(255, 255, 255, 0.25)',
                      borderRadius: 2,
                      boxShadow: isFinal && localFrame >= 125 ? '0 0 16px #EF4444' : undefined,
                    }}
                  />
                );
              })}

              {/* Collision Ripple Wave on Impact */}
              {ripple.active && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: ripple.radius * 2,
                    height: ripple.radius * 2,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    border: '2px solid #EF4444',
                    opacity: ripple.opacity,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* STATUTORY WARNING STATEMENT (Full-Width Editorial)       */}
          {/* ======================================================== */}
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              right: 140,
              left: 140,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: warningProgress,
              transform: `translateY(${(1 - warningProgress) * 24}px) scale(${breathing.scale})`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ width: 8, height: 8, backgroundColor: '#EF4444', transform: 'rotate(45deg)' }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: '#EF4444' }}>
                هشدار قطعی قانون‌گذار
              </span>
              <div style={{ width: 8, height: 8, backgroundColor: '#EF4444', transform: 'rotate(45deg)' }} />
            </div>

            <p
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 1200,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
              }}
            >
              {AUTHORIZED_CONTENT.shot04.timelineWarningText.text}
            </p>
          </div>
        </AbsoluteFill>
      </CameraGrammarRig>
    </AbsoluteFill>
  );
};
