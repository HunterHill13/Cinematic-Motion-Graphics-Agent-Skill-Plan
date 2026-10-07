import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { MotionCurves } from "../curves/AuthoredKeyframeEngine";

/**
 * V36.5 CRAFT MASTERPIECE — MICRO-SEQUENCE MOTION POLISH
 * 
 * Target: 6.00 seconds | 180 frames @ 30 FPS | 1920x1080 Full HD | Silent
 * Selected Moment: 2D Flat Numeral "01" into 3D Architectural Monolith
 * Strategy: Strategy B (Optical Perspective Deception, Shifting Normals & Volumetric Orbit)
 * 
 * Choreography Phases:
 * 1. Phase 1 — PREPARATION (Frames 0 - 36):
 *    Pristine 2D Swiss poster layout. At Frame 22, an anticipatory specular edge-light
 *    glides diagonally across the top bevel, subtly forecasting volume before release.
 * 2. Phase 2 — RELEASE & ORBIT (Frames 36 - 88):
 *    Camera executes an authored 3D orbital sweep (X: 0° -> 38°, Y: 0° -> -12°, Z: 0° -> -28°).
 *    Acceleration is driven by a custom cubic ease (bezier(0.25, 0.1, 0.25, 1)).
 * 3. Phase 3 — VOLUMETRIC EXTRUSION & NORMALS (Frames 88 - 138):
 *    True geometric faces open with differentiated lighting normals:
 *    - Front Face: Archival Carbon (#0C0E12)
 *    - Top Face: Specular Alabaster Rim (#F5F6F8)
 *    - Side Extrusion: Solid Milled Graphite (#1E2530)
 *    - Ambient Occlusion: Cast floor shadow stretching across layout rules.
 * 4. Phase 4 — CONSEQUENCE & VELOCITY HANDOFF (Frames 138 - 158):
 *    Rotational momentum transfers into a high-speed light sweep across the Klein Blue apex.
 * 5. Phase 5 — ARCHITECTURAL SETTLE (Frames 158 - 180):
 *    A decisive latching stop with a single microscopic damped settling breath (decay: 0.18).
 */

