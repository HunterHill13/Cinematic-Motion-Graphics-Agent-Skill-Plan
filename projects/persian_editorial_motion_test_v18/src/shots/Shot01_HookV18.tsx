import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeKineticUnderlineHandoff } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { executeTextMaskReveal } from '../../../../src/motion/recipes/TextMaskRevealRecipe';
import { executeDotToLine } from '../../../../src/motion/recipes/DotToLineRecipe';
import { executeSequentialSwap } from '../../../../src/motion/recipes/SequentialSwapRecipe';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * SHOT 01 — THE EDITORIAL HOOK & CANONICAL QUESTION (V18)
 * Reference-Integrated, Content-Locked, Anti-Cliché Motion Engineering
 * Frame Range: 0 - 380 (12.67s @ 30 FPS)
 */
export const Shot01_HookV18: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // V18 Prosody-Driven Motion modulation
  const prosodic = evaluateProsodicState(frame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. TextMaskReveal for Institutional Attribution (frames 15 - 35)
  const introMask = executeTextMaskReveal(frame, 15, fps, 'bottom-to-top', true);
  // 2. DotToLine for dividing rule
  const introRule = executeDotToLine(frame, 20, fps, 420, 2);

  // 3. Sequential Swap between Attribution and Question (exit f145 -> f160, gap -> f175)
  const swap = executeSequentialSwap(frame, 145, 15, 10, fps);

  // 4. Central Narrative Question Lead (175 - 350f)
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

  // 5. Keyword Strike & Seismic Arrival for Hero Term (f234)
  const heroStrikeFrame = 234;
  const heroStrike = calculateKeywordStrike(frame, heroStrikeFrame, {
    anticipationFrames: 8,
    settleFrames: 18,
    scalePeak: 1.06,
  });

  // 6. Idle Micro-Breathing (0.33Hz)
  const breathing = calculateIdleBreathing(frame, 0.33, 0.012);

  // 7. Causal Secondary Reaction
  const secondaryReaction = calculateCausalSecondaryReaction(frame, heroStrikeFrame, 3, 16);

  // 8. Kinetic Underline Carry Transition (T1) into Shot 02 (350 - 380f)
  const carryT1 = executeKineticUnderlineHandoff(frame, 350, 380, {
    startX: 120,
    endX: 1800,
    initialWidth: 960,
    terminalWidth: 1100,
  });

  return (
    <CameraGrammarRig mode="micro-push" durationInFrames={380} intensity={1.0}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        {/* ============================================================ */}
        {/* SECTION 1: INSTITUTIONAL ATTRIBUTION (0 - 165f)              */}
        {/* ============================================================ */}
        {swap.outgoing.isVisible && (
          <div
            style={{
              position: 'absolute',
              top: '40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: swap.outgoing.opacity,
              transform: `translateY(${swap.outgoing.translateY}px) scale(${swap.outgoing.scale})`,
            }}
          >
            {/* Mask-Revealed Attribution */}
            <div
              style={{
                clipPath: introMask.clipPath,
                transform: `translateY(${introMask.translateY}px)`,
                opacity: introMask.opacity,
              }}
            >
              <AutoFitText
                text={AUTHORIZED_CONTENT.shot01.introPresenter.text}
                maxFontSize={34}
                color="#F8FAFC"
                textAlign="center"
                dir="rtl"
                style={{ fontWeight: 800, textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)' }}
              />
            </div>

            {/* DotToLine Architectural Rule */}
            <div
              style={{
                width: introRule.lineWidth,
                height: introRule.lineHeight,
                backgroundColor: '#D97706',
                borderRadius: 2,
                marginTop: 20,
              }}
            />
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 2: CENTRAL QUESTION & HERO IMPACT (175 - 380f)       */}
        {/* ============================================================ */}
        {frame >= questionStart && (
          <div
            style={{
              position: 'absolute',
              top: '32%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 1400,
            }}
          >
            {/* Question Lead */}
            <div
              style={{
                opacity: questionLeadOpacity,
                transform: `translateY(${questionLeadSlideY}px)`,
                marginBottom: 24,
              }}
            >
              <AutoFitText
                text={AUTHORIZED_CONTENT.shot01.hookQuestionLead.text}
                maxFontSize={34}
                color="#94A3B8"
                textAlign="center"
                dir="rtl"
              />
            </div>

            {/* Hero Title Strike: «دانشجوی پژوهشگر یا فناور برجسته کشور» */}
            {frame >= heroStrikeFrame - 8 && (
              <div
                style={{
                  transform: `scale(${heroStrike.scale * (1 + (secondaryReaction.expansionScale - 1) * 0.5)}) translateY(${heroStrike.translateY}px)`,
                  opacity: heroStrike.opacity,
                  textAlign: 'center',
                }}
              >
                <AutoFitText
                  text={AUTHORIZED_CONTENT.shot01.heroTitle.text}
                  maxFontSize={58}
                  color="#F8FAFC"
                  textAlign="center"
                  dir="rtl"
                  style={{
                    fontWeight: 900,
                    textShadow: `0 0 20px rgba(217, 119, 6, ${prosodicRim * 0.4})`,
                  }}
                />
              </div>
            )}

            {/* Question Suffix */}
            {frame >= 250 && (
              <div
                style={{
                  marginTop: 28,
                  opacity: interpolate(frame, [250, 270], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              >
                <AutoFitText
                  text={AUTHORIZED_CONTENT.shot01.hookQuestionSuffix.text}
                  maxFontSize={30}
                  color="#CBD5E1"
                  textAlign="center"
                  dir="rtl"
                />
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* SECTION 3: KINETIC UNDERLINE CARRY TRANSITION (T1)           */}
        {/* ============================================================ */}
        {frame >= 234 && (
          <div
            style={{
              position: 'absolute',
              left: carryT1.x,
              top: 720,
              width: carryT1.width,
              height: 4,
              backgroundColor: '#D97706',
              borderRadius: 2,
              opacity: carryT1.opacity,
            }}
          />
        )}
      </div>
    </CameraGrammarRig>
  );
};
