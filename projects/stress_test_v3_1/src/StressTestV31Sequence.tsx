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
 * StressTestV31Sequence: 12-second (360 frames @ 30 FPS) Production Quality Stress Test
 *
 * Designed to satisfy the 5-shot structure:
 * 0.0s - 3.0s (0-90f):   SHOT 01 — ESTABLISH: Atmospheric biological nebula, depth layers, particle drift, camera push.
 * 3.0s - 6.0s (90-180f):  SHOT 02 — HERO ENTRANCE: Mitochondrial cristae assemble via physics spring (overshoot + settle).
 * 6.0s - 9.0s (180-270f): SHOT 03 — CAMERA TRANSFORMATION: Camera dives into inner core; LaserCallout reticles lock.
 * 9.0s - 12.0s (270-360f): SHOT 04/05 — SCIENTIFIC ACTION & TRANSITION: BH3 missile collision, membrane rupture shockwave.
 */
export const StressTestV31Sequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Hero Entrance Physics (Frame 60 -> 120)
  const heroEntrance = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // 2. Camera Dive & Parallax (Frame 160 -> 240)
  const cameraDiveProgress = interpolate(frame, [160, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dynamicZoom = 1.0 + cameraDiveProgress * 0.12;

  // 3. BH3 Kinetic Spear Trajectory (Frame 230 -> 270)
  const spearProgress = interpolate(frame, [230, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const spearY = interpolate(spearProgress, [0, 1], [-350, 0]);

  // 4. Detonation Shockwave (Frame 270 -> 330)
  const impactProgress = interpolate(frame, [270, 330], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveRadius = impactProgress * 320;
  const shockwaveOpacity = interpolate(impactProgress, [0, 0.2, 1], [0, 1, 0]);

  // 5. Exit Transition Dissolve (Frame 330 -> 360)
  const exitProgress = interpolate(frame, [330, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = 1 - exitProgress;

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
      {/* 4 Discrete Audio Stems: Master Mix containing Narration + Music + SFX + Ambience */}
      <Audio src={staticFile('audio/final_master_mix.mp3')} volume={1.0} />

      {/* Living Camera Rig with Impact Shake at Frame 270 */}
      <LivingCameraRig
        durationInFrames={360}
        initialScale={1.0}
        targetScale={1.05 * dynamicZoom}
        driftIntensity={6.0}
        enableImpulseShake={true}
        shakeAtFrame={270}
        shakeIntensity={18.0}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Z0/Z1: Deep Volumetric Atmospheric Backlight & Cosmic Particles */}
          <Depth25DLayer depthZ={-220}>
            <div
              style={{
                position: 'absolute',
                top: '28%',
                left: '20%',
                width: 700,
                height: 700,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
                filter: 'blur(35px)',
              }}
            />
          </Depth25DLayer>

          <ParticleDrift particleCount={40} width={1080} height={1920} driftSpeed={0.75} />

          {/* Z5: Typographic Header (Pure Kinetic Editorial, NO Web Containers) */}
          <div
            style={{
              position: 'absolute',
              top: 200,
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
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 6,
                textTransform: 'uppercase',
                opacity: interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `translateY(${interpolate(frame, [10, 35], [15, 0], { extrapolateRight: 'clamp' })}px)`,
              }}
            >
              MITOCHONDRIAL APOPTOSIS • V3.1
            </div>

            <div
              style={{
                color: '#ffffff',
                fontSize: 54,
                fontWeight: 900,
                letterSpacing: -1,
                marginTop: 12,
                opacity: interpolate(frame, [25, 50], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `scale(${interpolate(frame, [25, 50], [0.9, 1.0], { extrapolateRight: 'clamp' })})`,
                textShadow: '0 0 35px rgba(6, 182, 212, 0.4)',
              }}
            >
              شکست سد دفاعی BCL-2
            </div>
          </div>

          {/* Z3: Hero Biological Organelle (Mitochondrial Phospholipid Bilayer & Cristae) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${heroEntrance})`,
              opacity: exitOpacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <OrganicBreathing amplitude={0.018} frequency={0.035} enableGlow={true} glowColor="rgba(6, 182, 212, 0.5)">
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

                {/* Incoming BH3 Mimetic Missile (Frame 230+) */}
                {frame >= 230 && (
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
                    <div style={{ width: 16, height: 70, borderRadius: 8, background: 'linear-gradient(to top, #ffffff, #06b6d4)', boxShadow: '0 0 30px #06b6d4' }} />
                    <div style={{ width: 4, height: 90, background: 'linear-gradient(to top, #06b6d4, transparent)' }} />
                  </div>
                )}

                {/* Relativistic Impact Shockwave Ring (Frame 270+) */}
                {frame >= 270 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 40,
                      width: shockwaveRadius * 2,
                      height: shockwaveRadius * 2,
                      borderRadius: '50%',
                      border: '4px solid #06b6d4',
                      opacity: shockwaveOpacity,
                      boxShadow: '0 0 40px #06b6d4',
                      pointerEvents: 'none',
                    }}
                  />
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
            delayFrames={90}
            accentColor="#ef4444"
          />

          <LaserCallout
            label="CYTOCHROME C CORE"
            sublabel="MITOCHONDRIAL MATRIX"
            originX={540}
            originY={960}
            targetX={840}
            targetY={1120}
            delayFrames={130}
            accentColor="#10b981"
          />

          {/* Z5: Unboxed Kinetic Typography Subtitles */}
          <div style={{ position: 'absolute', bottom: 340, width: '100%', padding: '0 50px', boxSizing: 'border-box', textAlign: 'center', opacity: exitOpacity }}>
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
