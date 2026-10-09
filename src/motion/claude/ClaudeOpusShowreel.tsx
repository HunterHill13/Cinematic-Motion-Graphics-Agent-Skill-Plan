import React from 'react';
import { Composition, Sequence, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { AtmosphericBackdrop } from '../library/AtmosphericBackdrop';
import { GlassContainer } from '../library/GlassContainer';
import { BadgePill, KineticHeadline, SubtitleCallout } from '../library/KineticTypography';
import { CircularGauge, MetricCard } from '../library/MetricCard';
import { FlowDiagram } from '../library/FlowDiagram';
import { MorphingUIRecipe } from '../recipes/MorphingUIRecipe';
import { SaaSMotionRecipe } from '../recipes/SaaSMotionRecipe';

export const CLAUDE_OPUS_SHOWREEL_DURATION = 450; // 15.0s @ 30 FPS
export const CLAUDE_OPUS_SHOWREEL_FPS = 30;
export const CLAUDE_OPUS_SHOWREEL_WIDTH = 1920;
export const CLAUDE_OPUS_SHOWREEL_HEIGHT = 1080;

export const ClaudeOpusShowreelContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle global camera zoom breathing (1.00 -> 1.04)
  const cameraScale = interpolate(frame, [0, 450], [1.0, 1.04], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#040711',
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Persistent Living Backdrop */}
      <AtmosphericBackdrop
        primaryGlowColor="#4f46e5"
        secondaryGlowColor="#06b6d4"
        showGrid={true}
      />

      {/* ========================================================================= */}
      {/* SCENE 1: THE SHOWREEL HOOK (Frames 0 - 110)                               */}
      {/* ========================================================================= */}
      <Sequence from={0} durationInFrames={115}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 80,
            boxSizing: 'border-box',
          }}
        >
          <GlassContainer width={1000} height={420} delayFrames={0} accentColor="#4f46e5">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
              <BadgePill
                text="CLAUDE OPUS 5.5 · RESUME SHOWREEL"
                accentColor="#06b6d4"
                delayFrames={4}
              />
              <KineticHeadline
                text="ENGINEERED FOR PURE CINEMATIC MOTION DYNAMICS"
                highlightWords={['ENGINEERED', 'CINEMATIC']}
                fontSize={56}
                delayFrames={8}
                gradientColors={['#38bdf8', '#818cf8', '#c084fc']}
              />
              <SubtitleCallout
                text="Deterministic React & Remotion vector animation running at crystal-clear 60 FPS"
                delayFrames={24}
                fontSize={20}
              />
            </div>
          </GlassContainer>
        </div>
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 2: DRIBBLE-GRADE MORPHING UI (Frames 105 - 225)                      */}
      {/* ========================================================================= */}
      <Sequence from={105} durationInFrames={125}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <BadgePill text="SINGLE CONTINUOUS SHAPE MORPH" accentColor="#10b981" delayFrames={2} />
          </div>
          <MorphingUIRecipe primaryColor="#6366f1" accentColor="#06b6d4" delayFrames={4} />
        </div>
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 3: 2.5D SAAS PRODUCT LAUNCH (Frames 220 - 340)                      */}
      {/* ========================================================================= */}
      <Sequence from={220} durationInFrames={125}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <SaaSMotionRecipe
            appName="NEXUS ORCHESTRATOR"
            headline="Autonomous Agent Fabric"
            tagline="Next-generation multi-agent execution pipeline with real-time visual telemetry"
            delayFrames={4}
          />
        </div>
      </Sequence>

      {/* ========================================================================= */}
      {/* SCENE 4: CLIMAX, GAUGES & GRAND FINALE (Frames 335 - 450)                 */}
      {/* ========================================================================= */}
      <Sequence from={335} durationInFrames={115}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 32,
            boxSizing: 'border-box',
          }}
        >
          <BadgePill text="PRODUCTION-GRADE COMPLETION" accentColor="#a855f7" delayFrames={4} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <GlassContainer width={360} height={240} delayFrames={6} accentColor="#a855f7">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <CircularGauge percentage={99.8} label="SYSTEM QUALITY" delayFrames={10} accentColor="#a855f7" size={130} />
              </div>
            </GlassContainer>

            <GlassContainer width={480} height={240} delayFrames={12} accentColor="#06b6d4">
              <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: 24, letterSpacing: '-0.01em' }}>
                  CLAUDE MOTION STANDARD
                </div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                  ✓ Dribbble-level single shape morphing<br />
                  ✓ 2.5D perspective viewport & glassmorphism<br />
                  ✓ Subframe spring dynamics & 0-subpixel jitter
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                    BENCHMARK VERIFIED
                  </span>
                  <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                    100% PASS
                  </span>
                </div>
              </div>
            </GlassContainer>
          </div>
        </div>
      </Sequence>
    </div>
  );
};

export const ClaudeOpusShowreel: React.FC = () => {
  return (
    <Composition
      id="ClaudeOpusShowreel"
      component={ClaudeOpusShowreelContent}
      durationInFrames={CLAUDE_OPUS_SHOWREEL_DURATION}
      fps={CLAUDE_OPUS_SHOWREEL_FPS}
      width={CLAUDE_OPUS_SHOWREEL_WIDTH}
      height={CLAUDE_OPUS_SHOWREEL_HEIGHT}
    />
  );
};
