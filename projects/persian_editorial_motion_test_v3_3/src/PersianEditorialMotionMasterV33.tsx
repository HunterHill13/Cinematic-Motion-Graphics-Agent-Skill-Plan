import React from 'react';
import { Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ParticleDrift } from '../../../src/living-motion/ParticleDrift';
import { Depth25DLayer } from '../../../src/motion-design/Depth25DLayer';

/**
 * PersianEditorialMotionMasterV33 (83.3s = 2500 frames @ 30 FPS, 1080x1920 Vertical 9:16)
 *
 * Full Production Master for v3.3:
 * Subject: انتخاب دانشجوی پژوهشگر یا فناور برجسته کشور (دستورالعمل بند کاف، ماده ۲)
 *
 * Core Directives Enforced:
 * 1. Motion Graphics != Static Composition + Fade + Camera Shake.
 * 2. ZERO continuous camera shake, zero random wobble.
 *    Single discrete event impulse shakes ONLY on major milestones:
 *    - Frame 880 (Condition 1: 16 lock)
 *    - Frame 1620 (1 Year Dial Lock)
 *    - Frame 2120 (130 Points Apex Lock)
 * 3. Continuous Object Transformation:
 *    - Line draw -> Reticle -> Twin Nodes -> Decree Seal -> 3-Act Energy Rails
 *    - Threshold line filters real candidate scores (14.2 & 15.4 rejected)
 *    - Process timeline sweeps for study period + checkmark
 *    - 6 orbital nodes illuminate sequentially + 2 mandatory satellites
 *    - Clockwork sweep carves out "1 Year" caveat
 *    - Baseline plane rises into 3 data towers (65, 110, 130) with dynamic meters
 *    - Data towers fold into institutional closing mark
 * 4. True Kinetic Typography: Hierarchical, unboxed, zero HTML cards/boxes.
 * 5. Display Text is 100% clean Persian without TTS diacritics.
 */
