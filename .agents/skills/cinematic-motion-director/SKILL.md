---
name: cinematic-motion-director
description: "AI Cinematic Video Production Pipeline: Universal Semantic Beat Mapping, VisualStateGraph Transformation Planning, Anti-Slideshow Enforcement, Element Budgeting, Mandatory User Voice Selection, Two-Stage Persian TTS (Microsoft Edge-TTS Preview + Quota-Aware Google Gemini Audio Final with Priority Fallback), Motivated Camera Grammar, Zero-Subpixel-Jitter Typography, and Blind Adversarial Quality Review for Remotion/React."
---

# cinematic-motion-director

An enterprise motion-graphics directing system for Google Antigravity + Remotion.
Transforms scripts, scientific concepts, and educational briefs into publication-grade cinematic motion pictures.

---

## 1. Core Principles (The Hierarchy of Visual Design)

Every visual and motion decision follows this strict priority:
```text
1. NARRATIVE PURPOSE          (What thought must be communicated?)
2. SEMANTIC TRANSFORMATION    (How does the visual entity physically become that thought?)
3. PHYSICAL/SPATIAL CAUSALITY (What ancestor force or object caused this state change?)
4. MOTION CHOREOGRAPHY        (Authored acceleration, velocity handoff, inertia, settle)
5. CAMERA PARTICIPATION       (Does the camera follow consequence, absorb shock, or reframe?)
6. DECORATIVE MOTION          (STRICTLY LAST: Micro-accents, rim flashes, subtle textures)
```

### The Inviolable Creeds:
- **Motion exists because something changes.** Nothing moves merely to prevent a static frame.
- **Decorative motion must NEVER compensate for an absence of visual transformation.** A camera zoom on a static card is NOT cinematic motion.
- **A text-only event is NOT a cinematic event.** Fading in text or springing words into a card is forbidden as a primary visual event.
- **Persistent World by Default:** Narratives unfold within one continuous, persistent physical or architectural world canvas rather than clearing the stage every 4 seconds.
- **Voice Selection & Two-Stage Audio Doctrine:** Narration uses a zero-quota **Microsoft Edge-TTS** preview (`fa-IR-FaridNeural` / `fa-IR-DilaraNeural`) for initial motion and timing validation. Upon explicit user approval, final audio is generated via **Google Gemini Multimodal Audio** with strict model priority fallback (`gemini-3.8-flash-tts` -> `gemini-3.8-flash-lite-tts` -> `gemini-3.1-flash-tts-preview`) using approved voices (`Puck` or `Callirrhoe`).

---

## 2. Mandatory Production Pipeline

