import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface MorphingUIProps {
  primaryColor?: string;
  accentColor?: string;
  delayFrames?: number;
}

/**
 * MorphingUIRecipe: Dribbble-grade single continuous shape morph
 * Transition sequence: Button -> Loader -> Check -> Badge -> Expanded Card
 */
export const MorphingUIRecipe: React.FC<MorphingUIProps> = ({
  primaryColor = '#6366f1',
  accentColor = '#06b6d4',
  delayFrames = 0,
}) => {
  const globalFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frame = Math.max(0, globalFrame - delayFrames);

  // Phase 1 (0..20): Initial Button State ("Deploy Neural Model")
  // Phase 2 (20..45): Morph to Circular Spinner / Loader
  // Phase 3 (45..70): Morph to Success Checkmark Seal
  // Phase 4 (70..115): Expand into Live Metric Dashboard Card

  // Spring drivers
  const phase2Spring = spring({ frame: frame - 20, fps, config: { damping: 14, mass: 0.8, stiffness: 120 } });
  const phase3Spring = spring({ frame: frame - 45, fps, config: { damping: 14, mass: 0.8, stiffness: 140 } });
  const phase4Spring = spring({ frame: frame - 70, fps, config: { damping: 14, mass: 0.8, stiffness: 110 } });

  // Width & Height morph
  // Button: 260x64 -> Loader: 64x64 -> Check: 72x72 -> Dashboard Card: 560x220
  const width = interpolate(
    frame,
    [0, 20, 32, 45, 55, 70, 92],
    [260, 260, 64, 64, 72, 72, 560],
    { extrapolateRight: 'clamp' }
  );

  const height = interpolate(
    frame,
    [0, 20, 32, 45, 55, 70, 92],
    [64, 64, 64, 64, 72, 72, 220],
    { extrapolateRight: 'clamp' }
  );

  const borderRadius = interpolate(
    frame,
    [0, 20, 32, 70, 92],
    [16, 16, 32, 32, 20],
    { extrapolateRight: 'clamp' }
  );

  // Glow intensity
  const glow = interpolate(
    frame,
    [0, 35, 55, 70, 92],
    [0.15, 0.45, 0.6, 0.25, 0.35],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Outer ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: width + 40,
          height: height + 40,
          borderRadius: borderRadius + 8,
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: glow,
          filter: 'blur(24px)',
          pointerEvents: 'none',
          transition: 'all 0.1s ease',
        }}
      />

      {/* Main morphing container */}
      <div
        style={{
          width,
          height,
          borderRadius,
          background: frame < 45 
            ? `linear-gradient(135deg, ${primaryColor}, #4338ca)`
            : frame < 70 
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: frame >= 70 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
          boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.3)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Phase 1: Button text */}
        {frame < 28 && (
          <div
            style={{
              opacity: interpolate(frame, [0, 8, 20, 28], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#ffffff',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '0.02em',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 10px #ffffff',
              }}
            />
            DEPLOY NEURAL MODEL
          </div>
        )}

        {/* Phase 2: Rotating Ring Loader */}
        {frame >= 25 && frame < 50 && (
          <div
            style={{
              opacity: interpolate(frame, [25, 30, 44, 50], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              borderTopColor: '#ffffff',
              transform: `rotate(${(frame - 25) * 20}deg)`,
            }}
          />
        )}

        {/* Phase 3: Checkmark Stamp */}
        {frame >= 46 && frame < 74 && (
          <div
            style={{
              opacity: interpolate(frame, [46, 52, 68, 74], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
              transform: `scale(${phase3Spring})`,
              color: '#ffffff',
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            ✓
          </div>
        )}

        {/* Phase 4: Expanded Live Metric Dashboard */}
        {frame >= 70 && (
          <div
            style={{
              opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateRight: 'clamp' }),
              width: '100%',
              height: '100%',
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 12px #22c55e' }} />
                <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: 16, letterSpacing: '0.05em' }}>
                  AUTONOMOUS CLUSTER ACTIVE
                </span>
              </div>
              <span style={{ color: '#06b6d4', fontSize: 13, fontWeight: 600, background: 'rgba(6, 182, 212, 0.12)', padding: '4px 10px', borderRadius: 12 }}>
                NODE ID: 0x9F4A
              </span>
            </div>

            <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
              <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', padding: 14, borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}>Throughput</div>
                <div style={{ color: '#ffffff', fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                  {Math.round(interpolate(frame, [75, 100], [0, 1420], { extrapolateRight: 'clamp' }))} req/s
                </div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', padding: 14, borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}>Latency</div>
                <div style={{ color: '#22c55e', fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                  12.4 ms
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
