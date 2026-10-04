import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { SecondaryPhysics } from '../../../living-motion/SecondaryPhysics';

export const Shot03MOMPPuncture916: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BAX/BAK pore opening
  const poreSize = interpolate(
    frame,
    [0, 60],
    [20, 160],
    { extrapolateRight: 'clamp' }
  );

  // Cytochrome c escaping particles
  const particles = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <LivingCameraRig
      durationInFrames={240}
      initialScale={1.0}
      targetScale={1.06}
      driftIntensity={9.0}
      enableImpulseShake={true}
      shakeAtFrame={30}
      shakeIntensity={14.0}
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
          <div style={{ color: '#10b981', fontSize: 28, letterSpacing: 3, fontWeight: 700 }}>
            MOMP & CYTOCHROME C RELEASE
          </div>
          <div style={{ color: '#ffffff', fontSize: 48, fontWeight: 800, marginTop: 8 }}>
            نفوذپذیری غشا و رهایش سیتوکروم c
          </div>
        </div>

        {/* Outer Membrane with MOMP Rupture */}
        <OrganicBreathing amplitude={0.018} frequency={0.045} enableGlow={true} glowColor="rgba(16, 185, 129, 0.5)">
          <div
            style={{
              width: 540,
              height: 540,
              borderRadius: '50%',
              border: '6px solid #10b981',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 50px rgba(16, 185, 129, 0.4)',
            }}
          >
            {/* Ruptured MOMP Pore */}
            <div
              style={{
                width: poreSize,
                height: poreSize,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 40px #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#090d16',
                fontWeight: 900,
                fontSize: 22,
              }}
            >
              MOMP
            </div>

            {/* Escaping Cytochrome c Molecules */}
            {particles.map((p) => {
              const delay = p * 12;
              const progress = interpolate(
                Math.max(0, frame - delay),
                [0, 90],
                [0, 1],
                { extrapolateRight: 'clamp' }
              );
              const angle = (p * Math.PI) / 4;
              const dist = progress * 320;
              const px = Math.cos(angle) * dist;
              const py = Math.sin(angle) * dist;

              return (
                <div
                  key={p}
                  style={{
                    position: 'absolute',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: '#38bdf8',
                    boxShadow: '0 0 20px #38bdf8',
                    transform: `translate(${px}px, ${py}px)`,
                    opacity: progress > 0 ? 1 - progress * 0.4 : 0,
                  }}
                />
              );
            })}
          </div>
        </OrganicBreathing>

        {/* Subtitle Card */}
        <div style={{ position: 'absolute', bottom: 360, width: '100%', textAlign: 'center' }}>
          <SecondaryPhysics delayFrames={5}>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid #10b981',
                borderRadius: 16,
                padding: '16px 28px',
                display: 'inline-block',
                maxWidth: 700,
              }}
            >
              <div style={{ color: '#e2e8f0', fontSize: 26, lineHeight: 1.6, direction: 'rtl' }}>
                با فعال شدن <b>BAX</b>، منافذ MOMP باز شده و سیتوکروم c آزاد می‌شود.
              </div>
            </div>
          </SecondaryPhysics>
        </div>
      </div>
    </LivingCameraRig>
  );
};
