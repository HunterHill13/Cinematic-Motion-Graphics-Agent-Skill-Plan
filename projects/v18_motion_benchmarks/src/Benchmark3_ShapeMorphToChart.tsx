import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { executeShapeMorph } from '../../../src/motion/recipes/ShapeMorphRecipe';
import { executeChartBarToLine } from '../../../src/motion/recipes/ChartBarToLineRecipe';
import { executeCameraPushPull } from '../../../src/motion/recipes/CameraPushPullRecipe';
import { AutoFitText } from '../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * BENCHMARK 3: Shape Morph to Data Chart Progression
 * Demonstrates:
 * 1. ShapeMorph transitioning geometry (Pill -> Analytical Container).
 * 2. ChartBarToLine turning discrete data bars into a continuous analytical trendline.
 * 3. Unified color hierarchy with single amber accent ramp.
 */
export const Benchmark3_ShapeMorphToChart: React.FC = () => {
  const frame = useCurrentFrame();

  const camera = executeCameraPushPull(frame, 0, 120, 'slow-push');

  // Phase 1: Pill badge morphs into chart backdrop container (frames 10 -> 35)
  const morph = executeShapeMorph(
    frame,
    10,
    25,
    { width: 180, height: 50, borderRadius: 25 },
    { width: 700, height: 320, borderRadius: 12 }
  );

  // Phase 2: Bar to Line data transformation (frames 45 -> 80)
  const chartData = [0.25, 0.42, 0.38, 0.65, 0.58, 0.85, 0.92];
  const chart = executeChartBarToLine(frame, 45, 35, chartData, 600, 180);

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
          borderRight: '3px solid #F59E0B',
          paddingRight: 12,
        }}
      >
        BENCHMARK 03 // SHAPE MORPH → ANALYTICAL CHART
      </div>

      {/* Morphing Container */}
      <div
        style={{
          width: morph.width,
          height: morph.height,
          borderRadius: morph.borderRadius,
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          transform: `scaleX(${morph.scaleX}) scaleY(${morph.scaleY})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: 24,
          boxSizing: 'border-box',
        }}
      >
        {frame < 35 ? (
          <AutoFitText text="شاخص بقای سلولی" maxFontSize={20} color="#F59E0B" dir="rtl" />
        ) : (
          <div style={{ width: 600, height: 260, position: 'relative', marginTop: 10 }}>
            {/* Header inside container */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 20,
              }}
            >
              <AutoFitText text="روند بهبودی پس از آپوپتوز هدفمند" maxFontSize={22} color="#F8FAFC" dir="rtl" />
              <AutoFitText text="+۹۲٪ اثربخشی" maxFontSize={20} color="#F59E0B" dir="rtl" isNumeric={true} />
            </div>

            {/* Bars */}
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                left: 0,
                width: 600,
                height: 180,
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              {chart.points.map((pt, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: pt.x,
                    bottom: 0,
                    width: pt.barWidth,
                    height: pt.barHeight,
                    backgroundColor: '#D97706',
                    opacity: pt.barOpacity,
                    borderRadius: '3px 3px 0 0',
                  }}
                />
              ))}

              {/* Continuous Trendline SVG */}
              <svg
                width="600"
                height="180"
                style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
              >
                <path
                  d={chart.linePathD}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  style={{ opacity: chart.lineOpacity }}
                />
                {chart.points.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.lineY}
                    r={4}
                    fill="#F8FAFC"
                    stroke="#D97706"
                    strokeWidth={2}
                    style={{ opacity: chart.lineOpacity }}
                  />
                ))}
              </svg>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
