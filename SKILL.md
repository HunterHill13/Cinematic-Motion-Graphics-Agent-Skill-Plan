---
name: cinematic-motion-director
description: "AI Cinematic Video Production Pipeline: Universal Semantic Beat Mapping, VisualStateGraph Transformation Planning, Anti-Slideshow Enforcement, Element Budgeting, Mandatory User Voice Selection, Two-Stage Persian TTS (Microsoft Edge-TTS Preview + Quota-Aware Google Gemini Audio Final with Priority Fallback), Motivated Camera Grammar, Zero-Subpixel-Jitter Typography, and Blind Adversarial Quality Review for Remotion/React."
---

# cinematic-motion-director

Enterprise motion-graphics directing system for Remotion and React.
Transforms scripts, scientific concepts, and educational briefs into broadcast-grade cinematic motion pictures.

---

## 1. Core Principles (The Hierarchy of Visual Design)

Every visual and motion decision follows this strict priority:
```text
1. NARRATIVE PURPOSE          (What idea must be communicated?)
2. SEMANTIC TRANSFORMATION    (How does the visual entity physically become that thought?)
3. PHYSICAL/SPATIAL CAUSALITY (What force or interaction caused this state change?)
4. MOTION CHOREOGRAPHY        (Authored spring physics, momentum handoff, inertia, settle)
5. CAMERA PARTICIPATION       (Does the camera follow momentum, absorb shock, or reframe?)
6. DECORATIVE ACCENTS         (STRICTLY LAST: Micro-accents, rim flashes, subtle textures)
```

### Core Invariants:
- **Motion exists because something changes.** Nothing moves merely to prevent a static frame.
- **Decorative motion must never compensate for absent visual transformation.** A camera zoom on a static card is not cinematic motion.
- **A text-only event is not a cinematic event.** Fading in text or springing words into an empty card is forbidden as a primary visual event.
- **Persistent World Canvas:** Narratives unfold within one continuous, persistent 2.5D/3D world canvas (`perspective: 1200`) rather than clearing the stage between scenes.
- **Open-Canvas Doctrine:** All elements live directly on the open canvas separated by volumetric light pools and 3D depth parallax. Outer rectangular container cards and persistent corner HUD clutter are prohibited.
- **Pure Speech & Ducked Musical Soundtrack (Zero-SFX):** Audio consists strictly of clear Persian narration ducking a rhythmic, tempo-matched musical soundtrack. Foley sound effects are prohibited.

---

## 2. Production Workflow

Follow this linear production sequence:

```text
[PHASE 1: PLANNING & SELECTION]
1. Select Template Archetype & Palette:
   - Present the 9 Master Archetypes with preview links (see references/archetype-catalog.md).
   - Prompt user via `ask_question` (or recommend the optimal archetype in chat if ask_question is unavailable).
2. Voice Selection (Two-Stage TTS Architecture):
   - Stage 1 Preview: Synthesize narration via Microsoft Edge-TTS (`fa-IR-FaridNeural` or `fa-IR-DilaraNeural`). Zero API quota consumed.
   - Stage 2 Final: Upon user approval, synthesize master audio via Google Gemini Multimodal Audio (`Puck` or `Callirrhoe`) with quota fallback (`gemini-3.8-flash-tts` -> `gemini-3.8-flash-lite-tts` -> `gemini-3.1-flash-tts-preview`).
3. Author Shotbook (`docs/SHOTBOOK.md`):
   - Map script to semantic beats, assigning one primary visual transformation per shot.

[PHASE 2: COMPONENT CONSTRUCTION]
4. Verify Assets:
   - Ensure `public/fonts/` (Yekan Bakh suite & `fonts.css`) and `public/music/` (`Tech_Live.mp3`, `Brain_Dance.mp3`, `Cipher2.mp3`) are present.
5. Build Scene Compositions:
   - Deploy `UniversalCinematicStage.tsx` with `UniversalCameraRig` and `UniversalSoundDirector`.
   - Use `PersianKineticText` for headlines/metrics (word-level stagger, ligature-safe).
   - Wire spring physics strictly from `SPRING_PRESETS` and `ARCHETYPE_SPRING_PRESETS`.
   - Snap transition cuts to musical beats using `snapToBeat()`, while spoken words maintain natural narration cadence.
   - If `invoke_subagent` is available, orchestrate 3 parallel subagents: ChoreographyArchitect, SceneBuilder, and AdversarialQACritic.

[PHASE 3: REVIEW & TECHNICAL DELIVERY]
6. Render Preview & Extract QC Frames:
   - Render preview video and extract keyframes at beat drops and act transitions (see references/visual-qc-contact-sheet.md).
7. Execute Automated Audits:
   - `npx tsx tests/test_claude_motion_standards.ts`
   - `npx tsx tests/test_scene_transition_diversity.ts`
   - `npx tsx tests/test_open_canvas_and_sfx_audit.ts`
   - `npx tsc --noEmit`
8. Deliver Master Video (`.mp4`) with stem-mixed audio.
```

