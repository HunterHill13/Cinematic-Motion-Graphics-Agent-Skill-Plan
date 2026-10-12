/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 4: QUANTUM & BIO DEEP-Z MASTER (TRUE 3D PUSH-IN DIVE)
 * ============================================================================
 * 
 * True 3D spatial penetration through depth (Z-axis) on an Open Canvas:
 * - Stages situated behind each other in space (Z1=0 -> Z2=1600 -> Z3=3200 -> Z4=4800)
 * - Zero rigid outer card boxes: biological entities and telemetry float freely in 3D
 * - Open-Canvas SVG Orbital Rings, Lissajous Paths & Animated strokeDashoffset Energy Conduits
 * - Independent staggered spring entrances & continuous floating micro-motion per child
 * - Camera continuously accelerates forward (Dolly-In / Push-In)
 * - Subtle Videolancer Ultimate SFX via UniversalSoundDirector (<= 0.12 gain)
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { BioluminescentAbyssBackdrop } from '../library/BioluminescentAbyssBackdrop';
import { MaskedKineticHeadline } from '../library/MaskedKineticTypography';
import { StyleAwareAtmosphereLayer } from '../library/StyleAwareAtmosphereLayer';
import { ForegroundBokehLayer } from '../library/ForegroundBokehLayer';
import { KineticBarChart } from '../library/KineticDataViz';
import { UniversalVectorMorphCard } from '../recipes/UniversalVectorMorphCard';
import { NewtonianAttractorSwarm } from '../library/NewtonianAttractorSwarm';
import { LissajousOrbit, ParametricWaveformStream } from '../library/ProceduralGenerativeMotifs';
import { UniversalCameraRig } from '../camera/UniversalCameraRig';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { resolveVectorProgression } from '../library/DynamicVectorCatalog';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';

export const QUANTUM_BIO_DURATION = 450; // 15.0s @ 30 FPS
export const QUANTUM_BIO_FPS = 30;
export const QUANTUM_BIO_WIDTH = 1920;
export const QUANTUM_BIO_HEIGHT = 1080;

