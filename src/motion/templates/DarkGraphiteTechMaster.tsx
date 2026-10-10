/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 2: DARK GRAPHITE TECH MASTER (KEYNOTE LAUNCH FILM)
 * ============================================================================
 * 
 * Inspired by TanStack AI developer-launch showreels (yihui-dev/awesome-opus5-5-videos):
 * - Dark graphite canvas with isometric CAD drafting grid
 * - 6-DOF Diagonal Cascade Camera Trajectory (45-degree angle with banking rolls)
 * - Kinetic Code Nodes, Branching Streams, and Agentic MCP Telemetry
 * - Studio electronic sound design (Cipher2.mp3 @ 124 BPM) + Frame-accurate SFX
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, Sequence, staticFile } from 'remotion';
import { GraphiteCircuitBackdrop } from '../library/GraphiteCircuitBackdrop';
import { MaskedKineticHeadline } from '../library/MaskedKineticTypography';
import { DynamicFresnelSweep } from '../library/DynamicFresnelSweep';
import { StyleAwareAtmosphereLayer } from '../library/StyleAwareAtmosphereLayer';
import { ForegroundBokehLayer } from '../library/ForegroundBokehLayer';
import { KineticBarChart } from '../library/KineticDataViz';
import { UniversalVectorMorphCard } from '../recipes/UniversalVectorMorphCard';
import { NewtonianAttractorSwarm } from '../library/NewtonianAttractorSwarm';
import { LissajousOrbit, ParametricWaveformStream } from '../library/ProceduralGenerativeMotifs';
import { UniversalCameraRig } from '../camera/UniversalCameraRig';
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

  // Entrances
  const act1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const act3Spring = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 13, stiffness: 100 } });
  const act4Spring = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 12, stiffness: 110 } });

  const stagesVectors = resolveVectorProgression('توسعه ابری هوش مصنوعی و پروتکل MCP');

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
      {/* 1. DEDICATED GRAPHITE CIRCUIT BACKDROP WITH 3D CAMERA PARALLAX */}
      <GraphiteCircuitBackdrop
        camX={camX}
        camY={camY}
        camZ={camZ}
        camRoll={camRoll}
        camPitch={camPitch}
        accentColor="#06b6d4"
        secondaryColor="#10b981"
      />

      {/* 2. 6-DOF CONTINUOUS STAGE WORLD */}
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
              translate3d(${-camX}px, ${-camY}px, ${-camZ}px)
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
          {/* ACT 1: PROMPT TERMINAL & KINETIC HOOK (0..100)                     */}
          {/* ================================================================= */}
          {act1Vis.visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${stages.act1.x}px, ${stages.act1.y}px, ${stages.act1.z}px) scale(${act1Vis.depthScale})`,
                opacity: act1Spring * act1Vis.opacity,
                width: 1380,
                height: 680,
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(9, 13, 22, 0.95) 100%)',
                border: '1.5px solid rgba(56, 189, 248, 0.35)',
                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 50px rgba(6, 182, 212, 0.2)',
                backdropFilter: 'blur(28px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 48,
                direction: 'rtl',
                textAlign: 'center',
              }}
            >
              <DynamicFresnelSweep
                camYaw={camYaw}
                camRoll={camRoll}
                camPitch={camPitch}
                borderRadius={20}
                highlightColor="rgba(56, 189, 248, 0.3)"
              />

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
                  marginBottom: 20,
                }}
              >
                <span>⚡</span>
                <span>{sanitizeForDisplay('لانچ فیلم پرچمدار · دارک-گرافیت')}</span>
              </div>

              <MaskedKineticHeadline
                text="پلتفرم ابری نسل بعد: هوش مصنوعی و ایجنت‌های مستقل"
                highlightWords={['هوش', 'مصنوعی', 'ایجنت‌های']}
                gradientColors={['#ffffff', '#38bdf8', '#06b6d4']}
                delayFrames={10}
                fontSize={48}
                fontWeight={950}
                direction="rtl"
                style={{ marginBottom: 16, justifyContent: 'center' }}
              />

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
          )}

          {/* ================================================================= */}
          {/* ACT 2: NODE BRANCHING & VECTOR STREAM (90..230)                   */}
          {/* ================================================================= */}
          {act2Vis.visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${stages.act2.x}px, ${stages.act2.y}px, ${stages.act2.z}px) scale(${act2Vis.depthScale})`,
                opacity: act2Vis.opacity,
                width: 1400,
                height: 690,
                borderRadius: 20,
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1.5px solid rgba(16, 185, 129, 0.35)',
                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(16, 185, 129, 0.15)',
                backdropFilter: 'blur(24px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ position: 'absolute', top: 22, right: 32, color: '#34d399', fontSize: 16, fontWeight: 800 }}>
                {sanitizeForDisplay('🔀 اتصالات شبکه نودها · ۲۴ پرووایدر هوش مصنوعی')}
              </div>

              <UniversalVectorMorphCard
                stages={stagesVectors}
                startFrame={90}
                durationInFrames={130}
                width={1320}
                height={560}
                glowColor="#10b981"
                theme="MODERN_GLASSMORPHIC"
              />

              <NewtonianAttractorSwarm
                attractorX={-280}
                attractorY={20}
                particleCount={18}
                theme="NEO_BRUTALIST"
                beatPulse={beatPulse.scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* ACT 3: TECHNICAL TELEMETRY & BAR CHART (210..350)                 */}
          {/* ================================================================= */}
          {act3Vis.visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${stages.act3.x}px, ${stages.act3.y}px, ${stages.act3.z}px) scale(${act3Vis.depthScale})`,
                opacity: act3Spring * act3Vis.opacity,
                width: 1380,
                height: 680,
                borderRadius: 20,
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1.5px solid rgba(6, 182, 212, 0.4)',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 60px rgba(6, 182, 212, 0.25)',
                padding: '36px 44px',
                direction: 'rtl',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: '#f8fafc' }}>
                  {sanitizeForDisplay('کنسول تله‌متری و تحلیل کارایی هسته')}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 15, color: '#38bdf8' }}>
                  LATENCY: 1.2ms · PERSISTENT
                </span>
              </div>

              <KineticBarChart
                items={[
                  { label: 'توان پردازش موازی', value: 99.8, color: '#06b6d4', unit: '٪' },
                  { label: 'پایداری کانتکست ایجنت', value: 97.4, color: '#10b981', unit: '٪' },
                  { label: 'معماری سنتی وب', value: 58.2, color: '#f59e0b', unit: '٪' },
                ]}
                startFrame={220}
                height={160}
              />

              <div style={{ position: 'absolute', bottom: 16, left: 32, right: 32, height: 30, overflow: 'hidden' }}>
                <svg width="100%" height="30" viewBox="0 0 1250 30">
                  <ParametricWaveformStream x={0} y={15} width={1250} amplitude={10} color="#06b6d4" />
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
          )}

          {/* ================================================================= */}
          {/* ACT 4: KEYNOTE REVEAL & VERIFICATION SEAL (330..450)              */}
          {/* ================================================================= */}
          {act4Vis.visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${stages.act4.x}px, ${stages.act4.y}px, ${stages.act4.z}px) scale(${act4Spring * act4Vis.depthScale})`,
                opacity: act4Spring * act4Vis.opacity,
                width: 1380,
                height: 680,
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
                border: '2px solid rgba(56, 189, 248, 0.6)',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 70px rgba(56, 189, 248, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 48,
                direction: 'rtl',
                textAlign: 'center',
              }}
            >
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
                }}
              >
                <span>✔</span>
                <span>{sanitizeForDisplay('تأییدیه نهایی تراز کلاد اوپوس ۵.۵')}</span>
              </div>

              <MaskedKineticHeadline
                text="آماده برای دپلوی و ورود به جریان تولید"
                highlightWords={['تولید', 'دپلوی']}
                gradientColors={['#ffffff', '#38bdf8', '#06b6d4']}
                delayFrames={340}
                fontSize={46}
                fontWeight={950}
                direction="rtl"
                style={{ marginBottom: 18, justifyContent: 'center' }}
              />

              <p style={{ color: '#94a3b8', fontSize: 20, fontWeight: 700, maxWidth: 700, margin: 0 }}>
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
          )}
        </div>
      </div>

      {/* 3. ATMOSPHERIC SHADER PARTICLES */}
      <StyleAwareAtmosphereLayer camX={camX} camY={camY} />
      <ForegroundBokehLayer camX={camX} camY={camY} />

      {/* 4. STUDIO AUDIO LAYER (Cipher2.mp3 + SCENARIO SFX) */}
      <Audio src={staticFile('music/Cipher2.mp3')} volume={0.75} />

      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('sfx/remotion_whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={90} durationInFrames={35}>
        <Audio src={staticFile('sfx/remotion_whip.wav')} volume={0.75} />
      </Sequence>
      <Sequence from={210} durationInFrames={40}>
        <Audio src={staticFile('sfx/remotion_whoosh.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={270} durationInFrames={50}>
        <Audio src={staticFile('sfx/remotion_ding.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={330} durationInFrames={45}>
        <Audio src={staticFile('sfx/remotion_shutter.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={350} durationInFrames={50}>
        <Audio src={staticFile('sfx/bass-hit-futuristic.mp3')} volume={0.65} />
      </Sequence>
    </div>
  );
};
