import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { SecondaryPhysics } from '../../../living-motion/SecondaryPhysics';

export const Shot04Apoptosome916: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Apoptosome wheel spokes assembly (7-fold symmetry)
  const spokes = [0, 1, 2, 3, 4, 5, 6];

  const assemblyProgress = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const rotation = interpolate(frame, [0, 300], [0, 90]);

  return (
    <LivingCameraRig
      durationInFrames={300}
      initialScale={1.05}
      targetScale={0.99}
      driftIntensity={5.0}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '180px 70px 320px 70px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Kinetic Header */}
        <div style={{ position: 'absolute', top: 220, textAlign: 'center' }}>
          <div style={{ color: '#a855f7', fontSize: 28, letterSpacing: 3, fontWeight: 700 }}>
            APOPTOSOME & EXECUTION
          </div>
          <div style={{ color: '#ffffff', fontSize: 48, fontWeight: 800, marginTop: 8 }}>
            آغاز آبشار مرگبار کاسپازها
          </div>
        </div>

        {/* Assembled Wheel of Death (Apoptosome Hub) */}
        <OrganicBreathing amplitude={0.012} frequency={0.03} enableGlow={true} glowColor="rgba(168, 85, 247, 0.4)">
          <div
            style={{
              width: 540,
              height: 540,
              borderRadius: '50%',
              border: '3px dashed #a855f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transform: `scale(${assemblyProgress}) rotate(${rotation}deg)`,
            }}
          >
            {/* Central Caspase-9 Activation Core */}
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                backgroundColor: '#a855f7',
                boxShadow: '0 0 50px #a855f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: 22,
              }}
            >
              CASP-9
            </div>

            {/* 7 Apaf-1 Wheel Spokes */}
            {spokes.map((s) => {
              const angle = (s * 2 * Math.PI) / 7;
              const rad = 200;
              const sx = Math.cos(angle) * rad;
              const sy = Math.sin(angle) * rad;

              return (
                <div
                  key={s}
                  style={{
                    position: 'absolute',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: '#c084fc',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 20px #c084fc',
                    transform: `translate(${sx}px, ${sy}px)`,
                  }}
                />
              );
            })}
          </div>
        </OrganicBreathing>

        {/* Subtitle Card */}
        <div style={{ position: 'absolute', bottom: 360, width: '100%', textAlign: 'center' }}>
          <SecondaryPhysics delayFrames={6}>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid #a855f7',
                borderRadius: 16,
                padding: '16px 28px',
                display: 'inline-block',
                maxWidth: 700,
              }}
            >
              <div style={{ color: '#e2e8f0', fontSize: 26, lineHeight: 1.6, direction: 'rtl' }}>
                تشکیل آپوپتوزوم، کاسپازهای مرگبار را فعال کرده و سلول خاموش می‌شود.
              </div>
            </div>
          </SecondaryPhysics>
        </div>
      </div>
    </LivingCameraRig>
  );
};
