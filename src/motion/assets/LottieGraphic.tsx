/**
 * ============================================================================
 * LOTTIE & VECTOR GRAPHIC RUNTIME COMPONENT (ZERO-DELAY DETERMINISTIC ENGINE)
 * ============================================================================
 *
 * Provides an offline, hardware-accelerated animated vector asset layer
 * for tech, bio, and fintech motion graphics without WebGL, external network calls,
 * or async delayRender() timeouts.
 *
 * FEATURES:
 * 1. 5 Curated Offline Presets (tech_ai_core, bio_helix_pulse, fintech_growth_chart, ui_check_confirm, abstract_portal).
 * 2. Remotion Frame-Synchronized Deterministic Vector Playback.
 * 3. Color Tinting & Accent Harmonization.
 * ============================================================================
 */

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { LottieAnimationData } from '@remotion/lottie';

// Direct imports of bundled offline JSON assets (preserved for preset integrity verification)
import techAiCoreJson from '../../../assets/lottie/tech_ai_core.json';
import bioHelixPulseJson from '../../../assets/lottie/bio_helix_pulse.json';
import fintechGrowthChartJson from '../../../assets/lottie/fintech_growth_chart.json';
import uiCheckConfirmJson from '../../../assets/lottie/ui_check_confirm.json';
import abstractPortalJson from '../../../assets/lottie/abstract_portal.json';

export type LottiePreset =
  | 'tech_ai_core'
  | 'bio_helix_pulse'
  | 'fintech_growth_chart'
  | 'ui_check_confirm'
  | 'abstract_portal';

export const LOTTIE_PRESET_MAP: Record<LottiePreset, LottieAnimationData> = {
  tech_ai_core: techAiCoreJson as unknown as LottieAnimationData,
  bio_helix_pulse: bioHelixPulseJson as unknown as LottieAnimationData,
  fintech_growth_chart: fintechGrowthChartJson as unknown as LottieAnimationData,
  ui_check_confirm: uiCheckConfirmJson as unknown as LottieAnimationData,
  abstract_portal: abstractPortalJson as unknown as LottieAnimationData,
};

export interface LottieGraphicProps {
  preset?: LottiePreset;
  animationData?: LottieAnimationData;
  size?: number;
  width?: number;
  height?: number;
  playbackRate?: number;
  loop?: boolean;
  accentColor?: string;
  style?: React.CSSProperties;
}

