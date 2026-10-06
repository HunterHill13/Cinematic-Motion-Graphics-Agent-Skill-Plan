import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill, staticFile, Img } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../src/motion/secondaryMotion';
import { ExternalVisualAsset } from '../../../../src/assets/assetTypes';

/**
 * V22 ASSET INTEGRATION BENCHMARK (300 frames @ 30 FPS = 10.00s)
 * 
 * Strict Isolation Rule:
 * The 3 test logos (PR seal, University emblem, Committee crest) live ONLY here.
 * They prove the generic ExternalVisualAsset pipeline:
 * 1. PNG / RGBA ingestion
 * 2. Transparency handling (alpha channel vs monochrome inversion)
 * 3. Aspect-ratio preservation
 * 4. Optical balance & sizing
 * 5. Dynamic reveal & settle lock
 * 6. Dual-entity institutional lockup
 */

const TEST_ASSETS: Record<string, ExternalVisualAsset> = {
  prSeal: {
    id: 'test_pr_seal',
    src: staticFile('assets/logos/pr_relations.png'),
    type: 'png',
    role: 'logo',
    preserveAspectRatio: true,
    opticalWidth: 200,
    opticalHeight: 200,
    clipPath: 'circle(49.2% at 50% 50%)',
  },
  universityEmblem: {
    id: 'test_university_emblem',
    src: staticFile('assets/logos/university.png'),
    type: 'png',
    role: 'logo',
    preserveAspectRatio: true,
    opticalWidth: 160,
    opticalHeight: 200,
    filter: 'brightness(0) invert(1) drop-shadow(0 0 16px rgba(212, 175, 55, 0.45))',
  },
  committeeEmblem: {
    id: 'test_committee_emblem',
    src: staticFile('assets/logos/research_committee.png'),
    type: 'png',
    role: 'logo',
    preserveAspectRatio: true,
    opticalWidth: 190,
    opticalHeight: 180,
    filter: 'drop-shadow(0 0 18px rgba(56, 189, 248, 0.35))',
  },
};

export const V22AssetIntegrationBenchmark: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={1.0} />

      {/* Benchmark Header */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 14,
          zIndex: 50,
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: '#38BDF8',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 13,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            ASSET LAB
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            آزمایشگاه تزریق دارایی‌های بصری خارجی (External Visual Asset API)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 150
            ? 'بخش ۱: رونمایی لوگوی دایره‌ای با کلیپ‌پث و حلقه پیرامونی'
            : 'بخش ۲: چیدمان متوازن دوگانه سازمانی با فیلتر کنتراست تیره'}
        </span>
      </div>

      {/* Part 1: Circular Seal Ingestion & Reveal (0 - 150f) */}
      {frame < 150 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const settle = calculateSettleLock(frame, 35, {
              anticipationFrames: 10,
              settleFrames: 16,
              scalePeak: 1.1,
            });
            const ringDraw = interpolate(frame, [10, 40], [0, 640], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `scale(${settle.scale}) translateY(${settle.translateY}px)`,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: TEST_ASSETS.prSeal.opticalWidth,
                    height: TEST_ASSETS.prSeal.opticalHeight,
                    borderRadius: '50%',
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.4), 0 10px 30px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  <svg
                    width="216"
                    height="216"
                    viewBox="0 0 216 216"
                    style={{ position: 'absolute', top: -8, left: -8, transform: 'rotate(-90deg)' }}
                  >
                    <circle cx="108" cy="108" r="102" fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1.5" />
                    <circle
                      cx="108"
                      cy="108"
                      r="102"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="2.5"
                      strokeDasharray={640}
                      strokeDashoffset={640 - ringDraw}
                    />
                  </svg>
                  <Img
                    src={TEST_ASSETS.prSeal.src}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      clipPath: TEST_ASSETS.prSeal.clipPath,
                      display: 'block',
                    }}
                  />
                </div>
                <span
                  style={{
                    marginTop: 24,
                    color: '#F8FAFC',
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: 'Vazirmatn, sans-serif',
                  }}
                >
                  تأیید صحت کلیپ‌پث، حفظ نسبت تصویر و ثبات قطعی در فریم ۳۵
                </span>
              </div>
            );
          })()}
        </AbsoluteFill>
      )}

      {/* Part 2: Dual Institutional Lockup (150 - 300f) */}
      {frame >= 150 && (
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const local = frame - 150;
            const settle = calculateSettleLock(local, 30, {
              anticipationFrames: 10,
              settleFrames: 14,
              scalePeak: 1.06,
            });

            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 80,
                  transform: `scale(${settle.scale}) translateY(${settle.translateY}px)`,
                  direction: 'rtl',
                  fontFamily: 'Vazirmatn, sans-serif',
                }}
              >
                {/* Entity 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 380 }}>
                  <Img
                    src={TEST_ASSETS.universityEmblem.src}
                    style={{
                      maxHeight: TEST_ASSETS.universityEmblem.opticalHeight,
                      width: 'auto',
                      filter: TEST_ASSETS.universityEmblem.filter,
                    }}
                  />
                  <span style={{ marginTop: 16, fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>
                    دانشگاه علوم پزشکی بقیه‌الله (عج)
                  </span>
                </div>

                {/* Central Pillar */}
                <div style={{ width: 2, height: 200, backgroundColor: '#D4AF37', boxShadow: '0 0 14px #D4AF37' }} />

                {/* Entity 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 380 }}>
                  <Img
                    src={TEST_ASSETS.committeeEmblem.src}
                    style={{
                      maxHeight: TEST_ASSETS.committeeEmblem.opticalHeight,
                      width: 'auto',
                      filter: TEST_ASSETS.committeeEmblem.filter,
                    }}
                  />
                  <span style={{ marginTop: 16, fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>
                    کمیته تحقیقات و فناوری دانشجویی
                  </span>
                </div>
              </div>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
