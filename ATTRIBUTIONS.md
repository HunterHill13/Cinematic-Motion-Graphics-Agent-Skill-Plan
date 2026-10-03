# OPEN-SOURCE ATTRIBUTIONS & NOTICES

This project builds upon, adapts, and integrates concepts, scripts, motion patterns, and architectures from the following exceptional open-source projects:

---

### 1. Remotion Official Skills (`remotion-dev/skills`)
* **Project:** Official Remotion AI Agent Skills
* **Authors:** Remotion Team & Contributors
* **URL:** https://github.com/remotion-dev/skills / https://www.remotion.dev/docs/ai/skills
* **License:** MIT / Remotion Framework Terms
* **Contributions Reused:**
  - Standard Remotion React component lifecycles and seek-safety patterns (`remotion-markup`).
  - Headless Remotion Studio integration (`remotion-studio`).
  - High-performance CLI render flags, H.264 CRF encoding, and concurrency rules (`remotion-render`).
  - Word-level subtitle animation and caption standards (`remotion-captions`).

---

### 2. anything2explainer (`Vincentwei1021/anything2explainer`)
* **Project:** anything2explainer
* **Author:** Vincent Wei (Copyright © 2026 Vincent Wei)
* **URL:** https://github.com/Vincentwei1021/anything2explainer
* **License:** PolyForm Noncommercial License 1.0.0 (Fonts under SIL Open Font License 1.1)
* **Contributions Reused:**
  - Multi-engine audio timing and subtitle script (`template/scripts/tts_build.py`).
  - Computer-vision quantitative hold and still duration analyzer (`template/scripts/motion_check.py`).
  - Bounding-box and glow coverage metrics script (`template/scripts/frame_metrics.py`).
  - Static AST and timeline verification tool (`template/scripts/selfcheck.py`).
  - Procedural backdrop shaders (`DotFieldBg.tsx`, `StarFieldBg.tsx`) and light primitives (`fx.tsx`).
  - Spoken prose principles and storyboard token conventions (`reference/narration-guidance.md`, `narration-storyboard.md`).

---

### 3. video-shotcraft (`Ding200602/video-shotcraft` / `Vincentwei1021`)
* **Project:** video-shotcraft
* **Authors:** Ding200602, Vincent Wei & Contributors
* **URL:** https://github.com/Ding200602/video-shotcraft
* **License:** Apache License 2.0
* **Contributions Reused:**
  - Case-law aesthetic rules: R1–R4 (pacing & acceleration), Q1–Q10 (cinematography, CSS zoom 3D resolution bypass, hero close-ups, publication-grade mocks).
  - Sound design architecture, risers, hits, clicks, and volume balance (`references/sound-design.md`).
  - Mathematical BPM-to-frame calculation and rhythm cuts (`references/music-beat-sync.md`).
  - Modular cinematic shot recipe cards.

---

### 4. video-talkcraft (`fmzh2025/video-talkcraft` / `Vincentwei1021`)
* **Project:** video-talkcraft
* **Author:** Vincent Wei (Copyright © 2026 Vincent Wei)
* **URL:** https://github.com/fmzh2025/video-talkcraft
* **License:** PolyForm Noncommercial License 1.0.0
* **Contributions Reused:**
  - Anti-slideshow methodology and the 7-Layer Shot Model (L1 Camera through L7 Masks).
  - Continuous micro-scale movement (`CameraRig` 1.00 -> 1.04–1.06) carrying visual life.
  - Hand-off state machine (`Live demoteAt`: forming -> resolved -> handing-off -> gone).
  - Motion continuity transition formulas (Push-Through, Overexpose-Flip, Whip-Pan, Black-Slam, Pullback-Cool, Particle-Weld).
  - Technical one-stroke schematic diagram patterns (`references/schematic.md`).

---

### 5. Claude Remotion Skill (`haidrrrry/claude-remotion-skill`)
* **Project:** claude-remotion-skill
* **Author:** haidrrrry (Copyright © 2025 haidrrrry)
* **URL:** https://github.com/haidrrrry/claude-remotion-skill
* **License:** MIT License
* **Contributions Reused:**
  - 60/30/10 color rule and 5-layer visual stack (`references/design-rules.md`).
  - Production motion components (`references/motion-patterns.md`): `Entrance`, `WordReveal`, `Staggered`, `BgMesh`, `Grade`, `Grain`, `Vignette`, `KenBurns`, `AnimatedCounter`.
  - Mandatory render -> inspect -> fix delivery loop.

---

### 6. AI Motion Graphics Skill (`docusphere/claude-skill-motion-graphics`)
* **Project:** claude-skill-motion-graphics
* **Authors:** docusphere & Contributors
* **URL:** https://github.com/docusphere/claude-skill-motion-graphics
* **License:** MIT-compatible / Public Community Skill
* **Contributions Reused:**
  - Canonical Beat Sheet column model (Scene, Beat Label, VO Script, VO Length, Clip Duration, SHOT, MOTION, TEXT ON SCREEN, SFX).
  - Visual Style Lock blocks (`STYLE_IMAGE`, `STYLE_VIDEO`, `AVOID`).
