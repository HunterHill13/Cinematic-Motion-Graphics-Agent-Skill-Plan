/**
 * ============================================================================
 * UNIVERSAL CINEMATIC STORY SCENE (CANONICAL PRODUCTION BOILERPLATE)
 * ============================================================================
 * 
 * Gold-standard reference composition demonstrating the complete, mandatory
 * wiring of all cinematic capabilities:
 * 1. Persistent 2.5D World (No sequence cutting or empty-screen redraws).
 * 2. 6-DOF Multi-Trajectory Camera Rig (Panoramic, Elevator, Cascade, Deep-Z).
 * 3. Multi-Act Spatial Coordinates (Acts placed at distinct spatial stations).
 * 4. Kinetic Emphasis Callouts (Hybrid keyword & numerical milestone pops).
 * 5. Offline Lottie Vector Assets (Theme-tinted hardware-accelerated vectors).
 * 6. Cinematic Act Transitions (Slide, wipe, fade, or continuous momentum).
 * 7. Beat-Quantized Sound Design & Harmonic Music Pulses.
 * ============================================================================
 */

import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { PersistentWorld } from '../grammar/PersistentWorld';
import { UniversalCameraRig, CameraTrajectoryMode } from '../camera/UniversalCameraRig';
import { KineticEmphasisCallout, extractEmphasisTokens, EmphasisToken } from '../../typography/KineticEmphasisCallout';
import { LottieGraphic, LottiePreset } from '../assets/LottieGraphic';
import { TEMPLATE_CATALOG, TemplateId } from './TemplateCatalog';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { LEGIBILITY_FLOORS_16_9 } from '../../typography/responsiveTypography';

export interface StoryAct {
  actId: string;
  titleFa: string;
  descriptionFa: string;
  heroSymbol: string;
  lottiePreset: LottiePreset;
  emphasisWord?: string;
  metricBadge?: string;
  startFrame: number;
  endFrame: number;
  position: { x: number; y: number; z: number };
}

export interface UniversalCinematicStorySceneProps {
  templateId?: TemplateId;
  cameraMode?: CameraTrajectoryMode;
  scriptText?: string;
  acts?: StoryAct[];
  bpm?: number;
}

