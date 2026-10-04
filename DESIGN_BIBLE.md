# DESIGN_BIBLE.md — Cinematic Motion Graphics Studio Bible

## 1. Visual Language & Composition
* **Format Authority:** Native Full HD 1920×1080 @ 30 FPS, YouTube 16:9 Landscape.
* **Composition Anchor:** Always establish an explicit visual anchor before animating.
* **Negative Space:** Preserve negative space; never crowd the screen just because pixels are empty.
* **Layer Depth Hierarchy:**
  * Layer 0: Canvas Background Matrix (`#040711` + subtle radial focus).
  * Layer 1: Structural Containers / Monolith Panels (`rgba(8, 16, 34, 0.85)`).
  * Layer 2: Vector Data / Energy Highways / Numeric Benchmarks.
  * Layer 3: Typography & Callouts (Yekan Bakh with strict RTL hierarchy).

---

## 2. Motion Rules & Hierarchy
* **Primary Law:** *Animate the graphic before animating the camera.*
* **Default Camera State:**
  * Identity Transform (`cx: 960, cy: 540, zoom: 1.0, rotX: 0, rotY: 0`).
  * ZERO continuous floating, drifting, or arbitrary perspective roll.
  * Purposeful micro-pushes ($1.00 \to 1.025$) allowed only at decisive semantic lock beats.
* **Hierarchy:**
  * *Level 1 (Primary):* Core idea (main titles, primary numbers). Maximum translation 40px with `MOTION_EASINGS.editorial`.
  * *Level 2 (Secondary):* Badges, divider beams, indicators. Translation 20px with `MOTION_EASINGS.snappy`.
  * *Level 3 (Ambient):* Subtle breathing (max 1–2px), low-key glow pulses. NEVER compete with reading.

---

## 3. Transition Continuity & Hand-Off
* **Four-Phase Transition Structure:**
  $$\text{PREPARE} \to \text{TRANSFORM} \to \text{HANDOFF} \to \text{SETTLE}$$
* **Zero Hard-Cut Mandate:**
  * Consecutive scenes MUST maintain an overlapping render window of 24–45 frames.
  * Outgoing geometry must physically morph or expand into incoming geometry (e.g., circular seal collapses into vector highway; highway nodes grow into monolith columns; monoliths compress into threshold cards).
  * Outgoing scenes never unmount on an unfinished frame.

---

## 4. Typography & Voice Coordination
* **Font Integrity:** Yekan Bakh registered across all weights.
* **Content Immutability:** Canonical script is 100% immutable (zero paraphrase, zero word addition/removal).
* **Pronunciation Separation:**
  * Visible on-screen layer: Pure authentic Persian script.
  * Audio TTS layer: Handled via `pronunciation_lexicon.json` / `pronunciation_overrides.json` with phonetic guidance for Google Gemini-TTS.
* **Single Voice Rule:** `active_narration_count = 1.0` continuous stem.
* **Score & Ducking:** Dedicated documentary soundtrack with $-14\,\text{dB}$ automated sidechain ducking.

---

## 5. Prohibited Patterns (Negative Examples)
| Pattern | Why Prohibited | Correct Alternative |
|---|---|---|
| Unrelated continuous camera drift | Creates motion sickness, ruins text readability | Stable centered camera; micro-push only on lock |
| Hard cut on scene boundary | Breaks viewer immersion, feels like slideshow | 30-frame temporal overlap with shared morph bridge |
| Showing Finglish / Latin text | Ruin institutional Persian prestige | Display clean Persian; use Finglish only internally |
| Random floating shapes | "Visual noise" that distracts from core message | Motivated indicators that explain data |
| Abrupt audio cuts | Creates jarring clicks and amateur finish | Continuous single audio stem at $-15.2\,\text{LUFS}$ |
