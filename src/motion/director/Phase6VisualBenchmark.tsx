/**
 * ============================================================================
 * PHASE 6 VISUAL BENCHMARK COMPOSITION
 * ============================================================================
 * 
 * Master art-directed Remotion composition executing the 5-shot sequence:
 * "The Living Microcosm: Collapse → Fragmentation → Reorganization"
 * 
 * Duration: 420 Frames (14.0 Seconds @ 30 FPS, 1920x1080 Landscape)
 * Visual Standard: True Pictorial Authorship (No generic glowing circles on black)
 * ============================================================================
 */

import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { VisualDirector } from './VisualDirector';

export const PHASE6_TOTAL_FRAMES = 420;
export const PHASE6_WIDTH = 1920;
export const PHASE6_HEIGHT = 1080;

export const Phase6VisualBenchmark: React.FC = () => {
  const frame = useCurrentFrame();
  const motif = VisualDirector.getMasterMotif();

  // --------------------------------------------------------------------------
  // 1. TIMELINE & CAMERA CHOREOGRAPHY (Motivated, strictly bounded)
  // --------------------------------------------------------------------------
  let camZoom = 1.0;
  let camPanX = 0;
  let camPanY = 0;
  let camOrbitDeg = 0;

  // Shot 1: The Living Microcosm (0 - 90) -> Majestic push-in
  if (frame < 90) {
    const p = frame / 90;
    camZoom = interpolate(p, [0, 1], [0.95, 1.06], { easing: Easing.out(Easing.quad) });
    camOrbitDeg = interpolate(p, [0, 1], [-3, 2]);
  }
  // Shot 2: Kinetic Vector & Tension Coil (90 - 180) -> Reframe & tighten on tension
  else if (frame < 180) {
    const p = (frame - 90) / 90;
    camZoom = interpolate(p, [0, 1], [1.06, 1.20], { easing: Easing.inOut(Easing.quad) });
    camPanX = interpolate(p, [0, 1], [0, 25]); // Slight shift right toward incoming force
    camPanY = interpolate(p, [0, 1], [0, -15]);
    camOrbitDeg = interpolate(p, [0, 1], [2, 6]);
  }
  // Shot 3: Asymmetric Rupture & Focal Impact (180 - 240) -> Impact punch-in & recoil
  else if (frame < 240) {
    const p = (frame - 180) / 60;
    // Impact punch at frame 188
    const punchP = Math.max(0, Math.min(1, (frame - 180) / 10));
    const recoilP = Math.max(0, Math.min(1, (frame - 190) / 50));
    const punchZoom = interpolate(punchP, [0, 1], [1.20, 1.36], { easing: Easing.out(Easing.cubic) });
    camZoom = interpolate(recoilP, [0, 1], [punchZoom, 1.22], { easing: Easing.out(Easing.quad) });
    camPanX = interpolate(p, [0, 1], [25, -45]); // Tracks dominant daughter Alpha
    camPanY = interpolate(p, [0, 1], [-15, 20]);
    camOrbitDeg = interpolate(p, [0, 1], [6, -8]);
  }
  // Shot 4: Deep Parallax Flight & Lead Room (240 - 330) -> Lead room framing & orbital sweep
  else if (frame < 330) {
    const p = (frame - 240) / 90;
    camZoom = interpolate(p, [0, 1], [1.22, 1.15]);
    // Anticipatory lead room ahead of flight path
    camPanX = interpolate(p, [0, 1], [-45, -95]);
    camPanY = interpolate(p, [0, 1], [20, 35]);
    camOrbitDeg = interpolate(p, [0, 1], [-8, 14]); // 22° sweep driving differential parallax
  }
  // Shot 5: Harmonic Reorganization & Equilibrium (330 - 420) -> Wide reveal & peaceful settle
  else {
    const p = (frame - 330) / 90;
    camZoom = interpolate(p, [0, 1], [1.15, 1.0], { easing: Easing.out(Easing.cubic) });
    camPanX = interpolate(p, [0, 1], [-95, 0], { easing: Easing.out(Easing.quad) });
    camPanY = interpolate(p, [0, 1], [35, 0], { easing: Easing.out(Easing.quad) });
    camOrbitDeg = interpolate(p, [0, 1], [14, 0]);
  }

  // --------------------------------------------------------------------------
  // 2. HERO CELL KINEMATICS & DEFORMATION
  // --------------------------------------------------------------------------
  let heroX = 0;
  let heroY = 0;
  let heroScaleX = 1.0;
  let heroScaleY = 1.0;
  let heroRotDeg = 0;
  let heroOpacity = 1.0;
  let tensionRatio = 0.0;
  let cavitationFlash = 0.0;

  // Split daughters state for Shots 3 & 4
  let isSplit = false;
  let daughterAlpha = { x: 0, y: 0, scale: 0.72, opacity: 1.0, lagOrganelleX: 0 };
  let daughterBeta = { x: 0, y: 0, scale: 0.65, opacity: 1.0 };

  // Shot 1: Living respiration breathing
  if (frame < 90) {
    const breath = Math.sin((frame / 45) * Math.PI * 2) * 0.04;
    heroScaleX = 1.0 + breath;
    heroScaleY = 1.0 - breath * 0.5;
    heroY = Math.sin((frame / 60) * Math.PI) * 6;
  }
  // Shot 2: Kinetic Vector & Retrograde Anticipation Coil
  else if (frame < 180) {
    // Force approaches; anticipation coil peaks near frame 175
    const approachP = (frame - 90) / 90;
    if (frame >= 140) {
      const anticP = (frame - 140) / 40;
      // Backward pullback opposite to incoming force vector
      heroX = interpolate(anticP, [0, 1], [0, -42], { easing: Easing.in(Easing.quad) });
      heroY = interpolate(anticP, [0, 1], [0, 22], { easing: Easing.in(Easing.quad) });
      // Strong axial compression (squash along force diagonal)
      heroScaleX = interpolate(anticP, [0, 1], [1.0, 0.82]);
      heroScaleY = interpolate(anticP, [0, 1], [1.0, 1.24]);
      heroRotDeg = interpolate(anticP, [0, 1], [0, -12]);
      tensionRatio = anticP;
    } else {
      heroX = approachP * -6;
      heroY = approachP * 3;
      tensionRatio = approachP * 0.25;
    }
  }
  // Shot 3: Asymmetric Rupture & Impact Flash
  else if (frame < 240) {
    isSplit = true;
    const burstP = (frame - 180) / 60;
    // Cavitation light flash peaking at frame 185
    if (frame >= 180 && frame <= 195) {
      cavitationFlash = Math.sin(((frame - 180) / 15) * Math.PI);
    }

    // Daughter Alpha propelled left-down
    const alphaX = interpolate(burstP, [0, 1], [-42, -260], { easing: Easing.out(Easing.cubic) });
    const alphaY = interpolate(burstP, [0, 1], [22, 110], { easing: Easing.out(Easing.cubic) });
    // Daughter Beta propelled right-up
    const betaX = interpolate(burstP, [0, 1], [-42, 220], { easing: Easing.out(Easing.cubic) });
    const betaY = interpolate(burstP, [0, 1], [22, -90], { easing: Easing.out(Easing.cubic) });

    // Trailing organelle lag for Alpha: delta = -delay * velocity
    const alphaVx = interpolate(burstP, [0, 0.4, 1], [-26, -10, -2.5]);
    const lagX = -alphaVx * 7 * 0.55;

    daughterAlpha = { x: alphaX, y: alphaY, scale: 0.72, opacity: 1.0, lagOrganelleX: lagX };
    daughterBeta = { x: betaX, y: betaY, scale: 0.65, opacity: 0.95 };

    // Parent membrane tears and dissolves
    heroOpacity = interpolate(burstP, [0, 0.35], [1.0, 0.05]);
    heroScaleX = interpolate(burstP, [0, 1], [0.82, 1.6]);
    heroScaleY = interpolate(burstP, [0, 1], [1.24, 0.5]);
    tensionRatio = 1.0 - burstP;
  }
  // Shot 4: Deep Parallax Flight & Lead Room
  else if (frame < 330) {
    isSplit = true;
    const p = (frame - 240) / 90;
    // Daughter Alpha continues gliding along flight vector
    const alphaX = interpolate(p, [0, 1], [-260, -420], { easing: Easing.out(Easing.quad) });
    const alphaY = interpolate(p, [0, 1], [110, 145]);
    // Daughter Beta curves in wide return arc
    const betaX = interpolate(p, [0, 1], [220, 320]);
    const betaY = interpolate(p, [0, 1], [-90, -130]);

    // Secondary follow-through overshoot as Alpha decelerates (frames 275 - 315)
    let followThroughX = 0;
    if (frame >= 275) {
      const ftP = Math.min(1, (frame - 275) / 40);
      followThroughX = Math.sin(ftP * Math.PI) * 28; // Forward surge past core
    }

    daughterAlpha = { x: alphaX, y: alphaY, scale: 0.72, opacity: 1.0, lagOrganelleX: -8 + followThroughX };
    daughterBeta = { x: betaX, y: betaY, scale: 0.65, opacity: 0.85 };
    heroOpacity = 0.0;
  }
  // Shot 5: Harmonic Reorganization & Equilibrium
  else {
    const p = (frame - 330) / 90;
    if (p < 0.65) {
      isSplit = true;
      // Centripetal attraction bringing fragments into central origin
      const alphaX = interpolate(p, [0, 0.65], [-420, 0], { easing: Easing.inOut(Easing.cubic) });
      const alphaY = interpolate(p, [0, 0.65], [145, 0], { easing: Easing.inOut(Easing.cubic) });
      const betaX = interpolate(p, [0, 0.65], [320, 0], { easing: Easing.inOut(Easing.cubic) });
      const betaY = interpolate(p, [0, 0.65], [-130, 0], { easing: Easing.inOut(Easing.cubic) });

      daughterAlpha = { x: alphaX, y: alphaY, scale: interpolate(p, [0, 0.65], [0.72, 0.2]), opacity: interpolate(p, [0.4, 0.65], [1.0, 0.0]), lagOrganelleX: 0 };
      daughterBeta = { x: betaX, y: betaY, scale: interpolate(p, [0, 0.65], [0.65, 0.2]), opacity: interpolate(p, [0.4, 0.65], [0.85, 0.0]) };
      heroOpacity = interpolate(p, [0.1, 0.65], [0.0, 1.0]);
    } else {
      isSplit = false;
      heroOpacity = 1.0;
      // Exponentially damped settle into equilibrium
      const settleP = (p - 0.65) / 0.35;
      const damp = Math.exp(-settleP * 3.2);
      const settleBreath = Math.sin((frame / 40) * Math.PI * 2) * 0.03 * (0.3 + 0.7 * damp);
      heroScaleX = 1.0 + settleBreath;
      heroScaleY = 1.0 - settleBreath * 0.5;
    }
  }

  // --------------------------------------------------------------------------
  // 3. INCOMING KINETIC WAVEFRONT (Active in Shot 2 & early Shot 3)
  // --------------------------------------------------------------------------
  let waveOpacity = 0.0;
  let waveX = 600;
  let waveY = -400;
  let waveScale = 1.0;

  if (frame >= 85 && frame <= 200) {
    const p = (frame - 85) / 100;
    waveX = interpolate(p, [0, 1], [650, -30], { easing: Easing.in(Easing.cubic) });
    waveY = interpolate(p, [0, 1], [-450, 15], { easing: Easing.in(Easing.cubic) });
    waveOpacity = interpolate(frame, [85, 115, 180, 198], [0, 0.95, 1.0, 0]);
    waveScale = interpolate(p, [0, 1], [0.7, 1.35]);
  }

  // --------------------------------------------------------------------------
  // 4. PARALLAX MATH & CAMERA VIEWPORT PROJECTION
  // --------------------------------------------------------------------------
  // Viewport center with camera pan and lead room
  const centerX = PHASE6_WIDTH / 2 - camPanX * camZoom;
  const centerY = PHASE6_HEIGHT / 2 - camPanY * camZoom;

  // Differential parallax factors across depth planes
  const fgParallax = 1.45;
  const heroParallax = 1.00;
  const matrixParallax = 0.35;
  const atmosphereParallax = 0.12;

  // Base hero radius: substantial presence (radius = 290px -> 580px diameter = ~54% height!)
  const baseR = 290;
  const deform = tensionRatio * 0.35;

  // Dynamic organic contour with undulating cubic beziers and tension indentation
  const rTop = baseR * (1.0 + deform * 0.2 - tensionRatio * 0.18);
  const rBottom = baseR * (1.0 - deform * 0.15 + tensionRatio * 0.12);
  const rLeft = baseR * (1.0 - deform * 0.35 - tensionRatio * 0.22);
  // Indentation on the right flank where the force vector impacts
  const rRight = baseR * (1.0 - deform * 0.40 - tensionRatio * 0.30);

  const heroContour = `
    M 0 ${-rTop}
    C ${rRight * 0.62} ${-rTop * 0.92}, ${rRight * 1.02} ${-rTop * 0.28}, ${rRight} 0
    C ${rRight * 0.92} ${rBottom * 0.58}, ${rRight * 0.58} ${rBottom * 1.02}, 0 ${rBottom}
    C ${-rLeft * 0.58} ${rBottom * 1.02}, ${-rLeft * 1.02} ${rBottom * 0.48}, ${-rLeft} 0
    C ${-rLeft * 0.98} ${-rTop * 0.45}, ${-rLeft * 0.55} ${-rTop * 0.95}, 0 ${-rTop}
    Z
  `;

  // Secondary inner cortical contour for translucent bilayer depth
  const innerRTop = rTop * 0.93;
  const innerRBottom = rBottom * 0.93;
  const innerRLeft = rLeft * 0.93;
  const innerRRight = rRight * 0.93;
  const innerContour = `
    M 0 ${-innerRTop}
    C ${innerRRight * 0.62} ${-innerRTop * 0.92}, ${innerRRight * 1.02} ${-innerRTop * 0.28}, ${innerRRight} 0
    C ${innerRRight * 0.92} ${innerRBottom * 0.58}, ${innerRRight * 0.58} ${innerRBottom * 1.02}, 0 ${innerRBottom}
    C ${-innerRLeft * 0.58} ${innerRBottom * 1.02}, ${-innerRLeft * 1.02} ${innerRBottom * 0.48}, ${-innerRLeft} 0
    C ${-innerRLeft * 0.98} ${-innerRTop * 0.45}, ${-innerRLeft * 0.55} ${-innerRTop * 0.95}, 0 ${-innerRTop}
    Z
  `;

  // Dynamic rim color responding to mechanical tension
  const rimStrokeColor = tensionRatio > 0.35 ? '#fb7185' : '#38bdf8';
  const rimGlowFilter = tensionRatio > 0.35 ? 'drop-shadow(0 0 24px #f43f5e)' : 'drop-shadow(0 0 20px #0284c7)';

  return (
    <div
      style={{
        width: PHASE6_WIDTH,
        height: PHASE6_HEIGHT,
        backgroundColor: '#020617',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* LAYER 1: VOLUMETRIC ATMOSPHERIC NEBULA (Deep Background)           */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          position: 'absolute',
          inset: -250,
          background: `
            radial-gradient(circle at ${50 + camOrbitDeg * 0.6}% 42%, rgba(15, 23, 42, 0.92) 0%, rgba(10, 25, 55, 0.88) 45%, rgba(2, 6, 23, 0.99) 85%),
            linear-gradient(135deg, rgba(30, 27, 75, 0.4) 0%, transparent 55%, rgba(12, 74, 110, 0.3) 100%)
          `,
          transform: `scale(${camZoom * 1.02}) translate(${camPanX * -atmosphereParallax}px, ${camPanY * -atmosphereParallax}px)`,
          pointerEvents: 'none',
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 2: COLLAGEN EXTRACT MATRIX FILAMENTS (Deep 2.5D Scaffolding) */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          position: 'absolute',
          left: centerX + (camOrbitDeg * -matrixParallax * 12),
          top: centerY,
          transform: `translate(-50%, -50%) scale(${camZoom * 0.9})`,
          filter: 'blur(2.5px)',
          opacity: 0.75,
          pointerEvents: 'none',
        }}
      >
        <svg width="2600" height="1600" viewBox="-1300 -800 2600 1600">
          <defs>
            <linearGradient id="scaffoldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#312e81" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#1e293b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="scaffoldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#1d4ed8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="fibrilGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Primary structural collagen trabeculae */}
          <path d="M -1200 -520 Q -400 -180 380 -560 T 1400 -300" fill="none" stroke="url(#scaffoldGrad1)" strokeWidth="48" strokeLinecap="round" />
          <path d="M -1050 620 Q 0 320 880 680 T 1350 450" fill="none" stroke="url(#scaffoldGrad1)" strokeWidth="42" strokeLinecap="round" />
          <path d="M -600 -820 Q -300 20 -480 820" fill="none" stroke="url(#scaffoldGrad2)" strokeWidth="56" strokeLinecap="round" />
          <path d="M 720 -780 Q 460 120 820 820" fill="none" stroke="url(#scaffoldGrad2)" strokeWidth="46" strokeLinecap="round" />

          {/* Secondary micro-fibril network forming interstitial mesh */}
          <path d="M -850 -250 Q -320 120 150 -180 T 950 20" fill="none" stroke="url(#fibrilGrad)" strokeWidth="12" strokeDasharray="16 8" opacity="0.6" />
          <path d="M -450 480 Q 220 20 620 420" fill="none" stroke="url(#fibrilGrad)" strokeWidth="14" strokeDasharray="20 12" opacity="0.55" />
          <path d="M -900 150 Q -150 -350 700 -220" fill="none" stroke="url(#fibrilGrad)" strokeWidth="10" opacity="0.45" />

          {/* Interstitial nodal hubs with radial halo rings */}
          {[
            { x: -400, y: -180, r: 32 },
            { x: 380, y: -560, r: 28 },
            { x: 0, y: 320, r: 36 },
            { x: 880, y: 680, r: 30 },
            { x: -300, y: 20, r: 26 },
            { x: 460, y: 120, r: 29 },
          ].map((node, i) => (
            <g key={i}>
              <circle cx={node.x} cy={node.y} r={node.r * 1.8} fill="none" stroke="#4338ca" strokeWidth="2" opacity="0.4" />
              <circle cx={node.x} cy={node.y} r={node.r} fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" opacity="0.75" />
              <circle cx={node.x} cy={node.y} r={node.r * 0.35} fill="#818cf8" opacity="0.9" />
            </g>
          ))}
        </svg>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 3: INCOMING KINETIC COMPRESSION WAVEFRONT (Midground)        */}
      {/* ------------------------------------------------------------------ */}
      {waveOpacity > 0.02 && (
        <div
          style={{
            position: 'absolute',
            left: centerX + (waveX * camZoom),
            top: centerY + (waveY * camZoom),
            transform: `translate(-50%, -50%) rotate(-35deg) scale(${camZoom * waveScale})`,
            opacity: waveOpacity,
            filter: 'drop-shadow(0 0 28px #38bdf8)',
            pointerEvents: 'none',
          }}
        >
          <svg width="800" height="600" viewBox="-400 -300 800 600">
            <defs>
              <linearGradient id="kineticWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#a855f7" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
              <radialGradient id="sparkGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="#67e8f9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Volumetric acoustic compression bow shock wave */}
            <path
              d="M -320 -220 C -120 -140, 20 -80, 110 0 C 20 80, -120 140, -320 220"
              fill="none"
              stroke="url(#kineticWave)"
              strokeWidth="42"
              strokeLinecap="round"
            />
            {/* Luminous high-tension harmonic arc */}
            <path
              d="M -260 -170 C -80 -100, 50 -50, 130 0 C 50 50, -80 100, -260 170"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Crisp filament discharge line */}
            <path
              d="M -190 -110 C -40 -60, 70 -30, 145 0 C 70 30, -40 60, -190 110"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="1.0"
            />

            {/* Kinetic ion discharge sparks ahead of the bow front */}
            {[
              { x: 125, y: -45, r: 8 },
              { x: 155, y: 15, r: 12 },
              { x: 130, y: 65, r: 7 },
              { x: 90, y: -95, r: 9 },
              { x: 80, y: 115, r: 10 },
            ].map((spark, idx) => (
              <circle
                key={idx}
                cx={spark.x + Math.sin(frame * 0.4 + idx) * 8}
                cy={spark.y + Math.cos(frame * 0.3 + idx) * 8}
                r={spark.r}
                fill="url(#sparkGrad)"
                filter="drop-shadow(0 0 6px #38bdf8)"
              />
            ))}
          </svg>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 4: HERO CELL ORGANISM (Pin-Sharp Focal Plane)                */}
      {/* ------------------------------------------------------------------ */}
      {heroOpacity > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: centerX + (heroX * camZoom * heroParallax),
            top: centerY + (heroY * camZoom * heroParallax),
            transform: `translate(-50%, -50%) rotate(${heroRotDeg}deg) scale(${camZoom * heroScaleX}, ${camZoom * heroScaleY})`,
            opacity: heroOpacity,
            pointerEvents: 'none',
          }}
        >
          <svg width="900" height="900" viewBox="-450 -450 900 900">
            <defs>
              {/* Volumetric stroma gradient with Upper-Left Key highlight */}
              <radialGradient id="heroStromaGrad" cx="35%" cy="32%" r="72%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.88" />
                <stop offset="35%" stopColor="#0284c7" stopOpacity="0.82" />
                <stop offset="70%" stopColor="#0369a1" stopOpacity="0.88" />
                <stop offset="92%" stopColor="#082f49" stopOpacity="0.94" />
                <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.98" />
              </radialGradient>
              {/* Inner cortical stroma glow */}
              <radialGradient id="innerCorticalGrad" cx="40%" cy="38%" r="65%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#0369a1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </radialGradient>
              {/* Porous nuclear envelope gradient */}
              <radialGradient id="nuclearEnvelopeGrad" cx="38%" cy="35%" r="68%">
                <stop offset="0%" stopColor="#0369a1" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#1e1b4b" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
              </radialGradient>
              {/* Micro organelle vesicle gradient */}
              <radialGradient id="vesicleGrad" cx="32%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.6" />
              </radialGradient>
              {/* Mitochondria matrix gradient */}
              <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#1e40af" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* 1. Translucent Cytoplasmic Stroma Body */}
            <path
              d={heroContour}
              fill="url(#heroStromaGrad)"
              stroke={rimStrokeColor}
              strokeWidth={tensionRatio > 0.35 ? 7 : 5}
              filter={rimGlowFilter}
            />

            {/* 2. Inner Cortical Actin Layer providing depth */}
            <path
              d={innerContour}
              fill="url(#innerCorticalGrad)"
              stroke="#7dd3fc"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity="0.5"
            />

            {/* 3. Phospholipid Receptor Protein Nodules & Glycocalyx Cilia Fringe */}
            {[-130, -95, -60, -25, 10, 45, 80, 115, 150, 185, 220].map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const nx = Math.cos(rad) * (baseR * 0.98);
              const ny = Math.sin(rad) * (baseR * 0.98);
              const tipX = Math.cos(rad) * (baseR * 1.05);
              const tipY = Math.sin(rad) * (baseR * 1.05);
              return (
                <g key={idx}>
                  {/* Fine receptor stalk */}
                  <line x1={nx} y1={ny} x2={tipX} y2={tipY} stroke="#7dd3fc" strokeWidth="2" opacity="0.75" />
                  {/* Receptor protein nodule */}
                  <circle cx={tipX} cy={tipY} r="5" fill="#bae6fd" filter="drop-shadow(0 0 3px #38bdf8)" />
                </g>
              );
            })}

            {/* 4. Internal Organelles: Mitochondria with Interior Folded Cristae Baffles */}
            {/* Mitochondrion Alpha */}
            <g transform="translate(-140, -110) rotate(-28)">
              <rect x="-45" y="-22" width="90" height="44" rx="22" fill="url(#mitoGrad)" stroke="#60a5fa" strokeWidth="3" opacity="0.85" />
              <path d="M -30 -14 L -20 14 M -10 -14 L 0 14 M 10 -14 L 20 14" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            </g>
            {/* Mitochondrion Beta */}
            <g transform="translate(130, 95) rotate(42)">
              <rect x="-42" y="-20" width="84" height="40" rx="20" fill="url(#mitoGrad)" stroke="#60a5fa" strokeWidth="3" opacity="0.8" />
              <path d="M -26 -12 L -18 12 M -8 -12 L 0 12 M 10 -12 L 18 12" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            </g>

            {/* 5. Endoplasmic Reticulum Ribbon Labyrinth */}
            <path
              d="M -160 30 Q -110 -10 -150 -50 T -90 -80 T -50 -130"
              fill="none"
              stroke="#0284c7"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="22 10"
              opacity="0.65"
            />
            <path
              d="M 80 -60 Q 140 -30 110 30 T 150 90 T 110 140"
              fill="none"
              stroke="#0369a1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="26 12"
              opacity="0.6"
            />

            {/* 6. Cytosolic Organelle Vesicles with dynamic respiration orbiting */}
            {[
              { cx: -120, cy: 110, r: 22 },
              { cx: 110, cy: -120, r: 18 },
              { cx: -50, cy: -150, r: 16 },
              { cx: 155, cy: 30, r: 20 },
              { cx: -160, cy: -30, r: 15 },
              { cx: 70, cy: 150, r: 18 },
              { cx: -40, cy: 160, r: 14 },
            ].map((v, i) => (
              <circle
                key={i}
                cx={v.cx + Math.sin((frame / 28 + i) * Math.PI) * 4}
                cy={v.cy + Math.cos((frame / 32 + i) * Math.PI) * 3}
                r={v.r}
                fill="url(#vesicleGrad)"
                stroke="#c7d2fe"
                strokeWidth="2"
                filter="drop-shadow(0 0 6px #818cf8)"
              />
            ))}

            {/* 7. Central Porous Nuclear Envelope */}
            {(() => {
              const nucR = 110 * (1.0 - tensionRatio * 0.15);
              return (
                <g>
                  {/* Nuclear Envelope Body */}
                  <circle
                    cx="0"
                    cy="0"
                    r={nucR}
                    fill="url(#nuclearEnvelopeGrad)"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    strokeDasharray="18 6" // Nuclear pore complexes
                    filter="drop-shadow(0 0 24px #0284c7)"
                  />

                  {/* Intricate Chromatin Meshwork (Filamentous DNA Threads, NOT an eyeball) */}
                  <path
                    d="M -60 -25 Q -25 -70 30 -50 T 65 15 T 20 65 T -45 40 T -60 -25"
                    fill="none"
                    stroke="#7dd3fc"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  <path
                    d="M -40 -45 Q 15 -30 45 -15 T -15 35 T -45 -10"
                    fill="none"
                    stroke="#93c5fd"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.65"
                  />
                  <path
                    d="M -20 -60 Q 40 -40 25 20 T -35 55"
                    fill="none"
                    stroke="#c7d2fe"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                  <path
                    d="M -50 15 Q -10 45 40 30 T 15 -35"
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                  />

                  {/* Bioluminescent Micro-Nucleoli Granules (Clustered, off-center) */}
                  <circle cx="-12" cy="-8" r="16" fill="#67e8f9" filter="drop-shadow(0 0 10px #38bdf8)" opacity="0.95" />
                  <circle cx="15" cy="12" r="12" fill="#a5f3fc" filter="drop-shadow(0 0 8px #06b6d4)" opacity="0.9" />
                  <circle cx="-18" cy="18" r="9" fill="#cffafe" opacity="0.8" />
                  <circle cx="10" cy="-20" r="8" fill="#e0f2fe" opacity="0.75" />
                </g>
              );
            })()}
          </svg>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 5: BIFURCATED DAUGHTER BODIES (Shots 3, 4, and early Shot 5) */}
      {/* ------------------------------------------------------------------ */}
      {isSplit && (
        <>
          {/* Cytokinetic Spindle Apparatus (Only active during Shot 3 fission 180 - 225) */}
          {frame >= 180 && frame <= 225 && (
            <div
              style={{
                position: 'absolute',
                left: centerX,
                top: centerY,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                opacity: interpolate(frame, [180, 195, 225], [1.0, 0.8, 0.0]),
              }}
            >
              <svg width="1200" height="800" viewBox="-600 -400 1200 800">
                {/* Spindle Microtubules Stretching Between Dividing Centrosomes */}
                <line x1={daughterAlpha.x} y1={daughterAlpha.y} x2={daughterBeta.x} y2={daughterBeta.y} stroke="#38bdf8" strokeWidth="6" strokeDasharray="12 6" opacity="0.85" />
                <line x1={daughterAlpha.x} y1={daughterAlpha.y - 30} x2={daughterBeta.x} y2={daughterBeta.y - 20} stroke="#818cf8" strokeWidth="4" opacity="0.6" />
                <line x1={daughterAlpha.x} y1={daughterAlpha.y + 30} x2={daughterBeta.x} y2={daughterBeta.y + 20} stroke="#818cf8" strokeWidth="4" opacity="0.6" />
                {/* Central Cleavage Furrow Tension Node */}
                <circle cx={(daughterAlpha.x + daughterBeta.x) / 2} cy={(daughterAlpha.y + daughterBeta.y) / 2} r="14" fill="#ffffff" filter="drop-shadow(0 0 14px #38bdf8)" />
              </svg>
            </div>
          )}

          {/* DAUGHTER ALPHA (Dominant leftward hero) */}
          <div
            style={{
              position: 'absolute',
              left: centerX + (daughterAlpha.x * camZoom * heroParallax),
              top: centerY + (daughterAlpha.y * camZoom * heroParallax),
              transform: `translate(-50%, -50%) scale(${camZoom * daughterAlpha.scale})`,
              opacity: daughterAlpha.opacity,
              pointerEvents: 'none',
            }}
          >
            <svg width="700" height="700" viewBox="-350 -350 700 700">
              <defs>
                <radialGradient id="alphaGrad" cx="35%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.92" />
                  <stop offset="45%" stopColor="#0284c7" stopOpacity="0.88" />
                  <stop offset="85%" stopColor="#0369a1" stopOpacity="0.94" />
                  <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.98" />
                </radialGradient>
              </defs>
              {/* Daughter Alpha Body: Organically deformed ellipse */}
              <ellipse
                cx="0"
                cy="0"
                rx="185"
                ry="170"
                fill="url(#alphaGrad)"
                stroke="#7dd3fc"
                strokeWidth="6"
                filter="drop-shadow(0 0 24px #38bdf8)"
              />
              {/* Internal Nuclear Envelope */}
              <circle
                cx="-10"
                cy="-5"
                r="78"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeDasharray="14 5"
                filter="drop-shadow(0 0 18px #0284c7)"
              />
              {/* Chromatin Threads */}
              <path
                d="M -45 -20 Q -15 -55 25 -35 T 45 15 T 10 45 T -35 25 Z"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="3"
                opacity="0.8"
              />
              <circle cx="-5" cy="-2" r="14" fill="#67e8f9" filter="drop-shadow(0 0 8px #38bdf8)" opacity="0.9" />
              <circle cx="15" cy="12" r="9" fill="#cffafe" opacity="0.8" />

              {/* Trailing secondary organelle train with causal lag offset */}
              <g transform={`translate(${daughterAlpha.lagOrganelleX}, 0)`}>
                <circle cx="95" cy="-35" r="22" fill="#818cf8" stroke="#c7d2fe" strokeWidth="2.5" filter="drop-shadow(0 0 8px #818cf8)" />
                <circle cx="120" cy="25" r="16" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
                <circle cx="145" cy="-10" r="12" fill="#e0f2fe" opacity="0.85" />
              </g>
            </svg>
          </div>

          {/* DAUGHTER BETA (Secondary rightward entity) */}
          <div
            style={{
              position: 'absolute',
              left: centerX + (daughterBeta.x * camZoom * heroParallax),
              top: centerY + (daughterBeta.y * camZoom * heroParallax),
              transform: `translate(-50%, -50%) scale(${camZoom * daughterBeta.scale})`,
              opacity: daughterBeta.opacity,
              pointerEvents: 'none',
            }}
          >
            <svg width="650" height="650" viewBox="-325 -325 650 650">
              <defs>
                <radialGradient id="betaGrad" cx="35%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.92" />
                  <stop offset="55%" stopColor="#4f46e5" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.98" />
                </radialGradient>
              </defs>
              <ellipse
                cx="0"
                cy="0"
                rx="155"
                ry="142"
                fill="url(#betaGrad)"
                stroke="#c7d2fe"
                strokeWidth="5.5"
                filter="drop-shadow(0 0 22px #818cf8)"
              />
              {/* Internal Nuclear Envelope */}
              <circle
                cx="5"
                cy="-5"
                r="64"
                fill="#0f172a"
                stroke="#a5b4fc"
                strokeWidth="3"
                strokeDasharray="12 4"
                filter="drop-shadow(0 0 14px #6366f1)"
              />
              {/* Chromatin Threads */}
              <path
                d="M -35 -15 Q -10 -40 20 -25 T 35 10 T 5 35 T -25 20 Z"
                fill="none"
                stroke="#c7d2fe"
                strokeWidth="2.5"
                opacity="0.8"
              />
              <circle cx="5" cy="-2" r="11" fill="#c7d2fe" filter="drop-shadow(0 0 6px #818cf8)" opacity="0.9" />
              <circle cx="-10" cy="12" r="7" fill="#e0e7ff" opacity="0.75" />
            </svg>
          </div>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CAVITATION IMPACT FLASH (Shot 3 Climax Flash)                      */}
      {/* ------------------------------------------------------------------ */}
      {cavitationFlash > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ffffff',
            opacity: cavitationFlash * 0.45,
            pointerEvents: 'none',
            zIndex: 90,
          }}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 6: FOREGROUND PARTICULATE CURRENTS (Fast Parallax)           */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${camPanX * -fgParallax}px, ${camPanY * -fgParallax}px)`,
          filter: 'blur(5px)',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      >
        <svg width={PHASE6_WIDTH} height={PHASE6_HEIGHT}>
          {/* Passing out-of-focus globules creating deep lens atmosphere */}
          <circle cx="280" cy="220" r="54" fill="#38bdf8" opacity="0.25" />
          <circle cx="1680" cy="340" r="68" fill="#818cf8" opacity="0.22" />
          <circle cx="750" cy="920" r="82" fill="#0284c7" opacity="0.25" />
          <circle cx="1420" cy="850" r="48" fill="#e0f2fe" opacity="0.28" />
          <circle cx="420" cy="780" r="38" fill="#38bdf8" opacity="0.2" />
          <circle cx="1200" cy="180" r="50" fill="#818cf8" opacity="0.2" />
        </svg>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* LAYER 7: SUBTLE LENS VIGNETTE (Atmospheric Framing)                */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 48%, rgba(2, 6, 23, 0.82) 100%)',
          pointerEvents: 'none',
          zIndex: 110,
        }}
      />
    </div>
  );
};
