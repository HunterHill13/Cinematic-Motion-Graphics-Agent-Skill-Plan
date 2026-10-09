/**
 * ============================================================================
 * V40.1 KINETIC MONOLITH PREVIEW — CHOREOGRAPHY PASS
 * ============================================================================
 * Focus: Fluid Causal Chain, Momentum Handoff & Topological Transformation
 * 
 * Causality Matrix:
 * 1. Monolith Calibration (F0-F60) -> Articulated Rail Bifurcation (F60-F120)
 * 2. Plinth 1 (65) Launch & Settle (F135-F215)
 * 3. 65 Settle -> Kinetic Pulse through Foundation Rail -> Triggers Plinth 2 (F215-F238)
 * 4. Plinth 2 (110) Fast Servo Ascent & 3D Diagonal Truss Unfolding (F240-F320)
 * 5. 110 Lock -> Overhead Energy Arc & Camera Orbit -> Triggers Plinth 3 (F320-F355)
 * 6. Plinth 3 (130) Volcanic Eruption & Telescoping Crown Extrusion (F355-F465)
 * 7. Monumental Seismic Impact -> Crane Pull-Back -> Complete Trilogy (F465-F570)
 * ============================================================================
 */

import React from "react";
import {
  Audio,
  interpolate,
  useCurrentFrame,
  staticFile,
} from "remotion";
import {
  evaluateAuthoredKeyframeTrack,
  AuthoredMotionTrack,
  MotionCurves,
} from "../curves/AuthoredKeyframeEngine";

// ============================================================================
// DUAL SCRIPT ARCHITECTURE: SANITIZE DISPLAY FUNCTION
// ============================================================================
export function sanitizeForDisplay(text: string): string {
  return text
    .replace(/[\u064B-\u0652\u0670\u0653\u0654\u0655]/g, "")
    .replace(/کُمیتهیِ|کمیتهیِ/g, "کمیته‌ی")
    .replace(/مادّهیِ|مادهیِ/g, "ماده‌ی")
    .replace(/آییننامهیِ|آیین‌نامهیِ/g, "آیین‌نامه‌ی")
    .replace(/بَرجَستهیِ|برجستهیِ/g, "برجسته‌ی")
    .replace(/تأییدیهیِ|تاییدیهیِ/g, "تأییدیه‌ی")
    .replace(/مُحاسِبِهیِ|محاسبهیِ/g, "محاسبه‌ی")
    .replace(/و\s+جود/g, "وجود")
    .replace(/گامبِهگام/g, "گام‌به‌گام")
    .trim();
}

// ============================================================================
// AUTHORED KEYFRAME MOTION TRACKS (ONE PER ARCHITECTURAL PLINTH)
// ============================================================================

// Plinth 1 (BSc - 65 Points): Heavy Architectural Launch
const PLINTH_1_TRACK: AuthoredMotionTrack = {
  id: "plinth-1-bsc",
  totalDurationFrames: 570,
  profile: "HEAVY",
  keyframes: [
    { time: 0.0, role: "REST", value: 0 },
    { time: 130 / 570, role: "REST", value: 0 },
    { time: 155 / 570, role: "ANTICIPATION", value: -16 }, // Hydraulic load dip
    { time: 195 / 570, role: "LAUNCH", value: 240, curve: MotionCurves.heavyLaunch },
    { time: 210 / 570, role: "OVERSHOOT", value: 256 }, // +16px overshoot
    { time: 228 / 570, role: "SETTLE", value: 240, curve: MotionCurves.snapSettle },
    { time: 1.0, role: "HOLD", value: 240 },
  ],
};

// Plinth 2 (General Medicine - 110 Points): Fast Precision Servo & Kinetic Catch
const PLINTH_2_TRACK: AuthoredMotionTrack = {
  id: "plinth-2-med",
  totalDurationFrames: 570,
  profile: "MECHANICAL",
  keyframes: [
    { time: 0.0, role: "REST", value: 0 },
    { time: 236 / 570, role: "REST", value: 0 }, // Triggered directly by pulse from 65!
    { time: 255 / 570, role: "ANTICIPATION", value: -22 }, // Sudden kinetic compression
    { time: 295 / 570, role: "LAUNCH", value: 340, curve: MotionCurves.snapSettle }, // Fast servo ascent
    { time: 312 / 570, role: "OVERSHOOT", value: 354 },
    { time: 326 / 570, role: "SETTLE", value: 340, curve: MotionCurves.snapSettle },
    { time: 1.0, role: "HOLD", value: 340 },
  ],
};

