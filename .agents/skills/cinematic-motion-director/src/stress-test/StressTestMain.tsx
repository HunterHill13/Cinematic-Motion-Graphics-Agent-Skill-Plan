import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { LivingCameraRig } from '../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../living-motion/OrganicBreathing';
import { ParticleDrift } from '../living-motion/ParticleDrift';
import { LaserCallout } from '../motion-design/LaserCallout';
import { VisualMotifCore } from '../motion-design/VisualMotifCore';
import { Depth25DLayer } from '../motion-design/Depth25DLayer';

/**
 * StressTestMain (10 seconds = 300 frames @ 30fps)
 * Purpose: Definitively prove that the new architecture has eliminated the "animated web page" aesthetic.
 *
 * Sequence:
 * 0.0s - 2.0s (0-60f):   Cinematic Opening & Ambient Deep Space Pulse
 * 2.0s - 4.0s (60-120f):  Hero Mitochondrial Vector Structure Emerges via Physics Assembly
 * 4.0s - 6.0s (120-180f): Laser Callout Reticle Locks onto BCL-2 Defense Node
 * 6.0s - 8.0s (180-240f): Relativistic BH3 Vector Impact & Radial Shockwave Detonation
 * 8.0s - 10.0s (240-300f): Core Dilation & Seamless Parallax Exit
 */
export const StressTestMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Organelle Entrance Spring (Anticipation -> Action -> Settle)
  const heroEntrance = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // 2. Incoming Spear Vector (Frame 170 -> 210)
  const spearProgress = interpolate(frame, [170, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const spearY = interpolate(spearProgress, [0, 1], [-400, 0]);

  // 3. Impact Detonation (Frame 210+)
  const impactProgress = interpolate(frame, [210, 255], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveRadius = impactProgress * 280;
  const shockwaveOpacity = interpolate(impactProgress, [0, 0.2, 1], [0, 1, 0]);

  // 4. Kinetic Exit Compression (Frame 270+)
  const exitProgress = interpolate(frame, [270, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitScale = 1 + exitProgress * 0.4;
  const exitOpacity = 1 - exitProgress * 0.9;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: '#070a13',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Dynamic Handheld Camera with Heavy Impact Shake at Frame 210 */}
      <LivingCameraRig
        durationInFrames={300}
        initialScale={1.0}
        targetScale={1.06}
        driftIntensity={6.0}
        enableImpulseShake={true}
        shakeAtFrame={210}
        shakeIntensity={16.0}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Layer 0: Volumetric Cosmic Backlight */}
          <Depth25DLayer depthZ={-200}>
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '20%',
                width: 650,
                height: 650,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
          </Depth25DLayer>

          {/* Living Particle Field */}
          <ParticleDrift particleCount={35} width={1080} height={1920} driftSpeed={0.7} />

          {/* Layer 1: Pure Typographic Kinetic Intro (Zero Rounded Boxes) */}
          <div
            style={{
              position: 'absolute',
              top: 220,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: exitOpacity,
            }}
          >
            <div
              style={{
                color: '#06b6d4',
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: 6,
                textTransform: 'uppercase',
                opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `translateY(${interpolate(frame, [10, 30], [15, 0], { extrapolateRight: 'clamp' })}px)`,
              }}
            >
              PHYSICAL STRESS TEST • V3.1
            </div>

            <div
              style={{
                color: '#ffffff',
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: -1,
                marginTop: 12,
                opacity: interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `scale(${interpolate(frame, [25, 45], [0.92, 1.0], { extrapolateRight: 'clamp' })})`,
                textShadow: '0 0 35px rgba(255, 255, 255, 0.3)',
              }}
            >
              مهار انکوژنیک BCL-2
            </div>
          </div>

          {/* Layer 2: Hero Mitochondrial Organelle (SVG Vector Anatomy) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${heroEntrance * exitScale})`,
              opacity: exitOpacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrganicBreathing amplitude={0.016} frequency={0.035} enableGlow={true} glowColor="rgba(6, 182, 212, 0.5)">
              <div style={{ position: 'relative', width: 600, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Outer Phospholipid Bilayer Membranes */}
                <svg width="600" height="600" viewBox="0 0 600 600" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <circle
                    cx="300"
                    cy="300"
                    r="260"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="18"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="300"
                    cy="300"
                    r="250"
                    fill="rgba(15, 23, 42, 0.65)"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))',
                      strokeDasharray: 1633,
                      strokeDashoffset: 1633 * (1 - Math.min(1, heroEntrance)),
                    }}
                  />
                  {/* Internal Mitochondrial Cristae Folds (Bio-Organic Paths) */}
                  <path
                    d="M 120 300 Q 200 180 300 300 T 480 300"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.6))' }}
                  />
                  <path
                    d="M 160 360 Q 300 460 440 360"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />
                </svg>

                {/* Central Trapped Visual Motif Seed */}
                <div style={{ position: 'relative', zIndex: 20 }}>
                  <VisualMotifCore
                    stage="trapped"
                    size={56}
                    color="#10b981"
                    glowColor="rgba(16, 185, 129, 0.8)"
                  />
                </div>

                {/* Incoming BH3 Peptide Kinetic Spear */}
                {frame >= 170 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 40,
                      transform: `translateY(${spearY}px)`,
                      zIndex: 35,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: 14, height: 60, borderRadius: 7, background: 'linear-gradient(to top, #ffffff, #06b6d4)', boxShadow: '0 0 25px #06b6d4' }} />
                    <div style={{ width: 4, height: 80, background: 'linear-gradient(to top, #06b6d4, transparent)' }} />
                  </div>
                )}

                {/* Impact Shockwave Ring */}
                {frame >= 210 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 40,
                      width: shockwaveRadius * 2,
                      height: shockwaveRadius * 2,
                      borderRadius: '50%',
                      border: '3px solid #06b6d4',
                      opacity: shockwaveOpacity,
                      boxShadow: '0 0 35px #06b6d4',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            </OrganicBreathing>
          </div>

          {/* Layer 3: Laser Callout Reticle Annotations (NO UI BOXES) */}
          <LaserCallout
            label="BCL-2 COMPLEX"
            sublabel="ANTI-APOPTOTIC SHIELD"
            originX={540}
            originY={710}
            targetX={240}
            targetY={580}
            delayFrames={80}
            accentColor="#ef4444"
          />

          <LaserCallout
            label="CYTOCHROME C CORE"
            sublabel="LATENT TRIGGER"
            originX={540}
            originY={960}
            targetX={840}
            targetY={1120}
            delayFrames={120}
            accentColor="#10b981"
          />
        </div>
      </LivingCameraRig>
    </div>
  );
};
