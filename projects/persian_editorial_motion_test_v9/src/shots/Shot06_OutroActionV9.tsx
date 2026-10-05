import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import {
  calculateKineticEntry,
  calculateScalePunch,
  calculateShockwave,
  calculateSecondaryFollower,
} from '../motion/reactions/reactionEngine';
import { AmbientGrid } from '../motion/ambient/AmbientGrid';
import { TravelingMotif } from '../motion/actors/TravelingMotif';
import {
  CoordinateBrackets,
  OrbitingNode,
  ImpactShockwave,
} from '../motion/actors/SecondaryActors';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & SIGN-OFF
 * V9 Multi-Actor Choreography:
 * - Inherits the high-density energy point at (960, 540) from Shot 05.
 * - Detonates outward into Actor A (Baqiyatallah PR Crest) with elastic settle.
 * - Traveling Motif embeds itself as the eternal center emerald jewel of the seal.
 * - Directional reveal of authoritative institutional sign-off typography.
 * - Concentric calibration rings, secondary brackets, and dignified stillness hold
 *   as the master score resolves.
 */
export const Shot06_OutroActionV9: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Re-emergence of Actor A (Crest) from center energy node
  const crestExpansion = interpolate(frame, [5, 45], [0.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const crestPunch = calculateScalePunch(frame, 45, 1.08, 14);
  const crestShockwave = calculateShockwave(frame, 45, 260, 28);
  const followerBrackets = calculateSecondaryFollower(frame, 45, 5, 20, 15);

  // Outer concentric calibration ring expansion
  const outerRingScale = interpolate(frame, [45, 80], [0.8, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const outerRingOp = interpolate(frame, [45, 80], [0, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typography kinetic reveals
  const titleEntry = calculateKineticEntry(frame, 35, 30, 35);
  const subtitleEntry = calculateKineticEntry(frame, 55, 30, 25);

  // Divider expansion
  const dividerWidth = interpolate(frame, [50, 80], [0, 160], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Dignified breathing micro-motion during final hold (80 - 206f)
  const breathing = frame >= 80
    ? 1.0 + 0.003 * Math.sin(((frame - 80) / 60) * Math.PI)
    : 1.0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#030611',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', sans-serif",
      }}
    >
      {/* LAYER 0: Deep Atmospheric Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* LAYER 1: Ambient Grid & Registration Marks */}
      <AmbientGrid color="rgba(212, 175, 55, 0.05)" glowColor="rgba(212, 175, 55, 0.08)" />

      {/* LAYER 2: Editorial Divider Rule */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: '50%',
          transform: 'translateX(-50%)',
          width: dividerWidth,
          height: 2,
          backgroundColor: '#D4AF37',
          boxShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 3: The Traveling Motif (Permanent Jewel of the Seal) */}
      <TravelingMotif
        x={960}
        y={frame < 45 ? 540 : 405}
        scale={frame < 45 ? interpolate(frame, [0, 45], [1.5, 1.0]) : 1.0}
        color="#10B981"
        glowColor="rgba(16, 185, 129, 0.8)"
        opacity={entrance}
        wakeLength={0}
      />

      {/* LAYER 4: Secondary Actors */}
      {/* Radial Shockwave on Crest Lock */}
      <ImpactShockwave
        centerX={960}
        centerY={405}
        radius={crestShockwave.radius}
        opacity={crestShockwave.opacity}
        color="#D4AF37"
        strokeWidth={crestShockwave.strokeWidth}
      />

      {/* Outer Concentric Calibration Ring */}
      {frame >= 45 && (
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 405,
            transform: `translate(-50%, -50%) scale(${outerRingScale})`,
            width: 260,
            height: 260,
            borderRadius: '50%',
            border: '1.5px dashed rgba(212, 175, 55, 0.5)',
            opacity: outerRingOp,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Orbiting Satellite around Crest */}
      <OrbitingNode
        centerX={960}
        centerY={405}
        radiusX={135}
        radiusY={135}
        speed={0.03}
        color="#D4AF37"
        opacity={frame >= 45 ? 0.75 : 0}
      />

      {/* Coordinate Brackets Framing Entire Typography Monolith */}
      <CoordinateBrackets
        x={960}
        y={650}
        width={1020}
        height={260}
        bracketSize={24}
        color="rgba(212, 175, 55, 0.45)"
        opacity={followerBrackets.opacity}
        scale={1.0}
      />

      {/* LAYER 5 & 6: Primary Graphic Entities & Institutional Sign-off Typography */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 120px',
          direction: 'rtl',
          opacity: entrance,
          transform: `scale(${breathing})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* Authoritative Crest Container */}
        <div
          style={{
            transform: `scale(${crestExpansion * crestPunch})`,
            marginBottom: 36,
            position: 'relative',
          }}
        >
          <svg width={200} height={200} viewBox="0 0 200 200">
            <circle cx={100} cy={100} r={90} fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth={2} />
            <circle cx={100} cy={100} r={75} fill="rgba(8, 16, 34, 0.85)" stroke="#D4AF37" strokeWidth={3} />
            <circle cx={100} cy={100} r={60} fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeDasharray="5 3" strokeWidth={1} />
            <path
              d="M 100 48 C 116 64 126 85 100 118 C 74 85 84 64 100 48 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth={3}
            />
          </svg>
        </div>

        {/* Text Monolith */}
        <div style={{ textAlign: 'center', maxWidth: 1100 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: '#D4AF37',
              letterSpacing: '2px',
              display: 'block',
              opacity: titleEntry.opacity,
            }}
          >
            پایان قسمت اول • ادامه در قسمت‌های بعد
          </span>

          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#F8FAFC',
              margin: '14px 0 0 0',
              lineHeight: 1.3,
              transform: titleEntry.transform,
              opacity: titleEntry.opacity,
            }}
          >
            روابط عمومی کمیته تحقیقات و فناوری دانشجویی
            <br />
            <span style={{ color: '#38BDF8' }}>دانشگاه علوم پزشکی بقیة‌الله (عج)</span>
          </h1>

          <div style={{ height: 28 }} />

          <p
            style={{
              fontSize: 22,
              color: '#94A3B8',
              margin: 0,
              fontWeight: 500,
              transform: subtitleEntry.transform,
              opacity: subtitleEntry.opacity,
            }}
          >
            جهت مطالعه متن کامل آیین‌نامه و دریافت مشاوره‌های تکمیلی، به روابط عمومی کمیته مراجعه فرمایید.
          </p>
        </div>
      </div>
    </div>
  );
};