export const QuantumBioDeepZMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // 6-DOF True 3D Deep-Z Tunnel Camera Rig
  const trajectoryDef = UniversalCameraRig.getTrajectory('DEEP_Z_TUNNEL');
  const cam = trajectoryDef.computeCamera(frame, QUANTUM_BIO_DURATION);
  const { camX, camY, camZ, camPitch, camYaw, camRoll } = cam;

  const stages = trajectoryDef.stages;
  const act1Vis = trajectoryDef.getStageVisibility(1, cam);
  const act2Vis = trajectoryDef.getStageVisibility(2, cam);
  const act3Vis = trajectoryDef.getStageVisibility(3, cam);
  const act4Vis = trajectoryDef.getStageVisibility(4, cam);

  // Stage-level master springs
  const act1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const act2Spring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 13, stiffness: 100 } });
  const act3Spring = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 13, stiffness: 100 } });
  const act4Spring = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 12, stiffness: 110 } });

  const bioVectors = resolveVectorProgression('توالی ژنومیک هلیکس DNA و زیست‌شناسی مولکولی');

  const microFloatY = (idx: number, amp = 6) =>
    Math.round(Math.sin((frame + idx * 18) * 0.05) * amp);

  return (
    <div
      style={{
        position: 'relative',
        width: QUANTUM_BIO_WIDTH,
        height: QUANTUM_BIO_HEIGHT,
        backgroundColor: '#021e17',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
      }}
    >
      {/* 1. SUBTLE STUDIO AUDIO LAYER VIA UNIVERSAL SOUND DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Brain_Dance.mp3"
        bgmVolume={0.14}
        themeId="QUANTUM_BIO_DEEP_Z"
      />

      {/* 2. DEDICATED BIOLUMINESCENT ABYSS BACKDROP WITH DEEP-Z TUNNEL CAMERA */}
      <BioluminescentAbyssBackdrop
        camX={camX}
        camY={camY}
        camZ={camZ}
        camRoll={camRoll}
        camPitch={camPitch}
        glowColorPrimary="#10b981"
        glowColorSecondary="#06b6d4"
      />

      {/* 3. PERSISTENT 3D TUNNEL WORLD (ZERO OUTER BOX WRAPPERS) */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          perspective: 1000,
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `
              translate3d(${Math.round(-camX)}px, ${Math.round(-camY)}px, ${Math.round(-camZ)}px)
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
          {/* STAGE 1 (Z = 0): OPEN-CANVAS CELLULAR MEMBRANE & PROMPT HERO      */}
          {/* ================================================================= */}
          {act1Vis.visible && (() => {
            const actStart = 0;
            const badgeSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const titleSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 14, stiffness: 115 } });
            const subSpring = spring({ frame: Math.max(0, frame - actStart - 2 * 8), fps, config: { damping: 14, stiffness: 110 } });
            const conduitOffset = Math.round(interpolate(frame - actStart, [0, 45], [680, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

            const stage1Chips = [
              { label: 'شبیه‌سازی غشای سلولی', metric: '۹۹.۲٪', color: '#10b981' },
              { label: 'تاشدگی پروتئین مولکولی', metric: '۰.۸ Å', color: '#06b6d4' },
              { label: 'انرژی آزاد اتصال آنزیمی', metric: '-۱۲.۴ kcal', color: '#38bdf8' },
            ];

            return (
              <div
                style={{
                  position: 'absolute',
                  transform: `translate3d(${Math.round(stages.act1.x)}px, ${Math.round(stages.act1.y)}px, ${Math.round(stages.act1.z)}px) scale(${act1Vis.depthScale})`,
                  opacity: act1Spring * act1Vis.opacity,
                  width: 1440,
                  height: 760,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  direction: 'rtl',
                  textAlign: 'center',
                }}
              >
                {/* Bioluminescent Volumetric Glow Pool */}
                <div
                  style={{
                    position: 'absolute',
                    width: 1040,
                    height: 560,
                    background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.22) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 72%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Open-Canvas SVG Bio-Orbital Rings & Energy Conduits */}
                <svg
                  width={1440}
                  height={760}
                  viewBox="0 0 1440 760"
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
                >
                  <circle
                    cx={720}
                    cy={380}
                    r={320}
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.32)"
                    strokeWidth={1.8}
                    strokeDasharray="18 14"
                    strokeDashoffset={Math.round(-frame * 2)}
                  />
                  <circle
                    cx={720}
                    cy={380}
                    r={440}
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.22)"
                    strokeWidth={1.3}
                    strokeDasharray="12 22"
                    strokeDashoffset={Math.round(frame * 1.5)}
                  />
                  <path
                    d="M 220 540 C 480 390, 960 390, 1220 540"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray={680}
                    strokeDashoffset={conduitOffset}
                    strokeOpacity={0.48}
                  />
                </svg>

                {/* Eyebrow Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 24px',
                    borderRadius: 999,
                    background: 'rgba(16, 185, 129, 0.18)',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    color: '#6ee7b7',
                    fontSize: 16,
                    fontWeight: 800,
                    marginBottom: 22,
                    transform: `translate3d(0px, ${Math.round((1 - badgeSpring) * 28 + microFloatY(0))}px, 0px) scale(${badgeSpring})`,
                    opacity: badgeSpring,
                  }}
                >
                  <span>🧬</span>
                  <span>{sanitizeForDisplay('بیوتکنولوژی و ژنتیک محاسباتی · نفوذ سه‌بعدی')}</span>
                </div>

                {/* Hero Headline */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 34 + microFloatY(1))}px, 0px) scale(${titleSpring})`,
                    opacity: titleSpring,
                    marginBottom: 16,
                  }}
                >
                  <MaskedKineticHeadline
                    text="شبیه‌سازی بیوفیزیکی توالی DNA و تاشدگی پروتئین"
                    highlightWords={['بیوفیزیکی', 'پروتئین', 'DNA']}
                    gradientColors={['#ffffff', '#6ee7b7', '#10b981']}
                    delayFrames={10}
                    fontSize={48}
                    fontWeight={950}
                    direction="rtl"
                    style={{ justifyContent: 'center' }}
                  />
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - subSpring) * 30 + microFloatY(2))}px, 0px) scale(${subSpring})`,
                    opacity: subSpring,
                    marginBottom: 40,
                  }}
                >
                  <MaskedKineticHeadline
                    text="سفر ممتد دوربین به عمق ساختار مولکولی و پایش مکانیسم‌های آنزیمی بدون کات"
                    highlightWords={['مولکولی']}
                    delayFrames={24}
                    fontSize={22}
                    fontWeight={700}
                    color="#a7f3d0"
                    direction="rtl"
                    style={{ maxWidth: 920, justifyContent: 'center' }}
                  />
                </div>

                {/* Staggered Open-Canvas Constellation Nodes */}
                <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
                  {stage1Chips.map((chip, idx) => {
                    const chipSpring = spring({
                      frame: Math.max(0, frame - actStart - 20 - idx * 8),
                      fps,
                      config: { damping: 13, stiffness: 120 },
                    });
                    return (
                      <div
                        key={chip.label}
                        style={{
                          padding: '14px 26px',
                          borderRadius: 999,
                          background: 'rgba(2, 44, 34, 0.65)',
                          border: `1px solid ${chip.color}55`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          transform: `translate3d(0px, ${Math.round((1 - chipSpring) * 36 + microFloatY(idx + 3))}px, 0px)`,
                          opacity: chipSpring,
                          boxShadow: `0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${chip.color}22`,
                        }}
                      >
                        <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, color: chip.color }}>
                          {chip.metric}
                        </span>
                        <span style={{ fontSize: 16, fontWeight: 800, color: '#ecfdf5' }}>
                          {sanitizeForDisplay(chip.label)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <NewtonianAttractorSwarm
                  attractorX={0}
                  attractorY={180}
                  particleCount={18}
                  theme="MODERN_GLASSMORPHIC"
                  beatPulse={beatPulse.scalePulse}
                />
              </div>
            );
          })()}

          {/* ================================================================= */}
          {/* STAGE 2 (Z = 1600): ENZYME BINDING CORE & OPEN-CANVAS MORPH       */}
          {/* ================================================================= */}
          {act2Vis.visible && (() => {
            const actStart = 90;
            const pillSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const cardSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 13, stiffness: 110 } });
            const conduitOffset = Math.round(interpolate(frame - actStart, [0, 50], [740, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

            return (
              <div
                style={{
                  position: 'absolute',
                  transform: `translate3d(${Math.round(stages.act2.x)}px, ${Math.round(stages.act2.y)}px, ${Math.round(stages.act2.z)}px) scale(${act2Vis.depthScale})`,
                  opacity: act2Spring * act2Vis.opacity,
                  width: 1440,
                  height: 760,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Open-Canvas Lissajous & Energy Ribbon */}
                <svg width={1440} height={760} style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
                  <LissajousOrbit cx={720} cy={380} size={560} color="#f59e0b" glowColor="rgba(245, 158, 11, 0.45)" />
                  <path
                    d="M 160 380 C 440 180, 1000 580, 1280 380"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray={740}
                    strokeDashoffset={conduitOffset}
                    strokeOpacity={0.45}
                  />
                </svg>

                {/* Staggered Eyebrow Pill */}
                <div
                  style={{
                    padding: '8px 24px',
                    borderRadius: 999,
                    background: 'rgba(245, 158, 11, 0.18)',
                    border: '1px solid rgba(245, 158, 11, 0.55)',
                    color: '#fbbf24',
                    fontSize: 17,
                    fontWeight: 800,
                    marginBottom: 20,
                    transform: `translate3d(0px, ${Math.round((1 - pillSpring) * -28 + microFloatY(0))}px, 0px) scale(${pillSpring})`,
                    opacity: pillSpring,
                  }}
                >
                  {sanitizeForDisplay('🔬 پیوند لیگاند با پاکت فعال آنزیم · مورفینگ برداری')}
                </div>

                {/* Floating Vector Morph Stream */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - cardSpring) * 36 + microFloatY(1))}px, 0px) scale(${cardSpring})`,
                    opacity: cardSpring,
                  }}
                >
                  <UniversalVectorMorphCard
                    stages={bioVectors}
                    startFrame={90}
                    durationInFrames={130}
                    width={1320}
                    height={540}
                    glowColor="#10b981"
                    theme="MODERN_GLASSMORPHIC"
                  />
                </div>

                <NewtonianAttractorSwarm
                  attractorX={-300}
                  attractorY={30}
                  particleCount={20}
                  theme="STOP_MOTION_PAPER"
                  beatPulse={beatPulse.scalePulse}
                />
              </div>
            );
          })()}

          {/* ================================================================= */}
          {/* STAGE 3 (Z = 3200): BIO-TELEMETRY & BINDING AFFINITY BAR CHART    */}
          {/* ================================================================= */}
          {act3Vis.visible && (() => {
            const actStart = 210;
            const headSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const chartSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 13, stiffness: 110 } });
            const waveSpring = spring({ frame: Math.max(0, frame - actStart - 2 * 8), fps, config: { damping: 14, stiffness: 115 } });

            return (
              <div
                style={{
                  position: 'absolute',
                  transform: `translate3d(${Math.round(stages.act3.x)}px, ${Math.round(stages.act3.y)}px, ${Math.round(stages.act3.z)}px) scale(${act3Vis.depthScale})`,
                  opacity: act3Spring * act3Vis.opacity,
                  width: 1440,
                  height: 760,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '24px 48px',
                  direction: 'rtl',
                }}
              >
                {/* Open-Canvas SVG Constellation Arc */}
                <svg
                  width={1440}
                  height={760}
                  viewBox="0 0 1440 760"
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
                >
                  <circle
                    cx={720}
                    cy={380}
                    r={380}
                    fill="none"
                    stroke="rgba(52, 211, 153, 0.28)"
                    strokeWidth={1.5}
                    strokeDasharray="14 18"
                    strokeDashoffset={Math.round(-frame * 1.8)}
                  />
                </svg>

                {/* Staggered Telemetry Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 28,
                    transform: `translate3d(0px, ${Math.round((1 - headSpring) * -30 + microFloatY(0))}px, 0px)`,
                    opacity: headSpring,
                  }}
                >
                  <span style={{ fontSize: 32, fontWeight: 900, color: '#ecfdf5' }}>
                    {sanitizeForDisplay('پایش انرژی آزاد اتصال (ΔG) و میل پیوندی')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 18,
                      color: '#34d399',
                      fontWeight: 800,
                      padding: '8px 18px',
                      borderRadius: 999,
                      background: 'rgba(16, 185, 129, 0.16)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                    }}
                  >
                    KD: 0.14 nM · THERMODYNAMIC LOCK
                  </span>
                </div>

                {/* Kinetic Bar Chart */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - chartSpring) * 36 + microFloatY(1))}px, 0px) scale(${chartSpring})`,
                    opacity: chartSpring,
                  }}
                >
                  <KineticBarChart
                    items={[
                      { label: 'پایداری کمپلکس آنزیمی', value: 99.6, color: '#10b981', unit: '٪' },
                      { label: 'انطباق کونفورماسیونی', value: 95.8, color: '#38bdf8', unit: '٪' },
                      { label: 'روش‌های بلورنگاری پیشین', value: 68.4, color: '#f59e0b', unit: '٪' },
                    ]}
                    startFrame={220}
                    height={180}
                  />
                </div>

                {/* Animated Parametric Waveform Stream */}
                <div
                  style={{
                    marginTop: 28,
                    height: 36,
                    overflow: 'hidden',
                    transform: `translate3d(0px, ${Math.round((1 - waveSpring) * 26 + microFloatY(2))}px, 0px)`,
                    opacity: waveSpring,
                  }}
                >
                  <svg width="100%" height="36" viewBox="0 0 1340 36">
                    <ParametricWaveformStream x={0} y={18} width={1340} amplitude={12} color="#10b981" />
                  </svg>
                </div>

                <NewtonianAttractorSwarm
                  attractorX={320}
                  attractorY={-20}
                  particleCount={18}
                  theme="TECHNICAL_BLUEPRINT"
                  beatPulse={beatPulse.scalePulse}
                />
              </div>
            );
          })()}

          {/* ================================================================= */}
          {/* STAGE 4 (Z = 4800): GOLDEN BIOTECH REVELATION SEAL                */}
          {/* ================================================================= */}
          {act4Vis.visible && (() => {
            const actStart = 330;
            const badgeSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const titleSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 14, stiffness: 115 } });
            const subSpring = spring({ frame: Math.max(0, frame - actStart - 2 * 8), fps, config: { damping: 14, stiffness: 110 } });

            return (
              <div
                style={{
                  position: 'absolute',
                  transform: `translate3d(${Math.round(stages.act4.x)}px, ${Math.round(stages.act4.y)}px, ${Math.round(stages.act4.z)}px) scale(${act4Spring * act4Vis.depthScale})`,
                  opacity: act4Spring * act4Vis.opacity,
                  width: 1440,
                  height: 760,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  direction: 'rtl',
                  textAlign: 'center',
                }}
              >
                {/* Golden Radial Volumetric Glow Pool */}
                <div
                  style={{
                    position: 'absolute',
                    width: 1100,
                    height: 580,
                    background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.24) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 74%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* SVG Golden Orbital Ring */}
                <svg
                  width={1440}
                  height={760}
                  viewBox="0 0 1440 760"
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
                >
                  <circle
                    cx={720}
                    cy={380}
                    r={360}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    strokeDasharray="22 14"
                    strokeDashoffset={Math.round(-frame * 2.2)}
                    strokeOpacity={0.6}
                  />
                </svg>

                {/* Golden Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 30px',
                    borderRadius: 999,
                    background: 'rgba(245, 158, 11, 0.22)',
                    border: '1.5px solid #f59e0b',
                    color: '#fbbf24',
                    fontSize: 18,
                    fontWeight: 900,
                    marginBottom: 24,
                    transform: `translate3d(0px, ${Math.round((1 - badgeSpring) * 28 + microFloatY(0))}px, 0px) scale(${badgeSpring})`,
                    opacity: badgeSpring,
                  }}
                >
                  <span>★</span>
                  <span>{sanitizeForDisplay('استاندارد زرین بیوتکنولوژی محاسباتی')}</span>
                </div>

                {/* Hero Headline */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 34 + microFloatY(1))}px, 0px) scale(${titleSpring})`,
                    opacity: titleSpring,
                    marginBottom: 18,
                  }}
                >
                  <MaskedKineticHeadline
                    text="کشف دارو با هدایت سینمایی هوش مصنوعی"
                    highlightWords={['دارو', 'هوش']}
                    gradientColors={['#ffffff', '#fbbf24', '#f59e0b']}
                    delayFrames={340}
                    fontSize={48}
                    fontWeight={950}
                    direction="rtl"
                    style={{ justifyContent: 'center' }}
                  />
                </div>

                {/* Subtitle */}
                <p
                  style={{
                    color: '#a7f3d0',
                    fontSize: 22,
                    fontWeight: 700,
                    maxWidth: 760,
                    margin: 0,
                    transform: `translate3d(0px, ${Math.round((1 - subSpring) * 26 + microFloatY(2))}px, 0px) scale(${subSpring})`,
                    opacity: subSpring,
                  }}
                >
                  {sanitizeForDisplay('پایان آزمایش‌های زمان‌بر · غوطه‌وری در ساختار واقعیت')}
                </p>

                <NewtonianAttractorSwarm
                  attractorX={0}
                  attractorY={-40}
                  particleCount={20}
                  theme="MODERN_GLASSMORPHIC"
                  beatPulse={beatPulse.scalePulse}
                />
              </div>
            );
          })()}
        </div>
      </div>

      {/* 4. ATMOSPHERIC SHADER PARTICLES */}
      <StyleAwareAtmosphereLayer camX={camX} camY={camY} />
      <ForegroundBokehLayer camX={camX} camY={camY} />
    </div>
  );
};
