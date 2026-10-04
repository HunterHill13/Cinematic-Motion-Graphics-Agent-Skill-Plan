import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { MotionEntrance } from '../../../motion-design/MotionEntrance';
import { KineticText } from '../../../motion-design/KineticText';
import { Depth25DLayer } from '../../../motion-design/Depth25DLayer';

export const Shot02BH3Inhibition916: React.FC = () => {
  const frame = useCurrentFrame();

  // Drug trajectory and collision animation
  const drugProgress = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const drugY = interpolate(drugProgress, [0, 1], [-260, 20]);
  const impactShockwave = interpolate(frame, [45, 90], [0, 220], {
    extrapolateRight: 'clamp',
  });
  const shockwaveOpacity = interpolate(frame, [45, 90], [1, 0], {
    extrapolateRight: 'clamp',
  });

  // Shield fracture and neutralization
  const shieldIntegrity = interpolate(frame, [45, 95], [1.0, 0.15], {
    extrapolateRight: 'clamp',
  });

  return (
    <LivingCameraRig
      durationInFrames={240}
      initialScale={1.02}
      targetScale={1.08}
      driftIntensity={7.0}
      enableImpulseShake={true}
      shakeAtFrame={48}
      shakeIntensity={12.0}
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
        {/* Layer 5: Background 2.5D Volumetric Beam */}
        <Depth25DLayer depthZ={-150}>
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '30%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            }}
          />
        </Depth25DLayer>

        {/* Layer 3: Kinetic Title */}
        <div style={{ position: 'absolute', top: 210, width: '100%', textAlign: 'center' }}>
          <MotionEntrance type="fadeDown" delayFrames={2}>
            <div style={{ color: '#06b6d4', fontSize: 26, letterSpacing: 4, fontWeight: 800 }}>
              TARGETED INHIBITION
            </div>
          </MotionEntrance>

          <MotionEntrance type="overshootPop" delayFrames={8}>
            <div style={{ color: '#ffffff', fontSize: 46, fontWeight: 900, marginTop: 10 }}>
              مهار هدفمند با مقلدهای BH3
            </div>
          </MotionEntrance>
        </div>

        {/* Layer 1: Central Complex + Incoming Drug Vector */}
        <div style={{ position: 'relative', width: 540, height: 540, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Incoming BH3-Mimetic Peptide Rocket */}
          <div
            style={{
              position: 'absolute',
              top: drugY,
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#06b6d4',
                color: '#090d16',
                padding: '12px 34px',
                borderRadius: 30,
                fontSize: 24,
                fontWeight: 900,
                boxShadow: '0 0 40px #06b6d4',
                border: '3px solid #ffffff',
                letterSpacing: 1,
              }}
            >
              ⚡ BH3-MIMETIC
            </div>
            {/* Trailing Energy Wake */}
            <div
              style={{
                width: 6,
                height: 60,
                background: 'linear-gradient(to top, #06b6d4, transparent)',
                marginTop: -4,
              }}
            />
          </div>

          {/* Impact Shockwave Ring */}
          {frame >= 45 && (
            <div
              style={{
                position: 'absolute',
                width: impactShockwave * 2,
                height: impactShockwave * 2,
                borderRadius: '50%',
                border: '4px solid #06b6d4',
                opacity: shockwaveOpacity,
                boxShadow: '0 0 30px #06b6d4',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Fracturing BCL-2 Complex */}
          <OrganicBreathing amplitude={0.012} frequency={0.035}>
            <div
              style={{
                width: 520,
                height: 520,
                borderRadius: '50%',
                border: `4px dashed rgba(239, 68, 68, ${shieldIntegrity})`,
                backgroundColor: 'rgba(30, 41, 59, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                filter: `brightness(${shieldIntegrity * 0.8 + 0.2})`,
                boxShadow: `0 0 40px rgba(239, 68, 68, ${shieldIntegrity * 0.4})`,
                position: 'relative',
              }}
            >
              <div style={{ color: '#94a3b8', fontSize: 30, fontWeight: 800 }}>
                BCL-2 NEUTRALIZED
              </div>
              <div style={{ color: '#ef4444', fontSize: 22, marginTop: 8, fontWeight: 700 }}>
                سپر دفاعی شکسته شد
              </div>
            </div>
          </OrganicBreathing>
        </div>

        {/* Layer 2: Kinetic Subtitle */}
        <div style={{ position: 'absolute', bottom: 350, width: '100%', padding: '0 40px', boxSizing: 'border-box' }}>
          <MotionEntrance type="fadeUp" delayFrames={20}>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                borderRadius: 20,
                padding: '20px 24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              }}
            >
              <KineticText
                text="اما مهارکننده‌های هدفمند BH3، سپر BCL-2 را می‌شکنند."
                highlightWord="BH3"
                highlightColor="#06b6d4"
                fontSize={28}
                delayFrames={24}
              />
            </div>
          </MotionEntrance>
        </div>
      </div>
    </LivingCameraRig>
  );
};
