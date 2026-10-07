---
name: cinematic-motion-director
description: "AI Cinematic Video Production Pipeline: Universal Semantic Beat Mapping, VisualStateGraph Transformation Planning, Anti-Slideshow Enforcement, Element Budgeting, Natural Conversational Persian TTS, Motivated Camera Grammar, Zero-Subpixel-Jitter Typography, and Blind Adversarial Quality Review for Remotion/React."
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

---

## 2. Mandatory Production Pipeline

```text
[DIRECTOR: PLANNING & VISUAL STATE GRAPH]
1. Ingest script and synthesize audio via Google Gemini TTS (`voice-doctrine.md`).
2. Run `VOICE_SPEED_GATE`: Verify natural conversational delivery (130–165 WPM).
3. Map script to semantic beats; assign exactly ONE primary visual job per beat.
4. Construct the `VisualStateGraph` and write `docs/SHOTBOOK.md`.
5. Run `REMOVAL_TEST_GATE`: Purge all non-essential decorative elements.
6. [GATE 1 PAUSE]: Present SHOTBOOK to user for explicit approval before coding.
        ↓
[BUILDER: REMOTION IMPLEMENTATION]
7. Construct persistent 3D world canvas using vector SVG and CSS 3D transforms.
8. Implement physical transformations using `AuthoredKeyframeEngine.ts`.
9. Enforce Mass Conservation: Shape A physically morphs, unlatches, or unfolds into B.
10. Apply Motivated Camera Grammar: Camera moves ONLY to track consequence or absorb seismic impact.
11. Apply Dual-Script Persian Typography: `displayText` strictly sanitized via `persianSanitizer.ts`.
        ↓
[INDEPENDENT BLIND REVIEW]
12. Render video master (`.mp4`) with stem-mixed audio.
13. Submit rendered MP4 and audio to Blind Reviewer (without developer claims or self-scores).
14. Reviewer evaluates against the 14-Point Rubric and checks for Hard Fail Conditions.
15. If classified as "Slideshow" or "Static with Camera Movement" $\to$ REPAIR IMMEDIATELY.
        ↓
[TECHNICAL QC & DELIVERY]
16. Run automated test suite: `npx tsc --noEmit`, CV freeze check, audio LUFS (-16 LUFS).
17. Final delivery with verified artifact.
```

---

## 3. Hard Fail Conditions (Disqualifications)

Regardless of technical compilation or average numerical scores, a production **FAILS IMMEDIATELY** if any of the following exist:
1. **Slideshow Signature Dominance (`ANTI_SLIDESHOW_GATE`):** Two or more signatures (S1–S8 in `references/anti-slideshow.md`) are present.
2. **Slow / Robotic Voice (`VOICE_SPEED_GATE`):** Speech rate falls below 125 WPM, speech sounds ceremonial/stately, or edge-tts/robotic voice was used.
3. **Camera Zoom as Fake Motion:** Camera moves while subject remains motionless.
4. **Text-Only Event:** Major narrative beat animated solely by text fading in or springing words.
5. **Excessive Visual Clutter:** Unmotivated telemetry, random numbers, or decorative particles present.
6. **Orphan Elements:** Graphic items lingering on screen after their narrative utility ended.
7. **Generic Dissolves:** Scene transitions relying on generic fades rather than physical momentum-carry or spatial reframing.
8. **Diacritics on Screen:** Raw Arabic/Persian diacritics rendered in visual display typography.

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
TRANSFORMATION      : [Physical mechanism: Unfolding | Slicing | Telescoping | Docking]
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

## 5. Voice Synthesis & Audio Mandates

1. **Google Gemini TTS Only:** Voiceover synthesized exclusively via `gemini-2.5-flash-preview-tts` (voice `Puck`). Falling back to Edge-TTS is an immediate disqualification.
2. **Conversational Academic Pace:** Prompt instruction must mandate fluent, energetic, conversational Persian (Target: 140–165 WPM, Minimum: 125 WPM).
3. **Audio Mastering:** Master voiceover normalized to EBU R128 (-16 LUFS) with dynamic background music ducking (-14 dB under vocal phrases).

---

## 6. Reference Library

- [Single Authoritative Motion Doctrine](references/motion-doctrine.md)
- [Single Authoritative Voice Doctrine](references/voice-doctrine.md)
- [Anti-Slideshow Signatures & Detection](references/anti-slideshow.md)
- [Causal Planning & Relational Choreography](references/causal-planning.md)
- [Anti-Patterns Catalog](references/anti-patterns.md)
- [Cinematography & Motivated Camera Grammar](references/cinematography.md)
- [Voice Director & Google Gemini TTS Authority](references/voice-director-and-persian-tts.md)
