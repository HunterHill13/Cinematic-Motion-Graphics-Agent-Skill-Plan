import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill, staticFile, Img } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../../src/effects/CanvasAtmosphereV19';
import { calculateSettleLock } from '../../../../../src/motion/secondaryMotion';
import { ExternalVisualAsset } from '../../../../../src/assets/assetTypes';

/**
 * BENCHMARK 10 — ASSET → GEOMETRY (ISOLATED ASSET TEST HARNESS)
 * Duration: 210 frames (7.00s @ 30 FPS)
 * 
 * Flow:
 * External Asset Ingestion → Optical Bounds Scan → Vector Contour Trace
 * → Geometric Decomposition into Facets → Metamorphic Reconfiguration → Reassembly & Settle Lock
 * 
 * Strict Invariant (TRUE ASSET RULE):
 * The generic Skill contains 0 hardcoded logos.
 * This benchmark acts as an isolated sandbox for testing dynamic ExternalVisualAsset injection.
 */

// Isolated Benchmark Test Fixture Asset
const SAMPLE_TEST_ASSET: ExternalVisualAsset = {
  id: 'fixture_pr_seal',
  src: staticFile('assets/logos/pr_relations.png'),
  type: 'png',
  role: 'logo',
  preserveAspectRatio: true,
  opticalWidth: 220,
  opticalHeight: 220,
  clipPath: 'circle(49.2% at 50% 50%)',
};

export interface V23AssetGeometryBenchmarkProps {
  injectedAsset?: ExternalVisualAsset;
}

export const V23AssetGeometryBenchmark: React.FC<V23AssetGeometryBenchmarkProps> = ({
  injectedAsset = SAMPLE_TEST_ASSET,
}) => {
  const frame = useCurrentFrame();

  // Phase 1 (0 - 45f): Optical Bounds Entrance & Perimeter Trace
  const boundsProgress = interpolate(frame, [10, 40], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const assetSettle = calculateSettleLock(frame, 40, {
    anticipationFrames: 8,
    settleFrames: 14,
    scalePeak: 1.1,
  });

  // Phase 2 (45 - 85f): Vertical Scan Beam & Contour Extraction
  const scanBeamY = interpolate(frame, [45, 80], [-120, 120], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3 (85 - 130f): Geometric Decomposition into 12 Radial Facets
  const decompProgress = interpolate(frame, [85, 120], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4 (120 - 165f): Reconfiguration into Crystalline Compass
  const crystalProgress = interpolate(frame, [120, 155], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 5 (165 - 210f): Snap Reassembly back into Asset & Rigid Lock
  const reassembleProgress = interpolate(frame, [165, 195], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalSettle = calculateSettleLock(frame, 195, {
    anticipationFrames: 6,
    settleFrames: 12,
    scalePeak: 1.12,
  });

  // Active decomposition radius factor
  let facetDispersion = decompProgress;
  if (frame >= 165) {
    facetDispersion = 1 - reassembleProgress;
  }

  const assetOpacity = frame < 85 ? 1 : frame > 190 ? interpolate(frame, [190, 205], [0, 1]) : 1 - decompProgress;

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.95} />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 12,
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 13,
              padding: '2px 8px',
              borderRadius: 4,
            }}
          >
            BENCHMARK 10
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>
            تزریق نشان بیرونی → پویش نوری → تجزیه هندسی → بازآفرینی (Asset → Geometry)
          </span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 14 }}>
          {frame < 45 && 'فاز ۱: سنجش ابعاد نوری (Optical Bounds) و استقرار'}
          {frame >= 45 && frame < 85 && 'فاز ۲: پویش خطوط پیرامونی با پرتو نور'}
          {frame >= 85 && frame < 165 && 'فاز ۳: تجزیه به وجوه بلورین و بازآرایی هندسی'}
          {frame >= 165 && 'فاز ۴: همگرایی مغناطیسی و بازگشت پایدار'}
        </span>
      </div>

      {/* Central Asset Actor Container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${frame < 165 ? assetSettle.scale : finalSettle.scale}) translateY(${frame < 165 ? assetSettle.translateY : finalSettle.translateY}px)`,
          width: 500,
          height: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Optical Bounding Box Coordinate Ticks */}
        <div
          style={{
            position: 'absolute',
            width: (injectedAsset.opticalWidth || 220) + 40,
            height: (injectedAsset.opticalHeight || 220) + 40,
            border: '1px dashed rgba(212, 175, 55, 0.4)',
            borderRadius: 8,
            opacity: boundsProgress * (1 - facetDispersion * 0.7),
            pointerEvents: 'none',
          }}
        >
          {/* 4 Corner Markers */}
          <div style={{ position: 'absolute', top: -2, left: -2, width: 12, height: 12, borderTop: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
          <div style={{ position: 'absolute', top: -2, right: -2, width: 12, height: 12, borderTop: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />
          <div style={{ position: 'absolute', bottom: -2, left: -2, width: 12, height: 12, borderBottom: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37' }} />
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderBottom: '2px solid #D4AF37', borderRight: '2px solid #D4AF37' }} />
        </div>

        {/* Phase 2: Horizontal Scanning Laser Beam */}
        {frame >= 45 && frame < 85 && (
          <div
            style={{
              position: 'absolute',
              width: (injectedAsset.opticalWidth || 220) + 20,
              height: 2,
              backgroundColor: '#38BDF8',
              boxShadow: '0 0 16px #38BDF8, 0 0 30px #D4AF37',
              transform: `translateY(${scanBeamY}px)`,
              zIndex: 25,
            }}
          />
        )}

        {/* The Injected External Visual Asset */}
        <div
          style={{
            width: injectedAsset.opticalWidth || 220,
            height: injectedAsset.opticalHeight || 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: assetOpacity,
          }}
        >
          <Img
            src={injectedAsset.src}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              clipPath: injectedAsset.clipPath,
              filter: injectedAsset.filter,
              display: 'block',
            }}
          />
        </div>

        {/* Phase 3 & 4: Decomposed Geometric Facets */}
        {facetDispersion > 0.05 && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const ang = (i * 30) * (Math.PI / 180);
              const dist = facetDispersion * 160;
              const fx = Math.cos(ang) * dist;
              const fy = Math.sin(ang) * dist;
              const rot = i * 30 + facetDispersion * 90;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 24,
                    height: 24,
                    borderRadius: 3,
                    border: '1.5px solid #D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.25)',
                    transform: `translate(calc(-50% + ${fx}px), calc(-50% + ${fy}px)) rotate(${rot}deg)`,
                    boxShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
                    opacity: facetDispersion,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Specification */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Vazirmatn, system-ui, sans-serif',
          direction: 'rtl',
        }}
      >
        <span style={{ fontSize: 18, color: '#E2E8F0', fontWeight: 600 }}>
          انعطاف‌پذیری کامل سامانه برای پذیرش هرگونه نشان ورودی بدون وابستگی هاردکد در اسکیل اصلی
        </span>
      </div>
    </AbsoluteFill>
  );
};
