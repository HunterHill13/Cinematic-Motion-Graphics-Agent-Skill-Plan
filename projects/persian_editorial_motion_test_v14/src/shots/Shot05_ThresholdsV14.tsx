import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeGravitationalSingularity } from '../../../../src/transition/carryTransitions';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';

/**
 * SHOT 05 — ACADEMIC SCORE THRESHOLD PEDESTALS (V14)
 * Strict Content Authority: 100% Source-Authorized Text
 * Frame Range: 1700 - 2185 (Global) / 0 - 485 (Local)
 * - Category: DataNumbers
 * - Recipe: score-threshold-pedestals
 * - Camera: continuous (1.000 -> 1.025, cy: 550 -> 530)
 * - Visual Companion: Three Monumental Architectural Plinths (65, 110, 130) + Metallic Score Badges
 * - Audio Sync Milestones:
 *     f1914 (local 214f): «کارشناسی ۶۵ امتیاز»
 *     f2010 (local 310f): «پزشکی عمومی ۱۱۰ امتیاز»
 *     f2100 (local 400f): «دکترای تخصصی ۱۳۰ امتیاز»
 * - Outgoing Carry (T5): Gravitational Singularity handoff into Shot 06 (local 455 - 485f)
 */
export const Shot05_ThresholdsV14: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Header Title Reveal
  const titleOpacity = interpolate(localFrame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [10, 35], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(localFrame, 15, 25, 480);

  // 2. Pedestals Progressive Elevation
  // Pedestal 1: Bachelor (کارشناسی - ۶۵) at local f = 214
  const p1Rise = interpolate(localFrame, [60, 120], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p1Score = interpolate(localFrame, [140, 214], [0, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p1Lock = calculateKeywordStrike(localFrame, 214, { scalePeak: 1.15 });

  // Pedestal 2: Medicine (پزشکی عمومی - ۱۱۰) at local f = 310
  const p2Rise = interpolate(localFrame, [150, 210], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p2Score = interpolate(localFrame, [230, 310], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p2Lock = calculateKeywordStrike(localFrame, 310, { scalePeak: 1.15 });

  // Pedestal 3: PhD (دکترای تخصصی - ۱۳۰) at local f = 400
  const p3Rise = interpolate(localFrame, [240, 300], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p3Score = interpolate(localFrame, [320, 400], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const p3Lock = calculateKeywordStrike(localFrame, 400, { scalePeak: 1.15 });

  // Ground Base Rule
  const groundDraw = calculateDraw(localFrame, 30, 40, 1200);

  // 3. Outgoing Transition 05 Carry (Gravitational Singularity at local 455 - 485f)
  const t5Singularity = executeGravitationalSingularity(localFrame, 455, 485);

  return (
    <CameraGrammarRig mode="continuous" durationInFrames={485} intensity={1.0}>
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
            background: 'radial-gradient(circle at 50% 60%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
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
                fontSize: 34,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)',
              }}
            >
              {AUTHORIZED_CONTENT.shot05.sectionTitle.text}
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

        {/* Architectural Ground Baseline */}
        <div
          style={{
            position: 'absolute',
            bottom: 180,
            left: '50%',
            transform: 'translateX(-50%)',
            width: groundDraw.progress * 1200,
            height: 3,
            backgroundColor: 'rgba(212, 175, 55, 0.35)',
            boxShadow: '0 0 16px rgba(212, 175, 55, 0.5)',
          }}
        />

        {/* Three Monumental Architectural Plinths (Visual Companion) */}
        <div
          style={{
            position: 'absolute',
            bottom: 183,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1100,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/* ===================== PLINTH 1: BACHELOR (65) ===================== */}
          <div
            style={{
              width: 310,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Score & Degree Info Box */}
            <div
              style={{
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${p1Lock.scale})`,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: localFrame >= 214 ? '#D4AF37' : '#94A3B8',
                  textShadow: localFrame >= 214 ? '0 0 25px rgba(212, 175, 55, 0.7)' : 'none',
                  lineHeight: 1,
                }}
              >
                {localFrame >= 214 ? AUTHORIZED_CONTENT.shot05.tier1Score.text : Math.round(p1Score)}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#D4AF37', marginTop: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier1Unit.text}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginTop: 12 }}>
                {AUTHORIZED_CONTENT.shot05.tier1Degree.text}
              </div>
            </div>

            {/* Rising Architectural Column */}
            <div
              style={{
                width: '100%',
                height: p1Rise * 180,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderBottom: 'none',
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(212, 175, 55, 0.1)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
              }}
            >
              {/* Beveled Top Edge Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: '#D4AF37',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
                }}
              />
            </div>
          </div>

          {/* ===================== PLINTH 2: MEDICINE (110) ===================== */}
          <div
            style={{
              width: 310,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Score & Degree Info Box */}
            <div
              style={{
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${p2Lock.scale})`,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: localFrame >= 310 ? '#38BDF8' : '#94A3B8',
                  textShadow: localFrame >= 310 ? '0 0 25px rgba(56, 189, 248, 0.7)' : 'none',
                  lineHeight: 1,
                }}
              >
                {localFrame >= 310 ? AUTHORIZED_CONTENT.shot05.tier2Score.text : Math.round(p2Score)}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#38BDF8', marginTop: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier2Unit.text}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginTop: 12 }}>
                {AUTHORIZED_CONTENT.shot05.tier2Degree.text}
              </div>
            </div>

            {/* Rising Architectural Column */}
            <div
              style={{
                width: '100%',
                height: p2Rise * 300,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderBottom: 'none',
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(56, 189, 248, 0.1)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: '#38BDF8',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)',
                }}
              />
            </div>
          </div>

          {/* ===================== PLINTH 3: PHD (130) ===================== */}
          <div
            style={{
              width: 310,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Score & Degree Info Box */}
            <div
              style={{
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${p3Lock.scale})`,
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: localFrame >= 400 ? '#D4AF37' : '#94A3B8',
                  textShadow: localFrame >= 400 ? '0 0 25px rgba(212, 175, 55, 0.7)' : 'none',
                  lineHeight: 1,
                }}
              >
                {localFrame >= 400 ? AUTHORIZED_CONTENT.shot05.tier3Score.text : Math.round(p3Score)}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#D4AF37', marginTop: 4 }}>
                {AUTHORIZED_CONTENT.shot05.tier3Unit.text}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', marginTop: 12 }}>
                {AUTHORIZED_CONTENT.shot05.tier3Degree.text}
              </div>
            </div>

            {/* Rising Architectural Column */}
            <div
              style={{
                width: '100%',
                height: p3Rise * 420,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                borderBottom: 'none',
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 0 35px rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(212, 175, 55, 0.15)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  backgroundColor: '#D4AF37',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.9)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Transition 05 Gravitational Singularity Vectors (local 455 - 485f) */}
        {localFrame >= 455 && (
          <div
            style={{
              position: 'absolute',
              top: 540,
              left: 960,
              transform: `translate(-50%, -50%) scale(${t5Singularity.scale})`,
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              boxShadow: `0 0 ${t5Singularity.glow}px rgba(212, 175, 55, 1)`,
              opacity: t5Singularity.opacity,
              pointerEvents: 'none',
            }}
          />
        )}

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
