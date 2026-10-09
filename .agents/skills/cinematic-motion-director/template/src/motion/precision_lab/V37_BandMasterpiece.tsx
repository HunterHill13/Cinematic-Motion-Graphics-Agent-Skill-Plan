import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

/**
 * V37 MASTERPIECE — BIOMEDICAL & ADVANCED NEUROSCIENCE DAY (BAND)
 * "From Signal to Discovery"
 * 
 * Target: 16.00 seconds | 480 frames @ 30 FPS | 1920x1080 Full HD | Silent
 * Visual World: The Coherence Chamber (Lithographic Interferometry & Resonant Architecture)
 * 
 * Choreography Acts:
 * - ACT 1 (Frames 0 - 95): The Excitation & Aperture (Noise -> Disturbance -> Concentric Wavefronts)
 * - ACT 2 (Frames 95 - 200): Boundary Interference & Slat Cavity (Wavefronts -> 8 Resonant Standing Baffles)
 * - ACT 3 (Frames 200 - 320): 3D Dimensional Elevation & Camera Orbit (2D Slat Grid -> 3D Extruded Titanium Louvers)
 * - ACT 4 (Frames 320 - 415): Structural Convergence into B-A-N-D (Louvers align in perspective to cast B-A-N-D)
 * - ACT 5 (Frames 415 - 480): Discovery Climax & Institutional Settle (Final Title, Theme, Metadata & Stillness Hold)
 */