export const V36_5_CraftMasterpiece: React.FC = () => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // 1. PRIMARY MOTION: CAMERA ORBIT & ROTATIONAL CHOREOGRAPHY
  // =========================================================================
  // Phase 1 Anticipation: Subtle counter-tilt before release (Frames 24 to 36)
  const antProgress = interpolate(frame, [24, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const antRotateX = interpolate(antProgress, [0, 1], [0, -1.8]);
  const antRotateZ = interpolate(antProgress, [0, 1], [0, 1.2]);

  // Phase 2 & 3: Main Orbit & Dimension Shift (Frames 36 to 125)
  const orbitProgress = interpolate(frame, [36, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1), // Crisp cinematic ease-out with authoritative drive
  });

  const baseRotateX = interpolate(orbitProgress, [0, 1], [0, 42]);
  const baseRotateY = interpolate(orbitProgress, [0, 1], [0, -14]);
  const baseRotateZ = interpolate(orbitProgress, [0, 1], [0, -32]);
  const camScale = interpolate(orbitProgress, [0, 1], [1.0, 1.28]);

  // Phase 5 Settle: Damped latching breath (Frames 125 to 160)
  const settleAge = Math.max(0, frame - 125);
  const settleOscillation = frame >= 125 && frame < 165
    ? Math.sin(settleAge * 0.45) * Math.exp(-settleAge * 0.16) * 1.5
    : 0;

  const finalRotateX = baseRotateX + antRotateX + settleOscillation;
  const finalRotateY = baseRotateY;
  const finalRotateZ = baseRotateZ + antRotateZ - settleOscillation * 0.7;

  // =========================================================================
  // 2. SECONDARY MOTION: VOLUMETRIC EXTRUSION & LIGHT SWEEP
  // Single Source of Truth: Depth expands continuously in direct synchrony
  // with the orbital rotation (visible_depth ∝ sin(rotation_angle)).
  // Zero artificial delay; zero sudden geometric birth.
  // =========================================================================
  const maxExtrusion = interpolate(orbitProgress, [0, 1], [0, 160]);

  // Light glint on top bevel during anticipation (Frames 18 to 36)
  const preGlintProgress = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Post-orbit light sweep velocity handoff across Klein Blue crown (Frames 128 to 165)
  const crownGlintX = interpolate(frame, [128, 165], [-80, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  // =========================================================================
  // 3. TERTIARY MOTION: PERSPECTIVE FLOOR GRID DEFORMATION & SHADOW
  // Ground contact shadow and spread grow continuously with transformation
  // =========================================================================
  const shadowSpread = interpolate(orbitProgress, [0, 1], [0, 120]);
  const shadowOpacity = interpolate(orbitProgress, [0, 1], [0, 0.45]);

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: "#F5F6F8",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* ===================================================================== */}
      {/* SWISS BASELINE & PERSPECTIVE GRID                                     */}
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
        <defs>
          {/* Subtle Ambient Contact Shadow */}
          <filter id="craft-contact-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#0C0E12" floodOpacity={shadowOpacity} />
          </filter>
        </defs>

        {/* 12-Column Grid Rules */}
        {Array.from({ length: 13 }).map((_, i) => {
          const colX = 120 + i * 140;
          return (
            <line
              key={`craft-grid-col-${i}`}
              x1={colX}
              y1={0}
              x2={colX}
              y2={H}
              stroke="#E2E5EB"
              strokeWidth={1}
              strokeDasharray="2 6"
              opacity={0.65}
            />
          );
        })}

        {/* Horizontal Baseline Rulers with Micro Coordinates */}
        {Array.from({ length: 9 }).map((_, i) => {
          const rowY = 120 + i * 110;
          return (
            <g key={`craft-grid-row-${i}`}>
              <line
                x1={120}
                y1={rowY}
                x2={W - 120}
                y2={rowY}
                stroke="#CBD0DC"
                strokeWidth={1}
                opacity={0.7}
              />
              <text
                x={80}
                y={rowY + 4}
                fill="#94A3B8"
                fontSize={10}
                fontWeight={600}
                letterSpacing="1px"
              >
                {`R_${String(i + 1).padStart(2, "0")}`}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ===================================================================== */}
      {/* 3D PERSPECTIVE MONOLITH CHAMBER                                       */}
      {/* ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1400,
        }}
      >
        <div
          style={{
            transform: `scale(${camScale}) rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg) rotateZ(${finalRotateZ}deg)`,
            transformStyle: "preserve-3d",
            position: "relative",
            width: 440,
            height: 440,
          }}
        >
          {/* 1. Deep Cast Shadow On Floor Plinth */}
          {shadowSpread > 0 && (
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 40,
                width: 360,
                height: 400,
                backgroundColor: "#0C0E12",
                transform: `translateZ(${-maxExtrusion - 10}px) translate(${shadowSpread * 0.4}px, ${shadowSpread * 0.6}px)`,
                filter: "blur(24px)",
                opacity: shadowOpacity,
              }}
            />
          )}

          {/* 2. Solid Milled Extrusion Facets (Dense 48-step continuous volume) */}
          {maxExtrusion > 0 &&
            Array.from({ length: 48 }).map((_, idx) => {
              const zStep = ((idx + 1) / 48) * maxExtrusion;
              // Lighting normal: Deeper slices fall into shadow core (#18202C -> #0C0E12)
              const flankTone = idx > 28 ? "#0C0E12" : "#18202C";
              // Crown tone: Top 32px of stem remains Klein Blue through depth
              const crownTone = idx > 28 ? "#00207A" : "#002FA7";

              return (
                <div
                  key={`craft-solid-extrusion-${idx}`}
                  style={{
                    position: "absolute",
                    top: 30,
                    left: 40,
                    width: 360,
                    height: 400,
                    display: "flex",
                    justifyContent: "space-between",
                    transform: `translateZ(${-zStep}px)`,
                    opacity: 1.0,
                  }}
                >
                  {/* Glyph "0" Extruded Wall — Geometrically Identical to 2D Front Silhouette */}
                  <div
                    style={{
                      width: 150,
                      height: 400,
                      border: `64px solid ${flankTone}`,
                      boxSizing: "border-box",
                      backgroundColor: "transparent",
                    }}
                  />

                  {/* Glyph "1" Extruded Column — Geometrically Identical to 2D Front Silhouette */}
                  <div
                    style={{
                      width: 110,
                      height: 400,
                      position: "relative",
                    }}
                  >
                    {/* Main Stem Slice (Width: 80px, Pinned to Right: 0) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 80,
                        height: 400,
                        backgroundColor: flankTone,
                      }}
                    >
                      {/* Top 32px Crown Slice: Volumetric Klein Blue */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 80,
                          height: 32,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>

                    {/* Architectural Beak Flag Slice (Width: 52px, Height: 52px, Pinned to Left: 0, Top: 0) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 52,
                        height: 52,
                        backgroundColor: flankTone,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                      }}
                    />
                  </div>
                </div>
              );
            })}

          {/* 3. Front Architectural Face of Numeral "01" (Primary Subject) */}
          <div
            style={{
              position: "absolute",
              top: 30,
              left: 40,
              width: 360,
              height: 400,
              display: "flex",
              justifyContent: "space-between",
              transform: "translateZ(0px)",
              filter: "url(#craft-contact-shadow)",
            }}
          >
            {/* Glyph "0": Crisp Modular Box Frame */}
            <div
              style={{
                width: 150,
                height: 400,
                border: "64px solid #0C0E12",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              {/* Anticipation Specular Edge Light (Frame 18 to 36) */}
              {frame >= 18 && frame < 40 && (
                <div
                  style={{
                    position: "absolute",
                    top: -64,
                    left: 0,
                    right: 0,
                    height: 4,
                    backgroundColor: "#FFFFFF",
                    opacity: interpolate(preGlintProgress, [0, 0.5, 1], [0, 0.9, 0]),
                  }}
                />
              )}
            </div>

            {/* Glyph "1": Bold Architectural Pillar with Beak Flag & Klein Blue Apex */}
            <div
              style={{
                width: 110,
                height: 400,
                position: "relative",
              }}
            >
              {/* Main Stem */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 400,
                  backgroundColor: "#0C0E12",
                }}
              >
                {/* Klein Blue Accent Crown */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 80,
                    height: 32,
                    backgroundColor: "#002FA7",
                    overflow: "hidden",
                  }}
                >
                  {/* Dynamic Velocity Light Glint across Crown */}
                  {frame >= 128 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: 24,
                        left: crownGlintX,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        transform: "skewX(-30deg)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Architectural Beak Flag */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 52,
                  height: 52,
                  backgroundColor: "#0C0E12",
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* EDITORIAL REEL CALIBRATION HEADER & METADATA                          */}
      {/* ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "2.5px",
          color: "#64748B",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        <div>V36.5 CRAFT MASTERPIECE // SPATIAL DIMENSION SHIFT</div>
        <div>180F // 6.00S // 30FPS</div>
      </div>

      {/* Frame Status Annotation */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: 80,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "2px",
          color: "#94A3B8",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        {frame < 36 ? "PHASE 1: PREPARATION" : (frame < 88 ? "PHASE 2: CAMERA ORBIT" : (frame < 138 ? "PHASE 3: VOLUMETRIC EXTRUSION" : "PHASE 4: ARCHITECTURAL SETTLE"))}
      </div>
    </div>
  );
};