```text
[DIRECTOR: PLANNING & VISUAL STATE GRAPH]
1. [MANDATORY GATE 0: VOICE SELECTION]: Ask user to select from approved Gemini voices (Puck / Callirrhoe). DO NOT proceed until answered!
1.5 [MANDATORY GATE 0.5: COLOR PALETTE SELECTION]: Propose 3 topic-tailored color palettes (e.g. Bio-Emerald, Neon Obsidian, Cyber Amber) plus custom write-in via ask_question. The Visual World, Lighting, Materials, Conduits, and HUD strictly inherit this chromatic DNA across all acts.
1.6 [MANDATORY GATE 0.6: ART DIRECTION & MULTI-STYLE SELECTION]: Propose 5 curated art style paradigms (Modern Glassmorphic, Stop-Motion Paper Cutout, Painterly Watercolor, Technical Blueprint, Neo-Brutalist) via ask_question with multi-select support. Users can select a single unified style or map distinct styles across narrative acts. Enforces full-atmosphere background derivation, frame-rate quantization (12 FPS for stop-motion), tactile edges, paper drop-shadows, and blueprint CAD grids via AtmosphereThemeDeriver.
2. Stage 1: Synthesize motion-validation preview sample via Microsoft Edge-TTS (fa-IR-FaridNeural / DilaraNeural). ZERO Gemini quota consumed.
3. Render Edge-TTS preview video for user approval of motion, pacing, camera flight, and typography.
4. Upon explicit user approval ("تأیید"): Transition to Stage 2: Monolithic Gemini TTS synthesis with strict quota fallback (gemini-3.8-flash-tts -> gemini-3.8-flash-lite-tts -> gemini-3.1-flash-tts-preview). Enforce Gate 0.4.2: Mandatory surgical stripping of Gemini tail buffer overrun via `strip_gemini_trailing_artifact` (backward scan for silence valley preceding the trailing 150ms 25,000-peak PCM burst, 40ms cosine fade-out, 120ms zero padding). Guarantee 100% mathematical zero tail amplitude (RMS=0.0) at waveform boundaries. Recalibrate exact video frame boundaries to measured Gemini audio duration.
5. Map script to semantic beats; assign exactly ONE primary visual job per beat.
6. [MANDATORY VISUAL WORLD HARD-GATE]: Plan `VisualWorld` and `ArtDirectionContract` via `VisualWorldPlanner` (`schemas/visual-world.schema.json`). Establish Hero Identity, Visual Hierarchy (PRIMARY, SECONDARY, TERTIARY, ENVIRONMENT), Depth Model, Composition Contract, and concrete Art Direction. Validate with `VisualWorldValidator.validate`. Reject vague buzzwords via `ArtDirectionAmbiguityGate`.
   * **Cinematic Pipeline Enforcement:** The cinematic compilation pipeline (`MotionGraphCompiler.compileCinematicGraph` and `MotionPlanner.planCinematicScene`) strictly requires `visualWorld`. Compilation without a validated VisualWorld is rejected with `VISUAL_WORLD_REQUIRED`.
   * **Legacy Low-Level API Distinction:** Low-level `compileGraph()` / `planScene()` is reserved exclusively for historical Phase 1–4B engine unit tests. The Cinematic Production agent MUST compile via `compileCinematicGraph()`.
7. [MANDATORY MATERIAL RESPONSE CONTRACT (PHASE 5B.1)]: Establish concrete `MaterialReference` for all focal actors in `world.materials`. Objects are not generic SVG vectors; their material identity (`PLASMA`, `METAL`, `ORGANIC`, `GLASS`, `ENERGY`, `SMOKE`, `LIQUID`, `STONE`, `CELESTIAL`) dictates surface, edge, deformation, light, emission, and causal `motionResponses` for each `MotionVerb`. Validate with `MaterialValidator.validate`. Reject vague buzzwords via `MaterialAmbiguityGate` (`MATERIAL_DIRECTION_AMBIGUOUS`). Missing hero material strictly fails compilation with `MATERIAL_REQUIRED`.
8. [MANDATORY LIGHTING & LIGHT RESPONSE CONTRACT (PHASE 5B.2)]: Establish concrete `LightingContract` in `world.lighting`. Light has explicit purpose, direction (`UPPER_LEFT`, `UPPER_RIGHT`, etc.), intensity, color, softness, and causal material interaction (`MaterialLightInteraction`). Enforce `LightingValidator.validate` (V-L1 to V-L12). Reject vague buzzwords ('cinematic lighting', 'premium lighting') or CSS drop-shadows/glows pretending to be lighting via `LightingAmbiguityGate` (`LIGHTING_DIRECTION_AMBIGUOUS`). Missing hero lighting strictly fails compilation with `LIGHTING_REQUIRED`.
9. [MANDATORY SPATIAL DEPTH & 2.5D ARCHITECTURE CONTRACT (PHASE 5C)]: Establish concrete `SpatialDepthContract` in `world.spatial`. Objects must not live on a flat canvas; they occupy normalized coordinates $(x \in [-1, 1], y \in [-1, 1], z \in [0, 1])$, discrete depth bands (`FOREGROUND`, `MIDGROUND`, `HERO_PLANE`, `BACKGROUND`, `DEEP_BACKGROUND`), machine-readable spatial relationships (`IN_FRONT_OF`, `BEHIND`, `CONTAINS`, `SURROUNDS`, `ORBITAL_AROUND`, etc.), coherent occlusion intent (`PARTIAL`, `FRAMING`, `TRANSLUCENT_VEILING`), and motion-aware Z-plane responses (`TOWARD_VIEWER`, `AWAY_FROM_VIEWER`, `MULTI_DEPTH_CONVERGENCE`, etc.). Enforce `SpatialDepthValidator.validate` (V-D1 to V-D14). Reject vague buzzwords ('make it 3D', 'more depth', 'make it pop') or fake CSS drop-shadow/blur depth tricks via `SpatialAmbiguityGate` (`DEPTH_DIRECTION_AMBIGUOUS`). Missing hero spatial placement or depth collapse strictly fails compilation with `SPATIAL_REQUIRED`, `DEPTH_COLLAPSE_DETECTED`, or `SPATIAL_INVALID`.
10. Construct `MotionSceneGraph` bound to `VisualWorld` and write `docs/SHOTBOOK.md`.
11. Run `REMOVAL_TEST_GATE`: Purge all unmotivated decorative elements. (Rule: MORE ELEMENTS ≠ BETTER CINEMATIC QUALITY).
12. [GATE 1 PAUSE]: Present SHOTBOOK and Visual World to user for explicit approval before coding.
        ↓
[BUILDER: FULL-FIDELITY STUDIO IMPLEMENTATION (UNIVERSAL STUDIO PIPELINE)]
13. [PRE-FLIGHT ASSET VERIFICATION]: Ensure `public/fonts/YekanBakh/`, `public/music/` (`Tech_Live.mp3` or `Brain_Dance.mp3`), and `public/sfx/` are present in the target project. If absent, copy them immediately from the skill's `template/public/`.
14. [STUDIO COMPONENT CONSTRUCTION]: Build the cinematic composition directly based on the certified master architecture of `UniversalStudioShowreel.tsx` / `SkillIntroShowreel.tsx`:
    - PERSISTENT 2.5D WORLD (`PersistentWorld`): Single unbroken coordinate stage (`perspective: 1200`) hosting all narrative acts across discrete coordinates ($X_1=0, X_2=1800, X_3=3600, X_4=4754$).
    - 6-DOF VIRTUAL CAMERA RIG: Continuous multi-axis tracking (`camX`, `camY`, `camZ`), isometric tilts (`camPitch: -1.8°`, `camYaw: 2.2°`), dynamic banking rolls (`camRoll: ±3.5°`), and velocity blur/skew during transitions.
    - NEWTONIAN ATTRACTOR SWARMS: Deploy `<NewtonianAttractorSwarm>` across all acts (18–20 particles per act, style-matched palette) orbiting active vector cores with beat-breathing physics.
    - ATMOSPHERE & LIGHTING: Layer `<AtmosphericBackdrop>` and `<StyleAwareAtmosphereLayer>` behind the scene.
    - STUDIO AUDIO & BEAT-GRID: Include `<Audio src={staticFile('music/Tech_Live.mp3')} />` with `calculateBeatPulse` (softened amplitude 0.002 to 0.0045) and dynamic voice ducking.
    - TOPOLOGICAL VECTOR MORPHING: Utilize `DynamicVectorCatalog`, structured `VerbTemplates` motion primitives, and `<UniversalVectorMorphCard>` / `PersianVectorMorphCard` driven by `@remotion/paths`'s `interpolatePath`.
    - DUAL-SCRIPT PERSIAN TYPOGRAPHY: All Persian text sanitized via `persianSanitizer.ts`, rendered with official `Yekan Bakh` font weights.
15. DO NOT fall back to low-level abstract SVG wireframe generators (`MotionGraphCompiler`, raw `PersistentWorld` fallback AST, or bare `VerbTemplates`) for production videos; wireframe compilers are strictly reserved for internal engine unit tests. Production videos must always be rich, component-driven, and cinematic.
        ↓
[INDEPENDENT BLIND REVIEW]
18. Render video master (`.mp4`) with stem-mixed audio.
19. Submit rendered MP4 and audio to Blind Reviewer (without developer claims or self-scores).
20. Reviewer evaluates against the 14-Point Rubric and checks for Hard Fail Conditions.
21. If classified as "Slideshow" or "Static with Camera Movement" → REPAIR IMMEDIATELY.
        ↓
[TECHNICAL QC & DELIVERY]
22. Run automated test suite: `npx tsc --noEmit`, CV freeze check, audio LUFS (-16 LUFS).
23. Final delivery with verified artifact.
```

