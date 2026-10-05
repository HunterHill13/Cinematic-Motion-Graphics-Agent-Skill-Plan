# V16 AUDIT REPORT: BASELINE INSPECTION & TTS PRONUNCIATION ARCHITECTURE

## 1. Executive Summary

This audit assesses the state of the cinematic motion graphics system at **V15**, identifying its architectural baseline, content authority guarantees, and the exact failure modes of the Persian Text-To-Speech (TTS) pronunciation pipeline.

The visual architecture in V15 has reached production maturity:
- **Director-Led 23-Beat System:** Semantic beat contracts, 7-layer complexity budget (L0–L6, $\le 6$ active layers).
- **Physical Dynamics:** Causal secondary motion (`PRIMARY -> SECONDARY -> ENVIRONMENT` with 3f delay) and idle breathing micro-motion ($\pm 1.5\%$ scale @ $0.33\text{ Hz}$).
- **OneTake Continuity:** 5 verified carry transitions ($T1–T5$) with continuity score of $0.952$.
- **Strict Content Authority:** 100% source-authorized copy traceable directly to `tts_input.txt` with zero invented text.

However, the auditory presentation suffers from a critical institutional flaw: **grapheme-to-phoneme (G2P) mispronunciation by neural TTS models on sensitive proper nouns**, most glaringly:
> **بقیه‌الله** $\longrightarrow$ pronounced inaccurately as **«بقی الله»** (`baqiy-allah`), omitting the necessary gemination (tashdid) and elided idafa (`baqiyyato-llah`).

V16 must establish a deterministic **`DISPLAY TEXT ≠ TTS TEXT`** separation pipeline without modifying the visual content authority or disrupting audio-visual synchronization.

---

## 2. Inventory of Current V15 Architecture

### 2.1 Content Authority & Registries
- `src/content/authorizedContent.ts`: Authoritative typed dictionary containing 100% of visible strings.
- `src/content/contentProvenance.ts`: Provenance category enforcement (`NARRATION_EXACT`, `SOURCE_DOCUMENT_EXACT`, `USER_PROVIDED`, `BRAND_ASSET`).
- `V15_CONTENT_MANIFEST.md`: Closed registry of approved copy.
- Source Narration: `projects/persian_editorial_motion_test_v5_2/text/tts_input.txt` (13 sentences, 78.71s total speech).

### 2.2 Shot Suite & Visual System
- `projects/persian_editorial_motion_test_v15/src/PersianEditorialMasterV15.tsx`: Master composition (2361 frames @ 30 FPS = 78.71s).
- `Shot01_HookV15.tsx` (0–380f): Opening institutional attribution and provocative research query.
- `Shot02_DecreeV15.tsx` (350–650f): Statutory decree monolith and scale medallion.
- `Shot03_CriteriaV15.tsx` (620–1480f): Tripartite criteria diagram (GPA 16, disciplinary clearance, articles).
- `Shot04_TimeWindowV15.tsx` (1450–1730f): 12-month calendar ruler and 1-year cutoff gate.
- `Shot05_ThresholdsV15.tsx` (1700–2185f): Three academic degree pedestals (65, 110, 130 pts).
- `Shot06_OutroV15.tsx` (2155–2361f): Grand institutional seal crest and continuation call.

### 2.3 Motion & Camera Grammar
- `src/camera/CameraGrammarRig.tsx`: Single-curve continuous camera rigs (`micro-push`, `slow-dolly`, `parallax-drift`, `continuous`, `micro-pull`).
- `src/motion/secondaryMotion.ts`: Causal secondary physics calculation and idle breathing oscillations.
- `src/transition/carryTransitions.ts`: Mathematical object persistence contracts across shot boundaries.

### 2.4 Existing Audio Layer
- Audio Master: `public/audio/persian_editorial_v5_5/final_master_mix.wav` (48kHz, 2-channel, 16-bit PCM, 78.71s duration).
- Mixing Script: `projects/persian_editorial_motion_test_v5_2/scripts/build_mix_v5_2.py` (automated $-14\text{dB}$ sidechain ducking of background score).
- Initial Audio Prototypes: `src/audio/pronunciationDictionary.ts`, `src/audio/pronunciationNormalizer.ts`, `src/audio/soundDesignCoordinator.ts`.

---

## 3. Investigation of the TTS Engine & Failure Modes

