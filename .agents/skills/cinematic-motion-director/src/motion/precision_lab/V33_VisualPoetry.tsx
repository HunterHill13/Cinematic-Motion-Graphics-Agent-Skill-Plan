import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";

/**
 * V33 — Visual Poetry, Nonlinear Transformation & Director-Level Surprise
 * 
 * 15.0 seconds | 450 frames @ 30 FPS | 1920x1080
 * 
 * Concept: "The Blind Spot of Geometry" (The Horizon Within)
 * 
 * World States:
 * 1. The Split Horizon (0-80) - A razor horizon dips under gravitational tension.
 * 2. The Aperture Reinterpretation (80-165) - SURPRISE 1: The curve loops into an iris looking back.
 * 3. The Typographic Interior (165-265) - Camera breaches aperture into an architectural city of «نقطه دید».
 * 4. The Breathless Zero-Point Lock (265-335) - 35-frame absolute zero-velocity freeze of the sacred Rhombus.
 * 5. The 10,000x Recontextualizing Pull-Back (335-450) - SURPRISE 2: The rhombus is revealed as the Nuqteh dot of «نور».
 */

export const V33_VisualPoetry: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // WORLD STATE 1: THE SPLIT HORIZON (Frames 0 - 80)
  // A razor-sharp gold horizon bisects the frame. At Fr 25, a focal dip curves downward.
  // =========================================================================
  const s1Active = frame < 90;
  const horizonSagProgress = interpolate(frame, [20, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Asymmetric tension sag
  const sagDepth = interpolate(horizonSagProgress, [0, 1], [0, 220]);
  const sagWidth = interpolate(horizonSagProgress, [0, 1], [0, 380]);

  // Horizon path with cubic bezier focal dip
  const horizonPathD = `M 0,${CY} L ${CX - sagWidth},${CY} C ${CX - sagWidth * 0.4},${CY + sagDepth * 0.9} ${CX + sagWidth * 0.4},${CY + sagDepth * 0.9} ${CX + sagWidth},${CY} L ${W},${CY}`;

  // =========================================================================
  // WORLD STATE 2: THE APERTURE REINTERPRETATION (Frames 80 - 165)
  // SURPRISE 1: The sagging curve wraps into its reflection, forming an eye aperture.
  // =========================================================================
  const s2Active = frame >= 75 && frame < 175;
  const apertureOpenProgress = interpolate(frame, [78, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera push-in toward the aperture pupil (Frames 125 to 165)
  const cameraBreachZoom = interpolate(frame, [125, 165], [1, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const irisRadiusX = interpolate(apertureOpenProgress, [0, 1], [10, 320]) * cameraBreachZoom;
  const irisRadiusY = interpolate(apertureOpenProgress, [0, 1], [2, 180]) * cameraBreachZoom;

  // =========================================================================
  // WORLD STATE 3: THE TYPOGRAPHIC INTERIOR (Frames 165 - 265)
  // Camera breaches pupil into an architectural Persian typographic colonnade: «نقطه دید»
  // =========================================================================
  const s3Active = frame >= 160 && frame < 275;
  const breachFade = interpolate(frame, [160, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Architectural perspective flight through letterforms
  const flightProgress = interpolate(frame, [170, 245], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Colonnade perspective scale & convergence
  const colonnadeScale = interpolate(flightProgress, [0, 1], [0.6, 1.25]);
  const colonnadeZ = interpolate(flightProgress, [0, 1], [0, -180]);

  // Collapse of typographic architecture into center rhombus (Frames 240 to 268)
  const architectureCollapse = interpolate(frame, [245, 268], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // WORLD STATE 4: THE BREATHLESS ZERO-POINT LOCK (Frames 265 - 335)
  // The sacred calligraphic Rhombus (Nuqteh) locks dead center.
  // STILLNESS HOLD: Frames 285 to 320 (35 frames of v = 0).
  // =========================================================================
  const s4Active = frame >= 265 && frame < 345;
  const isStillnessHold = frame >= 285 && frame <= 320;

  // Diamond rhombus size
  const rhombusSide = 110; // Calligraphic ratio

  // Pre-recoil micro-glow (Frames 321 to 335)
  const preRecoilGlow = frame > 320 && frame < 338
    ? interpolate(frame, [321, 335], [1, 2.5])
    : 1;

  // =========================================================================
  // WORLD STATE 5: THE 10,000X RECONTEXTUALIZING PULL-BACK (Frames 335 - 450)
  // SURPRISE 2: The camera pulls back violently, revealing the rhombus is the Nuqteh
  // of the giant Persian word «نور» (Light / Enlightenment).
  // =========================================================================
  const s5Active = frame >= 335;
  const pullBackAge = Math.max(0, frame - 335);

  // Exponential scale pullback spring
  const pullBackSpring = spring({
    frame: pullBackAge,
    fps,
    config: { damping: 18, stiffness: 60, mass: 1.4 },
  });

  // Macro to Mega-Scale interpolation
  const worldScale = interpolate(pullBackSpring, [0, 1], [9.0, 0.45]);
  const worldOffsetY = interpolate(pullBackSpring, [0, 1], [0, 80]);

  // Word «نور» revelation opacity
  const wordRevealOpacity = interpolate(pullBackSpring, [0.35, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final philosophical caption grounding (Frames 390 - 450)
  const finaleCaptionOpacity = interpolate(frame, [395, 425], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
          <pattern id="poetic-grid" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 96 0 L 0 0 0 96" fill="none" stroke="#E5A93C" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#poetic-grid)" />
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
        {/* WORLD STATE 1: Horizon Line                                       */}
        {/* ================================================================= */}
        {s1Active && (
          <g opacity={interpolate(frame, [75, 88], [1, 0], { extrapolateRight: "clamp" })}>
            <path
              d={horizonPathD}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={2}
            />
            {/* Focal Dip Origin Node */}
            <circle
              cx={CX}
              cy={CY + sagDepth * 0.9}
              r={interpolate(horizonSagProgress, [0, 1], [0, 6])}
              fill="#FFFFFF"
              filter="drop-shadow(0 0 10px #E5A93C)"
            />
          </g>
        )}

        {/* ================================================================= */}
        {/* WORLD STATE 2: The Aperture Eye / Pupil Breach                    */}
        {/* ================================================================= */}
        {s2Active && (
          <g
            transform={`translate(${CX}, ${CY})`}
            opacity={interpolate(frame, [75, 85, 155, 170], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
          >
            {/* Outer Iris Rings */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX}
              ry={irisRadiusY}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={1.8}
            />
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX * 0.72}
              ry={irisRadiusY * 0.72}
              fill="none"
              stroke="#48CAE4"
              strokeWidth={1}
              strokeDasharray="6 8"
              opacity={0.7}
            />
            {/* Deep Pupil Aperture (Portal to Interior) */}
            <ellipse
              cx={0}
              cy={0}
              rx={irisRadiusX * 0.38}
              ry={irisRadiusY * 0.38}
              fill="#05070A"
              stroke="#FFFFFF"
              strokeWidth={1.2}
            />
            {/* Ocular Radials */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * (360 / 12) * Math.PI) / 180;
              const rIn = irisRadiusX * 0.42;
              const rOut = irisRadiusX * 0.92;
              return (
                <line
                  key={`iris-ray-${i}`}
                  x1={Math.cos(angle) * rIn}
                  y1={Math.sin(angle) * (rIn * (irisRadiusY / irisRadiusX))}
                  x2={Math.cos(angle) * rOut}
                  y2={Math.sin(angle) * (rOut * (irisRadiusY / irisRadiusX))}
                  stroke="#48CAE4"
                  strokeWidth={0.75}
                  opacity={0.5}
                />
              );
            })}
          </g>
        )}

        {/* ================================================================= */}
        {/* WORLD STATE 3: The Architectural Typographic Interior «نقطه دید»   */}
        {/* ================================================================= */}
        {s3Active && (
          <g
            transform={`translate(${CX}, ${CY + colonnadeZ}) scale(${colonnadeScale * architectureCollapse})`}
            opacity={breachFade * architectureCollapse}
          >
            {/* Perspective Depth Lines */}
            {[-380, -190, 190, 380].map((xOffset, i) => (
              <line
                key={`persp-col-${i}`}
                x1={xOffset * 2.2}
                y1={450}
                x2={xOffset * 0.15}
                y2={-60}
                stroke="#21262D"
                strokeWidth={1}
                strokeDasharray="4 6"
              />
            ))}

            {/* Monumental Persian Typographic Architecture: «نقطه دید» */}
            <text
              x={0}
              y={20}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={130}
              fontWeight={900}
              style={{
                filter: "drop-shadow(0 0 30px rgba(229, 169, 60, 0.8))",
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
              opacity={0.8}
            >
              ARCHITECTURAL POINT OF VIEW
            </text>
          </g>
        )}

        {/* ================================================================= */}
        {/* WORLD STATE 4: The Sacred Nuqteh Rhombus & 35-Frame Freeze        */}
        {/* ================================================================= */}
        {s4Active && (
          <g
            transform={`translate(${CX}, ${CY}) scale(${preRecoilGlow})`}
            opacity={interpolate(frame, [260, 275, 336, 345], [0, 1, 1, 0], { extrapolateRight: "clamp" })}
          >
            {/* The Sacred 45-degree Calligraphic Diamond (Nuqteh) */}
            <polygon
              points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
              fill="#E5A93C"
              stroke="#FFFFFF"
              strokeWidth={2}
              style={{
                filter: isStillnessHold
                  ? "drop-shadow(0 0 25px rgba(229, 169, 60, 0.95))"
                  : "drop-shadow(0 0 14px rgba(229, 169, 60, 0.6))",
              }}
            />

            {/* Internal Geometric Construction Lines */}
            <line x1={0} y1={-rhombusSide} x2={0} y2={rhombusSide} stroke="#05070A" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
            <line x1={-rhombusSide * 1.3} y1={0} x2={rhombusSide * 1.3} y2={0} stroke="#05070A" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />

            {/* Subtle Callout during the 35-frame stillness */}
            {isStillnessHold && (
              <text
                x={0}
                y={rhombusSide + 50}
                textAnchor="middle"
                fill="#F8F9FA"
                fontSize={12}
                fontFamily="monospace"
                letterSpacing={4}
                opacity={0.7}
              >
                نقطه صفر // THE UNBROKEN ATOM OF SPACE
              </text>
            )}
          </g>
        )}

        {/* ================================================================= */}
        {/* WORLD STATE 5: The 10,000x Pull-Back & Reveal of «نور»            */}
        {/* ================================================================= */}
        {s5Active && (
          <g
            transform={`translate(${CX}, ${CY + worldOffsetY}) scale(${worldScale})`}
            opacity={interpolate(frame, [335, 345], [0, 1], { extrapolateRight: "clamp" })}
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
                opacity: wordRevealOpacity,
                filter: "drop-shadow(0 0 50px rgba(229, 169, 60, 0.5))",
                letterSpacing: "12px",
              }}
            >
              نور
            </text>

            {/* The Nuqteh Dot of the letter «ن» (The EXACT Rhombus from State 4!) */}
            <g transform="translate(-140, -110)">
              <polygon
                points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
                fill="#E5A93C"
                stroke="#FFFFFF"
                strokeWidth={2}
                style={{
                  filter: "drop-shadow(0 0 30px rgba(229, 169, 60, 0.9))",
                }}
              />
            </g>

            {/* Cosmic Calligraphic Grid Envelope */}
            <circle
              cx={0}
              cy={60}
              r={540}
              fill="none"
              stroke="#48CAE4"
              strokeWidth={1}
              strokeDasharray="8 12"
              opacity={wordRevealOpacity * 0.4}
            />
          </g>
        )}
      </svg>

      {/* Finale Grounding Philosophical Statement (Frames 390 - 450) */}
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
            THE ENTIRE COSMOS BEGAN WITHIN A SINGLE POINT // V33 POETIC MASTER
          </div>
        </div>
      )}

      {/* Discrete Director Reticles */}
      <div style={{ position: "absolute", top: 28, left: 32, color: "#E5A93C", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, opacity: 0.6 }}>
        V33 POETIC CONTINUITY // THE BLIND SPOT OF GEOMETRY
      </div>
      <div style={{ position: "absolute", top: 28, right: 32, color: "#48CAE4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, opacity: 0.6 }}>
        FRAME: {String(frame).padStart(3, "0")} / 450
      </div>
    </div>
  );
};
