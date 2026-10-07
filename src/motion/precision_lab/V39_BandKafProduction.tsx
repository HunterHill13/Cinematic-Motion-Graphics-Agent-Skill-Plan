/**
 * ============================================================================
 * V39 FULL VIDEO PRODUCTION — "BAND K // EXCEPTIONAL TALENTS"
 * ============================================================================
 * Student Research Committee of Baqiyatallah University of Medical Sciences (BMSU)
 * Complete End-to-End Production:
 * - Native Persian Neural Voiceover (fa-IR-FaridNeural)
 * - Direction-Engineered Science Theme with Sidechain Ducking
 * - Frame-Accurate Cinematic SFX (Hits, Swooshes, Snaps, Pops)
 * - Architectural Kinetic Motion Design (Concept A: Citadel & Kinetic Pedestals)
 * - 11 Seamless Semantic Acts strictly aligned with spoken prosody
 * - Resolution: 1920x1080 @ 30fps (2755 Frames / 91.82s)
 * ============================================================================
 */

import React from "react";
import {
  Audio,
  interpolate,
  useCurrentFrame,
  Easing,
  staticFile,
} from "remotion";

export const V39_BandKafProduction: React.FC = () => {
  const frame = useCurrentFrame();

  const W = 1920;
  const H = 1080;
  const CX = W / 2;
  const CY = H / 2;

  // =========================================================================
  // COLOR SYSTEM (Direction C: High-Contrast Contemporary Scientific)
  // =========================================================================
  const BG_COLOR = "#080A0F";
  const TITANIUM_FACE = "#2C374A";
  const TITANIUM_RIM = "#516482";
  const FLANK_FILL = "#212A38";
  const FLANK_SHADOW = "#111620";
  const ACCENT_ORANGE = "#FF5500";
  const ACCENT_AMBER = "#F59E0B";
  const ACCENT_TEAL = "#06B6D4";
  const ACCENT_GREEN = "#10B981";
  const TEXT_WHITE = "#FFFFFF";
  const TEXT_MUTED = "#94A3B8";
  const GRID_LINE = "#141924";

  // =========================================================================
  // ACT BOUNDARY LOGIC & TRANSITIONS (From timing.json)
  // =========================================================================
  // Act 1: Intro (15 - 232)
  // Act 2: Hook (248 - 471)
  // Act 3: Framework (487 - 781)
  // Act 4: Gate (797 - 971)
  // Act 5: Condition 1 (987 - 1162)
  // Act 6: Condition 2 (1178 - 1386)
  // Act 7: Condition 3 (1402 - 1712)
  // Act 8: Notice (1729 - 1994)
  // Act 9: Threshold Intro (2010 - 2166)
  // Act 10: Thresholds 65/110/130 (2182 - 2506)
  // Act 11: CTA (2522 - 2755)

  // Global Camera Drift
  const camDriftX = Math.sin(frame * 0.015) * 6;
  const camDriftY = Math.cos(frame * 0.012) * 4;

  return (
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: BG_COLOR,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Vazirmatn', 'Shabnam', 'IRANSans', system-ui, sans-serif",
        color: TEXT_WHITE,
        direction: "rtl",
      }}
    >
      {/* 1. MASTER SYNCHRONIZED AUDIO TRACK (VO + Ducked Music + SFX) */}
      <Audio src={staticFile("audio/v39_master_mix.mp3")} />

      {/* 2. ARCHITECTURAL CALIBRATION GRID & BACKGROUND TELEMETRY */}
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
          <filter id="v39-drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="24" stdDeviation="30" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Horizontal datum rulers */}
        {Array.from({ length: 9 }).map((_, i) => {
          const rowY = 120 + i * 110;
          return (
            <g key={`v39-grid-${i}`}>
              <line x1={80} y1={rowY} x2={W - 80} y2={rowY} stroke={GRID_LINE} strokeWidth={1} opacity={0.65} />
              <text x={W - 60} y={rowY + 4} fill="#475569" fontSize={8} fontWeight={700} letterSpacing="1px" textAnchor="end">
                {`DATUM_${String(i + 1).padStart(2, "0")}`}
              </text>
            </g>
          );
        })}

        {/* Coordinate Crosshairs */}
        <line x1={CX} y1={80} x2={CX} y2={H - 80} stroke={GRID_LINE} strokeWidth={1} strokeDasharray="4 8" opacity={0.5} />
        <circle cx={CX} cy={CY} r={340} fill="none" stroke={GRID_LINE} strokeWidth={1} strokeDasharray="3 6" opacity={0.4} />
      </svg>

      {/* ===================================================================== */}
      {/* ACT 1: PRESENTATION & INSTITUTIONAL SEAL (Frames 15 - 232)            */}
      {/* ===================================================================== */}
      {frame >= 0 && frame < 248 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [0, 25, 220, 245], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `translate(${camDriftX}px, ${camDriftY}px)`,
          }}
        >
          {/* Institutional Heraldic Seal Emblem */}
          <div
            style={{
              position: "relative",
              width: 170,
              height: 170,
              marginBottom: 36,
              transform: `scale(${interpolate(frame, [15, 60], [0.8, 1], { easing: Easing.bezier(0.2, 0.9, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
            }}
          >
            {/* Outer Rotating Measurement Ring */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px dashed ${ACCENT_AMBER}`,
                transform: `rotate(${frame * 0.4}deg)`,
              }}
            />
            {/* Inner Titanium Core */}
            <div
              style={{
                position: "absolute",
                inset: 18,
                borderRadius: "50%",
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${TITANIUM_RIM}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 35px rgba(245, 158, 11, 0.25)`,
              }}
            >
              {/* Cadmium Monogram Center */}
              <div style={{ fontSize: 44, fontWeight: 900, color: ACCENT_ORANGE }}>
                ب
              </div>
            </div>
          </div>

          {/* Institutional Typography Lockup */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: "1px",
              color: TEXT_WHITE,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            دانشگاه علوم پزشکی بقیةالله (عج)
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: ACCENT_AMBER,
              letterSpacing: "1.5px",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            کمیته تحقیقات و فناوری دانشجویی
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "3px",
              color: TEXT_MUTED,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              padding: "6px 24px",
              borderRadius: 20,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            روابط عمومی تقدیم می‌کند
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 2: THE HOOK / ASPIRATIONAL QUESTION (Frames 248 - 471)             */}
      {/* ===================================================================== */}
      {frame >= 240 && frame < 480 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [245, 265, 455, 478], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {/* Question Headline */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: TEXT_MUTED,
              marginBottom: 36,
              transform: `translateY(${interpolate(frame, [248, 270], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            آیا می‌دانید چگونه می‌توانید انتخاب شوید؟
          </div>

          {/* Dual Branching Monolith Cards */}
          <div style={{ display: "flex", gap: 50, marginBottom: 40 }}>
            {/* Card 1: پژوهشگر برجسته */}
            <div
              style={{
                width: 380,
                height: 220,
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${TITANIUM_RIM}`,
                borderRadius: 16,
                padding: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                transform: `translateX(${interpolate(frame, [255, 285], [-40, 0], { easing: Easing.bezier(0.2, 0.9, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            >
              <div style={{ fontSize: 18, color: ACCENT_AMBER, fontWeight: 700, marginBottom: 12 }}>
                مَسیرِ عِلمی
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: TEXT_WHITE }}>
                دانشجوی پژوهشگر
              </div>
              <div style={{ fontSize: 20, color: ACCENT_ORANGE, fontWeight: 800, marginTop: 8 }}>
                بَرجَستهیِ کِشوَر
              </div>
            </div>

            {/* Card 2: فناور برجسته */}
            <div
              style={{
                width: 380,
                height: 220,
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${TITANIUM_RIM}`,
                borderRadius: 16,
                padding: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                transform: `translateX(${interpolate(frame, [265, 295], [40, 0], { easing: Easing.bezier(0.2, 0.9, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            >
              <div style={{ fontSize: 18, color: ACCENT_TEAL, fontWeight: 700, marginBottom: 12 }}>
                مَسیرِ نَوآوَری
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: TEXT_WHITE }}>
                دانشجویِ فَنّاوَر
              </div>
              <div style={{ fontSize: 20, color: ACCENT_ORANGE, fontWeight: 800, marginTop: 8 }}>
                بَرجَستهیِ کِشوَر
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 3: FRAMEWORK DEFINITION — "BAND K" (Frames 487 - 781)              */}
      {/* ===================================================================== */}
      {frame >= 480 && frame < 790 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [485, 510, 765, 788], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              width: 900,
              backgroundColor: TITANIUM_FACE,
              border: `2px solid ${TITANIUM_RIM}`,
              borderRadius: 20,
              padding: "50px 60px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              gap: 50,
            }}
          >
            {/* Monumental 'K' Badge */}
            <div
              style={{
                width: 150,
                height: 150,
                backgroundColor: BG_COLOR,
                border: `3px solid ${ACCENT_ORANGE}`,
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 40px rgba(255, 85, 0, 0.3)`,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: TEXT_MUTED }}>دستورالعمل</div>
              <div style={{ fontSize: 58, fontWeight: 900, color: ACCENT_ORANGE }}>کاف</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: ACCENT_AMBER }}>ماده ۲</div>
            </div>

            {/* Legal Specification */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: TEXT_WHITE, marginBottom: 12 }}>
                آیین‌نامه استعدادهای درخشان
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: ACCENT_AMBER, marginBottom: 16 }}>
                وزارت بهداشت، درمان و آموزش پزشکی
              </div>
              <div style={{ fontSize: 16, color: TEXT_MUTED, lineHeight: "28px" }}>
                مسیر جامع، دقیق و شفافِ امتیازدهی به تمام فعالیت‌های آموزشی، پژوهشی و فناورانه شما.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 4: THE 3 PRE-CONDITIONS PIVOT GATE (Frames 797 - 971)              */}
      {/* ===================================================================== */}
      {frame >= 790 && frame < 980 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [795, 815, 960, 978], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "3px",
              color: ACCENT_ORANGE,
              backgroundColor: "rgba(255, 85, 0, 0.1)",
              padding: "6px 20px",
              borderRadius: 20,
              border: `1px solid ${ACCENT_ORANGE}`,
              marginBottom: 24,
            }}
          >
            پیش‌نیازهای اجباری
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: TEXT_WHITE, marginBottom: 20 }}>
            اَمّا قَبل از مُحاسِبِهیِ اِمتیازها
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT_AMBER }}>
            ۳ شَرطِ اَصلی و جود دارَد
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 5: CONDITION 1 — MINIMUM GPA 16 (Frames 987 - 1162)                */}
      {/* ===================================================================== */}
      {frame >= 980 && frame < 1170 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 80,
            opacity: interpolate(frame, [985, 1005, 1145, 1168], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {/* Vertical Architectural Gauge */}
          <div
            style={{
              width: 140,
              height: 400,
              backgroundColor: TITANIUM_FACE,
              border: `2px solid ${TITANIUM_RIM}`,
              borderRadius: 24,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Liquid Fill Level */}
            <div
              style={{
                width: "100%",
                height: `${interpolate(frame, [1000, 1070], [0, 80], { easing: Easing.bezier(0.18, 1, 0.28, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                backgroundColor: ACCENT_ORANGE,
                boxShadow: `0 0 30px ${ACCENT_ORANGE}`,
                transition: "height 0.1s ease",
              }}
            />
            {/* Gauge Threshold Indicator */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: 0,
                right: 0,
                borderTop: "2px dashed #FFFFFF",
              }}
            />
          </div>

          {/* Condition Text & Number */}
          <div style={{ maxWidth: 600 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: ACCENT_ORANGE, marginBottom: 12 }}>
              شَرطِ اَوَّل
            </div>
            <div style={{ fontSize: 72, fontWeight: 900, color: TEXT_WHITE, lineHeight: "80px", marginBottom: 16 }}>
              مُعَدَّل ۱۶
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: ACCENT_AMBER, lineHeight: "36px" }}>
              حداقل معدل کل شما در مقطع فعلی باید ۱۶ باشد.
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 6: CONDITION 2 — VALID DURATION & DISCIPLINARY CLEARANCE (1178-1386) */}
      {/* ===================================================================== */}
      {frame >= 1170 && frame < 1395 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1175, 1200, 1370, 1392], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 800, color: ACCENT_ORANGE, marginBottom: 28 }}>
            شَرطِ دُوُّم
          </div>
          <div style={{ display: "flex", gap: 50 }}>
            {/* Verification Pillar 1 */}
            <div
              style={{
                width: 400,
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${TITANIUM_RIM}`,
                borderRadius: 20,
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 44, color: ACCENT_AMBER, marginBottom: 16 }}>⏳</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: TEXT_WHITE, marginBottom: 10 }}>
                سنوات مجاز تحصیلی
              </div>
              <div style={{ fontSize: 16, color: TEXT_MUTED }}>عدم ورود به سنوات غیرمجاز ترمی</div>
            </div>

            {/* Verification Pillar 2 */}
            <div
              style={{
                width: 400,
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${TITANIUM_RIM}`,
                borderRadius: 20,
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 44, color: ACCENT_GREEN, marginBottom: 16 }}>✓</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: TEXT_WHITE, marginBottom: 10 }}>
                تأییدیه کمیته انضباطی
              </div>
              <div style={{ fontSize: 16, color: TEXT_MUTED }}>عدم سوءپیشینه انضباطی دانشگاه</div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 7: CONDITION 3 — 6 ARTICLES & PAPER REQUIREMENT (1402 - 1712)     */}
      {/* ===================================================================== */}
      {frame >= 1395 && frame < 1720 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 70,
            opacity: interpolate(frame, [1400, 1425, 1695, 1718], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {/* 6-Facet Geometric Ring */}
          <div
            style={{
              position: "relative",
              width: 320,
              height: 320,
            }}
          >
            {Array.from({ length: 6 }).map((_, idx) => {
              const angle = (idx * 60) * (Math.PI / 180);
              const px = 160 + Math.cos(angle) * 110 - 32;
              const py = 160 + Math.sin(angle) * 110 - 32;
              return (
                <div
                  key={`act7-slot-${idx}`}
                  style={{
                    position: "absolute",
                    top: py,
                    left: px,
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: TITANIUM_FACE,
                    border: `2px solid ${ACCENT_AMBER}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 900,
                    color: TEXT_WHITE,
                    boxShadow: "0 0 15px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  {idx + 1}
                </div>
              );
            })}
            {/* Center Core */}
            <div
              style={{
                position: "absolute",
                top: 110,
                left: 110,
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: ACCENT_ORANGE,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: TEXT_WHITE,
                fontWeight: 900,
                fontSize: 14,
                boxShadow: "0 0 30px rgba(255, 85, 0, 0.5)",
              }}
            >
              <span>حداقل</span>
              <span style={{ fontSize: 24 }}>۶</span>
              <span>ماده</span>
            </div>
          </div>

          {/* Condition Description */}
          <div style={{ maxWidth: 550 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: ACCENT_ORANGE, marginBottom: 12 }}>
              شَرطِ سِوُّم
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: TEXT_WHITE, marginBottom: 16 }}>
              کسب امتیاز از ۶ ماده مختلف
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 85, 0, 0.15)",
                border: `2px solid ${ACCENT_ORANGE}`,
                borderRadius: 12,
                padding: "16px 24px",
                fontSize: 20,
                fontWeight: 800,
                color: ACCENT_AMBER,
                lineHeight: "32px",
              }}
            >
              ⚠️ حضور مقاله علمی یا فعالیت فناورانه در این امتیازها اجباری است!
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 8: DOCUMENT VALIDITY TIME HORIZON (Frames 1729 - 1994)             */}
      {/* ===================================================================== */}
      {frame >= 1720 && frame < 2000 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1725, 1750, 1980, 1998], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: ACCENT_ORANGE,
              backgroundColor: "rgba(255, 85, 0, 0.1)",
              padding: "6px 24px",
              borderRadius: 20,
              border: `1px solid ${ACCENT_ORANGE}`,
              marginBottom: 24,
            }}
          >
            نکته بسیار مهم
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: TEXT_WHITE, marginBottom: 28 }}>
            دِقَّت کُنید! مَحدودِیَّتِ زَمانیِ مَدارِک
          </div>

          {/* Timeline Horizon Beam */}
          <div
            style={{
              width: 900,
              backgroundColor: TITANIUM_FACE,
              border: `2px solid ${TITANIUM_RIM}`,
              borderRadius: 16,
              padding: "36px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, color: TEXT_MUTED }}>دوران تحصیل</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: ACCENT_GREEN, marginTop: 8 }}>✓ کاملاً معتبر</div>
            </div>
            <div style={{ fontSize: 32, color: TEXT_MUTED }}>──────►</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, color: TEXT_MUTED }}>تاریخ فارغ‌التحصیلی</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: ACCENT_AMBER, marginTop: 8 }}>نقطه عطف</div>
            </div>
            <div style={{ fontSize: 32, color: TEXT_MUTED }}>──────►</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, color: TEXT_MUTED }}>حداکثر سقف مجاز</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: ACCENT_ORANGE, marginTop: 8 }}>تا ۱ سال بعد</div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 9 & 10: SCORE THRESHOLDS — 65 / 110 / 130 (Frames 2010 - 2506)    */}
      {/* ===================================================================== */}
      {frame >= 2000 && frame < 2515 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [2005, 2030, 2490, 2512], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT_AMBER, marginBottom: 12 }}>
            حَدِّنِصابِ قَبولی بَستِه به مَقطَع
          </div>
          <div style={{ fontSize: 36, fontWeight: 900, color: TEXT_WHITE, marginBottom: 50 }}>
            امتیازهای لازم جهت انتخاب دانشجوی برجسته
          </div>

          {/* Three Ascending Stepped 3D Pedestals */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40, height: 380 }}>
            {/* Pedestal 1: Bachelor (65 Points) */}
            <div
              style={{
                width: 280,
                height: interpolate(frame, [2170, 2220], [0, 240], { easing: Easing.bezier(0.2, 0.9, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${TITANIUM_RIM}`,
                borderRadius: "16px 16px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 24,
                boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 56, fontWeight: 900, color: TEXT_WHITE }}>۶۵</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: ACCENT_AMBER, marginTop: 8 }}>کارشناسی</div>
              <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 4 }}>دانشگاه‌های تیپ یک</div>
            </div>

            {/* Pedestal 2: General Medicine (110 Points) */}
            <div
              style={{
                width: 280,
                height: interpolate(frame, [2320, 2370], [0, 310], { easing: Easing.bezier(0.2, 0.9, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${TITANIUM_RIM}`,
                borderRadius: "16px 16px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 24,
                boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 56, fontWeight: 900, color: ACCENT_AMBER }}>۱۱۰</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: ACCENT_AMBER, marginTop: 8 }}>پزشکی عمومی</div>
              <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 4 }}>دکتری عمومی / داروسازی</div>
            </div>

            {/* Pedestal 3: PhD / Specialty (130 Points) */}
            <div
              style={{
                width: 280,
                height: interpolate(frame, [2410, 2460], [0, 380], { easing: Easing.bezier(0.2, 0.9, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                backgroundColor: TITANIUM_FACE,
                border: `2px solid ${ACCENT_ORANGE}`,
                borderRadius: "16px 16px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 24,
                boxShadow: `0 0 45px rgba(255, 85, 0, 0.3)`,
                position: "relative",
              }}
            >
              <div style={{ fontSize: 62, fontWeight: 900, color: ACCENT_ORANGE }}>۱۳۰</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: ACCENT_ORANGE, marginTop: 8 }}>دکترای تخصصی</div>
              <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 4 }}>PhD / دستیاری تخصصی</div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ACT 11: CALL-TO-ACTION & CONTINUATION PROMISE (Frames 2522 - 2755)    */}
      {/* ===================================================================== */}
      {frame >= 2515 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [2518, 2545], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: ACCENT_AMBER,
              marginBottom: 20,
              letterSpacing: "1px",
            }}
          >
            ادامه دارد ...
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: TEXT_WHITE, marginBottom: 20, textAlign: "center" }}>
            در ویدیوهای بعدی، روش کسب این امتیازها را<br />گام‌به‌گام بررسی می‌کنیم.
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: ACCENT_ORANGE,
              marginBottom: 40,
            }}
          >
            با ما همراه باشید!
          </div>

          {/* Institutional Contact Bar */}
          <div
            style={{
              backgroundColor: TITANIUM_FACE,
              border: `2px solid ${TITANIUM_RIM}`,
              borderRadius: 30,
              padding: "16px 40px",
              display: "flex",
              alignItems: "center",
              gap: 30,
              fontSize: 16,
              fontWeight: 700,
              color: TEXT_WHITE,
            }}
          >
            <span>کمیته تحقیقات دانشگاه علوم پزشکی بقیةالله (عج)</span>
            <span style={{ color: ACCENT_AMBER }}>//</span>
            <span>SRC_BMSU</span>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* PERSISTENT TOP EDITORIAL HEADER & PROGRESS TRACKER                    */}
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
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: ACCENT_ORANGE }} />
          <span>کمیته تحقیقات دانشگاه علوم پزشکی بقیةالله (عج)</span>
        </div>
        <div>
          {frame < 248
            ? "معرفی"
            : frame < 480
            ? "مقدمه و پرسش"
            : frame < 790
            ? "دستورالعمل بند کاف"
            : frame < 980
            ? "سه شرط اصلی"
            : frame < 1170
            ? "شرط ۱: معدل ۱۶"
            : frame < 1395
            ? "شرط ۲: سنوات و انضباطی"
            : frame < 1720
            ? "شرط ۳: ۶ ماده مختلف"
            : frame < 2000
            ? "مهلت مدارک"
            : frame < 2515
            ? "حدنصاب‌های قبولی"
            : "پایان"}
        </div>
      </div>
    </div>
  );
};
