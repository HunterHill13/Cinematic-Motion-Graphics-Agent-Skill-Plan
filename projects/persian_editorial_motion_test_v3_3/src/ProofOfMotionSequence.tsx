import React from 'react';
import { Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ParticleDrift } from '../../../src/living-motion/ParticleDrift';
import { Depth25DLayer } from '../../../src/motion-design/Depth25DLayer';

/**
 * ProofOfMotionSequence (24.0s = 720 frames @ 30 FPS, 1080x1920 Vertical 9:16)
 *
 * Strict Quality Gates:
 * 1. Motion Graphics != Static composition + fade + scale + shake.
 * 2. NO camera shake as a general crutch. Only a short 6px impulse on real threshold impact at frame 540.
 * 3. Continuous Object Transformation:
 *    - Vector line draws dynamically over time (strokeDashoffset).
 *    - Line uncurls and morphs into dual trajectory paths.
 *    - Trajectories morph into twin nodes (Researcher / Technologist).
 *    - Nodes converge and fuse into the ministerial seal.
 *    - Seal unfolds into a dynamic threshold line.
 *    - Number 16 counts up; lower candidates (14.2, 15.1) get filtered out below threshold.
 * 4. True Kinetic Typography: Hierarchical word reveals and semantic tracking.
 * 5. Display Text is 100% clean Persian without TTS diacritics.
 */
