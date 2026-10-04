---
name: cinematic-motion-director
description: "AI Video Production Pipeline v2 for professional motion graphics, explainers, educational, scientific, medical, and documentary videos in Remotion and React. Enforces full creative direction, Living Motion Engine (L0-L7, organic procedural noise, breathing micro-motion, secondary follower physics), Voice Director & Voice-First Pipeline (dual-clock authority, stem mixing, automated -14dB ducking), Natural Persian Voice System (phonetic normalization, anti-robotic TTS routing), pilot gates, and two-tier quantitative QC before rendering."
---

# cinematic-motion-director v2

An end-to-end AI Video Production Pipeline for Google Antigravity + Gemini.
Transforms topics, scripts, audio recordings, or lectures into cinematic, publication-grade motion graphics videos rendered in Remotion.

```text
IDEA / TOPIC / SCRIPT / AUDIO
        ↓
CREATIVE DIRECTION (Brief & Style Lock)
        ↓
RESEARCH GROUNDING (Source Traceability Ledger)
        ↓
STORY ARCHITECTURE (Narrative Arc & Beats)
        ↓
VOICE DIRECTOR (Persian Optimizer, VoiceEngine, Stems, Dual-Clock)
        ↓
CANONICAL BEAT SHEET (production/beat-sheet.yaml)
        ↓
STORYBOARD & CINEMATOGRAPHY (production/storyboard.yaml)
        ↓
LIVING MOTION ENGINE (L0-L7, LivingCameraRig, OrganicBreathing, SecondaryPhysics)
        ↓
PILOT GATE (First 10–30s Render & Visual Inspection)
        ↓
PARALLEL SHOT IMPLEMENTATION (Shared Theme Tokens)
        ↓
TWO-TIER QC (Automated Computer Vision + Visual Inspection)
        ↓
FULL RENDER & STEM-MIXED MASTER DELIVERY
```

---

## 1. Operating Rules & Core Principles

1. **Do Not Code Before Thinking**: When asked to make a video, never start writing React code immediately. First establish Input Mode, Creative Brief, Narrative Arc, Beat Sheet, and Storyboard.
2. **Never Reinvent Proven Infrastructure**: Reuses official Remotion APIs (`remotion-markup`, `remotion-render`, `remotion-captions`), `tts_build.py` audio timing, CV QC scripts (`motion_check.py`, `frame_metrics.py`), and proven motion recipes. Build only the orchestration layer.
3. **Living Motion Engine (Anti-Slideshow v2)**: Prohibits static stages and raw cuts. Every scene must have an active `LivingCameraRig` executing continuous scale ($1.00 \to 1.05$), procedural handheld drift, hero `OrganicBreathing` micro-motion ($1.000 \to 1.012$), and `ParticleDrift` environments.
4. **Active Hand-Off (`Live demoteAt`) & Secondary Physics**: Preceding elements yield visual focus by scaling down ($0.92$), dimming ($-66\%$), and blurring ($3\text{px}$). Attached annotations follow with `SecondaryPhysics` spring inertia.
5. **Voice-First Authority & Natural Persian System**: Spoken audio is the immutable physical clock (`VOICEOVER = Timing Truth`). Avoid robotic Microsoft voices; use Gemini, ElevenLabs, or Pocket TTS Farsi v2 preceded by `PersianTextOptimizer.py` normalization.
6. **Audio Stem Separation & Ducking**: Master audio is assembled from 3 discrete stems (`narration`, `music`, `sfx`) with automated $-14\,\text{dB}$ ducking under dialogue.
7. **Enforced Pilot Gate**: Build and render the first 10–30 seconds first. Inspect frames and obtain approval before building the rest of the project.
8. **Accuracy > Beauty in Medical/Scientific Mode**: Zero unverified claims. Every factual statement and pathway mechanism must be logged in `research/sources.md`.
9. **Mandatory QC Loop**: Never deliver a video without running quantitative checks (`motion_check.py`, `frame_metrics.py`, `selfcheck.py`) and visual frame inspection.

---

## 2. Input Mode Routing

Identify the user's input type and route accordingly:

* **Mode A: TOPIC IN** (`workflows/mode-a-topic.md`)
  * User provides a subject/idea. Executes full research, narration, timing, storyboard, and production.
* **Mode B: SCRIPT IN** (`workflows/mode-b-script.md`)
  * User provides a written script. Script is immutable semantic truth; visuals are built around it.
* **Mode C: VOICEOVER IN** (`workflows/mode-c-voiceover.md`)
  * User provides audio. Audio is physical timing truth; word boundaries anchor every frame.
* **Mode D: SCRIPT + VOICEOVER IN** (`workflows/mode-d-script-and-voiceover.md`)
  * Audio = Timing Truth; Script = Semantic Truth. Reconciled at word boundary level.
* **Mode E: DOCUMENTS / SLIDES / LECTURE IN** (`workflows/mode-e-docs-and-lecture.md`)
  * Converts PDF, PPTX, or lecture recording into an educational video with 100% source provenance.

---

## 3. Production Checkpoints (User Interaction Gates)

Only pause for user approval at material milestones:
* **CHECKPOINT 1**: Creative Brief & Visual Style Lock (`production/creative-brief.yaml`, `production/style-lock.yaml`).
* **CHECKPOINT 2**: Narration Script & Storyboard (`production/beat-sheet.yaml`, `production/storyboard.yaml`).
* **CHECKPOINT 3**: Pilot Visual Approval (First 10–30 seconds rendered and inspected).
* **CHECKPOINT 4**: Final Delivery Package & Quality Report.

Routine technical decisions are resolved autonomously.

---

## 4. Reference Library (Progressive Disclosure)

Consult these reference documents during production:
* [Creative Direction & Briefs](references/creative-direction.md)
* [Story Architecture & Narrative Arcs](references/storytelling.md)
* [Narration & Timing Budgets](references/narration.md)
* [Cinematography & Anti-Slideshow Rules](references/cinematography.md)
* [Motion Grammar & Semantic Animation](references/motion-grammar.md)
* [Motion Quality Rules & 5-Layer Stack](references/motion-quality-rules.md)
* [Battle-Tested Aesthetic Rules (R1–R4, Q1–Q10)](references/aesthetic-rules.md)
* [Sound Design & Beat Synchronization](references/sound-design.md)
* [Medical & Scientific Accuracy Rules](references/medical-scientific-mode.md)
* [Remotion Framework Best Practices](references/remotion-best-practices.md)
* [Cinematic Shot Recipes Library](references/shot-recipes.md)
* [Two-Tier QC Protocol](references/qc-protocol.md)

---

## 5. Schemas & Templates

* **Schemas**: `schemas/creative-brief.schema.json`, `schemas/style-lock.schema.json`, `schemas/beat-sheet.schema.json`, `schemas/storyboard.schema.json`, `schemas/qc-report.schema.json`.
* **Templates**: `templates/creative-brief.yaml`, `templates/style-lock.yaml`, `templates/beat-sheet.yaml`, `templates/storyboard.yaml`, `templates/sources.md`, `templates/qc-checklist.md`.
* **Remotion Project Scaffold**: Fully configured in `template/`.
