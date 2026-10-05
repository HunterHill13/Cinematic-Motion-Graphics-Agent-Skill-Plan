import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike, calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & MASTER OUTRO (V14)
 * Strict Content Authority: 100% Source-Authorized Text
 * Frame Range: 2155 - 2361 (Global) / 0 - 206 (Local)
 * - Category: HeroInstitutional
 * - Recipe: heraldic-institutional-seal
 * - Camera: micro-pull (1.025 -> 1.000, dignified release)
 * - Visual Companion: Grand Heraldic Crest + Dual Laurel Branches + Gold Orbit
 * - Audio Sync:
 *     f2186 (local 31f): Outro narration begins
 *     f2195 (local 40f): Crest seats into position
 *     f2317 (local 162f): Narration concludes
 * - Final Master Resolve: Dignified crystal-clear stillness until f2361 (local 206f)
 */
export const Shot06_OutroV14: React.FC = () => {
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
        {/* Layer 0: Depth Plane & Radial Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
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

        {/* Shockwave Ripples from Seal Collision */}
        {ripple1.active && (
          <div
            style={{
              position: 'absolute',
              left: 960 - ripple1.radius,
              top: 260 - ripple1.radius,
              width: ripple1.radius * 2,
              height: ripple1.radius * 2,
              borderRadius: '50%',
              border: `${ripple1.strokeWidth}px solid rgba(212, 175, 55, 0.7)`,
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
              top: 260 - ripple2.radius,
              width: ripple2.radius * 2,
              height: ripple2.radius * 2,
              borderRadius: '50%',
              border: `${ripple2.strokeWidth}px solid rgba(56, 189, 248, 0.45)`,
              opacity: ripple2.opacity,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Heraldic Visual Companion (Top-Center) */}
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: '50%',
            transform: `translateX(-50%) scale(${coreExpansion}) translateY(${crestCollision.displacementY}px) scaleX(${crestCollision.squashScaleX}) scaleY(${crestCollision.squashScaleY})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Rotating Filigree Orbit */}
          <div
            style={{
              position: 'absolute',
              top: -20,
              left: -20,
              width: 190,
              height: 190,
              borderRadius: '50%',
              border: '1px dashed rgba(212, 175, 55, 0.4)',
              transform: `rotate(${orbitRotation}deg)`,
              pointerEvents: 'none',
            }}
          />

          {/* Central Heraldic Medallion with Dual Laurel Branch Vectors */}
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 45px rgba(212, 175, 55, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Inner Laurel Vector Wreath */}
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 600,
                strokeDashoffset: (1 - laurelDraw.progress) * 600,
              }}
            >
              <path d="M12 2v20M17 5c-2.5 1-4 3-5 5M7 5c2.5 1 4 3 5 5M18 10c-3 1-5 3.5-6 6M6 10c3 1 5 3.5 6 6M17 17c-2.5 1-4 2-5 3M7 17c2.5 1 4 2 5 3" />
            </svg>
          </div>
        </div>

        {/* Narrative & Institutional Typography (Centered Below Seal) */}
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: 120,
            right: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Main Host Institution Name */}
          <div
            style={{
              position: 'relative',
              transform: `scale(${titleStrike.scale})`,
              opacity: titleStrike.opacity,
              marginBottom: 28,
            }}
          >
            <h1
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.02em',
                textShadow: '0 4px 30px rgba(212, 175, 55, 0.45)',
              }}
            >
              {AUTHORIZED_CONTENT.shot06.institutionTitle.text}
            </h1>
          </div>

          {/* Continuation Subtitle Promise */}
          <div style={{ overflow: 'hidden', marginBottom: 28, maxWidth: 1100 }}>
            <p
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: '#38BDF8',
                margin: 0,
                lineHeight: 1.6,
                transform: `translateY(${subtitleReveal.translateY}px)`,
                opacity: subtitleReveal.opacity,
                textShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
              }}
            >
              {AUTHORIZED_CONTENT.shot06.continuationSubtitle.text}
            </p>
          </div>

          {/* Dignified Call to Action */}
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#D4AF37',
                padding: '12px 36px',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                borderRadius: 30,
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                boxShadow: '0 0 24px rgba(212, 175, 55, 0.35)',
                transform: `translateY(${ctaReveal.translateY}px)`,
                opacity: ctaReveal.opacity,
              }}
            >
              {AUTHORIZED_CONTENT.shot06.callToAction.text}
            </div>
          </div>
        </div>

        {/* Clean Architectural Frame Footer Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
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
