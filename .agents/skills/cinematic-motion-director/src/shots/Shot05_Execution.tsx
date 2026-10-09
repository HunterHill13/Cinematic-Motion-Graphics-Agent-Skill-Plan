import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { WordReveal } from '../motion/WordReveal';
import { Card, Badge } from '../primitives/shapes';

export const Shot05_Execution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cleavage laser stroke
  const cutSpring = spring({
    frame: frame - 15,
    fps,
    config: theme.spring.snappy,
  });

  const cutLine = interpolate(cutSpring, [0, 1], [0, 380]);
  const substrateSplit = interpolate(cutSpring, [0, 1], [0, 24]);

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
      <div style={{ marginBottom: 18 }}>
        <Badge label="STAGE 4 • PROTEOLYTIC EXECUTION CASCADE" variant="alert" />
      </div>

      <WordReveal
        text="CASPASE-3 CLEAVES ICAD: GENOMIC DEGRADATION"
        delay={5}
        framesPerWord={3}
        highlightWordIndex={0}
        highlightColor={theme.colors.alert}
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: theme.colors.text,
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: 36,
        }}
      />

      <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
        {/* Cleavage Demonstration Card */}
        <Card hero width={460} style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: theme.colors.alert }}>ICAD CLEAVAGE EVENT</span>
            <Badge label="PROTEOLYSIS" variant="alert" />
          </div>

          <div
            style={{
              height: 70,
              backgroundColor: theme.colors.surface,
              borderRadius: 8,
              border: `1px solid ${theme.colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 20,
            }}
          >
            {/* Top Substrate Half */}
            <div
              style={{
                transform: `translateX(-${substrateSplit}px)`,
                fontSize: 18,
                fontWeight: 700,
                color: theme.colors.text,
              }}
            >
              [ INHIBITOR ]
            </div>

            {/* Red Cleavage Laser */}
            <div
              style={{
                position: 'absolute',
                width: 3,
                height: cutLine,
                backgroundColor: theme.colors.alert,
                boxShadow: `0 0 20px ${theme.colors.alert}`,
              }}
            />

            {/* Bottom CAD Half */}
            <div
              style={{
                transform: `translateX(${substrateSplit}px)`,
                fontSize: 18,
                fontWeight: 700,
                color: theme.colors.accent,
                marginLeft: 20,
              }}
            >
              [ ACTIVE CAD ]
            </div>
          </div>

          <p style={{ fontSize: 16, color: theme.colors.textMuted, lineHeight: 1.5 }}>
            Executioner Caspase-3 severs the inhibitory domain of ICAD, liberating Caspase-Activated DNase (CAD) to
            enter the nucleus.
          </p>
        </Card>

        {/* DNA Laddering / Nuclear Collapse */}
        <Card width={460} style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: theme.colors.text }}>DNA LADDERING</span>
            <Badge label="180-200 bp" variant="hero" />
          </div>

          {/* DNA Fragment Ladder Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {[180, 360, 540, 720].map((bp, i) => {
              const barSpring = spring({
                frame: frame - 25 - i * 4,
                fps,
                config: theme.spring.smooth,
              });
              const w = interpolate(barSpring, [0, 1], [0, 100 - i * 18]);

              return (
                <div key={bp} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ width: 60, fontSize: 14, color: theme.colors.textMuted, fontFamily: theme.fonts.mono }}>
                    {bp} bp
                  </span>
                  <div
                    style={{
                      height: 12,
                      width: `${w}%`,
                      borderRadius: 6,
                      background: `linear-gradient(90deg, ${theme.colors.hero}, ${theme.colors.accent})`,
                      boxShadow: `0 0 10px ${theme.colors.heroGlow}`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <p style={{ fontSize: 16, color: theme.colors.textMuted, lineHeight: 1.5 }}>
            Chromatin collapses into stereotyped fragments. The cancer cell blebs into apoptotic bodies for safe
            phagocytosis.
          </p>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
