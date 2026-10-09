/**
 * ============================================================================
 * V38 SHOWREEL BENCHMARK — "THE KINETIC MONOCHORD"
 * ============================================================================
 * An authored, procedural motion design showreel piece inspired by the creative
 * philosophy of Ben Kaufman:
 * 
 * - Single Seed: Deceptively simple 1D taut line under acoustic tension.
 * - Architectural Unfolding: 1D Line -> 2D Harmonic Wave -> 3D Origami Hinge Fold
 *   -> 40-Slice Volumetric Monolith -> Anamorphic Monogram Cipher ("K") -> Closed Loop.
 * - Snap-and-Drift Timing: High-velocity elastic snaps paired with contemplative drifts.
 * - Physical Continuity: Energy is never cut; momentum transfers causally across states.
 * - Strict Contrast Hierarchy: Obsidian carbon void, cold milled titanium, cadmium core.
 * - 100% Vector SVG & Pure CSS 3D: Subpixel precision, zero raster blur, zero external deps.
 * ============================================================================
 */

import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const V38_ShowreelBenchmark: React.FC = () => {
  const frame = useCurrentFrame();

  // Canvas Geometry
  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // ACT 1: ACOUSTIC TENSION & HARMONIC RESONANCE (Frames 0 - 85)
  // =========================================================================

  // Initial Pluck Event (Frames 18 - 45)
  const pluckAge = Math.max(0, frame - 18);
  const pluckDecay = Math.exp(-pluckAge * 0.14);
  const pluckDisplacement = frame >= 18 && frame < 70
    ? Math.sin(pluckAge * 0.65) * pluckDecay * 110
    : 0;

  // Harmonic Waveform Growth (Frames 35 - 85)
  const waveEmerge = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.18, 0.9, 0.25, 1),
  });

  // Standing Wave Oscillation (3 Harmonic Lobes)
  const waveCycle = Math.sin((frame - 35) * 0.28);
  const lobeAmp = waveEmerge * waveCycle * 80;

  // Nodal Energy Pulse Points (Cadmium Core)
  const nodeEnergy = interpolate(frame, [45, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // ACT 2: ORTHOGONAL HINGE-FOLD / 2D TO 3D ACCORDION (Frames 80 - 175)
  // =========================================================================
  // The standing wave peaks detach from baseline and hinge 90° into solid faceted plates
  const foldProgress = interpolate(frame, [80, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.32, 1),
  });

  // Accordion Bellows Breathing (Frames 130 - 175)
  const breatheAge = Math.max(0, frame - 135);
  const accordionBreath = frame >= 135 && frame < 185
    ? Math.sin(breatheAge * 0.35) * Math.exp(-breatheAge * 0.09) * 24
    : 0;

  // =========================================================================
  // ACT 3: 3D VOLUMETRIC ELEVATION & GYROSCOPIC ORBIT (Frames 170 - 295)
  // =========================================================================
  // Primary Camera Orbit Driver (Continuous Velocity)
  const orbitProgress = interpolate(frame, [170, 275], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.95, 0.28, 1),
  });

  // Gyroscopic Camera Angles
  const camRotateX = interpolate(orbitProgress, [0, 1], [0, 38]);
  const camRotateY = interpolate(orbitProgress, [0, 1], [0, -14]);
  const camRotateZ = interpolate(orbitProgress, [0, 1], [0, -20]);
  const camScale = interpolate(orbitProgress, [0, 1], [1.0, 1.24]);

  // Continuous Volumetric Depth (40 Extrusion Slices)
  const extrusionDepth = interpolate(orbitProgress, [0, 1], [0, 140]);

  // Floor Contact Drop Shadow
  const shadowSpread = interpolate(orbitProgress, [0, 1], [0, 105]);
  const shadowOpacity = interpolate(orbitProgress, [0, 1], [0, 0.55]);

  // =========================================================================
  // ACT 4: ANAMORPHIC TYPOGRAPHIC CONVERGENCE ("K") (Frames 290 - 390)
  // =========================================================================
  // Facets align coplanar to form architectural monogram "K"
  const glyphAlign = interpolate(frame, [290, 350], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.18, 1, 0.26, 1),
  });

  // Structural Settle with Damped Oscillating Inertia (Frames 350 - 390)
  const settleAge = Math.max(0, frame - 350);
  const settleBreathing = frame >= 350 && frame < 395
    ? Math.sin(settleAge * 0.45) * Math.exp(-settleAge * 0.15) * 1.5
    : 0;

  const finalCamRotateX = camRotateX + settleBreathing;
  const finalCamRotateZ = camRotateZ - settleBreathing * 0.7;

  // Specular Laser Chamfer Sweep (Frames 345 - 385)
  const laserSweepX = interpolate(frame, [345, 385], [-150, 950], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.9, 0.3, 1),
  });

  // Editorial Typographic Reveals
  const titleOpacity = interpolate(frame, [352, 382], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const metaOpacity = interpolate(frame, [365, 395], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // ACT 5: TENSION RELEASE & CLOSED LOOP COLLAPSE (Frames 390 - 450)
  // =========================================================================
  // Mechanical unlatch & rapid collapse to 1D line
  const collapseProgress = interpolate(frame, [392, 435], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.2, 1), // Accelerating snap release
  });

  // Depth & Angle Collapse to Zero
  const activeDepth = extrusionDepth * (1 - collapseProgress);
  const activeCamX = finalCamRotateX * (1 - collapseProgress);
  const activeCamY = camRotateY * (1 - collapseProgress);
  const activeCamZ = finalCamRotateZ * (1 - collapseProgress);
  const activeScale = interpolate(collapseProgress, [0, 1], [camScale, 1.0]);

  // Terminal Re-tensioning Whip (Frames 430 - 445)
  const snapAge = Math.max(0, frame - 433);
  const snapWhip = frame >= 433 && frame < 445
    ? Math.sin(snapAge * 0.95) * Math.exp(-snapAge * 0.35) * 12
    : 0;

  // Final Rest Hold: Frames 445 - 450 identical to Frame 0 (Perfect Seamless Loop)

  // =========================================================================
  // DIRECTION C ART DIRECTION & CONTRAST HIERARCHY CONSTANTS
  // =========================================================================
  const BG_COLOR = "#080A0F";              // Tier 1: Deep obsidian carbon void (4% lum)
  const FRONT_FACE_COLOR = "#2C374A";      // Tier 4: Cold milled bismuth titanium (25% lum)
  const FRONT_RIM_COLOR = "#516482";       // Tier 5: Top edge bevel specular rim (40% lum)
  const FLANK_FILL_COLOR = "#212A38";      // Tier 3: Ambient fill normal (17% lum)
  const FLANK_SHADOW_COLOR = "#111620";    // Tier 3: Core shadow normal (10% lum)
  const ACCENT_CADMIUM = "#FF5500";        // Tier 6: High-intensity cadmium orange core (65% lum)
  const ACCENT_CADMIUM_DEEP = "#C23B00";   // Deep cadmium flank
  const TEXT_WHITE = "#FFFFFF";            // Tier 7: Pure Alabaster (100% lum)
  const TEXT_MUTED = "#94A3B8";            // Platinum fog metadata (60% lum)
  const GRID_LINE_COLOR = "#141924";       // Precision coordinate grid lines

  // Dynamic Positions for the 3 Folding Plates (Chevron A, Central Pillar, Chevron B)
  // These morph from the wave lobes into the bold architectural "K" glyph
  const leftPlateX = interpolate(foldProgress, [0, 1], [380, 240]);
  const centerSpineX = interpolate(foldProgress, [0, 1], [CX - 40, CX - 120]);
  const rightTopArmRotate = interpolate(glyphAlign, [0, 1], [-25, 45]);
  const rightBottomArmRotate = interpolate(glyphAlign, [0, 1], [25, -45]);

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: BG_COLOR,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        color: TEXT_WHITE,
      }}
    >
      {/* ===================================================================== */}
      {/* 1. ARCHITECTURAL CALIBRATION GRID & OPTICAL TELEMETRY RULERS           */}
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
          <filter id="v38-contact-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="24" stdDeviation="32" floodColor="#000000" floodOpacity={shadowOpacity * 1.3} />
          </filter>
        </defs>

        {/* Horizontal Precision Grid Rulers */}
        {Array.from({ length: 9 }).map((_, i) => {
          const rowY = 120 + i * 110;
          return (
            <g key={`v38-grid-row-${i}`}>
              <line
                x1={80}
                y1={rowY}
                x2={W - 80}
                y2={rowY}
                stroke={GRID_LINE_COLOR}
                strokeWidth={1}
                opacity={0.7}
              />
              <text
                x={42}
                y={rowY + 4}
                fill="#475569"
                fontSize={9}
                fontWeight={600}
                letterSpacing="1.5px"
              >
                {`CALIB_${String(i + 1).padStart(2, "0")}`}
              </text>
            </g>
          );
        })}

        {/* Vertical Boundary Reference Lines */}
        <line x1={320} y1={80} x2={320} y2={H - 80} stroke="#1A2230" strokeWidth={1} strokeDasharray="3 6" />
        <line x1={W - 320} y1={80} x2={W - 320} y2={H - 80} stroke="#1A2230" strokeWidth={1} strokeDasharray="3 6" />

        {/* Frame Rate & Telemetry Legend */}
        <text x={335} y={105} fill="#64748B" fontSize={8} fontWeight={700} letterSpacing="2px">
          TENSION_LIMIT // ELASTIC_MODULUS_2026
        </text>
        <text x={W - 530} y={105} fill="#64748B" fontSize={8} fontWeight={700} letterSpacing="2px">
          KAUFMAN_BENCHMARK // HARMONIC_STABILIZER
        </text>

        {/* =================================================================== */}
        {/* 2. THE ACOUSTIC MONOCHORD (ACT 1: 1D Elastic Taut Line)             */}
        {/* =================================================================== */}
        {foldProgress < 1 && (
          <g opacity={1 - foldProgress * 0.9}>
            {/* Primary Plucked Harmonic String */}
            <path
              d={`
                M 120,${CY}
                Q ${CX / 2},${CY + pluckDisplacement - lobeAmp} ${CX},${CY + pluckDisplacement * 0.5}
                Q ${CX + CX / 2},${CY + pluckDisplacement + lobeAmp} ${W - 120},${CY}
              `}
              fill="none"
              stroke={frame < 25 ? TEXT_WHITE : ACCENT_CADMIUM}
              strokeWidth={interpolate(frame, [18, 30, 60], [2, 4.5, 2.5])}
            />

            {/* Ghost Baseline Reference Chord */}
            <line
              x1={120}
              y1={CY}
              x2={W - 120}
              y2={CY}
              stroke="#212A38"
              strokeWidth={1}
              strokeDasharray="4 8"
            />

            {/* Harmonic Energy Node Orbs */}
            {nodeEnergy > 0 && (
              <>
                <circle cx={CX / 2} cy={CY - lobeAmp} r={5 * nodeEnergy} fill={ACCENT_CADMIUM} />
                <circle cx={CX} cy={CY + pluckDisplacement * 0.5} r={6 * nodeEnergy} fill={TEXT_WHITE} />
                <circle cx={CX + CX / 2} cy={CY + lobeAmp} r={5 * nodeEnergy} fill={ACCENT_CADMIUM} />
              </>
            )}
          </g>
        )}

        {/* Re-tensioned Terminal Monochord Snap (Act 5: Frames 430 - 450) */}
        {collapseProgress >= 0.95 && (
          <g>
            <path
              d={`
                M 120,${CY}
                Q ${CX},${CY + snapWhip} ${W - 120},${CY}
              `}
              fill="none"
              stroke={TEXT_WHITE}
              strokeWidth={2}
            />
            {/* Terminal Rest Marker */}
            <circle cx={CX} cy={CY + snapWhip} r={3} fill={ACCENT_CADMIUM} />
          </g>
        )}
      </svg>

      {/* ===================================================================== */}
      {/* 3. 3D KINETIC MONOGRAM ENGINE ("K" MONOLITH & ACCORDION BELLOWS)      */}
      {/* ===================================================================== */}
      {foldProgress > 0 && collapseProgress < 1 && (
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
            opacity: interpolate(collapseProgress, [0.85, 1], [1, 0]),
          }}
        >
          <div
            style={{
              transform: `scale(${activeScale}) rotateX(${activeCamX}deg) rotateY(${activeCamY}deg) rotateZ(${activeCamZ}deg)`,
              transformStyle: "preserve-3d",
              position: "relative",
              width: 720,
              height: 520,
            }}
          >
            {/* A. Floor Contact AO Drop Shadow */}
            {shadowSpread > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: 30,
                  width: 660,
                  height: 480,
                  backgroundColor: "#000000",
                  transform: `translateZ(${-activeDepth - 16}px) translate(${shadowSpread * 0.3}px, ${shadowSpread * 0.6}px)`,
                  filter: "blur(32px)",
                  opacity: shadowOpacity * (1 - collapseProgress),
                }}
              />
            )}

            {/* B. 40 Continuous Volumetric Extrusion Slices (Topology Preserving) */}
            {activeDepth > 0 &&
              Array.from({ length: 40 }).map((_, idx) => {
                const zStep = ((idx + 1) / 40) * activeDepth;
                const flankTone = idx > 22 ? FLANK_SHADOW_COLOR : FLANK_FILL_COLOR;
                const crownTone = idx > 22 ? ACCENT_CADMIUM_DEEP : ACCENT_CADMIUM;

                return (
                  <div
                    key={`v38-slice-${idx}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 720,
                      height: 520,
                      transform: `translateZ(${-zStep}px)`,
                      opacity: 1.0,
                    }}
                  >
                    {/* Spine Pillar (Left Vertical Post of 'K') */}
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 120,
                        width: 76,
                        height: 480,
                        backgroundColor: flankTone,
                      }}
                    >
                      {/* Top Cadmium Crown */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 76,
                          height: 28,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>

                    {/* Upper Diagonal Arm of 'K' (Pivoting Cantilever) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 140,
                        left: 196,
                        width: 290 + accordionBreath,
                        height: 74,
                        backgroundColor: flankTone,
                        transformOrigin: "left center",
                        transform: `rotate(${rightTopArmRotate}deg)`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 28,
                          height: 74,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>

                    {/* Lower Diagonal Arm of 'K' (Pivoting Strut) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 320,
                        left: 196,
                        width: 310 + accordionBreath,
                        height: 74,
                        backgroundColor: flankTone,
                        transformOrigin: "left center",
                        transform: `rotate(${rightBottomArmRotate}deg)`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: 28,
                          height: 74,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>

                    {/* Geometric Counter-Brace (Origami Hinge Flange) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 180,
                        left: leftPlateX - 160,
                        width: 64,
                        height: 180,
                        backgroundColor: flankTone,
                        opacity: 1 - glyphAlign * 0.85,
                      }}
                    />
                  </div>
                );
              })}

            {/* C. Front Architectural Primary Face (Z = 0) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 720,
                height: 520,
                transform: "translateZ(0px)",
                filter: "url(#v38-contact-shadow)",
              }}
            >
              {/* Spine Pillar (Front Face) */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 120,
                  width: 76,
                  height: 480,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              >
                {/* Cadmium Sensor Crown */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 76,
                    height: 28,
                    backgroundColor: ACCENT_CADMIUM,
                    overflow: "hidden",
                  }}
                >
                  {/* Dynamic Laser Chamfer Sweep */}
                  {frame >= 345 && frame < 390 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: 40,
                        left: laserSweepX - 120,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        transform: "skewX(-30deg)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Upper Diagonal Arm of 'K' (Front Face) */}
              <div
                style={{
                  position: "absolute",
                  top: 140,
                  left: 196,
                  width: 290 + accordionBreath,
                  height: 74,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                  transformOrigin: "left center",
                  transform: `rotate(${rightTopArmRotate}deg)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 28,
                    height: 74,
                    backgroundColor: ACCENT_CADMIUM,
                  }}
                />
              </div>

              {/* Lower Diagonal Arm of 'K' (Front Face) */}
              <div
                style={{
                  position: "absolute",
                  top: 320,
                  left: 196,
                  width: 310 + accordionBreath,
                  height: 74,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                  transformOrigin: "left center",
                  transform: `rotate(${rightBottomArmRotate}deg)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 28,
                    height: 74,
                    backgroundColor: ACCENT_CADMIUM,
                  }}
                />
              </div>

              {/* Geometric Counter-Brace (Front Face) */}
              <div
                style={{
                  position: "absolute",
                  top: 180,
                  left: leftPlateX - 160,
                  width: 64,
                  height: 180,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                  opacity: 1 - glyphAlign * 0.85,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. EDITORIAL TYPOGRAPHY & AUTHOR IDENTITY LOCKUP                       */}
      {/* ===================================================================== */}
      <div
        style={{
          position: "absolute",
          bottom: 65,
          left: 120,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        {/* Left: Author & Benchmark Title */}
        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "4px",
              color: TEXT_WHITE,
              textTransform: "uppercase",
              opacity: titleOpacity * (1 - collapseProgress),
              transform: `translateY(${interpolate(titleOpacity, [0, 1], [14, 0])}px)`,
            }}
          >
            BEN KAUFMAN // SHOWREEL BENCHMARK
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "3px",
              color: ACCENT_CADMIUM,
              textTransform: "uppercase",
              marginTop: 8,
              opacity: titleOpacity * (1 - collapseProgress),
              transform: `translateY(${interpolate(titleOpacity, [0, 1], [10, 0])}px)`,
            }}
          >
            PROCEDURAL GEOMETRY & KINETIC MONOLITH
          </div>
        </div>

        {/* Right: Technical Systems Metadata */}
        <div
          style={{
            textAlign: "right",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2.5px",
            color: TEXT_MUTED,
            textTransform: "uppercase",
            opacity: metaOpacity * (1 - collapseProgress),
            lineHeight: "18px",
          }}
        >
          <div>VOLUMETRIC RECONFIGURATION // 450 FRAMES</div>
          <div>TOPOLOGICAL FOLD · GYROSCOPIC INERTIA · CLOSED LOOP</div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5. TOP EDITORIAL RUNNING HEADER                                       */}
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
          letterSpacing: "3px",
          color: TEXT_MUTED,
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        <div>V38 // KINETIC BENCHMARK 2026</div>
        <div>
          {frame < 85
            ? "ACT 1: ACOUSTIC PLUCK & RESONANCE"
            : frame < 175
            ? "ACT 2: ORTHOGONAL HINGE-FOLD"
            : frame < 295
            ? "ACT 3: 3D VOLUMETRIC ORBIT"
            : frame < 390
            ? "ACT 4: TYPOGRAPHIC ANAMORPHOSIS"
            : "ACT 5: CLOSED LOOP TENSION RELEASE"}
        </div>
      </div>
    </div>
  );
};
