import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { MotionCurves } from "../curves/AuthoredKeyframeEngine";

/**
 * V36 — SHOWREEL DIRECTOR PASS MASTER
 * 
 * Duration: 15.00 seconds | 450 frames @ 30 FPS | 1920x1080 Full HD
 * 
 * Directorial Philosophy:
 * "Stop adding techniques. Start directing the film."
 * Concept: The Geometric Singularity (Cosmic Loop of Geometry)
 * 
 * Directorial Innovations:
 * 1. Immediate First-Second Hook (Frames 0–24):
 *    Replaced static baseline waiting with subtle magnetic tension & harmonic oscillation,
 *    pinching sharply into the gravitational launch.
 * 2. Continuous Optical Match-Cut Transit (Frames 122–165):
 *    The 1:1 circular aperture doesn't merely zoom into black; its inner diameter dilates
 *    past camera frustum to become the atmospheric horizon of the typographic universe.
 * 3. Typographic Architectural Integration (Frames 164–275):
 *    «نقطه دید» is treated as monolithic architectural mass emerging from dynamic floor fissures,
 *    with responsive lighting sweep across the 3D letterforms.
 * 4. The Infinite Recontextualizing Loop (Frames 335–450):
 *    The sacred Nuqteh diamond crowns «نور», and the elongated baseline of the letter «ر»
 *    sweeps horizontally across the screen, settling at Frame 449 into the exact coordinate
 *    (Y = 540) of the opening horizon line, revealing that the entire 15-second cosmic voyage
 *    was the microscopic interior of a single stroke.
 */

