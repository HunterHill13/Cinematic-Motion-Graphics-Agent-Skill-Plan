import React from 'react';
import {
  Audio,
  interpolate,
  useCurrentFrame,
  staticFile,
  Easing,
} from 'remotion';
import {
  evaluateAuthoredKeyframeTrack,
  AuthoredMotionTrack,
} from '../../motion/curves/AuthoredKeyframeEngine';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';

// ============================================================================
// AUTHORED KEYFRAME TRACKS (PHYSICAL MECHANICAL PROFILES)
// ============================================================================

// Track 1: Central Core Bifurcation (Hydraulic Heavy)
const CORE_UNLATCH_TRACK: AuthoredMotionTrack = {
  id: 'core-unlatch',
  totalDurationFrames: 450,
  profile: 'HEAVY',
  keyframes: [
    { time: 0.0, role: 'REST', value: 0 },
    { time: 25 / 450, role: 'REST', value: 0 },
    { time: 40 / 450, role: 'ANTICIPATION', value: -14 }, // Negative hydraulic dip
    { time: 75 / 450, role: 'LAUNCH', value: 140 },       // Rapid bifurcation spread (px)
    { time: 95 / 450, role: 'OVERSHOOT', value: 155 },
    { time: 110 / 450, role: 'SETTLE', value: 148 },      // Settled housing spread
    { time: 290 / 450, role: 'HOLD', value: 148 },
    { time: 330 / 450, role: 'IMPACT', value: 30 },       // Seismic compression to seal
    { time: 450 / 450, role: 'SETTLE', value: 20 },
  ],
};

// Track 2: Tri-Node Telescoping Ascent (Pneumatic Snappy)
const NODE_ELEVATION_TRACK: AuthoredMotionTrack = {
  id: 'node-elevation',
  totalDurationFrames: 450,
  profile: 'SLAM',
  keyframes: [
    { time: 0.0, role: 'REST', value: 0 },
    { time: 115 / 450, role: 'REST', value: 0 },
    { time: 130 / 450, role: 'ANTICIPATION', value: -8 },
    { time: 180 / 450, role: 'PEAK', value: 240 },        // Telescoping height (px)
    { time: 205 / 450, role: 'OVERSHOOT', value: 252 },
    { time: 220 / 450, role: 'SETTLE', value: 245 },
    { time: 290 / 450, role: 'HOLD', value: 245 },
    { time: 330 / 450, role: 'IMPACT', value: 0 },         // Downward slam-lock into emblem
    { time: 450 / 450, role: 'SETTLE', value: 0 },
  ],
};

