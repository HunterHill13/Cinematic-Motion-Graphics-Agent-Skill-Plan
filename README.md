# 🎬 Cinematic Motion Director — Production Architecture & AI Skill

[![Status](https://img.shields.io/badge/Production%20Status-VERIFIED%20READY-00E5FF.svg?style=for-the-badge&logo=checkmarx)](docs/SKILL_REPAIR_REPORT.md)
[![Skill](https://img.shields.io/badge/Agent%20Skill-cinematic--motion--director-FF6600.svg?style=for-the-badge&logo=probot)](.agents/skills/cinematic-motion-director/SKILL.md)
[![Engine](https://img.shields.io/badge/Render%20Engine-Remotion%20%2B%20React%2018-61dafb.svg?style=for-the-badge&logo=react)](https://remotion.dev)
[![Voice](https://img.shields.io/badge/Voice%20Engine-Google%20Gemini%20TTS%20(Puck)-4285F4.svg?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Anti-Slideshow](https://img.shields.io/badge/Anti--Slideshow-S1--S8%20Hard%20Gated-10B981.svg?style=for-the-badge)](.agents/skills/cinematic-motion-director/references/anti-slideshow.md)

An enterprise-grade, motion-first autonomous video directing system and production codebase engineered for **Google Antigravity & Gemini**. Transforms complex Persian and bilingual scientific/educational scripts into broadcast-quality cinematic motion graphics by replacing static slideshow cards and robotic narration with **continuous topological metamorphosis**, **motivated camera grammar**, and **natural conversational voiceover**.

---

## 🌟 Overview & Mission

Most generative video pipelines suffer from the **Slideshow Trap**:
* Static UI card layouts swapping text per sentence.
* Camera drift (continuous 1.05 zoom) used as a fake substitute for animation.
* Slow, ceremonial Persian narration (~90 WPM) with unnatural dead pauses.
* Excessive decorative clutter (floating dots, random icons, meaningless borders).

**Cinematic Motion Director** fundamentally eliminates these anti-patterns through a mathematically enforced, causal directing methodology backed by automated regression tests and real executable code.

```text
Narrative Script + Spoken Transients
                 ↓
[VOICE GATE] Google Gemini Audio API (Puck) → 130–165 WPM Conversational Cadence
                 ↓
[BEAT MAPPING] Semantic Beats & Unified Visual State Graph (VSG)
                 ↓
[PLANNING GATE] Strict Element Budget (≤ 5 Active Components) & No Orphan Elements
                 ↓
[SINGLE CANVAS] Persistent 3D World Canvas & Mass Conservation (No Scene Swapping)
                 ↓
[PHYSICAL KINETICS] AuthoredKeyframeEngine (Hydraulic / Pneumatic / Seismic Recoil)
                 ↓
[BLIND QC GATE] Independent Adversarial 14-Point Review & Automated Regression Tests
                 ↓
Rendered Cinematic Master (.mp4) with EBU R128 Master Mix (-16 LUFS, -14 dB Ducking)
```

---

## 💎 The 6 Hardened Production Pillars

### 1. Authoritative Motion Doctrine (`references/motion-doctrine.md`)
* **Single Persistent World Canvas:** Scene-replacement cross-fades and cuts are banned. All visual events occur within an unbroken spatial environment.
* **Meaningful Visual Transformation:** Motion must alter physical object identity, topology, or geometry. Position translation alone is not transformation.
* **Mass Conservation in Morphing:** When elements expand, extrude, or bifurcate, dimensional scale balances ($s_x \cdot s_y = 1$) to preserve physical plausibility.

### 2. Anti-Slideshow Enforcement (`references/anti-slideshow.md`)
Hard fail conditions actively detect and reject the **8 Slideshow Signatures (S1–S8)**:
* `S1`: Unmotivated scene replacement without momentum handoff.
* `S2`: Template reuse with text swapping.
* `S3`: Opacity fade on text blocks as sole primary motion.
* `S4`: Continuous camera zoom as a substitute for subject animation.
* `S5`: Sequential card grids and dashboard wrappers.
* `S6`: Elements vanishing without physical mechanical exit.
* `S7`: Lack of persistent spatial datum/anchor.
* `S8`: Scene reset timed to sentence punctuation.

### 3. Natural Conversational Persian TTS (`references/voice-doctrine.md`)
* **Exclusive Engine:** Google Gemini Audio API (`gemini-3.1-flash-tts-preview`, voice `Puck`). Falling back to robotic Edge-TTS is strictly disqualified.
* **Strict Speed Gate:** Persian narration is required to hit **130–165 WPM** (Fail threshold $< 125$ WPM). All ceremonial, slow, or unhurried instructions are permanently banned.
* **Dual-Clock Audio Synchronization:** Spoken phonetic transients align within $\pm 2$ frames of kinetic impact events.
* **Mastering:** Automated EBU R128 loudness normalization (-16 LUFS, -1.0 dBTP) with -14 dB dynamic sidechain music ducking.

### 4. Element Budget & Zero-Clutter Discipline
* **Budget Cap:** No more than **3 to 5 active physical elements** simultaneously on screen.
* **No Orphan Elements:** Every visual entity must have a declared causal parent; secondary trusses or indicators must fold back into the bedrock once their narrative utility ends.
* **Zero Decorative Clutter:** Banned floating confetti, random glowing orbs, and meaningless decorative badges.

### 5. Motivated Camera Grammar & Intentional Stillness
* **Subordinate Camera:** The camera moves **only** to track physical momentum, reveal 3D mechanical perspective, or absorb seismic shock.
* **Seismic Recoil:** High-inertia strikes trigger a sharp, decaying 3-frame vertical kick (+8px, -4px, +1px, 0px).
* **Intentional Stillness:** Major narrative resolutions mandate **1.5 to 2.5 seconds of absolute coordinate stillness** for cognitive processing, banning nervous idle drifting.

### 6. Zero-Subpixel Jitter Persian Typography
* **Integer Pixel Lock:** All text renders strictly on rounded integer coordinates (`Math.round()`) with hardware acceleration (`translate3d`, `backface-visibility: hidden`).
* **Diacritic Sanitization:** Dual-pipeline workflow where diacritics are preserved exclusively for TTS audio synthesis and cleanly stripped via `sanitizeForDisplay()` for crisp visual typography.
* **Clip-Path Reveals:** Text reveals utilize geometric `clipPath: inset(...)` to prevent letterform distortion.

---

## 🏆 Verified Golden Test: Quantum Resonator Core

A complete 15-second generic scientific master was authored, synthesized, and rendered to verify the pipeline end-to-end:

| Metric | Measured Value | Standard | Gate Result |
| :--- | :--- | :--- | :--- |
| **Duration** | 450 Frames / 15.00s | Exact Timeline Match | **PASS** |
| **Voice Cadence** | **137.2 WPM** (24 words / 10.49s) | 125 – 185 WPM | **PASS** |
| **Audio Mix** | -16 LUFS Voice, -14 dB Ducked Music | EBU R128 Broadcast | **PASS** |
| **Slideshow Signatures** | **0 Signatures** detected | 0 Allowed | **PASS** |
| **Keyframe Engine** | `evaluateAuthoredKeyframeTrack` | Executable Runtime | **PASS** |
| **TypeScript Compilation**| Zero errors (`code 0`) | Strict Type-Safety | **PASS** |
| **Blind Review Rating** | **10 / 10** across all 14 criteria | Category A (Cinematic) | **PASS** |

* **Master Render Location:** `projects/golden_test/renders/GOLDEN_QUANTUM_CORE_MASTER.mp4`
* **Audio Master:** `public/audio/golden_master_mix.mp3`
* **Shotbook Plan:** `projects/golden_test/SHOTBOOK.md`
* **Composition Source:** `src/projects/golden_test/GoldenQuantumCoreComposition.tsx`

---

## 🧪 Automated Regression Test Suite

The skill includes automated regression test scripts to prevent quality backsliding:

```bash
# 1. Verify Persian voice speech rate and natural fluency (WPM gate)
python tests/skill-regression/test_voice_speed.py <path_to_wav> "<transcript_text>"

# 2. Inspect composition source code for the 8 slideshow signatures
python tests/skill-regression/test_slideshow_signatures.py src/projects/golden_test/GoldenQuantumCoreComposition.tsx
```

---

## 📂 Repository Layout

```text
.
├── .agents/skills/cinematic-motion-director/  # REUSABLE AGENT SKILL DIRECTORY
│   ├── SKILL.md                              # Master Directing Protocol & Release Gates
│   ├── references/                           # Authoritative Doctrines & Specifications
│   │   ├── motion-doctrine.md                # 6-Tier Hierarchy & Meaningful Transformation
│   │   ├── voice-doctrine.md                 # 130-165 WPM Persian TTS & Gemini Audio API
│   │   ├── anti-slideshow.md                 # Signatures S1-S8 & Mechanical Detection
│   │   ├── causal-planning.md                # Causal Event Graphs & Budgeting
│   │   ├── cinematography.md                 # Motivated Camera Grammar & Seismic Recoil
│   │   ├── living-motion.md                  # Authored Curves & Organic Dynamics
│   │   ├── sound-design.md                   # EBU R128 Mastering & Ducking
│   │   ├── visual-critique.md                # 14-Point Blind Review Rubric
│   │   └── anti-patterns.md                  # Historical Failure Modes Catalog
│   └── template/                             # Production scaffolding & clean rigs
│
├── src/                                      # PRODUCTION CODEBASE
│   ├── motion/                               # Motion Engines
│   │   ├── curves/AuthoredKeyframeEngine.ts  # Bezier & physical keyframe tracks
│   │   ├── physics/PhysicalBounceRecipe.ts   # Dynamic gravity & coefficient of restitution
│   │   └── fidelity/MotionFidelityEngine.ts  # 8 Authored motion profiles
│   ├── camera/CameraRig.tsx                  # Camera grammar & shockwave recoil
│   ├── typography/persianSanitizer.ts        # Zero-jitter text sanitization
│   ├── projects/golden_test/                 # Golden Master Composition
│   │   └── GoldenQuantumCoreComposition.tsx  # Fully audited 15s reference implementation
│   ├── Root.tsx                              # Remotion Composition Registry
│   └── index.ts                              # Remotion Entrypoint
│
├── projects/                                 # ACTIVE PRODUCTION PROJECTS
│   ├── golden_test/                          # Golden Test Master Artifacts
│   │   ├── audio/                            # Raw, normalized, and mixed audio tracks
│   │   ├── renders/                          # Master MP4 and audit stills
│   │   └── SHOTBOOK.md                       # Complete Causal Shotbook Specification
│   └── band-kaf/                             # Band Kaf Production Artifacts
│
├── tests/                                    # AUTOMATED REGRESSION SUITE
│   └── skill-regression/
│       ├── test_voice_speed.py               # Voice duration, word count & WPM gate
│       └── test_slideshow_signatures.py      # AST/regex anti-slideshow detector
│
├── docs/                                     # AUDIT TRAIL & SYSTEM DOCUMENTATION
│   ├── SKILL_REPAIR_REPORT.md                # Closed-Loop Behavioral Repair Report
│   ├── SKILL_REFERENCE_INTEGRITY_AUDIT.md    # Reference & import integrity audit
│   ├── SKILL_BEHAVIORAL_FAILURE_AUDIT.md     # Failure analysis & root cause baseline
│   ├── SKILL_ENFORCEMENT_MATRIX.md           # Rule enforcement classification matrix
│   ├── ARCHITECTURE.md                       # System Architecture & Single Source of Truth
│   └── PRODUCTION_CONTRACT.md                # Non-negotiable quality contract
│
└── archive/                                  # HISTORICAL RESEARCH (V1 → V39)
```

---

## 🚀 Quickstart & Commands

### 1. Launch Remotion Studio
```bash
npm start
# Opens interactive composition player at http://localhost:3000
```

### 2. Render Golden Master Video (15s @ 1080p, 30fps)
```bash
npx remotion render src/index.ts GoldenQuantumCore projects/golden_test/renders/GOLDEN_QUANTUM_CORE_MASTER.mp4
```

### 3. Synthesize Voice with Gemini Audio API
```bash
python projects/golden_test/audio/synthesize_golden_voice.py
```

### 4. Run TypeScript Check
```bash
npx tsc --noEmit
```

---

## 🛡 Mandatory Pre-Flight Checklist

Before any production composition is submitted, it must verify:
- [x] Persian narration spoken at $\ge 125\text{ WPM}$ (Target $130 - 165\text{ WPM}$).
- [x] Speech generated exclusively via Google Gemini TTS (`Puck`).
- [x] Single persistent world canvas with zero unmotivated scene resets.
- [x] Active physical screen elements strictly $\le 5$.
- [x] Visual transformations governed by `AuthoredKeyframeEngine`.
- [x] Camera movement strictly motivated by physical forces or recoil.
- [x] Minimum 1.5s intentional stillness at climax resolution.
- [x] Persian text stripped of diacritics and locked to whole integer coordinates.
- [x] `test_voice_speed.py` and `test_slideshow_signatures.py` both report **PASS**.

---

## 📄 License
Internal Production Skill — Medical Research Committee. All rights reserved.