export const V36_ShowreelMaster: React.FC = () => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // ACT 1: THE TENSION OF ORIGIN & GRAVITATIONAL DROP (Frames 0 - 88)
  // Directorial Polish: Active first-second tension, zero idle dead air.
  // =========================================================================
  const s1Active = frame < 88;

  // Subtle magnetic breathing in the first second (Frames 0 - 20)
  const breathingTension = frame < 20 ? Math.sin((frame / 20) * Math.PI) * 1.5 : 0;

  let sagY = 0;
  let sagWidthFactor = 0;

  if (frame >= 18 && frame < 28) {
    // 1. Anticipation: magnetic pinch and upward lift before the gravitational release
    const tAnticipate = (frame - 18) / 10;
    const antEase = Easing.bezier(0.4, 0, 0.2, 1)(tAnticipate);
    sagY = interpolate(antEase, [0, 1], [0, -12]);
    sagWidthFactor = interpolate(antEase, [0, 1], [0, 0.22]);
  } else if (frame >= 28 && frame < 58) {
    // 2. Gravitational Acceleration into deep sag
    const tSag = (frame - 28) / 30;
    const sagEase = Easing.bezier(0.55, 0.055, 0.675, 0.19)(tSag);
    sagY = interpolate(sagEase, [0, 1], [-12, 248]);
    sagWidthFactor = interpolate(tSag, [0, 1], [0.22, 1.0], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  } else if (frame >= 58 && frame < 80) {
    // 3. Damped Elastic Settle with precise physical decay
    const tSettle = frame - 58;
    const decay = Math.exp(-tSettle * 0.18);
    const oscillation = Math.sin(tSettle * 0.65) * 22 * decay;
    sagY = 240 + oscillation;
    sagWidthFactor = 1.0;
  } else if (frame >= 80) {
    sagY = 240;
    sagWidthFactor = 1.0;
  }

  const effectiveSagY = sagY + breathingTension;
  const sagWidth = 380 * sagWidthFactor;

  const horizonPathD = `M 0,${CY} L ${CX - sagWidth},${CY} C ${CX - sagWidth * 0.4},${CY + effectiveSagY * 0.9} ${CX + sagWidth * 0.4},${CY + effectiveSagY * 0.9} ${CX + sagWidth},${CY} L ${W},${CY}`;
  const horizonShadowD = `M 0,${CY + 3.5} L ${CX - sagWidth},${CY + 3.5} C ${CX - sagWidth * 0.4},${CY + effectiveSagY * 0.9 + 3.5} ${CX + sagWidth * 0.4},${CY + effectiveSagY * 0.9 + 3.5} ${CX + sagWidth},${CY + 3.5} L ${W},${CY + 3.5}`;
  const horizonSpecularD = `M 0,${CY - 1.2} L ${CX - sagWidth},${CY - 1.2} C ${CX - sagWidth * 0.4},${CY + effectiveSagY * 0.9 - 1.2} ${CX + sagWidth * 0.4},${CY + effectiveSagY * 0.9 - 1.2} ${CX + sagWidth},${CY - 1.2} L ${W},${CY - 1.2}`;

  // =========================================================================
  // ACT 2: OCULAR APERTURE & THE OPTICAL MATCH-CUT (Frames 76 - 172)
  // Directorial Polish: Perfect 1:1 circular geometry + cinematic light bloom.
  // =========================================================================
  const s2Active = frame >= 76 && frame < 172;

  const apertureProgress = interpolate(frame, [78, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: MotionCurves.snapSettle,
  });

  let cameraBreachZoom = 1.0;
  if (frame >= 122 && frame <= 165) {
    const tBreach = (frame - 122) / (165 - 122);
    const breachCurve = Math.pow(tBreach, 3.4);
    cameraBreachZoom = interpolate(breachCurve, [0, 1], [1.0, 18.0]);
  } else if (frame > 165) {
    cameraBreachZoom = 18.0;
  }

  // Strict 1:1 Circular Aperture Radius
  const irisRadius = interpolate(apertureProgress, [0, 1], [8, 260]) * cameraBreachZoom;

  const irisRattle = frame >= 85 && frame <= 105
    ? Math.sin((frame - 85) * 1.2) * (1 - (frame - 85) / 20) * 4
    : 0;

  // =========================================================================
  // ACT 3: THE MONUMENTAL TYPOGRAPHIC HORIZON «نقطه دید» (Frames 162 - 278)
  // Directorial Polish: Volumetric lighting sweep & architectural plinth depth.
  // =========================================================================
  const s3Active = frame >= 162 && frame < 278;

  const cruiseProgress = interpolate(frame, [164, 245], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.12, 0.85, 0.28, 1),
  });

  const colonnadeScale = interpolate(cruiseProgress, [0, 1], [0.55, 1.35]);
  const colonnadeZ = interpolate(cruiseProgress, [0, 1], [220, -160]);

  let architectureCollapse = 1.0;
  if (frame >= 245 && frame <= 275) {
    const tCol = (frame - 245) / 30;
    architectureCollapse = interpolate(tCol, [0, 1], [1.0, 0.0], {
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    });
  } else if (frame > 275) {
    architectureCollapse = 0.0;
  }

  const backgroundParallaxZ = interpolate(cruiseProgress, [0, 1], [0.8, 1.15]);

  // Dynamic light sweep angle across the architectural letters
  const lightSweepProgress = interpolate(frame, [170, 245], [-200, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // ACT 4: THE SACRED NUQTEH & 35-FRAME BRAKED STILLNESS (Frames 265 - 348)
  // Directorial Polish: Absolute 45° equilateral rhombus & tension breathing.
  // =========================================================================
  const s4Active = frame >= 265 && frame < 348;
  const isStillnessHold = frame >= 285 && frame <= 320;
  const rhombusRadius = 110;

  let rhombusArrivalScale = 1.0;
  if (frame >= 268 && frame < 285) {
    const tArr = (frame - 268) / 16;
    rhombusArrivalScale = interpolate(tArr, [0, 0.65, 0.85, 1.0], [2.4, 0.94, 1.03, 1.0], {
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  }

  let preRecoilScaleX = 1.0;
  let preRecoilScaleY = 1.0;
  let preRecoilGlow = 1.0;
  if (frame > 320 && frame <= 335) {
    const tRec = (frame - 320) / 15;
    const shudderFreq = Math.sin((frame - 320) * 2.2);
    preRecoilScaleY = 1.0 - tRec * 0.08 + shudderFreq * 0.02;
    preRecoilScaleX = 1.0 + tRec * 0.04;
    preRecoilGlow = interpolate(tRec, [0, 1], [1.0, 2.8]);
  }

  const finalRhombusScaleX = isStillnessHold ? 1.0 : (frame < 285 ? rhombusArrivalScale : preRecoilScaleX);
  const finalRhombusScaleY = isStillnessHold ? 1.0 : (frame < 285 ? rhombusArrivalScale : preRecoilScaleY);

  // =========================================================================
  // ACT 5: THE CELESTIAL REVEAL & INFINITE LOOP CLOSURE (Frames 335 - 450)
  // Directorial Polish: Perfect camera pivot handoff + horizontal tail loop.
  // =========================================================================
  const s5Active = frame >= 335;
  const pullBackAge = Math.max(0, frame - 335);

  const pullBackProgress = interpolate(pullBackAge, [0, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const worldScale = interpolate(pullBackProgress, [0, 1], [9.5, 0.45]);

  // In local space, the Nuqteh diamond is at (-140, -110).
  // Therefore, to place the Nuqteh diamond at (0, 0) relative to (CX, CY),
  // the inner translate must be (+140, +110).
  // Then as pullBack progresses to 1, we drift to (0, -20) to center the whole composition.
  const cameraPivotX = interpolate(pullBackProgress, [0, 1], [140, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const cameraPivotY = interpolate(pullBackProgress, [0, 1], [110, -20], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const wordLandingProgress = interpolate(pullBackAge, [15, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const wordOpacity = interpolate(wordLandingProgress, [0, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const celestialDriftAngle = frame >= 335 ? (frame - 335) * 0.05 : 0;

  const finaleCaptionOpacity = interpolate(frame, [395, 425], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Directorial Loop Engine: Extension of the baseline to infinity
  const loopTailProgress = interpolate(frame, [380, 448], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });
  const loopTailWidth = interpolate(loopTailProgress, [0, 1], [0, W]);
  const loopTailOpacity = interpolate(loopTailProgress, [0, 0.4, 1], [0, 0.9, 1]);

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: "#05070B",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* ===================================================================== */}
      {/* GLOBAL SVG FILTER & GRADIENT DEFINITIONS                              */}
      {/* ===================================================================== */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          {/* Milled Brass Linear Gradient */}
          <linearGradient id="v36-brass-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D2" />
            <stop offset="35%" stopColor="#E5A93C" />
            <stop offset="70%" stopColor="#C59B27" />
            <stop offset="100%" stopColor="#6C470E" />
          </linearGradient>

          {/* Specular Ridge Gold */}
          <linearGradient id="v36-specular-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C470E" stopOpacity={0.2} />
            <stop offset="45%" stopColor="#FFF7E6" stopOpacity={0.95} />
            <stop offset="55%" stopColor="#FFF7E6" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#6C470E" stopOpacity={0.2} />
          </linearGradient>

          {/* Dynamic Light Sweep Gradient */}
          <linearGradient id="v36-light-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5A93C" stopOpacity={0.4} />
            <stop offset="50%" stopColor="#FFFDF5" stopOpacity={1.0} />
            <stop offset="100%" stopColor="#E5A93C" stopOpacity={0.4} />
          </linearGradient>

          {/* Obsidian Monolith Depth Shading */}
          <linearGradient id="v36-obsidian-slab" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E131B" />
            <stop offset="50%" stopColor="#080B10" />
            <stop offset="100%" stopColor="#040608" />
          </linearGradient>

          {/* Translucent Silica Refraction */}
          <linearGradient id="v36-silica-scrim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(240, 246, 252, 0.18)" />
            <stop offset="60%" stopColor="rgba(72, 202, 228, 0.05)" />
            <stop offset="100%" stopColor="rgba(10, 15, 24, 0.45)" />
          </linearGradient>

          {/* Volumetric Radial Glow */}
          <radialGradient id="v36-core-illumination" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F9C74F" stopOpacity={0.45} />
            <stop offset="45%" stopColor="#E5A93C" stopOpacity={0.15} />
            <stop offset="80%" stopColor="#48CAE4" stopOpacity={0.04} />
            <stop offset="100%" stopColor="#05070B" stopOpacity={0} />
          </radialGradient>

          {/* Horizon Loop Glow */}
          <linearGradient id="v36-horizon-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5A93C" stopOpacity={0} />
            <stop offset="50%" stopColor="#FFF4D2" stopOpacity={1} />
            <stop offset="100%" stopColor="#E5A93C" stopOpacity={0} />
          </linearGradient>

          {/* High-Pass Micro Shadow */}
          <filter id="v36-contact-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000000" floodOpacity="0.85" />
          </filter>

          {/* Deep Cavity Occlusion */}
          <filter id="v36-deep-cavity" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="24" stdDeviation="32" floodColor="#000000" floodOpacity="0.95" />
          </filter>

          {/* Filament Corona Glow */}
          <filter id="v36-filament-corona" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ===================================================================== */}
      {/* LAYER 1: DEEP BACKGROUND ILLUMINATION & PERSPECTIVE GRID              */}
      {/* ===================================================================== */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          pointerEvents: "none",
        }}
      >
        {/* Ambient Volumetric Backdrop */}
        <circle
          cx={CX}
          cy={CY + 40}
          r={780}
          fill="url(#v36-core-illumination)"
          opacity={0.85}
        />

        {/* Subtle Spatial Coordinate Ticks */}
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 160 + i * 200;
          return (
            <g key={`v36-grid-tick-${i}`} opacity={0.18}>
              <line x1={x} y1={CY - 14} x2={x} y2={CY + 14} stroke="#48CAE4" strokeWidth={1} />
              <line x1={x} y1={CY} x2={x + 30} y2={CY} stroke="#E5A93C" strokeWidth={0.8} />
            </g>
          );
        })}
      </svg>

      {/* ===================================================================== */}
      {/* LAYER 2: PRIMARY VECTOR CHOREOGRAPHY CANVAS                           */}
      {/* ===================================================================== */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          overflow: "visible",
        }}
      >
        {/* ------------------------------------------------------------------- */}
        {/* ACT 1: HORIZON TENSION & PHYSICAL CONTACT SHADOW                    */}
        {/* ------------------------------------------------------------------- */}
        {s1Active && (
          <g>
            <path
              d={horizonShadowD}
              fill="none"
              stroke="#000000"
              strokeWidth={8}
              strokeLinecap="round"
              opacity={0.7}
              filter="url(#v36-contact-shadow)"
            />
            <path
              d={horizonPathD}
              fill="none"
              stroke="url(#v36-brass-bevel)"
              strokeWidth={3.8}
              strokeLinecap="round"
            />
            <path
              d={horizonSpecularD}
              fill="none"
              stroke="url(#v36-specular-gold)"
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity={0.85}
            />

            {/* Elastic anchor pins */}
            <circle cx={CX - sagWidth} cy={CY} r={3.2} fill="#FFF4D2" />
            <circle cx={CX + sagWidth} cy={CY} r={3.2} fill="#FFF4D2" />
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 2: OCULAR APERTURE IRIS LEAVES & GOLD CALIBRATIONS              */}
        {/* ------------------------------------------------------------------- */}
        {s2Active && (
          <g
            transform={`translate(${CX}, ${CY}) scale(${1 / cameraBreachZoom}) rotate(${irisRattle})`}
            opacity={interpolate(frame, [158, 168], [1, 0], { extrapolateRight: "clamp" })}
          >
            {/* Strict 1:1 Circular Aperture Bore */}
            <circle
              cx={0}
              cy={0}
              r={irisRadius}
              fill="#080B10"
              stroke="url(#v36-brass-bevel)"
              strokeWidth={6}
              filter="url(#v36-contact-shadow)"
            />

            {/* 12-Blade Precision Iris Shutter Assembly */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * (360 / 12) * Math.PI) / 180;
              const bladeLength = irisRadius * 1.35;
              const bx = Math.cos(angle) * (irisRadius * 0.95);
              const by = Math.sin(angle) * (irisRadius * 0.95);
              return (
                <line
                  key={`v36-iris-blade-${i}`}
                  x1={bx}
                  y1={by}
                  x2={bx + Math.cos(angle + 0.65) * bladeLength}
                  y2={by + Math.sin(angle + 0.65) * bladeLength}
                  stroke="#E5A93C"
                  strokeWidth={2.4}
                  strokeOpacity={0.65}
                />
              );
            })}

            {/* Outer Astrolabe Calibrations */}
            <circle
              cx={0}
              cy={0}
              r={irisRadius + 32}
              fill="none"
              stroke="#FFF4D2"
              strokeWidth={1.2}
              strokeDasharray="6 14"
              opacity={0.5}
            />
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 3: THE TYPOGRAPHIC HORIZON «نقطه دید»                           */}
        {/* ------------------------------------------------------------------- */}
        {s3Active && (
          <g
            transform={`translate(${CX}, ${CY + colonnadeZ * 0.3}) scale(${colonnadeScale * architectureCollapse})`}
            opacity={architectureCollapse}
          >
            {/* Monumental Perspective Floor Fissures */}
            {Array.from({ length: 7 }).map((_, i) => {
              const fx = (i - 3) * 180;
              return (
                <line
                  key={`v36-plinth-fissure-${i}`}
                  x1={fx}
                  y1={140}
                  x2={fx * 1.8}
                  y2={420}
                  stroke="#1A2433"
                  strokeWidth={1.4}
                  opacity={0.6}
                />
              );
            })}

            {/* Monolithic Glass Plinth */}
            <rect
              x={-540}
              y={90}
              width={1080}
              height={18}
              rx={9}
              fill="url(#v36-silica-scrim)"
              stroke="#48CAE4"
              strokeWidth={1.2}
              opacity={0.7}
              filter="url(#v36-contact-shadow)"
            />

            {/* 3D Drop Extrusion Shadow for «نقطه دید» */}
            <text
              x={0}
              y={72}
              textAnchor="middle"
              fill="#000000"
              fontSize={155}
              fontWeight={900}
              style={{
                filter: "url(#v36-deep-cavity)",
                letterSpacing: "6px",
                opacity: 0.9,
              }}
            >
              نقطه دید
            </text>

            {/* Brass Core Relief */}
            <text
              x={0}
              y={64}
              textAnchor="middle"
              fill="#6C470E"
              fontSize={155}
              fontWeight={900}
              style={{
                letterSpacing: "6px",
              }}
            >
              نقطه دید
            </text>

            {/* Sculpted Brass Front Face */}
            <text
              x={0}
              y={58}
              textAnchor="middle"
              fill="url(#v36-brass-bevel)"
              fontSize={155}
              fontWeight={900}
              stroke="#FFF7E6"
              strokeWidth={1.4}
              style={{
                letterSpacing: "6px",
              }}
            >
              نقطه دید
            </text>

            {/* Dynamic Light Sweep Highlight Overlay */}
            <text
              x={lightSweepProgress}
              y={58}
              textAnchor="middle"
              fill="url(#v36-light-sweep)"
              fontSize={155}
              fontWeight={900}
              opacity={0.35}
              style={{
                letterSpacing: "6px",
                mixBlendMode: "screen",
              }}
            >
              نقطه دید
            </text>
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 4: THE SACRED NUQTEH & RECOIL COILING                           */}
        {/* ------------------------------------------------------------------- */}
        {s4Active && (
          <g
            transform={`translate(${CX}, ${CY}) scale(${finalRhombusScaleX}, ${finalRhombusScaleY})`}
            opacity={interpolate(frame, [335, 342], [1, 0], { extrapolateRight: "clamp" })}
          >
            {/* Occlusion shadow on plinth */}
            <polygon
              points={`0,${-rhombusRadius + 14} ${rhombusRadius + 10},14 0,${rhombusRadius + 14} ${-rhombusRadius - 10},14`}
              fill="#000000"
              filter="url(#v36-deep-cavity)"
              opacity={0.85}
            />

            {/* Faceted Equilateral Diamond */}
            <polygon
              points={`0,${-rhombusRadius} ${rhombusRadius},0 0,0`}
              fill="#FFF4D2"
            />
            <polygon
              points={`0,0 ${rhombusRadius},0 0,${rhombusRadius}`}
              fill="#E5A93C"
            />
            <polygon
              points={`0,0 0,${rhombusRadius} ${-rhombusRadius},0`}
              fill="#996515"
            />
            <polygon
              points={`0,${-rhombusRadius} 0,0 ${-rhombusRadius},0`}
              fill="#F3E5AB"
            />

            {/* Specular Perimeter Contour */}
            <polygon
              points={`0,${-rhombusRadius} ${rhombusRadius},0 0,${rhombusRadius} ${-rhombusRadius},0`}
              fill="none"
              stroke="url(#v36-specular-gold)"
              strokeWidth={3.2}
              filter={preRecoilGlow > 1.2 ? "url(#v36-filament-corona)" : undefined}
            />
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 5: THE CELESTIAL NOOR REVEAL & THE INFINITE LOOP CLOSURE        */}
        {/* ------------------------------------------------------------------- */}
        {s5Active && (
          <g
            transform={`translate(${CX}, ${CY}) scale(${worldScale}) translate(${cameraPivotX}, ${cameraPivotY}) rotate(${celestialDriftAngle})`}
            opacity={interpolate(frame, [335, 342], [0, 1], { extrapolateRight: "clamp" })}
          >
            {/* Deep Celestial Astrolabe Coordinate Rings */}
            <circle
              cx={0}
              cy={60}
              r={580}
              fill="none"
              stroke="#1A2433"
              strokeWidth={1.2}
              opacity={wordOpacity * 0.7}
            />
            <circle
              cx={0}
              cy={60}
              r={540}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={1.0}
              strokeDasharray="4 10"
              opacity={wordOpacity * 0.45}
            />
            <circle
              cx={0}
              cy={60}
              r={360}
              fill="none"
              stroke="#48CAE4"
              strokeWidth={0.7}
              strokeDasharray="2 8"
              opacity={wordOpacity * 0.35}
            />

            {/* Astrolabe Radial Ray Calibrations */}
            {Array.from({ length: 24 }).map((_, i) => {
              const rad = (i * (360 / 24) * Math.PI) / 180;
              return (
                <line
                  key={`v36-celestial-ray-${i}`}
                  x1={Math.cos(rad) * 480}
                  y1={60 + Math.sin(rad) * 480}
                  x2={Math.cos(rad) * 540}
                  y2={60 + Math.sin(rad) * 540}
                  stroke="#E5A93C"
                  strokeWidth={0.8}
                  opacity={wordOpacity * 0.35}
                />
              );
            })}

            {/* Massive Ambient Occlusion Shadow of «نور» */}
            <text
              x={0}
              y={234}
              textAnchor="middle"
              fill="#000000"
              fontSize={440}
              fontWeight={900}
              style={{
                filter: "url(#v36-deep-cavity)",
                letterSpacing: "12px",
                opacity: wordOpacity * 0.95,
              }}
            >
              نور
            </text>

            {/* Midground Warm Brass Relief Core */}
            <text
              x={0}
              y={226}
              textAnchor="middle"
              fill="#6C470E"
              fontSize={440}
              fontWeight={900}
              style={{
                letterSpacing: "12px",
                opacity: wordOpacity,
              }}
            >
              نور
            </text>

            {/* Foreground Sculpted Milled Brass Face of «نور» */}
            <text
              x={0}
              y={218}
              textAnchor="middle"
              fill="url(#v36-brass-bevel)"
              fontSize={440}
              fontWeight={900}
              stroke="#FFF7E6"
              strokeWidth={2.0}
              style={{
                letterSpacing: "12px",
                opacity: wordOpacity,
              }}
            >
              نور
            </text>

            {/* The Diacritical Crown Nuqteh of «ن» (GEOMETRIC EQUILATERAL RHOMBUS) */}
            <g transform="translate(-140, -110)">
              <polygon
                points={`0,${-rhombusRadius + 10} ${rhombusRadius + 8},10 0,${rhombusRadius + 10} ${-rhombusRadius - 8},10`}
                fill="#000000"
                filter="url(#v36-contact-shadow)"
                opacity={0.8}
              />
              <polygon
                points={`0,${-rhombusRadius} ${rhombusRadius},0 0,0`}
                fill="#FFF4D2"
              />
              <polygon
                points={`0,0 ${rhombusRadius},0 0,${rhombusRadius}`}
                fill="#E5A93C"
              />
              <polygon
                points={`0,0 0,${rhombusRadius} ${-rhombusRadius},0`}
                fill="#996515"
              />
              <polygon
                points={`0,${-rhombusRadius} 0,0 ${-rhombusRadius},0`}
                fill="#F3E5AB"
              />
              <polygon
                points={`0,${-rhombusRadius} ${rhombusRadius},0 0,${rhombusRadius} ${-rhombusRadius},0`}
                fill="none"
                stroke="url(#v36-specular-gold)"
                strokeWidth={2.4}
                filter="url(#v36-filament-corona)"
              />
            </g>
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* THE INFINITE LOOP HORIZON EXTENSION (Frames 380 - 450)              */}
        {/* Directorial loop: The tail of «ر» becomes the opening horizon line  */}
        {/* ------------------------------------------------------------------- */}
        {frame >= 380 && (
          <g opacity={loopTailOpacity}>
            {/* Extending baseline back to Frame 0 origin */}
            <line
              x1={CX - loopTailWidth / 2}
              y1={CY}
              x2={CX + loopTailWidth / 2}
              y2={CY}
              stroke="url(#v36-horizon-gold)"
              strokeWidth={3.8}
              strokeLinecap="round"
            />
            <line
              x1={CX - loopTailWidth / 2}
              y1={CY - 1.2}
              x2={CX + loopTailWidth / 2}
              y2={CY - 1.2}
              stroke="#FFF7E6"
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity={0.8}
            />
          </g>
        )}
      </svg>

      {/* ===================================================================== */}
      {/* LAYER 3: FOREGROUND POLISHED OPTICAL FRAME (Material Scrim)           */}
      {/* ===================================================================== */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          pointerEvents: "none",
        }}
      >
        {/* Subtle Matte Border */}
        <rect
          x={40}
          y={40}
          width={W - 80}
          height={H - 80}
          fill="none"
          stroke="#1A2433"
          strokeWidth={1}
          opacity={0.35}
        />

        {/* Corner Calibrations */}
        <path d="M 40,65 L 40,40 L 65,40" fill="none" stroke="#E5A93C" strokeWidth={2} opacity={0.6} />
        <path d={`M ${W - 40},65 L ${W - 40},40 L ${W - 65},40`} fill="none" stroke="#E5A93C" strokeWidth={2} opacity={0.6} />
        <path d={`M 40,${H - 65} L 40,${H - 40} L 65,${H - 40}`} fill="none" stroke="#E5A93C" strokeWidth={2} opacity={0.6} />
        <path d={`M ${W - 40},${H - 65} L ${W - 40},${H - 40} L ${W - 65},${H - 40}`} fill="none" stroke="#E5A93C" strokeWidth={2} opacity={0.6} />

        {/* Director Reel Metadata */}
        <text
          x={65}
          y={68}
          fill="#48CAE4"
          fontSize={13}
          letterSpacing="3px"
          fontWeight={600}
          opacity={0.5}
        >
          SHOWREEL MASTER // V36
        </text>

        <text
          x={W - 65}
          y={68}
          textAnchor="end"
          fill="#E5A93C"
          fontSize={13}
          letterSpacing="3px"
          fontWeight={600}
          opacity={0.5}
        >
          450F // 15.00S // 30FPS
        </text>

        {/* Finale Subtitle / Authoring Seal */}
        <text
          x={CX}
          y={H - 90}
          textAnchor="middle"
          fill="#FFF7E6"
          fontSize={22}
          letterSpacing="8px"
          fontWeight={300}
          opacity={finaleCaptionOpacity}
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          از نقطه تا نور
        </text>
      </svg>
    </div>
  );
};
