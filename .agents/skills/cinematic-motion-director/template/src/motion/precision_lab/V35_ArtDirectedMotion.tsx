import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { MotionCurves } from "../curves/AuthoredKeyframeEngine";

/**
 * V35 — Visual Art Direction, Materiality & Spatial Depth Master Composition
 * 
 * 15.0 seconds | 450 frames @ 30 FPS | 1920x1080 Full HD
 * 
 * Art Direction Direction C: "The Monumental Monolith"
 * - Preserves 100% of V34's authored motion choreography (timings, anticipation,
 *   ballistic breach, viscous braking, 35-frame stillness hold, explosive recoil).
 * - Upgrades visual language from flat vectors to a 5-Material Physical System:
 *   1. Milled Architectural Brass (dual-contour specular bevels & directional shading)
 *   2. Polished Obsidian / Deep Basalt (monolithic floor slabs & light-absorbing void)
 *   3. Smoked Translucent Silica / Optical Quartz (multi-plane parallax scrims & chamfered glass)
 *   4. Illuminated Luminous Filament (razor-sharp vector energy cores)
 *   5. Engraved Lathe Guides & Calibrated Microlines (precision astrolabe metrics)
 * - Introduces true spatial layering (Foreground Occluders -> Midground Subject -> Deep Space Floor).
 */

