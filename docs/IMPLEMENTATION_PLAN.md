# IMPLEMENTATION & EXECUTION PLAN

**Skill Name:** `cinematic-motion-director`  
**Target Environment:** Google Antigravity + Gemini  
**Date:** 2026-10-03  

---

## 1. Roadmap & Implementation Phases

### Phase 1: Repository & License Audit (Completed)
- Cloned and analyzed all 5 target repositories in `_research/`.
- Assessed licenses (MIT, Apache 2.0, PolyForm Noncommercial 1.0.0, SIL OFL 1.1).
- Produced `docs/DEPENDENCY_AUDIT.md`.

### Phase 2: Architectural Specification (Completed)
- Designed 5 distinct input modes (Topic, Script, VO, Script+VO, Docs/Lecture).
- Unified cinematography and anti-slideshow rules (7-layer shot model, `demoteAt` state machine, 6 motion transitions).
- Produced `docs/ARCHITECTURE.md` and `docs/REUSE_PLAN.md`.

### Phase 3: Skill Packaging & Progressive Disclosure (Pending Approval)
- Create `.agents/skills/cinematic-motion-director/SKILL.md` as the high-level router.
- Create modular references in `references/`:
  - `creative-direction.md`: Creative brief formulation, platform targeting, aspect ratios.
  - `storytelling.md`: Narrative arc patterns (Hook -> Escalation -> Resolution).
  - `narration.md`: Spoken prose rules, timing budgets, syllable-per-second calibrations.
  - `cinematography.md`: Anti-slideshow rules, 7-layer model, camera moves.
  - `motion-grammar.md`: Semantic animation mapping (growth, causality, reveal, focus).
  - `motion-quality-rules.md`: Spring curves, bezier clamping, staggered entrances, holds.
  - `sound-design.md`: Sound hierarchy, cue sync, volume ducking, beat matching.
  - `medical-scientific-mode.md`: Factual grounding, source traceability, diagram rigor.
  - `qc-protocol.md`: Two-tier QC execution (quantitative scripts + visual inspection).
  - `remotion-best-practices.md`: Remotion React lifecycle, seek-safety, studio/render.

### Phase 4: Schema & Template System (Pending Approval)
- Define strict JSON schemas in `schemas/`:
  - `creative-brief.schema.json`
  - `style-lock.schema.json`
  - `beat-sheet.schema.json`
  - `storyboard.schema.json`
  - `qc.schema.json`
- Create production templates in `templates/`:
  - `creative-brief.yaml`
  - `style-lock.yaml`
  - `beat-sheet.yaml`
  - `storyboard.yaml`
  - `qc-checklist.md`

### Phase 5: Reusable Project Template & Primitives (Pending Approval)
- Create base Remotion scaffold in `template/`:
  - `template/src/theme.ts`: Design token system with swappable palettes (Tech Dark, Editorial, Bio Medical, Clean Corporate).
  - `template/src/primitives/`: `fx.tsx`, `shapes.tsx`, `typography.tsx`.
  - `template/src/motion/`: `Entrance`, `WordReveal`, `Staggered`, `LifeCycle` (`demoteAt`), `transitions.tsx`.
  - `template/src/camera/`: `CameraRig.tsx` (continuous micro-push + 2.5D parallax).
  - `template/src/effects/`: `DotFieldBg.tsx`, `StarFieldBg.tsx`, `BgMesh.tsx`, `Grain.tsx`, `Vignette.tsx`, `Grade.tsx`.
  - `template/src/overlays/`: `ProgressBar.tsx`, `HUD.tsx`, `ChapterCard.tsx`.
  - `template/src/captions/`: `Subtitle.tsx`.
  - `template/scripts/`: `tts_build.py`, `motion_check.py`, `frame_metrics.py`, `selfcheck.py`, `render.sh`, `preview.sh`.

