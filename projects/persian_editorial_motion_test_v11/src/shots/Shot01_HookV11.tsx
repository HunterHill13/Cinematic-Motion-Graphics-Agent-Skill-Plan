import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeTypographySlam } from '../../../../src/motion/recipes/TypographySlamRecipe';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 01 — THE EDITORIAL HOOK & CANONICAL QUESTION (V11)
 * Frame Range: 0 - 350 (11.67s @ 30 FPS)
 * - Semantic Acoustic Sync: «دانشجوی پژوهشگر برجسته» (Frame 234)
 * - Motion Recipe: TypographySlam + PathRelay
 * - Outgoing Carry Contract (T1): Active Kinetic Underline accelerating leftward
 */
export const Shot01_HookV11: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: University Presentation Header (0 - 160f)
  const headerReveal = calculateDraw(frame, 15, 30, 480);
  const headerOpacity = interpolate(frame, [15, 35, 140, 160], [0, 1, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Main Question Reveal (160 - 234f)
  const questionStart = 175;
  const questionOpacity = interpolate(frame, [questionStart, questionStart + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const questionSlideY = interpolate(
    frame,
    [questionStart, questionStart + 25],
    [30, 0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Phase 3: Semantic Acoustic Sync for «دانشجوی پژوهشگر برجسته» (f234)
  const keywordSync = calculateSyncPhrase(frame, 'دانشجوی پژوهشگر برجسته');
  // Typography Slam Recipe at f234
  const typoSlam = executeTypographySlam(frame, 220, 234);

  // Baseline rule draw beneath keyphrase
  const baselineDraw = calculateDraw(frame, 234, 24, 760);

  // Outgoing Carry Object (T1: Active Kinetic Underline at f325 - 350)
  // Accelerates leftward, transforming into a motive velocity impulse entering Shot 02
  let carryUnderlineX = 0;
  let carryUnderlineScaleX = 1;
  let carryOpacity = 1;

  if (frame >= 325) {
    const rawT = Math.min(1, (frame - 325) / 25);
    const easeOut = Easing.bezier(0.7, 0, 0.9, 0.2)(rawT); // high acceleration
    carryUnderlineX = interpolate(easeOut, [0, 1], [0, -1100]);
    carryUnderlineScaleX = interpolate(easeOut, [0, 0.7, 1], [1, 2.5, 0.8]);
    carryOpacity = interpolate(rawT, [0, 0.8, 1], [1, 1, 0.9]);
  }

  return (
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
      {/* Background Architectural Grid & Subtle Telemetry */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Metadata Rail */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 14,
          fontFamily: 'monospace',
          fontSize: 13,
          color: '#64748B',
          letterSpacing: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#0284C7', fontWeight: 700 }}>SEC_01 // PROLOGUE</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: '#94A3B8' }}>IRANIAN MEDICAL RESEARCH PROTOCOL</span>
        </div>
        <div style={{ color: '#38BDF8' }}>ACCREDITATION CODE: KA-2-MED</div>
      </div>

      {/* Presentation Header: «دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند» */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          right: 180,
          left: 180,
          textAlign: 'center',
          opacity: headerOpacity,
          transform: `translateY(${interpolate(frame, [15, 35], [20, 0], { extrapolateRight: 'clamp' })}px)`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#94A3B8',
            letterSpacing: 0.5,
            marginBottom: 12,
          }}
        >
          دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند
        </div>
        <div
          style={{
            width: 240,
            height: 2,
            backgroundColor: '#0284C7',
            margin: '0 auto',
            transform: `scaleX(${headerReveal.progress})`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Main Core Editorial Question: «آیا می‌دانید چگونه می‌توان به عنوان» */}
      <div
        style={{
          position: 'absolute',
          top: 380,
          right: 160,
          left: 160,
          textAlign: 'center',
          opacity: questionOpacity,
          transform: `translateY(${questionSlideY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            color: '#E2E8F0',
            lineHeight: 1.4,
            marginBottom: 28,
          }}
        >
          آیا می‌دانید چگونه می‌توان به عنوان
        </div>

        {/* HERO KEYWORD MONOLITH: «دانشجوی پژوهشگر برجسته» */}
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            padding: '12px 36px',
            transform: `scale(${typoSlam.scale}) translateY(${typoSlam.offsetY + keywordSync.impactDisplacement}px)`,
            opacity: typoSlam.opacity,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#F59E0B',
              letterSpacing: `${typoSlam.letterSpacing}px`,
              textShadow: `0 0 ${20 * keywordSync.haloIntensity}px rgba(245, 158, 11, 0.7)`,
            }}
          >
            دانشجوی پژوهشگر برجسته
          </span>

          {/* Shockwave Rings on Frame 234 Contact */}
          {frame >= 234 && frame <= 270 && (
            <div
              style={{
                position: 'absolute',
                inset: -20,
                border: '2px solid rgba(245, 158, 11, 0.6)',
                borderRadius: 16,
                transform: `scale(${interpolate(frame - 234, [0, 36], [0.9, 1.4])})`,
                opacity: interpolate(frame - 234, [0, 6, 36], [1, 0.8, 0]),
                pointerEvents: 'none',
              }}
            />
          )}

          {/* ACTIVE KINETIC UNDERLINE (T1 CARRY OBJECT) */}
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              right: 0,
              left: 0,
              height: 4,
              backgroundColor: '#F59E0B',
              borderRadius: 2,
              boxShadow: '0 0 16px rgba(245, 158, 11, 0.8)',
              transform: `scaleX(${baselineDraw.progress * carryUnderlineScaleX}) translateX(${carryUnderlineX}px)`,
              transformOrigin: 'right center',
              opacity: carryOpacity,
            }}
          />
        </div>

        {/* Secondary Question Conclusion: «شناخته شد؟» */}
        <div
          style={{
            marginTop: 32,
            fontSize: 44,
            fontWeight: 600,
            color: '#CBD5E1',
            opacity: interpolate(frame, [250, 275], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          شناخته شد؟
        </div>
      </div>

      {/* Bottom Technical Frame & Acoustic Telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#475569',
        }}
      >
        <div>
          ACOUSTIC EVENT: <span style={{ color: '#F59E0B' }}>{keywordSync.currentPhase.toUpperCase()}</span> (f{frame})
        </div>
        <div>CARRY STATUS: {frame >= 325 ? 'T1_LAUNCH_ACTIVE' : 'STEADY_DATUM'}</div>
      </div>
    </div>
  );
};
