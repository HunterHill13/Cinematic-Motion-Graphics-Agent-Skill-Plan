import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { MotionEntrance } from '../../../motion-design/MotionEntrance';
import { KineticText } from '../../../motion-design/KineticText';
import { Depth25DLayer } from '../../../motion-design/Depth25DLayer';

export const Shot03MOMPPuncture916: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic pore dilation
  const poreSize = interpolate(frame, [0, 80], [30, 200], {
    extrapolateRight: 'clamp',
  });
  const poreGlow = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.6, 1.0]);

  // Swarm of escaping Cytochrome c molecules
  const molecules = [
    { id: 0, angle: 0.1, speed: 380, delay: 10, scale: 32 },
    { id: 1, angle: 0.8, speed: 420, delay: 16, scale: 28 },
    { id: 2, angle: 1.6, speed: 360, delay: 24, scale: 34 },
    { id: 3, angle: 2.3, speed: 450, delay: 30, scale: 26 },
    { id: 4, angle: 3.2, speed: 400, delay: 38, scale: 30 },
    { id: 5, angle: 4.1, speed: 370, delay: 46, scale: 36 },
    { id: 6, angle: 5.0, speed: 440, delay: 52, scale: 28 },
    { id: 7, angle: 5.8, speed: 390, delay: 60, scale: 32 },
  ];

  return (
    <LivingCameraRig
      durationInFrames={240}
      initialScale={1.0}
      targetScale={1.07}
      driftIntensity={9.0}
      enableImpulseShake={true}
      shakeAtFrame={35}
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
        {/* Layer 5: Background Green-Cyan Volumetric Glow */}
        <Depth25DLayer depthZ={-160}>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '25%',
              width: 550,
              height: 550,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            }}
          />
        </Depth25DLayer>

        {/* Layer 3: Kinetic Title */}
        <div style={{ position: 'absolute', top: 210, width: '100%', textAlign: 'center' }}>
          <MotionEntrance type="fadeDown" delayFrames={2}>
            <div style={{ color: '#10b981', fontSize: 26, letterSpacing: 4, fontWeight: 800 }}>
              MOMP & CYTOCHROME C RELEASE
            </div>
          </MotionEntrance>

          <MotionEntrance type="overshootPop" delayFrames={8}>
            <div style={{ color: '#ffffff', fontSize: 44, fontWeight: 900, marginTop: 10 }}>
              نفوذپذیری غشا و رهایش سیتوکروم c
            </div>
          </MotionEntrance>
        </div>

        {/* Layer 1: Ruptured Mitochondrial Membrane with Glowing MOMP Pore */}
        <div style={{ position: 'relative', width: 540, height: 540, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <OrganicBreathing amplitude={0.018} frequency={0.045} enableGlow={true} glowColor="rgba(16, 185, 129, 0.6)">
            <div
              style={{
                width: 540,
                height: 540,
                borderRadius: '50%',
                border: '6px solid #10b981',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: `0 0 60px rgba(16, 185, 129, ${poreGlow * 0.7})`,
              }}
            >
              {/* Ruptured MOMP Pore Core */}
              <div
                style={{
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
                  letterSpacing: 2,
                }}
              >
                MOMP
              </div>

              {/* Escaping Cytochrome c Protein Spheres with Trailing Motion */}
              {molecules.map((m) => {
                const adj = Math.max(0, frame - m.delay);
                const progress = interpolate(adj, [0, 80], [0, 1], {
                  extrapolateRight: 'clamp',
                });
                const dist = progress * m.speed;
                const px = Math.cos(m.angle) * dist;
                const py = Math.sin(m.angle) * dist;

                return (
                  <div
                    key={m.id}
                    style={{
                      position: 'absolute',
                      width: m.scale,
                      height: m.scale,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #7dd3fc, #0284c7)',
                      boxShadow: '0 0 25px #38bdf8',
                      border: '2px solid #ffffff',
                      transform: `translate(${px}px, ${py}px)`,
                      opacity: progress > 0 ? 1 - progress * 0.35 : 0,
                    }}
                  />
                );
              })}
            </div>
          </OrganicBreathing>
        </div>

        {/* Layer 2: Kinetic Subtitle */}
        <div style={{ position: 'absolute', bottom: 350, width: '100%', padding: '0 40px', boxSizing: 'border-box' }}>
          <MotionEntrance type="fadeUp" delayFrames={18}>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: 20,
                padding: '20px 24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              }}
            >
              <KineticText
                text="با فعال شدن BAX، منافذ MOMP باز شده و سیتوکروم c آزاد می‌شود."
                highlightWord="BAX"
                highlightColor="#10b981"
                fontSize={28}
                delayFrames={22}
              />
            </div>
          </MotionEntrance>
        </div>
      </div>
    </LivingCameraRig>
  );
};
