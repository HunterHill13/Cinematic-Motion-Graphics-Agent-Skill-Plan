import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { WordReveal } from '../motion/WordReveal';
import { Card, Badge } from '../primitives/shapes';

export const Shot04_Apoptosome: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Orbital slow rotation
  const rotation = interpolate(frame, [0, 300], [0, 24]);

  // 7 Apaf-1 spokes
  const spokes = Array.from({ length: 7 });

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
        <Badge label="STAGE 3 • MOLECULAR APATOSOME ASSEMBLY" variant="hero" />
      </div>

      <WordReveal
        text="THE HEPTAMERIC APOPTOSOME ENGINE"
        delay={5}
        framesPerWord={3}
        highlightWordIndex={1}
        highlightColor={theme.colors.hero}
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: theme.colors.text,
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: 36,
        }}
      />

      <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
        {/* Symmetrical 7-Fold Pinwheel */}
        <div
          style={{
            width: 340,
            height: 340,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {spokes.map((_, i) => {
            const spokeSpring = spring({
              frame: frame - 10 - i * 3,
              fps,
              config: theme.spring.snappy,
            });

            const angle = (i * 360) / 7;
            const length = interpolate(spokeSpring, [0, 1], [0, 130]);

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 14,
                  height: length,
                  borderRadius: 7,
                  background: `linear-gradient(180deg, ${theme.colors.hero}, ${theme.colors.accent})`,
                  boxShadow: `0 0 20px ${theme.colors.heroGlow}`,
                  transformOrigin: 'bottom center',
                  transform: `rotate(${angle}deg) translateY(-${length / 2}px)`,
                }}
              />
            );
          })}

          {/* Central Caspase-9 Hub */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              backgroundColor: theme.colors.surfaceElevated,
              border: `2px solid ${theme.colors.accent}`,
              boxShadow: `0 0 35px ${theme.colors.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: theme.fonts.hero,
                fontSize: 14,
                fontWeight: 800,
                color: theme.colors.text,
                textAlign: 'center',
              }}
            >
              CASPASE-9<br />HUB
            </span>
          </div>
        </div>

        {/* Structural Specs Card */}
        <Card hero width={520} style={{ padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: theme.colors.hero }}>
              APAF-1 HEPTAMER
            </span>
            <Badge label="27 nm PINWHEEL" variant="hero" />
          </div>

          <p style={{ fontSize: 18, color: theme.colors.textMuted, lineHeight: 1.6, marginBottom: 20 }}>
            Seven Apaf-1 molecules bind released Cytochrome c in the presence of dATP, assembling into a
            quaternary holoenzyme that recruits and auto-activates Procaspase-9.
          </p>

          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 14, color: theme.colors.textMuted }}>Stoichiometry</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.hero, fontFamily: theme.fonts.hero }}>
                7 : 7 : 7 (Apaf:CytC:dATP)
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: theme.colors.textMuted }}>Symmetry</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: theme.colors.accent, fontFamily: theme.fonts.hero }}>
                C7 Rotational
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
