import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { executeKineticUnderlineHandoff } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 01 — THE EDITORIAL HOOK & CANONICAL QUESTION (V13)
 * Frame Range: 0 - 380 (12.67s @ 30 FPS)
 * - Category: OpeningHook
 * - Recipe: hook-typography-slam
 * - Camera: micro-push (1.000 -> 1.025)
 * - Typography: KeywordStrike + BaselineTravel
 * - Visual Companion: Quadrant Architectural Brackets + Gold Kinetic Underline Ray
 * - Audio Sync: «پروژه جایگزین خدمت نخبگی» (Frame 234)
 * - Outgoing Carry (T1): Kinetic Underline Handoff into Shot 02 (f350 - 380)
 */
export const Shot01_HookV13: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Structural Header Reveal (0 - 160f)
  const headerOpacity = interpolate(frame, [15, 35, 150, 170], [0, 1, 1, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(frame, 15, 30, 480);

  // 2. Main Question Reveal (160 - 230f)
  const questionStart = 175;
  const questionOpacity = interpolate(frame, [questionStart, questionStart + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const questionSlideY = interpolate(
    frame,
    [questionStart, questionStart + 25],
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

  // Baseline Ray draw beneath keyphrase
  const baselineDraw = calculateDraw(frame, 234, 25, 820);

  // 4. Transition 01 Carry Outflow (350 - 380f)
  const t1Handoff = executeKineticUnderlineHandoff(frame, 350, 380, {
    startX: 960,
    endX: -200,
    initialWidth: 820,
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
        {/* Atmospheric Architectural Grid */}
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

        {/* Ambient Persian Watermark (Atmospheric Layer) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 160,
            fontWeight: 900,
            color: 'rgba(212, 175, 55, 0.02)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          بنیاد ملی نخبگان
        </div>

        {/* Quadrant Architectural Framing Brackets (Visual Companion) */}
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
              width: 40,
              height: 40,
              borderTop: '2px solid rgba(212, 175, 55, 0.4)',
              borderRight: '2px solid rgba(212, 175, 55, 0.4)',
            }}
          />
          {/* Top-Left Bracket */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 40,
              height: 40,
              borderTop: '2px solid rgba(212, 175, 55, 0.4)',
              borderLeft: '2px solid rgba(212, 175, 55, 0.4)',
            }}
          />
          {/* Bottom-Right Bracket */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 40,
              height: 40,
              borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
              borderRight: '2px solid rgba(212, 175, 55, 0.4)',
            }}
          />
          {/* Bottom-Left Bracket */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 40,
              height: 40,
              borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
              borderLeft: '2px solid rgba(212, 175, 55, 0.4)',
            }}
          />
        </div>

        {/* Top Institutional Header (Structural Layer) */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: 16,
            fontSize: 15,
            color: '#94A3B8',
            fontWeight: 600,
            opacity: headerOpacity,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
              }}
            />
            <span style={{ color: '#D4AF37', fontWeight: 800 }}>آیین‌نامه بنیاد ملی نخبگان</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span style={{ color: '#E2E8F0' }}>تسهیلات نظام‌وظیفه تخصصی</span>
          </div>
          <div style={{ color: '#38BDF8', fontWeight: 700 }}>ستاد کل نیروهای مسلح</div>
        </div>

        {/* Presentation Lead-In Header (0 - 160f) */}
        <div
          style={{
            position: 'absolute',
            top: 220,
            right: 160,
            left: 160,
            opacity: headerOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#94A3B8',
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}
          >
            بنیاد ملی نخبگان با همکاری ستاد کل نیروهای مسلح ارائه می‌دهد
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

        {/* Central Narrative Block (160 - 380f) */}
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: 160,
            right: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Provocative Question */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#CBD5E1',
              lineHeight: 1.6,
              opacity: questionOpacity,
              transform: `translateY(${questionSlideY}px)`,
              maxWidth: 1200,
            }}
          >
            آیا می‌دانید نخبگان و استعدادهای برتر دانشگاهی چگونه می‌توانند خدمت سربازی خود را
            از طریق پروژه‌های تحقیقاتی جایگزین کنند؟
          </div>

          {/* Hero Keyphrase Title with KeywordStrike at f = 234 */}
          {frame >= 210 && (
            <div
              style={{
                marginTop: 48,
                position: 'relative',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${keywordStrike.scale})`,
                opacity: keywordStrike.opacity,
              }}
            >
              <h1
                style={{
                  fontSize: 58,
                  fontWeight: 900,
                  margin: 0,
                  color: '#FFFFFF',
                  textShadow: '0 4px 28px rgba(212, 175, 55, 0.35)',
                  letterSpacing: '-0.02em',
                }}
              >
                پروژه جایگزین خدمت نخبگی
              </h1>

              {/* Kinetic Underline Ray & T1 Outflow Carry */}
              {frame < 350 ? (
                <div
                  style={{
                    width: baselineDraw.progress * 820,
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
                    top: 86,
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
        </div>

        {/* Footer Sub-Rule Datum */}
        <div
          style={{
            position: 'absolute',
            bottom: 70,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: '#64748B',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 14,
          }}
        >
          <span>تسهیلات پژوهشی جایگزین خدمت دوره‌های تحصیلات تکمیلی</span>
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>مرکز نخبگان و استعدادهای برتر</span>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
