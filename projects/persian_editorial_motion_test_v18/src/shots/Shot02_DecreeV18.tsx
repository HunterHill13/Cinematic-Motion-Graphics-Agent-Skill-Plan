import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateCollision } from '../../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { executeSymmetricFission } from '../../../../src/transition/carryTransitions';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../../src/motion/secondaryMotion';
import { evaluateProsodicState } from '../../../../src/motion/prosody/prosodicMotionHook';
import { AUTHORIZED_CONTENT } from '../../../../src/content/authorizedContent';
import { AutoFitText } from '../../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * SHOT 02 — THE OFFICIAL STATUTE DECREE MONOLITH (V18)
 * Reference-Integrated, Content-Locked, Anti-Cliché Motion Engineering
 * Frame Range: 350 - 650 (Global) / 0 - 300 (Local)
 */
export const Shot02_DecreeV18: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 350;

  // V18 Prosody-Driven Motion modulation
  const prosodic = evaluateProsodicState(globalFrame);
  const prosodicScale = prosodic?.modulatedScale ?? 1.0;
  const prosodicRim = prosodic?.rimIntensity ?? 0.6;

  // 1. Incoming T1 Intake (local 0 - 30f)
  const incomingCarryWidth = interpolate(localFrame, [0, 30], [200, 1100], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const incomingCarryOpacity = interpolate(localFrame, [0, 20, 35], [0.6, 1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Official Seal Collision at local f = 45 (global f = 395)
  const sealCollision = calculateCollision(localFrame, 45, {
    reboundAmplitude: 12,
    decay: 0.2,
    maxSquash: 0.16,
  });

  const ripple1 = calculateRipple(localFrame, 45, 40, 240);
  const sealSecondary = calculateCausalSecondaryReaction(localFrame, 45, 3, 26);

  // 3. Monolith Backdrop Growth
  const monolithGrowth = interpolate(localFrame, [10, 45], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Border Architectural Outline Draw
  const borderDraw = calculateDraw(localFrame, 25, 45, 2600);

  // 5. Outgoing T2 Symmetric Fission (local 270 - 300f)
  const fissionT2 = executeSymmetricFission(localFrame, 270, 300, {
    centerX: 960,
    leftTargetX: 420,
    rightTargetX: 1500,
  });

  const breathing = calculateIdleBreathing(localFrame, 0.35, 0.01);

  return (
    <CameraGrammarRig mode="slow-dolly" durationInFrames={300} intensity={1.0}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        {/* Incoming T1 Kinetic Ray */}
        {localFrame <= 35 && (
          <div
            style={{
              position: 'absolute',
              top: 720,
              width: incomingCarryWidth,
              height: 4,
              backgroundColor: '#D97706',
              opacity: incomingCarryOpacity,
              borderRadius: 2,
            }}
          />
        )}

        {/* Monolith Architectural Board */}
        <div
          style={{
            width: 1100,
            height: 620,
            backgroundColor: '#0A0F1D',
            border: '1px solid #1E293B',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 48,
            boxSizing: 'border-box',
            position: 'relative',
            opacity: fissionT2.opacity,
            transform: `scale(${monolithGrowth * breathing.scale * prosodicScale * (1 + sealCollision.displacementY * 0.002)})`,
          }}
        >
          {/* Header Decree Stamp */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 32,
              transform: `scale(${sealCollision.squashScaleX * (1 + (sealSecondary.expansionScale - 1) * 0.5)}) translateY(${sealCollision.displacementY}px)`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '2px solid #D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
                fontWeight: 900,
                fontSize: 22,
              }}
            >
              ماده ۱
            </div>
            <div>
              <AutoFitText
                text={AUTHORIZED_CONTENT.shot02.statuteHeadline.text}
                maxFontSize={28}
                color="#F8FAFC"
                dir="rtl"
                style={{ fontWeight: 800 }}
              />
              <AutoFitText
                text={AUTHORIZED_CONTENT.shot02.decreeSource.text}
                maxFontSize={20}
                color="#94A3B8"
                dir="rtl"
                style={{ marginTop: 4 }}
              />
            </div>
          </div>

          {/* Decree Body Text */}
          <div style={{ width: '100%', marginTop: 24, textAlign: 'right' }}>
            <AutoFitText
              text={AUTHORIZED_CONTENT.shot02.decreePathSummary.text}
              maxFontSize={24}
              color="#CBD5E1"
              dir="rtl"
              style={{ lineHeight: 1.8 }}
            />
          </div>

          {/* Shockwave Rings on Seal Hit */}
          {ripple1.active && (
            <div
              style={{
                position: 'absolute',
                top: 80,
                right: 90,
                width: ripple1.radius * 2,
                height: ripple1.radius * 2,
                borderRadius: '50%',
                border: '1.5px solid #D97706',
                opacity: ripple1.opacity,
                transform: 'translate(50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </div>
    </CameraGrammarRig>
  );
};
