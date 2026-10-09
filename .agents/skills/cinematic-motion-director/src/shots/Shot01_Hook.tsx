import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { WordReveal } from '../motion/WordReveal';
import { Card, Badge } from '../primitives/shapes';

export const Shot01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle pulsing oncogenic stress wave
  const pulse = Math.sin(frame / 8) * 0.15 + 1.0;
  const stressRingRadius = interpolate(frame % 45, [0, 45], [60, 240]);
  const stressRingOpacity = interpolate(frame % 45, [0, 45], [0.8, 0]);

  // Entrance spring for main cellular nucleus card
  const cardSpring = spring({
    frame,
    fps,
    config: theme.spring.smooth,
  });

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
      {/* Top Category Badge */}
      <div style={{ marginBottom: 28 }}>
        <Badge label="HALLMARK OF CANCER • INTRINSIC PATHWAY" variant="alert" />
      </div>

      {/* Main Kinetic Headline */}
      <WordReveal
        text="HOW APOPTOSIS WORKS IN A CANCER CELL"
        delay={10}
        framesPerWord={3}
        highlightWordIndex={1}
        highlightColor={theme.colors.hero}
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: theme.colors.text,
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      />

      {/* Hero Visual: Cellular Membrane & Oncogenic Stress Core */}
      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Pulsing Stress Ring */}
        <div
          style={{
            position: 'absolute',
            width: stressRingRadius * 2,
            height: stressRingRadius * 2,
            borderRadius: '50%',
            border: `2px solid ${theme.colors.alert}`,
            opacity: stressRingOpacity,
            pointerEvents: 'none',
          }}
        />

        <Card hero width={820} style={{ textAlign: 'center', padding: '40px 48px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme.colors.border}`,
              paddingBottom: 16,
              marginBottom: 24,
            }}
          >
            <span style={{ fontFamily: theme.fonts.display, color: theme.colors.hero, fontSize: 20 }}>
              MALIGNANT INTRACELLULAR STATE
            </span>
            <Badge label="HIGH STRESS BURDEN" variant="alert" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 18, color: theme.colors.textMuted, marginBottom: 8 }}>
                DNA Damage Index
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, color: theme.colors.alert, fontFamily: theme.fonts.hero }}>
                98.4%
              </div>
            </div>

            <div style={{ width: 2, height: 60, backgroundColor: theme.colors.border }} />

            <div>
              <div style={{ fontSize: 18, color: theme.colors.textMuted, marginBottom: 8 }}>
                Mitochondrial Tension
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, color: theme.colors.hero, fontFamily: theme.fonts.hero }}>
                CRITICAL
              </div>
            </div>

            <div style={{ width: 2, height: 60, backgroundColor: theme.colors.border }} />

            <div>
              <div style={{ fontSize: 18, color: theme.colors.textMuted, marginBottom: 8 }}>
                Apoptosis Trigger
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, color: theme.colors.accent, fontFamily: theme.fonts.hero }}>
                BLOCKED
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
