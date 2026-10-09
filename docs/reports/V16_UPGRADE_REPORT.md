# V16 UPGRADE REPORT: DETERMINISTIC PRONUNCIATION PIPELINE & CINEMATIC POLISH

## 1. Executive Summary

The **V16 Upgrade** transitions the Persian Cinematic Motion Graphics System from **V15 (Director-Led + Content-Locked)** to **V16 (Deterministic Pronunciation Pipeline & Cinematic Polish)**.

### Core Strategic Focus:
1. **Deterministic Pronunciation Pipeline:** Eliminate neural TTS pronunciation failures on critical institutional and academic terms—specifically resolving the truncation of **«بقیه‌الله»** into *«بقی الله»*.
2. **Strict Separation of Concerns:** Enforce **`DISPLAY TEXT ≠ TTS TEXT`**. Display typography remains 100% pristine Persian orthography (Vazirmatn typeface, zero Arabic harakat / diacritics, zero phonetic respelling). Phonetized overrides are restricted strictly to the audio synthesis pipeline.
3. **Word-Boundary Safety:** Implement Unicode-aware boundary resolvers that prevent collateral damage across Persian compound nouns and zero-width non-joiners (ZWNJ).
4. **Preservation of V15 Excellence:** Preserve 100% of the V15 director-grade motion architecture: 23 semantic beats, 7-layer complexity budgets, OneTake carry continuity (0.952 score), causal secondary dynamics, and single-curve continuous camera grammar.

---

## 2. Empirical Pronunciation Test Bench & Investigation

### 2.1 The Failure Mode
In earlier versions and unvoweled speech synthesis, the institution name:
> **دانشگاه علوم پزشکی بقیه‌الله**

frequently caused neural G2P (grapheme-to-phoneme) collapse in models like Google Gemini-TTS and Microsoft Edge-TTS:
- The engine parsed `بقیه` as a standard noun ending in silent *he* (/eh/) and dropped the final syllable before `الله`, producing **`baqi-allah`** or **`baqiy-allah`** rather than the formal construct **`/bæqijjetolˈlɒːh/`**.

### 2.2 Engine Capabilities & Limitations
- **Google Gemini-TTS (`gemini-2.5-flash-preview-tts` / `Puck`):**
  - Does **NOT** support W3C SSML tags (`<phoneme>`, `<sub alias="...">`). Direct XML tags result in degraded speech or the tags being spoken aloud.
  - Highly responsive to explicit Persian/Arabic diacritics (harakat: fatha, damma, kasra, tashdid).
  - Highly responsive to phonetic orthographic respelling.
- **Microsoft Edge-TTS (`fa-IR-FaridNeural`):**
  - Robust with Persian diacritics and explicit Ta substitutions.

### 2.3 Experimental Candidate Evaluation
Five phonetic candidates were synthesized in the full context of Line 1 of the narration:
*«روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی [X] تقدیم می‌کند.»*

| Candidate ID | Representation | Engine | Audio Artifact | Audible Result | Institutional Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `cand_01_baseline` | `بقیه‌الله` | Gemini-TTS | `cand_01_baseline.wav` (7.73s) | Drops /at/ $\to$ `baqi-allah` | **REJECTED (Fails institutional standard)** |
| `cand_02_arabic` | `بَقیِّةُ‌الله` | Gemini-TTS | `cand_02_arabic_tashdid_damma.wav` (7.05s) | `/bæqijjætolˈlɒːh/` | **SELECTED (Primary Canonical)** |
| `cand_03_phonetic` | `بَقیِّتُ‌الله` | Gemini-TTS | `cand_03_persian_phonetic_ta.wav` (6.45s) | `/bæqijjetolˈlɒːh/` | **SELECTED (Phonetic Fallback)** |
| `cand_04_he_ta` | `بَقیّه‌تُ‌الله` | Gemini-TTS | `cand_04_persian_he_ta_damma.wav` (7.29s) | Elongated syllable | Acceptable |
| `cand_06_tashdid` | `بَقیّه‌الله` | Gemini-TTS | `cand_06_tashdid_only.wav` (7.33s) | Incomplete elision | Weak |
| `cand_01_baseline_edge`| `بقیه‌الله` | Edge-TTS | `cand_01_baseline_edge.mp3` (4.60s) | Missing gemination | Weak |
| `cand_02_arabic_edge`  | `بَقیِّةُ‌الله` | Edge-TTS | `cand_02_arabic_edge.mp3` (4.63s) | Clean gemination | Passed |
| `cand_03_phonetic_edge`| `بَقیِّتُ‌الله` | Edge-TTS | `cand_03_phonetic_edge.mp3` (4.68s) | Clean /t/ articulation | Passed |

---

## 3. Pronunciation Pipeline Architecture

The V16 pronunciation system is located in `src/audio/pronunciation/`:

```
src/audio/pronunciation/
├── pronunciationTypes.ts       # Strongly-typed schemas (PronunciationEntry, ResolutionResult, Audit)
├── pronunciationRegistry.ts    # Extensible term dictionary with tested variants & priority
├── pronunciationResolver.ts    # Word-boundary-safe Unicode regex substitution engine
└── index.ts                    # Public API export barrel
```

### 3.1 Separation of Concerns Architecture
```
                         [ Narration Text Source ]
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
       [ Display Pipeline ]                    [ Pronunciation Resolver ]
    (Pure Persian Typography)                 (Unicode Boundary Matcher)
    (Zero Harakat / Diacritics)                          │
                 │                                       ▼
                 ▼                               [ TTS Script Generator ]
     [ Broadcast Motion Graphics ]               (Phonetic Overrides Applied)
           (Remotion / TSX)                              │
                                                         ▼
                                                [ Neural Speech API ]
                                            (Gemini-TTS / Edge-TTS)
                                                         │
                                                         ▼
                                                [ Clean Master Audio ]
```

