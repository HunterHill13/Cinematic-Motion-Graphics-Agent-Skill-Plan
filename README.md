# Cinematic Motion Director — AI Video Production Pipeline (v40.1)

[![Version](https://img.shields.io/badge/version-v40.1-blue.svg)](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/.agents/skills/cinematic-motion-director/SKILL.md)
[![Engine](https://img.shields.io/badge/render_engine-Remotion%20%2B%20React%2018-61dafb.svg)](https://remotion.dev)
[![Voice](https://img.shields.io/badge/voice_engine-Google%20Gemini%20TTS%20(Puck)-4285F4.svg)](https://ai.google.dev)
[![Architecture](https://img.shields.io/badge/architecture-Kinetic%20Monolith%20World-amber.svg)](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/src/motion/precision_lab/V40_KineticMonolithPreview.tsx)

An enterprise-grade, motion-first generative video production skill for **Google Antigravity & Gemini**, engineered with **Remotion**, React 18, and vector SVG mastery. Transforms complex Persian and bilingual educational/scientific scripts into publication-grade cinematic motion graphics.

---

## 🌟 What's New in v40.1

### 1. Video-Talkcraft Methodology Integration
* **Causal Event Graph (`references/causal-planning.md`):** Every visual transition requires a physical or spatial cause. Banned slide-to-slide cuts and card grids.
* **Element Budgeting & No Orphan Elements:** Strict budget of 5–7 visual elements active simultaneously. Every visual object introduced must either fuse into the monolith or exit via momentum.
* **Intentional Stillness:** 1.0–2.5s deliberate stillness after major visual landings allowing cognitive digestion, ending hyperactive camera jitter.
* **Motion-Carry Transitions:** Objects carry velocity and directional vectors into subsequent frames.

### 2. The Kinetic "K" Monolith & Sovereign Calibration Pavilion
* **Single World Canvas:** Abolished the slide-per-sentence paradigm. All narrative acts unfold within a continuous, persistent 3D architectural monolith environment.
* **Mass Conservation in Metamorphosis:** Object A physically deconstructs, hinges, or unfolds into idea B. No elements materialize from empty voids.
* **Architectural Materiality:** Titanium plates, brushed dark metal, cadmium/amber directional emissive lights, and atmospheric volumetric depth.

### 3. Exclusive Google Gemini TTS Voice Pipeline
* **Absolute Ban on Edge-TTS / Robotic Synthesizers:** Mandatory use of Google Gemini Multimodal Audio API (`gemini-2.5-flash-preview-tts` with prebuilt voice `Puck`).
* **Dual-Representation Pipeline:**
  * `speechText`: Fully annotated with Persian diacritics (harakat/tashdid) for phonetically flawless pronunciation (e.g. «بقیه‌الله»).
  * `displayText`: Stripped clean with zero diacritics for clean visual typography.
* **Audio Engineering:** 24 kHz Linear PCM audio processed via FFmpeg `loudnorm` (EBU R128 @ -16 LUFS) with -14 dB sidechain ducking under voiceover.

### 4. Zero-Subpixel-Jitter Persian Kinetic Typography
* **Authored Keyframe Curves:** Precise cubic-bezier easing (`cubicBezier(0.16, 1, 0.3, 1)`) coupled with mass-damped springs.
* **Anti-Subpixel Jitter:** Enforced `translate3d`, `backface-visibility: hidden`, and non-fractional pixel offsets preventing jitter during text reveals.
* **Typographic Hierarchy:** Canonical 65 / 110 / 130 scale with Vazirmatn / Shabnam Persian letterforms.

---

## 🏗 System Architecture

```text
Voiceover Audio (Gemini 2.5 TTS) + Master Score
                    ↓
       Semantic Beat Mapping (Beat Timestamps)
                    ↓
       Causal Event Graph & Element Budgeting
                    ↓
  Persistent 3D World Canvas (Kinetic "K" Monolith)
                    ↓
      Topological Slice & Vector SVG Morphing
                    ↓
AuthoredKeyframeCurves + Motion-Carry Choreography
                    ↓
 13-Gate Automated QC & 8-Point Adversarial Review
                    ↓
        Full Master Render (Remotion 4K/FHD)
```

---

## 🚀 Quickstart

### 1. Interactive Motion Lab / Remotion Studio
```bash
npm start
# Launches Remotion Studio at http://localhost:3000
```

### 2. Render V40.1 Kinetic Monolith Preview (19s Master)
```bash
npx remotion render src/index.ts V40_KineticMonolithPreview renders/v40/V40.1_PREVIEW_KINETIC_MONOLITH.mp4
```

### 3. Synthesize Audio Pipeline (Gemini Voice + Dynamic Ducking)
```bash
python projects/v40_audio/build_preview_audio.py
```

### 4. Run TypeScript & Linter Verification
```bash
npx tsc --noEmit
```

---

## 📂 Repository Layout

```text
├── .agents/skills/cinematic-motion-director/  # Canonical Skill Package (v40.1)
│   ├── SKILL.md                              # Master Skill Directive & Core Rules
│   ├── references/                           # Architectural Knowledge Base
│   │   ├── causal-planning.md                # Causal Event Graphs & Element Budgets
│   │   ├── living-motion.md                  # Organic Motion & Authored Curves
│   │   ├── voice-director-and-persian-tts.md # Gemini TTS Protocol & Persian Rules
│   │   ├── camera-director.md                # Cinematic 3D Camera Choreography
│   │   └── remotion-core-engine.md           # Remotion React Engine Standards
│   └── template/                             # Production scaffolding & configs
├── docs/                                     # Verification audits & failure reviews
│   ├── SKILL_INTEGRATION_AUDIT.md            # Video-Talkcraft integration audit
│   ├── V40.1_CAUSAL_AUDIT.md                 # Mechanical causality audit
│   └── V40.1_INTEGRATION_VERIFICATION.md     # Production runtime verification report
├── projects/v40_audio/                       # Audio generation scripts & assets
│   └── build_preview_audio.py                # Gemini TTS + FFmpeg master mixer
├── renders/v40/                              # Master video renders & frame proofs
│   ├── V40.1_PREVIEW_KINETIC_MONOLITH.mp4    # Official v40.1 preview video
│   └── stills/                               # High-res audit stills
├── src/                                      # Remotion React Source
│   ├── Root.tsx                              # Composition registration
│   └── motion/precision_lab/
│       └── V40_KineticMonolithPreview.tsx    # V40.1 Monolith production code
└── README.md                                 # Project documentation
```

---

## 🛡 Production Quality Gates

Every rendered piece must clear the **13 Automated Release Gates**:
1. `VOICE_PROSODY_GATE`: Native Persian cadence without robotic truncation.
2. `GEMINI_TTS_GATE`: Zero Edge-TTS fallback; strictly Google Gemini `Puck`.
3. `PERSION_PRONUNCIATION_LOCK`: Verified phonetics for institutional terminology.
4. `DUAL_REPRESENTATION_GATE`: Diacritics isolated exclusively to TTS input.
5. `CAUSAL_EVENT_GATE`: 100% of state changes driven by visible physical causes.
6. `ELEMENT_BUDGET_GATE`: Active screen elements capped at $\le 7$.
7. `NO_ORPHAN_GATE`: Zero isolated elements remaining after narrative shifts.
8. `INTENTIONAL_STILLNESS_GATE`: Minimum 1.0s settle window post-impact.
9. `MOTION_CARRY_GATE`: Kinetic vectors preserved across cut seams.
10. `TOPOLOGY_PRESERVATION_GATE`: Continuous mass conservation during morphs.
11. `ZERO_SUBPIXEL_JITTER_GATE`: Hardware-accelerated integer coordinate locks.
12. `COLOR_LUMINANCE_GATE`: WCAG AAA contrast ratio on all typography.
13. `TYPE_SAFETY_GATE`: Strict TypeScript zero-error execution.

---

## 📄 License
Internal Production Skill — Medical Research Committee. All rights reserved.