### 3.1 Primary Production Engine: Google Gemini-TTS
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent` / `gemini-2.5-pro-preview-tts`
- **Configuration:**
  - `responseModalities: ["AUDIO"]`
  - `voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } }`
  - Directional style prompt prepended in Persian requesting natural Iranian documentary cadence.
- **Engine Capabilities & Limitations:**
  - **SSML Support:** Google Gemini-TTS `generateContent` **does NOT support W3C SSML tags** (such as `<phoneme alphabet="ipa">` or `<sub alias="...">`). Sending XML tags directly into prompt leads to hallucinated verbal reading of tags or API degradation.
  - **Diacritic Sensitivity:** The underlying G2P model is highly sensitive to explicit Persian/Arabic diacritics (harakat: fatha `\u064E`, damma `\u064F`, kasra `\u0650`, tashdid `\u0651`, sukun `\u0652`, dagger alif `\u0670`, and tanween).
  - **Segmentation Sensitivity:** The engine interprets zero-width non-joiners (`\u200c`), spaces, and hyphens differently.
  - **Phonetic Respelling:** The model responds accurately to phonetic respelling using native Persian characters when guided by localized orthographic conventions.

### 3.2 Root Cause Analysis for «بقیهالله»
1. **Raw Text:** In `tts_input.txt`, the term appears as `بقیه‌الله` (with ZWNJ: `بقیه\u200cالله`).
2. **G2P Interpretation:** The TTS engine reads the first segment `بقیه` as a standard modern Persian word ending in silent He (`eh`), and then sees `الله` as an independent divine name (`Allah`). It often drops the final syllable of the first word, producing `baqiy Allah` or `baqi Allah`.
3. **Canonical Institutional Pronunciation:** The correct pronunciation is:
   $$\text{bæqijjætolˈlɒːh} \quad (\text{بَقیِّةُ‌الله / بَقیِّه‌تُ‌الله / بَقیِّتُ‌الله})$$
   where the Ya has gemination (tashdid), the Ta Marbuta is pronounced as $t$ with damma ($o$), and elides directly into the lām of Allah.

---

## 4. Components That Must Remain Unchanged

1. **Content Authority Rules:**
   - 100% of visible textual copy must originate from official source material.
   - Zero invented institutional names («ستاد کل نیروهای مسلح», «بنیاد ملی نخبگان» remain strictly banned).
   - Zero English/Latin developer metadata in rendered compositions.
2. **On-Screen Display Orthography:**
   - On-screen typography must remain in pristine Iranian editorial Persian calligraphy.
   - **ZERO Arabic harakat or phonetic marks may appear on screen.**
3. **Visual Choreography & Shot Timing:**
   - The 23 semantic beats, camera trajectories, secondary physics delays, and OneTake transition boundaries remain locked to maintain master visual excellence.

---

## 5. Proposed V16 Modifications & Architecture Plan

```text
[ Authoritative Narration Source ]
                │
                ▼
   [ Content Authority Check ]
                │
     ┌──────────┴──────────┐
     ▼                     ▼
[ Display Pipeline ]    [ Pronunciation Resolver ] (Word-Boundary Safe)
(Pristine Persian JSX)     │
(Zero Diacritics)          ▼
                      [ Phonetic TTS Script ]
                           │
                           ▼
                      [ Gemini-TTS Engine ]
                           │
                           ▼
                      [ Audio QC & Stem Mixing ]
                           │
                           ▼
                      [ Remotion Master Mix ]
```

1. **Dedicated Pronunciation Architecture (`src/audio/pronunciation/`):**
   - `pronunciationTypes.ts`: Typed schema for terms, categories, priorities, and validation status.
   - `pronunciationRegistry.ts`: Extensible dictionary with validated phonetic overrides.
   - `pronunciationResolver.ts`: Word-boundary-safe resolver handling ZWNJ, Arabic letter variants (ي/ی, ك/ک), and whitespace.
2. **Empirical Evaluation of «بقیهالله»:**
   - Synthesize and evaluate candidate representations against Gemini-TTS.
   - Document results in `V16_PRONUNCIATION_TEST.md`.
3. **Automated V16 QA Suite:**
   - `verify_pronunciation_v16.py`: Enforces zero display leakage, 100% registry mapping, and resolver boundary safety.
4. **Hero Shot Proof & Two-Tier QC Gate:**
   - Render `proof.mp4` focusing on Shot 01 (containing the institutional attribution).
   - Complete final render `final.mp4` and generate QC artifacts.
