import React from 'react';
import { interpolate, spring, useCurrentFrame, AbsoluteFill, Sequence } from 'remotion';

// ============================================================================
// NEGATIVE FIXTURE A: FAKE SPRING
// Has a spring() call, but only animates opacity.
// Expected: FAIL (OPACITY_ONLY_MOTION_TRAP)
// ============================================================================
export const NegativeFixtureA_FakeSpring: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = spring({ frame, fps: 30, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={{ width: 400, height: 400, background: '#1E293B' }}>
        <h2>Fake Spring Card</h2>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// NEGATIVE FIXTURE B: CAMERA CAMOUFLAGE
// CameraRig moves continuously (zoom 1.0 -> 1.05), but hero inside is completely static.
// Expected: FAIL (CAMERA_CAMOUFLAGE_DETECTED)
// ============================================================================
const CameraRig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const craneScale = interpolate(frame, [0, 300], [1.0, 1.05]);
  return <div style={{ transform: `scale(${craneScale})` }}>{children}</div>;
};

export const NegativeFixtureB_CameraCamouflage: React.FC = () => {
  return (
    <CameraRig>
      <div style={{ width: 500, height: 500, background: '#0F172A' }}>
        <h1>Static Subject Disguised by Camera Drift</h1>
      </div>
    </CameraRig>
  );
};

// ============================================================================
// NEGATIVE FIXTURE C: ENTRANCE / HOLD / EXIT
// Hero animates in frames 0-25 (entrance) and 275-300 (exit), but middle 60% is 100% static.
// Expected: FAIL (ENTRANCE_HOLD_EXIT_SLIDESHOW)
// ============================================================================
export const NegativeFixtureC_EntranceHoldExit: React.FC = () => {
  const frame = useCurrentFrame();
  const enterY = interpolate(frame, [0, 25], [100, 0]);
  const exitY = interpolate(frame, [275, 300], [0, -100]);

  return (
    <div style={{ transform: `translateY(${frame < 150 ? enterY : exitY}px)` }}>
      <h1>Dead Middle Period (25-275 Static Hold)</h1>
    </div>
  );
};

// ============================================================================
// NEGATIVE FIXTURE D: AMBIENT FAKE MOTION
// Hero only moves +-1px to +-2px micro-jitter or micro-breathing scale.
// Expected: FAIL (AMBIENT_FAKE_MOTION_DETECTED)
// ============================================================================
export const NegativeFixtureD_AmbientFakeMotion: React.FC = () => {
  const frame = useCurrentFrame();
  // Ambient float between 0px and 2px (below 24px threshold)
  const ambientJitterX = interpolate(frame, [0, 150], [0, 2]);

  return (
    <div style={{ transform: `translateX(${ambientJitterX}px)` }}>
      <h1>Micro Jitter Fake Motion</h1>
    </div>
  );
};

// ============================================================================
// NEGATIVE FIXTURE E: SEQUENCE SLIDESHOW
// Multiple isolated <Sequence> components unmounting and mounting Hero.
// Expected: FAIL (SEQUENCE_SLIDESHOW_DETECTED)
// ============================================================================
export const NegativeFixtureE_SequenceSlideshow: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={300}>
        <div style={{ width: 400, height: 300 }}>Scene 1 Card</div>
      </Sequence>
      <Sequence from={300} durationInFrames={300}>
        <div style={{ width: 400, height: 300 }}>Scene 2 Card</div>
      </Sequence>
    </AbsoluteFill>
  );
};
