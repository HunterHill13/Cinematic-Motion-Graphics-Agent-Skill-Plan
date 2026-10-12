/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 2: DARK GRAPHITE TECH MASTER (KEYNOTE LAUNCH FILM)
 * ============================================================================
 *
 * Inspired by TanStack AI developer-launch showreels (yihui-dev/awesome-opus5-5-videos):
 * - Dark graphite open canvas with isometric CAD drafting grid (Zero outer box wrappers)
 * - 6-DOF Diagonal Cascade Camera Trajectory (45-degree angle with banking rolls)
 * - Open-Canvas SVG Orbital Rings & Animated strokeDashoffset Energy Conduits
 * - Independent staggered spring entrances & continuous floating micro-motion per child
 * - Subtle Videolancer Ultimate SFX via UniversalSoundDirector (<= 0.12 gain)
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { GraphiteCircuitBackdrop } from '../library/GraphiteCircuitBackdrop';
import { MaskedKineticHeadline } from '../library/MaskedKineticTypography';
import { StyleAwareAtmosphereLayer } from '../library/StyleAwareAtmosphereLayer';
import { ForegroundBokehLayer } from '../library/ForegroundBokehLayer';
import { KineticBarChart } from '../library/KineticDataViz';
import { UniversalVectorMorphCard } from '../recipes/UniversalVectorMorphCard';
import { NewtonianAttractorSwarm } from '../library/NewtonianAttractorSwarm';
import { ParametricWaveformStream } from '../library/ProceduralGenerativeMotifs';
import { UniversalCameraRig } from '../camera/UniversalCameraRig';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { resolveVectorProgression } from '../library/DynamicVectorCatalog';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';

export const DARK_GRAPHITE_DURATION = 450; // 15.0s @ 30 FPS
export const DARK_GRAPHITE_FPS = 30;
export const DARK_GRAPHITE_WIDTH = 1920;
export const DARK_GRAPHITE_HEIGHT = 1080;