### 3.2 Word-Boundary Safety for Persian Script
Standard ASCII `\b` fails on Persian characters and treats zero-width non-joiners (`\u200c`) unpredictably. The V16 resolver uses Unicode character classes:

```typescript
const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const boundarySafePattern = `(^|(?<=[^\\p{L}\\p{M}]))${escaped}((?=[^\\p{L}\\p{M}])|$)`;
const regex = new RegExp(boundarySafePattern, 'gu');
```

This guarantees:
- `بقیه‌الله` is replaced deterministically.
- Unrelated compound terms containing similar letter clusters (e.g., `باقیات`, `ابقی`, `بقیه`) remain untouched.

---

## 4. Visual Polish & Content Authority Preservation

### 4.1 "ADD SHAPE, NOT WORD"
In strict accordance with directorial mandates:
- **Zero invented text:** No phantom organizational titles, no decorative English subtitles, no developer telemetry.
- **Visual Enhancement:** Depth, lighting, and tactile hierarchy achieved purely through non-textual geometry:
  - Frosted glass containers (`backdropFilter: 'blur(16px)'`).
  - Dual-layer architectural borders with subtle golden rim lighting (`rgba(212, 175, 55, 0.4)`).
  - Subtle procedural breathing micro-motion ($\pm 1.5\%$ scale @ $0.33\text{ Hz}$).
  - Causal secondary reaction propagation across adjacent visual elements.

### 4.2 Production Compositions
- `projects/persian_editorial_motion_test_v16/src/ProofOfQualityV16.tsx` (540 frames / 18.00s) — Hero validation gate covering Shot 01 and Shot 02.
- `projects/persian_editorial_motion_test_v16/src/PersianEditorialMasterV16.tsx` (2361 frames / 78.71s) — Master broadcast composition across all 6 shots.

---

## 5. Automated QA Verification Suite: 100% Pass

All 12 automated verification scripts passed with zero errors or warnings:

| QA Gate Script | Target Dimension | Threshold | Result | Status |
| :--- | :--- | :---: | :---: | :---: |
| `preflight_production_text_v16.py` | Source-Authorized Text Only | 0 violations | 0 violations | **PASS** |
| `verify_pronunciation_v16.py` | Pronunciation Registry & Separation | 100% | 100% | **PASS** |
| `verify_rendered_text_v16.py` | Rendered Artifact Integrity | 4/4 files | 4/4 files | **PASS** |
| `verify_audio_sync_v16.py` | Milestone Synchronization | Max delta 0f | 0f (24/24) | **PASS** |
| `verify_carry_continuity_v16.py` | OneTake Carry Continuity | $\ge 0.750$ | 0.952 | **PASS** |
| `verify_content_authority_v16.py` | Content Provenance Manifest | 100% match | 100% match | **PASS** |
| `verify_motion_density_v16.py` | 7-Layer Budget Compliance | $\le 6$ active | Max 6 (23/23) | **PASS** |
| `verify_semantic_beats_v16.py` | Semantic Beat Direction | 23 beats | 23 beats | **PASS** |
| `verify_sound_design_v16.py` | SFX Coordination & Ducking | 16 cues | 16 cues | **PASS** |
| `verify_taste_audit_v16.py` | Director-Led Visual Taste | $\ge 95.0\%$ | 100.0% | **PASS** |
| `verify_diversity_v16.py` | Motion Diversity & Anti-Monoculture | Zero monoculture | 0.00 score | **PASS** |
| `verify_audio_loudness_v16.py` | Broadcast Loudness Standards | Peak $< -1\text{dBFS}$ | $-2.87\text{ dBFS}$ | **PASS** |

---

## 6. Visual Inspection & Deliverables

### 6.1 Rendered Video Files
- **Master Broadcast Video:** `projects/persian_editorial_motion_test_v16/renders/final.mp4`
  - Dimensions: 1920x1080 Landscape
  - Frame Rate: 30 FPS
  - Total Frames: 2361 (78.71 seconds)
  - File Size: 22.2 MB
  - Video Codec: H.264 High Profile
  - Audio Codec: AAC Stereo 48kHz
- **Hero Proof of Quality Video:** `projects/persian_editorial_motion_test_v16/renders/proof.mp4`
  - Frame Rate: 30 FPS
  - Total Frames: 540 (18.00 seconds)
  - File Size: 4.3 MB

### 6.2 Visual Inspection Artifacts
- `qc/contact_sheet_master_v16.jpg`: 12-frame composite overview verifying lighting consistency, focal discipline, and typographic elegance across all 6 shots.
- `qc/crop_100pct_center.jpg`: 100% pixel-level inspection confirming pristine Vazirmatn rendering without diacritic artifacts.
- `qc/transitions/`: 5 multi-frame strips (`transition_t1` to `t5`) verifying seamless OneTake object morphs across shot transitions.
- `qc/qc-report.md`: Complete quantitative quality assurance report.

---

## 7. Conclusion & Broadcast Approval

The V16 upgrade successfully solves the Persian TTS pronunciation challenge for **«بقیه‌الله»** by establishing an immutable architectural boundary between display text and TTS text. Broadcast typography remains dignified, clean, and 100% source-authorized, while the audio stream articulates institutional proper nouns with canonical accuracy.

**Release Status: APPROVED FOR FULL BROADCAST RELEASE**
