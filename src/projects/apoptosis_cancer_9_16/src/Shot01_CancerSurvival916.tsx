import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { MotionEntrance } from '../../../motion-design/MotionEntrance';
import { KineticText } from '../../../motion-design/KineticText';
import { Depth25DLayer } from '../../../motion-design/Depth25DLayer';
import { VisualMotifCore } from '../../../motion-design/VisualMotifCore';

export const Shot01CancerSurvival916: React.FC = () => {
  const frame = useCurrentFrame();

  const pulseGlow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.4, 0.9]);
  const shieldRotate = interpolate(frame, [0, 225], [0, 45]);

  return (
    <LivingCameraRig durationInFrames={225} initialScale={1.0} targetScale={1.05} driftIntensity={6.0}>
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
        {/* Layer 5: Deep 2.5D Atmospheric Backdrop */}
        <Depth25DLayer depthZ={-180}>
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: '20%',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
            }}
          />
        </Depth25DLayer>

        {/* Layer 3: Kinetic Typography Header with Staggered Entrance */}
        <div style={{ position: 'absolute', top: 210, width: '100%', textAlign: 'center' }}>
          <MotionEntrance type="fadeDown" delayFrames={4}>
            <div style={{ color: '#ef4444', fontSize: 26, letterSpacing: 4, fontWeight: 800 }}>
              EVASION OF APOPTOSIS
            </div>
          </MotionEntrance>

          <MotionEntrance type="overshootPop" delayFrames={10}>
            <div style={{ color: '#ffffff', fontSize: 48, fontWeight: 900, marginTop: 10 }}>
              بقای سلول سرطانی
            </div>
          </MotionEntrance>
        </div>

        {/* Layer 1: Central Hero Mitochondria with Multi-Layered Physical Anatomy */}
        <MotionEntrance type="overshootPop" delayFrames={14}>
          <OrganicBreathing amplitude={0.015} frequency={0.035} enableGlow={true} glowColor="rgba(239, 68, 68, 0.5)">
            <div
              style={{
                width: 540,
                height: 540,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer Protective BCL-2 Shield with Orbital Rotation */}
              <div
                style={{
                  position: 'absolute',
                  width: 540,
                  height: 540,
                  borderRadius: '50%',
                  border: `4px solid rgba(239, 68, 68, ${pulseGlow})`,
                  boxShadow: `0 0 50px rgba(239, 68, 68, ${pulseGlow * 0.6})`,
                  transform: `rotate(${shieldRotate}deg)`,
                }}
              />

              {/* Inner Double-Membrane Mitochondrial Organelle */}
              <div
                style={{
                  width: 440,
                  height: 280,
                  borderRadius: '140px',
                  backgroundColor: '#1e293b',
                  border: '3px solid #ef4444',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Mitochondrial Cristae Folds */}
                <svg width="320" height="120" viewBox="0 0 320 120" style={{ opacity: 0.7 }}>
                  <path
                    d="M 20 60 Q 80 10 160 60 T 300 60"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                  />
                  <path
                    d="M 40 40 Q 100 90 180 40 T 280 40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                </svg>
                <div style={{ color: '#94a3b8', fontSize: 22, fontWeight: 700, marginTop: 8 }}>
                  Mitochondrial Matrix
                </div>

                {/* VISUAL MOTIF: Latent High-Energy Particle Seed Trapped Inside */}
                <div style={{ position: 'absolute', zIndex: 15 }}>
                  <VisualMotifCore stage="trapped" size={48} color="#10b981" glowColor="rgba(16, 185, 129, 0.7)" />
                </div>
              </div>

              {/* Active BCL-2 Inhibitor Node with Spring Entry */}
              <MotionEntrance type="springBounce" delayFrames={24}>
                <div
                  style={{
                    position: 'absolute',
                    top: 15,
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    padding: '10px 28px',
                    borderRadius: 24,
                    fontSize: 22,
                    fontWeight: 800,
                    boxShadow: '0 0 30px #dc2626',
                    border: '2px solid #fecaca',
                  }}
                >
                  🛡️ BCL-2 SHIELD: OVEREXPRESSED
                </div>
              </MotionEntrance>
            </div>
          </OrganicBreathing>
        </MotionEntrance>

        {/* Layer 2: Kinetic Editorial Subtitle with Staggered Word Reveal */}
        <div style={{ position: 'absolute', bottom: 350, width: '100%', padding: '0 40px', boxSizing: 'border-box' }}>
          <MotionEntrance type="fadeUp" delayFrames={28}>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 20,
                padding: '20px 24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              }}
            >
              <KineticText
                text="سلول سرطانی با تکیه بر پروتئین BCL-2، فرمان مرگ طبیعی را نادیده می‌گیرد."
                highlightWord="BCL-2"
                highlightColor="#ef4444"
                fontSize={28}
                delayFrames={32}
              />
            </div>
          </MotionEntrance>
        </div>
      </div>
    </LivingCameraRig>
  );
};
