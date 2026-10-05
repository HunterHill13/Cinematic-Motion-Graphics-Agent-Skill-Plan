import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeObjectHandoff } from '../../../../src/motion/recipes/ObjectHandoff';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 02 — LEGAL AUTHORITY & ARTICLE 2 DECREE (V11)
 * Frame Range: 350 - 620 (Global) / 0 - 270 (Local)
 * - Incoming Carry (T1): High-speed kinetic impulse contacts Numeral «۲» at local f45 (global f395)
 * - Semantic Acoustic Sync: «بند کاف ماده ۲» (global f395 / local f45)
 * - Motion Recipes: ObjectHandoff + ImpactAndRipple
 * - Outgoing Carry (T2): Article 2 entity prepares for Triad division (local f240 - 270)
 */
export const Shot02_DecreeV11: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 350;

  // Semantic Acoustic Sync for «بند کاف ماده ۲» (global f395 -> local f45)
  const statuteSync = calculateSyncPhrase(globalFrame, 'بند کاف ماده ۲');

  // Recipe: ObjectHandoff (incoming kinetic baton pass from Shot 01)
  // Impulse travels from right to center (x: 1700 -> 960), contacts at local f45
  const handoff = executeObjectHandoff(
    localFrame,
    0,
    45,
    90,
    { x: 1700, y: 540 },
    { x: 960, y: 540 },
    { x: 960, y: 460 }
  );

  // Impact and Collision dynamics on Numeral «۲»
  const collision = calculateCollision(localFrame, 45, {
    reboundAmplitude: 12,
    decay: 0.2,
    maxSquash: 0.16,
  });

  // Concentric Shockwave ring on local f45
  const ripple = calculateRipple(localFrame, 45, 30, 220, 3);

  // Decorative vector border draw
  const borderDraw = calculateDraw(localFrame, 45, 35, 960);

  // Subtitle reveal: «آیین‌نامه ارتقای اعضای هیئت علمی» (global f435 -> local f85)
  const subtitleOpacity = interpolate(localFrame, [75, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subtitleSlideY = interpolate(localFrame, [75, 100], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Outgoing Carry (T2 Fission Anticipation at local f240 - 270 / global f590 - 620)
  // Numeral «۲» expands slightly and glows, ready to split into 3 nodes in Shot 03
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
      {/* Background Architectural Grid */}
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

      {/* Incoming T1 Motive Impulse Carrier (0 - 45f) */}
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

      {/* Top Header Rail */}
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
          <span style={{ color: '#0284C7', fontWeight: 700 }}>SEC_02 // STATUTE DECREE</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: '#94A3B8' }}>MINISTRY OF HEALTH & MEDICAL EDUCATION</span>
        </div>
        <div style={{ color: '#F59E0B' }}>ARTICLE 2 // SUB-CLAUSE KAAF</div>
      </div>

      {/* CENTRAL HERO ARCHITECTURAL MONOLITH */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: '50%',
          transform: `translateX(-50%) translateY(${collision.displacementY}px) scale(${collision.squashScaleX * fissionScale}, ${collision.squashScaleY * fissionScale})`,
          width: 720,
          height: 620,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
          boxShadow: `0 24px 64px rgba(0, 0, 0, 0.6), 0 0 ${40 * fissionGlow}px rgba(56, 189, 248, 0.4)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          boxSizing: 'border-box',
          opacity: handoff.destination.opacity,
        }}
      >
        {/* Animated Architectural Border Line */}
        <div
          style={{
            position: 'absolute',
            inset: 12,
            border: '2px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 10,
            clipPath: `inset(0 ${100 - borderDraw.progress * 100}% 0 0)`,
          }}
        />

        {/* Small Intro Badge: «طبق آیین‌نامه» */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: '#94A3B8',
            marginBottom: 16,
            letterSpacing: 0.5,
          }}
        >
          طبق مقررات رسمی مصوب
        </div>

        {/* MONUMENTAL TITLE: «بند کاف ماده ۲» */}
        <div
          style={{
            position: 'relative',
            fontSize: 76,
            fontWeight: 900,
            color: '#F8FAFC',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            marginBottom: 20,
            letterSpacing: -1,
          }}
        >
          <span style={{ color: '#38BDF8' }}>بند کاف</span> ماده ۲
          {/* Accent Gold Numeral Badge */}
          <div
            style={{
              position: 'absolute',
              top: -30,
              left: -40,
              fontSize: 120,
              fontWeight: 900,
              color: 'rgba(245, 158, 11, 0.12)',
              pointerEvents: 'none',
            }}
          >
            ۲
          </div>
        </div>

        {/* Shockwave Rings on Contact */}
        {ripple.active && (
          <div
            style={{
              position: 'absolute',
              width: ripple.radius * 2,
              height: ripple.radius * 2,
              borderRadius: '50%',
              border: `${ripple.strokeWidth}px solid rgba(56, 189, 248, 0.6)`,
              opacity: ripple.opacity,
              boxShadow: '0 0 24px rgba(56, 189, 248, 0.5)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Horizontal Divider Bar */}
        <div
          style={{
            width: 380,
            height: 3,
            backgroundColor: '#0284C7',
            marginBottom: 24,
            borderRadius: 2,
          }}
        />

        {/* OFFICIAL SUBTITLE: «آیین‌نامه ارتقای اعضای هیئت علمی» */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: '#F59E0B',
            textAlign: 'center',
            lineHeight: 1.5,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleSlideY}px)`,
          }}
        >
          آیین‌نامه ارتقای اعضای هیئت علمی
        </div>

        {/* Archival Stamp & Legal Seal */}
        <div
          style={{
            marginTop: 28,
            fontSize: 16,
            color: '#64748B',
            border: '1px dashed rgba(255, 255, 255, 0.2)',
            padding: '6px 20px',
            borderRadius: 6,
            fontFamily: 'monospace',
          }}
        >
          REGISTRATION ID: BUMS-ARTICLE-02 // VERIFIED
        </div>
      </div>

      {/* Bottom Technical Telemetry */}
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
          ACOUSTIC STATUS: <span style={{ color: '#38BDF8' }}>{statuteSync.currentPhase.toUpperCase()}</span> (f{globalFrame})
        </div>
        <div>
          CARRY CONTRACT T2: {localFrame >= 240 ? 'FISSION_ACTIVE' : 'MONOLITH_LOCKED'}
        </div>
      </div>
    </div>
  );
};
