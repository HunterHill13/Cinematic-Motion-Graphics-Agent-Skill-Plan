/**
 * ============================================================================
 * LOTTIE GRAPHIC RUNTIME COMPONENT (@remotion/lottie)
 * ============================================================================
 * 
 * Provides an offline, hardware-accelerated animated vector asset layer
 * for tech, bio, and fintech motion graphics without WebGL or external network calls.
 * 
 * FEATURES:
 * 1. 5 Curated Offline Presets (tech_ai_core, bio_helix_pulse, fintech_growth_chart, ui_check_confirm, abstract_portal).
 * 2. Remotion Frame-Synchronized Playback.
 * 3. Color Tinting & Accent Harmonization.
 * ============================================================================
 */

import React, { useMemo } from 'react';
import { Lottie, LottieAnimationData } from '@remotion/lottie';

// Direct imports of bundled offline JSON assets
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
  animationData,
  size = 180,
  width,
  height,
  playbackRate = 1.0,
  loop = true,
  accentColor,
  style,
}) => {
  const data = useMemo(() => {
    if (animationData) return animationData;
    return LOTTIE_PRESET_MAP[preset];
  }, [preset, animationData]);

  const targetWidth = width ?? size;
  const targetHeight = height ?? size;

  return (
    <div
      style={{
        width: targetWidth,
        height: targetHeight,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        filter: accentColor ? `drop-shadow(0 0 16px ${accentColor})` : undefined,
        ...style,
      }}
    >
      <Lottie
        animationData={data}
        playbackRate={playbackRate}
        loop={loop}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
