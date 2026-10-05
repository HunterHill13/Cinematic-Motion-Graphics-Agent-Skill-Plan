import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeDimensionalPortal } from '../../../../src/motion/recipes/DimensionalPortalRecipe';
import { executeElasticSnapping } from '../../../../src/motion/recipes/ElasticSnappingRecipe';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 06 — INSTITUTIONAL SEAL & GRAND FINALE (V11)
 * Frame Range: 2155 - 2361 (Global) / 0 - 206 (Local)
 * - Incoming Carry (T5): Gravitational singularity expands into Heraldic Core (local 0 - 40f)
 * - Semantic Acoustic Sync:
 *     f2186 (local 31f): Outro speech start
 *     f2195 (local 40f): «دانشگاه علوم پزشکی بقیه‌الله»
 *     f2317 (local 162f): Speech conclusion
 *     f2361 (local 206f): Master resolve
 * - Motion Recipes: DimensionalPortal + ElasticSnapping
 */
export const Shot06_OutroV11: React.FC = () => {
  const localFrame = useCurrentFrame();
  const globalFrame = localFrame + 2155;

  // Semantic Acoustic Sync
  const outroSync = calculateSyncPhrase(globalFrame, 'دانشگاه علوم پزشکی بقیه‌الله');

  // Dimensional Portal Recipe: expanding aperture from singularity core
  const portal = executeDimensionalPortal(localFrame, 5, 40);

  // Elastic Snapping Recipe for University Crest badge settle
  const crestSnap = executeElasticSnapping(localFrame, 10, 40, 75, 45);

  // Concentric Shockwave Ripple on local f40 strike
  const shockwave = calculateRipple(localFrame, 40, 45, 360, 4);

  // Circular laurel wreath / vector border draw
  const wreathDraw = calculateDraw(localFrame, 40, 45, 880);

  // Committee Credits Reveal: «کمیته تحقیقات دانشجویی» (local f70 - 100)
  const creditsOpacity = interpolate(localFrame, [70, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const creditsSlideY = interpolate(localFrame, [70, 100], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#07090E',
        color: '#F8FAFC',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        direction: 'rtl',
        overflow: 'hidden',
      }}
    >
      {/* Background Architectural Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Radiant Background Aura from Center Singularity */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(2, 132, 199, 0.08) 50%, transparent 70%)',
          opacity: portal.reveal.opacity,
          pointerEvents: 'none',
        }}
      />

      {/* Shockwave Rings on Crest Strike */}
      {shockwave.active && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: shockwave.radius * 2,
            height: shockwave.radius * 2,
            borderRadius: '50%',
            border: `${shockwave.strokeWidth}px solid rgba(16, 185, 129, 0.7)`,
            opacity: shockwave.opacity,
            boxShadow: '0 0 32px rgba(16, 185, 129, 0.5)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top Header Rail */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 14,
          fontFamily: 'monospace',
          fontSize: 13,
          color: '#64748B',
          letterSpacing: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#0284C7', fontWeight: 700 }}>SEC_06 // EPILOGUE</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span style={{ color: '#94A3B8' }}>INSTITUTIONAL IDENTITY</span>
        </div>
        <div style={{ color: '#10B981' }}>STATUS: MASTER CERTIFIED</div>
      </div>

      {/* CENTRAL MONUMENTAL HERALDIC CREST & CREDITS */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: '50%',
          transform: `translateX(-50%) translateY(${crestSnap.displacementX * 0.2}px)`,
          width: 840,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Heraldic Medallion Seal */}
        <div
          style={{
            position: 'relative',
            width: 180,
            height: 180,
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid #10B981',
            boxShadow: '0 16px 48px rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            transform: `scale(${crestSnap.collision.squashScaleX})`,
          }}
        >
          {/* SVG Laurel Arc */}
          <svg
            width="200"
            height="200"
            style={{ position: 'absolute', top: -10, left: -10, pointerEvents: 'none' }}
          >
            <circle
              cx="100"
              cy="100"
              r="94"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="590"
              strokeDashoffset={590 * (1 - wreathDraw.progress)}
            />
          </svg>

          {/* Central Heraldic Monogram */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: '#F59E0B',
              textShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
            }}
          >
            ب
          </div>
        </div>

        {/* OFFICIAL TITLE: «دانشگاه علوم پزشکی بقیه‌الله» */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: -1,
            lineHeight: 1.3,
            marginBottom: 16,
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.8)',
          }}
        >
          دانشگاه علوم پزشکی بقیه‌الله
        </div>

        {/* Gold Horizontal Rule */}
        <div
          style={{
            width: 320,
            height: 3,
            backgroundColor: '#0284C7',
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* SUBTITLE: «کمیته تحقیقات دانشجویی» */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#38BDF8',
            marginBottom: 28,
            opacity: creditsOpacity,
            transform: `translateY(${creditsSlideY}px)`,
          }}
        >
          کمیته تحقیقات و فناوری دانشجویی
        </div>

        {/* Production Footer Stamp */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#64748B',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 24px',
            borderRadius: 8,
            letterSpacing: 1,
            opacity: creditsOpacity,
          }}
        >
          OFFICIAL MOTION DESIGN EDITORIAL // V11 CINEMATIC MASTER
        </div>
      </div>

      {/* Bottom Technical Telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 80,
          right: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#475569',
        }}
      >
        <div>
          ACOUSTIC EVENT: <span style={{ color: '#10B981' }}>FINAL_MASTER_RESOLVE</span> (f{globalFrame})
        </div>
        <div>CONTINUOUS STEM: SYNC_VERIFIED // 0-DELTA</div>
      </div>
    </div>
  );
};