export const V37_BandMasterpiece: React.FC = () => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // ACT 1: THE EXCITATION & APERTURE (Frames 0 - 95)
  // =========================================================================
  // Anticipation tension on central slit (Frames 22 to 38)
  const slitAntProgress = interpolate(frame, [22, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const slitDeflection = frame >= 38 && frame < 95
    ? Math.sin((frame - 38) * 0.52) * Math.exp(-(frame - 38) * 0.08) * 22
    : -slitAntProgress * 4;

  // Concentric Wavefront Propagation (Frames 38 to 110)
  const waveProgress = interpolate(frame, [38, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.12, 0.8, 0.25, 1),
  });
  const waveRadius = interpolate(waveProgress, [0, 1], [0, 720]);
  const waveOpacity = interpolate(waveProgress, [0, 0.15, 0.85, 1], [0, 0.85, 0.4, 0]);

  // Amber Energy Glint across Aperture (Frames 20 to 60)
  const apertureGlint = interpolate(frame, [20, 38, 56], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // ACT 2: BOUNDARY INTERFERENCE & RESONANT SLAT CAVITY (Frames 90 - 205)
  // =========================================================================
  // Transition from traveling waves to standing wave baffles (8 harmonic slats)
  const cavityEmerge = interpolate(frame, [90, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.25, 1),
  });

  // Vertical harmonic energy pulse running down the slats (Frames 130 to 185)
  const harmonicPulseY = interpolate(frame, [130, 185], [-120, H + 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.35, 1),
  });

  // =========================================================================
  // ACT 3: 3D DIMENSIONAL ELEVATION & CAMERA ORBIT (Frames 195 - 325)
  // =========================================================================
  // Primary Camera Orbit Driver (Single Source of Truth)
  const orbitProgress = interpolate(frame, [195, 305], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  // Camera angles
  const camRotateX = interpolate(orbitProgress, [0, 1], [0, 42]);
  const camRotateY = interpolate(orbitProgress, [0, 1], [0, -12]);
  const camRotateZ = interpolate(orbitProgress, [0, 1], [0, -22]);
  const camScale = interpolate(orbitProgress, [0, 1], [1.0, 1.22]);

  // Continuous Volumetric Depth (Trigonometric Expansion)
  const louverDepth = interpolate(orbitProgress, [0, 1], [0, 150]);

  // Floor Plinth Contact Shadow
  const shadowSpread = interpolate(orbitProgress, [0, 1], [0, 110]);
  const shadowOpacity = interpolate(orbitProgress, [0, 1], [0, 0.55]);

  // =========================================================================
  // ACT 4: STRUCTURAL CONVERGENCE INTO B - A - N - D (Frames 310 - 415)
  // =========================================================================
  // Louver structural pivot into typographic letterforms
  const morphProgress = interpolate(frame, [310, 385], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.95, 0.3, 1),
  });

  // Amber Laser Sweep across Monolith Crowns (Frames 375 to 425)
  const crownLaserX = interpolate(frame, [375, 425], [-200, 1200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.18, 0.9, 0.28, 1),
  });

  // =========================================================================
  // ACT 5: DISCOVERY CLIMAX & RECONTEXTUALIZED SETTLE (Frames 405 - 480)
  // =========================================================================
  // Structural settle oscillation (Frames 385 to 430)
  const settleAge = Math.max(0, frame - 385);
  const settleBreathing = frame >= 385 && frame < 435
    ? Math.sin(settleAge * 0.42) * Math.exp(-settleAge * 0.14) * 1.4
    : 0;

  const finalCamRotateX = camRotateX + settleBreathing;
  const finalCamRotateZ = camRotateZ - settleBreathing * 0.6;

  // Title typography reveal (Frames 412 to 455)
  const titleReveal = interpolate(frame, [412, 450], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const themeReveal = interpolate(frame, [425, 462], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const metaReveal = interpolate(frame, [438, 472], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // =========================================================================
  // V37.1 ART DIRECTION & CONTRAST HIERARCHY CONSTANTS (Direction C)
  // =========================================================================
  const BG_COLOR = "#080C14";             // Tier 1: Deep atmospheric navy-void (5% lum)
  const FRONT_FACE_COLOR = "#2A364B";     // Tier 4: Milled titanium bismuth (25% lum - high separation!)
  const FRONT_RIM_COLOR = "#4A5D7E";      // Tier 5: Top edge highlight rim (38% lum)
  const FLANK_FILL_COLOR = "#222D3F";     // Tier 3: Ambient fill normal (18% lum)
  const FLANK_SHADOW_COLOR = "#131924";   // Tier 3: Core shadow normal (11% lum - safely above BG)
  const ACCENT_AMBER = "#F59E0B";         // Tier 6: Radiant cadmium amber (68% lum)
  const ACCENT_AMBER_DEEP = "#B45309";    // Deep amber flank
  const TEXT_WHITE = "#FFFFFF";           // Tier 7: Pure high-key Alabaster (100% lum)
  const TEXT_MUTED = "#94A3B8";           // Platinum fog metadata (60% lum)
  const GRID_LINE_COLOR = "#1B2434";      // Controlled background coordinate grid

  // 8 Harmonic Louver Slat Definitions across the chamber (X coords from 420 to 1500)
  // These 8 slats group naturally into 4 pairs representing B, A, N, D
  const louverWidths = [72, 72, 72, 72, 72, 72, 72, 72];
  const louverSpacings = [440, 560, 720, 840, 1000, 1120, 1280, 1400];

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
      {/* 1. ARCHITECTURAL LITHOGRAPHIC BACKGROUND & COORDINATE RULERS          */}
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
          {/* Ambient Monolith Contact Shadow */}
          <filter id="v37-contact-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="26" stdDeviation="34" floodColor="#000000" floodOpacity={Math.min(1, shadowOpacity * 1.35)} />
          </filter>
        </defs>

        {/* Precision Coordinate Horizontal Grid Rulers */}
        {Array.from({ length: 9 }).map((_, i) => {
          const rowY = 120 + i * 110;
          return (
            <g key={`v37-grid-row-${i}`}>
              <line
                x1={80}
                y1={rowY}
                x2={W - 80}
                y2={rowY}
                stroke={GRID_LINE_COLOR}
                strokeWidth={1}
                opacity={0.8}
              />
              {/* Telemetry Coordinate Identifiers */}
              <text
                x={42}
                y={rowY + 4}
                fill="#475569"
                fontSize={9}
                fontWeight={600}
                letterSpacing="1.5px"
              >
                {`AXIS_${String(i + 1).padStart(2, "0")}`}
              </text>
            </g>
          );
        })}

        {/* Boundary Reflection Planes at X = 360 and X = 1560 */}
        <line x1={360} y1={80} x2={360} y2={H - 80} stroke="#263348" strokeWidth={1.5} strokeDasharray="4 8" />
        <line x1={1560} y1={80} x2={1560} y2={H - 80} stroke="#263348" strokeWidth={1.5} strokeDasharray="4 8" />

        {/* Boundary Calibration Legends */}
        <text x={370} y={105} fill="#64748B" fontSize={8} fontWeight={700} letterSpacing="2px">
          BOUNDARY_NODE_L // CAVITY_LIMIT
        </text>
        <text x={1430} y={105} fill="#64748B" fontSize={8} fontWeight={700} letterSpacing="2px">
          BOUNDARY_NODE_R // INTERFEROMETER
        </text>

        {/* Concentric Acoustic Wavefront Ellipses (Act 1: Frames 38 to 110) */}
        {waveRadius > 0 && (
          <g opacity={waveOpacity}>
            <ellipse
              cx={CX}
              cy={CY}
              rx={waveRadius}
              ry={waveRadius * 0.42}
              fill="none"
              stroke={ACCENT_AMBER}
              strokeWidth={2.5}
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx={Math.max(0, waveRadius - 60)}
              ry={Math.max(0, (waveRadius - 60) * 0.42)}
              fill="none"
              stroke="#334155"
              strokeWidth={1.5}
              strokeDasharray="6 6"
            />
            <ellipse
              cx={CX}
              cy={CY}
              rx={Math.max(0, waveRadius - 130)}
              ry={Math.max(0, (waveRadius - 130) * 0.42)}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={1}
              opacity={0.6}
            />
          </g>
        )}
      </svg>

      {/* ===================================================================== */}
      {/* 2. CENTRAL APERTURE SLIT (ACT 1: The Initial Undefined Disturbance)   */}
      {/* ===================================================================== */}
      {frame < 125 && (
        <div
          style={{
            position: "absolute",
            top: CY - 200,
            left: CX - 1 + slitDeflection,
            width: 2.5,
            height: 400,
            backgroundColor: apertureGlint > 0 ? TEXT_WHITE : ACCENT_AMBER,
            boxShadow: apertureGlint > 0
              ? `0 0 20px rgba(245, 158, 11, ${apertureGlint * 0.9})`
              : "0 0 8px rgba(245, 158, 11, 0.4)",
            opacity: interpolate(frame, [0, 20, 95, 120], [0.75, 1, 1, 0]),
            zIndex: 10,
          }}
        />
      )}

      {/* ===================================================================== */}
      {/* 3. 3D COHERENCE CHAMBER: RESONANT LOUVERS & B-A-N-D BEDROCK           */}
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
            transform: `scale(${camScale}) rotateX(${finalCamRotateX}deg) rotateY(${camRotateY}deg) rotateZ(${finalCamRotateZ}deg)`,
            transformStyle: "preserve-3d",
            position: "relative",
            width: 1060,
            height: 420,
            opacity: cavityEmerge,
          }}
        >
          {/* A. Floor Contact AO Drop Shadow */}
          {shadowSpread > 0 && (
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 1020,
                height: 420,
                backgroundColor: "#000000",
                transform: `translateZ(${-louverDepth - 12}px) translate(${shadowSpread * 0.35}px, ${shadowSpread * 0.55}px)`,
                filter: "blur(28px)",
                opacity: shadowOpacity,
              }}
            />
          )}

          {/* B. 48 Continuous Volumetric Extrusion Slices (Topologically Identical) */}
          {louverDepth > 0 &&
            Array.from({ length: 48 }).map((_, idx) => {
              const zStep = ((idx + 1) / 48) * louverDepth;
              // Differentiated shading normals through depth (Direction C High Contrast)
              const flankTone = idx > 28 ? FLANK_SHADOW_COLOR : FLANK_FILL_COLOR;
              const crownTone = idx > 28 ? ACCENT_AMBER_DEEP : ACCENT_AMBER;

              return (
                <div
                  key={`v37-louver-slice-${idx}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 1060,
                    height: 420,
                    transform: `translateZ(${-zStep}px)`,
                    display: "flex",
                    justifyContent: "space-between",
                    opacity: 1.0,
                  }}
                >
                  {/* GLYPH B (Louver Pair 1 & 2): Double-chamber cantilever */}
                  <div style={{ width: 210, height: 420, position: "relative" }}>
                    {/* Spine pillar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 58,
                        height: 420,
                        backgroundColor: flankTone,
                      }}
                    >
                      {/* Amber crown */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 58,
                          height: 24,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>
                    {/* Top lobe */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 58,
                        width: 152,
                        height: 195,
                        border: `48px solid ${flankTone}`,
                        borderLeft: "none",
                        boxSizing: "border-box",
                        backgroundColor: "transparent",
                      }}
                    />
                    {/* Bottom lobe */}
                    <div
                      style={{
                        position: "absolute",
                        top: 195,
                        left: 58,
                        width: 152,
                        height: 225,
                        border: `48px solid ${flankTone}`,
                        borderLeft: "none",
                        boxSizing: "border-box",
                        backgroundColor: "transparent",
                      }}
                    />
                  </div>

                  {/* GLYPH A (Louver Pair 3 & 4): Triangular Stepped Monolith Arch */}
                  <div style={{ width: 230, height: 420, position: "relative" }}>
                    {/* Left Arch Leg */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 60,
                        height: 420,
                        backgroundColor: flankTone,
                        transform: `skewX(${interpolate(morphProgress, [0, 1], [0, 10])}deg)`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 60,
                          height: 24,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>
                    {/* Right Arch Leg */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 60,
                        height: 420,
                        backgroundColor: flankTone,
                        transform: `skewX(${interpolate(morphProgress, [0, 1], [0, -10])}deg)`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 60,
                          height: 24,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>
                    {/* Horizontal Cross Strut */}
                    <div
                      style={{
                        position: "absolute",
                        top: 240,
                        left: 35,
                        width: 160,
                        height: 48,
                        backgroundColor: flankTone,
                      }}
                    />
                  </div>

                  {/* GLYPH N (Louver Pair 5 & 6): Twin Pillars with Diagonal Shearing Blade */}
                  <div style={{ width: 220, height: 420, position: "relative" }}>
                    {/* Left Vertical Pillar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 60,
                        height: 420,
                        backgroundColor: flankTone,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 60,
                          height: 24,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>
                    {/* Diagonal Shear Truss Blade */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 20,
                        width: 58,
                        height: 440,
                        backgroundColor: flankTone,
                        transformOrigin: "top left",
                        transform: `rotate(${interpolate(morphProgress, [0, 1], [0, 24])}deg)`,
                        opacity: morphProgress,
                      }}
                    />
                    {/* Right Vertical Pillar (Original Central Axis) */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 60,
                        height: 420,
                        backgroundColor: flankTone,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 60,
                          height: 24,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>
                  </div>

                  {/* GLYPH D (Louver Pair 7 & 8): Pillar with Massive Curved Outer Wing */}
                  <div style={{ width: 210, height: 420, position: "relative" }}>
                    {/* Spine Pillar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 58,
                        height: 420,
                        backgroundColor: flankTone,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 58,
                          height: 24,
                          backgroundColor: crownTone,
                        }}
                      />
                    </div>
                    {/* Curved Monolith Wing */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 58,
                        width: 152,
                        height: 420,
                        border: `52px solid ${flankTone}`,
                        borderLeft: "none",
                        borderRadius: "0 180px 180px 0",
                        boxSizing: "border-box",
                        backgroundColor: "transparent",
                      }}
                    />
                  </div>
                </div>
              );
            })}

          {/* C. Front Architectural Primary Face (Z = 0) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1060,
              height: 420,
              transform: "translateZ(0px)",
              display: "flex",
              justifyContent: "space-between",
              filter: "url(#v37-contact-shadow)",
            }}
          >
            {/* GLYPH B (Front Face) */}
            <div style={{ width: 210, height: 420, position: "relative" }}>
              {/* Spine pillar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 58,
                  height: 420,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              >
                {/* Crown with Amber Accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 58,
                    height: 24,
                    backgroundColor: ACCENT_AMBER,
                    overflow: "hidden",
                  }}
                >
                  {/* Dynamic laser specular light sweep */}
                  {frame >= 375 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: 32,
                        left: crownLaserX,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        transform: "skewX(-30deg)",
                      }}
                    />
                  )}
                </div>
              </div>
              {/* Top lobe */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 58,
                  width: 152,
                  height: 195,
                  border: `48px solid ${FRONT_FACE_COLOR}`,
                  borderLeft: "none",
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              />
              {/* Bottom lobe */}
              <div
                style={{
                  position: "absolute",
                  top: 195,
                  left: 58,
                  width: 152,
                  height: 225,
                  border: `48px solid ${FRONT_FACE_COLOR}`,
                  borderLeft: "none",
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                }}
              />
            </div>

            {/* GLYPH A (Front Face) */}
            <div style={{ width: 230, height: 420, position: "relative" }}>
              {/* Left Arch Leg */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 60,
                  height: 420,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                  transform: `skewX(${interpolate(morphProgress, [0, 1], [0, 10])}deg)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 60,
                    height: 24,
                    backgroundColor: ACCENT_AMBER,
                  }}
                />
              </div>
              {/* Right Arch Leg */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 60,
                  height: 420,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                  transform: `skewX(${interpolate(morphProgress, [0, 1], [0, -10])}deg)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 60,
                    height: 24,
                    backgroundColor: ACCENT_AMBER,
                  }}
                />
              </div>
              {/* Cross Strut */}
              <div
                style={{
                  position: "absolute",
                  top: 240,
                  left: 35,
                  width: 160,
                  height: 48,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              />
            </div>

            {/* GLYPH N (Front Face) */}
            <div style={{ width: 220, height: 420, position: "relative" }}>
              {/* Left Pillar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 60,
                  height: 420,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 60,
                    height: 24,
                    backgroundColor: ACCENT_AMBER,
                  }}
                />
              </div>
              {/* Diagonal Truss Blade */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 20,
                  width: 58,
                  height: 440,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                  transformOrigin: "top left",
                  transform: `rotate(${interpolate(morphProgress, [0, 1], [0, 24])}deg)`,
                  opacity: morphProgress,
                }}
              />
              {/* Right Pillar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 60,
                  height: 420,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 60,
                    height: 24,
                    backgroundColor: ACCENT_AMBER,
                  }}
                />
              </div>
            </div>

            {/* GLYPH D (Front Face) */}
            <div style={{ width: 210, height: 420, position: "relative" }}>
              {/* Spine Pillar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 58,
                  height: 420,
                  backgroundColor: FRONT_FACE_COLOR,
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 58,
                    height: 24,
                    backgroundColor: ACCENT_AMBER,
                  }}
                />
              </div>
              {/* Curved Monolith Wing */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 58,
                  width: 152,
                  height: 420,
                  border: `52px solid ${FRONT_FACE_COLOR}`,
                  borderLeft: "none",
                  borderRadius: "0 180px 180px 0",
                  boxSizing: "border-box",
                  backgroundColor: "transparent",
                  boxShadow: `inset 0 1.5px 0 0 ${FRONT_RIM_COLOR}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. ACT 5: CLIMAX TYPOGRAPHY & DISCOVERY IDENTITY                      */}
      {/* ===================================================================== */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 120,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        {/* Left: Full Formal Conference Identity */}
        <div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "4px",
              color: TEXT_WHITE,
              textTransform: "uppercase",
              opacity: titleReveal,
              transform: `translateY(${interpolate(titleReveal, [0, 1], [14, 0])}px)`,
            }}
          >
            BIOMEDICAL & ADVANCED NEUROSCIENCE DAY
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "3px",
              color: ACCENT_AMBER,
              textTransform: "uppercase",
              marginTop: 8,
              opacity: themeReveal,
              transform: `translateY(${interpolate(themeReveal, [0, 1], [10, 0])}px)`,
            }}
          >
            FROM SIGNAL TO DISCOVERY
          </div>
        </div>

        {/* Right: Technical Event Metadata */}
        <div
          style={{
            textAlign: "right",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "2.5px",
            color: TEXT_MUTED,
            textTransform: "uppercase",
            opacity: metaReveal,
            lineHeight: "18px",
          }}
        >
          <div>ANNUAL UNIVERSITY RESEARCH SYMPOSIUM // 2026</div>
          <div>NEURAL SYSTEMS · BIO-INTERFACE · MEDICAL IMAGING</div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5. TOP EDITORIAL CALIBRATION HEADER                                   */}
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
        <div>BAND // RESEARCH INITIATIVE 2026</div>
        <div>
          {frame < 95
            ? "ACT 1: ACOUSTIC EXCITATION"
            : frame < 200
            ? "ACT 2: BOUNDARY INTERFERENCE"
            : frame < 320
            ? "ACT 3: DIMENSIONAL ELEVATION"
            : frame < 415
            ? "ACT 4: ARCHITECTURAL CONVERGENCE"
            : "ACT 5: DISCOVERY LOCK"}
        </div>
      </div>
    </div>
  );
};
