# V39 — Audio Direction & Sound Engineering Strategy

## Project Overview
* **Institutional Context:** Baqiyatallah University of Medical Sciences (BMSU) // Student Research Committee
* **Spoken Script:** Full 11-sentence Persian narration with explicit pronunciation diacritics.
* **Master Sound Design File:** `public/audio/v39_master_mix.mp3`
* **Target Compliance:** EBU R128 (-14 LUFS integrated, True Peak <= -1.0 dBTP).

---

## 1. Voiceover Strategy (The Anchor of Truth)

* **Engine:** Microsoft Azure Neural TTS via `edge-tts`.
* **Voice Selected:** `fa-IR-FaridNeural` (Male, authoritative, warm, articulate, academic cadence).
* **Diacritic Fidelity:** The source script includes explicit Persian harakat (fatḥah, kasrah, ḍammah, tashdīd, sukūn). The TTS engine processes these accurately, ensuring canonical pronunciation of institutional terms, notably **«بَقیَّتُالله (عَج)»**, **«مُعَدَّل»**, **«سَنَوات»**, and **«فارِغُالتَّحصیلی»**.
* **Pacing & Rhythm:** Synthesized at +0% rate with tailored inter-sentence rhetorical breathing pauses (0.55s between logical beats, 1.2s before the final sign-off), totaling 91.82 seconds.

---

## 2. Background Music Strategy

* **Theme:** `institutional_science_pulse.wav`
* **Musical Genre:** Minimalist Neo-Classical / Procedural Electronic Pulse.
* **Instrumentation:** Muted marimba / synthesizer arpeggios, warm sub-bass, precision clockwork pulses, and subtle ambient pads.
* **Role:** Establishes intellectual momentum without emotional melodrama or commercial hype. Avoids generic corporate elevator music and aggressive cinema trailer drums.

---

## 3. Dynamic Sidechain Ducking Architecture

Speech intelligibility is absolute. Music is automatically modulated via sidechain compression:
* **Nominal Background Music Level (Speech Inactive):** `-14 dB`
* **Ducked Background Music Level (Speech Active):** `-20 dB` (approx. 4.5:1 compression ratio)
* **Attack Time:** `60 ms` (music rapidly recedes before the narrator's first phoneme)
* **Release Time:** `450 ms` (smooth, organic swell back during pauses, preventing unnatural pumping)
* **Voice Level:** Boosted `+1.05x` (0 dBFS normalized with a lookahead brickwall limiter at `-0.96 dBTP`).

---

## 4. Selective Sound Design (SFX) Cues

Rather than cluttering every animation with cartoonish foley, SFX are restricted to major narrative pivots and quantitative thresholds:

| Time (ms) | Frame | Audio Asset | Narrative Trigger | Psychoacoustic Function |
| :---: | :---: | :--- | :--- | :--- |
| **8,266** | **F248** | `swoosh-quick.mp3` | Act 2: Question Hook | Spatial transition from logo to question |
| **16,233** | **F487** | `transition-snap.mp3` | Act 3: "Band K" Reveal | Structural locking of legal guideline |
| **26,566** | **F797** | `impact-cine.mp3` | Act 4: "3 Conditions" Gate | Sub-bass impact warning of prerequisites |
| **35,666** | **F1070** | `impact-cine.mp3` | Act 5: Condition 1 ("16") | Heavy physical landing on the score datum |
| **42,666** | **F1280** | `pop.mp3` | Act 6: Condition 2 (Approval) | Crisp mechanical checkmark verification |
| **49,000** | **F1470** | `transition-snap.mp3` | Act 7: Condition 3 ("6 Articles") | Locking of the 6-facet hexagonal iris |
| **57,633** | **F1729** | `swoosh-quick.mp3` | Act 8: Notice ("1 Year") | Chronological timeline sweep |
| **72,733** | **F2182** | `impact-cine.mp3` | Act 10: Bachelor ("65") | Kinetic pedestal 1 impact |
| **78,000** | **F2340** | `impact-cine.mp3` | Act 10: Med ("110") | Kinetic pedestal 2 impact |
| **81,000** | **F2430** | `impact-cine.mp3` | Act 10: PhD ("130") | Kinetic pedestal 3 impact (Climax) |
| **84,066** | **F2522** | `swoosh-quick.mp3` | Act 11: Final CTA | Recontextualized portal resolve |

---

## 5. Technical Delivery

The master audio track is rendered as `projects/v39_audio/v39_master_mix.mp3` and duplicated to `public/audio/v39_master_mix.mp3`, ensuring 100% native compatibility with Remotion's `<Audio />` component and zero playback lag.
