import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { AtmosphereParticles } from '../../motion/particles';

interface ConditionItem {
  id: string;
  status: 'valid' | 'forbidden';
  title: string;
  desc: string;
  badge: string;
  color: string;
  icon: string;
}

const CONDITIONS: ConditionItem[] = [
  {
    id: 'c1',
    status: 'valid',
    title: 'کد اخلاق مصوب کمیته ملی',
    desc: 'کلیه مقالات و طرح‌های بالینی و حیوانی باید دارای شناسنامه و کد اخلاق فعال و ثبت‌شده باشند.',
    badge: 'الزامی و بدون قید و شرط',
    color: '#10B981',
    icon: '✓',
  },
  {
    id: 'c2',
    status: 'forbidden',
    title: 'عدم هرگونه سرقت علمی (Plagiarism)',
    desc: 'بررسی همپوشانی متنی با سامانه‌های سمیم نور و iThenticate؛ رد قطعی در صورت تخلف نگارشی.',
    badge: 'خط قرمز ارزیابی',
    color: '#EF4444',
    icon: '✕',
  },
  {
    id: 'c3',
    status: 'forbidden',
    title: 'عدم انتشار در مجلات نامعتبر (Blacklist)',
    desc: 'استعلام فوری از فهرست نشریات نامعتبر و جعلی وزارت بهداشت و علوم پیش از محاسبه امتیاز.',
    badge: 'سلب امتیاز کامل',
    color: '#F59E0B',
    icon: '⚠',
  },
];

export const Shot05_Comparison: React.FC = () => {
  const frame = useCurrentFrame();

  // Header entrance
  const headerOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Concentric Iris Seal animation (Rule B3: dynamic security seal lock)
  const sealRotate = interpolate(frame, [0, 400], [0, 360]);
  const sealScale = interpolate(frame, [10, 45], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  // Stamp lock wave flash
  const flashOp = interpolate(frame, [45, 50, 65], [0, 0.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#030712',
        overflow: 'hidden',
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix & Subtle Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 75% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 65%),
            radial-gradient(circle at 25% 50%, rgba(239, 68, 68, 0.04) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />
      <AtmosphereParticles count={22} opacity={0.3} />

      {/* Screen flash on seal lock */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#10B981',
          opacity: flashOp,
          pointerEvents: 'none',
        }}
      />

      {/* Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: headerOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px',
            borderRadius: 999,
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: 12,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#10B981', letterSpacing: '0.08em' }}>
            فیلتر انضباطی و اخلاق زیستی
          </span>
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 42,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: '-0.02em',
          }}
        >
          شروط بنیادین و بدون قید و شرط ورود به داوری
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: 17, color: '#94A3B8' }}>
          اصالت علمی، سلامت پژوهش و رعایت پروتکل‌های کمیته ملی اخلاق پزشکی
        </p>
      </div>

      {/* Left-Side Concentric Security Seal Graphic */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 120,
          width: 480,
          height: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${sealScale})`,
        }}
      >
        <svg width={480} height={480} viewBox="0 0 480 480">
          <circle
            cx={240}
            cy={240}
            r={210}
            fill="none"
            stroke="rgba(16, 185, 129, 0.2)"
            strokeWidth="2"
            strokeDasharray="8 8"
            style={{ transformOrigin: '240px 240px', transform: `rotate(${sealRotate}deg)` }}
          />
          <circle
            cx={240}
            cy={240}
            r={180}
            fill="none"
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="3"
          />
          <circle
            cx={240}
            cy={240}
            r={140}
            fill="rgba(8, 18, 32, 0.85)"
            stroke="#10B981"
            strokeWidth="3"
            filter="drop-shadow(0 0 20px rgba(16, 185, 129, 0.35))"
          />

          {/* Central Emblem Icon */}
          <path
            d="M 240 180 L 280 200 L 280 250 C 280 280 240 300 240 300 C 240 300 200 280 200 250 L 200 200 Z"
            fill="rgba(16, 185, 129, 0.2)"
            stroke="#10B981"
            strokeWidth="3"
          />
          <path
            d="M 225 245 L 235 255 L 255 235"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          style={{
            position: 'absolute',
            bottom: 30,
            textAlign: 'center',
            direction: 'rtl',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: '#10B981' }}>
            تأییدیه کمیته ملی اخلاق
          </div>
          <div style={{ fontSize: 13, color: '#64748B' }}>
            IR.NREC CERTIFIED PROTOCOL
          </div>
        </div>
      </div>

      {/* Right-Side Three Security Gates / Checklist */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          right: 120,
          width: 820,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          direction: 'rtl',
        }}
      >
        {CONDITIONS.map((cond, idx) => {
          const itemDelay = 20 + idx * 12;
          const itemProgress = interpolate(frame, [itemDelay, itemDelay + 25], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={cond.id}
              style={{
                padding: '24px 28px',
                borderRadius: 18,
                background: 'rgba(8, 16, 32, 0.85)',
                backdropFilter: 'blur(16px)',
                border: `1.5px solid ${itemProgress > 0.8 ? cond.color : 'rgba(255,255,255,0.08)'}`,
                boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 20px ${cond.color}15`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                opacity: itemProgress,
                transform: `translateX(${(1 - itemProgress) * -40}px)`,
              }}
            >
              {/* Status Badge Icon */}
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  backgroundColor: `${cond.color}18`,
                  border: `2px solid ${cond.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  fontWeight: 900,
                  color: cond.color,
                  flexShrink: 0,
                }}
              >
                {cond.icon}
              </div>

              {/* Text Description */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC' }}>
                    {cond.title}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: cond.color,
                      padding: '3px 10px',
                      borderRadius: 6,
                      backgroundColor: `${cond.color}20`,
                      border: `1px solid ${cond.color}40`,
                    }}
                  >
                    {cond.badge}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 15, color: '#94A3B8', lineHeight: 1.6 }}>
                  {cond.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
