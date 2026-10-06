import React from 'react';
import { interpolate, useCurrentFrame, Easing, Img } from 'remotion';
import { calculateSettleLock } from '../motion/secondaryMotion';
import { ExternalVisualAsset } from '../assets/assetTypes';

/**
 * INSTITUTIONAL LOGO SYSTEM (V22 DECOUPLED ARCHITECTURE)
 * 
 * Strict Invariant (V22 CRITICAL ASSET RULE):
 * The master composition and generic Skill have 0 hardcoded external PNG dependencies.
 * Default presentation renders pure vector SVG heraldic crests.
 * External assets (logos, seals, emblems) can be injected optionally via ExternalVisualAsset.
 */

export interface PublicRelationsLogoStingProps {
  asset?: ExternalVisualAsset;
  startFrame?: number; // local frame in Shot 01 (default 15)
  settleFrame?: number; // default 45
  exitFrame?: number; // default 145
  style?: React.CSSProperties;
}

export const PublicRelationsLogoSting: React.FC<PublicRelationsLogoStingProps> = ({
  asset,
  startFrame = 15,
  settleFrame = 45,
  exitFrame = 140,
  style,
}) => {
  const frame = useCurrentFrame();

  // 1. Initial geometric signal & crosshair (0 - 20f)
  const signalProgress = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Entrance iris expansion & strike (15 - 45f)
  const logoSettle = calculateSettleLock(frame, settleFrame, {
    anticipationFrames: 12,
    settleFrames: 16,
    scalePeak: 1.08,
  });

  const entranceOpacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Perimeter golden ring draw-in
  const ringDraw = interpolate(frame, [startFrame, settleFrame], [0, 100], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Exit / Carrier Handoff (140 - 170f)
  // Perimeter ring expands and unfolds into the horizontal datum rule
  const exitProgress = interpolate(frame, [exitFrame, exitFrame + 28], [0, 1], {
    easing: Easing.bezier(0.7, 0, 0.84, 0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame > exitFrame + 30) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${logoSettle.scale * (1 - exitProgress * 0.15)}) translateY(${logoSettle.translateY - exitProgress * 25}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: entranceOpacity * (1 - exitProgress),
        pointerEvents: 'none',
        direction: 'rtl',
        ...style,
      }}
    >
      {/* Outer Geometric Crosshairs & Signal Points */}
      <div
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: signalProgress * (1 - exitProgress),
        }}
      >
        {/* Top/Bottom/Left/Right Ticks */}
        <div style={{ position: 'absolute', top: 0, left: '50%', width: 1.5, height: 16, backgroundColor: '#D4AF37', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', width: 1.5, height: 16, backgroundColor: '#D4AF37', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', left: 0, top: '50%', width: 16, height: 1.5, backgroundColor: '#D4AF37', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', right: 0, top: '50%', width: 16, height: 1.5, backgroundColor: '#D4AF37', transform: 'translateY(-50%)' }} />
      </div>

      {/* Primary Circular Medallion Wrapper */}
      <div
        style={{
          position: 'relative',
          width: 200,
          height: 200,
          borderRadius: '50%',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Precise SVG Circular Golden Perimeter Ring */}
        <svg
          width="216"
          height="216"
          viewBox="0 0 216 216"
          style={{
            position: 'absolute',
            top: -8,
            left: -8,
            transform: 'rotate(-90deg)',
          }}
        >
          <circle
            cx="108"
            cy="108"
            r="102"
            fill="none"
            stroke="rgba(212, 175, 55, 0.25)"
            strokeWidth="1.5"
          />
          <circle
            cx="108"
            cy="108"
            r="102"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeDasharray={640}
            strokeDashoffset={640 * (1 - ringDraw / 100)}
            strokeLinecap="round"
          />
        </svg>

        {/* Seal Presentation: Injected Asset or Pure Vector Heraldic Medallion */}
        <div
          style={{
            width: 196,
            height: 196,
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#0A0F1D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {asset ? (
            <Img
              src={asset.src}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                clipPath: asset.clipPath || 'circle(49.2% at 50% 50%)',
                filter: asset.filter,
                display: 'block',
              }}
            />
          ) : (
            <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
              {/* Heraldic Geometric 8-Pointed Star & Precision Compass */}
              <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="50" cy="50" r="41" stroke="#D4AF37" strokeWidth="1.5" />
              <rect x="26" y="26" width="48" height="48" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" />
              <rect x="26" y="26" width="48" height="48" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.8" transform="rotate(45 50 50)" />
              <circle cx="50" cy="50" r="22" fill="rgba(212, 175, 55, 0.12)" stroke="#38BDF8" strokeWidth="1.2" />
              <polygon points="50,33 53.5,45 66,50 53.5,55 50,67 46.5,55 34,50 46.5,45" fill="#D4AF37" />
              <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
            </svg>
          )}
        </div>
      </div>

      {/* Institutional Identification Typography */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div style={{ width: 32, height: 1.5, backgroundColor: '#D4AF37' }} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#D4AF37',
              letterSpacing: 2,
            }}
          >
            روابط عمومی و امور بین‌الملل
          </span>
          <div style={{ width: 32, height: 1.5, backgroundColor: '#D4AF37' }} />
        </div>

        <h2
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#F8FAFC',
            margin: 0,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
          }}
        >
          کمیته تحقیقات و فناوری دانشجویی
        </h2>
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#94A3B8',
            marginTop: 4,
          }}
        >
          دانشگاه علوم پزشکی بقیه‌الله (عج)
        </span>
      </div>
    </div>
  );
};

