import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { NumberImpact } from '../../motion/typography';

interface GaugeData {
  title: string;
  sub: string;
  steps: number[];
  finalPoints: number;
  maxPoints: number;
  startFrame: number;
  color: string;
}

const GAUGES: GaugeData[] = [
  {
    title: 'دکتری بالینی',
    sub: 'دستیاران و فلوشیپ',
    steps: [12.0, 14.5, 16.0],
    finalPoints: 16,
    maxPoints: 150,
    startFrame: 15,
    color: '#38BDF8',
  },
  {
    title: 'کارشناسی ارشد',
    sub: 'کلیه رشته‌های علوم پزشکی',
    steps: [45.0, 56.0, 65.0],
    finalPoints: 65,
    maxPoints: 150,
    startFrame: 23,
    color: '#FBBF24',
  },
  {
    title: 'دکتری تخصصی',
    sub: 'Ph.D رشته‌های بهداشت و پایه',
    steps: [85.0, 100.0, 110.0],
    finalPoints: 110,
    maxPoints: 150,
    startFrame: 31,
    color: '#D4AF37',
  },
  {
    title: 'پزشکی و دندان',
    sub: 'دکترای حرفه‌ای و داروسازی',
    steps: [105.0, 120.0, 130.0],
    finalPoints: 130,
    maxPoints: 150,
    startFrame: 39,
    color: '#10B981',
  },
];

const R = 85;
const CX = 140;
const CY = 125;

const polar = (deg: number, r: number): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
};

const arcPath = (d0: number, d1: number, r: number): string => {
  const [x0, y0] = polar(135 + d0, r);
  const [x1, y1] = polar(135 + d1, r);
  const large = d1 - d0 > 180 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};

const needleAngle = (frame: number, s: number, targetDeg: number): number => {
  if (frame <= s) return 0;
  if (frame <= s + 12) {
    return interpolate(frame, [s, s + 12], [0, 270], {
      easing: Easing.out(Easing.cubic),
    });
  }
  if (frame <= s + 25) {
    return interpolate(frame, [s + 12, s + 25], [270, Math.max(0, targetDeg - 8)], {
      easing: Easing.inOut(Easing.cubic),
    });
  }
  return interpolate(frame, [s + 25, s + 32], [Math.max(0, targetDeg - 8), targetDeg], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: 'clamp',
  });
};

const SingleGauge: React.FC<{ gauge: GaugeData }> = ({ gauge }) => {
  const frame = useCurrentFrame();
  const targetDeg = (gauge.finalPoints / gauge.maxPoints) * 270;
  const currentDeg = needleAngle(frame, gauge.startFrame, targetDeg);

  const needleRad = ((135 + currentDeg) * Math.PI) / 180;
  const tipX = CX + (R - 14) * Math.cos(needleRad);
  const tipY = CY + (R - 14) * Math.sin(needleRad);
  const tailX = CX - 18 * Math.cos(needleRad);
  const tailY = CY - 18 * Math.sin(needleRad);

  return (
    <div
      style={{
        width: 280,
        height: 380,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <svg width={280} height={250} viewBox="0 0 280 250">
        <path
          d={arcPath(0, 270, R)}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {currentDeg > 1 && (
          <path
            d={arcPath(0, Math.min(270, currentDeg), R)}
            fill="none"
            stroke={gauge.color}
            strokeWidth="6"
            strokeLinecap="round"
            filter="drop-shadow(0 0 6px rgba(212, 175, 55, 0.4))"
          />
        )}

        {[0, 45, 90, 135, 180, 225, 270].map((tDeg, idx) => {
          const [x1, y1] = polar(135 + tDeg, R - 8);
          const [x2, y2] = polar(135 + tDeg, R + 8);
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={tDeg % 90 === 0 ? 2 : 1}
            />
          );
        })}

        <circle cx={CX} cy={CY} r="14" fill="#0A1128" stroke="#D4AF37" strokeWidth="2" />
        <circle cx={CX} cy={CY} r="6" fill="#F8FAFC" />

        <line
          x1={tailX}
          y1={tailY}
          x2={tipX}
          y2={tipY}
          stroke={gauge.color}
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="drop-shadow(0 0 4px rgba(255, 255, 255, 0.5))"
        />
      </svg>

      {/* VO Beat -> Visual Beat Progression (Rule B2) */}
      <div style={{ marginTop: -30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <NumberImpact
          steps={gauge.steps}
          frame={frame}
          startFrame={gauge.startFrame + 10}
          stepInterval={7}
          color={gauge.color}
          suffix="امتیاز"
        />

        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#F8FAFC',
            marginTop: 8,
            direction: 'rtl',
          }}
        >
          {gauge.title}
        </span>
        <span
          style={{
            fontSize: 15,
            color: '#64748B',
            marginTop: 4,
            direction: 'rtl',
            textAlign: 'center',
          }}
        >
          {gauge.sub}
        </span>
      </div>
    </div>
  );
};

export const Shot02_Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.05) 0%, transparent 70%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: titleOp,
          direction: 'rtl',
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 8 }}>
          ماده ۲ — جدول حدنصاب امتیازات ورودی
        </span>
        <span style={{ fontSize: 38, fontWeight: 800, color: '#F8FAFC' }}>
          حداقل امتیاز بر اساس مقطع تحصیلی
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {GAUGES.map((g, idx) => (
          <SingleGauge key={idx} gauge={g} />
        ))}
      </div>
    </div>
  );
};
