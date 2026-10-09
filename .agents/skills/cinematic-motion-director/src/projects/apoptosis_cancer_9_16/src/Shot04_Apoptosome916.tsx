import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { MotionEntrance } from '../../../motion-design/MotionEntrance';
import { KineticText } from '../../../motion-design/KineticText';
import { Depth25DLayer } from '../../../motion-design/Depth25DLayer';
import { VisualMotifCore } from '../../../motion-design/VisualMotifCore';

export const Shot04Apoptosome916: React.FC = () => {
  const frame = useCurrentFrame();

  const spokes = [0, 1, 2, 3, 4, 5, 6];
  const wheelRotation = interpolate(frame, [0, 251], [0, 110]);
  const corePulse = interpolate(Math.sin(frame * 0.18), [-1, 1], [0.7, 1.0]);

  return (
    <LivingCameraRig
      durationInFrames={251}
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
        {/* Layer 5: Deep Purple Cosmic Radiation */}
        <Depth25DLayer depthZ={-170}>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: 580,
              height: 580,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
            }}
          />
        </Depth25DLayer>

        {/* Layer 3: Kinetic Title */}
        <div style={{ position: 'absolute', top: 210, width: '100%', textAlign: 'center' }}>
          <MotionEntrance type="fadeDown" delayFrames={2}>
            <div style={{ color: '#a855f7', fontSize: 26, letterSpacing: 4, fontWeight: 800 }}>
              APOPTOSOME & EXECUTION
            </div>
          </MotionEntrance>

          <MotionEntrance type="overshootPop" delayFrames={8}>
            <div style={{ color: '#ffffff', fontSize: 46, fontWeight: 900, marginTop: 10 }}>
              آغاز آبشار مرگبار کاسپازها
            </div>
          </MotionEntrance>
        </div>

        {/* Layer 1: Heptameric Apoptosome Wheel of Death */}
        <div style={{ position: 'relative', width: 560, height: 560, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <OrganicBreathing amplitude={0.012} frequency={0.03} enableGlow={true} glowColor="rgba(168, 85, 247, 0.5)">
            <div
              style={{
                width: 560,
                height: 560,
                borderRadius: '50%',
                border: '3px dashed #a855f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transform: `rotate(${wheelRotation}deg)`,
                boxShadow: '0 0 50px rgba(168, 85, 247, 0.3)',
              }}
            >
              {/* Central Caspase-9 Activation Hub */}
              <div
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #c084fc 20%, #7e22ce 90%)',
                  boxShadow: `0 0 60px rgba(168, 85, 247, ${corePulse})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: 24,
                  letterSpacing: 2,
                  border: '3px solid #ffffff',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute' }}>
                  <VisualMotifCore stage="wheel_spoke" size={60} color="#ffffff" glowColor="rgba(192, 132, 252, 0.9)" />
                </div>
                <span style={{ position: 'relative', zIndex: 10, textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>CASP-9</span>
              </div>

              {/* 7 Apaf-1 Arm Spokes Assembling in Staggered Geometry */}
              {spokes.map((s) => {
                const angle = (s * 2 * Math.PI) / 7;
                const rad = 210;
                const sx = Math.cos(angle) * rad;
                const sy = Math.sin(angle) * rad;

                return (
                  <div
                    key={s}
                    style={{
                      position: 'absolute',
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #e9d5ff, #9333ea)',
                      border: '3px solid #ffffff',
                      boxShadow: '0 0 25px #c084fc',
                      transform: `translate(${sx}px, ${sy}px)`,
                    }}
                  />
                );
              })}
            </div>
          </OrganicBreathing>
        </div>

        {/* Layer 2: Pure Kinetic Typographic Narration (NO HTML CONTAINER CARD) */}
        <div style={{ position: 'absolute', bottom: 340, width: '100%', padding: '0 50px', boxSizing: 'border-box', textAlign: 'center' }}>
          <MotionEntrance type="fadeUp" delayFrames={16}>
            <KineticText
              text="تشکیل آپوپتوزوم، کاسپازهای مرگبار را فعال کرده و سلول خاموش می‌شود."
              highlightWord="کاسپازهای"
              highlightColor="#c084fc"
              fontSize={32}
              delayFrames={18}
            />
          </MotionEntrance>
        </div>
      </div>
    </LivingCameraRig>
  );
};
