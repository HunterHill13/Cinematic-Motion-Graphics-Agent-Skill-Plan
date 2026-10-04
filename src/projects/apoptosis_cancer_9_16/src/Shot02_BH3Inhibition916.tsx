import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { LivingCameraRig } from '../../../living-motion/LivingCameraRig';
import { OrganicBreathing } from '../../../living-motion/OrganicBreathing';
import { SecondaryPhysics } from '../../../living-motion/SecondaryPhysics';

export const Shot02BH3Inhibition916: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Drug entry spring from top
  const drugY = interpolate(
    frame,
    [0, 45],
    [-200, 20],
    { extrapolateRight: 'clamp' }
  );

  // BCL-2 shield collapse
  const shieldIntegrity = interpolate(
    frame,
    [40, 90],
    [1.0, 0.15],
    { extrapolateRight: 'clamp' }
  );

  return (
    <LivingCameraRig
      durationInFrames={210}
      initialScale={1.02}
      targetScale={1.08}
      driftIntensity={7.0}
      enableImpulseShake={true}
      shakeAtFrame={45}
      shakeIntensity={10.0}
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
          <div style={{ color: '#06b6d4', fontSize: 28, letterSpacing: 3, fontWeight: 700 }}>
            TARGETED INHIBITION
          </div>
          <div style={{ color: '#ffffff', fontSize: 48, fontWeight: 800, marginTop: 8 }}>
            مهار هدفمند با مقلدهای BH3
          </div>
        </div>

        {/* Incoming Targeted Therapeutic BH3 */}
        <div
          style={{
            position: 'absolute',
            top: 480 + drugY,
            backgroundColor: '#06b6d4',
            color: '#090d16',
            padding: '12px 32px',
            borderRadius: 30,
            fontSize: 26,
            fontWeight: 800,
            boxShadow: '0 0 35px #06b6d4',
            zIndex: 10,
          }}
        >
          ⚡ BH3-MIMETIC DRUG
        </div>

        {/* Impacted BCL-2 Complex */}
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
              position: 'relative',
            }}
          >
            <div style={{ color: '#94a3b8', fontSize: 28, fontWeight: 700 }}>
              BCL-2 Neutralized
            </div>
            <div style={{ color: '#ef4444', fontSize: 20, marginTop: 8 }}>
              سپر دفاعی شکسته شد
            </div>
          </div>
        </OrganicBreathing>

        {/* Subtitle Card */}
        <div style={{ position: 'absolute', bottom: 360, width: '100%', textAlign: 'center' }}>
          <SecondaryPhysics delayFrames={6}>
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid #06b6d4',
                borderRadius: 16,
                padding: '16px 28px',
                display: 'inline-block',
                maxWidth: 700,
              }}
            >
              <div style={{ color: '#e2e8f0', fontSize: 26, lineHeight: 1.6, direction: 'rtl' }}>
                اما مهارکننده‌های هدفمند <b>BH3</b>، سپر BCL-2 را می‌شکنند.
              </div>
            </div>
          </SecondaryPhysics>
        </div>
      </div>
    </LivingCameraRig>
  );
};
