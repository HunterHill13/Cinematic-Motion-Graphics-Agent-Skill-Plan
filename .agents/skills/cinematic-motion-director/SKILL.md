---
name: cinematic-motion-director
description: "AI Video Production Pipeline v21: Choreography 2.0, Semantic Event Graph, Motion Rhythm 2.0, and Institutional Branding System for Remotion and React. Enforces Continuous Visual Causality, 4-tier decoupled workflow (Director -> Shot Plan -> Builder -> Visual Critique), Canvas-First Staging, Settle-Locked Typography (zero subpixel font rasterization shimmer), Reading Hold Camera Pinned Windows, Institutional Identity Integration (Opening PR Logo Sting + Grand Unified University and Research Committee End Card), Voice-First Prosody Dual-Clock Authority, Persian pronunciation lock («بقیه‌الله»), and 13-gate automated QC."
---

# cinematic-motion-director v21

An end-to-end reference-integrated motion graphics engineering system for Google Antigravity + Remotion.
Transforms briefs, scientific research, academic lectures, and scripts into publication-grade cinematic films.

```text
[DIRECTOR]
1. Intake & Semantic Truth Lock (Script / Audio / Source Provenance)
2. Motion Thesis & Frame System (docs/v19_director_shot_plan.md, Color Ramp, Accent Role)
3. Audio Rhythm Grid & Prosody Alignment (Dual-Clock Authority, beats.py)
4. Canvas-First Staging & Choreography Engine (IMPACT, ELASTIC, GLIDE, BUILD, HOLD, RELEASE)
5. Shot Plan Formulation (docs/shotlist.md) → [GATE 1: OK REQUIRED]
        ↓
[BUILDER]
6. Search Before Authoring (V18_MOTION_CATALOG.md & src/motion/choreography/)
7. Composition Assembly (Remotion TSX, Continuous Transformations, Dynamic Camera)
8. Anti-Cliché Physics (Add Shape, Not Word; Zero Card Soup / SaaS Sliders)
        ↓
[VISUAL CRITIQUE]
9. Contact Sheet & Fast Strip Generation (2 fps sheets, 60 fps strips)
10. 8-Criteria Quantitative Scorecard (1-10 with Automatic Caps)
11. Diagnose Before Decorating Loop (≥ 3 Rounds, All Scores ≥ 8)
        ↓
[TECHNICAL QC & DELIVERY]
12. Two-Tier Verification (13 Automated CV & Audio QA Gates)
13. Final Master Render & Stem-Mixed Delivery (EBU R128 -14 LUFS)
```

---

## 1. Core Operating Invariants & Mandates

1. **Decoupled 4-Tier Roles**:
   - **Director**: Owns the concept, visual thesis, beat map, and shotlist. Pauses for explicit approval before code authoring.
   - **Builder**: Implements Remotion TSX strictly following the approved shotlist. Never invents design or text on the fly.
   - **Critic**: Unsentimental review of rendered stills and strips. Scores 8 criteria; enforces automatic caps for defects.
   - **QC Gatekeeper**: Runs automated verification scripts; guarantees zero regressions.

2. **Canvas-First Staging & Anti-UI Ban (V19 Core)**:
   - **Strictly Banned UI Mentalities**: Rounded cards with soft shadows, feature grids, pricing tables, web sliders, dashboard panels, SaaS wrappers, and isolated floating boxes on black voids.
   - **Canvas-First Design**: The 1920×1080 canvas is an architectural plane. Use full-bleed framing rules, typographic scale hierarchies, spatial architectural depths, and connecting coordinate vectors.

3. **Transformation Over Replacement ($A \to B$)**:
   - Do NOT swap elements via opacity fades. Elements physically morph, fold, split, stretch, or guide the eye to the next focal point. Outgoing energy flows directly into incoming form.

4. **Choreography Engine & 6 Motion Personalities**:
   - Every movement is categorized into a physics personality:
     - **IMPACT (2–8f)**: Heavy anticipation, zero dampening overshoot, seismic energy dissipation.
     - **ELASTIC (8–24f)**: Fluid overshoot, secondary follow-through, spring rebound.
     - **GLIDE (30–120f)**: Steady parabolic drift, idle atmospheric energy.
     - **BUILD (45–180f)**: Monumental accumulation, architectural growth.
     - **HOLD**: Dynamic breathing stillness, never dead freeze.
     - **RELEASE (5–30f)**: Explosive fission, snap collapse, or vacuum exit.

