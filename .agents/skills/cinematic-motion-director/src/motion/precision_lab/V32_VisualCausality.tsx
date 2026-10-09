import React from "react";
import { useCurrentFrame, interpolate, spring, interpolateColors } from "remotion";

/**
 * V32 — Visual Causality & Shot-to-Shot Continuity Composition
 * 
 * 15.0 seconds | 450 frames @ 30 FPS | 1920x1080
 * 
 * "Motion is not a sequence of effects. Motion is the visual argument connecting one state to the next."
 * 
 * Causality Chain:
 * 1. Lateral Tension Pluck (0-75) -> Wave folds at nodes
 * 2. Isometric Enclosure (75-165) -> Hydraulic compression shatters walls
 * 3. Typographic Extrusion (165-270) -> Centripetal collapse into barycenter
 * 4. Singularity Stillness (270-345) -> 35-frame absolute zero-velocity freeze
 * 5. Astrolabe Coordinate Manifold (345-450) -> Infinite internal pressure detonates into celestial equilibrium
 */

export const V32_VisualCausality: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Global canvas bounds
  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // STATE 01: Lateral Tension & Harmonic Pluck (Frames 0 - 75)
  // Cause: Origin datum is pulled laterally to x=480, storing tension, then released.
  // =========================================================================
  const s1Active = frame < 85;
  const pluckPullProgress = interpolate(frame, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  // Asymmetric tension: pulled leftward and downward to (CX - 320, CY + 140)
  const pluckTensionX = interpolate(pluckPullProgress, [0, 1], [CX, CX - 380]);
  const pluckTensionY = interpolate(pluckPullProgress, [0, 1], [CY, CY + 180]);

  // Pluck release dynamics (Frame 26 to 75)
  const pluckReleased = frame >= 26;
  const pluckAge = Math.max(0, frame - 26);
  const pluckDecay = Math.exp(-pluckAge * 0.08);
  const pluckOscillation = Math.sin(pluckAge * 0.95) * 180 * pluckDecay;

  // Wave nodal line coordinates
  const lineY = pluckReleased ? CY + pluckOscillation : pluckTensionY;
  const lineXMid = pluckReleased ? CX : pluckTensionX;

  // Standing wave deformation for string
  const wavePoints = [];
  const waveSegments = 40;
  for (let i = 0; i <= waveSegments; i++) {
    const t = i / waveSegments;
    const px = interpolate(t, [0, 1], [240, W - 240]);
    let py = CY;
    if (pluckReleased && frame < 80) {
      // Harmonic standing wave: 2 nodes at quarter lengths
      const spatialHarmonic = Math.sin(t * Math.PI * 2);
      py = CY + spatialHarmonic * pluckOscillation * 0.85;
    } else if (!pluckReleased && frame < 26) {
      // Parabolic pull string
      const pullWeight = Math.sin(t * Math.PI);
      py = interpolate(pullWeight, [0, 1], [CY, pluckTensionY]);
    }
    wavePoints.push(`${px},${py}`);
  }
  const wavePathD = `M ${wavePoints.join(" L ")}`;

  // =========================================================================
  // CAUSALITY 1 -> 2: Folding of Standing Wave Nodes into Volume (Frames 70 - 100)
  // Because the string has trapped kinetic energy, its nodes fold 90 deg inward.
  // =========================================================================
  const foldProgress = interpolate(frame, [72, 98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // STATE 02: Isometric Wireframe Chamber & Hydraulic Crush (Frames 75 - 175)
  // Cause: The fold creates a closed chamber, which experiences inward pressure.
  // =========================================================================
  const s2Active = frame >= 72 && frame < 180;
  const chamberOrbit = (frame - 75) * 0.65;
  const chamberRad = (chamberOrbit * Math.PI) / 180;
  
  // Hydraulic compression starts at Frame 130
  const crushProgress = interpolate(frame, [135, 170], [1, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxSize = 170 * (1 - foldProgress * 0.1) * crushProgress;

  // 8 Isometric 3D vertices rotated and projected
  const getBoxVertex = (x: number, y: number, z: number) => {
    // Yaw rotation
    const rx = x * Math.cos(chamberRad) - z * Math.sin(chamberRad);
    const rz = x * Math.sin(chamberRad) + z * Math.cos(chamberRad);
    const ry = y;
    // Isometric camera projection
    const isoAngle = Math.PI / 6; // 30 deg
    const projX = CX + (rx - rz) * Math.cos(isoAngle);
    const projY = CY + ry + (rx + rz) * Math.sin(isoAngle) * 0.6;
    return { x: projX, y: projY };
  };

  const v0 = getBoxVertex(-boxSize, -boxSize, -boxSize);
  const v1 = getBoxVertex(boxSize, -boxSize, -boxSize);
  const v2 = getBoxVertex(boxSize, boxSize, -boxSize);
  const v3 = getBoxVertex(-boxSize, boxSize, -boxSize);
  const v4 = getBoxVertex(-boxSize, -boxSize, boxSize);
  const v5 = getBoxVertex(boxSize, -boxSize, boxSize);
  const v6 = getBoxVertex(boxSize, boxSize, boxSize);
  const v7 = getBoxVertex(-boxSize, boxSize, boxSize);

  // Box edges
  const boxEdges = [
    [v0, v1], [v1, v2], [v2, v3], [v3, v0], // back face
    [v4, v5], [v5, v6], [v6, v7], [v7, v4], // front face
    [v0, v4], [v1, v5], [v2, v6], [v3, v7], // connecting struts
  ];

  // =========================================================================
  // CAUSALITY 2 -> 3: Shattered Chamber Extrudes Typographic Matter (Frames 165 - 190)
  // Because the chamber is crushed, its walls extrude into Persian glyphs «توازن».
  // =========================================================================
  const s3Active = frame >= 165 && frame < 280;
  const extrusionProgress = interpolate(frame, [168, 195], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typoSpring = spring({
    frame: Math.max(0, frame - 170),
    fps,
    config: { damping: 14, stiffness: 180, mass: 1.1 },
  });

  // Centripetal collapse of typography into singularity begins at Frame 245
  const typoCollapse = interpolate(frame, [248, 275], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typoScale = typoSpring * typoCollapse;

  // =========================================================================
  // STATE 04: Zero-Velocity Singularity Suspension (Frames 270 - 345)
  // Cause: Collapse reaches infinite density at (CX, CY).
  // 35-Frame Complete Stillness: Frames 295 to 330 (v = 0).
  // =========================================================================
  const s4Active = frame >= 265 && frame < 350;
  const isSuspendedZeroVelocity = frame >= 295 && frame <= 330;
  
  // Singularity pre-detonation agitation (Frames 331 to 345)
  const preDetonationAge = Math.max(0, frame - 330);
  const jitterIntensity = frame > 330 && frame < 345 
    ? Math.sin(preDetonationAge * 2.8) * interpolate(frame, [330, 345], [0, 8]) 
    : 0;

  // Singularity dot radius
  const singularityRadius = interpolate(frame, [268, 285], [30, 7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // CAUSALITY 4 -> 5: Detonation into Astrolabe Manifold (Frames 345 - 450)
  // Because infinite density cannot remain contained, it detonates outward.
  // =========================================================================
  const s5Active = frame >= 345;
  const detonateAge = Math.max(0, frame - 345);
  const shockwaveRadius = interpolate(detonateAge, [0, 45], [10, 850], {
    extrapolateRight: "clamp",
  });
  const shockwaveOpacity = interpolate(detonateAge, [0, 25, 60], [1, 0.8, 0], {
    extrapolateRight: "clamp",
  });

  // Astrolabe coordinate rings unfurl
  const astrolabeSpring = spring({
    frame: detonateAge,
    fps,
    config: { damping: 16, stiffness: 90, mass: 1.2 },
  });

  // Slow cosmic micro-drift for finale
  const cosmicDriftAngle = (detonateAge * 0.15 * Math.PI) / 180;

  // Final text grounding: «هندسه اندیشه»
  const finaleTextOpacity = interpolate(frame, [380, 415], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // HUD / Architectural Framing Overlay
  // Precise visual metadata illustrating causality phase and exact frame
  // =========================================================================
  const currentPhaseTitle = 
    frame < 75 ? "PHASE 01: LATERAL TENSION & HARMONIC SNAP" :
    frame < 165 ? "PHASE 02: BUCKLED VOLUME & HYDRAULIC COMPRESSION" :
    frame < 270 ? "PHASE 03: LINGUISTIC SHEAR EXTRUSION [توازن]" :
    frame < 345 ? (isSuspendedZeroVelocity ? "PHASE 04: ZERO-VELOCITY SINGULARITY SUSPENSION [35F STILLNESS]" : "PHASE 04: MASS COLLAPSE & PRE-DETONATION CRITICALITY") :
    "PHASE 05: ASTROLABE COORDINATE MANIFOLD [UNIVERSAL EQUILIBRIUM]";

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: "#070A0F",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Vazirmatn', 'SF Pro Display', -apple-system, sans-serif",
      }}
    >
      {/* Background Architectural Grid (subtle 80px coordinates) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: W,
          height: H,
          pointerEvents: "none",
          opacity: 0.12,
        }}
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#48CAE4" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />
      </svg>

      {/* Screen HUD Header / Reticle Coordinates */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#E5A93C",
          fontSize: 12,
          fontFamily: "monospace",
          letterSpacing: 2,
          opacity: 0.85,
        }}
      >
        <div>DIRECTORATE LAB // V32 VISUAL CAUSALITY MASTER</div>
        <div style={{ color: "#48CAE4" }}>{currentPhaseTitle}</div>
        <div>
          FRAME: {String(frame).padStart(3, "0")} / 450 // SEC: {(frame / 30).toFixed(2)}s
        </div>
      </div>

      {/* Main Vector Animation Layer */}
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
        {/* STATE 01: Vector String & Tension Curve                           */}
        {/* ================================================================= */}
        {s1Active && (
          <g opacity={interpolate(frame, [72, 85], [1, 0], { extrapolateRight: "clamp" })}>
            {/* Horizontal baseline guide */}
            <line
              x1={240}
              y1={CY}
              x2={W - 240}
              y2={CY}
              stroke="#21262D"
              strokeWidth={1}
              strokeDasharray="4 8"
            />
            {/* The vibrating / plucked string */}
            <path
              d={wavePathD}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={2.5}
            />
            {/* Plucking Mass / Datum Point */}
            <circle
              cx={lineXMid}
              cy={lineY}
              r={pluckReleased ? 8 : 12}
              fill="#FFFFFF"
              filter="drop-shadow(0 0 12px #E5A93C)"
            />
            {/* Tension vector indicator during pull */}
            {!pluckReleased && (
              <line
                x1={CX}
                y1={CY}
                x2={pluckTensionX}
                y2={pluckTensionY}
                stroke="#48CAE4"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                opacity={0.6}
              />
            )}
          </g>
        )}

        {/* ================================================================= */}
        {/* STATE 02: Folded Isometric Wireframe Chamber                      */}
        {/* ================================================================= */}
        {s2Active && (
          <g opacity={interpolate(frame, [72, 80, 168, 180], [0, 1, 1, 0], { extrapolateRight: "clamp" })}>
            {/* Chamber Center Pivot Reticle */}
            <circle
              cx={CX}
              cy={CY}
              r={boxSize * 1.3}
              fill="none"
              stroke="#48CAE4"
              strokeWidth={0.8}
              strokeDasharray="4 6"
              opacity={0.3}
            />

            {/* Wireframe Connecting Struts */}
            {boxEdges.map(([pA, pB], idx) => (
              <line
                key={`edge-${idx}`}
                x1={pA.x}
                y1={pA.y}
                x2={pB.x}
                y2={pB.y}
                stroke={idx < 8 ? "#E5A93C" : "#48CAE4"}
                strokeWidth={1.8}
                opacity={0.85}
              />
            ))}

            {/* Vertices Nodes */}
            {[v0, v1, v2, v3, v4, v5, v6, v7].map((v, i) => (
              <circle
                key={`vert-${i}`}
                cx={v.x}
                cy={v.y}
                r={3}
                fill="#FFFFFF"
                opacity={0.9}
              />
            ))}

            {/* Diagonal Internal Stress Vectors under Compression */}
            {frame > 130 && (
              <>
                <line x1={v0.x} y1={v0.y} x2={v6.x} y2={v6.y} stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" opacity={0.65} />
                <line x1={v1.x} y1={v1.y} x2={v7.x} y2={v7.y} stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" opacity={0.65} />
              </>
            )}
          </g>
        )}

        {/* ================================================================= */}
        {/* STATE 03: Hydraulic Extrusion into Persian Typography «توازن»     */}
        {/* ================================================================= */}
        {s3Active && (
          <g
            transform={`translate(${CX}, ${CY}) scale(${typoScale})`}
            opacity={typoCollapse > 0 ? 1 : 0}
          >
            {/* Energy shear shockwave rings */}
            <circle
              cx={0}
              cy={0}
              r={interpolate(frame, [170, 220], [20, 260], { extrapolateRight: "clamp" })}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={1}
              opacity={interpolate(frame, [170, 220], [0.8, 0], { extrapolateRight: "clamp" })}
            />
            {/* The Persian Typography «توازن» as Sculptural Vector Mass */}
            <text
              x={0}
              y={24}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={140}
              fontWeight={900}
              style={{
                filter: "drop-shadow(0 0 24px rgba(229, 169, 60, 0.75))",
                letterSpacing: "4px",
              }}
            >
              توازن
            </text>
            {/* English Semantic Label */}
            <text
              x={0}
              y={90}
              textAnchor="middle"
              fill="#48CAE4"
              fontSize={16}
              fontFamily="monospace"
              letterSpacing={6}
              opacity={0.85}
            >
              EQUILIBRIUM THROUGH COMPRESSION
            </text>
          </g>
        )}

        {/* ================================================================= */}
        {/* STATE 04: Zero-Velocity Singularity Suspension                    */}
        {/* ================================================================= */}
        {s4Active && (
          <g transform={`translate(${CX + jitterIntensity}, ${CY})`}>
            {/* Concentrated Singularity Core */}
            <circle
              cx={0}
              cy={0}
              r={singularityRadius}
              fill="#FFFFFF"
              filter="drop-shadow(0 0 18px #E5A93C)"
            />
            {/* Aura of potential energy */}
            <circle
              cx={0}
              cy={0}
              r={singularityRadius * 3}
              fill="none"
              stroke="#E5A93C"
              strokeWidth={1}
              opacity={isSuspendedZeroVelocity ? 0.9 : 0.4}
              strokeDasharray={isSuspendedZeroVelocity ? "none" : "3 3"}
            />
            {/* Visual Callout for the 35-Frame Zero Velocity Hold */}
            {isSuspendedZeroVelocity && (
              <text
                x={0}
                y={60}
                textAnchor="middle"
                fill="#F8F9FA"
                fontSize={13}
                fontFamily="monospace"
                letterSpacing={3}
                opacity={0.8}
              >
                Δv = 0 // PURE ZERO-VELOCITY SUSPENSION
              </text>
            )}
          </g>
        )}

        {/* ================================================================= */}
        {/* STATE 05: Astrolabe Coordinate Manifold Detonation & Finale       */}
        {/* ================================================================= */}
        {s5Active && (
          <g
            transform={`translate(${CX}, ${CY}) rotate(${cosmicDriftAngle * (180 / Math.PI)})`}
            opacity={interpolate(frame, [345, 360], [0, 1], { extrapolateRight: "clamp" })}
          >
            {/* Expanding explosive shockwave */}
            <circle
              cx={0}
              cy={0}
              r={shockwaveRadius}
              fill="none"
              stroke="#48CAE4"
              strokeWidth={2}
              opacity={shockwaveOpacity}
            />

            {/* Concentric Astrolabe Coordinate Rings */}
            {[140, 240, 360, 480].map((radius, rIdx) => {
              const ringScale = interpolate(
                astrolabeSpring,
                [0, 1],
                [0.1, radius]
              );
              return (
                <circle
                  key={`astrolabe-ring-${rIdx}`}
                  cx={0}
                  cy={0}
                  r={ringScale}
                  fill="none"
                  stroke={rIdx % 2 === 0 ? "#E5A93C" : "#48CAE4"}
                  strokeWidth={rIdx === 0 ? 1.8 : 1}
                  strokeDasharray={rIdx % 2 === 0 ? "8 6" : "3 9"}
                  opacity={0.7}
                />
              );
            })}

            {/* Radial Celestial Spokes (8 axes = 16 rays) */}
            {Array.from({ length: 16 }).map((_, rayIdx) => {
              const rayAngle = (rayIdx * (360 / 16) * Math.PI) / 180;
              const rayLength = 500 * astrolabeSpring;
              const rx = Math.cos(rayAngle) * rayLength;
              const ry = Math.sin(rayAngle) * rayLength;
              return (
                <line
                  key={`ray-${rayIdx}`}
                  x1={0}
                  y1={0}
                  x2={rx}
                  y2={ry}
                  stroke={rayIdx % 2 === 0 ? "#E5A93C" : "#21262D"}
                  strokeWidth={rayIdx % 4 === 0 ? 1.5 : 0.75}
                  strokeDasharray={rayIdx % 2 === 0 ? "none" : "2 4"}
                  opacity={0.65}
                />
              );
            })}

            {/* Central Restored Golden Origin Core */}
            <circle
              cx={0}
              cy={0}
              r={12}
              fill="#E5A93C"
              filter="drop-shadow(0 0 16px #E5A93C)"
            />
          </g>
        )}
      </svg>

      {/* Finale Philosophical Typography Grounding (Frame 380 - 450) */}
      {frame >= 380 && (
        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: finaleTextOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: 2,
              textShadow: "0 0 20px rgba(229, 169, 60, 0.6)",
            }}
          >
            هندسه اندیشه
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: "monospace",
              color: "#E5A93C",
              letterSpacing: 6,
            }}
          >
            THE GEOMETRY OF CAUSAL THOUGHT // V32 MASTER
          </div>
        </div>
      )}

      {/* Corner Registration Reticles (Director-level framing) */}
      <div style={{ position: "absolute", top: 24, left: 24, width: 16, height: 16, borderTop: "2px solid #E5A93C", borderLeft: "2px solid #E5A93C", opacity: 0.6 }} />
      <div style={{ position: "absolute", top: 24, right: 24, width: 16, height: 16, borderTop: "2px solid #E5A93C", borderRight: "2px solid #E5A93C", opacity: 0.6 }} />
      <div style={{ position: "absolute", bottom: 24, left: 24, width: 16, height: 16, borderBottom: "2px solid #E5A93C", borderLeft: "2px solid #E5A93C", opacity: 0.6 }} />
      <div style={{ position: "absolute", bottom: 24, right: 24, width: 16, height: 16, borderBottom: "2px solid #E5A93C", borderRight: "2px solid #E5A93C", opacity: 0.6 }} />
    </div>
  );
};