---

## 2.1 The Claude Motion Studio Paradigm (Component-Driven Studio Architecture)

To match and exceed the visual fidelity of Anthropic's **Claude Motion** (October 2026) and official Remotion design benchmarks, the skill integrates a high-impact, modular component library alongside the semantic compiler:

### A. Architectural Philosophy: Visual Richness vs AST Gatekeeper
- **The Pitfall:** Over-relying strictly on abstract mathematical AST validators produces sterile geometric wireframes because compilers optimize for validation rules rather than visual aesthetics.
- **The Modern Claude Workflow:** Combines narrative precision with pre-crafted, glassmorphic, physics-driven Remotion components (`src/motion/library/`):
  1. `AtmosphericBackdrop`: Multi-layer volumetric radial lighting, perspective grid with horizon vanishing point, and floating depth-bokeh constellations.
  2. `GlassContainer`: Frosted glass cards (`backdropFilter: blur(18px)`, specular top highlight, micro-borders) with smooth spring-based entry/hover physics.
  3. `KineticTypography`: Staggered word-by-word spring reveals (`KineticHeadline`), radiant gradient spans (Cyan/Indigo/Purple), glowing status badge pills (`BadgePill`), and clean subtitles (`SubtitleCallout`).
  4. `MetricCard` & Visualizers: Real-time numeric count-up animations (`0` to target with easing curves), circular animated gauges (`CircularGauge`), and spring-loaded horizontal comparison bars (`BarChartVisualizer`).
  5. `FlowDiagram`: Declarative architecture nodes, high-contrast SVG cubic bezier conduits, and traveling luminous energy pulses (comet core + radiant diffuse aura).
  6. `OrganicLiquidGooey`: SVG threshold filtering (`feGaussianBlur` + `feColorMatrix`) enabling visceral button press squash-and-stretch with dynamic satellite micro-droplets and cellular mitotic division/fusion.

