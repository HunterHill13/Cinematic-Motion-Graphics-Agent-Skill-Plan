import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { KineticText } from '../../../../src/motion/kineticType';
import { ShapeMorph } from '../../../../src/motion/shapeMorph';

/**
 * SHOT 01 (0 - 380f): Institutional Genesis & Core Hook
 * Upgraded in V6:
 * - Replaces simple opacity fades with kinetic typography and geometric reticle assembly.
 * - Outgoing transition morphs the central compass into a high-energy Vector Beam for Shot 2.
 */
export const Shot01_IntroHookV6: React.FC = () => {
  const frame = useCurrentFrame();

  // Part 1: Baqiyatallah PR Opening (0 - 170f)
  const sealScale = interpolate(frame, [0, 45], [0.75, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const reticleStroke = interpolate(frame, [0, 45], [500, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const part1Op = interpolate(frame, [145, 170], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  // Part 2: Hook question reveal (150 - 380f)
  const hookEntrance = interpolate(frame, [155, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS HANDOFF T1 TO SHOT 2 (335 - 380f: 45 frames smooth transition window)
  const exitProgress = interpolate(frame, [335, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const contentExitOp = interpolate(exitProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' });

  // Central emblem morphs continuously into the horizontal Vector Beam for Shot 2
  const beamWidth = interpolate(exitProgress, [0.1, 0.9], [40, 1600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const beamOp = interpolate(exitProgress, [0.1, 0.4, 1.0], [0, 1, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ringRot = (frame * 0.35) % 360;

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
      {/* Layer 0: Background Deep Space Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Part 1: Baqiyatallah PR Opening (0 - 170f) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: part1Op,
        }}
      >
        <div style={{ transform: `scale(${sealScale})`, marginBottom: 32, position: 'relative' }}>
          <svg width={180} height={180} viewBox="0 0 180 180">
            <circle
              cx={90}
              cy={90}
              r={80}
              fill="none"
              stroke="rgba(212, 175, 55, 0.3)"
              strokeWidth="2"
              strokeDasharray="6 6"
              style={{ transformOrigin: '90px 90px', transform: `rotate(${ringRot}deg)` }}
            />
            <circle
              cx={90}
              cy={90}
              r={65}
              fill="rgba(8, 16, 32, 0.9)"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeDasharray="410"
              strokeDashoffset={reticleStroke}
            />
            <path
              d="M 90 45 C 105 60 115 75 90 105 C 65 75 75 60 90 45 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
            />
            <circle cx={90} cy={90} r={8} fill="#38BDF8" />
          </svg>
        </div>

        <KineticText
          text="روابط عمومی کمیته تحقیقات و فناوری دانشجویی"
          frame={frame}
          startFrame={15}
          duration={25}
          style={{ fontSize: 28, fontWeight: 700, color: '#D4AF37', marginBottom: 12 }}
          highlightWords={['کمیته', 'تحقیقات']}
          highlightColor="#F8FAFC"
        />

        <KineticText
          text="دانشگاه علوم پزشکی بقیة‌الله (عج) تقدیم می‌کند"
          frame={frame}
          startFrame={35}
          duration={25}
          style={{ fontSize: 36, fontWeight: 900, color: '#F8FAFC' }}
          highlightWords={['بقیة‌الله']}
          highlightColor="#D4AF37"
        />
      </div>

      {/* Part 2: Hook Question (150 - 380f) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hookEntrance * contentExitOp,
          direction: 'rtl',
        }}
      >
        {/* Kinetic Badge */}
        <div
          style={{
            padding: '6px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38BDF8' }} />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#38BDF8' }}>راهنمای تسهیلات بنیاد ملی نخبگان</span>
        </div>

        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: '#F8FAFC',
            textAlign: 'center',
            lineHeight: 1.35,
            margin: 0,
            maxWidth: 1100,
          }}
        >
          آیا می‌دانید چگونه می‌توانید به‌عنوان{' '}
          <span style={{ color: '#D4AF37', textShadow: '0 0 25px rgba(212, 175, 55, 0.4)' }}>
            دانشجوی پژوهشگر برجسته
          </span>
          <br />
          از امتیازات بنیاد ملی نخبگان بهره‌مند شوید؟
        </h1>
      </div>

      {/* T1 HANDOFF: Vector Energy Beam Shooting Across Horizon */}
      {beamOp > 0.01 && (
        <div
          style={{
            position: 'absolute',
            top: 540,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: beamWidth,
            height: 4,
            backgroundColor: '#38BDF8',
            boxShadow: '0 0 24px #38BDF8, 0 0 48px #38BDF880',
            opacity: beamOp,
            borderRadius: 2,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
