import React from 'react';
import { Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { LivingCameraRig } from '../../../src/living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../src/living-motion/OrganicBreathing';
import { ParticleDrift } from '../../../src/living-motion/ParticleDrift';
import { LaserCallout } from '../../../src/motion-design/LaserCallout';
import { VisualMotifCore } from '../../../src/motion-design/VisualMotifCore';
import { Depth25DLayer } from '../../../src/motion-design/Depth25DLayer';
import { KineticText } from '../../../src/motion-design/KineticText';

/**
 * ReferenceStressTestSequence (20.0s = 600 frames @ 30 FPS)
 *
 * Cinematic Structure:
 * 1. 0.0s - 4.0s (0-120f): SHOT 01 - The Oncogenic Fortress (Atmospheric biological nebula, BCL-2 shield reveal)
 * 2. 4.0s - 8.0s (120-240f): SHOT 02 - Targeted Molecular Spear (BH3 mimetic flight, vector trailing wake)
 * 3. 8.0s - 12.0s (240-360f): SHOT 03 - High-Velocity Impact (Impulse camera shake, shield fracture)
 * 4. 12.0s - 16.0s (360-480f): SHOT 04 - MOMP Pore Rupture (Relativistic Cytochrome c particle dispersal)
 * 5. 16.0s - 20.0s (480-600f): SHOT 05 - The Heptameric Wheel (Apoptosome assembly & caspase ignition)
 */
export const ReferenceStressTestSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Organelle Entrance Spring (Frames 0 -> 90)
  const heroEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // 2. BH3 Missile Flight (Frames 150 -> 240)
  const missileProgress = interpolate(frame, [150, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const missileY = interpolate(missileProgress, [0, 1], [-450, 0]);

  // 3. Impact & Detonation (Frame 240 -> 320)
  const impactProgress = interpolate(frame, [240, 320], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveRadius = impactProgress * 360;
  const shockwaveOpacity = interpolate(impactProgress, [0, 0.15, 1], [0, 1, 0]);

  // 4. MOMP Pore Dilation & Radial Swarm (Frames 360 -> 480)
  const poreSize = interpolate(frame, [360, 440], [30, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Apoptosome Wheel Rotation (Frames 480 -> 600)
  const wheelRotation = interpolate(frame, [480, 600], [0, 90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 6. Camera Dynamic Push (0 to 600 frames)
  const cameraZoom = interpolate(frame, [0, 240, 480, 600], [1.0, 1.08, 1.14, 1.18]);

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
      {/* Unified Master Audio Track (Narration + Orchestral Score + SFX) */}
      <Audio src={staticFile('audio/final_master_mix.mp3')} volume={1.0} />

      {/* Living Camera Rig with Impulse Shake on BH3 Collision at Frame 240 */}
      <LivingCameraRig
        durationInFrames={600}
        initialScale={cameraZoom}
        targetScale={cameraZoom * 1.02}
        driftIntensity={6.0}
        enableImpulseShake={true}
        shakeAtFrame={240}
        shakeIntensity={20.0}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Z0: Deep Volumetric Cosmic Nebula Backlight */}
          <Depth25DLayer depthZ={-220}>
            <div
              style={{
                position: 'absolute',
                top: '25%',
                left: '18%',
                width: 750,
                height: 750,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </Depth25DLayer>

          {/* Living Brownian Particle Field */}
          <ParticleDrift particleCount={45} width={1080} height={1920} driftSpeed={0.8} />

          {/* Z5: Typographic Header (Pure Kinetic Editorial, NO Web Containers) */}
          <div
            style={{
              position: 'absolute',
              top: 190,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                color: '#06b6d4',
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 6,
                textTransform: 'uppercase',
                opacity: interpolate(frame, [10, 40], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `translateY(${interpolate(frame, [10, 40], [15, 0], { extrapolateRight: 'clamp' })}px)`,
              }}
            >
              REFERENCE MOTION TEST • V3.2
            </div>

            <div
              style={{
                color: '#ffffff',
                fontSize: 54,
                fontWeight: 900,
                letterSpacing: -1,
                marginTop: 10,
                opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `scale(${interpolate(frame, [30, 60], [0.9, 1.0], { extrapolateRight: 'clamp' })})`,
                textShadow: '0 0 35px rgba(6, 182, 212, 0.4)',
              }}
            >
              آغاز آبشار مرگ سلولی
            </div>
          </div>

          {/* Z3: Hero Biological Organelle (Mitochondrial Phospholipid Bilayer & Cristae) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${heroEntrance})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrganicBreathing amplitude={0.016} frequency={0.035} enableGlow={true} glowColor="rgba(6, 182, 212, 0.5)">
              <div style={{ position: 'relative', width: 620, height: 620, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* SVG Vector Outer Membrane */}
                <svg width="620" height="620" viewBox="0 0 620 620" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <circle
                    cx="310"
                    cy="310"
                    r="270"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="20"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="310"
                    cy="310"
                    r="260"
                    fill="rgba(15, 23, 42, 0.7)"
                    stroke="#06b6d4"
                    strokeWidth="3.5"
                    style={{
                      filter: 'drop-shadow(0 0 16px rgba(6, 182, 212, 0.4))',
                      strokeDasharray: 1633,
                      strokeDashoffset: 1633 * (1 - Math.min(1, heroEntrance)),
                    }}
                  />
                  {/* Internal Cristae Fold Splines */}
                  <path
                    d="M 130 310 Q 210 190 310 310 T 490 310"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))' }}
                  />
                  <path
                    d="M 170 370 Q 310 470 450 370"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                  />
                </svg>

                {/* Central Visual Motif Core (Latent Seed Particle) */}
                <div style={{ position: 'relative', zIndex: 20 }}>
                  <VisualMotifCore
                    stage="trapped"
                    size={60}
                    color="#10b981"
                    glowColor="rgba(16, 185, 129, 0.8)"
                  />
                </div>

                {/* Incoming BH3 Mimetic Projectile (Frames 150 -> 240) */}
                {frame >= 150 && frame < 360 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 40,
                      transform: `translateY(${missileY}px)`,
                      zIndex: 35,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: 16, height: 75, borderRadius: 8, background: 'linear-gradient(to top, #ffffff, #06b6d4)', boxShadow: '0 0 35px #06b6d4' }} />
                    <div style={{ width: 4, height: 100, background: 'linear-gradient(to top, #06b6d4, transparent)' }} />
                  </div>
                )}

                {/* Relativistic Impact Shockwave Ring (Frames 240 -> 320) */}
                {frame >= 240 && frame < 360 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 40,
                      width: shockwaveRadius * 2,
                      height: shockwaveRadius * 2,
                      borderRadius: '50%',
                      border: '4px solid #06b6d4',
                      opacity: shockwaveOpacity,
                      boxShadow: '0 0 45px #06b6d4',
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* MOMP Pore Dilation (Frames 360 -> 480) */}
                {frame >= 360 && frame < 480 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: poreSize,
                      height: poreSize,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #34d399 20%, #059669 80%)',
                      boxShadow: '0 0 50px #10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#090d16',
                      fontWeight: 900,
                      fontSize: 26,
                      zIndex: 30,
                    }}
                  >
                    MOMP
                  </div>
                )}

                {/* Heptameric Apoptosome Wheel Hub (Frames 480 -> 600) */}
                {frame >= 480 && (
                  <div
                    style={{
                      position: 'absolute',
                      width: 480,
                      height: 480,
                      borderRadius: '50%',
                      border: '3px dashed #c084fc',
                      transform: `rotate(${wheelRotation}deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 30,
                    }}
                  >
                    <div
                      style={{
                        width: 140,
                        height: 140,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #c084fc, #7e22ce)',
                        boxShadow: '0 0 60px #a855f7',
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
                  </div>
                )}
              </div>
            </OrganicBreathing>
          </div>

          {/* Laser Callouts (Precision Vector Hairpin Reticles, ZERO HTML BOXES) */}
          <LaserCallout
            label="BCL-2 COMPLEX"
            sublabel="ANTI-APOPTOTIC SHIELD"
            originX={540}
            originY={730}
            targetX={240}
            targetY={600}
            delayFrames={70}
            accentColor="#ef4444"
          />

          <LaserCallout
            label="CYTOCHROME C CORE"
            sublabel="MITOCHONDRIAL MATRIX"
            originX={540}
            originY={960}
            targetX={840}
            targetY={1120}
            delayFrames={110}
            accentColor="#10b981"
          />

          {/* Z5: Unboxed Kinetic Typography Subtitles */}
          <div style={{ position: 'absolute', bottom: 340, width: '100%', padding: '0 50px', boxSizing: 'border-box', textAlign: 'center' }}>
            <KineticText
              text="سلولِ سرطانی با پروتئین BCL-2، مسیرِ خودکشی سلولی را مسدود می‌کند."
              highlightWord="BCL-2"
              highlightColor="#ef4444"
              fontSize={32}
              delayFrames={40}
            />
          </div>
        </div>
      </LivingCameraRig>
    </div>
  );
};