// Plinth 3 (PhD / Specialty - 130 Points Apex): Volcanic Climax Ascent
const PLINTH_3_TRACK: AuthoredMotionTrack = {
  id: "plinth-3-phd",
  totalDurationFrames: 570,
  profile: "SLAM",
  keyframes: [
    { time: 0.0, role: "REST", value: 0 },
    { time: 350 / 570, role: "REST", value: 0 }, // Triggered by energy arc from 110!
    { time: 395 / 570, role: "ANTICIPATION", value: -32 }, // Prolonged seismic charge
    { time: 440 / 570, role: "LAUNCH", value: 440, curve: MotionCurves.impactCurve }, // Volcanic eruption
    { time: 458 / 570, role: "OVERSHOOT", value: 468 },
    { time: 480 / 570, role: "SETTLE", value: 440, curve: MotionCurves.snapSettle },
    { time: 1.0, role: "HOLD", value: 440 },
  ],
};

export const V40_KineticMonolithPreview: React.FC = () => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const BASE_Y = 820; // Ground plane datum

  // =========================================================================
  // MATERIAL PALETTE (Scientific Aerospace Brutalism)
  // =========================================================================
  const BG_COLOR = "#080A0F";
  const TITANIUM_FACE = "#1E2633";
  const TITANIUM_SIDE = "#141A24";
  const TITANIUM_BEVEL = "#3A4B61";
  const TITANIUM_RIM = "#5A7294";
  const CADMIUM_CORE = "#FF5500";
  const AMBER_TELEMETRY = "#F59E0B";
  const CYAN_ACCENT = "#06B6D4";
  const TEXT_WHITE = "#FFFFFF";
  const TEXT_MUTED = "#8294A8";
  const GRID_LINE = "#121722";

  // =========================================================================
  // MOTION EVALUATIONS VIA AUTHORED KEYFRAME ENGINE
  // =========================================================================
  const evalPlinth1 = evaluateAuthoredKeyframeTrack(PLINTH_1_TRACK, frame);
  const evalPlinth2 = evaluateAuthoredKeyframeTrack(PLINTH_2_TRACK, frame);
  const evalPlinth3 = evaluateAuthoredKeyframeTrack(PLINTH_3_TRACK, frame);

  const h1 = Math.max(0, evalPlinth1.value);
  const h2 = Math.max(0, evalPlinth2.value);
  const h3 = Math.max(0, evalPlinth3.value);

  // =========================================================================
  // MOMENTUM HANDOFF 1: 65 SETTLE -> PULSE TRAVEL -> 110 TRIGGER (F215 - F245)
  // =========================================================================
  // Physical pulse traveling through the base rail from Plinth 1 (CX+340) to Plinth 2 (CX)
  const pulseActive1to2 = frame >= 215 && frame <= 245;
  const pulseProg1to2 = interpolate(frame, [215, 238], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseX1to2 = CX + 340 - 340 * pulseProg1to2; // Traverses from +340 to 0

  // =========================================================================
  // MOMENTUM HANDOFF 2: 110 LOCK -> ENERGY ARC -> 130 TRIGGER (F320 - F360)
  // =========================================================================
  // Overhead energy laser arc shooting from Plinth 2 summit (CX) to Plinth 3 (CX-340)
  const arcActive2to3 = frame >= 320 && frame <= 360;
  const arcProg2to3 = interpolate(frame, [320, 348], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arcX2to3 = CX - 340 * arcProg2to3; // Traverses from 0 to -340

  // =========================================================================
  // NONLINEAR TOPOLOGICAL TRANSFORMATION: ARTICULATED TRUSS BRIDGES
  // =========================================================================
  // Truss 1 (bridges 65 to 110): unfolds as Plinth 2 rises past Plinth 1
  const trussProg1to2 = interpolate(frame, [260, 310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Truss 2 (bridges 110 to 130): unfolds as Plinth 3 erupts past Plinth 2
  const trussProg2to3 = interpolate(frame, [400, 455], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Telescoping Crown Extrusion on Plinth 3 (Z-Extrusion Climax)
  const crownExtrusion = interpolate(frame, [430, 475], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mechanical Shutter Exposures for Numerals (consequence of reaching calibration)
  const shutterProg1 = interpolate(frame, [180, 205], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shutterProg2 = interpolate(frame, [285, 308], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shutterProg3 = interpolate(frame, [425, 452], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // =========================================================================
  // PARTICIPATING CAMERA CHOREOGRAPHY (Narrative-Driven, No Idle Drifting)
  // =========================================================================
  // 1. Initial Inspection (F0-F120): Push-in during calibration scan
  // 2. 65 Launch (F130-F220): Slight push-in and tilt tracking Plinth 1
  // 3. Momentum Handoff to 110 (F220-F320): Camera tracks lateral left and reveals diagonal perspective
  // 4. Climax Escalation to 130 (F320-F460): Camera orbits left (-10deg Dutch), charges, then erupts
  // 5. Grand Resolution (F460-F570): Majestic crane pull-back revealing complete architectural mountain
  const camZoom = interpolate(
    frame,
    [0, 110, 195, 235, 320, 360, 440, 520],
    [1.08, 1.15, 1.12, 1.10, 1.05, 1.12, 1.02, 0.92],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const camPanX = interpolate(
    frame,
    [0, 120, 210, 260, 340, 440, 540],
    [0, 30, 80, 20, -60, -100, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const camPitchY = interpolate(
    frame,
    [0, 120, 200, 320, 440, 530],
    [0, -25, -10, 15, -15, 45],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const camTiltDeg = interpolate(
    frame,
    [0, 140, 220, 330, 440, 520],
    [0, -1.5, 0.8, -1.2, 2.0, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Authored Secondary Camera Shudder on Impacts (Decaying exponential impulses)
  const shudder1 = frame >= 195 && frame < 225
    ? Math.sin((frame - 195) * 1.6) * Math.exp(-(frame - 195) * 0.18) * 5
    : 0;
  const shudder2 = frame >= 305 && frame < 335
    ? Math.sin((frame - 305) * 1.7) * Math.exp(-(frame - 305) * 0.18) * 7
    : 0;
  const shudder3 = frame >= 445 && frame < 485
    ? Math.sin((frame - 445) * 1.5) * Math.exp(-(frame - 445) * 0.12) * 14
    : 0;
  const totalCameraShake = shudder1 + shudder2 + shudder3;

  // Base Bifurcation (F40 - F110)
  const separationProgress = interpolate(frame, [40, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const plinthSpacing = 340 * separationProgress;

  // Laser Calibration Scan (F15 - F60)
  const scanBeamX = interpolate(frame, [15, 65], [CX - 450, CX + 450], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scanActive = frame >= 15 && frame <= 70;

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: BG_COLOR,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Vazirmatn', system-ui, sans-serif",
        color: TEXT_WHITE,
        direction: "rtl",
      }}
    >
      {/* 1. MASTER AUDIO TRACK (Google Gemini Voice + Climax Score + Physical SFX) */}
      <Audio src={staticFile("audio/v40_preview_master.mp3")} />

      {/* 2. THE SOVEREIGN CALIBRATION PAVILION (Atmospheric Obsidian Space) */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: W,
          height: H,
          pointerEvents: "none",
        }}
      >
        <defs>
          <radialGradient id="v40-core-ambient" cx="50%" cy="65%" r="65%">
            <stop offset="0%" stopColor="rgba(255, 85, 0, 0.09)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.04)" />
            <stop offset="100%" stopColor="rgba(8, 10, 15, 0)" />
          </radialGradient>
          <linearGradient id="v40-floor-specular" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(58, 75, 97, 0.38)" />
            <stop offset="35%" stopColor="rgba(20, 26, 36, 0.16)" />
            <stop offset="100%" stopColor="rgba(8, 10, 15, 0)" />
          </linearGradient>
        </defs>

        {/* Dynamic Center Ambient Bloom */}
        <rect x={0} y={0} width={W} height={H} fill="url(#v40-core-ambient)" />

        {/* Architectural Elevation Datums */}
        {Array.from({ length: 11 }).map((_, i) => {
          const rowY = 100 + i * 85;
          return (
            <g key={`v40-datum-${i}`}>
              <line x1={80} y1={rowY} x2={W - 80} y2={rowY} stroke={GRID_LINE} strokeWidth={1} opacity={0.7} />
              <text x={W - 60} y={rowY + 4} fill="#263345" fontSize={8} fontWeight={700} letterSpacing="1px" textAnchor="end">
                {`ELEV_DATUM_${String(i + 1).padStart(2, "0")}`}
              </text>
            </g>
          );
        })}

        {/* Floor Horizon Line */}
        <line x1={0} y1={BASE_Y} x2={W} y2={BASE_Y} stroke={TITANIUM_BEVEL} strokeWidth={2} opacity={0.7} />

        {/* Specular Floor Reflection */}
        <rect x={0} y={BASE_Y} width={W} height={H - BASE_Y} fill="url(#v40-floor-specular)" />

        {/* Laser Calibration Beam (F15 - F65) */}
        {scanActive && (
          <g>
            <line
              x1={scanBeamX}
              y1={BASE_Y - 140}
              x2={scanBeamX}
              y2={BASE_Y + 10}
              stroke={AMBER_TELEMETRY}
              strokeWidth={2}
              opacity={0.85}
            />
            <circle cx={scanBeamX} cy={BASE_Y - 60} r={4} fill="#FFF" />
          </g>
        )}
      </svg>

      {/* 3. PARTICIPATING CAMERA VIEWPORT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${camZoom}) translate(${camPanX}px, ${camPitchY + totalCameraShake}px) rotate(${camTiltDeg}deg)`,
          transformOrigin: "50% 75%",
          willChange: "transform",
        }}
      >
        {/* =================================================================== */}
        {/* BEDROCK MONOLITHIC FOUNDATION & ARTICULATED TRACK                   */}
        {/* =================================================================== */}
        <div
          style={{
            position: "absolute",
            left: CX - 560,
            top: BASE_Y - 32,
            width: 1120,
            height: 42,
            backgroundColor: TITANIUM_SIDE,
            borderTop: `2px solid ${TITANIUM_RIM}`,
            borderBottom: `2px solid #0B0E14`,
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 35px 70px rgba(0, 0, 0, 0.95)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
          }}
        >
          {/* Foundation Telemetry */}
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "2px", color: TEXT_MUTED }}>
            {sanitizeForDisplay("سیستم یکپارچه‌ی اعتبارسنجی بند کاف // وزارت بهداشت")}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: h3 > 10 ? CADMIUM_CORE : h2 > 10 ? CYAN_ACCENT : AMBER_TELEMETRY,
                boxShadow: `0 0 12px ${h3 > 10 ? CADMIUM_CORE : h2 > 10 ? CYAN_ACCENT : AMBER_TELEMETRY}`,
              }}
            />
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "1px", color: TEXT_WHITE }}>
              {h3 > 200
                ? "APEX_SUMMIT_LOCKED"
                : h2 > 200
                ? "TIER_02_MEDICINE_ENGAGED"
                : h1 > 100
                ? "TIER_01_CALIBRATED"
                : "CALIBRATING_BASE"}
            </div>
          </div>

          {/* MOMENTUM HANDOFF VISUAL PULSE IN FOUNDATION (65 -> 110) */}
          {pulseActive1to2 && (
            <div
              style={{
                position: "absolute",
                left: pulseX1to2 - 40,
                top: 0,
                width: 80,
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.9), transparent)",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.8)",
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* =================================================================== */}
        {/* NONLINEAR TOPOLOGICAL TRUSS 1: BRIDGING 65 TO 110 (Unfolds in 3D)   */}
        {/* =================================================================== */}
        {trussProg1to2 > 0.05 && (
          <div
            style={{
              position: "absolute",
              left: CX + 130, // Edge of Plinth 1
              bottom: H - (BASE_Y - 30),
              width: plinthSpacing - 130,
              height: 20,
              transformOrigin: "0% 50%",
              transform: `rotate(${-32 * trussProg1to2}deg) scaleX(${trussProg1to2})`,
              backgroundColor: TITANIUM_SIDE,
              border: `1px solid ${AMBER_TELEMETRY}`,
              boxShadow: "0 0 15px rgba(245, 158, 11, 0.3)",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={`truss1-tooth-${idx}`}
                style={{ width: 4, height: 12, backgroundColor: AMBER_TELEMETRY, opacity: 0.8 }}
              />
            ))}
          </div>
        )}

        {/* =================================================================== */}
        {/* NONLINEAR TOPOLOGICAL TRUSS 2: BRIDGING 110 TO 130 (Climax Unfold)  */}
        {/* =================================================================== */}
        {trussProg2to3 > 0.05 && (
          <div
            style={{
              position: "absolute",
              left: CX - plinthSpacing + 150, // Edge of Plinth 3
              bottom: H - (BASE_Y - 30) + 120,
              width: plinthSpacing - 150,
              height: 24,
              transformOrigin: "100% 50%",
              transform: `rotate(${36 * trussProg2to3}deg) scaleX(${trussProg2to3})`,
              backgroundColor: TITANIUM_SIDE,
              border: `1.5px solid ${CADMIUM_CORE}`,
              boxShadow: "0 0 20px rgba(255, 85, 0, 0.4)",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={`truss2-tooth-${idx}`}
                style={{ width: 5, height: 14, backgroundColor: CADMIUM_CORE, opacity: 0.9 }}
              />
            ))}
          </div>
        )}

        {/* =================================================================== */}
        {/* OVERHEAD ENERGY ARC (110 -> 130 MOMENTUM HANDOFF)                  */}
        {/* =================================================================== */}
        {arcActive2to3 && (
          <svg
            style={{
              position: "absolute",
              left: CX - 340,
              bottom: H - (BASE_Y - 30) - 20,
              width: 340,
              height: 480,
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <path
              d={`M 340 ${480 - (75 + h2)} Q 170 ${480 - (h2 + 80)} ${arcX2to3 - (CX - 340)} ${480 - 100}`}
              fill="none"
              stroke={CADMIUM_CORE}
              strokeWidth={3}
              strokeDasharray="8 4"
              opacity={0.9}
            />
            <circle
              cx={arcX2to3 - (CX - 340)}
              cy={480 - 100}
              r={6}
              fill="#FFF"
              style={{ filter: "drop-shadow(0 0 10px #FF5500)" }}
            />
          </svg>
        )}

        {/* =================================================================== */}
        {/* PLINTH 1: BACHELOR / BSc (۶۵ امتیاز) — Right Plinth in RTL        */}
        {/* =================================================================== */}
        <div
          style={{
            position: "absolute",
            left: CX + plinthSpacing - 130,
            bottom: H - (BASE_Y - 30),
            width: 260,
            height: 70 + h1,
            backgroundColor: TITANIUM_FACE,
            borderLeft: `2px solid ${TITANIUM_BEVEL}`,
            borderRight: `2px solid ${TITANIUM_BEVEL}`,
            borderTop: `3px solid ${h1 > 10 ? AMBER_TELEMETRY : TITANIUM_RIM}`,
            borderRadius: "8px 8px 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow:
              h1 > 10
                ? `0 -10px 45px rgba(245, 158, 11, 0.28), 0 20px 40px rgba(0,0,0,0.8)`
                : "0 10px 20px rgba(0,0,0,0.5)",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          {/* Top Hydraulic Accent Cap */}
          <div
            style={{
              width: "100%",
              height: 14,
              backgroundColor: h1 > 10 ? "rgba(245, 158, 11, 0.25)" : "rgba(255,255,255,0.03)",
              borderBottom: `1px solid ${TITANIUM_BEVEL}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 45, height: 2, backgroundColor: AMBER_TELEMETRY, opacity: h1 > 10 ? 1 : 0.3 }} />
          </div>

          {/* Numeral Cut-Out Shutter Chamber */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 90,
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              opacity: Math.max(0, Math.min(1, (h1 - 10) / 25)),
            }}
          >
            {/* The Numeral Itself (Engraved & Backlit) */}
            <div
              style={{
                fontSize: 74,
                fontWeight: 900,
                color: TEXT_WHITE,
                textShadow: "0 0 35px rgba(245, 158, 11, 0.7)",
                letterSpacing: "-2px",
              }}
            >
              ۶۵
            </div>

            {/* Physical Mechanical Sliding Shutter (Consequence of Motion) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: TITANIUM_SIDE,
                borderBottom: `2px solid ${AMBER_TELEMETRY}`,
                transform: `translateY(${shutterProg1 * 100}%)`,
                transition: "transform 0.05s linear",
              }}
            />
          </div>

          {/* Degree Tier Label (Architectural Engraving) */}
          <div
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 800,
              color: h1 > 10 ? AMBER_TELEMETRY : TEXT_MUTED,
              letterSpacing: "0.5px",
              opacity: Math.max(0, Math.min(1, (h1 - 15) / 25)),
            }}
          >
            {sanitizeForDisplay("کارشناسی")}
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              fontWeight: 600,
              color: TEXT_MUTED,
              opacity: Math.max(0, Math.min(1, (h1 - 20) / 25)),
            }}
          >
            {sanitizeForDisplay("دانشگاه‌های تیپ یک")}
          </div>

          {/* Hydraulic Flank Measurement Notches */}
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 30,
              bottom: 20,
              width: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: 0.45,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`p1-tick-${i}`} style={{ width: i % 2 === 0 ? 6 : 3, height: 1, backgroundColor: "#FFF" }} />
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* PLINTH 2: GENERAL MEDICINE (۱۱۰ امتیاز) — Center Plinth           */}
        {/* =================================================================== */}
        <div
          style={{
            position: "absolute",
            left: CX - 140,
            bottom: H - (BASE_Y - 30),
            width: 280,
            height: 75 + h2,
            backgroundColor: TITANIUM_FACE,
            borderLeft: `2px solid ${TITANIUM_BEVEL}`,
            borderRight: `2px solid ${TITANIUM_BEVEL}`,
            borderTop: `3px solid ${h2 > 10 ? CYAN_ACCENT : TITANIUM_RIM}`,
            borderRadius: "8px 8px 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow:
              h2 > 10
                ? `0 -15px 55px rgba(6, 182, 212, 0.35), 0 25px 50px rgba(0,0,0,0.85)`
                : "0 10px 20px rgba(0,0,0,0.5)",
            overflow: "hidden",
            zIndex: 3,
          }}
        >
          {/* Top Hydraulic Accent Cap */}
          <div
            style={{
              width: "100%",
              height: 15,
              backgroundColor: h2 > 10 ? "rgba(6, 182, 212, 0.25)" : "rgba(255,255,255,0.03)",
              borderBottom: `1px solid ${TITANIUM_BEVEL}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 55, height: 2, backgroundColor: CYAN_ACCENT, opacity: h2 > 10 ? 1 : 0.3 }} />
          </div>

          {/* Numeral Cut-Out Shutter Chamber */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 100,
              marginTop: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              opacity: Math.max(0, Math.min(1, (h2 - 10) / 25)),
            }}
          >
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: TEXT_WHITE,
                textShadow: "0 0 40px rgba(6, 182, 212, 0.75)",
                letterSpacing: "-2px",
              }}
            >
              ۱۱۰
            </div>

            {/* Sliding Shutter */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: TITANIUM_SIDE,
                borderBottom: `2px solid ${CYAN_ACCENT}`,
                transform: `translateY(${shutterProg2 * 100}%)`,
                transition: "transform 0.05s linear",
              }}
            />
          </div>

          {/* Degree Tier Label */}
          <div
            style={{
              marginTop: 10,
              fontSize: 22,
              fontWeight: 800,
              color: h2 > 10 ? CYAN_ACCENT : TEXT_MUTED,
              letterSpacing: "0.5px",
              opacity: Math.max(0, Math.min(1, (h2 - 15) / 25)),
            }}
          >
            {sanitizeForDisplay("پزشکی عمومی")}
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 13,
              fontWeight: 600,
              color: TEXT_MUTED,
              opacity: Math.max(0, Math.min(1, (h2 - 20) / 25)),
            }}
          >
            {sanitizeForDisplay("دکتری عمومی // دندان‌پزشکی // داروسازی")}
          </div>

          {/* Flank Rulers */}
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 30,
              bottom: 20,
              width: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: 0.45,
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`p2-tick-${i}`} style={{ width: i % 2 === 0 ? 6 : 3, height: 1, backgroundColor: "#FFF" }} />
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* PLINTH 3: PhD & SPECIALTY (۱۳۰ امتیاز APEX) — Left Plinth in RTL  */}
        {/* =================================================================== */}
        <div
          style={{
            position: "absolute",
            left: CX - plinthSpacing - 150,
            bottom: H - (BASE_Y - 30),
            width: 300,
            height: 80 + h3,
            zIndex: 4,
          }}
        >
          {/* NONLINEAR 3D TELESCOPING CROWN EXTRUSION */}
          <div
            style={{
              position: "absolute",
              top: -crownExtrusion,
              left: 20,
              right: 20,
              height: crownExtrusion,
              backgroundColor: "#2E3A4D",
              borderLeft: `2px solid ${CADMIUM_CORE}`,
              borderRight: `2px solid ${CADMIUM_CORE}`,
              borderTop: `3px solid #FFF`,
              borderRadius: "6px 6px 0 0",
              boxShadow: "0 0 25px rgba(255, 85, 0, 0.6)",
              display: crownExtrusion > 5 ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: "2px", color: CADMIUM_CORE }}>
              APEX_BENCHMARK
            </div>
          </div>

          {/* Internal Plinth Body (Clipped at boundaries) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: TITANIUM_FACE,
              borderLeft: `2px solid ${TITANIUM_BEVEL}`,
              borderRight: `2px solid ${TITANIUM_BEVEL}`,
              borderTop: `4px solid ${h3 > 10 ? CADMIUM_CORE : TITANIUM_RIM}`,
              borderRadius: "10px 10px 0 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow:
                h3 > 10
                  ? `0 -25px 80px rgba(255, 85, 0, 0.5), 0 30px 60px rgba(0,0,0,0.95)`
                  : "0 10px 20px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* Top Hydraulic Accent Cap */}
            <div
              style={{
                width: "100%",
                height: 16,
                backgroundColor: h3 > 10 ? "rgba(255, 85, 0, 0.25)" : "rgba(255,255,255,0.03)",
                borderBottom: `1px solid ${TITANIUM_BEVEL}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 65, height: 3, backgroundColor: CADMIUM_CORE, opacity: h3 > 10 ? 1 : 0.3 }} />
            </div>

            {/* Numeral Cut-Out Shutter Chamber */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 110,
                marginTop: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                opacity: Math.max(0, Math.min(1, (h3 - 10) / 25)),
              }}
            >
              <div
                style={{
                  fontSize: 98,
                  fontWeight: 900,
                  color: TEXT_WHITE,
                  textShadow: "0 0 50px rgba(255, 85, 0, 0.95)",
                  letterSpacing: "-3px",
                }}
              >
                ۱۳۰
              </div>

              {/* Sliding Shutter */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: TITANIUM_SIDE,
                  borderBottom: `2px solid ${CADMIUM_CORE}`,
                  transform: `translateY(${shutterProg3 * 100}%)`,
                  transition: "transform 0.05s linear",
                }}
              />
            </div>

            {/* Degree Tier Label */}
            <div
              style={{
                marginTop: 12,
                fontSize: 24,
                fontWeight: 900,
                color: h3 > 10 ? CADMIUM_CORE : TEXT_MUTED,
                letterSpacing: "0.5px",
                opacity: Math.max(0, Math.min(1, (h3 - 15) / 25)),
              }}
            >
              {sanitizeForDisplay("دکترای تخصصی")}
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                fontWeight: 600,
                color: TEXT_MUTED,
                opacity: Math.max(0, Math.min(1, (h3 - 20) / 25)),
              }}
            >
              {sanitizeForDisplay("PhD // دستیاری تخصصی بالینی")}
            </div>

            {/* Flank Rulers */}
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 30,
                bottom: 20,
                width: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: 0.45,
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`p3-tick-${i}`} style={{ width: i % 2 === 0 ? 6 : 3, height: 1, backgroundColor: "#FFF" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* PERSISTENT TOP EDITORIAL HEADER & TELEMETRY BEAM                      */}
      {/* ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: TEXT_MUTED,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: h3 > 10 ? CADMIUM_CORE : h2 > 10 ? CYAN_ACCENT : AMBER_TELEMETRY,
              boxShadow: `0 0 10px ${h3 > 10 ? CADMIUM_CORE : h2 > 10 ? CYAN_ACCENT : AMBER_TELEMETRY}`,
            }}
          />
          <span>{sanitizeForDisplay("دانشگاه علوم پزشکی بقیه‌الله (عج) // کمیته تحقیقات دانشجویی")}</span>
        </div>
        <div style={{ color: h3 > 10 ? CADMIUM_CORE : h2 > 10 ? CYAN_ACCENT : AMBER_TELEMETRY, fontWeight: 800 }}>
          {frame < 130
            ? sanitizeForDisplay("بررسی حدنصاب‌های قبولی مقاطع")
            : frame < 240
            ? sanitizeForDisplay("سطح یک: مقطع کارشناسی (۶۵ امتیاز)")
            : frame < 350
            ? sanitizeForDisplay("سطح دو: پزشکی عمومی (۱۱۰ امتیاز)")
            : sanitizeForDisplay("سطح سه: دکترای تخصصی (۱۳۰ امتیاز)")}
        </div>
      </div>
    </div>
  );
};
