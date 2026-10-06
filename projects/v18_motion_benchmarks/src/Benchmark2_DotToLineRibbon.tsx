import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { executeDotToLine } from '../../../src/motion/recipes/DotToLineRecipe';
import { executeRibbonGrowth } from '../../../src/motion/recipes/RibbonGrowthRecipe';
import { executeCameraPushPull } from '../../../src/motion/recipes/CameraPushPullRecipe';
import { AutoFitText } from '../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * BENCHMARK 2: Geometric Evolution (Dot -> Line -> Flowing Ribbon)
 * Demonstrates:
 * 1. DotToLine recipe unrolling smoothly from focal epicenter.
 * 2. RibbonGrowth expanding with leading wave oscillation.
 * 3. Pure kinetic geometry without artificial particle clouds or glass blur.
 */
export const Benchmark2_DotToLineRibbon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const camera = executeCameraPushPull(frame, 0, 120, 'slow-push');
  const dotToLine = executeDotToLine(frame, 10, fps, 650, 4);
  const ribbon = executeRibbonGrowth(frame, 35, 45, 900, 6);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        direction: 'rtl',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        transform: `scale(${camera.scale})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 80,
          color: '#94A3B8',
          fontSize: 18,
          borderRight: '3px solid #38BDF8',
          paddingRight: 12,
        }}
      >
        BENCHMARK 02 // GEOMETRIC EVOLUTION (DOT → LINE → RIBBON)
      </div>

      {/* Kinetic Stage */}
      <div
        style={{
          position: 'relative',
          width: 800,
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 1. Origin Dot */}
        {dotToLine.dotOpacity > 0.01 && (
          <div
            style={{
              position: 'absolute',
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#38BDF8',
              transform: `scale(${dotToLine.dotScale})`,
              opacity: dotToLine.dotOpacity,
            }}
          />
        )}

        {/* 2. Unrolled Line Vector */}
        {dotToLine.isLineActive && (
          <div
            style={{
              position: 'absolute',
              width: dotToLine.lineWidth,
              height: dotToLine.lineHeight,
              backgroundColor: '#38BDF8',
              borderRadius: 2,
              top: 150,
              left: 400 - dotToLine.lineWidth / 2,
            }}
          />
        )}

        {/* 3. Flowing Ribbon SVG (takes over at frame 35) */}
        {frame >= 35 && (
          <svg
            width="800"
            height="300"
            style={{ position: 'absolute', top: 0, left: 0, opacity: ribbon.opacity }}
          >
            <path
              d={`M 50 150 Q 250 ${120 + ribbon.headY * 3}, 450 150 T 750 150`}
              fill="none"
              stroke="#0284C7"
              strokeWidth={ribbon.width}
              strokeDasharray={ribbon.strokeDasharray}
              strokeDashoffset={ribbon.strokeDashoffset}
              strokeLinecap="round"
            />
            {/* Leading Pulse Head */}
            <circle
              cx={50 + (ribbon.pathLength - ribbon.strokeDashoffset) * 0.77}
              cy={150 + ribbon.headY}
              r={ribbon.width * 1.5}
              fill="#38BDF8"
            />
          </svg>
        )}
      </div>

      {/* Annotation */}
      <div style={{ marginTop: 40, textAlign: 'center', opacity: frame >= 40 ? 1 : 0 }}>
        <AutoFitText
          text="امتداد خطی مسیرهای پیام‌رسانی بیولوژیک"
          maxFontSize={28}
          color="#E2E8F0"
          dir="rtl"
        />
      </div>
    </AbsoluteFill>
  );
};
