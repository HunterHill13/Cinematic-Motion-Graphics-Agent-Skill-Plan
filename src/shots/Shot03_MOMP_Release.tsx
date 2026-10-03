import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { WordReveal } from '../motion/WordReveal';
import { Card, Badge } from '../primitives/shapes';

export const Shot03_MOMP_Release: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Oligomeric pore expansion
  const poreSpring = spring({
    frame: frame - 10,
    fps,
    config: theme.spring.bouncy,
  });

  const poreSize = interpolate(poreSpring, [0, 1], [40, 220]);
  const particleEmission = interpolate(frame, [25, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 8 symmetrical pore subunits
  const subunits = Array.from({ length: 8 });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 120px',
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <Badge label="STAGE 2 • MITOCHONDRIAL MEMBRANE BREACH" variant="hero" />
      </div>

      <WordReveal
        text="BAX OLIGOMERIZES: MOMP PORE EMERGENCE"
        delay={5}
        framesPerWord={3}
        highlightWordIndex={2}
        highlightColor={theme.colors.hero}
        style={{
          fontSize: 50,
          fontWeight: 800,
          color: theme.colors.text,
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: 36,
        }}
      />

      <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
        {/* Kinetic Pore Model */}
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: '50%',
            backgroundColor: theme.colors.surfaceElevated,
            border: `2px dashed ${theme.colors.hero}`,
            boxShadow: `0 0 60px ${theme.colors.heroGlow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Subunits along perimeter */}
          {subunits.map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const r = poreSize / 2;
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: theme.colors.hero,
                  boxShadow: `0 0 15px ${theme.colors.hero}`,
                  transform: `translate(${x}px, ${y}px)`,
                }}
              />
            );
          })}

          {/* Core Opening & Cytochrome c Release */}
          <div
            style={{
              width: Math.max(10, poreSize - 60),
              height: Math.max(10, poreSize - 60),
              borderRadius: '50%',
              backgroundColor: '#000000',
              boxShadow: `inset 0 0 30px ${theme.colors.hero}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: theme.colors.accent,
                opacity: particleEmission,
                textAlign: 'center',
              }}
            >
              CYTOCHROME C<br />EGRESS
            </span>
          </div>
        </div>

        {/* Informational Breakdown Card */}
        <Card hero width={520} style={{ padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: theme.colors.hero }}>
              IRREVERSIBLE COMMITMENT
            </span>
            <Badge label="POINT OF NO RETURN" variant="alert" />
          </div>

          <p style={{ fontSize: 18, color: theme.colors.textMuted, lineHeight: 1.6, marginBottom: 20 }}>
            MOMP punctures the outer mitochondrial membrane. Soluble Cytochrome c floods into the cytoplasm,
            initiating caspase activation within minutes.
          </p>

          <div style={{ display: 'flex', gap: 20 }}>
            <div>
              <div style={{ fontSize: 14, color: theme.colors.textMuted }}>Permeability</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: theme.colors.hero, fontFamily: theme.fonts.hero }}>
                100% MOMP
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: theme.colors.textMuted }}>Release Velocity</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: theme.colors.accent, fontFamily: theme.fonts.hero }}>
                &lt; 8 Minutes
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