export const V35_ArtDirectedMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // ACT 1: HORIZON TENSION & ELASTIC DAMPED SAG (Frames 0 - 88)
  // [PRESERVED V34 MOTION CHOREOGRAPHY]
  // =========================================================================
  const s1Active = frame < 88;

  let sagY = 0;
  let sagWidthFactor = 0;

  if (frame >= 20 && frame < 28) {
    // 1. Anticipation: slight upward tension before the drop
    const tAnticipate = (frame - 20) / 8;
    const antEase = Easing.bezier(0.4, 0, 0.2, 1)(tAnticipate);
    sagY = interpolate(antEase, [0, 1], [0, -10]);
    sagWidthFactor = interpolate(antEase, [0, 1], [0, 0.2]);
  } else if (frame >= 28 && frame < 58) {
    // 2. Gravitational Acceleration into deep sag
    const tSag = (frame - 28) / 30;
    const sagEase = Easing.bezier(0.55, 0.055, 0.675, 0.19)(tSag);
    sagY = interpolate(sagEase, [0, 1], [-10, 245]);
    sagWidthFactor = interpolate(tSag, [0, 1], [0.2, 1.0], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
  } else if (frame >= 58 && frame < 80) {
    // 3. Damped Elastic Settle
    const tSettle = frame - 58;
    const decay = Math.exp(-tSettle * 0.18);
    const oscillation = Math.sin(tSettle * 0.65) * 22 * decay;
    sagY = 240 + oscillation;
    sagWidthFactor = 1.0;
  } else if (frame >= 80) {
    sagY = 240;
    sagWidthFactor = 1.0;
  }

  const sagWidth = 380 * sagWidthFactor;
  // Primary Horizon Spine Path
  const horizonPathD = `M 0,${CY} L ${CX - sagWidth},${CY} C ${CX - sagWidth * 0.4},${CY + sagY * 0.9} ${CX + sagWidth * 0.4},${CY + sagY * 0.9} ${CX + sagWidth},${CY} L ${W},${CY}`;
  // Deep Bevel Shadow Path (offset 3px downward for physical bevel thickness)
  const horizonShadowD = `M 0,${CY + 3.5} L ${CX - sagWidth},${CY + 3.5} C ${CX - sagWidth * 0.4},${CY + sagY * 0.9 + 3.5} ${CX + sagWidth * 0.4},${CY + sagY * 0.9 + 3.5} ${CX + sagWidth},${CY + 3.5} L ${W},${CY + 3.5}`;
  // Specular Highlight Ridge Path (offset 1px upward)
  const horizonSpecularD = `M 0,${CY - 1.2} L ${CX - sagWidth},${CY - 1.2} C ${CX - sagWidth * 0.4},${CY + sagY * 0.9 - 1.2} ${CX + sagWidth * 0.4},${CY + sagY * 0.9 - 1.2} ${CX + sagWidth},${CY - 1.2} L ${W},${CY - 1.2}`;

  // =========================================================================
  // ACT 2: OCULAR APERTURE & BALLISTIC CAMERA BREACH (Frames 76 - 172)
  // [PRESERVED V34 MOTION CHOREOGRAPHY]
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

  const irisRadiusX = interpolate(apertureProgress, [0, 1], [10, 320]) * cameraBreachZoom;
  const irisRadiusY = interpolate(apertureProgress, [0, 1], [2, 180]) * cameraBreachZoom;

  const irisRattle = frame >= 85 && frame <= 105
    ? Math.sin((frame - 85) * 1.2) * (1 - (frame - 85) / 20) * 4
    : 0;

  // =========================================================================
  // ACT 3: THE TYPOGRAPHIC INTERIOR «نقطه دید» (Frames 162 - 278)
  // [PRESERVED V34 MOTION CHOREOGRAPHY]
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

  // Multi-plane parallax offset (foreground moves faster than deep background)
  const foregroundParallaxX = interpolate(cruiseProgress, [0, 1], [-80, 80]);
  const backgroundParallaxZ = interpolate(cruiseProgress, [0, 1], [0.8, 1.15]);

  // =========================================================================
  // ACT 4: THE SACRED NUQTEH & 35-FRAME BRAKED STILLNESS (Frames 265 - 348)
  // [PRESERVED V34 MOTION CHOREOGRAPHY & EXACT STILLNESS HOLD]
  // =========================================================================
  const s4Active = frame >= 265 && frame < 348;
  const isStillnessHold = frame >= 285 && frame <= 320;
  const rhombusSide = 110;

  let rhombusArrivalScale = 1.0;
  if (frame >= 268 && frame < 285) {
    const tArr = (frame - 268) / 16;
    rhombusArrivalScale = interpolate(tArr, [0, 0.65, 0.85, 1.0], [2.4, 0.94, 1.03, 1.0], {
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  }

  let preRecoilShudder = 1.0;
  let preRecoilGlow = 1.0;
  if (frame > 320 && frame <= 335) {
    const tRec = (frame - 320) / 15;
    const shudderFreq = Math.sin((frame - 320) * 2.2);
    preRecoilShudder = 1.0 + shudderFreq * tRec * 0.08;
    preRecoilGlow = interpolate(tRec, [0, 1], [1.0, 2.8]);
  }

  const finalRhombusScale = isStillnessHold ? 1.0 : (frame < 285 ? rhombusArrivalScale : preRecoilShudder);

  // =========================================================================
  // ACT 5: THE 10,000X RECOIL & GRAVITATIONAL NOOR REVEAL (Frames 335 - 450)
  // [PRESERVED V34 MOTION CHOREOGRAPHY]
  // =========================================================================
  const s5Active = frame >= 335;
  const pullBackAge = Math.max(0, frame - 335);

  const pullBackProgress = interpolate(pullBackAge, [0, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const worldScale = interpolate(pullBackProgress, [0, 1], [9.5, 0.45]);
  const worldOffsetY = interpolate(pullBackProgress, [0, 1], [0, 80]);

  const wordLandingProgress = interpolate(pullBackAge, [15, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const wordOpacity = interpolate(wordLandingProgress, [0, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const celestialDriftAngle = frame >= 335 ? (frame - 335) * 0.06 : 0;

  const finaleCaptionOpacity = interpolate(frame, [395, 425], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: "#05070B", // Material 2: Deep Obsidian base
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* ===================================================================== */}
      {/* GLOBAL SVG FILTER & GRADIENT DEFINITIONS (The Material Laboratory)    */}
      {/* ===================================================================== */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          {/* MATERIAL 1: Milled Brass Linear Gradient (Key light at -35° / +45°) */}
          <linearGradient id="v35-brass-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D2" />
            <stop offset="35%" stopColor="#E5A93C" />
            <stop offset="70%" stopColor="#C59B27" />
            <stop offset="100%" stopColor="#6C470E" />
          </linearGradient>

          {/* MATERIAL 1: Specular Ridge Gold */}
          <linearGradient id="v35-specular-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C470E" stopOpacity={0.2} />
            <stop offset="45%" stopColor="#FFF7E6" stopOpacity={0.95} />
            <stop offset="55%" stopColor="#FFF7E6" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#6C470E" stopOpacity={0.2} />
          </linearGradient>

          {/* MATERIAL 2: Obsidian Monolith Depth Shading */}
          <linearGradient id="v35-obsidian-slab" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E131B" />
            <stop offset="50%" stopColor="#080B10" />
            <stop offset="100%" stopColor="#040608" />
          </linearGradient>

          {/* MATERIAL 3: Smoked Translucent Silica Refraction */}
          <linearGradient id="v35-silica-scrim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(240, 246, 252, 0.18)" />
            <stop offset="60%" stopColor="rgba(72, 202, 228, 0.05)" />
            <stop offset="100%" stopColor="rgba(10, 15, 24, 0.45)" />
          </linearGradient>

          {/* MATERIAL 4: Ambient Occlusion Shadow Filter */}
          <filter id="v35-ao-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.85" />
          </filter>

          {/* Deep Architectural Cavity Shadow */}
          <filter id="v35-deep-cavity" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#000000" floodOpacity="0.95" />
          </filter>

          {/* Subtle Filament Corona (Crisp & Restrained, Not Blurry Fog) */}
          <filter id="v35-filament-corona" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#FFE8A3" floodOpacity="0.75" />
          </filter>

          {/* Deep Space Lathe Matrix Pattern (Material 5: Engraved Microlines) */}
          <pattern id="v35-lathe-grid" width="128" height="128" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="128" y2="0" stroke="#161F2E" strokeWidth="0.6" strokeDasharray="2 6" />
            <line x1="0" y1="0" x2="0" y2="128" stroke="#161F2E" strokeWidth="0.6" strokeDasharray="2 6" />
            <circle cx="64" cy="64" r="0.8" fill="#E5A93C" opacity="0.35" />
          </pattern>
        </defs>
      </svg>

      {/* ===================================================================== */}
      {/* LAYER 1: DEEP SPACE ARCHITECTURAL SUBSTRATE (Material 2 & 5)           */}
      {/* ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          pointerEvents: "none",
          transform: `scale(${backgroundParallaxZ})`,
          transition: "transform 0.1s linear",
        }}
      >
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <rect width={W} height={H} fill="url(#v35-lathe-grid)" opacity={0.65} />
          {/* Subtle Radial Vignette Gradient etched into obsidian */}
          <radialGradient id="v35-deep-vignette" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="70%" stopColor="#05070B" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#020305" stopOpacity={0.95} />
          </radialGradient>
          <rect width={W} height={H} fill="url(#v35-deep-vignette)" />
        </svg>
      </div>

      {/* ===================================================================== */}
      {/* LAYER 2: PRIMARY SCENIC STAGING & MATERIAL GEOMETRY                    */}
      {/* ===================================================================== */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
        }}
      >
        {/* ------------------------------------------------------------------- */}
        {/* ACT 1: Split Horizon with Milled Brass Bevel & Cavity Shadow        */}
        {/* ------------------------------------------------------------------- */}
        {s1Active && (
          <g opacity={interpolate(frame, [75, 86], [1, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.75, 0) })}>
            {/* 1. Underlying Obsidian Cavity Shadow (Physical depth beneath the horizon) */}
            <path
              d={horizonShadowD}
              fill="none"
              stroke="#000000"
              strokeWidth={4.5}
              opacity={0.85}
              filter="url(#v35-ao-shadow)"
            />

            {/* 2. Recessed Engraved Coordinate Tick Marks (Material 5) */}
            {sagWidthFactor > 0.3 && (
              <g opacity={sagWidthFactor * 0.7}>
                {[-180, -90, 0, 90, 180].map((tickX, i) => (
                  <line
                    key={`v35-h-tick-${i}`}
                    x1={CX + tickX}
                    y1={CY - 14}
                    x2={CX + tickX}
                    y2={CY - 6}
                    stroke="#E5A93C"
                    strokeWidth={0.7}
                    opacity={0.4}
                  />
                ))}
              </g>
            )}

            {/* 3. Primary Milled Architectural Brass Blade (Dual contour) */}
            <path
              d={horizonPathD}
              fill="none"
              stroke="url(#v35-brass-bevel)"
              strokeWidth={2.4}
              strokeLinecap="round"
            />

            {/* 4. Top Specular Glint Ridge */}
            <path
              d={horizonSpecularD}
              fill="none"
              stroke="url(#v35-specular-gold)"
              strokeWidth={1.0}
              opacity={0.85}
            />

            {/* 5. Focal Singularity Node: Solid Milled Brass Core with Filament Corona */}
            <g transform={`translate(${CX}, ${CY + sagY * 0.9})`}>
              {/* Outer Bevel Ring */}
              <circle
                r={interpolate(sagY, [0, 240], [3, 9.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                fill="url(#v35-brass-bevel)"
                filter="url(#v35-ao-shadow)"
              />
              {/* Illuminated Luminous Core (Material 4) */}
              <circle
                r={interpolate(sagY, [0, 240], [1.5, 4.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                fill="#FFFFFF"
                filter="url(#v35-filament-corona)"
              />
            </g>
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 2: Ocular Iris Aperture with Physical Brass Leaves & Glass Bezel*/}
        {/* ------------------------------------------------------------------- */}
        {s2Active && (
          <g
            transform={`translate(${CX}, ${CY})`}
            opacity={interpolate(frame, [75, 84, 158, 170], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
          >
            {/* 1. Deep Recessed Obsidian Pupil Well (The Doorway to Space) */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX * 0.42}
              ry={irisRadiusY * 0.42}
              fill="url(#v35-obsidian-slab)"
              filter="url(#v35-deep-cavity)"
            />

            {/* 2. Outer Chamfered Smoked Quartz Bezel (Material 3) */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX + irisRattle + 22}
              ry={irisRadiusY + irisRattle * 0.5 + 14}
              fill="url(#v35-silica-scrim)"
              stroke="rgba(240, 246, 252, 0.4)"
              strokeWidth={0.8}
            />

            {/* 3. Outer Milled Brass Framing Chassis */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX + irisRattle}
              ry={irisRadiusY + irisRattle * 0.5}
              fill="none"
              stroke="url(#v35-brass-bevel)"
              strokeWidth={3}
              filter="url(#v35-ao-shadow)"
            />

            {/* 4. Engraved Degree Calibrations on Outer Rim (Material 5) */}
            {Array.from({ length: 36 }).map((_, i) => {
              const deg = i * 10;
              const rad = (deg * Math.PI) / 180;
              const isMajor = deg % 30 === 0;
              const rBase = irisRadiusX + irisRattle + 8;
              const rTip = rBase + (isMajor ? 8 : 4);
              const aspect = irisRadiusY / irisRadiusX;
              return (
                <line
                  key={`v35-iris-dial-${i}`}
                  x1={Math.cos(rad) * rBase}
                  y1={Math.sin(rad) * (rBase * aspect)}
                  x2={Math.cos(rad) * rTip}
                  y2={Math.sin(rad) * (rTip * aspect)}
                  stroke="#E5A93C"
                  strokeWidth={isMajor ? 1.0 : 0.5}
                  opacity={isMajor ? 0.65 : 0.3}
                />
              );
            })}

            {/* 5. Physical Overlapping Shutter Blades (12 Articulated Brass Leaves) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const baseAngle = (i * (360 / 12) * Math.PI) / 180;
              const rayDelay = (i % 3) * 2;
              const bladeDeploy = interpolate(frame - 88 - rayDelay, [0, 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: MotionCurves.snapSettle,
              });

              const rInner = irisRadiusX * 0.44;
              const rOuter = irisRadiusX * (0.44 + 0.52 * bladeDeploy);
              const aspect = irisRadiusY / irisRadiusX;

              // Tangent offset for overlapping shutter blade appearance
              const tangentAngle = baseAngle + 0.35;
              const x1 = Math.cos(baseAngle) * rInner;
              const y1 = Math.sin(baseAngle) * (rInner * aspect);
              const x2 = Math.cos(tangentAngle) * rOuter;
              const y2 = Math.sin(tangentAngle) * (rOuter * aspect);

              return (
                <g key={`v35-iris-blade-${i}`}>
                  {/* Blade Edge Shadow */}
                  <line
                    x1={x1 + 1.5}
                    y1={y1 + 2.5}
                    x2={x2 + 1.5}
                    y2={y2 + 2.5}
                    stroke="#000000"
                    strokeWidth={2.4}
                    opacity={0.7}
                  />
                  {/* Primary Milled Brass Blade Lip */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 2 === 0 ? "url(#v35-brass-bevel)" : "#FFF4D2"}
                    strokeWidth={1.8}
                    opacity={0.85 * bladeDeploy}
                  />
                </g>
              );
            })}

            {/* 6. Inner Singularity Rim (Luminous Filament Core) */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX * 0.42}
              ry={irisRadiusY * 0.42}
              fill="none"
              stroke="#FFF7E6"
              strokeWidth={1.4}
              filter="url(#v35-filament-corona)"
            />
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 3: Dimensional Colonnade & Sculpted Relief «نقطه دید»          */}
        {/* ------------------------------------------------------------------- */}
        {s3Active && (
          <g
            transform={`translate(${CX}, ${CY + colonnadeZ}) scale(${colonnadeScale * architectureCollapse})`}
            opacity={architectureCollapse > 0 ? 1 : 0}
          >
            {/* 1. Recessed Obsidian Basalt Floor Paving (Multi-plane Perspective Slabs) */}
            {[-520, -260, 0, 260, 520].map((xOffset, i) => (
              <g key={`v35-monolith-slab-${i}`}>
                {/* Monolithic Floor Slabs with Beveled Edges */}
                <polygon
                  points={`${xOffset * 2.8 - 110},620 ${xOffset * 2.8 + 110},620 ${xOffset * 0.16 + 25},-90 ${xOffset * 0.16 - 25},-90`}
                  fill="url(#v35-obsidian-slab)"
                  stroke="#161F2E"
                  strokeWidth={0.8}
                  opacity={0.85}
                />
                {/* Hairline Inlaid Brass Seams (Material 1 inlays) */}
                <line
                  x1={xOffset * 2.8}
                  y1={620}
                  x2={xOffset * 0.16}
                  y2={-90}
                  stroke="#E5A93C"
                  strokeWidth={0.75}
                  strokeDasharray="6 12"
                  opacity={0.4}
                />
              </g>
            ))}

            {/* 2. Floating Smoked Quartz Scrim (Material 3 Midground Occluder) */}
            <rect
              x={-560}
              y={-180}
              width={1120}
              height={340}
              rx={8}
              fill="url(#v35-silica-scrim)"
              stroke="rgba(212, 175, 55, 0.25)"
              strokeWidth={1.2}
              filter="url(#v35-deep-cavity)"
            />

            {/* 3. Deep Drop Shadow Cast by the Sculpted Letters onto Floor */}
            <text
              x={0}
              y={26}
              textAnchor="middle"
              fill="#000000"
              fontSize={130}
              fontWeight={900}
              style={{
                filter: "url(#v35-deep-cavity)",
                letterSpacing: "8px",
                opacity: 0.95,
              }}
            >
              نقطه دید
            </text>

            {/* 4. Beveled Base Extrusion Layer (Warm Brass Shadow Core) */}
            <text
              x={0}
              y={22}
              textAnchor="middle"
              fill="#6C470E"
              fontSize={130}
              fontWeight={900}
              style={{
                letterSpacing: "8px",
              }}
            >
              نقطه دید
            </text>

            {/* 5. Front Sculpted Relief Face: Milled Architectural Brass Inlay */}
            <text
              x={0}
              y={18}
              textAnchor="middle"
              fill="url(#v35-brass-bevel)"
              fontSize={130}
              fontWeight={900}
              stroke="#FFF7E6"
              strokeWidth={1.0}
              style={{
                letterSpacing: "8px",
              }}
            >
              نقطه دید
            </text>

            {/* 6. Engraved Architectural Metadata Plaque (Material 5) */}
            <g transform="translate(0, 84)">
              <rect
                x={-180}
                y={-14}
                width={360}
                height={26}
                fill="#0E131B"
                stroke="#E5A93C"
                strokeWidth={0.8}
                rx={3}
                opacity={0.85}
              />
              <text
                x={0}
                y={4}
                textAnchor="middle"
                fill="#F3E5AB"
                fontSize={11}
                fontFamily="monospace"
                letterSpacing={5}
                opacity={0.9}
              >
                COORD // OPTICAL AXIS // 35.6892° N
              </text>
            </g>
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 4: The Sacred Milled Brass Nuqteh (Stillness Monolith)          */}
        {/* ------------------------------------------------------------------- */}
        {s4Active && (
          <g
            transform={`translate(${CX}, ${CY}) scale(${finalRhombusScale})`}
            opacity={interpolate(frame, [264, 272, 336, 344], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
          >
            {/* 1. Deep Monolithic Ambient Occlusion Shadow (Heavy Mass Grounding) */}
            <polygon
              points={`0,${-rhombusSide + 12} ${rhombusSide * 1.3 + 10},12 0,${rhombusSide + 12} ${-rhombusSide * 1.3 - 10},12`}
              fill="#000000"
              filter="url(#v35-deep-cavity)"
              opacity={0.95}
            />

            {/* 2. Primary 4-Faceted Milled Brass Diamond Block (Nuqteh) */}
            {/* Facet A: Top-Left Specular Surface (Faces Key Light) */}
            <polygon
              points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,0`}
              fill="#FFF4D2"
              stroke="#FFF7E6"
              strokeWidth={0.8}
            />
            {/* Facet B: Top-Right Warm Core */}
            <polygon
              points={`0,0 ${rhombusSide * 1.3},0 0,${rhombusSide}`}
              fill="#E5A93C"
              stroke="#C59B27"
              strokeWidth={0.8}
            />
            {/* Facet C: Bottom-Left Shadow Bevel */}
            <polygon
              points={`0,0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
              fill="#996515"
              stroke="#6C470E"
              strokeWidth={0.8}
            />
            {/* Facet D: Upper-Left Chamfer */}
            <polygon
              points={`0,${-rhombusSide} 0,0 ${-rhombusSide * 1.3},0`}
              fill="#F3E5AB"
              stroke="#E5A93C"
              strokeWidth={0.8}
            />

            {/* 3. Razor Specular Edge Contour (1px Chamfer Rim) */}
            <polygon
              points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
              fill="none"
              stroke="url(#v35-brass-bevel)"
              strokeWidth={2.4}
              filter={isStillnessHold ? "url(#v35-filament-corona)" : undefined}
            />

            {/* 4. Inlaid Astrolabe Vernier Crosshairs (Material 5) */}
            <line x1={0} y1={-rhombusSide + 12} x2={0} y2={rhombusSide - 12} stroke="#05070B" strokeWidth={1.2} strokeDasharray="3 3" opacity={0.7} />
            <line x1={-rhombusSide * 1.3 + 14} y1={0} x2={rhombusSide * 1.3 - 14} y2={0} stroke="#05070B" strokeWidth={1.2} strokeDasharray="3 3" opacity={0.7} />

            {/* 5. Inlaid Core Singularity Dot */}
            <circle cx={0} cy={0} r={3.5} fill="#FFFFFF" filter="url(#v35-filament-corona)" />

            {/* 6. Deliberate Engraved Caption during the 35-Frame Sacred Stillness Hold */}
            {isStillnessHold && (
              <g transform={`translate(0, ${rhombusSide + 46})`}>
                <rect
                  x={-140}
                  y={-14}
                  width={280}
                  height={24}
                  fill="#080B10"
                  stroke="#E5A93C"
                  strokeWidth={0.6}
                  rx={2}
                  opacity={0.85}
                />
                <text
                  x={0}
                  y={3}
                  textAnchor="middle"
                  fill="#FFF7E6"
                  fontSize={11}
                  fontFamily="monospace"
                  letterSpacing={4}
                  opacity={0.9}
                >
                  نقطه صفر // ABSOLUTE SINGULARITY
                </text>
              </g>
            )}
          </g>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* ACT 5: The 10,000x Recoil & Celestial Astrolabe Noor Reveal        */}
        {/* ------------------------------------------------------------------- */}
        {s5Active && (
          <g
            transform={`translate(${CX}, ${CY + worldOffsetY}) scale(${worldScale}) rotate(${celestialDriftAngle})`}
            opacity={interpolate(frame, [335, 342], [0, 1], { extrapolateRight: "clamp" })}
          >
            {/* 1. Deep Celestial Astrolabe Coordinate Rings (Material 5 Engraved Microlines) */}
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
                  key={`v35-celestial-ray-${i}`}
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

            {/* 2. Massive Ambient Occlusion Shadow of «نور» */}
            <text
              x={0}
              y={234}
              textAnchor="middle"
              fill="#000000"
              fontSize={440}
              fontWeight={900}
              style={{
                filter: "url(#v35-deep-cavity)",
                letterSpacing: "12px",
                opacity: wordOpacity * 0.95,
              }}
            >
              نور
            </text>

            {/* 3. Midground Warm Brass Relief Core */}
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

            {/* 4. Foreground Sculpted Milled Brass Face of «نور» */}
            <text
              x={0}
              y={218}
              textAnchor="middle"
              fill="url(#v35-brass-bevel)"
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

            {/* 5. The Diacritical Crown Nuqteh of «ن» (Direct Physical Heir of Act 4) */}
            <g transform="translate(-140, -110)">
              {/* Occlusion Shadow */}
              <polygon
                points={`0,${-rhombusSide + 10} ${rhombusSide * 1.3 + 8},10 0,${rhombusSide + 10} ${-rhombusSide * 1.3 - 8},10`}
                fill="#000000"
                filter="url(#v35-ao-shadow)"
                opacity={0.8}
              />
              {/* Faceted Milled Brass Diamond */}
              <polygon
                points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,0`}
                fill="#FFF4D2"
              />
              <polygon
                points={`0,0 ${rhombusSide * 1.3},0 0,${rhombusSide}`}
                fill="#E5A93C"
              />
              <polygon
                points={`0,0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
                fill="#996515"
              />
              <polygon
                points={`0,${-rhombusSide} 0,0 ${-rhombusSide * 1.3},0`}
                fill="#F3E5AB"
              />
              {/* Specular Rim */}
              <polygon
                points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
                fill="none"
                stroke="url(#v35-specular-gold)"
                strokeWidth={2.4}
                filter="url(#v35-filament-corona)"
              />
            </g>
          </g>
        )}
      </svg>

      {/* ===================================================================== */}
      {/* LAYER 3: FOREGROUND POLISHED OPTICAL FRAME (Material 3 Scrim)         */}
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
        {/* Subtle Architectural Corner Brackets (Framing Restraint) */}
        <g stroke="#E5A93C" strokeWidth={1.2} opacity={0.35}>
          <path d="M 40,65 L 40,40 L 65,40" fill="none" />
          <path d="M 1880,65 L 1880,40 L 1855,40" fill="none" />
          <path d="M 40,1015 L 40,1040 L 65,1040" fill="none" />
          <path d="M 1880,1015 L 1880,1040 L 1855,1040" fill="none" />
        </g>
      </svg>

      {/* ===================================================================== */}
      {/* LAYER 4: FINALE GROUNDING PHILOSOPHICAL TYPOGRAPHY                    */}
      {/* ===================================================================== */}
      {frame >= 390 && (
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: finaleCaptionOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#FFF7E6",
              letterSpacing: 3,
              textShadow: "0 4px 16px rgba(0, 0, 0, 0.95), 0 0 24px rgba(229, 169, 60, 0.6)",
            }}
          >
            تمام جهان در یک نقطه آغاز شد
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: "#E5A93C",
              letterSpacing: 6,
              opacity: 0.9,
            }}
          >
            THE ENTIRE COSMOS BEGAN WITHIN A SINGLE POINT // V35 ART DIRECTED MASTER
          </div>
        </div>
      )}

      {/* Director Metrology Overlays (Subtle & Controlled) */}
      <div style={{ position: "absolute", top: 28, left: 32, color: "#E5A93C", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, opacity: 0.55 }}>
        V35 ART DIRECTION & SPATIAL DEPTH MASTER // THE MONUMENTAL MONOLITH
      </div>
      <div style={{ position: "absolute", top: 28, right: 32, color: "#48CAE4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, opacity: 0.55 }}>
        FRAME: {String(frame).padStart(3, "0")} / 450
      </div>
    </div>
  );
};
