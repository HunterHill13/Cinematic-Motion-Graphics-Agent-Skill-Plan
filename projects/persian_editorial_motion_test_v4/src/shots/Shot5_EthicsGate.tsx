import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { seg } from '../motion/Motion';

/**
 * Shot 5: Exclusion Rules & Ethics Committee Verification
 * Reused & adapted from:
 * - circle-match-iris (demos/transition)
 * - neon-frame-orb (demos/ui-entrance)
 */

export const Shot5_EthicsGate: React.FC = () => {
  const frame = useCurrentFrame();

  // Seal assembly & rotation
  const sealScale = interpolate(frame, [0, 40], [0.75, 1], {
    easing: Easing.out(Easing.back(1.5)),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sealOp = seg(frame, 0, 30, Easing.out(Easing.quad));
  const ringRot = interpolate(frame, [0, 480], [0, 45]);

  // Verification lock (f45–f75)
  const lockProgress = seg(frame, 45, 75, Easing.out(Easing.cubic));
  const verifiedOp = seg(frame, 70, 95, Easing.out(Easing.quad));

  const CRITERIA = [
    { title: 'کد اخلاق مصوب (REC Code)', status: 'الزامی', desc: 'دارای شناسه اختصاصی از سامانه ملی اخلاق پزشکی' },
    { title: 'اصالت پژوهش و نفی سرقت ادبی', status: 'بدون تخلف', desc: 'بررسی در سامانه‌های همانندجو و نفی شباهت علمی' },
    { title: 'عدم وابستگی به مجلات نامعتبر', status: 'تأیید کامل', desc: 'عدم نمایه در لیست سیاه وزارت بهداشت و علوم' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#050814',
        overflow: 'hidden',
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Architectural Mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 65%),
            linear-gradient(rgba(212, 175, 55, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          direction: 'rtl',
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 8 }}>
          فیلتر ورودی — کمیته ملی اخلاق در پژوهش
        </span>
        <span style={{ fontSize: 38, fontWeight: 800, color: '#F8FAFC' }}>
          شرایط عدم شمول و الزامات قطعی ورود به داوری
        </span>
      </div>

      {/* Central Visual Layout: Ethics Seal + 3 Gate Pillars */}
      <div
        style={{
          position: 'absolute',
          top: 210,
          left: 120,
          right: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          direction: 'rtl',
        }}
      >
        {/* Left (Visual Center): Grand Ethics Verification Seal */}
        <div
          style={{
            width: 440,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${sealScale})`,
            opacity: sealOp,
          }}
        >
          <svg width={260} height={260} viewBox="0 0 260 260">
            {/* Outer Security Ring */}
            <circle
              cx="130"
              cy="130"
              r="118"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="8 6"
              transform={`rotate(${ringRot} 130 130)`}
            />
            {/* Verified Lock Arc */}
            <circle
              cx="130"
              cy="130"
              r="100"
              fill="rgba(16, 185, 129, 0.06)"
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray="628"
              strokeDashoffset={628 * (1 - lockProgress)}
              transform="rotate(-90 130 130)"
            />
            {/* Center Shield */}
            <path
              d="M 130 55 Q 175 75 190 120 Q 185 185 130 205 Q 75 185 70 120 Q 85 75 130 55 Z"
              fill="#0F172A"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            {/* Checkmark */}
            <path
              d="M 105 130 L 122 148 L 158 108"
              fill="none"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={verifiedOp}
            />
          </svg>

          {/* Verification Code Stamp */}
          <div
            style={{
              marginTop: 16,
              padding: '6px 16px',
              borderRadius: 8,
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              opacity: verifiedOp,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: '#10B981', letterSpacing: '0.08em' }}>
              IR.BMSU.REC.VERIFIED
            </span>
          </div>
        </div>

        {/* Right: Mandatory Checklist Items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {CRITERIA.map((c, idx) => {
            const cStart = 35 + idx * 12;
            const cOp = seg(frame, cStart, cStart + 15, Easing.out(Easing.quad));
            const cX = interpolate(frame, [cStart, cStart + 15], [30, 0], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={idx}
                style={{
                  padding: '24px 28px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: 14,
                  transform: `translateX(${cX}px)`,
                  opacity: cOp,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC', marginBottom: 6 }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: 16, color: '#94A3B8' }}>{c.desc}</div>
                </div>

                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: 10,
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10B981',
                    color: '#10B981',
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {c.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