export const UniversalCinematicStoryScene: React.FC<UniversalCinematicStorySceneProps> = ({
  templateId = 'DARK_GRAPHITE_TECH',
  cameraMode = 'PANORAMIC_HORIZONTAL',
  scriptText = 'در دنیای پرشتاب فناوری، **هوش مصنوعی** سرعت تحلیل داده را بیش از ۱۰ برابر کرده است. این تحول با دقت ۹۹.۹٪ آینده را می‌سازد.',
  acts: customActs,
  bpm = 150,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const template = TEMPLATE_CATALOG[templateId] ?? TEMPLATE_CATALOG.DARK_GRAPHITE_TECH;
  const primaryAccent = template.accentColors[0] ?? '#06b6d4';
  const secondaryAccent = template.accentColors[1] ?? '#10b981';

  // 1. Multi-Act Spatial Blueprint (Default 4-Act Trajectory Layout)
  const acts: StoryAct[] = useMemo(() => {
    if (customActs && customActs.length > 0) return customActs;

    const actLen = Math.floor(durationInFrames / 4);
    return [
      {
        actId: 'act1_hook',
        titleFa: 'مسئله و چالش آغازین',
        descriptionFa: 'حجم عظیم داده‌ها و ضرورت اتوماسیون هوشمند',
        heroSymbol: '⚡',
        lottiePreset: 'tech_ai_core',
        emphasisWord: 'چالش داده‌ها',
        metricBadge: 'STATION 01 // HOOK',
        startFrame: 0,
        endFrame: actLen,
        position: cameraMode === 'DEEP_Z_TUNNEL' ? { x: 0, y: 0, z: 0 } : { x: 0, y: 0, z: 0 },
      },
      {
        actId: 'act2_mechanism',
        titleFa: 'مکانیسم و موتور پردازش',
        descriptionFa: 'معماری چندعاملی و اتصال مستقیم ابزارها',
        heroSymbol: '🧬',
        lottiePreset: 'bio_helix_pulse',
        emphasisWord: 'هوش مصنوعی',
        metricBadge: 'STATION 02 // ENGINE',
        startFrame: actLen,
        endFrame: actLen * 2,
        position: cameraMode === 'DEEP_Z_TUNNEL' ? { x: 0, y: 0, z: 1200 } : { x: 1400, y: 0, z: 0 },
      },
      {
        actId: 'act3_proof',
        titleFa: 'جهش عملکردی و اثبات آماری',
        descriptionFa: 'افزایش ۱۰ برابری بهره‌وری و حذف خطاهای انسانی',
        heroSymbol: '📈',
        lottiePreset: 'fintech_growth_chart',
        emphasisWord: '۱۰ برابر',
        metricBadge: 'STATION 03 // CLIMAX',
        startFrame: actLen * 2,
        endFrame: actLen * 3,
        position: cameraMode === 'DEEP_Z_TUNNEL' ? { x: 0, y: 0, z: 2400 } : { x: 2800, y: 0, z: 0 },
      },
      {
        actId: 'act4_vision',
        titleFa: 'چشم‌انداز و آینده پایدار',
        descriptionFa: 'دستیابی به استاندارد طلایی دقت و نوآوری',
        heroSymbol: '✓',
        lottiePreset: 'ui_check_confirm',
        emphasisWord: '۹۹.۹٪ دقت',
        metricBadge: 'STATION 04 // VISION',
        startFrame: actLen * 3,
        endFrame: durationInFrames,
        position: cameraMode === 'DEEP_Z_TUNNEL' ? { x: 0, y: 0, z: 3600 } : { x: 4200, y: 0, z: 0 },
      },
    ];
  }, [customActs, durationInFrames, cameraMode]);

  // 2. Extract Emphasis Tokens from script for popup callouts
  const emphasisTokens: EmphasisToken[] = useMemo(() => {
    return extractEmphasisTokens(scriptText, durationInFrames);
  }, [scriptText, durationInFrames]);

  // 3. Audio Beat-Reactive Breathing
  const { scalePulse, lightPulse } = calculateBeatPulse(frame, bpm, 30, 0.015);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#090D16',
        color: '#ffffff',
        fontFamily: YEKAN_BAKH_FONT,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* PERSISTENT 2.5D WORLD WITH 6-DOF CAMERA RIG */}
      <PersistentWorld
        contracts={[]}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <UniversalCameraRig
          mode={cameraMode}
          customTrackLength={cameraMode === 'DEEP_Z_TUNNEL' ? 3600 : 4200}
        >
          {/* NARRATIVE ACTS DISTRIBUTED IN 3D COORDINATE SPACE */}
          {acts.map((act, index) => {
            const isNearCamera =
              cameraMode === 'DEEP_Z_TUNNEL'
                ? true
                : Math.abs(act.position.x - interpolate(frame, [0, durationInFrames], [0, 4200], { extrapolateRight: 'clamp' })) < 1800;

            if (!isNearCamera) return null;

            return (
              <div
                key={act.actId}
                style={{
                  position: 'absolute',
                  left: 960 + act.position.x - 690, // Centered Golden Mean card (1380px width)
                  top: 540 + act.position.y - 345,  // Centered Golden Mean card (690px height)
                  transform: `translateZ(${-act.position.z}px) scale(${scalePulse})`,
                  width: 1380,
                  height: 690,
                  borderRadius: 24,
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  border: `1.5px solid ${primaryAccent}44`,
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 ${40 * lightPulse}px ${primaryAccent}33`,
                  backdropFilter: 'blur(16px)',
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '50px 70px',
                  boxSizing: 'border-box',
                  direction: 'rtl',
                }}
              >
                {/* Right Side: Typography & Metadata */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Status Badge Pill */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      alignSelf: 'flex-start',
                      backgroundColor: `${primaryAccent}22`,
                      border: `1px solid ${primaryAccent}66`,
                      borderRadius: 8,
                      padding: '4px 14px',
                      fontSize: LEGIBILITY_FLOORS_16_9.microTelemetry,
                      color: primaryAccent,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                    }}
                  >
                    <span>{act.heroSymbol}</span>
                    <span>{act.metricBadge}</span>
                  </div>

                  {/* Hero Title */}
                  <h1
                    style={{
                      margin: 0,
                      fontSize: LEGIBILITY_FLOORS_16_9.heroTitle * 1.35, // ~48px
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1.25,
                    }}
                  >
                    {act.titleFa}
                  </h1>

                  {/* Body Description */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: LEGIBILITY_FLOORS_16_9.body * 1.3, // ~21px
                      color: '#94a3b8',
                      lineHeight: 1.7,
                      maxWidth: 620,
                    }}
                  >
                    {act.descriptionFa}
                  </p>

                  {/* Act Progress Ticker */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                    <div
                      style={{
                        width: 140,
                        height: 6,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${((index + 1) / acts.length) * 100}%`,
                          height: '100%',
                          backgroundColor: secondaryAccent,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 13, color: '#64748b', fontFamily: 'monospace' }}>
                      ACT 0{index + 1} / 0{acts.length}
                    </span>
                  </div>
                </div>

                {/* Left Side: Animated Lottie Vector Graphics */}
                <div
                  style={{
                    width: 380,
                    height: 380,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `radial-gradient(circle, ${primaryAccent}15 0%, transparent 70%)`,
                    borderRadius: '50%',
                    border: `1px solid ${primaryAccent}22`,
                  }}
                >
                  <LottieGraphic
                    preset={act.lottiePreset}
                    size={280}
                    accentColor={primaryAccent}
                  />
                </div>
              </div>
            );
          })}
        </UniversalCameraRig>
      </PersistentWorld>

      {/* TOP-LEVEL KINETIC EMPHASIS CALLOUT OVERLAY */}
      {emphasisTokens.map((token, i) => (
        <KineticEmphasisCallout
          key={`${token.text}-${i}`}
          token={token}
          templateId={templateId}
          bpm={bpm}
        />
      ))}

      {/* FOOTER TIMELINE HUD */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 48,
          right: 48,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 13,
          color: 'rgba(255, 255, 255, 0.45)',
          fontFamily: 'monospace',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: 12,
        }}
      >
        <span>STYLE: {template.titleEn.toUpperCase()}</span>
        <span>CAMERA: {cameraMode}</span>
        <span>TEMPO: {bpm} BPM</span>
        <span>FRAME: {frame} / {durationInFrames}</span>
      </div>
    </div>
  );
};
