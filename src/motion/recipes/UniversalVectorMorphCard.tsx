/**
 * ============================================================================
 * CLAUDE OPUS 5.5: UNIVERSAL DYNAMIC VECTOR MORPH CARD RECIPE
 * ============================================================================
 * 
 * A 100% theme-adaptive, parametric vector morphology showcase.
 * Accepts any arbitrary list of VectorShapeBlueprints, calculates seamless
 * multi-keyframe path interpolation, renders a tactile multi-stage progress
 * stepper, and displays synchronous metrics and explanatory Persian labels.
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { interpolatePath, evolvePath } from '@remotion/paths';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { LiquidMitosisCore } from '../library/OrganicLiquidGooey';
import { VectorShapeBlueprint, DYNAMIC_VECTOR_CATALOG } from '../library/DynamicVectorCatalog';

export type CardTheme = 
  | 'MODERN_GLASSMORPHIC'
  | 'STOP_MOTION_PAPER'
  | 'TECHNICAL_BLUEPRINT'
  | 'NEO_BRUTALIST';

export interface UniversalVectorMorphCardProps {
  stages?: VectorShapeBlueprint[];
  startFrame?: number;
  durationInFrames?: number;
  width?: number;
  height?: number;
  theme?: CardTheme;
  glowColor?: string;
}

export const UniversalVectorMorphCard: React.FC<UniversalVectorMorphCardProps> = ({
  stages,
  startFrame = 0,
  durationInFrames = 360,
  width = 1360,
  height = 560,
  theme = 'STOP_MOTION_PAPER',
  glowColor,
}) => {
  const currentFrame = useCurrentFrame();
  const relFrame = Math.max(0, currentFrame - startFrame);

  // Default to 4 diverse shapes if none provided
  const activeStages = stages && stages.length >= 2 ? stages : [
    DYNAMIC_VECTOR_CATALOG.STELLAR_OCTAGRAM,
    DYNAMIC_VECTOR_CATALOG.NEURAL_SYNAPSE,
    DYNAMIC_VECTOR_CATALOG.QUANTUM_ORBITALS,
    DYNAMIC_VECTOR_CATALOG.SECURITY_SHIELD,
  ];

  const stageCount = activeStages.length;
  const stageWindow = durationInFrames / stageCount;
  const morphDuration = stageWindow * 0.35; // 35% of each slice spent morphing

  // Determine current active stage index and morph progress
  const currentSlice = Math.min(stageCount - 1, Math.floor(relFrame / stageWindow));
  const sliceRelFrame = relFrame - currentSlice * stageWindow;

  let activeStage = activeStages[currentSlice];
  let nextStage = activeStages[Math.min(stageCount - 1, currentSlice + 1)];
  let currentD = activeStage.path;
  let activeColor = activeStage.accentColor;
  let morphProgress = 0;

  if (sliceRelFrame > (stageWindow - morphDuration) && currentSlice < stageCount - 1) {
    const morphRel = sliceRelFrame - (stageWindow - morphDuration);
    morphProgress = interpolate(morphRel, [0, morphDuration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });

    try {
      currentD = interpolatePath(morphProgress, activeStage.path, nextStage.path);
    } catch {
      currentD = morphProgress > 0.5 ? nextStage.path : activeStage.path;
    }

    activeColor = morphProgress > 0.5 ? nextStage.accentColor : activeStage.accentColor;
  }

  // Angular tilt momentum
  const tiltDeg = Math.sin(relFrame * 0.08) * 3;
  const pulseScale = 1 + Math.sin(relFrame * 0.12) * 0.03;

  // Liquid mitosis split effect during transitions
  const mitosisSplit = morphProgress > 0 ? Math.sin(morphProgress * Math.PI) : 0;

  // Theme-aware styles
  const isPaper = theme === 'STOP_MOTION_PAPER';
  const isBlueprint = theme === 'TECHNICAL_BLUEPRINT';
  const isBrutalist = theme === 'NEO_BRUTALIST';

  const cardBg = isPaper 
    ? 'linear-gradient(135deg, rgba(20, 45, 30, 0.94) 0%, rgba(10, 30, 20, 0.97) 100%)'
    : isBlueprint
    ? 'rgba(4, 20, 36, 0.94)'
    : isBrutalist
    ? '#ffffff'
    : 'rgba(15, 23, 42, 0.88)';

  const cardBorder = isPaper
    ? '2px solid rgba(52, 211, 153, 0.25)'
    : isBlueprint
    ? '2px solid #06b6d4'
    : isBrutalist
    ? '4px solid #000000'
    : '1px solid rgba(255, 255, 255, 0.15)';

  const cardShadow = isBrutalist
    ? '10px 10px 0px #000000'
    : isBlueprint
    ? '0 25px 60px -15px rgba(6, 182, 212, 0.3)'
    : '0 25px 60px -15px rgba(0, 0, 0, 0.7)';

  const textColor = isBrutalist ? '#000000' : '#f8fafc';
  const mutedColor = isBrutalist ? '#4b5563' : '#94a3b8';

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        borderRadius: isBrutalist ? 8 : 12,
        background: cardBg,
        border: cardBorder,
        boxShadow: cardShadow,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 44px',
        direction: 'rtl',
        fontFamily: 'Yekan Bakh, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* 1. TOP RESPONSIVE STAGE STEPPER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingBottom: 16,
          borderBottom: isBrutalist ? '2px solid #000000' : '1px solid rgba(255, 255, 255, 0.12)',
          zIndex: 5,
        }}
      >
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {activeStages.map((stage, idx) => {
            const isActive = idx === currentSlice;
            const isPassed = idx < currentSlice;

            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: isBrutalist ? 4 : 20,
                  background: isActive
                    ? `${stage.accentColor}25`
                    : isPassed
                    ? 'rgba(16, 185, 129, 0.15)'
                    : isBrutalist
                    ? '#f3f4f6'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isActive
                    ? `1.5px solid ${stage.accentColor}`
                    : isPassed
                    ? '1.5px solid #10b981'
                    : isBrutalist
                    ? '1.5px solid #000000'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: isPassed ? '#10b981' : isActive ? stage.accentColor : '#64748b',
                    boxShadow: isActive ? `0 0 10px ${stage.accentColor}` : 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? textColor : mutedColor,
                  }}
                >
                  {sanitizeForDisplay(`${idx + 1}. ${stage.nameFa}`)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Topology Badge */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: activeColor,
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            direction: 'ltr',
          }}
        >
          [TOPOLOGY: {activeStage.id}]
        </div>
      </div>

      {/* 2. MAIN BODY: LEFT (SVG MORPH CORE) & RIGHT (TITLE & METRICS) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          gap: 40,
        }}
      >
        {/* LEFT (in RTL): SVG MORPHING CANVAS */}
        <div
          style={{
            width: 320,
            height: 320,
            flexShrink: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {/* Ambient Radial Backlight */}
          <div
            style={{
              position: 'absolute',
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${activeColor}44 0%, transparent 70%)`,
              transform: `scale(${pulseScale})`,
              filter: 'blur(16px)',
              pointerEvents: 'none',
            }}
          />

          {/* Mitosis shockwave aura */}
          {mitosisSplit > 0.05 && (
            <div
              style={{
                position: 'absolute',
                width: 180 + mitosisSplit * 120,
                height: 180 + mitosisSplit * 120,
                borderRadius: '50%',
                border: `2px solid ${activeColor}`,
                opacity: (1 - mitosisSplit) * 0.8,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Concentric Decorative Rings */}
          <svg
            width="320"
            height="320"
            viewBox="0 0 210 210"
            style={{
              position: 'absolute',
              transform: `rotate(${relFrame * 0.4}deg)`,
              pointerEvents: 'none',
              opacity: isBrutalist ? 0.2 : 0.4,
            }}
          >
            <circle
              cx="105"
              cy="105"
              r="95"
              fill="none"
              stroke={activeColor}
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <circle
              cx="105"
              cy="105"
              r="80"
              fill="none"
              stroke={activeColor}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Liquid Mitosis Core during transition */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              opacity: isBrutalist ? 0.3 : 0.7,
              pointerEvents: 'none',
            }}
          >
            <LiquidMitosisCore
              size={270}
              splitProgress={mitosisSplit}
              primaryColor={activeColor}
              accentColor="#38bdf8"
            />
          </div>

          {/* MAIN MORPHING SVG PATH */}
          <svg
            width="270"
            height="270"
            viewBox="0 0 200 200"
            style={{
              position: 'relative',
              zIndex: 2,
              filter: isBrutalist ? 'none' : `drop-shadow(0 0 24px ${activeColor}aa)`,
            }}
          >
            <defs>
              <linearGradient id="universalMorphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor={activeColor} />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <path
              d={currentD}
              fill={`${activeColor}22`}
              stroke={isBrutalist ? '#000000' : 'url(#universalMorphGrad)'}
              strokeWidth={isBrutalist ? 5 : 3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transformOrigin: '100px 100px',
                transform: `rotate(${tiltDeg}deg)`,
              }}
            />
          </svg>
        </div>

        {/* RIGHT (in RTL): DESCRIPTIVE LABELS & METRICS */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'right',
            marginTop: 16,
          }}
        >
          {/* Stage Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div
              style={{
                padding: '6px 18px',
                borderRadius: isBrutalist ? 4 : 20,
                background: `${activeColor}22`,
                border: isBrutalist ? '2px solid #000000' : `1.5px solid ${activeColor}66`,
                color: isBrutalist ? '#000000' : activeColor,
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 0.3,
              }}
            >
              {sanitizeForDisplay(`مرحله ${currentSlice + 1}: ${activeStage.nameFa}`)}
            </div>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: activeColor,
                boxShadow: isBrutalist ? 'none' : `0 0 12px ${activeColor}`,
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: textColor,
              marginBottom: 12,
              lineHeight: 1.3,
            }}
          >
            {sanitizeForDisplay(activeStage.nameFa)}
          </div>

          {/* Detail Subtitle */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: mutedColor,
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            {sanitizeForDisplay(activeStage.subLabelFa)}
          </div>

          {/* Technical Telemetry 3-Column Metrics */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              paddingTop: 18,
              borderTop: isBrutalist ? '2px solid #000000' : '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div>
              <div style={{ fontSize: 14, color: mutedColor, fontWeight: 600 }}>نرخ فریم برداری</div>
              <div style={{ fontSize: 20, color: textColor, fontWeight: 800 }}>۶۰ fps روان</div>
            </div>
            <div style={{ width: 1, height: 40, background: isBrutalist ? '#000000' : 'rgba(255, 255, 255, 0.15)' }} />
            <div>
              <div style={{ fontSize: 14, color: mutedColor, fontWeight: 600 }}>خطای برداری</div>
              <div style={{ fontSize: 20, color: '#10b981', fontWeight: 800 }}>۰.۰۰ (بی‌نقص)</div>
            </div>
            <div style={{ width: 1, height: 40, background: isBrutalist ? '#000000' : 'rgba(255, 255, 255, 0.15)' }} />
            <div>
              <div style={{ fontSize: 14, color: mutedColor, fontWeight: 600 }}>پیوستگی مسیر</div>
              <div style={{ fontSize: 20, color: activeColor, fontWeight: 800 }}>۱۰۰٪ مداوم</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