5. **Search Before Authoring (Reuse-First Principle)**:
   - Before writing bespoke inline transforms or animation logic, consult `V18_MOTION_CATALOG.md` and `src/motion/choreography/`.
   - Reusable atomic recipes and choreography engines must be composed rather than hand-coded from scratch.

6. **Materiality Restraint & Anti-Cliché Rules**:
   - **Add Shape, Not Word**: Agent may invent geometry, lines, grids, masks, and camera moves, but **NEVER** content, buzzwords, or unverified claims.
   - **Banned Defaults**: Frosted glass panels (`backdrop-filter`), neon glow outlines, blurred floating orbs, arbitrary 3D spheres, and card soup.
   - **True Premium**: Premium motion is weight, anticipation, follow-through, spatial transformation, and motivated camera moves.

7. **Voice-First Prosody Authority & Rhythm Grid**:
   - Spoken audio is the master physical clock (`VOICEOVER = Timing Truth`).
   - Hits lead the beat by 2–4 frames (`spHit` pattern) so visual impact registers synchronously with acoustic transients.
   - Sequential Swaps: Outgoing text is 100% exited before incoming text arrives (zero double-exposure).

6. **Absolute Pronunciation & Content Locking**:
   - Canonical pronunciation for sensitive institutional terms (especially **«بقیه‌الله»**) is locked and immutable via `PersianPronunciationValidator`.
   - Audio loudness strictly complies with EBU R128 ($-14\,\text{LUFS} \pm 0.5$, True Peak $\le -1\,\text{dBTP}$).

---

## 2. Decoupled Role Protocols

### Phase A: Director (Concept & Shot Planning)
1. Read source documents and lock semantic truth in `research/sources.md`.
2. Measure audio prosody (timestamps, pauses, emphasis words).
3. Formulate the **Motion Thesis** (What moves? What stays still? What is the connective thread?).
4. Write `docs/shotlist.md` detailing timecode, on-screen text, camera language, and SFX cue.
5. **PAUSE FOR APPROVAL**: Present the shotlist to the user. Do NOT write code until explicitly approved.

### Phase B: Builder (Remotion Engineering)
1. Consult `V18_MOTION_CATALOG.md`. Select matching atomic recipes.
2. Implement components in `src/shots/` or `src/scenes/` using Remotion hooks (`useCurrentFrame`, `spring`, `interpolate`).
3. Adhere to Remotion invariants:
   - Always clamp frame-based `interpolate`: `{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }`.
   - Use `clipPath: inset(...)` for reveal panels to prevent typography squashing.
   - Apply `fontVariantNumeric: 'tabular-nums'` to all animated counters.
   - Use `display: 'inline-block'` on transformed text spans.
   - Maintain clean alpha channels on overlays.

### Phase C: Visual Critique (Inspection & Scoring)
1. Render contact sheets (2 fps) and fast strips (60 fps) across critical transitions.
2. Hand images to the Critic persona.
3. Score the 8 criteria (1–10) using `references/visual-critique.md`.
4. Apply automatic score caps (e.g. empty frame 0 caps at 6, fade-in transition caps at 6).
5. Identify the **3 worst problems** and apply testable fixes.
6. **Verdict**: Requires $\ge 3$ rounds and all scores $\ge 8$ to achieve **SHIP**.

### Phase D: Quality Control & Delivery
1. Run all 13 automated QA gates (`selfcheck.py`, `frame_metrics.py`, `motion_check.py`, audio mix checks).
2. Ensure 100% PASS with zero warnings.
3. Package delivery artifacts and emit report.

---

## 3. Reference Library

- [Reference Integration Matrix](../../../REFERENCE_INTEGRATION.md)
- [V18 Motion Recipe Catalog](../../../V18_MOTION_CATALOG.md)
- [Anti-Cliché Rules & Materiality Restraint](references/anti-cliche-rules.md)
- [Visual Critique Protocol & Scorecard](references/visual-critique.md)
- [Builder Protocol & Remotion Standards](references/builder-protocol.md)
- [Persian Pronunciation Architecture](../../../docs/persian-tts-production.md)
- [Sound Design & Dual-Clock Beat Grid](references/sound-design.md)
- [Two-Tier QC Protocol](references/qc-protocol.md)
