import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { calculateSyncPhrase } from '../../../../src/audio/syncPhrase';
import { executeDimensionalPortal } from '../../../../src/motion/recipes/DimensionalPortalRecipe';
import { executeElasticSnapping } from '../../../../src/motion/recipes/ElasticSnappingRecipe';
import { calculateRipple } from '../../../../src/motion/mechanisms/Ripple';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';

/**
 * SHOT 06 — INSTITUTIONAL SEAL & GRAND FINALE (V12)
 * Frame Range: 2155 - 2361 (Global) / 0 - 206 (Local)
 * - Level 3 Archetype: Climax & Institutional Authority
 * - Level 2 Recipe: DimensionalPortal + ElasticSnapping
 * - 100% Pure Persian Script typography (Zero English metadata)
 * - Incoming Carry (T5): Gravitational singularity expands into Heraldic Core (local 0 - 40f)
 * - Semantic Acoustic Sync:
 *     f2186 (local 31f): Outro speech start
 *     f2195 (local 40f): «دانشگاه علوم پزشکی بقیه‌الله»
 *     f2317 (local 162f): Speech conclusion
 *     f2361 (local 206f): Master resolve
 */
export const Shot06_OutroV12: React.FC = () => {
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
      {/* Background Architectural Grid (Role D: Atmospheric) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
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

      {/* Top Institutional Header (Role B: Structural) */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 16,
          fontSize: 14,
          color: '#94A3B8',
          fontWeight: 500,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#0284C7', fontWeight: 700 }}>شناسنامه رسمی اثر</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span>معاونت تحقیقات و فناوری</span>
        </div>
        <div style={{ color: '#10B981', fontWeight: 600 }}>مرجع ملی هدایت نخبگان</div>
      </div>

      {/* CENTRAL MONUMENTAL HERALDIC CREST & CREDITS (Role A: Narrative + Role B: Structural) */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: '50%',
          transform: `translateX(-50%) translateY(${crestSnap.displacementX * 0.2}px)`,
          width: 860,
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
            width: 190,
            height: 190,
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid #10B981',
            boxShadow: '0 16px 48px rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36,
            transform: `scale(${crestSnap.collision.squashScaleX})`,
          }}
        >
          {/* SVG Laurel Arc */}
          <svg
            width="210"
            height="210"
            style={{ position: 'absolute', top: -10, left: -10, pointerEvents: 'none' }}
          >
            <circle
              cx="105"
              cy="105"
              r="98"
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
              fontSize: 68,
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
            fontSize: 48,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: -0.5,
            marginBottom: 16,
            opacity: interpolate(localFrame, [35, 55], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `scale(${outroSync.scaleMultiplier})`,
          }}
        >
          دانشگاه علوم پزشکی بقیه‌الله (عج)
        </div>

        {/* COMMITTEE SUBTITLE: «کمیته تحقیقات و فناوری دانشجویی» */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#38BDF8',
            marginBottom: 24,
            opacity: creditsOpacity,
            transform: `translateY(${creditsSlideY}px)`,
          }}
        >
          کمیته تحقیقات و فناوری دانشجویی
        </div>

        {/* Context Badge */}
        <div
          style={{
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            borderRadius: 12,
            padding: '10px 32px',
            fontSize: 18,
            color: '#CBD5E1',
            opacity: interpolate(localFrame, [85, 110], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          مرکز هدایت و حمایت از استعدادهای درخشان
        </div>
      </div>

      {/* Bottom Editorial Footnote (Role B: Structural - Pure Persian) */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 13,
          color: '#64748B',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: 14,
        }}
      >
        <div>کلیه حقوق متعلق به کمیته تحقیقات و فناوری دانشجویی می‌باشد</div>
        <div>پایان</div>
      </div>
    </div>
  );
};
