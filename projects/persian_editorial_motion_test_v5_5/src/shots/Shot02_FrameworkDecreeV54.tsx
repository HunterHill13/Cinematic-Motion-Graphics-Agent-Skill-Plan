import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const Shot02_FrameworkDecreeV54: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance receives continuity beam from Shot 1 (0 - 45f)
  // Shot 2 starts at global frame 350 (15 frames BEFORE Shot 1 ends at 365)
  const beamInherited = interpolate(frame, [0, 35], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const entrance = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const pathProgress = interpolate(frame, [25, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // SEAMLESS TRANSITION T2 TO SHOT 3 (245 - 290f: 45 frames smooth transition window)
  const exitProgress = interpolate(frame, [245, 290], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const headerExitOp = interpolate(exitProgress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });
  const nodeExpandHeight = interpolate(exitProgress, [0, 1], [32, 600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#040711',
        overflow: 'hidden',
        fontFamily: "'YekanBakh', 'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Matrix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 40%, rgba(56, 189, 248, 0.08) 0%, transparent 65%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Continuity Beam from Shot 1 */}
      {beamInherited > 0.01 && (
        <div
          style={{
            position: 'absolute',
            top: 500,
            left: 160,
            right: 160,
            height: 4,
            backgroundColor: '#38BDF8',
            opacity: beamInherited,
            boxShadow: '0 0 20px #38BDF8',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Header Eyebrow & Decree Title */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: entrance * headerExitOp,
          direction: 'rtl',
        }}
      >
        <div
          style={{
            padding: '6px 20px',
            borderRadius: 999,
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: 16,
            fontSize: 15,
            fontWeight: 700,
            color: '#D4AF37',
          }}
        >
          وزارت بهداشت، درمان و آموزش پزشکی
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
          دستورالعمل بند «کاف» ماده ۲
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginTop: 10 }}>
          آیین‌نامه استعدادهای درخشان — مسیر جامع امتیازدهی به فعالیت‌های علمی
        </p>
      </div>

      {/* Vector Progression Highway */}
      <div
        style={{
          position: 'absolute',
          top: 320,
          left: 160,
          right: 160,
          height: 360,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={1600} height={360} viewBox="0 0 1600 360">
          {/* Background track line */}
          <line
            x1={100}
            y1={180}
            x2={1500}
            y2={180}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4"
            opacity={headerExitOp}
          />
          {/* Animated active energy beam */}
          <line
            x1={100}
            y1={180}
            x2={100 + pathProgress * 1400}
            y2={180}
            stroke="#38BDF8"
            strokeWidth="5"
            strokeLinecap="round"
            filter="drop-shadow(0 0 12px #38BDF8)"
            opacity={headerExitOp}
          />

          {/* Node 1: Start (transforms into column 1) */}
          <circle cx={100} cy={180} r={16} fill="#040711" stroke="#38BDF8" strokeWidth="4" opacity={1 - exitProgress} />
          <circle cx={100} cy={180} r={6} fill="#F8FAFC" opacity={1 - exitProgress} />

          {/* Node 2: Decree Core (transforms into column 2) */}
          <circle cx={800} cy={180} r={28} fill="#040711" stroke="#D4AF37" strokeWidth="4" opacity={1 - exitProgress} />
          <circle cx={800} cy={180} r={10} fill="#D4AF37" opacity={1 - exitProgress} />

          {/* Node 3: Recognition (transforms into column 3) */}
          <circle cx={1500} cy={180} r={16} fill="#040711" stroke="#10B981" strokeWidth="4" opacity={1 - exitProgress} />
          <circle cx={1500} cy={180} r={6} fill="#10B981" opacity={1 - exitProgress} />
        </svg>

        {/* Exit Morph Bridge: Nodes stretching upward into monolith foundations */}
        {exitProgress > 0.05 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 80px',
              pointerEvents: 'none',
            }}
          >
            {/* Column 1 expanding stub */}
            <div
              style={{
                width: 320,
                height: nodeExpandHeight,
                backgroundColor: 'rgba(8, 16, 34, 0.85)',
                border: '2px solid rgba(56, 189, 248, 0.5)',
                borderRadius: 20,
                opacity: exitProgress,
              }}
            />
            {/* Column 2 expanding stub */}
            <div
              style={{
                width: 320,
                height: nodeExpandHeight,
                backgroundColor: 'rgba(8, 16, 34, 0.85)',
                border: '2px solid rgba(212, 175, 55, 0.5)',
                borderRadius: 20,
                opacity: exitProgress,
              }}
            />
            {/* Column 3 expanding stub */}
            <div
              style={{
                width: 320,
                height: nodeExpandHeight,
                backgroundColor: 'rgba(8, 16, 34, 0.85)',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                borderRadius: 20,
                opacity: exitProgress,
              }}
            />
          </div>
        )}

        {/* Labels under nodes */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 80px',
            direction: 'rtl',
            opacity: headerExitOp,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8' }}>ثبت درخواست</div>
            <div style={{ fontSize: 13, color: '#64748B' }}>پرتال استعداد درخشان</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#D4AF37' }}>محاسبه جامع شاخص‌ها</div>
            <div style={{ fontSize: 14, color: '#94A3B8' }}>مستندسازی پژوهشی و فناورانه</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#10B981' }}>احراز رتبه برتر</div>
            <div style={{ fontSize: 13, color: '#64748B' }}>معرفی به مراجع ملی</div>
          </div>
        </div>
      </div>
    </div>
  );
};
