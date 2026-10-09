import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { MotionCurves } from "../curves/AuthoredKeyframeEngine";

/**
 * V36.5 — BLIND SHOWREEL STRESS TEST
 * 
 * Concept: "The Kinetic Index" (Swiss Kinetic Typography & Grid Metamorphosis)
 * Duration: 15.00 seconds | 450 frames @ 30 FPS | 1920x1080 Full HD
 * 
 * Absolute Clean Break from V36:
 * - NO horizon line sag or elastic spring wire
 * - NO ocular iris aperture or mechanical leaves
 * - NO Persian typography or Nuqteh diamond
 * - NO dark-mode brass / gold / obsidian aesthetic
 * - NO infinite loop baseline
 * 
 * Aesthetic Universe:
 * High-end Swiss International Typographic Style (Studio Dumbar / DIA Studio / Pentagram).
 * Pure stark Alabaster White (#F5F6F8), Deep Archival Carbon (#0C0E12),
 * and vibrant International Klein Blue (#002FA7).
 * 
 * Causal Transformation Chain (A -> B -> C -> D -> E):
 * 1. Act I (Frames 0–95): The Guillotine Impact & Baseline Tension Wave.
 *    Off-center heavy vertical carbon bar drops at Frame 10, slamming into the baseline
 *    at Frame 22 with seismic physical deceleration, launching a travelling transverse grid wave.
 * 2. Act II (Frames 95–185): Grid Line To Typography Slat Metamorphosis.
 *    Displaced baseline grid rules pivot 90° on their origins and thicken into heavy typographic slats,
 *    mechanically assembling the monumental Swiss numeral "01".
 * 3. Act III (Frames 185–280): Spatial Isometric Dimension Shift.
 *    Camera performs an aggressive 3D perspective sweep (Z: -45°, Rotate: 28°).
 *    The flat 2D numeral extrudes into a monolithic architectural tower casting a deep Klein Blue shadow.
 * 4. Act IV (Frames 280–355): The 35-Frame Mathematical Stillness & 45° Structural Shear.
 *    Complete dead stop at Frames 285–315.
 *    At Frame 315, a violent diagonal shear force fractures the monolith at 45°,
 *    the upper half sliding down the plane to carve a trench of pure negative space.
 * 5. Act V (Frames 355–450): The Inversion Climax & Editorial Cover Monogram.
 *    The sheared geometry locks into the canvas, inverting the entire background to carbon black (#0C0E12).
 *    The negative space resolves into the stark white and Klein Blue title glyph "DESIGN / 2026",
 *    framed by ultra-sharp Swiss layout index coordinates.
 */

