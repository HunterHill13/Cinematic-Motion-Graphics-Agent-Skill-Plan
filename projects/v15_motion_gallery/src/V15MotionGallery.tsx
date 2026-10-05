import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { calculateKeywordStrike } from '../../../src/typography/typographyBehaviors';
import { calculateCollision } from '../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../src/motion/mechanisms/Ripple';
import { calculateIdleBreathing, calculateCausalSecondaryReaction } from '../../../src/motion/secondaryMotion';
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

export const V15MotionGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const loopFrame = frame % 150;
  const breathing = calculateIdleBreathing(frame, 90, 0.015);

  // 1. Hook Typography Preview
  const hookStrike = calculateKeywordStrike(loopFrame, 35, { scalePeak: 1.15 });
  const hookSecondary = calculateCausalSecondaryReaction(loopFrame, 35, 3, 22);

  // 2. Decree Monolith Preview
  const sealCollision = calculateCollision(loopFrame, 40, { reboundAmplitude: 8 });
  const ripple = calculateRipple(loopFrame, 40, 30, 160);
  const sealSecondary = calculateCausalSecondaryReaction(loopFrame, 40, 3, 22);

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
  const barrierSecondary = calculateCausalSecondaryReaction(loopFrame, 80, 3, 22);

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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${hookStrike.scale * breathing.scale})`,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#FFFFFF',
                textAlign: 'center',
                textShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
              }}
            >
              {AUTHORIZED_CONTENT.shot01.heroTitle.text}
            </div>
            <div
              style={{
                width: 220,
                height: 3,
                backgroundColor: '#D4AF37',
                marginTop: 8,
                boxShadow: hookSecondary.active ? '0 0 16px rgba(212, 175, 55, 1)' : '0 0 8px rgba(212, 175, 55, 0.5)',
              }}
            />
          </div>
        </GalleryCard>

        {/* Card 2: Decree Monolith Reveal */}
        <GalleryCard recipeKey="decree" titleFa={AUTHORIZED_CONTENT.shot02.statuteHeadline.text}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${breathing.scale}) scaleX(${sealCollision.squashScaleX}) scaleY(${sealCollision.squashScaleY}) translateY(${sealCollision.displacementY}px)`,
              boxShadow: sealSecondary.active ? '0 0 30px rgba(212, 175, 55, 1)' : '0 0 16px rgba(212, 175, 55, 0.5)',
              position: 'relative',
            }}
          >
            <div style={{ width: 40, height: 40, border: '2px solid #07090E', borderRadius: '50%' }} />
            {ripple.active && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: ripple.radius * 2,
                  height: ripple.radius * 2,
                  border: `${ripple.strokeWidth}px solid rgba(212, 175, 55, ${ripple.opacity})`,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </GalleryCard>

        {/* Card 3: Tripartite Criteria Diagram */}
        <GalleryCard recipeKey="criteria" titleFa={AUTHORIZED_CONTENT.shot03.sectionTitle.text}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', transform: `scale(${breathing.scale})` }}>
            <div
              style={{
                width: 90,
                height: 120,
                backgroundColor: c1Active ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${c1Active ? '#D4AF37' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              ۱۶
            </div>
            <div
              style={{
                width: 90,
                height: 120,
                backgroundColor: c2Active ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${c2Active ? '#38BDF8' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: '#38BDF8',
              }}
            >
              ✓
            </div>
            <div
              style={{
                width: 90,
                height: 120,
                backgroundColor: c3Active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${c3Active ? '#10B981' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              ۶
            </div>
          </div>
        </GalleryCard>

        {/* Card 4: Temporal Cutoff Timeline */}
        <GalleryCard recipeKey="timewindow" titleFa={AUTHORIZED_CONTENT.shot04.timelineCutoffLabel.text}>
          <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: 6, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 3 }}>
              <div style={{ width: `${timeProgress * 100}%`, height: '100%', backgroundColor: '#38BDF8', borderRadius: 3 }} />
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -12,
                  width: 8,
                  height: 30,
                  backgroundColor: '#EF4444',
                  transform: `scale(${barrierHit.squashScaleX}, ${barrierHit.squashScaleY})`,
                  boxShadow: barrierSecondary.active ? '0 0 16px rgba(239, 68, 68, 1)' : '0 0 8px rgba(239, 68, 68, 0.6)',
                }}
              />
            </div>
          </div>
        </GalleryCard>

        {/* Card 5: Score Threshold Pedestals */}
        <GalleryCard recipeKey="thresholds" titleFa={AUTHORIZED_CONTENT.shot05.sectionTitle.text}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', height: 160, transform: `scale(${breathing.scale})` }}>
            <div style={{ width: 50, height: p1H, backgroundColor: '#D4AF37', borderRadius: '4px 4px 0 0' }} />
            <div style={{ width: 50, height: p2H, backgroundColor: '#38BDF8', borderRadius: '4px 4px 0 0' }} />
            <div style={{ width: 50, height: p3H, backgroundColor: '#10B981', borderRadius: '4px 4px 0 0' }} />
          </div>
        </GalleryCard>

        {/* Card 6: Heraldic Institutional Seal */}
        <GalleryCard recipeKey="outro" titleFa={AUTHORIZED_CONTENT.shot06.institutionTitle.text}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundColor: '#D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${crestScale * breathing.scale}) rotate(${crestRot}deg)`,
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.8)',
            }}
          >
            <div style={{ width: 50, height: 50, border: '3px dashed #07090E', borderRadius: '50%' }} />
          </div>
        </GalleryCard>
      </div>
    </AbsoluteFill>
  );
};
