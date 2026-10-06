import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 06 — RIBBON / LINE FIELD & CAMERA-THROUGH
 * Duration: 240 frames (8.00s @ 30 FPS)
 * 
 * Flow:
 * Point → Accelerating Line → Bending Ribbon → 5 Parallel Wave Traces
 * → Spatial Perspective Tunnel → Camera Punch-Through → New Graphic State (Hexagonal Crest)
 */
export const V23RibbonLineTunnel: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 (0 - 45f): Dot to Accelerating Line to Ribbon
  const growProgress = interpolate(frame, [0, 40], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ribbonLength = interpolate(growProgress, [0, 1], [8, 1200]);
  const ribbonThickness = interpolate(growProgress, [0, 0.5, 1], [4, 24, 6]);

  // Phase 2 (45 - 90f): Ribbon bends and splits into 5 parallel wave traces
  const waveProgress = interpolate(frame, [45, 85], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (90 - 145f): Waves fold into a 3D perspective tunnel of 6 concentric rings
  const tunnelFoldProgress = interpolate(frame, [90, 135], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (140 - 200f): Camera moves THROUGH the tunnel (Z-axis punch)
  const cameraZProgress = interpolate(frame, [140, 195], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraZoom = interpolate(cameraZProgress, [0, 1], [1.0, 7.5]);

  // Phase 5 (195 - 240f): Tunnel resolves into a sovereign hexagonal seal
  const resolveProgress = interpolate(frame, [195, 220], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sealSettle = calculateSettleLock(frame, 220, {
    anticipationFrames: 8,
    settleFrames: 14,
    scalePeak: 1.12,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.95} />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 12,
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 13,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            BENCHMARK 06
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            روبان → میدان امواج → تونل فضایی → عبور دوربین (Ribbon → Wave Field → Tunnel → Pass-Through)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 45 && 'فاز ۱: رشد نقطه به روبان پرشتاب'}
          {frame >= 45 && frame < 90 && 'فاز ۲: انشعاب به ۵ مسیر موازی موجی'}
          {frame >= 90 && frame < 140 && 'فاز ۳: تاخوردگی امواج به تونل عمق‌دار ۳ بعدی'}
          {frame >= 140 && frame < 200 && 'فاز ۴: شلیک دوربین به درون تونل (Camera Punch-Through)'}
          {frame >= 200 && 'فاز ۵: تثبیت در نشان هندسی شش‌ضلعی جدید'}
        </span>
      </div>

      {/* Perspective Viewport Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${cameraZoom})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* Phase 1 & 2: Growing Ribbon & 5 Parallel Waves */}
        {tunnelFoldProgress < 0.95 && (
          <div
            style={{
              position: 'relative',
              width: 1400,
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1 - tunnelFoldProgress,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const yOffset = (i - 2) * 24 * waveProgress;
              const opacity = 1 - Math.abs(i - 2) * 0.18;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: ribbonLength,
                    height: ribbonThickness,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, rgba(212, 175, 55, 0) 0%, #FDE047 30%, #D4AF37 70%, rgba(212, 175, 55, 0) 100%)',
                    transform: `translateY(${yOffset}px) scaleY(${1 - waveProgress * 0.4})`,
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                    opacity,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Phase 3 & 4: 3D Spatial Rings Tunnel */}
        {tunnelFoldProgress > 0.05 && resolveProgress < 0.95 && (
          <div
            style={{
              position: 'relative',
              width: 600,
              height: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
              opacity: tunnelFoldProgress * (1 - resolveProgress),
            }}
          >
            {Array.from({ length: 7 }).map((_, idx) => {
              const zDist = idx * 160;
              const ringRadius = 180 + idx * 30;
              const ringOpacity = interpolate(idx, [0, 6], [1, 0.3]);

              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    width: ringRadius * 2,
                    height: ringRadius * 2,
                    borderRadius: '50%',
                    border: '2px solid #D4AF37',
                    boxShadow: idx === 0 ? '0 0 35px #D4AF37' : '0 0 15px rgba(212, 175, 55, 0.3)',
                    transform: `translateZ(${-zDist}px)`,
                    opacity: ringOpacity,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Phase 5: Resulting Hexagonal Crest (New Graphic State) */}
        {resolveProgress > 0.05 && (
          <div
            style={{
              transform: `scale(${sealSettle.scale / cameraZoom * 1.8}) translateY(${sealSettle.translateY}px)`,
              opacity: resolveProgress,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              direction: 'rtl',
              fontFamily: 'Vazirmatn, system-ui, sans-serif',
            }}
          >
            <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
              <polygon
                points="50,10 88,32 88,68 50,90 12,68 12,32"
                stroke="#D4AF37"
                strokeWidth="2.5"
                fill="rgba(212, 175, 55, 0.15)"
              />
              <circle cx="50" cy="50" r="22" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
            </svg>
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: '#FFFFFF',
                marginTop: 16,
                letterSpacing: 1,
                textShadow: '0 0 24px rgba(212, 175, 55, 0.8)',
              }}
            >
              افق هندسی جدید
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
