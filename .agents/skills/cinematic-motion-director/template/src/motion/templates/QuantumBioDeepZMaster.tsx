/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 4: QUANTUM & BIO DEEP-Z MASTER (TRUE 3D PUSH-IN DIVE)
 * ============================================================================
 * 
 * Implements true 3D spatial penetration through depth (Z-axis):
 * - Stages are situated behind each other in space (Z1=0 -> Z2=1600 -> Z3=3200 -> Z4=4800)
 * - Camera continuously accelerates forward (Dolly-In / Push-In)
 * - Preceding stages expand in perspective and dissolve, revealing the deeper layer
 * - Atmospheric bio-luminescent particles, Lissajous orbits, and DNA helix vectors
 * - Soundtrack: Brain_Dance.mp3 @ 124 BPM + Deep impact SFX
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, Sequence, staticFile } from 'remotion';
import { BioluminescentAbyssBackdrop } from '../library/BioluminescentAbyssBackdrop';
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

  // Spring entrances
  const act1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 95 } });
  const act2Spring = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 13, stiffness: 100 } });
  const act3Spring = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 13, stiffness: 100 } });
  const act4Spring = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 12, stiffness: 110 } });

  const bioVectors = resolveVectorProgression('توالی ژنومیک هلیکس DNA و زیست‌شناسی مولکولی');

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
      {/* 1. DEDICATED BIOLUMINESCENT ABYSS BACKDROP WITH DEEP-Z TUNNEL CAMERA */}
      <BioluminescentAbyssBackdrop
        camX={camX}
        camY={camY}
        camZ={camZ}
        camRoll={camRoll}
        camPitch={camPitch}
        glowColorPrimary="#10b981"
        glowColorSecondary="#06b6d4"
      />

      {/* 2. PERSISTENT 3D TUNNEL WORLD */}
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
          {/* STAGE 1 (Z = 0): CELLULAR MEMBRANE & PROMPT HERO                  */}
          {/* ================================================================= */}
          {act1Vis.visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${stages.act1.x}px, ${stages.act1.y}px, ${stages.act1.z}px) scale(${act1Vis.depthScale})`,
                opacity: act1Spring * act1Vis.opacity,
                width: 1380,
                height: 680,
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.85) 0%, rgba(2, 44, 34, 0.95) 100%)',
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 60px rgba(16, 185, 129, 0.25)',
                backdropFilter: 'blur(32px)',
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
                borderRadius={24}
                highlightColor="rgba(16, 185, 129, 0.35)"
              />

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 22px',
                  borderRadius: 999,
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10b981',
                  color: '#6ee7b7',
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 20,
                }}
              >
                <span>🧬</span>
                <span>{sanitizeForDisplay('بیوتکنولوژی و ژنتیک محاسباتی · نفوذ سه‌بعدی')}</span>
              </div>

              <MaskedKineticHeadline
                text="شبیه‌سازی بیوفیزیکی توالی DNA و تاشدگی پروتئین"
                highlightWords={['بیوفیزیکی', 'پروتئین', 'DNA']}
                gradientColors={['#ffffff', '#6ee7b7', '#10b981']}
                delayFrames={10}
                fontSize={48}
                fontWeight={950}
                direction="rtl"
                style={{ marginBottom: 16, justifyContent: 'center' }}
              />

              <MaskedKineticHeadline
                text="سفر ممتد دوربین به عمق ساختار مولکولی و پایش مکانیسم‌های آنزیمی بدون کات"
                highlightWords={['مولکولی']}
                delayFrames={24}
                fontSize={22}
                fontWeight={700}
                color="#a7f3d0"
                direction="rtl"
                style={{ maxWidth: 900, justifyContent: 'center' }}
              />

              <NewtonianAttractorSwarm
                attractorX={0}
                attractorY={0}
                particleCount={18}
                theme="MODERN_GLASSMORPHIC"
                beatPulse={beatPulse.scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* STAGE 2 (Z = 1600): ENZYME BINDING CORE & VECTOR MORPH            */}
          {/* ================================================================= */}
          {act2Vis.visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${stages.act2.x}px, ${stages.act2.y}px, ${stages.act2.z}px) scale(${act2Vis.depthScale})`,
                opacity: act2Spring * act2Vis.opacity,
                width: 1400,
                height: 690,
                borderRadius: 24,
                background: 'rgba(2, 44, 34, 0.85)',
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 60px rgba(245, 158, 11, 0.25)',
                backdropFilter: 'blur(28px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ position: 'absolute', top: 22, right: 32, color: '#fbbf24', fontSize: 16, fontWeight: 800 }}>
                {sanitizeForDisplay('🔬 پیوند لیگاند با پاکت فعال آنزیم · مورفینگ برداری')}
              </div>

              {/* Lissajous Gold Ribbon */}
              <svg width={1380} height={650} style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
                <LissajousOrbit cx={690} cy={325} size={540} color="#f59e0b" glowColor="rgba(245, 158, 11, 0.4)" />
              </svg>

              <UniversalVectorMorphCard
                stages={bioVectors}
                startFrame={90}
                durationInFrames={130}
                width={1320}
                height={560}
                glowColor="#10b981"
                theme="MODERN_GLASSMORPHIC"
              />

              <NewtonianAttractorSwarm
                attractorX={-300}
                attractorY={30}
                particleCount={20}
                theme="STOP_MOTION_PAPER"
                beatPulse={beatPulse.scalePulse}
              />
            </div>
          )}

          {/* ================================================================= */}
          {/* STAGE 3 (Z = 3200): BIO-TELEMETRY & BINDING AFFINITY              */}
          {/* ================================================================= */}
          {act3Vis.visible && (
            <div
              style={{
                position: 'absolute',
                transform: `translate3d(${stages.act3.x}px, ${stages.act3.y}px, ${stages.act3.z}px) scale(${act3Vis.depthScale})`,
                opacity: act3Spring * act3Vis.opacity,
                width: 1380,
                height: 680,
                borderRadius: 24,
                background: 'rgba(6, 78, 59, 0.92)',
                border: '1.5px solid rgba(52, 211, 153, 0.45)',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 70px rgba(16, 185, 129, 0.3)',
                padding: '36px 44px',
                direction: 'rtl',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: '#ecfdf5' }}>
                  {sanitizeForDisplay('پایش انرژی آزاد اتصال (ΔG) و میل پیوندی')}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 16, color: '#34d399', fontWeight: 800 }}>
                  KD: 0.14 nM · THERMODYNAMIC LOCK
                </span>
              </div>

              <KineticBarChart
                items={[
                  { label: 'پایداری کمپلکس آنزیمی', value: 99.6, color: '#10b981', unit: '٪' },
                  { label: 'انطباق کونفورماسیونی', value: 95.8, color: '#38bdf8', unit: '٪' },
                  { label: 'روش‌های بلورنگاری پیشین', value: 68.4, color: '#f59e0b', unit: '٪' },
                ]}
                startFrame={220}
                height={160}
              />

              <div style={{ position: 'absolute', bottom: 16, left: 32, right: 32, height: 30, overflow: 'hidden' }}>
                <svg width="100%" height="30" viewBox="0 0 1250 30">
                  <ParametricWaveformStream x={0} y={15} width={1250} amplitude={10} color="#10b981" />
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
          )}

          {/* ================================================================= */}
          {/* STAGE 4 (Z = 4800): GOLDEN BIOTECH REVELATION SEAL                */}
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
                background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.98) 0%, rgba(2, 44, 34, 0.98) 100%)',
                border: '2.5px solid #f59e0b',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 80px rgba(245, 158, 11, 0.4)',
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
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1.5px solid #f59e0b',
                  color: '#fbbf24',
                  fontSize: 18,
                  fontWeight: 900,
                  marginBottom: 24,
                }}
              >
                <span>★</span>
                <span>{sanitizeForDisplay('استاندارد زرین بیوتکنولوژی محاسباتی')}</span>
              </div>

              <MaskedKineticHeadline
                text="کشف دارو با هدایت سینمایی هوش مصنوعی"
                highlightWords={['دارو', 'هوش']}
                gradientColors={['#ffffff', '#fbbf24', '#f59e0b']}
                delayFrames={340}
                fontSize={46}
                fontWeight={950}
                direction="rtl"
                style={{ marginBottom: 18, justifyContent: 'center' }}
              />

              <p style={{ color: '#a7f3d0', fontSize: 20, fontWeight: 700, maxWidth: 700, margin: 0 }}>
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
          )}
        </div>
      </div>

      {/* 3. ATMOSPHERIC SHADER PARTICLES */}
      <StyleAwareAtmosphereLayer camX={camX} camY={camY} />
      <ForegroundBokehLayer camX={camX} camY={camY} />

      {/* 4. NATIVE AUDIO (Brain_Dance.mp3 + SCENARIO SFX) */}
      <Audio src={staticFile('music/Brain_Dance.mp3')} volume={0.8} />

      <Sequence from={5} durationInFrames={35}>
        <Audio src={staticFile('sfx/remotion_whoosh.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={90} durationInFrames={40}>
        <Audio src={staticFile('sfx/remotion_whip.wav')} volume={0.75} />
      </Sequence>
      <Sequence from={210} durationInFrames={45}>
        <Audio src={staticFile('sfx/remotion_whoosh.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={270} durationInFrames={50}>
        <Audio src={staticFile('sfx/remotion_ding.wav')} volume={0.85} />
      </Sequence>
      <Sequence from={330} durationInFrames={45}>
        <Audio src={staticFile('sfx/remotion_shutter.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={350} durationInFrames={50}>
        <Audio src={staticFile('sfx/bass-hit-futuristic.mp3')} volume={0.7} />
      </Sequence>
    </div>
  );
};
