import React from 'react';
import { useCurrentFrame, AbsoluteFill, Sequence } from 'remotion';
import { V24NarrativeSynthesis } from './V24NarrativeSynthesis';

/**
 * V24 — MOTION REVIEW REEL
 * Duration: 360 frames (12.00s @ 30 FPS)
 * 
 * Sequentially showcases the critical dynamic peaks and contrast moments
 * of the 1,080-frame narrative sequence:
 * - 000 - 070f: Beat 02 Slingshot Acceleration
 * - 070 - 150f: Beat 04 Kinetic Peak & Coiling Orbit Ring
 * - 150 - 210f: Beat 05 Frozen Stillness Contrast
 * - 210 - 290f: Beat 06 Typographic Slam -> Compass Star Assembly
 * - 290 - 360f: Beat 07-08 Aperture Punch-Through -> Sovereign Plinth Settle
 */

export const V24MotionReview: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A' }}>
      <Sequence from={0} durationInFrames={70}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReviewSlice startFrame={140} />
        </div>
      </Sequence>

      <Sequence from={70} durationInFrames={80}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReviewSlice startFrame={410} />
        </div>
      </Sequence>

      <Sequence from={150} durationInFrames={60}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReviewSlice startFrame={550} />
        </div>
      </Sequence>

      <Sequence from={210} durationInFrames={80}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReviewSlice startFrame={665} />
        </div>
      </Sequence>

      <Sequence from={290} durationInFrames={70}>
        <div style={{ width: '100%', height: '100%' }}>
          <ReviewSlice startFrame={950} />
        </div>
      </Sequence>

      {/* Review Indicator Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          zIndex: 100,
        }}
      >
        <span
          style={{
            backgroundColor: '#D4AF37',
            color: '#020306',
            fontWeight: 900,
            fontSize: 14,
            padding: '2px 10px',
            borderRadius: 4,
          }}
        >
          V24 MOTION REVIEW
        </span>
        <span style={{ color: '#F8FAFC', fontSize: 16, fontWeight: 700 }}>
          {frame < 70
            ? 'Segment 1: Kinetic Slingshot Launch'
            : frame < 150
            ? 'Segment 2: Peak Topological Orbit Vortex'
            : frame < 210
            ? 'Segment 3: 2.5s Deliberate Silence Hold'
            : frame < 290
            ? 'Segment 4: Typographic Slam & Vector Dissection'
            : 'Segment 5: Aperture Plunge & Sovereign Settle'}
        </span>
      </div>
    </AbsoluteFill>
  );
};

const ReviewSlice: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const localFrame = useCurrentFrame();
  const globalSimulatedFrame = startFrame + localFrame;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReviewFrameWrapper frame={globalSimulatedFrame} />
    </div>
  );
};

// Internal wrapper passing simulated frame into V24NarrativeSynthesis
import { evaluateDirectorAtFrame, V24_EDITORIAL_NARRATIVE_PLAN } from '../../../../../src/director/AdaptiveDirector';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';
import { interpolate, Easing } from 'remotion';

const ReviewFrameWrapper: React.FC<{ frame: number }> = ({ frame }) => {
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
        {frame >= 120 && frame < 240 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {(() => {
              const b2Frame = frame - 120;
              let posX = 560;
              let scaleX = 1.0;
              let scaleY = 1.0;
              let trailWidth = 0;

              if (b2Frame < 30) {
                const p = b2Frame / 30;
                const pull = Easing.bezier(0.4, 0, 0.6, 1)(p);
                posX = interpolate(pull, [0, 1], [960, 480]);
                scaleX = interpolate(pull, [0, 1], [1.0, 0.7]);
                scaleY = interpolate(pull, [0, 1], [1.0, 1.3]);
              } else if (b2Frame < 70) {
                const p = (b2Frame - 30) / 40;
                const launch = Easing.bezier(0.12, 0, 0.39, 0)(p);
                posX = interpolate(launch, [0, 1], [480, 1280]);
                scaleX = interpolate(launch, [0, 0.4, 1], [0.7, 1.45, 1.0]);
                scaleY = interpolate(launch, [0, 0.4, 1], [1.3, 0.75, 1.0]);
                trailWidth = interpolate(launch, [0, 0.5, 1], [0, 320, 0]);
              } else {
                const p = Math.min(1, (b2Frame - 70) / 25);
                const settle = calculateSettleLock(b2Frame - 70, 0, { settleFrames: 25 });
                posX = interpolate(p, [0, 1], [1280, 1260]) + settle.translateY;
                scaleX = 1.0;
                scaleY = 1.0;
              }

              return (
                <>
                  {trailWidth > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: posX - trailWidth,
                        top: 538,
                        width: trailWidth,
                        height: 4,
                        background: `linear-gradient(to right, transparent, ${goldColor})`,
                        opacity: 0.8,
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      left: posX - 18,
                      top: 540 - 18,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: goldColor,
                      boxShadow: `0 0 28px ${goldColor}, 0 0 60px rgba(212, 175, 55, 0.5)`,
                      transform: `scale(${scaleX}, ${scaleY})`,
                    }}
                  />
                  {b2Frame > 40 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 480,
                        top: 480,
                        direction: 'rtl',
                        opacity: interpolate(b2Frame, [40, 65], [0, 1], {
                          extrapolateRight: 'clamp',
                        }),
                      }}
                    >
                      <div style={{ fontSize: 52, fontWeight: 900, color: '#F8FAFC' }}>
                        تمرکز
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {frame >= 390 && frame < 540 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {(() => {
              const b4Frame = frame - 390;
              const coilProgress = Easing.bezier(0.16, 1, 0.3, 1)(
                Math.min(1, Math.max(0, b4Frame / 75))
              );
              const rotation = interpolate(b4Frame, [0, 150], [0, 360]);
              const ringRadius = interpolate(coilProgress, [0, 1], [60, 220]);

              return (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 960 - ringRadius,
                      top: 540 - ringRadius,
                      width: ringRadius * 2,
                      height: ringRadius * 2,
                      borderRadius: '50%',
                      border: `3px solid ${goldColor}`,
                      boxShadow: `0 0 45px rgba(212, 175, 55, 0.8)`,
                      transform: `rotate(${rotation}deg)`,
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
                    <div
                      style={{
                        fontSize: 84,
                        fontWeight: 900,
                        color: '#F8FAFC',
                        textShadow: `0 0 40px ${goldColor}`,
                      }}
                    >
                      جهش
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {frame >= 540 && frame < 660 && (
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

        {frame >= 660 && frame < 810 && (
          <div style={{ position: 'absolute', inset: 0 }}>
            {(() => {
              const b6Frame = frame - 660;
              const emblemRotation = interpolate(b6Frame, [40, 150], [0, 90]);
              return (
                <div
                  style={{
                    position: 'absolute',
                    left: 960,
                    top: 540,
                    transform: `translate(-50%, -50%) rotate(${emblemRotation}deg)`,
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
              );
            })()}
          </div>
        )}

        {frame >= 810 && (
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
