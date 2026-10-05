import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeObjectHandoff } from '../../../../src/motion/recipes/ObjectHandoff';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 02 — THE OFFICIAL STATUTE DECREE (V12)
 * Frame Range: 350 - 620 (11.67s - 20.67s / 270 frames)
 * - Level 3 Archetype: Legal Authority & Decree
 * - Level 2 Recipe: ObjectHandoff + ImpactAndRippleRecipe
 * - 100% Pure Persian Script typography (Zero English metadata)
 * - Incoming Carry (T1): Motive impulse from Shot 01 impacts apex of Numeral «۲» at Frame 395
 * - Acoustic Sync: «بند کاف ماده ۲» (f395) & «آیین‌نامه ارتقای اعضای هیئت علمی» (f435)
 * - Outgoing Carry (T2): Numeral «۲» prepares for tripartite branching into Shot 03
 */
export const Shot02_DecreeV12: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = 350 + localFrame;

  // Incoming Carry Baton (T1 ObjectHandoff: local 0 - 45f / global 350 - 395f)
  const handoff = executeObjectHandoff(
    localFrame,
    0,
    45,
    90,
    { x: 1700, y: 540 },
    { x: 960, y: 540 },
    { x: 960, y: 460 }
  );

  // Impact Collision at Frame 395 (local 45f)
  const collision = calculateCollision(localFrame, 45, {
    reboundAmplitude: 12,
    decay: 0.2,
    maxSquash: 0.16,
  });

  // Radial shockwave ripples emanating from Numeral «۲» apex
  const ripple1 = calculateRipple(localFrame, 45, 40, 240);
  const ripple2 = calculateRipple(localFrame, 52, 45, 360);

  // Semantic Speech Sync
  const statuteSync = calculateSyncPhrase(globalFrame, {
    phrase: 'بند کاف ماده ۲',
    shotStartFrame: 350,
  });

  const decreeSync = calculateSyncPhrase(globalFrame, {
    phrase: 'آیین‌نامه ارتقای اعضای هیئت علمی',
    shotStartFrame: 350,
  });

  // Architectural Framing & Seal Draw
  const sealDraw = calculateDraw(localFrame, 40, 30, 600);
  const decreeReveal = calculateDraw(localFrame, 80, 25, 800);

  // Outgoing Carry (T2 Fission Anticipation at local 240 - 270f)
  let fissionScale = 1.0;
  let fissionGlow = 0;
  if (localFrame >= 240) {
    const rawF = (localFrame - 240) / 30;
    fissionScale = interpolate(rawF, [0, 1], [1.0, 1.12]);
    fissionGlow = interpolate(rawF, [0, 1], [0, 1]);
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
      {/* Background Architectural Grid (Role D: Atmospheric) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Incoming T1 Motive Impulse Carrier (0 - 45f) (Role C: Kinetic) */}
      {localFrame < 45 && (
        <div
          style={{
            position: 'absolute',
            left: handoff.source.x,
            top: handoff.source.y - 3,
            width: 80,
            height: 6,
            backgroundColor: '#F59E0B',
            borderRadius: 3,
            boxShadow: '0 0 20px #F59E0B',
            opacity: handoff.source.opacity,
          }}
        />
      )}

      {/* Top Institutional Header (Role B: Structural) */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 16,
          fontSize: 14,
          color: '#94A3B8',
          fontWeight: 500,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#0284C7', fontWeight: 700 }}>سند مصوب وزارت بهداشت</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span>معاونت تحقیقات و فناوری</span>
        </div>
        <div style={{ color: '#F59E0B', fontWeight: 600 }}>مرجع قانونی گزینش</div>
      </div>

      {/* CENTRAL HERO ARCHITECTURAL MONOLITH (Role A: Narrative + Role B: Structural) */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: '50%',
          transform: `translateX(-50%) translateY(${collision.displacementY}px) scale(${collision.squashScaleX * fissionScale}, ${collision.squashScaleY * fissionScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Heraldic Legal Seal Frame */}
        <div
          style={{
            position: 'relative',
            width: 220,
            height: 220,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Circular Architectural Orbit Ring */}
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            style={{
              position: 'absolute',
              inset: 0,
              transform: `rotate(${localFrame * 0.4}deg)`,
            }}
          >
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity={sealDraw.progress * 0.6}
            />
            <circle
              cx="110"
              cy="110"
              r="88"
              fill="rgba(2, 132, 199, 0.04)"
              stroke="rgba(245, 158, 11, 0.4)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Impact Shockwaves at f45 Contact (Role C: Kinetic) */}
          {ripple1.active && (
            <div
              style={{
                position: 'absolute',
                width: ripple1.radius * 2,
                height: ripple1.radius * 2,
                borderRadius: '50%',
                border: '2px solid #F59E0B',
                opacity: ripple1.opacity,
                pointerEvents: 'none',
              }}
            />
          )}
          {ripple2.active && (
            <div
              style={{
                position: 'absolute',
                width: ripple2.radius * 2,
                height: ripple2.radius * 2,
                borderRadius: '50%',
                border: '1.5px solid #38BDF8',
                opacity: ripple2.opacity,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Monumental Numeral «۲» Monolith */}
          <span
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: '#F59E0B',
              textShadow: `0 0 ${24 + fissionGlow * 30}px rgba(245, 158, 11, ${0.6 + fissionGlow * 0.4})`,
              transform: `scale(${statuteSync.scaleMultiplier})`,
              userSelect: 'none',
            }}
          >
            ۲
          </span>
        </div>

        {/* Legal Statute Headline: «بند کاف ماده ۲» */}
        <div
          style={{
            marginTop: 24,
            fontSize: 52,
            fontWeight: 800,
            color: '#F8FAFC',
            letterSpacing: 0.5,
            opacity: interpolate(localFrame, [35, 50], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${statuteSync.impactDisplacement}px)`,
          }}
        >
          بند کاف ماده ۲
        </div>

        {/* Divider Datum Bar */}
        <div
          style={{
            marginTop: 16,
            width: 320,
            height: 3,
            backgroundColor: '#0284C7',
            transform: `scaleX(${decreeReveal.progress})`,
            transformOrigin: 'center',
          }}
        />

        {/* Official Statute Subtitle: «آیین‌نامه ارتقای اعضای هیئت علمی» */}
        <div
          style={{
            marginTop: 22,
            fontSize: 32,
            fontWeight: 600,
            color: '#38BDF8',
            opacity: interpolate(localFrame, [75, 95], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${decreeSync.impactDisplacement}px)`,
          }}
        >
          آیین‌نامه ارتقای اعضای هیئت علمی
        </div>

        {/* Accreditation Context Seal Card */}
        <div
          style={{
            marginTop: 28,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            borderRadius: 12,
            padding: '12px 32px',
            fontSize: 18,
            color: '#94A3B8',
            opacity: interpolate(localFrame, [95, 115], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          مصوب شورای عالی انقلاب فرهنگی و وزارت بهداشت • ملاک شناسایی نخبگان
        </div>
      </div>

      {/* Bottom Editorial Footnote (Role B: Structural - Pure Persian) */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 13,
          color: '#64748B',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: 14,
        }}
      >
        <div>استناد رسمی: ماده دوم آیین‌نامه ارتقا • بند ک</div>
        <div>دستورالعمل اجرایی انتخاب دانشجوی پژوهشگر برجسته</div>
      </div>
    </div>
  );
};
