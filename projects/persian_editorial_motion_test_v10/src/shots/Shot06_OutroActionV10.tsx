import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { getLocalAcousticTrigger } from '../motion/timing/voiceSync';
import {
  calculateImpactAndRipple,
  calculateRevealAndEscalate,
} from '../motion/recipes';
import { AmbientGridV10 } from '../motion/ambient/AmbientGridV10';
import { TravelingMotifV10 } from '../motion/actors/TravelingMotifV10';
import {
  CoordinateBrackets,
  ShockwaveRing,
} from '../motion/actors/SecondaryActorsV10';

/**
 * SHOT 06 — INSTITUTIONAL RESOLUTION & SIGN-OFF (V10 MOTION SYSTEM)
 * - Duration: 206 frames (local 0 - 206f / global 2155 - 2361f)
 * - Deterministic acoustic synchronization:
 *   Crest detonation & jewel lock at local frame 40 (global 2195) on spoken «دانشگاه علوم پزشکی بقیه‌الله»
 * - Permanent emerald jewel center lock for Traveling Motif
 * - Dignified stillness hold until master resolve at frame 206 (global 2361)
 */
export const Shot06_OutroActionV10: React.FC = () => {
  const frame = useCurrentFrame();

  const CREST_STRIKE_FRAME = getLocalAcousticTrigger('shot06', 'shot06_seal_crest_strike'); // 40

  const entrance = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Re-emergence of Institutional Crest from central singularity
  const crestExpansion = interpolate(frame, [5, CREST_STRIKE_FRAME], [0.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Recipe 02: Crest Detonation Shockwave and Rebound
  const crestImpact = calculateImpactAndRipple(frame, CREST_STRIKE_FRAME, {
    entryDuration: 20,
    reboundAmplitude: 8,
    shockwaveMaxRadius: 280,
    shockwaveDuration: 26,
    followerDelay: 4,
  });

  // Concentric calibration ring expansion
  const outerRingScale = interpolate(frame, [CREST_STRIKE_FRAME, 80], [0.8, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const outerRingOp = interpolate(frame, [CREST_STRIKE_FRAME, 80], [0, 0.45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typography reveals
  const titleReveal = calculateRevealAndEscalate(frame, 35, 0, 0, {
    baselineDuration: 20,
    textDuration: 25,
  });
  const subtitleReveal = calculateRevealAndEscalate(frame, 55, 0, 0, {
    baselineDuration: 20,
    textDuration: 25,
  });

  // Editorial divider expansion
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

      {/* LAYER 1: Ambient Grid & Registration Marks (Role D) */}
      <AmbientGridV10 color="rgba(212, 175, 55, 0.05)" glowColor="rgba(212, 175, 55, 0.08)" />

      {/* LAYER 2: Editorial Divider Rule (Role B) */}
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

      {/* LAYER 3: The Traveling Motif (Permanent Emerald Jewel inside the Crest) */}
      <TravelingMotifV10
        x={960}
        y={frame < CREST_STRIKE_FRAME ? 540 : 405}
        scale={frame < CREST_STRIKE_FRAME ? interpolate(frame, [0, CREST_STRIKE_FRAME], [1.5, 1.0]) : 1.0}
        color="#10B981"
        glowColor="rgba(16, 185, 129, 0.85)"
        opacity={entrance}
        wakeLength={0}
        morphMode="jewel"
      />

      {/* LAYER 4: Secondary Actors & Shockwaves */}
      {/* Radial Shockwave on Crest Lock */}
      <ShockwaveRing
        x={960}
        y={405}
        radius={crestImpact.shockwave.radius}
        opacity={crestImpact.shockwave.opacity}
        color="#D4AF37"
        strokeWidth={crestImpact.shockwave.strokeWidth}
      />

      {/* Outer Concentric Calibration Ring */}
      {frame >= CREST_STRIKE_FRAME && (
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

      {/* Coordinate Brackets Framing Entire Typography Monolith */}
      {frame >= CREST_STRIKE_FRAME && (
        <CoordinateBrackets
          x={960}
          y={650 + crestImpact.follower.y}
          width={1020}
          height={260}
          bracketSize={24}
          color="rgba(212, 175, 55, 0.45)"
          opacity={crestImpact.follower.opacity}
          scale={1.0}
        />
      )}

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
        {/* Authoritative Crest Container (Acoustic Strike Frame 40) */}
        <div
          style={{
            transform: `scale(${crestExpansion * (frame >= CREST_STRIKE_FRAME ? crestImpact.primaryScale : 1.0)}) translateY(${crestImpact.primaryY}px)`,
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
              opacity: titleReveal.contentOpacity,
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
              transform: `translateY(${titleReveal.contentY}px)`,
              opacity: titleReveal.contentOpacity,
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
              transform: `translateY(${subtitleReveal.contentY}px)`,
              opacity: subtitleReveal.contentOpacity,
            }}
          >
            جهت مطالعه متن کامل آیین‌نامه و دریافت مشاوره‌های تکمیلی، به روابط عمومی کمیته مراجعه فرمایید.
          </p>
        </div>
      </div>
    </div>
  );
};
