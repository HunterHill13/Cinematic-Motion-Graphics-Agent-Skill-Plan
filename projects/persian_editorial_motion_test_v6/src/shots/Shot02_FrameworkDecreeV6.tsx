import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { KineticText } from '../../../../src/motion/kineticType';

/**
 * SHOT 02 (350 - 650f): Directive Decree & Legal Highway
 * Upgraded in V6:
 * - Inherits the Vector Beam from Shot 1.
 * - Bifurcates into an architectural highway with animated caliper coordinates.
 * - Replaces plain text with graphic legal milestones ("بند ک", "ماده ۲").
 * - Hands off into 3 structural pillars for Shot 3.
 */
export const Shot02_FrameworkDecreeV6: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance receives continuity beam from Shot 1 (0 - 45f)
  const beamInherited = interpolate(frame, [0, 35], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const entrance = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const highwayProgress = interpolate(frame, [25, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS HANDOFF T2 TO SHOT 3 (245 - 290f: 45 frames smooth transition window)
  const exitProgress = interpolate(frame, [245, 290], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const headerExitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });
  const pillarHeight = interpolate(exitProgress, [0, 1], [4, 620], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040711',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.08) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Continuity Beam from Shot 1 */}
      {beamInherited > 0.01 && (
        <div
          style={{
            position: 'absolute',
            top: 540,
            left: 160,
            right: 160,
            height: 4,
            backgroundColor: '#38BDF8',
            opacity: beamInherited,
            boxShadow: '0 0 24px #38BDF8',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Header Eyebrow & Decree Title */}
      <div
        style={{
          position: 'absolute',
          top: 75,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: entrance * headerExitOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            padding: '6px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            marginBottom: 16,
            fontSize: 15,
            fontWeight: 700,
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#D4AF37' }} />
          <span>مرجع قانونی و مصوبه رسمی</span>
        </div>

        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: '#F8FAFC',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          بند «ک» ماده ۲ آیین‌نامه ارتقای اعضای هیئت علمی
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
          مصوب شورای هدایت استعدادهای درخشان و وزارت بهداشت، درمان و آموزش پزشکی
        </p>
      </div>

      {/* Graphic Legal Highway Architecture (Vector Rails & Milestones) */}
      <div
        style={{
          position: 'absolute',
          top: 310,
          left: 140,
          right: 140,
          bottom: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: entrance,
        }}
      >
        {/* Main Central Vector Track */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-50%)',
          }}
        >
          {/* Active Pulsing Energy Highway */}
          <div
            style={{
              position: 'absolute',
              top: -1,
              left: 0,
              width: `${highwayProgress * 100}%`,
              height: 4,
              backgroundColor: '#38BDF8',
              boxShadow: '0 0 16px #38BDF8',
              borderRadius: 2,
            }}
          />
        </div>

        {/* 2 Graphic Caliper Monoliths (NOT web cards) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            direction: 'rtl',
            zIndex: 10,
          }}
        >
          {/* Milestone 1: Section Kaf */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(8, 16, 34, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 20,
              padding: '28px 40px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              minWidth: 380,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#38BDF8', letterSpacing: '1px' }}>
              SECTION KAF • بند «ک»
            </span>
            <span style={{ fontSize: 32, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              تسهیلات آموزشی و پژوهشی
            </span>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 8, textAlign: 'center' }}>
              اختصاص سهمیه مستقیم به نخبگان جهت ورود به مقاطع بالاتر
            </span>
          </div>

          {/* Center Intersection Node */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#040711',
              border: '2px solid #D4AF37',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#D4AF37' }} />
          </div>

          {/* Milestone 2: Article 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(8, 16, 34, 0.75)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: 20,
              padding: '28px 40px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              minWidth: 380,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: '#D4AF37', letterSpacing: '1px' }}>
              ARTICLE 2 • ماده ۲
            </span>
            <span style={{ fontSize: 32, fontWeight: 900, color: '#F8FAFC', marginTop: 8 }}>
              ارتقای نخبگان و سرآمدان
            </span>
            <span style={{ fontSize: 16, color: '#94A3B8', marginTop: 8, textAlign: 'center' }}>
              شیوه‌نامه اجرایی مصوب دانشگاه علوم پزشکی بقیة‌الله
            </span>
          </div>
        </div>
      </div>

      {/* T2 HANDOFF: Highway Node Stretches into 3 Vertical Energy Pillars for Shot 3 */}
      {exitProgress > 0.01 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
          {[360, 960, 1560].map((xPos, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: 540,
                left: xPos,
                transform: 'translate(-50%, -50%)',
                width: 4,
                height: pillarHeight,
                backgroundColor: idx === 1 ? '#D4AF37' : '#38BDF8',
                boxShadow: `0 0 20px ${idx === 1 ? '#D4AF37' : '#38BDF8'}`,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
