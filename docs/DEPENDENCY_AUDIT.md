# DEPENDENCY & REPOSITORY AUDIT

**Target:** AI Cinematic Motion-Graphics Agent Skill for Google Antigravity + Gemini  
**Audit Date:** 2026-10-03  
**Auditor:** Senior AI Video Pipeline Architect  

---

## 1. Executive Summary

This audit evaluates 5 primary reference repositories and their associated projects to establish a definitive foundation for the `cinematic-motion-director` skill. The goal is to eliminate duplicate effort, comply strictly with software licenses, identify proven production modules for reuse, and isolate the missing creative direction and orchestration layers required by Google Antigravity.

| Repository | Origin / Author | Primary License | Status | Key Value Contribution |
|---|---|---|---|---|
| **remotion-dev/skills** | Remotion Official | MIT / Remotion Ecosystem | Official Cloned | Official primitives, best practices, markup, studio, render, captions, maps, multimedia |
| **anything2explainer** | Vincent Wei (`hbaixiang146-rgb`) | PolyForm Noncommercial 1.0.0 (Fonts: SIL OFL 1.1) | Fork Cloned & Verified | Complete topic-to-explainer pipeline, TTS timing engine (`tts_build.py`), quantitative QC (`motion_check.py`, `frame_metrics.py`, `selfcheck.py`), Star/Dot fields, HUD/Overlays |
| **video-shotcraft** | Ding200602 / Vincent Wei | Apache 2.0 | Official Cloned | Cinematic recipe cards, `aesthetic-rules.md` (case-law rules R1-R4, Q1-Q10), sound design patterns, music beat sync |
| **video-talkcraft** | Vincent Wei (`fmzh2025`) | PolyForm Noncommercial 1.0.0 | Fork Cloned & Verified | Anti-slideshow methodology, 7-layer shot model, `CameraRig` continuous motion, `Live demoteAt` hand-off state machine, motion continuity transitions |
| **claude-remotion-skill** | haidrrrry | MIT | Official Cloned | `design-rules.md` (60/30/10 color rule, 5-layer stack, hold pauses), `motion-patterns.md` (springs, mesh gradients, procedural grain, vignette, word reveals, Ken Burns) |
| **claude-skill-motion-graphics** | docusphere | Community / MIT-compatible | Official Cloned | Canonical Beat Sheet specification, Style Lock prompts (`STYLE_IMAGE`, `STYLE_VIDEO`, `AVOID`), scene scaffolding |

---

## 2. In-Depth Repository Evaluation

### 2.1 Remotion Official Agent Skills (`remotion-dev/skills`)
* **URL:** `https://github.com/remotion-dev/skills`
* **License:** Permissive MIT / Standard Remotion Framework Terms.
* **Architecture:** Modular sub-skills directory containing:
  - `remotion-best-practices`: Universal routing agent for all Remotion interactions.
  - `remotion-create`: Standard project scaffolding (`npx create-video`).
  - `remotion-markup`: Core rules for React-based animation, typography, layout, seek-safety.
  - `remotion-studio`: Interactive preview lifecycle, headless Studio control, WebMCP compatibility.
  - `remotion-render`: CLI render flags, concurrency optimization, H.264 CRF encoding.
  - `remotion-captions`: Subtitle timing, word-level timestamps, caption styles.
  - `remotion-multimedia`: Browser-side trimming, cropping, asset metadata.
  - `remotion-maps`: Mapbox, MapLibre, animated route paths, 3D geographic flyovers.
* **Reuse Assessment:**
  - **Direct Reuse:** Official CLI workflows (`npx remotion studio`, `npx remotion render`, `remotion-captions`).
  - **Adaptation:** Embed Remotion best-practice routing into our Antigravity orchestrator so Gemini naturally follows Remotion coding patterns without hallucinating React DOM hacks.
  - **Attribution:** Retained in `ATTRIBUTIONS.md`.

---

