import React from 'react';
import { interpolate, useCurrentFrame, Easing, AbsoluteFill, Sequence, staticFile, Img } from 'remotion';
import { calculateSettleLock, calculateDecayingImpactShake } from '../../../../src/motion/secondaryMotion';
import { CameraGrammarRig } from '../../../../src/camera/CameraGrammarRig';
import { CanvasAtmosphereV19 } from '../../../../src/effects/CanvasAtmosphereV19';
import { PublicRelationsLogoSting, InstitutionalEndCard } from '../../../../src/branding/InstitutionalLogos';
import {
  executeKineticUnderlineHandoff,
  executeSymmetricFission,
  executeDatumRuleAxisCollapse,
  executePlinthFoundationDock,
  executeGravitationalSingularity,
} from '../../../../src/transition/carryTransitions';

// ============================================================================
// BENCHMARK A: TYPOGRAPHY CHOREOGRAPHY («پژوهشگر برتر»)
// enter -> impact -> settle -> hold -> transform (Zero jitter)
// 90 frames @ 30 FPS = 3.00s
// ============================================================================
export const BenchmarkA_Typography: React.FC = () => {
  const frame = useCurrentFrame();

  // Enter (0 - 20f)
  const enterY = interpolate(frame, [0, 20], [60, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Impact on frame 22 with Settle Lock
  const settle = calculateSettleLock(frame, 22, {
    anticipationFrames: 6,
    settleFrames: 14,
    scalePeak: 1.18,
  });

  // Transform (70 - 90f): Baseline rule extracts from typography
  const ruleExtract = interpolate(frame, [70, 90], [0, 480], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#06090E', direction: 'rtl', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <span style={{ fontSize: 16, color: '#D4AF37', letterSpacing: 3, fontWeight: 700, display: 'block', marginBottom: 16 }}>
          BENCHMARK A: TYPOGRAPHY CHOREOGRAPHY
        </span>
        <h1
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: '#FFFFFF',
            margin: 0,
            opacity: enterOpacity,
            transform: `scale(${settle.scale}) translateY(${enterY + settle.translateY}px)`,
            fontFamily: 'Vazirmatn, system-ui, sans-serif',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.4)',
          }}
        >
          پژوهشگر برتر
        </h1>
        {/* Extracted baseline carrier */}
        <div
          style={{
            height: 3,
            width: ruleExtract,
            backgroundColor: '#D4AF37',
            margin: '16px auto 0',
            boxShadow: '0 0 12px #D4AF37',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// BENCHMARK B: LINE TRANSFORMATION
// dot -> line -> diagonal -> structural divider -> collapse -> next form
// 90 frames @ 30 FPS = 3.00s
// ============================================================================
export const BenchmarkB_LineTransformation: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Dot expansion into line (0 - 25f)
  const lineLength = interpolate(frame, [0, 25], [10, 500], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Rotation to diagonal (25 - 50f)
  const rotation = interpolate(frame, [25, 50], [0, 45], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 3: Morph to vertical structural divider (50 - 70f)
  const verticalMorph = interpolate(frame, [50, 70], [45, 90], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const heightScale = interpolate(frame, [50, 70], [3, 700], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4: Collapse into next horizontal datum (70 - 90f)
  const collapse = interpolate(frame, [70, 90], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#06090E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontSize: 16, color: '#D4AF37', letterSpacing: 3, fontWeight: 700 }}>
          BENCHMARK B: LINE TRANSFORMATION (DOT → LINE → DIAGONAL → DIVIDER → COLLAPSE)
        </span>
      </div>

      <div
        style={{
          width: frame < 50 ? lineLength : 3,
          height: frame < 50 ? 3 : heightScale * (1 - collapse * 0.95),
          backgroundColor: '#D4AF37',
          boxShadow: '0 0 16px rgba(212, 175, 55, 0.8)',
          transform: `rotate(${frame < 50 ? rotation : verticalMorph}deg)`,
          transformOrigin: 'center center',
        }}
      />
      {collapse > 0 && (
        <div
          style={{
            position: 'absolute',
            width: 1200 * collapse,
            height: 2,
            backgroundColor: '#D4AF37',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 14px rgba(212, 175, 55, 0.9)',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// ============================================================================
// BENCHMARK C: MASS TRANSFORMATION
// small point -> expanding mass -> geometric object -> compressed point
// 90 frames @ 30 FPS = 3.00s
// ============================================================================
export const BenchmarkC_MassTransformation: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Point to expanding mass (0 - 30f)
  const radius = interpolate(frame, [0, 30], [4, 140], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Morph from circle into octagonal monument (30 - 60f)
  const roundness = interpolate(frame, [30, 55], [50, 4], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotation = interpolate(frame, [30, 55], [0, 45], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Gravitational compression back to singular high-density point (60 - 90f)
  const compress = interpolate(frame, [60, 85], [1, 0.03], {
    easing: Easing.bezier(0.7, 0, 0.84, 0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#06090E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontSize: 16, color: '#D4AF37', letterSpacing: 3, fontWeight: 700 }}>
          BENCHMARK C: MASS TRANSFORMATION (POINT → MASS → GEOMETRIC MONUMENT → SINGULARITY)
        </span>
      </div>

      <div
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: `${roundness}%`,
          background: 'radial-gradient(circle at 35% 35%, #FDE047 0%, #D4AF37 60%, #78350F 100%)',
          boxShadow: '0 0 35px rgba(212, 175, 55, 0.7), 0 10px 40px rgba(0, 0, 0, 0.8)',
          transform: `scale(${compress}) rotate(${rotation}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================================
// BENCHMARK D: CAMERA TRANSITION
// wide composition -> push -> object fills frame -> camera passes through -> next comp
// 90 frames @ 30 FPS = 3.00s
// ============================================================================
export const BenchmarkD_CameraTransition: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraZoom = interpolate(frame, [0, 45, 70, 90], [1.0, 1.4, 8.0, 1.0], {
    easing: Easing.bezier(0.2, 0, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const passThrough = frame >= 65;

  return (
    <AbsoluteFill style={{ backgroundColor: '#06090E', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.9} />
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <span style={{ fontSize: 16, color: '#D4AF37', letterSpacing: 3, fontWeight: 700 }}>
          BENCHMARK D: MOTIVATED CAMERA TRANSITION (PUSH → OCCLUSION → PASS-THROUGH)
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${cameraZoom})`,
          transformOrigin: 'center center',
        }}
      >
        {!passThrough ? (
          <div
            style={{
              width: 220,
              height: 220,
              border: '4px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0F172A',
            }}
          >
            <span style={{ color: '#D4AF37', fontSize: 24, fontWeight: 800 }}>GATEWAY</span>
          </div>
        ) : (
          <div
            style={{
              width: 600,
              height: 350,
              border: '2px solid rgba(212, 175, 55, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0A0E17',
              direction: 'rtl',
            }}
          >
            <span style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 800 }}>فضای جدید معماری</span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// BENCHMARK E: LOGO STING (Public Relations Emblem)
// 150 frames @ 30 FPS = 5.00s
// ============================================================================
export const BenchmarkE_LogoSting: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#06080E' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={1.0} />
      <PublicRelationsLogoSting startFrame={10} settleFrame={40} exitFrame={120} />
    </AbsoluteFill>
  );
};

// ============================================================================
// BENCHMARK F: INSTITUTIONAL ENDING (University + Committee Lockup)
// 150 frames @ 30 FPS = 5.00s
// ============================================================================
export const BenchmarkF_InstitutionalEnding: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#06080E' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={1.1} />
      <InstitutionalEndCard startFrame={10} settleFrame={35} />
    </AbsoluteFill>
  );
};

// ============================================================================
// COMPILATION COMPOSITION 1: V21_MOTION_REVIEW (360 frames @ 30 FPS = 12.00s)
// Sequences Benchmarks A, B, C, D
// ============================================================================
export const V21MotionReviewSequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#06090E' }}>
      <Sequence from={0} durationInFrames={90} name="BenchA_Typography">
        <BenchmarkA_Typography />
      </Sequence>
      <Sequence from={90} durationInFrames={90} name="BenchB_Line">
        <BenchmarkB_LineTransformation />
      </Sequence>
      <Sequence from={180} durationInFrames={90} name="BenchC_Mass">
        <BenchmarkC_MassTransformation />
      </Sequence>
      <Sequence from={270} durationInFrames={90} name="BenchD_Camera">
        <BenchmarkD_CameraTransition />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// COMPILATION COMPOSITION 2: V21_LOGO_BENCHMARK (300 frames @ 30 FPS = 10.00s)
// Sequences Benchmarks E & F
// ============================================================================
export const V21LogoBenchmarkSequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#06080E' }}>
      <Sequence from={0} durationInFrames={150} name="BenchE_PR_Sting">
        <BenchmarkE_LogoSting />
      </Sequence>
      <Sequence from={150} durationInFrames={150} name="BenchF_EndCard">
        <BenchmarkF_InstitutionalEnding />
      </Sequence>
    </AbsoluteFill>
  );
};
