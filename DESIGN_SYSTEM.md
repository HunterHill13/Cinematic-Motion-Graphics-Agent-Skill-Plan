# DESIGN_SYSTEM.md — Cinematic Motion Graphics Design System

Official Design System Specification for the **Cinematic Motion Graphics Agent Skill**.
Designed for 16:9 YouTube landscape (1920×1080 @ 30 FPS) educational, scientific, institutional, and documentary explainers.

---

## 1. Color System

A controlled, restrained palette preventing arbitrary color invention across shots.

| Token | Hex Value | Semantic Role |
|---|---|---|
| `bg.canvas` | `#040711` | Primary deep navy cosmic canvas |
| `bg.elevated` | `rgba(8, 16, 34, 0.85)` | Glassmorphism architectural panels |
| `bg.surface` | `rgba(15, 23, 42, 0.65)` | Embedded sub-cards & metric containers |
| `border.subtle` | `rgba(255, 255, 255, 0.08)` | Structural dividers & inactive borders |
| `border.focus` | `rgba(56, 189, 248, 0.35)` | Active selection highlight |
| `text.primary` | `#F8FAFC` | Main headings & key metric values |
| `text.secondary` | `#94A3B8` | Body explanations & contextual descriptions |
| `text.muted` | `#64748B` | Footnotes, captions & metadata labels |
| `accent.cyan` | `#38BDF8` | Scientific focus, pathways & primary energetic cues |
| `accent.gold` | `#D4AF37` | Institutional prestige, ministerial decrees, badges |
| `accent.emerald` | `#10B981` | Verification, passing thresholds, positive achievements |
| `accent.amber` | `#F59E0B` | Time constraints, legal deadlines, urgent notices |

---

## 2. Typography System

Root font: **Yekan Bakh** (official Persian type system) with Apple System / Vazirmatn fallback.

| Token | Size (px) | Weight | Line Height | Usage |
|---|---|---|---|---|
| `type.display` | 52px | 900 (Black) | 1.35 | Main hook questions, hero titles |
| `type.h1` | 44px–48px | 900 (Black) | 1.30 | Section decrees, shot core headlines |
| `type.h2` | 28px–32px | 800 (ExtraBold) | 1.30 | Card titles, monolith headers |
| `type.body` | 18px–20px | 400 (Regular) / 500 | 1.60 | Explanatory text, legal regulations |
| `type.eyebrow` | 14px–16px | 700 (Bold) | 1.00 | Pill tags, ministerial headers |
| `type.number` | 64px | 900 (Monospace/Black) | 1.00 | Quantitative thresholds (65, 110, 130) |

* **Direction:** Strict Right-to-Left (`direction: rtl`).
* **Safe Margins:** 80px left/right horizontal boundary, 60px top/bottom vertical boundary.

---

## 3. Spacing System

| Token | Value (px) | Usage |
|---|---|---|
| `space.xs` | 8px | Tag padding, icon gaps |
| `space.sm` | 16px | Title-to-eyebrow spacing, badge margins |
| `space.md` | 24px | Card internal padding, flex gaps |
| `space.lg` | 32px | Inter-card gap in 3-column layouts |
| `space.xl` | 48px–60px | Header-to-content vertical spacing |
| `space.xxl` | 80px–120px | Main layout horizontal inset |

---

## 4. Radius System

| Token | Value | Usage |
|---|---|---|
| `radius.sm` | 8px | Progress bar tracks, small badges |
| `radius.md` | 16px | Metric sub-boxes, calendar badges |
| `radius.lg` | 24px | Monolith columns, architectural panels |
| `radius.pill` | 999px | Status tags, institutional eyebrow pills |
| `radius.circle` | 50% | Emblems, seal nodes, status indicators |

---

## 5. Depth & Shadows

* **Panel Drop Shadow:** `0 20px 40px rgba(0, 0, 0, 0.4)`
* **Surface Inset Rim:** `inset 0 1px 0 rgba(255, 255, 255, 0.1)`
* **Glow Accent:** `0 0 16px <ACCENT_COLOR>` (used sparingly on hero indicators).
* **Depth Philosophy:** Restrained editorial layering (Background Matrix -> Structural Calipers & Data Rails -> Typographic Content). Zero excessive 3D skewing.

---

## 6. V6 Anti-UI / True Motion Design Rules
1. **Never default to glass card boxes:** Replace plain card boxes with open negative space, coordinate rails, caliper marks, and kinetic typography.
2. **Numbers are Graphic Anchors:** Quantitative figures (16, 65, 110, 130) must be rendered at 64–72px with animated counters and vector caliper brackets.
3. **Motion Precedes Camera:** All narrative meaning must be told through graphic choreography, line drawing, and shape morphs; camera stays rock-solid at $(960, 540)$ with micro-pushes only on semantic locks.
4. **Physical Object Continuity:** Every outgoing shot must pass a tangible graphic motif (Vector Energy Beam, Caliper Gate, or Seal reticle) into the incoming shot.