export const DarkGraphiteTechMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // 6-DOF Diagonal Cascade Camera Rig
  const trajectoryDef = UniversalCameraRig.getTrajectory('DIAGONAL_CASCADE');
  const cam = trajectoryDef.computeCamera(frame, DARK_GRAPHITE_DURATION);
  const { camX, camY, camZ, camPitch, camYaw, camRoll } = cam;

  // Stages coordinates & dynamic visibility
  const stages = trajectoryDef.stages;
  const act1Vis = trajectoryDef.getStageVisibility(1, cam);
  const act2Vis = trajectoryDef.getStageVisibility(2, cam);
  const act3Vis = trajectoryDef.getStageVisibility(3, cam);
  const act4Vis = trajectoryDef.getStageVisibility(4, cam);

  // Stage-level springs
  const act1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const act2Spring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 13, stiffness: 100 } });
  const act3Spring = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 13, stiffness: 100 } });
  const act4Spring = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 12, stiffness: 110 } });

  const stagesVectors = resolveVectorProgression('توسعه ابری هوش مصنوعی و پروتکل MCP');

  const microFloatY = (idx: number, amp = 6) =>
    Math.round(Math.sin((frame + idx * 18) * 0.05) * amp);

  return (
    <div
      style={{
        position: 'relative',
        width: DARK_GRAPHITE_WIDTH,
        height: DARK_GRAPHITE_HEIGHT,
        backgroundColor: '#090d16',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
      }}
    >
      {/* 1. SUBTLE STUDIO AUDIO LAYER VIA UNIVERSAL SOUND DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Cipher2.mp3"
        bgmVolume={0.14}
        themeId="DARK_GRAPHITE_TECH"
      />

      {/* 2. DEDICATED GRAPHITE CIRCUIT BACKDROP WITH 3D CAMERA PARALLAX */}
      <GraphiteCircuitBackdrop
        camX={camX}
        camY={camY}
        camZ={camZ}
        camRoll={camRoll}
        camPitch={camPitch}
        accentColor="#06b6d4"
        secondaryColor="#10b981"
      />

      {/* 3. 6-DOF CONTINUOUS OPEN-CANVAS STAGE WORLD (ZERO OUTER BOX WRAPPERS) */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          perspective: 1200,
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
          {/* ACT 1: OPEN-CANVAS PROMPT TERMINAL & KINETIC HOOK (0..100)         */}
          {/* ================================================================= */}
          {act1Vis.visible && (() => {
            const actStart = 0;
            const badgeSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const titleSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 14, stiffness: 115 } });
            const subSpring = spring({ frame: Math.max(0, frame - actStart - 2 * 8), fps, config: { damping: 14, stiffness: 110 } });
            const conduitOffset = Math.round(interpolate(frame - actStart, [0, 45], [640, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

            const act1Nodes = [
              { label: 'هسته ایجنت مستقل', metric: '0.4ms', color: '#38bdf8' },
              { label: 'پروتکل کانتکست MCP', metric: '24x', color: '#06b6d4' },
              { label: 'کلاستر توزیع‌شده', metric: '99.99%', color: '#10b981' },
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
                {/* Open-Canvas Volumetric Glow Pool */}
                <div
                  style={{
                    position: 'absolute',
                    width: 980,
                    height: 540,
                    background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.18) 0%, rgba(16, 185, 129, 0.06) 45%, transparent 72%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Open-Canvas SVG Constellation & Orbital Backdrop */}
                <svg
                  width={1440}
                  height={760}
                  viewBox="0 0 1440 760"
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
                >
                  <circle
                    cx={720}
                    cy={380}
                    r={310}
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.28)"
                    strokeWidth={1.5}
                    strokeDasharray="18 14"
                    strokeDashoffset={Math.round(-frame * 1.8)}
                  />
                  <circle
                    cx={720}
                    cy={380}
                    r={420}
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.2)"
                    strokeWidth={1.2}
                    strokeDasharray="10 22"
                    strokeDashoffset={Math.round(frame * 1.4)}
                  />
                  <path
                    d="M 240 540 C 480 420, 960 420, 1200 540"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    strokeDasharray={640}
                    strokeDashoffset={conduitOffset}
                    strokeOpacity={0.45}
                  />
                </svg>

                {/* Eyebrow Pill (Independent Spring + Micro-Motion) */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 22px',
                    borderRadius: 999,
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#38bdf8',
                    fontSize: 16,
                    fontWeight: 800,
                    marginBottom: 22,
                    transform: `translate3d(0px, ${Math.round((1 - badgeSpring) * 28 + microFloatY(0))}px, 0px) scale(${badgeSpring})`,
                    opacity: badgeSpring,
                  }}
                >
                  <span>⚡</span>
                  <span>{sanitizeForDisplay('لانچ فیلم پرچمدار · دارک-گرافیت')}</span>
                </div>

                {/* Hero Headline (Independent Spring + Micro-Motion) */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 34 + microFloatY(1))}px, 0px) scale(${titleSpring})`,
                    opacity: titleSpring,
                    marginBottom: 16,
                  }}
                >
                  <MaskedKineticHeadline
                    text="پلتفرم ابری نسل بعد: هوش مصنوعی و ایجنت‌های مستقل"
                    highlightWords={['هوش', 'مصنوعی', 'ایجنت‌های']}
                    gradientColors={['#ffffff', '#38bdf8', '#06b6d4']}
                    delayFrames={10}
                    fontSize={48}
                    fontWeight={950}
                    direction="rtl"
                    style={{ justifyContent: 'center' }}
                  />
                </div>

                {/* Subtitle (Independent Spring + Micro-Motion) */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - subSpring) * 30 + microFloatY(2))}px, 0px) scale(${subSpring})`,
                    opacity: subSpring,
                    marginBottom: 38,
                  }}
                >
                  <MaskedKineticHeadline
                    text="معماری توزیع‌شده با پاسخ‌دهی میکروثانیه‌ای بر بستر پروتکل مدل کانتکست (MCP)"
                    highlightWords={['پروتکل']}
                    delayFrames={24}
                    fontSize={22}
                    fontWeight={700}
                    color="#94a3b8"
                    direction="rtl"
                    style={{ maxWidth: 900, justifyContent: 'center' }}
                  />
                </div>

                {/* Staggered Open-Canvas Constellation Nodes */}
                <div style={{ display: 'flex', gap: 36, alignItems: 'center', justifyContent: 'center' }}>
                  {act1Nodes.map((node, idx) => (
                    <div
                      key={node.label}
                      style={{
                        padding: '14px 26px',
                        borderRadius: 999,
                        background: 'rgba(15, 23, 42, 0.55)',
                        border: `1px solid ${node.color}55`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        transform: `translate3d(0px, ${Math.round(
                          (1 - spring({ frame: Math.max(0, frame - actStart - 20 - idx * 8), fps, config: { damping: 13, stiffness: 120 } })) * 36 +
                            Math.sin((frame + idx * 18) * 0.05) * 6
                        )}px, 0px)`,
                        opacity: spring({ frame: Math.max(0, frame - actStart - 20 - idx * 8), fps, config: { damping: 13, stiffness: 120 } }),
                      }}
                    >
                      <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, color: node.color }}>
                        {node.metric}
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#e2e8f0' }}>
                        {sanitizeForDisplay(node.label)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ================================================================= */}
          {/* ACT 2: OPEN-CANVAS NODE BRANCHING & VECTOR STREAM (90..230)        */}
          {/* ================================================================= */}
          {act2Vis.visible && (() => {
            const actStart = 90;
            const pillSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const cardSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 13, stiffness: 110 } });
            const conduitOffset = Math.round(interpolate(frame - actStart, [0, 50], [720, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

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
                {/* Open-Canvas SVG Orbital & Conduit Backdrop */}
                <svg
                  width={1440}
                  height={760}
                  viewBox="0 0 1440 760"
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
                >
                  <circle
                    cx={720}
                    cy={380}
                    r={350}
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.26)"
                    strokeWidth={1.6}
                    strokeDasharray="16 14"
                    strokeDashoffset={Math.round(-frame * 2)}
                  />
                  <path
                    d="M 160 380 C 440 160, 1000 600, 1280 380"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray={720}
                    strokeDashoffset={conduitOffset}
                    strokeOpacity={0.45}
                  />
                </svg>

                {/* Staggered Floating Eyebrow Pill (Replaces Corner HUD) */}
                <div
                  style={{
                    padding: '8px 24px',
                    borderRadius: 999,
                    background: 'rgba(16, 185, 129, 0.16)',
                    border: '1px solid rgba(16, 185, 129, 0.45)',
                    color: '#34d399',
                    fontSize: 17,
                    fontWeight: 800,
                    marginBottom: 20,
                    transform: `translate3d(0px, ${Math.round((1 - pillSpring) * -28 + microFloatY(0))}px, 0px) scale(${pillSpring})`,
                    opacity: pillSpring,
                  }}
                >
                  {sanitizeForDisplay('🔀 اتصالات شبکه نودها · ۲۴ پرووایدر هوش مصنوعی')}
                </div>

                {/* Floating Vector Morph Stream */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - cardSpring) * 36 + microFloatY(1))}px, 0px) scale(${cardSpring})`,
                    opacity: cardSpring,
                  }}
                >
                  <UniversalVectorMorphCard
                    stages={stagesVectors}
                    startFrame={90}
                    durationInFrames={130}
                    width={1320}
                    height={540}
                    glowColor="#10b981"
                    theme="MODERN_GLASSMORPHIC"
                  />
                </div>

                <NewtonianAttractorSwarm
                  attractorX={-280}
                  attractorY={20}
                  particleCount={18}
                  theme="NEO_BRUTALIST"
                  beatPulse={beatPulse.scalePulse}
                />
              </div>
            );
          })()}

          {/* ================================================================= */}
          {/* ACT 3: OPEN-CANVAS TECHNICAL TELEMETRY & BAR CHART (210..350)     */}
          {/* ================================================================= */}
          {act3Vis.visible && (() => {
            const actStart = 210;
            const headSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 14, stiffness: 120 } });
            const chartSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 13, stiffness: 110 } });
            const waveSpring = spring({ frame: Math.max(0, frame - actStart - 2 * 8), fps, config: { damping: 14, stiffness: 115 } });
            const conduitOffset = Math.round(interpolate(frame - actStart, [0, 45], [680, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

            const telemetryChips = [
              { title: 'تاخیر شبکه', value: '1.2ms', color: '#38bdf8' },
              { title: 'نرخ انتقال کانتکست', value: '14.8 GB/s', color: '#10b981' },
              { title: 'توازن بار خودکار', value: 'ACTIVE', color: '#f59e0b' },
            ];

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
                {/* Open-Canvas SVG Constellation & Orbital Ring */}
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
                    stroke="rgba(6, 182, 212, 0.24)"
                    strokeWidth={1.5}
                    strokeDasharray="20 12"
                    strokeDashoffset={Math.round(-frame * 2.1)}
                  />
                  <path
                    d="M 180 200 C 520 120, 920 640, 1260 560"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    strokeDasharray={680}
                    strokeDashoffset={conduitOffset}
                    strokeOpacity={0.4}
                  />
                </svg>

                {/* Floating Header Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 28,
                    transform: `translate3d(0px, ${Math.round((1 - headSpring) * -28 + microFloatY(0))}px, 0px) scale(${headSpring})`,
                    opacity: headSpring,
                  }}
                >
                  <span style={{ fontSize: 30, fontWeight: 900, color: '#f8fafc', textShadow: '0 6px 24px rgba(0,0,0,0.85)' }}>
                    {sanitizeForDisplay('کنسول تله‌متری و تحلیل کارایی هسته')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 15,
                      color: '#38bdf8',
                      padding: '6px 18px',
                      borderRadius: 999,
                      background: 'rgba(6, 182, 212, 0.14)',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                    }}
                  >
                    LATENCY: 1.2ms · PERSISTENT
                  </span>
                </div>

                {/* Floating Telemetry Nodes Row */}
                <div style={{ display: 'flex', gap: 24, marginBottom: 28 }}>
                  {telemetryChips.map((chip, idx) => (
                    <div
                      key={chip.title}
                      style={{
                        flex: 1,
                        padding: '14px 22px',
                        borderRadius: 18,
                        background: 'rgba(15, 23, 42, 0.55)',
                        border: `1px solid ${chip.color}55`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transform: `translate3d(0px, ${Math.round(
                          (1 - spring({ frame: Math.max(0, frame - actStart - 8 - idx * 8), fps, config: { damping: 14, stiffness: 120 } })) * 30 +
                            Math.sin((frame + idx * 18) * 0.05) * 6
                        )}px, 0px)`,
                        opacity: spring({ frame: Math.max(0, frame - actStart - 8 - idx * 8), fps, config: { damping: 14, stiffness: 120 } }),
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#cbd5e1' }}>
                        {sanitizeForDisplay(chip.title)}
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, color: chip.color }}>
                        {chip.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Floating Kinetic Bar Chart */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - chartSpring) * 34 + microFloatY(2))}px, 0px) scale(${chartSpring})`,
                    opacity: chartSpring,
                  }}
                >
                  <KineticBarChart
                    items={[
                      { label: 'توان پردازش موازی', value: 99.8, color: '#06b6d4', unit: '٪' },
                      { label: 'پایداری کانتکست ایجنت', value: 97.4, color: '#10b981', unit: '٪' },
                      { label: 'معماری سنتی وب', value: 58.2, color: '#f59e0b', unit: '٪' },
                    ]}
                    startFrame={220}
                    height={160}
                  />
                </div>

                {/* Floating Parametric Waveform Stream */}
                <div
                  style={{
                    marginTop: 24,
                    height: 36,
                    overflow: 'hidden',
                    transform: `translate3d(0px, ${Math.round((1 - waveSpring) * 24 + microFloatY(3))}px, 0px)`,
                    opacity: waveSpring,
                  }}
                >
                  <svg width="100%" height="36" viewBox="0 0 1250 36">
                    <ParametricWaveformStream x={0} y={18} width={1250} amplitude={10} color="#06b6d4" />
                  </svg>
                </div>

                <NewtonianAttractorSwarm
                  attractorX={320}
                  attractorY={-20}
                  particleCount={16}
                  theme="TECHNICAL_BLUEPRINT"
                  beatPulse={beatPulse.scalePulse}
                />
              </div>
            );
          })()}

          {/* ================================================================= */}
          {/* ACT 4: OPEN-CANVAS KEYNOTE REVEAL & VERIFICATION SEAL (330..450)  */}
          {/* ================================================================= */}
          {act4Vis.visible && (() => {
            const actStart = 330;
            const sealSpring = spring({ frame: Math.max(0, frame - actStart - 0 * 8), fps, config: { damping: 13, stiffness: 120 } });
            const headSpring = spring({ frame: Math.max(0, frame - actStart - 1 * 8), fps, config: { damping: 14, stiffness: 115 } });
            const subSpring = spring({ frame: Math.max(0, frame - actStart - 2 * 8), fps, config: { damping: 14, stiffness: 110 } });
            const conduitOffset = Math.round(interpolate(frame - actStart, [0, 45], [640, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

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
                {/* Open-Canvas Volumetric Finale Glow */}
                <div
                  style={{
                    position: 'absolute',
                    width: 960,
                    height: 520,
                    background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, rgba(16, 185, 129, 0.1) 45%, transparent 72%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Open-Canvas SVG Orbital & Conduit Backdrop */}
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
                    stroke="rgba(56, 189, 248, 0.32)"
                    strokeWidth={1.8}
                    strokeDasharray="22 14"
                    strokeDashoffset={Math.round(-frame * 2.2)}
                  />
                  <path
                    d="M 260 380 C 520 200, 920 560, 1180 380"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray={640}
                    strokeDashoffset={conduitOffset}
                    strokeOpacity={0.5}
                  />
                </svg>

                {/* Staggered Floating Verification Seal */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 28px',
                    borderRadius: 999,
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1.5px solid #10b981',
                    color: '#34d399',
                    fontSize: 18,
                    fontWeight: 900,
                    marginBottom: 24,
                    transform: `translate3d(0px, ${Math.round((1 - sealSpring) * -28 + microFloatY(0))}px, 0px) scale(${sealSpring})`,
                    opacity: sealSpring,
                  }}
                >
                  <span>✔</span>
                  <span>{sanitizeForDisplay('تأییدیه نهایی تراز کلاد اوپوس ۵.۵')}</span>
                </div>

                {/* Staggered Floating Headline */}
                <div
                  style={{
                    transform: `translate3d(0px, ${Math.round((1 - headSpring) * 32 + microFloatY(1))}px, 0px) scale(${headSpring})`,
                    opacity: headSpring,
                    marginBottom: 18,
                  }}
                >
                  <MaskedKineticHeadline
                    text="آماده برای دپلوی و ورود به جریان تولید"
                    highlightWords={['تولید', 'دپلوی']}
                    gradientColors={['#ffffff', '#38bdf8', '#06b6d4']}
                    delayFrames={340}
                    fontSize={46}
                    fontWeight={950}
                    direction="rtl"
                    style={{ justifyContent: 'center' }}
                  />
                </div>

                {/* Staggered Floating Subtitle */}
                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: 20,
                    fontWeight: 700,
                    maxWidth: 700,
                    margin: 0,
                    transform: `translate3d(0px, ${Math.round((1 - subSpring) * 26 + microFloatY(2))}px, 0px) scale(${subSpring})`,
                    opacity: subSpring,
                  }}
                >
                  {sanitizeForDisplay('خلق شاهکارهای موشن‌گرافیک سینمایی با کُدنویسی زنده در آنتی‌گرویتی')}
                </p>

                <NewtonianAttractorSwarm
                  attractorX={0}
                  attractorY={-40}
                  particleCount={18}
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