### B. High-Fidelity Claude Motion Recipes (`src/motion/recipes/` & `src/motion/claude/`)
The skill provides plug-and-play recipes modeled directly after viral Claude Opus 5.5 and Dribbble showcase interactions:
1. **`MorphingUIRecipe` (Single Shape Morphing):**
   - Continuously preserves topological identity across 4 states without stage clearing:
     `Action Button (260x64) -> Spinner Ring (64x64) -> Success Seal (72x72) -> Expanded Telemetry Card (560x220)`
   - Uses zero-jitter spring transitions and glowing reactive drop-shadows.
2. **`SaaSMotionRecipe` (2.5D Perspective Product Launch):**
   - Full 3D browser chrome window with perspective tilting (`perspective(1200px) rotateX(14deg) rotateY(-8deg)`).
   - Animated SVG sparkline area chart, live numeric interpolation (`+418% vs Baseline`), and real-time swarm agent monitor.
3. **`ClaudeFluidShowreel` (Flagship 15.0s One-Take Masterpiece):**
   - **Zero Sequence Chopping:** All narrative acts execute on a single, persistent 2.5D world canvas.
   - **Continuous 6-DOF Virtual Camera:** Continuous pan, dolly, pitch, and banking roll tracking across the full 450 frames.
   - **Living Energy Conduit ("The Red Thread"):** A persistent luminous focal particle/streamer that never leaves the screen, physically guiding the viewer's gaze and transferring kinetic momentum between acts.
   - **Topological Docking:** When transitioning, Act 3's 2.5D SaaS window docks to the left flank while Act 4's 100% Circular Precision Gauge expands on the right flank, forming a unified, balanced grand pavilion.

### C. Spring Physics & Motion Doctrine
- Always author motion with Remotion `spring()` rather than linear or stepped interpolation:
  `spring({ fps, frame, config: { damping: 14, mass: 0.8, stiffness: 120 } })`
- **Continuous Sub-Motion:** Every active scene must maintain subtle life (floating bokeh drift, conduit energy traveling pulses, ambient gradient breathing).
- **Staggered Delays:** Never pop elements simultaneously. Stagger by 3–6 frames to establish visual hierarchy.

### D. Single-Take Camera Continuity vs Discrete Sequence Chopping
- **The Core Flaw:** Nesting independent cards inside isolated `<Sequence>` tags creates a "slideshow presentation" feel because each sequence unmounts and wipes the stage.
- **The Claude Opus Standard:** Maintain one continuous spatial world. When moving between narrative acts, move the **Virtual Camera** or translate elements across the continuous stage. Connect every transition with a physical momentum vector or living energy conduit.

### E. Semantic Music & Beat-Grid Synchronization Doctrine (`src/motion/audio/SemanticMusicDirector.ts`)
- **Content-Aware Music Matching:** Never use arbitrary or synthetic sine-wave tones. The audio engine classifies script keywords via `detectMusicDomain()` to select from studio-mastered tracks (`ai_future_tech` / `Brain_Dance.mp3` @ 124 BPM, `fintech_saas` / `Tech_Live.mp3` @ 124 BPM, `academic_research` / `Cipher2.mp3` @ 150/75 BPM, `medical_biotech` @ 92 BPM).
- **Quantized Beat-Snapping (`quantizeToBeat`):** Major visual events, camera whip-pans, cursor clicks, and vector morphs MUST snap to musical quarter-note or 8th-note grid points ($t = \frac{60}{\text{BPM}} \times \text{FPS}$).
- **Dynamic Sidechain Ducking:** BGM ducks automatically by 35%–45% during transients, cursor clicks, and narration to keep sound effects crisp without mud.
- **Pristine Studio SFX:** All transitional whooshes, clicks, and chimes must use standardized, -3dB normalized WAV assets (`@remotion/sfx` + `Kenney UI Audio`). Pre-roll whooshes 3–5 frames before visual climax so the sonic apex lands directly on the cut.

