import React, { useMemo } from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import {
  UniversalCameraRig,
  CameraTrajectoryMode,
} from '../camera/UniversalCameraRig';
import { PersistentWorld } from '../grammar/PersistentWorld';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { clampFontSize } from '../../typography/responsiveTypography';
import {
  KineticEmphasisCallout,
  EmphasisToken,
} from '../../typography/KineticEmphasisCallout';
import { LottieGraphic, LottiePreset } from '../assets/LottieGraphic';
import {
  CinematicRhythmContext,
  CinematicRhythmState,
} from './CinematicRhythmContext';
import {
  UniversalSoundDirector,
  SfxCue,
} from '../audio/UniversalSoundDirector';
import { TEMPLATE_CATALOG, TemplateId } from '../templates/TemplateCatalog';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';

export interface StageAct {
  actId: string;
  badgeFa?: string;
  titleFa: string;
  descriptionFa: string;
  metricValue?: string;
  metricLabelFa?: string;
  heroSymbol?: string;
  lottiePreset?: LottiePreset;
  emphasisTokens?: string[];
  position?: { x: number; y: number; z: number };
}

export interface UniversalCinematicStageProps {
  acts: StageAct[];
  themeId?: TemplateId;
  cameraMode?: CameraTrajectoryMode;
  bgmTrack?: string;
  voiceTrack?: string;
  bpm?: number;
  customSfxCues?: SfxCue[];
}

