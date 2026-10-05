import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { calculateKeywordStrike } from '../../../src/typography/typographyBehaviors';
import { calculateCollision } from '../../../src/motion/mechanisms/Collision';
import { calculateRipple } from '../../../src/motion/mechanisms/Ripple';

interface GalleryCardProps {
  recipeKey: string;
  titleFa: string;
  categoryFa: string;
  children: React.ReactNode;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ titleFa, categoryFa, children }) => {
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
        <span
          style={{
            fontSize: 12,
            color: '#94A3B8',
            fontFamily: 'Vazirmatn',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '3px 10px',
            borderRadius: 6,
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {categoryFa}
        </span>
      </div>

      {/* Motion Stage Viewport */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 190,
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

      {/* Footer Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <span style={{ fontSize: 11, color: '#64748B', fontFamily: 'Vazirmatn' }}>
          الگوی حرکتی مرجع کتابخانه
        </span>
        <span style={{ fontSize: 11, color: '#D4AF37', fontFamily: 'Vazirmatn', fontWeight: 600 }}>
          تایید شده V13
        </span>
      </div>
    </div>
  );
};

export const V13MotionGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const loopFrame = frame % 150;

  // 1. Hook Typography Preview
  const hookStrike = calculateKeywordStrike(loopFrame, 30, {
    scalePeak: 1.15,
  });

  // 2. Decree Monolith Preview
  const sealCollision = calculateCollision(loopFrame, 25, {
    reboundAmplitude: 10,
  });
  const sealRipple = calculateRipple(loopFrame, 25, 30, 80);

  // 3. Tripartite Preview
  const col1Progress = Math.min(1, Math.max(0, (loopFrame - 15) / 20));
  const col2Progress = Math.min(1, Math.max(0, (loopFrame - 40) / 20));
  const col3Progress = Math.min(1, Math.max(0, (loopFrame - 65) / 20));

  // 4. Timeline Ruler Preview
  const rulerProgress = Math.min(1, Math.max(0, (loopFrame - 20) / 70));
  const barrierDescend = Math.min(1, Math.max(0, (loopFrame - 80) / 20));

  // 5. Pedestal Preview
  const p1 = Math.min(1, Math.max(0, (loopFrame - 20) / 25));
  const p2 = Math.min(1, Math.max(0, (loopFrame - 45) / 25));
  const p3 = Math.min(1, Math.max(0, (loopFrame - 70) / 25));

  // 6. Seal Outro Preview
  const sealScale = Math.min(1, Math.max(0, (loopFrame - 20) / 35));
  const laurelRotate = (loopFrame * 0.4) % 360;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        padding: '40px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Vazirmatn, sans-serif',
      }}
    >
      {/* Gallery Header */}
      <div
        style={{
          width: '100%',
          maxWidth: 1720,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          paddingBottom: 16,
          direction: 'rtl',
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
            نگارخانه الگوهای موشن گرافیک V13
          </h1>
          <p style={{ fontSize: 14, color: '#94A3B8', margin: '4px 0 0 0' }}>
            مجموعه شات‌های مرجع و الگوهای ساختاریافته بدون علائم آزمایشی
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: '#D4AF37',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            تولید سینمایی V13
          </div>
        </div>
      </div>

      {/* Grid of 6 Shot Recipe Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          width: '100%',
          maxWidth: 1720,
        }}
      >
        {/* Card 1: Hook Slam */}
        <GalleryCard
          recipeKey="hook-typography-slam"
          titleFa="ضربه تایپوگرافی افتتاحیه"
          categoryFa="طرح پرسش اصلی"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${hookStrike.scale})`,
              opacity: hookStrike.opacity,
            }}
          >
            <div style={{ fontSize: 18, color: '#F1F5F9', fontWeight: 800 }}>
              سربازی نخبگان چیست؟
            </div>
            <div
              style={{
                width: 140,
                height: 3,
                backgroundColor: '#D4AF37',
                marginTop: 8,
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
              }}
            />
          </div>
        </GalleryCard>

        {/* Card 2: Decree Monolith */}
        <GalleryCard
          recipeKey="decree-monolith-reveal"
          titleFa="رونمایی مصوبه قانونی"
          categoryFa="استناد ابلاغیه رسمی"
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translateY(${sealCollision.displacementY}px)`,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 900, color: '#D4AF37' }}>مصوبه</span>
            </div>
            <div style={{ fontSize: 14, color: '#E2E8F0', marginTop: 10, fontWeight: 700 }}>
              ابلاغیه رسمی ستاد کل
            </div>
          </div>
        </GalleryCard>

        {/* Card 3: Tripartite Criteria */}
        <GalleryCard
          recipeKey="tripartite-criteria-diagram"
          titleFa="دیاگرام شرایط سه‌گانه"
          categoryFa="احراز شرایط لازم"
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {[
              { title: 'معدل ۱۶', p: col1Progress },
              { title: 'صلاحیت', p: col2Progress },
              { title: 'مقالات', p: col3Progress },
            ].map((col, idx) => (
              <div
                key={idx}
                style={{
                  width: 90,
                  height: 100,
                  borderRadius: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: col.p,
                  transform: `translateY(${(1 - col.p) * 20}px)`,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    border: '1px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: '#D4AF37',
                    marginBottom: 8,
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9' }}>{col.title}</span>
              </div>
            ))}
          </div>
        </GalleryCard>

        {/* Card 4: Timeline Cutoff */}
        <GalleryCard
          recipeKey="temporal-cutoff-timeline"
          titleFa="گاه‌شمار مهلت قانونی"
          categoryFa="سقف زمانی ۱ سال"
        >
          <div style={{ width: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                position: 'relative',
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  width: `${rulerProgress * 100}%`,
                  height: '100%',
                  backgroundColor: '#D4AF37',
                  borderRadius: 2,
                  boxShadow: '0 0 8px rgba(212, 175, 55, 0.8)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: '15%',
                  top: -15,
                  width: 3,
                  height: 34,
                  backgroundColor: '#EF4444',
                  transform: `scaleY(${barrierDescend})`,
                  transformOrigin: 'top',
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 18,
                fontSize: 12,
                color: '#94A3B8',
              }}
            >
              <span>فراغت از تحصیل</span>
              <span style={{ color: '#EF4444', fontWeight: 700 }}>سقف مجاز: حداکثر ۱ سال</span>
            </div>
          </div>
        </GalleryCard>

        {/* Card 5: Pedestals */}
        <GalleryCard
          recipeKey="score-threshold-pedestals"
          titleFa="پایه‌های پلکانی حدنصاب"
          categoryFa="امتیاز مقاطع تحصیلی"
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 120 }}>
            {[
              { h: 50, val: '۶۵', title: 'کارشناسی', p: p1 },
              { h: 80, val: '۱۱۰', title: 'ارشد', p: p2 },
              { h: 110, val: '۱۳۰', title: 'دکتری', p: p3 },
            ].map((ped, idx) => (
              <div
                key={idx}
                style={{
                  width: 90,
                  height: ped.h * ped.p,
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderTop: '3px solid #D4AF37',
                  borderRadius: '4px 4px 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingTop: 6,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 900, color: '#D4AF37' }}>{ped.val}</span>
                <span style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{ped.title}</span>
              </div>
            ))}
          </div>
        </GalleryCard>

        {/* Card 6: Heraldic Seal */}
        <GalleryCard
          recipeKey="heraldic-institutional-seal"
          titleFa="نشان زرین سازمانی"
          categoryFa="اختتامیه رسمی"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${sealScale})`,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  border: '1px dashed #D4AF37',
                  transform: `rotate(${laurelRotate}deg)`,
                }}
              />
            </div>
            <div style={{ fontSize: 14, color: '#F1F5F9', marginTop: 8, fontWeight: 800 }}>
              بنیاد ملی نخبگان
            </div>
          </div>
        </GalleryCard>
      </div>
    </AbsoluteFill>
  );
};
