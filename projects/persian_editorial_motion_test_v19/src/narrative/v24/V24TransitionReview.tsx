import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  evaluateDirectorAtFrame,
  V24_EDITORIAL_NARRATIVE_PLAN,
} from '../../../../../src/director/AdaptiveDirector';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';

/**
 * V24 — TRANSITION REVIEW (4K UHD 3840x2160)
 * Evaluates the 7 transition boundaries across the narrative sequence:
 * - T01 (f120): Datum Line -> Nucleus (TRANSFORM)
 * - T02 (f240): Nucleus -> Empirical Pillars (REFRAME)
 * - T03 (f390): Pillars -> Dynamic Curve & Ring (COLLAPSE)
 * - T04 (f540): Kinetic Vortex -> Frozen Iris (HOLD)
 * - T05 (f660): Frozen Iris -> Kinetic Slam & Star (EXPANSION)
 * - T06 (f810): Compass Star -> Aperture Portal (CAMERA)
 * - T07 (f960): Portal Exit -> Sovereign Crest (REFRAME)
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
      <V24TransitionFrameRenderer overrideFrame={frame} />
    </div>
  );
};

const V24TransitionFrameRenderer: React.FC<{ overrideFrame: number }> = ({ overrideFrame: frame }) => {
  const directorState = evaluateDirectorAtFrame(frame, V24_EDITORIAL_NARRATIVE_PLAN);
  const { currentBeat, cameraScale, cameraTranslateX, cameraTranslateY } = directorState;

  const goldColor = '#D4AF37';
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
        intensity={currentBeat.energyLevel === 1 ? 0.3 : 0.8}
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale}) translate(${cameraTranslateX}px, ${cameraTranslateY}px)`,
          transformOrigin: '960px 540px',
        }}
      >
        {frame === 120 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                top: 540,
                left: 960 - 240,
                width: 480,
                height: 4,
                backgroundColor: goldColor,
                borderRadius: 4,
                boxShadow: `0 0 20px ${goldColor}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 960 - 18,
                top: 540 - 18,
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: goldColor,
                boxShadow: `0 0 30px ${goldColor}`,
              }}
            />
          </div>
        )}

        {frame === 240 && (
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
              }}
            />
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
          </div>
        )}

        {frame === 390 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {[660, 840, 1020, 1200].map((posX, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: posX - 10,
                  top: 540 - 10,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: goldColor,
                  boxShadow: `0 0 20px ${cyanAccent}`,
                }}
              />
            ))}
          </div>
        )}

        {frame === 540 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 960 - 180,
                top: 540 - 180,
                width: 360,
                height: 360,
                borderRadius: '50%',
                border: `1.5px solid ${goldColor}`,
                boxShadow: `0 0 24px rgba(212, 175, 55, 0.4)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 960 - 3,
                top: 540 - 3,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: goldColor,
              }}
            />
          </div>
        )}

        {frame === 660 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 960,
                top: 360,
                transform: 'translate(-50%, -50%)',
                direction: 'rtl',
              }}
            >
              <div style={{ fontSize: 72, fontWeight: 900, color: '#F8FAFC' }}>
                شتاب
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 480,
                right: 480,
                top: 540,
                height: 2,
                backgroundColor: goldColor,
              }}
            />
          </div>
        )}

        {frame === 810 && (
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
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <line
                    key={idx}
                    x1={0}
                    y1={0}
                    x2={130 * Math.cos((angle * Math.PI) / 180)}
                    y2={130 * Math.sin((angle * Math.PI) / 180)}
                    stroke={goldColor}
                    strokeWidth={2.5}
                  />
                ))}
                <circle r={42} fill="none" stroke={goldColor} strokeWidth={2} />
              </svg>
            </div>
          </div>
        )}

        {frame === 960 && (
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
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const V24TransitionReview: React.FC = () => {
  const transitions = [
    { frame: 120, title: 'T01: DATUM → NUCLEUS', type: 'TRANSFORM' },
    { frame: 240, title: 'T02: NUCLEUS → PILLARS', type: 'REFRAME' },
    { frame: 390, title: 'T03: PILLARS → RING', type: 'COLLAPSE' },
    { frame: 540, title: 'T04: VORTEX → IRIS', type: 'HOLD / SILENCE' },
    { frame: 660, title: 'T05: IRIS → KINETIC SLAM', type: 'EXPANSION' },
    { frame: 810, title: 'T06: STAR → APERTURE', type: 'CAMERA THROUGH' },
    { frame: 960, title: 'T07: PORTAL → SOVEREIGN', type: 'REFRAME' },
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
            V24 AUDIT
          </span>
          <span style={{ color: '#F8FAFC', fontSize: 32, fontWeight: 900 }}>
            TRANSITION DECISION ENGINE — 7 BOUNDARY CONTACT SHEET (4K UHD)
          </span>
        </div>
        <div style={{ color: '#94A3B8', fontSize: 20, fontWeight: 600 }}>
          Zero Generic Dissolves • Author-Motivated Transformation Types
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 24,
          flex: 1,
        }}
      >
        {transitions.map((t, i) => (
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
              <span>{t.title}</span>
              <span style={{ color: '#D4AF37' }}>{t.type}</span>
            </div>

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
              <SubFrameMock frame={t.frame} />
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
