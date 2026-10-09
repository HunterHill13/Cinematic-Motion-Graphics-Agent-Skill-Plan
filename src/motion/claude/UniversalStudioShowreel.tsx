/**
 * ============================================================================
 * CLAUDE OPUS 5.5: UNIVERSAL PARAMETRIC STUDIO SHOWREEL
 * ============================================================================
 * 
 * A 100% data-driven, cinematic master video template powered by VideoManifest.
 * Renders any scientific, technical, biomedical, or financial topic with:
 * - 6-DOF Spline Camera traversing an Infinite Spatial Canvas (X = 0 -> 4300)
 * - Act 1: Glassmorphic Monolith with interactive cursor & liquid gooey squash
 * - Act 2: Tactile Paper Cutout with 4-stage Stepper & Universal Vector Morph
 * - Act 3: 2.5D Blueprint Console with Kinetic Bar Chart & Telemetry Waveform
 * - Act 4: Neo-Brutalist Graphic Poster with Circular Gauge & Verification Seal
 * - Synchronized Audio, BGM ducking, SFX, and zero-subpixel-jitter typography.
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, Sequence, staticFile } from 'remotion';
import { AtmosphericBackdrop } from '../library/AtmosphericBackdrop';
import { UniversalVectorMorphCard } from '../recipes/UniversalVectorMorphCard';
import { InteractiveCursor } from '../library/InteractiveCursor';
import { ForegroundBokehLayer } from '../library/ForegroundBokehLayer';
import { LissajousOrbit, ParametricWaveformStream } from '../library/ProceduralGenerativeMotifs';
import { quantizeToBeat, calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { loadYekanBakhFonts } from '../../fonts/yekanBakh';
import { CURATED_COLOR_PALETTES } from '../visual_world/colorPaletteGate';
import { APPROVED_ART_STYLES, ArtStyleDefinition, quantizeFrameForStopMotion } from '../visual_world/artStyleGate';
import { deriveAtmosphere } from '../visual_world/AtmosphereThemeDeriver';
import { MaskedKineticHeadline } from '../library/MaskedKineticTypography';
import { InertialRig } from '../library/InertialFollowThrough';
import { DynamicFresnelSweep } from '../library/DynamicFresnelSweep';
import { StyleAwareAtmosphereLayer } from '../library/StyleAwareAtmosphereLayer';
import { KineticBarChart, KineticMetricCounter } from '../library/KineticDataViz';
import { LiquidButtonSquash } from '../library/OrganicLiquidGooey';
import { NewtonianAttractorSwarm } from '../library/NewtonianAttractorSwarm';
import { VideoManifest, ZeroToVideoCompiler } from '../../compiler/ZeroToVideoCompiler';

if (typeof window !== 'undefined') {
  loadYekanBakhFonts().catch((e) => console.warn('Font load warning:', e));
}

const PALETTE = CURATED_COLOR_PALETTES.biotech_medical[0];

export interface UniversalStudioShowreelProps {
  manifest?: VideoManifest;
}

export const UniversalStudioShowreelContent: React.FC<UniversalStudioShowreelProps> = ({ manifest: propManifest }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // If no manifest supplied, compile default on-the-fly
  const manifest = propManifest || ZeroToVideoCompiler.compile({
    topic: 'کارگردانی سینمایی ویدیو در تراز کلاد اوپوس ۵.۵',
  });

  // Art Style Progression
  let currentStyle: ArtStyleDefinition = APPROVED_ART_STYLES.MODERN_GLASSMORPHIC;
  if (frame >= 330 && frame < 720) {
    currentStyle = APPROVED_ART_STYLES.STOP_MOTION_PAPER;
  } else if (frame >= 720 && frame < 1220) {
    currentStyle = APPROVED_ART_STYLES.TECHNICAL_BLUEPRINT;
  } else if (frame >= 1220) {
    currentStyle = APPROVED_ART_STYLES.NEO_BRUTALIST;
  }

  const atmosphere = deriveAtmosphere(PALETTE, currentStyle);
  const stopMotionFrame = quantizeFrameForStopMotion(frame, 'stop_motion_12fps');

  // Beat Quantization & Pacing
  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // 6-DOF Spline Camera Motion
  const camX = interpolate(
    frame,
    [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
    [
      manifest.cameraKeyframes.act1X,
      manifest.cameraKeyframes.act1X,
      manifest.cameraKeyframes.act2X,
      manifest.cameraKeyframes.act2X,
      manifest.cameraKeyframes.act3X,
      manifest.cameraKeyframes.act3X,
      manifest.cameraKeyframes.act4X,
      manifest.cameraKeyframes.dockX,
      manifest.cameraKeyframes.dockX,
    ],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  const camZ = interpolate(
    frame,
    [0, 270, 340, 680, 750, 1180, 1250, 1400, 1800],
    [0, 0, 50, 50, 80, 80, 120, -180, -180],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }
  );

  const camRoll = interpolate(
    frame,
    [270, 305, 340, 680, 715, 750, 1180, 1215, 1250],
    [0, -2.5, 0, 0, 3.0, 0, 0, -2.0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camPitch = interpolate(
    frame,
    [0, 270, 340, 750, 1250, 1800],
    [1.5, 1.5, -1.0, 2.0, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camYaw = interpolate(
    frame,
    [270, 340, 680, 750, 1180, 1250],
    [0, 3.5, 0, -3.0, 0, 2.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const camY = Math.sin(frame * 0.05) * 4;

  // Act Visibility
  const act1Visible = camX < 800;
  const act2Visible = camX > 600 && camX < 2400;
  const act3Visible = camX > 2100 && camX < 3900;
  const act4Visible = camX > 3200;

  // Spring entrances
  const act1HeroSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90, mass: 1 } });
  const act3Entrance = interpolate(frame, [720, 770], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const act4Spring = spring({ frame: Math.max(0, frame - 1220), fps, config: { damping: 12, stiffness: 100 } });
  const saasDockScale = interpolate(frame, [1300, 1420], [1, 0.72], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gaugeValue = Math.min(manifest.act4.gaugeValue, Math.floor(interpolate(frame, [1240, 1340], [0, manifest.act4.gaugeValue], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        background: '#040d1a',
        fontFamily: 'Yekan Bakh, -apple-system, sans-serif',
      }}
    >
      {/* 1. ATMOSPHERIC BACKDROP & LIGHTING */}
      <AtmosphericBackdrop
        primaryGlowColor={atmosphere.radialGlow1.color}
        secondaryGlowColor={atmosphere.radialGlow2.color}
        showGrid={true}
        gridSpeed={0.6}
      />

      {/* 2. AUDIO BED & SFX */}
      <Audio src={staticFile('audio/ambient_bed.mp3')} volume={0.4} />

      {/* 3. INFINITE 3D SPATIAL WORLD */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: 1200,
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 1920,
            height: 1080,
            transformStyle: 'preserve-3d',
            transform: `
              translate3d(${-camX}px, ${-camY}px, ${camZ}px)
              rotateX(${camPitch}deg)
              rotateY(${camYaw}deg)
              rotateZ(${camRoll}deg)
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ================================================================= */}
          {/* ACT 1: GLASSMORPHIC HERO MONOLITH (X = 0)                         */}
          {/* ================================================================= */}
          {act1Visible && (
            <div
              style={{
                position: 'absolute',
                transform: 'translate3d(0px, 0px, 0px)',
                opacity: act1HeroSpring,
                width: 1380,
                height: 580,
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.22)',
                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8), 0 0 60px rgba(16, 185, 129, 0.18)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 64px',
                direction: 'rtl',
                textAlign: 'center',
              }}
            >
              <DynamicFresnelSweep
                camYaw={camYaw}
                camRoll={camRoll}
                camPitch={camPitch}
                borderRadius={24}
                highlightColor="rgba(255, 255, 255, 0.4)"
                maxIntensity={0.4}
              />

              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 24px',
                  borderRadius: 30,
                  background: 'rgba(16, 185, 129, 0.16)',
                  border: '1px solid rgba(16, 185, 129, 0.45)',
                  color: '#34d399',
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 20,
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
                <span>{sanitizeForDisplay(manifest.act1.badge)}</span>
              </div>

              {/* Headline */}
              <MaskedKineticHeadline
                text={manifest.act1.headline}
                highlightWords={[manifest.act1.highlightWord]}
                gradientColors={['#ffffff', '#34d399', '#38bdf8']}
                delayFrames={15}
                fontSize={54}
                fontWeight={950}
                direction="rtl"
                style={{ marginBottom: 18, justifyContent: 'center' }}
              />

              {/* Subtitle */}
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: '#cbd5e1',
                  maxWidth: 960,
                  lineHeight: 1.6,
                  marginBottom: 36,
                }}
              >
                {sanitizeForDisplay(manifest.act1.subtitle)}
              </div>

              {/* CTA Button */}
              <InertialRig parentProgress={act1HeroSpring} parentVelocity={0.5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LiquidButtonSquash clickFrame={220} width={280} height={66} primaryColor="#10b981" accentColor="#f59e0b" artStyle="MODERN_GLASSMORPHIC">
                  <div
                    style={{
                      width: 280,
                      height: 66,
                      borderRadius: 33,
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      boxShadow: '0 12px 30px rgba(16, 185, 129, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    <span style={{ fontSize: 20, fontWeight: 900, color: '#ffffff' }}>
                      {sanitizeForDisplay(manifest.act1.buttonText)}
                    </span>
                  </div>
                </LiquidButtonSquash>
              </InertialRig>
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 2: STOP-MOTION PAPER CUTOUT & UNIVERSAL MORPH (X = 1500)      */}
          {/* ================================================================= */}
          {act2Visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(1500px, 0px, 50px) rotate(${Math.sin(stopMotionFrame * 0.15) * 0.7}deg)`,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 1420,
                  height: 660,
                  background: '#fefdfa',
                  borderRadius: 6,
                  border: '3px solid rgba(80, 60, 40, 0.25)',
                  boxShadow: '10px 16px 0px rgba(60, 50, 40, 0.28), 20px 32px 0px rgba(60, 50, 40, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  direction: 'rtl',
                }}
              >
                {/* Paper Tape */}
                <div style={{ position: 'absolute', top: -14, right: 70, width: 95, height: 32, background: 'rgba(255, 238, 185, 0.85)', transform: 'rotate(14deg)', zIndex: 10 }} />
                <div style={{ position: 'absolute', top: -14, left: 70, width: 95, height: 32, background: 'rgba(255, 238, 185, 0.85)', transform: 'rotate(-10deg)', zIndex: 10 }} />

                {/* Header Pill */}
                <div style={{ position: 'absolute', top: 22, right: 36, background: '#1b4332', padding: '8px 26px', borderRadius: 6, fontSize: 16, fontWeight: 800, color: '#f0fdf4', zIndex: 5 }}>
                  {sanitizeForDisplay(manifest.act2.headerPill)}
                </div>

                <div style={{ position: 'absolute', top: 26, left: 36, fontSize: 16, fontWeight: 700, color: '#4b5563', zIndex: 5 }}>
                  {sanitizeForDisplay(manifest.act2.subtitle)}
                </div>

                {/* Lissajous Orbit */}
                <svg width={1400} height={600} style={{ position: 'absolute', top: 30, left: 10, overflow: 'visible', pointerEvents: 'none', zIndex: 2 }}>
                  <LissajousOrbit cx={700} cy={300} size={520} color="#d97706" glowColor="rgba(217, 119, 6, 0.35)" />
                </svg>

                {/* Universal Vector Morph Card */}
                <div style={{ position: 'relative', zIndex: 3, marginTop: 36 }}>
                  <UniversalVectorMorphCard
                    stages={manifest.act2.stages}
                    startFrame={manifest.act2.startFrame}
                    durationInFrames={manifest.act2.durationInFrames}
                    width={1360}
                    height={560}
                    theme="STOP_MOTION_PAPER"
                  />
                </div>
              </div>

              {/* Newtonian Attractor Swarm orbiting SVG Morph Core */}
              <NewtonianAttractorSwarm
                attractorX={-320}
                attractorY={30}
                particleCount={20}
                theme="STOP_MOTION_PAPER"
                beatPulse={beatPulse.scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 3: TECHNICAL BLUEPRINT CONSOLE (X = 3000)                     */}
          {/* ================================================================= */}
          {act3Visible && (
            <div
              style={{
                position: 'absolute',
                width: 1360,
                height: 680,
                opacity: act3Entrance,
                transform: `translate3d(3000px, 0px, 60px) scale(${saasDockScale})`,
                direction: 'rtl',
              }}
            >
              {/* Top CAD Guide */}
              <div style={{ position: 'absolute', top: -32, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 13, color: '#38bdf8', padding: '4px 16px', background: 'rgba(6, 182, 212, 0.12)', border: '1px dashed rgba(6, 182, 212, 0.5)' }}>
                <span>|◀ 0.00 mm</span>
                <span>◀────────────── CAD DIMENSION: 1360.00 mm (ISOMETRIC PROJECTION) ──────────────▶</span>
                <span>1360.00 mm ▶|</span>
              </div>

              <div style={{ width: '100%', height: '100%', background: 'rgba(4, 20, 36, 0.94)', borderRadius: 6, border: '2px solid #06b6d4', boxShadow: '0 35px 90px -15px rgba(0, 0, 0, 0.9)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <DynamicFresnelSweep camYaw={camYaw} camRoll={camRoll} camPitch={camPitch} borderRadius={6} highlightColor="rgba(56, 189, 248, 0.35)" maxIntensity={0.35} />

                {/* CAD Header */}
                <div style={{ height: 56, borderBottom: '1.5px solid rgba(6, 182, 212, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', background: 'rgba(6, 32, 54, 0.8)' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#06b6d4' }} />
                    <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#38bdf8', marginRight: 12 }}>[CAD_DRAWING: REV 5.5]</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#f0fdfa' }}>
                    {sanitizeForDisplay(manifest.act3.headerTitle)}
                  </div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#06b6d4' }} />
                </div>

                {/* Console Body */}
                <div style={{ flex: 1, padding: 30, display: 'flex', gap: 28 }}>
                  {/* Left Chart Area */}
                  <div style={{ flex: 1.15, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ height: 290, background: 'rgba(2, 14, 26, 0.85)', borderRadius: 6, border: '1px solid rgba(6, 182, 212, 0.35)', padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#38bdf8', fontFamily: 'monospace' }}>{manifest.act3.telemetryLabel}</span>
                        <KineticMetricCounter
                          value={manifest.act3.counterValue}
                          decimals={1}
                          prefix="+"
                          suffix="٪"
                          startFrame={manifest.act3.startFrame}
                          durationFrames={40}
                          fontSize={20}
                          color="#38bdf8"
                          artStyle="TECHNICAL_BLUEPRINT"
                        />
                      </div>
                      <KineticBarChart
                        items={manifest.act3.barChartItems}
                        startFrame={manifest.act3.startFrame}
                        staggerFrames={5}
                        height={170}
                        artStyle="TECHNICAL_BLUEPRINT"
                        direction="rtl"
                      />
                    </div>

                    <div style={{ padding: '16px 24px', background: 'rgba(6, 32, 54, 0.7)', borderRadius: 6, border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 16, color: '#cbd5e1', fontWeight: 600 }}>{sanitizeForDisplay(manifest.act3.statusBarText)}</span>
                      <span style={{ fontSize: 15, color: '#06b6d4', fontWeight: 800 }}>● پایدار</span>
                    </div>
                  </div>

                  {/* Right Status Cards */}
                  <div style={{ flex: 0.85, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {manifest.act3.statusCards.map((card, i) => (
                      <div key={i} style={{ padding: '18px 22px', background: 'rgba(2, 14, 26, 0.85)', borderRadius: 6, border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                        <div style={{ fontSize: 13, color: '#38bdf8', fontWeight: 600 }}>{card.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#f8fafc', marginTop: 6 }}>{sanitizeForDisplay(card.title)}</div>
                        <div style={{ fontSize: 15, color: '#06b6d4', marginTop: 6, fontWeight: 700 }}>{card.subtitle}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Waveform Stream */}
                <div style={{ position: 'absolute', bottom: 8, left: 28, right: 28, height: 32, overflow: 'hidden', pointerEvents: 'none', opacity: 0.85 }}>
                  <svg width="100%" height="32" viewBox="0 0 1300 32">
                    <ParametricWaveformStream x={0} y={16} width={1300} amplitude={10} color="#06b6d4" />
                  </svg>
                </div>
              </div>

              {/* Newtonian Attractor Swarm in Technical Blueprint Grid */}
              <NewtonianAttractorSwarm
                attractorX={350}
                attractorY={-20}
                particleCount={18}
                theme="TECHNICAL_BLUEPRINT"
                beatPulse={beatPulse.scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 4: NEO-BRUTALIST GRAPHIC POSTER & CALIBRATION (X = 4300)      */}
          {/* ================================================================= */}
          {act4Visible && (
            <div
              style={{
                position: 'absolute',
                width: 520,
                height: 640,
                opacity: act4Spring,
                transform: `translate3d(4300px, 0px, 60px) scale(${act4Spring})`,
                background: '#ffffff',
                borderRadius: 14,
                border: '4px solid #000000',
                boxShadow: '14px 14px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 36,
                direction: 'rtl',
                textAlign: 'center',
              }}
            >
              <div style={{ background: '#fef08a', border: '3px solid #000000', boxShadow: '4px 4px 0px #000000', padding: '8px 22px', borderRadius: 6, color: '#000000', fontSize: 16, fontWeight: 900, marginBottom: 24, transform: 'rotate(-3deg)' }}>
                {sanitizeForDisplay(manifest.act4.stickerBadge)}
              </div>

              {/* Gauge */}
              <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 26 }}>
                <svg width={200} height={200} style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx={100} cy={100} r={82} fill="none" stroke="#e5e7eb" strokeWidth={18} />
                  <circle cx={100} cy={100} r={82} fill="none" stroke="#f59e0b" strokeWidth={18} strokeDasharray={515} strokeDashoffset={515 - (515 * gaugeValue) / 100} strokeLinecap="square" />
                  <circle cx={100} cy={100} r={92} fill="none" stroke="#000000" strokeWidth={3.5} />
                  <circle cx={100} cy={100} r={72} fill="none" stroke="#000000" strokeWidth={3.5} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 54, fontWeight: 950, color: '#000000' }}>{gaugeValue}٪</span>
                  <span style={{ fontSize: 16, color: '#b45309', fontWeight: 800 }}>{sanitizeForDisplay(manifest.act4.gaugeLabel)}</span>
                </div>
              </div>

              <MaskedKineticHeadline
                text={manifest.act4.headline}
                highlightWords={[manifest.act4.highlightWord]}
                gradientColors={['#000000', '#b45309', '#f59e0b']}
                delayFrames={manifest.act4.startFrame + 20}
                fontSize={34}
                fontWeight={950}
                color="#000000"
                direction="rtl"
                style={{ marginBottom: 12, justifyContent: 'center' }}
              />

              <MaskedKineticHeadline
                text={manifest.act4.subtitle}
                highlightWords={['اوپوس']}
                delayFrames={manifest.act4.startFrame + 35}
                fontSize={16}
                fontWeight={700}
                color="#374151"
                direction="rtl"
                style={{ marginBottom: 24, maxWidth: 440, justifyContent: 'center' }}
              />

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 26px', borderRadius: 8, background: '#10b981', border: '3px solid #000000', boxShadow: '4px 4px 0px #000000', color: '#ffffff', fontSize: 16, fontWeight: 900, transform: 'rotate(2deg)' }}>
                <span>✔</span>
                <span>{sanitizeForDisplay(manifest.act4.verifiedPillText)}</span>
              </div>

              {/* Newtonian Attractor Swarm in Neo-Brutalist High Voltage */}
              <NewtonianAttractorSwarm
                attractorX={0}
                attractorY={-40}
                particleCount={18}
                theme="NEO_BRUTALIST"
                beatPulse={beatPulse.scalePulse}
              />
            </div>
          )}
        </div>
      </div>

      {/* 4. INTERACTIVE CURSOR */}
      <InteractiveCursor startFrame={150} clickFrame={220} endFrame={290} targetX={960} targetY={668} />

      {/* 5. ATMOSPHERIC SHADER PARTICLES */}
      <StyleAwareAtmosphereLayer camX={camX} camY={camY} />
      <ForegroundBokehLayer camX={camX} camY={camY} />

      {/* 6. NATIVE REMOTION AUDIO LAYER (BGM + DYNAMIC SCENARIO SFX) */}
      <Audio
        src={staticFile(manifest.audio.bgmFile)}
        volume={() => manifest.audio.bgmVolume}
      />

      {/* Dynamic Frame-Accurate Scenario Sound Effects */}
      {manifest.audio.sfxCues.map((sfx, idx) => (
        <Sequence key={`${sfx.file}-${sfx.frame}-${idx}`} from={sfx.frame} durationInFrames={sfx.durationInFrames}>
          <Audio src={staticFile(sfx.file)} volume={sfx.volume} />
        </Sequence>
      ))}
    </div>
  );
};
