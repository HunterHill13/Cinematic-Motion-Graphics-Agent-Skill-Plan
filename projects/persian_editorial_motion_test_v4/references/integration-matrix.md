# V4.1 Integration Matrix: Reuse-First Architecture

## 1. Overview & Reuse Hierarchy
Following the core directive of **V4.1 (DISCOVER → INSPECT → REUSE → ADAPT → COMPOSE → VERIFY → ONLY THEN BUILD NEW)**, this matrix maps all motion design, camera, typographic, visual data, and audio capabilities to proven existing implementations in `_research/video-shotcraft` and our verified V3.x foundations.

```
Priority 1: Existing project verified components (Audio STEM mixer, Persian phonetic dictionary)
Priority 2: _research/video-shotcraft recipes & demos (Camera 2.5D, Needle Sweep Gauge, Tracking Expand, Line Carry Transition)
Priority 3: _research/claude-skill-motion-graphics & remotion-skills (Spring presets, easing curves)
Priority 4: Adapted Compositions (Bilingual typography, Iranian institutional palette & insignia)
Priority 5: Brand New Code (STRICTLY FORBIDDEN unless no recipe exists)
```

---

## 2. Capability Mapping Matrix

| Capability Category | Target Visual Effect in Film | Source Implementation / Recipe | Source Path | Action | Adaptation Details |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Motion Primitives** | Non-linear easing, clamped segment progress, deterministic PRNG | `Motion.tsx` | `_research/video-shotcraft/demos/_fixtures/Motion.tsx` | **Direct Reuse** | Import `E`, `seg`, `lerp`, `rand`, `useT`, `DesignStage` into `src/motion/Motion.ts`. |
| **Camera: 2.5D Depth** | Multiplane parallax camera, perspective travel, focal lock | `PageCam2D.tsx` & `depth-layer-moves` | `_research/video-shotcraft/demos/_fixtures/PageCam2D.tsx` & `demos/camera/depth-layer-moves/` | **Adapt** | Adapt `PageCam2D` to institutional editorial canvas with 3 depth planes (background coordinate grid at 0.35x, midground document slate at 0.7x, foreground golden seal at 1.4x). |
| **Typography: Opening** | Letter-spacing expansion without layout jitter | `TrackingExpandReveal.tsx` | `_research/video-shotcraft/demos/typography/type-assembly-moves/TrackingExpandReveal.tsx` | **Adapt** | Adapt fixed letter-spacing + glyph `translateX` to RTL Persian header («بند کاف») & English institutional subtitle with blur dissipation and opacity ramp. |
| **Data: Metric Gauges** | Dynamic circular gauge needle sweep with overshoot & spring settle | `NeedleSweepSelftest.tsx` | `_research/video-shotcraft/demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx` | **Adapt** | Adapt 3-gauge array to represent real Ministry of Health criteria thresholds: Clinical PhD (16 pts), Master's (65 pts), PhD (110 pts), Medicine/Dentistry (130 pts). |
| **Transition: Spatial Relay** | Continuous line-drawn boundary & camera track ("Catch Me If You Can") | `LineCarryTransition.tsx` | `_research/video-shotcraft/demos/transition/line-carry-transition/LineCarryTransition.tsx` | **Adapt** | Replace rectangular card with Iranian ministerial insignia/crest geometric boundary morphing into criteria card. Zero slideshow cuts. |
| **Typography: Stagger** | Staggered kinetic typography with velocity curve | `WordRelayFilmstrip.tsx` & `SplitTextStagger.tsx` | `_research/video-shotcraft/demos/typography/` | **Direct Reuse** | Per-word sequential reveal with physics momentum for legal article recital. |
| **Audio: Voice Engine** | Natural Persian TTS with modular provider abstraction & phonetic normalization | Modular `VoiceProvider.ts` + Persian Phonetic Dict | `projects/persian_editorial_motion_test_v3_3/` & `src/audio/` | **Adapt & Deepen** | Standardize `VoiceProvider` interface (supports `EdgeTtsProvider` & `HumanVoiceProvider` fallback). Strict separation between phonetic synthesis and clean on-screen display. |
| **Audio: Score & Stem Mixing** | Institutional pulse soundtrack + automated -14dB voice ducking + synced SFX | Custom Stem Mixer & Institutional Science Pulse | `projects/persian_editorial_motion_test_v3_3/audio/` | **Direct Reuse** | Layered STEMs: `voice.wav`, `music.wav`, `sfx.wav` with sub-frame hit alignment for gauge snaps, line reveals, and stamps. |
| **Quality Control** | Automated frame extraction, contact sheet generation, motion vector & audio analysis | QC test suite & Python validation | `scripts/` & `qc/` | **Direct Reuse** | 2-tier quality gate (Proof of Quality Gate first, then Master sequence gate). |

---

## 3. Strict Prohibitions (Anti-Patterns Blocklist)
1. **NO UI/HTML Card Grids**: Elements must NOT appear as web dashboards or bootstrap cards.
2. **NO Handheld Camera Shake**: Banned as per `aesthetic-rules.md` (Q3). Camera moves only with narrative purpose (linear tracking, orbit, or dolly).
3. **NO Decorative Jitter**: No random noise filters added to mask static content.
4. **NO Slideshow Crossfades**: Crossfades between static scenes are banned. Transitions must carry momentum, geometry, or camera translation.
5. **NO Unanchored Floating Cards**: Flying elements must land into structural editorial coordinates (`aesthetic-rules.md` Q9).
