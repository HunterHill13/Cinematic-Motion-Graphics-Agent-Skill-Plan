import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { calculateDraw } from '../../../../src/motion/mechanisms/Draw';
import { calculateKeywordStrike } from '../../../../src/typography/typographyBehaviors';
import { executeDatumRuleAxisCollapse } from '../../../../src/transition/carryTransitions';

/**
 * SHOT 03 — TRIPARTITE PREREQUISITE CRITERIA DIAGRAM (V13)
 * Frame Range: 620 - 1480 (Global) / 0 - 860 (Local)
 * - Category: DiagramExplainer
 * - Recipe: tripartite-criteria-diagram
 * - Camera: parallax-drift (1.000 -> 1.020)
 * - Visual Companion: Tripartite Structural Column Cards & Medallions
 * - Acoustic Sync Milestones:
 *     f654 (local 34f): «احراز سه شرط اصلی»
 *     f855 (local 235f): «معدل کل شانزده» (GPA >= 16)
 *     f1035 (local 415f): «عدم سوءپیشینه انضباطی»
 *     f1215 (local 595f): «مقالات معتبر علمی یا ثبت اختراع»
 * - Outgoing Carry (T3): Central horizontal datum collapses into timeline axis (local 830 - 860f)
 */
export const Shot03_CriteriaV13: React.FC = () => {
  const localFrame = useCurrentFrame();

  // 1. Header Title Reveal
  const titleOpacity = interpolate(localFrame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const titleSlideY = interpolate(localFrame, [15, 40], [25, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });
  const headerDraw = calculateDraw(localFrame, 20, 30, 480);

  // 2. Three Stepped Milestone Confirmations
  // Criterion 1: GPA >= 16 (Local f = 235 / Global f = 855)
  const c1Entrance = Math.min(1, Math.max(0, (localFrame - 45) / 25));
  const c1Lock = calculateKeywordStrike(localFrame, 235, { scalePeak: 1.12 });
  const c1GpaValue = interpolate(localFrame, [160, 235], [12, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Criterion 2: Disciplinary Clearance (Local f = 415 / Global f = 1035)
  const c2Entrance = Math.min(1, Math.max(0, (localFrame - 250) / 25));
  const c2Lock = calculateKeywordStrike(localFrame, 415, { scalePeak: 1.12 });

  // Criterion 3: Scientific Articles / Patents (Local f = 595 / Global f = 1215)
  const c3Entrance = Math.min(1, Math.max(0, (localFrame - 440) / 25));
  const c3Lock = calculateKeywordStrike(localFrame, 595, { scalePeak: 1.12 });

  // Central Connecting Datum Rule
  const datumDraw = calculateDraw(localFrame, 40, 50, 1400);

  // 3. Outgoing Transition 03 Carry (Datum Rule Axis Collapse at local 830 - 860f)
  const t3Collapse = executeDatumRuleAxisCollapse(localFrame, 830, 860);

  return (
    <CameraGrammarRig mode="parallax-drift" durationInFrames={860} intensity={1.0}>
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
        {/* Background Atmospheric Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
            pointerEvents: 'none',
          }}
        />

        {/* Top Institutional Header */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: 16,
            fontSize: 15,
            color: '#94A3B8',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: '#D4AF37', fontWeight: 800 }}>ضوابط احراز صلاحیت</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span>شرایط عمومی و اختصاصی متقاضیان</span>
          </div>
          <div style={{ color: '#38BDF8', fontWeight: 700 }}>گام‌های ارزیابی پرونده</div>
        </div>

        {/* Section Title */}
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: 140,
            right: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: titleOpacity,
            transform: `translateY(${titleSlideY}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: '#FFFFFF',
              margin: '0 0 10px 0',
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            سه شرط بنیادین احراز تسهیلات پژوهشی نخبگی
          </h2>
          <div
            style={{
              width: headerDraw.progress * 480,
              height: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Central Connecting Horizontal Datum Axis (T3 Carry Baton) */}
        <div
          style={{
            position: 'absolute',
            top: 530,
            left: '50%',
            transform: `translateX(-50%) scaleX(${localFrame >= 830 ? t3Collapse.scaleX : 1}) scaleY(${localFrame >= 830 ? t3Collapse.scaleY : 1})`,
            width: datumDraw.progress * 1400,
            height: 3,
            backgroundColor: '#D4AF37',
            borderRadius: 2,
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
            opacity: localFrame >= 830 ? t3Collapse.opacity : 0.6,
          }}
        />

        {/* Three Tripartite Architectural Column Cards (Visual Companions) */}
        <div
          style={{
            position: 'absolute',
            top: 250,
            left: 140,
            right: 140,
            height: 560,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40,
          }}
        >
          {/* Column 1 (Right): GPA >= 16 */}
          <div
            style={{
              position: 'relative',
              borderRadius: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              border: localFrame >= 235 ? '2px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: localFrame >= 235 ? '0 16px 40px rgba(212, 175, 55, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              backdropFilter: 'blur(14px)',
              opacity: c1Entrance,
              transform: `translateY(${(1 - c1Entrance) * 30}px) scale(${localFrame >= 235 ? c1Lock.scale : 1})`,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '2px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 900,
                color: '#D4AF37',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
              }}
            >
              ۱
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, color: '#94A3B8', fontWeight: 600, marginBottom: 8 }}>
                شرط اول
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
                حداقل معدل کل
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 9, 14, 0.7)',
                borderRadius: 12,
                padding: '16px 28px',
                width: '80%',
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}
            >
              <div style={{ fontSize: 44, fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>
                {c1GpaValue.toFixed(0)}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6, fontWeight: 600 }}>
                حداقل نمره از ۲۰
              </div>
            </div>

            <div style={{ fontSize: 14, color: '#CBD5E1', textAlign: 'center', lineHeight: 1.6 }}>
              کسب حداقل معدل کل شانزده در مقطع تحصیلی مورد نظر الزامی است
            </div>
          </div>

          {/* Column 2 (Center): Disciplinary Clearance */}
          <div
            style={{
              position: 'relative',
              borderRadius: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              border: localFrame >= 415 ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: localFrame >= 415 ? '0 16px 40px rgba(56, 189, 248, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              backdropFilter: 'blur(14px)',
              opacity: c2Entrance,
              transform: `translateY(${(1 - c2Entrance) * 30}px) scale(${localFrame >= 415 ? c2Lock.scale : 1})`,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '2px solid #38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 900,
                color: '#38BDF8',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
              }}
            >
              ۲
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, color: '#94A3B8', fontWeight: 600, marginBottom: 8 }}>
                شرط دوم
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
                عدم سوءپیشینه
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 9, 14, 0.7)',
                borderRadius: 12,
                padding: '16px 24px',
                width: '80%',
                border: '1px solid rgba(56, 189, 248, 0.25)',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, color: '#38BDF8', lineHeight: 1.2 }}>
                تأییدیه کامل
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6, fontWeight: 600 }}>
                صلاحیت عمومی و قضایی
              </div>
            </div>

            <div style={{ fontSize: 14, color: '#CBD5E1', textAlign: 'center', lineHeight: 1.6 }}>
              فاقد هرگونه محکومیت کیفری، انضباطی دانشگاهی یا قضایی موثر
            </div>
          </div>

          {/* Column 3 (Left): Scientific Articles & Patents */}
          <div
            style={{
              position: 'relative',
              borderRadius: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              border: localFrame >= 595 ? '2px solid #10B981' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: localFrame >= 595 ? '0 16px 40px rgba(16, 185, 129, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              backdropFilter: 'blur(14px)',
              opacity: c3Entrance,
              transform: `translateY(${(1 - c3Entrance) * 30}px) scale(${localFrame >= 595 ? c3Lock.scale : 1})`,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 900,
                color: '#10B981',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
              }}
            >
              ۳
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, color: '#94A3B8', fontWeight: 600, marginBottom: 8 }}>
                شرط سوم
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
                تولیدات علمی معتبر
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(7, 9, 14, 0.7)',
                borderRadius: 12,
                padding: '16px 24px',
                width: '80%',
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, color: '#10B981', lineHeight: 1.2 }}>
                مقاله یا اختراع
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6, fontWeight: 600 }}>
                نمایه‌های معتبر بین‌المللی
              </div>
            </div>

            <div style={{ fontSize: 14, color: '#CBD5E1', textAlign: 'center', lineHeight: 1.6 }}>
              ارائه مقالات معتبر در مجلات تخصصی یا ثبت اختراع مصوب و تایید شده
            </div>
          </div>
        </div>

        {/* Footer Ground Datum */}
        <div
          style={{
            position: 'absolute',
            bottom: 70,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: '#64748B',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: 14,
          }}
        >
          <span>تطبیق کارشناسی مدارک در سامانه یکپارچه بنیاد نخبگان</span>
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>شرایط لازم اولیه ورود به فرآیند</span>
        </div>
      </div>
    </CameraGrammarRig>
  );
};