### 2.2 anything2explainer (`Vincentwei1021/anything2explainer`)
* **URL:** `https://github.com/Vincentwei1021/anything2explainer` (Mirrored: `hbaixiang146-rgb/anything2explainer`)
* **License:** **PolyForm Noncommercial License 1.0.0** (Free for research, educational, and personal noncommercial use; commercial use requires explicit author authorization). Fonts under SIL Open Font License 1.1.
* **Modules & Assets:**
  - `template/scripts/tts_build.py`: Multi-engine TTS generator (Edge-TTS, Kokoro-82m, Piper, Kokoro-onnx) + frame-accurate word boundary extractor + `timeline.ts` and `subs.ts` code emitter.
  - `template/scripts/motion_check.py`: Automated frame delta analyzer verifying no static freeze >3.0s and post-landing hold ≥30 frames.
  - `template/scripts/frame_metrics.py`: Computer-vision measurement of hero element bounding box (≥170px), purple glow coverage, fragment suppression.
  - `template/scripts/selfcheck.py`: Static code AST and token analyzer cross-checking shot bounds, glitch whitelists, sweep limits, and on-screen text against factual research.
  - `template/src/common/`: `DotFieldBg.tsx`, `StarFieldBg.tsx`, `ProgressBar.tsx`, `Subtitle.tsx`, `Glitch.tsx`, `easing.ts`, `textfit.ts`.
  - `template/src/fx.tsx`: `LightSweep`, `StageLine`, `GhostText`, `HaloRing`, `HeroGlow`, `BigNumber`, `TiltPlane`.
  - `reference/`: `narration-guidance.md` (13 spoken copywriting rules), `narration-storyboard.md`, `composition-and-light.md`.
* **Reuse Assessment:**
  - **Direct Reuse:** Scripts (`motion_check.py`, `frame_metrics.py`, `selfcheck.py`, `tts_build.py`), background canvas shaders (`DotFieldBg`, `StarFieldBg`), and core math utilities.
  - **Adaptation:** Generalize the hardcoded purple theme into a theme-agnostic design system (`src/theme.ts`) driven by `creative-brief.yaml`.
  - **Licensing Compliance:** Prominently declare PolyForm Noncommercial in `ATTRIBUTIONS.md` and keep all original copyright headers intact.

---

### 2.3 video-shotcraft (`Ding200602/video-shotcraft`)
* **URL:** `https://github.com/Ding200602/video-shotcraft`
* **License:** **Apache License 2.0** (Highly permissive, enterprise-friendly commercial and noncommercial reuse with attribution).
* **Modules & Assets:**
  - `references/aesthetic-rules.md`: Battle-tested case-law rules:
    - **R1**: Key information must hold for ≥1s after landing; wordmark holds for 1s.
    - **R2**: Speed is acceleration, not linear velocity; mass entrances use physical metaphors.
    - **R3**: Pacing: slower is better; opening hero actions require ≥3s.
    - **R4**: Full-frame screen slams ≤3 per video, spaced ≥16 beats.
    - **Q1**: Real screenshots for existing software UI; publication-grade mock content.
    - **Q2**: High-res rasterization for 3D perspective text via CSS `zoom` instead of `transform: scale` to bypass Chromium GPU downsampling blur.
    - **Q3**: Steady camera — zero handheld noise on product/educational explainers.
    - **Q4**: Sheen/glint: max 1 on hero, strictly clipped to rounded borders (`overflow: hidden`).
    - **Q5**: Single hero opening.
    - **Q6**: Camera serves legibility: perpendicular for dense tables/lists, tilted only for mood.
    - **Q7**: Hero close-up formula: tilt + height + orbit + contrast background.
    - **Q8**: Finale launch event family photo: peak visual energy.
    - **Q9**: Fly-in landing slots must embed into actual layout flow, not float indefinitely.
    - **Q10**: Publication-grade mock documents.
  - `references/sound-design.md`: Sound hierarchy, risers, whooshes, clicks, volume levels.
  - `references/music-beat-sync.md`: BPM-to-frame calculation (`fps * 60 / BPM`), cutting on musical beats.
* **Reuse Assessment:**
  - **Direct Reuse:** Entire rulebook (`aesthetic-rules.md`, `sound-design.md`, `music-beat-sync.md`), CSS zoom 3D resolution technique.
  - **Licensing Compliance:** Full Apache 2.0 compliance with NOTICE and attribution.

---

### 2.4 video-talkcraft (`fmzh2025/video-talkcraft` / `Vincentwei1021`)
* **URL:** `https://github.com/fmzh2025/video-talkcraft`
* **License:** **PolyForm Noncommercial License 1.0.0**
* **Modules & Assets:**
  - `references/cinematography.md`: Defines the "Anti-Slideshow" framework:
    - Root causes of PPT look: Static stage, elements freezing upon entrance, hard cut sequence flips, layout info overload.
    - **The 7-Layer Shot Model:** L1 Camera, L2 Focus, L3 Subject, L4 Attached Effects, L5 Secondary, L6 Environment, L7 Masks.
    - **CameraRig:** Subtle continuous scale push/pull (1.00 -> 1.04-1.06) carrying the scene life, eliminating the need for awkward element fidgeting.
    - **Hand-off State Machine (`Live demoteAt`):** When subject B enters at $t$, subject A drops scale to 0.92, dims brightness by 66%, blurs by 3px, or executes a clean departure.
    - **Motion Continuity Transitions:** Push-through, Overexpose-flip, Whip-pan, Black-slam, Pullback-cool, Particle-weld, Long-take world.
  - `references/schematic.md`: Semantic one-stroke machine diagrams for abstract technical concepts.
