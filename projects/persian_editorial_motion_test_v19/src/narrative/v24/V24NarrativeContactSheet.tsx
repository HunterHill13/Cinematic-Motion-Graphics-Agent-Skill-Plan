import React from 'react';
import { AbsoluteFill } from 'remotion';
import { V24NarrativeSynthesis } from './V24NarrativeSynthesis';

/**
 * V24 — NARRATIVE CONTACT SHEET (4K UHD 3840x2160)
 * Renders a 2x4 grid displaying representative keyframes from all 8 beats:
 * - Beat 01: Frame 60 (Genesis / Horizontal Datum)
 * - Beat 02: Frame 180 (Nucleus Acceleration / Trajectory)
 * - Beat 03: Frame 315 (Empirical Data Pillars)
 * - Beat 04: Frame 465 (Kinetic Peak / Dynamic Curve & Orbit Ring)
 * - Beat 05: Frame 600 (Deep Frozen Silence / Hairline Iris)
 * - Beat 06: Frame 735 (Kinetic Typography Slam -> Star Emblem)
 * - Beat 07: Frame 885 (Camera Aperture Punch-Through)
 * - Beat 08: Frame 1020 (Sovereign Resolution & Plinth Settle)
 */

interface SubFrameMockProps {
  frame: number;
}

const SubFrameMock: React.FC<SubFrameMockProps> = ({ frame }) => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        transform: 'scale(0.468)',
        transformOrigin: 'top left',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#04060A',
        border: '2px solid rgba(212, 175, 55, 0.4)',
      }}
    >
      {/* Remotion currentFrame emulation context wrapper */}
      <div style={{ width: 1920, height: 1080 }}>
        <InnerFrameEvaluator targetFrame={frame} />
      </div>
    </div>
  );
};

// Evaluator that injects simulated frame into children
const InnerFrameEvaluator: React.FC<{ targetFrame: number }> = ({ targetFrame }) => {
  // We can render V24NarrativeSynthesis directly using Remotion's Sequence or a direct simulation
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <V24FrameRenderer overrideFrame={targetFrame} />
    </div>
  );
};

// Direct frame renderer for static sheets
import {
  evaluateDirectorAtFrame,
  V24_EDITORIAL_NARRATIVE_PLAN,
} from '../../../../../src/director/AdaptiveDirector';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';
import { interpolate, Easing } from 'remotion';