---

## 3. Hard Fail Conditions (Immediate Rejection)

A production fails quality review if any of the following occur:
1. **Slideshow Signature:** Wrapping an entire act in a bordered rectangular card (`HERO_CONTAINER_DEFECT`).
2. **Corner Clutter:** Placing persistent section headers, university names, or telemetry text in viewport corners.
3. **Camera Zoom as Fake Motion:** Moving the camera while the visual subject sits completely static.
4. **Text-Only Event:** Major narrative beat animated solely by text fading in without visual transformation.
5. **Persian Ligature Break:** Character-level splitting of Persian text (`text.split('')`), disfiguring connected cursive letters.
6. **Subtitles / Sentence Captions:** Rendering full spoken sentence transcripts on screen instead of structural kinetic keywords.
7. **Homogeneous Transitions:** Using the same transition archetype across consecutive acts.
8. **Subpixel Jitter:** Unrounded coordinates on settled text, or using CSS `@keyframes` / `transition`.

---

## 4. Numerical Standards & Contracts

### 4.1 Spring Physics Matrix (`src/motion/physics/SpringPhysicsMatrix.ts`)
| Visual Role | Mass | Stiffness | Damping | $\zeta$ (Damping Ratio) | Settle (30fps) | Clamp | Easing / Physical Feel |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Hero 3D Sculpture (`HERO_SCULPTURE_ENTRANCE`)** | `0.60` | `85` | `13` | `0.91` | `11 frames` | No | Graceful entry with subtle settle |
| **Kinetic Word Stagger (`TYPOGRAPHY_WORD_STAGGER`)** | `0.50` | `140` | `15` | `0.90` | `8 frames` | **Yes** | Crisp, dignified unroll, 0 loose oscillation |
| **Status Badge / Pill (`STATUS_BADGE_PILL`)** | `0.45` | `160` | `12` | `0.71` | `9 frames` | No | Snappy pop with instant engagement |
| **Metric Counter / Bar (`METRIC_COUNTER_OVERSHOOT`)** | `0.85` | `115` | `12` | `0.61` | `17 frames` | No | Confident weight with slight metric bounce |
| **Constellation Sub-Node (`CONSTELLATION_NODE_STAGGER`)** | `0.70` | `125` | `11` | `0.59` | `15 frames` | No | Buoyant, airy floating node entrance |
| **Transition Directional Fling (`TRANSITION_EXIT_FLING`)**| `0.90` | `130` | `14` | `0.65` | `15 frames` | No | High-momentum directional whip on exit |
| **Elastic Pop & Slam (`ELASTIC_POP_SLAM`)** | `0.75` | `180` | `12` | `0.52` | `15 frames` | No | Controlled explosive arrival with elasticity |

