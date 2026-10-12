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
} from '../audio/UniversalSoundDirector';
import { TEMPLATE_CATALOG, TemplateId } from '../templates/TemplateCatalog';
import { StudioMeshGlassBackdrop } from '../library/StudioMeshGlassBackdrop';
import {
  ActHandoffTransition,
  TransitionArchetype,
} from '../transitions/DynamicTransitionSchema';
import {
  DynamicTransitionDirector,
  TransitionState,
} from '../transitions/DynamicTransitionDirector';

export interface ConstellationNodeItem {
  labelFa: string;
  valueFa?: string;
  symbol?: string;
}

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
  constellationNodes?: ConstellationNodeItem[];
  position?: { x: number; y: number; z: number };
  startFrame?: number;
  endFrame?: number;
  transitionOut?: ActHandoffTransition;
  customVisual?: React.ReactNode;
  customBottomRow?: React.ReactNode;
}

export interface UniversalCinematicStageProps {
  acts: StageAct[];
  themeId?: TemplateId;
  cameraMode?: CameraTrajectoryMode;
  bgmTrack?: string;
  voiceTrack?: string;
  bpm?: number;
}

export const UniversalCinematicStage: React.FC<UniversalCinematicStageProps> = ({
  acts,
  themeId = 'DARK_GRAPHITE_TECH',
  cameraMode = 'PANORAMIC_HORIZONTAL',
  bgmTrack = 'music/Tech_Live.mp3',
  voiceTrack,
  bpm = 124,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // 1. Resolve Theme Art Style (Pure Aesthetic Skin)
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

  // 3. Multi-Act Timing & 3D Coordinate Layout on Open Canvas
  const defaultActDuration = durationInFrames / Math.max(1, acts.length);
  const actSpacing = cameraMode === 'DEEP_Z_TUNNEL' ? 1200 : 1500;

  // Multi-Modal Transition Palette (Studio Alternating Guarantee)
  const DEFAULT_TRANSITIONS: ActHandoffTransition[] = useMemo(
    () => [
      {
        archetype: 'CAMERA_SPATIAL_FLIGHT',
        durationInFrames: 18,
        semanticMetaphorFa: 'پرواز افقی دوربین به سوی افق بعدی',
        cameraFlight: { trajectory: 'WHIP_PAN_RIGHT', bankingRollDegrees: 3.2, peakBlurPixels: 14 },
      },
      {
        archetype: 'ELEMENT_KINETIC_DISPERSE',
        durationInFrames: 20,
        semanticMetaphorFa: 'خروج شلاقی المان‌ها به چپ و ورود پاپ المان‌های جدید در سکون دوربین',
        elementDisperse: { direction: 'LEFT' },
      },
      {
        archetype: 'DEEP_Z_ZOOM_THROUGH',
        durationInFrames: 22,
        semanticMetaphorFa: 'زوم نفوذی در عمق و عبور از دیافراگم توکن به درون صحنه بعدی',
        deepZZoom: { penetrationDepthZ: 2200 },
      },
      {
        archetype: 'TOPOLOGICAL_ANCHOR_MORPH',
        durationInFrames: 20,
        semanticMetaphorFa: 'تحویل و مورف لنگرگاه مفهومی به هسته صحنه بعد',
      },
      {
        archetype: 'KINETIC_LIGHT_SWEEP',
        durationInFrames: 16,
        semanticMetaphorFa: 'برش فضایی با تیغه نوری و لرزش ضربه‌ای',
        kineticSlice: { hasRecoilShake: true },
      },
    ],
    []
  );

  const resolvedActs = useMemo(() => {
    return acts.map((act, index) => {
      const startFrame = act.startFrame ?? Math.floor(index * defaultActDuration);
      const endFrame = act.endFrame ?? Math.floor((index + 1) * defaultActDuration);
      const defaultX =
        cameraMode === 'DEEP_Z_TUNNEL' || cameraMode === 'VERTICAL_ELEVATOR'
          ? 0
          : index * actSpacing;
      const defaultY =
        cameraMode === 'VERTICAL_ELEVATOR'
          ? index * 1100
          : cameraMode === 'DIAGONAL_CASCADE'
          ? index * 680
          : 0;
      const defaultZ = cameraMode === 'DEEP_Z_TUNNEL' ? -index * actSpacing : 0;

      const posX = Math.round(act.position?.x ?? defaultX);
      const posY = Math.round(act.position?.y ?? defaultY);
      const posZ = Math.round(act.position?.z ?? defaultZ);

      // Multi-Modal Transition Guarantee: never repeat identical transition
      const transitionOut =
        act.transitionOut ?? DEFAULT_TRANSITIONS[index % DEFAULT_TRANSITIONS.length];

      return {
        ...act,
        startFrame,
        endFrame,
        posX,
        posY,
        posZ,
        transitionOut,
      };
    });
  }, [acts, defaultActDuration, cameraMode, actSpacing, DEFAULT_TRANSITIONS]);

  const cameraWaypoints = useMemo(() => {
    return resolvedActs.map((a) => ({
      startFrame: a.startFrame,
      endFrame: a.endFrame,
      x: a.posX,
      y: a.posY,
      z: -a.posZ,
      transitionType: a.transitionOut?.archetype,
    }));
  }, [resolvedActs]);

  // Compute Active Dynamic Transition State
  const transitionState = useMemo(() => {
    return DynamicTransitionDirector.computeTransitionState(frame, fps, resolvedActs);
  }, [frame, fps, resolvedActs]);

  // 4. Kinetic Emphasis Tokens Extraction
  const allEmphasisTokens = useMemo<EmphasisToken[]>(() => {
    const list: EmphasisToken[] = [];
    resolvedActs.forEach((act) => {
      const actStart = act.startFrame;
      const actLen = Math.max(60, act.endFrame - act.startFrame);
      if (act.emphasisTokens && act.emphasisTokens.length > 0) {
        act.emphasisTokens.forEach((text, tokenIdx) => {
          list.push({
            text,
            type: 'keyword',
            startFrame: actStart + 18 + tokenIdx * 42,
            durationInFrames: Math.min(95, Math.floor(actLen * 0.42)),
            position: tokenIdx % 2 === 0 ? 'bottom_center' : 'top_right',
            customColor: tokenIdx % 2 === 0 ? primaryAccent : secondaryAccent,
          });
        });
      }
    });
    return list;
  }, [resolvedActs, primaryAccent, secondaryAccent]);

  const heroFontSize = clampFontSize(54, 'heroTitle', width, height);
  const bodyFontSize = clampFontSize(26, 'body', width, height);

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
        {/* 1. UNIVERSAL SOUND DIRECTOR (CLEAN BGM & NARRATION - ZERO SFX) */}
        {/* ============================================================== */}
        <UniversalSoundDirector
          bgmTrack={bgmTrack}
          bgmVolume={0.14}
          voiceTrack={voiceTrack}
          themeId={themeId}
          duckingRanges={resolvedActs.map((a) => ({
            start: a.startFrame,
            end: a.endFrame,
            depth: 0.42,
          }))}
        />

        {/* ============================================================== */}
        {/* 2. THEME-SPECIFIC VOLUMETRIC BACKDROP (ZERO CORNER HUD CLUTTER)*/}
        {/* ============================================================== */}
        <StudioMeshGlassBackdrop
          primaryLightColor={primaryAccent}
          accentGlowColor={secondaryAccent}
        />

        {/* ============================================================== */}
        {/* 3. OPEN-CANVAS 3D WORLD & SPATIAL CONSTELLATION CHOREOGRAPHY   */}
        {/* ============================================================== */}
        <PersistentWorld contracts={[]} style={{ width: '100%', height: '100%' }}>
          <UniversalCameraRig
            mode={cameraMode}
            customWaypoints={cameraWaypoints}
            cameraOffset={transitionState.cameraOffset}
          >
            {resolvedActs.map((act, actIndex) => {
              const actStart = act.startFrame;
              const actEnd = act.endFrame;
              const isCurrentOrAdjacent = frame >= actStart - 35 && frame <= actEnd + 35;
              if (!isCurrentOrAdjacent) return null;

              const { posX, posY, posZ } = act;
              const localFrame = Math.max(0, frame - actStart);

              // Kinetic Agency Law: Evaluate per-act exit/enter dynamics
              const isExitingAct =
                transitionState.isTransitioning && transitionState.fromActId === act.actId;
              const isEnteringAct =
                transitionState.isTransitioning && transitionState.toActId === act.actId;

              const exitDisplacementX = isExitingAct ? transitionState.elementExit.offsetX : 0;
              const exitDisplacementY = isExitingAct ? transitionState.elementExit.offsetY : 0;
              const exitDisplacementZ = isExitingAct ? transitionState.elementExit.offsetZ : 0;
              const exitRotateZ = isExitingAct ? transitionState.elementExit.rotateZ : 0;
              const exitScale = isExitingAct ? transitionState.elementExit.scale : 1.0;
              const exitOpacityMultiplier = isExitingAct ? transitionState.elementExit.opacity : 1.0;

              const enterBoostScale =
                isEnteringAct &&
                transitionState.activeTransition?.archetype === 'ELEMENT_KINETIC_DISPERSE'
                  ? interpolate(transitionState.progress, [0.4, 1], [0.85, 1.0], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    })
                  : 1.0;

              const combinedScale = exitScale * enterBoostScale;

              // Independent staggered springs for each atomic open-canvas child!
              const visualSpring = spring({
                frame: localFrame,
                fps,
                config: { damping: 13, stiffness: 120, mass: 1.0 },
              });
              const badgeSpring = spring({
                frame: Math.max(0, localFrame - 6),
                fps,
                config: { damping: 15, stiffness: 140, mass: 0.7 },
              });
              const descSpring = spring({
                frame: Math.max(0, localFrame - 18),
                fps,
                config: { damping: 16, stiffness: 115, mass: 0.85 },
              });
              const metricSpring = spring({
                frame: Math.max(0, localFrame - 26),
                fps,
                config: { damping: 12, stiffness: 130, mass: 0.9 },
              });
              const bottomRowSpring = spring({
                frame: Math.max(0, localFrame - 32),
                fps,
                config: { damping: 14, stiffness: 110, mass: 0.95 },
              });

              // Continuous life-cycle micro-motion (Middle 60% never static)
              const floatY = Math.round(Math.sin((frame + actIndex * 25) * 0.065) * 10);
              const counterFloatY = Math.round(Math.cos((frame + actIndex * 19) * 0.055) * 7);
              const breathingScale = 1.0 + beatPulse * 0.014;

              // SVG Constellation Conduit drawing progress
              const conduitDraw = interpolate(
                localFrame,
                [4, 38],
                [600, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              // Smooth open-canvas exit dispersion
              const actOpacity = interpolate(
                frame,
                [actStart - 14, actStart + 10, actEnd - 12, actEnd + 14],
                [0, 1, 1, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              const finalOpacity = actOpacity * exitOpacityMultiplier;

              // Deconstruct headline into staggered kinetic segments
              const titleWords = sanitizeForDisplay(act.titleFa).split(' ');
              const midPoint = Math.ceil(titleWords.length / 2);
              const titlePhrases = [
                titleWords.slice(0, midPoint).join(' '),
                titleWords.slice(midPoint).join(' '),
              ].filter(Boolean);

              return (
                <div
                  key={act.actId}
                  style={{
                    position: 'absolute',
                    transform: `translate3d(${Math.round(posX + exitDisplacementX)}px, ${Math.round(posY + exitDisplacementY)}px, ${Math.round(posZ + exitDisplacementZ)}px) rotateZ(${exitRotateZ}deg) scale(${combinedScale})`,
                    opacity: finalOpacity,
                    filter:
                      isExitingAct && transitionState.motionBlurPx > 0
                        ? `blur(${transitionState.motionBlurPx}px)`
                        : undefined,
                    width: Math.round(width * 0.82),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased',
                  }}
                >
                  {/* VOLUMETRIC LIGHT POOL ON OPEN CANVAS (NO RECTANGULAR BOX) */}
                  <div
                    style={{
                      position: 'absolute',
                      width: 920,
                      height: 520,
                      background: `radial-gradient(ellipse at center, ${primaryAccent}22 0%, ${secondaryAccent}0d 45%, transparent 75%)`,
                      pointerEvents: 'none',
                      transform: `scale(${breathingScale})`,
                    }}
                  />

                  {/* SVG SPATIAL CONSTELLATION CONDUIT LINKING VISUAL & TYPOGRAPHY */}
                  <svg
                    width={1360}
                    height={460}
                    viewBox="0 0 1360 460"
                    style={{
                      position: 'absolute',
                      top: -20,
                      left: 0,
                      pointerEvents: 'none',
                      overflow: 'visible',
                    }}
                  >
                    <path
                      d="M 240 210 C 480 90, 740 310, 1080 190"
                      fill="none"
                      stroke={primaryAccent}
                      strokeWidth={2.5}
                      strokeDasharray={600}
                      strokeDashoffset={Math.round(conduitDraw)}
                      strokeOpacity={0.45}
                    />
                    <circle
                      cx={240}
                      cy={210}
                      r={Math.round(6 + beatPulse * 4)}
                      fill={primaryAccent}
                      opacity={0.75}
                    />
                    <circle
                      cx={1080}
                      cy={190}
                      r={Math.round(6 + beatPulse * 4)}
                      fill={secondaryAccent}
                      opacity={0.75}
                    />
                  </svg>

                  {/* OPEN-CANVAS SPATIAL CLUSTER (DECONSTRUCTED CHILDREN) */}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 64,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {/* 1. INDEPENDENT KINETIC TYPOGRAPHY STREAM */}
                    <div style={{ flex: 1, textAlign: 'right', direction: 'rtl' }}>
                      {/* STAGGERED FLOATING BADGE */}
                      {act.badgeFa && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '6px 20px',
                            borderRadius: 999,
                            background: `${primaryAccent}1f`,
                            marginBottom: 20,
                            transform: `translate3d(0px, ${Math.round((1 - badgeSpring) * 24)}px, 0px) scale(${badgeSpring})`,
                            opacity: badgeSpring,
                          }}
                        >
                          <span
                            style={{
                              width: 9,
                              height: 9,
                              borderRadius: '50%',
                              backgroundColor: primaryAccent,
                              boxShadow: `0 0 12px ${primaryAccent}`,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 800,
                              color: primaryAccent,
                            }}
                          >
                            {sanitizeForDisplay(act.badgeFa)}
                          </span>
                        </div>
                      )}

                      {/* PHRASE-STAGGERED OPEN-CANVAS HERO HEADLINE */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {titlePhrases.map((phrase, phraseIdx) => {
                          const phraseSpring = spring({
                            frame: Math.max(0, localFrame - (8 + phraseIdx * 6)),
                            fps,
                            config: { damping: 14, stiffness: 135, mass: 0.8 },
                          });
                          const phraseY = Math.round((1 - phraseSpring) * 36);
                          return (
                            <h1
                              key={phraseIdx}
                              style={{
                                margin: 0,
                                fontSize: heroFontSize,
                                fontWeight: 900,
                                color: '#ffffff',
                                lineHeight: 1.32,
                                transform: `translate3d(0px, ${phraseY}px, 0px) scale(${phraseSpring})`,
                                opacity: phraseSpring,
                                textShadow: `0 8px 32px rgba(0,0,0,0.9), 0 0 28px ${primaryAccent}44`,
                              }}
                            >
                              {phrase}
                            </h1>
                          );
                        })}
                      </div>

                      {/* INDEPENDENT KINETIC DESCRIPTION */}
                      <p
                        style={{
                          margin: '20px 0 0 0',
                          fontSize: bodyFontSize,
                          fontWeight: 600,
                          color: '#e2e8f0',
                          lineHeight: 1.65,
                          transform: `translate3d(0px, ${Math.round((1 - descSpring) * 28)}px, 0px)`,
                          opacity: descSpring,
                          textShadow: '0 4px 18px rgba(0,0,0,0.85)',
                        }}
                      >
                        {sanitizeForDisplay(act.descriptionFa)}
                      </p>

                      {/* INDEPENDENT FLOATING METRIC CONSTELLATION NODE */}
                      {act.metricValue && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'baseline',
                            gap: 16,
                            marginTop: 26,
                            transform: `translate3d(0px, ${Math.round((1 - metricSpring) * 32 + counterFloatY)}px, 0px) scale(${metricSpring * breathingScale})`,
                            opacity: metricSpring,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 56,
                              fontWeight: 900,
                              color: secondaryAccent,
                              textShadow: `0 0 28px ${secondaryAccent}66`,
                            }}
                          >
                            {act.metricValue}
                          </span>
                          <span
                            style={{
                              fontSize: 22,
                              fontWeight: 800,
                              color: '#f8fafc',
                              textShadow: '0 4px 16px rgba(0,0,0,0.85)',
                            }}
                          >
                            {sanitizeForDisplay(act.metricLabelFa || '')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 2. INDEPENDENT SCULPTURAL HERO VISUAL & SVG ORBITAL RING */}
                    <div
                      style={{
                        width: 340,
                        height: 340,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        position: 'relative',
                        transform: `translate3d(0px, ${Math.round((1 - visualSpring) * -42 + floatY)}px, 0px) scale(${visualSpring * breathingScale})`,
                        opacity: visualSpring,
                      }}
                    >
                      {/* Animated SVG Orbital Constellation Ring */}
                      <svg
                        width={340}
                        height={340}
                        viewBox="0 0 340 340"
                        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
                      >
                        <circle
                          cx={170}
                          cy={170}
                          r={148}
                          fill="none"
                          stroke={primaryAccent}
                          strokeWidth={2.5}
                          strokeDasharray="18 14"
                          strokeDashoffset={Math.round(-frame * 1.8)}
                          strokeOpacity={0.55}
                        />
                        <circle
                          cx={170}
                          cy={170}
                          r={124}
                          fill="none"
                          stroke={secondaryAccent}
                          strokeWidth={3}
                          strokeDasharray={780}
                          strokeDashoffset={Math.round(780 * (1 - visualSpring))}
                          strokeOpacity={0.75}
                        />
                      </svg>

                      {act.customVisual ? (
                        act.customVisual
                      ) : act.lottiePreset ? (
                        <LottieGraphic
                          preset={act.lottiePreset}
                          size={250}
                          accentColor={primaryAccent}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: 112,
                            filter: `drop-shadow(0 12px 28px ${primaryAccent}66)`,
                          }}
                        >
                          {act.heroSymbol || '⚡'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 3. STAGGERED CONSTELLATION SUB-NODES ON OPEN CANVAS */}
                  {act.constellationNodes && act.constellationNodes.length > 0 && (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: 42,
                        direction: 'rtl',
                        position: 'relative',
                      }}
                    >
                      {act.constellationNodes.map((node, nodeIdx) => {
                        const nodeSpring = spring({
                          frame: Math.max(0, localFrame - (24 + nodeIdx * 10)),
                          fps,
                          config: { damping: 13, stiffness: 125, mass: 0.85 },
                        });
                        const nodeFloat = Math.round(
                          Math.sin((frame + nodeIdx * 18) * 0.07) * 6
                        );
                        return (
                          <div
                            key={nodeIdx}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 8,
                              transform: `translate3d(0px, ${Math.round((1 - nodeSpring) * 35 + nodeFloat)}px, 0px) scale(${nodeSpring})`,
                              opacity: nodeSpring,
                            }}
                          >
                            {node.symbol && (
                              <span style={{ fontSize: 42 }}>{node.symbol}</span>
                            )}
                            {node.valueFa && (
                              <span
                                style={{
                                  fontSize: 34,
                                  fontWeight: 900,
                                  color: primaryAccent,
                                  textShadow: `0 0 20px ${primaryAccent}55`,
                                }}
                              >
                                {sanitizeForDisplay(node.valueFa)}
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: 20,
                                fontWeight: 800,
                                color: '#f8fafc',
                                textShadow: '0 4px 14px rgba(0,0,0,0.85)',
                              }}
                            >
                              {sanitizeForDisplay(node.labelFa)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* OPTIONAL BESPOKE OPEN-CANVAS ROW */}
                  {act.customBottomRow && (
                    <div
                      style={{
                        width: '100%',
                        marginTop: 32,
                        direction: 'rtl',
                        transform: `translate3d(0px, ${Math.round((1 - bottomRowSpring) * 30)}px, 0px) scale(${bottomRowSpring})`,
                        opacity: bottomRowSpring,
                      }}
                    >
                      {act.customBottomRow}
                    </div>
                  )}
                </div>
              );
            })}
          </UniversalCameraRig>
        </PersistentWorld>

      </div>
    </CinematicRhythmContext.Provider>
  );
};
