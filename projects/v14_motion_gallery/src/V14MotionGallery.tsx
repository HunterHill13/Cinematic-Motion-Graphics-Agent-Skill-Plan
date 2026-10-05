import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { calculateKeywordStrike } from '../../../src/typography/typographyBehaviors';
import { calculateCollision } from '../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../src/motion/mechanisms/Ripple';
import { AUTHORIZED_CONTENT } from '../../../src/content/authorizedContent';

interface GalleryCardProps {
  recipeKey: string;
  titleFa: string;
  children: React.ReactNode;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ titleFa, children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 540,
        height: 300,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 14,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(12px)',
        overflow: 'hidden',
        direction: 'rtl',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.7)',
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#F8FAFC', fontFamily: 'Vazirmatn' }}>
            {titleFa}
          </span>
        </div>
      </div>

      {/* Motion Stage Viewport */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 220,
          borderRadius: 10,
          backgroundColor: 'rgba(7, 9, 14, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const V14MotionGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const loopFrame = frame % 150;

  // 1. Hook Typography Preview
  const hookStrike = calculateKeywordStrike(loopFrame, 35, { scalePeak: 1.15 });

  // 2. Decree Monolith Preview
  const sealCollision = calculateCollision(loopFrame, 40, { reboundAmplitude: 8 });
  const ripple = calculateRipple(loopFrame, 40, 30, 160);

  // 3. Tripartite Criteria Preview
  const c1Active = loopFrame >= 20;
  const c2Active = loopFrame >= 50;
  const c3Active = loopFrame >= 80;

  // 4. Temporal Cutoff Preview
  const timeProgress = interpolate(loopFrame, [10, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const barrierHit = calculateCollision(loopFrame, 80, { reboundAmplitude: 10 });

  // 5. Score Thresholds Preview
  const p1H = interpolate(loopFrame, [10, 50], [0, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2H = interpolate(loopFrame, [30, 70], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p3H = interpolate(loopFrame, [50, 90], [0, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 6. Heraldic Crest Preview
  const crestRot = (loopFrame * 0.8) % 360;
  const crestScale = interpolate(loopFrame, [10, 45], [0.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 60px',
        fontFamily: 'Vazirmatn, sans-serif',
        direction: 'rtl',
      }}
    >
      {/* Gallery Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
          {AUTHORIZED_CONTENT.shot06.institutionTitle.text}
        </h1>
      </div>

      {/* 2x3 Recipe Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 540px)',
          gridTemplateRows: 'repeat(2, 300px)',
          gap: '24px 30px',
          justifyContent: 'center',
        }}
      >
        {/* Card 1: Hook Typography Slam */}
        <GalleryCard recipeKey="hook" titleFa={AUTHORIZED_CONTENT.shot01.heroTitle.text}>
          <div
            style={{
              transform: `scale(${hookStrike.scale})`,
              opacity: hookStrike.opacity,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 900, color: '#D4AF37' }}>
              {AUTHORIZED_CONTENT.shot01.heroTitle.text}
            </div>
            <div
              style={{
                width: 220,
                height: 3,
                backgroundColor: '#D4AF37',
                margin: '10px auto 0',
                borderRadius: 2,
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
              }}
            />
          </div>
        </GalleryCard>

        {/* Card 2: Decree Monolith Reveal */}
        <GalleryCard recipeKey="decree" titleFa={AUTHORIZED_CONTENT.shot02.statuteHeadline.text}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '2px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${sealCollision.squashScaleX})`,
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                marginBottom: 10,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <line x1="12" y1="3" x2="12" y2="21" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <polyline points="4 7 1 14 7 14 4 7" />
                <polyline points="20 7 17 14 23 14 20 7" />
              </svg>
            </div>
            {ripple.active && (
              <div
                style={{
                  position: 'absolute',
                  width: ripple.radius,
                  height: ripple.radius,
                  borderRadius: '50%',
                  border: '2px solid rgba(212, 175, 55, 0.6)',
                  opacity: ripple.opacity,
                  pointerEvents: 'none',
                }}
              />
            )}
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
              {AUTHORIZED_CONTENT.shot02.statuteHeadline.text}
            </div>
          </div>
        </GalleryCard>

        {/* Card 3: Tripartite Criteria Diagram */}
        <GalleryCard recipeKey="criteria" titleFa={AUTHORIZED_CONTENT.shot03.sectionTitle.text}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div
              style={{
                width: 100,
                height: 120,
                borderRadius: 10,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: `1px solid ${c1Active ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: c1Active ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'none',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: c1Active ? '#D4AF37' : '#64748B' }}>
                {AUTHORIZED_CONTENT.shot03.c1ScoreValue.text}
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>
                {AUTHORIZED_CONTENT.shot03.c1Title.text}
              </div>
            </div>
            <div
              style={{
                width: 100,
                height: 120,
                borderRadius: 10,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: `1px solid ${c2Active ? '#38BDF8' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: c2Active ? '0 0 15px rgba(56, 189, 248, 0.3)' : 'none',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: c2Active ? '#38BDF8' : '#64748B' }}>
                {AUTHORIZED_CONTENT.shot03.c2Label.text}
              </div>
            </div>
            <div
              style={{
                width: 100,
                height: 120,
                borderRadius: 10,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: `1px solid ${c3Active ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: c3Active ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'none',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: c3Active ? '#D4AF37' : '#64748B' }}>
                {AUTHORIZED_CONTENT.shot03.c3ArticleCount.text}
              </div>
            </div>
          </div>
        </GalleryCard>

        {/* Card 4: Temporal Cutoff Timeline */}
        <GalleryCard recipeKey="time" titleFa={AUTHORIZED_CONTENT.shot04.sectionTitle.text}>
          <div style={{ width: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: `${timeProgress * 100}%`,
                  backgroundColor: '#38BDF8',
                  boxShadow: '0 0 10px #38BDF8',
                }}
              />
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 16,
                fontWeight: 700,
                color: loopFrame >= 80 ? '#EF4444' : '#38BDF8',
                transform: `scale(${barrierHit.squashScaleX})`,
              }}
            >
              {AUTHORIZED_CONTENT.shot04.timelineCutoffLabel.text}
            </div>
          </div>
        </GalleryCard>

        {/* Card 5: Score Threshold Pedestals */}
        <GalleryCard recipeKey="pedestals" titleFa={AUTHORIZED_CONTENT.shot05.sectionTitle.text}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 160 }}>
            <div style={{ width: 60, height: p1H, backgroundColor: 'rgba(212, 175, 55, 0.3)', border: '1px solid #D4AF37', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#D4AF37' }}>{AUTHORIZED_CONTENT.shot05.tier1Score.text}</span>
            </div>
            <div style={{ width: 60, height: p2H, backgroundColor: 'rgba(56, 189, 248, 0.3)', border: '1px solid #38BDF8', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#38BDF8' }}>{AUTHORIZED_CONTENT.shot05.tier2Score.text}</span>
            </div>
            <div style={{ width: 60, height: p3H, backgroundColor: 'rgba(212, 175, 55, 0.4)', border: '1px solid #D4AF37', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#D4AF37' }}>{AUTHORIZED_CONTENT.shot05.tier3Score.text}</span>
            </div>
          </div>
        </GalleryCard>

        {/* Card 6: Heraldic Institutional Seal */}
        <GalleryCard recipeKey="seal" titleFa={AUTHORIZED_CONTENT.shot06.institutionTitle.text}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px dashed #D4AF37',
                transform: `rotate(${crestRot}deg) scale(${crestScale})`,
                boxShadow: '0 0 25px rgba(212, 175, 55, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.2)' }} />
            </div>
            <div style={{ marginTop: 12, fontSize: 16, fontWeight: 800, color: '#D4AF37' }}>
              {AUTHORIZED_CONTENT.shot06.callToAction.text}
            </div>
          </div>
        </GalleryCard>
      </div>
    </AbsoluteFill>
  );
};
