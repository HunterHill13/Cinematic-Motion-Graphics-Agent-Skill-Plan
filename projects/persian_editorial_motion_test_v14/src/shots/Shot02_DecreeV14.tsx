import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { executeSymmetricFission } from '../../../../src/transition/carryTransitions';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 02 — THE OFFICIAL STATUTE DECREE MONOLITH (V14)
 * Strict Content Authority: 100% Source-Authorized Text
 * Frame Range: 350 - 650 (Global) / 0 - 300 (Local)
 * - Category: EditorialTypography
 * - Recipe: decree-monolith-reveal
 * - Camera: slow-dolly (1.000 -> 1.015)
 * - Visual Companion: Embossed Heraldic Decree Medallion (Scale Vector) + Frosted Monolith Border
 * - Incoming Carry (T1): Inflow intake from Shot 01 kinetic ray (local 0 - 30f)
 * - Audio Sync: Stamp collision at global f395 (local f45)
 * - Outgoing Carry (T2): Symmetric fission into 3 criteria pillars (local 270 - 300f / global 620 - 650f)
 */
export const Shot02_DecreeV14: React.FC = () => {
  const localFrame = useCurrentFrame();

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
            background: 'radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
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
        {localFrame <= 35 && (
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
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.9)',
              opacity: incomingCarryOpacity,
            }}
          />
        )}

        {/* Shockwave Ripples from Seal Impact */}
        {ripple1.active && (
          <div
            style={{
              position: 'absolute',
              left: 960 - ripple1.radius,
              top: 330 - ripple1.radius,
              width: ripple1.radius * 2,
              height: ripple1.radius * 2,
              borderRadius: '50%',
              border: `${ripple1.strokeWidth}px solid rgba(212, 175, 55, 0.6)`,
              opacity: ripple1.opacity,
              pointerEvents: 'none',
            }}
          />
        )}
        {ripple2.active && (
          <div
            style={{
              position: 'absolute',
              left: 960 - ripple2.radius,
              top: 330 - ripple2.radius,
              width: ripple2.radius * 2,
              height: ripple2.radius * 2,
              borderRadius: '50%',
              border: `${ripple2.strokeWidth}px solid rgba(56, 189, 248, 0.45)`,
              opacity: ripple2.opacity,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Layer 1: Central Legal Decree Monolith Box (Visual Companion) */}
        <div
          style={{
            position: 'absolute',
            top: 160,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1240,
            height: 700,
            borderRadius: 20,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.65), inset 0 0 45px rgba(212, 175, 55, 0.05)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 80px',
            boxSizing: 'border-box',
          }}
        >
          {/* Non-Textual Visual Companion: Embossed Scale Medallion with Collision Dynamics (at f = 45) */}
          <div
            style={{
              position: 'relative',
              width: 130,
              height: 130,
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 35px rgba(212, 175, 55, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translateY(${sealCollision.displacementY}px) scaleX(${sealCollision.squashScaleX}) scaleY(${sealCollision.squashScaleY})`,
              marginBottom: 36,
            }}
          >
            {/* Concentric Decorative Rings inside seal */}
            <div
              style={{
                position: 'absolute',
                inset: 8,
                borderRadius: '50%',
                border: '1px dashed rgba(212, 175, 55, 0.6)',
              }}
            />
            {/* Pure Geometric Scale Vector (Zero Invented Text Inside Seal) */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <polyline points="4 7 1 14 7 14 4 7" />
              <polyline points="20 7 17 14 23 14 20 7" />
              <circle cx="12" cy="3" r="1.5" fill="#D4AF37" />
            </svg>
          </div>

          {/* Statutory Article Heading with MaskedPhraseReveal (at f = 48) */}
          <div style={{ overflow: 'hidden', marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                textAlign: 'center',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 24px rgba(212, 175, 55, 0.4)',
                transform: `translateY(${decreeHeaderReveal.translateY}px)`,
                opacity: decreeHeaderReveal.opacity,
              }}
            >
              {AUTHORIZED_CONTENT.shot02.statuteHeadline.text}
            </h2>
          </div>

          {/* Authoritative Regulation Source (at f = 80) */}
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: '#38BDF8',
                margin: 0,
                lineHeight: 1.6,
                textAlign: 'center',
                transform: `translateY(${decreeSourceReveal.translateY}px)`,
                opacity: decreeSourceReveal.opacity,
              }}
            >
              {AUTHORIZED_CONTENT.shot02.decreeSource.text}
            </div>
          </div>

          {/* Decree Path Summary (at f = 115) */}
          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: '#CBD5E1',
                margin: 0,
                lineHeight: 1.7,
                textAlign: 'center',
                maxWidth: 960,
                transform: `translateY(${pathSummaryReveal.translateY}px)`,
                opacity: pathSummaryReveal.opacity,
              }}
            >
              {AUTHORIZED_CONTENT.shot02.decreePathSummary.text}
            </p>
          </div>

          {/* Monolith Architectural Underline Datum */}
          <div
            style={{
              width: borderDraw.progress * 960,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.45)',
              marginTop: 44,
              borderRadius: 1,
            }}
          />
        </div>

        {/* Transition 02 Symmetric Fission Visual Guides (local 270 - 300f) */}
        {localFrame >= 270 && (
          <>
            <div
              style={{
                position: 'absolute',
                top: 480,
                left: t2Fission.leftX,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 18px rgba(212, 175, 55, 0.9)',
                opacity: t2Fission.opacity,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 480,
                left: t2Fission.rightX,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 18px rgba(212, 175, 55, 0.9)',
                opacity: t2Fission.opacity,
              }}
            />
          </>
        )}

        {/* Clean Architectural Frame Footer Bar (Pure Vector Axis, Zero Invented Words) */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
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
