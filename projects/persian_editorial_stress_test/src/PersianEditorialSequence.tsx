import React from 'react';
import { Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { LivingCameraRig } from '../../../src/living-motion/LivingCameraRig';
import { ParticleDrift } from '../../../src/living-motion/ParticleDrift';
import { Depth25DLayer } from '../../../src/motion-design/Depth25DLayer';
import { LaserCallout } from '../../../src/motion-design/LaserCallout';

/**
 * PersianEditorialSequence (83.3s = 2500 frames @ 30 FPS, 9:16 Vertical)
 *
 * Subject:
 * شرایط و حدنصاب انتخاب دانشجوی پژوهشگر یا فناور برجسته کشور
 * بر اساس دستورالعمل بند «کاف»، ماده ۲ آیین‌نامه استعدادهای درخشان وزارت بهداشت
 *
 * Visual Identity:
 * روابط عمومی کمیته تحقیقات و فناوری دانشجویی • دانشگاه علوم پزشکی بقیةالله (عج)
 *
 * Architectural Principles:
 * 1. 100% Anti-HTML: Zero web card containers, zero rounded div panels.
 * 2. Pure Kinetic Editorial: Monumental typography, unboxed text, SVG reticles and gauges.
 * 3. Temporal Continuity: Physical morphing between shots instead of hard cuts.
 * 4. Narration != Transcript: Visual highlights key semantic data (16, 1 Year, 65, 110, 130).
 * 5. Display Text is 100% clean Persian without TTS diacritics.
 */
export const PersianEditorialSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Master Camera Progression (Continuous cinematic zoom across 83.3 seconds)
  const cameraZoom = interpolate(frame, [0, 760, 1550, 2240, 2500], [1.0, 1.05, 1.10, 1.14, 1.16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera impulse shakes at major narrative milestones
  // Frame 880 (Condition 1: 16), Frame 1620 (1 Year Caveat), Frame 2120 (130 Points Apex)
  const isShake1 = frame >= 880 && frame <= 895;
  const isShake2 = frame >= 1620 && frame <= 1635;
  const isShake3 = frame >= 2120 && frame <= 2135;
  const shakeOffset = (isShake1 || isShake2 || isShake3) ? Math.sin(frame * 2.5) * 8 : 0;

  // -------------------------------------------------------------------------
  // SHOT OPACITIES & CONTINUITY BLENDS (7 Shots)
  // Shot 1: 0 - 240
  // Shot 2: 240 - 470
  // Shot 3: 470 - 760
  // Shot 4: 760 - 1550
  // Shot 5: 1550 - 1810
  // Shot 6: 1810 - 2240
  // Shot 7: 2240 - 2500
  // -------------------------------------------------------------------------
  const s1Fade = interpolate(frame, [0, 20, 225, 240], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s2Fade = interpolate(frame, [235, 255, 455, 470], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3Fade = interpolate(frame, [465, 485, 745, 760], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s4Fade = interpolate(frame, [755, 775, 1535, 1550], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s5Fade = interpolate(frame, [1545, 1565, 1795, 1810], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s6Fade = interpolate(frame, [1805, 1825, 2225, 2240], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s7Fade = interpolate(frame, [2235, 2255, 2480, 2500], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      {/* Master 4-Stem Audio Track with Dynamic Ducking & Calibrated Iranian Narration */}
      <Audio src={staticFile('audio/persian_editorial_master_mix.mp3')} volume={1.0} />

      {/* Living Handheld Camera with Continuous Scale & Milestone Shakes */}
      <LivingCameraRig
        durationInFrames={2500}
        initialScale={cameraZoom}
        targetScale={cameraZoom * 1.01}
        driftIntensity={4.5}
        enableImpulseShake={false}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative', transform: `translateY(${shakeOffset}px)` }}>
          
          {/* Z0: Ambient Deep-Space Cosmic / Bioluminescent Glow */}
          <Depth25DLayer depthZ={-240}>
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                width: 780,
                height: 780,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 75%)',
                filter: 'blur(50px)',
              }}
            />
          </Depth25DLayer>

          {/* Living Particle Drift Field */}
          <ParticleDrift particleCount={40} width={1080} height={1920} driftSpeed={0.6} />

          {/* Top Universal Header Bar (Minimal Institutional Branding) */}
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
              zIndex: 50,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#06b6d4', boxShadow: '0 0 12px #06b6d4' }} />
              <span style={{ color: '#06b6d4', fontSize: 18, fontWeight: 800, letterSpacing: 1.5 }}>
                کمیته تحقیقات و فناوری دانشجویی
              </span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: 16, fontWeight: 600 }}>
              دانشگاه علوم پزشکی بقیةالله (عج)
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SHOT 01: Institutional Opening (Frames 0 -> 240)                          */}
          {/* ========================================================================= */}
          {s1Fade > 0 && (
            <div style={{ opacity: s1Fade, position: 'absolute', width: '100%', height: '100%' }}>
              {/* Central Concentric Rotating Reticles */}
              <div
                style={{
                  position: 'absolute',
                  top: '42%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${frame * 0.4}deg)`,
                  width: 520,
                  height: 520,
                  borderRadius: '50%',
                  border: '1px dashed rgba(6, 182, 212, 0.35)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '42%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${-frame * 0.25}deg)`,
                  width: 440,
                  height: 440,
                  borderRadius: '50%',
                  border: '2px solid rgba(245, 158, 11, 0.25)',
                }}
              />

              {/* Central Emblem SVG Crest */}
              <div
                style={{
                  position: 'absolute',
                  top: '42%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}
              >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              {/* Institutional Typography */}
              <div
                style={{
                  position: 'absolute',
                  top: 1100,
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
                    fontWeight: 900,
                    letterSpacing: 2,
                    marginBottom: 16,
                  }}
                >
                  روابط عمومی تقدیم می‌کند
                </div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: 52,
                    fontWeight: 900,
                    lineHeight: 1.4,
                    textShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  کمیته تحقیقات و فناوری دانشجویی
                </div>
                <div
                  style={{
                    color: '#f59e0b',
                    fontSize: 32,
                    fontWeight: 800,
                    marginTop: 20,
                  }}
                >
                  دانشگاه علوم پزشکی بقیةالله (عج)
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHOT 02: The Question (Frames 240 -> 470)                                 */}
          {/* ========================================================================= */}
          {s2Fade > 0 && (
            <div style={{ opacity: s2Fade, position: 'absolute', width: '100%', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 360,
                  width: '100%',
                  textAlign: 'center',
                  padding: '0 60px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ color: '#06b6d4', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
                  پرسش کلیدی
                </div>
                <div style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, lineHeight: 1.35 }}>
                  چگونه برگزیده شویم؟
                </div>
              </div>

              {/* Twin Illuminated Pedestals (Research & Technology) */}
              <div
                style={{
                  position: 'absolute',
                  top: 760,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 60,
                  padding: '0 80px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Node 1: Researcher */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: `translateY(${interpolate(frame, [250, 290], [50, 0], { extrapolateRight: 'clamp' })}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 170,
                      height: 170,
                      borderRadius: '50%',
                      border: '2px solid #06b6d4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
                      boxShadow: '0 0 35px rgba(6, 182, 212, 0.3)',
                    }}
                  >
                    <svg width="74" height="74" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: 34, fontWeight: 900, marginTop: 26 }}>
                    پژوهشگر برجسته
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 20, marginTop: 8 }}>تولید علم و مقالات برتر</div>
                </div>

                {/* Node 2: Technologist */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: `translateY(${interpolate(frame, [270, 310], [50, 0], { extrapolateRight: 'clamp' })}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 170,
                      height: 170,
                      borderRadius: '50%',
                      border: '2px solid #f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                      boxShadow: '0 0 35px rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    <svg width="74" height="74" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <rect x="9" y="9" width="6" height="6" />
                      <line x1="9" y1="1" x2="9" y2="4" />
                      <line x1="15" y1="1" x2="15" y2="4" />
                      <line x1="9" y1="20" x2="9" y2="23" />
                      <line x1="15" y1="20" x2="15" y2="23" />
                    </svg>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: 34, fontWeight: 900, marginTop: 26 }}>
                    فناور برجسته
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 20, marginTop: 8 }}>نوآوری، اختراع و محصول</div>
                </div>
              </div>

              {/* Bottom Target Highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: 1300,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: '#06b6d4', fontSize: 28, fontWeight: 800 }}>
                  انتخاب سالانه در سطح دانشگاه‌های علوم پزشکی کشور
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHOT 03: The Regulation (Frames 470 -> 760)                               */}
          {/* ========================================================================= */}
          {s3Fade > 0 && (
            <div style={{ opacity: s3Fade, position: 'absolute', width: '100%', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 380,
                  width: '100%',
                  textAlign: 'center',
                  padding: '0 60px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ color: '#f59e0b', fontSize: 26, fontWeight: 800, marginBottom: 12 }}>
                  مرجع قانونی امتیازدهی
                </div>
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: 72,
                    fontWeight: 900,
                    lineHeight: 1.2,
                    textShadow: '0 0 40px rgba(6, 182, 212, 0.45)',
                  }}
                >
                  بند «کاف» • ماده ۲
                </div>
                <div style={{ color: '#06b6d4', fontSize: 36, fontWeight: 800, marginTop: 24 }}>
                  آیین‌نامه استعدادهای درخشان
                </div>
                <div style={{ color: '#94a3b8', fontSize: 26, marginTop: 12 }}>
                  وزارت بهداشت، درمان و آموزش پزشکی
                </div>
              </div>

              {/* Geometric Pathway Ladder Graphic */}
              <div
                style={{
                  position: 'absolute',
                  top: 860,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 30,
                }}
              >
                <div style={{ width: 480, height: 2, backgroundColor: 'rgba(6, 182, 212, 0.4)' }} />
                <div style={{ color: '#ffffff', fontSize: 30, fontWeight: 800 }}>
                  مسیر جامع محاسبه و اعتبارسنجی فعالیت‌ها
                </div>
                <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
                  <div style={{ color: '#06b6d4', fontSize: 22, fontWeight: 700 }}>• فعالیت‌های پژوهشی</div>
                  <div style={{ color: '#f59e0b', fontSize: 22, fontWeight: 700 }}>• فعالیت‌های فناورانه</div>
                  <div style={{ color: '#10b981', fontSize: 22, fontWeight: 700 }}>• فعالیت‌های آموزشی</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHOT 04: Three Conditions (Frames 760 -> 1550)                            */}
          {/* ========================================================================= */}
          {s4Fade > 0 && (
            <div style={{ opacity: s4Fade, position: 'absolute', width: '100%', height: '100%' }}>
              {/* Header Title */}
              <div
                style={{
                  position: 'absolute',
                  top: 260,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: '#f59e0b', fontSize: 24, fontWeight: 800 }}>پیش‌نیازهای ورود به ارزیابی</div>
                <div style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, marginTop: 8 }}>
                  ۳ شرط اصلی آیین‌نامه
                </div>
              </div>

              {/* Condition 1: معدل ۱۶ (Frames 760 -> 1010) */}
              <div
                style={{
                  position: 'absolute',
                  top: 480,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: interpolate(frame, [770, 800], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
                  <span style={{ color: '#94a3b8', fontSize: 28, fontWeight: 800 }}>شرط اول: حداقل معدل</span>
                  <span
                    style={{
                      color: '#06b6d4',
                      fontSize: 120,
                      fontWeight: 900,
                      textShadow: '0 0 45px rgba(6, 182, 212, 0.6)',
                    }}
                  >
                    ۱۶
                  </span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 24, marginTop: -10 }}>در مقطع تحصیلی فعلی</div>
              </div>

              {/* Condition 2: سنوات مجاز + تأییدیه انضباطی (Frames 1010 -> 1270) */}
              <div
                style={{
                  position: 'absolute',
                  top: 860,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: interpolate(frame, [1010, 1040], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                <div style={{ width: 600, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 40 }} />
                <div style={{ color: '#f59e0b', fontSize: 34, fontWeight: 900 }}>
                  شرط دوم: سنوات مجاز تحصیلی
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: '#ffffff', fontSize: 26, fontWeight: 700 }}>
                    دارا بودن تأییدیه کمیته انضباطی دانشگاه
                  </span>
                </div>
              </div>

              {/* Condition 3: ۶ ماده آیین‌نامه + مقاله یا فناوری (Frames 1270 -> 1550) */}
              <div
                style={{
                  position: 'absolute',
                  top: 1180,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  opacity: interpolate(frame, [1270, 1300], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                <div style={{ width: 600, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 40 }} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
                  <span style={{ color: '#94a3b8', fontSize: 28, fontWeight: 800 }}>شرط سوم: تنوع کسب امتیاز از</span>
                  <span
                    style={{
                      color: '#10b981',
                      fontSize: 84,
                      fontWeight: 900,
                      textShadow: '0 0 35px rgba(16, 185, 129, 0.6)',
                    }}
                  >
                    ۶ ماده
                  </span>
                </div>
                <div style={{ color: '#f59e0b', fontSize: 26, fontWeight: 800, marginTop: 10 }}>
                  حضور «مقاله علمی» یا «فعالیت فناورانه» الزامی است!
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHOT 05: Important Caveat (Frames 1550 -> 1810)                           */}
          {/* ========================================================================= */}
          {s5Fade > 0 && (
            <div style={{ opacity: s5Fade, position: 'absolute', width: '100%', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 380,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <div style={{ color: '#f59e0b', fontSize: 26, fontWeight: 800 }}>نکته بسیار مهم زمانی</div>
                <div style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, marginTop: 10 }}>
                  محدوده اعتبار مدارک
                </div>
              </div>

              {/* Big Circular Dial Anchor: 1 Year */}
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
                    border: '3px solid #f59e0b',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
                    boxShadow: '0 0 50px rgba(245, 158, 11, 0.4)',
                  }}
                >
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
                    lineHeight: 1.5,
                  }}
                >
                  حداکثر تا ۱ سال پس از فارغ‌التحصیلی
                </div>
                <div style={{ color: '#94a3b8', fontSize: 24, marginTop: 10 }}>
                  یا در طول سنوات رسمی تحصیل دانشجو
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHOT 06: Score Thresholds (Frames 1810 -> 2240)                           */}
          {/* ========================================================================= */}
          {s6Fade > 0 && (
            <div style={{ opacity: s6Fade, position: 'absolute', width: '100%', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 280,
                  width: '100%',
                  textAlign: 'center',
                  padding: '0 60px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ color: '#06b6d4', fontSize: 26, fontWeight: 800 }}>حدنصاب‌های پذیرش</div>
                <div style={{ color: '#ffffff', fontSize: 50, fontWeight: 900, marginTop: 8 }}>
                  امتیاز لازم بر اساس مقطع
                </div>
                <div style={{ color: '#94a3b8', fontSize: 22, marginTop: 8 }}>
                  دانشگاه‌های علوم پزشکی تیپ یک کشور
                </div>
              </div>

              {/* Data-Driven Architectural Score Towers */}
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
                {/* Pillar 1: کارشناسی (65) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
                  <div
                    style={{
                      color: '#06b6d4',
                      fontSize: 64,
                      fontWeight: 900,
                      marginBottom: 12,
                      textShadow: '0 0 25px rgba(6, 182, 212, 0.5)',
                    }}
                  >
                    ۶۵
                  </div>
                  <div
                    style={{
                      width: 140,
                      height: 280,
                      background: 'linear-gradient(to top, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.6))',
                      border: '2px solid #06b6d4',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 800, marginTop: 20 }}>
                    کارشناسی
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 4 }}>تیپ ۱</div>
                </div>

                {/* Pillar 2: پزشکی عمومی (110) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
                  <div
                    style={{
                      color: '#f59e0b',
                      fontSize: 74,
                      fontWeight: 900,
                      marginBottom: 12,
                      textShadow: '0 0 25px rgba(245, 158, 11, 0.5)',
                    }}
                  >
                    ۱۱۰
                  </div>
                  <div
                    style={{
                      width: 140,
                      height: 440,
                      background: 'linear-gradient(to top, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.6))',
                      border: '2px solid #f59e0b',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 800, marginTop: 20 }}>
                    پزشکی عمومی
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 4 }}>دکتری عمومی</div>
                </div>

                {/* Pillar 3: دکترای تخصصی (130) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260 }}>
                  <div
                    style={{
                      color: '#10b981',
                      fontSize: 84,
                      fontWeight: 900,
                      marginBottom: 12,
                      textShadow: '0 0 35px rgba(16, 185, 129, 0.6)',
                    }}
                  >
                    ۱۳۰
                  </div>
                  <div
                    style={{
                      width: 140,
                      height: 580,
                      background: 'linear-gradient(to top, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.6))',
                      border: '2px solid #10b981',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 800, marginTop: 20 }}>
                    دکترای تخصصی
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 18, marginTop: 4 }}>Ph.D & دستیاری</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SHOT 07: Closing (Frames 2240 -> 2500)                                   */}
          {/* ========================================================================= */}
          {s7Fade > 0 && (
            <div style={{ opacity: s7Fade, position: 'absolute', width: '100%', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '38%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
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
                <div
                  style={{
                    color: '#f59e0b',
                    fontSize: 42,
                    fontWeight: 900,
                    marginTop: 40,
                  }}
                >
                  با ما همراه باشید!
                </div>
              </div>

              {/* Bottom Outro Brand Signoff */}
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
      </LivingCameraRig>
    </div>
  );
};
