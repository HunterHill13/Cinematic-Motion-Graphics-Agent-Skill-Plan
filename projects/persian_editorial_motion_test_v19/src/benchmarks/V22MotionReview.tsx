import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, Easing } from 'remotion';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { KineticTypography2 } from '../../../../src/motion/typography/KineticTypography2';
import {
  calculateRibbonRingTunnelMorph,
  calculateNumeralToPillarMorph,
} from '../../../../src/motion/grammar/transformationGrammar';
import { calculateSettleLock } from '../../../../src/motion/secondaryMotion';

/**
 * V22 MOTION REVIEW (360 frames @ 30 FPS = 12.00s)
 * 
 * Concise highlight reel demonstrating the 4 core pillars of V22:
 * 1. (000 - 090f): Kinetic Persian Word Slam («برگزیده») + Impact Settle Lock
 * 2. (090 - 180f): Metamorphic Shape Metamorphosis (Continuous Ribbon to Tunnel)
 * 3. (180 - 270f): Baseline Rule Extrusion into Architectural Pillar
 * 4. (270 - 360f): Decoupled Sovereign Identity & Heraldic Geometry
 */

// Highlight 1: Kinetic Persian Word Slam (90 frames)
const Highlight1_WordSlam: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />
      <KineticTypography2
        text="برگزیده"
        subtext="فرود ضربه‌ای کلمه با قفل پایدار نشست"
        mode="word_slam"
        strikeFrame={25}
        fontSize={110}
        color="#F8FAFC"
        accentColor="#D4AF37"
      />
    </AbsoluteFill>
  );
};

// Highlight 2: Metamorphic Ribbon & Tunnel (90 frames)
const Highlight2_MetamorphicRibbon: React.FC = () => {
  const frame = useCurrentFrame();
  const morph = calculateRibbonRingTunnelMorph(frame, 10, 70);

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />
      <div
        style={{
          position: 'relative',
          width: 500,
          height: 500,
          perspective: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: morph.ringCount }).map((_, idx) => {
          const depthOffset = (idx / 5) * morph.tunnelDepth;
          const ringW = Math.max(20, morph.outerRingSize - idx * 28);
          const ringOpacity = interpolate(idx, [0, 5], [1, 0.25]);

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                width: ringW,
                height: ringW,
                borderRadius: '50%',
                border: `${Math.max(1, 3 - idx * 0.4)}px solid #D4AF37`,
                boxShadow: idx === 0 ? '0 0 28px rgba(212, 175, 55, 0.7)' : 'none',
                transform: `translateZ(${-depthOffset}px)`,
                opacity: ringOpacity * morph.opacity,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Highlight 3: Baseline to Pillar (90 frames)
const Highlight3_BaselineToPillar: React.FC = () => {
  const frame = useCurrentFrame();
  const morph = calculateNumeralToPillarMorph(frame, 15, 65);

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />
      <div
        style={{
          position: 'relative',
          width: 600,
          height: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${morph.pillarElevationY}px)`,
        }}
      >
        {/* Numeral Header */}
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#D4AF37',
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
            opacity: morph.textOpacity,
            marginBottom: 10,
            textShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
          }}
        >
          ۱۶
        </span>

        {/* Central Architectural Column */}
        <div
          style={{
            width: morph.pillarWidth,
            height: morph.pillarHeight,
            backgroundColor: 'rgba(212, 175, 55, 0.25)',
            border: '2px solid #D4AF37',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.35)',
            borderRadius: 4,
          }}
        />

        {/* Grounding Foundation Plinth */}
        <div
          style={{
            width: morph.pillarWidth + 140,
            height: morph.plinthThickness,
            backgroundColor: '#D4AF37',
            boxShadow: '0 0 16px #D4AF37',
            marginTop: 4,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// Highlight 4: Sovereign Heraldic Resolution (90 frames)
const Highlight4_HeraldicResolution: React.FC = () => {
  const frame = useCurrentFrame();
  const settle = calculateSettleLock(frame, 30, {
    anticipationFrames: 8,
    settleFrames: 14,
    scalePeak: 1.1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#05070B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={1.1} />
      <div
        style={{
          transform: `scale(${settle.scale}) translateY(${settle.translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          direction: 'rtl',
        }}
      >
        <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="40" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="26" y="26" width="48" height="48" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
          <rect x="26" y="26" width="48" height="48" fill="none" stroke="#D4AF37" strokeWidth="1.2" transform="rotate(45 50 50)" />
          <circle cx="50" cy="50" r="18" fill="rgba(212, 175, 55, 0.15)" stroke="#38BDF8" strokeWidth="1.2" />
          <polygon points="50,33 53.5,45 66,50 53.5,55 50,67 46.5,55 34,50 46.5,45" fill="#D4AF37" />
          <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
        </svg>
        <span
          style={{
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
            fontSize: 28,
            fontWeight: 800,
            color: '#F8FAFC',
            marginTop: 20,
            letterSpacing: 1,
          }}
        >
          دانشگاه علوم پزشکی بقیه‌الله (عج)
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const V22MotionReview: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A' }}>
      <Sequence from={0} durationInFrames={90} name="H1_KineticWordSlam">
        <Highlight1_WordSlam />
      </Sequence>
      <Sequence from={90} durationInFrames={90} name="H2_MetamorphicRibbon">
        <Highlight2_MetamorphicRibbon />
      </Sequence>
      <Sequence from={180} durationInFrames={90} name="H3_BaselineToPillar">
        <Highlight3_BaselineToPillar />
      </Sequence>
      <Sequence from={270} durationInFrames={90} name="H4_HeraldicResolution">
        <Highlight4_HeraldicResolution />
      </Sequence>
    </AbsoluteFill>
  );
};