### F. Procedural Generative Mathematics Doctrine (`src/motion/library/ProceduralGenerativeMotifs.tsx`)
- In addition to standard cards and text, focal actors must feature living mathematical vector geometry:
  1. `LissajousOrbit`: Real-time trigonometric multi-frequency orbiting knot ($x = A\sin(a\theta + \delta), y = B\sin(b\theta)$) with glowing beacon trails.
  2. `ParametricWaveformStream`: Living harmonic wave superposition ($\sum A_i \sin(\omega_i t + \phi_i)$) for data telemetry and vital signs.
  3. `KineticGridMatrix`: Perspective-warped coordinate grid with pulsing crosshair intersections.

---

## 3. Hard Fail Conditions (Disqualifications)

Regardless of technical compilation or average numerical scores, a production **FAILS IMMEDIATELY** if any of the following exist:
1. **Unauthorized Voice / Bypassed Selection Gate (`VOICE_SELECTION_GATE`):** Beginning visual production, timing lock, or narration before explicit user voice selection (Puck vs Callirrhoe), bypassing the Gemini quota-aware priority hierarchy (3.8 Flash -> 3.8 Flash-Lite -> 3.1 Flash Preview), or attempting unauthorized fallback to robotic third-party engines.
2. **Slow / Robotic Voice (`VOICE_SPEED_GATE`):** Speech rate falls below 115 WPM, speech sounds ceremonial/stately, or robotic fallback voice was used.
3. **Slideshow Signature Dominance (`ANTI_SLIDESHOW_GATE`):** Two or more signatures (S1–S8 in `references/anti-slideshow.md`) are present.
4. **Camera Zoom as Fake Motion:** Camera moves while subject remains motionless.
5. **Text-Only Event:** Major narrative beat animated solely by text fading in or springing words.
6. **Excessive Visual Clutter:** Unmotivated telemetry, random numbers, or decorative particles present.
7. **Orphan Elements:** Graphic items lingering on screen after their narrative utility ended.
8. **Generic Dissolves:** Scene transitions relying on generic fades rather than physical momentum-carry or spatial reframing.
9. **Diacritics on Screen:** Raw Arabic/Persian diacritics rendered in visual display typography.
10. **Ambiguous / Flat Visual World (`VISUAL_WORLD_GATE`):** Visual World lacking a primary persistent Hero, collapsing all elements into a single flat plane without explicit flat composition justification, or relying on empty aesthetic buzzwords ('cinematic', 'premium') rejected by `ArtDirectionAmbiguityGate`.
11. **Missing or Contradictory Material Contract (`MATERIAL_GATE`):** Hero entity lacking an established `MaterialReference` in `world.materials`, declaring internal physical contradictions (e.g. `METAL` with `FLUID` deformation), or relying on decorative buzzwords ('premium material', 'glowy'). Compilation strictly blocked with `MATERIAL_REQUIRED` or `MATERIAL_INVALID`.
12. **Missing, Ambiguous, or Contradictory Lighting Contract (`LIGHTING_GATE`):** Cinematic scene lacking an established `LightingContract` in `world.lighting`, Hero lacking a meaningful `MaterialLightInteraction`, declaring physical contradictions (e.g. `METAL` with diffuse wrapping or `PLASMA` with sharp specular mirror reflection), or relying on decorative buzzwords ('cinematic lighting', 'premium lighting') or CSS drop-shadow/glow pretending to be lighting. Compilation strictly blocked with `LIGHTING_REQUIRED`, `LIGHTING_DIRECTION_AMBIGUOUS`, or `LIGHTING_INVALID`.
13. **Missing, Ambiguous, or Collapsed Spatial Depth Contract (`DEPTH_GATE`):** Cinematic scene lacking an established `SpatialDepthContract` in `world.spatial`, Hero entity lacking a concrete spatial placement with numeric $z \in [0, 1]$, depth collapse where all major entities share identical or nearly identical depth ($|z_{max} - z_{min}| < 0.05$), incoherent physical occlusion ($z_{occluding} \ge z_{occluded}$), or relying on decorative buzzwords ('make it 3D', 'cinematic depth', 'make it pop') or CSS drop-shadow/blur pretending to be depth. Compilation strictly blocked with `SPATIAL_REQUIRED`, `DEPTH_DIRECTION_AMBIGUOUS`, `DEPTH_COLLAPSE_DETECTED`, or `SPATIAL_INVALID`.

