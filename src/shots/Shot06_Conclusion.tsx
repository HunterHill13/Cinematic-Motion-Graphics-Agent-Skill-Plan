import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { WordReveal } from '../motion/WordReveal';
import { Card, Badge } from '../primitives/shapes';

export const Shot06_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const finalSpring = spring({
    frame: frame - 10,
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
      <div style={{ marginBottom: 20 }}>
        <Badge label="THERAPEUTIC SYNTHESIS • TARGETED ONCOLOGY" variant="accent" />
      </div>

      <WordReveal
        text="TARGETED BH3 MIMETICS OVERCOME RESISTANCE"
        delay={5}
        framesPerWord={3}
        highlightWordIndex={1}
        highlightColor={theme.colors.accent}
        style={{
          fontSize: 50,
          fontWeight: 800,
          color: theme.colors.text,
          textAlign: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      />

      <div
        style={{
          transform: `scale(${finalSpring})`,
          opacity: finalSpring,
          display: 'flex',
          gap: 36,
        }}
      >
        <Card hero width={360} style={{ padding: '28px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: theme.colors.hero, marginBottom: 12 }}>
            1. BCL-2 INHIBITION
          </div>
          <p style={{ fontSize: 16, color: theme.colors.textMuted, lineHeight: 1.5 }}>
            Small-molecule BH3 mimetics selectively slot into the BCL-2 groove, releasing sequestered BAX.
          </p>
        </Card>

        <Card hero width={360} style={{ padding: '28px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: theme.colors.hero, marginBottom: 12 }}>
            2. MOMP RESTORATION
          </div>
          <p style={{ fontSize: 16, color: theme.colors.textMuted, lineHeight: 1.5 }}>
            Freed BAX oligomerizes in the outer mitochondrial membrane, venting Cytochrome c within minutes.
          </p>
        </Card>

        <Card hero width={360} style={{ padding: '28px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: theme.colors.accent, marginBottom: 12 }}>
            3. CELLULAR CLEARANCE
          </div>
          <p style={{ fontSize: 16, color: theme.colors.textMuted, lineHeight: 1.5 }}>
            Apoptosome and Caspase-3 dismantle the malignant cell cleanly, preventing inflammatory necrosis.
          </p>
        </Card>
      </div>

      <div
        style={{
          marginTop: 48,
          fontSize: 22,
          fontWeight: 700,
          color: theme.colors.hero,
          fontFamily: theme.fonts.hero,
          letterSpacing: '0.08em',
        }}
      >
        PROGRAMMED CELL DEATH: RE-ESTABLISHED
      </div>
    </AbsoluteFill>
  );
};
