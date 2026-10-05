import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { executePlanarStageFold } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 04 — TEMPORAL CUTOFF & LEGAL CALENDAR (V15)
 * Director-Led, Content-Locked Reference-Driven Motion
 * Frame Range: 1450 - 1730 (Global) / 0 - 280 (Local)
 * - Category: TimelineProcess
 * - Recipe: temporal-cutoff-timeline
 * - Camera: slow-dolly (1.000 -> 1.020)
 * - Visual Companion: 12-Month Chronological Tick Ruler + Red Barrier Gate
 * - Dynamics: Idle Breathing Micro-Motion + Causal Secondary Reaction on Barrier Collision (local f=125)
 * - Audio Sync: Barrier strike at global f1575 (local f125)
 * - Outgoing Carry (T4): Planar stage fold into base plinth (local 250 - 280f / global 1700 - 1730f)
 */
export const Shot04_TimeWindowV15: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Header Title Reveal
  const titleOpacity = interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [10, 35], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(localFrame, 15, 25, 480);

  // 2. Timeline Axis Travel (Month 0 to Month 12)
  const timelineProgress = interpolate(localFrame, [35, 125], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Cutoff Barrier Collision at local f = 125 (global f = 1575)
  const barrierCollision = calculateCollision(localFrame, 125, {
    reboundAmplitude: 14,
    decay: 0.22,
    maxSquash: 0.18,
  });

  // V15 Causal Secondary Reaction to barrier collision
  const barrierSecondary = calculateCausalSecondaryReaction(localFrame, 125, 3, 24);

  // V15 Idle Breathing Micro-Motion once settled (f >= 150)
  const breathing = calculateIdleBreathing(localFrame, 90, 0.012);

  // 4. Warning and Explanatory Text Reveals
  const cutoffLabelReveal = calculateMaskedPhraseReveal(localFrame, 125, 24);
  const warningReveal = calculateMaskedPhraseReveal(localFrame, 145, 24);

  // 5. Outgoing Transition 04 Carry (Planar Stage Fold at local 250 - 280f)
  const t4Fold = executePlanarStageFold(localFrame, 250, 280);

  return (
    <CameraGrammarRig mode="slow-dolly" durationInFrames={280} intensity={1.0}>
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
        {/* Layer 0: Depth Plane Radial Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 60% 50%, rgba(239, 68, 68, 0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 0: Background Precision Grid */}
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

        {/* Layer 4: Section Header Title */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 140,
            right: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleSlideY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: '#F8FAFC',
              letterSpacing: '-0.01em',
              marginBottom: 12,
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)',
            }}
          >
            {AUTHORIZED_CONTENT.shot04.sectionTitle.text}
          </div>
          <div
            style={{
              width: headerDraw.progress * 480,
              height: 3,
              backgroundColor: '#D4AF37',
              borderRadius: 2,
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
            }}
          />
        </div>

        {/* Layer 3: Main Chronological Ruler & Barrier Stage */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: `translate(-50%, -50%) perspective(1000px) rotateX(${t4Fold.rotateX}deg) translateY(${t4Fold.translateY + breathing.translateY}px) scale(${breathing.scale})`,
            width: 1400,
            height: 380,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.60) 0%, rgba(7, 10, 18, 0.85) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 24,
            backdropFilter: 'blur(20px)',
            boxShadow: `0 24px 64px rgba(0, 0, 0, 0.6)${barrierSecondary.active ? `, 0 0 ${32 * barrierSecondary.opacity}px rgba(239, 68, 68, ${0.4 * barrierSecondary.opacity})` : ''}`,
            padding: '48px 64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Stage Indicator: Authorized Education Window */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#38BDF8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                padding: '8px 24px',
                borderRadius: 20,
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              {AUTHORIZED_CONTENT.shot04.timelineStartPoint.text}
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                padding: '8px 28px',
                borderRadius: 20,
                border: '1px solid rgba(239, 68, 68, 0.4)',
                opacity: cutoffLabelReveal.opacity,
                transform: `scale(${cutoffLabelReveal.scale})`,
                boxShadow: barrierSecondary.active ? `0 0 ${20 * barrierSecondary.opacity}px rgba(239, 68, 68, 0.8)` : 'none',
              }}
            >
              {AUTHORIZED_CONTENT.shot04.timelineCutoffLabel.text}
            </div>
          </div>

          {/* Central 12-Month Chronological Tick Ruler */}
          <div style={{ position: 'relative', width: '100%', height: 70, margin: '20px 0' }}>
            {/* Base Ruler Rail */}
            <div
              style={{
                position: 'absolute',
                top: 35,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            />

            {/* Luminous Active Progress Trail */}
            <div
              style={{
                position: 'absolute',
                top: 35,
                left: 0,
                width: `${timelineProgress * 100}%`,
                height: 4,
                backgroundColor: '#38BDF8',
                borderRadius: 2,
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.9)',
              }}
            />

            {/* 13 Chronological Milestone Ticks (Month 0 to Month 12) */}
            {Array.from({ length: 13 }).map((_, i) => {
              const xPos = (i / 12) * 100;
              const isPast = timelineProgress >= i / 12;
              const isCutoff = i === 12;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${xPos}%`,
                    top: isCutoff ? 10 : 20,
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: isCutoff ? 6 : 2,
                      height: isCutoff ? 44 : 26,
                      backgroundColor: isCutoff ? '#EF4444' : isPast ? '#38BDF8' : 'rgba(255, 255, 255, 0.25)',
                      borderRadius: 2,
                      boxShadow: isCutoff
                        ? '0 0 20px rgba(239, 68, 68, 1)'
                        : isPast
                        ? '0 0 8px rgba(56, 189, 248, 0.6)'
                        : 'none',
                    }}
                  />
                  {/* Numerical Tick Stamp */}
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: isCutoff ? '#EF4444' : isPast ? '#F8FAFC' : '#64748B',
                      marginTop: 6,
                    }}
                  >
                    {i.toLocaleString('fa-IR')}
                  </div>
                </div>
              );
            })}

            {/* Luminous Moving Progress Head */}
            <div
              style={{
                position: 'absolute',
                left: `${timelineProgress * 100}%`,
                top: 25,
                transform: 'translate(-50%, -50%)',
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 20px rgba(56, 189, 248, 1)',
                border: '3px solid #FFFFFF',
              }}
            />

            {/* Red Barrier Gate Lock at Month 12 */}
            {localFrame >= 120 && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -20,
                  transform: `translate(50%, 0) scale(${barrierCollision.squashScaleX}, ${barrierCollision.squashScaleY})`,
                  width: 16,
                  height: 110,
                  backgroundColor: '#EF4444',
                  borderRadius: 4,
                  boxShadow: '0 0 32px rgba(239, 68, 68, 0.9), 0 0 8px #FFFFFF',
                }}
              />
            )}
          </div>

          {/* Bottom Legal Warning Narrative Statement */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#F8FAFC',
              lineHeight: 1.6,
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              padding: '16px 32px',
              borderRadius: 16,
              border: '1px solid rgba(255, 255, 255, 0.06)',
              opacity: warningReveal.opacity,
              transform: `translateY(${warningReveal.translateY}px)`,
            }}
          >
            {AUTHORIZED_CONTENT.shot04.timelineWarningText.text}
          </div>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
