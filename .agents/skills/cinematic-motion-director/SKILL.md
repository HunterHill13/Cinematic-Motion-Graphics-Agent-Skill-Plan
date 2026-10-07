---
name: cinematic-motion-director
description: "AI Cinematic Video Production Pipeline: Universal Semantic Beat Mapping, VisualStateGraph Transformation Planning, Anti-Slideshow Enforcement, Element Budgeting, Mandatory User Voice Selection, ElevenLabs Persian TTS Synthesis (Kaveh/Roya), Motivated Camera Grammar, Zero-Subpixel-Jitter Typography, and Blind Adversarial Quality Review for Remotion/React."
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
- **Voice Selection is a Mandatory User Decision:** No narration, timing, or visual production may begin until the user explicitly selects one of the 2 approved ElevenLabs voices (`Kaveh` or `Roya`).

---

## 2. Mandatory Production Pipeline

```text
[DIRECTOR: PLANNING & VISUAL STATE GRAPH]
1. [MANDATORY GATE 0: VOICE SELECTION]: Ask user to select from ElevenLabs voices (Kaveh / Roya). DO NOT proceed until answered!
2. Synthesize short 10-15s preflight sample via ElevenLabs (`eleven_v3`). User approves before full production.
3. Ingest script and synthesize full audio via ElevenLabs (`voice-doctrine.md`, `voice-selection.md`).
4. Run `AUDIO_QA_GATE`: Verify natural delivery (115–190 WPM), continuity, and decodability.
5. Map script to semantic beats; assign exactly ONE primary visual job per beat.
6. Construct the `VisualStateGraph` and write `docs/SHOTBOOK.md`.
7. Run `REMOVAL_TEST_GATE`: Purge all non-essential decorative elements.
8. [GATE 1 PAUSE]: Present SHOTBOOK to user for explicit approval before coding.
        ↓
[BUILDER: REMOTION IMPLEMENTATION]
9. Construct persistent 3D world canvas using vector SVG and CSS 3D transforms.
10. Implement physical transformations using `AuthoredKeyframeEngine.ts`.
11. Enforce Mass Conservation: Shape A physically morphs, unlatches, or unfolds into B.
12. Apply Motivated Camera Grammar: Camera moves ONLY to track consequence or absorb seismic impact.
13. Apply Dual-Script Persian Typography: `displayText` strictly sanitized via `persianSanitizer.ts`. Mandated font is **Yekan Bakh** (`assets/fonts/YekanBakh-*.woff2`).
        ↓
[INDEPENDENT BLIND REVIEW]
14. Render video master (`.mp4`) with stem-mixed audio.
15. Submit rendered MP4 and audio to Blind Reviewer (without developer claims or self-scores).
16. Reviewer evaluates against the 14-Point Rubric and checks for Hard Fail Conditions.
17. If classified as "Slideshow" or "Static with Camera Movement" → REPAIR IMMEDIATELY.
        ↓
[TECHNICAL QC & DELIVERY]
18. Run automated test suite: `npx tsc --noEmit`, CV freeze check, audio LUFS (-16 LUFS).
19. Final delivery with verified artifact.
```

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

## 5. Voice Synthesis & Audio Mandates (Quota-Aware Gemini Architecture)

1. **Quota-Aware Gemini TTS Engine:** Voiceover synthesized strictly via Google Gemini Multimodal Audio API (`https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}`).
2. **Fixed Model Priority Hierarchy:**
   - **Priority 1 (Default / Highest Quality):** `gemini-3.8-flash-tts` (Mandatory starting choice for all new productions).
   - **Priority 2 (First Quota Fallback):** `gemini-3.8-flash-lite-tts` (Used ONLY upon authentic quota/rate-limit failure of Priority 1).
   - **Priority 3 (Final Quota Fallback):** `gemini-3.1-flash-tts-preview` (Used ONLY upon authentic quota/rate-limit failure of Priorities 1 & 2).
   - If Priority 3 also encounters quota exhaustion: Halt production immediately with `GeminiTTSQuotaError`.
3. **Zero Speculative Probing Doctrine:**
   - NEVER call models one-by-one to "test connectivity", "compare quality", or "probe quotas".
   - Select Priority 1, send the live generation request once.
   - ONLY fallback upon authentic quota exhaustion (HTTP 429, `RESOURCE_EXHAUSTED`, `GenerateRequestsPerDayPerProjectPerModel-FreeTier`, etc.).
   - Non-quota errors (401, 403, 400 bad argument, network bugs) MUST NOT trigger fallback; fail immediately.
4. **Mandatory User Voice Selection:** Must explicitly prompt user to select between:
   - **`Puck`** — مردانه (رسمی، پرانرژی، مدرن و پویا)
   - **`Callirrhoe`** — زنانه (طبیعی، آرام، صمیمی و روان)
   Never automatically default or bypass this selection unless already answered in the active session.
5. **One Video = One TTS Request:** The entire narration of a video must be sent in exactly ONE single TTS request. Never split narration into per-scene requests. Chunking is strictly prohibited unless text exceeds technical model boundaries (>4000 characters).
6. **Preflight Sample Protocol:** Exactly ONE 10–15s sample synthesized using `CANONICAL_PREFLIGHT_TEXT` and presented to user. Full narration request occurs only after explicit user approval.
7. **Fail-Closed Security:** Read `GEMINI_API_KEY` from environment. Never commit, log, or leak the key.
8. **Default Narration Style:** Production prompt is strictly:
   `«رسمی و پرانرژی، مناسب کلیپ تبلیغاتی؛ طبیعی، روان و محاوره‌ای، با ریتم مناسب و confident delivery، بدون لحن گویندگی خشک، رسمیِ سنگین یا اغراق‌آمیز.»`
9. **Deterministic Caching:** Every successful synthesis is cached by hash (`model`, `voice`, `language`, `script_hash`, `style_hash`). Exact cache matches return local audio with 0 API calls.
10. **Actual Audio Duration Truth:** Measure duration from resulting WAV file (`measure_wav_duration`). Never rely on estimated WPM for final Remotion timeline frames. Audio mastered to EBU R128 (-16 LUFS, True Peak < -1.0 dBFS).

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

## 7. Reference Library

- [Mandatory Voice Selection & ElevenLabs TTS Protocol](references/voice-selection.md)
- [Single Authoritative Voice Doctrine](references/voice-doctrine.md)
- [Single Authoritative Motion Doctrine](references/motion-doctrine.md)
- [Anti-Slideshow Signatures & Detection](references/anti-slideshow.md)
- [Causal Planning & Relational Choreography](references/causal-planning.md)
- [Anti-Patterns Catalog](references/anti-patterns.md)
- [Cinematography & Motivated Camera Grammar](references/cinematography.md)
- [Voice Director & Persian TTS Authority](references/voice-director-and-persian-tts.md)
