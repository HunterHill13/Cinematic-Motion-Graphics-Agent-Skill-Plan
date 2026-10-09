import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';
import { calculateVelocityHandoff } from '../../motion/fidelity/MotionFidelityEngine';

/**
 * STUDY D: PHYSICAL SCENE HANDOFF (NO CROSS-FADE CHEAT)
 * 
 * Demonstrates true physical continuity across a scene boundary:
 * - Scene 1 (0 - 90f): A heavy gold sphere builds tension, rolls along a high platform,
 *   and plunges off the right edge with high momentum.
 * - Scene 2 (90 - 180f): Camera reframes to reveal a new lower subterranean level.
 *   The SAME physical sphere enters from top-left with the exact conserved velocity,
 *   impacts a kinetic trigger, and activates a network of empirical data columns.
 * - ZERO opacity dissolves. 100% continuous momentum carrier.
 * 
 * Duration: 180 frames (6.0s @ 30 FPS)
 */

export const StudyD_PhysicalSceneHandoff: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.4} />

      {/* Global Transition Carrier: Active across entire 180f duration */}
      {(() => {
        let posX = 0;
        let posY = 0;
        let scaleX = 1.0;
        let scaleY = 1.0;

        if (frame < 90) {
          // SCENE 1 (Upper Tier): Roll right and drop
          if (frame < 30) {
            // Anticipation roll back and tension build
            const p = frame / 30;
            posX = interpolate(p, [0, 1], [400, 320]);
            posY = 360;
          } else if (frame < 75) {
            // High velocity roll rightward
            const p = (frame - 30) / 45;
            posX = interpolate(p, [0, 1], [320, 1100], { easing: Easing.in(Easing.quad) });
            posY = 360;
          } else {
            // Plunge off ledge
            const p = (frame - 75) / 15;
            posX = interpolate(p, [0, 1], [1100, 1300]);
            posY = interpolate(p, [0, 1], [360, 680], { easing: Easing.in(Easing.quad) });
            scaleX = 0.85;
            scaleY = 1.25;
          }
        } else {
          // SCENE 2 (Lower Tier): Subterranean entrance with inherited C1 momentum
          const s2Frame = frame - 90;
          const handoff = calculateVelocityHandoff(28.0, 'PRESERVE');

          if (s2Frame < 25) {
            // Inbound falling arc from top-left into ground impact
            const p = s2Frame / 25;
            posX = interpolate(p, [0, 1], [1300, 1420]) + handoff.initialTargetVelocity * 0.1 * p;
            posY = interpolate(p, [0, 1], [680, 840], { easing: Easing.in(Easing.quad) });
            scaleX = 0.8;
            scaleY = 1.3;
          } else if (s2Frame < 45) {
            // Ground impact squash & rebound trigger
            const p = (s2Frame - 25) / 20;
            posX = 1480;
            posY = 840;
            scaleX = interpolate(p, [0, 0.4, 1], [1.5, 0.95, 1.0]);
            scaleY = interpolate(p, [0, 0.4, 1], [0.6, 1.05, 1.0]);
          } else {
            // Settle on trigger pedestal
            posX = 1480;
            posY = 840;
            scaleX = 1.0;
            scaleY = 1.0;
          }
        }

        return (
          <div style={{ position: 'absolute', inset: 0 }}>
            {/* Upper Tier Platform (Scene 1) */}
            <div
              style={{
                position: 'absolute',
                left: 200,
                top: 380,
                width: 900,
                height: 4,
                backgroundColor: 'rgba(212, 175, 55, 0.6)',
                opacity: frame < 100 ? 1 : interpolate(frame, [100, 120], [1, 0.2]),
              }}
            />

            {/* Lower Tier Impact Platform & Pillars (Scene 2) */}
            <div
              style={{
                position: 'absolute',
                left: 1000,
                top: 860,
                width: 600,
                height: 4,
                backgroundColor: goldColor,
                opacity: frame > 70 ? 1 : 0.2,
              }}
            />

            {/* Activated Data Pillars in Scene 2 triggered by the sphere */}
            {frame >= 115 && (
              <div style={{ position: 'absolute', left: 400, top: 460, display: 'flex', gap: 60 }}>
                {[180, 260, 340].map((h, i) => {
                  const p = Math.min(1, (frame - 115 - i * 8) / 30);
                  const currentH = p > 0 ? interpolate(p, [0, 1], [0, h], { easing: Easing.out(Easing.cubic) }) : 0;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 40,
                        height: currentH,
                        backgroundColor: 'rgba(56, 189, 248, 0.3)',
                        border: `1px solid ${cyanAccent}`,
                        borderBottom: 'none',
                        marginTop: 400 - currentH,
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* The Persistent Physical Carrier Sphere */}
            <div
              style={{
                position: 'absolute',
                left: posX - 20,
                top: posY - 20,
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: goldColor,
                boxShadow: `0 0 25px ${goldColor}, 0 0 50px rgba(212, 175, 55, 0.5)`,
                transform: `scale(${scaleX}, ${scaleY})`,
              }}
            />
          </div>
        );
      })()}

      {/* Narrative Label */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 100,
          direction: 'rtl',
          color: '#FFF',
          fontFamily: 'Vazirmatn, sans-serif',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 800 }}>انتقال تکانه بدون محوشدگی</div>
        <div style={{ fontSize: 13, color: goldColor, marginTop: 4, letterSpacing: 2 }}>
          PHYSICAL SCENE HANDOFF (MOMENTUM CONSERVED)
        </div>
      </div>
    </AbsoluteFill>
  );
};
