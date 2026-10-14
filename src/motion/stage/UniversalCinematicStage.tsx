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
import { sanitizeForDisplay, splitPersianPhrasesLinguistically } from '../../typography/persianSanitizer';
import { clampFontSize } from '../../typography/responsiveTypography';
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
  ActLayoutVariant,
  TextRevealMode,
} from '../transitions/DynamicTransitionSchema';
import {
  DynamicTransitionDirector,
  computeChainedActPositions,
  computeChildTransitionStyle,
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
  layoutVariant?: ActLayoutVariant;
  textRevealMode?: TextRevealMode;
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
  const rawFrame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Tactile Stop-Motion Posterization (15fps stepped feel when STOP_MOTION_PAPER is active)
  const isStopMotion = themeId === 'STOP_MOTION_PAPER';
  const isBlueprint = themeId === 'TECHNICAL_BLUEPRINT';
  const isBrutalist = themeId === 'NEO_BRUTALIST';
  const isFinTech = themeId === 'FINTECH_TRADING';
  const isQuantumBio = themeId === 'QUANTUM_BIO_DEEP_Z';
  const isArchTypo = themeId === 'KINETIC_ARCHITECTURAL_TYPO';

  const frame = isStopMotion ? Math.floor(rawFrame / 2) * 2 : rawFrame;

  // 1. Resolve Theme Art Style (Pure Aesthetic Skin + Bespoke Surface Vocabulary)
  const theme = TEMPLATE_CATALOG[themeId] || TEMPLATE_CATALOG['DARK_GRAPHITE_TECH'];
  const primaryAccent = theme.accentColors?.[0] || '#06b6d4';
  const secondaryAccent = theme.accentColors?.[1] || '#3b82f6';

  const stageBgColor = isStopMotion
    ? '#2B2623'
    : isBlueprint
    ? '#0A192F'
    : isBrutalist
    ? '#FACC15'
    : '#070a14';

  const primaryTextColor = isBrutalist ? '#09090B' : '#FFFFFF';
  const secondaryTextColor = isBrutalist
    ? '#18181B'
    : isStopMotion
    ? '#F5F2EB'
    : '#E2E8F0';

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

  // 3. Multi-Modal Transition Palette (Heterogeneous 5-Archetype Studio Sequence)
  const defaultActDuration = durationInFrames / Math.max(1, acts.length);

  const DEFAULT_TRANSITIONS: ActHandoffTransition[] = useMemo(
    () => [
      {
        archetype: 'CAMERA_SPATIAL_FLIGHT',
        durationInFrames: 22,
        semanticMetaphorFa: 'پرواز افقی دوربین به سوی صحنه بعدی با دید همزمان دو صحنه',
        cameraFlight: { trajectory: 'WHIP_PAN_RIGHT', bankingRollDegrees: 3.2, peakBlurPixels: 8 },
      },
      {
        archetype: 'ELEMENT_KINETIC_DISPERSE',
        durationInFrames: 20,
        semanticMetaphorFa: 'خروج شلاقی تک‌تک المان‌ها به چپ و پاپ فنری المان‌های جدید در سکون کامل دوربین',
        elementDisperse: { direction: 'LEFT' },
      },
      {
        archetype: 'DEEP_Z_ZOOM_THROUGH',
        durationInFrames: 22,
        semanticMetaphorFa: 'زوم نفوذی در عمق محور Z و عبور از دیافراگم صحنه به درون فضای بعدی',
        deepZZoom: { penetrationDepthZ: 1600 },
      },
      {
        archetype: 'TOPOLOGICAL_ANCHOR_MORPH',
        durationInFrames: 20,
        semanticMetaphorFa: 'چرخش سه‌بعدی و مورف هسته بصری در سکون دوربین',
      },
      {
        archetype: 'KINETIC_LIGHT_SWEEP',
        durationInFrames: 18,
        semanticMetaphorFa: 'برش نوری لیزری روی بوم باز همراه با ضربه انرژی',
        kineticSlice: { hasRecoilShake: true },
      },
    ],
    []
  );

  // 4. Transition-Chained 3D Spatial Coordinates (`computeChainedActPositions`)
  const resolvedActs = useMemo(() => {
    const chainedCoords = computeChainedActPositions(acts, DEFAULT_TRANSITIONS);
    return acts.map((act, index) => {
      const startFrame = act.startFrame ?? Math.floor(index * defaultActDuration);
      const endFrame = act.endFrame ?? Math.floor((index + 1) * defaultActDuration);
      const coord = chainedCoords[index];

      return {
        ...act,
        startFrame,
        endFrame,
        posX: coord.posX,
        posY: coord.posY,
        posZ: coord.posZ,
        prevPosX: coord.prevPosX,
        prevPosY: coord.prevPosY,
        prevPosZ: coord.prevPosZ,
        transitionIn: coord.transitionIn,
        transitionOut: coord.transitionOut,
        layoutVariant: coord.layoutVariant,
        textRevealMode: coord.textRevealMode,
      };
    });
  }, [acts, defaultActDuration, DEFAULT_TRANSITIONS]);

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

  // Note: UniversalCameraRig always follows cameraFrame smoothly even in stop-motion
  const transitionState = useMemo(() => {
    return DynamicTransitionDirector.computeTransitionState(rawFrame, fps, resolvedActs);
  }, [rawFrame, fps, resolvedActs]);

  const heroFontSize = clampFontSize(52, 'heroTitle', width, height);
  const bodyFontSize = clampFontSize(25, 'body', width, height);

  return (
    <CinematicRhythmContext.Provider value={rhythmState}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: stageBgColor,
          color: primaryTextColor,
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
        {/* 2. AUTHENTIC THEME-SPECIFIC VOLUMETRIC & TEXTURAL BACKDROP     */}
        {/* ============================================================== */}
        {!isBrutalist && !isStopMotion && (
          <StudioMeshGlassBackdrop
            primaryLightColor={primaryAccent}
            accentGlowColor={secondaryAccent}
          />
        )}

        {/* CAD Blueprint Engineering Grid Overlay */}
        {isBlueprint && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(56, 189, 248, 0.14) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(56, 189, 248, 0.14) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Tactile Stop-Motion Craft Mat Grid */}
        {isStopMotion && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(244, 162, 97, 0.12) 0%, rgba(15, 12, 10, 0.65) 100%),
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%, 48px 48px, 48px 48px',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Neo-Brutalist High-Contrast Halftone Dot Matrix */}
        {isBrutalist && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#09090B 2px, transparent 2px)',
              backgroundSize: '36px 36px',
              opacity: 0.22,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Studio Filmic Dither (Eliminates 8-bit CSS Mach Color Banding across dark gradients) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            zIndex: 1,
          }}
        />

        {/* ============================================================== */}
        {/* 3. OPEN-CANVAS 3D WORLD & MULTI-ARCHETYPE CHOREOGRAPHY         */}
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

              // Extended visibility window so during CAMERA_SPATIAL_FLIGHT both outgoing and
              // incoming acts are simultaneously rendered and visible in the camera viewport!
              const isVisibleInViewport = rawFrame >= actStart - 32 && rawFrame <= actEnd + 32;
              if (!isVisibleInViewport) return null;

              const {
                posX,
                posY,
                posZ,
                prevPosX,
                prevPosY,
                transitionIn,
                transitionOut,
                layoutVariant,
                textRevealMode,
              } = act;
              const localFrame = Math.max(0, frame - actStart);

              // Compute per-child staggered kinetic transition transforms!
              // child 0: Hero Sculpture / Portal Anchor
              // child 1: Eyebrow Badge + Kinetic Headline
              // child 2: Description + Hero Metric Counter
              // child 3+: Individual Constellation Sub-Nodes
              const heroChildTrans = computeChildTransitionStyle(
                0,
                rawFrame,
                actStart,
                actEnd,
                fps,
                transitionIn,
                transitionOut
              );
              const titleChildTrans = computeChildTransitionStyle(
                1,
                rawFrame,
                actStart,
                actEnd,
                fps,
                transitionIn,
                transitionOut
              );
              const descChildTrans = computeChildTransitionStyle(
                2,
                rawFrame,
                actStart,
                actEnd,
                fps,
                transitionIn,
                transitionOut
              );

              // Act-level visibility envelope:
              // - For CAMERA_SPATIAL_FLIGHT, keep opacity 1.0 across the entire camera flight
              //   window so BOTH scenes are seen simultaneously as the camera moves!
              const fadeInStart =
                transitionIn?.archetype === 'CAMERA_SPATIAL_FLIGHT' ? actStart - 26 : actStart - 8;
              const fadeInEnd =
                transitionIn?.archetype === 'CAMERA_SPATIAL_FLIGHT' ? actStart - 14 : actStart + 4;
              const fadeOutStart =
                transitionOut?.archetype === 'CAMERA_SPATIAL_FLIGHT' ? actEnd + 14 : actEnd - 4;
              const fadeOutEnd =
                transitionOut?.archetype === 'CAMERA_SPATIAL_FLIGHT' ? actEnd + 26 : actEnd + 10;

              const actEnvelopeOpacity = interpolate(
                rawFrame,
                [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
                [0, 1, 1, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              // Independent staggered entrance springs for internal elements
              const visualSpring = spring({
                frame: localFrame,
                fps,
                config: { damping: 12, stiffness: 125, mass: 0.95 },
              });
              const badgeSpring = spring({
                frame: Math.max(0, localFrame - 5),
                fps,
                config: { damping: 14, stiffness: 145, mass: 0.7 },
              });
              const descSpring = spring({
                frame: Math.max(0, localFrame - 16),
                fps,
                config: { damping: 15, stiffness: 118, mass: 0.85 },
              });
              const metricSpring = spring({
                frame: Math.max(0, localFrame - 22),
                fps,
                config: { damping: 11, stiffness: 135, mass: 0.9 },
              });

              // Continuous life-cycle micro-motion (Middle 60% never static)
              const floatY = Math.round(Math.sin((frame + actIndex * 23) * 0.065) * 10);
              const counterFloatY = Math.round(Math.cos((frame + actIndex * 19) * 0.055) * 7);
              const breathingScale = 1.0 + beatPulse * 0.016;
              const stopMotionWiggle = isStopMotion
                ? Math.round(Math.sin(frame * 0.25 + actIndex) * 2.5)
                : 0;

              // SVG Constellation Conduit drawing progress
              const conduitDraw = interpolate(
                localFrame,
                [2, 36],
                [680, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              // Deconstruct headline into linguistically sound staggered kinetic phrases
              const titlePhrases = splitPersianPhrasesLinguistically(act.titleFa);

              // Helper to compute varied Kinetic Text Reveal styles per phrase (`textRevealMode`)
              const renderKineticHeadline = (alignCenter: boolean = false) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    alignItems: alignCenter ? 'center' : 'flex-end',
                    perspective: 900,
                  }}
                >
                  {titlePhrases.map((phrase, phraseIdx) => {
                    const phraseSpring = spring({
                      frame: Math.max(0, localFrame - (7 + phraseIdx * 6)),
                      fps,
                      config:
                        textRevealMode === 'ELASTIC_POP_SLAM'
                          ? { damping: 9, stiffness: 180, mass: 0.75 }
                          : { damping: 13, stiffness: 135, mass: 0.82 },
                    });

                    let phraseTransform = '';
                    let wrapperOverflow: 'hidden' | 'visible' = 'visible';

                    if (textRevealMode === 'MASK_CURTAIN_RISE') {
                      wrapperOverflow = 'hidden';
                      const riseY = Math.round((1 - phraseSpring) * 78);
                      phraseTransform = `translate3d(0px, ${riseY}px, 0px)`;
                    } else if (textRevealMode === 'PERSPECTIVE_3D_FLIP') {
                      const flipX = Number(((1 - phraseSpring) * -82).toFixed(1));
                      const shiftY = Math.round((1 - phraseSpring) * 28);
                      phraseTransform = `translate3d(0px, ${shiftY}px, 0px) rotateX(${flipX}deg)`;
                    } else if (textRevealMode === 'ELASTIC_POP_SLAM') {
                      const slamScale = Number(
                        interpolate(phraseSpring, [0, 1], [1.65, 1.0]).toFixed(2)
                      );
                      phraseTransform = `translate3d(0px, 0px, 0px) scale(${slamScale})`;
                    } else {
                      // VELOCITY_SKEW_SLIDE
                      const slideX = Math.round((1 - phraseSpring) * (phraseIdx % 2 === 0 ? 140 : -140));
                      const skewDeg = Number(((1 - phraseSpring) * -16).toFixed(1));
                      phraseTransform = `translate3d(${slideX}px, 0px, 0px) skewX(${skewDeg}deg)`;
                    }

                    return (
                      <div
                        key={phraseIdx}
                        style={{
                          overflow: wrapperOverflow,
                          padding: wrapperOverflow === 'hidden' ? '4px 8px' : '0px',
                        }}
                      >
                        <h1
                          style={{
                            margin: 0,
                            fontSize: heroFontSize,
                            fontWeight: 900,
                            color: isBrutalist
                              ? '#09090B'
                              : isStopMotion
                              ? '#1E1B18'
                              : '#ffffff',
                            backgroundColor: isBrutalist
                              ? phraseIdx === 0
                                ? '#FFFFFF'
                                : '#FF0055'
                              : isStopMotion
                              ? '#F5F2EB'
                              : 'transparent',
                            padding: isBrutalist || isStopMotion ? '6px 22px' : 0,
                            boxShadow: isBrutalist
                              ? '8px 8px 0px #09090B'
                              : isStopMotion
                              ? '0 10px 24px rgba(0,0,0,0.42)'
                              : 'none',
                            lineHeight: 1.32,
                            transform: phraseTransform,
                            opacity: Math.min(1, phraseSpring * 1.25),
                            textShadow:
                              isBrutalist || isStopMotion
                                ? 'none'
                                : `0 8px 32px rgba(0,0,0,0.9), 0 0 28px ${primaryAccent}44`,
                          }}
                        >
                          {phrase}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              );

              // Helper to render the Sculptural Hero Visual + Theme-Specific Accents
              const renderHeroSculpture = (sizePx: number = 330) => (
                <div
                  style={{
                    width: sizePx,
                    height: sizePx,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative',
                    transform: `translate3d(${Math.round(heroChildTrans.offsetX)}px, ${Math.round(
                      (1 - visualSpring) * -42 + floatY + heroChildTrans.offsetY
                    )}px, ${Math.round(heroChildTrans.offsetZ)}px) rotateY(${
                      heroChildTrans.rotateY
                    }deg) rotateZ(${
                      heroChildTrans.rotateZ + stopMotionWiggle
                    }deg) scale(${Number(
                      (visualSpring * breathingScale * heroChildTrans.scale).toFixed(3)
                    )})`,
                    opacity: visualSpring * heroChildTrans.opacity,
                  }}
                >
                  {/* Animated SVG Orbital / CAD / Bio Ring */}
                  <svg
                    width={sizePx}
                    height={sizePx}
                    viewBox="0 0 340 340"
                    style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
                  >
                    {/* Outer Orbital / CAD Ring */}
                    <circle
                      cx={170}
                      cy={170}
                      r={150}
                      fill={isStopMotion ? '#F4A26122' : isBrutalist ? '#FFFFFF' : 'none'}
                      stroke={isBrutalist ? '#09090B' : primaryAccent}
                      strokeWidth={isBrutalist ? 5 : 2.5}
                      strokeDasharray={isBlueprint ? '8 6 2 6' : '18 14'}
                      strokeDashoffset={Math.round(-frame * 1.8)}
                      strokeOpacity={0.75}
                    />
                    {/* Inner Drawn Conduit Ring */}
                    <circle
                      cx={170}
                      cy={170}
                      r={122}
                      fill="none"
                      stroke={isBrutalist ? '#FF0055' : secondaryAccent}
                      strokeWidth={isBrutalist ? 4 : 3}
                      strokeDasharray={780}
                      strokeDashoffset={Math.round(780 * (1 - visualSpring))}
                      strokeOpacity={0.85}
                    />
                    {/* Blueprint CAD Crosshairs & Rotating Rotor */}
                    {isBlueprint && (
                      <g
                        transform={`rotate(${Math.round(frame * 0.8)} 170 170)`}
                        stroke="#38BDF8"
                        strokeWidth={1.5}
                        opacity={0.7}
                      >
                        <line x1={170} y1={8} x2={170} y2={42} />
                        <line x1={170} y1={298} x2={170} y2={332} />
                        <line x1={8} y1={170} x2={42} y2={170} />
                        <line x1={298} y1={170} x2={332} y2={170} />
                      </g>
                    )}
                    {/* Quantum Bio Lissajous Helix */}
                    {isQuantumBio && (
                      <ellipse
                        cx={170}
                        cy={170}
                        rx={140}
                        ry={64}
                        fill="none"
                        stroke={primaryAccent}
                        strokeWidth={2}
                        transform={`rotate(${Math.round(frame * 1.4)} 170 170)`}
                        opacity={0.65}
                      />
                    )}
                    {/* FinTech / Bento Live Telemetry Bars around Hero */}
                    {(isFinTech || layoutVariant === 'SPLIT_DATA_TERMINAL_LEFT') &&
                      [0, 1, 2, 3, 4].map((barIdx) => {
                        const barH = Math.round(
                          32 + Math.abs(Math.sin(frame * 0.08 + barIdx * 1.3)) * 52
                        );
                        return (
                          <rect
                            key={barIdx}
                            x={110 + barIdx * 26}
                            y={290 - barH}
                            width={14}
                            height={barH}
                            rx={4}
                            fill={barIdx % 2 === 0 ? primaryAccent : secondaryAccent}
                            opacity={0.85}
                          />
                        );
                      })}
                  </svg>

                  {/* Stop-Motion Masking Tape Strip */}
                  {isStopMotion && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        width: 110,
                        height: 28,
                        backgroundColor: 'rgba(233, 196, 106, 0.82)',
                        transform: 'rotate(-4deg)',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.25)',
                        zIndex: 3,
                      }}
                    />
                  )}

                  {act.customVisual ? (
                    act.customVisual
                  ) : act.lottiePreset ? (
                    <LottieGraphic
                      preset={act.lottiePreset}
                      size={Math.round(sizePx * 0.72)}
                      accentColor={primaryAccent}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: Math.round(sizePx * 0.34),
                        filter: isBrutalist
                          ? 'drop-shadow(6px 6px 0px #09090B)'
                          : `drop-shadow(0 12px 28px ${primaryAccent}66)`,
                      }}
                    >
                      {act.heroSymbol || '⚡'}
                    </span>
                  )}
                </div>
              );

              // Helper to render Staggered Constellation Sub-Nodes (Each with independent child exit/pop!)
              const renderConstellationNodes = () => {
                if (!act.constellationNodes || act.constellationNodes.length === 0) return null;
                return (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      marginTop: 38,
                      direction: 'rtl',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {act.constellationNodes.map((node, nodeIdx) => {
                      const nodeSpring = spring({
                        frame: Math.max(0, localFrame - (22 + nodeIdx * 9)),
                        fps,
                        config: { damping: 12, stiffness: 130, mass: 0.85 },
                      });
                      const nodeFloat = Math.round(
                        Math.sin((frame + nodeIdx * 18) * 0.07) * 6
                      );
                      const nodeTrans = computeChildTransitionStyle(
                        3 + nodeIdx,
                        rawFrame,
                        actStart,
                        actEnd,
                        fps,
                        transitionIn,
                        transitionOut
                      );

                      return (
                        <div
                          key={nodeIdx}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                            padding: isBrutalist || isStopMotion ? '14px 26px' : '8px 18px',
                            backgroundColor: isBrutalist
                              ? '#FFFFFF'
                              : isStopMotion
                              ? '#F5F2EB'
                              : 'transparent',
                            boxShadow: isBrutalist
                              ? '7px 7px 0px #09090B'
                              : isStopMotion
                              ? '0 10px 20px rgba(0,0,0,0.38)'
                              : 'none',
                            transform: `translate3d(${Math.round(
                              nodeTrans.offsetX
                            )}px, ${Math.round(
                              (1 - nodeSpring) * 35 + nodeFloat + nodeTrans.offsetY
                            )}px, ${Math.round(nodeTrans.offsetZ)}px) rotateZ(${
                              nodeTrans.rotateZ + (isStopMotion ? (nodeIdx - 1) * 2 : 0)
                            }deg) scale(${Number((nodeSpring * nodeTrans.scale).toFixed(3))})`,
                            opacity: nodeSpring * nodeTrans.opacity,
                          }}
                        >
                          {node.symbol && (
                            <span style={{ fontSize: 40 }}>{node.symbol}</span>
                          )}
                          {node.valueFa && (
                            <span
                              style={{
                                fontSize: 34,
                                fontWeight: 900,
                                color: isBrutalist
                                  ? '#FF0055'
                                  : isStopMotion
                                  ? '#E76F51'
                                  : primaryAccent,
                                textShadow:
                                  isBrutalist || isStopMotion
                                    ? 'none'
                                    : `0 0 20px ${primaryAccent}55`,
                              }}
                            >
                              {sanitizeForDisplay(node.valueFa)}
                            </span>
                          )}
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 800,
                              color:
                                isBrutalist || isStopMotion ? '#1E1B18' : '#f8fafc',
                              textShadow:
                                isBrutalist || isStopMotion
                                  ? 'none'
                                  : '0 4px 14px rgba(0,0,0,0.85)',
                            }}
                          >
                            {sanitizeForDisplay(node.labelFa)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              };

              // Calculate spatial bridge vector when incoming via CAMERA_SPATIAL_FLIGHT
              const hasSpatialBridge =
                actIndex > 0 &&
                transitionIn?.archetype === 'CAMERA_SPATIAL_FLIGHT' &&
                (posX !== prevPosX || posY !== prevPosY);

              return (
                <div
                  key={act.actId}
                  style={{
                    position: 'absolute',
                    transform: `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, ${Math.round(posZ)}px)`,
                    opacity: actEnvelopeOpacity,
                    clipPath: titleChildTrans.clipPath,
                    width: Math.round(width * 0.82),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased',
                  }}
                >
                  {/* 3D SPATIAL BRIDGE CONDUIT (Connects previous scene & current scene during Camera Pan!) */}
                  {hasSpatialBridge && (
                    <svg
                      width={1600}
                      height={400}
                      viewBox="0 0 1600 400"
                      style={{
                        position: 'absolute',
                        left: posX > prevPosX ? -780 : 780,
                        top: posY > prevPosY ? -460 : 120,
                        pointerEvents: 'none',
                        overflow: 'visible',
                        opacity: 0.65,
                      }}
                    >
                      <path
                        d="M 120 200 C 520 80, 1080 320, 1480 200"
                        fill="none"
                        stroke={primaryAccent}
                        strokeWidth={3}
                        strokeDasharray="16 12"
                        strokeDashoffset={Math.round(-frame * 4)}
                      />
                      <circle cx={420} cy={145} r={8} fill={primaryAccent} />
                      <circle cx={800} cy={200} r={11} fill={secondaryAccent} />
                      <circle cx={1180} cy={255} r={8} fill={primaryAccent} />
                    </svg>
                  )}

                  {/* KINETIC LIGHT SWEEP LASER BLADE (Active during KINETIC_LIGHT_SWEEP) */}
                  {transitionOut?.archetype === 'KINETIC_LIGHT_SWEEP' &&
                    rawFrame >= actEnd - (transitionOut.durationInFrames ?? 18) &&
                    rawFrame <= actEnd && (
                      <div
                        style={{
                          position: 'absolute',
                          top: -120,
                          bottom: -120,
                          left: `${Math.round(
                            interpolate(
                              rawFrame,
                              [actEnd - (transitionOut.durationInFrames ?? 18), actEnd],
                              [0, 100],
                              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                            )
                          )}%`,
                          width: 10,
                          background: `linear-gradient(180deg, transparent, #ffffff, ${primaryAccent}, transparent)`,
                          boxShadow: `0 0 36px 8px ${primaryAccent}`,
                          zIndex: 30,
                          pointerEvents: 'none',
                        }}
                      />
                    )}

                  {/* VOLUMETRIC LIGHT POOL ON OPEN CANVAS (OKLCH PERCEPTUAL GRADING) */}
                  {!isBrutalist && (
                    <div
                      style={{
                        position: 'absolute',
                        width: 920,
                        height: 520,
                        background:
                          theme.oklchColors?.meshGradient ||
                          `radial-gradient(ellipse at center in oklch, ${primaryAccent}44 0%, ${secondaryAccent}1a 45%, transparent 75%)`,
                        pointerEvents: 'none',
                        transform: `scale(${breathingScale})`,
                      }}
                    />
                  )}

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
                      d={
                        layoutVariant === 'MONUMENTAL_CENTER_HERO'
                          ? 'M 180 230 C 480 60, 880 60, 1180 230'
                          : 'M 240 210 C 480 90, 740 310, 1080 190'
                      }
                      fill="none"
                      stroke={isBrutalist ? '#09090B' : primaryAccent}
                      strokeWidth={isBrutalist ? 4 : 2.5}
                      strokeDasharray={680}
                      strokeDashoffset={Math.round(conduitDraw)}
                      strokeOpacity={0.55}
                    />
                    {/* Architectural Golden Truss Lintel for KINETIC_ARCHITECTURAL_TYPO */}
                    {isArchTypo && (
                      <line
                        x1={140}
                        y1={40}
                        x2={1220}
                        y2={40}
                        stroke={primaryAccent}
                        strokeWidth={2}
                        strokeDasharray={1080}
                        strokeDashoffset={Math.round(conduitDraw * 1.5)}
                        opacity={0.5}
                      />
                    )}
                  </svg>

                  {/* ========================================================== */}
                  {/* MULTI-LAYOUT STAGE CHOREOGRAPHY (4 DISTINCT ACT LAYOUTS)   */}
                  {/* ========================================================== */}
                  {layoutVariant === 'MONUMENTAL_CENTER_HERO' ? (
                    /* LAYOUT 2: MONUMENTAL_CENTER_HERO (Symmetrical Orbital Hero + Center Statement) */
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        direction: 'rtl',
                        gap: 22,
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      {renderHeroSculpture(260)}

                      <div
                        style={{
                          transform: `translate3d(${Math.round(
                            titleChildTrans.offsetX
                          )}px, ${Math.round(titleChildTrans.offsetY)}px, ${Math.round(
                            titleChildTrans.offsetZ
                          )}px) rotateZ(${titleChildTrans.rotateZ}deg) scale(${
                            titleChildTrans.scale
                          })`,
                          opacity: titleChildTrans.opacity,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        {act.badgeFa && (
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '6px 22px',
                              borderRadius: isBrutalist ? 0 : 999,
                              background: isBrutalist ? '#09090B' : `${primaryAccent}24`,
                              color: isBrutalist ? '#FACC15' : primaryAccent,
                              marginBottom: 14,
                              fontWeight: 800,
                              fontSize: 20,
                            }}
                          >
                            {sanitizeForDisplay(act.badgeFa)}
                          </div>
                        )}
                        {renderKineticHeadline(true)}
                      </div>

                      <div
                        style={{
                          maxWidth: 960,
                          transform: `translate3d(${Math.round(
                            descChildTrans.offsetX
                          )}px, ${Math.round(
                            (1 - descSpring) * 24 + descChildTrans.offsetY
                          )}px, ${Math.round(descChildTrans.offsetZ)}px) scale(${
                            descChildTrans.scale
                          })`,
                          opacity: descSpring * descChildTrans.opacity,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: bodyFontSize,
                            fontWeight: 700,
                            color: secondaryTextColor,
                            lineHeight: 1.6,
                          }}
                        >
                          {sanitizeForDisplay(act.descriptionFa)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* LAYOUT 1, 3, 4: ASYMMETRIC SPATIAL SPLIT (`row-reverse` or `row`) */
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection:
                          layoutVariant === 'SPLIT_DATA_TERMINAL_LEFT'
                            ? 'row'
                            : 'row-reverse',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 64,
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      {/* 1. INDEPENDENT KINETIC TYPOGRAPHY STREAM */}
                      <div
                        style={{
                          flex: 1,
                          textAlign: 'right',
                          direction: 'rtl',
                          transform: `translate3d(${Math.round(
                            titleChildTrans.offsetX
                          )}px, ${Math.round(titleChildTrans.offsetY)}px, ${Math.round(
                            titleChildTrans.offsetZ
                          )}px) rotateZ(${titleChildTrans.rotateZ}deg) scale(${
                            titleChildTrans.scale
                          })`,
                          opacity: titleChildTrans.opacity,
                        }}
                      >
                        {/* STAGGERED FLOATING BADGE */}
                        {act.badgeFa && (
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '6px 20px',
                              borderRadius: isBrutalist || isStopMotion ? 4 : 999,
                              background: isBrutalist
                                ? '#09090B'
                                : isStopMotion
                                ? '#E76F51'
                                : `${primaryAccent}1f`,
                              marginBottom: 20,
                              transform: `translate3d(0px, ${Math.round(
                                (1 - badgeSpring) * 24
                              )}px, 0px) scale(${badgeSpring})`,
                              opacity: badgeSpring,
                            }}
                          >
                            <span
                              style={{
                                width: 9,
                                height: 9,
                                borderRadius: '50%',
                                backgroundColor: isBrutalist
                                  ? '#FACC15'
                                  : isStopMotion
                                  ? '#F5F2EB'
                                  : primaryAccent,
                              }}
                            />
                            <span
                              style={{
                                fontSize: 20,
                                fontWeight: 800,
                                color: isBrutalist
                                  ? '#FACC15'
                                  : isStopMotion
                                  ? '#F5F2EB'
                                  : primaryAccent,
                              }}
                            >
                              {sanitizeForDisplay(act.badgeFa)}
                            </span>
                          </div>
                        )}

                        {/* MULTI-MODE KINETIC HEADLINE (`textRevealMode`) */}
                        {renderKineticHeadline(false)}

                        {/* INDEPENDENT KINETIC DESCRIPTION & METRIC (Child 2) */}
                        <div
                          style={{
                            transform: `translate3d(${Math.round(
                              descChildTrans.offsetX - titleChildTrans.offsetX
                            )}px, ${Math.round(
                              descChildTrans.offsetY - titleChildTrans.offsetY
                            )}px, 0px)`,
                            opacity: descChildTrans.opacity,
                          }}
                        >
                          <p
                            style={{
                              margin: '20px 0 0 0',
                              fontSize: bodyFontSize,
                              fontWeight: 600,
                              color: secondaryTextColor,
                              lineHeight: 1.65,
                              transform: `translate3d(0px, ${Math.round(
                                (1 - descSpring) * 28
                              )}px, 0px)`,
                              opacity: descSpring,
                              textShadow:
                                isBrutalist || isStopMotion
                                  ? 'none'
                                  : '0 4px 18px rgba(0,0,0,0.85)',
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
                                padding: isBrutalist ? '8px 20px' : 0,
                                backgroundColor: isBrutalist ? '#FFFFFF' : 'transparent',
                                boxShadow: isBrutalist ? '6px 6px 0px #09090B' : 'none',
                                transform: `translate3d(0px, ${Math.round(
                                  (1 - metricSpring) * 32 + counterFloatY
                                )}px, 0px) scale(${Number(
                                  (metricSpring * breathingScale).toFixed(3)
                                )})`,
                                opacity: metricSpring,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 56,
                                  fontWeight: 900,
                                  color: isBrutalist ? '#FF0055' : secondaryAccent,
                                  textShadow: isBrutalist
                                    ? 'none'
                                    : `0 0 28px ${secondaryAccent}66`,
                                }}
                              >
                                {act.metricValue}
                              </span>
                              <span
                                style={{
                                  fontSize: 22,
                                  fontWeight: 800,
                                  color: primaryTextColor,
                                }}
                              >
                                {sanitizeForDisplay(act.metricLabelFa || '')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. INDEPENDENT SCULPTURAL HERO VISUAL (Child 0) */}
                      {renderHeroSculpture(340)}
                    </div>
                  )}

                  {/* 3. STAGGERED CONSTELLATION SUB-NODES ON OPEN CANVAS */}
                  {renderConstellationNodes()}

                  {/* OPTIONAL BESPOKE OPEN-CANVAS ROW */}
                  {act.customBottomRow && (
                    <div
                      style={{
                        width: '100%',
                        marginTop: 32,
                        direction: 'rtl',
                        transform: `translate3d(${Math.round(
                          descChildTrans.offsetX
                        )}px, ${Math.round(descChildTrans.offsetY)}px, 0px)`,
                        opacity: descChildTrans.opacity,
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