### 4.2 Per-Archetype Spring Personalities (`ARCHETYPE_SPRING_PRESETS`)
| Template Archetype | Mass | Stiffness | Damping | $\zeta$ | Settle | Clamp | Physical Personality |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `DARK_GRAPHITE_TECH` | `0.60` | `90` | `14` | `0.95` | `10f` | No | Polished keynote launch glide |
| `CONTINUOUS_UI_MORPH` | `0.55` | `120` | `16` | `0.98` | `8f` | No | Viscous fluid single-element morph |
| `QUANTUM_BIO_DEEP_Z` | `0.65` | `75` | `9` | `0.64` | `17f` | No | Underdamped, buoyant bio-resonance |
| `KINETIC_ARCHITECTURAL_TYPO` | `0.90` | `140` | `18` | `0.80` | `12f` | **Yes** | Heavy structural masonry dead-stop |
| `BENTO_GRID_SAAS` | `0.50` | `130` | `15` | `0.93` | `8f` | No | Crisp modular tile snap |
| `FINTECH_TRADING` | `0.45` | `170` | `13` | `0.74` | `8f` | No | High-frequency Wall Street tick response |
| `STOP_MOTION_PAPER` | `0.80` | `210` | `28` | `1.08` | `7f` | **Yes** | High-damping tactile paper fold |
| `TECHNICAL_BLUEPRINT` | `0.50` | `160` | `22` | `1.23` | `5f` | **Yes** | Engineering CAD drafting snap |
| `NEO_BRUTALIST` | `0.75` | `190` | `12` | `0.50` | `15f` | No | High-voltage punch with rebound |
| `STUDIO_SHOWREEL` | `0.60` | `85` | `13` | `0.91` | `11f` | No | Balanced flagship showcase curve |

### 4.3 Timing Ratios & Transition Overlap
- **Act Lifecycle Ratios:** Entrance = 18%, Narrative Hold & Focus = 68%, Outro = 14%.
- **Transition Overlap Cap:** $\text{overlapFrames} = \min(16, \max(8, \text{Math.round}(\text{actDuration} \times 0.14)))$.
- **Beat Snapping Formula:** $\text{framesPerBeat} = \frac{60}{\text{BPM}} \times \text{FPS}$. Major visual cuts snap via `snapToBeat()`.
- **Land-on-Beat Timing:** Calculate start frame via `calculateLandOnBeatStartFrame(targetBeatFrame, settleFrames)` so the settle lands directly on the beat.

### 4.4 Composition 3D Depth Layer Budget (`COMPOSITION_DEPTH_BUDGET`)
| Depth Plane | Z-Min | Z-Max | Max Blur | Functional Assignment |
| :--- | :---: | :---: | :---: | :--- |
| `BACKGROUND` | `-600` | `-300` | `8px` | Atmospheric backdrop mesh, horizon grid |
| `DEEP_MIDGROUND` | `-250` | `-50` | `3px` | Inactive acts, secondary constellation conduits |
| `HERO_PLANE` | `0` | `0` | **`0px`** | Active focal actor, typography, metrics (100% sharp focus) |
| `FOREGROUND_OVERLAY` | `+50` | `+150` | `4px` | Passing orbital sparks, depth flares (Zero corner HUD) |
| `LIGHT_VOLUMETRIC` | `+200` | `+350` | `14px` | Laser sweep blades, specular light flares |
*Note:* Global camera and act stations travel across world coordinates ($Z=0 \to 4800$), while local element depth offsets within any act station are bounded by $[-600, +350]\text{px}$.

### 4.5 Legibility Floors & Safe Areas
- **Minimum Font Sizes:**
  - Badges / Pills: $\ge 24\text{px}$ (16:9), $\ge 28\text{px}$ (9:16)
  - Body / Subtitles: $\ge 32\text{px}$ (16:9), $\ge 40\text{px}$ (9:16)
  - Card / Feature Titles: $\ge 52\text{px}$ (16:9), $\ge 64\text{px}$ (9:16)
  - Primary Hero Titles: $\ge 92\text{px}$ (16:9), $\ge 112\text{px}$ (9:16)
  - Monumental Impact Words: $\ge 140\text{px}$ (16:9), $\ge 168\text{px}$ (9:16)
