import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { executeSymmetricFission } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 02 — THE OFFICIAL STATUTE DECREE MONOLITH (V17)
 * Audio Reliability, Pronunciation Lock & Prosody-Driven Polish
 * Frame Range: 350 - 650 (Global) / 0 - 300 (Local)
 * - Category: EditorialTypography
 * - Recipe: decree-monolith-reveal
 * - Camera: slow-dolly (1.000 -> 1.015)
 * - Visual Companion: Embossed Heraldic Decree Medallion (Scale Vector) + Frosted Monolith Border
 * - Dynamics: Idle Breathing Micro-Motion on Medallion + Causal Secondary Reaction on Seal Slam (local f=45)
 * - Prosody Hook: Modulates medallion impact settling and rim lighting from vocal stress
 * - Incoming Carry (T1): Inflow intake from Shot 01 kinetic ray (local 0 - 30f)
 * - Audio Sync: Stamp collision at global f395 (local f45)
 * - Outgoing Carry (T2): Symmetric fission into 3 criteria pillars (local 270 - 300f / global 620 - 650f)
 */
export const Shot02_DecreeV17: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 350;

  // V17 Prosody-Driven Motion modulation
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Incoming T1 Intake (local 0 - 30f)
  const incomingCarryWidth = interpolate(localFrame, [0, 30], [200, 1100], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const incomingCarryOpacity = interpolate(localFrame, [0, 20, 35], [0.6, 1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Official Seal Collision at local f = 45 (global f = 395)
  const sealCollision = calculateCollision(localFrame, 45, {
    reboundAmplitude: 12,
    decay: 0.2,
    maxSquash: 0.16,
  });

  // Dual Shockwave Ripples emanating from seal stamp
  const ripple1 = calculateRipple(localFrame, 45, 40, 240);
  const ripple2 = calculateRipple(localFrame, 52, 45, 360);

  // Causal Secondary Reaction to seal collision
  const sealSecondary = calculateCausalSecondaryReaction(localFrame, 45, 3, 26);

  // Idle Breathing Micro-Motion on Medallion once settled (f >= 65)
  const breathing = calculateIdleBreathing(localFrame, 90, 0.015);
  const medallionBaseScale = localFrame >= 65 ? breathing.scale : 1.0;
  const medallionScale = medallionBaseScale * prosodicScale;

  // 3. Monolith Border Draw
  const borderDraw = calculateDraw(localFrame, 35, 30, 960);

  // 4. Masked Phrase Reveals for Authorized Decree Text
  const decreeHeaderReveal = calculateMaskedPhraseReveal(localFrame, 48, 22);
  const decreeSourceReveal = calculateMaskedPhraseReveal(localFrame, 80, 24);
  const pathSummaryReveal = calculateMaskedPhraseReveal(localFrame, 115, 24);

  // 5. Outgoing Transition 02 Carry (Symmetric Fission at local 270 - 300f)
  const t2Fission = executeSymmetricFission(localFrame, 270, 300, {
    centerX: 960,
    leftTargetX: 420,
    rightTargetX: 1500,
  });

  return (
    <CameraGrammarRig mode="slow-dolly" durationInFrames={300} intensity={1.0}>
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
        {/* Layer 0: Depth Plane & Radial Spotlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 40%, rgba(212, 175, 55, ${0.08 * prosodicRim}) 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Layer 0: Background Atmospheric Architectural Grid */}
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

        {/* Incoming T1 Kinetic Ray Morphing into Upper Monolith Border (local 0 - 35f) */}
        {localFrame < 35 && (
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: '50%',
              transform: 'translateX(-50%)',
              width: incomingCarryWidth,
              height: 4,
              backgroundColor: '#D4AF37',
              borderRadius: 2,
              opacity: incomingCarryOpacity,
              boxShadow: `0 0 24px rgba(212, 175, 55, ${0.8 * prosodicRim})`,
            }}
          />
        )}

        {/* Layer 2 & 3: Monolith Frosted Plaque Card & Architectural Border */}
        {localFrame >= 30 && (
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 1040,
              height: 640,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(7, 10, 18, 0.85) 100%)',
              border: `1px solid rgba(212, 175, 55, ${0.25 * prosodicRim})`,
              borderRadius: 24,
              backdropFilter: 'blur(22px)',
              boxShadow: `0 24px 64px rgba(0, 0, 0, 0.6)${sealSecondary.active ? `, 0 0 ${32 * sealSecondary.opacity}px rgba(212, 175, 55, ${0.4 * sealSecondary.opacity * prosodicRim})` : ''}`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '48px 48px',
            }}
          >
            {/* Luminous Monolith Top Trim Rule */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: borderDraw.progress * 960,
                height: 4,
                backgroundColor: '#D4AF37',
                borderRadius: 2,
                boxShadow: `0 0 20px rgba(212, 175, 55, ${0.7 * prosodicRim})`,
              }}
            />

            {/* Layer 3: Embossed Seal Medallion Companion with Scale Vector */}
            <div
              style={{
                position: 'relative',
                width: 130,
                height: 130,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #F59E0B 0%, #D4AF37 50%, #92400E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 12px 32px rgba(212, 175, 55, ${0.4 * prosodicRim}), inset 0 2px 4px rgba(255, 255, 255, 0.6)`,
                transform: `translateY(${sealCollision.displacementY + breathing.translateY}px) scaleX(${sealCollision.squashScaleX * medallionScale}) scaleY(${sealCollision.squashScaleY * medallionScale})`,
                marginBottom: 36,
                marginTop: 8,
              }}
            >
              {/* Inner Filigree Ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 8,
                  borderRadius: '50%',
                  border: '2px dashed rgba(255, 255, 255, 0.5)',
                }}
              />

              {/* Pure Non-Textual Balanced Scale Vector */}
              <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
                <rect x="32" y="14" width="4" height="40" rx="2" fill="#07090E" />
                <path d="M24 54 H44" stroke="#07090E" strokeWidth="3" strokeLinecap="round" />
                <circle cx="34" cy="14" r="5" fill="#07090E" />
                <path d="M12 24 L56 24" stroke="#07090E" strokeWidth="3" strokeLinecap="round" />
                <path d="M14 25 L10 37 M14 25 L18 37" stroke="#07090E" strokeWidth="1.5" />
                <path d="M8 37 C8 42 20 42 20 37 Z" fill="#07090E" />
                <path d="M54 25 L50 37 M54 25 L58 37" stroke="#07090E" strokeWidth="1.5" />
                <path d="M48 37 C48 42 60 42 60 37 Z" fill="#07090E" />
              </svg>

              {/* Layer 5: Concentric Shockwave Ripples emanating from seal stamp */}
              {ripple1.active && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: ripple1.radius * 2,
                    height: ripple1.radius * 2,
                    borderRadius: '50%',
                    border: `${ripple1.strokeWidth}px solid rgba(212, 175, 55, ${ripple1.opacity * prosodicRim})`,
                    pointerEvents: 'none',
                  }}
                />
              )}
              {ripple2.active && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: ripple2.radius * 2,
                    height: ripple2.radius * 2,
                    borderRadius: '50%',
                    border: `${ripple2.strokeWidth}px solid rgba(56, 189, 248, ${ripple2.opacity * prosodicRim})`,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>

            {/* Layer 4: Decree Statutory Headline («دستورالعمل بند کاف، ماده دو») */}
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#FFFFFF',
                textAlign: 'center',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: 20,
                opacity: decreeHeaderReveal.opacity,
                transform: `translateY(${decreeHeaderReveal.translateY}px)`,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
              }}
            >
              {AUTHORIZED_CONTENT.shot02.statuteHeadline.text}
            </div>

            {/* Statutory Source Badge («آیین‌نامه استعدادهای درخشان وزارت بهداشت») */}
            <div
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                border: `1px solid rgba(212, 175, 55, ${0.4 * prosodicRim})`,
                borderRadius: 30,
                padding: '10px 28px',
                fontSize: 22,
                fontWeight: 700,
                color: '#FDE047',
                marginBottom: 28,
                opacity: decreeSourceReveal.opacity,
                transform: `translateY(${decreeSourceReveal.translateY}px)`,
              }}
            >
              {AUTHORIZED_CONTENT.shot02.decreeSource.text}
            </div>

            {/* Decree Path Summary Body Statement */}
            <div
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: '#CBD5E1',
                textAlign: 'center',
                lineHeight: 1.6,
                maxWidth: 820,
                opacity: pathSummaryReveal.opacity,
                transform: `translateY(${pathSummaryReveal.translateY}px)`,
              }}
            >
              {AUTHORIZED_CONTENT.shot02.decreePathSummary.text}
            </div>
          </div>
        )}

        {/* Transition 02 Carry Rays (Symmetric Fission) */}
        {localFrame >= 270 && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: t2Fission.leftX,
                width: 140,
                height: 4,
                backgroundColor: '#D4AF37',
                borderRadius: 2,
                opacity: t2Fission.opacity,
                boxShadow: `0 0 20px rgba(212, 175, 55, ${0.8 * prosodicRim})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: t2Fission.rightX,
                width: 140,
                height: 4,
                backgroundColor: '#D4AF37',
                borderRadius: 2,
                opacity: t2Fission.opacity,
                boxShadow: `0 0 20px rgba(212, 175, 55, ${0.8 * prosodicRim})`,
              }}
            />
          </>
        )}
      </div>
    </CameraGrammarRig>
  );
};