export const GoldenQuantumCoreComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // 1. Evaluate Motion Tracks
  const coreMotion = evaluateAuthoredKeyframeTrack(CORE_UNLATCH_TRACK, frame);
  const nodeMotion = evaluateAuthoredKeyframeTrack(NODE_ELEVATION_TRACK, frame);

  const spreadX = coreMotion.value;
  const elevateY = nodeMotion.value;

  // Mass Conservation: Core scales down as nodes telescope upward
  const coreCompression = interpolate(elevateY, [0, 245], [1.0, 0.82], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Camera Choreography (Subordinate to Visual Events)
  // Shot 1: Static lock
  // Shot 2 (F110-F290): Perspective orbit tilt (revealing 3D triangular linkage)
  const orbitAngleY = interpolate(frame, [110, 290], [-7, 7], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const orbitAngleX = interpolate(frame, [110, 290], [4, 11], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shot 3 (F290-F450):
  // F330 Impact: 3-Frame Seismic Vertical Recoil (+8px, -4px, +1px, 0px)
  let seismicKickY = 0;
  if (frame >= 330 && frame <= 336) {
    const rel = frame - 330;
    if (rel === 0) seismicKickY = 8;
    else if (rel === 1) seismicKickY = -4;
    else if (rel === 2) seismicKickY = 2;
    else if (rel === 3) seismicKickY = -1;
  }

  // Crane pull-back to reveal unified macro architecture
  const craneScale = interpolate(frame, [335, 380], [1.08, 1.0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Intentional Stillness Gate (F380 - F450): Zero coordinate variation
  const isIntentionalStillness = frame >= 380;

  // 3. Kinetic Pulse along Foundation Rail (Beat 1 -> Beat 2 handoff)
  const railPulseProgress = interpolate(frame, [75, 125], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Climax Seal Formation (Beat 3)
  const sealLock = interpolate(frame, [325, 345], [0, 1], {
    easing: Easing.bezier(0.2, 0, 0, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Typography (Dual-Script architecture: Clean display text)
  const labelBeat1 = sanitizeForDisplay('هسته رزوناتور کوانتومی');
  const labelBeat2 = sanitizeForDisplay('پیوند سه‌گانه هارمونیک');
  const labelBeat3 = sanitizeForDisplay('تثبیت تمام‌عیار پایداری سیستم');

  const textOpacityB1 = interpolate(frame, [30, 45, 105, 115], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOpacityB2 = interpolate(frame, [140, 160, 280, 295], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textOpacityB3 = interpolate(frame, [335, 355], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: '#07090E',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
      }}
    >
      {/* Voiceover Master Mix (137.2 WPM with Dynamic Ducking) */}
      <Audio src={staticFile('audio/golden_master_mix.mp3')} />

      {/* 3D PERSISTENT WORLD CANVAS */}
      <div
        style={{
          width: '100%',
          height: '100%',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${craneScale}) rotateX(${isIntentionalStillness ? 8 : orbitAngleX}deg) rotateY(${isIntentionalStillness ? 0 : orbitAngleY}deg) translateY(${seismicKickY}px)`,
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Ambient Volumetric Foundation Lighting */}
          <div
            style={{
              position: 'absolute',
              left: CX - 500,
              top: CY - 100,
              width: 1000,
              height: 500,
              background: 'radial-gradient(ellipse at center, rgba(255, 106, 0, 0.12) 0%, rgba(0, 229, 255, 0.04) 40%, rgba(0,0,0,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* FOUNDATION BEDROCK & RAIL */}
          <svg
            width={W}
            height={H}
            style={{ position: 'absolute', left: 0, top: 0 }}
          >
            <defs>
              <linearGradient id="titaniumBedrock" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#121722" />
                <stop offset="50%" stopColor="#252F42" />
                <stop offset="100%" stopColor="#121722" />
              </linearGradient>
              <linearGradient id="cadmiumBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF4400" />
                <stop offset="50%" stopColor="#FFAA00" />
                <stop offset="100%" stopColor="#FF4400" />
              </linearGradient>
            </defs>

            {/* Bedrock Horizon Line */}
            <line
              x1={CX - 450}
              y1={CY + 180}
              x2={CX + 450}
              y2={CY + 180}
              stroke="url(#titaniumBedrock)"
              strokeWidth={8}
              strokeLinecap="round"
            />

            {/* Kinetic Pulse Conductor Rail (Flashes on Beat 1 unlatch) */}
            <line
              x1={CX - (railPulseProgress * 380)}
              y1={CY + 180}
              x2={CX + (railPulseProgress * 380)}
              y2={CY + 180}
              stroke="url(#cadmiumBeam)"
              strokeWidth={3}
              opacity={railPulseProgress > 0 && railPulseProgress < 1 ? 0.9 : 0.25}
            />
          </svg>

          {/* CENTRAL RESONATOR CORE ASSEMBLY */}
          <div
            style={{
              position: 'absolute',
              left: CX,
              top: CY,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* HOUSING PLATE LEFT (Bifurcates Left) */}
            <div
              style={{
                position: 'absolute',
                width: 140,
                height: 280,
                left: -70 - spreadX,
                top: -140,
                backgroundColor: '#1E2636',
                border: '2px solid #3F4E6B',
                borderRadius: 8,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), -10px 15px 30px rgba(0,0,0,0.7)',
                transform: `scaleY(${coreCompression})`,
              }}
            >
              {/* Mechanical Heat Sink Ribs */}
              <div style={{ marginTop: 20, paddingLeft: 12 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 4,
                      backgroundColor: '#FF6600',
                      opacity: 0.6,
                      marginBottom: 10,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* HOUSING PLATE RIGHT (Bifurcates Right) */}
            <div
              style={{
                position: 'absolute',
                width: 140,
                height: 280,
                left: -70 + spreadX,
                top: -140,
                backgroundColor: '#1E2636',
                border: '2px solid #3F4E6B',
                borderRadius: 8,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8), 10px 15px 30px rgba(0,0,0,0.7)',
                transform: `scaleY(${coreCompression})`,
              }}
            >
              {/* Symmetrical Mechanical Ribs */}
              <div style={{ marginTop: 20, paddingRight: 12, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 4,
                      backgroundColor: '#FF6600',
                      opacity: 0.6,
                      marginBottom: 10,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* TELESCOPING TRI-NODE HARMONIC CLUSTER (Beat 2 Transformation) */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                pointerEvents: 'none',
              }}
            >
              {/* Connecting Carbon Truss Lines */}
              {elevateY > 10 && (
                <svg
                  width={600}
                  height={600}
                  style={{ position: 'absolute', left: -300, top: -300 }}
                >
                  {/* Truss from Base to Node 1 */}
                  <line
                    x1={300 - 80}
                    y1={300 + 40}
                    x2={300 - 150}
                    y2={300 - elevateY + 60}
                    stroke="#00E5FF"
                    strokeWidth={2}
                    opacity={0.8}
                  />
                  {/* Truss from Base to Node 2 (Center) */}
                  <line
                    x1={300}
                    y1={300 + 40}
                    x2={300}
                    y2={300 - elevateY}
                    stroke="#FF9900"
                    strokeWidth={3}
                    opacity={0.9}
                  />
                  {/* Truss from Base to Node 3 */}
                  <line
                    x1={300 + 80}
                    y1={300 + 40}
                    x2={300 + 150}
                    y2={300 - elevateY + 60}
                    stroke="#00E5FF"
                    strokeWidth={2}
                    opacity={0.8}
                  />
                  {/* Closed Apex Energy Loop between the 3 Nodes */}
                  <polygon
                    points={`${300 - 150},${300 - elevateY + 60} ${300},${300 - elevateY} ${300 + 150},${300 - elevateY + 60}`}
                    fill="rgba(255, 106, 0, 0.08)"
                    stroke="#FF7700"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                </svg>
              )}

              {/* NODE 1: Left Satelloid */}
              <div
                style={{
                  position: 'absolute',
                  width: 64,
                  height: 64,
                  left: -150 - 32,
                  top: -elevateY + 60 - 32,
                  backgroundColor: '#161D2B',
                  border: '2px solid #00E5FF',
                  borderRadius: '50%',
                  boxShadow: '0 0 25px rgba(0, 229, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00E5FF',
                  fontWeight: 900,
                  fontSize: 16,
                }}
              >
                α
              </div>

              {/* NODE 2: Central Zenith Vertex */}
              <div
                style={{
                  position: 'absolute',
                  width: 84,
                  height: 84,
                  left: -42,
                  top: -elevateY - 42,
                  backgroundColor: '#1E273A',
                  border: '3px solid #FFAA00',
                  borderRadius: 12,
                  transform: 'rotate(45deg)',
                  boxShadow: '0 0 35px rgba(255, 170, 0, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ transform: 'rotate(-45deg)', color: '#FFFFFF', fontWeight: 900, fontSize: 18 }}>
                  Ω
                </div>
              </div>

              {/* NODE 3: Right Satelloid */}
              <div
                style={{
                  position: 'absolute',
                  width: 64,
                  height: 64,
                  left: 150 - 32,
                  top: -elevateY + 60 - 32,
                  backgroundColor: '#161D2B',
                  border: '2px solid #00E5FF',
                  borderRadius: '50%',
                  boxShadow: '0 0 25px rgba(0, 229, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00E5FF',
                  fontWeight: 900,
                  fontSize: 16,
                }}
              >
                β
              </div>
            </div>

            {/* UNIFIED CLIMAX EMBLEM (Beat 3 Snap-Lock Merger) */}
            {sealLock > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: -60,
                  top: -60,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  border: '4px solid #FF8800',
                  backgroundColor: '#131924',
                  boxShadow: `0 0 ${40 * sealLock}px rgba(255, 136, 0, 0.8), inset 0 0 20px rgba(255, 136, 0, 0.5)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${sealLock})`,
                }}
              >
                <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 24, letterSpacing: 2 }}>
                  ΔEQ
                </div>
              </div>
            )}
          </div>

          {/* ARCHITECTURAL KINETIC TYPOGRAPHY (Embedded in World Geometry) */}
          {/* Beat 1 Caption */}
          <div
            style={{
              position: 'absolute',
              left: CX,
              bottom: 180,
              transform: 'translateX(-50%)',
              opacity: textOpacityB1,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ color: '#94A3B8', fontSize: 20, letterSpacing: 2, marginBottom: 4 }}>
              فاز اول // کالیبراسیون هسته
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 36, fontWeight: 900, textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>
              {labelBeat1}
            </div>
          </div>

          {/* Beat 2 Caption */}
          <div
            style={{
              position: 'absolute',
              left: CX,
              bottom: 180,
              transform: 'translateX(-50%)',
              opacity: textOpacityB2,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ color: '#00E5FF', fontSize: 20, letterSpacing: 2, marginBottom: 4 }}>
              فاز دوم // اکستروژن هارمونیک
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 36, fontWeight: 900, textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>
              {labelBeat2}
            </div>
          </div>

          {/* Beat 3 Caption (Locked during intentional stillness) */}
          <div
            style={{
              position: 'absolute',
              left: CX,
              bottom: 180,
              transform: 'translateX(-50%)',
              opacity: textOpacityB3,
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ color: '#FFAA00', fontSize: 20, letterSpacing: 2, marginBottom: 4 }}>
              فاز نهایی // قفل پایداری
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 40, fontWeight: 900, textShadow: '0 0 25px rgba(255, 170, 0, 0.4)' }}>
              {labelBeat3}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