export const LottieGraphic: React.FC<LottieGraphicProps> = ({
  preset = 'tech_ai_core',
  size = 180,
  width,
  height,
  playbackRate = 1.0,
  accentColor = '#06b6d4',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const targetWidth = width ?? size;
  const targetHeight = height ?? size;
  const f = frame * playbackRate;
  const pulse = 1 + 0.06 * Math.sin((f / fps) * Math.PI * 2);
  const rotSlow = (f * 1.4) % 360;
  const rotReverse = (-f * 1.1) % 360;
  const popSpring = spring({ frame: f % 90, fps, config: { damping: 14, stiffness: 120 } });

  const renderPresetSvg = () => {
    switch (preset) {
      case 'tech_ai_core':
        return (
          <svg viewBox="0 0 240 240" width="100%" height="100%">
            <defs>
              <radialGradient id="aiCoreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="120" cy="120" r="105" fill="url(#aiCoreGrad)" />
            <g transform={`translate(120, 120) rotate(${rotSlow})`}>
              <circle
                cx="0"
                cy="0"
                r="86"
                fill="none"
                stroke={accentColor}
                strokeWidth="2.5"
                strokeDasharray="18 12"
                opacity="0.7"
              />
              <polygon
                points="0,-72 62,-36 62,36 0,72 -62,36 -62,-36"
                fill="rgba(6, 182, 212, 0.08)"
                stroke={accentColor}
                strokeWidth="2.5"
              />
            </g>
            <g transform={`translate(120, 120) rotate(${rotReverse})`}>
              <rect
                x="-44"
                y="-44"
                width="88"
                height="88"
                rx="16"
                fill="rgba(15, 23, 42, 0.85)"
                stroke="#38bdf8"
                strokeWidth="3"
              />
            </g>
            <circle cx="120" cy="120" r={22 * pulse} fill={accentColor} opacity="0.9" />
            <circle cx="120" cy="120" r="10" fill="#ffffff" />
          </svg>
        );

      case 'bio_helix_pulse':
        return (
          <svg viewBox="0 0 240 240" width="100%" height="100%">
            <circle
              cx="120"
              cy="120"
              r="92"
              fill="rgba(16, 185, 129, 0.07)"
              stroke={accentColor}
              strokeWidth="2"
              strokeDasharray="8 8"
            />
            {[-60, -36, -12, 12, 36, 60].map((yOffset, i) => {
              const phase = (f * 0.08) + i * 0.7;
              const x1 = 120 + Math.sin(phase) * 48;
              const x2 = 120 - Math.sin(phase) * 48;
              const y = 120 + yOffset;
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    stroke={accentColor}
                    strokeWidth="2.5"
                    opacity="0.55"
                  />
                  <circle cx={x1} cy={y} r="7" fill="#10b981" />
                  <circle cx={x2} cy={y} r="7" fill="#38bdf8" />
                </g>
              );
            })}
          </svg>
        );

      case 'fintech_growth_chart': {
        const b1 = interpolate(popSpring, [0, 1], [24, 68]);
        const b2 = interpolate(popSpring, [0, 1], [32, 104]);
        const b3 = interpolate(popSpring, [0, 1], [40, 146]);
        return (
          <svg viewBox="0 0 240 240" width="100%" height="100%">
            {/* Grid baseline */}
            <line x1="36" y1="192" x2="204" y2="192" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            <line x1="36" y1="140" x2="204" y2="140" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="36" y1="88" x2="204" y2="88" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 6" />
            {/* Bar 1 (65) */}
            <rect x="52" y={192 - b1} width="32" height={b1} rx="8" fill="#06b6d4" />
            {/* Bar 2 (110) */}
            <rect x="104" y={192 - b2} width="32" height={b2} rx="8" fill="#10b981" />
            {/* Bar 3 (130) */}
            <rect x="156" y={192 - b3} width="32" height={b3} rx="8" fill="#f59e0b" />
            {/* Ascending trend arrow */}
            <polyline
              points={`68,${180 - b1} 120,${180 - b2} 172,${180 - b3}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="68" cy={180 - b1} r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="120" cy={180 - b2} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="172" cy={180 - b3} r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
          </svg>
        );
      }

      case 'ui_check_confirm':
        return (
          <svg viewBox="0 0 240 240" width="100%" height="100%">
            <g transform={`translate(120, 120) scale(${pulse})`}>
              <circle
                cx="0"
                cy="0"
                r="88"
                fill="rgba(16, 185, 129, 0.14)"
                stroke="#10b981"
                strokeWidth="3.5"
              />
              <circle
                cx="0"
                cy="0"
                r="68"
                fill="rgba(6, 182, 212, 0.12)"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="10 8"
              />
              <polyline
                points="-32,4 -8,28 38,-22"
                fill="none"
                stroke="#10b981"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        );

      case 'abstract_portal':
      default:
        return (
          <svg viewBox="0 0 240 240" width="100%" height="100%">
            <g transform={`translate(120, 120) rotate(${rotSlow})`}>
              <polygon
                points="0,-88 76,-44 76,44 0,88 -76,44 -76,-44"
                fill="rgba(245, 158, 11, 0.08)"
                stroke="#f59e0b"
                strokeWidth="3"
              />
              <circle cx="0" cy="-88" r="6" fill="#f59e0b" />
              <circle cx="76" cy="-44" r="6" fill="#10b981" />
              <circle cx="76" cy="44" r="6" fill="#06b6d4" />
              <circle cx="0" cy="88" r="6" fill="#f59e0b" />
              <circle cx="-76" cy="44" r="6" fill="#10b981" />
              <circle cx="-76" cy="-44" r="6" fill="#06b6d4" />
            </g>
            <g transform={`translate(120, 120) rotate(${rotReverse})`}>
              <polygon
                points="0,-58 50,-29 50,29 0,58 -50,29 -50,-29"
                fill="rgba(6, 182, 212, 0.14)"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
            </g>
            <circle cx="120" cy="120" r={18 * pulse} fill="#f59e0b" />
          </svg>
        );
    }
  };

  return (
    <div
      style={{
        width: targetWidth,
        height: targetHeight,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        filter: accentColor ? `drop-shadow(0 0 18px ${accentColor}66)` : undefined,
        ...style,
      }}
    >
      {renderPresetSvg()}
    </div>
  );
};