---

## 4. Directing Methodology: The Shotbook Specification

Before implementing Remotion JSX, the director must author `docs/SHOTBOOK.md`. Every shot entry must strictly follow this schema:

```text
SHOT ID             : [e.g. SHOT_01_CALIBRATION]
DURATION            : [Start Frame — End Frame, Duration in Seconds]
SEMANTIC BEAT       : [Narration line and core idea being communicated]
PRIMARY VISUAL JOB  : [Hook | Define | Benchmark | Compare | Escalate | Climax | Resolve]
HERO ELEMENT        : [The single primary actor, e.g. Monolith Core]
SUPPORTING ELEMENTS : [Max 1-2 items cooperating directly with hero]
CURRENT STATE       : [Physical appearance before transformation]
TRIGGER             : [Auditory or narrative catalyst]
TRANSFORMATION      : [Core Motion Verb: SPLIT | EXPAND | TRAVEL | COLLAPSE | MORPH | MERGE | DEFORM | REASSEMBLE]
DESTINATION STATE   : [Physical appearance after transformation]
CONSEQUENCE         : [Downstream force or reaction transmitted to secondary node]
MOTION OWNER        : [Primary: Hero element, Secondary: Foundation rail]
CAMERA PURPOSE      : [Follows momentum | Absorbs shock | Cranes out to reveal assembly]
TRANSITION IN       : [Motion-carry entrance from preceding shot]
TRANSITION OUT      : [Velocity vector handoff into succeeding shot]
AUDIO EVENT         : [SFX impact / servo transient synchronized within ±2 frames]
ELEMENTS TO DELETE  : [List of elements that must exit or be absorbed to satisfy budget]
```

If `TRANSFORMATION` is `NONE`, the director must provide written justification under `JUSTIFIED STILLNESS` (e.g. 1.5s post-impact reading window).

---

## 5. Voice Synthesis & Audio Mandates (Edge-TTS Preview + Quota-Aware Gemini Architecture)

1. **Two-Stage Architecture (Preview vs Production):**
   - **Stage 1 (Validation Preview):** Microsoft Edge-TTS (`fa-IR-FaridNeural`) generates complete preview narration for testing motion graphics, camera pacing, scene transitions, and visual composition. **Consumes ZERO Gemini quota.**
   - **Stage 2 (Final Production):** Google Gemini Multimodal Audio API generates master production audio **ONLY after explicit user approval of the motion design**.
2. **Approval State Machine Enforcement:**
   - Production follows this strict state progression:
     `DRAFT -> EDGE_PREVIEW_GENERATING -> EDGE_PREVIEW_READY -> WAITING_USER_APPROVAL`
   - User Decision Paths:
     - **REVISION:** Modify motion or script; re-render Edge Preview. (If script unchanged, reuse cached Edge audio with 0 TTS calls). **Gemini remains strictly blocked.**
     - **CANCEL:** Halt production.
     - **APPROVE:** Transition to `GEMINI_PREFLIGHT -> GEMINI_VOICE_APPROVAL -> GEMINI_FINAL_GENERATION -> FINAL_TIMING_CALIBRATION -> FINAL_RENDER -> DONE`.
3. **Strict Ban on Pre-Approval Gemini Execution:**
   - BEFORE explicit user approval of the Edge Preview, the agent MUST NOT send any Gemini requests, test any Gemini models, or execute Gemini preflight.
4. **Independent Artifact Separation:**
   - Preview audio: `public/audio/preview/edge/{video_id}_preview_voice.wav`
   - Final audio: `public/audio/final/gemini/{video_id}_master_voice.wav`
   - Preview video render: `renders/preview/{video_id}_preview_edge.mp4`
   - Final video render: `renders/final/{video_id}_final_gemini.mp4`
5. **Final Timing Recalibration:**
   - Edge Preview audio duration != Gemini final audio duration.
   - Upon Gemini audio generation, actual WAV duration is measured (`measure_wav_duration`), and Remotion timeline/frame counts are recalculated with Gemini actual duration as the absolute **Source of Truth**.
