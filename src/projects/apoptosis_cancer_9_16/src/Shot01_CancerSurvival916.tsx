import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { SecondaryPhysics } from '../../../living-motion/SecondaryPhysics';

export const Shot01CancerSurvival916: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for central cancer cell membrane
  const cellScale = spring({
    frame,
    fps,
    config: { stiffness: 90, damping: 14 },
  });

  const shieldPulse = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [0.6, 1.0]
  );

  return (
    <LivingCameraRig durationInFrames={150} initialScale={1.0} targetScale={1.04} driftIntensity={6.0}>
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
          <div style={{ color: '#ef4444', fontSize: 28, letterSpacing: 3, fontWeight: 700 }}>
            EVASION OF APOPTOSIS
          </div>
          <div style={{ color: '#ffffff', fontSize: 48, fontWeight: 800, marginTop: 8 }}>
            بقای سلول سرطانی
          </div>
        </div>

        {/* Central Mitochondrial Hero with Organic Breathing */}
        <OrganicBreathing amplitude={0.015} frequency={0.04} enableGlow={true} glowColor="rgba(239, 68, 68, 0.4)">
          <div
            style={{
              width: 520,
              height: 520,
              borderRadius: '50%',
              border: `4px solid rgba(239, 68, 68, ${shieldPulse})`,
              backgroundColor: 'rgba(30, 41, 59, 0.75)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 60px rgba(239, 68, 68, ${shieldPulse * 0.5})`,
              transform: `scale(${cellScale})`,
              position: 'relative',
            }}
          >
            {/* Inner Mitochondrial Cristae */}
            <div
              style={{
                width: 380,
                height: 240,
                borderRadius: '120px',
                border: '3px dashed #64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              Mitochondria
            </div>

            {/* Overexpressed BCL-2 Inhibitor Shield Badges */}
            <div
              style={{
                position: 'absolute',
                top: 30,
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '8px 24px',
                borderRadius: 20,
                fontSize: 22,
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)',
              }}
            >
              BCL-2 Shield (Active)
            </div>
          </div>
        </OrganicBreathing>

        {/* Secondary Physics Trailing Annotation */}
        <div style={{ position: 'absolute', bottom: 360, width: '100%', textAlign: 'center' }}>
          <SecondaryPhysics delayFrames={8} stiffness={110} damping={16}>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid #334155',
                borderRadius: 16,
                padding: '16px 28px',
                display: 'inline-block',
                maxWidth: 700,
              }}
            >
              <div style={{ color: '#cbd5e1', fontSize: 26, lineHeight: 1.6, direction: 'rtl' }}>
                سلول سرطانی با تکیه بر پروتئین <b>BCL-2</b>، فرمان مرگ طبیعی را نادیده می‌گیرد.
              </div>
            </div>
          </SecondaryPhysics>
        </div>
      </div>
    </LivingCameraRig>
  );
};
