/**
 * ============================================================================
 * CLAUDE OPUS 5.5 PARADIGM: STYLE-AWARE ATMOSPHERE & PARTICLE GRAMMAR
 * ============================================================================
 * 
 * In premier motion graphic studios, atmospheric dust is never a static generic
 * starfield. The atmospheric texture morphs across acts to reinforce each world:
 * 1. Act 1 (Glassmorphism): Luminous sub-surface emerald & cyber-gold micro-bokeh.
 * 2. Act 2 (Stop-Motion Paper): Physical fiber flecks jittering at 12 FPS.
 * 3. Act 3 (Technical Blueprint): Floating CAD dimension crosshairs (+) and ruler ticks.
 * 4. Act 4 (Neo-Brutalism): High-contrast geometric sparkles (✦) and registration marks.
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { quantizeFrameForStopMotion } from '../visual_world/artStyleGate';

export interface StyleAwareAtmosphereLayerProps {
  camX?: number;
  camY?: number;
  width?: number;
  height?: number;
}

interface ParticleSpec {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  speed: number;
  depth: number;
  seed: number;
}

const PARTICLES: ParticleSpec[] = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  baseX: ((i * 137.5) % 1800) + 60,
  baseY: ((i * 223.1) % 960) + 60,
  size: (i % 4) * 2.5 + 4,
  speed: 0.2 + (i % 5) * 0.15,
  depth: 0.3 + (i % 6) * 0.15,
  seed: i,
}));

export const StyleAwareAtmosphereLayer: React.FC<StyleAwareAtmosphereLayerProps> = ({
  camX = 0,
  camY = 0,
  width = 1920,
  height = 1080,
}) => {
  const frame = useCurrentFrame();

  // Act Opacities for smooth cross-fading of particle identities
  const act1Weight = interpolate(frame, [0, 30, 320, 350], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act2Weight = interpolate(frame, [330, 360, 710, 740], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act3Weight = interpolate(frame, [720, 750, 1210, 1240], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const act4Weight = interpolate(frame, [1220, 1250, 1780, 1800], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 12 FPS time for paper jitter in Act 2
  const stopMotionFrame = quantizeFrameForStopMotion(frame, 'stop_motion_12fps');

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width,
        height,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {PARTICLES.map((p) => {
        // Continuous organic drift
        const continuousTime = frame * p.speed * 0.05;
        const driftX = Math.sin(continuousTime + p.seed) * 35 - camX * p.depth * 0.12;
        const driftY = Math.cos(continuousTime * 0.8 + p.seed) * 25 - camY * p.depth * 0.12;

        // Paper jitter drift for Act 2
        const paperTime = stopMotionFrame * 0.3 + p.seed;
        const paperDriftX = (Math.sin(paperTime * 1.7) * 20) - camX * p.depth * 0.08;
        const paperDriftY = (Math.cos(paperTime * 1.3) * 15) - camY * p.depth * 0.08;

        const posX = p.baseX + (act2Weight > 0.5 ? paperDriftX : driftX);
        const posY = p.baseY + (act2Weight > 0.5 ? paperDriftY : driftY);

        return (
          <React.Fragment key={p.id}>
            {/* Act 1: Luminous Micro-Bokeh */}
            {act1Weight > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: posX,
                  top: posY,
                  width: p.size * 2,
                  height: p.size * 2,
                  borderRadius: '50%',
                  background: p.id % 2 === 0 ? 'rgba(16, 185, 129, 0.45)' : 'rgba(245, 158, 11, 0.35)',
                  boxShadow: p.id % 2 === 0 ? '0 0 16px rgba(16, 185, 129, 0.5)' : '0 0 14px rgba(245, 158, 11, 0.4)',
                  filter: 'blur(2px)',
                  opacity: act1Weight * 0.7,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}

            {/* Act 2: Tactile Paper Flecks */}
            {act2Weight > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: posX,
                  top: posY,
                  width: p.size * 1.4,
                  height: p.size * 0.8,
                  borderRadius: '1px',
                  background: p.id % 2 === 0 ? 'rgba(90, 70, 50, 0.35)' : 'rgba(180, 83, 9, 0.28)',
                  transform: `translate(-50%, -50%) rotate(${(p.seed * 45 + stopMotionFrame * 5) % 360}deg)`,
                  opacity: act2Weight * 0.65,
                }}
              />
            )}

            {/* Act 3: CAD Crosshairs (+) & Calipers */}
            {act3Weight > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: posX,
                  top: posY,
                  width: 14,
                  height: 14,
                  opacity: act3Weight * 0.45,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div style={{ position: 'absolute', top: 6, left: 0, right: 0, height: 1.5, background: '#0284c7' }} />
                <div style={{ position: 'absolute', left: 6, top: 0, bottom: 0, width: 1.5, background: '#0284c7' }} />
              </div>
            )}

            {/* Act 4: Neo-Brutalist Sparkles (✦) & Crosses */}
            {act4Weight > 0.01 && (
              <div
                style={{
                  position: 'absolute',
                  left: posX,
                  top: posY,
                  fontSize: p.size * 2,
                  color: p.id % 2 === 0 ? '#f59e0b' : '#000000',
                  opacity: act4Weight * 0.55,
                  transform: `translate(-50%, -50%) rotate(${p.seed * 30}deg)`,
                  fontWeight: 900,
                  userSelect: 'none',
                }}
              >
                {p.id % 2 === 0 ? '✦' : '✖'}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
