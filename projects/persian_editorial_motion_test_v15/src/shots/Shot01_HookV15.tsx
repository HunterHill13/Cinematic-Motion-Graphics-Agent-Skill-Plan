import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { executeKineticUnderlineHandoff } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 01 — THE EDITORIAL HOOK & CANONICAL QUESTION (V15)
 * Director-Led, Content-Locked Reference-Driven Motion
 * Frame Range: 0 - 380 (12.67s @ 30 FPS)
 * - Category: OpeningHook
 * - Recipe: hook-typography-slam
 * - Camera: micro-push (1.000 -> 1.025)
 * - Typography: KeywordStrike + BaselineTravel
 * - Visual Companion: Quadrant Architectural Brackets + Golden Kinetic Underline Ray (Pure Geometry)
 * - Dynamics: Idle Breathing Micro-Motion (0.33Hz) + Causal Secondary Reaction at f=234
 * - Audio Sync:
 *     f0 - f160: Opening Institutional Attribution
 *     f184: Question begins
 *     f234: Hero title impact («دانشجوی پژوهشگر یا فناور برجسته کشور»)
 *     f260 - f350: Question suffix resolution
 * - Outgoing Carry (T1): Kinetic Underline Handoff into Shot 02 (f350 - 380)
 */
export const Shot01_HookV15: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Opening Institutional Attribution (0 - 160f)
  const introOpacity = interpolate(frame, [15, 35, 145, 165], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const introSlideY = interpolate(frame, [15, 40], [20, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const introRuleDraw = calculateDraw(frame, 20, 30, 420);

  // 2. Central Narrative Question Lead (175 - 350f)
  const questionStart = 175;
  const questionLeadOpacity = interpolate(frame, [questionStart, questionStart + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const questionLeadSlideY = interpolate(
    frame,
    [questionStart, questionStart + 22],
    [24, 0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 3. Keyword Strike Behavior for Hero Title at f = 234
  const keywordStrike = calculateKeywordStrike(frame, 234, {
    scalePeak: 1.14,
    anticipationFrames: 14,
    settleFrames: 20,
  });

  // V15 Causal Secondary Reaction triggered by keyword strike at f = 234
  const strikeSecondary = calculateCausalSecondaryReaction(frame, 234, 3, 24);

  // V15 Idle Breathing Micro-Motion once settled (f >= 254)
  const breathing = calculateIdleBreathing(frame, 90, 0.012);
  const heroScale = frame >= 254 ? keywordStrike.scale * breathing.scale : keywordStrike.scale;

  // Kinetic Baseline Ray draw beneath hero title
  const baselineDraw = calculateDraw(frame, 234, 25, 880);

  // Question Suffix Reveal (f260 - 350f)
  const suffixStart = 260;
  const suffixOpacity = interpolate(frame, [suffixStart, suffixStart + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const suffixSlideY = interpolate(frame, [suffixStart, suffixStart + 22], [16, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Overall text group fade out near transition handoff
  const narrativeFade = interpolate(frame, [345, 375], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Transition 01 Carry Outflow (350 - 380f)
  const t1Handoff = executeKineticUnderlineHandoff(frame, 350, 380, {
    startX: 960,
    endX: -200,
    initialWidth: 880,
    terminalWidth: 1400,
  });

  return (
    <CameraGrammarRig mode="micro-push" durationInFrames={380} intensity={1.0}>
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
        {/* Layer 0: Depth Plane & Atmospheric Radial Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 45%, rgba(212, 175, 55, 0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 0: Architectural Vector Precision Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 2: Quadrant Architectural Framing Brackets (Non-Textual Companion) */}
        <div
          style={{
            position: 'absolute',
            inset: '60px 100px',
            pointerEvents: 'none',
          }}
        >
          {/* Top-Right Bracket */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 44,
              height: 44,
              borderTop: '2px solid rgba(212, 175, 55, 0.45)',
              borderRight: '2px solid rgba(212, 175, 55, 0.45)',
              boxShadow: strikeSecondary.active
                ? `0 0 ${12 * strikeSecondary.opacity}px rgba(212, 175, 55, ${0.8 * strikeSecondary.opacity})`
                : 'none',
            }}
          />
          {/* Top-Left Bracket */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 44,
              height: 44,
              borderTop: '2px solid rgba(212, 175, 55, 0.45)',
              borderLeft: '2px solid rgba(212, 175, 55, 0.45)',
              boxShadow: strikeSecondary.active
                ? `0 0 ${12 * strikeSecondary.opacity}px rgba(212, 175, 55, ${0.8 * strikeSecondary.opacity})`
                : 'none',
            }}
          />
          {/* Bottom-Right Bracket */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 44,
              height: 44,
              borderBottom: '2px solid rgba(212, 175, 55, 0.45)',
              borderRight: '2px solid rgba(212, 175, 55, 0.45)',
              boxShadow: strikeSecondary.active
                ? `0 0 ${12 * strikeSecondary.opacity}px rgba(212, 175, 55, ${0.8 * strikeSecondary.opacity})`
                : 'none',
            }}
          />
          {/* Bottom-Left Bracket */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 44,
              height: 44,
              borderBottom: '2px solid rgba(212, 175, 55, 0.45)',
              borderLeft: '2px solid rgba(212, 175, 55, 0.45)',
              boxShadow: strikeSecondary.active
                ? `0 0 ${12 * strikeSecondary.opacity}px rgba(212, 175, 55, ${0.8 * strikeSecondary.opacity})`
                : 'none',
            }}
          />
        </div>

        {/* Layer 4: Opening Institutional Attribution (f15 - f165) */}
        {frame <= 170 && (
          <div
            style={{
              position: 'absolute',
              top: '42%',
              left: 120,
              right: 120,
              transform: `translateY(-50%) translateY(${introSlideY}px)`,
              opacity: introOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Geometric Seal Accent Dot */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 18px rgba(212, 175, 55, 0.9)',
                marginBottom: 24,
              }}
            />
            {/* Official Source Presenter Narration */}
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: '#F8FAFC',
                letterSpacing: '-0.01em',
                lineHeight: 1.6,
                maxWidth: 1100,
                textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
              }}
            >
              {AUTHORIZED_CONTENT.shot01.introPresenter.text}
            </div>
            {/* Luminous Architectural Baseline Rule */}
            <div
              style={{
                width: introRuleDraw.progress * 420,
                height: 3,
                backgroundColor: '#D4AF37',
                borderRadius: 2,
                marginTop: 28,
                boxShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
              }}
            />
          </div>
        )}

        {/* Layer 3 & 4: Central Narrative Block (175 - 380f) */}
        {frame >= 170 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 140,
              right: 140,
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: narrativeFade,
            }}
          >
            {/* Question Lead-In */}
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: '#CBD5E1',
                lineHeight: 1.5,
                opacity: questionLeadOpacity,
                transform: `translateY(${questionLeadSlideY}px)`,
                maxWidth: 1200,
                marginBottom: 32,
              }}
            >
              {AUTHORIZED_CONTENT.shot01.hookQuestionLead.text}
            </div>

            {/* Hero Keyphrase Title with KeywordStrike at f = 234 & Idle Breathing */}
            {frame >= 210 && (
              <div
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `scale(${heroScale}) translateY(${breathing.translateY}px)`,
                  opacity: keywordStrike.opacity,
                  marginBottom: 32,
                }}
              >
                <h1
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    margin: 0,
                    color: '#FFFFFF',
                    textShadow: `0 4px ${28 + (strikeSecondary.active ? 16 * strikeSecondary.opacity : 0)}px rgba(212, 175, 55, ${0.4 + (strikeSecondary.active ? 0.3 * strikeSecondary.opacity : 0)})`,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {AUTHORIZED_CONTENT.shot01.heroTitle.text}
                </h1>

                {/* Layer 5: Secondary Causal Ripple Aura under Hero Title */}
                {strikeSecondary.active && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${strikeSecondary.expansionScale})`,
                      width: '105%',
                      height: 80,
                      borderRadius: 16,
                      border: '2px solid rgba(212, 175, 55, 0.7)',
                      opacity: strikeSecondary.opacity,
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Kinetic Baseline Ray & T1 Outflow Carry */}
                {frame < 350 ? (
                  <div
                    style={{
                      width: baselineDraw.progress * 880,
                      height: 5,
                      backgroundColor: '#D4AF37',
                      marginTop: 18,
                      borderRadius: 3,
                      boxShadow: '0 0 24px rgba(212, 175, 55, 0.9), 0 0 8px rgba(212, 175, 55, 0.7)',
                    }}
                  />
                ) : (
                  /* Active Transition 01 Carry Underline Handoff */
                  <div
                    style={{
                      position: 'absolute',
                      top: 84,
                      left: '50%',
                      transform: `translateX(-50%) translateX(${t1Handoff.x - 960}px)`,
                      width: t1Handoff.width,
                      height: 6,
                      backgroundColor: '#D4AF37',
                      borderRadius: 3,
                      boxShadow: '0 0 30px rgba(212, 175, 55, 1)',
                      opacity: t1Handoff.opacity,
                    }}
                  />
                )}
              </div>
            )}

            {/* Question Suffix Resolution */}
            {frame >= 255 && (
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#94A3B8',
                  lineHeight: 1.5,
                  opacity: suffixOpacity,
                  transform: `translateY(${suffixSlideY}px)`,
                  maxWidth: 1000,
                }}
              >
                {AUTHORIZED_CONTENT.shot01.hookQuestionSuffix.text}
              </div>
            )}
          </div>
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
          {/* Subtle Vector Milestone Ticks */}
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
