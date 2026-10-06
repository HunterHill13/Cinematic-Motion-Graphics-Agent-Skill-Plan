import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';

/**
 * BENCHMARK 07 — RING / CAMERA THROUGH & REFRAMING
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Tests:
 * - Motivated perspective push
 * - Deep parallax between foreground perimeter and distant interior
 * - Camera pass-through the aperture
 * - Reframing: the ring itself physically becomes the boundary container for Scene 2
 */
export const V23CameraThrough: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 (0 - 45f): Ring enters and settles in middle-ground
  const ringEntrance = calculateSettleLock(frame, 30, {
    anticipationFrames: 8,
    settleFrames: 14,
    scalePeak: 1.1,
  });

  // Phase 2 & 3 (50 - 135f): Camera forward push through ring aperture
  const pushProgress = interpolate(frame, [50, 130], [0, 1], {
    easing: Easing.bezier(0.5, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraZoom = interpolate(pushProgress, [0, 1], [1.0, 5.2]);

  // Phase 4 (125 - 180f): Ring passes camera and snaps into the framing device for Scene 2
  const reframeProgress = interpolate(frame, [125, 160], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scene2Settle = calculateSettleLock(frame, 165, {
    anticipationFrames: 6,
    settleFrames: 14,
    scalePeak: 1.08,
  });

  // Parallax factor: distant celestial interior moves slower than the foreground ring
  const interiorScale = interpolate(pushProgress, [0, 1], [0.6, 1.4]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#030509', overflow: 'hidden' }}>
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
            BENCHMARK 07
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            حلقه کالبدی → عبور دوربین از دهانه → کادربندی صحنه بعد (Ring Camera-Through & Reframing)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 50 && 'فاز ۱: استقرار حلقه شاخص'}
          {frame >= 50 && frame < 130 && 'فاز ۲: حرکت باانگیزه دوربین به جلو و اختلاف منظر (Parallax)'}
          {frame >= 130 && 'فاز ۳: عبور از دهانه و تبدیل حلقه به قاب صحنه دوم'}
        </span>
      </div>

      {/* Camera Viewport */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: 1200,
        }}
      >
        {/* Ring & Interior Group */}
        <div
          style={{
            position: 'relative',
            width: 500,
            height: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${frame < 125 ? cameraZoom * ringEntrance.scale : 1.0})`,
            transformOrigin: '50% 50%',
          }}
        >
          {/* Foreground Perimeter Ring (expands past camera in Phase 2/3) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `${interpolate(pushProgress, [0, 1], [3, 14])}px solid #D4AF37`,
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.7), inset 0 0 30px rgba(212, 175, 55, 0.3)',
              opacity: 1 - reframeProgress,
              pointerEvents: 'none',
            }}
          >
            {/* Compass Ticks on Ring Perimeter */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 14,
                  height: 2,
                  backgroundColor: '#FFFFFF',
                  transform: `rotate(${i * 30}deg) translateX(240px)`,
                  transformOrigin: '0% 50%',
                }}
              />
            ))}
          </div>

          {/* Distant Interior Content (Visible through ring aperture, then expands into Scene 2) */}
          <div
            style={{
              position: 'relative',
              width: 440,
              height: 440,
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#060A14',
              border: reframeProgress > 0.1 ? '2.5px solid #38BDF8' : 'none',
              transform: `scale(${reframeProgress > 0.1 ? scene2Settle.scale : interiorScale})`,
              boxShadow: reframeProgress > 0.1 ? '0 0 45px rgba(56, 189, 248, 0.5)' : 'none',
            }}
          >
            {/* Scene 2 Coordinate Sphere / Constellation */}
            <div
              style={{
                position: 'absolute',
                inset: 20,
                borderRadius: '50%',
                border: '1.5px dashed rgba(212, 175, 55, 0.5)',
                transform: `rotate(${frame * 0.4}deg)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: 1.5,
                backgroundColor: 'rgba(56, 189, 248, 0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: '100%',
                width: 1.5,
                backgroundColor: 'rgba(56, 189, 248, 0.4)',
              }}
            />

            {/* Scene 2 Typographic Reveal */}
            <div
              style={{
                textAlign: 'center',
                fontFamily: 'Vazirmatn, system-ui, sans-serif',
                direction: 'rtl',
                zIndex: 10,
                opacity: interpolate(frame, [130, 160], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <span
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  textShadow: '0 0 24px rgba(56, 189, 248, 0.8)',
                  display: 'block',
                }}
              >
                افق بین‌المللی
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#D4AF37',
                  marginTop: 8,
                  letterSpacing: 2,
                  display: 'block',
                }}
              >
                کادربندی شده در مدار هندسی
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