export const V36_5_BlindShowreel: React.FC = () => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // ACT 1: THE GUILLOTINE DROP & GRID TENSION WAVE (Frames 0 - 95)
  // High-tension, brutal physical impact with zero rebound squander.
  // =========================================================================
  const act1Active = frame < 95;

  // 1. Guillotine Bar Drop (Frames 8 to 22)
  const dropProgress = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.55, 0.05, 0.9, 0.4), // Gravitational acceleration into slam
  });
  const barY = interpolate(dropProgress, [0, 1], [-450, CY - 240]);

  // Post-impact microscopic recoil vibration (Frames 22 to 38)
  const impactVibration = frame >= 22 && frame < 38
    ? Math.sin((frame - 22) * 1.6) * Math.exp(-(frame - 22) * 0.25) * 8
    : 0;

  // 2. Transverse Grid Wave Propagation across horizontal rules (Frames 22 to 85)
  const waveAge = Math.max(0, frame - 22);

  // =========================================================================
  // ACT 2: GRID-TO-TYPOGRAPHY SLAT RECONFIGURATION (Frames 90 - 185)
  // Grid rules pivot 90° and expand into the bold Swiss numeral "01".
  // =========================================================================
  const act2Active = frame >= 85 && frame < 190;

  const slatMorphProgress = interpolate(frame, [95, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: MotionCurves.snapSettle,
  });

  const slatRotation = interpolate(slatMorphProgress, [0, 1], [0, 90]);
  const slatWidth = interpolate(slatMorphProgress, [0, 1], [4, 64]);
  const numeralLockProgress = interpolate(frame, [145, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // =========================================================================
  // ACT 3: ISOMETRIC SPATIAL DIMENSION SHIFT (Frames 180 - 280)
  // Camera perspective sweep reveals the 2D graphic as an extruded 3D monolith.
  // =========================================================================
  const act3Active = frame >= 180 && frame < 285;

  const dimensionShiftProgress = interpolate(frame, [185, 255], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const isoRotateX = interpolate(dimensionShiftProgress, [0, 1], [0, 36]);
  const isoRotateZ = interpolate(dimensionShiftProgress, [0, 1], [0, -32]);
  const isoScale = interpolate(dimensionShiftProgress, [0, 1], [1.0, 1.25]);
  const extrusionDepth = interpolate(dimensionShiftProgress, [0, 1], [0, 140]);

  // =========================================================================
  // ACT 4: 30-FRAME MATHEMATICAL STILLNESS & 45° SHEAR FRACTURE (Frames 280 - 360)
  // Absolute stillness hold (Frames 285 - 315), followed by explosive diagonal shear.
  // =========================================================================
  const act4Active = frame >= 280 && frame < 365;
  const isStillness = frame >= 285 && frame <= 315;

  const shearProgress = interpolate(frame, [315, 345], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.1, 0.9, 0.15, 1),
  });

  const shearSlideX = interpolate(shearProgress, [0, 1], [0, 180]);
  const shearSlideY = interpolate(shearProgress, [0, 1], [0, 180]);

  // =========================================================================
  // ACT 5: THE INVERSION CLIMAX & EDITORIAL MONOGRAM (Frames 355 - 450)
  // Canvas inverts to deep archival black. Negative space resolves to "DESIGN / 2026".
  // =========================================================================
  const act5Active = frame >= 355;

  const inversionProgress = interpolate(frame, [355, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.3, 1),
  });

  const titleEntryProgress = interpolate(frame, [375, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bgAlabaster = "#F5F6F8";
  const bgCarbon = "#0C0E12";
  const currentBgColor = frame < 355 ? bgAlabaster : (frame < 380 ? (inversionProgress > 0.5 ? bgCarbon : bgAlabaster) : bgCarbon);

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: currentBgColor,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* ===================================================================== */}
      {/* SWISS BASELINE & 12-COLUMN ARCHITECTURAL GRID GUIDES                  */}
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
        {/* Subtle Column Grid Rules */}
        {Array.from({ length: 13 }).map((_, i) => {
          const colX = 120 + i * 140;
          return (
            <line
              key={`swiss-grid-col-${i}`}
              x1={colX}
              y1={0}
              x2={colX}
              y2={H}
              stroke={frame < 365 ? "#E2E5EB" : "#1A202C"}
              strokeWidth={1}
              strokeDasharray="2 6"
              opacity={0.65}
            />
          );
        })}

        {/* Dynamic Horizontal Baseline Rulers Reacting to Wave Tension */}
        {Array.from({ length: 9 }).map((_, i) => {
          const rowY = 120 + i * 110;
          // Travelling wave perturbation from guillotine impact (X = 640)
          const distFromImpact = Math.abs(640 - (120 + i * 180));
          const wavePhase = Math.max(0, waveAge - distFromImpact * 0.04);
          const waveOffset = wavePhase > 0 && wavePhase < 30
            ? Math.sin(wavePhase * 0.45) * Math.exp(-wavePhase * 0.12) * 18
            : 0;

          return (
            <g key={`swiss-grid-row-${i}`}>
              <line
                x1={120}
                y1={rowY + waveOffset}
                x2={W - 120}
                y2={rowY + waveOffset}
                stroke={frame < 365 ? "#CBD0DC" : "#242C3D"}
                strokeWidth={1}
                opacity={0.7}
              />
              {/* Layout Coordinate Micro-Index */}
              <text
                x={80}
                y={rowY + 4}
                fill={frame < 365 ? "#94A3B8" : "#4A5568"}
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
      {/* ACT 1: THE GUILLOTINE DROP BAR & SHOCKWAVE SLAM (Frames 0 - 95)       */}
      {/* ===================================================================== */}
      {act1Active && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: W,
            height: H,
          }}
        >
          {/* Heavy Guillotine Carbon Bar (Off-center at X = 640) */}
          <rect
            x={640}
            y={barY + impactVibration}
            width={72}
            height={480}
            fill="#0C0E12"
          />

          {/* International Klein Blue Leading Wedge */}
          <rect
            x={640}
            y={barY + impactVibration + 472}
            width={72}
            height={8}
            fill="#002FA7"
          />

          {/* Impact Baseline Floor Line */}
          <line
            x1={120}
            y1={CY + 240}
            x2={W - 120}
            y2={CY + 240}
            stroke="#0C0E12"
            strokeWidth={4}
          />

          {/* Kinetic Energy Impact Spikes (Frames 22 to 45) */}
          {frame >= 22 && frame < 45 && (
            <g opacity={interpolate(frame, [22, 45], [1, 0])}>
              <line
                x1={640}
                y1={CY + 240}
                x2={640 - interpolate(frame, [22, 45], [0, 160])}
                y2={CY + 240}
                stroke="#002FA7"
                strokeWidth={5}
              />
              <line
                x1={712}
                y1={CY + 240}
                x2={712 + interpolate(frame, [22, 45], [0, 160])}
                y2={CY + 240}
                stroke="#002FA7"
                strokeWidth={5}
              />
            </g>
          )}
        </svg>
      )}

      {/* ===================================================================== */}
      {/* ACT 2 & 3: KINETIC TYPOGRAPHY SLATS & 3D ISOMETRIC MONOLITH (90 - 280)*/}
      {/* ===================================================================== */}
      {(act2Active || act3Active) && (
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
            perspective: 1200,
          }}
        >
          <div
            style={{
              transform: `scale(${isoScale}) rotateX(${isoRotateX}deg) rotateZ(${isoRotateZ}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s linear",
              position: "relative",
              width: 500,
              height: 500,
            }}
          >
            {/* Monolithic Extrusion Depth (Rendered via staggered 3D slices) */}
            {extrusionDepth > 0 &&
              Array.from({ length: 8 }).map((_, idx) => {
                const zStep = (idx / 7) * extrusionDepth;
                return (
                  <div
                    key={`iso-depth-slice-${idx}`}
                    style={{
                      position: "absolute",
                      top: 60,
                      left: 120,
                      width: 260,
                      height: 380,
                      backgroundColor: idx === 7 ? "#002FA7" : "#1A202C",
                      transform: `translateZ(${-zStep}px)`,
                      opacity: 0.35,
                    }}
                  />
                );
              })}

            {/* Front Architectural Face of Numeral "01" */}
            <div
              style={{
                position: "absolute",
                top: 60,
                left: 80,
                width: 340,
                height: 380,
                display: "flex",
                justifyContent: "space-between",
                transform: `translateZ(0px)`,
              }}
            >
              {/* Glyph "0": Crisp Modular Box Frame */}
              <div
                style={{
                  width: 140,
                  height: 380,
                  border: `${slatWidth}px solid #0C0E12`,
                  boxSizing: "border-box",
                  transform: `scale(${slatMorphProgress})`,
                  transformOrigin: "center center",
                }}
              />

              {/* Glyph "1": Bold Architectural Pillar with Serifs & Klein Blue Apex */}
              <div
                style={{
                  width: 100,
                  height: 380,
                  position: "relative",
                  opacity: numeralLockProgress,
                  transform: `scale(${numeralLockProgress})`,
                  transformOrigin: "bottom center",
                }}
              >
                {/* Main Stem */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 72,
                    height: 380,
                    backgroundColor: "#0C0E12",
                  }}
                >
                  {/* Klein Blue Accent Crown */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 72,
                      height: 28,
                      backgroundColor: "#002FA7",
                    }}
                  />
                </div>
                {/* Top Beak Flag */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 48,
                    height: 48,
                    backgroundColor: "#0C0E12",
                    clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 4: 45° STRUCTURAL SHEAR & NEGATIVE SPACE TRENCH (Frames 280 - 365)*/}
      {/* ===================================================================== */}
      {act4Active && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: W,
            height: H,
          }}
        >
          {/* Static Lower Wedge of the Fractured Monolith */}
          <polygon
            points={`${CX - 160},${CY + 180} ${CX + 160},${CY + 180} ${CX - 160},${CY - 140}`}
            fill="#0C0E12"
          />

          {/* Sheared Upper Wedge Sliding Diagonally along 45° Vector */}
          <g transform={`translate(${shearSlideX}, ${shearSlideY})`}>
            <polygon
              points={`${CX - 160},${CY - 140} ${CX + 160},${CY + 180} ${CX + 160},${CY - 140}`}
              fill="#0C0E12"
            />
            {/* Klein Blue Polished Shear Plane Line */}
            <line
              x1={CX - 160}
              y1={CY - 140}
              x2={CX + 160}
              y2={CY + 180}
              stroke="#002FA7"
              strokeWidth={6}
            />
          </g>

          {/* 30-Frame Stillness Audit Indicator */}
          {isStillness && (
            <text
              x={CX}
              y={CY + 260}
              textAnchor="middle"
              fill="#002FA7"
              fontSize={14}
              fontWeight={700}
              letterSpacing="4px"
            >
              [ HOLD // REST VELOCITY 0.000 ]
            </text>
          )}
        </svg>
      )}

      {/* ===================================================================== */}
      {/* ACT 5: THE INVERSION MONOGRAM & EDITORIAL FINALE (Frames 355 - 450)   */}
      {/* ===================================================================== */}
      {act5Active && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: W,
            height: H,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Monumental Swiss Editorial Headline "DESIGN / 2026" */}
          <div
            style={{
              opacity: titleEntryProgress,
              transform: `translateY(${interpolate(titleEntryProgress, [0, 1], [30, 0])}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 140,
                fontWeight: 900,
                color: "#F5F6F8",
                letterSpacing: "-4px",
                lineHeight: 0.9,
                textTransform: "uppercase",
              }}
            >
              DESIGN
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#002FA7",
                letterSpacing: "16px",
                marginTop: 24,
                textTransform: "uppercase",
              }}
            >
              MONOGRAPH // 2026
            </div>
          </div>

          {/* Precision Architectural Framing & Rule Lines */}
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
            {/* Top and Bottom Anchor Margins */}
            <line x1={80} y1={80} x2={W - 80} y2={80} stroke="#242C3D" strokeWidth={1} />
            <line x1={80} y1={H - 80} x2={W - 80} y2={H - 80} stroke="#242C3D" strokeWidth={1} />

            {/* Corner Alignment Crosshairs */}
            <path d="M 70,80 L 90,80 M 80,70 L 80,90" stroke="#002FA7" strokeWidth={2} />
            <path d={`M ${W - 90},80 L ${W - 70},80 M ${W - 80},70 L ${W - 80},90`} stroke="#002FA7" strokeWidth={2} />
            <path d={`M 70,${H - 80} L 90,${H - 80} M 80,${H - 90} L 80,${H - 70}`} stroke="#002FA7" strokeWidth={2} />
            <path d={`M ${W - 90},${H - 80} L ${W - 70},${H - 80} M ${W - 80},${H - 90} L ${W - 80},${H - 70}`} stroke="#002FA7" strokeWidth={2} />
          </svg>
        </div>
      )}

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
          color: frame < 365 ? "#64748B" : "#A0AEC0",
          textTransform: "uppercase",
          pointerEvents: "none",
        }}
      >
        <div>SWISS KINETIC INDEX // REEL V36.5</div>
        <div>1920×1080 // 30 FPS // 450 FRAMES</div>
      </div>
    </div>
  );
};
