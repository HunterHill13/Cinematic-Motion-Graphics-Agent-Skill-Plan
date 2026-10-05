# V14 DESIGN SYSTEM SPECIFICATION

## Content-Locked Editorial Motion Design System

---

### 1. THE DUAL-LAYER SEPARATION PRINCIPLE

```
┌────────────────────────────────────────────────────────┐
│               CONTENT LAYER (LOCKED)                   │
│   • Exact words from tts_input.txt                     │
│   • Immutable Persian script typography               │
│   • Zero invented labels, zero background text         │
│   • Controlled via src/content/authorizedContent.ts    │
└────────────────────────────────────────────────────────┘
                            ▲
                            │ Anchored To
                            ▼
┌────────────────────────────────────────────────────────┐
│               DESIGN LAYER (CREATIVE)                  │
│   • Pure non-textual geometry and architectural forms  │
│   • Precision 12-column grid and safe margins          │
│   • Metallic bevels, glassmorphism, depth planes       │
│   • Motivated camera curves (Single-Curve Grammar)     │
│   • Physical carry transitions (Object Handoff)        │
└────────────────────────────────────────────────────────┘
```

---

### 2. COLOR & MATERIALS TOKENS

| Token Name | Hex / RGBA Value | Purpose & Design Justification |
| :--- | :--- | :--- |
| `BG_VOID_OBSIDIAN` | `#07090E` | Deep obsidian backdrop providing maximum contrast. |
| `GOLD_CORE_PRIMARY`| `#D4AF37` | Institutional gold accentuating primary keyphrases, medals, and rays. |
| `GOLD_GLOW_HALO` | `rgba(212, 175, 55, 0.45)`| Warm atmospheric resonance and impact glows. |
| `CYAN_ELECTRIC` | `#38BDF8` | Informational highlight for secondary status and timeline progress. |
| `RUBY_BARRIER` | `#EF4444` | Cutoff warning and temporal boundary gate. |
| `EMERALD_SUCCESS` | `#10B981` | Qualified status milestone and highest academic tier (PhD). |
| `GLASS_PANEL_BG` | `rgba(15, 23, 42, 0.60)`| Frosted structural monolith cards with blur. |
| `TEXT_PRIMARY_HERO`| `#FFFFFF` | Crystal-clear, unshadowed hero typography. |
| `TEXT_BODY_SLATE` | `#CBD5E1` | High-legibility Persian body statements. |
| `TEXT_MUTED_LABEL` | `#94A3B8` | Subdued secondary labels. |

---

### 3. TYPOGRAPHY & SAFE MARGINS

- **Font Family:** `Vazirmatn, system-ui, sans-serif`
- **Direction:** `rtl` (Native Right-to-Left bidirectional layout)
- **Hierarchy:**
  - Hero Keyphrase: $56\text{px} - 68\text{px}$, Weight $900$, Line Height $1.3$
  - Section Titles: $34\text{px} - 40\text{px}$, Weight $800$, Line Height $1.4$
  - Metric Numbers: $46\text{px} - 60\text{px}$, Weight $900$, Line Height $1.0$
  - Body Explanations: $20\text{px} - 24\text{px}$, Weight $500$, Line Height $1.6$
  - Milestone Labels: $14\text{px} - 16\text{px}$, Weight $700$
- **Safe Zones:**
  - Action Safe: $1800 \times 1012$ (Left/Right: $60\text{px}$, Top/Bottom: $34\text{px}$)
  - Title Safe: $1680 \times 945$ (Left/Right: $120\text{px}$, Top/Bottom: $68\text{px}$)
  - Production Margin: Content is centered within $X \in [140\text{px}, 1780\text{px}]$

---

### 4. NON-TEXTUAL ARCHITECTURAL COMPANIONS

In V14, visual companions **MUST NOT** contain invented text. Instead, they utilize pure geometric metaphors:
1. **Shot 01 (Opening Hook):** Four $40\text{px} \times 40\text{px}$ quadrant golden architectural corner brackets + golden kinetic underline datum ray.
2. **Shot 02 (Statute Decree):** $130\text{px}$ circular double-ringed gold medallion featuring an abstract balanced scale vector + frosted monolith plaque.
3. **Shot 03 (Three Criteria):** Three symmetrical frosted glass column cards ($320\text{px}$ width) linked by a continuous $1400\text{px}$ gold datum axis. Medallions contain purely non-verbal symbols:
   - Milestone 1: Minimalist caliper / graduation gauge symbol.
   - Milestone 2: Shield / verification check vector.
   - Milestone 3: Research node / scientific atom vector.
4. **Shot 04 (Time Window):** 12-month calendar tick-ruler with luminous progress head + illuminated red barrier gate at Month 12.
5. **Shot 05 (Score Pedestals):** Three monumental rising pedestals with beveled metallic headers, proportional heights ($180\text{px}$, $300\text{px}$, $420\text{px}$).
6. **Shot 06 (Institutional Outro):** Full-scale $170\text{px}$ institutional seal featuring abstract geometric sunburst core, orbiting filigree ring, and dual laurel branches.