const V24FrameRenderer: React.FC<{ overrideFrame: number }> = ({ overrideFrame: frame }) => {
  const directorState = evaluateDirectorAtFrame(frame, V24_EDITORIAL_NARRATIVE_PLAN);
  const { currentBeat, cameraScale, cameraTranslateX, cameraTranslateY } = directorState;

  const goldColor = '#D4AF37';
  const paleGold = '#F5E6AB';
  const cyanAccent = '#38BDF8';
  const slateDark = '#04060A';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: slateDark,
        overflow: 'hidden',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
      }}
    >
      <CanvasAtmosphereV19
        mood={currentBeat.energyLevel >= 4 ? 'azure' : 'gold'}
        intensity={currentBeat.energyLevel === 1 ? 0.3 : currentBeat.energyLevel >= 4 ? 1.1 : 0.6}
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale}) translate(${cameraTranslateX}px, ${cameraTranslateY}px)`,
          transformOrigin: '960px 540px',
        }}
      >
        {/* Render contents based on frame */}
        {frame <= 120 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                top: 620,
                left: 960 - 720,
                width: 1440,
                height: 2,
                backgroundColor: goldColor,
                boxShadow: `0 0 16px rgba(212, 175, 55, 0.5)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 550,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                direction: 'rtl',
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 800, color: '#F8FAFC' }}>
                نقطه آغاز
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, color: goldColor, marginTop: 8 }}>
                THE GENESIS OF INQUIRY
              </div>
            </div>
          </div>
        )}

        {frame > 120 && frame <= 240 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 1260 - 18,
                top: 540 - 18,
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: goldColor,
                boxShadow: `0 0 28px ${goldColor}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 480,
                top: 480,
                direction: 'rtl',
              }}
            >
              <div style={{ fontSize: 52, fontWeight: 900, color: '#F8FAFC' }}>
                تمرکز
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: cyanAccent, marginTop: 6 }}>
                CONVERGENT MOMENTUM
              </div>
            </div>
          </div>
        )}

        {frame > 240 && frame <= 390 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 560,
                top: 720,
                width: 800,
                height: 2,
                backgroundColor: 'rgba(212, 175, 55, 0.4)',
              }}
            />
            {[660, 840, 1020, 1200].map((posX, i) => {
              const h = [220, 360, 290, 420][i];
              return (
                <div key={i}>
                  <div
                    style={{
                      position: 'absolute',
                      left: posX - 28,
                      top: 720 - h,
                      width: 56,
                      height: h,
                      background: `linear-gradient(to top, rgba(212, 175, 55, 0.15), rgba(56, 189, 248, 0.4))`,
                      border: '1px solid rgba(212, 175, 55, 0.6)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: posX - 8,
                      top: 720 - h - 8,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: goldColor,
                    }}
                  />
                </div>
              );
            })}
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 180,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                direction: 'rtl',
              }}
            >
              <div style={{ fontSize: 42, fontWeight: 900, color: '#F8FAFC' }}>
                پایه‌های تجربی
              </div>
            </div>
          </div>
        )}

        {frame > 390 && frame <= 540 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 960 - 220,
                top: 540 - 220,
                width: 440,
                height: 440,
                borderRadius: '50%',
                border: `3px solid ${goldColor}`,
                boxShadow: `0 0 45px rgba(212, 175, 55, 0.8)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 540,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                direction: 'rtl',
              }}
            >
              <div style={{ fontSize: 84, fontWeight: 900, color: '#F8FAFC' }}>
                جهش
              </div>
            </div>
          </div>
        )}

        {frame > 540 && frame <= 660 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 1220 - 160,
                top: 540 - 160,
                width: 320,
                height: 320,
                borderRadius: '50%',
                border: '1.2px solid rgba(212, 175, 55, 0.85)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 160 - 3,
                  top: 160 - 3,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: goldColor,
                }}
              />
            </div>
            <div style={{ position: 'absolute', left: 360, top: 510, direction: 'rtl' }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#F8FAFC' }}>
                سکوت ژرف
              </div>
            </div>
          </div>
        )}

        {frame > 660 && frame <= 810 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 540,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <svg width={360} height={360} viewBox="-180 -180 360 360">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line
                      key={idx}
                      x1={0}
                      y1={0}
                      x2={130 * Math.cos(rad)}
                      y2={130 * Math.sin(rad)}
                      stroke={idx % 2 === 0 ? goldColor : cyanAccent}
                      strokeWidth={idx % 2 === 0 ? 3 : 1.5}
                    />
                  );
                })}
                <circle r={42} fill="none" stroke={goldColor} strokeWidth={2} />
                <circle r={18} fill={goldColor} />
              </svg>
            </div>
          </div>
        )}

        {frame > 810 && frame <= 960 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {[1.0, 1.8, 3.2].map((s, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: 960 - 200,
                  top: 540 - 200,
                  width: 400,
                  height: 400,
                  borderRadius: '50%',
                  border: `${3 - idx * 0.8}px solid ${idx === 0 ? goldColor : cyanAccent}`,
                  transform: `scale(${s * 1.5})`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        )}

        {frame > 960 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 380,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <svg width={260} height={260} viewBox="-130 -130 260 260">
                <circle r={110} fill="none" stroke={goldColor} strokeWidth={2} />
                <path
                  d="M 0 -95 L 24 -24 L 95 0 L 24 24 L 0 95 L -24 24 L -95 0 L -24 -24 Z"
                  fill="rgba(212, 175, 55, 0.2)"
                  stroke={goldColor}
                  strokeWidth={2.5}
                />
                <circle r={10} fill={goldColor} />
              </svg>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 960 - 240,
                top: 530,
                width: 480,
                height: 6,
                backgroundColor: goldColor,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 590,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                direction: 'rtl',
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 900, color: '#F8FAFC' }}>
                دانش ماندگار
              </div>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const V24NarrativeContactSheet: React.FC = () => {
  const beats = [
    { frame: 60, title: 'BEAT 01: GENESIS / DATUM', energy: 'Energy 2 • Static Cam' },
    { frame: 180, title: 'BEAT 02: NUCLEUS LAUNCH', energy: 'Energy 2 • Static Cam' },
    { frame: 315, title: 'BEAT 03: DATA PILLARS', energy: 'Energy 3 • Cam Push' },
    { frame: 465, title: 'BEAT 04: KINETIC PEAK', energy: 'Energy 5 • Cam Push' },
    { frame: 600, title: 'BEAT 05: FROZEN SILENCE', energy: 'Energy 1 • 75f Hold' },
    { frame: 735, title: 'BEAT 06: KINETIC TYPE SLAM', energy: 'Energy 4 • Static Cam' },
    { frame: 885, title: 'BEAT 07: APERTURE PLUNGE', energy: 'Energy 4 • Cam Through' },
    { frame: 1020, title: 'BEAT 08: SOVEREIGN SETTLE', energy: 'Energy 2 • Static Cam' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020306',
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
          paddingBottom: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#020306',
              fontSize: 22,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 6,
              marginRight: 18,
            }}
          >
            V24 MASTER
          </span>
          <span style={{ color: '#F8FAFC', fontSize: 32, fontWeight: 900 }}>
            NARRATIVE SYNTHESIS — 8 BEAT CONTACT SHEET (4K UHD)
          </span>
        </div>
        <div style={{ color: '#94A3B8', fontSize: 20, fontWeight: 600 }}>
          36.0 Seconds • 1,080 Frames • Energy Curve: [2, 2, 3, 5, 1, 4, 4, 2]
        </div>
      </div>

      {/* 2x4 Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 24,
          flex: 1,
        }}
      >
        {beats.map((b, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#070A10',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#F8FAFC',
                fontSize: 18,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              <span>{b.title}</span>
              <span style={{ color: '#D4AF37' }}>{b.energy}</span>
            </div>

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
              <SubFrameMock frame={b.frame} />
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
