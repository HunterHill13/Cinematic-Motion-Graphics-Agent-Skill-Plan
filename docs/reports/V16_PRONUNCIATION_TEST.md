# V16 PRONUNCIATION TEST REPORT: «بقیه‌الله» PHONETIC EVALUATION

## 1. Executive Summary & Objective

In Iranian academic and institutional broadcasting, the correct pronunciation of the university's titular patron:
> **دانشگاه علوم پزشکی بقیه‌الله (عج)**

is of paramount importance. The unvoweled grapheme sequence `بقیه‌الله` frequently triggers G2P (grapheme-to-phoneme) collapse in neural TTS engines (notably Google Gemini-TTS and Microsoft Edge-TTS), resulting in:
- Incomplete elision: dropping the final syllable of *Baqiyyah* to produce **«بقی الله»** (`baqiy-allah` / `baqi-allah`).
- Mechanical hesitation: unnatural glottal pause between `بقیه` and `الله`.

This document records the empirical evaluation of candidate phonetic representations evaluated across the production speech synthesis engines.

---

## 2. Experimental Candidate Test Matrix

All candidates were synthesized in the full context of Line 1 of the official narration:
> *«روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی [X] تقدیم می‌کند.»*

| Candidate ID | Representation Type | TTS Input Term | Engine Tested | Duration | File Generated |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `cand_01_baseline` | Unvoweled baseline with ZWNJ | `بقیه‌الله` | Gemini-TTS (Puck) | 7.73s | `qc/pronunciation/cand_01_baseline.wav` |
| `cand_02_arabic_tashdid_damma` | Arabic Ta-Marbuta with Tashdid & Damma | `بَقیِّةُ‌الله` | Gemini-TTS (Puck) | 7.05s | `qc/pronunciation/cand_02_arabic_tashdid_damma.wav` |
| `cand_03_persian_phonetic_ta` | Persian explicit Ta with Tashdid & Damma | `بَقیِّتُ‌الله` | Gemini-TTS (Puck) | 6.45s | `qc/pronunciation/cand_03_persian_phonetic_ta.wav` |
| `cand_04_persian_he_ta_damma` | Persian He-Ta with explicit Damma | `بَقیّه‌تُ‌الله` | Gemini-TTS (Puck) | 7.29s | `qc/pronunciation/cand_04_persian_he_ta_damma.wav` |
| `cand_06_tashdid_only` | Tashdid on Ya only with ZWNJ | `بَقیّه‌الله` | Gemini-TTS (Puck) | 7.33s | `qc/pronunciation/cand_06_tashdid_only.wav` |
| `cand_01_baseline_edge` | Unvoweled baseline | `بقیه‌الله` | Edge-TTS (FaridNeural) | 4.60s | `qc/pronunciation/cand_01_baseline_edge.mp3` |
| `cand_02_arabic_edge` | Arabic Ta-Marbuta with Tashdid & Damma | `بَقیِّةُ‌الله` | Edge-TTS (FaridNeural) | 4.63s | `qc/pronunciation/cand_02_arabic_edge.mp3` |
| `cand_03_phonetic_edge` | Persian explicit Ta with Tashdid & Damma | `بَقیِّتُ‌الله` | Edge-TTS (FaridNeural) | 4.68s | `qc/pronunciation/cand_03_phonetic_edge.mp3` |

---

## 3. Analysis & Phonetic Observations

### 3.1 Candidate 01: `بقیه‌الله` (Baseline)
- **Acoustic Behavior:** The G2P model parses `بقیه` as an isolated modern Persian noun ending in silent *he* (/eh/). Because `الله` follows immediately with a zero-width non-joiner, the neural prosody module treats the boundary as an elision site, dropping the ending of the first word.
- **Audible Result:** Sounds close to `baqi-allah` / `baqiy-allah`.
- **Verdict:** **UNACCEPTABLE (Fails institutional standard).**

### 3.2 Candidate 02: `بَقیِّةُ‌الله` (Arabic Ta-Marbuta + Tashdid + Damma)
- **Acoustic Behavior:** The explicit tashdid on ya (`یِّ`) forces gemination of the semivowel /j/ into /ij.j/. The Arabic ta marbuta with damma (`ةُ`) signals the formal idafa construct directly into the lam of *Allah*.
- **Audible Result:** Produces a fluid, phonetically dignified `bæqijjætolˈlɒːh`. The transition is smooth and does not stutter.
- **Verdict:** **HIGH QUALITY / CANONICAL CLASSICAL PRONUNCIATION.**

### 3.3 Candidate 03: `بَقیِّتُ‌الله` (Persian Explicit Ta + Tashdid + Damma)
- **Acoustic Behavior:** Replaces the ambiguous Ta Marbuta with unambiguous Persian *Te* (`ت`). The damma explicitly elides into *Allah*.
- **Audible Result:** Very crisp /t/ articulation (`bæqijjet-ollɒːh`). Slightly faster cadence (6.45s), highly intelligible.
- **Verdict:** **HIGH ACCURACY / ZERO AMBIGUITY.**

### 3.4 Candidate 04: `بَقیّه‌تُ‌الله` (Persian He-Ta Spaced)
- **Acoustic Behavior:** Causes slight elongation on the penultimate syllable before the *Te*.
- **Verdict:** Acceptable, but Candidate 02 and 03 flow with greater documentary naturalness.

---

## 4. Final Selection & Directorial Decision

### Selected TTS Canonical Representation:
```text
TERM:          بقیه‌الله
DISPLAY TEXT:  بقیه‌الله  (Pristine Persian orthography, 0 diacritics)
TTS OVERRIDE:  بَقیِّةُ‌الله  (Primary) / بَقیِّتُ‌الله (Phonetic Fallback)
IPA TARGET:    /bæqijjetolˈlɒːh/
CATEGORY:      institution
PRIORITY:      critical
```

### Rationale:
1. `بَقیِّةُ‌الله` preserves the correct Arabic-Persian etymological construct while providing the neural G2P engine with explicit phonological markers:
   - Fatha on Ba (`بَ`) prevents flat vowel reduction.
   - Tashdid on Ya (`یِّ`) guarantees gemination.
   - Damma on Ta Marbuta (`ةُ`) enforces direct vocalic elision into *Allah*.
2. In the event an engine does not support Arabic Ta Marbuta (`ة`), the resolver supports fallback to `بَقیِّتُ‌الله`.
3. The display pipeline strictly outputs `بقیه‌الله`, guaranteeing 100% typographic dignity and zero diacritic clutter on broadcast screens.