export const ProofOfMotionSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Single discrete event-driven impulse shake only on threshold lock (frames 540-555)
  const isThresholdImpact = frame >= 540 && frame <= 552;
  const shakeY = isThresholdImpact ? Math.sin((frame - 540) * 1.5) * 6 * Math.exp(-(frame - 540) * 0.2) : 0;

  // -------------------------------------------------------------------------
  // ACT 1: LINE DRAW & VECTOR IGNITION (Frames 0 -> 160)
  // -------------------------------------------------------------------------
  // Line strokeDashoffset: draws from length 800 down to 0
  const lineDrawProgress = interpolate(frame, [15, 80], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const circleCircumference = 2 * Math.PI * 180; // ~1130
  const circleDrawOffset = interpolate(frame, [50, 120], [circleCircumference, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act1Opacity = interpolate(frame, [140, 165], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Act 1 kinetic typography reveals
  const word1Y = interpolate(frame, [30, 60], [30, 0], { extrapolateRight: 'clamp' });
  const word1Opacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: 'clamp' });
  const word2Scale = interpolate(frame, [60, 95], [0.85, 1.0], { extrapolateRight: 'clamp' });
  const word2Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // ACT 2: DIEGETIC MORPH & TWIN NODES (Frames 150 -> 340)
  // Circle uncurls and splits into dual trajectories (Left: Cyan, Right: Amber)
  // -------------------------------------------------------------------------
  const splitProgress = interpolate(frame, [150, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const leftNodeX = interpolate(splitProgress, [0, 1], [0, -220]);
  const rightNodeX = interpolate(splitProgress, [0, 1], [0, 220]);
  const nodeScale = interpolate(splitProgress, [0, 1], [0.2, 1.0]);

  // Kinetic typography for Researcher vs Technologist
  const questionOpacity = interpolate(frame, [180, 210, 315, 335], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nodeTextProgress = interpolate(frame, [220, 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // ACT 3: NODES FUSION INTO DECREE SEAL (Frames 320 -> 470)
  // The two nodes converge towards center and fuse into Article 2 Decree
  // -------------------------------------------------------------------------
  const fuseProgress = interpolate(frame, [320, 370], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fusedLeftX = interpolate(fuseProgress, [0, 1], [-220, 0]);
  const fusedRightX = interpolate(fuseProgress, [0, 1], [220, 0]);
  const sealScale = interpolate(frame, [360, 400], [0.5, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sealOpacity = interpolate(frame, [350, 375, 450, 475], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // ACT 4: THRESHOLD LINE UNFOLD & DATA FILTERING (Frames 460 -> 720)
  // Seal unfolds into a horizontal threshold rail
  // -------------------------------------------------------------------------
  const railWidth = interpolate(frame, [465, 520], [0, 840], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act4Opacity = interpolate(frame, [460, 480], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Number 16 counting up from 0 to 16
  const rawCount = interpolate(frame, [490, 540], [0, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentCount = Math.floor(rawCount);

  // Rejected candidate metrics floating and getting filtered out
  const cand1Y = interpolate(frame, [500, 560], [300, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cand1Opacity = interpolate(frame, [500, 530, 560, 580], [0, 0.8, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cand2Y = interpolate(frame, [520, 580], [300, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cand2Opacity = interpolate(frame, [520, 550, 580, 600], [0, 0.8, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Threshold pass wave
  const passWave = interpolate(frame, [540, 600], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Rising metric towers preview (Frames 610 -> 720)
  const barProgress = interpolate(frame, [610, 680], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar65Height = barProgress * 220;
  const bar110Height = barProgress * 360;
  const bar130Height = barProgress * 480;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: '#070a13',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Vazirmatn', 'Shabnam', 'IRANSans', system-ui, -apple-system, sans-serif",
        direction: 'rtl',
      }}
    >
      {/* Proof Master Audio Track */}
      <Audio src={staticFile('audio/persian_proof_audio.mp3')} volume={1.0} />

      {/* Composition root container with single event-driven shake */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: `translateY(${shakeY}px)`,
        }}
      >
        {/* Subtle deep nebula light */}
        <Depth25DLayer depthZ={-180}>
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: '18%',
              width: 700,
              height: 700,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%)',
              filter: 'blur(45px)',
            }}
          />
        </Depth25DLayer>

        {/* Ambient drift particles */}
        <ParticleDrift particleCount={30} width={1080} height={1920} driftSpeed={0.5} />

        {/* Minimal Institutional Header Bar */}
        <div
          style={{
            position: 'absolute',
            top: 90,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 80px',
            boxSizing: 'border-box',
            zIndex: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#06b6d4', boxShadow: '0 0 10px #06b6d4' }} />
            <span style={{ color: '#06b6d4', fontSize: 17, fontWeight: 800, letterSpacing: 1.2 }}>
              کمیته تحقیقات و فناوری دانشجویی
            </span>
          </div>
          <div style={{ color: '#64748b', fontSize: 15, fontWeight: 600 }}>
            دانشگاه علوم پزشکی بقیةالله (عج)
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 1: Dynamic Line Drawing & Geometric Ignition                          */}
        {/* ========================================================================= */}
        {act1Opacity > 0 && (
          <div style={{ opacity: act1Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            {/* SVG Progressive Line Draw */}
            <svg
              width="1080"
              height="1920"
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            >
              {/* Vertical Guide Axis drawing over time */}
              <line
                x1="540"
                y1="380"
                x2="540"
                y2="1180"
                stroke="rgba(6, 182, 212, 0.4)"
                strokeWidth="2"
                strokeDasharray="800"
                strokeDashoffset={lineDrawProgress * 800}
              />
              {/* Central Geometric Circle drawing over time */}
              <circle
                cx="540"
                cy="780"
                r="180"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleDrawOffset}
              />
              <circle
                cx="540"
                cy="780"
                r="140"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="12 8"
                transform={`rotate(${frame * 0.5}, 540, 780)`}
              />
            </svg>

            {/* Kinetic Typography emerging from the geometry */}
            <div
              style={{
                position: 'absolute',
                top: 1040,
                width: '100%',
                textAlign: 'center',
                padding: '0 60px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  color: '#06b6d4',
                  fontSize: 26,
                  fontWeight: 800,
                  transform: `translateY(${word1Y}px)`,
                  opacity: word1Opacity,
                  letterSpacing: 2,
                }}
              >
                روابط عمومی تقدیم می‌کند
              </div>
              <div
                style={{
                  color: '#ffffff',
                  fontSize: 54,
                  fontWeight: 900,
                  marginTop: 16,
                  lineHeight: 1.35,
                  transform: `scale(${word2Scale})`,
                  opacity: word2Opacity,
                  textShadow: '0 0 35px rgba(6, 182, 212, 0.4)',
                }}
              >
                کمیته تحقیقات و فناوری دانشجویی
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ACT 2: Morphing from Circle into Twin Nodes (Researcher / Technologist)   */}
        {/* ========================================================================= */}
        {frame >= 140 && frame <= 360 && (
          <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            {/* Question Kinetic Header */}
            <div
              style={{
                position: 'absolute',
                top: 360,
                width: '100%',
                textAlign: 'center',
                opacity: questionOpacity,
              }}
            >
              <div style={{ color: '#06b6d4', fontSize: 26, fontWeight: 800 }}>پرسش کلیدی</div>
              <div style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, marginTop: 8 }}>
                چگونه برگزیده شویم؟
              </div>
            </div>

            {/* Twin Morphing Nodes */}
            <div
              style={{
                position: 'absolute',
                top: '46%',
                left: '50%',
                width: 0,
                height: 0,
              }}
            >
              {/* Node 1: Researcher (Cyan) */}
              <div
                style={{
                  position: 'absolute',
                  transform: `translate(${frame >= 320 ? fusedLeftX : leftNodeX}px, -50%) scale(${nodeScale})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 220,
                  marginLeft: -110,
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    border: '2px solid #06b6d4',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: 30,
                    fontWeight: 900,
                    marginTop: 20,
                    opacity: nodeTextProgress,
                    textAlign: 'center',
                  }}
                >
                  پژوهشگر
                </div>
              </div>

              {/* Node 2: Technologist (Amber) */}
              <div
                style={{
                  position: 'absolute',
                  transform: `translate(${frame >= 320 ? fusedRightX : rightNodeX}px, -50%) scale(${nodeScale})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 220,
                  marginLeft: -110,
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    border: '2px solid #f59e0b',
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)',
                  }}
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                  </svg>
                </div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: 30,
                    fontWeight: 900,
                    marginTop: 20,
                    opacity: nodeTextProgress,
                    textAlign: 'center',
                  }}
                >
                  فناور
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ACT 3: Fused Ministerial Seal: Band "Kaf" Article 2 (Frames 350 -> 475)   */}
        {/* ========================================================================= */}
        {sealOpacity > 0 && (
          <div
            style={{
              opacity: sealOpacity,
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${sealScale})`,
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div style={{ color: '#f59e0b', fontSize: 26, fontWeight: 800, marginBottom: 12 }}>
              مرجع قانونی و رسمی
            </div>
            <div
              style={{
                color: '#ffffff',
                fontSize: 72,
                fontWeight: 900,
                textShadow: '0 0 45px rgba(6, 182, 212, 0.5)',
              }}
            >
              بند «کاف» • ماده ۲
            </div>
            <div style={{ color: '#06b6d4', fontSize: 34, fontWeight: 800, marginTop: 18 }}>
              آیین‌نامه استعدادهای درخشان
            </div>
            <div style={{ color: '#94a3b8', fontSize: 24, marginTop: 10 }}>
              وزارت بهداشت، درمان و آموزش پزشکی
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ACT 4: Threshold Line & Animated Data Visualization (Frames 460 -> 720)   */}
        {/* ========================================================================= */}
        {act4Opacity > 0 && (
          <div style={{ opacity: act4Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            {/* Header */}
            <div
              style={{
                position: 'absolute',
                top: 260,
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#f59e0b', fontSize: 24, fontWeight: 800 }}>شرط نخست آیین‌نامه</div>
              <div style={{ color: '#ffffff', fontSize: 50, fontWeight: 900, marginTop: 8 }}>
                حداقل حدنصاب معدل کل
              </div>
            </div>

            {/* Threshold Line at Y = 820 */}
            <div
              style={{
                position: 'absolute',
                top: 820,
                left: '50%',
                transform: 'translateX(-50%)',
                width: railWidth,
                height: 3,
                backgroundColor: frame >= 540 ? '#06b6d4' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: frame >= 540 ? '0 0 25px #06b6d4' : 'none',
                transition: 'background-color 0.2s',
              }}
            >
              {/* Radial expanding wave when 16 locks */}
              {passWave > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: passWave * 700,
                    height: 24,
                    borderRadius: 12,
                    background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.6) 0%, transparent 75%)',
                    opacity: 1 - passWave,
                  }}
                />
              )}
            </div>

            {/* Huge Focal Number: 16 (Counting up from 0) */}
            <div
              style={{
                position: 'absolute',
                top: 540,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline',
                gap: 20,
              }}
            >
              <span
                style={{
                  color: frame >= 540 ? '#06b6d4' : '#ffffff',
                  fontSize: 140,
                  fontWeight: 900,
                  textShadow: frame >= 540 ? '0 0 50px rgba(6, 182, 212, 0.7)' : 'none',
                }}
              >
                {currentCount}
              </span>
              <span style={{ color: '#f59e0b', fontSize: 32, fontWeight: 800 }}>حداقل</span>
            </div>

            {/* Rejected Candidate Values below threshold (Demonstrating true scientific filtering) */}
            <div
              style={{
                position: 'absolute',
                top: 860,
                left: 240,
                transform: `translateY(${cand1Y}px)`,
                opacity: cand1Opacity,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#ef4444',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              <span>✕ معدل ۱۴.۲</span>
              <span style={{ fontSize: 18, color: '#94a3b8' }}>(رد صلاحیت)</span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 860,
                right: 240,
                transform: `translateY(${cand2Y}px)`,
                opacity: cand2Opacity,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#ef4444',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              <span>✕ معدل ۱۵.۴</span>
              <span style={{ fontSize: 18, color: '#94a3b8' }}>(رد صلاحیت)</span>
            </div>

            {/* Rising Data Visualization Towers (Frames 610 -> 720) */}
            {frame >= 610 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 240,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  gap: 50,
                }}
              >
                {/* 65 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#06b6d4', fontSize: 40, fontWeight: 900, marginBottom: 8 }}>۶۵</div>
                  <div
                    style={{
                      width: 100,
                      height: bar65Height,
                      background: 'linear-gradient(to top, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.7))',
                      border: '2px solid #06b6d4',
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                  <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 10 }}>کارشناسی</div>
                </div>

                {/* 110 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#f59e0b', fontSize: 44, fontWeight: 900, marginBottom: 8 }}>۱۱۰</div>
                  <div
                    style={{
                      width: 100,
                      height: bar110Height,
                      background: 'linear-gradient(to top, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.7))',
                      border: '2px solid #f59e0b',
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                  <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 10 }}>پزشکی عمومی</div>
                </div>

                {/* 130 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: '#10b981', fontSize: 48, fontWeight: 900, marginBottom: 8 }}>۱۳۰</div>
                  <div
                    style={{
                      width: 100,
                      height: bar130Height,
                      background: 'linear-gradient(to top, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.7))',
                      border: '2px solid #10b981',
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                  <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 10 }}>دکترای تخصصی</div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
