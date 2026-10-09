import React from "react";
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";
import { MotionCurves } from "../curves/AuthoredKeyframeEngine";

/**
 * V34 — Motion Choreography & Kinetic Continuity Master Composition
 * 
 * 15.0 seconds | 450 frames @ 30 FPS | 1920x1080
 * 
 * Choreography Strategy: "The Calligrapher's Breath"
 * - Re-authors the temporal trajectories of V33 without changing the creative concept.
 * - Replaces unmotivated linear interpolations with calibrated velocity profiles.
 * - Introduces anticipation, non-linear acceleration, ballistic camera breaches,
 *   hard deceleration braking into the 35-frame stillness hold, and heavy inertial recoil.
 */

export const V34_MotionChoreography: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // ACT 1: HORIZON TENSION & ELASTIC DAMPED SAG (Frames 0 - 80)
  // Kinetic Strategy:
  // - Fr 0-20: Rest (razor line).
  // - Fr 20-28: Anticipation bow upward (-10px).
  // - Fr 28-58: Non-linear gravitational acceleration into sag (+240px).
  // - Fr 58-75: Damped elastic settle decaying into rest.
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
    // Heavy drop curve (cubic in-out with heavy front acceleration)
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
  const horizonPathD = `M 0,${CY} L ${CX - sagWidth},${CY} C ${CX - sagWidth * 0.4},${CY + sagY * 0.9} ${CX + sagWidth * 0.4},${CY + sagY * 0.9} ${CX + sagWidth},${CY} L ${W},${CY}`;

  // =========================================================================
  // ACT 2: OCULAR APERTURE & BALLISTIC CAMERA BREACH (Frames 78 - 165)
  // Kinetic Strategy:
  // - Fr 78-112: Aperture opens with snap-settle curve (fast peel -> smooth lock).
  // - Fr 90-120: Radial iris spokes deploy with staggered angular phase lag.
  // - Fr 122-165: Ballistic camera breach (exponential acceleration curve).
  // =========================================================================
  const s2Active = frame >= 76 && frame < 172;

  // Aperture Opening Curve (Authored snap-settle)
  const apertureProgress = interpolate(frame, [78, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: MotionCurves.snapSettle,
  });

  // Ballistic Camera Breach Zoom (Non-linear exponential power curve)
  let cameraBreachZoom = 1.0;
  if (frame >= 122 && frame <= 165) {
    const tBreach = (frame - 122) / (165 - 122);
    // Exponential acceleration: slow start -> violent thrust through the pupil threshold
    const breachCurve = Math.pow(tBreach, 3.4);
    cameraBreachZoom = interpolate(breachCurve, [0, 1], [1.0, 18.0]);
  } else if (frame > 165) {
    cameraBreachZoom = 18.0;
  }

  const irisRadiusX = interpolate(apertureProgress, [0, 1], [10, 320]) * cameraBreachZoom;
  const irisRadiusY = interpolate(apertureProgress, [0, 1], [2, 180]) * cameraBreachZoom;

  // Secondary iris wobble during opening
  const irisRattle = frame >= 85 && frame <= 105
    ? Math.sin((frame - 85) * 1.2) * (1 - (frame - 85) / 20) * 4
    : 0;

  // =========================================================================
  // ACT 3: THE TYPOGRAPHIC INTERIOR «نقطه دید» (Frames 165 - 265)
  // Kinetic Strategy:
  // - Inherits high velocity from breach: camera decelerates from hyper-speed into space.
  // - Colonnade letters deploy with staggered spatial depth lag.
  // - Fr 245-275: Heavy centripetal collapse pulling into barycenter.
  // =========================================================================
  const s3Active = frame >= 162 && frame < 278;

  // Camera entry deceleration: high-speed glide into stable perspective
  const cruiseProgress = interpolate(frame, [164, 245], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.12, 0.85, 0.28, 1), // Heavy inertial glide curve
  });

  const colonnadeScale = interpolate(cruiseProgress, [0, 1], [0.55, 1.35]);
  const colonnadeZ = interpolate(cruiseProgress, [0, 1], [220, -160]);

  // Centripetal Hydraulic Collapse of Typography (Fr 245 to 275)
  let architectureCollapse = 1.0;
  if (frame >= 245 && frame <= 275) {
    const tCol = (frame - 245) / 30;
    // Aggressive pull: accelerates inward violently, then hits braking threshold
    architectureCollapse = interpolate(tCol, [0, 1], [1.0, 0.0], {
      easing: Easing.bezier(0.7, 0, 0.84, 0),
    });
  } else if (frame > 275) {
    architectureCollapse = 0.0;
  }

  // =========================================================================
  // ACT 4: THE SACRED NUQTEH & 35-FRAME BRAKED STILLNESS (Frames 265 - 335)
  // Kinetic Strategy:
  // - Fr 268-284: Hard deceleration brake (viscous arrest). The incoming mass
  //   slams into the origin and settles with a 2-frame micro-compression.
  // - Fr 285-320: EXACT 35-FRAME ZERO-VELOCITY STILLNESS (v = 0).
  // - Fr 321-335: Pre-recoil critical mass tension (harmonic shudder).
  // =========================================================================
  const s4Active = frame >= 265 && frame < 348;
  const isStillnessHold = frame >= 285 && frame <= 320;
  const rhombusSide = 110;

  // Arrival Brake & Micro-Compression (Frames 268 to 284)
  let rhombusArrivalScale = 1.0;
  if (frame >= 268 && frame < 285) {
    const tArr = (frame - 268) / 16;
    // Slams in from large scale -> overshoots slightly into squashed rhombus -> settles
    rhombusArrivalScale = interpolate(tArr, [0, 0.65, 0.85, 1.0], [2.4, 0.94, 1.03, 1.0], {
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    });
  }

  // Critical Pre-Recoil Shudder (Frames 321 to 335)
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
  // Kinetic Strategy:
  // - Fr 335-342: Explosive launch kick (instantaneous high velocity recoil).
  // - Fr 342-410: Non-linear exponential deceleration with heavy mass settling.
  // - Fr 410-450: Eternal micro-drift rest (0.05 deg/sec).
  // =========================================================================
  const s5Active = frame >= 335;
  const pullBackAge = Math.max(0, frame - 335);

  // Authored Calibrated Recoil Curve: Explosive launch -> high inertia glide -> massive settle
  const pullBackProgress = interpolate(pullBackAge, [0, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1), // Strong deceleration with zero synthetic rubberiness
  });

  const worldScale = interpolate(pullBackProgress, [0, 1], [9.5, 0.45]);
  const worldOffsetY = interpolate(pullBackProgress, [0, 1], [0, 80]);

  // Text «نور» landing weight: settles with gravitational presence
  const wordLandingProgress = interpolate(pullBackAge, [15, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const wordOpacity = interpolate(wordLandingProgress, [0, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cosmic slow drift
  const celestialDriftAngle = frame >= 335 ? (frame - 335) * 0.06 : 0;

  // Finale grounding caption
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
        backgroundColor: "#05070A",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Vazirmatn', -apple-system, sans-serif",
      }}
    >
      {/* Background Architectural Canvas Grid */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          pointerEvents: "none",
          opacity: 0.08,
        }}
      >
        <defs>
          <pattern id="v34-grid" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 96 0 L 0 0 0 96" fill="none" stroke="#E5A93C" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#v34-grid)" />
      </svg>

      {/* Main Vector Choreography Layer */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
        }}
      >
        {/* ================================================================= */}
        {/* ACT 1: Horizon Line with Tension & Damped Sag                     */}
        {/* ================================================================= */}
        {s1Active && (
          <g opacity={interpolate(frame, [75, 86], [1, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.5, 0, 0.75, 0) })}>
            <path
              d={horizonPathD}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={2.2}
            />
            {/* Focal Node with Dynamic Gravitational Weight */}
            <circle
              cx={CX}
              cy={CY + sagY * 0.9}
              r={interpolate(sagY, [0, 240], [2, 7.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              fill="#FFFFFF"
              filter="drop-shadow(0 0 12px #E5A93C)"
            />
          </g>
        )}

        {/* ================================================================= */}
        {/* ACT 2: Ocular Iris & Ballistic Camera Breach                      */}
        {/* ================================================================= */}
        {s2Active && (
          <g
            transform={`translate(${CX}, ${CY})`}
            opacity={interpolate(frame, [75, 84, 158, 170], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
          >
            {/* Outer Iris Rings with Secondary Micro-Rattle */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX + irisRattle}
              ry={irisRadiusY + irisRattle * 0.5}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={1.8}
            />
            <ellipse
              cx={0}
              cy={0}
              rx={(irisRadiusX + irisRattle) * 0.72}
              ry={(irisRadiusY + irisRattle * 0.5) * 0.72}
              fill="none"
              stroke="#48CAE4"
              strokeWidth={1}
              strokeDasharray="6 8"
              opacity={0.75}
            />
            {/* Deep Pupil Aperture (Portal) */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX * 0.38}
              ry={irisRadiusY * 0.38}
              fill="#05070A"
              stroke="#FFFFFF"
              strokeWidth={1.4}
            />
            {/* Staggered Radial Ocular Spokes */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * (360 / 16) * Math.PI) / 180;
              // Secondary staggered deployment lag per ray
              const rayDelay = (i % 4) * 2;
              const rayDeploy = interpolate(frame - 88 - rayDelay, [0, 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: MotionCurves.snapSettle,
              });
              const rIn = irisRadiusX * 0.42;
              const rOut = irisRadiusX * (0.42 + 0.5 * rayDeploy);
              return (
                <line
                  key={`v34-iris-ray-${i}`}
                  x1={Math.cos(angle) * rIn}
                  y1={Math.sin(angle) * (rIn * (irisRadiusY / irisRadiusX))}
                  x2={Math.cos(angle) * rOut}
                  y2={Math.sin(angle) * (rOut * (irisRadiusY / irisRadiusX))}
                  stroke={i % 2 === 0 ? "#E5A93C" : "#48CAE4"}
                  strokeWidth={0.8}
                  opacity={0.6 * rayDeploy}
                />
              );
            })}
          </g>
        )}

        {/* ================================================================= */}
        {/* ACT 3: Typographic Architectural Interior «نقطه دید»             */}
        {/* ================================================================= */}
        {s3Active && (
          <g
            transform={`translate(${CX}, ${CY + colonnadeZ}) scale(${colonnadeScale * architectureCollapse})`}
            opacity={architectureCollapse > 0 ? 1 : 0}
          >
            {/* Parallax Floor Colonnades */}
            {[-420, -210, 210, 420].map((xOffset, i) => (
              <line
                key={`v34-persp-${i}`}
                x1={xOffset * 2.4}
                y1={480}
                x2={xOffset * 0.12}
                y2={-70}
                stroke="#21262D"
                strokeWidth={1.2}
                strokeDasharray="4 6"
              />
            ))}

            {/* Monumental Persian Typography: «نقطه دید» */}
            <text
              x={0}
              y={20}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={130}
              fontWeight={900}
              style={{
                filter: "drop-shadow(0 0 32px rgba(229, 169, 60, 0.85))",
                letterSpacing: "8px",
              }}
            >
              نقطه دید
            </text>

            <text
              x={0}
              y={80}
              textAnchor="middle"
              fill="#48CAE4"
              fontSize={15}
              fontFamily="monospace"
              letterSpacing={6}
              opacity={0.85}
            >
              ARCHITECTURAL POINT OF VIEW
            </text>
          </g>
        )}

        {/* ================================================================= */}
        {/* ACT 4: The Sacred Rhombus & 35-Frame Braked Stillness              */}
        {/* ================================================================= */}
        {s4Active && (
          <g
            transform={`translate(${CX}, ${CY}) scale(${finalRhombusScale})`}
            opacity={interpolate(frame, [264, 272, 336, 344], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
          >
            {/* The Sacred 45-degree Calligraphic Diamond (Nuqteh) */}
            <polygon
              points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
              fill="#E5A93C"
              stroke="#FFFFFF"
              strokeWidth={2}
              style={{
                filter: isStillnessHold
                  ? "drop-shadow(0 0 28px rgba(229, 169, 60, 1.0))"
                  : `drop-shadow(0 0 ${16 * preRecoilGlow}px rgba(229, 169, 60, ${0.7 * preRecoilGlow}))`,
              }}
            />

            {/* Internal Geometric Crosshairs */}
            <line x1={0} y1={-rhombusSide} x2={0} y2={rhombusSide} stroke="#05070A" strokeWidth={1} strokeDasharray="3 3" opacity={0.65} />
            <line x1={-rhombusSide * 1.3} y1={0} x2={rhombusSide * 1.3} y2={0} stroke="#05070A" strokeWidth={1} strokeDasharray="3 3" opacity={0.65} />

            {/* Subtle Callout during the 35-Frame Stillness Hold */}
            {isStillnessHold && (
              <text
                x={0}
                y={rhombusSide + 50}
                textAnchor="middle"
                fill="#F8F9FA"
                fontSize={12}
                fontFamily="monospace"
                letterSpacing={4}
                opacity={0.8}
              >
                نقطه صفر // THE UNBROKEN ATOM OF SPACE
              </text>
            )}
          </g>
        )}

        {/* ================================================================= */}
        {/* ACT 5: The 10,000x Recoil & Gravitational Noor Reveal              */}
        {/* ================================================================= */}
        {s5Active && (
          <g
            transform={`translate(${CX}, ${CY + worldOffsetY}) scale(${worldScale}) rotate(${celestialDriftAngle})`}
            opacity={interpolate(frame, [335, 342], [0, 1], { extrapolateRight: "clamp" })}
          >
            {/* The Master Calligraphic Word: «نور» */}
            <text
              x={0}
              y={220}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={440}
              fontWeight={900}
              style={{
                opacity: wordOpacity,
                filter: "drop-shadow(0 0 54px rgba(229, 169, 60, 0.55))",
                letterSpacing: "12px",
              }}
            >
              نور
            </text>

            {/* The Nuqteh Dot of «ن» (Direct descendant of the Act 4 Rhombus) */}
            <g transform="translate(-140, -110)">
              <polygon
                points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
                fill="#E5A93C"
                stroke="#FFFFFF"
                strokeWidth={2}
                style={{
                  filter: "drop-shadow(0 0 32px rgba(229, 169, 60, 0.95))",
                }}
              />
            </g>

            {/* Cosmic Celestial Ring with Dash Offset */}
            <circle
              cx={0}
              cy={60}
              r={540}
              fill="none"
              stroke="#48CAE4"
              strokeWidth={1}
              strokeDasharray="8 12"
              opacity={wordOpacity * 0.45}
            />
          </g>
        )}
      </svg>

      {/* Finale Grounding Philosophical Caption */}
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
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: 2,
              textShadow: "0 0 20px rgba(229, 169, 60, 0.7)",
            }}
          >
            تمام جهان در یک نقطه آغاز شد
          </div>
          <div
            style={{
              fontSize: 13,
              fontFamily: "monospace",
              color: "#E5A93C",
              letterSpacing: 6,
            }}
          >
            THE ENTIRE COSMOS BEGAN WITHIN A SINGLE POINT // V34 CHOREOGRAPHED MASTER
          </div>
        </div>
      )}

      {/* Director Overlay Reticles */}
      <div style={{ position: "absolute", top: 28, left: 32, color: "#E5A93C", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, opacity: 0.6 }}>
        V34 MOTION CHOREOGRAPHY // KINETIC CONTINUITY MASTER
      </div>
      <div style={{ position: "absolute", top: 28, right: 32, color: "#48CAE4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, opacity: 0.6 }}>
        FRAME: {String(frame).padStart(3, "0")} / 450
      </div>
    </div>
  );
};