6. **Gemini Fixed Priority Hierarchy & Quota Fallback:**
   - **Priority 1 (Default / Highest Quality):** `gemini-3.8-flash-tts`
   - **Priority 2 (First Quota Fallback):** `gemini-3.8-flash-lite-tts` (Used ONLY upon authentic quota failure of Priority 1)
   - **Priority 3 (Final Quota Fallback):** `gemini-3.1-flash-tts-preview` (Used ONLY upon authentic quota failure of Priorities 1 & 2)
   - If Priority 3 also encounters quota exhaustion: Halt immediately with `GeminiTTSQuotaError`.
7. **Zero Speculative Probing Doctrine:** Never probe models in advance. Send live request to Priority 1; fallback only on authentic quota exhaustion (HTTP 429, `RESOURCE_EXHAUSTED`, `GenerateRequestsPerDayPerProjectPerModel-FreeTier`).
8. **Mandatory User Voice Selection:** Prompt user before generation:
   - **`Puck`** — مردانه (رسمی، پرانرژی، مدرن و پویا)
   - **`Callirrhoe`** — زنانه (طبیعی، آرام، صمیمی و روان)
9. **One Video = One Request Doctrine:** Monolithic narration request for full video. No per-scene splitting.
10. **Audio Mastering:** EBU R128 (-16 LUFS Integrated, True Peak < -1.0 dBFS) with -14 dB background music ducking.

---

## 6. Persian Typography & Font System Mandate

1. **Standard Typeface — Yekan Bakh (یکان باخ):** All Persian typography, labels, titles, and captions must use **Yekan Bakh** as the primary font family (`'YekanBakh', 'Yekan Bakh', sans-serif`).
2. **Global Font Assets Location:** The complete suite of 8 Yekan Bakh web font weights (`.woff2`) is stored persistently in the skill at:
   `assets/fonts/` (and `template/public/fonts/`)
   - `YekanBakh-Thin.woff2` (Weight 100)
   - `YekanBakh-Light.woff2` (Weight 300)
   - `YekanBakh-Regular.woff2` (Weight 400 - Body)
   - `YekanBakh-SemiBold.woff2` (Weight 600 - Captions/Badges)
   - `YekanBakh-Bold.woff2` (Weight 700 - Titles/Headlines)
   - `YekanBakh-ExtraBold.woff2` (Weight 800 - Hero Display)
   - `YekanBakh-Black.woff2` (Weight 900)
   - `YekanBakh-ExtraBlack.woff2` (Weight 950)
