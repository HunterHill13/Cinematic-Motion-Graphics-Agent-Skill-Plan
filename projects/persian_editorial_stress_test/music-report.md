# INSTITUTIONAL MUSIC & SOUND DESIGN REPORT

**Project:** `projects/persian_editorial_stress_test`  
**Audio Score:** `institutional_science_pulse.wav` (Bespoke Minimalist Scientific Documentary Score)  
**Master Stem Mix:** `projects/persian_editorial_stress_test/audio/final_master_mix.wav` & `public/audio/persian_editorial_master_mix.mp3`  
**Standard Audited:** Professional Scientific Editorial / Institutional Motion Graphics  
**Date:** 2026-10-04  

---

## 1. Compositional Rationale & Acoustic Architecture

In contrast to earlier versions which relied on generic corporate loops or lofi tracks, this score was designed specifically to support high-density Iranian academic and regulatory communication:

| Layer / Instrument | Frequency / Timing | Psychoacoustic Purpose |
|---|---|---|
| **Sub-Bass Anchor** | Fundamental C2 (65.4 Hz) + G2 (98.0 Hz) | Establishes institutional gravity, authority, and cinematic weight on high-end monitors/phones. |
| **Organic Pad Bed** | Cm7 / Eb evolving voicings (130.8 – 233.1 Hz) | Sustained harmonic warmth with smooth 0.08 Hz LFO filter movement; avoids static drone. |
| **Clockwork Pulse** | C5 (523.25 Hz) percussive decays at 116 BPM | Evokes academic calculation, scientific measurement, and ticking of criteria without aggression. |
| **Octave Shimmer Accent**| C6 (1046.5 Hz) on alternate downbeats | Adds crystal-clear spatial depth and high-end air to modern vertical video (9:16). |
| **Formant Notch** | 300 Hz – 3.2 kHz attenuated by -4.5 dB | Leaves uncompromised acoustic headroom for the Persian presenter's vocal intelligibility. |

---

## 2. Dynamic Sidechain Ducking & Stem Hierarchy

Audio stems were mixed using an automated multi-stage pipeline:
1. **Narration Stem (Top Priority):** Master vocal level at 0.0 dB RMS, fully centered, crisp highs with zero sibilance distortion.
2. **Music Stem (Adaptive Bed):**
   - Under active narration: Ducked continuously to **-15.0 dB** with a 180ms smooth attack.
   - During natural shot transitions (450ms gaps): Swells smoothly by **+3.5 dB** to drive narrative anticipation.
3. **Sound Design & SFX (Synchronized Accents):**
   - **Scene Transitions:** Soft aerodynamic whooshes at `trans_time - 180ms` masking visual cuts.
   - **Three Conditions (Shot 04):** Resonant futuristic sub-hit on Condition 1 (`معدل ۱۶`), subtle tactile mechanical clicks on Condition 2 (`سنوات`) and Condition 3 (`۶ ماده`).
   - **Time Anchor (Shot 05):** Precision harmonic ping on `۱ سال پس از فارغ‌التحصیلی`.
   - **Score Thresholds (Shot 06):** Rising triple chime sequence on `۶۵`, `۱۱۰`, and `۱۳۰` with terminal impact.

---

## 3. Comparison: OLD (v2.x / v3.0) vs. NEW (v3.2 Editorial)

| Attribute | Earlier Implementations (OLD) | v3.2 Editorial Stress Test (NEW) |
|---|---|---|
| **Music Presence** | Static loop or missing from final render | 100% custom-composed, continuous 83.3s score generated in code |
| **Genre Suitability** | Generic corporate / synthwave / lo-fi | Institutional scientific documentary (Minimalist marimba pulse + sub-bass) |
| **Vocal Clashing** | Music masked vocal mid-frequencies | -15 dB dynamic ducking + 300Hz–3.2kHz acoustic formant notch |
| **Pacing Alignment** | Music was detached from visual events | Beats lock to Shot 04 conditions and Shot 06 numeric data reveals |
| **SFX Integration** | Infrequent or game-like sound effects | Subtle, restrained, high-end editorial sound design |
