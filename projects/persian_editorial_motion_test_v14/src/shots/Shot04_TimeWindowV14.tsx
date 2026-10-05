import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateMaskedPhraseReveal } from '../../../../src/typography/typographyBehaviors';
import { executePlanarStageFold } from '../../../../src/transition/carryTransitions';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 04 — TEMPORAL CUTOFF & LEGAL CALENDAR (V14)
 * Strict Content Authority: 100% Source-Authorized Text
 * Frame Range: 1450 - 1730 (Global) / 0 - 280 (Local)
 * - Category: TimelineProcess
 * - Recipe: temporal-cutoff-timeline
 * - Camera: slow-dolly (1.000 -> 1.020)
 * - Visual Companion: 12-Month Chronological Tick Ruler + Red Barrier Gate
 * - Audio Sync: Barrier strike at global f1575 (local f125)
 * - Outgoing Carry (T4): Planar stage fold into base plinth (local 250 - 280f / global 1700 - 1730f)
 */
export const Shot04_TimeWindowV14: React.FC = () => {
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
        {/* Layer 0: Depth Plane & Atmospheric Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 60% 50%, rgba(239, 68, 68, 0.05) 0%, transparent 60%)',
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

        {/* Section Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.9)',
              }}
            />
            <h2
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)',
              }}
            >
              {AUTHORIZED_CONTENT.shot04.sectionTitle.text}
            </h2>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.9)',
              }}
            />
          </div>
          <div
            style={{
              width: headerDraw.progress * 480,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Visual Companion: 12-Month Chronological Ruler Gate */}
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: '50%',
            transform: `translateX(-50%) perspective(1000px) rotateX(${t4Fold.rotateX}deg) translateY(${t4Fold.translateY}px)`,
            width: 1300,
            height: 180,
            opacity: t4Fold.opacity,
          }}
        >
          {/* Main Horizontal Timeline Track */}
          <div
            style={{
              position: 'absolute',
              top: 80,
              left: 40,
              right: 40,
              height: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
            }}
          >
            {/* Luminous Active Progress Fill */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                width: `${timelineProgress * 100}%`,
                backgroundColor: '#38BDF8',
                borderRadius: 3,
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)',
              }}
            />
          </div>

          {/* 12 Chronological Month Ticks (Geometric vector ticks, zero text) */}
          {Array.from({ length: 13 }).map((_, i) => {
            const isOrigin = i === 0;
            const isCutoff = i === 12;
            const leftPct = (i / 12) * 100;
            const isPassed = timelineProgress >= (12 - i) / 12;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: isOrigin || isCutoff ? 55 : 68,
                  left: `calc(40px + (100% - 80px) * ${leftPct / 100})`,
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Tick Mark */}
                <div
                  style={{
                    width: isOrigin || isCutoff ? 4 : 2,
                    height: isOrigin || isCutoff ? 56 : 30,
                    backgroundColor: isCutoff
                      ? '#EF4444'
                      : isPassed
                      ? '#38BDF8'
                      : 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 1,
                    boxShadow: isCutoff ? '0 0 16px rgba(239, 68, 68, 0.8)' : 'none',
                  }}
                />
              </div>
            );
          })}

          {/* Start Point Label: دوران تحصیل */}
          <div
            style={{
              position: 'absolute',
              top: 15,
              right: 20,
              fontSize: 22,
              fontWeight: 800,
              color: '#38BDF8',
              textShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            }}
          >
            {AUTHORIZED_CONTENT.shot04.timelineStartPoint.text}
          </div>

          {/* Red Cutoff Barrier Gate Collision Component at Month 12 (f = 125) */}
          {localFrame >= 120 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scaleX(${barrierCollision.squashScaleX}) scaleY(${barrierCollision.squashScaleY})`,
              }}
            >
              {/* Barrier Hexagon Shield Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  border: '2px solid #EF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.8)',
                  marginBottom: 10,
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>

              {/* Vertical Laser Barrier */}
              <div
                style={{
                  width: 4,
                  height: 110,
                  backgroundColor: '#EF4444',
                  borderRadius: 2,
                  boxShadow: '0 0 20px rgba(239, 68, 68, 1)',
                }}
              />
            </div>
          )}
        </div>

        {/* Legal Cutoff Title & Warning Notice (Lower Section) */}
        <div
          style={{
            position: 'absolute',
            top: 590,
            left: 140,
            right: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Strict Deadline Label */}
          <div
            style={{
              overflow: 'hidden',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: '#EF4444',
                letterSpacing: '-0.01em',
                textShadow: '0 0 28px rgba(239, 68, 68, 0.5)',
                transform: `translateY(${cutoffLabelReveal.translateY}px)`,
                opacity: cutoffLabelReveal.opacity,
              }}
            >
              {AUTHORIZED_CONTENT.shot04.timelineCutoffLabel.text}
            </div>
          </div>

          {/* Critical Warning Statement Box */}
          <div
            style={{
              overflow: 'hidden',
              maxWidth: 1100,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#CBD5E1',
                lineHeight: 1.7,
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 14,
                padding: '20px 36px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                transform: `translateY(${warningReveal.translateY}px)`,
                opacity: warningReveal.opacity,
              }}
            >
              {AUTHORIZED_CONTENT.shot04.timelineWarningText.text}
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
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#EF4444', opacity: 0.6 }} />
            <div style={{ width: 40, height: 1, backgroundColor: 'rgba(239, 68, 68, 0.3)' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 40, height: 1, backgroundColor: 'rgba(239, 68, 68, 0.3)' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#EF4444', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