3. **Usage in Remotion Projects:**
   - Any session initializing or rendering a Remotion composition must ensure `public/fonts/` contains these Yekan Bakh files (copied from the skill's `assets/fonts/` if not present) and that `fonts.css` is loaded.
   - All text styling must inherit `theme.fonts.persian` or `'YekanBakh'`.
4. **Zero-Subpixel Jitter:** Text coordinates must be rounded to whole integer pixels (`Math.round()`); use `clipPath` reveals instead of font scaling (`scaleX`/`scaleY`).

---

## 7. Claude Opus 5.5 Fluid Motion & Vector Morphing Mandate

To match the visual fluidity and art-direction quality of viral **Claude Opus 5.5** motion pictures, the following architectural rules are mandatory:

1. **Genuine SVG Path Morphing (`@remotion/paths`):**
   - Box resizing (`div` width/height interpolation) is **strictly banned** as a standalone morphing technique.
   - All primary shape morphs must use `@remotion/paths`'s `interpolatePath(progress, pathA, pathB)` to perform smooth cubic bezier interpolation between distinct vector topologies (e.g. Geometric Insignia $\to$ Neural Synaptic Core $\to$ Telemetry Wave $\to$ Calibration Shield).
   - Vector strokes and checkmarks must be drawn using `evolvePath(progress, path)`.
   - Reusable recipe: `src/motion/recipes/PersianVectorMorphRecipe.tsx`.

2. **One-Take 6-DOF Virtual Camera Continuity:**
   - Discrete scene unmounting or slideshow-style sequence wiping is strictly prohibited.
   - All narrative acts must unfold within a persistent 2.5D/3D coordinate stage (`perspective: 1200`).
   - The virtual camera executes continuous multi-axis translation (`camX`, `camY`, `camZ`) and rotation (`camPitch`, `camYaw`, `camRoll`) across all acts.

3. **The Living Energy Conduit ("The Red Thread"):**
   - A high-energy luminous focal particle with trailing glow must remain visible across transitions.
   - It acts as the causal trigger: orbiting hero badges, diving into vector morphing cores, tracing real-time sparklines, and executing 360° orbital locks around precision calibration gauges.

4. **Persian RTL Layout Discipline:**
   - Layouts must enforce `direction: 'rtl'` with correct reverse flex alignment (`row-reverse` where appropriate).
   - All text strings must pass through `sanitizeForDisplay(text)` from `src/typography/persianSanitizer.ts`.

5. **Organic Liquid Elasticity & Metaball Surface Tension (`OrganicLiquidGooey`):**
   - Interactive components and morphing nuclei must utilize SVG threshold filtering (`feGaussianBlur` + `feColorMatrix`).
   - Clicks must trigger elastic squash-and-stretch with dynamic satellite micro-droplets that re-merge via surface tension (`LiquidButtonSquash`).
   - Topological state morphs must feature mitotic division and viscous fusion (`LiquidMitosisCore`), adapting shader traits across all 5 active Art Styles.

6. **Universal Infinite Spatial Canvas Architecture (`InfiniteSpatialCanvas`):**
   - Stacking scenes at $(0, 0)$ and relying on opacity cross-fades is **strictly prohibited**.
   - All narrative acts must occupy discrete 3D world coordinates ($X_1 = 0, X_2 = 1500, X_3 = 3000, X_4 = 4300$) on an infinite spatial stage.
   - The virtual camera executes continuous spline dolly glides with dynamic banking roll ($\pm 3.5^\circ$), maintaining physical co-presence of adjacent scenes during transitions.

7. **Multi-Stage Topology Stepper & Vector Prominence:**
   - Multi-phase vector morphology must feature a visual stage milestone stepper (`MultiStageVectorStepper`) illuminating active nodes so viewers clearly comprehend the transformation roadmap.
   - Vector cores must feature minimum 220–240px sizing with radial transition shockwaves.

8. **Zero-to-Video Semantic Motion Compiler (`ZeroToVideoCompiler` & `create-motion-video` CLI):**
   - Instant compilation from high-level topics to broadcast-ready Remotion manifests.
   - Automatically maps subject matter to 124 BPM rhythm grids, selects harmonious 5-color palettes, assigns topological vector glyphs, and structures 4 narrative acts.
   - CLI execution: `npx ts-node --project tsconfig.json cli/create-motion-video.ts --topic "Your Topic"`.

9. **Dynamic Vector Catalog (`DynamicVectorCatalog`):**
   - High-precision parametric SVG path coordinates across 7 specialized scientific/technology domains:
     - `NEURAL_SYNAPSE` (AI, Machine Learning, Brain Computing)
     - `DNA_HELIX_ORBIT` (Genetics, Medicine, Biotechnology)
     - `QUANTUM_ORBITALS` (Physics, Nanotechnology, Deep Science)
     - `EXPONENTIAL_CHART` (Fintech, SaaS Metrics, Economic Growth)
     - `SECURITY_SHIELD` (Cybersecurity, Verification, Protocol Safety)
     - `STELLAR_OCTAGRAM` (Architectural Symmetry, Core Foundations)
     - `CIRCUIT_CHIP` (Semiconductors, Hardware, Robotics)

10. **Newtonian Vector Attractor Swarm Physics (`NewtonianAttractorSwarm`):**
    - Deterministic, zero-garbage gravitational orbital engine around active vector cores.
    - Features airy, delicate density (18–20 particles per act), harmonic beat-breathing expansion, and radial click-shockwave dispersion.

11. **Kinetic Data Visualization Suite (`KineticDataViz`):**
    - Style-aware data charting components with peak caps, live decimal rolling (`KineticMetricCounter`), and circular radial progress gauges (`KineticRadialProgress`).

---

## 8. Reference Library

- [Claude Opus 5.5 Fluid Continuity & One-Take Camera](references/claude-fluid-continuity.md)
- [Claude Opus 5.5 Viral Prompt Catalog](references/claude-opus-prompt-catalog.md)
- [Official Remotion Agent Skills & Code Standards](references/remotion-agent-skills.md)
- [Mandatory Voice Selection & ElevenLabs TTS Protocol](references/voice-selection.md)
- [Single Authoritative Voice Doctrine](references/voice-doctrine.md)
- [Single Authoritative Motion Doctrine](references/motion-doctrine.md)
- [Anti-Slideshow Signatures & Detection](references/anti-slideshow.md)
- [Causal Planning & Relational Choreography](references/causal-planning.md)
- [Anti-Patterns Catalog](references/anti-patterns.md)
- [Cinematography & Motivated Camera Grammar](references/cinematography.md)
- [Voice Director & Persian TTS Authority](references/voice-director-and-persian-tts.md)


