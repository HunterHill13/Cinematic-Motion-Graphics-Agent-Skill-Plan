# REUSE & ADAPTATION PLAN

**Target:** `cinematic-motion-director` Agent Skill  
**Goal:** Direct reuse of proven video-production modules without reinvention  
**Date:** 2026-10-03  

---

## 1. Inventory of Reused Assets & Mapping Matrix

| Source Repository | Source File / Module | Target Destination in Skill / Project | Strategy | Rationale & Modifications |
|---|---|---|---|---|
| **remotion-dev/skills** | `remotion-best-practices/` | `references/remotion-best-practices.md` | Direct / Link | Official routing for Remotion core APIs. |
| **remotion-dev/skills** | `remotion-markup/REFERENCE.md` | `references/remotion-markup.md` | Direct Adapt | Seek-safety, interpolate clamping, SVG rules. |
| **remotion-dev/skills** | `remotion-render/REFERENCE.md` | `references/remotion-render.md` | Direct Adapt | Concurrency flags, CRF 16 settings, audio encoding. |
| **remotion-dev/skills** | `remotion-captions/REFERENCE.md` | `references/remotion-captions.md` | Direct Adapt | Word-level subtitle animation, styling tokens. |
| **anything2explainer** | `template/scripts/tts_build.py` | `template/scripts/tts_build.py` | Direct Reuse | Python script generating frame-accurate timeline, subs, and multi-engine TTS (Edge-TTS, Kokoro, Piper). |
| **anything2explainer** | `template/scripts/motion_check.py` | `template/scripts/motion_check.py` | Direct Reuse | Quantitative check: static freeze ≤3.0s, post-landing hold ≥30f. |
| **anything2explainer** | `template/scripts/frame_metrics.py` | `template/scripts/frame_metrics.py` | Direct Reuse | Computer-vision check: hero element bounding box, glow check, debris count. |
| **anything2explainer** | `template/scripts/selfcheck.py` | `template/scripts/selfcheck.py` | Direct Reuse | AST check: frame gaps, glitch whitelist compliance, text facts. |
| **anything2explainer** | `template/src/common/DotFieldBg.tsx` | `template/src/effects/DotFieldBg.tsx` | Direct Reuse | Procedural dot wave shader canvas. |
| **anything2explainer** | `template/src/common/StarFieldBg.tsx` | `template/src/effects/StarFieldBg.tsx` | Direct Reuse | Procedural star field depth canvas. |
| **anything2explainer** | `template/src/common/ProgressBar.tsx` | `template/src/overlays/ProgressBar.tsx` | Adapt | Chapter progress HUD bound to `theme.ts`. |
| **anything2explainer** | `template/src/common/Subtitle.tsx` | `template/src/captions/Subtitle.tsx` | Adapt | 44px word-boundary caption renderer. |
| **anything2explainer** | `template/src/common/Glitch.tsx` | `template/src/motion/Glitch.tsx` | Direct Reuse | Controlled glitch text entrance for core terms. |
| **anything2explainer** | `template/src/common/easing.ts` | `template/src/utils/easing.ts` | Direct Reuse | Power bezier easing curves. |
| **anything2explainer** | `template/src/fx.tsx` | `template/src/primitives/fx.tsx` | Adapt | `LightSweep`, `StageLine`, `GhostText`, `HaloRing`, `HeroGlow`, `BigNumber`, `TiltPlane`. Decoupled from hardcoded purple into `theme.ts`. |
| **anything2explainer** | `reference/narration-guidance.md` | `references/narration.md` | Adapt | 13 spoken prose rules, narrative tension, pacing. |
| **anything2explainer** | `reference/composition-and-light.md` | `references/visual-design.md` | Adapt | Hero size tiers, light following hero, high-energy scene rules. |
| **video-shotcraft** | `references/aesthetic-rules.md` | `references/aesthetic-rules.md` | Direct Reuse | Case-law rules: R1–R4 (pacing), Q1–Q10 (cinematography, CSS zoom 3D resolution, hero close-ups, mock realism). |
| **video-shotcraft** | `references/sound-design.md` | `references/sound-design.md` | Direct Reuse | Sound hierarchy, risers, bass drops, clicks, volume levels. |
| **video-shotcraft** | `references/music-beat-sync.md` | `references/music-beat-sync.md` | Direct Reuse | Math for BPM beat alignment, cutting on rhythm. |
| **video-shotcraft** | `references/shots/` | `references/shot-recipes/` | Adapt | Modular shot recipe cards (Macro Push, Orbit, Split Screen, etc.). |
| **video-talkcraft** | `references/cinematography.md` | `references/cinematography.md` | Direct Reuse | 7-layer shot model, Anti-slideshow principles, CameraRig slow zoom, motion continuity transitions. |
| **video-talkcraft** | `references/schematic.md` | `references/schematic.md` | Direct Reuse | One-stroke machine diagrams for technical/scientific visuals. |
| **claude-remotion-skill** | `references/design-rules.md` | `references/motion-quality-rules.md` | Direct Reuse | 60/30/10 color rule, 5-layer visual stack, hold pauses, pre-delivery checklist. |
| **claude-remotion-skill** | `references/motion-patterns.md` | `template/src/motion/patterns.tsx` | Direct Reuse | `Entrance`, `WordReveal`, `Staggered`, `BgMesh`, `Grade`, `Grain`, `Vignette`, `KenBurns`, `AnimatedCounter`. |
| **claude-skill-motion-graphics** | Beat Sheet CSV Structure | `schemas/beat-sheet.schema.json` | Adapt | Formalized into a strongly-typed JSON/YAML schema. |
| **claude-skill-motion-graphics** | Style Lock Prompts | `templates/style-lock.yaml` | Adapt | Formalized into `STYLE_IMAGE`, `STYLE_VIDEO`, `AVOID` contracts. |

---

## 2. Explicitly Discarded & Non-Reused Components

To keep the pipeline lean, robust, and cost-effective, the following external items are deliberately excluded:
1. **Higgsfield CLI (`@higgsfield/cli`)**: Found in `claude-skill-motion-graphics`. Discarded because it requires a proprietary paid account. We rely on Remotion code-drawn animation and standard open web assets.
2. **Proprietary Video Replicators (`video-replica`)**: Discarded. All scenes are original programmatic motion graphics.
3. **Hardcoded Color Constants**: Discarded. Hardcoded `#662df8` (purple) values from `anything2explainer` are refactored into tokens in `src/theme.ts`.
4. **Duplicate Camera Utilities**: Discarded redundant camera code in favor of a single unified `CameraRig`.

---

## 3. Dependency Management & Environment Isolation

The reused Python scripts (`tts_build.py`, `motion_check.py`, `frame_metrics.py`, `selfcheck.py`) require a small, standard Python toolset:

```text
# requirements.txt
numpy>=1.24.0
Pillow>=9.5.0
scipy>=1.10.0
edge-tts>=6.1.0
soundfile>=0.12.0
```

All Remotion React dependencies will be managed via standard `package.json`:

```json
{
  "dependencies": {
    "@remotion/captions": "^4.0.0",
    "@remotion/google-fonts": "^4.0.0",
    "@remotion/paths": "^4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remotion": "^4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```