### Phase 6: Test Project Validation (Pending Approval)
- Execute complete test case:
  - **Topic:** "How apoptosis works in a cancer cell" (Mitochondrial intrinsic pathway: BCL-2 / BAX / Cytochrome c / Caspase cascade).
  - **Duration:** 60–90 seconds.
  - **Style:** Cinematic Scientific Motion Graphics (16:9, 30 FPS, English).
  - **Deliverables:** `research/sources.md`, `creative-brief.yaml`, `beat-sheet.yaml`, `storyboard.yaml`, pilot render (first 20s), quantitative QC report, final video.

---

## 2. Proposed Final Directory Tree

```text
g:/دانشگاه/کمیته تحقیقاتی/فیلم ها هفتگی/اسکیل موشن گرافیک/
│
├── .agents/
│   └── skills/
│       └── cinematic-motion-director/
│           ├── SKILL.md                          # Main orchestrator router
│           │
│           ├── references/                       # Progressive disclosure guides
│           │   ├── creative-direction.md         # Briefing, platform aspect ratios, tone
│           │   ├── storytelling.md               # Narrative arc architectures
│           │   ├── narration.md                  # Spoken prose & timing rules
│           │   ├── cinematography.md             # 7-layer shot model, anti-slideshow
│           │   ├── motion-grammar.md             # Semantic motion rules
│           │   ├── motion-quality-rules.md       # Springs, beziers, staggered timing
│           │   ├── aesthetic-rules.md            # R1-R4 & Q1-Q10 case-law rules
│           │   ├── sound-design.md               # Audio hierarchy & beat-sync
│           │   ├── medical-scientific-mode.md    # Source traceability & fact verification
│           │   ├── remotion-best-practices.md    # Remotion patterns & seek-safety
│           │   ├── shot-recipes.md               # 20+ cinematic camera/motion recipes
│           │   └── qc-protocol.md                # Quantitative & visual inspection gates
│           │
│           ├── schemas/                          # Strict validation contracts
│           │   ├── creative-brief.schema.json
│           │   ├── style-lock.schema.json
│           │   ├── beat-sheet.schema.json
│           │   ├── storyboard.schema.json
│           │   └── qc-report.schema.json
│           │
│           ├── templates/                        # Ready-to-use production templates
│           │   ├── creative-brief.yaml
│           │   ├── style-lock.yaml
│           │   ├── beat-sheet.yaml
│           │   ├── storyboard.yaml
│           │   ├── sources.md
│           │   └── qc-checklist.md
│           │
│           ├── workflows/                        # Specialized execution pipelines
│           │   ├── mode-a-topic.md
│           │   ├── mode-b-script.md
│           │   ├── mode-c-voiceover.md
│           │   ├── mode-d-script-and-voiceover.md
│           │   └── mode-e-docs-and-lecture.md
│           │
│           └── template/                         # Scaffolding project template
│               ├── package.json
│               ├── tsconfig.json
│               ├── remotion.config.ts
│               ├── requirements.txt              # Python CV & TTS tools
│               ├── public/
│               │   └── fonts/
│               ├── scripts/
│               │   ├── tts_build.py
│               │   ├── motion_check.py
│               │   ├── frame_metrics.py
│               │   └── selfcheck.py
│               └── src/
│                   ├── theme.ts                  # Centralized design tokens
│                   ├── Root.tsx
│                   ├── Main.tsx
│                   ├── primitives/               # fx.tsx, shapes.tsx
│                   ├── motion/                   # Entrance, WordReveal, LifeCycle
│                   ├── camera/                   # CameraRig.tsx
│                   ├── effects/                  # Shaders, BgMesh, Grain, Grade
│                   ├── overlays/                 # ProgressBar, HUD, ChapterCard
│                   ├── captions/                 # Subtitle.tsx
│                   ├── shots/                    # Shot components
│                   └── utils/                    # easing.ts, textfit.ts
│
├── docs/                                         # Architecture & audit docs
│   ├── DEPENDENCY_AUDIT.md
│   ├── ARCHITECTURE.md
│   ├── REUSE_PLAN.md
│   └── IMPLEMENTATION_PLAN.md
│
├── ATTRIBUTIONS.md                               # Full open-source attribution
└── README.md
```
