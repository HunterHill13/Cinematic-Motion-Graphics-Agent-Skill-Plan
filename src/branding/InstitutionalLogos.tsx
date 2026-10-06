import React from 'react';
import { interpolate, useCurrentFrame, Easing, staticFile, Img } from 'remotion';
import { calculateSettleLock } from '../motion/secondaryMotion';

/**
 * INSTITUTIONAL LOGO SYSTEM (V21 BRANDING ARCHITECTURE)
 * 
 * Assets:
 * 1. PR Relations Logo: public/assets/logos/pr_relations.png (1024x1024)
 * 2. University Emblem: public/assets/logos/university.png (202x252)
 * 3. Research Committee Emblem: public/assets/logos/research_committee.png (345x319)
 * 
 * Strict Quality Controls:
 * - Deterministic staticFile repository-relative paths
 * - Aspect ratio strictly preserved (no stretching)
 * - Circular clip-path to eliminate non-transparent corner boxes on PR seal
 * - High-contrast monochromatic filter on University emblem for dark canvas legibility
 * - Deterministic settle locks: x, y, scale, opacity strictly constant once settled
 */

export interface PublicRelationsLogoStingProps {
  startFrame?: number; // local frame in Shot 01 (default 15)
  settleFrame?: number; // default 45
  exitFrame?: number; // default 145
  style?: React.CSSProperties;
}

export const PublicRelationsLogoSting: React.FC<PublicRelationsLogoStingProps> = ({
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

        {/* The Official PR Relations Image Seal (Clipped into perfect circle) */}
        <div
          style={{
            width: 196,
            height: 196,
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#0F172A',
          }}
        >
          <Img
            src={staticFile('assets/logos/pr_relations.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              clipPath: 'circle(49.2% at 50% 50%)',
              display: 'block',
            }}
          />
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
  startFrame?: number; // local frame in Shot 06 (default 125)
  settleFrame?: number; // default 155
  style?: React.CSSProperties;
}

export const InstitutionalEndCard: React.FC<InstitutionalEndCardProps> = ({
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
        {/* Left Entity: University Official Emblem & Calligraphy */}
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
            {/* White/Gold High-Contrast Monochrome Inversion for Dark Background */}
            <Img
              src={staticFile('assets/logos/university.png')}
              style={{
                maxHeight: 180,
                width: 'auto',
                filter: 'brightness(0) invert(1) drop-shadow(0 0 16px rgba(212, 175, 55, 0.45)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.9))',
                objectFit: 'contain',
              }}
            />
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

        {/* Right Entity: Student Research & Technology Committee Emblem */}
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
            <Img
              src={staticFile('assets/logos/research_committee.png')}
              style={{
                maxHeight: 180,
                width: 'auto',
                filter: 'drop-shadow(0 0 18px rgba(56, 189, 248, 0.35)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.9))',
                objectFit: 'contain',
              }}
            />
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
