import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike, calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & MASTER OUTRO (V15)
 * Director-Led, Content-Locked Reference-Driven Motion
 * Frame Range: 2155 - 2361 (Global) / 0 - 206 (Local)
 * - Category: HeroInstitutional
 * - Recipe: heraldic-institutional-seal
 * - Camera: micro-pull (1.025 -> 1.000, dignified release)
 * - Visual Companion: Grand Heraldic Crest + Dual Laurel Branches + Gold Orbit
 * - Dynamics: Idle Breathing Micro-Motion on Crest + Causal Secondary Reaction on Seal Stamp (local f=40)
 * - Audio Sync:
 *     f2186 (local 31f): Outro narration begins
 *     f2195 (local 40f): Crest seats into position
 *     f2317 (local 162f): Narration concludes
 * - Final Master Resolve: Dignified crystal-clear stillness until f2361 (local 206f)
 */
export const Shot06_OutroV16: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Inward Singularity Expansion into Golden Core (local 0 - 40f)
  const coreExpansion = interpolate(localFrame, [0, 40], [0.1, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Heraldic Crest Collision Lock at local f = 40 (global f = 2195)
  const crestCollision = calculateCollision(localFrame, 40, {
    reboundAmplitude: 10,
    decay: 0.22,
    maxSquash: 0.12,
  });

  // Dual Golden Shockwave Ripples
  const ripple1 = calculateRipple(localFrame, 40, 45, 320);
  const ripple2 = calculateRipple(localFrame, 48, 50, 460);

  // V15 Causal Secondary Reaction to crest collision
  const crestSecondary = calculateCausalSecondaryReaction(localFrame, 40, 3, 26);

  // V15 Idle Breathing Micro-Motion once settled (f >= 60)
  const breathing = calculateIdleBreathing(localFrame, 90, 0.015);
  const crestScale = localFrame >= 60 ? breathing.scale : 1.0;

  // 3. Laurel Branches & Ring Draw
  const laurelDraw = calculateDraw(localFrame, 45, 35, 600);
  const orbitRotation = (localFrame * 0.3) % 360;

  // 4. Hero Outro Typography Reveals
  const titleStrike = calculateKeywordStrike(localFrame, 55, { scalePeak: 1.12 });
  const subtitleReveal = calculateMaskedPhraseReveal(localFrame, 80, 26);
  const ctaReveal = calculateMaskedPhraseReveal(localFrame, 115, 26);

  return (
    <CameraGrammarRig mode="micro-pull" durationInFrames={206} intensity={1.0}>
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
        {/* Layer 0: Depth Plane & Institutional Golden Halo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 38%, rgba(212, 175, 55, 0.10) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 0: Atmospheric Precision Grid */}
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

        {/* Layer 3: Central Grand Heraldic Seal Medallion Companion */}
        <div
          style={{
            position: 'absolute',
            top: '36%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${coreExpansion * crestScale}) scaleX(${crestCollision.squashScaleX}) scaleY(${crestCollision.squashScaleY}) translateY(${crestCollision.displacementY + breathing.translateY}px)`,
            width: 170,
            height: 170,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #F59E0B 0%, #D4AF37 55%, #78350F 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 16px 48px rgba(212, 175, 55, 0.5), inset 0 2px 6px rgba(255, 255, 255, 0.7)${crestSecondary.active ? `, 0 0 ${40 * crestSecondary.opacity}px rgba(212, 175, 55, ${0.8 * crestSecondary.opacity})` : ''}`,
          }}
        >
          {/* Outer Rotating Delicate Orbit Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -14,
              borderRadius: '50%',
              border: '1.5px dashed rgba(212, 175, 55, 0.6)',
              transform: `rotate(${orbitRotation}deg)`,
            }}
          />

          {/* Inner Geometric Sunburst Core */}
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* 8-Pointed Star Motif */}
            <path
              d="M50 15 L58 38 L82 38 L63 52 L70 75 L50 61 L30 75 L37 52 L18 38 L42 38 Z"
              fill="#07090E"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <circle cx="50" cy="46" r="10" fill="#D4AF37" />
            <circle cx="50" cy="46" r="5" fill="#07090E" />
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
                border: `${ripple1.strokeWidth}px solid rgba(212, 175, 55, ${ripple1.opacity})`,
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
                border: `${ripple2.strokeWidth}px solid rgba(56, 189, 248, ${ripple2.opacity})`,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* Dual Laurel Wreath Vector Flourishes (Non-Textual Companion) */}
        <div
          style={{
            position: 'absolute',
            top: '36%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            height: 200,
            pointerEvents: 'none',
          }}
        >
          {/* Left Laurel Branch */}
          <svg
            width="120"
            height="180"
            viewBox="0 0 120 180"
            fill="none"
            style={{ position: 'absolute', left: 0, top: 10, opacity: laurelDraw.progress }}
          >
            <path
              d="M100 160 C50 140 20 90 40 20"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Leaves */}
            <path d="M40 20 C30 25 35 38 48 32 C48 32 45 22 40 20 Z" fill="#D4AF37" />
            <path d="M35 55 C22 58 25 72 38 68 C38 68 38 58 35 55 Z" fill="#D4AF37" />
            <path d="M42 95 C28 98 30 112 45 108 C45 108 45 98 42 95 Z" fill="#D4AF37" />
            <path d="M60 132 C46 136 48 148 64 144 C64 144 63 134 60 132 Z" fill="#D4AF37" />
          </svg>

          {/* Right Laurel Branch */}
          <svg
            width="120"
            height="180"
            viewBox="0 0 120 180"
            fill="none"
            style={{
              position: 'absolute',
              right: 0,
              top: 10,
              transform: 'scaleX(-1)',
              opacity: laurelDraw.progress,
            }}
          >
            <path
              d="M100 160 C50 140 20 90 40 20"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Leaves */}
            <path d="M40 20 C30 25 35 38 48 32 C48 32 45 22 40 20 Z" fill="#D4AF37" />
            <path d="M35 55 C22 58 25 72 38 68 C38 68 38 58 35 55 Z" fill="#D4AF37" />
            <path d="M42 95 C28 98 30 112 45 108 C45 108 45 98 42 95 Z" fill="#D4AF37" />
            <path d="M60 132 C46 136 48 148 64 144 C64 144 63 134 60 132 Z" fill="#D4AF37" />
          </svg>
        </div>

        {/* Layer 4: Hero Institutional Outro Typography */}
        <div
          style={{
            position: 'absolute',
            top: '56%',
            left: 140,
            right: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Institutional Title */}
          <h1
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: 20,
              lineHeight: 1.3,
              maxWidth: 1200,
              textShadow: '0 4px 24px rgba(212, 175, 55, 0.4)',
              transform: `scale(${titleStrike.scale})`,
              opacity: titleStrike.opacity,
            }}
          >
            {AUTHORIZED_CONTENT.shot06.institutionTitle.text}
          </h1>

          {/* Series Continuation Subtitle */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: '#CBD5E1',
              lineHeight: 1.6,
              maxWidth: 950,
              marginBottom: 32,
              opacity: subtitleReveal.opacity,
              transform: `translateY(${subtitleReveal.translateY}px)`,
            }}
          >
            {AUTHORIZED_CONTENT.shot06.continuationSubtitle.text}
          </div>

          {/* Call to Action Badge */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#07090E',
              backgroundColor: '#D4AF37',
              padding: '12px 40px',
              borderRadius: 30,
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.5)',
              opacity: ctaReveal.opacity,
              transform: `scale(${ctaReveal.scale})`,
            }}
          >
            {AUTHORIZED_CONTENT.shot06.callToAction.text}
          </div>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
