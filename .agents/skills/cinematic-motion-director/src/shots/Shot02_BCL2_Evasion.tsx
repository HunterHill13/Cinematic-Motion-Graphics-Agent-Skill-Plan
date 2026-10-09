import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { WordReveal } from '../motion/WordReveal';
import { Card, Badge } from '../primitives/shapes';

export const Shot02_BCL2_Evasion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BCL-2 shield clamp movement
  const clampSpring = spring({
    frame: frame - 15,
    fps,
    config: theme.spring.snappy,
  });

  const bcl2X = interpolate(clampSpring, [0, 1], [-180, 0]);
  const baxX = interpolate(clampSpring, [0, 1], [180, 0]);
  const lockGlow = interpolate(clampSpring, [0, 1], [0, 1]);

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
      <div style={{ marginBottom: 24 }}>
        <Badge label="STAGE 1 • MOLECULAR RESISTANCE SENTINEL" variant="hero" />
      </div>

      <WordReveal
        text="BCL-2 OVEREXPRESSION SEQUESTERS BAX"
        delay={5}
        framesPerWord={3}
        highlightWordIndex={0}
        highlightColor={theme.colors.hero}
        style={{
          fontSize: 54,
          fontWeight: 800,
          color: theme.colors.text,
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: 44,
        }}
      />

      {/* Interactive Molecular Interaction Rig */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {/* BCL-2 Card */}
        <div style={{ transform: `translateX(${bcl2X}px)` }}>
          <Card hero width={420} style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: theme.colors.hero }}>BCL-2 SENTINEL</span>
              <Badge label="+480% IN CANCER" variant="alert" />
            </div>
            <p style={{ fontSize: 18, color: theme.colors.textMuted, lineHeight: 1.5 }}>
              Anti-apoptotic oncogene. Binds tightly into the hydrophobic BH3 groove of BAX/BAK.
            </p>
            <div style={{ marginTop: 20, padding: 12, borderRadius: 8, backgroundColor: 'rgba(6,182,212,0.1)' }}>
              <span style={{ fontSize: 16, color: theme.colors.hero, fontWeight: 600 }}>STATUS: SEQUESTERING</span>
            </div>
          </Card>
        </div>

        {/* Lock Junction */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: lockGlow,
            transform: `scale(${lockGlow})`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: theme.colors.surfaceElevated,
              border: `2px solid ${theme.colors.alert}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 30px ${theme.colors.alert}`,
              fontSize: 24,
              color: theme.colors.alert,
              fontWeight: 800,
            }}
          >
            🔒
          </div>
          <span style={{ fontSize: 14, color: theme.colors.alert, marginTop: 8, fontWeight: 700 }}>
            PORE BLOCKED
          </span>
        </div>

        {/* BAX Card */}
        <div style={{ transform: `translateX(${baxX}px)` }}>
          <Card width={420} style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: theme.colors.text }}>BAX / BAK</span>
              <Badge label="INACTIVE MONOMER" variant="muted" />
            </div>
            <p style={{ fontSize: 18, color: theme.colors.textMuted, lineHeight: 1.5 }}>
              Pro-apoptotic pore-forming executioners. Trapped in monomeric configuration.
            </p>
            <div style={{ marginTop: 20, padding: 12, borderRadius: 8, backgroundColor: 'rgba(148,163,184,0.1)' }}>
              <span style={{ fontSize: 16, color: theme.colors.textMuted, fontWeight: 600 }}>MEMBRANE PORE: DISABLED</span>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};