export const UniversalCinematicStage: React.FC<UniversalCinematicStageProps> = ({
  acts,
  themeId = 'DARK_GRAPHITE_TECH',
  cameraMode = 'PANORAMIC_HORIZONTAL',
  bgmTrack = 'music/Tech_Live.mp3',
  voiceTrack,
  bpm = 124,
  customSfxCues,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // 1. Resolve Theme Art Style
  const theme = TEMPLATE_CATALOG[themeId] || TEMPLATE_CATALOG['DARK_GRAPHITE_TECH'];
  const primaryAccent = theme.accentColors?.[0] || '#06b6d4';
  const secondaryAccent = theme.accentColors?.[1] || '#3b82f6';

  // 2. Continuous Beat-Pulse Engine
  const pulseResult = calculateBeatPulse(frame, bpm, fps);
  const beatPulse = pulseResult.lightPulse;
  const beatFrames = (60 / bpm) * fps;
  const beatProgress = (frame % beatFrames) / beatFrames;
  const isDownbeat = beatProgress < 0.15;

  const rhythmState: CinematicRhythmState = {
    frame,
    fps,
    bpm,
    beatPulse,
    beatProgress,
    isDownbeat,
    themeId,
  };

  // 3. Multi-Act Timing & Coordinate Layout
  const actDuration = durationInFrames / Math.max(1, acts.length);
  const actSpacing = cameraMode === 'DEEP_Z_TUNNEL' ? 1200 : 1400;

  // 4. Automated Universal SFX Scheduling
  const autoSfxCues = useMemo<SfxCue[]>(() => {
    if (customSfxCues) return customSfxCues;
    const cues: SfxCue[] = [];

    acts.forEach((_, idx) => {
      const actStart = Math.floor(idx * actDuration);
      if (idx > 0) {
        // Pre-roll whoosh 4 frames before camera transit starts
        cues.push({ frame: Math.max(0, actStart - 4), type: 'whoosh', volume: 0.55 });
      }
      // Tactical impact when the act's card and hero land
      cues.push({ frame: actStart + 8, type: 'impact', volume: 0.6 });
      // Tactical click when emphasis tokens pop in
      cues.push({ frame: actStart + 22, type: 'click', volume: 0.35 });
    });

    // Riser sound 45 frames before final climax act
    if (acts.length >= 3) {
      const climaxStart = Math.floor((acts.length - 1) * actDuration);
      cues.push({ frame: Math.max(0, climaxStart - 35), type: 'riser', volume: 0.7 });
    }

    return cues;
  }, [acts, actDuration, customSfxCues]);

  // 5. Kinetic Emphasis Tokens Extraction
  const allEmphasisTokens = useMemo<EmphasisToken[]>(() => {
    const list: EmphasisToken[] = [];
    acts.forEach((act, idx) => {
      const actStart = Math.floor(idx * actDuration);
      if (act.emphasisTokens && act.emphasisTokens.length > 0) {
        act.emphasisTokens.forEach((text, tokenIdx) => {
          list.push({
            text,
            type: 'keyword',
            startFrame: actStart + 16 + tokenIdx * 18,
            durationInFrames: Math.floor(actDuration * 0.75),
            position: tokenIdx === 0 ? 'bottom_center' : 'top_right',
            customColor: primaryAccent,
          });
        });
      }
    });
    return list;
  }, [acts, actDuration, primaryAccent]);

  // Safe typography clamps
  const heroFontSize = clampFontSize(92, 'heroTitle', width, height);
  const bodyFontSize = clampFontSize(32, 'body', width, height);

  return (
    <CinematicRhythmContext.Provider value={rhythmState}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#070a14',
          color: '#ffffff',
          fontFamily: YEKAN_BAKH_FONT,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* ============================================================== */}
        {/* 1. UNIVERSAL SOUND DIRECTOR (AUDIO STEMS & AUTO SFX)            */}
        {/* ============================================================== */}
        <UniversalSoundDirector
          bgmTrack={bgmTrack}
          bgmVolume={0.18}
          voiceTrack={voiceTrack}
          sfxCues={autoSfxCues}
          duckingRanges={acts.map((_, i) => ({
            start: Math.floor(i * actDuration),
            end: Math.floor((i + 1) * actDuration),
            depth: 0.45,
          }))}
        />

        {/* ============================================================== */}
        {/* 2. THEME-SPECIFIC AESTHETIC BACKDROP                           */}
        {/* ============================================================== */}
        <StudioMeshGlassBackdrop
          primaryLightColor={primaryAccent}
          accentGlowColor={secondaryAccent}
        />

        {/* ============================================================== */}
        {/* 3. PERSISTENT 2.5D WORLD WITH ZERO-JITTER CAMERA RIG          */}
        {/* ============================================================== */}
        <PersistentWorld contracts={[]} style={{ width: '100%', height: '100%' }}>
          <UniversalCameraRig mode={cameraMode}>
            {acts.map((act, index) => {
              const actStart = Math.floor(index * actDuration);
              const actEnd = Math.floor((index + 1) * actDuration);
              const isCurrentOrAdjacent = frame >= actStart - 30 && frame <= actEnd + 30;
              if (!isCurrentOrAdjacent) return null;

              // Spatial positioning with integer snapping (Zero Subpixel Jitter)
              const posX = act.position?.x ?? Math.round(cameraMode === 'DEEP_Z_TUNNEL' ? 0 : index * actSpacing);
              const posY = act.position?.y ?? 0;
              const posZ = act.position?.z ?? Math.round(cameraMode === 'DEEP_Z_TUNNEL' ? index * actSpacing : 0);

              // Damped physical entrance spring
              const actSpring = spring({
                frame: Math.max(0, frame - actStart),
                fps,
                config: { damping: 15, stiffness: 110, mass: 0.9 },
              });

              // Momentum handoff directional fade
              const actOpacity = interpolate(
                frame,
                [actStart - 10, actStart + 15, actEnd - 15, actEnd + 5],
                [0, 1, 1, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              // Rhythmic breathing scale
              const breathingScale = 1.0 + beatPulse * 0.015;

              return (
                <div
                  key={act.actId}
                  style={{
                    position: 'absolute',
                    transform: `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, ${Math.round(posZ)}px) scale(${actSpring * breathingScale})`,
                    opacity: actOpacity,
                    width: Math.round(width * 0.72),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased',
                  }}
                >
                  {/* HERO CONTAINER */}
                  <div
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(9, 14, 26, 0.94) 100%)',
                      borderRadius: 32,
                      border: `1.5px solid ${primaryAccent}44`,
                      boxShadow: `0 25px 60px rgba(0, 0, 0, 0.7), 0 0 ${Math.round(30 + beatPulse * 20)}px ${primaryAccent}22`,
                      padding: '48px 64px',
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 48,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* TEXT CONTENT COLUMN */}
                    <div style={{ flex: 1, textAlign: 'right', direction: 'rtl' }}>
                      {/* STATUS BADGE */}
                      {act.badgeFa && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '8px 20px',
                            borderRadius: 999,
                            background: `${primaryAccent}18`,
                            border: `1px solid ${primaryAccent}55`,
                            marginBottom: 20,
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: primaryAccent,
                              boxShadow: `0 0 10px ${primaryAccent}`,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 800,
                              color: primaryAccent,
                              letterSpacing: '0.02em',
                            }}
                          >
                            {sanitizeForDisplay(act.badgeFa)}
                          </span>
                        </div>
                      )}

                      {/* HERO HEADLINE */}
                      <h1
                        style={{
                          margin: 0,
                          fontSize: heroFontSize,
                          fontWeight: 900,
                          color: '#ffffff',
                          lineHeight: 1.25,
                          textShadow: `0 4px 20px rgba(0,0,0,0.8), 0 0 25px ${primaryAccent}33`,
                        }}
                      >
                        {sanitizeForDisplay(act.titleFa)}
                      </h1>

                      {/* BODY COPY */}
                      <p
                        style={{
                          margin: '22px 0 0 0',
                          fontSize: bodyFontSize,
                          fontWeight: 500,
                          color: '#94a3b8',
                          lineHeight: 1.55,
                        }}
                      >
                        {sanitizeForDisplay(act.descriptionFa)}
                      </p>

                      {/* NUMERICAL METRIC CALLOUT */}
                      {act.metricValue && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'baseline',
                            gap: 14,
                            marginTop: 24,
                            padding: '12px 24px',
                            borderRadius: 16,
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: `1px solid ${secondaryAccent}33`,
                          }}
                        >
                          <span style={{ fontSize: 44, fontWeight: 900, color: secondaryAccent }}>
                            {act.metricValue}
                          </span>
                          <span style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0' }}>
                            {sanitizeForDisplay(act.metricLabelFa || '')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* HERO VECTOR / LOTTIE COLUMN */}
                    <div
                      style={{
                        width: 320,
                        height: 320,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `radial-gradient(circle, ${primaryAccent}15 0%, transparent 70%)`,
                        borderRadius: '50%',
                        border: `1px solid ${primaryAccent}22`,
                        flexShrink: 0,
                      }}
                    >
                      {act.lottiePreset ? (
                        <LottieGraphic
                          preset={act.lottiePreset}
                          size={280}
                          accentColor={primaryAccent}
                        />
                      ) : (
                        <span style={{ fontSize: 110 }}>{act.heroSymbol || '⚡'}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </UniversalCameraRig>
        </PersistentWorld>

        {/* ============================================================== */}
        {/* 4. TOP-LEVEL KINETIC EMPHASIS CALLOUT OVERLAY                 */}
        {/* ============================================================== */}
        {allEmphasisTokens.map((token, i) => (
          <KineticEmphasisCallout
            key={`${token.text}-${i}`}
            token={token}
            templateId={themeId}
            bpm={bpm}
          />
        ))}

        {/* ============================================================== */}
        {/* 5. FOOTER TIMELINE HUD                                         */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#64748b',
            fontSize: 16,
            fontWeight: 700,
            borderTop: `1px solid ${primaryAccent}22`,
            paddingTop: 14,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: primaryAccent }}>●</span>
            <span>{sanitizeForDisplay(`سیستم موشن گرافیک سینمایی // تم: ${theme.titleFa}`)}</span>
          </div>
          <div>
            <span>
              {Math.floor(frame / fps)}s / {Math.floor(durationInFrames / fps)}s
            </span>
          </div>
        </div>
      </div>
    </CinematicRhythmContext.Provider>
  );
};
