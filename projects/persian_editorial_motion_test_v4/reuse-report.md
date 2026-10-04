# V4.1 Reuse-First Architecture & Engineering Report

## 1. Executive Summary
In alignment with the core directive of **V4.1 (DISCOVER → INSPECT → REUSE → ADAPT → COMPOSE → VERIFY → ONLY THEN BUILD NEW)**, this production release eliminates greenfield rewrites and superficial "Director" component bloating. Instead, proven motion design recipes and camera math from `_research/video-shotcraft` were discovered, inspected, adapted, and composed into an Iranian scientific motion graphics film.

---

## 2. Inventory of Reused Assets & Capabilities

### A. Motion Primitives & Easing Engine
- **Source**: `_research/video-shotcraft/demos/_fixtures/Motion.tsx`
- **Reused Component**: `projects/persian_editorial_motion_test_v4/src/motion/Motion.tsx`
- **Core Capabilities Leveraged**:
  - `E`: Complete dictionary of mathematical easing functions (`outExpo`, `inOutCubic`, `outBack`, `spring`, `poly(5)`).
  - `seg(t, t0, t1, ease)`: Normalized segment progress primitive enabling sub-frame timeline choreography without layout jumps.
  - `lerp(t, a, b)`: Continuous linear interpolation for coordinate calculations.
  - `rand(seed)`: Deterministic pseudo-random numbers ensuring 100% reproducible frame rendering.

### B. 2.5D Multiplane Camera System
- **Source**: `_research/video-shotcraft/demos/_fixtures/PageCam2D.tsx` & `demos/camera/depth-layer-moves/`
- **Reused Component**: `projects/persian_editorial_motion_test_v4/src/camera/PageCam2D.tsx`
- **Adaptation**:
  - Configured 3 depth planes:
    - Layer 0 (0.35x parallax, 2px blur): Institutional coordinate mesh.
    - Layer 1 (0.7x parallax, sharp focus): Primary narrative graphics (Decree seal, gauges, pillars, ethics crest).
    - Layer 2 (1.4x parallax, 3px blur): Atmospheric golden particles.
  - **Eliminated Defect**: Handheld camera shake completely banned as per `aesthetic-rules.md` (Q3). Camera motions are restricted to purposeful tracking and perspective panning.

### C. Kinetic Typography & Tracking Expansion
- **Source**: `_research/video-shotcraft/demos/typography/type-assembly-moves/TrackingExpandReveal.tsx`
- **Reused Component**: Integrated into `Shot1_MinisterialDecree.tsx` & `Shot7_GrandAssembly.tsx`
- **Motion Craft**:
  - Replaced browser layout-reflow `letter-spacing` (which causes jitter) with a constant container letter-spacing and per-glyph `transform: translateX` offsets.
  - Coordinated with optical blur dissipation (10px $\to$ 0px) and quintic out-curve (`poly(5)`).

### D. Data Visualization & Precision Gauge Readouts
- **Source**: `_research/video-shotcraft/demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx`
- **Reused Component**: `projects/persian_editorial_motion_test_v4/src/shots/Shot2_ScoreGauges.tsx`
- **Adaptation**:
  - Adapted the 270° dial math to Iranian Ministry of Health academic criteria: Clinical PhD (16 pts), Master's (65 pts), PhD (110 pts), Medicine/Dentistry (130 pts).
  - Physical inertia: 12f outward cubic sweep, 8° overshoot return, and 7f spring settle with synchronized mechanical tick SFX.

### E. Kinematic Transition ("Catch Me If You Can" Line Carry)
- **Source**: `_research/video-shotcraft/demos/transition/line-carry-transition/LineCarryTransition.tsx`
- **Reused Component**: `projects/persian_editorial_motion_test_v4/src/shots/Shot3_LineCarryPillars.tsx`
- **Eliminated Defect**: Slideshow crossfades completely eliminated. A vector line shoots across the screen matching camera translation, turns 90° right angles to draw the structural boundary of the 4 Evaluation Pillars, and allows cards to bloom inside their slots (`aesthetic-rules.md` Q9).

### F. Metric Oscilloscope Stream & Candidate Swarm
- **Sources**:
  - `_research/video-shotcraft/demos/data/chart-live-moves/OscilloscopeStreamV2.tsx` (adapted in `Shot4_PaperEvaluation.tsx`)
  - `_research/video-shotcraft/demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx` (adapted in `Shot6_CandidateSwarm.tsx`)
  - `_research/video-shotcraft/demos/transition/circle-match-iris.md` (adapted in `Shot5_EthicsGate.tsx`)
  - `aesthetic-rules.md` Q8 ("Press Conference Group Photo") (adapted in `Shot7_GrandAssembly.tsx`)

---

## 3. Audio & Voice Architecture Refactoring
- Standardized `VoiceProvider` interface (`EdgeTtsProvider` with phonetic diacritics & `HumanVoiceProvider` fallback).
- Synthesized clean stems: `voice.wav`, `music.wav`, `sfx.wav` with automated $-14\text{ dB}$ voice ducking.
- Strict separation between phonetic synthesis text (`tts_text`) and on-screen clean typography (`display_text`).