* **Reuse Assessment:**
  - **Direct Reuse:** Cinematography guidelines, 7-layer model, transition formulations, hand-off state machine pattern.
  - **Licensing Compliance:** PolyForm Noncommercial attribution.

---

### 2.5 Claude Remotion Skill (`haidrrrry/claude-remotion-skill`)
* **URL:** `https://github.com/haidrrrry/claude-remotion-skill`
* **License:** **MIT License**
* **Modules & Assets:**
  - `references/design-rules.md`: 60/30/10 color rule, hero font pairing, 5-layer visual stack (Bg mesh -> Assets -> Graphics -> Color Grade -> Grain/Vignette), sound cue placement (2-3 frames early), pre-delivery inspection checklist.
  - `references/motion-patterns.md`: Concrete React components:
    - `Entrance` (spring-based fade + rise + scale)
    - `Staggered` (3-6 frame child offsets)
    - `WordReveal` (per-word spring staggered text)
    - `BgMesh` (animated radial gradient blobs)
    - `Grade` (unifying soft-light color grading overlay)
    - `Grain` (procedural SVG turbulence noise, 0 asset files)
    - `Vignette` (radial vignette)
    - `KenBurns` (cinematic slow zoom/pan for static images)
    - `AnimatedCounter` (tabular numbers counter)
    - `ParallaxDepth` (multi-plane depth movement)
* **Reuse Assessment:**
  - **Direct Reuse:** Component implementations in `src/motion/` and `src/effects/`.
  - **Licensing Compliance:** MIT attribution retained.

---

### 2.6 AI Motion Graphics Skill (`docusphere/claude-skill-motion-graphics`)
* **URL:** `https://github.com/docusphere/claude-skill-motion-graphics`
* **License:** Public Community Skill (MIT compatible)
* **Modules & Assets:**
  - Beat Sheet column architecture: `Scene`, `Beat Label`, `VO Script`, `VO Length`, `Clip Duration`, `SHOT`, `MOTION`, `TEXT ON SCREEN`, `SFX`.
  - Style Lock contract: `STYLE_IMAGE`, `STYLE_VIDEO`, `AVOID`.
* **Reuse Assessment:**
  - **Direct Reuse:** Beat Sheet structure adapted into strict JSON/YAML schemas (`beat-sheet.schema.json`).
  - **Adaptation:** Remove proprietary Higgsfield CLI dependency; replace with Remotion-first code-drawn pipelines and pluggable asset providers.

---

## 3. Potential Conflicts & Technical Resolution

1. **PolyForm vs Commercial Use**:
   - *Risk*: `anything2explainer` and `video-talkcraft` use PolyForm Noncommercial 1.0.0.
   - *Resolution*: Architecture will cleanly separate universal orchestrator logic (MIT/Apache compatible) from PolyForm reference templates. Full transparency in `ATTRIBUTIONS.md`.
2. **Audio / TTS Dependency Isolation**:
   - *Risk*: `edge-tts` requires network connectivity and external Microsoft endpoints; `kokoro` requires `espeak-ng` or torch.
   - *Resolution*: Multi-engine fallback: Mode C (user provides pre-recorded audio WAV) is first-class; Mode A/B supports Edge-TTS (free, 0 setup), Piper/Kokoro-onnx (offline local), or user-provided audio.
3. **Chromium 3D Downsampling Blur (Gotcha Q2)**:
   - *Risk*: Text scaled via 3D `transform: scale()` becomes blurry in Chromium.
   - *Resolution*: Standardize on CSS `zoom` layout scaling + 2x-4x rasterization as documented in `video-shotcraft`.
4. **Hardcoded Style vs Domain Adaptability**:
   - *Risk*: `anything2explainer` is hardcoded to dark purple tech explainer.
   - *Resolution*: Introduce centralized `theme.ts` with swappable presets (Dark Tech, Warm Editorial, Cinematic Documentary, Medical Bio, Clean Corporate) loaded dynamically from `style-lock.yaml`.
