# PERSIAN PRONUNCIATION & TTS BENCHMARK REPORT

**Project:** `projects/persian_editorial_stress_test`  
**Target Domain:** Institutional Scientific & Medical Research Broadcast (Baqiyatallah University of Medical Sciences)  
**Standard Audited:** Authentic Tehran Standard Presenter Cadence (Zero Afghan/Dari drag, zero robotic monotone, zero acronym slurring)  
**Date:** 2026-10-04  

---

## 1. Engine & Configuration Benchmarking

We synthesized and compared three distinct TTS configurations across the target institutional script:

| Metric / Attribute | Config A: `fa-IR-FaridNeural` (Raw) | Config B: `fa-IR-DilaraNeural` (Raw) | Config C: `fa-IR-FaridNeural` (Calibrated Presenter) |
|---|:---:|:---:|:---:|
| **Tone & Register** | Formal documentary, slightly flat | Formal feminine, clear | **Authoritative Institutional Presenter** |
| **Pacing / Rate** | 0% (slightly lethargic for Reels) | 0% (vowel elongation at pauses) | **+6% (Energetic, crisp documentary tempo)** |
| **Pitch Tuning** | Default | Default | **-1 Hz (Sub-chest resonance & warmth)** |
| **Acronym Handling `(عج)`** | Failed: spells letters ("عین جیم") | Failed: spells letters ("عین جیم") | **Passed: Phonetically expanded `عَجَّلَ‌اللهُ فَرَجَه`** |
| **Ezafe Continuity** | Inconsistent slurring on `کُمیتهیِ` | Clear but overly prolonged | **Crisp /je/ juncture via `کُمیته‌یِ`** |
| **Vowel Length** | Extended final vowels | Extended cadence | **Zero Dari vowel drag; Tehran standard** |
| **Overall Verdict** | Unacceptable for institutional media | Good alternative, slightly soft | **SELECTED MASTER VOICE FOR PRODUCTION** |

---

## 2. Phonetic Normalization & Pronunciation Dictionary

To ensure 100% pronunciation accuracy, the following domain-specific terms were phonetically locked:

| Term | Raw Text | Display Typography (Clean) | Master TTS Phonetic Override | Acoustic Rationale |
|---|---|---|---|---|
| **Institutional Salutation** | `بَقیَّتُالله (عَج)` | `بقیةالله (عج)` | `بَقیَّتُ‌الله عَجَّلَ‌اللهُ فَرَجَه` | Expands raw acronym into natural spoken honorific; avoids robotic "Ayn-Jim" spelling. |
| **Research Committee** | `کُمیتهیِ تَحقیقات` | `کمیته تحقیقات` | `کُمیته‌یِ تَحقیقاتِ` | Adds distinct ezafe connector `/je/` to prevent vowel collision. |
| **Regulation Code** | `بَندِ «کاف»` | `بند «کاف»` | `بَندِ کاف` | Strips quotes to prevent quote-reading bugs; vocalizes /kɒːf/. |
| **Article 2** | `مادّهیِ ۲` | `ماده ۲` | `مادّه‌یِ دو` | Explicit Persian numeral reading `/do/` with shaddah on /dː/. |
| **Gifted Students Regulation**| `آییننامهیِ اِستِعدادهایِ دِرَخشان` | `آیین‌نامه استعدادهای درخشان` | `آیین‌نامه‌یِ اِستِعدادهایِ دِرَخشانِ` | Preserves half-space in display; injects smooth phonological boundary. |
| **Technologist** | `فَنّاوَر` / `فَنّاوَرانِه` | `فناور` / `فناورانه` | `فَنّاوَرِ` / `فَعّالیَتِ فَنّاوَرانِه` | Shaddah on nun `/fæn-nɒː-vær/` preventing incorrect reading as /fanavar/. |
| **Disciplinary Committee** | `کُمیتهیِ اِنضِباطی` | `کمیته انضباطی` | `کُمیته‌یِ اِنضِباطی` | Proper kasreh ezafe and emphatic /z/ in `/enzebɒːtiː/`. |
| **Graduation Caveat** | `فارِغُالتَّحصیلی` | `فارغ‌التحصیلی` | `فارِغُ‌التَّحصیلی` | Arabic solar assimilation `/fɒːreɣot-tæhsiːliː/` strictly observed. |
| **Threshold Metric** | `حَدِّنِصاب` | `حدنصاب` | `حَدِّ نِصابِ` | Vocalized kasreh on /hæd-de nesɒːb/ preventing slurred consonant cluster. |
| **Score Quantities** | `۱۶` / `۶۵` / `۱۱۰` / `۱۳۰` | `۱۶` / `۶۵` / `۱۱۰` / `۱۳۰` | `شانزدَه` / `شَصت و پَنج` / `صَد و دَه` / `صَد و سی` | Natural Persian cardinal counting cadence. |

---

## 3. Strict Separation Verification

1. **`tts_text.txt`**: Retains all phonetic diacritics, shaddahs, and ezafe marks exclusively utilized by the audio synthesis engine.
2. **`display_text.txt`**: Completely devoid of vowels/diacritics/tanwin; formatted with standard Persian orthography and half-spaces for high-contrast, clutter-free on-screen kinetic typography.
