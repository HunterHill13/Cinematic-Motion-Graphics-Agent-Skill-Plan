# V10_MOTION_SYSTEM_UPGRADE.md — Hybrid Motion-System Architecture

## 1. RESEARCH & ADAPTATION MATRIX

Mapping proven open-source motion agent skills (`awesome-claude-video-skills`) into our production codebase:

```text
┌───────────────────────────────┬──────────────────────────────────┬──────────────────────────────────────────────┬─────────────────────────────────────────────┐
│ REFERENCE SKILL               │ REFERENCE CONCEPT                │ WHAT TO REUSE IN V10                         │ WHAT NOT TO IMPORT                          │
├───────────────────────────────┼──────────────────────────────────┼──────────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 1. feitangyuan/onetake        │ One continuous camera &          │ Continuous kinetic momentum across all shots;│ Do not import WebGL/Three.js overhead.      │
│                               │ kinetic lineage between beats.   │ handoff contracts between outgoing/incoming. │ Keep Remotion SVG/CSS transforms.           │
├───────────────────────────────┼──────────────────────────────────┼──────────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 2. echris6/motion-video-kit   │ Standardized Motion Recipes      │ Formal Motion Recipes: `IMPACT_AND_RIPPLE`,  │ Do not copy SaaS demo screen recording UI   │
│                               │ and automated Critic Loop.       │ `TRAVEL_AND_HANDOFF`, `SPLIT_AND_CONVERGE`.  │ or product tour modals.                     │
├───────────────────────────────┼──────────────────────────────────┼──────────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 3. Vincentwei1021/            │ Deterministic word/phrase audio  │ Audio-driven deterministic timeline          │ Do not import external cloud STT APIs;      │
│    video-talkcraft            │ timestamp alignment.             │ (`voiceTimeline.json`) with frame accuracy.  │ use local ffprobe/silencedetect truth.      │
├───────────────────────────────┼──────────────────────────────────┼──────────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 4. iart-ai/motion-skills &    │ Deliver-and-verify Critic Loop,  │ Two-tier visual inspection; automated        │ Do not import generic TikTok/Reels vertical │
│    motion-design-skills       │ spring physics & subordinate     │ sync delta check (±2 to ±4 frames).          │ templates or meme assets.                   │
│                               │ secondary motion.                │                                              │                                             │
├───────────────────────────────┼──────────────────────────────────┼──────────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 5. remotion-dev/skills        │ Programmatic React/Remotion      │ Exact `interpolate`, `Easing`, and           │ Do not regenerate Remotion boilerplate      │
│                               │ performance and hygiene.         │ `Sequence` duration accounting.              │ from scratch.                               │
└───────────────────────────────┴──────────────────────────────────┴──────────────────────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 2. THE DIAGNOSIS OF V9

### The Problem: Lack of Semantic Relationships
In V9, visual richness increased, but elements often moved as isolated animations rather than interacting actors:
- A bracket was just framing text without an impact trigger.
- A satellite dot was orbiting without physical reason.
- The traveling spark occasionally felt like a particle roaming without clear semantic consequence.
- **Audio/Visual Timing Desynchronization:** Spoken phrases in Shot 03 (GPA 16, Disciplinary, 6 Articles) and Shot 05 (Threshold numbers 65, 110, 130) had a 2–6 second delay between the visual arrival and the acoustic utterance.

### The V10 Law of Motion Economy:
> **"Every motion must explain, emphasize, connect, reveal, transition, or create depth. If it does none of these, remove it."**  
> **"More designed motion, not more motion."**

---

## 3. THE 4 SEMANTIC ROLES OF VISUAL ACTORS

Every graphic element on screen must strictly belong to one of four roles:
1. **ROLE A — Narrative Actor:** Direct carrier of narrative meaning (e.g., Numeral «۲», Numeral «۱۶», Official Reticle Stamp, Threshold Pillars 65/110/130, Institutional Crest).
2. **ROLE B — Motion Connector:** Connects two narrative entities or bridges shots (e.g., The Traveling Motif, Trajectory Tracks, Baseline Datum).
3. **ROLE C — State Indicator:** Signals a legal verification or milestone (e.g., The 6 article confirmation dots, Disciplinary checkmark, Benchmark lock tags).
4. **ROLE D — Spatial Texture (Subordinate):** Provides depth and register without competing for attention (e.g., 240px Cartesian grid, margin calibration marks, corner metadata).

---

## 4. FORMAL MOTION RECIPES (`src/motion/recipes/`)

Instead of arbitrary inline animations, V10 implements 6 standardized, battle-tested Motion Recipes:
- `RECIPE 01 — TRAVEL_AND_HANDOFF`: Actor travels along vector axis $\to$ strikes target $\to$ transfers velocity to outgoing handoff.
- `RECIPE 02 — IMPACT_AND_RIPPLE`: Primary monolith slams into canvas $\to$ damped harmonic baseline dip $\to$ radial shockwave $\to$ follower bracket settle.
- `RECIPE 03 — SPLIT_AND_CONVERGE`: Single kinetic entity divides into daughter decision nodes $\to$ travels along divergent tracks $\to$ recombines into singular authority.
- `RECIPE 04 — REVEAL_AND_ESCALATE`: Baseline draws $\to$ typography wipes out $\to$ secondary state indicators light up sequentially.
- `RECIPE 05 — SCAN_AND_COLLAPSE`: Scanning beacon traverses legal threshold $\to$ hits deadline boundary $\to$ collapses axis into the next spatial stage.
- `RECIPE 06 — GRAVITATIONAL_CONVERGENCE`: Dispersed data monoliths are pulled into a central coordinate attractor $\to$ critical mass detonation into the institutional seal.

---

## 5. DETERMINISTIC FRAME-ACCURATE AUDIO TIMING

Measured directly from `narration_master.wav` (48 kHz / 2361 frames @ 30 FPS):

```json
{
  "shot01_hook": { "start_frame": 0, "end_frame": 354, "speech_start": 0, "speech_end": 151, "keyword_strike": 234 },
  "shot02_decree": { "start_frame": 350, "end_frame": 650, "speech_start": 379, "numeral2_strike": 395, "speech_end": 623 },
  "shot03_criteria": {
    "start_frame": 620,
    "end_frame": 1490,
    "overview_phrase": 654,
    "c1_gpa16_strike": 855,
    "c2_stamp_strike": 1035,
    "c3_articles_strike": 1215,
    "axis_rotation": 1450
  },
  "shot04_timewindow": { "start_frame": 1460, "end_frame": 1730, "speech_start": 1476, "cutoff_strike": 1575, "collapse_frame": 1695 },
  "shot05_thresholds": {
    "start_frame": 1700,
    "end_frame": 2185,
    "intro_phrase": 1715,
    "t1_65_strike": 1914,
    "t2_110_strike": 2010,
    "t3_130_strike": 2100,
    "convergence_start": 2155
  },
  "shot06_outro": { "start_frame": 2155, "end_frame": 2361, "speech_start": 2186, "crest_detonation": 2195, "master_resolve": 2317 }
}
```
