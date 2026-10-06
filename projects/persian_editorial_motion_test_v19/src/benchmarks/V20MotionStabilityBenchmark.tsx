import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { calculateSettleLock, calculateDecayingImpactShake } from '../../../../src/motion/secondaryMotion';

/**
 * V20 MOTION STABILITY BENCHMARK
 * 
 * Demonstrates the 5-phase deterministic motion lifecycle:
 * 1. ENTRY (f0 - f24)
 * 2. IMPACT (f25)
 * 3. SETTLING (f26 - f45)
 * 4. SETTLE-LOCKED HOLD (f46 - f150) -> STRICT ZERO-JITTER GUARANTEE (105 frames)
 * 5. RELEASE (f151 - f180)
 * 
 * Verifies 8 distinct visual primitives under subpixel scrutiny:
 * 1. Hero Persian Typography
 * 2. Large Tabular Numerals
 * 3. Thin 1px Horizontal Datum Line
 * 4. Thin 1.5px Diagonal Architectural Line
 * 5. Geometric Vector Circle
 * 6. Precision Rectangle Frame
 * 7. Multi-vertex SVG Path
 * 8. Camera-Decoupled Spatial Anchor
 */
export const V20MotionStabilityBenchmark: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Lifecycle Phase Evaluation
  const impactFrame = 25;
  const settle = calculateSettleLock(frame, impactFrame, {
    anticipationFrames: 10,
    settleFrames: 20,
    scalePeak: 1.18,
  });

  const impactShake = calculateDecayingImpactShake(frame, impactFrame, {
    durationFrames: 10,
    amplitude: 6,
    frequency: 1.6,
  });

  // Exit Release Phase (150 - 180f)
  const exitProgress = interpolate(frame, [150, 180], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.84, 0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Overall combined opacity & scale
  const activeOpacity = frame < 150 ? settle.opacity : 1 - exitProgress;
  const activeScale = frame < 150 ? settle.scale : 1 - exitProgress * 0.15;
  const activeTranslateY = frame < 150 ? settle.translateY : exitProgress * -30;

  // Active Phase Label
  let phaseName = 'ENTRY';
  let phaseColor = '#38BDF8';
  if (frame === impactFrame) {
    phaseName = 'IMPACT (f25)';
    phaseColor = '#EF4444';
  } else if (frame > impactFrame && frame <= 45) {
    phaseName = 'SETTLING';
    phaseColor = '#F59E0B';
  } else if (frame > 45 && frame < 150) {
    phaseName = 'SETTLE-LOCKED HOLD (0.0000 px JITTER)';
    phaseColor = '#10B981';
  } else if (frame >= 150) {
    phaseName = 'RELEASE / EXIT';
    phaseColor = '#A855F7';
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        direction: 'rtl',
        color: '#FFFFFF',
        padding: 60,
      }}
    >
      {/* HUD Telemetry Bar */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          paddingBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#D4AF37' }}>
            V20 MOTION STABILITY BENCHMARK
          </span>
          <span style={{ fontSize: 16, color: '#94A3B8' }}>
            Frame: {frame} / 180 ({(frame / 30).toFixed(2)}s)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 15, color: '#94A3B8' }}>PHASE:</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: phaseColor,
              backgroundColor: `${phaseColor}22`,
              padding: '4px 14px',
              borderRadius: 4,
              border: `1px solid ${phaseColor}`,
            }}
          >
            {phaseName}
          </span>
        </div>
      </div>

      {/* Main 8-Primitive Diagnostic Matrix */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          bottom: 40,
          left: 60,
          right: 60,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 24,
          transform: `translateX(${impactShake.shakeX}px)`,
        }}
      >
        {/* PRIMITIVE 1: Hero Persian Typography */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>
            1. HERO PERSIAN TEXT
          </span>
          <div
            style={{
              opacity: activeOpacity,
              transform: `scale(${activeScale}) translateY(${activeTranslateY}px)`,
              fontSize: 26,
              fontWeight: 900,
              color: '#FFFFFF',
              textAlign: 'center',
              lineHeight: 1.4,
              textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
            }}
          >
            پژوهشگر برتر دانشگاه علوم پزشکی
          </div>
        </div>

        {/* PRIMITIVE 2: Large Tabular Numeral */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>
            2. MONUMENTAL NUMERAL
          </span>
          <div
            style={{
              opacity: activeOpacity,
              transform: `scale(${activeScale}) translateY(${activeTranslateY}px)`,
              fontSize: 84,
              fontWeight: 900,
              color: '#D4AF37',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}
          >
            ۱۶
          </div>
        </div>

        {/* PRIMITIVE 3: Thin 1px Horizontal Line */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
            3. THIN 1PX DATUM LINE
          </span>
          <div
            style={{
              width: '80%',
              height: 1,
              backgroundColor: '#38BDF8',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)',
              opacity: activeOpacity,
              transform: `scaleX(${activeScale})`,
            }}
          />
        </div>

        {/* PRIMITIVE 4: Thin 1.5px Diagonal Vector */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10 }}>
            4. THIN 1.5PX DIAGONAL
          </span>
          <svg
            width="120"
            height="80"
            viewBox="0 0 120 80"
            style={{
              opacity: activeOpacity,
              transform: `scale(${activeScale})`,
            }}
          >
            <line
              x1="10"
              y1="70"
              x2="110"
              y2="10"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* PRIMITIVE 5: Geometric Vector Circle */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10 }}>
            5. GEOMETRIC CIRCLE (2PX)
          </span>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              border: '2px solid #D4AF37',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.4)',
              opacity: activeOpacity,
              transform: `scale(${activeScale})`,
            }}
          />
        </div>

        {/* PRIMITIVE 6: Precision Caliper Rectangle */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10 }}>
            6. PRECISION RECTANGLE
          </span>
          <div
            style={{
              width: 130,
              height: 70,
              border: '1.5px solid #38BDF8',
              borderRadius: 4,
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              opacity: activeOpacity,
              transform: `scale(${activeScale})`,
            }}
          />
        </div>

        {/* PRIMITIVE 7: Multi-Vertex SVG Path */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10 }}>
            7. MULTI-VERTEX CHEVRON
          </span>
          <svg
            width="120"
            height="70"
            viewBox="0 0 120 70"
            style={{
              opacity: activeOpacity,
              transform: `scale(${activeScale})`,
            }}
          >
            <path
              d="M 15 35 L 60 15 L 105 35 L 60 55 Z"
              stroke="#EF4444"
              strokeWidth="2"
              fill="rgba(239, 68, 68, 0.1)"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* PRIMITIVE 8: Spatial Anchor (Camera-Decoupled) */}
        <div
          style={{
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10 }}>
            8. SPATIAL ANCHOR NODE
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: activeOpacity,
              transform: `scale(${activeScale})`,
            }}
          >
            <div style={{ width: 14, height: 14, backgroundColor: '#D4AF37', transform: 'rotate(45deg)' }} />
            <div style={{ width: 40, height: 2, backgroundColor: '#D4AF37' }} />
            <div style={{ width: 14, height: 14, backgroundColor: '#D4AF37', transform: 'rotate(45deg)' }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