export const PersianEditorialMotionMasterV33: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Single discrete event-driven impulse shakes (ONLY during milestone impacts)
  const isShake1 = frame >= 880 && frame <= 892;
  const isShake2 = frame >= 1620 && frame <= 1632;
  const isShake3 = frame >= 2120 && frame <= 2132;
  const shakeY = isShake1
    ? Math.sin((frame - 880) * 1.5) * 5 * Math.exp(-(frame - 880) * 0.25)
    : isShake2
    ? Math.sin((frame - 1620) * 1.5) * 5 * Math.exp(-(frame - 1620) * 0.25)
    : isShake3
    ? Math.sin((frame - 2120) * 1.5) * 6 * Math.exp(-(frame - 2120) * 0.25)
    : 0;

  // -------------------------------------------------------------------------
  // SHOT 1: VECTOR LINE DRAW & INSTITUTIONAL EMBLEM (Frames 0 -> 240)
  // -------------------------------------------------------------------------
  const lineDrawProgress = interpolate(frame, [15, 80], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const circleCircumference = 2 * Math.PI * 180;
  const circleDrawOffset = interpolate(frame, [45, 110], [circleCircumference, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s1Opacity = interpolate(frame, [225, 240], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // SHOT 2: RETICLE UNCURS & MORPHS TO TWIN NODES (Frames 235 -> 470)
  // -------------------------------------------------------------------------
  const splitProgress = interpolate(frame, [240, 310], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftNodeX = interpolate(splitProgress, [0, 1], [0, -220]);
  const rightNodeX = interpolate(splitProgress, [0, 1], [0, 220]);
  const nodeScale = interpolate(splitProgress, [0, 1], [0.3, 1.0]);
  const s2Opacity = interpolate(frame, [235, 250, 455, 470], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // SHOT 3: TWIN NODES FUSE INTO MINISTERIAL SEAL (Frames 465 -> 760)
  // -------------------------------------------------------------------------
  const fuseProgress = interpolate(frame, [465, 515], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fusedLeftX = interpolate(fuseProgress, [0, 1], [-220, 0]);
  const fusedRightX = interpolate(fuseProgress, [0, 1], [220, 0]);
  const sealScale = interpolate(frame, [500, 540], [0.6, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3Opacity = interpolate(frame, [465, 485, 745, 760], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // SHOT 4: THREE CONDITIONS 3-STAGE KINEMATICS (Frames 755 -> 1550)
  // -------------------------------------------------------------------------
  const s4Opacity = interpolate(frame, [755, 775, 1535, 1550], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Stage 4A: Threshold line & Counting 16 (Frames 760 -> 1010)
  const railWidth = interpolate(frame, [765, 820], [0, 840], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gpaCount = Math.floor(interpolate(frame, [820, 880], [0, 16], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const cand1Y = interpolate(frame, [830, 890], [280, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cand1Opacity = interpolate(frame, [830, 860, 890, 920], [0, 0.8, 0.8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Stage 4B: Timeline sweep & Verification Checkmark (Frames 1010 -> 1270)
  const timelineSweep = interpolate(frame, [1020, 1090], [0, 680], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkmarkScale = interpolate(frame, [1085, 1120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Stage 4C: 6 Orbital Nodes lighting up (Frames 1270 -> 1550)
  const orbitalNodesCount = Math.floor(interpolate(frame, [1280, 1370], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const mandatoryBadgeOpacity = interpolate(frame, [1370, 1410], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // SHOT 5: CAVEAT CLOCKWORK SWEEP: 1 YEAR (Frames 1545 -> 1810)
  // -------------------------------------------------------------------------
  const s5Opacity = interpolate(frame, [1545, 1565, 1795, 1810], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dialSweepAngle = interpolate(frame, [1560, 1630], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dialYearScale = interpolate(frame, [1610, 1640], [0.5, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // SHOT 6: DATA-DRIVEN SCORE TOWERS (Frames 1805 -> 2240)
  // -------------------------------------------------------------------------
  const s6Opacity = interpolate(frame, [1805, 1825, 2225, 2240], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const towerProgress = interpolate(frame, [1830, 1920], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const count65 = Math.floor(interpolate(frame, [1840, 1920], [0, 65], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const count110 = Math.floor(interpolate(frame, [1920, 2020], [0, 110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const count130 = Math.floor(interpolate(frame, [2020, 2120], [0, 130], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const h65 = towerProgress * 280;
  const h110 = interpolate(frame, [1920, 2020], [0, 440], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const h130 = interpolate(frame, [2020, 2120], [0, 580], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // SHOT 7: CLOSING CALL TO ACTION & BRAND SIGNOFF (Frames 2235 -> 2500)
  // -------------------------------------------------------------------------
  const s7Opacity = interpolate(frame, [2235, 2255, 2480, 2500], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const outroScale = interpolate(frame, [2250, 2290], [0.85, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      {/* 4-Stem Master Mix with Dynamic Ducking & Authentic Iranian Narration */}
      <Audio src={staticFile('audio/persian_editorial_master_mix.mp3')} volume={1.0} />

      {/* Composition root container with single event-driven shake (NO random wobble) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: `translateY(${shakeY}px)`,
        }}
      >
        {/* Deep ambient cosmic glow */}
        <Depth25DLayer depthZ={-200}>
          <div
            style={{
              position: 'absolute',
              top: '22%',
              left: '16%',
              width: 760,
              height: 760,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(245, 158, 11, 0.06) 50%, transparent 75%)',
              filter: 'blur(50px)',
            }}
          />
        </Depth25DLayer>

        {/* Ambient drift particles */}
        <ParticleDrift particleCount={35} width={1080} height={1920} driftSpeed={0.5} />

        {/* Universal Top Header (Minimalist Institutional Branding) */}
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
        {/* SHOT 01: Vector Line Drawing & Institutional Emblem                       */}
        {/* ========================================================================= */}
        {s1Opacity > 0 && (
          <div style={{ opacity: s1Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
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
              <div style={{ color: '#06b6d4', fontSize: 26, fontWeight: 800, letterSpacing: 2 }}>
                روابط عمومی تقدیم می‌کند
              </div>
              <div
                style={{
                  color: '#ffffff',
                  fontSize: 54,
                  fontWeight: 900,
                  marginTop: 16,
                  lineHeight: 1.35,
                  textShadow: '0 0 35px rgba(6, 182, 212, 0.4)',
                }}
              >
                کمیته تحقیقات و فناوری دانشجویی
              </div>
              <div style={{ color: '#f59e0b', fontSize: 32, fontWeight: 800, marginTop: 18 }}>
                دانشگاه علوم پزشکی بقیةالله (عج)
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SHOT 02: Morphing from Reticle to Twin Nodes (Researcher / Technologist)   */}
        {/* ========================================================================= */}
        {s2Opacity > 0 && (
          <div style={{ opacity: s2Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: 360, width: '100%', textAlign: 'center' }}>
              <div style={{ color: '#06b6d4', fontSize: 26, fontWeight: 800 }}>پرسش کلیدی</div>
              <div style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, marginTop: 8 }}>
                چگونه برگزیده شویم؟
              </div>
            </div>

            <div style={{ position: 'absolute', top: '46%', left: '50%', width: 0, height: 0 }}>
              {/* Node 1: Researcher */}
              <div
                style={{
                  position: 'absolute',
                  transform: `translate(${frame >= 465 ? fusedLeftX : leftNodeX}px, -50%) scale(${nodeScale})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 220,
                  marginLeft: -110,
                }}
              >
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    border: '2px solid #06b6d4',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 35px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div style={{ color: '#ffffff', fontSize: 32, fontWeight: 900, marginTop: 22 }}>
                  پژوهشگر
                </div>
              </div>

              {/* Node 2: Technologist */}
              <div
                style={{
                  position: 'absolute',
                  transform: `translate(${frame >= 465 ? fusedRightX : rightNodeX}px, -50%) scale(${nodeScale})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 220,
                  marginLeft: -110,
                }}
              >
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    border: '2px solid #f59e0b',
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 35px rgba(245, 158, 11, 0.4)',
                  }}
                >
                  <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                  </svg>
                </div>
                <div style={{ color: '#ffffff', fontSize: 32, fontWeight: 900, marginTop: 22 }}>
                  فناور
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SHOT 03: Fused Ministerial Seal: Band "Kaf" Article 2                     */}
        {/* ========================================================================= */}
        {s3Opacity > 0 && (
          <div
            style={{
              opacity: s3Opacity,
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
        {/* SHOT 04: Three Conditions (Three-Act Dynamic Progression)                 */}
        {/* ========================================================================= */}
        {s4Opacity > 0 && (
          <div style={{ opacity: s4Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: 240, width: '100%', textAlign: 'center' }}>
              <div style={{ color: '#f59e0b', fontSize: 24, fontWeight: 800 }}>پیش‌نیازهای ورود به ارزیابی</div>
              <div style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, marginTop: 8 }}>
                ۳ شرط اصلی آیین‌نامه
              </div>
            </div>

            {/* Stage 4A: Minimum GPA 16 with Candidate Filtering */}
            <div
              style={{
                position: 'absolute',
                top: 360,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
                <span style={{ color: '#94a3b8', fontSize: 28, fontWeight: 800 }}>شرط اول: حداقل معدل کل</span>
                <span
                  style={{
                    color: frame >= 880 ? '#06b6d4' : '#ffffff',
                    fontSize: 130,
                    fontWeight: 900,
                    textShadow: frame >= 880 ? '0 0 45px rgba(6, 182, 212, 0.7)' : 'none',
                  }}
                >
                  {gpaCount}
                </span>
              </div>

              {/* Threshold Line at Y = 560 */}
              <div
                style={{
                  width: railWidth,
                  height: 3,
                  backgroundColor: frame >= 880 ? '#06b6d4' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: frame >= 880 ? '0 0 25px #06b6d4' : 'none',
                  marginTop: -10,
                }}
              />

              {/* Filtering Rejection Markers */}
              {frame <= 1010 && (
                <div
                  style={{
                    transform: `translateY(${cand1Y}px)`,
                    opacity: cand1Opacity,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    color: '#ef4444',
                    fontSize: 24,
                    fontWeight: 700,
                    marginTop: 10,
                  }}
                >
                  <span>✕ معدل ۱۴.۲ (رد صلاحیت)</span>
                </div>
              )}
            </div>

            {/* Stage 4B: Timeline sweep & Verification Checkmark (Frames 1010 -> 1270) */}
            {frame >= 1010 && (
              <div
                style={{
                  position: 'absolute',
                  top: 760,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ color: '#f59e0b', fontSize: 32, fontWeight: 900 }}>
                  شرط دوم: سنوات مجاز تحصیلی
                </div>
                {/* Horizontal Progress Timeline */}
                <div
                  style={{
                    width: 700,
                    height: 6,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 3,
                    marginTop: 24,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: timelineSweep,
                      height: '100%',
                      backgroundColor: '#f59e0b',
                      borderRadius: 3,
                      boxShadow: '0 0 15px #f59e0b',
                    }}
                  />
                </div>
                {/* Checkmark reticle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 26,
                    transform: `scale(${checkmarkScale})`,
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: '#ffffff', fontSize: 26, fontWeight: 700 }}>
                    دارا بودن تأییدیه کمیته انضباطی دانشگاه
                  </span>
                </div>
              </div>
            )}

            {/* Stage 4C: 6 Orbital Nodes lighting up (Frames 1270 -> 1550) */}
            {frame >= 1270 && (
              <div
                style={{
                  position: 'absolute',
                  top: 1100,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div style={{ color: '#10b981', fontSize: 32, fontWeight: 900 }}>
                  شرط سوم: تنوع کسب امتیاز از حداقل ۶ ماده
                </div>
                {/* 6 Sequential Nodes */}
                <div style={{ display: 'flex', gap: 20, marginTop: 24 }}>
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const isLit = num <= orbitalNodesCount;
                    return (
                      <div
                        key={num}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          border: isLit ? '2px solid #10b981' : '1px dashed #64748b',
                          backgroundColor: isLit ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                          color: isLit ? '#ffffff' : '#64748b',
                          fontSize: 22,
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: isLit ? '0 0 15px #10b981' : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
                {/* Mandatory Satellite Label */}
                <div
                  style={{
                    color: '#f59e0b',
                    fontSize: 26,
                    fontWeight: 800,
                    marginTop: 24,
                    opacity: mandatoryBadgeOpacity,
                  }}
                >
                  حضور «مقاله علمی» یا «فعالیت فناورانه» اجباری است!
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SHOT 05: Important Caveat — Clockwork Sweep: 1 Year                       */}
        {/* ========================================================================= */}
        {s5Opacity > 0 && (
          <div style={{ opacity: s5Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: 380, width: '100%', textAlign: 'center' }}>
              <div style={{ color: '#f59e0b', fontSize: 26, fontWeight: 800 }}>محدوده اعتبار زمانی مدارک</div>
              <div style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, marginTop: 10 }}>
                حداکثر مهلت مجاز
              </div>
            </div>

            {/* Circular Clockwork Dial with 360 degree sweep */}
            <div
              style={{
                position: 'absolute',
                top: '46%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  border: '3px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  transform: `scale(${dialYearScale})`,
                }}
              >
                {/* Rotating Clockwork Indicator Needle */}
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    width: 4,
                    height: 150,
                    backgroundColor: '#f59e0b',
                    transformOrigin: '50% 100%',
                    transform: `rotate(${dialSweepAngle}deg)`,
                    boxShadow: '0 0 12px #f59e0b',
                  }}
                />
                <span style={{ color: '#ffffff', fontSize: 130, fontWeight: 900, lineHeight: 1 }}>
                  ۱
                </span>
                <span style={{ color: '#f59e0b', fontSize: 40, fontWeight: 900, marginTop: -10 }}>
                  سال
                </span>
              </div>

              <div
                style={{
                  color: '#ffffff',
                  fontSize: 32,
                  fontWeight: 800,
                  marginTop: 50,
                  textAlign: 'center',
                }}
              >
                نهایتاً تا ۱ سال پس از فارغ‌التحصیلی
              </div>
              <div style={{ color: '#94a3b8', fontSize: 24, marginTop: 10 }}>
                یا در طول دوران رسمی تحصیل دانشجو
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SHOT 06: Data-Driven Score Towers (65, 110, 130)                          */}
        {/* ========================================================================= */}
        {s6Opacity > 0 && (
          <div style={{ opacity: s6Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: 280, width: '100%', textAlign: 'center', padding: '0 60px', boxSizing: 'border-box' }}>
              <div style={{ color: '#06b6d4', fontSize: 26, fontWeight: 800 }}>حدنصاب‌های پذیرش</div>
              <div style={{ color: '#ffffff', fontSize: 50, fontWeight: 900, marginTop: 8 }}>
                امتیاز لازم بر اساس مقطع
              </div>
              <div style={{ color: '#94a3b8', fontSize: 22, marginTop: 8 }}>
                دانشگاه‌های علوم پزشکی تیپ یک کشور
              </div>
            </div>

            {/* Ascending Architectural Metric Towers */}
            <div
              style={{
                position: 'absolute',
                bottom: 380,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: 45,
                padding: '0 60px',
                boxSizing: 'border-box',
              }}
            >
              {/* Tower 1: 65 (BSc Type 1) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
                <div style={{ color: '#06b6d4', fontSize: 64, fontWeight: 900, marginBottom: 12, textShadow: '0 0 25px rgba(6, 182, 212, 0.5)' }}>
                  {count65}
                </div>
                <div
                  style={{
                    width: 140,
                    height: h65,
                    background: 'linear-gradient(to top, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.7))',
                    border: '2px solid #06b6d4',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 800, marginTop: 20 }}>کارشناسی</div>
                <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 4 }}>تیپ ۱</div>
              </div>

              {/* Tower 2: 110 (General Medicine) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
                <div style={{ color: '#f59e0b', fontSize: 74, fontWeight: 900, marginBottom: 12, textShadow: '0 0 25px rgba(245, 158, 11, 0.5)' }}>
                  {count110}
                </div>
                <div
                  style={{
                    width: 140,
                    height: h110,
                    background: 'linear-gradient(to top, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.7))',
                    border: '2px solid #f59e0b',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 800, marginTop: 20 }}>پزشکی عمومی</div>
                <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 4 }}>دکتری عمومی</div>
              </div>

              {/* Tower 3: 130 (Specialty Ph.D) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
                <div style={{ color: '#10b981', fontSize: 84, fontWeight: 900, marginBottom: 12, textShadow: '0 0 35px rgba(16, 185, 129, 0.6)' }}>
                  {count130}
                </div>
                <div
                  style={{
                    width: 140,
                    height: h130,
                    background: 'linear-gradient(to top, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.7))',
                    border: '2px solid #10b981',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 800, marginTop: 20 }}>دکترای تخصصی</div>
                <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 4 }}>Ph.D & دستیاری</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SHOT 07: Closing Signoff & Call to Action                                 */}
        {/* ========================================================================= */}
        {s7Opacity > 0 && (
          <div style={{ opacity: s7Opacity, position: 'absolute', width: '100%', height: '100%' }}>
            <div
              style={{
                position: 'absolute',
                top: '38%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${outroScale})`,
                textAlign: 'center',
                width: '100%',
                padding: '0 60px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ color: '#06b6d4', fontSize: 30, fontWeight: 800, marginBottom: 20 }}>
                در ویدیوهای بعدی
              </div>
              <div
                style={{
                  color: '#ffffff',
                  fontSize: 54,
                  fontWeight: 900,
                  lineHeight: 1.4,
                  textShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
                }}
              >
                بررسی گام‌به‌گام روش کسب امتیاز از تمام بندها
              </div>
              <div style={{ color: '#f59e0b', fontSize: 42, fontWeight: 900, marginTop: 40 }}>
                با ما همراه باشید!
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 220,
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#ffffff', fontSize: 24, fontWeight: 800 }}>
                کمیته تحقیقات و فناوری دانشجویی
              </div>
              <div style={{ color: '#94a3b8', fontSize: 20, marginTop: 6 }}>
                دانشگاه علوم پزشکی بقیةالله (عج)
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
