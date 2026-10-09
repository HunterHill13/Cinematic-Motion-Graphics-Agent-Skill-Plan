# V15 DESIGN SYSTEM SPECIFICATION

## Director-Led, Content-Locked Editorial Motion Design System

---

### 1. CORE PHILOSOPHY & DUAL-LAYER SEPARATION

```
┌────────────────────────────────────────────────────────┐
│               CONTENT LAYER (LOCKED)                   │
│   • Exact words from tts_input.txt                     │
│   • Immutable Persian script typography               │
│   • Zero invented labels, zero background text         │
│   • Display text: 100% clean orthography (0 diacritics)│
│   • TTS text: Isolated phonetized dictionary           │
└────────────────────────────────────────────────────────┘
                            ▲
                            │ Anchored To
                            ▼
┌────────────────────────────────────────────────────────┐
│               DESIGN LAYER (DIRECTOR-LED)              │
│   • 7-Layer Budget Hierarchy (L0 to L6, max 6 active)  │
│   • Pure non-textual geometry and architectural forms  │
│   • Precision 12-column grid and safe margins          │
│   • Motivated camera curves (Single-Curve Grammar)     │
│   • Causal secondary motion (Primary -> Secondary)     │
│   • Idle breathing micro-motion (1.5% scale @ 0.33Hz)  │
│   • Deterministic sound-design anchors (-14 to -22dB)  │
└────────────────────────────────────────────────────────┘
```

---

### 2. THE 7-LAYER BUDGET HIERARCHY

To prevent visual overload and AI-template clutter, every element belongs to one of seven discrete layers. At no point may all seven layers be active simultaneously at full opacity (Hard Ceiling: $\le 6$ active layers).

| Layer ID | Layer Name (FA) | Dominance / Max Opacity | Role & Architectural Function |
| :--- | :--- | :--- | :--- |
| **L0_Background** | لایه بوم پس‌زمینه | $1.00$ ($60\%$ negative space) | Deep obsidian void canvas (`#07090E`). Restful, stable ground. |
| **L1_Atmosphere** | لایه اتمسفر و نورپردازی | $0.15$ | Ultra-subtle radial golden glow drifts (`rgba(212,175,55, 0.06-0.10)`). |
| **L2_Structure** | لایه هندسه ساختاری | $0.40$ | 90px vector grid lines, quadrant framing brackets, datum axis rules. |
| **L3_PrimarySubject** | لایه سوژه اصلی | $1.00$ | Single hero graphic actor (Medallion, Plinths, Ruler, Crest). |
| **L4_Typography** | لایه تایپوگرافی رسمی | $1.00$ | Authorized Persian text hierarchy (Vazirmatn weight contrast). |
| **L5_SecondaryReaction** | لایه واکنش ثانویه سببی | $0.85$ | Delayed shockwave ripples, status locks, acoustic impact glows. |
| **L6_TransitionCarrier** | لایه حامل ترنزیشن OneTake | $1.00$ | Kinetic ray handoff, fission nodes, axis collapse, singularity. |

---

### 3. COLOR & MATERIALS TOKENS

| Token Name | Hex / RGBA Value | Purpose & Design Justification |
| :--- | :--- | :--- |
| `BG_VOID_OBSIDIAN` | `#07090E` | Deep obsidian backdrop providing maximum editorial contrast. |
| `GOLD_CORE_PRIMARY`| `#D4AF37` | Institutional gold accentuating primary keyphrases, medals, and rays. |
| `GOLD_GLOW_HALO` | `rgba(212, 175, 55, 0.45)`| Warm atmospheric resonance and impact glows. |
| `CYAN_ELECTRIC` | `#38BDF8` | Informational highlight for secondary status and timeline progress. |
| `RUBY_BARRIER` | `#EF4444` | Cutoff warning and temporal boundary gate. |
| `EMERALD_SUCCESS` | `#10B981` | Qualified status milestone and highest academic tier (PhD). |
| `GLASS_PANEL_BG` | `rgba(15, 23, 42, 0.60)`| Frosted structural monolith cards with backdrop blur. |
| `TEXT_PRIMARY_HERO`| `#FFFFFF` | Crystal-clear, unshadowed hero typography. |
| `TEXT_BODY_SLATE` | `#CBD5E1` | High-legibility Persian body statements. |
| `TEXT_MUTED_LABEL` | `#94A3B8` | Subdued secondary labels. |

---

### 4. TYPOGRAPHY & SAFE MARGINS

- **Font Family:** `Vazirmatn, system-ui, sans-serif`
- **Direction:** `rtl` (Native Right-to-Left bidirectional layout)
- **Hierarchy:**
  - Hero Keyphrase: $56\text{px} - 68\text{px}$, Weight $900$, Line Height $1.3$
  - Section Titles: $34\text{px} - 40\text{px}$, Weight $800$, Line Height $1.4$
  - Metric Numbers: $46\text{px} - 60\text{px}$, Weight $900$, Line Height $1.0$
  - Body Explanations: $20\text{px} - 24\text{px}$, Weight $500$, Line Height $1.6$
  - Milestone Labels: $14\text{px} - 16\text{px}$, Weight $700$
- **Safe Zones:**
  - Action Safe: $1800 \times 1012$ (Margin: $60\text{px}$ X, $34\text{px}$ Y)
  - Title Safe: $1680 \times 945$ (Margin: $120\text{px}$ X, $68\text{px}$ Y)
  - Production Margin: Content is centered within $X \in [140\text{px}, 1780\text{px}]$

---

### 5. MOTION DYNAMICS & SECONDARY CAUSALITY

1. **Idle Breathing Micro-Motion:**
   - Applied to stationary hero elements (Medallions, Columns, Plinths, Crest).
   - Frequency: $0.33\text{ Hz}$ ($90\text{ frames}$ period @ $30\text{ FPS}$).
   - Amplitude: $\pm 1.5\%$ scale ($0.985 - 1.015$), $\pm 2\text{px}$ Y drift.
   - Purpose: Keeps the scene alive without distracting from reading.

2. **Causal Secondary Reaction:**
   - Chain: `Primary Impact (f0)` $\to$ `Secondary Reaction (f0 + 3f)` $\to$ `Environmental Dissipation (f0 + 24f)`.
   - Applied to: Halo expansions, golden shockwave borders, bracket flashes.
   - Damping: Smooth cubic bezier ease-out.

3. **Sound-Design Synchrony:**
   - Major kinetic impacts (keyword strike, seal stamp, pillar landing) are synchronized at $\Delta = 0\text{ frames}$ with dedicated SFX markers ducked under narration.
