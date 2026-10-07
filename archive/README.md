# Historical Archive (V1 → V39)

This archive houses the R&D iterations, experimental motion laboratories, and historical showcases that preceded the consolidated V40.1 production architecture.
In accordance with the consolidation charter:
> **Preserve capabilities, not historical clutter.**

---

## Historical Version Registry

### V1 – V2: Apoptosis Scientific 9:16 Pilot
* **VERSION:** V1.0 – V2.1
* **PURPOSE:** Initial exploration of vertical 9:16 scientific storytelling on cancer cell death.
* **KEY CAPABILITY:** Multi-layer visual stack (Ambient Mesh -> CameraRig Content -> Color Grade -> Grain).
* **WHAT IT TAUGHT US:** Vertical framing requires distinct visual weight and strict camera motion limits.
* **SUPERSEDED BY:** 16:9 widescreen editorial architecture (V4+).
* **LOCATION:** `archive/legacy_projects/apoptosis_cancer_9_16/`

---

### V3 – V5: Physical Motion Design & Stress Tests
* **VERSION:** V3.1 – V5.5
* **PURPOSE:** Testing spring physics, early Persian font rendering, and quality gate definitions.
* **KEY CAPABILITY:** First automated QA frame difference checks; 6-gate checklist.
* **WHAT IT TAUGHT US:** Generic springs without mass damping look floaty; Persian fonts need custom baseline handling.
* **SUPERSEDED BY:** V18 Motion Benchmarks & V25 Motion Fidelity Engine.
* **LOCATION:** `archive/legacy_projects/persian_editorial_motion_test_v3_3` to `v5_5`

---

### V6 – V10: Broadcast Editorial Motion Masters
* **VERSION:** V6 – V10
* **PURPOSE:** Testing full-length (80s+) Persian editorial narratives.
* **KEY CAPABILITY:** Continuous scene sequencing and audio timeline synchronization.
* **WHAT IT TAUGHT US:** Full-length continuous video cannot be built by manually animating 2500 individual frames; requires declarative beat architecture.
* **SUPERSEDED BY:** V19 Director Shot Plan & V21 Choreography Event Graph.
* **LOCATION:** `archive/legacy_projects/persian_editorial_motion_test_v6` to `v10`

---

### V11 – V15: Reference-Driven Motion Recipe Galleries
* **VERSION:** V11 – V15
* **PURPOSE:** Deconstructing elite motion design references into reusable React/Remotion recipes.
* **KEY CAPABILITY:** Motion recipes (Dot to Line, Ring Tunnel, Type Slam, Axis Collapse).
* **WHAT IT TAUGHT US:** Motion recipes look great in isolated 4-second galleries, but look like random disconnected toys unless bound by a coherent narrative world.
* **SUPERSEDED BY:** `src/motion/recipes/` and Sovereign Calibration Pavilion.
* **LOCATION:** `archive/legacy_projects/v11_motion_lab`, `v13_motion_gallery` to `v15_motion_gallery`

---

### V16 – V17: Deterministic Persian Pronunciation & Prosody System
* **VERSION:** V16 – V17
* **PURPOSE:** Resolving Persian TTS mispronunciations and syncing motion to acoustic pitch and cadence.
* **KEY CAPABILITY:** Prosodic beat types (`vocalStress`, `pitchContour`, `speechCadence`), diacritics injection.
* **WHAT IT TAUGHT US:** Feeding diacritics directly into the visual UI corrupts typography. Phonetic spoken text must be strictly decoupled from visual display text.
* **SUPERSEDED BY:** Dual-Script Architecture (`src/typography/persianSanitizer.ts`) and Google Gemini TTS.
* **LOCATION:** `archive/legacy_projects/persian_editorial_motion_test_v16` to `v17`

---

### V18: Ben Kaufman Benchmark Suites
* **VERSION:** V18
* **PURPOSE:** Replicating studio-grade motion benchmarks (Kinetic Type Slam, Geometric Ribbon, Shape Morph to Data, Ring Tunnel Depth).
* **KEY CAPABILITY:** High-velocity anticipation, contact squash, and multi-track contact sheets.
* **WHAT IT TAUGHT US:** Authored easing curves beat mathematical spring formulas for dramatic impact.
* **SUPERSEDED BY:** V27 Authored Keyframe Engine.
* **LOCATION:** `archive/legacy_projects/v18_motion_benchmarks/`

---

### V19 – V25: Motion Fidelity & Kinematic Reasoning
* **VERSION:** V19 – V25
* **PURPOSE:** Formalizing velocity continuity, 8 motion personalities (Rigid, Heavy, Elastic, Fluid, Explosive, Glide, Mechanical, Light), and shape morphing.
* **KEY CAPABILITY:** `MotionFidelityEngine.ts` (C0/C1/C2 continuity).
* **WHAT IT TAUGHT US:** Preserving exit velocity across cuts creates the illusion of a single continuous world.
* **SUPERSEDED BY:** `src/motion/fidelity/` and `src/transition/carryTransitions.ts`.
* **LOCATION:** `archive/legacy_projects/persian_editorial_motion_test_v19/`

---

### V26 – V30: Precision Labs (Bounce, Transformation & 3D Extrusion)
* **VERSION:** V26 – V30
* **PURPOSE:** Isolated mathematical labs for gravitational bounce, 2D to 3D slicing, and creative direction.
* **KEY CAPABILITY:** `PhysicalBounceRecipe.ts` and `TransformationContinuityEngine.ts`.
* **WHAT IT TAUGHT US:** Volume conservation ($scaleX \cdot scaleY = 1$) makes 2D vector transforms feel physical.
* **SUPERSEDED BY:** Integrated production core (`src/motion/`).
* **LOCATION:** `archive/legacy_labs/`

---

### V31 – V38: Visual Causality, Showreels & BAND Symposium Masterpiece
* **VERSION:** V31 – V38
* **PURPOSE:** Testing 2D-to-3D gyroscopic extrusion, continuous world canvases, and titanium materiality on real symposium briefs.
* **KEY CAPABILITY:** Gyroscopic perspective projection, CAD-grade titanium lighting language.
* **WHAT IT TAUGHT US:** Highly successful motion aesthetic; proved that vector SVGs in Remotion can achieve broadcast 3D quality without heavy WebGL pipelines.
* **SUPERSEDED BY:** Sovereign Calibration Pavilion in V40.1.
* **LOCATION:** `archive/legacy_labs/`

---

### V39: Band Kaf Full Production Test (The Slideshow Failure)
* **VERSION:** V39
* **PURPOSE:** First end-to-end 90-second production attempt for Band Kaf with audio, SFX, and narration.
* **KEY CAPABILITY:** 11-Act structure and script timings.
* **WHAT IT TAUGHT US (CRITICAL AUDIT):**
  1. Failed into a slide-per-sentence / card-per-condition PowerPoint structure.
  2. Degraded into Edge-TTS `fa-IR-FaridNeural` robotic voice.
  3. Displayed messy Arabic diacritics directly on screen.
  4. Faded to black between acts, destroying visual continuity.
* **SUPERSEDED BY:** V40.1 Kinetic Monolith Single World Architecture.
* **LOCATION:** `archive/experiments/v39/`