- **9:16 Mobile Reel Safe Areas:** Top 8% margin and bottom 14% margin reserved for platform UI overlays. All primary content resides within the central 78% vertical safe zone.
- **Reading Time Standard:** Allocate `0.25` to `0.30` seconds per Persian word for reading comprehension.
- **Contrast Ratios (WCAG):** Minimum `4.5:1` for body copy; minimum `3:1` for display headlines.

### 4.6 Premier Studio Craft Standards (Apple, Linear, Vox, Claude Opus 5.5)
- **Anticipation (Pre-Coil):** Explosive reveals must execute 3–5f negative recoil ($2\% \text{ to } 6\%$) via `studioAnticipationSpring()` before forward release.
- **Volume-Preserving Deformation:** Vertical compressions preserve total volume ($S_x \cdot S_y \cdot S_z = 1.0$) via `calculateSquashAndStretch()`.
- **Decoupled Camera Crane Dynamics:** Camera translations use floating-point `.toFixed(2)` coordinates with active velocity-proportional motion blur (`cam.motionBlur`) and centrifugal banking roll.
- **Voice-Synchronized Semantic Highlighting:** Spoken keywords illuminate dynamically with radiant glow (`textShadow`) and micro-scale ($1.05$) via `PersianKineticText`'s `semanticHighlights` without breaking cursive ligatures.
- **Filmic Dither:** Backdrops render 3.5% procedural SVG dither to eliminate 8-bit CSS gradient Mach color banding.

---

## 5. Dynamic Scene Transitions & Camera Grammar

To prevent transition monotony, every act transition must select from the 5 certified archetypes with chained 3D coordinates:

1. **`CAMERA_SPATIAL_FLIGHT` (Co-Present Camera Glide):**
   - Coordinates advance by `(+1420, 0, 0)` for Whip Pan Right, `(-1420, 0, 0)` for Left, `(0, +920, 0)` for Crane Down, `(0, -920, 0)` for Crane Up.
   - **Co-Presence Rule:** Both outgoing and incoming scenes remain 100% visible inside the viewport during camera flight connected by an animated 3D SVG bridge conduit.
2. **`ELEMENT_KINETIC_DISPERSE` (Stationary Camera + Staggered Fling):**
   - Camera stays stationary `(0, 0, 0 delta)`. Outgoing children fling off-screen with staggered delays (`idx * 3` frames), and incoming children pop in with elastic overshoot.
3. **`DEEP_Z_ZOOM_THROUGH` (3D Portal Dive):**
   - Coordinates advance by `(0, 0, -1600)`. Outgoing hero visual scales up like an opening aperture (`1.0 -> 3.4x`) while camera plunges straight into the incoming scene.
4. **`TOPOLOGICAL_ANCHOR_MORPH` (Stationary Camera + Core Flip):**
   - Camera stays stationary `(0, 0, 0 delta)`. The central hero element executes a 180° Y-axis flip while context nodes collapse and re-expand.
5. **`KINETIC_LIGHT_SWEEP` (Stationary Camera + Laser Blade Wipe):**
   - Camera stays stationary with a 2-frame vertical recoil micro-shake ($\pm 3\text{px}$) while a luminous vertical laser blade sweeps across the canvas with synchronized polygon reveal.
- **Anti-Monotony Guard:** No two consecutive act transitions in a story manifest may use the same archetype.

---

## 6. Reference Library

For detailed specifications, see the on-demand references:
- [Template Archetype Catalog](references/archetype-catalog.md) — Visual identities, color palettes, and preview links for all 9 archetypes.
- [Component Recipes & Motion Primitives](references/component-recipes.md) — Implementation details for typography, vector morphing, and backdrops.
- [Visual QC & Contact Sheet Inspection](references/visual-qc-contact-sheet.md) — Still-frame sampling and review checklist.
- [Anti-Slideshow Rules](references/anti-slideshow.md) — Signatures of slide-deck defects and prevention strategies.
- [Voice Director & Persian TTS Authority](references/voice-director-and-persian-tts.md) — Voice selection and audio mastering standards.