export interface InstitutionalEndCardProps {
  universityAsset?: ExternalVisualAsset;
  committeeAsset?: ExternalVisualAsset;
  startFrame?: number; // local frame in Shot 06 (default 125)
  settleFrame?: number; // default 155
  style?: React.CSSProperties;
}

export const InstitutionalEndCard: React.FC<InstitutionalEndCardProps> = ({
  universityAsset,
  committeeAsset,
  startFrame = 125,
  settleFrame = 155,
  style,
}) => {
  const frame = useCurrentFrame();

  // 1. Entrance interpolation
  const entranceProgress = interpolate(frame, [startFrame, settleFrame], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Deterministic Settle Lock: exactly 1.0 scale, 0px translation after frame 155
  const endSettle = calculateSettleLock(frame, settleFrame, {
    anticipationFrames: 10,
    settleFrames: 14,
    scalePeak: 1.05,
  });

  if (frame < startFrame) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${endSettle.scale}) translateY(${endSettle.translateY}px)`,
        opacity: entranceProgress,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        direction: 'rtl',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        width: 1400,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Top Ministry / Institutional Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginBottom: 36,
        }}
      >
        <div style={{ width: 80, height: 1.5, backgroundColor: '#D4AF37' }} />
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#D4AF37',
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          معاونت تحقیقات و فناوری
        </span>
        <div style={{ width: 80, height: 1.5, backgroundColor: '#D4AF37' }} />
      </div>

      {/* Dual Institutional Lockup Core (Harmonious Side-by-Side Balance) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 90,
          width: '100%',
        }}
      >
        {/* Left Entity: University Official Emblem / Pure Vector Heraldic Crest */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 440,
          }}
        >
          <div
            style={{
              height: 190,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {universityAsset ? (
              <Img
                src={universityAsset.src}
                style={{
                  maxHeight: 180,
                  width: 'auto',
                  filter: universityAsset.filter || 'brightness(0) invert(1) drop-shadow(0 0 16px rgba(212, 175, 55, 0.45)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.9))',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <svg width="170" height="170" viewBox="0 0 100 100" fill="none">
                {/* Academic Heraldic Seal */}
                <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="42" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                {/* Book & Beacon geometry */}
                <path d="M 28 65 Q 50 60 50 48 Q 50 60 72 65 L 72 40 Q 50 35 50 46 Q 50 35 28 40 Z" fill="rgba(212, 175, 55, 0.15)" stroke="#D4AF37" strokeWidth="1.5" />
                <path d="M 50 25 L 50 48" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
                <circle cx="50" cy="22" r="4" fill="#FBBF24" />
                {/* Laurel Leaves left/right */}
                <path d="M 22 52 Q 20 40 28 32 M 78 52 Q 80 40 72 32" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </div>
          <span
            style={{
              marginTop: 18,
              fontSize: 22,
              fontWeight: 800,
              color: '#FFFFFF',
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            دانشگاه علوم پزشکی بقیه‌الله (عج)
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: '#94A3B8',
              marginTop: 4,
            }}
          >
            قطب علمی و پژوهشی سلامت
          </span>
        </div>

        {/* Central Architectural Gold Pillar Rule */}
        <div
          style={{
            width: 2,
            height: 240,
            background: 'linear-gradient(180deg, rgba(212, 175, 55, 0) 0%, rgba(212, 175, 55, 0.8) 50%, rgba(212, 175, 55, 0) 100%)',
          }}
        />

        {/* Right Entity: Student Research Committee Emblem / Pure Vector Crest */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 440,
          }}
        >
          <div
            style={{
              height: 190,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {committeeAsset ? (
              <Img
                src={committeeAsset.src}
                style={{
                  maxHeight: 180,
                  width: 'auto',
                  filter: committeeAsset.filter || 'drop-shadow(0 0 18px rgba(56, 189, 248, 0.35)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.9))',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <svg width="170" height="170" viewBox="0 0 100 100" fill="none">
                {/* Research & Tech Atom / Shield Crest */}
                <circle cx="50" cy="50" r="46" stroke="#38BDF8" strokeWidth="1.5" />
                <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#D4AF37" strokeWidth="1.2" transform="rotate(-30 50 50)" />
                <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#D4AF37" strokeWidth="1.2" transform="rotate(30 50 50)" />
                <circle cx="50" cy="50" r="7" fill="#38BDF8" />
                <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
                <polygon points="50,18 53,24 60,25 55,30 56,37 50,33 44,37 45,30 40,25 47,24" fill="#D4AF37" />
              </svg>
            )}
          </div>
          <span
            style={{
              marginTop: 18,
              fontSize: 22,
              fontWeight: 800,
              color: '#FFFFFF',
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            کمیته تحقیقات و فناوری دانشجویی
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: '#94A3B8',
              marginTop: 4,
            }}
          >
            دبیرخانه مرکزی انتخاب دانشجوی پژوهشگر برتر
          </span>
        </div>
      </div>

      {/* Bottom Authority Certification Baseline */}
      <div
        style={{
          marginTop: 42,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          opacity: 0.9,
        }}
      >
        <div style={{ width: 36, height: 1, backgroundColor: 'rgba(212, 175, 55, 0.6)' }} />
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#E2E8F0',
            letterSpacing: 1,
          }}
        >
          آیین‌نامه مصوب وزارت بهداشت، درمان و آموزش پزشکی
        </span>
        <div style={{ width: 36, height: 1, backgroundColor: 'rgba(212, 175, 55, 0.6)' }} />
      </div>
    </div>
  );
};
