# V13 — EDITORIAL DESIGN SYSTEM & VISUAL IDENTITY

## 1. Design Philosophy
The V13 Editorial Design System establishes a dignified, prestigious visual identity for Iranian institutional and medical academic motion graphics. Inspired by the strict layout discipline of `video-talkcraft` and the modular motion cards of `video-shotcraft`, it treats motion as behavior, style as skin, and content as truth.

---

## 2. Palette & Tonal Hierarchy

| Token | Value | Role & Usage |
| :--- | :--- | :--- |
| **Stage Background** | `#07090E` | Deep architectural obsidian base ensuring pure OLED contrast. |
| **Card Surface** | `rgba(15, 23, 42, 0.75)` | Matte slate plinth with subtle glassmorphic diffusion. |
| **Primary Typography** | `#F8FAFC` | Crisp off-white headline text (Yekan Bakh / Vazirmatn). |
| **Secondary Typography** | `#94A3B8` | Soft slate institutional subtitles and formal context labels. |
| **Cyan Accent (Authority)**| `#0284C7` / `#38BDF8` | Legal citations, datum lines, milestone gauges, and structural frames. |
| **Amber Accent (Impact)** | `#F59E0B` | Hero keyword highlights, monumental numerals, and active motive batons. |
| **Emerald Accent (Approval)**| `#10B981` | Disciplinary clearance seals, Master degree plinths, and heraldic laurels. |
| **Crimson Accent (Cutoff)** | `#EF4444` | 1-year deadline expiry gate and temporal cutoff limit. |

---

## 3. Persian Typography Rules
- **Font Families:** `Vazirmatn`, `Yekan Bakh`, `system-ui, sans-serif`.
- **Direction:** `rtl` strictly enforced across all layout containers.
- **Hierarchy:**
  - Hero Monoliths: `72px - 96px`, Weight `900`
  - Shot Headlines: `46px - 50px`, Weight `800`
  - Subtitles & Articles: `28px - 32px`, Weight `600` - `700`
  - Supporting Editorial Text: `16px - 18px`, Weight `500`
  - Institutional Metadata: `13px - 14px`, Weight `500` - `600`
- **Zero Latin Leakage:** Zero English words, Latin telemetry, or HUD debug labels allowed on screen.

---

## 4. Layout Discipline & Safe Zones
- **Safe Margins:** Top: 60px, Bottom: 60px, Left: 100px, Right: 100px.
- **12-Column Grid:** Usable width: 1720px across 12 equal columns with 24px gutters.
- **Whitespace Anchors:** Every composition maintains generous uncrowded margins; empty space is intentional breathing room.
- **No Overcrowding:** Strict motion density budget ($1$ primary actor, $\le 2$ secondary actors, $0$ decorative actors).
